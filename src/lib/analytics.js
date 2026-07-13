import posthog from 'posthog-js'
import * as Sentry from '@sentry/react'
import { supabase } from './supabase.js'

// ── Your PostHog project key ─────────────────────────────────────────
// From PostHog → Settings → Project API Key. Safe to be public (client key).
// Use the EU host if your PostHog project is in the EU.
const POSTHOG_KEY  = 'PASTE_YOUR_POSTHOG_PROJECT_KEY_HERE'
const POSTHOG_HOST = 'https://us.i.posthog.com'
// From Sentry → Project Settings → Client Keys (DSN). Safe to be public.
const SENTRY_DSN  = 'PASTE_YOUR_SENTRY_DSN_HERE'
// ─────────────────────────────────────────────────────────────────────

const isSet = v => v && !String(v).startsWith('PASTE_')
let ready = false

export function initAnalytics() {
  try {
    if (isSet(POSTHOG_KEY)) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: false,                 // never auto-capture clicks/inputs
        capture_pageview: false,            // we send events explicitly
        disable_session_recording: true,    // no screen recording — privacy
        mask_all_text: true,
        mask_all_element_attributes: true,
        persistence: 'localStorage',
      })
      ready = true
    }
  } catch (e) { /* analytics must never break the app */ }

  try {
    if (isSet(SENTRY_DSN)) {
      Sentry.init({
        dsn: SENTRY_DSN,
        sendDefaultPii: false,       // never attach PII
        tracesSampleRate: 0,         // no perf tracing for the pilot
        replaysSessionSampleRate: 0, // no session replay (privacy)
        replaysOnErrorSampleRate: 0,
        environment: 'pilot',
      })
    }
  } catch (e) { /* error tracking must never break the app */ }

  try {
    if (!window.__guestiq_error_hooked) {
      window.__guestiq_error_hooked = true
      window.addEventListener('error', ev => captureError(ev.error || ev.message, 'window.onerror'))
      window.addEventListener('unhandledrejection', ev => captureError(ev.reason || 'unhandledrejection', 'promise'))
    }
  } catch (e) { /* ignore */ }
}

// Report a handled error to Sentry (and console). Never throws.
export function captureError(err, context) {
  const message = (err && err.message) ? err.message : String(err)
  try {
    console.error('[GuestIQ]', err)
    Sentry.captureException(err instanceof Error ? err : new Error(message),
      context ? { extra: context } : undefined)
  } catch (e) { /* ignore */ }
  // Self-contained log for Console Lens 04 (App health). Message only, no PII.
  try {
    supabase.rpc('guestiq_log_error', { msg: message, ctx: context ? String(context).slice(0, 200) : null })
  } catch (e) { /* ignore */ }
}

// Anonymous agent identity = the badge token (never a name / PII).
export function identify(badgeId) {
  try { if (ready && badgeId) posthog.identify(badgeId) } catch (e) { /* ignore */ }
}

// Named events only. Callers must pass NO answer content / free-text.
export function track(event, props = {}) {
  try { if (ready) posthog.capture(event, props) } catch (e) { /* ignore */ }
}
