# questionnaire_js_data_structure_v10

*Document Type: DOCX*

## Table of Contents

  - [**QUESTIONNAIRE.JS DATA STRUCTURE SPECIFICATION**](#questionnairejs-data-structure-specification)
    - [**GuestIQ**** — Sprint 1 Developer Contract for Sprint 2 Build**](#guestiq--sprint-1-developer-contract-for-sprint-2-build)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Criticality**](#criticality)
  - [**Fields Specified**](#fields-specified)
  - [**Phase Design**](#phase-design)
  - [**Related Documents**](#related-documents)
  - [**Document Location**](#document-location)
    - [**CRITICAL****:  This**** document is the developer contract for Sprint 2 step S2-2.2. The AI Developer creates questionnaire.js following this specification exactly. No fields may be added or removed without Lead Researcher approval. The Phase 1b Strangler Fig migration translates this structure directly into JSON — any deviation here creates migration debt in Sprint 3.**](#critical--this-document-is-the-developer-contract-for-sprint-2-step-s2-22-the-ai-developer-creates-questionnairejs-following-this-specification-exactly-no-fields-may-be-added-or-removed-without-lead-researcher-approval-the-phase-1b-strangler-fig-migration-translates-this-structure-directly-into-json--any-deviation-here-creates-migration-debt-in-sprint-3)
- [1. File Structure Overview](#1-file-structure-overview)
  - [1.1 Top-Level Key Specification](#11-top-level-key-specification)
  - [**Top-Level Key**](#top-level-key)
  - [**Type**](#type)
  - [**Phase 1b File**](#phase-1b-file)
  - [**Contents**](#contents)
  - [**questions**](#questions)
  - [**episodes**](#episodes)
  - [**tiers**](#tiers)
  - [**uiCopy**](#uicopy)
  - [**branching**](#branching)
  - [**taxonomy**](#taxonomy)
- [2. Question Object — 13 Required Fields](#2-question-object--13-required-fields)
  - [**Field**](#field)
  - [**Type**](#type)
  - [**Required**](#required)
  - [**Phase**](#phase)
  - [**Description and Valid Values**](#description-and-valid-values)
  - [**id**](#id)
  - [**String**](#string)
  - [**MUST**](#must)
  - [**module**](#module)
  - [**Integer**](#integer)
  - [**MUST**](#must)
  - [**section**](#section)
  - [**String**](#string)
  - [**MUST**](#must)
  - [**tiers**](#tiers)
  - [**Array**](#array)
  - [**MUST**](#must)
  - [**type**](#type)
  - [**String**](#string)
  - [**MUST**](#must)
  - [**text**](#text)
  - [**Object**](#object)
  - [**MUST**](#must)
  - [**instruction**](#instruction)
  - [**String | null**](#string--null)
  - [**MUST**](#must)
  - [**options**](#options)
  - [**Array**](#array)
  - [**MUST**](#must)
  - [**has_none_option**](#has_none_option)
  - [**Boolean**](#boolean)
  - [**MUST**](#must)
  - [**max_selections**](#max_selections)
  - [**Integer | null**](#integer--null)
  - [**MUST**](#must)
  - [**researcher_note**](#researcher_note)
  - [**String | null**](#string--null)
  - [**MUST**](#must)
  - [**routes_module_5**](#routes_module_5)
  - [**Boolean**](#boolean)
  - [**MUST**](#must)
  - [**module_5_code**](#module_5_code)
  - [**String | null**](#string--null)
  - [**MUST**](#must)
    - [**WARN****:  The**** options array for scale_5 questions uses option objects to define scale point labels — not answer choices. Each of the five option objects has: code ('1' through '5'), ****taxonomy_code**** (null), text (the label shown under that scale point, e.g. 'Not important'). The Question component renders these as column headers in the scale table.**](#warn--the-options-array-for-scale_5-questions-uses-option-objects-to-define-scale-point-labels--not-answer-choices-each-of-the-five-option-objects-has-code-1-through-5-taxonomy_code-null-text-the-label-shown-under-that-scale-point-eg-not-important-the-question-component-renders-these-as-column-headers-in-the-scale-table)
- [3. Worked Examples — Three Complete Question Objects](#3-worked-examples--three-complete-question-objects)
  - [3.1 Q0 — Tense Routing Gate (QR1)](#31-q0--tense-routing-gate-qr1)
  - [3.2 Q1 — Primary Stay Purpose (Intent Capture)](#32-q1--primary-stay-purpose-intent-capture)
  - [3.3 Q12 — Scale Question Example](#33-q12--scale-question-example)
- [4. episodes Array Specification](#4-episodes-array-specification)
- [5. tiers Object Specification](#5-tiers-object-specification)
- [6. uiCopy Object Specification](#6-uicopy-object-specification)
- [7. branching Object Specification](#7-branching-object-specification)
- [8. taxonomy Object Specification](#8-taxonomy-object-specification)
- [9. Migration Path — Phase 1a to Phase 1b to Phase 2](#9-migration-path--phase-1a-to-phase-1b-to-phase-2)
  - [**Phase**](#phase)
  - [**Source**](#source)
  - [**Implementation**](#implementation)
  - [**Migration Effort**](#migration-effort)
- [10. Review Checklist](#10-review-checklist)
  - [**Check**](#check)
  - [**Verification**](#verification)
  - [**Check 1 — All 13 fields present**](#check-1--all-13-fields-present)
  - [**Check 2 — Q0 worked example correct**](#check-2--q0-worked-example-correct)
  - [**Check 3 — Q1 taxonomy codes match BLS**](#check-3--q1-taxonomy-codes-match-bls)
  - [**Check 4 — Scale ****example**** correct**](#check-4--scale-example-correct)
  - [**Check 5 — module5Routes matches BLS**](#check-5--module5routes-matches-bls)
  - [**Check 6 — Phase 1b file names**](#check-6--phase-1b-file-names)
    - [**Check 7 — ****uiCopy**** includes voluntary participation text**](#check-7--uicopy-includes-voluntary-participation-text)
- [11. Version Log](#11-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
    - [**— END OF QUESTIONNAIRE.JS DATA STRUCTURE SPECIFICATION v1.0 —**](#-end-of-questionnairejs-data-structure-specification-v10-)

## **QUESTIONNAIRE.JS DATA STRUCTURE SPECIFICATION**

### **GuestIQ**** — Sprint 1 Developer Contract for Sprint 2 Build**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Lead Researcher approval before Sprint 2 begins


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Criticality****

CRITICAL — This document and the Branching Logic Specification must both be explicitly approved before Sprint 2 begins. The AI Developer implements questionnaire.js strictly from this spec.


**## **Fields Specified****

13 question object fields + 6 top-level keys + 3 complete worked examples


**## **Phase Design****

Phase 1a: questionnaire.js (hardcoded JS) · Phase 1b: 6 JSON files (same structure) · Phase 2: Supabase table (same field names)


**## **Related Documents****

SRS-F v2.0 Section 4 · Content Management Strategy v1.0 Section 2 · Branching Logic Spec v1.0 Section 3


**## **Document Location****

01-Sprint-1 / AI-Outputs / Questionnaire-JS-Data-Structure-v1.0.docx




### **CRITICAL****:  This**** document is the developer contract for Sprint 2 step S2-2.2. The AI Developer creates questionnaire.js following this specification exactly. No fields may be added or removed without Lead Researcher approval. The Phase 1b Strangler Fig migration translates this structure directly into JSON — any deviation here creates migration debt in Sprint 3.**

INFO:  The questionnaire.js file will contain all 80 question objects (Q0 + Q1–Q79), the episodes array, the tiers object, the uiCopy object, the branching object, and the taxonomy object. Section 3 shows worked examples for three representative questions. Sections 4–7 specify the remaining top-level keys in detail.


# 1. File Structure Overview

src/data/questionnaire.js exports a single default object. This object has six top-level keys. All application content flows from this one file in Phase 1a — no component contains any content directly.


// src/data/questionnaire.js

// GuestIQ Phase 1a — All questionnaire content in one file

// Phase 1b: content extracted to 6 JSON files (same structure)

// Phase 2: content moves to Supabase questions table (same field names)


const questionnaire = {

questions:  [...],  // Array of 80 question objects (Q0 + Q1–Q79)

episodes:   [...],  // Array of 7 episode objects

tiers:      {...},  // Object: amateur, professional, expert

uiCopy:     {...},  // Object: all UI strings not in questions

branching:  {...},  // Object: Module 5 routing rules

taxonomy:   {...},  // Object: taxonomy code → human-readable name

};


export default questionnaire;


## 1.1 Top-Level Key Specification

| ## **Top-Level Key** | ## **Type** | ## **Phase 1b File** | ## **Contents** |
| --- | --- | --- | --- |
| ## **questions** | Array | questions.json | 80 question objects: Q0 (QR1, tense routing) + Q1–Q79 (instrument). Each object has all 13 fields. This is the primary content source for all question rendering. |
| ## **episodes** | Array | episodes.json | 7 episode objects. Fields per object: number (1–7), name (string — shown in episode map), moduleMappings (array of module numbers), curiosityHookText (string — body of curiosity hook screen), curiosityHookSubtext (string or null — secondary line). |
| ## **tiers** | Object | tiers.json | Three keys: 'amateur', 'professional', 'expert'. Each contains: name (string — 'Amateur'), descriptor (string — shown on tier card), timeEstimate (string — '~5 minutes'), questionCount (integer), ctaLabel (string — 'Start as Amateur'), colorToken (string — CSS token name). |
| ## **uiCopy** | Object | ui-copy.json | All UI strings not in questions. Keys: welcomeHookText, welcomeContextStatement, privacyNoticeText, voluntaryParticipationText, mostSelectedBadgeText, skipButtonLabel, notNowLinkLabel, disambiguationResumeText, disambiguationNewSessionText, downtimeMessageText, configErrorPrefix, enrichmentTitle, enrichmentSubtitle, enrichmentSkipLabel. |
| ## **branching** | Object | branching.json | Module 5 routing rules. Two sub-objects: module5Routes (maps 12 taxonomy codes to sub-section IDs '5A'–'5G') and q2Routes (maps Q2 answer codes to secondary taxonomy codes). Also contains: sameSectionSkipRule (boolean — always true). |
| ## **taxonomy** | Object | taxonomy.json | Maps all 12 taxonomy code strings to human-readable category names and short descriptions. Used on the results screen and in dashboard panels. Example: 'WORK-TRANS' → { name: 'Business Travel', description: 'Work-related stay for meetings or site visits' }. |




DEV:  The useQuestionnaire hook (src/hooks/useQuestionnaire.js) is the only file that imports questionnaire.js. It provides all six keys to components as a structured return value. No component imports questionnaire.js directly. This is the enforcement boundary for the Strangler Fig pattern.


# 2. Question Object — 13 Required Fields

Every question object in the questions array must have exactly these 13 fields. Missing fields cause runtime errors in Phase 1a and configuration validator failures in Phase 1b. Extra fields are silently ignored in Phase 1a but must not be added without approval — they create migration friction.


| ## **Field** | ## **Type** | ## **Required** | ## **Phase** | ## **Description and Valid Values** |
| --- | --- | --- | --- | --- |
| ## **id** | ## **String** | ## **MUST** | All | Unique question identifier. Format: 'QR1' for Q0 (tense routing gate), 'Q1' through 'Q79' for instrument questions. This is the primary key written to the responses table question_id field. Must be unique across all 80 objects. |
| ## **module** | ## **Integer** | ## **MUST** | All | Module number 0–7. Q0 has module=0. Q1–Q9 have module=1. Q10–Q18 have module=2. Q19–Q30 have module=3. Q31–Q38 have module=4. Q39–Q56 have module=5. Q57–Q66 have module=6. Q67–Q79 have module=7. Used for episode mapping and progress bar calculation. |
| ## **section** | ## **String** | ## **MUST** | All | Section within module. Matches the questionnaire document section labels. Q0='0'. Examples: '1A' (Module 1A — Primary Stay Purpose), '1B' (Module 1B — Trigger and Planning), '2A', '3B', '5A', '5B', etc. Used for grouping in dashboard analytics. |
| ## **tiers** | ## **Array** | ## **MUST** | All | Which tiers include this question. Valid values: 'amateur', 'professional', 'expert'. Q0 always includes all three: ['amateur','professional','expert']. Q1 always includes all three (it is the intent capture question for all tiers). Other questions specify their tier subset. The application silently skips questions where the current session tier is not in this array. |
| ## **type** | ## **String** | ## **MUST** | All | Question rendering type. Valid values: 'single_select' (one option selected), 'multi_select' (one or more options selected up to max_selections), 'scale_5' (five-point Likert scale rendered as horizontal table), 'open_text' (Q0 Option D free-text field). The Question component renders different UI based on this field. |
| ## **text** | ## **Object** | ## **MUST** | All | Question text in both tenses. Must have exactly two keys: 'retrospective' (string — past tense phrasing) and 'anticipatory' (string — future/conditional tense phrasing). Both keys must always be present. For Q0, the text is identical in both tenses. The application selects the correct variant based on session.tense_frame. |
| ## **instruction** | ## **String | null** | ## **MUST** | All | Optional instruction line shown below the question text. Null if no instruction is needed. Examples: 'Select up to three.' (multi_select), 'Select all that apply — rank your top two if possible.' Used for multi_select guidance and special instructions. |
| ## **options** | ## **Array** | ## **MUST** | All | Answer options. Each option is an object with three fields: code (String — single letter 'A' through 'M', used as answer_code in responses table), taxonomy_code (String — research classification code, e.g. 'WORK-TRANS', used as intent_category for Q1), text (String — displayed to respondent). Scale questions use option objects to define the five scale point labels. Open text questions have a single option object with code='D' and text=null. |
| ## **has_none_option** | ## **Boolean** | ## **MUST** | All | Whether to append the 'None of these fit my situation' escape valve as the final option. True for all 79 instrument questions (Q1–Q79). False for Q0 (tense routing gate — respondent must select a tense). When true, the none option renders in a visually distinct style and fires none_flag_selected PostHog event on selection. |
| ## **max_selections** | ## **Integer | null** | ## **MUST** | All | Maximum options selectable for multi_select questions. Null for single_select, scale_5, and open_text questions. Examples: Q4 instruction says 'rank your top two' → max_selections=2. Q11 says 'select up to three' → max_selections=3. Q21 says 'select up to three' → max_selections=3. |
| ## **researcher_note** | ## **String | null** | ## **MUST** | All | Annotation visible only in researcher-facing contexts (dashboard, CSV export metadata). Never rendered to respondents. Examples: 'Q1 is the intent capture question — drives all Module 5 routing.', 'Surfaces accessibility friction without asking about the nature of the requirement.' Null if no note needed. |
| ## **routes_module_5** | ## **Boolean** | ## **MUST** | All | True only for Q1. Signals to the application that this question's answer determines Module 5 routing. False for all other questions. Used by the branching logic to identify when to store intent_category. |
| ## **module_5_code** | ## **String | null** | ## **MUST** | All | For Q1 only: the field name of the option property to read for Module 5 routing. Value is 'taxonomy_code' — the application reads q1Answer.taxonomy_code and uses it as the intent_category key for module5Routes lookup. Null for all questions except Q1. |




### **WARN****:  The**** options array for scale_5 questions uses option objects to define scale point labels — not answer choices. Each of the five option objects has: code ('1' through '5'), ****taxonomy_code**** (null), text (the label shown under that scale point, e.g. 'Not important'). The Question component renders these as column headers in the scale table.**


# 3. Worked Examples — Three Complete Question Objects

Three representative question objects are shown in full. These illustrate every field in context. The AI Developer must produce objects in this exact format for all 80 questions in Sprint 2.


## 3.1 Q0 — Tense Routing Gate (QR1)

Q0 is the only question where has_none_option is false. It is included in all three tiers. routes_module_5 is false — Q0 determines tense_frame, not Module 5 routing.


{

id: 'QR1',

module: 0,

section: '0',

tiers: ['amateur', 'professional', 'expert'],

type: 'single_select',

text: {

retrospective: 'Are you completing this questionnaire about a hotel stay you have recently experienced, or about a stay you are planning or expecting to take?',

anticipatory:  'Are you completing this questionnaire about a hotel stay you have recently experienced, or about a stay you are planning or expecting to take?',

// Q0 text is identical in both tenses — it asks about the respondent's situation

// not about the hotel stay itself

},

instruction: null,

options: [

{

code: 'A',

taxonomy_code: 'RETROSPECTIVE',

text: 'I am reflecting on a stay I have already completed (within the past 90 days)',

},

{

code: 'B',

taxonomy_code: 'ANTICIPATORY',

text: 'I am thinking about a stay I am planning or likely to take in the near future',

},

{

code: 'C',

taxonomy_code: 'RETROSPECTIVE',  // Both defaults to retrospective

text: 'Both — I have recently stayed and have another stay coming up',

},

{

code: 'D',

taxonomy_code: null,

text: 'Other – please specify',  // open text field rendered alongside

},

],

has_none_option: false,  // Q0 MUST be answered — no none option

max_selections: null,

researcher_note: 'Q0 (QR1) determines tense_frame for the entire session. Options A and C → retrospective. Option B → anticipatory. Option D → retrospective (default). Flag Option C and D sessions analytically.',

routes_module_5: false,

module_5_code: null,

},


## 3.2 Q1 — Primary Stay Purpose (Intent Capture)

Q1 is the most important instrument question. Its taxonomy_code value is stored as intent_category in the sessions table and drives all Module 5 routing. routes_module_5 is true only for Q1.


{

id: 'Q1',

module: 1,

section: '1A',

tiers: ['amateur', 'professional', 'expert'],

type: 'single_select',

text: {

retrospective: 'What was the main reason for this hotel stay? Select the one that best fits — even if your stay has more than one purpose.',

anticipatory:  'What is the main reason for this hotel stay? Select the one that best fits — even if your stay has more than one purpose.',

},

instruction: null,

options: [

{ code: 'A', taxonomy_code: 'WORK-TRANS',  text: 'Work or business — meetings, site visits, or client engagements' },

{ code: 'B', taxonomy_code: 'WORK-EVENT',  text: 'Work or business — attending a conference, trade show, or professional event' },

{ code: 'C', taxonomy_code: 'WORK-EXT',    text: 'Work or business — extended assignment or project away from home' },

{ code: 'D', taxonomy_code: 'LEIS-PLAN',   text: 'Leisure — a planned holiday, city break, or vacation' },

{ code: 'E', taxonomy_code: 'LEIS-SOC',    text: 'Leisure — attending a personal event (wedding, reunion, celebration, concert, sports event)' },

{ code: 'F', taxonomy_code: 'LEIS-EXP',    text: 'Leisure — exploring somewhere new, sightseeing, or cultural experience' },

{ code: 'G', taxonomy_code: 'DISP-HOME',   text: 'Personal necessity — my home was / is temporarily unavailable' },

{ code: 'H', taxonomy_code: 'DISP-TRANS',  text: 'Personal necessity — I needed a neutral or private space during a life transition' },

{ code: 'I', taxonomy_code: 'MED',         text: 'Medical or health-related — staying near a hospital, clinic, or treatment facility' },

{ code: 'J', taxonomy_code: 'FAM',         text: 'Family reasons — visiting family or supporting a family situation' },

{ code: 'K', taxonomy_code: 'TRANSIT',     text: 'In transit — passing through, early flight, late arrival, or long layover' },

{ code: 'L', taxonomy_code: 'LOC-ESC',     text: 'A local escape — distance from routine without traveling far from home' },

{ code: 'M', taxonomy_code: null,           text: 'Other – please specify' },

],

has_none_option: true,

max_selections: null,

researcher_note: 'Q1 is the intent capture question. The answer taxonomy_code is stored as intent_category in sessions table and drives all Module 5 routing. Option M (Other) and none option both route to the intent-selection fallback screen.',

routes_module_5: true,   // Q1 ONLY — this field is true only here

module_5_code: 'taxonomy_code',  // read option.taxonomy_code for routing

},


## 3.3 Q12 — Scale Question Example

Scale questions use option objects to define the five scale point labels. The five options are rendered as column headers in a horizontal table with radio buttons, not as a vertical list.


{

id: 'Q12',

module: 2,

section: '2A',

tiers: ['professional', 'expert'],  // NOT in amateur tier

type: 'scale_5',

text: {

retrospective: 'How important was it that the hotel acknowledged your booking and communicated before arrival?',

anticipatory:  'How important is it that the hotel acknowledges your booking and communicates before arrival?',

},

instruction: null,

options: [

// Scale options define column headers — not answer choices

// code is '1'–'5', text is the label shown under each radio button

{ code: '1', taxonomy_code: null, text: 'Not important' },

{ code: '2', taxonomy_code: null, text: 'Slightly important' },

{ code: '3', taxonomy_code: null, text: 'Moderately important' },

{ code: '4', taxonomy_code: null, text: 'Very important' },

{ code: '5', taxonomy_code: null, text: 'Essential' },

],

has_none_option: true,   // Scale questions also have the none escape valve

max_selections: null,    // Null for scale — only one value selected

researcher_note: 'Q12 (QR1 module 2 section 2A). Scale response written to scale_responses table, not responses table.',

routes_module_5: false,

module_5_code: null,

},


# 4. episodes Array Specification

The episodes array contains exactly 7 objects — one per episode. Episode names and curiosity hook text are sourced exclusively from this array. Components never hardcode episode names.


episodes: [

{

number: 1,

name: 'Why You Stay',          // shown in episode map nodes

moduleMappings: [1],            // Module 1 questions belong to Episode 1

curiosityHookText: '...',       // body text of curiosity hook screen

curiosityHookSubtext: '...',    // secondary line (or null)

},

{

number: 2,

name: 'Your Space',

moduleMappings: [3],            // Module 3 (physical environment) is Episode 2

curiosityHookText: '...',

curiosityHookSubtext: null,

},

{

number: 3,

name: 'Before You Arrive',

moduleMappings: [2],            // Module 2 (pre-arrival) is Episode 3

curiosityHookText: '...',

curiosityHookSubtext: null,

},

{

number: 4,

name: 'The Human Element',

moduleMappings: [4],            // Module 4 (service) is Episode 4

curiosityHookText: '...',

curiosityHookSubtext: null,

},

{

number: 5,

name: 'Your Kind of Stay',

moduleMappings: [5],            // Module 5 (intent-specific) is Episode 5

curiosityHookText: '...',

curiosityHookSubtext: null,

},

{

number: 6,

name: 'What It\'s Worth',

moduleMappings: [6],            // Module 6 (value/pricing) is Episode 6

curiosityHookText: '...',

curiosityHookSubtext: null,

},

{

number: 7,

name: 'After the Stay',

moduleMappings: [7],            // Module 7 (post-stay) is Episode 7

// Episode 7 has NO curiosity hook — session completes directly

curiosityHookText: null,

curiosityHookSubtext: null,

},

],


INFO:  Episode names are illustrative — the exact final names will be confirmed during Sprint 2 review. The episode mapping is authoritative: Episode 1=Module 1, Episode 2=Module 3, Episode 3=Module 2, Episode 4=Module 4, Episode 5=Module 5, Episode 6=Module 6, Episode 7=Module 7. This non-sequential order is intentional narrative arc design.


# 5. tiers Object Specification


tiers: {

amateur: {

name: 'Amateur',

descriptor: 'Quick take on the essentials — 8 focused questions',

timeEstimate: '~5 minutes',

questionCount: 8,

ctaLabel: 'Start as Amateur',

colorToken: 'amateur-green',    // CSS custom property: --color-amateur

},

professional: {

name: 'Professional',

descriptor: 'Deeper dive into service and environment — 18 questions',

timeEstimate: '~8 minutes',

questionCount: 18,

ctaLabel: 'Start as Professional',

colorToken: 'professional-blue',

},

expert: {

name: 'Expert',

descriptor: 'The complete picture — all 7 modules, 79 questions',

timeEstimate: '~16 minutes',

questionCount: 79,

ctaLabel: 'Start as Expert',

colorToken: 'expert-purple',

},

},


# 6. uiCopy Object Specification

Every UI string that is not part of a question is stored in uiCopy. Components read from this object via props — never contain literal strings. This is what enables Phase 1b JSON extraction without touching any component.


uiCopy: {

// Welcome screen

welcomeHookText: 'You know hotel guests. What do they actually expect?',

welcomeContextStatement: 'This questionnaire captures what front desk professionals like you know about guest expectations across different stay types.',

privacyNoticeText: 'All answers are anonymous. Your responses contribute to aggregate research only.',

voluntaryParticipationText: 'Participation is voluntary. You may close this page at any time without consequence.',

mostSelectedBadgeText: 'Most selected',


// Navigation

notNowLinkLabel: 'Not now — maybe later',

skipButtonLabel: 'Skip — I\'m done',

continueButtonLabel: 'Continue',


// Disambiguation screen

disambiguationTitle: 'Welcome back',

disambiguationResumeText: 'Resume my session — pick up where I left off',

disambiguationNewSessionText: 'Start fresh — I am someone new',


// Downtime screen

downtimeTitle: 'GuestIQ is temporarily unavailable',

downtimeMessageText: 'Your answers are saved. Please try again in a few minutes.',

downtimeRetryLabel: 'Try again',


// Config error screen (Phase 1b+)

configErrorPrefix: 'Configuration error —',


// Enrichment screen

enrichmentTitle: 'One last thing — help us understand your expertise',

enrichmentSubtitle: 'Optional. Skip anytime.',

enrichmentSkipLabel: 'Skip — I\'m done',

enrichmentYearsLabel: 'Years in hospitality',

enrichmentInteractionsLabel: 'Approximate weekly guest interactions',

enrichmentShiftLabel: 'Primary shift',

},


# 7. branching Object Specification

The branching object contains the complete Module 5 routing rules. This object is extracted to branching.json in Phase 1b. The module5Routes mapping is the developer implementation of the routing table in the Branching Logic Specification Section 3.


branching: {

// Module 5 routing: taxonomy code → sub-section ID

// Must match the Branching Logic Specification exactly (S1-2.1)

module5Routes: {

'WORK-TRANS':  '5A',

'WORK-EVENT':  '5A',

'WORK-EXT':    '5A',

'LEIS-PLAN':   '5B',

'LEIS-SOC':    '5B',

'LEIS-EXP':    '5B',

'DISP-HOME':   '5C',

'DISP-TRANS':  '5C',

'MED':         '5D',

'FAM':         '5E',

'TRANSIT':     '5F',

'LOC-ESC':     '5G',

},


// Q2 secondary purpose routing: Q2 answer code → taxonomy code

// The resolved taxonomy code is then looked up in module5Routes above

q2Routes: {

'A': null,           // No secondary purpose

'B': 'LEIS-PLAN',   // Business primary + personal time

'C': 'WORK-TRANS',  // Leisure primary + work obligations

'D': 'FAM',         // Visiting family + leisure

'E': 'LEIS-EXP',   // Event + exploring

'F': 'MED',         // Downtime around medical commitment

'NONE': null,        // None option on Q2 — no secondary

},


// Same-section skip rule:

// If module5Routes[q1TaxonomyCode] === module5Routes[q2TaxonomyCode]

// → show the sub-section only once. No purpose_expert event fires.

sameSectionSkipEnabled: true,

},


# 8. taxonomy Object Specification


taxonomy: {

'WORK-TRANS':  { name: 'Business Travel',        description: 'Work stays for meetings, site visits, or client engagements' },

'WORK-EVENT':  { name: 'Conference and Events',   description: 'Work stays for conferences, trade shows, or professional events' },

'WORK-EXT':    { name: 'Extended Assignment',     description: 'Extended work stays for projects or assignments away from home' },

'LEIS-PLAN':   { name: 'Planned Leisure',         description: 'Planned holidays, city breaks, or vacations' },

'LEIS-SOC':    { name: 'Social Occasion',         description: 'Leisure stays for personal events: weddings, reunions, celebrations' },

'LEIS-EXP':    { name: 'Exploration',             description: 'Sightseeing, cultural experience, or exploring somewhere new' },

'DISP-HOME':   { name: 'Home Displacement',       description: 'Staying because home is temporarily unavailable' },

'DISP-TRANS':  { name: 'Life Transition',         description: 'Needing a neutral or private space during a personal transition' },

'MED':         { name: 'Medical Adjacent',        description: 'Staying near a hospital, clinic, or health facility' },

'FAM':         { name: 'Family Visit',            description: 'Visiting or supporting family' },

'TRANSIT':     { name: 'In Transit',              description: 'Passing through — early flight, late arrival, or long layover' },

'LOC-ESC':     { name: 'Local Escape',            description: 'Personal retreat close to home for rest or restoration' },

},


# 9. Migration Path — Phase 1a to Phase 1b to Phase 2

The questionnaire.js structure is designed so that each migration is mechanical — a structural translation with no logic changes. The field names in questionnaire.js are the same in all three phases.


| ## **Phase** | ## **Source** | ## **Implementation** | ## **Migration Effort** |
| --- | --- | --- | --- |
| Phase 1a | questionnaire.js | JavaScript object — imported by useQuestionnaire hook. All 6 top-level keys in one file. Components receive content as props from the hook. | Sprint 2 — AI Developer creates this file following this specification. |
| Phase 1b | 6 JSON files | Each top-level key extracted to its own JSON file. Structure is identical — same field names, same nesting. useQuestionnaire hook updated to read JSON files instead. configValidator enabled. | Sprint 3 — AI Developer extracts content from questionnaire.js into 6 JSON files. No component changes. |
| Phase 2 | Supabase questions table | Supabase table with column names matching the 13 question field names. useQuestionnaire hook updated to fetch from Supabase. Visual admin CMS provides UI for editing. | Phase 2 Sprint — seed from JSON files. One-time import. No component changes. |




# 10. Review Checklist

From MDT v5.0: the questionnaire.js data structure must be explicitly approved before Sprint 2 begins. Both this document and the Branching Logic Specification are sprint gate blockers.


**## **Check 1 — All 13 fields present****

Section 2: verify all 13 field names match the SRS-F v2.0 Section 4 field list. No fields added or missing.


**## **Check 2 — Q0 worked example correct****

Section 3.1: verify has_none_option is false, routes_module_5 is false, tiers includes all three. Verify Option C taxonomy_code is 'RETROSPECTIVE' (not 'BOTH').


**## **Check 3 — Q1 taxonomy codes match BLS****

Section 3.2: verify all 12 taxonomy_code values in Q1 options match the routing table in Branching Logic Specification Section 3. WORK-TRANS=A, WORK-EVENT=B, WORK-EXT=C, LEIS-PLAN=D, LEIS-SOC=E, LEIS-EXP=F, DISP-HOME=G, DISP-TRANS=H, MED=I, FAM=J, TRANSIT=K, LOC-ESC=L.


**## **Check 4 — Scale ****example**** correct****

Section 3.3: verify scale_5 type uses code '1'–'5' with text labels. Verify tiers does NOT include 'amateur'. Verify has_none_option is true (scale questions also have the escape valve).


**## **Check 5 — module5Routes matches BLS****

Section 7: verify the module5Routes object is identical to the routing table in Branching Logic Specification Section 3.


**## **Check 6 — Phase 1b file names****

Section 1.1: verify the Phase 1b file names match those in the Content Management Strategy (questions.json, episodes.json, tiers.json, ui-copy.json, branching.json, taxonomy.json).


**### **Check 7 — ****uiCopy**** includes voluntary participation text****

Section 6: verify voluntaryParticipationText is present. Required by UC Specs v2.0 UC-01 and SRS-F FR-008.




# 11. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





### **— END OF QUESTIONNAIRE.JS DATA STRUCTURE SPECIFICATION v1.0 —**

*GuestIQ**  ·**  questionnaire.js Data Structure **Spec  ·**  S1-2.**3  ·**  S1-**08  ·**  CRITICAL **PATH  ·**  Sprint 1 **Artifact  ·**  Confidential*

