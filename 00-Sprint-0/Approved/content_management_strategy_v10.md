**CONTENT MANAGEMENT STRATEGY DOCUMENT**

**GuestIQ — Hotel Guest Expectations Research Application**

|  |  |
| --- | --- |
| **Document ID** | S0-3.5 — Sprint 0 Artifact |
| **Document Version** | 1.0 — Initial Release |
| **Document Status** | DRAFT — Pending Review by Lead Researcher |
| **Project** | GuestIQ — Hotel Guest Expectations Research Application |
| **Sprint** | Sprint 0 — Foundation & Governance |
| **Prepared By** | Claude (AI Developer) |
| **Date Prepared** | [Insert Date] |
| **Review Due** | Within 48 hours — Lead Researcher review commitment |
| **Pattern** | Strangler Fig — Phase 1a (hardcoded) → Phase 1b (JSON config files) → Phase 2 (Supabase CMS) |
| **Related FRs** | FR-028 (questionnaire.js structure) · FR-083 (Phase 1b JSON extraction) · FR-084 (configuration validator) · FR-085 (version control) · NFR-034 (zero hardcoded strings) |
| **Related Documents** | SRS-F v2.0 Sections 4.1 and 10 · UC Specs v2.0 UC-05 · Backlog v3.1 S1-08, S3-11, S3-12 · Charter v2.1 Section 3 |
| **Document Location** | 00-Sprint-0 / AI-Outputs / Content-Management-Strategy-v1.0.docx |
| **Downstream Use** | Source of truth for S1-08 (questionnaire.js spec) · S3-11 (Phase 1b migration) · S3-12 (identical-behavior verification) · Phase 2 CMS scoping |

INFO: This document answers three questions: (1) How is questionnaire content structured in Phase 1a? (2) How does the Strangler Fig migration to JSON files work in Phase 1b? (3) What does Phase 2 content management look like? The primary audience is the Lead Researcher — every section is written so that a non-developer can understand and verify the decisions.

**WARN: The architectural discipline in Section 3 is non-negotiable. No component may contain hardcoded content. This is not a preference — it is the prerequisite for the Phase 1b migration to work without application changes. Every component built in Sprint 2 must be verified compliant before Sprint 3 begins.**

# 1. The Strangler Fig Pattern — Rationale and Approach

The Strangler Fig is a software migration pattern named after a tropical vine that grows around an existing tree, gradually replacing it until the original tree is no longer needed. Applied to content management, it means: start with a working but inflexible implementation, then incrementally replace it with a more capable one — without any visible change to the user experience, and without a risky 'big bang' rewrite.

GuestIQ uses the Strangler Fig pattern across three phases of content management maturity:

| **Phase** | **Description** |
| --- | --- |
| **Phase 1a — hardcoded questionnaire.js** | All 79 questions, answer options, episode names, tier descriptors, UI copy, branching rules, and taxonomy codes live in a single JavaScript file: src/data/questionnaire.js. The application reads from this file. Content cannot be changed without a code deployment. This is the starting point — fully functional but developer-dependent for any content change. |
| **Phase 1b — 6 JSON configuration files** | After Sprint 3 testing confirms the application is correct, questionnaire.js content is extracted into 6 JSON files. The application is updated to read from JSON. The content is now editable without touching application code. A Git commit deploys the change in 2 minutes. questionnaire.js is retained as a reference but is no longer the source of truth. |
| **Phase 2 — Supabase CMS + visual admin interface** | Content moves from JSON files to a Supabase database table. A visual admin interface at /admin provides form-based editing with draft/publish workflow, option reordering, and routing rule validation. No Git access required. Changes are live immediately on publish. |

## 1.1 Why Not Start with JSON Files?

A reasonable question: if JSON files are better than hardcoded JavaScript, why not start there in Sprint 2?

The answer is sequencing risk. Sprint 2 is the most complex build sprint in the project — it brings the entire application skeleton to life for the first time. Adding a JSON configuration layer and configuration validator at that moment introduces two risks: (1) bugs in the JSON loading layer are hard to distinguish from bugs in the application logic, and (2) the developer must simultaneously maintain the questionnaire.js structure AND the JSON format, which are identical but require different loading code.

The Strangler Fig approach separates concerns across time. Sprint 2 builds and verifies the application logic against a known-correct questionnaire.js. Sprint 3 verifies the full 79-question instrument. Then — with a verified, stable application — the extraction to JSON happens as a single focused task (S3-11) with a dedicated verification step (S3-12). If the extraction introduces any error, it is immediately visible against the previously verified baseline.

## 1.2 Why Not Start with a Database?

Phase 2 CMS (Supabase database + visual admin interface) is out of scope for Phase 1 for three reasons. First, a visual admin interface at /admin is a significant build — it is estimated at several sprint's worth of work and would consume the Phase 1 timeline. Second, Supabase content queries add latency and failure modes that questionnaire.js and JSON files do not — for a pilot with 10 respondents, this complexity is unnecessary. Third, the Strangler Fig approach means Phase 2 can adopt Supabase content without any change to the component architecture, because components already accept content as props and never contain it directly. The migration path from JSON to database is mechanical.

# 2. Phase 1a — questionnaire.js Data Structure

**Phase 1a hardcoded questionnaire.js**

Phase 1a is active from Sprint 2 through the end of Sprint 3 testing. All questionnaire content lives in src/data/questionnaire.js. This file is the single source of truth for all question text, answer options, tier assignments, taxonomy codes, routing flags, episode names, tier descriptors, UI copy, and branching rules.

## 2.1 File Structure Overview

questionnaire.js exports a default object with the following top-level keys:

| **Key** | **Content** |
| --- | --- |
| **questions** | Array of question objects. Contains Q0 through Q79 (80 total — Q0 is the routing gate QR1, Q1–Q79 are the instrument questions). Each question object has the 13 fields specified in Section 2.2. |
| **episodes** | Array of 7 episode objects. Each episode has: number, name, moduleMappings (array of module numbers), curiosityHookText, curiosityHookSubtext. Episode names are sourced exclusively from this array — never hardcoded in components. |
| **tiers** | Object with three keys: amateur, professional, expert. Each tier contains: name, descriptor, timeEstimate, questionCount, ctaLabel, colorToken. Tier card content sourced exclusively from here. |
| **uiCopy** | Object containing all UI strings that are not question content: welcomeHookText, welcomeContextStatement, privacyNoticeText, mostSelectedBadgeText, skipButtonLabel, notNowLinkLabel, disambiguationResumeText, disambiguationNewSessionText, downtimeMessageText, configErrorPrefix. |
| **branching** | Object encoding Module 5 routing rules. Maps each of the 12 intent taxonomy codes (from Q1 answer) to the correct Module 5 sub-section identifier. Also contains secondary purpose routing rules. |
| **taxonomy** | Object mapping all taxonomy code strings (e.g. 'WORK-TRANS') to human-readable category names used in the results screen and management dashboard. |

## 2.2 Question Object — 13 Required Fields

Every question object in the questions array must have exactly these 13 fields. Missing fields cause a configuration validator error in Phase 1b. In Phase 1a they cause runtime errors in components. The questionnaire.js data structure specification (S1-08) expands this into the full Sprint 1 deliverable.

| **Field Name** | **Data Type** | **MoSCoW** | **Description and Valid Values** |
| --- | --- | --- | --- |
| **id** | String | MUST | Unique question identifier. Format: 'Q0', 'Q1', ... 'Q79'. Q0 is the routing gate (QR1). Used as the primary key in Supabase responses table (question\_id field) and in PostHog events. |
| **module** | Integer | MUST | Module number 0–7. Q0 has module = 0. Modules 1–7 correspond to the 7 survey modules. Used for episode mapping and progress calculation. |
| **section** | String or null | MUST | Sub-section identifier for Module 5 questions. Format: '5A', '5B', '5C', '5D', '5E', '5F', '5G'. Null for all non-Module-5 questions. Used by branching logic to select the correct sub-section. |
| **tiers** | Array of String | MUST | Which tiers include this question. Valid values: 'amateur', 'professional', 'expert'. Q0 is in all tiers: ['amateur','professional','expert']. Amateur-only questions: ['amateur']. Professional and Expert: ['professional','expert']. |
| **type** | String | MUST | Question render type. Valid values: 'single\_select', 'multi\_select', 'scale'. Determines which Question sub-component renders the answer options. |
| **text** | Object | MUST | Question text in both tenses. Must have exactly two keys: 'retrospective' (string — past tense phrasing) and 'anticipatory' (string — future/conditional tense phrasing). The Question component selects the correct variant based on tense\_frame in session state. |
| **instruction** | String or null | MUST | Optional instruction shown below the question text. Example: 'Select up to three.' Null if no instruction needed. Rendered in body typography, distinct from question text. |
| **options** | Array of Object | MUST | Answer options array. Each option object has three keys: 'code' (String — single letter A-M, or 'NONE'), 'taxonomy\_code' (String or null — the intent taxonomy code for Q1 options, null for all other questions), 'text' (String — the answer option text shown to the respondent). |
| **has\_none\_option** | Boolean | MUST | Whether a 'None of these fit my situation' escape valve is appended as the final option. True for all 79 instrument questions (Q1–Q79). False for Q0 (routing gate). When true, the none option is automatically appended by the Question component — it does not appear in the options array. |
| **none\_option\_code** | String | MUST | The answer code recorded when the none option is selected. Convention: 'NONE'. Stored in the responses table answer\_code field and in the none\_flags table. |
| **researcher\_note** | String or null | SHOULD | Internal researcher note explaining the question's purpose, framing rationale, or analysis guidance. Not shown to respondents. Available in the management dashboard Raw Data panel. Used during instrument review. |
| **routing\_flag** | String or null | MUST | Special routing instruction for this question. Valid values: 'intent\_capture' (Q1 — answer stored as intent\_category), 'secondary\_purpose' (Q2 — may trigger second Module 5 sub-section), 'none\_routes\_to\_manual' (Q1 only — if none option selected, routes to manual intent selection screen). Null for all other questions. |
| **scale\_labels** | Array of String or null | MUST | Five label strings for scale questions, ordered left to right. Must have exactly 5 elements if type is 'scale'. Null if type is not 'scale'. These are the column header labels shown above the radio buttons. |

## 2.3 Annotated Example — Single Question Object

The following shows a correctly formed question object for Q1 (primary stay purpose — Module 1, single-select, intent capture):

// Q1 — Primary stay purpose — Module 1

{

id: 'Q1',

module: 1,

section: null,

tiers: ['amateur', 'professional', 'expert'],

type: 'single\_select',

text: {

retrospective: 'What was the main reason for this hotel stay?',

anticipatory: 'What is the main reason for this hotel stay?'

},

instruction: 'Select the one that best fits — even if your stay has more than one purpose.',

options: [

{ code: 'A', taxonomy\_code: 'WORK-TRANS', text: 'Work or business — meetings, site visits, or client engagements' },

{ code: 'B', taxonomy\_code: 'WORK-EVENT', text: 'Work or business — attending a conference, trade show, or professional event' },

// ... options C through M

],

has\_none\_option: true,

none\_option\_code: 'NONE',

researcher\_note: 'Q1 is the intent capture question. The answer code is stored as intent\_category in the sessions table and drives all Module 5 routing. Taxonomy codes are critical — do not change them.',

routing\_flag: 'intent\_capture',

scale\_labels: null

}

DEV: DEV: questionnaire.js is created in Sprint 2 step S2-2.2. It must implement all 80 question objects (Q0 + Q1–Q79) following this structure exactly. The useQuestionnaire hook (src/hooks/useQuestionnaire.js) is the single import point — it reads questionnaire.js and provides content to all components. No component imports questionnaire.js directly.

## 2.4 The Component Content Contract

The architectural discipline that makes the Phase 1b migration possible is simple to state: no component contains content. Every string a respondent sees comes through props, never from within the component itself.

| **Pattern** | **Example** |
| --- | --- |
| **Compliant — content via props** | The Question component receives a question object as a prop: <Question question={questionObj} tenseFrame={tenseFrame} />. It reads question.text[tenseFrame] to render the question text. It maps question.options to render the answer list. It appends the none option if question.has\_none\_option is true. The component knows nothing about any specific question. |
| **Non-compliant — content hardcoded** | The Question component contains: if (questionId === 'Q1') { return 'What was the main reason for this hotel stay?' }. This component can never be used with different content — it is permanently coupled to that specific question text. The Phase 1b migration cannot replace this without rewriting the component. |
| **Compliant — UI copy via props** | The welcome screen reads hook text from: props.uiCopy.welcomeHookText. The privacy notice reads from: props.uiCopy.privacyNoticeText. The 'Not now' link reads from: props.uiCopy.notNowLinkLabel. |
| **Non-compliant — UI copy hardcoded** | The welcome screen contains: <p>Participation is voluntary. You may close this page at any time...</p> directly in JSX. This string cannot be changed without a code deployment even after Phase 1b. |

**WARN: ESLint must be configured to enforce the content contract. A custom rule (or the 'no-hardcoded-strings' plugin) flags any string literal in JSX that is not a template literal reading from props or state. This enforcement runs in the GitHub Actions CI/CD pipeline — a hardcoded string causes the pipeline to fail before deployment.**

# 3. Phase 1b — JSON Configuration Files

**Phase 1b 6 JSON configuration files — editable without code**

Phase 1b begins after Sprint 3 testing is complete and the full 79-question instrument has been verified against the 84-path test matrix. The Strangler Fig migration extracts all content from questionnaire.js into 6 JSON files. From this point, the Lead Researcher can edit questionnaire content without touching application code or requiring developer involvement.

## 3.1 The 6 Configuration Files

| **File** | **Primary Content** | **Size Estimate** | **Purpose and Edit Scenarios** |
| --- | --- | --- | --- |
| **questions.json** | All 80 question objects (Q0–Q79) with all 13 fields | ~120KB | Primary edit target. Edit to: rephrase question text, rephrase answer options, update researcher notes, change instruction lines. Do NOT edit: id, taxonomy\_code, routing\_flag, none\_option\_code — these are semantic identifiers that downstream logic depends on. |
| **episodes.json** | 7 episode objects with names, module mappings, curiosity hook texts | ~4KB | Edit to: rephrase curiosity hook text between episodes, update episode names (only if rebranding — affects displayed text only). Do NOT edit: episode number or module mappings — these drive the episode map rendering. |
| **tiers.json** | 3 tier objects with descriptors, time estimates, question counts, CTA labels | ~2KB | Edit to: rephrase tier descriptors shown on tier cards, update time estimates if instrument changes, update CTA button labels. Do NOT edit: tier name keys ('amateur', 'professional', 'expert') — these are used throughout the codebase as identifiers. |
| **ui-copy.json** | All UI strings not in questions: welcome hook, privacy notice, button labels, error messages | ~3KB | Primary target for non-question text edits. Edit to: update the privacy notice text, update the welcome hook, change button labels. All strings respondents see that are not questions live here. |
| **branching.json** | Complete Module 5 routing table — maps 12 intent codes to sub-sections, secondary purpose rules | ~2KB | Edit only with extreme care. Edit to: add a new Module 5 sub-section mapping (Phase 2 expansion). Do NOT edit: existing intent code mappings — a routing error sends respondents to the wrong sub-section, corrupting the dataset. Any edit must be followed by the full 84-path test matrix re-run. |
| **taxonomy.json** | 12 intent taxonomy code definitions with human-readable names | ~1KB | Edit to: update the human-readable category names shown in the results screen and dashboard. Do NOT edit: the taxonomy code keys (e.g. 'WORK-TRANS') — these are foreign keys to the sessions table intent\_category field. |

## 3.2 Configuration Validator

A configuration validator runs on every application load, immediately after Sentry initialization and before any respondent-facing content renders. This is a mandatory safety mechanism — it catches file corruption or editing errors before any respondent encounters a broken questionnaire.

| **Aspect** | **Specification** |
| --- | --- |
| **What it validates** | (1) All 6 JSON files are present and parseable — a syntax error (missing comma, unclosed bracket) is caught here. (2) questions.json contains exactly 80 question objects. (3) Every question object has all 13 required fields with the correct data types. (4) Every question's tiers field contains only valid values. (5) Every question's type field is one of the three valid types. (6) Every scale question has exactly 5 scale\_labels. |
| **What it does NOT validate** | Semantic correctness — option codes referenced in branching.json match actual option codes in questions.json. Taxonomy codes in options match the taxonomy.json keys. These logic errors require manual verification (see UC-05 Extension 2 in UC Specs v2.0). The validator catches structural errors only. |
| **On validation failure** | The validator throws before React renders. The application shows a full-screen error: 'Configuration error — [filename].json is malformed. Please check the file and reload.' No respondent ever sees the questionnaire in a broken state. Sentry captures the error with the filename and error detail. |
| **On validation success** | The validator completes in under 50ms. The application proceeds to render. No visible effect on the respondent experience. |
| **Recovery** | The Lead Researcher runs: git revert HEAD (single terminal command). GitHub Actions redeploys the previous working version in under 2 minutes. Application restored. |

DEV: DEV: Implement the validator in src/config/configValidator.js. It runs synchronously on application boot, after Sentry.init() and before posthog.init(). It is the second operation in src/main.jsx. It imports all 6 JSON files statically (Vite handles JSON imports natively) and runs structural checks. On failure: call Sentry.captureException() then throw — the ErrorBoundary catches this and shows the configuration error screen.

## 3.3 Identical-Behavior Verification (Sprint 3 Step S3-12)

After Phase 1b extraction, the application must behave identically to the questionnaire.js version. The identical-behavior verification (Backlog S3-12, 5 SP) is a mandatory sprint gate condition. No Sprint 4 work begins until this verification passes.

| **Step** | **Acceptance Criterion** |
| --- | --- |
| **Step 1 — Expert flow walkthrough** | Complete the full Expert tier flow (79 questions + Q0) using the JSON-backed application. Verify: all questions appear with correct text, all answer options present and correctly labeled, tier routing correct (Amateur subset, Professional subset), all PostHog events firing, session completed in Supabase. |
| **Step 2 — 10 question cross-reference** | Open questions.json in a text editor. Find 10 specific questions by their id. Read the question text and answer options. Verify each matches the original Refined Questionnaire document exactly. Any discrepancy is a content error introduced during extraction — log as High severity. |
| **Step 3 — 84-path matrix re-run** | Execute all 84 branching paths against the JSON-backed application. Verify each path produces the same Module 5 sub-section as the questionnaire.js version. Any routing difference is a branching.json error — log as Critical severity. |
| **Step 4 — Validator test** | Deliberately introduce a JSON syntax error in questions.json (add a trailing comma). Reload the application. Verify the configuration error screen appears before any questionnaire content renders. Restore the file. Verify the application works correctly on the next reload. |
| **Pass condition** | All four steps pass with zero discrepancies. The Sprint 3 Gate cannot pass until S3-12 is complete and approved. |

# 4. The Researcher's Content Editing Journey (UC-05)

This section describes the complete experience of making a content edit after Phase 1b is complete. It is written from the Lead Researcher's perspective, not the developer's. This is the use case that UC-05 specifies — the goal the content management strategy is designed to deliver.

## 4.1 Editing a Question — Step by Step

Scenario: after reviewing pilot data, the Lead Researcher determines that the wording of Q44 option A in the leisure sub-section is ambiguous. The text currently reads 'The sense of arrival — first impression, lobby atmosphere, warm welcome' and should read 'The sense of arrival — the moment of welcome and first impression.'

| **Step** | **Action** |
| --- | --- |
| **Step 1 — Identify the file** | The question is in the instrument, so the file is questions.json. Located at: src/data/questions.json in the GitHub repository. |
| **Step 2 — Open the file** | Open GitHub repository in a browser. Navigate to src/data/questions.json. Click the pencil (Edit) icon in the top right of the file view. The file opens in GitHub's built-in text editor. |
| **Step 3 — Find the question** | Use browser Find (Ctrl+F) to search for the question id: 'Q44'. Locate the options array. Find the option with code: 'A'. |
| **Step 4 — Edit the text** | Change the text field from the old wording to the new wording. JSON string rules: use double quotes, escape any apostrophes with backslash. The structure does not change — only the text value. |
| **Step 5 — Commit the change** | Scroll to the bottom of the GitHub editor. Write a brief commit message: 'Update Q44 option A wording for clarity'. Click 'Commit changes'. Commit directly to the main branch. |
| **Step 6 — Wait 2 minutes** | GitHub Actions CI/CD pipeline triggers automatically. The pipeline: runs ESLint (zero errors), runs the configuration validator (JSON is valid), builds the application, deploys to guestiq.github.io. This takes approximately 90 seconds to 2 minutes. |
| **Step 7 — Verify the change** | Open guestiq.github.io?property=PROP001 in a browser. Navigate to Q44 in the Expert tier. Verify the new wording is visible. The change is live. |

INFO: The entire process above requires: a GitHub account (already set up in Pre-Sprint), a browser, and the ability to find text in a JSON file. No terminal, no code editor, no developer involvement. This is the goal the Strangler Fig migration delivers.

## 4.2 What to Edit vs What Not to Edit

The configuration validator catches structural errors. It cannot catch semantic errors — changes that are syntactically valid JSON but logically incorrect. The following rules protect against the most common semantic errors.

| **Category** | **Fields** |
| --- | --- |
| **SAFE to edit** | Question text (retrospective and anticipatory variants) · Answer option text · Instruction lines · Researcher notes · Episode curiosity hook text · Tier descriptors and time estimates · UI copy strings (privacy notice, button labels, welcome hook) |
| **EDIT WITH CARE — verify after** | Episode names (shown in UI — update the episode map legend and curiosity hook header simultaneously) · Tier CTA labels (verify the welcome screen renders correctly after edit) · ui-copy.json strings used in Sentry error messages (verify error messages still make sense) |
| **NEVER edit without developer review** | Question id values (primary keys — changing breaks Supabase response records) · option code values (A, B, C... — changing breaks Supabase answer\_code records and PostHog events) · taxonomy\_code values (foreign keys to intent\_category — changing breaks dashboard and results screen) · routing\_flag values (breaks Module 5 routing) · none\_option\_code (breaks none\_flag records) · branching.json intent code keys (breaks Module 5 routing for all sessions) · taxonomy.json code keys (breaks dashboard category encoding) |

**WARN: Changing any field marked 'NEVER edit without developer review' during a live pilot will corrupt the research dataset. Existing session records in Supabase will reference codes that no longer match the JSON. The Pilot Debrief Report will be unable to correctly categorise those sessions. If such a change is needed, the pilot must be paused, the change made, and data re-validated before the pilot resumes.**

# 5. Phase 1b Migration Procedure (Sprint 3 Step S3-11)

The Strangler Fig migration is executed by the AI Developer in Sprint 3 after the full 79-question instrument has been verified against the 84-path test matrix. This section documents the procedure so the Lead Researcher can verify it was executed correctly.

## 5.1 Migration Steps

| **Step** | **Action** |
| --- | --- |
| **Step 1 — Extract questions.json** | All 80 question objects from questionnaire.js questions array are extracted into src/data/questions.json. The JSON structure is identical to the JavaScript object structure — field names unchanged, values unchanged. The only difference: JSON uses double quotes for all strings and keys, and has no trailing commas. |
| **Step 2 — Extract episodes.json** | The episodes object from questionnaire.js is extracted to src/data/episodes.json. All 7 episode objects with episode number, name, module mappings, curiosity hook text, and curiosity hook subtext. |
| **Step 3 — Extract tiers.json** | The tiers object is extracted to src/data/tiers.json. All three tier objects with name, descriptor, timeEstimate, questionCount, ctaLabel, colorToken. |
| **Step 4 — Extract ui-copy.json** | All UI copy strings from the uiCopy object are extracted to src/data/ui-copy.json. Every string a respondent sees that is not a question — welcome hook, privacy notice, button labels, error messages. |
| **Step 5 — Extract branching.json** | The branching object is extracted to src/data/branching.json. The complete Module 5 routing table — all 12 intent code mappings and secondary purpose rules. |
| **Step 6 — Extract taxonomy.json** | The taxonomy object is extracted to src/data/taxonomy.json. All 12 intent taxonomy code definitions. |
| **Step 7 — Update application imports** | The useQuestionnaire hook is updated to import from the 6 JSON files instead of questionnaire.js. All other components that import from useQuestionnaire are unchanged — the hook's API does not change. |
| **Step 8 — Activate configuration validator** | The configuration validator is enabled in src/main.jsx. It now runs on every application load as the second operation (after Sentry.init()). |
| **Step 9 — Retain questionnaire.js** | questionnaire.js is NOT deleted. It is retained in src/data/ as a reference artifact — the original source of truth for the migration. It is marked in a comment at the top: 'REFERENCE ONLY — this file is no longer the content source. Content is now in src/data/\*.json'. |
| **Step 10 — Commit and verify** | All 6 JSON files and the updated useQuestionnaire hook are committed together in a single commit: 'Phase 1b: Strangler Fig migration complete — content moved to JSON config files.' GitHub Actions deploys. Identical-behavior verification (S3-12) begins immediately. |

## 5.2 Migration Quality Checks

During the extraction, the AI Developer reads every question and answer option carefully to structure them correctly in JSON. This careful reading functions as a structured instrument quality review — content inconsistencies not visible when reading questionnaire.js as code become apparent when reading questions.json as structured data.

- All 80 question objects present: Q0 + Q1 through Q79
- All 13 fields present on every question — no field omitted
- No trailing commas in any JSON file (JSON syntax error)
- All string values in double quotes (not single quotes)
- taxonomy\_code values on Q1 options match exactly the keys in taxonomy.json
- Module 5 section identifiers (5A through 5G) match exactly the keys in branching.json
- tiers arrays reference only 'amateur', 'professional', 'expert' — no other values
- scale\_labels arrays on all scale questions have exactly 5 elements

# 6. Phase 2 — Supabase CMS and Visual Admin Interface

**Phase 2 Supabase CMS + visual admin interface at /admin**

Phase 2 content management moves content from JSON files to a Supabase database table, with a visual admin interface that allows form-based editing without any file access. This is explicitly out of scope for Phase 1 and is documented here to inform Phase 2 Sprint 0 planning.

INFO: The Phase 1 architecture is specifically designed so that Phase 2 adoption is a mechanical migration, not a redesign. Components already accept content as props. The useQuestionnaire hook already provides a single abstraction layer. In Phase 2, the hook is updated to fetch from Supabase instead of reading from JSON files. No component changes.

## 6.1 Phase 2 Feature Scope

| **Feature** | **Scope** |
| --- | --- |
| **Visual admin interface** | /admin route (currently out of scope — NFR-013 specifies no /admin URL in Phase 1). Form-based question editing: text fields for retrospective and anticipatory variants, dropdown for tier assignment, checkbox for none option, text area for researcher note. Draft/publish workflow so edits can be reviewed before going live. Drag-and-drop option reordering within questions. |
| **Supabase content tables** | A questions table mirroring the questionnaire.js structure. A content\_versions table for audit trail. Schema designed to accept the JSON file structure directly — Phase 1b extraction is used as the seed data. Migration from JSON to Supabase is a one-time import script. |
| **Validation improvements** | The visual admin interface validates option code uniqueness, routing rule integrity (changes to option codes trigger a routing rule check), and taxonomy code references. These are the semantic validations the Phase 1b configuration validator cannot perform. |
| **Authentication requirement** | The /admin route requires authentication. Phase 2 activates Supabase Auth (currently in bypass mode via VITE\_FEATURE\_AUTH\_ENABLED=false feature flag). The feature flag activation is the only code change needed — the auth infrastructure is already in place. |
| **Multi-property content** | In Phase 2, different properties may need different questionnaire variants. The Supabase content table includes a property\_id column. The admin interface allows property-specific overrides of individual questions while retaining the base instrument. |

## 6.2 Migration Path from Phase 1b to Phase 2

The Phase 1b to Phase 2 migration follows the same Strangler Fig pattern:

- Step 1: Seed the Supabase questions table from the 6 JSON files. One-time import script. Data integrity verified by comparing row counts and spot-checking content.
- Step 2: Update useQuestionnaire hook to fetch from Supabase instead of reading JSON files. The hook's external API is unchanged — all components continue working without modification.
- Step 3: Build the /admin interface. Activate VITE\_FEATURE\_AUTH\_ENABLED=true.
- Step 4: Retain the JSON files as a fallback. If the Supabase content fetch fails, the hook falls back to JSON files. This is the offline resilience pattern — the same principle as the offline response queue.
- Step 5: After Phase 2 is stable, deprecate the JSON files and remove the fallback.

# 7. Risk Register Entries

Two risks in the Project Charter v2.1 Risk Register relate directly to content management. They are documented here with their specific mitigations.

| **Risk** | **Detail and Mitigation** |
| --- | --- |
| **R — Config file corruption (Medium / Medium)** | Risk: a malformed JSON file (missing comma, incorrect encoding) causes the application to fail on load. Mitigation: configuration validator catches this before any respondent sees it. Recovery: git revert HEAD in under 30 seconds, GitHub Actions redeploys in under 2 minutes. No respondent data is lost — Supabase is unaffected by a JSON error in the application. |
| **R — Logic error in valid JSON (Medium / Medium)** | Risk: a syntactically valid JSON edit changes a semantic identifier (option code, taxonomy code, routing rule) that breaks downstream logic. Mitigation: UC-05 Extension 2 documents this risk explicitly. The 'what not to edit' guidance in Section 4.2 is the primary control. Phase 2 visual admin interface with semantic validation is the permanent fix. Recovery: git revert HEAD — but affected sessions in Supabase may have inconsistent data if the logic error was present during active pilot sessions. |
| **R — Phase 1b migration introduces content errors (Low / High)** | Risk: the Strangler Fig extraction from questionnaire.js to JSON introduces subtle errors — a question rephased during formatting, an answer option missing. Mitigation: the identical-behavior verification (S3-12) with 10 question cross-reference and full 84-path matrix re-run is specifically designed to catch this. The Sprint 3 Gate cannot pass without S3-12 complete. |

# 8. Content Management Sprint Timeline

| **Sprint** | **Content Management Activity** |
| --- | --- |
| **Sprint 0 (now)** | This document produced and approved. questionnaire.js data structure specification scope confirmed. FR-028, FR-083, FR-084, FR-085, NFR-034 locked in SRS-F v2.0. |
| **Sprint 1 — S1-08** | questionnaire.js data structure specification produced (5 SP). Complete 13-field structure for all 80 questions specified as a developer contract. The useQuestionnaire hook architecture defined. Component content contract rules established. |
| **Sprint 2** | questionnaire.js created with all 80 question objects in Phase 1a format. useQuestionnaire hook implemented. All components verified to accept content as props — zero hardcoded strings. ESLint no-hardcoded-strings rule active in CI/CD. |
| **Sprint 3 — S3-11 + S3-12** | Phase 1b Strangler Fig migration executed (S3-11, 8 SP). All content extracted from questionnaire.js to 6 JSON files. Configuration validator activated. Identical-behavior verification completed (S3-12, 5 SP). 10 question cross-reference and 84-path matrix re-run pass. Sprint 3 Gate requires both stories complete. |
| **Sprint 4 onwards** | Content management is stable. Any content edits by the Lead Researcher follow the UC-05 researcher journey in Section 4. The configuration validator protects every deployment. questionnaire.js retained as reference. |
| **Phase 2 Sprint 0** | Content management scope review: visual admin CMS build, Supabase content table schema, migration from JSON to Supabase, /admin authentication. Estimated at 3–4 sprint stories minimum. |

# 9. Version Log

| **Ver.** | **Date** | **By** | **Change** |
| --- | --- | --- | --- |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

**— END OF CONTENT MANAGEMENT STRATEGY DOCUMENT v1.0 —**

*GuestIQ · Content Management Strategy Document v1.0 · S0-3.5 · Sprint 0 Artifact · Confidential*