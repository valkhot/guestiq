# GuestIQ — Master Development Timeline v6.0

*Fully sequential operational outline · Agile/Scrum · scope-driven sprints · owner-coded steps*

| | |
|---|---|
| **Document** | Master Development Timeline v6.0 — reconciled replan |
| **Supersedes** | MDT v5.0 — pre-pivot (branching / 84-path / gamification / dashboard / third-party-AI) |
| **Anchor** | Product Backlog v4.0 (51 stories) · UC-Spec v3.1 · SRS v3.1 · Architecture v1.1 (**no Edge Functions**) · the 12 approved surfaces |
| **Sprints** | **7 (S0–S6) — set by scope**, not a fixed 14-week container |
| **Stack** | React 18 + Vite · Supabase (DB + RLS, **no Edge Functions**) · GitHub Pages · PostHog + Sentry · RosaeNLG (in-browser) · $0 hosting |

---

## How to read this timeline

Work top to bottom. Every step is numbered within its sprint and **owner-coded**. Sprint **gates** are hard stops — every checklist item confirmed before the next sprint begins.

| Marker | Meaning |
|---|---|
| **[AI]** | AI Developer (Claude / Claude Code) builds or produces this. |
| **[HUMAN]** | *You* perform this — **detailed ①②③ instructions provided**; no technical knowledge assumed. |
| **[REVIEW]** | Lead Researcher reviews & approves an AI deliverable (mockup → approve → build). |
| **[SM]** | Scrum Master ceremony (sprint-start checklist / gate). |
| **[GATE]** | Hard stop — confirm all items before proceeding. |

Step sub-markers: **🔗** exact URL · **✓** verify condition · **⚠** warning.

**Standing lesson (all sprints):** any agent-facing surface is validated on a **real iPad**, not just desktop, before its gate.

---

## Sprint overview

| Sprint | Focus | Backlog | ~SP | Gate |
|---|---|---|---|---|
| **S0** | Foundation & governance | E0, E1 *(done)* · US-2.1 | 3 | Canon + design approved · schema reconciled |
| **S1** | Data platform & instrument | E2 (2.2–2.6) · E3 | 42 | App deploys · instrument loads · RLS anonymous-safe |
| **S2** | The agent read — capture | E4 (4.1–4.7, 4.10) | 40 | An agent completes a read, captured anonymously |
| **S3** | Payoff, replay & observability | E4.8–4.9 · E5 · E9 | 43 | Full journey + end-of-read + coverage · events live |
| **S4** | The Findings Engine | E6 | 46 | Deterministic report from seeded reads · guardrails pass |
| **S5** | Admin surfaces | E7 · E8 | 44 | GM report (Ctrl+Alt+A) + Console (Ctrl+Alt+R) locked |
| **S6** | QA · iPad · UAT · pilot | E10 | 21 | Pilot launched · first session · debrief · Phase-2 |
| | | **51 active** | **239** | |

**Step split:** ~AI 70% · Human 15% (setup config + launch) · Review 15%. Human hands-on concentrates in **S1** (GitHub) · **S5** (PINs) · **S6** (iPad / UAT / launch / debrief).

---

# SPRINT 0 · Foundation & governance  *(largely complete)*

**S0-0 · [SM] Sprint-start checklist** — confirm backlog v4.0 + design surfaces approved, board ready.

**S0-1 · [AI] ✅ Canon + design — done.** Methodology/JTBD/North Star; full canon suite (Charter v2.2 → Data-Model); the design session (12 surfaces + tokens + two canvases). *Carried — no new work.*

**S0-2 · [HUMAN] ✅ Environment & accounts — done.** Supabase · PostHog · Sentry accounts; Node/npm; VS Code; project folders; initial migrations. *Carried.*

**S0-3 · [AI] Reconcile Supabase schema to v4.2 capture (US-2.1).** Align `sessions`/`responses`/`scale_responses`/`none_flags` to persona + depth + count-or-quote; produce migration SQL; **no PII columns**.

**S0-4 · [REVIEW] Approve the reconciled schema.** Confirm the 4 tables + columns match v4.2; approve the migration for S1.

**S0-GATE** — ✓ canon + 12 surfaces approved · ✓ schema reconciled & migration approved · ✓ backlog v4.0 + owners signed off.

---

# SPRINT 1 · Data platform & instrument

**S1-0 · [SM] Sprint-start checklist.**

**S1-1 · [AI] Apply the schema migration (US-2.1).** Run the approved migration against the `guestiq` Supabase project; confirm 4 tables live.

**S1-2 · [AI] RLS + anonymous-safe writes (US-2.2).** Policies: anon may insert; client cannot read other reps' raw rows; badge = opaque token, never a name. Unit-test the policies.

**S1-3 · [HUMAN] Enable GitHub Pages + Actions permissions (US-2.4)** *[10 min]*
🔗 `https://github.com/<your-org>/<repo>/settings/pages`
① Open the repo on GitHub → click **Settings** (top tab).
② Left sidebar → **Pages**. Under **Build and deployment → Source**, choose **GitHub Actions**.
③ Left sidebar → **Actions → General**. Scroll to **Workflow permissions**.
④ Select **Read and write permissions** → click **Save**.
⚠ Do not enable Pages from a branch — it must be **GitHub Actions**, or the deploy in S1-5 will fail.
✓ Pages shows "Your site will be built by GitHub Actions."

**S1-4 · [AI] PWA shell — React 18 + Vite (US-2.3).** Installable manifest + service worker; offline shell; two-canvas theming (agent dark / admin dossier); base routing.

**S1-5 · [AI] GitHub Pages deploy pipeline (US-2.4).** Actions workflow: build + deploy on `main`; SPA-safe routing; env vars injected at build.

**S1-6 · [HUMAN] Confirm the site is live** *[5 min]*
🔗 `https://<your-org>.github.io/<repo>/`
① After the AI pushes, open the repo → **Actions** tab → confirm the latest run shows a green ✓.
② Open the URL above in a browser.
✓ The GuestIQ shell loads over HTTPS with no errors.

**S1-7 · [AI] Offline queue + sync (US-2.5).** Local hold when offline; auto-sync on reconnect; wire the "answers are safe" state.

**S1-8 · [AI] No-Edge-Functions conformance (US-2.6).** Document + verify: all compute client-side or plain Supabase; no serverless paths.

**S1-9 · [AI] v4.2 instrument as data (US-3.1, US-3.2, US-3.3).** 9 personas × CORE/PRO/EXPERT; all question types; gold tags (BS/CON/MW) + CF-sink + CREW-4 (agent-invisible); GoldMap v0.4 priors.

**S1-10 · [AI] Content config → JSON (US-3.4).** Externalise the questionnaire to JSON; swappable without code.

**S1-11 · [REVIEW] Approve infra + instrument.** Confirm deploy works, RLS is anonymous-safe, and the v4.2 content loads correctly.

**S1-GATE** — ✓ app deploys on push · ✓ RLS blocks cross-rep reads & stores no PII · ✓ v4.2 instrument (personas/depth/tags/CF-sink/CREW-4) loads from config · ✓ offline queue holds & syncs.

---

# SPRINT 2 · The agent read — capture

**S2-0 · [SM] Sprint-start checklist.**

**S2-1 · [AI] Welcome screen (US-4.1).** Approved copy + "Let's get it down →"; first-run only.

**S2-2 · [AI] Badge claim + lock (US-4.2).** 12 coins; pick → "You're the Fox" → lock; opaque token; never a score.

**S2-3 · [AI] Guest-select + Q1 grounding (US-4.3).** 9 personas + descriptors; grounding folded into Q1; no PII.

**S2-4 · [AI] The read — one-question-at-a-time + gold-tagged options (US-4.4).** ~10 options + quiet CF-sink; persona chip; corner badge; dot rail (no counter); tags invisible.

**S2-5 · [AI] Question-type renderers (US-4.6).** single / multi:N / observer / kano / rank / scale5 — each renders + writes to the correct table.

**S2-6 · [AI] Count-or-quote free-text (US-4.5).** Verbatim field per question; stored exactly; no coding/AI.

**S2-7 · [AI] Depth fork (US-4.7).** Offered once after CORE; "A few more →" / "See your read →".

**S2-8 · [AI] Capture integrity (US-4.10).** Every write badge-token-only, no PII; raw rows; verified against the anonymity guarantee.

**S2-9 · [HUMAN] Real-iPad capture check** *[20 min]*
① Open the live URL on a **real iPad** (Safari).
② Claim a badge → pick a persona → answer a full CORE read, using the free-text field once.
③ Take the depth fork both ways on two runs.
✓ Every tap works, text is easy to enter, nothing is cut off; no crash on the badge tray.
⚠ Note any glitch for the S6 fix list — do not block the gate for cosmetic issues.

**S2-10 · [REVIEW] Approve the capture flow.**

**S2-GATE** — ✓ an agent completes a read end-to-end on a real iPad · ✓ answers land in Supabase, **anonymous, raw, no PII** · ✓ gold tags never shown to the agent.

---

# SPRINT 3 · Payoff, replay & observability

**S3-0 · [SM] Sprint-start checklist.**

**S3-1 · [AI] RosaeNLG on-device story (US-4.9).** In-browser generation from the agent's own answers; **nothing sent externally**; bounded to answers; graceful fallback.

**S3-2 · [AI] End-of-read — five beats (US-4.8).** Threshold → dossier+volume → story → constellation → gallery/gratitude; neutral signature; "Read another guest →"; constellation scaled to floor; counts never names.

**S3-3 · [AI] Re-entry (US-5.1).** "Welcome back, Fox"; no re-claim; "Change badge".

**S3-4 · [AI] Coverage wall (US-5.2).** Gaps-first; status bands ("Do you know them? / Started / Known well"); Fox pins; count-only recognition line.

**S3-5 · [AI] Completed-range (US-5.3) + replay loop (US-5.4).** "This is plenty"; never nags; wall → clean list → read loop.

**S3-6 · [AI] Observability v2.0 taxonomy + instrumentation (US-9.1, US-9.2).** v2.0 events; `mask_all_inputs:true`; `sendDefaultPii:false`; no PII in payloads.

**S3-7 · [HUMAN] Confirm analytics are flowing** *[10 min]*
🔗 `https://us.posthog.com` (or your region) → your project → **Activity / Events**.
① Do one full read on the live site.
② In PostHog, open **Activity** and watch for the read's events (badge claimed, read started, depth choice, read finished).
✓ Events appear, and **no free-text answer content is visible** in any event (inputs masked).

**S3-8 · [AI] Health metrics (US-9.3).** Completion, depth opt-in, coverage as operational % (not findings).

**S3-9 · [HUMAN] Real-iPad payoff check** *[15 min]* — run a full read on the iPad through the **five-beat end-of-read** and the **coverage wall**. ✓ The story generates on-device, the constellation is honest (no fake agreement), and the wall reads gaps-first.

**S3-10 · [REVIEW] Approve the full agent journey.**

**S3-GATE** — ✓ full journey playable (welcome → … → end-of-read → coverage wall) on a real iPad · ✓ RosaeNLG story stays on-device · ✓ v2.0 events flow, inputs masked.

---

# SPRINT 4 · The Findings Engine  *(deterministic · compute-on-open)*

**S4-0 · [SM] Sprint-start checklist.**

**S4-1 · [AI] Gates 1–3 — validity · convergence floor · dedupe (US-6.1).** Floor = ≥3 distinct reps + majority; below-floor → early-signals; fragments excluded.

**S4-2 · [AI] Gate 4 — tag-driven synthesis (US-6.2).** Findings from BS/CON/MW; **fully deterministic** (same input → same output); no coding/AI.

**S4-3 · [AI] CF-sink suppression + CREW-4 gating (US-6.3).** Table-stakes → confirmations only; crew items gated.

**S4-4 · [AI] Count-or-quote aggregation (US-6.4).** Structured self-count (raw); verbatim items as quotes.

**S4-5 · [AI] Report skeleton + finding→reads lineage (US-6.5).** Six-part skeleton; lineage stored (feeds Phase-2).

**S4-6 · [AI] Guardrail enforcement (US-6.6).** Raw counts, never % / names; in-house-only; small-N guarded.

**S4-7 · [AI] Compute-on-open orchestration (US-6.7).** Computes on GM open; no researcher trigger; **no external processor**.

**S4-8 · [AI] Early-signals + confidence (US-6.8).** Thin → "watch"; witnessed vs inferred; convergent-belief-not-fact.

**S4-9 · [AI] Seed a simulation dataset.** Generate simulated reads across personas (simulation-only — no live guests) to exercise every gate, including empty-desk and split-belief cases.

**S4-10 · [HUMAN] Sanity-check the computed report** *[20 min]*
① On the seeded data, open the report (the AI will give you the exact key chord).
② Read down the findings.
✓ Every finding ends at "what this reveals" (**no recommendations**); ✓ counts are raw (e.g. "6 of 9"), **never %, never a name**; ✓ Wi-Fi/clean-room appear only as confirmations; ✓ thin items sit in "early signals," not the headlines.
⚠ If any finding names a rep or shows a %, **stop** — that's a guardrail failure, not a cosmetic bug.

**S4-11 · [REVIEW] Approve the engine output** against Output-Spec v0.2.

**S4-GATE** — ✓ deterministic report computes from seeded reads · ✓ all guardrails hold (counts-never-%/names, findings-not-recommendations, CF-sink, small-N, no-AI, compute-on-open) · ✓ lineage stored.

---

# SPRINT 5 · Admin surfaces

**S5-0 · [SM] Sprint-start checklist.**

**S5-1 · [AI] GM locked access — Ctrl+Alt+A + PIN + auto-lock (US-7.1).** Key chord + PIN gate; auto-lock on exit/idle; no discoverable entry.

**S5-2 · [HUMAN] Set the GM PIN** *[5 min]*
① The AI will show you where to enter it (a one-time setup field).
② Choose a **4–6 digit PIN** the GM will use; type it in and confirm.
③ Write it on paper for the GM hand-off — **do not** email or Slack it.
⚠ There is no "forgot PIN" recovery in the pilot; keep the paper copy safe.
✓ Entering the PIN after Ctrl+Alt+A opens the report; a wrong PIN is refused.

**S5-3 · [AI] GM Findings Report render (US-7.2, US-7.3, US-7.4).** Six-part skeleton on the light dossier canvas; quote-led findings; lever + confidence chips; findings-not-recommendations; in-house self-serve.

**S5-4 · [AI] Researcher locked access — Ctrl+Alt+R + PIN + auto-lock (US-8.1).**

**S5-5 · [HUMAN] Set the Researcher PIN** *[5 min]* — same as S5-2, but this PIN is **yours** (the researcher's). Keep it separate from the GM's. ✓ Ctrl+Alt+R + your PIN opens the Console.

**S5-6 · [AI] Researcher Console — six lenses (US-8.2, US-8.3).** Coverage/convergence · integrity + fragment flags · agent activity · app health · GM activity · what-to-change; light dossier.

**S5-7 · [AI] Validation capture + exports + GM open-log (US-8.4, US-8.5, US-8.6).** GM-reaction capture (simulation-only validation); CSV + PDF exports; GM opens/dwell (no content tracked).

**S5-8 · [HUMAN] Walk both surfaces** *[15 min]*
① Ctrl+Alt+A + GM PIN → read the report as the GM would. Then close and confirm it **auto-locks**.
② Ctrl+Alt+R + your PIN → open the Console; check the six lenses populate from the seeded data.
✓ Both surfaces are reachable only with the right chord + PIN, and both auto-lock.

**S5-9 · [REVIEW] Approve both admin surfaces.**

**S5-GATE** — ✓ GM reads the report via Ctrl+Alt+A + PIN (auto-locks) · ✓ Researcher monitors via Ctrl+Alt+R + PIN (auto-locks) · ✓ Console lenses populate · ✓ no cross-access between the two.

---

# SPRINT 6 · QA · iPad · UAT · pilot

**S6-0 · [SM] Sprint-start checklist.**

**S6-1 · [AI] Downtime + config-error screens (US-10.1).** Agent offline (reassure-first) + admin config-error; never blames the agent.

**S6-2 · [AI] QA + Playwright visual regression (US-10.3).** Visual regression on key surfaces; core-flow smoke tests; CI-gated.

**S6-3 · [AI] Build the UAT script + iPad test checklist (for US-10.2 / 10.4).** Step-by-step scripts the human will run.

**S6-4 · [HUMAN] Real-iPad full-journey test (US-10.2)** *[45 min]*
① On a **real iPad**, work the AI's checklist end-to-end: claim badge → read several personas → depth both ways → end-of-read → coverage wall → re-entry.
② Force an **offline** moment (turn Wi-Fi off mid-read) → confirm the "your answers are safe" screen, then reconnect and confirm the read syncs.
③ Note every glitch with a screenshot in the Bug Log.
✓ No blocker on the journey; the badge tray doesn't crash; text entry is comfortable.
⚠ This is the mandatory real-device pass — desktop-only is never sufficient.

**S6-5 · [AI] Fix the iPad/QA blockers** surfaced in S6-4.

**S6-6 · [HUMAN] Run UAT (US-10.4)** *[30 min]* — execute the UAT script; mark each case pass/fail; hand fails back to the AI. ✓ All must-pass cases green.

**S6-7 · [HUMAN] Pilot launch at The Cascade (US-10.5)** *[runbook — ~30 min]*
① Confirm the live URL loads on the actual **front-desk device(s)**; install the PWA to the home screen.
② Hand the GM their **PIN** (paper) and show them Ctrl+Alt+A once.
③ Brief the desk: pick a guest you know, answer as them, a few minutes, stop and come back whenever. (Anonymous — no names.)
④ Confirm the **first real read** completes and lands in Supabase.
✓ Pilot is live; first session confirmed end-to-end (capture → engine → report).

**S6-8 · [HUMAN] Debrief + Phase-2 decision (US-10.6)** *[after the pilot window]*
① Open the Console (Ctrl+Alt+R + PIN); review coverage, integrity flags, and GM activity.
② Deliver **collective recognition** to the desk in the debrief (the front desk's knowledge produced these findings) — never single anyone out.
③ Record the **Phase-2 go/no-go** decision (incl. whether to activate the finding-loop, UC-05).
✓ Debrief done; decision logged.

**S6-9 · [REVIEW] Close-out.** Confirm artifacts filed; backlog/timeline reflect actuals.

**S6-GATE** — ✓ real-iPad pass complete · ✓ UAT green · ✓ pilot launched & first session confirmed · ✓ debrief delivered · ✓ Phase-2 decision recorded.

---

## Phase 2 (deferred — post-pilot)

**UC-05 finding-loop (US-11.1)** — per-agent "your read became a finding," using the lineage already built in S4-5. Activated post-pilot only if the Phase-2 decision (S6-8) is go. No rework required.

---

*GuestIQ · Master Development Timeline v6.0 · reconciled to Backlog v4.0 · 7 scope-driven sprints · owner-coded · human steps carry click-by-click instructions · real-iPad validated · no Edge Functions · $0 hosting*
