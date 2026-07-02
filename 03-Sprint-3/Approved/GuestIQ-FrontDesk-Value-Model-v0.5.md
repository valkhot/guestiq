# GuestIQ — Front-Desk Agent Value Model (v0.4)

| | |
|---|---|
| **Artifact** | GuestIQ-FrontDesk-Value-Model — v0.5 (reconciliation Stage 1) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Supersedes** | v0.4 |
| **Status** | Reconciled to the locked experience. Describes the *why*; references the lock docs / Experience Spec for the *what*. |
| **Implements (canon)** | Questionnaire v4.1 · Output-Spec v0.1 · Front-Desk Value Model lineage |
| **Detailed in (references)** | Agent & GM Experience Spec v1.0 · End-of-Read Design LOCKED v1.0 · the agent-surface mockups |
| **Changes in v0.5** | Folds in **Scope Decision: Finding-Loop & Return v1.0**: the per-agent **finding-loop** and **cross-session return escalation** → **Phase-2**; **lineage kept**; recognition shifts to the **collective / GM-debrief** channel; the coverage wall reframed as **within-window**; depth confirmed **mid-read only** (removed from the completed-range wall). |
| **Drift rule** | This model states the agent-value rationale and the locked forms; it references the lock docs / Experience Spec for full detail rather than restating them. |

---

## 0 · Why this artifact exists

The pivot defined value for the **GM** (the buyer) but left the **front-desk agent** — the person who actually fills in the instrument — without a defined reason to participate, finish, or return. That motivation is **upstream of everything**: no participation → no convergence → no findings → no GM value. This model defines the agent's value and is now reconciled to the surfaces designed and locked for it.

**Pilot scope.** The pilot is a **burst-contribution** tool — agents contribute in one session or across a few sessions in a short window, and do **not** return afterward. Return-dependent mechanics are therefore deferred to Phase-2 (see §4.4, §5.4; Scope Decision: Finding-Loop & Return v1.0).

## 1 · The design north star

> **Agents are experienced people who feel invisible. Their reward is recognition of expertise — and proof that, this time, what they know does not vanish into a void.**

Intrinsic only (no guaranteed perks). The experience must be **easy, fun, and positive enough that agents talk about it** — peer word-of-mouth is the coverage engine.

## 2 · Who we design for

Mostly long-tenured veterans + ~1/3 newer (under a year); they feel invisible; competitive *and* collegial; each knows several guest types; replay matters most for coverage; management can offer intrinsic recognition only; they have never seen the app — first impression is everything.

## 3 · The motivational spine

**Competence** ("I'm good at this") · **Autonomy** ("I chose this guest") · **Relatedness** ("my people see me") · **Visibility** ("I'm no longer invisible" — the one that matters most here).

---

## 4 · The value model

### 4.1 · The reframe (the foundation)
Not a survey. The agent is the property's **expert witness on its guests.** It never asks if they're satisfied; it asks **what they've learned.**

### 4.2 · The spine — the coverage wall
The coverage map is realized as a **wall of the desk's guests**, each a portrait frame in one of three qualitative states — **vivid** (well known) · **forming** (a few reads) · **empty frame** (not yet heard). The **empty frames are the call to action** (a far stronger pull than "0 responses"). It **unifies two views** — team coverage + the agent's private "expertise on record" (their own frames pinned with their badge), with a *just-yours* toggle. **Status bands, never counts; no leaderboard.** Within the pilot it is the agent's **within-window front door** — a "where can I still help?" map plus their same-window growing portfolio (not a cross-day return surface — see §5.4).

**Completed-range state.** When an agent has put down every guest they genuinely know, the wall **stops recruiting and reframes to completeness** ("your whole range, on record"), redirects energy to **watching the desk fill in**, and **never nags toward guests they don't know** (which would pull in thin, guessy data). The empty frames there read as *the team's to fill*, not *you're unfinished.* Recognition here is **collective and makes no promise** — it does **not** tell the agent they'll be notified when reads become findings (§4.4). Depth is **not** offered here — depth lives mid-read only (§9).
*Detail: Experience Spec §2.5; mockups (Coverage Wall, Completed-Range).*

### 4.3 · The reward — the end-of-read sequence (LOCKED)
The single richest moment, and the reason agents return. A continuous, skippable cinematic sequence — one object (their guest) transforming through five beats:
**threshold → dossier + volume → the guest comes alive (generated story) → the desk recognizes them (constellation reveal) → the cast grows + gratitude/hook.**
This **absorbs the former "convergence reveal" and "mirror"** into one staged moment: the *mirror* is the dossier ("what you put on record"); the *reveal* is the constellation, **confidence scaled to the floor** (first-on-record / forming / full / split), **counts never names**. Rich at N=1 — four of five beats need only the agent's own answers — so **cold-start is solved.**
*Fully specified in End-of-Read Design LOCKED v1.0.*

### 4.4 · Recognition — collective, via debrief (the per-agent finding-loop is Phase-2)
**For the pilot, the per-agent finding-loop is WONT-DO → Phase-2.** It depended on agents *returning after the report is generated* (findings only exist post-pilot), which the one-window burst pattern won't produce — a "your read became a finding" message would wait for a return that never comes (Scope Decision v1.0).

For the pilot, the recognition that a contribution mattered is delivered **collectively, through the GM debrief** — *"the front desk's knowledge produced these findings"* — true, team-level, and reaching everyone regardless of return. An optional within-session collective note ("the desk's reads are building something the GM will see") may reinforce it.

**The finding→reads lineage is still built** — cheap, good provenance, it powers a researcher-side "which reads drove which findings" audit and any Phase-2 loop. Only the agent-facing promise is deferred. The per-agent loop returns in Phase-2 if the tool becomes habitual.

### 4.5 · Talkability
The reveal is **social currency** (a clean, recountable line); validation of a quiet frustration is the most shareable emotion; the wall gives friendly comparison. Buzz happens in the break room, on the agent's terms — never an in-app feed.

---

## 5 · The agent journey

### 5.1 · Identity — the badge
Agents use **shared front-desk PCs**, so identity is a **badge**: an anonymous animal + colour (e.g. 🦊 Fox), **never a name**. Claimed once; **tapped each session** with the last-used badge highlighted on that PC. **Fully anonymous** — pseudonymous token, no PII, no offline key. The badge **rides in the corner of every read screen** so the agent never has to *remember* it (a glance, not a memory test — and quiet reassurance "this is recorded as me"). It is *used*, not just assigned — named at claim ("You're the Fox") and at grounding ("Alright, Fox"). Identity marker only, never a score (§7).
*Detail: Experience Spec §2.1; Data Model & API v1.1.*

### 5.2 · First run — convert a skeptic
Hook-first, three screens: **hook (reframe + promise + anonymity line) → claim a badge → choose the guest you know (grounding folded in).** The hook flips three beliefs fast — *survey about me → my expertise* · *into a void → goes to the GM as what the desk sees* · *takes forever → a few minutes, my choice.* Copy is **tenure-neutral**; the promise is **truthful and modest** (never "management will act"). *Mockup: First-Run Onboarding.*

### 5.3 · The read — capture, kept clean
**Tap badge → choose guest (grounding on the same screen) → party as the first in-flow question → tiered items.** Depth is offered **once, mid-read, after CORE**, as a **compliment** — *"there's more on this guest if you want; you clearly know them"* — with finishing-at-CORE treated as a **complete, respected contribution** (never the "lite" version), and the deeper tiers as opt-in specialist questions. One read per persona; replay = a new guest type. The value layer **never reaches inside** the answering flow (§7). *Mockups: Second-Run Loop, Mid-Read Depth Invitation.*

### 5.4 · Replay — within the pilot window
The pilot is a **burst-contribution** tool: agents play a few personas in one session, or across a few sessions in a **short window**, and **do not return afterward** (Scope Decision v1.0). So replay is **within-window**: **tap badge → the wall → pick another guest → grounding (by name) → read → end-of-read.** The gallery still grows across the session, and the end-of-read's hook still pulls toward the next guest *in the same sitting.*

**Phase-2 (WONT-DO for pilot):** the *cross-session, habitual-return* escalation — the "since your last visit, the desk has filled in" narrative and the cross-day sharpening ending. That story assumes a personal return gap the pilot won't produce; the mechanics return in Phase-2 if the tool becomes habitual. *Mockup: Second-Run Loop (illustrates the Phase-2 escalation).*

---

## 6 · The newer third
Value = **learning by contributing**, left **implicit** — no newbie track (labeling backfires). Carried by the end-of-read (they see what veterans flagged) and the **OBS "my guess" on-ramp** (universal, stigma-free). Hook copy stays tenure-neutral. "Tool as onboarding" is a Phase-2 idea.

## 7 · The instrument boundary
**The instrument is a clean measurement tool; the value layer wraps it but never reaches inside.** Inside the answering flow: only neutral wayfinding (progress, save/resume, the corner badge, the depth fork as an option) — **no rewards, comparisons, or scores** (they would bias the data). They meet only at entry (which guest) and exit (the completed reads → reveal, wall, finding-loop).

## 8 · Privacy & trust
**Psychological safety is a data-quality requirement** — candor only exists if reads can't boomerang. **System anonymous by default; sharing is voluntary self-disclosure.** Agents see only aggregate patterns, never names; the badge carries **no PII and no key**; the promise is **honest and precise** (not "fully anonymous" in a way that's false — the app links reads to a badge to count people and run the finding-loop). No in-app feed. Small-N gating + the convergence floor mean **no finding ever traces to one person.** Honest limit: on a tiny desk a colleague *could* guess — mitigated, not made impossible; we stay transparent.

## 9 · Easy vs depth
**Breadth-first.** Most headline gold is in CORE; breadth is what clears the convergence floor — so **CORE is a complete, valued contribution**, and depth is **opt-in enrichment invited once, mid-read**, from the veterans who have it (§5.3), framed as recognition and rewarded by a richer reveal. **Depth lives mid-read only** — it is *not* offered from the coverage wall (including the completed-range state), and re-opening a finished read to extend it is a deferred ("maybe later") behavior, not a pilot one.

## 10 · Guardrails (non-negotiable)
No velocity rewards · reward genuine expertise and breadth, never raw count · one read per persona (replay = a new guest) · intrinsic-only · professional tone throughout · fun from meaning, not mechanics · **no gamification anywhere** · never manufacture buzz (a reveal is talkable only if true).

## 11 · The falsifiable value test
> *An agent completes the instrument — and returns for another guest type — **so that** the expertise they hold, which no system records and management has never seen, is **put on record, reflected back, validated against their peers, and carried to the GM as "what the front desk knows."***
Any feature that can't point back to this sentence is decoration.

## 12 · How it fits the system
Instrument v4.1 supports the model unchanged (self-chosen guest, per-persona structure, OBS/SD/FREQ tags, tiers, grounding, save/resume); the value layer wraps it (§7). Relies on the **pseudonymous badge** and one-read-per-persona (Data Model & API v1.1). Reuses the **same convergence** the GM report is built on — two stakeholders' value from one mechanism. Direct lever on the completion **health metric** (Product Value & North Star v1.0).

---

## 13 · Decisions log

| # | Decision |
|---|---|
| Coverage | Two views unified into one **portrait wall** (vivid/forming/empty); status bands, no counts, no leaderboard; **completed-range** reframes to completeness and never nags. |
| Reward | The end-of-read is the **locked five-beat sequence** (threshold → dossier+volume → story → constellation → cast/hook); absorbs the former reveal + mirror; rich at N=1. |
| Recognition | Per-agent **finding-loop → Phase-2** (return-dependent); pilot recognition is **collective, via the GM debrief**; **lineage kept**. |
| Identity | **Badge** model for shared PCs — anonymous animal+colour, tapped per session, persistent corner badge, fully anonymous (no key). |
| First run | Hook-first three screens: hook → badge → choose guest (grounding folded); tenure-neutral, truthful-modest promise. |
| Read flow | Party as first in-flow item; grounding folded into guest selection; **depth offered once mid-read** as a compliment; CORE is complete. |
| Return loop | Replay is **within-window** (burst pilot); the cross-session habitual-return **escalation → Phase-2**. |
| Pilot scope | A **burst-contribution tool, not a habit tool**; return-dependent mechanics deferred to Phase-2 (Scope Decision v1.0). |
| Privacy | Anonymous by default; honest-precise promise; no PII/no key; no in-app feed. |
| Instrument boundary | Value layer wraps, never reaches inside; in-flow = neutral wayfinding only. |
| Newer third | Implicit learning; no newbie track; OBS "my guess" on-ramp. |
| Easy vs depth | Breadth-first; CORE complete; depth opt-in mid-read only. |

## 14 · Remaining to confirm
1. **IRB consent placement** — whether a consent line joins the first-run hook (external IRB outcome).
2. **Live story generation** — from the agent's answers via **RosaeNLG (local, in-browser; no third-party AI)**, strictly bounded to what they said.
3. **Copy pass** — all placeholder copy provisional; one Lead-Researcher-led voice pass near the end.
4. **Re-open-to-deepen** — whether a finished read can later be extended from the wall (deferred; mid-read depth only for the pilot).
5. **Signature personalization** — neutral vs badge-personalized end-of-read signature.

---

*GuestIQ · Front-Desk Agent Value Model · v0.5 · Reconciled to the locked experience + pilot scope · The why; lock docs hold the what*
