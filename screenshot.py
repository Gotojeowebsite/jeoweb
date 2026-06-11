from playwright.sync_api import sync_playwright
import time
import http.server
import socketserver
import threading
import os

PORT = 8088

Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print("serving at port", PORT)
        httpd.serve_forever()

threading.Thread(target=start_server, daemon=True).start()

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto(f'http://localhost:{PORT}/Assets/bad-ice-cream/index.html')
    print("Waiting 15 seconds for game to load...")
    time.sleep(15)
    page.screenshot(path='screenshot.png')
    browser.close()
