# GuestIQ — Use Case Specifications (v3.1)

| | |
|---|---|
| **Document** | GuestIQ-Use-Case-Specifications — v3.1 (DRAFT · Stage 1 reconciliation · for Lead Researcher review) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Supersedes** | use_case_specifications v2.0 · Use Cases v3.0 |
| **Implements (canon)** | Questionnaire v4.2 · Output-Spec v0.2 · Front-Desk Value Model v0.5 · GM-Report.html |
| **References** | SRS v3.1 · Data Model & API v1.2 · Product Value & North Star v1.0 · End-of-Read Design LOCKED v1.0 · GM Report Access LOCKED v1.0 · Scope Decision: Finding-Loop & Return v1.0 |
| **Changes in v3.1** | UC-01 end-of-read → the locked five-beat sequence; badge → claim-and-lock/recognition; UC-02 reframed **within-window** + **re-entry** (recognition, not authentication); UC-03 access → **Ctrl+Alt+A + PIN + auto-lock** (fixes the stale "no SHIFT+CTRL+A" line) + report **auto-generated**; **UC-04 reframed** to *monitor & validate* (auto-generation, researcher out of the delivery path); UC-04 adds the **Console + validation capture**; **UC-05 → [PHASE-2]** (finding-loop deferred; lineage kept). FR references renumbered to v3.1. |
| **Prepared By** | Claude (AI Developer) |
| **Patched (Stage 1 sweep)** | Reconciled to **no-third-party-AI** + **compute-on-open** + **v4.2/GoldMap v0.4**: UC-04 step 1 drops **auto-coding/Option B** → **deterministic, tag-driven, no coding**; integrity check → **gold-tag/CF-sink integrity**; story noted as **RosaeNLG (local)**; "auto-generated" reads as **computed-on-open**. |
| **Date** | Sprint 4 planning — reconciliation Stage 1 |
| **Drift rule** | Steps reference SRS FR IDs and canon; they do not restate requirement detail. |

---

## 1 · Actors

- **A1 — GM / Sponsor** (the buyer): reads the Findings Report.
- **A2 — Lead Researcher**: generates and verifies the report; owns integrity.
- **A3 — Front-Desk Agent** (the respondent): contributes reads; receives recognition.

## 2 · Use-case index

| ID | Name | Primary actor | Replaces / status |
|---|---|---|---|
| **UC-01** | Agent contributes a read | A3 | old capture UCs (now projection model) |
| **UC-02** | Agent replays within the window | A3 | — (within-window coverage-driven replay) |
| **UC-03** | GM reads the Findings Report | A1 | **old UC-03 — manager dashboard (retired)** |
| **UC-04** | Lead Researcher monitors & validates the pilot | A2 | — (Console; report auto-generates) |
| **UC-05** | Agent learns their read became a finding | A3 | **[PHASE-2] — deferred (finding-loop)** |

---

## UC-01 · Agent contributes a read

- **Primary actor:** A3 — Front-Desk Agent
- **Goal:** record what they know about one guest type, answering *as* that guest.
- **Preconditions:** GuestIQ accessible on the front-desk PC.
- **Trigger:** the agent opens GuestIQ.

**Main success scenario**
1. *(First time — see E1)* Agent taps their **anonymous badge** (claimed from a fixed pool, claim-and-locked) so the read is attributed to the same anonymous person — no name, no login; the system shows the **claimed badges to recognize theirs**, and guards against picking a fresh one by mistake (FR-AGT-01/02; Data Model §2). The badge then **rides in the corner** of every screen (FR-AGT-03).
2. Agent chooses the **guest type they know** (L1). The same screen **grounds** them — "picture the real ones you've checked in; answer as them" — and may show a coverage-based "first/rare on record" line where coverage is sparse (FR-INST-02, 04; FR-AGT-07).
3. Agent begins answering. The **first item is party** (L2); a Family or Group add-on opens only if they pick family or group (FR-INST-05; see E6).
4. Agent answers the **tiered items** — **CORE** (a complete contribution); after CORE the system may offer **going deeper** once, as a compliment (PRO/EXPERT) — routed to the segment battery, with the relevant response types and follow-up tags (FR-INST-01, 07–11; depth fork FR-AGT-13; see E4).
5. Agent **completes** the read — one per persona (FR-INST-13).
6. System plays the **locked five-beat end-of-read**: **threshold → dossier + volume** (the mirror — "what you put on record") **→ generated story** (woven only from their answers — **RosaeNLG, local/in-browser, no third party**) **→ constellation reveal** (validation ✓ / distinction ★, confidence scaled to the floor, counts never names) **→ cast + gratitude/hook** (End-of-Read Design LOCKED v1.0; FR-AGT-09/10/11).

**Extensions**
- **E1 — First run:** hook-first onboarding (reframe + truthful modest promise + anonymity line → claim a badge → choose a guest, grounding folded in) before step 1, tenure-neutral copy (FR-AGT-04, 01).
- **E2 — Resume:** an in-progress read resumes at the last position (FR-INST-14).
- **E3 — "None / not this guest":** the agent uses the escape on an item (FR-INST-09).
- **E4 — Depth fork:** after CORE, a one-time "go deeper on this guest?" advances to PRO/EXPERT, framed as a compliment; finishing at CORE is a complete contribution; depth is mid-read only (FR-AGT-13).
- **E5 — Already covered:** if the agent already has a read for this guest, the system directs them to a different guest type (FR-INST-13).
- **E6 — Family/Group add-on:** when party (step 3) is family or group, the matching add-on block is inserted into the read (FR-INST-05).

**Postconditions:** a complete read is stored; coverage state advances; the reveal has been shown.

---

## UC-02 · Agent replays within the window

- **Primary actor:** A3 — Front-Desk Agent
- **Goal:** contribute a read for a *different* guest type they know, within the same session or the short pilot window, guided by where the desk needs coverage.
- **Preconditions:** the agent has contributed at least one read in this window.
- **Trigger:** the agent continues, or returns within the pilot window. *(Cross-session habitual return is [PHASE-2] — Scope Decision v1.0.)*

**Main success scenario**
1. Agent **re-selects their badge** from the claimed set (claimed badges stay tappable for re-entry — **recognition, not authentication**; FR-AGT-02).
2. System shows the **coverage wall** — the desk's guests as portrait frames (vivid / forming / empty) as **status bands**, plus the agent's private **"expertise on record"** (FR-AGT-05/06/07). No raw counts; no other agent's numbers.
3. Agent sees an **empty/forming guest type they know** ("the desk could use your read on X").
4. Agent selects it → enters **UC-01** for that guest type.

**Extensions**
- **E1 — Completed range:** if the agent has covered every guest they know, the wall reframes to **completeness** and stops recruiting toward guests they don't know (FR-AGT-08).

**Postconditions:** a new read for a new persona; the within-window gallery grows.

---

## UC-03 · GM reads the Findings Report

*(Replaces the retired manager dashboard — no dashboard, no panels. Access is the locked desk-only mechanism: **Ctrl+Alt+A + PIN + auto-lock**.)*

- **Primary actor:** A1 — GM / Sponsor
- **Goal:** understand the non-obvious patterns the front desk surfaced, to inform decisions that remain the GM's own.
- **Preconditions:** the report is **computed automatically on-open** (FR-RPT-10); the GM has the PIN.
- **Trigger:** at the shared desk PC, the GM presses **Ctrl+Alt+A** and enters the **GM-only PIN** (FR-GMA-01/02).

**Main success scenario**
1. GM opens the report via the combo + PIN; the open is **logged** for the researcher (FR-GMA-01/02/05).
2. Reads the **one-line synthesis** (FR-RPT-06).
3. Reviews **3–5 headline findings** — each: pattern · raw counts · verbatim quote · what-it-reveals · lever tag · confidence (FR-RPT-06).
4. Reviews **"early signals — watch"** and **"your instincts are right."**
5. Reviews the **confidence panel**; notes the **minimum-data caveat** if present (FR-RPT-07).
6. Reaches the closing line — **"The decisions are yours."** (FR-RPT-05 guardrail).
7. *(Optional)* exports / shares the report (FR-RPT-09).
8. On idle or navigate-away the report **auto-locks**; the next open requires the PIN again (FR-GMA-04).

**Extensions**
- **E1 — Below threshold:** the minimum-data caveat is shown; findings read as preliminary (FR-RPT-07).
- **E2 — Illustrative data:** the report is marked simulated, not real (FR-RPT-07).
- **E3 — Wrong PIN:** repeated wrong entries throttle/lock out (FR-GMA-03).

**Postconditions:** the GM is informed; the tool has issued **no recommendations** (findings only); the open was logged.

---

## UC-04 · Lead Researcher monitors & validates the pilot

- **Primary actor:** A2 — Lead Researcher (via the in-app **Researcher Console**)
- **Goal:** judge whether the pilot worked — healthy run, clean data, did it deliver value — and decide what to change.
- **Preconditions:** the pilot is running or has closed; reads collected.
- **Trigger:** the researcher opens the Console (throughout and after the pilot).

**Main success scenario**
1. *(System, automatic)* The engine **computes the Findings Report on-open** from collected reads via the **deterministic 5-gate pipeline** (FR-RPT-01–05) — **tag-driven Gate 4** (BS/CON/MW/CF; **CF-sink suppressed**; crew gated by CREW-4), **no free-text coding** (structured options *count*, verbatim items *quote* — Output-Spec v0.2) — and writes the **canonical skeleton** + lineage (FR-RPT-06/08), available for the GM to self-serve (UC-03). **No researcher trigger or delivery step, and no AI** (FR-RPT-10).
2. Researcher **monitors** the run in the Console — **app health, agent activity/engagement (per badge), GM activity** (J1; Researcher Value Model v0.2).
3. Researcher **reviews integrity** — fragmentation check, floor compliance, **gold-tag / CF-sink suppression integrity**, guardrails (J2). This is a **check for the researcher's confidence — it does not gate the GM's access**.
4. Researcher **captures the GM's reaction** in the Console (non-obvious? worth acting on?) after discussing the report — the **North Star** validation signal (J3). Collective recognition that the front desk's reads produced the findings is conveyed in that discussion (FR-AGT-15).
5. Researcher derives **iteration inputs** (J4) and **exports** the dataset — CSV (FR-RPT-09).

**Extensions**
- **E1 — Export failure:** clear error + retry + Sentry capture (FR-RPT-09).
- **E2 — Integrity problem found:** it informs iteration (J4); it does **not** withhold the GM's already-available report.

**Postconditions:** the researcher holds a verdict (did it work?) and iteration inputs; the GM's report was available automatically throughout; the dataset is exported.

---

## UC-05 · Agent learns their read became a finding — **[PHASE-2]**

> **Deferred to Phase-2 (Scope Decision v1.0).** The per-agent finding-loop depends on agents *returning after the report is generated*, which the pilot's one-window burst pattern won't produce. For the pilot, this recognition is delivered **collectively, via the GM debrief** (UC-04 step 4). The **finding→reads lineage is still built** (FR-RPT-08), so this use case can be activated in Phase-2 without rework.

*The Phase-2 behavior, for reference:*

- **Primary actor:** A3 — Front-Desk Agent *(system-initiated)*
- **Goal:** the agent learns their contribution reached the GM as a finding.
- **Preconditions:** a report has been generated; the agent's read fed a finding (lineage — FR-RPT-08); the agent returns.
- **Trigger:** the agent opens GuestIQ after report generation.

**Main success scenario (Phase-2)**
1. System identifies, via **lineage**, that the agent's reads fed a finding (FR-AGT-16).
2. On the agent's next visit, the system **truthfully** informs them, tied back to the reveal they remember (FR-AGT-16: truth-only + continuity).
3. System shows them the **anonymous finding** their read fed.
4. **Baseline** acknowledgment for every contributor; a **special callout** for headline contributors.

**Extensions (Phase-2)**
- **E1 — GM acknowledgment:** if the GM used the optional acknowledgment path, it is surfaced here (FR-AGT-17). The flow does not depend on it.

**Postconditions (Phase-2):** the agent sees their impact; no GM action was required.

---

## 3 · Traceability & supersession

- **Supersedes** use_case_specifications v2.0 and Use Cases v3.0. **UC-03 (manager dashboard) is retired** and replaced by UC-03 (GM reads the Findings Report, desk-only locked access).
- Capture use cases use the **projection model**; UC-01's payoff is the **locked five-beat end-of-read**.
- **UC-05 (finding-loop) is [PHASE-2]**; pilot recognition is collective via the debrief (UC-04). **UC-02 is within-window** replay.
- Every step references its governing SRS FR / canon / locked-design artifact.

## 4 · Open items

1. **Report delivery** — auto-generated, GM self-serves (FR-RPT-10, UC-03); the researcher's debrief is a **validation activity, not a delivery**. *(Resolved.)*
2. **Idle-timeout & lockout parameters** for GM auto-lock (FR-GMA-03/04) — concrete values to set (also flagged in GM Report Access LOCKED v1.0).
3. **Badge-fragmentation check** — the analysis-time verification in UC-04 step 4 belongs in the Test Plan (also SRS §10).

---

*GuestIQ · Use Case Specifications v3.1 · DRAFT · Stage 1 · Projection capture · Locked end-of-read · Desk-only GM access · Finding-loop Phase-2*
