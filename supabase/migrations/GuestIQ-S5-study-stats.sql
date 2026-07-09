-- ============================================================================
-- GuestIQ · Sprint 5 · study stats for the Researcher Console (PIN-gated)
-- Aggregate only: completed reads, distinct agents, distinct guest types.
-- Run in the Supabase SQL Editor.
-- ============================================================================
create or replace function guestiq_study_stats(pin text)
returns table(completed_reads bigint, distinct_agents bigint, guest_types bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select count(*)::bigint,
           count(distinct respondent_id)::bigint,
           count(distinct persona)::bigint
    from reads
    where completed_at is not null;
end;
$$;
grant execute on function guestiq_study_stats(text) to anon;
notify pgrst, 'reload schema';

-- ✓ select * from guestiq_study_stats('YOUR_PIN');
