// src/components/screens/WelcomeScreen.jsx
// GuestIQ — Unified Welcome + Tier Selection Screen
// S2-06 + S2-18 | FR-004, FR-007, FR-008, FR-009, FR-010, NFR-015
//
// Design spec: Visual Design System v1.0 Section 4 (Tier Card Component Anatomy)
// Single screen — hook text + tier cards simultaneously.
// No Continue button. Tier selection IS the start action.

import { useEffect } from 'react';

import { trackWelcomeHookViewed, trackTierSelected } from '../../services/analytics';

// Tier colour map — from Visual Identity Document (locked values)
const TIER_COLORS = {
  amateur: '#4ADE80',
  professional: '#60A5FA',
  expert: '#A78BFA',
};

// TierCard — receives all content as props, zero hardcoded strings
function TierCard({ tier, tierData, onSelect, isPopular }) {
  const color = TIER_COLORS[tier];

  return (
    <div
      style={{
        background: '#161620',
        border: `1px solid ${color}33`,
        borderRadius: '12px',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        cursor: 'pointer',
        transition: 'border-color 0.15s ease, transform 0.15s ease',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${color}99`;
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${color}33`;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Most Selected badge — Professional only */}
      {isPopular && (
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1E3A8A',
            color: '#BFDBFE',
            fontSize: '11px',
            fontWeight: 500,
            padding: '2px 12px',
            borderRadius: '999px',
            whiteSpace: 'nowrap',
          }}
        >
          ★ Most selected
        </div>
      )}

      {/* Tier name */}
      <div
        style={{
          fontSize: '1.25rem',
          fontWeight: 600,
          color,
          textTransform: 'capitalize',
        }}
      >
        {tierData.name}
      </div>

      {/* Descriptor */}
      <div
        style={{
          fontSize: '0.875rem',
          color: '#94A3B8',
          lineHeight: 1.5,
          flexGrow: 1,
        }}
      >
        {tierData.descriptor}
      </div>

      {/* Time + question count */}
      <div
        style={{
          fontSize: '0.8125rem',
          color: '#64748B',
        }}
      >
        {tierData.timeEstimate} · {tierData.questionCount} questions
      </div>

      {/* CTA button */}
      <button
        type="button"
        onClick={() => onSelect(tier)}
        style={{
          marginTop: '0.5rem',
          padding: '0.75rem 1rem',
          background: color,
          color: '#0D0D12',
          border: 'none',
          borderRadius: '8px',
          fontSize: '0.9375rem',
          fontWeight: 500,
          cursor: 'pointer',
          width: '100%',
          transition: 'opacity 0.15s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        {tierData.ctaLabel}
      </button>
    </div>
  );
}

// WelcomeScreen — the unified hook + tier selection screen
// All content comes from props (uiCopy + tiers from useQuestionnaire hook)
export default function WelcomeScreen({ uiCopy, tiers, onTierSelected, onNotNow, propertyId }) {
  // AC5: Fire welcome_hook_viewed on render
  useEffect(() => {
    trackWelcomeHookViewed({ property_id: propertyId });
  }, [propertyId]);

  // AC5: Fire tier_selected when tier card CTA clicked
  function handleTierSelect(tier) {
    trackTierSelected({ tier, property_id: propertyId });
    onTierSelected(tier);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0D0D12',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%' }}>
        {/* GuestIQ wordmark */}
        <div
          style={{
            textAlign: 'center',
            fontSize: '1rem',
            fontWeight: 600,
            color: '#60A5FA',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}
        >
          GuestIQ
        </div>

        {/* AC1: Hook text — renders immediately, no delay */}
        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: 700,
            color: '#F8FAFC',
            textAlign: 'center',
            lineHeight: 1.25,
            marginBottom: '1rem',
          }}
        >
          {/* AC8: From uiCopy — not hardcoded */}
          {uiCopy.welcomeHookText}
        </h1>

        {/* Context statement */}
        <p
          style={{
            fontSize: '0.9375rem',
            color: '#94A3B8',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: '2.5rem',
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}
        >
          {uiCopy.welcomeContextStatement}
        </p>

        {/* AC2: Three tier cards — correct colors, descriptors, time/Q counts, CTAs */}
        {/* AC1: No Continue button — tier selection IS the start action */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          {['amateur', 'professional', 'expert'].map((tier) => (
            <TierCard
              key={tier}
              tier={tier}
              tierData={tiers[tier]}
              onSelect={handleTierSelect}
              isPopular={tier === 'professional'}
            />
          ))}
        </div>

        {/* AC3 + AC9: Privacy notice — visible without scrolling, from uiCopy */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '1.25rem',
          }}
        >
          {/* AC8: From uiCopy.privacyNoticeText — not hardcoded */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#64748B',
              lineHeight: 1.6,
              marginBottom: '0.375rem',
            }}
          >
            {uiCopy.privacyNoticeText}
          </p>
          {/* AC3: Voluntary participation text — required by FR-008 v2.0 */}
          <p
            style={{
              fontSize: '0.8125rem',
              color: '#64748B',
              lineHeight: 1.6,
            }}
          >
            {uiCopy.voluntaryParticipationText}
          </p>
        </div>

        {/* AC4: Not now link — no session record, no localStorage token */}
        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            onClick={onNotNow}
            style={{
              background: 'none',
              border: 'none',
              color: '#475569',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              padding: '0.25rem 0.5rem',
              textDecoration: 'underline',
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#94A3B8')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#475569')}
          >
            {uiCopy.notNowLinkLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
