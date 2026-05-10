// src/components/screens/TierUpgradeScreen.jsx
// GuestIQ — Tier Upgrade Prompt Screen
// S3-07: Appears after Episode 1 (Amateur→Professional) and Episode 4 (Professional→Expert).
// AC1/AC2: Shows time estimate, benefit, Accept and Decline buttons.
// AC4: PostHog events fired by parent (QuestionScreen).

const TIER_COLORS = {
  amateur:      '#4ADE80',
  professional: '#60A5FA',
  expert:       '#A78BFA',
};

const TIER_LABELS = {
  professional: 'Professional',
  expert:       'Expert',
};

// Upgrade config by current tier
const UPGRADE_CONFIG = {
  amateur: {
    toTier:              'professional',
    additionalTime:      '~3 more minutes',
    additionalQuestions: 'about 26 more questions',
    benefit: 'Deeper insight into pre-arrival expectations, physical environment, and service dynamics — the dimensions that drive repeat visits.',
    acceptLabel:         'Yes — upgrade to Professional',
    declineLabel:        'No thanks — keep going as Amateur',
  },
  professional: {
    toTier:              'expert',
    additionalTime:      '~8 more minutes',
    additionalQuestions: 'about 20 more questions',
    benefit: 'The complete picture — value perception, post-stay relationships, and the full synthesis of what makes a hotel truly exceptional.',
    acceptLabel:         'Yes — upgrade to Expert',
    declineLabel:        'No thanks — keep going as Professional',
  },
};

export default function TierUpgradeScreen({ currentTier, onAccept, onDecline }) {
  const config = UPGRADE_CONFIG[currentTier];
  if (!config) return null;

  const toColor = TIER_COLORS[config.toTier];
  const fromColor = TIER_COLORS[currentTier];
  const toLabel = TIER_LABELS[config.toTier];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0D12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1.5rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        textAlign: 'center',
      }}
    >
      {/* Tier transition indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            padding: '0.375rem 0.875rem',
            borderRadius: '20px',
            background: `${fromColor}18`,
            border: `1px solid ${fromColor}50`,
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: fromColor,
          }}
        >
          {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
        </div>
        <span style={{ color: '#334155', fontSize: '1rem' }}>→</span>
        <div
          style={{
            padding: '0.375rem 0.875rem',
            borderRadius: '20px',
            background: `${toColor}18`,
            border: `1px solid ${toColor}50`,
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: toColor,
          }}
        >
          {toLabel}
        </div>
      </div>

      {/* Headline */}
      <h2
        style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
          fontWeight: 600,
          color: '#F8FAFC',
          lineHeight: 1.35,
          maxWidth: '480px',
          marginBottom: '1rem',
        }}
      >
        You are doing great. Want to go deeper?
      </h2>

      {/* Time and question count */}
      <p
        style={{
          fontSize: '0.9375rem',
          color: toColor,
          fontWeight: 500,
          marginBottom: '1.25rem',
        }}
      >
        {config.additionalTime} · {config.additionalQuestions}
      </p>

      {/* Benefit text */}
      <p
        style={{
          fontSize: '0.9375rem',
          color: '#94A3B8',
          lineHeight: 1.6,
          maxWidth: '440px',
          marginBottom: '2.5rem',
        }}
      >
        {config.benefit}
      </p>

      {/* Accept button */}
      <button
        type="button"
        onClick={onAccept}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0.9375rem',
          background: toColor,
          color: '#0D0D12',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '0.75rem',
          transition: 'opacity 0.12s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {config.acceptLabel}
      </button>

      {/* Decline button */}
      <button
        type="button"
        onClick={onDecline}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '0.9375rem',
          background: 'transparent',
          color: '#475569',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '8px',
          fontSize: '0.9375rem',
          cursor: 'pointer',
          transition: 'all 0.12s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)';
          e.currentTarget.style.color = '#94A3B8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
          e.currentTarget.style.color = '#475569';
        }}
      >
        {config.declineLabel}
      </button>
    </div>
  );
}
