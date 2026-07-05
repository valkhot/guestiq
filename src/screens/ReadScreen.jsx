import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase.js'
import Coin from '../components/Coin.jsx'
import { buildCoreQuestions, personaLabel, grounding } from '../lib/readFlow.js'

export default function ReadScreen({ badge, persona, readId, onExit }) {
  const questions = useMemo(() => buildCoreQuestions(persona), [persona])
  const [i, setI] = useState(0)
  const [selected, setSelected] = useState(null)
  const [freeText, setFreeText] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const total = questions.length
  const q = questions[i]
  const label = personaLabel(persona)

  function reset() { setSelected(null); setFreeText('') }
  function advance() {
    if (i + 1 < total) { setI(i + 1); reset() }
    else setDone(true)
  }

  async function saveAndContinue() {
    if (busy) return
    setBusy(true)
    const text = freeText.trim()
    if (q.type === 'single' && selected) {
      await supabase.from('responses').insert({
        read_id: readId, item_id: q.id,
        value: { type: 'single', keys: [selected] },
        free_text_example: text || null,
      })
    } else if (q.type !== 'single' && text) {
      // renderer not built yet — still capture their words if they wrote any
      await supabase.from('responses').insert({
        read_id: readId, item_id: q.id,
        value: { type: q.type, keys: [] },
        free_text_example: text,
      })
    }
    setBusy(false)
    advance()
  }

  if (done) {
    return (
      <div className="screen center enter">
        <div className="thread" />
        <h1 className="serif-h hero">Recorded with thanks.</h1>
        <p className="lede">Your read is saved. The full payoff &mdash; your dossier and the story it tells &mdash; arrives in a later build.</p>
        <button className="cta" onClick={() => onExit('another')}>Read another guest &rarr;</button>
        <button className="linkbtn" onClick={() => onExit('home')}>Back to start</button>
      </div>
    )
  }

  const canContinue = q.type === 'single' ? !!selected : true

  return (
    <div className="read">
      <div className="read-top">
        <span className="persona-chip"><i className="pdot" />Reading &middot; the {label} guest</span>
        <div className="corner-badge">
          <Coin badgeId={badge.badge_id} animal={badge.animal} colour={badge.colour} size={46} />
          <span>{badge.animal}</span>
        </div>
      </div>

      <div className="dot-rail">
        {questions.map((_, idx) => (
          <i key={idx} className={'railorb' + (idx === i ? ' on' : idx < i ? ' done' : '')} />
        ))}
      </div>

      <div className="read-body" key={q.id}>
        {i === 0 && grounding && <p className="grounding">{grounding}</p>}
        <h2 className="q-prompt">{q.prompt}</h2>

        {q.type === 'single' ? (
          <div className="opts">
            {q.options.map(o => (
              <button key={o.key}
                      className={'opt' + (selected === o.key ? ' chosen' : '')}
                      onClick={() => setSelected(o.key)}>
                <span className="radio" />
                <span className="opt-label">{o.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <p className="placeholder-note">This kind of question arrives soon &mdash; for now, you can put it in their own words below.</p>
        )}

        <div className="freetext">
          <label>&#9998;&nbsp; Or write it in their own words <span className="ft-opt">optional</span></label>
          <textarea rows={2} value={freeText} onChange={e => setFreeText(e.target.value)}
                    placeholder="A quick example, in their words&hellip;" />
        </div>

        <button className="cta continue" disabled={!canContinue || busy} onClick={saveAndContinue}>
          {busy ? 'Saving\u2026' : 'Continue \u2192'}
        </button>
      </div>

      <button className="linkbtn read-exit" onClick={() => onExit('home')}>Stop and come back later</button>
    </div>
  )
}
