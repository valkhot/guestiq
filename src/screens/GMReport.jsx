import React, { useState, useEffect, useCallback } from 'react'
import { loadFindingsData } from '../lib/findingsData.js'
import { computeFindings } from '../lib/engine.js'
import { personaLabel } from '../lib/readFlow.js'
import { getPin, clearPin } from '../lib/adminPin.js'

const SECTIONS = [
  { type: 'blind-spot',    title: 'Blind spots',    lede: 'What these guests need that the desk doesn\u2019t see.' },
  { type: 'contradiction', title: 'Contradictions', lede: 'Where what the desk believes and what the guest does don\u2019t line up.' },
  { type: 'mis-weight',    title: 'Mis-weights',    lede: 'Effort the desk spends that may matter less than it thinks.' },
]

function Finding({ item }) {
  const { f, tier } = item
  return (
    <div className={'rf ' + tier}>
      <div className="rf-head">
        <span className="rf-label">{f.label}{f.highValue ? ' \u2605' : ''}</span>
        <span className={'rf-tier ' + tier}>{tier === 'strong' ? 'Strong' : 'Emerging'}</span>
      </div>
      <div className="rf-meta">{f.count} of {f.reps} reps &middot; from &ldquo;{f.prompt}&rdquo;</div>
      {f.quotes && f.quotes.length > 0 && (
        <div className="rf-quotes">
          {f.quotes.slice(0, 3).map((q, i) => <blockquote key={i}>&ldquo;{q}&rdquo;</blockquote>)}
        </div>
      )}
    </div>
  )
}

export default function GMReport() {
  const [s, setS] = useState({ loading: true })
  const [active, setActive] = useState(null)

  const compute = useCallback(() => {
    setS({ loading: true })
    loadFindingsData(getPin()).then(data => {
      if (data.error) { setS({ loading: false, error: data.error.message }); return }
      setS({ loading: false, result: computeFindings(data) })
    })
  }, [])
  useEffect(() => { compute() }, [compute])

  if (s.loading) return <div className="report report-center"><p>Preparing the findings&hellip;</p></div>
  if (s.error)   return <div className="report report-center"><p>Couldn&rsquo;t load findings. {s.error}</p></div>

  const { meta, personas } = s.result
  // guests that were actually read, most-read first
  const read = Object.keys(personas).filter(p => personas[p].reps > 0)
    .sort((a, b) => personas[b].reps - personas[a].reps)
  const current = active && personas[active] ? active : read[0]
  const d = current ? personas[current] : null
  const when = new Date(meta.computedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })

  const strongOf = t => (d?.strong || []).filter(f => f.type === t).map(f => ({ f, tier: 'strong' }))
  const emergOf  = t => (d?.emerging || []).filter(f => f.type === t).map(f => ({ f, tier: 'emerging' }))
  const sectionItems = t => [...strongOf(t), ...emergOf(t)]

  return (
    <div className="report">
      <div className="report-inner">
        <header className="report-head">
          <div className="report-thread" />
          <div className="report-eyebrow">GUEST<b>IQ</b> &middot; Confidential findings</div>
          <h1 className="report-title">What the desk sees</h1>
          <p className="report-sub">Drawn from {meta.reads} anonymous reads across {read.length} guest types &middot; {when}. Counts, never names.</p>
          <div className="report-adminnav">
            <a className="report-navlink" href="?view=console">Study console &rarr;</a>
            <button className="report-signout" onClick={() => { clearPin(); window.location.reload() }}>Lock</button>
          </div>
        </header>

        <nav className="report-nav">
          {read.map(p => (
            <button key={p} className={'report-tab' + (p === current ? ' on' : '')} onClick={() => setActive(p)}>
              {personaLabel(p)} <span className="report-tab-reps">{personas[p].reps}</span>
            </button>
          ))}
        </nav>

        {!d ? <p className="report-empty">No guests read yet.</p> : d.gated ? (
          <div className="report-persona">
            <h2 className="report-persona-name">The {personaLabel(current)} guest</h2>
            <p className="report-gated">{d.gateReason}</p>
          </div>
        ) : (
          <div className="report-persona">
            <h2 className="report-persona-name">The {personaLabel(current)} guest
              <span className="report-persona-reps">{d.reps} reps &middot; {d.strong.length} strong &middot; {d.emerging.length} emerging</span>
            </h2>

            {SECTIONS.map(sec => {
              const items = sectionItems(sec.type)
              if (items.length === 0) return null
              return (
                <section key={sec.type} className="report-section">
                  <h3 className="report-section-title">{sec.title}</h3>
                  <p className="report-section-lede">{sec.lede}</p>
                  <div className="report-findings">{items.map((it, i) => <Finding key={i} item={it} />)}</div>
                </section>
              )
            })}

            {d.strong.length === 0 && d.emerging.length === 0 && (
              <p className="report-gated">No findings above the {'\u2265'}3-rep floor yet &mdash; still forming.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
