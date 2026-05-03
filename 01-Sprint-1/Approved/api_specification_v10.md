# api_specification_v10

*Document Type: DOCX*

## Table of Contents

  - [**API SPECIFICATION**](#api-specification)
    - [**GuestIQ**** — Service Layer Contracts for supabase.js and analytics.js**](#guestiq--service-layer-contracts-for-supabasejs-and-analyticsjs)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Supabase**** Functions**](#supabase-functions)
  - [**PostHog**** Events**](#posthog-events)
  - [**Sentry**](#sentry)
  - [**Review Checklist**](#review-checklist)
  - [**Document Location**](#document-location)
  - [**NFR References**](#nfr-references)
    - [**WARN****:  The**** service layer pattern is non-negotiable. No React component may ****import**** ****from @****supabase/supabase-js or ****posthog-js**** directly. The ****ESLint**** no-restricted-imports rule (S1-1.11) enforces this in code. This document is the architectural specification that the ****ESLint**** rule implements.**](#warn--the-service-layer-pattern-is-non-negotiable-no-react-component-may-import-from-supabasesupabase-js-or-posthog-js-directly-the-eslint-no-restricted-imports-rule-s1-111-enforces-this-in-code-this-document-is-the-architectural-specification-that-the-eslint-rule-implements)
  - [**1. Service Layer Architecture**](#1-service-layer-architecture)
  - [**File**](#file)
  - [**Imports From**](#imports-from)
  - [**Exports To**](#exports-to)
  - [**src****/services/supabase.js**](#srcservicessupabasejs)
  - [**src****/services/analytics.js**](#srcservicesanalyticsjs)
  - [**src****/****main.jsx**](#srcmainjsx)
  - [**1.1 File Skeleton — supabase.js**](#11-file-skeleton--supabasejs)
  - [**1.2 File Skeleton — analytics.js**](#12-file-skeleton--analyticsjs)
    - [**2. ****Supabase**** Service Layer — ****src****/services/supabase.js**](#2-supabase-service-layer--srcservicessupabasejs)
  - [**2.1 Error Handling Pattern — Applied to Every Function**](#21-error-handling-pattern--applied-to-every-function)
    - [**WARN****:  RLS**** rejections (****error.code**** 42501 / ****error.status**** 403) must NOT be added to the offline queue. An RLS rejection means the database policy denied the request — retrying will produce the same rejection. Log to Sentry and return the error. The Lead Researcher email alert fires automatically from Sentry within 60 seconds.**](#warn--rls-rejections-errorcode-42501--errorstatus-403-must-not-be-added-to-the-offline-queue-an-rls-rejection-means-the-database-policy-denied-the-request--retrying-will-produce-the-same-rejection-log-to-sentry-and-return-the-error-the-lead-researcher-email-alert-fires-automatically-from-sentry-within-60-seconds)
  - [**2.2 ****createSession**](#22-createsession)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**tier**](#tier)
  - [**required**](#required)
  - [**tense_frame**](#tense_frame)
  - [**required**](#required)
  - [**intent_category**](#intent_category)
  - [**required**](#required)
  - [**is_complete**](#is_complete)
  - [**required**](#required)
  - [**created_at**](#created_at)
  - [**auto**](#auto)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**tier**](#tier)
  - [**required**](#required)
  - [**tense_frame**](#tense_frame)
  - [**required**](#required)
  - [**intent_category**](#intent_category)
  - [**required**](#required)
  - [**is_complete**](#is_complete)
  - [**required**](#required)
  - [**created_at**](#created_at)
  - [**auto**](#auto)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**tier**](#tier)
  - [**required**](#required)
  - [**tense_frame**](#tense_frame)
  - [**required**](#required)
  - [**intent_category**](#intent_category)
  - [**required**](#required)
  - [**is_complete**](#is_complete)
  - [**required**](#required)
  - [**created_at**](#created_at)
  - [**auto**](#auto)
  - [**2.3 ****updateSession**](#23-updatesession)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**sessionId**](#sessionid)
  - [**required**](#required)
  - [**updates**](#updates)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**sessionId**](#sessionid)
  - [**required**](#required)
  - [**updates**](#updates)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**sessionId**](#sessionid)
  - [**required**](#required)
  - [**updates**](#updates)
  - [**required**](#required)
  - [**2.4 ****insertResponse**](#24-insertresponse)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**answer_code**](#answer_code)
  - [**required**](#required)
  - [**tense_frame**](#tense_frame)
  - [**required**](#required)
  - [**module_number**](#module_number)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**answer_code**](#answer_code)
  - [**required**](#required)
  - [**tense_frame**](#tense_frame)
  - [**required**](#required)
  - [**module_number**](#module_number)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**answer_code**](#answer_code)
  - [**required**](#required)
  - [**tense_frame**](#tense_frame)
  - [**required**](#required)
  - [**module_number**](#module_number)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**2.5 ****insertScaleResponse**](#25-insertscaleresponse)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**scale_value**](#scale_value)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**scale_value**](#scale_value)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**scale_value**](#scale_value)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**2.6 ****insertNoneFlag**](#26-insertnoneflag)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**required**](#required)
  - [**question_id**](#question_id)
  - [**required**](#required)
  - [**property_id**](#property_id)
  - [**required**](#required)
  - [**2.7 ****getDashboardData**](#27-getdashboarddata)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**propertyId**](#propertyid)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**propertyId**](#propertyid)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**propertyId**](#propertyid)
  - [**required**](#required)
  - [**2.8 ****getIncompleteSession**](#28-getincompletesession)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**token**](#token)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**token**](#token)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**token**](#token)
  - [**required**](#required)
  - [**2.9 ****updateEnrichment**](#29-updateenrichment)
  - [**Parameters**](#parameters)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**sessionId**](#sessionid)
  - [**required**](#required)
  - [**enrichmentData**](#enrichmentdata)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**sessionId**](#sessionid)
  - [**required**](#required)
  - [**enrichmentData**](#enrichmentdata)
  - [**required**](#required)
  - [**Param**](#param)
  - [**Required**](#required)
  - [**Type**](#type)
  - [**Description**](#description)
  - [**sessionId**](#sessionid)
  - [**required**](#required)
  - [**enrichmentData**](#enrichmentdata)
  - [**required**](#required)
  - [**3. Offline Queue — ****src****/services/offlineQueue.js**](#3-offline-queue--srcservicesofflinequeuejs)
  - [**4. Sentry Initialization and Error Capture**](#4-sentry-initialization-and-error-capture)
  - [**4.1 Initialization — ****src****/****main.jsx**](#41-initialization--srcmainjsx)
  - [**4.2 ****Sentry.captureException**** Contexts**](#42-sentrycaptureexception-contexts)
  - [**Call Site**](#call-site)
  - [**Type Tag**](#type-tag)
  - [**Context Captured**](#context-captured)
  - [**supabase.js catch blocks**](#supabasejs-catch-blocks)
  - [**SUPABASE_WRITE**](#supabase_write)
  - [**RLS rejection (403)**](#rls-rejection-403)
  - [**RLS_REJECTION**](#rls_rejection)
  - [**getDashboardData**** error**](#getdashboarddata-error)
  - [**DASHBOARD_READ**](#dashboard_read)
  - [**getIncompleteSession**** error**](#getincompletesession-error)
  - [**SESSION_LOOKUP**](#session_lookup)
  - [**ErrorBoundary**** (automatic)**](#errorboundary-automatic)
  - [**REACT_ERROR**](#react_error)
  - [**configValidator**** throw**](#configvalidator-throw)
  - [**CONFIG_ERROR**](#config_error)
    - [**5. ****PostHog**** Events — ****src****/services/analytics.js**](#5-posthog-events--srcservicesanalyticsjs)
  - [**5.1 Application Initialization and Entry**](#51-application-initialization-and-entry)
  - [**5.2 Questionnaire Flow**](#52-questionnaire-flow)
  - [**5.3 Session Management and Connectivity**](#53-session-management-and-connectivity)
  - [**5.4 Completion and Results**](#54-completion-and-results)
  - [**5.5 Management Dashboard**](#55-management-dashboard)
  - [**6. Environment Variables ****— .env**](#6-environment-variables--env)
    - [**WARN****:  VITE****_SUPABASE_ANON_KEY is the anon/public key — NOT the ****service_role**** key. The ****service_role**** key bypasses all RLS policies and would give any respondent full read/write access to all data. Never use the ****service_role**** key in browser code. The ****anon**** key has limited INSERT-only access per the RLS policies in migration 20240101000005.**](#warn--vite_supabase_anon_key-is-the-anonpublic-key--not-the-service_role-key-the-service_role-key-bypasses-all-rls-policies-and-would-give-any-respondent-full-readwrite-access-to-all-data-never-use-the-service_role-key-in-browser-code-the-anon-key-has-limited-insert-only-access-per-the-rls-policies-in-migration-20240101000005)
  - [**7. S1-3.6 Review Checklist**](#7-s1-36-review-checklist)
  - [**Check**](#check)
  - [**Verification**](#verification)
  - [**Check 1 — Service layer explicit**](#check-1--service-layer-explicit)
  - [**Check 2 — All 27 ****PostHog**** events present**](#check-2--all-27-posthog-events-present)
  - [**8. Version Log**](#8-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF API SPECIFICATION v1.0 —**](#-end-of-api-specification-v10-)

## **API SPECIFICATION**

### **GuestIQ**** — Service Layer Contracts for supabase.js and analytics.js**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Lead Researcher review (20 min)


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Supabase**** Functions****

8 functions in src/services/supabase.js


**## **PostHog**** Events****

27 canonical events in src/services/analytics.js


**## **Sentry****

Initialization and error capture patterns


**## **Review Checklist****

(1) Service layer pattern explicit — no direct SDK calls from components. (2) All 27 PostHog events present with correct names.


**## **Document Location****

01-Sprint-1 / AI-Outputs / API-Specification-v1.0.docx


**## **NFR References****

NFR-037 (service layer), NFR-039 (Sentry 100% coverage), NFR-040 (PostHog all 27 events)




### **WARN****:  The**** service layer pattern is non-negotiable. No React component may ****import**** ****from @****supabase/supabase-js or ****posthog-js**** directly. The ****ESLint**** no-restricted-imports rule (S1-1.11) enforces this in code. This document is the architectural specification that the ****ESLint**** rule implements.**

INFO:  This document specifies the developer contract for Sprint 2. The AI Developer implements all 8 Supabase functions and all 27 PostHog event functions in Sprint 2 step S2-2.2. The function signatures and parameter shapes defined here must be implemented exactly as specified.


## **1. Service Layer Architecture**

GuestIQ has a strict service layer — a forced interface between React components and all external SDKs. Two service files implement this layer. No other file in the codebase imports from Supabase, PostHog, or Sentry SDKs.



### ## **File**

**## **Imports From****: ## **Exports To**


### ## **src****/services/supabase.js**

**@supabase/supabase-js**: 8 named async functions: createSession, updateSession, insertResponse, insertScaleResponse, insertNoneFlag, getDashboardData, getIncompleteSession, updateEnrichment. Also exports the offline queue module.


### ## **src****/services/analytics.js**

**posthog-js**: 27 named functions, one per canonical PostHog event. Function names mirror event names: trackAppLoaded, trackTierSelected, etc. Each function takes a single props object and calls posthog.capture().


### ## **src****/****main.jsx**

**@sentry/react**: Sentry.init() call only. Sentry ErrorBoundary wraps React root. No Sentry imports elsewhere except supabase.js (captureException in catch blocks).





DEV:  Enforcement rule: grep -r 'supabase.from' src/components/ must return zero results. grep -r 'import.*posthog' src/components/ must return zero results. The ESLint pipeline runs this check automatically on every commit via no-restricted-imports rule. A component that bypasses the service layer is a build-failing error.


## **1.1 File Skeleton — supabase.js**

// src/services/supabase.js

// ONLY file that imports from @supabase/supabase-js

// All Supabase calls in the application go through this file


import { createClient } from '@supabase/supabase-js';

import * as Sentry from '@sentry/react';

import { offlineQueue } from './offlineQueue';


const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL;

const supabaseKey  = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);


// 8 exported async functions — see Section 2 for full specs

export async function createSession(sessionData) { ... }

export async function updateSession(sessionId, updates) { ... }

export async function insertResponse(responseData) { ... }

export async function insertScaleResponse(scaleData) { ... }

export async function insertNoneFlag(flagData) { ... }

export async function getDashboardData(propertyId) { ... }

export async function getIncompleteSession(token) { ... }

export async function updateEnrichment(sessionId, enrichmentData) { ... }


## **1.2 File Skeleton — analytics.js**

// src/services/analytics.js

// ONLY file that imports from posthog-js

// All PostHog event calls in the application go through this file


import posthog from 'posthog-js';


// 27 exported functions — one per canonical event

// Each takes a single props object, fires posthog.capture(eventName, props)

// Event names are exact: lowercase, underscore-separated


export const trackAppLoaded                    = (props) => posthog.capture('app_loaded', props);

export const trackWelcomeHookViewed            = (props) => posthog.capture('welcome_hook_viewed', props);

export const trackTierSelected                 = (props) => posthog.capture('tier_selected', props);

// ... all 27 functions — see Section 3 for complete list


### **2. ****Supabase**** Service Layer — ****src****/services/supabase.js**

Eight functions form the complete database interface for Phase 1. All writes use the anon key with INSERT RLS policy. Reads (getDashboardData, getIncompleteSession) use the aggregate SELECT policy. Every function wraps its Supabase call in try-catch and captures errors via Sentry.captureException.


## **2.1 Error Handling Pattern — Applied to Every Function**

// Standard error handling pattern — applied in every function body:

try {

const { data, error } = await supabase.from('table').insert(record);

if (error) {

// RLS rejection (403/400) — do NOT add to offline queue

if (error.code === '42501' || error.status === 403) {

Sentry.captureException(error, {

extra: { type: 'RLS_REJECTION', function: 'functionName', session_id: params.session_id }

});

return { success: false, error: 'RLS_REJECTION' };

}

throw error;  // network/timeout errors go to catch block → offline queue

}

return { success: true, data };

} catch (err) {

Sentry.captureException(err, { extra: { function: 'functionName', ...params } });

// Write operations: add to offline queue for retry

offlineQueue.add({ function: 'functionName', params });

return { success: false, queued: true };

}

### **WARN****:  RLS**** rejections (****error.code**** 42501 / ****error.status**** 403) must NOT be added to the offline queue. An RLS rejection means the database policy denied the request — retrying will produce the same rejection. Log to Sentry and return the error. The Lead Researcher email alert fires automatically from Sentry within 60 seconds.**


## **2.2 ****createSession**

| **createSession**  →  Sprint 2  createSession(sessionData): Promise<{ success: boolean, data?: object, error?: string }> |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **session_id**  ## **required**  UUID string  crypto.randomUUID() generated by application before call. Never null. This is the localStorage token value.  ## **property_id**  ## **required**  string  From URL query parameter ?property=. Defaults to 'PROP001' if absent.  ## **tier**  ## **required**  string  'amateur' | 'professional' | 'expert'. Selected by respondent on welcome screen.  ## **tense_frame**  ## **required**  null  Always null at creation. Set via updateSession() after Q0 is answered.  ## **intent_category**  ## **required**  null  Always null at creation. Set via updateSession() after Q1 is answered.  ## **is_complete**  ## **required**  boolean  Always false at creation.  ## **created_at**  ## **auto**  TIMESTAMPTZ  Set by Supabase DEFAULT now(). Not passed by application. | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **session_id** | ## **required** | UUID string | crypto.randomUUID() generated by application before call. Never null. This is the localStorage token value. | ## **property_id** | ## **required** | string | From URL query parameter ?property=. Defaults to 'PROP001' if absent. | ## **tier** | ## **required** | string | 'amateur' | 'professional' | 'expert'. Selected by respondent on welcome screen. | ## **tense_frame** | ## **required** | null | Always null at creation. Set via updateSession() after Q0 is answered. | ## **intent_category** | ## **required** | null | Always null at creation. Set via updateSession() after Q1 is answered. | ## **is_complete** | ## **required** | boolean | Always false at creation. | ## **created_at** | ## **auto** | TIMESTAMPTZ | Set by Supabase DEFAULT now(). Not passed by application. |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **session_id** | ## **required** | UUID string | crypto.randomUUID() generated by application before call. Never null. This is the localStorage token value. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **property_id** | ## **required** | string | From URL query parameter ?property=. Defaults to 'PROP001' if absent. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **tier** | ## **required** | string | 'amateur' | 'professional' | 'expert'. Selected by respondent on welcome screen. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **tense_frame** | ## **required** | null | Always null at creation. Set via updateSession() after Q0 is answered. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **intent_category** | ## **required** | null | Always null at creation. Set via updateSession() after Q1 is answered. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **is_complete** | ## **required** | boolean | Always false at creation. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **created_at** | ## **auto** | TIMESTAMPTZ | Set by Supabase DEFAULT now(). Not passed by application. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| **Returns: ** { success: true, data: createdSessionRecord } on success. { success: false, error: 'RLS_REJECTION' } on 403. { success: false, queued: true } on network error — session creation added to offline queue.  **Errors: **RLS rejection → Sentry + return error (not queued). Network error → Sentry + offline queue. Note: if session creation is queued, the localStorage token is still written — the session will be created when connectivity restores.  **Called from: **useSession hook, immediately after respondent clicks 'Start as [Tier]'. Fires createSession() then writes session_id to localStorage['guestiq_session_token']. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |




## **2.3 ****updateSession**

| **updateSession**  →  Sprint 2  updateSession(sessionId, updates): Promise<{ success: boolean }> |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **sessionId**  ## **required**  UUID string  The session_id of the session to update. From application state.  ## **updates**  ## **required**  object  Partial session fields to update. Valid keys: tense_frame (string), intent_category (string), tier (string — on upgrade), is_complete (boolean), completed_at (TIMESTAMPTZ string). | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **sessionId** | ## **required** | UUID string | The session_id of the session to update. From application state. | ## **updates** | ## **required** | object | Partial session fields to update. Valid keys: tense_frame (string), intent_category (string), tier (string — on upgrade), is_complete (boolean), completed_at (TIMESTAMPTZ string). |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |  |  |  |  |
| ## **sessionId** | ## **required** | UUID string | The session_id of the session to update. From application state. |  |  |  |  |  |  |  |  |  |
| ## **updates** | ## **required** | object | Partial session fields to update. Valid keys: tense_frame (string), intent_category (string), tier (string — on upgrade), is_complete (boolean), completed_at (TIMESTAMPTZ string). |  |  |  |  |  |  |  |  |  |
| **Returns: ** { success: true } on success. { success: false, queued: true } on network error.  **Errors: **Network error → Sentry + offline queue. RLS rejection for UPDATE is unlikely (anon UPDATE policy is permissive) but handled with Sentry capture.  **Called from: **Called at: (1) Q0 answered → updateSession(sessionId, { tense_frame }). (2) Q1 answered → updateSession(sessionId, { intent_category }). (3) Tier upgrade accepted → updateSession(sessionId, { tier }). (4) Session complete → updateSession(sessionId, { is_complete: true, completed_at: new Date().toISOString() }). |  |  |  |  |  |  |  |  |  |  |  |  |




## **2.4 ****insertResponse**

| **insertResponse**  →  Sprint 2  insertResponse(responseData): Promise<{ success: boolean }> |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **session_id**  ## **required**  UUID string  Current session ID from application state.  ## **question_id**  ## **required**  string  Question identifier: 'QR1' for Q0, 'Q1'–'Q79' for instrument questions.  ## **answer_code**  ## **required**  string  Selected option code ('A'–'M') or 'NONE' for the none-option selection.  ## **tense_frame**  ## **required**  string  'retrospective' | 'anticipatory'. Current session tense_frame from state.  ## **module_number**  ## **required**  integer  Module number 0–7. Q0 is module 0.  ## **property_id**  ## **required**  string  From session state. Same as sessions.property_id. | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **session_id** | ## **required** | UUID string | Current session ID from application state. | ## **question_id** | ## **required** | string | Question identifier: 'QR1' for Q0, 'Q1'–'Q79' for instrument questions. | ## **answer_code** | ## **required** | string | Selected option code ('A'–'M') or 'NONE' for the none-option selection. | ## **tense_frame** | ## **required** | string | 'retrospective' | 'anticipatory'. Current session tense_frame from state. | ## **module_number** | ## **required** | integer | Module number 0–7. Q0 is module 0. | ## **property_id** | ## **required** | string | From session state. Same as sessions.property_id. |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **session_id** | ## **required** | UUID string | Current session ID from application state. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **question_id** | ## **required** | string | Question identifier: 'QR1' for Q0, 'Q1'–'Q79' for instrument questions. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **answer_code** | ## **required** | string | Selected option code ('A'–'M') or 'NONE' for the none-option selection. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **tense_frame** | ## **required** | string | 'retrospective' | 'anticipatory'. Current session tense_frame from state. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **module_number** | ## **required** | integer | Module number 0–7. Q0 is module 0. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **property_id** | ## **required** | string | From session state. Same as sessions.property_id. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| **Returns: ** { success: true } on success. { success: false, queued: true } on network error.  **Errors: **Network error → Sentry + offline queue. This is the highest-frequency write — called on every option selection. Offline queue must handle bursts of 3–5 insertResponse calls for multi_select questions.  **Called from: **Question component, on every answer option selection. For multi_select: one insertResponse() call per selected option. For single_select: one call per question answer. For scale_5: use insertScaleResponse() instead. Fires before advancing to next question. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |




## **2.5 ****insertScaleResponse**

| **insertScaleResponse**  →  Sprint 2  insertScaleResponse(scaleData): Promise<{ success: boolean }> |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **session_id**  ## **required**  UUID string  Current session ID.  ## **question_id**  ## **required**  string  Scale question identifier (e.g. 'Q12', 'Q15').  ## **scale_value**  ## **required**  integer  Integer 1–5. Application validates: only 1–5 accepted. Do not pass the option text — pass the numeric code.  ## **property_id**  ## **required**  string  From session state. | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **session_id** | ## **required** | UUID string | Current session ID. | ## **question_id** | ## **required** | string | Scale question identifier (e.g. 'Q12', 'Q15'). | ## **scale_value** | ## **required** | integer | Integer 1–5. Application validates: only 1–5 accepted. Do not pass the option text — pass the numeric code. | ## **property_id** | ## **required** | string | From session state. |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **session_id** | ## **required** | UUID string | Current session ID. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **question_id** | ## **required** | string | Scale question identifier (e.g. 'Q12', 'Q15'). |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **scale_value** | ## **required** | integer | Integer 1–5. Application validates: only 1–5 accepted. Do not pass the option text — pass the numeric code. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **property_id** | ## **required** | string | From session state. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| **Returns: ** { success: true } on success. { success: false, queued: true } on network error.  **Errors: **Network error → Sentry + offline queue. Writes to scale_responses table, NOT responses table.  **Called from: **Question component, when a scale_5 type question is answered. Mutually exclusive with insertResponse — the same answer action calls exactly one of these two functions, never both. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |




## **2.6 ****insertNoneFlag**

| **insertNoneFlag**  →  Sprint 2  insertNoneFlag(flagData): Promise<{ success: boolean }> |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **session_id**  ## **required**  UUID string  Current session ID.  ## **question_id**  ## **required**  string  Question on which the none-option was selected.  ## **property_id**  ## **required**  string  From session state. | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **session_id** | ## **required** | UUID string | Current session ID. | ## **question_id** | ## **required** | string | Question on which the none-option was selected. | ## **property_id** | ## **required** | string | From session state. |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **session_id** | ## **required** | UUID string | Current session ID. |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **question_id** | ## **required** | string | Question on which the none-option was selected. |  |  |  |  |  |  |  |  |  |  |  |  |  |
| ## **property_id** | ## **required** | string | From session state. |  |  |  |  |  |  |  |  |  |  |  |  |  |
| **Returns: ** { success: true } on success. { success: false, queued: true } on network error.  **Errors: **Network error → Sentry + offline queue.  **Called from: **Called in ADDITION to insertResponse() when the none-option is selected. Both calls fire for none-option selections: insertResponse() (with answer_code='NONE') AND insertNoneFlag(). The none_flags table enables direct none-flag rate analysis without filtering the responses table. |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |




## **2.7 ****getDashboardData**

| **getDashboardData**  →  Sprint 4  getDashboardData(propertyId): Promise<{ success: boolean, data?: DashboardData }> |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **propertyId**  ## **required**  string  The property_id to filter all queries by. In Phase 1: always 'PROP001'. | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **propertyId** | ## **required** | string | The property_id to filter all queries by. In Phase 1: always 'PROP001'. |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |
| ## **propertyId** | ## **required** | string | The property_id to filter all queries by. In Phase 1: always 'PROP001'. |  |  |  |  |  |
| **Returns: ** { success: true, data: { sessions: [], responses: [], scaleResponses: [], noneFlags: [] } } — all records for the property. Returns empty arrays if no data. { success: false } on any error.  **Errors: **Network error or query error → Sentry capture. Returns { success: false }. Dashboard overlay displays error state. No offline queue (read operation).  **Called from: **DashboardOverlay component, on initial render of overlay and on manual refresh button click. All 9 dashboard panel components receive slices of the returned data object as props. |  |  |  |  |  |  |  |  |



INFO:  getDashboardData() uses the anon key with the aggregate SELECT RLS policy from migration 20240101000005. In Phase 1 this is acceptable (internal 10-person pilot). In Phase 2 this policy is replaced with an authenticated-user policy that restricts reads to the user's own property.


## **2.8 ****getIncompleteSession**

| **getIncompleteSession**  →  Sprint 2  getIncompleteSession(token): Promise<{ success: boolean, session?: SessionRecord }> |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **token**  ## **required**  UUID string  The session_id read from localStorage['guestiq_session_token']. | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **token** | ## **required** | UUID string | The session_id read from localStorage['guestiq_session_token']. |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |
| ## **token** | ## **required** | UUID string | The session_id read from localStorage['guestiq_session_token']. |  |  |  |  |  |
| **Returns: ** { success: true, session: sessionRecord } if an incomplete session (is_complete=false) exists matching the token. { success: true, session: null } if no match or session is already complete. { success: false } on error.  **Errors: **Network error → Sentry capture. Returns { success: false } — application treats failed lookup as 'no session found' and shows welcome screen.  **Called from: **App initialization, before any screen renders. Called by the session management logic in main.jsx or useSession hook. Result determines whether disambiguation screen or welcome screen is shown. |  |  |  |  |  |  |  |  |




## **2.9 ****updateEnrichment**

| **updateEnrichment**  →  Sprint 3  updateEnrichment(sessionId, enrichmentData): Promise<{ success: boolean }> |  |  |  |  |  |  |  |  |  |  |  |  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **Parameters**  ## **Param**  ## **Required**  ## **Type**  ## **Description**  ## **sessionId**  ## **required**  UUID string  The session_id of the completed session.  ## **enrichmentData**  ## **required**  object  Fields: credentials_years (string | null), credentials_interactions (string | null), credentials_shift (string | null). Any field may be null if respondent skipped that field. | ## **Param** | ## **Required** | ## **Type** | ## **Description** | ## **sessionId** | ## **required** | UUID string | The session_id of the completed session. | ## **enrichmentData** | ## **required** | object | Fields: credentials_years (string | null), credentials_interactions (string | null), credentials_shift (string | null). Any field may be null if respondent skipped that field. |
| ## **Param** | ## **Required** | ## **Type** | ## **Description** |  |  |  |  |  |  |  |  |  |
| ## **sessionId** | ## **required** | UUID string | The session_id of the completed session. |  |  |  |  |  |  |  |  |  |
| ## **enrichmentData** | ## **required** | object | Fields: credentials_years (string | null), credentials_interactions (string | null), credentials_shift (string | null). Any field may be null if respondent skipped that field. |  |  |  |  |  |  |  |  |  |
| **Returns: ** { success: true } on success. { success: false, queued: true } on network error.  **Errors: **Network error → Sentry + offline queue. This is low-stakes — session is already complete. Loss of enrichment data is acceptable but avoid silently discarding it.  **Called from: **Post-completion enrichment screen, on Submit button click. NOT called on Skip — skip fires the PostHog credentials_enrichment_completed event but makes no Supabase write. New in v2.0 (credentials moved to post-completion). |  |  |  |  |  |  |  |  |  |  |  |  |




## **3. Offline Queue — ****src****/services/offlineQueue.js**

The offline queue is a separate module imported by supabase.js. It holds failed writes in memory and retries them every 30 seconds. The queue activates on the first failed write. After 60 consecutive seconds of failure, the downtime screen is shown.


// src/services/offlineQueue.js

// In-memory queue — data is NOT persisted to localStorage

// Queue is lost if browser is closed while offline


const queue = [];

let retryInterval = null;

let offlineStartTime = null;


export const offlineQueue = {

add(item) {

queue.push(item);

if (!retryInterval) {

offlineStartTime = Date.now();

// Fire PH event: offline_queue_activated

trackOfflineQueueActivated({ ... });

retryInterval = setInterval(offlineQueue.flush, 30_000);

}

},


async flush() {

if (queue.length === 0) { offlineQueue.clear(); return; }

// Check connectivity first

const canReach = await offlineQueue.checkConnectivity();

if (!canReach) {

// If >60s since offline started: show downtime screen

if (Date.now() - offlineStartTime > 60_000) {

// Emit downtime event for UI to catch

}

return;

}

// Replay all queued calls in order

const pending = [...queue];

queue.length = 0;

for (const item of pending) {

// Call the original service function by name

await serviceFunctions[item.function](item.params);

}

// Fire PH event: offline_queue_flushed

trackOfflineQueueFlushed({ responses_queued: pending.length, ... });

offlineQueue.clear();

},


clear() {

clearInterval(retryInterval);

retryInterval = null;

offlineStartTime = null;

},


async checkConnectivity() {

try {

await supabase.from('sessions').select('session_id').limit(1);

return true;

} catch { return false; }

}

};


## **4. Sentry Initialization and Error Capture**

## **4.1 Initialization — ****src****/****main.jsx**

Sentry must initialize before any React rendering begins — the first import in main.jsx. This ensures all JavaScript errors, including those in the React tree, are captured.


// src/main.jsx — initialization order is mandatory


// Step 1: Sentry FIRST — before React, before PostHog

import * as Sentry from '@sentry/react';

Sentry.init({

dsn: import.meta.env.VITE_SENTRY_DSN,

environment: import.meta.env.VITE_APP_ENV ?? 'development',

release: import.meta.env.VITE_APP_VERSION,

tracesSampleRate: 1.0,   // 100% — all transactions traced in Phase 1

sendDefaultPii: false,   // No IP addresses, no user identifiers

// Integrations:

integrations: [

Sentry.browserTracingIntegration(),

Sentry.replayIntegration({

maskAllInputs: true,   // No response text captured in replays

blockAllMedia: false,

}),

],

});


// Step 2: configValidator — BEFORE React renders

import { configValidator } from './config/configValidator';

// In Phase 1a: configValidator is a no-op (questionnaire.js always valid)

// In Phase 1b: configValidator throws on malformed JSON files


// Step 3: PostHog

import posthog from 'posthog-js';

posthog.init(import.meta.env.VITE_POSTHOG_KEY, {

api_host: 'https://app.posthog.com',

autocapture: false,       // Only 27 canonical events — no auto-capture

capture_pageview: false,  // Managed manually

ip: false,                // IP anonymization enabled

person_profiles: 'never', // No person profiles in Phase 1

session_recording: { maskAllInputs: true },

});


// Step 4: React

import React from 'react';

import ReactDOM from 'react-dom/client';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

<Sentry.ErrorBoundary fallback={<ErrorFallbackScreen />}>

<App />

</Sentry.ErrorBoundary>

);


## **4.2 ****Sentry.captureException**** Contexts**


### ## **Call Site**

**## **Type Tag****: ## **Context Captured**


### ## **supabase.js catch blocks**

**## **SUPABASE_WRITE****: { type: 'SUPABASE_WRITE', function: fnName, session_id, question_id (if applicable), property_id }


### ## **RLS rejection (403)**

**## **RLS_REJECTION****: { type: 'RLS_REJECTION', function: fnName, session_id, error.code, error.message }


### ## **getDashboardData**** error**

**## **DASHBOARD_READ****: { type: 'DASHBOARD_READ', property_id, error.message }


### ## **getIncompleteSession**** error**

**## **SESSION_LOOKUP****: { type: 'SESSION_LOOKUP', token_truncated: token.slice(0,8), error.message }


### ## **ErrorBoundary**** (automatic)**

**## **REACT_ERROR****: Automatic via Sentry.ErrorBoundary — component stack, error message, URL


### ## **configValidator**** throw**

**## **CONFIG_ERROR****: { type: 'CONFIG_ERROR', file: filename, parse_error: error.message }. No PostHog (not yet initialized).





### **5. ****PostHog**** Events — ****src****/services/analytics.js**

All 27 canonical PostHog events are implemented as named export functions. Each function takes a single props object and calls posthog.capture(). Event names are exact — case-sensitive, underscore-separated, lowercase.

DEV:  Function naming convention: event name app_loaded → export function trackAppLoaded. Prepend 'track' and camelCase the event name. This makes autocomplete in components unambiguous — all analytics calls start with 'track'.


## **5.1 Application Initialization and Entry**

| **1.  ****app_****loaded**  →  Sprint 2  export const trackAppLoaded = (props) => posthog.capture('app_loaded', props);  Trigger: Application renders for the first time (before disambiguation check)  Properties: device_type: 'desktop'|'mobile', browser_name: string, property_id: string |
| --- |




| **2****.  ****welcome****_hook_****viewed**  →  Sprint 2  export const trackWelcomeHookViewed = (props) => posthog.capture('welcome_hook_viewed', props);  Trigger: Welcome+tier screen renders  Properties: property_id: string |
| --- |




| **3****.  ****tier****_****selected**  →  Sprint 2  export const trackTierSelected = (props) => posthog.capture('tier_selected', props);  Trigger: Respondent clicks a tier CTA button  Properties: tier: 'amateur'|'professional'|'expert', property_id: string |
| --- |




| **4****.  ****credentials****_enrichment_****completed**  →  Sprint 3  export const trackCredentialsEnrichmentCompleted = (props) => posthog.capture('credentials_enrichment_completed', props);  Trigger: Enrichment screen dismissed — answered or skipped  Properties: fields_answered: number (0–3), years_band: string|null, interactions_band: string|null, shift: string|null, property_id: string |
| --- |




| **5****.  ****routing****_gate_****answered**  →  Sprint 2  export const trackRoutingGateAnswered = (props) => posthog.capture('routing_gate_answered', props);  Trigger: Q0 (QR1) answered  Properties: tense_frame: 'retrospective'|'anticipatory', answer_option: 'A'|'B'|'C'|'D', property_id: string |
| --- |




## **5.2 Questionnaire Flow**

| **6.  ****episode_****started**  →  Sprint 2  export const trackEpisodeStarted = (props) => posthog.capture('episode_started', props);  Trigger: First question of an episode renders  Properties: episode_number: number (1–7), episode_name: string, tier: string, property_id: string |
| --- |




| **7****.  ****question****_****answered**  →  Sprint 2  export const trackQuestionAnswered = (props) => posthog.capture('question_answered', props);  Trigger: Any question answered — any option including none  Properties: question_id: string, answer_code: string, module_number: number, tier: string, tense_frame: string, property_id: string |
| --- |




| **8.  ****none_flag_****selected**  →  Sprint 2  export const trackNoneFlagSelected = (props) => posthog.capture('none_flag_selected', props);  Trigger: None-of-these option selected on any question  Properties: question_id: string, module_number: number, tier: string, property_id: string |
| --- |



INFO:  Event 8 fires IN ADDITION TO event 7 (question_answered). Both fire when the none option is selected. Event 8 is the dedicated none-flag signal for dashboard Panel 8 analysis.


| **9.  ****episode_****completed**  →  Sprint 2  export const trackEpisodeCompleted = (props) => posthog.capture('episode_completed', props);  Trigger: Last question of an episode is answered  Properties: episode_number: number, episode_name: string, time_in_episode_seconds: number, tier: string, property_id: string |
| --- |




| **10****.  ****curiosity****_hook_****viewed**  →  Sprint 3  export const trackCuriosityHookViewed = (props) => posthog.capture('curiosity_hook_viewed', props);  Trigger: Curiosity hook screen renders  Properties: episode_number: number, tier: string, property_id: string |
| --- |




| **11****.  ****tier****_upgrade_****prompted**  →  Sprint 3  export const trackTierUpgradePrompted = (props) => posthog.capture('tier_upgrade_prompted', props);  Trigger: Tier upgrade prompt shown  Properties: current_tier: string, target_tier: string, property_id: string |
| --- |




| **12.  ****tier_upgrade_****accepted**  →  Sprint 3  export const trackTierUpgradeAccepted = (props) => posthog.capture('tier_upgrade_accepted', props);  Trigger: Respondent accepts upgrade  Properties: from_tier: string, to_tier: string, question_number_at_upgrade: number, property_id: string |
| --- |




| **13****.  ****tier****_upgrade_****declined**  →  Sprint 3  export const trackTierUpgradeDeclined = (props) => posthog.capture('tier_upgrade_declined', props);  Trigger: Respondent declines upgrade  Properties: from_tier: string, target_tier: string, property_id: string |
| --- |




| **14.  ****purpose_****expert**  →  Sprint 3  export const trackPurposeExpert = (props) => posthog.capture('purpose_expert', props);  Trigger: Secondary purpose triggers second Module 5 sub-section  Properties: primary_intent_category: string, secondary_intent_category: string, primary_section: string, secondary_section: string, property_id: string |
| --- |




## **5.3 Session Management and Connectivity**

| **15****.  ****session****_****paused**  →  Sprint 2  export const trackSessionPaused = (props) => posthog.capture('session_paused', props);  Trigger: Browser closes with incomplete session (beforeunload)  Properties: question_number_at_pause: number, episode_number: number, tier: string, property_id: string |
| --- |



INFO:  Event 15 fires in the window.beforeunload handler. PostHog sends it as a beacon (navigator.sendBeacon). Not 100% guaranteed to be received — browser may close before delivery. This is expected and acceptable.


| **16****.  ****disambiguation****_****shown**  →  Sprint 2  export const trackDisambiguationShown = (props) => posthog.capture('disambiguation_shown', props);  Trigger: Disambiguation screen renders (incomplete token found)  Properties: property_id: string |
| --- |




| **17.  ****disambiguation_****resumed**  →  Sprint 2  export const trackDisambiguationResumed = (props) => posthog.capture('disambiguation_resumed', props);  Trigger: Respondent selects Resume  Properties: question_number_resumed_from: number, property_id: string |
| --- |




| **18.  ****disambiguation_new_****session**  →  Sprint 2  export const trackDisambiguationNewSession = (props) => posthog.capture('disambiguation_new_session', props);  Trigger: Respondent selects Start Fresh  Properties: property_id: string |
| --- |




| **19.  ****offline_queue_****activated**  →  Sprint 2  export const trackOfflineQueueActivated = (props) => posthog.capture('offline_queue_activated', props);  Trigger: First Supabase write fails — queue starts  Properties: question_number: number, episode_number: number, property_id: string |
| --- |




| **20.  ****offline_queue_****flushed**  →  Sprint 2  export const trackOfflineQueueFlushed = (props) => posthog.capture('offline_queue_flushed', props);  Trigger: All queued writes sent successfully  Properties: responses_queued: number, property_id: string |
| --- |




## **5.4 Completion and Results**

| **21.  ****session_****completed**  →  Sprint 3  export const trackSessionCompleted = (props) => posthog.capture('session_completed', props);  Trigger: All questions for tier answered  Properties: tier: string, total_time_seconds: number, episode_count_completed: number, intent_category: string, tense_frame: string, property_id: string |
| --- |




| **22****.  ****results****_****viewed**  →  Sprint 3  export const trackResultsViewed = (props) => posthog.capture('results_viewed', props);  Trigger: Completion results screen renders  Properties: tier: string, intent_category: string, property_id: string |
| --- |




| **23.  ****aggregate_comparison_****viewed**  →  Sprint 3  export const trackAggregateComparisonViewed = (props) => posthog.capture('aggregate_comparison_viewed', props);  Trigger: Aggregate comparison chart renders (3+ sessions exist)  Properties: responses_in_aggregate: number, property_id: string |
| --- |




## **5.5 Management Dashboard**

| **24****.  ****dashboard****_****opened**  →  Sprint 4  export const trackDashboardOpened = (props) => posthog.capture('dashboard_opened', props);  Trigger: SHIFT+CTRL+A overlay opens  Properties: property_id: string |
| --- |




| **25.  ****dashboard_panel_****viewed**  →  Sprint 4  export const trackDashboardPanelViewed = (props) => posthog.capture('dashboard_panel_viewed', props);  Trigger: Dashboard panel tab clicked  Properties: panel_name: string ('overview'|'intent'|'planning'|'priorities'|'competitive'|'service'|'value'|'flags'|'raw'), property_id: string |
| --- |




| **26.  ****dashboard_exported_****csv**  →  Sprint 4  export const trackDashboardExportedCsv = (props) => posthog.capture('dashboard_exported_csv', props);  Trigger: CSV export triggered  Properties: response_count: number, property_id: string |
| --- |




| **27.  ****dashboard_exported_****pdf**  →  Sprint 4  export const trackDashboardExportedPdf = (props) => posthog.capture('dashboard_exported_pdf', props);  Trigger: PDF export triggered  Properties: response_count: number, property_id: string |
| --- |




## **6. Environment Variables ****— .env**

All credentials are stored in a .env file at the project root. This file is listed in .gitignore and never committed to the repository. The GitHub Actions workflow injects environment variables from GitHub Secrets at build time.


# .env — GuestIQ Phase 1 Prototype

# DO NOT COMMIT THIS FILE — listed in .gitignore


# Supabase

VITE_SUPABASE_URL=https://[your-project-ref].supabase.co

VITE_SUPABASE_ANON_KEY=eyJ...  # anon/public key ONLY — NOT service_role key


# Sentry

VITE_SENTRY_DSN=https://[key]@[org].ingest.sentry.io/[project-id]


# PostHog

VITE_POSTHOG_KEY=phc_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx


# Application

VITE_APP_ENV=pilot          # 'development' | 'pilot' | 'production'

VITE_APP_VERSION=1.0.0      # Used in Sentry release tracking


# Feature flags (Phase 1 values — all false)

VITE_FEATURE_AUTH_ENABLED=false

VITE_FEATURE_MULTI_PROPERTY=false

VITE_FEATURE_ADMIN_ENABLED=false

### **WARN****:  VITE****_SUPABASE_ANON_KEY is the anon/public key — NOT the ****service_role**** key. The ****service_role**** key bypasses all RLS policies and would give any respondent full read/write access to all data. Never use the ****service_role**** key in browser code. The ****anon**** key has limited INSERT-only access per the RLS policies in migration 20240101000005.**


## **7. S1-3.6 Review Checklist**

**## **Check 1 — Service layer explicit****

Section 1: verify src/services/supabase.js is the ONLY file that imports @supabase/supabase-js. Verify src/services/analytics.js is the ONLY file that imports posthog-js. Verify Sentry is only imported in src/main.jsx and src/services/supabase.js. The grep verification commands in the devBox below Section 1 confirm this at runtime.


**## **Check 2 — All 27 ****PostHog**** events present****

Section 5: count the event specifications. Events 1–27 must all be present. Verify the event names are exact: app_loaded, welcome_hook_viewed, tier_selected, credentials_enrichment_completed, routing_gate_answered, episode_started, question_answered, none_flag_selected, episode_completed, curiosity_hook_viewed, tier_upgrade_prompted, tier_upgrade_accepted, tier_upgrade_declined, purpose_expert, session_paused, disambiguation_shown, disambiguation_resumed, disambiguation_new_session, offline_queue_activated, offline_queue_flushed, session_completed, results_viewed, aggregate_comparison_viewed, dashboard_opened, dashboard_panel_viewed, dashboard_exported_csv, dashboard_exported_pdf.




## **8. Version Log**

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF API SPECIFICATION v1.0 —**

*GuestIQ**  ·**  API Specification **v1.0  ·**  S1-3.**5  ·**  S1-**11  ·**  Sprint 1 **Artifact  ·**  Confidential*

