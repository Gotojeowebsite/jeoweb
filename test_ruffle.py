import time, socketserver, threading, http.server, os, io
from playwright.sync_api import sync_playwright
from PIL import Image

ASSETS_DIR = os.path.join(os.getcwd(), 'Assets')
class TinyServer(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ASSETS_DIR, **kwargs)
    def log_message(self, format, *args): pass

httpd = socketserver.TCPServer(('', 8089), TinyServer)
threading.Thread(target=httpd.serve_forever, daemon=True).start()

p = sync_playwright().start()
browser = p.chromium.launch()
page = browser.new_page()
page.goto('http://localhost:8089/1on1SoccerBigHeads/index.html')
time.sleep(6)
is_visible = page.evaluate("() => document.body.innerText.trim().length > 0 || document.querySelectorAll('canvas, iframe, embed, object, ruffle-player').length > 0")
print('is_visible:', is_visible)
img = Image.open(io.BytesIO(page.screenshot())).convert('RGB')
print('colors:', img.getcolors(maxcolors=10))
browser.close()
p.stop()
httpd.shutdown()
