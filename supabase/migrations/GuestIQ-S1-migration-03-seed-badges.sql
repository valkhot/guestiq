-- ============================================================================
-- GuestIQ · Sprint 1 · seed · the 12 badge coins
-- Run AFTER 01-schema.sql and 02-rls.sql. Seeds the fixed badge pool.
-- Colours are visual only; badge_id is the opaque token (never a name).
-- Source of truth: Design System v2.0 §8 · Full-Badge-Set-v2
-- ============================================================================

insert into badges (badge_id, animal, colour) values
  ('fox',      'Fox',      '#D69A4C'),  -- amber
  ('owl',      'Owl',      '#6E84B0'),  -- slate
  ('bear',     'Bear',     '#C8A24E'),  -- brass
  ('hawk',     'Hawk',     '#B5663F'),  -- rust
  ('wolf',     'Wolf',     '#9AA0AE'),  -- pewter
  ('hedgehog', 'Hedgehog', '#E4D9C2'),  -- ivory
  ('badger',   'Badger',   '#4E8C86'),  -- teal
  ('hare',     'Hare',     '#C77B6B'),  -- clay
  ('boar',     'Boar',     '#8A3A33'),  -- oxblood
  ('lynx',     'Lynx',     '#CBB37E'),  -- sand
  ('ram',      'Ram',      '#8DA67E'),  -- sage
  ('tortoise', 'Tortoise', '#8E6E97')   -- plum
on conflict (badge_id) do nothing;      -- safe to re-run; won't duplicate

-- ✓ Verify: this should return 12.
--   select count(*) from badges;
-- ✓ And all 12 should be claimable (claimed_at is null):
--   select count(*) from badges where claimed_at is null;
