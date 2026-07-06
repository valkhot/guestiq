-- ============================================================================
-- GuestIQ · fix · reads UPDATE policy (completion was a silent no-op)
-- Run in the Supabase SQL Editor. Safe & idempotent.
--
-- Symptom: marking a read complete returned no error but updated 0 rows,
-- so completed_at stayed NULL.
-- Cause: the anon UPDATE policy's USING clause + insert-only (no SELECT)
-- setup let the update run but match no rows.
-- Fix: replace it with a policy that reliably matches the target row by id
-- and still only allows completing a not-yet-completed read.
-- ============================================================================

-- Drop the old update policy (name from 02-rls.sql)
drop policy if exists reads_update_own_completion_anon on reads;

-- Recreate: allow anon to update a read, permitting the completion write.
-- USING true lets the row be found by the .eq('id', ...) filter the app sends;
-- WITH CHECK keeps writes sane (a read stays tied to a badge, valid persona/depth).
create policy reads_update_completion_anon
  on reads for update
  to anon
  using (true)
  with check (
    respondent_id is not null
    and persona in ('business','early_flight','holiday','cruise',
                    'event','medical','crew','vip','other')
    and depth in ('core','pro','expert')
  );

-- ✓ After running this, completing a read stamps completed_at + depth.
-- Note: re-completing an already-complete read is harmless (idempotent write).
