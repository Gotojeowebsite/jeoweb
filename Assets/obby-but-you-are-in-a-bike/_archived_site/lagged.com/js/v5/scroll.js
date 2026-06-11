var gamecnt=67;
var newGamesLoading=false;

window.addEventListener('scroll', () => {
if(!newGamesLoading&&gamecnt<300){
var scelemt=document.getElementById("scroll_div");

var offSet=100;
if(gtagg<100){
    offSet=0;
}

if((document.documentElement.scrollTop||document.body.scrollTop)>(scelemt.offsetHeight+offSet)-window.innerHeight){
newGamesLoading=true;

var sendata={};
sendata.gamecnt=gamecnt;
sendata.tagid=gtagg;
sendAjax(JSON.stringify(sendata), 'scroll_load.php',  function(response){
    if(!response.errors){
        var z=gamecnt+1;
        gamecnt=parseInt(response.game_cnt)+1;
        if(gtagg<1000){
            z-=10;
        }

        var addToElem=document.getElementById("scroll_div");
        
        for (var i = 0, len = response.games.length; i < len; i++) {
            var ttb="tt"+z;
			var gameWrap=document.createElement('div');
            gameWrap.className="thumbWrapper "+ttb;
            var gameWrap2=document.createElement('div');

            var gameAWr=document.createElement('a');
            gameAWr.className="ajref";
            gameAWr.href="https://lagged.com/en/g/"+response.games[i].url_key;
            gameAWr.title=response.games[i].name;
            gameAWr.innerHTML="<span class='thumbname'>"+response.games[i].name+"</span>";
            gameWrap2.appendChild(gameAWr);
            var gameIms=document.createElement('img');
            gameIms.src="https://imgs2.dab3games.com/"+response.games[i].thumb2;
            
            gameIms.alt=response.games[i].name+" games";
            gameIms.className="ajimgsr";
            gameWrap2.appendChild(gameIms);

            if(response.games[i].ribbon){
                var ribbonClass="ribbon-wrapper-new "+response.games[i].ribbon;
                var ribbonSpan=document.createElement('span');
                ribbonSpan.className=ribbonClass;
                ribbonSpan.innerHTML=response.games[i].ribbon.replace(/-/g, " ");
                gameWrap2.appendChild(ribbonSpan);
            }

            gameWrap.appendChild(gameWrap2);
            addToElem.appendChild(gameWrap);
            z++;
        }

        if(response.keepgoing===true){
            newGamesLoading=false;
        }
    }
});
}
}
}, {
    passive: true
});