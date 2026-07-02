# GuestIQ — Test Plan (v2.0)

| | |
|---|---|
| **Document** | GuestIQ-Test-Plan — v2.0 (DRAFT · Stage 1 reconciliation) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Supersedes** | Test Plan v1.0 (S0-4.1 — the 84-path / tier / episode / dashboard plan) |
| **Implements / verifies** | SRS v3.1 (FR-INST, FR-RPT, FR-AGT, FR-GMA, FR-RES, NFRs) |
| **References** | Use Cases v3.1 · Observability v2.0 · Data Model & API v1.2 · Output-Spec **v0.2** · GM-Priors-GoldMap **v0.4** · the lock docs · the value models |
| **Changes in v2.0** | Catastrophic failure mode **reframed** (a wrong/non-compliant/de-anonymizing **finding**, not a routing error). **Primary instruments replaced**: the 84-path matrix → a **report-engine integrity protocol** (new most-critical), a simpler **v4.2 routing test**, and a **read-level data-integrity protocol**. New test areas for the **agent surfaces, badge identity, GM access, Researcher Console, anonymity, and real-device iOS**. NFR traceability re-mapped to the SRS v3.1 NFR set. Sprint schedule deferred to the MDT replan (Stage 2). |
| **Prepared By** | Claude (AI Developer) |
| **Patched (Stage 1 sweep)** | Reconciled to **no-third-party-AI** + **Questionnaire v4.2** + **GoldMap v0.4**: the **AI free-text-coder test is dropped** (no coder exists); the report-engine protocol now tests **tag-driven Gate 4 + CF-sink suppression + count-or-quote** on a **deterministic** engine; the **story test** verifies **RosaeNLG (local, nothing transmitted)**; new tests for **structured-capture conversion** and the **two new personas** (crew routing + **CREW-4 gate**, VIP discretion items); routing test reads **v4.2**. |
| **Drift rule** | References FR/NFR IDs and canon; does not restate requirement content. |

---

## 1 · Strategy & philosophy

**Behaviour-Driven TDD survives** — test specs precede implementation; tests are written in behavioural terms (what the system does, not how the code works). What changed is the **catastrophic failure mode**, and therefore the most-critical artifact.

> **The worst failure is no longer a routing error — it is the report engine emitting a finding that is wrong, non-compliant (a recommendation, a percentage, a name, a subtractive conclusion), or de-anonymizing.** GuestIQ now sells **credibility**; one bad finding in front of the GM destroys it. So the **report-engine integrity protocol** (§2.1) is the single most critical testing artifact, displacing the old 84-path matrix.

**Validation is simulation-based.** The report engine is verified against **controlled, seeded datasets** with known expected findings — you cannot confirm "correct findings" from live data alone. Live pilot reads also flow through, but gate correctness is proven on known inputs.

## 2 · The primary test instruments (replaced)

| Instrument | Purpose |
|---|---|
| **2.1 · Report-engine integrity protocol** *(the new most-critical)* | Seeded datasets with known expected output verify the **5 gates** (Output-Spec v0.2) on a **fully deterministic, no-AI** engine: distinct-respondent aggregation → convergence floor (Finding ≥3+majority / Directional / Not-reportable) → observation grade → **tag-driven Gate 4** (reads each option's BS/CON/MW/CF gold tag; **CF-sink picks suppressed**; **crew findings gated by CREW-4**) → **guardrails**. Guardrails tested explicitly: **findings-not-recommendations**, **raw counts never %**, **counts never names**, **in-house-only / no subtractive conclusions**, **count-or-quote** (free-text is **never coded** — structured *counts*, verbatim *quotes*), **small-N suppression at 3**. A finding that breaches any of these is a **critical** defect. *(Determinism is itself a test: identical input → identical report.)* |
| **2.2 · Instrument routing test (v4.2)** | Replaces the 84-path matrix. Verifies **L1 purpose routing** (now **9 personas** incl. **airline crew** and **executive/VIP**) and **L2 party routing** into the correct segment battery, with the right response types, **gold-tagged options**, and follow-up tags (FR-INST). Verifies the **CREW-4 segment-existence** answer correctly gates crew findings downstream. Far simpler than the old Module-5 matrix, but still the contract between Questionnaire **v4.2** and the code. |
| **2.3 · Read-level data-integrity protocol** | Traces complete **reads** end-to-end: badge → read → responses → Supabase → **distinct-respondent counting** → finding lineage. Includes the **badge-fragmentation anomaly check** (single-thin-read badges) and verifies distinct counts are honest (FR-AGT-01/02; Data Model v1.2). |
| **2.4 · Visual regression (Playwright)** | Retained — baseline screenshots of key screens after design is confirmed; any visual change fails CI. |

## 3 · Test areas (new model)

### 3.1 · The instrument (FR-INST)
Routing (§2.2 — 9 personas), tiers (CORE complete; PRO/EXPERT via the depth fork), response types (observer/kano/text + SD/OBS/FREQ tags), the "none / not this guest" escape, and **save-and-resume** (no lost data; NFR-REL-01). **Structured-capture conversion (v4.2):** verify converted items present their **gold-tagged option lists** with one **CF-sink** "the usual…" option; the **observer example is optional** (not required); multi-select items count each pick independently; the **crew (CREW-1…4)** and **VIP (VIP-1…4)** batteries render and route. Config validator rejects an untagged reportable option or a duplicate `cf_sink`.

### 3.2 · Agent value surfaces (FR-AGT)
- **Badge identity:** claim-and-lock (a claimed badge leaves the *claimable* pool but stays tappable for **re-entry**); the recognition display; the re-pick prompt; **re-entry is recognition, not authentication** (verify the system does not — and is not expected to — prevent tapping another's badge); fragmentation/merge both fail conservative.
- **First-run onboarding** — hook → claim → guest, tenure-neutral, truthful-modest promise, anonymity line.
- **End-of-read** — the five beats render; the **generated story (RosaeNLG, local/in-browser) is bounded strictly to the agent's answers** (FR-AGT-10 — verify no invention, never words in the guest's mouth, and **nothing transmitted to any third party**); the **constellation never implies more certainty than the floor** (counts never names).
- **Coverage wall** — three states; completed-range reframes to completeness and never recruits toward unknown guests; status bands never counts.
- **Depth fork** — offered once after CORE; CORE treated as complete; depth mid-read only.
- **Within-window replay.**
- **Instrument boundary** — no rewards/scores inside the answering flow.

### 3.3 · Report generation & access
- **Automatic generation + self-serve** (FR-RPT-10) — the report is **computed on-open** (deterministic, client-side; no researcher trigger, no server) and GM-self-served; verify it appears ready in <1s at pilot scale and the researcher's integrity review does **not** gate access.
- **GM access (FR-GMA)** — Ctrl+Alt+A + **GM PIN**; **auto-lock** on idle/navigate-away; **throttle** on wrong PIN; every open **logged** with no agent PII.

### 3.4 · Researcher Console (FR-RES)
Console behind a **researcher PIN** (separate from GM); the three lenses populate from live events (app health · agent activity per-badge · GM activity); the **validation capture** records per-finding GM reaction; **per-badge data is never a ranking and never leaves the Console**; no deanonymization.

### 3.5 · Anonymity & privacy (NFR-PRIV, NFR-OBS)
Zero PII anywhere; pseudonymous badge (no key); IP anonymization (PostHog `ip:false`, Sentry `sendDefaultPii:false`); masked inputs in replay; **the generated story is built in-browser (RosaeNLG) and never transmitted — and no answer content goes to any third-party AI service** (none exists); small-N protection in reveals/coverage; the first-run promise wording matches actual behaviour.

### 3.6 · Real-device testing *(standing lesson — elevated)*
- **Desk PCs (Chrome/Edge on Windows)** — primary; on-site at the property.
- **iOS Safari / WebKit on real iPads** — **mandatory on physical devices**: Chrome DevTools emulation does **not** reproduce iOS Safari/WebKit bugs. The badge-tray and mid-read flows must be exercised on a real iPad (this is where the known crash/glitch class appears). A pass in emulation is **not** a pass.

### 3.7 · Cross-cutting
Accessibility (WCAG 2.1 AA — axe-core + keyboard; NFR-A11Y-01), performance (Core Web Vitals + report-generation time; NFR-PERF-01/02), observability (the new event taxonomy fires correctly; NFR-OBS-01), security (service-layer only, PINs; NFR-SEC-01/02/03), code-quality gates (ESLint/Prettier), and **UAT** with 2–3 agents (clarity, engagement, professional tone; does the end-of-read land?).

## 4 · Scope

**In:** all FR areas above via functional cases; the SRS v3.1 NFRs via §6; the **deterministic** 5-gate report engine on seeded data (tag-driven Gate 4 + CF-sink suppression); **v4.2** routing (9 personas); structured-capture conversion; RosaeNLG story bounding; read-level data integrity incl. fragmentation; real-device iOS; accessibility; performance; anonymity; UAT.

**Out:** unit testing of pure functions (BD-TDD); load testing beyond pilot scale; penetration testing; multi-language; multi-property (PROP001 only); guest-facing deployment; **Phase-2 items** (per-agent finding-loop, cross-session escalation, re-open-to-deepen) — not built, not tested.

## 5 · Severity classification
**Critical** — a non-compliant/wrong/de-anonymizing **finding**; any PII leak; report or capture data loss; GM/Console access bypass. *(Fix before pilot.)*
**Major** — a surface broken on a supported device (incl. real iPad); a routing error; save/resume loss.
**Minor** — wording/cosmetic; defer.
**Observation** — qualitative engagement/tone insight; debrief input.

## 6 · NFR-to-test traceability (SRS v3.1)

| NFR | Verification |
|---|---|
| **NFR-PRIV-01** Pseudonymity / no PII | Supabase schema + PostHog/Sentry field audit — no PII; badge carries no key |
| **NFR-PRIV-02** Anonymity promise | No named attribution anywhere; first-run wording matches behaviour |
| **NFR-PRIV-03** No in-app social exposure | No authorship broadcast between agents |
| **NFR-PRIV-04** Small-N protection | Reveals/coverage never expose an individual at small N |
| **NFR-PERF-01** Report generation time | Timed on pilot-scale seeded data |
| **NFR-PERF-02** Instrument responsiveness | Real-device timing (desk PC + iPad) |
| **NFR-REL-01** Persistence | Save/resume across close/reopen and shared-PC handoff — no loss |
| **NFR-A11Y-01** WCAG 2.1 AA | axe-core scan + keyboard-only walkthrough |
| **NFR-OBS-01** Observability | New event taxonomy fires (Observability v2.0); no PII; report-open events |
| **NFR-SEC-01** Service layer | Code search — no direct Supabase calls in components |
| **NFR-SEC-02** GM access | PIN + auto-lock + throttle verified |
| **NFR-SEC-03** Console access | Researcher PIN + auto-lock + throttle verified |
| **NFR-TONE-01** Professional tone | Content review across surfaces + UAT |

## 7 · Sprint schedule
**Deferred to the Master Development Timeline replan (Stage 2).** The instrument-first principle holds — the report-engine integrity protocol (§2.1) and the routing test (§2.2) are authored **before** the code they verify; real-device iOS testing is scheduled on **physical hardware**, not emulation.

## 8 · Version log
| Ver. | Change |
|---|---|
| 2.0 | Reframed the catastrophic failure mode; replaced the primary instruments (report-engine integrity, v4.2 routing, read-level data integrity); added agent-surface / badge / GM-access / Console / anonymity / real-device-iOS test areas; re-mapped NFR traceability to SRS v3.1; deferred the sprint schedule to the MDT replan. |
| 2.0-patch | Stage 1 sweep: dropped the AI free-text-coder test; report-engine protocol now deterministic + tag-driven Gate 4 + CF-sink suppression + count-or-quote; story test → RosaeNLG (local, nothing transmitted); added structured-capture + crew/VIP (CREW-4 gate) tests; routing now v4.2; refs → Output-Spec v0.2 / GoldMap v0.4. |

---

*GuestIQ · Test Plan v2.0 · DRAFT · Stage 1 · The report engine is the new most-critical test · Real-device iOS is mandatory · Findings must be compliant, anonymous, and true*
