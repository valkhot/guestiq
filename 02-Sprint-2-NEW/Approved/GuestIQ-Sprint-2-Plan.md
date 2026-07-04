# GuestIQ — Sprint 2 Plan

| | |
|---|---|
| **Sprint** | S2 · The agent read — capture (UC-01) |
| **Anchor** | Backlog v4.0 (E4 + US-2.5) · MDT v6.0 §Sprint 2 · Design System v2.0 · approved mockups (Welcome / Onboarding-BadgeClaim / GuestSelect / Read-Screen / DepthInvitation) · instrument.v4.2.json |
| **Builds on** | S1 — live PWA, schema + RLS, 12 badges, 67-question instrument-as-data |

---

## 1 · Sprint goal

**A front-desk agent can complete a full read on a real iPad — welcome → claim a badge → pick a guest type → answer the questions (all six types, with the free-text field) → take the depth fork — and every answer lands in Supabase, anonymous and raw, with the gold tags never shown on screen.**

The payoff screen (the five-beat end-of-read), the coverage wall, and the RosaeNLG story are **Sprint 3** — S2 ends at a simple "recorded, thank you" confirmation.

---

## 2 · Sprint backlog

| Story | Owner | SP |
|---|---|---|
| US-4.1 · Welcome screen | AI Developer | 3 |
| US-4.2 · Badge claim + lock (+ re-entry) | AI Developer | 5 |
| US-4.3 · Guest-select (9 personas) + Q1 grounding | AI Developer | 5 |
| US-4.4 · Read screen — one question at a time + gold-tagged options | AI Developer | 8 |
| US-4.6 · Question-type renderers (single / multi / observer / kano / scale5) | AI Developer | 8 |
| US-4.5 · Count-or-quote free-text field | AI Developer | 5 |
| US-4.7 · Depth fork | AI Developer | 3 |
| US-4.10 · Capture integrity (anonymity / no-PII writes) | AI Developer | 3 |
| US-2.5 · Offline queue + sync *(moved from S1 — **stretch**, may slip to S3)* | AI Developer | 8 |
| | **Total** | **48** |

Everything is AI-built; you review each increment and test on the iPad. US-2.5 is the stretch — if the sprint runs long, it slips to S3 without hurting the goal.

---

## 3 · Definition of Done — the S2 gate

- ✅ Full journey runs on a **real iPad**: welcome → badge → guest-select → read → depth fork → "recorded" confirmation.
- ✅ All **six question types** render and capture correctly (single · multi:N · observer · kano · scale5 · and the verbatim free-text field).
- ✅ Answers land in Supabase (`reads` + `responses`), **anonymous, raw, badge-token-only, no PII**.
- ✅ **Gold tags never appear** anywhere on the agent's screen.
- ✅ Re-entry works: a returning device shows "Welcome back, Fox" with no re-claim.
- ✅ Plain-language (NFR-TONE-02) holds on every agent control.
- 🟡 (Stretch) Offline: a read taken with Wi-Fi off is held and syncs on reconnect.

---

## 4 · Build sequence — five testable increments

Each increment is a set of **complete files** (copy into the project folder, per the standing rules), a **commit block**, and a **test point** before moving on. This keeps a 48-SP sprint from ever being one scary drop.

**Increment A · Flow skeleton + Welcome + Badge claim** — US-4.1, US-4.2
The app's screen-router/state, the Welcome screen, and badge claim (12 coins read from Supabase, claim-and-lock, device remembers its badge for re-entry).
*Test:* claim a badge → "You're the Fox" → reload the page → "Welcome back, Fox."

**Increment B · Guest-select + read shell + the first renderer** — US-4.3, US-4.4, US-4.6 (single)
The 9-persona picker (grounding folded into Q1), the read frame (persona chip, corner badge, dot rail, one-question-at-a-time), and the `single` renderer. A `read` row is created in Supabase on start.
*Test:* pick a persona → answer a single-choice question → confirm a row appears in Supabase.

**Increment C · All remaining renderers + the free-text field** — US-4.6 (rest), US-4.5
`observer`, `multi:N`, `kano`, `scale5` renderers + the prominent count-or-quote verbatim field. Options render with tags invisible.
*Test:* each type renders, enforces its rule (e.g. multi caps at N), and saves; free-text stores exactly as typed.

**Increment D · Depth fork + capture-complete + anonymity check** — US-4.7, US-4.10
The once-only depth fork after CORE ("A few more →" / "See your read →"), read-completion write, a minimal "Recorded with thanks" placeholder, and a verification pass that writes carry no PII.
*Test:* full CORE read end-to-end on the iPad → lands in Supabase, anonymous, complete.

**Increment E · Offline queue (stretch)** — US-2.5
Hold writes locally when offline; auto-sync on reconnect; wire the "your answers are safe" state.
*Test:* turn Wi-Fi off mid-read → reassurance shows → reconnect → the read syncs, no data lost.

---

## 5 · Inputs & dependencies (all ready)

- **Instrument** — `src/data/instrument.v4.2.json` (67 questions, tags, CF-sink, CREW-4 gate). The read flow renders from this.
- **Data** — `reads` + `responses` tables + anonymous-safe RLS (S1). Writes go straight in.
- **Visual spec** — already approved: `Welcome`, `Onboarding-BadgeClaim`, `GuestSelect-Grounding`, `Read-Screen`, `DepthInvitation-v2` mockups + Design System v2.0 (agent dark canvas, Fraunces/Spectral/Space Mono, coin components).
- No new design decisions needed — this sprint **implements** what's already ratified.

---

## 6 · Risks & mitigations

- **Big sprint (48 SP).** → The five-increment split keeps each step small and testable; US-2.5 is an explicit stretch that can slip to S3.
- **Six question types = the most complex build so far.** → Build the `single` renderer first (Increment B), prove the pattern, then add the rest (Increment C) to the same shape.
- **Real-device quirks** (touch targets, the free-text keyboard, badge tray). → Test on the actual iPad at the end of every increment, not just at the gate.
- **Deploy flakiness (carried from S1).** → If it recurs, apply the AI-DEPLOY-RETRY one-file fix; treat red deploys as "check the live site first."
- **CREW-4 gate.** → The read simply captures CREW-4's answer; the *suppression* logic lives in the engine (S4). No gating logic in S2 — just don't lose the field.

---

## 7 · Out of scope (Sprint 3+)

Five-beat end-of-read · RosaeNLG on-device story · constellation · coverage wall · re-entry recognition line · observability events. S2 ends at a plain "recorded" confirmation so the capture path is proven before the payoff is built on top of it.

---

## 8 · How we'll work (standing rules — in force)

Complete files only (full copy-paste replacements) · file ops in **Windows Explorer** terms (copy to folder / replace / create folder / rename) · commit blocks always begin `cd "C:\GuestIQ Research Project"` · every placement states exact folder + filename + new-vs-replace · stray-file pre-check before each handover · red deploy = verify the live site first.

---

*GuestIQ · Sprint 2 Plan · UC-01 agent read · 9 stories · 48 SP · 5 testable increments · implements approved mockups · anonymous capture · gold tags invisible*
