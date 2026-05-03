# information_architecture_diagram_v10

*Document Type: DOCX*

## Table of Contents

  - [**INFORMATION ARCHITECTURE DIAGRAM**](#information-architecture-diagram)
    - [**GuestIQ**** — Hotel Guest Expectations Research Application**](#guestiq--hotel-guest-expectations-research-application)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Screens Documented**](#screens-documented)
  - [**PostHog**** Coverage**](#posthog-coverage)
  - [**Review Instructions**](#review-instructions)
  - [**Document Location**](#document-location)
- [1. Screen Type Legend](#1-screen-type-legend)
  - [**Entry Screens**](#entry-screens)
  - [**Question Screens**](#question-screens)
  - [**Transition Screens**](#transition-screens)
  - [**Completion Screens**](#completion-screens)
  - [**Management**](#management)
  - [**Error / Edge**](#error--edge)
- [2. Primary Respondent Flow](#2-primary-respondent-flow)
  - [2.1 System Entry and Session Routing](#21-system-entry-and-session-routing)
  - [**YES  →****  SCR-02 Disambiguation Screen**](#yes----scr-02-disambiguation-screen)
  - [**NO  →****  SCR-01 Welcome + Tier Selection**](#no----scr-01-welcome--tier-selection)
    - [**  ****↓  Resume****  ****→  restore**** last question ****position  ↓****  **](#----resume----restore-last-question-position----)
    - [**  ****↓  Tier**** ****selected  →****  session created in ****Supabase****  ↓****  **](#----tier-selected----session-created-in-supabase----)
  - [2.2 Q0 — Tense Routing Gate](#22-q0--tense-routing-gate)
    - [**  ****↓  ****tense****_frame**** stored in session state + ****Supabase****  ↓****  **](#----tense_frame-stored-in-session-state--supabase----)
  - [2.3 Episodes 1–4 — Modules 1, 3, 2, 4](#23-episodes-14--modules-1-3-2-4)
  - [**  ****↓  Episode**** 1 ****complete  ↓****  **](#----episode-1-complete----)
  - [**  ****↓  Continue**** to Episode ****2  ↓****  **](#----continue-to-episode-2----)
  - [**  ****↓  Episode**** 2 ****complete  ↓****  **](#----episode-2-complete----)
  - [**  ****↓  Continue**** to Episode ****3  ↓****  **](#----continue-to-episode-3----)
  - [**  ****↓  Episode**** 3 ****complete  ↓****  **](#----episode-3-complete----)
  - [**  ****↓  Continue**** to Episode ****4  ↓****  **](#----continue-to-episode-4----)
  - [**  ****↓  Episode**** 4 ****complete  ↓****  **](#----episode-4-complete----)
    - [**  ****↓  Continue**** to Episode 5 — Module ****5  ↓****  **](#----continue-to-episode-5--module-5----)
  - [2.4 Episode 5 — Module 5 (12 Intent-Specific Branches)](#24-episode-5--module-5-12-intent-specific-branches)
  - [**Code**](#code)
  - [**Sub-section**](#sub-section)
  - [**Screen**](#screen)
  - [**Tier Scope**](#tier-scope)
  - [**Questions**](#questions)
  - [**Badge**](#badge)
  - [**  ****↓  Episode**** 5 ****complete  ↓****  **](#----episode-5-complete----)
  - [**  ****↓  Continue**** to Episode ****6  ↓****  **](#----continue-to-episode-6----)
  - [2.5 Episodes 6–7 — Modules 6 and 7](#25-episodes-67--modules-6-and-7)
  - [**  ****↓  Episode**** 6 ****complete  ↓****  **](#----episode-6-complete----)
  - [**  ****↓  Continue**** to Episode ****7  ↓****  **](#----continue-to-episode-7----)
    - [**  ****↓  session**** ****is_complete**** = ****true  →****  token cleared from ****localStorage****  ↓****  **](#----session-is_complete--true----token-cleared-from-localstorage----)
  - [2.6 Completion and Enrichment](#26-completion-and-enrichment)
    - [**  ****↓  Optional**** — enrichment screen appears ****automatically  ↓****  **](#----optional--enrichment-screen-appears-automatically----)
- [3. Session Edge Cases and Alternative Paths](#3-session-edge-cases-and-alternative-paths)
  - [3.1 Management Dashboard — Available on All Screens](#31-management-dashboard--available-on-all-screens)
  - [3.2 Offline Queue and Supabase Connectivity](#32-offline-queue-and-supabase-connectivity)
  - [**Write fails (network)**](#write-fails-network)
  - [**Reconnects within 60s**](#reconnects-within-60s)
  - [**Still offline after 60s**](#still-offline-after-60s)
  - [3.3 Session Pause and Resume](#33-session-pause-and-resume)
  - [**Browser close (****beforeunload**** event fired)**](#browser-close-beforeunload-event-fired)
  - [**Respondent returns to URL (same browser)**](#respondent-returns-to-url-same-browser)
  - [3.4 Configuration Error and React ErrorBoundary](#34-configuration-error-and-react-errorboundary)
  - [3.5 RLS Rejection](#35-rls-rejection)
  - [**RLS Rejection (HTTP 403/400)**](#rls-rejection-http-403400)
  - [**Lead Researcher email alert within 60 seconds**](#lead-researcher-email-alert-within-60-seconds)
- [4. Complete Screen Inventory](#4-complete-screen-inventory)
  - [**#**](#)
  - [**Screen Name**](#screen-name)
  - [**Type**](#type)
  - [**Sprint**](#sprint)
  - [**ID**](#id)
  - [**Key ****PostHog**** Events / Notes**](#key-posthog-events--notes)
  - [**Entry**](#entry)
  - [**SCR-01**](#scr-01)
  - [**Entry**](#entry)
  - [**SCR-02**](#scr-02)
  - [**Question**](#question)
  - [**SCR-03**](#scr-03)
  - [**Question**](#question)
  - [**SCR-04**](#scr-04)
  - [**Question**](#question)
  - [**SCR-05**](#scr-05)
  - [**Question**](#question)
  - [**SCR-06**](#scr-06)
  - [**Question**](#question)
  - [**SCR-07**](#scr-07)
  - [**Transition**](#transition)
  - [**SCR-08**](#scr-08)
  - [**Transition**](#transition)
  - [**SCR-09**](#scr-09)
  - [**Transition**](#transition)
  - [**SCR-10**](#scr-10)
  - [**Transition**](#transition)
  - [**SCR-11**](#scr-11)
  - [**Question**](#question)
  - [**SCR-12**](#scr-12)
  - [**Question**](#question)
  - [**SCR-13**](#scr-13)
  - [**Question**](#question)
  - [**SCR-14**](#scr-14)
  - [**Question**](#question)
  - [**SCR-15**](#scr-15)
  - [**Question**](#question)
  - [**SCR-16**](#scr-16)
  - [**Question**](#question)
  - [**SCR-17**](#scr-17)
  - [**Question**](#question)
  - [**SCR-18**](#scr-18)
  - [**Question**](#question)
  - [**SCR-19**](#scr-19)
  - [**Question**](#question)
  - [**SCR-20**](#scr-20)
  - [**Completion**](#completion)
  - [**SCR-21**](#scr-21)
  - [**Completion**](#completion)
  - [**SCR-22**](#scr-22)
  - [**Management**](#management)
  - [**SCR-23**](#scr-23)
  - [**Error/Edge**](#erroredge)
  - [**SCR-24**](#scr-24)
  - [**Error/Edge**](#erroredge)
  - [**SCR-25**](#scr-25)
  - [**Error/Edge**](#erroredge)
  - [**SCR-26**](#scr-26)
- [5. PostHog Event to Screen Mapping](#5-posthog-event-to-screen-mapping)
  - [**#**](#)
  - [**Event Name**](#event-name)
  - [**Trigger Screen**](#trigger-screen)
  - [**Verification Sprint**](#verification-sprint)
- [6. Version Log](#6-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF INFORMATION ARCHITECTURE DIAGRAM v1.0 —**](#-end-of-information-architecture-diagram-v10-)

## **INFORMATION ARCHITECTURE DIAGRAM**

### **GuestIQ**** — Hotel Guest Expectations Research Application**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Review by Lead Researcher (1 hour — trace every respondent path)


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Screens Documented****

26 screens across 6 types: Entry · Question · Transition · Completion · Management · Error/Edge


**## **PostHog**** Coverage****

All 27 canonical events mapped to their trigger screen · Supplementary event supabase_downtime_shown included


**## **Review Instructions****

(1) Trace every path a respondent can take using the Primary Flow in Section 2. (2) Verify downtime contingency screen path is shown. (3) Verify PostHog event firing points are indicated.


**## **Document Location****

01-Sprint-1 / AI-Outputs / Information-Architecture-Diagram-v1.0.docx




# 1. Screen Type Legend

Six screen types are used throughout this document. Color coding is consistent across all sections.


| ## **Entry Screens**  SCR-01, SCR-02 | ## **Question Screens**  SCR-03 to SCR-20 | ## **Transition Screens**  SCR-08 to SCR-11 | ## **Completion Screens**  SCR-21, SCR-22 | ## **Management**  SCR-23 | ## **Error / Edge**  SCR-24 to SCR-26 |
| --- | --- | --- | --- | --- | --- |




INFO:  PostHog events shown in grey rows beneath each screen header in Sections 2 and 3. Sentry capture points are noted in the screen description. The management dashboard overlay (SCR-23) is accessible from ANY screen — not shown on every flow arrow for readability.


# 2. Primary Respondent Flow

The primary flow covers the journey from first URL load through session completion and the optional enrichment screen. This is the path taken by the vast majority of respondents. Edge cases (disambiguation, offline, downtime) are shown in Section 3.


## 2.1 System Entry and Session Routing

On every application load, before any screen renders, the system checks for an existing session token in browser localStorage.


| **[SCR-00****]  ****Application**** Load — System**   Entry  ·  S2 |
| --- |
| **PostHog****:  **app_loaded |
| URL: guestiq.github.io?property=PROP001 loaded. Sentry.init() runs. Config validator runs (Phase 1b+). PostHog.init() runs. app_loaded fires. Property_id read from URL. localStorage checked for guestiq_session_token. |




*Token found & incomplete session in **Supabase**?*


| **[SCR-02****]  ****Disambiguation**** Screen**   Entry  ·  S2 |
| --- |
| **PostHog****:  **disambiguation_shown  ·  disambiguation_resumed  ·  disambiguation_new_session |
| Two options: 'Resume my session' (question_number_resumed_from restored) or 'Start fresh' (token cleared, new session). If token exists but Supabase has no matching incomplete session: token cleared silently, proceed to SCR-01. |



### **  ****↓  Resume****  ****→  restore**** last question ****position  ↓****  **

'Start fresh'  →  clear token  →  SCR-01

| **[SCR-01****]  ****Welcome**** + Tier Selection**   Entry  ·  S2 |
| --- |
| **PostHog****:  **welcome_hook_viewed  ·  tier_selected |
| Single unified screen (Option B). Hook text zone + tier cards zone. Amateur / Professional / Expert cards. 'Most selected' badge on Professional. Privacy notice + voluntary participation line. 'Not now' link exits — no session created, no localStorage token written. |



### **  ****↓  Tier**** ****selected  →****  session created in ****Supabase****  ↓****  **


## 2.2 Q0 — Tense Routing Gate

| **[SCR-03****]  ****Q****0 — Tense Routing Gate**   Question  ·  S2 |
| --- |
| **PostHog****:  **routing_gate_answered |
| First instrument question after tier selection. Rendered by standard Question component identical to Q1–Q79. Episode map and progress bar visible. Options: A (retrospective), B (anticipatory), C (both → retrospective), D (free text → retrospective default). Sets tense_frame for entire session. |



### **  ****↓  ****tense****_frame**** stored in session state + ****Supabase****  ↓****  **


## 2.3 Episodes 1–4 — Modules 1, 3, 2, 4

INFO:  Episodes are not in module order. Episode 1 = Module 1 (intent), Episode 2 = Module 3 (physical environment), Episode 3 = Module 2 (pre-arrival), Episode 4 = Module 4 (service). This narrative arc is intentional.


| **[SCR-04****]  ****Episode**** 1 — Module 1 Questions (Q1–Q9)**   Question  ·  S2 |
| --- |
| **PostHog****:  **episode_started (ep.1)  ·  question_answered × up to 9  ·  none_flag_selected |
| Q1 is intent capture — answer stored as intent_category in Supabase sessions table. intent_category drives all Module 5 routing. Amateur: Q1, Q3, Q5, Q7 (4 questions). Professional/Expert: Q1–Q9 (9 questions). |



## **  ****↓  Episode**** 1 ****complete  ↓****  **

| **[SCR-08****]  ****Curiosity**** Hook — Episode 1**   Transition  ·  S3 |
| --- |
| **PostHog****:  **episode_completed (ep.1)  ·  curiosity_hook_viewed (ep.1)  ·  badge_awarded (First Step + Intent Locked) |
| Hook text sourced from episodes.json. Two badges awarded: First Step (awarded at Q1 answer, replayed here) and Intent Locked (Episode 1 complete). Continue button navigates to Episode 2. |




*Amateur tier **only  ↓*

| **[SCR-09****]  ****Tier**** Upgrade Prompt — Amateur → Professional**   Transition  ·  S3 |
| --- |
| **PostHog****:  **tier_upgrade_prompted  ·  tier_upgrade_accepted / tier_upgrade_declined |
| Shown to Amateur tier respondents only after Episode 1. Accepts: session tier updated to professional in Supabase, continues with Professional question set. Declines: continues as Amateur. |



## **  ****↓  Continue**** to Episode ****2  ↓****  **


| **[SCR-05****]  ****Episode**** 2 — Module 3 Questions (Q19–Q30)**   Question  ·  S2 |
| --- |
| **PostHog****:  **episode_started (ep.2)  ·  question_answered × up to 12  ·  none_flag_selected |
| Physical environment expectations. Amateur: subset. Professional/Expert: Q19–Q30. |



## **  ****↓  Episode**** 2 ****complete  ↓****  **

| **[SCR-10****a]  ****Curiosity**** Hook — Episode 2**   Transition  ·  S3 |
| --- |
| **PostHog****:  **episode_completed (ep.2)  ·  curiosity_hook_viewed (ep.2)  ·  badge_awarded (Environment Critic) |
| Environment Critic badge awarded. Hook text from episodes.json. |



## **  ****↓  Continue**** to Episode ****3  ↓****  **


| **[SCR-06****]  ****Episode**** 3 — Module 2 Questions (Q10–Q18)**   Question  ·  S2 |
| --- |
| **PostHog****:  **episode_started (ep.3)  ·  question_answered × up to 9  ·  none_flag_selected |
| Pre-arrival expectations. Amateur: subset. Professional/Expert: Q10–Q18. |



## **  ****↓  Episode**** 3 ****complete  ↓****  **

| **[SCR-10****b]  ****Curiosity**** Hook — Episode 3**   Transition  ·  S3 |
| --- |
| **PostHog****:  **episode_completed (ep.3)  ·  curiosity_hook_viewed (ep.3)  ·  badge_awarded (Guest Arrival Expert) |
| Guest Arrival Expert badge awarded. |



## **  ****↓  Continue**** to Episode ****4  ↓****  **


| **[SCR-07****]  ****Episode**** 4 — Module 4 Questions (Q31–Q38)**   Question  ·  S2 |
| --- |
| **PostHog****:  **episode_started (ep.4)  ·  question_answered × up to 8  ·  none_flag_selected |
| Service and human interaction expectations. Amateur: subset. Professional/Expert: Q31–Q38. |



## **  ****↓  Episode**** 4 ****complete  ↓****  **

| **[SCR-10c****]  ****Curiosity**** Hook — Episode 4**   Transition  ·  S3 |
| --- |
| **PostHog****:  **episode_completed (ep.4)  ·  curiosity_hook_viewed (ep.4)  ·  badge_awarded (Service Specialist) |
| Service Specialist badge awarded. |




*Professional tier **only  ↓*

| **[SCR-11****]  ****Tier**** Upgrade Prompt — Professional → Expert**   Transition  ·  S3 |
| --- |
| **PostHog****:  **tier_upgrade_prompted  ·  tier_upgrade_accepted / tier_upgrade_declined |
| Shown to Professional tier respondents only after Episode 4. Accepts: session upgraded to Expert. Declines: continues as Professional. |



### **  ****↓  Continue**** to Episode 5 — Module ****5  ↓****  **


## 2.4 Episode 5 — Module 5 (12 Intent-Specific Branches)

Module 5 routing is determined by the intent_category stored at Q1. Each of the 12 intent categories routes to a specific sub-section. Amateur respondents complete only their primary sub-section. Professional and Expert respondents may complete a second sub-section if Q2 (secondary purpose) triggers it.


| ## **Code** | ## **Sub-section** | ## **Screen** | ## **Tier Scope** | ## **Questions** | ## **Badge** |
| --- | --- | --- | --- | --- | --- |
| WORK-TRANS WORK-EVENT WORK-EXT | 5A — Work | SCR-12 | All tiers | Q39–Q43 | Purpose Expert |
| LEIS-PLAN LEIS-SOC LEIS-EXP | 5B — Leisure | SCR-13 | All tiers | Q44–Q46 | Purpose Expert |
| DISP-HOME DISP-TRANS | 5C — Displacement | SCR-14 | All tiers | Q47–Q48 | Purpose Expert |
| MED | 5D — Medical | SCR-15 | All tiers | Q49–Q50 | Purpose Expert |
| FAM | 5E — Family | SCR-16 | All tiers | Q51–Q52 | Purpose Expert |
| TRANSIT | 5F — Transit | SCR-17 | All tiers | Q53–Q54 | Purpose Expert |
| LOC-ESC | 5G — Local Escape | SCR-18 | All tiers | Q55–Q56 | Purpose Expert |




| **[SCR-12 to SCR-18****]  ****Module**** 5 Sub-sections (7 ****branches)**   Question  ·  S3 |
| --- |
| **PostHog****:  **episode_started (ep.5)  ·  question_answered  ·  purpose_expert (if Q2 secondary)  ·  none_flag_selected |
| Each branch is a separate sub-section. Secondary purpose (Q2): Expert/Professional may complete a second sub-section after their primary. purpose_expert event fires when this occurs. After Module 5 complete: curiosity hook shown. |



## **  ****↓  Episode**** 5 ****complete  ↓****  **

| **[SCR-10d****]  ****Curiosity**** Hook — Episode 5**   Transition  ·  S3 |
| --- |
| **PostHog****:  **episode_completed (ep.5)  ·  curiosity_hook_viewed (ep.5)  ·  badge_awarded (Purpose Expert) |
| Purpose Expert badge awarded. |



## **  ****↓  Continue**** to Episode ****6  ↓****  **


## 2.5 Episodes 6–7 — Modules 6 and 7

| **[SCR-19****]  ****Episode**** 6 — Module 6 Questions (Q57–Q66)**   Question  ·  S3 |
| --- |
| **PostHog****:  **episode_started (ep.6)  ·  question_answered × up to 10  ·  none_flag_selected |
| Value and pricing expectations. |



## **  ****↓  Episode**** 6 ****complete  ↓****  **

| **[SCR-10****e]  ****Curiosity**** Hook — Episode 6**   Transition  ·  S3 |
| --- |
| **PostHog****:  **episode_completed (ep.6)  ·  curiosity_hook_viewed (ep.6)  ·  badge_awarded (Value Analyst) |
| Value Analyst badge awarded. |



## **  ****↓  Continue**** to Episode ****7  ↓****  **


| **[SCR-20****]  ****Episode**** 7 — Module 7 Questions (Q67–Q79)**   Question  ·  S3 |
| --- |
| **PostHog****:  **episode_started (ep.7)  ·  question_answered × up to 13  ·  episode_completed (ep.7)  ·  session_completed |
| Post-stay relationship expectations. Episode 7 has NO curiosity hook — the session completes directly into the completion screen. session_completed fires with tier, total_time_seconds, intent_category, tense_frame. |



### **  ****↓  session**** ****is_complete**** = ****true  →****  token cleared from ****localStorage****  ↓****  **


## 2.6 Completion and Enrichment

| **[SCR-21****]  ****Completion**** + Results Screen**   Completion  ·  S3 |
| --- |
| **PostHog****:  **results_viewed  ·  aggregate_comparison_viewed (if 3+ sessions for property_id)  ·  badge_awarded (Full Picture + Expert Complete for Expert tier) |
| Congratulatory heading, all earned badges in grid, personal intent category summary, top expectation priorities. Aggregate comparison chart shown if 3+ complete sessions exist. Expert tier: both Full Picture and Expert Complete badges awarded 800ms apart. |



### **  ****↓  Optional**** — enrichment screen appears ****automatically  ↓****  **

| **[SCR-22****]  ****Post****-Completion Enrichment Screen**   Completion  ·  S3 |
| --- |
| **PostHog****:  **credentials_enrichment_completed |
| Optional for ALL tiers. 3 fields: years experience, interaction volume, shift pattern. All nullable. Skip button always visible. Session is already complete — enrichment is bonus data only. credentials_enrichment_completed fires on Skip or on last field navigation. |




*Session ends — respondent closes browser or navigates away*


# 3. Session Edge Cases and Alternative Paths


## 3.1 Management Dashboard — Available on All Screens

| **[SCR-23****]  ****Management**** Dashboard Overlay (SHIFT+CTRL+****A)**   Management  ·  S4 |
| --- |
| **PostHog****:  **dashboard_opened  ·  dashboard_panel_viewed (panel_name)  ·  dashboard_exported_csv  ·  dashboard_exported_pdf |
| Accessible from ANY screen during a session (except disambiguation). Three-key shortcut. Overlay slides in from right. 9 tabbed panels. Escape or click-outside closes. Does not interrupt active session. Dark navy canvas (#0B1120) distinct from respondent canvas (#0D0D12). |




## 3.2 Offline Queue and Supabase Connectivity

If a Supabase write fails during an active session, the response is queued in memory. The queue is transparent to the respondent — they continue answering questions normally.


| ## **Write fails (network)**  Response queued in memory  PostHog: offline_queue_activated | ## **Reconnects within 60s**  Queue flushed to Supabase  PostHog: offline_queue_flushed | ## **Still offline after 60s**  → SCR-24 Downtime Screen  PostHog: supabase_downtime_shown |
| --- | --- | --- |




| **[SCR-24****]  ****Downtime**** Contingency Screen**   Error/Edge  ·  S4 |
| --- |
| **PostHog****:  **supabase_downtime_shown |
| Full-screen message: 'GuestIQ is temporarily unavailable. Your answers are saved. Please try again in 30 minutes.' Retry button triggers connectivity check. If Supabase back: resumes from last saved state. Queue is preserved in memory throughout. |




## 3.3 Session Pause and Resume

When a respondent closes the browser mid-session, the session is not lost. The session token remains in localStorage and the session remains as incomplete in Supabase.



## 3.4 Configuration Error and React ErrorBoundary

| **[SCR-25****]  ****Configuration**** Error Screen**   Error/Edge  ·  S2 (Phase 1b) |
| --- |
| **PostHog****:  **(none — PostHog not yet initialised when this fires) |
| Shown if configValidator throws during startup (Phase 1b+). Sentry captures the error with filename and error detail before React renders. Message: 'Configuration error — [filename].json is malformed. Please check the file and reload.' Recovery: git revert HEAD, redeploy. |




| **[SCR-26****]  ****Sentry**** ****ErrorBoundary**** Fallback**   Error/Edge  ·  S2 |
| --- |
| **PostHog****:  **(Sentry captures automatically — PostHog session_paused may not fire) |
| Catches any unhandled React rendering error. Message: 'Something went wrong. Please refresh the page.' Refresh button visible. localStorage session token preserved — disambiguation screen will appear after refresh. Sentry email alert sent within 60 seconds. |




## 3.5 RLS Rejection

If a Supabase write is rejected with HTTP 403/400 (Row Level Security misconfiguration), this is handled separately from a network failure. The response is NOT queued for retry — it is a configuration error that retrying will not fix.



# 4. Complete Screen Inventory

All 26 screens documented with type, introduction sprint, screen ID, and key PostHog events. This table is the reference for Sprint 4 Playwright visual regression baseline capture (Section 7 of the Test Plan specifies which 8 screens to capture).


| ## **#** | ## **Screen Name** | ## **Type** | ## **Sprint** | ## **ID** | ## **Key ****PostHog**** Events / Notes** |
| --- | --- | --- | --- | --- | --- |
| 1 | Welcome + Tier Selection | ## **Entry** | S2 | ## **SCR-01** | app_loaded · welcome_hook_viewed · tier_selected. Single unified screen. Hook text + 3 tier cards. Not-now link. |
| 2 | Disambiguation Screen | ## **Entry** | S2 | ## **SCR-02** | disambiguation_shown · disambiguation_resumed · disambiguation_new_session. Shown when localStorage token found. |
| 3 | Q0 — Tense Routing Gate | ## **Question** | S2 | ## **SCR-03** | routing_gate_answered. Rendered by standard Question component. Episode map + progress bar visible. |
| 4 | Q1–Q9 Module 1 Questions | ## **Question** | S2 | ## **SCR-04** | episode_started (Ep.1) · question_answered × 9 · none_flag_selected. Intent captured at Q1 → intent_category. |
| 5 | Q10–Q18 Module 2 Questions | ## **Question** | S2 | ## **SCR-05** | question_answered. Pre-arrival expectations. |
| 6 | Q19–Q30 Module 3 Questions | ## **Question** | S2 | ## **SCR-06** | question_answered. Physical environment expectations. |
| 7 | Q31–Q38 Module 4 Questions | ## **Question** | S2 | ## **SCR-07** | question_answered · episode_started (Ep.4). Service and interaction expectations. |
| 8 | Curiosity Hook — Episode 1 | ## **Transition** | S3 | ## **SCR-08** | curiosity_hook_viewed (ep.1) · badge_awarded (First Step, Intent Locked). After Module 1. |
| 9 | Tier Upgrade Prompt — Amateur→Pro | ## **Transition** | S3 | ## **SCR-09** | tier_upgrade_prompted · tier_upgrade_accepted/declined. Shown after Ep.1 for Amateur tier only. |
| 10 | Curiosity Hook — Episodes 2–6 | ## **Transition** | S3 | ## **SCR-10** | curiosity_hook_viewed · badge_awarded. One screen per episode transition (6 total). |
| 11 | Tier Upgrade Prompt — Pro→Expert | ## **Transition** | S3 | ## **SCR-11** | tier_upgrade_prompted · tier_upgrade_accepted/declined. Shown after Ep.4 for Professional tier only. |
| 12 | Module 5A — Work and Business | ## **Question** | S3 | ## **SCR-12** | question_answered × (4–8 depending on tier) · purpose_expert (if secondary). Routes from intent WORK-TRANS, WORK-EVENT, WORK-EXT. |
| 13 | Module 5B — Leisure Stays | ## **Question** | S3 | ## **SCR-13** | question_answered. Routes from LEIS-PLAN, LEIS-SOC, LEIS-EXP. |
| 14 | Module 5C — Displacement | ## **Question** | S3 | ## **SCR-14** | question_answered. Routes from DISP-HOME, DISP-TRANS. |
| 15 | Module 5D — Medical | ## **Question** | S3 | ## **SCR-15** | question_answered. Routes from MED. |
| 16 | Module 5E — Family | ## **Question** | S3 | ## **SCR-16** | question_answered. Routes from FAM. |
| 17 | Module 5F — Transit | ## **Question** | S3 | ## **SCR-17** | question_answered. Routes from TRANSIT. |
| 18 | Module 5G — Local Escape | ## **Question** | S3 | ## **SCR-18** | question_answered. Routes from LOC-ESC. |
| 19 | Q57–Q66 Module 6 Questions | ## **Question** | S3 | ## **SCR-19** | question_answered · episode_started (Ep.6). Value and pricing. |
| 20 | Q67–Q79 Module 7 Questions | ## **Question** | S3 | ## **SCR-20** | question_answered · episode_completed (Ep.7) · session_completed. Post-stay expectations. |
| 21 | Completion + Results Screen | ## **Completion** | S3 | ## **SCR-21** | session_completed · results_viewed · aggregate_comparison_viewed. Personal results + aggregate chart (3+ sessions). |
| 22 | Post-Completion Enrichment Screen | ## **Completion** | S3 | ## **SCR-22** | credentials_enrichment_completed. Optional. All tiers. Skip button always visible. Not session-critical. |
| 23 | Management Dashboard Overlay | ## **Management** | S4 | ## **SCR-23** | dashboard_opened · dashboard_panel_viewed × 9 · dashboard_exported_csv · dashboard_exported_pdf. SHIFT+CTRL+A. All screens. |
| 24 | Downtime Contingency Screen | ## **Error/Edge** | S4 | ## **SCR-24** | supabase_downtime_shown. Shown if Supabase unreachable >60s. Retry button. Offline queue preserves data. |
| 25 | Configuration Error Screen | ## **Error/Edge** | S2 | ## **SCR-25** | Sentry capture only (no PostHog — PostHog not yet rendered). Shown if configValidator throws. Phase 1b+. |
| 26 | Sentry ErrorBoundary Fallback | ## **Error/Edge** | S2 | ## **SCR-26** | Sentry captures error automatically. 'Something went wrong — refresh' message. Refresh preserves localStorage token. |




# 5. PostHog Event to Screen Mapping

All 27 canonical PostHog events mapped to their trigger screen. This confirms complete coverage and helps Sprint 4 verification (S4-07).


| ## **#** | ## **Event Name** | ## **Trigger Screen** | ## **Verification Sprint** |
| --- | --- | --- | --- |
| 1 | app_loaded | SCR-00 (load) | S2 — appears in PostHog within 60s of first load |
| 2 | welcome_hook_viewed | SCR-01 | S2 — fires on welcome screen render |
| 3 | tier_selected | SCR-01 | S2 — fires on 'Start as [Tier]' click |
| 4 | credentials_enrichment_completed | SCR-22 | S3 — renamed from v1.0 credentials_completed |
| 5 | routing_gate_answered | SCR-03 | S2 — fires on Q0 answer with tense_frame property |
| 6 | episode_started | SCR-04,05,06,07,12-20 | S2 — fires on first question of each episode |
| 7 | question_answered | All question screens | S2 — fires on every answer including Q0 and none option |
| 8 | none_flag_selected | All question screens | S2 — fires in addition to question_answered on none selection |
| 9 | episode_completed | SCR-08,10a-e | S2 — fires on last question of each episode |
| 10 | curiosity_hook_viewed | SCR-08,10a-10e | S3 — fires on curiosity hook screen render |
| 11 | tier_upgrade_prompted | SCR-09, SCR-11 | S3 — fires on upgrade prompt render |
| 12 | tier_upgrade_accepted | SCR-09, SCR-11 | S3 — fires on accept click |
| 13 | tier_upgrade_declined | SCR-09, SCR-11 | S3 — fires on decline click |
| 14 | purpose_expert | SCR-12 to SCR-18 | S3 — fires only when Q2 triggers second Module 5 sub-section |
| 15 | session_paused | Any question screen | S2 — fires on beforeunload with incomplete session |
| 16 | disambiguation_shown | SCR-02 | S2 — fires when disambiguation screen renders |
| 17 | disambiguation_resumed | SCR-02 | S2 — fires on 'Resume my session' click |
| 18 | disambiguation_new_session | SCR-02 | S2 — fires on 'Start fresh' click |
| 19 | offline_queue_activated | Any question screen | S2 — fires once when queue first activates |
| 20 | offline_queue_flushed | Any question screen | S2 — fires when all queued responses sent |
| 21 | session_completed | SCR-20 (last question) | S3 — fires on session complete with full properties |
| 22 | results_viewed | SCR-21 | S3 — fires on results screen render |
| 23 | aggregate_comparison_viewed | SCR-21 | S3 — fires when aggregate chart renders (3+ sessions) |
| 24 | dashboard_opened | SCR-23 | S4 — fires on SHIFT+CTRL+A trigger |
| 25 | dashboard_panel_viewed | SCR-23 | S4 — fires on each panel tab click |
| 26 | dashboard_exported_csv | SCR-23 | S4 — fires on Export CSV click |
| 27 | dashboard_exported_pdf | SCR-23 | S4 — fires on Export PDF click |




# 6. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF INFORMATION ARCHITECTURE DIAGRAM v1.0 —**

*GuestIQ**  ·**  Information Architecture Diagram **v1.0  ·**  S1-1.**3  ·**  S1-**02  ·**  Sprint 1 **Artifact  ·**  Confidential*

