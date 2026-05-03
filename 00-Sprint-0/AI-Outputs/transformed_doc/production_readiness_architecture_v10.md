**PRODUCTION READINESS ARCHITECTURE DOCUMENT**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-3.7 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Gaps Documented** | 7 production-readiness gaps — all addressed in prototype architecture |
| **Related FRs** | FR-086–FR-095 (SRS-F v2.0 Section 12) · NFR-010–014 (security) · NFR-030–032 (scalability) |
| **Related Documents** | SRS-F v2.0 Sections 11–12 (S0-2.1) · Charter v2.1 Section 1 (S0-1.1) · Backlog v3.1 S2-13, S2-14 |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Production-Readiness-Architecture-v1.0.docx |
| **Downstream Use** | Source of truth for Sprint 4 Architecture Review (S4-2.6) · Phase 2 Sprint 0 activation playbook |

INFO: This document is written for the Lead Researcher, not a developer audience. Each gap is explained in plain English: what the problem is, why it matters for Phase 2, and what the prototype does to address it without blocking the pilot.

**WARN: All 7 gaps are addressed in the prototype architecture — none are ignored. The architectural choices made now determine whether Phase 2 is a smooth activation or an expensive rebuild. Every decision recorded here was made to minimise Phase 2 rework.**

# 1. What Is Production Readiness and Why Does It Matter Here?

A prototype is typically built to demonstrate an idea. When the idea is proven, the prototype is thrown away and a production system is built from scratch. This is expensive, time-consuming, and discards everything learned during the prototype.

GuestIQ follows a different principle, stated in the Project Charter v2.1: it is an evolutionary prototype — a system built to production-grade standards from its first line of code, designed to grow into the production system without a rebuild. This principle requires identifying in advance every place where a prototype would normally make a shortcut that becomes a rebuild cost later, and addressing each one with an architecture decision now.

There are 7 such gaps in GuestIQ. Each gap is a place where a naive prototype implementation would have been faster to build but would require a rewrite before Phase 2 could begin. The architecture addresses each gap during Phase 1 at low cost — so Phase 2 can begin by activating existing infrastructure rather than building from scratch.

## 1.1 The 7 Gaps at a Glance

| **Gap** | **Gap Name** | **Problem** | **Prototype Fix** | **Sprint** | **Phase 2 Activation** |
| --- | --- | --- | --- | --- | --- |
| **1** | **Authentication** | Open access — no login — anyone with URL can access management overlay | Auth bypass mode — Supabase Auth installed and configured but inactive. VITE\_FEATURE\_AUTH\_ENABLED=false | S2 | Set VITE\_FEATURE\_AUTH\_ENABLED=true — no code changes needed |
| **2** | **Environment Configuration** | Credentials in code — hardcoded API keys are a security risk and cannot vary by environment | All credentials in .env file — never committed to Git. src/config/features.js for feature flags | S1+S2 | Add new .env variables for Phase 2 services (SSO, additional Supabase project) |
| **3** | **Feature Flag System** | No mechanism to switch prototype/production behaviour without code changes | Feature flags in src/config/features.js — single file controls all environment-switching | S2 | Flip VITE\_FEATURE\_AUTH\_ENABLED, VITE\_FEATURE\_MULTI\_PROPERTY, VITE\_FEATURE\_ADMIN\_ENABLED |
| **4** | **Structured Error Logging** | Errors not captured — bugs during pilot invisible unless a user reports them | Sentry initialised as first operation — ErrorBoundary, service layer capture, RLS rejection detection | S2 | Sentry already production-grade. Review alert thresholds and team assignments in Phase 2 |
| **5** | **Database Schema Versioning** | Manual SQL edits leave no audit trail — impossible to recreate the exact schema | All schema via Supabase Migrations — every table, index, RLS policy in versioned .sql files | S1 | Add migration files for Phase 2 schema changes (user\_id, content table, property table) |
| **6** | **API Service Layer** | Components calling APIs directly — impossible to swap backend without touching every component | All Supabase calls through src/services/supabase.js — components never import Supabase client | S2 | Service layer already production-grade. Add Phase 2 service functions as needed |
| **7** | **Dashboard Caching** | Direct Supabase queries on every dashboard panel load — acceptable at 10 users, not at 100+ | No caching in prototype — acceptable at pilot scale (under 50 sessions) | n/a — by design | Add Supabase materialized views and Edge Functions for aggregated query caching |

## 1.2 How to Read This Document

Sections 2 through 8 document each gap in full. Each section has the same structure:

- The problem — what a naive prototype would do, and why that creates a Phase 2 rebuild cost
- The fix — exactly what the prototype does instead, and what code it produces
- Implementation cost — how much Sprint time this adds relative to the naive approach
- Sprint — which sprint implements the fix
- Phase 2 activation — the one change needed to move from prototype to production for this gap

INFO: The Sprint 4 Architecture Review (Backlog S4-07, step S4-2.6 in MDT) verifies all 7 gaps are correctly implemented before the pilot launches. Section 9 of this document is the review checklist for that step.

# 2. Gap 1 — Authentication Infrastructure

**GAP 1 Authentication in Bypass Mode [PROTOTYPE: bypass active — Phase 2: one flag to activate]**

## 2.1 The Problem

The management dashboard (SHIFT+CTRL+A) gives access to all pilot data, all export functions, and all analytics panels. In a production system, this requires authentication — only authorised users should see this. A naive prototype would simply leave the dashboard open to anyone who knows the keyboard shortcut. This is acceptable for Phase 1 (small team, internal pilot), but it means Phase 2 would need to retrofit authentication onto a system that was never designed for it — a risky and expensive rebuild.

## 2.2 The Fix — Auth Bypass Mode

Supabase Auth is installed and configured in the prototype, but activated in bypass mode. The architecture is complete — it is simply not enforced yet.

| **Aspect** | **Specification** |
| --- | --- |
| **What bypass mode means** | On session start, the application creates an anonymous session using the Supabase anon key. This is not a real user authentication — it is a session token that allows the offline queue and session resume to work. No login screen is shown. No username or password exists. |
| **What is built but inactive** | The Supabase Auth client is initialised. The user\_id field is present as a nullable UUID column in the sessions table. The feature flag VITE\_FEATURE\_AUTH\_ENABLED exists in src/config/features.js and is set to false. When this flag is true, the authentication flow activates. |
| **RLS policies** | Row Level Security is active on all 4 Supabase tables. The anon key can INSERT into all 4 tables (write responses), but cannot SELECT (read data from other sessions). This is the correct Phase 1 RLS policy — it protects respondent data from cross-session access without requiring login. Phase 2 RLS adds a user-authenticated read permission for the dashboard route. |
| **Dashboard access** | SHIFT+CTRL+A is the only management access path. There is no /admin URL (FR-093 prohibits it in Phase 1). The keyboard shortcut is not discoverable by casual users. This is an acceptable security control for a 10-person internal pilot. Phase 2 adds login before the overlay renders. |

## 2.3 Implementation Cost

Installing Supabase Auth in bypass mode adds approximately 2 hours of Sprint 2 build time compared to no authentication at all. This 2-hour investment means Phase 2 authentication activation requires a configuration change, not a code rewrite. The alternative — retrofitting authentication onto a system not designed for it — typically costs 2 to 4 weeks of rework.

## 2.4 Phase 2 Activation

| **Change** | **Detail** |
| --- | --- |
| **What changes** | Set VITE\_FEATURE\_AUTH\_ENABLED=true in the production .env file. The feature flag gates the authentication flow — when true, the dashboard overlay requires login before rendering. |
| **What stays the same** | All application code. All component structure. All Supabase table schemas. All RLS policy logic (new policies are added, existing ones remain). All session handling. |
| **Additional Phase 2 work** | Design and build the login screen (simple email/password or hotel SSO). Update RLS policies to allow authenticated users to SELECT their property's data. Populate the user\_id field in sessions table on session creation. |

DEV: DEV: Implement src/config/features.js in Sprint 2 step S2-13. It exports: { AUTH\_ENABLED: import.meta.env.VITE\_FEATURE\_AUTH\_ENABLED === 'true', MULTI\_PROPERTY: import.meta.env.VITE\_FEATURE\_MULTI\_PROPERTY === 'true', ADMIN\_ENABLED: import.meta.env.VITE\_FEATURE\_ADMIN\_ENABLED === 'true' }. No component reads import.meta.env directly — they import from features.js. This ensures the flag system can be tested and type-checked.

# 3. Gap 2 — Environment Configuration

**GAP 2 Environment Configuration and Credential Management [PROTOTYPE: .env file from Sprint 1 — Phase 2: add new variables]**

## 3.1 The Problem

A naive prototype would hardcode API keys, database URLs, and feature flags directly in the application code. This creates three problems: (1) credentials are visible to anyone who views the source code — a security risk; (2) switching between development and production environments requires changing code, not configuration; (3) adding a new environment (staging, multi-property test) requires further code changes.

## 3.2 The Fix — .env File Architecture

All credentials and environment-specific configuration are stored in a .env file at the project root. The .env file is never committed to Git. A .env.example file (with placeholder values) is committed to document the required variables. This is standard industry practice for production applications.

## 3.3 Complete .env Variable Specification

The following 6 variables are required in .env for the prototype to function. All are read via Vite's import.meta.env mechanism and prefixed with VITE\_ so they are available in browser code.

| **Variable** | **Purpose and Source** |
| --- | --- |
| **VITE\_SUPABASE\_URL** | The project URL from the Supabase dashboard. Format: https://[project-id].supabase.co. Value from supabase-credentials.txt (Pre-Sprint setup). Never commit. |
| **VITE\_SUPABASE\_ANON\_KEY** | The public anon key from Supabase. This key has limited permissions (INSERT only per RLS policy). Safe to use in browser code — not the service\_role key. Value from supabase-credentials.txt. Never commit the service\_role key anywhere. |
| **VITE\_SENTRY\_DSN** | The DSN from the Sentry project. Format: https://[key]@sentry.io/[project-id]. Value from sentry-credentials.txt. Used only for error reporting — no security risk if leaked, but still kept in .env for consistency. |
| **VITE\_POSTHOG\_KEY** | The project API key from PostHog. Format: phc\_xxxxxxxxxxxx. Value from posthog-credentials.txt. Used only for analytics — no security risk if leaked, but kept in .env for consistency. |
| **VITE\_APP\_ENV** | The environment name. Value: 'prototype' in development, 'pilot' in the deployed app. Used by Sentry to separate developer errors from real pilot errors in the dashboard. |
| **VITE\_APP\_VERSION** | The application version. Format: '1.0.0'. Used by Sentry to attribute errors to specific releases. Increment with every significant deployment. |

## 3.4 The .env.example File

A .env.example file committed to the Git repository documents all required variables without revealing their values:

# GuestIQ Environment Configuration

# Copy this file to .env and fill in values from credentials files

# NEVER commit .env to Git

VITE\_SUPABASE\_URL=https://your-project-id.supabase.co

VITE\_SUPABASE\_ANON\_KEY=your-anon-key-here

VITE\_SENTRY\_DSN=https://your-dsn@sentry.io/your-project-id

VITE\_POSTHOG\_KEY=phc\_your-api-key-here

VITE\_APP\_ENV=prototype

VITE\_APP\_VERSION=1.0.0

# Feature flags — set to 'true' to activate Phase 2 features

VITE\_FEATURE\_AUTH\_ENABLED=false

VITE\_FEATURE\_MULTI\_PROPERTY=false

VITE\_FEATURE\_ADMIN\_ENABLED=false

**WARN: VITE\_SUPABASE\_ANON\_KEY is the anon/public key — NOT the service\_role key. The service\_role key bypasses all RLS policies and would give any user full database access. The service\_role key must never appear in any application file, .env file, or commit. It is used only in server-side Supabase operations, which GuestIQ does not have in Phase 1.**

## 3.5 Phase 2 Activation

Phase 2 adds new .env variables as new services are introduced. The pattern is the same — new variables in .env, referenced via import.meta.env in service files. No existing variable changes. The .gitignore and .env.example patterns established in Sprint 1 continue unchanged.

# 4. Gap 3 — Feature Flag System

**GAP 3 Feature Flag System [PROTOTYPE: all flags false — Phase 2: flip flags to activate]**

## 4.1 The Problem

Without a feature flag system, switching from prototype behaviour to production behaviour requires code changes in multiple places — removing workarounds, adding new code paths, testing, redeploying. Each change is a risk of regression. A feature flag system allows the prototype and production configurations to coexist in the same codebase, with a single variable controlling which path is active.

## 4.2 The Fix — src/config/features.js

A single configuration file exports all feature flags. Components and services import from this file — they never read environment variables directly. This ensures: (1) all flag logic is in one place, (2) flags can be typed and defaulted safely, (3) tests can override flags by mocking one file.

| **Flag** | **Default Value and Effect** |
| --- | --- |
| **VITE\_FEATURE\_AUTH\_ENABLED** | false in prototype. Controls: whether the dashboard overlay requires login before rendering, whether session creation writes a real user\_id to the sessions table. Set to true in Phase 2 after the login screen is built. |
| **VITE\_FEATURE\_MULTI\_PROPERTY** | false in prototype. Controls: whether the property selector UI is shown on the welcome screen, whether the dashboard shows cross-property comparison panels. Set to true in Phase 2 when a second property is onboarded. |
| **VITE\_FEATURE\_ADMIN\_ENABLED** | false in prototype. Controls: whether the /admin route is active, whether the admin navigation link is visible in the management overlay. Set to true in Phase 2 after the visual admin CMS is built. |

## 4.3 How Components Use Feature Flags

The correct pattern — import from features.js, never read import.meta.env directly:

// src/config/features.js

export const features = {

AUTH\_ENABLED: import.meta.env.VITE\_FEATURE\_AUTH\_ENABLED === 'true',

MULTI\_PROPERTY: import.meta.env.VITE\_FEATURE\_MULTI\_PROPERTY === 'true',

ADMIN\_ENABLED: import.meta.env.VITE\_FEATURE\_ADMIN\_ENABLED === 'false',

};

// Usage in a component or service:

import { features } from '../config/features';

if (features.AUTH\_ENABLED) {

// Show login screen

} else {

// Bypass mode — proceed directly

}

## 4.4 Phase 2 Activation

Set the relevant flag to 'true' in the production .env file. Redeploy. The feature activates. No code changes in components or services. Each flag activation is an independent, low-risk deployment.

# 5. Gap 4 — Structured Error Logging

**GAP 4 Structured Error Logging via Sentry [PROTOTYPE: fully production-grade from Sprint 2 day one]**

## 5.1 The Problem

A naive prototype has no error logging. When a bug occurs during the pilot, the Lead Researcher hears about it via a Teams message from a front desk team member — 'something went wrong' — with no information about what failed, in which browser, at which question, or what the error was. Diagnosing such a report requires reproducing the bug manually, which may be impossible if the bug is intermittent or device-specific.

## 5.2 The Fix — Sentry from Sprint 2 Day One

Sentry is initialised as the very first operation in the application. It is not an afterthought — it is the foundation on which everything else runs. The Observability and Analytics Specification (S0-3.3) documents Sentry configuration in full. This gap entry summarises the production-readiness dimension specifically.

| **Aspect** | **Specification** |
| --- | --- |
| **Error capture coverage** | 100% of unhandled JavaScript errors via ErrorBoundary. 100% of Supabase service layer errors via try-catch in supabase.js. RLS rejection errors specifically identified and captured with RLS\_REJECTION context. Configuration validator failures. Export failures. Every error that would previously be invisible is now captured with full context. |
| **Context captured per error** | Error type and message. Stack trace. Browser name and version. Operating system. Application version (VITE\_APP\_VERSION). Environment (prototype/pilot). Session state at the time of error (question number, episode, tier). This is sufficient to diagnose any bug reported during the pilot. |
| **Alert routing** | The Lead Researcher's email is configured in Sentry as the alert recipient for all new issues. First occurrence of any new error triggers an immediate email. This means the Lead Researcher often knows about a bug before the team member who encountered it has sent a Teams message. |
| **Performance monitoring** | Core Web Vitals captured from real user sessions on real hotel hardware. The Sprint 4 performance verification (S4-09) uses this data to confirm the application meets NFR targets before the pilot launches. |
| **Privacy compliance** | sendDefaultPii: false — no IP addresses, no user identifiers. The error report contains session state and technical context, not personal data. Compliant with the privacy requirements in the Observability Specification. |

## 5.3 Implementation Cost

Initialising Sentry as the first build task (S2-2.1a) adds approximately 1 hour to Sprint 2. This hour saves 4 to 8 hours of blind debugging per incident during the pilot — a strong return on investment even for a 2-week pilot.

## 5.4 Phase 2 Activation

Gap 4 requires no Phase 2 activation. Sentry is already production-grade. Phase 2 work is operational: review alert thresholds (tracesSampleRate may be reduced from 1.0 for higher-volume deployments), assign alerts to team members rather than a single email, add custom dashboards for the new Phase 2 error categories.

# 6. Gap 5 — Database Schema Versioning

**GAP 5 Database Schema via Supabase Migrations [PROTOTYPE: migrations from Sprint 1 — Phase 2: add migration files]**

## 6.1 The Problem

A naive prototype creates database tables by running SQL manually in the Supabase dashboard. This leaves no record of how the schema was created. When Phase 2 needs to add a column, change a type, or create a new table, there is no controlled way to do so — every change is manual, unversioned, and potentially irreversible. More critically: if the Supabase project is accidentally deleted (Risk R — Supabase project accidental deletion in the Risk Register), recreating the schema requires remembering every step taken.

## 6.2 The Fix — Supabase Migrations

Every database change — table creation, index creation, RLS policy — is implemented as a Supabase Migration file. Migration files are SQL scripts stored in the supabase/migrations/ directory of the Git repository, with sequential timestamps as filenames. The Supabase CLI applies them in order.

## 6.3 Migration File Structure

The 4-table GuestIQ schema is implemented across these migration files (produced in Sprint 1 step S1-2.4, applied in Sprint 2 step S2-1.2):

| **Migration File** | **Contents** |
| --- | --- |
| **20240101000001\_create\_sessions.sql** | Creates the sessions table: session\_id (UUID, primary key), property\_id (text, not null), tier (text, not null), tense\_frame (text, nullable — populated after Q0), intent\_category (text, nullable — populated after Q1), is\_complete (boolean, default false), created\_at (timestamptz, default now()), completed\_at (timestamptz, nullable), user\_id (UUID, nullable — null in Phase 1). |
| **20240101000002\_create\_responses.sql** | Creates the responses table: response\_id (UUID, primary key), session\_id (UUID, foreign key to sessions), question\_id (text, not null), answer\_code (text, not null), tense\_frame (text, not null), module\_number (integer, not null), property\_id (text, not null), created\_at (timestamptz, default now()). |
| **20240101000003\_create\_scale\_responses.sql** | Creates the scale\_responses table: scale\_response\_id (UUID, primary key), session\_id (UUID, foreign key), question\_id (text, not null), scale\_value (integer, 1-5), property\_id (text, not null), created\_at (timestamptz, default now()). |
| **20240101000004\_create\_none\_flags.sql** | Creates the none\_flags table: none\_flag\_id (UUID, primary key), session\_id (UUID, foreign key), question\_id (text, not null), property\_id (text, not null), created\_at (timestamptz, default now()). Records every 'None of these fit my situation' selection. |
| **20240101000005\_rls\_policies.sql** | Enables RLS on all 4 tables. Creates policies: anon key can INSERT into all 4 tables. anon key cannot SELECT (read) from any table. This prevents any respondent from reading other respondents' data through the client. Dashboard reads go through a Supabase service role key used only in secure server contexts — in Phase 1, the management dashboard reads are directly from the Supabase dashboard UI. |

INFO: The user\_id column in the sessions table is nullable. In Phase 1 (bypass mode) it is always null. In Phase 2 (authentication active), it is populated with the authenticated user's UUID when a session is created. This column is the bridge between Phase 1 and Phase 2 — its presence in the schema now means Phase 2 authentication does not require a schema migration to add it.

## 6.4 Phase 2 Activation

Each Phase 2 schema change is implemented as a new migration file with the next timestamp. The Supabase CLI applies migrations in order, so Phase 2 changes build on top of Phase 1 without modifying existing files. Examples of Phase 2 migration files:

- 20240201000001\_add\_content\_table.sql — creates the Phase 2 questionnaire content table for the visual admin CMS
- 20240201000002\_add\_properties\_table.sql — creates a properties table for multi-property deployment
- 20240201000003\_update\_rls\_for\_auth.sql — adds authenticated-user SELECT permissions for the dashboard route
- 20240201000004\_add\_dashboard\_views.sql — creates materialized views for dashboard query caching (Gap 7)

# 7. Gap 6 — API Service Layer

**GAP 6 Supabase Service Layer Architecture [PROTOTYPE: fully implemented from Sprint 2 — Phase 2: add functions]**

## 7.1 The Problem

A naive prototype has React components import the Supabase client directly and call the database API inline: supabase.from('sessions').insert({...}). This couples every component to Supabase. When Phase 2 needs to change a table structure, add an additional API call, or swap Supabase for a different backend, every component that makes a database call must be updated. In a prototype with dozens of components, this is a major refactoring effort.

## 7.2 The Fix — src/services/supabase.js

All Supabase calls are encapsulated in a dedicated service file. React components import named functions from this service — they never import the Supabase client directly. The service file is the only place in the codebase that knows the Supabase API structure.

## 7.3 Service Layer Function Contracts

The following functions are the complete service layer contract for Phase 1. The API Specification (S1-3.5, Sprint 1) documents the full function signatures. This section provides the architectural overview.

| **Function** | **Contract** |
| --- | --- |
| **createSession(sessionData)** | Inserts a new record into the sessions table. Parameters: { session\_id, property\_id, tier, tense\_frame: null, intent\_category: null, is\_complete: false }. Returns: { data, error }. Called on tier selection. Catches errors and calls Sentry.captureException() with context. Detects RLS rejection (HTTP 403/400) and does not retry. |
| **updateSession(sessionId, updates)** | Updates an existing session record. Used to set: tense\_frame (after Q0), intent\_category (after Q1), is\_complete: true (on completion), completed\_at. Returns: { data, error }. |
| **insertResponse(responseData)** | Inserts a new record into the responses table. Parameters: { session\_id, question\_id, answer\_code, tense\_frame, module\_number, property\_id }. Called on every question answer. Added to offline queue on network failure. |
| **insertScaleResponse(scaleData)** | Inserts a new record into scale\_responses. Parameters: { session\_id, question\_id, scale\_value, property\_id }. Called on scale question answers. |
| **insertNoneFlag(flagData)** | Inserts a record into none\_flags. Parameters: { session\_id, question\_id, property\_id }. Called when the 'None of these fit' option is selected. |
| **getDashboardData(propertyId)** | Reads aggregate data from all 4 tables for the management dashboard panels. Returns: { sessions, responses, scale\_responses, none\_flags }. Used only by dashboard overlay. In Phase 1, uses the anon key with a direct query — acceptable at pilot scale. |
| **getIncompleteSession(token)** | Reads a single session record by session\_id. Used by the disambiguation screen to verify an incomplete session exists in Supabase before offering resume. |

**WARN: getDashboardData() uses the anon key in Phase 1. The RLS policy allows the anon key to INSERT but not SELECT — so getDashboardData() will be blocked by RLS unless a specific dashboard read policy is added. In Phase 1, the management overlay reads data using the Supabase dashboard directly (or a special read policy is applied for the management route). Phase 2 replaces this with authenticated reads using the feature-flagged auth flow.**

## 7.4 Offline Queue Integration

The service layer integrates with the offline queue for write operations (insertResponse, insertScaleResponse, insertNoneFlag). When a Supabase write fails due to network unavailability, the response is added to an in-memory queue. The queue retries every 30 seconds. On reconnection, all queued responses are flushed in order. This is transparent to components — they call the service function, and the service handles queuing automatically.

## 7.5 Phase 2 Activation

Gap 6 requires no Phase 2 activation for the existing functions. Phase 2 adds new service functions as new features require new database operations. The service layer pattern ensures these additions are isolated — no component changes needed to support new backend capabilities.

# 8. Gap 7 — Dashboard Query Caching

**GAP 7 Dashboard Caching via Materialized Views [PROTOTYPE: direct queries acceptable — Phase 2: add materialized views]**

## 8.1 The Problem

The management dashboard reads data directly from Supabase on every panel load. Each of the 9 panels runs one or more SQL queries against the live data tables. For the Phase 1 pilot — approximately 10 respondents generating under 100 sessions — this is fast and acceptable. Direct queries complete in under 100ms at this scale.

For Phase 2 with 50+ respondents across multiple properties, or 500+ sessions accumulated over time, these direct queries become slow. The aggregate comparison charts and intent distribution charts aggregate over the entire sessions and responses tables — at scale, these queries can take several seconds. This degrades the dashboard experience at the moment hotel management is trying to make data-driven decisions.

## 8.2 Why Caching Is Not Implemented in Phase 1

Dashboard caching is the one gap that is explicitly not addressed in Phase 1. This is a deliberate design choice, not an oversight. The reasons are:

- At pilot scale (under 100 sessions), direct queries are fast. There is no user-visible problem to solve.
- Implementing materialized views and cache refresh logic adds Sprint 4 complexity that is not needed for the pilot.
- The data volume that would justify caching (500+ sessions) cannot be generated during a 2-week pilot with 10 respondents.
- The service layer pattern (Gap 6) means caching can be added entirely within getDashboardData() in Phase 2 — no component changes.

INFO: The Project Charter v2.1 explicitly lists 'Dashboard materialized views and caching' as out of scope for Phase 1 and Phase 2 story PH-08 in the Backlog. This is a known, accepted gap with a documented plan.

## 8.3 Phase 2 Implementation

Phase 2 implements caching via Supabase materialized views and Edge Functions:

| **Component** | **Specification** |
| --- | --- |
| **Materialized views** | SQL views in Supabase that pre-compute aggregate queries: session\_counts\_by\_tier, intent\_distribution\_by\_property, response\_frequencies\_by\_question. These views are refreshed on a schedule (e.g. every 5 minutes) by a Supabase scheduled function. |
| **Service layer update** | getDashboardData() is updated to read from materialized views instead of live tables. The change is entirely within the service file — no component changes. The function signature is unchanged. |
| **Cache invalidation** | On pilot close or property reset, a Supabase Edge Function manually refreshes all materialized views. The Lead Researcher can trigger this from the management overlay. |
| **Cost note** | Materialized views and Edge Functions require Supabase Pro tier ($25/month). This is a Phase 2 budget item, noted in the Charter v2.1 Phase 2 cost note. |

# 9. Sprint 4 Architecture Review Checklist

Sprint 4 step S4-2.6 in the MDT v5.0 requires a production-readiness architecture review before the pilot launches. This checklist is the authoritative acceptance criteria for that step. All items must pass before the Sprint 4 gate can be confirmed.

| **Gap** | **Verification Steps** |
| --- | --- |
| **Gap 1 — Auth Bypass** | Open src/config/features.js. Verify AUTH\_ENABLED is false. Open Supabase dashboard. Verify user\_id column exists in sessions table. Verify current value is null in all prototype sessions. Verify no login screen appears when opening the app. |
| **Gap 2 — Environment Config** | Open the project repository root. Verify .env file exists (locally) and is in .gitignore. Verify .env.example file is committed and contains all 6 variable names. Verify no raw API key or credential appears in any committed file. Run: git log --all | grep SUPABASE\_ANON\_KEY — result must be empty. |
| **Gap 3 — Feature Flags** | Open src/config/features.js. Verify three flags exist: AUTH\_ENABLED, MULTI\_PROPERTY, ADMIN\_ENABLED. Verify all three are false for the prototype. Verify no component contains import.meta.env — verified by code search. |
| **Gap 4 — Error Logging** | Open Sentry project dashboard. Verify at least one error has been captured with full context (not a generic error). Verify browser name, application version, and environment fields are populated. Verify no IP address fields appear. Deliberately trigger a test error — verify it appears within 60 seconds. |
| **Gap 5 — Schema Versioning** | Open the project repository. Verify supabase/migrations/ directory exists with at least 5 migration files. Open Supabase Table Editor — verify all 4 tables exist with correct column structure. Verify user\_id column is nullable UUID in sessions table. |
| **Gap 6 — Service Layer** | Run: grep -r 'supabase.from' src/components/ — result must be empty. Run: grep -r 'import.\*supabase' src/components/ — result must be empty. Verify all Supabase calls are in src/services/supabase.js only. |
| **Gap 7 — Caching (none required)** | Confirm direct queries to getDashboardData() complete in under 500ms with current session count. Log the query count: dashboard load should trigger fewer than 15 Supabase queries total across all 9 panels. Document current session count for Phase 2 caching threshold planning. |

# 10. Phase 2 Activation Playbook

This section is written for Phase 2 Sprint 0 planning. It documents the sequence of steps to transition GuestIQ from prototype to production configuration. Each step is independent and low-risk because the prototype architecture has already done the hard work.

| **Step** | **Action and Impact** |
| --- | --- |
| **Step 1 — Deploy to production Supabase project** | Create a new Supabase project for Phase 2 (separate from the prototype project). Run all 5 prototype migration files against the new project. Run new Phase 2 migration files (content table, properties table, updated RLS). Set VITE\_SUPABASE\_URL and VITE\_SUPABASE\_ANON\_KEY to the new project credentials. |
| **Step 2 — Activate authentication** | Build the login screen (email/password for Phase 2a, SSO for Phase 2b). Set VITE\_FEATURE\_AUTH\_ENABLED=true. The dashboard overlay now requires login. Session creation writes user\_id. RLS updated to allow authenticated reads. |
| **Step 3 — Activate multi-property architecture** | Onboard second property: create a property record, configure their URL with ?property=PROP002. Set VITE\_FEATURE\_MULTI\_PROPERTY=true. The dashboard property selector appears. All existing PROP001 data continues working — property\_id field was in every record from Sprint 2. |
| **Step 4 — Activate visual admin CMS** | Build the /admin route (Phase 2 sprint). Set VITE\_FEATURE\_ADMIN\_ENABLED=true. The admin navigation link appears in the management overlay. Seed the Supabase content table from the Phase 1b JSON files. |
| **Step 5 — Add dashboard caching** | Create Supabase materialized views. Set up scheduled refresh. Update getDashboardData() to read from views. No component changes required. |
| **Step 6 — Activate i18n translations** | Add French locale file (Phase 2 sprint). All text strings already flow through i18next from Phase 1 — translation is adding a locale file, not changing code. Set the locale selector feature flag to active. |

INFO: Each step in the Phase 2 activation playbook is independently deployable. There is no 'big bang' Phase 2 launch — features can be activated one at a time, tested independently, and rolled back by flipping a feature flag.

# 11. Version Log

| **Ver.** | **Date** | **By** | **Change** |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF PRODUCTION READINESS ARCHITECTURE DOCUMENT v1.0 —**

*GuestIQ · Production Readiness Architecture Document v1.0 · S0-3.7 · Sprint 0 Artifact · Confidential*