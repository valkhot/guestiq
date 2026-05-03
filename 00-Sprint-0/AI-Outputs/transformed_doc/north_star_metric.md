**NORTH STAR METRIC**

**GuestIQ · Persistent Product Success Measure**

|  |  |
| --- | --- |
| **Document ID** | S0-0.5 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Confirmation by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Purpose** | Explicit single-sentence definition of GuestIQ's North Star Metric with annotation, measurement specification, OKR linkage, and what-not-to-do guardrails. |
| **Related Documents** | Methodology Document v1.1 (S0-0.1) Section 7.2 · JTBD Statements (S0-0.3) · Project Charter v2.0 Success Criteria |
| **Document Location** | 00-Sprint-0 / AI-Outputs / North-Star-Metric-v1.0.docx |

# THE NORTH STAR METRIC

**GuestIQ's North Star Metric is the percentage of respondents who complete their selected tier, measured as complete sessions ÷ started sessions for the same property\_id, at the close of the pilot window.**

ℹ This is the single number that captures whether GuestIQ works. It is a persistent goal — it does not change sprint by sprint. Every design decision in the product traces back to moving this number. The sprint-level success criteria in the Project Charter are the time-bound OKRs that operationalise it.

# 1. STATEMENT ANNOTATION

Every phrase in the NSM statement is deliberate. The following table explains the reasoning behind each component.

| **Phrase in the Statement** | **Annotation — Why This Wording** |
| --- | --- |
| **"the percentage of respondents"** | A ratio, not an absolute count. 7 completions from 7 starters = 100% = success. 7 completions from 100 starters = 7% = the product experience is failing. Absolute counts inflate with pilot size; the ratio captures the product's effectiveness regardless of participation volume. |
| **"who complete"** | Complete means is\_complete = true in the Supabase sessions table AND completed\_at is populated. A respondent who answers 78 questions and closes the browser is not complete. The completeness criterion is strict because partial data degrades research quality. |
| **"their selected tier"** | Not 'the Expert tier'. A respondent who selected Amateur and completes all 8 questions has satisfied the NSM. The metric rewards the product for meeting respondents where they are — not for pushing everyone to the longest tier. This prevents a perverse incentive to make the shorter tiers invisible. |
| **"measured as complete sessions ÷ started sessions"** | The measurement formula is explicit and executable in SQL: SELECT COUNT(\*) WHERE is\_complete = true / SELECT COUNT(\*) WHERE session was created, both filtered to the same property\_id. No ambiguity about what numerator and denominator mean. |
| **"for the same property\_id"** | Multi-property architecture is already built in. The NSM is always property-specific — not aggregated across properties. This allows accurate pilot measurement and, in Phase 2, property-level benchmarking. |
| **"at the close of the pilot window"** | Snapshot metric, not a rolling average. Measured once at the end of Sprint 6 when the pilot window closes. This is the definitive measurement point referenced in the Project Charter success criteria. |

# 2. HOW TO MEASURE IT

## 2.1 The SQL Query

The NSM is calculated directly from the Supabase sessions table using the following query. Run this in the Supabase SQL Editor at any point during or after the pilot to get the current NSM value.

SELECT ROUND( 100.0 \* SUM(CASE WHEN is\_complete = true THEN 1 ELSE 0 END) / NULLIF(COUNT(\*), 0), 1 ) AS nsm\_percentage, COUNT(\*) AS total\_started, SUM(CASE WHEN is\_complete = true THEN 1 ELSE 0 END) AS total\_complete FROM sessions WHERE property\_id = 'PROP001';

## 2.2 Where to Find It

|  |  |
| --- | --- |
| **Supabase SQL Editor** | Run the query above. Real-time. Available any time during the pilot. |
| **Management Dashboard** | SHIFT+CTRL+A → Panel 1 (Response Overview) shows completion rate as a percentage. |
| **CSV Export** | SHIFT+CTRL+A → Export CSV. Calculate as (is\_complete=true rows) / (total rows) × 100. |
| **PostHog Funnel** | app\_loaded → session\_completed. The funnel drop-off from start to completion is the inverse of the NSM. |
| **Daily Monitoring (Sprint 6)** | Lead Researcher runs the SQL query daily and logs the result in the project tracking spreadsheet. |

# 3. THRESHOLDS AND WHAT THEY MEAN

| **NSM Value** | **Status** | **Interpretation and Response** |
| --- | --- | --- |
| **≥ 80%** | **Stretch** | Outstanding. The engagement design works at near-optimal levels. All gamification mechanics are landing. Sufficient data for robust segment analysis. Phase 2 case is strong. |
| **≥ 60%** | **Pass** | Minimum threshold met. Research dataset is valid and sufficient for the academic paper. At least 3 operational insights are achievable. Phase 2 is justified. |
| **40–59%** | **At Risk** | Below threshold. Insufficient for publication confidence. Review PostHog funnel to identify which episode is losing respondents. Is there a specific question or module causing drop-off? Consider extending the pilot window by one week. |
| **< 40%** | **Fail** | The experience design is not working. Respondents are starting and not completing. This is a fundamental engagement failure — not a content problem. PostHog session replay review required. Phase 2 decision will be difficult to justify without remediation. |

# 4. RELATIONSHIP TO OKRs — PROJECT CHARTER SUCCESS CRITERIA

The North Star Metric is persistent — it does not change between sprints. The OKRs in the Project Charter are time-bound key results that operationalise the NSM for the Phase 1 pilot. They answer the question: what does the NSM need to be at the close of Sprint 6 for this project to be considered successful?

The success criteria in the Project Charter already function as OKRs. They are not renamed — they are identified as the operational implementation of the North Star. The Objective is implicit: validate GuestIQ as an effective method for capturing guest expectation data.

| **Key Result (from Project Charter)** | **Threshold** | **Relationship to NSM** |
| --- | --- | --- |
| **Pilot participation rate (starters)** | **≥ 70% (7 of 10)** | Leading indicator for the NSM. If participation is below 70%, the completion rate may still be high but the absolute data volume will be insufficient. Participation is tracked daily from Sprint 5. |
| **Pilot completion rate (completers)** | **≥ 60%** | This IS the NSM minimum threshold. The success criterion and the North Star are the same measurement. Pass = NSM ≥ 60%. |
| **Average tier selected** | **≥ 50% Professional+** | Tier distribution is a leading indicator of engagement quality. If 90% select Amateur, the data is shallower and the gamification design may not be activating professional identity as intended. |
| **None-flag escape rate** | **< 15% per question avg** | Research quality indicator. High none-flag rates suggest questions are not resonating with the respondent population — a research instrument problem that would affect data validity and publishability. |
| **Technical stability** | **Zero critical bugs in pilot** | Prerequisite for the NSM. A session that fails due to a technical error cannot complete — it degrades the NSM. Technical stability is a hygiene condition, not a success metric. |
| **Operational insights** | **≥ 3 actionable insights** | Business outcome metric — the downstream consequence of a high NSM. You cannot generate 3 operational insights from 2 complete sessions. This KR requires the NSM to be in the Pass range. |

# 5. WHAT NOT TO OPTIMISE FOR

A North Star Metric is only useful if the team resists the temptation to optimise for the wrong things in its name. The following are explicitly not the North Star — and the reasons why.

| **Metric** | **Why It Is NOT the NSM** |
| --- | --- |
| **Total sessions started** | This is a participation metric, not a completion metric. Optimising for starts at the cost of quality (e.g. pressuring staff to start but not finish) would inflate total sessions without improving the NSM. |
| **Total responses collected** | A respondent who completes 78 of 79 questions generates many responses but does not satisfy the NSM. Optimising for response count could lead to celebrating near-completions that are not useful for research. |
| **Expert tier selection rate** | Pushing all respondents toward Expert would inflate the apparent ambition of the pilot but would depress the completion rate if respondents select Expert and abandon it. Tier self-selection is a design feature, not an optimisation target. |
| **Session duration** | Longer sessions do not equal better data. A respondent who takes 45 minutes on the Amateur tier (8 questions) may be confused or disengaged. Time-on-question is a diagnostic metric, not a success metric. |
| **Number of badge awards** | Badges are engagement mechanics, not research quality indicators. A respondent can earn all 9 badges without generating valid research data if the none-flag rate on their session is very high. |
| **Management dashboard usage** | The dashboard being opened by management is a secondary outcome — it depends on the pilot producing sufficient data. Optimising for dashboard usage without first achieving the NSM inverts the dependency. |

# 6. INPUT METRICS — THE NSM DIAGNOSTIC SYSTEM

The NSM tells you whether the product is working. The input metrics tell you why. If the NSM is below threshold, the following input metrics are the diagnostic instruments for identifying the cause.

| **Input Metric** | **Source** | **If Low, It Means...** |
| --- | --- | --- |
| **Episode 1 completion rate** | PostHog: episode\_completed(E1) ÷ app\_loaded | Respondents are not reaching the end of the first episode. The welcome experience, tier selection, or first episode questions are not engaging. Check curiosity hook and session timing. |
| **Tier upgrade acceptance rate** | PostHog: tier\_upgrade\_accepted ÷ tier\_upgrade\_prompted | The identity-based tier design is not compelling enough for respondents to voluntarily deepen engagement. Review the upgrade prompt wording and timing. |
| **Episode drop-off by episode** | PostHog funnel: E1→E2→E3→E4→E5→E6→E7 | Identifies the specific episode where completion rate falls sharply. A sharp drop at Episode 5 (Module 5) suggests the intent-category branching is creating friction. A drop at Episode 3 suggests arrival/pre-stay questions are not resonant. |
| **Session resume rate** | PostHog: disambiguation\_resumed ÷ disambiguation\_shown | Respondents who started but were interrupted — and came back. High resume rate = the product is worth returning to. Low resume rate = abandoned sessions stay abandoned. |
| **None-flag rate per question** | Supabase none\_flags ÷ responses per question | Questions where respondents consistently feel none of the options fit. High none-flag rate on specific questions = instrument refinement needed. Generalised high rate = the population is not the intended respondent group. |
| **Time per question** | PostHog: time\_on\_question property | Very short (< 5 seconds) = rushing or disengagement. Very long (> 90 seconds) = confusion or distraction. The middle range (15–45 seconds) indicates genuine consideration of the question. |

# 7. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. NSM statement with full annotation. SQL measurement query. Five threshold levels with interpretation. OKR linkage to Project Charter success criteria. What-not-to-optimise-for guardrails (6 non-metrics). Input metrics diagnostic system (6 PLG input metrics). |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF NORTH STAR METRIC DOCUMENT —**

*GuestIQ · North Star Metric v1.0 · S0-0.5 · Sprint 0 Artifact · NSM = complete sessions ÷ started sessions*