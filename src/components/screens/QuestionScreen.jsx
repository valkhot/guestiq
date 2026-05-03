// src/components/screens/QuestionScreen.jsx
// GuestIQ — Question Screen
// S2-07: Renders Q0 (QR1) as first instrument question after tier selection.
// Manages question flow state: current question index, responses.
// Session creation happens here after tier selection.

import { useState, useEffect } from 'react';

import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useSession } from '../../hooks/useSession';
import Question from '../question/Question';
import { insertResponse } from '../../services/supabase';
import {
  trackRoutingGateAnswered,
  trackEpisodeStarted,
  trackQuestionAnswered,
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

  // Filter questions for this tier
  const tierQuestions = questions.filter((q) => q.tiers.includes(tier));

  // Current question
  const currentQuestion = tierQuestions[currentIndex];

  // Episode 1 name for progress display
  const episode1 = episodes.find((e) => e.number === 1);

  // Start session on mount (or restore if resuming)
  useEffect(() => {
    async function init() {
      if (resumedSession) {
        // Resuming — restore state from existing session
        session.restoreSession(resumedSession);
        // Find where they left off — skip to first unanswered question
        // For now: start from Q0 if tense_frame not set, else Q1
        const startIndex = resumedSession.tense_frame ? 1 : 0;
        setCurrentIndex(startIndex);
        setSessionReady(true);
      } else {
        // New session — create in Supabase
        await session.startSession(tier);
        setSessionReady(true);

        // Fire episode_started for Episode 1
        trackEpisodeStarted({
          episode_number: 1,
          episode_name: episode1?.name || 'Episode 1',
          tier,
          property_id: propertyId,
        });
      }
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle answer — called by Question component on any option selection
  async function handleAnswer(answerCode, taxonomyCode, extraText) {
    if (!session.sessionId && !resumedSession?.session_id) return;

    const activeSessionId = session.sessionId || resumedSession?.session_id;
    const activeTenseFrame = session.tenseFrame || resumedSession?.tense_frame || 'retrospective';

    // AC4: Q0 logic — set tense_frame from answer code
    if (currentQuestion.id === 'QR1') {
      const frame = getTenseFrame(answerCode);

      // Persist tense_frame to session
      await session.setTenseFrameAndPersist(frame);

      // Write response record
      await insertResponse({
        response_id: crypto.randomUUID(),
        session_id: activeSessionId,
        question_id: 'QR1',
        answer_code: answerCode,
        tense_frame: frame,
        module_number: 0,
        property_id: propertyId,
      });

      // AC5: routing_gate_answered PostHog event
      trackRoutingGateAnswered({
        tense_frame: frame,
        answer_option: answerCode,
        property_id: propertyId,
        ...(extraText ? { qr1_other_text: extraText } : {}),
      });
    } else {
      // Standard question — insert response
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

    // Advance to next question
    const nextIndex = currentIndex + 1;
    if (nextIndex >= tierQuestions.length) {
      // Session complete — handled in later sprint step
      if (onComplete) onComplete();
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  // Loading state while session is being created
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

  // AC1 + AC2: Q0 rendered by standard Question component — identical to Q1-Q79
  return (
    <Question
      question={currentQuestion}
      tenseFrame={session.tenseFrame || resumedSession?.tense_frame}
      onAnswer={handleAnswer}
      questionNumber={`Q${currentIndex} / ${tierQuestions.length}`}
      episodeName={episode1?.name || 'Episode 1'}
    />
  );
}
