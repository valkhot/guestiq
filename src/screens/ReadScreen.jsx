import React, { useState, useMemo } from 'react'
import { supabase } from '../lib/supabase.js'
import { writeOrQueue } from '../lib/offlineQueue.js'
import Coin from '../components/Coin.jsx'
import QuestionBody from './QuestionBody.jsx'
import EndOfRead from './EndOfRead.jsx'
import { addCoverage } from '../lib/coverage.js'
import { getEntries, recordEntry, clearProgress } from '../lib/progress.js'
import { track } from '../lib/analytics.js'
import { buildCoreQuestions, buildDeepQuestions, personaLabel, grounding, responseIdFor } from '../lib/readFlow.js'

function isAnswered(q, answer, text) {
  // Their own words are always a valid answer — so free text alone can continue.
  if ((text || '').trim().length > 0) return true
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

export default function ReadScreen({ badge, persona, readId, onExit, deepOnly = false }) {
  const coreQs = useMemo(() => buildCoreQuestions(persona), [persona])
  const deepQs = useMemo(() => buildDeepQuestions(persona), [persona])

  // ── resume: restore any answers already given for this read ──────
  const saved = useMemo(() => getEntries(badge.badge_id, persona), [badge.badge_id, persona])
  const allQs = useMemo(() => [...coreQs, ...deepQs], [coreQs, deepQs])
  const initialList = deepOnly ? deepQs : coreQs
  const savedIds = useMemo(() => new Set(saved.map(e => e.id)), [saved])
  const initialRecorded = useMemo(() => saved
    .map(e => { const q = allQs.find(x => x.id === e.id); return q ? { q, value: e.value, freeText: e.freeText } : null })
    .filter(Boolean), [saved, allQs])
  const firstUnanswered = initialList.findIndex(qq => !savedIds.has(qq.id))
  const allDone = firstUnanswered === -1 && saved.length > 0
  const startI = allDone ? Math.max(0, initialList.length - 1) : Math.max(0, firstUnanswered)

  const [list, setList] = useState(initialList)
  const [i, setI] = useState(startI)
  const [phase, setPhase] = useState(allDone && !deepOnly ? 'fork' : 'reading')
  const [deepAdded, setDeepAdded] = useState(deepOnly)
  const [answer, setAnswer] = useState({})
  const [recorded, setRecorded] = useState(initialRecorded)
  const [resumed, setResumed] = useState(startI > 0 || allDone)
  const [freeText, setFreeText] = useState('')
  const [busy, setBusy] = useState(false)

  const q = list[i]
  const label = personaLabel(persona)

  function resetInputs() { setAnswer({}); setFreeText('') }

  async function complete(depthVal) {
    setBusy(true)
    try {
      await writeOrQueue({
        key: 'complete:' + readId, table: 'reads', action: 'update',
        matchCol: 'id', matchVal: readId,
        data: { completed_at: new Date().toISOString(), depth: depthVal },
      })
    } catch (error) { setBusy(false); alert('Could not mark the read complete: ' + error.message); return }
    setBusy(false)
    addCoverage(badge.badge_id, persona, depthVal)
    clearProgress(badge.badge_id, persona)
    track('read_completed', { persona, depth: depthVal, questions: recorded.length })
    setPhase('done')
  }

  async function saveAndContinue() {
    if (busy) return
    setBusy(true)
    const text = freeText.trim()
    // deterministic id → re-answering the same item is ignored (no duplicate rows)
    try {
      await writeOrQueue({
        key: 'resp:' + responseIdFor(readId, q.id), table: 'responses', action: 'insert',
        data: {
          id: responseIdFor(readId, q.id),
          read_id: readId, item_id: q.id,
          value: buildValue(q, answer),
          free_text_example: q.type === 'verbatim' ? text : (text || null),
        },
      })
    } catch (error) { setBusy(false); alert('Could not save that answer: ' + error.message); return }
    setBusy(false)
    track('question_answered', { persona, item_id: q.id, item_type: q.type })
    recordEntry(badge.badge_id, persona, q.id, buildValue(q, answer), text)
    setRecorded(r => [...r.filter(e => e.q.id !== q.id), { q, value: buildValue(q, answer), freeText: text }])
    setResumed(false)
    // advance / branch
    if (i + 1 < list.length) { setI(i + 1); resetInputs() }
    else if (!deepAdded) { track('depth_fork_shown', { persona }); setPhase('fork') }   // finished CORE → offer the fork
    else { complete('expert') }                 // finished the deeper set
  }

  function goDeeper() {
    track('depth_chosen', { persona, choice: 'deeper' })
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
          <button className="cta ghost" onClick={() => { track('depth_chosen', { persona, choice: 'see_read' }); complete('core') }} disabled={busy}>See your read &rarr;</button>
        </div>
      </div>
    )
  }

  // ── recorded ────────────────────────────────────────────────────
  if (phase === 'done') {
    return <EndOfRead badge={badge} persona={persona} recorded={recorded} onExit={onExit} />
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
        {i === 0 && !deepOnly && grounding && <p className="grounding">{grounding}</p>}
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

        {resumed && <p className="read-resumed">Picked up where you left off \u2014 your earlier answers are saved.</p>}

        <button className="cta continue" disabled={!answered || busy} onClick={saveAndContinue}>
          {busy ? 'Saving\u2026' : 'Continue \u2192'}
        </button>
      </div>

      <button className="linkbtn read-exit" onClick={() => onExit('home')}>Stop and come back later</button>
    </div>
  )
}
