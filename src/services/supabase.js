// src/services/supabase.js
// GuestIQ — Supabase Service Layer
// THE ONLY FILE that imports from @supabase/supabase-js.
// All Supabase operations in the application go through this file.
// ESLint no-restricted-imports rule enforces this constraint.

import { createClient } from '@supabase/supabase-js';
import * as Sentry from '@sentry/react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

// ── Offline Queue ──────────────────────────────────────────────────────────
// In-memory queue for failed writes. NOT persisted to localStorage.
// Queue is lost if browser is closed while offline — this is acceptable.
const queue = [];
let retryInterval = null;
let offlineStartTime = null;
let onDowntimeCallback = null;

export function setDowntimeCallback(fn) {
  onDowntimeCallback = fn;
}

function startQueue(onOfflineActivated) {
  if (retryInterval) return;
  offlineStartTime = Date.now();
  if (onOfflineActivated) onOfflineActivated();

  retryInterval = setInterval(async () => {
    if (queue.length === 0) {
      clearRetryInterval();
      return;
    }
    const reachable = await checkConnectivity();
    if (!reachable) {
      // After 60 seconds: trigger downtime screen
      if (Date.now() - offlineStartTime > 60_000 && onDowntimeCallback) {
        onDowntimeCallback();
      }
      return;
    }
    // Connectivity restored — flush queue
    await flushQueue();
  }, 30_000);
}

function clearRetryInterval() {
  if (retryInterval) {
    clearInterval(retryInterval);
    retryInterval = null;
    offlineStartTime = null;
  }
}

async function checkConnectivity() {
  try {
    const { error } = await supabase.from('sessions').select('session_id').limit(1);
    return !error;
  } catch {
    return false;
  }
}

async function flushQueue() {
  const pending = [...queue];
  queue.length = 0;
  for (const item of pending) {
    try {
      await item.fn(...item.args);
    } catch (err) {
      Sentry.captureException(err, { extra: { type: 'QUEUE_FLUSH_ERROR', fn: item.name } });
    }
  }
  clearRetryInterval();
}

function enqueue(name, fn, args, onOfflineActivated) {
  queue.push({ name, fn, args });
  startQueue(onOfflineActivated);
}

// ── Standard error handler ─────────────────────────────────────────────────
function handleError(err, context) {
  const isRLS =
    err?.code === '42501' ||
    err?.status === 403 ||
    err?.message?.includes('row-level security');

  Sentry.captureException(err, {
    extra: { ...context, type: isRLS ? 'RLS_REJECTION' : 'SUPABASE_WRITE' },
  });

  return { success: false, error: isRLS ? 'RLS_REJECTION' : 'NETWORK_ERROR', isRLS };
}

// ── Service Functions ──────────────────────────────────────────────────────

/**
 * Create a new session record.
 * Called immediately after respondent clicks 'Start as [Tier]'.
 */
export async function createSession(sessionData, { onOffline } = {}) {
  try {
    const { data, error } = await supabase.from('sessions').insert(sessionData).select().single();
    if (error) {
      const result = handleError(error, { function: 'createSession', session_id: sessionData.session_id });
      if (!result.isRLS) {
        enqueue('createSession', createSession, [sessionData], onOffline);
        return { success: false, queued: true };
      }
      return result;
    }
    return { success: true, data };
  } catch (err) {
    handleError(err, { function: 'createSession', session_id: sessionData.session_id });
    enqueue('createSession', createSession, [sessionData], onOffline);
    return { success: false, queued: true };
  }
}

/**
 * Update fields on an existing session.
 * Called at: Q0 (tense_frame), Q1 (intent_category), tier upgrade (tier),
 * completion (is_complete + completed_at).
 */
export async function updateSession(sessionId, updates, { onOffline } = {}) {
  try {
    const { error } = await supabase.from('sessions').update(updates).eq('session_id', sessionId);
    if (error) {
      const result = handleError(error, { function: 'updateSession', session_id: sessionId });
      if (!result.isRLS) {
        enqueue('updateSession', updateSession, [sessionId, updates], onOffline);
        return { success: false, queued: true };
      }
      return result;
    }
    return { success: true };
  } catch (err) {
    handleError(err, { function: 'updateSession', session_id: sessionId });
    enqueue('updateSession', updateSession, [sessionId, updates], onOffline);
    return { success: false, queued: true };
  }
}

/**
 * Insert a response record for a single/multi-select answer.
 * Highest-frequency write — called on every option selection.
 */
export async function insertResponse(responseData, { onOffline } = {}) {
  try {
    const { error } = await supabase.from('responses').insert(responseData);
    if (error) {
      const result = handleError(error, { function: 'insertResponse', session_id: responseData.session_id });
      if (!result.isRLS) {
        enqueue('insertResponse', insertResponse, [responseData], onOffline);
        return { success: false, queued: true };
      }
      return result;
    }
    return { success: true };
  } catch (err) {
    handleError(err, { function: 'insertResponse', session_id: responseData.session_id });
    enqueue('insertResponse', insertResponse, [responseData], onOffline);
    return { success: false, queued: true };
  }
}

/**
 * Insert a scale response (1–5 integer) for scale_5 type questions.
 * Writes to scale_responses table — NOT the responses table.
 */
export async function insertScaleResponse(scaleData, { onOffline } = {}) {
  try {
    const { error } = await supabase.from('scale_responses').insert(scaleData);
    if (error) {
      const result = handleError(error, { function: 'insertScaleResponse', session_id: scaleData.session_id });
      if (!result.isRLS) {
        enqueue('insertScaleResponse', insertScaleResponse, [scaleData], onOffline);
        return { success: false, queued: true };
      }
      return result;
    }
    return { success: true };
  } catch (err) {
    handleError(err, { function: 'insertScaleResponse', session_id: scaleData.session_id });
    enqueue('insertScaleResponse', insertScaleResponse, [scaleData], onOffline);
    return { success: false, queued: true };
  }
}

/**
 * Insert a none-flag record when the none-option is selected.
 * Called IN ADDITION TO insertResponse — both fire for none selections.
 */
export async function insertNoneFlag(flagData, { onOffline } = {}) {
  try {
    const { error } = await supabase.from('none_flags').insert(flagData);
    if (error) {
      const result = handleError(error, { function: 'insertNoneFlag', session_id: flagData.session_id });
      if (!result.isRLS) {
        enqueue('insertNoneFlag', insertNoneFlag, [flagData], onOffline);
        return { success: false, queued: true };
      }
      return result;
    }
    return { success: true };
  } catch (err) {
    handleError(err, { function: 'insertNoneFlag', session_id: flagData.session_id });
    enqueue('insertNoneFlag', insertNoneFlag, [flagData], onOffline);
    return { success: false, queued: true };
  }
}

/**
 * Read all data for the management dashboard.
 * Uses the aggregate SELECT policy from Migration 5.
 * Read operation — not queued on failure.
 */
export async function getDashboardData(propertyId) {
  try {
    const [sessionsRes, responsesRes, scaleRes, noneRes] = await Promise.all([
      supabase.from('sessions').select('*').eq('property_id', propertyId),
      supabase.from('responses').select('*').eq('property_id', propertyId),
      supabase.from('scale_responses').select('*').eq('property_id', propertyId),
      supabase.from('none_flags').select('*').eq('property_id', propertyId),
    ]);

    if (sessionsRes.error || responsesRes.error || scaleRes.error || noneRes.error) {
      const err = sessionsRes.error || responsesRes.error || scaleRes.error || noneRes.error;
      Sentry.captureException(err, { extra: { type: 'DASHBOARD_READ', property_id: propertyId } });
      return { success: false };
    }

    return {
      success: true,
      data: {
        sessions: sessionsRes.data ?? [],
        responses: responsesRes.data ?? [],
        scaleResponses: scaleRes.data ?? [],
        noneFlags: noneRes.data ?? [],
      },
    };
  } catch (err) {
    Sentry.captureException(err, { extra: { type: 'DASHBOARD_READ', property_id: propertyId } });
    return { success: false };
  }
}

/**
 * Look up an incomplete session by token (for disambiguation screen).
 * Called on app initialization before any screen renders.
 */
export async function getIncompleteSession(token) {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('session_id', token)
      .eq('is_complete', false)
      .maybeSingle();

    if (error) {
      Sentry.captureException(error, {
        extra: { type: 'SESSION_LOOKUP', token_truncated: token?.slice(0, 8) },
      });
      return { success: false };
    }
    return { success: true, session: data };
  } catch (err) {
    Sentry.captureException(err, {
      extra: { type: 'SESSION_LOOKUP', token_truncated: token?.slice(0, 8) },
    });
    return { success: false };
  }
}

/**
 * Update enrichment fields after session completion (optional).
 * Session is already complete before this is called.
 */
export async function updateEnrichment(sessionId, enrichmentData, { onOffline } = {}) {
  try {
    const { error } = await supabase
      .from('sessions')
      .update(enrichmentData)
      .eq('session_id', sessionId);

    if (error) {
      const result = handleError(error, { function: 'updateEnrichment', session_id: sessionId });
      if (!result.isRLS) {
        enqueue('updateEnrichment', updateEnrichment, [sessionId, enrichmentData], onOffline);
        return { success: false, queued: true };
      }
      return result;
    }
    return { success: true };
  } catch (err) {
    handleError(err, { function: 'updateEnrichment', session_id: sessionId });
    enqueue('updateEnrichment', updateEnrichment, [sessionId, enrichmentData], onOffline);
    return { success: false, queued: true };
  }
}
