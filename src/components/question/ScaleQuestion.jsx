// src/components/question/ScaleQuestion.jsx
// GuestIQ — Scale (Likert) Question Renderer
// Handles scale_5 type questions — 5-point scale with labeled endpoints and midpoint.
// Fires onAnswer with scale value 1-5 on selection.

import { useState } from 'react';

export default function ScaleQuestion({ question, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const labels = question.scale_labels || ['1', '2', '3', '4', '5'];

  function handleSelect(value) {
    setSelected(value);
    // Scale value is 1-indexed (1=leftmost, 5=rightmost)
    onAnswer(`SCALE_${value}`, null, null);
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
                background: isSelected ? 'rgba(96, 165, 250, 0.15)' : 'rgba(255,255,255,0.02)',
                border: isSelected
                  ? '1px solid rgba(96, 165, 250, 0.6)'
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
                  e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.3)';
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
                  border: isSelected ? '7px solid #60A5FA' : '2px solid rgba(255,255,255,0.2)',
                  transition: 'border 0.12s ease',
                }}
              />
              {/* Numeric value */}
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: isSelected ? '#60A5FA' : '#64748B',
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
    </div>
  );
}
