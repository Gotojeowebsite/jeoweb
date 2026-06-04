import subprocess
import json
import os
import sys

games = [
    "cactusmccoy2", "call-of-duty-zombies", "camper-strike", "cannon-basketball-4",
    "cannonbasketball2", "canyondefense", "capybara-clicker", "car-chaos",
    "cartoon-network-block-party", "cartoon-network-speedway"
]

port = "8201"

def scan():
    print("Running broken_game_scanner...")
    cmd = ["python", "broken_game_scanner.py", "--port", port, "--only"] + games
    subprocess.run(cmd)

def get_broken():
    broken = []
    if os.path.exists("broken_games.json"):
        with open("broken_games.json") as f:
            try:
                data = json.load(f)
                for item in data:
                    if item.get("name") in games:
                        broken.append(item.get("name"))
            except Exception as e:
                print(f"Failed to parse broken_games.json: {e}")
    else:
        print("broken_games.json not found")
        
    return list(set(broken))

scan()
broken_games = get_broken()
print(f"Found broken games: {broken_games}")

for game in broken_games:
    print(f"Recovering {game}...")
    subprocess.run(["node", "scripts/recover-game.js", game])

print("Re-running scan to verify...")
scan()
broken_games_after = get_broken()
print(f"Broken games after recovery: {broken_games_after}")

