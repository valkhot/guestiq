import React, { useState, useEffect } from 'react'
import { loadFindingsData } from '../lib/findingsData.js'
import { computeFindings } from '../lib/engine.js'
import { personaLabel } from '../lib/readFlow.js'

function Finding({ f }) {
  return (
    <li className={'pf ' + f.type}>
      <span className="pf-tag">{f.tag}</span>
      <span className="pf-label">{f.label}{f.highValue ? ' \u2605' : ''}{f.strength === 'majority' ? ' \u2014 most of the desk' : ''}</span>
      <span className="pf-count">{f.count} of {f.reps}</span>
      <span className="pf-q">{f.synthesized ? f.prompt : f.prompt}</span>
      {f.quotes && f.quotes.length > 0 && (
        <span className="pf-quotes">{f.quotes.slice(0, 3).map(q => '\u201C' + q + '\u201D').join('  ·  ')}</span>
      )}
    </li>
  )
}

export default function FindingsPreview() {
  const [s, setS] = useState({ loading: true })
  useEffect(() => {
    loadFindingsData().then(data => {
      if (data.error) { setS({ loading: false, error: data.error.message }); return }
      setS({ loading: false, result: computeFindings(data) })
    })
  }, [])

  if (s.loading) return <div className="screen center"><p className="sub">Computing findings&hellip;</p></div>
  if (s.error)   return <div className="screen center"><p className="sub">Error: {s.error}</p></div>

  const personas = s.result.personas
  const keys = Object.keys(personas).sort()

  return (
    <div className="preview">
      <h1 className="serif-h sm">Findings preview <span className="preview-tag">engine · gated · not the final report</span></h1>
      {keys.map(p => {
        const d = personas[p]
        return (
          <div key={p} className="preview-persona">
            <h2>{personaLabel(p)} <span className="preview-reps">{d.reps} reps</span></h2>
            {d.gated
              ? <p className="pf-gated">{d.gateReason}</p>
              : <>
                  {d.established.length === 0
                    ? <p className="sub">No findings above the floor yet.</p>
                    : <ul className="preview-findings">{d.established.map((f, i) => <Finding key={i} f={f} />)}</ul>}
                  {d.forming.length > 0 && (
                    <div className="pf-forming">
                      <p className="pf-forming-label">Still forming — under the {'\u2265'}3-rep floor</p>
                      <ul className="preview-findings dim">{d.forming.map((f, i) => <Finding key={i} f={f} />)}</ul>
                    </div>
                  )}
                </>}
          </div>
        )
      })}
    </div>
  )
}
