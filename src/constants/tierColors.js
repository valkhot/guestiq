// src/constants/tierColors.js
// GuestIQ — Single source of truth for tier hex values
// Source: Visual Design System v1.0 § 2.1 — LOCKED values
//
// Replaces duplicate TIER_COLORS / TIER_HEX maps previously declared in:
//   - WelcomeScreen.jsx
//   - TierUpgradeScreen.jsx
//   - QuestionScreen.jsx
//   - Question.jsx
//   - EpisodeMap.jsx
//
// Consumers import this map rather than redefining locally.
// Components that prefer CSS variables can instead use var(--tier-amateur)
// etc. from global.css — both produce the same hex strings.

export const TIER_HEX = {
  amateur:      '#4ADE80',
  professional: '#60A5FA',
  expert:       '#A78BFA',
};

// RGB triplets for the giq-pulse animation. EpisodeMap sets the
// --giq-tier-rgb CSS variable from this map at runtime.
export const TIER_RGB = {
  amateur:      '74, 222, 128',
  professional: '96, 165, 250',
  expert:       '167, 139, 250',
};

// Human-readable tier labels.
export const TIER_LABELS = {
  amateur:      'Amateur',
  professional: 'Professional',
  expert:       'Expert',
};

// Convenience getter with a safe fallback to professional —
// used when callers don't validate the tier prop upstream.
export function getTierHex(tier) {
  return TIER_HEX[tier] || TIER_HEX.professional;
}

export function getTierRgb(tier) {
  return TIER_RGB[tier] || TIER_RGB.professional;
}

export function getTierLabel(tier) {
  return TIER_LABELS[tier] || TIER_LABELS.professional;
}
