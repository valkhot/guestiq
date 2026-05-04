// src/components/question/ScaleQuestion.jsx
// GuestIQ — Scale (Likert) Question Renderer
// S3-NEW-UX: Two-step interaction — click scale point to select, then Continue to advance.
// AC4: Continue button appears immediately after a scale point is clicked.
// AC6: No disabled states.

import { useState } from 'react';

export default function ScaleQuestion({ question, onAnswer, tierColor = '#60A5FA' }) {
  const [selected, setSelected] = useState(null);
  const labels = question.scale_labels || ['1', '2', '3', '4', '5'];

  function handleSelect(value) {
    setSelected(value);
    // Two-step: clicking sets state only, Continue fires onAnswer
  }

  function handleContinue() {
    if (selected === null) return;
    onAnswer(`SCALE_${selected}`, null, null);
  }

  return (
    <div>
      {/* Scale buttons */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: '0.5rem',
          marginBottom: '0.75rem',
        }}
      >
        {[1, 2, 3, 4, 5].map((val) => {
          const isSelected = selected === val;
          return (
            <button
              key={val}
              type="button"
              onClick={() => handleSelect(val)}
              style={{
                padding: '1rem 0.5rem',
                background: isSelected ? `${tierColor}26` : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? `1px solid ${tierColor}99`
                  : '1px solid rgba(255,255,255,0.08)',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.12s ease',
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
              {/* Circle indicator */}
              <div
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: isSelected ? `7px solid ${tierColor}` : '2px solid rgba(255,255,255,0.2)',
                  transition: 'border 0.12s ease',
                }}
              />
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: isSelected ? tierColor : '#64748B',
                }}
              >
                {val}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scale endpoint labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 0.25rem',
          marginBottom: '1.5rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: '#475569', maxWidth: '35%', lineHeight: 1.3 }}>
          {labels[0]}
        </span>
        <span
          style={{
            fontSize: '0.75rem',
            color: '#475569',
            maxWidth: '35%',
            lineHeight: 1.3,
            textAlign: 'right',
          }}
        >
          {labels[4]}
        </span>
      </div>

      {/* Continue button — appears immediately after scale point clicked (AC4) */}
      {selected !== null && (
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
      )}
    </div>
  );
}
