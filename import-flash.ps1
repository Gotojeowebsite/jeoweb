# ============================================================
#  GAME IMPORTER / DOWNLOADER
#
#  Download full game websites or import .swf files.
#  Automatically searches for thumbnail images online and
#  updates games_list.json.
#
#  Usage:
#    Download from URL:     pwsh import-flash.ps1 <URL> [game-name]
#    Import SWF files:      pwsh import-flash.ps1
#    Fetch missing images:  pwsh import-flash.ps1 --fetch-images
#    Rescan games list:     pwsh import-flash.ps1 --scan
#
#  Examples:
#    pwsh import-flash.ps1 https://example.com/games/cool-game/
#    pwsh import-flash.ps1 https://example.com/game/ my-cool-game
#    pwsh import-flash.ps1 --fetch-images
# ============================================================

$assetsDir     = Join-Path $PSScriptRoot "Assets"
$importDir     = Join-Path $PSScriptRoot "flash-import"
$gamesListFile = Join-Path $PSScriptRoot "games_list.json"

# ---- Parse arguments (normalize dashes — accept em-dash, en-dash, etc.) ----
$normalizedArgs = @($args | ForEach-Object { $_ -replace '^[\u2013\u2014]+', '--' })
$flagFetchImages = $normalizedArgs -contains '--fetch-images'
$flagScan        = $normalizedArgs -contains '--scan'
$positionalArgs  = @($normalizedArgs | Where-Object { $_ -notlike '--*' })
$inputUrl        = if ($positionalArgs.Count -ge 1) { $positionalArgs[0] } else { $null }
$inputName       = if ($positionalArgs.Count -ge 2) { $positionalArgs[1] } else { $null }

# ============================================================
#  IMAGE SEARCH - downloads a game thumbnail from Bing
# ============================================================
function Download-GameImage($searchName, $destDir) {
    $queries = @(
        "$searchName game logo",
        "$searchName game thumbnail",
        "$searchName game",
        "$searchName"
    )
    foreach ($rawQuery in $queries) {
        try {
            $query     = [uri]::EscapeDataString($rawQuery)
            $searchUrl = "https://www.bing.com/images/search?q=$query&first=1&count=8&qft=+filterui:imagesize-medium"
            $response  = Invoke-WebRequest -Uri $searchUrl -UseBasicParsing -Headers @{
                "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            } -TimeoutSec 15 -ErrorAction Stop

            $imgMatches = [regex]::Matches(
                $response.Content,
                'murl&quot;:&quot;(https?://[^&]+?\.(jpg|jpeg|png|gif|webp))'
            )
            if ($imgMatches.Count -gt 0) {
                foreach ($m in $imgMatches) {
                    try {
                        $imgUrl   = $m.Groups[1].Value
                        $ext      = $m.Groups[2].Value
                        $destFile = Join-Path $destDir "logo.$ext"
                        Invoke-WebRequest -Uri $imgUrl -OutFile $destFile `
                            -UseBasicParsing -TimeoutSec 15 -ErrorAction Stop
                        if ((Get-Item $destFile).Length -gt 1024) {
                            return $destFile
                        }
                        Remove-Item $destFile -Force -ErrorAction SilentlyContinue
                    } catch { continue }
                }
            }
        } catch { continue }
    }
    return $null
}

# ============================================================
#  FIND GAME ROOT - navigate wget output to the real game dir
# ============================================================
function Find-GameRoot($dir) {
    if (-not (Test-Path $dir)) { return $dir }

    # Directory has index.html -> this is the root
    if (Test-Path (Join-Path $dir "index.html")) { return $dir }

    # Any HTML file here -> likely the root
    $htmlFiles = Get-ChildItem -Path $dir -Filter "*.html" -File -ErrorAction SilentlyContinue
    if ($htmlFiles -and $htmlFiles.Count -gt 0) { return $dir }

    # Single subdirectory and no real files -> go deeper
    $subDirs = Get-ChildItem -Path $dir -Directory -ErrorAction SilentlyContinue
    $files   = Get-ChildItem -Path $dir -File -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -notin @('wget.log','robots.txt','robots.txt.html','.listing') }

    if ($subDirs -and $subDirs.Count -eq 1 -and (-not $files -or $files.Count -eq 0)) {
        return Find-GameRoot $subDirs[0].FullName
    }

    # Multiple subdirs - check each for index.html
    if ($subDirs) {
        foreach ($sd in $subDirs) {
            if (Test-Path (Join-Path $sd.FullName "index.html")) {
                return $sd.FullName
            }
        }
        foreach ($sd in $subDirs) {
            $result = Find-GameRoot $sd.FullName
            if ($result -ne $sd.FullName) { return $result }
            $htmlInSd = Get-ChildItem -Path $sd.FullName -Filter "*.html" -File -ErrorAction SilentlyContinue
            if ($htmlInSd -and $htmlInSd.Count -gt 0) { return $sd.FullName }
        }
    }

    return $dir
}

# ============================================================
#  SCAN & UPDATE games_list.json
# ============================================================
function Update-GamesList {
    $imageExts = @('.png','.jpg','.jpeg','.gif','.webp','.svg','.ico')

    function Local:Find-BestImage($folderPath, $folderName) {
        $allImages = Get-ChildItem -Path $folderPath -Recurse -File -ErrorAction SilentlyContinue |
            Where-Object { $imageExts -contains $_.Extension.ToLower() }
        if (-not $allImages -or $allImages.Count -eq 0) { return "notavailable.svg" }

        $norm = [System.IO.Path]::GetFullPath($folderPath)
        # Prioritise searched logos over built-in game images
        $priorityNames = @('logo','icon','splash','thumb','thumbnail',$folderName.ToLower())
        foreach ($pn in $priorityNames) {
            $match = $allImages | Where-Object {
                [System.IO.Path]::GetFileNameWithoutExtension($_.Name).ToLower() -eq $pn
            } | Select-Object -First 1
            if ($match) {
                $rel = [System.IO.Path]::GetRelativePath($norm, $match.FullName).Replace('\','/')
                return "Assets/$folderName/$rel"
            }
        }
        $rootImg = $allImages | Where-Object {
            $_.DirectoryName -eq $norm
        } | Select-Object -First 1
        if ($rootImg) { return "Assets/$folderName/$($rootImg.Name)" }

        $first = $allImages | Select-Object -First 1
        $rel   = [System.IO.Path]::GetRelativePath($norm, $first.FullName).Replace('\','/')
        return "Assets/$folderName/$rel"
    }

    $results    = @()
    $flashCount = 0
    $webglCount = 0
    $dirs = Get-ChildItem -Path $assetsDir -Directory | Sort-Object { $_.Name.ToLower() }

    foreach ($d in $dirs) {
        $htmlFiles = Get-ChildItem -Path $d.FullName -Filter "*.html" -File -ErrorAction SilentlyContinue
        if (-not $htmlFiles -or $htmlFiles.Count -eq 0) { continue }
        $htmlFile = ($htmlFiles | Where-Object { $_.Name.ToLower() -eq 'index.html' } |
            Select-Object -First 1)
        if (-not $htmlFile) { $htmlFile = $htmlFiles | Select-Object -First 1 }

        $image = Local:Find-BestImage $d.FullName $d.Name

        $swfHit  = Get-ChildItem -Path $d.FullName -Recurse -Filter "*.swf" -ErrorAction SilentlyContinue
        $isFlash = ($swfHit -and $swfHit.Count -gt 0)
        $type    = if ($isFlash) { "flash" } else { "webgl" }
        if ($isFlash) { $flashCount++ } else { $webglCount++ }

        $results += [PSCustomObject][ordered]@{
            name  = $d.Name
            url   = "Assets/$($d.Name)/$($htmlFile.Name)"
            image = $image
            type  = $type
        }
    }

    $json = $results | ConvertTo-Json -Depth 3
    if ($results.Count -le 1) { $json = "[$json]" }
    [System.IO.File]::WriteAllText($gamesListFile, $json, [System.Text.Encoding]::UTF8)
    Write-Host "  Updated games_list.json -> $($results.Count) games ($flashCount Flash, $webglCount WebGL)" -ForegroundColor Cyan
}

# ============================================================
#  EXTRACT ASSET PATHS from JS/CSS/HTML files
#  wget only follows HTML <a> links — this catches everything
#  referenced in JS bundles (models, audio, fonts, wasm, etc.)
# ============================================================
$assetExtensions = @(
    'glb','gltf','obj','fbx','dae',
    'mp3','ogg','wav','flac','m4a','aac',
    'wasm','data','bin','mem','pck','unityweb','unity3d',
    'png','jpg','jpeg','gif','webp','bmp','ico','svg',
    'ttf','woff','woff2','otf','eot','fnt',
    'json','xml','atlas','csv','txt',
    'js','css','map',
    'mp4','webm','ogv',
    'zip','gz','br'
)
$extPattern = ($assetExtensions -join '|')

function Extract-AssetPaths($localDir) {
    $paths = @{}
    $textFiles = Get-ChildItem -Path $localDir -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            $_.Extension.ToLower() -in @('.html','.htm','.js','.css','.json','.xml','.svg') -and
            $_.Length -lt 50MB
        }
    foreach ($f in $textFiles) {
        try {
            $content = [System.IO.File]::ReadAllText($f.FullName)
            $relDir  = [System.IO.Path]::GetRelativePath($localDir, $f.DirectoryName).Replace('\','/')
            if ($relDir -eq '.') { $relDir = '' }

            # Match quoted paths like "models/car.glb" or './audio/engine.ogg'
            $matches1 = [regex]::Matches($content, "[""']\.{0,2}/?((?:[a-zA-Z0-9_\-]+/)*[a-zA-Z0-9_\-]+\.(?:$extPattern))[""']")
            foreach ($m in $matches1) {
                $assetPath = $m.Groups[1].Value -replace '^\./+', ''
                # If asset path is relative and the file is in a subdir, resolve it
                if ($relDir -and -not $assetPath.Contains('/') -and -not ($assetPath -match '^https?:')) {
                    # Root-relative path (starts with no dir) — try as-is first
                }
                if (-not $paths.ContainsKey($assetPath)) {
                    $paths[$assetPath] = $true
                }
            }

            # Also match src="..." href="..." url(...) patterns for paths without quotes
            $matches2 = [regex]::Matches($content, "(?:src|href|url)\s*[\(=]\s*[""']?((?:[a-zA-Z0-9_\-]+/)*[a-zA-Z0-9_\-]+\.(?:$extPattern))[""'\)]")
            foreach ($m in $matches2) {
                $assetPath = $m.Groups[1].Value -replace '^\./+', ''
                if (-not $paths.ContainsKey($assetPath)) {
                    $paths[$assetPath] = $true
                }
            }

            # Match webpack-style paths like e.exports="audio/engine.ogg" or n="models/car.glb"
            $matches3 = [regex]::Matches($content, "=\s*[""']((?:[a-zA-Z0-9_\-]+/)+[a-zA-Z0-9_\-]+\.(?:$extPattern))[""']")
            foreach ($m in $matches3) {
                $assetPath = $m.Groups[1].Value
                if (-not $paths.ContainsKey($assetPath)) {
                    $paths[$assetPath] = $true
                }
            }
        } catch { continue }
    }
    return $paths.Keys | Where-Object {
        $_ -and
        $_ -notmatch '^https?:' -and
        $_ -notmatch '^\.\.' -and
        $_ -notmatch 'node_modules' -and
        $_.Length -lt 300
    } | Sort-Object
}

# ============================================================
#  DOWNLOAD GAME FROM URL  (wget + JS asset extraction)
# ============================================================
function Import-GameFromUrl($url, $gameName) {
    # ---- pre-checks ----
    if (-not (Get-Command 'wget' -ErrorAction SilentlyContinue)) {
        Write-Host "  ERROR: wget is required. Install: sudo apt install wget" -ForegroundColor Red
        return $false
    }
    if (-not ($url -match '^https?://')) {
        Write-Host "  ERROR: URL must start with http:// or https://" -ForegroundColor Red
        return $false
    }

    # ---- derive game name ----
    if (-not $gameName) {
        $uri      = [uri]$url
        $segments = $uri.AbsolutePath.Trim('/').Split('/') |
            Where-Object { $_ -and $_ -ne 'index.html' -and $_ -ne 'index.htm' }
        $gameName = $segments | Select-Object -Last 1
        if (-not $gameName) { $gameName = $uri.Host -replace '\..*$', '' }
    }
    $gameName = $gameName.ToLower() -replace '\s+', '-' -replace '[^a-z0-9\-]', ''
    if (-not $gameName) {
        Write-Host "  ERROR: Cannot determine game name. Usage: pwsh import-flash.ps1 <URL> <name>" -ForegroundColor Red
        return $false
    }

    $gameDir = Join-Path $assetsDir $gameName
    if (Test-Path $gameDir) {
        Write-Host "  SKIP  Assets/$gameName/ already exists. Delete it first to re-download." -ForegroundColor DarkYellow
        return $false
    }

    Write-Host ""
    Write-Host "  URL:  $url"  -ForegroundColor Cyan
    Write-Host "  Name: $gameName" -ForegroundColor Cyan
    Write-Host ""

    # ---- Normalize base URL (ensure trailing slash for directory URLs) ----
    $baseUrl = $url
    if ($baseUrl -match '\.(html?|php|asp)$') {
        $baseUrl = $baseUrl -replace '/[^/]*$', '/'
    } elseif ($baseUrl -notmatch '/$') {
        $baseUrl = "$baseUrl/"
    }

    # ---- Step 1: wget recursive download ----
    $tempDir = Join-Path ([System.IO.Path]::GetTempPath()) "game-dl-$(Get-Random)"
    New-Item -ItemType Directory -Path $tempDir -Force | Out-Null

    try {
        Write-Host "  [1/3] Downloading via wget (HTML-linked files)..." -ForegroundColor Gray
        $domain = ([uri]$url).Host

        & wget `
            --recursive `
            --level=15 `
            --no-clobber `
            --page-requisites `
            --adjust-extension `
            --restrict-file-names=unix `
            --no-parent `
            "--domains=$domain" `
            -e robots=off `
            --timeout=30 `
            --tries=3 `
            --waitretry=1 `
            --no-check-certificate `
            "--header=User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" `
            -P $tempDir `
            $url 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }

        # ---- locate downloaded content ----
        $topDirs = Get-ChildItem -Path $tempDir -Directory -ErrorAction SilentlyContinue
        if (-not $topDirs -or $topDirs.Count -eq 0) {
            Write-Host "  ERROR: No files downloaded. Check the URL." -ForegroundColor Red
            return $false
        }

        $gameRoot = Find-GameRoot $topDirs[0].FullName
        $allFiles = Get-ChildItem -Path $gameRoot -Recurse -File -ErrorAction SilentlyContinue
        if (-not $allFiles -or $allFiles.Count -eq 0) {
            Write-Host "  ERROR: Download produced no usable files." -ForegroundColor Red
            return $false
        }

        Write-Host "  wget got $($allFiles.Count) files" -ForegroundColor Gray

        # ---- copy to Assets ----
        New-Item -ItemType Directory -Path $gameDir -Force | Out-Null
        Copy-Item -Path "$gameRoot/*" -Destination $gameDir -Recurse -Force

        # Remove junk wget might leave behind
        Get-ChildItem -Path $gameDir -Recurse `
            -Include 'robots.txt','robots.txt.html','.listing' `
            -ErrorAction SilentlyContinue |
            Remove-Item -Force -ErrorAction SilentlyContinue

        # ---- Step 2: Scan JS/CSS/HTML for dynamic asset paths and download them ----
        Write-Host "  [2/3] Scanning JS/CSS/HTML for dynamic asset references..." -ForegroundColor Gray
        $assetPaths = Extract-AssetPaths $gameDir

        if ($assetPaths -and $assetPaths.Count -gt 0) {
            # Filter to only assets not already downloaded
            $missing = @()
            foreach ($ap in $assetPaths) {
                $localPath = Join-Path $gameDir ($ap.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                if (-not (Test-Path $localPath)) {
                    $missing += $ap
                }
            }

            # Deduplicate: if both "foo.svg" and "images/foo.svg" are missing,
            # only try the subdirectory version (it's the real path)
            $deduped = @()
            $subdirPaths = $missing | Where-Object { $_ -match '/' }
            $rootPaths   = $missing | Where-Object { $_ -notmatch '/' }
            $deduped += $subdirPaths
            foreach ($rp in $rootPaths) {
                $hasSubdirVersion = $subdirPaths | Where-Object { $_.EndsWith("/$rp") }
                if (-not $hasSubdirVersion) {
                    $deduped += $rp
                }
            }

            if ($deduped.Count -gt 0) {
                Write-Host "  Found $($deduped.Count) assets referenced in code but not downloaded" -ForegroundColor Gray
                $downloaded = 0; $failedDl = 0

                # Download each asset individually with wget
                foreach ($asset in $deduped) {
                    $assetUrl  = "$baseUrl$asset"
                    $localPath = Join-Path $gameDir ($asset.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                    $localDir  = Split-Path $localPath -Parent

                    if (-not (Test-Path $localDir)) {
                        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
                    }

                    $originHost = "$([uri]$url |% { "$($_.Scheme)://$($_.Host)" })"
                    & wget -q --no-check-certificate --timeout=20 --tries=2 `
                        "--header=User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" `
                        "--header=Referer: $url" `
                        "--header=Origin: $originHost" `
                        "--header=Accept: */*" `
                        -O $localPath `
                        $assetUrl 2>&1 | Out-Null

                    if (Test-Path $localPath) {
                        $size = (Get-Item $localPath).Length
                        # Check if the file is an HTML error page disguised as an asset
                        $isError = $false
                        $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                        if ($ext -notin @('.html','.htm','.svg','.xml') -and $size -gt 0 -and $size -lt 10000) {
                            try {
                                $header = [System.IO.File]::ReadAllBytes($localPath) | Select-Object -First 50
                                $headerStr = [System.Text.Encoding]::ASCII.GetString($header)
                                if ($headerStr -match '<!DOCTYPE|<html|<HTML|403 Forbidden|Access Denied') {
                                    $isError = $true
                                }
                            } catch {}
                        }
                        if ($isError -or $size -eq 0) {
                            Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                            $failedDl++
                        } else {
                            $downloaded++
                            Write-Host "    +  $asset ($([math]::Round($size/1024))KB)" -ForegroundColor DarkGreen
                        }
                    } else {
                        $failedDl++
                    }
                }
                Write-Host "  Asset scan: $downloaded downloaded, $failedDl not found/blocked" -ForegroundColor Gray

                # If some files were blocked, try individual Invoke-WebRequest as fallback
                if ($failedDl -gt 0) {
                    $stillMissing = @()
                    foreach ($asset in $deduped) {
                        $localPath = Join-Path $gameDir ($asset.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                        if (-not (Test-Path $localPath)) { $stillMissing += $asset }
                    }
                    if ($stillMissing.Count -gt 0) {
                        Write-Host "  Retrying $($stillMissing.Count) blocked files with session cookies..." -ForegroundColor Gray
                        # First visit the page to establish a session
                        $session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
                        try {
                            Invoke-WebRequest -Uri $url -UseBasicParsing -WebSession $session `
                                -Headers @{ "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" } `
                                -TimeoutSec 15 -ErrorAction SilentlyContinue | Out-Null
                        } catch {}

                        $retryOk = 0
                        foreach ($asset in $stillMissing) {
                            $assetUrl  = "$baseUrl$asset"
                            $localPath = Join-Path $gameDir ($asset.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                            $localDir  = Split-Path $localPath -Parent
                            try {
                                if (-not (Test-Path $localDir)) {
                                    New-Item -ItemType Directory -Path $localDir -Force | Out-Null
                                }
                                $resp = Invoke-WebRequest -Uri $assetUrl -OutFile $localPath `
                                    -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop `
                                    -WebSession $session `
                                    -Headers @{
                                        "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                                        "Referer"    = $url
                                        "Accept"     = "*/*"
                                        "Origin"     = "$([uri]$url |% { "$($_.Scheme)://$($_.Host)" })"
                                    }
                                $size = (Get-Item $localPath).Length
                                $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                                # Validate not an error page
                                $valid = $true
                                if ($ext -notin @('.html','.htm','.svg','.xml') -and $size -lt 10000 -and $size -gt 0) {
                                    $headerBytes = [System.IO.File]::ReadAllBytes($localPath) | Select-Object -First 50
                                    $headerStr = [System.Text.Encoding]::ASCII.GetString($headerBytes)
                                    if ($headerStr -match '<!DOCTYPE|<html|<HTML|403|Access Denied') { $valid = $false }
                                }
                                if ($valid -and $size -gt 0) {
                                    Write-Host "    +  $asset ($([math]::Round($size/1024))KB) [retry]" -ForegroundColor DarkGreen
                                    $retryOk++
                                } else {
                                    Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                                }
                            } catch {
                                Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                            }
                        }
                        if ($retryOk -gt 0) {
                            Write-Host "  Retry recovered $retryOk files" -ForegroundColor Gray
                        }
                    }
                }
            } else {
                Write-Host "  All referenced assets already present" -ForegroundColor Gray
            }

            # ---- Recursive pass: scan newly downloaded JS files for more assets ----
            $newAssets = Extract-AssetPaths $gameDir
            if ($newAssets) {
                $secondMissing = @()
                foreach ($ap in $newAssets) {
                    $localPath = Join-Path $gameDir ($ap.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                    if (-not (Test-Path $localPath)) {
                        # Skip root-level duplicates of subdir assets
                        if ($ap -notmatch '/') {
                            $hasSub = @($newAssets | Where-Object { $_ -match '/' -and $_.EndsWith("/$ap") })
                            if ($hasSub.Count -gt 0) {
                                $subPath = Join-Path $gameDir ($hasSub[0].Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                                if (Test-Path $subPath) { continue }
                            }
                        }
                        $secondMissing += $ap
                    }
                }
                if ($secondMissing.Count -gt 0) {
                    Write-Host "  Second pass: $($secondMissing.Count) more assets to fetch" -ForegroundColor Gray
                    foreach ($asset in $secondMissing) {
                        $assetUrl  = "$baseUrl$asset"
                        $localPath = Join-Path $gameDir ($asset.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                        $localDir  = Split-Path $localPath -Parent
                        try {
                            if (-not (Test-Path $localDir)) {
                                New-Item -ItemType Directory -Path $localDir -Force | Out-Null
                            }
                            Invoke-WebRequest -Uri $assetUrl -OutFile $localPath `
                                -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop `
                                -Headers @{
                                    "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
                                    "Referer"    = $url
                                    "Origin"     = "$([uri]$url |% { "$($_.Scheme)://$($_.Host)" })"
                                }
                            $size = (Get-Item $localPath).Length
                            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                            $valid = $true
                            if ($ext -notin @('.html','.htm','.svg','.xml') -and $size -lt 10000 -and $size -gt 0) {
                                $hdr = [System.Text.Encoding]::ASCII.GetString(([System.IO.File]::ReadAllBytes($localPath) | Select-Object -First 50))
                                if ($hdr -match '<!DOCTYPE|<html|403|Access Denied') { $valid = $false }
                            }
                            if ($valid -and $size -gt 0) {
                                Write-Host "    +  $asset" -ForegroundColor DarkGreen
                            } else {
                                Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                            }
                        } catch {
                            Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                        }
                    }
                }
            }
        } else {
            Write-Host "  No dynamic asset references found in code" -ForegroundColor Gray
        }

        # ---- Step 2b: Recover known blocked runtime files from trusted mirrors ----
        $fallbackAssets = @(
            @{ Path = 'lib/ammo.wasm.js'; Url = 'https://cdn.jsdelivr.net/npm/ammo.js@0.0.10/ammo.js'; MinBytes = 200000 },
            @{ Path = 'draco_decoder.js'; Url = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_decoder.js'; MinBytes = 200000 },
            @{ Path = 'draco_wasm_wrapper.js'; Url = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_wasm_wrapper.js'; MinBytes = 50000 },
            @{ Path = 'draco_decoder.wasm'; Url = 'https://www.gstatic.com/draco/versioned/decoders/1.5.6/draco_decoder.wasm'; MinBytes = 200000 }
        )

        $fallbackRecovered = 0
        foreach ($fa in $fallbackAssets) {
            $destPath = Join-Path $gameDir ($fa.Path.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
            if (Test-Path $destPath) { continue }

            $destDir = Split-Path $destPath -Parent
            if (-not (Test-Path $destDir)) {
                New-Item -ItemType Directory -Path $destDir -Force | Out-Null
            }

            try {
                Invoke-WebRequest -Uri $fa.Url -OutFile $destPath -UseBasicParsing -TimeoutSec 25 -ErrorAction Stop `
                    -Headers @{ "User-Agent" = "Mozilla/5.0"; "Accept" = "*/*" }

                $size = (Get-Item $destPath).Length
                if ($size -lt [int]$fa.MinBytes) {
                    Remove-Item $destPath -Force -ErrorAction SilentlyContinue
                    continue
                }

                $head = [System.Text.Encoding]::ASCII.GetString(([System.IO.File]::ReadAllBytes($destPath) | Select-Object -First 120))
                if ($head -match '<!DOCTYPE|<html|AccessDenied|403') {
                    Remove-Item $destPath -Force -ErrorAction SilentlyContinue
                    continue
                }

                $fallbackRecovered++
                Write-Host "    +  fallback $($fa.Path)" -ForegroundColor DarkGreen
            } catch {
                Remove-Item $destPath -Force -ErrorAction SilentlyContinue
            }
        }
        if ($fallbackRecovered -gt 0) {
            Write-Host "  Recovered $fallbackRecovered blocked runtime files from mirrors" -ForegroundColor Gray
        }

        # CloudFront may block this worker file intermittently; recover from archive if needed.
        $simWorkerPath = Join-Path $gameDir "simulation_worker.bundle.js"
        $needsSimWorker = $true
        if (Test-Path $simWorkerPath) {
            $simSize = (Get-Item $simWorkerPath).Length
            if ($simSize -gt 200000) {
                $needsSimWorker = $false
            }
        }

        if ($needsSimWorker) {
            $simCandidates = @(
                "${baseUrl}simulation_worker.bundle.js",
                "https://web.archive.org/web/20250906225331/${baseUrl}simulation_worker.bundle.js"
            )

            foreach ($candidate in $simCandidates) {
                try {
                    Invoke-WebRequest -Uri $candidate -OutFile $simWorkerPath -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop `
                        -Headers @{ "User-Agent" = "Mozilla/5.0"; "Referer" = $url; "Origin" = "$([uri]$url |% { "$($_.Scheme)://$($_.Host)" })"; "Accept" = "*/*" }

                    $simSize = (Get-Item $simWorkerPath).Length
                    if ($simSize -lt 200000) {
                        Remove-Item $simWorkerPath -Force -ErrorAction SilentlyContinue
                        continue
                    }

                    $simHead = [System.Text.Encoding]::ASCII.GetString(([System.IO.File]::ReadAllBytes($simWorkerPath) | Select-Object -First 200))
                    if ($simHead -match '<!DOCTYPE|<html|AccessDenied|403 Forbidden') {
                        Remove-Item $simWorkerPath -Force -ErrorAction SilentlyContinue
                        continue
                    }

                    Write-Host "    +  fallback simulation_worker.bundle.js" -ForegroundColor DarkGreen
                    break
                } catch {
                    Remove-Item $simWorkerPath -Force -ErrorAction SilentlyContinue
                }
            }
        }

        # Polytrack bundles override Math with deterministic WASM stubs.
        # Some stubs just throw errors — replace ALL of them with native Math.*.
        $mathFuncs = @('acos','asin','atan','atan2','exp','log','pow','sqrt','tan',
                       'log10','log2','log1p','expm1','cosh','sinh','tanh',
                       'acosh','asinh','atanh','hypot','cbrt','clz32','imul')

        foreach ($bundleFile in @($simWorkerPath, (Join-Path $gameDir "main.bundle.js"))) {
            if (-not (Test-Path $bundleFile)) { continue }
            try {
                $bText = Get-Content -Path $bundleFile -Raw -ErrorAction Stop
                $bName = Split-Path $bundleFile -Leaf
                $changed = $false
                foreach ($fn in $mathFuncs) {
                    # Compact style:  funcName:()=>X_("funcName")
                    $pat1 = "${fn}:()=>" + '[A-Za-z_]+\("' + $fn + '"\)'
                    if ($bText -match $pat1) {
                        $bText = [regex]::Replace($bText, $pat1, "${fn}:Math.${fn}")
                        $changed = $true
                    }
                    # Spaced style:  funcName: () => Xb("funcName")
                    $pat2 = "${fn}: \(\) => " + '[A-Za-z_]+\("' + $fn + '"\)'
                    if ($bText -match $pat2) {
                        $bText = [regex]::Replace($bText, $pat2, "${fn}: Math.${fn}")
                        $changed = $true
                    }
                }
                if ($changed) {
                    [System.IO.File]::WriteAllText($bundleFile, $bText)
                    Write-Host "    +  patched $bName deterministic math stubs" -ForegroundColor DarkGreen
                }
            } catch {
                # Non-fatal
            }
        }

        # ---- Step 3: Search for thumbnail online ----
        Write-Host "  [3/3] Searching for thumbnail..." -ForegroundColor Gray
        $prettyName = $gameName -replace '-', ' '
        $imgResult = Download-GameImage $prettyName $gameDir
        if ($imgResult) {
            Write-Host "  IMG   Downloaded: $(Split-Path $imgResult -Leaf)" -ForegroundColor Green
        } else {
            Write-Host "  IMG   No thumbnail found online" -ForegroundColor DarkYellow
        }

        # ---- verify HTML ----
        $rootHtml = Get-ChildItem -Path $gameDir -Filter "*.html" -File -ErrorAction SilentlyContinue
        if (-not $rootHtml) {
            $deepHtml = Get-ChildItem -Path $gameDir -Recurse -Filter "*.html" -File -ErrorAction SilentlyContinue
            if ($deepHtml) {
                Write-Host "  NOTE: HTML is in a subfolder: $($deepHtml[0].Name)" -ForegroundColor DarkYellow
            } else {
                Write-Host "  WARNING: No HTML files found in download" -ForegroundColor Yellow
            }
        }

        $finalCount = (Get-ChildItem -Path $gameDir -Recurse -File).Count
        Write-Host ""
        Write-Host "  OK    Assets/$gameName/ ($finalCount files)" -ForegroundColor Green
        return $gameName
    }
    finally {
        Remove-Item -Path $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    }
}

# ============================================================
#  IMPORT SWF FILES FROM flash-import/ FOLDER
# ============================================================
function Import-SwfFiles {
    if (-not (Test-Path $importDir)) {
        New-Item -ItemType Directory -Path $importDir | Out-Null
        Write-Host "`n  Created flash-import/ folder. Drop .swf files there and run again." -ForegroundColor Yellow
        return 0
    }

    $swfFiles = Get-ChildItem -Path $importDir -Filter "*.swf" -File
    if ($swfFiles.Count -eq 0) {
        Write-Host "`n  No .swf files in flash-import/" -ForegroundColor Yellow
        Write-Host "  Drop SWF files there, or download from a URL:"
        Write-Host "    pwsh import-flash.ps1 <URL> [game-name]`n" -ForegroundColor Gray
        return 0
    }

    $htmlTemplate = @'
<!DOCTYPE HTML>
<html>
<head>
    <meta charset='utf8'>
    <title>Jeo</title>
    <style>
        body, html { margin: 0; padding: 0; overflow: hidden; height: 100%; }
        #ruffle { width: 100vw; height: 100vh; }
    </style>
</head>
<body>
    <div id='ruffle'></div>
    <script src='../zzruffle/ruffle.js'></script>
    <script>
        var swfobject = {};
        swfobject.embedSWF = function(url, cont, width, height){
            var ruffle = window.RufflePlayer.newest(),
                player = Object.assign(document.getElementById(cont).appendChild(ruffle.createPlayer()), {
                    width: width, height: height,
                    style: 'width: 100%; height: 100%;',
                });
            player.load({ url: url });
        }
        swfobject.embedSWF('__SWF_FILE__', 'ruffle', 500, 500);
    </script>
</body>
</html>
'@

    $imported = 0; $skipped = 0

    foreach ($swf in $swfFiles) {
        $gameName = [IO.Path]::GetFileNameWithoutExtension($swf.Name) -replace '\s+', '-'
        $gameName = $gameName.ToLower()
        $gameDir  = Join-Path $assetsDir $gameName

        if (Test-Path $gameDir) {
            Write-Host "  SKIP  $gameName/" -ForegroundColor DarkYellow
            $skipped++; continue
        }

        New-Item -ItemType Directory -Path $gameDir | Out-Null
        Move-Item -Path $swf.FullName -Destination (Join-Path $gameDir $swf.Name)

        $html = $htmlTemplate -replace '__SWF_FILE__', $swf.Name
        [IO.File]::WriteAllText((Join-Path $gameDir "index.html"), $html, [Text.Encoding]::UTF8)

        # Always search for thumbnail online
        $prettyName = $gameName -replace '-', ' '
        $imgResult  = Download-GameImage $prettyName $gameDir
        $imgStatus  = if ($imgResult) { "[image found]" } else { "[no image]" }
        Write-Host "  OK    $gameName/ <- $($swf.Name) $imgStatus" -ForegroundColor Green
        $imported++
    }

    Write-Host "`n  Done! Imported: $imported | Skipped: $skipped" -ForegroundColor Cyan
    return $imported
}

# ============================================================
#  FETCH MISSING IMAGES  (search online for games without logos)
# ============================================================
function Fetch-MissingImages {
    Write-Host "`n  Scanning for games missing thumbnail images..." -ForegroundColor Cyan
    $dirs    = Get-ChildItem -Path $assetsDir -Directory | Sort-Object { $_.Name.ToLower() }
    $fetched = 0; $failed = 0; $already = 0

    foreach ($d in $dirs) {
        # Only process directories that are actual games (have an HTML file)
        $hasHtml = Get-ChildItem -Path $d.FullName -Filter "*.html" -File -ErrorAction SilentlyContinue
        if (-not $hasHtml) { continue }

        # Check for existing searched logo (not random built-in images)
        $hasLogo = Get-ChildItem -Path $d.FullName -File -ErrorAction SilentlyContinue |
            Where-Object { $_.BaseName.ToLower() -in @('logo','thumb','thumbnail') }
        if ($hasLogo) { $already++; continue }

        $prettyName = $d.Name -replace '-', ' '
        $result = Download-GameImage $prettyName $d.FullName
        if ($result) {
            Write-Host "  IMG   $($d.Name)/" -ForegroundColor Green
            $fetched++
        } else {
            Write-Host "  MISS  $($d.Name)/" -ForegroundColor DarkYellow
            $failed++
        }
    }

    Write-Host "`n  Images: $fetched downloaded | $failed not found | $already already had logos`n" -ForegroundColor Cyan
}

# ============================================================
#  MAIN
# ============================================================
Write-Host ""
Write-Host "  === Jeo Game Importer ===" -ForegroundColor White
Write-Host ""

# ============================================================
#  UPDATE recently_added.json (prepend a game name)
# ============================================================
function Add-ToRecentlyAdded($name) {
    $raFile = Join-Path $PSScriptRoot "recently_added.json"
    $list = @()
    if (Test-Path $raFile) {
        try {
            $raw = Get-Content -Path $raFile -Raw -ErrorAction Stop
            $parsed = $raw | ConvertFrom-Json -ErrorAction Stop
            if ($parsed -is [array]) { $list = @($parsed) }
        } catch { }
    }
    # Remove if already present, then prepend
    $list = @($name) + @($list | Where-Object { $_ -ne $name })
    $list | ConvertTo-Json | Set-Content -Path $raFile -Encoding UTF8
    Write-Host "  Updated recently_added.json (now $($list.Count) entries)" -ForegroundColor DarkGreen
}

if ($flagFetchImages) {
    Fetch-MissingImages
    Update-GamesList
}
elseif ($flagScan) {
    Update-GamesList
}
elseif ($inputUrl) {
    $importedName = Import-GameFromUrl $inputUrl $inputName
    if ($importedName) {
        Write-Host ""
        Write-Host "  Updating games list..." -ForegroundColor Gray
        Update-GamesList
        Add-ToRecentlyAdded $importedName
    }
}
else {
    # SWF import mode (original behavior)
    $count = Import-SwfFiles
    if ($count -gt 0) {
        Write-Host ""
        Write-Host "  Updating games list..." -ForegroundColor Gray
        Update-GamesList
    }
}

Write-Host ""
