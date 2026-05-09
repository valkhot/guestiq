// src/components/badges/BadgeToast.jsx
// GuestIQ — Badge award notification toast
// Appears briefly when a badge is earned, then fades out.
// Shows badge + name + description. Auto-dismisses after 2.5 seconds.

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Badge from './Badge';

export default function BadgeToast({ definition, onDismiss }) {
  // Auto-dismiss after 2.5s
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4500);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        background: '#161620',
        border: `1px solid ${definition.color}40`,
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${definition.color}20`,
        maxWidth: '380px',
        width: 'calc(100vw - 3rem)',
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
}
