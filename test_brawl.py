import http.server
import socketserver
import threading
from playwright.sync_api import sync_playwright
import time

class Handler(http.server.SimpleHTTPRequestHandler):
    pass

def start_server():
    with socketserver.TCPServer(("", 8090), Handler) as httpd:
        httpd.serve_forever()

threading.Thread(target=start_server, daemon=True).start()
time.sleep(1)

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
    page.on("pageerror", lambda exc: print(f"PAGEERROR: {exc}"))
    page.goto("http://localhost:8090/Assets/brawl-simulator-3d/index.html")
    time.sleep(25)
    state = page.evaluate('''() => {
        return {
            ygGameInstance: window.ygGameInstance !== null,
            loadingTextExists: document.querySelector("#loading-text") !== null,
            progress: document.querySelector("#unity-progress-bar-full").style.width
        }
    }''')
    print(f"STATE: {state}")
    page.screenshot(path="test_screenshot.png")
    browser.close()
