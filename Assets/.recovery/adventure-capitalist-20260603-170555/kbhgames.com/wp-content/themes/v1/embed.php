<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://playgama.com" crossorigin>
<script async src="https://playgama.com/ads/partners.v0.2.js" onerror="window.__kbhSdkFailed=true;window.dispatchEvent(new Event('kbh-sdk-fail'));"></script>
<link rel="preconnect" href="https://securepubads.g.doubleclick.net" crossorigin>
<link rel="preconnect" href="https://imasdk.googleapis.com" crossorigin>
<link rel="dns-prefetch" href="https://pagead2.googlesyndication.com">
<link rel="preconnect" href="https://kdata1.com" crossorigin>
<meta name="robots" content="noindex,nofollow">
<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
<link rel="canonical" href="https://kbhgames.com/game/adventure-capitalist">
<style>
  * { margin:0; padding:0; }
  html, body, .game-area, #innergame { touch-action:none; -ms-touch-action:none; }
  html, body { width:100%; height:100%; overflow:hidden; overscroll-behavior:none; background:#000; display:flex; align-items:center; justify-content:center; }
  body { flex-direction:column; }
  #nav { height:40px; width:100%; background:#1a1a1a; display:flex; align-items:center; justify-content:flex-end; padding:0 10px; z-index:10; flex-shrink:0; box-sizing:border-box; }
  #nav button { background:#222; border:1px solid #444; color:#fff; font-size:0.85rem; cursor:pointer; padding:6px 16px; border-radius:20px; font-family:sans-serif; letter-spacing:0.5px; }
  .game-area { flex:1; width:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  iframe { border:none; display:block; }
  #innergame { width:0; height:0; }
</style>
<style>
  #preroll-slot{position:fixed;inset:0;background:#000;z-index:2147483000;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#fff;font-family:'Courier New',monospace;}
  #preroll-slot.hidden{display:none;}
  .playbutton-overlay{position:fixed;inset:0;background:#181818;display:flex;align-items:center;align-content:center;justify-content:center;flex-wrap:wrap;cursor:pointer;overflow:hidden;z-index:2147483002;-webkit-tap-highlight-color:transparent;user-select:none;font-family:sans-serif;color:#ededed;}
  .playbutton-overlay::before{content:" ";position:absolute;left:0;top:0;width:100%;height:100%;box-sizing:border-box;background-image:url('https://kbhgames.com/wp-content/uploads/2021/03/AdVenture-Capitalist.webp');background-repeat:no-repeat;background-size:cover;filter:blur(50px) brightness(0.5);z-index:-1;}
  .playbutton-overlay .ptb img{border-radius:100px;border:3px solid rgba(255,255,255,.15);width:180px;height:180px;aspect-ratio:1/1;box-shadow:0 0 30px rgba(0,0,0,.6);transition:border-color .3s,box-shadow .3s;}
  .playbutton-overlay:hover .ptb img{border-color:rgba(255,255,255,.3);box-shadow:0 0 40px rgba(66,133,244,.3);}
  .playbutton-overlay .btnplaynow{background:linear-gradient(180deg,#43a047,#2e7d32);border:none;border-radius:12px;margin-left:15px;padding:14px 24px;color:#fff;box-shadow:0 4px 0 #1b5e20,0 6px 20px rgba(0,0,0,.4);transition:all .15s ease;text-shadow:0 2px 4px rgba(0,0,0,.3);font-size:50px;line-height:1;}
  .playbutton-overlay:hover .btnplaynow{background:linear-gradient(180deg,#4caf50,#388e3c);box-shadow:0 4px 0 #1b5e20,0 8px 25px rgba(76,175,80,.3);transform:translateY(-1px);}
  .playbutton-overlay:active .btnplaynow{box-shadow:0 2px 0 #1b5e20,0 3px 10px rgba(0,0,0,.4);transform:translateY(2px);}
  .playbutton-overlay.hidden{display:none;}
  @media screen and (max-width:480px){.playbutton-overlay .btnplaynow{font-size:25px;}}
  @media (hover:none) and (pointer:coarse){.playbutton-overlay .ptb{display:none;}.playbutton-overlay .btnplaynow{margin-left:0;font-size:0;}.playbutton-overlay .btnplaynow::before{content:"▸ Start Game";font-size:50px;}}
  @media (hover:none) and (pointer:coarse) and (max-width:480px){.playbutton-overlay .btnplaynow::before{font-size:25px;}}
  .playbutton-overlay p.agelimit{flex-basis:100%;width:100%;text-align:center;margin:24px 0 0;padding:14px 24px;color:#fff;font-size:18px;font-weight:600;line-height:1.5;letter-spacing:0.3px;position:relative;z-index:2;text-shadow:0 1px 3px rgba(0,0,0,0.8);background:linear-gradient(90deg,transparent,rgba(255,183,77,0.12),transparent);box-sizing:border-box;}
  .playbutton-overlay p.agelimit::before{content:"\26A0";margin-right:10px;color:#ffc107;font-size:24px;vertical-align:-3px;text-shadow:0 0 12px rgba(255,193,7,0.5);}
  .loader{font-size:clamp(24px,5vmin,42px);line-height:1;letter-spacing:2px;}
  .loader::before{content:'';display:inline-block;}
  .kbh-label{margin-top:18px;font-size:11px;letter-spacing:2px;opacity:.55;}
  .loader--1::before{animation:anim1 700ms steps(1,end) infinite}
  .loader--2::before{animation:anim2 700ms steps(1,end) infinite}
  .loader--3::before{animation:anim3 700ms steps(1,end) infinite}
  .loader--4::before{animation:anim4 700ms steps(1,end) infinite}
  .loader--5::before{animation:anim5 700ms steps(1,end) infinite}
  .loader--6::before{animation:anim6 700ms steps(1,end) infinite}
  .loader--7::before{animation:anim7 700ms steps(1,end) infinite}
  .loader--9::before{animation:anim9 700ms steps(1,end) infinite}
  .loader--10::before{animation:anim10 700ms steps(1,end) infinite}
  .loader--11::before{animation:anim11 700ms steps(1,end) infinite}
  .loader--12::before{animation:anim12 700ms steps(1,end) infinite}
  @keyframes anim1{0%,100%{content:'[----]'}20%{content:'[=---]'}40%{content:'[-=--]'}60%{content:'[--=-]'}80%{content:'[---=]'}}
  @keyframes anim2{0%,100%{content:'{/////}'}20%{content:'{~////}'}40%{content:'{/~///}'}60%{content:'{//~//}'}80%{content:'{////~}'}}
  @keyframes anim3{0%,100%{content:'(●)'}50%{content:'(⚬)'}}
  @keyframes anim4{0%,100%{content:'↑'}12.5%{content:'↗'}25%{content:'→'}37.5%{content:'↘'}50%{content:'↓'}62.5%{content:'↙'}75%{content:'←'}87.5%{content:'↖'}}
  @keyframes anim5{0%,100%{content:'⊏'}25%{content:'⊓'}50%{content:'⊐'}75%{content:'⊔'}}
  @keyframes anim6{0%,100%{content:'×'}50%{content:'+'}}
  @keyframes anim7{0%,100%{content:'☰'}16.666%{content:'☱'}33.333%{content:'☳'}50%{content:'☷'}66.666%{content:'☶'}83.333%{content:'☴'}}
  @keyframes anim9{0%,100%{content:'⣷'}12.5%{content:'⣯'}25%{content:'⣟'}37.5%{content:'⡿'}50%{content:'⢿'}62.5%{content:'⣻'}75%{content:'⣽'}87.5%{content:'⣾'}}
  @keyframes anim10{0%,100%{content:'◷'}25%{content:'◶'}50%{content:'◵'}75%{content:'◴'}}
  @keyframes anim11{0%,100%{content:'▛'}25%{content:'▜'}50%{content:'▟'}75%{content:'▙'}}
  @keyframes anim12{0%,100%{content:'░░░░░░'}9.09%{content:'░░░░░░'}18.18%{content:'░░░░░░'}27.27%{content:'░░░░░░'}36.36%{content:'▓░░░░░'}45.45%{content:'▒▓░░░░'}54.54%{content:'░▒▓░░░'}63.63%{content:'░░▒▓░░'}72.72%{content:'░░░▒▓░'}81.81%{content:'░░░░▒▓'}90.90%{content:'░░░░░▒'}}
</style>
</head>
<body>
<div class="game-area">
<iframe id="innergame"  scrolling="no" allow="autoplay; fullscreen; microphone" allowfullscreen></iframe>
</div>
<div class="playbutton-overlay" id="kbh-play-overlay" role="button" aria-label="Play Now">
  <div class="ptb"><img src="https://kbhgames.com/wp-content/uploads/2021/03/AdVenture-Capitalist.webp" width="180" height="180" alt="AdVenture Capitalist" decoding="async" fetchpriority="high" loading="eager"></div>
  <span class="btnplaynow">&#9658; Play Now!</span>
  </div>
<div id="preroll-slot" class="hidden" role="status" aria-label="Loading game">
  <div id="ascii-loader"></div>
  <div class="kbh-label">LOADING…</div>
</div>
<script>
  var gw = 1024;
  var gh = 725;
  function sizeGame() {
    if (!gw || !gh) return;
    var area = document.querySelector('.game-area');
    var iframe = document.getElementById('innergame');
    if (!area || !iframe) return;
    var cw = area.clientWidth;
    var ch = area.clientHeight;
    var scale = Math.min(cw / gw, ch / gh);
    iframe.style.width = Math.floor(gw * scale) + 'px';
    iframe.style.height = Math.floor(gh * scale) + 'px';
  }
  sizeGame();
  window.addEventListener('resize', sizeGame);
  function b(e){e.preventDefault();}
  document.addEventListener('touchmove',function(e){
    if(e.touches.length>1||(e.scale!==undefined&&e.scale!==1))e.preventDefault();
  },{passive:false});
  document.addEventListener('touchstart',function(e){if(e.touches.length>1)e.preventDefault();},{passive:false});
  document.addEventListener('gesturestart',b);
  document.addEventListener('gesturechange',b);
  document.addEventListener('gestureend',b);
</script>
<script>
(function(){
  var overlay = document.getElementById('kbh-play-overlay');
  var slot    = document.getElementById('preroll-slot');
  var loader  = document.getElementById('ascii-loader');
  var frame   = document.getElementById('innergame');
  var gameUrl = "https:\/\/kdata1.com\/2021\/03\/adcapitalist\/?d";
  var clid    = "p_2a375f02-ab07-479b-9efb-7aba37a929f7";
  var gameId  = "113589";
  var pool   = [1,2,3,4,5,6,7,9,10,11,12];
  var labels = ['LOADING','BUFFERING','INITIALIZING','RENDERING','PROCESSING','CONNECTING','COMPILING','FETCHING','GENERATING','DEPLOYING','PREPARING','ASSEMBLING','LAUNCHING','ACTIVATING','CHARGING','SPAWNING','SUMMONING','AWAKENING','UNLEASHING','FORGING','CRAFTING','BUILDING','HATCHING','TUNING','BREWING'];
  var labelEl = null, lastIdx = -1, labelTimer = null;
  var hardTimer = null, gameLoading = false, adDone = false, fired = false;

  function pickLabel(){
    if (!labelEl) return;
    var idx;
    do { idx = Math.floor(Math.random()*labels.length); } while (idx === lastIdx);
    lastIdx = idx;
    labelEl.textContent = labels[idx] + '…';
  }

  function startGameLoad(){
    if (gameLoading) return;
    gameLoading = true;
    frame.addEventListener('load', function(){
      slot.classList.add('hidden');
      if (labelTimer) { clearInterval(labelTimer); labelTimer = null; }
      sizeGame();
    }, { once: true });
    frame.src = gameUrl;
  }

  function clearHardTimer(){ if (hardTimer) { clearTimeout(hardTimer); hardTimer = null; } }

  function finish(){
    if (adDone) return;
    adDone = true;
    clearHardTimer();
    startGameLoad();
  }

  function armHardTimer(){
    if (hardTimer || gameLoading) return;
    hardTimer = setTimeout(finish, 7000);
  }

  function startSdkFlow(){
    try {
      window.pgAds.init(gameId ? { clid: clid, gameId: gameId } : { clid: clid }).then(function(){
        return window.pgAds.requestOutOfPageAd('interstitial_preroll');
      }).then(function(ad){
        ad.addEventListener('ready',    function(){ if (!adDone) { try { ad.show(); } catch(e){ finish(); } } });
        ad.addEventListener('rendered', function(){ clearHardTimer(); });
        ad.addEventListener('empty',    function(){ finish(); });
        ad.addEventListener('closed',   function(){ finish(); });
      }).catch(function(){ finish(); });
    } catch(e){ finish(); }
  }

  function fireAd(){
    loader.className = 'loader loader--' + pool[Math.floor(Math.random()*pool.length)];
    labelEl = slot.querySelector('.kbh-label');
    pickLabel();
    labelTimer = setInterval(pickLabel, 1500);
    overlay.classList.add('hidden');
    slot.classList.remove('hidden');
    armHardTimer();

    if (window.__kbhSdkFailed) { finish(); return; }
    window.addEventListener('kbh-sdk-fail', function(){ finish(); }, { once: true });
    if (window.pgAds) {
      startSdkFlow();
    } else {
      window.pgAdsCallbacks = window.pgAdsCallbacks || [];
      window.pgAdsCallbacks.push(startSdkFlow);
    }
  }

  function fireAdOnce(e){
    if (fired) return;
    fired = true;
    if (e && e.preventDefault) e.preventDefault();
    fireAd();
  }
  overlay.addEventListener('pointerup', fireAdOnce, { once: true });
  overlay.addEventListener('click',     fireAdOnce, { once: true });
})();
</script>
<script defer src="https://static.cloudflareinsights.com/beacon.min.js/v833ccba57c9e4d2798f2e76cebdd09a11778172276447" integrity="sha512-57MDmcccJXYtNnH+ZiBwzC4jb2rvgVCEokYN+L/nLlmO8rfYT/gIpW2A569iJ/3b+0UEasghjuZH/ma3wIs/EQ==" data-cf-beacon='{"version":"2024.11.0","token":"de6c4c5e56cb4393a14233a7407d1c00","server_timing":{"name":{"cfCacheStatus":true,"cfEdge":true,"cfExtPri":true,"cfL4":true,"cfOrigin":true,"cfSpeedBrain":true},"location_startswith":null}}' crossorigin="anonymous"></script>
<script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'a0604ace2ee70d0e',t:'MTc4MDUwNjQyNg=='};var a=document.createElement('script');a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>
</html>
