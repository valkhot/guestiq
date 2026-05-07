// src/components/screens/QuestionScreen.jsx
// GuestIQ — Question Screen
// S3-05: Curiosity hook screen inserted between episodes 1-6.
// Hook fires after last question of an episode, before first of next.

import { useState, useEffect, useRef } from 'react';

import {
  useQuestionnaire,
  getSecondaryIntentFromQ2Answer,
} from '../../hooks/useQuestionnaire';
import { useSession } from '../../hooks/useSession';
import Question from '../question/Question';
import CuriosityHookScreen from './CuriosityHookScreen';
import { insertResponse, insertScaleResponse, insertNoneFlag } from '../../services/supabase';
import {
  trackRoutingGateAnswered,
  trackEpisodeStarted,
  trackEpisodeCompleted,
  trackQuestionAnswered,
  trackNoneFlagSelected,
  trackPurposeExpert,
  trackCuriosityHookViewed,
} from '../../services/analytics';

const TIER_COLORS = {
  amateur:      '#4ADE80',
  professional: '#60A5FA',
  expert:       '#A78BFA',
};

function getTenseFrame(answerCode) {
  return answerCode === 'B' ? 'anticipatory' : 'retrospective';
}

function getEpisodeForQuestion(question, episodes) {
  if (!question || !episodes) return null;
  return episodes.find((ep) => ep.moduleMappings.includes(question.module)) || null;
}

export default function QuestionScreen({ tier, propertyId, onComplete, resumedSession }) {
  const { filterQuestionsForSession, episodes } = useQuestionnaire();
  const session = useSession(propertyId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionReady, setSessionReady] = useState(false);
  const [secondaryIntentCategory, setSecondaryIntentCategory] = useState(null);

  // S3-05: Hook screen state
  // When set, the hook screen is shown instead of the next question
  const [pendingHook, setPendingHook] = useState(null);
  // { completedEpisode, nextEpisode, nextIndex }

  const lastEpisodeRef = useRef(null);
  const tierColor = TIER_COLORS[tier] || TIER_COLORS.professional;

  const intentCategory = session.intentCategory || resumedSession?.intent_category || null;

  const tierQuestions = filterQuestionsForSession({
    tier,
    intentCategory,
    secondaryIntentCategory,
  });

  const currentQuestion = tierQuestions[currentIndex];

  const currentEpisode = currentQuestion
    ? getEpisodeForQuestion(currentQuestion, episodes)
    : null;

  const currentEpisodeNumber = currentEpisode?.number || 1;

  // Cumulative progress across full session
  const progressWithinEpisode =
    tierQuestions.length > 0 ? currentIndex / tierQuestions.length : 0;

  const getEpisodeName = (moduleNum) => {
    const ep = episodes.find((e) => e.moduleMappings.includes(moduleNum));
    return ep?.name || 'GuestIQ';
  };

  // Episode transition tracking (PostHog only — hook is handled in handleAnswer)
  useEffect(() => {
    if (!sessionReady || !currentEpisode) return;
    const lastEp = lastEpisodeRef.current;
    if (lastEp && lastEp.number !== currentEpisode.number) {
      trackEpisodeStarted({
        episode_number: currentEpisode.number,
        episode_name: currentEpisode.name,
        tier,
        property_id: propertyId,
      });
    }
    lastEpisodeRef.current = currentEpisode;
  }, [currentEpisodeNumber, sessionReady, currentEpisode, tier, propertyId]);

  // Session initialization
  useEffect(() => {
    async function init() {
      if (resumedSession) {
        session.restoreSession(resumedSession);
        const startIndex = resumedSession.tense_frame ? 1 : 0;
        setCurrentIndex(startIndex);
        setSessionReady(true);
      } else {
        await session.startSession(tier);
        setSessionReady(true);
        const ep1 = episodes.find((e) => e.number === 1);
        if (ep1) {
          trackEpisodeStarted({
            episode_number: 1,
            episode_name: ep1.name,
            tier,
            property_id: propertyId,
          });
          lastEpisodeRef.current = ep1;
        }
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called when respondent clicks Continue on the hook screen
  function handleHookContinue() {
    if (!pendingHook) return;
    const { nextIndex } = pendingHook;
    setPendingHook(null);
    setCurrentIndex(nextIndex);
  }

  async function handleAnswer(answerCode, taxonomyCode, extraText) {
    const activeSessionId = session.sessionId || resumedSession?.session_id;
    const activeTenseFrame =
      session.tenseFrame || resumedSession?.tense_frame || 'retrospective';

    if (!activeSessionId) return;

    const isNoneOption = answerCode === 'NONE';
    const isScaleAnswer = answerCode?.startsWith('SCALE_');

    // ── Q0 ─────────────────────────────────────────────────────────────
    if (currentQuestion.id === 'QR1') {
      const frame = getTenseFrame(answerCode);
      await session.setTenseFrameAndPersist(frame);
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: 'QR1',
        answer_code: answerCode,
        tense_frame: frame,
        module_number: 0,
        property_id: propertyId,
      });
      trackRoutingGateAnswered({
        tense_frame: frame,
        answer_option: answerCode,
        property_id: propertyId,
        ...(extraText ? { qr1_other_text: extraText } : {}),
      });

    // ── Q1 ─────────────────────────────────────────────────────────────
    } else if (currentQuestion.id === 'Q1' && !isNoneOption) {
      await session.setIntentCategoryAndPersist(taxonomyCode);
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: 'Q1',
        answer_code: answerCode,
        tense_frame: activeTenseFrame,
        module_number: 1,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: 'Q1',
        answer_code: answerCode,
        module_number: 1,
        tier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });

    // ── Q2 ─────────────────────────────────────────────────────────────
    } else if (currentQuestion.id === 'Q2' && !isNoneOption && answerCode !== 'A') {
      const secondaryIntent = getSecondaryIntentFromQ2Answer(answerCode);
      if (secondaryIntent && secondaryIntent !== intentCategory) {
        setSecondaryIntentCategory(secondaryIntent);
        trackPurposeExpert({
          primary_intent: intentCategory,
          secondary_intent: secondaryIntent,
          tier,
          property_id: propertyId,
        });
      }
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: 'Q2',
        answer_code: answerCode,
        tense_frame: activeTenseFrame,
        module_number: 1,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: 'Q2',
        answer_code: answerCode,
        module_number: 1,
        tier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });

    // ── Scale ───────────────────────────────────────────────────────────
    } else if (isScaleAnswer) {
      const scaleValue = parseInt(answerCode.replace('SCALE_', ''), 10);
      await insertScaleResponse({
        scale_response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: currentQuestion.id,
        scale_value: scaleValue,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: currentQuestion.id,
        answer_code: answerCode,
        module_number: currentQuestion.module,
        tier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });

    // ── All other questions ─────────────────────────────────────────────
    } else if (!isNoneOption) {
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: currentQuestion.id,
        answer_code: answerCode,
        tense_frame: activeTenseFrame,
        module_number: currentQuestion.module,
        property_id: propertyId,
      });
      trackQuestionAnswered({
        question_id: currentQuestion.id,
        answer_code: answerCode,
        module_number: currentQuestion.module,
        tier,
        tense_frame: activeTenseFrame,
        property_id: propertyId,
      });
    }

    // None flag
    if (isNoneOption) {
      await insertNoneFlag({
        none_flag_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: currentQuestion.id,
        property_id: propertyId,
      });
      trackNoneFlagSelected({
        question_id: currentQuestion.id,
        module_number: currentQuestion.module,
        tier,
        property_id: propertyId,
      });
    }

    // ── Advance — check for episode transition ──────────────────────────
    const nextIndex = currentIndex + 1;

    if (nextIndex >= tierQuestions.length) {
      // End of session
      if (currentEpisode) {
        trackEpisodeCompleted({
          episode_number: currentEpisode.number,
          episode_name: currentEpisode.name,
          tier,
          property_id: propertyId,
        });
      }
      if (onComplete) onComplete();
      return;
    }

    // Check if we are crossing an episode boundary
    const nextQuestion = tierQuestions[nextIndex];
    const nextEpisode = getEpisodeForQuestion(nextQuestion, episodes);
    const crossingEpisode =
      nextEpisode && currentEpisode && nextEpisode.number !== currentEpisode.number;

    if (crossingEpisode) {
      // Fire episode_completed for the episode just finished
      trackEpisodeCompleted({
        episode_number: currentEpisode.number,
        episode_name: currentEpisode.name,
        tier,
        property_id: propertyId,
      });

      // AC1: Show hook for episodes 1-6 only (not after episode 7)
      // AC4: fire curiosity_hook_viewed
      if (currentEpisode.number <= 6 && currentEpisode.curiosityHookText) {
        trackCuriosityHookViewed({
          episode_number: currentEpisode.number,
          episode_name: currentEpisode.name,
          tier,
          property_id: propertyId,
        });
        // Show hook screen — store pending state
        setPendingHook({
          completedEpisode: currentEpisode,
          nextEpisode,
          nextIndex,
        });
        return; // Don't advance yet — wait for hook Continue click
      }
    }

    setCurrentIndex(nextIndex);
  }

  // ── Loading ────────────────────────────────────────────────────────────
  if (!sessionReady) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0D0D12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ color: '#475569', fontSize: '0.8125rem' }}>Starting session...</div>
      </div>
    );
  }

  // ── Curiosity hook screen — S3-05 ─────────────────────────────────────
  if (pendingHook) {
    return (
      <CuriosityHookScreen
        completedEpisode={pendingHook.completedEpisode}
        nextEpisode={pendingHook.nextEpisode}
        tierColor={tierColor}
        onContinue={handleHookContinue}
      />
    );
  }

  // ── Session complete placeholder ───────────────────────────────────────
  if (!currentQuestion) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#0D0D12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ color: '#94A3B8', fontSize: '0.9375rem' }}>
          Session complete — results screen coming in S3-08.
        </div>
      </div>
    );
  }

  // ── Question screen ────────────────────────────────────────────────────
  return (
    <Question
      key={currentQuestion.id}
      tier={tier}
      question={currentQuestion}
      tenseFrame={session.tenseFrame || resumedSession?.tense_frame}
      onAnswer={handleAnswer}
      questionNumber={`${currentQuestion.id} / ${tierQuestions.length}`}
      episodeName={currentEpisode?.name || getEpisodeName(currentQuestion.module)}
      episodes={episodes}
      currentEpisode={currentEpisodeNumber}
      progressWithinEpisode={progressWithinEpisode}
    />
  );
}
