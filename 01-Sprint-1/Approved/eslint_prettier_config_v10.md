# eslint_prettier_config_v10

*Document Type: DOCX*

## Table of Contents

  - [**ESLINT + PRETTIER CONFIGURATION**](#eslint--prettier-configuration)
    - [**GuestIQ**** — Hotel Guest Expectations Research Application**](#guestiq--hotel-guest-expectations-research-application)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Files Produced**](#files-produced)
  - [**NFRs Satisfied**](#nfrs-satisfied)
  - [**Related Documents**](#related-documents)
  - [**Document Location**](#document-location)
  - [**Sprint 2 Action**](#sprint-2-action)
    - [**WARN****:  ****ESLint**** runs automatically in the GitHub Actions CI/CD pipeline (Step 4 of the pipeline). Any ****ESLint**** error blocks deployment. Prettier check (Step 5) also blocks deployment on formatting differences. Zero-error requirement is enforced — not advisory.**](#warn--eslint-runs-automatically-in-the-github-actions-cicd-pipeline-step-4-of-the-pipeline-any-eslint-error-blocks-deployment-prettier-check-step-5-also-blocks-deployment-on-formatting-differences-zero-error-requirement-is-enforced--not-advisory)
- [1. .eslintrc.js — ESLint Configuration](#1-eslintrcjs--eslint-configuration)
  - [**.eslintrc.js**](#eslintrcjs)
  - [1.1 ESLint Rule Rationale](#11-eslint-rule-rationale)
  - [**Rule**](#rule)
  - [**Severity**](#severity)
  - [**Purpose and What It Catches**](#purpose-and-what-it-catches)
  - [**react-hooks/rules-of-hooks**](#react-hooksrules-of-hooks)
  - [**react-hooks/exhaustive-deps**](#react-hooksexhaustive-deps)
  - [**jsx-a11y/recommended**](#jsx-a11yrecommended)
  - [**no-unused-vars**](#no-unused-vars)
  - [**no-restricted-imports (****Supabase****)**](#no-restricted-imports-supabase)
  - [**no-restricted-imports (****PostHog****)**](#no-restricted-imports-posthog)
  - [**import/order**](#importorder)
  - [**prefer-const**](#prefer-const)
  - [**eqeqeq**](#eqeqeq)
  - [1.2 Required ESLint Packages](#12-required-eslint-packages)
- [2. .prettierrc — Prettier Configuration](#2-prettierrc--prettier-configuration)
  - [**.****prettierrc**](#prettierrc)
  - [2.1 Formatting Decision Rationale](#21-formatting-decision-rationale)
  - [**Setting**](#setting)
  - [**Value**](#value)
  - [**Rationale**](#rationale)
  - [**printWidth**](#printwidth)
  - [**100**](#100)
  - [**singleQuote**](#singlequote)
  - [**true**](#true)
  - [**trailingComma**](#trailingcomma)
  - [**all**](#all)
  - [**semi**](#semi)
  - [**true**](#true)
  - [**endOfLine**](#endofline)
  - [**lf**](#lf)
  - [2.2 Required Prettier Package](#22-required-prettier-package)
- [3. Ignore Files](#3-ignore-files)
  - [**.****eslintignore**](#eslintignore)
  - [**.****prettierignore**](#prettierignore)
- [4. package.json Script Additions](#4-packagejson-script-additions)
  - [**package.json**** — scripts section additions**](#packagejson--scripts-section-additions)
  - [4.1 Developer Workflow](#41-developer-workflow)
  - [**Command**](#command)
  - [**When to Use**](#when-to-use)
  - [**npm**** run format**](#npm-run-format)
  - [**npm**** run ****lint:fix**](#npm-run-lintfix)
  - [**npm**** run lint**](#npm-run-lint)
  - [**npm**** run ****lint:all**](#npm-run-lintall)
  - [**npm**** run dev**](#npm-run-dev)
- [5. GitHub Actions Pipeline Integration](#5-github-actions-pipeline-integration)
  - [**.****github****/workflows/****deploy.yml**](#githubworkflowsdeployyml)
- [6. .gitattributes — Line Ending Enforcement](#6-gitattributes--line-ending-enforcement)
  - [**.****gitattributes**](#gitattributes)
- [7. Sprint 2 Setup Instructions](#7-sprint-2-setup-instructions)
  - [**#**](#)
  - [**Action**](#action)
  - [**Detail**](#detail)
  - [**1**](#1)
  - [**Create project**](#create-project)
  - [**2**](#2)
  - [**Add .****eslintrc.js**](#add-eslintrcjs)
  - [**3**](#3)
  - [**Add .****prettierrc**](#add-prettierrc)
  - [**4**](#4)
  - [**Add ignore files**](#add-ignore-files)
  - [**5**](#5)
  - [**Add .****gitattributes**](#add-gitattributes)
  - [**6**](#6)
  - [**Install ****ESLint**** packages**](#install-eslint-packages)
  - [**7**](#7)
  - [**Install Prettier**](#install-prettier)
  - [**8**](#8)
  - [**Add ****package.json**** scripts**](#add-packagejson-scripts)
  - [**9**](#9)
  - [**Run first lint check**](#run-first-lint-check)
  - [**10**](#10)
  - [**Run first format**](#run-first-format)
  - [**11**](#11)
  - [**Run ****format:check**](#run-formatcheck)
  - [**12**](#12)
  - [**Add GitHub Actions**](#add-github-actions)
  - [**13**](#13)
  - [**Add repository secrets**](#add-repository-secrets)
  - [**14**](#14)
  - [**Commit and push**](#commit-and-push)
  - [**15**](#15)
  - [**Verify pipeline**](#verify-pipeline)
    - [**WARN****:  Step**** 9 may produce 'no-unused-vars' warnings for the Vite scaffold files (****App.jsx****, ****main.jsx****). This is expected — the scaffold contains unused imports. Do not attempt to fix them manually. When the AI Developer replaces scaffold files with ****GuestIQ**** application code in S2-2.2, these warnings disappear.**](#warn--step-9-may-produce-no-unused-vars-warnings-for-the-vite-scaffold-files-appjsx-mainjsx-this-is-expected--the-scaffold-contains-unused-imports-do-not-attempt-to-fix-them-manually-when-the-ai-developer-replaces-scaffold-files-with-guestiq-application-code-in-s2-22-these-warnings-disappear)
- [8. Version Log](#8-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF ESLINT + PRETTIER CONFIGURATION v1.0 —**](#-end-of-eslint--prettier-configuration-v10-)

## **ESLINT + PRETTIER CONFIGURATION**

### **GuestIQ**** — Hotel Guest Expectations Research Application**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Ready for Sprint 2 repository setup


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Files Produced****

.eslintrc.js · .prettierrc · package.json scripts · .eslintignore · .prettierignore


**## **NFRs Satisfied****

NFR-035 (ESLint zero errors on every commit) · NFR-036 (Prettier on every commit)


**## **Related Documents****

System Architecture Document v1.0 (S1-1.1) · Backlog S1-06 ACs 69–70


**## **Document Location****

01-Sprint-1 / AI-Outputs / ESLint-Prettier-Config-v1.0.docx


**## **Sprint 2 Action****

Add all files to repository root in step S2-2.2 before writing any application code




INFO:  These configuration files are added to the repository root in Sprint 2 step S2-2.2 — before any application code is written. This is the correct order: configure quality gates first, then write code. Adding them later requires fixing all existing violations simultaneously, which is expensive and introduces risk.

### **WARN****:  ****ESLint**** runs automatically in the GitHub Actions CI/CD pipeline (Step 4 of the pipeline). Any ****ESLint**** error blocks deployment. Prettier check (Step 5) also blocks deployment on formatting differences. Zero-error requirement is enforced — not advisory.**


# 1. .eslintrc.js — ESLint Configuration

ESLint is a static code analysis tool that catches potential bugs, enforces consistent patterns, and prevents the three architectural violations defined in the System Architecture Document: direct Supabase imports in components, hardcoded content strings, and direct feature flag reads.


## **.eslintrc.js**

// .eslintrc.js

// GuestIQ — ESLint Configuration

// NFR-035: Zero errors required on every commit (enforced in GitHub Actions)


module.exports = {

env: {

browser: true,

es2021: true,

node: true,

},


extends: [

'eslint:recommended',

'plugin:react/recommended',

'plugin:react/jsx-runtime',      // React 17+ JSX transform — no import React needed

'plugin:react-hooks/recommended',

'plugin:jsx-a11y/recommended',

'plugin:import/recommended',

],


plugins: [

'react',

'react-hooks',

'jsx-a11y',

'import',

],


settings: {

react: {

version: 'detect',

},

'import/resolver': {

node: {

extensions: ['.js', '.jsx'],

},

},

},


rules: {

// ── React Hooks ─────────────────────────────────────────────────────────

// Catches missing dependencies and conditional hook calls — a common React bug source

'react-hooks/rules-of-hooks': 'error',

'react-hooks/exhaustive-deps': 'warn',


// ── Accessibility (jsx-a11y) ─────────────────────────────────────────────

// All jsx-a11y/recommended rules active. Key rules:

// - aria-props: valid ARIA attribute names only

// - aria-role: valid ARIA role values only

// - click-events-have-key-events: keyboard equivalent for click handlers

// - img-redundant-alt: no 'image', 'photo', 'picture' in alt text

// - interactive-supports-focus: interactive elements must be focusable

// Overrides: none — all a11y/recommended rules enforced at 'error' level


// ── Variables ────────────────────────────────────────────────────────────

'no-unused-vars': ['error', {

vars: 'all',

args: 'after-used',       // unused fn args after last used arg are flagged

ignoreRestSiblings: true, // allow { used, ...rest } patterns

}],

'no-console': ['warn', { allow: ['warn', 'error'] }],


// ── Import Ordering ──────────────────────────────────────────────────────

'import/order': ['error', {

groups: [

'builtin',    // Node.js built-ins (path, fs, etc.)

'external',   // node_modules (react, posthog-js, @sentry/react, etc.)

'internal',   // src/ path aliases

['parent', 'sibling', 'index'], // relative imports

],

'newlines-between': 'always',

alphabetize: { order: 'asc', caseInsensitive: true },

}],

'import/no-duplicates': 'error',


// ── Architectural Enforcement ────────────────────────────────────────────

// Prevent direct Supabase/PostHog imports in components — all calls via service layer

// (NFR-037: service layer is the only Supabase/PostHog import point)

'no-restricted-imports': ['error', {

patterns: [

{

group: ['@supabase/supabase-js'],

message:

'Direct Supabase import not allowed. Use src/services/supabase.js instead.',

},

{

group: ['posthog-js'],

message:

'Direct PostHog import not allowed. Use src/services/analytics.js instead.',

},

],

}],


// ── General Best Practices ───────────────────────────────────────────────

'no-var': 'error',                // const/let only — no var

'prefer-const': 'error',          // use const where value never reassigned

'no-duplicate-case': 'error',

'no-unreachable': 'error',

eqeqeq: ['error', 'always'],      // === only — no == coercion

curly: ['error', 'all'],          // always use braces with if/else/for/while

'no-implicit-coercion': 'error',  // no !! or +str tricks — be explicit

},


// Files to ignore — do not lint generated or non-application files

ignorePatterns: [

'dist/',

'node_modules/',

'supabase/',        // migration SQL files — not JS

'*.config.js',      // vite.config.js, tailwind.config.js etc.

'.eslintrc.js',     // this file

],

};


## 1.1 ESLint Rule Rationale


### ## **Rule**

**## **Severity****: ## **Purpose and What It Catches**


### ## **react-hooks/rules-of-hooks**

**error**: Prevents calling hooks conditionally or inside loops — the most common React bug that causes hard-to-trace state corruption.


### ## **react-hooks/exhaustive-deps**

**warn**: Flags missing hook dependencies — catches stale closure bugs in useEffect. Warning (not error) because some advanced patterns intentionally omit deps.


### ## **jsx-a11y/recommended**

**error**: Full WCAG 2.1 AA accessibility enforcement at lint time. Catches: missing alt text, invalid ARIA roles, missing keyboard handlers. Required by NFR-016 to NFR-019.


### ## **no-unused-vars**

**error**: Catches variables declared but never used — often indicates logic errors or dead code from refactoring.


### ## **no-restricted-imports (****Supabase****)**

**error**: Prevents any file other than src/services/supabase.js from importing @supabase/supabase-js. Enforces the service layer architecture required by NFR-037.


### ## **no-restricted-imports (****PostHog****)**

**error**: Prevents any file other than src/services/analytics.js from importing posthog-js. Enforces the analytics service layer.


### ## **import/order**

**error**: Enforces import grouping: Node.js built-ins → external packages → internal aliases → relative imports. Alphabetical within each group. Makes imports scannable.


### ## **prefer-const**

**error**: Enforces immutability discipline — const where possible, let only where reassignment is genuinely needed.


### ## **eqeqeq**

**error**: Prevents == type coercion bugs. Only === allowed. In a research instrument where answer codes like 'A' must match exactly, type coercion is a data integrity risk.





## 1.2 Required ESLint Packages

Install these packages as devDependencies in Sprint 2 step S2-2.2:

npm install --save-dev \

eslint \

eslint-plugin-react \

eslint-plugin-react-hooks \

eslint-plugin-jsx-a11y \

eslint-plugin-import


# 2. .prettierrc — Prettier Configuration

Prettier enforces consistent code formatting. When the AI Developer produces code in subsequent sprints, Prettier auto-formats it to the same style as any existing code. This eliminates formatting debates and keeps git diffs focused on logic, not whitespace.


## **.****prettierrc**

{

"semi": true,                    // Semicolons required — prevents ASI edge cases

"singleQuote": true,             // Single quotes for strings — consistent with React community norm

"jsxSingleQuote": false,         // Double quotes in JSX attributes — HTML convention

"printWidth": 100,              // 100-char line width — readable without horizontal scroll on 1080p

"tabWidth": 2,                  // 2-space indent — standard for JavaScript/React

"useTabs": false,               // Spaces, not tabs — consistent across all editors

"trailingComma": "all",         // Trailing commas in arrays, objects, parameters — cleaner diffs

"bracketSpacing": true,         // { key: value } not {key:value}

"bracketSameLine": false,       // JSX closing > on its own line

"arrowParens": "always",        // Always (x) => not x => — consistent function style

"endOfLine": "lf"              // Unix line endings — consistent across Windows/Mac development

}


## 2.1 Formatting Decision Rationale


### ## **Setting**

**## **Value****: ## **Rationale**


### ## **printWidth**

**## **100****: Wider than the Prettier default (80) because GuestIQ has long service function names and PostHog event property objects that break awkwardly at 80 chars.


### ## **singleQuote**

**## **true****: Consistent with React ecosystem convention. Reduces escaping in JSX (which uses double quotes per jsxSingleQuote: false).


### ## **trailingComma**

**## **all****: Reduces diff noise when adding array/object items — only the new item appears in the diff, not the previous last item gaining a comma.


### ## **semi**

**## **true****: Explicit semicolons prevent Automatic Semicolon Insertion edge cases — particularly important in async/await patterns.


### ## **endOfLine**

**## **lf****: Git on Windows can convert line endings, causing spurious diffs. LF enforced explicitly in .prettierrc and .gitattributes prevents this.





## 2.2 Required Prettier Package

npm install --save-dev prettier


# 3. Ignore Files


## **.****eslintignore**

# .eslintignore

# Files ESLint should not process

dist/

node_modules/

supabase/

*.config.js

public/


## **.****prettierignore**

# .prettierignore

# Files Prettier should not format

dist/

node_modules/

supabase/

*.sql

*.md

public/

.env

.env.example


# 4. package.json Script Additions

These scripts are added to the scripts section of package.json in Sprint 2. They enable local lint and format checks before pushing to GitHub, and are used by the GitHub Actions pipeline.


## **package.json**** — scripts section additions**

{

"scripts": {

"dev": "vite",

"build": "vite build",

"preview": "vite preview",


"lint": "eslint src/ --ext .js,.jsx --max-warnings 0",

// --max-warnings 0 means even warnings are treated as errors in CI

// This enforces NFR-035: zero ESLint errors on every commit


"lint:fix": "eslint src/ --ext .js,.jsx --fix",

// Auto-fix fixable ESLint issues — run locally before committing


"format": "prettier --write \"src/**/*.{js,jsx,json}\"",

// Auto-format all source files — run locally before committing


"format:check": "prettier --check \"src/**/*.{js,jsx,json}\"",

// Check formatting without modifying files — used in CI/CD pipeline

// This enforces NFR-036: Prettier formatting on every commit


"lint:all": "npm run lint && npm run format:check"

// Run both checks locally before pushing — mirrors CI/CD pipeline

}

}


## 4.1 Developer Workflow

**## **npm**** run format****

Before every commit. Auto-formats all source files. Run this first, before lint.


**## **npm**** run ****lint:fix****

After format. Auto-fixes fixable ESLint issues (import ordering, unused variable removal where safe).


**## **npm**** run lint****

After lint:fix. Verify no remaining errors. If errors remain, fix manually.


**## **npm**** run ****lint:all****

Quick combined check — mirrors what GitHub Actions will run. Use before pushing a branch.


**## **npm**** run dev****

Local development server with hot module replacement. Does not enforce lint or format.




# 5. GitHub Actions Pipeline Integration

The GitHub Actions workflow file (.github/workflows/deploy.yml) runs ESLint and Prettier check as mandatory steps before the Vite build. The pipeline is configured in Sprint 2 step S2-2.2. The complete workflow is shown here for reference.


## **.****github****/workflows/****deploy.yml**

name: Deploy GuestIQ to GitHub Pages


on:

push:

branches: [main]


permissions:

contents: read

pages: write

id-token: write


jobs:

build-and-deploy:

runs-on: ubuntu-latest

environment:

name: github-pages

url: ${{ steps.deployment.outputs.page_url }}


steps:

- name: Checkout

uses: actions/checkout@v4


- name: Setup Node.js

uses: actions/setup-node@v4

with:

node-version: '20'

cache: 'npm'


- name: Install dependencies

run: npm ci


# Step 4 — ESLint (NFR-035)

- name: ESLint — zero errors required

run: npm run lint


# Step 5 — Prettier (NFR-036)

- name: Prettier check — zero formatting differences

run: npm run format:check


# Step 6 — Vite build

- name: Build

run: npm run build

env:

VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}

VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}

VITE_SENTRY_DSN: ${{ secrets.VITE_SENTRY_DSN }}

VITE_POSTHOG_KEY: ${{ secrets.VITE_POSTHOG_KEY }}

VITE_APP_ENV: pilot

VITE_APP_VERSION: ${{ github.sha }}

VITE_FEATURE_AUTH_ENABLED: false

VITE_FEATURE_MULTI_PROPERTY: false

VITE_FEATURE_ADMIN_ENABLED: false


# Step 7 — Deploy to GitHub Pages

- name: Setup Pages

uses: actions/configure-pages@v4


- name: Upload artifact

uses: actions/upload-pages-artifact@v3

with:

path: './dist'


- name: Deploy to GitHub Pages

id: deployment

uses: actions/deploy-pages@v4


DEV:  DEV: The VITE_APP_VERSION is set to github.sha in the pipeline — this ties every Sentry error to a specific Git commit, making regression tracking precise. In local development, VITE_APP_VERSION defaults to '1.0.0-dev' per .env.local.

INFO:  Repository Secrets (Settings → Secrets and variables → Actions) must be added before the first pipeline run: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, VITE_SENTRY_DSN, VITE_POSTHOG_KEY. These are the same values from the credentials files created in Pre-Sprint.


# 6. .gitattributes — Line Ending Enforcement

The .gitattributes file ensures consistent line endings when code is checked in and out on Windows machines. Without this, Windows Git may convert LF to CRLF on checkout, causing Prettier format:check failures that are hard to diagnose.


## **.****gitattributes**

# .gitattributes

# Enforce LF line endings for all text files

* text=auto eol=lf


# Explicitly binary files — no line ending conversion

*.png binary

*.jpg binary

*.svg binary

*.ico binary

*.woff binary

*.woff2 binary


# 7. Sprint 2 Setup Instructions

These files are added to the repository in Sprint 2 step S2-2.2 — the project scaffold step. Follow this exact order.



### ## **#**

**## **Action****: ## **Detail**


### ## **1**

**## **Create project****: npm create vite@latest guestiq -- --template react → select JavaScript


### ## **2**

**## **Add .****eslintrc.js****: Copy Section 1 file contents verbatim to project root


### ## **3**

**## **Add .****prettierrc****: Copy Section 2 file contents verbatim to project root


### ## **4**

**## **Add ignore files****: Copy .eslintignore and .prettierignore from Section 3 to project root


### ## **5**

**## **Add .****gitattributes****: Copy Section 6 file contents verbatim to project root


### ## **6**

**## **Install ****ESLint**** packages****: npm install --save-dev eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y eslint-plugin-import


### ## **7**

**## **Install Prettier****: npm install --save-dev prettier


### ## **8**

**## **Add ****package.json**** scripts****: Add scripts from Section 4 to the scripts block in package.json


### ## **9**

**## **Run first lint check****: npm run lint — should produce zero errors on the Vite scaffold (may produce warnings)


### ## **10**

**## **Run first format****: npm run format — auto-formats all scaffold files to GuestIQ style


### ## **11**

**## **Run ****format:check****: npm run format:check — should pass after step 10


### ## **12**

**## **Add GitHub Actions****: Create .github/workflows/deploy.yml with contents from Section 5


### ## **13**

**## **Add repository secrets****: GitHub Settings → Secrets → add all 4 credential values


### ## **14**

**## **Commit and push****: git add -A && git commit -m 'chore: add ESLint, Prettier, GitHub Actions configuration' && git push


### ## **15**

**## **Verify pipeline****: Check GitHub Actions tab — pipeline should pass (ESLint green, Prettier green, build green, deploy green)





### **WARN****:  Step**** 9 may produce 'no-unused-vars' warnings for the Vite scaffold files (****App.jsx****, ****main.jsx****). This is expected — the scaffold contains unused imports. Do not attempt to fix them manually. When the AI Developer replaces scaffold files with ****GuestIQ**** application code in S2-2.2, these warnings disappear.**


# 8. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF ESLINT + PRETTIER CONFIGURATION v1.0 —**

*GuestIQ**  ·**  **ESLint** + Prettier Configuration **v1.0  ·**  S1-1.**11  ·**  S1-**06  ·**  Sprint 1 **Artifact  ·**  Confidential*

