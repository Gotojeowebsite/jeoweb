#!/bin/bash
node scripts/recover-game.js camper-strike --max-candidates 3 --candidate-timeout-ms 60000 > camper.log 2>&1 &
node scripts/recover-game.js capybara-clicker --max-candidates 3 --candidate-timeout-ms 60000 > capybara.log 2>&1 &
node scripts/recover-game.js call-of-duty-zombies --max-candidates 3 --candidate-timeout-ms 60000 > cod.log 2>&1 &
node scripts/recover-game.js cannonbasketball2 --max-candidates 3 --candidate-timeout-ms 60000 > cannon.log 2>&1 &
node scripts/recover-game.js cactusmccoy2 --max-candidates 3 --candidate-timeout-ms 60000 > cactus.log 2>&1 &
wait
echo "All recoveries finished."
python broken_game_scanner.py --port 8400 --only cactusmccoy2 call-of-duty-zombies camper-strike cannon-basketball-4 cannonbasketball2 canyondefense capybara-clicker car-chaos cartoon-network-block-party cartoon-network-speedway > final_scan.log 2>&1
echo "Final scan finished."
