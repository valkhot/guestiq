# GuestIQ — Output / Report-Engine Spec (v0.2)

How raw survey answers become the GM readout. Governs the analysis and report layer (not the capture app). Built from the validation test; carries the gold-map guardrails.

**Changed in v0.2 (reconciled to Questionnaire v4.2 + GoldMap v0.4 + the no-AI decision):**
- **Free-text is no longer coded.** v4.2 converts anticipatable open questions to **structured options** (which *count*) and keeps the rest as **verbatim quotes** (which are *displayed*). Every answer is a **count or a quote — never a coding task.** The old "open-text-derived findings softened and labelled" guardrail is **retired** (there are no coded findings).
- **Gate 4 is tag-driven.** Each option carries a **gold tag** (BS / CON / MW / CF-sink) from GoldMap v0.4; the filter reads the tag instead of interpreting prose.
- **CF-sink suppression.** Table-stakes "the usual…" options are collected but **never become findings**.
- **The engine is fully deterministic — no AI** — and runs **client-side, compute-on-open** (Architecture v1.1). The agent story uses RosaeNLG (local); it is not part of this report engine.
- **Two new personas** (crew · conditional, VIP · discretion-contradiction) enter the gold-map filter (GoldMap §14/§15).

## 0 · Core stance — findings, not recommendations
GuestIQ **presents evidence; it does not prescribe actions.** Its knowledge is limited to what the front desk observes about in-house guests; it lacks the P&L, labour, outside-patron, brand, and market context the GM has. Each finding states **the pattern, the evidence, and the gap or risk it reveals**, then stops. The GM decides. Reporting evidence rather than orders is also what keeps the tool credible — a GM dismisses a survey that bosses them; they trust one that shows them something their dashboards can't.

---

## 1 · The pipeline (every finding passes all five gates, in order)

1. **Aggregate by distinct respondent.** Count distinct *people* per persona × question — never sessions. Two sessions by one badge = one observer.
2. **Convergence floor (three bands):**
   - **Finding** — ≥3 distinct respondents AND a majority agree.
   - **Directional** — 2 agree, or 3 with a plurality but no majority. Labelled "early signal — thin."
   - **Not reportable** — 1 respondent, or no agreement. Usable only as a non-representative quote attached to a finding that cleared the floor.
3. **Observation grade (OBS).** Lead with witnessed (`seen often`); mark inferred (`my guess`) as directional even when the count clears the floor.
4. **Gold-map filter (tag-driven).** Each structured option carries a **gold tag** (GoldMap v0.4 / Questionnaire v4.2):
   - **CF-sink** ("the usual…" — Wi-Fi, clean room, etc.) → **suppressed**: never a finding, never even the credibility line. Collected only so the menu is exhaustive.
   - **CF** (confirm) → demote to the single "your instincts are right" line.
   - **BS** (blind-spot) / **CON** (contradiction) / **MW** (mis-weight) → **headline candidate**, graded by tag (CON/BS lead).
   - **Crew (CW)** findings are **gated by CREW-4**: if the desk reports crew "almost never," crew findings are suppressed (segment-existence — GoldMap §14). **VIP (VX)** discretion findings (esp. VIP-2/VIP-4) are graded as a **contradiction**, conservatively (GoldMap §15).
5. **Actionability + guardrails (§2).** A finding reaches the headline only if GM-actionable AND it passes the guardrails.

## 2 · Guardrails the report engine MUST enforce

- **No recommendations (primary rule).** Findings, never actions. No *do / add / cut / shift / reallocate / you should / we recommend.* Rewrite any instruction as an observed pattern + the gap it reveals.
- **In-house-only backstop.** GuestIQ sees only the in-house-guest slice; never imply an amenity should be cut or shrunk. Describe the unmet in-house need; say nothing about the amenity's overall value.
- **Convergent belief ≠ fact.** Every finding is "your front desk agrees," not "proven."
- **Raw counts, never percentages.** "7 of 9 reps," not "78%."
- **Frequency × consequence, not assumed value.** Rank by how often × how bad the outcome, never by assumed segment value.
- **Where the lever sits (informational).** Tag each finding *desk-controllable* or *brand-level* — informational, never an instruction.
- **CF-sink picks are suppressed** (Gate 4) — table-stakes never surface as findings.
- **Verbatim quotes are first-class.** The optional "other / example" box and the designated verbatim items (v4.2 §5) supply quotes; **lead findings with the quote** where one exists. Quotes are **displayed, never coded or themed.**

*(Retired in v0.2: the "open-text-derived findings softened and labelled" guardrail — there is no free-text coding, so there are no coded findings to soften. Free-text is now either a structured count or a displayed quote.)*

## 3 · Headline ordering
Findings that survive all gates are ordered by **gold-tag then frequency × consequence**: CON/BS first, then by how often + how costly. Confirmations never enter the headline. Directional/thin findings appear in a separate "early signals — watch" block.

## 4 · Worked example — the reference headline finding

**RIGHT (finding only; the GM decides):**
> **Your in-house volume guests aren't being served by your F&B — and they're telling the desk what they want instead.** Business, transit, and cruise guests — your weekday rooms — consistently skip the restaurant (they eat out, leave before it opens, or eat on the ship: *all 18 reps who play these segments agree*). At the same time, they repeatedly ask the desk for things the hotel doesn't offer: **coffee before the café opens, quick grab-and-go food, and small forgotten items** (chargers, contact-lens solution, an umbrella, cruise sea-sickness pills). One rep: *"They ask for coffee at 5am every single morning and we have nothing."*
> **What this reveals:** an unmet in-house convenience need among the segments that fill your weekday rooms. *(This says nothing about the restaurant's overall value — it serves your leisure guests and outside diners, which the survey can't see.)*
> *Lever: desk-controllable. The decision is yours.*

*In v4.2 terms:* the evidence is now **structured counts** (P4/P4b "eats elsewhere," P9/BUS-3/CRU-3 "coffee before dawn / grab-and-go," BUS-4 forgotten items — all BS-tagged), and the *"coffee at 5am"* line is a **verbatim quote** from an optional "other" box. No coding anywhere.

## 5 · Report skeleton (GM screen) — unchanged
1. **One-line synthesis** · 2. **3–5 headline findings** (pattern · raw counts · verbatim quote · what it reveals · lever tag · confidence; no recommended action) · 3. **Early signals — watch** (directional) · 4. **Your instincts are right** (one compressed confirmation line) · 5. **Confidence panel** · 6. **Closing — "The decisions are yours."**

## 6 · What the engine must NOT do
- **Recommend or prescribe** any action (primary rule, §0).
- Imply any amenity should be cut or shrunk (in-house-only backstop).
- Present an inferred (`my guess`) finding at witnessed confidence.
- Promote a thin/directional finding into the headline.
- **Surface a CF-sink / table-stakes pick as a finding** (Wi-Fi, clean room).
- **Surface a crew finding when CREW-4 says crew is "almost never"** (segment-existence gate).
- Use percentages on small samples.
- *(No longer applicable: "code free-text into themes" — v4.2 removed coding entirely.)*

---

*GuestIQ · Output / Report-Engine Spec · v0.2 · Tag-driven · Deterministic (no AI) · Count-or-quote (no coding) · CF-sink suppressed · Implements GoldMap v0.4 + Questionnaire v4.2*
