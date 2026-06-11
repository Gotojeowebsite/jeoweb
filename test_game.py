from playwright.sync_api import sync_playwright
import time

def main():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.on("console", lambda msg: print(f"CONSOLE {msg.type}: {msg.text}"))
        print("Navigating...")
        page.goto("http://localhost:8086/bad-ice-cream-3/")
        time.sleep(10)
        
        # Check splash visibility
        splash_info = page.evaluate('''() => {
            const splash = document.getElementById('splash__image');
            return splash ? window.getComputedStyle(splash).visibility : "No splash";
        }''')
        print("Splash visibility:", splash_info)
        
        browser.close()

main()
