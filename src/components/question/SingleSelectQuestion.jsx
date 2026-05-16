// src/components/question/SingleSelectQuestion.jsx
// GuestIQ — Single Select Question Renderer
// S3-NEW-UX (final): Two-step selection + sticky Continue.
// Q1 progressive disclosure: top 7 primary options + expandable extended section.
// Sticky Continue lives in Question.jsx (wraps all renderers).
//
// S3-09: Migrated to Tailwind utility classes; tier colour passed in as prop.
// AC4: Selected state uses SHAPE change — 2px outline radio → filled-ring radio.

import { useState } from 'react';

const OPTION_NONE_CODE = 'NONE';
const OPTION_NONE_TEXT = 'None of these fit my situation';

// Q1 display order — reordered by Seattle urban hotel frequency.
// Letter codes preserved for data integrity; visual order changed.
const Q1_PRIMARY_ORDER = ['A', 'D', 'B', 'F', 'E', 'J', 'K'];
const Q1_EXTENDED_ORDER = ['C', 'L', 'G', 'I', 'H', 'M'];

function OptionRow({ option, isSelected, onSelect, tierColor, compact = false }) {
  const isNone = option.code === OPTION_NONE_CODE;
  const radioSize = compact ? '14px' : '18px';
  const radioFill = compact ? '4px' : '5px';
  const pad = compact ? '0.625rem 0.875rem' : '0.875rem 1rem';
  const fontSize = compact ? '0.875rem' : '0.9375rem';

  return (
    <button
      type="button"
      onClick={() => onSelect(option)}
      className={
        'flex items-start gap-3 w-full rounded-lg cursor-pointer text-left ' +
        'transition-all duration-[120ms] ' +
        (compact ? 'mb-0' : 'mb-2')
      }
      style={{
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
      {/* AC4: SHAPE indicator — 2px hollow ring → 5px filled ring */}
      <div
        className="flex-shrink-0 rounded-full transition-[border] duration-[120ms]"
        style={{
          width: radioSize,
          height: radioSize,
          border: isSelected
            ? `${radioFill} solid ${tierColor}`
            : '2px solid rgba(255,255,255,0.2)',
          marginTop: '2px',
        }}
      />
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
          style={{ fontSize }}
        >
          {option.text}
        </span>
      </div>
    </button>
  );
}

// Q1-specific progressive disclosure layout
function Q1Layout({ options, selectedCode, onSelect, tierColor, otherText, onOtherChange }) {
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
              <OtherInput tierColor={tierColor} value={otherText} onChange={onOtherChange} />
            )}
          </div>
        );
      })}

      {/* Extended toggle — same size as option text */}
      <button
        type="button"
        onClick={() => setExtended((p) => !p)}
        className={
          'flex items-start gap-3 w-full px-4 py-3.5 rounded-lg cursor-pointer ' +
          'text-left transition-all duration-[120ms] mb-2 ' +
          'bg-white/[0.02] border border-white/[0.07] hover:bg-white/[0.03]'
        }
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${tierColor}40`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
        }}
      >
        {/* Square toggle indicator */}
        <div
          className={
            'flex-shrink-0 rounded border border-white/20 flex items-center ' +
            'justify-center'
          }
          style={{
            width: '18px',
            height: '18px',
            marginTop: '2px',
          }}
        >
          <span className="text-xs text-secondary leading-none font-medium">
            {extended ? '−' : '+'}
          </span>
        </div>
        <span className="text-body text-secondary leading-relaxed flex-1">
          {extended
            ? "My guest's reason is not listed above — collapse"
            : "My guest's reason is not listed above — see more options"}
        </span>
        <span
          className="flex-shrink-0 text-neutral-600"
          style={{
            fontSize: '0.625rem',
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
          className={
            'rounded-lg border border-white/[0.05] px-3 py-2 mb-2 ' +
            'bg-white/[0.015]'
          }
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
      className="-mt-1 mb-3"
      style={{
        paddingLeft: compact ? '2.25rem' : '2.875rem',
      }}
    >
      <input
        type="text"
        placeholder="Please specify..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={
          'w-full px-3.5 py-2.5 rounded-md text-body outline-none box-border ' +
          'bg-white/[0.04] text-neutral-200'
        }
        style={{
          border: `1px solid ${tierColor}66`,
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
    <div className="pb-20">
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
                <OtherInput tierColor={tierColor} value={otherText} onChange={setOtherText} />
              )}
            </div>
          );
        })
      )}

      {/* None option — always below all options, above sticky bar */}
      {noneOption && (
        <>
          <div className="h-px bg-white/[0.06] mt-2 mb-3" />
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
        className="fixed bottom-0 left-0 right-0 px-6 pt-4 pb-6 z-10 max-w-[720px] mx-auto"
        style={{
          background:
            'linear-gradient(to top, var(--canvas-respondent) 70%, transparent)',
        }}
      >
        {continueReady ? (
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
        ) : (
          <div
            className={
              'w-full py-3.5 rounded-lg text-body text-center select-none ' +
              'bg-white/[0.04] border border-white/[0.06] text-[#334155]'
            }
          >
            Select an option above to continue
          </div>
        )}
      </div>
    </div>
  );
}
