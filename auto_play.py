from playwright.sync_api import sync_playwright
import random
import time
import sys

def automate_game_test(url="http://localhost:8080", duration_seconds=60):
    with sync_playwright() as p:
        # We run headed (headless=False) so you can watch the chaos unfold
        browser = p.chromium.launch(headless=False)
        page = browser.new_page()

        missing_files = set()

        # THE WATCHER: This intercepts every network response
        def handle_response(response):
            if response.status == 404:
                missing_files.add(response.url)
                print(f"[\033[91mMISSING ASSET TRIGGERED\033[0m] {response.url}")

        page.on("response", handle_response)

        print(f"Navigating to the quarantine zone at {url}...")
        try:
            page.goto(url, wait_until="networkidle")
        except Exception as e:
            print(f"Failed to connect. Is the Python quarantine server running? Error: {e}")
            sys.exit(1)

        print(f"Injecting chaos for {duration_seconds} seconds. Hands off the mouse!")

        # Try to target the game canvas directly, otherwise just use the whole body
        canvas = page.locator("canvas").first

        end_time = time.time() + duration_seconds
        while time.time() < end_time:
            try:
                # 1. Simulate random mouse clicks
                if canvas.is_visible():
                    box = canvas.bounding_box()
                    if box:
                        x = box["x"] + random.uniform(0, box["width"])
                        y = box["y"] + random.uniform(0, box["height"])
                        page.mouse.click(x, y)
                else:
                    # Fallback to clicking randomly on the screen
                    viewport = page.viewport_size
                    if viewport:
                        x = random.uniform(0, viewport["width"])
                        y = random.uniform(0, viewport["height"])
                        page.mouse.click(x, y)

                # 2. Simulate random key presses (Common game controls)
                keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space", "Enter", "w", "a", "s", "d", "Escape"]
                page.keyboard.press(random.choice(keys))

                # Wait a tiny bit between inputs so we don't crash the browser
                time.sleep(0.2)
                
            except Exception:
                # If an element shifts or loading screens block input, just ignore and keep looping
                pass

        print("\n=======================================================")
        print(" AUTOMATION COMPLETE ")
        print("=======================================================")
        
        if missing_files:
            print(f"Found {len(missing_files)} missing files that need to be downloaded:")
            
            # Save the missing files to a text list so wget can easily grab them later
            with open("missing_assets.txt", "w") as f:
                for file_url in sorted(missing_files):
                    print(f" - {file_url}")
                    f.write(file_url + "\n")
            print("\nSaved list to 'missing_assets.txt'.")
        else:
            print("No missing files detected! The game appears to be fully air-gapped.")

        browser.close()

if __name__ == "__main__":
    # You can pass the number of seconds you want it to run as an argument
    run_time = int(sys.argv[1]) if len(sys.argv) > 1 else 60
    automate_game_test(duration_seconds=run_time)