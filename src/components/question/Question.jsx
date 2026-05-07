// src/components/question/Question.jsx
// GuestIQ — Standard Question Component (orchestrator)
// S3-04: EpisodeMap integrated — progress bar and episode nodes on every screen.

import SingleSelectQuestion from './SingleSelectQuestion';
import ScaleQuestion from './ScaleQuestion';
import EpisodeMap from './EpisodeMap';

const TIER_COLORS = {
  amateur:      '#4ADE80',
  professional: '#60A5FA',
  expert:       '#A78BFA',
};

const QUESTION_RENDERERS = {
  single_select: SingleSelectQuestion,
  multi_select:  SingleSelectQuestion,
  scale_5:       ScaleQuestion,
};

export default function Question({
  question,
  tenseFrame,
  onAnswer,
  questionNumber,
  episodeName,
  tier,
  // S3-04 props
  episodes,
  currentEpisode,
  progressWithinEpisode,
}) {
  const questionText =
    question.text[tenseFrame || 'retrospective'] || question.text.retrospective;

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
      {/* Top bar — episode map + progress */}
      <div
        style={{
          padding: '0.875rem 0 0.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Question counter + episode name */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '720px',
            margin: '0 auto',
            padding: '0 1.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <span style={{ fontSize: '0.75rem', color: '#475569' }}>{questionNumber}</span>
          <span
            style={{ fontSize: '0.75rem', color: '#475569', fontWeight: 500 }}
          >
            {episodeName}
          </span>
        </div>

        {/* Episode map with progress bar */}
        {episodes && episodes.length > 0 ? (
          <EpisodeMap
            episodes={episodes}
            currentEpisode={currentEpisode || 1}
            progressWithinEp={progressWithinEpisode || 0}
            tier={tier}
          />
        ) : (
          // Fallback plain progress bar if episodes not yet available
          <div
            style={{
              maxWidth: '720px',
              margin: '0 auto',
              padding: '0 1.5rem',
            }}
          >
            <div
              style={{
                height: '3px',
                background: 'rgba(255,255,255,0.06)',
                borderRadius: '2px',
              }}
            />
          </div>
        )}
      </div>

      {/* Question content */}
      <div
        style={{
          flex: 1,
          maxWidth: '720px',
          width: '100%',
          margin: '0 auto',
          padding: '2rem 1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)',
            fontWeight: 600,
            color: '#F8FAFC',
            lineHeight: 1.45,
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
