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

## Optional extras

### Signed score submission (Phase 4)

A casual-cheat speed bump — not real anti-cheat. Pick any random string, set
it both as a Worker secret and in the site's meta tag:

```bash
wrangler secret put SCORE_SIGNING_KEY      # paste your random string
```
```html
<meta name="jeo-score-key" content="<the same random string>" />
```

If `SCORE_SIGNING_KEY` is unset the Worker accepts unsigned submissions.

### Daily reminder push (Phase 5)

Opt-in web-push reminders, sent once a day by the Cron trigger in
`wrangler.toml`. Generate VAPID keys and configure them:

```bash
npx web-push generate-vapid-keys          # prints a public + private key
wrangler secret put VAPID_PUBLIC_KEY      # paste the public key
wrangler secret put VAPID_PRIVATE_KEY     # paste the private key
wrangler secret put VAPID_SUBJECT         # optional: mailto:you@example.com
```
```html
<meta name="jeo-vapid-key" content="<the VAPID public key>" />
```

The "🔔 Daily reminders" toggle in Settings → General stays hidden until
both the backend and a VAPID key are configured. Pushes are payload-less
(the notification text lives in `sw.js`).

## CORS

`worker.js` has an `ALLOWED_ORIGINS` array near the top. Add every origin the
site is served from (your custom domain, the GitHub Pages URL, the Azure URL).
Redeploy after editing.

## Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/health` | GET | Liveness probe used by `jeo-backend.js` |
| `/api/play` | POST | Increment a game's global + daily play count |
| `/api/trending` | GET | Top games (`window=24h` or `all`), 60s-cached |
| `/api/presence` | POST/GET | Heartbeat / count of players in a game |
| `/api/leaderboard` | GET | Top scores for a game |
| `/api/score` | POST | Submit a score (rate-limited, bounded, optionally HMAC-signed) |
| `/api/profile` | GET/POST | Read / upsert a shared profile card |
| `/api/push/subscribe` | POST | Register a web-push subscription |
| `/api/push/unsubscribe` | POST | Remove a web-push subscription |

A Cron trigger (`scheduled` handler) sends the daily reminder push.
