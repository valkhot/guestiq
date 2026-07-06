-- ============================================================================
-- GuestIQ · S3 · aggregate persona counts — re-apply + expose to the API
-- Run in the Supabase SQL Editor.
--
-- Why: the end-of-read constellation reads its count from this function. If
-- the function isn't present OR isn't in the API schema cache, the app falls
-- back to "first on record" for everyone. This re-creates it, grants access,
-- forces the API to reload, and prints the current counts so you can see them.
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

-- Force PostgREST (the API) to reload its schema so the function is callable now.
notify pgrst, 'reload schema';

-- ✓ Verify — this should return one row per persona with a completed read.
--   If Business shows reps > 1, the data is there; the constellation will show it.
select * from guestiq_persona_counts();
