# GuestIQ — Jobs-To-Be-Done Statements (v2.0)

| | |
|---|---|
| **Document** | GuestIQ-JTBD-Statements — v2.0 (DRAFT · reconciled to the projection / no-AI model · for Lead Researcher review) |
| **Document ID** | S0-0.3 — Sprint 0 Artifact |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Supersedes** | jtbd_statements v1.0 (the pre-pivot three-actor analysis: gamified/episodic instrument · 79-question / 12-taxonomy / dual-tense · management dashboard) |
| **Implements (canon)** | Questionnaire v4.2 · Output-Spec v0.2 · GM-Priors-GoldMap v0.4 · Front-Desk Value Model v0.5 · Architecture v1.1 |
| **References** | Project Charter v2.2 (§13 embeds these statements) · Methodology v1.2 (§7) · SRS v3.1 · Use Case Specifications v3.1 · Researcher Value Model v0.2 · Product Value & North Star v1.0 |
| **Status** | DRAFT — PENDING REVIEW by Lead Researcher |
| **Prepared By** | Claude (AI Developer) |
| **Date** | Reconciliation Stage 1 |
| **Why this artifact exists** | The three primary JTBD statements were previously **copied verbatim into the Charter, Methodology, Use Cases, and Stakeholder Register** — and drifted independently. This doc is the **single source of truth**: those artifacts now reference the statements **by ID (A1 / A2 / A3)**, and the statements change **here first**. (Directly addresses Risk R-13 — documentation drift.) |
| **Drift rule** | This doc states the JTBD; consuming docs reference A1/A2/A3 by ID and do not restate them. Where a job traces to a requirement, the cited canon artifact is authoritative. |

---

# 1 · How to use these statements

Three primary Job-To-Be-Done statements — one per actor — are the canonical expression of *what each actor hires GuestIQ to do*. They are the **JTBD minimum test** (§5.4): any proposed feature that cannot be traced to at least one of A1/A2/A3 is a candidate for removal.

**The pivot in one line:** GuestIQ is no longer framed as a *gamified survey that maximises completion of a 79-question instrument*. It is a **projection instrument** — front-desk agents answer **as a guest persona they know** — whose value is **non-obvious, corroborated findings a GM will act on**, produced by a **deterministic, local, no-third-party-AI** pipeline. Every job statement below is reconciled to that model.

Actor IDs are consistent with the Use Case Specifications v3.1: **A1 — GM / Sponsor** (the buyer, who reads the report) · **A2 — Lead Researcher** (who owns instrument integrity and judges the findings) · **A3 — Front-Desk Agent** (the respondent, who contributes reads and receives recognition).

---

# 2 · Actor 1 — GM / Project Sponsor

*Role:* General Manager of the pilot property — the **buyer and report consumer**. *Context:* Runs a branded urban hotel; makes operational decisions on service design, staffing, and positioning; today relies on satisfaction scores (outcomes, not expectations), anecdote, and intuition.

**PRIMARY JOB-TO-BE-DONE STATEMENT (A1)**

> **The GM hires GuestIQ to translate the front-desk team's collective knowledge of guest expectations into non-obvious, corroborated findings — so that operational decisions are made on evidence rather than accumulated assumption.**

|  |  |  |
|---|---|---|
| **Functional Job** | **Social Job** | **Emotional Job** |
| See reliable, segmented **findings** about why guests choose this property for specific stay purposes and what they expect — surfaced as patterns the GM's existing systems (satisfaction scores, PMS) cannot show. | To be seen by ownership, corporate, and peers as an operator who decides on **evidence**, not gut feel — ahead of competitors still relying on NPS alone. | Confident that investment in training and service design targets **what guests actually need**, not what management assumes — replacing the discomfort of deciding without reliable data. |

- **Barriers.** No systematic method exists to capture guest-expectation knowledge at property level without expensive consultancy, long survey projects, or intruding on guests mid-stay. Satisfaction tools measure how guests *felt after the fact* — never the expectation framework they *arrived with*, and never segmented by persona.
- **Success signal.** The **GM Findings Report** surfaces at least **3 findings the GM judges non-obvious and actionable** (captured via the GM-reaction prompt). The GM self-serves the report and returns to it.
- **Switching event.** *Was using:* satisfaction surveys, TripAdvisor monitoring, anecdotal staff observation, occasional consultancy. *Switched because:* those measure outcomes after the fact and cannot segment expectations by persona or surface the desk's convergent knowledge.

**GuestIQ design decisions driven by A1**
- The **GM Findings Report** — automatic, **computed on-open** by a deterministic engine; GM self-serves via **Ctrl+Alt+A + PIN** (no developer access, no dashboard, no export feature). *(Replaces the retired management dashboard / SHIFT+CTRL+A / CSV+PDF.)*
- **Findings, not recommendations**; **raw counts, never percentages**; **counts never carry names**; **in-house-only** — so the report is something a GM can trust and act on without being told what to do.
- **Persona segmentation** (9 personas) — the cut of the data the GM cannot currently see.
- **Gold-map obviousness filter + CF-sink** — table-stakes ("good Wi-Fi", "clean room") are suppressed so the report skews to **blind-spots and contradictions**, not the obvious.
- **The 45-minute debrief** — findings delivered in a form the GM can present to ownership.
- **Zero IT cost** — removes the procurement friction that would block adoption.

---

# 3 · Actor 2 — Lead Researcher

*Role:* Research lead — responsible for **instrument integrity, finding credibility, and publishable output**. *Context:* A hospitality professional with research-methodology expertise, running a 14-week project that must produce both a working application and a credible, publishable method — **at zero cost, zero IT involvement, with a single AI development partner, and no third-party AI in the product**.

**PRIMARY JOB-TO-BE-DONE STATEMENT (A2)**

> **The Lead Researcher hires GuestIQ to prove that a dignified projection instrument can collect research-grade guest-expectation expertise from front-desk professionals — surfacing non-obvious, actionable findings a GM will act on — producing a basis that is both publishable and operationally useful, with no third-party AI and no data leaving the property.**

|  |  |  |
|---|---|---|
| **Functional Job** | **Social Job** | **Emotional Job** |
| Collect corroborated, gold-tagged expertise from front-desk agents projecting as **9 personas** (CORE/PRO/EXPERT depth), and turn it into **defensible findings** via a deterministic engine — at zero cost, zero IT dependency, no external processor. | To be recognised by academic peers and the hospitality research community as the originator of a **projection-instrument method** and **gold-map** for capturing staff-reported guest expectations — a gap in the literature. | Confident the method is rigorous enough to withstand peer review — and that every choice (projection design, gold-map grading, convergence floor, **simulation-only validation**, anonymity) can be justified in a methods section. |

- **Barriers.** A trustworthy, automatic, *non-AI* way to turn open-ended expertise into themes does not exist off the shelf — which is why GuestIQ dissolves the problem at source: **count-or-quote** structured capture (no free-text coding) plus **local RosaeNLG** for the agent's story. Building this needs software capability the researcher does not have alone.
- **Success signal.** The **report-engine integrity protocol** passes on seeded data (no wrong / non-compliant / de-anonymizing finding); the **none / not-this-guest** rate stays under ~15% per item; findings clear the **convergence floor**; the GM judges them non-obvious. The basis is sufficient for the paper.
- **Switching event.** *Was using:* standard survey platforms, paper questionnaires, commissioned reports. *Switched because:* standard platforms can't run a projection instrument with gold-tagged capture and a deterministic report engine; paper has no data-integrity verification; commissioned research is too slow and costly for a 14-week prototype — and **all of them would have sent data to a third party** the privacy model forbids.

**GuestIQ design decisions driven by A2**
- The **projection instrument (Questionnaire v4.2)** with **gold-tagged options** (BS/CON/MW) and **CF-sink** — the research instrument itself.
- The **deterministic, tag-driven report engine** + **count-or-quote** capture — the integrity guarantee, with **no AI semantic judgment** anywhere in the finding path.
- **RosaeNLG (local, in-browser)** for the end-of-read story — engagement without sending answers off-device.
- The **GoldMap (v0.4)** + **convergence floor** + observation grading — what makes a finding *non-obvious and corroborated* rather than anecdotal.
- **Simulation-only validation** for Phase 1 (no real guests) with the **GM-reaction capture** as the validation signal; the **Researcher Console** as the judge's surface.
- **Research data integrity NFRs** (SRS v3.1: PRIV / REL / OBS / SEC / TONE) — the data-quality guarantee. *(Replaces the dead NFR-043/044/045 tense/Module-5 set.)*
- A **publishable method as a parallel output**, not a secondary deliverable.

---

# 4 · Actor 3 — Front-Desk Agent (pilot participant)

*Role:* ~10 front-desk professionals — the primary respondents. *Context:* Experienced hospitality professionals who read guests daily across many stay purposes and hold rich, tacit expertise rarely captured systematically. Limited lull time; **participation is voluntary**.

**PRIMARY JOB-TO-BE-DONE STATEMENT (A3)**

> **The Front-Desk Agent hires GuestIQ to give their professional expertise about guests a form — turning what they know from thousands of interactions into something visible, valued, and consequential beyond the front desk.**

|  |  |  |
|---|---|---|
| **Functional Job** | **Social Job** | **Emotional Job** |
| Complete a **read** — projecting as a guest they know — that feels relevant to their real experience, and see that expertise reflected back at the **end-of-read** as something they recognise. | To be recognised as a hospitality professional whose **expertise is worth studying** — not a service agent filling in a form. | That their few minutes contributed **something real** — that their professional knowledge carries weight and consequence beyond the desk. |

- **Barriers.** Standard surveys feel generic and transactional — not written in the language of hospitality professionals, no nuance, no visible outcome. The **respondent experience is the primary barrier**: if a read feels like admin, it won't be done.
- **Success signal.** Reaching the **end-of-read** — the five-beat reflection that mirrors their own expertise back — and seeing the **coverage wall** fill in collectively. Ideally a colleague mentions it unprompted, or the GM references a finding in a briefing.
- **Switching event.** *Was using:* declining hotel surveys, or completing them minimally out of obligation. *Switched because:* standard surveys offer nothing back; GuestIQ offers a **dignified badge identity**, a calm relevant read, an **end-of-read that reflects their expertise**, and the knowledge that their reads feed findings the GM acts on.

**GuestIQ design decisions driven by A3**
- **Badge identity** (anonymous animal+colour, claim-and-lock, corner badge) — a dignified marker of *"this is recorded as me"*, never a score. *(Replaces Amateur/Professional/Expert tier labels.)*
- The **five-beat end-of-read** — the aha moment; the job is "done" when the agent sees their expertise reflected back. *(Replaces the results-screen aggregate comparison.)*
- The **coverage wall** (incl. completed-range) — collective recognition, **never a leaderboard**. *(Replaces points/streaks/curiosity-hooks.)*
- **Depth fork** offered **once, mid-read, as a compliment** — CORE is a complete, respected contribution, never the "lite" version.
- **Dignified value layer, not gamification** — a professional audience would be patronised by points and confetti; engagement comes from meaning, not mechanics.
- **Voluntary participation** — no management mandate; the product earns adoption through experience quality alone.

---

# 5 · Cross-actor analysis

## 5.1 · Job-dimension comparison

| **Dimension** | **A1 — GM / Sponsor** | **A2 — Lead Researcher** | **A3 — Front-Desk Agent** |
|---|---|---|---|
| **Functional Job** | Non-obvious, segmented findings to act on | Credible, publishable findings via a projection instrument, no third-party AI | Give tacit expertise a visible, valued form |
| **Social Job** | Seen as an evidence-based operator | Originator of the projection method + gold-map | Recognised as a professional worth studying |
| **Emotional Job** | Confident investment targets real need | Confident the method survives peer review | Felt their contribution was real and consequential |
| **Primary Barrier** | No property-level method without high cost | No trustworthy *non-AI* way to theme open expertise (dissolved by count-or-quote) | Standard surveys feel generic, transactional, outcome-less |
| **Success Signal** | 3+ findings judged non-obvious & actionable | Integrity protocol passes; convergence cleared; basis sufficient to publish | Reaching the end-of-read; the coverage wall filling in |
| **Switching From** | Satisfaction surveys, anecdote, consultancy | Survey platforms / paper / commissioned research (all third-party, all off-device) | Declining, or completing minimally out of obligation |

## 5.2 · Where the jobs align

All three actors share one underlying need: the pilot must produce findings that are **credible**. The GM needs credibility to act; the researcher needs it to publish; the agent needs the experience to feel credible enough to be worth their time. This shared need is why **report-engine integrity** (no wrong / non-compliant / de-anonymizing finding) and the **research-data NFRs** are hard requirements no other consideration can override.

All three also depend on **coverage** rather than raw volume: a finding only forms when enough **distinct** agents corroborate it (the convergence floor). Low participation means fewer findings clear the floor, which weakens the end-of-read and the report — a feedback loop that rewards genuine breadth.

## 5.3 · Where the jobs create tension

- **Depth vs. effort.** A2 wants the richest expert detail; A3 wants a short, dignified read. Resolved by the **depth fork**: CORE is a complete contribution; PRO/EXPERT is an opt-in compliment, offered once, mid-read — not a front-loaded gate. *(This replaces the old three-tier resolution.)*
- **Findings vs. validity.** A1 prioritises actionable findings; A2 prioritises instrument integrity. Aligned in Phase 1; if Phase 2 brings GM requests that would compromise integrity, the Methodology conflict rule is explicit: **academic / instrument integrity wins**.
- **Engagement vs. neutrality.** A3's experience must be engaging, but the **value layer never reaches inside the answering flow** (no rewards/comparisons/scores mid-read) — engagement must not bias the measurement.

## 5.4 · The JTBD minimum test

Any feature or design decision that cannot be traced to at least one of these should be challenged before being added to scope:

| |
|---|
| **A1:** Does this help the GM obtain non-obvious, segmented findings they can act on? |
| **A2:** Does this help the Lead Researcher produce credible, publishable findings — at zero cost, no third-party AI? |
| **A3:** Does this make the Front-Desk Agent feel their expertise is visible, valued, and consequential? |

ℹ If a feature serves none of these, it is a candidate for removal. If it serves one or two but creates friction for a third, assess the trade-off explicitly — never add features that serve the GM at the cost of agent participation, or engagement at the cost of measurement neutrality.

---

# 6 · Version log

| Version | Date | By | Change |
|---|---|---|---|
| **2.0** | Reconciliation Stage 1 | Claude (AI Developer) | **Full reconciliation to the projection / no-AI model** and promotion to **single source of truth**. A1 dashboard/SHIFT+CTRL+A/CSV-PDF → **GM Findings Report (compute-on-open, PIN)**; findings-not-recommendations. A2 "gamified, episodic / 79-question / 12-taxonomy / dual-tense / research-grade data" → **projection instrument, gold-map, deterministic engine, count-or-quote, RosaeNLG, simulation-only validation, no third-party AI**; NFR-043/044/045 → SRS v3.1 NFR set. A3 Amateur/Professional/Expert / results-screen / curiosity-hooks / badges-as-points → **badge identity / end-of-read / coverage wall / depth fork; dignified value layer, no gamification**. Cross-actor tension re-resolved (three-tier → depth fork). Actor IDs aligned to Use Cases v3.1 (A1/A2/A3). |
| 1.0 | [Sprint 0] | Claude (AI Developer) | Initial three-actor analysis (pre-pivot). Superseded by v2.0. |

**— END OF JTBD STATEMENTS v2.0 —**

*GuestIQ · JTBD Statements v2.0 · S0-0.3 · Single source of truth — Charter §13 / Methodology §7 / Use Cases / Stakeholder Register reference A1/A2/A3 by ID*
