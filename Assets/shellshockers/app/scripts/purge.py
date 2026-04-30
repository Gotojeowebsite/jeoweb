#!/usr/bin/env python3
"""
Purge jsDelivr cache for build.json.
Run this AFTER pushing to GitHub.

Usage:
    python purge.py
"""

import urllib.request


JSDELIVR_PURGE_URLS = [
    "https://purge.jsdelivr.net/gh/shellbros/shellbros/app/build.json",
    "https://purge.jsdelivr.net/gh/shellbros/shellbros/app/checker.js",
    "https://purge.jsdelivr.net/gh/shellbros/shellbros/index.js",
]


def main():
    print("Purging jsDelivr cache...")
    failed = False
    for url in JSDELIVR_PURGE_URLS:
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as response:
                if response.status == 200:
                    print(f"✓ Purged: {url}")
                else:
                    print(f"✗ Unexpected status {response.status}: {url}")
                    failed = True
        except Exception as e:
            print(f"✗ Failed to purge {url}: {e}")
            failed = True
    return 1 if failed else 0


if __name__ == '__main__':
    exit(main())
