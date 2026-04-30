#!/usr/bin/env python3
"""
Updates build.json and all CDN URLs in index.html with the current git commit hash.
Run this AFTER committing the built shell files.

Usage:
    python update-build.py           # Update build.json + index.html
    python update-build.py --dry-run # Preview changes
"""

import json
import re
import subprocess
import sys
from pathlib import Path

DRY_RUN = '--dry-run' in sys.argv or '-d' in sys.argv


def get_git_hash(short=False):
    """Get the current git commit hash."""
    cmd = ['git', 'rev-parse', '--short', 'HEAD'] if short else ['git', 'rev-parse', 'HEAD']
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode == 0:
        return result.stdout.strip()
    raise RuntimeError(f"Failed to get git hash: {result.stderr}")


def main():
    script_dir = Path(__file__).resolve().parent
    build_file = script_dir.parent / 'build.json'
    index_file = script_dir.parent.parent / 'index.html'

    # Get current short hash
    short_hash = get_git_hash(short=True)
    print(f"Current git hash: {short_hash}")

    # Read current build.json
    with open(build_file, 'r') as f:
        data = json.load(f)

    old_version = data.get('build_version', '')
    old_number = data.get('build_number', 0)

    # Update build.json if hash changed
    if old_version == short_hash:
        print(f"build.json already up to date ({short_hash})")
    else:
        data['build_version'] = short_hash
        data['build_number'] = old_number + 1

        if DRY_RUN:
            print(f"[DRY-RUN] Would update {build_file}:")
            print(f"  build_version: {old_version or '(empty)'} → {short_hash}")
            print(f"  build_number: {old_number} → {old_number + 1}")
        else:
            with open(build_file, 'w') as f:
                json.dump(data, f, indent='\t')
                f.write('\n')
            print(f"✓ Updated build.json")
            print(f"  build_version: {short_hash}")
            print(f"  build_number: {old_number + 1}")

    # Always update CDN URLs in index.html: find whatever hash is there and replace with new hash
    if index_file.exists():
        html = index_file.read_text('utf-8')
        pattern = r'shellbros/mathlete@([a-f0-9]+)/'
        found = re.findall(pattern, html)
        count = len(found)

        if count == 0:
            print("No CDN URLs found in index.html")
        else:
            old_hash = found[0]
            if old_hash == short_hash:
                print(f"CDN URLs already use {short_hash}")
            elif DRY_RUN:
                print(f"[DRY-RUN] Would replace {count} CDN URLs in index.html:")
                print(f"  @{old_hash}/ → @{short_hash}/")
            else:
                html = re.sub(pattern, f'shellbros/mathlete@{short_hash}/', html)
                index_file.write_text(html, 'utf-8')
                print(f"✓ Updated {count} CDN URLs in index.html")
                print(f"  @{old_hash}/ → @{short_hash}/")
    else:
        print(f"index.html not found at {index_file}")


if __name__ == '__main__':
    main()
