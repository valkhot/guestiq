import React from 'react'
import { personas } from '../lib/readFlow.js'

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

export default function GuestSelect({ onSelect, onBack }) {
  return (
    <div className="screen claim enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>
      <h2 className="serif-h sm">Who are you reading?</h2>
      <p className="sub">Pick one guest you know who fits &mdash; you&rsquo;ll answer as them.</p>
      <div className="persona-grid">
        {personas.map(p => (
          <button key={p.key} className="persona-card" onClick={() => onSelect(p.key)}>
            <span className="persona-name">{p.label}</span>
            <span className="persona-desc">{DESC[p.key] || ''}</span>
          </button>
        ))}
      </div>
      <button className="linkbtn" onClick={onBack}>Back</button>
    </div>
  )
}
