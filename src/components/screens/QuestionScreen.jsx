// src/components/screens/QuestionScreen.jsx
// GuestIQ — Question Screen
// S2-09: All Module 1 questions with tier routing, intent_category write, none_flag write

import { useState, useEffect } from 'react';

import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSession } from '../../hooks/useSession';
import Question from '../question/Question';
import { insertResponse, insertNoneFlag } from '../../services/supabase';
import {
  trackRoutingGateAnswered,
  trackEpisodeStarted,
  trackQuestionAnswered,
  trackNoneFlagSelected,
} from '../../services/analytics';

// Derive tense_frame from Q0 answer code
// A/C/D → retrospective, B → anticipatory
function getTenseFrame(answerCode) {
  return answerCode === 'B' ? 'anticipatory' : 'retrospective';
}

export default function QuestionScreen({ tier, propertyId, onComplete, resumedSession }) {
  const { questions, episodes } = useQuestionnaire();
  const session = useSession(propertyId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionReady, setSessionReady] = useState(false);

  // AC1+AC2: Filter questions for this tier — drives correct subset per tier
  const tierQuestions = questions.filter((q) => q.tiers.includes(tier));
  const currentQuestion = tierQuestions[currentIndex];

  // Episode lookup for progress display
  const getEpisodeName = (moduleNum) => {
    const ep = episodes.find((e) => e.moduleMappings.includes(moduleNum));
    return ep?.name || 'Episode 1';
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

  // Handle answer from Question component
  async function handleAnswer(answerCode, taxonomyCode, extraText) {
    const activeSessionId = session.sessionId || resumedSession?.session_id;
    const activeTenseFrame = session.tenseFrame || resumedSession?.tense_frame || 'retrospective';

    if (!activeSessionId) return;

    const isNoneOption = answerCode === 'NONE';

    // ── Q0 — Tense routing ────────────────────────────────────────────
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

      // ── Q1 — Intent category capture (AC3) ───────────────────────────
    } else if (currentQuestion.id === 'Q1' && !isNoneOption) {
      // AC3: Write intent_category to sessions table via updateSession
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

      // ── All other questions ───────────────────────────────────────────
    } else {
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

    // AC4: None flag — write to none_flags table on EVERY question
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

  // Loading state
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
          Session complete — results screen coming in Sprint 3.
        </div>
      </div>
    );
  }

  return (
    <Question
      question={currentQuestion}
      tenseFrame={session.tenseFrame || resumedSession?.tense_frame}
      onAnswer={handleAnswer}
      questionNumber={`${currentQuestion.id} / ${tierQuestions.length}`}
      episodeName={getEpisodeName(currentQuestion.module)}
    />
  );
}
