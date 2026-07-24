-- ============================================================================
-- GuestIQ · FIX · Console Lens 04 returning 400
-- Cause: `returns table(occurred_at, message)` creates OUT parameters with the
-- same names as app_errors' columns → "column reference is ambiguous" → 400.
-- Fix: alias the table so every reference is unambiguous.
-- Run once in the Supabase SQL Editor.
-- ============================================================================

create or replace function guestiq_recent_errors(pin text)
returns table(occurred_at timestamptz, message text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select e.occurred_at, e.message
    from app_errors e
    order by e.occurred_at desc
    limit 8;
end;
$$;
grant execute on function guestiq_recent_errors(text) to anon;

-- Same defensive alias on the health summary (harmless if it was already fine).
create or replace function guestiq_app_health(pin text)
returns table(total bigint, last_24h bigint, last_error timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select count(*)::bigint,
           count(*) filter (where e.occurred_at > now() - interval '24 hours')::bigint,
           max(e.occurred_at)
    from app_errors e;
end;
$$;
grant execute on function guestiq_app_health(text) to anon;

notify pgrst, 'reload schema';

-- ✓ verify (use your real desk PIN):
--   select * from guestiq_recent_errors('YOUR_PIN');
--   select * from guestiq_app_health('YOUR_PIN');
