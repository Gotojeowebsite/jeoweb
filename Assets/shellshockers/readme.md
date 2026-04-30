# ShellShockers WebSocket Proxy Setup

## Overview

This project implements an automatic failover WebSocket proxy for ShellShockers (Egg Games) using **Cloudflare Pages Functions**. The proxy intelligently routes player connections through 80+ backend game servers, automatically failing over when servers are blocked or unavailable.

### Why This Exists

Many schools and workplaces block game domains. This proxy:
- Provides a single, stable domain (`shellbros.pages.dev`)
- Automatically tests and connects through unblocked backend servers
- Distributes load across dozens of domains
- Requires zero configuration from users

---

## Architecture

```
Player Client (Browser)
    ↓
wss://shellbros.pages.dev/matchmaker
    ↓
Cloudflare Pages Functions (Edge Network)
    ↓
/functions/matchmaker.js (This Proxy)
    ↓
Tries backends in random order:
    - wss://shellshock.io/matchmaker
    - wss://algebra.best/matchmaker
    - wss://mathgames.world/matchmaker
    - ... (80+ more domains)
    ↓
First successful connection → Returns to player
```

---

## How Cloudflare Pages Functions Work

### Filesystem-Based Routing

Cloudflare Pages uses **convention over configuration**. No routing config needed!

| File Path | Automatically Creates Endpoint |
|-----------|-------------------------------|
| `/functions/matchmaker.js` | `/matchmaker` |
| `/functions/api/users.js` | `/api/users` |
| `/functions/hello.js` | `/hello` |

**The filename IS the route.** That's it.

### Function Format

```javascript
// /functions/matchmaker.js
export async function onRequest(context) {
  const { request, env } = context;
  
  // Your code here
  return new Response('Hello');
}
```

The `onRequest` export handles:
- All HTTP methods (GET, POST, etc.)
- **WebSocket upgrade requests** (our use case)
- Automatic HTTPS/WSS termination
- Edge network execution (fast, global)

---

## The Proxy Logic

### 1. Verify WebSocket Upgrade

```javascript
const upgradeHeader = request.headers.get('Upgrade');
if (!upgradeHeader || upgradeHeader !== 'websocket') {
  return new Response('WebSockets only', { status: 426 });
}
```

Ensures only WebSocket connections are accepted.

### 2. Backend Server List

```javascript
const backends = [
  "shellshock.io",
  "algebra.best",
  "mathgames.world",
  // ... 80+ domains
];
```

All your game server domains. Add/remove as needed.

### 3. Shuffle for Load Distribution

```javascript
const shuffledBackends = shuffleArray([...backends]);
```

Randomizes the order so not everyone hammers the same server first. Prevents hot-spotting.

### 4. Try Backends Until Success

```javascript
for (let i = 0; i < maxAttempts; i++) {
  const backend = shuffledBackends[i];
  
  try {
    const backendUrl = new URL(request.url);
    backendUrl.protocol = 'wss:';
    backendUrl.hostname = backend;
    
    const response = await fetch(backendUrl.toString(), {
      method: request.method,
      headers: request.headers,
      signal: controller.signal, // 3 second timeout
    });
    
    if (response.status === 101) { // WebSocket upgrade success
      return response; // Return connection to client
    }
  } catch (error) {
    continue; // Try next backend
  }
}
```

Attempts up to 10 backends with 3-second timeouts. First success wins.

### 5. Failure Response

If all backends fail:

```json
{
  "error": "SERVICE_UNAVAILABLE",
  "message": "Unable to connect to game servers...",
  "attempts": 10,
  "totalServers": 85,
  "testedServers": ["shellshock.io", "algebra.best", ...]
}
```

Returns HTTP 503 with retry guidance.

---

## Project Structure

```
shellUblocked/
├── functions/
│   └── matchmaker.js          ← WebSocket proxy (auto-routes to /matchmaker)
├── public/                     ← Static assets (HTML, CSS, JS)
│   ├── index.html
│   ├── js/
│   └── styles/
├── app/
│   └── checker.js              ← Domain availability checker
├── README.md                   ← This file
└── wrangler.toml              ← Cloudflare Pages config (optional)
```

### Key Files

- **`functions/matchmaker.js`** - The proxy that handles WebSocket connections
- **`app/checker.js`** - Tests which backend domains are unblocked (client-side)
- **`public/`** - Your game's static files (served directly by Pages)

---

## Deployment

### Prerequisites

1. Cloudflare account (free tier works)
2. GitHub repository (or GitLab/Bitbucket)
3. Domain connected to Cloudflare (optional)

### Steps

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/shellunblocked.git
   git push -u origin main
   ```

2. **Create Cloudflare Pages project**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Pages → Create a project
   - Connect GitHub repo
   - Build settings:
     - Build command: (leave empty)
     - Build output: `/` or `/public`
   - Deploy!

3. **Your function is now live**
   - `https://yourproject.pages.dev/matchmaker` ← WebSocket endpoint
   - Auto-deployed on every git push

### Custom Domain (Optional)

In Cloudflare Pages:
- Custom domains → Add domain
- Enter: `shellbros.pages.dev` or your own domain
- DNS automatically configured

---

## Client-Side Connection

### How Players Connect

```javascript
// Client code (in your game)
const ws = new WebSocket('wss://shellbros.pages.dev/matchmaker');

ws.onopen = () => console.log('Connected to proxy!');
ws.onmessage = (event) => console.log('Game data:', event.data);
```

The proxy is **transparent** - your game doesn't know it's going through a middleman.

### Connection Flow

1. Player browser connects to `wss://shellbros.pages.dev/matchmaker`
2. Cloudflare terminates SSL, routes to `/functions/matchmaker.js`
3. Proxy tries backends: `wss://shellshock.io/matchmaker`, etc.
4. First successful backend connection is returned
5. Player is now connected through the proxy to a working server

---

## Testing Locally

### Using Wrangler (Cloudflare CLI)

```bash
# Install Wrangler
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Run local dev server
wrangler pages dev .

# Your function runs at:
# ws://localhost:8788/matchmaker
```

### Testing WebSocket Connection

```bash
# Using wscat (install: npm i -g wscat)
wscat -c ws://localhost:8788/matchmaker

# Should connect through to a backend server
```

---

## Monitoring & Debugging

### Cloudflare Dashboard

Pages → Your Project → Functions → View Logs

Shows:
- Connection attempts
- Which backends succeeded/failed
- Error messages
- Performance metrics

### Console Logging

The proxy logs:

```
[Proxy] New connection from 203.0.113.42 (US)
[Proxy] Attempt 1/10: shellshock.io/matchmaker
[Proxy] ✗ shellshock.io: Timeout
[Proxy] Attempt 2/10: algebra.best/matchmaker
[Proxy] ✓ Connected to algebra.best
```

View in Cloudflare dashboard or local dev console.

---

## Adding/Removing Backend Servers

### Add a Domain

1. Open `/functions/matchmaker.js`
2. Add to `backends` array:
   ```javascript
   const backends = [
     "shellshock.io",
     "newdomain.com",  // ← Add here
     // ... rest
   ];
   ```
3. Commit and push → auto-deploys

### Remove a Domain

Just delete it from the array. No other changes needed.

---

## Performance Optimization

### Current Settings

- **Max attempts**: 10 backends (not all 80+)
- **Timeout per attempt**: 3 seconds
- **Shuffle algorithm**: Fisher-Yates (O(n) time)
- **Early exit**: Stops on first success

### Tuning

```javascript
// Increase attempts (try more backends)
const maxAttempts = 20; // Default: 10

// Increase timeout (slower connections)
setTimeout(() => controller.abort(), 5000); // Default: 3000

// Disable shuffle (always try in order)
const shuffledBackends = backends; // Remove shuffle
```

---

## Security Considerations

### What This Proxy Does NOT Do

- ❌ Does not decrypt/inspect WebSocket traffic
- ❌ Does not store player data
- ❌ Does not modify game packets
- ❌ Does not authenticate users

### What It Does

- ✅ Forwards WebSocket upgrades transparently
- ✅ Logs IP/country for analytics (optional)
- ✅ Times out stalled connections
- ✅ Provides failover/availability

### IP Logging

```javascript
const ip = request.headers.get('CF-Connecting-IP');
const country = request.headers.get('CF-IPCountry');
```

Cloudflare provides these headers. You can:
- Remove logging (delete console.log lines)
- Send to analytics (implement `logSuccess()` function)
- Use for rate limiting (not currently implemented)

---

## Troubleshooting

### "426 Upgrade Required"

**Problem**: Connecting via HTTP instead of WebSocket

**Solution**: Ensure client uses `wss://` not `https://`

### "503 Service Unavailable"

**Problem**: All backend servers failed

**Causes**:
1. All domains are blocked (rare)
2. Backend servers are down
3. Network issues

**Debug**:
```bash
# Test backends manually
wscat -c wss://shellshock.io/matchmaker
wscat -c wss://algebra.best/matchmaker
```

### "Timeout" Errors

**Problem**: Backend taking >3 seconds to respond

**Solutions**:
- Increase timeout in code
- Remove slow backends from list
- Check backend server health

### Function Not Found

**Problem**: 404 on `/matchmaker` endpoint

**Causes**:
1. File not in `/functions/` directory
2. File not named `matchmaker.js`
3. Deployment failed

**Fix**: Verify file path is exactly `/functions/matchmaker.js`

---

## Advanced: Analytics Integration

### Track Successful Connections

```javascript
function logSuccess(backend, ip, country) {
  // Send to analytics service
  fetch('https://analytics.example.com/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      backend,
      ip,
      country,
      timestamp: Date.now()
    })
  }).catch(() => {}); // Non-blocking
}
```

### Store in KV (Cloudflare Key-Value Storage)

```javascript
export async function onRequest(context) {
  const { request, env } = context;
  
  // Increment counter
  const key = `backend:${backend}:success`;
  const current = await env.ANALYTICS.get(key) || '0';
  await env.ANALYTICS.put(key, String(parseInt(current) + 1));
  
  // ... rest of proxy code
}
```

Requires KV namespace binding in `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "ANALYTICS"
id = "your-kv-namespace-id"
```

---

## Cost Estimate

### Cloudflare Pages (Free Tier)

- ✅ Unlimited requests
- ✅ Unlimited bandwidth
- ✅ Functions execution: **100,000 requests/day**
- ✅ Custom domains: Unlimited

### Paid Tier ($20/month)

- Everything above
- 10 million+ requests/day
- Advanced features (analytics, etc.)

**For most games**: Free tier is sufficient.

---

## FAQ

### Q: Why not use a traditional proxy server?

**A**: Cloudflare Pages Functions run at the **edge** (globally distributed). Traditional proxies:
- Single point of failure
- Require server maintenance
- Cost more
- Slower (not at edge)

### Q: Can this be detected/blocked?

**A**: Yes, but difficult:
- Your Pages domain can be blocked
- Solution: Use multiple Pages projects
- Or use custom domains on Cloudflare

### Q: Does this work with other games?

**A**: Yes! Works with any WebSocket game. Just:
1. Change `backends` array to your game's servers
2. Update client to connect to your Pages URL

### Q: How many players can this handle?

**A**: Cloudflare Pages supports:
- Millions of requests per day (free tier: 100k)
- WebSocket connections are **pass-through** (not held open by proxy)
- Scales automatically

### Q: Can I see which backend is being used?

**A**: Currently no (transparent). You could:
1. Add a custom header in the response
2. Return backend info before upgrade
3. Log on client-side after connection

---

## Contributing

### Reporting Issues

Open an issue with:
- Browser/OS
- Connection error message
- Time of failure (for log lookup)

### Adding Features

Pull requests welcome! Areas to improve:
- Analytics dashboard
- Rate limiting
- Geographic routing (connect to nearest backend)
- Health checks (pre-test backends)

---

## License

MIT License - Use freely, modify as needed.

---

## Credits

**Proxy System**: Cloudflare Pages Functions + WebSocket upgrades  
**Game**: ShellShockers / Blue Wizard Digital  
**Deployment**: Cloudflare Pages  

---

## Quick Reference

### Essential Commands

```bash
# Deploy
git push origin main

# Local dev
wrangler pages dev .

# Test connection
wscat -c wss://shellbros.pages.dev/matchmaker

# View logs
# Cloudflare Dashboard → Pages → Functions → Logs
```

### Key Files

- `/functions/matchmaker.js` - The proxy (routes to `/matchmaker`)
- `/public/index.html` - Game entry point
- `wrangler.toml` - Cloudflare config (optional)

### Backend Management

```javascript
// Add domain
backends.push("newdomain.com");

// Remove domain
backends = backends.filter(b => b !== "olddomain.com");
```

### Environment Variables

Set in Cloudflare Dashboard → Pages → Settings → Environment Variables

```javascript
export async function onRequest(context) {
  const { env } = context;
  const apiKey = env.API_KEY; // Access like this
}
```

---

**Need help?** Check Cloudflare Pages docs: https://developers.cloudflare.com/pages/functions/