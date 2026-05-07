// src/components/screens/CuriosityHookScreen.jsx
// GuestIQ — Curiosity Hook / End-of-Episode Screen
// S3-05: Appears after the last question of Episodes 1-6.
// Hook text and subtext read from episodes data — not hardcoded here.
// AC3: Continue button names the next episode.
// AC4: curiosity_hook_viewed PostHog event fired by parent (QuestionScreen).

export default function CuriosityHookScreen({
  completedEpisode,   // episode object just completed
  nextEpisode,        // episode object coming next
  tierColor,          // tier accent colour
  onContinue,         // fn() — advance to next episode
}) {
  const hookText = completedEpisode?.curiosityHookText || '';
  const nextName = nextEpisode?.name || 'the next section';

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
      {/* Episode complete indicator */}
      <div
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: `${tierColor}22`,
          border: `2px solid ${tierColor}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.75rem',
        }}
      >
        <span
          style={{
            fontSize: '1.25rem',
            color: tierColor,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          ✓
        </span>
      </div>

      {/* Episode name completed */}
      <p
        style={{
          fontSize: '0.8125rem',
          color: tierColor,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        {completedEpisode?.name} — complete
      </p>

      {/* Curiosity hook text — the engaging teaser for the next section */}
      <h2
        style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
          fontWeight: 600,
          color: '#F8FAFC',
          lineHeight: 1.35,
          maxWidth: '520px',
          marginBottom: '2.5rem',
        }}
      >
        {hookText}
      </h2>

      {/* Thin divider */}
      <div
        style={{
          width: '40px',
          height: '2px',
          background: `${tierColor}60`,
          borderRadius: '1px',
          marginBottom: '2.5rem',
        }}
      />

      {/* Continue button — AC3: names the next episode */}
      <button
        type="button"
        onClick={onContinue}
        style={{
          padding: '0.9375rem 2.5rem',
          background: tierColor,
          color: '#0D0D12',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'opacity 0.12s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {`Continue to ${nextName} →`}
      </button>
    </div>
  );
}
