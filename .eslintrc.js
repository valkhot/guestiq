// .eslintrc.js
// GuestIQ — ESLint Configuration
// Sprint 1 artifact S1-1.11 | NFR-035
// Zero errors required on every commit — enforced in GitHub Actions CI/CD

module.exports = {
  root: true,

  env: {
    browser: true,
    es2022: true,
    node: true,
  },

  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: [
    'react',
    'react-hooks',
    'jsx-a11y',
    'import',
  ],

  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',       // React 17+ — no need to import React
    'plugin:react-hooks/recommended', // hooks rules
    'plugin:jsx-a11y/recommended',    // accessibility rules
    'plugin:import/recommended',      // import ordering and resolution
    'prettier',                       // disables rules that conflict with Prettier
  ],

  settings: {
    react: {
      version: 'detect', // auto-detect React version from package.json
    },
  },

  rules: {
    // ── React ────────────────────────────────────────────────────────────
    'react/prop-types': 'off',           // TypeScript or JSDoc handles this
    'react/display-name': 'warn',
    'react/self-closing-comp': 'warn',   // <Component /> not <Component></Component>
    'react/jsx-no-duplicate-props': 'error',
    'react/jsx-no-undef': 'error',
    'react/jsx-uses-react': 'off',       // React 17+ JSX transform
    'react/react-in-jsx-scope': 'off',   // React 17+ JSX transform

    // ── React Hooks ──────────────────────────────────────────────────────
    // These two rules catch the most common React bug class
    'react-hooks/rules-of-hooks': 'error',      // hooks must be called at top level
    'react-hooks/exhaustive-deps': 'warn',      // useEffect dependency arrays must be complete

    // ── Accessibility (jsx-a11y) ─────────────────────────────────────────
    // SVG badges MUST have aria-label (NFR-018)
    'jsx-a11y/aria-proptypes': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/interactive-supports-focus': 'error',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/label-has-associated-control': 'warn',

    // ── Import ordering ──────────────────────────────────────────────────
    // Enforces: external libraries → internal services → internal components → styles
    'import/order': [
      'warn',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: '@sentry/**', group: 'external', position: 'before' },
          { pattern: 'posthog-js', group: 'external', position: 'before' },
          { pattern: '../services/**', group: 'internal', position: 'before' },
          { pattern: '../hooks/**', group: 'internal', position: 'before' },
          { pattern: '../config/**', group: 'internal', position: 'before' },
          { pattern: '../data/**', group: 'internal', position: 'before' },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'import/no-duplicates': 'error',
    'import/no-unused-modules': 'warn',

    // ── Enforce service layer pattern (NFR-037) ──────────────────────────
    // Prevent direct Supabase or PostHog imports in components
    // Components import from services/ only — never from external SDKs directly
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@supabase/supabase-js',
            message:
              'Import Supabase through src/services/supabase.js — never directly in components.',
          },
          {
            name: 'posthog-js',
            message:
              'Import PostHog through src/services/analytics.js — never directly in components.',
          },
          {
            name: '@sentry/react',
            message:
              'Import Sentry only in src/main.jsx and src/services/supabase.js — not in components.',
          },
        ],
      },
    ],

    // ── Enforce content-via-props discipline (Content Mgmt Strategy) ────
    // No hardcoded question text in components — all content from props
    // Detects string literals that look like survey questions
    'no-restricted-syntax': [
      'warn',
      {
        selector: 'JSXAttribute[name.name="children"] > Literal[value=/What was|How important|How do you|Which|When something/]',
        message:
          'Hardcoded question text detected. All question content must come from props (useQuestionnaire hook), never hardcoded in components.',
      },
    ],

    // ── General quality ──────────────────────────────────────────────────
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'no-undef': 'error',
    'prefer-const': 'warn',
    'no-var': 'error',
    'eqeqeq': ['error', 'always', { null: 'ignore' }],
    'no-duplicate-imports': 'error',

    // ── Environment variables ────────────────────────────────────────────
    // Prevent reading import.meta.env directly in components (use features.js)
    'no-restricted-properties': [
      'warn',
      {
        object: 'import.meta',
        property: 'env',
        message:
          'Read feature flags from src/config/features.js — not import.meta.env directly in components.',
      },
    ],
  },

  // ── File-specific overrides ──────────────────────────────────────────────
  overrides: [
    {
      // Service files — allow Supabase and PostHog imports
      files: ['src/services/supabase.js', 'src/services/analytics.js'],
      rules: {
        'no-restricted-imports': 'off',
      },
    },
    {
      // Entry point — allow Sentry, PostHog, and import.meta.env
      files: ['src/main.jsx'],
      rules: {
        'no-restricted-imports': 'off',
        'no-restricted-properties': 'off',
      },
    },
    {
      // Feature flag config — allow import.meta.env
      files: ['src/config/features.js'],
      rules: {
        'no-restricted-properties': 'off',
      },
    },
    {
      // Config validator — allow import.meta.env and direct JSON imports
      files: ['src/config/configValidator.js'],
      rules: {
        'no-restricted-properties': 'off',
      },
    },
    {
      // Test files (if any test utilities are added)
      files: ['**/*.test.js', '**/*.spec.js'],
      env: { jest: true },
      rules: {
        'no-restricted-imports': 'off',
      },
    },
  ],
};
