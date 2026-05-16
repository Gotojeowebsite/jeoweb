-- Jeoweb backend — Cloudflare D1 (SQLite) schema.
-- Apply with:  wrangler d1 execute jeoweb --file=backend/schema.sql --remote
-- Re-running is safe (all statements are IF NOT EXISTS).

-- All-time play count per game (powers "trending — all time").
CREATE TABLE IF NOT EXISTS play_counts (
  game_slug   TEXT PRIMARY KEY,
  total_plays INTEGER NOT NULL DEFAULT 0,
  updated_at  INTEGER NOT NULL DEFAULT 0
);

-- Per-day play count per game (powers "trending now" = today + yesterday).
CREATE TABLE IF NOT EXISTS daily_counts (
  game_slug TEXT NOT NULL,
  day       TEXT NOT NULL,            -- 'YYYY-MM-DD' (UTC)
  plays     INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (game_slug, day)
);
CREATE INDEX IF NOT EXISTS idx_daily_counts_day ON daily_counts(day);

-- Live presence rows ("X playing now"). One row per (game, player); refreshed
-- by a heartbeat every 2 minutes and considered stale after 3.
CREATE TABLE IF NOT EXISTS presence (
  game_slug TEXT NOT NULL,
  pid       TEXT NOT NULL,
  last_seen INTEGER NOT NULL,         -- epoch ms
  PRIMARY KEY (game_slug, pid)
);
CREATE INDEX IF NOT EXISTS idx_presence_seen ON presence(last_seen);

-- Phase 4: global per-game leaderboards. One row per (game, player) = their
-- personal best (always the MAX score). `kind` is only a display hint:
--   'time'  = ms survived, shown as a duration ("longest run")
--   'score' = raw points
-- Both rank higher = better.
CREATE TABLE IF NOT EXISTS scores (
  game_slug    TEXT NOT NULL,
  pid          TEXT NOT NULL,
  score        INTEGER NOT NULL,
  display_name TEXT,
  kind         TEXT NOT NULL DEFAULT 'score',
  updated_at   INTEGER NOT NULL,
  PRIMARY KEY (game_slug, pid)
);
CREATE INDEX IF NOT EXISTS idx_scores_game ON scores(game_slug, score);

-- Generic rate-limit buckets (per-player score submissions, etc.).
CREATE TABLE IF NOT EXISTS rate_limits (
  rl_key   TEXT PRIMARY KEY,
  count    INTEGER NOT NULL DEFAULT 0,
  reset_at INTEGER NOT NULL          -- epoch ms; row is reset once past this
);

-- Global per-game ratings (one row per game+player = their current rating).
CREATE TABLE IF NOT EXISTS ratings (
  game_slug    TEXT NOT NULL,
  pid          TEXT NOT NULL,
  stars        INTEGER NOT NULL,         -- 1..5
  updated_at   INTEGER NOT NULL,
  PRIMARY KEY (game_slug, pid)
);
CREATE INDEX IF NOT EXISTS idx_ratings_game ON ratings(game_slug);

-- Phase 5: optional shared profile cards. One row per anonymous player.
CREATE TABLE IF NOT EXISTS players (
  pid          TEXT PRIMARY KEY,
  display_name TEXT,
  created_at   INTEGER NOT NULL,
  updated_at   INTEGER NOT NULL
);

-- Phase 5: web-push subscriptions for opt-in daily reminders. One row per
-- browser/device (keyed on the push endpoint). fail_count lets the Cron job
-- prune endpoints that have gone dead (HTTP 404/410).
CREATE TABLE IF NOT EXISTS push_subscriptions (
  endpoint   TEXT PRIMARY KEY,
  pid        TEXT NOT NULL,
  p256dh     TEXT,
  auth       TEXT,
  created_at INTEGER NOT NULL,
  fail_count INTEGER NOT NULL DEFAULT 0
);

-- Optional cloud save sync. Payload is an opaque base64 string: the client
-- AES-GCM-encrypts the save before sending, so the server only sees
-- ciphertext (the key lives on the client + in the account .jeo blob).
-- Slot label encodes kind + timestamp ("manual-1779394...") so different
-- saves from different devices don't collide.
CREATE TABLE IF NOT EXISTS saves (
  pid          TEXT NOT NULL,
  game_slug    TEXT NOT NULL,
  slot_label   TEXT NOT NULL,
  payload      TEXT NOT NULL,           -- base64(iv || ciphertext)
  updated_at   INTEGER NOT NULL,
  PRIMARY KEY (pid, game_slug, slot_label)
);
CREATE INDEX IF NOT EXISTS idx_saves_pid_game ON saves(pid, game_slug);
