#!/usr/bin/env python3
"""Import game websites into local Assets folders with full asset mirroring.

This script uses deep_site_archiver.py to capture dynamic assets, then creates
an Assets/<slug>/index.html launcher and upserts games_list.json metadata.

Usage examples:
  python import_game_from_url.py --url https://example.com/game
  python import_game_from_url.py --url https://example.com/game --slug my-game
  python import_game_from_url.py --input import_urls.txt
"""

from __future__ import annotations

import argparse
import asyncio
import json
import re
import shutil
import time
from pathlib import Path
from typing import Dict, Iterable, List, Optional, Tuple
from urllib.parse import urlsplit

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico"}
HTML_EXTS = {".html", ".htm"}
PRIORITY_NAMES = ("logo", "icon", "splash", "thumb", "thumbnail")


class ImportErrorWithReason(RuntimeError):
    pass


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Mirror game URLs into local Assets/<slug> and register metadata.",
    )
    parser.add_argument("--url", action="append", help="Game URL to import (repeatable)")
    parser.add_argument(
        "--input",
        help="Optional file of URLs. Supports lines: '<url>' or '<slug>,<url>'.",
    )
    parser.add_argument("--slug", help="Slug for single --url import")
    parser.add_argument("--type", default="webgl", help="Game type for games_list.json (default: webgl)")

    parser.add_argument("--assets-dir", default="Assets", help="Assets root directory")
    parser.add_argument("--games-list", default="games_list.json", help="games_list.json path")

    parser.add_argument("--max-pages", type=int, default=80, help="Max pages to crawl per import")
    parser.add_argument("--max-depth", type=int, default=3, help="Max crawl depth per import")
    parser.add_argument("--timeout-seconds", type=int, default=35, help="Navigation timeout per page")
    parser.add_argument("--min-delay", type=float, default=1.0, help="Min delay between pages")
    parser.add_argument("--max-delay", type=float, default=4.0, help="Max delay between pages")
    parser.add_argument("--max-iframes-per-page", type=int, default=16, help="Max iframes to trigger")

    parser.add_argument("--allow-subdomains", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--capture-external-assets", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--rewrite-links", action=argparse.BooleanOptionalAction, default=True)
    parser.add_argument("--browser", choices=["chromium", "firefox", "webkit"], default="chromium")
    parser.add_argument("--headful", action="store_true", help="Run browser with visible window")

    parser.add_argument(
        "--overwrite",
        action="store_true",
        help="Delete existing Assets/<slug>/_archived_site before import",
    )
    parser.add_argument(
        "--allow-host",
        action="append",
        default=[],
        help="Restrict imports to this host (repeatable). If omitted, all hosts allowed.",
    )
    parser.add_argument(
        "--summary-json",
        default="import_game_from_url_summary.json",
        help="Summary report output path",
    )
    return parser.parse_args()


def parse_input_lines(path: Path) -> List[Tuple[str, Optional[str]]]:
    tasks: List[Tuple[str, Optional[str]]] = []
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue

        if "," in line:
            left, right = line.split(",", 1)
            left = left.strip()
            right = right.strip()
            if right.startswith("http://") or right.startswith("https://"):
                tasks.append((right, left or None))
                continue

        parts = line.split()
        if len(parts) == 1:
            tasks.append((parts[0], None))
            continue
        if len(parts) >= 2 and (parts[0].startswith("http://") or parts[0].startswith("https://")):
            tasks.append((parts[0], parts[1]))
            continue

        raise ImportErrorWithReason(f"Could not parse input line: {line}")

    return tasks


def slugify(value: str) -> str:
    lowered = value.lower().strip()
    lowered = re.sub(r"https?://", "", lowered)
    lowered = re.sub(r"[^a-z0-9]+", "-", lowered)
    lowered = re.sub(r"-+", "-", lowered).strip("-")
    return lowered or "imported-game"


def derive_slug(url: str, provided: Optional[str]) -> str:
    if provided:
        return slugify(provided)

    split = urlsplit(url)
    path = split.path.strip("/")
    if path:
        tail = path.split("/")[-1]
        tail = tail.split(".")[0]
        if tail:
            return slugify(tail)
    return slugify(split.netloc)


def score_image(image_path: Path, slug: str, base: Path) -> Tuple[int, int, int, int]:
    rel = image_path.relative_to(base)
    depth = len(rel.parts) - 1
    stem = image_path.stem.lower()
    ext = image_path.suffix.lower()

    if stem == slug:
        name_rank = -2
    elif stem in PRIORITY_NAMES:
        name_rank = PRIORITY_NAMES.index(stem)
    else:
        name_rank = 99

    ext_rank = {
        ".png": 0,
        ".webp": 1,
        ".jpg": 2,
        ".jpeg": 2,
        ".gif": 3,
        ".svg": 4,
        ".ico": 5,
    }.get(ext, 10)

    return (name_rank, depth, ext_rank, len(stem))


def pick_cover(slug_dir: Path, slug: str) -> Optional[Path]:
    images = [
        p for p in slug_dir.rglob("*")
        if p.is_file() and p.suffix.lower() in IMAGE_EXTS
    ]
    if not images:
        return None
    images.sort(key=lambda p: score_image(p, slug, slug_dir))
    return images[0]


def choose_entry_file(archive_dir: Path, manifest: Dict[str, object]) -> Path:
    captured = manifest.get("captured_assets", {})
    if not isinstance(captured, dict):
        raise ImportErrorWithReason("archive manifest has no captured_assets map")

    html_rel_paths: List[Path] = []
    for rel in captured.values():
        rel_path = Path(str(rel))
        if rel_path.suffix.lower() in HTML_EXTS:
            html_rel_paths.append(rel_path)

    if not html_rel_paths:
        raise ImportErrorWithReason("No HTML files captured; cannot create launcher")

    start_url = str(manifest.get("start_url", ""))
    split = urlsplit(start_url)
    host = split.netloc.lower().replace(":", "_")
    start_path = split.path or "/"
    if start_path.endswith("/"):
        start_path = f"{start_path}index.html"
    expected = Path(host) / Path(start_path.lstrip("/"))

    if expected in html_rel_paths:
        selected = expected
    else:
        html_rel_paths.sort(key=lambda p: (0 if p.name.lower() == "index.html" else 1, len(p.parts), len(p.as_posix())))
        selected = html_rel_paths[0]

    entry_path = archive_dir / selected
    if not entry_path.exists():
        raise ImportErrorWithReason(f"Selected launcher HTML missing on disk: {entry_path}")
    return entry_path


def make_launcher_html(title: str, target_rel: str) -> str:
    safe_title = title.replace("<", "").replace(">", "")
    escaped_target = target_rel.replace("'", "\\'")

    return f"""<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\">
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
  <title>{safe_title}</title>
  <style>
    html, body {{ margin: 0; height: 100%; background: #0a0a0a; color: #fff; font-family: system-ui, sans-serif; }}
    .wrap {{ display: grid; place-items: center; height: 100%; text-align: center; padding: 20px; }}
    a {{ color: #fff; text-decoration: underline; }}
  </style>
</head>
<body>
  <div class=\"wrap\">
    <div>
      <p>Launching game...</p>
      <p><a href=\"{target_rel}\">If it does not open, click here.</a></p>
    </div>
  </div>
  <script>
    location.replace('{escaped_target}');
  </script>
</body>
</html>
"""


def upsert_games_list(
    games_list_path: Path,
    slug: str,
    game_type: str,
    cover_rel: str,
    source_url: str,
) -> None:
    if games_list_path.exists():
        data = json.loads(games_list_path.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise ImportErrorWithReason("games_list.json root must be an array")
    else:
        data = []

    url_value = f"Assets/{slug}/index.html"
    image_value = cover_rel if cover_rel else "notavailable.svg"

    payload = {
        "name": slug,
        "url": url_value,
        "image": image_value,
        "type": game_type,
        "source_url": source_url,
    }

    idx = -1
    for i, item in enumerate(data):
        if not isinstance(item, dict):
            continue
        item_name = str(item.get("name", ""))
        item_url = str(item.get("url", ""))
        if item_name == slug or item_url.startswith(f"Assets/{slug}/"):
            idx = i
            break

    if idx >= 0:
        preserved = data[idx]
        preserved.update(payload)
        data[idx] = preserved
    else:
        data.append(payload)

    data.sort(key=lambda x: str(x.get("name", "")).lower())
    games_list_path.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


async def import_one(
    repo_root: Path,
    assets_dir: Path,
    games_list_path: Path,
    args: argparse.Namespace,
    url: str,
    slug_input: Optional[str],
) -> Dict[str, object]:
    if not url.startswith(("http://", "https://")):
        raise ImportErrorWithReason(f"URL must start with http:// or https:// : {url}")

    host = (urlsplit(url).hostname or "").lower()
    allowed_hosts = [h.lower() for h in args.allow_host]
    if allowed_hosts and host not in allowed_hosts:
        raise ImportErrorWithReason(f"Host not allowed by --allow-host list: {host}")

    slug = derive_slug(url, slug_input or args.slug)
    slug_dir = assets_dir / slug
    archive_dir = slug_dir / "_archived_site"

    slug_dir.mkdir(parents=True, exist_ok=True)

    if archive_dir.exists() and args.overwrite:
        shutil.rmtree(archive_dir)

    try:
        from deep_site_archiver import DeepSiteArchiver
    except ModuleNotFoundError as exc:
        if exc.name == "playwright":
            raise ImportErrorWithReason(
                "Missing Python dependency 'playwright'. Install with: "
                "pip install -r requirements.txt && playwright install chromium"
            ) from exc
        raise

    archiver = DeepSiteArchiver(
        target_url=url,
        output_dir=archive_dir,
        max_pages=max(args.max_pages, 1),
        max_depth=max(args.max_depth, 0),
        min_delay=max(args.min_delay, 0.0),
        max_delay=max(args.max_delay, max(args.min_delay, 0.0)),
        timeout_seconds=max(args.timeout_seconds, 5),
        rewrite_links=bool(args.rewrite_links),
        allow_subdomains=bool(args.allow_subdomains),
        capture_external_assets=bool(args.capture_external_assets),
        max_iframes_per_page=max(args.max_iframes_per_page, 0),
        browser_name=args.browser,
        headless=not args.headful,
    )

    await archiver.run()

    manifest_path = archive_dir / "archive_manifest.json"
    if not manifest_path.exists():
        raise ImportErrorWithReason("Archive completed but manifest file was not produced")

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    entry_file = choose_entry_file(archive_dir, manifest)

    launcher_target_rel = entry_file.relative_to(slug_dir).as_posix()
    launcher_html = make_launcher_html(title=slug.replace("-", " ").title(), target_rel=launcher_target_rel)
    launcher_path = slug_dir / "index.html"
    launcher_path.write_text(launcher_html, encoding="utf-8")

    cover = pick_cover(slug_dir, slug)
    cover_rel = cover.relative_to(repo_root).as_posix() if cover else "notavailable.svg"

    upsert_games_list(
        games_list_path=games_list_path,
        slug=slug,
        game_type=args.type,
        cover_rel=cover_rel,
        source_url=url,
    )

    import_summary = {
        "slug": slug,
        "url": url,
        "launcher": launcher_path.relative_to(repo_root).as_posix(),
        "entry_file": entry_file.relative_to(repo_root).as_posix(),
        "cover": cover_rel,
        "manifest": manifest_path.relative_to(repo_root).as_posix(),
        "captured_assets": len((manifest.get("captured_assets") or {})),
        "failed_requests": len((manifest.get("failed_requests") or {})),
        "timestamp": int(time.time()),
    }

    import_manifest_path = slug_dir / "import_manifest.json"
    import_manifest_path.write_text(json.dumps(import_summary, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    return import_summary


async def run_imports(args: argparse.Namespace) -> List[Dict[str, object]]:
    repo_root = Path.cwd()
    assets_dir = (repo_root / args.assets_dir).resolve()
    games_list_path = (repo_root / args.games_list).resolve()

    tasks: List[Tuple[str, Optional[str]]] = []
    if args.url:
        tasks.extend((u, None) for u in args.url)

    if args.input:
        input_path = (repo_root / args.input).resolve()
        if not input_path.exists():
            raise ImportErrorWithReason(f"Input file not found: {input_path}")
        tasks.extend(parse_input_lines(input_path))

    if not tasks:
        raise ImportErrorWithReason("No URLs provided. Use --url and/or --input")

    if args.slug and len(tasks) > 1:
        raise ImportErrorWithReason("--slug can only be used when importing a single URL")

    results: List[Dict[str, object]] = []
    for index, (url, line_slug) in enumerate(tasks, start=1):
        print(f"[{index}/{len(tasks)}] Importing: {url}")
        result = await import_one(
            repo_root=repo_root,
            assets_dir=assets_dir,
            games_list_path=games_list_path,
            args=args,
            url=url,
            slug_input=line_slug,
        )
        print(
            "  -> done slug={slug} captured_assets={assets} failed_requests={failed}".format(
                slug=result["slug"],
                assets=result["captured_assets"],
                failed=result["failed_requests"],
            )
        )
        results.append(result)

    return results


def main() -> int:
    args = parse_args()

    try:
        results = asyncio.run(run_imports(args))
    except ImportErrorWithReason as exc:
        print(f"Import configuration error: {exc}")
        return 2
    except KeyboardInterrupt:
        print("Interrupted by user")
        return 130
    except Exception as exc:
        print(f"Fatal import error: {exc}")
        return 1

    summary_path = (Path.cwd() / args.summary_json).resolve()
    summary_payload = {
        "created_at": int(time.time()),
        "imports": results,
    }
    summary_path.write_text(json.dumps(summary_payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Summary written: {summary_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
