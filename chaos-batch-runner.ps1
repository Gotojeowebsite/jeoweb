# ============================================================
#  CHAOS BATCH RUNNER (Deep Archival Patcher)
#  Reads flash-batch.txt, targets the Assets/ folder, and runs
#  the Quarantine/Playwright/Patcher pipeline on every game.
# ============================================================

param (
    [string]$BatchFile = "./flash-batch.txt",
    [int]$ChaosSeconds = 45 # Adjusted to 45s per game to speed up batching
)

if (-not (Test-Path $BatchFile)) {
    Write-Host "[!] Could not find batch file: $BatchFile" -ForegroundColor Red
    exit
}

$lines = Get-Content $BatchFile | Where-Object { $_.Trim() -ne "" }

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " INITIATING BATCH CHAOS PIPELINE" -ForegroundColor Cyan
Write-Host " Found $($lines.Count) games to process."
Write-Host "=======================================================" -ForegroundColor Cyan

foreach ($line in $lines) {
    # Smart parsing: Split by '|' if it exists, otherwise split by space (fixes typos like Sans-Fight)
    if ($line -match "\|") {
        $parts = $line -split "\|"
    } else {
        $parts = $line -split "\s+", 2
    }

    $url = $parts[0].Trim()
    $gameName = $parts[1].Trim()
    $targetDir = "./Assets/$gameName" # Aligns with your JEOWEB workspace structure

    # Ensure the URL ends with a slash for the patcher
    if (-not $url.EndsWith("/")) { $url += "/" }

    Write-Host "`n>>> Processing: $gameName <<<" -ForegroundColor Magenta
    Write-Host " URL: $url"
    Write-Host " Dir: $targetDir"

    if (-not (Test-Path $targetDir)) {
        Write-Host " [!] Directory $targetDir not found. Did you run import-flash.ps1 first? Skipping..." -ForegroundColor Red
        continue
    }

    Write-Host " [1/3] Spinning up Quarantine Server..." -ForegroundColor Yellow
    $ServerProcess = Start-Process -FilePath "python" -ArgumentList "verify_game.py `"$targetDir`"" -PassThru -WindowStyle Minimized
    Start-Sleep -Seconds 3 # Let server boot

    Write-Host " [2/3] Unleashing Chaos Monkey for $ChaosSeconds seconds..." -ForegroundColor Yellow
    & python auto_play.py $ChaosSeconds

    Write-Host " [3/3] Shutting down Quarantine Server..." -ForegroundColor Yellow
    Stop-Process -Id $ServerProcess.Id -Force

    Write-Host " [4/4] Patching missing assets..." -ForegroundColor Yellow
    if (Test-Path "missing_assets.txt") {
        & pwsh patch-missing.ps1 -OriginalBaseUrl $url -TargetDir $targetDir
        Remove-Item "missing_assets.txt" -Force
    } else {
        Write-Host " No missing files detected for $gameName. It is 100% offline!" -ForegroundColor Green
    }
}

# ============================================================
#  POST-PROCESSING: REPAIRS & CATALOG UPDATE
#  Runs the shell repair script for known bugs and rebuilds 
#  the games_list.json using Node.
# ============================================================

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host " [PHASE 3] RUNNING CUSTOM REPAIRS (repair-games.sh)..." -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Cyan

# Executes your existing bash repair script
try {
    bash ./repair-games.sh
} catch {
    Write-Host " [!] Failed to run repair-games.sh. Do you have bash installed?" -ForegroundColor Red
}

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host " [PHASE 4] REBUILDING GAME CATALOG (scan.js)..." -ForegroundColor Yellow
Write-Host "=======================================================" -ForegroundColor Cyan

# Executes your existing Node scanner to update games_list.json
try {
    node ./scan.js
} catch {
    Write-Host " [!] Failed to run scan.js. Is Node.js installed?" -ForegroundColor Red
}

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host " 🚀 TOTAL ARCHIVAL PIPELINE COMPLETE! 🚀" -ForegroundColor Green
Write-Host " Your games are downloaded, air-gapped, patched, repaired," -ForegroundColor Green
Write-Host " and successfully added to your local catalog." -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan