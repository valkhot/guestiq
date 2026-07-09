import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import { loadFindingsData } from '../lib/findingsData.js'
import { computeFindings } from '../lib/engine.js'
import { personas, personaLabel } from '../lib/readFlow.js'
import { getPin, clearPin } from '../lib/adminPin.js'

export default function Console() {
  const [state, setState] = useState({ loading: true })

  useEffect(() => {
    const pin = getPin()
    Promise.all([
      loadFindingsData(pin),
      supabase.rpc('guestiq_study_stats', { pin }),
    ]).then(([fd, statsRes]) => {
      if (fd.error) { setState({ loading: false, error: fd.error.message }); return }
      const result = computeFindings(fd)
      const stats = (statsRes.data && statsRes.data[0]) || { completed_reads: 0, distinct_agents: 0, guest_types: 0 }
      setState({ loading: false, result, stats })
    })
  }, [])

  if (state.loading) return <div className="report report-center"><p>Loading the study&hellip;</p></div>
  if (state.error)   return <div className="report report-center"><p>Error: {state.error}</p></div>

  const P = state.result.personas
  const rows = personas.map(p => {
    const d = P[p.key] || { reps: 0, strong: [], emerging: [] }
    const reps = d.reps || 0
    const status = reps >= 3 ? 'converged' : reps >= 1 ? 'forming' : 'gap'
    return { key: p.key, reps, status, strong: (d.strong || []).length, emerging: (d.emerging || []).length }
  }).sort((a, b) => b.reps - a.reps)
  const converged = rows.filter(r => r.status === 'converged').length
  const st = state.stats

  return (
    <div className="report">
      <div className="report-inner">
        <header className="report-head">
          <div className="report-thread" />
          <div className="report-eyebrow">GUEST<b>IQ</b> &middot; Study console</div>
          <h1 className="report-title">The study</h1>
          <p className="report-sub">How the reads are stacking up &mdash; coverage, convergence, and what&rsquo;s ready to trust.</p>
          <div className="report-adminnav">
            <a className="report-navlink" href="?view=admin">Findings report &rarr;</a>
            <button className="report-signout" onClick={() => { clearPin(); window.location.reload() }}>Lock</button>
          </div>
        </header>

        <div className="console-glance">
          <div className="cg"><span className="cg-num">{st.completed_reads}</span><span className="cg-lab">reads recorded</span></div>
          <div className="cg"><span className="cg-num">{st.distinct_agents}</span><span className="cg-lab">agents contributing</span></div>
          <div className="cg"><span className="cg-num">{st.guest_types}</span><span className="cg-lab">guest types read</span></div>
          <div className="cg"><span className="cg-num">{converged}</span><span className="cg-lab">converged ({'\u2265'}3 reps)</span></div>
        </div>

        <h3 className="report-section-title">Coverage by guest</h3>
        <p className="report-section-lede">A guest needs {'\u2265'}3 independent reads before its findings can be trusted.</p>
        <table className="console-table">
          <thead><tr><th>Guest</th><th>Reads</th><th>Status</th><th>Findings</th></tr></thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.key}>
                <td className="ct-name">{personaLabel(r.key)}</td>
                <td>{r.reps}</td>
                <td><span className={'cstat ' + r.status}>{r.status === 'converged' ? 'Converged' : r.status === 'forming' ? 'Forming' : 'Gap'}</span></td>
                <td className="ct-find">{r.status === 'converged' ? `${r.strong} strong \u00B7 ${r.emerging} emerging` : '\u2014'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
