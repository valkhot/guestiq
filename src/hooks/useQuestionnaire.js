// src/hooks/useQuestionnaire.js
// GuestIQ — Questionnaire Content Hook
// THE ONLY FILE that imports from src/data/questionnaire.js (Phase 1a)
// or from the 6 JSON files (Phase 1b).
// Components receive content as props from this hook — never import data directly.
// This boundary enables the Phase 1b Strangler Fig migration with zero component changes.

import questionnaire from '../data/questionnaire';

/**
 * Returns all questionnaire content as a structured object.
 * Return shape is stable across Phase 1a, Phase 1b, and Phase 2.
 *
 * @returns {{
 *   questions: Array,
 *   episodes: Array,
 *   tiers: Object,
 *   uiCopy: Object,
 *   branching: Object,
 *   taxonomy: Object
 * }}
 */
export function useQuestionnaire() {
  return {
    questions: questionnaire.questions,
    episodes: questionnaire.episodes,
    tiers: questionnaire.tiers,
    uiCopy: questionnaire.uiCopy,
    branching: questionnaire.branching,
    taxonomy: questionnaire.taxonomy,
  };
}
