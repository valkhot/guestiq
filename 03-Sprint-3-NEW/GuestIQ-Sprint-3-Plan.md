# GuestIQ — Sprint 3 Plan

| | |
|---|---|
| **Sprint** | S3 · Payoff, replay & observability |
| **Anchor** | Backlog v4.0 (E4.8–4.9, E5, E9 + US-2.5) · MDT v6.0 §Sprint 3 · Design System v2.0 · approved mockups (EndOfRead-v2 / CoverageWall-v2) |
| **Builds on** | S2 — a full anonymous read that captures & completes |

---

## 1 · Sprint goal

**After finishing a read, the agent gets a real payoff — a threshold moment, a dossier of what they got down, an on-device story in the guest's own words, and an honest constellation of how their read sits among the desk's — then a coverage wall that shows, gaps-first, which guests they've brought to life and which the desk still needs. All anonymous. Counts, never names.**

By the end of S3, a read *feels* rewarding, not just recorded — and the agent can see their coverage and loop into the next read.

---

## 2 · Sprint backlog

| Story | Owner | SP |
|---|---|---|
| US-4.8 · End-of-read — five beats | AI Developer | 8 |
| US-4.9 · On-device story (RosaeNLG / deterministic) | AI Developer | 8 |
| US-5.2 · Coverage wall (gaps-first, status bands, own pins) | AI Developer | 8 |
| US-5.3 · Completed-range state (reframes, never nags) | AI Developer | 3 |
| US-5.4 · Replay loop (wall → read → wall) | AI Developer | 2 |
| US-9.1 · Observability v2.0 event taxonomy | AI Developer | 5 |
| US-9.2 · PostHog + Sentry instrumentation (privacy-safe) | AI Developer | 3 |
| US-9.3 · Health metrics (ops %, not findings) | AI Developer | 3 |
| US-2.5 · Offline queue + sync *(carried from S2 — **stretch**)* | AI Developer | 8 |
| | **Total** | **48** (40 without stretch) |

---

## 3 · Two architectural decisions (need your steer)

These shape the whole sprint, so let's decide them up front.

**A. How does the device show desk-wide data (constellation counts, coverage bands) when RLS blocks reading rows back?**
The payoff needs *aggregate* facts ("6 reps have read the Business guest") — but the anon key is deliberately **insert-only, no SELECT** (our anonymity guarantee). Two ways:
- **A1 (recommended) — an aggregate-only database function.** A small `SECURITY DEFINER` function returns **per-persona counts only** (never rows, never names, never free-text). The device calls it to draw the constellation and coverage bands. Preserves anonymity *by construction* (counts leave, rows never do) and matches the design's desk-wide bands.
- **A2 — device-local only.** Coverage + constellation reflect only what *this device* recorded (from local memory). Simpler, no new DB code — but not desk-wide, so the constellation mostly shows "first on record" and the wall can't show the desk's status.

→ *My recommendation: **A1.** It's the correct architecture, keeps anonymity intact, and delivers the design as drawn. It adds one small, safe DB function.*

**B. The on-device story — full RosaeNLG now, or a deterministic stand-in first?**
The canon says the end-of-read story is generated **on-device, no third-party AI**. RosaeNLG is a real in-browser NLG library but heavy to integrate.
- **B1 (recommended) — deterministic template story first.** A client-side story assembled from the agent's own answers (their picks + their words), no external anything. Honors "no third-party AI," ships fast, reads well. RosaeNLG becomes a later upgrade behind the same interface.
- **B2 — full RosaeNLG now.** Richer language, but a meaningful integration cost (bundle size, templates) that risks eating the sprint.

→ *My recommendation: **B1.** Same principle (no external AI, on-device), far less risk. We can upgrade to RosaeNLG later without touching the surfaces.*

---

## 4 · Definition of Done — the S3 gate

- ✅ Finishing a read shows the **five-beat end-of-read** (threshold → dossier + volume → story → constellation → gallery/gratitude) on desktop.
- ✅ The **dossier + story** are built from the agent's *own* answers (their words surfaced verbatim).
- ✅ The **constellation** shows honest aggregate counts (**never names**) and **degrades gracefully** to "first on record" when thin.
- ✅ The **coverage wall** shows all 9 personas gaps-first, with **status bands** (Do you know them? / Started / Known well), the agent's **own reads pinned**, and a **count-only recognition line**.
- ✅ **Completed-range** reframes to completeness and **never nags**; the **replay loop** returns to the wall/picker.
- ✅ **Observability** events fire (v2.0 taxonomy), **inputs masked**, no PII in payloads.
- ✅ Anonymity intact end-to-end: aggregate counts only, no rows/names exposed to the device.
- 🟡 (Stretch) Offline: a read taken offline holds and syncs.

---

## 5 · Build sequence — testable increments

**Increment A · Aggregate foundation + end-of-read (beats 1–3)** — US-4.8 (part), US-4.9
The aggregate-counts function (if A1), then threshold → dossier → on-device story, all from the agent's own answers.
*Test:* finish a read → see the dossier of what you got down + a story in the guest's words.

**Increment B · Constellation + gallery + gratitude (beats 4–5)** — US-4.8 (rest)
The constellation from aggregate counts (never names; degrades when thin) + the persona gallery + neutral gratitude + "Read another guest →".
*Test:* constellation reads honestly; on an empty desk it says "first on record," not a fake number.

**Increment C · Coverage wall** — US-5.2
Nine personas gaps-first; status bands; own reads pinned; count-only recognition line.
*Test:* personas you've read show as covered/pinned; unread show gaps-first; no counts leak into bands.

**Increment D · Completed-range + replay loop** — US-5.3, US-5.4
"This is plenty" framing when your known range is done (never nags); wall → picker → read → wall.
*Test:* loop through several reads; completed range reframes without pestering.

**Increment E · Observability** — US-9.1, US-9.2, US-9.3
v2.0 events + PostHog/Sentry wiring (mask inputs, no PII) + health metrics.
*Test:* events appear in PostHog with no answer content; a forced error reaches Sentry.

**Increment F · Offline queue (stretch)** — US-2.5
Hold writes offline, sync on reconnect, wire the "your answers are safe" state.
*Test:* Wi-Fi off mid-read → reassurance → reconnect → syncs, no loss.

---

## 6 · Inputs & dependencies (ready)

- **Data** — reads + responses (S1), the completed-read flow (S2). Aggregate function (A1) is the one new piece.
- **Own answers** — already in memory during a read, so dossier + story need no read-back.
- **Visual spec** — approved `EndOfRead-v2` and `CoverageWall-v2` mockups + Design System v2.0 (the brass-thread motif pays off here as the constellation).
- No new design decisions on the *surfaces* — this implements ratified mockups; the two open items are the *architecture* choices in §3.

---

## 7 · Risks & mitigations

- **Read-back vs anonymity (the big one).** → A1's aggregate-only function returns counts, never rows — anonymity preserved *and* the payoff works. (Per §3.)
- **RosaeNLG integration cost.** → B1 deterministic story first, behind an interface we can upgrade later.
- **Constellation could imply a leaderboard / expose small-N.** → counts scaled to the convergence floor, never names, degrades to "first on record"; honest-by-construction.
- **Coverage wall "already-read marking"** (the thing you looked for in S2) lands here — device knows its own reads locally; desk status via the aggregate function.
- **Big sprint (48 SP).** → six-increment split; US-2.5 is an explicit stretch that can slip.
- **Standing S2 lessons applied:** consult the mockup before building each surface; check the error on every Supabase write; desktop-first, above-the-fold.

---

## 8 · Out of scope (later sprints)

The Findings Engine (S4) · GM Findings Report + Console (S5) · full RosaeNLG (upgrade) · party routing + family/group questions · QA/iPad/UAT/pilot (S6).

---

## 9 · How we'll work (standing rules — in force)

Complete files only · Windows-Explorer file ops · commit blocks begin `cd "C:\GuestIQ Research Project"` · exact folder + filename + new-vs-replace · stray-file pre-check · red deploy = verify live site first · **consult the approved mockup before implementing a surface** · **check the error on every Supabase write** · **RLS is insert-first — reads/aggregates need explicit, anonymity-safe access**.

---

*GuestIQ · Sprint 3 Plan · read payoff + coverage + observability · 9 stories · 48 SP · 6 testable increments · implements EndOfRead-v2 + CoverageWall-v2 · counts never names*
