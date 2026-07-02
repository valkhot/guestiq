/**
 * GuestIQ — Design Tokens (Tailwind config)
 * v0.1 · warm-midnight-lobby · ratified Alternative 2
 *
 * Source of truth for the visual system. Consolidated from the approved
 * mockups (Welcome, End-of-Read, Coverage, Depth-Invitation, Console) —
 * not invented fresh. Components read these tokens; they never hardcode hex.
 *
 * Status: NOT developer-final — review/lock at the end of the design session,
 * once all surfaces are specced. The GM-report/Console canvas values are
 * provisional (finalized when the report surface is designed).
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // ---- Colour (full palette; replaces Tailwind defaults intentionally) ----
    colors: {
      transparent: 'transparent',
      current: 'currentColor',

      // Ink — the canvas
      ink:    { DEFAULT: '#16141D', 2: '#1E1A27', 3: '#262031', 4: '#2D2638' },

      // Parchment — the light / paper
      parchment: { DEFAULT: '#EFE7D6', 2: '#E4D9C2', ink: '#2C271F' },

      // Brass — the single accent (spend boldness here)
      brass:  { DEFAULT: '#C8A24E', bright: '#E7C879', glow: '#F4DC97' },

      // Text on ink
      text:    '#EDE9F2',
      heading: '#F1ECDF',
      mute:    { DEFAULT: '#8E8699', 2: '#615A70', parchment: '#7A6F58' },

      // Status — used sparingly, never alarming
      ok:   '#7FB389',
      warn: '#D9A441',
      bad:  '#C77B6B',
      cool: '#6E84B0',
    },

    // ---- Typography ----
    fontFamily: {
      display: ['Fraunces', 'serif'],     // restrained display
      story:   ['Spectral', 'serif'],     // warm body
      mono:    ['"Space Mono"', 'monospace'], // utility / data / labels
    },
    fontSize: {
      // [size, { lineHeight, letterSpacing }]
      hero:    ['clamp(28px,5vw,46px)', { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
      h2:      ['clamp(24px,4vw,34px)', { lineHeight: '1.1',  letterSpacing: '-0.01em'  }],
      lead:    ['clamp(16px,2.6vw,20px)', { lineHeight: '1.55' }],
      body:    ['16px', { lineHeight: '1.5' }],
      'body-sm': ['15px', { lineHeight: '1.5' }],
      data:    ['13px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      label:   ['11px', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      eyebrow: ['11px', { lineHeight: '1.4', letterSpacing: '0.4em'  }],
      micro:   ['10px', { lineHeight: '1.5', letterSpacing: '0.22em' }],
    },

    extend: {
      // ---- Spacing (4px base; Tailwind's scale already matches: 1=4 … 16=64) ----
      // Kept explicit for the design-system reference:
      // 1:4  2:8  3:12  4:16  5:20  6:24  7:28  8:32  10:40  12:48  16:64

      // ---- Radius (sharp buttons, soft frames — the dossier edge) ----
      borderRadius: {
        sharp: '2px',   // buttons, the dossier edge
        sm:    '4px',   // inputs, small chips
        md:    '8px',   // cards, tiles, guests
        lg:    '14px',  // screen frames, panels
        pill:  '999px', // badge, dots
      },

      // ---- Elevation (depth by shadow, never by brightness) ----
      boxShadow: {
        e1:   '0 1px 3px rgba(0,0,0,0.25)',
        e2:   '0 8px 24px -10px rgba(0,0,0,0.45)',
        e3:   '0 18px 40px -16px rgba(20,16,28,0.55)',
        glow: '0 0 18px rgba(231,200,121,0.35)', // brass selected state
      },

      // ---- Hairlines ----
      borderColor: {
        line:   'rgba(255,255,255,0.08)',
        'line-2': 'rgba(255,255,255,0.12)',
      },

      // ---- Motion ----
      transitionTimingFunction: {
        entrance: 'cubic-bezier(0.2,0.7,0.2,1)',
      },
      transitionDuration: {
        fast: '200ms',
        base: '250ms',
        slow: '700ms',
        entrance: '1000ms',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to:   { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        // honour prefers-reduced-motion at the component/global CSS level
        rise: 'rise 1s cubic-bezier(0.2,0.7,0.2,1) both',
      },

      // ---- Two canvases (agent ≠ GM/Console; never blend) ----
      backgroundImage: {
        // Agent canvas — cinematic radial ink
        'canvas-agent':
          'radial-gradient(120% 90% at 50% -8%, #221C2E 0%, #16141D 55%, #100E16 100%)',
        // GM-report / Console canvas — calmer, flatter, ruled (PROVISIONAL)
        'canvas-report':
          'repeating-linear-gradient(rgba(255,255,255,0.08) 0 1px, transparent 1px 30px)',
        'thread': 'linear-gradient(90deg, transparent, rgba(200,162,78,0.55), transparent)',
      },
    },
  },
  plugins: [],
};
