// src/components/screens/EnrichmentScreen.jsx
// S3-16 — Optional post-completion enrichment screen
//
// FR-012 (SRS v2.0): After CompletionScreen renders, an optional enrichment
// screen is shown to ALL respondents. Heading: "You are done — 30 more
// seconds? Help us understand who answered." Three single-click button
// groups; each saves immediately on click (no Submit). 'Skip — I'm done'
// link visible at all times. Session is_complete=true BEFORE this screen
// appears (FR-097).
//
// FR-098: Skip dismisses; credentials_enrichment_completed PostHog event
// fires with fields_answered count (0–3). Same event fires when all three
// fields are answered.
//
// FR-014: Event properties: fields_answered, years_band, interaction_estimate,
// shift_pattern, property_id.
//
// AI DEVELOPER NOTE FROM SRS: "Do not require all three fields before
// saving" and "Skip is not failure — it is the expected path for many
// respondents. Do not hide or minimize the skip option."

import { useState } from 'react';
import { motion } from 'framer-motion';

import { updateEnrichment } from '../../services/supabase';
import { trackCredentialsEnrichmentCompleted } from '../../services/analytics';

// Field option definitions — values stored in Supabase MUST match these
// strings exactly. PostHog event property names match SRS FR-014.
const YEARS_OPTIONS = [
  { value: 'Under 3 years', label: 'Under 3 years' },
  { value: '4–10 years', label: '4–10 years' },
  { value: '11+ years', label: '11+ years' },
];

const INTERACTIONS_OPTIONS = [
  { value: 'Under 20', label: 'Under 20' },
  { value: '20–50', label: '20–50' },
  { value: 'Over 50', label: 'Over 50' },
];

const SHIFT_OPTIONS = [
  { value: 'Days', label: 'Days' },
  { value: 'Nights', label: 'Nights' },
  { value: 'Rotating', label: 'Rotating' },
  { value: 'Variable', label: 'Variable' },
];

/**
 * EnrichmentScreen — three optional single-click fields shown after
 * completion. Saves each field on click. Dismisses on Skip or when all
 * three are answered.
 *
 * Props:
 *   - sessionId: string — required for updateEnrichment writes
 *   - propertyId: string — for PostHog event property
 *   - onDismiss: () => void — called after dismiss (skip or all-3) so the
 *       parent can transition to a terminal "thanks" view
 */
export default function EnrichmentScreen({ sessionId, propertyId, onDismiss }) {
  // Three independent fields; each starts unset.
  const [yearsBand, setYearsBand] = useState(null);
  const [interactionEstimate, setInteractionEstimate] = useState(null);
  const [shiftPattern, setShiftPattern] = useState(null);
  // Two-state UI: form view, then a brief thank-you view after dismiss.
  const [dismissed, setDismissed] = useState(false);

  // Single helper for each field — saves to Supabase immediately on click
  // per FR-012 ("Each field saves its value to the sessions table
  // immediately when clicked — no Submit button"). The local state is set
  // optimistically so the UI reflects the choice without waiting for the
  // round trip.
  async function handleFieldClick(columnName, value, setter) {
    setter(value);
    if (!sessionId) return; // safety — should never happen, but no-op if so
    await updateEnrichment(sessionId, { [columnName]: value });
  }

  // Computed: how many fields the respondent has answered so far.
  function countAnswered(y, i, s) {
    let n = 0;
    if (y) n += 1;
    if (i) n += 1;
    if (s) n += 1;
    return n;
  }

  // Dismiss handler — fires the PostHog event with current field state and
  // calls the parent's onDismiss callback to transition. Used by both Skip
  // and the auto-dismiss when all three fields have been answered.
  function dismiss(yearsVal, interactionsVal, shiftVal) {
    const fieldsAnswered = countAnswered(yearsVal, interactionsVal, shiftVal);
    trackCredentialsEnrichmentCompleted({
      fields_answered: fieldsAnswered,
      years_band: yearsVal,
      interaction_estimate: interactionsVal,
      shift_pattern: shiftVal,
      property_id: propertyId,
    });
    setDismissed(true);
    // Give the thank-you view a brief moment so the screen doesn't snap
    // away the instant the third button is clicked. Parent handles full
    // transition after this; the visual delay is purely UX polish.
    setTimeout(() => {
      if (typeof onDismiss === 'function') onDismiss();
    }, 1200);
  }

  // Click handler — saves the field, then checks whether all three are now
  // answered and auto-dismisses if so. Each call also recomputes the local
  // "answered" snapshot using the just-clicked value (state setter is
  // async, so we can't rely on the React state read right after setState).
  async function handleClick(columnName, value) {
    let nextYears = yearsBand;
    let nextInteractions = interactionEstimate;
    let nextShift = shiftPattern;

    if (columnName === 'credentials_years') {
      nextYears = value;
      await handleFieldClick(columnName, value, setYearsBand);
    } else if (columnName === 'credentials_interactions') {
      nextInteractions = value;
      await handleFieldClick(columnName, value, setInteractionEstimate);
    } else if (columnName === 'credentials_shift') {
      nextShift = value;
      await handleFieldClick(columnName, value, setShiftPattern);
    }

    // FR-098: same event fires when all three fields are answered.
    if (nextYears && nextInteractions && nextShift) {
      dismiss(nextYears, nextInteractions, nextShift);
    }
  }

  function handleSkip() {
    dismiss(yearsBand, interactionEstimate, shiftPattern);
  }

  // Thank-you view — brief, then onDismiss fires.
  if (dismissed) {
    return (
      <div
        className={
          'min-h-screen bg-canvas-respondent flex items-center ' +
          'justify-center px-6'
        }
        role="status"
        aria-live="polite"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-center"
        >
          <p className="text-primary text-heading-md font-medium mb-2">
            Thank you.
          </p>
          <p className="text-secondary text-body">
            Your responses are saved.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-canvas-respondent text-primary px-6 py-12"
      role="main"
      aria-labelledby="enrichment-heading"
    >
      <div className="max-w-[720px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-10"
        >
          <h1
            id="enrichment-heading"
            className="text-display font-semibold mb-3"
          >
            You are done — 30 more seconds?
          </h1>
          <p className="text-body text-secondary">
            Help us understand who answered.
          </p>
        </motion.div>

        {/* Field 1 — Front desk experience */}
        <FieldGroup
          legend="Front desk experience"
          options={YEARS_OPTIONS}
          selectedValue={yearsBand}
          onSelect={(v) => handleClick('credentials_years', v)}
        />

        {/* Field 2 — Guest interactions per shift */}
        <FieldGroup
          legend="Guest interactions per shift"
          options={INTERACTIONS_OPTIONS}
          selectedValue={interactionEstimate}
          onSelect={(v) => handleClick('credentials_interactions', v)}
        />

        {/* Field 3 — Shift pattern */}
        <FieldGroup
          legend="Shift pattern"
          options={SHIFT_OPTIONS}
          selectedValue={shiftPattern}
          onSelect={(v) => handleClick('credentials_shift', v)}
        />

        {/* Skip link — visible at all times per FR-098 */}
        <div className="text-center mt-8">
          <button
            type="button"
            onClick={handleSkip}
            className={
              'bg-transparent border-none text-secondary text-body ' +
              'cursor-pointer underline'
            }
          >
            Skip — I&#x2019;m done
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Field group sub-component ───────────────────────────────────────────
// One row of buttons. Selected state shown via tier-style highlight. Single
// click on any button calls onSelect with the option value. Field group has
// no Submit — the parent saves on each click.
function FieldGroup({ legend, options, selectedValue, onSelect }) {
  return (
    <fieldset
      className="bg-canvas-surface rounded-card p-6 mb-6 border-none"
    >
      <legend
        className={
          'text-caption uppercase text-secondary mb-4 font-semibold px-0'
        }
        style={{ letterSpacing: '0.15em' }}
      >
        {legend}
      </legend>
      <div className="flex flex-wrap gap-3">
        {options.map((opt) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onSelect(opt.value)}
              aria-pressed={isSelected}
              className={
                'rounded-lg px-4 py-3 text-body cursor-pointer border ' +
                'transition-colors ' +
                (isSelected
                  ? 'bg-professional-400/10 border-professional-400 ' +
                    'text-professional-400'
                  : 'bg-transparent border-white/10 text-secondary ' +
                    'hover:border-white/30')
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
