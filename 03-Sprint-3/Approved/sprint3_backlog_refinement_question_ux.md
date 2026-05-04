# sprint3_backlog_refinement_question_ux

*Document Type: DOCX*

## Table of Contents

  - [**SPRINT 3 BACKLOG REFINEMENT NOTE**](#sprint-3-backlog-refinement-note)
    - [**Question Interaction Layer — UX Issues Identified in Sprint 2 Review**](#question-interaction-layer--ux-issues-identified-in-sprint-2-review)
  - [**Document Type**](#document-type)
  - [**Raised By**](#raised-by)
  - [**Raised On**](#raised-on)
  - [**Sprint**](#sprint)
  - [**Files Affected**](#files-affected)
  - [**Priority**](#priority)
  - [**Formal Scope Change Required**](#formal-scope-change-required)
  - [**Status**](#status)
  - [**1. Background**](#1-background)
  - [**2. Issues Identified**](#2-issues-identified)
    - [**Issue 1 — Auto-advance on selection creates accidental answer risk**](#issue-1--auto-advance-on-selection-creates-accidental-answer-risk)
    - [**Issue 2 — 'Other – please specify' layout breaks option flow**](#issue-2--other--please-specify-layout-breaks-option-flow)
  - [**Issue 3 — Continue button disabled state is unexplained**](#issue-3--continue-button-disabled-state-is-unexplained)
  - [**3. Combined Issue Summary**](#3-combined-issue-summary)
  - [**#**](#)
  - [**Issue**](#issue)
  - [**Current ****Behaviour**](#current-behaviour)
  - [**Target ****Behaviour**](#target-behaviour)
  - [**1**](#1)
  - [**2**](#2)
  - [**3**](#3)
  - [**4. Proposed Resolution**](#4-proposed-resolution)
  - [**Step 1 — Selection**](#step-1--selection)
  - [**Step 2 — Confirmation**](#step-2--confirmation)
  - [**5. Implementation Assessment**](#5-implementation-assessment)
  - [**Item**](#item)
  - [**Assessment**](#assessment)
  - [**Files to modify**](#files-to-modify)
  - [**New files required**](#new-files-required)
  - [**Story points estimate**](#story-points-estimate)
  - [**Timeline impact**](#timeline-impact)
  - [**Data integrity impact**](#data-integrity-impact)
  - [**Formal scope change required**](#formal-scope-change-required)
  - [**Recommended sprint**](#recommended-sprint)
  - [**Dependency**](#dependency)
  - [**6. Sprint 3 Planning Action**](#6-sprint-3-planning-action)
  - [**7. Approval at Sprint 3 Planning**](#7-approval-at-sprint-3-planning)
  - [**Role**](#role)
  - [**Name & Signature**](#name--signature)
  - [**Date**](#date)
  - [**Lead Researcher**](#lead-researcher)
  - [**Developer (AI Representative)**](#developer-ai-representative)
  - [**— END OF BACKLOG REFINEMENT NOTE —**](#-end-of-backlog-refinement-note-)

## **SPRINT 3 BACKLOG REFINEMENT NOTE**

### **Question Interaction Layer — UX Issues Identified in Sprint 2 Review**


**## **Raised By****

Lead Researcher — Sprint 2 Review


**## **Raised On****

[Date of Sprint 2 Review]


**## **Sprint****

To be addressed in Sprint 3 — Question Component Rebuild


**## **Files Affected****

src/components/question/SingleSelectQuestion.jsx, src/components/question/ScaleQuestion.jsx


**## **Priority****

High — affects data integrity and respondent experience


**## **Formal Scope Change Required****

No — refinement of existing in-scope question component functionality


**## **Status****

NOTED — Pending Sprint 3 Planning approval




INFO:  This note documents three UX issues identified during the Sprint 2 Review walkthrough of the live application at valkhot.github.io/guestiq. All three issues relate to the question interaction layer and will be addressed as a single piece of work in Sprint 3 during the question component rebuild.


## **1. Background**

During the Sprint 2 Review, the Lead Researcher tested the live application and identified usability problems with how questions are presented and how answer selection works. The Sprint 2 question components (SingleSelectQuestion.jsx and ScaleQuestion.jsx) were built as functional scaffolds — they collect data correctly but the interaction design has issues that affect respondent experience and data integrity.

These issues are formally noted here so they are tracked, discussed in Sprint 3 Planning, and addressed before the pilot launch.


## **2. Issues Identified**


### **Issue 1 — Auto-advance on selection creates accidental answer risk**

ISSUE:  Current behaviour: clicking an option immediately advances to the next question with no confirmation step. Accidental clicks cannot be corrected.

When a respondent clicks an answer option, the application immediately moves to the next question. There is no opportunity to review the selection before committing. On a 79-question instrument, accidental clicks are a real data integrity risk — a misclick on Q1 (intent category) would cause incorrect Module 5 routing for the entire session.


TARGET:  Target behaviour: clicking an option highlights it (radio fills, row lights up) but stays on the same screen. A Continue button appears below all options. The respondent clicks Continue to advance. They can change their selection before clicking Continue.


### **Issue 2 — 'Other – please specify' layout breaks option flow**

ISSUE:  Current behaviour: when 'Other – please specify' is selected, a text input and Continue button appear between that option and the 'None of these fit' option below it. This fragments the option list and buries the None option below a button.

The current layout places the Continue button between the 'Other' option and the 'None of these fit' option. This is confusing because it breaks the visual list of answer choices — a respondent could easily miss the None option entirely, which would affect none-flag data quality.


TARGET:  Target behaviour: all answer options (A through last letter, plus None at the bottom) are always listed together as a continuous group. When 'Other – please specify' is selected, the text input appears inline within that option row — below the option text but within the same card. The single Continue button appears below the complete option list, not between options.


## **Issue 3 — Continue button disabled state is unexplained**

ISSUE:  Current behaviour: when 'Other – please specify' is selected, a greyed-out Continue button appears immediately but cannot be clicked until text is typed. There is no explanation of why it is disabled.

A disabled button with no explanation creates a confusing moment — the respondent can see the button but does not know why it does not work. This is a usability anti-pattern sometimes called a 'mystery disability'.


TARGET:  Target behaviour: the Continue button does not appear until a valid selection exists. For 'Other – please specify', the button only appears (and is immediately active) once the text field contains at least one character. No disabled state is shown — the button either exists and works, or does not exist yet.


## **3. Combined Issue Summary**


| ## **#** | ## **Issue** | ## **Current ****Behaviour** | ## **Target ****Behaviour** |
| --- | --- | --- | --- |
| ## **1** | Auto-advance on selection | Click option → immediately advances to next question | Click option → highlights selection → Continue button appears → click Continue to advance |
| ## **2** | 'Other' layout breaks option flow | Text input + Continue button appears between 'Other' option and None option, burying None | All options listed together. Text input appears inline within 'Other' row. Continue button appears after all options. |
| ## **3** | Disabled Continue button unexplained | Continue button appears greyed out when 'Other' selected but no text typed yet | Continue button only appears when a valid selection exists. No disabled state shown. |




## **4. Proposed Resolution**

All three issues are resolved by a single rebuild of the question interaction pattern in Sprint 3. The rebuild implements a consistent two-step interaction model across all question types:


## **Step 1 — Selection**

• Respondent clicks any option → that option highlights (filled radio, blue border, light background tint)

• All other options remain visible and selectable — respondent can change their mind

• For 'Other – please specify': text input appears inline within that option row

• Continue button does not appear yet


## **Step 2 — Confirmation**

• Continue button appears below all options once a valid selection exists

• For 'Other': Continue appears only after text field has content

• Respondent clicks Continue → question advances with animation

• Scale questions (scale_5): Continue appears immediately after a scale point is clicked


INFO:  This pattern is consistent with established survey UX best practices and directly reduces the risk of accidental answer submission on a 79-question research instrument.


## **5. Implementation Assessment**


**## **Files to modify****

SingleSelectQuestion.jsx (primary), ScaleQuestion.jsx (secondary)


**## **New files required****

None


**## **Story points estimate****

2 SP — fits within Sprint 3 scope


**## **Timeline impact****

None — Sprint 3 rebuilds question components as part of full questionnaire delivery


**## **Data integrity impact****

Positive — reduces accidental answer risk on 79-question instrument


**## **Formal scope change required****

No — refinement of existing in-scope functionality (question component)


**## **Recommended sprint****

Sprint 3 — implement during question component rebuild (S3-2.1 or equivalent)


**## **Dependency****

Must be complete before UAT in Sprint 5




## **6. Sprint 3 Planning Action**

This refinement note is to be tabled at the Sprint 3 Planning session. The Lead Researcher and Developer will confirm:

1.  The two-step interaction model is approved for implementation

2.  The implementation is assigned to the question component rebuild story in Sprint 3

3.  UAT in Sprint 5 will specifically test the two-step interaction on all question types


INFO:  No formal Scope Change Request is required. This is a refinement of existing in-scope question component functionality identified during Sprint 2 Review. The Lead Researcher's approval at Sprint 3 Planning is sufficient authorisation to proceed.


## **7. Approval at Sprint 3 Planning**

| ## **Role** | ## **Name & Signature** | ## **Date** |
| --- | --- | --- |
| ## **Lead Researcher** |  |  |
| ## **Developer (AI Representative)** |  |  |




## **— END OF BACKLOG REFINEMENT NOTE —**

*GuestIQ**  ·**  Sprint 3 Backlog **Refinement  ·**  Question Interaction **Layer  ·**  Raised Sprint 2 Review*

