const m = require('./broken-manifest.json');
const done = ['cannon-basketball-4','motox3m-pool','HexGL','angry-sharks','vex5','motox3m-spooky','basketball-stars','grindcraft','vex6','bobtherobber2','eggycar','om-bounce','webretro-local','Five-Nights-At-Epstein','sand-game','sm64','sort-the-court','CrazyCattle3D'];
const games = Object.keys(m).filter(g => !done.includes(g));
games.forEach(g => console.log(g + ': ' + m[g].length + ' | ' + m[g][0].path));
console.log('\nTotal:', games.length, 'games,', games.reduce((s,g)=>s+m[g].length,0), 'files');
