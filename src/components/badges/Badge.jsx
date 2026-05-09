// src/components/badges/Badge.jsx
// GuestIQ — Single Badge Component
// S3-06: SVG badge with Framer Motion scale animation.
// AC3: scales 1.0 → 1.15 → 1.0 over 300ms on reveal.
// AC4: aria-label on every badge.
// AC5: animation fires once — controlled by parent via 'animate' prop.

import { motion } from 'framer-motion';

export default function Badge({
  definition,   // badge definition object from BadgeDefinitions.js
  size = 64,    // px — diameter of the badge circle
  animate = false, // true = play reveal animation, false = static display
  earned = true,   // false = greyed out (not yet earned)
}) {
  const { name, ariaLabel, svgPath, color } = definition;

  // AC4: descriptive aria-label
  const label = earned ? ariaLabel : `${name} badge — not yet earned`;

  const variants = {
    initial: { scale: 1, opacity: earned ? 1 : 0.25 },
    reveal: {
      scale: [1, 1.15, 1],
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    static: {
      scale: 1,
      opacity: earned ? 1 : 0.25,
    },
  };

  return (
    <motion.div
      aria-label={label}
      role="img"
      title={name}
      initial="initial"
      animate={animate ? 'reveal' : 'static'}
      variants={variants}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: earned ? `${color}18` : 'rgba(255,255,255,0.04)',
        border: `2px solid ${earned ? color : 'rgba(255,255,255,0.1)'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        cursor: 'default',
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.45}
        height={size * 0.45}
        viewBox="0 0 24 24"
        fill={earned ? color : 'rgba(255,255,255,0.2)'}
        aria-hidden="true"
      >
        <path d={svgPath} />
      </svg>
    </motion.div>
  );
}
