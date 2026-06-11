import os
import re

games_to_fix = [
    "there-is-no-game", "thorns-and-ballons", "top-gear-2", "tube-jumpers", "tunnel-rush",
    "tv-static", "twerk-race-3d", "ultima-runes-of-virtue-ii", "ultima-vi-the-false-prophet",
    "ultima-vii-the-black-gate", "ultrakill", "veloce", "vex3", "vex4", "vex5", "vex6",
    "webretro-local", "where-in-the-world-is-carmen-sandiego", "wild-guns", "wolf3d",
    "worlds-hardest-game", "worlds-hardest-game-2", "worms", "zelda-sacred-paradox"
]

for game in games_to_fix:
    game_dir = os.path.join("Assets", game)
    if not os.path.exists(game_dir):
        print(f"Skipping {game}, directory not found")
        continue

    # Fix index.html
    index_path = os.path.join(game_dir, "index.html")
    if os.path.exists(index_path):
        with open(index_path, "r", encoding="utf-8", errors="ignore") as f:
            content = f.read()

        # Remove external scripts and problematic parent calls
        content = re.sub(r'<script[^>]*src="(/js/main\.js|js/main\.js|//www\.google\.com/jsapi)"[^>]*></script>', '', content)
        content = re.sub(r'window\.parent\.maeExportApis_\(\);?', '', content)

        # Fix EJS_gameUrl for spaces and incorrect extensions
        def fix_ejs(match):
            # Find an actual zip/7z/sfc/gba file in the directory
            files = [f for f in os.listdir(game_dir) if f.endswith(('.zip', '.7z', '.gba', '.sfc', '.nes', '.smc'))]
            if files:
                new_url = files[0] 
                # If it has spaces, rename it
                if " " in new_url:
                    old_path = os.path.join(game_dir, new_url)
                    new_name = new_url.replace(" ", "_")
                    new_path = os.path.join(game_dir, new_name)
                    os.rename(old_path, new_path)
                    new_url = new_name
                return f"EJS_gameUrl = '{new_url}';"
            else:
                return match.group(0)

        content = re.sub(r"EJS_gameUrl\s*=\s*'([^']+)'\s*;", fix_ejs, content)

        with open(index_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Fixed index.html for {game}")
