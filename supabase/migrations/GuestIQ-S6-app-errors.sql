-- ============================================================================
-- GuestIQ · Sprint 6 · Console Lens 04 — App health (self-contained error log)
-- App writes caught errors here (anon, message only — no PII); Console reads
-- back count + recent messages (PIN-gated). Sentry remains the deep tool.
-- Run once in the Supabase SQL Editor.
-- ============================================================================

create table if not exists app_errors (
  id bigint generated always as identity primary key,
  occurred_at timestamptz not null default now(),
  message text not null,
  context text
);
alter table app_errors enable row level security;  -- only the SECURITY DEFINER fns reach it

-- WRITE: log one error (anon — errors can happen before/without admin).
-- Message is truncated defensively; never store PII in message/context.
create or replace function guestiq_log_error(msg text, ctx text default null)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  insert into app_errors(message, context)
  values (left(coalesce(msg, 'unknown'), 500), left(ctx, 500));
end;
$$;
grant execute on function guestiq_log_error(text, text) to anon;

-- READ: health summary + recent messages (PIN-gated).
create or replace function guestiq_app_health(pin text)
returns table(total bigint, last_24h bigint, last_error timestamptz)
language plpgsql security definer set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select count(*)::bigint,
           count(*) filter (where occurred_at > now() - interval '24 hours')::bigint,
           max(occurred_at)
    from app_errors;
end;
$$;
grant execute on function guestiq_app_health(text) to anon;

create or replace function guestiq_recent_errors(pin text)
returns table(occurred_at timestamptz, message text)
language plpgsql security definer set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select occurred_at, message from app_errors
    order by occurred_at desc limit 8;
end;
$$;
grant execute on function guestiq_recent_errors(text) to anon;

notify pgrst, 'reload schema';

-- ✓ select guestiq_log_error('test error', 'manual'); select * from guestiq_app_health('YOUR_PIN');
