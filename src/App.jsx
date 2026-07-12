import React, { useState, useEffect } from 'react'
import Welcome from './screens/Welcome.jsx'
import BadgeClaim from './screens/BadgeClaim.jsx'
import GuestSelect from './screens/GuestSelect.jsx'
import ReadScreen from './screens/ReadScreen.jsx'
import FindingsPreview from './screens/FindingsPreview.jsx'
import AdminGate from './screens/AdminGate.jsx'
import GMReport from './screens/GMReport.jsx'
import Console from './screens/Console.jsx'
import Coin from './components/Coin.jsx'
import { supabase } from './lib/supabase.js'
import { readIdFor } from './lib/readFlow.js'
import { initAnalytics, identify, track } from './lib/analytics.js'
import { clearPin } from './lib/adminPin.js'
import { getCoverage } from './lib/coverage.js'

const BADGE_KEY = 'guestiq_badge'

export default function App() {
  const [screen, setScreen] = useState('loading')
  const [badge, setBadge] = useState(null)
  const [returning, setReturning] = useState(false) // true only when re-entering with a saved badge
  const [readId, setReadId] = useState(null)
  const [persona, setPersona] = useState(null)
  const [deepOnly, setDeepOnly] = useState(false)
  const [adminView, setAdminView] = useState(() => {
    const v = new URLSearchParams(window.location.search).get('view')
    return (v === 'admin' || v === 'console' || v === 'findings') ? v : null
  })

  useEffect(() => {
    initAnalytics()
    track('app_opened')
    const route = () => {
      try {
        const saved = localStorage.getItem(BADGE_KEY)
        if (saved) { setBadge(JSON.parse(saved)); setReturning(true); setScreen('home'); return }
      } catch (e) { /* ignore */ }
      setScreen('welcome')
    }
    supabase.rpc('guestiq_study_status')
      .then(({ data }) => { if (data === 'closed') setScreen('closed'); else route() })
      .catch(() => route())
  }, [])

  // Discreet admin entry (overlay — keeps the agent screen alive underneath).
  useEffect(() => {
    const onKey = e => {
      if (e.ctrlKey && e.altKey && !e.shiftKey && !e.metaKey) {
        if (e.code === 'KeyA') { e.preventDefault(); setAdminView('admin') }
        else if (e.code === 'KeyR') { e.preventDefault(); setAdminView('console') }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Lock: clear the PIN, tidy the URL, and drop back to exactly where you were.
  const lockAdmin = () => {
    clearPin()
    try {
      const u = new URL(window.location.href)
      if (u.searchParams.has('view')) { u.searchParams.delete('view'); window.history.replaceState({}, '', u.toString()) }
    } catch (e) { /* ignore */ }
    setAdminView(null)
  }
  const navAdmin = v => setAdminView(v)

  function handleClaimed(b) {
    setBadge(b)
    setReturning(false) // just claimed → not a "welcome back"
    try { localStorage.setItem(BADGE_KEY, JSON.stringify(b)) } catch (e) { /* ignore */ }
    identify(b.badge_id)
    track('badge_claimed', { badge: b.badge_id })
    setScreen('home')
  }
  function changeBadge() {
    try { localStorage.removeItem(BADGE_KEY) } catch (e) { /* ignore */ }
    setBadge(null); setScreen('claim')
  }

  async function startRead(personaKey, mode = 'core') {
    const id = readIdFor(badge.badge_id, personaKey)
    const { error } = await supabase.from('reads').insert({
      id, respondent_id: badge.badge_id, persona: personaKey, depth: 'core',
    })
    const duplicate = error && (error.code === '23505' || /duplicate|already exists/i.test(error.message))
    if (error && !duplicate) { alert('Could not start the read: ' + error.message); return }
    track('read_started', { persona: personaKey, depth: mode })
    setDeepOnly(mode === 'deep'); setReadId(id); setPersona(personaKey); setScreen('read')
  }
  function exitRead(how) {
    setReadId(null); setPersona(null)
    setScreen(how === 'another' ? 'guestselect' : 'home')
  }

  if (adminView === 'admin') return <AdminGate onLock={lockAdmin}><GMReport onLock={lockAdmin} onNav={navAdmin} /></AdminGate>
  if (adminView === 'console') return <AdminGate onLock={lockAdmin}><Console onLock={lockAdmin} onNav={navAdmin} /></AdminGate>
  if (adminView === 'findings') return <AdminGate onLock={lockAdmin}><FindingsPreview /></AdminGate>

  if (screen === 'loading') return null
  if (screen === 'closed') return (
    <div className="screen center enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>
      <h1 className="serif-h hero">Thank you.</h1>
      <p className="lede">Reads are paused for now. Everything you&rsquo;ve recorded is safe &mdash; check back soon.</p>
    </div>
  )
  if (screen === 'welcome') return <Welcome onStart={() => setScreen('claim')} />
  if (screen === 'claim')   return <BadgeClaim onClaimed={handleClaimed} />
  if (screen === 'guestselect') return <GuestSelect badge={badge} onSelect={startRead} onBack={() => setScreen('home')} />
  if (screen === 'read')    return <ReadScreen badge={badge} persona={persona} readId={readId} deepOnly={deepOnly} onExit={exitRead} />

  const covCount = badge ? Object.keys(getCoverage(badge.badge_id)).length : 0

  return (
    <div className="screen center enter">
      <div className="thread" />
      <Coin badgeId={badge?.badge_id} animal={badge?.animal} colour={badge?.colour} size={116} hero />
      <h1 className="serif-h hero">{returning ? `Welcome back, ${badge?.animal}.` : `Let\u2019s begin, ${badge?.animal}.`}</h1>
      {returning && covCount > 0 && (
        <p className="home-recognition">You&rsquo;ve brought {covCount} guest{covCount === 1 ? '' : 's'} to life so far.</p>
      )}
      <p className="lede">Pick a guest you know and get their read down &mdash; one at a time, in your own words.</p>
      <button className="cta" onClick={() => setScreen('guestselect')}>Start a read &rarr;</button>
      <button className="linkbtn" onClick={changeBadge}>Change badge</button>
    </div>
  )
}
