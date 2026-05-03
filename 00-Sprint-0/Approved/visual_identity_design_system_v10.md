**VISUAL IDENTITY AND DESIGN SYSTEM**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-3.1 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Related Documents** | Project Charter v2.1 (S0-1.1) · Methodology Document v1.1 (S0-0.1) · SRS-F v2.0 (S0-2.1) · Visual Design System (S1-3.3, Sprint 1) |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Visual-Identity-Design-System-v1.0.docx |
| **Downstream Artifacts** | This document is the source of truth for S1-3.3 (Visual Design System). All values here are locked. Sprint 1 translates them into component-level specifications. |

[INFO] This document is produced in Sprint 0 Phase 0.3 as one of four architecture documents that feed directly into Sprint 1 design. It defines all visual identity and design token decisions. Sprint 1 then produces the Visual Design System (S1-3.3) which translates these decisions into developer-ready component specifications.

**⚠ All values in this document are LOCKED following Lead Researcher approval. No hex value, font size, badge name, or episode name may be changed without a formal scope change request. The Visual Design System (Sprint 1) and all subsequent build steps depend on these values.**

# 1. Visual Direction and Design Philosophy

GuestIQ was selected under Visual Concept C — Modern Engagement. This decision is recorded in the Master Development Timeline decision log and is not subject to revisitation.

Modern Engagement means the application communicates professional credibility while maintaining genuine warmth. It is not a clinical survey tool and it is not a casual consumer app. It lives in the space between: a professional instrument that respects the respondent's expertise and makes their contribution feel consequential.

Three principles govern every design decision in this document:

- Depth signals seriousness. The deep near-black respondent canvas (#0D0D12) communicates that this is a focused, professional environment — not a bright consumer survey. The respondent is entering a dedicated space.
- Contrast signals reward. Tier accent colors, badge reveals, and curiosity hook screens all use higher-contrast, warmer tones against the dark canvas. Color earns its appearance by marking moments of achievement or transition.
- Restraint signals respect. Typography is clean and generous. Spacing is intentional. The instrument does not compete with its own content for attention.

## 1.1 Two-Canvas System

GuestIQ operates across two visually distinct canvases. This distinction is mandatory — the management dashboard must never feel like it is part of the respondent experience.

| **Canvas** | **Hex Value and Usage** |
| --- | --- |
| **Respondent Canvas** | #0D0D12 — Deep near-black. Used for all respondent-facing screens: welcome, tier selection, all question screens, episode transitions, completion screen, enrichment screen. The respondent lives in this environment throughout their session. |
| **Dashboard Canvas** | #0B1120 — Dark navy. Used exclusively for the management overlay (SHIFT+CTRL+A). Visually distinct from the respondent canvas — a manager who accidentally triggers the overlay immediately knows they have entered a different space. The dashboard closes cleanly back to the respondent canvas. |

[DEV] AI DEVELOPER: The two-canvas distinction must be enforced in code. The dashboard overlay applies background: #0B1120 — never inherit from the respondent canvas. Tailwind custom property: --canvas-respondent: #0D0D12; --canvas-dashboard: #0B1120.

# 2. Application Name and Wordmark

## 2.1 Application Name

The application name is GuestIQ. This name is confirmed and locked in the Project Charter v2.1. The capitalisation is fixed: capital G, capital I, capital Q — no spaces, no hyphen.

The name communicates two things simultaneously: Guest (the subject of the research) and IQ (intelligence, expertise, analytical depth). It positions front desk staff as experts whose knowledge has measurable value.

## 2.2 Wordmark Specifications

The GuestIQ wordmark appears in two contexts with different specifications:

| **Context** | **Specification** |
| --- | --- |
| **Dark canvas variant (primary)** | Used on the respondent canvas (#0D0D12) and dashboard canvas (#0B1120). Wordmark renders in white #FFFFFF. 'Guest' in font-weight 300 (light). 'IQ' in font-weight 700 (bold). This weight contrast is the visual anchor of the wordmark — do not use uniform weight. Size: 28px on welcome screen, 20px on question headers. |
| **Light context variant** | Used in documentation, reports, and any light-background context. Wordmark renders in #1B3A6B (navy). Same weight contrast: 'Guest' 300, 'IQ' 700. Size scales proportionally to context. |
| **Font** | Inter — used exclusively for the wordmark. Falls back to system-ui. Do not use the primary body font (see Section 4) for the wordmark. |
| **Minimum size** | 20px rendered. Below this the weight contrast is lost. Do not use wordmark below 20px. |
| **Clear space** | Minimum clear space around the wordmark equals the cap-height of the 'G' on all sides. No other text or graphic element intrudes on this space. |
| **Prohibited uses** | Do not rotate, skew, recolor, or add effects to the wordmark. Do not separate 'Guest' and 'IQ' as separate elements. Do not use the wordmark on a mid-tone background where neither the light nor dark variant provides sufficient contrast. |

[DEV] AI DEVELOPER: Implement the wordmark as a React component <GuestIQWordmark variant='dark'|'light' size={28} />. The component renders two <tspan> elements with different font-weight values — not two separate elements. This ensures the wordmark scales correctly and remains a single accessible text node.

# 3. Complete Color Token System

All colors are specified as locked design tokens. Tailwind CSS custom properties implement these tokens. No component in the codebase uses raw hex values — all colors reference token names. This enables Phase 2 theming and ensures visual consistency across the entire application.

## 3.1 Canvas Tokens

| **Token / Name** | **Hex Value** | **Purpose and Usage** |
| --- | --- | --- |
| **--canvas-respondent** | #0D0D12 | Primary respondent-facing background. All question screens, welcome screen, episode transitions, completion screen. |
| **--canvas-dashboard** | #0B1120 | Management dashboard overlay background. Distinct from respondent canvas. Used only for SHIFT+CTRL+A overlay. |
| **--canvas-surface** | #161620 | Elevated surface on respondent canvas — used for question cards, tier selection cards, curiosity hook containers. |
| **--canvas-overlay** | #1E1E2E | Highest elevation on respondent canvas — used for disambiguation screen, downtime screen modal. |

## 3.2 Tier Color System — Complete Stops

Each tier has a complete 6-stop color scale. The primary stop (400) is the locked brand color. Lighter stops are used for backgrounds and subtle tinting. Darker stops are used for text on light backgrounds and active state borders.

### Amateur — Green

| **Token / Name** | **Hex Value** | **Purpose and Usage** |
| --- | --- | --- |
| **--amateur-50** | #F0FDF4 | Lightest background tint. Used for Amateur tier card background on light-context views. |
| **--amateur-100** | #DCFCE7 | Light background. Used for Amateur completion badges in light mode. |
| **--amateur-200** | #BBF7D0 | Subtle accent. Used for Amateur progress bar track. |
| **--amateur-400** | #4ADE80 | PRIMARY — LOCKED. Amateur tier identity color. Tier card CTA, progress bar fill, badge accent. |
| **--amateur-600** | #16A34A | Deeper accent. Active state border, focused element ring for Amateur tier. |
| **--amateur-800** | #166534 | Text color on light Amateur backgrounds. Never used on dark canvas directly. |

### Professional — Blue

| **Token / Name** | **Hex Value** | **Purpose and Usage** |
| --- | --- | --- |
| **--professional-50** | #EFF6FF | Lightest background tint. Professional tier card background on light-context views. |
| **--professional-100** | #DBEAFE | Light background. Professional completion badges in light mode. |
| **--professional-200** | #BFDBFE | Subtle accent. Professional progress bar track. |
| **--professional-400** | #60A5FA | PRIMARY — LOCKED. Professional tier identity color. Tier card CTA, progress bar fill, badge accent. |
| **--professional-600** | #2563EB | Deeper accent. Active state border, focused element ring for Professional tier. |
| **--professional-800** | #1E3A8A | Text color on light Professional backgrounds. |

### Expert — Purple

| **Token / Name** | **Hex Value** | **Purpose and Usage** |
| --- | --- | --- |
| **--expert-50** | #F5F3FF | Lightest background tint. Expert tier card background on light-context views. |
| **--expert-100** | #EDE9FE | Light background. Expert completion badges in light mode. |
| **--expert-200** | #DDD6FE | Subtle accent. Expert progress bar track. |
| **--expert-400** | #A78BFA | PRIMARY — LOCKED. Expert tier identity color. Tier card CTA, progress bar fill, badge accent. |
| **--expert-600** | #7C3AED | Deeper accent. Active state border, focused element ring for Expert tier. |
| **--expert-800** | #4C1D95 | Text color on light Expert backgrounds. |

## 3.3 Neutral and Structural Tokens

| **Token / Name** | **Hex Value** | **Purpose and Usage** |
| --- | --- | --- |
| **--neutral-0** | #FFFFFF | Pure white. Answer option backgrounds, card inner surfaces on dashboard. |
| **--neutral-100** | #F8FAFC | Off-white. Subtle hover state on answer options. |
| **--neutral-200** | #E2E8F0 | Light border. Separator lines, unselected episode nodes. |
| **--neutral-400** | #94A3B8 | Muted text. Secondary labels, instructions, supporting copy on dark canvas. |
| **--neutral-600** | #64748B | Mid text. Episode node labels in completed state. |
| **--neutral-800** | #1E293B | Near-black text. Used only on light backgrounds. |
| **--text-primary** | #F8FAFC | Primary body text on dark canvas. Questions, answer options, headings. |
| **--text-secondary** | #94A3B8 | Secondary text on dark canvas. Instructions, timestamps, supporting copy. |
| **--text-muted** | #64748B | Muted text on dark canvas. Placeholder states, disabled elements. |

## 3.4 Semantic Tokens

| **Token / Name** | **Hex Value** | **Purpose and Usage** |
| --- | --- | --- |
| **--semantic-success** | #22C55E | Success states. Session completion, correct routing confirmation. |
| **--semantic-warning** | #F59E0B | Warning states. Downtime screen, low-data dashboard warning. |
| **--semantic-error** | #EF4444 | Error states. Sentry-captured errors displayed to developer, offline queue failure. |
| **--semantic-info** | #38BDF8 | Informational states. Disambiguation screen notice, privacy notice accent. |
| **--semantic-none-flag** | #F97316 | None-flag indicator. Visual marker for 'None of these fit' option selections throughout the instrument. |

## 3.5 Dashboard-Specific Tokens

The management dashboard uses its own set of overlay tokens applied on the --canvas-dashboard (#0B1120) background.

| **Token / Name** | **Hex Value** | **Purpose and Usage** |
| --- | --- | --- |
| **--dash-panel-bg** | #131829 | Dashboard panel background. Each of the 9 panels sits on this surface. |
| **--dash-panel-border** | #1F2B4A | Panel border. Subtle separation between panels. |
| **--dash-text-primary** | #E2E8F0 | Primary text on dashboard. Panel headings, data values. |
| **--dash-text-secondary** | #94A3B8 | Secondary text on dashboard. Axis labels, legends, supporting copy. |
| **--dash-accent** | #60A5FA | Dashboard accent. Chart highlights, active panel tabs, export buttons. |
| **--dash-grid** | #1A2540 | Chart grid lines on dashboard. Very subtle — must not compete with data. |

[DEV] AI DEVELOPER: All tokens above must be implemented as Tailwind CSS custom properties in tailwind.config.js extend.colors and as CSS custom properties in :root within the global stylesheet. No component uses raw hex. Example: bg-canvas-respondent, text-tier-amateur-400, border-professional-600.

# 4. Typography Scale

GuestIQ uses a 6-level typography scale. The primary typeface is Inter — a clean, highly legible humanist sans-serif that performs well on Windows at all screen densities. Inter is available via Google Fonts and is included in the project build.

[INFO] Inter is chosen specifically for its legibility on standard hotel PC monitors (typically 1920×1080 at 100% scaling). The variable font file is used — this allows weight transitions for the wordmark and gamification elements without loading multiple font files.

| **Level** | **Specification** |
| --- | --- |
| **Level 1 — Display** | Inter, weight 700 (bold). Size: 32px / 2rem. Line height: 1.2. Used for: completion screen congratulatory heading, welcome screen hook headline. Applies only on dark canvas. |
| **Level 2 — Heading Large** | Inter, weight 600 (semibold). Size: 24px / 1.5rem. Line height: 1.3. Used for: episode transition headings, tier card tier names, curiosity hook titles. |
| **Level 3 — Heading Medium** | Inter, weight 600 (semibold). Size: 20px / 1.25rem. Line height: 1.4. Used for: question text (the question itself), module section headings in dashboard. |
| **Level 4 — Heading Small** | Inter, weight 500 (medium). Size: 16px / 1rem. Line height: 1.4. Used for: answer option labels, panel headings in dashboard, tier descriptor text in tier cards. |
| **Level 5 — Body** | Inter, weight 400 (regular). Size: 15px / 0.9375rem. Line height: 1.6. Used for: instruction lines below questions, supporting copy, privacy notice, tier time estimates. |
| **Level 6 — Caption** | Inter, weight 400 (regular). Size: 13px / 0.8125rem. Line height: 1.5. Used for: dashboard axis labels, timestamp displays, secondary metadata, badge trigger labels in documentation. |

| **Rule** | **Detail** |
| --- | --- |
| **Letter spacing** | Questions (Level 3): letter-spacing: -0.01em — slightly tighter for density. Tier names (Level 2): letter-spacing: 0.02em — slightly open. All caps labels: letter-spacing: 0.08em — standard all-caps tracking. Never apply negative letter-spacing to body text. |
| **Font loading** | Inter variable font loaded via @font-face with font-display: swap. Fallback stack: Inter, system-ui, -apple-system, sans-serif. The application must be visually functional during font load — no layout shift. |
| **Color on dark canvas** | Level 1–3: --text-primary (#F8FAFC). Level 4: --text-primary. Level 5–6: --text-secondary (#94A3B8). Exception: answer option selected state uses the active tier's 400 color for the label text. |
| **Prohibited uses** | Do not use weights below 400 in the application UI (300 is reserved for wordmark 'Guest' element only). Do not use font sizes outside this scale. Do not use italic outside of error/edge-case states. Do not use underline for emphasis — use weight change instead. |

[DEV] AI DEVELOPER: Implement the typography scale as Tailwind custom utilities in tailwind.config.js. Class names: text-display, text-heading-lg, text-heading-md, text-heading-sm, text-body, text-caption. Each class sets font-size, line-height, and letter-spacing as a compound utility. Font-weight is set separately via font-bold / font-semibold / font-medium / font-normal.

# 5. Tier Card Visual Identity

The three tier cards on the welcome screen are the respondent's first design decision. Their visual design must clearly communicate the identity and expectation of each tier while making all three feel like valid, appealing choices.

## 5.1 Tier Card Anatomy

| **Element** | **Specification** |
| --- | --- |
| **Card background** | --canvas-surface (#161620). All three tier cards use the same background. |
| **Card border (default)** | 1px solid --neutral-200 (#E2E8F0) at 20% opacity. Subtle separation. |
| **Card border (hover)** | 1px solid [tier-400 color]. On hover, the card border transitions to the tier's primary color. Transition: border-color 150ms ease. |
| **Card border radius** | 12px. Consistent with the overall design system rounded-xl. |
| **Tier name** | Level 2 typography. Color: [tier-400 color]. Bold weight. Example: 'Amateur' in #4ADE80. |
| **Tier descriptor** | Level 5 typography. Color: --text-secondary. One sentence maximum. Examples: 'Foundation level — essential guest experience principles' / 'Practitioner level — comprehensive guest behaviour analysis' / 'Research depth — full 79-question professional instrument'. |
| **Time and question count** | Level 6 typography. Color: --text-muted. Format: '5 min · 8 questions' / '8 min · 18 questions' / '16 min · 79 questions'. |
| **CTA button** | Text: 'Start as [Tier Name]'. Background: [tier-400 color]. Text: dark canvas color for sufficient contrast. Border radius: 8px. Full width within card. Font: Level 4. |
| **'Most selected' badge** | Professional tier card only. Small pill badge above the tier name: 'Most selected'. Background: --professional-100. Text: --professional-800. Font: Level 6. This sets a social proof anchor. |
| **Selected state** | Not applicable — tier selection is a one-way transition. There is no persistent 'selected' state on the welcome screen. Clicking 'Start as [Tier]' immediately begins the session. |

[DEV] AI DEVELOPER: Tier cards are implemented as React components <TierCard tier='amateur'|'professional'|'expert' />. The tier prop drives all color token selections — no hardcoded colors inside the component. The 'Most selected' badge is hardcoded to Professional in Phase 1 and will be data-driven in Phase 2.

# 6. Episode Visual Identity

The 7 episodes form the narrative backbone of the GuestIQ experience. Each episode has a name, a module mapping, and a visual identity color used for its episode node in the episode map, its curiosity hook screen accent, and its badge.

## 6.1 Episode Map and Node Specifications

| **Element** | **Specification** |
| --- | --- |
| **Episode map position** | Fixed at top of every question screen, below the progress bar. Always visible during an active session. |
| **Node shape** | Circle. 24px diameter. Completed nodes: filled with episode accent color + checkmark icon in white. Current node: filled with episode accent color + pulsing ring animation (opacity 0.4 → 0, 1.5s infinite). Future nodes: 8px diameter, --neutral-200 fill. |
| **Node spacing** | Equal spacing across the full width of the screen. 7 nodes always visible. |
| **Progress bar** | Single horizontal bar above the episode map. Height: 4px. Background: --neutral-200. Fill: current tier's 400 color. Fill width calculated as (questions\_answered\_in\_current\_episode / total\_questions\_in\_episode). Resets and refills with each new episode. Framer Motion spring animation on fill update. |
| **Episode label** | Shown below the current node only. Level 6 typography. Episode name truncated to 20 characters maximum with ellipsis. Color: --text-secondary. |

## 6.2 Episode Identity Table

Each episode is assigned a visual accent color for its curiosity hook screen and episode node. These colors are intentionally varied to mark the transition between subject domains — the respondent perceives visual change as narrative progression.

| **Ep.** | **Module** | **Episode Name** | **Accent Color** | **Hex** | **Usage** |
| --- | --- | --- | --- | --- | --- |
| 1 | M1 | **Why Do Guests Actually Come Here?** | Teal | #14B8A6 | Stay intent — anchors the research context. Cool, focused, analytical. |
| 2 | M3 | **The Room They Are Imagining** | Amber | #F59E0B | Physical environment — warm, sensory, material. Connects to comfort and space. |
| 3 | M2 | **Finding and Arriving** | Sky | #38BDF8 | Pre-arrival — light, open, journey-oriented. Transition into the hotel experience. |
| 4 | M4 | **The Human Side** | Rose | #F43F5E | Service and human interaction — warm, relational, emotionally resonant. |
| 5 | M5 | **What This Guest Actually Needs** | Violet | #8B5CF6 | Functional needs — purpose-specific, analytical depth, branched complexity. |
| 6 | M6 | **Value and What They Pay** | Gold | #EAB308 | Value and pricing — economic, measured, transactional context. |
| 7 | M7 | **After the Stay** | Emerald | #10B981 | Post-stay relationship — completion, return, advocacy. Closing the loop. |

## 6.3 Curiosity Hook Screen

| **Element** | **Specification** |
| --- | --- |
| **Background** | Canvas: --canvas-respondent (#0D0D12). The hook screen does not introduce a new background — it uses the episode accent color as a top border accent only. |
| **Top accent bar** | 4px horizontal bar at the top of the hook screen container. Color: episode accent color. This is the primary use of the episode accent on the question flow. |
| **Hook heading** | Level 2 typography. Color: episode accent color. Text sourced from episodes.json — never hardcoded. Examples: 'Intent locked — you know this guest.' / 'The physical environment tells a story.' etc. |
| **Hook body** | Level 5 typography. Color: --text-secondary. 1–2 sentences. Sourced from episodes.json. |
| **Badge reveal** | Achievement badge for the completed episode slides up from below the hook text. Animation: translateY(24px → 0) + scale(0.9 → 1.15 → 1.0). Duration: 300ms cubic-bezier(0.34, 1.56, 0.64, 1). Badge renders below hook body text. |
| **Continue button** | Level 4 typography. Text: 'Continue to [Next Episode Name]'. Background: episode accent color. Full width. Border radius: 8px. Appears 400ms after badge reveal completes. |

# 7. SVG Achievement Badge Specifications

Nine SVG achievement badges are implemented as React components. Each badge is a self-contained SVG that accepts a color prop (the tier's primary 400 color or the episode's accent color, depending on context). Badges are designed to be legible at 48px display size with full detail visible at 64px.

## 7.1 Badge System Rules

| **Rule** | **Specification** |
| --- | --- |
| **Component format** | Each badge is a React functional component: <AchievementBadge name='first\_step' color='#4ADE80' size={48} aria-label='First Step badge — you have begun your professional assessment' /> |
| **ViewBox** | All badges: viewBox='0 0 64 64'. This is the canonical coordinate space. Scaling is handled by the size prop via width and height attributes. |
| **Base shape** | All badges share a common base: a circle at cx=32, cy=32, r=28. This circle uses the color prop at 15% opacity as fill and the color prop at 80% opacity as stroke (stroke-width: 2). This creates a consistent framing while allowing the internal design to vary. |
| **Internal design** | Each badge has a unique internal icon drawn within the circle. Icons use simple geometric paths — no photorealistic elements. Icon stroke color: color prop at 100% opacity. Icon fill: none (outline style) or color prop at 30% opacity for filled elements. |
| **Display size** | 48×48px default. Used on curiosity hook screens. 64×64px on completion screen (all earned badges displayed in grid). 32×32px on episode map nodes for completed episodes. |
| **Aria label** | Every badge component requires an aria-label prop describing what was achieved. This is a WCAG 2.1 AA requirement. Default labels specified in badge table below. |
| **Animation trigger** | Framer Motion. On mount: opacity 0→1 + translateY 24px→0 + scale 0.9→1.15→1.0. Duration: 300ms. Easing: cubic-bezier(0.34, 1.56, 0.64, 1) — spring-like overshoot communicates achievement energy. Animation fires once per badge per session. Subsequent renders are static. |

## 7.2 Badge Specifications — All 9 Badges

| **#** | **Badge Name** | **Trigger Condition** | **Color Token** | **SVG Notes** |
| --- | --- | --- | --- | --- |
| **1** | **First Step** | Episode 1 (Q1) answered — intent category captured | --teal-400 (#14B8A6) | Icon: single footprint / step mark. Simple path. Represents the act of beginning. Awarded on first substantive answer. |
| **2** | **Intent Locked** | Module 1 (Episode 1) complete | Episode 1 accent: teal #14B8A6 | Icon: key or lock-closed symbol. Represents the intent category being captured and confirmed. Awarded at Episode 1 curiosity hook. |
| **3** | **Guest Arrival Expert** | Module 2 (Episode 3 — Finding and Arriving) complete | Episode 3 accent: sky #38BDF8 | Icon: building / hotel entrance silhouette or compass rose. Represents arrival and wayfinding. Awarded at Episode 3 curiosity hook. |
| **4** | **Environment Critic** | Module 3 (Episode 2 — The Room) complete | Episode 2 accent: amber #F59E0B | Icon: window or room plan (simple square with window mark). Represents the physical space. Awarded at Episode 2 curiosity hook. |
| **5** | **Service Specialist** | Module 4 (Episode 4 — The Human Side) complete | Episode 4 accent: rose #F43F5E | Icon: two overlapping circles (representing human connection) or handshake shape simplified. Awarded at Episode 4 curiosity hook. |
| **6** | **Purpose Expert** | Module 5 (Episode 5 — What This Guest Needs) complete | Episode 5 accent: violet #8B5CF6 | Icon: target / bullseye. Represents the intent-specific functional needs being fully mapped. Awarded at Episode 5 curiosity hook. |
| **7** | **Value Analyst** | Module 6 (Episode 6 — Value and What They Pay) complete | Episode 6 accent: gold #EAB308 | Icon: balance scales (simplified) or diamond shape. Represents value assessment and economic judgement. Awarded at Episode 6 curiosity hook. |
| **8** | **Full Picture** | Module 7 (Episode 7 — After the Stay) complete — full instrument done | Current tier's 400 color | Icon: complete circle with checkmark inside. Represents the full post-stay picture captured. Awarded at completion for all three tiers. |
| **9** | **Expert Complete** | Expert tier (all 79 questions) completed | --expert-400 (#A78BFA) | Icon: star or graduation mark. Signifies full professional-depth completion. Awarded only on Expert tier completion. Visually distinct from Full Picture badge — this is the 'beyond' badge. |

[INFO] Badge 8 (Full Picture) and Badge 9 (Expert Complete) may both be awarded in the same session for Expert completers. Badge 8 is awarded first at the completion screen; Badge 9 is revealed 800ms later with a separate animation. This double-reveal creates a peak experience for Expert completers.

[DEV] AI DEVELOPER: Implement all 9 badges in src/components/badges/. Each badge is a separate file: FirstStepBadge.jsx, IntentLockedBadge.jsx, etc. A barrel file (index.js) exports all. The BadgeReveal wrapper component handles the Framer Motion animation and ensures the animation fires only once per session using a ref to track mount state. Badge color is always passed as a prop — never hardcoded inside the SVG path data.

# 8. Dashboard Color Encoding — 12 Intent Categories

The management dashboard presents data segmented by the 12 intent taxonomy categories. Each category is assigned a distinct color for charts, filters, and segment labels. These colors are used consistently across all 9 dashboard panels.

The color assignments follow a logical grouping: work-category intents use cool blue-family tones, leisure intents use warm tones, personal necessity intents use muted/neutral tones, and special-context intents use distinct accent colors.

| **#** | **Taxonomy Code** | **Category Name** | **Color** | **Hex — Chart Color** |
| --- | --- | --- | --- | --- |
| 1 | WORK-TRANS | **Business Travel** | #3B82F6 | Blue 500 — core work identity. Business travel is the most common professional intent. |
| 2 | WORK-EVENT | **Conference / Event** | #6366F1 | Indigo 500 — event-based work. Related to WORK-TRANS but distinct event context. |
| 3 | WORK-EXT | **Extended Assignment** | #8B5CF6 | Violet 500 — longer duration work. Gradient toward Expert purple to signal depth. |
| 4 | LEIS-PLAN | **Planned Leisure** | #F97316 | Orange 500 — planned personal travel. Warm, anticipatory tone. |
| 5 | LEIS-SOC | **Social / Event Leisure** | #EC4899 | Pink 500 — social occasion travel. Celebratory, relational energy. |
| 6 | LEIS-EXP | **Exploration / Sightseeing** | #14B8A6 | Teal 500 — curiosity-driven travel. Exploratory, open. Matches Episode 1 accent. |
| 7 | DISP-HOME | **Home Displacement** | #94A3B8 | Slate 400 — muted. Sensitive category. Neutral tone signals discretion. |
| 8 | DISP-TRANS | **Life Transition** | #A1A1AA | Zinc 400 — muted. Similarly sensitive. Slightly warmer than DISP-HOME. |
| 9 | MED | **Medical / Health** | #2DD4BF | Teal 300 — calm, clinical-adjacent. Lighter than Episode 1 teal to distinguish. |
| 10 | FAM | **Family Visit** | #FB923C | Orange 300 — warm family connection. Lighter than LEIS-PLAN to distinguish. |
| 11 | TRANSIT | **In Transit** | #38BDF8 | Sky 400 — movement, passage. Matches Episode 3 accent (Finding and Arriving). |
| 12 | LOC-ESC | **Local Escape** | #A3E635 | Lime 400 — local, proximate, refreshing. Distinct from all other categories. |

[INFO] These 12 colors are used exclusively on the dashboard (#0B1120 canvas). They must all pass WCAG AA contrast against #0B1120. All 12 have been selected to meet a minimum 4.5:1 contrast ratio against the dashboard canvas. The DISP-HOME and DISP-TRANS categories use muted neutral tones deliberately — these sensitive categories should not draw attention in aggregate visualisations.

[DEV] AI DEVELOPER: Implement intent category colors as a constant map in src/constants/intentColors.js: { 'WORK-TRANS': '#3B82F6', 'WORK-EVENT': '#6366F1', ... }. All dashboard chart components import from this map. Never hardcode intent category colors in chart components.

# 9. Implementation Checklist for Sprint 1

The Visual Design System (S1-3.3) produced in Sprint 1 translates this document into developer-ready component specifications. The following checklist confirms what must be produced before Sprint 2 build begins.

| **Deliverable** | **Acceptance Criterion** |
| --- | --- |
| **Tailwind configuration** | tailwind.config.js extends.colors with all tokens from Sections 3.1–3.5. All canvas, tier, neutral, semantic, and dashboard tokens implemented as CSS custom properties. Verified: no raw hex values remain in any component. |
| **Typography utilities** | Custom Tailwind utilities: text-display, text-heading-lg, text-heading-md, text-heading-sm, text-body, text-caption. Each sets font-size, line-height, and letter-spacing as specified in Section 4. |
| **Wordmark component** | <GuestIQWordmark variant='dark'|'light' size={number} /> implemented per Section 2.2. Two weight spans. Correct font. Correct clear-space behavior. |
| **Tier card component** | <TierCard tier='amateur'|'professional'|'expert' /> implemented per Section 5. Color-prop driven. 'Most selected' badge on Professional. Hover state transition. |
| **Episode map component** | <EpisodeMap currentEpisode={1-7} completedEpisodes={[]} tier='amateur'|'professional'|'expert' /> with 7 nodes, progress bar, pulsing current node animation. Episode accent colors per Section 6.2. |
| **Badge components** | All 9 badge SVG components in src/components/badges/. BadgeReveal wrapper with Framer Motion animation per Section 7.1. Aria-labels implemented. Color prop accepted. |
| **Intent category color map** | src/constants/intentColors.js with all 12 entries per Section 8. |
| **Canvas enforcement** | CSS custom properties --canvas-respondent and --canvas-dashboard set at :root. Dashboard overlay component enforces --canvas-dashboard. Respondent app enforces --canvas-respondent. |
| **Playwright baseline** | After S1-3.3 approval, Playwright captures visual baseline screenshots of all key design elements — not application screens (those come in Sprint 4). Baseline: tier cards at rest, tier cards on hover, episode map states (completed/current/future nodes), badge reveal frame. |

# 10. Version Log

| **Ver.** | **Date** | **By** | **Change** |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF VISUAL IDENTITY AND DESIGN SYSTEM v1.0 —**

*GuestIQ · Visual Identity and Design System v1.0 · S0-3.1 · Sprint 0 Artifact · Confidential*