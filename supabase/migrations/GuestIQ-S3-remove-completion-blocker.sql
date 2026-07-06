-- ============================================================================
-- GuestIQ · S3 · find & remove whatever is wiping completed_at on reads
-- An admin UPDATE could not set completed_at → a trigger (or default/rule) is
-- overriding it. This lists them, shows the column default, then clears them.
-- Run block by block; read the notices.
-- ============================================================================

-- 1) List NON-internal triggers on reads (this is the prime suspect)
select tgname,
       case tgenabled when 'O' then 'enabled' when 'D' then 'disabled' else tgenabled end as state,
       pg_get_triggerdef(oid) as definition
from pg_trigger
where tgrelid = 'public.reads'::regclass and not tgisinternal;

-- 2) Show the column definition of completed_at (is there a weird default?)
select column_name, data_type, column_default, is_generated, generation_expression
from information_schema.columns
where table_name = 'reads' and column_name in ('completed_at','depth');

-- 3) Any RULES on reads? (a rewrite rule could also swallow the update)
select rulename, definition
from pg_rules
where schemaname = 'public' and tablename = 'reads';

-- 4) REMOVE any non-internal trigger found in step 1.
--    (Auto-drops each; safe — reads has no legitimate app trigger.)
do $$
declare t record;
begin
  for t in
    select tgname from pg_trigger
    where tgrelid = 'public.reads'::regclass and not tgisinternal
  loop
    execute format('drop trigger if exists %I on public.reads', t.tgname);
    raise notice 'dropped trigger: %', t.tgname;
  end loop;
end $$;

-- 5) VERIFY — try the admin update again; completed_at should now FILL.
update reads set completed_at = now()
where persona = 'business' and completed_at is null
returning respondent_id, completed_at;
