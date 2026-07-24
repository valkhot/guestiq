-- ============================================================================
-- GuestIQ · Sprint 6 · FIX — complete a read via SECURITY DEFINER function
-- Direct anon UPDATEs on `reads` have silently failed since Sprint 2 (policy,
-- grants and triggers all check out, yet 0 rows change). Every SECURITY DEFINER
-- RPC in this project works reliably — so completion becomes one too.
-- Run once in the Supabase SQL Editor.
-- ============================================================================

create or replace function guestiq_complete_read(
  p_respondent_id text,
  p_persona       text,
  p_depth         text
)
returns table(completed integer)
language plpgsql
security definer
set search_path = public
as $$
declare n integer;
begin
  if p_depth not in ('core','pro','expert') then
    raise exception 'invalid depth: %', p_depth;
  end if;

  update reads
     set completed_at = coalesce(completed_at, now()),
         depth        = p_depth
   where respondent_id = p_respondent_id
     and persona       = p_persona;

  get diagnostics n = row_count;
  return query select n;      -- how many rows we actually completed
end;
$$;

grant execute on function guestiq_complete_read(text, text, text) to anon;
notify pgrst, 'reload schema';

-- ✓ test (should return 1 for an existing uncompleted read):
--   select * from guestiq_complete_read('hare', 'other', 'core');
--   select respondent_id, persona, completed_at from reads where persona='other';
