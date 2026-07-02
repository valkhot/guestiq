# GuestIQ — Content Management Strategy: Retire Decision (v1.0)

| | |
|---|---|
| **Document** | GuestIQ-ContentMgmt-Retire-Decision — v1.0 (Stage 1 reconciliation) |
| **Subject** | content_management_strategy v1.0 (S0-3.5, ~320 lines) |
| **Decision** | **RETIRE.** The document is **superseded**, not folded into a new artifact — because its one surviving principle is **already canon** elsewhere. |
| **Prepared By** | Claude (AI Developer), at the Lead Researcher's prompt |

---

## Why retire (not fold)

The document is ~95% **pre-pivot model content** that no longer exists:
- 79 questions / Q0–Q79, the **13-field question object**, `single_select/multi_select/scale` only
- **7 episodes**, the **amateur/professional/expert** tiers, **Module 5** routing + **12 taxonomy codes**
- the **retrospective/anticipatory tense frame**, the **management dashboard**, the **`/admin` CMS**, taxonomy→dashboard mappings

All of that is dead (replaced by Questionnaire v4.2's 9 personas, CORE/PRO/EXPERT depth, gold-tagged structured options, the deterministic engine, the removed dashboard). Reconciling the doc line-by-line would be rewriting a corpse.

## The one thing worth keeping — and it's already canon

The document's *durable* contribution is a **discipline**, not content:
- **Content-as-config, never hardcoded** → already canon in **Architecture v1.1 §2** (inviolable discipline #2: "no hardcoded content strings"; all content via service files) and **Data Model §4** ("the instrument is represented as **config**, not hard-coded… data-driven").
- **A configuration validator** → already canon in **Data Model §4** ("a configuration validator shall reject malformed config on load… before any respondent-facing content renders").
- **Version-controlled content** (Git-deployed config) → implied by the static + Supabase-migrations model (Architecture v1.1).

So **folding is already done.** There is no orphaned principle needing a new home — the live parts were absorbed during the sweep.

## What is deliberately dropped

- **The Strangler Fig ceremony** (Phase 1a hardcoded → 1b extract-to-JSON → Phase 2 DB CMS). Its rationale ("don't add a JSON layer during the hardest Sprint 2") was tied to the old build plan. At **pilot scale**, content is simply **config (JSON) from the start** (Data Model §4) — the "start hardcoded, then extract and re-verify" two-step buys nothing and is removed. *(If the build team still prefers to start hardcoded, that's a build-sequencing choice, not a governance artifact.)*

## One deferred item (Phase-2, recorded so it isn't lost)

A **visual content editor** for non-developers to edit the instrument without Git (the old "`/admin` CMS"). The `/admin` dashboard was removed in the pivot, and at pilot scale editing JSON config is fine — so a visual editor is a **Phase-2 nice-to-have**, not pilot scope. Recorded here so the idea survives retirement.

## Effect

- `content_management_strategy v1.0` → **RETIRED / superseded.** Not carried into the reconciled doc set.
- No new content-management doc is created; the discipline lives in Architecture v1.1 §2 + Data Model §4.
- Closes the **"Content Management Strategy — decision not made"** tracker gap.

---

*GuestIQ · Content Management Strategy: Retire Decision · The discipline survives in Architecture §2 + Data Model §4; the pre-pivot content does not*
