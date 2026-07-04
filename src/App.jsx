import React, { useState, useEffect } from 'react'
import Welcome from './screens/Welcome.jsx'
import BadgeClaim from './screens/BadgeClaim.jsx'
import Coin from './components/Coin.jsx'

const BADGE_KEY = 'guestiq_badge'

export default function App() {
  const [screen, setScreen] = useState('loading')
  const [badge, setBadge] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(BADGE_KEY)
      if (saved) { setBadge(JSON.parse(saved)); setScreen('home'); return }
    } catch (e) { /* ignore */ }
    setScreen('welcome')
  }, [])

  function handleClaimed(b) {
    setBadge(b)
    try { localStorage.setItem(BADGE_KEY, JSON.stringify(b)) } catch (e) { /* ignore */ }
    setScreen('home')
  }

  function changeBadge() {
    try { localStorage.removeItem(BADGE_KEY) } catch (e) { /* ignore */ }
    setBadge(null)
    setScreen('claim')
  }

  if (screen === 'loading') return null
  if (screen === 'welcome') return <Welcome onStart={() => setScreen('claim')} />
  if (screen === 'claim')   return <BadgeClaim onClaimed={handleClaimed} />

  return (
    <div className="screen center enter">
      <div className="thread" />
      <Coin badgeId={badge?.badge_id} animal={badge?.animal} colour={badge?.colour} size={116} hero />
      <h1 className="serif-h hero">Welcome back, {badge?.animal}.</h1>
      <p className="lede">Your reads come next &mdash; the guest picker arrives in the next build.</p>
      <button className="cta" onClick={() => alert('Guest-select arrives in Increment B.')}>Start a read &rarr;</button>
      <button className="linkbtn" onClick={changeBadge}>Change badge</button>
    </div>
  )
}
