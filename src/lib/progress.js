// Per-badge local record of an IN-PROGRESS read: the answers given so far.
// Lets an interrupted read resume exactly where it left off — and survives an
// accidental reload (PWA update, dev reconnect, closed tab).
// Shape: { [persona]: { entries: [{ id, value, freeText }], updatedAt } }
const KEY = id => `guestiq_progress_${id}`

function load(badgeId) {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY(badgeId)) || '{}')
    return raw && typeof raw === 'object' ? raw : {}
  } catch (e) { return {} }
}
function save(badgeId, all) {
  try { localStorage.setItem(KEY(badgeId), JSON.stringify(all)) } catch (e) { /* ignore */ }
}

export function getEntries(badgeId, persona) {
  const e = load(badgeId)[persona]
  return e && Array.isArray(e.entries) ? e.entries : []
}

export function recordEntry(badgeId, persona, id, value, freeText) {
  const all = load(badgeId)
  const cur = all[persona] || { entries: [] }
  const entry = { id, value, freeText: freeText || '' }
  const idx = cur.entries.findIndex(x => x.id === id)
  if (idx >= 0) cur.entries[idx] = entry; else cur.entries.push(entry)
  cur.updatedAt = Date.now()
  all[persona] = cur
  save(badgeId, all)
}

// Called on completion — the read is done, progress is no longer "in progress".
export function clearProgress(badgeId, persona) {
  const all = load(badgeId)
  delete all[persona]
  save(badgeId, all)
}

// { persona: answeredCount } for every read left unfinished by this badge.
export function inProgress(badgeId) {
  const all = load(badgeId)
  const out = {}
  Object.keys(all).forEach(p => {
    const n = (all[p] && all[p].entries && all[p].entries.length) || 0
    if (n > 0) out[p] = n
  })
  return out
}
