# GuestIQ — Product Backlog v4.0

| | |
|---|---|
| **Document** | Product Backlog v4.0 — full reconciled backlog (stories + acceptance criteria + re-estimated SP) |
| **Supersedes** | Product Backlog v3.1 — pre-pivot (branching / tiers / gamification / dashboard / third-party-AI) |
| **Anchor** | UC-Spec v3.1 (UC-01…05) · SRS v3.1 (FR-AGT / GMA / RES / RPT / DAT · NFR-TONE-01/02) · Architecture v1.1 (**no Edge Functions**) · Questionnaire v4.2 · GoldMap v0.4 · Output-Spec v0.2 · the 12 approved surfaces |
| **Hierarchy** | Epic → Feature → Story → (Task, untracked) · MoSCoW · Fibonacci SP (1,2,3,5,8,13) |
| **Sprint placement** | **Deferred to the MDT replan (Stage 2b)** — sprint count set by scope, not the old 6/14-week container |

---

### Owner legend

Every story has an owner. **AI Developer** = Claude / Claude Code builds it; the Lead Researcher reviews & approves via the mockup → approve → build workflow (so *all* AI stories carry an implicit human approval gate). **Lead Researcher** = a human performs the step — and **the AI provides detailed, click-by-click instructions for it in the Master Development Timeline** (numbered ①②③, exact URLs, verify checks), because the researcher is non-technical. **Scrum Master** = sprint ceremonies/gates.

The click-by-click *human instructions themselves* live in the **MDT (Stage 2b)**, not here — this backlog names the owner; the timeline tells the human exactly what to do.

**Distribution:** of 51 active stories, **~43 are AI-built** (human reviews/approves) and **~8 involve hands-on Lead-Researcher work** — concentrated in setup config (GitHub/PINs/keys) and E10 (real-iPad testing, UAT, pilot launch, debrief). Sprint 0 / Pre-Sprint human setup (E0/E1) is already complete.

---

## 1 · Summary

| Epic | Theme | Stories | SP | Status |
|---|---|---|---|---|
| **E0** | Governance & Sprint 0 | (carried) | 0 | ✅ done |
| **E1** | Environment & accounts | (carried) | 0 | ✅ done |
| **E2** | Data platform & PWA infra | 6 | 26 | ✅ S1 (US-2.5 → S2; US-2.6 note pending) |
| **E3** | The instrument as content | 4 | 19 | ✅ S1 (US-3.3 priors → engine/S4) |
| **E4** | UC-01 Agent contributes a read | 10 | 56 | ✅ S2 capture+complete · S3 end-of-read payoff (US-4.9 story → RosaeNLG deferred) |
| **E5** | UC-02 Replay within window | 4 | 16 | ✅ S3 (coverage merged into picker; depth re-reads; US-2.5 offline deferred) |
| **E6** | Findings Engine | 8 | 46 | new (crown jewel) |
| **E7** | UC-03 GM Findings Report | 4 | 18 | new |
| **E8** | UC-04 Researcher Console | 6 | 26 | new |
| **E9** | Observability & analytics | 3 | 11 | ✅ S3 PostHog events (US-9.3 metrics + Sentry deferred) |
| **E10** | Quality, pilot & launch | 6 | 21 | new / partial |
| **E11** | UC-05 Finding-loop | 1 | — | **[PHASE-2]** |
| | **Total (active)** | **51** | **239** | |

MoSCoW (active): **Must 40 · Should 9 · Could 0 · Phase-2 1**. SP shown per story below.

---

## 2 · Foundation epics (carried — complete)

**E0 · Governance & Sprint 0** — ✅ *complete via the reconciliation.* Methodology, JTBD (A1/A2/A3), North Star, the full canon doc suite (Charter v2.2, SRS v3.1, RACI, DoD/DoR, Risk, Stakeholder, Methodology, Use-Cases v3.1, Test-Plan, Data-Model), and the design session (12 approved surfaces + tokens + two canvases). Carried for traceability; **0 SP** of new work.

**E1 · Environment & accounts (Pre-Sprint)** — ✅ *complete.* Supabase · PostHog · Sentry accounts; Node/npm; VS Code workspace; project folder structure; Docx2MD; initial SQL migrations. **0 SP** of new work.

---

## 3 · E2 · Data platform & PWA infrastructure

**F2.1 Schema · F2.2 RLS · F2.3 PWA shell · F2.4 Deploy · F2.5 Offline · F2.6 No-Edge guardrail**

**US-2.1 · Reconcile Supabase schema to v4.2 capture** · MUST · **3 SP** · FR-DAT · **Owner:** AI Developer
*As the Lead Researcher, I want the four tables aligned to v4.2 count-or-quote capture, so reads store cleanly with no PII.*
- AC: `sessions`, `responses`, `scale_responses`, `none_flags` present; columns support persona, depth (CORE/PRO/EXPERT), option-id, verbatim free-text, none/CF flags; migration applied; **no name/PII columns anywhere**.

**US-2.2 · RLS + anonymous-safe writes** · MUST · **5 SP** · FR-DAT · **Owner:** AI Developer
*As the Lead Researcher, I want anonymous inserts with no client read-back of others' rows, so the desk stays anonymous by construction.*
- AC: anon key may insert; client cannot read other reps' raw rows; badge stored as an **opaque token, never a name**; policies unit-tested.

**US-2.3 · PWA shell (React 18 + Vite, installable)** · MUST · **5 SP** · **Owner:** AI Developer
- AC: manifest + service worker; installable; offline shell loads; passes PWA baseline; two-canvas theming wired (agent dark / admin dossier).

**US-2.4 · GitHub Pages deploy pipeline** · MUST · **3 SP** · **Owner:** AI Developer · **Lead Researcher** (enable GitHub Pages/permissions)
- AC: Actions build+deploy on `main`; SPA routing works on Pages; env vars injected at build; **$0 hosting**.

**US-2.5 · Offline queue + sync-on-reconnect** · MUST · **8 SP** · **Owner:** AI Developer
- AC: reads held locally when offline; auto-sync on reconnect; no data loss; drives the downtime screen's "your answers are safe / saves on its own".

**US-2.6 · No-Edge-Functions conformance** · MUST · **2 SP** · Architecture v1.1 · **Owner:** AI Developer
- AC: no serverless/edge code paths; all compute is client-side or plain Supabase queries; conformance documented so the report engine (E6) can't quietly reintroduce a processor.

---

## 4 · E3 · The instrument as content

**US-3.1 · v4.2 questionnaire data model** · MUST · **8 SP** · Questionnaire v4.2 · **Owner:** AI Developer
*As the Lead Researcher, I want the 9 personas × CORE/PRO/EXPERT depth encoded as data, so the read flow renders from config.*
- AC: personas + depth as data; all question types present (single / multi:N / observer / kano / rank / scale5); loads into the read; matches v4.2 exactly.

**US-3.2 · Gold-tagged options + CF-sink + CREW-4 (agent-invisible)** · MUST · **5 SP** · GoldMap v0.4 · **Owner:** AI Developer
- AC: options carry BS/CON/MW tags + CF-sink marker; CREW-4 gating flag; **tags never rendered to the agent**; consumed only by the engine.

**US-3.3 · GoldMap v0.4 GM priors** · MUST · **3 SP** · **Owner:** AI Developer
- AC: GM priors encoded as data; referenced by the engine's gate logic; matches GoldMap v0.4.

**US-3.4 · Content config (hardcoded → JSON)** · SHOULD · **3 SP** · **Owner:** AI Developer
- AC: questionnaire externalised to JSON config; swappable without code change; **no third-party CMS** in Phase 1.

---

## 5 · E4 · UC-01 · Agent contributes a read

**US-4.1 · Welcome screen** · MUST · **3 SP** · `Welcome` · **Owner:** AI Developer
- AC: approved copy; CTA "Let's get it down →" (brand exception to NFR-TONE-02); anonymity line; first-run only.

**US-4.2 · Badge claim + lock** · MUST · **5 SP** · `Onboarding-BadgeClaim` · `Full-Badge-Set-v2` · **Owner:** AI Developer
- AC: 12 coins render; pick → confirm "You're the Fox" → lock; stored as opaque token; **never a score**; no PII/login.

**US-4.3 · Guest-select (9 personas) + Q1 grounding** · MUST · **5 SP** · `GuestSelect-Grounding` · **Owner:** AI Developer
- AC: 9 persona cards + descriptors; tap → read; **grounding folded into Q1** ("picture one you know"), Q2+ "they"; no separate screen; no PII requested.

**US-4.4 · Read screen — one question at a time + gold-tagged options** · MUST · **8 SP** · `Read-Screen` · FR-AGT · **Owner:** AI Developer
- AC: one question at a time; ~10 options + one quiet CF-sink option; pinned persona chip; corner badge; quiet dot rail (no counter); **gold tags invisible**; NFR-TONE-02 plain language.

**US-4.5 · Count-or-quote free-text field** · MUST · **5 SP** · Output-Spec v0.2 · **Owner:** AI Developer
- AC: prominent verbatim textarea per structured question; stored **exactly as typed**; no coding/themes/AI; the only free text in the flow.

**US-4.6 · Question-type renderers (single / multi:N / observer / kano / rank / scale5)** · MUST · **8 SP** · **Owner:** AI Developer
- AC: each v4.2 type renders + captures correctly; multi:N enforces N; scale5/kano/rank per spec; writes to the right table.

**US-4.7 · Depth fork** · MUST · **3 SP** · `DepthInvitation-v2` · **Owner:** AI Developer
- AC: offered once after CORE; "A few more →" / "See your read →" (both forward); CORE affirmed complete; word "results" avoided.

**US-4.8 · End-of-read — five beats** · MUST · **8 SP** · `EndOfRead-v2` · EndOfRead-Design-LOCKED · **Owner:** AI Developer
- AC: threshold → dossier+volume → story → constellation → gallery/gratitude; **neutral signature**; "Read another guest →"; constellation scaled to convergence floor; counts never names; degrades to "first on record" on empty desk.

**US-4.9 · RosaeNLG on-device story generation** · MUST · **8 SP** · **Owner:** AI Developer
- AC: story generated **in-browser via RosaeNLG** from the agent's own answers; **nothing sent externally**; bounded to answers (no invention); graceful fallback if sparse.

**US-4.10 · Capture integrity (anonymity / no-PII writes)** · MUST · **3 SP** · **Owner:** AI Developer
- AC: every write carries badge token only, no name/PII; raw rows; verifiable against the anonymity guarantee.

---

## 6 · E5 · UC-02 · Replay within the window

**US-5.1 · Re-entry (returning agent)** · MUST · **3 SP** · `Onboarding-BadgeClaim` · **Owner:** AI Developer
- AC: "Welcome back, Fox"; **no re-claim**; "Change badge" escape for shared PCs; lands on the coverage wall.

**US-5.2 · Coverage wall** · MUST · **8 SP** · `CoverageWall-v2` · **Owner:** AI Developer
- AC: 9 frames, **gaps-first**; bands "Do you know them? / Started / Known well" — **status only, never counts, no leaderboard**; Fox pins on own reads; count-only recognition line (no denominator).

**US-5.3 · Completed-range state** · SHOULD · **3 SP** · **Owner:** AI Developer
- AC: when the agent's known range is read, reframes to "this is plenty"; the rest become "the desk's to fill"; **never nags** into guessy reads.

**US-5.4 · Coverage-driven replay loop** · MUST · **2 SP** · **Owner:** AI Developer
- AC: wall → clean guest-select list → read → end-of-read → wall; loops within the window; guest-select stays the picker.

---

## 7 · E6 · Findings Engine *(deterministic, compute-on-open)*

**US-6.1 · Gates 1–3 (validity · convergence floor · dedupe)** · MUST · **8 SP** · FR-RPT-01…03 · **Owner:** AI Developer
- AC: floor = **≥3 distinct reps AND a majority**; below-floor → "early signals" not findings; fragment/thin reads excluded from counts.

**US-6.2 · Gate 4 — tag-driven synthesis (BS/CON/MW)** · MUST · **8 SP** · FR-RPT-04 · **Owner:** AI Developer
- AC: findings assembled from gold tags; **fully deterministic**; identical inputs → identical output; no coding, no AI.

**US-6.3 · CF-sink suppression + CREW-4 gating** · MUST · **5 SP** · **Owner:** AI Developer
- AC: table-stakes (Wi-Fi/clean room) excluded from findings, surfaced only as confirmations; crew items gated by CREW-4.

**US-6.4 · Count-or-quote aggregation** · MUST · **5 SP** · Output-Spec v0.2 · **Owner:** AI Developer
- AC: structured options **self-count (raw)**; verbatim items surfaced as quotes; nothing coded or themed.

**US-6.5 · Report skeleton + finding→reads lineage** · MUST · **5 SP** · FR-RPT-06/08 · **Owner:** AI Developer
- AC: canonical six-part skeleton emitted; **lineage stored** (which reads produced each finding) — feeds Phase-2 UC-05 without rework.

**US-6.6 · Guardrail enforcement (raw counts, never % / names; in-house-only)** · MUST · **5 SP** · **Owner:** AI Developer
- AC: outputs raw counts, **never percentages, never names**; in-house-only backstop present; small-N guarded.

**US-6.7 · Compute-on-open orchestration** · MUST · **5 SP** · FR-RPT-10 · **Owner:** AI Developer
- AC: report computes **on GM open**; no researcher trigger, no delivery step, **no external processor** (client + Supabase only).

**US-6.8 · Early-signals + confidence classification (witnessed / inferred)** · MUST · **5 SP** · **Owner:** AI Developer
- AC: thin signals quarantined into "watch"; each finding tagged witnessed vs inferred; framed as convergent belief, not fact.

---

## 8 · E7 · UC-03 · GM reads the Findings Report

**US-7.1 · Locked access — Ctrl+Alt+A + PIN + auto-lock** · MUST · **5 SP** · FR-GMA · GM-Report-Access-LOCKED · **Owner:** AI Developer · **Lead Researcher** (set the GM PIN)
- AC: key chord + PIN gate; **auto-locks** on exit/idle; no discoverable link or menu entry.

**US-7.2 · GM Findings Report render** · MUST · **8 SP** · `GM-Findings-Report` · **Owner:** AI Developer
- AC: six-part skeleton; **light dossier canvas**; quote-led findings; lever + confidence chips; masthead + footer no-AI/no-guest-data lines.

**US-7.3 · Findings-not-recommendations + guardrail rendering** · MUST · **3 SP** · **Owner:** AI Developer
- AC: every finding ends at "what this reveals"; **no recommendations**; guardrails render (in-house backstop, CF-sink confirmations, thin-signal quarantine).

**US-7.4 · In-house-only self-serve** · MUST · **2 SP** · **Owner:** AI Developer
- AC: GM self-serves the auto-generated report; **no researcher delivery step**; in-house slice only.

---

## 9 · E8 · UC-04 · Researcher monitors & validates

**US-8.1 · Locked access — Ctrl+Alt+R + PIN + auto-lock** · MUST · **3 SP** · **Owner:** AI Developer · **Lead Researcher** (set the Researcher PIN)
- AC: mirrors the GM chord (R for Researcher); PIN + auto-lock; researcher-only.

**US-8.2 · Console — six lenses render** · MUST · **8 SP** · `Researcher-Console-v3` · **Owner:** AI Developer
- AC: coverage & convergence · data integrity · agent activity · app health · GM activity · what-to-change; **light dossier canvas**; real badge coins.

**US-8.3 · Integrity / convergence monitoring + fragment flags** · MUST · **5 SP** · **Owner:** AI Developer
- AC: floor status per persona; fragment flags on thin single reads; count-or-quote / no-AI / no-names checks shown pass/flag.

**US-8.4 · Validation capture (GM reaction, simulation-only)** · SHOULD · **5 SP** · **Owner:** AI Developer (build) · **Lead Researcher** (performs validation)
- AC: GM reaction captured for validation; validation is **simulation-only** (no live guests); logged for the debrief.

**US-8.5 · Exports (CSV dataset · console summary PDF)** · SHOULD · **3 SP** · **Owner:** AI Developer
- AC: researcher exports raw dataset (CSV) and a console summary (PDF); no PII in either.

**US-8.6 · GM open-log signals** · SHOULD · **2 SP** · **Owner:** AI Developer
- AC: opens + dwell only; **no report content tracked**; feeds the Console's GM-activity lens.

---

## 10 · E9 · Observability & analytics

**US-9.1 · Observability v2.0 event taxonomy** · MUST · **5 SP** · Observability-and-Analytics-Spec v2.0 · **Owner:** AI Developer
- AC: events per v2.0 spec (supersedes the old "27 named events"); named, documented, privacy-safe.

**US-9.2 · PostHog + Sentry instrumentation (privacy-safe)** · MUST · **3 SP** · **Owner:** AI Developer · **Lead Researcher** (confirm PostHog/Sentry keys)
- AC: `mask_all_inputs:true`; `sendDefaultPii:false`; events fire from Sprint-1 wiring onward; no PII in payloads.

**US-9.3 · Health metrics** · SHOULD · **3 SP** · **Owner:** AI Developer
- AC: completion, depth opt-in, coverage computed as **operational %** (explicitly not findings — the raw-count rule governs findings only).

---

## 11 · E10 · Quality, pilot & launch

**US-10.1 · Downtime + config-error screens** · MUST · **3 SP** · `Downtime-ConfigError` · **Owner:** AI Developer
- AC: agent offline (reassure-first, "Try again"); admin config-error ("ask the researcher"); never blames the agent.

**US-10.2 · Real-iPad test pass** · MUST · **5 SP** · *(standing lesson)* · **Owner:** **Lead Researcher** (runs on a real iPad — AI provides the test script)
- AC: **full agent journey validated on a real iPad**; badge-tray/crash checks; touch targets; fonts load; sign-off recorded.

**US-10.3 · QA + Playwright visual regression** · SHOULD · **5 SP** · **Owner:** AI Developer
- AC: automated visual regression on the key surfaces; core-flow smoke tests; CI-gated.

**US-10.4 · UAT script + pilot readiness** · MUST · **3 SP** · **Owner:** AI Developer (script) · **Lead Researcher** (runs UAT)
- AC: UAT script covering the agent journey + both locked admin surfaces; readiness checklist passed.

**US-10.5 · Pilot launch + first-session confirmation** · MUST · **3 SP** · **Owner:** **Lead Researcher** (launches at The Cascade — AI provides the runbook)
- AC: pilot deployed at The Cascade; first real read confirmed end-to-end (capture → engine → report).

**US-10.6 · Debrief + Phase-2 decision** · MUST · **2 SP** · **Owner:** **Lead Researcher** (runs debrief + records Phase-2 decision)
- AC: GM debrief delivers **collective recognition**; Console validation reviewed; Phase-2 go/no-go recorded.

---

## 12 · E11 · UC-05 · Finding-loop — **[PHASE-2]**

**US-11.1 · Per-agent "your read became a finding"** · PHASE-2 · *unestimated* · **Owner:** AI Developer — Phase-2
- AC: consumes the lineage built in US-6.5; agent sees their read became a finding; **deferred** (pilot's one-window burst won't produce returning agents) — recognition is collective via the debrief for the pilot; activates post-pilot without rework.

---

## 13 · What changed from v3.1 (traceability)

- **Removed:** Branching Logic + 84-path matrix · gamification (tiers/achievements/progress/hooks/episode-map) · Manager Dashboard · third-party-AI enrichment & auto-coding (Option B) · 79Q tiered survey · any Edge Function report path.
- **Added:** E3 v4.2 instrument-as-content · E4 designed agent journey · E5 coverage wall/replay · **E6 deterministic Findings Engine** · E7 GM Findings Report + locked access · E8 Console + locked access + validation · E9 Observability v2.0 · E2.6 no-Edge guardrail · NFR-TONE-02 acceptance criteria threaded through agent stories.
- **Kept (reconciled):** Supabase schema · PWA/Pages/offline · PostHog+Sentry · content-as-config · QA/iPad/UAT/pilot/debrief · Epic→Feature→Story + MoSCoW + Fibonacci.
- **Net:** 100 stories/230 SP (v3.1) → **51 active stories / 239 SP** (leaner story count — dead-model cruft removed — but the engine + designed surfaces carry real weight).

---

## 14 · Status (execution underway)

The MDT replan is **done** — these 51 stories are sequenced into **7 scope-driven sprints (S0–S6)** in **Master Development Timeline v6.0**. Since then: Design System v2.0 consolidated, designs↔canon sanity check closed, **Sprint 1 complete** (data platform + instrument; US-2.5 → S2, US-3.3 priors → engine/S4), and **Sprint 2 planned** (agent read / UC-01 — see Sprint 2 Plan).

**Current position:** ready to execute **Sprint 2, Increment A** (flow skeleton + Welcome + badge claim).

*GuestIQ · Product Backlog v4.0 · projection / no-third-party-AI · 51 active stories · 239 SP · sequenced in MDT v6.0 · S1 done · S2 planned*
