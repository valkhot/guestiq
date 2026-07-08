import instrument from '../data/instrument.v4.2.json'

const FLOOR = 3 // convergence floor: a finding needs >= 3 independent reps to surface

function buildIndex() {
  const items = {}
  const add = it => { if (it && it.id) items[it.id] = it }
  ;(instrument.spine?.core || []).forEach(add)
  ;(instrument.spine?.pro || []).forEach(add)
  ;(instrument.spine?.expert || []).forEach(add)
  Object.values(instrument.batteries || {}).forEach(b => (b.items || []).forEach(add))
  Object.values(instrument.addons || {}).forEach(a => (a.items || []).forEach(add))
  const optIndex = {}
  for (const [id, it] of Object.entries(items)) {
    optIndex[id] = {}
    ;(it.options || []).forEach(o => { optIndex[id][o.key] = o })
  }
  return { items, optIndex }
}
const IDX = buildIndex()

const TYPE = { 'BS': 'blind-spot', 'BS+': 'blind-spot', 'CON': 'contradiction', 'MW': 'mis-weight' }
const FINDING_TAGS = new Set(['BS', 'BS+', 'CON', 'MW'])

function optKeysByTag(itemId, tag) {
  const opts = IDX.optIndex[itemId] || {}
  return Object.values(opts).filter(o => o.tag === tag).map(o => o.key)
}
function sumFor(options, persona, itemId, keys) {
  const m = (options[persona] && options[persona][itemId]) || {}
  return keys.reduce((s, k) => s + (m[k] || 0), 0)
}

// CREW-4 gate: if the desk says crew is "almost never" a real segment, suppress crew findings.
function crewNotReal(options) {
  const m = (options.crew && options.crew['CREW-4']) || {}
  const total = Object.values(m).reduce((s, v) => s + v, 0)
  if (total === 0) return false
  const almost = sumFor(options, 'crew', 'CREW-4', optKeysByTag('CREW-4', 'CON')) // "almost never"
  return almost >= total / 2
}

// VIP recognition-vs-discretion contradiction (cross-item, synthesized).
function vipContradiction(options, reps) {
  const disc  = sumFor(options, 'vip', 'VIP-2', optKeysByTag('VIP-2', 'BS'))   // value discretion
  const recog = sumFor(options, 'vip', 'VIP-2', optKeysByTag('VIP-2', 'CF'))   // value recognition
              + sumFor(options, 'vip', 'VIP-4', optKeysByTag('VIP-4', 'CF'))   // "they love it"
  if (disc >= FLOOR && recog >= FLOOR) {
    return {
      itemId: 'VIP-2 · VIP-4', prompt: 'The discretion / recognition tension',
      label: `Your VIPs pull two ways — ${disc} want discretion, ${recog} want to be recognised`,
      tag: 'CON', type: 'contradiction', highValue: true, synthesized: true,
      count: Math.min(disc, recog), reps: reps.vip || 0, share: 0, quotes: [], established: true,
      strength: 'signal',
    }
  }
  return null
}

export function computeFindings(data) {
  const { reps = {}, options = {}, quotes = {} } = data || {}
  const crewGated = crewNotReal(options)
  const personas = {}

  for (const persona of Object.keys(options)) {
    const rep = reps[persona] || 0
    const raw = []

    for (const itemId of Object.keys(options[persona])) {
      const item = IDX.items[itemId]
      if (!item) continue
      const opts = IDX.optIndex[itemId] || {}
      for (const [optKey, count] of Object.entries(options[persona][itemId])) {
        const opt = opts[optKey]
        if (!opt || opt.cfSink || !FINDING_TAGS.has(opt.tag)) continue
        const share = rep ? count / rep : 0
        raw.push({
          itemId, prompt: item.prompt, optionKey: optKey, label: opt.label,
          tag: opt.tag, type: TYPE[opt.tag], highValue: opt.tag === 'BS+',
          count, reps: rep, share,
          established: count >= FLOOR,                    // convergence floor
          strength: share > 0.5 ? 'majority' : 'signal',  // majority as a confidence label
          quotes: (quotes[persona] && quotes[persona][itemId]) || [],
        })
      }
    }

    // gates
    const segmentThin = rep < FLOOR
    const gated = segmentThin || (persona === 'crew' && crewGated)
    const gateReason = segmentThin
      ? `Only ${rep} read${rep === 1 ? '' : 's'} so far — not enough to show findings.`
      : (persona === 'crew' && crewGated ? 'Crew isn\u2019t a recurring guest here — findings withheld.' : null)

    // sort by strength then count
    const bySort = (a, b) => (b.highValue - a.highValue) || (b.count - a.count)
    let established = raw.filter(f => f.established).sort(bySort)
    const forming = raw.filter(f => !f.established).sort(bySort)

    // VIP synthesized contradiction
    if (persona === 'vip' && !gated) {
      const vc = vipContradiction(options, reps)
      if (vc) established = [vc, ...established]
    }

    personas[persona] = { reps: rep, gated, gateReason, established, forming }
  }

  return { personas }
}
