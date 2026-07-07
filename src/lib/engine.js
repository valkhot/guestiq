import instrument from '../data/instrument.v4.2.json'

// Index every instrument item + its options (by key) so we can look up gold tags.
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
const FINDING_TAGS = new Set(['BS', 'BS+', 'CON', 'MW']) // CF and null never become findings

// Core synthesis (Increment B). Gates (convergence floor, segment-existence,
// VIP contradiction, small-N) arrive in Increment C.
export function computeFindings(data) {
  const { reps = {}, options = {}, quotes = {} } = data || {}
  const personas = {}

  for (const persona of Object.keys(options)) {
    const rep = reps[persona] || 0
    const findings = []

    for (const itemId of Object.keys(options[persona])) {
      const item = IDX.items[itemId]
      if (!item) continue
      const opts = IDX.optIndex[itemId] || {}

      for (const [optKey, count] of Object.entries(options[persona][itemId])) {
        const opt = opts[optKey]
        if (!opt) continue
        if (opt.cfSink) continue                     // CF-sink suppression (table-stakes)
        if (!FINDING_TAGS.has(opt.tag)) continue     // only BS / BS+ / CON / MW

        findings.push({
          itemId,
          prompt: item.prompt,
          optionKey: optKey,
          label: opt.label,
          tag: opt.tag,
          type: TYPE[opt.tag],
          highValue: opt.tag === 'BS+',
          count,                                      // distinct reps who chose it
          reps: rep,                                  // reps who read this persona
          share: rep ? count / rep : 0,               // for the majority gate (Increment C)
          quotes: (quotes[persona] && quotes[persona][itemId]) || [],
        })
      }
    }

    // high-value first, then by count
    findings.sort((a, b) => (b.highValue - a.highValue) || (b.count - a.count))
    personas[persona] = { reps: rep, findings }
  }

  return { personas }
}
