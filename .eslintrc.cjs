module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    // React
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',

    // Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // General
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-debugger': 'error',
    'prefer-const': 'warn',
    'no-var': 'error',

    // Service layer enforcement
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@supabase/supabase-js',
            message: 'Import Supabase through src/services/supabase.js only.',
          },
          {
            name: 'posthog-js',
            message: 'Import PostHog through src/services/analytics.js only.',
          },
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['src/services/supabase.js'],
      rules: { 'no-restricted-imports': 'off' },
    },
    {
      files: ['src/services/analytics.js'],
      rules: { 'no-restricted-imports': 'off' },
    },
    {
      files: ['src/main.jsx'],
      rules: { 'no-restricted-imports': 'off' },
    },
    {
      files: ['src/config/features.js', 'src/config/configValidator.js'],
      rules: { 'no-restricted-imports': 'off' },
    },
  ],
};
