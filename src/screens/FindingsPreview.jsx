import React, { useState, useEffect } from 'react'
import { loadFindingsData } from '../lib/findingsData.js'
import { computeFindings } from '../lib/engine.js'
import { personaLabel } from '../lib/readFlow.js'

function Finding({ f }) {
  return (
    <li className={'pf ' + f.type}>
      <span className="pf-tag">{f.tag}</span>
      <span className="pf-label">{f.label}{f.highValue ? ' \u2605' : ''}</span>
      <span className="pf-count">{f.count} of {f.reps}</span>
      <span className="pf-q">{f.prompt}</span>
      {f.quotes && f.quotes.length > 0 && (
        <span className="pf-quotes">{f.quotes.slice(0, 3).map(q => '\u201C' + q + '\u201D').join('  ·  ')}</span>
      )}
    </li>
  )
}

function Tier({ label, cls, items }) {
  if (!items || items.length === 0) return null
  return (
    <div className={'pf-tier ' + cls}>
      <p className="pf-tier-label">{label}</p>
      <ul className="preview-findings">{items.map((f, i) => <Finding key={i} f={f} />)}</ul>
    </div>
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
      <h1 className="serif-h sm">Findings preview <span className="preview-tag">engine · tiered &amp; gated · not the final report</span></h1>
      {keys.map(p => {
        const d = personas[p]
        const nothing = !d.gated && d.strong.length === 0 && d.emerging.length === 0
        return (
          <div key={p} className="preview-persona">
            <h2>{personaLabel(p)} <span className="preview-reps">{d.reps} reps</span></h2>
            {d.gated
              ? <p className="pf-gated">{d.gateReason}</p>
              : <>
                  {nothing && <p className="sub">No findings above the floor yet.</p>}
                  <Tier label="Strong \u2014 a majority of the desk agrees" cls="strong" items={d.strong} />
                  <Tier label="Emerging \u2014 several reps, not yet a majority" cls="emerging" items={d.emerging} />
                  <Tier label={'Still forming \u2014 under the \u22653-rep floor'} cls="forming" items={d.forming} />
                </>}
          </div>
        )
      })}
    </div>
  )
}
