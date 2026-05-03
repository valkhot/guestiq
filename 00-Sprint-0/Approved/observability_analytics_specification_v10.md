**OBSERVABILITY AND ANALYTICS SPECIFICATION**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-3.3 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Platforms Covered** | Sentry (error tracking + performance) · PostHog (product analytics + session replay) |
| **Events Defined** | 27 canonical PostHog events + 1 supplementary event |
| **Related Documents** | SRS-F v2.0 Section 11 (S0-2.1) · Project Charter v2.1 (S0-1.1) · Backlog v3.1 S2-02, S2-03, S4-07 |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Observability-Analytics-Specification-v1.0.docx |
| **Downstream Use** | This document is the authoritative source for: S2-2.1a (Sentry init) · S2-2.1b (PostHog init) · S4-07 (27-event verification) · S6-3.6 (analytics summary for research record) |

**WARN: Observability is a production-grade requirement, not an optional enhancement. Sentry and PostHog must be initialized before any other application code executes. The order is mandatory: Sentry first, PostHog second, React application third. A pilot that runs without observability produces data that cannot be diagnosed if anomalies are found.**

INFO: This document covers Sprint 0 observability decisions and configuration requirements. The Analytics Service implementation (src/services/analytics.js) is a Sprint 2 deliverable. The 27-event completeness verification is a Sprint 4 deliverable (S4-07). The research analytics summary is a Sprint 6 deliverable (S6-3.6).

# 1. Observability Architecture Overview

GuestIQ uses two dedicated observability platforms that serve distinct and complementary purposes. They are not alternatives — both are required, both are configured from the first line of code, and both run in production from Sprint 2 day one.

| **Platform** | **Purpose and Role** |
| --- | --- |
| **Sentry** | Error tracking and performance monitoring. Captures: unhandled JavaScript errors (with full stack trace, browser context, and session state), React rendering errors (via ErrorBoundary), Supabase service layer failures (including RLS rejections), and Core Web Vitals from real user devices. Sentry tells you when something breaks and exactly what broke. |
| **PostHog** | Product analytics and session replay. Captures: 27 named behavioral events across the complete respondent journey, session replay recordings (inputs masked), and funnel analysis. PostHog tells you how respondents behave and where they disengage. This is the primary research instrument for optimising the questionnaire experience. |
| **Why both** | Sentry and PostHog capture different data classes. A respondent who encounters a JavaScript error will appear in Sentry but their session may still appear complete in PostHog (if the error was non-blocking). A respondent who abandons at Episode 3 produces a PostHog drop-off signal but no Sentry error. Neither platform alone provides the full picture. |
| **Cost** | Both platforms are free-tier for the Phase 1 pilot. PostHog: 1 million events per month — prototype generates approximately 5,000 total. Sentry: 5,000 errors per month — prototype unlikely to generate more than 100. No cost is incurred within these limits. |

## 1.1 Initialization Order — Mandatory

The initialization order is not a preference. It is a requirement derived from the principle that error capture must begin before any code that could fail.

| **Order** | **Action** |
| --- | --- |
| **Step 1 — Sentry** | First import in src/main.jsx. Sentry.init() executes before React.createRoot(). ErrorBoundary wraps the entire application. From this moment, any error is captured. |
| **Step 2 — PostHog** | Second import in src/main.jsx, immediately after Sentry. posthog.init() executes. PostHog provider wraps the application. From this moment, the app\_loaded event can fire. |
| **Step 3 — React application** | React.createRoot() and root.render() execute. The application begins rendering. Both observability platforms are already active. |
| **Step 4 — app\_loaded event** | The first PostHog event fires once the welcome screen renders. This confirms end-to-end observability is working. |

DEV: DEV: The initialization sequence in src/main.jsx must be: (1) import Sentry and call Sentry.init(), (2) import PostHog and call posthog.init(), (3) import App and call root.render(). Do not reorder. Do not lazy-load either platform.

# 2. Sentry Configuration

## 2.1 SDK Setup

| **Parameter** | **Specification** |
| --- | --- |
| **Package** | @sentry/react — version pinned in package.json. Use the latest stable version at Sprint 2 start. |
| **DSN** | Read from environment variable VITE\_SENTRY\_DSN. Value from sentry-credentials.txt (Pre-Sprint setup). Never hardcode. Never commit .env to Git. |
| **Environment** | Read from VITE\_APP\_ENV. Value: 'prototype' in .env.local for development, 'pilot' in .env.production for deployed app. This separates developer errors from real pilot errors in the Sentry dashboard. |
| **IP anonymization** | sendDefaultPii: false. This is mandatory — no IP addresses, no user agent strings that could identify respondents. Confirmed in Backlog AC-102. |
| **Performance sampling** | tracesSampleRate: 1.0 for the prototype. This captures 100% of performance transactions — appropriate for a 10-person pilot. Phase 2 with higher volume may reduce this. |
| **Release tracking** | release: 'guestiq@' + package.json version. This ties Sentry errors to specific deployments. When a bug is fixed and redeployed, new errors are attributed to the new release. |

**SENTRY: Exact Sentry.init() configuration: { dsn: import.meta.env.VITE\_SENTRY\_DSN, environment: import.meta.env.VITE\_APP\_ENV, sendDefaultPii: false, tracesSampleRate: 1.0, release: 'guestiq@' + import.meta.env.VITE\_APP\_VERSION, integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration({ maskAllText: true, blockAllMedia: false })] }**

## 2.2 ErrorBoundary

A Sentry ErrorBoundary component wraps the entire React application in src/main.jsx. This catches any unhandled React rendering error — including errors in child components that would otherwise produce a blank white screen with no diagnostic information.

| **Element** | **Specification** |
| --- | --- |
| **Fallback UI** | When the ErrorBoundary catches an error, it renders a user-facing message: 'Something went wrong. Please refresh the page or try again later.' This message is in plain English, non-technical, and does not expose error details to the respondent. |
| **Error reporting** | The ErrorBoundary automatically calls Sentry.captureException() with the full error and component stack. The Lead Researcher receives an email alert within 60 seconds. |
| **Recovery** | A 'Refresh' button on the fallback UI allows the respondent to reload the application. Their session token in localStorage is preserved — the disambiguation screen will appear on reload. |

## 2.3 Service Layer Error Capture

Every Supabase service function in src/services/supabase.js wraps its calls in a try-catch block. Caught errors are not silently swallowed — they are captured with context and categorised.

| **Capture Point** | **Function / Location** | **Context Tags** | **Severity** |
| --- | --- | --- | --- |
| **Supabase write failure (network)** | supabase.js — insertResponse(), insertSession(), etc. | { type: 'SUPABASE\_WRITE', function\_name, session\_id, question\_id } | Warning — queued for retry |
| **Supabase RLS rejection (403/400)** | supabase.js — all write functions | { type: 'RLS\_REJECTION', function\_name, session\_id, error\_code } | Critical — alert Lead Researcher immediately. NOT queued. |
| **Supabase read failure (dashboard)** | supabase.js — getDashboardData(), etc. | { type: 'SUPABASE\_READ', panel\_name, property\_id } | Error — dashboard shows retry option |
| **Export failure (CSV/PDF)** | dashboard components | { type: 'EXPORT\_FAILURE', export\_type, response\_count, browser } | Error — export button shows retry state |
| **Configuration validator failure** | configValidator.js — on app load | { type: 'CONFIG\_INVALID', filename, error\_detail } | Critical — application cannot render. Fallback screen shown. |
| **Unhandled React error** | ErrorBoundary — automatic | Full component stack trace | Critical — fallback UI shown. Alert sent. |

## 2.4 Performance Monitoring — Core Web Vitals Targets

Sentry captures Core Web Vitals from real user devices during the pilot. These are not development benchmarks — they are measured on actual hotel front desk PCs on hotel broadband. The targets below are from SRS-NFR and Backlog S4-09.

| **Metric** | **Target and Measurement** |
| --- | --- |
| **LCP — Largest Contentful Paint** | Target: under 2.0 seconds at p50 (median session). Measured: Sentry Performance dashboard. This is the time from URL load to the welcome screen content being visible. The primary user-facing load time. |
| **TTI — Time to Interactive** | Target: under 3.0 seconds at p50. Measured: Sentry Performance. Time until the respondent can interact with tier cards. |
| **Question-to-question transition** | Target: under 300ms. Measured: Sentry custom span wrapping the question render cycle. This is the transition between answering one question and the next question rendering — must feel instantaneous. |
| **INP — Interaction to Next Paint** | Target: under 200ms. Measured: Sentry automatically. This is Google's responsiveness metric — time from a click to the next visual update. |
| **CLS — Cumulative Layout Shift** | Target: under 0.1. Measured: Sentry automatically. Layout shifts during question rendering would be disorienting. This must be near-zero. |

INFO: These targets are verified in Sprint 4 step S4-2.4 (performance optimization) and S4-09 (performance verification). The Sprint 5 step S5-06 confirms real-respondent Core Web Vitals appear in Sentry. Sprint 6 step S6-1.3 reviews the full performance picture mid-pilot.

# 3. PostHog Configuration

## 3.1 SDK Setup

| **Parameter** | **Specification** |
| --- | --- |
| **Package** | posthog-js — version pinned in package.json. |
| **API Key** | Read from VITE\_POSTHOG\_KEY. Value from posthog-credentials.txt. Never hardcode. Never commit. |
| **Host** | https://app.posthog.com — US cloud instance. This is the correct host for the free tier. Do not use EU instance. |
| **IP anonymization** | ip: false in every posthog.capture() call via the analytics service. This is the critical privacy control. Confirmed in Backlog AC-106 and AC-163. |
| **Session recording** | Enabled with maskAllText: false — we want to see the questionnaire text, not mask it. mask\_all\_inputs: true — any text input fields (e.g. Q0 Option D free text) are masked and never transmitted to PostHog. Confirmed in Backlog AC-110. |
| **Persistence** | memory — PostHog state is not persisted across browser sessions. Each visit starts fresh in PostHog. The Supabase session token in localStorage handles resumption — PostHog session replay is bounded to a single browser visit. |
| **Autocapture** | Disabled — ip: false, autocapture: false. GuestIQ fires only the 27 canonical events. No automatic DOM event capture, no pageview autocapture. |

**POSTHOG: Exact posthog.init() configuration: posthog.init(import.meta.env.VITE\_POSTHOG\_KEY, { api\_host: 'https://app.posthog.com', ip: false, persistence: 'memory', autocapture: false, capture\_pageview: false, session\_recording: { maskAllText: false, maskAllInputs: true, blockAllMedia: false } })**

## 3.2 Analytics Service Architecture

All PostHog event calls are routed through a single service file: src/services/analytics.js. No component in the application calls posthog.capture() directly. This architecture ensures: (a) event names are defined in one place and cannot drift, (b) required properties are enforced at the function level, (c) IP anonymization (ip: false) is applied universally, and (d) the service can be replaced or extended without touching component code.

DEV: DEV: analytics.js exports one named function per canonical event. Function naming convention: trackEventName() in camelCase matching the event name. Example: event 'episode\_started' => function trackEpisodeStarted(props). Each function: (1) validates required props are present, (2) adds property\_id from app state if not provided, (3) adds ip: false to every call, (4) calls posthog.capture(eventName, { ...props, ip: false }). The analytics service is initialized in src/main.jsx and exported as a module. Components import named functions: import { trackEpisodeStarted } from '../services/analytics'.

## 3.3 property\_id Architecture

Every PostHog event and every Supabase record includes property\_id. In Phase 1 this is always 'PROP001', read from the URL query parameter (?property=PROP001). This field is the foundation of Phase 2 multi-property analytics — the architecture is built now even though only one value is used in the prototype.

| **Aspect** | **Detail** |
| --- | --- |
| **How property\_id is set** | On application load, the URL query parameter ?property= is read and stored in application state. Default: 'PROP001' if no parameter is present. |
| **How property\_id propagates** | The analytics service reads property\_id from application state on every event call. Components never pass property\_id directly — the service handles it. |
| **Why this matters for Phase 2** | In Phase 2, a second hotel will have ?property=PROP002. All their data is automatically segmented. The cross-property comparison dashboard reads this field. No code changes needed in Sprint 2 to enable Phase 2 multi-property. |

# 4. The 27 Canonical PostHog Events

The 27 events below constitute the complete canonical event taxonomy for GuestIQ Phase 1. These names are exact — case-sensitive, underscore-separated, lowercase. A single character error in an event name produces a separate, unnamed event in PostHog that cannot be aggregated with the correct events. Event names are defined as string constants in src/services/analytics.js and imported wherever needed — they are never typed as raw strings in component code.

INFO: Event #4 was renamed from credentials\_completed (v1.0) to credentials\_enrichment\_completed (v2.0) when the expert credentials screen moved from pre-questionnaire gate to optional post-completion enrichment. The v1.0 name must not appear in any Sprint 2+ code. Confirmed in SRS-F v2.0 PostHog event #4 renamed note.

## 4.1 Sprint 2 Events — 16 events (implemented Sprint 2 day one)

| **#** | **Event Name** | **Fired When** | **Sprint** | **Required Properties** | **Optional Properties** | **Verification** |
| --- | --- | --- | --- | --- | --- | --- |
| **1** | **app\_loaded** | Application renders for the first time — welcome screen visible | S2 | property\_id, device\_type ('desktop'|'mobile'), browser\_name | — | Check PostHog Events within 60s of first load |
| **2** | **welcome\_hook\_viewed** | Welcome+tier unified screen renders | S2 | property\_id | — | Fires on every fresh session start |
| **3** | **tier\_selected** | Respondent clicks a tier CTA button | S2 | tier ('amateur'|'professional'|'expert'), property\_id | — | Session creation in Supabase follows this event |
| **5** | **routing\_gate\_answered** | Q0 (QR1) answered — tense frame assigned | S2 | tense\_frame ('retrospective'|'anticipatory'), answer\_option ('A'|'B'|'C'|'D'), property\_id | qr1\_other\_text (if Option D) | Note: event #4 is Sprint 3. Numbering is canonical order, not sprint order. |
| **6** | **episode\_started** | First question of an episode renders | S2 | episode\_number (int 1-7), episode\_name (string), tier, property\_id | — | Fires 7 times per complete Expert session |
| **7** | **question\_answered** | Any question answered — any option selected | S2 | question\_id (string e.g. 'Q1'), answer\_code (string e.g. 'A'), module\_number (int), tier, tense\_frame, property\_id | is\_none\_flag (bool) | Fires for every single answer including Q0 |
| **8** | **none\_flag\_selected** | None option selected on any question | S2 | question\_id, module\_number (int), tier, property\_id | — | Fires in addition to question\_answered, not instead of |
| **9** | **episode\_completed** | Last question of an episode answered | S2 | episode\_number (int), episode\_name, tier, property\_id | episode\_duration\_seconds (int) | Confirmed by question count for that episode and tier |
| **15** | **session\_paused** | Browser closes or navigates away with incomplete session | S2 | question\_number\_at\_pause (int), episode\_number\_at\_pause (int), tier, property\_id | — | Fired on beforeunload event when session is active but incomplete |
| **16** | **disambiguation\_shown** | Incomplete session token found — disambiguation screen shown | S2 | property\_id | — | Only fires when localStorage token matches an incomplete Supabase session |
| **17** | **disambiguation\_resumed** | Respondent selects 'Resume my session' | S2 | question\_number\_resumed\_from (int), tier, property\_id | — | Session continues from last answered question |
| **18** | **disambiguation\_new\_session** | Respondent selects 'Start fresh' | S2 | property\_id | — | Old session remains in Supabase with is\_complete = false |
| **19** | **offline\_queue\_activated** | Supabase unreachable — offline queue begins capturing responses | S2 | question\_number (int), episode\_number (int), property\_id | — | Fires once when queue first activates, not on every retry |
| **20** | **offline\_queue\_flushed** | All queued responses successfully sent after reconnection | S2 | responses\_queued (int), property\_id | queue\_duration\_seconds (int) | Confirms zero data loss after outage |
| **24** | **dashboard\_opened** | SHIFT+CTRL+A overlay opens | S2 | property\_id | — | Note: dashboard events are numbered 24-27 in canonical sequence |
| **25** | **dashboard\_panel\_viewed** | Dashboard panel tab clicked | S2 | panel\_name (string), property\_id | — | Fires on every panel navigation including initial load of Panel 1 |

## 4.2 Sprint 3 Events — 8 events (implemented Sprint 3)

| **#** | **Event Name** | **Fired When** | **Sprint** | **Required Properties** | **Optional Properties** | **Verification** |
| --- | --- | --- | --- | --- | --- | --- |
| **4** | **credentials\_enrichment\_completed** | Post-completion enrichment screen dismissed (answered or skipped) | S3 | fields\_answered (int 0-3), property\_id | years\_experience, interaction\_volume, shift\_pattern (strings — only if answered) | RENAMED from credentials\_completed (v1.0). Do not use old name. |
| **10** | **curiosity\_hook\_viewed** | Curiosity hook screen renders between episodes | S3 | episode\_number (int 1-6), tier, property\_id | — | Episode 7 has no curiosity hook — session goes directly to completion |
| **11** | **tier\_upgrade\_prompted** | Tier upgrade prompt shown mid-session | S3 | current\_tier, target\_tier, property\_id | — | Fires at Episode 1 end (Amateur) and Episode 4 end (Professional) |
| **12** | **tier\_upgrade\_accepted** | Respondent accepts tier upgrade | S3 | from\_tier, to\_tier, question\_number\_at\_upgrade (int), property\_id | — | Session tier updated in Supabase after this event |
| **13** | **tier\_upgrade\_declined** | Respondent declines tier upgrade | S3 | from\_tier, target\_tier, property\_id | — | Session continues at original tier. UC-01 Extension 4 decline path. |
| **14** | **purpose\_expert** | Secondary purpose triggers second Module 5 sub-section | S3 | primary\_intent\_category, secondary\_intent\_category, tier, property\_id | — | Only fires when Q2 answer triggers routing to a second sub-section |
| **21** | **session\_completed** | All questions for selected tier answered | S3 | tier, total\_time\_seconds (int), intent\_category, tense\_frame, property\_id | badges\_earned (int), upgrade\_occurred (bool) | is\_complete = true written to Supabase after this event fires |
| **22** | **results\_viewed** | Completion and results screen renders | S3 | tier, intent\_category, property\_id | — | Personal results summary visible to respondent |
| **23** | **aggregate\_comparison\_viewed** | Aggregate comparison chart renders | S3 | responses\_in\_aggregate (int), property\_id | — | Only fires when 3+ complete sessions exist for same property\_id |

## 4.3 Sprint 4 Events — 3 events (implemented Sprint 4)

| **#** | **Event Name** | **Fired When** | **Sprint** | **Required Properties** | **Optional Properties** | **Verification** |
| --- | --- | --- | --- | --- | --- | --- |
| **26** | **dashboard\_exported\_csv** | CSV export triggered from dashboard | S4 | response\_count (int), property\_id | — | Fires on button click, not on download completion |
| **27** | **dashboard\_exported\_pdf** | PDF export triggered from dashboard | S4 | response\_count (int), property\_id | — | Fires on button click, not on download completion |

## 4.4 Supplementary Event — beyond the 27 canonical events

INFO: One supplementary event exists beyond the 27 canonical events. It is not in the canonical count because it covers an edge case (Supabase downtime during live session) that should be extremely rare. It is included for completeness and diagnostic value.

| **#** | **Event Name** | **Fired When** | **Sprint** | **Required Properties** | **Optional Properties** | **Verification** |
| --- | --- | --- | --- | --- | --- | --- |
| **S1** | **supabase\_downtime\_shown** | Downtime contingency screen shown — Supabase unreachable for more than 60 seconds | S4 | question\_number (int), episode\_number (int), tier, property\_id | downtime\_duration\_seconds (int when flushed) | Implemented in Sprint 4 step S4-2.7. Rare event — treat any occurrence as an operational incident. |

## 4.5 Funnel Definition — Primary Research Instrument

The primary PostHog funnel for GuestIQ measures the respondent journey from application load through to session completion. This funnel is the most important analytical output of the pilot — it shows exactly where respondents disengage and at which tier.

| **Funnel** | **Definition** |
| --- | --- |
| **Primary funnel** | app\_loaded → tier\_selected → routing\_gate\_answered → episode\_started (ep.1) → episode\_completed (ep.1) → episode\_started (ep.4) → episode\_completed (ep.4) → session\_completed |
| **Segment by tier** | All funnel analyses must be segmented by tier (amateur / professional / expert). Drop-off patterns differ significantly by tier. Aggregated funnel data is misleading. |
| **Episode-level drop-off** | A secondary funnel traces episode\_started → episode\_completed for each of the 7 episodes, by tier. Drop-off above 40% on any episode is a Phase 2 instrument refinement signal. |
| **Created in Sprint 6** | The primary funnel analysis is created in PostHog Insights in Sprint 6 step S6-1.2 (mid-pilot review) and again at S6-2.0 (final analysis). Screenshots saved to Sprint 6 folder. |
| **Dashboard reference** | Panel 1 (Response Overview) in the management dashboard shows session counts. The full funnel analysis is done in PostHog directly — not in the GuestIQ dashboard. |

# 5. Privacy Requirements

Both observability platforms must collect zero Personally Identifiable Information (PII). The respondent is an employee of the hotel — any data that could identify them creates legal and ethical exposure. These are non-negotiable requirements.

| **Requirement** | **Implementation** |
| --- | --- |
| **No IP addresses** | PostHog: ip: false on every capture call. Sentry: sendDefaultPii: false. Verified in Backlog AC-102 (Sentry) and AC-106 (PostHog). Neither platform stores IP addresses from GuestIQ. |
| **No names or identifiers** | Session IDs in Supabase are UUID v4 — not linked to any hotel employee record. No name, employee number, email, or other identifier is collected or stored anywhere. |
| **Session replay — inputs masked** | PostHog session recording: mask\_all\_inputs: true. Any text input (including Q0 Option D free-text field) is masked in recordings — the recording shows a placeholder, not the actual text. |
| **Sentry — no user context** | Sentry.setUser() is never called. No user identification is set on error events. Errors are attributed to sessions by UUID only, and session UUIDs are not linked to identities. |
| **Privacy notice (application UI)** | The welcome screen displays: 'All answers are anonymous. Participation is voluntary. You may close this page at any time without consequence. Your responses contribute to aggregate research only.' This satisfies the FR-008 v2.0 requirement and the IRB path B voluntary participation language. |
| **Verification** | Sprint 4 step S4-2.17 (Backlog S2-17 AC-163): 'PostHog and Sentry IP anonymization confirmed in dashboards.' This is a required gate condition. |

**WARN: Any future configuration change to PostHog or Sentry must be reviewed against these privacy requirements before deployment. In particular: enabling autocapture, adding user identification, or changing session replay settings must be treated as a scope change requiring Lead Researcher approval.**

# 6. Sprint-by-Sprint Instrumentation Plan

Observability is implemented incrementally across sprints. This section maps each sprint's observability deliverables so that the Lead Researcher can verify the correct events are flowing at each sprint gate.

## Pre-Sprint

| **Deliverable** | **Acceptance** |
| --- | --- |
| **PostHog account** | Created at posthog.com. Project: GuestIQ Pilot. IP anonymization enabled. API key saved to posthog-credentials.txt. Verified: project settings show IP anonymization active. |
| **Sentry account** | Created at sentry.io. Project: guestiq-pilot (React). Alert: every new issue. DSN saved to sentry-credentials.txt. Verified: project appears in sentry.io/settings/[org]/projects/. |

## Sprint 2 — Observability Goes Live

Sprint 2 is when GuestIQ first becomes a live URL. Observability must be live from the first deployment — not added later. Steps S2-2.1a (Sentry) and S2-2.1b (PostHog) are the first two build tasks, before the welcome screen is built.

| **Step** | **Deliverable** |
| --- | --- |
| **S2-2.1a — Sentry init** | Sentry.init() first in main.jsx. ErrorBoundary wraps app. sendDefaultPii: false. tracesSampleRate: 1.0. Test error captured within 60 seconds. |
| **S2-2.1b — PostHog init** | posthog.init() after Sentry. analytics.js created with all 27 stub functions. ip: false enforced. app\_loaded appears in PostHog within 60 seconds. |
| **Sprint 2 gate events (16 events)** | Events 1–3, 5–9, 15–20, 24–25 implemented and verified firing during Sprint 2 test cases (S2-3.2 Test 6 and Test 7). |
| **RLS rejection detection** | service layer detects HTTP 403/400, calls Sentry with RLS\_REJECTION context, does not queue for retry. Verified via Backlog S2-12 AC. |

## Sprint 3 — Gamification Events

| **Step** | **Deliverable** |
| --- | --- |
| **Sprint 3 events (8 events)** | Events 4, 10–14, 21–23 implemented as gamification layer and completion screen are built. |
| **credentials\_enrichment\_completed** | Event #4 fires on enrichment screen dismiss — not on form submit, not pre-questionnaire. Verified name matches v2.0 rename. |
| **session\_completed properties** | Includes tier, total\_time\_seconds, intent\_category, tense\_frame, property\_id. The analytics.js function calculates total\_time\_seconds from session start timestamp. |

## Sprint 4 — Full Verification

| **Step** | **Deliverable** |
| --- | --- |
| **Sprint 4 events (3 events)** | Events 26–27 (exports) and supplementary event S1 (downtime) implemented. |
| **S4-07 — 27-event completeness audit** | All 27 event names verified in PostHog Events dashboard. Exact names compared against this document. Event #4 = credentials\_enrichment\_completed verified. PostHog dashboard\_opened and dashboard\_panel\_viewed verified. This is a sprint gate condition. |
| **Sentry verification** | Core Web Vitals visible in Sentry Performance. Test error captured within 60 seconds. Performance traces show LCP, TTI, INP, CLS metrics. |
| **S4-09 — Performance targets** | LCP under 2.0s (p50), TTI under 3.0s (p50), question transition under 300ms — all verified via Sentry Performance on actual front desk PCs. |

## Sprint 5 — Real-Respondent Confirmation

| **Step** | **Deliverable** |
| --- | --- |
| **S5-06 — First real session** | At least 1 session\_completed event from a non-developer session visible in PostHog. Sentry shows no critical errors from real devices. Core Web Vitals visible for real sessions. |
| **Daily monitoring** | SQL 1 (session counts) + SQL 2 (abandoned sessions) in Supabase. PostHog funnel check: app\_loaded to session\_completed. Drop-off above 40% at any episode flagged for debrief. |

## Sprint 6 — Research Analytics

| **Step** | **Deliverable** |
| --- | --- |
| **S6-1.2 — PostHog funnel analysis** | Primary funnel: app\_loaded → session\_completed, segmented by tier. Episode-level drop-off rates extracted. Screenshot saved. |
| **S6-1.3 — Sentry performance review** | Page load time distribution across real sessions. Median and 95th percentile LCP noted. Any sessions with slow load times correlated with specific front desk PCs. |
| **S6-3.6 — Analytics summary for research record** | Complete narrative export of all PostHog funnel data, event counts, and session replay insights. Sentry performance and error summary. Both become permanent research record artifacts filed in Sprint 6 Approved folder. |

# 7. Sprint 4 Verification Checklist

Step S4-07 in the Master Development Timeline requires verification of all 27 PostHog events and Sentry completeness. This checklist is the authoritative acceptance criteria for that step.

## 7.1 PostHog Events Verification

| **Step** | **Action and Acceptance** |
| --- | --- |
| **Step 1 — Open PostHog Events** | URL: https://app.posthog.com/events. Filter to your GuestIQ project. Set date range to last 7 days. |
| **Step 2 — Verify all 27 event names** | Each event name must appear exactly as specified in Section 4 of this document. Check for: correct underscore spelling, no capital letters, no spaces. Common errors: 'credentials\_completed' (old name — should be 'credentials\_enrichment\_completed'), 'episodeStarted' (camelCase — should be 'episode\_started'). |
| **Step 3 — Verify required properties** | Click any event\_started event. Verify properties include: episode\_number (integer, not string), episode\_name (string), tier, property\_id. Repeat for session\_completed (verify intent\_category and tense\_frame present). |
| **Step 4 — Verify ip: false** | In any event's properties, confirm no 'ip' field is present. If an ip field appears with a real IP address, IP anonymization is not working — Critical bug. |
| **Step 5 — Verify session replay** | Open PostHog Session Recordings. At least one recording should be visible. Verify text input fields appear as masked (asterisks or placeholder), not as actual typed text. |
| **Step 6 — Build primary funnel** | PostHog Insights → New Funnel. Add steps: app\_loaded → tier\_selected → session\_completed. Segment by tier. Verify funnel renders with data. |
| **Step 7 — Verify dashboard events** | Open the GuestIQ dashboard (SHIFT+CTRL+A). Verify dashboard\_opened and dashboard\_panel\_viewed fire in PostHog Events within 30 seconds. |

## 7.2 Sentry Verification

| **Step** | **Action and Acceptance** |
| --- | --- |
| **Step 1 — Error capture test** | In browser DevTools console, run: throw new Error('GuestIQ Sentry test'). Verify error appears in Sentry within 60 seconds with full stack trace and no PII. |
| **Step 2 — Performance dashboard** | Sentry → Performance. Verify LCP, INP, CLS, and TTI metrics are visible. Verify values are within targets specified in Section 2.4. |
| **Step 3 — Verify no PII** | In any Sentry error or transaction, confirm: no user.email, no user.ip\_address, no user.name fields. Environment should show 'pilot', not 'development'. |
| **Step 4 — RLS rejection test** | In Supabase, temporarily make an RLS policy too restrictive. Trigger a Supabase write from the app. Verify Sentry captures an error with type: 'RLS\_REJECTION'. Restore the correct policy. |

# 8. Analytics for Research — PostHog as Research Instrument

PostHog is not just an operational tool in GuestIQ — it is a research instrument. The behavioral data it captures directly informs the Phase 2 instrument refinement and is included in the Pilot Debrief Report alongside the Supabase response data.

## 8.1 Key Research Questions Answered by PostHog

| **Research Question** | **PostHog Data Source** |
| --- | --- |
| **Which tier do respondents self-select?** | tier\_selected event distribution. This validates whether the Amateur/Professional/Expert identity framing achieves the intended distribution (target: 50%+ select Professional or Expert). |
| **Where do respondents disengage?** | episode\_started → episode\_completed drop-off by episode and tier. The primary engagement quality signal. Episodes with >40% drop-off are instrument refinement candidates. |
| **How often is the tier upgrade accepted?** | tier\_upgrade\_prompted → tier\_upgrade\_accepted vs tier\_upgrade\_declined ratio. Validates the PLG upgrade mechanic effectiveness. |
| **How common are none-flag selections?** | none\_flag\_selected rate per question\_id. Cross-reference with Supabase none\_flags table. Identifies questions where the answer options fail to represent respondent experience. |
| **What is the total time investment?** | total\_time\_seconds in session\_completed. Distribution across tiers validates the time estimates (Amateur 5min, Professional 8min, Expert 16min) and identifies outliers. |
| **Does session replay reveal friction?** | PostHog session recordings show where respondents pause, re-read, or hesitate. Qualitative signal that quantitative events cannot capture. Used in UAT analysis and debrief report. |

## 8.2 Sprint 6 Analytics Summary Scope

Sprint 6 step S6-3.6 produces the PostHog and Sentry Analytics Summary — a permanent research record artifact filed in the Sprint 6 Approved folder. This summary must include:

- Total event counts by event name across the full pilot window
- Primary funnel: app\_loaded through session\_completed, segmented by tier, with conversion rates at each step
- Episode drop-off analysis: episode\_started to episode\_completed rates for all 7 episodes, by tier
- Tier upgrade analysis: prompt rate, acceptance rate, and decline rate
- None-flag rate summary: top 10 questions by none\_flag\_selected frequency
- Session duration distribution: mean and median total\_time\_seconds per tier
- Sentry performance summary: median LCP, p95 LCP, median TTI across all real-respondent sessions
- Sentry error summary: total error count, unique error types, resolution status
- Session replay qualitative notes: Lead Researcher observations from viewing recordings

INFO: The PostHog and Sentry Analytics Summary is filed as a Sprint 6 artifact and cited in the Pilot Debrief Report. If the research findings are submitted for academic publication, this summary is part of the methodology documentation demonstrating data collection integrity.

# 9. Version Log

| **Ver.** | **Date** | **By** | **Change** |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF OBSERVABILITY AND ANALYTICS SPECIFICATION v1.0 —**

*GuestIQ · Observability and Analytics Specification v1.0 · S0-3.3 · Sprint 0 Artifact · Confidential*