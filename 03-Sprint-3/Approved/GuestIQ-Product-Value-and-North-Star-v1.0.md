# GuestIQ — Product Value & North Star (v1.0)

| | |
|---|---|
| **Document** | GuestIQ-Product-Value-and-North-Star — v1.0 (DRAFT · Stage 1a reconciliation · for Lead Researcher review) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Supersedes & consolidates** | jtbd_statements · north_star_metric |
| **Implements (canon)** | Output-Spec v0.1 · GM-Priors-GoldMap v0.3 · GM-Report.html · Front-Desk Value Model v0.3 |
| **References** | SRS v3.0 (closes its §8 NSM dependency) |
| **Prepared By** | Claude (AI Developer) |
| **Date** | Sprint 4 planning — reconciliation Stage 1a |
| **NSM decision** | **Option C (Lead Researcher):** the North Star is **non-obvious findings delivered**; **completion rate is demoted to a health metric.** |

---

## 1 · The value proposition (post-pivot)

GuestIQ surfaces the **non-obvious patterns the front desk holds that the GM's existing systems cannot see.** A front-desk agent answers *as* a guest persona they know; GuestIQ aggregates those reads across distinct respondents, filters out the obvious, and hands the GM a short report of corroborated, non-obvious findings — **evidence only, decisions left to the GM.** It serves two stakeholders at once: the GM (who reads the findings) and the front-desk agent (whose expertise is finally recorded, reflected back, and carried upward).

---

## 2 · Jobs To Be Done

### 2.1 · A1 — GM / Sponsor (the buyer)
**Job:** *"Show me what my front desk knows about our guests that my PMS, RMS, and review dashboards can't — patterns specific and corroborated enough that I'd consider acting on them."*
**Success signal:** the GM reads the report and finds **non-obvious findings worth acting on** — patterns they did not already know and could realistically use. (The pilot's validation question: would the GM act on any of them?)
**Changed by the pivot:** from "a dashboard of distributions" to "a short report of findings"; from "recommendations" to "evidence, decisions are yours."

### 2.2 · A3 — Front-desk agent (the respondent)
**Job:** *"Have the expertise I hold — which no system records and management has never seen — put on record, reflected back to me, validated against my peers, and carried to the GM as what the front desk knows."*
**Success signal:** agents start, finish, and **return for other guest types** — and talk about it with each other.
**Fully specified in:** Front-Desk Value Model v0.3 (coverage map, convergence reveal, finding-loop, intrinsic recognition).

### 2.3 · A2 — Lead Researcher
**Job:** *"Collect a valid, trustworthy, defensible dataset — and verify its integrity well enough to stand behind the findings."*
**Success signal:** the data clears the integrity disciplines (distinct-respondent counting, convergence floor, observation grading, open-text softening) so findings are credible enough to publish or defend.

---

## 3 · The North Star Metric

### 3.1 · North Star — Non-obvious findings delivered
The single measure that best captures whether GuestIQ is doing its job:

> **The number of non-obvious findings delivered to the GM.**
> A "finding delivered" = a pattern that clears **both** the convergence floor *and* the gold-map obviousness filter and appears in the GM report (per Output-Spec). The downstream **validation signal** is the GM judging them non-obvious and worth acting on.

### 3.2 · Why this, and not completion rate
Completion rate measures **activity, not value.** A pilot could hit 100% completion and surface zero non-obvious findings — every read true-but-obvious, every pattern below the floor. The product is not "people finished a survey"; it is "the GM learned something they couldn't see." So the value metric must be the findings, not the finishing.

### 3.3 · Health metrics (leading indicators)
Completion rate keeps its place — **as a health gauge, not the star.** These tell us whether we are *on track* to produce findings:

| Health metric | What it tells us | Why it's a leading indicator |
|---|---|---|
| **Completion rate** | Are agents finishing? | Directly driven by the agent value layer (v0.3); low completion → not enough data to converge |
| **Distinct-respondent coverage per guest type** | Do we have ≥3 distinct reps per segment? | The convergence floor needs this before *any* finding can form |
| **None-flag rate** | Is the instrument offering fitting options? | Instrument validity; high none-flag → the reads are weak |
| **Breadth (replay across guest types)** | Are we covering enough segments? | Coverage is what lets findings form across the property, not just one segment |

### 3.4 · The causal chain (why the two stakeholders' metrics line up)

> **Agent value** (v0.3) → **completion + coverage** (health) → **enough distinct respondents per guest type** → **convergence forms** → **findings clear the floor + gold map** → **findings delivered** (North Star) → **GM value**.

This is why the agent value layer is upstream of everything: it drives the health metrics that make the North Star possible. The two stakeholders are not in tension — the agent's reward *produces* the GM's value.

---

## 4 · Pilot success criteria (tied to the North Star)

*Proposed thresholds — to confirm with the Lead Researcher:*

- **Primary (North Star):** **3–5 non-obvious findings delivered** to the GM in the pilot report (the reference report delivered 4), each clearing the floor and the gold map.
- **Validation:** the GM confirms at debrief that findings are **non-obvious and worth considering** (the A1 success signal).
- **Health gauges (on-track, not headline):** completion rate **≥60%** of started reads; **≥3 distinct respondents** for each reported guest type; **none-flag rate <15%.**
- **Integrity:** the dataset clears the A2 disciplines so findings are defensible.

A pilot that delivers strong findings on modest completion is a **success**; a pilot with high completion but no non-obvious findings is **not** — the metric protects against optimizing the wrong thing.

---

## 5 · Anti-metrics — what we deliberately do *not* optimize

To stop the North Star from corrupting the product (the metric becoming the target):

- **Not raw finding count** — we never lower the convergence floor or weaken the gold map to manufacture more "findings." A real finding or none; the obviousness filter stays mandatory.
- **Not completion for its own sake** — never rewarded with velocity mechanics; speed-over-quality rots the reads (the S3-14 lesson).
- **Not number of sessions** — distinct respondents, never sessions.
- **Not manufactured WOW** — a finding (or a reveal) is reported only if it is true; we never inflate convergence to look impressive ("the tool dies on first read").

---

## 6 · Traceability & supersession

- This document **supersedes** `jtbd_statements` and `north_star_metric`; on approval they are retired, their live content carried here (Reconciliation Impact Map §9.6).
- It **closes SRS v3.0 §8** (the open NSM dependency): the SRS may now reference this document for the North Star and success criteria.

## 7 · Open items

1. **Confirm the pilot thresholds** in §4 (findings target, completion gauge, none-flag ceiling).
2. **Define the GM validation step** at debrief — how we ask the GM to confirm a finding is non-obvious and actionable (feeds the A1 success signal).

---

*GuestIQ · Product Value & North Star · v1.0 · DRAFT · Stage 1a · Findings delivered is the star; completion is the gauge*
