# application_state_diagram_v10

*Document Type: DOCX*

## Table of Contents

  - [**APPLICATION STATE DIAGRAM**](#application-state-diagram)
    - [**GuestIQ**** — Hotel Guest Expectations Research Application**](#guestiq--hotel-guest-expectations-research-application)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**States**](#states)
  - [**Review Checklist**](#review-checklist)
  - [**Document Location**](#document-location)
  - [**v2.0 Additions**](#v20-additions)
    - [**WARN****:  The**** downtime state (S-21) and ****its**** retry transition are review checklist item 1. The disambiguation state (S-04) and its two transitions (resume / new session) are ****review**** checklist item 2. These two states are the most complex in the application — trace them carefully.**](#warn--the-downtime-state-s-21-and-its-retry-transition-are-review-checklist-item-1-the-disambiguation-state-s-04-and-its-two-transitions-resume--new-session-are-review-checklist-item-2-these-two-states-are-the-most-complex-in-the-application--trace-them-carefully)
- [1. State Type Legend and Annotation Key](#1-state-type-legend-and-annotation-key)
  - [**INIT**](#init)
  - [**ENTRY**](#entry)
  - [**QUESTION**](#question)
  - [**TRANSITION**](#transition)
  - [**COMPLETION**](#completion)
  - [**ERROR**](#error)
  - [**PH:**](#ph)
  - [**SEN:**](#sen)
  - [**SUP:**](#sup)
  - [**LS:**](#ls)
  - [**[guard]**](#guard)
- [2. Primary Path — Application Boot to Session Complete](#2-primary-path--application-boot-to-session-complete)
  - [**PHASE A — BOOT AND CONTENT LOADING**](#phase-a--boot-and-content-loading)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**PHASE B — SESSION ROUTING**](#phase-b--session-routing)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**PHASE C — SESSION CREATION AND Q0**](#phase-c--session-creation-and-q0)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**PHASE D — QUESTIONNAIRE EPISODES 1–7**](#phase-d--questionnaire-episodes-17)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**PHASE E — COMPLETION AND ENRICHMENT**](#phase-e--completion-and-enrichment)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**→ S-99 Session End**](#-s-99-session-end)
- [3. Offline Queue and Downtime States](#3-offline-queue-and-downtime-states)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
- [4. Disambiguation State — Full Transition Detail](#4-disambiguation-state--full-transition-detail)
  - [**Path A — Resume**](#path-a--resume)
  - [**Path B — New Session**](#path-b--new-session)
- [5. Error and Edge States](#5-error-and-edge-states)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
- [6. Parallel States — Dashboard Overlay](#6-parallel-states--dashboard-overlay)
  - [**entry /**](#entry-)
  - [**exit /**](#exit-)
  - [**transitions →**](#transitions-)
- [7. Complete State Catalogue](#7-complete-state-catalogue)
  - [**ID**](#id)
  - [**State Name**](#state-name)
  - [**Type**](#type)
  - [**Sprint**](#sprint)
  - [**Invariants and Notes**](#invariants-and-notes)
  - [**S-00**](#s-00)
  - [**INIT**](#init)
  - [**S-01**](#s-01)
  - [**INIT**](#init)
  - [**S-02**](#s-02)
  - [**INIT**](#init)
  - [**S-03**](#s-03)
  - [**ENTRY**](#entry)
  - [**S-04**](#s-04)
  - [**ENTRY**](#entry)
  - [**S-05**](#s-05)
  - [**ENTRY**](#entry)
  - [**S-06**](#s-06)
  - [**INIT**](#init)
  - [**S-07**](#s-07)
  - [**QUESTION**](#question)
  - [**S-08**](#s-08)
  - [**QUESTION**](#question)
  - [**S-09**](#s-09)
  - [**TRANSITION**](#transition)
  - [**S-10**](#s-10)
  - [**TRANSITION**](#transition)
  - [**S-11**](#s-11)
  - [**QUESTION**](#question)
  - [**S-12**](#s-12)
  - [**QUESTION**](#question)
  - [**S-13**](#s-13)
  - [**QUESTION**](#question)
  - [**S-20**](#s-20)
  - [**OVERLAY**](#overlay)
  - [**S-21**](#s-21)
  - [**ERROR**](#error)
  - [**S-17**](#s-17)
  - [**COMPLETION**](#completion)
  - [**S-18**](#s-18)
  - [**COMPLETION**](#completion)
  - [**S-19**](#s-19)
  - [**COMPLETION**](#completion)
  - [**S-22**](#s-22)
  - [**MANAGEMENT**](#management)
  - [**S-23**](#s-23)
  - [**ERROR**](#error)
  - [**S-24**](#s-24)
  - [**ERROR**](#error)
  - [**S-25**](#s-25)
  - [**ERROR**](#error)
  - [**S-99**](#s-99)
  - [**TERMINAL**](#terminal)
- [8. S1-1.10 Review Checklist](#8-s1-110-review-checklist)
  - [**Check**](#check)
  - [**Verification**](#verification)
    - [**Check 1 — Downtime state S-21 has clear ****retry**** path**](#check-1--downtime-state-s-21-has-clear-retry-path)
  - [**Check 2 — Disambiguation S-04 has both transitions**](#check-2--disambiguation-s-04-has-both-transitions)
- [9. Version Log](#9-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF APPLICATION STATE DIAGRAM v1.0 —**](#-end-of-application-state-diagram-v10-)

## **APPLICATION STATE DIAGRAM**

### **GuestIQ**** — Hotel Guest Expectations Research Application**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Review by Lead Researcher


**## **Sprint****

Sprint 1 — Architecture and Design


**## **States****

25 states across 8 types: INIT · ENTRY · QUESTION · TRANSITION · COMPLETION · MANAGEMENT · ERROR · TERMINAL


**## **Review Checklist****

(1) Downtime state S-21 has clear retry path. (2) Disambiguation state S-04 has correct transitions for both resume and new session paths.


**## **Document Location****

01-Sprint-1 / AI-Outputs / Application-State-Diagram-v1.0.docx


**## **v2.0 Additions****

PostHog events annotated at transitions. Sentry capture annotated at API states. Content loading state S-01. Downtime state S-21 with retry. Dashboard as parallel overlay state S-22.




INFO:  This diagram is a UML-style state machine. Each state represents a stable application configuration. Transitions are triggered by events (user actions, API responses, timer expiry). Parallel states (Offline Queue S-20, Dashboard Overlay S-22) can be active simultaneously with any respondent state.

### **WARN****:  The**** downtime state (S-21) and ****its**** retry transition are review checklist item 1. The disambiguation state (S-04) and its two transitions (resume / new session) are ****review**** checklist item 2. These two states are the most complex in the application — trace them carefully.**


# 1. State Type Legend and Annotation Key


| ## **INIT**  Boot and setup states | ## **ENTRY**  Entry point states | ## **QUESTION**  Active question states | ## **TRANSITION**  Between-episode screens | ## **COMPLETION**  Post-session states | ## **ERROR**  Error and edge states |
| --- | --- | --- | --- | --- | --- |




| ## **PH:**  PostHog event fired at this transition | ## **SEN:**  Sentry.captureException() called | ## **SUP:**  Supabase write or read via service layer | ## **LS:**  localStorage read or write | ## **[guard]**  Condition that must be true for transition |
| --- | --- | --- | --- | --- |




# 2. Primary Path — Application Boot to Session Complete

The primary path shows the states and transitions for a respondent who completes a session without interruption. Edge cases (offline queue, downtime, disambiguation, errors) are shown in Sections 3–5.


## **PHASE A — BOOT AND CONTENT LOADING**


| **[S-00****]  ****Application**** Booting**   INIT |  |
| --- | --- |
| ## **entry /**  Sentry.init() — error capture active  configValidator() — JSON files checked (Ph1b)  posthog.init() — analytics active | ## **exit /**  React root rendered  ErrorBoundary active |
| ## **transitions →**  boot complete → S-01  configValidator throws → S-23 (Config Error Screen) |  |
| **SEN****:  **ErrorBoundary not active yet — Sentry.init() is the only capture |  |



**↓**  [boot complete]

| **[S-01****]  ****Content**** Loading**   INIT |  |
| --- | --- |
| ## **entry /**  useQuestionnaire hook imports questionnaire.js (Ph1a)  OR imports 6 JSON files (Ph1b)  content object available: { questions, episodes, tiers, uiCopy, branching, taxonomy } | ## **exit /**  All content available as hook return value |
| ## **transitions →**  load complete → S-02 |  |
| **PH****:  **app_loaded — fires as welcome screen begins rendering  **LS****:  **read 'guestiq_session_token' — happens in S-02 |  |



**↓**  [content loaded]

| **[S-02****]  ****localStorage**** Check**   INIT |  |
| --- | --- |
| ## **entry /**  LS: read localStorage['guestiq_session_token'] | ## **exit /** |
| ## **transitions →**  [token found] → S-03 (Supabase session lookup)  [no token] → S-05 (Welcome + Tier Selection) |  |
| **PH****:  **app_loaded (fires here, before branch decision) |  |




[token found]  →  S-03   |   [no token]  →  S-05


## **PHASE B — SESSION ROUTING**


| **[S-03****]  ****Supabase**** Session Lookup**   ENTRY |  |
| --- | --- |
| ## **entry /**  SUP: getIncompleteSession(token) — reads sessions table  SEN: Sentry wraps call | ## **exit /** |
| ## **transitions →**  [session found, incomplete] → S-04 (Disambiguation)  [session not found OR complete] → clear LS token → S-05  [RLS rejection HTTP 403/400] → SEN: captureException → S-05 |  |
| **SEN****:  **all Supabase errors captured with { type: 'SUPABASE_READ', session_id } |  |



**↓**  [incomplete session found in Supabase]

| **[S-04****]  ****Disambiguation**** Screen**   ENTRY |  |
| --- | --- |
| ## **entry /**  PH: disambiguation_shown  Displays: 'Resume my session?' / 'Start fresh' | ## **exit /** |
| ## **transitions →**  [Resume] → PH: disambiguation_resumed → restore question position → S-07/S-08  [Start fresh] → LS: clear token → PH: disambiguation_new_session → S-05  [token exists but no Supabase match] → LS: clear token → S-05 (silent) |  |
| **PH****:  **disambiguation_shown · disambiguation_resumed · disambiguation_new_session  **LS****:  **token cleared on 'Start fresh' or stale token |  |



**↓**  ['Start fresh' selected]

| **[S-05****]  ****Welcome**** + Tier Selection**   ENTRY |  |
| --- | --- |
| ## **entry /**  PH: welcome_hook_viewed  Renders: hook text + 3 tier cards | ## **exit /** |
| ## **transitions →**  [Tier clicked] → PH: tier_selected → S-06 (Session Creation)  ['Not now' clicked] → S-99 (Session End — no session created) |  |
| **PH****:  **welcome_hook_viewed (on render) · tier_selected (on click) |  |



**↓**  [tier selected]


## **PHASE C — SESSION CREATION AND Q0**


| **[S-06****]  ****Session**** Creation**   INIT |  |
| --- | --- |
| ## **entry /**  SUP: createSession({ session_id, property_id, tier, tense_frame: null, intent_category: null, is_complete: false })  LS: write session_id to localStorage['guestiq_session_token']  SEN: Sentry wraps createSession() | ## **exit /** |
| ## **transitions →**  [write success] → S-07  [write fails — network] → offline queue → S-07  [RLS rejection] → SEN: captureException RLS_REJECTION → S-25 |  |
| **SUP:  ** createSession() in src/services/supabase.js  **LS****:  **session_id written as guestiq_session_token  **SEN****:  **all failures captured; RLS rejection not queued |  |



**↓**  [session created]

| **[S-07****]  ****Q****0 — Tense Routing Gate**   QUESTION |  |
| --- | --- |
| ## **entry /**  PH: episode_started(ep.1)  Renders Q0 (QR1) using standard Question component  Episode map and progress bar visible | ## **exit /**  PH: routing_gate_answered  SUP: updateSession(tense_frame) — sets 'retrospective' or 'anticipatory'  SUP: insertResponse(QR1, answer_code, tense_frame) |
| ## **transitions →**  [Q0 answered] → S-08 (Active Question Ep.1) |  |
| **PH****:  **episode_started(1) on entry · routing_gate_answered on exit  **SUP****:  **updateSession(tense_frame) + insertResponse() on exit |  |



**↓**  [Q0 answered]


## **PHASE D — QUESTIONNAIRE EPISODES 1–7**


| **[S-08****]  ****Active**** Question (Episodes 1–4 and 6–7)**   QUESTION |  |
| --- | --- |
| ## **entry /**  Renders question from useQuestionnaire hook  Question text in correct tense_frame  Progress bar and episode map update | ## **exit /**  PH: question_answered · none_flag_selected (if none option)  SUP: insertResponse() or insertScaleResponse()  SEN: Sentry wraps every Supabase write |
| ## **transitions →**  [answer given, episode continues] → S-08 (self — next question)  [Q1 answered] → SUP: updateSession(intent_category) → S-08  [last Q in Episode 1–6] → S-09 (Curiosity Hook + Badge)  [last Q in Episode 7] → S-17 (Session Complete) |  |
| **PH****:  **question_answered · none_flag_selected per selection  **SUP:  **insertResponse() or insertScaleResponse() per answer  **SEN****:  **every Supabase write wrapped in try-catch |  |



**↓**  [episode complete (Ep.1–6)]

| **[S-09****]  ****Curiosity**** Hook + Badge Reveal**   TRANSITION |  |
| --- | --- |
| ## **entry /**  PH: episode_completed(N) · curiosity_hook_viewed(N) · badge_awarded  Renders: hook text, badge animation, Continue button | ## **exit /** |
| ## **transitions →**  [Continue] → S-10 (Tier Upgrade check) for Ep.1 Amateur or Ep.4 Pro  [Continue, no upgrade applies] → S-11 (Module 5) if Ep.4 complete  [Continue] → S-08 (next episode) otherwise  [Ep.6 Continue] → S-12 (Module 6) |  |
| **PH****:  **episode_completed · curiosity_hook_viewed · badge_awarded |  |



**↓**  [tier upgrade check applies]

| **[S-10****]  ****Tier**** Upgrade Prompt**   TRANSITION |  |
| --- | --- |
| ## **entry /**  PH: tier_upgrade_prompted  Amateur after Ep.1: offer Professional upgrade  Professional after Ep.4: offer Expert upgrade | ## **exit /** |
| ## **transitions →**  [Accept] → PH: tier_upgrade_accepted → SUP: updateSession(tier) → S-08  [Decline] → PH: tier_upgrade_declined → S-08 (continue current tier) |  |
| **PH****:  **tier_upgrade_prompted · tier_upgrade_accepted OR tier_upgrade_declined  **SUP****:  **updateSession(tier) on accept only |  |



**↓**  [Module 5 routing]

| **[S-11****]  ****Module**** 5 Questions (Intent ****Branch)**   QUESTION |  |
| --- | --- |
| ## **entry /**  PH: episode_started(ep.5)  Reads intent_category from session state  Routes to sub-section 5A–5G  Secondary purpose: if Q2 triggers second sub-section → PH: purpose_expert | ## **exit /** |
| ## **transitions →**  [sub-section complete] → S-09 (Ep.5 curiosity hook) |  |
| **PH****:  **episode_started(5) · question_answered · purpose_expert · none_flag_selected  **SUP:  **insertResponse() per answer |  |



**↓**  [Module 6]

| **[S-12****]  ****Module**** 6 Questions (Episode 6)**   QUESTION |  |
| --- | --- |
| ## **entry /**  PH: episode_started(ep.6)  Value and pricing expectations | ## **exit /** |
| ## **transitions →**  [last Q] → S-09 (Ep.6 curiosity hook) → S-13 |  |
| **PH****:  **episode_started(6) · question_answered · none_flag_selected |  |



**↓**  [Module 7]

| **[S-13****]  ****Module**** 7 Questions (Episode 7)**   QUESTION |  |
| --- | --- |
| ## **entry /**  PH: episode_started(ep.7)  Post-stay and relationship expectations  No curiosity hook after Ep.7 — goes directly to completion | ## **exit /** |
| ## **transitions →**  [last Q answered] → S-17 (Session Complete) |  |
| **PH****:  **episode_started(7) · question_answered · episode_completed(7) · session_completed  **SUP:  **insertResponse() · updateSession(is_complete, completed_at) |  |



**↓**  [final question answered]


## **PHASE E — COMPLETION AND ENRICHMENT**


| **[S-17****]  ****Session**** Complete**   COMPLETION |  |
| --- | --- |
| ## **entry /**  SUP: updateSession(is_complete=true, completed_at=now())  LS: CLEAR localStorage['guestiq_session_token']  PH: session_completed (tier, total_time_seconds, intent_category, tense_frame) | ## **exit /** |
| ## **transitions →**  → S-18 (Completion + Results screen) |  |
| **PH****:  **session_completed — the primary research completion event  **SUP:  **updateSession(is_complete=true, completed_at)  **LS:  **token CLEARED — prevents future disambiguation on same browser |  |



**↓**  [immediately]

| **[S-18****]  ****Completion**** + Results Screen**   COMPLETION |  |
| --- | --- |
| ## **entry /**  PH: results_viewed  Renders: celebration screen, earned badges, intent category summary  PH: aggregate_comparison_viewed — if 3+ complete sessions in Supabase | ## **exit /** |
| ## **transitions →**  → S-19 (Enrichment Screen) — shown automatically |  |
| **PH****:  **results_viewed · aggregate_comparison_viewed (conditional)  **SUP:  **getDashboardData() read to check session count for aggregate chart |  |



**↓**  [automatic]

| **[S-19****]  ****Post****-Completion Enrichment Screen**   COMPLETION |  |
| --- | --- |
| ## **entry /**  Optional — shown to ALL tiers  Session already complete — no research data at risk  3 optional fields: years, interactions, shift | ## **exit /** |
| ## **transitions →**  [Skip or browser close] → PH: credentials_enrichment_completed → S-99  [Fields submitted] → SUP: updateEnrichment() → PH: credentials_enrichment_completed → S-99 |  |
| **PH****:  **credentials_enrichment_completed on Skip or navigation  **SUP:  **updateEnrichment() — nullable fields only, session already complete |  |



**↓**  [skip or submit]

## **→ S-99 Session End**


# 3. Offline Queue and Downtime States

The offline queue (S-20) and downtime screen (S-21) are the two connectivity-related states. S-20 is a parallel state — it overlays any active question state without interrupting the respondent. S-21 replaces the active question view.


| **[S-20****]  ****Offline**** Queue Active (Parallel ****State)**   OVERLAY |  |
| --- | --- |
| ## **entry /**  Activates when any Supabase write returns a network error  Responses stored in in-memory queue  Visual indicator shown: 'Your answers are saved — reconnecting'  PH: offline_queue_activated | ## **exit /** |
| ## **transitions →**  [Supabase restored within 60s] → flush queue → PH: offline_queue_flushed → S-20 exits  [>60s elapsed] → S-21 (Downtime Screen) — queue preserved |  |
| **PH****:  **offline_queue_activated (on entry) · offline_queue_flushed (on queue flush)  **SUP****:  **queue holds insertResponse / insertScaleResponse / insertNoneFlag calls |  |




**↓**  [>60 seconds still unreachable]

| **[S-21****]  ****Downtime**** Screen**   ERROR |  |
| --- | --- |
| ## **entry /**  Full-screen display replaces active question view  Message: 'GuestIQ is temporarily unavailable. Your answers are saved.'  PH: supabase_downtime_shown  Retry button visible  Offline queue preserved in memory throughout | ## **exit /** |
| ## **transitions →**  [Retry clicked] → Supabase connectivity check  [Supabase restored] → flush queue → resume from last question → S-08  [still unreachable] → remain in S-21  [Browser close] → PH: session_paused → S-99 (queue lost — data in localStorage only) |  |
| **PH****:  **supabase_downtime_shown · session_paused on close |  |




INFO:  Review checklist item 1 (S1-1.10): The downtime state S-21 has a clear retry path. Retry button → connectivity check → [restored] → flush queue → resume from last question OR [still down] → remain in S-21. This path is shown in the transitions above.


# 4. Disambiguation State — Full Transition Detail

Review checklist item 2 (S1-1.10): both transitions from S-04 must be verified — resume path and new session path.



INFO:  A third path exists (silent): if localStorage token is found but getIncompleteSession() returns null (session not in Supabase, or session is already complete), the token is cleared silently and the application proceeds to S-05 with no disambiguation screen shown.


# 5. Error and Edge States


| **[S-23****]  ****Configuration**** Error Screen**   ERROR |  |
| --- | --- |
| ## **entry /**  configValidator throws on malformed JSON (Phase 1b+)  SEN: Sentry captures error — BEFORE React renders  Static error screen displayed | ## **exit /** |
| ## **transitions →**  [Page refresh] → S-00 (reboot) — only exit |  |
| **SEN****:  **error captured before PostHog initialised — no PH event fires |  |




| **[S-24****]  ****Sentry**** ****ErrorBoundary**** Fallback**   ERROR |  |
| --- | --- |
| ## **entry /**  Unhandled React rendering error caught by ErrorBoundary  SEN: Sentry.captureException() fires automatically  Fallback UI rendered: 'Something went wrong — refresh' | ## **exit /** |
| ## **transitions →**  [Refresh clicked] → S-00 (reboot) → localStorage token preserved → S-03/S-04 |  |
| **SEN:  ** automatic — ErrorBoundary calls Sentry without developer code  **LS:  **token preserved — disambiguation will appear after refresh if session incomplete |  |




| **[S-25****]  ****RLS**** Rejection**   ERROR |  |
| --- | --- |
| ## **entry /**  Supabase returns HTTP 403/400 during any write  SEN: captureException({ type: 'RLS_REJECTION', function_name, session_id })  Response NOT added to offline queue  Lead Researcher email alert within 60s | ## **exit /** |
| ## **transitions →**  No automatic recovery — RLS rejection is a configuration error  Fix requires: Supabase RLS policy correction + redeployment |  |
| **SEN****:  **type: 'RLS_REJECTION' context captured for diagnosis |  |




# 6. Parallel States — Dashboard Overlay

The dashboard overlay (S-22) is a parallel state that can be active simultaneously with any respondent state. It does not interrupt or reset the active session. Pressing SHIFT+CTRL+A again, pressing Escape, or clicking outside the overlay returns to the underlying state.


| **[S-22****]  ****Dashboard**** Overlay (Parallel ****State)**   MANAGEMENT |  |
| --- | --- |
| ## **entry /**  SHIFT+CTRL+A key combination captured on any screen  PH: dashboard_opened  Overlay slides in from right — underlying session state unchanged  SUP: getDashboardData() reads all 4 tables (aggregate) | ## **exit /**  PH: not explicitly fired — underlying state resumes silently |
| ## **transitions →**  [Panel tab clicked] → PH: dashboard_panel_viewed  [Export CSV] → PH: dashboard_exported_csv  [Export PDF] → PH: dashboard_exported_pdf  [Escape or click-outside] → underlying state resumes |  |
| **PH****:  **dashboard_opened · dashboard_panel_viewed · dashboard_exported_csv/pdf  **SUP:  **getDashboardData() read — aggregate across all sessions for property_id |  |




# 7. Complete State Catalogue

All 25 states documented in a single reference table with type, introduction sprint, and invariants.


| ## **ID** | ## **State Name** | ## **Type** | ## **Sprint** | ## **Invariants and Notes** |
| --- | --- | --- | --- | --- |
| ## **S-00** | Application Booting | ## **INIT** | S2 | Sentry.init(), configValidator(), posthog.init() running. No React rendered yet. Sentry ErrorBoundary NOT yet active. app_loaded has not fired. |
| ## **S-01** | Content Loading | ## **INIT** | S2 | questionnaire.js (Ph1a) or JSON files (Ph1b) being imported by useQuestionnaire hook. Happens synchronously at module load — no visible delay. Post-load: all content available as hook return value. |
| ## **S-02** | localStorage Check | ## **INIT** | S2 | Reads key 'guestiq_session_token' from browser localStorage. Branches immediately to S-03 (token found) or S-05 (no token). app_loaded fires just before this check. |
| ## **S-03** | Supabase Session Lookup | ## **ENTRY** | S2 | Calls getIncompleteSession(token). Sentry wraps call. If session found and incomplete → S-04. If not found or complete → clear token → S-05. RLS rejection here → Sentry capture → treat as not found. |
| ## **S-04** | Disambiguation Screen | ## **ENTRY** | S2 | Stable display state. PostHog: disambiguation_shown. Two transitions: 'Resume' → S-06 (restore question position). 'Start fresh' → clear token → S-05. INVARIANT: no Supabase writes occur in this state. |
| ## **S-05** | Welcome + Tier Selection | ## **ENTRY** | S2 | Stable display state. PostHog: welcome_hook_viewed. 'Not now' → S-99 (session end — no session created). Tier click → S-06. INVARIANT: no session record exists in Supabase while in this state. |
| ## **S-06** | Session Creation | ## **INIT** | S2 | createSession() called. Writes to Supabase sessions table. Writes session_id to localStorage. Sentry wraps call. On success → S-07. On failure (network) → offline queue → S-07. On RLS rejection → Sentry.captureException → S-25. |
| ## **S-07** | Q0 — Tense Routing Gate | ## **QUESTION** | S2 | Standard question render. PostHog: episode_started(ep.1). Q0 styled identical to Q1-Q79. Answer → updateSession(tense_frame) → insertResponse(QR1) → S-08. PostHog: routing_gate_answered. |
| ## **S-08** | Active Question (Ep.1–4) | ## **QUESTION** | S2 | Covers Q1–Q38 across Episodes 1–4. PostHog: question_answered on each answer. none_flag_selected additionally if none option chosen. Supabase: insertResponse() or insertScaleResponse() per answer. If final Q in episode → S-09. |
| ## **S-09** | Curiosity Hook + Badge | ## **TRANSITION** | S3 | PostHog: episode_completed, curiosity_hook_viewed, badge_awarded. Continue → next episode or S-10 (tier upgrade check). If Ep.6 complete → S-14 (Module 6). If Ep.7 answers done → S-17 (completion). |
| ## **S-10** | Tier Upgrade Prompt | ## **TRANSITION** | S3 | PostHog: tier_upgrade_prompted. Accept → updateSession(tier) → S-08 (continue at higher tier). Decline → S-08 (continue at current tier). Shown: Amateur after Ep.1, Professional after Ep.4. |
| ## **S-11** | Module 5 Questions | ## **QUESTION** | S3 | Routes from intent_category stored at Q1. 7 sub-sections (5A–5G). PostHog: episode_started(ep.5), question_answered, purpose_expert (if Q2 secondary triggers second sub-section). On complete → S-09 (Ep.5 curiosity hook). |
| ## **S-12** | Module 6 Questions (Ep.6) | ## **QUESTION** | S3 | PostHog: episode_started(ep.6), question_answered. On last Q → S-09 (Ep.6 curiosity hook). |
| ## **S-13** | Module 7 Questions (Ep.7) | ## **QUESTION** | S3 | PostHog: episode_started(ep.7), question_answered. Episode 7 has no curiosity hook. On last Q → S-17 directly. |
| ## **S-20** | Offline Queue Active | ## **OVERLAY** | S2 | Parallel state — overlays S-08/S-11/S-12/S-13. Supabase unreachable → responses queued in memory. Visual indicator shown. PostHog: offline_queue_activated. Reconnect within 60s → flush → PostHog: offline_queue_flushed → normal state resumes. |
| ## **S-21** | Downtime Screen | ## **ERROR** | S4 | Supabase unreachable >60s after offline queue activated. Full-screen display. PostHog: supabase_downtime_shown. Retry button → Supabase connectivity check. If restored → resume from last question. Queue preserved throughout. |
| ## **S-17** | Session Complete | ## **COMPLETION** | S3 | updateSession(is_complete=true, completed_at). localStorage token cleared. PostHog: session_completed. Transition immediately to S-18. |
| ## **S-18** | Completion + Results | ## **COMPLETION** | S3 | PostHog: results_viewed, aggregate_comparison_viewed (if 3+ sessions). Transition automatically to S-19 after brief display. |
| ## **S-19** | Post-Completion Enrichment | ## **COMPLETION** | S3 | Optional. PostHog: credentials_enrichment_completed on Skip or last field. updateEnrichment() Supabase write. Browser close here → session already complete, no data loss. Skip or navigate away → S-99. |
| ## **S-22** | Dashboard Overlay | ## **MANAGEMENT** | S4 | Parallel state — overlays any respondent state. SHIFT+CTRL+A triggers entry. PostHog: dashboard_opened. Panel click → dashboard_panel_viewed. Export → dashboard_exported_csv / pdf. Escape or click-outside → returns to underlying state. |
| ## **S-23** | Config Error Screen | ## **ERROR** | S2 | Entered if configValidator throws (Phase 1b+). Sentry captures error before React renders. Shown before any respondent content. No PostHog event (PostHog not yet initialised at this point). Page refresh is the only exit. |
| ## **S-24** | Sentry ErrorBoundary Fallback | ## **ERROR** | S2 | Catches unhandled React rendering errors. Sentry captures automatically. 'Refresh' button visible. localStorage token preserved → disambiguation shown after refresh. PostHog session_paused may not fire if error occurs in rendering. |
| ## **S-25** | RLS Rejection | ## **ERROR** | S2 | Entered if Supabase returns HTTP 403/400. Sentry.captureException with type: RLS_REJECTION. Not queued for retry. Lead Researcher email alert. Application may show generic error message. Session state preserved in localStorage. |
| ## **S-99** | Session End | ## **TERMINAL** | S2 | Respondent closes browser or navigates away. beforeunload fires session_paused PostHog event (if session incomplete). localStorage token remains if session incomplete. Session complete → token already cleared at S-17. |




# 8. S1-1.10 Review Checklist


**### **Check 1 — Downtime state S-21 has clear ****retry**** path****

Open Section 3. State S-21 shows: Retry button → Supabase connectivity check → [restored] → flush queue → resume from last question → S-08. [still unreachable] → remain in S-21. Offline queue is preserved throughout. The retry path is a conditional loop — not a one-shot attempt.


**## **Check 2 — Disambiguation S-04 has both transitions****

Open Section 4. Path A (Resume): disambiguation_resumed fires, last question position restored from responses table, application resumes at S-07 or S-08. Path B (New session): disambiguation_new_session fires, token cleared, proceeds to S-05 (Welcome). Third path (silent): stale token → no Supabase match → token cleared → S-05 with no disambiguation shown.




# 9. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF APPLICATION STATE DIAGRAM v1.0 —**

*GuestIQ**  ·**  Application State Diagram **v1.0  ·**  S1-1.**9  ·**  S1-**05  ·**  Sprint 1 **Artifact  ·**  Confidential*

