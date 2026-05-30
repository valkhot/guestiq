// src/components/question/MultiSelectQuestion.jsx
// GuestIQ — Multi Select Question Renderer
// B-3-001 fix (found in S3-12): multi_select questions previously fell back to
//   SingleSelectQuestion (a RadioGroup), which only permits one selection.
//   This component is the dedicated multi-select renderer.
//
// Behaviour:
//   - Multiple options selectable.
//   - max_selections enforced — once the cap is reached, unpicked options are
//     disabled. Q21/Q34 cap = 3, Q30 cap = 2. Cap comes from question data.
//   - "None of these fit my situation" is mutually exclusive with all regular
//     options: picking None clears regular picks; picking any regular option
//     clears None.
//   - "Other – please specify" reveals an inline text input when selected.
//   - Sticky Continue at the bottom, consistent with SingleSelectQuestion.
//
// Accessibility: Radix Checkbox primitive — role="checkbox", aria-checked,
//   keyboard support — consistent with the S3-10 Radix migration.
//
// onAnswer contract: calls onAnswer(codesArray, taxonomyCodesArray, otherText)
//   where codesArray is an array of selected option codes (or ['NONE']).
//   QuestionScreen.handleAnswer fans this out to one response row per code.
//
// B-3-002 fix (found in S3-13): every multi_select answer was being written
//   to the responses table TWICE. Cause: the Continue button stayed live and
//   clickable during the awaited insert sequence (~1.2s for a 6-option
//   answer), so a second click re-ran the whole submission. Fix: a useRef
//   submit latch makes handleContinue idempotent — once a submission starts,
//   any further click is a no-op — and the button is disabled the moment a
//   submission begins.

import { useState, useRef } from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

const OPTION_NONE_CODE = 'NONE';
const OPTION_NONE_TEXT = 'None of these fit my situation';

// Single option rendered as a Radix Checkbox.Root. Visual treatment (square
// indicator, code letter, option text, hover) sits inside as children.
function OptionItem({
  option,
  isSelected,
  isDisabled,
  tierColor,
  onToggle,
}) {
  const isNone = option.code === OPTION_NONE_CODE;

  return (
    <CheckboxPrimitive.Root
      checked={isSelected}
      disabled={isDisabled}
      onCheckedChange={() => onToggle(option.code)}
      id={`opt-${option.code}`}
      className={
        'flex items-start gap-3 w-full rounded-lg text-left mb-2 ' +
        'transition-all duration-[120ms] ' +
        (isDisabled ? 'cursor-not-allowed' : 'cursor-pointer')
      }
      style={{
        padding: '0.875rem 1rem',
        opacity: isDisabled ? 0.4 : 1,
        background: isSelected
          ? `${tierColor}14`
          : isNone
            ? 'transparent'
            : 'rgba(255,255,255,0.02)',
        border: isSelected
          ? `1px solid ${tierColor}80`
          : isNone
            ? '1px solid rgba(255,255,255,0.04)'
            : '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !isDisabled) {
          e.currentTarget.style.borderColor = `${tierColor}40`;
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isDisabled) {
          e.currentTarget.style.borderColor = isNone
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.07)';
          e.currentTarget.style.background = isNone
            ? 'transparent'
            : 'rgba(255,255,255,0.02)';
        }
      }}
    >
      {/* SHAPE indicator — square (vs round for single-select). 2px hollow
          ring → filled square with check on selection. */}
      <div
        className={
          'flex-shrink-0 flex items-center justify-center ' +
          'transition-all duration-[120ms]'
        }
        style={{
          width: '18px',
          height: '18px',
          marginTop: '2px',
          borderRadius: '4px',
          border: isSelected
            ? `1px solid ${tierColor}`
            : '2px solid rgba(255,255,255,0.2)',
          background: isSelected ? tierColor : 'transparent',
        }}
        aria-hidden="true"
      >
        {isSelected && (
          <svg
            width="11"
            height="11"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6.2L4.8 9L10 3"
              stroke="var(--canvas-respondent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div className="flex-1">
        {!isNone && (
          <span
            className="font-semibold mr-1.5 font-mono"
            style={{
              fontSize: '0.6875rem',
              color: isSelected ? tierColor : 'var(--text-muted)',
            }}
          >
            {option.code}
          </span>
        )}
        <span
          className={
            'leading-relaxed ' +
            (isNone ? 'text-muted italic' : 'text-neutral-200')
          }
          style={{ fontSize: '0.9375rem' }}
        >
          {option.text}
        </span>
      </div>
    </CheckboxPrimitive.Root>
  );
}

function OtherInput({ tierColor, value, onChange }) {
  return (
    <div className="-mt-1 mb-3" style={{ paddingLeft: '2.875rem' }}>
      <input
        type="text"
        placeholder="Please specify..."
        aria-label="Please specify your option"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          'w-full px-3.5 py-2.5 rounded-md text-body outline-none box-border ' +
          'bg-white/[0.04] text-neutral-200'
        }
        style={{ border: `1px solid ${tierColor}66` }}
      />
    </div>
  );
}

export default function MultiSelectQuestion({
  question,
  onAnswer,
  tierColor = '#60A5FA',
}) {
  // selectedCodes — array of currently-selected regular option codes.
  const [selectedCodes, setSelectedCodes] = useState([]);
  // noneSelected — whether the "None of these" option is active.
  const [noneSelected, setNoneSelected] = useState(false);
  const [otherText, setOtherText] = useState('');

  // B-3-002: submit latch. Set true the instant a submission begins and
  // never reset for the life of this component instance. Because Question.jsx
  // mounts a fresh MultiSelectQuestion per question (keyed by question.id),
  // a new instance starts with submitted=false — so the latch is per
  // question, exactly as intended. A ref (not state) is used so the guard
  // takes effect synchronously within the same click, before any await.
  const submittedRef = useRef(false);
  // submitting drives the disabled/visual state of the Continue button.
  const [submitting, setSubmitting] = useState(false);

  const regularOptions = question.options || [];
  const noneOption = question.has_none_option
    ? { code: OPTION_NONE_CODE, taxonomy_code: null, text: OPTION_NONE_TEXT }
    : null;

  // max_selections: null means unlimited; otherwise it is the cap.
  const maxSelections = question.max_selections ?? null;
  const capReached =
    maxSelections !== null && selectedCodes.length >= maxSelections;

  const optionsByCode = Object.fromEntries(
    regularOptions.map((o) => [o.code, o])
  );

  // Is a selected option an "Other – please specify" option?
  const selectedOtherCode = selectedCodes.find((code) =>
    optionsByCode[code]?.text?.toLowerCase().includes('please specify')
  );
  const needsOtherText = Boolean(selectedOtherCode);

  // Continue is ready when at least one selection exists, and — if an "Other"
  // option is picked — the free-text field is non-empty.
  const continueReady =
    (noneSelected || selectedCodes.length > 0) &&
    (!needsOtherText || otherText.trim().length > 0);

  // Toggle a regular option. Selecting any regular option clears None.
  function toggleRegular(code) {
    if (submittedRef.current) return; // B-3-002: locked after submit
    setNoneSelected(false);
    setSelectedCodes((prev) => {
      if (prev.includes(code)) {
        // Deselecting — if it was the Other option, clear its text.
        const isOther = optionsByCode[code]?.text
          ?.toLowerCase()
          .includes('please specify');
        if (isOther) setOtherText('');
        return prev.filter((c) => c !== code);
      }
      // Selecting — enforce the cap. If at cap, ignore the new selection.
      if (maxSelections !== null && prev.length >= maxSelections) {
        return prev;
      }
      return [...prev, code];
    });
  }

  // Toggle the None option. Selecting None clears all regular selections.
  function toggleNone() {
    if (submittedRef.current) return; // B-3-002: locked after submit
    setNoneSelected((prev) => {
      const next = !prev;
      if (next) {
        setSelectedCodes([]);
        setOtherText('');
      }
      return next;
    });
  }

  function handleToggle(code) {
    if (code === OPTION_NONE_CODE) {
      toggleNone();
    } else {
      toggleRegular(code);
    }
  }

  function handleContinue() {
    // B-3-002: idempotency latch. The first invocation flips submittedRef
    // synchronously; any later invocation (double-click, Enter+click, a
    // click landing during the awaited insert sequence) returns immediately.
    // This is the actual fix for the double-write — it does not depend on
    // how the second invocation is triggered.
    if (submittedRef.current) return;
    if (!continueReady) return;
    submittedRef.current = true;
    setSubmitting(true);

    if (noneSelected) {
      onAnswer([OPTION_NONE_CODE], [null], null);
      return;
    }

    // Build parallel arrays of codes and taxonomy codes, preserving the
    // option order as defined in the question data.
    const orderedCodes = regularOptions
      .map((o) => o.code)
      .filter((c) => selectedCodes.includes(c));
    const taxonomyCodes = orderedCodes.map(
      (c) => optionsByCode[c]?.taxonomy_code ?? null
    );
    const text = needsOtherText ? otherText.trim() : null;
    onAnswer(orderedCodes, taxonomyCodes, text);
  }

  // The Continue button is interactive only when a valid selection exists
  // AND no submission is in progress.
  const continueActive = continueReady && !submitting;

  return (
    <div className="pb-20">
      <div role="group" aria-label="Answer options">
        {regularOptions.map((option) => {
          const isSelected = selectedCodes.includes(option.code);
          const isOther = option.text
            ?.toLowerCase()
            .includes('please specify');
          // Disable unpicked options once the cap is reached. None being
          // selected also disables all regular options. After submit, all
          // options are locked (B-3-002).
          const isDisabled =
            (!isSelected && capReached) || noneSelected || submitting;
          return (
            <div key={option.code}>
              <OptionItem
                option={option}
                isSelected={isSelected}
                isDisabled={isDisabled}
                tierColor={tierColor}
                onToggle={handleToggle}
              />
              {isOther && isSelected && (
                <OtherInput
                  tierColor={tierColor}
                  value={otherText}
                  onChange={setOtherText}
                />
              )}
            </div>
          );
        })}

        {/* None option — always below all options, mutually exclusive. */}
        {noneOption && (
          <>
            <div
              className="h-px bg-white/[0.06] mt-2 mb-3"
              aria-hidden="true"
            />
            <OptionItem
              option={noneOption}
              isSelected={noneSelected}
              isDisabled={submitting}
              tierColor={tierColor}
              onToggle={handleToggle}
            />
          </>
        )}
      </div>

      {/* Sticky Continue — fixed to bottom, active when a valid selection
          exists and no submission is in progress. Mirrors
          SingleSelectQuestion. */}
      <div
        className={
          'fixed bottom-0 left-0 right-0 px-6 pt-4 pb-6 z-10 ' +
          'max-w-[720px] mx-auto'
        }
        style={{
          background:
            'linear-gradient(to top, var(--canvas-respondent) 70%, transparent)',
        }}
      >
        {continueActive ? (
          <button
            type="button"
            onClick={handleContinue}
            className={
              'w-full py-3.5 rounded-lg text-body font-semibold cursor-pointer ' +
              'transition-opacity duration-[120ms] hover:opacity-90'
            }
            style={{
              background: tierColor,
              color: 'var(--canvas-respondent)',
              border: 'none',
            }}
          >
            Continue →
          </button>
        ) : submitting ? (
          // B-3-002: once a submission starts, the button is replaced by a
          // non-interactive saving state — it cannot be clicked again.
          <div
            className={
              'w-full py-3.5 rounded-lg text-body font-semibold text-center ' +
              'select-none cursor-default'
            }
            style={{
              background: tierColor,
              color: 'var(--canvas-respondent)',
              border: 'none',
              opacity: 0.7,
            }}
            aria-live="polite"
          >
            Saving…
          </div>
        ) : (
          <div
            className={
              'w-full py-3.5 rounded-lg text-body text-center select-none ' +
              'bg-white/[0.04] border border-white/[0.06] text-[#334155]'
            }
            aria-live="polite"
          >
            {maxSelections !== null
              ? `Select up to ${maxSelections} option${
                  maxSelections === 1 ? '' : 's'
                } above to continue`
              : 'Select at least one option above to continue'}
          </div>
        )}
      </div>
    </div>
  );
}
