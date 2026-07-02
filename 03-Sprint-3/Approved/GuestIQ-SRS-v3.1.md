# GuestIQ — Software Requirements Specification (SRS v3.1)

| | |
|---|---|
| **Document** | GuestIQ-SRS — v3.1 (DRAFT · Stage 1 reconciliation · for Lead Researcher review) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Supersedes & consolidates** | srs_functional_requirements v2.0 · srs_nonfunctional_requirements v1.2 · branching_logic_specification v1.0 (routing folded in as §5.1.2) · SRS v3.0 |
| **Implements (canon)** | Questionnaire **v4.2** · Output-Spec **v0.2** · GM-Priors-GoldMap **v0.4** · GM-Report.html · Front-Desk Value Model v0.5 |
| **References (locked design)** | Agent & GM Experience Spec v1.0 · End-of-Read Design LOCKED v1.0 · GM Report Access LOCKED v1.0 · Scope Decision: Finding-Loop & Return v1.0 |
| **Changes in v3.1** | Expanded FR-AGT into the locked agent surfaces (badge + corner badge, first-run, portrait wall + completed-range, five-beat end-of-read, depth fork, within-window replay); applied the scope decision (**finding-loop → [PHASE-2]** inline-tagged, **lineage kept**, recognition → collective debrief); added **§5.4 FR-GMA** (desk-only GM access) and extended NFR-SEC/OBS; recorded **badge-uniqueness mechanics** (claim-and-lock, recognition display, re-pick guard, conservative-failure property + researcher anomaly check) in FR-AGT-01/02 and §10; clarified **badge re-entry** (claimed badges stay tappable; re-entry is recognition, not authentication; merge also fails conservative); added **FR-RPT-10 automatic generation & self-serve** + Option B free-text labelling *(Option B later retired — see Patched row)*; added **§5.5 FR-RES** (Researcher Console — three monitoring lenses + integrity/validation/iteration) and **NFR-SEC-03**. |
| **Prepared By** | Claude (AI Developer) |
| **Patched (Stage 1 sweep)** | Reconciled to the **no-third-party-AI** decision + **Questionnaire v4.2** + **GoldMap v0.4**: FR-RPT-04 now **tag-driven** (BS/CON/MW/CF-sink, GoldMap v0.4); FR-RPT-05 **retires auto-coding/Option B** → **count-or-quote + CF-sink suppression**; FR-RPT-10 reframed to **compute-on-open** (client-side, no server, no scheduler — Architecture v1.1); FR-AGT-10 story → **RosaeNLG (local), no third party**; FR-INST-04 adds **airline crew + executive/VIP** (9 L1 + CREW/VIP batteries); FR-INST-08 observer example now **optional**; FR-RES-05 coding-sanity → **gold-tag/CF-sink integrity**. Instrument citations now read **v4.2**. *(Audit follow-up: Value-Model cross-references repointed v0.3 → **v0.5** canon; H1 heading corrected to v3.1.)* |
| **Date** | Sprint 4 planning — reconciliation Stage 1 |
| **Drift rule** | This SRS **states requirements and references canon / locked-design docs by ID**; it does not restate their content. Where detail is needed, the cited artifact is authoritative (per Risk R-13 / DoR v1.2). |

---

## 1 · Purpose & scope

This document specifies what the GuestIQ system **must do** after the product pivot. GuestIQ captures the tacit guest knowledge held by front-desk agents — via a projection instrument in which an agent answers *as* a guest persona they know — aggregates it across distinct respondents, and produces a **GM Findings Report** that surfaces non-obvious, corroborated patterns the GM's existing systems cannot see. It serves two stakeholders: the **GM** (the buyer, who reads the report) and the **front-desk agent** (the respondent, whose value is defined in the Front-Desk Value Model v0.5).

Out of scope is restated in §9.

## 2 · Canon & references

The following are authoritative. This SRS implements them and must not contradict them:

- **Questionnaire v4.1** — the instrument + build spec (tiers, routing, batteries, response types, follow-up tags, grounding).
- **Output-Spec v0.1** — the report engine (5-gate pipeline, guardrails, report skeleton, confidence bands).
- **GM-Priors-GoldMap v0.4** — the obviousness filter (gate 4 input; tag-driven).
- **GM-Report.html** — the rendered reference report (the tonal/structural target).
- **Front-Desk Value Model v0.5** — the agent value layer (coverage map, reveal, finding-loop, privacy).

Related (reconciled separately): Data Model & API · System Architecture & Flows · Product Value & North Star · Use Case Specifications · Test Plan.

## 3 · Definitions

- **Respondent** — a front-desk agent contributing reads, identified by a stable **pseudonymous `respondent_id`** (no PII).
- **Persona / guest type** — the guest segment an agent answers *as* (set by L1 routing).
- **Read** — one respondent's complete set of answers for one persona.
- **Distinct-respondent counting** — analysis counts distinct people, never sessions.
- **Convergence floor** — the evidence bands governing what may be reported (Finding / Directional / Not-reportable), per Output-Spec.
- **Finding** — a pattern that clears the floor and the obviousness filter and appears in the GM report.
- **Gold map** — the model of GM priors used to demote the obvious and headline the non-obvious.

## 4 · Product overview

Three subsystems, one flow: the **Instrument** captures reads → the **Report Engine** aggregates and filters them into findings → the **GM Findings Report** is delivered to the GM. Wrapping the instrument (never reaching inside it) is the **Agent Value Layer**, which gives the respondent a reason to start, finish, and return. The instrument is a clean measurement tool; the value layer meets it only at entry (which guest) and exit (the completed reads).

---

## 5 · Functional requirements

### 5.1 · Instrument (FR-INST)

*Instrument canon is now **Questionnaire v4.2** (supersedes v4.1): anticipatable open items converted to **structured, gold-tagged** options; insight items kept **verbatim**; observer examples **optional**; **airline crew** and **executive/VIP** personas added. Inline "(v4.1 …)" citations below read as v4.2.*

**5.1.1 Entry, grounding, tiers**
- **FR-INST-01** — The instrument shall let a respondent self-select a depth tier **CORE → PRO → EXPERT**, where each tier answers its own block plus all lower tiers in one pass (Questionnaire v4.1 §Tiers). CORE is a complete, valid contribution.
- **FR-INST-02** — The instrument shall **present grounding** — picture real guests of the chosen persona and answer *as* them — **together with guest selection**, before answering begins (Questionnaire v4.1 §Grounding).
- **FR-INST-03** — Depth beyond CORE shall be offered as a **mid-flow opt-in** ("go deeper on this guest?"), not a front-loaded gate (Value Model v0.5 §9).

**5.1.2 Routing (folds in the former branching-logic spec)**
- **FR-INST-04** — The instrument shall route by **L1 (guest purpose)** — business · early-flight/late-arrival · planned holiday · Alaska cruise · event · medical · **airline crew** · **executive/VIP** · other — selecting the one segment battery shown (v4.2 §L1). The **crew** (CREW-1…4) and **VIP** (VIP-1…4) batteries are new; **CREW-4** is a segment-existence check that gates crew findings (GoldMap §14).
- **FR-INST-05** — The instrument shall capture **L2 (party)** as the **first in-flow item** — solo through family/group — opening the **Family add-on** or **Group add-on** only when family or group is selected (v4.1 §L2).
- **FR-INST-06** — Routing shall be deterministic and traceable: each respondent's L1/L2 selections and the resulting item set shall be recorded.

**5.1.3 Items & response types**
- **FR-INST-07** — The instrument shall support response types **single · multi:N · rank:2 · scale5 · kano · observer · text** (v4.1 §Response types).
- **FR-INST-08** — **Observer** items shall require a **category selection**; the free-text example shall be **optional** — collected as a verbatim quote when given, never required, never coded (v4.2 §Global changes).
- **FR-INST-09** — Every closed item shall auto-append **"Other"** and **"None / not this guest."**
- **FR-INST-10** — The instrument shall render inline **follow-up tags** where specified: **SD** (say-do), **OBS** (see often / sometimes / it's my guess), **FREQ** (v4.1 §Follow-ups). OBS values shall be stored for the report engine's observation grading.
- **FR-INST-11** — The instrument shall present the item blocks per tier: Core spine (P1–P10), Pro layer (P11–P21), Expert per-persona (P22–P25), the segment battery, and the property-level/TENURE block once per respondent (v4.1 §Structure). TENURE items shall appear only if the respondent confirms long service.

**5.1.4 Session, identity, persistence**
- **FR-INST-12** — The instrument shall capture a stable **pseudonymous `respondent_id`** enabling distinct-respondent counting and finding lineage (see NFR-PRIV).
- **FR-INST-13** — The instrument shall enforce **one read per respondent per persona**; a respondent may contribute additional reads only for *different* personas they know (Value Model v0.5 §10).
- **FR-INST-14** — The instrument shall support **save-and-resume**, restoring a respondent to their last position.
- **FR-INST-15** — Inside the answering flow, only **neutral wayfinding** (progress indicator, save/resume, grounding) shall appear — **no reward, comparison, or recognition elements** (Value Model v0.5 §7 / instrument boundary).

### 5.2 · Report engine (FR-RPT)

The engine implements the Output-Spec 5-gate pipeline. Each gate is a requirement:

- **FR-RPT-01** — **Gate 1 — Aggregate by distinct respondent.** Reads shall be aggregated per `respondent_id`; counting shall be of distinct people, never sessions (Output-Spec gate 1).
- **FR-RPT-02** — **Gate 2 — Convergence floor.** The engine shall classify each candidate pattern as **Finding** (≥3 distinct + majority), **Directional / "early signal"** (2, or 3 with plurality and no majority), or **Not-reportable** (1) (Output-Spec gate 2).
- **FR-RPT-03** — **Gate 3 — Observation grade.** The engine shall lead with witnessed patterns and mark inferred ones as directional even when counts are clear, using the OBS follow-up values (Output-Spec gate 3).
- **FR-RPT-04** — **Gate 4 — Obviousness filter (tag-driven).** The engine shall apply the Gold Map by reading each option's **gold tag** (BS / CON / MW / CF-sink): confirmations are demoted and **CF-sink picks suppressed**; contradictions and blind-spots are headlined; **crew findings are gated by CREW-4** (segment existence) (Output-Spec v0.2 gate 4 + GoldMap v0.4).
- **FR-RPT-05** — **Gate 5 — Guardrails.** The engine shall enforce: **findings, not recommendations** (no *do / add / cut / shift / reallocate / you should / we recommend*); **in-house-only** (never imply cutting or reallocating an amenity it cannot fully observe); **raw counts, never percentages**; **CF-sink suppression** (table-stakes "the usual…" picks collected but never surfaced); and **count-or-quote** — free-text is **never coded**: structured options *count*, verbatim items and optional examples are *displayed as quotes* (Output-Spec v0.2 gate 5). *(Auto-coding and the Option A/B fork are **retired**; the engine is fully **deterministic — no AI**.)*
- **FR-RPT-06** — The engine shall emit the report in the **canonical skeleton**: one-line synthesis → 3–5 headline findings (pattern · raw counts · verbatim quote · what-it-reveals · lever tag · confidence) → "early signals — watch" → "your instincts are right" → confidence panel → closing line "The decisions are yours." (Output-Spec skeleton / GM-Report.html).
- **FR-RPT-07** — The report shall carry a **minimum-data caveat** when distinct respondents are below the reporting threshold, and shall mark illustrative vs real data.
- **FR-RPT-08** — The engine shall retain **finding→reads lineage** (which `respondent_id`s fed each finding) for **researcher-side audit** and a **Phase-2 finding-loop (FR-AGT-16)**. The per-agent loop itself is deferred (Scope Decision v1.0), but the lineage is built regardless.
- **FR-RPT-09** — The report shall be **exportable** (the GM's shareable artifact); export failure shall be handled with a clear error, retry, and Sentry capture.
- **FR-RPT-10** — **Automatic generation & self-serve.** The report shall be **computed automatically on access** — *compute-on-open*, client-side and deterministic (Architecture v1.1), with **no researcher trigger and no researcher delivery step** — and made available for the GM to **self-serve** via desk-only access (FR-GMA). To the GM this is indistinguishable from a pre-generated report (it appears, ready, in <1s at pilot scale). The researcher's integrity review (Researcher Value Model v0.2 / the Console) is a **check, not a gate**: it informs iteration and never withholds the GM's report.

### 5.3 · Agent value layer (FR-AGT)

Implements the Front-Desk Value Model v0.5. Wraps the instrument; never reaches inside it (FR-INST-15). The pilot is a **within-window burst** experience; return-dependent items are tagged **[PHASE-2]**.

**5.3.1 · Identity — the badge**
- **FR-AGT-01** — **Badge claim & lock.** On first use the system shall let the agent claim an anonymous **badge** (animal + colour, never a name) from a **fixed pool**; the badge is the pseudonymous identity and carries **no PII**. A claimed badge shall be **removed from the *claimable* pool server-side** (so no new agent can claim it) but shall **remain tappable for re-entry** by a returning agent — *claim-and-lock* (NFR-PRIV-01; Data Model & API).
- **FR-AGT-02** — **Per-session tap & recognition.** On a shared PC the system shall ask "who's using this?" each session and present the **claimed badges** for the agent to **tap theirs to re-enter** (recognition over recall — not a single, misleading "last used" highlight). A separate **"claim a new badge"** path shows unclaimed badges for first-timers, guarded by a soft **re-pick prompt** — *"already have a badge? tap it instead."* **Re-entry is recognition, not authentication:** on a shared PC the system cannot prevent someone tapping a badge that isn't theirs; the only guards are low incentive (intrinsic rewards) and conservative failure (note below).
- **FR-AGT-03** — **Persistent corner badge.** During a read the system shall display the agent's badge quietly in the corner of every screen — an **identity marker only**, never a score or counter (FR-INST-15).

*Note — badge uniqueness is best-effort, not guaranteed.* True anonymity (no roster, no login) means the system cannot guarantee one-badge-per-person. **Claim-and-lock** (FR-AGT-01) prevents two agents *claiming* the same badge; **recognition + the re-pick prompt** (FR-AGT-02) reduce one agent **fragmenting** across two; but because re-entry is recognition not authentication, the system cannot prevent **merge** (someone tapping a badge that isn't theirs). Both directions **fail conservative** — fragmentation *inflates* and merge *deflates* the apparent distinct count, and **both make the convergence floor harder to clear** — so they can suppress a real finding but **never manufacture a false one**. A **researcher-side anomaly check** at analysis (§10) catches likely fragments.

**5.3.2 · First run**
- **FR-AGT-04** — **Hook-first onboarding.** On first use the system shall present three screens — **hook** (reframe + truthful, modest promise + anonymity line) → **claim a badge** → **choose the guest you know** (grounding folded in) — with **tenure-neutral** copy and no front-loaded reward mechanics (Value Model §5.2; Experience Spec §2.2).

**5.3.3 · The coverage wall**
- **FR-AGT-05** — **States.** The system shall present the desk's guests as a **wall of portrait frames** in three qualitative states — **vivid / forming / empty** — shown as **status bands, never counts**, never attributing reads to individuals; no leaderboard (Value Model §4.2).
- **FR-AGT-06** — **Unified views.** The wall shall unify team coverage with the agent's private **"expertise on record"** (their own frames pinned with their badge), with a *just-yours* toggle; an agent sees only their own breadth, never another's count.
- **FR-AGT-07** — **Pull + front door.** **Empty frames** shall serve as the call to action; within the pilot the wall is the agent's **within-window front door** — a "where can I still help?" map plus their same-window portfolio.
- **FR-AGT-08** — **Completed-range state.** When an agent has covered every guest they know, the wall shall **reframe to completeness**, redirect to **watching the desk fill in**, and **never recruit toward guests the agent does not know**. Recognition here is **collective and makes no promise** of later notification (FR-AGT-15). Depth shall **not** be offered from the wall (FR-AGT-13).

**5.3.4 · The end-of-read (LOCKED)**
- **FR-AGT-09** — **The sequence.** On completion the system shall present the locked five-beat end-of-read — **threshold → dossier + volume → generated story → constellation reveal → cast + gratitude/hook** (End-of-Read Design LOCKED v1.0). It shall never appear mid-instrument (FR-INST-15).
- **FR-AGT-10** — **Generated story.** The story beat shall be woven **strictly from the agent's own answers** using **RosaeNLG** (a local, in-browser, rule-based NLG library) — **no third-party AI and no data leaving the device** — bounded so it never invents and never puts words in the guest's mouth (Architecture v1.1).
- **FR-AGT-11** — **Constellation reveal.** The reveal shall show validation (✓ agreement) and distinction (★ solo insight) with **confidence scaled to the convergence floor** (first-on-record / forming / full / split), **counts never names**, never implying more certainty than the floor permits — the same convergence the report engine uses, in plain language.
- **FR-AGT-12** — **Cold-start.** The sequence shall be rich at **N=1**: four of the five beats depend only on the agent's own answers; the constellation degrades gracefully to "first on record."

**5.3.5 · Depth & replay**
- **FR-AGT-13** — **Mid-read depth fork.** After CORE, the system shall offer **once**, framed as a compliment, the option to go deeper (PRO/EXPERT) — with finishing at CORE presented as a **complete, respected contribution**. Depth is **mid-read only** — not offered from the coverage wall. *Re-opening a finished read to extend it is* **[PHASE-2]** (Value Model §9).
- **FR-AGT-14** — **Within-window replay.** The system shall support replay within the pilot window — badge → wall → another guest → read → end-of-read — the gallery growing across the session (Value Model §5.4).

**5.3.6 · Recognition (collective; per-agent loop Phase-2)**
- **FR-AGT-15** — **Collective recognition.** For the pilot, recognition that contributions mattered shall be delivered **collectively, via the GM debrief** ("the front desk's knowledge produced these findings"); an optional within-session collective note may reinforce it (Scope Decision v1.0).
- **FR-AGT-16** — **[PHASE-2] Per-agent finding-loop (system→agent).** A "your read became a finding" message on the agent's next visit. **Deferred** — depends on return after findings exist, which the burst pilot won't produce. Lineage (FR-RPT-08) is built regardless.
- **FR-AGT-17** — **[PHASE-2] Optional GM→agent acknowledgment.** A low-effort path for the GM to credit the desk. Deferred with the finding-loop.

**5.3.7 · Newer respondents**
- **FR-AGT-18** — **No newbie track.** Learning-by-contributing is implicit, carried by the end-of-read and the OBS "my guess" on-ramp (Value Model §6).

**5.3.8 · Instrument boundary**
- **FR-AGT-19** — The value layer shall **wrap** the instrument and **never reach inside** the answering flow; in-flow elements are limited to **neutral wayfinding** (progress, save/resume, corner badge, the depth fork as an option) — no rewards, comparisons, or scores (FR-INST-15; Value Model §7).

### 5.4 · GM report access (FR-GMA)

Implements **GM Report Access LOCKED v1.0**. Desk-only, locked.

- **FR-GMA-01** — **Discreet entry.** The report shall be reachable on the shared desk PC via **Ctrl+Alt+A**, with **no visible manager button**.
- **FR-GMA-02** — **PIN.** A **GM-only PIN**, set at deployment and never shared with the desk, shall be required to open the report; the key combination alone shall open nothing.
- **FR-GMA-03** — **Throttle.** Wrong-PIN attempts shall lock out after a small number of tries.
- **FR-GMA-04** — **Auto-lock.** The report shall **auto-lock** on idle timeout and on navigate-away; **every open shall require the PIN again** (no persistent session).
- **FR-GMA-05** — **Open tracking.** Each open shall be **logged** (timestamp, count) and surfaced to the Lead Researcher as an engagement signal; this is GM activity and shall carry **no agent PII** (NFR-OBS-01).

### 5.5 · Researcher Console (FR-RES)

Implements Researcher Value Model v0.2. An **in-app, locked** surface; it **reads** observability + report data and **never gates** the GM's auto-served report.

- **FR-RES-01** — **Console access.** The Console shall be reachable **in-app**, protected by a **researcher PIN** (separate from the GM PIN), with **auto-lock on idle** and **throttle on wrong PIN** (mirrors FR-GMA-02/03/04; NFR-SEC-03).
- **FR-RES-02** — **App-health lens.** The Console shall present **app health** — availability, errors/crashes, failed saves, response times, device/browser issues — from Sentry + PostHog (Observability v2.0 §3.1; NFR-OBS-01).
- **FR-RES-03** — **Agent-activity lens.** The Console shall present **agent activity per badge** — reads, time per read, time in app, sessions, depth opt-in, replay — plus coverage per guest type, completion rate, and drop-off. **Per-badge timings are a research signal, not performance:** never a ranking, never shown to agents or the GM (Researcher Value Model §6/§8).
- **FR-RES-04** — **GM-activity lens.** The Console shall present **GM report activity** — opens, re-opens, dwell, export — from the open-log (FR-GMA-05), carrying **no agent PII**.
- **FR-RES-05** — **Integrity lens.** The Console shall present **integrity checks** — the badge-fragmentation anomaly check, convergence-floor status, **gold-tag / CF-sink suppression integrity**, guardrail compliance. This is a **check for the researcher's confidence and shall not gate** the GM's auto-served report (FR-RPT-10).
- **FR-RES-06** — **Validation capture.** The Console shall let the researcher record, **per finding, a structured GM reaction** (*non-obvious? / would act?*) — the **North Star** signal. This capture is **researcher-only** and shall never be shown to the GM.
- **FR-RES-07** — **Iteration & export.** The Console shall surface **iteration inputs** and let the researcher **export** the dataset (CSV) and a console summary.
- **FR-RES-08** — **Anonymity.** The Console shall present only **pseudonymous badges**; it shall not deanonymize an agent (no PII, no key; NFR-PRIV-01).

---

## 6 · Non-functional requirements (NFR)

- **NFR-PRIV-01 — Pseudonymity.** `respondent_id` shall be stable and **carry no PII**; reads shall be linkable to it only for distinct-respondent counting and finding lineage (Value Model v0.5 §8; ERD to confirm).
- **NFR-PRIV-02 — Anonymity promise.** The system shall never display an individual's answers attributed by name to management or colleagues; only aggregate patterns are shown or exported. The first-run promise wording (v0.5 §8) shall match this behaviour exactly.
- **NFR-PRIV-03 — No in-app social exposure.** The system shall not auto-broadcast or expose read authorship between respondents; sharing is voluntary, real-world self-disclosure (v0.5 §8).
- **NFR-PRIV-04 — Small-N protection.** Reveals and coverage displays shall not expose breakdowns that could identify an individual at small N (v0.5 §4.3 / §8).
- **NFR-PERF-01 — Report generation.** The GM report shall generate within an acceptable interactive time at expected pilot data volumes (target to confirm in Architecture).
- **NFR-PERF-02 — Instrument responsiveness.** Item-to-item transitions shall be smooth on the target front-desk hardware and on mobile (real-device verified — Risk R-15).
- **NFR-REL-01 — Persistence.** Save-and-resume shall not lose answered data; tolerate intermittent connectivity (offline-tolerant capture, sync on reconnect).
- **NFR-A11Y-01 — Accessibility.** User-facing surfaces shall meet WCAG 2.1 AA (keyboard navigation, contrast, ARIA), per the retained accessibility standard.
- **NFR-OBS-01 — Observability.** Instrument, value-layer, and report events shall be instrumented (PostHog) and errors captured (Sentry) per the Observability spec, with IP anonymization and no PII. This includes **GM report-open events** (FR-GMA-05) — GM activity, no agent PII.
- **NFR-SEC-01 — Security.** Supabase access shall be via the service layer; no direct client calls from components (retained architectural discipline).
- **NFR-SEC-02 — GM report access.** The GM report shall be protected on the shared device by **PIN + auto-lock + throttle** (FR-GMA-02/03/04); it shall not be readable without the PIN, and no persistent session shall be retained.
- **NFR-SEC-03 — Researcher Console access.** The Console shall be protected by a **researcher PIN (separate from the GM PIN) + auto-lock + throttle** (FR-RES-01); its researcher-only data shall not be readable without the PIN.
- **NFR-TONE-01 — Professional tone.** All agent-facing copy shall hold the expert-witness register — no gamified or junior language; fun from meaning, never mechanics (v0.5 §10).

---

## 7 · Traceability & supersession

- This SRS **supersedes** the functional, non-functional, and branching-logic source documents (see header). On approval, those are retired; their still-valid decisions are carried here (per Reconciliation Impact Map §9.6).
- The old **dashboard requirements (former FR-065–080)** are **retired** — replaced by the Report Engine (§5.2). The old **79-question instrument FRs** are retired — replaced by §5.1 referencing Questionnaire v4.1.
- Every FR/NFR cross-references its governing canon artifact; the canon is authoritative for detail.

## 8 · North Star Metric (cross-reference)

The NSM is being reconsidered (completion-rate vs non-obvious-findings-delivered) in the **Product Value & North Star** doc (Stage 1a). This SRS references that decision rather than fixing it here. *(Open dependency.)*

## 9 · Out of scope / deferred

**Phase-2 (designed, deferred — Scope Decision v1.0; tagged inline above):**
- Per-agent finding-loop (FR-AGT-16) and optional GM→agent acknowledgment (FR-AGT-17).
- Cross-session habitual-return escalation (the "since your last visit" ending).
- Re-opening a finished read to add deeper tiers (FR-AGT-13).
- The "tool as staff-onboarding" product (Value Model §6).

**Out of scope (not built):**
- GM-side recommendations or actions (GuestIQ presents findings only).
- Any cutting/reallocation analysis (in-house-only).
- Guaranteed management perks (intrinsic-only).
- Old-model features: the 9-panel dashboard, the 79-question instrument, S3-16 enrichment.

---

## 10 · Open items for review

1. **NSM decision** (§8) — needed from the Product Value & North Star doc; affects success criteria.
2. **Pseudonymous `respondent_id`** (NFR-PRIV-01) — to be confirmed in the Data Model & API doc / ERD.
3. **Performance targets** (NFR-PERF-01) — concrete numbers to confirm in System Architecture.
4. **FR granularity** — this SRS deliberately references canon rather than enumerating every v4.1 item; confirm this level is the intended contract before Stage 1b specs are written against it.
5. **Badge-fragmentation anomaly check** — a researcher-side verification at analysis (flag badges with a single thin read as likely fragments) to sanity-check distinct counts (backs FR-AGT-01/02). Belongs in the **Test Plan**; recorded here so it isn't lost.

---

*GuestIQ · SRS v3.1 · DRAFT · Stage 1 reconciliation · Implements canon + locked design; states requirements, references detail*
