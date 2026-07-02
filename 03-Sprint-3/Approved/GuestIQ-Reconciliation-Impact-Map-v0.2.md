# GuestIQ — Reconciliation Impact Map (v0.2)

| | |
|---|---|
| **Artifact** | GuestIQ-Reconciliation-Impact-Map — v0.2 (DRAFT · for Lead Researcher approval) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Purpose** | Declare what is now authoritative, list what is superseded, and map every governing document against the post-pivot two-stakeholder reality — with a verdict and a reason for each — so the reconciliation (Stage 1) is scoped, estimable, and drift-proof before any rewrite begins. |
| **Prepared By** | Claude (AI Developer) |
| **Date** | Sprint 4 planning |
| **Method** | This is a *map, not the rewrite.* Each verdict traces to one of the four changes in §3. Per-document verdicts are a proposed assessment for the Lead Researcher to confirm at the start of Stage 1, not a deep audit of each file. |
| **Companion to** | The Front-Desk Agent Value Model v0.3 (Stage 0.5, now complete) and the four GM artifacts. |
| **Changes in v0.2** | Added §9 — the consolidation view (which docs merge/retire to a leaner target), per the adopted hybrid approach. The §4 verdicts are unchanged; §9 layers the slimming on top. |

---

## 0 · What this map is and isn't

It **is** the Stage 0 + Stage 1 front-end: it declares canon, retires the dead-model documents, and tells us exactly which governing docs need *rewrite / amend / retire / nothing*, in what order. It **is not** the reconciliation itself — no governing doc is changed here. It exists so that when we do start rewriting, we're working from one agreed picture and can't repeat the Sprint-3 drift (R-13).

---

## 1 · Canon — the authoritative set

These are the source of truth. Where any other document conflicts with these, **these win** and the other document is corrected.

| Artifact | Role | Status |
|---|---|---|
| **GuestIQ-Questionnaire-v4-PlainLanguage.md (v4.1)** | The instrument + build spec | Canon |
| **GuestIQ-Output-Spec (v0.1)** | The report-engine rules (5-gate pipeline, guardrails, skeleton) | Canon |
| **GuestIQ-GM-Priors-GoldMap (v0.3)** | The obviousness filter | Canon *(needs cleanup — §6)* |
| **GuestIQ-GM-Report.html** | The rendered reference report (illustrative) | Canon (reference) |
| **GuestIQ-FrontDesk-Value-Model (v0.3)** | The agent value layer — the fifth artifact, completing the second stakeholder | Canon (ours) |
| GuestIQ-Dev-Handoff.md | The pivot pass-along | Reference (not canon, but informative) |

---

## 2 · Superseded / retired (old-model documents)

These describe the dead product and must be explicitly marked superseded so no one builds from them:

- **hotel_questionnaire_all79.md** — the old 79-question instrument. Superseded by Questionnaire v4.1.
- **README__8_.txt** — old-model background (S3-16 enrichment against the old app). Mark superseded; it was never on the handoff's superseded list, which is itself a drift risk.
- The **9-panel management dashboard** concept wherever it appears (SRS FR-065–080, UC-03, the dashboard spec drafted earlier this sprint) — superseded by the GM Findings Report.

---

## 3 · The four changes that drive every verdict below

Every verdict in §4 traces to one or more of these:

1. **Instrument change** — 79-question guest-expectations survey (Amateur/Professional/Expert) → **v4.1 projection instrument** (CORE/PRO/EXPERT, L1/L2 routing, ~6 segment batteries, observer/kano/text response types, follow-up tags, grounding).
2. **Output change** — 9-panel management dashboard (distributions) → **GM Findings Report** (5-gate pipeline, gold-map filter, findings-not-recommendations, in-house-only).
3. **Data-model change** — old session/response schema → **pseudonymous stable `respondent_id`**, persona-based, L1/L2, follow-up values, free-text examples, distinct-respondent counting, and **finding→reads lineage**.
4. **New stakeholder layer** — the **agent value model** (coverage map, convergence reveal, finding-loop, expertise portfolio). Net-new; *no current document covers it at all.*

---

## 4 · Impact table — every governing document

**Verdicts:** `REWRITE` (describes the dead product; full rewrite) · `AMEND` (mostly survives; targeted changes) · `RETIRE` (superseded; archive) · `OK` (no change) · `HISTORICAL` (frozen Sprint-3 record).

### Requirements (the spine — heaviest impact)

| Document | Currently describes | Verdict | What changes / why | Stage |
|---|---|---|---|---|
| **srs_functional_requirements_v20** | 79Q instrument FRs + dashboard FR-065–080 | **REWRITE** | Replace instrument FRs with v4.1; retire dashboard FRs, replace with report-engine FRs; add the entire agent-value-layer FR set (changes 1,2,3,4). The single biggest job. | 1a |
| **srs_nonfunctional_requirements_v12** | Perf, privacy, dashboard NFRs | **AMEND** | Drop dashboard NFRs (NFR-004/013); keep/refresh perf & privacy; add report-generation perf, the anonymity-promise NFR, pseudonymity (changes 2,3,4). | 1a |
| **use_case_specifications_v20** | Capture UCs + UC-03 manager dashboard | **REWRITE** | UC-03 → "GM reads findings report"; capture UCs → projection model; new UC(s) for the agent value journey (changes 1,2,4). | 1a |
| **jtbd_statements** | GM + agent + researcher jobs | **AMEND** | GM job → findings not dashboard; agent job → adopt v0.3; sharpen the buyer persona (changes 2,4). | 1a |
| **north_star_metric** | Completion-rate NSM | **REWRITE/RECONSIDER** | Decide: stay on completion %, or move to "non-obvious findings delivered." Flagged since the pivot (change 2). | 1a |

### Instrument & content

| Document | Currently describes | Verdict | What changes / why | Stage |
|---|---|---|---|---|
| **hotel_questionnaire_all79** | The old 79-question instrument | **RETIRE** | Superseded by v4.1 (change 1). | 0 |
| **questionnaire_js_data_structure_v10** | Data structure for the 79Q | **REWRITE** | New v4.1 structure: tiers, L1/L2, batteries, response types, follow-up tags (changes 1,3). | 1a |
| **branching_logic_specification_v10** | 84-path branching for the 79Q | **REWRITE** | v4.1 routing is L1/L2 + segment batteries — a different model; the 84-path matrix no longer applies (change 1). | 1b |
| **content_management_strategy_v10** | JSON content extraction for old content | **AMEND** | Content is now v4.1; the Strangler-Fig approach mostly holds, the content does not (change 1). | 1b |

### Data & architecture

| Document | Currently describes | Verdict | What changes / why | Stage |
|---|---|---|---|---|
| **entity_relationship_diagram_v10** | Old session/response schema | **REWRITE** | Pseudonymous stable `respondent_id`, persona/segment, follow-up values, free-text, finding→reads lineage (change 3). | 1a |
| **api_specification_v10** | Old endpoints | **REWRITE/AMEND** | Follows the new schema + the report engine (changes 2,3). | 1b |
| **data_flow_diagram_v10** | Capture → Supabase → dashboard | **AMEND** | New flow: capture → pipeline → report; + agent surfaces (changes 2,3,4). | 1b |
| **application_state_diagram_v10** | Old app states | **AMEND** | New flow: hook → guest select → instrument → reveal → coverage (changes 1,4). | 1b |
| **information_architecture_diagram_v10** | IA incl. dashboard | **AMEND** | No dashboard; add report + agent surfaces (changes 2,4). | 1b |
| **system_architecture_document_v10** | React/Vite/Supabase + dashboard | **AMEND** | Plumbing survives; report engine is new; dashboard removed (change 2). | 1b |
| **production_readiness_architecture_v10** | Infra/readiness | **AMEND** | Mostly survives; refresh for report engine + pilot (change 2). | 1c |
| **observability_analytics_specification_v10** | PostHog/Sentry events for old flow | **AMEND** | New events for the new flow + agent surfaces (changes 1,4). | 1b |

### UI & design

| Document | Currently describes | Verdict | What changes / why | Stage |
|---|---|---|---|---|
| **ui_ux_wireframes_v10** | Old instrument + dashboard | **REWRITE** | v4.1 screens, agent surfaces (coverage map, reveal), the report (changes 1,2,4). | 1b |
| **visual_design_system_v10** | Design tokens/components | **OK / light AMEND** | Tokens survive; add components for new surfaces. | 1c |
| **visual_identity_design_system_v10** | Brand/identity | **OK** | Unaffected by the pivot. | — |
| **eslint_prettier_config_v10** | Lint/format config | **OK** | Unaffected. | — |

### Governance, process & plan

| Document | Currently describes | Verdict | What changes / why | Stage |
|---|---|---|---|---|
| **project_charter_v21** | Scope, objectives, success criteria | **AMEND** | Value proposition, scope, and success criteria shifted with the pivot; log the formal scope change here (changes 2,4). | 0 |
| **master_development_timeline_v50** | Sprint plan | **REWRITE** | Sprints 4+ are a different build (two tracks); replan (changes 1,2,4). | 2 |
| **product_backlog_v31** | Old-product backlog | **REWRITE** | Restate around v4.1 + report engine + agent layer; every story re-passes DoR v1.2 (changes 1,2,4). | 2 |
| **risk_register_v1.2** *(we built)* | 15 risks | **AMEND** | Content pass for old-model references; add new risks (simulation-only validation; agent value unproven in field; pseudonymity/IRB) (changes 2,4). | 1c |
| **definition_done_ready_v1.2** *(we built)* | DoD/DoR | **AMEND** | Retire the S4 dashboard supplementary criteria; add report-engine + agent-surface criteria (change 2). | 1c |
| **guestiq_methodology_document_v11** | Scrum framework | **OK / light AMEND** | Process survives; refresh the artifacts list. | 1c |
| **raci_matrix_v11** | Roles/responsibilities | **OK / light AMEND** | Mostly survives; refresh for new deliverables. | 1c |
| **stakeholder_register_v11** | Stakeholders | **OK / light AMEND** | Same actors; sharpen the GM buyer persona. | 1c |
| **test_plan_v10** | 84-path + dashboard tests | **REWRITE/AMEND** | New: v4.1 routing tests, pipeline/gate tests, report tests, agent-surface tests (changes 1,2,4). | 1b |

### Sprint-3 records (frozen)

| Document | Verdict | Note |
|---|---|---|
| sprint3_backlog_v10 · sprint3_backlog_refinement_question_ux | **HISTORICAL** | Sprint 3 is closed; leave as record. |
| S3-15-Close-Out-Memo · S3-15-mobile-test-protocol · S3-Gate-Verification · S3-Deferrals-WontDo-Memo · S3-Retrospective | **HISTORICAL** | Frozen close-out records; no change. |

---

## 5 · New requirements with no current home

These exist in canon but in **no** governing doc yet — Stage 1 must *create* a home for them, not just edit:

- **The entire agent value layer** — coverage map (two views, status bands), convergence reveal (small-N bands), finding-loop (Option C), expertise portfolio. Needs an FR set in the SRS, UC(s), wireframes, and events.
- **Finding→reads lineage** — required so the finding-loop can be truthful. ERD + report-engine requirement.
- **Pseudonymous `respondent_id`** — required to back the anonymity promise. ERD + NFR.
- **The honest anonymity promise** (the exact §8 wording) — an NFR/UX requirement, and the first-run copy.

---

## 6 · Loose ends — resolved here

- **Gold-map residual language** — v0.3 still contains "Action: add…" (Topic 6) and "the reallocation case" (Topic 8), which the Output-Spec now bans. **Resolution:** a small cleanup pass to align the gold map to its own findings-only rule. (Stage 1a, alongside requirements.)
- **README__8_.txt** — old-model, not on the handoff's superseded list. **Resolution:** mark superseded (done in §2).
- **North Star Metric** — completion-% no longer matches the value proposition (non-obvious findings delivered). **Resolution:** reconsider as part of the NSM rewrite (§4, Stage 1a). Recommendation to weigh: a primary NSM tied to *findings delivered* with completion rate as a *health metric*.

---

## 7 · Recommended sequence

**Stage 0 — Declare & frame (now, ~half a day).** Adopt this map: ratify canon (§1), mark superseded (§2), and log the scope change in the Charter. Unblocks everything.

**Stage 1 — Reconcile (the R-13 gate, before any build):**
- **1a — the spine:** SRS-FR, SRS-NFR, Use Cases, ERD, questionnaire data structure, NSM, JTBD + the gold-map cleanup. *Everything downstream depends on these.*
- **1b — dependent specs:** branching logic, API, DFD, app-state, IA, system arch, observability, wireframes, test plan, content strategy.
- **1c — light amends:** Charter, Risk v1.2 content pass + new risks, DoD v1.2, methodology, RACI, stakeholder register, design system, production readiness.

**Stage 2 — Replan:** Product Backlog rewrite + Master Development Timeline rewrite (the new build plan).

**Then:** Stage 3 build (two tracks) → Stage 4 pilot.

**Parallel track — start now:** the **IRB exemption (Scenario B)**. External clock, gates the pilot, independent of all the above. Kick it off so it isn't the Sprint-5 bottleneck.

---

## 8 · The scope, honestly

- **Rewrite (heavy):** SRS-FR · Use Cases · ERD · questionnaire data structure · branching logic · wireframes · Product Backlog · MDT · test plan · NSM — **~10 documents.**
- **Amend (targeted):** SRS-NFR · JTBD · API · DFD · app-state · IA · system arch · observability · content strategy · Charter · Risk v1.2 · DoD v1.2 · methodology · RACI · stakeholder · prod readiness · design system — **~17 documents.**
- **Retire:** old 79Q instrument · README__8 — **2.**
- **OK / historical (no work):** identity design · eslint config · the Sprint-3 records — **~8.**

The big intellectual work is already done — this is reconciliation, not re-invention — but it is real, and the spine (Stage 1a) is where care matters most, because every build story will be written against it.

---

## 9 · Consolidation view — the leaner target

**Principle:** slim the **product-spec sprawl** (the eight separate architecture/data files are the worst of it), **keep the governance/process docs intact** (they are the value system and the traceability/IRB backbone — each earns its place), and **retire the dead-model docs.** Governance stays formal; the spec layer slims.

### 9.1 · The merges (safe — group genuinely related content)

| New consolidated doc | Absorbs | From → to |
|---|---|---|
| **SRS (v3.0)** | srs_functional_requirements + srs_nonfunctional_requirements + branching_logic_specification *(v4.1 routing is simple L1/L2 — no longer a standalone 84-path doc)* | 3 → 1 |
| **Product Value & North Star** | jtbd_statements + north_star_metric *(jobs + the metric of success belong together)* | 2 → 1 |
| **Stakeholders & RACI** | stakeholder_register + raci_matrix *(who + who-does-what)* | 2 → 1 |
| **System Architecture & Flows** | system_architecture + information_architecture_diagram + data_flow_diagram + application_state_diagram + production_readiness_architecture *(architectural views + ops, with embedded diagrams)* | 5 → 1 |
| **Data Model & API** | entity_relationship_diagram + api_specification + questionnaire_js_data_structure *(the data contracts the build references)* | 3 → 1 |
| **Design System** | visual_design_system + visual_identity_design_system *(two overlapping design-system docs)* | 2 → 1 |

### 9.2 · Retire

- **hotel_questionnaire_all79** (superseded by v4.1) · **README__8_.txt** (old-model). *(Already in §2.)*

### 9.3 · Optional further folds (your call on aggressiveness)

- **observability_analytics_specification** → fold into System Architecture & Flows, **or keep standalone** (it's build-/QA-critical and substantial — I lean toward keeping it).
- **content_management_strategy** → fold into the SRS or Architecture, **or retire** if it's thin post-pivot (its old Strangler-Fig content story is largely overtaken by v4.1).

### 9.4 · Keep standalone — untouched in structure (the governance/process spine + distinct deliverables)

Project Charter · Methodology · Master Development Timeline · Risk Register (v1.2) · Definition of Done + Ready (v1.2) · Product Backlog · Use Case Specifications · Test Plan · UI/UX Wireframes · ESLint/Prettier Config · IRB-Path-Decision.

### 9.5 · The leaner target set

| Group | Documents |
|---|---|
| **Governance / process (8)** | Charter · Methodology · Stakeholders & RACI · Master Development Timeline · Risk Register · Definition of Done + Ready · Product Backlog · IRB-Path-Decision |
| **Requirements (4)** | SRS · Use Case Specifications · Product Value & North Star · Test Plan |
| **Architecture / data (3)** | System Architecture & Flows · Data Model & API · Observability *(if kept)* |
| **UI / design (3)** | UI/UX Wireframes · Design System · ESLint/Prettier Config |
| **Canon (5)** | Questionnaire v4.1 · Output-Spec · Gold Map · GM-Report · Front-Desk Value Model |

**Count: ~31 governing docs → ~18** (≈17 if the two optional folds are taken). Plus the 5 canon and the frozen Sprint-3 records. **Roughly halves the spec surface** while keeping the governance spine and full traceability.

### 9.6 · The one discipline when merging

Each merged doc carries forward its source docs' **still-valid decisions and their artifact-ID / version lineage** in its own history ("supersedes S0-x, S1-y, S1-z"). The file count drops; the **traceability does not** — which is what protects the research-grade auditability you run the project on. Before any source doc is retired, its live decisions are mined into the merged doc (the §4 OK/AMEND verdicts are that extraction list).

### 9.7 · How aggressive to go — recommendation

Take the **six merges in §9.1 + the retirements** (≈31 → 18). Hold the two optional folds in §9.3 unless you want maximum lean. This roughly halves the spec surface, keeps every governance/process and traceability doc, and concentrates the rewrite effort where it was always going to be — the SRS spine.

---

*GuestIQ · Reconciliation Impact Map · v0.2 · DRAFT for Lead Researcher approval · The map, not the rewrite*
