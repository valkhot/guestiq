// src/components/screens/QuestionScreen.jsx
// GuestIQ — Question Screen
// S3-04: Episode tracking — current episode, progress within episode,
// episode_started and episode_completed PostHog events.

import { useState, useEffect, useRef } from 'react';

import {
  useQuestionnaire,
  getSecondaryIntentFromQ2Answer,
} from '../../hooks/useQuestionnaire';
import { useSession } from '../../hooks/useSession';
import Question from '../question/Question';
import { insertResponse, insertScaleResponse, insertNoneFlag } from '../../services/supabase';
import {
  trackRoutingGateAnswered,
  trackEpisodeStarted,
  trackEpisodeCompleted,
  trackQuestionAnswered,
  trackNoneFlagSelected,
  trackPurposeExpert,
} from '../../services/analytics';

function getTenseFrame(answerCode) {
  return answerCode === 'B' ? 'anticipatory' : 'retrospective';
}

// Derive which episode a question belongs to
function getEpisodeForQuestion(question, episodes) {
  if (!question || !episodes) return null;
  return episodes.find((ep) => ep.moduleMappings.includes(question.module)) || null;
}

// Compute progress within the current episode (0.0–1.0)
function computeEpisodeProgress(currentIndex, tierQuestions, episodes) {
  const currentQ = tierQuestions[currentIndex];
  if (!currentQ || !episodes) return 0;

  const currentEp = getEpisodeForQuestion(currentQ, episodes);
  if (!currentEp) return 0;

  // Find all questions in this episode for this tier's question list
  const epQuestions = tierQuestions.filter((q) =>
    currentEp.moduleMappings.includes(q.module)
  );
  if (epQuestions.length === 0) return 0;

  // Index of current question within the episode
  const posInEp = epQuestions.findIndex((q) => q.id === currentQ.id);
  if (posInEp < 0) return 0;

  // Return proportion answered (not including current)
  return posInEp / epQuestions.length;
}

export default function QuestionScreen({ tier, propertyId, onComplete, resumedSession }) {
  const { filterQuestionsForSession, episodes } = useQuestionnaire();
  const session = useSession(propertyId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionReady, setSessionReady] = useState(false);
  const [secondaryIntentCategory, setSecondaryIntentCategory] = useState(null);

  // Track last episode to detect transitions
  const lastEpisodeRef = useRef(null);

  const intentCategory = session.intentCategory || resumedSession?.intent_category || null;

  const tierQuestions = filterQuestionsForSession({
    tier,
    intentCategory,
    secondaryIntentCategory,
  });

  const currentQuestion = tierQuestions[currentIndex];

  // Compute episode state
  const currentEpisode = currentQuestion
    ? getEpisodeForQuestion(currentQuestion, episodes)
    : null;

  const currentEpisodeNumber = currentEpisode?.number || 1;

  const progressWithinEpisode = computeEpisodeProgress(
    currentIndex,
    tierQuestions,
    episodes
  );

  const getEpisodeName = (moduleNum) => {
    const ep = episodes.find((e) => e.moduleMappings.includes(moduleNum));
    return ep?.name || 'GuestIQ';
  };

  // Fire episode events when episode changes
  useEffect(() => {
    if (!sessionReady || !currentEpisode) return;

    const lastEp = lastEpisodeRef.current;

    // Episode completed — fired when leaving an episode
    if (lastEp && lastEp.number !== currentEpisode.number) {
      trackEpisodeCompleted({
        episode_number: lastEp.number,
        episode_name: lastEp.name,
        tier,
        property_id: propertyId,
      });

      // Episode started — fired when entering a new episode
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

        // Fire episode_started for Episode 1
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

  async function handleAnswer(answerCode, taxonomyCode, extraText) {
    const activeSessionId = session.sessionId || resumedSession?.session_id;
    const activeTenseFrame =
      session.tenseFrame || resumedSession?.tense_frame || 'retrospective';

    if (!activeSessionId) return;

    const isNoneOption = answerCode === 'NONE';
    const isScaleAnswer = answerCode?.startsWith('SCALE_');

    // ── Q0 — Tense routing ─────────────────────────────────────────────
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

    // ── Q1 — Intent category ───────────────────────────────────────────
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

    // ── Q2 — Secondary intent ──────────────────────────────────────────
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

    // ── Scale response ─────────────────────────────────────────────────
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

    // ── All other questions ────────────────────────────────────────────
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

    // Advance
    const nextIndex = currentIndex + 1;
    if (nextIndex >= tierQuestions.length) {
      // Fire episode_completed for final episode
      if (currentEpisode) {
        trackEpisodeCompleted({
          episode_number: currentEpisode.number,
          episode_name: currentEpisode.name,
          tier,
          property_id: propertyId,
        });
      }
      if (onComplete) onComplete();
    } else {
      setCurrentIndex(nextIndex);
    }
  }

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
