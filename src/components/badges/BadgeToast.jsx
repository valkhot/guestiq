// src/components/badges/BadgeToast.jsx
// GuestIQ — Badge award notification toast
// Appears briefly when a badge is earned, then fades out.
// Shows badge + name + description. Auto-dismisses after 4.5 seconds.
//
// B-3-005 fix (S3-15 mobile test):
//
//   The toast was rendering bottom-right on mobile and overflowing the
//   right viewport edge, partially covering the sticky Continue button.
//
//   Root cause: the previous implementation set `transform:
//   translateX(-50%)` as an inline style on a <motion.div>. Framer Motion
//   writes its own `transform` value to the element to animate the
//   entry/exit (scale + y). The inline `translateX(-50%)` was being
//   OVERWRITTEN by Framer Motion's animation transform. With no
//   centering offset, `left: 50%` placed the toast's LEFT EDGE at the
//   horizontal viewport centre, and the toast extended rightward — fine
//   on desktop (lots of room), but overflowing on a 390px iPhone.
//
//   Fix: separate positioning from animation. An outer static <div>
//   handles fixed positioning + centering, with `transform:
//   translateX(-50%)` cleanly applied to a non-animated element. An
//   inner <motion.div> handles only the entry/exit animation. Framer
//   Motion's transform writes are confined to the inner element and
//   never conflict with the centering transform.
//
//   The toast is also rendered via createPortal into document.body for
//   defence-in-depth against any future ancestor-transform issues.

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
    // OUTER: static wrapper handles fixed positioning and horizontal
    // centering. Framer Motion never touches this element's transform.
    <div
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        maxWidth: '380px',
        width: 'calc(100vw - 3rem)',
        pointerEvents: 'none',
      }}
    >
      {/* INNER: motion.div handles only the entry/exit animation.
          Framer Motion writes its own transform to this element for the
          animation — that's expected and no longer conflicts with our
          centering. */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -16, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: '#161620',
          border: `1px solid ${definition.color}40`,
          borderRadius: '12px',
          padding: '1rem 1.25rem',
          boxShadow:
            `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${definition.color}20`,
          width: '100%',
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
    </div>
  );

  // Portal into document.body — defence in depth against ancestor
  // transform contexts. SSR guard for portability.
  if (typeof document === 'undefined') return null;
  return createPortal(toast, document.body);
}
