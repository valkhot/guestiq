// src/config/configValidator.js
// GuestIQ — Configuration Validator
// Phase 1a: no-op — questionnaire.js is always valid JavaScript
// Phase 1b: validates all 6 JSON config files on application boot
// Runs BEFORE React renders, AFTER Sentry.init() — errors are always captured

export function validateConfig() {
  // Phase 1a — questionnaire.js is imported as a JS module.
  // JavaScript syntax errors throw at import time and are caught by Sentry
  // before this function is even called. No validation needed here.

  // Phase 1b — when JSON files are in use, this function will:
  // 1. Import all 6 JSON files
  // 2. Validate required fields are present
  // 3. Throw a descriptive error if any file is malformed
  // The throw will be caught by the Sentry ErrorBoundary in main.jsx

  // For now: silently pass
  return true;
}
