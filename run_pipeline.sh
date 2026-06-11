#!/bin/bash
while true; do
  echo "Rebuilding index..."
  node scan.js && node scripts/static-health-scan.js && node scripts/build-game-health.js --strict-external
  
  UNVERIFIED=$(node -e "console.log(Object.values(require('./game_health.json').games).filter(g => g.verdict === 'unverified' || g.verdict === 'unknown').length)")
  BROKEN=$(node -e "console.log(Object.values(require('./game_health.json').games).filter(g => g.verdict === 'broken').length)")
  
  echo "Unverified: $UNVERIFIED, Broken: $BROKEN"
  
  if [ "$UNVERIFIED" -eq 0 ] && [ "$BROKEN" -eq 0 ]; then
    echo "All done! 100% verified and working."
    break
  fi
  
  if [ "$UNVERIFIED" -gt 0 ]; then
    echo "Scanning unverified games..."
    node -e "const d = require('./game_health.json'); const unv = Object.entries(d.games).filter(([k,v]) => v.verdict === 'unverified' || v.verdict === 'unknown').map(x => x[0]); require('fs').writeFileSync('unverified.json', JSON.stringify({games: Object.fromEntries(unv.map(g => [g, {}]))}));"
    python broken_game_scanner.py --only-from unverified.json --parallel-workers 1 --batch-size 10
  fi
  
  if [ "$BROKEN" -gt 0 ]; then
    echo "Recovering broken games..."
    node scripts/recover-all-broken.js --workers 2 --include-cooldowns
  fi
done
