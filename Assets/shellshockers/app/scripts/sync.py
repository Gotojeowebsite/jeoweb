#!/usr/bin/env python3
"""
Sync script: Copies content from ShellShockers/game/distShellHome to shellbros.github.io
Cleans destination first, preserving whitelisted items.

Usage:
    python sync_shellshockers.py                    # Execute with default URL
    python sync_shellshockers.py --url https://...  # Execute with custom URL
    python sync_shellshockers.py --dry-run          # Preview what would happen
"""

import os
import sys
import shutil
import subprocess
from pathlib import Path


# Whitelist: items to preserve in destination
WHITELIST = {'.git', '.gitignore', 'app', 'readme.md', 'functions', '_headers'}

# Global flags
DRY_RUN = False
BUILD_URL = 'localhost'


def abort(message):
    """Print error and exit."""
    print(f"❌ ABORT: {message}", file=sys.stderr)
    sys.exit(1)


def get_paths():
    """Calculate source and destination paths relative to script location."""
    script_dir = Path(__file__).resolve().parent
    
    # Navigate from shellbros.github.io/app/scripts/ up to parent of shellbros.github.io
    giant_mess = script_dir.parent.parent.parent
    
    destination = giant_mess / 'shellbros.github.io'
    source = giant_mess / 'ShellShockers' / 'game' / 'distShellHome'
    game_dir = giant_mess / 'ShellShockers' / 'game'
    
    return source, destination, game_dir


def run_build_script(game_dir, url):
    """Run makeShellhome.sh with the provided URL."""
    build_script = game_dir / 'makeShellhome.sh'
    
    if not build_script.exists():
        abort(f"Build script not found: {build_script}")
    
    if not os.access(build_script, os.X_OK):
        abort(f"Build script is not executable: {build_script}")
    
    print(f"✓ Found build script: {build_script}")
    print(f"  Running with URL: {url}")
    
    if DRY_RUN:
        print(f"  [DRY-RUN] Would run: {build_script} {url}")
        return
    
    try:
        # Run the script and capture output in real-time
        process = subprocess.Popen(
            [str(build_script), url],
            cwd=str(game_dir),
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        
        # Stream output as it happens
        for line in process.stdout:
            print(f"  │ {line.rstrip()}")
        
        # Wait for completion
        return_code = process.wait()
        
        if return_code != 0:
            abort(f"Build script failed with exit code {return_code}")
        
        print(f"✓ Build script completed successfully")
        
    except Exception as e:
        abort(f"Failed to run build script: {e}")


def validate_source(source):
    """Check if source exists and contains files."""
    if not source.exists():
        abort(f"Source directory does not exist: {source}")
    
    if not source.is_dir():
        abort(f"Source is not a directory: {source}")
    
    # Check if source has any content
    contents = list(source.iterdir())
    if not contents:
        abort(f"Source directory is empty: {source}")
    
    print(f"✓ Source validated: {source}")
    print(f"  Contains {len(contents)} items")


def clean_destination(destination):
    """Remove all items from destination except whitelisted ones."""
    if not destination.exists():
        abort(f"Destination does not exist: {destination}")
    
    removed_count = 0
    errors = []
    
    for item in destination.iterdir():
        item_name = item.name
        
        # Skip whitelisted items
        if item_name in WHITELIST:
            print(f"  Preserving: {item_name}")
            continue
        
        # Remove non-whitelisted items
        try:
            item_type = "directory" if item.is_dir() else "file"
            
            if DRY_RUN:
                print(f"  [DRY-RUN] Would remove {item_type}: {item_name}")
            else:
                if item.is_dir():
                    shutil.rmtree(item)
                else:
                    item.unlink()
                print(f"  Removed {item_type}: {item_name}")
            
            removed_count += 1
        except Exception as e:
            errors.append(f"Failed to remove {item_name}: {e}")
    
    if errors and not DRY_RUN:
        print("\n⚠️  Errors during cleanup:")
        for error in errors:
            print(f"  {error}")
        abort("Cleanup failed with errors")
    
    action = "Would remove" if DRY_RUN else "Removed"
    print(f"✓ Cleaned destination: {action.lower()} {removed_count} items")


def copy_contents(source, destination):
    """Copy all contents from source to destination."""
    copied_count = 0
    errors = []
    
    for item in source.iterdir():
        item_name = item.name
        dest_path = destination / item_name
        
        # Skip if destination item is whitelisted (shouldn't overwrite)
        if item_name in WHITELIST:
            print(f"  Skipping (whitelisted in destination): {item_name}")
            continue
        
        try:
            item_type = "directory" if item.is_dir() else "file"
            
            if DRY_RUN:
                print(f"  [DRY-RUN] Would copy {item_type}: {item_name}")
            else:
                if item.is_dir():
                    shutil.copytree(item, dest_path)
                else:
                    shutil.copy2(item, dest_path)
                print(f"  Copied {item_type}: {item_name}")
            
            copied_count += 1
        except Exception as e:
            errors.append(f"Failed to copy {item_name}: {e}")
    
    if errors and not DRY_RUN:
        print("\n⚠️  Errors during copy:")
        for error in errors:
            print(f"  {error}")
        abort("Copy failed with errors")
    
    action = "Would copy" if DRY_RUN else "Copied"
    print(f"✓ {action} {copied_count} items to destination")


def empty_source(source):
    """Remove all contents from source directory."""
    removed_count = 0
    errors = []
    
    for item in source.iterdir():
        item_name = item.name
        
        try:
            item_type = "directory" if item.is_dir() else "file"
            
            if DRY_RUN:
                print(f"  [DRY-RUN] Would remove {item_type}: {item_name}")
            else:
                if item.is_dir():
                    shutil.rmtree(item)
                else:
                    item.unlink()
            
            removed_count += 1
        except Exception as e:
            errors.append(f"Failed to remove {item_name}: {e}")
    
    if errors and not DRY_RUN:
        print("\n⚠️  Errors during source cleanup:")
        for error in errors:
            print(f"  {error}")
        abort("Source cleanup failed with errors")
    
    action = "Would remove" if DRY_RUN else "Removed"
    print(f"✓ Emptied source directory: {action.lower()} {removed_count} items")


def parse_arguments():
    """Parse command line arguments."""
    global DRY_RUN, BUILD_URL
    
    i = 1
    while i < len(sys.argv):
        arg = sys.argv[i]
        
        if arg in ('--dry-run', '-d', '--preview', '-p'):
            DRY_RUN = True
        elif arg in ('--url', '-u'):
            if i + 1 >= len(sys.argv):
                abort("--url requires a URL argument")
            BUILD_URL = sys.argv[i + 1]
            i += 1
        else:
            abort(f"Unknown argument: {arg}")
        
        i += 1


def main():
    parse_arguments()
    
    mode_indicator = " [DRY-RUN MODE]" if DRY_RUN else ""
    print("=" * 60)
    print(f"ShellShockers Sync Script{mode_indicator}")
    print("=" * 60)
    
    if DRY_RUN:
        print("\n⚠️  DRY-RUN MODE: No files will be modified\n")
    
    # Get paths
    source, destination, game_dir = get_paths()
    print(f"Game Directory: {game_dir}")
    print(f"Source: {source}")
    print(f"Destination: {destination}\n")
    
    # Step 0: Run build script
    print("[0/4] Running build script...")
    run_build_script(game_dir, BUILD_URL)
    
    # Step 1: Validate source
    print("\n[1/4] Validating source...")
    validate_source(source)
    
    # Step 2: Clean destination
    print("\n[2/4] Cleaning destination...")
    clean_destination(destination)
    
    # Step 3: Copy contents
    print("\n[3/4] Copying contents...")
    copy_contents(source, destination)
    
    # Step 4: Empty source
    print("\n[4/4] Emptying source...")
    empty_source(source)
    
    print("\n" + "=" * 60)
    if DRY_RUN:
        print("✅ Dry-run completed! No files were modified.")
        print("   Run without --dry-run to execute the sync.")
    else:
        print("✅ Sync completed successfully!")
    print("=" * 60)


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Operation cancelled by user")
        sys.exit(1)
    except Exception as e:
        abort(f"Unexpected error: {e}")