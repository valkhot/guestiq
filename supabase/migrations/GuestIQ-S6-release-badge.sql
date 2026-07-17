-- ============================================================================
-- GuestIQ · Sprint 6 · Release a badge from the Console (PIN-gated)
-- Lets the researcher free a badge when an agent loses theirs (cleared browser,
-- new device) — without which that agent would take a SECOND badge and quietly
-- split one human into two identities.
-- The claim-guard still blocks the agent app; only an admin release may pass.
-- Run once in the Supabase SQL Editor.
-- ============================================================================

-- 1) Teach the guard to allow a deliberate admin release (transaction-local flag).
create or replace function guestiq_protect_badge_claim()
returns trigger
language plpgsql
as $$
begin
  if coalesce(current_setting('guestiq.allow_release', true), 'off') = 'on' then
    return NEW;                                   -- admin release in progress
  end if;
  if OLD.claimed_at is not null and NEW.claimed_at is distinct from OLD.claimed_at then
    raise exception 'badge already claimed';      -- app can never overwrite a claim
  end if;
  return NEW;
end;
$$;

-- 2) The release itself — PIN-gated.
create or replace function guestiq_release_badge(pin text, p_badge_id text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare v_animal text;
begin
  if not guestiq_admin_ok(pin) then raise exception 'unauthorized'; end if;
  perform set_config('guestiq.allow_release', 'on', true);  -- local to this transaction
  update badges set claimed_at = null
   where badge_id = p_badge_id
   returning animal into v_animal;
  if v_animal is null then raise exception 'no such badge'; end if;
  return v_animal;
end;
$$;
grant execute on function guestiq_release_badge(text, text) to anon;

notify pgrst, 'reload schema';

-- ✓ select guestiq_release_badge('YOUR_PIN', 'wolf');
