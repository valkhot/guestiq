-- ============================================================================
-- GuestIQ · Sprint 1 · Step S1-2 · US-2.2
-- Row-Level Security + anonymous-safe writes
-- Postgres / Supabase · builds on S1-1 schema · Data-Model-and-API v1.2 §6
-- ============================================================================
--
-- The guarantee, in plain terms:
--   • An agent's device (the anon key) may DROP OFF answers, but may NEVER
--     read back anyone's raw answers — not even its own.
--   • Individual responses are readable ONLY by the report engine / Lead
--     Researcher (the service role), never by agent- or GM-facing paths.
--   • Badges expose only what's needed to claim / re-enter — never a name
--     (there is no name anywhere; the badge_id IS the token).
-- ============================================================================

-- 1 · Turn RLS ON for every table (default-deny until a policy allows).
alter table badges       enable row level security;
alter table reads        enable row level security;
alter table responses    enable row level security;
alter table report_cache enable row level security;

-- ⚠ With RLS on and no policy, ALL access is denied. The policies below open
--    only the exact doors the app needs — nothing more.

-- ----------------------------------------------------------------------------
-- 2 · BADGES — the claim / re-entry surface (anon role)
-- ----------------------------------------------------------------------------
-- Read: the app needs to list claimable + claimed badges (to claim / re-enter).
--       This exposes only badge_id / animal / colour / claimed_at — no identity.
create policy badges_read_anon
  on badges for select
  to anon
  using (true);

-- Claim: allow claiming ONLY a badge that is still unclaimed (claim-and-lock).
--        Re-entry (tapping an already-claimed badge) sets session identity in
--        the app WITHOUT an update here — so no UPDATE policy is granted to anon.
create policy badges_claim_anon
  on badges for update
  to anon
  using (claimed_at is null)          -- may only touch an unclaimed badge
  with check (claimed_at is not null); -- and only to mark it claimed
-- ⚠ No DELETE / INSERT for anon: the 12-badge pool is fixed and seeded by us.

-- ----------------------------------------------------------------------------
-- 3 · READS — drop-off only (anon role): INSERT yes, SELECT no
-- ----------------------------------------------------------------------------
create policy reads_insert_anon
  on reads for insert
  to anon
  with check (
    respondent_id is not null                       -- must carry a badge token
    and persona in ('business','early_flight','holiday','cruise',
                    'event','medical','crew','vip','other')
    and depth in ('core','pro','expert')
  );

-- Allow the app to mark its OWN in-flight read complete, but never to read rows.
create policy reads_update_own_completion_anon
  on reads for update
  to anon
  using (completed_at is null)
  with check (true);

-- ⚠ Deliberately NO select policy for anon on reads → the device cannot read
--    back any read, its own or others'. Aggregates come from the engine only.

-- ----------------------------------------------------------------------------
-- 4 · RESPONSES — drop-off only (anon role): INSERT yes, SELECT no
-- ----------------------------------------------------------------------------
create policy responses_insert_anon
  on responses for insert
  to anon
  with check (
    read_id is not null
    and value is not null
  );

-- ⚠ NO select / update / delete for anon on responses. Individual answers are
--    write-once from the device and never returned to it.

-- ----------------------------------------------------------------------------
-- 5 · REPORT_CACHE — no anon access at all
-- ----------------------------------------------------------------------------
-- The report is derived on-open by the researcher/engine context; the anon
-- (agent) role gets no policy here, so RLS denies it entirely.
--   (GM report + Console read via the service role / researcher context.)

-- ----------------------------------------------------------------------------
-- 6 · What this does NOT do (honest limits — carried to the pilot)
-- ----------------------------------------------------------------------------
--   • It cannot stop someone on a shared PC tapping a badge that isn't theirs
--     (re-entry is recognition, not authentication — Data Model §25).
--   • Uniqueness is best-effort; fragmentation/merge both fail CONSERVATIVE
--     (they make the convergence floor harder, never fabricate agreement).
--   • These are mitigations, not guarantees — and we stay transparent about it.
-- ----------------------------------------------------------------------------

-- Next: S1-3 (HUMAN) enable GitHub Pages, then S1-4 the PWA shell.
