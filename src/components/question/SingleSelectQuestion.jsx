// src/components/question/SingleSelectQuestion.jsx
// GuestIQ — Single Select Question Renderer
// S3-NEW-UX: Two-step interaction — select then confirm with Continue button.
// Clicking an option highlights it but does NOT advance.
// Continue button appears below ALL options after any valid selection.
// No disabled button states — button either exists (and works) or does not exist yet.

import { useState } from 'react';

const OPTION_NONE_CODE = 'NONE';
const OPTION_NONE_TEXT = 'None of these fit my situation';

function OptionRow({ option, isSelected, onSelect, tierColor }) {
  const isNone = option.code === OPTION_NONE_CODE;

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.875rem',
        width: '100%',
        padding: '0.875rem 1rem',
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
        borderRadius: '8px',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.12s ease',
        marginBottom: '0.5rem',
      }}
      onMouseEnter={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = `${tierColor}40`;
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected) {
          e.currentTarget.style.borderColor = isNone
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.07)';
          e.currentTarget.style.background = isNone ? 'transparent' : 'rgba(255,255,255,0.02)';
        }
      }}
    >
      {/* Radio indicator */}
      <div
        style={{
          flexShrink: 0,
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          border: isSelected ? `5px solid ${tierColor}` : '2px solid rgba(255,255,255,0.2)',
          marginTop: '2px',
          transition: 'border 0.12s ease',
        }}
      />
      {/* Option code + text */}
      <div style={{ flex: 1 }}>
        {!isNone && (
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: isSelected ? tierColor : '#475569',
              marginRight: '0.5rem',
              fontFamily: 'monospace',
            }}
          >
            {option.code}
          </span>
        )}
        <span
          style={{
            fontSize: '0.9375rem',
            color: isNone ? '#475569' : '#E2E8F0',
            lineHeight: 1.5,
            fontStyle: isNone ? 'italic' : 'normal',
          }}
        >
          {option.text}
        </span>
      </div>
    </button>
  );
}

export default function SingleSelectQuestion({ question, onAnswer, tierColor = '#60A5FA' }) {
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [otherText, setOtherText] = useState('');

  // Build options list — regular options first, then None at the bottom
  const regularOptions = question.options || [];
  const noneOption = question.has_none_option
    ? { code: OPTION_NONE_CODE, taxonomy_code: null, text: OPTION_NONE_TEXT }
    : null;

  // Is the currently selected option an "Other – please specify" type?
  const selectedIsOther =
    selectedOption &&
    selectedOption.text &&
    selectedOption.text.toLowerCase().includes('please specify');

  // Continue is ready when:
  // - A non-Other option is selected, OR
  // - The Other option is selected AND text field has content
  const continueReady =
    selectedCode !== null && (!selectedIsOther || otherText.trim().length > 0);

  function handleSelect(option) {
    setSelectedCode(option.code);
    setSelectedOption(option);
    // Clear other text when switching away from an Other option
    if (!option.text?.toLowerCase().includes('please specify')) {
      setOtherText('');
    }
  }

  function handleContinue() {
    if (!continueReady) return;
    const text = selectedIsOther ? otherText.trim() : null;
    onAnswer(selectedCode, selectedOption?.taxonomy_code ?? null, text);
  }

  return (
    <div>
      {/* Regular options */}
      {regularOptions.map((option) => {
        const isSelected = selectedCode === option.code;
        const isOther = option.text?.toLowerCase().includes('please specify');

        return (
          <div key={option.code}>
            <OptionRow
              option={option}
              isSelected={isSelected}
              onSelect={handleSelect}
              tierColor={tierColor}
            />
            {/* Inline text input for Other option — inside the option, not between options */}
            {isOther && isSelected && (
              <div
                style={{
                  marginTop: '-0.25rem',
                  marginBottom: '0.75rem',
                  paddingLeft: '2.875rem',
                }}
              >
                <input
                  type="text"
                  placeholder="Please specify..."
                  value={otherText}
                  onChange={(e) => setOtherText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem 0.875rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: `1px solid ${tierColor}66`,
                    borderRadius: '6px',
                    color: '#E2E8F0',
                    fontSize: '0.9375rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      {/* None option — visually separated from regular options */}
      {noneOption && (
        <div>
          <div
            style={{
              height: '1px',
              background: 'rgba(255,255,255,0.06)',
              margin: '0.5rem 0 0.75rem',
            }}
          />
          <OptionRow
            option={noneOption}
            isSelected={selectedCode === OPTION_NONE_CODE}
            onSelect={handleSelect}
            tierColor={tierColor}
          />
        </div>
      )}

      {/* Continue button — appears below ALL options once a valid selection exists */}
      {/* AC6: No disabled states — button only renders when it works */}
      {continueReady && (
        <div style={{ marginTop: '1.25rem' }}>
          <button
            type="button"
            onClick={handleContinue}
            style={{
              padding: '0.875rem 2rem',
              background: tierColor,
              color: '#0D0D12',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 0.12s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
