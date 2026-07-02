# GuestIQ — Scope Decision: Finding-Loop & Return Mechanics (v1.0)

| | |
|---|---|
| **Document** | GuestIQ-Scope-Decision-FindingLoop-Return — v1.0 |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Type** | Scope decision (pilot vs Phase-2). Follows the WONT-DO precedent of S3-14 / S3-16. |
| **Status** | **Decided** (Lead Researcher). Governing docs reconcile to this. |
| **Prepared By** | Claude (AI Developer), with the Lead Researcher (Val) |

---

## 1 · The decision

The **per-agent finding-loop** and the **habitual cross-session return mechanics** are **WONT-DO for the pilot → deferred to Phase-2.** The **finding→reads lineage is kept** (built, but not surfaced to agents). Agent recognition shifts to the **collective / debrief channel.**

## 2 · Why — the realization

The pilot's real usage pattern is **burst contribution**: agents fill the instrument in one session, or a few sessions over a **short window**, playing a few personas — and **do not return afterward.** The per-agent finding-loop has a fatal timing dependency on that return: **findings only exist after the report is generated (end of pilot),** so a "your read became a finding" message would wait for a return visit that, in this pattern, never comes. Keeping it would ship a promise the deployment structurally cannot honor — worse than not making it.

## 3 · WONT-DO for the pilot (→ Phase-2)

- **The finding-loop (system→agent)** — the "your read became a finding" waiting-message. Depends on return *after* findings exist.
- **The optional GM→agent acknowledgment** — same dependency.
- **The "you'll hear from us when your reads become findings" promise line** — dropped from the completed-range wall and anywhere else it appears.
- **The habitual-return ending framing** — the cross-*day* escalation that narrates "since your last visit, the desk has filled in." That story assumes a personal return gap that won't occur.

*These are marked WONT-DO-for-pilot, not deleted — the thinking is real value if the tool later becomes habitual (ongoing use). Same disposition as S3-14 / S3-16.*

## 4 · Stays in the pilot (works without habitual return)

Everything whose value lands **within a single session or the short pilot window**:

- **The badge** — still earns its place: it enables distinct-person counting and a same-window portfolio across the *few* sessions an agent does in the pilot window. (This is *not* "habitual return"; it's "the same person across a short burst.")
- **The end-of-read five-beat WOW** — the reveal scales to whatever convergence exists at that moment, so it works regardless of return.
- **The coverage wall** — as a **within-window** "where can I still help" map and the agent's same-window growing portfolio.
- **Replaying personas** back-to-back in a session; the gallery grows during the session.
- **The completed-range state** — reached within the session once an agent has done everyone they know.

## 5 · Kept regardless — the lineage

The **finding→reads lineage** stays in the data model. It's cheap, it's good provenance, it powers a **researcher-side "which reads drove which findings" audit**, and it's exactly what a Phase-2 finding-loop would need. **Build the plumbing; skip the agent-facing promise.**

## 6 · The replacement — collective / debrief recognition

The recognition the per-agent loop would have provided shifts to a channel that **works in one session and reaches everyone**:

- **Primary: the GM debrief** carries *"the front desk's knowledge produced these findings"* — true, team-level, no return dependency.
- **Optional, within-session:** a light *"the desk's reads are building something the GM will see"* note (collective, never per-person), if useful.

Team-level rather than personal — but it reaches every contributor regardless of whether they ever return.

## 7 · Why this is a clarification, not a loss

The pilot is a **burst-contribution tool, not a habit tool** — and naming that sharpens the design rather than diminishing it. The magic that makes the agent experience good **does not depend on returning**: the hook, the badge, the read, the end-of-read WOW, the within-window coverage wall, and replaying a few personas all land in one sitting. We're cutting a beautiful mechanic whose preconditions the pilot can't meet, and keeping everything whose preconditions it can.

## 8 · Downstream reconciliation impact

| Doc | Change |
|---|---|
| **Value Model v0.4** | §4.4 finding-loop and §5.4 return-loop *escalation* → mark **Phase-2**; drop the "you'll hear from us" promise; reframe §4.2 wall as **within-window**; recognition → collective/debrief. |
| **SRS v3.0** | FR-AGT-08 (finding-loop) and FR-AGT-09 (GM→agent ack) → **deferred / Phase-2**; **keep FR-RPT-08 (lineage)**; add a collective/debrief-recognition note. |
| **Use Cases v3.0** | **UC-05** (agent learns read became a finding) → **Phase-2**; **UC-02** (return for another guest) → reframe as **within-window** replay. |
| **Agent & GM Experience Spec v1.0** | mark the finding-loop (§2.7) and the cross-session return framing (§2.6) **Phase-2**; recognition → §3.2 debrief. |
| **Data Model & API v1.1** | **no change** — lineage stays. |
| **Product Backlog / MDT** | finding-loop + return-escalation stories → Phase-2 bucket. |

## 9 · Note

This narrows the pilot to its honest shape (one-window burst) and removes a return-dependency we'd otherwise have built against. The completed-range wall's reassurance line is updated from "you'll hear from us when your reads become findings" to a collective, no-promise close.

---

*GuestIQ · Scope Decision · Finding-Loop & Return Mechanics → Phase-2 · Lineage kept · Recognition via debrief*
