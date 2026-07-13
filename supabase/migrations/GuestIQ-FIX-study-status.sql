-- ============================================================================
-- GuestIQ · FIX · create the missing study-status functions
-- (guestiq_study_status + guestiq_set_study_status were never created →
--  app gets 404 on guestiq_study_status). Self-contained. Run once.
-- ============================================================================

-- settings store (safe if it already exists)
create table if not exists app_settings (
  key text primary key,
  value text not null,
  updated_at timestamptz default now()
);
alter table app_settings enable row level security;  -- only the SECURITY DEFINER fns below reach it
insert into app_settings(key, value) values ('study_status', 'open')
  on conflict (key) do nothing;

-- READ status (anon: agent app + console)
create or replace function guestiq_study_status()
returns text
language sql security definer set search_path = public
as $$
  select coalesce((select value from app_settings where key = 'study_status'), 'open')
$$;
grant execute on function guestiq_study_status() to anon;

-- SET status (PIN-gated)
create or replace function guestiq_set_study_status(pin text, new_status text)
returns text
language plpgsql security definer set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  if new_status not in ('open','closed') then raise exception 'invalid status'; end if;
  insert into app_settings(key, value, updated_at) values ('study_status', new_status, now())
    on conflict (key) do update set value = excluded.value, updated_at = now();
  return new_status;
end;
$$;
grant execute on function guestiq_set_study_status(text, text) to anon;

notify pgrst, 'reload schema';

-- ✓ verify both now exist:
-- select proname from pg_proc where proname in ('guestiq_study_status','guestiq_set_study_status');
