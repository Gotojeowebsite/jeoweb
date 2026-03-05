#!/usr/bin/env bash
set -euo pipefail

if ! command -v pwsh >/dev/null 2>&1; then
  echo "PowerShell (pwsh) is required to run import-flash.ps1 in Codespaces."
  echo "Install with: sudo apt-get update && sudo apt-get install -y powershell"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pwsh -NoLogo -NoProfile -File "$SCRIPT_DIR/import-flash.ps1" "$@"
