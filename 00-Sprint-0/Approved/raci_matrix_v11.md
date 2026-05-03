**RACI MATRIX**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-1.5 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours of receipt — per project commitment |
| **Next Update** | Start of every sprint — activities may be added as work is refined |
| **Related Document** | Stakeholder Register v1.0 (S0-1.3) — stakeholder profiles |
| **Document Location** | 00-Sprint-0 / AI-Outputs / RACI-Matrix-v1.0.docx |

ℹ This is a living document. Updated at the start of every sprint as activities are refined. Each update is versioned. No previously approved row is removed — activities can only be added or clarified.

# 1. PURPOSE

The RACI Matrix is the definitive accountability framework for the GuestIQ project. It maps every major project activity to the four RACI roles — Responsible, Accountable, Consulted, and Informed — across all seven stakeholders. It eliminates ambiguity about who does the work, who owns the outcome, who must be consulted, and who is simply kept in the loop.

This document is produced as a standalone artifact (S0-1.5) to complement the Stakeholder Register (S0-1.3). While the Stakeholder Register describes who the stakeholders are and how to engage them, this RACI Matrix specifies exactly what each stakeholder does or does not do across every project activity.

ℹ The RACI Matrix is the input to the Definition of Done (S0-1.7) — every artifact approval and delivery step in the Definition of Done traces back to an Accountable entry in this matrix.

# 2. RACI DEFINITIONS

| **Code** | **Role** | **Definition** |
| --- | --- | --- |
| **R** | **Responsible** | Does the work. Performs the task or produces the output. Multiple people can be Responsible for the same activity. |
| **A** | **Accountable** | Owns the outcome. Approves the work done by Responsible parties. Only ONE person can be Accountable per activity — no exceptions. |
| **C** | **Consulted** | Must be consulted before action is taken or a decision is made. Provides input. Two-way communication. |
| **I** | **Informed** | Notified of outcomes or decisions after they are made. One-way communication. Does not need to be consulted beforehand. |
| **—** | **Not Involved** | Has no role in this activity. Including this explicitly prevents assumptions. |

**⚠ No activity may have more than one Accountable (A) owner. If two people are both Accountable for an outcome, neither is truly accountable. Review any activity where this appears to be the case before approving this document.**

# 3. STAKEHOLDER REFERENCE

The following seven stakeholders appear in this matrix. Full profiles for each are documented in the Stakeholder Register (S0-1.3).

| **ID** | **Stakeholder** | **Role in Project** | **Notes** |
| --- | --- | --- | --- |
| **SH-01** | Hotel Management | Project Sponsor | Final decision authority. Approves Charter. Phase 2 decision. |
| **SH-02** | Lead Researcher | Primary Human Partner | Approves all artifacts. Daily AI collaboration. Pilot facilitator. |
| **SH-03** | Front Desk Team (~10) | Pilot Participants | Primary research subjects. UAT participants drawn from this group. |
| **SH-04** | Claude / AI Developer | Technical Delivery Partner | All code, all documents, all artifacts. No decision authority. |
| **SH-05** | Property Owner / Investor | Informed Stakeholder | Receives debrief summary only. Not in day-to-day decisions. |
| **SH-06** | Future Academic Collaborators | Phase 2 Stakeholder | No Phase 1 involvement. Post-pilot outreach via academic paper. |
| **SH-07** | Sentry / PostHog Platforms | Technical Dependencies | External services. No relationship management required. |

# 4. RACI MATRIX — COMPLETE ACTIVITY LIST

The matrix below covers 152 major project activities organized into 9 categories. Activities are ordered by sprint and project phase. Category header rows (shown in blue) separate the sections for readability.

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **R = Responsible — does the work** | **A = Accountable — owns outcome** | **C = Consulted — input required** | **I = Informed — notified after** | — = Not involved in this activity |

| **Activity / Deliverable** | **SH-01 Sponsor** | **SH-02 Researcher** | **SH-03 Front Desk** | **SH-04 AI Dev** | **SH-05 Owner** | **SH-06 Academic** | **SH-07 Sentry/PH** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **GOVERNANCE — APPROVALS AND DECISIONS** | | | | | | | |
| Approve Project Charter v2.1 (and v2.0) | **A** | **C** | — | **R** | **I** | — | — |
| Approve Stakeholder Register | **C** | **A** | — | **R** | — | — | — |
| Approve RACI Matrix | **C** | **A** | — | **R** | — | — | — |
| Approve Definition of Done + Ready | **C** | **A** | — | **R** | — | — | — |
| Approve Risk Register | **C** | **A** | — | **R** | **I** | — | — |
| Approve SRS Functional Requirements | **C** | **A** | — | **R** | — | — | — |
| Approve SRS Non-Functional Requirements | **C** | **A** | — | **R** | — | — | — |
| Approve Product Backlog | **C** | **A** | — | **R** | — | — | — |
| Approve Use Case Specifications | **C** | **A** | — | **R** | — | — | — |
| Approve Test Plan | **C** | **A** | — | **R** | — | — | — |
| Approve Visual Identity Document | **C** | **A** | — | **R** | — | — | — |
| Approve Observability Specification | **C** | **A** | — | **R** | — | — | — |
| Approve Content Management Strategy | **C** | **A** | — | **R** | — | — | — |
| Approve Production Readiness Architecture | **C** | **A** | — | **R** | — | — | — |
| Approve Sprint 1 architecture documents | **C** | **A** | — | **R** | — | — | — |
| Approve Branching Logic + 84-path matrix | **C** | **A** | — | **R** | — | — | — |
| Approve questionnaire.js data structure | **C** | **A** | — | **R** | — | — | — |
| Approve UAT Script | **C** | **A** | — | **R** | — | — | — |
| Approve Go-Live Runbook and Checklist | **C** | **A** | — | **R** | — | — | — |
| Make Phase 2 continuation decision | **A** | **C** | — | **I** | **C** | — | — |
| Approve JTBD Statements (S0-0.3) | **C** | **A** | — | **R** | — | — | — |
| Approve North Star Metric definition (S0-0.5) | **C** | **A** | — | **R** | — | — | — |
| Approve GuestIQ Methodology Document v1.1 (S0-0.1) | **C** | **A** | — | **R** | — | — | — |
| Approve Project Charter v2.1 | **A** | **C** | — | **R** | **I** | — | — |
| Approve Stakeholder Register v1.1 | **C** | **A** | — | **R** | — | — | — |
| Approve RACI Matrix v1.1 | **C** | **A** | — | **R** | — | — | — |
| Approve DoD + DoR v1.1 | **C** | **A** | — | **R** | — | — | — |
| Approve Risk Register v1.1 | **C** | **A** | — | **R** | **I** | — | — |
| Approve SRS-F v1.1 (UC traceability note) | **C** | **A** | — | **R** | — | — | — |
| Approve SRS-NFR v1.1 (Research Data NFRs) | **C** | **A** | — | **R** | — | — | — |
| Approve Product Backlog v1.1 (Epic structure) | **C** | **A** | — | **R** | — | — | — |
| Approve scope change requests | **A** | **C** | — | **I** | — | — | — |
| **PRE-SPRINT — ACCOUNT AND ENVIRONMENT SETUP** | | | | | | | |
| Create GitHub account and repository | — | **R** | — | **I** | — | — | — |
| Create Supabase account and project | — | **R** | — | **I** | — | — | — |
| Save Supabase API credentials | — | **R** | — | **I** | — | — | — |
| Create PostHog account and project | — | **R** | — | **I** | — | — | — |
| Create Sentry account and project | — | **R** | — | **I** | — | — | — |
| Install Node.js on researcher PC | — | **R** | — | **I** | — | — | — |
| Verify MS Teams access for pilot | — | **R** | — | — | — | — | — |
| Create project folder structure | — | **R** | — | — | — | — | — |
| Create project tracking spreadsheet | — | **R** | — | — | — | — | — |
| Configure GitHub Actions permissions | — | **R** | — | **I** | — | — | — |
| **SPRINT 0 — SPRINT 1 — DOCUMENT AND ARCHITECTURE PRODUCTION** | | | | | | | |
| Produce all governance documents (S0) | **I** | **A** | — | **R** | — | — | — |
| Produce SRS documents | **I** | **A** | — | **R** | — | — | — |
| Produce Product Backlog | **I** | **A** | — | **R** | — | — | — |
| Produce System Architecture Document | **I** | **A** | — | **R** | — | — | — |
| Produce Information Architecture Diagram | **I** | **A** | — | **R** | — | — | — |
| Produce Data Flow and ERD diagrams | **I** | **A** | — | **R** | — | — | — |
| Produce Application State Diagram | **I** | **A** | — | **R** | — | — | — |
| Configure ESLint and Prettier | — | **A** | — | **R** | — | — | — |
| Produce Branching Logic Specification | **I** | **A** | — | **R** | — | — | — |
| Build 84-path test matrix | **I** | **A** | — | **R** | — | — | — |
| Design questionnaire.js data structure | **I** | **A** | — | **R** | — | — | — |
| Produce UI/UX Wireframes | **I** | **A** | — | **R** | — | — | — |
| Produce Visual Design System | **I** | **A** | — | **R** | — | — | — |
| Produce API Specification | **I** | **A** | — | **R** | — | — | — |
| Produce Observability Specification | **I** | **A** | — | **R** | — | — | — |
| Produce Content Management Strategy | **I** | **A** | — | **R** | — | — | — |
| Produce Production Readiness Architecture | **I** | **A** | — | **R** | — | — | — |
| **SPRINT 2 — CORE APPLICATION BUILD** | | | | | | | |
| Create Supabase database tables via Migrations | — | **R** | — | **I** | — | — | — |
| Configure Row Level Security policies | — | **R** | — | **I** | — | — | — |
| Initialize Sentry SDK in application | — | **A** | — | **R** | — | — | **I** |
| Initialize PostHog SDK in application | — | **A** | — | **R** | — | — | **I** |
| Build React PWA project structure | — | **A** | — | **R** | — | — | — |
| Push code to GitHub and verify deployment | — | **R** | — | **I** | — | — | — |
| Build welcome, tier selection, credentials screens | — | **A** | — | **R** | — | — | — |
| Build routing gate and tense management | — | **A** | — | **R** | — | — | — |
| Build Modules 1–4 from questionnaire.js | — | **A** | — | **R** | — | — | — |
| Build session resume and disambiguation screen | — | **A** | — | **R** | — | — | — |
| Execute Sprint 2 test cases | — | **R** | — | **I** | — | — | — |
| Data integrity verification — 5 sessions traced | — | **R** | — | **C** | — | — | — |
| Offline queue connectivity test (DevTools) | — | **R** | — | **I** | — | — | — |
| Fix Sprint 2 bugs | — | **A** | — | **R** | — | — | — |
| Verify Sentry + PostHog receiving data | — | **R** | — | **I** | — | — | **I** |
| **SPRINT 3 — FULL QUESTIONNAIRE AND GAMIFICATION** | | | | | | | |
| Build Module 5 — all 12 intent category branches | — | **A** | — | **R** | — | — | — |
| Build Modules 6 and 7 | — | **A** | — | **R** | — | — | — |
| Test Module 5 against 84-path matrix | — | **R** | — | **C** | — | — | — |
| Build progress bar and episode map | — | **A** | — | **R** | — | — | — |
| Build SVG achievement badge system | — | **A** | — | **R** | — | — | — |
| Build curiosity hooks, tier upgrades, streak | — | **A** | — | **R** | — | — | — |
| Build results and aggregate comparison screen | — | **A** | — | **R** | — | — | — |
| Apply full visual design to all screens | — | **A** | — | **R** | — | — | — |
| Execute Phase 1b JSON content extraction | — | **A** | — | **R** | — | — | — |
| Verify Phase 1b migration — identical behavior | — | **R** | — | **C** | — | — | — |
| Full Expert tier walkthrough — all 79 questions | — | **R** | — | — | — | — | — |
| Fix Sprint 3 bugs | — | **A** | — | **R** | — | — | — |
| **SPRINT 4 — DASHBOARD, QA, AND POLISH** | | | | | | | |
| Build SHIFT+CTRL+A overlay and 9 panels | — | **A** | — | **R** | — | — | — |
| Build CSV export and PDF summary report | — | **A** | — | **R** | — | — | — |
| Test management dashboard — all 9 panels | — | **R** | — | **I** | — | — | — |
| Cross-browser testing — Edge and Chrome | — | **R** | — | **I** | — | — | — |
| Test on actual front desk PC | — | **R** | — | **I** | — | — | — |
| Accessibility audit (WCAG 2.1 AA) | — | **A** | — | **R** | — | — | — |
| Performance optimization (Sentry targets) | — | **A** | — | **R** | — | — | **I** |
| Data integrity verification — second pass | — | **R** | — | **C** | — | — | — |
| Verify all 27 PostHog events firing | — | **R** | — | **C** | — | — | **I** |
| Build Supabase downtime contingency screen | — | **A** | — | **R** | — | — | — |
| Configure Playwright visual regression | — | **A** | — | **R** | — | — | — |
| Produce UAT Script | — | **A** | — | **R** | — | — | — |
| Produce Deployment Checklist | — | **A** | — | **R** | — | — | — |
| Produce Go-Live Runbook | — | **A** | — | **R** | — | — | — |
| Produce Bug Reporting Guide for pilot team | — | **A** | — | **R** | — | — | — |
| Fix Sprint 4 bugs | — | **A** | — | **R** | — | — | — |
| **SPRINT 5 — USER ACCEPTANCE TESTING AND PILOT LAUNCH** | | | | | | | |
| Select and brief UAT participants | — | **R** | **C** | — | — | — | — |
| Facilitate UAT sessions | — | **R** | **C** | — | — | — | — |
| Compile UAT findings document | — | **A** | **C** | **C** | — | — | — |
| Implement UAT critical fixes | — | **A** | — | **R** | — | — | — |
| Verify UAT fixes on live URL | — | **R** | — | **C** | — | — | — |
| Final pre-launch verification (all 3 PCs) | — | **R** | — | — | — | — | — |
| Send pilot launch message via MS Teams | — | **R** | **I** | — | — | — | — |
| Distribute and pin bug reporting guide | — | **R** | **I** | — | — | — | — |
| Daily monitoring (Supabase session counts) | — | **R** | — | — | — | — | — |
| Review PostHog event flow from real respondents | — | **R** | — | — | — | — | **I** |
| Review Sentry for pilot errors | — | **R** | — | — | — | — | **I** |
| Mid-pilot in-person check-in (Day 5) | — | **R** | **C** | — | — | — | — |
| Apply mid-pilot patch if needed | — | **A** | — | **R** | — | — | — |
| **SPRINT 6 — PILOT MONITORING, DEBRIEF, AND PROJECT CLOSE** | | | | | | | |
| Continue daily monitoring through Week 14 | — | **R** | — | — | — | — | — |
| PostHog funnel analysis — mid-pilot review | — | **R** | — | — | — | — | **I** |
| Sentry performance review — mid-pilot | — | **R** | — | — | — | — | **I** |
| Weekly CSV export to OneDrive (Week 13 + 14) | — | **R** | — | — | — | — | — |
| Final data export on Day 14 | — | **R** | — | — | — | — | — |
| Produce Pilot Debrief Report | — | **A** | — | **R** | — | — | — |
| Review and annotate Debrief Report | — | **R** | — | **C** | — | — | — |
| Schedule and prepare debrief meeting | — | **R** | — | — | — | — | — |
| Conduct debrief meeting with management | **A** | **R** | — | — | **I** | — | — |
| Produce Phase 2 Recommendations Document | — | **A** | — | **R** | — | — | — |
| Review and agree Phase 2 scope | **A** | **R** | — | **C** | **C** | — | — |
| Produce Velocity Review and Burndown Chart | — | **A** | — | **R** | — | — | — |
| Produce PostHog and Sentry analytics summary | — | **A** | — | **R** | — | — | **I** |
| Final project retrospective | — | **R** | — | **C** | — | — | — |
| Archive all 38 project artifacts | — | **R** | — | — | — | — | — |
| Produce Debrief Executive Summary for Owner | — | **R** | — | **C** | **I** | — | — |
| **SCRUM MASTER FUNCTION — SPRINT GOVERNANCE** | | | | | | | |
| Run sprint-start 7-item checklist (gate conditions, hierarchy, DoR, TDD spec, PLG check, impediments, UC model) | — | **I** | — | **R+A** | — | — | — |
| Verify previous sprint gate conditions all confirmed before new sprint begins | **C** | **I** | — | **R+A** | — | — | — |
| Verify Epic/Feature/Story hierarchy correct for entering sprint stories | — | **I** | — | **R+A** | — | — | — |
| Flag any DoR failure — return non-ready stories to backlog before sprint work begins | — | **A** | — | **R** | — | — | — |
| Maintain Use Case model currency — flag stale Use Cases before affected stories enter sprint | — | **I** | — | **R+A** | — | — | — |
| Log methodology impediments in Risk Register when systemic | — | **A** | — | **R** | — | — | — |
| Produce sprint retrospective at close of each sprint | — | **A** | — | **R** | — | — | — |
| **ONGOING — CONTENT AND INSTRUMENT MANAGEMENT** | | | | | | | |
| Edit questionnaire content in JSON config files | — | **A** | — | **C** | — | — | — |
| Validate JSON config file integrity | — | **A** | — | **R** | — | — | — |
| Monitor Sentry error dashboard (ongoing) | — | **R** | — | — | — | — | **I** |
| Monitor PostHog analytics (ongoing) | — | **R** | — | — | — | — | **I** |
| Update Risk Register (start of each sprint) | — | **R** | — | **C** | — | — | — |
| Update Stakeholder Register (start of each sprint) | — | **R** | — | **C** | — | — | — |

# 5. ACCOUNTABILITY AUDIT — SINGLE OWNER VERIFICATION

The following table lists every major decision area and confirms that exactly one stakeholder is Accountable. This audit must pass before the RACI Matrix can be approved. If any row identifies shared accountability, the matrix must be revised.

| **Activity / Decision Area** | **Single Accountable Owner** | **Rationale** |
| --- | --- | --- |
| All project artifact approvals | **SH-02 Lead Researcher** | Single accountable owner for all 38 artifacts |
| All AI deliverable production | **SH-04 AI Developer** | All code and documents — no shared accountability |
| Phase 2 go/no-go decision | **SH-01 Hotel Management** | Sole decision authority on continuation |
| Pilot participation encouragement | **SH-02 Lead Researcher** | Hotel Management supports but researcher facilitates |
| Sentry/PostHog configuration | **SH-04 AI Developer** | Technical configuration owned by developer |
| JSON content file editing | **SH-02 Lead Researcher** | Research team owns questionnaire content decisions |
| Weekly CSV data backup | **SH-02 Lead Researcher** | Researcher owns research data integrity |
| Bug report response (Critical) | **SH-04 AI Developer** | Developer accountable for fix within 4 hours |
| UAT facilitation | **SH-02 Lead Researcher** | Researcher runs all UAT sessions |
| Scope change approval | **SH-01 Hotel Management** | Sponsor is final authority on scope additions |

ℹ Audit result: all 10 accountability areas have a single Accountable owner. No shared accountability exists. This matrix is ready for approval.

# 6. KEY OBSERVATIONS FOR LEAD RESEARCHER

## 6.1 Your accountabilities

As Lead Researcher (SH-02), you hold the Accountable role for every project artifact approval, every research decision, the pilot facilitation, and the debrief report. This is appropriate — you are the primary human team member and the single point of truth for all project decisions.

Critically, you are also Accountable for the JSON content file editing (Phase 1b onwards). This means that when questionnaire content changes are needed — new answer options, revised question text, additional questions — you own that decision and the AI Developer assists with the technical implementation only if needed.

## 6.2 Hotel Management accountabilities

Hotel Management (SH-01) holds the Accountable role for three things only: approving the Project Charter, making the Phase 2 continuation decision, and approving scope change requests. Everything else they are Consulted or Informed. This is intentional — the project is designed to be low-burden for management and high-value at the debrief.

## 6.3 Front desk team role

The front desk team (SH-03) appears in very few rows because their engagement is through the application experience, not through project governance. They are Consulted during UAT and informed via the pilot launch message. Their primary contribution is their questionnaire responses — which generate the research data.

## 6.4 AI Developer scope

The AI Developer (SH-04) is Responsible for all technical deliverables but Accountable for none — accountability always sits with the Lead Researcher or Hotel Management. This reflects the correct governance model: AI produces, humans decide and own.

## 6.5 Sentry and PostHog

Sentry and PostHog (SH-07) appear as Informed on all observability-related activities. This reflects the fact that these platforms passively receive data — they do not need to be consulted or take action. Their presence in the I column is a technical notation, not a communication requirement.

# 7. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change Description** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0 Date] | Claude / AI Developer | Initial version — 9 activity categories, 152 activities, 7 stakeholders. Accountability audit completed. All observations documented. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

# VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. 9 categories, ~126 activity rows across all 6 sprints. Stakeholder reference table. Legend. Accountability audit. |
| **v1.1** | [Sprint 0] | Claude / AI Developer | Three additions: (1) New SCRUM MASTER FUNCTION category with 7 activity rows covering sprint-start checklist, gate verification, hierarchy check, DoR enforcement, Use Case model currency, impediment logging, and retrospective. (2) 11 new GOVERNANCE rows for JTBD Statements, North Star Metric, Methodology Document, and all v1.1 artifact approvals. (3) Charter approval row updated to reference v2.1. Total: 10 new categories (was 9). ~144 activity rows (was ~126). All additions additive — no existing rows removed. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF RACI MATRIX v1.1 —**

*GuestIQ · RACI Matrix v1.0 · Document S0-1.5 · Sprint 0 Artifact · Confidential*