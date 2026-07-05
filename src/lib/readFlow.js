import instrument from '../data/instrument.v4.2.json'

export function buildCoreQuestions(personaKey) {
  const core = instrument.spine?.core || []
  const battery = (instrument.batteries?.[personaKey]?.items || []).filter(it => it.depth === 'core')
  return [...core, ...battery]
}

export function buildDeepQuestions(personaKey) {
  const pro = instrument.spine?.pro || []
  const expert = instrument.spine?.expert || []
  const battery = (instrument.batteries?.[personaKey]?.items || []).filter(it => it.depth === 'pro' || it.depth === 'expert')
  const batteryPro = battery.filter(it => it.depth === 'pro')
  const batteryExpert = battery.filter(it => it.depth === 'expert')
  return [...pro, ...batteryPro, ...expert, ...batteryExpert]
}

export function personaLabel(personaKey) {
  const opt = instrument.routing?.L1?.options?.find(o => o.key === personaKey)
  return opt ? opt.label : personaKey
}

export const grounding = instrument.routing?.L1?.grounding || ''
export const personas = instrument.routing?.L1?.options || []

// Deterministic 128-bit hash (cyrb128) → a stable UUID.
// Same input always yields the same id, so a given badge+persona maps to ONE read.
function cyrb128(str) {
  let h1 = 1779033703, h2 = 3144134277, h3 = 1013904242, h4 = 2773480762
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i)
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067)
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233)
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213)
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179)
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067)
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233)
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213)
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179)
  return [h1 >>> 0, h2 >>> 0, h3 >>> 0, h4 >>> 0]
}

export function readIdFor(badgeId, personaKey) {
  const [a, b, c, d] = cyrb128(`${badgeId}:${personaKey}`)
  const hex = n => ('00000000' + n.toString(16)).slice(-8)
  const h = hex(a) + hex(b) + hex(c) + hex(d) // 32 hex chars
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-4${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`
}
