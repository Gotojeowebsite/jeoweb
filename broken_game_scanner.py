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
    re.compile(r"/favicon\.ico$", re.IGNORECASE),
    re.compile(r"\.map$", re.IGNORECASE),
    re.compile(r"^/js/main\.js$", re.IGNORECASE),
    re.compile(r"^/css/main\.css$", re.IGNORECASE),
    re.compile(r"/emulatorjs/cores/reports/[^/]+\.json$", re.IGNORECASE),
    re.compile(r"-legacy-wasm\.data$", re.IGNORECASE),
]

OPTIONAL_EXTERNAL_HOST_PATTERNS = [
    re.compile(r"(^|\.)googletagmanager\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)google-analytics\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)doubleclick\.net$", re.IGNORECASE),
    re.compile(r"(^|\.)googlesyndication\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)fonts\.googleapis\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)gstatic\.com$", re.IGNORECASE),
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
    "source map",
    "favicon.ico",
    "violates the following content security policy",
    "refused to connect because it violates the document's content security policy",
    "failed to load resource: the server responded with a status of 404",
    "error creating webgl renderer: unable to create webgl rendering context",
    "this method is a failsafe, and not officially supported",
)

ADVISORY_WARNING_CODES = {
    "EXTERNAL_OPTIONAL",
    "EXTERNAL_OPTIONAL_FAILED",
    "EXTERNAL_NONCRITICAL",
    "EXTERNAL_NONCRITICAL_FAILED",
    "LOCAL_IGNORED_HTTP",
    "LOCAL_IGNORED_MISSING",
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
    parser.add_argument("--wait-seconds", type=float, default=8.0, help="Time to let each game bootstrap")
    parser.add_argument("--timeout-ms", type=int, default=25000, help="Navigation timeout in milliseconds")
    parser.add_argument(
        "--hard-timeout-seconds",
        type=float,
        default=120.0,
        help="Hard wall-clock timeout per game; timed-out games are marked broken and scan continues",
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
    args = parser.parse_args()

    root_dir = Path.cwd()
    assets_dir = (root_dir / args.assets_dir).resolve()

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
        only_games=set(args.only) if args.only else None,
        strict_external=args.strict_external,
        sync_markers=args.sync_markers,
        broken_log=(root_dir / args.broken_log).resolve(),
        broken_json=(root_dir / args.broken_json).resolve(),
        report_json=(root_dir / args.report_json).resolve(),
        working_log=(root_dir / args.working_log).resolve(),
        checked_log=(root_dir / args.checked_log).resolve(),
        review_log=(root_dir / args.review_log).resolve(),
        resume=args.resume,
        state_file=(root_dir / args.state_file).resolve(),
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


def should_ignore_local_404(path: str) -> bool:
    for pattern in IGNORED_LOCAL_404_PATTERNS:
        if pattern.search(path):
            return True
    return False


def is_critical_local_path(path: str, resource_type: str) -> bool:
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


def probe_page(page) -> Dict[str, object]:
    return page.evaluate(
        """
        () => {
            const surfaces = document.querySelectorAll(
                'canvas, iframe, embed, object, ruffle-player, ruffle-embed, #unity-canvas, #game canvas, #player'
            ).length;
            const bodyTextLength = (document.body?.innerText || '').trim().length;
            const unityLoadingBar = !!document.querySelector('#unity-loading-bar');
            const unityProgress = document.querySelector('#unity-progress-bar-full')?.style?.width || '';
            const hasRuffleGlobal = typeof window.RufflePlayer !== 'undefined';
            const hasRetroGlobal = typeof window.EJS_player !== 'undefined';
            return {
                readyState: document.readyState,
                surfaceCount: surfaces,
                bodyTextLength,
                unityLoadingBar,
                unityProgress,
                hasRuffleGlobal,
                hasRetroGlobal
            };
        }
        """
    )


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

        if is_optional_external_host(host):
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
            if should_ignore_local_404(path):
                add_issue("warning", "LOCAL_IGNORED_MISSING", "Ignored optional local asset missing", url)
                return

            if is_critical_local_path(path, resource_type):
                add_issue("critical", "LOCAL_REQUEST_FAILED", f"Critical local request failed: {error_text}", url)
            else:
                add_issue("warning", "LOCAL_REQUEST_FAILED", f"Local request failed: {error_text}", url)
            return

        host = parsed.hostname or ""
        if is_optional_external_host(host):
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

            if should_ignore_local_404(path):
                add_issue(
                    "warning",
                    "LOCAL_IGNORED_HTTP",
                    f"Ignored optional local HTTP {response.status}",
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
        add_issue("warning", "CONSOLE_ERROR", text)

    def on_page_error(error) -> None:
        text = str(error)
        if is_noise_console_message(text):
            return
        runtime_errors.append(text)
        add_issue("warning", "PAGE_ERROR", text)

    page.on("request", on_request)
    page.on("requestfailed", on_request_failed)
    page.on("response", on_response)
    page.on("console", on_console)
    page.on("pageerror", on_page_error)

    game_url = build_game_url(config, target)

    try:
        page.goto(game_url, wait_until="domcontentloaded", timeout=config.timeout_ms)
        page.wait_for_timeout(int(config.wait_seconds * 1000))
        probe = probe_page(page)
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
            browser = p.chromium.launch(
                headless=True,
                args=["--disable-dev-shm-usage", "--no-sandbox", "--disable-setuid-sandbox"],
            )
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
