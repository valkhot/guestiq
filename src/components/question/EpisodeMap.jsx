// src/components/question/EpisodeMap.jsx
// GuestIQ — Episode Map Component
// S3-04: 7-node episode map with progress bar.
// AC1: Progress bar fills proportionally within the current episode.
// AC2: Completed episodes show checkmark, current episode pulses, future muted.
// AC3: Episode names read from questionnaire data — not hardcoded here.

import { useEffect, useState } from 'react';

// Pulsing ring animation via CSS keyframes injected once
const PULSE_STYLE_ID = 'guestiq-pulse-style';
function ensurePulseStyle() {
  if (document.getElementById(PULSE_STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = PULSE_STYLE_ID;
  style.textContent = `
    @keyframes giq-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(var(--giq-tier-rgb), 0.5); }
      50% { box-shadow: 0 0 0 5px rgba(var(--giq-tier-rgb), 0); }
    }
    .giq-node-current {
      animation: giq-pulse 1.8s ease-in-out infinite;
    }
  `;
  document.head.appendChild(style);
}

// Tier colour → RGB for CSS variable
const TIER_RGB = {
  amateur:      '74, 222, 128',
  professional: '96, 165, 250',
  expert:       '167, 139, 250',
};

const TIER_HEX = {
  amateur:      '#4ADE80',
  professional: '#60A5FA',
  expert:       '#A78BFA',
};

export default function EpisodeMap({
  episodes,           // array from questionnaire data
  currentEpisode,     // episode number currently active (1–7)
  progressWithinEp,   // 0.0–1.0 — how far through the current episode
  tier,               // 'amateur' | 'professional' | 'expert'
}) {
  const [tooltip, setTooltip] = useState(null); // episode number being hovered
  const tierColor = TIER_HEX[tier] || TIER_HEX.professional;
  const tierRgb = TIER_RGB[tier] || TIER_RGB.professional;

  useEffect(() => {
    ensurePulseStyle();
    // Set CSS variable for pulse animation colour
    document.documentElement.style.setProperty('--giq-tier-rgb', tierRgb);
  }, [tierRgb]);

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1.5rem' }}>
      {/* Progress bar — fills within current episode only */}
      <div
        style={{
          height: '3px',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '2px',
          marginBottom: '10px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${Math.min(100, Math.max(0, progressWithinEp * 100))}%`,
            background: tierColor,
            borderRadius: '2px',
            transition: 'width 0.4s ease',
          }}
        />
      </div>

      {/* Episode nodes row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Connector line behind nodes */}
        <div
          style={{
            position: 'absolute',
            left: '12px',
            right: '12px',
            top: '50%',
            height: '1px',
            background: 'rgba(255,255,255,0.07)',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }}
        />

        {episodes.map((ep) => {
          const isCompleted = ep.number < currentEpisode;
          const isCurrent = ep.number === currentEpisode;
          const isFuture = ep.number > currentEpisode;

          return (
            <div
              key={ep.number}
              style={{ position: 'relative', zIndex: 1 }}
              onMouseEnter={() => setTooltip(ep.number)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Tooltip on hover — AC4 */}
              {tooltip === ep.number && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '28px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#1E293B',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '11px',
                    color: '#E2E8F0',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                    zIndex: 10,
                  }}
                >
                  {ep.name}
                </div>
              )}

              {/* Node circle */}
              <div
                className={isCurrent ? 'giq-node-current' : ''}
                style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isCompleted
                    ? tierColor
                    : isCurrent
                      ? `${tierColor}22`
                      : 'rgba(255,255,255,0.04)',
                  border: isCompleted
                    ? `2px solid ${tierColor}`
                    : isCurrent
                      ? `2px solid ${tierColor}`
                      : '2px solid rgba(255,255,255,0.12)',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                }}
              >
                {isCompleted ? (
                  // Checkmark for completed episodes
                  <span
                    style={{ fontSize: '10px', color: '#0D0D12', fontWeight: 700, lineHeight: 1 }}
                  >
                    ✓
                  </span>
                ) : isCurrent ? (
                  // Filled dot for current episode
                  <div
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: tierColor,
                    }}
                  />
                ) : (
                  // Episode number for future episodes
                  <span
                    style={{
                      fontSize: '9px',
                      color: '#334155',
                      fontWeight: 500,
                      lineHeight: 1,
                    }}
                  >
                    {ep.number}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
