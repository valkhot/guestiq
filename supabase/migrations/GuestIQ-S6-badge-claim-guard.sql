-- ============================================================================
-- GuestIQ · Sprint 6 · QA fix — badge claim guard (defence in depth)
-- The app now prevents claiming a taken badge, but the DB should be the real
-- guard: block any UPDATE that would overwrite an existing claim.
-- Run once in the Supabase SQL Editor.
-- ============================================================================

create or replace function guestiq_protect_badge_claim()
returns trigger
language plpgsql
as $$
begin
  -- Once claimed, a badge's claim can never be overwritten or cleared by the app.
  if OLD.claimed_at is not null and NEW.claimed_at is distinct from OLD.claimed_at then
    raise exception 'badge already claimed';
  end if;
  return NEW;
end;
$$;

drop trigger if exists trg_protect_badge_claim on badges;
create trigger trg_protect_badge_claim
  before update on badges
  for each row execute function guestiq_protect_badge_claim();

notify pgrst, 'reload schema';

-- ✓ Verify: claiming an already-claimed badge should now raise 'badge already claimed'.
-- (Admin/SQL can still reset a badge by disabling the trigger if ever needed:
--   alter table badges disable trigger trg_protect_badge_claim;  -- ...reset...  then enable)
