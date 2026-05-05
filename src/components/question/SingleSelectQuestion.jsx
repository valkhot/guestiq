// src/components/question/SingleSelectQuestion.jsx
// GuestIQ — Single Select Question Renderer
// S3-NEW-UX (final): Two-step selection + sticky Continue.
// Q1 progressive disclosure: top 7 primary options + expandable extended section.
// Sticky Continue lives in Question.jsx (wraps all renderers).

import { useState } from 'react';

const OPTION_NONE_CODE = 'NONE';
const OPTION_NONE_TEXT = 'None of these fit my situation';

// Q1 display order — reordered by Seattle urban hotel frequency.
// Letter codes preserved for data integrity; visual order changed.
const Q1_PRIMARY_ORDER = ['A', 'D', 'B', 'F', 'E', 'J', 'K'];
const Q1_EXTENDED_ORDER = ['C', 'L', 'G', 'I', 'H', 'M'];

function OptionRow({ option, isSelected, onSelect, tierColor, compact = false }) {
  const isNone = option.code === OPTION_NONE_CODE;
  const size = compact ? '0.875rem' : '0.9375rem';
  const radioSize = compact ? '14px' : '18px';
  const radioFill = compact ? '4px' : '5px';
  const pad = compact ? '0.625rem 0.875rem' : '0.875rem 1rem';

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        width: '100%',
        padding: pad,
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
        marginBottom: compact ? '0' : '0.5rem',
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
          e.currentTarget.style.background = isNone
            ? 'transparent'
            : 'rgba(255,255,255,0.02)';
        }
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: radioSize,
          height: radioSize,
          borderRadius: '50%',
          border: isSelected
            ? `${radioFill} solid ${tierColor}`
            : `2px solid rgba(255,255,255,0.2)`,
          marginTop: '2px',
          transition: 'border 0.12s ease',
        }}
      />
      <div style={{ flex: 1 }}>
        {!isNone && (
          <span
            style={{
              fontSize: '0.6875rem',
              fontWeight: 600,
              color: isSelected ? tierColor : '#475569',
              marginRight: '0.375rem',
              fontFamily: 'monospace',
            }}
          >
            {option.code}
          </span>
        )}
        <span
          style={{
            fontSize: size,
            color: isNone ? '#64748B' : '#E2E8F0',
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

// Q1-specific progressive disclosure layout
function Q1Layout({
  options,
  selectedCode,
  onSelect,
  tierColor,
  otherText,
  onOtherChange,
}) {
  const [extended, setExtended] = useState(false);

  const byCode = Object.fromEntries(options.map((o) => [o.code, o]));
  const primaryOptions = Q1_PRIMARY_ORDER.map((c) => byCode[c]).filter(Boolean);
  const extendedOptions = Q1_EXTENDED_ORDER.map((c) => byCode[c]).filter(Boolean);

  return (
    <div>
      {primaryOptions.map((option) => {
        const isSelected = selectedCode === option.code;
        const isOther = option.text?.toLowerCase().includes('please specify');
        return (
          <div key={option.code}>
            <OptionRow
              option={option}
              isSelected={isSelected}
              onSelect={onSelect}
              tierColor={tierColor}
            />
            {isOther && isSelected && (
              <OtherInput
                tierColor={tierColor}
                value={otherText}
                onChange={onOtherChange}
              />
            )}
          </div>
        );
      })}

      {/* Extended toggle — same size as option text */}
      <button
        type="button"
        onClick={() => setExtended((p) => !p)}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          width: '100%',
          padding: '0.875rem 1rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '8px',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all 0.12s ease',
          marginBottom: '0.5rem',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${tierColor}40`;
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
        }}
      >
        {/* Square toggle indicator */}
        <div
          style={{
            flexShrink: 0,
            width: '18px',
            height: '18px',
            borderRadius: '4px',
            border: `1px solid rgba(255,255,255,0.2)`,
            marginTop: '2px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              color: '#94A3B8',
              lineHeight: 1,
              fontWeight: 500,
            }}
          >
            {extended ? '−' : '+'}
          </span>
        </div>
        <span
          style={{
            fontSize: '0.9375rem',
            color: '#94A3B8',
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {extended
            ? "My guest's reason is not listed above — collapse"
            : "My guest's reason is not listed above — see more options"}
        </span>
        <span
          style={{
            flexShrink: 0,
            fontSize: '0.625rem',
            color: '#475569',
            marginTop: '4px',
            transform: extended ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        >
          ▼
        </span>
      </button>

      {/* Extended options */}
      {extended && (
        <div
          style={{
            background: 'rgba(255,255,255,0.015)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '8px',
            padding: '0.5rem 0.75rem',
            marginBottom: '0.5rem',
          }}
        >
          {extendedOptions.map((option, i) => {
            const isSelected = selectedCode === option.code;
            const isOther = option.text?.toLowerCase().includes('please specify');
            const isLast = i === extendedOptions.length - 1;
            return (
              <div
                key={option.code}
                style={{
                  borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)',
                  paddingBottom: isLast ? 0 : '0.125rem',
                  marginBottom: isLast ? 0 : '0.125rem',
                }}
              >
                <OptionRow
                  option={option}
                  isSelected={isSelected}
                  onSelect={onSelect}
                  tierColor={tierColor}
                  compact
                />
                {isOther && isSelected && (
                  <OtherInput
                    tierColor={tierColor}
                    value={otherText}
                    onChange={onOtherChange}
                    compact
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function OtherInput({ tierColor, value, onChange, compact = false }) {
  return (
    <div
      style={{
        marginTop: '-0.25rem',
        marginBottom: '0.75rem',
        paddingLeft: compact ? '2.25rem' : '2.875rem',
      }}
    >
      <input
        type="text"
        placeholder="Please specify..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
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
  );
}

export default function SingleSelectQuestion({ question, onAnswer, tierColor = '#60A5FA' }) {
  const [selectedCode, setSelectedCode] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [otherText, setOtherText] = useState('');

  const regularOptions = question.options || [];
  const noneOption = question.has_none_option
    ? { code: OPTION_NONE_CODE, taxonomy_code: null, text: OPTION_NONE_TEXT }
    : null;

  const selectedIsOther =
    selectedOption &&
    selectedOption.text &&
    selectedOption.text.toLowerCase().includes('please specify');

  const continueReady =
    selectedCode !== null && (!selectedIsOther || otherText.trim().length > 0);

  function handleSelect(option) {
    setSelectedCode(option.code);
    setSelectedOption(option);
    if (!option.text?.toLowerCase().includes('please specify')) {
      setOtherText('');
    }
  }

  function handleContinue() {
    if (!continueReady) return;
    const text = selectedIsOther ? otherText.trim() : null;
    onAnswer(selectedCode, selectedOption?.taxonomy_code ?? null, text);
  }

  // Q1 gets progressive disclosure layout; all other questions get standard layout
  const isQ1 = question.id === 'Q1';

  return (
    <div
      style={{
        paddingBottom: '5rem',
      }}
    >
      {isQ1 ? (
        <Q1Layout
          options={regularOptions}
          selectedCode={selectedCode}
          onSelect={handleSelect}
          tierColor={tierColor}
          otherText={otherText}
          onOtherChange={setOtherText}
        />
      ) : (
        regularOptions.map((option) => {
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
              {isOther && isSelected && (
                <OtherInput
                  tierColor={tierColor}
                  value={otherText}
                  onChange={setOtherText}
                />
              )}
            </div>
          );
        })
      )}

      {/* None option — always below all options, above sticky bar */}
      {noneOption && (
        <>
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
        </>
      )}

      {/* Sticky Continue — fixed to bottom, visible always, active when selection made */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1rem 1.5rem 1.5rem',
          background: 'linear-gradient(to top, #0D0D12 70%, transparent)',
          zIndex: 10,
          maxWidth: '720px',
          margin: '0 auto',
        }}
      >
        {continueReady ? (
          <button
            type="button"
            onClick={handleContinue}
            style={{
              width: '100%',
              padding: '0.875rem',
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
        ) : (
          <div
            style={{
              width: '100%',
              padding: '0.875rem',
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '8px',
              fontSize: '0.9375rem',
              color: '#334155',
              textAlign: 'center',
              userSelect: 'none',
            }}
          >
            Select an option above to continue
          </div>
        )}
      </div>
    </div>
  );
}
