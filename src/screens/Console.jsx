import React, { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase.js'
import { loadFindingsData } from '../lib/findingsData.js'
import { computeFindings } from '../lib/engine.js'
import { personas, personaLabel } from '../lib/readFlow.js'
import { getPin } from '../lib/adminPin.js'
import { findingsToCsv, downloadCsv } from '../lib/exportFindings.js'

const GUARDRAILS = [
  'Counts, never percentages (in findings)',
  'No third-party AI',
  'No guest names stored',
  'CF-sink (table-stakes) suppressed',
  '≥3-rep convergence floor enforced',
]

export default function Console({ onLock, onNav }) {
  const [state, setState] = useState({ loading: true })

  const loadAll = useCallback(() => {
    const pin = getPin()
    setState(s => ({ ...s, refreshing: true }))
    Promise.all([
      loadFindingsData(pin),
      supabase.rpc('guestiq_study_stats', { pin }),
      supabase.rpc('guestiq_study_status'),
      supabase.rpc('guestiq_agent_activity', { pin }),
      supabase.rpc('guestiq_report_activity', { pin }),
      supabase.rpc('guestiq_app_health', { pin }),
      supabase.rpc('guestiq_recent_errors', { pin }),
      supabase.from('badges').select('*').order('animal'),
    ]).then(([fd, statsRes, statusRes, agentsRes, reportRes, healthRes, errsRes, badgesRes]) => {
      if (fd.error) { setState({ loading: false, error: fd.error.message }); return }
      const result = computeFindings(fd)
      const stats = (statsRes.data && statsRes.data[0]) || { started_reads: 0, completed_reads: 0, deep_reads: 0, distinct_agents: 0, guest_types: 0 }
      setState({ loading: false, refreshing: false, result, stats, status: statusRes.data || 'open', agents: agentsRes.data || [], report: (reportRes.data && reportRes.data[0]) || { opens: 0, last_opened: null }, health: (healthRes.data && healthRes.data[0]) || { total: 0, last_24h: 0, last_error: null }, errors: errsRes.data || [], badges: badgesRes.data || [] })
    })
  }, [])
  useEffect(() => { loadAll() }, [loadAll])

  if (state.loading) return <div className="report report-center"><p>Loading the study&hellip;</p></div>
  if (state.error)   return <div className="report report-center"><p>Error: {state.error}</p></div>

  const st = state.stats
  const P = state.result.personas
  const rows = personas.map(p => {
    const d = P[p.key] || { reps: 0, strong: [], emerging: [] }
    const reps = d.reps || 0
    const status = reps >= 3 ? 'converged' : reps >= 1 ? 'forming' : 'gap'
    return { key: p.key, reps, status, strong: (d.strong || []).length, emerging: (d.emerging || []).length }
  }).sort((a, b) => b.reps - a.reps)

  const converged = rows.filter(r => r.status === 'converged').length
  const compRate = st.started_reads ? Math.round(100 * st.completed_reads / st.started_reads) : 0
  const depthRate = st.completed_reads ? Math.round(100 * st.deep_reads / st.completed_reads) : 0

  const nudges = []
  rows.forEach(r => {
    if (r.reps === 0) nudges.push(`The ${personaLabel(r.key)} guest is a gap — no reads yet.`)
    else if (r.reps < 3) nudges.push(`The ${personaLabel(r.key)} guest needs ${3 - r.reps} more read${3 - r.reps === 1 ? '' : 's'} to converge.`)
  })
  if (nudges.length === 0) nudges.push('Every guest type has converged — the study is well covered.')

  const toggleStatus = async () => {
    const next = state.status === 'open' ? 'closed' : 'open'
    const { data, error } = await supabase.rpc('guestiq_set_study_status', { pin: getPin(), new_status: next })
    if (!error) setState(s => ({ ...s, status: data || next }))
  }
  const releaseBadge = async (b) => {
    if (!window.confirm(`Release the ${b.animal}? Only do this if that agent lost access \u2014 they can then re-claim it.`)) return
    const { error } = await supabase.rpc('guestiq_release_badge', { pin: getPin(), p_badge_id: b.badge_id })
    if (error) { window.alert('Could not release: ' + error.message); return }
    loadAll()
  }

  const exportCsv = () => {
    const today = new Date().toISOString().slice(0, 10)
    downloadCsv(findingsToCsv(state.result), `guestiq-findings-${today}.csv`)
  }

  return (
    <div className="report">
      <div className="report-inner">
        <header className="report-head">
          <div className="report-thread" />
          <div className="report-eyebrow">GUEST<b>IQ</b> &middot; Study console</div>
          <h1 className="report-title">The study</h1>
          <p className="report-sub">Integrity first &mdash; is the instrument sound, and is it working?</p>
          <div className="report-adminnav">
            <button className="report-navlink" onClick={loadAll}>{state.refreshing ? 'Refreshing\u2026' : 'Refresh'}</button>
            <button className="report-navlink" onClick={() => onNav && onNav('admin')}>Findings report &rarr;</button>
            <button className="report-signout" onClick={() => onLock && onLock()}>Lock</button>
          </div>
        </header>

        <div className="study-status">
          <span className={'ss-pill ' + state.status}>{state.status === 'open' ? 'Study open' : 'Study closed'}</span>
          <button className="ss-toggle" onClick={toggleStatus}>{state.status === 'open' ? 'Close the study' : 'Reopen the study'}</button>
          <button className="ss-toggle export" onClick={exportCsv}>Export findings (CSV)</button>
        </div>

        {/* LENS 01 · INTEGRITY */}
        <section className="lens">
          <div className="lens-eyebrow">Lens 01 &middot; Integrity</div>
          <h3 className="lens-title">Is the instrument sound?</h3>
          <ul className="guardrails">
            {GUARDRAILS.map((g, i) => <li key={i}>&#10003; {g}</li>)}
          </ul>
          <h4 className="lens-sub">Coverage &amp; convergence <span className="lens-note">a guest needs {'≥'}3 reads to be trusted</span></h4>
          <table className="console-table">
            <thead><tr><th>Guest</th><th>Reads</th><th>Status</th><th>Findings</th></tr></thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.key}>
                  <td className="ct-name">{personaLabel(r.key)}</td>
                  <td>{r.reps}</td>
                  <td><span className={'cstat ' + r.status}>{r.status === 'converged' ? 'Converged' : r.status === 'forming' ? 'Forming' : 'Gap'}</span></td>
                  <td className="ct-find">{r.status === 'converged' ? `${r.strong} strong · ${r.emerging} emerging` : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* LENS 02 · VALIDATION */}
        <section className="lens">
          <div className="lens-eyebrow">Lens 02 &middot; Validation</div>
          <h3 className="lens-title">The North Star</h3>
          <div className="kpis">
            <div className="kpi"><span className="kpi-num">{st.completed_reads}</span><span className="kpi-lab">reads recorded</span></div>
            <div className="kpi"><span className="kpi-num">{compRate}%</span><span className="kpi-lab">completion rate</span><span className="kpi-sub">{st.completed_reads} of {st.started_reads} started</span></div>
            <div className="kpi"><span className="kpi-num">{depthRate}%</span><span className="kpi-lab">went deeper</span><span className="kpi-sub">{st.deep_reads} of {st.completed_reads} completed</span></div>
            <div className="kpi"><span className="kpi-num">{converged}</span><span className="kpi-lab">guests converged</span></div>
          </div>
          <p className="lens-foot">Operational rates use % (study health) &mdash; the &ldquo;counts never %&rdquo; rule governs the GM&rsquo;s findings, not these.</p>
        </section>

        {/* LENS 03 · AGENT ACTIVITY */}
        <section className="lens">
          <div className="lens-eyebrow">Lens 03 &middot; Agent activity</div>
          <h3 className="lens-title">Who&rsquo;s contributing <span className="lens-note">per badge, anonymous</span></h3>
          {state.agents.length === 0 ? <p className="lens-empty">No reads yet.</p> : (
            <div className="agent-grid">
              {state.agents.map(a => (
                <div key={a.agent} className="agent-chip"><span className="agent-name">{a.agent}</span><span className="agent-reads">{a.reads}</span></div>
              ))}
            </div>
          )}

          <h4 className="lens-sub">Badges <span className="lens-note">{(state.badges || []).filter(b => !b.claimed_at).length} free of {(state.badges || []).length}</span></h4>
          <p className="lens-foot" style={{ marginTop: 0, marginBottom: 10 }}>Release a badge only if that agent lost access (cleared browser, new device) &mdash; otherwise they&rsquo;ll take a second badge and count twice.</p>
          <div className="badge-admin">
            {(state.badges || []).map(b => (
              <div key={b.badge_id} className={'badge-row' + (b.claimed_at ? ' claimed' : '')}>
                <span className="badge-animal">{b.animal}</span>
                <span className="badge-state">{b.claimed_at ? 'claimed ' + new Date(b.claimed_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'free'}</span>
                {b.claimed_at
                  ? <button className="badge-release" onClick={() => releaseBadge(b)}>Release</button>
                  : <span className="badge-free-dot">&#9679;</span>}
              </div>
            ))}
          </div>
        </section>

        {/* LENS 04 · APP HEALTH */}
        <section className="lens">
          <div className="lens-eyebrow">Lens 04 &middot; App health</div>
          <h3 className="lens-title">Is the app behaving?</h3>
          <div className="kpis">
            <div className="kpi"><span className={'kpi-num' + (state.health.last_24h > 0 ? ' warn' : ' ok')}>{state.health.last_24h}</span><span className="kpi-lab">errors, last 24h</span></div>
            <div className="kpi"><span className="kpi-num">{state.health.total}</span><span className="kpi-lab">errors, all time</span></div>
            <div className="kpi">
              <span className="kpi-num sm">{state.health.last_error ? new Date(state.health.last_error).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : 'None'}</span>
              <span className="kpi-lab">last error</span>
              <span className="kpi-sub">{state.health.last_error ? new Date(state.health.last_error).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : 'all clear'}</span>
            </div>
          </div>
          {state.errors.length > 0 && (
            <div className="err-list">
              <p className="lens-sub">Recent errors</p>
              {state.errors.map((e, i) => (
                <div key={i} className="err-row">
                  <span className="err-when">{new Date(e.occurred_at).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>
                  <span className="err-msg">{e.message}</span>
                </div>
              ))}
            </div>
          )}
          <p className="lens-foot">Caught errors logged in-app; Sentry holds the full stack traces for deeper diagnosis.</p>
        </section>

        {/* LENS 05 · GM ACTIVITY */}
        <section className="lens">
          <div className="lens-eyebrow">Lens 05 &middot; GM activity</div>
          <h3 className="lens-title">Is the report being read?</h3>
          <div className="kpis">
            <div className="kpi"><span className="kpi-num">{state.report.opens}</span><span className="kpi-lab">report opens</span></div>
            <div className="kpi">
              <span className="kpi-num sm">{state.report.last_opened ? new Date(state.report.last_opened).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'}</span>
              <span className="kpi-lab">last opened</span>
              <span className="kpi-sub">{state.report.last_opened ? new Date(state.report.last_opened).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' }) : 'not yet'}</span>
            </div>
          </div>
          <p className="lens-foot">Counts GM Findings Report opens — a signal of whether findings are actually reaching the GM.</p>
        </section>

        {/* LENS 06 · WHAT TO CHANGE NEXT */}
        <section className="lens">
          <div className="lens-eyebrow">Lens 06 &middot; What to change next</div>
          <h3 className="lens-title">Where to nudge</h3>
          <ul className="nudges">
            {nudges.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </section>
      </div>
    </div>
  )
}
