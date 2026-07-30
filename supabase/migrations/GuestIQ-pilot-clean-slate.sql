-- ============================================================================
-- GuestIQ · PILOT CLEAN SLATE  ⚠ DESTRUCTIVE — deletes all reads/responses
-- ----------------------------------------------------------------------------
-- Wipes TEST DATA so pilot findings come only from real staff, and frees all
-- badges. Structure, functions, policies, config, and the 12 badge rows survive.
-- Idempotent — safe to run now (dry run) and again at pilot launch.
--
-- ⚠ RUN THE SNAPSHOT (Step 1) FIRST and keep the numbers, so you can confirm
--    the wipe and have a record of what was there.
-- ============================================================================

-- ── STEP 1 · SNAPSHOT (read-only — run this alone first, save the output) ────
select 'reads'        as table, count(*) as rows from reads
union all select 'responses',    count(*) from responses
union all select 'report_opens', count(*) from report_opens
union all select 'app_errors',   count(*) from app_errors
union all select 'badges_claimed', count(*) from badges where claimed_at is not null;


-- ── STEP 2 · THE WIPE (destructive — run after you've saved the snapshot) ────
-- Order matters: responses refs reads (FK), so responses go first.
-- (If reads has ON DELETE CASCADE this is still safe and explicit.)

delete from responses;
delete from reads;

-- Clear the observability/test logs so the pilot starts clean
delete from report_opens;
delete from app_errors;

-- Free every badge for real agents (trigger blocks the app, so disable briefly)
alter table badges disable trigger trg_protect_badge_claim;
update badges set claimed_at = null;
alter table badges enable  trigger trg_protect_badge_claim;

-- Make sure the study is OPEN for the pilot
insert into app_settings(key, value) values ('study_status', 'open')
  on conflict (key) do update set value = 'open';


-- ── STEP 3 · VERIFY (should all read 0 / all badges free / study open) ───────
select 'reads'          as check, count(*)::text as value from reads
union all select 'responses',      count(*)::text from responses
union all select 'report_opens',   count(*)::text from report_opens
union all select 'app_errors',     count(*)::text from app_errors
union all select 'badges_claimed', count(*)::text from badges where claimed_at is not null
union all select 'badges_total',   count(*)::text from badges
union all select 'study_status',   coalesce(max(value),'(unset)') from app_settings where key='study_status';
-- Expect: reads 0 · responses 0 · report_opens 0 · app_errors 0 ·
--         badges_claimed 0 · badges_total 12 · study_status open
