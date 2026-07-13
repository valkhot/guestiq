import { supabase } from './supabase.js'

const KEY = 'guestiq_write_queue'

function load() { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch (e) { return [] } }
function save(q) { try { localStorage.setItem(KEY, JSON.stringify(q)) } catch (e) { /* ignore */ } }

export function queueLength() { return load().length }

// A network/offline failure (as opposed to a real server/RLS error we must surface).
function isOffline(err) {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) return true
  const m = ((err && err.message) || '').toLowerCase()
  return err?.name === 'TypeError' || m.includes('fetch') || m.includes('network') ||
         m.includes('failed to') || m.includes('load failed') || m.includes('timeout')
}

// A duplicate (23505) means the row is already there → idempotent success.
function isDuplicate(err) {
  return err && (err.code === '23505' || /duplicate|already exists/i.test(err.message || ''))
}

// Run one queued op against Supabase. Throws only on a genuine failure worth retrying.
async function runOp(op) {
  const t = supabase.from(op.table)
  if (op.action === 'insert') {
    const { error } = await t.insert(op.data)
    if (error && !isDuplicate(error)) throw error
  } else if (op.action === 'update') {
    const { error } = await t.update(op.data).eq(op.matchCol, op.matchVal)
    if (error) throw error
  }
}

function enqueue(op) {
  const q = load()
  // dedupe by key: a newer op with the same key replaces the old (e.g. completion update)
  const idx = op.key ? q.findIndex(x => x.key === op.key) : -1
  if (idx >= 0) q[idx] = op; else q.push(op)
  save(q)
}

// Try a write now; if offline, queue it and report queued:true. Real errors still throw.
export async function writeOrQueue(op) {
  try {
    await runOp(op)
    return { ok: true, queued: false }
  } catch (err) {
    if (isOffline(err)) { enqueue(op); return { ok: false, queued: true } }
    throw err // genuine error — let the caller surface it
  }
}

let flushing = false
export async function flushQueue() {
  if (flushing) return { flushed: 0, remaining: queueLength() }
  flushing = true
  try {
    const q = load()
    if (q.length === 0) return { flushed: 0, remaining: 0 }
    const remaining = []
    let flushed = 0
    for (const op of q) {
      try { await runOp(op); flushed++ }
      catch (e) { remaining.push(op) } // still failing → keep for next time
    }
    save(remaining)
    return { flushed, remaining: remaining.length }
  } finally { flushing = false }
}

// Auto-flush: on load, on reconnect, and every 30s while anything is queued.
let started = false
export function startQueueSync() {
  if (started || typeof window === 'undefined') return
  started = true
  flushQueue()
  window.addEventListener('online', () => flushQueue())
  setInterval(() => { if (queueLength() > 0) flushQueue() }, 30000)
}
