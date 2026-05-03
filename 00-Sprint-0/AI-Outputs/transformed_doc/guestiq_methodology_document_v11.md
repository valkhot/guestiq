**GUESTIQ METHODOLOGY DOCUMENT**

**Hybrid Delivery Framework · Six Active Frameworks · Foundational Reference**

|  |  |
| --- | --- |
| **Document ID** | S0-0.1 — Sprint 0 Artifact |
| **Document Version** | 1.1 — Updated: TDD and PLG added |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Change from v1.0** | Two frameworks added: F-05 Behaviour-Driven TDD · F-06 Product-Led Growth. Framework register updated from 19 to 21 entries. Sections 2, 7, 9 updated. |
| **Purpose** | Anchor document for all Sprint 0 v1.1 artifact updates. Binding reference for all subsequent sprints. |
| **Document Location** | 00-Sprint-0 / AI-Outputs / GuestIQ-Methodology-Document-v1.1.docx |

ℹ This document records all methodology and framework decisions agreed during Sprint 0. It is the anchor for all v1.1 updates to previously approved Sprint 0 artifacts. Any future methodology change must be recorded here first — as a versioned update — before any other artifact is updated.

# 1. PURPOSE AND SCOPE

GuestIQ is developed using a hybrid methodology combining six active frameworks: Use Case 3.0, Scrum, PRINCE2-lite Governance, Academic Research Methodology, Behaviour-Driven TDD, and Product-Led Growth. This document defines the complete methodology stack, records the rationale for every framework decision, specifies how the frameworks interact, and establishes the rules governing all subsequent sprints.

This document was produced after the initial Sprint 0 artifacts (S0-1.2 through S0-2.5) were approved, because the methodology was agreed progressively through the Sprint 0 planning conversation rather than prescribed upfront. All approved artifacts remain correct. The v1.1 updates triggered by this document are additive only — they surface and formalise what was already being done, and add the elements identified as missing during the Sprint 0 audit.

Version 1.1 adds two frameworks omitted from v1.0: Behaviour-Driven TDD (which was present in the planning discussion and implicitly implemented through the 84-path test matrix, Playwright, and data integrity protocols, but never formally named) and Product-Led Growth (whose mechanics are fully embedded in the product design but were not named or structured as a framework).

# 2. THE SIX ACTIVE FRAMEWORKS

GuestIQ operates with six frameworks simultaneously across three layers: delivery (Scrum + Use Case 3.0), quality (Behaviour-Driven TDD), governance (PRINCE2-lite + Academic Research Methodology), and growth (PLG). They do not compete — they occupy distinct layers. Where they interact, conflict resolution rules are defined in Section 8.

**F-01 Use Case 3.0**

*Jacobson & Cockburn, December 2024 — ivarjacobson.com*

|  |  |
| --- | --- |
| **What We Take**  Use Case Storytelling practice (lightest in the UC3.0 family). Narrative format — no UML diagrams required. Use Case Slices map to Features. Work Items (user stories) are derived from slices. Principle 10: system developed in slices, each slice = path through use case + design + code + tests. 100% compatible with existing Scrum user stories. | **Why It Matters for GuestIQ**  Restores the user journey context lost in a flat backlog. 7 Use Cases become Epics; slices become Features; existing stories sit below. Every story traces to a user goal — not just a sprint bucket. Provides the traceability chain that connects the research instrument design to the software delivery. |

**F-02 Scrum**

*Schwaber & Sutherland — The Scrum Guide*

|  |  |
| --- | --- |
| **What We Take**  2-week sprints, prioritised backlog, Definition of Done and Ready, sprint velocity, sprint retrospectives. Story points using Fibonacci. MoSCoW priority. Sprint gates as hard stops. Adapted for one-person team: no daily standups; artifact approval conversation serves as sprint review. | **Why It Matters for GuestIQ**  Provides predictable delivery cadence across the 14-week timeline. The 6-sprint structure is the backbone of the Master Development Timeline. DoD and DoR documents are Scrum artifacts. Velocity data from Sprint 2 recalibrates estimates for Sprints 3–6. Sprint gates enforce quality before delivery continues. |

**F-03 PRINCE2-lite Governance**

*PRINCE2 — adapted for small-team AI-accelerated projects*

|  |  |
| --- | --- |
| **What We Take**  Formal project initiation artifacts: Project Charter, Stakeholder Register, RACI Matrix, Risk Register, Definition of Done and Ready. Sequential gate-based approval — every artifact approved before the next is produced. Formal scope change process. Explicit accountability assignments. Living documents updated every sprint. | **Why It Matters for GuestIQ**  GuestIQ has real external stakeholders — Hotel Management, Property Owner, potential academic collaborators — who require formal documentation. PRINCE2-lite provides the audit trail that justifies the research findings and the Phase 2 investment decision. The governance artifacts predate the methodology document and are already in full operation. |

**F-04 Academic Research Methodology**

*Hospitality research practice — push-pull theory, ECT, SERVQUAL*

|  |  |
| --- | --- |
| **What We Take**  Instrument validity and reliability. Dual-tense questionnaire design (retrospective and anticipatory). 12-category intent taxonomy with taxonomy code integrity. Research data quality standards formalised as NFR-043, NFR-044, NFR-045. Publishable findings as a parallel output alongside the application. | **Why It Matters for GuestIQ**  GuestIQ is simultaneously a software product and a research instrument. Software frameworks do not cover tense frame accuracy, Module 5 routing fidelity, or none\_flag capture integrity. These are now formalised as NFRs and Sprint 0 gate conditions. Academic integrity is the unconditional priority — if research data is compromised, the pilot pauses. |

**F-05 Behaviour-Driven TDD**

*Test-Driven Development adapted for AI-accelerated delivery — Option A confirmed*

|  |  |
| --- | --- |
| **What We Take**  Expected behaviour defined BEFORE code is written using three instruments: (1) 84-path branching test matrix produced in Sprint 1 before Sprint 2 coding begins; (2) Playwright visual regression baseline captured in Sprint 4 — every deployment must pass before going live; (3) Data integrity verification protocol — 5 sessions traced from UI to Supabase before Sprint 2 gate. Acceptance criteria in every user story are the test specification. | **Why It Matters for GuestIQ**  GuestIQ's highest-risk logic — 84 branching paths, offline queue behaviour, session resume, Supabase data integrity — must be specified before implementation. The 84-path matrix is a test suite before a test runner. Playwright catches visual regressions that pure unit tests miss. The data integrity protocol is the research data equivalent of an integration test. Together these three cover the primary failure modes without requiring Vitest micro-cycles that would slow AI-accelerated delivery. |

**F-06 Product-Led Growth — Phase 1 Mechanics**

*PLG — adapted for internal B2B research tool at single-property pilot scale*

|  |  |
| --- | --- |
| **What We Take**  Engagement loop designed into the product (Trigger → Episode → Reward → Expand). North Star Metric = completion rate per tier. PLG funnel measured by PostHog: app\_loaded → tier\_selected → episode\_started → episode\_completed → session\_completed. Input metrics: episode drop-off, badge unlock rate, tier upgrade acceptance, session resume rate. Time-to-value: Amateur tier = ~5 minutes to first results. Aha moment: results screen with aggregate comparison. | **Why It Matters for GuestIQ**  GuestIQ's adoption is entirely driven by the product experience — not by management mandate, training programmes, or sales. If the product is not engaging, the pilot fails. PLG thinking was embedded in the design from day one (identity-based tier labels, curiosity hooks, badge system, results comparison) but was not named as a framework. Naming it makes the engagement design decisions explicit, measurable, and improvable in Phase 2. |

# 3. BEHAVIOUR-DRIVEN TDD — FULL SPECIFICATION

## 3.1 What It Is and What It Is Not

Behaviour-Driven TDD for GuestIQ is Option A — expected behaviour is defined before code is written, using three formal instruments. It is not the pure red-green-refactor micro-cycle that requires a live test runner between code changes. That approach is not feasible in an AI-accelerated single-session delivery model where Claude cannot execute code between writes.

What makes this TDD rather than post-hoc testing is the sequence: the test specification (the 84-path matrix, the Playwright baseline, the data integrity protocol) is produced and approved BEFORE the implementation sprint begins. The developer (Claude) implements against the specification. The human (Lead Researcher) verifies against it. This is the test-first principle applied at the behaviour level rather than the function level.

## 3.2 The Three TDD Instruments

| **Instrument** | **Sprint** | **How It Implements Test-First** |
| --- | --- | --- |
| **84-Path Branching Test Matrix** | **Sprint 1** | Produced in S1-2.1 before any Sprint 2 routing code is written. Defines all 84 expected routing outcomes: [Tier] × [Q1 intent category] × [tense\_frame] → [expected Module 5 sub-section]. AI implements Sprint 3 Module 5 routing strictly against this matrix. Lead Researcher runs all 84 paths in Sprint 3 testing and records Pass/Fail. The matrix IS the test suite — test first, implement second. |
| **Playwright Visual Regression** | **Sprint 4** | Baseline screenshots captured in Sprint 4 (S4-2.8) after QA passes. Every subsequent deployment via GitHub Actions runs Playwright against the baseline before the deployment goes live. If any screen deviates from the baseline, the deployment is blocked. This is test-first at the integration level: the baseline defines the expected visual state; any code change must satisfy it. |
| **Data Integrity Verification Protocol** | **Sprint 2** | Specified in S2-3.2 before data is collected. 5 complete sessions traced from UI selection → Supabase record. Expected outcomes defined: every Q1 answer\_code in the responses table matches the UI selection; intent\_category in the sessions table matches the Q1 taxonomy code; none\_flags count matches UI none-selections exactly. These expectations are the test specification; the Sprint 2 implementation must satisfy them. |

## 3.3 Acceptance Criteria as Test Specifications

Every user story in the Product Backlog has specific, testable acceptance criteria. These criteria are written in the Definition of Ready phase — before the story enters a sprint. They function as the test specification: the AI Developer implements code that satisfies them; the Lead Researcher verifies the criteria are met before marking the story done. This is Behaviour-Driven Development (BDD) at the story level — behaviour specified before implementation.

## 3.4 What Behaviour-Driven TDD Does NOT Cover

Vitest unit tests for individual functions are not written in Phase 1. The trade-off is explicit: pure TDD micro-cycles would add 3–5 story points per sprint of test-writing overhead and require Claude to produce test files before component files in every session — a pattern that slows AI-accelerated delivery without proportional quality benefit at this project's scale. The three instruments above cover the highest-risk behaviour: routing logic, visual integrity, and research data accuracy. Phase 2, with a larger codebase and more developers, should evaluate adding Vitest.

# 4. PRODUCT-LED GROWTH — PHASE 1 MECHANICS

## 4.1 The Engagement Loop

GuestIQ's adoption depends entirely on the product experience — there is no sales process, no mandatory training, and no management mandate to complete the questionnaire. The product must earn its own adoption through the quality of the respondent experience. The engagement loop is the mechanism by which this happens.

|  |  |  |  |
| --- | --- | --- | --- |
| **TRIGGER**  Identity-based tier label activates professional self-concept. Front desk professional sees 'Expert' and self-identifies. | **EPISODE**  Curiosity hooks at each episode end create forward tension. Respondent wants to see the next finding. Progress bar shows momentum. | **REWARD**  Badge reveal + personal results comparison = immediate visible value. Contribution becomes tangible before the session ends. | **EXPAND**  Tier upgrade prompt offers more. Colleagues discuss results. Lead Researcher sees aggregate data. Management sees operational insight. |

## 4.2 Time-to-Value — The PLG Onboarding Funnel

In PLG, time-to-value is the most important metric during the first session. A respondent who reaches the results screen has experienced value and is far more likely to complete the questionnaire and recommend it to colleagues than one who abandons at Episode 2. The tier structure is GuestIQ's PLG onboarding design:

| **Tier** | **Questions** | **Time to First Value** | **PLG Role** |
| --- | --- | --- | --- |
| **Amateur** | 8 questions | ~5 minutes | Low-friction entry. PLG onboarding path. Every respondent can reach the results screen and see value in under 5 minutes. Upgrade prompt at Episode 1 end. |
| **Professional** | 18 questions | ~8 minutes | Mid-funnel. Most respondents self-select this tier based on identity. Upgrade prompt at Episode 4 end. |
| **Expert** | 79 questions | ~16 minutes | High-commitment. Full instrument. Results screen is the deepest value moment — aggregate comparison with colleagues. |

## 4.3 The Aha Moment

In PLG, the 'aha moment' is the specific moment when a user first experiences the core value of the product. For GuestIQ, the aha moment is the results screen — specifically the aggregate comparison chart that appears when 3+ sessions exist. This is the moment a respondent sees: 'My professional perspective on guest expectations, compared to my colleagues, expressed as data.' Everything in the product design — tier labels, episode structure, curiosity hooks, badge system — exists to get the respondent to this screen.

The aha moment is deliberately positioned at completion, not partway through. This is a deliberate PLG design choice: the full value is revealed only to those who complete, which maximises the North Star Metric (completion rate) and ensures the most engaged respondents experience the deepest value.

## 4.4 PLG Metrics — Phase 1

| **Metric Type** | **Metric** | **Source** | **What It Tells Us** |
| --- | --- | --- | --- |
| **North Star** | Completion rate per tier | Supabase: is\_complete / started sessions, per property\_id | The single number that captures whether the product is working. Target: ≥60% minimum threshold, ≥80% stretch. |
| **Activation** | Episode 1 completion rate | PostHog: episode\_completed(E1) / app\_loaded | What percentage of starters reach the first episode complete. Below 60% = the trigger or welcome experience is failing. |
| **Engagement depth** | Episode drop-off rate | PostHog: funnel across episodes 1–7 | Which episode is losing respondents. Identifies the weakest point in the engagement loop for Phase 2 redesign. |
| **Growth signal** | Tier upgrade acceptance rate | PostHog: tier\_upgrade\_accepted / tier\_upgrade\_prompted | How many respondents self-upgrade when offered. Measures the identity-based design effectiveness. |
| **Retention signal** | Session resume rate | Supabase + PostHog: disambiguation\_resumed / disambiguation\_shown | Respondents who return to incomplete sessions. Indicates the product is worth coming back to. |
| **Engagement quality** | Time per question | PostHog: time\_on\_question property on question\_answered | Respondents spending too little time may be rushing. Too much time may indicate confusion. |
| **Research quality** | None-flag rate per question | Supabase: none\_flags / responses per question | Questions with high none-flag rates may need refinement in Phase 2. Target: <15% per question average. |

## 4.5 PLG — Phase 2 Expansion

The Phase 1 PLG mechanics are bounded by the single-property, staff-facing pilot. Phase 2 unlocks the full PLG model: multi-property benchmark comparison (respondents see their property's expectations profile against the industry benchmark — the most powerful value proposition for hotel management), guest-facing deployment (viral loop where improved guest satisfaction drives repeat deployment), A/B testing on curiosity hooks and episode names using PostHog, and product-qualified lead identification (properties that complete the pilot become Phase 2 expansion targets). These are Phase 2 backlog items — not Phase 1 scope.

# 5. WORK HIERARCHY — EPIC → FEATURE → STORY → TASK

The four-level work hierarchy connects Use Case 3.0 requirements structure to Scrum sprint execution. The hierarchy also integrates with Behaviour-Driven TDD: the test specification for each level is defined at the level above it (84-path matrix at the Feature level; acceptance criteria at the Story level).

**EPIC = Use Case**

|  |  |
| --- | --- |
| **Definition:** Complete user journey from trigger to value. Contains all scenarios and extensions. Spans multiple sprints.  **Timeframe:** Multiple sprints  **Owner:** SH-02 Researcher (research Epics) / SH-04 AI Dev (technical Epics) | **GuestIQ Example**  UC-01 'Front desk respondent completes the questionnaire' — full story from welcome to results screen, covering all 3 tiers, all 7 modules, all 84 routing paths. |

**FEATURE = Use Case Slice**

|  |  |
| --- | --- |
| **Definition:** Staged, implementable path through a Use Case. Bounded to one sprint. Includes requirements + design + code + tests (TDD Principle 10).  **Timeframe:** 1–2 sprints  **Owner:** Same as parent Epic Owner | **GuestIQ Example**  'Amateur tier flow — Modules 1–4' — a Sprint 2 slice of UC-01. Test specification: 8 specific questions render with correct tier routing. Data integrity verified for 5 sessions. |

**USER STORY = Work Item from slice**

|  |  |
| --- | --- |
| **Definition:** Sprint-sized deliverable. User story format. Acceptance criteria = the test specification (BDD). Satisfies DoR before entering sprint. Satisfies DoD before marking complete.  **Timeframe:** One sprint  **Owner:** Story Owner: AI Developer (code) or Lead Researcher (artifact) | **GuestIQ Example**  'Build welcome screen three-beat sequence' — specific ACs: hook renders immediately, Continue button appears after 3 seconds, tier selection screen loads on click. PostHog app\_loaded fires. |

**TASK = Implementation Sub-item**

|  |  |
| --- | --- |
| **Definition:** Sub-day implementation detail. Internal to the session. Not tracked in formal backlog. Optional for simple stories; useful for complex ones.  **Timeframe:** Sub-day  **Owner:** Always AI Developer (code tasks) or Lead Researcher (review/test tasks) | **GuestIQ Example**  'Implement 3-second Beat 2 delay timer using setTimeout' — an implementation decision inside the welcome screen story. Does not appear in the backlog. |

# 6. SCRUM MASTER FUNCTION

## 6.1 The Problem This Solves

GuestIQ has one human covering all human roles: Project Sponsor, Lead Researcher, UAT Facilitator, Pilot Monitor, and Hotel Management Liaison. This creates a documented structural tension: the Product Owner instinct (deliver value, ship the feature) overrides the Scrum Master instinct (protect process, enforce gates) when both live in the same person. The result is predictable — Definition of Ready criteria are skipped under pressure, sprint gates become formalities, quality debt accumulates silently. Risk R-11 in the Risk Register formally captures this as High probability / High impact.

The resolution: Claude holds the Scrum Master function at the start of each sprint session — before any delivery work begins. In SM mode, Claude acts as process guardian, not delivery partner. The function is lightweight: a 5-minute structured checklist. It is not optional. Any item that fails must be resolved before delivery begins.

## 6.2 Role Definition

|  |  |
| --- | --- |
| **Role Name** | Scrum Master — GuestIQ Prototype |
| **Held By** | Claude (AI Developer) — in a distinct mode at sprint start |
| **Activation Trigger** | First message of each sprint session that is explicitly a sprint start |
| **Duration** | 5 minutes maximum — structured checklist only |
| **Frequency** | Once per sprint — Sprints 1 through 6 |
| **Bridges** | Use Case 3.0 ↔ Scrum ↔ PRINCE2-lite ↔ Academic Research ↔ TDD ↔ PLG |
| **Authority** | Can and must flag any gate condition unmet, DoR unsatisfied, or impediment before delivery begins |
| **Boundary** | SM function ends when checklist is complete. Claude shifts to AI Developer mode. |

## 6.3 The Sprint-Start Checklist

|  |  |
| --- | --- |
| **1** | **Previous Sprint Gate Conditions**  Are all gate conditions from the previous sprint confirmed as passed? Is every artifact in its Approved folder? Is the Risk Register updated for this sprint? Any gate condition unmet = no new sprint work begins. |
| **2** | **Epic / Feature / Story Hierarchy**  Are all stories entering this sprint correctly parented to Features? Are Features correctly parented to Use Case Epics? A story without a parent Feature fails DoR. The SM verifies hierarchy before planning proceeds. |
| **3** | **Definition of Ready — all entering stories**  Does every story satisfy the full DoR including the new Epic-level and Feature-level criteria added in v1.1? Any story failing DoR returns to the backlog. No exceptions — not under time pressure. |
| **4** | **TDD Test Specifications**  For any story involving the 84-path matrix (Sprint 1), Playwright (Sprint 4), or the data integrity protocol (Sprint 2): is the test specification approved and available before coding begins? Code does not precede the test spec. |
| **5** | **PLG Metric Check (Sprint 5–6)**  During the pilot sprints: what does the PostHog funnel show? Is the North Star Metric trending toward the 60% threshold? Is there a specific drop-off point requiring attention? This check informs Sprint 6 priorities. |
| **6** | **Impediments and Methodology Conflicts**  Are there any impediments blocking sprint work? Any situation where two frameworks give conflicting guidance? Log in Risk Register if systemic. Resolve before delivery begins. |
| **7** | **Use Case Model Currency**  Are the Use Cases in S0-2.7 still accurate? Has any design decision changed what the system does for a user? A stale Use Case must be updated before the affected stories enter the sprint. |

# 7. BUSINESS GOALS FRAMEWORK

## 7.1 Jobs-to-Be-Done — Three Actor Statements

GuestIQ serves three actor groups, each hiring the product for a different job. These statements are the anchor for all product decisions. If a design choice does not help at least one actor complete their job, it does not belong in the prototype.

**Actor 1 — Hotel Management / Project Sponsor**

|  |  |  |
| --- | --- | --- |
| **Functional Job** | Understand why guests choose this hotel for specific stay purposes and what they expect from each experience, so that operational decisions are made with reliable data instead of intuition or anecdote. | *What they accomplish* |
| **Social Job** | To be seen as a data-informed operator who makes decisions based on evidence — distinguishing the property from competitors who rely on gut feel and satisfaction scores alone. | *How they want to be seen* |
| **Emotional Job** | Confident that resource allocation, service design, and staff training decisions are grounded in what guests actually need. | *How they want to feel* |

**Actor 2 — Lead Researcher**

|  |  |  |
| --- | --- | --- |
| **Functional Job** | Collect a validated, publishable dataset using a gamified instrument that front desk staff will actually complete — at zero IT cost and zero monetary cost — within a 14-week window. | *What they accomplish* |
| **Social Job** | To produce a research instrument and dataset that earns academic credibility: citable, methodologically rigorous, grounded in push-pull theory, ECT, and SERVQUAL. | *How they want to be seen* |
| **Emotional Job** | Confident that the research methodology is sound, the data is clean, and the findings are defensible to academic reviewers and hotel management alike. | *How they want to feel* |

**Actor 3 — Front Desk Team**

|  |  |  |
| --- | --- | --- |
| **Functional Job** | Contribute professional expertise to research that matters without it feeling like a survey, so that their knowledge of guest behaviour is made visible and valued beyond the front desk. | *What they accomplish* |
| **Social Job** | To be recognised as hospitality professionals whose expertise is worth studying — not just service delivery agents completing a form. | *How they want to be seen* |
| **Emotional Job** | That their 8–16 minutes of engagement produced something real: data they can see, insights they contributed to, and a sense that their professional knowledge has weight. | *How they want to feel* |

## 7.2 North Star Metric

**GuestIQ's North Star Metric is the percentage of respondents who complete their selected tier, measured as (complete sessions ÷ started sessions) for the same property\_id at the close of the pilot window.**

This metric captures engagement quality (the instrument works), experience quality (gamification works), and research quality (data is sufficient) in a single number. It is measurable directly from Supabase: SELECT COUNT(\*) WHERE is\_complete = true, divided by SELECT COUNT(\*) WHERE property\_id = 'PROP001'. The pilot minimum threshold is 60%. The stretch target is 80%. The OKRs (success criteria in the Project Charter) are the time-bound key results that operationalise this persistent goal.

# 8. STORY MAPPING — DEFERRED TO PHASE 2

Story mapping (Jeff Patton, 2005) is not used in Phase 1 for three precise reasons. First: the discovery phase it enables already happened through the Sprint 0 planning conversation — the shared understanding story mapping creates was built here. Second: story mapping requires a visual workshop format (Miro, whiteboard) that is incompatible with text-based AI collaboration. Third: the Product Backlog v1.0 already contains the structural output that a story map would have produced — the Epic/Feature/Story hierarchy, Use Case traceability, and sprint slice boundaries are all present.

Story mapping is explicitly recommended for the opening of Phase 2 planning. A two-hour session on a Miro board — starting with the guest's complete journey from pre-booking intent through post-stay advocacy (the 79 questions laid out horizontally) — would be the highest-leverage Phase 2 scoping activity. The PLG expansion decisions (multi-property benchmark, guest-facing deployment, A/B testing) are all story mapping inputs.

# 9. COMPLETE FRAMEWORK DECISION REGISTER

Every framework evaluated during Sprint 0 planning is recorded with its decision and rationale. This register is the permanent reference for why the methodology looks the way it does. 21 entries: 8 USE, 5 DEFER, 8 DROP.

| **Framework / Technique** | **Decision** | **Rationale** |
| --- | --- | --- |
| **Use Case 3.0 (Jacobson / Cockburn 2024)** | **USE** | Requirements and traceability layer. Storytelling practice. Use Cases = Epics. Slices = Features. Work Items = Stories. 100% compatible with existing backlog. |
| **Scrum** | **USE** | Sprint delivery. 2-week cadence, backlog, velocity, DoD/DoR, retrospectives. Adapted for one-person team. |
| **PRINCE2-lite Governance** | **USE** | All Sprint 0 governance artifacts. Already in operation — formalised by this document. |
| **Academic Research Methodology** | **USE** | Instrument integrity, dual-tense design, taxonomy coding. Formalised as NFR-043/044/045. |
| **Behaviour-Driven TDD — Option A** | **USE** | Three instruments: 84-path matrix (Sprint 1), Playwright visual regression (Sprint 4), data integrity protocol (Sprint 2). Test specification before code, always. |
| **Product-Led Growth — Phase 1 Mechanics** | **USE** | Engagement loop, time-to-value, aha moment, PLG funnel, 7 input metrics. All mechanics embedded in product design. Named and measured from Sprint 5. |
| **Jobs-to-be-Done (JTBD)** | **USE** | 3 actor statements. Grounds all product decisions in user goals. Produced as S0-0.3. |
| **North Star Metric** | **USE** | Completion rate per tier. Single persistent measure. Stated explicitly in S0-0.5. Operationalised by Project Charter success criteria (OKRs). |
| **OKRs (Objectives and Key Results)** | **USE** | Already exist as success criteria in Project Charter. Not renamed — identified as the operational implementation of the North Star. |
| **Scrum Master Function** | **USE** | Held by Claude at sprint start. 7-item checklist (updated from 5 to include TDD spec check and PLG metric check). Resolves single-human structural tension. |
| **Story Mapping (Jeff Patton)** | **DEFER** | Phase 2 planning only. Discovery phase already occurred. Visual workshop format incompatible with AI text collaboration. Backlog already has story map's structural output. |
| **Value Proposition Canvas** | **DEFER** | Phase 2 only. Useful for new stakeholder types — property groups, academic partners, guests. |
| **Blue Ocean Strategy** | **DEFER** | Phase 2 only. GuestIQ as 'Guest Expectation Intelligence' positioning requires market data not yet available. |
| **Lean Analytics / OMTM** | **DEFER** | Phase 2 growth optimisation when multi-property data enables comparison. Not useful at single-property pilot scale. |
| **A/B Testing / Experimentation** | **DEFER** | Phase 2 only. PostHog supports it. No statistical basis at single-property, single-pilot scale. Curiosity hook and episode name variants are Phase 2 PLG experiments. |
| **ADKAR Change Management** | **DROP** | Wrong scale and wrong phase. Designed for organisational transformations. GuestIQ's adoption is solved by PLG design, not change management programs. |
| **Full TOGAF Architecture** | **DROP** | 7 production-readiness requirements in SRS-F (FR-091 to FR-096) cover everything TOGAF-lite would add. Full framework adds overhead with no benefit at prototype scale. |
| **Full SAFe (Scaled Agile Framework)** | **DROP** | Designed for multiple Agile Release Trains. One human, one AI. Epic/Feature/Story vocabulary taken from SAFe; full framework not applicable. |
| **Dual-Track Agile (Discovery + Delivery)** | **DROP** | Requires separate discovery and delivery teams. With one human and one AI, discovery and delivery are the same conversation. |
| **Vitest Unit Testing** | **DROP** | Pure TDD micro-cycles would add 3–5 story points of test-writing overhead per sprint without proportional quality benefit at Phase 1 scale. Re-evaluate for Phase 2 with larger codebase. |
| **Event Storming** | **DROP** | Workshop technique for discovering domain events in complex systems. GuestIQ's domain is well-understood from the research instrument design. |

# 10. FRAMEWORK INTERACTION RULES

Six active frameworks creates six potential sources of guidance on any given question. The following rules govern what happens when frameworks appear to give different guidance on the same issue. The rules are ordered by priority — earlier rules take precedence over later ones.

| **Conflict Type** | **Resolution Rule** |
| --- | --- |
| **Academic research integrity vs. anything** | Research integrity is unconditional. If a routing error, tense frame error, or data integrity issue is discovered that affects research data quality, the pilot pauses and the issue is fixed — regardless of schedule, delivery pressure, or any other framework guidance. |
| **Scrum Master (process) vs. Product Owner (delivery)** | The Scrum Master checklist runs first. If any item fails, delivery does not begin until it is resolved. Process always precedes delivery. The SM checklist is not negotiable under time pressure. |
| **TDD test specification vs. Scrum sprint velocity** | Test specification wins. The 84-path matrix must be approved before Sprint 2 routing code begins. Playwright baseline must be in place before any post-Sprint 4 deployment. Data integrity protocol must be run before Sprint 2 gate. Velocity estimates are recalibrated to accommodate this — the spec is not skipped. |
| **PRINCE2 governance artifact vs. Scrum backlog item** | Governance artifacts take precedence. If a governance artifact requires updating (Risk Register at sprint start, Use Case model currency), it is updated before new story work begins. |
| **PLG engagement design vs. Academic instrument validity** | Academic validity wins. If a PLG engagement mechanism (e.g. a curiosity hook framing) could introduce bias into a research question, it is redesigned. The instrument integrity is never compromised for engagement. |
| **Use Case 3.0 slice boundaries vs. Scrum sprint boundaries** | Sprint boundaries win for planning. If a Use Case slice cannot fit in one sprint, it is split into two slices (two Features across two sprints). UC3.0 Principle 8 — just enough, just in time — supports this explicitly. |
| **JTBD user goal vs. technical constraint** | JTBD defines what to build; constraints define how. If a constraint prevents fully implementing a user job, document the constraint and find a feasible alternative that still serves the job. The job is not dropped. |
| **PLG time-to-value vs. research instrument completeness** | Research completeness wins. The Amateur tier is 8 questions because that is the minimum viable instrument slice — not because 8 is the PLG optimum. The instrument design is the constraint; PLG works within it. |

# 11. ARTIFACT UPDATE SUMMARY

This document triggers targeted updates to all 8 previously approved Sprint 0 artifacts. All updates are additive — no approved content is removed or contradicted. The Scrum Master checklist in Section 6.3 is updated to 7 items from 5 (adding TDD spec check and PLG metric check). The framework register is updated from 19 to 21 entries.

| **Artifact** | **Version** | **What Is Added** |
| --- | --- | --- |
| **Project Charter** | **v2.1** | Section: Delivery Methodology — 6-framework hybrid stack, JTBD, NSM, Scrum Master, Epic→Feature→Story hierarchy. Risk count corrected to 12. |
| **Stakeholder Register** | **v1.1** | Scrum Master functional role entry (held by Claude). Epic Owner assignments for SH-02 and SH-04. |
| **RACI Matrix** | **v1.1** | Category: Scrum Master Function (7 activity rows). New rows for JTBD, NSM, and Methodology Document. TDD instrument review row added. |
| **Definition of Done + Ready** | **v1.1** | Epic-level DoR (3 criteria). Feature-level DoR (3 criteria + TDD test specification criterion). SM gate criterion. PLG funnel check for Sprint 5–6 gate. |
| **Risk Register** | **v1.1** | R-11: Single Human Covering All Roles (High/High). R-12: Mid-Project Methodology Adoption (Medium/Medium). Discrepancy resolved. |
| **SRS Functional Requirements** | **v1.1** | UC traceability column note in Section 13. No requirement content changes. |
| **SRS Non-Functional Requirements** | **v1.1** | Category: Research Data Integrity. NFR-043 (tense frame accuracy), NFR-044 (Module 5 routing fidelity), NFR-045 (research data integrity). Total: 45 NFRs. |
| **Product Backlog** | **v1.1** | Epic grouping above sprints. S0-11 (JTBD), S0-12 (NSM), S0-13 (Methodology Doc), PS-10 (SM checklist). Stories: 103. Points: 231. |

# 12. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. Four active frameworks (UC3.0, Scrum, PRINCE2-lite, Academic Research). Scrum Master. JTBD. NSM. 19-entry framework register. Framework interaction rules. |
| **v1.1** | [Sprint 0] | Claude / AI Developer | Added F-05 Behaviour-Driven TDD (Option A confirmed — 3 instruments: 84-path matrix, Playwright, data integrity protocol). Added F-06 Product-Led Growth Phase 1 Mechanics (engagement loop, aha moment, time-to-value, 7 PLG metrics, Phase 2 expansion). Scrum Master checklist extended from 5 to 7 items. Framework register updated from 19 to 21 entries. Interaction rules extended from 7 to 8. Sections 2–4 and 6 updated. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF GUESTIQ METHODOLOGY DOCUMENT —**

*GuestIQ · Methodology Document v1.1 · S0-0.1 · Sprint 0 Anchor Artifact · Six Active Frameworks · Confidential*