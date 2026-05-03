**SOFTWARE REQUIREMENTS SPECIFICATION**

**FUNCTIONAL REQUIREMENTS**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-2.1 — Sprint 0 Artifact |
| **Document Version** | 2.0 — Option B UX Redesign: single welcome screen, expert enrichment post-completion, QR1 as Q0 |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Total Requirements** | 95 requirements across 12 sections (FR-001 to FR-096, FR-097 to FR-098) |
| **Priority Split** | MUST: 90 · SHOULD: 5 · COULD: 0 |
| **Changes from v1.0** | FR-005, FR-006, FR-013 removed. FR-097, FR-098 added. FR-004, FR-007, FR-008, FR-012, FR-014, FR-015 rewritten. Sections 2.2/2.3 merged. Section 2.4 relocated post-completion. Section 3 reframed as Q0. Expert credentials: pre-gate → optional post-completion enrichment. |
| **Related Documents** | Project Charter v2.1 (S0-1.1v) · Use Case Specifications v1.0 (S0-2.5) · Observability Spec (S0-3.3) · Content Management Strategy (S0-3.5) |
| **Document Location** | 00-Sprint-0 / AI-Outputs / SRS-Functional-Requirements-v2.0.docx |

ℹ This SRS is the developer contract for building GuestIQ. Every requirement translates directly into code written across Sprints 2–4. MUST requirements are non-negotiable. Version 2.0 implements the Option B UX redesign agreed during Sprint 0 review — reducing pre-questionnaire clicks from 3–7 to 1, eliminating mandatory waits, and moving expert credentials to an optional post-completion enrichment screen.

**🤖 AI DEVELOPER: Read every requirement in this document before writing any Sprint 2 code. This document supersedes v1.0 and any assumption made during planning. Where a requirement appears to conflict with another document, raise the conflict immediately — do not resolve it by assumption.**

# VERSION 2.0 — CHANGE SUMMARY

**★ CHANGED v2.0 (Option B): Complete redesign of the pre-questionnaire entry flow. Option B: single welcome screen, expert credentials post-completion (optional), QR1 reframed as Q0.**

The following changes were made from v1.0 based on UX friction analysis. The core finding: the original design required 3–7 interactions and up to 60 seconds before the first instrument question. Option B reduces this to 1 click (tier selection) with zero mandatory waits.

| **FR** | **Change** | **Description** |
| --- | --- | --- |
| **FR-004** | **REWRITTEN** | Welcome screen redesign: hook text + tier cards on one screen simultaneously. No 3-second wait. No Continue button. Hook is read naturally while choosing a tier. |
| **FR-005** | **REMOVED** | Beat 2 — Continue button after 3-second wait. Eliminated. No separate beat. No gate between hook and tier selection. |
| **FR-006** | **REMOVED** | Beat 3 — transition to tier selection screen. Eliminated. Welcome+tier is now one screen. |
| **FR-007** | **REWRITTEN** | Tier cards now appear below the hook text on the same welcome screen. Tier selection IS the start action — the only click needed before Q0. |
| **FR-008** | **UPDATED** | Reassurance line now positioned on the merged welcome+tier screen. |
| **FR-012** | **REWRITTEN — MUST→SHOULD** | Expert credentials moved from pre-questionnaire gate to optional post-completion enrichment screen. Now 3 single-click fields (no slider, no submit). Skippable at any time. |
| **FR-013** | **REMOVED** | 2-second affirming message screen after credentials. Eliminated. The completion celebration IS the affirmation. |
| **FR-014** | **REWRITTEN — MUST→SHOULD** | credentials\_completed event renamed credentials\_enrichment\_completed. Fires on enrichment screen dismiss (answered or skipped), not on form submit. |
| **FR-015** | **REWRITTEN** | Routing gate QR1 reframed as Q0 — the first instrument question. Styled identically to all other questions. Not a separate screen; part of the questionnaire flow. |
| **FR-097** | **NEW — SHOULD** | Post-completion expert enrichment screen mechanics — display conditions and layout. |
| **FR-098** | **NEW — SHOULD** | Expert enrichment skip mechanism — skip button always visible, skip treated as partial enrichment. |
| **PostHog event #4** | **RENAMED** | credentials\_completed → credentials\_enrichment\_completed. Timing changes from form-submit to screen-dismiss. |
| **PostHog event #2** | **UPDATED** | welcome\_hook\_viewed now fires when the single welcome+tier screen renders (not on a separate hook screen). |
| **Sessions table** | **NOTE** | credentials\_years, credentials\_interactions, credentials\_shift fields remain in schema. Now nullable for all tiers since enrichment is optional. Written post-completion, not pre-routing-gate. |

Net impact: 96 − 3 removed + 2 added = 95 requirements. MUST count: 92 − 2 (FR-012 and FR-014 downgraded) = 90. SHOULD count: 4 + 2 + 1 new = 7. Click count before Q0: 3–7 → 1. Mandatory waits before Q0: 2 → 0.

# 1. INTRODUCTION AND SCOPE

## 1.1 Purpose

This Software Requirements Specification defines all functional requirements for GuestIQ — a Progressive Web Application that delivers a 79-question hotel guest expectations research instrument to front desk staff at a single hospitality property. These requirements define what the system must do — behavior, data handling, content management, observability, and production-readiness architecture. Non-functional requirements (performance, security, accessibility) are documented in SRS Non-Functional Requirements (S0-2.3).

## 1.2 Scope

GuestIQ is scoped to the Phase 1 internal pilot only. The application runs in a browser on Windows PCs with no installation required. It is accessed via a single URL. It collects responses from front desk staff, stores them in Supabase, tracks behavior in PostHog, logs errors in Sentry, and exposes analytics through a hidden management overlay.

## 1.3 Requirement Priority Definitions

| **Priority** | **Definition** | **Consequence if Not Met** |
| --- | --- | --- |
| **MUST** | Non-negotiable for prototype delivery | Sprint gate cannot be passed. Pilot cannot launch. Requirement must be implemented before any subsequent sprint begins. |
| **SHOULD** | Strongly desired; defer only with justification | Can be deferred to the next sprint or early Phase 2 with explicit Lead Researcher approval. Must be documented as a deferral in the backlog. |
| **COULD** | Nice to have; implement if time permits | Can be omitted from Phase 1 entirely. Captured in Phase 2 recommendations. |

# 2. APPLICATION ENTRY AND WELCOME

## 2.1 Application Entry

**FR-001 MUST**

The application loads at guestiq.github.io with a property query parameter (e.g. ?property=PROP001). The property\_id value from the URL parameter is extracted on load and stored in application state for the duration of the session. If no property parameter is present, default to PROP001. The property\_id is attached to every Supabase record and every PostHog event.

*Implemented in: Sprint 2*

**FR-002 MUST**

On first load, the application fires the PostHog event app\_loaded with properties: property\_id, device\_type (desktop or mobile), and browser\_name. device\_type is determined by checking window.innerWidth < 768 for mobile. browser\_name from navigator.userAgent.

*Implemented in: Sprint 2*

**FR-003 MUST**

Before any other content renders, the application checks browser local storage for an existing incomplete session token. If found, the disambiguation screen is shown instead of the welcome screen. See Section 7 — Session Management for disambiguation screen requirements.

*Implemented in: Sprint 2*

## 2.2 Welcome and Tier Selection Screen

**★ CHANGED v2.0 (Option B): v2.0: Sections 2.2 (Three-Beat Sequence) and 2.3 (Tier Selection) merged into one screen. The hook text and tier cards appear simultaneously. No 3-second wait. No Continue button. Tier card click IS the start action. Previous FR-005 and FR-006 removed.**

**FR-004 MUST ★ CHANGED v2.0**

The welcome screen renders as a single unified screen containing two zones: (A) Hook zone at top — hook text and context statement displayed simultaneously with no delay and no Continue button. Hook text: 'You have worked with hundreds of hotel guests. Do you actually know what they want?' Context text below it: 'Your expertise becomes research. Your answers — combined with colleagues across the industry — build the most detailed picture of guest expectations ever collected in hospitality.' (B) Tier zone below — three tier cards (Amateur, Professional, Expert) each with a single 'Start as [Tier]' CTA button. The hook text is read naturally while the respondent scans the tier cards. No interaction is required to view the full welcome screen.

*All text read from ui-copy.json (Phase 1b) or questionnaire.js (Phase 1a). Never hardcoded in components. PostHog event welcome\_hook\_viewed fires when this screen renders.*

*Implemented in: Sprint 2*

**FR-007 MUST ★ CHANGED v2.0**

The three tier cards display within the tier zone of the unified welcome screen. Each card shows: tier name (bold), a one-sentence descriptor, the time estimate, and the question count. A CTA button labeled 'Start as [Tier]' is at the bottom of each card. Clicking 'Start as [Tier]' is the only action required before the first instrument question (Q0). Card colors: Amateur = #0A1A0D border #166534 accent #4ADE80 text. Professional = #0A0F1E border #1D4ED8 accent #60A5FA text. Expert = #130A1E border #6D28D9 accent #A78BFA text.

*All from the approved Visual Design System. Tier descriptors from ui-copy.json.*

*Implemented in: Sprint 2*

**FR-008 MUST**

Below the three tier cards, a reassurance line reads: 'All answers are anonymous. Your responses contribute to aggregate research only.' This text and the privacy notice appear at the bottom of the welcome+tier screen at all times.

*Implemented in: Sprint 2*

**FR-009 MUST**

On selecting a tier (clicking 'Start as [Tier]'), the PostHog event tier\_selected fires with properties: tier (amateur, professional, or expert) and property\_id.

*Implemented in: Sprint 2*

**FR-010 MUST**

The selected tier is stored in application state and in the Supabase sessions table (tier field) when the session is created. The tier determines which questions are shown throughout all 7 modules.

*Implemented in: Sprint 2*

**FR-011 SHOULD**

A 'Most selected' badge appears on the Professional tier card indicating it is the recommended starting point. Badge text from ui-copy.json. If no PostHog data is available yet (first session), show the badge by default on Professional.

*Implemented in: Sprint 3*

**🤖 AI DEVELOPER: The welcome screen is now ONE SCREEN. Do not implement a three-beat sequence with waits or Continue buttons. The hook text renders immediately alongside the tier cards. The respondent's ONLY required action is clicking a tier card. This reduces time-to-Q0 by eliminating up to 60 seconds of mandatory pre-questionnaire friction.**

## 2.3 Post-Completion Expert Enrichment Screen

**★ CHANGED v2.0 (Option B): v2.0: Expert credentials moved from a pre-questionnaire gate (old Section 2.4) to an OPTIONAL post-completion enrichment screen. All three credentials fields remain in the sessions table schema. Priority downgraded from MUST to SHOULD — this screen is enrichment, not a gate.**

**FR-012 SHOULD ★ CHANGED v2.0**

After the completion and results screen renders (FR-061), an optional enrichment screen is shown to ALL respondents (not Expert-only). The screen heading reads: 'You are done — 30 more seconds? Help us understand who answered.' Three single-click fields are shown: (1) Front desk experience: three buttons — [Under 3 years] [4–10 years] [11+ years]. (2) Guest interactions per shift: three buttons — [Under 20] [20–50] [Over 50]. (3) Shift pattern: four buttons — [Days] [Nights] [Rotating] [Variable]. Each field saves its value to the sessions table immediately when clicked — no Submit button. The screen is skippable at any time via a visible 'Skip — I'm done' link at the bottom.

*Credentials stored in sessions table as credentials\_years, credentials\_interactions, credentials\_shift (VARCHAR, nullable). Moving to post-completion means no respondent is lost to enrichment friction before Q0. Motivated completers who answered all questions are the best source of enrichment data.*

*Implemented in: Sprint 3*

**FR-097 SHOULD ★ NEW v2.0**

The enrichment screen does not block navigation away from GuestIQ. If the respondent closes the browser while the enrichment screen is shown, the session remains marked complete (is\_complete = true). Any fields already clicked are retained. No data is lost.

*The session is complete before the enrichment screen appears. Enrichment is post-completion bonus data, not session-critical data.*

*Implemented in: Sprint 3*

**FR-098 SHOULD ★ NEW v2.0**

A 'Skip — I'm done' link is visible at the bottom of the enrichment screen at all times. Clicking Skip dismisses the screen and fires the PostHog event credentials\_enrichment\_completed with fields\_answered = the count of fields clicked before skipping (0–3). This event also fires when all three fields are answered, with fields\_answered = 3.

*Skip is not failure — it is the expected path for many respondents. Do not hide or minimize the skip option.*

*Implemented in: Sprint 3*

**FR-014 SHOULD ★ CHANGED v2.0**

The PostHog event credentials\_enrichment\_completed fires when the enrichment screen is dismissed — either via Skip or by the respondent navigating away after answering some or all fields. Properties: fields\_answered (integer 0–3), years\_band (string or null), interaction\_estimate (string or null), shift\_pattern (string or null), property\_id.

*This event replaces the v1.0 credentials\_completed event. It fires once per session maximum, on enrichment screen dismiss.*

*Implemented in: Sprint 3*

**🤖 AI DEVELOPER: The enrichment screen is optional and post-completion. Do not gate any part of the questionnaire on it. Session is\_complete = true before this screen appears. Any partially-answered enrichment is valid data — do not require all three fields before saving.**

# 3. QUESTIONNAIRE TENSE ROUTING — Q0 (QR1)

**★ CHANGED v2.0 (Option B): v2.0: The routing gate is no longer a separate pre-questionnaire screen. QR1 is now Q0 — the first question of the questionnaire instrument, styled identically to all other questions. There is no special 'Routing Gate Screen'. The respondent clicks their tier, and Q0 appears immediately.**

**FR-015 MUST ★ CHANGED v2.0**

QR1 (renamed Q0 in the UX flow) is the first question the respondent answers after selecting their tier. It is rendered by the standard Question component — no special screen, no special styling. The question text and answer options are: 'Are you completing this questionnaire about a hotel stay you have recently experienced, or about a stay you are planning or expecting to take?' Options: (A) 'I am reflecting on a stay I have already completed (within the past 90 days)'; (B) 'I am thinking about a stay I am planning or likely to take in the near future'; (C) 'Both — I have recently stayed and have another stay coming up'; (D) 'Other — please specify [open text field]'. Question text and options from questionnaire.js/questions.json. Component receives these as props — never contains text directly.

*Q0 appears as Episode 1, Question 0. The episode map and progress bar are shown. The respondent experiences Q0 as the start of the instrument — because it is.*

*Implemented in: Sprint 2*

**FR-016 MUST**

The answer to Q0 (QR1) determines the tense\_frame for the session. Options A and C set tense\_frame to 'retrospective'. Option B sets tense\_frame to 'anticipatory'. Option D defaults to 'retrospective' and stores the free text in qr1\_other\_text in the sessions table. tense\_frame stored in the Supabase sessions table. Applied throughout all 7 modules.

*Implemented in: Sprint 2*

**FR-017 MUST**

All question text in Modules 1–7 has two variants in questionnaire.js: a retrospective version (past tense) and an anticipatory version (future/conditional tense). The application selects the correct variant based on the session tense\_frame and renders only that variant. Respondents see only one version. The questionnaire.js structure has a text object with keys 'retrospective' and 'anticipatory' for every question. The component reads the correct key based on tense\_frame from session state.

*Implemented in: Sprint 2*

**FR-018 MUST**

The PostHog event routing\_gate\_answered fires after Q0 is answered with properties: tense\_frame (retrospective or anticipatory), answer\_option (A, B, C, or D), property\_id.

*Event name retained for analytics continuity — the event name does not change even though the UX framing does.*

*Implemented in: Sprint 2*

**🤖 AI DEVELOPER: Q0 must be stored in the responses table like any other question. question\_id = 'QR1', answer\_code = the option code, tense\_frame is set immediately. The tense\_frame must be stored in application state at the moment Q0 is answered and used consistently for every question render from that point forward. There is no mechanism for a respondent to change their tense\_frame mid-session. If Option D (Other), store free text in qr1\_other\_text and default tense\_frame to retrospective.**

# 4. QUESTIONNAIRE DELIVERY

## 4.1 Content Architecture — questionnaire.js Structure

**⚠ This section specifies the exact data structure the AI Developer must implement for questionnaire.js in Sprint 2. Every component that renders a question must receive its content as props from this structure — never contain content directly. This is the architectural discipline that enables the Phase 1b Strangler Fig migration.**

The file src/data/questionnaire.js exports a default object containing a questions array. Every question object in the array must have the following fields:

| **Property Key** | **Data Type** | **Description and Valid Values** |
| --- | --- | --- |
| **id** | String | Unique question identifier. Format: 'QR1' for tense routing (Q0), 'Q1' through 'Q79' for instrument questions. Used as the primary key in the responses table. |
| **module** | Integer | Module number 0–7. Q0 (QR1) has module = 0. Used for episode mapping and progress calculation. |
| **section** | String | Section within module. Q0 = '0', instrument questions = '1A', '1B', '2A' etc. Matches the questionnaire document section labels. |
| **tiers** | Array of String | Which tiers include this question. Valid values: 'amateur', 'professional', 'expert'. Q0 is included in all tiers. |
| **type** | String | Question type. Valid values: 'single\_select', 'multi\_select', 'scale\_5', 'open\_text'. |
| **text** | Object | Question text in both tenses. Must have exactly two keys: 'retrospective' (string) and 'anticipatory' (string). Both must always be present even if identical. For Q0 the text is the same in both tenses. |
| **instruction** | String or null | Optional instruction line shown below question text. Null if no instruction. |
| **options** | Array of Object | Answer options. Each option object: code (String, e.g. 'A'), taxonomy\_code (String, e.g. 'WORK-TRANS'), text (String — shown to respondent). |
| **has\_none\_option** | Boolean | Whether a 'None of these fit my situation' option is appended. True for all 79 instrument questions (Q1–Q79). False for Q0. |
| **max\_selections** | Integer or null | For multi\_select questions: maximum selections allowed. Null for single\_select and scale. |
| **researcher\_note** | String or null | Annotation for researcher-facing contexts only. Never displayed to respondents. |
| **routes\_module\_5** | Boolean | True only for Q1. Indicates this question determines the Module 5 sub-section. |
| **module\_5\_code** | String or null | For Q1 only: taxonomy code mapping to Module 5 sub-section. Null for all other questions. |

**🤖 AI DEVELOPER: Implement the questionnaire.js structure exactly as specified. Do not add or remove fields without raising the change with the Lead Researcher first. The Phase 1b JSON extraction will translate this structure directly into 6 JSON files — structural consistency is critical. Populate all 79 questions plus Q0 (QR1) from the approved questionnaire document (hotel\_questionnaire.docx in the project files). Q0 is the first entry in the questions array.**

## 4.2 Question Rendering — All Types

**FR-019 MUST**

Every question is rendered by a generic Question component that receives the question object as a prop. The Question component never contains question text, option text, or any questionnaire content directly — it renders whatever content it receives. This is the core architectural discipline for the Strangler Fig migration. Verify this on every code review.

*Implemented in: Sprint 2*

**FR-020 MUST**

Single-select questions render as a vertical list of options. Each option is a tappable row showing the option text. The selected option is highlighted using the tier accent color. Selecting a new option deselects the previous selection.

*Implemented in: Sprint 2*

**FR-021 MUST**

Multi-select questions render as a vertical list of options with checkbox indicators. The instruction line (e.g. 'Select up to three') is shown below the question text. When the maximum selection count is reached, unselected options are visually dimmed but remain tappable — tapping a dimmed option deselects the oldest selected option and selects the new one.

*UX design choice: never block the respondent, manage selection count gracefully.*

*Implemented in: Sprint 2*

**FR-022 MUST**

Five-point scale questions render as a horizontal scale table with five radio buttons. The five column headers are rendered from the options array. All five options always display. The selected option is highlighted with the tier accent color.

*Implemented in: Sprint 2*

**FR-023 MUST**

Every instrument question (Q1–Q79) includes a 'None of these fit my situation' option rendered as the final option in a visually distinct style (italicised, muted color). Selecting this option deselects all other selections and stores a none\_flag record in the none\_flags Supabase table. Q0 does not have a none option. None flag records must include: session\_id, question\_id, timestamp.

*Implemented in: Sprint 2*

**FR-024 MUST**

Selecting any answer option (including the none option) on a question fires the PostHog event question\_answered with properties: question\_id, answer\_code (the option code, or 'NONE' for the none option), module\_number, episode\_number, time\_on\_question (seconds from question render to answer selection), tier, tense\_frame, property\_id. time\_on\_question is calculated from the timestamp when the question renders to the timestamp when an option is tapped.

*Implemented in: Sprint 2*

**FR-025 MUST**

Selecting the none option fires the additional PostHog event none\_flag\_selected with properties: question\_id, module\_number, tier, property\_id.

*Implemented in: Sprint 2*

**FR-026 MUST**

Every response is written to Supabase immediately on selection — not batched. For single\_select and multi\_select: one record per answer code selected, written to the responses table. For scale\_5: one record written to the scale\_responses table. For none option: one record written to the none\_flags table. Immediate write ensures data is not lost if the browser is closed mid-session.

*Implemented in: Sprint 2*

## 4.3 Tier Routing

**FR-027 MUST**

Before each question renders, the application checks whether the question's tiers array includes the current session tier. If not, the question is silently skipped and the next question is evaluated. Amateur sees only questions where tiers includes 'amateur'. Professional sees questions where tiers includes 'professional' or 'amateur'. Expert sees all questions.

*Implemented in: Sprint 2*

**FR-028 MUST**

The Amateur tier delivers exactly 8 questions across Modules 1–4 and Module 5 (one sub-section only). The Professional tier delivers exactly 18 questions. The Expert tier delivers all 79 questions. Q0 (QR1) is answered by all respondents before these counts begin. These counts must be verified by the Lead Researcher against the Refined Questionnaire document during Sprint 1 review of the questionnaire.js data structure.

*Implemented in: Sprint 1 (structure) + Sprint 2 (implementation)*

# 5. MODULE 5 BRANCHING LOGIC

**⚠ Module 5 branching is the most complex logic in the application. The AI Developer must implement it strictly from the approved Branching Logic Specification (S1-2.1) and 84-path test matrix. No assumptions. Every path must match the specification exactly.**

**FR-029 MUST**

When the respondent reaches Module 5, the application reads the intent\_category value stored from their Q1 answer and routes them to the corresponding Module 5 sub-section. The routing table is defined in the Branching Logic Specification (S1-2.1). The 12 intent categories and their Module 5 sub-sections: WORK-TRANS/WORK-EVENT/WORK-EXT → 5A. LEIS-PLAN/LEIS-SOC/LEIS-EXP → 5B. DISP-HOME/DISP-TRANS → 5C. MED → 5D. FAM → 5E. TRANSIT → 5F. LOC-ESC → 5G.

*Implemented in: Sprint 3*

**FR-030 MUST**

If the respondent selected a secondary purpose in Q2, they complete a second Module 5 sub-section after their primary sub-section. The secondary sub-section is determined by the Q2 answer following the same routing table. If the primary and secondary sub-sections are the same, show the sub-section only once.

*Implemented in: Sprint 3*

**FR-031 MUST**

If the respondent selected the none option on Q1 (cannot identify their primary intent), the application routes them to a simple intent-selection screen where they can manually pick which Module 5 sub-section is most relevant to them.

*Implemented in: Sprint 3*

**FR-032 MUST**

The PostHog event purpose\_expert fires when a secondary purpose triggers a second Module 5 sub-section, with properties: primary\_intent\_category, secondary\_intent\_category, property\_id. This fires only when Q2 triggers a second Module 5 sub-section — not on every Q2 answer.

*Implemented in: Sprint 3*

**🤖 AI DEVELOPER: The branching.json file (Phase 1b) will contain the complete routing table as a structured object. In Phase 1a, implement this routing table in questionnaire.js as a module5Routes object mapping taxonomy codes to sub-section identifiers. The Branching Logic Specification is the authoritative source.**

# 6. EPISODE STRUCTURE AND GAMIFICATION

## 6.1 Episode Mapping

**FR-033 MUST**

The 7 modules map to 7 named episodes. Episode names are read from questionnaire.js/episodes.json — never hardcoded. The mapping is: Episode 1 = Module 1, Episode 2 = Module 3A-3E, Episode 3 = Module 2, Episode 4 = Module 4, Episode 5 = Module 5, Episode 6 = Module 6, Episode 7 = Module 7. Q0 is part of Episode 1 (Module 0 routes into Episode 1 visually).

*Episodes are not in the same order as modules — intentional narrative arc design.*

*Implemented in: Sprint 3*

**FR-034 MUST**

The PostHog event episode\_started fires when the first question of each episode renders, with properties: episode\_number (1–7), episode\_name (string), module\_number, tier, property\_id.

*Implemented in: Sprint 2 (Eps 1–4) + Sprint 3 (Eps 5–7)*

**FR-035 MUST**

The PostHog event episode\_completed fires when the last question of each episode is answered, with properties: episode\_number, episode\_name, time\_to\_complete (seconds), tier, property\_id.

*Implemented in: Sprint 2 (Eps 1–4) + Sprint 3 (Eps 5–7)*

## 6.2 Progress Bar and Episode Map

**FR-036 MUST**

A progress bar is shown at the top of every question screen. It fills proportionally based on the number of questions answered within the current episode. The fill animation is smooth.

*Implemented in: Sprint 3*

**FR-037 MUST**

An episode map is shown below the progress bar. It displays 7 episode nodes in a horizontal row. Completed episodes show a filled checkmark. The current episode has a pulsing indicator. Future episodes are shown in a muted/outline style. Episode names are shown below each node.

*Implemented in: Sprint 3*

## 6.3 Curiosity Hooks

**FR-038 MUST**

At the end of each of Episodes 1–6, a curiosity hook screen appears before the next episode begins. The hook screen shows: the episode completion badge (if awarded), the curiosity hook text for that episode (from episodes.json), and a 'Continue to [next episode name]' button. Curiosity hook text is read from episodes.json — never hardcoded.

*Implemented in: Sprint 3*

**FR-039 MUST**

The PostHog event curiosity\_hook\_viewed fires when the curiosity hook screen renders, with properties: episode\_number, tier, property\_id.

*Implemented in: Sprint 3*

## 6.4 Achievement Badges

**FR-040 MUST**

Nine SVG achievement badges are implemented as designed in the Visual Design System (S1-3.3). Badge names and trigger conditions: First Step (Q1 answered), Intent Locked (Module 1 complete), Guest Arrival Expert (Module 2 complete), Environment Critic (Module 3 complete), Service Specialist (Module 4 complete), Purpose Expert (Module 5 complete), Value Analyst (Module 6 complete), Full Picture (Module 7 complete — Professional or Expert only), Expert Complete (all 79 questions answered). SVG badge assets are implemented as React components accepting a color prop.

*Implemented in: Sprint 3*

**FR-041 MUST**

Badge reveal animation: when a badge is awarded, it slides up from below the curiosity hook text and briefly scales (1.0 → 1.15 → 1.0) over 300 milliseconds using Framer Motion. The animation fires once per badge per session.

*Implemented in: Sprint 3*

**FR-042 SHOULD**

The supplementary PostHog event badge\_awarded fires with properties: badge\_name, episode\_number, tier, property\_id.

*Implemented in: Sprint 3*

## 6.5 Tier Upgrade Prompts

**FR-043 MUST**

After Episode 1 completes for Amateur tier respondents, a tier upgrade prompt appears offering an upgrade to Professional. The prompt shows: current tier, target tier, additional time required, and a benefit statement. Two buttons: 'Continue as Amateur' and 'Upgrade to Professional'. Upgrade prompt text from ui-copy.json.

*Implemented in: Sprint 3*

**FR-044 MUST**

After Episode 4 completes for Professional tier respondents, a tier upgrade prompt appears offering an upgrade to Expert.

*Implemented in: Sprint 3*

**FR-045 MUST**

If a tier upgrade is accepted: the session tier is updated in the Supabase sessions table. All questions already answered are retained. The respondent continues from the next unanswered question at the new tier level.

*Implemented in: Sprint 3*

**FR-046 MUST**

The PostHog events tier\_upgrade\_prompted, tier\_upgrade\_accepted, and tier\_upgrade\_declined fire at the appropriate moments with properties: current\_tier, target\_tier, question\_number\_at\_upgrade, property\_id.

*Implemented in: Sprint 3*

## 6.6 Streak Mechanic

**FR-047 SHOULD**

A streak counter tracks consecutive calendar days on which the respondent has answered at least one question. The streak value is stored in browser local storage alongside the session token. A streak indicator is shown subtly on the episode map screen. Streak does not affect routing or scoring.

*Implemented in: Sprint 3*

# 7. SESSION MANAGEMENT

## 7.1 Session Creation and Storage

**FR-048 MUST**

A session record is created in the Supabase sessions table immediately when the respondent selects a tier (clicks 'Start as [Tier]'). The session\_id is a UUID generated client-side (crypto.randomUUID()). The session\_id is also stored in browser local storage with the key 'guestiq\_session\_token'. Sessions table fields: session\_id (UUID, PK), tier (VARCHAR), tense\_frame (VARCHAR — populated when Q0 is answered), intent\_category (VARCHAR — populated when Q1 is answered), is\_complete (BOOLEAN, default false), property\_id (VARCHAR), created\_at (TIMESTAMP), completed\_at (TIMESTAMP — null until completion), user\_id (UUID — null in prototype), credentials\_years (VARCHAR — nullable, written post-completion from enrichment screen), credentials\_interactions (VARCHAR — nullable), credentials\_shift (VARCHAR — nullable), qr1\_other\_text (VARCHAR — nullable, written if Q0 option D selected).

*Note v2.0: credentials fields are now nullable for all tiers and written post-completion, not pre-routing-gate. The schema is unchanged but the timing of write and the nullability expectation changes.*

*Implemented in: Sprint 2*

**FR-049 MUST**

The session is marked complete (is\_complete = true, completed\_at = current timestamp) when the respondent reaches the completion screen after answering all questions for their tier.

*Implemented in: Sprint 3*

**FR-050 MUST**

When a session is marked complete, the session token is removed from browser local storage. This prevents a completed session from triggering the disambiguation screen on future visits.

*Implemented in: Sprint 3*

## 7.2 Session Resume

**FR-051 MUST**

On application load, before any screen renders, the application checks browser local storage for the key 'guestiq\_session\_token'. If a token is found, the application queries the Supabase sessions table for a session with that session\_id where is\_complete = false.

*Implemented in: Sprint 2*

**FR-052 MUST**

If an incomplete session is found in Supabase matching the local storage token, the disambiguation screen is shown instead of the welcome screen. Two options: (A) 'That was me — continue where I left off' and (B) 'I am someone new — start fresh'. The disambiguation screen does not show any information about the previous session.

*Implemented in: Sprint 2*

**FR-053 MUST**

If the respondent selects resume, the application retrieves the last answered question for that session from the responses table and resumes from the next unanswered question. Resume point is calculated by finding the highest question\_number in the responses table for that session\_id.

*Implemented in: Sprint 2*

**FR-054 MUST**

If the respondent selects new session, the local storage token is cleared, a new session is created, and the welcome screen is shown. The previous incomplete session record remains in Supabase — it is not deleted.

*Implemented in: Sprint 2*

**FR-055 MUST**

If the local storage token exists but no matching incomplete session is found in Supabase, the token is cleared and the welcome screen is shown.

*Implemented in: Sprint 2*

**FR-056 MUST**

PostHog events session\_paused, disambiguation\_shown, disambiguation\_resumed, and disambiguation\_new\_session fire at the appropriate moments.

*Implemented in: Sprint 2*

## 7.3 Supabase Connectivity and Offline Queue

**FR-057 MUST**

All Supabase calls are made through dedicated service functions in src/services/supabase.js. No React component imports the Supabase client directly. The service functions are: createSession(), storeResponse(), storeScaleResponse(), storeNoneFlag(), getSession(), markSessionComplete(), updateEnrichment(), getAggregateData(), exportCSV().

*updateEnrichment() is new in v2.0 — writes enrichment fields to the sessions table from the post-completion screen.*

*Implemented in: Sprint 2*

**FR-058 MUST**

If a Supabase write call fails, the response is stored in an in-memory queue. The queue retries all pending writes every 30 seconds. A visual indicator shows the respondent: 'Your answers are saved locally — reconnecting...' The respondent can continue answering questions while the queue retries.

*Implemented in: Sprint 2*

**FR-059 MUST**

If Supabase is unreachable for more than 60 consecutive seconds after the offline queue activates, the application shows a full-screen downtime contingency screen: 'GuestIQ is temporarily unavailable. Your answers are saved. Please try again in 30 minutes.' A Retry button is shown.

*Implemented in: Sprint 4*

**FR-060 MUST**

The PostHog events offline\_queue\_activated and offline\_queue\_flushed fire when the offline queue activates and when all queued responses are successfully sent, respectively.

*Implemented in: Sprint 2*

# 8. COMPLETION AND RESULTS SCREEN

**FR-061 MUST**

When the respondent answers the final question for their tier, the session is marked complete and the completion celebration screen renders. The completion screen shows: a congratulatory heading, the respondent's tier name, and all earned badges in a grid. The optional enrichment screen (FR-012) appears after the completion and results screens.

*Implemented in: Sprint 3*

**FR-062 MUST**

The completion screen shows a personal results summary: the respondent's primary intent category (Q1 answer) with a plain-language description, their top stated expectation priorities (from Modules 3, 4, and 5 responses), and their preferred service interaction style (from Q31). Descriptions for each intent category and priority are defined in ui-copy.json — never hardcoded.

*Implemented in: Sprint 3*

**FR-063 MUST**

If at least 3 complete sessions exist in Supabase for the same property\_id, an anonymized aggregate comparison chart is shown below the personal results. Below 3 sessions: show 'More responses needed for comparison — check back after more colleagues have completed their session.' Do not show an empty chart.

*Implemented in: Sprint 3*

**FR-064 MUST**

The PostHog events session\_completed, results\_viewed, and aggregate\_comparison\_viewed fire at the appropriate moments. session\_completed includes: tier, total\_time\_seconds, episodes\_completed, intent\_category, property\_id.

*Implemented in: Sprint 3*

# 9. MANAGEMENT DASHBOARD

## 9.1 Access Mechanism

**FR-065 MUST**

The management dashboard overlay is activated by pressing SHIFT+CTRL+A simultaneously on any screen. The overlay slides in from the right. It overlays on top — does not replace the current screen. Pressing Escape or clicking outside closes it. The keyboard shortcut is active on all screens at all times except the disambiguation screen.

*Implemented in: Sprint 4*

**FR-066 MUST**

The dashboard overlay uses a distinct visual canvas: dark navy #0B1120 background — explicitly different from the respondent canvas (#0D0D12). The distinction signals an analytical environment.

*Implemented in: Sprint 4*

**FR-067 MUST**

The PostHog events dashboard\_opened and dashboard\_panel\_viewed fire when the overlay opens and when each panel tab is clicked, with panel\_name property.

*Implemented in: Sprint 4*

## 9.2 Dashboard Panels

**FR-068 MUST**

Panel 1 — Response Overview: total response count, breakdown by tier (count and percentage), completion rate (complete sessions / started sessions), average session duration, count of partial vs. complete sessions.

*Implemented in: Sprint 4*

**FR-069 MUST**

Panel 2 — Intent Distribution: a donut chart showing the percentage of complete sessions in each of the 12 intent taxonomy categories. Hovering shows count and percentage. A filter allows viewing by tier.

*Implemented in: Sprint 4*

**FR-070 MUST**

Panel 3 — Planning Horizon Distribution: a bar chart showing the distribution of Q3 answers (booking lead time) across all complete sessions.

*Implemented in: Sprint 4*

**FR-071 MUST**

Panel 4 — Expectation Priorities by Segment: a dropdown filter for intent category segment. Shows the top 3 most-selected expectation priorities from Modules 3, 4, and 5 as a horizontal bar chart.

*Implemented in: Sprint 4*

**FR-072 MUST**

Panel 5 — Competitive Threat Map: distribution of Q8 answers (alternatives considered) broken down by intent category segment.

*Implemented in: Sprint 4*

**FR-073 MUST**

Panel 6 — Service Interaction Spectrum: distribution of Q31 answers (preferred staff contact level) across all complete sessions, as a horizontal spectrum.

*Implemented in: Sprint 4*

**FR-074 MUST**

Panel 7 — Value Reference Framework: distribution of Q57 answers (how respondents define value) across all complete sessions.

*Implemented in: Sprint 4*

**FR-075 MUST**

Panel 8 — None Flags: the 10 questions with the highest rate of 'None of these fit my situation' selections, ordered by rate descending. Shows question ID, question text (truncated), and none-flag rate.

*Implemented in: Sprint 4*

**FR-076 MUST**

Panel 9 — Raw Data: a scrollable table showing all sessions with columns: session\_id (truncated), tier, intent\_category, tense\_frame, is\_complete, created\_at. Clicking a row expands to show all response records for that session.

*Implemented in: Sprint 4*

**FR-077 SHOULD**

All dashboard panels update in real time or near-real-time with a manual refresh button without requiring the overlay to be closed and reopened.

*Implemented in: Sprint 4*

## 9.3 Data Exports

**FR-078 MUST**

An Export CSV button triggers a download of all sessions and responses joined, formatted as a valid CSV. Column headers are human-readable. File named: guestiq-export-[property\_id]-[YYYY-MM-DD].csv. Must open correctly in Microsoft Excel.

*Implemented in: Sprint 4*

**FR-079 MUST**

An Export PDF button generates and downloads a one-page PDF summary report containing: response count, completion rate, intent distribution chart, top 3 expectation priorities by segment, competitive threat summary. Generated client-side — no server-side PDF generation.

*Implemented in: Sprint 4*

**FR-080 MUST**

The PostHog events dashboard\_exported\_csv and dashboard\_exported\_pdf fire when each export is triggered, with a property: response\_count.

*Implemented in: Sprint 4*

# 10. CONTENT MANAGEMENT REQUIREMENTS

**⚠ This section defines requirements that are specifically about how content is managed — not just what content is shown. These requirements are critical for production-readiness and must be treated as first-class requirements by the AI Developer.**

## 10.1 Phase 1a — questionnaire.js Architecture

**FR-081 MUST**

In Phase 1a, ALL questionnaire content (questions, options, episode names, UI copy, branching rules, taxonomy codes) is stored in src/data/questionnaire.js. No question text, answer option text, or UI copy string is hardcoded directly in any React component. This is the most important architectural discipline in the codebase.

*A component that contains the string 'What was the main reason for this hotel stay?' is non-compliant.*

*Implemented in: Sprint 2*

**FR-082 MUST**

Components that render questions, episode maps, tier cards, curiosity hooks, and UI copy accept all content as React props. They do not import from questionnaire.js directly — they receive their data from a parent component or custom hook that reads from questionnaire.js. Pattern: questionnaire.js → useQuestionnaire hook → parent → child as props.

*Implemented in: Sprint 2*

**🤖 AI DEVELOPER: Create a custom hook (src/hooks/useQuestionnaire.js) that imports questionnaire.js and provides all content to the component tree via context or prop drilling. No component below the hook should import questionnaire.js. This single point of import makes the Phase 1b migration a one-file change.**

## 10.2 Phase 1b — JSON Configuration Files

**FR-083 MUST**

After Sprint 3 testing is complete, questionnaire content is extracted from questionnaire.js into 6 JSON configuration files: questions.json, episodes.json, tiers.json, ui-copy.json, branching.json, taxonomy.json. The application is updated to read from these files instead of questionnaire.js. The JSON file structure must match the questionnaire.js object structure exactly.

*Implemented in: Sprint 3→4 transition*

**FR-084 MUST**

A configuration validator runs on every application load immediately after Sentry initialization. It parses all 6 JSON files and verifies their structural integrity. If any file is malformed or missing a required field, the validator throws a descriptive error and displays a developer-facing error message before any respondent-facing content renders. Error message format: 'GuestIQ Config Error: [file name] — [specific issue]. The application cannot load. Check the file and redeploy.'

*Implemented in: Sprint 3→4 transition*

**FR-085 MUST**

All 6 JSON configuration files are committed to the Git repository and version-controlled. Changes to questionnaire content are made by editing these files and committing — not by manual edits on the server.

*Implemented in: Sprint 3→4 transition*

# 11. OBSERVABILITY REQUIREMENTS

**⚠ Observability requirements are production-grade requirements — not optional. Sentry and PostHog must be initialized before any other application code in Sprint 2. All 27 canonical PostHog events must be implemented exactly as specified. Event names must match exactly — analytics queries, funnels, and dashboards depend on consistent naming.**

## 11.1 Sentry Initialization and Error Capture

**FR-086 MUST**

Sentry is initialized as the first import in src/main.jsx, before any React rendering begins. Configuration: DSN from environment variable VITE\_SENTRY\_DSN, environment: VITE\_APP\_ENV (prototype or production), tracesSampleRate: 1.0, enabled: true in all environments.

*DSN from the Sentry project created in Pre-Sprint. Store in .env as VITE\_SENTRY\_DSN. Never commit .env to Git.*

*Implemented in: Sprint 2*

**FR-087 MUST**

A Sentry ErrorBoundary component wraps the entire React application in src/main.jsx. Any unhandled React rendering error is caught and reported to Sentry with full context.

*Implemented in: Sprint 2*

**FR-088 MUST**

Every Supabase service function in src/services/supabase.js wraps its calls in a try-catch. Caught errors are captured via Sentry.captureException() with a context object containing: function\_name, session\_id (if available), property\_id.

*Implemented in: Sprint 2*

**🤖 AI DEVELOPER: Do not use Sentry.init() with placeholder values. The actual DSN from the Sentry account created in Pre-Sprint must be used. If the DSN is not available, raise this with the Lead Researcher before Sprint 2 begins — Sentry initialization cannot be deferred.**

## 11.2 PostHog Initialization

**FR-089 MUST**

PostHog is initialized in src/main.jsx immediately after Sentry. Configuration: API key from VITE\_POSTHOG\_KEY, host: 'https://app.posthog.com', capture\_pageview: false, persistence: 'memory' (no cookies), ip: false (IP anonymization enabled).

*API key stored in .env as VITE\_POSTHOG\_KEY. Not committed to Git.*

*Implemented in: Sprint 2*

**FR-090 MUST**

All PostHog event calls are made through the analytics service file src/services/analytics.js. This file exports one named function per canonical event. No React component calls posthog.capture() directly. Pattern: analytics.trackTierSelected({tier, propertyId}) — not posthog.capture() from a component.

*Implemented in: Sprint 2*

## 11.3 The 27 Canonical PostHog Events

The following table defines all 27 canonical PostHog events. Event names are exact — case-sensitive, underscore-separated, lowercase. The property\_id is included in every event automatically via a PostHog super-property set on initialization.

| **#** | **Event Name** | **Fired When** | **Sprint** | **Required Properties** |
| --- | --- | --- | --- | --- |
| 1 | **app\_loaded** | Application renders for the first time | Sprint 2 | device\_type, browser\_name, property\_id |
| 2 | **welcome\_hook\_viewed** | Welcome+tier screen renders (v2.0: single unified screen) | Sprint 2 | property\_id |
| 3 | **tier\_selected** | Respondent clicks a tier CTA button | Sprint 2 | tier, property\_id |
| 4 | **credentials\_enrichment\_completed** | Enrichment screen dismissed (answered or skipped) | Sprint 3 | fields\_answered (int), years\_band, interaction\_estimate, shift\_pattern, property\_id |
| 5 | **routing\_gate\_answered** | Q0 (QR1) answered | Sprint 2 | tense\_frame, answer\_option, property\_id |
| 6 | **episode\_started** | First question of an episode renders | Sprint 2 | episode\_number (int), episode\_name, module\_number (int), tier, property\_id |
| 7 | **question\_answered** | Any question answered (any option) | Sprint 2 | question\_id, answer\_code, module\_number (int), episode\_number (int), time\_on\_question (int), tier, tense\_frame, property\_id |
| 8 | **none\_flag\_selected** | None option selected on any question | Sprint 2 | question\_id, module\_number (int), tier, property\_id |
| 9 | **episode\_completed** | Last question of an episode answered | Sprint 2 | episode\_number (int), episode\_name, time\_to\_complete (int), tier, property\_id |
| 10 | **curiosity\_hook\_viewed** | Curiosity hook screen renders | Sprint 3 | episode\_number (int), tier, property\_id |
| 11 | **tier\_upgrade\_prompted** | Upgrade prompt shown mid-session | Sprint 3 | current\_tier, target\_tier, property\_id |
| 12 | **tier\_upgrade\_accepted** | Respondent accepts upgrade | Sprint 3 | from\_tier, to\_tier, question\_number\_at\_upgrade (int), property\_id |
| 13 | **tier\_upgrade\_declined** | Respondent declines upgrade | Sprint 3 | from\_tier, target\_tier, property\_id |
| 14 | **purpose\_expert** | Secondary purpose triggers 2nd Module 5 | Sprint 3 | primary\_intent\_category, secondary\_intent\_category, property\_id |
| 15 | **session\_paused** | Browser closes with incomplete session | Sprint 2 | question\_number\_at\_pause (int), episode\_number (int), tier, property\_id |
| 16 | **disambiguation\_shown** | Incomplete token found — screen shown | Sprint 2 | property\_id |
| 17 | **disambiguation\_resumed** | Respondent selects 'that was me' | Sprint 2 | question\_number\_resumed\_from (int), property\_id |
| 18 | **disambiguation\_new\_session** | Respondent selects 'someone new' | Sprint 2 | property\_id |
| 19 | **offline\_queue\_activated** | Supabase unreachable — queue starts | Sprint 2 | question\_number (int), episode\_number (int), property\_id |
| 20 | **offline\_queue\_flushed** | Queued responses sent successfully | Sprint 2 | responses\_queued (int), property\_id |
| 21 | **session\_completed** | All questions for selected tier answered | Sprint 3 | tier, total\_time\_seconds (int), episodes\_completed (int), intent\_category, property\_id |
| 22 | **results\_viewed** | Completion results screen renders | Sprint 3 | tier, intent\_category, property\_id |
| 23 | **aggregate\_comparison\_viewed** | Aggregate comparison chart renders | Sprint 3 | responses\_in\_aggregate (int), property\_id |
| 24 | **dashboard\_opened** | SHIFT+CTRL+A overlay opens | Sprint 4 | property\_id |
| 25 | **dashboard\_panel\_viewed** | Dashboard panel tab clicked | Sprint 4 | panel\_name, property\_id |
| 26 | **dashboard\_exported\_csv** | CSV export triggered | Sprint 4 | response\_count (int), property\_id |
| 27 | **dashboard\_exported\_pdf** | PDF export triggered | Sprint 4 | response\_count (int), property\_id |

**🤖 AI DEVELOPER: Implement all 27 events in src/services/analytics.js as named export functions. Each function takes a single props object and calls posthog.capture() with the exact event name from the table. The property\_id super-property is set once on PostHog initialization and does not need to be passed to each function call. All other required properties must be passed explicitly. Note: event 4 is credentials\_enrichment\_completed (renamed from credentials\_completed in v1.0).**

# 12. PRODUCTION-READINESS REQUIREMENTS

**⚠ These requirements do not add visible features. They are architectural disciplines ensuring the prototype can grow into the production system without a rebuild. Implement in Sprint 2 alongside feature work — not deferred to Phase 2.**

**FR-091 MUST**

All credentials (Supabase URL, Supabase anon key, PostHog API key, Sentry DSN) are stored in a .env file at the project root. No credentials are hardcoded anywhere. The .env file is listed in .gitignore and never committed to Git. .env format: VITE\_SUPABASE\_URL=, VITE\_SUPABASE\_ANON\_KEY=, VITE\_POSTHOG\_KEY=, VITE\_SENTRY\_DSN=, VITE\_APP\_ENV=prototype, VITE\_PROPERTY\_ID=PROP001

*Implemented in: Sprint 2*

**FR-092 MUST**

A feature flag system is implemented via the environment configuration. Feature flags: VITE\_FEATURE\_AUTH\_ENABLED (false in prototype), VITE\_FEATURE\_MANAGEMENT\_OPEN (true in prototype), VITE\_FEATURE\_MULTI\_PROPERTY (false in prototype). Components read these flags from src/config/features.js — never directly from import.meta.env.

*Implemented in: Sprint 2*

**FR-093 MUST**

Supabase Auth is installed and configured in bypass mode. A guest/anonymous token is created on session start using the Supabase anon key. RLS policies allow insert and select with the anon key. When VITE\_FEATURE\_AUTH\_ENABLED is set to true (Phase 2), the auth flow activates — no other code changes required. Implemented in src/services/supabase.js.

*Implemented in: Sprint 2*

**FR-094 MUST**

The Supabase database schema is implemented entirely via Supabase Migrations — not manual SQL edits. Each table creation and policy creation is a separate migration file in supabase/migrations/. Migration files are committed to the Git repository. Migration file naming: [timestamp]\_create\_[table\_name].sql.

*Implemented in: Sprint 1 (design) + Sprint 2 (files provided)*

**FR-095 MUST**

The property\_id field is present in every Supabase record (sessions, responses, scale\_responses, none\_flags) and in every PostHog event. In Phase 1 it is always set to the value from VITE\_PROPERTY\_ID. In Phase 2 it will be set dynamically per property — no code changes required.

*Implemented in: Sprint 2*

**FR-096 MUST**

The user\_id field is present in the sessions table as a nullable UUID field. In Phase 1 (auth bypass mode) it is always null. In Phase 2 (auth enabled) it will be populated with the authenticated user's ID. No migration required to add this field in Phase 2.

*Implemented in: Sprint 2*

**🤖 AI DEVELOPER: FR-091 through FR-096 are architectural constraints, not features. They must be implemented silently alongside feature work in Sprint 2. Raise any conflict with the Lead Researcher before Sprint 2 begins — these requirements cannot be deferred.**

# 13. REQUIREMENTS TRACEABILITY SUMMARY

All 95 non-functional requirements listed in order of sprint. This traceability matrix is used during sprint gate reviews to confirm all requirements for that sprint are implemented and tested.

ℹ USE CASE TRACEABILITY NOTE (v2.0): A Use Case reference column (UC-XX) will be added to this table after S0-2.5 Use Case Specifications are approved. Each FR will then be mapped to its parent Use Case, providing full traceability: Use Case → Epic → Feature → FR → Story.

| **Sprint** | **Requirements** | **Count** | **Status at Gate** | **UC** |
| --- | --- | --- | --- | --- |
| **Sprint 1** | FR-028, FR-094 | 2 | questionnaire.js data structure approved. Supabase migration files produced and ready for Sprint 2 setup. | UC-05, UC-07 |
| **Sprint 2** | FR-001 to FR-018 (excl. FR-005, FR-006, FR-013), FR-019 to FR-027, FR-034, FR-035, FR-048 to FR-060, FR-081, FR-082, FR-086 to FR-096 | 48 | Working URL live. Modules 1–4 functional. Q0 (tense routing) functional. Session resume working. Data integrity verified (5 sessions). Sentry + PostHog live. Service layer + feature flags + auth bypass implemented. | UC-01, UC-02, UC-04, UC-07 |
| **Sprint 3** | FR-011, FR-012, FR-014, FR-029 to FR-033, FR-036 to FR-047, FR-061 to FR-064, FR-097, FR-098 | 26 | All 79 questions functional. Module 5 branching verified against 84-path matrix. Full gamification live. Results screen complete. Post-completion enrichment screen live. | UC-01, UC-02, UC-05, UC-06 |
| **Sprint 4** | FR-059, FR-065 to FR-080 | 17 | Dashboard complete. All 9 panels functional. CSV and PDF exports working. Downtime screen implemented. | UC-03 |
| **Sprint 3→4** | FR-083 to FR-085 | 3 | Phase 1b JSON extraction complete. Configuration validator working. All 6 config files version-controlled. | UC-05 |

# 14. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. 96 requirements across 12 sections. Three-beat welcome sequence. Expert credentials pre-questionnaire gate. Routing gate as separate screen. |
| **v2.0** | [Sprint 0] | Claude / AI Developer | Option B UX redesign. FR-005, FR-006, FR-013 removed. FR-097, FR-098 added. Net: 96 → 95 FRs. MUST: 92 → 90. SHOULD: 4 → 5. Section 2.2/2.3 merged (hook+tier single screen). Section 2.4 (expert credentials) relocated post-completion as optional enrichment, priority MUST→SHOULD. Section 3 reframed (QR1 = Q0, first instrument question not a gate screen). PostHog event #4 renamed credentials\_completed → credentials\_enrichment\_completed. UC traceability column added to traceability table. sessions table credentials fields now nullable for all tiers. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF SRS FUNCTIONAL REQUIREMENTS v2.0 —**

*GuestIQ · SRS Functional Requirements v2.0 · S0-2.1 · 95 Requirements · Option B UX Redesign · Confidential*