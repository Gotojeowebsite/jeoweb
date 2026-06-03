#!/usr/bin/env python3
import argparse
import json
import subprocess
import os
import sys
from pathlib import Path

def run_command(args, cwd=None):
    print(f"Running: {' '.join(args)}")
    res = subprocess.run(args, capture_output=True, text=True, cwd=cwd)
    return res.returncode, res.stdout, res.stderr

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--chunk", required=True, help="Path to chunk JSON file")
    parser.add_argument("--log", required=True, help="Path to write log results")
    parser.add_argument("--port", type=int, default=8081, help="Port to run the local server on")
    args = parser.parse_args()

    chunk_path = Path(args.chunk)
    log_path = Path(args.log)

    if not chunk_path.exists():
        print(f"Error: chunk file {chunk_path} does not exist.")
        sys.exit(1)

    with open(chunk_path, "r") as f:
        slugs = json.load(f)

    print(f"Processing chunk with {len(slugs)} games: {slugs}")

    results = {}
    if log_path.exists():
        try:
            with open(log_path, "r") as lf:
                results = json.load(lf)
            print(f"Loaded {len(results)} existing results from {log_path}")
        except Exception as e:
            print(f"Warning: could not load existing log: {e}")

    for idx, slug in enumerate(slugs):
        if slug in results:
            print(f"[{idx+1}/{len(slugs)}] Skipping already processed game: {slug}")
            continue

        print(f"\n[{idx+1}/{len(slugs)}] Processing game: {slug}")
        game_dir = Path("Assets") / slug
        
        # Check if the game is skipped (no html entrypoint)
        has_html = False
        if game_dir.exists():
            for root, dirs, files in os.walk(game_dir):
                if any(f.endswith('.html') for f in files):
                    has_html = True
                    break
        
        is_broken = not has_html
        reason = "missing_entrypoint" if not has_html else ""
        
        if has_html:
            # Step 1: Run scan to check if it works
            code, stdout, stderr = run_command([
                "python3", "broken_game_scanner.py", "--only", slug, "--report-json", f"reports/scan_results_{slug}.json", "--port", str(args.port)
            ])
            # Parse scan results
            scan_report_path = Path(f"reports/scan_results_{slug}.json")
            if scan_report_path.exists():
                try:
                    with open(scan_report_path, "r") as sf:
                        scan_data = json.load(sf)
                    # The report typically contains a list of results or dict of results
                    # Check if 'results' exists or if top-level is list/dict
                    game_res = None
                    if isinstance(scan_data, dict):
                        if "results" in scan_data:
                            game_res = scan_data["results"].get(slug)
                        else:
                            game_res = scan_data.get(slug)
                    elif isinstance(scan_data, list):
                        for item in scan_data:
                            if item.get("name") == slug:
                                game_res = item
                                break

                    if game_res:
                        verdict = game_res.get("status") or game_res.get("verdict") or "unknown"
                        issues = game_res.get("critical_issues") or game_res.get("issues") or []
                        print(f"Scan verdict for {slug}: {verdict}, issues count: {len(issues)}")
                        if verdict in ["broken", "fail"] or any(iss.get("severity") in ["error", "critical"] for iss in issues):
                            is_broken = True
                            reason = f"scanner_{verdict}"
                    else:
                        # Fallback: check if the scan run failed or stdout indicates failure
                        if "broken" in stdout.lower() or "fail" in stdout.lower():
                            is_broken = True
                            reason = "stdout_fail"
                except Exception as e:
                    print(f"Error parsing scan results: {e}")
                    is_broken = True
                    reason = f"parse_error_{e}"
            else:
                print(f"Scan report not found for {slug}")
                is_broken = True
                reason = "no_report_file"

        # Step 2: If broken, run recovery
        recovered = False
        if is_broken:
            print(f"Game {slug} is determined to be broken/missing: {reason}. Triggering recovery...")
            rec_code, rec_stdout, rec_stderr = run_command([
                "node", "scripts/recover-game.js", slug, "--ignore-cooldown", "--max-candidates", "2", "--candidate-timeout-ms", "20000", "--skip-scanner"
            ])
            print(f"Recovery return code: {rec_code}")
            print(f"Recovery stdout sample: {rec_stdout[-1000:] if len(rec_stdout) > 1000 else rec_stdout}")
            if rec_code == 0:
                recovered = True
                print(f"Successfully recovered {slug}!")
            else:
                print(f"Failed to recover {slug}: {rec_stderr}")

        # Step 3: Always check for localizing & shimming Poki/externals
        # (This handles the 'outside links' requirement)
        print(f"Localizing game: {slug}")
        loc_code, loc_stdout, loc_stderr = run_command([
            "node", "scripts/localize-all-games.js", "--slug", slug, "--apply"
        ])
        
        # Build manifest & verify it
        run_command(["node", "scripts/build-offline-manifest.js", "--slug", slug])
        run_command(["node", "scripts/verify-offline-manifest.js", "--slug", slug])

        # Step 4: Final verification pass
        final_verdict = "unknown"
        if has_html or recovered:
            run_command(["node", "scan.js", "--slug", slug]) # update games_list.json
            code, stdout, stderr = run_command([
                "python3", "broken_game_scanner.py", "--only", slug, "--report-json", f"reports/scan_results_{slug}_final.json", "--port", str(args.port)
            ])
            final_report_path = Path(f"reports/scan_results_{slug}_final.json")
            if final_report_path.exists():
                try:
                    with open(final_report_path, "r") as sf:
                        scan_data = json.load(sf)
                    game_res = None
                    if isinstance(scan_data, dict):
                        if "results" in scan_data:
                            game_res = scan_data["results"].get(slug)
                        else:
                            game_res = scan_data.get(slug)
                    elif isinstance(scan_data, list):
                        for item in scan_data:
                            if item.get("name") == slug:
                                game_res = item
                                break

                    if game_res:
                        final_verdict = game_res.get("status") or game_res.get("verdict") or "unknown"
                except:
                    final_verdict = "parse_error"
        else:
            final_verdict = "unrecovered_no_entrypoint"

        print(f"Final status for {slug}: {final_verdict}")
        results[slug] = {
            "initial_broken": is_broken,
            "initial_reason": reason,
            "recovered": recovered,
            "final_verdict": final_verdict
        }

        # Save intermediate results in log file
        with open(log_path, "w") as lf:
            json.dump(results, lf, indent=2)

    print("\n--- Chunk Process Completed ---")
    with open(log_path, "w") as lf:
        json.dump(results, lf, indent=2)

if __name__ == "__main__":
    main()
