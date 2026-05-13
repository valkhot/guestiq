// src/constants/episodeColors.js
// GuestIQ — Episode Accent Colour Map
// Source: Visual Design System v1.0 § 6.1 — LOCKED values
//
// Used by:
//   - CuriosityHookScreen.jsx (Commit 3 — top accent bar + heading colour)
//   - Badge color prop when episode-specific (per § 7.3)
//
// Each episode has a distinct accent colour separate from the session tier
// colour. Tier colour expresses depth (amateur/professional/expert).
// Episode accent expresses topic (arrival, room, service, etc).

export const EPISODE_ACCENT_COLORS = {
  1: '#14B8A6', // Teal    — Why Do Guests Actually Come Here?
  2: '#F59E0B', // Amber   — The Room They Are Imagining
  3: '#38BDF8', // Sky     — Finding and Arriving
  4: '#F43F5E', // Rose    — The Human Side
  5: '#8B5CF6', // Violet  — What This Guest Actually Needs
  6: '#EAB308', // Gold    — Value and What They Pay
  7: '#10B981', // Emerald — After the Stay
};

// Convenience getter with a safe fallback. Returns slate-grey if the
// episode number is out of range — never throws, never returns undefined.
export function getEpisodeAccent(episodeNumber) {
  return EPISODE_ACCENT_COLORS[episodeNumber] || '#94A3B8';
}
