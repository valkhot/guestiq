# GuestIQ · US-9.3 — PostHog Health Dashboards (build guide)

You build these in **PostHog's web UI** (app.posthog.com → your GuestIQ project), not in the code. Nothing to place in the repo. Below is a click-by-click guide, mapped to the events GuestIQ actually sends — so every panel will populate.

> **Before you start:** do a few full reads in the app (claim → pick → read → fork → *See your read*) so PostHog has events to chart. Panels are empty until data exists. Events can take a minute to appear.

## The events GuestIQ sends (your building blocks)

| Event | Fires when | Properties you can break down / filter by |
|---|---|---|
| `app_opened` | app loads | — |
| `badge_claimed` | agent claims a coin | `badge` |
| `picker_viewed` | reaches the guest picker | — |
| `read_started` | a read begins | `persona`, `depth` |
| `question_answered` | a question is answered | `persona`, `item_id`, `item_type` |
| `depth_fork_shown` | the fork is offered | `persona` |
| `depth_chosen` | a fork choice is made | `persona`, `choice` (`deeper` / `see_read`) |
| `read_completed` | a read finishes | `persona`, `depth`, `questions` |

The agent's anonymous identity is the **badge token** (via `identify`) — so "unique users" = unique badges, never names.

---

## Step 1 · Create the dashboard

1. Left sidebar → **Dashboards** → **New dashboard** → start **Blank**.
2. Name it **GuestIQ — Study Health**. Save.
3. You'll add panels ("insights") to it below. For each: **+ Add insight** (or build in **Product analytics → New insight**, then **Add to dashboard**).

---

## Step 2 · The panels (build these seven)

### Panel 1 — Completion funnel (the North Star)
*Shows where agents drop off, from open to finished read.*
1. New insight → type **Funnel**.
2. Add steps in order: `app_opened` → `picker_viewed` → `read_started` → `read_completed`.
3. Set the conversion window to **1 day**.
4. Save as **"Completion funnel"** → add to dashboard.
> Read it as: of everyone who opened the app, what % finished a read. Big drop at a step = that's where to smooth the flow.

### Panel 2 — Reads completed over time
*Volume trend — is contribution growing?*
1. New insight → **Trends**.
2. Series: `read_completed`, measured by **Total count**.
3. Chart type **Line**, interval **Day** (or Week for the pilot).
4. Save as **"Reads completed / day"**.

### Panel 3 — Depth opt-in rate
*What share of finished reads went deeper (the "expert" path).*
1. New insight → **Trends**.
2. Series A: `depth_chosen` filtered where **choice = deeper** → **Total count**.
3. Series B: `read_completed` → **Total count**.
4. Add a **formula**: `A / B` (PostHog: toggle "Formula", enter `A/B`). Display as %.
5. Save as **"Depth opt-in rate"**.
> This mirrors Console Lens 02's "went deeper" — a cross-check.

### Panel 4 — Coverage by guest type
*Which personas are being read (find the gaps).*
1. New insight → **Trends**.
2. Series: `read_completed` → **Total count**.
3. **Break down by** → event property → **`persona`**.
4. Chart type **Bar**, date range **All time**.
5. Save as **"Reads by guest type"**.
> Short bars / missing personas = coverage gaps — the same signal as Console Lens 06.

### Panel 5 — Active agents (badges)
*How many distinct agents are contributing.*
1. New insight → **Trends**.
2. Series: `read_started` (or `app_opened`) → measured by **Unique users**.
3. Interval **Day** or **Week**.
4. Save as **"Active agents"**.
> Unique users = unique badge tokens (anonymous), never names.

### Panel 6 — Fork behaviour
*At the depth fork, how many go deeper vs. stop.*
1. New insight → **Trends**.
2. Series: `depth_chosen` → **Total count**, **broken down by** property **`choice`**.
3. Chart type **Bar** (or pie).
4. Save as **"Fork: deeper vs see-read"**.

### Panel 7 — Question drop-off (optional, deeper)
*Which question types lose people (if you see abandonment).*
1. New insight → **Trends**.
2. Series: `question_answered` → **Total count**, **broken down by** property **`item_type`**.
3. Save as **"Answers by question type"**.
> If one `item_type` is far lower, that format may be causing friction.

---

## Step 3 · Arrange & set the range

- Drag the panels so the **funnel (Panel 1)** and **reads/day (Panel 2)** sit at the top — they're the headline health signals.
- Top-right of the dashboard → set a default date range (e.g. **Last 30 days**; switch to **Last 7 days** during the pilot).
- Optional: **Share** → get a read-only link for the GM if they want to glance at study health (the *findings* stay in the PIN-gated report; this is just ops health).

---

## Step 4 · Sanity-check it's live

1. Open the app, do **one full read** (through *See your read*).
2. Wait ~1 min, hard-refresh the dashboard.
3. **Completion funnel** should show your run passing through all four steps; **Reads by guest type** should show a bar for the persona you read.
4. If panels stay empty: confirm the **PostHog key** is set in `analytics.js` (it is — `phc_…`), and that you're not in an incognito/blocked session. PostHog events are named-only (no answer content), so panels reflect *flow*, never what was answered.

---

## What this satisfies (US-9.3)

Three health signals the study needs, now visible in PostHog:
- **Completion** (funnel + reads/day),
- **Depth opt-in** (Panel 3),
- **Coverage** (Panel 4) + supporting agent/fork/question views.

This completes the observability trio: **Sentry** (errors) + **Console** (six lenses, in-app) + **PostHog** (these funnels/trends). Nothing here changes the anonymity posture — every panel is counts and flows over anonymous badge tokens, never names or answer content.

---

*GuestIQ · US-9.3 · PostHog health dashboards · build-in-PostHog guide · mapped to live events · no repo changes*
