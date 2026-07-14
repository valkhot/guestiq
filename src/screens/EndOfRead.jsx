import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { personaLabel } from '../lib/readFlow.js'
import { dossierRows, quotes, volume, storyParams, storyFrom } from '../lib/payoff.js'
import { getCoverage } from '../lib/coverage.js'

function Constellation({ reps, colour }) {
  const shown = Math.min(Math.max((reps || 1) - 1, 0), 7)
  const cx = 200, cy = 108, R = 80
  const nodes = Array.from({ length: shown }, (_, i) => {
    const a = (Math.PI * 2 * i) / (shown || 1) - Math.PI / 2
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }
  })
  return (
    <svg viewBox="0 0 400 216" className="constellation-svg" aria-hidden="true">
      {nodes.map((n, i) => <line key={'l' + i} x1={cx} y1={cy} x2={n.x} y2={n.y} className="cthread" />)}
      {nodes.map((n, i) => <circle key={'n' + i} cx={n.x} cy={n.y} r="3.5" className="cnode" />)}
      <circle cx={cx} cy={cy} r="15" fill="none" stroke={colour} strokeWidth="1" opacity="0.4" />
      <circle cx={cx} cy={cy} r="8" fill={colour} className="cself" />
    </svg>
  )
}

export default function EndOfRead({ badge, persona, recorded, onExit }) {
  const label = personaLabel(persona)
  const rows = dossierRows(recorded)
  const qs = quotes(recorded)
  const n = volume(recorded)
  const coverage = Object.keys(getCoverage(badge.badge_id))

  const [reps, setReps] = useState(null)
  const [story, setStory] = useState(null)

  // Story beat: try RosaeNLG (lazy — loads only here); fall back to deterministic text.
  useEffect(() => {
    let alive = true
    ;(async () => {
      let text = null
      try {
        const mod = await import('../lib/story.js')
        text = await mod.renderStory(storyParams(persona, recorded))
      } catch (e) { text = null }
      if (!text) text = storyFrom(persona, recorded)
      if (alive) setStory(text)
    })()
    return () => { alive = false }
  }, [persona, recorded])
  useEffect(() => {
    let alive = true
    supabase.rpc('guestiq_persona_counts').then(({ data, error }) => {
      if (!alive) return
      if (error) {
        console.warn('[GuestIQ] constellation counts unavailable — falling back:', error.message)
        setReps(1); return
      }
      console.log('[GuestIQ] persona counts:', data)
      const row = (data || []).find(r => r.persona === persona)
      setReps(row ? Number(row.reps) : 1)
    })
    return () => { alive = false }
  }, [persona])

  const others = reps == null ? null : Math.max(0, reps - 1)

  return (
    <div className="eor enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>

      {/* beat 2 — dossier */}
      <h1 className="serif-h hero eor-title">The {label} guest,<br/>in your read.</h1>
      <p className="eor-volume">You got down {n} thing{n === 1 ? '' : 's'} most people never notice.</p>
      {story && <p className="eor-story">{story}</p>}

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
          {qs.slice(0, 3).map((quote, idx) => (
            <blockquote key={idx} className="eor-quote">&ldquo;{quote}&rdquo;</blockquote>
          ))}
        </div>
      )}

      {/* beat 4 — constellation (counts, never names; degrades to first-on-record) */}
      {reps != null && (
        <div className="constellation-wrap">
          <Constellation reps={reps} colour={badge.colour} />
          {others === 0 ? (
            <p className="constellation-cap">You&rsquo;re first on record for the {label} guest.</p>
          ) : (
            <p className="constellation-cap">You and {others} other{others === 1 ? '' : 's'} have read this guest.</p>
          )}
          <p className="constellation-floor">
            {reps >= 3 ? 'Enough reads to start seeing a pattern.' : 'Still early \u2014 a few more will show the shape.'}
          </p>
        </div>
      )}

      {/* beat 5 — gallery + gratitude */}
      {coverage.length > 0 && (
        <div className="gallery">
          {coverage.map(p => (
            <span key={p} className={'gmark' + (p === persona ? ' current' : '')}>{personaLabel(p)}</span>
          ))}
        </div>
      )}
      <p className="gratitude">You&rsquo;ve brought {coverage.length} guest{coverage.length === 1 ? '' : 's'} to life.</p>

      <p className="eor-sign">Recorded with thanks &mdash; GuestIQ</p>
      <button className="cta" onClick={() => onExit('another')}>Read another guest &rarr;</button>
      <button className="linkbtn" onClick={() => onExit('home')}>Back to start</button>
    </div>
  )
}
