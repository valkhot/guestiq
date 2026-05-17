// src/components/screens/CuriosityHookScreen.jsx
// GuestIQ — Curiosity Hook / End-of-Episode Screen
// S3-05: Appears after the last question of Episodes 1-6.
// Hook text and subtext read from episodes data — not hardcoded here.
// AC3: Continue button names the next episode.
// AC4: curiosity_hook_viewed PostHog event fired by parent (QuestionScreen).
//
// S3-09 Commit 3: Episode accent colour replaces tier colour per Visual Design
//   System § 6. The hook is the celebration screen for the just-completed
//   episode, so it uses that episode's accent — Episode 1's teal, Episode 2's
//   amber, etc. Top accent bar (4px) anchors the episode identity visually.

import { getEpisodeAccent } from '../../constants/episodeColors';

export default function CuriosityHookScreen({
  completedEpisode,   // episode object just completed (has .number, .name)
  nextEpisode,        // episode object coming next
  onContinue,         // fn() — advance to next episode
}) {
  const hookText = completedEpisode?.curiosityHookText || '';
  const nextName = nextEpisode?.name || 'the next section';
  const episodeNumber = completedEpisode?.number;
  const accent = getEpisodeAccent(episodeNumber);

  return (
    <div
      className={
        'min-h-screen bg-canvas-respondent flex flex-col items-center ' +
        'justify-center text-center px-6 py-8 relative'
      }
    >
      {/* 4px top accent bar — Visual Design System § 6.2 */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: '4px',
          background: accent,
        }}
        aria-hidden="true"
      />

      {/* Episode complete indicator — checkmark in episode-accent ring */}
      <div
        className="rounded-full flex items-center justify-center mb-7"
        style={{
          width: '48px',
          height: '48px',
          background: `${accent}22`,
          border: `2px solid ${accent}`,
        }}
      >
        <span
          className="text-heading-md font-bold leading-none"
          style={{ color: accent }}
        >
          ✓
        </span>
      </div>

      {/* Episode name completed */}
      <p
        className="text-caption font-semibold uppercase mb-4"
        style={{
          letterSpacing: '0.08em',
          color: accent,
        }}
      >
        {completedEpisode?.name} — complete
      </p>

      {/* Curiosity hook text — the engaging teaser for the next section */}
      <h2
        className="font-semibold text-primary max-w-[520px] mb-10"
        style={{
          fontSize: 'clamp(1.25rem, 3vw, 1.625rem)',
          lineHeight: 1.35,
        }}
      >
        {hookText}
      </h2>

      {/* Thin divider */}
      <div
        className="rounded-sm mb-10"
        style={{
          width: '40px',
          height: '2px',
          background: `${accent}60`,
        }}
      />

      {/* Continue button — AC3: names the next episode */}
      <button
        type="button"
        onClick={onContinue}
        className={
          'px-10 py-3.5 rounded-lg text-body font-semibold cursor-pointer ' +
          'transition-opacity duration-[120ms] hover:opacity-90'
        }
        style={{
          background: accent,
          color: 'var(--canvas-respondent)',
          border: 'none',
        }}
      >
        {`Continue to ${nextName} →`}
      </button>
    </div>
  );
}
