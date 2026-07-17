import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { personas, personaLabel } from '../lib/readFlow.js'
import { getCoverage } from '../lib/coverage.js'
import { inProgress } from '../lib/progress.js'
import Coin from '../components/Coin.jsx'
import { track } from '../lib/analytics.js'

const DESC = {
  business:     'short stays, early starts',
  early_flight: 'in before dawn, or late at night',
  holiday:      'here to enjoy the city',
  cruise:       'a night before the ship',
  event:        'here for a wedding, game, or show',
  medical:      'here for treatment, or to be near someone',
  crew:         'resting between flights',
  vip:          'wants it handled, quietly',
  other:        'a guest who doesn\u2019t fit the list',
}

function band(reps) {
  if (reps >= 3) return { key: 'known',   label: 'Known well' }
  if (reps >= 1) return { key: 'started', label: 'Started' }
  return { key: 'gap', label: 'Do you know them?' }
}

export default function GuestSelect({ badge, onSelect, onBack }) {
  const [counts, setCounts] = useState(null)
  const [confirming, setConfirming] = useState(null) // persona pending "add deeper?"
  const coverage = badge ? getCoverage(badge.badge_id) : {}
  const progress = badge ? inProgress(badge.badge_id) : {}

  useEffect(() => {
    let alive = true
    track('picker_viewed')
    supabase.rpc('guestiq_persona_counts').then(({ data, error }) => {
      if (!alive) return
      const map = {}
      if (!error && data) data.forEach(r => { map[r.persona] = Number(r.reps) })
      setCounts(map)
    })
    return () => { alive = false }
  }, [])

  if (counts == null) return <div className="screen center"><p className="sub">Loading the desk&hellip;</p></div>

  const order = { gap: 0, started: 1, known: 2 }
  const items = personas
    .map(p => {
      const reps = counts[p.key] || 0
      const mineDepth = coverage[p.key] // undefined | 'core' | 'expert'
      const mineProgress = progress[p.key] || 0 // answers given on an unfinished read
      return { key: p.key, reps, b: band(reps), mineDepth, mineProgress }
    })
    .sort((a, b) => order[a.b.key] - order[b.b.key] || a.reps - b.reps)

  function pick(p) {
    if (p.mineDepth === 'expert') return              // done — disabled
    if (p.mineDepth === 'core') { setConfirming(p.key); return } // offer to go deeper
    onSelect(p.key, 'core')                           // fresh core read
  }

  const covCount = Object.keys(coverage).length

  return (
    <div className="screen claim enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>
      <h2 className="serif-h sm">Who are you reading?</h2>
      <p className="sub">Pick a guest you know who fits &mdash; the desk needs the ones it doesn&rsquo;t know yet.</p>

      <div className="wall">
        {items.map(p => {
          const done = p.mineDepth === 'expert'
          const read = !!p.mineDepth
          return (
            <button key={p.key}
                    className={'wall-card ' + p.b.key + (read ? ' mine' : '') + (done ? ' done' : '')}
                    onClick={() => pick(p)}>
              <div className="wall-top">
                <span className="wall-name">{personaLabel(p.key)}</span>
                {read && (
                  <span className="wall-pin" title={done ? 'Complete' : 'You\u2019ve read this guest'}>
                    <Coin badgeId={badge.badge_id} animal={badge.animal} colour={badge.colour} size={26} />
                  </span>
                )}
              </div>
              <span className="wall-desc">{DESC[p.key]}</span>
              {done
                ? <span className="wall-band done">Complete &#10003;</span>
                : p.mineProgress > 0
                  ? <span className="wall-band inprogress">In progress &middot; {p.mineProgress} answered</span>
                  : <span className={'wall-band ' + p.b.key}>{p.b.label}</span>}
            </button>
          )
        })}
      </div>

      {covCount > 0 && (
        <p className="wall-recognition">You&rsquo;ve brought {covCount} guest{covCount === 1 ? '' : 's'} to life.</p>
      )}
      {covCount >= 9
        ? <p className="wall-plenty">You&rsquo;ve read every guest the desk sees &mdash; that&rsquo;s the whole wall.</p>
        : covCount >= 3
          ? <p className="wall-plenty">That&rsquo;s plenty &mdash; the rest are the desk&rsquo;s to fill, if you truly know them.</p>
          : null}
      <button className="linkbtn" onClick={onBack}>Back</button>

      {confirming && (
        <div className="modal-backdrop" onClick={() => setConfirming(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>You&rsquo;ve read the {personaLabel(confirming)} guest.</h3>
            <p>You got their core read down. If you know them well, a few deeper questions add real detail &mdash; and finish them off.</p>
            <div className="modal-actions">
              <button className="cta" onClick={() => onSelect(confirming, 'deep')}>Add the deeper questions &rarr;</button>
              <button className="cta ghost" onClick={() => setConfirming(null)}>Not now</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
