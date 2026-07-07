-- ============================================================================
-- GuestIQ · Sprint 4 · findings-data feed (A1) — counts + quotes ONLY
-- Returns aggregate signal for the engine. Never returns raw rows, never who
-- answered what, never names. Completed reads only. Run in the SQL Editor.
-- ============================================================================

-- 1) Option counts: how many DISTINCT reps chose each option, per persona+item.
--    Covers single / observer / multi (value has a "keys" array). This is the
--    signal the gold-tag findings are built from.
create or replace function guestiq_option_counts()
returns table(persona text, item_id text, option_key text, reps bigint)
language sql
security definer
set search_path = public
as $$
  select r.persona, resp.item_id, opt.option_key,
         count(distinct r.respondent_id)::bigint as reps
  from responses resp
  join reads r on r.id = resp.read_id
  cross join lateral
    jsonb_array_elements_text(coalesce(resp.value->'keys', '[]'::jsonb)) as opt(option_key)
  where r.completed_at is not null
  group by r.persona, resp.item_id, opt.option_key
$$;
grant execute on function guestiq_option_counts() to anon;

-- 2) Quote pool: the agents' own words (free-text), per persona+item.
--    Verbatim, no names attached — the "quote" half of count-or-quote.
create or replace function guestiq_quotes()
returns table(persona text, item_id text, quote text)
language sql
security definer
set search_path = public
as $$
  select r.persona, resp.item_id, resp.free_text_example
  from responses resp
  join reads r on r.id = resp.read_id
  where r.completed_at is not null
    and resp.free_text_example is not null
    and length(btrim(resp.free_text_example)) > 0
$$;
grant execute on function guestiq_quotes() to anon;

-- (reps-per-persona already exists: guestiq_persona_counts())

-- Expose the new functions to the API immediately.
notify pgrst, 'reload schema';

-- ✓ Verify — you should see honest aggregate counts (never raw rows):
select * from guestiq_option_counts() where persona = 'business' order by item_id, reps desc;
-- and the quote pool:
select * from guestiq_quotes() where persona = 'business';
