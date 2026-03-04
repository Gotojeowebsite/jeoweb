# ============================================================
#  FLASH GAME IMPORTER
#  Drop .swf files into the "flash-import" folder, then run:
#      .\import-flash.ps1
#  Each .swf gets its own game folder in Assets/ with an
#  auto-generated index.html that loads via Ruffle.
#  Also auto-downloads a thumbnail image for each game.
#  Delete any wrong images manually — the scan picks up
#  whatever image is in the folder.
# ============================================================

$importDir = Join-Path $PSScriptRoot "flash-import"
$assetsDir = Join-Path $PSScriptRoot "Assets"

# ---- Image search function ----
function Download-GameImage($searchName, $destDir) {
    # Try multiple search queries for best results
    $queries = @(
        "$searchName flash game",
        "$searchName game",
        "$searchName"
    )
    foreach ($rawQuery in $queries) {
        try {
            $query = [uri]::EscapeDataString($rawQuery)
            $searchUrl = "https://www.bing.com/images/search?q=$query&first=1&count=5"
            $response = Invoke-WebRequest -Uri $searchUrl -UseBasicParsing -Headers @{
                "User-Agent" = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            } -TimeoutSec 10 -ErrorAction Stop

            # Extract image URLs from Bing's murl (media URL) field
            $imgMatches = [regex]::Matches($response.Content, 'murl&quot;:&quot;(https?://[^&]+?\.(jpg|jpeg|png|gif|webp))')
            if ($imgMatches.Count -gt 0) {
                # Try each result until one downloads successfully
                foreach ($m in $imgMatches) {
                    try {
                        $imgUrl = $m.Groups[1].Value
                        $ext = $m.Groups[2].Value
                        $destFile = Join-Path $destDir "logo.$ext"
                        Invoke-WebRequest -Uri $imgUrl -OutFile $destFile -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
                        # Verify the file is >1KB (not an error page)
                        $size = (Get-Item $destFile).Length
                        if ($size -gt 1024) {
                            return $true
                        }
                        Remove-Item $destFile -Force -ErrorAction SilentlyContinue
                    } catch { continue }
                }
            }
        } catch { continue }
    }
    return $false
}

# ---- Mode: fetch missing images for existing games ----
if ($args -contains '--fetch-images') {
    Write-Host "`n  Scanning for games missing images..." -ForegroundColor Cyan
    $imageExtsCheck = @('*.png','*.jpg','*.jpeg','*.gif','*.webp','*.svg','*.ico')
    $dirs = Get-ChildItem -Path $assetsDir -Directory | Sort-Object { $_.Name.ToLower() }
    $fetched = 0; $failed = 0; $already = 0

    foreach ($d in $dirs) {
        # Only process flash game folders (those with .swf files)
        $hasSwf = Get-ChildItem -Path $d.FullName -Recurse -Filter "*.swf" -ErrorAction SilentlyContinue
        if ($hasSwf.Count -eq 0) { continue }

        # Check if folder already has an image
        $hasImage = $false
        foreach ($pat in $imageExtsCheck) {
            if (Get-ChildItem -Path $d.FullName -Filter $pat -File -ErrorAction SilentlyContinue) {
                $hasImage = $true; break
            }
        }
        if ($hasImage) { $already++; continue }

        $prettyName = $d.Name -replace '-', ' '
        $gotImage = Download-GameImage $prettyName $d.FullName
        if ($gotImage) {
            Write-Host "  IMG   $($d.Name)/ [downloaded]" -ForegroundColor Green
            $fetched++
        } else {
            Write-Host "  MISS  $($d.Name)/ [not found]" -ForegroundColor DarkYellow
            $failed++
        }
    }

    Write-Host "`n  Images: $fetched downloaded | $failed not found | $already already had images`n" -ForegroundColor Cyan
    exit
}

if (-not (Test-Path $importDir)) {
    New-Item -ItemType Directory -Path $importDir | Out-Null
    Write-Host "`n  Created flash-import/ folder. Drop your .swf files there and run this script again." -ForegroundColor Yellow
    exit
}

$swfFiles = Get-ChildItem -Path $importDir -Filter "*.swf" -File
if ($swfFiles.Count -eq 0) {
    Write-Host "`n  No .swf files found in flash-import/" -ForegroundColor Yellow
    Write-Host "  Drop your .swf files there and run this script again.`n"
    exit
}

# HTML template — uses Ruffle from Assets/zzruffle/
$htmlTemplate = @'
<!DOCTYPE HTML>
<html>
<head>
    <meta charset='utf8'>
    <title>Jeo</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            overflow: hidden;
            height: 100%;
        }
        #ruffle {
            width: 100vw;
            height: 100vh;
        }
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
                    width: width,
                    height: height,
                    style: 'width: 100%; height: 100%;',
                });
            player.load({ url: url });
        }
        swfobject.embedSWF('__SWF_FILE__', 'ruffle', 500, 500);
    </script>
</body>
</html>
'@

$imported = 0
$skipped = 0

foreach ($swf in $swfFiles) {
    # Folder name = swf filename without extension, lowercased, spaces to dashes
    $gameName = [System.IO.Path]::GetFileNameWithoutExtension($swf.Name) -replace '\s+', '-'
    $gameName = $gameName.ToLower()
    $gameDir  = Join-Path $assetsDir $gameName

    if (Test-Path $gameDir) {
        Write-Host "  SKIP  $gameName/ already exists" -ForegroundColor DarkYellow
        $skipped++
        continue
    }

    # Create the game folder
    New-Item -ItemType Directory -Path $gameDir | Out-Null

    # Move the .swf into the game folder
    $destSwf = Join-Path $gameDir $swf.Name
    Move-Item -Path $swf.FullName -Destination $destSwf

    # Generate the index.html with the correct swf filename
    $html = $htmlTemplate -replace '__SWF_FILE__', $swf.Name
    $indexPath = Join-Path $gameDir "index.html"
    [System.IO.File]::WriteAllText($indexPath, $html, [System.Text.Encoding]::UTF8)

    # Try to download a thumbnail image
    $prettyName = $gameName -replace '-', ' '
    $gotImage = Download-GameImage $prettyName $gameDir
    if ($gotImage) {
        Write-Host "  OK    $gameName/ <- $($swf.Name)  [image found]" -ForegroundColor Green
    } else {
        Write-Host "  OK    $gameName/ <- $($swf.Name)  [no image]" -ForegroundColor Green
    }
    $imported++
}

Write-Host ""
Write-Host "  Done! Imported: $imported  |  Skipped: $skipped" -ForegroundColor Cyan
Write-Host ""

# Auto-rescan games_list.json
if ($imported -gt 0) {
    Write-Host "  Rescanning games..." -ForegroundColor Gray

    # Run the PowerShell scan inline (since Node may not be available)
    $imageExts = @('.png','.jpg','.jpeg','.gif','.webp','.svg','.ico')

    function Has-SwfFiles($dir) {
        $found = Get-ChildItem -Path $dir -Recurse -Filter "*.swf" -ErrorAction SilentlyContinue
        return ($found.Count -gt 0)
    }

    function Find-Image($folderPath, $folderName) {
        $allImages = Get-ChildItem -Path $folderPath -Recurse -File -ErrorAction SilentlyContinue |
            Where-Object { $imageExts -contains $_.Extension.ToLower() }
        if (-not $allImages -or $allImages.Count -eq 0) { return "notavailable.svg" }
        $priorityNames = @('logo','icon','splash','thumb','thumbnail',$folderName.ToLower())
        foreach ($pn in $priorityNames) {
            $match = $allImages | Where-Object {
                [System.IO.Path]::GetFileNameWithoutExtension($_.Name).ToLower() -eq $pn
            } | Select-Object -First 1
            if ($match) {
                $rel = $match.FullName.Replace($folderPath + '\','').Replace('\','/')
                return "Assets/$folderName/$rel"
            }
        }
        $rootImg = $allImages | Where-Object { $_.DirectoryName -eq $folderPath } | Select-Object -First 1
        if ($rootImg) { return "Assets/$folderName/$($rootImg.Name)" }
        $first = $allImages | Select-Object -First 1
        $rel = $first.FullName.Replace($folderPath + '\','').Replace('\','/')
        return "Assets/$folderName/$rel"
    }

    $results = @()
    $flashCount = 0; $webglCount = 0
    $dirs = Get-ChildItem -Path $assetsDir -Directory | Sort-Object { $_.Name.ToLower() }

    foreach ($d in $dirs) {
        $htmlFiles = Get-ChildItem -Path $d.FullName -Filter "*.html" -File -ErrorAction SilentlyContinue
        if (-not $htmlFiles -or $htmlFiles.Count -eq 0) { continue }
        $htmlFile = ($htmlFiles | Where-Object { $_.Name.ToLower() -eq 'index.html' } | Select-Object -First 1)
        if (-not $htmlFile) { $htmlFile = $htmlFiles | Select-Object -First 1 }
        $image = Find-Image $d.FullName $d.Name
        $isFlash = Has-SwfFiles $d.FullName
        $type = if ($isFlash) { "flash" } else { "webgl" }
        if ($isFlash) { $flashCount++ } else { $webglCount++ }
        $results += @{ name=$d.Name; url="Assets/$($d.Name)/$($htmlFile.Name)"; image=$image; type=$type }
    }

    $outFile = Join-Path $PSScriptRoot "games_list.json"
    $json = $results | ForEach-Object { [PSCustomObject]$_ } | ConvertTo-Json -Depth 3
    [System.IO.File]::WriteAllText($outFile, $json, [System.Text.Encoding]::UTF8)
    Write-Host "  Updated games_list.json -> $($results.Count) games ($flashCount Flash, $webglCount WebGL)" -ForegroundColor Cyan
}

Write-Host ""
