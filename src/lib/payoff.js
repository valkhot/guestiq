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

// Deterministic-but-varied phrasing: a stable per-read pick (no randomness) so the
// story reads with life without ever changing between renders of the same read.
function aan(word) {
  return /^[aeiou]/i.test((word || '').trim()) ? 'an' : 'a'
}
function seedFrom(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return Math.abs(h)
}
const OPENERS = [
  l => `This is ${aan(l)} ${l} guest you know well.`,
  l => `You know this ${l} guest inside out.`,
  l => `${aan(l) === 'an' ? 'An' : 'A'} ${l} guest \u2014 and you read them on sight.`,
  l => `This ${l} guest? You had them the moment they walked in.`,
]
const DELIGHT_LEAD = ['The small thing that lands:', 'What would make their day:', 'What quietly delights them:']
const CLOSERS = [
  'The small things a system never sees \u2014 but you did.',
  'None of this is in a database. It\u2019s in you.',
  'The details a booking form never asks \u2014 and you already knew.',
]

export function storyFrom(persona, recorded) {
  const label = personaLabel(persona)
  const by = indexById(recorded)
  const v = id => by[id] ? chosenText(by[id]) : ''
  const seed = seedFrom(label + '|' + recorded.map(e => (e.q && e.q.id) || '').join(','))

  const parts = [OPENERS[seed % OPENERS.length](label)]
  if (v('P2')) parts.push(`What quietly bothers them: ${v('P2')}.`)
  if (v('P7')) parts.push(`${DELIGHT_LEAD[seed % DELIGHT_LEAD.length]} ${v('P7')}.`)
  if (v('P9')) parts.push(`They ask for something you don\u2019t stock \u2014 ${v('P9')}.`)
  if (v('P3')) parts.push(`A room to keep them from: ${v('P3')}.`)

  if (parts.length === 1) {
    parts.push('You got their read down in your own words \u2014 the things a form never asks.')
  } else {
    parts.push(CLOSERS[seed % CLOSERS.length])
  }
  return parts.join(' ')
}

export const volume = recorded => recorded.length
