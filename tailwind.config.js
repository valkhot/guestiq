import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // ── Canvas system ─────────────────────────────────────────────────
        canvas: {
          respondent: '#0D0D12', // ALL respondent screens
          dashboard: '#0B1120', // ONLY the management dashboard overlay
          surface: '#161620',   // Elevated cards on respondent canvas
          overlay: '#1E1E2E',   // Modals: disambiguation, downtime
        },

        // ── Tier primary colours (LOCKED from Visual Identity Doc) ────────
        amateur: {
          50: '#F0FDF4',
          100: '#DCFCE7',
          200: '#BBF7D0',
          400: '#4ADE80', // Primary — tier card CTA, progress bar
          600: '#16A34A',
          800: '#166534',
        },
        professional: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA', // Primary — tier card CTA, progress bar
          600: '#2563EB',
          800: '#1E3A8A',
        },
        expert: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          400: '#A78BFA', // Primary — tier card CTA, progress bar
          600: '#7C3AED',
          800: '#4C1D95',
        },

        // ── Neutral text ──────────────────────────────────────────────────
        neutral: {
          0: '#FFFFFF',
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          400: '#94A3B8',
          600: '#475569',
          800: '#1E293B',
        },

        // ── Semantic states ───────────────────────────────────────────────
        semantic: {
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#38BDF8',
          noneFlag: '#F97316', // none-option selection indicator
        },

        // ── Dashboard tokens ──────────────────────────────────────────────
        dash: {
          panelBg: '#131829',
          panelBorder: '#1F2B4A',
          textPrimary: '#E2E8F0',
          textSecondary: '#94A3B8',
          accent: '#60A5FA',
          grid: '#1A2540',
        },
      },

      // ── Typography scale ───────────────────────────────────────────────
      fontSize: {
        display: ['2rem', { lineHeight: '1.2', letterSpacing: '0em' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4', letterSpacing: '-0.01em' }],
        'heading-sm': ['1rem', { lineHeight: '1.4', letterSpacing: '0em' }],
        body: ['0.9375rem', { lineHeight: '1.6', letterSpacing: '0em' }],
        caption: ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0em' }],
      },

      // ── Border radius ──────────────────────────────────────────────────
      borderRadius: {
        card: '12px',
        pill: '999px',
      },
    },
  },
  plugins: [
    // Custom typography utilities
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.text-primary': { color: '#F8FAFC' },
        '.text-secondary': { color: '#94A3B8' },
        '.text-muted': { color: '#64748B' },
      });
    }),
  ],
};
