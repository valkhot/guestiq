**DEFINITION OF DONE**

**&**

**DEFINITION OF READY**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-1.7 — Sprint 0 Artifact |
| **Document Version** | 1.2 — Reconciled to projection-model + no-AI pivot (S4 dashboard retired → GM Report & Console; S1/S3 to v4.2; 84-path/Module-5/tense/79Q/Strangler-Fig removed) |
| **Document Status** | APPROVED v1.0 — v1.1 PENDING RE-APPROVAL |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours of receipt |
| **Applies To** | All Epics, Features, User Stories, and Artifacts across Sprints 0–6 |
| **Changes from v1.0** | (1) Epic-level DoR — 3 criteria before Use Case Slices are created. (2) Feature-level DoR — 3 criteria + TDD test specification criterion before Stories are written. (3) Scrum Master gate criterion added to Done criteria. (4) Version log updated. |
| **Related Documents** | Methodology Document v1.1 (S0-0.1) · RACI Matrix v1.1 (S0-1.5) · Product Backlog v1.1 (S0-2.5v) · Timeline v4.0 |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Definition-of-Done-Ready-v1.1.docx |

ℹ Both definitions are agreed before Sprint 1 begins and apply from that point forward without exception. They may be updated between sprints by mutual agreement — never unilaterally and never during a sprint.

# 1. PURPOSE AND IMPORTANCE

The Definition of Done and Definition of Ready are the two quality standards that govern every piece of work in the GuestIQ project. Without them, 'done' means different things to different people at different times — leading to rework, missed bugs, and eroded trust in the delivered output.

Version 1.1 extends these definitions upward in the work hierarchy. The original v1.0 defined Ready and Done at the User Story level. With the adoption of Use Case 3.0 and the Epic→Feature→Story→Task hierarchy, quality standards are now needed at the Epic level (before Use Case Slices are created from it) and the Feature level (before User Stories are written for it). These additions close the quality gap at the top of the hierarchy — where the largest decisions are made.

The Scrum Master gate criterion, also new in v1.1, ensures the 7-item SM sprint-start checklist is a formal part of the Definition of Done for each sprint — not an optional process step.

**⚠ If work is declared done without meeting all applicable criteria, it creates hidden debt that compounds across sprints. A bug that escapes Sprint 2 because testing was skipped will cost 3× longer to fix in Sprint 4. Enforce these definitions without exception.**

# 2. HOW TO USE THESE DEFINITIONS

This document defines criteria at four levels of the work hierarchy. Each level's criteria are applied at a specific moment:

| **Level** | **When Applied** | **By Whom** |
| --- | --- | --- |
| **EPIC DoR ★ NEW** | Before Use Case Slices (Features) are identified from the Epic | Scrum Master (Claude SM function) verifies at sprint start when Epic is being sliced |
| **FEATURE DoR ★ NEW** | Before User Stories are written for the Feature | AI Developer verifies before writing stories; Lead Researcher confirms at sprint planning |
| **STORY DoR** | At sprint planning — before the story enters the sprint | Lead Researcher and AI Developer jointly verify |
| **STORY DoD** | At sprint review — before marking the story complete | Lead Researcher verifies; AI Developer applies internally before submission |
| **SPRINT GATE** | At the end of each sprint — hard stop before next sprint | Scrum Master SM checklist + Lead Researcher gate confirmation |

ℹ ★ Epic DoR and Feature DoR are new in v1.1, added when Use Case 3.0 was adopted as the requirements framework. They apply from Sprint 0 Use Case production onwards.

# DEFINITION OF READY

A work item may only enter development when ALL applicable level criteria are satisfied.

**EPIC-LEVEL DoR** *— A Use Case may only be sliced into Features when all criteria below are met*

**★ NEW IN v1.1 · New in v1.1 — triggered by Use Case 3.0 adoption. Applies from Sprint 0 Use Case Specifications (S0-2.5) onwards.**

**✓ The Use Case narrative is complete — actor, goal, basic scenario, and at least 2 key extensions are documented in S0-2.5 Use Case Specifications ★**

*A Use Case without a complete narrative cannot be sliced into Features because the scope of each slice is undefined.*

**✓ The actor and goal are unambiguous — the actor is a named stakeholder (not a category), and the goal is a specific outcome they achieve ★**

*Example READY: 'A front-desk agent claims a badge, completes a CORE read as the Business persona, and reaches the end-of-read.' NOT READY: 'User completes the survey.'*

**✓ The key scenarios are identified — at least one success path (happy path) and one significant failure or alternative path are named ★**

*Slicing requires knowing what paths exist. An Epic with only a happy path will produce Features that cannot handle edge cases.*

**✓ The Epic Owner is identified and has confirmed the Use Case scope is correct before slicing begins ★**

*SH-02 Lead Researcher owns research-domain Epics. SH-04 AI Developer owns technical-domain Epics. Owner confirmation is required before Features are defined.*

**FEATURE-LEVEL DoR** *— A Use Case Slice may only be decomposed into User Stories when all criteria below are met*

**★ NEW IN v1.1 · New in v1.1 — triggered by Use Case 3.0 adoption. Applies from Sprint 1 Feature planning onwards.**

**✓ The Use Case Slice is clearly bounded — the specific paths from the Use Case included in this Feature are named (e.g. 'Basic scenario + Extension 2 + Extension 4') ★**

*A Feature without a defined slice boundary will expand during Story writing. Explicit path selection is the contract between the Epic and the Feature.*

**✓ The Feature scope fits within one sprint — if the slice requires more than one sprint, it must be split into two Features before Stories are written ★**

*Use Case 3.0 Principle 10: a slice includes design + code + tests. If all three cannot be completed in one sprint, the slice is too large.*

**✓ The test slice is defined — the acceptance behaviour that will confirm the Feature is implemented correctly is identified before Stories are written ★**

*This is the BDD-TDD criterion at the Feature level. The test specification precedes the implementation. For routing Features: the persona/route paths in the **v4.2 routing test** are identified. For report Features: the **report-engine integrity protocol** (Test Plan v2.0 §2.1) seeded cases are identified.*

**✓ The TDD instrument for this Feature is confirmed — v4.2 routing-test paths identified (routing Features), report-engine integrity seeded cases defined (report Features), Playwright baseline in place (visual Features), or data integrity test scope defined (data Features) ★**

*BDD-TDD Option A: test specification always precedes code. The instrument must be identified and accessible before Story writing begins.*

**STORY-LEVEL DoR** *— A User Story may only enter a sprint when all criteria below are met*

**CONTENT AND CLARITY**

**✓** The user story is written in standard format: As a [role], I want [capability] so that [benefit]

**✓** The acceptance criteria are written as specific, testable conditions — not vague descriptions

*READY: 'Session resume prompt appears when incomplete token found in local storage.' NOT READY: 'Session works properly.'*

**✓** Every technical term or abbreviation in the story is defined or referenced in an approved document

**✓** The story references the correct **instrument config (v4.2)** structure for any content-related work

*Applies from Sprint 2 onwards. All content accessed through the approved data structure — never hardcoded inline.*

**✓** For routing stories: the specific route being implemented is identified by **persona/route** in the v4.2 routing test

*Example: 'Implements L1 routing for the Business, Early-flight, and Cruise personas into their batteries.'*

**SIZE AND SCOPE**

**✓** The story is small enough to be completed within a single sprint (2 weeks)

*If a story cannot be completed in one sprint, it must be split into smaller stories before entering the sprint.*

**✓** The story has a story point estimate agreed between Lead Researcher and AI Developer

**✓** The story does not depend on any other story that is not yet complete — or the dependency is explicitly documented and the dependent story is also in the sprint

**DESIGN AND ARCHITECTURE**

**✓** The Visual Design System (S1-3.3) has been reviewed for any UI story — the correct design tokens, colors, typography, and component specifications are identified

*Applies from Sprint 1 onwards for all user-facing components.*

**✓** For any story touching the Supabase schema: the relevant table, fields, and data types are identified and consistent with the approved ERD

**✓** For any story touching the branching logic: the Branching Logic Specification (S1-2.1) has been consulted and the routing path is confirmed correct

**✓** For any story involving a PostHog event: the exact event name and required properties are identified in the Observability Specification (S0-3.3)

*Event names must match exactly — analytics queries depend on consistent event naming.*

**ENVIRONMENT AND TOOLING**

**✓** All required accounts and credentials are available — GitHub, Supabase, PostHog, Sentry

*Verified in Pre-Sprint. If any credential is missing, the story cannot begin.*

**✓** The GitHub repository exists and GitHub Actions deployment is confirmed working

*Verified in Sprint 2 setup. Subsequent sprints inherit this verification.*

**✓** Node.js is installed on the researcher PC and the local development environment is functional

*Required from Sprint 2 onwards for local testing.*

**✓** ESLint and Prettier are configured — code quality tools are active before any code is written

*Configured in Sprint 1. All subsequent sprints inherit this configuration.*

**APPROVAL AND DOCUMENTATION**

**✓** All Sprint 0 governance documents are approved before Sprint 1 stories can begin

*The Sprint 0 gate must be fully passed before Sprint 1 planning can occur.*

**✓** All Sprint 1 architecture documents are approved before Sprint 2 coding stories can begin

*The Sprint 1 gate must be fully passed before any Sprint 2 code is written.*

**✓** For document artifacts: the outline or structure has been reviewed and is consistent with the Project Charter v2.1 scope

# DEFINITION OF DONE

A work item is only complete when ALL applicable criteria below are satisfied. The Definition of Done is organized in three tiers plus a new sprint gate criterion. Every story must meet Universal Criteria plus the tier matching its type.

**TIER 1 — UNIVERSAL CRITERIA** *— Applies to every story, feature, artifact, and sprint without exception*

**✓** The acceptance criteria defined in the Definition of Ready are all satisfied — verified by Lead Researcher

**✓** No High or Medium severity bugs introduced by this story remain open

*Low severity bugs may be deferred to the next sprint with explicit documentation in the Bug Log.*

**✓** The story has been tested in the environment where it will actually be used

*For application features: tested in Edge and Chrome on Windows. For document artifacts: opened in Microsoft Word on a Windows PC.*

**✓** The story is documented — either in a project artifact (for document stories) or in code comments (for complex logic)

**✓** The Product Backlog is updated — the story is marked Complete, any child tasks are resolved, and any new discovered tasks are added as new backlog items

**✓ The Scrum Master sprint-start checklist (SM-CHECK) has been run and all 7 items confirmed before any story in this sprint is marked Done ★**

*New in v1.1. The SM checklist is a sprint-level gate, not a story-level check. It must be completed once at sprint start. No story in a sprint is considered Done if the SM checklist was not run.*

**TIER 2 — FEATURE CRITERIA** *— Applies to all application code stories*

**CODE QUALITY**

**✓** ESLint passes with zero errors — no suppressed warnings that hide real issues

*Run: npm run lint. Zero errors is the pass condition.*

**✓** Prettier formatting is applied — code is consistently formatted throughout

*Run: npm run format. Commit the formatted output.*

**✓** No hardcoded content in React components — all text, question data, and answer options are read from the **instrument config** (v4.2 as data; service-layer only)

*This is the architectural discipline (Architecture v1.1 §2) that keeps content data-driven and editable without touching code.*

**✓** All Supabase calls are made through the service layer (src/services/) — no direct Supabase client calls from components

*Exception: the service layer files themselves. No other file imports supabaseClient directly.*

**TESTING**

**✓** The feature has been manually tested end-to-end in both Edge and Chrome on Windows

**✓** The relevant **v4.2 routing paths** (persona battery + L2 add-on) have been verified against the v4.2 routing test — pass/fail recorded

*Applies to all persona-routing stories and any story that touches routing logic.*

**✓** If the story involves data storage: data integrity has been verified — at least 3 complete test sessions traced from UI selection through to correct Supabase record

*Open Supabase Table Editor. Verify every answered question has a response record with the correct answer\_code.*

**✓** If the story involves the offline queue: offline behavior has been tested using Chrome DevTools network throttling

*Simulate Offline in DevTools. Answer questions. Restore connection. Verify queued responses appear in Supabase within 60 seconds.*

**✓** Playwright visual regression screenshots are current — no regressions from baseline

*Applies from Sprint 4 onwards after baseline is established.*

**ACCESSIBILITY AND PERFORMANCE**

**✓** All interactive elements are keyboard navigable — Tab, Enter, Space, and Escape work correctly

**✓** Color contrast ratios meet WCAG 2.1 AA — minimum 4.5:1 for body text, 3:1 for large text and UI components

**✓** ARIA labels are present on all interactive elements that do not have visible text labels

**✓** Page load time is under 2 seconds on a standard broadband connection — confirmed by Sentry performance trace

*Sentry Performance dashboard shows p50 load time. If above 2 seconds, optimization is required before the story is done.*

**OBSERVABILITY**

**✓** All PostHog events defined in the Observability Specification (S0-3.3) for this feature are firing — verified in the PostHog Events dashboard

*Navigate to posthog.com → Events. Filter by event name. Confirm it appears after triggering the feature in a test session.*

**✓** Sentry shows no new unhandled errors introduced by this feature in the Sentry Issues dashboard

*Navigate to sentry.io → Issues. Filter by Last 24 hours. Zero new issues from this feature.*

**✓** If the story introduced a new Sentry error boundary or manual capture point: a test error has been triggered and confirmed received in Sentry

**DEPLOYMENT**

**✓** The feature is deployed to the live GitHub Pages URL (guestiq.github.io?property=PROP001) via GitHub Actions

*The GitHub Actions workflow shows a green checkmark for the latest deployment.*

**✓** The live URL has been opened and the feature verified in the deployed environment — not just in local development

*Local development and deployed environments can behave differently. Always verify on the live URL.*

**✓** If the story involves Supabase schema changes: the change was applied via a Supabase Migration, not a manual SQL edit

*Migrations are version-controlled. Manual edits are not.*

**TIER 3 — ARTIFACT CRITERIA** *— Applies to all document and diagram deliverables*

**CONTENT AND ACCURACY**

**✓** All content is consistent with the Project Charter v2.1 (S0-1.1v) — no statements contradict the approved scope, objectives, or constraints

**✓** All bracketed placeholder fields are identified and listed — the Lead Researcher knows which fields to complete

**✓** All cross-references to other documents use the correct document ID (e.g. S0-1.3, S1-2.1) — not vague references

**✓** Technical terminology is used consistently throughout — the same concept is named the same way in every document

*Example: always 'instrument config' not 'the questionnaire file'. Always 'persona' not 'intent category'. Always 'read' not 'session'.*

**FORMAT AND PRESENTATION**

**✓** The document opens and displays correctly in Microsoft Word on a Windows PC

**✓** The document has a cover page with document ID, version, status, date, and document location

**✓** The document has a header showing the document name and version on every page

**✓** The document has a footer showing page numbers on every page

**✓** All tables have header rows. Column widths are proportionate — no column is so narrow that content is unreadable

**APPROVAL**

**✓** The document has been delivered to the Lead Researcher in this conversation as a downloadable .docx file

**✓** The Lead Researcher has reviewed the document and confirmed approval — or provided specific revision requests

*Approval is explicit. Silence is not approval. If no response within 48 hours, the AI Developer follows up.*

**✓** The approved version has been copied to the correct sprint Approved folder — e.g. 00-Sprint-0 / Approved /

**✓** The document version and approval date have been noted in the project tracking spreadsheet

# 3. SUPPLEMENTARY CRITERIA FOR SPECIFIC STORY TYPES

The following additional criteria apply to high-stakes story types requiring verification beyond the standard Definition of Done. These criteria are applied in addition to the full tier criteria above — not instead of them.

## S1 — Instrument Routing (v4.2)

**✓** Every **L1 persona route** (all 9, incl. airline crew + executive/VIP) is verified into the correct segment battery via the v4.2 routing test

**✓** **L2 party routing** (family / group add-ons) is verified for the relevant combinations

**✓** Every reportable option carries a **gold tag** (BS/CON/MW/CF) and each question has **≤1 CF-sink** — confirmed by the config validator (Data Model §4)

**✓** The **CREW-4 segment-existence gate** is verified — a "crew almost never" answer suppresses crew findings downstream (GoldMap §14)

**✓** Edge cases documented: "None / not this guest" and "Other" behaviour defined and implemented

## S2 — Session Resume and Disambiguation

**✓** Tested on the same PC same browser — session resumes from correct question

**✓** Tested with two different browsers on the same PC — new session starts cleanly, original session data preserved in Supabase

**✓** Tested after full completion — completed session token cleared from local storage, does not trigger disambiguation on next visit

**✓** Tested after tab refresh mid-session — disambiguation or resume prompt appears correctly

## S3 — Instrument Config (v4.2 as data)

**✓** The instrument config represents **Questionnaire v4.2** — 9 personas, CORE/PRO/EXPERT depth, gold-tagged options, optional observer example — with correct text, options, tags, and routing

**✓** **Configuration validator** tested — a deliberately malformed config (incl. a **missing `gold_tag`** on a reportable option or a **duplicate `cf_sink`**) produces a clear error on load before any respondent-facing content renders

**✓** A sample of 10 items cross-referenced between the config and Questionnaire v4.2 — all match exactly (text, options, tags)

**✓** Content is **config from the start** (no hardcoded strings; service-layer only — Architecture v1.1 §2). *(Strangler-Fig "extract-from-hardcoded" ceremony retired — ContentMgmt Retire Decision v1.0.)*

## S4 — GM Findings Report & Researcher Console *(replaces the retired Management Dashboard)*

*The 9-panel Management Dashboard, CSV/PDF export, and SHIFT+CTRL+A are **removed**. These criteria cover the GM Findings Report (compute-on-open) and the Researcher Console.*

**✓** The **report-engine integrity protocol** (Test Plan v2.0 §2.1) passes on seeded data — all 5 gates, every guardrail (findings-not-recommendations, raw-counts-never-%, counts-never-names, in-house-only, **CF-sink suppression**, small-N at 3), and the **determinism** check (identical input → identical report)

**✓** The report is **computed on-open** (deterministic, client-side; no researcher trigger, no server) and appears ready in <1s at pilot scale (FR-RPT-10)

**✓** The end-of-read **story is generated by RosaeNLG (local, in-browser)**, bounded strictly to the agent's answers, with **nothing transmitted to any third party**

**✓** **GM access** verified — Ctrl+Alt+A + PIN + auto-lock + throttle (FR-GMA); **no `/admin`, no SHIFT+CTRL+A**

**✓** **Researcher Console** verified behind the researcher PIN — six lenses populate; per-badge data never leaves the Console; integrity review does **not** gate the GM's report

**✓** Overlay (GM report / Console) does not disrupt the underlying respondent session — closing returns to the exact screen it was on

## S5 — UAT and Pilot Launch

**✓** All Critical UAT issues resolved before pilot launch message is sent — no exceptions

**✓** App confirmed working on all 3 front desk PCs — not just the development machine

**✓** Bug reporting guide distributed and pinned in MS Teams channel before launch message

**✓** First PostHog event from a real (non-developer) session confirmed in PostHog dashboard

**✓** First Sentry session from a real device confirmed in Sentry dashboard — no critical errors

## S6 — Pilot Data and Debrief

**✓** Two weekly CSV backup files saved to OneDrive — Week 13 and Week 14 exports

**✓** Final CSV export contains complete data for all pilot sessions — cross-checked against Supabase session count

**✓** PostHog funnel analysis screenshot saved to Sprint 6 folder

**✓** Sentry performance summary screenshot saved to Sprint 6 folder

**✓** Phase 2 Recommendations Document reviewed and Phase 2 scope decision recorded in writing

# 4. SPRINT GATE CONDITIONS

Every sprint ends with a gate — a hard stop requiring every story to satisfy the full Definition of Done before the next sprint begins. Sprint gates cannot be bypassed or partially passed. The Scrum Master SM-CHECK step (new in v1.1) is a required gate condition for every sprint from Sprint 1 onwards.

| **Sprint** | **Gate Condition** | **What This Means in Practice** |
| --- | --- | --- |
| **Pre-Sprint** | All 9 pre-conditions confirmed | GitHub, Supabase, PostHog, and Sentry accounts active. Node.js installed. Credentials saved. Folder structure and tracking spreadsheet created. MS Teams access confirmed. |
| **Sprint 0** | All Sprint 0 artifacts approved (v1.0 and v1.1 updates) | All governance documents (S0-1.x) and requirements documents (S0-2.x), including all v1.1 updates, approved. S0-2.5 Use Case Specifications and S0-2.7 Product Backlog both in Approved folder. Methodology Document, JTBD, and NSM approved. |
| **Sprint 1** | Routing + report-engine test specs + SM-CHECK-S1 confirmed ★ | Sprint 1 architecture documents approved. **v4.2 routing test** + **report-engine integrity protocol** explicitly approved — the developer contract for Sprint 2. **Instrument config (v4.2)** structure approved. SM-CHECK-S1 confirmed. *(Sprint shape subject to the MDT replan.)* |
| **Sprint 2** | Working URL with data flowing to Supabase, Sentry, and PostHog + SM-CHECK-S2 | App live at guestiq.github.io. Modules 1–4 functional. Session resume and disambiguation working. Data integrity verified (5 sessions traced). All 3 data streams active. Offline queue tested. SM-CHECK-S2 confirmed. |
| **Sprint 3** | Complete experience + report engine confirmed + SM-CHECK-S3 | Full **v4.2 instrument** functional (9 personas). All routes verified. The **value layer** (badge, end-of-read, coverage wall) live. **Deterministic report engine** passes the integrity protocol. Config validator working. SM-CHECK-S3 confirmed. *(Sprint shape subject to the MDT replan.)* |
| **Sprint 4** | Prototype complete and ready for UAT + SM-CHECK-S4 | **GM Findings Report (compute-on-open) and Researcher Console** complete. Playwright baseline captured. Downtime screen functional. All QA passed in Edge and Chrome on a front desk PC **and on a real iPad**. UAT Script and Go-Live Runbook approved. SM-CHECK-S4 confirmed. *(Sprint shape subject to the MDT replan.)* |
| **Sprint 5** | Pilot launched with first real respondent session confirmed + SM-CHECK-S5 | All Critical UAT issues resolved. App working on all 3 front desk PCs. Launch message sent. Bug reporting guide pinned. First real PostHog events and Sentry session confirmed. SM-CHECK-S5 confirmed. |
| **Sprint 6** | Project complete — all 13 success conditions met + SM-CHECK-S6 | All 44 artifacts filed. Two CSV backups in OneDrive. Final export complete. Debrief meeting conducted. Phase 2 decision recorded. Retrospective complete. SM-CHECK-S6 confirmed. |

**⚠ A sprint gate is a binary condition — it either passes or it does not. There is no partial pass. If even one gate condition is unmet, the next sprint does not begin.**

# 5. EXCEPTION PROCESS

In rare circumstances, a Definition of Done criterion may be waived. This is not a loophole — it is a controlled process for genuine edge cases where the cost of meeting a criterion outweighs the risk of deferring it.

| **Criterion** | **When It May Be Waived** | **Who Must Approve** |
| --- | --- | --- |
| **Cross-browser testing in both Edge and Chrome** | A feature that touches no visual or interactive elements — e.g. a pure data migration story | Lead Researcher explicitly agrees the feature has no UI impact and signs off in writing in the tracking spreadsheet |
| **PostHog event verified firing** | A feature story completed before PostHog is initialized (Sprint 1 architecture stories only) | Automatic — Sprint 1 architecture stories are exempt. Sprint 2 onwards: no exception. |
| **Playwright visual regression passing** | Sprint 4 stories completed before the Playwright baseline is established | Automatic — stories before the baseline is set are exempt. After baseline: no exception. |
| **Deployed to live GitHub Pages URL** | A pure documentation artifact with no application code | Automatic — artifact stories are deployed via Word document download, not GitHub Pages. |
| **All 84 routing paths verified** | A story that modifies a single known path with no impact on other paths — change is scoped and isolated | Lead Researcher explicitly agrees the scope is isolated. Specific paths re-tested are documented. |
| **No hardcoded content in components** | An emergency fix during the pilot that cannot wait for a proper fix — high severity bug only | Lead Researcher approves the temporary exception. A follow-up story is immediately added to the backlog to remove the hardcoded content. Exception logged. |

ℹ An exception is never retroactively applied to justify skipped work. All exceptions are agreed before the work is delivered — not discovered after the fact.

# 6. QUICK REFERENCE CHECKLISTS

Use this section during sprint planning (Ready) and sprint review (Done) as a rapid-check reference. For the full criteria with explanations, refer to Sections 2 and 3 above.

## DEFINITION OF READY — QUICK CHECK

Run at the appropriate level before creating the next level of work item.

**Epic DoR (before slicing into Features) ★ NEW**

**✓ Use Case narrative complete — actor, goal, basic scenario, 2+ extensions ★**

**✓ Actor and goal are unambiguous ★**

**✓ Key scenarios identified — at least one success path and one failure path ★**

**✓ Epic Owner confirmed scope is correct before slicing begins ★**

**Feature DoR (before writing Stories) ★ NEW**

**✓ Use Case Slice boundary defined — specific paths named ★**

**✓ Feature scope fits within one sprint — split if larger ★**

**✓ Test slice defined — acceptance behaviour identified before Stories are written ★**

**✓ TDD instrument confirmed — v4.2 routing-test paths, report-engine integrity seeded cases, Playwright baseline, or data integrity scope identified ★**

**Story DoR (before entering sprint)**

**✓** Story in standard format with specific testable acceptance criteria

**✓** Story small enough to complete in one sprint

**✓** Story point estimate agreed

**✓** Dependencies resolved or explicitly documented

**✓** Visual Design System consulted for any UI story

**✓** Supabase tables and fields identified for any data story

**✓** Branching Logic Specification consulted for any routing story

**✓** PostHog event name and properties identified for any analytics story

**✓** All required accounts and credentials available

**✓** Prerequisite sprint gate passed

## DEFINITION OF DONE — QUICK CHECK

Run at sprint review for every story being presented as complete.

**Universal — all stories**

**✓** All acceptance criteria satisfied — verified by Lead Researcher

**✓** No open High or Medium bugs from this story

**✓** Tested in the actual use environment (Edge + Chrome / Microsoft Word)

**✓** Product Backlog updated — story marked Complete

**✓ SM-CHECK run and all 7 items confirmed for this sprint ★ ★**

**Feature stories — additional**

**✓** ESLint passes — zero errors

**✓** No hardcoded content in components

**✓** All Supabase calls through service layer

**✓** Tested in Edge and Chrome on Windows

**✓** Data integrity verified (if data storage involved)

**✓** PostHog events firing — verified in PostHog dashboard

**✓** Sentry shows no new unhandled errors

**✓** Deployed to live GitHub Pages URL — verified on live URL

**✓** WCAG 2.1 AA — keyboard navigable, contrast ratios correct, ARIA labels present

**✓** Page load under 2 seconds — confirmed by Sentry

**Artifact stories — additional**

**✓** Content consistent with Project Charter v2.1

**✓** All placeholders identified

**✓** Opens correctly in Microsoft Word on Windows

**✓** Cover page, header, footer, page numbers present

**✓** Lead Researcher has explicitly approved — not just received

**✓** Approved copy filed in sprint Approved folder

# 7. VERSION UPDATE LOG

| **Version** | **Date** | **Updated By** | **Change** |
| --- | --- | --- | --- |
| **v1.0** | [Sprint 0] | Claude / AI Developer | Initial version. Three-tier Definition of Done. Full Definition of Ready at Story level. 8 sprint gate conditions. Exception process. 6 story-type supplementary criteria. Quick reference checklists. |
| **v1.1** | [Sprint 0] | Claude / AI Developer | Three additions triggered by Methodology Document v1.1 (S0-0.1) and Use Case 3.0 adoption: (1) Epic-level DoR — 4 criteria before Use Case Slices (Features) are created; (2) Feature-level DoR — 4 criteria including TDD test specification criterion before Stories are written; (3) Scrum Master gate criterion added to Tier 1 Universal Done criteria — SM-CHECK must be run and confirmed before any story in a sprint is marked Done. Sprint gate table updated to include SM-CHECK for all sprints 1–6 and updated artifact count (44). Quick reference updated. All changes are additive — no existing criteria removed. |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF DEFINITION OF DONE AND DEFINITION OF READY v1.2 —**

*GuestIQ · Definition of Done + Ready v1.1 · S0-1.7 · Sprint 0 Artifact · Confidential*