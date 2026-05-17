"""Broken game scanner for local/offline validation.

Quick examples:
    python broken_game_scanner.py
    python broken_game_scanner.py --resume
    python broken_game_scanner.py --max-games 50 --batch-size 10
    python broken_game_scanner.py --only game-a game-b --strict-external
    python broken_game_scanner.py --sync-markers

Output files:
    broken_games.txt / broken_games.json     -> hard failures only
    needs_review_games.txt                   -> warnings that may need fixes
    working_games.txt                        -> clean scans
    checked_games.txt                        -> all scanned game names
    scan_results.json                        -> full structured report
"""

import argparse
import http.server
import json
import multiprocessing as mp
import os
import re
import socketserver
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional, Set, Tuple
from urllib.parse import quote, unquote, urlparse

from playwright.sync_api import Error as PlaywrightError
from playwright.sync_api import TimeoutError as PlaywrightTimeoutError
from playwright.sync_api import sync_playwright


GAME_SURFACE_SELECTOR = (
    "canvas, iframe, embed, object, ruffle-player, ruffle-embed, #unity-canvas, #game canvas, #player"
)
BROKEN_MARKER = "<!--GAME BROKEN-->"

CRITICAL_EXTENSIONS = {
    ".js",
    ".mjs",
    ".wasm",
    ".data",
    ".pck",
    ".unityweb",
    ".swf",
    ".bin",
    ".pak",
    ".mem",
}

CRITICAL_RESOURCE_TYPES = {
    "document",
    "script",
    "fetch",
    "xhr",
    "worker",
    "websocket",
    "manifest",
}

IGNORED_LOCAL_404_PATTERNS = [
    # Browser-default requests.
    re.compile(r"/favicon\.ico$", re.IGNORECASE),
    re.compile(r"/apple-touch-icon(?:-precomposed)?\.png$", re.IGNORECASE),
    re.compile(r"/robots\.txt$", re.IGNORECASE),

    # Source maps in any flavor (sourcemap files are always optional).
    re.compile(r"\.map(?:\.gz|\.br)?$", re.IGNORECASE),
    re.compile(r"/sourcemaps?/", re.IGNORECASE),

    # Portal leftovers — JS/CSS the original host serves but our archive doesn't.
    re.compile(r"^/js/main\.js$", re.IGNORECASE),
    re.compile(r"^/css/main\.css$", re.IGNORECASE),
    re.compile(r"^/assets/scripts/game\.js$", re.IGNORECASE),
    re.compile(r"^/assets/promo/promo\.js$", re.IGNORECASE),
    re.compile(r"^/cdn-cgi/", re.IGNORECASE),  # Cloudflare worker scaffolding
    re.compile(r"^/__cf_chl_jschl_tk__", re.IGNORECASE),
    re.compile(r"^/gadgets/evthdlr", re.IGNORECASE),

    # Dev-mode / HMR / build-tooling stragglers (these only 404 because we
    # archived a production build that still references its dev tooling).
    re.compile(r"^/sockjs-node/", re.IGNORECASE),
    re.compile(r"^/__webpack_hmr", re.IGNORECASE),
    re.compile(r"\.hot-update\.(?:js|json)(?:\.map)?$", re.IGNORECASE),
    re.compile(r"^/_next/data/development/", re.IGNORECASE),
    re.compile(r"^/__nextjs_original-stack-frame", re.IGNORECASE),

    # Optional-by-convention filenames. Authors who name an asset `-optional`
    # or `-fallback` or `.optional.*` are explicitly signalling "this 404 is
    # fine"; trust them.
    re.compile(r"-optional\.[a-z0-9]+$", re.IGNORECASE),
    re.compile(r"\.optional\.[a-z0-9]+$", re.IGNORECASE),
    re.compile(r"-fallback\.[a-z0-9]+$", re.IGNORECASE),
    re.compile(r"-placeholder\.[a-z0-9]+$", re.IGNORECASE),

    # PWA / service worker checks that legitimately 404 on archived games.
    re.compile(r"^/sw-register-options\.json$", re.IGNORECASE),
    re.compile(r"^/manifest(?:\.webmanifest)?\.bak$", re.IGNORECASE),
    re.compile(r"^/\.well-known/", re.IGNORECASE),

    # Analytics / ad probes whose absence doesn't break gameplay.
    re.compile(r"^/(?:ezimba|ad|ads|advert)/", re.IGNORECASE),
    re.compile(r"/(?:track|analytics|telemetry|beacon)\b", re.IGNORECASE),

    # Engine-specific debris.
    re.compile(r"/emulatorjs/cores/reports/[^/]+\.json$", re.IGNORECASE),
    re.compile(r"-legacy-wasm\.data$", re.IGNORECASE),
    re.compile(r"\.wasm\.debug\.wasm$", re.IGNORECASE),  # WebAssembly debug companion files
    re.compile(r"/Build/.*\.symbols\.json(?:\.br|\.gz)?$", re.IGNORECASE),  # Unity debug symbols

    # Old/known broken local references kept for back-compat.
    re.compile(r"/assets/svg/svg-map\.svgindex\.htmlomments$", re.IGNORECASE),
    re.compile(r"/media/posts/\d+/responsive/[^/]+\.(?:jpg|jpeg|png|webp)$", re.IGNORECASE),
]

OPTIONAL_EXTERNAL_HOST_PATTERNS = [
    re.compile(r"(^|\.)googletagmanager\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)google-analytics\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)doubleclick\.net$", re.IGNORECASE),
    re.compile(r"(^|\.)googlesyndication\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)fonts\.googleapis\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)gstatic\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)acscdn\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)api\.gameanalytics\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)gamemonkey\.org$", re.IGNORECASE),
    re.compile(r"(^|\.)gamedistribution\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)poki\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)doubleclick\.net$", re.IGNORECASE),
    re.compile(r"(^|\.)googleapis\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)api\.azgames\.io$", re.IGNORECASE),
    re.compile(r"(^|\.)ubg235\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)raygun\.io$", re.IGNORECASE),
    re.compile(r"(^|\.)crwdcntrl\.net$", re.IGNORECASE),
    re.compile(r"(^|\.)improvedigital\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)cloudflareinsights\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)adnetasia\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)mail\.ru$", re.IGNORECASE),
    re.compile(r"(^|\.)juicyads\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)ysm\.yahoo\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)aol\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)editmysite\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)weebly\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)wgplayer\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)foxnetworks\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)yahoo\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)geometrydashlite\.io$", re.IGNORECASE),
    re.compile(r"(^|\.)adtrackers\.net$", re.IGNORECASE),
    re.compile(r"(^|\.)clickability\.com$", re.IGNORECASE),
]

OPTIONAL_EXTERNAL_URL_PATTERNS = [
    re.compile(r"/gh/mdnaik/myblog@master/arlinablock\.js$", re.IGNORECASE),
    re.compile(r"/unblocked-gm\.js$", re.IGNORECASE),
]

CRITICAL_RUNTIME_ERROR_TOKENS = (
    "createunityinstance",
    "ruffleplayer",
    "ejs_",
    "wasm",
    "is not defined",
    "cannot read properties of undefined",
    "loading chunk",
)

NOISE_CONSOLE_PATTERNS = (
    # Sourcemaps and dev tooling — never user-visible.
    "source map",
    "devtools failed to load source map",
    "sourcemap parse error",

    # Browser-default 404s.
    "favicon.ico",
    "apple-touch-icon",
    "/robots.txt",
    "manifest.webmanifest",

    # CSP / mixed-content policy violations from ad/analytics scripts —
    # the game itself still runs.
    "violates the following content security policy",
    "refused to connect because it violates the document's content security policy",
    "refused to load the image",
    "refused to load the script",
    "mixed content:",

    # 404s on optional resources — already covered by the 404 allowlist,
    # mirrored here for the console-error noise filter.
    "failed to load resource: the server responded with a status of 404",
    "failed to load resource: the server responded with a status of 403",
    "status of 501 (unsupported method ('post'))",
    "error creating webgl renderer: unable to create webgl rendering context",
    "this method is a failsafe, and not officially supported",

    # Deprecation warnings — informational, never fatal.
    "deprecated",
    "deprecationwarning",
    "[deprecation]",
    "[violation]",
    "addeventlistener.*passive event listener",
    "synchronous xmlhttprequest on the main thread is deprecated",

    # Ad-blocker / privacy-extension noise: telemetry scripts that get
    # blocked by the user's browser do not affect game functionality.
    "err_blocked_by_client",
    "err_blocked_by_response",
    "blocked by client",
    "doubleclick.net",
    "googletagmanager",
    "google-analytics",
    "googlesyndication",
    "googleadservices",
    "doubleverify",

    # Cookie / consent banners.
    "cookie-banner",
    "consent-manager",
    "gatekeeperconsent",
    "cmp.min.js",

    # Service worker registration noise. Failed SW registration on an
    # archived game doesn't break gameplay.
    "service worker registration failed",
    "the script has an unsupported mime type",

    # WebRTC / camera / mic permission prompts. Not a runtime error;
    # the user just clicked Deny.
    "permission denied",
    "the user denied",
    "notallowederror",

    # AudioContext autoplay restrictions — handled by engines on user input.
    "the audiocontext was not allowed to start",
    "play() failed because the user didn't interact",

    # Common third-party library noise.
    "polyfill.io",
    "newrelic",
    "datadog-rum",
    "sentry",
    "log4javascript",
)

NONCRITICAL_RUNTIME_PATTERNS = (
    "unable to decode audio data",
    "failed to load audio",
    # NOTE: removed "abort({}) at error" — that's the actual fatal Emscripten
    # abort marker, not a noncritical advisory. Keeping it here used to mask
    # genuinely broken WebGL/Unity games.
    "webgl unsupported in this browser",
    "consolelog is not defined",
    "script is not defined",
    "$ is not defined",
    "unexpected token '<', \"<!doctype",
    "function statements require a function name",
    "unexpected identifier '_0x",
    "fiddnxlr",
    "gamemaker_init is not defined",
)

# Symptoms of a broken game build (string interpolation that produced a
# literal "undefined" or "null" in a URL). Always treat as critical.
BROKEN_URL_PATTERNS = (
    re.compile(r"/undefined(?:/|\.)", re.IGNORECASE),
    re.compile(r"/null(?:/|\.)", re.IGNORECASE),
)


def is_obviously_broken_url(url: str) -> bool:
    for pattern in BROKEN_URL_PATTERNS:
        if pattern.search(url):
            return True
    return False

ADVISORY_WARNING_CODES = {
    "EXTERNAL_OPTIONAL",
    "EXTERNAL_OPTIONAL_FAILED",
    "EXTERNAL_NONCRITICAL",
    "EXTERNAL_NONCRITICAL_FAILED",
    "LOCAL_MIRROR_HTTP",
    "LOCAL_MIRROR_REQUEST_FAILED",
    "LOCAL_IGNORED_HTTP",
    "LOCAL_IGNORED_MISSING",
    "RUNTIME_ADVISORY",
}

RETRYABLE_SCAN_CODES = {
    "SCAN_HARD_TIMEOUT",
    "SCAN_WORKER_CRASH",
    "SCAN_WORKER_NO_RESULT",
    "SCAN_WORKER_ERROR",
    "NAV_TIMEOUT",
    "NAV_ERROR",
    "NAV_EXCEPTION",
}


@dataclass
class Issue:
    code: str
    message: str
    severity: str
    url: str = ""

    def as_dict(self) -> Dict[str, str]:
        return {
            "code": self.code,
            "message": self.message,
            "severity": self.severity,
            "url": self.url,
        }

    @staticmethod
    def from_dict(item: Dict[str, object]) -> "Issue":
        return Issue(
            code=str(item.get("code", "UNKNOWN")),
            message=str(item.get("message", "")),
            severity=str(item.get("severity", "warning")),
            url=str(item.get("url", "")),
        )


@dataclass
class GameTarget:
    name: str
    game_type: str
    entry_file: str


@dataclass
class GameResult:
    name: str
    game_type: str
    entry_file: str
    status: str
    elapsed_seconds: float
    critical_issues: List[Issue] = field(default_factory=list)
    warnings: List[Issue] = field(default_factory=list)
    probe: Dict[str, object] = field(default_factory=dict)

    def as_dict(self) -> Dict[str, object]:
        return {
            "name": self.name,
            "type": self.game_type,
            "entry_file": self.entry_file,
            "status": self.status,
            "elapsed_seconds": round(self.elapsed_seconds, 3),
            "critical_issues": [i.as_dict() for i in self.critical_issues],
            "warnings": [i.as_dict() for i in self.warnings],
            "probe": self.probe,
        }

    @staticmethod
    def from_dict(item: Dict[str, object]) -> "GameResult":
        critical_raw = item.get("critical_issues", [])
        warnings_raw = item.get("warnings", [])
        return GameResult(
            name=str(item.get("name", "")),
            game_type=str(item.get("type", item.get("game_type", "webgl"))),
            entry_file=str(item.get("entry_file", "index.html")),
            status=str(item.get("status", "warning")),
            elapsed_seconds=float(item.get("elapsed_seconds", 0.0)),
            critical_issues=[
                Issue.from_dict(x)
                for x in critical_raw
                if isinstance(x, dict)
            ],
            warnings=[
                Issue.from_dict(x)
                for x in warnings_raw
                if isinstance(x, dict)
            ],
            probe=item.get("probe", {}) if isinstance(item.get("probe", {}), dict) else {},
        )


@dataclass
class Config:
    root_dir: Path
    assets_dir: Path
    games_list_path: Path
    port: int
    wait_seconds: float
    timeout_ms: int
    hard_timeout_seconds: float
    batch_size: int
    max_attempts: int
    parallel_workers: int
    max_games: Optional[int]
    only_games: Optional[Set[str]]
    strict_external: bool
    sync_markers: bool
    broken_log: Path
    broken_json: Path
    report_json: Path
    working_log: Path
    review_log: Path
    checked_log: Path
    resume: bool
    state_file: Path
    profile: str = "chromium-default"
    screenshot_dir: Optional[Path] = None


class ThreadingTCPServer(socketserver.ThreadingMixIn, socketserver.TCPServer):
    allow_reuse_address = True
    daemon_threads = True


class OfflineAwareHandler(http.server.SimpleHTTPRequestHandler):
    root_dir = os.getcwd()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=self.root_dir, **kwargs)

    def end_headers(self) -> None:
        self.send_header(
            "Content-Security-Policy",
            "default-src 'self' data: blob: 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'; "
            "connect-src 'self' data: blob:; "
            "img-src 'self' data: blob:; "
            "media-src 'self' data: blob:; "
            "font-src 'self' data:; "
            "frame-src 'self' blob:; "
            "worker-src 'self' blob:;",
        )
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format: str, *args) -> None:
        return

    def copyfile(self, source, outputfile) -> None:
        try:
            super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            # Browser aborts are expected during heavy scans.
            return


def parse_args() -> Config:
    parser = argparse.ArgumentParser(
        description=(
            "Scan local games and flag true hard-failure breakage: missing critical local assets, "
            "fatal runtime failures, and external dependencies that block startup."
        )
    )
    parser.add_argument("--assets-dir", default="Assets", help="Assets root folder")
    parser.add_argument("--games-list", default="games_list.json", help="Catalog file used for game type hints")
    parser.add_argument("--port", type=int, default=8081, help="Temporary local server port")
    parser.add_argument("--wait-seconds", type=float, default=15.0, help="Time to let each game bootstrap (was 8, bumped for Unity/EJS thoroughness)")
    parser.add_argument("--timeout-ms", type=int, default=45000, help="Navigation timeout in milliseconds (was 25000)")
    parser.add_argument(
        "--hard-timeout-seconds",
        type=float,
        default=360.0,
        help=(
            "Hard wall-clock timeout per game; timed-out games used to be marked broken, "
            "but under the triple-confirm verdict (see scripts/build-game-health.js) a "
            "timeout is treated as inconclusive (no fail vote). Default raised from 240 -> 360s."
        ),
    )
    parser.add_argument(
        "--profile",
        choices=["chromium-default", "chromium-no-gpu"],
        default="chromium-default",
        help=(
            "Browser profile for this scan. chromium-default = legacy behavior. "
            "chromium-no-gpu = launches Chromium with --disable-gpu --disable-software-rasterizer "
            "as a second orthogonal lane (catches canvas/GPU edge cases). "
            "When --profile=chromium-no-gpu and --report-json is left default, "
            "scan_results.profile_b.json is used so the two lanes don't overwrite each other."
        ),
    )
    parser.add_argument(
        "--screenshot-dir",
        default=None,
        help=(
            "If set, save a screenshot per scanned game to "
            "<dir>/<slug>/<run_id>/{5s,30s,end}.png for fast human triage. "
            "Adds ~100ms per game; off by default."
        ),
    )
    parser.add_argument("--batch-size", type=int, default=20, help="Games per browser context batch")
    parser.add_argument(
        "--max-attempts",
        type=int,
        default=2,
        help="Maximum isolated retry attempts per game when a worker times out/crashes",
    )
    parser.add_argument(
        "--parallel-workers",
        type=int,
        default=1,
        help="Number of games to scan in parallel (1 keeps sequential order)",
    )
    parser.add_argument("--max-games", type=int, default=None, help="Limit scan to first N games")
    parser.add_argument("--only", nargs="*", default=None, help="Only scan these game folder names")
    parser.add_argument(
        "--strict-external",
        action="store_true",
        help="Treat any non-optional external dependency as hard-failure broken",
    )
    parser.add_argument(
        "--sync-markers",
        action="store_true",
        help="Sync <!--GAME BROKEN--> markers for scanned games (off by default)",
    )
    parser.add_argument("--broken-log", default="broken_games.txt", help="Output text file for broken games")
    parser.add_argument("--broken-json", default="broken_games.json", help="Output JSON file for broken games")
    parser.add_argument("--report-json", default="scan_results.json", help="Output JSON file with all results")
    parser.add_argument("--working-log", default="working_games.txt", help="Output text file for clean games")
    parser.add_argument("--checked-log", default="checked_games.txt", help="Output text file for all scanned games")
    parser.add_argument(
        "--review-log",
        default="needs_review_games.txt",
        help="Output text file for warnings-only games",
    )
    parser.add_argument(
        "--resume",
        action="store_true",
        help="Resume from the previous checkpoint file and continue remaining games",
    )
    parser.add_argument(
        "--state-file",
        default="scan_state.json",
        help="Checkpoint state JSON used by --resume",
    )
    parser.add_argument(
        "--root",
        default=None,
        help=(
            "Scan a single candidate folder (used by the recovery engine to "
            "validate a downloaded copy before swapping it in). The folder's "
            "basename is used as the game name and its parent as the assets "
            "root. Implies --only <basename>."
        ),
    )
    parser.add_argument(
        "--only-from",
        default=None,
        help=(
            "Read a list of game slugs from a JSON file's keys/results and "
            "scan only those. Accepts game_health.json, scan_results.json, "
            "or any recovery_summary_*.json."
        ),
    )
    args = parser.parse_args()

    root_dir = Path.cwd()
    only_set: Optional[Set[str]] = set(args.only) if args.only else None

    if args.only_from:
        slug_set: Set[str] = set()
        try:
            payload = json.loads(Path(args.only_from).read_text(encoding="utf-8"))
        except Exception as e:
            print(f"--only-from could not read {args.only_from}: {e}")
            payload = None
        if isinstance(payload, dict):
            games = payload.get("games") if "games" in payload else payload
            if isinstance(games, dict):
                slug_set.update(str(k) for k in games.keys())
            results = payload.get("results")
            if isinstance(results, list):
                for r in results:
                    if isinstance(r, dict) and r.get("slug"):
                        slug_set.add(str(r["slug"]))
                    if isinstance(r, dict) and r.get("name"):
                        slug_set.add(str(r["name"]))
            failed = payload.get("failed")
            if isinstance(failed, list):
                for r in failed:
                    if isinstance(r, dict) and r.get("slug"):
                        slug_set.add(str(r["slug"]))
        elif isinstance(payload, list):
            for r in payload:
                if isinstance(r, dict) and r.get("name"):
                    slug_set.add(str(r["name"]))
                if isinstance(r, dict) and r.get("slug"):
                    slug_set.add(str(r["slug"]))
        if slug_set:
            only_set = (only_set or set()) | slug_set

    if args.root:
        cand_path = Path(args.root).resolve()
        if not cand_path.is_dir():
            raise FileNotFoundError(f"--root folder not found: {cand_path}")
        assets_dir = cand_path.parent
        only_set = {cand_path.name}
    else:
        assets_dir = (root_dir / args.assets_dir).resolve()

    # When --profile=chromium-no-gpu and --report-json wasn't overridden, route
    # the output to scan_results.profile_b.json so the second lane doesn't
    # overwrite the default lane's results. build-game-health.js reads both.
    report_path_str = args.report_json
    if args.profile == "chromium-no-gpu" and report_path_str == "scan_results.json":
        report_path_str = "scan_results.profile_b.json"

    screenshot_dir: Optional[Path] = None
    if args.screenshot_dir:
        screenshot_dir = (root_dir / args.screenshot_dir).resolve()

    return Config(
        root_dir=root_dir,
        assets_dir=assets_dir,
        games_list_path=(root_dir / args.games_list).resolve(),
        port=args.port,
        wait_seconds=max(args.wait_seconds, 0.1),
        timeout_ms=max(args.timeout_ms, 1000),
        hard_timeout_seconds=max(args.hard_timeout_seconds, 5.0),
        batch_size=max(args.batch_size, 1),
        max_attempts=max(args.max_attempts, 1),
        parallel_workers=max(args.parallel_workers, 1),
        max_games=args.max_games if args.max_games and args.max_games > 0 else None,
        only_games=only_set,
        strict_external=args.strict_external,
        sync_markers=args.sync_markers,
        broken_log=(root_dir / args.broken_log).resolve(),
        broken_json=(root_dir / args.broken_json).resolve(),
        report_json=(root_dir / report_path_str).resolve(),
        working_log=(root_dir / args.working_log).resolve(),
        checked_log=(root_dir / args.checked_log).resolve(),
        review_log=(root_dir / args.review_log).resolve(),
        resume=args.resume,
        state_file=(root_dir / args.state_file).resolve(),
        profile=args.profile,
        screenshot_dir=screenshot_dir,
    )


def load_state_results(state_file: Path) -> List[GameResult]:
    if not state_file.exists():
        return []

    try:
        with state_file.open("r", encoding="utf-8") as handle:
            payload = json.load(handle)
    except Exception:
        return []

    results_raw = payload.get("results", []) if isinstance(payload, dict) else []
    if not isinstance(results_raw, list):
        return []

    results: List[GameResult] = []
    for item in results_raw:
        if isinstance(item, dict):
            parsed = GameResult.from_dict(item)
            if parsed.name:
                results.append(parsed)
    return results


def save_state_results(state_file: Path, results: List[GameResult], total_targets: int) -> None:
    payload = {
        "version": 1,
        "updated_at": int(time.time()),
        "total_targets": total_targets,
        "completed": len(results),
        "results": [r.as_dict() for r in results],
    }
    tmp_path = state_file.with_suffix(state_file.suffix + ".tmp")
    with tmp_path.open("w", encoding="utf-8") as handle:
        json.dump(payload, handle, indent=2)
    os.replace(tmp_path, state_file)


def load_catalog(games_list_path: Path) -> Dict[str, Dict[str, object]]:
    if not games_list_path.exists():
        return {}

    try:
        with games_list_path.open("r", encoding="utf-8") as handle:
            data = json.load(handle)
    except Exception:
        return {}

    if not isinstance(data, list):
        return {}

    out: Dict[str, Dict[str, object]] = {}
    for item in data:
        if not isinstance(item, dict):
            continue
        name = item.get("name")
        if isinstance(name, str) and name:
            out[name] = item
    return out


def find_first_html(game_dir: Path) -> Optional[str]:
    index_file = game_dir / "index.html"
    if index_file.exists():
        return "index.html"

    direct = sorted(p.name for p in game_dir.glob("*.html"))
    if direct:
        return direct[0]

    for path in sorted(game_dir.rglob("*.html")):
        return str(path.relative_to(game_dir)).replace("\\", "/")

    return None


def resolve_entry_file(game_dir: Path, catalog_entry: Dict[str, object]) -> Optional[str]:
    url = catalog_entry.get("url")
    if isinstance(url, str) and "/" in url:
        expected_prefix = f"Assets/{game_dir.name}/"
        if url.startswith(expected_prefix):
            relative = url[len(expected_prefix) :]
            candidate = game_dir / relative
            if candidate.exists():
                return relative.replace("\\", "/")

    return find_first_html(game_dir)


def collect_targets(config: Config, catalog: Dict[str, Dict[str, object]]) -> List[GameTarget]:
    if not config.assets_dir.exists():
        raise FileNotFoundError(f"Assets folder not found: {config.assets_dir}")

    targets: List[GameTarget] = []
    for game_dir in sorted(config.assets_dir.iterdir(), key=lambda p: p.name.lower()):
        if not game_dir.is_dir():
            continue
        game_name = game_dir.name

        if config.only_games and game_name not in config.only_games:
            continue

        catalog_entry = catalog.get(game_name, {})
        entry_file = resolve_entry_file(game_dir, catalog_entry)
        if not entry_file:
            continue

        game_type = str(catalog_entry.get("type", "webgl"))
        targets.append(GameTarget(name=game_name, game_type=game_type, entry_file=entry_file))

        if config.max_games and len(targets) >= config.max_games:
            break

    return targets


def split_batches(items: List[GameTarget], batch_size: int) -> List[List[GameTarget]]:
    return [items[i : i + batch_size] for i in range(0, len(items), batch_size)]


def build_game_url(config: Config, target: GameTarget) -> str:
    return f"http://localhost:{config.port}/Assets/{quote(target.name)}/{safe_url_path(target.entry_file)}"


def safe_url_path(path: str) -> str:
    return "/".join(quote(segment) for segment in path.split("/"))


def get_local_hosts(port: int) -> Set[str]:
    return {f"localhost:{port}", f"127.0.0.1:{port}"}


def is_local_request(url: str, port: int) -> bool:
    parsed = urlparse(url)
    if parsed.scheme in {"", "about", "data", "blob", "javascript"}:
        return True
    return parsed.netloc.lower() in get_local_hosts(port)


def is_optional_external_host(host: str) -> bool:
    if not host:
        return False
    for pattern in OPTIONAL_EXTERNAL_HOST_PATTERNS:
        if pattern.search(host):
            return True
    return False

def is_optional_external_url(url: str) -> bool:
    for pattern in OPTIONAL_EXTERNAL_URL_PATTERNS:
        if pattern.search(url):
            return True
    return False


def should_ignore_local_404(path: str) -> bool:
    for pattern in IGNORED_LOCAL_404_PATTERNS:
        if pattern.search(path):
            return True
    return False


def is_generated_mirror_path(path: str) -> bool:
    low = path.lower()
    return "/_external_mirror/" in low or "/_snapshot_mirror/" in low


def is_critical_local_path(path: str, resource_type: str) -> bool:
    if is_generated_mirror_path(path):
        return False

    suffix = Path(path).suffix.lower()
    if suffix in CRITICAL_EXTENSIONS:
        return True
    if resource_type in CRITICAL_RESOURCE_TYPES:
        return True
    return False


def is_noise_console_message(message: str) -> bool:
    low = message.lower()
    for token in NOISE_CONSOLE_PATTERNS:
        if token in low:
            return True
    return False


def is_noncritical_runtime_message(message: str) -> bool:
    low = message.lower()
    for token in NONCRITICAL_RUNTIME_PATTERNS:
        if token in low:
            return True
    return False


def should_escalate_runtime_error(runtime_errors: List[str]) -> bool:
    if not runtime_errors:
        return False
    all_text = "\n".join(runtime_errors).lower()
    return any(token in all_text for token in CRITICAL_RUNTIME_ERROR_TOKENS)


def should_require_surface(target: GameTarget, probe: Dict[str, object]) -> bool:
    game_type = target.game_type.lower()
    if game_type in {"flash", "gba", "snes", "retro"}:
        return True
    if bool(probe.get("hasRuffleGlobal")) or bool(probe.get("hasRetroGlobal")):
        return True
    if bool(probe.get("unityLoadingBar")):
        return True
    return False


def is_actionable_warning(issue: Issue) -> bool:
    return issue.code not in ADVISORY_WARNING_CODES


def order_warnings_for_output(warnings: List[Issue]) -> List[Issue]:
    actionable = [issue for issue in warnings if is_actionable_warning(issue)]
    advisory = [issue for issue in warnings if not is_actionable_warning(issue)]
    return actionable + advisory


def try_advance_game(page) -> None:
    """Best-effort: dismiss obvious cookie banners and click any "Start" /
    "Play" / canvas overlays. Silent on any error — many games don't need
    this and the scan continues regardless.
    """
    try:
        page.evaluate(
            """
            () => {
                const TEXT_HITS = [
                    'accept all', 'accept', 'agree', 'i agree', 'i accept',
                    'got it', 'got it!', 'okay', 'ok', 'continue', 'consent',
                    'i consent', 'allow all', 'allow', 'dismiss', 'close',
                    'click to play', 'click to start', 'tap to play',
                    'tap to start', 'tap to begin', 'press to play', 'press start',
                    'start', 'start game', 'play', 'play game', 'begin',
                    "let's go", 'lets go', 'go', 'launch', 'enter',
                ];
                const CLASS_HITS = [
                    'play-button', 'start-button', 'btn-play', 'btn-start',
                    'cookie-accept', 'consent-accept', 'cmp-accept-all', 'cmp-accept',
                    'gdpr-accept', 'tcfui-accept', 'fc-cta-consent',
                ];
                let clicked = 0;
                const visit = (root) => {
                    if (!root || clicked > 8) return;
                    const els = root.querySelectorAll
                        ? root.querySelectorAll('button, a, div[role="button"], span[role="button"], [data-action], .play-button, .start-button')
                        : [];
                    for (const el of els) {
                        if (clicked > 8) break;
                        try {
                            const text = (el.innerText || el.textContent || '').trim().toLowerCase();
                            const cls = (el.className || '').toString().toLowerCase();
                            const id = (el.id || '').toString().toLowerCase();
                            const matchedText = text && text.length <= 50 && TEXT_HITS.some(t => text === t || text.startsWith(t + ' ') || text === t.replace(/!/g,''));
                            const matchedClass = CLASS_HITS.some(c => cls.includes(c) || id.includes(c));
                            if (!matchedText && !matchedClass) continue;
                            const rect = el.getBoundingClientRect();
                            if (rect.width < 8 || rect.height < 8) continue;
                            const style = window.getComputedStyle(el);
                            if (style.display === 'none' || style.visibility === 'hidden') continue;
                            el.click();
                            clicked += 1;
                        } catch (e) { /* swallow */ }
                    }
                    // Recurse into open shadow roots and same-origin iframes.
                    try {
                        const all = root.querySelectorAll ? root.querySelectorAll('*') : [];
                        for (const el of all) {
                            if (el.shadowRoot) visit(el.shadowRoot);
                        }
                    } catch (e) {}
                };
                visit(document);
                // Also try same-origin iframes.
                try {
                    for (const f of document.querySelectorAll('iframe')) {
                        try { if (f.contentDocument) visit(f.contentDocument); } catch (_) {}
                    }
                } catch (e) {}
                // Last resort: click on the main canvas to give it focus —
                // some Unity games need a user gesture to unlock the audio
                // context, which gates rendering until granted.
                try {
                    const c = document.querySelector('canvas, #unity-canvas, #game canvas');
                    if (c) {
                        const r = c.getBoundingClientRect();
                        if (r.width > 0 && r.height > 0) {
                            const evt = new MouseEvent('click', {
                                bubbles: true, cancelable: true,
                                clientX: r.left + r.width / 2,
                                clientY: r.top + r.height / 2,
                            });
                            c.dispatchEvent(evt);
                        }
                    }
                } catch (e) {}
                return clicked;
            }
            """
        )
    except Exception:
        # Page might have closed mid-eval or be cross-origin; either way,
        # the scan should continue with whatever the probe sees.
        pass


def compute_engine_extra_wait_ms(probe_first: Dict[str, object], target: GameTarget) -> int:
    """How many extra milliseconds to wait after the initial probe based on
    the engine type. Returns 0 when the game already looks fully bootstrapped.
    """
    # Unity: large WebAssembly + .data download often takes 15-30s on cold load
    # for medium-sized games; large ones can need 40-60s.
    if bool(probe_first.get("unityLoadingBar")):
        pct = _parse_unity_progress(probe_first.get("unityProgress"))
        # Default: extra 20s. If loader is already past 90%, just 5s. If
        # under 50%, give it a full 35s extra.
        if pct >= 95.0:
            return 0
        if pct >= 90.0:
            return 5000
        if pct >= 50.0:
            return 20000
        return 35000

    # EmulatorJS / retro: ROM fetch + core compile can take 10-15s.
    if target.game_type in {"gba", "snes", "retro"} or probe_first.get("hasRetroGlobal"):
        return 15000

    # Ruffle / Flash: .swf parse can be slow for big files.
    if probe_first.get("hasRuffleGlobal"):
        return 10000

    # Plain HTML5: usually ready by initial probe. Give it a small extra
    # window to capture splash-screen transitions.
    return 4000


def probe_page(page) -> Dict[str, object]:
    # Includes a coarse "canvas pixel hash" so the supervisor can detect a
    # canvas that exists but never actually rendered (loading-bar-then-stall).
    #
    # WebGL canvases default to preserveDrawingBuffer:false, so drawImage()
    # samples come back black even when the game is rendering. We detect that
    # case and fall back to a frame-tick counter (requestAnimationFrame +
    # WebGL drawingBufferWidth) to confirm the game is alive.
    #
    # Engine-aware liveness markers (audioContextRunning, unityInstanceLoaded,
    # ruffleReady, ejsStarted, godotReady) are stronger evidence than the
    # generic canvas heuristic — a Unity game with a resolved createUnityInstance
    # promise is unambiguously loaded even if the canvas momentarily looks
    # blank, and an AudioContext entering 'running' state is a sure sign the
    # game has gotten past its splash.
    return page.evaluate(
        """
        async () => {
            const surfaces = document.querySelectorAll(
                'canvas, iframe, embed, object, ruffle-player, ruffle-embed, ruffle-object, #unity-canvas, #game canvas, #player'
            ).length;
            const bodyText = (document.body?.innerText || '').trim();
            const bodyTextLength = bodyText.length;
            // Sample of the visible page text — used by Python side to look
            // for rendered error strings like "Failed to load" / "404 not
            // found" that mean the page loaded fine but isn't actually a
            // playable game.
            const bodyTextSample = bodyText.slice(0, 4096).toLowerCase();
            const unityLoadingBar = !!document.querySelector('#unity-loading-bar');
            const unityProgress = document.querySelector('#unity-progress-bar-full')?.style?.width || '';
            const hasRuffleGlobal = typeof window.RufflePlayer !== 'undefined';
            const hasRetroGlobal = typeof window.EJS_player !== 'undefined';

            // -------- Engine-aware "loaded" markers (high confidence) --------
            // Unity instance: createUnityInstance / UnityLoader.instantiate
            // either resolve a promise (modern Unity) or assign window.unityInstance.
            const unityInstanceLoaded = (
                typeof window.unityInstance !== 'undefined' && window.unityInstance !== null
                && (window.unityInstance.Module || window.unityInstance.SendMessage)
            ) ? true : false;
            // Ruffle: <ruffle-player> exposes .isPlaying and .metadata once ready.
            let ruffleReady = false;
            try {
                const ruffles = document.querySelectorAll('ruffle-player, ruffle-embed, ruffle-object');
                for (const r of ruffles) {
                    if (r && (r.isPlaying === true || r.metadata)) { ruffleReady = true; break; }
                }
            } catch(_) {}
            // EmulatorJS: EJS_emulator gets populated once the ROM starts. Some
            // builds expose EJS_player as a singleton with a .ready property.
            let ejsStarted = false;
            try {
                if (typeof window.EJS_emulator !== 'undefined' && window.EJS_emulator) {
                    ejsStarted = !!(window.EJS_emulator.started || window.EJS_emulator.gameManager);
                }
                if (!ejsStarted && typeof window.EJS_player !== 'undefined' && window.EJS_player) {
                    ejsStarted = !!(window.EJS_player.ready || window.EJS_player.emulator);
                }
            } catch(_) {}
            // Godot: Engine.startGame resolves and sets window.engine.requestQuit
            // / window.Module._init_audio_input. Either signal means it's live.
            let godotReady = false;
            try {
                if (typeof window.engine !== 'undefined' && window.engine && window.engine.requestQuit) godotReady = true;
                else if (typeof window.Engine !== 'undefined' && window.Engine && window.Engine.RuntimeEnvironment) godotReady = true;
            } catch(_) {}
            // Phaser: window.Phaser.Game instances expose .isRunning / .scene.
            let phaserReady = false;
            try {
                if (typeof window.Phaser !== 'undefined' && window.Phaser.GAMES && window.Phaser.GAMES.length) {
                    for (const g of window.Phaser.GAMES) {
                        if (g && g.isRunning) { phaserReady = true; break; }
                    }
                }
            } catch(_) {}

            // -------- AudioContext detection --------
            // Many games create an AudioContext during boot; once it's in
            // 'running' state, the game has reached at least the splash/menu.
            // We can't read other code's existing contexts directly, but most
            // engines stash them on a known global (Unity = Module.SDL2 audio
            // setup hooks a window-level resume; Ruffle uses an internal one).
            // We probe by counting how many ACs exist via the AudioContext
            // constructor hook the page may have set up.
            let audioContextRunning = false;
            let audioContextCount = 0;
            try {
                // Some engines stash their AC on window.audioContext / window._ac
                const candidates = [window.audioContext, window._ac, window.audioCtx, window.ac];
                for (const ac of candidates) {
                    if (ac && typeof ac.state === 'string') {
                        audioContextCount += 1;
                        if (ac.state === 'running') audioContextRunning = true;
                    }
                }
            } catch(_) {}

            // Sample the first canvas at low resolution to detect "stuck black
            // square" — a canvas with surface but no rendering.
            let canvasHash = '';
            let canvasNonzeroPixels = 0;
            let canvasIsWebGL = false;
            let canvasRAFTicks = 0;
            let canvasPixelVariance = 0;
            const c = document.querySelector('canvas, #unity-canvas, #game canvas');
            try {
                if (c && c.width && c.height) {
                    // Detect WebGL backing without forcing context creation.
                    let gl = null;
                    try { gl = c.getContext('webgl2', { preserveDrawingBuffer: false }) ||
                                c.getContext('webgl',  { preserveDrawingBuffer: false }) ||
                                c.getContext('experimental-webgl', { preserveDrawingBuffer: false }); } catch(_) {}
                    canvasIsWebGL = !!gl;

                    const w = Math.min(c.width, 16);
                    const h = Math.min(c.height, 16);
                    const off = document.createElement('canvas');
                    off.width = w; off.height = h;
                    const ctx = off.getContext('2d');
                    if (ctx) {
                        ctx.drawImage(c, 0, 0, w, h);
                        const data = ctx.getImageData(0, 0, w, h).data;
                        let sum = 0;
                        let minLum = 255, maxLum = 0;
                        for (let i = 0; i < data.length; i += 4) {
                            const v = data[i] + data[i+1] + data[i+2];
                            if (v > 0) canvasNonzeroPixels += 1;
                            const lum = (data[i] * 299 + data[i+1] * 587 + data[i+2] * 114) >> 10;
                            if (lum < minLum) minLum = lum;
                            if (lum > maxLum) maxLum = lum;
                            sum = (sum * 31 + v) | 0;
                        }
                        canvasHash = String(sum);
                        canvasPixelVariance = maxLum - minLum;
                    }
                }
            } catch (e) { /* tainted canvas etc. — leave blank */ }
            // Fallback liveness for WebGL canvases (where drawImage can't see
            // the back buffer): count rAF callbacks for ~500ms.
            if (canvasIsWebGL && canvasNonzeroPixels === 0) {
                await new Promise(resolve => {
                    const start = performance.now();
                    const tick = () => {
                        canvasRAFTicks += 1;
                        if (performance.now() - start < 500) requestAnimationFrame(tick);
                        else resolve();
                    };
                    requestAnimationFrame(tick);
                    setTimeout(resolve, 1500); // hard cap if rAF stalls
                });
            }
            return {
                readyState: document.readyState,
                surfaceCount: surfaces,
                bodyTextLength,
                bodyTextSample,
                unityLoadingBar,
                unityProgress,
                hasRuffleGlobal,
                hasRetroGlobal,
                canvasHash,
                canvasNonzeroPixels,
                canvasPixelVariance,
                canvasIsWebGL,
                canvasRAFTicks,
                unityInstanceLoaded,
                ruffleReady,
                ejsStarted,
                godotReady,
                phaserReady,
                audioContextRunning,
                audioContextCount,
            };
        }
        """
    )


def _parse_unity_progress(value: object) -> float:
    """Returns Unity loading bar percent in [0, 100], or -1 if not parsable."""
    if not value:
        return -1.0
    text = str(value).strip()
    if not text:
        return -1.0
    try:
        if text.endswith("%"):
            return float(text[:-1])
        if text.endswith("px"):
            return -1.0  # px-based; can't compare without parent width
        return float(text)
    except ValueError:
        return -1.0


def scan_one_game(context, config: Config, target: GameTarget) -> GameResult:
    page = context.new_page()
    start_time = time.perf_counter()

    critical_issues: List[Issue] = []
    warnings: List[Issue] = []
    dedupe: Set[Tuple[str, str, str, str]] = set()

    runtime_errors: List[str] = []
    saw_external_critical_attempt = False
    saw_emulator_core_load = False
    probe: Dict[str, object] = {}

    def add_issue(severity: str, code: str, message: str, url: str = "") -> None:
        key = (severity, code, message, url)
        if key in dedupe:
            return
        dedupe.add(key)
        issue = Issue(code=code, message=message, severity=severity, url=url)
        if severity == "critical":
            critical_issues.append(issue)
        else:
            warnings.append(issue)

    def on_request(request) -> None:
        nonlocal saw_external_critical_attempt
        url = request.url
        if is_local_request(url, config.port):
            return

        parsed = urlparse(url)
        host = parsed.hostname or ""
        resource_type = request.resource_type

        if parsed.scheme.lower() == "http":
            add_issue("warning", "EXTERNAL_OPTIONAL", "Optional external request detected", url)
            return

        if is_optional_external_host(host) or is_optional_external_url(url):
            add_issue("warning", "EXTERNAL_OPTIONAL", "Optional external request detected", url)
            return

        if resource_type in CRITICAL_RESOURCE_TYPES:
            saw_external_critical_attempt = True
            severity = "critical" if config.strict_external else "warning"
            add_issue(
                severity,
                "EXTERNAL_DEPENDENCY",
                "External dependency requested for game runtime",
                url,
            )
        else:
            add_issue("warning", "EXTERNAL_NONCRITICAL", "External non-critical request detected", url)

    def on_request_failed(request) -> None:
        nonlocal saw_external_critical_attempt
        url = request.url
        failure = request.failure
        if isinstance(failure, dict):
            error_text = str(failure.get("errorText", ""))
        elif failure is None:
            error_text = ""
        else:
            error_text = str(failure)
        parsed = urlparse(url)
        path = unquote(parsed.path.lower())
        resource_type = request.resource_type

        if "err_aborted" in error_text.lower():
            return

        if is_local_request(url, config.port):
            # A request URL containing literal "undefined" or "null" is a
            # smoking-gun bug in the game itself (string interpolation produced
            # garbage). Promote unconditionally so it can never be filtered out.
            if is_obviously_broken_url(url):
                add_issue("critical", "BROKEN_URL_LITERAL", f"Local URL contains literal undefined/null: {url}", url)
                return

            if should_ignore_local_404(path):
                add_issue("warning", "LOCAL_IGNORED_MISSING", "Ignored optional local asset missing", url)
                return

            if is_generated_mirror_path(path):
                add_issue("warning", "LOCAL_MIRROR_REQUEST_FAILED", f"Generated mirror request failed: {error_text}", url)
                return

            if is_critical_local_path(path, resource_type):
                add_issue("critical", "LOCAL_REQUEST_FAILED", f"Critical local request failed: {error_text}", url)
            else:
                add_issue("warning", "LOCAL_REQUEST_FAILED", f"Local request failed: {error_text}", url)
            return

        host = parsed.hostname or ""
        if parsed.scheme.lower() == "http":
            add_issue("warning", "EXTERNAL_OPTIONAL_FAILED", "Optional external request failed", url)
            return

        if is_optional_external_host(host) or is_optional_external_url(url):
            add_issue("warning", "EXTERNAL_OPTIONAL_FAILED", "Optional external request failed", url)
            return

        if resource_type in CRITICAL_RESOURCE_TYPES:
            saw_external_critical_attempt = True
            severity = "critical" if config.strict_external else "warning"
            add_issue(severity, "EXTERNAL_CRITICAL_FAILED", "External runtime dependency failed", url)
        else:
            add_issue("warning", "EXTERNAL_NONCRITICAL_FAILED", "External non-critical request failed", url)

    def on_response(response) -> None:
        nonlocal saw_emulator_core_load
        url = response.url
        parsed = urlparse(url)
        path = unquote(parsed.path.lower())

        if is_local_request(url, config.port):
            if response.status < 400 and "/emulatorjs/cores/" in path and (
                path.endswith(".data") or path.endswith(".wasm")
            ):
                saw_emulator_core_load = True

            if response.status < 400:
                return

            # Same broken-URL guard as on_request_failed: literal "undefined"
            # or "null" in the path means the game's own JS produced garbage.
            if is_obviously_broken_url(url):
                add_issue(
                    "critical",
                    "BROKEN_URL_LITERAL",
                    f"Local URL contains literal undefined/null (HTTP {response.status}): {url}",
                    url,
                )
                return

            if response.status == 501 and path.endswith("index.html"):
                add_issue(
                    "warning",
                    "LOCAL_IGNORED_HTTP",
                    f"Ignored local HTTP {response.status}",
                    url,
                )
                return

            if should_ignore_local_404(path):
                add_issue(
                    "warning",
                    "LOCAL_IGNORED_HTTP",
                    f"Ignored optional local HTTP {response.status}",
                    url,
                )
                return

            if is_generated_mirror_path(path):
                add_issue(
                    "warning",
                    "LOCAL_MIRROR_HTTP",
                    f"Generated mirror local HTTP {response.status}",
                    url,
                )
                return

            if is_critical_local_path(path, response.request.resource_type):
                add_issue(
                    "critical",
                    "LOCAL_HTTP_ERROR",
                    f"Critical local HTTP {response.status}",
                    url,
                )
            else:
                add_issue("warning", "LOCAL_HTTP_ERROR", f"Local HTTP {response.status}", url)
            return

        if response.status >= 400:
            severity = "critical" if config.strict_external else "warning"
            add_issue(severity, "EXTERNAL_HTTP_ERROR", f"External HTTP {response.status}", url)

    def on_console(msg) -> None:
        if msg.type != "error":
            return
        text = msg.text or ""
        if is_noise_console_message(text):
            return
        runtime_errors.append(text)
        if is_noncritical_runtime_message(text):
            add_issue("warning", "RUNTIME_ADVISORY", text)
            return
        add_issue("warning", "CONSOLE_ERROR", text)

    def on_page_error(error) -> None:
        text = str(error)
        if is_noise_console_message(text):
            return
        runtime_errors.append(text)
        if is_noncritical_runtime_message(text):
            add_issue("warning", "RUNTIME_ADVISORY", text)
            return
        add_issue("warning", "PAGE_ERROR", text)

    page.on("request", on_request)
    page.on("requestfailed", on_request_failed)
    page.on("response", on_response)
    page.on("console", on_console)
    page.on("pageerror", on_page_error)

    game_url = build_game_url(config, target)

    # Set up screenshot dump directory if --screenshot-dir was passed. We
    # capture at 5s and 30s — long enough for engines to draw, short enough
    # to keep the run-cost per game bounded.
    screenshot_dir: Optional[Path] = None
    if getattr(config, "screenshot_dir", None):
        run_stamp = time.strftime("%Y%m%d-%H%M%S")
        screenshot_dir = config.screenshot_dir / target.name / run_stamp
        try:
            screenshot_dir.mkdir(parents=True, exist_ok=True)
        except Exception:
            screenshot_dir = None

    def _capture(label: str) -> None:
        if screenshot_dir is None:
            return
        try:
            page.screenshot(path=str(screenshot_dir / f"{label}.png"), full_page=False)
        except Exception:
            pass

    probe_first: Dict[str, object] = {}
    try:
        page.goto(game_url, wait_until="domcontentloaded", timeout=config.timeout_ms)
        page.wait_for_timeout(int(config.wait_seconds * 1000))
        probe_first = probe_page(page)
        _capture("5s")

        # Try to advance past start screens / cookie banners / "Click to play"
        # overlays. Many games render their splash screen and then sit idle
        # until the user clicks something, so a pure passive scan would
        # mark them broken even though they would play fine for a human.
        try_advance_game(page)

        # Adaptive bootstrap wait: Unity / EmulatorJS / Godot are heavy and
        # often haven't finished loading by the default wait_seconds window.
        # Keep waiting if we see signs of an in-progress engine bootstrap.
        engine_extra_ms = compute_engine_extra_wait_ms(probe_first, target)
        if engine_extra_ms > 0:
            page.wait_for_timeout(engine_extra_ms)
            # Second click-through after the engine extra-wait — many Unity
            # builds show a "Tap to start audio" overlay after the loader
            # finishes.
            try_advance_game(page)

        # Smoke / liveness: take a second snapshot a few seconds later. If the
        # canvas hash hasn't changed at all between the two, the game probably
        # isn't actually running — it just rendered a static loading screen.
        page.wait_for_timeout(3500)
        probe = probe_page(page)
        probe["canvasHashFirst"] = probe_first.get("canvasHash", "")
        probe["canvasNonzeroPixelsFirst"] = probe_first.get("canvasNonzeroPixels", 0)
        probe["engineExtraWaitMs"] = engine_extra_ms
        _capture("30s")

        # Interactivity probe: send synthetic input (key + mouse) and take a
        # third snapshot. If the game is genuinely playing, the canvas hash
        # / rAF tick count should change after input. If everything stays
        # identical, the page is "rendered but frozen" — common with games
        # that load a splash screen and silently fail to start. Skipped when
        # we already have critical issues so we don't waste time on a known
        # broken game.
        if not critical_issues:
            try:
                # Focus + canvas-click + arrow key + spacebar — covers most
                # control schemes (WASD games respond to arrow keys via
                # bindings, click-to-start games respond to the click).
                page.mouse.move(640, 400)
                page.mouse.down()
                page.mouse.up()
                page.keyboard.press("Space")
                page.wait_for_timeout(800)
                page.keyboard.press("ArrowRight")
                page.wait_for_timeout(800)
                page.keyboard.press("ArrowDown")
                page.wait_for_timeout(400)
                # Expanded interaction sequence: WASD covers keyboard-controlled
                # games that don't listen to arrow keys; mouse-drag covers
                # drag-to-interact platformers; Enter dismisses splash overlays.
                for key in ("w", "a", "s", "d", "Enter"):
                    try:
                        page.keyboard.press(key)
                        page.wait_for_timeout(120)
                    except Exception:
                        pass
                try:
                    # Mouse-drag across the center of the canvas — catches games
                    # whose only input is dragging (cookie-clicker-style, drag-puzzle).
                    page.mouse.move(640, 400)
                    page.mouse.down()
                    page.mouse.move(640 + 80, 400 + 40, steps=4)
                    page.mouse.up()
                except Exception:
                    pass
                page.wait_for_timeout(400)
                probe_after_input = probe_page(page)
                probe["canvasHashAfterInput"] = probe_after_input.get("canvasHash", "")
                probe["canvasNonzeroPixelsAfterInput"] = probe_after_input.get("canvasNonzeroPixels", 0)
                probe["canvasRAFTicksAfterInput"] = probe_after_input.get("canvasRAFTicks", 0)
            except Exception:
                # Best-effort — if input fails for any reason (page closed,
                # iframe cross-origin, etc.) we just skip the interactivity
                # check and rely on the two earlier probes.
                pass
        _capture("end")
    except PlaywrightTimeoutError as exc:
        add_issue("critical", "NAV_TIMEOUT", f"Navigation timeout: {exc}", game_url)
    except PlaywrightError as exc:
        add_issue("critical", "NAV_ERROR", f"Navigation/playwright error: {exc}", game_url)
    except Exception as exc:
        add_issue("critical", "NAV_EXCEPTION", f"Navigation exception: {exc}", game_url)
    finally:
        page.close()

    has_surface = bool(probe.get("surfaceCount", 0))

    expects_surface = should_require_surface(target, probe)

    # Smoke / liveness check: if the game DOES have a surface but the canvas
    # never rendered any pixels and never changed between the two probes,
    # the game effectively didn't start. This catches "Unity loading bar
    # completes then everything hangs" and "Ruffle loaded the SWF but
    # rendered black".
    canvas_hash = str(probe.get("canvasHash", "") or "")
    canvas_hash_first = str(probe.get("canvasHashFirst", "") or "")
    canvas_pixels = int(probe.get("canvasNonzeroPixels", 0) or 0)
    canvas_pixels_first = int(probe.get("canvasNonzeroPixelsFirst", 0) or 0)
    canvas_unchanged = bool(canvas_hash) and canvas_hash == canvas_hash_first
    canvas_dark = canvas_pixels == 0 and canvas_pixels_first == 0
    # WebGL canvases with preserveDrawingBuffer:false return black via
    # drawImage even when actively rendering. Use rAF ticks as the liveness
    # signal for those — if the page is animating, the game is alive.
    canvas_is_webgl = bool(probe.get("canvasIsWebGL"))
    raf_ticks = int(probe.get("canvasRAFTicks", 0) or 0)
    webgl_alive = canvas_is_webgl and raf_ticks >= 3

    # Interactivity probe results — set only if the interactivity probe ran.
    canvas_hash_after_input = str(probe.get("canvasHashAfterInput", "") or "")
    canvas_pixels_after_input = int(probe.get("canvasNonzeroPixelsAfterInput", 0) or 0)
    raf_ticks_after_input = int(probe.get("canvasRAFTicksAfterInput", 0) or 0)
    canvas_changed_after_input = bool(canvas_hash_after_input) and canvas_hash_after_input != canvas_hash
    canvas_lit_after_input = canvas_pixels_after_input > canvas_pixels
    canvas_animating_after_input = canvas_is_webgl and raf_ticks_after_input >= 3
    interactivity_passed = canvas_changed_after_input or canvas_lit_after_input or canvas_animating_after_input
    # Pixel variance: a frozen canvas with a single static image has very
    # low variance (≤ 10 luminance steps across the sampled region). A
    # game showing literally anything dynamic blows past this trivially.
    pixel_variance = int(probe.get("canvasPixelVariance", 0) or 0)
    canvas_has_variance = pixel_variance >= 8

    # Engine-aware "loaded" markers — much stronger than canvas heuristics
    # because they correspond to the engine's own internal "I'm ready" state.
    # If any of these is true, the game is alive even if the canvas heuristic
    # would have said otherwise (which kills a large class of false positives).
    engine_loaded = (
        bool(probe.get("unityInstanceLoaded"))
        or bool(probe.get("ruffleReady"))
        or bool(probe.get("ejsStarted"))
        or bool(probe.get("godotReady"))
        or bool(probe.get("phaserReady"))
    )
    audio_running = bool(probe.get("audioContextRunning"))

    # Truly responsive if ANY of: passive probes show liveness, interactivity
    # probe shows input response, an engine reports loaded, or AudioContext is
    # running. AudioContext running is a strong "past splash screen" signal.
    is_alive = (
        (not (canvas_unchanged and canvas_dark))
        or webgl_alive
        or interactivity_passed
        or canvas_has_variance
        or engine_loaded
        or audio_running
    )

    if expects_surface and has_surface and not is_alive and not critical_issues:
        add_issue(
            "critical",
            "CANVAS_NEVER_RENDERED",
            "Game canvas exists but rendered no pixels, did not change between probes, and did not respond to input",
            game_url,
        )

    # Rendered error-page detection. The page might load fine, render a canvas,
    # but actually be a "Failed to load" / "404 Not Found" / "This game is no
    # longer available" splash. Look for those phrases in the live body text.
    body_sample = str(probe.get("bodyTextSample", "") or "")
    if body_sample and not critical_issues:
        RUNTIME_ERROR_PHRASES = (
            "page not found", "404 not found", "failed to load",
            "unable to load", "this game is no longer available",
            "game not available", "connection error", "could not connect",
            "access denied", "this content is no longer available",
            "this game has been removed", "404 — file or directory not found",
            "the requested url was not found",
        )
        for phrase in RUNTIME_ERROR_PHRASES:
            if phrase in body_sample:
                add_issue(
                    "critical",
                    "RENDERED_ERROR_PAGE_RUNTIME",
                    f"Page renders error text: \"{phrase}\"",
                    game_url,
                )
                break

    # Unity-specific: if the loading bar appeared and progress never reached
    # ~95% by the second probe, the build is stuck loading.
    unity_progress_pct = _parse_unity_progress(probe.get("unityProgress"))
    if (
        bool(probe.get("unityLoadingBar"))
        and unity_progress_pct >= 0
        and unity_progress_pct < 95.0
        and not critical_issues
    ):
        add_issue(
            "critical",
            "UNITY_LOADING_STUCK",
            f"Unity loading bar stuck at {unity_progress_pct:.0f}%",
            game_url,
        )

    # Escalate to broken if startup is blocked by runtime/external failures and no expected game surface appears.
    if expects_surface and not has_surface and not critical_issues:
        if saw_external_critical_attempt and (runtime_errors or config.strict_external):
            add_issue(
                "critical",
                "INIT_BLOCKED_EXTERNAL",
                "Game did not initialize and attempted critical external runtime dependency",
                game_url,
            )
        elif should_escalate_runtime_error(runtime_errors):
            add_issue(
                "critical",
                "INIT_RUNTIME_ERROR",
                "Game did not initialize due to runtime errors",
                game_url,
            )
        else:
            add_issue(
                "warning",
                "NO_RENDER_SURFACE",
                "No game surface detected after bootstrap wait",
                game_url,
            )

    if target.game_type in {"gba", "snes", "retro"} and not saw_emulator_core_load:
        add_issue(
            "warning",
            "RETRO_CORE_NOT_OBSERVED",
            "No successful EmulatorJS core load observed during wait window",
            game_url,
        )

    # Strict mode can over-report games as broken when only third-party runtime calls fail,
    # even if the game surface has loaded and the local core is present.
    if config.strict_external and has_surface and critical_issues:
        external_only_codes = {"EXTERNAL_DEPENDENCY", "EXTERNAL_CRITICAL_FAILED", "EXTERNAL_HTTP_ERROR"}
        if all(issue.code in external_only_codes for issue in critical_issues):
            downgraded = [
                Issue(code=issue.code, message=issue.message, severity="warning", url=issue.url)
                for issue in critical_issues
            ]
            critical_issues.clear()
            warnings.extend(downgraded)
            add_issue(
                "warning",
                "STRICT_EXTERNAL_DOWNGRADED",
                "External runtime dependency failed but game surface loaded",
                game_url,
            )

    actionable_warnings = [issue for issue in warnings if is_actionable_warning(issue)]
    status = "broken" if critical_issues else ("warning" if actionable_warnings else "ok")
    elapsed = time.perf_counter() - start_time
    return GameResult(
        name=target.name,
        game_type=target.game_type,
        entry_file=target.entry_file,
        status=status,
        elapsed_seconds=elapsed,
        critical_issues=critical_issues,
        warnings=warnings,
        probe=probe,
    )


def make_broken_result(target: GameTarget, elapsed_seconds: float, code: str, message: str, url: str) -> GameResult:
    return GameResult(
        name=target.name,
        game_type=target.game_type,
        entry_file=target.entry_file,
        status="broken",
        elapsed_seconds=elapsed_seconds,
        critical_issues=[Issue(code=code, message=message, severity="critical", url=url)],
        warnings=[],
        probe={},
    )


def scan_one_game_worker(config: Config, target: GameTarget, output_queue) -> None:
    try:
        with sync_playwright() as p:
            launch_args = ["--disable-dev-shm-usage", "--no-sandbox", "--disable-setuid-sandbox"]
            # Second profile: disables GPU + software rasterizer. Catches games
            # whose canvas rendering depends on a particular GPU code path —
            # the resulting divergence with the default profile is the
            # `headless_b` signal in build-game-health.js's 5-lane model.
            if getattr(config, "profile", "chromium-default") == "chromium-no-gpu":
                launch_args.extend(["--disable-gpu", "--disable-software-rasterizer"])
            browser = p.chromium.launch(headless=True, args=launch_args)
            context = browser.new_context(viewport={"width": 1280, "height": 720})
            result = scan_one_game(context, config, target)
            context.close()
            browser.close()

        output_queue.put({"ok": True, "result": result.as_dict()})
    except Exception as exc:
        output_queue.put({"ok": False, "error": str(exc)})


def run_isolated_game_scan(config: Config, target: GameTarget) -> GameResult:
    game_url = build_game_url(config, target)
    start_time = time.perf_counter()

    ctx = mp.get_context("spawn")
    output_queue = ctx.Queue()
    process = ctx.Process(target=scan_one_game_worker, args=(config, target, output_queue))
    process.start()

    try:
        process.join(config.hard_timeout_seconds)
        elapsed = time.perf_counter() - start_time

        if process.is_alive():
            process.terminate()
            process.join(timeout=5)
            if process.is_alive():
                process.kill()
                process.join(timeout=5)
            return make_broken_result(
                target,
                elapsed,
                "SCAN_HARD_TIMEOUT",
                f"Game scan exceeded hard timeout of {config.hard_timeout_seconds:.0f}s",
                game_url,
            )

        if process.exitcode not in (0, None):
            return make_broken_result(
                target,
                elapsed,
                "SCAN_WORKER_CRASH",
                f"Isolated worker exited with code {process.exitcode}",
                game_url,
            )

        payload = None
        try:
            if not output_queue.empty():
                payload = output_queue.get_nowait()
        except Exception:
            payload = None

        if not isinstance(payload, dict):
            return make_broken_result(
                target,
                elapsed,
                "SCAN_WORKER_NO_RESULT",
                "Isolated worker finished without returning a scan result",
                game_url,
            )

        if not payload.get("ok"):
            return make_broken_result(
                target,
                elapsed,
                "SCAN_WORKER_ERROR",
                f"Isolated worker exception: {payload.get('error', 'unknown error')}",
                game_url,
            )

        raw_result = payload.get("result")
        if isinstance(raw_result, dict):
            parsed = GameResult.from_dict(raw_result)
            if parsed.name:
                return parsed

        return make_broken_result(
            target,
            elapsed,
            "SCAN_WORKER_NO_RESULT",
            "Isolated worker returned an invalid scan payload",
            game_url,
        )
    finally:
        try:
            output_queue.close()
        except Exception:
            pass


def scan_one_game_with_retries(config: Config, target: GameTarget) -> GameResult:
    last_result: Optional[GameResult] = None
    for attempt in range(1, config.max_attempts + 1):
        if config.max_attempts > 1:
            print(f"  Attempt {attempt}/{config.max_attempts}...")

        result = run_isolated_game_scan(config, target)
        last_result = result

        has_retryable_critical = any(issue.code in RETRYABLE_SCAN_CODES for issue in result.critical_issues)
        should_retry = result.status == "broken" and has_retryable_critical and attempt < config.max_attempts
        if should_retry:
            lead = result.critical_issues[0].message if result.critical_issues else "retrying after critical failure"
            print(f"  RETRY: {lead}")
            continue

        return result

    if last_result is not None:
        return last_result

    return make_broken_result(
        target,
        0.0,
        "SCAN_WORKER_NO_RESULT",
        "Unexpected empty scan result after retry loop",
        build_game_url(config, target),
    )


def write_outputs(config: Config, results: List[GameResult]) -> None:
    broken = [r for r in results if r.status == "broken"]
    warning = [r for r in results if r.status == "warning"]
    ok = [r for r in results if r.status == "ok"]

    with config.broken_log.open("w", encoding="utf-8") as handle:
        for result in broken:
            details = "; ".join(
                f"{issue.code}: {issue.message}" + (f" ({issue.url})" if issue.url else "")
                for issue in result.critical_issues
            )
            handle.write(f"[{result.name}] {details}\n")

    with config.working_log.open("w", encoding="utf-8") as handle:
        for result in ok:
            handle.write(f"{result.name}\n")

    with config.checked_log.open("w", encoding="utf-8") as handle:
        for result in results:
            handle.write(f"{result.name}\n")

    with config.review_log.open("w", encoding="utf-8") as handle:
        for result in warning:
            ordered = order_warnings_for_output(result.warnings)
            details = "; ".join(
                f"{issue.code}: {issue.message}" + (f" ({issue.url})" if issue.url else "")
                for issue in ordered
            )
            handle.write(f"[{result.name}] {details}\n")

    with config.broken_json.open("w", encoding="utf-8") as handle:
        json.dump([r.as_dict() for r in broken], handle, indent=2)

    with config.report_json.open("w", encoding="utf-8") as handle:
        json.dump([r.as_dict() for r in results], handle, indent=2)


def normalize_marker_content(content: str) -> str:
    lines = content.splitlines(keepends=True)
    filtered = [line for line in lines if line.strip() != BROKEN_MARKER]
    return "".join(filtered)


def sync_broken_markers(config: Config, targets: List[GameTarget], results: List[GameResult]) -> None:
    broken_names = {result.name for result in results if result.status == "broken"}

    for target in targets:
        html_path = config.assets_dir / target.name / target.entry_file
        if not html_path.exists():
            continue

        try:
            original = html_path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        stripped = normalize_marker_content(original)
        if target.name in broken_names:
            updated = f"{BROKEN_MARKER}\n{stripped}"
        else:
            updated = stripped

        if updated != original:
            html_path.write_text(updated, encoding="utf-8")


def run_scan(config: Config) -> List[GameResult]:
    catalog = load_catalog(config.games_list_path)
    targets = collect_targets(config, catalog)
    if not targets:
        print("No games matched the scan filters.")
        return []

    existing_results: List[GameResult] = []
    if config.resume:
        existing_results = load_state_results(config.state_file)
        if existing_results:
            print(f"Loaded checkpoint: {len(existing_results)} completed games from {config.state_file}")

    seen: Set[str] = set()
    deduped_existing: List[GameResult] = []
    for result in existing_results:
        if result.name in seen:
            continue
        seen.add(result.name)
        deduped_existing.append(result)

    completed_names = {result.name for result in deduped_existing}
    remaining_targets = [target for target in targets if target.name not in completed_names]

    if config.resume and not remaining_targets:
        print("Resume requested and all target games were already scanned.")
        write_outputs(config, deduped_existing)
        if config.sync_markers:
            sync_broken_markers(config, targets, deduped_existing)
        return deduped_existing

    OfflineAwareHandler.root_dir = str(config.root_dir)
    server = ThreadingTCPServer(("", config.port), OfflineAwareHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    results: List[GameResult] = list(deduped_existing)

    print(f"Scan server active on port {config.port}")
    print(
        f"Scanning {len(remaining_targets)} remaining games "
        f"(total target set: {len(targets)}) in batches of {config.batch_size}..."
    )
    if config.parallel_workers > 1:
        print(f"Parallel workers: {config.parallel_workers}")

    try:
        batches = split_batches(remaining_targets, config.batch_size)
        for batch_index, batch in enumerate(batches, start=1):
            print(f"\n--- Batch {batch_index}/{len(batches)} ({len(batch)} games) ---")
            if config.parallel_workers == 1:
                for target in batch:
                    print(f"Testing: {target.name} ({target.game_type})")
                    result = scan_one_game_with_retries(config, target)
                    results.append(result)
                    save_state_results(config.state_file, results, len(targets))
                    write_outputs(config, results)

                    if result.status == "broken":
                        lead = result.critical_issues[0].message if result.critical_issues else "hard failure"
                        print(f"  BROKEN: {lead}")
                    elif result.status == "warning":
                        ordered = order_warnings_for_output(result.warnings)
                        lead = ordered[0].message if ordered else "needs review"
                        print(f"  REVIEW: {lead}")
                    else:
                        print("  OK")
                continue

            for target in batch:
                print(f"Queueing: {target.name} ({target.game_type})")

            with ThreadPoolExecutor(max_workers=config.parallel_workers) as executor:
                future_map = {
                    executor.submit(scan_one_game_with_retries, config, target): target
                    for target in batch
                }
                for future in as_completed(future_map):
                    target = future_map[future]
                    try:
                        result = future.result()
                    except Exception as exc:
                        result = make_broken_result(
                            target,
                            0.0,
                            "SCAN_WORKER_ERROR",
                            f"Parallel scan execution exception: {exc}",
                            build_game_url(config, target),
                        )

                    results.append(result)
                    save_state_results(config.state_file, results, len(targets))
                    write_outputs(config, results)

                    if result.status == "broken":
                        lead = result.critical_issues[0].message if result.critical_issues else "hard failure"
                        print(f"Done {target.name}: BROKEN - {lead}")
                    elif result.status == "warning":
                        ordered = order_warnings_for_output(result.warnings)
                        lead = ordered[0].message if ordered else "needs review"
                        print(f"Done {target.name}: REVIEW - {lead}")
                    else:
                        print(f"Done {target.name}: OK")
    finally:
        server.shutdown()
        server.server_close()

    write_outputs(config, results)
    save_state_results(config.state_file, results, len(targets))

    if config.sync_markers:
        sync_broken_markers(config, targets, results)

    broken_count = sum(1 for r in results if r.status == "broken")
    warning_count = sum(1 for r in results if r.status == "warning")
    ok_count = sum(1 for r in results if r.status == "ok")
    print("\nScan complete.")
    print(f"  Broken: {broken_count}")
    print(f"  Needs review: {warning_count}")
    print(f"  OK: {ok_count}")
    print(f"  Broken log: {config.broken_log}")
    print(f"  Checked log: {config.checked_log}")
    print(f"  Review log: {config.review_log}")
    print(f"  Full report: {config.report_json}")

    return results


def main() -> int:
    config = parse_args()
    if not config.assets_dir.exists():
        print(f"Error: Assets folder not found at {config.assets_dir}")
        return 1

    try:
        run_scan(config)
    except FileNotFoundError as exc:
        print(f"Error: {exc}")
        return 1
    except Exception as exc:
        print(f"Scanner failed: {exc}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
