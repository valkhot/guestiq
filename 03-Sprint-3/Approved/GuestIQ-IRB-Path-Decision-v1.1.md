# GuestIQ Phase 1 Pilot — IRB Path Decision (v1.1)

| | |
|---|---|
| **Document** | IRB-Path-Decision — v1.1 (DRAFT · Stage 1 reconciliation) |
| **Supersedes** | IRB-Path-Decision v1.0 (the original exemption-path note) |
| **Date** | [insert today's date] |
| **Lead Researcher** | [your name] |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Changed in v1.1** | Recorded the **no-third-party-AI / no-external-processor** architecture (Architecture v1.1): **no response content leaves the device or your own Supabase** — there is no AI service processing answers. This **strengthens** the exemption case and **removes** the external-processor question an earlier design (a third-party AI coder) would have raised. |

**Decision:** Scenario B — IRB Exemption Determination.

The GuestIQ Phase 1 pilot involves the collection of **anonymous professional-knowledge data** from hotel front-desk staff regarding guest expectations. Academic publication of findings is a realistic future objective.

The Lead Researcher will contact [institution name] IRB office before the pilot launches (Sprint 5) to seek an exemption determination. The pilot will not launch until either an exemption letter is received or a determination is made that no review is required.

## Design features supporting an exemption application

- All responses are **anonymous** — no names, employee IDs, or identifying information are collected.
- Participation is **voluntary** — the "Not now" option is present on the welcome screen.
- The **privacy notice** on the welcome screen confirms voluntary participation and anonymous collection.
- **No sensitive personal data** is collected — questions concern professional knowledge of guest behaviour only.
- Participants are **working adults** responding about their professional expertise, not a vulnerable population.
- Data is stored **without any linkage to individual identities** (pseudonymous badge, no key).
- **No third-party / AI processor.** *(New in v1.1.)* All processing is **on-device or in your own Supabase**: the end-of-read story is generated **locally in the browser** (RosaeNLG, rule-based — no AI service); the report engine is **deterministic and computed in the browser** (no AI); free-text is **never sent to any AI service for coding** (it is captured as structured counts or displayed verbatim — Questionnaire v4.2). **No response content is transmitted to any external processor.**

## Resolved (v1.1)

An earlier design considered sending free-text answers to a **third-party AI service** for theme-coding. That approach is **removed** — and with it, the data-processor question (external handling of response content, processor agreements, cross-border transfer) an IRB reviewer would otherwise have to evaluate. The reconciled architecture has **no such processor**.

**Next action:** Contact [institution] IRB office in Sprint 4 (Weeks 9–10) — before UAT and well before the Sprint 5 pilot launch.

---

*GuestIQ · IRB-Path-Decision v1.1 · Scenario B exemption · No third-party processor (strengthens the application)*
