import { supabase } from './supabase.js'

// Loads the anonymity-safe findings feed and shapes it for the engine:
//   reps:    { persona: repCount }
//   options: { persona: { item_id: { option_key: reps } } }
//   quotes:  { persona: { item_id: [ "quote", ... ] } }
export async function loadFindingsData(pin) {
  const [countsRes, optionsRes, quotesRes] = await Promise.all([
    supabase.rpc('guestiq_persona_counts'),
    supabase.rpc('guestiq_option_counts', { pin }),
    supabase.rpc('guestiq_quotes', { pin }),
  ])

  const error = countsRes.error || optionsRes.error || quotesRes.error || null

  const reps = {}
  for (const r of countsRes.data || []) reps[r.persona] = Number(r.reps)

  const options = {}
  for (const r of optionsRes.data || []) {
    if (!options[r.persona]) options[r.persona] = {}
    if (!options[r.persona][r.item_id]) options[r.persona][r.item_id] = {}
    options[r.persona][r.item_id][r.option_key] = Number(r.reps)
  }

  const quotes = {}
  for (const r of quotesRes.data || []) {
    if (!quotes[r.persona]) quotes[r.persona] = {}
    if (!quotes[r.persona][r.item_id]) quotes[r.persona][r.item_id] = []
    quotes[r.persona][r.item_id].push(r.quote)
  }

  return { reps, options, quotes, error }
}
