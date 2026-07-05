import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase.js'
import Coin from '../components/Coin.jsx'
import QuestionBody from './QuestionBody.jsx'
import { buildCoreQuestions, buildDeepQuestions, personaLabel, grounding } from '../lib/readFlow.js'

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
  const coreQs = useMemo(() => buildCoreQuestions(persona), [persona])
  const deepQs = useMemo(() => buildDeepQuestions(persona), [persona])

  const [list, setList] = useState(coreQs)
  const [i, setI] = useState(0)
  const [phase, setPhase] = useState('reading') // reading | fork | done
  const [deepAdded, setDeepAdded] = useState(false)
  const [answer, setAnswer] = useState({})
  const [freeText, setFreeText] = useState('')
  const [busy, setBusy] = useState(false)

  const q = list[i]
  const label = personaLabel(persona)

  function resetInputs() { setAnswer({}); setFreeText('') }

  async function complete(depthVal) {
    setBusy(true)
    await supabase.from('reads').update({
      completed_at: new Date().toISOString(), depth: depthVal,
    }).eq('id', readId)
    setBusy(false)
    setPhase('done')
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
    // advance / branch
    if (i + 1 < list.length) { setI(i + 1); resetInputs() }
    else if (!deepAdded) { setPhase('fork') }   // finished CORE → offer the fork
    else { complete('expert') }                 // finished the deeper set
  }

  function goDeeper() {
    setList([...coreQs, ...deepQs]); setDeepAdded(true)
    setI(coreQs.length); resetInputs(); setPhase('reading')
  }

  // ── the depth fork ──────────────────────────────────────────────
  if (phase === 'fork') {
    return (
      <div className="screen center enter">
        <div className="thread" />
        <h1 className="serif-h hero">That&rsquo;s a full read.</h1>
        <p className="lede">You&rsquo;ve got down what most people never notice. If you know this guest well, a few more questions go deeper &mdash; or see your read now.</p>
        <div className="fork-choices">
          <button className="cta" onClick={goDeeper}>A few more &rarr;</button>
          <button className="cta ghost" onClick={() => complete('core')} disabled={busy}>See your read &rarr;</button>
        </div>
      </div>
    )
  }

  // ── recorded ────────────────────────────────────────────────────
  if (phase === 'done') {
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
        {list.map((_, idx) => (
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
