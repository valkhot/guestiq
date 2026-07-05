import React from 'react'

// Renders the answer controls for each question type.
// (Verbatim is handled in ReadScreen — it's just the free-text field.)
export default function QuestionBody({ q, answer, setAnswer }) {
  const type = q.type

  // pick-one (single & observer)
  if (type === 'single' || type === 'observer') {
    const chosen = answer.keys?.[0]
    return (
      <div className="opts">
        {q.options.map(o => (
          <button key={o.key}
                  className={'opt' + (chosen === o.key ? ' chosen' : '')}
                  onClick={() => setAnswer({ keys: [o.key] })}>
            <span className="radio" /><span className="opt-label">{o.label}</span>
          </button>
        ))}
      </div>
    )
  }

  // pick up to N
  if (type === 'multi') {
    const sel = answer.keys || []
    const cap = q.select || 3
    const toggle = k => {
      if (sel.includes(k)) setAnswer({ keys: sel.filter(x => x !== k) })
      else if (sel.length < cap) setAnswer({ keys: [...sel, k] })
    }
    return (
      <>
        <p className="multi-hint">Pick up to {cap}</p>
        <div className="opts">
          {q.options.map(o => {
            const on = sel.includes(o.key)
            const dim = !on && sel.length >= cap
            return (
              <button key={o.key}
                      className={'opt' + (on ? ' chosen' : '') + (dim ? ' dim' : '')}
                      onClick={() => toggle(o.key)}>
                <span className="check" /><span className="opt-label">{o.label}</span>
              </button>
            )
          })}
        </div>
      </>
    )
  }

  // mark each: must-have / nice / doesn't matter
  if (type === 'kano') {
    const marks = answer.marks || {}
    const set = (k, v) => setAnswer({ marks: { ...marks, [k]: v } })
    const OPTS = [['must', 'Must have'], ['nice', 'Nice extra'], ['no', 'Doesn\u2019t matter']]
    return (
      <div className="kano">
        {q.options.map(o => (
          <div key={o.key} className="kano-row">
            <span className="kano-label">{o.label}</span>
            <div className="kano-btns">
              {OPTS.map(([v, txt]) => (
                <button key={v} className={'kano-btn' + (marks[o.key] === v ? ' on' : '')}
                        onClick={() => set(o.key, v)}>{txt}</button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  // rate 1–5
  if (type === 'scale5') {
    const val = answer.scale
    return (
      <div className="scale5">
        {[1, 2, 3, 4, 5].map(n => (
          <button key={n} className={'scale-dot' + (val === n ? ' on' : '')}
                  onClick={() => setAnswer({ scale: n })}>{n}</button>
        ))}
      </div>
    )
  }

  return null
}
