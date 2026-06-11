import re

log_path = "/home/codespace/.gemini/antigravity-cli/brain/7948d265-fcb3-4e87-8376-6266d3735b9b/.system_generated/tasks/task-32.log"

broken_games = []
review_games = []

current_game = None

with open(log_path, 'r') as f:
    for line in f:
        match = re.search(r'Testing: ([\w-]+)', line)
        if match:
            current_game = match.group(1)
        
        if 'BROKEN:' in line and current_game:
            broken_games.append(current_game)
        if 'REVIEW:' in line and current_game:
            review_games.append(current_game)

# Remove duplicates
broken_games = list(dict.fromkeys(broken_games))
review_games = list(dict.fromkeys(review_games))

print("BROKEN:", broken_games)
print("REVIEW:", review_games)
