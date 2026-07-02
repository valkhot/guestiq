# GuestIQ — End-of-Read Design (LOCKED v1.0)

| | |
|---|---|
| **Document** | GuestIQ-EndOfRead-Design — **LOCKED v1.0** (design settled · mockup-validated) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Status** | **Locked.** Resolved through design debate + interactive mockup. Governing docs reconcile *to* this; this does not reconcile to them. |
| **Validated by** | `GuestIQ-EndOfRead-WOW-mockup.html` (interactive, four movements + threshold) |
| **Companion to** | Front-Desk Value Model v0.3 (expands §4.3 reveal, §4.4 mirror, §4.5 finding-loop into this sequence) |
| **Prepared By** | Claude (AI Developer), with the Lead Researcher (Val) |

---

## 1 · What this locks

The **end-of-read sequence** — the single payoff moment an agent receives after completing a read. It is the richest moment in the product by design; the spectacle lives here so nothing else has to compete with it.

## 2 · The locked sequence

A continuous, ~skippable cinematic moment — one object (their guest) transforming through five beats:

0. **Threshold** — after the last answer, a held breath: a calm completion line (*"That's everything. Let's see what you've put down."*) over a rising lamplight glow, which **dissolves** into the reveal. A doorway, not a "survey complete" notice.
1. **Movement 1 — It crystallizes.** Their answers assemble into a **dossier / case-file portrait** ("The Business Guest, read by Fox"), with a **volume line** (*"23 details put on record · none of it in any system here"*). The elevated mirror.
2. **Movement 2 — The guest comes alive.** A short **generated vignette**, woven strictly from their own answers, unspooling line by line. The first emotional peak.
3. **Movement 3 — The desk recognizes them.** The **convergence reveal** as an anonymous **constellation** — agreeing reps light up and thread to them (✓ validation), their solo insight glows alone (★ distinction). Counts, never names; confidence **scaled to the convergence floor**. The second emotional peak.
4. **Movement 4 — The cast grows + gratitude/hook.** The finished portrait joins their **gallery**; gratitude is **fused with the forward hook** (*"That's three guests you've brought to life that no system here could see. The desk still hasn't heard the Cruise guest — and you know them, don't you?"*), closing with a quiet signature (*"Recorded with thanks — GuestIQ"*).

## 3 · The disciplines (locked, non-negotiable)

- **No gamification anywhere** — no points, levels, streaks, leaderboards, confetti. Dignity, not arcade.
- **Story strictly from their answers** — never put words in the guest's mouth; the vignette only recombines what they said.
- **The reveal never fakes agreement** — scaled to the floor (first-on-record → forming → full → split); never claims convergence that isn't there.
- **Counts, never names** — every comparative element is anonymous and small-N-guarded.
- **Dignified register** — dossier / field-notes / living-portrait language; gratitude thanks the *knowledge*, never "completing a survey."
- **No chart-shaped charts in the payoff** — the constellation and gallery are the visualizations; no clinical distributions.
- **The threshold is punctuation** — lights dimming before a film, not a form confirming receipt.

## 4 · Why it works at N=1 (cold-start solved by design)

Four of the five beats — threshold, dossier+volume, story, gallery+gratitude — need **only the agent's own answers**. Only Movement 3 (constellation) needs the desk, and it degrades gracefully to *"you're the first on record."* So the experience is **rich on day one**, on an empty desk. This was the central cold-start risk; the design resolves it.

## 5 · Downstream reconciliation (deferred — not now)

When Stage 1 doc work resumes, this locked design expands:
- **Value Model v0.3 → v0.4:** §4.3/4.4/4.5 grow into the five-beat sequence; add the threshold, the generated story, the volume line, the gallery.
- **SRS:** FR-AGT-05 (reveal) and FR-AGT-07 (mirror) expand; add FRs for the threshold, the generated story (bounded to answers), the volume line, and the gallery.
- **UC-01:** step 6 (end-of-read recognition) expands to the locked sequence.

## 6 · Open / deferred items

1. **Live story generation** — produced from the agent's answers via **RosaeNLG (local, in-browser; no third-party AI)**, tightly bounded to what they said (no invention). Mockup uses a hardcoded stand-in.
2. **Signature personalization** — optional "Recorded with thanks, Fox" (badge-personalized) vs the neutral signature.
3. **Motion budget on shared-PC hardware** — confirm the animations perform on the front-desk machines (ties to Risk R-15).

---

*GuestIQ · End-of-Read Design · LOCKED v1.0 · The payoff, settled · Docs reconcile to this*
