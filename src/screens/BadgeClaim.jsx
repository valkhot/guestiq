import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import Coin from '../components/Coin.jsx'

export default function BadgeClaim({ onClaimed }) {
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [picked, setPicked] = useState(null)
  const [busy, setBusy] = useState(false)
  const [taken, setTaken] = useState(null)

  useEffect(() => {
    let alive = true
    ;(async () => {
      const { data, error } = await supabase.from('badges').select('*').order('animal')
      if (!alive) return
      if (error) setError(error.message)
      else setBadges(data || [])
      setLoading(false)
    })()
    return () => { alive = false }
  }, [])

  async function refreshBadges() {
    const { data } = await supabase.from('badges').select('*').order('animal')
    if (data) setBadges(data)
  }

  async function confirm() {
    const b = picked
    if (b.claimed_at) { setTaken(b.animal); setPicked(null); refreshBadges(); return }
    setBusy(true)
    // Claim only if still unclaimed; `select()` tells us whether WE won the race.
    const { data, error } = await supabase
      .from('badges')
      .update({ claimed_at: new Date().toISOString() })
      .eq('badge_id', b.badge_id)
      .is('claimed_at', null)
      .select()
    setBusy(false)
    if (error) { setError(error.message); return }
    if (!data || data.length === 0) {
      // Someone claimed it first — don't hand out a shared identity.
      setTaken(b.animal); setPicked(null); refreshBadges(); return
    }
    onClaimed({ badge_id: b.badge_id, animal: b.animal, colour: b.colour })
  }

  if (loading) return <div className="screen center"><p className="sub">Loading badges&hellip;</p></div>
  if (error)   return <div className="screen center"><p className="sub">Couldn&rsquo;t load badges. Please try again.<br/><span className="fine">{error}</span></p></div>

  if (picked) {
    return (
      <div className="screen center enter">
        <div className="thread" />
        <Coin badgeId={picked.badge_id} animal={picked.animal} colour={picked.colour} size={150} hero selected />
        <h1 className="serif-h hero">You&rsquo;re the {picked.animal}.</h1>
        <div className="chips">
          <span className="chip">Not a name</span>
          <span className="chip">Not a score</span>
          <span className="chip">Just you</span>
        </div>
        <button className="cta" onClick={confirm} disabled={busy}>{busy ? 'One moment\u2026' : "That's me \u2192"}</button>
        <button className="linkbtn" onClick={() => setPicked(null)} disabled={busy}>Pick another</button>
      </div>
    )
  }

  return (
    <div className="screen claim enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>
      <h2 className="serif-h sm">Pick a badge.</h2>
      <p className="sub">Pick the one that feels like you.</p>
      {taken && <p className="claim-taken-note">The {taken} was just claimed by someone else \u2014 pick another.</p>}
      <div className="coin-grid">
        {badges.map(b => (
          <button key={b.badge_id}
                  className={'coin-btn' + (b.claimed_at ? ' taken' : '')}
                  disabled={!!b.claimed_at}
                  aria-disabled={!!b.claimed_at}
                  title={b.claimed_at ? 'Already taken by someone at the desk' : undefined}
                  onClick={() => { if (!b.claimed_at) { setTaken(null); setPicked(b) } }}>
            <Coin badgeId={b.badge_id} animal={b.animal} colour={b.colour} size={104} />
            <span className="coin-name">{b.animal}</span>
            {b.claimed_at && <span className="coin-taken">taken</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
