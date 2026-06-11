#!/bin/bash
PORT=$((8000 + RANDOM % 1000))
for game in "$@"; do
    echo "Agent processing $game on port $PORT..."
    python broken_game_scanner.py --only "$game" --port $PORT
    
    if [ -s broken_games.json ] && grep -q "$game" broken_games.json; then
        echo "Agent executing recovery for $game..."
        node scripts/recover-game.js "$game"
        python broken_game_scanner.py --only "$game" --port $PORT
    fi
done
echo "Agent batch complete!"
