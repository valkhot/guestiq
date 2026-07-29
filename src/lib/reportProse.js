// Deterministic report prose — descriptive, never prescriptive. Assembled by
// rules from the real findings (no AI, no recommendations). Mirrors the
// end-of-read story's approach: honest synthesis, stable for the same data.
import { personaLabel } from './readFlow.js'

function seedFrom(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) }
  return Math.abs(h)
}
function pick(list, seed) { return list[seed % list.length] }
function nWord(n) { return ({1:'one',2:'two',3:'three',4:'four',5:'five',6:'six',7:'seven',8:'eight',9:'nine'})[n] || String(n) }
// A short, descriptive tail naming what the sharpest finding actually is.
function shortFinding(f) {
  if (!f || !f.label) return ''
  const lbl = f.label.trim().replace(/\.$/, '')
  // Labels with an em-dash carry their own clause (e.g. VIP 'pull two ways — ...').
  // Present the whole label as a colon aside so grammar always holds.
  if (lbl.includes('\u2014')) return ` \u2014 ${lbl.charAt(0).toLowerCase() + lbl.slice(1)}`
  return `, around \u201C${lbl.charAt(0).toLowerCase() + lbl.slice(1)}\u201D`
}
function listGuests(keys) {
  const names = keys.map(personaLabel)
  if (names.length === 1) return names[0]
  if (names.length === 2) return names[0] + ' and ' + names[1]
  return names.slice(0, -1).join(', ') + ', and ' + names[names.length - 1]
}

// ── #1 · Opening orientation — 2–4 sentences framing the whole report ──
export function overviewNarrative(result) {
  const { meta, personas, overview } = result
  const read = Object.keys(personas).filter(k => personas[k].reps > 0)
  const readable = read.filter(k => !personas[k].gated)
  const seed = seedFrom('ov|' + meta.reads + '|' + read.length + '|' + overview.crossCutting.length)
  const parts = []

  // sentence 1 — the scope
  const opener = pick([
    `This report draws on ${meta.reads} anonymous ${meta.reads === 1 ? 'read' : 'reads'} across ${nWord(read.length)} guest ${read.length === 1 ? 'type' : 'types'}.`,
    `So far the desk has recorded ${meta.reads} ${meta.reads === 1 ? 'read' : 'reads'}, spread across ${nWord(read.length)} guest ${read.length === 1 ? 'type' : 'types'}.`,
    `${meta.reads} ${meta.reads === 1 ? 'read has' : 'reads have'} come in, covering ${nWord(read.length)} guest ${read.length === 1 ? 'type' : 'types'}.`,
  ], seed)
  parts.push(opener)

  // sentence 2 — the headline signal
  if (overview.crossCutting.length > 0) {
    const top = overview.crossCutting[0]
    parts.push(pick([
      `The clearest thread runs across the whole desk: ${nWord(overview.crossCutting.length)} ${overview.crossCutting.length === 1 ? 'finding recurs' : 'findings recur'} in more than one guest type.`,
      `What stands out most is not tied to any single guest \u2014 ${nWord(overview.crossCutting.length)} ${overview.crossCutting.length === 1 ? 'pattern holds' : 'patterns hold'} across two or more guest types.`,
    ], seed))
    parts.push(`The strongest of these shows up in ${nWord(top.guests.length)} of them.`)
  } else if (overview.sharpest.length > 0) {
    const f = overview.sharpest[0]
    parts.push(pick([
      `No single pattern yet spans multiple guest types, but the sharpest signals are already clear \u2014 the strongest sitting with the ${personaLabel(f.persona)} guest${shortFinding(f)}.`,
      `The findings are guest-specific rather than desk-wide; the sharpest sits with the ${personaLabel(f.persona)} guest${shortFinding(f)}.`,
    ], seed))
  } else {
    parts.push(`It is still early \u2014 no finding has yet crossed the ${meta.floor}-read floor, so the shapes below are only beginning to form.`)
  }

  // sentence 3 — where it's thin
  if (overview.thin.length > 0) {
    parts.push(pick([
      `${overview.thin.length === read.length ? 'Every guest type is' : (nWord(overview.thin.length).replace(/^./, c => c.toUpperCase()) + ' guest ' + (overview.thin.length === 1 ? 'type is' : 'types are'))} still too thin to read \u2014 ${listGuests(overview.thin.map(t => t.persona))} ${overview.thin.length === 1 ? 'needs' : 'need'} more reads before ${overview.thin.length === 1 ? 'it speaks' : 'they speak'}.`,
    ], seed))
  } else if (readable.length > 0) {
    parts.push(`Every guest type read so far has enough behind it to show real findings.`)
  }

  return parts.join(' ')
}

// ── #2 · Section ledes that reflect the actual data ──
export function crossCuttingLede(overview) {
  const n = overview.crossCutting.length
  if (n === 0) return 'Patterns strong in more than one guest type \u2014 the desk-wide signal.'
  const top = overview.crossCutting[0]
  const base = `${nWord(n).replace(/^./, c => c.toUpperCase())} ${n === 1 ? 'pattern holds' : 'patterns hold'} across two or more guest types.`
  const tail = ` The strongest \u2014 \u201C${top.label}\u201D \u2014 appears in ${nWord(top.guests.length)}.`
  return base + tail
}

export function sharpestLede(overview) {
  const n = overview.sharpest.length
  if (n === 0) return 'The strongest individual findings \u2014 each tied to its guest.'
  const guests = [...new Set(overview.sharpest.map(f => f.persona))]
  return `The ${n === 1 ? 'strongest single finding' : nWord(n) + ' strongest single findings'}, drawn from ${guests.length === 1 ? 'the ' + personaLabel(guests[0]) + ' guest' : nWord(guests.length) + ' guest types'} \u2014 each shown with the guest it belongs to.`
}


// ── #3 · Per-guest opening line — orients the GM on a single guest tab ──
export function personaNarrative(persona, d) {
  if (!d) return ''
  if (d.gated) return d.gateReason || 'Not enough reads yet to show findings for this guest.'
  const seed = seedFrom('pg|' + persona + '|' + d.reps + '|' + d.strong.length)
  const nStrong = d.strong.length, nEmerg = d.emerging.length
  const parts = []

  parts.push(pick([
    `From ${nWord(d.reps)} ${d.reps === 1 ? 'read' : 'reads'}:`,
    `Across ${nWord(d.reps)} ${d.reps === 1 ? 'read' : 'reads'} of this guest,`,
    `${nWord(d.reps).replace(/^./, c => c.toUpperCase())} ${d.reps === 1 ? 'read' : 'reads'} in,`,
  ], seed))

  if (nStrong > 0) {
    parts.push(`${nWord(nStrong)} strong ${nStrong === 1 ? 'finding' : 'findings'}${nEmerg > 0 ? ' and ' + nWord(nEmerg) + ' still emerging' : ''}.`)
    const top = d.strong[0]
    const kind = top.type === 'blind-spot' ? 'blind spot' : top.type === 'contradiction' ? 'contradiction' : 'mis-weight'
    parts.push(pick([
      `The clearest is a ${kind}: ${top.label.charAt(0).toLowerCase() + top.label.slice(1)}.`,
      `Foremost among them, a ${kind} \u2014 ${top.label.charAt(0).toLowerCase() + top.label.slice(1)}.`,
    ], seed))
  } else if (nEmerg > 0) {
    parts.push(`${nWord(nEmerg)} ${nEmerg === 1 ? 'finding is' : 'findings are'} still emerging \u2014 not yet strong enough to lean on, but worth watching.`)
  } else {
    parts.push(`the answers are recorded, but no clear finding has formed yet.`)
  }
  return parts.join(' ')
}
