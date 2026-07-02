# GuestIQ — Design System v2.0

| | |
|---|---|
| **Document** | Design System v2.0 — consolidated, developer-ready |
| **Supersedes** | `visual_design_system_v1.0` (S1-3.4) — retired (tier colours, episode map, progress bar, gamified badges, dashboard canvas, `#0D0D12`) |
| **Consolidates** | Design-Tokens-Sheet · `tailwind.config.js` · all 12 approved surface decisions (Design Session Brief v1.0) |
| **Governs** | Every GuestIQ surface, agent + admin. This is the single reference for Claude Code. |
| **Fonts** | Fraunces (display) · Spectral (body/story) · Space Mono (data/labels) — Google Fonts CDN |

---

## 1 · Principles

1. **Two canvases, never blended.** The **agent canvas** is warm, dark, cinematic (immersive work). The **admin canvas** (GM report + Researcher Console) is a light "findings dossier" (sober, printable). They must not inherit from or resemble each other.
2. **Dignified intelligence-dossier register.** Expert-witness tone, never gamified or junior (NFR-TONE-01). Fun comes from *meaning*, never mechanics.
3. **Plain language.** Agent-facing copy uses common, short words a non-native speaker reads instantly — no idioms/phrasal verbs in controls (NFR-TONE-02). Professional ≠ complex.
4. **Recognition, never score.** No points, tiers, leaderboards, or progress-as-game. The identity badge is an anonymous marker, never a rating.
5. **Honest by construction.** Raw counts never %; counts never names; convergent belief ≠ fact; nothing faked (e.g. the constellation degrades rather than invent agreement).

---

## 2 · Colour tokens

### 2.1 Agent canvas — *warm-midnight-lobby* (dark)

| Token | Hex / value | Use |
|---|---|---|
| `--ink` | `#16141D` | base background |
| `--ink-2` | `#1E1A27` | raised surface |
| `--ink-3` | `#262031` | card / option |
| `--ink-4` | `#2D2638` | hover surface |
| `--brass` | `#C8A24E` | primary accent, CTAs |
| `--brass-bright` | `#E7C879` | emphasis, active |
| `--glow` | `#F4DC97` | focal glow (constellation, claim) |
| `--thread` | `rgba(200,162,78,.55)` | constellation threads |
| `--heading` | `#F1ECDF` | display headings |
| `--text` | `#EDE9F2` | body text |
| `--mute` | `#8E8699` | secondary text |
| `--mute-2` | `#615A70` | tertiary / fineprint |
| `--parchment` / `-2` | `#EFE7D6` / `#E4D9C2` | warm light fills (rare on dark) |
| `--parchment-ink` | `#2C271F` | ink on parchment |
| `--line` / `--line-2` | `rgba(255,255,255,.08)` / `.12` | hairlines |
| `--ok` | `#7FB389` | positive status |
| `--warn` | `#D9A441` | caution |
| `--bad` | `#C77B6B` | negative (terracotta — never harsh red) |
| `--cool` | `#6E84B0` | informational / slate |

Background gradient (agent screens): `radial-gradient(120% 85% at 50% -5%, #221C2E 0%, #16141D 55%, #100E16 100%)`.

### 2.2 Admin canvas — *findings dossier* (light)

| Token | Hex | Use |
|---|---|---|
| `--paper` | `#F4EFE3` | page background |
| `--sheet` | `#FBF8F0` | document sheet |
| `--card` | `#FFFFFF` | inner cards / metrics |
| `--ink` | `#23201A` | primary text |
| `--ink-soft` | `#514B3F` | body / evidence |
| `--mute` | `#8B8272` | labels / captions |
| `--rule` / `--rule-2` | `#E2DAC8` / `#D6CCB6` | dividers / borders |
| `--brass` | `#9A7233` | accent (deeper, for light bg) |
| `--brass-soft` | `#B08A45` | secondary accent |
| `--teal` | `#0F6E68` | lever / confirm accent |
| `--risk` | `#A0503B` | inferred / flag / risk |
| `--ok` | `#4F6B4A` | pass / witnessed |
| `--warn` | `#B07A2A` | near / caution |

> **⚠ Never** use agent-canvas brass (`#C8A24E`) on the light canvas or dossier brass (`#9A7233`) on the dark canvas — the two are tuned for their backgrounds' contrast.

---

## 3 · Typography

| Family | Role | Notes |
|---|---|---|
| **Fraunces** | Display — headings, case titles, greetings | weights 400/500/600; italic for warmth ("You're the Fox") |
| **Spectral** | Body & story — prose, evidence, the RosaeNLG story | 300/400/500; italic for quotes |
| **Space Mono** | Data & labels — eyebrows, counts, chips, mono captions | uppercase + letter-spacing for labels |

**Roles as utilities** (not per-component CSS): `display` → Fraunces · `story` → Spectral · `mono` → Space Mono. Load via one Google Fonts link; **flag if fonts don't load** (mockups depend on the CDN).

Indicative scale: display 25–40px / section-title 20–26px / body 15–17px / label-mono 9–11px (letter-spacing .12–.3em, uppercase).

---

## 4 · Spacing · radius · elevation · motion

**Radius:** `sharp 2` · `sm 4` · `md 8` · `lg 14` · `pill 999`.
**Elevation (dark):** `e1` subtle · `e2` card · `e3` `0 24px 60px -24px rgba(0,0,0,.7)` · `glow` brass focal.
**Elevation (light):** dossier shadow `0 30px 70px -40px rgba(60,45,20,.4)`.
**Motion:** `fast .2s` · `base .25s` · `slow .7s` · `entrance 1s`, easing `cubic-bezier(.2,.7,.2,1)`.
**Reduced motion:** every transition/animation wrapped in `@media (prefers-reduced-motion: reduce)` → disabled (threshold thread, constellation, breathe, glow).

---

## 5 · Components — agent canvas

| Component | Spec | Source |
|---|---|---|
| **Identity coin** | round ink medallion · colour ring (2.3–2.5px `currentColor`) · animal SVG line-art (~66% of coin) · brass rim | `Full-Badge-Set-v2` |
| **Corner badge** | 44px coin + name ("Fox"), pinned top-right of every read | `Read-Screen` |
| **Persona chip** | pill, mono uppercase, brass, `· dot`; pinned ("Reading · the Business guest") | `Read-Screen` |
| **Option row** | `--ink-3` card, `--line` border, radius 8; hover `--ink-4`; ~10 per question + one quiet CF-sink | `Read-Screen` |
| **Free-text field** | prominent ✎ label + textarea (2 rows), `1.5px rgba(200,162,78,.4)` border, brass focus glow | `Read-Screen` |
| **Dot rail** | quiet progress dots, active = elongated brass; **no counter, no bar** | `Read-Screen` |
| **Primary CTA** | brass fill, ink text, radius 2, mono uppercase; hover `--brass-bright` + lift | all agent |
| **Equal choices** | two forward CTAs same weight ("A few more →" / "See your read →") — neither reads as quitting | `DepthInvitation-v2` |

---

## 6 · Components — payoff surfaces

**End-of-read (five beats)** — `EndOfRead-v2`:
- **Threshold** — brass thread widens; punctuation only.
- **Dossier row** — mono key (`Notices` / `Forgets` / `Would value` / `Avoids`) + Spectral value; volume line in mono brass.
- **Story** — Spectral 18px, brass emphasis on their phrases; on-device (RosaeNLG).
- **Constellation** — SVG: centre glow (their read), brass threads to agreeing reps, ★ solo insight; **counts never names**; scaled to floor; degrades to "first on record."
- **Gallery** — guest persona marks (not the badge); new portrait glows.
- **Signature** — neutral "Recorded with thanks — GuestIQ".

**Coverage wall** — `CoverageWall-v2`:
- **Portrait frame** — 3 states: `vivid` (Known well, brass glow) · `forming` (Started) · `empty` (Do you know them? — dashed, call-to-action). **Status bands only — never counts, no leaderboard.**
- **Order:** gaps-first (empty top → known bottom).
- **Recognition line** — count-only ("three guests"), **no denominator**, thanks the knowledge.
- **⬡ pin** — marks the agent's own reads on the desk-wide wall.

---

## 7 · Components — admin dossier canvas

| Component | Spec | Source |
|---|---|---|
| **Masthead** | 2px ink rule, mono brand + "Confidential" pill, Fraunces title, mono meta ("no guest data · no AI") | `GM-Findings-Report` |
| **Finding block** | mono `FINDING 0N` + lever chip + confidence chip → Fraunces headline → **verbatim pull-quote (leads)** → raw-count evidence → "What this reveals" (ends here — no recommendation) | `GM-Findings-Report` |
| **Lever chip** | `Desk-controllable` (teal) / `Brand-level` (neutral) — informational | `GM-Findings-Report` |
| **Confidence chip** | `Witnessed` (ok) / `Inferred` (risk) | both |
| **Count** | mono, in a soft brass tint; raw only ("6 of 9"), **never %/name** | both |
| **Lens section** | mono `Lens 0N` + Fraunces title + italic sub; integrity-first ordering | `Researcher-Console-v3` |
| **KPI tile** | card, mono label + Fraunces value; ops % allowed here (not findings) | `Researcher-Console-v3` |
| **Convergence bar** | `ok`/`near`/`low` fill vs the ≥3-reps+majority floor | `Researcher-Console-v3` |
| **Guardrail check** | pass (`ok ✓`) / flag (`risk !`) rows | `Researcher-Console-v3` |
| **Locked access** | Ctrl+Alt+**A** (GM) / Ctrl+Alt+**R** (Researcher) + PIN + auto-lock | `GM-Report-Access-LOCKED` |

---

## 8 · Identity badges — the 12 coins

Anonymous **animal + colour**; animal-only naming ("You're the Fox" — colour is visual only). Custom SVG line-art, coin/seal form, themeable via `currentColor`.

| Animal | Colour | | Animal | Colour |
|---|---|---|---|---|
| Fox | `#D69A4C` amber | | Hare | `#C77B6B` clay |
| Owl | `#6E84B0` slate | | Boar | `#8A3A33` oxblood |
| Bear | `#C8A24E` brass | | Lynx | `#CBB37E` sand |
| Hawk | `#B5663F` rust | | Ram | `#8DA67E` sage |
| Wolf | `#9AA0AE` pewter | | Tortoise | `#8E6E97` plum |
| Hedgehog | `#E4D9C2` ivory | | Badger | `#4E8C86` teal |

*(Open polish, non-blocking: Wolf slightly fox-like, Lynx generic-cat — tunable; a higher-polish illustrated set is a future drop-in.)*

---

## 9 · Content & tone rules

- **NFR-TONE-01** — expert-witness register; no gamified/junior language.
- **NFR-TONE-02** — plain language / ESL: common short words; no idioms/phrasal verbs in controls (agent surfaces; admin exempt). *Approved brand exception:* welcome CTA "Let's get it down →" (has supporting body copy).
- **Retired vocabulary** (never resurface): "results", "score", "tier", "level up", "achievement", "dashboard", "survey about how you're doing".
- **Anonymity wording** — precise, never "fully anonymous" (reads link to a badge); "Counts, never names."

---

## 10 · Accessibility

- **WCAG 2.1 AA** (NFR-A11Y-01) — keyboard nav, focus states, ARIA, contrast. Body text on both canvases meets AA; brass is accent/decorative, not sole carrier of meaning.
- **Reduced motion** honoured everywhere (§4).
- **Touch** — real-iPad validated; comfortable targets; the free-text field is a first-class, easily-tappable target.
- **ESL** — plain language (NFR-TONE-02) is an accessibility requirement here, not just tone.

---

## 11 · Source-of-truth surface index

| Surface | Canvas | Mockup |
|---|---|---|
| Welcome | agent | `Welcome-Screen-Alt2` |
| Onboarding / badge claim + re-entry | agent | `Onboarding-BadgeClaim` |
| Guest-select + grounding | agent | `GuestSelect-Grounding` |
| Read / answering | agent | `Read-Screen` |
| Depth invitation | agent | `DepthInvitation-v2` |
| End-of-read (five beats) | agent | `EndOfRead-v2` |
| Coverage wall + completed-range | agent | `CoverageWall-v2` |
| GM Findings Report | admin | `GM-Findings-Report` |
| Researcher Console | admin | `Researcher-Console-v3` |
| Downtime / config-error | agent/admin | `Downtime-ConfigError` |
| Badge set (12 coins) | agent | `Full-Badge-Set-v2` |
| Agent journey flow | ref | `Agent-Journey-Flow` |

---

## 12 · Implementation notes

- **Tokens → Tailwind:** codified in `tailwind.config.js` (radius sharp2/sm4/md8/lg14/pill999; elevation e1/e2/e3/glow; motion fast/base/slow/entrance). Type used as utilities (`display`/`story`/`mono`).
- **Two-canvas theming:** scope tokens per canvas (agent dark / admin light); a component may exist in only one canvas — do not port styling across.
- **Fonts:** single Google Fonts link (Fraunces + Spectral + Space Mono); provide a system-serif/mono fallback and flag load failures.
- **SVG-first:** badges, persona marks, constellation, persona icons are inline SVG (`currentColor`-themeable) — no icon fonts, no emoji in product UI.
- **No third-party AI in any surface:** the end-of-read story is RosaeNLG (in-browser); the report is deterministic compute-on-open.

*GuestIQ · Design System v2.0 · consolidates the design session · two canvases · Fraunces / Spectral / Space Mono · retires visual_design_system_v1.0*
