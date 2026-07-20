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

// Verbatim answers are the agent's own words — quote them.
function said(t) { return t ? `\u201C${t}\u201D` : '' }
// Option labels vary in case ("Price or a deal" vs "waiting at check-in").
// Lower the first letter for mid-sentence use — unless it opens with an acronym.
function emb(t) {
  if (!t) return ''
  const first = t.split(/\s/)[0] || ''
  if (first.length > 1 && first === first.toUpperCase() && /[A-Z]/.test(first)) return t
  return t.charAt(0).toLowerCase() + t.slice(1)
}

export function storyFrom(persona, recorded) {
  const label = personaLabel(persona)
  const by = indexById(recorded)
  const v = id => by[id] ? chosenText(by[id]) : ''

  // core facts
  const bothers = v('P2'), delight = v('P7'), asks = v('P9'), keepFrom = v('P3')
  // deep facts (only present on an expert read)
  const why = v('P11'), payFor = v('P19'), preAsk = v('P17'), arrive = v('P18')
  const unwritten = v('P13'), sorryRule = v('P14'), repeat = v('P16')
  const returnMoment = v('P22'), realProblem = v('P23'), surprises = v('P24'), spotEarly = v('P25b')
  const oneThing = v('P21')

  // Don't parrot the same words twice — agents often reuse an answer.
  const used = new Set()
  const fresh = t => {
    const k = (t || '').trim().toLowerCase()
    if (!k || used.has(k)) return ''
    used.add(k); return t
  }

  const seed = seedFrom([label, bothers, delight, asks, keepFrom, why, unwritten, returnMoment].join('|'))
  const paras = []

  // ── movement 1 · who they are (core) ──────────────────────────────
  const p1 = [pick(OPENERS, sub(seed, 0x9e37))(label)]
  if (bothers)  p1.push(pick(BOTHERS,  sub(seed, 0x1b3f))(emb(bothers)))
  if (delight)  p1.push(pick(DELIGHT,  sub(seed, 0x7c15))(emb(delight)))
  if (asks)     p1.push(pick(ASKS,     sub(seed, 0x2f6d))(emb(asks)))
  if (keepFrom) p1.push(pick(KEEPFROM, sub(seed, 0x5ab2))(emb(keepFrom)))
  if (p1.length === 1) p1.push('You got their read down in your own words \u2014 the things a form never asks.')
  paras.push(p1.join(' '))

  // ── movement 2 · why they come to you ─────────────────────────────
  const p2 = []
  if (why)    p2.push(pick(['They come to you for one thing above all: ', 'Why they choose you: ', 'What actually brings them: '], sub(seed, 0x11a5)) + emb(why) + '.')
  if (payFor) p2.push(pick(['They\u2019d happily pay extra for ', 'Worth money to them: ', 'They\u2019d put their hand in their pocket for '], sub(seed, 0x22b6)) + emb(payFor) + '.')
  if (preAsk) p2.push(`Before they even arrive, they want to know about ${emb(preAsk)}.`)
  if (arrive) p2.push(`They turn up \u2014 ${emb(arrive)}.`)
  if (p2.length) paras.push(p2.join(' '))

  // ── movement 3 · what isn't in the rulebook ───────────────────────
  const p3 = []
  const uw = fresh(unwritten), rp = fresh(repeat)
  if (uw)        p3.push(pick(['There\u2019s something you do for them that no rule asks for: ', 'Not in any rulebook, but you do it anyway: ', 'The thing you do that isn\u2019t written down: '], sub(seed, 0x33c7)) + said(uw) + '.')
  if (sorryRule) p3.push(`The rule you apologise for most: ${emb(sorryRule)}.`)
  if (rp)        p3.push(`And the thing you do again and again that one small change would end: ${said(rp)}.`)
  if (p3.length) paras.push(p3.join(' '))

  // ── movement 4 · the tells only you know ──────────────────────────
  const p4 = []
  const rpr = fresh(realProblem), sur = fresh(surprises), spot = fresh(spotEarly)
  if (returnMoment) p4.push(pick(['What decides whether they come back: ', 'The moment it turns: ', 'Whether they return comes down to '], sub(seed, 0x44d8)) + emb(returnMoment) + '.')
  if (rpr)  p4.push(`They\u2019ll complain about one thing when it\u2019s really another \u2014 ${said(rpr)}.`)
  if (sur)  p4.push(`New staff never see this coming: ${said(sur)}.`)
  if (spot) p4.push(`How you spot them early: ${said(spot)}.`)
  if (p4.length) paras.push(p4.join(' '))

  // ── movement 5 · the wish + close ─────────────────────────────────
  const ot = fresh(oneThing)
  const closer = pick(CLOSERS, sub(seed, 0xc3a9))
  if (ot) {
    paras.push(`One free change and you\u2019d fix them for good: ${said(ot)}. ${closer}`)
  } else if (paras.length > 1) {
    paras.push(closer)                       // expert read — closer earns its own beat
  } else {
    paras[0] = paras[0] + ' ' + closer       // core read — keep it one paragraph
  }

  return paras
}
