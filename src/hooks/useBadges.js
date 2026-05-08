// src/hooks/useBadges.js
// GuestIQ — Badge State Management Hook
// Tracks earned badges for the current session.
// AC5: each badge earned only once per session.

import { useState, useCallback } from 'react';
import {
  BADGE_DEFINITIONS,
  BADGE_IDS,
  EPISODE_BADGE_MAP,
} from '../components/badges/BadgeDefinitions';

export function useBadges() {
  // Set of earned badge IDs
  const [earnedBadgeIds, setEarnedBadgeIds] = useState(new Set());
  // Queue of badges to show as toasts (shown one at a time)
  const [toastQueue, setToastQueue] = useState([]);

  // Award a badge — idempotent (safe to call multiple times)
  const awardBadge = useCallback((badgeId) => {
    setEarnedBadgeIds((prev) => {
      if (prev.has(badgeId)) return prev; // already earned — AC5
      const next = new Set(prev);
      next.add(badgeId);
      return next;
    });
    // Add to toast queue if not already earned
    setToastQueue((prev) => {
      const alreadyQueued = prev.some((b) => b.id === badgeId);
      if (alreadyQueued) return prev;
      const definition = BADGE_DEFINITIONS.find((b) => b.id === badgeId);
      if (!definition) return prev;
      return [...prev, definition];
    });
  }, []);

  // Dismiss the front toast
  const dismissToast = useCallback(() => {
    setToastQueue((prev) => prev.slice(1));
  }, []);

  // Award badge for episode completion
  const awardEpisodeBadge = useCallback((episodeNumber) => {
    const badgeId = EPISODE_BADGE_MAP[episodeNumber];
    if (badgeId) awardBadge(badgeId);
  }, [awardBadge]);

  // Award Expert Complete when Expert tier finishes all episodes
  const awardExpertComplete = useCallback((tier) => {
    if (tier === 'expert') {
      awardBadge(BADGE_IDS.EXPERT_COMPLETE);
    }
  }, [awardBadge]);

  // Current toast to display (first in queue)
  const currentToast = toastQueue[0] || null;

  // All badge definitions with earned status — for results/completion screen
  const allBadges = BADGE_DEFINITIONS.map((def) => ({
    ...def,
    earned: earnedBadgeIds.has(def.id),
  }));

  return {
    earnedBadgeIds,
    awardBadge,
    awardEpisodeBadge,
    awardExpertComplete,
    dismissToast,
    currentToast,
    allBadges,
    BADGE_IDS,
  };
}
