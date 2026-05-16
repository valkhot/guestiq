// src/components/question/ScaleQuestion.jsx
// GuestIQ — Scale (Likert) Question Renderer
// S3-NEW-UX (final): Sticky Continue bar matches SingleSelectQuestion pattern.
// S3-09: Migrated to Tailwind utility classes; tier colour passed in as prop.
//
// AC4: Selected state uses SHAPE change (border thickness 2px → 7px filled-ring)
// alongside colour change — accessibility-compliant indicator.

import { useState } from 'react';

export default function ScaleQuestion({ question, onAnswer, tierColor = '#60A5FA' }) {
  const [selected, setSelected] = useState(null);
  const labels = question.scale_labels || ['1', '2', '3', '4', '5'];

  function handleSelect(value) {
    setSelected(value);
  }

  function handleContinue() {
    if (selected === null) return;
    onAnswer(`SCALE_${selected}`, null, null);
  }

  return (
    <div className="pb-20">
      {/* Scale buttons */}
      <div className="grid grid-cols-5 gap-2 mb-3">
        {[1, 2, 3, 4, 5].map((val) => {
          const isSelected = selected === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => handleSelect(val)}
              className={
                'px-2 py-4 rounded-lg cursor-pointer flex flex-col items-center ' +
                'gap-2 transition-all duration-[120ms] ease-out'
              }
              style={{
                background: isSelected
                  ? `${tierColor}26`
                  : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? `1px solid ${tierColor}99`
                  : '1px solid rgba(255,255,255,0.08)',
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = `${tierColor}4D`;
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                }
              }}
            >
              {/* AC4: SHAPE indicator — 2px hollow ring → 7px filled ring */}
              <div
                className="rounded-full transition-[border] duration-[120ms]"
                style={{
                  width: '28px',
                  height: '28px',
                  border: isSelected
                    ? `7px solid ${tierColor}`
                    : '2px solid rgba(255,255,255,0.2)',
                }}
              />
              <span
                className="text-caption font-semibold"
                style={{ color: isSelected ? tierColor : 'var(--text-muted)' }}
              >
                {val}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scale endpoint labels */}
      <div className="flex justify-between px-1 mb-6">
        <span
          className="text-xs text-neutral-600 leading-tight"
          style={{ maxWidth: '35%' }}
        >
          {labels[0]}
        </span>
        <span
          className="text-xs text-neutral-600 leading-tight text-right"
          style={{ maxWidth: '35%' }}
        >
          {labels[4]}
        </span>
      </div>

      {/* Sticky Continue — same pattern as SingleSelectQuestion */}
      <div
        className="fixed bottom-0 left-0 right-0 px-6 pt-4 pb-6 z-10 max-w-[720px] mx-auto"
        style={{
          background:
            'linear-gradient(to top, var(--canvas-respondent) 70%, transparent)',
        }}
      >
        {selected !== null ? (
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
            Select a point on the scale above to continue
          </div>
        )}
      </div>
    </div>
  );
}
