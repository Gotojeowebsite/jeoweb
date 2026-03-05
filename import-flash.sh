#!/usr/bin/env bash
set -euo pipefail

if ! command -v pwsh >/dev/null 2>&1; then
  echo "PowerShell (pwsh) is required."
  echo "Install with: sudo apt-get update && sudo apt-get install -y powershell"
  exit 1
fi

if ! command -v wget >/dev/null 2>&1; then
  echo "wget is required for URL downloads."
  echo "Install with: sudo apt-get update && sudo apt-get install -y wget"
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pwsh -NoLogo -NoProfile -File "$SCRIPT_DIR/import-flash.ps1" "$@"
