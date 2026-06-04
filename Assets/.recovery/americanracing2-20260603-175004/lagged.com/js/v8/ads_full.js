var username="guest"+Math.floor(1e4*Math.random());
var useravatar="https://lagged.com/images/avatars/default-avatar.jpg";
var currentRating=0;
var userid_ds=0;
var isItInit=false;
var customChannelUse=5821718994;
var customHostChannel=7707248365;
var customCreativeChannelUse=8034551420;
var thereIsInterstital=false;


var adChannels = [
  {campaign: 20342976600, channel: 5284579989, host: 3971498315},
  {campaign: 20620259038, channel: 9343697118, host: 4091370430},
  {campaign: 20627865599, channel: 1201892332, host: 6139907138},
  {campaign: 20432066605, channel: 6713612071, host: 5400530401},
  {campaign: 20755752470, channel: 2536066400, host: 6722723425},
  {campaign: 20815087362, channel: 7650683328, host: 3711438310},
  {campaign: 21080335370, channel: 3672739786, host: 9484303819},
  {campaign: 21083623405, channel: 8727176793, host: 2983895526},
  {campaign: 21355236697, channel: 6936098268, host: 2824876134},
  {campaign: 21404394406, channel: 4729882534, host: 7110850901},
  {campaign: 21732151578, channel: 2951357816, host: 9853374753},
  {campaign: 21795604023, channel: 1178432528, host: 3683571704},
  {campaign: 21883718375, channel: 7112496463, host: 5014341962},
  {campaign: 22118211294, channel: 6285048221, host: 6264866927},
  {campaign: 22118246835, channel: 3804261093, host: 2976358600},
  {campaign: 22394272456, channel: 1827186599, host: 9514104929},
  {campaign: 22384429323, channel: 4149263459, host: 2836181784},
  {campaign: 22685979988, channel: 6253790806, host: 6347776683},
  {campaign: 8000001, channel: 2202865504, host: 5812606320},
  {campaign: 8000002, channel: 6678201099, host: 4316380186},
  {campaign: 8000003, channel: 5758805431, host: 3132642093},
  {campaign: 7001, channel: 9962229541, host: 8435790226},
  {campaign: 551, channel: 4544840199, host: 4183216848},
  {campaign: 441, channel: 2170624570, host: 9526570104},
  {campaign: 442, channel: 6522696887, host: 5209615215},
  {campaign: 443, channel: 4562564176, host: 5979314553},
  {campaign: 444, channel: 4691219393, host: 8497666685}
];
// var creativeChannels = [
//   /* campaign: 20429634892 */
//   {creative: 668346282187, channel: 8309310175},
//   {creative: 668346282172, channel: 7873307851},
//   {creative: 668346282193, channel: 1802723524},
//   {creative: 668346282190, channel: 8467370075},
//   {creative: 668346282196, channel: 8176560182},
//   {creative: 668346282178, channel: 6863478510},
//   {creative: 694132436615, channel: 5541646223},
//   {creative: 694038642210, channel: 2862623949},
  
//   /* campaign: 21080335370 */
//   {creative: 692905126442, channel: 1784943040},
//   {creative: 692905126451, channel: 5245675901},
//   {creative: 692905126457, channel: 9796715883},
//   {creative: 692905126463, channel: 7170552542},
//   {creative: 692905126472, channel: 2619512565},
//   {creative: 697427915702, channel: 1119128986},
//   {creative: 700859645009, channel: 9641410398},
//   {creative: 700763543982, channel: 8328328725},
//   {creative: 700861580066, channel: 2545966110},
//   {creative: 701503805887, channel: 9912464010},
  
//   /* campaign: 20815087362 */
//   {creative: 682973125344, channel: 2976941148},
//   {creative: 683060496686, channel: 4002248204},
//   {creative: 683062057589, channel: 1739881098},
//   {creative: 682973339640, channel: 6401164928},
//   {creative: 682973339643, channel: 2357978133},
//   {creative: 682973339646, channel: 4896511561},
//   {creative: 684262298394, channel: 9981412741},
//   {creative: 697328113890, channel: 1409088817},
//   {creative: 697439300388, channel: 9507689232},
//   {creative: 700859578028, channel: 6185828227},
//   {creative: 700765351407, channel: 4716386779},
//   {creative: 700878275966, channel: 4326785797},
//   {creative: 701503873351, channel: 9018184742},
  
//   /* campaign: 20620259038 */
//   {creative: 676062504932, channel: 3276186057},
//   {creative: 676008964495, channel: 1963104385},
//   {creative: 676009209082, channel: 4397696031}
// ];

var getUserAgent = function () {
  var userAgent = navigator.userAgent
      || navigator.vendor
      || window.opera
      || null;
  return userAgent;
};

var isMobileOrTablet = function () {
  var userAgent = getUserAgent();

  var userAgentPart = userAgent.substr(0, 4);

  return /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(userAgentPart);
};

var isMobile = isMobileOrTablet();

var windowWidth=window.innerWidth;
var windowHeight=window.innerHeight;
var slot1;var slot2;var slot3;

var conversionViewSent=false;

//var prebidVideoBids=[];
var leaderboard_ad_sizes = [
  [970, 90], [728, 90], [750, 200], [750, 100], [468, 60]
];


var interstitial_ad_sizes = [
    [300, 250], [320, 480], [336, 280], [480, 320], [768, 1024], [1024, 768], [728, 90],[120,600], [160,600],[250,250], [970,90],[468,60], [970,250]
];

var skyscaper_ad_sizes = [
    [1,1], [120,600], [160,600]
];
var square_ad_sizes = [
    [1,1], [336,280], [300,250], [300,600]
];

if(windowWidth>730&&windowWidth<971){
  leaderboard_ad_sizes = [
      [320, 100], [750, 200], [750, 100], [728, 90], [468, 60], [320, 50], [300, 50], [300, 100], [300, 75]
  ];
}else if(windowWidth<731){
  leaderboard_ad_sizes = [
      [300, 100], [320, 100], [320, 50], [300, 75], [300, 50]
  ];
}


var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];

var interstitialSlot;
var gameManualInterstitialSlot;

googletag.cmd.push(function() {
var pubads=googletag.pubads();

  defineGameManualInterstitialSlot(pubads);

//if(campaign_id>0){
  interstitialSlot = googletag.defineOutOfPageSlot(
    "/1786990/lagged_interstitial",
    googletag.enums.OutOfPageFormat.INTERSTITIAL,
  );

  if (interstitialSlot) {

    

    // Enable optional interstitial triggers and register the slot.
    interstitialSlot.setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(pubads).setConfig({
    interstitial: {
        triggers: {
          unhideWindow: true,
          navBar: false,
        },
    },
    });
    var interAd=document.createElement("div");
    interAd.id="static-ad-1";
    document.body.appendChild(interAd);
    //googletag.display(interstitialSlot);
  }
//}

googletag.defineSlot('/1786990/lagged_interstitial', interstitial_ad_sizes, 'static-ad-1');

//if(windowWidth>600){
slot1=googletag.defineSlot('/1786990/playpage', leaderboard_ad_sizes, 'div-gpt-ad-1702428160119-0').setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(pubads);
//}

if(windowWidth>1499||(windowWidth<1081&&windowWidth>1000)){
  slot2=googletag.defineSlot('/1786990/lagged_sky', skyscaper_ad_sizes, 'div-gpt-ad-sky').setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(pubads);
}
if(windowWidth>1080){
  slot3=googletag.defineSlot('/1786990/lagged_square', square_ad_sizes, 'div-gpt-ad-sqad').setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(pubads);
}else{
    var anchorSlot=googletag.defineOutOfPageSlot('/1786990/lagged_anchor', googletag.enums.OutOfPageFormat.BOTTOM_ANCHOR);
    if(anchorSlot){
      anchorSlot.setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(pubads);

      var interAd=document.createElement("div");
      interAd.id="static-ad-2";
      document.body.appendChild(interAd);
    }

    googletag.defineSlot('/1786990/lagged_anchor', interstitial_ad_sizes, 'static-ad-2');
}


pubads.enableSingleRequest();
pubads.collapseEmptyDivs();
pubads.setPublisherProvidedId(userPPID);
googletag.enableServices();

try{

  //if(campaign_id>0){
    googletag.display(interstitialSlot);
  //}

  googletag.display('div-gpt-ad-1702428160119-0');
  //if(windowWidth>600){
  //}

  if(windowWidth>1080){
    googletag.display('div-gpt-ad-sqad');
  }else{
      googletag.display(anchorSlot);
  }
  if(windowWidth>1499||(windowWidth<1081&&windowWidth>1000)){
    googletag.display('div-gpt-ad-sky');
  }


}catch(e){
  console.log(e);
} 

pubads.addEventListener("slotRenderEnded", (event) => {

  //
  // debug:
  //
  // var targetingKeys = event.slot.getTargetingKeys();
  // targetingKeys.forEach(function(key) {
  //   var values = event.slot.getTargeting(key);
  //   console.log('Targeting Key:', key, 'Values:', values);
  // });

var ad_unit_name=event.slot.getAdUnitPath();
if(ad_unit_name=='/1786990/playpage'){
  try{
    if(event.size){
      var adHeight=event.size[1];
      if(adHeight>90){
        document.getElementById('div-gpt-ad-1702428160119-0').style.height=adHeight+"px";
      }
    }
  }catch(e){
    console.log(e);
  }
}

  if (interstitialSlot === event.slot) {
      console.log("intersitial intersitial is loaded...");
      thereIsInterstital=true;
  }
});

});


function defineGameManualInterstitialSlot(pubads) {
  gameManualInterstitialSlot = googletag.defineOutOfPageSlot(
    '/1786990/lagged_h5_preloader',
    googletag.enums.OutOfPageFormat.GAME_MANUAL_INTERSTITIAL);
  // Slot returns null if the page or device does not support interstitials.
  if (gameManualInterstitialSlot) {
    gameManualInterstitialSlot.setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(pubads);
    
    //console.log("Waiting for H5 interstitial to be ready...");
   
    pubads.addEventListener('gameManualInterstitialSlotReady',
      (slotReadyEvent) => {
          if (gameManualInterstitialSlot === slotReadyEvent.slot) {

            console.log("H5 ad is ready...");

          isItInit=true;
          if(didClickbtn){
              slotReadyEvent.makeGameManualInterstitialVisible();
              //sendGtagEvent('game_ad',0,false);
          }else{
            document.getElementById('pregametap').onclick=function(){
              document.getElementById('pregametap').className="pregame-clicky loading";
              setTimeout(function(){
                slotReadyEvent.makeGameManualInterstitialVisible();
                onContentResumeRequested();
                //sendGtagEvent('game_ad',0,false);
              },500);
            }
          }
} });
    pubads.addEventListener('gameManualInterstitialSlotClosed',
      resumeGameFromH5);
} }

//
// play now
//
var didClickbtn=false;
function startGame(element){
  didClickbtn=true;

    element.className="pregame-clicky loading";
    element.onclick=function(){console.log("double click")};
    document.getElementById('playnowbtn').disabled=true;

    if(isItInit){
        try{
          if(gameInfo.game){
            startGameInit();
          }
        }catch(e){
          console.log(e);
        }
    }else{
      try{
        if(gameInfo.game){
          setTimeout(function(){
            startGameInit();
            if(!loadedGameYet){
              onContentResumeRequested();
            }
            if(document.getElementById('gamePlayer')){
              document.getElementById('gamePlayer').style.visibility="visible";
            }

              // try{
              //   gtag('event', 'user_ui_event', {
              //     'send_to': 'G-F16JC3ZS20',
              //     'type': 'h5_ad_not_loaded',
              //   });
              // }catch(e){
              //   console.log(e);
              // }
          },2000);
        }
      }catch(e){
        console.log(e);
      }
    }
}

// function playAds(){
//     console.log("play ads old function");
// }

function resumeGameFromH5(){
    if(!loadedGameYet){
      onContentResumeRequested();
    }
    if(!gameInfo.game){
      var searchOpen=gameInfo.name.split(" ")[0];
      window.open("https://lagged.com/sitesearch/"+searchOpen.toLowerCase(),"_top");
    }
    if(document.getElementById('gamePlayer')){
        document.getElementById('gamePlayer').style.visibility="visible";
    }
    try{
      googletag.destroySlots([gameManualInterstitialSlot]);
    }catch(e){
      console.log(e);
    }
}

/**
 * start and removes ad UI.
 */
var loadedGameYet=false;
function onContentResumeRequested() {
    if(loadedGameYet){return;}
    loadedGameYet=true;

    if(gameInfo.game){
      var gameWrappr=document.getElementById("game-wrapper");
      var gameCenter=document.getElementById("gamecenter");

        //
        // create controls button
        //
        var gameControlsBtn = document.createElement("button");
        gameControlsBtn.id="controlsopens";
        gameControlsBtn.className="game-controls-open";
        gameControlsBtn.onclick=function(){toggleGameControls();}
        gameWrappr.appendChild(gameControlsBtn);

        //fullscreen button
        var videoPlugButton = document.createElement("button");
        videoPlugButton.className="video-plug";
        videoPlugButton.id="viddyyy";
        videoPlugButton.onclick=function(){
          fullScreenGame(false);
        }
        gameWrappr.appendChild(videoPlugButton);

        //make game bigger
        if(windowWidth<811||(isMobile&&windowWidth<windowHeight)||(isMobile&&windowWidth<1181)){
            document.body.classList.add('fullscreenpage');

            //create bottom bar
            var fullgame_menu = document.createElement("div");
            fullgame_menu.className="mobile_full_menubottom";
            fullgame_menu.id="mobilefullcheckmenu";

            var menuwrap_logo=document.createElement("a");
            menuwrap_logo.href="https://lagged.com/";
            menuwrap_logo.className="logo";
            fullgame_menu.appendChild(menuwrap_logo);

            var menugames_wrap = document.createElement("div");
            menugames_wrap.className="menugameswrap";

            try{
              for(var ii=0;ii<more_game.length;ii++){
                var gameMoreGameMobile = document.createElement("a");
                gameMoreGameMobile.className="gamepluglink";
                gameMoreGameMobile.href="https://lagged.com/en/g/"+more_game[ii].url_key;
                gameMoreGameMobile.innerHTML="<img src='https://imgs2.dab3games.com/"+more_game[ii].thumb2+"' alt='game'>";
                menugames_wrap.appendChild(gameMoreGameMobile);
              }
            }catch(e){
              console.log(e);
            }

            fullgame_menu.appendChild(menugames_wrap);
            gameWrappr.appendChild(fullgame_menu);

            var gameHeight=window.innerHeight;
            gameWrappr.setAttribute('style', 'height:'+gameHeight+'px');

            //
            // create "close" button
            //
            var closeGameBtn = document.createElement("div");
            closeGameBtn.className="game-controls-open closeitnow";
            closeGameBtn.id="close_game_btn";
            closeGameBtn.onclick=function(){
              try{
                location.reload();
              }catch(e){
                console.log(e);
              }
            }
            gameWrappr.appendChild(closeGameBtn);

        }else{
          try{
            if(gameInfo.orientation>1){
              if(windowWidth>1400&&windowHeight>900){
                gameWrappr.style.paddingTop="68%";
              }else if(windowWidth>810&&windowHeight>760){
                gameWrappr.style.paddingTop="76%";
              }
            }
          }catch(e){
            console.log(e);
          }
        }

        if(isMobile){
          if(suggest_rotate&&windowWidth<windowHeight){
            var suggestRotateDiv = document.createElement("div");
            suggestRotateDiv.id="suggestyrotate";
            suggestRotateDiv.className="suggestrotate";
            suggestRotateDiv.innerHTML="Rotate device for more fun!";
            gameWrappr.appendChild(suggestRotateDiv);
          }else if(gameInfo.orientation>1&&(windowWidth-100)>windowHeight){
            var suggestRotateDiv = document.createElement("div");
            suggestRotateDiv.id="suggestyrotate";
            suggestRotateDiv.className="suggestrotate";
            suggestRotateDiv.innerHTML="Rotate device for more fun!";
            gameWrappr.appendChild(suggestRotateDiv);
          }
        }
  
        var gameElement = document.createElement("iframe");
        gameElement.id="gamePlayer";
        gameElement.src=gameInfo.game;
        gameElement.setAttribute("allow", "autoplay");
        gameElement.style.visibility="hidden";

        gameWrappr.appendChild(gameElement);
        gameWrappr.className="pregame-loader gameloaded";
        gameCenter.className="game-page-center postload";

        document.getElementById('pregametap').remove();   
        
        try{
          if(document.getElementById('award_preg_1')){
            document.getElementById('award_preg_1').remove();
          }
        }catch(e){
          console.log(e);
        }
    }

      //
      // call again in case it was not called
      //
      startGameInit();


      var tracker_external="";
      if(user_click_id&&user_click_id.length>3){
        tracker_external="&lagklid="+user_click_id;
      }

      //
      // video game plugs on load
      //var gameWrappr=document.getElementById("game-wrapper");
      if(gameInfo.id==9040||gameInfo.id==5340||gameInfo.id==3946||gameInfo.id==6463||gameInfo.id==7783||gameInfo.id==2782||gameInfo.id==7791||gameInfo.id==1860){
          var plugrgame = document.createElement("div");
          plugrgame.id="game_plug_video";
        
            var plugrgame_wrap = document.createElement("div");
            plugrgame_wrap.classList="plug_wrap whitebitbar"; 

                var newVideo=document.createElement("video");
                newVideo.id="video_roll";
                newVideo.autoplay=true;
                newVideo.loop=true;
                newVideo.muted=true;
                newVideo.playsInline=true;
                newVideo.disablePictureInPicture=true;
                

        if(gameInfo.id==9040||gameInfo.id==5340){
          //worms

            newVideo.src="https://lagged.com/images/worm.mp4";
            plugrgame_wrap.innerHTML="<h3>Worm</h3>";
            plugrgame_wrap.onclick=function(){
              try{
              if(document.getElementById('game_plug_video')){
              document.getElementById('game_plug_video').remove();
              }
              }catch(e){
              console.log(e);
              }
              
              var game_link_go="https://brainplay.com/p/worm?gcid=22334491025"+tracker_external;
              window.open(game_link_go , "_blank");
              
            }
        }else if(gameInfo.id==1860){
                       //uno game
            newVideo.src="https://lagged.com/images/uno-online.mp4";
            plugrgame_wrap.innerHTML="<h3>UNO (Leaderboards)</h3>";
            plugrgame_wrap.onclick=function(){
              try{
              if(document.getElementById('game_plug_video')){
              document.getElementById('game_plug_video').remove();
              }
              }catch(e){
              console.log(e);
              }
              
              var game_link_go="https://brainplay.com/p/uno-online?gcid=22334491025"+tracker_external;
              window.open(game_link_go , "_blank");
              
            }
          
        }else if(gameInfo.id==7791){
             //mango game
            newVideo.src="https://lagged.com/images/mango.mp4";
            plugrgame_wrap.innerHTML="<h3>Lemon Opera</h3>";
            plugrgame_wrap.onclick=function(){
              try{
              if(document.getElementById('game_plug_video')){
              document.getElementById('game_plug_video').remove();
              }
              }catch(e){
              console.log(e);
              }
              
              var game_link_go="https://lagged.com/en/g/lemon-opera";
              window.open(game_link_go , "_blank");
              
            }
        
        }else if(gameInfo.id==7783||gameInfo.id==2782){
          //magic tiles game
              newVideo.src="https://lagged.com/images/magic-tiles.mp4";
            plugrgame_wrap.innerHTML="<h3>Magic Tiles</h3>";
            plugrgame_wrap.onclick=function(){
              try{
              if(document.getElementById('game_plug_video')){
              document.getElementById('game_plug_video').remove();
              }
              }catch(e){
              console.log(e);
              }
              
              var game_link_go="https://lagged.com/en/g/magic-piano-tiles";
              window.open(game_link_go , "_blank");
              
            }
        }else{
          //bump bandit
          newVideo.src="https://lagged.com/images/bump-bandit.mp4";
            plugrgame_wrap.innerHTML="<h3>Bump Bandit</h3>";
            plugrgame_wrap.onclick=function(){

              try{
              if(document.getElementById('game_plug_video')){
              document.getElementById('game_plug_video').remove();
              }
              }catch(e){
              console.log(e);
              }

              var game_link_go="https://brainplay.com/p/bump-bandit?gcid=22334491025"+tracker_external;
              window.open(game_link_go , "_blank");
              
            }
        }

        plugrgame_wrap.appendChild(newVideo);
        plugrgame.appendChild(plugrgame_wrap);
        gameWrappr.appendChild(plugrgame);
        setTimeout(function(){
          try{
            if(document.getElementById('game_plug_video')){
              document.getElementById('game_plug_video').remove();
            }
          }catch(e){
            console.log(e);
          }
        }, 45000);
      }


      //check game plugs
      if(game_plug&&game_plug.gid>0){
        setTimeout(function(){
          var plugrgame = document.createElement("div");
          plugrgame.id="game_plug";

          var plugrgame_but = document.createElement("button");
          plugrgame_but.classList="plugclose"; 
          plugrgame_but.innerHTML="close";
          plugrgame_but.onclick=function(){
            if(game_plug.plug_url){
              document.getElementById('game_plug').style.display="none";
              setTimeout(function(){
                document.getElementById('game_plug').style.display="block";
              }, 240000);
            }else{
              try{
                document.getElementById('game_plug').remove();
              }catch(e){
                console.log(e)
              }
            }
          }
          plugrgame.appendChild(plugrgame_but);


          if(game_plug.url_key){

            var plugrgame_wrap = document.createElement("div");
            plugrgame_wrap.classList="plug_wrap whitebitbar"; 
            plugrgame_wrap.innerHTML="<img src='https://imgs2.dab3games.com/"+game_plug.thumb2+"'><div><h3>"+game_plug.name+"</h3><a class='loadmorebtn'>Play Now</a></div>";
            plugrgame_wrap.onclick=function(){

              try{
                gtag('event', 'game_plug_click', {
                  'send_to': 'G-F16JC3ZS20',
                  'gid': gameInfo.id,
                  'type': 'click_game_plug',
                });
              }catch(e){
                console.log(e);
              }

              var game_link_go="https://lagged.com/en/g/"+game_plug.url_key;
              window.open(game_link_go , "_blank");

            }

          }else if(game_plug.plug_url){

            var plugrgame_wrap = document.createElement("div");
            plugrgame_wrap.classList="plug_wrap whitebitbar"; 
            plugrgame_wrap.innerHTML="<img src='https://imgs2.dab3games.com/"+game_plug.plug_image+"'><div><h3>"+game_plug.name+"</h3><a class='loadmorebtn'>Play Now</a></div>";
          
            
            plugrgame_wrap.onclick=function(){

              var game_link_go=game_plug.plug_url+"?gcid=22334491024"+tracker_external;
              window.open(game_link_go , "_blank");
              
            }

          }

          plugrgame.appendChild(plugrgame_wrap);

          gameWrappr.appendChild(plugrgame);
      
        }, game_plug.twait*1000);
      }
}



//var doitresize;
window.onresize = function(){
  // clearTimeout(doitresize);
  // doitresize = setTimeout(resizedw, 50);
  resizedw();
};

function resizedw(){
    windowWidth=window.innerWidth;
    windowHeight=window.innerHeight;
    var gameWrappr=document.getElementById("game-wrapper");

  if(loadedGameYet){
    if(windowWidth<811||(isMobile&&windowWidth<windowHeight)||(isMobile&&windowWidth<1181)){

          document.body.classList.add('fullscreenpage');

          var gameHeight=window.innerHeight;
          gameWrappr.setAttribute('style', 'height:'+gameHeight+'px');
          gameWrappr.style.paddingTop="0";

          if(!document.getElementById('mobilefullcheckmenu')){
            try{

              //create bottom bar
              var fullgame_menu = document.createElement("div");
              fullgame_menu.className="mobile_full_menubottom";
              fullgame_menu.id="mobilefullcheckmenu";

              var menuwrap_logo=document.createElement("a");
              menuwrap_logo.href="https://lagged.com/";
              menuwrap_logo.className="logo";
              fullgame_menu.appendChild(menuwrap_logo);

              var menugames_wrap = document.createElement("div");
              menugames_wrap.className="menugameswrap";

              try{
              for(var ii=0;ii<more_game.length;ii++){
              var gameMoreGameMobile = document.createElement("a");
              gameMoreGameMobile.className="gamepluglink";
              gameMoreGameMobile.href="https://lagged.com/en/g/"+more_game[ii].url_key;
              gameMoreGameMobile.innerHTML="<img src='https://imgs2.dab3games.com/"+more_game[ii].thumb2+"' alt='game'>";
              menugames_wrap.appendChild(gameMoreGameMobile);
              }
              }catch(e){
              console.log(e);
              }

              fullgame_menu.appendChild(menugames_wrap);
              gameWrappr.appendChild(fullgame_menu);

            }catch(e){
              console.log(e);
            }
          }

    }else{
      //clear style on height in case

      if(!isFullscreen){
        gameWrappr.style.height = '';
        gameWrappr.style.paddingTop="60%";
      }else{
        gameWrappr.style.paddingTop="0";
      }
      document.body.classList.remove('fullscreenpage');

      try{
        if(gameInfo.orientation>1&&!isFullscreen){
          if(windowWidth>1400&&windowHeight>900){
            gameWrappr.style.paddingTop="68%";
          }else if(windowWidth>810&&windowHeight>760){
            gameWrappr.style.paddingTop="76%";
          }
        }
      }catch(e){
        console.log(e);
      }
    }

    try{
      if(document.getElementById('suggestyrotate')){
        document.getElementById('suggestyrotate').remove();
      }
    }catch(e){
      console.log(e);
    }
  }


  //
  // add new units on resize if needed
  // 
  try{
    if(!isFullscreen){
      var googleAdsResize=[];

      if(slot1===undefined&&windowWidth>600){
        slot1=googletag.defineSlot('/1786990/playpage', leaderboard_ad_sizes, 'div-gpt-ad-1702428160119-0').setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(googletag.pubads());
        googletag.display('div-gpt-ad-1702428160119-0');
        googleAdsResize.push(slot1);
      }

      if(slot2===undefined&&(windowWidth>1499||(windowWidth<1081&&windowWidth>810))){
        slot2=googletag.defineSlot('/1786990/lagged_sky', skyscaper_ad_sizes, 'div-gpt-ad-sky').setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(googletag.pubads());
        googletag.display('div-gpt-ad-sky');
        googleAdsResize.push(slot2);
      }
      if(slot3===undefined&&windowWidth>1080){
        slot3=googletag.defineSlot('/1786990/lagged_square', square_ad_sizes, 'div-gpt-ad-sqad').setTargeting("uc_bits", userClickBits).setTargeting("uc_type", [user_click_type]).setTargeting("campaign_id", [campaign_id]).addService(googletag.pubads());
        googletag.display('div-gpt-ad-sqad');
        googleAdsResize.push(slot3);
      }
      if(googleAdsResize.length>0){
        googletag.pubads().refresh(googleAdsResize);
      }
    }
  }catch(e){
    console.log(e);
  }
  
}


//
// game page scripts
//

//
// toggle game controls / menu / etc
//
var toggleGameControls=function(){
    var controlBtn=document.getElementById('controlsopens');
    if(document.getElementById('game-controls-popup')){
      document.getElementById('game-controls-popup').remove();
      if(controlBtn){
        controlBtn.className="game-controls-open";
      }
      return;
    }
  
    if(controlBtn){
      controlBtn.className="game-controls-open closeitnow";
    }
  
    var gameControlrs=document.createElement('div');
    gameControlrs.id="game-controls-popup";
    gameControlrs.className="whitebitbar";
  
  
  if(currentRating===2){
    gameControlrs.innerHTML+="<button onclick='likeGame(this,2);' id='likeitgame' class='cntrbtn likegame active'>Liked Game</button>";
  }else{
    gameControlrs.innerHTML+="<button onclick='likeGame(this,2);' id='likeitgame' class='cntrbtn likegame'>Like Game</button>";
  }
  if(currentRating===1){
    gameControlrs.innerHTML+="<button onclick='likeGame(this,1)' id='dislikeitgame' class='cntrbtn dislikegame active'></button>";
  }else{
    gameControlrs.innerHTML+="<button onclick='likeGame(this,1)' id='dislikeitgame' class='cntrbtn dislikegame'></button>";
  }
    gameControlrs.innerHTML+="<p class='smallft'>"+document.getElementById('gamedesc').cloneNode(true).innerHTML+"</p>";
  
    var controlWidth=96;
    if(gameInfo.hs>0&&gameInfo.awards>0){
      controlWidth=192;
    }else if(gameInfo.hs>0||gameInfo.awards>0){
      controlWidth=144;
    }
  
    gameControlrs.innerHTML+="<button onclick='goHomeFromButton();' class='cntrbtn gohome'></button>";
  
    var controlerWrap=document.createElement('div');
    controlerWrap.className="contr-btn-wrap";
    controlerWrap.style.width=controlWidth+"px";
    //if HS
    if(gameInfo.hs>0){
      controlerWrap.innerHTML+="<button onclick='openLeaderboards();' class='cntrbtn trophy'></button>";
    }
    //if achievements
    if(gameInfo.awards>0){
      controlerWrap.innerHTML+="<button onclick='openAwards();' class='cntrbtn awards'></button>";
    }
    controlerWrap.innerHTML+="<button onclick='toggleNight();' class='cntrbtn nightmode'></button>";
    controlerWrap.innerHTML+="<button onclick='fullScreenGame(true);' class='cntrbtn fullscreen'></button>";
    gameControlrs.appendChild(controlerWrap);
    
    //add to game wrapper
    document.getElementById('game-wrapper').appendChild(gameControlrs);

    try{
      gtag('event', 'user_ui_event', {
        'send_to': 'G-F16JC3ZS20',
        'type': 'game_controls',
      });
    }catch(e){
      console.log(e);
    }
  }

  var goHomeFromButton=function(){
    window.open("https://lagged.com/","_top");
  }
  
  var isFullscreen=false;
  var fullScreenGame=function(toggleControls){
    if(!isFullscreen){
      isFullscreen=true;
      if(document.getElementById('viddyyy')){
        document.getElementById('viddyyy').style.display="none";
      }
    }else{
      isFullscreen=false;
      if(document.getElementById('viddyyy')){
        document.getElementById('viddyyy').style.display="block";
      }
    }

    try{
      document.getElementById('game-wrapper').classList.toggle("isfullscreen");
    }catch(e){
      console.log(e);
    }

    if(toggleControls){
      toggleGameControls();
    }

    resizedw();

  }
  var isRating=false;
  var likeGame=function(element,rating,fromlog){
    if(fromlog&&currentRating===rating){
      return;
    }
    if(gameInfo.id<1||rating>2||rating<1){
      return true;
    }
    if(isRating){return}
    isRating=true;
  
    var ajaxrating=rating;
  
    if(rating===2){
      if(currentRating===1){
        currentRating=2;
        // remove 'active' from dislike  
        if(document.getElementById('dislikeitgame')){
          document.getElementById('dislikeitgame').classList.remove('active');
        }
        element.classList.add('active');
      }else if(currentRating===2){
        ajaxrating=4;
        currentRating=0;
        element.classList.remove('active');
        element.innerHTML="Like Game";
      }else{
        currentRating=2;
        element.classList.add('active');
      }
    }else{
      if(currentRating===2){
        currentRating=1;
     
        // remove 'active' from like  
        if(document.getElementById('likeitgame')){
          document.getElementById('likeitgame').classList.remove('active');
          document.getElementById('likeitgame').innerHTML="Like Game";
        }
  
        element.classList.add('active');
      }else if(currentRating===1){
        ajaxrating=3;
        currentRating=0;
        element.classList.remove('active');
      }else{
      currentRating=1;
      element.classList.add('active');
      }
    }
  
    var sendata={};
    sendata.rating=ajaxrating;
    sendata.gid=gameInfo.id;
  
    loginCallback=sendata;
  
    if(userid_ds<1){
        askLogin();
        isRating=false;
        return;
    }
  
    sendAjax(JSON.stringify(sendata), 'ajax_rating.php',  function(response){
      isRating=false;
      if(ajaxrating===2){
        element.innerHTML="Liked Game";
      }
      console.log(response);
    });
  }
  
  var showHSSaved=function(score){
    var gamePopup=document.createElement('div');
    gamePopup.className="gamepopright whitebitbar";
  
    if(score.data.login){
      gamePopup.onclick=function(){
        askLogin();
      }
      gamePopup.innerHTML="Your score did not saved. <a>Login to save high scores</a>";
    }else{
      gamePopup.onclick=function(){
        openLeaderboards();
      }
      gamePopup.innerHTML="Your best score of <b>"+numberWithCommas(score.data.utop.score)+"</b> is saved!";
    }
    
  
    var timeOuterTime=1;
    try{
      var all_popups = document.getElementsByClassName('gamepopright');
      if(all_popups&&all_popups.length>0){
        timeOuterTime=2000*all_popups.length;
      }
    }catch(e){
      console.log(e);
    }
  
    setTimeout(function(){
      document.getElementById('game-wrapper').appendChild(gamePopup);
      setTimeout(function(){
        fade(gamePopup);
      },2500);
    },timeOuterTime);
  }
  
  var showAwardSaved=function(awardData){
    //console.log("award saved: ", awardData);
  
    var gamePopup=document.createElement('div');
    gamePopup.className="gamepopright whitebitbar awards";
  
    if(!awardData.textdesc){
      if(awardData.acount>1){
        awardData.textdesc="You unlocked "+awardData.acount+" achievements";
      }else{
        awardData.textdesc="You unlocked an achievment!";
      }
    }
  
    if(userid_ds<1){
      gamePopup.onclick=function(){
        askLogin();
      }
      gamePopup.innerHTML="<p class='awardnametop'>"+awardData.name+"</p><p class='awardnamedesc'>"+awardData.textdesc+"</p><p><a>Login to save</a></p>";
    }else{
      gamePopup.onclick=function(){
        openAwards();
      }
      gamePopup.innerHTML="<p class='awardnametop'>"+awardData.name+"</p><p class='awardnamedesc'>"+awardData.textdesc+"</p><p>+"+awardData.points+"xp</p>";
    }
  
    var timeOuterTime=1;
    try{
      var all_popups = document.getElementsByClassName('gamepopright');
      if(all_popups&&all_popups.length>0){
        timeOuterTime=2500*all_popups.length;
      }
    }catch(e){
      console.log(e);
    }
    
    setTimeout(function(){
      document.getElementById('game-wrapper').appendChild(gamePopup);
      setTimeout(function(){
        fade(gamePopup);
      },5000);
    },timeOuterTime);
  }
  
  var buildWrapper=function(type){
    if(document.getElementById('games-popers')){
      document.getElementById('games-popers').remove();
    }
  
    var popWrapper=document.createElement('div');
    popWrapper.id="games-popers";
    popWrapper.className="ajax_search gamepops";
  
    var popWrapperModal=document.createElement('div');
    popWrapperModal.className="searchmodal";
    popWrapperModal.onclick=function(){
      try{
        popWrapper.remove();
      }catch(e){
        console.log(e);
      }
    }
    popWrapper.appendChild(popWrapperModal);
  
    var popWrapperClose=document.createElement('button');
    popWrapperClose.className="closesrcx";
    popWrapperClose.onclick=function(){
      try{
        popWrapper.remove();
      }catch(e){
        console.log(e);
      }
    }
    popWrapper.appendChild(popWrapperClose);
  
    var popWrapperPage=document.createElement('div');
    popWrapperPage.className="searchwrap";
  
    //
    // insert IFRAME here for awards / HS
    //
    if(type==1||type==2){
      var popIframe=document.createElement('iframe');
      popIframe.className="gamespop-iframe";
      if(type==1){
        var iframeLink="https://lagged.com/awards-pop/"+gameInfo.id+"/";
        popIframe.src=iframeLink;
      }else{
        var iframeLink="https://lagged.com/hs-pop-v2/"+gameInfo.id+"/";
        popIframe.src=iframeLink;
      }
      popWrapperPage.appendChild(popIframe);
      popWrapper.appendChild(popWrapperPage);
    }else{
      popWrapperPage.id="gamespop-loginform";
    }
    
    popWrapper.appendChild(popWrapperPage);
    document.body.appendChild(popWrapper);
  
    if(!type||type<1){
      buildLoginForms(false);
    }
  }
  
  
  
  var openAwards=function(){
    buildWrapper(1);

    try{
      gtag('event', 'user_ui_event', {
        'send_to': 'G-F16JC3ZS20',
        'type': 'awards',
      });
    }catch(e){
      console.log(e);
    }
  }
  var openLeaderboards=function(){
    buildWrapper(2);

    try{
      gtag('event', 'user_ui_event', {
        'send_to': 'G-F16JC3ZS20',
        'type': 'leaderboards',
      });
    }catch(e){
      console.log(e);
    }
  }
  
  var newLevel=function(info){
    //leave just for old API calls, not used currently
  }
  
  
  var loginCallback;
  var askLogin=function(){
    if(userid_ds>0){return;}
    buildWrapper(0);
  }
  
  var buildLoginForms=function(issignup){
    try{
      if(document.getElementById('lgnformwrp')){
        document.getElementById('lgnformwrp').remove();
      }
    }catch(e){
      console.log(e);
    }
  
    var loginFormsWrap=document.createElement('div');
    loginFormsWrap.className="poper-wrapper";
    loginFormsWrap.id="lgnformwrp";
  
    //
    //loginFormsWrap.innerHTML=" LOG IN FORM HTML ";
    //
    if(issignup){
      loginFormsWrap.innerHTML="<div class='titleWrap' style='margin-top:0'><h2>Create Account</h2></div><p class='smallft'>Already have an account? <a onclick='buildLoginForms(false)'>Login now</a></p>";
      loginFormsWrap.innerHTML+='<p class="smallft bg-caution signuppage"><b>All features are free!</b></p><ul style="width:calc(100% - 30px);float: left;clear: both;margin:0 0 10px 30px"><li style="padding:1px;list-style-type: disc;width:100%">Save achievements &amp; high scores</li><li style="padding:1px;list-style-type: disc;width:100%">Play multiplayer games like DrawThis2</li><li style="padding:1px;list-style-type: disc;width:100%">Save your progress online on any device</li><li style="padding:1px;list-style-type: disc;width:100%">Fewer advertisements!</li></ul><form id="loginit" onsubmit="submitLogin(event,true);return false;"><div class="form-group"><label form="inputEmail1">Your username</label><input type="text" name="username" id="inputEmail1" class="form-control" required placeholder="Username" autofocus></div><div class="form-group"><label form="inputEmail2">Your email address</label><input type="email" name="name" id="inputEmail2" class="form-control" required placeholder="Email"></div><div class="form-group"><label form="inputEmail3">Your password</label><input type="password" name="name" id="inputEmail3" class="form-control" required></div><button onclick="submitLogin(event,true);return false;" class="language-select" id="btnformload">Signup!</button></form>';
    }else{
      loginFormsWrap.innerHTML="<div class='titleWrap' style='margin-top:0'><h2>Login</h2></div><p class='smallft'>No account? <a onclick='buildLoginForms(true)'>Sign up for free &raquo;</a></p>";
      loginFormsWrap.innerHTML+='<form id="loginit" onsubmit="submitLogin(event,false);return false;"><div class="form-group"><label form="inputEmail2">Your email address</label><input type="email" name="name" id="inputEmail2" class="form-control" required placeholder="Email" autofocus></div><div class="form-group"><label form="inputEmail3">Your password</label><input type="password" name="name" id="inputEmail3" class="form-control" required></div><button class="language-select" id="btnformload" onclick="submitLogin(event,false);return false;">Login!</button></form>';
      loginFormsWrap.innerHTML+='<a href="https://lagged.com/help/password/" target="_blank">Forgot password?</a>';
    }
  
    document.getElementById('gamespop-loginform').appendChild(loginFormsWrap);
  
    try{
      gtag('event', 'user_ui_event', {
        'send_to': 'G-F16JC3ZS20',
        'type': 'login_signup',
      });
    }catch(e){
      console.log(e);
    }
  
  }
  
  var isSubmittingLogin=false;
  var submitLogin=function(event,isSignUp){
    event.preventDefault();
    if(isSubmittingLogin){return;}
    isSubmittingLogin=true;
  
    var nickname="";
    var email="";
    var password="";
    var errors=false;
    var errorMsg=[];
    var type="login";
  
  
    if(document.getElementById("errorsubmit")){
    document.getElementById("errorsubmit").remove();
    }
    if(document.getElementById('btnformload')){
      document.getElementById('btnformload').innerHTML="loading...";
    }
  
    if(isSignUp){
      type="signup";
      if(document.getElementById("inputEmail1")){
      nickname=document.getElementById("inputEmail1").value;
      }
      if(nickname.length<2||nickname.length>30){
      errors=true;
      errorMsg.push("Nickname must be between 2-30 characters");
      }
    }
  
    email=document.getElementById("inputEmail2").value;
    if(email.length<5){
    errors=true;
    errorMsg.push("Please enter a valid email address");
    }
    password=document.getElementById("inputEmail3").value;
    if(password.length<6||password.length>30){
    errors=true;
    errorMsg.push("Password must be between 6-30 characters");
    }
  
    if(!errors){
      var sendata={};
      sendata.ftype=type;
      sendata.fnickname=null;
      if(nickname){
      sendata.fnickname=encodeURIComponent(nickname.replace(/\"/g,'&quot;'));
      }
      sendata.femail=encodeURIComponent(email.replace(/\"/g,'&quot;'));
      sendata.fpass=encodeURIComponent(password.replace(/\"/g,'&quot;'));
      sendata.gid=gameInfo.id;
  
      sendAjax(JSON.stringify(sendata), 'ajax.php',  function(response){
  
        if(response.success===true&&response.uid>0){
        document.getElementById("btnformload").innerText="Success!";
      
        //get user profile from JSON
        showUserInfo(response);
      
        try{
          postMessage('login','*');
        }catch(e){
          console.log(e);
        }
      
        try{
          if(loginCallback){
            sendAjax(JSON.stringify(loginCallback), 'ajax_rating.php',  function(response){
              if(loginCallback.rating===2){
                element.innerHTML="Liked Game";
              }
              console.log(response);
            });
            loginCallback=null;
          }
        }catch(e){
          console.log(e);
        }
  
        fade(document.getElementById("games-popers"));
  
        }else{
  
          isSubmittingLogin=false;
          if(isSignUp){
            document.getElementById("btnformload").innerText="Signup!";
          }else{
            document.getElementById("btnformload").innerText="Login!";
          }
      
          //add errors to form
          var errorMsgDiv = document.createElement("div");
          errorMsgDiv.id="errorsubmit";
          errorMsgDiv.className="error_msg";
          var errorMsgDivTxt=document.createTextNode(response.errors);
          errorMsgDiv.appendChild(errorMsgDivTxt);
          document.getElementById("lgnformwrp").insertBefore( errorMsgDiv,document.getElementById("loginit"));
        }
      });
  
    }else{
      isSubmittingLogin=false;
      if(isSignUp){
        document.getElementById("btnformload").innerText="Signup!";
      }else{
        document.getElementById("btnformload").innerText="Login!";
      }
      
      //add errors to form
      var errorMsgDiv = document.createElement("div");
      errorMsgDiv.id="errorsubmit";
      errorMsgDiv.className="error_msg";
      var errorMsgDivTxt=document.createTextNode(errorMsg[0]);
      errorMsgDiv.appendChild(errorMsgDivTxt);
      document.getElementById("lgnformwrp").insertBefore( errorMsgDiv,document.getElementById("loginit"));
    }
  
    return false;
  }
  
  var sentGameJson=false;
  var startGameInit=function(){
  if(!sentGameJson){
    sentGameJson=true;
    sendAjax(gameInfo.id, 'gamejson.php',  function(userInfo){
      if(userInfo&&userInfo.user){
          showUserInfo(userInfo);
      }
      if(gameInfo.game){
        onContentResumeRequested();
      }

        //
        //2025 user stuff
        //
        // if(!isMobile&&userid_ds<1){
        // var user_banner=document.createElement('div');
        // user_banner.id="create_user_banner";
        // user_banner.onclick=function(){
        // buildWrapper(5);
        // buildLoginForms(true);
        // }
        // user_banner.innerHTML="<b>Create a free account</b> to save achievements &amp; game progress";
        // document.getElementById('game-wrapper').appendChild(user_banner);
        // }

    });
  }
}
  
var interShow=function(returnFunction){
  if(returnFunction){
    returnFunction();
  }
  try{
    if(campaign_id>0){
      var pubads=googletag.pubads();
      didClickbtn=true;
      try{
        googletag.destroySlots([gameManualInterstitialSlot]);
      }catch(e){
        console.log(e);
      }
      defineGameManualInterstitialSlot(pubads);
      googletag.display(gameManualInterstitialSlot);
    }
  }catch(e){
    console.log(e);
  }
}
  
  function disableButtons(){
    if(document.getElementById('mobilerightnew')){
      document.getElementById('mobilerightnew').className="";
    }
  }
  function enableButtons(skipBtnCheck){
    if(skipBtnCheck){return}
    if(document.getElementById('mobilerightnew')){
      document.getElementById('mobilerightnew').className="showmbtn";
    }
  }

var jsMoreGames={};

var showUserInfo=function(userInfo){

  try{
    username=userInfo.user.username;
    userid_ds=userInfo.user.id;
    if(userInfo.user.avatar){
      useravatar="https://lagged.com/images/avatars/"+userInfo.user.avatar;
    }
  }catch(e){
    console.log(e);
  }
  try{
    if(userInfo.urate>0){
      currentRating=userInfo.urate;
    }
  }catch(e){
    console.log(e);
  }

  if(userid_ds>0&&document.getElementById("create_user_banner")){
    document.getElementById("create_user_banner").remove();
  }

}
var showGameAfterAd=function(){
  interShow();
}

var viewPlaythrough=function(){
  if(gameInfo.video){
      window.open('https://lagged.com/watch/'+gameInfo.video,'_blank');
  }else{
    window.open('https://lagged.com/','_blank');
  }
}

function findCampaign(channel){
  for(var i=0;i<adChannels.length;i++){
    if(adChannels[i].campaign==channel){
      return adChannels[i];
    }
  }
  }
  
  // function findCreative(channel){
  // for(var i=0;i<creativeChannels.length;i++){
  //   if(creativeChannels[i].creative==channel){
  //     return creativeChannels[i];
  //   }
  // }
  // }
  
  function setCustomChannes(campaign_id){
  try{
    var channelFind=findCampaign(campaign_id);
    if(channelFind&&channelFind.channel&&channelFind.host){
      customChannelUse=channelFind.channel;
      customHostChannel=channelFind.host;
    }
  }catch(e){
    console.log(e);
  }
  }
  
  // function setCreativeChannel(creative_id){
  // try{
  //   var channelFindAdCreatuve=findCreative(creative_id);
  //   if(channelFindAdCreatuve&&channelFindAdCreatuve.channel){
  //     customCreativeChannelUse=channelFindAdCreatuve.channel;
  //   }
  // }catch(e){
  //   console.log(e);
  // }
  // }

  //set Adsense custom channels if needed
if(campaign_id>0){
  setCustomChannes(campaign_id);
}

try{
  if(gameInfo&&gameInfo.id){
    var remarkID="DR_"+gameInfo.id;
    gtag('event','view_item', {
      'send_to': 'AW-1055364430',
      'value': 0,
      'items':[{
      'id':remarkID,
      'google_business_vertical': 'custom',
      }]
    });
  }
}catch(e){
  console.log(e);
}
