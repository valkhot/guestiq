**GUESTIQ METHODOLOGY DOCUMENT**

**Hybrid Delivery Framework · Six Active Frameworks · Foundational Reference**

|  |  |
| --- | --- |
| **Document ID** | S0-0.1 — Sprint 0 Artifact |
| **Document Version** | 1.2 — Reconciled to the projection/no-AI pivot (BDD instruments → v4.2 routing + report-engine integrity; PLG engagement loop → dignified value layer; aha moment → end-of-read; tiers → CORE/PRO/EXPERT depth; no gamification) |
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
| **What We Take**  Instrument validity and reliability. **Projection-instrument design** (agents answer as a persona they know). **Gold-map obviousness filter** + **convergence floor** + observation grading for finding integrity. **Simulation-only validation** for Phase 1 (no real guests), with the GM-reaction capture as the validation signal. Publishable findings as a parallel output alongside the application. | **Why It Matters for GuestIQ**  GuestIQ is simultaneously a software product and a research instrument. Software frameworks do not cover projection-instrument integrity, gold-tag/CF-sink correctness, distinct-respondent counting, or the findings-not-recommendations guardrails. These are formalised as report-engine requirements and Sprint gate conditions. Academic integrity is the unconditional priority — if a finding is wrong, non-compliant, or de-anonymizing, the pilot pauses. |

**F-05 Behaviour-Driven TDD**

*Test-Driven Development adapted for AI-accelerated delivery — Option A confirmed*

|  |  |
| --- | --- |
| **What We Take**  Expected behaviour defined BEFORE code using instruments: (1) **v4.2 routing test** produced in Sprint 1 before Sprint 2 coding; (2) **report-engine integrity protocol** (seeded data, all 5 gates + guardrails + determinism) before the engine is built; (3) Playwright visual regression baseline in Sprint 4; (4) data integrity verification protocol — reads traced UI→Supabase before Sprint 2 gate. Acceptance criteria in every story are the test specification. | **Why It Matters for GuestIQ**  GuestIQ's highest-risk logic — **the report engine** (a wrong/non-compliant finding is catastrophic), persona routing, offline queue, session resume, Supabase integrity — must be specified before implementation. The report-engine integrity protocol is the new crown jewel: it is a test suite before a test runner. Playwright catches visual regressions; the data integrity protocol is the research-data equivalent of an integration test. Together these cover the primary failure modes without Vitest micro-cycles that would slow AI-accelerated delivery. |

**F-06 Product-Led Growth — Phase 1 Mechanics**

*PLG — adapted for internal B2B research tool at single-property pilot scale*

|  |  |
| --- | --- |
| **What We Take**  Engagement loop designed into the product (**Badge → Read → End-of-read → Coverage**). North Star Metric = read completion rate. PLG funnel measured by PostHog: badge_claimed → read_started → read_completed → end_of_read_viewed. Input metrics: depth opt-in rate, re-entry rate, coverage growth. Aha moment: the **end-of-read** reflection. | **Why It Matters for GuestIQ**  GuestIQ's adoption is entirely driven by the product experience — not by management mandate, training, or sales. If the product is not engaging, the pilot fails. The engagement design is a **dignified value layer** (badge identity, the five-beat end-of-read, the coverage wall) — **not gamification**, which would patronise a professional audience. Naming PLG makes the engagement design explicit, measurable, and improvable in Phase 2. |

# 3. BEHAVIOUR-DRIVEN TDD — FULL SPECIFICATION

## 3.1 What It Is and What It Is Not

Behaviour-Driven TDD for GuestIQ is Option A — expected behaviour is defined before code is written, using three formal instruments. It is not the pure red-green-refactor micro-cycle that requires a live test runner between code changes. That approach is not feasible in an AI-accelerated single-session delivery model where Claude cannot execute code between writes.

What makes this TDD rather than post-hoc testing is the sequence: the test specification (the v4.2 routing test, the report-engine integrity protocol, the Playwright baseline, the data integrity protocol) is produced and approved BEFORE the implementation sprint begins. The developer (Claude) implements against the specification. The human (Lead Researcher) verifies against it. This is the test-first principle applied at the behaviour level rather than the function level.

## 3.2 The TDD Instruments

| **Instrument** | **Sprint** | **How It Implements Test-First** |
| --- | --- | --- |
| **v4.2 Routing Test** | **Sprint 1** | Produced before any Sprint 2 routing code. Defines the expected outcome for every L1 persona route (9) and L2 party route into the correct battery, with gold-tagged options. AI implements routing strictly against it; Lead Researcher records Pass/Fail in Sprint 3. Test first, implement second. |
| **Report-Engine Integrity Protocol** | **Sprint 1 / 3** | The new crown jewel. Seeded datasets with known expected output verify all 5 gates (distinct-respondent aggregation → convergence floor → observation grade → tag-driven Gate 4 with CF-sink suppression → guardrails) plus **determinism** (identical input → identical report). A wrong/non-compliant/de-anonymizing finding is a critical defect. |
| **Playwright Visual Regression** | **Sprint 4** | Baseline screenshots captured in Sprint 4 after QA passes. Every subsequent deployment runs Playwright against the baseline before going live; any deviation blocks the deployment. Test-first at the integration level. |
| **Data Integrity Verification Protocol** | **Sprint 2** | Specified before data is collected. Complete **reads** traced from UI selection → Supabase record. Expected outcomes: every selected option in the responses table matches the UI; the persona (L1) matches the routing; none-flags match UI none-selections exactly; distinct-respondent counts are honest. These expectations are the test specification. |

## 3.3 Acceptance Criteria as Test Specifications

Every user story in the Product Backlog has specific, testable acceptance criteria. These criteria are written in the Definition of Ready phase — before the story enters a sprint. They function as the test specification: the AI Developer implements code that satisfies them; the Lead Researcher verifies the criteria are met before marking the story done. This is Behaviour-Driven Development (BDD) at the story level — behaviour specified before implementation.

## 3.4 What Behaviour-Driven TDD Does NOT Cover

Vitest unit tests for individual functions are not written in Phase 1. The trade-off is explicit: pure TDD micro-cycles would add overhead and require Claude to produce test files before component files in every session — slowing AI-accelerated delivery without proportional quality benefit at this scale. The instruments above cover the highest-risk behaviour: **the report engine**, persona routing, visual integrity, and research data accuracy. Phase 2, with a larger codebase and more developers, should evaluate adding Vitest.

# 4. PRODUCT-LED GROWTH — PHASE 1 MECHANICS

## 4.1 The Engagement Loop

GuestIQ's adoption depends entirely on the product experience — there is no sales process, no mandatory training, and no management mandate to complete the questionnaire. The product must earn its own adoption through the quality of the respondent experience. The engagement loop is the mechanism by which this happens.

|  |  |  |  |
| --- | --- | --- | --- |
| **TRIGGER**  The agent claims a **badge** (a dignified identity, not a score) and chooses a guest persona they know — activating professional self-concept. | **READ**  The agent answers as that guest. The flow is calm and respectful — no progress-gaming, no curiosity-bait — earning attention through relevance. | **END-OF-READ**  The **five-beat end-of-read** reflects the agent's own expertise back as a short, dignified story. Contribution becomes tangible — the aha moment. | **COVERAGE**  The **coverage wall** shows the desk filling in collectively. The agent sees their reads matter; recognition is collective, never a leaderboard. |

## 4.2 Time-to-Value — The PLG Onboarding Funnel

In PLG, time-to-value is the most important metric during the first session. An agent who reaches the **end-of-read** has experienced value and is far more likely to contribute again and recommend it to colleagues than one who abandons mid-read. The **depth structure** (one read, deepened by an optional fork) is GuestIQ's onboarding design:

| **Depth** | **Scope** | **Time to Value** | **Role** |
| --- | --- | --- | --- |
| **CORE** | One complete read | ~4–5 minutes | The complete contribution. Every agent reaches the **end-of-read** and sees value quickly. CORE is whole on its own — never framed as "not enough". |
| **PRO** | + a few deeper items | ~7–8 minutes | Offered **once**, mid-read, after CORE, as a compliment to expertise — never a nag. |
| **EXPERT** | + the full deep battery | ~12–16 minutes | High-commitment. The richest expert detail for the personas the agent knows best. |

## 4.3 The Aha Moment

In PLG, the 'aha moment' is the specific moment when a user first experiences the core value of the product. For GuestIQ, the aha moment is the **end-of-read** — the five-beat sequence that reflects the agent's own answers back as a short, dignified story generated locally (RosaeNLG). This is the moment an agent feels: 'My professional expertise about this guest has been seen, valued, and made tangible.' Everything in the product design — badge identity, the calm read, the coverage wall — exists to get the agent to this moment.

The aha moment is positioned at the end of each read, not partway through. The full reflection is the reward for completing a CORE read — which maximises the North Star (read completion) and gives every contributor a dignified close. **There is no leaderboard, no score, no aggregate-comparison-as-competition** — the value is the agent's own expertise reflected back, not a ranking against colleagues.

## 4.4 PLG Metrics — Phase 1

| **Metric Type** | **Metric** | **Source** | **What It Tells Us** |
| --- | --- | --- | --- |
| **North Star** | Read completion rate | Supabase: completed reads / started reads, per property\_id | The single number that captures whether the product is working. Target: ≥60% minimum, ≥80% stretch. |
| **Activation** | End-of-read view rate | PostHog: end_of_read_viewed / read_started | What percentage of starters reach the end-of-read. Below 60% = the read or onboarding is failing. |
| **Engagement depth** | Depth opt-in rate | PostHog: depth_fork_accepted / depth_fork_offered | How many agents take the optional PRO/EXPERT depth — measures the dignity of the compliment-not-nag design. |
| **Coverage signal** | Coverage growth | Supabase: distinct personas × agents covered | How the collective desk picture fills in over the pilot. |
| **Retention signal** | Re-entry / replay rate | PostHog: badge re-tap / within-window replay | Agents who return within the window to contribute another read. |
| **Engagement quality** | Time per read | PostHog: time_on_read | Too little may indicate rushing; too much, confusion. |
| **Research quality** | None / not-this-guest rate | Supabase: none_flags per item | Items with high none-flag rates may need refinement. Target: <15% per item average. |

## 4.5 PLG — Phase 2 Expansion

The Phase 1 PLG mechanics are bounded by the single-property, staff-facing pilot. Phase 2 unlocks the full model: multi-property benchmark comparison (the most powerful value proposition for hotel management), guest-facing deployment, A/B testing on the **end-of-read copy and coverage-wall design** using PostHog, and product-qualified lead identification (properties that complete the pilot become Phase 2 expansion targets). These are Phase 2 backlog items — not Phase 1 scope.

# 5. WORK HIERARCHY — EPIC → FEATURE → STORY → TASK

The four-level work hierarchy connects Use Case 3.0 requirements structure to Scrum sprint execution. The hierarchy also integrates with Behaviour-Driven TDD: the test specification for each level is defined at the level above it (the v4.2 routing test / report-engine integrity protocol at the Feature level; acceptance criteria at the Story level).

**EPIC = Use Case**

|  |  |
| --- | --- |
| **Definition:** Complete user journey from trigger to value. Contains all scenarios and extensions. Spans multiple sprints.  **Timeframe:** Multiple sprints  **Owner:** SH-02 Researcher (research Epics) / SH-04 AI Dev (technical Epics) | **GuestIQ Example**  UC-01 'A front-desk agent completes a read' — full story from badge claim to the end-of-read and coverage wall, covering all 9 personas, CORE/PRO/EXPERT depth, and all routing paths. |

**FEATURE = Use Case Slice**

|  |  |
| --- | --- |
| **Definition:** Staged, implementable path through a Use Case. Bounded to one sprint. Includes requirements + design + code + tests (TDD Principle 10).  **Timeframe:** 1–2 sprints  **Owner:** Same as parent Epic Owner | **GuestIQ Example**  'CORE read — the answering flow' — a Sprint 2/3 slice of UC-01. Test specification: the CORE items render with correct persona routing and gold-tagged options. Data integrity verified for a sample of reads. |

**USER STORY = Work Item from slice**

|  |  |
| --- | --- |
| **Definition:** Sprint-sized deliverable. User story format. Acceptance criteria = the test specification (BDD). Satisfies DoR before entering sprint. Satisfies DoD before marking complete.  **Timeframe:** One sprint  **Owner:** Story Owner: AI Developer (code) or Lead Researcher (artifact) | **GuestIQ Example**  'Build the badge claim screen' — specific ACs: claimable badges render; claiming locks the badge server-side and removes it from the pool; re-entry re-taps a claimed badge. PostHog badge_claimed fires. |

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
| **4** | **TDD Test Specifications**  For any story involving the v4.2 routing test (Sprint 1), the report-engine integrity protocol (Sprint 1/3), Playwright (Sprint 4), or the data integrity protocol (Sprint 2): is the test specification approved and available before coding begins? Code does not precede the test spec. |
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
| **Functional Job** | Surface non-obvious, actionable findings about guest expectations using a **dignified projection instrument** that front desk staff will actually complete — at zero IT cost, zero monetary cost, and **with no third-party AI** — within a 14-week window. | *What they accomplish* |
| **Social Job** | To produce a research instrument and dataset that earns academic credibility: citable, methodologically rigorous, grounded in push-pull theory, ECT, and SERVQUAL. | *How they want to be seen* |
| **Emotional Job** | Confident that the research methodology is sound, the data is clean, and the findings are defensible to academic reviewers and hotel management alike. | *How they want to feel* |

**Actor 3 — Front Desk Team**

|  |  |  |
| --- | --- | --- |
| **Functional Job** | Contribute professional expertise to research that matters without it feeling like a survey, so that their knowledge of guest behaviour is made visible and valued beyond the front desk. | *What they accomplish* |
| **Social Job** | To be recognised as hospitality professionals whose expertise is worth studying — not just service delivery agents completing a form. | *How they want to be seen* |
| **Emotional Job** | That their 8–16 minutes of engagement produced something real: data they can see, insights they contributed to, and a sense that their professional knowledge has weight. | *How they want to feel* |

## 7.2 North Star Metric

**GuestIQ's North Star Metric is the percentage of agents who complete a read, measured as (completed reads ÷ started reads) for the same property\_id at the close of the pilot window.** *(The deeper validation North Star — whether findings land as non-obvious and actionable — is captured via the GM-reaction capture; see the Product Value & North Star doc.)*

This metric captures engagement quality (the instrument works), experience quality (the dignified value layer works), and research quality (data is sufficient) in a single number. It is measurable directly from Supabase: completed reads ÷ started reads WHERE property\_id = 'PROP001'. The pilot minimum threshold is 60%. The stretch target is 80%. The OKRs (success criteria in the Project Charter) are the time-bound key results that operationalise this persistent goal.

# 8. STORY MAPPING — DEFERRED TO PHASE 2

Story mapping (Jeff Patton, 2005) is not used in Phase 1 for three precise reasons. First: the discovery phase it enables already happened through the Sprint 0 planning conversation — the shared understanding story mapping creates was built here. Second: story mapping requires a visual workshop format (Miro, whiteboard) that is incompatible with text-based AI collaboration. Third: the Product Backlog v1.0 already contains the structural output that a story map would have produced — the Epic/Feature/Story hierarchy, Use Case traceability, and sprint slice boundaries are all present.

Story mapping is explicitly recommended for the opening of Phase 2 planning. A two-hour session on a Miro board — starting with the guest's complete journey from pre-booking intent through post-stay advocacy (the **personas and their reads** laid out horizontally) — would be the highest-leverage Phase 2 scoping activity. The PLG expansion decisions (multi-property benchmark, guest-facing deployment, A/B testing) are all story mapping inputs.

# 9. COMPLETE FRAMEWORK DECISION REGISTER

Every framework evaluated during Sprint 0 planning is recorded with its decision and rationale. This register is the permanent reference for why the methodology looks the way it does. 21 entries: 8 USE, 5 DEFER, 8 DROP.

| **Framework / Technique** | **Decision** | **Rationale** |
| --- | --- | --- |
| **Use Case 3.0 (Jacobson / Cockburn 2024)** | **USE** | Requirements and traceability layer. Storytelling practice. Use Cases = Epics. Slices = Features. Work Items = Stories. 100% compatible with existing backlog. |
| **Scrum** | **USE** | Sprint delivery. 2-week cadence, backlog, velocity, DoD/DoR, retrospectives. Adapted for one-person team. |
| **PRINCE2-lite Governance** | **USE** | All Sprint 0 governance artifacts. Already in operation — formalised by this document. |
| **Academic Research Methodology** | **USE** | Instrument integrity, projection design, gold-map obviousness filter, convergence floor, simulation-only validation. Formalised as report-engine requirements + guardrails. |
| **Behaviour-Driven TDD — Option A** | **USE** | Instruments: v4.2 routing test (Sprint 1), report-engine integrity protocol (Sprint 1/3), Playwright visual regression (Sprint 4), data integrity protocol (Sprint 2). Test specification before code, always. |
| **Product-Led Growth — Phase 1 Mechanics** | **USE** | Engagement loop, time-to-value, aha moment, PLG funnel, 7 input metrics. All mechanics embedded in product design. Named and measured from Sprint 5. |
| **Jobs-to-be-Done (JTBD)** | **USE** | 3 actor statements. Grounds all product decisions in user goals. Produced as S0-0.3. |
| **North Star Metric** | **USE** | Read completion rate. Single persistent measure. Stated explicitly in S0-0.5. Operationalised by Project Charter success criteria (OKRs). |
| **OKRs (Objectives and Key Results)** | **USE** | Already exist as success criteria in Project Charter. Not renamed — identified as the operational implementation of the North Star. |
| **Scrum Master Function** | **USE** | Held by Claude at sprint start. 7-item checklist (updated from 5 to include TDD spec check and PLG metric check). Resolves single-human structural tension. |
| **Story Mapping (Jeff Patton)** | **DEFER** | Phase 2 planning only. Discovery phase already occurred. Visual workshop format incompatible with AI text collaboration. Backlog already has story map's structural output. |
| **Value Proposition Canvas** | **DEFER** | Phase 2 only. Useful for new stakeholder types — property groups, academic partners, guests. |
| **Blue Ocean Strategy** | **DEFER** | Phase 2 only. GuestIQ as 'Guest Expectation Intelligence' positioning requires market data not yet available. |
| **Lean Analytics / OMTM** | **DEFER** | Phase 2 growth optimisation when multi-property data enables comparison. Not useful at single-property pilot scale. |
| **A/B Testing / Experimentation** | **DEFER** | Phase 2 only. PostHog supports it. No statistical basis at single-property, single-pilot scale. End-of-read copy and coverage-wall variants are Phase 2 PLG experiments. |
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
| **Academic research integrity vs. anything** | Research integrity is unconditional. If a routing error, a gold-tag/CF-sink error, or a wrong/non-compliant/de-anonymizing **finding** is discovered that affects research data quality, the pilot pauses and the issue is fixed — regardless of schedule, delivery pressure, or any other framework guidance. |
| **Scrum Master (process) vs. Product Owner (delivery)** | The Scrum Master checklist runs first. If any item fails, delivery does not begin until it is resolved. Process always precedes delivery. The SM checklist is not negotiable under time pressure. |
| **TDD test specification vs. Scrum sprint velocity** | Test specification wins. The v4.2 routing test and report-engine integrity protocol must be approved before the code they verify begins. Playwright baseline must be in place before any post-Sprint 4 deployment. Data integrity protocol must be run before Sprint 2 gate. Velocity estimates are recalibrated to accommodate this — the spec is not skipped. |
| **PRINCE2 governance artifact vs. Scrum backlog item** | Governance artifacts take precedence. If a governance artifact requires updating (Risk Register at sprint start, Use Case model currency), it is updated before new story work begins. |
| **PLG engagement design vs. Academic instrument validity** | Academic validity wins. If an engagement mechanism (e.g. an end-of-read framing) could introduce bias into a research question, it is redesigned. The instrument integrity is never compromised for engagement. |
| **Use Case 3.0 slice boundaries vs. Scrum sprint boundaries** | Sprint boundaries win for planning. If a Use Case slice cannot fit in one sprint, it is split into two slices (two Features across two sprints). UC3.0 Principle 8 — just enough, just in time — supports this explicitly. |
| **JTBD user goal vs. technical constraint** | JTBD defines what to build; constraints define how. If a constraint prevents fully implementing a user job, document the constraint and find a feasible alternative that still serves the job. The job is not dropped. |
| **PLG time-to-value vs. research instrument completeness** | Research completeness wins. **CORE** is the minimum viable, complete contribution — its scope is set by what makes a whole read, not by a PLG time optimum. The instrument design is the constraint; PLG works within it. |

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
| **SRS Non-Functional Requirements** | **v3.1** | Category: Research Data Integrity → reframed for the projection model (report-engine guardrails, gold-tag/CF-sink correctness, distinct-respondent counting, anonymity). NFR set per SRS v3.1 (NFR-PRIV / PERF / REL / A11Y / OBS / SEC / TONE). |
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