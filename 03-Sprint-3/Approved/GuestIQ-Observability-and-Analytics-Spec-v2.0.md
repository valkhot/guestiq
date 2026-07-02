# GuestIQ — Observability & Analytics Specification (v2.0)

| | |
|---|---|
| **Document** | GuestIQ-Observability-and-Analytics-Specification — v2.0 (DRAFT · Stage 1 reconciliation) |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Supersedes** | Observability & Analytics Specification v1.0 (S0-3.3 — the pre-pivot 27-event / episode / tier / dashboard taxonomy) |
| **Implements** | Researcher Value Model v0.2 (the three Console lenses) · SRS v3.1 (NFR-OBS-01, FR-GMA-05) |
| **References** | Agent & GM Experience Spec v1.0 · GM Report Access LOCKED v1.0 · Data Model & API v1.2 |
| **Changes in v2.0** | **Purpose reoriented** to feed the **Researcher Console** (app health · agent activity · GM activity). **Entire event taxonomy replaced** for the projection model (badge, guest reads, depth fork, five-beat end-of-read, coverage wall, within-window replay). **GM report-open tracking** added (FR-GMA-05). Retired the episode/tier-selection/tier-upgrade/credentials/dashboard/gamification events. Platform config, init order, and privacy controls **retained from v1.0**. |
| **Prepared By** | Claude (AI Developer) |
| **Drift rule** | States events and their Console home; references v1.0 for unchanged platform configuration and the value models for the *why*. |

---

## 1 · Purpose — what changed

Observability is no longer just operational hygiene. Its **primary purpose is to feed the Researcher Console** — the in-app surface where the Lead Researcher judges whether the pilot worked (Researcher Value Model v0.2). The Console has three monitoring lenses, and this spec defines the events behind each:

| Console lens | Question | Source |
|---|---|---|
| **App health** | Did the software hold up? | Sentry (errors, crashes, performance) + PostHog (saves, downtime) |
| **Agent activity** | Did the agents take to it? | PostHog (the agent-journey events, per badge) |
| **GM activity** | Did the buyer engage? | The report open-log (FR-GMA-05) + PostHog |

The **pivot retired the old taxonomy** (episodes, tier *selection*, tier upgrades, credentials enrichment, the manager dashboard, gamification). §3 defines the replacement; §6 lists what's retired.

## 2 · Retained infrastructure (unchanged from v1.0)

These v1.0 decisions survive the pivot and are carried forward **as-is** — see v1.0 §2–§3 for exact configuration:

- **Two platforms, both mandatory:** **Sentry** (errors + performance) and **PostHog** (behavioural analytics + masked session replay).
- **Initialization order (mandatory):** Sentry → PostHog → React. Error capture begins before any code that can fail.
- **Single analytics service** (`src/services/analytics.js`): no component calls `posthog.capture()` directly; event names are constants defined once (no drift); `ip:false` applied universally.
- **`property_id`** on every event and record (`'PROP001'` in the pilot) — the Phase-2 multi-property foundation.
- **Privacy controls (load-bearing — see §5):** `ip:false`, `sendDefaultPii:false`, masked inputs in replay, no Sentry user context.

## 3 · The event taxonomy (new model)

Event names are exact: lowercase, underscore-separated, defined as constants in the analytics service. Properties exclude all PII. Every agent event carries the pseudonymous **`badge`** (no name) and `property_id`.

### 3.1 · App-health events
| Event | Fired when | Key properties | Source |
|---|---|---|---|
| `app_loaded` | App first renders | `device_type`, `browser_name`, `property_id` | PostHog |
| `error_captured` | Unhandled JS/React error | stack, component, `badge?` | Sentry (auto) |
| `service_failure` | Supabase write/read failure or **RLS rejection** | `type`, `function`, `severity` | Sentry |
| `save_failed` / `save_recovered` | A read save fails / is recovered on resume | `badge`, `guest_type`, `position` | PostHog + Sentry |
| `export_failure` | CSV/PDF export fails | `export_type` | Sentry |
| `supabase_downtime_shown` | Backend unreachable >60s | `position` | PostHog |
| *(performance)* | Core Web Vitals (LCP/INP/CLS/TTI) + the end-of-read story-gen span | — | Sentry (auto) |

### 3.2 · Agent-activity events (the journey, per badge)
| Event | Fired when | Key properties |
|---|---|---|
| `onboarding_viewed` / `onboarding_completed` | First-run hook shown / finished | `badge?` |
| `badge_claimed` | A new badge claimed from the claimable pool (FR-AGT-01) | `badge` |
| `badge_reentry` | A returning agent taps a **claimed** badge to re-enter (FR-AGT-02) | `badge` |
| `badge_repick_guard_shown` | The "already have a badge?" prompt shown | `badge?` |
| `guest_selected` | Guest type chosen (L1) + grounding shown | `guest_type` |
| `party_answered` | Party question (L2, first in-flow item) | `party_type`, `guest_type` |
| `read_started` | First item of a read renders | `badge`, `guest_type`, `party_type` |
| `question_answered` | Any item answered | `question_id`, `tier` (core/pro/expert) |
| `none_selected` | "None / not this guest" escape used | `question_id` |
| `depth_fork_offered` | The after-CORE depth invitation shown (FR-AGT-13) | `badge`, `guest_type` |
| `depth_fork_accepted` / `depth_fork_declined` | Agent goes deeper / finishes at CORE | `badge`, `guest_type` |
| `read_completed` | A read is finished | `badge`, `guest_type`, `tier_reached`, `duration_seconds` |
| `read_abandoned` | A read is left incomplete | `badge`, `position` (party/core/depth) |
| `endofread_completed` | The five-beat end-of-read finished (or skipped) (FR-AGT-09) | `badge`, `skipped?` |
| `coverage_wall_viewed` | The portrait wall shown | `badge`, `just_yours?` |
| `completed_range_reached` | Agent has covered everyone they know (FR-AGT-08) | `badge` |
| `replay_started` | Within-window replay of another guest (FR-AGT-14) | `badge` |

### 3.3 · GM-activity events (FR-GMA-05)
| Event | Fired when | Key properties |
|---|---|---|
| `report_opened` | GM opens the report (Ctrl+Alt+A + PIN) | `timestamp`, `open_count` |
| `report_pin_failed` | Wrong PIN entered | `attempt_count` |
| `report_dwell` | Time spent in a report session | `seconds` |
| `report_exported` | GM exports/shares the report | `export_type` |
| `report_autolocked` | Report auto-locks on idle/navigate-away (FR-GMA-04) | `reason` |

### 3.4 · Researcher-Console events
| Event | Fired when | Key properties |
|---|---|---|
| `console_opened` | Researcher opens the Console (researcher PIN) | `timestamp` |
| `validation_captured` | Researcher records a GM reaction per finding (J3) | `finding_id`, `non_obvious`, `would_act` |

## 4 · Events → Console lenses → jobs

| Lens / job | Built from |
|---|---|
| **App health** (J1) | §3.1 — availability, errors, crashes, saves, downtime, performance, device split |
| **Agent activity** (J1) | §3.2 — per-badge: reads, time-per-read (`read_completed.duration`), time-in-app (session span), sessions (`badge_reentry`), depth opt-in (`depth_fork_accepted` / offered), completion (`read_completed` / `read_started`), drop-off (`read_abandoned.position`), coverage (`read_completed.guest_type`) |
| **GM activity** (J1) | §3.3 — opens, re-opens, dwell, export, auto-lock |
| **Integrity** (J2) | distinct `badge` counts + the **fragmentation check** (badges with a single thin read), floor status per `guest_type` |
| **Validation** (J3) | `validation_captured` → the **North Star** tally (non-obvious + would-act) |
| **Iteration** (J4) | `none_selected` rates, depth-fork rates, abandonment positions, app issues |

## 5 · Privacy requirements (non-negotiable)

- **No PII, ever.** `ip:false` (PostHog) and `sendDefaultPii:false` (Sentry); no names, emails, or device identifiers; no Sentry user context.
- **Badge is pseudonymous.** The `badge` token is an animal+colour, carrying no identity and **no key** — per-badge events are "Fox," never a real person. The researcher **cannot deanonymize**.
- **Per-badge activity is a research signal, not performance** (Researcher Value Model §6/§8). It lives **only in the Console**, is **never a ranking**, and is **never shown to agents or the GM**.
- **Masked inputs in replay.** All free-text inputs masked; the end-of-read generated story is not transmitted.
- **GM activity is the GM's own.** `report_opened` and related events carry **no agent PII**.
- Any config change touching these (autocapture, user identification, replay masking) is a **scope change requiring Lead-Researcher approval**.

## 6 · Retired from v1.0 (drift removed)

The following v1.0 events/concepts described the pre-pivot product and are **removed**:

- **Episodes** (`episode_started/completed`, 1–7) → replaced by per-guest **reads**.
- **Tier *selection*** (`tier_selected` amateur/professional/expert) and **tier upgrades** (`tier_upgrade_*`) → there is no tier-selection screen; tiers are **CORE/PRO/EXPERT reached via the mid-read depth fork** (`depth_fork_*`).
- **Credentials enrichment** (`credentials_enrichment_completed`) → S3-16 dropped.
- **The manager dashboard** (`dashboard_opened`, `dashboard_panel_viewed`, **SHIFT+CTRL+A**) → replaced by the **GM report** (`report_opened`, **Ctrl+Alt+A** + PIN) and the **Researcher Console**.
- **`session_completed`** / `routing_gate_answered` (tense_frame) → replaced by `read_completed` and `guest_selected` + `party_answered`.
- **Gamification events** → none (no points/levels/streaks).

## 7 · Verification (updated)

Replaces v1.0 §7's 27-event audit:

1. **Agent journey fires** — `app_loaded → badge_claimed → guest_selected → party_answered → read_started → read_completed → endofread_completed` visible in PostHog, per badge.
2. **Depth fork** — `depth_fork_offered` fires after CORE; accepted/declined both recorded.
3. **Re-entry** — `badge_reentry` distinct from `badge_claimed` (so sessions-per-badge is countable).
4. **GM access** — `report_opened` fires on Ctrl+Alt+A + PIN; `report_autolocked` on idle; **no agent PII** on any GM event.
5. **Privacy** — no `ip` field on any event; inputs masked in replay; no Sentry user context; environment = `pilot`.
6. **Console lenses populate** — each of §4's lenses renders from live events.

## 8 · Version log

| Ver. | Change |
|---|---|
| 2.0 | Reoriented to the Researcher Console's three lenses; replaced the event taxonomy for the projection model; added GM report-open tracking; retired the episode/tier/dashboard/gamification events; retained platform config + privacy from v1.0. |

---

*GuestIQ · Observability & Analytics Specification · v2.0 · DRAFT · Feeds the Researcher Console · No PII · Per-badge is signal, not performance*
