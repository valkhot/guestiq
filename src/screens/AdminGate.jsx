import React, { useState, useEffect } from 'react'
import { getPin, setPin, checkPin } from '../lib/adminPin.js'

export default function AdminGate({ children }) {
  const [status, setStatus] = useState('checking') // checking | locked | unlocked
  const [entry, setEntry] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    const pin = getPin()
    if (!pin) { setStatus('locked'); return }
    checkPin(pin).then(ok => setStatus(ok ? 'unlocked' : 'locked'))
  }, [])

  async function submit() {
    if (busy || !entry) return
    setBusy(true); setError('')
    const ok = await checkPin(entry)
    setBusy(false)
    if (ok) { setPin(entry); setStatus('unlocked') }
    else setError('That PIN didn\u2019t match.')
  }

  if (status === 'checking') return <div className="screen center"><p className="sub">One moment&hellip;</p></div>
  if (status === 'unlocked') return children

  return (
    <div className="screen center enter">
      <div className="thread" />
      <div className="brand">GUEST<b>IQ</b></div>
      <h1 className="serif-h hero">Findings</h1>
      <p className="lede">Enter the desk PIN to view the findings.</p>
      <input className="pin-input" type="password" inputMode="numeric" value={entry}
             onChange={e => setEntry(e.target.value)}
             onKeyDown={e => { if (e.key === 'Enter') submit() }}
             placeholder="PIN" autoFocus />
      {error && <p className="pin-error">{error}</p>}
      <button className="cta" onClick={submit} disabled={busy || !entry}>{busy ? 'Checking\u2026' : 'Enter \u2192'}</button>
    </div>
  )
}
