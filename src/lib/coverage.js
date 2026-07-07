// Per-badge local record of read personas AND the depth reached: { persona: 'core'|'expert' }
const KEY = id => `guestiq_coverage_${id}`
const RANK = { core: 1, expert: 2 }

export function getCoverage(badgeId) {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY(badgeId)) || '{}')
    if (Array.isArray(raw)) { const m = {}; raw.forEach(p => { m[p] = 'core' }); return m } // legacy array → core
    return raw && typeof raw === 'object' ? raw : {}
  } catch (e) { return {} }
}

export function addCoverage(badgeId, persona, depth = 'core') {
  const cur = getCoverage(badgeId)
  if (!cur[persona] || (RANK[depth] || 0) > (RANK[cur[persona]] || 0)) { // never downgrade
    cur[persona] = depth
    try { localStorage.setItem(KEY(badgeId), JSON.stringify(cur)) } catch (e) { /* ignore */ }
  }
  return cur
}
