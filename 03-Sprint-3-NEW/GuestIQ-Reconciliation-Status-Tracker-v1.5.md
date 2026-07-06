# GuestIQ — Reconciliation Status Tracker (v1.1)

| | |
|---|---|
| **Document** | GuestIQ-Reconciliation-Status-Tracker — v1.1 |
| **Purpose** | The authoritative, drift-proof state of **every** target document — so nothing is "reconciled separately" and quietly forgotten. |
| **Authoritative plan** | Reconciliation Impact Map v0.2 |
| **Prepared By** | Claude (AI Developer), at the Lead Researcher's prompt |
| **Changed in v1.1** | Closes the **no-third-party-AI pivot + consistency sweep**. Records new **canon** (Questionnaire v4.2 · GoldMap v0.4 · Output-Spec v0.2 · Architecture v1.1). Marks the three gap docs **done** (Test Plan, System Architecture & Flows, IRB-Path-Decision) and logs the patches applied to already-reconciled docs (SRS, Data Model, Use Cases, Researcher Value Model). |

**Legend:** ✅ Done · ⏳ pending · ⛔ gap (was missing from the plan) · ➖ no change needed

---

## Canon (current) — the single source of truth
| Artifact | Version | Note |
|---|---|---|
| **Questionnaire** | **v4.2** | text→structured, **gold-tagged**, CF-sink, +crew/VIP personas |
| **GM Priors & Gold Map** | **v0.4** | +crew (conditional) +VIP (discretion contradiction); the obviousness filter |
| **Output / Report-Engine Spec** | **v0.2** | tag-driven, deterministic, count-or-quote, CF-sink suppression |
| **System Architecture & Flows** | **v1.1** | pure client + Supabase, **no Edge Functions**, compute-on-open, RosaeNLG local |
| Product Value & North Star | v1.0 | unchanged |

> **The pivot in one line:** **no third-party AI anywhere.** Agent story = **RosaeNLG** (local); free-text = **count-or-quote** (structured counts + verbatim quotes, never coded); report engine = **deterministic, computed on-open** in the browser.

---

## New value / design artifacts (this session)
| Artifact | Status |
|---|---|
| Front-Desk Agent Value Model | ✅ v0.5 |
| **Researcher Value Model** (the third stakeholder) | ✅ v0.2 *(swept — Option B retired → count-or-quote)* |
| Agent & GM Experience Spec | ✅ v1.0 |
| End-of-Read Design LOCKED | ✅ v1.0 |
| GM Report Access LOCKED | ✅ v1.0 |
| Scope Decision — Finding-Loop & Return | ✅ v1.0 |
| Badge uniqueness & re-entry | ✅ (in SRS FR-AGT-01/02 + Data Model) |

## Requirements (4)
| Doc | Plan | Status |
|---|---|---|
| SRS | rewrite | ✅ v3.1 **+ swept + audit-verified** (FR-RPT tag-driven/deterministic, FR-AGT-10 RosaeNLG **not Claude API**, FR-INST v4.2 + 9 personas, new NFR set; Value-Model refs repointed v0.3→v0.5; H1 heading fixed) |
| Use Case Specifications | rewrite | ✅ v3.1 **+ swept + audit-verified** (UC-04 deterministic, no coding; H1 heading fixed v3.0→v3.1) |
| Product Value & North Star | merge JTBD + NSM | ✅ v1.0 |
| **JTBD Statements (S0-0.3)** | reconcile + make single source of truth | ✅ **v2.0 — full rewrite** to projection/no-AI; promoted to **SSOT** (A1/A2/A3); Charter §13 + Methodology §7.1 now reference it by ID instead of restating. A1 dashboard→GM report/findings; A2 gamified-episodic/79Q/taxonomy/dual-tense/NFR-043-045→projection/gold-map/deterministic/RosaeNLG/sim-validation/SRS v3.1 NFRs; A3 tiers/results-screen/curiosity-hooks/badges-as-points→badge identity/end-of-read/coverage/depth fork, no gamification |
| **Test Plan** | rewrite | ✅ **v2.0 + swept + audit-verified** *(AI-coder test dropped; deterministic/tag-grading tests; changelog v4.1→v4.2 routing fixed)* |

## Architecture / data (3)
| Doc | Plan | Status |
|---|---|---|
| Data Model & API | merge | ✅ v1.2 **+ swept + audit-verified** (gold_tag/cf_sink, 9 personas, derive-on-open; filename + footer corrected v1.0→v1.2) |
| Observability & Analytics | amend → rewrite | ✅ v2.0 |
| **System Architecture & Flows** | merge + amend | ✅ **v1.1** *(was the gap — now done; Option A: pure client + Supabase, no Edge Functions)* |

## Governance / process (8)
| Doc | Plan | Status |
|---|---|---|
| Project Charter | amend (log the scope change) | ✅ **v2.2 — full body reconciliation** (Purpose, Objectives, Scope In/Out, Success Criteria, Risks→v1.2, Constraints, Tech Stack +RosaeNLG, Definition of Success, Methodology/JTBD, Stakeholders, Timeline all rewritten to the projection/no-AI model) |
| Methodology | light amend | ✅ **v1.2 — full reconciliation** — F-04 academic→projection/gold-map; F-05 BDD→v4.2 routing + report-engine integrity; **F-06 PLG fully reframed** (engagement loop→value layer, aha→end-of-read, tiers→CORE/PRO/EXPERT, metrics→read/depth/coverage, no gamification); §5 examples, §7 JTBD/NSM, §9 register, §10 rules, §11 NFRs all updated |
| Stakeholders & RACI | merge + light amend (+researcher) | ✅ **RACI v1.2 + Stakeholder Register v1.2 — both fully reconciled.** Dead-model build activities/profiles replaced; **SH-01 clarified as GM/report-consumer** (dashboard→GM report PIN); **SH-02 gains judge/Console role**; SH-03 results-screen/tiers→end-of-read/value layer; SH-04 epics→report engine/Console (dashboard/content-mgmt retired); both embedded + standalone RACIs de-staled; researcher integrity/validation activities added |
| Risk Register | amend + new risks | ✅ **v1.2** — R-09 (gamification) retired; R-02 updated (84-path→v4.2); **+R-13 drift · R-14 report-engine integrity · R-15 RosaeNLG · R-16 simulation-only** |
| Definition of Done + Ready | amend (retire dashboard criteria) | ✅ **v1.2** — S4 Management Dashboard retired → **GM Report & Console + report-engine** DoD; S1/S3 to v4.2; 84-path/Module-5/tense/79Q/Strangler-Fig removed; sprint-gate table de-staled (subject to MDT replan) |
| Product Backlog | rewrite | ⏳ pending (Stage 2) |
| Master Development Timeline | rewrite | ⏳ pending (Stage 2) |
| **IRB-Path-Decision** | confirm against final anonymity model | ✅ **v1.1** *(was the gap — now done; no-processor strengthens exemption)* |

## UI / design (3)
| Doc | Plan | Status |
|---|---|---|
| **UI/UX Wireframes** | rewrite | ⏳ **deferred to the dedicated design-artifact session** — the session's HTML mockups are **temporary concept-visualization aids only**, not wireframes; no UI design is settled |
| Design System | merge (two design docs) | ✅ **Reconcile Decision v1.0 — RETIRE + DEFER** (not a fake amend). Old-model visual system (tier colors #4ADE80/60A5FA/A78BFA, episode map, progress bar, curiosity hooks, 9 achievement badges, dashboard canvas, #0D0D12) **retired**; candidate palette/type (warm-midnight-lobby) shown in mockups is **NOT approved** — session ratifies or revisits it first; consolidated developer-ready **Design System v2.0 deferred to the design-artifact session**. Surviving discipline (Tailwind tokens, two-canvas → agent vs GM/Console, type-as-utilities) noted. |
| ESLint/Prettier Config | — | ➖ survives the pivot |

## Other
| Doc | Plan | Status |
|---|---|---|
| **Content Management Strategy** | fold into SRS/Arch **or retire** | ✅ **RETIRED** — pre-pivot content (79Q/episodes/tiers/Module 5/tense/dashboard) is dead; the surviving discipline (content-as-config + validator) is already canon in Architecture v1.1 §2 + Data Model §4 |

---

## Gaps — closed and open
**Closed this sweep:** ✅ Test Plan · ✅ System Architecture & Flows · ✅ IRB-Path-Decision.
**Still open:**
1. **UI/UX Wireframes** — **deferred to the dedicated design-artifact session** (mockups are temporary aids, not canon; real UI decided later, not here).
2. ~~Content Management Strategy~~ — ✅ **RETIRED** (discipline already canon in Architecture §2 + Data Model §4).

## Corrected order from here
1. **Light amends** — Charter (log the no-AI pivot) · Risk Register (+RosaeNLG, +simulation-only) · DoD/DoR · Stakeholders & RACI (+researcher) · Methodology · Design System.
2. **Stage 2** — Product Backlog rewrite · Master Development Timeline replan (Phase-2 bucket; new sprint shape; no Edge Functions; Observability v2.0 events).
3. **Later — dedicated design-artifact session** — UI/UX wireframes + design system decided properly there (mockups are throwaway references only).

---

---

## v1.2 update — design session + Stage 2 complete

**Design session — ✅ COMPLETE.** 12 surfaces approved (welcome · onboarding/badge-claim · guest-select · read · depth invitation · end-of-read · coverage wall · second-run · GM Findings Report · Researcher Console · downtime/config-error · badge visual system). Two canvases ratified (agent warm-midnight dark / admin light findings-dossier). Consolidated into **Design System v2.0** (retires `visual_design_system_v1.0`). Added **NFR-TONE-02** (plain-language/ESL) to SRS v3.1.

**Stage 2 — ✅ COMPLETE.**
| Deliverable | Status |
|---|---|
| **Product Backlog v4.0** | ✅ supersedes v3.1 — 51 active stories / 239 SP; per-story **owners** (AI / Lead Researcher / SM); killed branching+84-path / gamification / dashboard / third-party-AI / 79Q |
| **Master Development Timeline v6.0** | ✅ supersedes v5.0 — 7 scope-driven sprints, owner-coded steps, **click-by-click human instructions**, guardrail gates, no Edge Functions |
| **Design System v2.0** | ✅ consolidates the design session; developer-ready single reference |

**Sanity sweep (designs ↔ canon) — actions taken:**
- ✅ Value Model v0.5 — dropped the *just-yours toggle* (matches the design decision); "fully anonymous" → **honest "anonymous by construction"** wording (×2).
- ✅ SRS inline "v4.1" citations — **no action**: line 56 already declares they read as v4.2 (documented convention).
- ✅ **RESOLVED — Researcher Console lens set.** Console v3 aligned to the canonical six (Researcher-Value-Model v0.2): **Integrity · Validation · Agent Activity · App Health · GM Activity · Iteration**. Coverage/convergence folded under Integrity; a dedicated **Validation lens** (North-Star GM-reaction capture: non-obvious? / would act?) added; value-model reference repointed v2 → v3.
- ◦ Minor (noted, non-blocking): grounding folded into Q1 vs FR-INST-02 "with guest selection"; "Alright, Fox" grounding line predates the removed grounding screen.

---

## v1.3 update — Sprint 1 CLOSE-OUT

**Sprint 1 goal:** the app deploys, the instrument loads from config, and writes are anonymous-safe by construction. **Verdict: goal met.**

### Review — story status
| Story | Status |
|---|---|
| US-2.1 v4.2 schema · US-2.2 RLS · US-2.3 PWA shell · US-2.4 deploy pipeline | ✅ done |
| US-3.1 instrument data model · US-3.2 gold-tags/CF-sink/CREW-4 · US-3.4 content→JSON | ✅ done |
| US-2.6 no-Edge conformance | 🟡 held by construction; formal verification note outstanding |
| US-3.3 GoldMap priors | 🟡 tag→GoldMap linkage in the instrument; standalone priors dataset belongs with the engine (S4) |
| **US-2.5 offline queue + sync** | ⏭️ **MOVED to Sprint 2** (nothing to queue until the read flow exists) |

Delivered ~32 of 42 SP (7/10 stories fully done, 2 partial, 1 deferred). Live at `https://valkhot.github.io/guestiq/` (shell confirmed loading). Repo `valkhot/guestiq`, public. Real artifacts: `supabase/migrations/01-schema.sql · 02-rls.sql · 03-seed-badges.sql`, PWA shell, `.github/workflows/deploy.yml`, PWA icons, `src/data/instrument.v4.2.json` (67 questions · 340 gold tags · 11 CF-sinks · CREW-4 gate).

### Retrospective — lessons → standing rules
Went well: decision-then-build rhythm (no rework), honest scoping (deferrals not misses), small labelled commits, generator-built instrument (no transcription errors).
Bumpy: stray `postcss.config.js` (Tailwind error), missing `import React`, GitHub Pages deploy flakiness (final status-check reports failure though it publishes).
**Standing operating rules (now in force):** (1) complete files only — full copy-paste replacements, never partial edits; (2) file ops in **Windows Explorer** terms (copy to folder / replace / create folder / rename) — not VS Code; (3) commit blocks always begin `cd "C:\GuestIQ Research Project"`; (4) every file placement states exact folder, filename, new-vs-replace; (5) pre-check for stray/conflicting files before handing over code; (6) treat a red deploy as "verify the live site first."

### Carry-forward action items
- **AI-DEPLOY-RETRY** — if the Pages deploy hiccup recurs, add a retry to `deploy.yml` (one-file replacement ready on request).
- **US-2.6** — produce the short no-Edge conformance note (fold into an S2/S3 gate).
- **US-2.5** — offline queue built in Sprint 2 alongside the read flow.

## Project state
Sprint 1 closed (goal met). Next: **Sprint 2 planning** — the agent read flow (UC-01), where the instrument becomes an on-screen questionnaire. Backlog updated to reflect S1 actuals + the US-2.5 move.

---

---

## v1.4 update — DESKTOP-PRIMARY correction (global)

**Correction from the decision-maker:** most GuestIQ agent reads happen on **Windows desktop monitors**; laptops, iPads, and phones are the minority. This **supersedes the earlier "mobile-first / real-iPad-primary" assumption** across the project.

**New rule (global):** *design and optimise every surface for Windows desktop monitors first; degrade gracefully to laptop, iPad, and phone without loss of function.*

**Applied to canon:**
- **SRS v3.1** — added **NFR-UX-01 (Desktop-primary, responsive)**; updated NFR-PERF-02 wording.
- **Design System v2.0** — §10 now leads with desktop-primary; touch/iPad demoted to a secondary check.
- **Sprint 2 Plan** — sprint goal + gate + tests flipped to desktop-primary (iPad/phone = secondary reflow check).
- **MDT v6.0** — standing rule + S2-9 check flipped to desktop-primary.
- Applies to **all 12 approved mockups** as a proportion re-reading (content/structure still valid) and **every future screen**.

*Not desktop-only:* the minority devices still must work — responsive degradation is required, just no longer the primary optimisation target.

---

## v1.5 update — Sprint 2 CLOSE-OUT

**Sprint 2 goal:** an agent completes a full read on desktop (welcome → badge → guest-select → all question types → depth fork), anonymous & complete, tags never shown. **Verdict: gate met.**

### Review — story status
| Story | Status |
|---|---|
| US-4.1 Welcome · US-4.2 Badge claim + re-entry · US-4.3 Guest-select | ✅ done |
| US-4.4 Read shell · US-4.6 renderers (single/observer/multi/kano/scale5) | ✅ done |
| US-4.5 Count-or-quote free-text · US-4.7 Depth fork · US-4.10 Capture integrity | ✅ done |
| Capture-complete (completed_at + depth) | ✅ done (after RLS UPDATE-grant fix) |
| **US-2.5 offline queue + sync** | ⏭️ still deferred (S2 stretch → S3/later) |

~8/9 stories done. Live: full anonymous read, all 6 question types, Continue + own-words, depth fork, completion, de-duplicated responses (deterministic ids). Desktop-first, luxury craft pass (struck-seal coins, metal button, brass-thread motif, motion). Real files under src/ (screens: Welcome/BadgeClaim/GuestSelect/ReadScreen/QuestionBody; lib: supabase/readFlow; components: Coin; data: instrument.v4.2.json, animalArt.js). DB fixes: S2-fix-reads-update-grant.sql.

### Retrospective — lessons → standing rules
Went well: A–E increment split (48 SP stayed testable), deterministic ids (re-read + response de-dup), debugging live against real Supabase data.
Bumpy → **new standing rules:** (7) **consult the approved mockup before implementing a surface** (auto-advance vs the design's Continue button cost a rebuild); (8) **check the error on every Supabase write** (completion was a silent 0-row no-op — missing anon UPDATE grant); (9) **RLS here is insert-first** — update/upsert need explicit grants + permissive policies. Reinforced: desktop-primary (mobile-first port pushed content below the fold; fixed with fluid clamp sizing + 2-col options).

### Carry-forward
- **US-2.5 offline queue** — still pending (build with/after coverage).
- **scale5 item** — dropped from the generated instrument; deferred per decision (b).
- **AI-DEPLOY-RETRY** — applied in S2 (deploy.yml retry); watch it holds.

## Project state
Sprint 2 closed (gate met) — the agent read CAPTURES and COMPLETES. Next: **Sprint 3** — the read's PAYOFF half (five-beat end-of-read: dossier + on-device story + constellation), the **coverage wall** (where already-read personas get marked), and observability.

---

*GuestIQ · Reconciliation Status Tracker · v1.5 · Sprint 2 closed (gate met) · Canon = Questionnaire v4.2 · GoldMap v0.4 · Backlog v4.0 · MDT v6.0 · Design System v2.0 · SRS v3.1 (+NFR-UX-01)*
