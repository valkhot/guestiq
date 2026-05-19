// src/hooks/useQuestionnaire.js
// GuestIQ — Content Abstraction Boundary
//
// This hook is the ONLY architectural boundary between content sources and
// components. Components never import questionnaire.js or JSON files directly —
// they always receive content as props from this hook.
//
// Phase 1a (Sprint 2 → Sprint 3): content came from src/data/questionnaire.js
// Phase 1b (S3-11 onwards):       content comes from 6 JSON files (this commit)
// Phase 2 (later):                content will come from Supabase — hook
//                                 interface unchanged across all three phases.
//
// External API (used by components — UNCHANGED across all phases):
//   - named export: useQuestionnaire() → { questions, episodes, tiers,
//                                          uiCopy, branching, taxonomy }
//   - named export: filterQuestionsForSession({ tier, intentCategory,
//                                                secondaryIntentCategory })
//   - named export: getModule5Section(intentCategory) → '5A'..'5G' | null
//   - named export: getSecondaryIntentFromQ2Answer(q2OptionCode) → string | null
//   - named export: ROUTABLE_INTENT_CODES (array of 12 taxonomy codes)
//
// MIGRATION NOTE (S3-11): the 6 JSON imports below replace the single
// `import questionnaire from '../data/questionnaire'` of Phase 1a. The shape
// of the returned object is identical. No component code needs to change.

import questions from '../data/questions.json';
import episodes from '../data/episodes.json';
import tiers from '../data/tiers.json';
import uiCopy from '../data/ui-copy.json';
import branching from '../data/branching.json';
import taxonomy from '../data/taxonomy.json';

// ─────────────────────────────────────────────────────────────────────────
// Constants — derived from the loaded content
// ─────────────────────────────────────────────────────────────────────────

// The 12 taxonomy codes that route to Module 5 sub-sections. These are the
// keys of branching.module5Routes — kept here as a named export for the
// QuestionScreen disambiguation flow and any other consumer that needs the
// full set of routable intents.
export const ROUTABLE_INTENT_CODES = Object.keys(branching.module5Routes);

// ─────────────────────────────────────────────────────────────────────────
// Routing helpers — pure functions, no React state
// ─────────────────────────────────────────────────────────────────────────

// Given a primary intent_category from Q1, return the Module 5 sub-section.
// Returns null if the intent code is not routable (e.g. Q1 answer was 'M'
// Other or NONE).
export function getModule5Section(intentCategory) {
  if (!intentCategory) return null;
  return branching.module5Routes[intentCategory] || null;
}

// Given a Q2 answer code (the option letter A-G or 'NONE'), return the
// secondary intent_category string (or null if Q2 answer does not trigger
// a secondary Module 5 sub-section). Driven by branching.q2Routes.
export function getSecondaryIntentFromQ2Answer(q2OptionCode) {
  if (!q2OptionCode) return null;
  return branching.q2Routes[q2OptionCode] || null;
}

// ─────────────────────────────────────────────────────────────────────────
// Question filtering — builds the question sequence for a session
// ─────────────────────────────────────────────────────────────────────────

// Build the ordered question list for a given session based on tier and
// (for Module 5) intent_category routing.
//
// Algorithm:
//   1. Start with all questions whose tier list includes the session tier
//   2. For Module 5 questions: KEEP only those whose intent_codes array
//      contains either the primary or the secondary intent code
//      (intent_codes === [] means "applies to all" — modules 6+7 use this)
//   3. Same-section-skip rule: if Q1 and Q2 resolve to the same Module 5
//      sub-section, the questions only appear once (handled by Set logic)
//
// This function is pure — given the same inputs, it returns the same output.
// It is called by QuestionScreen on every render where session state changes.
export function filterQuestionsForSession({
  tier,
  intentCategory,
  secondaryIntentCategory,
}) {
  const tierKey = tier || 'amateur';
  const primaryCode = intentCategory || null;
  const secondaryCode = secondaryIntentCategory || null;

  // Determine which Module 5 sub-sections are active for this session.
  // Both primary and secondary may map to the same sub-section — Set dedupes.
  const activeSections = new Set();
  if (primaryCode && branching.module5Routes[primaryCode]) {
    activeSections.add(branching.module5Routes[primaryCode]);
  }
  if (secondaryCode && branching.module5Routes[secondaryCode]) {
    activeSections.add(branching.module5Routes[secondaryCode]);
  }

  // Determine which intent_codes are "in play" for this session — used to
  // filter Module 5 questions by their intent_codes gate (e.g. Q43 only
  // shown to WORK-EXT, Q46 only to LEIS-SOC, Q52 only to FAM, Q54 only to
  // TRANSIT, Q56 only to LOC-ESC).
  const activeIntents = new Set();
  if (primaryCode) activeIntents.add(primaryCode);
  if (secondaryCode) activeIntents.add(secondaryCode);

  return questions.filter((q) => {
    // Tier gate — every question must include the session tier
    if (!q.tiers.includes(tierKey)) return false;

    // Module 5 routing gate — only show Module 5 questions whose
    // section matches an active sub-section AND whose intent_codes
    // intersects the active intents (or intent_codes is [] meaning no gate).
    if (q.module === 5) {
      if (!activeSections.has(q.section)) return false;
      if (Array.isArray(q.intent_codes) && q.intent_codes.length > 0) {
        const hasIntentMatch = q.intent_codes.some((c) => activeIntents.has(c));
        if (!hasIntentMatch) return false;
      }
    }

    // Modules 6+7 questions have intent_codes: [] (no gate) — all sessions
    // that reach them see them. Already covered by the early return above.
    return true;
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Hook — components import this as a named export
// ─────────────────────────────────────────────────────────────────────────

// The hook return shape is the same across Phase 1a, Phase 1b, and Phase 2.
// Components that destructure from useQuestionnaire() continue to work
// without any modification.
//
// Returns BOTH the content objects AND the helper functions, so that
// components can use either pattern:
//   const { questions, filterQuestionsForSession } = useQuestionnaire();
//   import { filterQuestionsForSession } from '../hooks/useQuestionnaire';
export function useQuestionnaire() {
  return {
    questions,
    episodes,
    tiers,
    uiCopy,
    branching,
    taxonomy,
    filterQuestionsForSession,
    getModule5Section,
    getSecondaryIntentFromQ2Answer,
    ROUTABLE_INTENT_CODES,
  };
}
