-- ============================================================================
-- GuestIQ · Sprint 6 · Console Lens 05 — GM activity (report open-log)
-- Records each GM Findings Report open; Console reads back count + last-opened.
-- Aggregate/log only — no PII. Run once in the Supabase SQL Editor.
-- ============================================================================

create table if not exists report_opens (
  id bigint generated always as identity primary key,
  opened_at timestamptz not null default now()
);
alter table report_opens enable row level security;  -- only the SECURITY DEFINER fns reach it

-- WRITE: log one open (PIN-gated — only a validated admin session can log).
create or replace function guestiq_log_report_open(pin text)
returns void
language plpgsql security definer set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  insert into report_opens default values;
end;
$$;
grant execute on function guestiq_log_report_open(text) to anon;

-- READ: opens count + last-opened (PIN-gated).
create or replace function guestiq_report_activity(pin text)
returns table(opens bigint, last_opened timestamptz)
language plpgsql security definer set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query select count(*)::bigint, max(opened_at) from report_opens;
end;
$$;
grant execute on function guestiq_report_activity(text) to anon;

notify pgrst, 'reload schema';

-- ✓ select * from guestiq_report_activity('YOUR_PIN');
