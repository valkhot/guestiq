# GuestIQ — Sprint 4 Plan

| | |
|---|---|
| **Sprint** | S4 · The Findings Engine |
| **Anchor** | Backlog v4.0 (E6) · MDT v6.0 §Sprint 4 · GoldMap v0.4 · Output-Spec v0.2 · Questionnaire v4.2 (gold tags) |
| **Builds on** | S1–S3 — reads captured, completed, anonymous; the instrument's gold tags in place |

---

## 1 · Sprint goal

**Turn the pile of anonymous reads into trustworthy findings — deterministically, on-open, with no third-party AI.** The engine reads what agents recorded, applies the gold-tag synthesis (blind-spots, contradictions, mis-weights), suppresses table-stakes (CF-sink), aggregates as **counts-or-quotes (never percentages, never names)**, and only surfaces a finding once it clears the **convergence floor** (enough independent reps agreeing). Output: a clean findings data structure ready for the GM report (Sprint 5).

By the end of S4, we can point the engine at the real reads and see **honest, gated findings** — the thing GuestIQ exists to produce.

---

## 2 · The one architectural decision (need your steer)

**How does the engine read the data to compute findings, without breaking anonymity?**
The engine needs to see *all* completed responses to count them — but the anon key is deliberately insert-only (no row reads), which is what protects anonymity. Same tension we solved for the constellation, one level up. Options:

- **A1 (recommended) — an aggregate *findings-data* function.** A `SECURITY DEFINER` function returns, per persona: the **reps count**, the **count of each chosen option** (persona → item → option → count), and a **pool of verbatim quotes** (the free-text). It returns **counts and quotes only — never raw rows, never who answered what.** The engine (client JS) then applies all the gold-tag logic on top. Anonymity is preserved *by construction* (counts leave, rows never do), the hard synthesis logic stays in readable JavaScript, and it matches the S3 pattern.
- **A2 — authenticated admin read.** The GM/researcher logs in and gets RLS read access to raw responses; the engine computes client-side from rows. More flexible (enables per-respondent correlation) but exposes raw rows to the admin session and needs the auth system now (which is really Sprint 5).

→ *My recommendation: **A1.** The gold tags are **option-level**, so the findings are fundamentally *count-based* — aggregate counts + quotes are enough for every finding type, including the VIP contradiction. A1 keeps anonymity airtight and defers admin-auth to where it belongs (S5).*

---

## 3 · The engine, in plain terms — the five gates

A raw answer becomes a *finding* only if it passes all five gates:

1. **Signal gate** — only **BS / BS+ / CON / MW** tagged answers can become findings. **CF** (expected/confirm) never does — it's just confirmation, not insight.
2. **CF-sink gate** — table-stakes answers (the "the usual — clean room / good Wi-Fi" options, tagged CF-sink) are **collected but suppressed** — never shown as a finding.
3. **Convergence gate** — a finding needs **≥ 3 independent reps** *and* a **majority** pointing the same way. One person's hunch is not a finding.
4. **Segment-existence gate** — a persona's findings only surface if that segment is *real* to this hotel. Explicit for crew via **CREW-4** (if crew "almost never," suppress all crew findings); generalised as a per-persona reps threshold.
5. **Anonymity gate** — **counts never become percentages, never names**; small-N results below the floor are withheld so nothing can single out a person or a guest.

Plus the one cross-item finding: **the VIP recognition-vs-discretion contradiction** (many say "discretion" yet react well to being fussed over) — detectable at the aggregate level.

---

## 4 · Sprint backlog

| Story | Owner | SP |
|---|---|---|
| US-6.1 · Aggregate findings-data function (counts + quotes, anonymity-safe) | AI | 8 |
| US-6.2 · Tag synthesis (BS/BS+/CON/MW → findings) | AI | 8 |
| US-6.3 · CF-sink suppression | AI | 3 |
| US-6.4 · Count-or-quote aggregation (counts never %/names) | AI | 5 |
| US-6.5 · Convergence floor (≥3 reps + majority) | AI | 5 |
| US-6.6 · Segment-existence gate (CREW-4 + per-persona threshold) | AI | 3 |
| US-6.7 · VIP recognition-vs-discretion contradiction | AI | 3 |
| US-6.8 · Compute-on-open + report_cache (deterministic recompute) | AI | 5 |
| US-6.9 · Engine validation preview (see the findings before the S5 report) | AI | 3 |
| | **Total** | **43** |

---

## 5 · Definition of Done — the S4 gate

- ✅ Pointed at the real reads, the engine produces a **findings structure** per persona.
- ✅ Only **BS/BS+/CON/MW** surface; **CF and CF-sink are suppressed**.
- ✅ Every finding carries a **count and (where present) verbatim quotes** — **no percentages, no names**.
- ✅ A finding appears **only** after **≥3 reps + majority**; below-floor findings are withheld (and shown as "still forming," not faked).
- ✅ **Crew findings suppressed** when CREW-4 says crew isn't a real segment; the **VIP contradiction** fires when the data shows it.
- ✅ **Deterministic** — same reads always give the same findings; recomputed on open (optionally cached).
- ✅ Anonymity intact — the engine only ever consumes aggregate counts + quotes.

---

## 6 · Build sequence — testable increments

**Increment A · The findings-data feed** — US-6.1
The aggregate function (persona → reps, option counts, quote pool) + a client data layer that fetches and shapes it. *Test:* call it against real reads; see honest per-persona counts + quotes, no raw rows.

**Increment B · Core synthesis** — US-6.2, US-6.3, US-6.4
Map gold tags → findings; suppress CF-sink; aggregate as counts-or-quotes. *Test:* Business findings list the real blind-spots by count, with quotes; table-stakes are absent.

**Increment C · The gates** — US-6.5, US-6.6, US-6.7
Convergence floor, segment-existence (CREW-4), VIP contradiction, small-N suppression. *Test:* a 2-rep signal is withheld; an 8-rep majority surfaces; crew suppressed if CREW-4 low.

**Increment D · Compute-on-open + preview** — US-6.8, US-6.9
Deterministic recompute, report_cache, and a **temporary validation preview** to view the findings (JSON/rendered) before the real GM report exists. *Test:* open the preview, read the findings, confirm determinism.

---

## 7 · Inputs & dependencies (ready)

- **Data** — completed reads + responses (S1–S3). Real test data already exists (e.g., 8 Business reads).
- **Gold tags** — `instrument.v4.2.json` (340 tags, CF-sink markers, CREW-4 gate).
- **Specs** — GoldMap v0.4 (tag→finding mapping), Output-Spec v0.2 (report shape).
- The one new architectural piece is the **findings-data function** (decision A).

---

## 8 · Risks & mitigations

- **Anonymity vs read-back (the crux).** → A1's aggregate function returns counts + quotes only. (Per §2.)
- **Small-N re-identification.** → the anonymity gate withholds below-floor findings; quotes shown only above the floor.
- **Determinism.** → pure functions over aggregate inputs; no randomness; cache is derived, not authoritative.
- **No admin surface yet.** → Increment D ships a throwaway preview so we can *validate the logic* now; the real GM report is S5.
- **Standing S1–S3 lessons applied:** surface every DB error; reload the schema after adding the function; audit for stray triggers; consult the spec (GoldMap/Output-Spec) before building each rule.

---

## 9 · Out of scope (Sprint 5+)

The **GM Findings Report** surface + the **Researcher Console** (both locked admin canvases) · admin **auth** · RosaeNLG story · US-9.3 health metrics · Sentry · offline queue · QA/iPad/UAT/pilot (S6).

---

## 10 · How we'll work (standing rules — in force)

Complete files only · Windows-Explorer file ops · commit blocks begin `cd "C:\GuestIQ Research Project"` · exact folder + filename + new-vs-replace · stray-file pre-check · red deploy = verify live first · consult the approved spec/mockup before building · **check the error on every Supabase write** · **RLS is insert-first — reads/aggregates go through anonymity-safe functions** · **reload the schema after adding DB functions** · **audit reused schema for stray triggers**.

---

*GuestIQ · Sprint 4 Plan · the Findings Engine · 9 stories · 43 SP · 4 testable increments · deterministic, compute-on-open, no third-party AI · five gates · counts never names*
