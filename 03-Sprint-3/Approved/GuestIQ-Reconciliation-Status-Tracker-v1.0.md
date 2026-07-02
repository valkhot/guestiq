# GuestIQ — Reconciliation Status Tracker (v1.0)

| | |
|---|---|
| **Document** | GuestIQ-Reconciliation-Status-Tracker — v1.0 |
| **Purpose** | The authoritative, drift-proof state of **every** target document in the reconciliation — so nothing is "reconciled separately" and then quietly forgotten. |
| **Authoritative plan** | Reconciliation Impact Map v0.2 (the ~31 → ~18 slim + the new value artifacts) |
| **Prepared By** | Claude (AI Developer), at the Lead Researcher's prompt |
| **Note** | Built because the working "remaining queue" had **omitted several "reconciled separately" docs** (Test Plan, System Architecture & Flows, UI/UX Wireframes, IRB-Path-Decision, Content Management Strategy). This tracker exists so that can't recur. |

**Legend:** ✅ Done · �documents in queue (pending) · ⛔ **gap — was missing from the plan** · ➖ no change needed

---

## New value / design artifacts (this session)
| Artifact | Status |
|---|---|
| Front-Desk Agent Value Model | ✅ v0.5 |
| **Researcher Value Model** (the third stakeholder — was absent entirely) | ✅ v0.2 |
| Agent & GM Experience Spec | ✅ v1.0 |
| End-of-Read Design LOCKED | ✅ v1.0 |
| GM Report Access LOCKED | ✅ v1.0 |
| Scope Decision — Finding-Loop & Return | ✅ v1.0 |
| Scope/record — Badge uniqueness & re-entry | ✅ (in SRS FR-AGT-01/02 + Data Model) |

## Requirements (4)
| Doc | Plan | Status |
|---|---|---|
| SRS | rewrite | ✅ v3.1 (FR-INST, FR-RPT incl. auto-gen, FR-AGT, FR-GMA, **FR-RES**, NFRs) |
| Use Case Specifications | rewrite | ✅ v3.1 |
| Product Value & North Star | merge JTBD + NSM | ✅ v1.0 |
| **Test Plan** | **rewrite** | ⛔ **NOT STARTED — was missing from the queue** |

## Architecture / data (3)
| Doc | Plan | Status |
|---|---|---|
| Data Model & API | merge (ERD+API+questionnaire-structure) | ✅ v1.2 |
| Observability & Analytics | amend → rewrite | ✅ v2.0 |
| **System Architecture & Flows** | merge (sysarch+IA+DFD+app-state+prod-readiness), amend | ⛔ **NOT STARTED — was missing from the queue** |

## Governance / process (8)
| Doc | Plan | Status |
|---|---|---|
| Project Charter | amend (log the scope change) | �  pending (light) |
| Methodology | light amend | �  pending (light) |
| Stakeholders & RACI | merge + light amend (**add the researcher stakeholder**) | �  pending (light) |
| Risk Register | amend + new risks | �  pending (light) |
| Definition of Done + Ready | amend (retire dashboard criteria) | �  pending (light) |
| Product Backlog | rewrite | �  pending (Stage 2) |
| Master Development Timeline | rewrite | �  pending (Stage 2) |
| **IRB-Path-Decision** | confirm against final anonymity model | ⛔ **not addressed — parallel track, was missing** |

## UI / design (3)
| Doc | Plan | Status |
|---|---|---|
| **UI/UX Wireframes** | rewrite | ⛔ **NOT STARTED** — the session's HTML mockups likely substitute, but this isn't logged/decided |
| Design System | merge (two design docs) | �  pending (light) |
| ESLint/Prettier Config | — | ➖ survives the pivot |

## Other
| Doc | Plan | Status |
|---|---|---|
| **Content Management Strategy** | fold into SRS/Arch **or retire** | ⛔ **decision not made** |

---

## The gaps this audit surfaced (beyond the Test Plan)
1. **Test Plan** — not started. *(Your catch.)* See its accumulated obligations below.
2. **System Architecture & Flows** — not started; plumbing survives but the report engine is new and the dashboard is removed.
3. **UI/UX Wireframes** — not started; need to decide whether the session mockups *are* the reconciled wireframes or whether a formal doc is owed.
4. **IRB-Path-Decision** — the parallel track; should be confirmed against the final fully-anonymous / no-key / suppression-at-3 model.
5. **Content Management Strategy** — fold-or-retire decision never made.

## Why the Test Plan matters most (it has accumulated real obligations)
Several decisions this session were explicitly **deferred to the Test Plan** — it is not a checkbox:
- **Badge-fragmentation anomaly check** (SRS §10, UC-04) — the researcher's integrity procedure.
- **Real-device mobile testing** — iOS Safari / WebKit (the iPad crash + badge-tray glitch; standing lesson that desktop emulation misses these).
- **Report engine** — the 5-gate pipeline, convergence floor, observation grades, **guardrail compliance** (findings-not-recommendations, counts-not-names, in-house-only), Option B free-text hedging.
- **GM access** — Ctrl+Alt+A + PIN + auto-lock + throttle (FR-GMA).
- **Researcher Console** — PIN, the three lenses, validation capture (FR-RES).
- **Anonymity / no-PII** verification (NFR-PRIV, NFR-OBS).
- **End-of-read story** bounded strictly to the agent's answers (FR-AGT-10).
- **Automatic generation + self-serve** (FR-RPT-10).

## Corrected order from here
1. **Test Plan** (rewrite) — highest priority of the gaps; it has the most owed to it.
2. **System Architecture & Flows** (merge/amend) — the other untouched "reconciled separately" doc.
3. **UI/UX Wireframes** — decide: mockups-as-wireframes vs formal doc.
4. **Light amends** — Charter · Risk Register · DoD/DoR · Stakeholders & RACI (+researcher) · Methodology · Design System · **IRB-Path-Decision** · **Content Management Strategy** (fold-or-retire).
5. **Stage 2** — Product Backlog rewrite · Master Development Timeline replan.

---

*GuestIQ · Reconciliation Status Tracker · v1.0 · The authoritative, drift-proof plan state*
