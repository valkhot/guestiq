// src/components/screens/TierUpgradeScreen.jsx
// GuestIQ — Tier Upgrade Prompt Screen
// S3-07: Appears after Episode 1 (Amateur→Professional) and Episode 4 (Professional→Expert).
// AC1/AC2: Shows time estimate, benefit, Accept and Decline buttons.
// AC4: PostHog events fired by parent (QuestionScreen).
// S3-09: Migrated from inline hex styles to Tailwind utility classes + token imports.

import { TIER_HEX, getTierLabel } from '../../constants/tierColors';

// Upgrade config by current tier
const UPGRADE_CONFIG = {
  amateur: {
    toTier:              'professional',
    additionalTime:      '~3 more minutes',
    additionalQuestions: 'about 26 more questions',
    benefit:
      'Deeper insight into pre-arrival expectations, physical environment, and ' +
      'service dynamics — the dimensions that drive repeat visits.',
    acceptLabel:         'Yes — upgrade to Professional',
    declineLabel:        'No thanks — keep going as Amateur',
  },
  professional: {
    toTier:              'expert',
    additionalTime:      '~8 more minutes',
    additionalQuestions: 'about 20 more questions',
    benefit:
      'The complete picture — value perception, post-stay relationships, and the ' +
      'full synthesis of what makes a hotel truly exceptional.',
    acceptLabel:         'Yes — upgrade to Expert',
    declineLabel:        'No thanks — keep going as Professional',
  },
};

export default function TierUpgradeScreen({ currentTier, onAccept, onDecline }) {
  const config = UPGRADE_CONFIG[currentTier];
  if (!config) return null;

  // Dynamic tier colours — must stay as inline style values because we use
  // hex-with-alpha suffixes (`${color}18`, `${color}50`) which Tailwind can't
  // emit at build time from a runtime prop.
  const toColor = TIER_HEX[config.toTier];
  const fromColor = TIER_HEX[currentTier];
  const toLabel = getTierLabel(config.toTier);

  return (
    <div
      className={
        'min-h-screen bg-canvas-respondent flex flex-col items-center ' +
        'justify-center text-center px-6 py-8'
      }
    >
      {/* Tier transition indicator */}
      <div className="flex items-center gap-3 mb-8">
        <div
          className="px-3.5 py-1.5 rounded-pill text-caption font-semibold"
          style={{
            background: `${fromColor}18`,
            border: `1px solid ${fromColor}50`,
            color: fromColor,
          }}
        >
          {getTierLabel(currentTier)}
        </div>
        <span className="text-base text-neutral-600">→</span>
        <div
          className="px-3.5 py-1.5 rounded-pill text-caption font-semibold"
          style={{
            background: `${toColor}18`,
            border: `1px solid ${toColor}50`,
            color: toColor,
          }}
        >
          {toLabel}
        </div>
      </div>

      {/* Headline */}
      <h2
        className="font-semibold text-primary leading-snug max-w-[480px] mb-4"
        style={{ fontSize: 'clamp(1.25rem, 3vw, 1.5rem)' }}
      >
        You are doing great. Want to go deeper?
      </h2>

      {/* Time and question count */}
      <p
        className="text-body font-medium mb-5"
        style={{ color: toColor }}
      >
        {config.additionalTime} · {config.additionalQuestions}
      </p>

      {/* Benefit text */}
      <p className="text-body text-secondary leading-relaxed max-w-[440px] mb-10">
        {config.benefit}
      </p>

      {/* Accept button */}
      <button
        type="button"
        onClick={onAccept}
        className={
          'w-full max-w-[400px] py-3.5 rounded-lg text-body font-semibold ' +
          'cursor-pointer transition-opacity hover:opacity-90 mb-3'
        }
        style={{
          background: toColor,
          color: 'var(--canvas-respondent)',
          border: 'none',
        }}
      >
        {config.acceptLabel}
      </button>

      {/* Decline button */}
      <button
        type="button"
        onClick={onDecline}
        className={
          'w-full max-w-[400px] py-3.5 rounded-lg text-body cursor-pointer ' +
          'bg-transparent text-neutral-600 border border-white/10 ' +
          'transition-colors hover:text-neutral-400 hover:border-white/20'
        }
      >
        {config.declineLabel}
      </button>
    </div>
  );
}
