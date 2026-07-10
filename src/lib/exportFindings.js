import { personaLabel } from './readFlow.js'

// Flatten computed findings → CSV rows. Counts only, no names — anonymity-safe.
export function findingsToCsv(result) {
  const header = ['guest', 'type', 'finding', 'tag', 'tier', 'count', 'reps']
  const rows = [header]
  const esc = v => {
    const s = String(v ?? '')
    return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s
  }
  for (const [key, d] of Object.entries(result.personas)) {
    if (d.gated) continue
    const push = (f, tier) => rows.push([personaLabel(key), f.type, f.label, f.tag, tier, f.count, f.reps])
    ;(d.strong || []).forEach(f => push(f, 'strong'))
    ;(d.emerging || []).forEach(f => push(f, 'emerging'))
  }
  return rows.map(r => r.map(esc).join(',')).join('\n')
}

export function downloadCsv(csv, filename = 'guestiq-findings.csv') {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
