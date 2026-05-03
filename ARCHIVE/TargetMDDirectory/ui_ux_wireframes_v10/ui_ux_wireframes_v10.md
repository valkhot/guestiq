# ui_ux_wireframes_v10

*Document Type: DOCX*

## Table of Contents

  - [**UI / UX WIREFRAMES**](#ui--ux-wireframes)
  - [**GuestIQ**** — All Screens · Low-Fidelity · Annotated**](#guestiq--all-screens--low-fidelity--annotated)
  - [**Document ID**](#document-id)
  - [**Document Version**](#document-version)
  - [**Document Status**](#document-status)
  - [**Sprint**](#sprint)
  - [**Screens**](#screens)
  - [**Fidelity**](#fidelity)
  - [**PostHog**** Annotations**](#posthog-annotations)
  - [**Review Checklist**](#review-checklist)
  - [**Document Location**](#document-location)
- [Screen 1 — Welcome + Tier Selection](#screen-1--welcome--tier-selection)
  - [**[SCR-01****]  ****Welcome**** + Tier Selection**](#scr-01--welcome--tier-selection)
  - [**  ****GuestIQ**](#--guestiq)
  - [**  You know hotel guests.  What do they actually expect?**](#--you-know-hotel-guests--what-do-they-actually-expect)
    - [***  ▶ PH: ******welcome_hook_viewed****** — fires on render***](#---ph-welcome_hook_viewed--fires-on-render)
    - [***  ▶ PH: ******tier_selected****** (tier, ******property_******id******) —****** fires on tier card click***](#---ph-tier_selected-tier-property_id--fires-on-tier-card-click)
    - [***  ▶ SUP: ******createSession******(******) — fires immediately after tier click***](#---sup-createsession--fires-immediately-after-tier-click)
    - [***  ▶ LS: ******guestiq_session_token****** written to ******localStorage***](#---ls-guestiq_session_token-written-to-localstorage)
- [Screen 2 — Disambiguation Screen](#screen-2--disambiguation-screen)
  - [**[SCR-02****]  ****Disambiguation**** Screen**](#scr-02--disambiguation-screen)
  - [**  ****GuestIQ**](#--guestiq)
  - [**  Welcome back**](#--welcome-back)
    - [***  ▶ PH: ******disambiguation_shown****** (******property_******id******) —****** fires on render***](#---ph-disambiguation_shown-property_id--fires-on-render)
    - [***  ▶ PH: ******disambiguation_resumed****** — fires on Resume click***](#---ph-disambiguation_resumed--fires-on-resume-click)
    - [***  ▶ PH: ******disambiguation_new_session****** — fires on Start Fresh click***](#---ph-disambiguation_new_session--fires-on-start-fresh-click)
    - [***  ▶ SUP: ******getIncompleteSession******(******token) —****** called before this screen renders***](#---sup-getincompletesessiontoken--called-before-this-screen-renders)
    - [***  ▶ LS: token cleared on Start Fresh; retained on Resume***](#---ls-token-cleared-on-start-fresh-retained-on-resume)
- [Screen 3 — Q0 Tense Routing Gate](#screen-3--q0-tense-routing-gate)
  - [**[SCR-03****]  ****Q****0 — Tense Routing Gate**](#scr-03--q0--tense-routing-gate)
    - [**  Are you completing this questionnaire about a hotel stay you have**](#--are-you-completing-this-questionnaire-about-a-hotel-stay-you-have)
    - [**  recently experienced, or about a stay you are planning or**](#--recently-experienced-or-about-a-stay-you-are-planning-or)
  - [**  expecting to take?**](#--expecting-to-take)
    - [***  ▶ PH: ******episode_******started******(******1, 'Why You Stay', ******property_******id******) —****** fires on Q0 render***](#---ph-episode_started1-why-you-stay-property_id--fires-on-q0-render)
    - [***  ▶ PH: ******routing_gate_******answered******(******tense_frame******, ******answer_******option******) —****** fires on selection***](#---ph-routing_gate_answeredtense_frame-answer_option--fires-on-selection)
    - [***  ▶ PH: ******question_******answered******(******QR1, ******answer_code******, ******tense_frame******, ******...) —****** fires on selection***](#---ph-question_answeredqr1-answer_code-tense_frame---fires-on-selection)
    - [***  ▶ SUP: ******updateSession******(******tense_frame******) + ******insertResponse******(******QR1******) —****** fires after answer***](#---sup-updatesessiontense_frame--insertresponseqr1--fires-after-answer)
- [Screen 4 — Active Question (single_select)](#screen-4--active-question-single_select)
    - [**[SCR-04****a]  ****Active**** Question — ****single_select**** example (Q1)**](#scr-04a--active-question--single_select-example-q1)
  - [**  What was the main reason for this hotel stay?**](#--what-was-the-main-reason-for-this-hotel-stay)
    - [***  ▶ PH: ******question_******answered******(******Q1, ******answer_code******, ******module_number******, tier, ******...) —****** on selection***](#---ph-question_answeredq1-answer_code-module_number-tier---on-selection)
    - [***  ▶ PH: ******none_flag_******selected******(******Q1, ******...) —****** fires ADDITIONALLY if None option chosen***](#---ph-none_flag_selectedq1---fires-additionally-if-none-option-chosen)
    - [***  ▶ SUP: ******insertResponse******(******Q1, ******answer_code******, ******tense_frame******, ******...) —****** fires on selection***](#---sup-insertresponseq1-answer_code-tense_frame---fires-on-selection)
    - [***  ▶ SUP: ******updateSession******(******intent_******category******) —****** fires after Q1 answer stored***](#---sup-updatesessionintent_category--fires-after-q1-answer-stored)
  - [Screen 4b — Active Question (multi_select)](#screen-4b--active-question-multi_select)
    - [**[SCR-04****b]  ****Active**** Question — ****multi_select**** example (Q4)**](#scr-04b--active-question--multi_select-example-q4)
    - [**  What triggered the decision to stay at a hotel for this need?**](#--what-triggered-the-decision-to-stay-at-a-hotel-for-this-need)
  - [Screen 4c — Active Question (scale_5)](#screen-4c--active-question-scale_5)
    - [**[SCR-04c****]  ****Active**** Question — scale_5 example (Q12)**](#scr-04c--active-question--scale_5-example-q12)
    - [**  How important is it that the hotel acknowledges your booking**](#--how-important-is-it-that-the-hotel-acknowledges-your-booking)
  - [**  and ****communicates**** before arrival?**](#--and-communicates-before-arrival)
    - [***  ▶ SUP: ******insertScaleResponse******(******Q12, ******scale_value******=******4) —****** not ******insertResponse******(******)***](#---sup-insertscaleresponseq12-scale_value4--not-insertresponse)
- [Screen 5 — Curiosity Hook + Badge Reveal](#screen-5--curiosity-hook--badge-reveal)
    - [**[SCR-05****]  ****Curiosity**** Hook + Badge Reveal (Episode 1 example)**](#scr-05--curiosity-hook--badge-reveal-episode-1-example)
  - [**  ✦ First Step**](#---first-step)
  - [**  ✦ Intent Locked**](#---intent-locked)
    - [***  ▶ PH: ******episode_******completed******(******1, 'Why You Stay', ******time_in_episode******, ******property_id******)***](#---ph-episode_completed1-why-you-stay-time_in_episode-property_id)
    - [***  ▶ PH: ******curiosity_hook_******viewed******(******1, tier, ******property_******id******) —****** fires on render***](#---ph-curiosity_hook_viewed1-tier-property_id--fires-on-render)
    - [***  ▶ PH: ******badge_******awarded******(******badge_name******, ******episode_number******, tier, ******property_id******) — per badge***](#---ph-badge_awardedbadge_name-episode_number-tier-property_id--per-badge)
- [Screen 6 — Tier Upgrade Prompt](#screen-6--tier-upgrade-prompt)
    - [**[SCR-06****]  ****Tier**** Upgrade Prompt (Amateur → Professional)**](#scr-06--tier-upgrade-prompt-amateur--professional)
  - [**  You're on a roll.**](#--youre-on-a-roll)
    - [***  ▶ PH: ******tier_upgrade_******prompted******(******current_tier******, ******target_tier******, ******property_id******)***](#---ph-tier_upgrade_promptedcurrent_tier-target_tier-property_id)
    - [***  ▶ PH: ******tier_upgrade_******accepted******(******from, to, ******question_number******) OR ******tier_upgrade_declined***](#---ph-tier_upgrade_acceptedfrom-to-question_number-or-tier_upgrade_declined)
    - [***  ▶ SUP: ******updateSession******(tier='professional******') —****** fires on accept only***](#---sup-updatesessiontierprofessional--fires-on-accept-only)
- [Screen 7 — Module 5 Intent Selection (Q1 None Option Fallback)](#screen-7--module-5-intent-selection-q1-none-option-fallback)
    - [**[SCR-07****]  ****Module**** 5 Intent Selection — Q1 None Option Fallback**](#scr-07--module-5-intent-selection--q1-none-option-fallback)
  - [**  Your Kind of Stay**](#--your-kind-of-stay)
    - [**  Which of ****these best**** describes the type of stay you have in mind?**](#--which-of-these-best-describes-the-type-of-stay-you-have-in-mind)
- [Screen 8 — Completion + Results Screen](#screen-8--completion--results-screen)
  - [**[SCR-08****]  ****Completion**** + Results Screen**](#scr-08--completion--results-screen)
  - [**  ****✦****  You**** did it!**](#----you-did-it)
  - [**  Your Profile: Business Travel**](#--your-profile-business-travel)
    - [***  ▶ PH: ******session_******completed******(******tier, ******total_time_seconds******, ******intent_category******, ...)***](#---ph-session_completedtier-total_time_seconds-intent_category-)
    - [***  ▶ PH: ******results_******viewed******(******tier, ******intent_category******, ******property_id******)***](#---ph-results_viewedtier-intent_category-property_id)
    - [***  ▶ PH: ******aggregate_comparison_viewed******(******responses_in_******aggregate******) —****** if 3+ sessions***](#---ph-aggregate_comparison_viewedresponses_in_aggregate--if-3-sessions)
    - [***  ▶ LS: ******guestiq_session_token****** CLEARED — token removed from ******localStorage****** here***](#---ls-guestiq_session_token-cleared--token-removed-from-localstorage-here)
    - [***  ▶ SUP: ******updateSession******(******is_complete******=true, ******completed_******at******) —****** fires before this screen***](#---sup-updatesessionis_completetrue-completed_at--fires-before-this-screen)
- [Screen 9 — Post-Completion Enrichment Screen](#screen-9--post-completion-enrichment-screen)
  - [**[SCR-09****]  ****Post****-Completion Enrichment Screen**](#scr-09--post-completion-enrichment-screen)
  - [**  One last thing — help us understand your expertise**](#--one-last-thing--help-us-understand-your-expertise)
    - [***  ▶ PH: ******credentials_enrichment_******completed******(******fields_answered******, ******...) —****** on Skip or Submit***](#---ph-credentials_enrichment_completedfields_answered---on-skip-or-submit)
    - [***  ▶ SUP: ******updateEnrichment******(******years, interactions, ******shift) —****** on Submit only***](#---sup-updateenrichmentyears-interactions-shift--on-submit-only)
- [Screen 10 — Management Dashboard Overlay (SHIFT+CTRL+A)](#screen-10--management-dashboard-overlay-shiftctrla)
  - [**[SCR-10****]  ****Management**** Dashboard Overlay**](#scr-10--management-dashboard-overlay)
    - [**  ****GuestIQ**** Management                           ****   [****Esc to ****close]  ×**](#--guestiq-management------------------------------esc-to-close--)
  - [**  PANEL 1 — Response Overview**](#--panel-1--response-overview)
    - [***  ▶ PH: ******dashboard_opened******(******property_id******) — fires on SHIFT+CTRL+A***](#---ph-dashboard_openedproperty_id--fires-on-shiftctrla)
    - [***  ▶ PH: ******dashboard_panel_viewed******(******panel_******name******) —****** fires on each tab click***](#---ph-dashboard_panel_viewedpanel_name--fires-on-each-tab-click)
    - [***  ▶ PH: ******dashboard_exported_csv****** / ******dashboard_exported_pdf****** — on export click***](#---ph-dashboard_exported_csv--dashboard_exported_pdf--on-export-click)
    - [***  ▶ SUP: ******getDashboardData******(******propertyId******) —****** reads all 4 tables for panel data***](#---sup-getdashboarddatapropertyid--reads-all-4-tables-for-panel-data)
- [Screen 11 — Downtime Contingency Screen](#screen-11--downtime-contingency-screen)
  - [**[SCR-11****]  ****Downtime**** Contingency Screen**](#scr-11--downtime-contingency-screen)
  - [**  ****GuestIQ**](#--guestiq)
  - [**  ****GuestIQ**** is temporarily unavailable**](#--guestiq-is-temporarily-unavailable)
    - [***  ▶ PH: ******supabase_downtime_******shown******(******question_number******, ******episode_number******, ******property_id******)***](#---ph-supabase_downtime_shownquestion_number-episode_number-property_id)
- [Screen 12 — Configuration Error Screen](#screen-12--configuration-error-screen)
    - [**[SCR-12****]  ****Configuration**** Error Screen (Phase 1b+)**](#scr-12--configuration-error-screen-phase-1b)
  - [**  ****GuestIQ**](#--guestiq)
    - [**  Configuration error — ****questions.json**** is malformed.**](#--configuration-error--questionsjson-is-malformed)
    - [***  ▶ SEN: ******Sentry.captureException******() —****** fires with config error details BEFORE React renders***](#---sen-sentrycaptureexception--fires-with-config-error-details-before-react-renders)
- [Screen 13 — Sentry ErrorBoundary Fallback](#screen-13--sentry-errorboundary-fallback)
    - [**[SCR-13****]  ****Sentry**** ****ErrorBoundary**** Fallback**](#scr-13--sentry-errorboundary-fallback)
  - [**  ****GuestIQ**](#--guestiq)
  - [**  Something went wrong.**](#--something-went-wrong)
    - [***  ▶ SEN: ******Sentry.captureException******() —****** fires automatically via ******ErrorBoundary***](#---sen-sentrycaptureexception--fires-automatically-via-errorboundary)
- [Screen 14 — Offline Queue Visual Indicator](#screen-14--offline-queue-visual-indicator)
    - [**[SCR-14****]  ****Offline**** Queue Visual Indicator (overlays active question)**](#scr-14--offline-queue-visual-indicator-overlays-active-question)
    - [***  ▶ PH: ******offline_queue_activated****** — fires when queue starts***](#---ph-offline_queue_activated--fires-when-queue-starts)
    - [***  ▶ PH: ******offline_queue_flushed****** — fires when all queued writes succeed***](#---ph-offline_queue_flushed--fires-when-all-queued-writes-succeed)
- [Screen 15 — Phase 1b JSON Editing Workflow (Researcher Mental Model)](#screen-15--phase-1b-json-editing-workflow-researcher-mental-model)
  - [**Phase 1b Content Editing Workflow — Researcher Journey**](#phase-1b-content-editing-workflow--researcher-journey)
    - [**⚠**** NEVER EDIT: id values (primary keys), option code values (A/B/C...), routes_module_5 field. These require developer review.**](#-never-edit-id-values-primary-keys-option-code-values-abc-routes_module_5-field-these-require-developer-review)
- [Annotation Legend](#annotation-legend)
  - [**Symbol**](#symbol)
  - [**Type**](#type)
  - [**Meaning**](#meaning)
  - [**▶ PH:**](#-ph)
  - [**PostHog**](#posthog)
  - [**▶ SUP:**](#-sup)
  - [**Supabase**](#supabase)
  - [**▶ SEN:**](#-sen)
  - [**Sentry**](#sentry)
  - [**▶ LS:**](#-ls)
  - [**localStorage**](#localstorage)
  - [**ℹ**** Note:**](#ℹ-note)
  - [**Design Note**](#design-note)
- [Version Log](#version-log)
  - [**Ver.**](#ver)
  - [**Date**](#date)
  - [**By**](#by)
  - [**Change**](#change)
  - [**— END OF UI/UX WIREFRAMES v1.0 —**](#-end-of-uiux-wireframes-v10-)

## **UI / UX WIREFRAMES**

## **GuestIQ**** — All Screens · Low-Fidelity · Annotated**


**## **Document Version****

1.0 — Initial Release


**## **Document Status****

DRAFT — Pending Lead Researcher review (45 min)


**## **Sprint****

Sprint 1 — Architecture and Design


**## **Screens****

16 screen wireframes + 1 Phase 1b workflow diagram


**## **Fidelity****

Low-fidelity — layout, hierarchy, content placement, and event annotations. Not visual design. See Visual Design System (S1-3.3) for colours, typography, and component specs.


**## **PostHog**** Annotations****

All 27 canonical events annotated at their trigger points using ▶ PH: labels


**## **Review Checklist****

(1) Disambiguation screen shows both resume and new session options. (2) Downtime screen is present. (3) PostHog event annotations are visible at key interaction points.


**## **Document Location****

01-Sprint-1 / AI-Outputs / UI-UX-Wireframes-v1.0.docx




INFO:  Wireframe notation: ┌─┐ / └─┘ = bordered UI element. ◉ = selected option. ○ = unselected option. ▶ PH: = PostHog event fires here. ▶ SUP: = Supabase write/read. ▶ SEN: = Sentry capture. ▶ LS: = localStorage operation. Canvas colour: dark background = respondent canvas (#0D0D12). Slightly different dark = dashboard canvas (#0B1120).


# Screen 1 — Welcome + Tier Selection

Single unified screen (Option B v2.0). Hook text and tier cards displayed simultaneously. No Continue button. Tier selection IS the start action. Not-now link at bottom.


| ## **[SCR-01****]  ****Welcome**** + Tier Selection** |
| --- |
| ## **  ****GuestIQ**  ──────────────────────────────────────────────────────────────────────  ## **  You know hotel guests.  What do they actually expect?**  This questionnaire captures what front desk professionals like you  know about guest expectations across different stay types.  All answers are anonymous. Participation is voluntary.  ──────────────────────────────────────────────────────────────────────  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐  │  AMATEUR             │  │  PROFESSIONAL ★      │  │  EXPERT              │  │  ~5 minutes          │  │  ~8 minutes          │  │  ~16 minutes         │  │  8 questions         │  │  18 questions        │  │  79 questions        │  │  Quick take on       │  │  Deeper dive into    │  │  The complete        │  │  the essentials      │  │  service + env.      │  │  picture             │  │                      │  │  ★ Most selected     │  │                      │  │  [ Start as Amateur] │  │  [Start as Pro]      │  │  [Start as Expert]   │  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘  Not now — maybe later  ### ***  ▶ PH: ******welcome_hook_viewed****** — fires on render***  ### ***  ▶ PH: ******tier_selected****** (tier, ******property_******id******) —****** fires on tier card click***  ### ***  ▶ SUP: ******createSession******(******) — fires immediately after tier click***  ### ***  ▶ LS: ******guestiq_session_token****** written to ******localStorage*** |




INFO:  ★ Most Selected badge text from uiCopy.mostSelectedBadgeText — never hardcoded. Tier descriptors from tiers.professional.descriptor. Color accents: Amateur=green, Professional=blue, Expert=purple. 'Not now' exits without creating a session record.


# Screen 2 — Disambiguation Screen

Shown when localStorage token found AND incomplete session confirmed in Supabase. Two explicit choices plus a third implicit path (stale token — silent clear). Review checklist item 1.


| ## **[SCR-02****]  ****Disambiguation**** Screen** |
| --- |
| ## **  ****GuestIQ**  ──────────────────────────────────────────────────────────────────────  ## **  Welcome back**  It looks like you started a session earlier.  ┌─────────────────────────────────────────────────────────────────┐  │   ◉  Resume my session — pick up where I left off              │  └─────────────────────────────────────────────────────────────────┘  ┌─────────────────────────────────────────────────────────────────┐  │   ○  Start fresh — I am someone new                            │  └─────────────────────────────────────────────────────────────────┘  ### ***  ▶ PH: ******disambiguation_shown****** (******property_******id******) —****** fires on render***  ### ***  ▶ PH: ******disambiguation_resumed****** — fires on Resume click***  ### ***  ▶ PH: ******disambiguation_new_session****** — fires on Start Fresh click***  ### ***  ▶ SUP: ******getIncompleteSession******(******token) —****** called before this screen renders***  ### ***  ▶ LS: token cleared on Start Fresh; retained on Resume***  *  ℹ Third path (not shown): stale token (no **Supabase** match) → token cleared silently → welcome screen. No disambiguation shown.* |




# Screen 3 — Q0 Tense Routing Gate

Rendered identically to all instrument questions (Q1–Q79). Episode map and progress bar visible. This is Episode 1, Question 0. No 'None of these fit' option — respondent must select a tense.


| ## **[SCR-03****]  ****Q****0 — Tense Routing Gate** |
| --- |
| ══════╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  [Q0 / 8]                                  Episode 1 · Why You Stay  ①  ○  ○  ○  ○  ○  ○  [E1][E2][E3][E4][E5][E6][E7]  ──────────────────────────────────────────────────────────────────────  ### **  Are you completing this questionnaire about a hotel stay you have**  ### **  recently experienced, or about a stay you are planning or**  ## **  expecting to take?**  ○  I am reflecting on a stay I have already completed (within the past 90 days)  ○  I am thinking about a stay I am planning or likely to take in the near future  ○  Both — I have recently stayed and have another stay coming up  ○  Other – please specify: ____________________________  ### ***  ▶ PH: ******episode_******started******(******1, 'Why You Stay', ******property_******id******) —****** fires on Q0 render***  ### ***  ▶ PH: ******routing_gate_******answered******(******tense_frame******, ******answer_******option******) —****** fires on selection***  ### ***  ▶ PH: ******question_******answered******(******QR1, ******answer_code******, ******tense_frame******, ******...) —****** fires on selection***  ### ***  ▶ SUP: ******updateSession******(******tense_frame******) + ******insertResponse******(******QR1******) —****** fires after answer*** |




# Screen 4 — Active Question (single_select)

Standard question screen. Progress bar fills proportionally. Episode map shows current episode node active. None option always last, visually distinct. Shown for Q1–Q79 where type='single_select'.


| ### **[SCR-04****a]  ****Active**** Question — ****single_select**** example (Q1)** |
| --- |
| ════════════════════╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  [Q1 / 18]                                 Episode 1 · Why You Stay  ①─ ○  ○  ○  ○  ○  ○  ──────────────────────────────────────────────────────────────────────  ## **  What was the main reason for this hotel stay?**  Select the one that best fits — even if your stay has more than one purpose.  ○  Work or business — meetings, site visits, or client engagements  ○  Work or business — attending a conference, trade show, or professional event  ○  Work or business — extended assignment or project away from home  ○  Leisure — a planned holiday, city break, or vacation  ○  Leisure — attending a personal event (wedding, reunion, celebration...)  ○  [ ... remaining options A–L ... ]  ○  Other – please specify  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  ○  None of these fit my situation  ### ***  ▶ PH: ******question_******answered******(******Q1, ******answer_code******, ******module_number******, tier, ******...) —****** on selection***  ### ***  ▶ PH: ******none_flag_******selected******(******Q1, ******...) —****** fires ADDITIONALLY if None option chosen***  ### ***  ▶ SUP: ******insertResponse******(******Q1, ******answer_code******, ******tense_frame******, ******...) —****** fires on selection***  ### ***  ▶ SUP: ******updateSession******(******intent_******category******) —****** fires after Q1 answer stored***  *  ℹ Q1 triggers two **Supabase** writes: **insertResponse**(**) + **updateSession**(**intent_category**). **intent_category** is used for all Module 5 routing.* |




## Screen 4b — Active Question (multi_select)

| ### **[SCR-04****b]  ****Active**** Question — ****multi_select**** example (Q4)** |
| --- |
| ════════════════════════╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  [Q4 / 18]                                 Episode 1 · Why You Stay  ①─ ○  ○  ○  ○  ○  ○  ### **  What triggered the decision to stay at a hotel for this need?**  Select all that apply — rank your top two if possible.  ☐  My home or usual accommodation was unavailable  ☑  The hotel was the most convenient option given the location  ☐  I wanted privacy or separation from my usual environment  ☑  Someone else arranged the hotel stay  ☐  [ ... remaining options ... ]  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  ☐  None of these fit my situation  *  ℹ **Multi-select**: each selected option fires a separate **insertResponse**(**) write. ☑ shown for selected state illustration only.* |




## Screen 4c — Active Question (scale_5)

| ### **[SCR-04c****]  ****Active**** Question — scale_5 example (Q12)** |
| --- |
| ════════════════════════════════╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  [Q12 / 18]                                Episode 3 · Before You Arrive  ①✓ ②─ ○  ○  ○  ○  ○  ### **  How important is it that the hotel acknowledges your booking**  ## **  and ****communicates**** before arrival?**  Not          Slightly     Moderately   Very         Essential  important    important    important    important  ○            ○            ○            ◉            ○  ╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌  ○  None of these fit my situation  ### ***  ▶ SUP: ******insertScaleResponse******(******Q12, ******scale_value******=******4) —****** not ******insertResponse******(******)***  *  ℹ Scale questions write to **scale_responses** table (not responses table). **scale_value** is the integer code (1–5) of the selected column.* |




# Screen 5 — Curiosity Hook + Badge Reveal

Shown at end of Episodes 1–6. Episode 7 has no curiosity hook — session completes directly. Badge slides up with brief scale animation (1.0→1.15→1.0 at 300ms via Framer Motion). Continue button advances to next episode.


| ### **[SCR-05****]  ****Curiosity**** Hook + Badge Reveal (Episode 1 example)** |
| --- |
| Episode 1 complete  ## **  ✦ First Step**  [BADGE SVG — First Step badge renders here]  [slides up from below + brief glow at 300ms]  ## **  ✦ Intent Locked**  [BADGE SVG — Intent Locked badge renders here]  [awarded when Q1 answered, revealed here]  ──────────────────────────────────────────────────────────────────────  [Curiosity hook text — from episodes[0].curiosityHookText]  [Curiosity hook subtext — from episodes[0].curiosityHookSubtext]  ┌────────────────────┐  │     Continue →     │  └────────────────────┘  ### ***  ▶ PH: ******episode_******completed******(******1, 'Why You Stay', ******time_in_episode******, ******property_id******)***  ### ***  ▶ PH: ******curiosity_hook_******viewed******(******1, tier, ******property_******id******) —****** fires on render***  ### ***  ▶ PH: ******badge_******awarded******(******badge_name******, ******episode_number******, tier, ******property_id******) — per badge***  *  ℹ Continue button → tier upgrade prompt (if applicable for this episode/tier) OR next episode question. Episode 7 has no hook — session completes directly.* |




# Screen 6 — Tier Upgrade Prompt

Amateur→Professional after Episode 1. Professional→Expert after Episode 4. Two buttons: accept upgrades the session tier in Supabase. Decline continues at current tier. Both paths continue the questionnaire.


| ### **[SCR-06****]  ****Tier**** Upgrade Prompt (Amateur → Professional)** |
| --- |
| ## **  You're on a roll.**  You've completed the Amateur tier. Ready to go deeper?  The Professional tier adds 10 more questions covering service,  pre-arrival expectations, and pricing perspectives.  ┌──────────────────────────────────────────────┐  │   Yes — upgrade me to Professional   (+10Q)  │  └──────────────────────────────────────────────┘  No thanks — I'll stay as Amateur  ### ***  ▶ PH: ******tier_upgrade_******prompted******(******current_tier******, ******target_tier******, ******property_id******)***  ### ***  ▶ PH: ******tier_upgrade_******accepted******(******from, to, ******question_number******) OR ******tier_upgrade_declined***  ### ***  ▶ SUP: ******updateSession******(tier='professional******') —****** fires on accept only*** |




# Screen 7 — Module 5 Intent Selection (Q1 None Option Fallback)

Shown only when respondent selected the None option at Q1. Manual sub-section picker — respondent selects which Module 5 category is most relevant. Edge case path from Branching Logic Spec Section 6.


| ### **[SCR-07****]  ****Module**** 5 Intent Selection — Q1 None Option Fallback** |
| --- |
| ## **  Your Kind of Stay**  ### **  Which of ****these best**** describes the type of stay you have in mind?**  Choose the one that feels closest — even if it is not a perfect fit.  ○  Work travel — meetings, events, or extended assignments  ○  Leisure — holiday, social occasion, or exploration  ○  Necessity — home displacement or life transition  ○  Medical or health-related stay  ○  Family visit  ○  In transit — layover or connecting travel  ○  Local escape — retreat close to home  *  ℹ Selection here manually sets the **intent_category** for Module 5 routing. Maps to: Work→5A, Leisure→5B, Necessity→5C, Medical→5D, Family→5E, Transit→5F, LocalEscape→5G.* |




# Screen 8 — Completion + Results Screen

Shown after the final question of the respondent's selected tier. Celebration screen with earned badges and personal results summary. Aggregate comparison chart shown if 3+ complete sessions exist.


| ## **[SCR-08****]  ****Completion**** + Results Screen** |
| --- |
| ## **  ****✦****  You**** did it!**  Professional tier complete.  [BADGE GRID — all earned badges displayed here]  First Step  ·  Intent Locked  ·  Environment Critic  ·  [...]  ──────────────────────────────────────────────────────────────────────  ## **  Your Profile: Business Travel**  You responded as a guest on a work stay — meetings, site visits,  or client engagements.  Your top priorities:  Workspace quality · Wi-Fi reliability · Late checkout  ──────────────────────────────────────────────────────────────────────  [AGGREGATE COMPARISON CHART — shown if 3+ sessions for property_id]  How your priorities compare to other front desk colleagues' responses  ### ***  ▶ PH: ******session_******completed******(******tier, ******total_time_seconds******, ******intent_category******, ...)***  ### ***  ▶ PH: ******results_******viewed******(******tier, ******intent_category******, ******property_id******)***  ### ***  ▶ PH: ******aggregate_comparison_viewed******(******responses_in_******aggregate******) —****** if 3+ sessions***  ### ***  ▶ LS: ******guestiq_session_token****** CLEARED — token removed from ******localStorage****** here***  ### ***  ▶ SUP: ******updateSession******(******is_complete******=true, ******completed_******at******) —****** fires before this screen*** |




# Screen 9 — Post-Completion Enrichment Screen

Shown to ALL tiers after the completion screen. Optional — session is already complete. Skip button always visible. Three nullable fields. credentials_enrichment_completed fires on Skip or on last field.


| ## **[SCR-09****]  ****Post****-Completion Enrichment Screen** |
| --- |
| ## **  One last thing — help us understand your expertise**  Optional. Skip anytime.  Years in hospitality:  ○ Under 2 years   ○ 2–5 years   ○ 6–10 years   ○ Over 10 years  Approximate weekly guest interactions:  ○ Under 50   ○ 50–100   ○ 100–200   ○ Over 200  Primary shift:  ○ Morning   ○ Afternoon   ○ Evening   ○ Night   ○ Variable  ┌──────────────────┐  │     Submit →     │  └──────────────────┘  Skip — I'm done  ### ***  ▶ PH: ******credentials_enrichment_******completed******(******fields_answered******, ******...) —****** on Skip or Submit***  ### ***  ▶ SUP: ******updateEnrichment******(******years, interactions, ******shift) —****** on Submit only***  *  ℹ Session is already complete before this screen. Enrichment is bonus data. Browser close here = session complete, no data loss.* |




# Screen 10 — Management Dashboard Overlay (SHIFT+CTRL+A)

Parallel state accessible from any screen. Dark navy canvas (#0B1120) — visually distinct from respondent canvas. Slides in from right. 9 tabbed panels. Escape or click-outside closes.


| ## **[SCR-10****]  ****Management**** Dashboard Overlay** |
| --- |
| ### **  ****GuestIQ**** Management                           ****   [****Esc to ****close]  ×**  [Overview] [Intent] [Planning] [Priorities] [Competitive] [Service] [Value] [Flags] [Raw]  ─────────────────────────────────────────────────────────────────────────────────────  ## **  PANEL 1 — Response Overview**  Total sessions started:   ██  Started        ██  Complete       ██  Abandoned  Completion rate:          ██%  By tier:  Amateur  ██   Professional  ██   Expert  ██  ⚠ Warning: fewer than 5 sessions — patterns shown are preliminary.  ─────────────────────────────────────────────────────────────────────────────────────  [Export CSV]    [Export PDF]  ### ***  ▶ PH: ******dashboard_opened******(******property_id******) — fires on SHIFT+CTRL+A***  ### ***  ▶ PH: ******dashboard_panel_viewed******(******panel_******name******) —****** fires on each tab click***  ### ***  ▶ PH: ******dashboard_exported_csv****** / ******dashboard_exported_pdf****** — on export click***  ### ***  ▶ SUP: ******getDashboardData******(******propertyId******) —****** reads all 4 tables for panel data***  *  ℹ ⚠ Warning shown when complete session count < 5. All panels display data but flag it as preliminary. Prevents over-interpretation of early data.* |




# Screen 11 — Downtime Contingency Screen

Review checklist item 2. Shown when Supabase unreachable for more than 60 consecutive seconds after offline queue activation. Full-screen. Retry button triggers connectivity check. Offline queue preserved.


| ## **[SCR-11****]  ****Downtime**** Contingency Screen** |
| --- |
| ## **  ****GuestIQ**  ──────────────────────────────────────────────────────────────────────  ## **  ****GuestIQ**** is temporarily unavailable**  Your answers are saved. Please try again in a few minutes.  When you click Try Again, the app will resume from where you left off.  ┌────────────────┐  │   Try Again    │  └────────────────┘  ### ***  ▶ PH: ******supabase_downtime_******shown******(******question_number******, ******episode_number******, ******property_id******)***  *  ℹ Retry button → **Supabase** connectivity check → if restored: flush offline queue → resume at last question. If still down: remain on this screen. Offline queue held in memory throughout.* |




# Screen 12 — Configuration Error Screen

Phase 1b only. Shown if configValidator throws on malformed JSON file. Sentry captures error before React renders — no PostHog event possible at this point. Recovery: git revert and redeploy.


| ### **[SCR-12****]  ****Configuration**** Error Screen (Phase 1b+)** |
| --- |
| ## **  ****GuestIQ**  ### **  Configuration error — ****questions.json**** is malformed.**  GuestIQ cannot start. Please contact your administrator.  Error details (for technical reference):  Unexpected token at line 42, column 8  ┌──────────────────┐  │   Refresh page   │  └──────────────────┘  ### ***  ▶ SEN: ******Sentry.captureException******() —****** fires with config error details BEFORE React renders***  *  ℹ No **PostHog** event fires here — **PostHog** **initialises** after **configValidator**. Sentry is **initialised** before **configValidator** — so the error is always captured.* |




# Screen 13 — Sentry ErrorBoundary Fallback

Catches any unhandled React rendering error. Sentry captures automatically via ErrorBoundary. Refresh button preserves localStorage token — disambiguation screen will appear after refresh if session was incomplete.


| ### **[SCR-13****]  ****Sentry**** ****ErrorBoundary**** Fallback** |
| --- |
| ## **  ****GuestIQ**  ## **  Something went wrong.**  Please refresh the page to continue.  ┌────────────┐  │  Refresh   │  └────────────┘  ### ***  ▶ SEN: ******Sentry.captureException******() —****** fires automatically via ******ErrorBoundary***  *  **ℹ** **localStorage** token preserved through refresh. If session was incomplete, disambiguation screen appears after reload allowing resume.* |




# Screen 14 — Offline Queue Visual Indicator

Not a full screen — a status banner overlay that appears when Supabase writes fail and the offline queue activates. Respondent continues answering questions normally. Banner dismissed automatically on queue flush.


| ### **[SCR-14****]  ****Offline**** Queue Visual Indicator (overlays active question)** |
| --- |
| ┌───────────────────────────────────────────────────────────────────┐  │  ⟳  Your answers are saved — reconnecting...                    │  └───────────────────────────────────────────────────────────────────┘  [ Active question continues normally below this banner ]  ### ***  ▶ PH: ******offline_queue_activated****** — fires when queue starts***  ### ***  ▶ PH: ******offline_queue_flushed****** — fires when all queued writes succeed***  *  ℹ After 60 continuous seconds of **Supabase** unavailability, the full Downtime Screen (SCR-11) replaces this banner. Banner disappears automatically when queue flushes.* |




# Screen 15 — Phase 1b JSON Editing Workflow (Researcher Mental Model)

Not a GuestIQ application screen — a workflow diagram showing how the Lead Researcher edits questionnaire content in Phase 1b without developer involvement. PostHog v2.0 addition to wireframes.


| ## **Phase 1b Content Editing Workflow — Researcher Journey**  (No developer involvement required after Phase 1b migration is complete)  Step 1  →  Open GitHub repository in browser (github.com/[username]/guestiq)  Navigate to: src/data/questions.json  Click the pencil (✏) icon — Edit this file  Step 2  →  Find the question to edit using its id field (e.g. "Q1")  Edit the text.retrospective or text.anticipatory value  DO NOT change: id, module, section, tiers, type, options.code values  Step 3  →  Click "Commit changes..." at the bottom  Add commit message: "content: update Q1 anticipatory text"  Click "Commit changes"  Step 4  →  GitHub Actions CI/CD pipeline triggers automatically  ESLint → Prettier → configValidator → Vite build → Deploy  Pipeline takes ~2 minutes  Step 5  →  Open guestiq.github.io?property=PROP001  Verify the question text change is visible  If configValidator fails: git revert in GitHub → pipeline re-runs  ### **⚠**** NEVER EDIT: id values (primary keys), option code values (A/B/C...), routes_module_5 field. These require developer review.** |
| --- |




# Annotation Legend

All wireframes use consistent annotation notation to mark where events and operations fire.



### ## **Symbol**

**## **Type****: ## **Meaning**


### ## **▶ PH:**

**## **PostHog****: PostHog event fires at this interaction point. Event name and required properties shown. Event is sent to PostHog via src/services/analytics.js — never called directly from components.


### ## **▶ SUP:**

**## **Supabase****: Supabase write or read via the service layer (src/services/supabase.js). Wrapped in try-catch with Sentry error capture.


### ## **▶ SEN:**

**## **Sentry****: Sentry.captureException() called. Used for error states, RLS rejections, and service layer failures.


### ## **▶ LS:**

**## **localStorage****: Browser localStorage read or write. Used for session token management.


### ## **ℹ**** Note:**

**## **Design Note****: Implementation detail, edge case, or constraint relevant to the screen.





# Version Log

| ## **Ver.** | ## **Date** | ## **By** | ## **Change** |
| --- | --- | --- | --- |





## **— END OF UI/UX WIREFRAMES v1.0 —**

*GuestIQ**  ·**  UI/UX Wireframes **v1.0  ·**  S1-3.**1  ·**  S1-**09  ·**  Sprint 1 **Artifact  ·**  Confidential*

