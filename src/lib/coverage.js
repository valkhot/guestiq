// Per-badge local record of completed personas (feeds the gallery + coverage wall).
const KEY = id => `guestiq_coverage_${id}`

export function getCoverage(badgeId) {
  try { return JSON.parse(localStorage.getItem(KEY(badgeId)) || '[]') } catch (e) { return [] }
}
export function addCoverage(badgeId, persona) {
  const cur = getCoverage(badgeId)
  if (!cur.includes(persona)) {
    cur.push(persona)
    try { localStorage.setItem(KEY(badgeId), JSON.stringify(cur)) } catch (e) { /* ignore */ }
  }
  return cur
}
