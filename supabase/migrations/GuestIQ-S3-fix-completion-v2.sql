-- ============================================================================
-- GuestIQ · S3 · diagnose + fix read completion (still writing 0 rows as anon)
-- Run in the Supabase SQL Editor. It simulates the EXACT update the app makes,
-- as the anon role, so we see the real result — then hardens the grant/policy.
-- ============================================================================

-- 1) What can anon do on reads right now?
select privilege_type
from information_schema.role_table_grants
where table_name = 'reads' and grantee = 'anon';

-- 2) What UPDATE policies exist on reads?
select policyname, cmd, qual, with_check
from pg_policies
where tablename = 'reads' and cmd in ('UPDATE', 'ALL');

-- 3) Simulate the app's completion write AS anon (this is the real test) --------
--    Pick the most recent NULL business read to target.
do $$
declare tgt uuid;
begin
  select id into tgt from reads
  where persona = 'business' and completed_at is null
  order by started_at desc limit 1;

  if tgt is null then
    raise notice 'No NULL business read to test.';
    return;
  end if;

  -- become the anon role, run the same UPDATE the app runs
  set local role anon;
  update reads set completed_at = now(), depth = 'core' where id = tgt;
  reset role;

  raise notice 'Target read: %', tgt;
end $$;

-- 4) HARDEN: re-grant + re-create a permissive completion policy (belt & braces)
grant update on reads to anon;

drop policy if exists reads_update_own_completion_anon on reads;
drop policy if exists reads_update_completion_anon on reads;

create policy reads_update_completion_anon
  on reads for update
  to anon
  using (true)
  with check (true);

notify pgrst, 'reload schema';

-- 5) Show the outcome: did the anon-simulated update in step 3 stick?
select respondent_id, persona, completed_at
from reads
where persona = 'business'
order by started_at desc
limit 5;
