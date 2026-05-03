// src/components/question/Question.jsx
// GuestIQ — Standard Question Component (orchestrator)
// S2-07: Q0 (QR1) rendered by this component — identical to Q1-Q79
// Renders the correct sub-component based on question.type.
// Receives ALL content as props — zero hardcoded strings.

import SingleSelectQuestion from './SingleSelectQuestion';

// Question types to sub-components map
// scale_5 and multi_select added in Sprint 3
const QUESTION_RENDERERS = {
  single_select: SingleSelectQuestion,
  multi_select: SingleSelectQuestion,
};

export default function Question({
  question, // full question object from questionnaire.js
  tenseFrame, // 'retrospective' | 'anticipatory' — determines text variant
  onAnswer, // fn(answerCode, taxonomyCode, extraText?) — called on selection
  questionNumber, // e.g. "Q0 / 8" for progress display
  episodeName, // e.g. "Why You Stay"
}) {
  // Select correct text variant based on tense frame
  // Defaults to retrospective if tenseFrame not yet set (Q0 itself)
  const questionText = question.text[tenseFrame || 'retrospective'] || question.text.retrospective;

  const Renderer = QUESTION_RENDERERS[question.type];

  if (!Renderer) {
    return (
      <div style={{ color: '#EF4444', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
        Unknown question type: {question.type}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0D12',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Progress bar area — placeholder for Sprint 3 gamification */}
      <div
        style={{
          padding: '1rem 1.5rem 0',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '720px',
            margin: '0 auto',
            paddingBottom: '0.75rem',
          }}
        >
          <span style={{ fontSize: '0.8125rem', color: '#475569' }}>{questionNumber}</span>
          <span style={{ fontSize: '0.8125rem', color: '#475569' }}>{episodeName}</span>
        </div>
        {/* Progress bar track */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            height: '3px',
            background: 'rgba(255,255,255,0.06)',
            borderRadius: '2px',
          }}
        />
      </div>

      {/* Question content */}
      <div
        style={{
          flex: 1,
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          padding: '2.5rem 1.5rem',
        }}
      >
        {/* Question text */}
        <h2
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)',
            fontWeight: 600,
            color: '#F8FAFC',
            lineHeight: 1.4,
            marginBottom: question.instruction ? '0.5rem' : '1.75rem',
          }}
        >
          {questionText}
        </h2>

        {/* Instruction line */}
        {question.instruction && (
          <p
            style={{
              fontSize: '0.875rem',
              color: '#64748B',
              marginBottom: '1.75rem',
              lineHeight: 1.5,
            }}
          >
            {question.instruction}
          </p>
        )}

        {/* Options rendered by sub-component */}
        <Renderer question={question} onAnswer={onAnswer} />
      </div>
    </div>
  );
}
