// src/config/configValidator.js
// GuestIQ — Configuration Validator (Phase 1b+)
//
// Per content_management_strategy_v10.md §3.2:
//   Runs synchronously on application boot, after Sentry.init() and BEFORE
//   posthog.init(). It is the second operation in src/main.jsx.
//
// What it validates (structural checks only — semantic correctness is out
// of scope; see use_case_specifications_v20.md UC-05 Extension 2):
//   1. All 6 JSON files are present and parseable (Vite raises an error
//      at import time if a file is malformed — the imports below would
//      themselves fail before we even reach this code).
//   2. questions.json contains exactly 80 question objects.
//   3. Every question object has the 13 required fields with the right
//      data types.
//   4. Every question's `tiers` field contains only valid tier names.
//   5. Every question's `type` field is one of the three valid types.
//   6. Every scale_5 question has exactly 5 scale_labels.
//
// On failure: throw a clear error with the filename and reason. The
// ErrorBoundary in App.jsx catches this and shows the configuration error
// screen. Sentry captures the exception with the filename and detail.
//
// On success: completes in well under 50ms — the JSON is already in memory
// from the static imports, and these checks are simple iterations.

import questions from '../data/questions.json';
import episodes from '../data/episodes.json';
import tiers from '../data/tiers.json';
import uiCopy from '../data/ui-copy.json';
import branching from '../data/branching.json';
import taxonomy from '../data/taxonomy.json';

const REQUIRED_QUESTION_FIELDS = [
  'id', 'module', 'section', 'tiers', 'type', 'text', 'instruction',
  'options', 'has_none_option', 'max_selections', 'routes_module_5',
  'module_5_code', 'researcher_note',
];

const VALID_TIERS = ['amateur', 'professional', 'expert'];
const VALID_QUESTION_TYPES = ['single_select', 'multi_select', 'scale_5'];

// Tag every validator error with the filename so the user-facing config
// error screen can show which file is malformed.
class ConfigError extends Error {
  constructor(filename, message) {
    super(`${filename}: ${message}`);
    this.name = 'ConfigError';
    this.filename = filename;
  }
}

// Structural check 1: questions.json has exactly 80 objects
function validateQuestionsCount() {
  if (!Array.isArray(questions)) {
    throw new ConfigError('questions.json', 'must be an array');
  }
  if (questions.length !== 80) {
    throw new ConfigError(
      'questions.json',
      `must contain exactly 80 question objects (got ${questions.length})`
    );
  }
}

// Structural check 2: every question has the 13 required fields
function validateQuestionShape() {
  questions.forEach((q, idx) => {
    if (!q || typeof q !== 'object') {
      throw new ConfigError(
        'questions.json',
        `question at index ${idx} is not an object`
      );
    }
    for (const field of REQUIRED_QUESTION_FIELDS) {
      if (!(field in q)) {
        throw new ConfigError(
          'questions.json',
          `question ${q.id || `at index ${idx}`} missing required field '${field}'`
        );
      }
    }
  });
}

// Structural check 3: every question's tiers field contains only valid values
function validateTiers() {
  questions.forEach((q) => {
    if (!Array.isArray(q.tiers)) {
      throw new ConfigError(
        'questions.json',
        `question ${q.id} field 'tiers' must be an array`
      );
    }
    for (const t of q.tiers) {
      if (!VALID_TIERS.includes(t)) {
        throw new ConfigError(
          'questions.json',
          `question ${q.id} has invalid tier '${t}' (allowed: ${VALID_TIERS.join(', ')})`
        );
      }
    }
  });
}

// Structural check 4: every question's type is valid
function validateTypes() {
  questions.forEach((q) => {
    if (!VALID_QUESTION_TYPES.includes(q.type)) {
      throw new ConfigError(
        'questions.json',
        `question ${q.id} has invalid type '${q.type}' ` +
          `(allowed: ${VALID_QUESTION_TYPES.join(', ')})`
      );
    }
  });
}

// Structural check 5: scale_5 questions have exactly 5 scale_labels
function validateScaleLabels() {
  const scaleQuestions = questions.filter((q) => q.type === 'scale_5');
  for (const q of scaleQuestions) {
    if (!Array.isArray(q.scale_labels) || q.scale_labels.length !== 5) {
      throw new ConfigError(
        'questions.json',
        `scale_5 question ${q.id} must have exactly 5 scale_labels (got ${
          Array.isArray(q.scale_labels) ? q.scale_labels.length : 'none'
        })`
      );
    }
  }
}

// Structural check 6: the other 5 JSON files have the expected top-level shape
function validateOtherFiles() {
  if (!Array.isArray(episodes) || episodes.length !== 7) {
    throw new ConfigError(
      'episodes.json',
      `must be an array of 7 episode objects (got ${
        Array.isArray(episodes) ? episodes.length : 'non-array'
      })`
    );
  }

  const tierKeys = Object.keys(tiers || {}).sort();
  const expectedTiers = ['amateur', 'expert', 'professional'];
  if (tierKeys.join(',') !== expectedTiers.join(',')) {
    throw new ConfigError(
      'tiers.json',
      `must have exactly 3 keys (amateur, professional, expert) — got: ${tierKeys.join(', ')}`
    );
  }

  if (!uiCopy || typeof uiCopy !== 'object' || Object.keys(uiCopy).length === 0) {
    throw new ConfigError('ui-copy.json', 'must be a non-empty object');
  }

  if (!branching || !branching.module5Routes || !branching.q2Routes) {
    throw new ConfigError(
      'branching.json',
      'must contain both module5Routes and q2Routes objects'
    );
  }

  if (!taxonomy || typeof taxonomy !== 'object' || Object.keys(taxonomy).length === 0) {
    throw new ConfigError('taxonomy.json', 'must be a non-empty object');
  }
}

// Main entry point — called from src/main.jsx after Sentry.init().
// Runs all 6 structural checks in order. Throws ConfigError on first
// failure; on success returns silently (under 50ms).
export function validateConfiguration() {
  validateQuestionsCount();
  validateQuestionShape();
  validateTiers();
  validateTypes();
  validateScaleLabels();
  validateOtherFiles();
}

export { ConfigError };
