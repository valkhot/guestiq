// src/main.jsx
// GuestIQ — Application Entry Point
// INITIALIZATION ORDER IS MANDATORY — do not reorder the init() calls

import * as Sentry from '@sentry/react';
import { validateConfig } from './config/configValidator';
import posthog from 'posthog-js';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

// Step 1: Sentry FIRST
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV ?? 'development',
  release: `guestiq@${import.meta.env.VITE_APP_VERSION ?? '1.0.0'}`,
  tracesSampleRate: 1.0,
  sendDefaultPii: false,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllInputs: true,
      blockAllMedia: false,
    }),
  ],
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Step 2: Config validator
validateConfig();

// Step 3: PostHog
posthog.init(import.meta.env.VITE_POSTHOG_KEY ?? '', {
  api_host: 'https://app.posthog.com',
  autocapture: false,
  capture_pageview: false,
  ip: false,
  persistence: 'memory',
  person_profiles: 'never',
  session_recording: { maskAllInputs: true },
  loaded: (ph) => {
    if (!import.meta.env.VITE_POSTHOG_KEY) {
      ph.opt_out_capturing();
    }
  },
});

// Step 4: React
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
        <pre
          style={{
            marginTop: '2rem',
            fontSize: '0.75rem',
            color: '#EF4444',
            maxWidth: '600px',
            overflow: 'auto',
          }}
        >
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
