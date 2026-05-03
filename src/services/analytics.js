// src/services/analytics.js
// GuestIQ — PostHog Analytics Service Layer
// THE ONLY FILE that calls posthog.capture().
// All 27 canonical events are exported as named functions.
// Naming convention: event 'app_loaded' → export function trackAppLoaded
// ESLint no-restricted-imports rule enforces this constraint.

import posthog from 'posthog-js';

// ── 5.1 Application Initialization and Entry ──────────────────────────────

/** Event 1 — fires when application renders for the first time */
export const trackAppLoaded = (props) =>
  posthog.capture('app_loaded', props);

/** Event 2 — fires when welcome + tier selection screen renders */
export const trackWelcomeHookViewed = (props) =>
  posthog.capture('welcome_hook_viewed', props);

/** Event 3 — fires when respondent clicks a tier CTA button */
export const trackTierSelected = (props) =>
  posthog.capture('tier_selected', props);

/** Event 4 — fires when enrichment screen is dismissed (answered or skipped) */
export const trackCredentialsEnrichmentCompleted = (props) =>
  posthog.capture('credentials_enrichment_completed', props);

/** Event 5 — fires when Q0 (tense routing gate) is answered */
export const trackRoutingGateAnswered = (props) =>
  posthog.capture('routing_gate_answered', props);

// ── 5.2 Questionnaire Flow ────────────────────────────────────────────────

/** Event 6 — fires when the first question of an episode renders */
export const trackEpisodeStarted = (props) =>
  posthog.capture('episode_started', props);

/** Event 7 — fires on every answered question (any option, including none) */
export const trackQuestionAnswered = (props) =>
  posthog.capture('question_answered', props);

/** Event 8 — fires IN ADDITION to question_answered when none option selected */
export const trackNoneFlagSelected = (props) =>
  posthog.capture('none_flag_selected', props);

/** Event 9 — fires when the last question of an episode is answered */
export const trackEpisodeCompleted = (props) =>
  posthog.capture('episode_completed', props);

/** Event 10 — fires when curiosity hook screen renders */
export const trackCuriosityHookViewed = (props) =>
  posthog.capture('curiosity_hook_viewed', props);

/** Event 11 — fires when tier upgrade prompt is shown */
export const trackTierUpgradePrompted = (props) =>
  posthog.capture('tier_upgrade_prompted', props);

/** Event 12 — fires when respondent accepts a tier upgrade */
export const trackTierUpgradeAccepted = (props) =>
  posthog.capture('tier_upgrade_accepted', props);

/** Event 13 — fires when respondent declines a tier upgrade */
export const trackTierUpgradeDeclined = (props) =>
  posthog.capture('tier_upgrade_declined', props);

/** Event 14 — fires when Q2 secondary purpose triggers a second Module 5 sub-section */
export const trackPurposeExpert = (props) =>
  posthog.capture('purpose_expert', props);

// ── 5.3 Session Management and Connectivity ───────────────────────────────

/** Event 15 — fires on window.beforeunload when session is incomplete */
export const trackSessionPaused = (props) =>
  posthog.capture('session_paused', props);

/** Event 16 — fires when disambiguation screen renders */
export const trackDisambiguationShown = (props) =>
  posthog.capture('disambiguation_shown', props);

/** Event 17 — fires when respondent selects Resume on disambiguation screen */
export const trackDisambiguationResumed = (props) =>
  posthog.capture('disambiguation_resumed', props);

/** Event 18 — fires when respondent selects Start Fresh on disambiguation screen */
export const trackDisambiguationNewSession = (props) =>
  posthog.capture('disambiguation_new_session', props);

/** Event 19 — fires when first Supabase write fails and offline queue starts */
export const trackOfflineQueueActivated = (props) =>
  posthog.capture('offline_queue_activated', props);

/** Event 20 — fires when all queued writes are successfully sent */
export const trackOfflineQueueFlushed = (props) =>
  posthog.capture('offline_queue_flushed', props);

// ── 5.4 Completion and Results ────────────────────────────────────────────

/** Event 21 — fires when all questions for the respondent's tier are answered */
export const trackSessionCompleted = (props) =>
  posthog.capture('session_completed', props);

/** Event 22 — fires when completion results screen renders */
export const trackResultsViewed = (props) =>
  posthog.capture('results_viewed', props);

/** Event 23 — fires when aggregate comparison chart renders (3+ sessions exist) */
export const trackAggregateComparisonViewed = (props) =>
  posthog.capture('aggregate_comparison_viewed', props);

// ── 5.5 Management Dashboard ──────────────────────────────────────────────

/** Event 24 — fires when SHIFT+CTRL+A opens the dashboard overlay */
export const trackDashboardOpened = (props) =>
  posthog.capture('dashboard_opened', props);

/** Event 25 — fires when a dashboard panel tab is clicked */
export const trackDashboardPanelViewed = (props) =>
  posthog.capture('dashboard_panel_viewed', props);

/** Event 26 — fires when CSV export is triggered */
export const trackDashboardExportedCsv = (props) =>
  posthog.capture('dashboard_exported_csv', props);

/** Event 27 — fires when PDF export is triggered */
export const trackDashboardExportedPdf = (props) =>
  posthog.capture('dashboard_exported_pdf', props);
