#!/usr/bin/env python3
"""Audit and repair missing game cover image paths in games_list.json.

Usage examples:
  python fix_game_covers.py --check-only
  python fix_game_covers.py --apply
  python fix_game_covers.py --games-list games_list.json --assets-dir Assets
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Dict, List, Optional, Tuple

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg", ".ico"}
PRIORITY_NAMES = ("logo", "icon", "splash", "thumb", "thumbnail")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Audit and repair missing game cover image paths in games_list.json",
    )
    parser.add_argument("--games-list", default="games_list.json", help="Path to games_list.json")
    parser.add_argument("--assets-dir", default="Assets", help="Assets directory path")
    parser.add_argument(
        "--report",
        default="cover_audit_report.json",
        help="Output JSON report path",
    )
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Write repaired paths back to games_list.json",
    )
    parser.add_argument(
        "--check-only",
        action="store_true",
        help="Do not modify games_list.json (default behavior).",
    )
    return parser.parse_args()


def to_posix(path: Path) -> str:
    return path.as_posix()


def normalize_rel(rel: str) -> str:
    return rel.replace("\\", "/")


def extract_slug(entry: Dict[str, object]) -> Optional[str]:
    url_value = str(entry.get("url", ""))
    match = re.match(r"^Assets/([^/]+)/", url_value)
    if match:
        return match.group(1)
    name = str(entry.get("name", "")).strip()
    if name:
        return name
    return None


def collect_images(folder: Path) -> List[Path]:
    return [
        p for p in folder.rglob("*")
        if p.is_file() and p.suffix.lower() in IMAGE_EXTS
    ]


def score_image(image_path: Path, slug: str, root: Path) -> Tuple[int, int, int, int]:
    rel = image_path.relative_to(root)
    depth = len(rel.parts) - 1
    stem = image_path.stem.lower()
    ext = image_path.suffix.lower()

    if stem == slug.lower():
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


def pick_cover(asset_folder: Path, slug: str) -> Optional[Path]:
    if not asset_folder.exists() or not asset_folder.is_dir():
        return None

    images = collect_images(asset_folder)
    if not images:
        return None

    images.sort(key=lambda p: score_image(p, slug, asset_folder))
    return images[0]


def is_existing_file(repo_root: Path, rel_path: str) -> bool:
    candidate = repo_root / normalize_rel(rel_path)
    return candidate.is_file()


def main() -> int:
    args = parse_args()
    repo_root = Path.cwd()
    games_list_path = (repo_root / args.games_list).resolve()
    assets_dir = (repo_root / args.assets_dir).resolve()
    report_path = (repo_root / args.report).resolve()

    if not games_list_path.exists():
        print(f"games_list file not found: {games_list_path}")
        return 2

    if not assets_dir.exists():
        print(f"Assets directory not found: {assets_dir}")
        return 2

    try:
        games = json.loads(games_list_path.read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        print(f"Invalid JSON in {games_list_path}: {exc}")
        return 2

    if not isinstance(games, list):
        print("games_list.json root must be an array")
        return 2

    apply_changes = args.apply and not args.check_only
    changed = 0
    missing_slug = 0
    unresolved = 0

    fixes: List[Dict[str, str]] = []
    unresolved_items: List[Dict[str, str]] = []

    for item in games:
        if not isinstance(item, dict):
            continue

        slug = extract_slug(item)
        current_image = str(item.get("image", "")).strip()
        image_exists = bool(current_image) and is_existing_file(repo_root, current_image)

        if image_exists:
            continue

        if not slug:
            missing_slug += 1
            unresolved += 1
            unresolved_items.append({
                "name": str(item.get("name", "")),
                "reason": "missing_slug",
                "current_image": current_image,
            })
            continue

        asset_folder = assets_dir / slug
        cover_path = pick_cover(asset_folder, slug)
        if cover_path is None:
            unresolved += 1
            unresolved_items.append({
                "name": str(item.get("name", "")),
                "reason": "no_image_found_in_assets_folder",
                "current_image": current_image,
                "slug": slug,
            })
            continue

        relative_image = to_posix(Path("Assets") / slug / cover_path.relative_to(asset_folder))
        previous = current_image or ""

        if apply_changes:
            item["image"] = relative_image
        changed += 1

        fixes.append({
            "name": str(item.get("name", "")),
            "slug": slug,
            "old_image": previous,
            "new_image": relative_image,
        })

    if apply_changes and changed:
        games_list_path.write_text(json.dumps(games, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    report = {
        "games_list": str(games_list_path.relative_to(repo_root)),
        "assets_dir": str(assets_dir.relative_to(repo_root)),
        "total_games": len(games),
        "repaired_or_repairable": changed,
        "unresolved": unresolved,
        "missing_slug": missing_slug,
        "applied": apply_changes,
        "fixes": fixes,
        "unresolved_items": unresolved_items,
    }

    report_path.write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    print(f"Cover audit complete: repaired_or_repairable={changed}, unresolved={unresolved}")
    print(f"Report written: {report_path}")
    if apply_changes:
        print(f"Updated: {games_list_path}")

    return 1 if unresolved and args.check_only else 0


if __name__ == "__main__":
    raise SystemExit(main())
