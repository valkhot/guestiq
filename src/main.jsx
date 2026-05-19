// src/main.jsx
// GuestIQ — Application Entry Point
//
// Initialization sequence per system_architecture_document_v10.md § 6:
//   1. Sentry.init()           — observability comes first so we can capture
//                                 any subsequent error
//   2. validateConfiguration() — Phase 1b+: catches malformed JSON before
//                                 any respondent-facing code runs
//   3. posthog.init()          — analytics initialization
//   4. createRoot().render()   — React renders the application
//
// S3-11 (this commit) adds step 2. Phase 1a had only steps 1, 3, 4.
//
// If validateConfiguration() throws, the error propagates to the
// ErrorBoundary wrapped around <App />, which renders ConfigErrorScreen
// with the malformed filename and reason. Sentry already captured the
// exception so the dev team is notified.

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import * as Sentry from '@sentry/react';
import posthog from 'posthog-js';

import App from './App';
import './styles/global.css';
import { validateConfiguration } from './config/configValidator';

// 1. Sentry initialization — must be first to capture subsequent errors
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  // PII protection — strip user data from breadcrumbs and events
  beforeSend(event) {
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },
});

// 2. Configuration validation — Phase 1b+. Runs synchronously; throws
// ConfigError if any of the 6 JSON files is malformed. The ErrorBoundary
// catches this and shows the configuration error screen — no respondent
// ever sees the questionnaire in a broken state.
try {
  validateConfiguration();
} catch (err) {
  Sentry.captureException(err);
  throw err; // Re-throw to halt initialization and trigger ErrorBoundary
}

// 3. PostHog analytics initialization (only after config is validated)
posthog.init(import.meta.env.VITE_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_POSTHOG_HOST || 'https://eu.posthog.com',
  ip: false,
  persistence: 'memory',
  autocapture: false,
  mask_all_inputs: true,
});

// 4. React render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
