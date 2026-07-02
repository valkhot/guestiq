-- ============================================================================
-- GuestIQ · Sprint 1 · Step S1-1 · US-2.1
-- Reconcile the schema to v4.2 capture (fresh schema; old-model data archived)
-- Postgres / Supabase · no PII · respondent_id = claimed badge token
-- Contract: Data-Model-and-API v1.2 · Questionnaire v4.2 · Architecture v1.1
-- ============================================================================

-- 0 · Archive the old-model tables — do NOT migrate their data.
--     (Data Model v1.2 §159: "fresh schema, old-model data archived not migrated".)
alter table if exists sessions        rename to _archive_sessions_oldmodel;
alter table if exists responses       rename to _archive_responses_oldmodel;
alter table if exists scale_responses rename to _archive_scale_responses_oldmodel;
alter table if exists none_flags       rename to _archive_none_flags_oldmodel;
-- scale_responses + none_flags are intentionally folded into responses.value (jsonb) below.

-- 1 · Badge pool (fixed 12). respondent_id IS the badge token — never a name.
create table badges (
  badge_id   text primary key,        -- opaque token, e.g. 'fox'
  animal     text not null,
  colour     text not null,           -- hex, visual only
  claimed_at timestamptz              -- null = claimable · set = claimed (stays tappable for re-entry)
);

-- 2 · Reads — one per respondent per persona (FR-INST-13; "replay" = a new persona).
create table reads (
  id            uuid primary key default gen_random_uuid(),
  respondent_id text not null references badges(badge_id),
  persona       text not null,        -- L1: business|early_flight|holiday|cruise|event|medical|crew|vip|other
  depth         text not null default 'core' check (depth in ('core','pro','expert')),
  party         text,                 -- L2: solo|family|group
  started_at    timestamptz not null default now(),
  completed_at  timestamptz,
  unique (respondent_id, persona)     -- one read per respondent per persona
);

-- 3 · Responses — one row per answered item. value is type-specific JSON
--     (single | multi:N | rank:2 | scale5 | kano | observer | none/other — all shapes).
create table responses (
  id                uuid primary key default gen_random_uuid(),
  read_id           uuid not null references reads(id) on delete cascade,
  item_id           text not null,
  value             jsonb not null,   -- selected option key(s) / scale / rank / none-flag
  free_text_example text,             -- OPTIONAL verbatim quote — never coded, never themed
  follow_ups        jsonb,            -- SD / OBS / FREQ values (engine observation grading)
  created_at        timestamptz not null default now()
);

-- 4 · Report cache (OPTIONAL). The report is derived on-open, deterministic, client-side
--     (Architecture v1.1) — this row is a cache, never a required server artifact.
create table report_cache (
  id          uuid primary key default gen_random_uuid(),
  computed_at timestamptz not null default now(),
  payload     jsonb not null
);

-- 5 · Index for distinct-respondent counting (Data Model v1.2 §159; SRS FR-RPT-01).
create index idx_reads_persona_respondent on reads (persona, respondent_id);

-- ----------------------------------------------------------------------------
-- Guardrails encoded by SHAPE (not just policy):
--   • No column anywhere links respondent_id to a real identity (Data Model §103).
--   • Instrument config (routing / items / options{key,label,gold_tag,cf_sink}) is
--     JSON content-as-config IN-APP, validated on load — deliberately NOT in the DB.
--   • gold_tag / cf_sink never touch this schema — the agent- and GM-facing paths
--     can't leak them from here.
--   • RLS + anonymous-safe policies are applied next in S1-2 / US-2.2.
-- ----------------------------------------------------------------------------
