-- ============================================================================
-- GuestIQ · Sprint 5 · PIN gate for the findings feed (no login; PIN-only)
-- The findings functions now REQUIRE the desk PIN as an argument and refuse to
-- return anything without it — so findings aren't reachable with the anon key
-- alone. The constellation's persona-counts stays open (agent app needs it).
-- Run in the Supabase SQL Editor.
--
-- ▶ SET YOUR PIN below (replace 1234 with your chosen desk PIN).
-- ============================================================================

-- PIN check (anon may call it, but it only returns true for the right PIN).
create or replace function guestiq_admin_ok(pin text)
returns boolean
language sql
security definer
set search_path = public
as $$
  select pin = '1234'   -- ◀◀◀ CHANGE 1234 TO YOUR DESK PIN
$$;
grant execute on function guestiq_admin_ok(text) to anon;

-- Replace the open findings functions with PIN-gated versions.
drop function if exists guestiq_option_counts();
create or replace function guestiq_option_counts(pin text)
returns table(persona text, item_id text, option_key text, reps bigint)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select r.persona, resp.item_id, opt.option_key,
           count(distinct r.respondent_id)::bigint
    from responses resp
    join reads r on r.id = resp.read_id
    cross join lateral
      jsonb_array_elements_text(coalesce(resp.value->'keys','[]'::jsonb)) as opt(option_key)
    where r.completed_at is not null
    group by r.persona, resp.item_id, opt.option_key;
end;
$$;
grant execute on function guestiq_option_counts(text) to anon;

drop function if exists guestiq_quotes();
create or replace function guestiq_quotes(pin text)
returns table(persona text, item_id text, quote text)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  return query
    select r.persona, resp.item_id, resp.free_text_example
    from responses resp
    join reads r on r.id = resp.read_id
    where r.completed_at is not null
      and resp.free_text_example is not null
      and length(btrim(resp.free_text_example)) > 0;
end;
$$;
grant execute on function guestiq_quotes(text) to anon;

notify pgrst, 'reload schema';

-- ✓ Verify: wrong PIN errors; right PIN returns data.
-- select * from guestiq_option_counts('wrong');   -- ERROR: unauthorized
-- select * from guestiq_option_counts('1234') where persona='business';  -- rows
