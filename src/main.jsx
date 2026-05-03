// src/main.jsx
// GuestIQ — Application Entry Point
// INITIALIZATION ORDER IS MANDATORY — do not reorder imports
// 1. Sentry (error capture active before anything else)
// 2. Config validator (catches JSON errors before any render)
// 3. PostHog (analytics active)
// 4. React (renders only after all above are ready)

// ── Step 1: Sentry — FIRST ────────────────────────────────────────────────
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV ?? 'development',
  release: `guestiq@${import.meta.env.VITE_APP_VERSION ?? '1.0.0'}`,

  // Capture 100% of transactions in prototype — reduce in Phase 2
  tracesSampleRate: 1.0,

  // Privacy: no IP addresses, no PII
  sendDefaultPii: false,

  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllInputs: true,   // No response text captured in replays
      blockAllMedia: false,
    }),
  ],

  // Session replay: 10% of sessions, 100% on error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// ── Step 2: Config validator — BEFORE React ───────────────────────────────
// Phase 1a: no-op (questionnaire.js is always valid JavaScript)
// Phase 1b: validates all 6 JSON config files — throws on malformed files
import { validateConfig } from './config/configValidator';
validateConfig();

// ── Step 3: PostHog ───────────────────────────────────────────────────────
import posthog from 'posthog-js';

posthog.init(import.meta.env.VITE_POSTHOG_KEY ?? '', {
  api_host: 'https://app.posthog.com',
  autocapture: false,        // Only 27 canonical events — no auto-capture
  capture_pageview: false,   // Managed manually via trackAppLoaded
  ip: false,                 // IP anonymization enabled
  persistence: 'memory',     // No localStorage for analytics data
  person_profiles: 'never',  // No person profiles in Phase 1
  session_recording: {
    maskAllInputs: true,
  },
  // Disable in development if no key provided
  loaded: (ph) => {
    if (!import.meta.env.VITE_POSTHOG_KEY) {
      ph.opt_out_capturing();
    }
  },
});

// ── Step 4: React ─────────────────────────────────────────────────────────
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Error fallback for Sentry ErrorBoundary
function ErrorFallback({ error }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0D12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#F8FAFC',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <p style={{ fontSize: '1.25rem', fontWeight: 500, marginBottom: '0.5rem' }}>
        Something went wrong.
      </p>
      <p style={{ fontSize: '0.9375rem', color: '#94A3B8', marginBottom: '2rem' }}>
        Please refresh the page to continue.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: '0.75rem 2rem',
          background: 'transparent',
          border: '1px solid #4A6FA5',
          borderRadius: '8px',
          color: '#60A5FA',
          fontSize: '0.9375rem',
          cursor: 'pointer',
        }}
      >
        Refresh
      </button>
      {import.meta.env.DEV && error && (
        <pre style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#EF4444', maxWidth: '600px', overflow: 'auto' }}>
          {error.message}
        </pre>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Sentry.ErrorBoundary fallback={ErrorFallback} showDialog={false}>
    <App />
  </Sentry.ErrorBoundary>
);
