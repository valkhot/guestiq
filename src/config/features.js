// src/config/features.js
// GuestIQ — Feature Flags
// THE ONLY FILE that reads import.meta.env.VITE_FEATURE_* variables.
// Components import from here — never read import.meta.env directly.
// All flags are false in Phase 1 prototype.

export const features = {
  // Authentication bypass mode — always false in Phase 1
  // Phase 2: set VITE_FEATURE_AUTH_ENABLED=true to activate Supabase Auth
  AUTH_ENABLED: import.meta.env.VITE_FEATURE_AUTH_ENABLED === 'true',

  // Multi-property mode — always false in Phase 1
  // Phase 2: set true to enable cross-property comparison and property selector
  MULTI_PROPERTY: import.meta.env.VITE_FEATURE_MULTI_PROPERTY === 'true',

  // Admin CMS route — always false in Phase 1
  // Phase 2: set true to activate /admin route with visual question editor
  ADMIN_ENABLED: import.meta.env.VITE_FEATURE_ADMIN_ENABLED === 'true',
};
