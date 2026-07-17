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

// How much the agent got down — one per question they answered.
export function volume(recorded) {
  return recorded.length
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
// Independent sub-seeds so each slot varies on its own (not all in lockstep).
function sub(seed, salt) { return Math.abs(Math.imul(seed ^ salt, 2654435761)) }
function pick(list, seed) { return list[seed % list.length] }

const OPENERS = [
  l => `This is ${aan(l)} ${l} guest you know well.`,
  l => `You know this ${l} guest inside out.`,
  l => `${aan(l) === 'an' ? 'An' : 'A'} ${l} guest \u2014 and you read them on sight.`,
  l => `This ${l} guest? You had them the moment they walked in.`,
  l => `Ask you about ${aan(l)} ${l} guest and you don\u2019t have to think.`,
]
// Each fact has several shapes — not just different labels, different sentences.
const BOTHERS = [
  v => `What quietly bothers them: ${v}.`,
  v => `${cap(v)} \u2014 that\u2019s what quietly gets to them.`,
  v => `The thing they never mention: ${v}.`,
]
const DELIGHT = [
  v => `The small thing that lands: ${v}.`,
  v => `What would make their day: ${v}.`,
  v => `What quietly delights them: ${v}.`,
]
const ASKS = [
  v => `They ask for something you don\u2019t stock \u2014 ${v}.`,
  v => `What they want that isn\u2019t there: ${v}.`,
  v => `Something they\u2019ll ask for that you haven\u2019t got: ${v}.`,
]
const KEEPFROM = [
  v => `A room to keep them from: ${v}.`,
  v => `The room that would spoil it: ${v}.`,
  v => `Where you\u2019d never put them: ${v}.`,
]
const CLOSERS = [
  'The small things a system never sees \u2014 but you did.',
  'None of this is in a database. It\u2019s in you.',
  'The details a booking form never asks \u2014 and you already knew.',
  'No system holds any of this. You do.',
]
function cap(t) { return t ? t.charAt(0).toUpperCase() + t.slice(1) : t }
function lower(t) { return t ? t.charAt(0).toLowerCase() + t.slice(1) : t }

export function storyFrom(persona, recorded) {
  const label = personaLabel(persona)
  const by = indexById(recorded)
  const v = id => by[id] ? chosenText(by[id]) : ''

  const bothers = v('P2'), delight = v('P7'), asks = v('P9'), keepFrom = v('P3')

  // Seed from the ANSWERS, not the question ids — so two agents who read the
  // same guest differently get different phrasing, while one agent re-reading
  // the same read always gets the identical story (deterministic).
  const seed = seedFrom([label, bothers, delight, asks, keepFrom].join('|'))

  const parts = [pick(OPENERS, sub(seed, 0x9e37))(label)]
  if (bothers)  parts.push(pick(BOTHERS,  sub(seed, 0x1b3f))(bothers))
  if (delight)  parts.push(pick(DELIGHT,  sub(seed, 0x7c15))(delight))
  if (asks)     parts.push(pick(ASKS,     sub(seed, 0x2f6d))(asks))
  if (keepFrom) parts.push(pick(KEEPFROM, sub(seed, 0x5ab2))(keepFrom))

  if (parts.length === 1) parts.push('You got their read down in your own words \u2014 the things a form never asks.')
  else parts.push(pick(CLOSERS, sub(seed, 0xc3a9)))
  return parts.join(' ')
}
