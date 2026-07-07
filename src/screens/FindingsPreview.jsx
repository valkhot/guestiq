import React, { useState, useEffect } from 'react'
import { loadFindingsData } from '../lib/findingsData.js'
import { computeFindings } from '../lib/engine.js'
import { personaLabel } from '../lib/readFlow.js'

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
      <h1 className="serif-h sm">Findings preview <span className="preview-tag">engine · not the final report · pre-gates</span></h1>
      {keys.map(p => (
        <div key={p} className="preview-persona">
          <h2>{personaLabel(p)} <span className="preview-reps">{personas[p].reps} reps</span></h2>
          {personas[p].findings.length === 0
            ? <p className="sub">No blind-spot / contradiction / mis-weight signal.</p>
            : <ul className="preview-findings">
                {personas[p].findings.map((f, i) => (
                  <li key={i} className={'pf ' + f.type}>
                    <span className="pf-tag">{f.tag}</span>
                    <span className="pf-label">{f.label}{f.highValue ? ' \u2605' : ''}</span>
                    <span className="pf-count">{f.count} of {f.reps}</span>
                    <span className="pf-q">{f.prompt}</span>
                    {f.quotes.length > 0 && (
                      <span className="pf-quotes">{f.quotes.slice(0, 3).map(q => '\u201C' + q + '\u201D').join('  ·  ')}</span>
                    )}
                  </li>
                ))}
              </ul>}
        </div>
      ))}
    </div>
  )
}
