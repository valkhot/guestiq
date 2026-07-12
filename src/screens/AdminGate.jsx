import React, { useState, useEffect } from 'react'
import { getPin, setPin, checkPin } from '../lib/adminPin.js'

const IDLE_MS = 3 * 60 * 1000   // auto-lock after 3 min idle
const MAX_TRIES = 5             // then a cooldown
const COOLDOWN_MS = 30 * 1000

export default function AdminGate({ children, onLock }) {
  const [status, setStatus] = useState('checking') // checking | locked | unlocked
  const [entry, setEntry] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [fails, setFails] = useState(0)
  const [cooldownUntil, setCooldownUntil] = useState(0)

  // validate any PIN already held for this session
  useEffect(() => {
    const pin = getPin()
    if (!pin) { setStatus('locked'); return }
    checkPin(pin).then(ok => setStatus(ok ? 'unlocked' : 'locked'))
  }, [])

  // auto-lock on idle while unlocked (shared-desk safeguard)
  useEffect(() => {
    if (status !== 'unlocked') return
    let timer
    const reset = () => { clearTimeout(timer); timer = setTimeout(() => onLock && onLock(), IDLE_MS) }
    const acts = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart']
    acts.forEach(a => window.addEventListener(a, reset, { passive: true }))
    reset()
    return () => { clearTimeout(timer); acts.forEach(a => window.removeEventListener(a, reset)) }
  }, [status])

  async function submit() {
    if (busy || !entry) return
    if (Date.now() < cooldownUntil) return
    setBusy(true); setError('')
    const ok = await checkPin(entry)
    setBusy(false)
    if (ok) { setPin(entry); setFails(0); setStatus('unlocked'); return }
    const n = fails + 1
    setFails(n); setEntry('')
    if (n >= MAX_TRIES) {
      setCooldownUntil(Date.now() + COOLDOWN_MS)
      setError('Too many attempts. Wait 30 seconds.')
      setTimeout(() => { setError(''); setFails(0) }, COOLDOWN_MS)
    } else {
      setError('That PIN didn\u2019t match.')
    }
  }

  if (status === 'checking') return <div className="screen center"><p className="sub">One moment&hellip;</p></div>
  if (status === 'unlocked') return children

  const cooling = Date.now() < cooldownUntil

  return (
    <div className="screen center enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>
      <h1 className="serif-h hero">Locked</h1>
      <p className="lede">Enter the desk PIN.</p>
      <input className="pin-input" type="password" inputMode="numeric" value={entry}
             onChange={e => setEntry(e.target.value)}
             onKeyDown={e => { if (e.key === 'Enter') submit() }}
             placeholder="PIN" autoFocus disabled={cooling} />
      {error && <p className="pin-error">{error}</p>}
      <button className="cta" onClick={submit} disabled={busy || !entry || cooling}>{busy ? 'Checking\u2026' : 'Enter \u2192'}</button>
      <p className="pin-note">Locks automatically after a few minutes idle.</p>
    </div>
  )
}
