# GuestIQ — GM Report Access (LOCKED v1.0)

| | |
|---|---|
| **Document** | GuestIQ-GM-Report-Access — **LOCKED v1.0** (design settled) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Status** | **Locked.** Resolved by Lead Researcher decision. Governing docs reconcile *to* this. |
| **Companion to** | Output-Spec v0.1 (the report) · UC-03 (GM reads the Findings Report) · GM-Report.html (the rendered report) |
| **Prepared By** | Claude (AI Developer), with the Lead Researcher (Val) |

---

## 1 · What this locks

**How the GM reaches the Findings Report** — the access mechanism, its safeguards, and the open-tracking that comes with it.

## 2 · The decision

**Desk-only, convenient-but-locked.** The GM can open the report at the shared front-desk PC at any time, via:

> **Ctrl+Alt+A** (reveals the entry — no visible "Manager" button cluttering the agent screen) **+ a GM-only PIN** (unlocks it) **+ auto-lock** (closes it again on idle / navigate-away).

Every open is **logged** and surfaced to the Lead Researcher as an engagement signal.

## 3 · How it works

- **Discreet door.** Ctrl+Alt+A reveals the report entry; there is no labelled manager button. Agents don't see a door to poke at.
- **Real lock, not obscurity.** A **GM-only PIN**, set at setup and **never shared with the desk**, unlocks the report. The combo alone opens nothing.
- **Throttle.** Wrong-PIN attempts lock out after a few tries, so an idle agent can't guess in.
- **Auto-lock (mandatory).** The report closes itself after a short idle timeout **and** the moment anyone navigates away. **Every** open requires the PIN again — there is no "stay signed in." This is the safeguard that prevents the real failure mode on a shared PC: the GM opens it, gets pulled away, and an agent sits down to a report written *about* the desk still on screen.

## 4 · Open-event analytics (a bonus signal)

- Every open is logged with a **timestamp and count**, surfaced to the Lead Researcher ("the GM opened the report — when, how often").
- This is the **GM's own activity** — no agent PII is involved.
- It **complements the North Star**: "findings *delivered*" plus "findings *actually consumed*." Repeated opens = the findings landed; never opened = its own important signal.

## 5 · The disciplines (locked)

- **Protects candor.** The report is *for the GM*. Agents must never be able to browse the desk's collective read as presented to management — that knowledge would bias future answers (the exact thing anonymity and the wall protect). The PIN + auto-lock enforce this on the shared device.
- **Separation of surfaces holds.** Agents get their own controlled finding-loop (built for them); the GM gets the report (built for them). The desk-PC door does not collapse that wall, because it's locked.
- **Security is a real lock, never bare obscurity.** A hidden keystroke alone would leak the first time it's shoulder-surfed; the PIN is what makes it safe.

## 6 · Considered and not taken

- **A second door — private link / GM's own device.** Considered (it would add office-convenience with the same open-tracking and sidestep the shared-desk entirely). **Deferred** in favour of desk-only for now. Can be revisited if the GM later wants to read from their office; the report and tracking would support it unchanged.

## 7 · Downstream reconciliation (deferred — not now)

When Stage 1 doc work resumes, this locks the following changes:
- **SRS:** add a GM-access requirement (Ctrl+Alt+A + PIN + auto-lock + throttle) and extend **NFR-SEC** accordingly.
- **Observability spec:** add **report-open event tracking** (timestamp, count; GM activity, no agent PII).
- **UC-03:** update the trigger — the GM opens the report at the desk via the combo + PIN, with auto-lock between sessions.

## 8 · Open items

1. **PIN setup & rotation** — how the GM's PIN is set at deployment and changed if needed.
2. **Idle timeout value** — the exact auto-lock interval (short).
3. **Lockout threshold** — number of wrong-PIN attempts before throttle.

---

*GuestIQ · GM Report Access · LOCKED v1.0 · Desk-only · Combo + PIN + auto-lock · Opens are tracked*
