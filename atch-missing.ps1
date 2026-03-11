# ============================================================
#  MISSING ASSET PATCHER
#  Reads missing_assets.txt, maps them back to the live site,
#  and downloads them into the correct local folders.
# ============================================================

param (
    [Parameter(Mandatory=$true)]
    [string]$OriginalBaseUrl,  # e.g., https://example.com/games/cool-game

    [Parameter(Mandatory=$true)]
    [string]$TargetDir,        # e.g., ./flash-import/cool-game

    [string]$MissingList = "missing_assets.txt"
)

if (-not (Test-Path $MissingList)) {
    Write-Host " [!] No $MissingList found. Looks like you have everything!" -ForegroundColor Green
    exit
}

# Ensure base URL ends with a slash for clean combining
if (-not $OriginalBaseUrl.EndsWith("/")) {
    $OriginalBaseUrl += "/"
}

$lines = Get-Content $MissingList | Where-Object { $_.Trim() -ne "" }
$patchedCount = 0

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " INITIATING PATCH SEQUENCE" -ForegroundColor Cyan
Write-Host " Target Game Directory : $TargetDir"
Write-Host " Original Server URL   : $OriginalBaseUrl"
Write-Host "=======================================================" -ForegroundColor Cyan

foreach ($url in $lines) {
    # Strip out the localhost domain to get the relative path
    # Example: http://localhost:8080/assets/sound.mp3 -> assets/sound.mp3
    $relativePath = $url -replace "^http://localhost:\d+/", ""
    
    # Rebuild the live target URL
    $liveUrl = "$OriginalBaseUrl$relativePath"
    
    # Build the local destination path, fixing Windows slashes
    $localDest = Join-Path $TargetDir ($relativePath -replace "/", [System.IO.Path]::DirectorySeparatorChar)
    
    # Ensure the sub-folder exists locally
    $localParent = Split-Path $localDest -Parent
    if (-not (Test-Path $localParent)) {
        New-Item -ItemType Directory -Path $localParent -Force | Out-Null
    }

    Write-Host " Fetching: $relativePath ..." -NoNewline
    
    # Download the file using wget
    try {
        & wget -q --no-check-certificate --timeout=15 --tries=3 `
            "--header=User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)" `
            -O $localDest $liveUrl 2>&1 | Out-Null

        if ((Test-Path $localDest) -and (Get-Item $localDest).Length -gt 0) {
            Write-Host " [OK]" -ForegroundColor Green
            $patchedCount++
        } else {
            Write-Host " [FAILED] File might be dead on the server." -ForegroundColor Red
            Remove-Item $localDest -Force -ErrorAction SilentlyContinue
        }
    } catch {
        Write-Host " [ERROR]" -ForegroundColor Red
    }
}

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host " PATCHING COMPLETE: $patchedCount files repaired." -ForegroundColor Green
Write-Host "=======================================================" -ForegroundColor Cyan