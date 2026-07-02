# GuestIQ — Dev Pass-Along (AI-to-AI Handoff)

*Supersedes `GuestIQ-Redesign-Handoff.md`. You are an AI picking up GuestIQ to take it toward build. Read this document first, then the four authoritative artifacts named in §2. This handoff deliberately explains **why** each decision was made, not just what — because several of these choices look reversible but are load-bearing, and undoing them quietly breaks the product. Where a section says "do not change without the Lead Researcher (Val)," treat that literally.*

---

## 1 · What GuestIQ is (orientation)

GuestIQ is a React 18 + Vite + Supabase + GitHub Pages PWA (PostHog analytics, Sentry). It captures **front-desk staff knowledge** about hotel guests. The instrument uses a **projection model**: a front-desk agent picks a guest persona they know well (e.g. "business traveller"), pictures real recent guests of that type, and answers from that guest's point of view.

The buyer is a **GM of a 200-room urban Seattle chain hotel** ("The Cascade"): a restaurant the GM is proud of, a small token fitness centre, business-heavy downtown with cruise / event / leisure / medical demand.

The product's value is **surfacing patterns the GM's existing systems can't see** — non-obvious, corroborable observations the front desk holds but never reports. It is **not** guest ground-truth (no guest is surveyed), and it is **not** a recommendation engine. Hold both of those facts the whole way through; most of the design follows from them.

---

## 2 · The four authoritative artifacts (source of truth)

Build from these and only these. Everything else in the outputs folder is superseded draft or earlier-session background.

1. **`GuestIQ-Questionnaire-v4-PlainLanguage.md` (v4.1)** — the instrument **and** the build spec, standalone. Contains every question (stable IDs), tiers, routing, branching, the response-type → UI → validation table, follow-up tags, the grounding screen, delivery order, and item counts. This is what the capture app implements.
2. **`GuestIQ-GM-Priors-GoldMap.md` (v0.3)** — the **obviousness filter**. A model of what a competent GM already believes, used by the analysis layer to demote confirmations and promote contradictions/blind-spots (pipeline gate 4, §6).
3. **`GuestIQ-Output-Spec.md` (v0.1)** — the **report-engine rules**: the 5-gate pipeline, the guardrails, the report skeleton, confidence grading. This is what the analysis/report layer implements.
4. **`GuestIQ-GM-Report.html`** — the **rendered reference report** (illustrative, simulated data). Shows exactly what a correct output looks like: evidence only, raw counts, verbatim quotes, confidence chips, no recommendations. Use it as the visual + tonal target.

**Superseded / archive (do not build from):** `GuestIQ-Questionnaire-v3-DEV.md` (its build conventions are now folded into v4.1), `GuestIQ-Questionnaire-v3.md`, `-v2.md`, `-Full-v1.md`, `-Tiered-v0.2.md`, `-Instrument-OneShot-v1.md`, `-AnswerOptions-v1.md` (tied to old Instrument v1.2), `-DecisionBack-Design.md`, `-Pilot-Findings-Report.md`, `-Pilot-Questions-for-Review.md`, `-GM-Screen.html`, `-GM-Screen-v2.html`, and `-Redesign-Handoff.md` (this document replaces it).

---

## 3 · The principles that must survive implementation (do not break without Val)

These are the spine. If your implementation violates one of these, it is wrong even if it "works."

- **Findings, not recommendations.** The report presents evidence and the gap it reveals, then stops. It never tells the GM what to do.
- **In-house-only / additive-only.** GuestIQ sees only the in-house-guest slice of any amenity. It never implies an amenity should be cut, shrunk, or reallocated.
- **Convergent belief ≠ fact.** Every finding is "your front desk agrees," never "proven." No external/guest data exists at pilot.
- **Count distinct respondents, not sessions.** Convergence is measured across distinct people. `respondent_id` must be stable per person.
- **Raw counts, never percentages.** "6 of 8 reps," not "75%." Small N makes percentages dishonest.
- **Open-text-derived findings are softened and labelled.** Anything read by coding free text is worded tentatively and tagged (e.g. "open answers"), never presented as a clean count.
- **Obviousness filter is mandatory.** A true-but-obvious finding is not a finding. The gold map decides what's obvious.

---

## 4 · The changes made this session, and **why** (the part to read carefully)

This session reworked the **output/report layer** (the instrument was already at plain-language v4.0). Here is each change and the reasoning, so you don't reintroduce the problems we removed.

### 4.1 · The restaurant overreach → the in-house-only / additive-only guardrail
**What happened:** an early draft finding said the hotel restaurant "serves the wrong segment — shift weekday labour away from it." Val caught it.
**Why it was wrong:** the instrument only sees whether *in-house guests* use the restaurant. It cannot see **outside diners** (neighbourhood patrons, business lunches) or the **P&L** — which is often the bulk of an urban hotel restaurant's business. Drawing a "reallocate / cut" conclusion from one-sided data is not just unsupported; a GM who knows their walk-in covers pay the kitchen would instantly recognise the tool doesn't understand their business, and would discard the whole report. **Trust is the asset; this kind of overreach spends it.**
**The fix:** GuestIQ may only surface **unmet in-house demand**, framed **additively** ("here is an in-house need you're not meeting"), never subtractively. The restaurant finding became "your weekday-volume guests have an unmet convenience need beside the restaurant" — the restaurant is never touched.

### 4.2 · The deeper fix: findings, not recommendations
**What happened:** after 4.1, Val pushed further — even "add a coffee station" is too much.
**Why:** the additive guardrail still had GuestIQ *prescribing*. But GuestIQ doesn't have the GM's full context (labour, budget, brand, market, the outside-diner business). Any recommendation is made from partial information — the exact failure mode as the restaurant, one step removed. And operationally, the moment a survey tells a GM what to do, they look for the one impractical instruction and dismiss the tool.
**The fix:** the report stops at the **finding** — the observed pattern, the evidence, and the gap/risk it reveals — and hands the decision to the GM. The report's closing line is literally *"The decisions are yours."* This is the single most important behavioural rule of the report engine. **Do not let any helpful-sounding feature (suggested actions, "recommended next steps," auto-prioritised to-dos) reintroduce prescription.**

### 4.3 · The output spec and the 5-gate pipeline
**What happened:** the report logic was formalised into `GuestIQ-Output-Spec.md`.
**Why:** to make the rules enforceable in code rather than living in one person's judgement. The pipeline (§6) encodes the convergence floor, observation grading, the obviousness filter, and the guardrails as ordered gates a finding must pass.

### 4.4 · LOY-3 left open + report language softened + a general open-text rule
**What happened:** Val asked how the report concluded "some regulars return for a particular staff member." It traced to **LOY-3** (open text: "main reason a regular keeps coming back") + **LOY-3b** (could the hotel lose it). The staff-anchor reading is a *coded* interpretation of free text, not a structured count.
**The decision:** **leave LOY-3 open** (do not convert to structured choices). **Why:** offering "a specific staff member" as a pickable option would *lead* reps toward the very answer we're testing for, manufacturing the signal. Open text keeps it honest.
**The consequence (also locked):** because the signal is coded from free text, the report must word it tentatively and label it ("open answers"), never as a clean pattern. This generalised into a standing output-spec rule: **any finding derived from coding free text is softened and labelled.** Coding is interpretation; the report must show that it is.

### 4.5 · v4.0 → v4.1 (standalone)
**What happened:** the v3.0 App Build Spec conventions (response-type → UI → validation table, grounding screen, delivery order, item counts) were folded into v4.1.
**Why:** one source of truth for the dev. v3-DEV is now archived. The **questions are unchanged** — this was a documentation merge, not an instrument change.

---

## 5 · The instrument (what the capture app builds)

Full detail is in v4.1; the shape:

- **Tiers:** `CORE` → `PRO` → `EXPERT`, self-selected; each answers its tier and all lower. `TENURE` items shown only if the rep confirms long service.
- **Routing:** `L1` (purpose: business / early-flight / holiday / cruise / event / medical / other) selects the **segment battery block**. `L2` (party) opens the **Family add-on** (L2=C) or **Group add-on** (L2=D–H).
- **Grounding screen** once before Q1 (the projection-model anchor). Stems are present/habitual tense.
- **Response types:** `single`, `multi:N`, `rank:2`, `scale5`, `kano`, `observer` (category + required example), `text` — each with its UI and validation in the v4.1 table. Every closed question auto-appends "Other" and "None / not this guest."
- **Follow-up tags** (`SD` say-do, `OBS` observation-basis, `FREQ` frequency) render inline after the tagged answer.
- **Save-and-resume enabled; partial completion is valid.** Capture per answer: stable `respondent_id`, L1, L2, tier, question_id, choices, follow-up values, free-text example.

---

## 6 · The report engine (what the analysis layer builds)

Full detail is in the output spec. Every finding passes five gates in order:

1. **Aggregate by distinct respondent** (not session).
2. **Convergence floor (3 bands):** Finding (≥3 distinct + majority) · Directional (2, or 3 plurality) · Not-reportable (1).
3. **Observation grade:** lead with witnessed; mark inferred as directional even if counts clear.
4. **Gold-map filter:** confirm → demote; contradiction / blind-spot → headline candidate.
5. **Guardrails (§3):** no recommendations; in-house-only; open-text softening; raw counts; etc.

Report skeleton: one-line synthesis → 3–5 headline findings (pattern · raw counts · verbatim quote · what-it-reveals · lever tag [informational] · confidence chip) → "early signals — watch" (directional/thin, labelled) → "your instincts are right" (compressed confirmations) → confidence panel → closing "The decisions are yours." The non-converged questions stay silent and go on the pilot watch-list. The rendered target is `GuestIQ-GM-Report.html`.

Note on the gold map: it models **this property's** GM priors. At scale, each property needs its own prior model (or a generalised one); a property's gold is where its front desk contradicts its GM's priors, so the filter is not portable as-is.

---

## 7 · Validation status (be honest about this)

The pipeline was validated on **simulated, illustrative data** (10 reps; multi-segment coverage). It produced 4 credible, non-obvious, evidence-only headline findings and correctly demoted the obvious (Wi-Fi/quiet must-haves, marginal gym) and the thin (loyalty, seasonal → directional). **This de-risks the design and the output logic — it does not de-risk the real world.** Real convergence, real quotes, and whether these patterns actually hold are what the **live pilot** tests. Mark all simulated data illustrative anywhere it appears.

---

## 8 · What is NOT done — your next steps

1. **Governing-doc reconciliation (Risk R-13 — do this before/with build).** The SRS, Product Backlog, and Sprint Backlog still describe the **old 79-question instrument**. They must be reconciled to v4.1 + gold map v0.3 + output spec so dev builds from current truth, not stale specs.
2. **Build the capture app** to v4.1 (tiers, routing, branching, response types, validation, grounding, save-and-resume).
3. **Build the analysis/report engine** to the output spec (the 5 gates, the guardrails, the report skeleton). Match the reference render.
4. **Optional QA:** a human read-aloud pass of v4.1 ("read as a tired ESL agent at 11pm") — only a person can do this; not yet done.
5. **Risks to monitor:** R-13 (documentation drift), R-14 (production-deploy gap — nothing ships unless explicitly instructed; "ship to production" must be stated as a discrete step), R-15 (mobile UI bug class — **Chrome DevTools does not reproduce iOS Safari WebKit bugs; test on a real device or equivalent WebKit**).

---

## 9 · Things you may be tempted to "improve" — don't (without Val)

Each of these looks like a helpful upgrade and is actually a regression:

- **Adding recommended actions / "next steps" / prioritised to-dos** to the report → breaks findings-not-recommendations (§4.2).
- **Suggesting an amenity be cut, merged, or reallocated** → breaks in-house-only (§4.1).
- **Converting LOY-3 (or similar open items) to structured choices** → leads respondents, manufactures the signal (§4.4).
- **Showing percentages** on small samples → dishonest; use raw counts.
- **Counting sessions instead of distinct respondents** → inflates convergence.
- **Surfacing thin/directional or non-converged items as findings** → they belong in "watch" or stay silent.
- **Lowballing the GM in the gold map** to make findings look more impressive → manufactures fake WOW; the tool dies on first read. Model a smart GM.
- **Smoothing a coded free-text reading into a confident claim** → must stay tentative and labelled.

---

## 10 · How the Lead Researcher (Val) works

- Strict Scrum; binary pass/fail gates; written retrospectives. Artifacts carry strict IDs/versions — preserve them.
- **Nothing is built or shipped unless explicitly instructed.** "Ship to production" is always a separate, stated step.
- Val challenges **value before build** ("why do we need this?") and expects honest pushback, not validation. The restaurant catch and the LOY-3 trace this session are the model: when a claim can't be traced to specific instrument items, say so.
- Val is non-technical: explanations in plain English, terminal/click steps spelled out, verification step by step.
- Mark all simulated/illustrative data as such.
- Word-doc pipeline if a `.docx` is needed: Node `docx` library → unpack → two XML fixes (remove empty `<w:tr>`; normalise `<w:pBdr>` child order to top/left/bottom/right) → repack → validate → verify content.

*End of pass-along. Start with §2, then reconcile the governing docs (§8.1) before writing build code.*
