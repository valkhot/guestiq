// src/components/badges/BadgeToast.jsx
// GuestIQ — Badge award notification toast
// Appears briefly when a badge is earned, then fades out.
// Shows badge + name + description. Auto-dismisses after 4.5 seconds.
//
// B-3-005 fix (S3-15 mobile test, final iteration):
//
//   Earlier attempts: portal-rendered + outer-div/inner-motion.div
//   structure. Both used `transform: translateX(-50%)` for horizontal
//   centring. Both worked in Chrome desktop / DevTools mobile emulator,
//   neither worked on real iOS Safari (bug only manifested on iPhone).
//
//   Root cause: WebKit-specific behaviour. `position: fixed` combined
//   with `transform: translateX(-50%)` on the same element (or in a
//   close ancestor wrapping an animated child) is unreliable on iOS
//   Safari — especially when Framer Motion is also writing transforms
//   to nearby elements during entry/exit animations. The bug doesn't
//   reproduce in Chrome's mobile emulator because Chrome uses a
//   different rendering engine.
//
//   Fix:
//     1. Centre via `left: 0; right: 0; margin: 0 auto` instead of
//        transform — bypasses WebKit's transform-on-fixed-position
//        quirks and avoids conflicts with Framer Motion's own
//        transform animations on the same element.
//     2. Anchor to the TOP of the viewport, not the bottom — iOS
//        Safari's dynamic URL bar makes the bottom edge unstable
//        during scroll, and bottom-anchoring caused the toast to
//        overlap the sticky Continue button on the curiosity hook
//        screens. Top-anchoring physically separates the toast from
//        the button so they can't collide.
//     3. Use `env(safe-area-inset-top)` so the toast respects the
//        iPhone notch / Dynamic Island and isn't obscured by it.
//     4. max-width uses `min(380px, calc(100% - 32px))` referencing
//        100% of the containing block (the viewport via
//        position: fixed + left:0; right:0), avoiding 100vw which on
//        iOS Safari includes the area under the dynamic URL bar.
//
//   Kept the React portal into document.body as defence-in-depth
//   against any ancestor transform contexts (a separate CSS gotcha
//   that didn't turn out to be the cause here but doesn't hurt to
//   guard against).

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import Badge from './Badge';

export default function BadgeToast({ definition, onDismiss }) {
  // Auto-dismiss after 4.5s
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const toast = (
    <motion.div
      initial={{ opacity: 0, y: -32, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        // Positioning — top-anchored, iOS-safe centring without transform.
        // Top-anchored (not bottom) to avoid competing with the sticky
        // Continue button on mobile; iOS Safari's dynamic URL bar also
        // makes the bottom of the viewport unstable during scroll.
        // env(safe-area-inset-top) respects the iOS notch / Dynamic Island.
        position: 'fixed',
        top: 'calc(env(safe-area-inset-top, 0px) + 1rem)',
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        maxWidth: 'min(380px, calc(100% - 32px))',
        zIndex: 50,
        // Layout
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        // Visual
        background: '#161620',
        border: `1px solid ${definition.color}40`,
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        boxShadow:
          `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${definition.color}20`,
        // Behaviour
        pointerEvents: 'none',
      }}
    >
      {/* Badge with reveal animation — AC3 */}
      <Badge definition={definition} size={48} animate earned />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontSize: '0.6875rem',
            fontWeight: 600,
            color: definition.color,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            marginBottom: '2px',
          }}
        >
          Badge earned
        </p>
        <p
          style={{
            fontSize: '0.9375rem',
            fontWeight: 600,
            color: '#F8FAFC',
            marginBottom: '2px',
          }}
        >
          {definition.name}
        </p>
        <p
          style={{
            fontSize: '0.8125rem',
            color: '#64748B',
            lineHeight: 1.4,
          }}
        >
          {definition.description}
        </p>
      </div>
    </motion.div>
  );

  // Portal into document.body — defence in depth against any ancestor
  // transform context that would otherwise capture position:fixed.
  if (typeof document === 'undefined') return null;
  return createPortal(toast, document.body);
}
