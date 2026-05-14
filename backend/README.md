# Jeoweb backend (Cloudflare Worker)

A tiny, free-tier serverless backend that adds **global** features to the
otherwise 100%-static Jeoweb site: play counts, "trending now", and live
"X playing now" presence. Phases 4 & 5 extend it with leaderboards and
opt-in web-push.

**The site works fine without this.** `jeo-backend.js` degrades gracefully —
if the Worker isn't deployed (or is unreachable), every backend-powered UI
element simply hides and the site behaves exactly as it did before.

## What it costs

Nothing, within Cloudflare's free tier: 100k Worker requests/day and a D1
database with ~5 GB storage + ~100k writes/day. No KV is used (its 1k
writes/day cap is too low for presence heartbeats).

## One-time deploy

You need a free Cloudflare account and the `wrangler` CLI
(`npm install -g wrangler`, then `wrangler login`).

```bash
cd backend

# 1. Create the D1 database, then paste the printed database_id into
#    wrangler.toml (the database_id = "REPLACE_WITH_YOUR_D1_DATABASE_ID" line).
wrangler d1 create jeoweb

# 2. Create the tables.
wrangler d1 execute jeoweb --file=schema.sql --remote

# 3. Deploy the Worker.
wrangler deploy
```

`wrangler deploy` prints the Worker URL, e.g.
`https://jeoweb-backend.<your-subdomain>.workers.dev`.

## Connect the frontend

Edit `index.html` and set the backend meta tag to your Worker URL:

```html
<meta name="jeo-backend" content="https://jeoweb-backend.<your-subdomain>.workers.dev" />
```

That's it. Reload the site — the "Trending Now" row and presence badges
appear once there's data. (For a quick local test you can instead run
`localStorage.setItem('jeo:backendUrl', '<worker-url>')` in the console.)

## CORS

`worker.js` has an `ALLOWED_ORIGINS` array near the top. Add every origin the
site is served from (your custom domain, the GitHub Pages URL, the Azure URL).
Redeploy after editing.

## Routes (Phase 3)

| Route | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Liveness probe used by `jeo-backend.js` |
| `/api/play` | POST | Increment a game's global + daily play count |
| `/api/trending` | GET | Top games (`window=24h` or `all`), 60s-cached |
| `/api/presence` | POST | Heartbeat — mark a player as in a game |
| `/api/presence` | GET | Count of players currently in a game |
