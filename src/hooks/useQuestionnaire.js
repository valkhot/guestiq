// src/hooks/useQuestionnaire.js
// GuestIQ — Questionnaire Data Access Hook
// Single gateway to all questionnaire content.
// S3-01: Exposes filterQuestionsForSession() for Module 5 branching.
// No component imports questionnaire.js directly — always through this hook.

import questionnaire from '../data/questionnaire.js';

// Module 5 routing map — intent_category → section code
const MODULE5_ROUTES = {
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
};

// Secondary purpose Q2 routing map — Q2 answer code → intent_category
const Q2_TO_INTENT = {
  B: 'LEIS-PLAN',
  C: 'WORK-TRANS',
  D: 'FAM',
  E: 'LEIS-EXP',
  F: 'MED',
};

// Given a session's tier, intent_category, and secondary intent category,
// returns the ordered list of questions the respondent should see.
// This is the core branching engine for Module 5.
export function filterQuestionsForSession({ tier, intentCategory, secondaryIntentCategory }) {
  const allQuestions = questionnaire.questions;

  return allQuestions.filter((q) => {
    // Must match tier
    if (!q.tiers.includes(tier)) return false;

    // Non-Module-5 questions: always include
    if (q.module !== 5) return true;

    // Module 5: include only questions whose intent_codes match
    // the primary or secondary intent category for this session
    const primarySection = MODULE5_ROUTES[intentCategory];
    const secondarySection = secondaryIntentCategory
      ? MODULE5_ROUTES[secondaryIntentCategory]
      : null;

    // Q43 is additionally gated — only WORK-EXT sessions see it
    if (q.id === 'Q43') {
      return (
        (intentCategory === 'WORK-EXT' || secondaryIntentCategory === 'WORK-EXT') &&
        q.tiers.includes(tier)
      );
    }

    // Q46 is additionally gated — only LEIS-SOC sessions see it
    if (q.id === 'Q46') {
      return (
        (intentCategory === 'LEIS-SOC' || secondaryIntentCategory === 'LEIS-SOC') &&
        q.tiers.includes(tier)
      );
    }

    // All other Module 5 questions: match primary or secondary section
    const questionSection = q.section;
    const matchesPrimary = primarySection && questionSection === primarySection;
    const matchesSecondary =
      secondarySection &&
      secondarySection !== primarySection &&
      questionSection === secondarySection;

    return matchesPrimary || matchesSecondary;
  });
}

// Derive secondary intent category from Q2 answer code
export function getSecondaryIntentFromQ2Answer(answerCode) {
  return Q2_TO_INTENT[answerCode] || null;
}

// Get the Module 5 section code for a given intent category
export function getModule5Section(intentCategory) {
  return MODULE5_ROUTES[intentCategory] || null;
}

// All valid intent categories that have Module 5 routes
export const ROUTABLE_INTENT_CODES = Object.keys(MODULE5_ROUTES);

export function useQuestionnaire() {
  return {
    questions: questionnaire.questions,
    episodes: questionnaire.episodes,
    tiers: questionnaire.tiers,
    uiCopy: questionnaire.uiCopy,
    branching: questionnaire.branching,
    taxonomy: questionnaire.taxonomy,
    filterQuestionsForSession,
    getModule5Section,
    getSecondaryIntentFromQ2Answer,
    ROUTABLE_INTENT_CODES,
  };
}
