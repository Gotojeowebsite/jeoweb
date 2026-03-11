# ============================================================
#  MASTER GAME ARCHIVER
#  Automates the Downloader, Quarantine Server, Chaos Monkey, 
#  and Patcher into a single workflow.
# ============================================================

param (
    [Parameter(Mandatory=$true)]
    [string]$TargetUrl,

    [Parameter(Mandatory=$true)]
    [string]$TargetDir,

    [int]$ChaosSeconds = 60
)

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " INITIATING FULL ARCHIVAL PROTOCOL" -ForegroundColor Cyan
Write-Host " Target URL  : $TargetUrl"
Write-Host " Output Dir  : $TargetDir"
Write-Host " Chaos Timer : $ChaosSeconds seconds"
Write-Host "=======================================================" -ForegroundColor Cyan

# Ensure output directory exists
if (-not (Test-Path $TargetDir)) {
    New-Item -ItemType Directory -Path $TargetDir -Force | Out-Null
}

Write-Host "`n[STEP 1] Mirroring base game files..." -ForegroundColor Yellow
# Using the recursive wget approach
& wget -q --mirror --page-requisites --adjust-extension --convert-links --no-parent --execute robots=off --no-check-certificate --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64)" --directory-prefix=$TargetDir --no-host-directories $TargetUrl

Write-Host "`n[STEP 2] Spinning up Quarantine Server..." -ForegroundColor Yellow
# Start the Python server in the background and capture its Process ID (PID)
$ServerProcess = Start-Process -FilePath "python" -ArgumentList "verify_game.py `"$TargetDir`"" -PassThru -WindowStyle Minimized
Start-Sleep -Seconds 3 # Give the server a moment to boot

Write-Host "`n[STEP 3] Unleashing Chaos Monkey for $ChaosSeconds seconds..." -ForegroundColor Yellow
# Run the Playwright automation
& python auto_play.py $ChaosSeconds

Write-Host "`n[STEP 4] Shutting down Quarantine Server..." -ForegroundColor Yellow
Stop-Process -Id $ServerProcess.Id -Force

Write-Host "`n[STEP 5] Patching missing assets..." -ForegroundColor Yellow
if (Test-Path "missing_assets.txt") {
    & pwsh patch-missing.ps1 -OriginalBaseUrl $TargetUrl -TargetDir $TargetDir
    # Optional: Delete the text file after patching so it's clean for the next run
    Remove-Item "missing_assets.txt" -Force
} else {
    Write-Host " No missing files detected! The game is 100% offline." -ForegroundColor Green
}

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host " ARCHIVAL COMPLETE. Game is locked and loaded." -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan