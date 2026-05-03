# data_flow_diagram_v10

*Document Type: DOCX*

## Table of Contents

  - [**DATA FLOW DIAGRAM**](#data-flow-diagram)
    - [**GuestIQ**** — Hotel Guest Expectations Research Application**](#guestiq--hotel-guest-expectations-research-application)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Levels**](#levels)
  - [**Flow Categories**](#flow-categories)
  - [**Review Checklist**](#review-checklist)
  - [**Document Location**](#document-location)
  - [**Related Documents**](#related-documents)
    - [**WARN****:  Zero**** PII flows to any external service. ****Supabase**** receives anonymous UUIDs and research responses only. Sentry receives error context with ****sendDefaultPii****: false. ****PostHog**** receives behavioral events with ****ip****: false. The PII audit in Section 5 documents verification steps for each stream.**](#warn--zero-pii-flows-to-any-external-service-supabase-receives-anonymous-uuids-and-research-responses-only-sentry-receives-error-context-with-senddefaultpii-false-posthog-receives-behavioral-events-with-ip-false-the-pii-audit-in-section-5-documents-verification-steps-for-each-stream)
- [1. DFD Notation and Colour Key](#1-dfd-notation-and-colour-key)
  - [**Browser**](#browser)
  - [**React App**](#react-app)
  - [**Supabase**](#supabase)
  - [**Sentry**](#sentry)
  - [**PostHog**](#posthog)
  - [**Content Files**](#content-files)
  - [**→ WRITE**](#-write)
  - [**← READ**](#-read)
  - [**→ ERROR**](#-error)
  - [**→ EVENT**](#-event)
  - [**← CONTENT**](#-content)
- [2. Level 0 — Context Diagram](#2-level-0--context-diagram)
  - [**GITHUB PAGES CDN**](#github-pages-cdn)
  - [**BROWSER**](#browser)
  - [**REACT APP**](#react-app)
  - [**SUPABASE**](#supabase)
  - [**SENTRY**](#sentry)
  - [**POSTHOG**](#posthog)
    - [**CONTENT FILES (Phase 1a: questionnaire.js · Phase 1b: 6 JSON files)**](#content-files-phase-1a-questionnairejs--phase-1b-6-json-files)
- [3. Level 1 — Detailed Flow Catalogue](#3-level-1--detailed-flow-catalogue)
  - [3.1 Write Flows — Browser Application to Supabase](#31-write-flows--browser-application-to-supabase)
  - [**Flow ID**](#flow-id)
  - [**From**](#from)
  - [**To**](#to)
  - [**Data Classification**](#data-classification)
  - [**Direction**](#direction)
  - [**Data Elements and Notes**](#data-elements-and-notes)
  - [**DFD-W1**](#dfd-w1)
  - [**WRITE**](#write)
  - [**DFD-W2**](#dfd-w2)
  - [**WRITE**](#write)
  - [**DFD-W3**](#dfd-w3)
  - [**WRITE**](#write)
  - [**DFD-W4**](#dfd-w4)
  - [**WRITE**](#write)
  - [**DFD-W5**](#dfd-w5)
  - [**WRITE**](#write)
  - [**DFD-W6**](#dfd-w6)
  - [**WRITE**](#write)
  - [**DFD-W7**](#dfd-w7)
  - [**WRITE**](#write)
  - [**DFD-W8**](#dfd-w8)
  - [**WRITE**](#write)
  - [3.2 Read Flows — Supabase to Browser Application](#32-read-flows--supabase-to-browser-application)
  - [**Flow ID**](#flow-id)
  - [**From**](#from)
  - [**To**](#to)
  - [**Data Classification**](#data-classification)
  - [**Direction**](#direction)
  - [**Data Elements and Notes**](#data-elements-and-notes)
  - [**DFD-R1**](#dfd-r1)
  - [**READ**](#read)
  - [**DFD-R2**](#dfd-r2)
  - [**READ**](#read)
  - [**DFD-R3**](#dfd-r3)
  - [**READ**](#read)
  - [3.3 Error Flows — Browser Application to Sentry](#33-error-flows--browser-application-to-sentry)
  - [**Flow ID**](#flow-id)
  - [**From**](#from)
  - [**To**](#to)
  - [**Data Classification**](#data-classification)
  - [**Direction**](#direction)
  - [**Data Elements and Notes**](#data-elements-and-notes)
  - [**DFD-E1**](#dfd-e1)
  - [**ERROR**](#error)
  - [**DFD-E2**](#dfd-e2)
  - [**ERROR**](#error)
  - [**DFD-E3**](#dfd-e3)
  - [**ERROR**](#error)
  - [**DFD-E4**](#dfd-e4)
  - [**ERROR**](#error)
  - [**DFD-E5**](#dfd-e5)
  - [**ERROR**](#error)
  - [**DFD-E6**](#dfd-e6)
  - [**ERROR**](#error)
  - [3.4 Event Flows — Browser Application to PostHog](#34-event-flows--browser-application-to-posthog)
  - [**Flow ID**](#flow-id)
  - [**From**](#from)
  - [**To**](#to)
  - [**Data Classification**](#data-classification)
  - [**Direction**](#direction)
  - [**Data Elements and Notes**](#data-elements-and-notes)
  - [**DFD-P1**](#dfd-p1)
  - [**EVENT**](#event)
  - [**DFD-P2**](#dfd-p2)
  - [**EVENT**](#event)
  - [**DFD-P3**](#dfd-p3)
  - [**EVENT**](#event)
  - [**DFD-P4**](#dfd-p4)
  - [**EVENT**](#event)
  - [**DFD-P5**](#dfd-p5)
  - [**EVENT**](#event)
  - [**DFD-P6**](#dfd-p6)
  - [**EVENT**](#event)
  - [**DFD-P7**](#dfd-p7)
  - [**EVENT**](#event)
  - [**DFD-P8**](#dfd-p8)
  - [**EVENT**](#event)
  - [3.5 Content Flows — Content Files to Browser Application](#35-content-flows--content-files-to-browser-application)
  - [**Flow ID**](#flow-id)
  - [**From**](#from)
  - [**To**](#to)
  - [**Data Classification**](#data-classification)
  - [**Direction**](#direction)
  - [**Data Elements and Notes**](#data-elements-and-notes)
  - [**DFD-C1**](#dfd-c1)
  - [**CONTENT**](#content)
  - [**DFD-C2**](#dfd-c2)
  - [**CONTENT**](#content)
  - [**DFD-C3**](#dfd-c3)
  - [**CONTENT**](#content)
- [4. Offline Queue Data Flow](#4-offline-queue-data-flow)
  - [**Normal Operation**](#normal-operation)
  - [**Offline Queue Active**](#offline-queue-active)
  - [**Queue Flush**](#queue-flush)
  - [**↓**](#)
  - [**↓**](#)
  - [**↓**](#)
  - [**↓**](#)
  - [**↓**](#)
- [5. PII Audit — Zero PII in All Outbound Flows](#5-pii-audit--zero-pii-in-all-outbound-flows)
  - [**Destination**](#destination)
  - [**Data Sent**](#data-sent)
  - [**PII Status**](#pii-status)
  - [**Verification**](#verification)
    - [**ZERO PII — no names, no email, no employee ID, no IP address. All identifiers are UUID v4 generated by ****crypto.randomUUID****(). ****Supabase**** anon key used — RLS blocks cross-session reads.**](#zero-pii--no-names-no-email-no-employee-id-no-ip-address-all-identifiers-are-uuid-v4-generated-by-cryptorandomuuid-supabase-anon-key-used--rls-blocks-cross-session-reads)
    - [**ZERO PII — ****sendDefaultPii****: false in ****Sentry.init****(). IP address not captured. User context (****Sentry.setUser****()) never called. ****session_id**** in context is the anonymous UUID only.**](#zero-pii--senddefaultpii-false-in-sentryinit-ip-address-not-captured-user-context-sentrysetuser-never-called-session_id-in-context-is-the-anonymous-uuid-only)
    - [**ZERO PII — ****ip****: false on every ****posthog.capture****() call in analytics.js. Session ****replay****: ****mask_all_inputs****: true — text inputs (Q0 Option D free text) not recorded. No user identification set.**](#zero-pii--ip-false-on-every-posthogcapture-call-in-analyticsjs-session-replay-mask_all_inputs-true--text-inputs-q0-option-d-free-text-not-recorded-no-user-identification-set)
    - [**ZERO PII — GitHub Pages serves static files only. No user data sent to GitHub. CDN logs contain browser ****IP**** but this is GitHub's infrastructure, not ****GuestIQ**** data collection.**](#zero-pii--github-pages-serves-static-files-only-no-user-data-sent-to-github-cdn-logs-contain-browser-ip-but-this-is-githubs-infrastructure-not-guestiq-data-collection)
- [6. S1-1.6 Review Checklist](#6-s1-16-review-checklist)
  - [**Check**](#check)
  - [**Verification**](#verification)
  - [**Check 1 — Three outbound streams are clearly distinct**](#check-1--three-outbound-streams-are-clearly-distinct)
  - [**Check 2 — No PII flows to ****PostHog**** or Sentry**](#check-2--no-pii-flows-to-posthog-or-sentry)
- [7. Version Log](#7-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF DATA FLOW DIAGRAM v1.0 —**](#-end-of-data-flow-diagram-v10-)

## **DATA FLOW DIAGRAM**

### **GuestIQ**** — Hotel Guest Expectations Research Application**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Review by Lead Researcher


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Levels****

Level 0 — Context Diagram (Section 2) · Level 1 — Detailed Flow Catalogue (Section 3)


**## **Flow Categories****

WRITE (green) · READ (blue) · ERROR (red) · EVENT (purple) · CONTENT (amber)


**## **Review Checklist****

(1) Three outbound streams distinct: Supabase, Sentry, PostHog. (2) No PII flows to PostHog or Sentry — only anonymous session IDs. (3) Offline queue flow shown. (4) Content flow shown.


**## **Document Location****

01-Sprint-1 / AI-Outputs / Data-Flow-Diagram-v1.0.docx


**## **Related Documents****

System Architecture Document v1.0 (S1-1.1) · Observability Spec (S0-3.3) · SRS-F v2.0 Sections 7, 11




INFO:  Three outbound data streams leave the GuestIQ application — to Supabase (research data), to Sentry (error telemetry), and to PostHog (behavioral events). These streams are architecturally distinct in purpose, data class, and privacy classification. They must never be conflated.

### **WARN****:  Zero**** PII flows to any external service. ****Supabase**** receives anonymous UUIDs and research responses only. Sentry receives error context with ****sendDefaultPii****: false. ****PostHog**** receives behavioral events with ****ip****: false. The PII audit in Section 5 documents verification steps for each stream.**


# 1. DFD Notation and Colour Key

This document uses a simplified DFD notation adapted for Word format. External entities and data stores are shown as coloured blocks. Data flows are labelled arrows shown as text between blocks.


| ## **Browser**  External entity | ## **React App**  Process | ## **Supabase**  Data store | ## **Sentry**  External service | ## **PostHog**  External service | ## **Content Files**  Internal data store |
| --- | --- | --- | --- | --- | --- |




| ## **→ WRITE**  Data written to external store | ## **← READ**  Data retrieved from external store | ## **→ ERROR**  Error telemetry sent | ## **→ EVENT**  Behavioral event fired | ## **← CONTENT**  Content read from local file |
| --- | --- | --- | --- | --- |




# 2. Level 0 — Context Diagram

The Level 0 diagram shows GuestIQ's position within its external environment — all entities the system interacts with and the high-level data flows between them. This is the architectural big picture before detail is added in Level 1.


| ## **GITHUB PAGES CDN**  guestiq.github.io  ·  HTTPS enforced  ·  Serves compiled JS/CSS/HTML bundle |  |  |  |  |
| --- | --- | --- | --- | --- |
| ↓  JS bundle download (HTTPS) |  |  |  |  |
| ## **BROWSER**  Hotel front desk PC  Edge / Chrome  localStorage: session token | ## **REACT APP**  Runs in browser  src/services/supabase.js  src/services/analytics.js  src/hooks/useQuestionnaire.js | ## **SUPABASE**  PostgreSQL + Auth + RLS  sessions · responses  scale_responses · none_flags | ## **SENTRY**  Error tracking  Performance monitoring  Core Web Vitals | ## **POSTHOG**  Product analytics  Session replay  27 canonical events |
| ↕  interaction | →  session record, responses  ←  session data (read) | →  errors + context | →  named events + props |  |
| ### **CONTENT FILES (Phase 1a: questionnaire.js · Phase 1b: 6 JSON files)**  Read at runtime by useQuestionnaire hook  ·  Never modified by components  ·  Never sent to any external service |  |  |  |  |




INFO:  The React application runs entirely inside the browser. It is not a separate server — it is JavaScript executing on the front desk PC. The three external services (Supabase, Sentry, PostHog) are cloud-hosted and accessed via HTTPS from the browser. GitHub Pages is the CDN that delivers the compiled bundle. Content files are bundled with the application — they are not external services.


# 3. Level 1 — Detailed Flow Catalogue

Level 1 decomposes each high-level flow into named, typed data flows with specific data elements. Each flow is assigned an ID (DFD-XX), a source, a destination, a direction type, and a full description of the data transferred.


## 3.1 Write Flows — Browser Application to Supabase

Write flows carry research data from the respondent's session into the Supabase database. All writes are immediate (not batched) and go exclusively through src/services/supabase.js. The offline queue preserves writes during network outages.


| ## **Flow ID** | ## **From** | ## **To** | ## **Data Classification** | ## **Direction** | ## **Data Elements and Notes** |
| --- | --- | --- | --- | --- | --- |
| ## **DFD-W1** | React App | Supabase: sessions | Research data | ## **WRITE** | Session creation on tier selection. Fields written: session_id (UUID v4), property_id, tier, tense_frame (null — set at Q0), intent_category (null — set at Q1), is_complete (false), created_at (now()), user_id (null — Phase 1 bypass mode). Written via createSession() in supabase.js. |
| ## **DFD-W2** | React App | Supabase: sessions | Research data | ## **WRITE** | Session update at Q0 answer. Fields written: tense_frame ('retrospective' or 'anticipatory'). Written via updateSession(). Second update at Q1 answer: intent_category (taxonomy code e.g. 'WORK-TRANS'). |
| ## **DFD-W3** | React App | Supabase: sessions | Research data | ## **WRITE** | Session completion. Fields written: is_complete (true), completed_at (now()). Written via updateSession() when respondent answers final question for their tier. |
| ## **DFD-W4** | React App | Supabase: sessions | Enrichment data | ## **WRITE** | Post-completion enrichment. Fields written: credentials_years, credentials_interactions, credentials_shift (all text, nullable). Written via updateEnrichment(). Only if respondent fills enrichment screen — not written on Skip. Session already complete at this point. |
| ## **DFD-W5** | React App | Supabase: responses | Research data | ## **WRITE** | Question response record. One record per answered option per question. Fields: response_id (UUID), session_id (FK), question_id (e.g. 'Q1'), answer_code (e.g. 'A'), tense_frame, module_number, property_id, created_at. Written via insertResponse(). Fires for single_select, multi_select, and none option selections. Does NOT fire for scale questions (see DFD-W6). |
| ## **DFD-W6** | React App | Supabase: scale_responses | Research data | ## **WRITE** | Scale question response. One record per answered scale question. Fields: scale_response_id (UUID), session_id (FK), question_id, scale_value (integer 1–5), property_id, created_at. Written via insertScaleResponse(). Scale questions appear in Modules 3, 4, 5, and 6. |
| ## **DFD-W7** | React App | Supabase: none_flags | Research data | ## **WRITE** | None-flag record. Written ADDITIONALLY to DFD-W5 when the 'None of these fit my situation' option is selected. Fields: none_flag_id (UUID), session_id (FK), question_id, property_id, created_at. Written via insertNoneFlag(). The responses record is also written (DFD-W5) — none_flags table records the flag separately for rate analysis. |
| ## **DFD-W8** | React App (queue) | Supabase: all tables | Research data | ## **WRITE** | Offline queue flush. When Supabase was unreachable, writes DFD-W5/W6/W7 were stored in the in-memory offline queue. On reconnection, the queue flushes all pending writes in order to the correct tables. Write order preserved. written_at timestamp is the original capture time. Fires offline_queue_flushed PostHog event after all queued writes succeed. |




## 3.2 Read Flows — Supabase to Browser Application

Read flows carry data from Supabase into the application. In Phase 1, reads are limited to two specific operations: session resume verification and dashboard data retrieval. All reads go through src/services/supabase.js.


| ## **Flow ID** | ## **From** | ## **To** | ## **Data Classification** | ## **Direction** | ## **Data Elements and Notes** |
| --- | --- | --- | --- | --- | --- |
| ## **DFD-R1** | Supabase: sessions | React App | Session state | ## **READ** | Session resume check. On application load when localStorage token found: getIncompleteSession(token) queries the sessions table for a matching session_id where is_complete = false. Returns: session record fields (tier, tense_frame, intent_category, last question position) or null. Used by disambiguation screen to offer resume. |
| ## **DFD-R2** | Supabase: all tables | React App | Dashboard aggregate | ## **READ** | Dashboard data retrieval. getDashboardData(propertyId) reads aggregate data for all 9 dashboard panels. Reads: sessions table (count by tier, completion rate, intent distribution), responses table (frequency per question/answer), scale_responses (average values), none_flags (rate per question). Requires dashboard SELECT policy applied in RLS setup. Used only when SHIFT+CTRL+A overlay is open. |
| ## **DFD-R3** | Supabase: sessions | React App | Aggregate comparison | ## **READ** | Completion screen aggregate chart. If 3+ complete sessions exist for the property_id, a subset of sessions data is read to show anonymized aggregate comparison. Read via getDashboardData() with a filtered query. No individual session data shown — aggregate statistics only. |




## 3.3 Error Flows — Browser Application to Sentry

Error flows carry error telemetry to Sentry. All error data is technical context only — no research data, no PII. sendDefaultPii: false is set in Sentry.init().


| ## **Flow ID** | ## **From** | ## **To** | ## **Data Classification** | ## **Direction** | ## **Data Elements and Notes** |
| --- | --- | --- | --- | --- | --- |
| ## **DFD-E1** | React ErrorBoundary | Sentry | Error telemetry | ## **ERROR** | Unhandled React rendering error. Automatically captured by the Sentry ErrorBoundary wrapped around the entire application in main.jsx. Data sent: error type, error message, component stack trace, browser name, OS, app version (VITE_APP_VERSION), environment (VITE_APP_ENV). No session state included automatically — ErrorBoundary fires before component state is accessible. |
| ## **DFD-E2** | supabase.js service | Sentry | Error telemetry | ## **ERROR** | Supabase write failure. Every write function in supabase.js has a try-catch. On catch: Sentry.captureException(error, { extra: { type: 'SUPABASE_WRITE', function_name, session_id (anonymous UUID), question_id, property_id } }). The session_id is the anonymous UUID — not linkable to any individual. |
| ## **DFD-E3** | supabase.js service | Sentry | Error telemetry | ## **ERROR** | Supabase RLS rejection. HTTP 403/400 response detected by inspecting error code. Sentry.captureException called with { type: 'RLS_REJECTION', function_name, session_id }. NOT added to offline queue — RLS rejection is a configuration error, not a transient network issue. Lead Researcher email alert within 60 seconds. |
| ## **DFD-E4** | supabase.js service | Sentry | Error telemetry | ## **ERROR** | Supabase read failure (dashboard). getDashboardData() failure captured with { type: 'SUPABASE_READ', panel_name, property_id }. Dashboard overlay shows error state on the affected panel. Other panels unaffected. |
| ## **DFD-E5** | Dashboard components | Sentry | Error telemetry | ## **ERROR** | Export failure. CSV or PDF generation error captured with { type: 'EXPORT_FAILURE', export_type ('csv'|'pdf'), response_count }. Dashboard overlay shows export failed message with retry button. |
| ## **DFD-E6** | React App | Sentry | Performance telemetry | ## **ERROR** | Core Web Vitals. Sentry performance monitoring captures: LCP (Largest Contentful Paint), TTI (Time to Interactive), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift) for every real user session. tracesSampleRate: 1.0 — 100% of sessions included. Data: metric value, metric name, app version, environment. Shown in Sentry Performance dashboard. |




## 3.4 Event Flows — Browser Application to PostHog

Event flows carry behavioral data to PostHog via src/services/analytics.js. Every event carries property_id from application state and ip: false is applied universally. No event carries personally identifiable data.


| ## **Flow ID** | ## **From** | ## **To** | ## **Data Classification** | ## **Direction** | ## **Data Elements and Notes** |
| --- | --- | --- | --- | --- | --- |
| ## **DFD-P1** | React App | PostHog | Behavioral event | ## **EVENT** | Session lifecycle events (Sprint 2). Events: app_loaded (device_type, browser_name, property_id), welcome_hook_viewed (property_id), tier_selected (tier, property_id). Fired from components via analytics service functions. These establish the top of the PostHog funnel. |
| ## **DFD-P2** | React App | PostHog | Behavioral event | ## **EVENT** | Tense routing event (Sprint 2). Event: routing_gate_answered (tense_frame, answer_option, property_id). Fired at Q0 answer. Enables funnel segmentation by tense frame. |
| ## **DFD-P3** | React App | PostHog | Behavioral event | ## **EVENT** | Question interaction events (Sprint 2). Events per question: question_answered (question_id, answer_code, module_number, tier, tense_frame, property_id). none_flag_selected additionally fires (question_id, module_number, tier, property_id) on none option. episode_started and episode_completed fire at episode boundaries. |
| ## **DFD-P4** | React App | PostHog | Behavioral event | ## **EVENT** | Session state events (Sprint 2). Events: session_paused (question_number_at_pause, tier, property_id — fires on beforeunload), disambiguation_shown/resumed/new_session (property_id or question_number_resumed_from). offline_queue_activated (question_number, episode_number, property_id) and offline_queue_flushed (responses_queued, property_id). |
| ## **DFD-P5** | React App | PostHog | Behavioral event | ## **EVENT** | Gamification events (Sprint 3). Events: curiosity_hook_viewed (episode_number, tier, property_id), badge_awarded (badge_name, episode_number, tier, property_id), tier_upgrade_prompted/accepted/declined, purpose_expert (primary_intent_category, secondary_intent_category, property_id). |
| ## **DFD-P6** | React App | PostHog | Behavioral event | ## **EVENT** | Completion events (Sprint 3). Events: session_completed (tier, total_time_seconds, intent_category, tense_frame, property_id), results_viewed (tier, intent_category, property_id), aggregate_comparison_viewed (responses_in_aggregate, property_id), credentials_enrichment_completed (fields_answered, property_id). |
| ## **DFD-P7** | React App | PostHog | Behavioral event | ## **EVENT** | Dashboard events (Sprint 4). Events: dashboard_opened (property_id), dashboard_panel_viewed (panel_name, property_id), dashboard_exported_csv (response_count, property_id), dashboard_exported_pdf (response_count, property_id). |
| ## **DFD-P8** | React App | PostHog | Session replay | ## **EVENT** | Session replay stream. PostHog session replay captures: screen recordings (UI interactions visible), text inputs masked (mask_all_inputs: true). Q0 Option D free-text response is NOT visible in replay. Used for qualitative UX analysis in Sprint 5–6. Retention: 30 days per NFR-029. |




## 3.5 Content Flows — Content Files to Browser Application

Content flows carry questionnaire content from local files into application state at runtime. Content never flows outward to any external service.


| ## **Flow ID** | ## **From** | ## **To** | ## **Data Classification** | ## **Direction** | ## **Data Elements and Notes** |
| --- | --- | --- | --- | --- | --- |
| ## **DFD-C1** | questionnaire.js | useQuestionnaire hook | Question content | ## **CONTENT** | Phase 1a. questionnaire.js exports a default object. useQuestionnaire hook imports it at module load time. Provides to components: questions array (80 objects), episodes array (7 objects), tiers object (3 entries), uiCopy object (all UI strings), branching object (Module 5 routing rules), taxonomy object (12 intent category definitions). This is a local JavaScript import — no network request. |
| ## **DFD-C2** | 6 JSON config files | useQuestionnaire hook | Question content | ## **CONTENT** | Phase 1b. After Strangler Fig migration (Sprint 3). questions.json, episodes.json, tiers.json, ui-copy.json, branching.json, taxonomy.json read by the updated useQuestionnaire hook. Same data shape as DFD-C1 — hook interface unchanged. configValidator verifies JSON integrity before React renders. These files are bundled with the application by Vite — no separate network request. |
| ## **DFD-C3** | useQuestionnaire hook | React components | Question content | ## **CONTENT** | Hook to component. Components receive content as props — they never import questionnaire.js or JSON files directly. The Question component receives a question object prop. Episode map receives an episodes array prop. The hook is the only file that touches content source files. This is the enforcement boundary for the Strangler Fig pattern. |




# 4. Offline Queue Data Flow

The offline queue is a special data flow pattern that activates when Supabase is unreachable. It preserves all write flows (DFD-W5, W6, W7) in memory and retries them automatically on reconnection.


| ## **Normal Operation** | ## **Offline Queue Active** | ## **Queue Flush** |
| --- | --- | --- |
| Respondent answers question  ## **↓**  insertResponse() called in supabase.js  ## **↓**  Supabase write succeeds → record in DB | Supabase write fails (network error)  ## **↓**  Response stored in memory queue  PostHog: offline_queue_activated  Respondent continues — transparent  Queue retries every 30 seconds | Supabase connection restored  ## **↓**  All queued writes sent in order  ## **↓**  PostHog: offline_queue_flushed  RLS rejections NOT queued (separate flow DFD-E3) |




# 5. PII Audit — Zero PII in All Outbound Flows

Review checklist item 2 (S1-1.6) requires verification that no personal data flows to PostHog or Sentry. This section documents the audit for all three external services.


| ## **Destination** | ## **Data Sent** | ## **PII Status** | ## **Verification** |
| --- | --- | --- | --- |
| Supabase | session_id (UUID), tier, tense_frame, intent_category, question_id, answer_code, scale_value, property_id, timestamps | ### **ZERO PII — no names, no email, no employee ID, no IP address. All identifiers are UUID v4 generated by ****crypto.randomUUID****(). ****Supabase**** anon key used — RLS blocks cross-session reads.** | Sprint 2 data integrity verification (S2-15): inspect all Supabase records, confirm no PII fields present. |
| Sentry | Error type, stack trace, browser name, OS, app version, environment, session_id (anonymous UUID) | ### **ZERO PII — ****sendDefaultPii****: false in ****Sentry.init****(). IP address not captured. User context (****Sentry.setUser****()) never called. ****session_id**** in context is the anonymous UUID only.** | Sprint 4 S4-07: In any Sentry error, confirm: no user.email, no user.ip_address, no user.name. |
| PostHog | Event name, event properties (property_id, tier, question_id, answer_code, episode_number, etc.), session_id (anonymous UUID) | ### **ZERO PII — ****ip****: false on every ****posthog.capture****() call in analytics.js. Session ****replay****: ****mask_all_inputs****: true — text inputs (Q0 Option D free text) not recorded. No user identification set.** | Sprint 4 S4-07: PostHog Settings → Privacy — IP capture disabled. Replay settings — inputs masked. Session replay: no visible text in input fields. |
| GitHub Pages (CDN) | Compiled JS/CSS/HTML bundle served to browser | ### **ZERO PII — GitHub Pages serves static files only. No user data sent to GitHub. CDN logs contain browser ****IP**** but this is GitHub's infrastructure, not ****GuestIQ**** data collection.** | GitHub Pages Terms of Service. Not a GuestIQ data flow concern. |




# 6. S1-1.6 Review Checklist

From MDT v5.0 step S1-1.6 — Lead Researcher review of this document. Both items must be confirmed.


**## **Check 1 — Three outbound streams are clearly distinct****

Supabase (WRITE flows DFD-W1 to W8): research data — session records, question responses, scale values, none-flags. Sentry (ERROR flows DFD-E1 to E6): error telemetry and performance metrics — no research data, no PII. PostHog (EVENT flows DFD-P1 to P8): behavioral events and session replay — no research data, no PII. Verify in Level 0 diagram (Section 2) and Level 1 catalogue (Section 3).


**## **Check 2 — No PII flows to ****PostHog**** or Sentry****

PostHog: ip: false on every capture call. mask_all_inputs: true on session replay. No user identification set. All identifiers are anonymous UUID v4. Sentry: sendDefaultPii: false in Sentry.init(). Sentry.setUser() never called. session_id in error context is anonymous UUID only. Full audit in Section 5.




# 7. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF DATA FLOW DIAGRAM v1.0 —**

*GuestIQ**  ·**  Data Flow Diagram **v1.0  ·**  S1-1.**5  ·**  S1-**03  ·**  Sprint 1 **Artifact  ·**  Confidential*

