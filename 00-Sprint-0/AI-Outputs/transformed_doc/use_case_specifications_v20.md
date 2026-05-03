**USE CASE SPECIFICATIONS**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-2.5 — Sprint 0 Artifact |
| **Document Version** | 2.0 — Critique-driven full revision: all 7 UCs updated, UC-05 structurally corrected, 9 new extensions, IRB ethics section added |
| **Document Status** | DRAFT v2.0 — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Framework** | Use Case 3.0 — Jacobson & Cockburn, December 2024 |
| **Use Cases Defined** | 7 Use Cases (UC-01 to UC-07) — all GuestIQ user journeys |
| **Hierarchy** | Epic (= Use Case) → Feature (= UC Slice) → Story (= Work Item) → Task |
| **Sequencing** | Produced BEFORE Product Backlog per Timeline v4.0 — Use Cases define Epics |
| **Related Documents** | Methodology Document v1.1 (S0-0.1) · JTBD Statements (S0-0.3) · SRS-F v2.0 (S0-2.1) · SRS-NFR v1.2 (S0-2.3) · Product Backlog v3.0 (S0-2.7) |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Use-Case-Specifications-v2.0.docx |

ℹ This document was fully revised in v2.0 following a systematic four-lens critique of v1.1 coverage. Every UC has been reviewed. UC-05 received a structural rewrite — its basic scenario now correctly describes the actor (Lead Researcher) achieving their goal, not the developer performing setup. A new Research Ethics section addresses the IRB path decision required before academic publication can be pursued.

**⚠ IRB PATH DECISION REQUIRED before pilot launch if academic publication is intended. The current privacy notice (FR-008) is adequate for internal operational research only. See Section 5 — Research Ethics and IRB Path Analysis.**

# 1. PURPOSE AND SCOPE

Use Case Specifications are the primary requirements artifact in the GuestIQ project. Under Use Case 3.0, a Use Case is the complete story of how an actor achieves a goal with the system — from intent through to outcome. Use Cases become Epics in the Product Backlog. Use Case Slices become Features. Work Items (user stories) are derived from those slices.

This document defines 7 Use Cases covering the complete scope of GuestIQ Phase 1. Each Use Case has a named actor, a primary goal, a basic scenario (the success path), and key extensions (significant failures, alternatives, and edge cases). Each maps to the FR/NFR requirements it implements and the backlog stories that satisfy its Work Items.

The 7 Use Cases span two domains. The Research Domain (UC-01, UC-02, UC-06) covers GuestIQ as a data-collection and reporting instrument, owned by the Lead Researcher (SH-02). The Technical Domain (UC-03, UC-04, UC-05, UC-07) covers the application as software infrastructure, owned by the AI Developer (SH-04).

*⚑ Academic note: UC-02 uses a system-as-actor framing, which is academically contestable — data quality is ultimately the Lead Researcher's goal, not an autonomous system goal. This framing is retained in v2.0 for practical reasons (the behaviour runs continuously without human initiation) with this acknowledgement on record. In a rigorous academic publication context, UC-02 might be reframed as an include relationship off UC-01.*

*⚑ Academic note: UC-07 merges two distinct actor goals: CI/CD deployment (developer-initiated) and real-time monitoring (researcher-initiated). These would be separate Use Cases in a stricter model. The merge is acceptable at Phase 1 project scale and is acknowledged here.*

ℹ UC-01 is the primary Use Case — it defines the core respondent journey that all others exist to support. Review UC-01 first.

# 2. USE CASE SUMMARY

| **ID** | **Use Case** | **Actor** | **Owner** | **Domain / Sprints** |
| --- | --- | --- | --- | --- |
| **UC-01** | Respondent Completes the Questionnaire | Front Desk Respondent | SH-02 | Research · S2–S3 |
| **UC-02** | Research Data Quality is Maintained | Research Instrument (system) | SH-02 | Research · S2–S3 |
| **UC-03** | Manager Reviews Pilot Analytics | Hotel Management / Lead Researcher | SH-04 | Technical · S4 |
| **UC-04** | Data is Stored, Versioned, and Protected | System | SH-04 | Technical · S2 |
| **UC-05** | Questionnaire Content Managed Without Code Changes | Lead Researcher | SH-04 | Technical · S1,S3 |
| **UC-06** | Pilot Debrief and Post-Pilot Reporting | Lead Researcher / Hotel Mgmt | SH-02 | Research · S6 |
| **UC-07** | GuestIQ is Deployed, Accessible, and Observed | Lead Researcher / System | SH-04 | Technical · S1–S5 |

# 3. FULL USE CASE SPECIFICATIONS

Each Use Case is documented with: actor, goal, scope, preconditions, basic scenario, key extensions, postconditions, UC Slices (Features in the backlog), and FR/NFR traceability.

**UC-01 Respondent Completes the Questionnaire**

*Domain: Research Domain — Primary Use Case*

|  |  |
| --- | --- |
| **Actor** | Front Desk Respondent — a hotel front desk team member completing the instrument during a work break or lull period |
| **Goal** | Complete a selected tier of the GuestIQ questionnaire and receive personalised results showing how their professional knowledge compares to the aggregate |
| **Scope** | From first opening the GuestIQ URL to viewing the completion screen. Includes tier selection, tense frame routing, all 7 modules, gamification layer, results screen, and optional enrichment screen. Non-participation is an equally valid outcome and is covered in Extension 5. |
| **Preconditions** | The GuestIQ URL (guestiq.github.io?property=PROP001) is accessible on the front desk PC browser. The pilot has been launched (Sprint 5). The respondent has seen the MS Teams launch message. Participation is voluntary — no consequence for declining. |
| **Postconditions (success)** | A complete session record exists in Supabase with is\_complete = true. All responses are stored. Intent category and tense frame are correctly coded. The respondent has seen their personal results. |
| **Postconditions (failure)** | An incomplete session record exists with is\_complete = false and the local storage token is set — respondent can resume. No data is lost. OR: respondent chose not to participate — no session record created (Extension 5). |
| **Epic Owner** | SH-02 Lead Researcher |
| **Linked JTBD** | Actor 3 (Front Desk Team): 'Hires GuestIQ to give their professional expertise about guest behaviour a form — converting what they know into structured data that is visible, valued, and consequential.' |
| **Priority** | MUST — this is the core use case. All other use cases exist to support it. |

## Basic Scenario — Success path: respondent completes selected tier from start to finish

**1.** Respondent opens the GuestIQ URL on a front desk PC browser.

**2.** Welcome screen displays hook text and tier cards simultaneously on a single unified screen — no Continue button, no wait. Hook is read while scanning tier cards. Privacy notice visible at bottom: 'All answers are anonymous. Participation is voluntary. You may close this page at any time without consequence. Your responses contribute to aggregate research only.' (FR-008 v2.0 — voluntary language added). **★ updated**

**3.** Respondent clicks 'Start as [Tier]' — the only interaction before Q0. Amateur (8 questions), Professional (18 questions), or Expert (79 questions). Pre-questionnaire flow is complete.

**4.** Q0 (QR1) appears immediately as the first instrument question, styled identically to all other questions. Respondent answers: is this questionnaire about a recent stay or one they are planning? Options: A (retrospective), B (anticipatory), C (both → retrospective), D (Other — cannot identify tense frame → see Extension 6). **★ updated**

**5.** System assigns tense\_frame from the Q0 answer: A or C → retrospective, B → anticipatory, D → retrospective with free text stored in qr1\_other\_text. tense\_frame is written to the sessions table.

**6.** Respondent progresses through Episode 1 (Module 1) — all questions rendered in the correct tense. Intent category captured at Q1.

**7.** Respondent progresses through Episodes 2–7 — Modules 2–7 appropriate to their tier. Episode map and progress bar track progress visually. Module 5 routes to the correct sub-section based on Q1 intent category.

**8.** At the end of each episode, an achievement badge is awarded. Curiosity hooks between episodes maintain engagement and anticipation.

**9.** On completing the final episode, the completion celebration screen appears showing all earned badges. The results screen displays personal response summary and anonymised aggregate comparison.

**10.** System marks is\_complete = true in Supabase. Session token is cleared from local storage.

**11.** Optional enrichment screen appears: three single-click fields (experience band, interaction volume, shift pattern). Always skippable via a visible 'Skip — I'm done' link. Session remains complete regardless of enrichment outcome.

**EXTENSION 1 — Session interrupted mid-completion — browser closed, PC locked, or shift handover**

**1a** Respondent closes browser or PC is locked mid-session.

**1b** Browser local storage retains the incomplete session token.

**1c** On next visit to the GuestIQ URL (same browser), the disambiguation screen appears: 'Resume your session?' or 'I am someone new — start fresh?'

**1d** If Resume: respondent continues from the last answered question. All previous answers are preserved in Supabase.

**1e** If Start Fresh: a new session begins. The incomplete session remains in Supabase with is\_complete = false. Token is cleared.

**EXTENSION 2 — Supabase unreachable during session — network issue or service outage**

**2a** Supabase API calls fail during an active session.

**2b** Offline queue activates. Responses continue to be captured in browser local storage.

**2c** After 60 seconds of continuous failure, the downtime contingency screen is shown. Respondent is asked to try again later.

**2d** When connectivity is restored, the offline queue retries automatically every 30 seconds. All queued responses are written to Supabase.

**2e** No response data is lost. The session resumes as if the outage did not occur.

**EXTENSION 3 — Respondent selects 'None of these fit my situation' on a question**

**3a** Respondent finds no answer option matches their professional experience.

**3b** Respondent selects the 'None of these fit my situation' escape valve option.

**3c** System records a none\_flag entry in the none\_flags Supabase table (question\_id, session\_id, property\_id).

**3d** Session continues to the next question. None-flags do not block completion.

**3e** None-flag rates per question are visible in the management dashboard and used for Phase 2 instrument refinement.

**EXTENSION 4 — Respondent is offered a tier upgrade mid-questionnaire — accepts or declines**

**4a** After completing Amateur tier questions, a tier upgrade prompt appears: 'You're doing great — want to try Professional?'

**4b-accept** Respondent accepts the upgrade. Additional questions for the higher tier are added to the remaining session flow. Progress bar adjusts. Session completes at the upgraded tier level. Tier field in Supabase updated accordingly. PostHog event tier\_upgrade\_accepted fires.

**4b-decline** Respondent declines the upgrade. The upgrade prompt closes. Session continues from the next Amateur-tier question. No change to tier field in Supabase. PostHog event tier\_upgrade\_declined fires. Control returns to basic scenario step 7 at the Amateur tier.

**EXTENSION 5 — Respondent reads the welcome screen and chooses not to participate ★ NEW v2.0**

**5a** Respondent opens the GuestIQ URL and reads the welcome screen hook text and privacy notice.

**5b** Respondent decides not to participate at this time — they close the browser tab or click 'Not now' if a link is provided.

**5c** No session record is created in Supabase. No token is written to browser local storage.

**5d** The system treats absence of tier selection as non-participation. No data about the non-participation is recorded anywhere.

**5e** The respondent can return at any time and will see the welcome screen as if visiting for the first time.

**5f** Non-participation has no consequence. The respondent's decision is not visible to management or the Lead Researcher — only the absence of a session record.

**EXTENSION 6 — Respondent selects Q0 Option D — cannot identify tense frame from provided options ★ NEW v2.0**

**6a** At Q0, the respondent cannot identify whether their questionnaire is about a recent stay or a planned stay (Option D: Other).

**6b** Respondent selects Option D and enters free text describing their situation in the open text field.

**6c** System defaults tense\_frame to 'retrospective' and writes the free text to qr1\_other\_text in the sessions table.

**6d** Session proceeds with retrospective framing. This is a research note: Option D respondents are in the retrospective dataset but may not have been reflecting on a completed stay. The Lead Researcher should examine qr1\_other\_text values during analysis and consider flagging these sessions in the debrief report.

**6e** PostHog event routing\_gate\_answered fires with tense\_frame = 'retrospective' and answer\_option = 'D'.

## Use Case Slices (Features) — UC-01

**★ CHANGED v2.0: v2.0: Slice 9 added for voluntary participation pathway. Extension 4 decline path, Extension 5, Extension 6 all reflect research ethics commitment.**

| **Use Case Slice (Feature)** | **Stories** | **SP** | **Sprint** |
| --- | --- | --- | --- |
| **Slice 1 — Welcome and tier selection (unified screen, single click, voluntary notice)** | S2-06, S2-18 | 8 SP | Sprint 2 |
| **Slice 2 — Modules 1–4 (core questions)** | S2-09, S2-10 | 8 SP | Sprint 2 |
| **Slice 3 — Module 5 branching (all 7 sub-sections)** | S3-01, S3-02 | 13 SP | Sprint 3 |
| **Slice 4 — Modules 6–7 (value and post-stay)** | S3-03 | 5 SP | Sprint 3 |
| **Slice 5 — Gamification layer (progress, badges, hooks, tier upgrade)** | S3-04, S3-05, S3-06, S3-07, S3-14 | 11 SP | Sprint 3 |
| **Slice 6 — Completion, results screen, optional post-completion enrichment** | S3-08, S3-16 | 11 SP | Sprint 3 |
| **Slice 7 — Session resume and disambiguation** | S2-11 | 5 SP | Sprint 2 |
| **Slice 8 — Offline queue and downtime screen** | S2-12, S4-05 | 8 SP | Sprint 2+4 |
| ***Slice 9 — Voluntary participation notice and non-participation pathway ★ new*** | S2-18 (enhanced), FR-008 update | Included in Slice 1 SP | Sprint 2 |

## Traceability — UC-01

| **FR / NFR** | **Requirement Summary** |
| --- | --- |
| **FR-001 to FR-018** | Welcome+tier unified screen, Q0 tense routing, tense frame management. FR-008 updated in v2.0: privacy notice now includes explicit voluntary participation statement. |
| **FR-019 to FR-047** | All 7 modules — question delivery, answer capture, routing, branching, gamification mechanics |
| **FR-048 to FR-064** | Session management, results screen, enrichment screen (FR-012, FR-097, FR-098) |
| **NFR-015** | Privacy notice — v2.0: must include voluntary participation language and no-consequence statement |
| **NFR-043** | Tense frame accuracy — 100% correct. Note: Option D sessions use retrospective by default; flag in analysis. |
| **NFR-044** | Module 5 routing fidelity — 100% match between intent\_category and Q1 answer |
| **NFR-045** | None-flag capture fidelity — none\_flags count matches UI selections |

**UC-02 Research Data Quality is Maintained**

*Domain: Research Domain — Instrument Integrity*

*⚑ Academic note: This UC uses a system-as-actor framing. Strictly speaking, data quality is the Lead Researcher's goal — this is a cross-cutting quality concern of UC-01. The system-actor framing is retained for practical reasons (quality monitoring runs continuously without human initiation). In an academic publication, this would typically be modelled as an <<include>> relationship off UC-01.*

|  |  |
| --- | --- |
| **Actor** | Research Instrument (system acting as data-collection tool) — runs continuously throughout pilot without human initiation |
| **Goal** | Every completed session produces a dataset that is valid, complete, and correctly coded — meeting the academic research standards required for the findings to be publishable and operationally useful |
| **Scope** | From session creation through to the final pilot CSV export. Covers tense frame application, intent category coding, none-flag capture, data integrity verification, abandoned session handling, and compliance with NFR-043/044/045. |
| **Preconditions** | Sprint 2 data integrity protocol has been executed and passed. The 84-path test matrix has been verified (Sprint 3). The pilot is live. |
| **Postconditions (success)** | All pilot session records are valid: tense\_frame correct, intent\_category correctly coded, none\_flags complete. Abandoned sessions (is\_complete = false, no token) are counted separately from active incomplete sessions in participation metrics. |
| **Postconditions (failure)** | A data quality failure is detected. Affected sessions are flagged. Lead Researcher is notified. Affected sessions are excluded from the analysis dataset with documentation in the debrief report. |
| **Epic Owner** | SH-02 Lead Researcher |
| **Linked JTBD** | Actor 1 (Hotel Management): 'evidence rather than accumulated assumption'. Actor 2 (Lead Researcher): 'research-grade guest expectation data... publishable and operationally useful.' |
| **Priority** | MUST — data quality failure is Risk R-02 (High/High). This use case is the mitigation. |

## Basic Scenario — Continuous data quality maintenance throughout pilot

**1.** At session start, Q0 tense frame selection is captured and written to tense\_frame in the sessions table.

**2.** All question renders for this session reference the tense\_frame field and deliver the correct question text version throughout.

**3.** At Q1, the respondent's intent category answer is captured and written to intent\_category in the sessions table.

**4.** Module 5 routing uses intent\_category to select the correct sub-section.

**5.** For every question answered, a response record is written to the responses table with: session\_id, question\_id, answer\_code, tense\_frame, question\_module, property\_id, and timestamp.

**6.** For every 'None of these fit' selection, a record is written to the none\_flags table.

**7.** On session completion, is\_complete = true is written to the sessions table. The completeness ratio is calculable from the response records.

**8.** During Sprint 6 monitoring, the Lead Researcher reviews Supabase session counts daily. Participation metrics distinguish three states: (a) complete sessions (is\_complete = true), (b) active incomplete sessions (is\_complete = false, local storage token present — potential resume), (c) abandoned sessions (is\_complete = false, no active token — respondent will not return). Abandoned sessions are not counted as active participants. **★ updated**

**9.** At pilot close, the final CSV export is produced and cross-checked against Supabase session counts before the debrief report is written.

**EXTENSION 1 — Tense frame inconsistency detected**

**1a** A response record exists with a tense\_frame value that does not match the sessions table tense\_frame for that session\_id.

**1b** This is a data quality failure. The affected session is flagged as invalid.

**1c** Root cause is investigated. The bug causing the inconsistency is fixed before the next session completes.

**1d** The affected session is excluded from the research dataset. Documented in the debrief report.

**EXTENSION 2 — None-flag count mismatch detected**

**2a** The count of none\_flag records in Supabase does not match the expected count based on PostHog none\_flag\_selected events.

**2b** Data loss is confirmed. This is a Critical bug.

**2c** The pilot is paused if the issue is systemic. Affected sessions are flagged.

**2d** Bug is fixed, fix is verified, pilot resumes.

**EXTENSION 3 — Respondent starts a session and never returns — abandoned session handling ★ NEW v2.0**

**3a** A respondent opens GuestIQ, selects a tier, answers some questions, and closes the browser — never returning.

**3b** The session record exists in Supabase with is\_complete = false. The local storage token may eventually be cleared by the browser.

**3c** In the management dashboard, Panel 1 (Response Overview) displays abandoned sessions separately from active incomplete sessions. An abandoned session is defined as is\_complete = false AND no session resume event has occurred within 72 hours of the last response timestamp.

**3d** Abandoned sessions are NOT counted in the participation rate numerator. They are counted in the denominator as 'sessions started' for completion rate calculation.

**3e** The Lead Researcher documents the abandonment rate in the debrief report. High abandonment rates (> 30% of started sessions) trigger a Phase 2 recommendation on the welcome screen hook or early-episode experience.

## Use Case Slices (Features) — UC-02

| **Use Case Slice (Feature)** | **Stories** | **SP** | **Sprint** |
| --- | --- | --- | --- |
| **Slice 1 — Tense frame data model and application** | S2-07, S2-08 | 6 SP | Sprint 2 |
| **Slice 2 — Data integrity verification protocol (Sprint 2 pass)** | S2-15 | 5 SP | Sprint 2 |
| **Slice 3 — Module 5 routing fidelity verification (84-path matrix)** | S3-02 | 5 SP | Sprint 3 |
| **Slice 4 — Second data integrity pass (post-Sprint 3 full instrument)** | S3-13 | 3 SP | Sprint 3 |
| ***Slice 5 — Abandoned session handling and participation rate methodology ★ new*** | Panel 1 dashboard update (S4-01) | Included in S4-01 SP | Sprint 4 |

## Traceability — UC-02

| **FR / NFR** | **Requirement Summary** |
| --- | --- |
| **FR-015 to FR-018** | Q0 tense routing — tense frame assignment and persistence throughout session |
| **FR-048 to FR-056** | Supabase response record structure — all required fields including tense\_frame |
| **FR-068 (Panel 1)** | Response Overview dashboard panel — must distinguish complete, active incomplete, and abandoned sessions |
| **NFR-006** | Offline queue — zero data loss during outages |
| **NFR-043** | Tense frame accuracy — 100% of questions in correct frame |
| **NFR-044** | Module 5 routing fidelity — 100% match |
| **NFR-045** | None-flag capture fidelity — 100% capture |

**UC-03 Manager Reviews Pilot Analytics**

*Domain: Technical Domain — Management Visibility*

|  |  |
| --- | --- |
| **Actor** | Hotel Management (SH-01) or Lead Researcher (SH-02) accessing the management overlay — either during the pilot for monitoring, or at pilot close for debrief preparation |
| **Goal** | Review the pilot's participation metrics, response distributions, and intent category patterns — in real time, without technical knowledge — and export a summary for the debrief meeting |
| **Scope** | From triggering SHIFT+CTRL+A to exporting a PDF or CSV report. Covers all 9 dashboard panels, the CSV export, the PDF summary report, and mid-pilot daily monitoring. |
| **Preconditions** | At least one complete session record exists in Supabase. The GuestIQ URL is open in the browser. The user knows the SHIFT+CTRL+A shortcut. |
| **Postconditions (success)** | The manager has reviewed live pilot data and exported a summary report. No respondent data has been visible to other front desk PC users after the overlay is closed. |
| **Postconditions (failure)** | Dashboard fails to load (Supabase unreachable). Manager sees a loading error with a Retry option. No partial or stale data is displayed. |
| **Epic Owner** | SH-04 AI Developer |
| **Linked JTBD** | Actor 1 (Hotel Management): 'translates the front desk team's collective knowledge into structured, segmented data — so that operational decisions are made with evidence.' |
| **Priority** | MUST — the management dashboard is a primary pilot success criterion. |

## Basic Scenario — Manager accesses dashboard and exports report

**1.** Manager presses SHIFT+CTRL+A on the GuestIQ screen.

**2.** Management overlay slides over the current screen. The 9 analytics panels load: Response Overview (Panel 1 — distinguishing complete, active incomplete, and abandoned sessions), Intent Distribution, Planning Horizon, Expectation Priorities, Competitive Threat, Service Interaction Spectrum, Value Reference Framework, None Flags, Raw Data. **★ updated**

**3.** All panels display live data from Supabase. No cached or stale data is shown.

**4.** Manager reviews panel data. Navigates between panels using the tab controls.

**5.** Manager selects 'Export CSV'. All session and response data is packaged into a CSV file and downloaded to the PC.

**6.** Manager selects 'Export PDF Report'. A formatted summary report is generated and downloaded — suitable for sharing at the debrief meeting.

**7.** Manager presses ESC or clicks the close button. The overlay closes. The respondent's questionnaire session underneath is exactly as it was — undisturbed.

**EXTENSION 1 — Dashboard loads with no data or insufficient data for inference**

**1a** Manager opens dashboard. Zero complete sessions exist in Supabase yet, OR fewer than the minimum threshold exist for statistically reliable inference.

**1b** If zero sessions: panels display 'No data yet — waiting for the first completed session' messaging. Refresh button shown.

**1c** If below minimum threshold (default: fewer than 5 complete sessions): panels display data alongside a visible warning: 'Warning: fewer than 5 sessions — patterns shown are preliminary and should not be treated as reliable. Continue collecting data before drawing conclusions.'

**1d** The minimum threshold warning does not block export. The manager may still export CSV or PDF, which includes the warning text in the PDF header.

**EXTENSION 2 — CSV or PDF export fails ★ NEW v2.0**

**2a** Manager clicks Export CSV or Export PDF. The generation process fails — zero-byte file produced, JavaScript error during generation, or download does not trigger.

**2b** The export button shows an error state: 'Export failed — please try again.' A Retry button is shown.

**2c** Sentry captures the export error with full context (session count, browser, error type).

**2d** If retry also fails: manager is instructed to access the Supabase Table Editor directly as a fallback data retrieval method. The Lead Researcher is notified via Sentry alert.

**EXTENSION 3 — Insufficient data for reliable inference — minimum sessions threshold ★ NEW v2.0**

**3a** See Extension 1c above. This extension elaborates the researcher implications.

**3b** For any analysis relying on cross-segment comparison (e.g. intent category distribution), a minimum of 3 sessions per segment is required for the comparison to be meaningful. The dashboard does not enforce this but annotates segments below threshold with '(n < 3 — unreliable)'.

**3c** In the debrief report, the Lead Researcher documents which findings are from adequately-sampled segments and which are preliminary. This is a standard research validity disclosure.

**EXTENSION 4 — Mid-pilot monitoring — manager checks during pilot, not only at debrief ★ NEW v2.0**

**4a** During the pilot window (Sprint 5–6), the Lead Researcher checks the dashboard daily using SHIFT+CTRL+A on any available front desk PC browser.

**4b** The primary monitoring check: Panel 1 session count — new complete sessions since yesterday. Compared against the 70% participation target (7/10 staff).

**4c** Secondary check: PostHog funnel (accessed separately via posthog.com) — app\_loaded → tier\_selected → session\_completed. Drop-off at each episode visible.

**4d** If participation is below target at Day 5: Lead Researcher sends the mid-pilot follow-up MS Teams message per Risk R-03 mitigation.

**4e** Mid-pilot monitoring is a daily lightweight use of the dashboard — not a full review session. It requires only Panel 1 to be checked.

## Use Case Slices (Features) — UC-03

| **Use Case Slice (Feature)** | **Stories** | **SP** | **Sprint** |
| --- | --- | --- | --- |
| **Slice 1 — Dashboard overlay shell and SHIFT+CTRL+A trigger** | S4-01 (partial) | 5 SP | Sprint 4 |
| **Slice 2 — All 9 analytics panels with live Supabase data** | S4-01 (partial) | 8 SP | Sprint 4 |
| **Slice 3 — CSV export and PDF summary report** | S4-02 | 8 SP | Sprint 4 |
| **Slice 4 — Dashboard QA and PostHog event verification** | S4-07 (partial) | 3 SP | Sprint 4 |
| ***Slice 5 — Mid-pilot monitoring scenario and minimum-data warnings ★ new*** | S4-01 AC update | Included in S4-01 SP | Sprint 4 |

## Traceability — UC-03

| **FR / NFR** | **Requirement Summary** |
| --- | --- |
| **FR-065 to FR-077** | Management dashboard — all 9 panels, data queries, and display requirements. Panel 1 must distinguish complete / active incomplete / abandoned sessions (v2.0). |
| **FR-078 to FR-080** | CSV export and PDF report generation. Export failure handling added (v2.0 Extension 2). |
| **NFR-004** | Dashboard renders all 9 panels within 5 seconds at 100 sessions |
| **NFR-013** | Dashboard overlay is the only management access path — no /admin URL |
| **NFR (new)** | Minimum-data warning displayed when complete session count is below 5 — prevents over-interpretation of preliminary data |

**UC-04 Data is Stored, Versioned, and Protected**

*Domain: Technical Domain — Data Infrastructure*

|  |  |
| --- | --- |
| **Actor** | System (automated — no human actor triggers this use case; it runs on every session interaction) |
| **Goal** | Every response, session, scale answer, and none-flag is persistently stored in Supabase with correct structure, protected by RLS, versioned via migrations, and recoverable in the event of accidental deletion or outage |
| **Scope** | From application boot through all write operations during sessions to the final pilot CSV export. Covers the 4-table schema, RLS policies, migrations, offline queue, RLS misconfiguration detection, and weekly backup. |
| **Preconditions** | Supabase project exists. Schema has been applied via migrations. RLS policies are active. Environment configuration is correct. |
| **Postconditions (success)** | All pilot data is in Supabase. Schema is version-controlled. Data is recoverable from weekly CSV backup if Supabase is lost. |
| **Postconditions (failure)** | A write fails. The offline queue catches the failure. Data is preserved locally and retried. No data is lost. RLS rejection is caught by Sentry and logged as a critical error. |
| **Epic Owner** | SH-04 AI Developer |
| **Linked JTBD** | Actor 2 (Lead Researcher): 'research-grade guest expectation data — publishable and operationally useful.' |
| **Priority** | MUST — data loss is Risk R-06 (Medium). This use case is the structural mitigation. |

## Basic Scenario — Continuous data write and protection throughout pilot

**1.** On application load, the Supabase client initialises using credentials from the .env environment file.

**2.** On session start, a record is written to the sessions table: session\_id (UUID), property\_id, tier, tense\_frame (null until Q0 answered), intent\_category (null until Q1 answered), started\_at.

**3.** On each question answer, a response record is written to the responses table.

**4.** On each scale response, a record is written to the scale\_responses table.

**5.** On each 'None of these fit' selection, a record is written to the none\_flags table.

**6.** On session completion, is\_complete = true is written to the sessions table.

**7.** All writes pass through the Supabase service layer (src/services/supabase.js). No component writes directly.

**8.** During Sprint 6, weekly CSV exports are saved to OneDrive as a backup against accidental Supabase deletion.

**EXTENSION 1 — Write failure during active session — network error or service issue**

**1a** A Supabase write fails (network error, service issue).

**1b** The failed write is queued in browser local storage by the offline queue mechanism.

**1c** The queue retries every 30 seconds. The respondent continues answering questions.

**1d** When connectivity is restored, all queued writes are flushed to Supabase in order.

**EXTENSION 2 — Supabase RLS rejects a write — misconfiguration causes silent data loss risk ★ NEW v2.0**

**2a** A Supabase write returns a permission denied error — the RLS policy is too restrictive and blocks the anon key write.

**2b** Unlike a network error, an RLS rejection is a definitive error (HTTP 403/400), not a transient failure. The offline queue should NOT retry indefinitely — this is a configuration error, not a connectivity problem.

**2c** The service layer (src/services/supabase.js) catch block detects an RLS error by inspecting the error code. It calls Sentry.captureException() with context: function\_name, session\_id, error\_code = 'RLS\_REJECTION'.

**2d** Sentry sends an immediate alert to the Lead Researcher. The alert priority is CRITICAL — this is a data loss scenario.

**2e** The Lead Researcher reviews the Supabase RLS policy configuration. The correct policy is: anon key can INSERT into all 4 tables; anon key cannot SELECT other sessions' records.

**2f** Fix is applied, redeployed, and verified by running the Sprint 2 data integrity protocol (S2-15) against the live deployment before pilot continues.

## Use Case Slices (Features) — UC-04

| **Use Case Slice (Feature)** | **Stories** | **SP** | **Sprint** |
| --- | --- | --- | --- |
| **Slice 1 — 4-table Supabase schema via Migrations** | S2-01 | 5 SP | Sprint 2 |
| **Slice 2 — Service layer, RLS policies, and security configuration** | S2-12 (partial), S2-17 | 8 SP | Sprint 2 |
| **Slice 3 — Environment configuration and feature flags** | S2-13 | 5 SP | Sprint 2 |
| **Slice 4 — Auth bypass and user\_id nullable column** | S2-14 | 3 SP | Sprint 2 |
| **Slice 5 — Weekly CSV backup protocol** | S6-01 | 2 SP | Sprint 6 |
| **Slice 6 — Final data export and integrity check** | S6-02 | 3 SP | Sprint 6 |
| **Slice 7 — Project close and artifact archiving** | S6-05 | 1 SP | Sprint 6 |

## Traceability — UC-04

| **FR / NFR** | **Requirement Summary** |
| --- | --- |
| **FR-048 to FR-056** | 4-table Supabase schema — sessions, responses, scale\_responses, none\_flags |
| **FR-057 to FR-060** | Service layer — all writes through src/services/supabase.js. RLS rejection handling added v2.0. |
| **FR-086 to FR-093** | Environment configuration, feature flags, auth bypass |
| **NFR-010 to NFR-014** | Security — HTTPS, .env credentials, RLS active, management access control, zero PII |
| **NFR-030 to NFR-032** | Scalability — property\_id in all records, user\_id nullable, migration-based schema versioning |
| **NFR-006** | Offline queue — zero data loss for network failures up to 60 minutes. RLS rejections handled separately (Sentry alert, not queue retry). |

**UC-05 Questionnaire Content is Managed Without Code Changes**

*Domain: Technical Domain — Content Management*

**★ CHANGED v2.0: v2.0 STRUCTURAL REWRITE: The basic scenario in v1.1 described the AI Developer performing the Strangler Fig migration — a developer task. The correct Use Case 3.0 basic scenario must follow the named actor (Lead Researcher) achieving their stated goal (editing content without code). The developer migration is now correctly placed in Preconditions. The basic scenario now describes the researcher's experience.**

|  |  |
| --- | --- |
| **Actor** | Lead Researcher (content editor) — the person who needs to correct a question, reword an answer option, or adjust a taxonomy code after the prototype is deployed, without writing code or involving the AI Developer |
| **Goal** | Edit questionnaire content (questions, answer options, taxonomy codes, UI copy) without writing code, making a Pull Request, or requiring developer involvement — while the deployed application continues running correctly and the change is live within minutes |
| **Scope** | The researcher's content editing experience after the Phase 1b migration is complete. Covers: opening a JSON configuration file, making an edit, committing the change, and verifying the live application reflects the edit. The developer's Strangler Fig migration that enables this is a precondition, not the use case. |
| **Preconditions** | Phase 1a: questionnaire.js is approved and complete (Sprint 1). Phase 1b: AI Developer has completed the Strangler Fig migration — all 79 questions, answer options, taxonomy codes, episode structure, tier assignments, branching rules, and UI copy now live in 6 JSON configuration files (questions.json, episodes.json, tiers.json, ui-copy.json, branching.json, taxonomy.json). GitHub repository is accessible to the Lead Researcher. The configuration validator is active on every application load. GitHub Actions deploys changes within 2 minutes of commit. |
| **Postconditions (success)** | The edited content is live at guestiq.github.io within 2 minutes of the commit. The configuration validator confirms the JSON is well-formed. The application renders the updated question or answer text correctly. No code change was required. |
| **Postconditions (failure)** | A malformed JSON file causes the configuration validator to fail loudly on load. No respondent ever sees a broken questionnaire — they see a clear 'configuration error' screen. The researcher reverts to the last committed version via a single Git command. Application restored within 2 minutes. |
| **Epic Owner** | SH-04 AI Developer (for the enabling infrastructure) — the goal itself is owned by SH-02 Lead Researcher |
| **Linked JTBD** | Actor 2 (Lead Researcher): research instrument refinement between pilot runs is a Phase 2 objective; this use case makes it technically feasible without developer dependency. |
| **Priority** | MUST — the Strangler Fig migration is a Sprint 0 charter objective and the precondition for this use case. |

## Basic Scenario — Lead Researcher edits questionnaire content and verifies the change is live

**1.** The Lead Researcher identifies a content change needed — for example, the wording of a question option in Q1 should be clearer based on Phase 1 pilot feedback.

**2.** The Lead Researcher opens the relevant JSON configuration file in a text editor. For a question text change: questions.json. For UI copy: ui-copy.json. For branching rules: branching.json. Files are in the GitHub repository.

**3.** The Lead Researcher locates the specific question or option using the question ID (e.g. 'id': 'Q1') and edits the text field. The JSON structure is self-documenting — field names are descriptive and no programming knowledge is needed to understand which field to edit.

**4.** The Lead Researcher saves the file and commits the change to the main branch with a brief commit message (e.g. 'Update Q1 option A wording for clarity').

**5.** GitHub Actions CI/CD pipeline triggers automatically. The application is rebuilt and redeployed to guestiq.github.io within 2 minutes.

**6.** The Lead Researcher opens guestiq.github.io in their browser and verifies the updated wording is visible. The change is live with no code written and no developer involvement required.

**EXTENSION 1 — Malformed JSON detected at application load**

**1a** The Lead Researcher accidentally introduces a JSON syntax error (unclosed bracket, missing comma, incorrect encoding) during editing.

**1b** GitHub Actions deploys the change. On the next application load, the configuration validator detects the malformed file before any respondent-facing content renders.

**1c** A clear error screen is shown: 'Configuration error — [filename].json is malformed. Please check the file and reload.'

**1d** No respondent ever sees the questionnaire in a broken state. The error screen prevents rendering.

**1e** The Lead Researcher runs: git revert HEAD (single command). GitHub Actions redeploys the previous version within 2 minutes. Application restored.

**EXTENSION 2 — Researcher commits a syntactically valid JSON edit but the change has a logic error ★ NEW v2.0**

**2a** The Lead Researcher edits a question option code (e.g. changes 'A' to 'A1'). The JSON is valid — the configuration validator passes. But downstream logic (taxonomy coding, none-flag association, PostHog event properties) depends on the original option codes.

**2b** The application loads correctly, but response records using the new code ('A1') are not mapped correctly to taxonomy categories in the analysis.

**2c** This is a logic error, not a syntax error. The configuration validator cannot catch it. The Lead Researcher must verify semantic correctness after any structural change (option codes, question IDs, routing rules).

**2d** Recovery: revert the change via Git. For Phase 1, option codes and question IDs should be treated as immutable identifiers — only text fields and UI copy should be edited without careful cross-system checking.

**2e** Phase 2 recommendation: a content editing interface (visual admin CMS) with validation of option code uniqueness and routing rule integrity will prevent this class of error.

## Use Case Slices (Features) — UC-05

| **Use Case Slice (Feature)** | **Stories** | **SP** | **Sprint** |
| --- | --- | --- | --- |
| **Slice 1 — questionnaire.js data structure specification (Phase 1a — developer task enabling the UC)** | S1-08 | 5 SP | Sprint 1 |
| **Slice 2 — Phase 1b JSON extraction — Strangler Fig migration (developer task — precondition for this UC)** | S3-11 | 8 SP | Sprint 3 |
| **Slice 3 — Phase 1b identical-behavior verification** | S3-12 | 5 SP | Sprint 3 |
| **Slice 4 — Configuration validator (catches syntax errors before respondents are affected)** | S3-11 (partial) | 3 SP | Sprint 3 |

## Traceability — UC-05

| **FR / NFR** | **Requirement Summary** |
| --- | --- |
| **FR-028** | questionnaire.js 13-field data structure specification (Phase 1a) |
| **FR-083 to FR-085** | Phase 1b JSON extraction — 6 config files, configuration validator, questionnaire.js retained as reference |
| **NFR-034** | All text in i18next locale files — zero hardcoded strings in components (enables content editing without code changes) |

**UC-06 Pilot Debrief and Post-Pilot Reporting**

*Domain: Research Domain — Output and Closure*

*⚑ Academic note: This UC merges two distinct goals: (1) the Lead Researcher producing analytical findings, and (2) Hotel Management receiving and acting on those findings. These would be separate UCs in a stricter model. The merge is acceptable at Phase 1 project scale.*

|  |  |
| --- | --- |
| **Actor** | Lead Researcher (author of debrief report) and Hotel Management (audience of debrief meeting) |
| **Goal** | Transform the pilot dataset into at least 3 actionable operational insights for hotel management, and produce a debrief report that supports the Phase 2 continuation decision |
| **Scope** | From pilot close (Sprint 6 Day 14) through the debrief meeting and Phase 2 decision. Covers the final data export, PostHog funnel analysis, debrief report, and Phase 2 recommendations document. |
| **Preconditions** | The pilot window has closed. At least 5 complete sessions exist in Supabase. The management dashboard is accessible. All artifacts are filed. If academic publication is intended: IRB determination (exemption or approval) has been obtained before the pilot began and is on file. |
| **Postconditions (success)** | Debrief report delivered to hotel management. At least 3 operational insights identified. Phase 2 continuation decision made (yes / no / deferred) and documented in writing. |
| **Postconditions (failure)** | Participation below minimum threshold (fewer than 5 complete sessions). Debrief proceeds with available data. Success criteria adjusted per Risk R-03 contingency plan. |
| **Epic Owner** | SH-02 Lead Researcher |
| **Linked JTBD** | Actor 1 (Hotel Management): 'operational decisions made with evidence'. Actor 2 (Lead Researcher): 'publishable findings'. |
| **Priority** | MUST — the debrief meeting and Phase 2 decision are Sprint 6 gate conditions. |

## Basic Scenario — Debrief report and Phase 2 decision

**1.** At pilot close, the Lead Researcher produces the final CSV export from the management dashboard and saves to OneDrive.

**2.** PostHog funnel analysis is run: app\_loaded → tier\_selected → session\_completed. Drop-off rates per episode extracted. Abandonment rate calculated.

**3.** The Lead Researcher analyses the Supabase data: participation rate (complete sessions / invited staff), completion rate (complete / started), tier distribution, intent category distribution, none-flag rates per question, and aggregate response patterns.

**4.** At least 3 actionable operational insights are identified — specific, practical, grounded in the response patterns.

**5.** The Pilot Debrief Report is produced: methodology summary, participation metrics (including abandonment rate), key findings by intent category, none-flag analysis, PostHog engagement data, 3+ operational insights, Phase 2 recommendations, and (if applicable) a note on IRB path and publication eligibility.

**6.** The 45-minute debrief meeting is conducted with hotel management. Findings are presented. Phase 2 decision is made and recorded in writing.

**7.** All project artifacts are filed in the Approved folder structure. Sprint 6 retrospective is completed.

**EXTENSION 1 — Participation below minimum — fewer than 5 complete sessions**

**1a** At pilot close, fewer than 5 complete sessions exist.

**1b** Risk R-03 contingency is activated. The barrier is documented as a research finding.

**1c** Debrief proceeds with available data. Success criteria are adjusted and the adjustment is noted in the report.

**1d** Phase 2 decision includes a recommendation on how to improve participation.

## Use Case Slices (Features) — UC-06

| **Use Case Slice (Feature)** | **Stories** | **SP** | **Sprint** |
| --- | --- | --- | --- |
| **Slice 1 — Final data export and PostHog funnel analysis** | S6-02 | 3 SP | Sprint 6 |
| **Slice 2 — Pilot Debrief Report production** | S6-03 | 5 SP | Sprint 6 |
| **Slice 3 — Debrief meeting and Phase 2 decision** | S6-04 | 2 SP | Sprint 6 |
| **Slice 4 — Phase 2 Recommendations Document and Velocity Review** | S6-06 | 1 SP | Sprint 6 |

## Traceability — UC-06

| **FR / NFR** | **Requirement Summary** |
| --- | --- |
| **FR-065 to FR-080** | Management dashboard — analytics panels, CSV export, PDF report (primary source for debrief data) |
| **FR-096** | Phase 2 Recommendations Document |
| **NFR-041** | Sentry Core Web Vitals data for performance section of debrief |
| **NFR-042** | PostHog session replay — qualitative engagement evidence for debrief |

**UC-07 GuestIQ is Deployed, Accessible, and Observed**

*Domain: Technical Domain — PWA Shell and Delivery*

*⚑ Academic note: This UC merges two actor goals: (A) CI/CD deployment — developer-initiated, goal: application is live after every code push; (B) real-time monitoring — researcher-initiated, goal: know immediately if something breaks. In a stricter UC model these would be separate. The merge is acceptable at Phase 1 scale.*

|  |  |
| --- | --- |
| **Actor** | Lead Researcher (deployer and observer) — the person who deploys the application, monitors its health, and responds to errors during the pilot |
| **Goal** | The application is live at guestiq.github.io?property=PROP001, deploys automatically on every code push, runs without IT involvement on front desk Windows PCs, and provides real-time observability through Sentry and PostHog |
| **Scope** | From initial GitHub Pages deployment (Sprint 2) through the end of the pilot (Sprint 6). Covers the React PWA shell, GitHub Actions CI/CD, Sentry error tracking, PostHog analytics, front desk PC verification, and mid-pilot monitoring. |
| **Preconditions** | GitHub Pages configured. GitHub Actions workflow exists. URL accessible. Sentry and PostHog initialised. |
| **Postconditions (success)** | Application is live, monitored, and stable throughout the pilot. Lead Researcher receives Sentry alerts within 60 seconds of any unhandled error. |
| **Postconditions (failure)** | GitHub Pages goes offline. Lead Researcher is notified by Sentry. Contingency: cached PWA version may serve the application from browser cache. |
| **Epic Owner** | SH-04 AI Developer |
| **Linked JTBD** | Actor 2 (Lead Researcher): 'prove that a gamified, episodic digital instrument can collect research-grade data at higher completion rates'. The deployment infrastructure makes this proof possible. |
| **Priority** | MUST — zero-IT-involvement deployment is a charter constraint. This use case is its implementation. |

## Basic Scenario — Continuous deployment and monitoring throughout pilot

**1.** Developer pushes code to the main branch of the GitHub repository.

**2.** GitHub Actions CI/CD pipeline triggers automatically: ESLint runs (zero errors required), Prettier check, Vite production build, deployment to GitHub Pages.

**3.** The application is live at guestiq.github.io?property=PROP001 within 2 minutes of the push.

**4.** Sentry initialises on the first page load of each session. Core Web Vitals captured. Any unhandled JavaScript error reported within 60 seconds.

**5.** PostHog initialises on the first page load. All 27 canonical events fire at their specified points.

**6.** Lead Researcher receives Sentry error alert emails. PostHog weekly digest emailed. Both dashboards accessible at any time during the pilot.

**7.** During Sprint 4, the Lead Researcher verifies the application on each of the 3 front desk PCs: full Amateur flow, session data in Supabase, dashboard, Edge and Chrome.

**EXTENSION 1 — Critical error detected by Sentry during pilot**

**1a** An unhandled JavaScript error occurs on a front desk PC during the pilot.

**1b** Sentry captures the error with full stack trace, browser details, and session context. Alert email sent within 60 seconds.

**1c** Lead Researcher triages: is it affecting multiple users? Is it a data loss risk?

**1d** If Critical: fix deployed within 24 hours per Risk R-07. Affected respondents notified via MS Teams.

**1e** If Medium or Low: bug logged and scheduled for next deployment. Pilot continues.

**EXTENSION 2 — Mid-pilot monitoring — PostHog used for real-time participation tracking ★ NEW v2.0**

**2a** During the pilot (Sprint 5–6), the Lead Researcher checks PostHog daily for the participation funnel: app\_loaded → tier\_selected → session\_completed.

**2b** PostHog provides episode-level drop-off data: which episodes have the highest abandonment rates. This is operationally actionable data available DURING the pilot, not only at debrief.

**2c** If any episode shows > 50% drop-off: Lead Researcher flags for investigation. Common causes: question difficulty spike, gamification fatigue, shift interruption pattern.

**2d** PostHog session replay (if enabled, NFR-042) allows the Lead Researcher to watch anonymised session recordings and identify UX friction points in real time.

**2e** Findings from mid-pilot PostHog monitoring are incorporated into the debrief report as a 'real-time engagement analysis' section.

## Use Case Slices (Features) — UC-07

| **Use Case Slice (Feature)** | **Stories** | **SP** | **Sprint** |
| --- | --- | --- | --- |
| **Slice 1 — Architecture documents and Sprint 1 approvals** | S1-01 to S1-11 | 26 SP | Sprint 1 |
| **Slice 2 — React PWA project structure and initial deployment** | S2-04, S2-05 | 5 SP | Sprint 2 |
| **Slice 3 — Sentry and PostHog initialisation** | S2-02, S2-03 | 5 SP | Sprint 2 |
| **Slice 4 — Cross-browser QA and front desk PC verification** | S4-03, S4-04 | 5 SP | Sprint 4 |
| **Slice 5 — Playwright visual regression baseline** | S4-06 | 3 SP | Sprint 4 |
| **Slice 6 — PostHog events and Sentry completeness check** | S4-07 | 3 SP | Sprint 4 |
| **Slice 7 — UAT facilitation and pilot launch** | S5-01, S5-02, S5-03, S5-04 | 10 SP | Sprint 5 |
| **Slice 8 — Pilot monitoring and bug response (incl. mid-pilot PostHog monitoring)** | S5-05, S5-06, S5-07, S5-08 | 8 SP | Sprint 5–6 |
| **Slice 9 — Accessibility, performance, mobile compatibility, code quality** | S3-10, S3-15, S4-08, S4-09, S4-10, S2-16, S2-19 | 18 SP | Sprint 2–4 |

## Traceability — UC-07

| **FR / NFR** | **Requirement Summary** |
| --- | --- |
| **FR-082** | GitHub Actions CI/CD — automatic deployment on every push to main branch |
| **FR-086 to FR-096** | Environment configuration, feature flags, property\_id, Supabase Migrations, Phase 2 recommendations |
| **NFR-001 to NFR-005** | Performance — load times, bundle size |
| **NFR-021 to NFR-024** | Browser compatibility — Edge, Chrome, Windows, mobile secondary |
| **NFR-035 to NFR-042** | Code quality, ESLint, Prettier, Sentry 100% capture, PostHog 27 events, session replay |

# 4. USE CASE ↔ FR/NFR MASTER TRACEABILITY

This table provides a consolidated mapping of every Use Case to its primary functional and non-functional requirements. Rows updated in v2.0 reflect additions from the coverage critique.

| **UC** | **Primary FRs** | **Primary NFRs** |
| --- | --- | --- |
| **UC-01** | FR-001 to FR-047, FR-048 to FR-064 | NFR-015 (voluntary participation notice), NFR-016 to NFR-020, NFR-043, NFR-044, NFR-045 |
| **UC-02** | FR-015 to FR-018, FR-048 to FR-056, FR-065 to FR-068 (incomplete session display) | NFR-006, NFR-043, NFR-044, NFR-045 |
| **UC-03** | FR-065 to FR-081 | NFR-004 (minimum-data warning), NFR-013 |
| **UC-04** | FR-048 to FR-060, FR-086 to FR-093 | NFR-006, NFR-010 to NFR-014, NFR-025 to NFR-032 |
| **UC-05** | FR-028, FR-083 to FR-085 | NFR-034 |
| **UC-06** | FR-065 to FR-080, FR-096 | NFR-041, NFR-042 |
| **UC-07** | FR-082, FR-086 to FR-096 | NFR-001 to NFR-005, NFR-021 to NFR-024, NFR-035 to NFR-042 |

# 5. RESEARCH ETHICS AND IRB PATH ANALYSIS

**★ NEW v2.0: This section is new in v2.0. It was added following recognition that the current privacy notice (FR-008) does not address voluntary participation, and that the JTBD statement for the Lead Researcher includes publishable findings — which requires IRB clearance or a documented exemption determination.**

## 5.1 Research Classification

GuestIQ is a minimal-risk survey research instrument administered to working adults (hotel front desk staff) on professional knowledge and perceptions. The research topic involves no sensitive personal data, no health or financial information, and no individually identifiable responses. Under the US Common Rule (45 CFR 46) and most equivalent international frameworks, this research profile qualifies for expedited review or exemption determination rather than full IRB review.

## 5.2 Current State of Privacy and Consent

FR-008 currently requires the privacy notice text: 'All answers are anonymous. Your responses contribute to aggregate research only.' This is a notice — it informs respondents about data use. It is not consent — it does not obtain agreement, does not state that participation is voluntary, and does not state that declining carries no consequence.

For internal operational research (Scenario A below), this notice is adequate. For research intended for academic publication (Scenarios B and C), the notice must be upgraded and an IRB determination must be obtained before data collection begins.

## 5.3 Three IRB Path Scenarios

| **Scenario** | **IRB Path** | **UX Requirement** | **Publication Outcome** |
| --- | --- | --- | --- |
| A — Internal operational only | No IRB submission | Privacy notice (current FR-008) is sufficient. Add 'voluntary' language. | Not publishable in academic journals |
| B — IRB exemption determination | Submit for exemption determination under Common Rule Category 2. Office issues determination letter. | Privacy notice upgraded to include explicit voluntary participation and no-consequence statement. | Publishable with IRB exemption letter on file |
| C — IRB expedited review | Submit for expedited review (if scope expands, population changes, or IRB requests full review) | Active consent mechanism required in the UX — a genuine 'I agree to participate' action before Q0. | Publishable with IRB approval number |

## 5.4 Recommendation

**⚠ The Lead Researcher must make the IRB path decision before the pilot launches. This decision cannot be made retrospectively — IRB offices will not certify research that was conducted without prior review or exemption determination.**

If Scenario B (IRB exemption) is pursued — which is the recommended path if publication is intended — the following changes are required in the application before pilot launch:

(1) FR-008 text must be updated to include explicit voluntary language: 'Participation is voluntary. You may close this page at any time without consequence.' This change is already reflected in UC-01 Basic Scenario Step 2 of this document.

(2) A 'Not now' or 'Close' text link should be visible on the welcome screen — not as a required UX element, but as an unambiguous signal that non-participation is genuinely acceptable. UC-01 Extension 5 documents this interaction.

(3) The debrief report should document the IRB exemption determination letter number and the voluntary participation mechanism implemented.

*⚑ Academic note: Scenario B (IRB exemption) does not require a consent form, does not require respondents to sign anything, and does not meaningfully increase the respondent's experience burden. It requires one submission to the IRB office (typically a 1-2 page form), one determination letter from the IRB (typically within 2 weeks for exempt studies), and minor text updates to the privacy notice. The effort is low relative to the benefit: the Phase 1 dataset becomes publishable.*

# 6. WORK HIERARCHY — HOW USE CASES BECOME BACKLOG STORIES

Under Use Case 3.0, the work hierarchy has four levels. This section shows exactly how each level maps to GuestIQ artifacts and sprint delivery.

| **Level** | **UC 3.0 Term** | **GuestIQ Example** | **Notes** |
| --- | --- | --- | --- |
| **EPIC** | Use Case | UC-01 Respondent Completes the Questionnaire | Complete user journey. Spans multiple sprints. Has a named actor and goal. |
| **FEATURE** | UC Slice | Slice 3 — Module 5 branching (all 7 sub-sections) | Staged, implementable path through the UC. Bounded to one sprint. |
| **STORY** | Work Item | S3-01: Build Module 5 — all 7 sub-sections | Sprint-sized deliverable in standard format. Must satisfy DoR/DoD. |
| **TASK** | Implementation Detail | Write branching logic for WORK-TRANS path | Sub-day item. Internal to the session. Not tracked in the backlog. |

ℹ The Product Backlog (S0-2.7) groups existing stories under these Use Cases as Epic groupings. The stories themselves do not change — only their Epic parent is formally named.

# 7. VERSION UPDATE LOG

| **Ver.** | **Date** | **By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Dev | Initial version. 7 Use Cases across Research Domain (3) and Technical Domain (4). Each UC has: actor, goal, scope, preconditions, postconditions, basic scenario, 2–4 key extensions, UC Slice table, FR/NFR traceability. Produced BEFORE Product Backlog per Timeline v4.0. |
| **v1.1** | [Sprint 0] | Claude / AI Dev | UC-01 updated for Option B UX redesign: single unified welcome screen, Q0 as first instrument question, enrichment screen post-completion. UC-02 FR-015 trace row updated. UC-03 through UC-07 unchanged. |
| **v2.0** | [Sprint 0] | Claude / AI Dev | Full critique-driven revision. UC-01: Extension 4 completed (decline path added), Extension 5 added (non-participation), Extension 6 added (Q0 Option D), Slice 9 added, FR-008 voluntary language noted. UC-02: academic framing note added, Extension 3 added (abandoned session), Slice 5 added. UC-03: Extensions 2/3/4 added (export failure, minimum-data warning, mid-pilot monitoring), Slice 5 added. UC-04: Extension 2 added (RLS silent rejection). UC-05: MAJOR REWRITE — basic scenario now correctly follows Lead Researcher actor achieving their goal; developer migration moved to preconditions; Extension 2 added (logic error in valid JSON). UC-06: IRB path note added to preconditions. UC-07: Extension 2 added (mid-pilot monitoring). New Section 5 — Research Ethics and IRB Path Analysis. Master traceability table updated. Version log updated. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF USE CASE SPECIFICATIONS v2.0 —**

*GuestIQ · Use Case Specifications v2.0 · S0-2.5 · Sprint 0 Artifact · 7 Use Cases · 9 new extensions · IRB ethics section added · Confidential*