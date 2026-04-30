export async function handleProxyRequest(context, label = "Proxy") {
	const { request, env } = context;
	const reqUrl = new URL(request.url);
  
	const userAgent = request.headers.get("User-Agent");
	const hostHeader = request.headers.get("Host") || "";
	const isGitHubHost = hostHeader.endsWith("github.io");
	console.log('isGitHubHost', isGitHubHost);
	if (!userAgent) {
	  console.log(`[${label}] Blocked: No User-Agent`);
	  return new Response("Forbidden", { status: 403 });
	}
  
	if (/bot|crawler|spider|scraper/i.test(userAgent)) {
	  console.log(`[${label}] Blocked: Bot User-Agent`);
	  return new Response("Forbidden", { status: 403 });
	}
  
	// (unchanged) route detection
	let routePath = '/matchmaker/';
	if (reqUrl.pathname.startsWith('/services')) routePath = '/services/';
	else if (reqUrl.pathname.startsWith('/game/')) routePath = reqUrl.pathname;
  
	const isTransactional = routePath === '/services/';
	const attachToken = true;
  
	console.log(`[${label}] Request to:`, request.url);
	if (!env.HMAC_SECRET) return new Response("Server misconfigured", { status: 500 });
  
	const upgradeHeader = request.headers.get("Upgrade");
	const clientProtoHeader = request.headers.get("sec-websocket-protocol") || "";
	const clientProtocols = clientProtoHeader.split(",").map(s => s.trim()).filter(Boolean);
	const selectedClientProto = clientProtocols[0] || null;
	if (upgradeHeader !== "websocket") return new Response("Expected WebSocket", { status: 426 });
  
	const clientIP = request.headers.get("CF-Connecting-IP");
	const country = request.headers.get("CF-IPCountry") || "unknown";
	if (!clientIP) return new Response("Unable to determine client IP", { status: 500 });
  
	function parseCookies(header) {
	  return (header || '').split(';').reduce((acc, part) => {
		const i = part.indexOf('=');
		if (i === -1) return acc;
		const k = part.slice(0, i).trim();
		const v = part.slice(i + 1).trim();
		if (k) acc[k] = v;
		return acc;
	  }, {});
	}
  
	const cookies = parseCookies(request.headers.get('Cookie'));
  
	const normalizeHost = (h) => {
	  if (!h) return '';
	  let s = String(h).trim();
	  s = s.replace(/^[a-z]+:\/\//i, '');
	  s = s.replace(/[/?#].*$/, '');
	  s = s.replace(/:\d+$/, '');
	  return s;
	};
  
	// NEW: Treat game routes specially with respect to the cookie
	const isGameRoute = routePath.startsWith('/game/');
  
	const forcedUp = normalizeHost(reqUrl.searchParams.get('up'));
  
	// CHANGE 1: For /game/ routes, ignore ws_upstream entirely when choosing backend
	const cookieUp = isGameRoute ? '' : normalizeHost(cookies['ws_upstream']);
  
	// CONTROL allowlist stays dev-only; we *don’t* include shellshock.io here
	const allowlist = [
	  "shellshock.io",
	  "algebra.best",
	  "algebra.vip",
	  "algebra.monster",
	  "biologyclass.club",
	  "combateggs.com",
	  "deadlyegg.com",
	  "deathegg.life",
	  "deathegg.world",
	  "egg.dance",
	  "eggbattle.com",
	  "eggboy.club",
	  "eggcombat.com",
	  "eggfacts.fun",
	  "egggames.best",
	  "egghead.institute",
	  "eggisthenewblack.com",
	  "eggsarecool.com",
	  "eggshock.com",
	  "eggshock.me",
	  "eggshock.net",
	  "eggshooter.best",
	  "eggshooter.com",
	  "eggtown.org",
	  "eggwarfare.com",
	  "eggwars.io",
	  "geometry.best",
	  "geometry.monster",
	  "geometry.pw",
	  "geometry.report",
	  "hardboiled.life",
	  "hardshell.life",
	  "historicreview.com",
	  "humanorganising.org",
	  "mathactivity.club",
	  "mathactivity.xyz",
	  "mathdrills.info",
	  "mathdrills.life",
	  "mathfun.rocks",
	  "mathgames.world",
	  "math.international",
	  "mathlete.fun",
	  "mathlete.pro",
	  "overeasy.club",
	  "risenegg.com",
	  "scrambled.us",
	  "scrambled.tech",
	  "scrambled.world",
	  "scrambled.today",
	  "scrambled.best",
	  "shellgame.me",
	  "shellgame.one",
	  "shellgame.quest",
	  "shellplay.live",
	  "shellplay.org",
	  "shellshock.guru",
	  "shellshockers.ca",
	  "shellshockers.us",
	  "shellshockers.life",
	  "shellshockers.best",
	  "shellshockers.website",
	  "shellshockers.wiki",
	  "shellshockers.xyz",
	  "shellshockers.club",
	  "shellshockers.world",
	  "shellshockers.site",
	  "shellshockers.today",
	  "shockers.live",
	  "shockers.one",
	  "softboiled.club",
	  "yolk.life",
	  "yolk.tech",
	  "yolk.rocks",
	  "yolk.best",
	  "violentegg.club",
	  "violentegg.fun",
	  "zygote.cafe",
	  "shellsocks.com",
	  "urbanegger.com",
	  "eggboy.me",
	  "eggboy.xyz",
	  "yolk.quest",
	  "yolk.today",
	  "yolk.monster"
	];
  
	// CHANGE (still your logic, untouched)
	function isValidBackend(host) {
	  if (!host) return false;
	  const h = host.toLowerCase();
  
	  // For /game/, allow ONLY specific dev game subdomains that live under shellshock.io:
	  // e.g. egs-static-dev-uswest-z6w70a8.shellshock.io
	  if (routePath.startsWith('/game/')) {
		const GAME_DEV_HOST_RE = /^egs-(?:static-)?dev-[a-z0-9-]+\.shellshock\.io$/;
		if (GAME_DEV_HOST_RE.test(h)) return true;
		// Also accept dev control hosts if someone forces ?up=dev.shellshock.io (harmless).
		return allowlist.some(d => h === d || h.endsWith(`.${d}`));
	  }
  
	  // Control plane (/matchmaker/, /services/): dev-only
	  return allowlist.some(d => h === d || h.endsWith(`.${d}`));
	}
  
	const sticky = forcedUp || cookieUp || '';
  
	// CHANGE: per-route backend selection
	let backends;
	if (routePath.startsWith('/game/')) {
	  // For game routes we require an explicit, valid backend (no broad fallback).
	  if (!sticky || !isValidBackend(sticky)) {
		console.error(`[${label}] Missing or invalid ?up backend for game route: "${sticky}"`);
		return new Response("Invalid upstream", {
		  status: 400,
		  headers: { "Content-Type": "text/plain" }
		});
	  }
	  backends = [sticky]; // single candidate — exactly what was requested
	} else {
	  // Control plane: prefer sticky if valid, else shuffle dev allowlist
	  if (sticky && isValidBackend(sticky)) {
		backends = [sticky, ...allowlist.filter(b => b.toLowerCase() !== sticky.toLowerCase())];
	  } else {
		backends = allowlist.slice();
	  }
	}
  
	try {
	  const token = await createAuthToken(clientIP, env.HMAC_SECRET);
	  console.log(`[${label}] Token generated: ${token.substring(0, 20)}...`);
  
	  let shuffled;
	  if (sticky && isValidBackend(sticky)) {
		const others = allowlist.filter(b => b.toLowerCase() !== sticky.toLowerCase());
		shuffled = [sticky, ...shuffleArray(others)];
	  } else {
		shuffled = shuffleArray([...backends]);
	  }
  
	  const maxAttempts = 30;
  
	  for (let i = 0; i < Math.min(maxAttempts, shuffled.length); i++) {
		const backend = shuffled[i];
		const backendUrl = `https://${backend}${routePath}`;
		console.log(`[${label}] Attempt ${i + 1}: ${backendUrl}`);
  
		try {
		  const upstreamProtocols = attachToken
			? (selectedClientProto ? [selectedClientProto, token] : [token])
			: (selectedClientProto ? [selectedClientProto] : []);
  
		  const headersInit = { "Upgrade": "websocket" };
		  if (upstreamProtocols.length) {
			headersInit["Sec-WebSocket-Protocol"] = upstreamProtocols.join(", ");
		  }
  
		  const ext = request.headers.get("sec-websocket-extensions");
		  if (ext) headersInit["Sec-WebSocket-Extensions"] = ext;
		  const origin = request.headers.get("origin");
		  if (origin) headersInit["Origin"] = origin;
  
		  const resp = await fetch(backendUrl, { headers: headersInit });
		  if (!resp.webSocket) {
			console.log(`[${label}] Upstream handshake failed (no webSocket)`);
			continue;
		  }
  
		  const backendWs = resp.webSocket;
		  backendWs.accept();
  
		  const pair = new WebSocketPair();
		  const [client, server] = Object.values(pair);
  
		  const isProbe = routePath === '/game/' && reqUrl.searchParams.has('probe');
  
		  if (isProbe) {
			try {
			  if (backendWs.readyState === WebSocket.OPEN) backendWs.send(JSON.stringify({ command: 'ping' }));
			} catch (e) {
			  console.error(`[${label}] Failed to send initial ping:`, e.message);
			}
		  }
		  if (isProbe && isGitHubHost) {
			// Auto‑close probe sockets so they don't hang forever
			setTimeout(() => {
			  try { server.close(1000, "probe-ok"); } catch {}
			  try { backendWs.close(1000, "probe-ok"); } catch {}
			}, 0);
		}
  
		  let repliedOnce = false;
  
		  backendWs.addEventListener("message", (event) => {
			if (typeof event.data === "string" && (event.data === "ping" || event.data === "pong")) return;
			try { server.send(event.data); } catch {}
			if (isTransactional && !repliedOnce) {
			  repliedOnce = true;
			  setTimeout(() => {
				try { server.close(1000, "ok"); } catch {}
				try { backendWs.close(1000, "ok"); } catch {}
			  }, 0);
			}
		  });
  
		  server.addEventListener("message", (event) => {
			try { if (backendWs.readyState === WebSocket.OPEN) backendWs.send(event.data); } catch {}
		  });
  
		  backendWs.addEventListener("close", (event) => {
			try { server.close(event.code, event.reason); } catch {}
		  });
  
		  server.addEventListener("close", (event) => {
			try { backendWs.close(event.code, event.reason); } catch {}
		  });
  
		  server.accept();
  
		  const headers = new Headers();
		  if (selectedClientProto) headers.set("Sec-WebSocket-Protocol", selectedClientProto);
  
		  // CHANGE 2: Only non-game routes should update ws_upstream.
		  // Game connections must NOT overwrite the sticky control-plane proxy.
		  if (!isGameRoute) {
			headers.append(
			  "Set-Cookie",
			  `ws_upstream=${backend}; Path=/; Secure; HttpOnly; SameSite=None`
			);
		  }
  
		  return new Response(null, { status: 101, webSocket: client, headers });
  
		} catch (error) {
		  console.error(`[${label}] ✗ ${backend}:`, error.message);
		  continue;
		}
	  }
  
	  console.error(`[${label}] All backends failed`);
	  return new Response("All backends failed", { status: 503 });
  
	} catch (error) {
	  console.error(`[${label}] Fatal error:`, error.message);
	  return new Response("Internal server error", { status: 500 });
	}
  }
  
  async function createAuthToken(ip, secret) {
	const timestamp = Date.now().toString();
	const data = `${ip}|${timestamp}`;
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
	const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));
	const sigHex = Array.from(new Uint8Array(signature)).map(b => b.toString(16).padStart(2, "0")).join("");
	return base64urlEncode(`${data}|${sigHex}`);
  }
  
  function base64urlEncode(str) {
	return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  }
  
  function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
	  const j = Math.floor(Math.random() * (i + 1));
	  [array[i], array[j]] = [array[j], array[i]];
	}
	return array;
  }