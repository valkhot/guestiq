// src/components/question/Question.jsx
// GuestIQ — Standard Question Component (orchestrator)
// Passes tierColor to sub-components so Continue button uses correct tier colour.

import SingleSelectQuestion from './SingleSelectQuestion';
import ScaleQuestion from './ScaleQuestion';

// Tier colour map — matches Visual Identity Document (locked values)
const TIER_COLORS = {
  amateur: '#4ADE80',
  professional: '#60A5FA',
  expert: '#A78BFA',
};

const QUESTION_RENDERERS = {
  single_select: SingleSelectQuestion,
  multi_select: SingleSelectQuestion,
  scale_5: ScaleQuestion,
};

export default function Question({
  question,
  tenseFrame,
  onAnswer,
  questionNumber,
  episodeName,
  tier,
}) {
  const questionText = question.text[tenseFrame || 'retrospective'] || question.text.retrospective;

  const Renderer = QUESTION_RENDERERS[question.type];
  const tierColor = TIER_COLORS[tier] || TIER_COLORS.professional;

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
      {/* Progress bar area */}
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

        <Renderer question={question} onAnswer={onAnswer} tierColor={tierColor} />
      </div>
    </div>
  );
}
