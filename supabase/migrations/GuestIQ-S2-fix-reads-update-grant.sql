-- ============================================================================
-- GuestIQ · fix v2 · read completion (silent 0-row no-op on UPDATE)
-- Run in the Supabase SQL Editor. Safe & idempotent. Supersedes fix v1.
--
-- Finding: completing a read matched the right row by id, returned NO error,
-- yet changed 0 rows. That pattern = the anon role can INSERT into `reads`
-- but was never granted UPDATE, so the update silently affects nothing.
--
-- Fix: (1) grant anon UPDATE on reads, (2) a clean permissive completion
-- policy, (3) also fix any reads already finished in-app but left NULL.
-- ============================================================================

-- 1) Grant the missing privilege.
grant update on reads to anon;

-- 2) Clean, permissive completion policy (drop any prior versions first).
drop policy if exists reads_update_own_completion_anon on reads;
drop policy if exists reads_update_completion_anon on reads;

create policy reads_update_completion_anon
  on reads for update
  to anon
  using (true)
  with check (true);

-- 3) Backfill: reads that have answers but were never stamped complete.
--    (Marks any read that has at least one response and no completed_at.)
update reads r
set completed_at = coalesce(r.completed_at, now())
where r.completed_at is null
  and exists (select 1 from responses x where x.read_id = r.id);

-- ✓ After this: completing a read in the app will stamp completed_at + depth,
--   and previously-answered reads are marked complete.
