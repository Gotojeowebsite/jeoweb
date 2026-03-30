import os
import time
import threading
import http.server
import socketserver
from playwright.sync_api import sync_playwright
from PIL import Image
import io

# --- CONFIGURATION ---
PORT = 8082
ASSETS_DIR = os.path.join(os.getcwd(), "Assets")
BROKEN_LOG = "test_broken_results.txt"
WAIT_TIME = 10

class TinyServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    def log_message(self, format, *args): pass

def start_server(httpd):
    httpd.serve_forever()

def is_solid_color(screenshot_bytes):
    try:
        img = Image.open(io.BytesIO(screenshot_bytes)).convert("RGB")
        colors = img.getcolors(maxcolors=10)
        if colors and len(colors) == 1:
            return True
        return False
    except:
        return False

def main():
    if not os.path.exists(ASSETS_DIR):
        print("Error: Assets folder not found.")
        return

    httpd = socketserver.TCPServer(("", PORT), TinyServer)
    server_thread = threading.Thread(target=start_server, args=(httpd,), daemon=True)
    server_thread.start()
    print(f"Test server active on port {PORT}")

    all_games = [f for f in os.listdir(ASSETS_DIR) if os.path.isdir(os.path.join(ASSETS_DIR, f))]
    all_games.sort()
    test_batch = all_games[:5]
    
    print(f"Running PERFORMANCE TEST on first 5 games: {', '.join(test_batch)}\n")

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=['--disable-dev-shm-usage', '--no-sandbox'])
        context = browser.new_context(viewport={'width': 800, 'height': 600})
        
        for game_name in test_batch:
            game_path = os.path.join(ASSETS_DIR, game_name)
            index_file = "index.html"
            if not os.path.exists(os.path.join(game_path, index_file)):
                html_files = [f for f in os.listdir(game_path) if f.endswith(".html")]
                if html_files: index_file = html_files[0]
                else: continue

            print(f"Testing: {game_name}...")
            start_time = time.time()
            page = context.new_page()
            issues = []
            
            try:
                page.goto(f"http://localhost:{PORT}/{game_name}/{index_file}", wait_until="load", timeout=15000)
                time.sleep(WAIT_TIME)
                
                is_visible = page.evaluate("document.body.innerText.trim().length > 0 || document.querySelectorAll('canvas, iframe, embed, object, ruffle-player, ruffle-embed').length > 0")
                if not is_visible:
                    issues.append("Empty screen")
                else:
                    screenshot = page.screenshot(type="png")
                    if is_solid_color(screenshot):
                        issues.append("Solid color screen")
            except Exception as e:
                issues.append("Timeout/Error")

            page.close()
            elapsed = time.time() - start_time
            if issues:
                print(f"  ❌ Result: Broken ({issues[0]}) - Took {elapsed:.1f}s")
            else:
                print(f"  ✅ Result: OK - Took {elapsed:.1f}s")
        
        browser.close()

    httpd.shutdown()
    print("\nPerformance test complete. If your PC didn't lag, you can run the full broken_game_scanner.py!")

if __name__ == "__main__":
    main()
