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

-- Phases 4 & 5 add: scores, players, push_subscriptions.
-- Those CREATE TABLE statements will be appended here when those phases land.
