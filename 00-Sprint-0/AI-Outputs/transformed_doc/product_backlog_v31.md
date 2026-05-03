**PRODUCT BACKLOG**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-2.7 — Sprint 0 Artifact (produced after Use Case Specifications S0-2.5 per Timeline v4.0) |
| **Document Version** | 3.1 — Targeted AC additions from UC Specs v2.0 critique: S2-06, S2-12, S4-01, S4-02 updated. No new stories. No point changes. |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Total Stories** | 100 stories: 9 Pre-Sprint · 10 Sprint 0 · 62 Phase 1 (Sprints 1–6) · 11 Phase 2 · 8 Sprint 1 artifacts |
| **Total Story Points** | Phase 1: 230 points · Phase 2 (unestimated): 11 stories |
| **Priority Split** | Must Have: 80 · Should Have: 9 · Could Have: 0 · Phase 2: 11 |
| **Hierarchy** | Epic (= Use Case) → Feature (= UC Slice) → Story (= Work Item) → Task (not tracked) |
| **Features** | 40 Features (UC Slices) derived from Use Case Specifications v1.1 (S0-2.5) — visible as sub-headers in each sprint |
| **Changes from v3.0** | Targeted AC additions from UC Specs v2.0 critique. S2-06: voluntary participation link AC. S2-12: RLS rejection detection AC. S4-01: abandoned session state distinction and minimum-data warning ACs. S4-02: export failure handling AC. S0-08/S0-09 artifact version references updated. No new stories. No point changes. No sprint reassignments. |
| **Related Documents** | UC Specs v2.0 (S0-2.5) · SRS-F v2.0 (S0-2.1) · SRS-NFR v1.2 (S0-2.3) · Branching Logic Spec (S1-2.1) |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Product-Backlog-v3.1.docx |

ℹ This is a living document. Stories are refined at the start of each sprint. The Feature layer (UC Slices) is the sprint commitment unit — a Feature is delivered completely within one sprint. Stories are the implementation tasks within each Feature.

# 1. HOW TO READ THIS BACKLOG

## 1.1 Three-Level Hierarchy — Epic → Feature → Story

This backlog implements the full Use Case 3.0 hierarchy. Every story belongs to a Feature (Use Case Slice), and every Feature belongs to an Epic (Use Case). The visual structure reflects this: Epic headers contain Feature sub-headers, which contain Story cards. The left border colour of each Story card matches its parent Feature, providing visual traceability at a glance.

| **Level** | **UC 3.0 Term** | **In This Backlog** | **Visual Indicator** |
| --- | --- | --- | --- |
| **EPIC** | Use Case | UC-01 through UC-07 — complete user journeys | Navy/teal/steel header bar with UC ID and domain |
| **FEATURE** | Use Case Slice | Slice 1 through Slice N per Epic — sprint-bounded implementation paths | Steel-blue sub-header with Slice number, story IDs, and sprint |
| **STORY** | Work Item | S2-06, S3-01, etc. — sprint-sized deliverables | Priority-coloured card with left steel-blue border linking to parent Feature |
| **TASK** | Implementation Detail | Sub-day items internal to each session — not tracked in this backlog | Not shown |

## 1.2 MoSCoW Priority

| **Priority** | **Definition** | **Rule** |
| --- | --- | --- |
| **MUST** | Non-negotiable for prototype | Sprint gate cannot pass. Pilot cannot launch. |
| **SHOULD** | Strongly desired; defer with approval | Can be moved to next sprint with Lead Researcher approval. |
| **PHASE 2** | Explicitly deferred | Not in scope for prototype. Estimated in Sprint 6 planning. |

## 1.3 Story Points

Story points are relative estimates using the Fibonacci sequence (1, 2, 3, 5, 8, 13). Pre-Sprint tasks are 0 SP — they are human setup steps, not development work. Phase 2 stories are unestimated pending Sprint 6 planning. Note: some stories appear under multiple Features where they partially satisfy more than one Slice (e.g. S3-02 contributes to both UC-01 Slice 3 and UC-02 Slice 3).

## 1.4 Epic Summary

| **Epic** | **Use Case** | **Domain** | **Owner** | **Features / Sprints** |
| --- | --- | --- | --- | --- |
| **UC-01** | Respondent Completes the Questionnaire | Research | SH-02 | 8 Features · S2–S3 |
| **UC-02** | Research Data Quality is Maintained | Research | SH-02 | 4 Features · S2–S3 |
| **UC-03** | Manager Reviews Pilot Analytics | Technical | SH-04 | 4 Features · S4 |
| **UC-04** | Data is Stored, Versioned, and Protected | Technical | SH-04 | 7 Features · S2,S6 |
| **UC-05** | Content Managed Without Code Changes | Technical | SH-04 | 4 Features · S1,S3 |
| **UC-06** | Pilot Debrief and Post-Pilot Reporting | Research | SH-02 | 4 Features · S6 |
| **UC-07** | GuestIQ Deployed, Accessible, Observed | Technical | SH-04 | 9 Features · S1–S5 |

## 1.5 Velocity Overview

| **Sprint** | **Stories** | **MUST** | **SHOULD** | **PHASE 2** | **SP Total** | **Sprint Gate** |
| --- | --- | --- | --- | --- | --- | --- |
| **Pre-Sprint** | 9 | 9 | 0 | — | 0 | Accounts active, Node.js installed |
| **Sprint 0** | 10 | 10 | 0 | — | 14 | All Sprint 0 artifacts approved |
| **Sprint 1** | 11 | 10 | 1 | — | 31 | Branching Logic Spec + 84-path matrix approved |
| **Sprint 2** | 19 | 17 | 2 | — | 62 | Working URL, Modules 1–4 + Q0, Sentry + PostHog live |
| **Sprint 3** | 16 | 13 | 3 | — | 66 | All 79Q, gamification, enrichment, Phase 1b done |
| **Sprint 4** | 10 | 9 | 1 | — | 33 | Dashboard complete, QA passed, UAT Script approved |
| **Sprint 5** | 8 | 7 | 1 | — | 16 | Pilot launched, first real session confirmed |
| **Sprint 6** | 6 | 5 | 1 | — | 8 | Debrief done, Phase 2 decision made, 44 artifacts filed |
| **Phase 2** | 11 | — | — | 11 | TBD | Estimated in Sprint 6 |
| **TOTAL** | **100** | **80** | **9** | **11** | **230+TBD** |  |

# 2. PRE-SPRINT — ENVIRONMENT AND ACCOUNT SETUP

**PRE-SPRINT** *— Human setup tasks — no story points* **[0 SP]**

ℹ Pre-Sprint tasks are performed by the Lead Researcher before Sprint 0 begins. They are foundation work that does not map to a specific UC Slice — they enable all UC slices. Estimated time: 2.5 hours.

**EPIC — PRE Pre-Sprint Environment Setup**

*Domain: Infrastructure* | Epic Owner: SH-02 Lead Researcher

**FEATURE — PRE / Slice 1 Account and environment setup — all tools active**

Stories: PS-01, PS-02, PS-03, PS-04, PS-05, PS-06, PS-07, PS-08, PS-09 **| 0 SP** *| Pre-Sprint*

**PS-01 MUST Create GitHub account and repository**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want create a GitHub account and repository so that the codebase has a home and GitHub Actions CI/CD can be configured.*

**Acceptance Criteria:**

1. GitHub account created at github.com
2. Repository 'guestiq' created as public repository
3. README.md created with project name
4. GitHub Pages enabled on repository settings

**PS-02 MUST Create Supabase account and project**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want create a Supabase account and project so that the database infrastructure is ready for Sprint 2 schema deployment.*

**Acceptance Criteria:**

1. Supabase account created at supabase.com
2. Project named 'guestiq' created on free tier
3. Project URL and anon key saved securely (not in Git)

**PS-03 MUST Create PostHog account and project**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want create a PostHog account and project so that analytics are ready to receive events from Sprint 2 onwards.*

**Acceptance Criteria:**

1. PostHog account created at posthog.com
2. Project created with IP anonymization enabled
3. API key saved securely (not in Git)
4. Session replay with mask\_all\_inputs: true noted for Sprint 2

**PS-04 MUST Create Sentry account and project**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want create a Sentry account and project so that error tracking is ready from Sprint 2 onwards.*

**Acceptance Criteria:**

1. Sentry account created at sentry.io
2. React project created
3. DSN saved securely (not in Git)
4. sendDefaultPii: false noted for Sprint 2

**PS-05 MUST Install Node.js on researcher PC**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want install Node.js so that I can run the local development environment for Sprint 2 review and testing.*

**Acceptance Criteria:**

1. Node.js LTS installed — node --version returns a version number
2. npm --version returns a version number

**PS-06 MUST Configure GitHub Pages and Actions permissions**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want configure GitHub Pages and Actions so that the application deploys automatically on every code push.*

**Acceptance Criteria:**

1. GitHub Pages enabled — source set to GitHub Actions
2. Actions workflow permissions set to allow deployments
3. Test deployment confirmed with placeholder index.html

**PS-07 MUST Create project folder structure**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want create the project folder structure so that all artifacts are organized consistently from Sprint 0 onwards.*

**Acceptance Criteria:**

1. Sprint folders 00 through 06 created, each with AI-Outputs/ and Approved/ subfolders

**PS-08 MUST Create project tracking spreadsheet**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want create a tracking spreadsheet so that story completion and artifact status are visible across all 6 sprints.*

**Acceptance Criteria:**

1. Spreadsheet with sheets: Backlog, Velocity, Artifacts, Bug Log
2. All 44 artifact IDs entered in Artifacts sheet

**PS-09 MUST Verify MS Teams access for pilot communications**

**Epic: PRE | Feature: Feature 1: Account setup** | — SP *| —*

*As a Lead Researcher, I want confirm MS Teams access so that the pilot launch message can reach the front desk team at the right time.*

**Acceptance Criteria:**

1. Lead Researcher can post to front desk team channel
2. Pinned message capability confirmed

# 3. SPRINT 0 — FOUNDATION AND GOVERNANCE

**SPRINT 0** *— Foundation & Governance — all governance and requirements documents* **[14 SP SP]**

ℹ Sprint 0 artifacts are cross-cutting governance documents. They do not map to individual UC Slices — they are the project foundation that all UC Slices depend on. Pre-Sprint and Sprint 0 are the only sections without UC-derived Feature sub-headers.

**EPIC — S0-GOV Sprint 0 Governance and Foundation**

*Domain: Governance* | Epic Owner: SH-02 Lead Researcher

**FEATURE — S0-GOV / Slice 1 Governance and requirements foundation — all Sprint 0 artifacts**

Stories: S0-01, S0-02, S0-03, S0-04, S0-05, S0-06, S0-07, S0-08, S0-09, S0-10 **| 14 SP** *| Sprint 0*

**S0-01 MUST Produce and approve Project Charter v2.1**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 1SP SP *| —*

*As a Lead Researcher, I want receive and approve the Project Charter so that the project has an approved founding document covering purpose, scope, objectives, risks, and methodology.*

**Acceptance Criteria:**

1. Charter v2.1 includes Section 13 (Delivery Methodology) covering all 6 frameworks
2. All 13 sections present and approved

**S0-02 MUST Produce and approve Stakeholder Register v1.1**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 1SP SP *| —*

*As a Lead Researcher, I want receive and approve the Stakeholder Register covering all 7 stakeholders so that every stakeholder's interests and engagement strategy are documented.*

**Acceptance Criteria:**

1. 7 stakeholder profiles (SH-01 to SH-07)
2. Scrum Master Functional Role entry added
3. Epic Owner assignments for SH-02 and SH-04 documented

**S0-03 MUST Produce and approve RACI Matrix v1.1**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 1SP SP *| —*

*As a Lead Researcher, I want receive and approve the RACI Matrix so that every project activity has exactly one accountable owner.*

**Acceptance Criteria:**

1. 10 categories including Scrum Master Function category
2. Accountability audit passes — every activity has exactly one A

**S0-04 MUST Produce and approve Definition of Done and Ready v1.1**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 2SP SP *| —*

*As a Lead Researcher, I want receive and approve the DoD+DoR so that 'complete' means the same thing throughout all 6 sprints.*

**Acceptance Criteria:**

1. Epic-level DoR defined (v1.1 addition)
2. Feature-level DoR with TDD spec criterion defined (v1.1)
3. SM gate criterion in Tier 1 Universal Done (v1.1)

**S0-05 MUST Produce and approve Risk Register v1.1**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 2SP SP *| —*

*As a Lead Researcher, I want receive and approve the Risk Register covering all 12 risks so that every risk has a mitigation and contingency plan.*

**Acceptance Criteria:**

1. 12 risks (R-01 to R-12) including R-11 (Single Human) and R-12 (Methodology Adoption)
2. All risks have owner, mitigation, and contingency

**S0-06 MUST Produce and approve SRS Functional Requirements v2.0**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 2SP SP *| FR-001 to FR-095, FR-097, FR-098*

*As a Lead Researcher, I want receive and approve the SRS-F so that the AI Developer has an unambiguous functional contract for all features.*

**Acceptance Criteria:**

1. 95 requirements across 12 sections
2. Option B UX redesign applied — unified welcome screen, Q0 tense routing, post-completion enrichment
3. 27 canonical PostHog events defined

**S0-07 MUST Produce and approve SRS Non-Functional Requirements v1.2**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 2SP SP *| NFR-001 to NFR-045*

*As a Lead Researcher, I want receive and approve the SRS-NFR so that quality, performance, and security standards are defined before any code is written.*

**Acceptance Criteria:**

1. 45 NFRs across 10 categories including Research Data Integrity (v1.1)
2. NFR-040 updated for Option B event rename (v1.2)

**S0-08 MUST Produce and approve Use Case Specifications v2.0**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 2SP SP *| UC-01 to UC-07*

*As a Lead Researcher, I want receive and approve Use Case Specifications for all 7 GuestIQ Use Cases so that Epics and Features are formally defined before the backlog is structured.*

**Acceptance Criteria:**

1. 7 Use Cases with basic scenarios, extensions, slice tables, and FR traceability
2. UC-01 updated for Option B (Q0, unified welcome, enrichment)
3. Produced BEFORE backlog per Timeline v4.0

**S0-09 MUST Produce and approve Product Backlog v3.1**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 2SP SP *| —*

*As a Lead Researcher, I want receive and approve a complete Product Backlog with full Epic → Feature → Story hierarchy so that every story traces to a user goal.*

**Acceptance Criteria:**

1. 100 stories across all sprints
2. 40 Features (UC Slices) visible as sub-headers
3. Epic, Feature, and Story levels all present
4. Option B changes applied

**S0-10 MUST Produce and approve Test Plan**

**Epic: S0-GOV | Feature: Feature 1: Governance foundation** | 1SP SP *| —*

*As a Lead Researcher, I want receive and approve a Test Plan covering the 84-path branching test matrix and all testing strategies.*

**Acceptance Criteria:**

1. 84-path branching test matrix included
2. Data integrity verification protocol specified
3. UAT Script outline included

# 4. SPRINT 1 — ARCHITECTURE AND DESIGN

**SPRINT 1** *— Architecture & Design — all Sprint 1 architecture documents* **[31 SP SP]**

**EPIC — UC-07 GuestIQ is Deployed, Accessible, and Observed**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-07 / Slice 1 Architecture documents and Sprint 1 approvals**

Stories: S1-01, S1-02, S1-03, S1-04, S1-05, S1-06, S1-07, S1-09, S1-10, S1-11 **| 26 SP** *| Sprint 1*

**S1-01 MUST Produce and approve System Architecture Document**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 3SP SP *| NFR-030 to NFR-037*

*As a Lead Researcher, I want receive and approve a System Architecture Document so that all major architectural decisions are documented before any code is written.*

**Acceptance Criteria:**

1. Architecture decisions documented: React PWA, Supabase, GitHub Pages, service layer pattern
2. Production-readiness gaps and mitigations covered
3. Multi-property architecture pattern explained

**S1-02 MUST Produce and approve Information Architecture Diagram**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 3SP SP *| FR-003, FR-029, FR-051*

*As a Lead Researcher, I want receive and approve an IA Diagram showing all screens and navigation paths so that the complete user flow is visualised before build begins.*

**Acceptance Criteria:**

1. All screens shown: welcome+tier, Q0, episodes 1–7, completion, results, enrichment, dashboard, disambiguation, downtime
2. Option B single-screen welcome reflected

**S1-03 MUST Produce and approve Data Flow Diagram**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 2SP SP *| NFR-010, NFR-014*

*As a Lead Researcher, I want receive and approve a Data Flow Diagram showing how data moves from input through to Supabase so that privacy compliance is visible.*

**Acceptance Criteria:**

1. All data flows shown: browser → application state → service layer → Supabase
2. PostHog and Sentry flows shown
3. PII exclusion points marked
4. Offline queue flow shown

**S1-04 MUST Produce and approve Entity Relationship Diagram and Migrations**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 3SP SP *| FR-048, NFR-031, NFR-032*

*As a Lead Researcher, I want receive and approve an ERD and Supabase migration SQL files so that the database schema is fully specified and ready to deploy in Sprint 2.*

**Acceptance Criteria:**

1. 4-table schema: sessions, responses, scale\_responses, none\_flags
2. All fields with types and nullability — including credentials fields as nullable VARCHAR
3. Supabase migration SQL files provided
4. RLS policy SQL included

**S1-05 MUST Produce and approve Application State Diagram**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 2SP SP *| FR-003, FR-051, FR-057*

*As a Lead Researcher, I want receive and approve an Application State Diagram covering all states and transitions so that session management edge cases are designed before Sprint 2.*

**Acceptance Criteria:**

1. All states shown: initial load, disambiguation, welcome+tier, Q0, episodes 1–7, completion, results, enrichment, dashboard, downtime
2. All transitions shown
3. Error and offline states shown

**S1-06 MUST Configure ESLint and Prettier — produce configuration files**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 2SP SP *| NFR-035, NFR-036*

*As a Lead Researcher, I want receive ESLint and Prettier configuration files so that code quality is enforced before any Sprint 2 code is written.*

**Acceptance Criteria:**

1. ESLint: React hooks, jsx-a11y, unused variables, import ordering
2. Prettier: 2-space indent, single quotes, semicolons, 100-char line width
3. Configs validated against a minimal React project

**S1-07 MUST Produce and approve Branching Logic Specification with 84-path test matrix**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 8SP SP *| FR-027 to FR-032*

*As a Lead Researcher, I want receive and approve the Branching Logic Specification with the 84-path test matrix so that Module 5 routing is fully specified before Sprint 3 build begins.*

**Acceptance Criteria:**

1. All 12 intent category routes documented
2. Secondary purpose routing documented
3. 84 paths each with defined expected outcome
4. Edge cases: none option on Q1, same primary/secondary sub-section

**S1-09 MUST Produce and approve UI/UX Wireframes for all screens**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 5SP SP *| FR-004 to FR-008*

*As a Lead Researcher, I want receive and approve wireframes for all screens so that the visual layout is agreed before the Visual Design System is applied.*

**Acceptance Criteria:**

1. Wireframes for all screens including unified welcome+tier, enrichment screen
2. Option B single-screen welcome reflected
3. Mobile layout included

**S1-10 MUST Produce and approve Visual Design System with SVG badge specs**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 5SP SP *| NFR-016, NFR-020*

*As a Lead Researcher, I want receive and approve the Visual Design System so that all visual styling is locked before Sprint 2 build begins.*

**Acceptance Criteria:**

1. Design tokens: Amateur #4ADE80, Professional #60A5FA, Expert #A78BFA
2. 9 SVG badge designs specified
3. Dark canvas #0D0D12 and dashboard canvas #0B1120 distinguished

**S1-11 SHOULD Produce and approve API Specification**

**Epic: UC-07 | Feature: UC-07 / Slice 1** | 3SP SP *| NFR-037, NFR-057*

*As a Lead Researcher, I want receive and approve an API Specification documenting all service layer functions so that the service layer contract is clear before Sprint 2.*

**Acceptance Criteria:**

1. All service functions documented including updateEnrichment() (v2.0 addition)
2. Input/output types and error handling specified

**EPIC — UC-05 Questionnaire Content Managed Without Code Changes**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-05 / Slice 1 questionnaire.js data structure specification (Phase 1a)**

Stories: S1-08 **| 5 SP** *| Sprint 1*

**S1-08 MUST Design questionnaire.js data structure specification**

**Epic: UC-05 | Feature: UC-05 / Slice 1** | 5SP SP *| FR-019, FR-081, FR-082*

*As a Lead Researcher, I want receive and approve the questionnaire.js data structure so that all 80 questions (Q0 + 79 instrument) are structured consistently before Sprint 2.*

**Acceptance Criteria:**

1. 13-field structure per question defined
2. Q0 (QR1) first entry with module = 0, has\_none\_option = false
3. All 79 instrument questions populated from approved questionnaire document
4. Tier assignments verified: Amateur 8Q, Professional 18Q, Expert 79Q

# 5. SPRINT 2 — CORE APPLICATION BUILD

**SPRINT 2** *— Core Application Build — working URL, Modules 1–4, Q0, observability live* **[62 SP SP]**

ℹ Option B changes: S2-06 (unified welcome screen) and S2-07 (Q0 as first instrument question) are rewritten from v1.0. S2-08 retitled to reflect tense frame engine scope.

**EPIC — UC-04 Data is Stored, Versioned, and Protected**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-04 / Slice 1 4-table Supabase schema via Migrations**

Stories: S2-01 **| 5 SP** *| Sprint 2*

**S2-01 MUST Apply Supabase database schema via Migrations**

**Epic: UC-04 | Feature: UC-04 / Slice 1** | 5SP SP *| FR-048, NFR-012, NFR-031, NFR-032*

*As a Lead Researcher, I want run the Supabase migration files so that all 4 tables and RLS policies are created via version-controlled migrations.*

**Acceptance Criteria:**

1. All 4 tables created: sessions, responses, scale\_responses, none\_flags
2. RLS enabled on all tables — verified in Supabase Authentication → Policies
3. user\_id nullable UUID column present in sessions table
4. credentials\_years, credentials\_interactions, credentials\_shift columns present (nullable VARCHAR)

**EPIC — UC-07 GuestIQ is Deployed, Accessible, and Observed**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-07 / Slice 2 React PWA project structure and initial deployment**

Stories: S2-04, S2-05 **| 5 SP** *| Sprint 2*

**S2-04 MUST Build React PWA project structure with all tooling**

**Epic: UC-07 | Feature: UC-07 / Slice 2** | 3SP SP *| NFR-034, NFR-035, NFR-036*

*As a Lead Researcher, I want see the complete project structure with Vite, Tailwind, Radix UI, Framer Motion, and i18next configured so that Sprint 2 features build on a solid foundation.*

**Acceptance Criteria:**

1. Vite + React 18 structure in place
2. Tailwind with design tokens configured
3. Radix UI, Framer Motion, i18next installed
4. src/hooks/useQuestionnaire.js exists as single import point
5. Zero hardcoded strings in components

**S2-05 MUST Verify initial deployment to GitHub Pages**

**Epic: UC-07 | Feature: UC-07 / Slice 2** | 2SP SP *| NFR-021, NFR-022*

*As a Lead Researcher, I want open guestiq.github.io?property=PROP001 in Edge and Chrome and see the application load correctly so that the deployment pipeline is verified.*

**Acceptance Criteria:**

1. Application loads at guestiq.github.io?property=PROP001
2. Green GitHub Actions deployment checkmark
3. HTTPS confirmed — padlock visible
4. No console errors on initial load

**FEATURE — UC-07 / Slice 3 Sentry and PostHog initialisation**

Stories: S2-02, S2-03 **| 5 SP** *| Sprint 2*

**S2-02 MUST Initialize Sentry SDK as first build task**

**Epic: UC-07 | Feature: UC-07 / Slice 3** | 3SP SP *| NFR-039, NFR-027*

*As a Lead Researcher, I want see Sentry initialized as the very first operation in main.jsx so that all subsequent errors are captured from day one.*

**Acceptance Criteria:**

1. Sentry.init() first import in main.jsx before any React rendering
2. sendDefaultPii: false — no IP collected
3. tracesSampleRate: 1.0 — 100% capture
4. SentryErrorBoundary wraps entire app
5. Test error appears in Sentry within 60 seconds

**S2-03 MUST Initialize PostHog SDK and analytics service**

**Epic: UC-07 | Feature: UC-07 / Slice 3** | 2SP SP *| FR-089, FR-090, NFR-025, NFR-026*

*As a Lead Researcher, I want see PostHog initialized after Sentry with all calls routed through the analytics service so that analytics are captured from the first real session.*

**Acceptance Criteria:**

1. posthog.init() after Sentry — ip: false, persistence: 'memory'
2. src/services/analytics.js exports one function per canonical event
3. No component calls posthog.capture() directly
4. app\_loaded appears in PostHog within 60 seconds
5. mask\_all\_inputs: true in session recording config

**EPIC — UC-01 Respondent Completes the Questionnaire**

*Domain: Research Domain* | Epic Owner: SH-02 Lead Researcher

**FEATURE — UC-01 / Slice 1 Welcome and Tier Selection (unified screen — hook text + tier cards simultaneously, single click to start)**

Stories: S2-06, S2-18 **| 7 SP** *| Sprint 2*

**S2-06 MUST Build unified welcome screen — hook text + tier cards on one screen ★ CHANGED**

**Epic: UC-01 | Feature: UC-01 / Slice 1** | 5SP SP *| FR-004, FR-007, FR-008, FR-009, FR-010*

*As a Lead Researcher, I want see the hook text and tier cards displayed simultaneously on a single screen so that a respondent can read the hook and select their tier in one fluid action — no wait, no Continue button.*

**Acceptance Criteria:**

1. Hook text renders immediately alongside tier cards — no delay, no Continue button
2. Three tier cards with correct colors, descriptors, time/question counts, and 'Start as [Tier]' CTAs
3. Privacy notice visible below tier cards: includes 'Participation is voluntary. You may close this page at any time without consequence.' (FR-008 v2.0 per UC Specs v2.0 Extension 5)
4. A 'Not now' text link visible on welcome screen — clicking it creates no session record and writes no token to localStorage
5. PostHog: welcome\_hook\_viewed and tier\_selected fire correctly
6. Tier selection is the ONLY interaction required before Q0 — verified end-to-end

**S2-18 SHOULD Implement privacy notice on welcome screen**

**Epic: UC-01 | Feature: UC-01 / Slice 1** | 2SP SP *| NFR-015*

*As a Lead Researcher, I want see a brief privacy notice on the welcome screen so that respondents know what data is collected before any collection begins.*

**Acceptance Criteria:**

1. Privacy notice visible on welcome+tier screen: what collected, how used, no personal data retained
2. Text from ui-copy.json — not hardcoded
3. Visible before tier selection without scrolling

**FEATURE — UC-02 / Slice 1 Tense frame data model and application — Q0 as first instrument question + tense\_frame persistence**

Stories: S2-07, S2-08 **| 6 SP** *| Sprint 2*

**S2-07 MUST Build Q0 tense routing as first instrument question ★ CHANGED**

**Epic: UC-01 | Feature: UC-02 / Slice 1** | 3SP SP *| FR-015, FR-016, FR-017, FR-018*

*As a Lead Researcher, I want see QR1 rendered as the first instrument question using the standard Question component so that tense routing is collected within the questionnaire flow — not on a separate screen.*

**Acceptance Criteria:**

1. Q0 (QR1) rendered by standard Question component immediately after tier selection
2. Styled identically to Q1–Q79
3. All 4 options rendered from questionnaire.js
4. Answer A/C → tense\_frame = 'retrospective'. Answer B → 'anticipatory'. Answer D → 'retrospective' + qr1\_other\_text
5. routing\_gate\_answered PostHog event fires with correct tense\_frame

**S2-08 MUST Build tense frame engine — application of tense\_frame across all question renders**

**Epic: UC-01 | Feature: UC-02 / Slice 1** | 3SP SP *| FR-016, FR-017*

*As a Lead Researcher, I want verify that every subsequent question renders in the correct tense throughout the session so that the dual-tense instrument design is correctly implemented.*

**Acceptance Criteria:**

1. tense\_frame stored in application state at Q0 answer — not re-evaluated after
2. Every question reads tense\_frame from session state and selects correct text key
3. Verified on 5 questions across Modules 1–4: retrospective = past tense, anticipatory = future/conditional
4. tense\_frame property on every question\_answered PostHog event

**FEATURE — UC-01 / Slice 2 Modules 1–4 (core questions)**

Stories: S2-09, S2-10 **| 8 SP** *| Sprint 2*

**S2-09 MUST Build all Module 1 questions with tier routing**

**Epic: UC-01 | Feature: UC-01 / Slice 2** | 5SP SP *| FR-019 to FR-027*

*As a Lead Researcher, I want see all Module 1 questions rendered correctly across all three tiers so that stay intent is captured as the foundation for subsequent routing.*

**Acceptance Criteria:**

1. All Module 1 questions (Q1–Q9) rendered for Expert tier
2. Tier routing verified: Amateur sees correct subset
3. Q1 answer writes intent\_category to sessions table
4. None option renders on every question — none\_flag written to Supabase on selection

**S2-10 MUST Build Modules 2, 3, and 4**

**Epic: UC-01 | Feature: UC-01 / Slice 2** | 5SP SP *| FR-019 to FR-027*

*As a Lead Researcher, I want see Modules 2, 3, and 4 rendered and answerable so that the pre-arrival, physical environment, and service interaction modules are functional.*

**Acceptance Criteria:**

1. All Module 2 questions (Q10–Q18) render correctly
2. All Module 3 questions (Q19–Q30) render — scale questions use horizontal layout
3. All Module 4 questions (Q31–Q38) render correctly
4. Multi-select enforces max\_selections gracefully
5. All responses written to Supabase immediately on selection

**FEATURE — UC-01 / Slice 7 Session resume and disambiguation**

Stories: S2-11 **| 5 SP** *| Sprint 2*

**S2-11 MUST Build session creation, resume, and disambiguation screen**

**Epic: UC-01 | Feature: UC-01 / Slice 7** | 5SP SP *| FR-048 to FR-056*

*As a Lead Researcher, I want verify session creation in Supabase, session survival across browser close/reopen, and disambiguation so that shared PC handoffs do not lose data.*

**Acceptance Criteria:**

1. Session record created in Supabase on tier selection
2. guestiq\_session\_token in browser local storage
3. Browser close + reopen → disambiguation screen appears
4. 'That was me' resumes from correct question
5. 'Someone new' starts new session — original preserved
6. PostHog disambiguation events fire correctly

**FEATURE — UC-01 / Slice 8 Offline queue and downtime screen — Sprint 2 portion**

Stories: S2-12 **| 8 SP** *| Sprint 2*

**S2-12 MUST Build Supabase service layer and offline response queue**

**Epic: UC-01 | Feature: UC-01 / Slice 8** | 8SP SP *| FR-057 to FR-060, NFR-006*

*As a Lead Researcher, I want verify that all Supabase calls go through the service layer and the offline queue preserves responses during outages so that no data is lost during the pilot.*

**Acceptance Criteria:**

1. Zero components import Supabase client directly — verified by code search
2. Offline queue activates on Supabase failure — DevTools Offline mode tested
3. 'Your answers are saved locally — reconnecting...' shown
4. Queue retries every 30 seconds
5. All queued responses written on reconnection
6. offline\_queue\_activated and offline\_queue\_flushed events fire
7. RLS rejection errors (HTTP 403/400) detected separately from network failures — trigger Sentry.captureException() with context RLS\_REJECTION and are NOT added to the offline queue for retry (UC Specs v2.0 — UC-04 Extension 2)

**EPIC — UC-04 Data is Stored, Versioned, and Protected**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-04 / Slice 3 Environment configuration and feature flags**

Stories: S2-13 **| 5 SP** *| Sprint 2*

**S2-13 MUST Implement environment configuration and feature flags**

**Epic: UC-04 | Feature: UC-04 / Slice 3** | 5SP SP *| FR-091, FR-092, FR-095*

*As a Lead Researcher, I want verify credentials are in .env (not Git) and feature flags work so that the production-readiness architecture is in place from Sprint 2.*

**Acceptance Criteria:**

1. .env file with all 6 required variables — property\_id=PROP001
2. src/config/features.js exports all flags — no component reads import.meta.env directly
3. VITE\_FEATURE\_AUTH\_ENABLED=false confirmed
4. No credentials in any committed file

**FEATURE — UC-04 / Slice 4 Auth bypass and user\_id nullable column**

Stories: S2-14 **| 3 SP** *| Sprint 2*

**S2-14 MUST Configure Supabase Auth in bypass mode**

**Epic: UC-04 | Feature: UC-04 / Slice 4** | 3SP SP *| FR-093*

*As a Lead Researcher, I want verify Supabase Auth is configured in bypass mode so that Phase 2 authentication activation requires only a feature flag change.*

**Acceptance Criteria:**

1. Auth configured in src/services/supabase.js
2. VITE\_FEATURE\_AUTH\_ENABLED=false → bypass mode active
3. When flag set to true: auth flow activates with no other code changes
4. user\_id = null in all prototype sessions

**FEATURE — UC-04 / Slice 2 Service layer, RLS policies, and security configuration**

Stories: S2-17 **| 3 SP** *| Sprint 2*

**S2-17 MUST Verify RLS policies and security configuration**

**Epic: UC-04 | Feature: UC-04 / Slice 2** | 3SP SP *| NFR-010 to NFR-014*

*As a Lead Researcher, I want verify all security requirements are met so that no PII is collected and research data is protected.*

**Acceptance Criteria:**

1. RLS enabled on all 4 tables — anon key cannot read other sessions
2. HTTPS on live URL — all DevTools calls show https://
3. No credentials in any committed file
4. Zero PII fields in Supabase — schema reviewed
5. PostHog and Sentry IP anonymization confirmed in dashboards

**EPIC — UC-02 Research Data Quality is Maintained**

*Domain: Research Domain* | Epic Owner: SH-02 Lead Researcher

**FEATURE — UC-02 / Slice 2 Data integrity verification protocol — Sprint 2 pass**

Stories: S2-15 **| 5 SP** *| Sprint 2*

**S2-15 MUST Execute Sprint 2 test suite and data integrity verification**

**Epic: UC-02 | Feature: UC-02 / Slice 2** | 5SP SP *| NFR-043, NFR-044, NFR-045*

*As a Lead Researcher, I want execute the data integrity verification protocol so that tense frame accuracy, routing fidelity, and none-flag capture are confirmed before the Sprint 2 gate passes.*

**Acceptance Criteria:**

1. 2 sessions Answer A — tense\_frame = 'retrospective' in sessions table
2. 2 sessions Answer B — tense\_frame = 'anticipatory'
3. All question\_answered events carry correct tense\_frame
4. 3 sessions selecting None on 5+ questions — none\_flags count matches UI count exactly
5. Q1 intent\_category written correctly for all 12 taxonomy codes

**EPIC — UC-07 GuestIQ is Deployed, Accessible, and Observed**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-07 / Slice 9 Accessibility audit, performance, mobile compatibility, and code quality — Sprint 2 portion**

Stories: S2-16, S2-19 **| 3 SP** *| Sprint 2*

**S2-16 MUST Fix all Sprint 2 High and Medium severity bugs**

**Epic: UC-07 | Feature: UC-07 / Slice 9** | 2SP SP *| —*

*As a Lead Researcher, I want confirm all High and Medium bugs found during Sprint 2 testing are resolved so that Sprint 3 does not inherit unresolved quality issues.*

**Acceptance Criteria:**

1. Zero High severity bugs open
2. Zero Medium severity bugs open
3. Low severity bugs documented with deferred sprint noted

**S2-19 SHOULD Verify mobile browser functionality — Amateur flow**

**Epic: UC-07 | Feature: UC-07 / Slice 9** | 1SP SP *| NFR-024*

*As a Lead Researcher, I want complete the Amateur flow on Chrome for Android so that mobile functionality is confirmed as a secondary priority.*

**Acceptance Criteria:**

1. Application loads on Chrome for Android
2. Amateur flow (8Q + Q0) completable end-to-end
3. No elements hidden, overlapping, or unresponsive
4. Data write to Supabase confirmed from mobile

# 6. SPRINT 3 — FULL QUESTIONNAIRE AND GAMIFICATION

**SPRINT 3** *— Full Questionnaire + Gamification — all 79Q, Module 5, enrichment screen* **[66 SP SP]**

ℹ S3-16 (optional post-completion enrichment screen) is new in v2.0 — 3SP SHOULD. S3-02 contributes to both UC-01 Slice 3 (Module 5 build) and UC-02 Slice 3 (routing fidelity verification).

**EPIC — UC-01 Respondent Completes the Questionnaire**

*Domain: Research Domain* | Epic Owner: SH-02 Lead Researcher

**FEATURE — UC-01 / Slice 3 Module 5 branching — all 7 sub-sections**

Stories: S3-01, S3-02 **| 18 SP** *| Sprint 3*

**S3-01 MUST Build Module 5 — all 7 sub-sections with branching**

**Epic: UC-01 | Feature: UC-01 / Slice 3** | 13SP SP *| FR-029 to FR-032*

*As a Lead Researcher, I want see Module 5 route correctly to all 7 intent-specific sub-sections based on the respondent's Q1 answer so that the core research instrument logic is functional.*

**Acceptance Criteria:**

1. All 7 sub-sections built: 5A Work, 5B Leisure, 5C Displacement, 5D Medical, 5E Family, 5F Transit, 5G Local Escape
2. Routing from Q1 intent\_category verified for all 12 taxonomy codes
3. Secondary purpose routing (Q2) triggers second sub-section
4. None on Q1 routes to manual intent-selection screen

**S3-02 MUST Test Module 5 branching against 84-path test matrix**

**Epic: UC-01 | Feature: UC-01 / Slice 3** | 5SP SP *| FR-029 to FR-032, NFR-044*

*As a Lead Researcher, I want execute all 84 paths and record pass/fail so that Module 5 routing fidelity is formally verified before the Sprint 3 gate passes.*

**Acceptance Criteria:**

1. All 84 paths executed — pass recorded for each
2. intent\_category in sessions table matches Q1 answer\_code for 100% of test sessions
3. Secondary routing verified for 6+ combinations
4. Both tense frames verified across routing paths
5. Zero routing failures — any failure blocks the sprint gate

**FEATURE — UC-01 / Slice 4 Modules 6–7 (value and post-stay)**

Stories: S3-03 **| 5 SP** *| Sprint 3*

**S3-03 MUST Build Modules 6 and 7**

**Epic: UC-01 | Feature: UC-01 / Slice 4** | 5SP SP *| FR-019 to FR-027*

*As a Lead Researcher, I want see Modules 6 and 7 rendered and answerable so that the value/pricing and post-stay modules complete the full 79-question instrument.*

**Acceptance Criteria:**

1. All Module 6 questions (Q57–Q66) rendered correctly
2. All Module 7 questions (Q67–Q79) rendered correctly
3. Professional and Expert tier question counts verified: 18 and 79

**FEATURE — UC-01 / Slice 5 Gamification layer — progress bar, episode map, badges, curiosity hooks, tier upgrade prompts**

Stories: S3-04, S3-05, S3-06, S3-07, S3-14 **| 14 SP** *| Sprint 3*

**S3-04 MUST Build progress bar and episode map**

**Epic: UC-01 | Feature: UC-01 / Slice 5** | 5SP SP *| FR-033 to FR-037*

*As a Lead Researcher, I want see the progress bar and 7-node episode map on every question screen so that respondents can see where they are at all times.*

**Acceptance Criteria:**

1. Progress bar on every question screen — fills proportionally within current episode
2. 7-node episode map: completed = checkmark, current = pulsing, future = muted
3. Episode names from episodes.json — not hardcoded
4. episode\_started and episode\_completed fire with correct properties

**S3-05 MUST Build curiosity hooks and end-of-episode screens**

**Epic: UC-01 | Feature: UC-01 / Slice 5** | 3SP SP *| FR-038, FR-039*

*As a Lead Researcher, I want see curiosity hook screens between episodes so that respondents have a moment of reward and anticipation.*

**Acceptance Criteria:**

1. Curiosity hook screen after each of Episodes 1–6
2. Hook text from episodes.json — not hardcoded
3. 'Continue to [next episode name]' button correctly named
4. curiosity\_hook\_viewed fires with episode\_number

**S3-06 MUST Build SVG achievement badge system**

**Epic: UC-01 | Feature: UC-01 / Slice 5** | 5SP SP *| FR-040, FR-041*

*As a Lead Researcher, I want see the 9 SVG achievement badges awarded at correct moments with Framer Motion animations so that professional recognition is built into the experience.*

**Acceptance Criteria:**

1. All 9 badges as React SVG components accepting color prop
2. Badge triggers verified: First Step (Q1) through Expert Complete (79Q)
3. Framer Motion: 1.0→1.15→1.0 scale over 300ms
4. Animation fires once per badge per session

**S3-07 MUST Build tier upgrade prompts**

**Epic: UC-01 | Feature: UC-01 / Slice 5** | 5SP SP *| FR-043 to FR-046*

*As a Lead Researcher, I want see tier upgrade prompts after Episode 1 (Amateur) and Episode 4 (Professional) so that respondents can contribute more data.*

**Acceptance Criteria:**

1. Upgrade prompt after Episode 1 for Amateur — shows additional time and benefit
2. Upgrade prompt after Episode 4 for Professional
3. Accepting: session tier updated in Supabase, continues from next unanswered question
4. tier\_upgrade\_prompted, tier\_upgrade\_accepted, tier\_upgrade\_declined all fire

**S3-14 SHOULD Build streak mechanic**

**Epic: UC-01 | Feature: UC-01 / Slice 5** | 1SP SP *| FR-047*

*As a Lead Researcher, I want see a streak counter for consecutive days of engagement so that multi-day completions have an additional motivational mechanic.*

**Acceptance Criteria:**

1. Streak tracks consecutive calendar days with at least one answered question
2. Stored in browser local storage
3. Shown subtly on episode map screen
4. Does not affect routing, scoring, or data

**FEATURE — UC-01 / Slice 6 Completion, results screen, and optional post-completion enrichment screen ★ NEW v3.0**

Stories: S3-08, S3-09, S3-16 **| 16 SP** *| Sprint 3*

**S3-08 MUST Build completion celebration screen and results display**

**Epic: UC-01 | Feature: UC-01 / Slice 6** | 8SP SP *| FR-061 to FR-064*

*As a Lead Researcher, I want see the completion screen with all earned badges and personal results summary so that the post-questionnaire experience is rewarding.*

**Acceptance Criteria:**

1. Completion screen: congratulatory heading, tier name, all earned badges in grid
2. Personal results: primary intent category, top expectation priorities, service interaction style
3. Aggregate comparison chart when 3+ complete sessions exist for same property\_id
4. session\_completed, results\_viewed, aggregate\_comparison\_viewed fire correctly
5. Optional enrichment screen appears after results (see S3-16)

**S3-09 MUST Apply full visual design system to all screens**

**Epic: UC-01 | Feature: UC-01 / Slice 6** | 5SP SP *| NFR-016, NFR-020*

*As a Lead Researcher, I want see the Visual Design System applied consistently across all screens so that GuestIQ has a professional, coherent visual identity.*

**Acceptance Criteria:**

1. All screens use design tokens from Visual Design System — no ad-hoc colors
2. Tier accent colors applied correctly throughout
3. Dark canvas #0D0D12 for respondent, #0B1120 for dashboard
4. Color not sole indicator — selected states verified

**S3-16 SHOULD Build optional post-completion enrichment screen ★ NEW**

**Epic: UC-01 | Feature: UC-01 / Slice 6** | 3SP SP *| FR-012, FR-097, FR-098*

*As a Lead Researcher, I want see an optional enrichment screen after the results display so that motivated completers can share demographic context with zero pre-questionnaire friction.*

**Acceptance Criteria:**

1. Enrichment screen appears after results for all respondents
2. Heading: 'You are done — 30 more seconds? Help us understand who answered.'
3. Three single-click fields: years band, interactions per shift, shift pattern
4. Each field saves immediately on click — no Submit button
5. Skip button always visible — dismisses without blocking
6. Session remains is\_complete = true regardless of enrichment
7. Enrichment data written via updateEnrichment() service function
8. credentials\_enrichment\_completed fires on dismiss with fields\_answered count

**EPIC — UC-02 Research Data Quality is Maintained**

*Domain: Research Domain* | Epic Owner: SH-02 Lead Researcher

**FEATURE — UC-02 / Slice 3 Module 5 routing fidelity verification — 84-path matrix**

Stories: S3-02 **| 5 SP — also counted under UC-01 / Slice 3** *| Sprint 3*

ℹ S3-02 contributes to both UC-01 Slice 3 (build) and UC-02 Slice 3 (verification). Story points counted once under UC-01 Slice 3.

**S3-02 MUST Test Module 5 branching against 84-path test matrix (also UC-02 / Slice 3)**

**Epic: UC-02 | Feature: UC-02 / Slice 3** | 0SP SP *| NFR-044*

*As a Lead Researcher, I want execute all 84 branching paths so that Module 5 routing fidelity is formally verified for research validity.*

**Acceptance Criteria:**

1. [See UC-01 / Slice 3 for full acceptance criteria]
2. Story counted once — listed here for UC-02 traceability

**FEATURE — UC-02 / Slice 4 Second data integrity pass — post-Sprint 3 full instrument**

Stories: S3-13 **| 3 SP** *| Sprint 3*

**S3-13 MUST Second data integrity verification pass**

**Epic: UC-02 | Feature: UC-02 / Slice 4** | 3SP SP *| NFR-006, NFR-043 to NFR-045*

*As a Lead Researcher, I want execute a second data integrity pass after all 79 questions are live so that data quality is confirmed for the full instrument.*

**Acceptance Criteria:**

1. 3 complete Expert tier sessions (79Q + Q0) — all response records verified
2. tense\_frame consistency across all 79 questions for both tense variants
3. Module 5 routing re-verified for full Expert sessions
4. none\_flags count matches UI selections — 100% fidelity

**EPIC — UC-05 Questionnaire Content Managed Without Code Changes**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-05 / Slice 2 Phase 1b JSON extraction — Strangler Fig migration**

Stories: S3-11 **| 8 SP** *| Sprint 3*

**S3-11 MUST Execute Phase 1b JSON content extraction — Strangler Fig migration**

**Epic: UC-05 | Feature: UC-05 / Slice 2** | 8SP SP *| FR-083 to FR-085*

*As a Lead Researcher, I want see all questionnaire content moved from questionnaire.js into 6 JSON config files so that content can be edited without code changes.*

**Acceptance Criteria:**

1. 6 JSON files created: questions.json, episodes.json, tiers.json, ui-copy.json, branching.json, taxonomy.json
2. Application reads from JSON files — questionnaire.js retained as reference
3. All 6 files committed to Git

**FEATURE — UC-05 / Slice 3 Phase 1b identical-behavior verification**

Stories: S3-12 **| 5 SP** *| Sprint 3*

**S3-12 MUST Verify Phase 1b migration — identical behavior check**

**Epic: UC-05 | Feature: UC-05 / Slice 3** | 5SP SP *| FR-083 to FR-085*

*As a Lead Researcher, I want verify application behavior after Phase 1b migration is identical to before so that the extraction did not introduce errors.*

**Acceptance Criteria:**

1. 10 questions cross-referenced between questions.json and original questionnaire document — all match
2. All 84 routing paths verified post-migration — same results as pre-migration
3. Config validator tested: deliberate JSON error produces clear error before respondent content renders

**EPIC — UC-07 GuestIQ is Deployed, Accessible, and Observed**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-07 / Slice 9 Accessibility audit, performance, mobile compatibility, and code quality — Sprint 3 portion**

Stories: S3-10, S3-15 **| 4 SP** *| Sprint 3*

**S3-10 MUST Accessibility audit — WCAG 2.1 AA**

**Epic: UC-07 | Feature: UC-07 / Slice 9** | 3SP SP *| NFR-016 to NFR-019*

*As a Lead Researcher, I want confirm WCAG 2.1 AA compliance so that GuestIQ is usable by all front desk team members regardless of assistive needs.*

**Acceptance Criteria:**

1. axe-core scan on all screens — zero AA contrast failures
2. Full Amateur flow navigated keyboard-only — every element reachable and activatable
3. SVG badge aria-labels present and descriptive
4. All interactive elements use Radix UI primitives

**S3-15 SHOULD Verify mobile browser accessibility — full flow**

**Epic: UC-07 | Feature: UC-07 / Slice 9** | 1SP SP *| NFR-024*

*As a Lead Researcher, I want complete the full Professional flow on Chrome for Android so that mobile accessibility is confirmed for the complete instrument.*

**Acceptance Criteria:**

1. All Professional tier questions (18Q + Q0) completable on Chrome for Android
2. All interactive elements have minimum 44×44px touch targets
3. No content clipped or overlapping

# 7. SPRINT 4 — DASHBOARD, POLISH, AND QA

**SPRINT 4** *— Dashboard, QA, and Polish — prototype complete and ready for UAT* **[33 SP SP]**

**EPIC — UC-03 Manager Reviews Pilot Analytics**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-03 / Slice 1 Dashboard overlay shell and SHIFT+CTRL+A trigger**

Stories: S4-01 **| 5 SP — also covers UC-03 Slice 2** *| Sprint 4*

**S4-01 MUST Build management dashboard overlay and all 9 panels**

**Epic: UC-03 | Feature: UC-03 / Slice 1 + 2** | 13SP SP *| FR-065 to FR-077*

*As a Lead Researcher, I want see the complete management dashboard overlay with all 9 panels so that analytics are accessible without technical knowledge.*

**Acceptance Criteria:**

1. SHIFT+CTRL+A activates overlay on all screens except disambiguation
2. Overlay uses #0B1120 canvas — distinct from respondent canvas
3. All 9 panels functional: Response Overview, Intent Distribution, Planning Horizon, Expectation Priorities, Competitive Threat, Service Interaction Spectrum, Value Reference, None Flags, Raw Data
4. All panels load within 5 seconds with 20+ test sessions
5. ESC and click-outside both close overlay
6. Underlying session undisturbed after closing overlay
7. Panel 1 (Response Overview) distinguishes three session states: (a) complete (is\_complete = true), (b) active incomplete (is\_complete = false, resume event within 72h), (c) abandoned (is\_complete = false, no resume event within 72h of last response). Abandoned sessions excluded from participation rate numerator. (UC Specs v2.0 — UC-02 Extension 3)
8. When complete session count is below 5, all panels display a visible warning: Warning: fewer than 5 sessions — patterns shown are preliminary and should not be treated as reliable. Warning included in PDF export header. Dashboard remains fully functional. (UC Specs v2.0 — UC-03 Extension 3)

**FEATURE — UC-03 / Slice 3 CSV export and PDF summary report**

Stories: S4-02 **| 8 SP** *| Sprint 4*

**S4-02 MUST Build CSV export and PDF summary report**

**Epic: UC-03 | Feature: UC-03 / Slice 3** | 8SP SP *| FR-078 to FR-080*

*As a Lead Researcher, I want export a CSV of all sessions and a PDF summary report so that pilot data can be backed up and shared at the debrief meeting.*

**Acceptance Criteria:**

1. Export CSV: guestiq-export-PROP001-[date].csv opens correctly in Microsoft Excel
2. All sessions and responses joined — all columns present with human-readable headers
3. Export PDF: one-page client-side PDF with chart, top priorities, competitive threat summary
4. dashboard\_exported\_csv and dashboard\_exported\_pdf fire with response\_count
5. Export failure handling: if CSV or PDF generation fails (zero-byte file, JavaScript error, or download does not trigger), the export button shows an error state with a Retry button. Sentry captures the error with session count, browser, and error type. If retry also fails: fallback instruction shown to access Supabase Table Editor directly. Lead Researcher receives Sentry alert. (UC Specs v2.0 — UC-03 Extension 2)

**EPIC — UC-01 Respondent Completes the Questionnaire**

*Domain: Research Domain* | Epic Owner: SH-02 Lead Researcher

**FEATURE — UC-01 / Slice 8 Offline queue and downtime screen — Sprint 4 portion**

Stories: S4-05 **| 3 SP** *| Sprint 4*

**S4-05 MUST Build Supabase downtime contingency screen**

**Epic: UC-01 | Feature: UC-01 / Slice 8** | 3SP SP *| FR-059, NFR-007*

*As a Lead Researcher, I want see the downtime screen appear when Supabase has been unreachable for 60 seconds so that respondents always know the application status.*

**Acceptance Criteria:**

1. 65-second Supabase outage simulation — contingency screen appears within 5 seconds of 65-second mark
2. Screen: 'GuestIQ is temporarily unavailable. Your answers are saved. Please try again in 30 minutes.'
3. Retry button visible and triggers connectivity check
4. Offline queue captured responses throughout — verified in local storage

**EPIC — UC-07 GuestIQ is Deployed, Accessible, and Observed**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-07 / Slice 4 Cross-browser QA and front desk PC verification**

Stories: S4-03, S4-04 **| 5 SP** *| Sprint 4*

**S4-03 MUST Cross-browser QA — Edge and Chrome on Windows**

**Epic: UC-07 | Feature: UC-07 / Slice 4** | 3SP SP *| NFR-021, NFR-022*

*As a Lead Researcher, I want complete the full Expert flow in Edge and Chrome on Windows so that browser compatibility is formally verified before UAT.*

**Acceptance Criteria:**

1. Complete Expert flow in Microsoft Edge on Windows — zero console errors
2. Complete Professional flow in Chrome on Windows — zero console errors
3. SHIFT+CTRL+A dashboard verified in both
4. Visual design correct in both browsers

**S4-04 MUST On-site front desk PC verification**

**Epic: UC-07 | Feature: UC-07 / Slice 4** | 2SP SP *| NFR-001, NFR-023*

*As a Lead Researcher, I want open GuestIQ on each of the 3 actual front desk PCs so that real deployment environment compatibility is confirmed.*

**Acceptance Criteria:**

1. Application loads on all 3 front desk PCs
2. Amateur flow complete on each — session in Supabase confirmed
3. SHIFT+CTRL+A dashboard works on at least 1 PC
4. Content not clipped at front desk monitor resolution
5. Load time confirmed < 2 seconds on hotel broadband

**FEATURE — UC-07 / Slice 5 Playwright visual regression baseline**

Stories: S4-06 **| 3 SP** *| Sprint 4*

**S4-06 MUST Configure Playwright visual regression baseline**

**Epic: UC-07 | Feature: UC-07 / Slice 5** | 3SP SP *| NFR-035*

*As a Lead Researcher, I want capture Playwright baseline screenshots for all key screens so that visual regressions in subsequent deployments are automatically detected.*

**Acceptance Criteria:**

1. Playwright installed and configured
2. Baseline screenshots for: welcome+tier, Q0, question types, episode map, curiosity hook, completion, enrichment, dashboard
3. All baselines passing — zero regressions from capture

**FEATURE — UC-03 / Slice 4 Dashboard QA and PostHog event verification**

Stories: S4-07 **| 3 SP — also covers UC-07 Slice 6** *| Sprint 4*

**S4-07 MUST Verify all 27 PostHog events and Sentry instrumentation completeness**

**Epic: UC-03 | Feature: UC-03 / Slice 4** | 3SP SP *| NFR-040, NFR-039*

*As a Lead Researcher, I want verify all 27 canonical PostHog events and Sentry capture are working correctly so that observability is complete before the pilot.*

**Acceptance Criteria:**

1. All 27 event names verified in PostHog Events dashboard — exact names per SRS-F v2.0 Section 11.3
2. Event #4 = credentials\_enrichment\_completed (not v1.0 name credentials\_completed)
3. Test error appears in Sentry within 60 seconds
4. Core Web Vitals visible in Sentry Performance
5. dashboard\_opened and dashboard\_panel\_viewed firing correctly

**FEATURE — UC-07 / Slice 9 Accessibility audit, performance, mobile, and code quality — Sprint 4 portion**

Stories: S4-08, S4-09, S4-10 **| 6 SP** *| Sprint 4*

**S4-08 MUST Produce UAT Script, Deployment Checklist, and Bug Reporting Guide**

**Epic: UC-07 | Feature: UC-07 / Slice 9** | 3SP SP *| —*

*As a Lead Researcher, I want receive the UAT Script and support documents so that Sprint 5 UAT and pilot launch can be executed in a structured way.*

**Acceptance Criteria:**

1. UAT Script covers all major user flows — approved by Lead Researcher
2. Deployment Checklist covers all pre-launch steps
3. Bug Reporting Guide is a single-page document for pinning in MS Teams
4. All three documents approved before Sprint 5 begins

**S4-09 MUST Performance verification — page load and transition times**

**Epic: UC-07 | Feature: UC-07 / Slice 9** | 2SP SP *| NFR-001, NFR-002, NFR-003*

*As a Lead Researcher, I want confirm page load and transition times meet NFR targets on front desk PCs so that performance is verified under real conditions.*

**Acceptance Criteria:**

1. LCP ≤ 2 seconds on hotel broadband — Sentry Performance p50
2. TTI ≤ 3 seconds — Sentry Performance p50
3. Question-to-question transition ≤ 300ms — manual + Sentry span

**S4-10 SHOULD Bundle size optimization check**

**Epic: UC-07 | Feature: UC-07 / Slice 9** | 1SP SP *| NFR-005*

*As a Lead Researcher, I want verify the JavaScript bundle is under 500KB gzipped so that the application loads quickly on hotel broadband.*

**Acceptance Criteria:**

1. Vite build output: total JS ≤ 500KB gzipped
2. If over 500KB: code splitting applied and build re-checked

# 8. SPRINT 5 — USER ACCEPTANCE TESTING AND PILOT LAUNCH

**SPRINT 5** *— UAT and Pilot Launch — first real respondent session confirmed* **[16 SP SP]**

**EPIC — UC-07 GuestIQ is Deployed, Accessible, and Observed**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-07 / Slice 7 UAT facilitation and pilot launch**

Stories: S5-01, S5-02, S5-03, S5-04 **| 10 SP** *| Sprint 5*

**S5-01 MUST Select, brief, and facilitate UAT sessions with 2–3 team members**

**Epic: UC-07 | Feature: UC-07 / Slice 7** | 5SP SP *| —*

*As a Lead Researcher, I want facilitate UAT sessions with front desk team members so that critical usability issues are identified before the full pilot launch.*

**Acceptance Criteria:**

1. 2–3 team members participate in UAT — not developers
2. UAT Script followed throughout
3. Critical usability issues identified and logged
4. Gamification perception specifically probed
5. Enrichment screen skip button tested

**S5-02 MUST Compile UAT findings and implement Critical fixes**

**Epic: UC-07 | Feature: UC-07 / Slice 7** | 3SP SP *| —*

*As a Lead Researcher, I want resolve all Critical UAT issues so that no Critical issue reaches the pilot launch.*

**Acceptance Criteria:**

1. UAT findings compiled
2. All Critical issues resolved and re-verified before launch message is sent
3. High issues assessed — deferred or resolved

**S5-03 MUST Final pre-launch verification on all 3 front desk PCs**

**Epic: UC-07 | Feature: UC-07 / Slice 7** | 1SP SP *| NFR-023*

*As a Lead Researcher, I want complete a final verification on all 3 front desk PCs immediately before the launch message so that the application is confirmed working.*

**Acceptance Criteria:**

1. Application loads on all 3 front desk PCs within 24 hours of launch
2. Amateur flow completed on each — session in Supabase confirmed
3. No new bugs since Sprint 4 PC verification

**S5-04 MUST Send pilot launch message via MS Teams and distribute Bug Reporting Guide**

**Epic: UC-07 | Feature: UC-07 / Slice 7** | 1SP SP *| —*

*As a Lead Researcher, I want send the pilot launch message so that the 2-week pilot window officially begins.*

**Acceptance Criteria:**

1. Launch message sent to front desk team channel at start of a shift
2. Bug Reporting Guide pinned to Teams channel
3. Message includes: what GuestIQ is, how to access, how to report bugs

**FEATURE — UC-07 / Slice 8 Pilot monitoring and bug response — Sprint 5 portion**

Stories: S5-05, S5-06, S5-07, S5-08 **| 6 SP — Sprint 5 portion** *| Sprint 5*

**S5-05 MUST Daily monitoring — Supabase session counts and PostHog events**

**Epic: UC-07 | Feature: UC-07 / Slice 8** | 2SP SP *| —*

*As a Lead Researcher, I want monitor pilot engagement daily so that participation shortfalls can be addressed before it is too late.*

**Acceptance Criteria:**

1. Daily: Supabase sessions table — new sessions since previous day
2. Daily: PostHog funnel — app\_loaded → session\_completed
3. Day 5 follow-up message if participation below target per Risk R-03
4. Critical bugs addressed within 24 hours

**S5-06 MUST Confirm first real respondent session in PostHog and Sentry**

**Epic: UC-07 | Feature: UC-07 / Slice 8** | 1SP SP *| NFR-041, NFR-042*

*As a Lead Researcher, I want confirm the first non-developer session appears in both PostHog and Sentry so that real-world observability is verified.*

**Acceptance Criteria:**

1. At least 1 session\_completed from a non-developer session in PostHog
2. Sentry: no critical unresolved errors from real devices
3. Core Web Vitals visible in Sentry for 1+ real sessions
4. PostHog session replay visible for 1+ real sessions

**S5-07 MUST Fix any Critical mid-pilot bugs within 24 hours of report**

**Epic: UC-07 | Feature: UC-07 / Slice 8** | 1SP SP *| —*

*As a Lead Researcher, I want ensure any Critical bug is fixed and deployed within 24 hours so that data collection is not materially disrupted.*

**Acceptance Criteria:**

1. Critical bug reported → fixed and deployed within 24 hours
2. Fix verified on at least 1 front desk PC
3. Affected respondents notified if session may have been impacted
4. Bug logged with root cause and resolution

**S5-08 SHOULD Mid-pilot check-in with front desk team**

**Epic: UC-07 | Feature: UC-07 / Slice 8** | 2SP SP *| —*

*As a Lead Researcher, I want check in with team members around Day 5 so that friction or confusion can be addressed before the pilot closes.*

**Acceptance Criteria:**

1. Informal conversation with 2+ team members around Day 5
2. Feedback documented — actionable items addressed immediately

# 9. SPRINT 6 — PILOT MONITORING, DEBRIEF, AND PROJECT CLOSE

**SPRINT 6** *— Pilot monitoring, debrief, and project close — all 13 success conditions met* **[8 SP SP]**

**EPIC — UC-04 Data is Stored, Versioned, and Protected**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-04 / Slice 5 Weekly CSV backup protocol**

Stories: S6-01 **| 1 SP** *| Sprint 6*

**S6-01 MUST Weekly CSV exports to OneDrive — data backup protocol**

**Epic: UC-04 | Feature: UC-04 / Slice 5** | 1SP SP *| NFR-009*

*As a Lead Researcher, I want save weekly CSV exports to OneDrive so that research data is protected against accidental Supabase project deletion.*

**Acceptance Criteria:**

1. CSV export saved to OneDrive at end of Sprint 6 Week 1 — guestiq-export-PROP001-[date].csv
2. Second CSV saved at end of Sprint 6 Week 2
3. Both confirmed opening correctly in Microsoft Excel

**EPIC — UC-06 Pilot Debrief and Post-Pilot Reporting**

*Domain: Research Domain* | Epic Owner: SH-02 Lead Researcher

**FEATURE — UC-06 / Slice 1 Final data export and PostHog funnel analysis**

Stories: S6-02 **| 2 SP — also covers UC-04 Slice 6** *| Sprint 6*

**S6-02 MUST Final pilot data export and PostHog funnel analysis**

**Epic: UC-06 | Feature: UC-06 / Slice 1** | 2SP SP *| —*

*As a Lead Researcher, I want produce a final data export and PostHog funnel analysis after the pilot closes so that the complete dataset is ready for the debrief report.*

**Acceptance Criteria:**

1. Final CSV export produced — cross-checked against Supabase session count
2. PostHog funnel screenshot: app\_loaded → session\_completed
3. Drop-off rates per episode extracted
4. Sentry performance summary screenshot saved
5. All exports archived in Sprint 6 folder

**FEATURE — UC-06 / Slice 2 Pilot Debrief Report production**

Stories: S6-03 **| 3 SP** *| Sprint 6*

**S6-03 MUST Produce Pilot Debrief Report**

**Epic: UC-06 | Feature: UC-06 / Slice 2** | 3SP SP *| —*

*As a Lead Researcher, I want receive a structured Pilot Debrief Report so that findings are professionally presented at the debrief meeting.*

**Acceptance Criteria:**

1. Sections: methodology summary, participation metrics, findings by intent category, none-flag analysis, PostHog engagement data, 3+ operational insights, Phase 2 recommendations
2. At least 3 actionable operational insights — specific and grounded in response patterns

**FEATURE — UC-06 / Slice 3 Debrief meeting and Phase 2 decision**

Stories: S6-04 **| 1 SP** *| Sprint 6*

**S6-04 MUST Conduct debrief meeting and agree Phase 2 decision**

**Epic: UC-06 | Feature: UC-06 / Slice 3** | 1SP SP *| —*

*As a Lead Researcher, I want conduct the 45-minute debrief meeting with Hotel Management so that findings are presented and the Phase 2 decision is made.*

**Acceptance Criteria:**

1. 45-minute meeting conducted
2. 3+ operational insights presented with supporting data
3. Phase 2 decision (Yes/No/Deferred) made and recorded in writing

**EPIC — UC-04 Data is Stored, Versioned, and Protected**

*Domain: Technical Domain* | Epic Owner: SH-04 AI Developer

**FEATURE — UC-04 / Slice 7 Project close — artifact archiving**

Stories: S6-05 **| 1 SP** *| Sprint 6*

**S6-05 MUST Archive all 44 project artifacts and complete retrospective**

**Epic: UC-04 | Feature: UC-04 / Slice 7** | 1SP SP *| —*

*As a Lead Researcher, I want confirm all 44 artifacts are filed and a retrospective is completed so that the project is formally closed.*

**Acceptance Criteria:**

1. All 44 artifacts in their Approved folders — verified against artifact registry
2. Sprint 6 retrospective completed — lessons documented for Phase 2
3. Tracking spreadsheet: all stories marked Complete

**EPIC — UC-06 Pilot Debrief and Post-Pilot Reporting**

*Domain: Research Domain* | Epic Owner: SH-02 Lead Researcher

**FEATURE — UC-06 / Slice 4 Phase 2 Recommendations Document and Velocity Review**

Stories: S6-06 **| 1 SP** *| Sprint 6*

**S6-06 SHOULD Produce Phase 2 Recommendations Document and Velocity Review**

**Epic: UC-06 | Feature: UC-06 / Slice 4** | 1SP SP *| —*

*As a Lead Researcher, I want receive a Phase 2 Recommendations Document so that Phase 2 Sprint 0 has a strong starting point.*

**Acceptance Criteria:**

1. Phase 2 scope: multi-property, authentication, language support, admin CMS, instrument refinements
2. Velocity review: actual vs planned SP per sprint
3. Phase 2 budget estimate included

# 10. PHASE 2 — DEFERRED STORIES

Phase 2 stories are unestimated and explicitly out of scope for the Phase 1 prototype. They are captured here to preserve good ideas. They will be estimated in Sprint 6 during Phase 2 planning.

**PH-01 PHASE 2 Multi-property deployment — second property onboarding**

**Epic: UC-07 | Feature: UC-07 / Future** | — SP *| —*

*As a Hotel Manager at a second property, I want access GuestIQ so that cross-property research data comparison is possible.*

**Acceptance Criteria:**

1. Phase 2 — unestimated. property\_id architecture ready from Phase 1.

**PH-02 PHASE 2 Supabase Auth — full authentication for management access**

**Epic: UC-04 | Feature: UC-04 / Future** | — SP *| —*

*As a Lead Researcher, I want activate Supabase authentication so that the management dashboard requires login.*

**Acceptance Criteria:**

1. Phase 2 — VITE\_FEATURE\_AUTH\_ENABLED=true activation trigger.

**PH-03 PHASE 2 Visual admin CMS — question and content editing interface**

**Epic: UC-05 | Feature: UC-05 / Future** | — SP *| —*

*As a Lead Researcher, I want edit questionnaire content through a form-based interface without editing JSON files.*

**Acceptance Criteria:**

1. Phase 2 — unestimated. /admin route. Draft/publish workflow.

**PH-04 PHASE 2 Multi-language support — French translation as first language**

**Epic: UC-01 | Feature: UC-01 / Future** | — SP *| —*

*As a Front Desk Respondent at a French-speaking property, I want complete the questionnaire in French.*

**Acceptance Criteria:**

1. Phase 2 — i18n architecture ready from Phase 1. Translation files only needed.

**PH-05 PHASE 2 Guest-facing deployment — QR code and public URL**

**Epic: UC-01 | Feature: UC-01 / Future** | — SP *| —*

*As a Hotel Guest, I want access GuestIQ via QR code so that my own expectations can be captured directly.*

**Acceptance Criteria:**

1. Phase 2 — different respondent audience. Instrument may need adaptation.

**PH-06 PHASE 2 Cross-property benchmarking dashboard**

**Epic: UC-03 | Feature: UC-03 / Future** | — SP *| —*

*As a Hotel Manager, I want compare my property's data against anonymised data from other properties.*

**Acceptance Criteria:**

1. Phase 2 — requires multi-property data volume.

**PH-07 PHASE 2 Psychometric validation study**

**Epic: UC-02 | Feature: UC-02 / Future** | — SP *| —*

*As a Lead Researcher, I want run a psychometric validation study on the guest-facing dataset for academic publication.*

**Acceptance Criteria:**

1. Phase 2 — requires 200+ responses minimum.

**PH-08 PHASE 2 Dashboard materialized views and caching**

**Epic: UC-03 | Feature: UC-03 / Future** | — SP *| —*

*As a Hotel Manager, I want the dashboard to load under 2 seconds with 1,000+ sessions.*

**Acceptance Criteria:**

1. Phase 2 — Supabase Pro tier and materialized views required.

**PH-09 PHASE 2 Automated PDF report to hotel management — weekly digest**

**Epic: UC-06 | Feature: UC-06 / Future** | — SP *| —*

*As a Lead Researcher, I want a weekly PDF emailed to management automatically.*

**Acceptance Criteria:**

1. Phase 2 — Supabase scheduled function required.

**PH-10 PHASE 2 SSO / Active Directory integration**

**Epic: UC-04 | Feature: UC-04 / Future** | — SP *| —*

*As a Hotel IT Administrator, I want GuestIQ to integrate with our Active Directory.*

**Acceptance Criteria:**

1. Phase 2 — Supabase SAML or OAuth integration.

**PH-11 PHASE 2 Kiosk mode — lobby tablet deployment**

**Epic: UC-01 | Feature: UC-01 / Future** | — SP *| —*

*As a Hotel Manager, I want deploy GuestIQ on a lobby tablet in kiosk mode.*

**Acceptance Criteria:**

1. Phase 2 — QR code + kiosk mode + guest UX adaptation required.

# 11. STORY COUNT AND POINT VERIFICATION

| **Sprint** | **Stories** | **MUST** | **SHOULD** | **PHASE 2** | **SP Total** | **Sprint Gate** |
| --- | --- | --- | --- | --- | --- | --- |
| **Pre-Sprint** | 9 | 9 | 0 | — | 0 | Accounts active, Node.js installed |
| **Sprint 0** | 10 | 10 | 0 | — | 14 | All Sprint 0 artifacts approved |
| **Sprint 1** | 11 | 10 | 1 | — | 31 | Branching Logic Spec + 84-path matrix approved |
| **Sprint 2** | 19 | 17 | 2 | — | 62 | Working URL, Modules 1–4 + Q0, Sentry + PostHog live |
| **Sprint 3** | 16 | 13 | 3 | — | 66 | All 79Q, gamification, enrichment, Phase 1b done |
| **Sprint 4** | 10 | 9 | 1 | — | 33 | Dashboard complete, QA passed, UAT Script approved |
| **Sprint 5** | 8 | 7 | 1 | — | 16 | Pilot launched, first real session confirmed |
| **Sprint 6** | 6 | 5 | 1 | — | 8 | Debrief done, Phase 2 decision made, 44 artifacts filed |
| **Phase 2** | 11 | — | — | 11 | TBD | Estimated in Sprint 6 |
| **TOTAL** | **100** | **80** | **9** | **11** | **230+TBD** |  |

ℹ v3.1 adds no new stories vs v3.0 (100 stories unchanged). Points unchanged at 230. Four story cards updated with new acceptance criteria (S2-06, S2-12, S4-01, S4-02). Two artifact references updated (S0-08, S0-09). All changes derived from UC Specs v2.0 critique review.

# 12. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Dev | Initial version. 99 stories. 227 SP. Flat sprint-banner structure. No Epic or Feature grouping. |
| **v2.0** | [Sprint 0] | Claude / AI Dev | Epic grouping added (9 Epics from UC Specs). Option B redesign: S2-06, S2-07, S2-08 updated, S3-16 added. 100 stories, 230 SP. Document ID corrected to S0-2.7. |
| **v3.0** | [Sprint 0] | Claude / AI Dev | Full Epic → Feature → Story hierarchy implemented. 40 Feature (UC Slice) sub-headers added. Every story shows Epic label, Feature label, SP, and FR refs. |
| **v3.1** | [Sprint 0] | Claude / AI Dev | Targeted AC additions from UC Specs v2.0 critique. No new stories, no point changes, no sprint reassignments. Changes: S2-06 AC — voluntary participation link (UC-01 Extension 5). S2-12 AC — RLS rejection detection separate from network failure (UC-04 Extension 2). S4-01 AC — Panel 1 distinguishes complete/active-incomplete/abandoned sessions; minimum-data warning when sessions < 5 (UC-02 Extension 3 + UC-03 Extension 3). S4-02 AC — export failure handling with retry and Sentry capture (UC-03 Extension 2). S0-08/S0-09 updated to reference UC Specs v2.0 and Backlog v3.1. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF PRODUCT BACKLOG v3.1 —**

*GuestIQ · Product Backlog v3.1 · S0-2.7 · Epic → Feature → Story · 100 stories · 40 Features · Living document — refine at every sprint start*