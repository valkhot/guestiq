-- ============================================================================
-- GuestIQ · Sprint 3 · aggregate-only persona counts (A1)
-- Returns per-persona distinct-respondent counts for COMPLETED reads.
-- Returns COUNTS ONLY — never rows, never names, never free-text.
-- Safe for the anonymous app to call; preserves anonymity by construction.
-- Run in the Supabase SQL Editor. Idempotent.
-- ============================================================================

create or replace function guestiq_persona_counts()
returns table(persona text, reps bigint)
language sql
security definer
set search_path = public
as $$
  select persona, count(distinct respondent_id)::bigint as reps
  from reads
  where completed_at is not null
  group by persona
$$;

grant execute on function guestiq_persona_counts() to anon;

-- ✓ Test: select * from guestiq_persona_counts();  -- returns e.g. business | 3
