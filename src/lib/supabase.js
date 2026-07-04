import { createClient } from '@supabase/supabase-js'

// ── Your Supabase values ──────────────────────────────────────────────
// Get these from: Supabase dashboard → your project → Settings (gear) → API
//   • Project URL      → paste over PASTE_YOUR_PROJECT_URL_HERE
//   • Project API key "anon public" → paste over PASTE_YOUR_ANON_PUBLIC_KEY_HERE
// The anon key is SAFE to be public — it only works within your row-level
// security rules. (Never paste the "service_role" key here — that one is secret.)
const SUPABASE_URL = 'https://nxuqbtfteljavqgrmwfh.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54dXFidGZ0ZWxqYXZxZ3Jtd2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NDY1NjUsImV4cCI6MjA5MzMyMjU2NX0.4G2gzJKwEi2QYsEO_jzY7PArvg4AAvYmhELkioI_180'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
