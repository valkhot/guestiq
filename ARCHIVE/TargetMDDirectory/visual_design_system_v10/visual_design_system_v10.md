# visual_design_system_v10

*Document Type: DOCX*

## Table of Contents

  - [**VISUAL DESIGN SYSTEM**](#visual-design-system)
  - [**GuestIQ — Developer-Ready Component Specifications**](#guestiq--developer-ready-component-specifications)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Source Document**](#source-document)
  - [**Purpose**](#purpose)
  - [**Review Checklist**](#review-checklist)
  - [**Document Location**](#document-location)
    - [**WARN:  All hex values, token names, badge names, and episode names in this document are LOCKED from Visual Identity Document v1.0 (S0-3.1). No value may be changed without a formal scope change request approved by the Lead Researcher. Changes here cascade into Sprint 2 build, Sprint 3 gamification, and Sprint 4 QA.**](#warn--all-hex-values-token-names-badge-names-and-episode-names-in-this-document-are-locked-from-visual-identity-document-v10-s0-31-no-value-may-be-changed-without-a-formal-scope-change-request-approved-by-the-lead-researcher-changes-here-cascade-into-sprint-2-build-sprint-3-gamification-and-sprint-4-qa)
- [1. Two-Canvas System — Enforcement Specification](#1-two-canvas-system--enforcement-specification)
  - [**Canvas**](#canvas)
  - [**Hex**](#hex)
  - [**Swatch**](#swatch)
  - [**Where Used — Enforcement Rule**](#where-used--enforcement-rule)
  - [**Respondent Canvas**](#respondent-canvas)
  - [**#0D0D12**](#0d0d12)
  - [**Dashboard Canvas**](#dashboard-canvas)
  - [**#0B1120**](#0b1120)
  - [**Canvas Surface**](#canvas-surface)
  - [**#161620**](#161620)
  - [**Canvas Overlay**](#canvas-overlay)
  - [**#1E1E2E**](#1e1e2e)
- [2. Complete Design Token System](#2-complete-design-token-system)
  - [2.1 Tier Primary Colors — The Locked Brand Colors](#21-tier-primary-colors--the-locked-brand-colors)
  - [**Tier**](#tier)
  - [**Token (400 stop)**](#token-400-stop)
  - [**Swatch**](#swatch)
  - [**Usage**](#usage)
  - [**Amateur**](#amateur)
  - [**#4ADE80 — --amateur-400**](#4ade80----amateur-400)
  - [**Professional**](#professional)
  - [**#60A5FA — --professional-400**](#60a5fa----professional-400)
  - [**Expert**](#expert)
  - [**#A78BFA — --expert-400**](#a78bfa----expert-400)
  - [2.2 Full Token System — tailwind.config.js Specification](#22-full-token-system--tailwindconfigjs-specification)
  - [**Token Group**](#token-group)
  - [**Class Prefix**](#class-prefix)
  - [**Tailwind extend.colors Entry**](#tailwind-extendcolors-entry)
  - [**Canvas tokens**](#canvas-tokens)
  - [**Amateur tier**](#amateur-tier)
  - [**Professional tier**](#professional-tier)
  - [**Expert tier**](#expert-tier)
  - [**Neutral text**](#neutral-text)
  - [**Semantic states**](#semantic-states)
  - [**Dashboard tokens**](#dashboard-tokens)
- [3. Typography Scale — Tailwind Custom Utilities](#3-typography-scale--tailwind-custom-utilities)
  - [**Level**](#level)
  - [**Tailwind Class**](#tailwind-class)
  - [**Size**](#size)
  - [**Weight**](#weight)
  - [**Line Height**](#line-height)
  - [**Usage**](#usage)
  - [**Display**](#display)
  - [**text-display**](#text-display)
  - [**Heading Large**](#heading-large)
  - [**text-heading-lg**](#text-heading-lg)
  - [**Heading Medium**](#heading-medium)
  - [**text-heading-md**](#text-heading-md)
  - [**Heading Small**](#heading-small)
  - [**text-heading-sm**](#text-heading-sm)
  - [**Body**](#body)
  - [**text-body**](#text-body)
  - [**Caption**](#caption)
  - [**text-caption**](#text-caption)
  - [3.1 Typography Tailwind Plugin Implementation](#31-typography-tailwind-plugin-implementation)
- [4. Tier Card Component Anatomy](#4-tier-card-component-anatomy)
- [5. Progress Bar and Episode Map](#5-progress-bar-and-episode-map)
  - [5.1 Progress Bar](#51-progress-bar)
  - [5.2 Episode Map Nodes](#52-episode-map-nodes)
- [6. Episode Visual Identity](#6-episode-visual-identity)
  - [**Ep.**](#ep)
  - [**Module**](#module)
  - [**Episode Name**](#episode-name)
  - [**Accent Color**](#accent-color)
  - [**Hex**](#hex)
  - [**Badge + Curiosity Hook Usage**](#badge--curiosity-hook-usage)
  - [**1**](#1)
  - [**M1**](#m1)
  - [**2**](#2)
  - [**M3**](#m3)
  - [**3**](#3)
  - [**M2**](#m2)
  - [**4**](#4)
  - [**M4**](#m4)
  - [**5**](#5)
  - [**M5**](#m5)
  - [**6**](#6)
  - [**M6**](#m6)
  - [**7**](#7)
  - [**M7**](#m7)
  - [6.1 Episode Accent Color Map — Constants File](#61-episode-accent-color-map--constants-file)
  - [6.2 Curiosity Hook Screen Anatomy](#62-curiosity-hook-screen-anatomy)
- [7. SVG Achievement Badge Specifications](#7-svg-achievement-badge-specifications)
  - [7.1 Badge Architecture — Common Rules](#71-badge-architecture--common-rules)
  - [7.2 Badge Animation — BadgeReveal Wrapper](#72-badge-animation--badgereveal-wrapper)
  - [7.3 All 9 Badge Specifications](#73-all-9-badge-specifications)
  - [**#**](#)
  - [**Badge Name**](#badge-name)
  - [**Trigger**](#trigger)
  - [**Color Token**](#color-token)
  - [**Hex**](#hex)
  - [**viewBox**](#viewbox)
  - [**SVG Implementation Notes**](#svg-implementation-notes)
  - [**1**](#1)
  - [**First Step**](#first-step)
  - [**2**](#2)
  - [**Intent Locked**](#intent-locked)
  - [**3**](#3)
  - [**Guest Arrival Expert**](#guest-arrival-expert)
  - [**4**](#4)
  - [**Environment Critic**](#environment-critic)
  - [**5**](#5)
  - [**Service Specialist**](#service-specialist)
  - [**6**](#6)
  - [**Purpose Expert**](#purpose-expert)
  - [**7**](#7)
  - [**Value Analyst**](#value-analyst)
  - [**8**](#8)
  - [**Full Picture**](#full-picture)
  - [**9**](#9)
  - [**Expert Complete**](#expert-complete)
- [8. Dashboard Intent Category Colour Map](#8-dashboard-intent-category-colour-map)
- [9. S1-3.4 Review Checklist](#9-s1-34-review-checklist)
  - [**Check**](#check)
  - [**Verification**](#verification)
  - [**Check 1 — SVG badge specs complete**](#check-1--svg-badge-specs-complete)
  - [**Check 2 — Three tier colours correct**](#check-2--three-tier-colours-correct)
  - [**Check 3 — Two-canvas distinction explicit**](#check-3--two-canvas-distinction-explicit)
- [10. Version Log](#10-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF VISUAL DESIGN SYSTEM v1.0 —**](#-end-of-visual-design-system-v10-)

## **VISUAL DESIGN SYSTEM**

## **GuestIQ — Developer-Ready Component Specifications**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Lead Researcher review (30 min)


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Source Document****

Visual Identity and Design System v1.0 (S0-3.1) — all values locked there


**## **Purpose****

Translates the Sprint 0 visual identity decisions into developer-ready specifications: Tailwind config, typography utilities, component anatomy, SVG badge specs, animation specs.


**## **Review Checklist****

(1) SVG badge specs complete enough for developer to implement without further design input. (2) Tier colours Amateur #4ADE80 / Pro #60A5FA / Expert #A78BFA correctly specified. (3) Two-canvas distinction explicit.


**## **Document Location****

01-Sprint-1 / AI-Outputs / Visual-Design-System-v1.0.docx




### **WARN:  All hex values, token names, badge names, and episode names in this document are LOCKED from Visual Identity Document v1.0 (S0-3.1). No value may be changed without a formal scope change request approved by the Lead Researcher. Changes here cascade into Sprint 2 build, Sprint 3 gamification, and Sprint 4 QA.**

INFO:  This document is the developer contract for Sprint 2 step S2-2.2 (Tailwind configuration and project structure) and Sprint 3 step S3-2.2 (SVG badge implementation). It covers everything in the Visual Identity Document that requires developer-ready translation.


# 1. Two-Canvas System — Enforcement Specification

GuestIQ operates on two visually distinct canvases. This distinction must be enforced in code — the dashboard overlay must never inherit from or blend with the respondent canvas.


| ## **Canvas** | ## **Hex** | ## **Swatch** | ## **Where Used — Enforcement Rule** |
| --- | --- | --- | --- |
| ## **Respondent Canvas** | ## **#0D0D12** |  | ALL respondent screens: welcome, tier selection, Q0, all question screens, curiosity hook, tier upgrade, completion, results, enrichment, downtime, config error, ErrorBoundary. Tailwind: bg-canvas-respondent. Set as default on <body>. Never override with --canvas-dashboard on any respondent route. |
| ## **Dashboard Canvas** | ## **#0B1120** |  | ONLY the SHIFT+CTRL+A management overlay. The <DashboardOverlay> component root applies bg-canvas-dashboard explicitly. Never inherit from parent. When overlay is dismissed, respondent canvas is immediately visible beneath — no transition animation between canvases. |
| ## **Canvas Surface** | ## **#161620** |  | Elevated surface on respondent canvas. Question cards, tier cards, curiosity hook containers. bg-canvas-surface. 6 stops above base canvas — visible elevation on dark background. |
| ## **Canvas Overlay** | ## **#1E1E2E** |  | Highest elevation on respondent canvas. Disambiguation modal, downtime screen modal. bg-canvas-overlay. |




DEV:  CSS custom property implementation in global stylesheet: :root { --canvas-respondent: #0D0D12; --canvas-dashboard: #0B1120; --canvas-surface: #161620; --canvas-overlay: #1E1E2E; }. Tailwind config: extend.colors.canvas = { respondent: 'var(--canvas-respondent)', dashboard: 'var(--canvas-dashboard)', ... }


# 2. Complete Design Token System

## 2.1 Tier Primary Colors — The Locked Brand Colors

These three values are the visual identity of the three tiers. They appear on tier cards, progress bars, answer option selected states, episode nodes (for their associated tier), and badge color-props. They must be specified exactly as locked.


| ## **Tier** | ## **Token (400 stop)** | ## **Swatch** | ## **Usage** |
| --- | --- | --- | --- |
| ## **Amateur** | ## **#4ADE80 — --amateur-400** |  | Tier card CTA background, progress bar fill (Amateur sessions), episode node fill (Amateur tier), badge color-prop when tier=amateur. Never used on the dashboard. |
| ## **Professional** | ## **#60A5FA — --professional-400** |  | Tier card CTA background, progress bar fill (Professional sessions), episode node fill (Professional tier), badge color-prop when tier=professional. Dashboard accent color (--dash-accent uses this value). |
| ## **Expert** | ## **#A78BFA — --expert-400** |  | Tier card CTA background, progress bar fill (Expert sessions), episode node fill (Expert tier), badge color-prop when tier=expert. Expert Complete badge uses this color exclusively. |




## 2.2 Full Token System — tailwind.config.js Specification


### ## **Token Group**

**## **Class Prefix****: ## **Tailwind extend.colors Entry**


### ## **Canvas tokens**

**bg-canvas-***: canvas: { respondent: '#0D0D12', dashboard: '#0B1120', surface: '#161620', overlay: '#1E1E2E' }


### ## **Amateur tier**

**bg-amateur-50/100/200/400/600/800**: amateur: { '50':'#F0FDF4','100':'#DCFCE7','200':'#BBF7D0','400':'#4ADE80','600':'#16A34A','800':'#166534' }


### ## **Professional tier**

**bg-professional-50/100/200/400/600/800**: professional: { '50':'#EFF6FF','100':'#DBEAFE','200':'#BFDBFE','400':'#60A5FA','600':'#2563EB','800':'#1E3A8A' }


### ## **Expert tier**

**bg-expert-50/100/200/400/600/800**: expert: { '50':'#F5F3FF','100':'#EDE9FE','200':'#DDD6FE','400':'#A78BFA','600':'#7C3AED','800':'#4C1D95' }


### ## **Neutral text**

**text-primary / text-secondary / text-muted**: text: { primary: '#F8FAFC', secondary: '#94A3B8', muted: '#64748B' }


### ## **Semantic states**

**bg-semantic-success/warning/error/noneFlag**: semantic: { success:'#22C55E', warning:'#F59E0B', error:'#EF4444', info:'#38BDF8', noneFlag:'#F97316' }


### ## **Dashboard tokens**

**bg-dash-panelBg/panelBorder**: dash: { panelBg:'#131829', panelBorder:'#1F2B4A', textPrimary:'#E2E8F0', textSecondary:'#94A3B8', accent:'#60A5FA', grid:'#1A2540' }





Token stop reference — Tailwind class suffixes implemented: amateur-50, amateur-100, amateur-200, amateur-400, amateur-600, amateur-800. professional-50, professional-100, professional-200, professional-400, professional-600, professional-800. expert-50, expert-100, expert-200, expert-400, expert-600, expert-800. Semantic tokens: semantic-success (#22C55E), semantic-warning (#F59E0B), semantic-error (#EF4444), semantic-info (#38BDF8), semantic-noneFlag (#F97316). Dashboard tokens: dash-panel-bg (#131829), dash-panel-border (#1F2B4A), dash-text-primary (#E2E8F0), dash-text-secondary (#94A3B8), dash-accent (#60A5FA), dash-grid (#1A2540).

DEV:  Implement in tailwind.config.js: module.exports = { theme: { extend: { colors: { canvas: {...}, amateur: {...}, professional: {...}, expert: {...}, neutral: {...}, text: {...}, semantic: {...}, dash: {...} } } } }. Every color value is a hex string. Generate CSS custom properties in addition: postprocess with a plugin or manually add to globals.css.


# 3. Typography Scale — Tailwind Custom Utilities

Six typography levels translated into Tailwind compound utilities. Each class sets font-size, line-height, and letter-spacing together. Font-weight is set separately using standard Tailwind weight utilities.


| ## **Level** | ## **Tailwind Class** | ## **Size** | ## **Weight** | ## **Line Height** | ## **Usage** |
| --- | --- | --- | --- | --- | --- |
| ## **Display** | ## **text-display** | 32px / 2rem | 700 (bold) | 1.2 | Completion screen congratulatory heading, welcome screen hook headline. Dark canvas only. |
| ## **Heading Large** | ## **text-heading-lg** | 24px / 1.5rem | 600 (semibold) | 1.3 | Episode transition headings, tier card tier names, curiosity hook titles. |
| ## **Heading Medium** | ## **text-heading-md** | 20px / 1.25rem | 600 (semibold) | 1.4 | Question text. Module section headings in dashboard. |
| ## **Heading Small** | ## **text-heading-sm** | 16px / 1rem | 500 (medium) | 1.4 | Answer option labels. Panel headings in dashboard. Tier descriptor text. |
| ## **Body** | ## **text-body** | 15px / 0.9375rem | 400 (regular) | 1.6 | Instruction lines below questions. Supporting copy. Privacy notice. Time estimates. |
| ## **Caption** | ## **text-caption** | 13px / 0.8125rem | 400 (regular) | 1.5 | Dashboard axis labels. Timestamp displays. Secondary metadata. Badge trigger labels. |




## 3.1 Typography Tailwind Plugin Implementation

// In tailwind.config.js — addUtilities plugin section:

plugin(function({ addUtilities }) {

addUtilities({

'.text-display':    { fontSize: '32px', lineHeight: '1.2', letterSpacing: '0em' },

'.text-heading-lg': { fontSize: '24px', lineHeight: '1.3', letterSpacing: '0.02em' },

'.text-heading-md': { fontSize: '20px', lineHeight: '1.4', letterSpacing: '-0.01em' },

'.text-heading-sm': { fontSize: '16px', lineHeight: '1.4', letterSpacing: '0em' },

'.text-body':       { fontSize: '15px', lineHeight: '1.6', letterSpacing: '0em' },

'.text-caption':    { fontSize: '13px', lineHeight: '1.5', letterSpacing: '0em' },

})

}),


// Usage in components:

// <h1 className='text-display font-bold text-primary'>You did it!</h1>

// <p className='text-body text-secondary'>Instruction line</p>

// <span className='text-caption text-muted'>13px supporting copy</span>


# 4. Tier Card Component Anatomy

The TierCard component receives a single tier prop ('amateur'|'professional'|'expert'). All color decisions derive from this prop via the token system — no hardcoded colors inside the component.


// Component signature:

<TierCard tier='amateur'|'professional'|'expert' onSelect={fn} />


// Layout anatomy (from top to bottom within card):

// 1. [Most Selected badge]  — Professional only. Pill above tier name.

//    bg-professional-100 text-professional-800 text-caption rounded-full px-3 py-1


// 2. Tier name

//    text-heading-lg font-semibold text-[tier]-400

//    Example: 'Amateur' in #4ADE80


// 3. Descriptor

//    text-body text-secondary (one sentence max, from tiers[tier].descriptor)


// 4. Time + question count

//    text-caption text-muted  (from tiers[tier].timeEstimate + tiers[tier].questionCount)


// 5. CTA button  (full width within card)

//    bg-[tier]-400 text-canvas-respondent (dark text on light button)

//    text-heading-sm font-medium rounded-lg py-3 w-full

//    text from tiers[tier].ctaLabel  e.g. 'Start as Amateur'


// Card container:

//    bg-canvas-surface rounded-xl p-6

//    border border-neutral-200/20 (default)

//    hover:border-[tier]-400 transition-colors duration-150  (hover state)


# 5. Progress Bar and Episode Map

## 5.1 Progress Bar

// Positioned above episode map, at top of every question screen

// Height: 4px (h-1 in Tailwind)

// Background track: bg-neutral-200/20 (subtle dark track)

// Fill: bg-[tier]-400  (tier primary color, animates with Framer Motion)

// Fill width: (questions_answered_in_episode / total_questions_in_episode) × 100%

// Resets and refills with each new episode

// Animation: Framer Motion layoutId='progress-fill'

//   initial: { width: 0 }  animate: { width: fillPercent+'%' }

//   transition: { type: 'spring', stiffness: 300, damping: 30 }

// No border-radius on the fill (full rectangle — flat bar)

// Border-radius on container: rounded-full (full pill shape on track)


## 5.2 Episode Map Nodes

// 7 nodes in a horizontal row, equal spacing, full screen width


// COMPLETED node (episodes in completedEpisodes array):

//   Circle 24px diameter, filled with episode accent color

//   Checkmark icon in white (svg or heroicon)

//   className='w-6 h-6 rounded-full flex items-center justify-center'

//   style={{ background: episodeAccentColor }}


// CURRENT node (currentEpisode === episode.number):

//   Circle 24px diameter, filled with episode accent color

//   Pulsing ring: Framer Motion animate={{ opacity: [0.4, 0, 0.4] }}

//     transition={{ duration: 1.5, repeat: Infinity }}

//     Ring: absolute, rounded-full, border-2 border-[accent-color], w-8 h-8


// FUTURE node (not yet reached):

//   Circle 8px diameter (w-2 h-2)

//   bg-neutral-200/40 (very subtle)

//   No label shown below future nodes


// Episode label (current node only):

//   text-caption text-secondary below current node

//   Truncate to 20 chars with ellipsis

//   From episodes[currentEpisode-1].name


# 6. Episode Visual Identity

Each episode has a distinct accent colour used for its curiosity hook screen and its associated badge. These colours are referenced by episode number — not by name — in component props.


| ## **Ep.** | ## **Module** | ## **Episode Name** | ## **Accent Color** | ## **Hex** | ## **Badge + Curiosity Hook Usage** |
| --- | --- | --- | --- | --- | --- |
| ## **1** | ## **M1** | Why Do Guests Actually Come Here? | Teal |  | First Step + Intent Locked badges. Curiosity hook top accent bar, heading, Continue button. |
| ## **2** | ## **M3** | The Room They Are Imagining | Amber |  | Environment Critic badge. Curiosity hook accent. |
| ## **3** | ## **M2** | Finding and Arriving | Sky |  | Guest Arrival Expert badge. Curiosity hook accent. |
| ## **4** | ## **M4** | The Human Side | Rose |  | Service Specialist badge. Curiosity hook accent. |
| ## **5** | ## **M5** | What This Guest Actually Needs | Violet |  | Purpose Expert badge. Curiosity hook accent. |
| ## **6** | ## **M6** | Value and What They Pay | Gold |  | Value Analyst badge. Curiosity hook accent. |
| ## **7** | ## **M7** | After the Stay | Emerald |  | Full Picture badge + Expert Complete badge (Expert tier only). Episode 7 has NO curiosity hook. |




## 6.1 Episode Accent Color Map — Constants File

// src/constants/episodeColors.js

export const EPISODE_ACCENT_COLORS = {

1: '#14B8A6',  // Teal  — Why Do Guests Actually Come Here?

2: '#F59E0B',  // Amber — The Room They Are Imagining

3: '#38BDF8',  // Sky   — Finding and Arriving

4: '#F43F5E',  // Rose  — The Human Side

5: '#8B5CF6',  // Violet — What This Guest Actually Needs

6: '#EAB308',  // Gold  — Value and What They Pay

7: '#10B981',  // Emerald — After the Stay

};


// Usage in CuriosityHook component:

// import { EPISODE_ACCENT_COLORS } from '../constants/episodeColors';

// const accentColor = EPISODE_ACCENT_COLORS[currentEpisode];

// style={{ borderTopColor: accentColor }}  (4px top accent bar)

// style={{ color: accentColor }}  (hook heading text)


## 6.2 Curiosity Hook Screen Anatomy

// Container: bg-canvas-respondent, with 4px top border in episode accent color

//   borderTop: `4px solid ${accentColor}`


// Hook heading: text-heading-lg font-semibold

//   color: accentColor (episode accent)

//   text from episodes[N].curiosityHookText


// Hook body: text-body text-secondary

//   text from episodes[N].curiosityHookSubtext (may be null)


// Badge reveal: immediately below hook body

//   BadgeReveal component handles Framer Motion animation (see Section 7)


// Continue button: appears 400ms after badge reveal animation completes

//   Full width, background: accentColor, text: dark (#0D0D12)

//   text-heading-sm font-medium, rounded-lg, py-3

//   text: 'Continue to [next episode name]'

//   Or 'See your results →' if this is Episode 6 (last hook before completion)


# 7. SVG Achievement Badge Specifications

All 9 badges are implemented as React functional components accepting a color prop. The badge architecture is consistent: a common base circle + unique internal icon. All badges share the same viewBox and animation wrapper.


## 7.1 Badge Architecture — Common Rules

// Episode map component signature:

<EpisodeMap

currentEpisode={1-7}

completedEpisodes={[1, 2]}

tier='amateur'|'professional'|'expert'

/>


// Node states — pulsing ring on current node:

// CURRENT: animate={{ opacity: [0.4, 0, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }}

// COMPLETED: filled circle + white checkmark icon

// FUTURE: 8px diameter, very subtle neutral fill


// Component signature (all 9 badges):

<AchievementBadge

name='first_step'  // snake_case badge identifier

color='#4ADE80'    // tier primary or episode accent — passed as prop

size={48}          // px — default display size

aria-label='First Step badge — your professional assessment has begun'

/>


// Base SVG structure (identical for all 9 badges):

<svg viewBox='0 0 64 64' width={size} height={size} role='img'

aria-label={ariaLabel}>

{/* Outer circle — same for all badges */}

<circle cx='32' cy='32' r='28'

fill={`${color}26`}    /* color at ~15% opacity — hex alpha: 26 = 15% */

stroke={`${color}CC`}  /* color at ~80% opacity — hex alpha: CC = 80% */

strokeWidth='2'

/>

{/* Inner icon — unique per badge — see table below */}

{/* Icon uses color at 100% for stroke, color@4D for fill (30%) */}

</svg>


// File location: src/components/badges/[BadgeName]Badge.jsx

// Barrel file:   src/components/badges/index.js  (exports all 9)

// Display sizes: 32px (episode map), 48px (curiosity hook), 64px (completion grid)


## 7.2 Badge Animation — BadgeReveal Wrapper

// src/components/badges/BadgeReveal.jsx

// Framer Motion animation wrapper — fires once per badge per session


import { motion } from 'framer-motion';

import { useRef } from 'react';


const BadgeReveal = ({ children, delay = 0 }) => {

const hasAnimated = useRef(false);

// useRef tracks mount state — animation fires only once per session

// On re-render (e.g. screen resize) animation does NOT replay


return (

<motion.div

initial={{ opacity: 0, y: 24, scale: 0.9 }}

animate={{ opacity: 1, y: 0, scale: [0.9, 1.15, 1.0] }}

transition={{

duration: 0.3,

delay: delay,

ease: [0.34, 1.56, 0.64, 1],  /* cubic-bezier(0.34, 1.56, 0.64, 1) spring overshoot */

}}

>

{children}

</motion.div>

);

};


// Expert Complete badge (Badge 9) has delay=0.8 (800ms after Badge 8)

// This creates the double-reveal peak experience for Expert completers


## 7.3 All 9 Badge Specifications

| ## **#** | ## **Badge Name** | ## **Trigger** | ## **Color Token** | ## **Hex** | ## **viewBox** | ## **SVG Implementation Notes** |
| --- | --- | --- | --- | --- | --- | --- |
| ## **1** | ## **First Step** | Q1 (Episode 1, first answer) | --teal-400 (Ep.1 accent) |  | 0 0 64 64 | Base circle cx=32 cy=32 r=28 (color@15%fill, color@80%stroke). Icon: single footprint — simplified teardrop shape (front pad) + 4 small circles (toes). All in stroke-only at color@100%. Positioned at cx=32 cy=36 for visual centering. ARIA: 'First Step badge — your professional assessment has begun' |
| ## **2** | ## **Intent Locked** | Episode 1 complete (at curiosity hook) | --teal-400 (Ep.1 accent) |  | 0 0 64 64 | Base circle. Icon: closed padlock — rect body (rx=3) + U-shaped shackle (path). Body: M22,30 h20 a3,3 0 0 1 3,3 v12 a3,3 0 0 1 -3,3 h-20 a3,3 0 0 1 -3,-3 v-12 a3,3 0 0 1 3,-3 z. Shackle: M26,30 v-6 a6,6 0 0 1 12,0 v6. Keyhole: circle r=3 + rect below. ARIA: 'Intent Locked badge — your stay purpose has been captured' |
| ## **3** | ## **Guest Arrival Expert** | Episode 3 complete (Module 2) | --sky-400 (Ep.3 accent) |  | 0 0 64 64 | Base circle. Icon: simplified hotel/building silhouette — rect body + doorway arch + 4 windows (2×2 grid). M24,48 v-18 h16 v18. Door: M28,48 v-8 a4,4 0 0 1 8,0 v8. Windows: 4× rect 6×6. ARIA: 'Guest Arrival Expert badge — pre-arrival and discovery questions complete' |
| ## **4** | ## **Environment Critic** | Episode 2 complete (Module 3) | --amber-400 (Ep.2 accent) |  | 0 0 64 64 | Base circle. Icon: room plan view — outer square + inner window mark. Square: M18,22 h28 v24 h-28 z. Window: M24,22 v-6 (vertical line up to represent window). Interior detail: simple cross-hatch or bed shape (rect M22,34 h20 v10 h-20 z). ARIA: 'Environment Critic badge — physical environment and space questions complete' |
| ## **5** | ## **Service Specialist** | Episode 4 complete (Module 4) | --rose-400 (Ep.4 accent) |  | 0 0 64 64 | Base circle. Icon: two overlapping circles representing human connection. Circle 1: cx=26 cy=32 r=10 fill=color@20% stroke=color. Circle 2: cx=38 cy=32 r=10 fill=color@20% stroke=color. Overlap area: slightly brighter. ARIA: 'Service Specialist badge — human interaction and service questions complete' |
| ## **6** | ## **Purpose Expert** | Episode 5 complete (Module 5) | --violet-400 (Ep.5 accent) |  | 0 0 64 64 | Base circle. Icon: target/bullseye — 3 concentric circles. Outer: r=20, Mid: r=13, Inner: r=6. All stroke-only at decreasing opacity: outer@40%, mid@70%, inner@100%. Plus cross-hairs: M32,12 v8 M32,44 v8 M12,32 h8 M44,32 h8. ARIA: 'Purpose Expert badge — intent-specific functional needs questions complete' |
| ## **7** | ## **Value Analyst** | Episode 6 complete (Module 6) | --gold-400 (Ep.6 accent) |  | 0 0 64 64 | Base circle. Icon: simplified balance scales. Fulcrum: M32,44 L26,52 h12 z (triangle base). Beam: M16,32 h32 at slight tilt (±2° rotation). Two scale pans: circles at each end of beam, r=7. Chain lines from beam ends to pans. ARIA: 'Value Analyst badge — value, pricing, and loyalty questions complete' |
| ## **8** | ## **Full Picture** | All 7 episodes complete (all tiers) | Current tier 400 color |  | 0 0 64 64 | Base circle. Icon: complete circle (r=18, stroke-only) + checkmark inside. Checkmark: M22,32 l8,8 l14,-14. The outer circle of the icon echoes the base circle shape — 'completion within completion'. Tier color applied throughout. ARIA: 'Full Picture badge — complete guest expectations profile recorded' |
| ## **9** | ## **Expert Complete** | Expert tier (79Q) complete ONLY | --expert-400 |  | 0 0 64 64 | Base circle in expert purple. Icon: 5-pointed star — centered at cx=32 cy=30. Star path: M32,14 l4.5,13.8 h14.5 l-11.7,8.5 4.5,13.8 -11.8,-8.6 -11.8,8.6 4.5,-13.8 -11.7,-8.5 h14.5 z. Fill: color@30%. Stroke: color@100%. ARIA: 'Expert Complete badge — full 79-question professional depth assessment complete' |




DEV:  SVG path data for complex icons (padlock, footprint, balance scales) may use simplified geometric approximations — the goal is legibility at 48px, not photorealism. Each path should use vector drawing tools (Figma, Inkscape) to produce the exact path data. The table above specifies the shape language and key path commands — the developer produces the final clean SVG paths that match the described shapes.


# 8. Dashboard Intent Category Colour Map

All 12 taxonomy categories are assigned a distinct colour for use exclusively in dashboard charts and filters (#0B1120 canvas). These colours are imported from a constants file — never hardcoded in chart components.


// src/constants/intentColors.js

export const INTENT_COLORS = {

'WORK-TRANS':  '#3B82F6',  // Blue 500    — Business Travel

'WORK-EVENT':  '#6366F1',  // Indigo 500  — Conference / Event

'WORK-EXT':    '#8B5CF6',  // Violet 500  — Extended Assignment

'LEIS-PLAN':   '#F97316',  // Orange 500  — Planned Leisure

'LEIS-SOC':    '#EC4899',  // Pink 500    — Social / Event Leisure

'LEIS-EXP':    '#14B8A6',  // Teal 500    — Exploration

'DISP-HOME':   '#94A3B8',  // Slate 400   — Home Displacement (muted)

'DISP-TRANS':  '#A1A1AA',  // Zinc 400    — Life Transition (muted)

'MED':         '#2DD4BF',  // Teal 300    — Medical / Health

'FAM':         '#FB923C',  // Orange 300  — Family Visit

'TRANSIT':     '#38BDF8',  // Sky 400     — In Transit

'LOC-ESC':     '#A3E635',  // Lime 400    — Local Escape

};


// Usage in dashboard chart components:

// import { INTENT_COLORS } from '../../constants/intentColors';

// const color = INTENT_COLORS[session.intent_category] || '#94A3B8';

// The fallback (#94A3B8) handles any session where intent_category is null


# 9. S1-3.4 Review Checklist

From MDT v5.0 step S1-3.4 — Lead Researcher review (30 minutes). All three items must be confirmed.


**## **Check 1 — SVG badge specs complete****

Section 7.3: verify all 9 badges have trigger condition, color token, hex value, viewBox, base circle description, icon description, and aria-label. A developer should be able to implement all 9 badges from Section 7 alone without further design decisions. Verify Badge 8 (Full Picture) uses tier primary color (varies by tier). Verify Badge 9 (Expert Complete) uses #A78BFA exclusively.


**## **Check 2 — Three tier colours correct****

Section 2.1: Amateur #4ADE80, Professional #60A5FA, Expert #A78BFA. These three hex values must match the Visual Identity Document exactly. Verify all three appear in Section 2.1 swatch table with correct hex codes.


**## **Check 3 — Two-canvas distinction explicit****

Section 1: Respondent canvas #0D0D12 and dashboard canvas #0B1120 documented with enforcement rules. The DashboardOverlay component must explicitly apply bg-canvas-dashboard — never inherit. Verify the CSS custom property implementation is specified in Section 1 devBox.




# 10. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF VISUAL DESIGN SYSTEM v1.0 —**

*GuestIQ  ·  Visual Design System v1.0  ·  S1-3.3  ·  S1-10  ·  Sprint 1 Artifact  ·  Confidential*

