// src/components/question/EpisodeMap.jsx
// GuestIQ — Episode Map Component
// S3-04: 7-node episode map with progress bar.
// AC1: Progress bar fills proportionally within the current episode.
// AC2: Completed episodes show checkmark, current episode pulses, future muted.
// AC3: Episode names read from questionnaire data — not hardcoded here.
//
// S3-09:
//   - Removed ensurePulseStyle() — @keyframes giq-pulse is now in global.css
//   - Tier hex and RGB values imported from src/constants/tierColors.js
//   - Static colours migrated to Tailwind utility classes / CSS variables

import { useEffect, useState } from 'react';

import { getTierHex, getTierRgb } from '../../constants/tierColors';

export default function EpisodeMap({
  episodes,           // array from questionnaire data
  currentEpisode,     // episode number currently active (1–7)
  progressWithinEp,   // 0.0–1.0 — how far through the current episode
  tier,               // 'amateur' | 'professional' | 'expert'
}) {
  const [tooltip, setTooltip] = useState(null); // episode number being hovered
  const tierColor = getTierHex(tier);
  const tierRgb = getTierRgb(tier);

  // Set CSS variable for pulse animation colour — keyframe lives in global.css.
  useEffect(() => {
    document.documentElement.style.setProperty('--giq-tier-rgb', tierRgb);
  }, [tierRgb]);

  return (
    <div className="max-w-[720px] mx-auto px-6">
      {/* Progress bar — fills within current episode only */}
      <div
        className="rounded-sm overflow-hidden bg-white/5 mb-2.5"
        style={{ height: '3px' }}
      >
        <div
          className="h-full rounded-sm transition-[width] duration-[400ms] ease-out"
          style={{
            width: `${Math.min(100, Math.max(0, progressWithinEp * 100))}%`,
            background: tierColor,
          }}
        />
      </div>

      {/* Episode nodes row */}
      <div className="flex items-center justify-between relative">
        {/* Connector line behind nodes */}
        <div
          className="absolute top-1/2 -translate-y-1/2 bg-white/[0.07] z-0"
          style={{ left: '12px', right: '12px', height: '1px' }}
        />

        {episodes.map((ep) => {
          const isCompleted = ep.number < currentEpisode;
          const isCurrent = ep.number === currentEpisode;
          return (
            <div
              key={ep.number}
              className="relative z-10"
              onMouseEnter={() => setTooltip(ep.number)}
              onMouseLeave={() => setTooltip(null)}
            >
              {/* Tooltip on hover — AC4 */}
              {tooltip === ep.number && (
                <div
                  className={
                    'absolute left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-md ' +
                    'bg-neutral-800 border border-white/10 text-neutral-200 ' +
                    'whitespace-nowrap pointer-events-none z-10'
                  }
                  style={{
                    bottom: '28px',
                    fontSize: '11px',
                  }}
                >
                  {ep.name}
                </div>
              )}

              {/* Node circle */}
              <div
                className={
                  'rounded-full flex items-center justify-center ' +
                  'transition-all duration-300 ' +
                  (isCurrent ? 'giq-node-current' : '')
                }
                style={{
                  width: '20px',
                  height: '20px',
                  background: isCompleted
                    ? tierColor
                    : isCurrent
                      ? `${tierColor}22`
                      : 'rgba(255,255,255,0.04)',
                  border: isCompleted || isCurrent
                    ? `2px solid ${tierColor}`
                    : '2px solid rgba(255,255,255,0.12)',
                }}
              >
                {isCompleted ? (
                  // Checkmark for completed episodes
                  <span
                    className="font-bold leading-none"
                    style={{
                      fontSize: '10px',
                      color: 'var(--canvas-respondent)',
                    }}
                  >
                    ✓
                  </span>
                ) : isCurrent ? (
                  // Filled dot for current episode
                  <div
                    className="rounded-full"
                    style={{
                      width: '7px',
                      height: '7px',
                      background: tierColor,
                    }}
                  />
                ) : (
                  // Episode number for future episodes
                  <span
                    className="font-medium leading-none text-[#334155]"
                    style={{ fontSize: '9px' }}
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
