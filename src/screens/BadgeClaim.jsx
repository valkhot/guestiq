import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase.js'
import Coin from '../components/Coin.jsx'

export default function BadgeClaim({ onClaimed }) {
  const [badges, setBadges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [picked, setPicked] = useState(null)
  const [busy, setBusy] = useState(false)

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

  async function confirm() {
    const b = picked
    setBusy(true)
    if (!b.claimed_at) {
      const { error } = await supabase
        .from('badges')
        .update({ claimed_at: new Date().toISOString() })
        .eq('badge_id', b.badge_id)
        .is('claimed_at', null)
      if (error) { setError(error.message); setBusy(false); return }
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
      <div className="coin-grid">
        {badges.map(b => (
          <button key={b.badge_id}
                  className={'coin-btn' + (b.claimed_at ? ' taken' : '')}
                  onClick={() => setPicked(b)}>
            <Coin badgeId={b.badge_id} animal={b.animal} colour={b.colour} size={104} />
            <span className="coin-name">{b.animal}</span>
            {b.claimed_at && <span className="coin-taken">taken</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
