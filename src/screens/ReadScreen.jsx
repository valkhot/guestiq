import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase.js'
import Coin from '../components/Coin.jsx'
import QuestionBody from './QuestionBody.jsx'
import { buildCoreQuestions, personaLabel, grounding } from '../lib/readFlow.js'

function isAnswered(q, answer, text) {
  switch (q.type) {
    case 'single':
    case 'observer': return (answer.keys?.length || 0) > 0
    case 'multi':    return (answer.keys?.length || 0) > 0
    case 'kano':     return Object.keys(answer.marks || {}).length > 0
    case 'scale5':   return answer.scale != null
    case 'verbatim': return text.trim().length > 0
    default:         return true
  }
}
function buildValue(q, answer) {
  switch (q.type) {
    case 'single':
    case 'observer': return { type: q.type, keys: answer.keys || [] }
    case 'multi':    return { type: 'multi', keys: answer.keys || [] }
    case 'kano':     return { type: 'kano', marks: answer.marks || {} }
    case 'scale5':   return { type: 'scale5', scale: answer.scale ?? null }
    case 'verbatim': return { type: 'verbatim' }
    default:         return { type: q.type }
  }
}

export default function ReadScreen({ badge, persona, readId, onExit }) {
  const questions = useMemo(() => buildCoreQuestions(persona), [persona])
  const [i, setI] = useState(0)
  const [answer, setAnswer] = useState({})
  const [freeText, setFreeText] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const total = questions.length
  const q = questions[i]
  const label = personaLabel(persona)

  function advance() {
    if (i + 1 < total) { setI(i + 1); setAnswer({}); setFreeText('') }
    else setDone(true)
  }

  async function saveAndContinue() {
    if (busy) return
    setBusy(true)
    const text = freeText.trim()
    await supabase.from('responses').insert({
      read_id: readId, item_id: q.id,
      value: buildValue(q, answer),
      free_text_example: q.type === 'verbatim' ? text : (text || null),
    })
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

  const answered = isAnswered(q, answer, freeText)
  const isVerbatim = q.type === 'verbatim'

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

        {!isVerbatim && <QuestionBody q={q} answer={answer} setAnswer={setAnswer} />}

        <div className="freetext">
          <label>
            &#9998;&nbsp; {isVerbatim ? 'In their own words' : 'Or write it in their own words'}
            {!isVerbatim && <span className="ft-opt"> optional</span>}
          </label>
          <textarea rows={2} value={freeText} onChange={e => setFreeText(e.target.value)}
                    placeholder={isVerbatim ? 'What they said, or what you saw\u2026' : 'A quick example, in their words\u2026'} />
        </div>

        <button className="cta continue" disabled={!answered || busy} onClick={saveAndContinue}>
          {busy ? 'Saving\u2026' : 'Continue \u2192'}
        </button>
      </div>

      <button className="linkbtn read-exit" onClick={() => onExit('home')}>Stop and come back later</button>
    </div>
  )
}
