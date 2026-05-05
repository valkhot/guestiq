// src/components/screens/QuestionScreen.jsx
// GuestIQ — Question Screen
// S3-01: Module 5 branching engine integrated.
// filterQuestionsForSession() from useQuestionnaire builds the correct
// question sequence based on tier + intent_category + secondary intent.

import { useState, useEffect } from 'react';

import { useQuestionnaire, getSecondaryIntentFromQ2Answer } from '../../hooks/useQuestionnaire';
import { useSession } from '../../hooks/useSession';
import Question from '../question/Question';
import { insertResponse, insertScaleResponse, insertNoneFlag } from '../../services/supabase';
import {
  trackRoutingGateAnswered,
  trackEpisodeStarted,
  trackQuestionAnswered,
  trackNoneFlagSelected,
  trackPurposeExpert,
} from '../../services/analytics';

function getTenseFrame(answerCode) {
  return answerCode === 'B' ? 'anticipatory' : 'retrospective';
}

export default function QuestionScreen({ tier, propertyId, onComplete, resumedSession }) {
  const { filterQuestionsForSession, episodes } = useQuestionnaire();
  const session = useSession(propertyId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionReady, setSessionReady] = useState(false);
  // Secondary intent category — set when Q2 is answered
  const [secondaryIntentCategory, setSecondaryIntentCategory] = useState(null);

  // Build the question list for this session.
  // Re-computed whenever intent_category or secondary intent changes.
  // This is the core of the branching engine — the question list is dynamic.
  const intentCategory = session.intentCategory || resumedSession?.intent_category || null;

  const tierQuestions = filterQuestionsForSession({
    tier,
    intentCategory,
    secondaryIntentCategory,
  });

  const currentQuestion = tierQuestions[currentIndex];

  const getEpisodeName = (moduleNum) => {
    const ep = episodes.find((e) => e.moduleMappings.includes(moduleNum));
    return ep?.name || 'GuestIQ';
  };

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
        trackEpisodeStarted({
          episode_number: 1,
          episode_name: ep1?.name || 'Episode 1',
          tier,
          property_id: propertyId,
        });
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

    // ── Q1 — Intent category capture ───────────────────────────────────
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

    // ── Q2 — Secondary intent capture (AC3) ────────────────────────────
    } else if (currentQuestion.id === 'Q2' && !isNoneOption && answerCode !== 'A') {
      const secondaryIntent = getSecondaryIntentFromQ2Answer(answerCode);
      if (secondaryIntent && secondaryIntent !== intentCategory) {
        setSecondaryIntentCategory(secondaryIntent);
        // AC5: purpose_expert PostHog event fires when secondary sub-section triggered
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

    // None flag write — on every question except scale and Q0
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

    // Advance to next question
    const nextIndex = currentIndex + 1;
    if (nextIndex >= tierQuestions.length) {
      if (onComplete) onComplete();
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  // Loading
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
      episodeName={getEpisodeName(currentQuestion.module)}
    />
  );
}
