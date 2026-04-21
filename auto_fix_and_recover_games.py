#!/usr/bin/env python3
"""Automated game repair + verification + recovery pipeline.

This script processes broken games one-by-one:
1) Applies local repair strategies.
2) Tests the game after each strategy.
3) If still broken, tries recovery from configured source providers.
4) Re-tests recovered game.
5) Logs every action to JSONL + summary JSON.

Important:
- Recovery sources must be configured by the user in a provider file.
- Only use sources you are authorized to mirror/download.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import ssl
import subprocess
import sys
import tempfile
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Set
from urllib.error import HTTPError, URLError
from urllib.parse import quote_plus, unquote, urljoin, urlparse
from urllib.request import Request, urlopen


TRACKING_HOST_PATTERNS = (
    re.compile(r"(^|\.)googletagmanager\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)google-analytics\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)googlesyndication\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)doubleclick\.net$", re.IGNORECASE),
    re.compile(r"(^|\.)googleadservices\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)adservice\.google\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)facebook\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)gstatic\.com$", re.IGNORECASE),
)

NONESSENTIAL_EXTERNAL_HOST_PATTERNS = (
    re.compile(r"(^|\.)acscdn\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)api\.gameanalytics\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)gamemonkey\.org$", re.IGNORECASE),
    re.compile(r"(^|\.)gamedistribution\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)poki\.comsa$", re.IGNORECASE),
    re.compile(r"(^|\.)doubleclick\.netsa$", re.IGNORECASE),
    re.compile(r"(^|\.)googleapis\.comsa$", re.IGNORECASE),
    re.compile(r"(^|\.)api\.azgames\.io$", re.IGNORECASE),
    re.compile(r"(^|\.)ubg235\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)raygun\.io$", re.IGNORECASE),
    re.compile(r"(^|\.)crwdcntrl\.net$", re.IGNORECASE),
    re.compile(r"(^|\.)improvedigital\.com$", re.IGNORECASE),
    re.compile(r"(^|\.)cloudflareinsights\.com$", re.IGNORECASE),
)

DOWNLOADABLE_EXTENSIONS = {
    ".js",
    ".mjs",
    ".css",
    ".json",
    ".wasm",
    ".data",
    ".unityweb",
    ".pck",
    ".bin",
    ".pak",
    ".mem",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".webp",
    ".svg",
    ".ico",
    ".mp3",
    ".ogg",
    ".wav",
    ".fnt",
    ".atlas",
    ".xml",
    ".txt",
    ".html",
    ".htm",
    ".swf",
}

URL_ATTR_RE = re.compile(r"(?i)(?:src|href)\s*=\s*['\"]([^'\"]+)['\"]")
CSS_URL_RE = re.compile(r"(?i)url\(\s*['\"]?([^\)'\"]+)['\"]?\s*\)")
LOCALHOST_ISSUE_RE = re.compile(r"https?://(?:localhost|127\.0\.0\.1):\d+/(.+)", re.IGNORECASE)
SCRIPT_TAG_WITH_SRC_RE = re.compile(r"(?is)<script\b[^>]*\bsrc\s*=\s*['\"]([^'\"]+)['\"][^>]*>\s*</script>")
LINK_TAG_WITH_HREF_RE = re.compile(r"(?is)<link\b[^>]*\bhref\s*=\s*['\"]([^'\"]+)['\"][^>]*>")
ABS_HTTP_URL_RE = re.compile(r"https?://[^\s\"'<>\)]+", re.IGNORECASE)

TEXT_MIRROR_EXTENSIONS = {".html", ".htm", ".js", ".mjs", ".css", ".json", ".txt"}

GLOBAL_OPTIONAL_STUBS: Dict[str, str] = {
    "/assets/scripts/game.js": "/* optional local stub: assets/scripts/game.js */\n",
    "/assets/promo/promo.js": "/* optional local stub: assets/promo/promo.js */\n",
    "/cdn-cgi/challenge-platform/scripts/jsd/main.js": "/* optional local stub: cloudflare challenge script */\n",
}


@dataclass
class Config:
    root_dir: Path
    assets_dir: Path
    scan_report: Path
    scanner_script: Path
    providers_file: Optional[Path]
    log_jsonl: Path
    summary_json: Path
    maintenance_json: Path
    overrides_json: Path
    lock_file: Path
    max_games: Optional[int]
    force_lock: bool
    include_warning: bool
    accept_warning_as_fixed: bool
    strict_external_test: bool
    test_wait_seconds: float
    test_timeout_ms: int
    hard_timeout_seconds: float
    validation_call_timeout_seconds: float
    allow_insecure_ssl_fallback: bool
    dry_run: bool


class JsonLogger:
    def __init__(self, path: Path) -> None:
        self.path = path
        self.path.parent.mkdir(parents=True, exist_ok=True)

    def log(self, level: str, game: str, step: str, message: str, **data) -> None:
        payload = {
            "ts": int(time.time()),
            "level": level,
            "game": game,
            "step": step,
            "message": message,
            "data": data,
        }
        with self.path.open("a", encoding="utf-8") as handle:
            handle.write(json.dumps(payload, ensure_ascii=True) + "\n")


def parse_args() -> Config:
    parser = argparse.ArgumentParser(
        description="Fix broken games one-by-one, validate each game, then attempt recovery from configured sources."
    )
    parser.add_argument("--assets-dir", default="Assets", help="Assets directory")
    parser.add_argument("--scan-report", default="scan_results.json", help="Broken scanner report JSON")
    parser.add_argument("--scanner-script", default="broken_game_scanner.py", help="Scanner script used for validation")
    parser.add_argument(
        "--providers-file",
        default="recovery_sources.json",
        help="Recovery source provider config file (optional)",
    )
    parser.add_argument("--log-jsonl", default="auto_fix_recovery_log.jsonl", help="JSONL execution log")
    parser.add_argument("--summary-json", default="auto_fix_recovery_summary.json", help="Summary output JSON")
    parser.add_argument(
        "--maintenance-json",
        default="maintenance_status.json",
        help="Maintenance status output JSON used by homepage",
    )
    parser.add_argument(
        "--overrides-json",
        default="maintenance_overrides.json",
        help="Optional manual maintenance overrides file",
    )
    parser.add_argument("--lock-file", default=".auto_fix_and_recover.lock", help="Lock file path")
    parser.add_argument("--force-lock", action="store_true", help="Ignore existing active lock and continue")
    parser.add_argument("--max-games", type=int, default=None, help="Limit games processed")
    parser.add_argument("--include-warning", action="store_true", help="Include warning-status games from scan report")
    parser.add_argument(
        "--accept-warning-as-fixed",
        action="store_true",
        help="Treat scanner warning status as fixed for pass/fail decisions",
    )
    parser.add_argument(
        "--strict-external-test",
        action="store_true",
        help="Validate each game with --strict-external after fixes",
    )
    parser.add_argument("--test-wait-seconds", type=float, default=5.0, help="Per-game scanner wait-seconds")
    parser.add_argument("--test-timeout-ms", type=int, default=20000, help="Per-game scanner timeout-ms")
    parser.add_argument(
        "--hard-timeout-seconds",
        type=float,
        default=60.0,
        help="Per-game hard timeout passed to scanner",
    )
    parser.add_argument(
        "--validation-call-timeout-seconds",
        type=float,
        default=240.0,
        help="Hard timeout for each scanner subprocess call",
    )
    parser.add_argument(
        "--disable-insecure-ssl-fallback",
        action="store_true",
        help="Disable fallback download retry with insecure SSL context when certificate verification fails",
    )
    parser.add_argument("--dry-run", action="store_true", help="Log actions without modifying files/downloading")
    args = parser.parse_args()

    root_dir = Path.cwd()
    providers = (root_dir / args.providers_file).resolve() if args.providers_file else None
    return Config(
        root_dir=root_dir,
        assets_dir=(root_dir / args.assets_dir).resolve(),
        scan_report=(root_dir / args.scan_report).resolve(),
        scanner_script=(root_dir / args.scanner_script).resolve(),
        providers_file=providers if providers and providers.exists() else None,
        log_jsonl=(root_dir / args.log_jsonl).resolve(),
        summary_json=(root_dir / args.summary_json).resolve(),
        maintenance_json=(root_dir / args.maintenance_json).resolve(),
        overrides_json=(root_dir / args.overrides_json).resolve(),
        lock_file=(root_dir / args.lock_file).resolve(),
        max_games=args.max_games if args.max_games and args.max_games > 0 else None,
        force_lock=args.force_lock,
        include_warning=args.include_warning,
        accept_warning_as_fixed=args.accept_warning_as_fixed,
        strict_external_test=args.strict_external_test,
        test_wait_seconds=max(args.test_wait_seconds, 0.1),
        test_timeout_ms=max(args.test_timeout_ms, 1000),
        hard_timeout_seconds=max(args.hard_timeout_seconds, 5.0),
        validation_call_timeout_seconds=max(args.validation_call_timeout_seconds, 10.0),
        allow_insecure_ssl_fallback=not args.disable_insecure_ssl_fallback,
        dry_run=args.dry_run,
    )


def pid_exists(pid: int) -> bool:
    if pid <= 0:
        return False
    try:
        os.kill(pid, 0)
    except OSError:
        return False
    return True


def acquire_lock(cfg: Config) -> None:
    lock_path = cfg.lock_file
    lock_path.parent.mkdir(parents=True, exist_ok=True)
    current_pid = os.getpid()

    if lock_path.exists() and not cfg.force_lock:
        try:
            payload = json.loads(lock_path.read_text(encoding="utf-8"))
        except Exception:
            payload = {}

        other_pid = int(payload.get("pid", 0) or 0)
        if other_pid and other_pid != current_pid and pid_exists(other_pid):
            raise RuntimeError(
                f"Another supervisor run is active (pid={other_pid}). "
                f"Stop it or rerun with --force-lock if it is stale."
            )

    lock_path.write_text(
        json.dumps(
            {
                "pid": current_pid,
                "started_at": int(time.time()),
                "cwd": str(cfg.root_dir),
            },
            indent=2,
        ),
        encoding="utf-8",
    )


def release_lock(cfg: Config) -> None:
    lock_path = cfg.lock_file
    if not lock_path.exists():
        return

    try:
        payload = json.loads(lock_path.read_text(encoding="utf-8"))
    except Exception:
        payload = {}

    owner = int(payload.get("pid", 0) or 0)
    if owner in {0, os.getpid()}:
        try:
            lock_path.unlink()
        except OSError:
            pass


def kill_process_tree(pid: int) -> None:
    if pid <= 0:
        return

    # On Windows, taskkill /T reliably kills child processes started by the scanner.
    subprocess.run(
        ["taskkill", "/PID", str(pid), "/T", "/F"],
        capture_output=True,
        text=True,
        timeout=20,
        check=False,
    )


def load_scan_targets(cfg: Config) -> List[Dict[str, object]]:
    if not cfg.scan_report.exists():
        raise FileNotFoundError(f"Scan report not found: {cfg.scan_report}")

    with cfg.scan_report.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)

    if not isinstance(payload, list):
        raise ValueError("scan report must be a JSON list")

    allowed_status = {"broken"}
    if cfg.include_warning:
        allowed_status.add("warning")

    out = []
    for item in payload:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name", "")).strip()
        status = str(item.get("status", "")).strip().lower()
        if not name or status not in allowed_status:
            continue
        out.append(item)

    out.sort(key=lambda x: str(x.get("name", "")).lower())
    if cfg.max_games:
        out = out[: cfg.max_games]
    return out


def is_tracking_host(host: str) -> bool:
    if not host:
        return False
    for pattern in TRACKING_HOST_PATTERNS:
        if pattern.search(host):
            return True
    return False


def is_nonessential_external_host(host: str) -> bool:
    if not host:
        return False
    for pattern in NONESSENTIAL_EXTERNAL_HOST_PATTERNS:
        if pattern.search(host):
            return True
    return False


def is_local_runtime_host(host: str) -> bool:
    normalized = (host or "").strip().lower()
    return normalized in {"localhost", "127.0.0.1", "::1", "0.0.0.0"}


def has_downloadable_extension(path: str) -> bool:
    ext = Path(path).suffix.lower()
    return ext in DOWNLOADABLE_EXTENSIONS


def is_ssl_verify_error(exc: Exception) -> bool:
    text = str(exc)
    if "CERTIFICATE_VERIFY_FAILED" in text:
        return True
    if isinstance(exc, URLError) and isinstance(getattr(exc, "reason", None), ssl.SSLCertVerificationError):
        return True
    if isinstance(exc, ssl.SSLCertVerificationError):
        return True
    return False


DEAD_HOST_FAIL_THRESHOLD = 3
_DEAD_HOSTS: Dict[str, int] = {}


def _host_of(url: str) -> str:
    try:
        return (urlparse(url).netloc or "").lower()
    except Exception:
        return ""


def is_host_dead(url: str) -> bool:
    host = _host_of(url)
    if not host:
        return False
    return _DEAD_HOSTS.get(host, 0) >= DEAD_HOST_FAIL_THRESHOLD


def mark_host_dead(url: str) -> None:
    host = _host_of(url)
    if not host:
        return
    _DEAD_HOSTS[host] = _DEAD_HOSTS.get(host, 0) + 1


def reset_dead_host_cache() -> None:
    _DEAD_HOSTS.clear()


def dead_host_snapshot() -> Dict[str, int]:
    return dict(_DEAD_HOSTS)


class DeadHostError(RuntimeError):
    """Raised when a fetch is short-circuited because host is marked dead for the run."""


def fetch_bytes(url: str, timeout: float = 30.0, allow_insecure_ssl_fallback: bool = True) -> bytes:
    if is_host_dead(url):
        raise DeadHostError(f"host cached as dead for this run: {_host_of(url)}")

    req = Request(
        url,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
            ),
            "Accept": "*/*",
        },
    )
    try:
        with urlopen(req, timeout=timeout) as resp:
            return resp.read()
    except Exception as exc:
        if not allow_insecure_ssl_fallback or not is_ssl_verify_error(exc):
            mark_host_dead(url)
            raise

        insecure_ctx = ssl._create_unverified_context()
        try:
            with urlopen(req, timeout=timeout, context=insecure_ctx) as resp:
                return resp.read()
        except Exception:
            mark_host_dead(url)
            raise


def probe_provider_host(url: str, timeout: float = 6.0) -> bool:
    """Fast HEAD-like GET to check a provider's host is reachable. Returns True if 2xx/3xx/4xx
    (anything that proves the host answered). Returns False on DNS/connect/timeout errors."""
    try:
        fetch_bytes(url, timeout=timeout, allow_insecure_ssl_fallback=True)
        return True
    except HTTPError:
        # Host answered with an HTTP error — still reachable, still useful for pattern probing.
        return True
    except DeadHostError:
        return False
    except Exception:
        return False


def sanitize_rel_path(path_value: str, default_name: str = "index.html") -> str:
    clean = unquote(path_value or "")
    clean = clean.split("?", 1)[0].split("#", 1)[0]
    clean = clean.lstrip("/")
    if not clean or clean.endswith("/"):
        clean = clean + default_name

    safe_parts: List[str] = []
    for part in Path(clean).parts:
        if part in {"", ".", ".."}:
            continue
        safe = re.sub(r"[^A-Za-z0-9._-]", "_", part)
        if safe:
            safe_parts.append(safe)

    if not safe_parts:
        return default_name
    return str(Path(*safe_parts)).replace("\\", "/")


def safe_rel_from_url(url: str, prefix: str = "_external_mirror", include_host: bool = True) -> str:
    parsed = urlparse(url)
    rel_path = sanitize_rel_path(parsed.path or "")

    root = Path(prefix) if prefix else Path()
    if include_host:
        host = re.sub(r"[^A-Za-z0-9._-]", "_", parsed.netloc or "unknown-host")
        root = root / host

    return str(root / Path(rel_path)).replace("\\", "/")


def find_entry_file(game_dir: Path, record: Dict[str, object]) -> Optional[Path]:
    entry = str(record.get("entry_file", "")).strip()
    if entry:
        candidate = (game_dir / entry).resolve()
        if candidate.exists() and candidate.is_file():
            return candidate

    index = game_dir / "index.html"
    if index.exists():
        return index

    htmls = sorted(game_dir.rglob("*.html"))
    if htmls:
        return htmls[0]
    return None


def backup_once(path: Path, suffix: str = ".bak.auto_fix") -> None:
    backup = path.with_name(path.name + suffix)
    if backup.exists():
        return
    shutil.copy2(path, backup)


def extract_issue_urls(record: Dict[str, object], include_local_runtime: bool = False) -> List[str]:
    urls: List[str] = []
    for bucket in ("critical_issues", "warnings"):
        items = record.get(bucket, [])
        if not isinstance(items, list):
            continue
        for issue in items:
            if not isinstance(issue, dict):
                continue
            url = str(issue.get("url", "")).strip()
            if not (url.startswith("http://") or url.startswith("https://")):
                continue

            parsed = urlparse(url)
            if not include_local_runtime and is_local_runtime_host(parsed.hostname or ""):
                continue

            urls.append(url)
    return sorted(set(urls))


def extract_html_refs(html: str) -> List[str]:
    refs = []
    refs.extend(URL_ATTR_RE.findall(html))
    refs.extend(CSS_URL_RE.findall(html))
    return sorted(set(r.strip() for r in refs if r and r.strip()))


def normalize_absolute_ref(ref: str) -> str:
    value = str(ref or "").strip()
    if value.startswith("//"):
        return "https:" + value
    return value


def should_strip_nonessential_ref(ref: str) -> bool:
    candidate = normalize_absolute_ref(ref)
    if not candidate.startswith(("http://", "https://")):
        return False

    parsed = urlparse(candidate)
    host = parsed.hostname or ""
    low_path = (parsed.path or "").lower()

    if is_tracking_host(host) or is_nonessential_external_host(host):
        return True
    if host.endswith(".comsa") or host.endswith(".netsa"):
        return True
    if "sockjs-node" in low_path or "challenge-platform" in low_path:
        return True
    return False


def strip_nonessential_external_refs(
    cfg: Config,
    game: str,
    entry_file: Path,
    logger: JsonLogger,
) -> int:
    step = "strip_nonessential_external_refs"
    html = entry_file.read_text(encoding="utf-8", errors="ignore")
    removed = 0

    def script_repl(match: re.Match) -> str:
        nonlocal removed
        src = match.group(1)
        if should_strip_nonessential_ref(src):
            removed += 1
            return ""
        return match.group(0)

    def link_repl(match: re.Match) -> str:
        nonlocal removed
        href = match.group(1)
        if should_strip_nonessential_ref(href):
            removed += 1
            return ""
        return match.group(0)

    updated = SCRIPT_TAG_WITH_SRC_RE.sub(script_repl, html)
    updated = LINK_TAG_WITH_HREF_RE.sub(link_repl, updated)

    if removed and updated != html:
        if cfg.dry_run:
            logger.log("info", game, step, "dry-run strip skipped", removed=removed, file=str(entry_file))
        else:
            backup_once(entry_file)
            entry_file.write_text(updated, encoding="utf-8")
            logger.log("info", game, step, "removed nonessential external refs", removed=removed, file=str(entry_file))

    return removed


def should_consider_external_url(url: str) -> bool:
    try:
        parsed = urlparse(url)
        host = parsed.hostname or ""
    except ValueError:
        return False

    if parsed.scheme not in {"http", "https"}:
        return False
    if is_local_runtime_host(host):
        return False
    if is_tracking_host(host):
        return False
    if is_nonessential_external_host(host):
        return False
    if host.endswith((".comsa", ".netsa")):
        return False

    if len(parsed.query or "") > 300 and not has_downloadable_extension(parsed.path):
        return False

    return has_downloadable_extension(parsed.path)


def create_optional_global_stubs(cfg: Config, game: str, record: Dict[str, object], logger: JsonLogger) -> int:
    step = "create_optional_global_stubs"
    changed = 0

    for url in extract_issue_urls(record, include_local_runtime=True):
        parsed = urlparse(url)
        host = (parsed.hostname or "").lower()
        if host not in {"localhost", "127.0.0.1"}:
            continue

        key = (parsed.path or "").strip().lower()
        if key not in GLOBAL_OPTIONAL_STUBS:
            continue

        rel = key.lstrip("/")
        out_path = (cfg.root_dir / rel).resolve()
        if not str(out_path).startswith(str(cfg.root_dir.resolve())):
            continue
        if out_path.exists() and out_path.stat().st_size > 0:
            continue

        if cfg.dry_run:
            logger.log("info", game, step, "dry-run stub skipped", path=str(out_path))
            changed += 1
            continue

        out_path.parent.mkdir(parents=True, exist_ok=True)
        out_path.write_text(GLOBAL_OPTIONAL_STUBS[key], encoding="utf-8")
        logger.log("info", game, step, "created optional stub", path=str(out_path), source_url=url)
        changed += 1

    return changed


def download_to_path(
    url: str,
    out_path: Path,
    dry_run: bool,
    logger: JsonLogger,
    game: str,
    step: str,
    allow_insecure_ssl_fallback: bool = True,
) -> bool:
    if dry_run:
        logger.log("info", game, step, "dry-run download skipped", url=url, path=str(out_path))
        return True

    try:
        data = fetch_bytes(url, allow_insecure_ssl_fallback=allow_insecure_ssl_fallback)
    except (HTTPError, URLError, TimeoutError, OSError, ValueError) as exc:
        logger.log("warning", game, step, "download failed", url=url, error=str(exc))
        return False

    out_path.parent.mkdir(parents=True, exist_ok=True)
    tmp = out_path.with_suffix(out_path.suffix + ".tmp")
    with tmp.open("wb") as handle:
        handle.write(data)
    os.replace(tmp, out_path)

    logger.log("info", game, step, "downloaded", url=url, path=str(out_path), bytes=len(data))
    return True


def mirror_external_assets(
    cfg: Config,
    game: str,
    record: Dict[str, object],
    entry_file: Path,
    logger: JsonLogger,
) -> int:
    step = "mirror_external_assets"
    html = entry_file.read_text(encoding="utf-8", errors="ignore")
    refs = extract_html_refs(html)
    issue_urls = extract_issue_urls(record)

    external_urls: Set[str] = set(issue_urls)
    for ref in refs:
        if ref.startswith("http://") or ref.startswith("https://"):
            external_urls.add(ref)

    replacements: Dict[str, str] = {}
    downloaded = 0

    for url in sorted(external_urls):
        if not should_consider_external_url(url):
            continue

        rel = safe_rel_from_url(url, prefix="_external_mirror")
        out_path = entry_file.parent / rel
        if out_path.exists() and out_path.stat().st_size > 0:
            replacements[url] = rel
            continue

        if download_to_path(
            url,
            out_path,
            cfg.dry_run,
            logger,
            game,
            step,
            allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
        ):
            replacements[url] = rel
            downloaded += 1

    if replacements:
        updated = html
        for src, dst in replacements.items():
            updated = updated.replace(src, dst)

        if updated != html and not cfg.dry_run:
            backup_once(entry_file)
            entry_file.write_text(updated, encoding="utf-8")
            logger.log("info", game, step, "patched html with mirrored references", replacements=len(replacements))

    return downloaded


def normalize_discovered_absolute_url(url: str) -> str:
    cleaned = (url or "").strip()
    while cleaned and cleaned[-1] in {",", ";", ")", "]", "}"}:
        cleaned = cleaned[:-1]
    return cleaned


def extract_hosts_from_issue_urls(record: Dict[str, object]) -> Set[str]:
    out: Set[str] = set()
    for url in extract_issue_urls(record):
        try:
            host = (urlparse(url).hostname or "").strip().lower()
        except ValueError:
            host = ""
        if host:
            out.add(host)
    return out


def discover_existing_mirror_hosts(game_dir: Path) -> Set[str]:
    out: Set[str] = set()
    mirror_root = game_dir / "_external_mirror"
    if not mirror_root.exists() or not mirror_root.is_dir():
        return out

    for child in mirror_root.iterdir():
        if child.is_dir():
            out.add(child.name.strip().lower())
    return out


def mirror_external_refs_in_text_assets(
    cfg: Config,
    game: str,
    record: Dict[str, object],
    game_dir: Path,
    logger: JsonLogger,
) -> int:
    step = "mirror_external_refs_in_text_assets"
    if not game_dir.exists():
        return 0

    downloaded = 0
    scanned_files = 0
    patched_files = 0

    allowed_hosts = extract_hosts_from_issue_urls(record) | discover_existing_mirror_hosts(game_dir)
    if not allowed_hosts:
        logger.log("info", game, step, "no relevant mirror hosts discovered")
        return 0

    for candidate in sorted(game_dir.rglob("*")):
        if not candidate.is_file():
            continue
        if candidate.suffix.lower() not in TEXT_MIRROR_EXTENSIONS:
            continue
        # Skip huge files to keep repair runs bounded.
        try:
            if candidate.stat().st_size > 3_000_000:
                continue
        except OSError:
            continue

        scanned_files += 1
        text = candidate.read_text(encoding="utf-8", errors="ignore")
        discovered = {
            normalize_discovered_absolute_url(u)
            for u in ABS_HTTP_URL_RE.findall(text)
            if u and normalize_discovered_absolute_url(u)
        }
        if not discovered:
            continue

        replacements: Dict[str, str] = {}
        for url in sorted(discovered):
            if not should_consider_external_url(url):
                continue

            try:
                host = (urlparse(url).hostname or "").strip().lower()
            except ValueError:
                continue
            if not host or host not in allowed_hosts:
                continue

            out_rel = safe_rel_from_url(url, prefix="_external_mirror")
            out_path = game_dir / out_rel
            if not (out_path.exists() and out_path.stat().st_size > 0):
                if download_to_path(
                    url,
                    out_path,
                    cfg.dry_run,
                    logger,
                    game,
                    step,
                    allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
                ):
                    downloaded += 1

            if out_path.exists() and out_path.stat().st_size > 0:
                rel_from_file = os.path.relpath(out_path, start=candidate.parent).replace("\\", "/")
                replacements[url] = rel_from_file

        if not replacements:
            continue

        updated = text
        for src, dst in replacements.items():
            updated = updated.replace(src, dst)

        if updated != text:
            patched_files += 1
            if cfg.dry_run:
                logger.log("info", game, step, "dry-run text rewrite skipped", file=str(candidate))
            else:
                backup_once(candidate)
                candidate.write_text(updated, encoding="utf-8")

    logger.log(
        "info",
        game,
        step,
        "text asset mirror pass complete",
        allowed_hosts=sorted(allowed_hosts),
        scanned_files=scanned_files,
        patched_files=patched_files,
        downloaded=downloaded,
    )
    return downloaded


def extract_missing_local_paths(game: str, record: Dict[str, object], root_dir: Path) -> List[Path]:
    paths: List[Path] = []
    for bucket in ("critical_issues", "warnings"):
        issues = record.get(bucket, [])
        if not isinstance(issues, list):
            continue

        for issue in issues:
            if not isinstance(issue, dict):
                continue
            code = str(issue.get("code", ""))
            if code not in {"LOCAL_HTTP_ERROR", "LOCAL_REQUEST_FAILED"}:
                continue

            url = str(issue.get("url", "")).strip()
            match = LOCALHOST_ISSUE_RE.match(url)
            if not match:
                continue

            rel = match.group(1)
            rel = rel.split("?", 1)[0].split("#", 1)[0]
            if not rel.lower().startswith("assets/"):
                continue
            rel_path = Path(rel)
            if len(rel_path.parts) < 2:
                continue
            if rel_path.parts[1].lower() != game.lower():
                continue

            local_path = (root_dir / rel_path).resolve()
            if str(local_path).startswith(str(root_dir.resolve())):
                paths.append(local_path)

    deduped = []
    seen = set()
    for p in paths:
        key = str(p).lower()
        if key in seen:
            continue
        seen.add(key)
        deduped.append(p)
    return deduped


def fill_missing_files_from_issue_urls(
    cfg: Config,
    game: str,
    record: Dict[str, object],
    logger: JsonLogger,
) -> int:
    step = "fill_missing_files_from_issue_urls"
    missing_paths = extract_missing_local_paths(game, record, cfg.root_dir)
    if not missing_paths:
        return 0

    issue_urls = extract_issue_urls(record)
    by_name: Dict[str, List[str]] = {}
    for url in issue_urls:
        parsed = urlparse(url)
        name = Path(parsed.path).name
        if not name:
            continue
        by_name.setdefault(name.lower(), []).append(url)

    fixed = 0
    for local_path in missing_paths:
        if local_path.exists() and local_path.stat().st_size > 0:
            continue

        filename = local_path.name.lower()
        candidates = by_name.get(filename, [])
        if not candidates:
            continue

        for candidate in candidates:
            if download_to_path(
                candidate,
                local_path,
                cfg.dry_run,
                logger,
                game,
                step,
                allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
            ):
                fixed += 1
                break

    return fixed


def reconstruct_mirror_source_urls(local_path: Path, root_dir: Path) -> List[str]:
    try:
        rel = local_path.resolve().relative_to(root_dir.resolve())
    except Exception:
        return []

    parts = list(rel.parts)
    lower_parts = [p.lower() for p in parts]
    if "_external_mirror" not in lower_parts:
        return []

    idx = lower_parts.index("_external_mirror")
    if len(parts) <= idx + 2:
        return []

    host = parts[idx + 1].strip()
    path_tail = "/".join(parts[idx + 2 :]).strip("/")
    if not host or not path_tail:
        return []
    if "/" in host or "\\" in host:
        return []

    candidates = [
        f"https://{host}/{path_tail}",
        f"http://{host}/{path_tail}",
    ]

    out: List[str] = []
    seen: Set[str] = set()
    for url in candidates:
        if url in seen:
            continue
        seen.add(url)
        out.append(url)
    return out


def refill_missing_mirror_files(
    cfg: Config,
    game: str,
    record: Dict[str, object],
    logger: JsonLogger,
) -> int:
    step = "refill_missing_mirror_files"
    missing_paths = extract_missing_local_paths(game, record, cfg.root_dir)
    if not missing_paths:
        return 0

    fixed = 0
    for local_path in missing_paths:
        low = str(local_path).replace("\\", "/").lower()
        if "/_external_mirror/" not in low:
            continue

        if local_path.exists() and local_path.stat().st_size > 0:
            continue

        candidates = reconstruct_mirror_source_urls(local_path, cfg.root_dir)
        if not candidates:
            logger.log(
                "warning",
                game,
                step,
                "could not reconstruct source URL from mirror path",
                path=str(local_path),
            )
            continue

        for url in candidates:
            if download_to_path(
                url,
                local_path,
                cfg.dry_run,
                logger,
                game,
                step,
                allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
            ):
                fixed += 1
                break

    return fixed


def fill_missing_gp_bundle_assets(
    cfg: Config,
    game: str,
    record: Dict[str, object],
    logger: JsonLogger,
) -> int:
    step = "fill_missing_gp_bundle_assets"
    missing_paths = extract_missing_local_paths(game, record, cfg.root_dir)
    if not missing_paths:
        return 0

    fixed = 0
    marker = "/templatedata/gp_bundle/"
    for local_path in missing_paths:
        low = str(local_path).replace("\\", "/").lower()
        idx = low.find(marker)
        if idx < 0:
            continue
        if local_path.exists() and local_path.stat().st_size > 0:
            continue

        original = str(local_path).replace("\\", "/")
        rel = original[idx + len(marker) :].lstrip("/")
        if not rel:
            continue

        candidates = [
            f"https://gs.eponesh.com/sdk/{rel}",
            f"https://s3.eponesh.com/files/gs/sdk/{rel}",
        ]
        for url in candidates:
            if download_to_path(
                url,
                local_path,
                cfg.dry_run,
                logger,
                game,
                step,
                allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
            ):
                fixed += 1
                break

    return fixed


def create_optional_local_asset_placeholders(
    cfg: Config,
    game: str,
    record: Dict[str, object],
    logger: JsonLogger,
) -> int:
    step = "create_optional_local_asset_placeholders"
    missing_paths = extract_missing_local_paths(game, record, cfg.root_dir)
    if not missing_paths:
        return 0

    created = 0
    text_suffixes = {".ini", ".txt", ".save"}
    audio_suffixes = {".mp3", ".ogg", ".wav"}

    for local_path in missing_paths:
        if local_path.exists() and local_path.stat().st_size > 0:
            continue

        low = str(local_path).replace("\\", "/").lower()
        suffix = local_path.suffix.lower()
        optional = False

        if suffix in text_suffixes:
            optional = True
        elif suffix in audio_suffixes:
            optional = True
        elif suffix == ".bin" and "/sound/" in low:
            optional = True

        if not optional:
            continue

        if cfg.dry_run:
            logger.log("info", game, step, "dry-run placeholder skipped", path=str(local_path))
            created += 1
            continue

        local_path.parent.mkdir(parents=True, exist_ok=True)
        if suffix in text_suffixes:
            local_path.write_text("\n", encoding="utf-8")
        else:
            local_path.write_bytes(b"")

        logger.log("info", game, step, "created optional placeholder", path=str(local_path))
        created += 1

    return created


def repair_emulator_cores(cfg: Config, game: str, record: Dict[str, object], logger: JsonLogger) -> int:
    step = "repair_emulator_cores"
    fixed = 0

    for url in extract_issue_urls(record):
        parsed = urlparse(url)
        host = parsed.hostname or ""
        if not parsed.path or "/cores/" not in parsed.path:
            continue
        if is_local_runtime_host(host):
            continue
        if is_tracking_host(host):
            continue

        suffix = parsed.path.split("/cores/", 1)[1].lstrip("/")
        if not suffix:
            continue
        if not has_downloadable_extension(suffix):
            continue

        local_path = (cfg.root_dir / "emulatorjs" / "cores" / suffix).resolve()
        if local_path.exists() and local_path.stat().st_size > 0:
            continue

        if download_to_path(
            url,
            local_path,
            cfg.dry_run,
            logger,
            game,
            step,
            allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
        ):
            fixed += 1

    return fixed


def run_game_validation(cfg: Config, game: str, logger: JsonLogger) -> Dict[str, object]:
    step = "validate_game"
    with tempfile.TemporaryDirectory(prefix="game_doctor_validate_") as tmpdir:
        tmp = Path(tmpdir)
        report_json = tmp / "report.json"
        broken_log = tmp / "broken.txt"
        broken_json = tmp / "broken.json"
        working_log = tmp / "working.txt"
        checked_log = tmp / "checked.txt"
        review_log = tmp / "review.txt"
        state_file = tmp / "state.json"

        cmd = [
            sys.executable,
            str(cfg.scanner_script),
            "--only",
            game,
            "--batch-size",
            "1",
            "--parallel-workers",
            "1",
            "--max-attempts",
            "1",
            "--wait-seconds",
            str(cfg.test_wait_seconds),
            "--timeout-ms",
            str(cfg.test_timeout_ms),
            "--hard-timeout-seconds",
            str(cfg.hard_timeout_seconds),
            "--broken-log",
            str(broken_log),
            "--broken-json",
            str(broken_json),
            "--report-json",
            str(report_json),
            "--working-log",
            str(working_log),
            "--checked-log",
            str(checked_log),
            "--review-log",
            str(review_log),
            "--state-file",
            str(state_file),
        ]
        if cfg.strict_external_test:
            cmd.append("--strict-external")

        started = time.time()
        stdout_text = ""
        stderr_text = ""
        rc = -1
        timed_out = False
        timeout_seconds = max(cfg.validation_call_timeout_seconds, cfg.hard_timeout_seconds * 2)

        proc = subprocess.Popen(
            cmd,
            cwd=str(cfg.root_dir),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
        )
        try:
            stdout_text, stderr_text = proc.communicate(timeout=timeout_seconds)
            rc = proc.returncode
        except subprocess.TimeoutExpired:
            timed_out = True
            kill_process_tree(proc.pid)
            try:
                stdout_text, stderr_text = proc.communicate(timeout=5)
            except Exception:
                stdout_text = stdout_text or ""
                stderr_text = stderr_text or ""
            rc = -9

        elapsed = round(time.time() - started, 3)

        status = "broken"
        lead_issue = "No report produced"
        result_obj: Dict[str, object] = {}

        if timed_out:
            lead_issue = f"VALIDATION_TIMEOUT: scanner exceeded {round(timeout_seconds, 1)}s"
        elif report_json.exists():
            try:
                payload = json.loads(report_json.read_text(encoding="utf-8"))
                if isinstance(payload, list):
                    for item in payload:
                        if isinstance(item, dict) and str(item.get("name", "")).lower() == game.lower():
                            result_obj = item
                            break
                if result_obj:
                    status = str(result_obj.get("status", "broken"))
                    critical = result_obj.get("critical_issues", [])
                    warnings = result_obj.get("warnings", [])
                    if isinstance(critical, list) and critical:
                        first = critical[0] if isinstance(critical[0], dict) else {}
                        lead_issue = f"{first.get('code', 'CRITICAL')}: {first.get('message', 'critical issue')}"
                    elif isinstance(warnings, list) and warnings:
                        first = warnings[0] if isinstance(warnings[0], dict) else {}
                        lead_issue = f"{first.get('code', 'WARNING')}: {first.get('message', 'warning issue')}"
                    else:
                        lead_issue = "No issues detected"
            except Exception as exc:
                lead_issue = f"report parse error: {exc}"

        logger.log(
            "info" if status == "ok" else "warning",
            game,
            step,
            "validation completed",
            rc=rc,
            elapsed_seconds=elapsed,
            status=status,
            lead_issue=lead_issue,
            timed_out=timed_out,
        )

        return {
            "status": status,
            "lead_issue": lead_issue,
            "return_code": rc,
            "elapsed_seconds": elapsed,
            "timed_out": timed_out,
            "stdout_tail": (stdout_text or "")[-2000:],
            "stderr_tail": (stderr_text or "")[-2000:],
            "result": result_obj,
        }


def validation_passed(cfg: Config, status: str) -> bool:
    normalized = (status or "").strip().lower()
    if normalized == "ok":
        return True
    if normalized == "warning" and cfg.accept_warning_as_fixed:
        return True
    return False


def load_recovery_providers(path: Optional[Path]) -> List[Dict[str, object]]:
    if not path or not path.exists():
        return []
    with path.open("r", encoding="utf-8") as handle:
        payload = json.load(handle)
    if not isinstance(payload, list):
        return []
    providers = [p for p in payload if isinstance(p, dict) and not bool(p.get("disabled", False))]

    def sort_key(p: Dict[str, object]) -> float:
        try:
            return float(p.get("priority", 1000))
        except Exception:
            return 1000.0

    providers.sort(key=sort_key)
    return providers


_PROVIDER_HEALTH_CACHE: Dict[str, bool] = {}


def provider_health_ok(provider: Dict[str, object], logger: JsonLogger) -> bool:
    probe_url = str(provider.get("health_probe_url", "")).strip()
    if not probe_url:
        return True
    host = _host_of(probe_url)
    if not host:
        return True
    if host in _PROVIDER_HEALTH_CACHE:
        return _PROVIDER_HEALTH_CACHE[host]
    if is_host_dead(probe_url):
        _PROVIDER_HEALTH_CACHE[host] = False
        return False
    ok = probe_provider_host(probe_url, timeout=6.0)
    _PROVIDER_HEALTH_CACHE[host] = ok
    logger.log(
        "info" if ok else "warning",
        "*",
        "provider_health",
        f"provider host {'reachable' if ok else 'unreachable'}",
        provider=str(provider.get("name", "")),
        host=host,
    )
    return ok


def provider_applies_to(provider: Dict[str, object], game_type: str) -> bool:
    applies = provider.get("applies_to")
    if not applies:
        return True
    if isinstance(applies, list) and applies:
        return str(game_type or "").strip().lower() in {str(t).strip().lower() for t in applies}
    return True


def discover_recovery_candidates(
    game: str,
    providers: List[Dict[str, object]],
    logger: JsonLogger,
    game_type: str = "",
) -> List[str]:
    out: List[str] = []
    skipped_disabled = 0
    skipped_dead = 0
    skipped_type = 0

    for provider in providers:
        ptype = str(provider.get("type", "")).strip().lower()
        pname = str(provider.get("name", "provider")).strip() or "provider"

        if game_type and not provider_applies_to(provider, game_type):
            skipped_type += 1
            continue

        if not provider_health_ok(provider, logger):
            skipped_dead += 1
            continue

        try:
            if ptype == "index-json":
                index_url = str(provider.get("index_url", "")).strip()
                name_field = str(provider.get("name_field", "name")).strip() or "name"
                url_field = str(provider.get("url_field", "url")).strip() or "url"
                if not index_url:
                    continue

                data = json.loads(fetch_bytes(index_url, timeout=20).decode("utf-8", errors="ignore"))
                if isinstance(data, dict):
                    data = data.get("items", [])
                if not isinstance(data, list):
                    continue

                target_slug = slugify(game)
                for row in data:
                    if not isinstance(row, dict):
                        continue
                    rname = str(row.get(name_field, ""))
                    rurl = str(row.get(url_field, ""))
                    if not rurl.startswith(("http://", "https://")):
                        continue
                    if slugify(rname) == target_slug:
                        out.append(rurl)

            elif ptype == "search-html":
                query_url = str(provider.get("query_url", "")).strip()
                result_regex = str(provider.get("result_regex", "")).strip()
                if not query_url or not result_regex:
                    continue

                url = query_url.replace("{query}", quote_plus(game))
                html = fetch_bytes(url, timeout=20).decode("utf-8", errors="ignore")
                matches = re.findall(result_regex, html)
                for m in matches:
                    if isinstance(m, tuple):
                        candidate = m[0]
                    else:
                        candidate = m
                    candidate = str(candidate).strip()
                    if candidate.startswith(("http://", "https://")):
                        out.append(candidate)

            elif ptype == "direct":
                direct_url = str(provider.get("url", "")).strip()
                if direct_url.startswith(("http://", "https://")):
                    out.append(direct_url)

            elif ptype == "pattern":
                template = str(provider.get("url_template", "")).strip()
                if not template:
                    continue

                slug = slugify(game)
                variants = [
                    slug,
                    slug.replace("-", ""),
                    slug.replace("-", "_"),
                ]

                seen_variant: Set[str] = set()
                for variant in variants:
                    if not variant or variant in seen_variant:
                        continue
                    seen_variant.add(variant)

                    candidate = (
                        template.replace("{slug}", variant)
                        .replace("{name}", game)
                        .replace("{query}", quote_plus(game))
                    )
                    if candidate.startswith(("http://", "https://")):
                        out.append(candidate)

        except DeadHostError as exc:
            logger.log("info", game, "discover_candidates", "provider skipped: host marked dead", provider=pname, error=str(exc))
        except Exception as exc:
            logger.log("warning", game, "discover_candidates", "provider query failed", provider=pname, error=str(exc))

    # Deduplicate while preserving order and drop any that resolve to a now-dead host.
    deduped: List[str] = []
    seen: Set[str] = set()
    for url in out:
        if url in seen:
            continue
        if is_host_dead(url):
            continue
        seen.add(url)
        deduped.append(url)

    logger.log(
        "info",
        game,
        "discover_candidates",
        "candidate discovery complete",
        count=len(deduped),
        skipped_dead=skipped_dead,
        skipped_disabled=skipped_disabled,
        skipped_type=skipped_type,
    )
    return deduped


def slugify(name: str) -> str:
    value = name.lower()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    return value.strip("-")


def download_game_snapshot(
    url: str,
    game_dir: Path,
    dry_run: bool,
    logger: JsonLogger,
    game: str,
    allow_insecure_ssl_fallback: bool = True,
) -> bool:
    step = "download_snapshot"
    if dry_run:
        logger.log("info", game, step, "dry-run snapshot download skipped", url=url)
        return True

    try:
        html_bytes = fetch_bytes(
            url,
            timeout=25,
            allow_insecure_ssl_fallback=allow_insecure_ssl_fallback,
        )
        html = html_bytes.decode("utf-8", errors="ignore")
    except Exception as exc:
        logger.log("warning", game, step, "failed to fetch landing page", url=url, error=str(exc))
        return False

    refs = extract_html_refs(html)
    replacements: Dict[str, str] = {}
    downloaded = 0

    allowed_assets = 300

    for ref in refs:
        abs_url = urljoin(url, ref)
        parsed = urlparse(abs_url)
        if parsed.scheme not in {"http", "https"}:
            continue
        if is_tracking_host(parsed.hostname or ""):
            continue

        # Keep URL count bounded.
        if downloaded >= allowed_assets:
            break

        # Download only file-like refs.
        ref_path = parsed.path or ""
        if not has_downloadable_extension(ref_path):
            continue

        # Use stable local paths that preserve relative structure.
        if ref.startswith("http://") or ref.startswith("https://"):
            rel = safe_rel_from_url(abs_url, prefix="_snapshot_mirror", include_host=True)
        elif ref.startswith("/"):
            rel = sanitize_rel_path(ref)
        else:
            rel = sanitize_rel_path(ref)

        out_path = game_dir / rel

        if download_to_path(
            abs_url,
            out_path,
            False,
            logger,
            game,
            step,
            allow_insecure_ssl_fallback=allow_insecure_ssl_fallback,
        ):
            downloaded += 1
            replacements[ref] = rel

    game_dir.mkdir(parents=True, exist_ok=True)
    index_file = game_dir / "index.html"

    updated = html
    for src, dst in replacements.items():
        updated = updated.replace(src, dst)

    index_file.write_text(updated, encoding="utf-8")
    logger.log(
        "info",
        game,
        step,
        "snapshot downloaded",
        url=url,
        assets_downloaded=downloaded,
        rewritten_refs=len(replacements),
    )
    return True


def load_maintenance_overrides(path: Path) -> Dict[str, Set[str]]:
    if not path.exists():
        return {
            "force_healthy": set(),
            "force_maintenance": set(),
        }

    try:
        payload = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        return {
            "force_healthy": set(),
            "force_maintenance": set(),
        }

    def extract_set(key: str) -> Set[str]:
        raw = payload.get(key, []) if isinstance(payload, dict) else []
        if not isinstance(raw, list):
            return set()
        out = set()
        for item in raw:
            name = str(item or "").strip()
            if name:
                out.add(name)
        return out

    return {
        "force_healthy": extract_set("force_healthy"),
        "force_maintenance": extract_set("force_maintenance"),
    }


def get_latest_validation_result(game_result: Dict[str, object]) -> Dict[str, object]:
    attempts = game_result.get("attempts", [])
    if not isinstance(attempts, list):
        return {}

    for attempt in reversed(attempts):
        if not isinstance(attempt, dict):
            continue
        result = attempt.get("result")
        if isinstance(result, dict):
            return result
    return {}


def classify_maintenance_status(
    game: str,
    game_result: Dict[str, object],
    overrides: Dict[str, Set[str]],
) -> Dict[str, object]:
    if game in overrides.get("force_healthy", set()):
        return {"status": "healthy", "reason": "manual_override_healthy"}
    if game in overrides.get("force_maintenance", set()):
        return {"status": "under_maintenance", "reason": "manual_override_maintenance"}

    final_status = str(game_result.get("final_status", "")).strip().lower()
    if final_status in {"ok", "warning"}:
        return {"status": "healthy", "reason": f"final_status_{final_status}"}

    latest = get_latest_validation_result(game_result)
    nested = latest.get("result", {}) if isinstance(latest, dict) else {}
    critical = nested.get("critical_issues", []) if isinstance(nested, dict) else []
    probe = nested.get("probe", {}) if isinstance(nested, dict) else {}
    lead_issue = str(latest.get("lead_issue", "")).strip() if isinstance(latest, dict) else ""

    critical_codes: List[str] = []
    if isinstance(critical, list):
        for item in critical:
            if isinstance(item, dict):
                code = str(item.get("code", "")).strip()
                if code:
                    critical_codes.append(code)

    hard_failure_codes = {
        "LOCAL_HTTP_ERROR",
        "LOCAL_REQUEST_FAILED",
        "NAV_TIMEOUT",
        "NAV_ERROR",
        "NAV_EXCEPTION",
        "SCAN_HARD_TIMEOUT",
        "SCAN_WORKER_CRASH",
        "SCAN_WORKER_NO_RESULT",
        "SCAN_WORKER_ERROR",
        "INIT_RUNTIME_ERROR",
        "INIT_BLOCKED_EXTERNAL",
    }
    external_only_codes = {
        "EXTERNAL_DEPENDENCY",
        "EXTERNAL_CRITICAL_FAILED",
        "EXTERNAL_HTTP_ERROR",
    }

    for code in critical_codes:
        if code in hard_failure_codes or code.startswith("LOCAL_"):
            return {
                "status": "under_maintenance",
                "reason": f"hard_failure_{code.lower()}",
                "lead_issue": lead_issue,
            }

    if critical_codes and all(code in external_only_codes for code in critical_codes):
        surface_count = 0
        ready_state = ""
        if isinstance(probe, dict):
            try:
                surface_count = int(probe.get("surfaceCount", 0) or 0)
            except Exception:
                surface_count = 0
            ready_state = str(probe.get("readyState", "")).strip().lower()

        if surface_count > 0 and ready_state in {"interactive", "complete"}:
            return {
                "status": "healthy",
                "reason": "external_only_but_surface_loaded",
                "lead_issue": lead_issue,
            }

        return {
            "status": "under_maintenance",
            "reason": "external_only_no_surface",
            "lead_issue": lead_issue,
        }

    if critical_codes:
        return {
            "status": "under_maintenance",
            "reason": "critical_issues_present",
            "lead_issue": lead_issue,
        }

    if final_status == "broken":
        return {
            "status": "under_maintenance",
            "reason": "broken_without_issue_details",
            "lead_issue": lead_issue,
        }

    return {"status": "healthy", "reason": "default_healthy"}


def write_maintenance_status(cfg: Config, per_game: Dict[str, Dict[str, object]], logger: JsonLogger) -> Dict[str, object]:
    overrides = load_maintenance_overrides(cfg.overrides_json)
    games: Dict[str, Dict[str, object]] = {}
    counts = {
        "under_maintenance": 0,
        "healthy": 0,
    }

    for game, data in per_game.items():
        decision = classify_maintenance_status(game, data, overrides)
        status = str(decision.get("status", "healthy"))
        if status not in counts:
            counts[status] = 0
        counts[status] += 1
        games[game] = {
            "status": status,
            "reason": decision.get("reason", ""),
            "lead_issue": decision.get("lead_issue", ""),
            "final_status": str(data.get("final_status", "")),
        }

    payload = {
        "generated_at": int(time.time()),
        "source_summary": str(cfg.summary_json),
        "counts": counts,
        "games": games,
    }
    cfg.maintenance_json.write_text(json.dumps(payload, indent=2), encoding="utf-8")

    logger.log(
        "info",
        "*",
        "maintenance_status",
        "maintenance status file updated",
        maintenance_json=str(cfg.maintenance_json),
        under_maintenance=counts.get("under_maintenance", 0),
        healthy=counts.get("healthy", 0),
    )
    return payload


def run_pipeline(cfg: Config) -> Dict[str, object]:
    logger = JsonLogger(cfg.log_jsonl)
    reset_dead_host_cache()
    _PROVIDER_HEALTH_CACHE.clear()
    targets = load_scan_targets(cfg)

    if not targets:
        raise RuntimeError("No target games found in scan report.")

    providers = load_recovery_providers(cfg.providers_file)
    logger.log(
        "info",
        "*",
        "startup",
        "pipeline started",
        targets=len(targets),
        providers=len(providers),
        dry_run=cfg.dry_run,
        accept_warning_as_fixed=cfg.accept_warning_as_fixed,
        allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
        validation_call_timeout_seconds=cfg.validation_call_timeout_seconds,
        strict_external_test=cfg.strict_external_test,
    )

    fixed_local: List[str] = []
    recovered: List[str] = []
    unresolved: List[str] = []
    per_game: Dict[str, Dict[str, object]] = {}

    for idx, record in enumerate(targets, start=1):
        game = str(record.get("name", "")).strip()
        if not game:
            continue

        active_record: Dict[str, object] = record

        game_dir = cfg.assets_dir / game
        entry_file = find_entry_file(game_dir, record)
        logger.log("info", game, "start_game", "processing game", index=idx, total=len(targets))

        if not game_dir.exists() or not entry_file:
            logger.log(
                "warning",
                game,
                "start_game",
                "game directory or entry file missing before repair",
                game_dir=str(game_dir),
                entry_file=str(entry_file) if entry_file else None,
            )

        game_result: Dict[str, object] = {
            "initial_status": record.get("status", "broken"),
            "fixed": False,
            "recovered": False,
            "final_status": "broken",
            "attempts": [],
        }

        # Strategy 0: remove known ad/tracker/dev external tags that break strict offline runtime.
        changes_0 = 0
        if entry_file and entry_file.exists():
            changes_0 = strip_nonessential_external_refs(cfg, game, entry_file, logger)
        game_result["attempts"].append({"strategy": "strip_nonessential_external_refs", "changes": changes_0})

        if changes_0 > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_strip_refs", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_strip_refs", "skipped": True, "reason": "no_changes"}
            )

        # Strategy 1: mirror external static assets into the game folder and patch HTML refs.
        changes_1 = 0
        if entry_file and entry_file.exists():
            changes_1 = mirror_external_assets(cfg, game, record, entry_file, logger)
        game_result["attempts"].append({"strategy": "mirror_external_assets", "changes": changes_1})

        check = run_game_validation(cfg, game, logger)
        game_result["attempts"].append({"strategy": "validate_after_mirror", "result": check})
        if validation_passed(cfg, str(check["status"])):
            fixed_local.append(game)
            game_result["fixed"] = True
            game_result["final_status"] = str(check["status"])
            per_game[game] = game_result
            continue

        fresh_record = check.get("result") if isinstance(check, dict) else None
        if isinstance(fresh_record, dict):
            active_record = fresh_record

        # Strategy 1b: mirror absolute external refs discovered in JS/CSS/JSON/HTML text assets.
        changes_1b = mirror_external_refs_in_text_assets(cfg, game, active_record, game_dir, logger)
        game_result["attempts"].append({"strategy": "mirror_external_refs_in_text_assets", "changes": changes_1b})

        if changes_1b > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_text_mirror", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
            fresh_record = check.get("result") if isinstance(check, dict) else None
            if isinstance(fresh_record, dict):
                active_record = fresh_record
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_text_mirror", "skipped": True, "reason": "no_changes"}
            )

        # Strategy 2: create known optional global stubs used by ad/challenge wrappers.
        changes_stub = create_optional_global_stubs(cfg, game, active_record, logger)
        game_result["attempts"].append({"strategy": "create_optional_global_stubs", "changes": changes_stub})

        if changes_stub > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_optional_stubs", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
            fresh_record = check.get("result") if isinstance(check, dict) else None
            if isinstance(fresh_record, dict):
                active_record = fresh_record
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_optional_stubs", "skipped": True, "reason": "no_changes"}
            )

        # Strategy 3: fill missing local files using filenames discovered in external issue URLs.
        changes_2 = fill_missing_files_from_issue_urls(cfg, game, active_record, logger)
        game_result["attempts"].append({"strategy": "fill_missing_files_from_issue_urls", "changes": changes_2})

        if changes_2 > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_missing_fill", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
            fresh_record = check.get("result") if isinstance(check, dict) else None
            if isinstance(fresh_record, dict):
                active_record = fresh_record
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_missing_fill", "skipped": True, "reason": "no_changes"}
            )

        # Strategy 4: refill missing generated mirror files by reconstructing their source URLs.
        changes_mirror_refill = refill_missing_mirror_files(cfg, game, active_record, logger)
        game_result["attempts"].append({"strategy": "refill_missing_mirror_files", "changes": changes_mirror_refill})

        if changes_mirror_refill > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_mirror_refill", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
            fresh_record = check.get("result") if isinstance(check, dict) else None
            if isinstance(fresh_record, dict):
                active_record = fresh_record
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_mirror_refill", "skipped": True, "reason": "no_changes"}
            )

        # Strategy 5: recover missing GamePush bundle assets from known SDK hosts.
        changes_gp = fill_missing_gp_bundle_assets(cfg, game, active_record, logger)
        game_result["attempts"].append({"strategy": "fill_missing_gp_bundle_assets", "changes": changes_gp})

        if changes_gp > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_gp_bundle_fill", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
            fresh_record = check.get("result") if isinstance(check, dict) else None
            if isinstance(fresh_record, dict):
                active_record = fresh_record
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_gp_bundle_fill", "skipped": True, "reason": "no_changes"}
            )

        # Strategy 6: create placeholders for optional missing local assets (audio/save/config files).
        changes_ph = create_optional_local_asset_placeholders(cfg, game, active_record, logger)
        game_result["attempts"].append({"strategy": "create_optional_local_asset_placeholders", "changes": changes_ph})

        if changes_ph > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_placeholders", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
            fresh_record = check.get("result") if isinstance(check, dict) else None
            if isinstance(fresh_record, dict):
                active_record = fresh_record
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_placeholders", "skipped": True, "reason": "no_changes"}
            )

        # Strategy 7: recover emulatorjs core files if scanner flagged missing/failed core URLs.
        changes_3 = repair_emulator_cores(cfg, game, active_record, logger)
        game_result["attempts"].append({"strategy": "repair_emulator_cores", "changes": changes_3})

        if changes_3 > 0:
            check = run_game_validation(cfg, game, logger)
            game_result["attempts"].append({"strategy": "validate_after_core_repair", "result": check})
            if validation_passed(cfg, str(check["status"])):
                fixed_local.append(game)
                game_result["fixed"] = True
                game_result["final_status"] = str(check["status"])
                per_game[game] = game_result
                continue
        else:
            game_result["attempts"].append(
                {"strategy": "validate_after_core_repair", "skipped": True, "reason": "no_changes"}
            )

        # Recovery stage: discover and download replacement snapshot from configured providers.
        if providers:
            backup_dir: Optional[Path] = None
            if game_dir.exists() and not cfg.dry_run:
                backup_dir = Path(tempfile.mkdtemp(prefix=f"{slugify(game)}_backup_"))
                shutil.copytree(game_dir, backup_dir / game, dirs_exist_ok=True)

            game_type = str(record.get("type", "") or active_record.get("type", "")).strip().lower()
            candidates = discover_recovery_candidates(game, providers, logger, game_type=game_type)
            game_result["attempts"].append({"strategy": "discover_recovery_candidates", "count": len(candidates)})

            recovered_ok = False
            for candidate in candidates:
                logger.log("info", game, "recovery_try", "trying recovery candidate", url=candidate)

                if not cfg.dry_run:
                    if game_dir.exists():
                        shutil.rmtree(game_dir, ignore_errors=True)
                    game_dir.mkdir(parents=True, exist_ok=True)

                if not download_game_snapshot(
                    candidate,
                    game_dir,
                    cfg.dry_run,
                    logger,
                    game,
                    allow_insecure_ssl_fallback=cfg.allow_insecure_ssl_fallback,
                ):
                    continue

                check = run_game_validation(cfg, game, logger)
                game_result["attempts"].append(
                    {
                        "strategy": "validate_after_recovery_candidate",
                        "candidate": candidate,
                        "result": check,
                    }
                )
                if validation_passed(cfg, str(check["status"])):
                    recovered_ok = True
                    recovered.append(game)
                    game_result["recovered"] = True
                    game_result["final_status"] = str(check["status"])
                    break

            if not recovered_ok:
                if backup_dir and (backup_dir / game).exists() and not cfg.dry_run:
                    if game_dir.exists():
                        shutil.rmtree(game_dir, ignore_errors=True)
                    shutil.copytree(backup_dir / game, game_dir, dirs_exist_ok=True)
                unresolved.append(game)
                game_result["final_status"] = "broken"
            else:
                logger.log("info", game, "recovery", "game recovered successfully")

            if backup_dir and backup_dir.exists():
                shutil.rmtree(backup_dir, ignore_errors=True)
        else:
            unresolved.append(game)
            game_result["final_status"] = check.get("status", "broken")

        per_game[game] = game_result

    summary = {
        "started_at": int(time.time()),
        "scan_report": str(cfg.scan_report),
        "targets": len(targets),
        "fixed_local_count": len(fixed_local),
        "recovered_count": len(recovered),
        "unresolved_count": len(unresolved),
        "fixed_local": fixed_local,
        "recovered": recovered,
        "unresolved": unresolved,
        "per_game": per_game,
        "dead_host_cache": dead_host_snapshot(),
        "provider_health": dict(_PROVIDER_HEALTH_CACHE),
    }

    cfg.summary_json.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    maintenance_payload = write_maintenance_status(cfg, per_game, logger)
    summary["maintenance_counts"] = maintenance_payload.get("counts", {})
    logger.log(
        "info",
        "*",
        "finish",
        "pipeline complete",
        fixed_local=len(fixed_local),
        recovered=len(recovered),
        unresolved=len(unresolved),
        summary_json=str(cfg.summary_json),
        maintenance_json=str(cfg.maintenance_json),
    )

    cfg.summary_json.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    return summary


def main() -> int:
    cfg = parse_args()

    if not cfg.assets_dir.exists():
        print(f"Assets directory not found: {cfg.assets_dir}")
        return 1
    if not cfg.scanner_script.exists():
        print(f"Scanner script not found: {cfg.scanner_script}")
        return 1

    try:
        acquire_lock(cfg)
    except Exception as exc:
        print(f"Could not start supervisor run: {exc}")
        return 1

    try:
        summary = run_pipeline(cfg)
    except Exception as exc:
        print(f"Pipeline failed: {exc}")
        return 1
    finally:
        release_lock(cfg)

    print("Pipeline complete.")
    print(f"  Targets: {summary['targets']}")
    print(f"  Fixed locally: {summary['fixed_local_count']}")
    print(f"  Recovered from providers: {summary['recovered_count']}")
    print(f"  Unresolved: {summary['unresolved_count']}")
    print(f"  Log: {cfg.log_jsonl}")
    print(f"  Summary: {cfg.summary_json}")
    print(f"  Maintenance status: {cfg.maintenance_json}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
