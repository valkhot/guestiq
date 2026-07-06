import { personaLabel } from './readFlow.js'

// Human-readable text for what the agent chose on one recorded entry.
export function chosenText(entry) {
  const { q, value, freeText } = entry
  if (!q) return ''
  if (q.type === 'verbatim') return (freeText || '').trim()
  if (value.type === 'single' || value.type === 'observer') {
    const o = q.options?.find(x => x.key === value.keys?.[0])
    return o ? o.label : ''
  }
  if (value.type === 'multi') {
    return (value.keys || []).map(k => q.options?.find(x => x.key === k)?.label).filter(Boolean).join(', ')
  }
  if (value.type === 'scale5') return value.scale != null ? `${value.scale} of 5` : ''
  return ''
}

// A few highlight questions → friendly dossier labels.
const HIGHLIGHTS = [
  { id: 'P2',  label: 'A quiet complaint they never mention' },
  { id: 'P3',  label: 'A room to keep them from' },
  { id: 'P7',  label: 'A small thing that delights them' },
  { id: 'P9',  label: 'Something they ask for that you don\u2019t keep' },
  { id: 'P1b', label: 'Where they\u2019d book instead' },
]

function indexById(recorded) {
  const by = {}
  recorded.forEach(e => { if (e.q?.id) by[e.q.id] = e })
  return by
}

export function dossierRows(recorded) {
  const by = indexById(recorded)
  const rows = []
  for (const h of HIGHLIGHTS) {
    const e = by[h.id]
    if (!e) continue
    const t = chosenText(e)
    if (t) rows.push({ label: h.label, value: t })
  }
  return rows
}

export function quotes(recorded) {
  return recorded.map(e => (e.freeText || '').trim()).filter(Boolean)
}

export function storyFrom(persona, recorded) {
  const label = personaLabel(persona)
  const by = indexById(recorded)
  const v = id => by[id] ? chosenText(by[id]) : ''
  const parts = [`You read a ${label} guest you know.`]
  if (v('P2')) parts.push(`What quietly bothers them \u2014 ${v('P2')}.`)
  if (v('P7')) parts.push(`What delights them \u2014 ${v('P7')}.`)
  if (v('P9')) parts.push(`What they ask for that isn\u2019t there \u2014 ${v('P9')}.`)
  if (v('P3')) parts.push(`What to keep them from \u2014 ${v('P3')}.`)
  if (parts.length === 1) parts.push('You got their read down in your own words \u2014 the small things a system never sees.')
  return parts.join(' ')
}

export const volume = recorded => recorded.length
