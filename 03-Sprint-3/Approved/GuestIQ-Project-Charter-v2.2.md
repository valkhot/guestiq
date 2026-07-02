**PROJECT CHARTER**

**GuestIQ — Hotel Guest Expectations Research Application**

**VERSION 2.1 — POST-METHODOLOGY UPDATE**

|  |  |
| --- | --- |
| **Document Version** | 2.2 — Reconciliation scope-change (projection model + no-AI pivot). **First non-additive revision.** |
| **Previous Version** | 1.0 — Initial Release (approved by Lead Researcher) |
| **Document Status** | APPROVED v1.0 and v2.0 — v2.1 PENDING RE-APPROVAL |
| **Application Name** | GuestIQ |
| **Project Name** | GuestIQ — Hotel Guest Expectations Research Application — Internal Pilot |
| **Project Sponsor** | [Hotel Management — To Be Completed] |
| **Lead Researcher** | [Name — To Be Completed] |
| **Developer** | Claude (Anthropic AI) — AI Development Partner |
| **v1.0 Approval Date** | [Date of v1.0 Approval] |
| **v2.0 Date Prepared** | [Insert Date] |
| **v2.0 Approval Date** | [Insert Date Upon Re-Approval] |
| **Document Location** | 00-Sprint-0 / Approved / Project-Charter-v2.0.docx |

**★ VERSION 2.0 CHANGE SUMMARY — 6 sections updated following post-approval planning decisions**

| **Ver.** | **Section** | **Change Made** |
| --- | --- | --- |
| **v2.0** | Cover & Metadata | Application name confirmed as GuestIQ. Version updated to 2.0. |
| **v2.0** | Section 1 — Purpose | Added GuestIQ name. Added production-readiness as founding design principle. Added content management strategy (Strangler Fig Pattern). Added observability strategy (Sentry + PostHog). |
| **v2.0** | Section 2 — Objectives | Added production-readiness objective. Added content management objective. Added observability objective. Added questionnaire editability objective. |
| **v2.0** | Section 3 — Scope In | Added 14 new in-scope items covering full confirmed technology stack, observability tools, content management phases, and production-readiness architecture. |
| **v2.0** | Section 3 — Scope Out | Added 4 new out-of-scope items. Clarified Phase 2 items that were previously undefined. Added visual admin CMS as explicit Phase 2 item. |
| **v2.0** | Section 7 — Budget | Added PostHog and Sentry to confirmed $0 budget. Added Node.js as free tool. Added Radix UI, ESLint, Prettier, Playwright as free tools. Total remains $0. |
| **v2.0** | Section 8 — Risks | Added 2 new risks: content configuration file corruption and Supabase project accidental deletion. Updated mitigation strategies for both. |
| **v2.0** | Section 11 — Success | Added content management and observability to success criteria. Added production-readiness validation criterion. |
| **v2.0** | Section 12 — Approval | Re-approval required for all signatories following material scope additions. |
| **v2.1** | Cover & Metadata | Version updated to 2.1. Document status updated. |
| **v2.1** | Section 13 — NEW | Delivery Methodology section added: six-framework hybrid stack, JTBD statements (3 actors), North Star Metric, Scrum Master function, Epic hierarchy, BDD-TDD Option A, PLG Phase 1 mechanics. |
| **v2.1** | Section 8 — Risks | Risk count corrected from 10 to 12 — reflecting R-11 and R-12 added in Risk Register v1.1. |
| **v2.1** | Section 12 — Approval | Re-approval required for v2.1. All changes are additive. |

**★ VERSION 2.2 CHANGE SUMMARY — MATERIAL, NON-ADDITIVE SCOPE CHANGE (reconciliation)**

> Unlike v2.0/v2.1, **v2.2 is NOT additive.** The project pivoted to a **projection-instrument model** and then to a **no-third-party-AI** architecture. Previously approved scope is **removed or replaced** below. Where this Charter's body (written for the old model) conflicts with the reconciled canon, **the canon governs**; a full Charter body rewrite is **owed** (Stage 2 / dedicated pass).

| **Ver.** | **Area** | **Change** |
| --- | --- | --- |
| **v2.2** | Instrument model | **Replaced.** The three-tier (Amateur/Professional/Expert) **79-question, 7-episode, Module-5, dual-tense** instrument → a **projection instrument**: agents answer **as a guest persona they know**; **9 personas** (incl. airline crew, executive/VIP); **CORE/PRO/EXPERT depth**; **gold-tagged structured** capture (Questionnaire **v4.2** + GoldMap **v0.4**). |
| **v2.2** | Gamification | **Removed.** The progress/episode-map/9-badge/streak **gamification layer** → a dignified **value layer** (badge identity, five-beat end-of-read, coverage wall) that **wraps** the instrument (never inside it). |
| **v2.2** | Output | **Replaced.** Results screen + **management dashboard** → an automatic, self-served **GM Findings Report** (findings, **not** recommendations; raw counts; in-house-only) + an in-app **Researcher Console**. The **dashboard / `/admin`** is removed. |
| **v2.2** | AI / processing | **Scope-out hardened.** **No third-party AI and no external processor.** Agent story = **RosaeNLG** (local); free-text = **count-or-quote** (no coding); report engine = **deterministic, compute-on-open**; **no Supabase Edge Functions**. *(Strengthens the IRB exemption — IRB-Path-Decision v1.1.)* |
| **v2.2** | Stakeholders | **Added** the **Lead Researcher** as a first-class stakeholder/JTBD actor (Researcher Value Model v0.2; RACI amend pending). |
| **v2.2** | Content mgmt | Strangler-Fig **ceremony retired**; content is **config from the start**; visual CMS remains Phase-2 (ContentMgmt Retire Decision v1.0). |
| **v2.2** | Authoritative canon | Where the body conflicts: **Questionnaire v4.2 · GoldMap v0.4 · Output-Spec v0.2 · Architecture v1.1 · SRS v3.1 · Data Model v1.2** govern. Full Charter body rewrite **owed**. |

ℹ NOTE: Versions 2.0 and 2.1 were additive — no previously approved content was removed. **Version 2.2 is different: it is a material, non-additive scope change** (the projection-model + no-AI pivot) that **removes and replaces** previously approved scope (see the v2.2 summary above). The reconciled canon doc set governs where this body still describes the old model; a full body rewrite is owed. Re-approval by all signatories is required.

# 1. PROJECT PURPOSE

★ RECONCILED v2.2: Purpose rewritten for the **projection-instrument + no-third-party-AI** model.

The hotel industry operates with a persistent and commercially consequential blind spot: systematic, reliable data on why guests choose a hotel for a specific stay purpose and what they genuinely expect from that experience. Most guest satisfaction tools measure how a stay felt after the fact — but without capturing what the guest needed, expected, and used as their evaluative reference point, that satisfaction data cannot be translated into operational decisions with confidence.

This project develops, deploys, and validates GuestIQ — a Progressive Web Application (PWA) that captures hotel guest-expectation expertise from **front-desk professionals**, who answer a **projection instrument** *as a guest persona they know well* (business, early-flight, holiday, cruise, event, medical, airline crew, executive/VIP). A dignified **value layer** (badge identity, a five-beat "end-of-read," a coverage wall) wraps the instrument to earn genuine engagement from a professional audience — without gamification gimmicks.

GuestIQ is designed from its first line of code as an evolutionary prototype — production-grade standards that grow into the production system without a rebuild: authentication built in bypass mode and activated in Phase 2; the database schema versioned and migration-managed from Sprint 1; **questionnaire content separated from code as data-driven config**; observability (Sentry, PostHog) instrumented from day one.

A defining principle: **no third-party AI and no external processor.** The end-of-read story is generated **locally in the browser** (RosaeNLG, rule-based); free-text is captured as **structured counts or verbatim quotes (never coded)**; the **GM Findings Report** is produced by a **deterministic engine, computed on-open**. Nothing about a respondent's answers leaves the property's own infrastructure.

The immediate output is a validated, dignified, zero-IT-investment research tool on the front desk team's existing Windows PCs, accessible via a single URL (guestiq.github.io), requiring no login, producing an automatic **GM Findings Report** (findings, not recommendations) and an in-app **Researcher Console**. The strategic output is a methodology and platform extensible to guest-facing deployment, multi-property benchmarking, and ongoing operational intelligence at scale.

# 2. PROJECT OBJECTIVES

★ RECONCILED v2.2: Objectives updated for the projection/no-AI model.

## 2.1 Primary Objectives

* Build and deploy GuestIQ — a fully functional PWA delivering the **projection instrument (Questionnaire v4.2, 9 personas, CORE/PRO/EXPERT depth)** — to front desk team members at a single property within 14 weeks.
* Achieve a pilot participation rate of at least 70% of the target front desk team (7 of 10) **contributing at least one read** within the pilot window.
* Achieve a completion rate of at least 60% of participating members **completing a CORE read** within the pilot window.
* Demonstrate that the **dignified value layer** (badge, end-of-read, coverage wall) generates higher engagement than a standard survey for a hospitality-professional audience — **without gamification**.
* Produce a **GM Findings Report** with at least **3 actionable findings** (findings, not recommendations) judged non-obvious by the GM.
* Build GuestIQ as an evolutionary prototype to production-grade standards. The production-readiness gaps (authentication, environment config, feature flags, error logging, database migrations, API versioning) are addressed in the prototype architecture. *(Dashboard caching is removed — no dashboard.)*
* Deliver the **no-third-party-AI architecture**: RosaeNLG (local) for the story; **count-or-quote** structured capture (no free-text coding); a **deterministic report engine computed on-open**; **pure client + Supabase, no Edge Functions**.
* Implement **content-as-config** so questions, options, gold tags, and routing are editable without modifying application code (config from the start; visual admin editor is Phase 2).
* Instrument GuestIQ with Sentry and PostHog from Sprint 2 day one.
* Validate the technical architecture — GitHub Pages, Supabase, local-storage session resume with disambiguation, GM/Console PIN access — as stable, zero-IT, and production-ready for Phase 2.

## 2.2 Secondary Objectives

* Assess the front desk team's perception of the experience as engaging, relevant, and professionally appropriate through UAT feedback (does the end-of-read land?).
* Capture the **GM's reaction** to each finding (non-obvious? / would-act?) via the Researcher Console — the explicit validation signal for a simulation-only pilot.
* Establish baseline velocity data (story points per sprint) to inform Phase 2 planning.
* Verify the **gold-map obviousness filter** works — that findings skew non-obvious (blind-spots/contradictions) and table-stakes are suppressed.
* Generate a complete PostHog funnel (badge → read → end-of-read → coverage wall) — the primary instrument for optimizing the experience in Phase 2.
* Document lessons learned across the 6 sprints for Phase 2 Sprint 0 planning.
* Produce a Phase 2 recommendations document (multi-property, authentication, language support, the visual admin editor, real-guest validation, instrument refinements).

## 2.3 What This Project Is NOT Attempting

* Psychometric validation of the guest intent taxonomy — this requires a larger guest-facing sample and is a Phase 2 academic objective.
* Deployment to actual hotel guests — this project is staff-facing only in Phase 1.
* Building the visual admin CMS — the content editing interface is a Phase 2 sprint, not a Phase 1 deliverable.
* Integration with the property management system (PMS) or any existing hotel technology infrastructure.
* Multi-language translation — architecture is i18n-ready but translation is Phase 2.
* Revenue management optimization — the instrument generates data that informs revenue strategy but does not directly interface with revenue management systems.

# 3. PROJECT SCOPE

★ UPDATED v2.0: Section updated in v2.0: 14 new in-scope items added. 4 new out-of-scope items added. Content management phases clarified.

## 3.1 In Scope — Phase 1 Prototype

**Application Experience**

✓ IN SCOPE: GuestIQ Progressive Web App — complete agent experience from badge claim to the end-of-read and coverage wall

✓ IN SCOPE: **Projection instrument (Questionnaire v4.2)** — agents answer **as a guest persona they know**; **9 personas** (business, early-flight, holiday, cruise, event, medical, airline crew, executive/VIP, other); **CORE/PRO/EXPERT depth** via a mid-read depth fork

✓ IN SCOPE: **Gold-tagged structured capture** — every reportable option carries a hidden gold tag (blind-spot / contradiction / mis-weight); table-stakes routed to a suppressed **CF-sink**; insight items kept **verbatim**; "None / not this guest" + "Other" escapes

✓ IN SCOPE: **Count-or-quote** free-text handling — structured options count; verbatim items/examples are quotes; **no coding, no AI**

✓ IN SCOPE: First-run onboarding; badge identity (claim-and-lock + within-window re-entry); guest select + grounding; the read; the **five-beat end-of-read**; the **coverage wall** (incl. completed-range); within-window replay

✓ IN SCOPE: **End-of-read story generated locally by RosaeNLG** (rule-based, in-browser) — bounded strictly to the agent's answers; nothing transmitted

✓ IN SCOPE: Session resume via browser local storage with disambiguation screen for shared PC handoffs

✓ IN SCOPE: Supabase downtime contingency — static 'temporarily unavailable' screen

**Output — GM Report & Researcher Console**

✓ IN SCOPE: **GM Findings Report** — automatic, **computed on-open** by a **deterministic 5-gate engine** (findings not recommendations; raw counts never %; counts never names; in-house-only); GM self-serves via **Ctrl+Alt+A + PIN + auto-lock**

✓ IN SCOPE: **Researcher Console** — behind a researcher PIN; six lenses (app health · agent activity per-badge · GM activity · integrity · validation · iteration)

**Content as Config**

✓ IN SCOPE: **Content-as-config** — questions, options, gold tags, and routing as data-driven config from the start; components accept content as properties and never contain it

✓ IN SCOPE: **Configuration validator** — verifies config integrity on load (incl. a missing gold_tag or duplicate CF-sink), fails loudly before any respondent-facing content renders

✓ IN SCOPE: **Pure client + Supabase DB — no Edge Functions, no third-party AI, no external processor**

**Management and Analytics**

✓ IN SCOPE: Sentry — JavaScript error tracking, performance monitoring, Core Web Vitals from real user devices

✓ IN SCOPE: PostHog — product analytics with the **new event taxonomy** (badge / read / depth / end-of-read / report-opens), funnel analysis, session replay, IP anonymization enabled

**Infrastructure and Architecture**

✓ IN SCOPE: GitHub Pages hosting — free, zero-maintenance, URL: guestiq.github.io?property=PROP001

✓ IN SCOPE: GitHub Actions CI/CD — automatic deployment on every code push

✓ IN SCOPE: Supabase data storage — 4-table schema implemented via Supabase Migrations for version control

✓ IN SCOPE: Supabase Auth — configured in bypass mode in prototype, switches to active authentication via feature flag in Phase 2

✓ IN SCOPE: Feature flag system — environment configuration file controls prototype/production feature switching

✓ IN SCOPE: Service layer architecture — all Supabase calls through dedicated service functions, never directly from components

✓ IN SCOPE: ESLint + Prettier — code quality and formatting configured in Sprint 1 before any code is written

✓ IN SCOPE: Radix UI — headless accessible component library as interactive component foundation

✓ IN SCOPE: Playwright — visual regression testing configured in Sprint 4

✓ IN SCOPE: Offline response queue — Supabase unreachability detection, local queue, automatic retry

✓ IN SCOPE: Single property pilot — up to 10 front desk team members

✓ IN SCOPE: Multi-property architecture foundations — property\_id field in all database records and PostHog events, unused in prototype

✓ IN SCOPE: i18n-ready architecture — all text in external files via i18next, English only implemented

✓ IN SCOPE: WCAG 2.1 AA accessibility compliance

✓ IN SCOPE: Cross-browser compatibility — Microsoft Edge and Google Chrome on Windows

✓ IN SCOPE: Mobile browser functionality as secondary priority

✓ IN SCOPE: 34 project artifacts across all 6 sprints

## 3.2 Out of Scope — Phase 1 Prototype

✗ OUT OF SCOPE: Individual login credentials or account management — prototype is open access, authentication in bypass mode only

✗ OUT OF SCOPE: Single Sign-On (SSO) or Windows Active Directory integration

✗ OUT OF SCOPE: Visual admin CMS — the Phase 2 content editing interface at /admin route with form-based question editing, drag-and-drop reordering, draft/publish workflow

✗ OUT OF SCOPE: Multi-property features — cross-property comparison, central management console, property-specific branding (property\_id field exists in all records but is unused)

✗ OUT OF SCOPE: Any language other than English — i18n architecture ready, translation deferred to Phase 2

✗ OUT OF SCOPE: Guest-facing deployment — staff only in Phase 1

✗ OUT OF SCOPE: Native iOS or Android app — PWA only

✗ OUT OF SCOPE: Push notifications or offline mode (offline response queue is included — full offline mode is not)

✗ OUT OF SCOPE: PMS integration or any existing hotel system integration

✗ OUT OF SCOPE: Statistical significance testing, regression analysis, or psychometric validation

✗ OUT OF SCOPE: Longitudinal respondent tracking across multiple sessions

✗ OUT OF SCOPE: Kiosk mode, QR code generation, or lobby deployment

✗ OUT OF SCOPE: Post-stay email automation integration

✗ OUT OF SCOPE: Dashboard materialized views and caching — **the management dashboard itself is removed** (superseded by the GM Findings Report + Researcher Console)

✗ OUT OF SCOPE: **Any third-party AI service or external data processor** — the story is local (RosaeNLG) and the report engine is deterministic; **no answer content leaves the property's infrastructure**

✗ OUT OF SCOPE: Supabase Edge Functions / any server-side compute — pure client + Supabase DB only

## 3.3 Scope Change Process

Any request to add items currently listed as Out of Scope requires a formal Scope Change Request submitted in writing, reviewed by the Project Sponsor and Lead Researcher, assessed for timeline and cost impact by the Developer, and approved by all three parties before any work begins. Scope changes after Sprint 2 has begun carry a high risk of timeline extension and must be carefully evaluated against the 14-week completion commitment.

# 4. SUCCESS CRITERIA

The project is considered a success when it meets all Minimum Threshold criteria below. Stretch Targets represent outstanding outcomes. All criteria are assessed at the Sprint 6 debrief meeting.

| **Success Criterion** | **Minimum Threshold** | **Stretch Target** | **Measurement Method** |
| --- | --- | --- | --- |
| Prototype delivered within 14-week timeline | Yes — live by Week 12 | Live by Week 10 | Master Development Timeline completion date |
| All 34 artifacts produced and approved | 34 of 34 complete | 34 of 34 with zero rework | Artifact registry Sprint 6 |
| Pilot participation rate | 70% contribute a read (7/10) | 90% (9/10) | Distinct badges with ≥1 read |
| Pilot completion rate | 60% complete a CORE read | 80% | Completed-read flag |
| Depth opt-in | 30% take the depth fork (PRO/EXPERT) | 50% | Depth opt-in events |
| Coverage | Each active persona covered by ≥3 distinct agents | Convergence floor cleared on ≥5 findings | Distinct-respondent counts |
| None / not-this-guest rate | Under 15% per item avg | Under 8% | none_flags |
| Technical stability | Zero critical bugs in pilot | Zero medium bugs | Bug log Sprints 5–6 |
| Report findings | 3 actionable findings, GM-judged non-obvious | 5+ | GM-reaction capture (Console) |
| GM report access | GM self-serves the report ≥1× | ≥3× with dwell | Report-open events |
| **Report-engine integrity** | Integrity protocol passes; zero guardrail breaches | — | Test Plan v2.0 §2.1 (seeded) |
| UAT satisfaction | All UAT participants 3+/5 ("end-of-read lands") | Average 4+/5 | UAT feedback form |
| Zero IT involvement | Yes — no IT contact needed | — | Sprint 2 deployment log |
| Production-readiness validated | Architecture gaps confirmed working | — | Sprint 4 architecture review |
| **No third-party AI / processor** | Confirmed — no answer content leaves infrastructure | — | Architecture review + privacy audit |
| Observability confirmed | Sentry errors + PostHog events flowing from first session | — | Sentry + PostHog |
| **Routing verified** | All v4.2 persona/route paths pass | — | Sprint 3 routing test |

# 5. STAKEHOLDERS

The following stakeholders have a direct interest in or influence over this project. This register is updated at the start of each sprint if new stakeholders are identified.

| **Stakeholder / Role** | **Interest** | **Influence** | **Communication** | **Notes** |
| --- | --- | --- | --- | --- |
| Hotel Management / Project Sponsor | Operational insights, ROI, pilot success, Phase 2 decision | High — final decision authority | Sprint reviews, Debrief report, **GM Findings Report access** | Approves Charter. Makes Phase 2 continuation decision. |
| Lead Researcher | Instrument quality, data validity, publishable findings, Phase 2 | High — drives all research decisions | Daily AI collaboration, all artifact reviews, pilot facilitation, **the Researcher Console** | Approves all artifacts. Primary human team member. **Pilot's judge (Researcher Value Model v0.2).** |
| Front Desk Team (10 members) | Engaging experience, time respected, seeing input matter | Medium — participation determines data quality | MS Teams launch message, mid-pilot check-in, the end-of-read | Primary research subjects. UAT participants drawn from this group. |
| Claude / AI Developer | Producing code and artifacts to specification within sprint schedule | High — produces all AI deliverables | In-conversation delivery of all outputs | Bound by approved artifacts. No unilateral scope changes. |
| Property Owner / Investor | Research ROI, guest satisfaction improvement, competitive intel | Low in Phase 1 | Debrief report summary only | Not involved in day-to-day project decisions. |
| Future Research Collaborators | Instrument validity, publishable data, citation potential | Low in Phase 1 | Publication of findings post-pilot | Engaged in Phase 2 if academic publication pursued. |

## 5.1 Stakeholder Communication Plan

|  |  |
| --- | --- |
| **Sprint Review (end of each sprint)** | Lead Researcher reviews sprint output. Hotel Management briefed on progress. |
| **Sprint Gate Sign-Off** | Lead Researcher confirms all gate conditions met before next sprint begins. |
| **Mid-Pilot Check-In (Day 5 of pilot)** | Lead Researcher speaks informally with front desk team. Feedback collected. |
| **Pilot Debrief Meeting** | 45-minute meeting with Hotel Management. Findings presented. Phase 2 decision made. |
| **Artifact Delivery** | All AI-produced artifacts delivered in this conversation. Human review within 48 hours. |
| **Bug Reports (during pilot)** | Logged via MS Teams to Lead Researcher. Critical bugs addressed within 24 hours. |
| **Sentry Alerts** | Automatic error alerts to Lead Researcher email. Configured in Sprint 2. |
| **PostHog Weekly Digest** | Optional weekly product analytics digest email. Configured in Sprint 2. |

# 6. HIGH-LEVEL TIMELINE

The project is organized into 6 two-week sprints preceded by a Pre-Sprint setup phase. The Pre-Sprint now includes 9 setup tasks including PostHog, Sentry, and Node.js setup in addition to GitHub and Supabase.

| **Sprint** | **Weeks** | **Focus** | **Key Deliverables** | **Hours** |
| --- | --- | --- | --- | --- |
| **Pre-Sprint** | Before Wk 1 | Setup & Accounts | GitHub, Supabase, PostHog, Sentry accounts. Node.js install. Project folders. 9 tasks total. | 2.5 hours |
| **Sprint 0** | Weeks 1–2 | Foundation & Governance | 10 artifacts: Project Charter, SRS, Product Backlog, Use Cases, Risk Register, Test Plan, plus 4 new architecture artifacts. | 8–9 hours |
| **Sprint 1** | Weeks 3–4 | Architecture & Test Specs | v4.2 routing test + report-engine integrity protocol, instrument config structure, Visual Design (deferred to design session). | 7–8 hours |
| **Sprint 2** | Weeks 5–6 | Core Application Build | Working URL live. Capture flow functional. Sentry + PostHog live. Session resume + disambiguation. Data in Supabase. | 8–10 hours |
| **Sprint 3** | Weeks 7–8 | Full Instrument + Value Layer + Report Engine | Full v4.2 instrument (9 personas). Value layer (badge, end-of-read, coverage wall). Deterministic report engine. | 8–10 hours |
| **Sprint 4** | Weeks 9–10 | GM Report & Console + Polish + QA | GM report (compute-on-open) + Researcher Console. Playwright. Downtime screen. Full QA incl. **real iPad**. UAT Script ready. | 8–10 hours |
| **Sprint 5** | Weeks 11–12 | UAT + Pilot Launch | UAT with 2–3 team members. Critical fixes. Pilot launched via MS Teams. | 8–10 hours |
| **Sprint 6** | Weeks 13–14 | Pilot + Debrief | Monitoring. Weekly CSV backup to OneDrive. Final export. Debrief report. Phase 2 plan. | 6–8 hours |

## 6.1 Key Milestones

|  |  |
| --- | --- |
| **Pre-Sprint Complete** | 9 accounts and tools active. GitHub, Supabase, PostHog, Sentry configured. Node.js installed. |
| **Sprint 0 Gate** | All 10 governance documents approved. Branching test matrix complete. Visual design locked. |
| **Sprint 1 Gate** | v4.2 routing test + report-engine integrity protocol approved. Architecture documents approved. |
| **Sprint 2 Gate — First Working URL** | App live at guestiq.github.io. Sentry + PostHog receiving data. Capture flow functional. |
| **Sprint 3 Gate — Complete Experience** | Full v4.2 instrument live. Value layer live. Deterministic report engine passes the integrity protocol. |
| **Sprint 4 Gate — Prototype Complete** | GM report + Console complete. Playwright passing. Full QA (incl. real iPad) passed. UAT Script approved. |
| **Sprint 5 Milestone — Pilot Launch** | MS Teams message sent. First PostHog events and Sentry session recorded. |
| **Sprint 6 Gate — Project Complete** | Pilot closed. Debrief delivered. Phase 2 decision made. 34 artifacts filed. |

# 7. BUDGET

★ UPDATED v2.0: Section updated in v2.0: PostHog, Sentry, Radix UI, ESLint, Prettier, Playwright, Node.js all confirmed as free. Total direct cost remains $0.

The Phase 1 prototype is designed to be produced at zero direct monetary cost. The complete confirmed technology stack operates within free-tier limits throughout the prototype duration.

|  |  |
| --- | --- |
| **GitHub Pages (app hosting)** | Free — unlimited for public and private repositories |
| **GitHub Actions (CI/CD)** | Free — 2,000 minutes per month on free tier. Prototype deployments use approximately 20 minutes total. |
| **Supabase (database + auth)** | Free tier — 500MB storage, 50,000 monthly active users. Far exceeds prototype needs. |
| **PostHog (product analytics)** | Free tier — 1 million events per month. Prototype generates approximately 5,000 events total. |
| **Sentry (error tracking)** | Free tier — 5,000 errors per month. Prototype unlikely to generate more than 100. |
| **React 18 + Vite** | Free — open source |
| **Radix UI (headless components)** | Free — open source. Saves approximately 10 hours of accessible component build time. |
| **Tailwind CSS** | Free — open source |
| **Framer Motion** | Free — open source |
| **Recharts** | Free — open source |
| **i18next** | Free — open source |
| **ESLint + Prettier** | Free — open source |
| **Playwright (visual regression)** | Free — open source |
| **Node.js** | Free — open source. Required for local development environment. |
| **Custom domain (optional)** | ~$12/year if guestiq.com or similar preferred. Not required — guestiq.github.io works for prototype. |
| **AI Development (Claude)** | Included in existing Claude subscription |
| **Your time investment** | 53–67 hours across 14 weeks — real opportunity cost, zero monetary cost |
| **TOTAL DIRECT COST** | $0 for prototype (optional $12/year for custom domain) |

ℹ NOTE: Phase 2 costs will differ if Supabase Pro tier is needed for higher volume, professional translation services are engaged, or the visual admin CMS requires additional infrastructure. A Phase 2 budget estimate is produced as part of the Sprint 6 Phase 2 Recommendations Document.

# 8. KEY PROJECT RISKS

★ RECONCILED v2.2: Risk summary aligned to Risk Register v1.2.

The following risks are assessed for probability and impact with mitigation strategies. Updated at the start of every sprint. The full Risk Register **v1.2** is the living document.

| **Risk** | **Prob.** | **Impact** | **Mitigation Strategy** |
| --- | --- | --- | --- |
| Decision latency — artifact reviews exceed 48h, delaying sprints (R-01) | **High** | **High** | Dedicated review time at sprint start; 48h turnaround is a project commitment. |
| **Report-engine integrity — a wrong / non-compliant / de-anonymizing finding (R-14)** | **Low** | **High** | Report-engine integrity protocol on seeded data; guardrail + CF-sink + small-N tests; determinism check. The new highest-stakes failure. |
| Low front-desk participation — under 70% contribute (R-03) | **Medium** | **High** | Dignified value layer; manager endorsement; Day-5 follow-up. |
| Single human covering all roles (R-11) | **High** | **High** | Scrum Master function held by Claude; SM checklist at every sprint start. |
| **Documentation / spec drift (R-13)** | **Medium** | **High** | Reference-by-ID; canon set + Status Tracker; consistency sweep after material decisions. |
| Routing / instrument errors — wrong persona battery or gold tag (R-02) | **Low** | **High** | v4.2 routing test; config validator (gold_tag / CF-sink); per-path Sprint 3 testing. |
| **Simulation-only validation — no real guests (R-16)** | **High** | **Medium** | Findings framed as convergent belief, not fact; GM-reaction capture as the validation signal; real-guest validation = Phase-2. |
| Config corruption — malformed config breaks load (R-05) | **Medium** | **Medium** | Validator on load; Git version control. |
| Supabase project accidental deletion (R-06) | **Low** | **High** | Weekly CSV to OneDrive; deletion email gate; restore via support. |
| Scope creep during build (R-08) | **Medium** | **Medium** | Formal change request; Phase-2 backlog captures ideas. |
| **RosaeNLG bundle-size / story quality (R-15)** | **Medium** | **Low** | Measure bundle; fallback = hand-templates (short, fixed-input story). |
| PostHog / Sentry privacy (R-10) | **Low** | **Low** | IP anonymization; no PII; **no third-party AI reduces the surface**. |

*(R-09 Gamification Disengagement RETIRED — gamification removed.)*

# 9. CONSTRAINTS AND ASSUMPTIONS

## 9.1 Constraints

* The application must require zero IT department involvement to deploy and operate.
* The application must run on existing front desk PC hardware without any software installation by hotel staff.
* The prototype must be delivered within 14 weeks from project start.
* All hosting and infrastructure must operate within free-tier service limits.
* The instrument content — **Questionnaire v4.2 (9 personas, gold-tagged)** — is fixed as canon for Phase 1. Options may be refined, but the persona set and gold tags are locked for the prototype.
* The application is English-language only in Phase 1. No translation work is performed.
* The application handles a maximum of approximately 50 concurrent users in the prototype — well within all free-tier limits.
* All components must accept content as external properties — never containing hardcoded content. Content is **data-driven config from the start** (Architecture v1.1 §2).

## 9.2 Assumptions

* Front desk PCs run Windows 10 or Windows 11 with Microsoft Edge or Google Chrome available.
* Front desk PCs have standard hotel broadband internet allowing outbound HTTPS connections to GitHub, Supabase, PostHog, and Sentry.
* The Lead Researcher has a PC or laptop with Node.js installed for local development review and testing.
* Hotel management supports the pilot and encourages team participation without mandating it.
* The front desk team has at least 5 minutes of lull time available during a typical shift.
* MS Teams or corporate email is available for sending the pilot launch message and receiving bug reports from team members during the pilot.
* GitHub, Supabase, PostHog, and Sentry free-tier services remain available throughout the 14-week project duration.
* The Supabase project is not accidentally deleted during the pilot — weekly CSV backup to OneDrive is the mitigation.

# 10. CONFIRMED TECHNOLOGY STACK

All technology decisions are confirmed and locked. Every tool operates within its free tier for the full prototype duration. No tool requires installation on hotel hardware.

| **Technology** | **Layer** | **Purpose** | **Cost** | **Confirmed** |
| --- | --- | --- | --- | --- |
| React 18 + Vite | Frontend | Application framework and build tooling | Free | **✓ Locked** |
| Radix UI | Frontend | Headless accessible component library | Free | **✓ Locked** |
| Tailwind CSS | Frontend | Utility-first CSS — GuestIQ design tokens | Free | **✓ Locked** |
| Framer Motion | Frontend | Animation — end-of-read cinematic, coverage wall, transitions | Free | **✓ Locked** |
| Recharts | Frontend | Charts — Researcher Console lenses | Free | **✓ Locked** |
| **RosaeNLG** | Frontend | **Local, rule-based end-of-read story generation (no AI, no third party)** | Free | **✓ Locked (v2.2)** |
| i18next | Frontend | i18n architecture — English only in prototype | Free | **✓ Locked** |
| Vite PWA Plugin | Frontend | PWA config + session persistence | Free | **✓ Locked** |
| ESLint + Prettier | Developer tools | Code quality + consistent formatting | Free | **✓ Locked** |
| Supabase | Backend | Database, auth, real-time, migrations | Free tier | **✓ Locked** |
| Supabase Auth | Backend | Bypass mode in prototype — active in Phase 2 | Free tier | **✓ Locked** |
| Supabase Migrations | Backend | Schema versioning from Sprint 1 | Free | **✓ Locked** |
| GitHub Pages | Hosting | App hosting at guestiq.github.io | Free | **✓ Locked** |
| GitHub Actions | CI/CD | Auto-deploy on code push | Free | **✓ Locked** |
| Sentry | Observability | Error tracking + performance monitoring | Free tier | **✓ Locked** |
| PostHog | Observability | Product analytics + session replay | Free tier | **✓ Locked** |
| Playwright | Testing | Visual regression screenshots | Free | **✓ Locked** |
| Node.js | Development | Local development environment on researcher PC | Free | **✓ Locked** |

# 11. DEFINITION OF PROJECT SUCCESS

The project is formally declared successful at the Sprint 6 debrief meeting when all of the following conditions are confirmed:

|  |  |
| --- | --- |
| **1** | The prototype is live and accessible at guestiq.github.io. |
| **2** | At least 7 of 10 front desk team members have contributed at least one read. |
| **3** | At least 5 complete read records exist in Supabase. |
| **4** | The **GM Findings Report** computes on-open and returns correct findings (deterministic engine; integrity protocol passed). |
| **5** | The **report-engine guardrails hold** — no recommendation, no percentage, no name, no subtractive conclusion, CF-sink suppressed. |
| **6** | At least 3 actionable findings identified, GM-judged non-obvious (GM-reaction capture). |
| **7** | The reconciled artifact set is filed and approved. |
| **8** | Sentry has recorded at least one session with no critical unresolved errors. |
| **9** | PostHog shows a complete funnel (badge → read → end-of-read → coverage wall) for at least 5 reads. |
| **10** | **No third-party AI / external processor** — confirmed by architecture review; the story (RosaeNLG) and report engine run locally. |
| **11** | The debrief meeting has been conducted with hotel management. |
| **12** | A Phase 2 continuation decision has been made (yes, no, or deferred). |
| **13** | The project retrospective is complete and lessons learned are documented. |

# 13. DELIVERY METHODOLOGY

★ UPDATED v2.0: ADDED v2.1: This section documents the hybrid delivery framework agreed during Sprint 0 planning. It is the anchor for all v1.1 updates to Sprint 0 artifacts. All content is additive — nothing in previous sections is changed.

**13.1 Hybrid Framework Stack**

GuestIQ is developed using six active frameworks simultaneously. Each occupies a distinct layer of the project — they do not compete, they complement.

|  |  |
| --- | --- |
| **Framework** | **Role in GuestIQ** |
| **F-01 Use Case 3.0 (Jacobson / Cockburn, Dec 2024)** | Requirements and traceability. Use Case Storytelling practice. Use Cases = Epics. Slices = Features. Work Items = Stories. |
| **F-02 Scrum** | Sprint delivery. 2-week cadence. Backlog. Velocity. DoD/DoR. Sprint gates. Retrospectives. Adapted for one-person team. |
| **F-03 PRINCE2-lite Governance** | Formal project initiation artifacts: Charter, RACI, Risk Register, Stakeholder Register. Sequential gate-based approval. |
| **F-04 Academic Research Methodology** | Instrument validity and reliability. **Projection-instrument design; gold-map obviousness filter; convergence floor; simulation-only validation (Phase-1).** Research data quality. |
| **F-05 Behaviour-Driven TDD — Option A** | Instruments: **v4.2 routing test (Sprint 1), report-engine integrity protocol (Sprint 1/3), Playwright visual regression (Sprint 4), data integrity verification (Sprint 2)**. Test specification always precedes implementation. |
| **F-06 Product-Led Growth — Phase 1** | Engagement loop: **Badge → Read → End-of-read → Coverage**. NSM tracking via PostHog. Aha moment: the **end-of-read** reflection (no gamification). |

**13.2 Jobs-to-Be-Done — Three Actor Statements**

GuestIQ serves three distinct actors, each hiring the product for a different job. These statements are the reference for all product decisions.

|  |
| --- |
| **Actor 1 — Hotel Management**  Hires GuestIQ to translate the front desk team's collective knowledge of guest behaviour into structured, segmented data — so that operational decisions about service design, staffing, and positioning are made with evidence rather than accumulated assumption. |
| **Actor 2 — Lead Researcher**  Hires GuestIQ to prove that a **dignified projection instrument** can collect research-grade guest-expectation expertise from front desk professionals — surfacing **non-obvious findings** a GM will act on — producing a basis that is both publishable and operationally useful, **without any third-party AI**. |
| **Actor 3 — Front Desk Team**  Hires GuestIQ to give their professional expertise about guest behaviour a form — converting what they know from thousands of interactions into structured data that is visible, valued, and consequential beyond the front desk. |

ℹ Full JTBD analysis — including barriers, success signals, switching events, and product decisions per actor — is documented in the JTBD Statements artifact (S0-0.3).

**13.3 North Star Metric**

**GuestIQ's North Star Metric is the percentage of respondents who complete their selected tier, measured as complete sessions ÷ started sessions for the same property\_id, at the close of the pilot window.**

Measurement: distinct completed reads / distinct started reads WHERE property\_id = 'PROP001', via Supabase SQL Editor or the Researcher Console. Thresholds: ≥80% Stretch, ≥60% Pass (minimum — this IS the pilot completion-rate success criterion), 40–59% At Risk, <40% Fail.

ℹ The OKRs in Section 4 (success criteria) are the time-bound key results that operationalise this persistent goal. They are not renamed — they are identified as the operational implementation of the North Star. Full NSM specification including input metrics is in the NSM artifact (S0-0.5).

**13.4 Scrum Master Function**

GuestIQ has one human covering all human roles simultaneously. This creates a structural tension between Product Owner instincts (deliver) and Scrum Master instincts (protect process). The resolution: Claude holds the Scrum Master function at the start of each sprint session, running a 7-item checklist before any delivery work begins.

|  |  |
| --- | --- |
| **Role** | Scrum Master — held by Claude (AI Developer) at sprint start |
| **Activation** | First message of each sprint session that is explicitly a sprint start |
| **Duration** | 5 minutes maximum — 7-item checklist only |
| **Checklist items** | (1) Previous gate conditions confirmed · (2) Epic/Feature/Story hierarchy correct · (3) DoR satisfied for all entering stories · (4) TDD test specifications in place · (5) PLG metric check (Sprints 5–6) · (6) Methodology impediments · (7) Use Case model current |
| **Authority** | Can and must flag any unmet condition before delivery begins |

**13.5 Work Hierarchy — Epic → Feature → Story → Task**

All backlog items are organised in a four-level hierarchy derived from Use Case 3.0 applied to Scrum delivery.

| **Level** | **Maps To** | **GuestIQ Definition** |
| --- | --- | --- |
| **EPIC** | = Use Case | Complete user journey. Contains all scenarios and extensions. Spans multiple sprints. Owner: SH-02 (research) / SH-04 (technical). |
| **FEATURE** | = Use Case Slice | Staged, implementable path through a Use Case. Bounded to one sprint. Includes requirements + design + code + tests (TDD Principle 10). |
| **USER STORY** | = Work Item | Sprint-sized deliverable. Acceptance criteria = the test specification (BDD). Satisfies DoR before sprint. Satisfies DoD before marking done. |
| **TASK** | = Implementation Detail | Sub-day item. Internal to the session. Not tracked in formal backlog. Optional for simple stories. |

**13.6 Framework Interaction Priority**

When two frameworks give different guidance on the same issue, the following priority order governs. Earlier rules always take precedence.

|  |  |
| --- | --- |
| **1 — Academic research integrity** | Unconditional. If research data is compromised, the pilot pauses — regardless of schedule, delivery pressure, or any other framework. |
| **2 — Scrum Master process** | SM checklist runs before delivery. Any failure blocks new work until resolved. |
| **3 — TDD test specification** | Test spec precedes code, always. v4.2 routing test + report-engine integrity protocol before Sprint 2. Playwright before post-Sprint 4 deployments. |
| **4 — PRINCE2 governance artifacts** | Governance artifacts updated before new story work begins. Risk Register at sprint start. |
| **5 — PLG engagement design** | Serves user adoption within constraints set by priorities 1–4. |
| **6 — JTBD user goals** | Goals define what to build; constraints define how. A goal is never dropped — a feasible alternative is found. |

# 12. PROJECT AUTHORIZATION AND APPROVAL

★ UPDATED v2.0: Re-approval required in v2.1: Section 13 (Delivery Methodology) added. Risk count corrected from 10 to 12. Version 2.0 approval is noted and remains on record. All v2.1 changes are additive — no previously approved content has been removed or contradicted.

By signing below, each stakeholder confirms they have read and understood this Project Charter v2.0, agree that it accurately and completely represents the project purpose, scope, objectives, and success criteria as updated from v1.0, and authorize the project to proceed to Sprint 1 on the basis of this updated charter.

| **Role** | **Name & Signature** | **Date Approved** |
| --- | --- | --- |
| **Project Sponsor / Hotel Management** |  |  |
| **Lead Researcher** |  |  |
| **Developer (AI Representative)** |  |  |

|  |  |
| --- | --- |
| **Version 1.0 approval** | Approved by Lead Researcher prior to planning phase |
| **Version 2.1 changes** | Additive only — Section 13 added (Delivery Methodology). Risk count corrected. No content removed. |
| **Re-approval requirement** | All signatories must re-approve v2.0 before Sprint 1 begins |
| **Next version trigger** | Material scope change, objective change, or timeline change during Sprints 1–6. All signatories must re-approve v2.1 before Sprint 1 begins. |

ℹ NOTE: This Project Charter v2.0 supersedes v1.0 for all purposes from the date of v2.0 approval. Version 1.0 is retained on file for audit purposes. The Master Development Timeline, SRS, and all subsequent Sprint 0 artifacts reference this v2.0 Charter as the authoritative founding document.

**— END OF PROJECT CHARTER v2.0 —**

*GuestIQ — Hotel Guest Expectations Research Application · Project Charter v2.1 · Sprint 0 Artifact*