# branching_logic_specification_v10

*Document Type: DOCX*

## Table of Contents

  - [**BRANCHING LOGIC SPECIFICATION**](#branching-logic-specification)
  - [**with 84-Path Test Matrix**](#with-84-path-test-matrix)
  - [**GuestIQ — Hotel Guest Expectations Research Application**](#guestiq--hotel-guest-expectations-research-application)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Criticality**](#criticality)
  - [**Paths Documented**](#paths-documented)
  - [**Review Time Required**](#review-time-required)
  - [**Document Location**](#document-location)
  - [**Downstream Artifacts**](#downstream-artifacts)
  - [**Related Documents**](#related-documents)
    - [**CRITICAL:  This document is the developer contract for Sprint 3 Module 5 implementation. The AI Developer implements Module 5 branching strictly from this specification — no assumptions, no interpretation. Every routing decision in the application traces back to a specific row in the matrix in Section 7.**](#critical--this-document-is-the-developer-contract-for-sprint-3-module-5-implementation-the-ai-developer-implements-module-5-branching-strictly-from-this-specification--no-assumptions-no-interpretation-every-routing-decision-in-the-application-traces-back-to-a-specific-row-in-the-matrix-in-section-7)
    - [**WARN:  Sprint 2 gate condition: Branching Logic Specification explicitly approved. Sprint 2 CANNOT begin until this document is approved. This is stated in the MDT v5.0 Sprint 1 Gate checklist. No exceptions.**](#warn--sprint-2-gate-condition-branching-logic-specification-explicitly-approved-sprint-2-cannot-begin-until-this-document-is-approved-this-is-stated-in-the-mdt-v50-sprint-1-gate-checklist-no-exceptions)
- [1. Tier Routing — Questions Per Tier](#1-tier-routing--questions-per-tier)
  - [1.1 Tier Question Counts](#11-tier-question-counts)
  - [**Tier**](#tier)
  - [**Time Estimate**](#time-estimate)
  - [**Question Count**](#question-count)
  - [**Modules Covered**](#modules-covered)
  - [**Module 5 Scope**](#module-5-scope)
  - [**Amateur**](#amateur)
  - [**Professional**](#professional)
  - [**Expert**](#expert)
  - [1.2 Module-by-Module Tier Coverage](#12-module-by-module-tier-coverage)
  - [**Module / Section**](#module--section)
  - [**Questions**](#questions)
  - [**Amateur (8Q)**](#amateur-8q)
  - [**Professional (18Q)**](#professional-18q)
  - [**Expert (79Q)**](#expert-79q)
  - [**Q0 — Tense Routing Gate**](#q0--tense-routing-gate)
  - [**Module 1A — Primary Stay Purpose**](#module-1a--primary-stay-purpose)
  - [**Module 1B — Trigger & Planning**](#module-1b--trigger--planning)
  - [**Module 1C — Party Configuration**](#module-1c--party-configuration)
  - [**Module 1D — Duration**](#module-1d--duration)
  - [**Module 1E — Substitute Consideration**](#module-1e--substitute-consideration)
  - [**Module 2 — Pre-Arrival Expectations**](#module-2--pre-arrival-expectations)
  - [**Module 3 — Physical Environment**](#module-3--physical-environment)
  - [**Module 4 — Service & Interaction**](#module-4--service--interaction)
  - [**Module 5 — Intent-Specific (primary)**](#module-5--intent-specific-primary)
  - [**Module 5 — Intent-Specific (secondary)**](#module-5--intent-specific-secondary)
  - [**Module 6 — Value & Pricing**](#module-6--value--pricing)
  - [**Module 7 — Post-Stay**](#module-7--post-stay)
- [2. Tense Routing — Q0 (QR1) Logic](#2-tense-routing--q0-qr1-logic)
  - [2.1 Q0 Answer Code → Tense Frame Mapping](#21-q0-answer-code--tense-frame-mapping)
  - [**Code**](#code)
  - [**Q0 Answer Text**](#q0-answer-text)
  - [**tense_frame Value**](#tense_frame-value)
  - [**Stored In**](#stored-in)
  - [**Implementation Note**](#implementation-note)
  - [**A**](#a)
  - [**retrospective**](#retrospective)
  - [**B**](#b)
  - [**anticipatory**](#anticipatory)
  - [**C**](#c)
  - [**retrospective**](#retrospective)
  - [**D**](#d)
  - [**retrospective**](#retrospective)
  - [2.2 Tense Frame Application Rule](#22-tense-frame-application-rule)
- [3. Module 5 Routing — Intent Category to Sub-section](#3-module-5-routing--intent-category-to-sub-section)
    - [**CRITICAL:  This routing table is the developer contract for FR-029. The AI Developer implements this table as a lookup object (module5Routes) in questionnaire.js (Phase 1a) and branching.json (Phase 1b). Any deviation from this table is a Critical bug requiring immediate fix.**](#critical--this-routing-table-is-the-developer-contract-for-fr-029-the-ai-developer-implements-this-table-as-a-lookup-object-module5routes-in-questionnairejs-phase-1a-and-branchingjson-phase-1b-any-deviation-from-this-table-is-a-critical-bug-requiring-immediate-fix)
  - [**Code**](#code)
  - [**Q1 Answer**](#q1-answer)
  - [**Taxonomy**](#taxonomy)
  - [**Module 5 Section**](#module-5-section)
  - [**Section Name**](#section-name)
  - [**Questions (Expert full set)**](#questions-expert-full-set)
  - [**A**](#a)
  - [**5A**](#5a)
  - [**Work & Business**](#work--business)
  - [**B**](#b)
  - [**5A**](#5a)
  - [**Work & Business**](#work--business)
  - [**C**](#c)
  - [**5A**](#5a)
  - [**Work & Business**](#work--business)
  - [**D**](#d)
  - [**5B**](#5b)
  - [**Leisure Stays**](#leisure-stays)
  - [**E**](#e)
  - [**5B**](#5b)
  - [**Leisure Stays**](#leisure-stays)
  - [**F**](#f)
  - [**5B**](#5b)
  - [**Leisure Stays**](#leisure-stays)
  - [**G**](#g)
  - [**5C**](#5c)
  - [**Displacement & Necessity**](#displacement--necessity)
  - [**H**](#h)
  - [**5C**](#5c)
  - [**Displacement & Necessity**](#displacement--necessity)
  - [**I**](#i)
  - [**5D**](#5d)
  - [**Medical & Health-Adjacent**](#medical--health-adjacent)
  - [**J**](#j)
  - [**5E**](#5e)
  - [**Family Stays**](#family-stays)
  - [**K**](#k)
  - [**5F**](#5f)
  - [**Transit Stays**](#transit-stays)
  - [**L**](#l)
  - [**5G**](#5g)
  - [**Local Escape**](#local-escape)
  - [3.1 Routing Implementation — Code Contract](#31-routing-implementation--code-contract)
- [4. Secondary Purpose Routing — Q2 Logic](#4-secondary-purpose-routing--q2-logic)
    - [**CRITICAL:  The same-sub-section skip rule is critical: if Q1=LEIS-PLAN (→5B) and Q2=E which maps to LEIS-EXP (→5B), then 5B is shown only ONCE. The application must compare the resolved sub-section codes, not the taxonomy codes. Both LEIS-PLAN and LEIS-EXP resolve to '5B' — identical → skip.**](#critical--the-same-sub-section-skip-rule-is-critical-if-q1leis-plan-5b-and-q2e-which-maps-to-leis-exp-5b-then-5b-is-shown-only-once-the-application-must-compare-the-resolved-sub-section-codes-not-the-taxonomy-codes-both-leis-plan-and-leis-exp-resolve-to-5b--identical--skip)
  - [**Q2 Option**](#q2-option)
  - [**Q2 Answer Text**](#q2-answer-text)
  - [**Triggers 2nd Sub-section?**](#triggers-2nd-sub-section)
  - [**Taxonomy Code**](#taxonomy-code)
  - [**Rule**](#rule)
  - [**A**](#a)
  - [**NO**](#no)
  - [**B**](#b)
  - [**YES — if personal sub-section differs**](#yes--if-personal-sub-section-differs)
  - [**C**](#c)
  - [**YES — if work sub-section differs**](#yes--if-work-sub-section-differs)
  - [**D**](#d)
  - [**YES — if family sub-section differs**](#yes--if-family-sub-section-differs)
  - [**E**](#e)
  - [**YES — if leisure sub-section differs**](#yes--if-leisure-sub-section-differs)
  - [**F**](#f)
  - [**YES — if medical sub-section differs**](#yes--if-medical-sub-section-differs)
  - [**G (none option)**](#g-none-option)
  - [**NO**](#no)
  - [4.1 Secondary Routing Algorithm](#41-secondary-routing-algorithm)
- [5. Tier Upgrade Paths](#5-tier-upgrade-paths)
  - [**Trigger Point**](#trigger-point)
  - [**From Tier**](#from-tier)
  - [**To Tier**](#to-tier)
  - [**Timing**](#timing)
  - [**Branching Effect**](#branching-effect)
- [6. Routing Edge Cases](#6-routing-edge-cases)
  - [**Edge Case**](#edge-case)
  - [**Scenario**](#scenario)
  - [**Expected Behaviour**](#expected-behaviour)
  - [**Test Path**](#test-path)
- [7. 84-Path Test Matrix](#7-84-path-test-matrix)
  - [**Amateur paths (PATH-001 to PATH-036)**](#amateur-paths-path-001-to-path-036)
  - [**Professional paths (PATH-013 to PATH-024)**](#professional-paths-path-013-to-path-024)
  - [**Expert paths (PATH-025 to PATH-036 + more)**](#expert-paths-path-025-to-path-036--more)
  - [**Retrospective tense paths**](#retrospective-tense-paths)
  - [**Anticipatory tense paths**](#anticipatory-tense-paths)
  - [**Edge case paths**](#edge-case-paths)
  - [**Path ID**](#path-id)
  - [**Tier**](#tier)
  - [**Intent Category**](#intent-category)
  - [**Q1 Code**](#q1-code)
  - [**Tense Frame**](#tense-frame)
  - [**Expected Mod 5**](#expected-mod-5)
  - [**2nd Sub-section**](#2nd-sub-section)
  - [**Verification Step**](#verification-step)
  - [**Pass/Fail**](#passfail)
  - [**PATH-001**](#path-001)
  - [**PATH-002**](#path-002)
  - [**PATH-003**](#path-003)
  - [**PATH-004**](#path-004)
  - [**PATH-005**](#path-005)
  - [**PATH-006**](#path-006)
  - [**PATH-007**](#path-007)
  - [**PATH-008**](#path-008)
  - [**PATH-009**](#path-009)
  - [**PATH-010**](#path-010)
  - [**PATH-011**](#path-011)
  - [**PATH-012**](#path-012)
  - [**PATH-013**](#path-013)
  - [**PATH-014**](#path-014)
  - [**PATH-015**](#path-015)
  - [**PATH-016**](#path-016)
  - [**PATH-017**](#path-017)
  - [**PATH-018**](#path-018)
  - [**PATH-019**](#path-019)
  - [**PATH-020**](#path-020)
  - [**PATH-021**](#path-021)
  - [**PATH-022**](#path-022)
  - [**PATH-023**](#path-023)
  - [**PATH-024**](#path-024)
  - [**PATH-025**](#path-025)
  - [**PATH-026**](#path-026)
  - [**PATH-027**](#path-027)
  - [**PATH-028**](#path-028)
  - [**PATH-029**](#path-029)
  - [**PATH-030**](#path-030)
  - [**PATH-031**](#path-031)
  - [**PATH-032**](#path-032)
  - [**PATH-033**](#path-033)
  - [**PATH-034**](#path-034)
  - [**PATH-035**](#path-035)
  - [**PATH-036**](#path-036)
  - [**PATH-037**](#path-037)
  - [**PATH-038**](#path-038)
  - [**PATH-039**](#path-039)
  - [**PATH-040**](#path-040)
  - [**PATH-041**](#path-041)
  - [**PATH-042**](#path-042)
  - [**PATH-043**](#path-043)
  - [**PATH-044**](#path-044)
  - [**PATH-045**](#path-045)
  - [**PATH-046**](#path-046)
  - [**PATH-047**](#path-047)
  - [**PATH-048**](#path-048)
  - [**PATH-049**](#path-049)
  - [**PATH-050**](#path-050)
  - [**PATH-051**](#path-051)
  - [**PATH-052**](#path-052)
  - [**PATH-053**](#path-053)
  - [**PATH-054**](#path-054)
  - [**PATH-055**](#path-055)
  - [**PATH-056**](#path-056)
  - [**PATH-057**](#path-057)
  - [**PATH-058**](#path-058)
  - [**PATH-059**](#path-059)
  - [**PATH-060**](#path-060)
  - [**PATH-061**](#path-061)
  - [**PATH-062**](#path-062)
  - [**PATH-063**](#path-063)
  - [**PATH-064**](#path-064)
  - [**PATH-065**](#path-065)
  - [**PATH-066**](#path-066)
  - [**PATH-079**](#path-079)
  - [**PATH-080**](#path-080)
  - [**PATH-081**](#path-081)
  - [**PATH-082**](#path-082)
  - [**PATH-083**](#path-083)
  - [**PATH-084**](#path-084)
  - [7.1 Pass/Fail Recording Instructions](#71-passfail-recording-instructions)
- [8. S1-2.2 Review Checklist — 1.5 Hour Review](#8-s1-22-review-checklist--15-hour-review)
    - [**WARN:  This is the most critical review in the project. Do not rush. Block 1.5 hours. An error left here will surface during the pilot when real respondents are using the application.**](#warn--this-is-the-most-critical-review-in-the-project-do-not-rush-block-15-hours-an-error-left-here-will-surface-during-the-pilot-when-real-respondents-are-using-the-application)
  - [**Check**](#check)
  - [**Verification Steps**](#verification-steps)
  - [**Check 1 — Tier question counts**](#check-1--tier-question-counts)
  - [**Check 2 — Q0 tense frame mapping**](#check-2--q0-tense-frame-mapping)
  - [**Check 3 — All 12 Module 5 routing entries**](#check-3--all-12-module-5-routing-entries)
  - [**Check 4 — Q2 secondary purpose logic**](#check-4--q2-secondary-purpose-logic)
  - [**Check 5 — Tier upgrade paths**](#check-5--tier-upgrade-paths)
  - [**Check 6 — Edge cases**](#check-6--edge-cases)
  - [**Check 7 — 10 random matrix rows**](#check-7--10-random-matrix-rows)
- [9. Version Log](#9-version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF BRANCHING LOGIC SPECIFICATION v1.0 —**](#-end-of-branching-logic-specification-v10-)

## **BRANCHING LOGIC SPECIFICATION**

## **with 84-Path Test Matrix**

## **GuestIQ — Hotel Guest Expectations Research Application**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Requires 1.5-hour review by Lead Researcher before Sprint 2 begins


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Criticality****

⚠ HIGHEST — An error in this document becomes a routing bug discovered during the pilot with real respondents. Do not approve without tracing every path in Section 3.


**## **Paths Documented****

84 paths across 7 blocks: 36 base paths + 6 secondary purpose + 12 anticipatory (Expert) + 12 anticipatory (Amateur) + 6 edge cases + 12 tense-frame Expert = 84


**## **Review Time Required****

1.5 hours — from MDT v5.0 step S1-2.2. Block this time before reviewing.


**## **Document Location****

01-Sprint-1 / AI-Outputs / Branching-Logic-Specification-v1.0.docx


**## **Downstream Artifacts****

Sprint 3 S3-1.1: AI implements Module 5 strictly from this document. S3-1.3: 84-path matrix executed against built application. S3-12: Matrix re-executed after Phase 1b JSON migration.


**## **Related Documents****

SRS-F v2.0 FR-029 to FR-032 · questionnaire.js spec (S1-2.3) · Test Plan Section 4




### **CRITICAL:  This document is the developer contract for Sprint 3 Module 5 implementation. The AI Developer implements Module 5 branching strictly from this specification — no assumptions, no interpretation. Every routing decision in the application traces back to a specific row in the matrix in Section 7.**

### **WARN:  Sprint 2 gate condition: Branching Logic Specification explicitly approved. Sprint 2 CANNOT begin until this document is approved. This is stated in the MDT v5.0 Sprint 1 Gate checklist. No exceptions.**


# 1. Tier Routing — Questions Per Tier

Tier routing determines which questions are shown to each respondent. Every question in questionnaire.js has a tiers array specifying which tiers receive it. The application checks this array before rendering each question and silently skips questions not in the current session tier.

Q0 (QR1, tense routing gate) is answered by all tiers before these question counts begin. Q0 is NOT counted in the 8/18/79 question totals — it is answered before tier routing takes effect on instrument questions.


## 1.1 Tier Question Counts

| ## **Tier** | ## **Time Estimate** | ## **Question Count** | ## **Modules Covered** | ## **Module 5 Scope** |
| --- | --- | --- | --- | --- |
| ## **Amateur** | ~5 minutes | 8 questions | Modules 1–4 subset + Module 5 (primary sub-section only, Amateur subset) | Primary sub-section only. Q2 does NOT appear. No secondary purpose routing. |
| ## **Professional** | ~8 minutes | 18 questions | Modules 1–4 full + Module 5 (primary sub-section, Professional questions) | Primary + secondary sub-section (Q2 shown). Q2=A means no second sub-section. |
| ## **Expert** | ~16 minutes | 79 questions | All 7 modules + Module 5 (primary sub-section, full Expert questions) | Primary + secondary sub-section. Q2 shown. All questions in each sub-section. |




## 1.2 Module-by-Module Tier Coverage

This table defines which modules each tier completes. 'Subset' means the tier receives the questions in that module whose tiers array includes that tier — typically fewer questions than the full Expert set. '✓' means the tier completes the full question set for that module.


| ## **Module / Section** | ## **Questions** | ## **Amateur (8Q)** | ## **Professional (18Q)** | ## **Expert (79Q)** |
| --- | --- | --- | --- | --- |
| ## **Q0 — Tense Routing Gate** | QR1 | ✓ (all tiers) | ✓ (all tiers) | ✓ (all tiers) |
| ## **Module 1A — Primary Stay Purpose** | Q1 | ✓ Amateur | ✓ Pro | ✓ Expert |
| ## **Module 1B — Trigger & Planning** | Q3 | ✓ Amateur | ✓ Pro Q3, Q4 | ✓ Expert Q3, Q4 |
| ## **Module 1C — Party Configuration** | Q5 | ✓ Amateur | ✓ Pro Q5, Q6 | ✓ Expert Q5, Q6 |
| ## **Module 1D — Duration** | Q7 | ✓ Amateur | ✓ Pro | ✓ Expert |
| ## **Module 1E — Substitute Consideration** | Q8, Q9 | — | ✓ Pro | ✓ Expert |
| ## **Module 2 — Pre-Arrival Expectations** | Q10–Q18 | — | Q10–Q13 Pro | ✓ Expert Q10–Q18 |
| ## **Module 3 — Physical Environment** | Q19–Q30 | — | Q19–Q23 Pro | ✓ Expert Q19–Q30 |
| ## **Module 4 — Service & Interaction** | Q31–Q38 | — | Q31–Q35 Pro | ✓ Expert Q31–Q38 |
| ## **Module 5 — Intent-Specific (primary)** | Sub-section varies | 1 question Amateur | 3–4 Qs Pro | Full sub-section Expert |
| ## **Module 5 — Intent-Specific (secondary)** | Sub-section varies | — | Q2 shown; 1–2 Qs if triggered | Full 2nd sub-section if triggered |
| ## **Module 6 — Value & Pricing** | Q57–Q66 | — | — | ✓ Expert Q57–Q66 |
| ## **Module 7 — Post-Stay** | Q67–Q79 | — | — | ✓ Expert Q67–Q79 |




INFO:  The exact Amateur and Professional question lists must be verified by the Lead Researcher against the Refined Questionnaire document (hotel_questionnaire.docx) during the S1-2.2 review. The question IDs above are indicative — the questionnaire.js tiers array per question is the authoritative source.


# 2. Tense Routing — Q0 (QR1) Logic

Q0 is the first question answered by every respondent after tier selection. It is rendered identically to all instrument questions using the standard Question component. Q0 determines the tense_frame for the entire session — every subsequent question text is delivered in the selected tense.


## 2.1 Q0 Answer Code → Tense Frame Mapping

| ## **Code** | ## **Q0 Answer Text** | ## **tense_frame Value** | ## **Stored In** | ## **Implementation Note** |
| --- | --- | --- | --- | --- |
| ## **A** | I am reflecting on a stay I have already completed (within the past 90 days) | ## **retrospective** | sessions.tense_frame + responses.tense_frame on every record | Standard retrospective. Past tense question text delivered throughout. |
| ## **B** | I am thinking about a stay I am planning or likely to take in the near future | ## **anticipatory** | sessions.tense_frame + responses.tense_frame on every record | Standard anticipatory. Future/conditional tense question text delivered throughout. |
| ## **C** | Both — I have recently stayed and have another stay coming up | ## **retrospective** | sessions.tense_frame set to 'retrospective' | BOTH option defaults to retrospective. Note in research analysis: Option C sessions use retrospective framing. Flag for analytical distinction. |
| ## **D** | Other – please specify (free text) | ## **retrospective** | sessions.tense_frame set to 'retrospective' | Free text option. Application stores the text in responses table (answer_code='D', free text captured). tense_frame defaults to retrospective per SRS-F. Free text value stored separately. |




## 2.2 Tense Frame Application Rule

The tense_frame value is set ONCE at Q0 and never changes for the duration of the session.
ALL subsequent questions (Q1–Q79) use the tense_frame set at Q0 to select their text variant from questionnaire.js.
The tense_frame is stored in: (1) sessions table tense_frame field (updated after Q0 via updateSession()), (2) every responses record's tense_frame field.
A respondent who selected Option C or D at Q0 receives retrospective-tense question text — identical to a respondent who selected Option A.
Q0 itself is stored in the responses table with question_id='QR1' and the selected answer_code. The tense_frame field on the Q0 response record is populated after updateSession() completes.

# 3. Module 5 Routing — Intent Category to Sub-section

Module 5 routing is the most complex logic in the application. The intent_category is stored at Q1 answer time. When the respondent reaches Module 5 (Episode 5), the application reads intent_category from session state and routes to the correct sub-section. This routing must match the table below exactly.


### **CRITICAL:  This routing table is the developer contract for FR-029. The AI Developer implements this table as a lookup object (module5Routes) in questionnaire.js (Phase 1a) and branching.json (Phase 1b). Any deviation from this table is a Critical bug requiring immediate fix.**


| ## **Code** | ## **Q1 Answer** | ## **Taxonomy** | ## **Module 5 Section** | ## **Section Name** | ## **Questions (Expert full set)** |
| --- | --- | --- | --- | --- | --- |
| ## **A** | WORK-TRANS | ## **5A** | ## **Work & Business** | Q39, Q40, Q41, Q42, Q43 (5 Qs Expert; Amateur/Pro subset) |  |
| ## **B** | WORK-EVENT | ## **5A** | ## **Work & Business** | same 5A sub-section — all three WORK codes route here |  |
| ## **C** | WORK-EXT | ## **5A** | ## **Work & Business** | same 5A sub-section |  |
| ## **D** | LEIS-PLAN | ## **5B** | ## **Leisure Stays** | Q44, Q45, Q46 (3 Qs Expert; Amateur/Pro subset) |  |
| ## **E** | LEIS-SOC | ## **5B** | ## **Leisure Stays** | same 5B sub-section |  |
| ## **F** | LEIS-EXP | ## **5B** | ## **Leisure Stays** | same 5B sub-section |  |
| ## **G** | DISP-HOME | ## **5C** | ## **Displacement & Necessity** | Q47, Q48 (2 Qs Expert; Amateur/Pro subset) |  |
| ## **H** | DISP-TRANS | ## **5C** | ## **Displacement & Necessity** | same 5C sub-section |  |
| ## **I** | MED | ## **5D** | ## **Medical & Health-Adjacent** | Q49, Q50 (2 Qs Expert; Amateur/Pro subset) |  |
| ## **J** | FAM | ## **5E** | ## **Family Stays** | Q51, Q52 (2 Qs Expert; Amateur/Pro subset) |  |
| ## **K** | TRANSIT | ## **5F** | ## **Transit Stays** | Q53, Q54 (2 Qs Expert; Amateur/Pro subset) |  |
| ## **L** | LOC-ESC | ## **5G** | ## **Local Escape** | Q55, Q56 (2 Qs Expert; Amateur/Pro subset) |  |




## 3.1 Routing Implementation — Code Contract

The routing is implemented as a lookup object in questionnaire.js:

module5Routes: {

'WORK-TRANS': '5A',  'WORK-EVENT': '5A',  'WORK-EXT': '5A',

'LEIS-PLAN':  '5B',  'LEIS-SOC':  '5B',  'LEIS-EXP': '5B',

'DISP-HOME':  '5C',  'DISP-TRANS': '5C',

'MED':        '5D',

'FAM':        '5E',

'TRANSIT':    '5F',

'LOC-ESC':    '5G',

}


# 4. Secondary Purpose Routing — Q2 Logic

Q2 (secondary purpose) appears in the Professional and Expert tiers only — not Amateur. If Q2 triggers a different Module 5 sub-section than the primary (from Q1), the respondent completes both sub-sections sequentially: primary first, then secondary. If Q2 maps to the same sub-section as Q1, the secondary sub-section is silently skipped.


### **CRITICAL:  The same-sub-section skip rule is critical: if Q1=LEIS-PLAN (→5B) and Q2=E which maps to LEIS-EXP (→5B), then 5B is shown only ONCE. The application must compare the resolved sub-section codes, not the taxonomy codes. Both LEIS-PLAN and LEIS-EXP resolve to '5B' — identical → skip.**


| ## **Q2 Option** | ## **Q2 Answer Text** | ## **Triggers 2nd Sub-section?** | ## **Taxonomy Code** | ## **Rule** |
| --- | --- | --- | --- | --- |
| ## **A** | There was no secondary purpose | ## **NO** | — | No second sub-section. Q2=A is the explicit 'no secondary' selection. |
| ## **B** | Business primary, personal time around it | ## **YES — if personal sub-section differs** | LEIS-PLAN | Routes to 5B if primary was work (5A). Skip if primary already 5B. |
| ## **C** | Leisure primary, work obligations during stay | ## **YES — if work sub-section differs** | WORK-TRANS | Routes to 5A if primary was leisure (5B). Skip if primary already 5A. |
| ## **D** | Visiting family + personal leisure | ## **YES — if family sub-section differs** | FAM | Routes to 5E. Skip if primary already 5E. |
| ## **E** | Attending event + exploring destination | ## **YES — if leisure sub-section differs** | LEIS-EXP | Routes to 5B. Skip if primary already 5B. |
| ## **F** | Downtime around medical/care commitment | ## **YES — if medical sub-section differs** | MED | Routes to 5D. Skip if primary already 5D. |
| ## **G (none option)** | None of these fit / respondent skips Q2 | ## **NO** | — | No second sub-section triggered. Treated as Q2=A. |




## 4.1 Secondary Routing Algorithm

Step 1: Get primary sub-section from module5Routes[intent_category] — call this primary_section.
Step 2: After primary sub-section complete, check if Q2 answer triggers secondary. If Q2=A or Q2=none-option → no secondary, proceed to Episode 6.
Step 3: Map Q2 answer to secondary taxonomy code using Q2 routing table above. Resolve secondary sub-section from module5Routes[secondary_taxonomy_code] — call this secondary_section.
Step 4: If secondary_section === primary_section → skip. Proceed to Episode 6.
Step 5: If secondary_section !== primary_section → render secondary sub-section questions. Fire PostHog purpose_expert event. Proceed to Episode 6 after secondary complete.
Note: Q2 is only shown to Professional and Expert tier respondents. Amateur tier respondents skip Q2 entirely and complete only one Module 5 sub-section.

# 5. Tier Upgrade Paths

Tier upgrades occur at two trigger points. When accepted, the session tier is updated in Supabase, and the respondent continues answering questions at the new tier level. All answers already given are retained. The respondent does not re-answer any questions from the earlier tier.


| ## **Trigger Point** | ## **From Tier** | ## **To Tier** | ## **Timing** | ## **Branching Effect** |
| --- | --- | --- | --- | --- |
| After Episode 1 complete | Amateur | Professional | After Curiosity Hook for Episode 1 | If accepted: session.tier updated to 'professional' in Supabase. Respondent continues with Professional question set for Episodes 2–5. Q2 now shown in Module 5. If declined: Amateur tier continues. |
| After Episode 4 complete | Professional | Expert | After Curiosity Hook for Episode 4 | If accepted: session.tier updated to 'expert' in Supabase. Respondent continues with Expert question set for Episodes 5–7 (full Module 5 + Modules 6 and 7). If declined: Professional tier continues — no Module 6 or 7. |




INFO:  After a tier upgrade, the questions array is re-evaluated from the current position using the new tier value. Only questions whose tiers array includes the new tier are shown going forward. The respondent does not re-see Module 1–4 questions they already answered at the lower tier — those are already recorded in Supabase.


# 6. Routing Edge Cases


| ## **Edge Case** | ## **Scenario** | ## **Expected Behaviour** | ## **Test Path** |
| --- | --- | --- | --- |
| Q1 None Option selected | Respondent selects 'None of these fit my situation' on Q1 — cannot identify their primary intent. | Application shows an intent-selection screen where the respondent manually selects which Module 5 sub-section is most relevant. This is a manual override — not automatic routing. The manually selected sub-section is used as intent_category for all subsequent routing. none_flag recorded. | PATH-079 |
| Q2 same sub-section as Q1 | Q1=LEIS-PLAN (→5B) and Q2=E which maps to LEIS-EXP (→5B). | 5B sub-section shown exactly once. Secondary sub-section is silently skipped. purpose_expert event does NOT fire. Respondent proceeds to Episode 6 after primary 5B. | PATH-080 (second row of PATH-082) |
| Q0 Option C (Both) | Respondent selects 'Both — recently stayed and have another stay coming up'. | tense_frame stored as 'retrospective'. Question text delivered in retrospective (past) tense. Analytical note: this session should be flagged in research analysis as using Option C. | PATH-083 |
| Q0 Option D (free text) | Respondent enters free text at Q0. | Free text stored as response record (answer_code='D'). tense_frame defaults to 'retrospective'. Question text delivered in retrospective tense. Free text value preserved for research. | PATH-084 |
| Tier upgrade then Q1 routing | Amateur respondent upgrades to Professional at Episode 1 end. What is their Module 5 routing? | Module 5 routing is still determined by their Q1 answer (intent_category already stored). Tier upgrade does not change intent_category. The respondent completes the Professional question set of their Module 5 sub-section. Q2 is now shown (Professional tier). | PATH-081 |
| Expert Q2 same as Q1 | Expert: Q1=WORK-TRANS, Q2=C (also maps to WORK taxonomy code). | Both WORK-TRANS and WORK-EXT map to 5A. Secondary 5A === primary 5A → skip. Respondent sees 5A only once. purpose_expert does NOT fire. | PATH-082 |




# 7. 84-Path Test Matrix

This is the primary functional test instrument for GuestIQ. All 84 paths are executed in Sprint 3 step S3-1.3 against the built application. The matrix is re-executed in Sprint 3 step S3-12 after the Phase 1b JSON migration. Sprint 3 gate cannot pass if any path fails.


| ## **Amateur paths (PATH-001 to PATH-036)**  36 paths | ## **Professional paths (PATH-013 to PATH-024)**  12 of the 36 | ## **Expert paths (PATH-025 to PATH-036 + more)**  included in 36 | ## **Retrospective tense paths**  Blocks 1 and 2 | ## **Anticipatory tense paths**  Blocks 3 and 4 | ## **Edge case paths**  PATH-079 to PATH-084 |
| --- | --- | --- | --- | --- | --- |




INFO:  How to execute: For each path row, open the app, select the tier shown, answer Q0 with the tense frame shown (A=Retrospective, B=Anticipatory, C=Both/Retrospective), answer Q1 with the Q1 Code shown, then verify the first question that appears in Episode 5 belongs to the Expected Module 5 sub-section. Mark Pass or Fail. Log any Fail as Critical immediately.


| ## **Path ID** | ## **Tier** | ## **Intent Category** | ## **Q1 Code** | ## **Tense Frame** | ## **Expected Mod 5** | ## **2nd Sub-section** | ## **Verification Step** | ## **Pass/Fail** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| ## **PATH-001** | Amateur | WORK-TRANS | A | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-002** | Professional | WORK-TRANS | A | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-003** | Expert | WORK-TRANS | A | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-004** | Amateur | WORK-EVENT | B | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-005** | Professional | WORK-EVENT | B | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-006** | Expert | WORK-EVENT | B | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-007** | Amateur | WORK-EXT | C | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-008** | Professional | WORK-EXT | C | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-009** | Expert | WORK-EXT | C | Retrospective | 5A — Work & Business | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-010** | Amateur | LEIS-PLAN | D | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-011** | Professional | LEIS-PLAN | D | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-012** | Expert | LEIS-PLAN | D | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-013** | Amateur | LEIS-SOC | E | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-014** | Professional | LEIS-SOC | E | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-015** | Expert | LEIS-SOC | E | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-016** | Amateur | LEIS-EXP | F | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-017** | Professional | LEIS-EXP | F | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-018** | Expert | LEIS-EXP | F | Retrospective | 5B — Leisure Stays | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-019** | Amateur | DISP-HOME | G | Retrospective | 5C — Displacement | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-020** | Professional | DISP-HOME | G | Retrospective | 5C — Displacement | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-021** | Expert | DISP-HOME | G | Retrospective | 5C — Displacement | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-022** | Amateur | DISP-TRANS | H | Retrospective | 5C — Displacement | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-023** | Professional | DISP-TRANS | H | Retrospective | 5C — Displacement | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-024** | Expert | DISP-TRANS | H | Retrospective | 5C — Displacement | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-025** | Amateur | MED | I | Retrospective | 5D — Medical | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-026** | Professional | MED | I | Retrospective | 5D — Medical | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-027** | Expert | MED | I | Retrospective | 5D — Medical | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-028** | Amateur | FAM | J | Retrospective | 5E — Family | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-029** | Professional | FAM | J | Retrospective | 5E — Family | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-030** | Expert | FAM | J | Retrospective | 5E — Family | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-031** | Amateur | TRANSIT | K | Retrospective | 5F — Transit | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-032** | Professional | TRANSIT | K | Retrospective | 5F — Transit | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-033** | Expert | TRANSIT | K | Retrospective | 5F — Transit | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-034** | Amateur | LOC-ESC | L | Retrospective | 5G — Local Escape | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-035** | Professional | LOC-ESC | L | Retrospective | 5G — Local Escape | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-036** | Expert | LOC-ESC | L | Retrospective | 5G — Local Escape | None | Open app → select tier → Q0: choose A (Retrospective) → Q1: choose answer code shown → reach Module 5 → verify first question is from correct sub-section. |  |
| ## **PATH-037** | Expert | WORK-TRANS | A | Retrospective | 5A — Work & Business | 5B — Leisure (Q2=B) | Expert, Retrospective: Q1=A (WORK-TRANS) → complete 5A → Q2=B → verify 5B sub-section appears next. |  |
| ## **PATH-038** | Expert | LEIS-PLAN | D | Retrospective | 5B — Leisure Stays | 5A — Work (Q2=C) | Expert, Retrospective: Q1=D (LEIS-PLAN) → complete 5B → Q2=C → verify 5A sub-section appears next. |  |
| ## **PATH-039** | Expert | WORK-EXT | C | Retrospective | 5A — Work & Business | 5E — Family (Q2=D) | Expert, Retrospective: Q1=C (WORK-EXT) → complete 5A → Q2=D → verify 5E sub-section appears next. |  |
| ## **PATH-040** | Expert | LEIS-EXP | F | Retrospective | 5B — Leisure Stays | 5B — same (SKIP) | Expert, Retrospective: Q1=F (LEIS-EXP) → complete 5B → Q2=E (also LEIS) → verify 5B NOT shown again (same sub-section skip rule). |  |
| ## **PATH-041** | Expert | LEIS-PLAN | D | Retrospective | 5B — Leisure Stays | 5D — Medical (Q2=F) | Expert, Retrospective: Q1=D (LEIS-PLAN) → complete 5B → Q2=F → verify 5D sub-section appears next. |  |
| ## **PATH-042** | Expert | WORK-TRANS | A | Retrospective | 5A — Work & Business | None (Q2=A) | Expert, Retrospective: Q1=A → complete 5A → Q2=A (no secondary) → verify Module 6 loads directly — no second sub-section. |  |
| ## **PATH-043** | Expert | WORK-TRANS | A | Anticipatory | 5A — Work & Business | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-044** | Expert | WORK-EVENT | B | Anticipatory | 5A — Work & Business | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-045** | Expert | WORK-EXT | C | Anticipatory | 5A — Work & Business | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-046** | Expert | LEIS-PLAN | D | Anticipatory | 5B — Leisure Stays | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-047** | Expert | LEIS-SOC | E | Anticipatory | 5B — Leisure Stays | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-048** | Expert | LEIS-EXP | F | Anticipatory | 5B — Leisure Stays | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-049** | Expert | DISP-HOME | G | Anticipatory | 5C — Displacement | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-050** | Expert | DISP-TRANS | H | Anticipatory | 5C — Displacement | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-051** | Expert | MED | I | Anticipatory | 5D — Medical | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-052** | Expert | FAM | J | Anticipatory | 5E — Family | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-053** | Expert | TRANSIT | K | Anticipatory | 5F — Transit | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-054** | Expert | LOC-ESC | L | Anticipatory | 5G — Local Escape | None | Open app → select Expert → Q0: choose B (Anticipatory) → Q1: choose answer code → verify all question text is in future/conditional tense AND correct Module 5 sub-section loads. |  |
| ## **PATH-055** | Amateur | WORK-TRANS | A | Anticipatory | 5A — Work & Business | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-056** | Amateur | WORK-EVENT | B | Anticipatory | 5A — Work & Business | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-057** | Amateur | WORK-EXT | C | Anticipatory | 5A — Work & Business | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-058** | Amateur | LEIS-PLAN | D | Anticipatory | 5B — Leisure Stays | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-059** | Amateur | LEIS-SOC | E | Anticipatory | 5B — Leisure Stays | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-060** | Amateur | LEIS-EXP | F | Anticipatory | 5B — Leisure Stays | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-061** | Amateur | DISP-HOME | G | Anticipatory | 5C — Displacement | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-062** | Amateur | DISP-TRANS | H | Anticipatory | 5C — Displacement | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-063** | Amateur | MED | I | Anticipatory | 5D — Medical | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-064** | Amateur | FAM | J | Anticipatory | 5E — Family | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-065** | Amateur | TRANSIT | K | Anticipatory | 5F — Transit | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| ## **PATH-066** | Amateur | LOC-ESC | L | Anticipatory | 5G — Local Escape | None | Open app → select Amateur → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense throughout Amateur tier questions. |  |
| Professional | WORK-TRANS | A | Anticipatory | 5A — Work & Business | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | WORK-EVENT | B | Anticipatory | 5A — Work & Business | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | WORK-EXT | C | Anticipatory | 5A — Work & Business | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | LEIS-PLAN | D | Anticipatory | 5B — Leisure Stays | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | LEIS-SOC | E | Anticipatory | 5B — Leisure Stays | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | LEIS-EXP | F | Anticipatory | 5B — Leisure Stays | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | DISP-HOME | G | Anticipatory | 5C — Displacement | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | DISP-TRANS | H | Anticipatory | 5C — Displacement | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | MED | I | Anticipatory | 5D — Medical | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | FAM | J | Anticipatory | 5E — Family | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | TRANSIT | K | Anticipatory | 5F — Transit | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| Professional | LOC-ESC | L | Anticipatory | 5G — Local Escape | None | Open app → select Professional → Q0: choose B (Anticipatory) → Q1: choose answer code → verify question text is anticipatory tense AND correct Module 5 sub-section loads. Q2 shown (Professional tier). |  |  |
| ## **PATH-079** | Expert | — | None selected | NONE (none opt) | Retrospective | Intent selection screen | — | Expert, Retrospective: Q1: select None option → verify application shows intent-selection screen for manual Module 5 sub-section pick. |
| ## **PATH-080** | Professional | WORK-TRANS | A | Retrospective | 5A — Work & Business | — | Professional, Retrospective: complete all Professional questions → verify is_complete=true in Supabase, completed_at populated, localStorage token cleared. |  |
| ## **PATH-081** | Amateur | LEIS-PLAN | D | Retrospective | 5B — Leisure Stays | — | Amateur: Q1=D → verify only Amateur-tier questions appear (Q1, Q3, Q5, Q7 from Module 1, one Module 5B question, Modules 2/3/4 Amateur subset). Verify Q2 does not appear in Amateur flow. |  |
| ## **PATH-082** | Expert | WORK-TRANS | A | Retrospective | 5A — Work & Business | Upgrade from Amateur | Amateur: complete Episode 1 → accept tier upgrade to Professional → confirm session.tier updated in Supabase → continue Professional questions. |  |
| ## **PATH-083** | Expert | LEIS-PLAN | D | Both (→Retro) | 5B — Leisure Stays | — | Expert: Q0 select option C (Both — defaults to Retrospective) → verify tense_frame stored as retrospective → all Module 5B questions in retrospective tense. |  |
| ## **PATH-084** | Professional | FAM | J | Anticipatory | 5E — Family | — | Professional: Q0=B (Anticipatory) → Q1=J (FAM) → Q2 shown to Professional? Verify Q2 appears for Professional tier → Q2=A (no secondary) → Module 5E loads. |  |




## 7.1 Pass/Fail Recording Instructions

For each path: execute the steps in the Verification Step column. Check that the first Module 5 question that renders matches the Expected Module 5 column.
Pass criterion per path: the correct Module 5 sub-section first question renders. Sub-section identity is verified by the question text matching the questionnaire document for that sub-section.
Fail criterion: any wrong sub-section appears, or no Module 5 questions appear when expected, or the application crashes.
Any fail = Critical bug. Log in Bug Log immediately with Path ID, tier, Q1 code, expected sub-section, actual sub-section observed. Do not proceed to Sprint 4 with any unresolved Matrix failures.
Re-execute: after Phase 1b JSON migration (S3-12), all 84 paths are re-executed. Any difference between pre- and post-migration results is a Critical content error introduced during extraction.

# 8. S1-2.2 Review Checklist — 1.5 Hour Review

### **WARN:  This is the most critical review in the project. Do not rush. Block 1.5 hours. An error left here will surface during the pilot when real respondents are using the application.**


**## **Check 1 — Tier question counts****

From Section 1.1: Amateur = 8 questions, Professional = 18 questions, Expert = 79 questions. Open the Refined Questionnaire (hotel_questionnaire.docx). Identify which questions are Amateur-tier, Professional-tier, and Expert-tier by working through the document. Verify the counts match. This is the most time-consuming check but also the most important for data validity.


**## **Check 2 — Q0 tense frame mapping****

From Section 2.1: Option A → retrospective. Option B → anticipatory. Option C → retrospective (both defaults to retro). Option D → retrospective. Verify this matches your understanding of the research design intent.


**## **Check 3 — All 12 Module 5 routing entries****

From Section 3: trace each of the 12 Q1 answer codes (A through L) to their Module 5 sub-section. For each: Q1 answer code → taxonomy code → sub-section letter. Verify against the questionnaire document. Check that WORK-TRANS, WORK-EVENT, and WORK-EXT all route to 5A. Check that LEIS-PLAN, LEIS-SOC, LEIS-EXP all route to 5B. Check remaining single-code categories.


**## **Check 4 — Q2 secondary purpose logic****

From Section 4: Q25A means no secondary. Q2=B maps to LEIS-PLAN taxonomy. Q2=C maps to WORK-TRANS. Q2=D maps to FAM. Q2=E maps to LEIS-EXP. Q2=F maps to MED. Verify the same-sub-section skip rule is clearly stated and implementable.


**## **Check 5 — Tier upgrade paths****

From Section 5: Amateur upgrades after Episode 1, Professional upgrades after Episode 4. Verify the timing is correct. Verify that accepted upgrades update session.tier in Supabase. Verify that intent_category is not changed by a tier upgrade.


**## **Check 6 — Edge cases****

From Section 6: Check all 6 edge cases. The Q1 None Option edge case (intent-selection screen) is the most unusual — verify you understand and agree with the described behaviour. The same-sub-section skip rule for Q2 must be explicitly implementable.


**## **Check 7 — 10 random matrix rows****

From Section 7: Pick 10 paths at random from the 84-path matrix. For each: verify Path ID format is correct, verify the tier matches the block description, verify the Q1 code matches the intent category, verify the Expected Module 5 sub-section matches the routing table in Section 3.




# 9. Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF BRANCHING LOGIC SPECIFICATION v1.0 —**

*GuestIQ  ·  Branching Logic Specification + 84-Path Matrix  ·  S1-2.1  ·  S1-07  ·  CRITICAL PATH  ·  Sprint 1  ·  Confidential*

