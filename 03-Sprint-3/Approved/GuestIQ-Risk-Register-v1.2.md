**RISK REGISTER**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-1.9 — Sprint 0 Artifact |
| **Document Version** | 1.2 — Reconciled to the projection-model + no-AI pivot (R-09 retired; R-02 updated; R-13–R-16 added) |
| **Document Status** | APPROVED v1.0 — v1.2 PENDING RE-APPROVAL |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Total Risks** | 15 active (R-09 retired) across 8 categories |
| **Risk Distribution** | High: 5 · Medium: 6 · Low: 4 · Critical: 0 |
| **Changes from v1.1** | **R-09 (Gamification Disengagement) RETIRED** — gamification removed in the pivot. **R-02 updated** — 84-path matrix gone → v4.2 routing test. **R-13** Documentation/spec drift (the anti-drift risk this reconciliation addresses). **R-14** Report-engine integrity — a wrong/non-compliant/de-anonymizing **finding** (the new highest-stakes failure; Test Plan v2.0 crown jewel). **R-15** RosaeNLG bundle-size/story-quality. **R-16** Simulation-only validation (no real guests at pilot). Heatmap + summary updated. |
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
| **R-02** | Routing / Instrument Errors | Low | High | **MEDIUM** | v4.2 routing test (9 personas) in Sprint 1; every path tested in Sprint 3. *(84-path matrix retired with the old model.)* |
| **R-03** | Low Front Desk Pilot Participation | Medium | High | **HIGH** | Dignified value layer. Management endorsement. Day 5 follow-up. End-of-read reflection as the reward. |
| **R-11** | Single Human Covering All Human Roles | High | High | **HIGH** | Scrum Master function held by Claude. SM checklist enforces process discipline separate from delivery pressure. |
| **R-04** | Browser Incompatibility on Front Desk PCs | Low | High | **MEDIUM** | Test on every front desk PC in Sprint 4. Chrome available as fallback. |
| **R-05** | JSON Configuration File Corruption | Medium | Medium | **MEDIUM** | Config validator on every load. Git version control. JSON linter before deploy. |
| **R-06** | Supabase Project Accidental Deletion | Low | High | **MEDIUM** | Weekly CSV to OneDrive. Email confirmation gate. Supabase support as fallback. |
| **R-08** | Scope Creep During Build Sprints | Medium | Medium | **MEDIUM** | Formal change request required. Phase 2 backlog captures good ideas without disrupting Phase 1. |
| **R-12** | Mid-Project Methodology Adoption | Medium | Medium | **MEDIUM** | Methodology Document produced first as anchor. Phased adoption. Sprint 1 gate confirms adoption is stable. |
| **R-07** | Supabase Service Outage During Pilot | Low | Medium | **LOW** | Offline queue. Downtime screen. Sentry monitoring. Retry every 30 seconds. |
| **R-09** | ~~Gamification Disengagement~~ | — | — | **RETIRED** | Gamification removed in the pivot; superseded by R-15-adjacent value-layer UAT. |
| **R-10** | PostHog or Sentry Data Privacy Concern | Low | Low | **LOW** | IP anonymization. No PII. Privacy notice on welcome screen. Session replay disableable. *(No third-party AI — privacy surface reduced.)* |
| **R-14** | Report-Engine Integrity (wrong/non-compliant/de-anonymizing finding) | Low | High | **HIGH** | Report-engine integrity protocol on seeded data (Test Plan v2.0 §2.1); tag-driven gates; guardrail + CF-sink + small-N tests; determinism check. |
| **R-13** | Documentation / Spec Drift | Medium | High | **HIGH** | Reference-by-ID discipline; canon set + Status Tracker; drift caught in reconciliation passes. |
| **R-16** | Simulation-Only Validation (no real guests at pilot) | High | Medium | **MEDIUM** | Frame findings as convergent front-desk belief, not external fact; GM-reaction capture as the validation signal; real-guest validation = Phase-2. |
| **R-15** | RosaeNLG Bundle-Size / Story Quality | Medium | Low | **LOW** | Measure bundle impact; fallback = hand-written templates (story is short, fixed-input). |

## 3.2 Risk Heatmap

Each risk is plotted by probability and impact. Risk IDs in the red zone require active mitigation. Risk IDs in the amber zone require monitoring. Risk IDs in the green zone require awareness.

| **Impact ↓ Prob →** | **Low** | **Medium** | **High** | **Risk Level** |
| --- | --- | --- | --- | --- |
| **High Impact** | R-04 R-06 R-11 R-14 | R-02→ R-03 R-12 R-13 | R-01 | **High** |
| **Medium Impact** | R-07 | R-05 R-08 R-16 | — | **Medium** |
| **Low Impact** | R-10 R-15 | — | — | **Low** |

*(R-09 retired. R-02 moved Low-prob/High-impact — simpler v4.2 routing lowers probability. R-14 report-engine integrity is the new highest-stakes failure. R-13 drift, R-16 simulation-only, R-15 RosaeNLG added.)*

# 4. RISK REGISTER — FULL DETAIL

## HIGH RISKS — Require active mitigation now

**R-01 HIGH Decision Latency**

Category: Governance | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Artifact reviews by the Lead Researcher take longer than 48 hours, delaying sprint starts. Since all AI deliverables require human review before the next step begins, any review delay cascades directly into sprint timeline slippage. | | **Probability**  **High** | | **Impact**  **High** | **Level**  **HIGH** |
| **Warning Signs / Triggers**  Review not complete within 24 hours of delivery. Researcher unavailable due to operational demands at the property. Multiple artifacts delivered simultaneously creating a review backlog. | **Mitigation Strategy**  Lead Researcher blocks dedicated review time in calendar at sprint start and end. 48-hour turnaround is a formal project commitment documented in the Stakeholder Register. AI Developer follows up if no response within 36 hours. Only one artifact delivered for review at a time — never a batch of documents simultaneously. | | **Contingency If Risk Occurs**  If review exceeds 72 hours: sprint timeline is extended by the delay duration. The Master Development Timeline is updated. No work begins on the next step until the delayed review is complete. Sprint gate cannot be passed until all reviews for that sprint are confirmed. | | |

*Review at: Reviewed at every sprint gate — the highest-priority process risk in the project*

**R-02 MEDIUM Routing / Instrument Errors** *(was "Branching Logic Errors" — downgraded with the simpler v4.2 model)*

Category: Technical — Architecture | Owner: SH-02 + SH-04 **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Errors in **v4.2 routing** send a respondent into the wrong **persona battery** (L1) or the wrong party add-on (L2), or attach the wrong **gold tag** to an option — corrupting which findings can form. Far simpler than the old Module-5 model (no 84-path matrix), so probability is **lower**, but undiscovered errors still corrupt data. *(The higher-stakes adjacent risk is now **R-14**, a wrong/non-compliant finding.)* | | **Probability**  **Low** | | **Impact**  **High** | **Level**  **MEDIUM** |
| **Warning Signs / Triggers**  v4.2 routing test not completed before Sprint 2; a persona battery (incl. new CREW/VIP) mis-wired; an option shipped without a `gold_tag` or with a duplicate `cf_sink`; CREW-4 gate not wired. | **Mitigation Strategy**  The **v4.2 routing test** (9 personas, L1/L2 + battery, gold tags) produced in Sprint 1; the **config validator** rejects an untagged reportable option or duplicate `cf_sink` (Data Model §4); every path tested individually in Sprint 3; AI implements strictly against the approved instrument config. | | **Contingency If Risk Occurs**  Errors in Sprint 3 testing: fix and re-test affected paths before proceeding. In pilot: suspend, fix within 24h, invalidate affected sessions, notify respondents, restart. | | |

*Review at: Sprint 1 gate (v4.2 routing test approval) + Sprint 3 (systematic path testing)*

**R-03 HIGH Low Front Desk Pilot Participation**

Category: Participation | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| Fewer than 70% of the front desk team (fewer than 7 of 10 members) start the questionnaire during the 2-week pilot window, producing a dataset too small for meaningful operational insights. | | **Probability**  **Medium** | | **Impact**  **High** | **Level**  **HIGH** |
| **Warning Signs / Triggers**  Pilot launched during an unusually busy period. Team unaware of or confused by the Teams launch message. The read feels too long or irrelevant. No visible management endorsement. | **Mitigation Strategy**  The dignified value layer (badge identity, end-of-read) motivates participation without gamification. Hotel Management visibly endorses without mandating. Launch message sent at start of a shift. Day 5 follow-up message and in-person check-in if fewer than 3 members have contributed a read. Bug Reporting Guide pinned to Teams. The end-of-read provides immediate, dignified reflection as the reward. | | **Contingency If Risk Occurs**  If fewer than 5 members contributed by Day 7: extend pilot by 1 week. Send personal (not group) messages to non-participants. Request hotel manager to mention the pilot in team briefing. If participation remains below 50% after extension: document the barrier as a research finding and adjust success criteria in the debrief report. | | |

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
| **Warning Signs / Triggers**  Front desk PCs not verified before pilot launch. A PC runs Internet Explorer as default. A recent browser auto-update introduces a breaking change. A security policy blocks JavaScript execution. | **Mitigation Strategy**  Lead Researcher verifies the application on each of the 3 front desk PCs during Sprint 4 testing — specifically opening the GitHub Pages URL, completing a **CORE read**, and verifying the data in Supabase. Edge and Chrome are pre-installed on all Windows 10/11 machines. This test is a Sprint 4 gate condition. | | **Contingency If Risk Occurs**  If a PC runs only Internet Explorer: install Chrome (requires no IT involvement — Chrome installer runs with standard user privileges on Windows 10/11). If a security policy blocks JavaScript: exclude that PC and use remaining PCs. If all PCs are blocked: escalate to IT with a specific whitelist request for guestiq.github.io. | | |

*Review at: Sprint 4 (front desk PC verification test) + Sprint 5 (pre-launch check on all 3 PCs)*

**R-05 MEDIUM JSON Configuration File Corruption**

Category: Technical — Content | Owner: SH-04 AI Developer **| Status: ACTIVE**

|  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- |
| A malformed **instrument config** causes the application to fail on load. Respondents encounter a blank or broken screen instead of the read. | | **Probability**  **Medium** | | **Impact**  **Medium** | **Level**  **MEDIUM** |
| **Warning Signs / Triggers**  A content edit introduces a syntax error. An option ships **without a `gold_tag`** or with a **duplicate `cf_sink`**. A file is saved with incorrect encoding. | **Mitigation Strategy**  The **configuration validator** parses and validates the instrument config on every application load before any content renders — including gold-tag/CF-sink integrity (Data Model §4). Malformed config produces a clear error, not a blank screen. Config is version-controlled in Git — instant rollback. AI Developer runs the validator/linter before every deployment. | | **Contingency If Risk Occurs**  If a malformed config is found during pilot: revert to the last committed version via Git (single command). Redeploy via GitHub Actions (2-minute process). Notify affected team members via Teams. The validator error identifies the specific problem — diagnosis is near-instant. | | |

*Review at: Sprint 3 (config + validator testing) + ongoing*

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
| **Warning Signs / Triggers**  Hotel Management requests an extra report view or a recommendation (not just a finding) after seeing Sprint 3 results. A front desk team member suggests a new persona or question during UAT. A request to re-introduce AI for richer free-text themes. | **Mitigation Strategy**  All scope changes require a formal Scope Change Request as defined in the Project Charter. The change request is assessed for timeline and cost impact before any work begins. The Phase 2 backlog captures good ideas without disrupting Phase 1 — any new feature request is immediately evaluated: Phase 1 or Phase 2? Changes after Sprint 2 has begun carry a high risk of timeline extension and are presumed Phase 2 unless the Lead Researcher explicitly justifies Phase 1 inclusion. | | **Contingency If Risk Occurs**  If a scope change is approved after Sprint 2: the timeline is formally extended and the Master Development Timeline updated. Deprioritize a lower-priority backlog item to compensate. Document the change and its timeline impact in the Version Update Log. If scope change is not approved: document the request in the Phase 2 Recommendations Document for future consideration. | | |

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

**R-09 ~~LOW Gamification Disengagement~~ — RETIRED (v1.2)**

Category: Participation | **Status: RETIRED — gamification was removed in the projection-model pivot.** The dignified **value layer** (badge identity, five-beat end-of-read, coverage wall) replaces it; engagement risk for that layer is covered by Sprint-5 UAT ("does the end-of-read land?") rather than a gamification-specific risk. *(Card kept for history; no longer active.)*

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

## NEW RISKS (v1.2 — the pivot)

**R-14 HIGH Report-Engine Integrity — a wrong / non-compliant / de-anonymizing finding ★ NEW v1.2**

Category: Output Credibility | Owner: SH-02 Lead Researcher (integrity review) · SH-04 Claude (engine) **| Status: ACTIVE**

The product now sells **credibility**. The catastrophic failure is no longer a routing error — it is the report engine emitting a finding that is **wrong** (miscounted), **non-compliant** (a recommendation, a percentage, a name, a subtractive conclusion about an amenity), or **de-anonymizing** (fingers an individual at small N). One bad finding in front of the GM destroys trust in the whole tool.
- **Mitigation:** the **report-engine integrity protocol** (Test Plan v2.0 §2.1) on **seeded datasets with known expected output**; explicit tests of every guardrail (findings-not-recommendations, raw-counts-never-%, counts-never-names, in-house-only, **CF-sink suppression**, **small-N suppression at 3**); **tag-driven Gate 4**; a **determinism** test (identical input → identical report). The researcher's integrity review is a second check (not a gate).
- **Contingency:** a non-compliant finding in testing is a **critical** defect — fixed and the full suite re-run before pilot. In pilot: suspend report access, fix, re-derive (compute-on-open makes this immediate), document.

**R-13 HIGH Documentation / Spec Drift ★ NEW v1.2**

Category: Governance | Owner: SH-02 Lead Researcher · SH-04 Claude **| Status: ACTIVE**

The reconciliation showed how easily docs drift from canon (the dashboard, Option B, the 84-path matrix lingering after the model changed). With one human + an AI partner producing many versioned artifacts, an un-propagated decision silently contradicts canon.
- **Mitigation:** **reference-by-ID, never restate**; a defined **canon set** + the **Reconciliation Status Tracker** as single source of truth; a **consistency sweep** after any material decision; metadata headers (supersedes / implements / references) on every artifact.
- **Contingency:** when drift is found, run a targeted sweep in dependency order, log it in the tracker, and **annotate** (not silently rewrite) the superseded text.

**R-16 MEDIUM Simulation-Only Validation — no real guests at pilot ★ NEW v1.2**

Category: Research Validity | Owner: SH-02 Lead Researcher **| Status: ACTIVE**

The pilot validates instrument + engine via **simulation** (agents projecting as personas; seeded data for the engine) — there is **no real-guest ground truth**. External validity is unproven; the only validation signal is the GM's reaction.
- **Mitigation:** every finding framed as **convergent front-desk belief, not external fact** (Output-Spec); the **GM-reaction capture** (non-obvious? / would-act?) is the explicit validation instrument; the North Star measures *whether findings land*, not *whether they're objectively true*. Real-guest validation is **Phase-2**.
- **Contingency:** if the GM judges findings off-base, that is itself a valid pilot result (instrument/gold-map needs iteration) — recorded, not hidden.

**R-15 LOW RosaeNLG Bundle-Size / Story Quality ★ NEW v1.2**

Category: Technical — Frontend | Owner: SH-04 AI Developer **| Status: ACTIVE**

The local NLG library (RosaeNLG, in-browser) may inflate the client bundle or produce stiff, repetitive prose on a slow desk PC.
- **Mitigation:** measure bundle impact during build; the story draws on a **fixed, known set** of answers, so output is controllable; **fallback = hand-written templates** (most of the polish, near-zero dependency) — a trivial swap since the story is short.
- **Contingency:** if RosaeNLG is too heavy or stiff, replace with hand-templates; no architectural change (both local, no third party).

*Review at: Sprint 1 (R-13, R-14 test design) · Sprint 3 (R-14 engine testing) · Sprint 5 (R-16 GM-reaction capture, R-15 UAT)*

**— END OF RISK REGISTER v1.2 —**

*GuestIQ · Risk Register v1.2 · S0-1.9 · Reconciled to the projection-model + no-AI pivot · Update at the start of every sprint*