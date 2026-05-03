# system_architecture_document_v10

*Document Type: DOCX*

## Table of Contents

  - [**SYSTEM ARCHITECTURE DOCUMENT**](#system-architecture-document)
    - [**GuestIQ**** — Hotel Guest Expectations Research Application**](#guestiq--hotel-guest-expectations-research-application)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Project**](#project)
  - [**Sprint**](#sprint)
  - [**Prepared By**](#prepared-by)
  - [**Date Prepared**](#date-prepared)
  - [**Review Checklist**](#review-checklist)
  - [**Related Documents**](#related-documents)
  - [**Document Location**](#document-location)
  - [**Downstream Artifacts**](#downstream-artifacts)
    - [**WARN****:  The**** three architectural disciplines that cannot be violated under any circumstances: (1) No component imports ****Supabase**** or ****PostHog**** directly — all calls go through service files. (2) No component contains hardcoded content strings — all text comes from props. (3) No credential appears in any committed file — all values ****in .env****.**](#warn--the-three-architectural-disciplines-that-cannot-be-violated-under-any-circumstances-1-no-component-imports-supabase-or-posthog-directly--all-calls-go-through-service-files-2-no-component-contains-hardcoded-content-strings--all-text-comes-from-props-3-no-credential-appears-in-any-committed-file--all-values-in-env)
- [1. Architecture Overview](#1-architecture-overview)
  - [1.1 Architecture Layers](#11-architecture-layers)
  - [**Layer**](#layer)
  - [**Description**](#description)
  - [**Layer 1 — Frontend**](#layer-1--frontend)
  - [**Layer 2 — Backend**](#layer-2--backend)
  - [**Layer 3 — Hosting and CI/CD**](#layer-3--hosting-and-cicd)
  - [**Observability layer**](#observability-layer)
  - [**Content management layer**](#content-management-layer)
  - [1.2 Request and Data Flow — Plain English](#12-request-and-data-flow--plain-english)
- [2. Frontend Layer](#2-frontend-layer)
  - [**  LAYER: FRONTEND  **** React 18 + Vite PWA**](#--layer-frontend---react-18--vite-pwa)
  - [2.1 Framework and Build Tooling](#21-framework-and-build-tooling)
  - [**Technology**](#technology)
  - [**Role**](#role)
  - [**React 18**](#react-18)
  - [**Vite**](#vite)
  - [**Vite PWA Plugin**](#vite-pwa-plugin)
  - [**Tailwind CSS**](#tailwind-css)
  - [**Framer Motion**](#framer-motion)
  - [**Recharts**](#recharts)
  - [**Radix UI**](#radix-ui)
  - [**i18next**](#i18next)
  - [2.2 Component Architecture — Key Principles](#22-component-architecture--key-principles)
  - [**Principle**](#principle)
  - [**Implementation**](#implementation)
  - [**Content via props only**](#content-via-props-only)
  - [**No direct external service calls**](#no-direct-external-service-calls)
  - [**No direct feature flag reads**](#no-direct-feature-flag-reads)
  - [2.3 Key Hooks and Services](#23-key-hooks-and-services)
  - [**Component / File**](#component--file)
  - [**Technology**](#technology)
  - [**Phase**](#phase)
  - [**Purpose and Responsibility**](#purpose-and-responsibility)
  - [**src****/hooks/useQuestionnaire.js**](#srchooksusequestionnairejs)
  - [**src****/hooks/useSession.js**](#srchooksusesessionjs)
  - [**src****/hooks/useOfflineQueue.js**](#srchooksuseofflinequeuejs)
  - [**src****/services/supabase.js**](#srcservicessupabasejs)
  - [**src****/services/analytics.js**](#srcservicesanalyticsjs)
  - [**src****/config/features.js**](#srcconfigfeaturesjs)
  - [**src****/config/configValidator.js**](#srcconfigconfigvalidatorjs)
  - [2.4 Main Entry Point — src/main.jsx](#24-main-entry-point--srcmainjsx)
- [3. Backend Layer](#3-backend-layer)
    - [**  LAYER: BACKEND  **** ****Supabase**** — PostgreSQL + Auth + RLS + Migrations**](#--layer-backend---supabase--postgresql--auth--rls--migrations)
  - [3.1 Database Schema — 4 Tables](#31-database-schema--4-tables)
  - [**Component / File**](#component--file)
  - [**Technology**](#technology)
  - [**Phase**](#phase)
  - [**Purpose and Responsibility**](#purpose-and-responsibility)
  - [**sessions**](#sessions)
  - [**responses**](#responses)
  - [**scale_responses**](#scale_responses)
  - [**none_flags**](#none_flags)
  - [3.2 Row Level Security](#32-row-level-security)
  - [**Policy**](#policy)
  - [**Specification**](#specification)
  - [**Anon key — INSERT**](#anon-key--insert)
  - [**Anon key — SELECT**](#anon-key--select)
  - [**getDashboardData****(****) exception**](#getdashboarddata-exception)
  - [**Service role key**](#service-role-key)
  - [3.3 Authentication — Bypass Mode](#33-authentication--bypass-mode)
  - [3.4 Dashboard Data Access](#34-dashboard-data-access)
    - [**WARN:  ****getDashboardData****(****) uses the anon key. The default RLS policy blocks SELECT with the anon key. A specific dashboard SELECT policy must be added during ****Supabase**** setup that allows aggregate reads for the ****property_id**** in the URL parameter. This policy is included in the migration file 20240101000005_rls_policies.sql. ****Verify**** this policy is active before testing the dashboard in Sprint 4.**](#warn--getdashboarddata-uses-the-anon-key-the-default-rls-policy-blocks-select-with-the-anon-key-a-specific-dashboard-select-policy-must-be-added-during-supabase-setup-that-allows-aggregate-reads-for-the-property_id-in-the-url-parameter-this-policy-is-included-in-the-migration-file-20240101000005_rls_policiessql-verify-this-policy-is-active-before-testing-the-dashboard-in-sprint-4)
  - [3.5 Supabase Migrations Structure](#35-supabase-migrations-structure)
  - [**Path**](#path)
  - [**Contents and Purpose**](#contents-and-purpose)
  - [**supabase****/migrations/**](#supabasemigrations)
  - [**20240101000001_create_sessions.sql**](#20240101000001_create_sessionssql)
  - [**20240101000002_create_responses.sql**](#20240101000002_create_responsessql)
  - [**20240101000003_create_scale_responses.sql**](#20240101000003_create_scale_responsessql)
  - [**20240101000004_create_none_flags.sql**](#20240101000004_create_none_flagssql)
  - [**20240101000005_rls_policies.sql**](#20240101000005_rls_policiessql)
- [4. Hosting and CI/CD Layer](#4-hosting-and-cicd-layer)
    - [**  LAYER: HOSTING / CI-CD  **** GitHub Pages + GitHub Actions**](#--layer-hosting--ci-cd---github-pages--github-actions)
  - [4.1 GitHub Pages Configuration](#41-github-pages-configuration)
  - [**Setting**](#setting)
  - [**Value**](#value)
  - [**URL**](#url)
  - [**HTTPS**](#https)
  - [**CDN**](#cdn)
  - [**Source**](#source)
  - [**Permissions**](#permissions)
  - [**Environment**](#environment)
  - [4.2 GitHub Actions CI/CD Pipeline](#42-github-actions-cicd-pipeline)
  - [**Step**](#step)
  - [**Action**](#action)
  - [**Step 1 — Checkout**](#step-1--checkout)
  - [**Step 2 — Node.js setup**](#step-2--nodejs-setup)
  - [**Step 3 — Install dependencies**](#step-3--install-dependencies)
  - [**Step 4 — ****ESLint**](#step-4--eslint)
  - [**Step 5 — Prettier check**](#step-5--prettier-check)
  - [**Step 6 — Vite build**](#step-6--vite-build)
  - [**Step 7 — Playwright (Sprint 4+)**](#step-7--playwright-sprint-4)
  - [**Step 8 — Deploy**](#step-8--deploy)
  - [4.3 Environment Configuration](#43-environment-configuration)
  - [**Variable**](#variable)
  - [**Source and ****Value**](#source-and-value)
  - [**VITE_SUPABASE_URL**](#vite_supabase_url)
  - [**VITE_SUPABASE_ANON_KEY**](#vite_supabase_anon_key)
  - [**VITE_SENTRY_DSN**](#vite_sentry_dsn)
  - [**VITE_POSTHOG_KEY**](#vite_posthog_key)
  - [**VITE_APP_ENV**](#vite_app_env)
  - [**VITE_APP_VERSION**](#vite_app_version)
  - [**Flag**](#flag)
  - [**Prototype Value**](#prototype-value)
  - [**VITE_FEATURE_AUTH_ENABLED**](#vite_feature_auth_enabled)
  - [**VITE_FEATURE_MULTI_PROPERTY**](#vite_feature_multi_property)
  - [**VITE_FEATURE_ADMIN_ENABLED**](#vite_feature_admin_enabled)
- [5. Observability Layer](#5-observability-layer)
    - [**  LAYER: OBSERVABILITY  **** Sentry + ****PostHog**** — external services**](#--layer-observability---sentry--posthog--external-services)
  - [5.1 Sentry — Error Tracking and Performance](#51-sentry--error-tracking-and-performance)
  - [**Aspect**](#aspect)
  - [**Specification**](#specification)
  - [**Purpose**](#purpose)
  - [**Initialization**](#initialization)
  - [**ErrorBoundary**](#errorboundary)
  - [**Service layer integration**](#service-layer-integration)
  - [**Alert routing**](#alert-routing)
  - [5.2 PostHog — Product Analytics and Session Replay](#52-posthog--product-analytics-and-session-replay)
  - [**Aspect**](#aspect)
  - [**Specification**](#specification)
  - [**Purpose**](#purpose)
  - [**Initialization**](#initialization)
  - [**Analytics service**](#analytics-service)
  - [**property_id**** architecture**](#property_id-architecture)
  - [**27 canonical events**](#27-canonical-events)
- [6. Content Management Layer](#6-content-management-layer)
    - [**  LAYER: CONTENT  **** Strangler Fig — questionnaire.js to JSON to ****Supabase**** CMS**](#--layer-content---strangler-fig--questionnairejs-to-json-to-supabase-cms)
  - [**Phase**](#phase)
  - [**Content Source**](#content-source)
  - [**Phase 1a — questionnaire.js**](#phase-1a--questionnairejs)
  - [**Phase 1b — 6 JSON files**](#phase-1b--6-json-files)
  - [**Phase 2 — ****Supabase**** CMS**](#phase-2--supabase-cms)
  - [6.1 useQuestionnaire Hook — The Content Abstraction Boundary](#61-usequestionnaire-hook--the-content-abstraction-boundary)
- [7. Complete Project Directory Structure](#7-complete-project-directory-structure)
  - [**Path**](#path)
  - [**Contents and Purpose**](#contents-and-purpose)
  - [**.env**](#env)
  - [**.****env****.example**](#envexample)
  - [**.****gitignore**](#gitignore)
  - [**.eslintrc.js**](#eslintrcjs)
  - [**.****prettierrc**](#prettierrc)
  - [**vite.config.js**](#viteconfigjs)
  - [**tailwind.config.js**](#tailwindconfigjs)
  - [**package.json**](#packagejson)
  - [**supabase****/migrations/**](#supabasemigrations)
  - [**src****/****main.jsx**](#srcmainjsx)
  - [**src****/****App.jsx**](#srcappjsx)
  - [**src****/components/**](#srccomponents)
  - [**src****/components/screens/**](#srccomponentsscreens)
  - [**src****/components/question/**](#srccomponentsquestion)
  - [**src****/components/gamification/**](#srccomponentsgamification)
  - [**src****/components/dashboard/**](#srccomponentsdashboard)
  - [**src****/hooks/**](#srchooks)
  - [**src****/services/**](#srcservices)
  - [**src****/services/supabase.js**](#srcservicessupabasejs)
  - [**src****/services/analytics.js**](#srcservicesanalyticsjs)
  - [**src****/config/**](#srcconfig)
  - [**src****/config/features.js**](#srcconfigfeaturesjs)
  - [**src****/config/configValidator.js**](#srcconfigconfigvalidatorjs)
  - [**src****/data/**](#srcdata)
  - [**src****/data/questionnaire.js**](#srcdataquestionnairejs)
  - [**src****/data/****questions.json**](#srcdataquestionsjson)
  - [**src****/data/****episodes.json**](#srcdataepisodesjson)
  - [**src****/data/****tiers.json**](#srcdatatiersjson)
  - [**src****/data/****ui-copy.json**](#srcdataui-copyjson)
  - [**src****/data/****branching.json**](#srcdatabranchingjson)
  - [**src****/data/****taxonomy.json**](#srcdatataxonomyjson)
  - [**src****/locales/****en.json**](#srclocalesenjson)
  - [**src****/styles/**](#srcstyles)
  - [**dist****/**](#dist)
- [8. Multi-Property Architecture Foundation](#8-multi-property-architecture-foundation)
  - [**Element**](#element)
  - [**Implementation**](#implementation)
  - [**URL parameter**](#url-parameter)
  - [**property_id**** in all records**](#property_id-in-all-records)
  - [**property_id**** in all events**](#property_id-in-all-events)
  - [**Phase 2 activation**](#phase-2-activation)
- [9. NFR Compliance Summary](#9-nfr-compliance-summary)
  - [**NFR**](#nfr)
  - [**Architecture Decision**](#architecture-decision)
  - [**NFR-001/002 — LCP/TTI performance**](#nfr-001002--lcptti-performance)
  - [**NFR-006 — Offline queue zero data loss**](#nfr-006--offline-queue-zero-data-loss)
  - [**NFR-010 — HTTPS everywhere**](#nfr-010--https-everywhere)
  - [**NFR-011 — Credentials ****in .env**](#nfr-011--credentials-in-env)
  - [**NFR-012 — RLS on all tables**](#nfr-012--rls-on-all-tables)
  - [**NFR-019 — Radix UI for interactive elements**](#nfr-019--radix-ui-for-interactive-elements)
    - [**NFR-030/031 — ****property_id**** and ****user_id**** scalability**](#nfr-030031--property_id-and-user_id-scalability)
  - [**NFR-034 — Zero hardcoded strings**](#nfr-034--zero-hardcoded-strings)
  - [**NFR-037 — Service layer for all calls**](#nfr-037--service-layer-for-all-calls)
    - [**NFR-039/040 — Sentry 100% capture + 27 ****PostHog**** events**](#nfr-039040--sentry-100-capture--27-posthog-events)
- [10. Component Introduction Schedule](#10-component-introduction-schedule)
  - [**Sprint**](#sprint)
  - [**Architecture Introduction**](#architecture-introduction)
  - [**Sprint 1 (now — design only)**](#sprint-1-now--design-only)
  - [**Sprint 2 — Core build**](#sprint-2--core-build)
  - [**Sprint 3 — Full questionnaire + gamification**](#sprint-3--full-questionnaire--gamification)
  - [**Sprint 4 — Dashboard + QA**](#sprint-4--dashboard--qa)
  - [**Sprint 5+ — Pilot and beyond**](#sprint-5--pilot-and-beyond)
- [11. S1-1.2 Review Checklist](#11-s1-12-review-checklist)
  - [**Checklist Item**](#checklist-item)
  - [**Where to Verify**](#where-to-verify)
  - [**Check 1 — Service layer**](#check-1--service-layer)
  - [**Check 2 — Feature flag system**](#check-2--feature-flag-system)
    - [**Check 3 — Sentry and ****PostHog**** as distinct services**](#check-3--sentry-and-posthog-as-distinct-services)
- [12. Version Log](#12-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF SYSTEM ARCHITECTURE DOCUMENT v1.0 —**](#-end-of-system-architecture-document-v10-)

## **SYSTEM ARCHITECTURE DOCUMENT**

### **GuestIQ**** — Hotel Guest Expectations Research Application**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Review by Lead Researcher


**## **Project****

GuestIQ — Hotel Guest Expectations Research Application


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Prepared By****

Claude (AI Developer)


**## **Date Prepared****

[Insert Date]


**## **Review Checklist****

(1) Service layer described — all Supabase calls through supabase.js. (2) Feature flag system described — .env controls prototype/production. (3) Sentry and PostHog shown as distinct external services. (4) Production-readiness decisions covered.


**## **Related Documents****

SRS-F v2.0 (S0-2.1) · SRS-NFR v1.2 (S0-2.3) · Production Readiness Architecture (S0-3.7) · Observability Spec (S0-3.3) · Content Management Strategy (S0-3.5)


**## **Document Location****

01-Sprint-1 / AI-Outputs / System-Architecture-Document-v1.0.docx


**## **Downstream Artifacts****

All Sprint 1 architecture artifacts (S1-1.2 through S1-3.6) derive from this document. Sprint 2 build implements this architecture.




INFO:  This document is the architectural blueprint for Sprint 2 build. Every technology decision is already locked — this document records and explains those decisions, not re-opens them. The purpose is to give the developer a complete picture of how all components fit together before writing the first line of code.

### **WARN****:  The**** three architectural disciplines that cannot be violated under any circumstances: (1) No component imports ****Supabase**** or ****PostHog**** directly — all calls go through service files. (2) No component contains hardcoded content strings — all text comes from props. (3) No credential appears in any committed file — all values ****in .env****.**


# 1. Architecture Overview

GuestIQ is a Progressive Web Application built on a three-layer architecture: a React frontend served from the browser, a Supabase backend handling data persistence and authentication, and GitHub Pages for hosting with GitHub Actions for CI/CD. Two external observability services (Sentry and PostHog) operate alongside these three layers.

The architecture is designed to satisfy three simultaneous requirements that usually pull against each other: zero IT involvement (no installation, no configuration by hotel staff), research-grade data integrity (every response captured reliably even during network outages), and evolutionary prototype design (every architectural decision made in Sprint 1 supports Phase 2 activation without a rebuild).


## 1.1 Architecture Layers

**## **Layer 1 — Frontend****

React 18 + Vite PWA running in the respondent's browser. Contains: all UI components, application state, session management, offline queue, routing logic, gamification engine, management dashboard overlay. Communicates outward through two service files only — never directly to any external service.


**## **Layer 2 — Backend****

Supabase — managed PostgreSQL database with Auth, Row Level Security, and real-time capabilities. Stores: all session records, all question responses, all scale responses, all none-flags. Auth is configured in bypass mode for Phase 1. All schema managed via versioned migration files.


**## **Layer 3 — Hosting and CI/CD****

GitHub Pages serves the compiled application bundle at guestiq.github.io?property=PROP001. GitHub Actions compiles and deploys on every push to the main branch — zero manual deployment steps required.


**## **Observability layer****

Sentry (error tracking + Core Web Vitals) and PostHog (product analytics + session replay) sit outside all three layers. They receive data from the frontend via service function calls — never directly from components. Both are initialized before the React application renders.


**## **Content management layer****

The questionnaire content architecture evolves across phases. Phase 1a: hardcoded in src/data/questionnaire.js. Phase 1b: extracted to 6 JSON configuration files in src/data/. Phase 2: Supabase content table + visual admin interface. The component layer never changes — it always reads content from props.




## 1.2 Request and Data Flow — Plain English

When a respondent opens guestiq.github.io?property=PROP001, the following sequence occurs:

1. Browser downloads the compiled JavaScript bundle from GitHub Pages CDN.
2. Sentry initialises — error capture is active before anything else runs.
3. PostHog initialises — analytics capture is active.
4. Configuration validator runs — verifies all JSON files are well-formed (Phase 1b onwards).
5. Application checks browser localStorage for an existing session token. If found and incomplete, disambiguation screen shown. If not, welcome screen shown.
6. Respondent selects a tier. Session record created in Supabase via service layer. Session token written to localStorage.
7. For each question answered: response written to Supabase via service layer. PostHog event fired via analytics service. If Supabase unreachable, response queued in memory and retried.
8. On session complete: session marked complete in Supabase. Session token cleared from localStorage. Results screen shown.
9. Three outbound data streams at all times: responses to Supabase, errors to Sentry, behavioral events to PostHog.

INFO:  The management dashboard (SHIFT+CTRL+A) reads from Supabase via the same service layer. It is the only read path in Phase 1 — all other Supabase calls are writes. The dashboard reads aggregate data, not individual session data.

# 2. Frontend Layer

## **  LAYER: FRONTEND  **** React 18 + Vite PWA**

The frontend is a React 18 single-page application built with Vite. It runs entirely in the browser. No server-side rendering. No backend framework. The compiled output is a set of static files (HTML, JS, CSS) served by GitHub Pages.


## 2.1 Framework and Build Tooling

**## **React 18****

Component-based UI framework. Concurrent rendering enabled. Hooks used throughout — no class components. Entry point: src/main.jsx.


**## **Vite****

Build tool and development server. Handles: TypeScript/JSX transpilation, module bundling, tree shaking, code splitting, hot module replacement in development. Config: vite.config.js. Outputs to dist/ on build.


**## **Vite PWA Plugin****

Adds Progressive Web App capabilities: service worker registration, offline caching of the application shell, web app manifest. This enables the app to load reliably even on slow connections — the application shell is cached after first visit.


**## **Tailwind CSS****

Utility-first CSS framework. GuestIQ design tokens (tier colors, canvas colors, typography scale) are implemented as Tailwind CSS custom properties in tailwind.config.js. No ad-hoc color values in components — all colors reference token names.


**## **Framer Motion****

Animation library. Used for: badge reveal animations (scale 1.0 to 1.15 to 1.0 at 300ms), progress bar fills, episode map transitions, disambiguation screen slide-in. Not used in Sprint 2 — introduced Sprint 3.


**## **Recharts****

Chart library. Used for: management dashboard donut charts, bar charts, horizontal distribution charts. Not used in Sprint 2 — introduced Sprint 4.


**## **Radix UI****

Headless accessible component library. Used for: all interactive question elements (radio buttons, checkboxes, scale sliders), tier card interactions, dashboard tab navigation. Provides correct ARIA patterns automatically — required by NFR-019.


**## **i18next****

Internationalisation framework. All text content routed through i18next locale files (src/locales/en.json). English only in Phase 1. Architecture is i18n-ready — adding French in Phase 2 is a locale file addition, not a code change.




## 2.2 Component Architecture — Key Principles

Three principles govern every component in the frontend layer:

**## **Content via props only****

No component contains hardcoded question text, answer options, episode names, tier descriptors, or UI copy. All content is received as props from the useQuestionnaire hook or from parent components. This is the prerequisite for the Phase 1b Strangler Fig migration. Verified by ESLint no-hardcoded-strings rule in CI/CD.


**## **No direct external service calls****

No component imports the Supabase client, the PostHog SDK, or the Sentry SDK. All external calls go through dedicated service files (src/services/supabase.js and src/services/analytics.js). Components call service functions — they are agnostic about what happens next. Required by NFR-037.


**## **No direct feature flag reads****

No component reads import.meta.env directly. Feature flags are imported from src/config/features.js. This ensures flag logic is in one place, testable, and type-safe.




## 2.3 Key Hooks and Services

| ## **Component / File** | ## **Technology** | ## **Phase** | ## **Purpose and Responsibility** |
| --- | --- | --- | --- |
| ## **src****/hooks/useQuestionnaire.js** | React | Ph 1a | Single import point for all questionnaire content. Imports from questionnaire.js (Phase 1a) or JSON files (Phase 1b). Provides: questions array, episodes array, tiers object, uiCopy object, branching object, taxonomy object. No component imports questionnaire.js or JSON files directly. |
| ## **src****/hooks/useSession.js** | React | S2 | Manages session state: session_id generation, localStorage token, tier, tense_frame, intent_category, current question index, is_complete. Coordinates with supabase.js service for all Supabase writes. |
| ## **src****/hooks/useOfflineQueue.js** | React | S2 | Manages the in-memory offline response queue. Monitors Supabase connectivity every 30 seconds. Flushes queued responses on reconnection. Fires PostHog offline_queue_activated and offline_queue_flushed events via analytics service. |
| ## **src****/services/supabase.js** | Supabase JS | S2 | Service layer for all Supabase operations. Exports: createSession, updateSession, insertResponse, insertScaleResponse, insertNoneFlag, getDashboardData, getIncompleteSession. All functions wrapped in try-catch with Sentry.captureException() on failure. RLS rejection detection built in. |
| ## **src****/services/analytics.js** | PostHog JS | S2 | Service layer for all PostHog events. Exports one named function per canonical event (27 functions). All calls include ip: false. property_id added from application state. No component calls posthog.capture() directly. |
| ## **src****/config/features.js** | Vite env | S2 | Feature flag exports. Reads from import.meta.env. Exports: AUTH_ENABLED, MULTI_PROPERTY, ADMIN_ENABLED. All default false in prototype. Only file that reads import.meta.env.VITE_FEATURE_*. |
| ## **src****/config/configValidator.js** | Vanilla JS | Ph 1b | Validates all 6 JSON config files on application load. Runs after Sentry.init(), before posthog.init(). Checks: all files present and parseable, correct structure, required fields present. Throws on failure — ErrorBoundary shows config error screen. |




## 2.4 Main Entry Point — src/main.jsx

The initialization sequence in src/main.jsx is mandatory and must not be reordered:


// 1. Sentry — FIRST. Errors captured before anything else.

import * as Sentry from '@sentry/react';

Sentry.init({ dsn: import.meta.env.VITE_SENTRY_DSN, ... });


// 2. Config validator — SECOND. Catches JSON errors before any render.

import { validateConfig } from './config/configValidator';

validateConfig(); // throws on failure — caught by ErrorBoundary below


// 3. PostHog — THIRD. Analytics active before first render.

import posthog from 'posthog-js';

posthog.init(import.meta.env.VITE_POSTHOG_KEY, { ... });


// 4. React application — LAST. Wrapped in Sentry ErrorBoundary.

import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

<Sentry.ErrorBoundary fallback={<ConfigErrorScreen />}>

<PostHogProvider client={posthog}>

<App />

</PostHogProvider>

</Sentry.ErrorBoundary>

);


DEV:  DEV: The ErrorBoundary wraps PostHogProvider. This means if PostHog itself throws during initialization, the ErrorBoundary catches it. The ConfigErrorScreen component shows a plain non-technical message to the respondent. Sentry has already captured the error before React rendered anything.

# 3. Backend Layer

### **  LAYER: BACKEND  **** ****Supabase**** — PostgreSQL + Auth + RLS + Migrations**

The backend is Supabase — a managed PostgreSQL service that provides database, authentication, Row Level Security, and real-time capabilities on a free tier sufficient for the Phase 1 pilot. No custom backend server is built or maintained. All database interactions go through the Supabase JavaScript client, which GuestIQ accesses exclusively through the service layer.


## 3.1 Database Schema — 4 Tables

All tables are created via Supabase Migrations — not manual SQL in the dashboard. The migration files live in supabase/migrations/ and are the authoritative record of the schema.


| ## **Component / File** | ## **Technology** | ## **Phase** | ## **Purpose and Responsibility** |
| --- | --- | --- | --- |
| ## **sessions** | PostgreSQL | S1+S2 | One record per respondent session. Fields: session_id (UUID PK), property_id (text), tier (text), tense_frame (text, nullable — set after Q0), intent_category (text, nullable — set after Q1), is_complete (boolean, default false), created_at (timestamptz), completed_at (timestamptz, nullable), user_id (UUID, nullable — null in Phase 1, set in Phase 2 auth), credentials_years (text, nullable), credentials_interactions (text, nullable), credentials_shift (text, nullable). |
| ## **responses** | PostgreSQL | S2 | One record per answered question per session. Fields: response_id (UUID PK), session_id (UUID FK), question_id (text e.g. 'Q1'), answer_code (text e.g. 'A'), tense_frame (text), module_number (int), property_id (text), created_at (timestamptz). Scale questions do NOT use this table. |
| ## **scale_responses** | PostgreSQL | S2 | One record per answered scale question. Fields: scale_response_id (UUID PK), session_id (UUID FK), question_id (text), scale_value (int 1-5), property_id (text), created_at (timestamptz). Separate table because scale responses have a different data structure (integer value vs option code). |
| ## **none_flags** | PostgreSQL | S2 | One record per 'None of these fit my situation' selection. Fields: none_flag_id (UUID PK), session_id (UUID FK), question_id (text), property_id (text), created_at (timestamptz). Separate table to support direct none-flag rate analysis per question without querying responses table. |




## 3.2 Row Level Security

RLS is enabled on all 4 tables from the first migration. The Phase 1 RLS policy is deliberately minimal:

**## **Anon key — INSERT****

The Supabase anon key (used by the frontend application) can INSERT into all 4 tables. This allows sessions and responses to be written without authentication.


**## **Anon key — SELECT****

The anon key cannot SELECT from any table. This prevents any respondent (or person who discovers the anon key in browser DevTools) from reading other respondents' data.


**## **getDashboardData****(****) exception****

The management dashboard needs to read aggregate data. In Phase 1, this is handled by a specific dashboard read policy applied separately. See Section 3.4.


**## **Service role key****

The service role key bypasses all RLS. It is never used in application code. It is only used by the Supabase CLI when running migrations. Never in .env, never in any committed file.




## 3.3 Authentication — Bypass Mode

Supabase Auth is installed and configured but not enforced in Phase 1. On session start, an anonymous Supabase session is created using the anon key. This anonymous session enables the offline queue and session resume to work without requiring a login. The user_id field in the sessions table is always null in Phase 1.

Phase 2 activation: set VITE_FEATURE_AUTH_ENABLED=true in .env. The auth flow gates the dashboard overlay behind a login screen. user_id is populated from the authenticated user's UUID. No code changes to any component — only the feature flag and the login screen need to be built.


## 3.4 Dashboard Data Access

### **WARN:  ****getDashboardData****(****) uses the anon key. The default RLS policy blocks SELECT with the anon key. A specific dashboard SELECT policy must be added during ****Supabase**** setup that allows aggregate reads for the ****property_id**** in the URL parameter. This policy is included in the migration file 20240101000005_rls_policies.sql. ****Verify**** this policy is active before testing the dashboard in Sprint 4.**


## 3.5 Supabase Migrations Structure

**## **supabase****/migrations/****

Root directory for all schema migration files. Managed by Supabase CLI.


**## **20240101000001_create_sessions.sql****

Creates sessions table with all fields including user_id nullable and property_id.


**## **20240101000002_create_responses.sql****

Creates responses table with FK to sessions.


**## **20240101000003_create_scale_responses.sql****

Creates scale_responses table with FK to sessions.


**## **20240101000004_create_none_flags.sql****

Creates none_flags table with FK to sessions.


**## **20240101000005_rls_policies.sql****

Enables RLS on all 4 tables. Creates INSERT policy for anon key. Creates dashboard aggregate read policy.



# 4. Hosting and CI/CD Layer

### **  LAYER: HOSTING / CI-CD  **** GitHub Pages + GitHub Actions**

GuestIQ is hosted on GitHub Pages — GitHub's free static hosting service. The application is compiled by Vite into a set of static files (HTML, CSS, JavaScript) and deployed to GitHub Pages automatically on every push to the main branch via GitHub Actions.


## 4.1 GitHub Pages Configuration

**## **URL****

guestiq.github.io?property=PROP001 — the ?property= query parameter sets the property_id for the session. The application reads this on load.


**## **HTTPS****

Enforced automatically by GitHub Pages. All traffic is HTTPS. Satisfies NFR-010.


**## **CDN****

GitHub Pages is served via a global CDN. The application bundle is cached at edge nodes worldwide. This contributes to the LCP under 2 seconds target (NFR-001) even on slower connections.


**## **Source****

Set to GitHub Actions (not Deploy from branch). This is configured in the repository Settings > Pages > Source. Required for the Actions deployment pipeline to work.


**## **Permissions****

GitHub Actions must have Read and Write permissions on the repository. Configured in Settings > Actions > General > Workflow permissions.


**## **Environment****

A github-pages environment is created in Settings > Environments. Deployment branches restricted to main only.




## 4.2 GitHub Actions CI/CD Pipeline

Every push to the main branch triggers the CI/CD pipeline. The pipeline runs in under 2 minutes and deploys to the live URL automatically. No manual deployment steps are ever required.

**## **Step 1 — Checkout****

Actions checks out the repository code.


**## **Step 2 — Node.js setup****

Actions installs Node.js (version pinned in .nvmrc or package.json engines field).


**## **Step 3 — Install dependencies****

npm ci — clean install from package-lock.json. Reproducible builds.


**## **Step 4 — ****ESLint****

npm run lint — zero errors required. Pipeline fails on any ESLint error. Satisfies NFR-035.


**## **Step 5 — Prettier check****

npm run format:check — zero formatting differences required. Satisfies NFR-036.


**## **Step 6 — Vite build****

npm run build — compiles and bundles the application to dist/. Fails if any TypeScript or build error.


**## **Step 7 — Playwright (Sprint 4+)****

Playwright visual regression screenshots compared against baseline. Pipeline fails on any visual regression. Added in Sprint 4.


**## **Step 8 — Deploy****

Actions deploys dist/ to GitHub Pages. Application live at guestiq.github.io within 30 seconds of this step completing.




## 4.3 Environment Configuration

The .env file at the project root contains all credentials and feature flags. It is listed in .gitignore and is never committed. The .env.example file is committed with placeholder values. GitHub Actions uses repository Secrets for the production build — the same variable names as .env.

All 6 required .env variables:

**## **VITE_SUPABASE_URL****

Supabase project URL. From supabase-credentials.txt.


**## **VITE_SUPABASE_ANON_KEY****

Supabase anon/public key. INSERT-only by RLS policy. From supabase-credentials.txt.


**## **VITE_SENTRY_DSN****

Sentry project DSN. From sentry-credentials.txt.


**## **VITE_POSTHOG_KEY****

PostHog project API key. From posthog-credentials.txt.


**## **VITE_APP_ENV****

'prototype' for local dev, 'pilot' for deployed app.


**## **VITE_APP_VERSION****

'1.0.0' — incremented on each significant deployment.



Feature flag variables — all false in prototype:

**## **VITE_FEATURE_AUTH_ENABLED****

false — auth bypass mode active.


**## **VITE_FEATURE_MULTI_PROPERTY****

false — single property (PROP001) only.


**## **VITE_FEATURE_ADMIN_ENABLED****

false — /admin route inactive.



# 5. Observability Layer

### **  LAYER: OBSERVABILITY  **** Sentry + ****PostHog**** — external services**

Sentry and PostHog are external services that receive data from the GuestIQ frontend via the service layer. They are initialized before the React application renders and operate throughout the session. Full configuration specifications are in the Observability and Analytics Specification (S0-3.3).


## 5.1 Sentry — Error Tracking and Performance

**## **Purpose****

Captures all unhandled JavaScript errors, React rendering errors (via ErrorBoundary), Supabase service layer failures (including RLS rejections), and Core Web Vitals from real user sessions.


**## **Initialization****

First operation in src/main.jsx. Sentry.init() called before React.createRoot(). Configuration: sendDefaultPii: false (no IP), tracesSampleRate: 1.0 (100% capture), environment from VITE_APP_ENV, release from VITE_APP_VERSION.


**## **ErrorBoundary****

Wraps the entire React application. Catches rendering errors. Shows user-facing 'Something went wrong — please refresh' screen. Reports error to Sentry with full component stack.


**## **Service layer integration****

Every function in supabase.js has a try-catch. Caught errors call Sentry.captureException() with context. RLS rejections (HTTP 403/400) are detected separately and captured with type: 'RLS_REJECTION'. They are not queued for retry.


**## **Alert routing****

Lead Researcher email configured as alert recipient. First occurrence of any new error triggers immediate email.




## 5.2 PostHog — Product Analytics and Session Replay

**## **Purpose****

Captures 27 named behavioral events across the complete respondent journey. Session replay with inputs masked. Primary research instrument for pilot engagement analysis.


**## **Initialization****

Second operation in src/main.jsx after Sentry. posthog.init() with ip: false, persistence: 'memory', autocapture: false, mask_all_inputs: true.


**## **Analytics service****

All PostHog calls go through src/services/analytics.js. One named function per event. ip: false applied universally. property_id added from application state. No component calls posthog.capture() directly.


**## **property_id**** architecture****

Every event includes property_id from the URL query parameter. In Phase 1 always 'PROP001'. This field enables Phase 2 multi-property funnel segmentation without any code changes.


**## **27 canonical events****

Defined in Observability Spec S0-3.3. Exact names, required properties, and verification sprint documented there. Event #4 is credentials_enrichment_completed (not credentials_completed — renamed in v2.0).



# 6. Content Management Layer

### **  LAYER: CONTENT  **** Strangler Fig — questionnaire.js to JSON to ****Supabase**** CMS**

The questionnaire content architecture evolves in three phases. The component layer never changes — it always reads content as props. Only the source of that content changes across phases.


**## **Phase 1a — questionnaire.js****

Sprint 2 through end of Sprint 3 testing. All content in src/data/questionnaire.js. Single JavaScript object with questions array, episodes array, tiers object, uiCopy object, branching object, taxonomy object. The useQuestionnaire hook is the only import point.


**## **Phase 1b — 6 JSON files****

Sprint 3-4 transition. Strangler Fig migration extracts content from questionnaire.js into: src/data/questions.json, episodes.json, tiers.json, ui-copy.json, branching.json, taxonomy.json. Application reads from JSON. questionnaire.js retained as reference. Configuration validator enabled.


**## **Phase 2 — ****Supabase**** CMS****

Phase 2. Content moves to Supabase questions table. useQuestionnaire hook updated to fetch from Supabase. Visual admin interface at /admin allows form-based editing. No component changes.




## 6.1 useQuestionnaire Hook — The Content Abstraction Boundary

useQuestionnaire is the single architectural boundary between content sources and components. Components never know whether content comes from questionnaire.js, JSON files, or Supabase. They always receive the same data structure from the hook.

DEV:  DEV: The useQuestionnaire hook interface must remain stable across all three content phases. Its return shape: { questions, episodes, tiers, uiCopy, branching, taxonomy }. Any content source change is internal to the hook — external consumers (components) are never affected.

# 7. Complete Project Directory Structure

The following directory structure is the authoritative layout for the Sprint 2 build. All paths are relative to the project root.


**## **.env****

Environment variables and feature flags. Never committed to Git. Created from .env.example.


**## **.****env****.example****

Template with all required variable names and placeholder values. Committed to Git.


**## **.****gitignore****

Includes: .env, node_modules/, dist/. Never less restrictive than this.


**## **.eslintrc.js****

ESLint configuration from Sprint 1 (S1-1.11). React hooks rules, jsx-a11y, import ordering.


**## **.****prettierrc****

Prettier configuration from Sprint 1. 2-space indent, single quotes, 100-char line width.


**## **vite.config.js****

Vite configuration including PWA plugin setup, build output settings, and base URL.


**## **tailwind.config.js****

Tailwind configuration with GuestIQ design tokens as custom properties.


**## **package.json****

Dependencies, scripts (dev, build, lint, format:check), Node.js version constraint.


**## **supabase****/migrations/****

Supabase migration SQL files. One file per schema change. Applied in Sprint 2 setup.


**## **src****/****main.jsx****

Application entry point. Initialization sequence: Sentry, validator, PostHog, React.


**## **src****/****App.jsx****

Root React component. Session router — shows disambiguation, welcome, or question screen based on state.


**## **src****/components/****

All React components. Never import Supabase, PostHog, or content files directly.


**## **src****/components/screens/****

Top-level screen components: WelcomeScreen, QuestionScreen, EpisodeTransitionScreen, CompletionScreen, ResultsScreen, EnrichmentScreen, DisambiguationScreen, DowntimeScreen, ConfigErrorScreen.


**## **src****/components/question/****

Question rendering components: Question.jsx (orchestrator), SingleSelectQuestion.jsx, MultiSelectQuestion.jsx, ScaleQuestion.jsx, NoneOption.jsx.


**## **src****/components/gamification/****

Gamification components: ProgressBar.jsx, EpisodeMap.jsx, AchievementBadge.jsx, BadgeReveal.jsx, CuriosityHook.jsx, TierUpgradePrompt.jsx, StreakCounter.jsx.


**## **src****/components/dashboard/****

Management dashboard components: DashboardOverlay.jsx, DashboardPanel.jsx, panel components (1-9), ExportButton.jsx.


**## **src****/hooks/****

Custom React hooks: useQuestionnaire.js, useSession.js, useOfflineQueue.js, useTierRouting.js, useBranching.js.


**## **src****/services/****

External service abstractions. Components never import from these directly — they call functions exported from here.


**## **src****/services/supabase.js****

All Supabase operations. The only file that imports the Supabase client.


**## **src****/services/analytics.js****

All PostHog events. The only file that calls posthog.capture().


**## **src****/config/****

Application configuration files.


**## **src****/config/features.js****

Feature flag exports. The only file that reads import.meta.env.VITE_FEATURE_*.


**## **src****/config/configValidator.js****

JSON configuration file validator. Runs on application boot in Phase 1b.


**## **src****/data/****

Content files. Never imported by components — only by useQuestionnaire hook.


**## **src****/data/questionnaire.js****

Phase 1a — all content as a JavaScript object.


**## **src****/data/****questions.json****

Phase 1b — 80 question objects.


**## **src****/data/****episodes.json****

Phase 1b — 7 episode objects with names and curiosity hook text.


**## **src****/data/****tiers.json****

Phase 1b — 3 tier objects with descriptors and CTAs.


**## **src****/data/****ui-copy.json****

Phase 1b — all UI text strings not in questions.


**## **src****/data/****branching.json****

Phase 1b — Module 5 routing rules.


**## **src****/data/****taxonomy.json****

Phase 1b — intent taxonomy code definitions.


**## **src****/locales/****en.json****

i18next English locale file. All text accessible for translation in Phase 2.


**## **src****/styles/****

Global CSS and Tailwind imports.


**## **dist****/****

Compiled output from Vite build. This directory is deployed to GitHub Pages. Never edit manually.



# 8. Multi-Property Architecture Foundation

Phase 2 requires GuestIQ to run at multiple hotel properties, with each property's data kept separate and comparable in aggregate. This capability is built into the Phase 1 architecture even though only one property is used in the prototype.


**## **URL parameter****

Every property accesses GuestIQ via its unique URL: guestiq.github.io?property=PROP001. The property identifier is the first data read on application load. Default: PROP001 if no parameter is present.


**## **property_id**** in all records****

Every Supabase record (sessions, responses, scale_responses, none_flags) includes property_id as a non-nullable text field. This enables any SQL query to be filtered or grouped by property without schema changes.


**## **property_id**** in all events****

Every PostHog event includes property_id as a required property. This enables PostHog funnels and cohorts to be segmented by property in Phase 2 with no event schema changes.


**## **Phase 2 activation****

Add a new URL (?property=PROP002) for the second hotel. Set VITE_FEATURE_MULTI_PROPERTY=true. The property selector UI appears. Cross-property dashboard panels activate. All existing PROP001 data continues working unchanged.



# 9. NFR Compliance Summary

The following table maps the 10 most architecturally significant NFRs to the specific design decisions in this document that satisfy them.


**## **NFR-001/002 — LCP/TTI performance****

GitHub Pages CDN serves the compiled bundle. Vite tree-shaking and code splitting keep the bundle under 500KB (NFR-005). PWA service worker caches the application shell. Framer Motion and Recharts lazy-loaded (Sprint 3/4) — not in the initial bundle.


**## **NFR-006 — Offline queue zero data loss****

useOfflineQueue hook maintains in-memory queue. Supabase connectivity checked every 30 seconds. Failed writes queued and retried. Session token in localStorage ensures session survives browser close. Downtime screen after 60 seconds.


**## **NFR-010 — HTTPS everywhere****

GitHub Pages enforces HTTPS automatically. No HTTP connections possible.


**## **NFR-011 — Credentials ****in .env****

All credentials in .env. .gitignore includes .env. GitHub Actions uses repository Secrets for production build.


**## **NFR-012 — RLS on all tables****

Migration file 20240101000005_rls_policies.sql enables RLS and creates anon INSERT policy. Verified in Sprint 2 setup step S2-1.3.


**## **NFR-019 — Radix UI for interactive elements****

All question input elements (single select, multi-select, scale) use Radix UI Radio Group, Checkbox Group, and Slider primitives. Correct ARIA patterns provided automatically.


**### **NFR-030/031 — ****property_id**** and ****user_id**** scalability****

property_id in all 4 tables and all PostHog events from Sprint 2. user_id nullable column in sessions table from Sprint 2. Both fields require zero schema changes in Phase 2.


**## **NFR-034 — Zero hardcoded strings****

All text via useQuestionnaire hook from questionnaire.js or JSON files. All UI copy via i18next locale file. ESLint rule enforces zero hardcoded strings in components. Verified in CI/CD pipeline.


**## **NFR-037 — Service layer for all calls****

supabase.js and analytics.js are the only files that import Supabase client and PostHog SDK. ESLint import rules prevent direct imports in components. Verified by code search in Sprint 4 Architecture Review.


**### **NFR-039/040 — Sentry 100% capture + 27 ****PostHog**** events****

Sentry tracesSampleRate: 1.0 captures every error. ErrorBoundary catches all rendering errors. All 27 PostHog events implemented in analytics.js as named functions. Verified in Sprint 4 S4-07.




# 10. Component Introduction Schedule

Not all components and technologies are introduced in Sprint 2. This schedule shows when each major piece of the architecture enters the codebase.


**## **Sprint 1 (now — design only)****

ESLint + Prettier configuration files. Supabase migration SQL files (written, not yet applied). questionnaire.js data structure specification (document — file created Sprint 2).


**## **Sprint 2 — Core build****

React + Vite project skeleton. All src/services/, src/hooks/, src/config/ files. src/data/questionnaire.js with all 80 questions. All question components, session management, disambiguation, offline queue. Sentry + PostHog initialized. GitHub Actions CI/CD deployed. All Sprint 2 PostHog events (16 events).


**## **Sprint 3 — Full questionnaire + gamification****

Framer Motion integrated. src/components/gamification/ all components. All Module 5 branches. All Sprint 3 PostHog events (8 events). Phase 1b JSON extraction — src/data/*.json files created, configValidator activated.


**## **Sprint 4 — Dashboard + QA****

Recharts integrated. src/components/dashboard/ all components. Playwright configured. Downtime screen. All Sprint 4 PostHog events (3 events).


**## **Sprint 5+ — Pilot and beyond****

No new architectural components. Fixes and patches only. Playwright runs on every deployment.




# 11. S1-1.2 Review Checklist

From MDT v5.0 step S1-1.2 — Lead Researcher review of this document. All three items must be confirmed before this document is approved.


**## **Check 1 — Service layer****

Verify the service layer is clearly described — all Supabase calls go through src/services/supabase.js and all PostHog calls through src/services/analytics.js. No component imports Supabase or PostHog directly. Section 2.3 and Section 5.


**## **Check 2 — Feature flag system****

Verify the feature flag system is clearly described — a single .env file switches between prototype and production behaviour via src/config/features.js. Section 4.3 and Section 2.2.


**### **Check 3 — Sentry and ****PostHog**** as distinct services****

Verify Sentry and PostHog appear as distinct external services with distinct purposes. Section 5.1 (Sentry = errors + performance) and Section 5.2 (PostHog = analytics + replay).




# 12. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF SYSTEM ARCHITECTURE DOCUMENT v1.0 —**

*GuestIQ**  ·**  System Architecture Document **v1.0  ·**  S1-1.**1  ·**  S1-**01  ·**  Sprint 1 **Artifact  ·**  Confidential*

