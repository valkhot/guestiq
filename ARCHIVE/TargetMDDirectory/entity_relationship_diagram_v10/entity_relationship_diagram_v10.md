# entity_relationship_diagram_v10

*Document Type: DOCX*

## Table of Contents

  - [**ENTITY RELATIONSHIP DIAGRAM**](#entity-relationship-diagram)
    - [**GuestIQ**** — Hotel Guest Expectations Research Application**](#guestiq--hotel-guest-expectations-research-application)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Tables**](#tables)
  - [**Migration Files**](#migration-files)
  - [**Review Checklist**](#review-checklist)
  - [**Document Location**](#document-location)
  - [**Downstream Use**](#downstream-use)
  - [**Related Documents**](#related-documents)
    - [**WARN****:  The**** sessions table contains a ****user_id**** field that is NULLABLE and always NULL in Phase 1. This field is the authentication bridge to Phase 2 — it must be present from Sprint 2 even though it is never populated in the prototype. The review checklist (S1-1.8) explicitly verifies this field ****is**** present.**](#warn--the-sessions-table-contains-a-user_id-field-that-is-nullable-and-always-null-in-phase-1-this-field-is-the-authentication-bridge-to-phase-2--it-must-be-present-from-sprint-2-even-though-it-is-never-populated-in-the-prototype-the-review-checklist-s1-18-explicitly-verifies-this-field-is-present)
- [1. ERD Notation and Field Constraint Legend](#1-erd-notation-and-field-constraint-legend)
  - [**PK — Primary Key**](#pk--primary-key)
  - [**FK — Foreign Key**](#fk--foreign-key)
  - [**NOT NULL**](#not-null)
  - [**NULLABLE**](#nullable)
  - [**Phase 2 field**](#phase-2-field)
  - [**Phase 1 field**](#phase-1-field)
- [2. Table: sessions](#2-table-sessions)
  - [**Field Name**](#field-name)
  - [**Type**](#type)
  - [**Constraint**](#constraint)
  - [**Phase**](#phase)
  - [**Description**](#description)
  - [**session_id**](#session_id)
  - [**PK · NOT NULL**](#pk--not-null)
  - [**property_id**](#property_id)
  - [**NOT NULL**](#not-null)
  - [**tier**](#tier)
  - [**NOT NULL**](#not-null)
  - [**tense_frame**](#tense_frame)
  - [**NULLABLE**](#nullable)
  - [**intent_category**](#intent_category)
  - [**NULLABLE**](#nullable)
  - [**is_complete**](#is_complete)
  - [**NOT NULL**](#not-null)
  - [**created_at**](#created_at)
  - [**NOT NULL · DEFAULT ****now(****)**](#not-null--default-now)
  - [**completed_at**](#completed_at)
  - [**NULLABLE**](#nullable)
  - [**credentials_years**](#credentials_years)
  - [**NULLABLE**](#nullable)
  - [**credentials_interactions**](#credentials_interactions)
  - [**NULLABLE**](#nullable)
  - [**credentials_shift**](#credentials_shift)
  - [**NULLABLE**](#nullable)
  - [**user_id**](#user_id)
  - [**NULLABLE**](#nullable)
- [3. Table: responses](#3-table-responses)
  - [**Field Name**](#field-name)
  - [**Type**](#type)
  - [**Constraint**](#constraint)
  - [**Phase**](#phase)
  - [**Description**](#description)
  - [**response_id**](#response_id)
  - [**PK · NOT NULL**](#pk--not-null)
  - [**session_id**](#session_id)
  - [**FK → sessions · NOT NULL**](#fk--sessions--not-null)
  - [**question_id**](#question_id)
  - [**NOT NULL**](#not-null)
  - [**answer_code**](#answer_code)
  - [**NOT NULL**](#not-null)
  - [**tense_frame**](#tense_frame)
  - [**NOT NULL**](#not-null)
  - [**module_number**](#module_number)
  - [**NOT NULL**](#not-null)
  - [**property_id**](#property_id)
  - [**NOT NULL**](#not-null)
  - [**created_at**](#created_at)
  - [**NOT NULL · DEFAULT ****now(****)**](#not-null--default-now)
- [4. Table: scale_responses](#4-table-scale_responses)
  - [**Field Name**](#field-name)
  - [**Type**](#type)
  - [**Constraint**](#constraint)
  - [**Phase**](#phase)
  - [**Description**](#description)
  - [**scale_response_id**](#scale_response_id)
  - [**PK · NOT NULL**](#pk--not-null)
  - [**session_id**](#session_id)
  - [**FK → sessions · NOT NULL**](#fk--sessions--not-null)
  - [**question_id**](#question_id)
  - [**NOT NULL**](#not-null)
  - [**scale_value**](#scale_value)
  - [**NOT NULL**](#not-null)
  - [**property_id**](#property_id)
  - [**NOT NULL**](#not-null)
  - [**created_at**](#created_at)
  - [**NOT NULL · DEFAULT ****now(****)**](#not-null--default-now)
- [5. Table: none_flags](#5-table-none_flags)
  - [**Field Name**](#field-name)
  - [**Type**](#type)
  - [**Constraint**](#constraint)
  - [**Phase**](#phase)
  - [**Description**](#description)
  - [**none_flag_id**](#none_flag_id)
  - [**PK · NOT NULL**](#pk--not-null)
  - [**session_id**](#session_id)
  - [**FK → sessions · NOT NULL**](#fk--sessions--not-null)
  - [**question_id**](#question_id)
  - [**NOT NULL**](#not-null)
  - [**property_id**](#property_id)
  - [**NOT NULL**](#not-null)
  - [**created_at**](#created_at)
  - [**NOT NULL · DEFAULT ****now(****)**](#not-null--default-now)
- [6. Table Relationships](#6-table-relationships)
  - [**Parent Table**](#parent-table)
  - [**Child Table**](#child-table)
  - [**Cardinality**](#cardinality)
  - [**FK Field**](#fk-field)
  - [**Business Rule**](#business-rule)
  - [**sessions**](#sessions)
  - [**responses**](#responses)
  - [**sessions**](#sessions)
  - [**scale_responses**](#scale_responses)
  - [**sessions**](#sessions)
  - [**none_flags**](#none_flags)
  - [**sessions  (****1)**](#sessions--1)
    - [**responses  ****          ****scale_responses****  ****        ****none_flags**](#responses------------scale_responses----------none_flags)
- [7. Row Level Security Policies](#7-row-level-security-policies)
  - [**Table**](#table)
  - [**RLS Status**](#rls-status)
  - [**Anon Key — INSERT**](#anon-key--insert)
  - [**Anon Key — SELECT**](#anon-key--select)
  - [**Notes**](#notes)
  - [**sessions**](#sessions)
  - [**✓**** PERMITTED**](#-permitted)
  - [**✗**** BLOCKED**](#-blocked)
  - [**responses**](#responses)
  - [**✓**** PERMITTED**](#-permitted)
  - [**✗**** BLOCKED**](#-blocked)
  - [**scale_responses**](#scale_responses)
  - [**✓**** PERMITTED**](#-permitted)
  - [**✗**** BLOCKED**](#-blocked)
  - [**none_flags**](#none_flags)
  - [**✓**** PERMITTED**](#-permitted)
  - [**✗**** BLOCKED**](#-blocked)
    - [**WARN:  ****getDashboardData****(****) in supabase.js reads from all 4 tables for the management dashboard. The default RLS policy blocks SELECT with the anon key. Migration file 20240101000005_rls_policies.sql includes a specific dashboard aggregate read policy. Verify this policy is active in ****Supabase**** Auth → Policies before testing the dashboard in Sprint 4.**](#warn--getdashboarddata-in-supabasejs-reads-from-all-4-tables-for-the-management-dashboard-the-default-rls-policy-blocks-select-with-the-anon-key-migration-file-20240101000005_rls_policiessql-includes-a-specific-dashboard-aggregate-read-policy-verify-this-policy-is-active-in-supabase-auth--policies-before-testing-the-dashboard-in-sprint-4)
- [8. Supabase Migration SQL](#8-supabase-migration-sql)
  - [Migration 1 — Create sessions table](#migration-1--create-sessions-table)
  - [Migration 2 — Create responses table](#migration-2--create-responses-table)
  - [Migration 3 — Create scale_responses table](#migration-3--create-scale_responses-table)
  - [Migration 4 — Create none_flags table](#migration-4--create-none_flags-table)
  - [Migration 5 — Enable RLS and create policies](#migration-5--enable-rls-and-create-policies)
- [9. S1-1.8 Review Checklist](#9-s1-18-review-checklist)
  - [**Check**](#check)
  - [**Verification**](#verification)
  - [**Check 1 — ****user_id**** in sessions table**](#check-1--user_id-in-sessions-table)
  - [**Check 2 — ****property_id**** in sessions table**](#check-2--property_id-in-sessions-table)
  - [**Check 3 — All 4 tables present with correct fields**](#check-3--all-4-tables-present-with-correct-fields)
- [10. Version Log](#10-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF ENTITY RELATIONSHIP DIAGRAM v1.0 —**](#-end-of-entity-relationship-diagram-v10-)

## **ENTITY RELATIONSHIP DIAGRAM**

### **GuestIQ**** — Hotel Guest Expectations Research Application**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Review by Lead Researcher


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Tables****

4 tables: sessions · responses · scale_responses · none_flags


**## **Migration Files****

5 migration files: 4 table creations + 1 RLS policy file


**## **Review Checklist****

(1) sessions table includes user_id (nullable, Phase 2). (2) property_id present in sessions. (3) All 4 tables correct field names and types.


**## **Document Location****

01-Sprint-1 / AI-Outputs / Entity-Relationship-Diagram-v1.0.docx


**## **Downstream Use****

Source document for Sprint 2 step S2-1.2 (apply migrations in Supabase SQL Editor). ERD = migration source.


**## **Related Documents****

System Architecture Document v1.0 (S1-1.1) · Data Flow Diagram v1.0 (S1-1.5) · Production Readiness Architecture (S0-3.7)




INFO:  This document serves dual purpose: (1) the ERD is the schema design reference, and (2) Section 5 contains the exact Supabase Migration SQL — copy-pasted verbatim into the Supabase SQL Editor in Sprint 2 step S2-1.2. Do not edit the SQL manually in Supabase — always use the migration files.

### **WARN****:  The**** sessions table contains a ****user_id**** field that is NULLABLE and always NULL in Phase 1. This field is the authentication bridge to Phase 2 — it must be present from Sprint 2 even though it is never populated in the prototype. The review checklist (S1-1.8) explicitly verifies this field ****is**** present.**


# 1. ERD Notation and Field Constraint Legend


| ## **PK — Primary Key**  UUID generated by application via crypto.randomUUID(). Unique per row. | ## **FK — Foreign Key**  References the primary key of the parent table (sessions). ON DELETE CASCADE not set — orphan prevention via application logic. | ## **NOT NULL**  Field is required. Application always provides a value. Write fails if null. | ## **NULLABLE**  Field may be null. Either not yet known at insert time, or optional by design. |
| --- | --- | --- | --- |





# 2. Table: sessions

The sessions table is the anchor of the entire schema. Every respondent's session creates exactly one record here. All three other tables reference sessions via session_id. The table serves triple duty: session state management (during a session), resumption support (localStorage token verification), and research data (tier, intent, tense, completion status for all aggregate analysis).


| **sessions**  ·  public.sessions |  |  |  |  |
| --- | --- | --- | --- | --- |
| ## **Field Name** | ## **Type** | ## **Constraint** | ## **Phase** | ## **Description** |
| ## **session_id** | UUID | ## **PK · NOT NULL** | Ph 1 | UUID v4 generated by the application via crypto.randomUUID() at tier selection. Never generated by Supabase — the application controls the ID. Stored in browser localStorage as guestiq_session_token for session resume. |
| ## **property_id** | TEXT | ## **NOT NULL** | Ph 1 | Hotel property identifier. Read from URL query parameter ?property=. Defaults to 'PROP001' if absent. Present in every record — enables Phase 2 multi-property filtering without schema changes. |
| ## **tier** | TEXT | ## **NOT NULL** | Ph 1 | The tier selected by the respondent. Values: 'amateur' | 'professional' | 'expert'. Written at session creation. May be updated if respondent accepts a tier upgrade prompt. |
| ## **tense_frame** | TEXT | ## **NULLABLE** | Ph 1 | Set to 'retrospective' or 'anticipatory' after Q0 is answered. NULL from session creation until Q0 is answered. Applied to all question text rendering for the duration of the session. |
| ## **intent_category** | TEXT | ## **NULLABLE** | Ph 1 | Taxonomy code set after Q1 is answered. Values: 'WORK-TRANS' | 'WORK-EVENT' | 'WORK-EXT' | 'LEIS-PLAN' | 'LEIS-SOC' | 'LEIS-EXP' | 'DISP-HOME' | 'DISP-TRANS' | 'MED' | 'FAM' | 'TRANSIT' | 'LOC-ESC'. NULL from creation until Q1 answered. Drives all Module 5 routing. |
| ## **is_complete** | BOOLEAN | ## **NOT NULL** | Ph 1 | FALSE from session creation. Set to TRUE when the respondent answers the final question for their tier. Session token cleared from localStorage on completion. Used as the primary filter in all completion rate calculations. |
| ## **created_at** | TIMESTAMPTZ | ## **NOT NULL · DEFAULT ****now(****)** | Ph 1 | Timestamp of session creation (tier selection click). Auto-set by Supabase. Used for session ordering and time-based analysis. |
| ## **completed_at** | TIMESTAMPTZ | ## **NULLABLE** | Ph 1 | NULL from creation. Set to now() simultaneously with is_complete=true. NULL for all incomplete sessions. Used to calculate total_time_seconds: completed_at - created_at. |
| ## **credentials_years** | TEXT | ## **NULLABLE** | Ph 1 | Post-completion enrichment. Years of hotel industry experience selected by respondent. NULL if enrichment screen skipped or browser closed before enrichment. |
| ## **credentials_interactions** | TEXT | ## **NULLABLE** | Ph 1 | Post-completion enrichment. Estimated weekly guest interactions range. NULL if skipped. |
| ## **credentials_shift** | TEXT | ## **NULLABLE** | Ph 1 | Post-completion enrichment. Primary shift pattern. NULL if skipped. |
| ## **user_id** | UUID | ## **NULLABLE** | Phase 2 | ⚠ ALWAYS NULL IN PHASE 1. Present from Sprint 2 for forward compatibility. In Phase 2: populated with the authenticated user's Supabase Auth UUID when VITE_FEATURE_AUTH_ENABLED=true. Enables individual staff member tracking across sessions in Phase 2 analytics. Never populated in the Phase 1 prototype. |




# 3. Table: responses

The responses table stores one record per answer option selected per question per session. For single-select questions, one record per question. For multi-select questions, one record per selected option. Does not store scale question answers (those go to scale_responses). Does store the 'None of these fit' selection — a none_flag record is also written separately (see none_flags table).


| **responses**  ·  public.responses |  |  |  |  |
| --- | --- | --- | --- | --- |
| ## **Field Name** | ## **Type** | ## **Constraint** | ## **Phase** | ## **Description** |
| ## **response_id** | UUID | ## **PK · NOT NULL** | Ph 1 | UUID v4 generated by the application. One record per answer option selection. |
| ## **session_id** | UUID | ## **FK → sessions · NOT NULL** | Ph 1 | References sessions.session_id. Written immediately — session must exist before any response is written. |
| ## **question_id** | TEXT | ## **NOT NULL** | Ph 1 | Question identifier from questionnaire.js. Format: 'QR1' (Q0 tense routing), 'Q1' through 'Q79' (instrument questions). Q0 is stored as 'QR1' to match the questionnaire.js id field. |
| ## **answer_code** | TEXT | ## **NOT NULL** | Ph 1 | Option code from the selected answer. Format: single letter 'A' through 'M'. For the 'None of these fit' option: code is 'NONE'. Multi-select questions produce multiple response records — one per selected code. |
| ## **tense_frame** | TEXT | ## **NOT NULL** | Ph 1 | The tense_frame active when this response was given. Copied from session state at write time. 'retrospective' or 'anticipatory'. Enables per-tense-frame response analysis across all questions. |
| ## **module_number** | INTEGER | ## **NOT NULL** | Ph 1 | Module number of the question. Q0 = module 0. Modules 1–7 as per questionnaire structure. Used for per-module aggregation in dashboard panels. |
| ## **property_id** | TEXT | ## **NOT NULL** | Ph 1 | Copied from session property_id at write time. Redundant with sessions.property_id but required for direct per-property queries without joining to sessions. |
| ## **created_at** | TIMESTAMPTZ | ## **NOT NULL · DEFAULT ****now(****)** | Ph 1 | Timestamp of response record creation. Auto-set. Used for response ordering within a session. |




# 4. Table: scale_responses

Scale questions (five-point Likert-style items) store their response separately because the data structure is fundamentally different — an integer value rather than an option code. Scale questions appear in Modules 3, 4, 5, and 6. No 'None of these fit' option exists for scale questions, so no none_flag records are produced.


| **scale_****responses**  ·  public.scale_responses |  |  |  |  |
| --- | --- | --- | --- | --- |
| ## **Field Name** | ## **Type** | ## **Constraint** | ## **Phase** | ## **Description** |
| ## **scale_response_id** | UUID | ## **PK · NOT NULL** | Ph 1 | UUID v4 generated by the application. One record per scale question answered. |
| ## **session_id** | UUID | ## **FK → sessions · NOT NULL** | Ph 1 | References sessions.session_id. |
| ## **question_id** | TEXT | ## **NOT NULL** | Ph 1 | Question identifier. Scale questions in GuestIQ: Q12, Q15, Q23, Q25, Q26, Q29, Q32, Q36, Q39, Q50, Q52, Q54, Q56, Q61, Q68. Exact list in questionnaire.js type='scale_5' field. |
| ## **scale_value** | INTEGER | ## **NOT NULL** | Ph 1 | Integer 1–5 representing the respondent's selection on the five-point scale. 1 = leftmost (least/not important), 5 = rightmost (most important/essential). Application validates: only 1–5 accepted. |
| ## **property_id** | TEXT | ## **NOT NULL** | Ph 1 | Copied from session property_id at write time. |
| ## **created_at** | TIMESTAMPTZ | ## **NOT NULL · DEFAULT ****now(****)** | Ph 1 | Timestamp of scale response creation. Auto-set. |




# 5. Table: none_flags

The none_flags table records every selection of the 'None of these fit my situation' escape valve option. A none-flag record is written in addition to the corresponding responses record (DFD-W5 + DFD-W7 both fire). The separate table enables direct none-flag rate analysis per question without filtering the responses table.

INFO:  NFR-045 requires that the count of none_flag records matches the count of 'None of these fit' selections made in the UI for every verified session. The data integrity verification protocol (Test Plan Section 5) verifies this in Sprints 2, 3, and 4.


| **none_****flags**  ·  public.none_flags |  |  |  |  |
| --- | --- | --- | --- | --- |
| ## **Field Name** | ## **Type** | ## **Constraint** | ## **Phase** | ## **Description** |
| ## **none_flag_id** | UUID | ## **PK · NOT NULL** | Ph 1 | UUID v4 generated by the application. One record per none-option selection. |
| ## **session_id** | UUID | ## **FK → sessions · NOT NULL** | Ph 1 | References sessions.session_id. |
| ## **question_id** | TEXT | ## **NOT NULL** | Ph 1 | The question on which the none option was selected. All instrument questions Q1–Q79 have a none option. Q0 (tense routing) does not have a none option. |
| ## **property_id** | TEXT | ## **NOT NULL** | Ph 1 | Copied from session property_id at write time. |
| ## **created_at** | TIMESTAMPTZ | ## **NOT NULL · DEFAULT ****now(****)** | Ph 1 | Timestamp of none-flag creation. Auto-set. |




# 6. Table Relationships

All three child tables reference the sessions table via session_id. There are no relationships between the three child tables — responses, scale_responses, and none_flags are independent records all keyed to the same session.


| ## **Parent Table** | ## **Child Table** | ## **Cardinality** | ## **FK Field** | ## **Business Rule** |
| --- | --- | --- | --- | --- |
| ## **sessions** | ## **responses** | 1 : many | session_id | One session produces many response records — one per answered question option. A session with no answers has zero response records. |
| ## **sessions** | ## **scale_responses** | 1 : many | session_id | One session produces zero or many scale response records — one per answered scale question. Sessions with no scale questions have zero records. |
| ## **sessions** | ## **none_flags** | 1 : many | session_id | One session produces zero or many none-flag records — one per 'None of these fit' selection. Sessions where no none option is ever selected have zero records. |




| ## **sessions  (****1)**  session_id  ·  property_id  ·  tier  ·  tense_frame  ·  intent_category  ·  is_complete  ·  ...  ────────────────────────┬────────────────────────┬────────────────────────  │ (many)                  │ (many)                  │ (many)  ▼                        ▼                        ▼  ### **responses  ****          ****scale_responses****  ****        ****none_flags** |
| --- |




# 7. Row Level Security Policies

RLS is enabled on all 4 tables. The Phase 1 policy is minimal by design: the anon key can INSERT but cannot SELECT. This protects respondent data from cross-session reads while allowing the application to write research data without authentication.


| ## **Table** | ## **RLS Status** | ## **Anon Key — INSERT** | ## **Anon Key — SELECT** | ## **Notes** |
| --- | --- | --- | --- | --- |
| ## **sessions** | ENABLED | ## **✓**** PERMITTED** | ## **✗**** BLOCKED** | SELECT added in Phase 2 for authenticated dashboard reads. |
| ## **responses** | ENABLED | ## **✓**** PERMITTED** | ## **✗**** BLOCKED** | SELECT added in Phase 2 for authenticated dashboard reads. |
| ## **scale_responses** | ENABLED | ## **✓**** PERMITTED** | ## **✗**** BLOCKED** | SELECT added in Phase 2 for authenticated dashboard reads. |
| ## **none_flags** | ENABLED | ## **✓**** PERMITTED** | ## **✗**** BLOCKED** | SELECT added in Phase 2 for authenticated dashboard reads. |




### **WARN:  ****getDashboardData****(****) in supabase.js reads from all 4 tables for the management dashboard. The default RLS policy blocks SELECT with the anon key. Migration file 20240101000005_rls_policies.sql includes a specific dashboard aggregate read policy. Verify this policy is active in ****Supabase**** Auth → Policies before testing the dashboard in Sprint 4.**


# 8. Supabase Migration SQL

These are the exact SQL statements to apply in the Supabase SQL Editor in Sprint 2 step S2-1.2. Each migration is run as a separate query. Run them in order — 000001 through 000005. Do not modify the SQL. Do not create tables manually in the Supabase dashboard — all schema changes must go through migration files per NFR-032.


INFO:  Sprint 2 step S2-1.2 instruction: open Supabase Dashboard → SQL Editor → New query. Paste each migration block below, one at a time in order. Click Run after each one. Verify the table appears in the Table Editor before running the next migration.


## Migration 1 — Create sessions table

-- 20240101000001_create_sessions.sql

-- GuestIQ Phase 1 prototype — sessions table


CREATE TABLE IF NOT EXISTS public.sessions (

session_id            UUID          PRIMARY KEY,

property_id           TEXT          NOT NULL DEFAULT 'PROP001',

tier                  TEXT          NOT NULL CHECK (tier IN ('amateur', 'professional', 'expert')),

tense_frame           TEXT          CHECK (tense_frame IN ('retrospective', 'anticipatory')),

intent_category       TEXT,

is_complete           BOOLEAN       NOT NULL DEFAULT FALSE,

created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW(),

completed_at          TIMESTAMPTZ,

credentials_years     TEXT,

credentials_interactions TEXT,

credentials_shift     TEXT,

user_id               UUID          -- Phase 2: populated when auth active

);


-- Index for property-based queries

CREATE INDEX IF NOT EXISTS idx_sessions_property_id

ON public.sessions (property_id);


-- Index for completion queries

CREATE INDEX IF NOT EXISTS idx_sessions_is_complete

ON public.sessions (property_id, is_complete);


## Migration 2 — Create responses table

-- 20240101000002_create_responses.sql

-- GuestIQ Phase 1 prototype — responses table


CREATE TABLE IF NOT EXISTS public.responses (

response_id           UUID          PRIMARY KEY,

session_id            UUID          NOT NULL REFERENCES public.sessions(session_id),

question_id           TEXT          NOT NULL,

answer_code           TEXT          NOT NULL,

tense_frame           TEXT          NOT NULL CHECK (tense_frame IN ('retrospective', 'anticipatory')),

module_number         INTEGER       NOT NULL CHECK (module_number BETWEEN 0 AND 7),

property_id           TEXT          NOT NULL DEFAULT 'PROP001',

created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW()

);


-- Index for session-based response retrieval

CREATE INDEX IF NOT EXISTS idx_responses_session_id

ON public.responses (session_id);


-- Index for question-level analysis

CREATE INDEX IF NOT EXISTS idx_responses_question_id

ON public.responses (property_id, question_id);


## Migration 3 — Create scale_responses table

-- 20240101000003_create_scale_responses.sql

-- GuestIQ Phase 1 prototype — scale_responses table


CREATE TABLE IF NOT EXISTS public.scale_responses (

scale_response_id     UUID          PRIMARY KEY,

session_id            UUID          NOT NULL REFERENCES public.sessions(session_id),

question_id           TEXT          NOT NULL,

scale_value           INTEGER       NOT NULL CHECK (scale_value BETWEEN 1 AND 5),

property_id           TEXT          NOT NULL DEFAULT 'PROP001',

created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW()

);


-- Index for session-based retrieval

CREATE INDEX IF NOT EXISTS idx_scale_responses_session_id

ON public.scale_responses (session_id);


## Migration 4 — Create none_flags table

-- 20240101000004_create_none_flags.sql

-- GuestIQ Phase 1 prototype — none_flags table


CREATE TABLE IF NOT EXISTS public.none_flags (

none_flag_id          UUID          PRIMARY KEY,

session_id            UUID          NOT NULL REFERENCES public.sessions(session_id),

question_id           TEXT          NOT NULL,

property_id           TEXT          NOT NULL DEFAULT 'PROP001',

created_at            TIMESTAMPTZ   NOT NULL DEFAULT NOW()

);


-- Index for none-flag rate analysis per question

CREATE INDEX IF NOT EXISTS idx_none_flags_question_id

ON public.none_flags (property_id, question_id);


-- Index for session-based retrieval

CREATE INDEX IF NOT EXISTS idx_none_flags_session_id

ON public.none_flags (session_id);


## Migration 5 — Enable RLS and create policies

-- 20240101000005_rls_policies.sql

-- GuestIQ Phase 1 prototype — Row Level Security


-- Enable RLS on all 4 tables

ALTER TABLE public.sessions       ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.responses      ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.scale_responses ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.none_flags     ENABLE ROW LEVEL SECURITY;


-- INSERT policy: anon key can write to all tables (no auth required)

CREATE POLICY "anon_insert_sessions"

ON public.sessions FOR INSERT TO anon

WITH CHECK (true);


CREATE POLICY "anon_insert_responses"

ON public.responses FOR INSERT TO anon

WITH CHECK (true);


CREATE POLICY "anon_insert_scale_responses"

ON public.scale_responses FOR INSERT TO anon

WITH CHECK (true);


CREATE POLICY "anon_insert_none_flags"

ON public.none_flags FOR INSERT TO anon

WITH CHECK (true);


-- UPDATE policy: anon key can update own session only (for tense_frame, intent_category, is_complete)

CREATE POLICY "anon_update_own_session"

ON public.sessions FOR UPDATE TO anon

USING (true)   -- allow update if session exists

WITH CHECK (true);


-- SELECT policy: anon key can read sessions for dashboard aggregate (property-scoped)

-- Note: this allows the anon key to READ sessions for the dashboard overlay.

-- In Phase 2, replace with authenticated user policy.

CREATE POLICY "anon_select_sessions_aggregate"

ON public.sessions FOR SELECT TO anon

USING (true);


CREATE POLICY "anon_select_responses_aggregate"

ON public.responses FOR SELECT TO anon

USING (true);


CREATE POLICY "anon_select_scale_responses_aggregate"

ON public.scale_responses FOR SELECT TO anon

USING (true);


CREATE POLICY "anon_select_none_flags_aggregate"

ON public.none_flags FOR SELECT TO anon

USING (true);


INFO:  The SELECT policies above allow aggregate reads needed for the dashboard overlay in Phase 1. This means the anon key can read all session data — acceptable for an internal pilot where the 10 respondents are known colleagues. In Phase 2, these SELECT policies are replaced with authenticated-user policies that restrict reads to the authenticated user's property only.


# 9. S1-1.8 Review Checklist

From MDT v5.0 step S1-1.8 — all three items must be confirmed before approval.


**## **Check 1 — ****user_id**** in sessions table****

Open Section 2 (sessions table ERD). Verify user_id field is present. Verify: type is UUID, constraint is NULLABLE, Phase column shows 'Phase 2'. Verify the description states it is ALWAYS NULL IN PHASE 1. Verify migration SQL (Section 8 Migration 1) includes user_id as a nullable column with no DEFAULT.


**## **Check 2 — ****property_id**** in sessions table****

Open Section 2. Verify property_id field is present. Verify: type is TEXT, constraint is NOT NULL, Phase 1, DEFAULT 'PROP001'. Verify all 4 tables in Sections 2–5 include property_id. Verify Migration SQL for each table includes property_id NOT NULL DEFAULT 'PROP001'.


**## **Check 3 — All 4 tables present with correct fields****

Verify sessions table (Section 2): 12 fields including session_id PK, all enumerated fields. Verify responses table (Section 3): 8 fields. Verify scale_responses table (Section 4): 6 fields including scale_value integer 1–5. Verify none_flags table (Section 5): 5 fields. Run all 5 migrations in Supabase SQL Editor and verify tables appear in Table Editor.




# 10. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF ENTITY RELATIONSHIP DIAGRAM v1.0 —**

*GuestIQ**  ·**  Entity Relationship Diagram **v1.0  ·**  S1-1.**7  ·**  S1-**04  ·**  Sprint 1 **Artifact  ·**  Confidential*

