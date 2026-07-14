// Renders the RosaeNLG-compiled template. The compiled fn needs a `util` (NlgLib)
// runtime passed in locals; resources are embedded in the compiled module.
import renderStoryTemplate from './storyCompiled.js'

let NlgLibCtor = null
let loadTried = false

// Lazy-load the runtime so a failure here never breaks the app / end-of-read.
async function getNlgLib() {
  if (NlgLibCtor || loadTried) return NlgLibCtor
  loadTried = true
  try {
    const mod = await import('rosaenlg')
    NlgLibCtor = mod.NlgLib || (mod.default && mod.default.NlgLib) || null
  } catch (e) {
    console.warn('[GuestIQ] RosaeNLG runtime unavailable:', e && e.message)
    NlgLibCtor = null
  }
  return NlgLibCtor
}

// Returns the rendered story string, or null if RosaeNLG can't render (→ caller falls back).
export async function renderStory(params) {
  try {
    const Ctor = await getNlgLib()
    if (!Ctor || typeof renderStoryTemplate !== 'function') return null
    const util = new Ctor({ language: 'en_US' })
    const locals = { util, ...params }
    const html = renderStoryTemplate(locals)
    // strip any tags → plain text for the dossier
    const text = String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
    return text || null
  } catch (e) {
    console.warn('[GuestIQ] story render failed:', e && e.message)
    return null
  }
}
