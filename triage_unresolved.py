#!/usr/bin/env python3
"""Triage unresolved games by failure class instead of by name.

Reads the latest supervisor recovery summary + scan_results.json and groups the
unresolved games into remediation buckets based on their critical-issue code
and lead_issue. Emits a machine-readable `reports/triage.json` plus a short
human summary on stdout.

Strategy bucket -> recommended action (also encoded in the JSON):

  local_missing_asset   -> Run repair-games.sh / scripts/remediation.js; likely
                           a missing local file that can be refetched from origin.
  external_dep_blocking -> Run scripts/deep-asset-scraper.js or
                           auto_fix_and_recover_games.py (mirror_external_assets)
                           so the runtime dependency is vendored.
  emulator_core         -> Rerun emulator core repair + re-import ROM pair.
  runtime_error         -> Manual review; likely a corrupt or partial import.
  unknown               -> No diagnostic code available; rescan needed.

Usage:
  python3 triage_unresolved.py [--summary FILE] [--scan FILE] [--out FILE]
"""

from __future__ import annotations

import argparse
import json
from collections import Counter, defaultdict
from pathlib import Path
from typing import Dict, List, Tuple

ROOT = Path(__file__).resolve().parent
DEFAULT_SUMMARY = ROOT / "auto_fix_recovery_summary.supervisor_live_v16_provider_recovery.json"
DEFAULT_SCAN = ROOT / "scan_results.json"
DEFAULT_OUT = ROOT / "reports" / "triage.json"

STRATEGY_FOR_CODE = {
    "LOCAL_HTTP_ERROR": "local_missing_asset",
    "LOCAL_REQUEST_FAILED": "local_missing_asset",
    "LOCAL_IGNORED_HTTP": "local_missing_asset",
    "EXTERNAL_DEPENDENCY": "external_dep_blocking",
    "EXTERNAL_CRITICAL_FAILED": "external_dep_blocking",
    "EXTERNAL_NONCRITICAL": "external_dep_blocking",
    "EXTERNAL_NONCRITICAL_FAILED": "external_dep_blocking",
    "EXTERNAL_OPTIONAL": "external_dep_blocking",
    "EXTERNAL_OPTIONAL_FAILED": "external_dep_blocking",
    "EMULATOR_CORE_MISSING": "emulator_core",
    "EMULATOR_ASSET_MISSING": "emulator_core",
    "PAGE_ERROR": "runtime_error",
    "CONSOLE_ERROR": "runtime_error",
    "PAGE_TIMEOUT": "runtime_error",
    "HARD_TIMEOUT": "runtime_error",
}

STRATEGY_HELP = {
    "local_missing_asset": "Run bash repair-games.sh, then node scripts/remediation.js.",
    "external_dep_blocking": "Run auto_fix_and_recover_games.py (mirror step) or scripts/deep-asset-scraper.js <URL> <slug>.",
    "emulator_core": "Re-run the relevant import-*-batch.sh; verify ROM + emulatorjs core paths.",
    "runtime_error": "Manual review — check browser console for the exact error; reimport if corrupted.",
    "unknown": "Re-run python3 broken_game_scanner.py --only <slug> to collect fresh diagnostics.",
}


def load_json(path: Path):
    if not path.exists():
        return None
    return json.loads(path.read_text(encoding="utf-8"))


def extract_codes_from_latest_attempt(game_result: Dict) -> Tuple[List[str], str]:
    """Walk per_game[game].attempts backwards for the most recent validate_* result and
    return (critical_codes, lead_issue)."""
    attempts = game_result.get("attempts", [])
    if not isinstance(attempts, list):
        return [], ""
    for attempt in reversed(attempts):
        if not isinstance(attempt, dict):
            continue
        result = attempt.get("result")
        if not isinstance(result, dict):
            continue
        lead = str(result.get("lead_issue", "")).strip()
        nested = result.get("result") if isinstance(result.get("result"), dict) else {}
        codes = []
        for item in nested.get("critical_issues", []) or []:
            if isinstance(item, dict) and item.get("code"):
                codes.append(str(item["code"]))
        for item in nested.get("warnings", []) or []:
            if isinstance(item, dict) and item.get("code"):
                codes.append(str(item["code"]))
        if codes or lead:
            return codes, lead
    return [], ""


def strategy_for_codes(codes: List[str], lead_issue: str) -> str:
    for code in codes:
        if code in STRATEGY_FOR_CODE:
            return STRATEGY_FOR_CODE[code]
    if lead_issue:
        head = lead_issue.split(":", 1)[0].strip()
        if head in STRATEGY_FOR_CODE:
            return STRATEGY_FOR_CODE[head]
    return "unknown"


def triage(summary: Dict, scan_rows: List[Dict]) -> Dict:
    per_game = summary.get("per_game", {}) or {}
    unresolved = list(summary.get("unresolved", []) or [])

    scan_by_name: Dict[str, Dict] = {}
    for row in scan_rows or []:
        if isinstance(row, dict) and row.get("name"):
            scan_by_name[str(row["name"])] = row

    buckets: Dict[str, List[Dict]] = defaultdict(list)
    code_counter: Counter = Counter()

    for name in unresolved:
        result = per_game.get(name, {}) if isinstance(per_game, dict) else {}
        codes, lead = extract_codes_from_latest_attempt(result if isinstance(result, dict) else {})
        # Cross-reference scan_results.json if the supervisor per_game entry had nothing.
        if not codes:
            row = scan_by_name.get(name, {})
            for item in row.get("critical_issues", []) or []:
                if isinstance(item, dict) and item.get("code"):
                    codes.append(str(item["code"]))
            for item in row.get("warnings", []) or []:
                if isinstance(item, dict) and item.get("code"):
                    codes.append(str(item["code"]))
            if not lead:
                # lead_issue isn't a scanner field on rows, synthesize from first code.
                lead = codes[0] if codes else ""

        strategy = strategy_for_codes(codes, lead)
        for code in codes:
            code_counter[code] += 1
        buckets[strategy].append({
            "name": name,
            "lead_issue": lead,
            "codes": sorted(set(codes)),
        })

    bucket_summary = {k: len(v) for k, v in buckets.items()}

    return {
        "source_summary_path": str(summary.get("_source_path", "")),
        "unresolved_total": len(unresolved),
        "bucket_counts": bucket_summary,
        "top_failure_codes": code_counter.most_common(15),
        "strategy_help": STRATEGY_HELP,
        "buckets": {k: sorted(v, key=lambda x: x["name"]) for k, v in buckets.items()},
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--summary", default=str(DEFAULT_SUMMARY))
    parser.add_argument("--scan", default=str(DEFAULT_SCAN))
    parser.add_argument("--out", default=str(DEFAULT_OUT))
    args = parser.parse_args()

    summary = load_json(Path(args.summary)) or {}
    summary["_source_path"] = args.summary
    scan_rows = load_json(Path(args.scan)) or []

    report = triage(summary, scan_rows)

    out_path = Path(args.out)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(report, indent=2), encoding="utf-8")

    print(f"Triage report written to {out_path}")
    print(f"Unresolved total: {report['unresolved_total']}")
    print("Bucket counts:")
    for bucket, count in sorted(report["bucket_counts"].items(), key=lambda kv: -kv[1]):
        print(f"  {bucket:24s} {count:4d}  -> {STRATEGY_HELP.get(bucket, '')}")
    print("Top failure codes:")
    for code, count in report["top_failure_codes"][:8]:
        print(f"  {code:28s} {count:4d}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
