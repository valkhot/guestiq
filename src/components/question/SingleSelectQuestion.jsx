// src/components/question/SingleSelectQuestion.jsx
// GuestIQ — Single Select Question Renderer
// Handles: standard single_select questions and Q0 (QR1) tense routing gate
// Renders radio-button style options. None option appended if has_none_option.
// Option D on Q0 renders an open text field (free text capture).

import { useState } from 'react';

const OPTION_NONE_CODE = 'NONE';
const OPTION_NONE_TEXT = 'None of these fit my situation';

// Option row — the selectable answer item
function OptionRow({ option, isSelected, onSelect, showTextInput, onTextChange, inputValue }) {
  const isNone = option.code === OPTION_NONE_CODE;

  return (
    <div style={{ marginBottom: '0.5rem' }}>
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
            ? 'rgba(96, 165, 250, 0.08)'
            : isNone
              ? 'transparent'
              : 'rgba(255,255,255,0.02)',
          border: isSelected
            ? '1px solid rgba(96, 165, 250, 0.5)'
            : isNone
              ? '1px solid rgba(255,255,255,0.04)'
              : '1px solid rgba(255,255,255,0.07)',
          borderRadius: '8px',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.12s ease',
          marginTop: isNone ? '0.75rem' : '0',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.25)';
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
            border: isSelected ? '5px solid #60A5FA' : '2px solid rgba(255,255,255,0.2)',
            marginTop: '1px',
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
                color: isSelected ? '#60A5FA' : '#475569',
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

      {/* Open text input — shown for Q0 Option D when selected */}
      {showTextInput && isSelected && (
        <div style={{ marginTop: '0.5rem', paddingLeft: '2.5rem' }}>
          <input
            type="text"
            placeholder="Please specify..."
            value={inputValue || ''}
            onChange={(e) => onTextChange(e.target.value)}

            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(96, 165, 250, 0.4)',
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
}

export default function SingleSelectQuestion({ question, onAnswer }) {
  const [selectedCode, setSelectedCode] = useState(null);
  const [otherText, setOtherText] = useState('');

  // Build the full options list — append none option if required
  const allOptions = question.has_none_option
    ? [...question.options, { code: OPTION_NONE_CODE, taxonomy_code: null, text: OPTION_NONE_TEXT }]
    : [...question.options];

  function handleSelect(option) {
    setSelectedCode(option.code);

    // For options that need free text (e.g. Q0 Option D), wait for text input
    // For all others, fire immediately on selection
    const needsText = option.text && option.text.toLowerCase().includes('please specify');
    if (!needsText) {
      onAnswer(option.code, option.taxonomy_code, null);
    }
  }

  function handleTextChange(text) {
    setOtherText(text);
  }

  function handleTextSubmit(option) {
    onAnswer(option.code, option.taxonomy_code, otherText);
  }

  return (
    <div>
      {allOptions.map((option) => {
        const isOtherOption = option.text && option.text.toLowerCase().includes('please specify');
        const isSelected = selectedCode === option.code;

        return (
          <div key={option.code}>
            <OptionRow
              option={option}
              isSelected={isSelected}
              onSelect={handleSelect}
              showTextInput={isOtherOption}
              onTextChange={handleTextChange}
              inputValue={otherText}
            />
            {/* Submit button for free-text options */}
            {isOtherOption && isSelected && (
              <div style={{ paddingLeft: '2.5rem', marginBottom: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleTextSubmit(option)}
                  disabled={!otherText.trim()}
                  style={{
                    padding: '0.5rem 1.25rem',
                    background: otherText.trim() ? '#60A5FA' : 'rgba(96,165,250,0.2)',
                    color: '#0D0D12',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    cursor: otherText.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  Continue →
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
