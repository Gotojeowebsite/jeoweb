# ============================================================
#  GAME IMPORTER / DOWNLOADER
#
#  Download full game websites or import .swf files.
#  Automatically searches for thumbnail images online and
#  updates games_list.json.
#
#  Usage:
#    Download from URL:     pwsh import-flash.ps1 <URL> [game-name]
#    Batch from text file:  pwsh import-flash.ps1 --batch flash-batch.txt
#    Import SWF files:      pwsh import-flash.ps1
#    Fetch missing images:  pwsh import-flash.ps1 --fetch-images
#    Rescan games list:     pwsh import-flash.ps1 --scan
#
#  Examples:
#    pwsh import-flash.ps1 https://example.com/games/cool-game/
#    pwsh import-flash.ps1 https://example.com/game/ my-cool-game
#    pwsh import-flash.ps1 --batch flash-batch.txt
#    pwsh import-flash.ps1 --fetch-images
# ============================================================
# The ultimate offline-mirror wget command
# ============================================================
#  SMART URL EXTRACTOR (Strips Portal Wrappers & Ads)
#  Finds the true game link hidden inside the website's iframe
# ============================================================
function Resolve-GameUrl {
    param([string]$OriginalUrl)

    # 1. Hardcoded fix specifically for 1games.io (Auto-injects /game/)
    if ($OriginalUrl -match "1games\.io/([^/]+)/?$") {
        $slug = $matches[1]
        # Make sure it isn't already formatted correctly
        if ($slug -ne "game" -and $OriginalUrl -notmatch "1games\.io/game/") {
            $FixedUrl = "https://1games.io/game/$slug/"
            Write-Host " [!] Auto-fixed 1games.io portal link to: $FixedUrl" -ForegroundColor Green
            return $FixedUrl
        }
    }

    # 2. Generic Iframe Hunter for all other websites
    Write-Host " [?] Scanning $OriginalUrl for hidden game iframes..." -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri $OriginalUrl -UseBasicParsing -ErrorAction SilentlyContinue
        
        # Regex to hunt down the <iframe src="..."> tag
        if ($response.Content -match '(?i)<iframe[^>]+src=["'']([^"'']+)["''][^>]*>') {
            $iframeSrc = $matches[1]
            
            # If the iframe link is relative (e.g. "/games/zombie/index.html"), make it a full URL
            if ($iframeSrc.StartsWith("/")) {
                $uri = [System.Uri]$OriginalUrl
                $iframeSrc = "{0}://{1}{2}" -f $uri.Scheme, $uri.Authority, $iframeSrc
            }
            
            Write-Host " [!] Extracted raw game link: $iframeSrc" -ForegroundColor Green
            return $iframeSrc
        }
    } catch {
        # If the scan fails, just silently move on
    }

    # 3. Fallback: If no iframe is found, just return the original URL
    return $OriginalUrl
}

# 1. Grab the raw game link using our Smart Extractor from earlier
$CleanTargetUrl = Resolve-GameUrl -OriginalUrl $Url

Write-Host " [⬇] Commencing surgical asset extraction on: $CleanTargetUrl" -ForegroundColor Cyan

# 2. The upgraded Wget command. 
# Notice the new --header="Referer: $Url" flag! We feed it the original portal link.
& wget -q --mirror --page-requisites --adjust-extension --convert-links `
       --no-parent --execute robots=off --no-check-certificate `
       --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" `
       --header="Referer: $Url" `
       --header="Accept: */*" `
       --directory-prefix=$TargetDir --no-host-directories $CleanTargetUrl

$assetsDir     = Join-Path $PSScriptRoot "Assets"
$importDir     = Join-Path $PSScriptRoot "flash-import"
$gamesListFile = Join-Path $PSScriptRoot "games_list.json"

# ---- Parse arguments (normalize dashes — accept em-dash, en-dash, etc.) ----
$normalizedArgs   = @($args | ForEach-Object { $_ -replace '^[\u2013\u2014]+', '--' })
$flagFetchImages  = $false
$flagScan         = $false
$flagHelp         = $false
$batchFile        = $null
$positionalArgs   = @()

for ($i = 0; $i -lt $normalizedArgs.Count; $i++) {
    $arg = $normalizedArgs[$i]
    switch ($arg) {
        '--fetch-images' {
            $flagFetchImages = $true
            continue
        }
        '--scan' {
            $flagScan = $true
            continue
        }
        '--help' {
            $flagHelp = $true
            continue
        }
        '--batch' {
            if ($i + 1 -lt $normalizedArgs.Count) {
                $batchFile = $normalizedArgs[$i + 1]
                $i++
            }
            else {
                Write-Host "  ERROR: --batch requires a text file path" -ForegroundColor Red
                $flagHelp = $true
            }
            continue
        }
        '-h' {
            $flagHelp = $true
            continue
        }
        '/?' {
            $flagHelp = $true
            continue
        }
        default {
            $positionalArgs += $arg
        }
    }
}

$inputUrl         = if ($positionalArgs.Count -ge 1) { $positionalArgs[0] } else { $null }
$inputName        = if ($positionalArgs.Count -ge 2) { $positionalArgs[1] } else { $null }

function Show-Usage {
    Write-Host "  Usage:" -ForegroundColor Cyan
    Write-Host "    pwsh import-flash.ps1 <URL> [game-name]"
    Write-Host "    pwsh import-flash.ps1 --batch <text-file>"
    Write-Host "    pwsh import-flash.ps1 --fetch-images"
    Write-Host "    pwsh import-flash.ps1 --scan"
    Write-Host "    pwsh import-flash.ps1 --help"
    Write-Host ""
    Write-Host "  Batch file format:" -ForegroundColor Cyan
    Write-Host "    https://example.com/game-page | game-name"
    Write-Host "    https://example.com/other-game | other-name"
    Write-Host ""
}

function ConvertTo-GameSlug($name) {
    if ([string]::IsNullOrWhiteSpace($name)) { return $null }

    $slug = $name.ToLowerInvariant()
    $slug = $slug -replace '[\s_]+', '-'
    $slug = $slug -replace '[^a-z0-9\-]', '-'
    $slug = $slug -replace '-{2,}', '-'
    $slug = $slug.Trim('-')

    if (-not $slug) { return $null }
    return $slug
}

function Join-UrlPath($baseUrl, $childPath) {
    if ([string]::IsNullOrWhiteSpace($baseUrl) -or [string]::IsNullOrWhiteSpace($childPath)) {
        return $null
    }

    try {
        $baseUri = [System.Uri]::new($baseUrl)
        return [System.Uri]::new($baseUri, $childPath).AbsoluteUri
    } catch {
        return ($baseUrl.TrimEnd('/') + '/' + $childPath.TrimStart('/'))
    }
}

function Get-DownloadedGameRoot($downloadDir) {
    if (-not (Test-Path $downloadDir)) { return $null }

    $candidates = @()

    $rootFiles = Get-ChildItem -Path $downloadDir -File -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -notin @('wget.log','robots.txt','robots.txt.html','.listing') }
    if ($rootFiles) {
        $rootHtmlCount = @($rootFiles | Where-Object { $_.Extension -in @('.html','.htm') }).Count
        $candidates += [PSCustomObject]@{
            Path      = $downloadDir
            HtmlCount = $rootHtmlCount
            FileCount = @($rootFiles).Count
        }
    }

    foreach ($dir in @(Get-ChildItem -Path $downloadDir -Directory -ErrorAction SilentlyContinue)) {
        $resolved = Find-GameRoot $dir.FullName
        if (-not (Test-Path $resolved)) { continue }

        $files = @(Get-ChildItem -Path $resolved -Recurse -File -ErrorAction SilentlyContinue)
        if ($files.Count -eq 0) { continue }

        $htmlCount = @($files | Where-Object { $_.Extension -in @('.html','.htm') }).Count
        $candidates += [PSCustomObject]@{
            Path      = $resolved
            HtmlCount = $htmlCount
            FileCount = $files.Count
        }
    }

    if (-not $candidates) { return $null }

    return ($candidates |
        Sort-Object -Property @(
            @{ Expression = 'HtmlCount'; Descending = $true },
            @{ Expression = 'FileCount'; Descending = $true },
            @{ Expression = 'Path'; Descending = $false }
        ) |
        Select-Object -First 1 -ExpandProperty Path)
}

# ============================================================
#  IMAGE SEARCH - downloads a game thumbnail from Bing
# ============================================================
function Save-GameImage($searchName, $destDir) {
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
    'wasm','data','bin','mem','pck','unityweb','unity3d','pak','pk3','pk4',
    'png','jpg','jpeg','gif','webp','bmp','ico','svg',
    'ttf','woff','woff2','otf','eot','fnt',
    'json','xml','atlas','csv','txt',
    'js','mjs','css','map',
    'html','htm','php','asp','aspx',
    'mp4','webm','ogv',
    'zip','gz','br'
)
$extPattern = ($assetExtensions -join '|')

function Resolve-AssetPath($assetPath, $relDir) {
    if (-not $assetPath) { return $null }

    $normalized = $assetPath.Trim()
    if (-not $normalized) { return $null }

    $normalized = $normalized -replace '\\', '/'
    $normalized = $normalized -replace '[?#].*$', ''
    $normalized = $normalized -replace '^\./+', ''

    if (-not $normalized) { return $null }
    if ($normalized -match '^(?:https?:|data:|javascript:|mailto:|tel:)') { return $null }

    if ($normalized.StartsWith('/')) {
        return $normalized.TrimStart('/')
    }

    if ($relDir) {
        try {
            $baseUri = [System.Uri]::new("https://local/$relDir/")
            $resolved = [System.Uri]::new($baseUri, $normalized).AbsolutePath.TrimStart('/')
            if ($resolved) { return $resolved }
        } catch {}
    }

    return $normalized
}

function Add-AssetPath($paths, $assetPath, $relDir) {
    $resolvedPath = Resolve-AssetPath $assetPath $relDir
    if ($resolvedPath -and -not $paths.ContainsKey($resolvedPath)) {
        $paths[$resolvedPath] = $true
    }
}

function Get-UnityManifestFile($rootDir) {
    $candidate = Get-ChildItem -Path $rootDir -Recurse -File -Filter '*.json' -ErrorAction SilentlyContinue |
        Where-Object { $_.Length -lt 5MB } |
        Sort-Object FullName |
        Where-Object {
            $_.Name -match '^(?:build|game|webgl)\.json$'
        } |
        Select-Object -First 1

    if ($candidate) { return $candidate }

    $jsonFiles = Get-ChildItem -Path $rootDir -Recurse -File -Filter '*.json' -ErrorAction SilentlyContinue |
        Where-Object { $_.Length -lt 5MB } |
        Sort-Object FullName

    foreach ($jsonFile in $jsonFiles) {
        try {
            $raw = Get-Content -Path $jsonFile.FullName -Raw -ErrorAction Stop
            if ($raw -match '"(?:dataUrl|wasmCodeUrl|wasmFrameworkUrl|asmCodeUrl|frameworkUrl|codeUrl)"\s*:') {
                return $jsonFile
            }
        } catch {}
    }

    return $null
}

function Get-AssetPaths($localDir) {
    $paths = @{}
    $textFiles = Get-ChildItem -Path $localDir -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            $_.Extension.ToLower() -in @('.html','.htm','.js','.css','.json','.xml','.svg') -and
            $_.Length -lt 50MB
        }

    # --- Unity manifest: extract dataUrl, wasmCodeUrl, wasmFrameworkUrl, etc. ---
    $buildJsonFiles = Get-ChildItem -Path $localDir -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            ($_.Extension -eq '.json' -and $_.Length -lt 5MB -and $_.Name -match '^(?:build|game|webgl)\.json$') -or
            $_.Name -match '\.loader\.js$'
        }
    foreach ($bjf in $buildJsonFiles) {
        try {
            $bjContent = [System.IO.File]::ReadAllText($bjf.FullName)
            # Match Unity JSON fields like "dataUrl": "file.data.unityweb"
            $unityMatches = [regex]::Matches($bjContent, '"(?:dataUrl|wasmCodeUrl|wasmFrameworkUrl|asmCodeUrl|asmFrameworkUrl|asmMemoryUrl|codeUrl|frameworkUrl|memoryUrl)"\s*:\s*"([^"]+)"')
            $manifestRelDir = [System.IO.Path]::GetRelativePath($localDir, $bjf.DirectoryName).Replace('\','/')
            if ($manifestRelDir -eq '.') { $manifestRelDir = '' }
            foreach ($m in $unityMatches) {
                Add-AssetPath $paths $m.Groups[1].Value $manifestRelDir
            }
        } catch { continue }
    }

    foreach ($f in $textFiles) {
        try {
            $content = [System.IO.File]::ReadAllText($f.FullName)
            $relDir  = [System.IO.Path]::GetRelativePath($localDir, $f.DirectoryName).Replace('\','/')
            if ($relDir -eq '.') { $relDir = '' }

            # Match quoted paths like "models/car.glb" or './audio/engine.ogg'
            # Supports multi-dot filenames like "Game.data.unityweb"
            $matches1 = [regex]::Matches($content, "[""']\.{0,2}/?((?:[a-zA-Z0-9_\-]+/)*[a-zA-Z0-9_\-][a-zA-Z0-9_\-\.]*\.(?:$extPattern))[""']")
            foreach ($m in $matches1) {
                Add-AssetPath $paths $m.Groups[1].Value $relDir
            }

            # Also match src="..." href="..." url(...) patterns for paths without quotes
            $matches2 = [regex]::Matches($content, "(?:src|href|url)\s*[\(=]\s*[""']?((?:[a-zA-Z0-9_\-]+/)*[a-zA-Z0-9_\-][a-zA-Z0-9_\-\.]*\.(?:$extPattern))[""'\)]")
            foreach ($m in $matches2) {
                Add-AssetPath $paths $m.Groups[1].Value $relDir
            }

            # Match webpack-style paths like e.exports="audio/engine.ogg" or n="models/car.glb"
            # Also matches paths without subdirectories now (removed the + requirement)
            $matches3 = [regex]::Matches($content, "=\s*[""']((?:[a-zA-Z0-9_\-]+/)*[a-zA-Z0-9_\-][a-zA-Z0-9_\-\.]*\.(?:$extPattern))[""']")
            foreach ($m in $matches3) {
                Add-AssetPath $paths $m.Groups[1].Value $relDir
            }

            # Match JSON key-value pairs like "someKey": "filename.ext"
            # Catches Unity build.json and other config files
            $matches4 = [regex]::Matches($content, '"[a-zA-Z_][a-zA-Z0-9_]*"\s*:\s*"((?:[a-zA-Z0-9_\-]+/)*[a-zA-Z0-9_\-][a-zA-Z0-9_\-\.]*\.(?:' + $extPattern + '))"')
            foreach ($m in $matches4) {
                Add-AssetPath $paths $m.Groups[1].Value $relDir
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

function Download-UnityBuildFiles($gameDir, $baseUrl, $url) {
    $unityManifestPath = Get-UnityManifestFile $gameDir
    if (-not $unityManifestPath) { return 0 }

    try {
        $bjData = Get-Content -Path $unityManifestPath.FullName -Raw | ConvertFrom-Json
        $unityFields = @('dataUrl','wasmCodeUrl','wasmFrameworkUrl','asmCodeUrl','asmFrameworkUrl','asmMemoryUrl','codeUrl','frameworkUrl','memoryUrl')
        $bjDir = [System.IO.Path]::GetRelativePath($gameDir, $unityManifestPath.DirectoryName).Replace('\','/')
        if ($bjDir -eq '.') { $bjDir = '' }

        $unityDlCount = 0
        foreach ($field in $unityFields) {
            $val = $bjData.$field
            if (-not $val) { continue }

            $val = $val -replace '^\./+', ''
            $assetRelPath = if ($bjDir) { "$bjDir/$val" } else { $val }
            $localPath = Join-Path $gameDir ($assetRelPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
            if (Test-Path $localPath) { continue }

            $localDir2 = Split-Path $localPath -Parent
            if (-not (Test-Path $localDir2)) {
                New-Item -ItemType Directory -Path $localDir2 -Force | Out-Null
            }

            $bjBaseUrl = $baseUrl
            if ($bjDir) { $bjBaseUrl = "$baseUrl$bjDir/" }
            $assetUrl = Join-UrlPath $bjBaseUrl $val

            $dlOk = $false
            $tryUrls = @($assetUrl)
            if ($bjDir) { $tryUrls += (Join-UrlPath $baseUrl $val) }

            foreach ($tryUrl in $tryUrls) {
                try {
                    Write-Host "    Fetching $val ..." -ForegroundColor DarkGray
                    & wget -q --no-check-certificate --timeout=60 --tries=3 `
                        "--header=User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" `
                        "--header=Referer: $url" `
                        "--header=Accept: */*" `
                        -O $localPath `
                        $tryUrl 2>&1 | Out-Null

                    if ((Test-Path $localPath) -and (Get-Item $localPath).Length -gt 1000) {
                        $hdr = [System.Text.Encoding]::ASCII.GetString(([System.IO.File]::ReadAllBytes($localPath) | Select-Object -First 100))
                        if ($hdr -notmatch '<!DOCTYPE|<html|<HTML|403 Forbidden|Access Denied') {
                            $fsize = [math]::Round((Get-Item $localPath).Length / 1024)
                            Write-Host "    +  $val (${fsize}KB)" -ForegroundColor DarkGreen
                            $unityDlCount++
                            $dlOk = $true
                            break
                        }
                    }
                    Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                } catch {
                    Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                }
            }

            if (-not $dlOk) {
                foreach ($tryUrl in $tryUrls) {
                    try {
                        Invoke-WebRequest -Uri $tryUrl -OutFile $localPath `
                            -UseBasicParsing -TimeoutSec 60 -ErrorAction Stop `
                            -Headers @{
                                "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                                "Referer"    = $url
                                "Accept"     = "*/*"
                            }
                        if ((Test-Path $localPath) -and (Get-Item $localPath).Length -gt 1000) {
                            $hdr = [System.Text.Encoding]::ASCII.GetString(([System.IO.File]::ReadAllBytes($localPath) | Select-Object -First 100))
                            if ($hdr -notmatch '<!DOCTYPE|<html|403|Access Denied') {
                                $fsize = [math]::Round((Get-Item $localPath).Length / 1024)
                                Write-Host "    +  $val (${fsize}KB) [fallback]" -ForegroundColor DarkGreen
                                $unityDlCount++
                                $dlOk = $true
                                break
                            }
                        }
                        Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                    } catch {
                        Remove-Item $localPath -Force -ErrorAction SilentlyContinue
                    }
                }
            }

            if (-not $dlOk) {
                Write-Host "    !  MISSING $val" -ForegroundColor Yellow
            }
        }

        return $unityDlCount
    } catch {
        Write-Host "  Could not parse Unity manifest: $_" -ForegroundColor DarkYellow
        return 0
    }
}

function Test-DownloadedAssetLooksValid($path, $minBytes = 1) {
    if (-not (Test-Path $path)) { return $false }

    try {
        $item = Get-Item $path -ErrorAction Stop
        if ($item.Length -lt $minBytes) { return $false }

        $ext = [System.IO.Path]::GetExtension($path).ToLowerInvariant()
        if ($ext -in @('.html','.htm','.svg','.xml','.json','.js','.css','.txt','.ico','.png')) {
            return $true
        }

        $headerBytes = [System.IO.File]::ReadAllBytes($path) | Select-Object -First 160
        $headerText = [System.Text.Encoding]::ASCII.GetString($headerBytes)
        if ($headerText -match '<!DOCTYPE|<html|<HTML|403 Forbidden|Access Denied|<Error>') {
            return $false
        }

        return $true
    } catch {
        return $false
    }
}

function Save-UrlToFile($destPath, $assetUrl, $refererUrl, $minBytes = 1) {
    $destDir = Split-Path $destPath -Parent
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir -Force | Out-Null
    }

    $origin = $null
    try {
        $uri = [uri]$refererUrl
        $origin = "$($uri.Scheme)://$($uri.Host)"
    } catch {}

    try {
        & wget -q --no-check-certificate --timeout=25 --tries=2 `
            "--header=User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" `
            "--header=Referer: $refererUrl" `
            "--header=Accept: */*" `
            $(if ($origin) { "--header=Origin: $origin" }) `
            -O $destPath `
            $assetUrl 2>&1 | Out-Null
    } catch {}

    if (Test-DownloadedAssetLooksValid $destPath $minBytes) {
        return $true
    }

    Remove-Item $destPath -Force -ErrorAction SilentlyContinue

    try {
        $headers = @{
            "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            "Referer"    = $refererUrl
            "Accept"     = "*/*"
        }
        if ($origin) { $headers["Origin"] = $origin }

        Invoke-WebRequest -Uri $assetUrl -OutFile $destPath -UseBasicParsing -TimeoutSec 25 -ErrorAction Stop -Headers $headers
        if (Test-DownloadedAssetLooksValid $destPath $minBytes) {
            return $true
        }
    } catch {}

    Remove-Item $destPath -Force -ErrorAction SilentlyContinue
    return $false
}

function Repair-PokiSecondarySdkFiles($gameDir, $baseUrl, $url) {
    $downloaded = 0
    $sdkFiles = Get-ChildItem -Path $gameDir -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object { $_.Name -in @('poki-sdk.js','sdk.js') }

    foreach ($sdkFile in $sdkFiles) {
        try {
            $content = Get-Content -Path $sdkFile.FullName -Raw -ErrorAction Stop
            $sdkRefs = [regex]::Matches($content, 'patch/poki-sdk-[A-Za-z0-9._-]+\.js|poki-sdk-(?:core|kids|playground|hoist)-[A-Za-z0-9._-]+\.js|ma\.js')
            foreach ($m in $sdkRefs) {
                $rel = $m.Value
                $dest = Join-Path $gameDir ($rel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                if (Test-Path $dest) { continue }

                $assetUrl = Join-UrlPath $baseUrl $rel
                if (Save-UrlToFile $dest $assetUrl $url 20) {
                    Write-Host "    +  auto SDK $rel" -ForegroundColor DarkGreen
                    $downloaded++
                }
            }
        } catch {}
    }

    return $downloaded
}

function Repair-GodotSupportFiles($gameDir, $baseUrl, $url) {
    $indexPath = Join-Path $gameDir 'index.html'
    if (-not (Test-Path $indexPath)) { return 0 }

    $downloaded = 0
    try {
        $content = Get-Content -Path $indexPath -Raw -ErrorAction Stop
        $refs = New-Object System.Collections.Generic.List[string]

        foreach ($m in [regex]::Matches($content, 'href="([^"]+)"')) {
            $refs.Add($m.Groups[1].Value)
        }
        foreach ($m in [regex]::Matches($content, 'serviceWorker\s*:\s*"([^"]+)"')) {
            $refs.Add($m.Groups[1].Value)
        }

        $uniqueRefs = $refs | Where-Object {
            $_ -and $_ -notmatch '^(?:https?:)?//' -and $_ -notmatch '^/'
        } | Sort-Object -Unique

        foreach ($rel in $uniqueRefs) {
            $dest = Join-Path $gameDir ($rel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
            if (Test-Path $dest) { continue }

            $assetUrl = Join-UrlPath $baseUrl $rel
            if (Save-UrlToFile $dest $assetUrl $url 1) {
                Write-Host "    +  auto support $rel" -ForegroundColor DarkGreen
                $downloaded++
                continue
            }

            if ($rel -match '\.manifest\.json$') {
                [System.IO.File]::WriteAllText($dest, "{`n  `"name`": `"Game`",`n  `"short_name`": `"Game`",`n  `"start_url`": `"./index.html`",`n  `"display`": `"fullscreen`",`n  `"background_color`": `"#000000`",`n  `"theme_color`": `"#000000`",`n  `"icons`": []`n}`n")
                Write-Host "    +  fallback support $rel" -ForegroundColor DarkGreen
                $downloaded++
            }
            elseif ($rel -match '\.service\.worker\.js$') {
                [System.IO.File]::WriteAllText($dest, "self.addEventListener('install', () => self.skipWaiting());`nself.addEventListener('activate', event => event.waitUntil(self.clients.claim()));`nself.addEventListener('fetch', () => {});`n")
                Write-Host "    +  fallback support $rel" -ForegroundColor DarkGreen
                $downloaded++
            }
            elseif ($rel -match '\.(?:png|jpg|jpeg|webp|ico)$') {
                $fallbackIcon = Join-Path $gameDir 'index.png'
                if (Test-Path $fallbackIcon) {
                    Copy-Item $fallbackIcon $dest -Force -ErrorAction SilentlyContinue
                    if (Test-Path $dest) {
                        Write-Host "    +  fallback support $rel" -ForegroundColor DarkGreen
                        $downloaded++
                    }
                }
            }
        }
    } catch {}

    return $downloaded
}

function Repair-DefoldArchiveFiles($gameDir, $baseUrl, $url) {
    $dmloaderPath = Join-Path $gameDir 'dmloader.js'
    $indexPath = Join-Path $gameDir 'index.html'
    if (-not (Test-Path $dmloaderPath) -or -not (Test-Path $indexPath)) { return 0 }

    $downloaded = 0
    try {
        $indexContent = Get-Content -Path $indexPath -Raw -ErrorAction Stop
        $exeMatch = [regex]::Match($indexContent, 'EngineLoader\.load\(\s*"[^"]+"\s*,\s*"([^"]+)"')
        if ($exeMatch.Success) {
            $exeName = $exeMatch.Groups[1].Value
            foreach ($rel in @("${exeName}_wasm.js","${exeName}_asmjs.js")) {
                $dest = Join-Path $gameDir $rel
                if (-not (Test-Path $dest)) {
                    if (Save-UrlToFile $dest (Join-UrlPath $baseUrl $rel) $url 100) {
                        Write-Host "    +  auto defold $rel" -ForegroundColor DarkGreen
                        $downloaded++
                    }
                }
            }
        }

        $manifestRel = $null
        foreach ($candidate in @('archive/archive_files.json','split/archive_files.json','archive_files.json')) {
            $dest = Join-Path $gameDir ($candidate.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
            if ((Test-Path $dest) -or (Save-UrlToFile $dest (Join-UrlPath $baseUrl $candidate) $url 20)) {
                $manifestRel = $candidate
                break
            }
        }

        if ($manifestRel) {
            $manifestPath = Join-Path $gameDir ($manifestRel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
            $manifestDirRel = Split-Path $manifestRel -Parent
            if ($manifestDirRel -eq '') { $manifestDirRel = '.' }

            $manifestJson = Get-Content -Path $manifestPath -Raw -ErrorAction Stop | ConvertFrom-Json
            foreach ($entry in $manifestJson.content) {
                foreach ($piece in $entry.pieces) {
                    $pieceName = $piece.name
                    if (-not $pieceName) { continue }

                    $pieceRel = if ($manifestDirRel -eq '.') { $pieceName } else { "$manifestDirRel/$pieceName" }
                    $dest = Join-Path $gameDir ($pieceRel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                    if (Test-Path $dest) { continue }

                    if (Save-UrlToFile $dest (Join-UrlPath $baseUrl $pieceRel) $url 20) {
                        Write-Host "    +  auto defold $pieceRel" -ForegroundColor DarkGreen
                        $downloaded++
                    }
                }
            }
        }
    } catch {}

    return $downloaded
}

function Repair-PokiUnityMirrorFiles($gameDir, $baseUrl, $url) {
    $indexPath = Join-Path $gameDir 'index.html'
    if (-not (Test-Path $indexPath)) { return 0 }

    $downloaded = 0
    try {
        $content = Get-Content -Path $indexPath -Raw -ErrorAction Stop
        $unityMirrorRefs = [regex]::Matches($content, '"(?:loader_filename|data_filename|framework_filename|code_filename)":"([^"]+)"')
        foreach ($m in $unityMirrorRefs) {
            $fileName = $m.Groups[1].Value
            $dest = Join-Path $gameDir ("Build/" + $fileName).Replace('/', [System.IO.Path]::DirectorySeparatorChar)
            if (Test-Path $dest) { continue }

            $assetUrl = Join-UrlPath $baseUrl ("Build/" + $fileName)
            if (Save-UrlToFile $dest $assetUrl $url 100) {
                Write-Host "    +  auto mirror Build/$fileName" -ForegroundColor DarkGreen
                $downloaded++
            }
        }
    } catch {}

    return $downloaded
}

function Repair-AbsoluteAssetMappings($gameDir, $baseUrl, $url) {
    $downloaded = 0
    $textFiles = Get-ChildItem -Path $gameDir -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            $_.Extension.ToLowerInvariant() -in @('.html','.htm','.js','.json') -and $_.Length -lt 20MB
        }

    $mappingPattern = '(?<full>(?<local>(?:[A-Za-z0-9_\-]+/)*[A-Za-z0-9_\-][A-Za-z0-9_.\-]*\.(?:pak|pk3|pk4|wasm|data|bin|mem|pck|unityweb|unity3d|zip))"\s*:\s*")(?<remote>https?://[^"'']+\.(?:pak|pk3|pk4|wasm|data|bin|mem|pck|unityweb|unity3d|zip)(?:\?[^"'']*)?)'

    foreach ($textFile in $textFiles) {
        try {
            $content = Get-Content -Path $textFile.FullName -Raw -ErrorAction Stop
            $changed = $false

            foreach ($m in [regex]::Matches($content, $mappingPattern)) {
                $localRel = $m.Groups['local'].Value.TrimEnd('"')
                $remoteUrl = $m.Groups['remote'].Value
                if (-not $localRel -or -not $remoteUrl) { continue }

                $dest = Join-Path $gameDir ($localRel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                if (-not (Test-Path $dest)) {
                    if (Save-UrlToFile $dest $remoteUrl $url 1000) {
                        Write-Host "    +  auto absolute $localRel" -ForegroundColor DarkGreen
                        $downloaded++
                    }
                }

                if (Test-Path $dest) {
                    $escapedRemote = [regex]::Escape($remoteUrl)
                    $content = [regex]::Replace($content, $escapedRemote, [System.Text.RegularExpressions.MatchEvaluator]{ param($x) $localRel }, 1)
                    $changed = $true
                }
            }

            if ($changed) {
                [System.IO.File]::WriteAllText($textFile.FullName, $content, [System.Text.Encoding]::UTF8)
            }
        } catch {}
    }

    return $downloaded
}

function Get-ReferencedRelativeAssetsFromText($content, $relDir) {
    $paths = @{}
    if ([string]::IsNullOrWhiteSpace($content)) { return @() }

    $pattern = '(?:(?:"([^"]+\.(?:js|mjs|json|wasm|bin|data|png|jpg|jpeg|webp|gif|svg|css|ico|ogg|mp3|m4a|wav))")|(?:''([^'']+\.(?:js|mjs|json|wasm|bin|data|png|jpg|jpeg|webp|gif|svg|css|ico|ogg|mp3|m4a|wav))''))'
    foreach ($m in [regex]::Matches($content, $pattern)) {
        $assetPath = if ($m.Groups[1].Success) { $m.Groups[1].Value } else { $m.Groups[2].Value }
        if (-not $assetPath) { continue }
        if ($assetPath -match '^(?:https?:|data:|javascript:|mailto:|tel:)') { continue }

        Add-AssetPath $paths $assetPath $relDir
    }

    return @($paths.Keys | Sort-Object -Unique)
}

function Repair-SplitPayloadFiles($gameDir, $baseUrl, $url) {
    $downloaded = 0
    $textFiles = Get-ChildItem -Path $gameDir -Recurse -File -ErrorAction SilentlyContinue |
        Where-Object {
            $_.Extension.ToLowerInvariant() -in @('.html','.htm','.js') -and $_.Length -lt 10MB
        }

    foreach ($textFile in $textFiles) {
        try {
            $content = Get-Content -Path $textFile.FullName -Raw -ErrorAction Stop
            $splitRefs = [regex]::Matches($content, 'getParts\(\s*["'']([^"'']+)["'']\s*,\s*(\d+)\s*,\s*(\d+)\s*\)')
            foreach ($m in $splitRefs) {
                $baseName = $m.Groups[1].Value
                $start = [int]$m.Groups[2].Value
                $end = [int]$m.Groups[3].Value
                if ($end -lt $start -or ($end - $start) -gt 200) { continue }

                for ($part = $start; $part -le $end; $part++) {
                    $rel = "$baseName.part$part"
                    $dest = Join-Path $gameDir ($rel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                    if (Test-Path $dest) { continue }

                    $assetUrl = Join-UrlPath $baseUrl $rel
                    if (Save-UrlToFile $dest $assetUrl $url 100) {
                        Write-Host "    +  auto split $rel" -ForegroundColor DarkGreen
                        $downloaded++
                    }
                }
            }
        } catch {}
    }

    return $downloaded
}

function Repair-ConstructRuntimeFiles($gameDir, $baseUrl, $url) {
    $indexPath = Join-Path $gameDir 'index.html'
    if (-not (Test-Path $indexPath)) { return 0 }

    $downloaded = 0
    $queue = New-Object System.Collections.Generic.Queue[string]
    $seen = New-Object 'System.Collections.Generic.HashSet[string]'

    try {
        $indexContent = Get-Content -Path $indexPath -Raw -ErrorAction Stop

        foreach ($seedRef in @(
            'scripts/main.js',
            'workermain.js',
            'scripts/c3runtime.js',
            'data.json',
            'config.json',
            'scripts/dispatchworker.js',
            'scripts/jobworker.js',
            'scriptsInEvents.js',
            'scripts/scriptsInEvents.js'
        )) {
            $queue.Enqueue($seedRef)
        }

        foreach ($m in [regex]::Matches($indexContent, 'constructNet_scriptURLs\s*=\s*\[(.*?)\]', [System.Text.RegularExpressions.RegexOptions]::Singleline)) {
            foreach ($ref in (Get-ReferencedRelativeAssetsFromText $m.Groups[1].Value '')) {
                $queue.Enqueue($ref)
            }
        }

        foreach ($ref in (Get-ReferencedRelativeAssetsFromText $indexContent '')) {
            if ($ref -match '^(?:scripts/|workermain\.js$|sw\.js$|offline\.json$|data\.json$|config\.json$)') {
                $queue.Enqueue($ref)
            }
        }
    } catch {
        return 0
    }

    while ($queue.Count -gt 0) {
        $rel = $queue.Dequeue()
        if ([string]::IsNullOrWhiteSpace($rel)) { continue }
        if ($seen.Contains($rel)) { continue }
        $null = $seen.Add($rel)

        $dest = Join-Path $gameDir ($rel.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
        if (-not (Test-Path $dest)) {
            $assetUrl = Join-UrlPath $baseUrl $rel
            if (Save-UrlToFile $dest $assetUrl $url 20) {
                Write-Host "    +  auto construct $rel" -ForegroundColor DarkGreen
                $downloaded++
            } else {
                continue
            }
        }

        $ext = [System.IO.Path]::GetExtension($dest).ToLowerInvariant()
        if ($ext -notin @('.js','.mjs','.json','.html','.htm','.css')) { continue }

        try {
            $content = Get-Content -Path $dest -Raw -ErrorAction Stop
            $relDir = Split-Path $rel -Parent
            if ($relDir -eq '.') { $relDir = '' }

            foreach ($ref in (Get-ReferencedRelativeAssetsFromText $content $relDir)) {
                if (-not $seen.Contains($ref)) {
                    $queue.Enqueue($ref)
                }
            }
        } catch {}
    }

    return $downloaded
}

function Invoke-AutoRuntimeRecovery($gameDir, $baseUrl, $url) {
    $recovered = 0
    $recovered += Repair-AbsoluteAssetMappings $gameDir $baseUrl $url
    $recovered += Repair-PokiSecondarySdkFiles $gameDir $baseUrl $url
    $recovered += Repair-GodotSupportFiles $gameDir $baseUrl $url
    $recovered += Repair-DefoldArchiveFiles $gameDir $baseUrl $url
    $recovered += Repair-PokiUnityMirrorFiles $gameDir $baseUrl $url
    $recovered += Repair-SplitPayloadFiles $gameDir $baseUrl $url
    $recovered += Repair-ConstructRuntimeFiles $gameDir $baseUrl $url
    return $recovered
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
    $gameName = ConvertTo-GameSlug $gameName
    if (-not $gameName) {
        Write-Host "  ERROR: Cannot determine game name. Usage: pwsh import-flash.ps1 <URL> <name>" -ForegroundColor Red
        return $false
    }

    $gameDir = Join-Path $assetsDir $gameName
    $refreshExisting = $false
    if (Test-Path $gameDir) {
        $refreshExisting = $true
        Write-Host "  INFO  Assets/$gameName/ already exists. Refreshing missing files and repairing the import." -ForegroundColor DarkYellow
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
        Write-Host "  [1/4] Downloading via wget (HTML-linked files)..." -ForegroundColor Gray
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
            "--accept=html,htm,js,css,json,xml,png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,otf,eot,mp3,ogg,wav,wasm,data,unityweb,unity3d,mem,pck,bin,map,glb,gltf,mp4,webm" `
            "--header=User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" `
            -P $tempDir `
            $url 2>&1 | ForEach-Object { Write-Host "    $_" -ForegroundColor DarkGray }

        # ---- locate downloaded content ----
        $gameRoot = Get-DownloadedGameRoot $tempDir
        if (-not $gameRoot) {
            Write-Host "  ERROR: No files downloaded. Check the URL." -ForegroundColor Red
            return $false
        }

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

        # ---- Step 1b: Unity manifest — directly download critical game data ----
        $unityDlCount = Download-UnityBuildFiles $gameDir $baseUrl $url
        if ($unityDlCount -gt 0) {
            Write-Host "  [1b/4] Unity build data: $unityDlCount files downloaded" -ForegroundColor Gray
        }

        # ---- Step 2: Scan JS/CSS/HTML for dynamic asset paths and download them ----
        Write-Host "  [2/4] Scanning JS/CSS/HTML for dynamic asset references..." -ForegroundColor Gray
        $assetPaths = Get-AssetPaths $gameDir

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
                    $assetUrl  = Join-UrlPath $baseUrl $asset
                    $localPath = Join-Path $gameDir ($asset.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                    $localDir  = Split-Path $localPath -Parent

                    if (-not (Test-Path $localDir)) {
                        New-Item -ItemType Directory -Path $localDir -Force | Out-Null
                    }

                    $originUri = [uri]$url
                    $originHost = "$($originUri.Scheme)://$($originUri.Host)"
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
                            $assetUrl  = Join-UrlPath $baseUrl $asset
                            $localPath = Join-Path $gameDir ($asset.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                            $localDir  = Split-Path $localPath -Parent
                            try {
                                if (-not (Test-Path $localDir)) {
                                    New-Item -ItemType Directory -Path $localDir -Force | Out-Null
                                }
                                Invoke-WebRequest -Uri $assetUrl -OutFile $localPath `
                                    -UseBasicParsing -TimeoutSec 20 -ErrorAction Stop `
                                    -WebSession $session `
                                    -Headers @{
                                        "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
                                        "Referer"    = $url
                                        "Accept"     = "*/*"
                                        "Origin"     = "$(([uri]$url).Scheme)://$(([uri]$url).Host)"
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
            $newAssets = Get-AssetPaths $gameDir
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
                        $assetUrl  = Join-UrlPath $baseUrl $asset
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
                                    "Origin"     = "$(([uri]$url).Scheme)://$(([uri]$url).Host)"
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

            $lateUnityDlCount = Download-UnityBuildFiles $gameDir $baseUrl $url
            if ($lateUnityDlCount -gt 0) {
                Write-Host "  Late Unity manifest recovery: $lateUnityDlCount files downloaded" -ForegroundColor Gray
            }

            $autoRecoveryCount = Invoke-AutoRuntimeRecovery $gameDir $baseUrl $url
            if ($autoRecoveryCount -gt 0) {
                Write-Host "  Auto runtime recovery: $autoRecoveryCount files downloaded" -ForegroundColor Gray
            }
        } else {
            Write-Host "  No dynamic asset references found in code" -ForegroundColor Gray

            $autoRecoveryCount = Invoke-AutoRuntimeRecovery $gameDir $baseUrl $url
            if ($autoRecoveryCount -gt 0) {
                Write-Host "  Auto runtime recovery: $autoRecoveryCount files downloaded" -ForegroundColor Gray
            }
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
                (Join-UrlPath $baseUrl 'simulation_worker.bundle.js'),
                ("https://web.archive.org/web/20250906225331/" + (Join-UrlPath $baseUrl 'simulation_worker.bundle.js'))
            )

            foreach ($candidate in $simCandidates) {
                try {
                    Invoke-WebRequest -Uri $candidate -OutFile $simWorkerPath -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop `
                        -Headers @{ "User-Agent" = "Mozilla/5.0"; "Referer" = $url; "Origin" = "$(([uri]$url).Scheme)://$(([uri]$url).Host)"; "Accept" = "*/*" }

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
        Write-Host "  [3/4] Searching for thumbnail..." -ForegroundColor Gray
        $prettyName = $gameName -replace '-', ' '
        $imgResult = Save-GameImage $prettyName $gameDir
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

        # ---- Step 4: Final verification ----
        Write-Host "  [4/4] Verifying download completeness..." -ForegroundColor Gray
        $buildJsonCheck = Get-UnityManifestFile $gameDir
        if ($buildJsonCheck) {
            try {
                $bjVerify = Get-Content -Path $buildJsonCheck.FullName -Raw | ConvertFrom-Json
                $criticalFields = @('dataUrl','wasmCodeUrl','wasmFrameworkUrl','asmCodeUrl','asmFrameworkUrl','codeUrl','frameworkUrl')
                $missingCritical = @()
                foreach ($cf in $criticalFields) {
                    $val = $bjVerify.$cf
                    if (-not $val) { continue }
                    $val = $val -replace '^\./+', ''
                    $bjVerifyDir = [System.IO.Path]::GetRelativePath($gameDir, $buildJsonCheck.DirectoryName).Replace('\','/')
                    if ($bjVerifyDir -eq '.') { $bjVerifyDir = '' }
                    $checkPath = if ($bjVerifyDir) { "$bjVerifyDir/$val" } else { $val }
                    $fullCheck = Join-Path $gameDir ($checkPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar))
                    if (-not (Test-Path $fullCheck)) {
                        $missingCritical += $val
                    }
                }
                if ($missingCritical.Count -gt 0) {
                    Write-Host "  WARNING: Unity build files MISSING (game may not work):" -ForegroundColor Yellow
                    foreach ($mc in $missingCritical) {
                        Write-Host "    !  $mc" -ForegroundColor Yellow
                    }
                } else {
                    Write-Host "  Unity build files: all present" -ForegroundColor Green
                }
            } catch {}
        }

        $finalCount = (Get-ChildItem -Path $gameDir -Recurse -File).Count
        Write-Host ""
        if ($refreshExisting) {
            Write-Host "  OK    Repaired Assets/$gameName/ ($finalCount files)" -ForegroundColor Green
        }
        else {
            Write-Host "  OK    Assets/$gameName/ ($finalCount files)" -ForegroundColor Green
        }
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
        $gameName = ConvertTo-GameSlug ([IO.Path]::GetFileNameWithoutExtension($swf.Name))
        if (-not $gameName) {
            Write-Host "  SKIP  $($swf.Name) -> could not derive a safe folder name" -ForegroundColor DarkYellow
            $skipped++; continue
        }
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
        $imgResult  = Save-GameImage $prettyName $gameDir
        $imgStatus  = if ($imgResult) { "[image found]" } else { "[no image]" }
        Write-Host "  OK    $gameName/ <- $($swf.Name) $imgStatus" -ForegroundColor Green
        $imported++
    }

    Write-Host "`n  Done! Imported: $imported | Skipped: $skipped" -ForegroundColor Cyan
    return $imported
}

# ============================================================
#  BATCH DOWNLOAD FROM TEXT FILE
# ============================================================
function Import-GameBatch($batchPath) {
    if ([string]::IsNullOrWhiteSpace($batchPath)) {
        Write-Host "  ERROR: Missing batch file path" -ForegroundColor Red
        return 0
    }

    $resolvedBatchPath = $batchPath
    if (-not [System.IO.Path]::IsPathRooted($resolvedBatchPath)) {
        $resolvedBatchPath = Join-Path $PSScriptRoot $resolvedBatchPath
    }

    if (-not (Test-Path $resolvedBatchPath)) {
        Write-Host "  ERROR: Batch file not found: $resolvedBatchPath" -ForegroundColor Red
        return 0
    }

    $entries = @()
    $lineNumber = 0
    foreach ($rawLine in @(Get-Content -Path $resolvedBatchPath -ErrorAction Stop)) {
        $lineNumber++
        $line = $rawLine.Trim()

        if (-not $line -or $line.StartsWith('#')) {
            continue
        }

        $url = $null
        $name = $null

        if ($line -match '\|') {
            $parts = $line -split '\s*\|\s*', 3
            $url = if ($parts.Count -ge 1) { $parts[0].Trim() } else { $null }
            $name = if ($parts.Count -ge 2) { $parts[1].Trim() } else { $null }
        }
        elseif ($line -match "`t") {
            $parts = $line -split "`t+", 3
            $url = if ($parts.Count -ge 1) { $parts[0].Trim() } else { $null }
            $name = if ($parts.Count -ge 2) { $parts[1].Trim() } else { $null }
        }
        elseif ($line -match '^(?<url>https?://\S+)\s+(?<name>.+)$') {
            $url = $Matches.url.Trim()
            $name = $Matches.name.Trim()
        }
        else {
            $url = $line
        }

        if (-not $url -or $url -notmatch '^https?://') {
            Write-Host "  SKIP  Line $lineNumber is not a valid URL entry: $rawLine" -ForegroundColor DarkYellow
            continue
        }

        if ([string]::IsNullOrWhiteSpace($name)) {
            $name = $null
        }

        $entries += [PSCustomObject]@{
            Line = $lineNumber
            Url  = $url
            Name = $name
        }
    }

    if ($entries.Count -eq 0) {
        Write-Host "  No valid batch entries found in $resolvedBatchPath" -ForegroundColor Yellow
        return 0
    }

    Write-Host "  Batch file: $resolvedBatchPath" -ForegroundColor Cyan
    Write-Host "  Entries:    $($entries.Count)" -ForegroundColor Cyan
    Write-Host ""

    $importedNames = @()
    $imported = 0
    $skipped = 0
    $failed = 0
    $current = 0

    foreach ($entry in $entries) {
        $current++
        Write-Host "  [$current/$($entries.Count)] Line $($entry.Line)" -ForegroundColor White
        $result = Import-GameFromUrl $entry.Url $entry.Name
        if ($result) {
            $imported++
            $importedNames += $result
        }
        else {
            $targetName = if ($entry.Name) { ConvertTo-GameSlug $entry.Name } else { $null }
            $targetDir = if ($targetName) { Join-Path $assetsDir $targetName } else { $null }
            if ($targetDir -and (Test-Path $targetDir)) {
                $skipped++
            }
            else {
                $failed++
            }
        }
        Write-Host ""
    }

    if ($imported -gt 0) {
        Write-Host "  Updating games list..." -ForegroundColor Gray
        Update-GamesList
        foreach ($name in $importedNames) {
            Add-ToRecentlyAdded $name
        }
    }

    Write-Host "  Batch complete -> Imported: $imported | Skipped: $skipped | Failed: $failed" -ForegroundColor Cyan
    return $imported
}

# ============================================================
#  FETCH MISSING IMAGES  (search online for games without logos)
# ============================================================
function Update-MissingImages {
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
        $result = Save-GameImage $prettyName $d.FullName
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
            if ($parsed -is [array]) {
                $list = @($parsed)
            }
            elseif ($parsed -is [System.Collections.IEnumerable] -and $parsed -isnot [string]) {
                $list = @($parsed)
            }
            elseif ($parsed) {
                $list = @($parsed)
            }
        } catch { }
    }
    # Remove if already present, then prepend
    $list = @($name) + @($list | Where-Object { $_ -and $_ -ne $name })
    if ($list.Count -gt 50) {
        $list = @($list | Select-Object -First 50)
    }
    $list | ConvertTo-Json | Set-Content -Path $raFile -Encoding UTF8
    Write-Host "  Updated recently_added.json (now $($list.Count) entries)" -ForegroundColor DarkGreen
}

if (-not (Test-Path $assetsDir)) {
    New-Item -ItemType Directory -Path $assetsDir -Force | Out-Null
}

if ($flagFetchImages) {
    Update-MissingImages
    Update-GamesList
}
elseif ($flagHelp) {
    Show-Usage
}
elseif ($flagScan) {
    Update-GamesList
}
elseif ($batchFile) {
    Import-GameBatch $batchFile | Out-Null
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


# ============================================================
#  DEEP ARCHIVAL HANDOFF
#  Automatically triggers the Chaos Monkey batch runner 
#  after the initial download completes.
# ============================================================

Write-Host "`n=======================================================" -ForegroundColor Cyan
Write-Host " INITIAL IMPORT COMPLETE. HANDING OFF TO CHAOS MONKEY..." -ForegroundColor Magenta
Write-Host "=======================================================" -ForegroundColor Cyan

# Check if a batch file was passed to this script, otherwise default to flash-batch.txt
$ChaosBatch = if ($BatchFile) { $BatchFile } else { "./flash-batch.txt" }

if (Test-Path $ChaosBatch) {
    & pwsh ./chaos-batch-runner.ps1 -BatchFile $ChaosBatch
} else {
    Write-Host "[!] Could not auto-trigger chaos runner. Batch file not found: $ChaosBatch" -ForegroundColor Red
}
