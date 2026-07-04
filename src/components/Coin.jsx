import React from 'react'
import { animalArt } from '../data/animalArt.js'

// A struck-seal coin: radial-lit medallion, fine double-hairline rim,
// and the animal's line-art sized to sit prominently within the ring.
export default function Coin({ badgeId, animal, colour, size = 108, selected = false, hero = false }) {
  const key = (badgeId || animal || '').toLowerCase()
  const art = animalArt[key]
  const gid = 'coinfill-' + key + (hero ? '-h' : '')
  return (
    <svg width={size} height={size} viewBox="0 0 100 100"
         className={'coin' + (hero ? ' coin-hero' : '') + (selected ? ' coin-selected' : '')} aria-hidden="true">
      <defs>
        <radialGradient id={gid} cx="50%" cy="40%" r="65%">
          <stop offset="0%"  stopColor="#251F33" />
          <stop offset="60%" stopColor="#1A1624" />
          <stop offset="100%" stopColor="#120F18" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48"  fill={`url(#${gid})`} />
      <circle cx="50" cy="50" r="47"  fill="none" stroke={colour} strokeWidth="0.6" opacity="0.32" />
      <circle cx="50" cy="50" r="39.5" fill="none" stroke={colour} strokeWidth="2.6" />
      <circle cx="50" cy="50" r="35"  fill="none" stroke={colour} strokeWidth="0.6" opacity="0.26" />
      {art
        ? <g className="coin-art" transform="translate(20.5,20.5) scale(0.92)"
             style={{ color: colour }} dangerouslySetInnerHTML={{ __html: art }} />
        : <text x="50" y="54" textAnchor="middle" dominantBaseline="central"
                fontFamily="Fraunces, Georgia, serif" fontSize="40" fill={colour}>{(animal || '?').charAt(0)}</text>}
    </svg>
  )
}
