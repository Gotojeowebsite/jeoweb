import os
import time
import json
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright
from PIL import Image
import io

# --- CONFIGURATION ---
PORT = 8081
ASSETS_DIR = os.path.join(os.getcwd(), "Assets")
BROKEN_LOG = "broken_games.txt"
BATCH_SIZE = 15  # Small batches to save RAM on low-end PCs
WAIT_TIME = 10   # How many seconds to wait for the game to render
CHECK_CONSOLE = True
CHECK_NETWORK = True

# 1. Setup local server
class TinyServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    def log_message(self, format, *args): pass

def start_server(httpd):
    httpd.serve_forever()

def is_solid_color(screenshot_bytes):
    """Checks if the screenshot is just a single solid color (black, white, or transparent)."""
    try:
        img = Image.open(io.BytesIO(screenshot_bytes)).convert("RGB")
        # Get unique colors
        colors = img.getcolors(maxcolors=10) # If more than 10 colors, it's not a solid screen
        if colors and len(colors) == 1:
            return True
        return False
    except Exception as e:
        print(f"  [Error processing image: {e}]")
        return False

def mark_as_broken(game_path):
    """Injects a hidden comment into the index.html to mark it as broken."""
    html_path = os.path.join(game_path, "index.html")
    if not os.path.exists(html_path):
        # Find any html file
        files = [f for f in os.listdir(game_path) if f.endswith(".html")]
        if not files: return
        html_path = os.path.join(game_path, files[0])
    
    try:
        with open(html_path, "rb") as f:
            content = f.read()
        
        tag = b"<!--GAME BROKEN-->\n"
        if b"<!--GAME BROKEN-->" not in content:
            with open(html_path, "wb") as f:
                f.write(tag + content)
    except Exception as e:
        print(f"  [Failed to mark file: {e}]")

def scan_batch(game_list, p_instance):
    broken_in_batch = []
    
    # Launch browser with low-end optimizations
    browser = p_instance.chromium.launch(headless=True, args=['--disable-dev-shm-usage', '--no-sandbox', '--disable-setuid-sandbox'])
    context = browser.new_context(viewport={'width': 800, 'height': 600})
    
    for game_name in game_list:
        game_path = os.path.join(ASSETS_DIR, game_name)
        index_file = "index.html"
        # Check if index.html exists, if not find first html
        if not os.path.exists(os.path.join(game_path, index_file)):
            html_files = [f for f in os.listdir(game_path) if f.endswith(".html")]
            if html_files: index_file = html_files[0]
            else: continue

        print(f"Testing: {game_name}...")
        page = context.new_page()
        
        issues = []
        
        # Monitor 404s - Only log critical game engine files
        def check_404(res):
            if res.status == 404:
                url = res.url.lower()
                if url.endswith(('.wasm', '.data', '.pck', '.unityweb', 'loader.js')):
                    issues.append(f"Critical 404: {res.url.split('/')[-1]}")
        
        page.on("response", check_404)
        
        try:
            page.goto(f"http://localhost:{PORT}/Assets/{game_name}/{index_file}", wait_until="load", timeout=20000)
            
            # Smart Wait: Give the game time to attach its canvas/iframe to the page
            try:
                page.wait_for_selector("canvas, iframe, embed, object, ruffle-player, ruffle-embed", timeout=15000)
            except:
                pass # If it fails, the visual check will catch it below
                
            time.sleep(WAIT_TIME) # Additional buffer for rendering
            
            # Check for empty body or visibility
            is_visible = page.evaluate("document.body.innerText.trim().length > 0 || document.querySelectorAll('canvas, iframe, embed, object, ruffle-player, ruffle-embed').length > 0")
            is_ejs = page.evaluate("typeof EJS_player !== 'undefined'")
            
            if not is_visible:
                issues.append("Empty screen (No text or game elements detected)")
            elif not is_ejs:
                # Take screenshot to detect black/white screen
                screenshot1 = page.screenshot(type="png")
                if is_solid_color(screenshot1):
                    print("  [?] Solid screen detected. Running Pulse Check (simulating player input)...")
                    # THE PULSE CHECK: Simulate human interaction
                    page.mouse.click(400, 300) # Click center of screen
                    page.keyboard.press("Space")
                    page.keyboard.press("Enter")
                    
                    # Give it time to react and render
                    time.sleep(3) 
                    
                    screenshot2 = page.screenshot(type="png")
                    
                    # If the pixels changed, the game is alive and responding!
                    if screenshot1 != screenshot2:
                        print("  [!] Pulse Check Passed! Game is alive.")
                        # It's alive, ignore the solid color warning
                    else:
                        issues.append("Solid color screen detected and unresponsive to input")

        except Exception as e:
            issues.append(f"Timeout/Crash: {str(e)}")

        page.close()

        if issues:
            print(f"  ❌ BROKEN: {issues[0]}")
            broken_in_batch.append((game_name, issues))
            mark_as_broken(game_path)
            with open(BROKEN_LOG, "a") as f:
                f.write(f"[{game_name}] {', '.join(issues)}\n")
        else:
            print("  ✅ OK")
        
        # Cool-down for CPU
        time.sleep(1)

    browser.close()
    return broken_in_batch

def main():
    if not os.path.exists(ASSETS_DIR):
        print("Error: Assets folder not found.")
        return

    # Start server in background
    httpd = socketserver.TCPServer(("", PORT), TinyServer)
    server_thread = threading.Thread(target=start_server, args=(httpd,), daemon=True)
    server_thread.start()
    print(f"Tester server active on port {PORT}")

    all_games = [f for f in os.listdir(ASSETS_DIR) if os.path.isdir(os.path.join(ASSETS_DIR, f))]
    all_games.sort()
    
    # Filter out games already marked as broken if you want to skip them
    # For now, let's just process everything.
    
    print(f"Total games to check: {len(all_games)}")
    print(f"Running in batches of {BATCH_SIZE} for performance...\n")

    with sync_playwright() as p:
        for i in range(0, len(all_games), BATCH_SIZE):
            batch = all_games[i:i + BATCH_SIZE]
            print(f"\n--- Starting Batch {i//BATCH_SIZE + 1} ({len(batch)} games) ---")
            scan_batch(batch, p)
            print(f"--- Batch {i//BATCH_SIZE + 1} Complete. Cooling down... ---")
            time.sleep(3) # Extra rest between batches

    httpd.shutdown()
    print("\nScan complete. Results logged to broken_games.txt")

if __name__ == "__main__":
    main()
