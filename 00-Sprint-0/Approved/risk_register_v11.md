**RISK REGISTER**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-1.9 — Sprint 0 Artifact |
| **Document Version** | 1.1 — R-11 and R-12 added (Single Human Risk + Methodology Adoption Risk) |
| **Document Status** | APPROVED v1.0 — v1.1 PENDING RE-APPROVAL |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Total Risks** | 12 risks across 7 categories |
| **Risk Distribution** | High: 4 · Medium: 5 · Low: 3 · Critical: 0 |
| **Changes from v1.0** | R-11 added: Single Human Covering All Human Roles (High/High). R-12 added: Mid-Project Methodology Adoption (Medium/Medium). New category: Methodology. Heatmap and summary table updated. |
| **Next Mandatory Update** | Start of Sprint 1 — and at the start of every subsequent sprint |
| **Related Documents** | Project Charter v2.1 (S0-1.1v) · Methodology Document v1.1 (S0-0.1) · Stakeholder Register v1.1 (S0-1.3v) |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Risk-Register-v1.1.docx |

ℹ This is a living document. Reviewed and updated at the start of every sprint. New risks are added as identified. Resolved risks are marked Closed — never deleted. The Lead Researcher is the risk register owner.

# 1. PURPOSE AND SCOPE

The Risk Register is the central repository for all identified project risks. A risk is an uncertain event that, if it occurs, will have a negative effect on the project's ability to achieve its objectives. This register documents only negative risks — threats to schedule, quality, data integrity, or stakeholder satisfaction.

Each risk is assessed for probability (how likely it is to occur) and impact (how severe the consequences would be if it does occur). These two dimensions combine to determine the overall risk level — which drives the urgency and depth of mitigation.

Version 1.1 adds two new risks identified during the Sprint 0 methodology discussion: R-11 (the single human covering all human roles — the highest structural risk in the project) and R-12 (mid-project methodology adoption — the risk that introducing Use Case 3.0 and the Epic hierarchy mid-project creates confusion). A new category, Methodology, is added to house these risks.

ℹ Risks that are not documented are not managed. If you identify a new risk at any point during the project, add it to this register immediately — do not wait for the next sprint review.

# 2. RISK SCORING METHODOLOGY

## 2.1 Probability

| **Level** | **Definition** | **Example** |
| --- | --- | --- |
| **High** | More likely than not to occur — probability > 60% | Decision latency — hotel operations regularly interrupt review time |
| **Medium** | May or may not occur — probability 30–60% | Branching logic error — careful review reduces but cannot eliminate |
| **Low** | Unlikely to occur — probability < 30% | Supabase outage — rare for established platform on free tier |

## 2.2 Impact

| **Level** | **Definition** | **Example** |
| --- | --- | --- |
| **High** | Threatens project completion, data integrity, or pilot success criteria | Corrupted research data — invalidates the core project deliverable |
| **Medium** | Delays a sprint or reduces quality of a specific deliverable | A feature works incorrectly — requires rework but does not corrupt data |
| **Low** | Minor inconvenience with no lasting effect on project outcomes | A visual display issue on one screen — fixed in the next deployment |

## 2.3 Risk Level Matrix

Probability and Impact combine to determine the overall Risk Level. This determines the urgency and depth of mitigation required.

| **Impact ↓ / Probability →** | **Low Probability** | **Medium Probability** | **High Probability** |
| --- | --- | --- | --- |
| **High Impact** | **Medium** | **High** | **High** |
| **Medium Impact** | **Low** | **Medium** | **High** |
| **Low Impact** | **Low** | **Low** | **Medium** |

# 3. RISK SUMMARY AND HEATMAP

## 3.1 Risk Summary Table — All 12 Risks

All 12 identified risks listed in order of risk level. Use this table for rapid reference. Full risk cards with triggers, mitigation, and contingency plans are in Section 4.

| **ID** | **Risk Title** | **Prob.** | **Impact** | **Level** | **Primary Mitigation** |
| --- | --- | --- | --- | --- | --- |
| **R-01** | Decision Latency | High | High | **HIGH** | Dedicated calendar blocks. 48h commitment. AI follows up at 36h. |
| **R-02** | Branching Logic Errors | Medium | High | **HIGH** | 84-path test matrix in Sprint 1. Every path tested in Sprint 3. |
| **R-03** | Low Front Desk Pilot Participation | Medium | High | **HIGH** | Identity labels. Management endorsement. Day 5 follow-up. Results screen reward. |
| **R-11** | Single Human Covering All Human Roles | High | High | **HIGH** | Scrum Master function held by Claude. SM checklist enforces process discipline separate from delivery pressure. |
| **R-04** | Browser Incompatibility on Front Desk PCs | Low | High | **MEDIUM** | Test on every front desk PC in Sprint 4. Chrome available as fallback. |
| **R-05** | JSON Configuration File Corruption | Medium | Medium | **MEDIUM** | Config validator on every load. Git version control. JSON linter before deploy. |
| **R-06** | Supabase Project Accidental Deletion | Low | High | **MEDIUM** | Weekly CSV to OneDrive. Email confirmation gate. Supabase support as fallback. |
| **R-08** | Scope Creep During Build Sprints | Medium | Medium | **MEDIUM** | Formal change request required. Phase 2 backlog captures good ideas without disrupting Phase 1. |
| **R-12** | Mid-Project Methodology Adoption | Medium | Medium | **MEDIUM** | Methodology Document produced first as anchor. Phased adoption. Sprint 1 gate confirms adoption is stable. |
| **R-07** | Supabase Service Outage During Pilot | Low | Medium | **LOW** | Offline queue. Downtime screen. Sentry monitoring. Retry every 30 seconds. |
| **R-09** | Gamification Disengagement | Low | Medium | **LOW** | Professional framing first. UAT specifically probes gamification. Can disable if needed. |
| **R-10** | PostHog or Sentry Data Privacy Concern | Low | Low | **LOW** | IP anonymization. No PII. Privacy notice on welcome screen. Session replay disableable. |

## 3.2 Risk Heatmap

Each risk is plotted by probability and impact. Risk IDs in the red zone require active mitigation. Risk IDs in the amber zone require monitoring. Risk IDs in the green zone require awareness.

| **Impact ↓ Prob →** | **Low** | **Medium** | **High** | **Risk Level** |
| --- | --- | --- | --- | --- |
| **High Impact** | R-04 R-06 R-11 | R-02 R-03 R-12 | R-01 | **High** |
| **Medium Impact** | R-07 R-09 | R-05 R-08 | — | **Medium** |
| **Low Impact** | R-10 | — | — | **Low** |

# 4. RISK REGISTER — FULL DETAIL

## HIGH RISKS — Require active mitigation now

**R-01 HIGH Decision Latency**

Category: Governance | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Artifact reviews by the Lead Researcher take longer than 48 hours, delaying sprint starts. Since all AI deliverables require human review before the next step begins, any review delay cascades directly into sprint timeline slippage. | | **Probability**  **High** | | **Impact**  **High** | **Level**  **HIGH** |
| **Warning Signs / Triggers**  Review not complete within 24 hours of delivery. Researcher unavailable due to operational demands at the property. Multiple artifacts delivered simultaneously creating a review backlog. | **Mitigation Strategy**  Lead Researcher blocks dedicated review time in calendar at sprint start and end. 48-hour turnaround is a formal project commitment documented in the Stakeholder Register. AI Developer follows up if no response within 36 hours. Only one artifact delivered for review at a time — never a batch of documents simultaneously. | | **Contingency If Risk Occurs**  If review exceeds 72 hours: sprint timeline is extended by the delay duration. The Master Development Timeline is updated. No work begins on the next step until the delayed review is complete. Sprint gate cannot be passed until all reviews for that sprint are confirmed. | | |

*Review at: Reviewed at every sprint gate — the highest-priority process risk in the project*

**R-02 HIGH Branching Logic Errors**

Category: Technical — Architecture | Owner: SH-02 + SH-04 **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Errors in the Branching Logic Specification cause incorrect Module 5 routing — respondents are shown the wrong sub-section based on their Q1 answer. If undiscovered until the pilot, this corrupts research data for all affected sessions. | | **Probability**  **Medium** | | **Impact**  **High** | **Level**  **HIGH** |
| **Warning Signs / Triggers**  Specification reviewed under time pressure without systematic path checking. 84-path test matrix not completed before Sprint 2 begins. Module 5 testing skipped or abbreviated during Sprint 3. | **Mitigation Strategy**  84-path branching test matrix produced in Sprint 1 as an integrated part of the Branching Logic Specification. Sprint 1 gate explicitly requires this matrix to be approved before Sprint 2 coding begins. Every routing path tested individually during Sprint 3. AI implements strictly against the approved spec — any deviation flagged immediately. | | **Contingency If Risk Occurs**  If routing errors found during Sprint 3 testing: fix immediately and re-test all affected paths before proceeding. If errors found during the pilot: suspend the pilot, fix within 24 hours, invalidate affected sessions, notify respondents, restart their sessions from the beginning. | | |

*Review at: Sprint 1 gate (matrix approval) + Sprint 3 (systematic path testing)*

**R-03 HIGH Low Front Desk Pilot Participation**

Category: Participation | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Fewer than 70% of the front desk team (fewer than 7 of 10 members) start the questionnaire during the 2-week pilot window, producing a dataset too small for meaningful operational insights. | | **Probability**  **Medium** | | **Impact**  **High** | **Level**  **HIGH** |
| **Warning Signs / Triggers**  Pilot launched during an unusually busy period. Team unaware of or confused by the Teams launch message. Questionnaire feels too long or irrelevant. No visible management endorsement. | **Mitigation Strategy**  Identity-based tier labels motivate participation. Hotel Management visibly endorses without mandating. Launch message sent at start of a shift. Day 5 follow-up message and in-person check-in if fewer than 3 members have started. Bug Reporting Guide pinned to Teams. Results screen provides immediate visible reward — respondents see their own data compared to the team aggregate. | | **Contingency If Risk Occurs**  If fewer than 5 members started by Day 7: extend pilot by 1 week. Send personal (not group) messages to non-participants. Request hotel manager to mention the pilot in team briefing. If participation remains below 50% after extension: document the barrier as a research finding and adjust success criteria in the debrief report. | | |

*Review at: Sprint 5 (launch) + Sprint 6 (daily monitoring — every working day)*

**R-11 HIGH Single Human Covering All Human Roles ★ NEW v1.1**

Category: Methodology — Governance | Owner: SH-02 Lead Researcher (as risk owner) · SH-04 Claude (as mitigation holder) **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| One person — the Lead Researcher — covers all human roles simultaneously: Project Sponsor liaison, Lead Researcher, UAT Facilitator, Pilot Monitor, and Hotel Management Liaison. This creates a structural tension between Product Owner instincts (deliver value, ship the feature) and Scrum Master instincts (protect process, enforce gates). Under time pressure, the delivery instinct consistently overrides the process instinct, leading to skipped DoR checks, premature gate declarations, and accumulated quality debt across sprints. | | **Probability**  **High** | | **Impact**  **High** | **Level**  **HIGH** |
| **Warning Signs / Triggers**  Sprint gate passed without all artifacts fully reviewed. DoR criteria skipped at sprint planning under time pressure. A story marked Done before all DoD criteria verified. Risk Register not updated at sprint start. Use Case model becoming stale without triggering a SM flag. | **Mitigation Strategy**  Scrum Master function held by Claude (SH-04) at the start of each sprint session. Claude runs the 7-item SM checklist before any delivery work begins — separating the process guardian role from the delivery partner role structurally. The SM checklist is the formal mitigation: it gives process discipline a fixed, non-negotiable moment that precedes every sprint. Epic/Feature/Story hierarchy correctness is checked at SM level, not left to the Lead Researcher's judgment under pressure. | | **Contingency If Risk Occurs**  If a gate is passed without full verification: the SM checklist flags the incomplete item immediately at the next sprint start. No new sprint stories begin until the gap is resolved. If the SM checklist itself is being skipped: this is a second-order instance of R-11 — escalate to the Lead Researcher as a project governance failure requiring immediate correction. Add the recurrence to the retrospective. | | |

*Review at: Every sprint start — SM-CHECK step is the mitigation activation mechanism. Reviewed at every retrospective.*

## MEDIUM RISKS — Monitor actively; mitigations in place

**R-04 MEDIUM Browser Incompatibility on Front Desk PCs**

Category: Technical — Infrastructure | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| The front desk PCs run a browser version or configuration not supported by the React PWA — the application fails to load or displays incorrectly. Internet Explorer (not supported) may be installed as the default on older Windows configurations. | | **Probability**  **Low** | | **Impact**  **High** | **Level**  **MEDIUM** |
| **Warning Signs / Triggers**  Front desk PCs not verified before pilot launch. A PC runs Internet Explorer as default. A recent browser auto-update introduces a breaking change. A security policy blocks JavaScript execution. | **Mitigation Strategy**  Lead Researcher verifies the application on each of the 3 front desk PCs during Sprint 4 testing — specifically opening the GitHub Pages URL, completing the Amateur flow, and verifying session data in Supabase. Edge and Chrome are pre-installed on all Windows 10/11 machines. This test is a Sprint 4 gate condition. | | **Contingency If Risk Occurs**  If a PC runs only Internet Explorer: install Chrome (requires no IT involvement — Chrome installer runs with standard user privileges on Windows 10/11). If a security policy blocks JavaScript: exclude that PC and use remaining PCs. If all PCs are blocked: escalate to IT with a specific whitelist request for guestiq.github.io. | | |

*Review at: Sprint 4 (front desk PC verification test) + Sprint 5 (pre-launch check on all 3 PCs)*

**R-05 MEDIUM JSON Configuration File Corruption**

Category: Technical — Content | Owner: SH-04 AI Developer **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| A malformed JSON configuration file causes the application to fail on load after the Phase 1b content extraction. Respondents encounter a blank or broken screen instead of the questionnaire. | | **Probability**  **Medium** | | **Impact**  **Medium** | **Level**  **MEDIUM** |
| **Warning Signs / Triggers**  Phase 1b JSON extraction introduces a syntax error. A subsequent content edit introduces a formatting error. A file is saved with incorrect encoding. | **Mitigation Strategy**  Configuration validator active from Phase 1b onwards: all 6 JSON files parsed and validated on every application load before any content renders. Malformed files produce a clear error, not a blank screen. All JSON files version-controlled in Git — instant rollback available. AI Developer runs JSON linter before every deployment. | | **Contingency If Risk Occurs**  If malformed JSON found during pilot: revert to last committed version via Git (single command). Redeploy via GitHub Actions (2-minute process). Notify affected team members via Teams. The validator error message identifies the specific malformed file — diagnosis is near-instant. | | |

*Review at: Sprint 3 (Phase 1b extraction and validation testing) + ongoing*

**R-06 MEDIUM Supabase Project Accidental Deletion**

Category: Data | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| The Supabase project containing all pilot research data is accidentally deleted. Free-tier projects can be deleted with a single click and email confirmation — there is no billing friction or grace period on free tier. | | **Probability**  **Low** | | **Impact**  **High** | **Level**  **MEDIUM** |
| **Warning Signs / Triggers**  Researcher navigates to the Supabase dashboard settings while fatigued. An accidental delete confirmation email is clicked. A team member with shared credentials deletes the project thinking they are working on a test environment. | **Mitigation Strategy**  Weekly CSV export to OneDrive starting Sprint 6 Day 1 — two weeks of backups before pilot ends. Supabase project deletion requires email confirmation — the confirmation email is a second safety gate. Only the Lead Researcher has Supabase credentials. Supabase free tier projects can be restored within 7 days via support request. | | **Contingency If Risk Occurs**  If the project is deleted: immediately contact Supabase support for restoration. The most recent weekly CSV backup provides a fallback dataset. If restoration fails: the CSV backup is the research dataset — Supabase is reconstructed from the backup. Document the incident and the backup recovery process in the debrief report. | | |

*Review at: Sprint 6 (daily monitoring checklist includes Supabase project status verification)*

**R-08 MEDIUM Scope Creep During Build Sprints**

Category: Scope | Owner: SH-01 Hotel Management (as requester) · SH-02 Lead Researcher (as decision maker) **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| New features or modifications are requested during Sprints 2–4 that were not in the approved Product Backlog, diverting development time from the committed sprint deliverables and threatening the 14-week timeline. | | **Probability**  **Medium** | | **Impact**  **Medium** | **Level**  **MEDIUM** |
| **Warning Signs / Triggers**  Hotel Management requests an additional dashboard panel after seeing Sprint 2 results. A front desk team member suggests a new question during UAT. A new academic reference suggests a different taxonomy structure. | **Mitigation Strategy**  All scope changes require a formal Scope Change Request as defined in the Project Charter. The change request is assessed for timeline and cost impact before any work begins. The Phase 2 backlog captures good ideas without disrupting Phase 1 — any new feature request is immediately evaluated: Phase 1 or Phase 2? Changes after Sprint 2 has begun carry a high risk of timeline extension and are presumed Phase 2 unless the Lead Researcher explicitly justifies Phase 1 inclusion. | | **Contingency If Risk Occurs**  If a scope change is approved after Sprint 2: the timeline is formally extended and the Master Development Timeline updated. Deprioritize a lower-priority backlog item to compensate. Document the change and its timeline impact in the Version Update Log. If scope change is not approved: document the request in the Phase 2 Recommendations Document for future consideration. | | |

*Review at: Sprint gate reviews — check for unapproved changes at every sprint review*

**R-12 MEDIUM Mid-Project Methodology Adoption ★ NEW v1.1**

Category: Methodology | Owner: SH-02 Lead Researcher (as risk owner) · SH-04 Claude (as adoption driver) **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Introducing Use Case 3.0, the Epic→Feature→Story→Task hierarchy, and the Scrum Master function mid-project — after the Product Backlog, RACI, and DoD+DoR were already produced — creates confusion about where artifacts belong, how Stories relate to Epics, and what the Scrum Master role does in practice. The risk is adoption overhead that slows delivery during Sprints 1–2 as the team adjusts to the new methodology layer. | | **Probability**  **Medium** | | **Impact**  **Medium** | **Level**  **MEDIUM** |
| **Warning Signs / Triggers**  Sprint 1 planning session produces stories without Epic/Feature parents. The Scrum Master checklist adds overhead that feels bureaucratic rather than useful. Use Case 3.0 slicing creates scope discussions that extend Sprint planning beyond the allocated time. The Lead Researcher expresses uncertainty about when to consult Use Cases vs. backlog. | **Mitigation Strategy**  GuestIQ Methodology Document v1.1 (S0-0.1) is the anchor artifact — all framework decisions documented before adoption begins. Phased adoption: Use Case 3.0 applied at Sprint 0 Use Case Specifications (S0-2.5) level only — backlog restructuring is additive. Epic hierarchy added to Backlog v1.1 as a grouping layer — existing stories unchanged. SM checklist is 5 minutes maximum and lightweight by design. Sprint 1 gate explicitly confirms adoption is stable before Sprint 2 begins. | | **Contingency If Risk Occurs**  If Epic hierarchy causes confusion in Sprint 1 planning: defer Epic grouping to Sprint 1 retrospective and treat the backlog as flat for Sprint 1 only. Document the deferral. If SM checklist creates friction: reduce to 3 items (gate conditions, DoR, impediments) for Sprint 1 only, then restore full 7 items from Sprint 2. If Use Case model becomes a delivery bottleneck: treat Use Cases as reference documents only — stop updating them mid-sprint, defer updates to sprint retrospective. | | |

*Review at: Sprint 1 gate (first post-adoption sprint — methodology stability confirmed) + Sprint 1 retrospective*

## LOW RISKS — Awareness maintained; monitor passively

**R-07 LOW Supabase Service Outage During Pilot**

Category: Technical — Infrastructure | Owner: SH-04 AI Developer (technical) · SH-02 Lead Researcher (communications) **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Supabase experiences a service outage during the 2-week pilot window, preventing response data from being written to the database. Respondents attempting to complete the questionnaire receive errors or lose their responses. | | **Probability**  **Low** | | **Impact**  **Medium** | **Level**  **LOW** |
| **Warning Signs / Triggers**  Supabase status page shows degraded performance. Response records are not appearing in the Supabase Table Editor despite sessions completing. Sentry raises errors related to Supabase API calls. | **Mitigation Strategy**  Offline response queue implemented in Sprint 2: all responses stored in browser local storage when Supabase is unreachable, automatically retried every 30 seconds when connectivity is restored. Supabase downtime screen implemented in Sprint 4: if Supabase is completely unreachable, a friendly 'temporarily unavailable' message is shown rather than a broken application. Sentry monitoring sends immediate alerts to Lead Researcher email. | | **Contingency If Risk Occurs**  If Supabase is down during the pilot: the offline queue preserves all response data in respondents' browsers. Notify affected team members to leave their browser window open until connectivity is restored. If the outage exceeds 4 hours: extend the pilot window by 1 day to compensate. If responses are lost despite the queue (catastrophic failure): fall back to paper copies of the top-priority questions (Q1, Q5, Q7) and enter manually into Supabase. | | |

*Review at: Sprint 2 (offline queue test) + Sprint 6 (daily monitoring)*

**R-09 LOW Gamification Disengagement**

Category: Participation | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| The gamification mechanics feel forced, patronizing, or inconsistent with the professional identity of the front desk team — reducing engagement rather than increasing it. | | **Probability**  **Low** | | **Impact**  **Medium** | **Level**  **LOW** |
| **Warning Signs / Triggers**  UAT participants express discomfort with badge awards. Curiosity hook text feels generic. Tier upgrade prompt ignored by all UAT participants. Team refers to the tool as 'a game' dismissively. | **Mitigation Strategy**  Identity-based tier labels establish professional framing before any gamification appears. Episode map is a professional progress visualization — not a game board. Badges use research-appropriate names. UAT in Sprint 5 specifically probes gamification perception with direct feedback questions. Gamification is designed to be disableable — each mechanic is an independent component. | | **Contingency If Risk Occurs**  If UAT reveals gamification is actively harmful: remove badge reveal animations and reduce badge prominence. Keep progress bar and episode map (functional, not decorative). If tier upgrade prompt is the issue: disable upgrade prompts and set all respondents to Expert tier directly. Document in debrief report for Phase 2 redesign. | | |

*Review at: Sprint 5 UAT (specific gamification feedback questions)*

**R-10 LOW PostHog or Sentry Data Privacy Concern**

Category: Data | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| A front desk team member or hotel management raises a concern that observability tools (PostHog session replay, Sentry error logging) are collecting personal or sensitive data without appropriate consent. | | **Probability**  **Low** | | **Impact**  **Low** | **Level**  **LOW** |
| **Warning Signs / Triggers**  A team member asks what data is being collected. Hotel management receives a GDPR inquiry. A team member notices 'session replay' in the PostHog dashboard and becomes concerned. | **Mitigation Strategy**  Both platforms configured with IP anonymization enabled from Sprint 2 day one — no IP addresses collected. No PII collected at any point. Privacy notice on the welcome screen. Session replay captures mouse movements and click patterns only — no keystrokes, no personal data. Session IDs are anonymous UUIDs. | | **Contingency If Risk Occurs**  If a privacy concern is raised: provide a plain English explanation of what is and is not collected. Offer to disable session replay in PostHog (analytics events continue — minimal research impact). Demonstrate the PostHog and Sentry dashboards to show the actual data visible. If concern cannot be resolved: disable PostHog and Sentry entirely — research data in Supabase is unaffected. | | |

*Review at: Sprint 5 (pilot launch welcome screen review) + Sprint 6 (as raised by team)*

# 5. RISK REGISTER UPDATE PROCESS

The Risk Register is updated at the start of every sprint. The update process takes approximately 15 minutes and follows these steps:

|  |  |
| --- | --- |
| **1** | Review each open risk: has its probability or impact changed since the last sprint? If so, update the rating and note the change in the Version Update Log. |
| **2** | Check for new risks: have any events occurred in the last sprint that suggest risks not currently on the register? If so, add a new risk card immediately. |
| **3** | Mark resolved risks as Closed: if a risk's trigger window has passed (e.g. R-04 browser incompatibility after Sprint 4 PC verification), mark it Closed. Do not delete it. |
| **4** | Update sprint review dates: change the 'Review at' field on each card to reflect when it will next be reviewed. |
| **5** | Version the document: increment the version number, add a row to the Version Update Log, and file the new version in the sprint's AI-Outputs folder. |

# 6. VERSION UPDATE LOG

| **Version** | **Sprint** | **Updated By** | **Change Description** |
| --- | --- | --- | --- |
| **v1.0** | Sprint 0 | Claude / AI Developer | Initial version. 10 risks identified across 6 categories. Risk heatmap, summary table, full risk cards, and scoring methodology established. |
| **v1.1** | Sprint 0 | Claude / AI Developer | Two new risks added: R-11 Single Human Covering All Human Roles (High probability / High impact / High level) — the structural risk of one person covering all human roles, mitigated by the Scrum Master function held by Claude. R-12 Mid-Project Methodology Adoption (Medium/Medium/Medium) — the risk that introducing Use Case 3.0 and the Epic hierarchy mid-project creates confusion, mitigated by the Methodology Document as anchor and phased adoption. New category added: Methodology. Total risks: 10 → 12. Distribution: High 3→4, Medium 4→5. Heatmap and summary table updated. No existing risk content changed. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF RISK REGISTER v1.1 —**

*GuestIQ · Risk Register v1.1 · S0-1.9 · Sprint 0 Artifact · Update at the start of every sprint*