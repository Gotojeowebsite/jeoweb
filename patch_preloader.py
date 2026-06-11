import glob

replacement = """    const fetchGameData = (gameSlug) => {
        return new Promise(resolve => {
            resolve({
                thumb: nitromeThumb,
                title: "Bad Ice-Cream"
            });
        });
    }"""

for file_path in glob.glob('Assets/bad-ice-cream-*/preloader/nitromePreloader.js'):
    with open(file_path, 'r') as f:
        content = f.read()
    
    if 'fetch(`https://api.poki.com' in content:
        import re
        content = re.sub(r'    const fetchGameData = \(gameSlug\) => \{\s+const size = 50;\s+return new Promise\(resolve => \{\s+fetch\(`https://api\.poki\.com/game/\$\{gameSlug\}\?site=\$\{siteId\}`\)\s+\.then\(response => response\.json\(\)\)\s+\.then\(data => \{\s+resolve\(\{\s+thumb: `https://img\.poki\.com/cdn-cgi/image/quality=78,width=\$\{size\},height=\$\{size\},fit=cover,g=0\.5x0\.5,f=auto/\$\{data\.image\.path\}`,\s+title: data\.title\s+\}\);\s+\}\);\s+\}\);\s+\}', replacement, content)
        with open(file_path, 'w') as f:
            f.write(content)
        print(f"Patched {file_path}")
