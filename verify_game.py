import http.server
import socketserver
import os
import sys

class StrictOfflineHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # THE CAGE: This tells the browser to ONLY load files from this local server.
        # It completely blocks external images, scripts, analytics, and APIs.
        self.send_header("Content-Security-Policy", "default-src 'self' 'unsafe-eval' 'unsafe-inline' data: blob:;")
        # Prevent caching so you get accurate reads on missing files
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        # Override the default logger to highlight missing files
        status = str(args[1])
        if status == '404':
            print(f"[\033[91mFAIL - MISSING FILE\033[0m] The game needs this file, but it wasn't downloaded: {self.path}")
        else:
            # Uncomment the line below if you want to see every successful file load
            # print(f"[OK] {self.path}")
            pass

def run_verifier(target_directory, port=8080):
    if not os.path.exists(target_directory):
        print(f"Error: Directory '{target_directory}' not found.")
        sys.exit(1)
        
    os.chdir(target_directory)
    
    # Allow port reuse so it doesn't crash if you restart it quickly
    socketserver.TCPServer.allow_reuse_address = True
    
    with socketserver.TCPServer(("", port), StrictOfflineHandler) as httpd:
        print("=======================================================")
        print(f" QUARANTINE SERVER RUNNING")
        print(f" Target Game: {target_directory}")
        print(f" URL: http://localhost:{port}")
        print("=======================================================")
        print("Open the URL in your browser.")
        print("External connections are BLOCKED. Missing files will show below:\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down verifier.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python verify_game.py <path_to_downloaded_game_folder>")
        sys.exit(1)
    
    run_verifier(sys.argv[1])