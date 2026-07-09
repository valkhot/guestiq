# GuestIQ — Sprint 5 Plan

| | |
|---|---|
| **Sprint** | S5 · Admin surfaces — GM Findings Report + Researcher Console |
| **Anchor** | Backlog v4.0 (E7, E8) · MDT v6.0 §Sprint 5 · Design System v2.0 (light dossier canvas) · Output-Spec v0.2 · the S4 engine |
| **Builds on** | S1–S4 — the engine produces gated, tiered, anonymous findings; now they need a home |

---

## 1 · Sprint goal

**Give the findings a home the right people can reach — and only them.** A **GM** logs in and reads a calm, editorial **Findings Report** (Strong findings first, grouped as blind-spots / contradictions / mis-weights, counts-not-percentages, quotes in the guests' words). A **researcher** logs in and sees the **Console** — study health, coverage, and the ability to export. Findings become **admin-only**; the agent app stays open and anonymous.

By the end of S5, GuestIQ is a complete loop: agents contribute → engine synthesises → the GM sees trustworthy findings on a surface that feels like a considered dossier, not an app.

---

## 2 · Three decisions (need your steer)

**A. How do the GM and researcher sign in?**
- **A1 (recommended) — Supabase Auth, magic link (passwordless).** They enter their email, click a link, they're in. No passwords to manage — ideal for non-technical admins (a GM + you). Supabase provides it natively.
- A2 — email + password. Familiar, but another credential to manage/reset.
- A3 — a single shared passcode gating the admin routes. Simplest, but weak (one shared secret, no per-person access).

→ *Recommendation: **A1.** Passwordless is the least-friction, most-secure fit for two admins.*

**B. How are findings gated to admins only?**
Right now the findings feed (`guestiq_option_counts`, `guestiq_quotes`) is anon-callable — anyone hitting `?view=findings` sees them. Fix:
- **B1 (recommended) — make the findings functions authenticated-only.** Revoke `anon`, grant `authenticated`. The **constellation's** `guestiq_persona_counts` stays anon (it's just per-persona rep counts — low sensitivity, and the agent app needs it). So: agent app keeps its counts; the *findings* require login.

→ *Recommendation: **B1.** Clean split — low-sensitivity counts stay open; the actual findings need auth.*

**C. `report_cache` now, or keep compute-on-open?**
The cache now has a home (admin, authenticated). But compute is cheap at pilot scale.
- **C1 (recommended) — keep compute-on-open for now; add the DB cache only if the report feels slow.** Determinism already holds; the cache is a pure optimisation we can add late without rework.

→ *Recommendation: **C1.***

---

## 3 · The new visual register — the light dossier canvas

The agent app is a **dark, intimate** canvas. The admin surfaces are its opposite: a **light, editorial, print-like dossier** (Design System v2.0 §dossier) — high-contrast, generous margins, serif headings, a "considered document" feel. This is a deliberate register shift: the GM should feel they're reading a *report*, not using *software*. Same brass-thread signature, inverted onto light. This is the sprint's main design lift and should be treated with the same craft standard as the agent screens.

---

## 4 · Sprint backlog

| Story | Owner | SP |
|---|---|---|
| US-7.1 · Admin auth (Supabase magic-link) + route gating | AI | 8 |
| US-7.2 · Gate findings functions to authenticated-only | AI | 3 |
| US-7.3 · GM Findings Report — light dossier canvas | AI | 8 |
| US-7.4 · Report narrative (blind-spots / contradictions / mis-weights, Strong-first) | AI | 5 |
| US-7.5 · Per-persona navigation + empty/forming states | AI | 3 |
| US-8.1 · Researcher Console — study overview + coverage health | AI | 8 |
| US-8.2 · Study window / status controls | AI | 3 |
| US-8.3 · Export (findings → CSV/PDF) | AI | 5 |
| | **Total** | **43** |

---

## 5 · Definition of Done — the S5 gate

- ✅ A GM/researcher signs in (magic link); a logged-out visitor **cannot** reach findings.
- ✅ The **findings feed requires auth**; the agent app (incl. constellation) still works anonymously.
- ✅ The **GM Findings Report** renders on the light dossier canvas: **Strong findings first**, grouped by type, **counts not %**, **no names**, quotes surfaced, thin personas shown honestly (gated/forming).
- ✅ The **Researcher Console** shows study health — reps per guest, coverage, what's above/below the floor — and can **export** the findings.
- ✅ Anonymity intact end-to-end; the report is a faithful, calm rendering of the S4 engine output.

---

## 6 · Build sequence — testable increments

**Increment A · Auth + gating** — US-7.1, US-7.2
Supabase magic-link login, an admin route (`/admin` or `?view=admin`), route gating, and findings functions locked to `authenticated`. *Test:* logged out → blocked; magic-link in → reach the admin shell; agent app still anonymous.

**Increment B · GM Findings Report** — US-7.3, US-7.4, US-7.5
The light dossier canvas + the narrative report (Strong-first, grouped, per-persona nav, honest empty/forming states). *Test:* sign in → read a real, calm findings report for Business.

**Increment C · Researcher Console** — US-8.1, US-8.2
Study overview: reps per guest, coverage health, above/below floor, study status. *Test:* the console reflects the real study state.

**Increment D · Export + polish** — US-8.3
Findings → CSV/PDF; final craft pass on the dossier canvas. *Test:* export a clean findings file.

---

## 7 · Inputs & dependencies (ready)

- **The engine** (S4) — `engine.js` + the findings feed; the report *renders* its output, no new logic.
- **Design** — Design System v2.0's light dossier canvas + the approved GM-Report / Console mockups.
- **Auth** — Supabase Auth (native; just needs enabling + the magic-link flow).
- New pieces: the auth flow, the two admin surfaces, the RPC grant change.

---

## 8 · Risks & mitigations

- **First real auth = new failure modes** (redirect URLs, email delivery, session handling). → Start with Increment A in isolation and prove login before building on it; Supabase magic-link is well-trodden.
- **New canvas = new craft surface.** → treat the dossier canvas with the same iterative craft standard as the agent screens; consult the mockup first.
- **Gating regression risk** (breaking the agent app's counts). → keep `guestiq_persona_counts` anon; only lock the findings feed. Verify the constellation still works after the grant change.
- **Standing lessons applied:** surface every DB/auth error; reload schema after grant changes; consult the spec/mockup before building; check the live site on red deploys.

---

## 9 · Out of scope (Sprint 6)

QA · iPad/responsive pass · UAT · the pilot itself · debrief/Phase-2. Also still deferred: RosaeNLG story, US-9.3 health metrics, Sentry, US-2.5 offline, DB report_cache (add if needed).

---

## 10 · How we'll work (standing rules — in force)

Complete files only · Windows-Explorer file ops · commit blocks begin `cd "C:\GuestIQ Research Project"` · exact folder + filename + new-vs-replace · stray-file pre-check · red deploy = verify live first · consult the approved mockup/spec before building each surface · check the error on every write · reload schema after grant/function changes · desktop-primary, responsive-degrading.

---

*GuestIQ · Sprint 5 Plan · admin surfaces · 8 stories · 43 SP · 4 testable increments · magic-link auth · findings admin-only · light dossier canvas · counts never names*
