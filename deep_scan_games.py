import os
import threading
import http.server
import socketserver
import time
from playwright.sync_api import sync_playwright

# Configuration
PORT = 8080
ASSETS_DIR = os.path.join(os.getcwd(), "Assets")
WORKING_GAMES_FILE = "working_games.txt"

# 1. Setup a local web server to serve the Assets folder
class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    # Suppress server logs to keep our console output clean
    def log_message(self, format, *args):
        pass 

def start_server(httpd):
    httpd.serve_forever()

def deep_scan_assets():
    if not os.path.exists(ASSETS_DIR):
        print(f"Error: Could not find '{ASSETS_DIR}'.")
        return

    print("Spinning up local server for testing...")
    httpd = socketserver.TCPServer(("", PORT), CustomHandler)
    server_thread = threading.Thread(target=start_server, args=(httpd,), daemon=True)
    server_thread.start()

    working_games = []
    broken_games = {}

    game_folders = [f for f in os.listdir(ASSETS_DIR) if os.path.isdir(os.path.join(ASSETS_DIR, f))]
    
    print(f"Starting deep scan of {len(game_folders)} games using Playwright...\n" + "-"*40)

    # 2. Launch headless browser
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()

        for game_name in game_folders:
            page = context.new_page()
            missing_assets = []
            
            # Event listener: Catch failed network requests (404s)
            def on_response(response):
                if response.status >= 400:
                    missing_assets.append(f"Network Error {response.status}: {response.url}")
            
            # Event listener: Catch external asset violations
            def on_request(request):
                # We expect requests to our local server. External domains violate the rules.
                if not request.url.startswith(f"http://127.0.0.1:{PORT}") and not request.url.startswith("data:"):
                    missing_assets.append(f"External Request Blocked: {request.url}")

            page.on("response", on_response)
            page.on("request", on_request)

            game_url = f"http://127.0.0.1:{PORT}/Assets/{game_name}/index.html"
            print(f"Testing: {game_name}...")

            try:
                # Navigate and wait until network activity is idle (game has loaded)
                page.goto(game_url, wait_until="networkidle", timeout=15000)
                
                # Give it an extra 2 seconds just in case deferred scripts run
                time.sleep(2) 
            except Exception as e:
                missing_assets.append(f"Failed to load or timed out: {str(e)}")

            page.close()

            if missing_assets:
                broken_games[game_name] = missing_assets
                print(f"  ❌ Broken! Found {len(missing_assets)} issues.")
            else:
                working_games.append(game_name)
                print("  ✅ Loads successfully locally.")

        browser.close()

    # 3. Shutdown server
    httpd.shutdown()
    httpd.server_close()

    # 4. Write results
    print("\n" + "-"*40)
    print("Scan Complete!")
    
    with open(WORKING_GAMES_FILE, 'w') as f:
        for game in working_games:
            f.write(f"{game}\n")
    
    print(f"Saved {len(working_games)} working games to '{WORKING_GAMES_FILE}'.")

    if broken_games:
        print(f"\nFound {len(broken_games)} broken games:")
        for game, issues in broken_games.items():
            print(f"\nGame: {game}")
            for issue in issues[:5]: # Print first 5 issues to avoid terminal spam
                print(f"  - {issue}")
            if len(issues) > 5:
                print(f"  ... and {len(issues) - 5} more issues.")

if __name__ == "__main__":
    deep_scan_assets()