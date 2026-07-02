# GuestIQ — Design System: Reconciliation Decision (v1.0)

| | |
|---|---|
| **Document** | GuestIQ-DesignSystem-Reconcile-Decision — v1.0 (DRAFT · for Lead Researcher review) |
| **Decision** | **RETIRE** the old-model Visual Design System (visual_design_system_v10) · **SURFACE** a candidate visual direction from the mockups (NOT approved — the session ratifies it) · **DEFER** the consolidated developer-ready Design System to the dedicated design-artifact session |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Affects** | visual_design_system_v10 (S1-3.4) · Visual Identity Document v1.0 (S0-3.1, its locked source) |
| **Implements (canon)** | Front-Desk Value Model v0.5 · End-of-Read Design LOCKED v1.0 · GM Report Access LOCKED v1.0 · Architecture v1.1 |
| **References** | Reconciliation Status Tracker v1.1 · ContentMgmt Retire Decision v1.0 (the analogous precedent) · Charter v2.2 |
| **Status** | DRAFT — PENDING REVIEW by Lead Researcher |
| **Prepared By** | Claude (AI Developer) |
| **Date** | Reconciliation Stage 1 |
| **Drift rule** | This decision states *status and direction*; it does not invent visual values. New tokens, components, and badge art are produced in the design session, not here. |

---

## 1 · The decision in one line

The pre-pivot **Visual Design System (v1.0)** is **superseded** — its design language is built entirely on retired concepts. A **candidate visual direction** (warm-midnight-lobby) has been *shown* in the locked-design mockups, but — per the standing agreement that **mockups showcase the idea, not design decisions** — it is **not an approved design language**. The **consolidated, developer-ready Design System** is **deferred to the dedicated design-artifact session**, which **ratifies (or revisits) the visual language as its first decision**.

This mirrors two decisions already taken: **UI/UX Wireframes — deferred** to the design session, and **Content Management Strategy — retired** because its surviving discipline already lives in canon. The Design System is the visual analogue of both.

## 2 · Why a token-by-token "reconciliation" would be wrong

The old Design System is not lightly stale — it is a different design language. Its load-bearing elements are all retired:

| Old Design System element (v1.0) | Status under the pivot |
|---|---|
| **Tier primary colors** — Amateur `#4ADE80` · Professional `#60A5FA` · Expert `#A78BFA` | **RETIRED** — there are no visual tiers. Depth is CORE/PRO/EXPERT, not a colored brand tier. |
| **Tier card component anatomy** (§4) | **RETIRED** — no tier-selection screen (badge claim + guest select replace it). |
| **Progress bar + episode map** (§5) | **RETIRED** — no episodes; the coverage wall replaces the map; no game-progress. |
| **Episode visual identity + accent colors + curiosity-hook screen** (§6) | **RETIRED** — no episodes, no curiosity hooks. |
| **9 SVG *achievement* badges** (§7) | **RETIRED** — the new **badge** is an *identity* (animal+colour), not an earned achievement; different concept and art. |
| **Dashboard canvas + Dashboard tokens + intent-category colour map** (§2, §8) | **RETIRED** — no management dashboard; replaced by the GM Findings Report + Researcher Console. |
| **Base palette** `#0D0D12` dark canvas | **SUPERSEDED** — replaced by the warm-midnight-lobby palette (§4 below). |

Rewriting these to new values would be **inventing the new visual system** — choosing badge art, depth-fork treatment, coverage-wall design, report typography — which is exactly the work scoped to the deferred design session. This decision does not do that.

## 3 · What carries forward (method and discipline, not values)

A few *non-visual* disciplines from the old doc remain valid and should be carried into the new Design System when it is produced:

- **Design-tokens-via-Tailwind config** — the approach (a single `tailwind.config.js` token source; components read tokens, never hardcode hex) is sound and survives. Only the *values* change.
- **Typography scale as custom utilities** — the method survives; the *typefaces* change to **Fraunces / Spectral / Space Mono** (§4).
- **The two-canvas enforcement principle** — reframed: the old split was *respondent canvas vs management-dashboard canvas*; the new split is **agent canvas (the read + value layer) vs the GM-report / Researcher-Console canvas**. The principle — the report/Console surface must never blend into or inherit from the agent canvas — holds, and is a useful guardrail for the new system.
- **A locked-source discipline** — the old doc locked values from a Visual Identity Document. The new system should likewise have a single locked visual source (the design session's output) that the developer-ready spec translates.

## 4 · The candidate visual direction (shown in mockups — NOT approved)

A visual language has been *shown* across the locked-design mockups, but it is a **candidate the design session must ratify or revisit** — **not** an approved design decision. Per the standing agreement, **mockups showcase the idea, not the design**, so the palette/type below carries **no decision weight**. Recorded here only so the session has a concrete starting point:

- **Palette — warm-midnight-lobby (candidate):** `--ink #16141D` · `--parchment #EFE7D6` · `--brass #C8A24E` (as used in the End-of-Read and GM-Report mockups).
- **Typefaces (candidate):** **Fraunces** (display), **Spectral** (body), **Space Mono** (data/labels) — introduced in the mockups; not in any approved source.
- **Tone (this *is* a constraint, from Value Model v0.5 §10):** a dignified *intelligence-dossier* aesthetic — **not gamified, not playful-juvenile**. The tone is a guardrail; the specific palette/type that delivers it is open.
- **What's genuinely locked (UX, not style):** the five-beat End-of-Read sequence and the GM access model — these are real decisions and are inputs, not topics.

The HTML mockups remain **temporary visualization aids — they showcase the idea, not design decisions** — consistent with the wireframe decision.

## 5 · What the design session owns (deferred scope)

Explicitly deferred — to be produced in the dedicated design-artifact session, then translated into a developer-ready Design System v2.0:

1. The consolidated **token system** (final warm-midnight palette tokens, spacing, radius, elevation) in `tailwind.config.js` form.
2. **Component anatomy** for the real surfaces: badge claim, guest-select + grounding, the read/answering screen (with v4.2 gold-tagged options), the five-beat end-of-read, the coverage wall (incl. completed-range), the depth-fork invitation, the GM Findings Report, and the Researcher Console.
3. The **identity badge** visual system (animal+colour set, claimed/locked/recognition states) — replacing the retired achievement-badge art.
4. **Two-canvas tokens** for agent vs GM-report/Console.
5. **Typography scale** utilities for Fraunces/Spectral/Space Mono.
6. The **real-iPad / iOS-Safari** visual QA pass (standing lesson: emulation is insufficient).

## 6 · Net effect

- **visual_design_system_v10 (S1-3.4)** → **RETIRED / SUPERSEDED.** Retained for lineage only; not a build contract.
- **No new visual values invented in this reconciliation** (correct — that work is deferred).
- **Current direction** = the locked design docs (warm-midnight-lobby), referenced by ID.
- **New Design System v2.0** = a **deferred** deliverable of the design-artifact session.
- The Design System line on the Reconciliation Status Tracker is now resolved: **decision recorded, not a fake amend.**

---

**— END OF DESIGN SYSTEM RECONCILIATION DECISION v1.0 —**

*GuestIQ · Design System Reconcile Decision v1.0 · Retire old-model visual system · Defer consolidated system to the design session · Candidate visual direction shown in mockups — NOT approved; session ratifies it*
