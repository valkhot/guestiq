// src/hooks/useSession.js
// GuestIQ — Session State Management Hook
// Manages: session_id generation, localStorage token, tier, tense_frame,
// intent_category, is_complete. All Supabase writes go through supabase.js service.

import { useState, useCallback } from 'react';

import { createSession, updateSession } from '../services/supabase';
import { trackTierSelected } from '../services/analytics';

const TOKEN_KEY = 'guestiq_session_token';

// Generate session ID — application controls this, never Supabase
function generateSessionId() {
  return crypto.randomUUID();
}

export function useSession(propertyId) {
  const [sessionId, setSessionId] = useState(null);
  const [tier, setTier] = useState(null);
  const [tenseFrame, setTenseFrame] = useState(null);
  const [intentCategory, setIntentCategory] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Called when respondent clicks a tier CTA button
  // Creates session in Supabase and writes token to localStorage
  const startSession = useCallback(
    async (selectedTier) => {
      setIsCreating(true);
      const id = generateSessionId();

      const sessionData = {
        session_id: id,
        property_id: propertyId,
        tier: selectedTier,
        tense_frame: null, // set after Q0
        intent_category: null, // set after Q1
        is_complete: false,
      };

      // Write to Supabase
      const result = await createSession(sessionData);

      // Write token to localStorage regardless of Supabase result
      // (offline queue handles the case where Supabase write was queued)
      localStorage.setItem(TOKEN_KEY, id);

      setSessionId(id);
      setTier(selectedTier);
      setIsCreating(false);

      trackTierSelected({ tier: selectedTier, property_id: propertyId });

      return { sessionId: id, success: result.success };
    },
    [propertyId]
  );

  // Called after Q0 answered — sets tense_frame for entire session
  const setTenseFrameAndPersist = useCallback(
    async (frame) => {
      setTenseFrame(frame);
      if (sessionId) {
        await updateSession(sessionId, { tense_frame: frame });
      }
    },
    [sessionId]
  );

  // Called after Q1 answered — sets intent_category for Module 5 routing
  const setIntentCategoryAndPersist = useCallback(
    async (category) => {
      setIntentCategory(category);
      if (sessionId) {
        await updateSession(sessionId, { intent_category: category });
      }
    },
    [sessionId]
  );

  // Called when session is complete
  const completeSession = useCallback(async () => {
    setIsComplete(true);
    localStorage.removeItem(TOKEN_KEY);
    if (sessionId) {
      await updateSession(sessionId, {
        is_complete: true,
        completed_at: new Date().toISOString(),
      });
    }
  }, [sessionId]);

  // Restore session state from a resumed incomplete session
  const restoreSession = useCallback((session) => {
    setSessionId(session.session_id);
    setTier(session.tier);
    setTenseFrame(session.tense_frame);
    setIntentCategory(session.intent_category);
    setIsComplete(session.is_complete);
  }, []);

  return {
    // State
    sessionId,
    tier,
    tenseFrame,
    intentCategory,
    isComplete,
    isCreating,
    // Actions
    startSession,
    setTenseFrameAndPersist,
    setIntentCategoryAndPersist,
    completeSession,
    restoreSession,
  };
}
