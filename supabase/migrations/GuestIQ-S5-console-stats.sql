-- ============================================================================
-- GuestIQ · Sprint 5 · Console Pass 1 data (PIN-gated)
-- Extends study stats with started/deep counts (for completion + depth-opt-in
-- rates) and adds per-badge agent activity. Run in the Supabase SQL Editor.
-- ============================================================================

-- study stats (drop first — return type changes)
drop function if exists guestiq_study_stats(text);
create or replace function guestiq_study_stats(pin text)
returns table(started_reads bigint, completed_reads bigint, deep_reads bigint,
              distinct_agents bigint, guest_types bigint)
language plpgsql security definer set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select count(*)::bigint,
           count(completed_at)::bigint,
           count(*) filter (where completed_at is not null and depth = 'expert')::bigint,
           count(distinct respondent_id) filter (where completed_at is not null)::bigint,
           count(distinct persona) filter (where completed_at is not null)::bigint
    from reads;
end;
$$;
grant execute on function guestiq_study_stats(text) to anon;

-- per-badge agent activity (badge token = anonymous identity)
create or replace function guestiq_agent_activity(pin text)
returns table(agent text, reads bigint)
language plpgsql security definer set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select respondent_id, count(*)::bigint
    from reads where completed_at is not null
    group by respondent_id order by count(*) desc;
end;
$$;
grant execute on function guestiq_agent_activity(text) to anon;

notify pgrst, 'reload schema';
