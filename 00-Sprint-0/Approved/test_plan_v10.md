**TEST PLAN**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-4.1 — Sprint 0 Artifact · Backlog Story S0-10 |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Test Strategy** | Behaviour-Driven TDD — Option A: three primary instruments |
| **Testing Instruments** | (1) 84-path branching test matrix · (2) Playwright visual regression baseline · (3) Data integrity verification protocol |
| **NFRs Covered** | All 45 NFRs from SRS-NFR v1.2 — sprint traceability in Section 11 |
| **Related Documents** | SRS-F v2.0 · SRS-NFR v1.2 · UC Specs v2.0 · Branching Logic Spec (S1-2.1) · Observability Spec (S0-3.3) |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Test-Plan-v1.0.docx |

INFO: This Test Plan governs testing across all 6 sprints. It is read once in Sprint 0 and referenced at the start of each sprint during the Scrum Master checklist. The 84-path branching test matrix (Section 4) is produced as a separate Sprint 1 artifact (S1-2.1) and cross-referenced here.

**WARN: The Branching Logic Specification with 84-path test matrix is the single most critical testing artifact in this project. It must be approved before Sprint 2 begins. A routing error discovered during the pilot — with real respondents — costs days of damage control. The same error found during Sprint 3 testing costs 30 minutes.**

# 1. Testing Strategy and Philosophy

GuestIQ uses Behaviour-Driven TDD — Option A, as specified in the Methodology Document v1.1. This means: test specifications precede implementation, tests are written in behavioural terms (what the system does from the user's perspective, not how the code works internally), and the three primary test instruments are created before the code they test.

Option A was selected over micro-level unit testing (Option B) because GuestIQ is a research instrument, not a general-purpose application. Its complexity lies in routing logic and data integrity — not in individual pure functions. The most catastrophic failure mode is routing a respondent to the wrong Module 5 sub-section and collecting invalid research data. The 84-path test matrix is explicitly designed to catch this.

## 1.1 The Three Primary Test Instruments

| **Instrument** | **Purpose** |
| --- | --- |
| **84-path branching test matrix** | The single most important testing artefact. Produced in Sprint 1 (S1-2.1) before any routing code is written. 84 paths covering all combinations of tier, intent category, and tense frame. Every path specifies: input state + expected Module 5 sub-section. Executed in Sprint 3 (S3-1.3) after Module 5 is built. Re-executed after Phase 1b migration (S3-12). This matrix is the contract between the Branching Logic Specification and the implemented code. |
| **Playwright visual regression baseline** | Configured in Sprint 4 (S4-2.8). Screenshots of 8 key screens captured as baseline after full visual design is confirmed correct. All subsequent deployments are compared against these baselines — any visual change triggers a CI/CD pipeline failure. This instrument protects against accidental visual regressions during Sprint 5 fixes and Sprint 6 pilot patches. |
| **Data integrity verification protocol** | Executed in Sprint 2 (S2-15) and Sprint 3 (S3-13). Traces 5 complete sessions end-to-end from UI selection through Supabase record. Verifies tense frame accuracy (NFR-043), Module 5 routing fidelity (NFR-044), and none-flag capture fidelity (NFR-045). These three NFRs are research data quality requirements — not software performance requirements. |

## 1.2 Additional Test Types

Beyond the three primary instruments, the following test types apply at specific sprints:

| **Test Type** | **When and What** |
| --- | --- |
| **Functional / integration testing** | Manual test cases executed by the Lead Researcher at each sprint gate. Covers all major user flows — welcome screen, tier selection, Q0 routing, episodes, completion, results, dashboard, disambiguation, offline queue, downtime screen. Test cases provided by AI Developer as structured documents at each sprint. |
| **Cross-browser testing** | Manual execution in Edge and Chrome on Windows (primary — NFR-021, NFR-022). On-site testing on actual front desk PCs (NFR-023). Secondary mobile testing in Chrome for Android (NFR-024). Executed in Sprint 4. |
| **Accessibility audit** | WCAG 2.1 AA compliance verification (NFR-016 to NFR-020). Automated scan using axe-core browser extension plus manual keyboard navigation walkthrough. Executed in Sprint 3 (S3-10) and Sprint 4 (S4-2.4). |
| **Performance verification** | Page load and transition times verified against NFR-001 to NFR-005 targets using Sentry Performance data from real user sessions. Executed in Sprint 4 (S4-09). LCP under 2 seconds (p50), TTI under 3 seconds (p50), question transition under 300ms. |
| **Observability verification** | All 27 PostHog events confirmed firing with correct names and properties (NFR-040). Sentry error capture and performance monitoring confirmed active (NFR-039, NFR-041). Executed in Sprint 4 (S4-07). |
| **Offline queue testing** | Chrome DevTools Network throttling simulates Supabase unavailability. Verifies offline queue activates, captures responses, and flushes correctly on reconnection (NFR-006). Executed in Sprint 2 (S2-3.5). |
| **User Acceptance Testing** | 2–3 front desk team members complete questionnaire flows using the UAT Script (S4-3.1). Qualitative feedback on clarity, engagement, and professional appropriateness. Executed in Sprint 5. Critical issues fixed before pilot launch. |
| **Content extraction verification** | After Phase 1b JSON migration (S3-11), 10 questions cross-referenced between questions.json and original questionnaire document. Full 84-path matrix re-executed against JSON-backed application. Executed in Sprint 3 (S3-12). |
| **Security and privacy verification** | No credentials in committed code (NFR-011). RLS policies active on all 4 tables (NFR-012). IP anonymization confirmed in PostHog and Sentry (NFR-025, NFR-027). Zero PII in Supabase (NFR-014). Executed in Sprint 2 and Sprint 4. |
| **Code quality gates** | ESLint zero errors on every commit (NFR-035). Prettier formatting applied on every commit (NFR-036). Zero hardcoded strings in components (NFR-034). Enforced automatically in GitHub Actions CI/CD pipeline from Sprint 2 onwards. |

# 2. Test Scope — In and Out

## 2.1 In Scope

- All 95 functional requirements (FR-001 to FR-098 excluding removed FR-005, FR-006, FR-013) via functional test cases
- All 45 non-functional requirements (NFR-001 to NFR-045) via the traceability schedule in Section 11
- All 84 Module 5 routing paths via the branching test matrix
- Data integrity for all three research data quality NFRs: tense frame accuracy, routing fidelity, none-flag capture
- Cross-browser compatibility: Edge and Chrome on Windows. Secondary: Chrome for Android
- Performance on actual hotel front desk PCs, not only on developer machines
- Offline queue data preservation during network outages
- Session resume and disambiguation across browser close/reopen and shared PC handoff
- Phase 1b JSON migration identical-behavior verification
- Visual regression: 8 key screens after Sprint 4 design confirmation
- UAT: qualitative feedback from 2–3 front desk team members

## 2.2 Out of Scope

- Unit testing of individual functions — not applicable under Behaviour-Driven TDD Option A
- Load testing beyond 50 concurrent users — exceeds Phase 1 pilot scale and free-tier limits are validated by NFR-033 architecture review
- Automated end-to-end testing frameworks (Cypress, Selenium) — Playwright handles visual regression; functional testing is manual
- Penetration testing — not required for an internal prototype with open access
- Multi-language testing — English only in Phase 1
- Multi-property testing — single property (PROP001) in Phase 1
- Guest-facing deployment testing — staff-only in Phase 1
- PMS integration testing — out of scope for Phase 1

# 3. Bug Severity Model and Defect Management

## 3.1 Severity Definitions

| **Severity** | **Definition** | **Response Time** | **Resolution Required Before** |
| --- | --- | --- | --- |
| **Critical** | Application cannot proceed — session cannot be started, completed, or data cannot be written to Supabase. Routing sends respondent to wrong section. | Fix and redeploy within 24 hours. Pilot paused if occurring for >10% of sessions. | Sprint gate / pilot launch |
| **High** | Feature broken but workaround exists, OR data written incorrectly to Supabase (wrong field, wrong value), OR PostHog event not firing. | Fix within the sprint. Sprint gate cannot pass with open High bugs. | Sprint gate |
| **Medium** | Feature partially broken — minor visual error, incorrect text, missing minor element. Data integrity not affected. | Fix in same sprint if time allows. Document and defer to next sprint if not. | Pilot launch (no open High+) |
| **Low** | Cosmetic issue — colour slightly off, spacing inconsistent, text wording suboptimal. No functional impact. | Log and defer to Phase 2. Do not block sprint gate. | Phase 2 Sprint 0 |

## 3.2 Bug Log

The Bug Log is maintained in the project tracking spreadsheet (created in Pre-Sprint step PRE-1.3). The spreadsheet has a dedicated Bug Log tab with columns: Bug ID, Sprint Discovered, Step Discovered, Expected Behaviour, Actual Behaviour, Severity, Assigned To, Resolution, Sprint Resolved.

Bug IDs follow the format: B-[sprint]-[sequence]. Example: B-2-003 is the third bug discovered in Sprint 2. This format makes sprint-of-discovery visible at a glance and simplifies sprint gate verification.

## 3.3 Sprint Gate Bug Resolution Rule

A sprint gate cannot be passed with any open High or Critical severity bugs from that sprint. Open Medium bugs may pass with documented deferral to the next sprint. Open Low bugs are always deferred. This rule is enforced at every sprint gate review.

# 4. 84-Path Branching Logic Test Matrix

The 84-path test matrix is the primary functional test instrument for GuestIQ. It is produced as part of the Branching Logic Specification (Backlog S1-07, Sprint 1 artifact S1-2.1) and referenced here as the authoritative test document for Module 5 routing.

## 4.1 Matrix Derivation — How 84 Paths Are Calculated

| **Component** | **Explanation** |
| --- | --- |
| **Base paths** | 12 intent categories (from Q1 answer codes A through M) x 3 tiers (Amateur, Professional, Expert) = 36 base paths. Each path specifies: a Q1 answer, a tier, and the expected Module 5 sub-section. |
| **Secondary purpose paths** | Q2 (secondary purpose) can trigger routing to a second Module 5 sub-section for Expert tier respondents who select a relevant combination. 6 representative secondary purpose combinations are added to the matrix = 42 paths. |
| **Tense frame variants** | For the 12 key intent-capture paths (Q1 to Q12 = categories A through L), both Retrospective and Anticipatory tense frames are verified — confirming that tense frame selection does not affect Module 5 routing. 42 additional paths (one per base path) = 84 total. |
| **Total** | 84 paths. This is not the universe of all possible combinations — that would be thousands of paths. It is the minimum set sufficient to verify that all 12 intent categories route correctly across all 3 tiers, in both tense frames, including secondary purpose routing. |

## 4.2 Matrix Structure — Column Specification

| **Path ID** | **Tier** | **Intent Category** | **Q1 Answer Code** | **Tense Frame** | **Expected Module 5 Sub-section** |
| --- | --- | --- | --- | --- | --- |
| **PATH-001** | Amateur | WORK-TRANS | A | Retrospective | Module 5A — Work and Business |
| **PATH-002** | Amateur | WORK-EVENT | B | Retrospective | Module 5A — Work and Business |
| **PATH-007** | Amateur | LEIS-PLAN | D | Anticipatory | Module 5B — Leisure Stays |
| **PATH-013** | Amateur | DISP-HOME | G | Retrospective | Module 5C — Displacement and Necessity |
| **PATH-025** | Professional | WORK-TRANS | A | Retrospective | Module 5A — Work and Business |
| **PATH-049** | Expert | WORK-TRANS | A | Both | Module 5A + secondary per Q2 |
| **PATH-083** | Expert | LOC-ESC | L | Anticipatory | Module 5G — Local Escape |
| **[...73 additional paths...]** | ... | ... | ... | ... | ... |

INFO: The full 84-path matrix with all paths populated is produced in Sprint 1 as part of S1-2.1 (Branching Logic Specification). The rows shown above are illustrative only. The complete matrix is approved in Sprint 1 and executed in Sprint 3 step S3-1.3.

## 4.3 Matrix Execution Procedure

| **Execution Pass** | **Procedure** |
| --- | --- |
| **Sprint 3 execution (S3-1.3)** | AI Developer provides the matrix as a structured test script. Lead Researcher executes each path: (1) open the app, (2) select the specified tier, (3) answer Q0 with the specified tense frame, (4) answer Q1 with the specified option code, (5) verify the correct Module 5 sub-section appears as the next question. Full 79-question completion is not required — only Module 5 routing verification. Estimated time: 2 hours. Log any wrong routing as Critical. |
| **Post-Phase-1b re-execution (S3-12)** | After the Strangler Fig migration from questionnaire.js to JSON files, all 84 paths are re-executed to verify the JSON-backed application produces identical routing outcomes. This is the primary acceptance criterion for the Phase 1b migration — a routing change between the two versions is a Critical content error. |
| **Pass criterion** | All 84 paths produce the expected Module 5 sub-section. Zero routing deviations. Sprint 3 gate cannot pass with any open routing failures. |

# 5. Data Integrity Verification Protocol

The data integrity verification protocol traces complete sessions end-to-end — from the respondent's UI selections through to the exact records written in Supabase — and verifies three research data quality requirements: tense frame accuracy (NFR-043), Module 5 routing fidelity (NFR-044), and none-flag capture fidelity (NFR-045).

This protocol is executed three times across the project: Sprint 2 (initial verification), Sprint 3 (post-full-instrument verification), and Sprint 4 (post-QA final pass).

## 5.1 Protocol — Per-Session Verification Steps

For each of the 5 sessions in a verification pass:

- Step 1 — Before starting the session: note the Q1 answer you will select and the tense frame you will select at Q0. Record these in the verification log.
- Step 2 — Complete the session: select the noted tier, answer Q0 (selecting the noted tense frame), answer Q1 (selecting the noted option), complete all questions for your tier.
- Step 3 — Open Supabase Table Editor: navigate to the sessions table. Find your session record by the session\_id stored in browser localStorage (open DevTools > Application > Local Storage > guestiq\_session\_token).
- Step 4 — Verify session record fields: (a) tier matches what you selected. (b) tense\_frame matches what you selected at Q0 — 'retrospective' or 'anticipatory'. (c) intent\_category matches the Q1 answer code you selected. (d) is\_complete = true. (e) completed\_at is populated.
- Step 5 — Verify response records: in the responses table, filter by your session\_id. Count the records — should equal the question count for your tier (Amateur: 8+1, Professional: 18+1, Expert: 79+1 including Q0). Spot-check 5 response records: answer\_code matches what you selected, tense\_frame is consistent throughout.
- Step 6 — Verify tense frame accuracy (NFR-043): for all response records in this session, confirm tense\_frame = the value you selected at Q0. Zero deviations permitted.
- Step 7 — Verify routing fidelity (NFR-044): open the Module 5 responses for this session. The first Module 5 question's id should match the expected sub-section for your Q1 intent category (cross-reference with the branching.json routing table). Mismatch = Critical bug.
- Step 8 — Verify none-flag capture (NFR-045): if you selected 'None of these fit' on any question, open the none\_flags table and verify a record exists for each selection with the correct question\_id and session\_id. Count of none\_flag records must equal count of 'None' selections you made during the session.

## 5.2 Session Mix Per Verification Pass

Each pass uses 5 sessions selected to maximise coverage of the verification dimensions:

| **Pass** | **Session Specification** |
| --- | --- |
| **Sprint 2 pass — 5 sessions** | Session 1: Amateur, Retrospective, WORK-TRANS (Q1=A). Session 2: Professional, Anticipatory, LEIS-PLAN (Q1=D). Session 3: Expert, Retrospective, MED (Q1=I). Session 4: Amateur, Anticipatory, TRANSIT (Q1=K). Session 5: Professional, Retrospective — deliberately select 'None of these fit' on 5+ questions to verify none-flag capture. |
| **Sprint 3 pass — 5 sessions** | Session 1: Expert 79Q, Retrospective, DISP-HOME. Session 2: Expert 79Q, Anticipatory, LOC-ESC. Session 3: Expert 79Q — secondary purpose Q2 triggers second Module 5 sub-section. Session 4: Professional, Retrospective, FAM. Session 5: Amateur, Anticipatory — 'None of these fit' on maximum questions. |
| **Sprint 4 pass — 5 sessions** | Varied from previous passes — choose 5 intent categories not fully covered in Sprints 2 and 3. Include one session that simulates a disambiguation (close browser mid-session, reopen, resume). Verify resumed session records are contiguous and complete. |

## 5.3 Pass Criterion

| **NFR** | **Pass/Fail Criterion** |
| --- | --- |
| **NFR-043 Tense frame accuracy** | PASS: 100% of response records in the session carry the tense\_frame value selected at Q0. FAIL: any response record carries a different tense\_frame value. |
| **NFR-044 Routing fidelity** | PASS: the first Module 5 question rendered matches the expected sub-section for the session's intent\_category in the branching.json routing table. FAIL: any session routes to an unexpected sub-section. |
| **NFR-045 None-flag capture** | PASS: none\_flags table count equals the count of 'None' option selections made during the session. FAIL: any discrepancy between UI selections and Supabase records. |
| **Overall pass** | All 5 sessions pass all 3 NFR checks. Any failure = High or Critical bug depending on the nature of the failure. Sprint gate cannot pass with any open data integrity failures. |

# 6. Offline Queue Connectivity Test

The offline queue test (MDT v5.0 step S2-3.5) verifies that GuestIQ does not lose respondent answers during a Supabase network outage. It uses Chrome DevTools to simulate offline conditions during an active session.

## 6.1 Test Procedure

| **Step** | **Action** |
| --- | --- |
| **Step 1** | Open guestiq.github.io?property=PROP001 in Chrome. Open Chrome DevTools (F12). Click the Network tab. |
| **Step 2** | Start a fresh session. Select the Professional tier. Answer Q0 and Q1 through Q5 normally. |
| **Step 3** | In Chrome DevTools Network tab, change the throttle dropdown from 'No throttling' to 'Offline'. The app should display a visual indicator: 'Your answers are saved — reconnecting' or similar. |
| **Step 4** | Answer Q6 and Q7 with the offline indicator visible. These responses should be queued in browser localStorage, not written to Supabase. |
| **Step 5** | Change the Network tab back to 'No throttling'. Wait 30–60 seconds. The offline queue should detect connectivity and attempt to flush. |
| **Step 6** | Open Supabase Table Editor. Filter the responses table by your session\_id. Verify Q6 and Q7 response records now appear — the queued responses were flushed successfully. |
| **Step 7** | Verify PostHog: open app.posthog.com/events. Confirm offline\_queue\_activated and offline\_queue\_flushed events fired for this session. |

## 6.2 Pass Criterion

- Q6 and Q7 response records appear in Supabase after network restoration. Zero records lost during the offline period.
- offline\_queue\_activated and offline\_queue\_flushed events appear in PostHog with correct session context.
- The visual offline indicator was visible during the offline period — respondent was not presented with an error screen.
- FAIL: Q6 or Q7 missing from Supabase = Critical bug. Report immediately.

# 7. Playwright Visual Regression Testing

Playwright is configured in Sprint 4 (S4-2.8) to capture screenshots of 8 key screens as a visual regression baseline. All subsequent deployments automatically compare against this baseline — any pixel-level change triggers a GitHub Actions pipeline failure.

## 7.1 Baseline Screenshots — 8 Screens

| **Screen** | **Content** |
| --- | --- |
| **Screen 1 — Welcome + Tier Selection** | The unified welcome screen showing hook text and all three tier cards. Captured at standard 1920x1080 resolution (hotel PC desktop size). |
| **Screen 2 — Q0 (Routing Gate)** | The first instrument question (QR1 rendered as Q0), showing the episode map and progress bar at position 0/1. |
| **Screen 3 — Single-select question** | A Module 1 single-select question (Q1 recommended) with answer options rendered and none option visible at the bottom. |
| **Screen 4 — Scale question** | A Module 3 or Module 6 scale question with the 5-column radio button layout. |
| **Screen 5 — Episode map with progress** | Episode 2 or 3, with at least 2 completed episode nodes (checkmarks) and a partially filled progress bar. |
| **Screen 6 — Curiosity hook screen** | The Episode 1 curiosity hook screen showing the hook text, badge reveal position, and 'Continue' button. |
| **Screen 7 — Completion and results screen** | The completion screen with earned badges and the personal results summary card. |
| **Screen 8 — Management dashboard overlay** | The SHIFT+CTRL+A overlay with Panel 1 (Response Overview) visible on the dark navy canvas. |

## 7.2 Regression Detection

Playwright runs automatically in the GitHub Actions CI/CD pipeline on every push to the main branch, starting from Sprint 4. If any screenshot differs from the baseline by more than the configured pixel threshold, the pipeline fails and the deployment is blocked until the regression is either fixed or the baseline is intentionally updated.

- Intentional visual updates: run the Playwright update-baseline command. Commit the new baseline screenshots alongside the code change that caused them.
- Unintentional regressions: fix the code change that caused the visual diff. Re-run locally to confirm fix before pushing.
- Playwright is also run manually after every Sprint 5 UAT fix and Sprint 6 pilot patch — Playwright passing is a required condition before any patch is deployed to the live pilot URL.

# 8. Accessibility Audit Procedure (WCAG 2.1 AA)

GuestIQ must comply with WCAG 2.1 AA for all interactive content (NFR-016 to NFR-019). The accessibility audit is performed in Sprint 3 (S3-10) and Sprint 4 (S4-2.4), with a final verification in Sprint 4 QA.

## 8.1 Automated Scan

| **Element** | **Specification** |
| --- | --- |
| **Tool** | axe-core browser extension (available free for Edge and Chrome). Install: search 'axe DevTools' in the browser extension store. |
| **Scope** | Run the axe scan on: welcome screen, an active question screen, the episode curiosity hook screen, the completion screen, and the management dashboard overlay. Five scans total. |
| **Pass criterion** | Zero Level A or Level AA violations in any scan. Level AAA violations are noted but do not block the sprint gate. |
| **Common failure modes** | Insufficient color contrast (GuestIQ's dark canvas with colored tier accents must be verified — not all combinations pass 4.5:1 automatically), missing aria-labels on SVG badges, focus not visible on tier cards in hover state. |

## 8.2 Manual Keyboard Navigation Walkthrough

After the automated scan passes, the Lead Researcher completes a manual keyboard-only walkthrough of the complete Amateur flow. No mouse is used.

- Tab navigates forward through all interactive elements — tier cards, answer options, CTA buttons, episode Continue buttons.
- Shift+Tab navigates backward through interactive elements.
- Enter or Space activates the focused element — tier selection, answer option selection, button press.
- Escape closes the management dashboard overlay.
- Focus ring is visible on every interactive element — a visible outline showing which element is currently focused.
- Pass criterion: the entire Amateur flow (tier selection, Q0, Q1-Q7, completion) is completable using keyboard only without requiring a mouse at any point.

# 9. Performance Verification Procedure

Performance targets are verified from two sources: Sentry Performance data from real user sessions, and manual timing measurements during Sprint 4 on-site testing. Developer machine performance is explicitly not used — NFR performance targets are set for hotel PC hardware on hotel broadband.

## 9.1 NFR Performance Targets

| **NFR** | **Measurement and Verification** |
| --- | --- |
| **NFR-001 — LCP under 2.0 seconds** | Measured: Sentry Performance dashboard, p50 from real user sessions. Verification step: S4-09, S5-06 (first real respondent). Target: median LCP across all real sessions under 2.0 seconds. |
| **NFR-002 — TTI under 3.0 seconds** | Measured: Sentry Performance, p50. Target: median TTI under 3.0 seconds. If TTI exceeds 3.0 seconds on front desk PCs, Vite bundle splitting is applied (NFR-005 — bundle under 500KB gzipped). |
| **NFR-003 — Question transition under 300ms** | Measured: manually timed during Sprint 4 on-site test (S4-2.3) and via Sentry custom spans added around the question render cycle. Target: all question-to-question transitions complete in under 300ms — imperceptible to the respondent. |
| **NFR-004 — Dashboard under 5 seconds at 100 sessions** | Measured: manually timed during Sprint 4 (S4-1.6) after 10+ test sessions are in Supabase. SHIFT+CTRL+A activation to all 9 panels rendered. Target: under 5 seconds. Note: at pilot scale (10 sessions), this is trivially fast — the NFR is validated architecturally rather than empirically. |
| **NFR-005 — Bundle under 500KB gzipped** | Measured: npm run build output in the terminal. Target: dist/ JavaScript bundle under 500KB gzipped. If exceeded: code splitting applied to lazy-load gamification components. |

# 10. User Acceptance Testing — Script Outline

The full UAT Script is produced in Sprint 4 (S4-3.1, Backlog S4-08). This section documents the outline and acceptance framing. UAT is qualitative — it captures the front desk team's perception of the experience, not technical correctness. Technical correctness is already verified by the functional test cases and data integrity protocol.

## 10.1 UAT Participants

- 2–3 front desk team members selected by the Lead Researcher. Not developers — must be people who will use the application during the actual pilot.
- Include one senior and one junior team member if possible — different experience levels produce different feedback.
- UAT is facilitated in Sprint 5 (S5-01, S5-02). Each participant gets one 30-minute individual session.

## 10.2 UAT Flow

| **Phase** | **Specification** |
| --- | --- |
| **Preparation** | Lead Researcher opens guestiq.github.io?property=PROP001 on a front desk PC. Gives the printed or digital UAT Script to the participant. Does not explain what to do — instructs the participant to read the script and follow it themselves. |
| **Observation** | Lead Researcher observes without intervening. Notes: moments of hesitation, confusion, unexpected selections, spontaneous spoken comments, questions asked. Notes are kept by question ID and participant. |
| **Tier coverage** | Participant 1: Amateur tier (5 minutes, 8 questions). Participant 2: Professional tier (8 minutes, 18 questions). Participant 3 (if available): Expert tier (16 minutes, 79 questions). |
| **Feedback questions (post-completion)** | (1) Rate your overall experience with this questionnaire: 1 (frustrating) to 5 (excellent). (2) How clear were the questions and answer options: 1 (very confusing) to 5 (very clear). (3) Open question: 'Is there anything that felt confusing, unclear, or out of place?' |
| **Pass criterion** | UAT success criterion (Charter v2.1): all UAT participants rate 3 or higher on both scored questions. Average of 4+ across all participants is the stretch target. Any Critical finding (participant could not complete the flow) is fixed before pilot launch. |

## 10.3 UAT Finding Categories

| **Category** | **Definition and Action** |
| --- | --- |
| **Critical** | Participant could not complete a task — got stuck, confused, or gave up. Fix before pilot launch regardless of estimated effort. |
| **Important** | Participant completed the task but with visible frustration or significant hesitation. Fix before pilot launch if time allows. Document for Phase 2 if not. |
| **Minor** | Small wording issue, unclear label, or cosmetic inconsistency. Document and defer to Phase 2. |
| **Observation** | Qualitative insight about engagement, professional appropriateness, or gamification perception. No code change required. Use in debrief report. |

# 11. NFR-to-Test Traceability Schedule

All 45 NFRs from SRS-NFR v1.2 are mapped to their verification method and sprint. This schedule is used during sprint gate reviews to confirm all NFRs have been verified before the sprint gate passes.

| **NFR** | **Summary** | **Sprint** | **Verification Method** |
| --- | --- | --- | --- |
| **NFR-001** | LCP under 2 seconds — hotel broadband | S4+S5 | Sentry Performance p50 from real sessions |
| **NFR-002** | TTI under 3 seconds — hotel broadband | S4+S5 | Sentry Performance p50 |
| **NFR-003** | Question transition under 300ms | S4 | Manual timing + Sentry custom span |
| **NFR-004** | Dashboard under 5 seconds at 100 sessions | S4 | Manual timing after 10+ sessions |
| **NFR-005** | Bundle under 500KB gzipped | S4 | npm run build output |
| **NFR-006** | Offline queue zero data loss | S2 | Chrome DevTools Offline mode test (S2-3.5) |
| **NFR-007** | Downtime screen within 5 seconds of 60s outage | S4 | Supabase temporarily blocked + timer |
| **NFR-008** | Session survives browser close/reopen | S2 | Manual: close browser mid-session, reopen, verify resume |
| **NFR-009** | GitHub Pages available throughout pilot | S5-S6 | Daily monitoring check |
| **NFR-010** | All comms HTTPS | S2 | Chrome DevTools Network — all requests show https:// |
| **NFR-011** | Credentials in .env only | S2 | git grep for hardcoded keys — zero results |
| **NFR-012** | RLS enabled on all 4 tables | S2 | Supabase Auth > Policies — RLS active verified |
| **NFR-013** | No /admin URL | S4 | URL navigation test — 404 on /admin |
| **NFR-014** | Zero PII collected | S2+S4 | Supabase schema review + PostHog/Sentry field audit |
| **NFR-015** | Privacy notice on welcome screen | S2 | Visual inspection — notice visible before tier selection |
| **NFR-016** | WCAG 2.1 AA contrast | S3+S4 | axe-core automated scan — zero AA violations |
| **NFR-017** | Full keyboard navigation | S3+S4 | Manual keyboard-only Amateur flow walkthrough |
| **NFR-018** | SVG badges have aria-label | S3 | Code review + screen reader test |
| **NFR-019** | Radix UI primitives for interactive elements | S2 | Code review — all question inputs use Radix |
| **NFR-020** | Color not sole indicator | S3 | Greyscale screenshot test — selected states visible |
| **NFR-021** | Edge on Windows — full function | S4 | S4-2.1 — full Expert flow in Edge, zero console errors |
| **NFR-022** | Chrome on Windows — full function | S4 | S4-2.2 — full Professional flow in Chrome |
| **NFR-023** | Actual front desk PCs — verified on-site | S4 | S4-2.3 — on-site test at hotel property |
| **NFR-024** | Chrome Android — functional (not optimized) | S2+S3 | S2-19, S3-15 — Amateur then Professional flows |
| **NFR-025** | PostHog IP anonymization | S2 | PostHog Settings — IP capture disabled |
| **NFR-026** | PostHog masks all inputs | S2 | PostHog session recording settings + replay test |
| **NFR-027** | Sentry IP anonymization | S2 | Sentry sendDefaultPii:false verified in config |
| **NFR-028** | Anonymous UUIDs only | S2 | Code review — crypto.randomUUID() only, no user data |
| **NFR-029** | PostHog data retention 1 year | S2 | PostHog project settings — retention period set |
| **NFR-030** | property\_id in all records and events | S2 | Supabase Table Editor + PostHog event properties |
| **NFR-031** | user\_id nullable in sessions | S2 | Supabase Table Editor — column exists, value null |
| **NFR-032** | Schema via Migrations only | S2 | supabase/migrations/ directory — all tables present as files |
| **NFR-033** | Architecture supports 50 concurrent users | S0 | Architecture review — GitHub Pages + Supabase free tier limits |
| **NFR-034** | Zero hardcoded strings in components | S2 | ESLint no-hardcoded-strings rule — zero violations in CI/CD |
| **NFR-035** | ESLint zero errors on every commit | S1+ | GitHub Actions — ESLint step green on all commits |
| **NFR-036** | Prettier on every commit | S1+ | GitHub Actions — Prettier check step green |
| **NFR-037** | All calls through service layer | S2 | Code search — zero supabase.from() in /components |
| **NFR-038** | Complex logic documented with why-comments | S2 | Code review — branching logic and queue manager have inline comments |
| **NFR-039** | Sentry 100% error capture | S2 | Deliberate test error — appears in Sentry within 60 seconds |
| **NFR-040** | All 27 PostHog events verified | S4 | S4-07 — PostHog Events dashboard audit against Observability Spec |
| **NFR-041** | Sentry Core Web Vitals from real sessions | S5 | S5-06 — first real respondent session in Sentry Performance |
| **NFR-042** | PostHog session replay active | S5 | S5-06 — first real respondent session replay visible |
| **NFR-043** | Tense frame accuracy — 100% | S2+S3+S4 | Data integrity protocol — all 3 passes (5 sessions each) |
| **NFR-044** | Module 5 routing fidelity — 100% | S3 | 84-path test matrix execution (S3-1.3) |
| **NFR-045** | None-flag capture fidelity — 100% | S2+S3+S4 | Data integrity protocol — none\_flags count verification |

# 12. Sprint-by-Sprint Testing Schedule

| **Sprint** | **Testing Activity** |
| --- | --- |
| **Sprint 0 (now)** | Test Plan produced and approved (this document). Backlog S0-10 AC-50 (84-path matrix included), AC-51 (data integrity protocol), AC-52 (UAT outline) satisfied. |
| **Sprint 1** | Branching Logic Specification with 84-path test matrix produced (S1-07) and reviewed in detail (S1-2.2 — 1.5 hour review). ESLint and Prettier configuration produced (S1-06). Sprint 1 gate requires Branching Logic Spec explicitly approved. |
| **Sprint 2** | Sprint 2 functional test cases executed (S2-3.2 — 7 test cases). Data integrity verification protocol Pass 1 executed (S2-15 — 5 sessions). Offline queue connectivity test (S2-3.5). Security and privacy verification. Cross-browser initial check. |
| **Sprint 3** | 84-path test matrix fully executed against built application (S3-1.3 — 2 hours). All 84 paths recorded as pass/fail. Data integrity verification protocol Pass 2 (S3-13 — 5 Expert sessions). Accessibility audit Pass 1 (S3-10). Mobile compatibility verification. |
| **Sprint 4** | Phase 1b migration identical-behavior verification (S3-12 — immediately after S3-11). Cross-browser QA — Edge and Chrome (S4-2.1, S4-2.2). On-site front desk PC verification (S4-2.3). Playwright visual regression baseline captured (S4-2.8). All 27 PostHog events verified (S4-07). Performance verification (S4-09). Data integrity protocol Pass 3 (S4-2.5). Accessibility audit Pass 2 (S4-2.4). Sprint 4 gate requires all QA passed. |
| **Sprint 5** | UAT with 2–3 front desk team members (S5-01, S5-02). Critical UAT findings fixed. Playwright re-run after each fix. First real respondent session confirmed in PostHog and Sentry (S5-06). |
| **Sprint 6** | Mid-pilot Sentry performance review (S6-1.3). PostHog funnel analysis (S6-1.2). Any mid-pilot patches followed by Playwright verification before deployment. Final data export verified opens correctly in Excel. |

# 13. Version Log

| **Ver.** | **Date** | **By** | **Change** |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF TEST PLAN v1.0 —**

*GuestIQ · Test Plan v1.0 · S0-4.1 · Backlog S0-10 · Sprint 0 Artifact · Confidential*