import React from 'react'
import { personaLabel } from '../lib/readFlow.js'
import { dossierRows, quotes, storyFrom, volume } from '../lib/payoff.js'

export default function EndOfRead({ badge, persona, recorded, onExit }) {
  const label = personaLabel(persona)
  const rows = dossierRows(recorded)
  const qs = quotes(recorded)
  const story = storyFrom(persona, recorded)
  const n = volume(recorded)

  return (
    <div className="eor enter">
      {/* beat 1 — threshold */}
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>

      {/* beat 2 — dossier */}
      <h1 className="serif-h hero eor-title">The {label} guest,<br/>in your read.</h1>
      <p className="eor-volume">You got down {n} thing{n === 1 ? '' : 's'} most people never notice.</p>

      {rows.length > 0 && (
        <div className="dossier">
          {rows.map((r, idx) => (
            <div className="dossier-row" key={idx}>
              <span className="dossier-key">{r.label}</span>
              <span className="dossier-val">{r.value}</span>
            </div>
          ))}
        </div>
      )}

      {qs.length > 0 && (
        <div className="eor-quotes">
          {qs.slice(0, 2).map((quote, idx) => (
            <blockquote key={idx} className="eor-quote">&ldquo;{quote}&rdquo;</blockquote>
          ))}
        </div>
      )}

      {/* beat 3 — story */}
      <div className="eor-story"><p>{story}</p></div>

      {/* beats 4–5 (constellation, gallery) arrive in Increment B */}

      <p className="eor-sign">Recorded with thanks &mdash; GuestIQ</p>
      <button className="cta" onClick={() => onExit('another')}>Read another guest &rarr;</button>
      <button className="linkbtn" onClick={() => onExit('home')}>Back to start</button>
    </div>
  )
}
