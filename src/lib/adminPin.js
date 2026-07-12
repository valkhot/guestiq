import { supabase } from './supabase.js'
const KEY = 'guestiq_admin_pin'

export function getPin() { try { return sessionStorage.getItem(KEY) || '' } catch (e) { return '' } }
export function setPin(pin) { try { sessionStorage.setItem(KEY, pin) } catch (e) { /* ignore */ } }
export function clearPin() { try { sessionStorage.removeItem(KEY) } catch (e) { /* ignore */ } }

export async function checkPin(pin) {
  const { data, error } = await supabase.rpc('guestiq_admin_ok', { pin })
  return !error && data === true
}

// Lock: clear the PIN and return to the (discreet) agent app.
export function lockAdmin() {
  clearPin()
  try {
    const u = new URL(window.location.href)
    u.searchParams.delete('view')
    window.location.replace(u.toString())
  } catch (e) { window.location.replace(window.location.pathname) }
}
