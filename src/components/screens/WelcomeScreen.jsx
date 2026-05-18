// src/components/screens/WelcomeScreen.jsx
// GuestIQ — Unified Welcome + Tier Selection Screen
// S2-06 + S2-18 | FR-004, FR-007, FR-008, FR-009, FR-010, NFR-015
//
// Design spec: Visual Design System v1.0 Section 4 (Tier Card Component Anatomy)
// Single screen — hook text + tier cards simultaneously.
// No Continue button. Tier selection IS the start action.
//
// S3-09: Migrated from inline hex styles to Tailwind utility classes.
//   Inline `style` is retained ONLY for runtime tier-colour values
//   (hex-with-alpha suffixes like `${color}33` that Tailwind cannot emit
//   from a prop at build time).
// S3-10 (Commit 3): Tier cards migrated to Radix RadioGroup per NFR-019.
//   The whole card is a RadioGroup.Item (renders as <button role="radio">),
//   enlarging the click target and matching the visual affordance. The
//   onValueChange handler fires handleTierSelect immediately — preserving
//   the existing "select tier = start session" behaviour. Screen readers
//   now announce "Choose your tier, radio group, 3 items" with each card
//   announced as a radio option with checked state.

import { useEffect, useState } from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { trackWelcomeHookViewed, trackTierSelected } from '../../services/analytics';
import { TIER_HEX } from '../../constants/tierColors';

const TIER_ORDER = ['amateur', 'professional', 'expert'];

// TierCard — rendered as a Radix RadioGroup.Item. The whole card is
// interactive: clicking anywhere on it selects the tier and immediately
// advances the session (via Root's onValueChange in the parent).
function TierCard({ tier, tierData, isPopular, isHovered, onHover, onLeave }) {
  const color = TIER_HEX[tier];

  return (
    <RadioGroupPrimitive.Item
      value={tier}
      id={`tier-${tier}`}
      aria-label={`${tierData.name} tier — ${tierData.descriptor}`}
      className={
        'relative bg-canvas-surface rounded-card p-6 flex flex-col gap-3 ' +
        'cursor-pointer text-left transition-[border-color,transform] ' +
        'duration-150 w-full'
      }
      style={{
        // Dynamic tier border — alpha suffix not expressible in Tailwind from a prop
        border: `1px solid ${isHovered ? `${color}99` : `${color}33`}`,
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Most Selected badge — Professional only */}
      {isPopular && (
        <div
          className={
            'absolute -top-3 left-1/2 -translate-x-1/2 bg-professional-800 ' +
            'text-professional-200 px-3 py-0.5 rounded-pill whitespace-nowrap ' +
            'font-medium'
          }
          style={{ fontSize: '11px' }}
          aria-hidden="true"
        >
          ★ Most selected
        </div>
      )}

      {/* Tier name */}
      <div
        className="text-heading-md font-semibold capitalize"
        style={{ color }}
      >
        {tierData.name}
      </div>

      {/* Descriptor */}
      <div className="text-sm text-secondary leading-relaxed flex-grow">
        {tierData.descriptor}
      </div>

      {/* Time + question count */}
      <div className="text-caption text-muted">
        {tierData.timeEstimate} · {tierData.questionCount} questions
      </div>

      {/* CTA pseudo-button — visual call-to-action. Not a real button
          (would be invalid HTML inside RadioGroup.Item which is already a
          button). The whole Item is the click target. */}
      <div
        className={
          'mt-2 px-4 py-3 rounded-lg text-body font-medium w-full text-center'
        }
        style={{
          background: color,
          color: 'var(--canvas-respondent)',
        }}
        aria-hidden="true"
      >
        {tierData.ctaLabel}
      </div>
    </RadioGroupPrimitive.Item>
  );
}

// WelcomeScreen — the unified hook + tier selection screen
// All content comes from props (uiCopy + tiers from useQuestionnaire hook)
export default function WelcomeScreen({
  uiCopy,
  tiers,
  onTierSelected,
  onNotNow,
  propertyId,
}) {
  // Track which tier card is currently hovered, for the visual lift effect.
  // Stored as state because Radix Item replaces the previous div, and we
  // can't mutate currentTarget.style on a Radix component reliably across
  // re-renders (hover state was previously inline; now we lift it to state
  // so the inline style derives from a single source of truth).
  const [hoveredTier, setHoveredTier] = useState(null);

  // AC5: Fire welcome_hook_viewed on render
  useEffect(() => {
    trackWelcomeHookViewed({ property_id: propertyId });
  }, [propertyId]);

  // AC5: Fire tier_selected when a tier card is selected.
  // Behaviour preserved: selecting a tier IMMEDIATELY starts the session.
  // RadioGroup.Root.onValueChange fires here on click or keyboard activation.
  function handleValueChange(tier) {
    if (!tier) return;
    trackTierSelected({ tier, property_id: propertyId });
    onTierSelected(tier);
  }

  return (
    <div
      className={
        'min-h-screen bg-canvas-respondent flex flex-col items-center ' +
        'justify-center px-4 py-8'
      }
    >
      <div className="w-full max-w-[720px]">
        {/* GuestIQ wordmark */}
        <div
          className={
            'text-center text-base font-semibold text-professional-400 ' +
            'uppercase mb-8'
          }
          style={{ letterSpacing: '0.1em' }}
        >
          GuestIQ
        </div>

        {/* AC1: Hook text — renders immediately, no delay */}
        <h1
          id="welcome-hook-heading"
          className="font-bold text-primary text-center mb-4"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            lineHeight: 1.25,
          }}
        >
          {/* AC8: From uiCopy — not hardcoded */}
          {uiCopy.welcomeHookText}
        </h1>

        {/* Context statement */}
        <p
          className={
            'text-body text-secondary text-center leading-relaxed ' +
            'max-w-[560px] mx-auto mb-10'
          }
        >
          {uiCopy.welcomeContextStatement}
        </p>

        {/* AC2: Three tier cards — correct colors, descriptors, time/Q counts, CTAs */}
        {/* AC1: No Continue button — tier selection IS the start action */}
        {/* S3-10: RadioGroup.Root manages selection; onValueChange fires
            handleValueChange which immediately advances the session. */}
        <RadioGroupPrimitive.Root
          value=""
          onValueChange={handleValueChange}
          aria-labelledby="welcome-hook-heading"
          className="grid gap-4 mb-8"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          {TIER_ORDER.map((tier) => (
            <TierCard
              key={tier}
              tier={tier}
              tierData={tiers[tier]}
              isPopular={tier === 'professional'}
              isHovered={hoveredTier === tier}
              onHover={() => setHoveredTier(tier)}
              onLeave={() => setHoveredTier(null)}
            />
          ))}
        </RadioGroupPrimitive.Root>

        {/* AC3 + AC9: Privacy notice — visible without scrolling, from uiCopy */}
        <div className="text-center mb-5">
          <p className="text-caption text-muted leading-relaxed mb-1.5">
            {uiCopy.privacyNoticeText}
          </p>
          {/* AC3: Voluntary participation text — required by FR-008 v2.0 */}
          <p className="text-caption text-muted leading-relaxed">
            {uiCopy.voluntaryParticipationText}
          </p>
        </div>

        {/* AC4: Not now link — no session record, no localStorage token */}
        <div className="text-center">
          <button
            type="button"
            onClick={onNotNow}
            className={
              'bg-transparent border-none text-neutral-600 text-caption ' +
              'cursor-pointer px-2 py-1 underline transition-colors ' +
              'duration-150 hover:text-secondary'
            }
          >
            {uiCopy.notNowLinkLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
