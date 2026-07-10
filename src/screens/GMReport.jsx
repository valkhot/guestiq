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

  function printReport() {
    if (!s.result) return
    const { meta, personas } = s.result
    const readList = Object.keys(personas).filter(p => personas[p].reps > 0)
      .sort((a, b) => personas[b].reps - personas[a].reps)
    const esc = t => String(t == null ? '' : t).replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]))
    const secDefs = [
      ['blind-spot', 'Blind spots'],
      ['contradiction', 'Contradictions'],
      ['mis-weight', 'Mis-weights'],
    ]
    let body = ''
    for (const key of readList) {
      const d = personas[key]
      body += `<h2>The ${esc(personaLabel(key))} guest</h2>`
      if (d.gated) { body += `<p class="muted">${esc(d.gateReason)}</p>`; continue }
      const items = t => [...d.strong.filter(f => f.type === t).map(f => ({ f, tier: 'Strong' })),
                          ...d.emerging.filter(f => f.type === t).map(f => ({ f, tier: 'Emerging' }))]
      let any = false
      for (const [type, title] of secDefs) {
        const its = items(type)
        if (!its.length) continue
        any = true
        body += `<h3>${title}</h3>`
        for (const { f, tier } of its) {
          body += `<div class="f"><div class="fl">${esc(f.label)}${f.highValue ? ' \u2605' : ''} <span class="tier">${tier}</span></div>`
          body += `<div class="fm">${f.count} of ${f.reps} reps &middot; from \u201C${esc(f.prompt)}\u201D</div>`
          if (f.quotes && f.quotes.length) body += f.quotes.slice(0, 3).map(q => `<blockquote>\u201C${esc(q)}\u201D</blockquote>`).join('')
          body += `</div>`
        }
      }
      if (!any) body += `<p class="muted">No findings above the floor yet.</p>`
    }
    const when = new Date(meta.computedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>GuestIQ Findings</title>
      <style>
        @page{ margin:22mm 18mm; }
        *{ box-sizing:border-box; }
        body{ font-family:Georgia,'Times New Roman',serif; color:#241F2B; max-width:720px; margin:0 auto; }
        .eyebrow{ font-family:'Courier New',monospace; font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:#8A6A28; text-align:center; }
        h1{ font-size:30px; text-align:center; margin:6px 0 8px; }
        .sub{ text-align:center; color:#6A6272; font-size:13px; margin:0 0 6px; }
        hr{ border:0; border-top:1px solid #E2D9C6; margin:18px 0 24px; }
        h2{ font-size:20px; margin:26px 0 4px; }
        h3{ font-size:15px; color:#8A6A28; margin:18px 0 8px; }
        .f{ border:1px solid #E7DFCE; border-radius:8px; padding:12px 14px; margin:8px 0; break-inside:avoid; }
        .fl{ font-size:14px; font-weight:bold; }
        .tier{ font-family:'Courier New',monospace; font-size:9px; letter-spacing:.08em; text-transform:uppercase; color:#8A6A28; }
        .fm{ font-family:'Courier New',monospace; font-size:10px; color:#9A8F84; margin-top:5px; }
        blockquote{ font-style:italic; color:#4A4356; border-left:2px solid #C8A24E; margin:8px 0 0; padding-left:12px; font-size:13px; }
        .muted{ font-style:italic; color:#7A7284; }
      </style></head><body onload="window.print()">
      <div class="eyebrow">GuestIQ &middot; Confidential findings</div>
      <h1>What the desk sees</h1>
      <p class="sub">Drawn from ${meta.reads} anonymous reads across ${readList.length} guest types &middot; ${when}. Counts, never names.</p>
      <hr/>${body}</body></html>`
    const w = window.open('', '_blank')
    if (!w) { alert('Please allow pop-ups to print the report.'); return }
    w.document.write(html); w.document.close()
  }

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
            <button className="report-navlink report-print" onClick={printReport}>Print / Save PDF</button>
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
