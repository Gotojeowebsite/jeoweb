var wg_adContainer = ".wgAdsContainer{ overflow:hidden; }";
var wg_loadingSpinner = ".loadingMarkerContainer{position:fixed; top:50%; left:50%;margin-top:-25px !important;margin-left:-25px !important;} .loadingMarkerContainer {margin: 60px auto;font-size: 5px;text-indent: -9999em;border-top: 5px solid rgba(0, 0, 0, 0.4);border-right: 5px solid rgba(0, 0, 0, 0.4);border-bottom: 5px solid rgba(0, 0, 0, 0.4);border-left: 5px solid #ffffff;-webkit-transform: translateZ(0);-ms-transform: translateZ(0);transform: translateZ(0);-webkit-animation: load8 1.1s infinite linear;animation: load8 1.1s infinite linear !important;}.loadingMarkerContainer,.loadingMarkerContainer:after {border-radius: 50%; width: 50px; height: 50px;} @-webkit-keyframes load8 {0% {  -webkit-transform: rotate(0deg);  transform: rotate(0deg);}100% {  -webkit-transform: rotate(360deg);  transform: rotate(360deg);}}@keyframes load8 {0% {  -webkit-transform: rotate(0deg);  transform: rotate(0deg);}100% {  -webkit-transform: rotate(360deg);  transform: rotate(360deg);}}";
var wg_timeremainigcontainer = ".adTimeRemainingContainer{ width:100%; text-align:center !important; position:relative!important; padding-top:10px;font-family:Arial;color:#fff;} .adMessageContainer{font-size: 14px!important; font-family:Arial;color:#fff;}";
var wg_playNowButton = ".playNowButton{cursor:pointer; display:inline-block; position:absolute; top:50%; left:50%; margin-left:-115px; margin-top:-24px;width:200px; padding:10px; border-radius:5px; border:5px solid #fff; color:#000; background:yellow; text-align:center; font-family:Arial; font-weight:600;}.playNowButton:hover{  box-shadow: 0px 0px 10px #888888; transition:.3s;}";
var wg_splash_css = ".WGPSplash,.WGPSplash:before{position:absolute}.WGPSplash,.WGPSplash:before,.WGPSplash>div{width:100%;height:100%;}.WGPSplash:before{content:' ';top:0;left:0;background:url() no-repeat;-webkit-filter:blur(45px);-moz-filter:blur(45px);-o-filter:blur(45px);-ms-filter:blur(45px);filter:blur(45px);background-size:cover}.WGPSplash>div{padding:130px 0;box-sizing:border-box;text-align:center}.wg-action-button{display:inline-block;background:#99c506;background:-webkit-linear-gradient(#aed409,#77952b);background:-o-linear-gradient(#aed409,#77952b);background:-moz-linear-gradient(#aed409,#77952b);background:linear-gradient(#aed409,#77952b);padding:10px 20px;border-radius:10px;border:3px solid #fff;color:#fff;text-decoration:none;font-size:20px;font-weight:900;text-transform:uppercase;position:relative;bottom:0;white-space:nowrap;margin-bottom:-30px;left:-50%;cursor:pointer;text-shadow:1px 1px #505050;transition:all .2s}.wg-action-button:after{content:\"\\00bb\";position:absolute;opacity:0;right:5px;transition:.5s}.wg-action-button:hover{text-decoration:none;color:#fff;padding-right:35px;background-color:#3e8e41;background:-webkit-linear-gradient(#87ae00,#77952b);background:-o-linear-gradient(#87ae00,#77952b);background:-moz-linear-gradient(#87ae00,#77952b);background:linear-gradient(#87ae00,#77952b)}.wg-action-button:hover:after{opacity:1;right:15px}.wg-action-button:active{background-color:#3e8e41;box-shadow:0 2px #666;transform:translateY(2px) translateX(1px)}.WGPSplash .wg-splash-title{font-size:23px;font-weight:700;color:#fff;padding:10px;margin-top:70px;text-align:center;position:relative;text-shadow:1px 1px #505050;background:-moz-linear-gradient(left,rgba(30,87,153,0) 0,rgba(0,0,0,.3) 50%,rgba(125,185,232,0) 100%);background:-webkit-linear-gradient(left,rgba(30,87,153,0) 0,rgba(0,0,0,.3) 50%,rgba(125,185,232,0) 100%);background:linear-gradient(to right,rgba(30,87,153,0) 0,rgba(0,0,0,.3) 50%,rgba(125,185,232,0) 100%);filter:progid:DXImageTransform.Microsoft.gradient( startColorstr='#001e5799', endColorstr='#007db9e8', GradientType=1 )}.WGPSplash .wg-splash-thumb{cursor:pointer;width:190px;height:190px;display:inline-block;background-size:contain;background-position:center center;background-repeat:no-repeat;border-radius:50%;border:5px solid #fff;position:relative;box-shadow:4px 2px 30px #505050}.wg-splash-button-bolder{position:absolute;left:50%;margin-top:-20px}";


/*
window['wgGameContainerID'] = "#loader";
document.addEventListener( 'wgSdkReady', e=>{
    let playButton = document.querySelector( "#playGame" );
  	
  	if( playButton ){
  	  
      let newPlayButton = playButton.cloneNode(true);
      
      newPlayButton.addEventListener( 'click', e=>{
          window[preroll.config.loaderObjectName].fetchAd( ()=>{
              //console.log( "Ad is now finished, you can safely start/load the game." );
              try{
                  removeWG();
              }catch(e){
                  console.warn( "Can not start game after ad, please check." );
              }
          });        
      });
      
      playButton.replaceWith( newPlayButton );
    }
});
*/

var preroll = {get config(){ var defaultValues = {
	
	fs: typeof WgFlashEmulator !== "undefined" || typeof WgFlashSuggestions !== "undefined" ? false : true,
	fe: typeof WgFlashEmulator !== "undefined"  ? WgFlashEmulator : false, //flash emulator
	otherGames: {
		file:typeof WgFlashSuggestions !== "undefined" ? WgFlashSuggestions : 'https://st.wgplayer.com/snokido.com/wgFlashSuggestions.json',
		title:typeof WgFlashSuggestionsTitle !== "undefined" ? WgFlashSuggestionsTitle : null,
		message:typeof WgFlashSuggestionsMessage !== "undefined" ? WgFlashSuggestionsMessage : null,
	},

	//cmp:false,
	autoplay: window['wgSplashPreroll'] === false ? false : true,
	autoInit: true,
	absolutePositioning: false, //true is position adsContainer as first child of body, false replace content with adsContainer
	containerPosition: "relative",
	forceHtml5:true,
	noAd: typeof wgNoAfg === "undefined" ? false : wgNoAfg,
	minWidth:"100%",
	minHeight:"100%",
	fitParent:false,
	autoCollapseTimeout:20,
	learnMoreButtonInterval:5000000000,
	loaderObjectName:"wgAfgLoader", //the name of the ads loader object
	preAfgCallback:"preAfgCallback",
	removeAdsCallback: "removeAdHTML5FLASH", //callback to remove ads and show content
	adMessage:"The game will continue in a few moments.",
	background:"rgba(0, 0, 0, 0.8)",
	//contentContainerQuery:"", //if the game container can not be identified via class or id uery is used
	contentContainer:( typeof wgGameContainerID !== "undefined" ? wgGameContainerID : "#game" ), //the id of the container containing the game <div id="dummy-div" style="height:100%;"></div>
	customStyles: wg_adContainer +  wg_timeremainigcontainer + wg_loadingSpinner + wg_playNowButton + wg_splash_css, // combine values defined above preroll config object
	//midrollContainer: "#THEMIDROLLCONTAINER#",
	launchEvent:"fast", //fast or lazy
	triggerElem: null,

	mainClassName:"WGP1M1ST1PK1MP1",
    trl:true,
    trnl:true,
	am:typeof wgAutoMidroll === "undefined" ? true : wgAutoMidroll,
	ma:typeof wgPrerollAdsLimit === "undefined" ? 2 : wgPrerollAdsLimit,
	lastad:false,
	

	//customParamsPre:"",
	//customParamsMid:"",
	preAdLoadingTime:0,
	postAdLoadingTime:0,

	pd:false,
	waitForClickPre: window['wgSplashPreroll'] === false ? false : true,
	waitForClickMid:true,

	disableAdBlock:{
		//container:"", //if different from game container
		level:"block",
		freePlayTime:30,
		enableFreePlay:true,
		playButtonText:"Play game for 30 seconds",
		message:"Please disable AdBlock to play this game and refresh the page.",
		position:"overlay" //overlay, bottom, top
	},	
	
	waitForFlash:100,

	adEventCallback:"adEventCallback",
	midrollCallback:"midrollCallback",


	forceCallback:true,
	noloading:true,

	dockTitleAndButton:true,
	scaleSplash:false,

	//flashTags:"",
	flashIcon:"//st.wgplayer.com/no_flash.gif",
	flashButtonText:"Allow flash",
	flashTitle:"Click allow flash to play this game",
	isFlashGame:( typeof wgIsFlashGame !== "undefined" ? wgIsFlashGame : null ),


	titleExtract:"-,2,left",
	gameThumbnail: getMediaPath(( typeof wgGameThumbnail !== "undefined" ? wgGameThumbnail : ( document.querySelectorAll('[property="og:image"]').length > 0  ? document.querySelectorAll('[property="og:image"]')[0].content : 'https://st.wgplayer.com/afg_bkg.jpg' ))),
	gameBackground: getMediaPath(( typeof wgGameBkgImage !== "undefined" ? wgGameBkgImage : ( document.querySelectorAll('[property="og:image"]').length > 0  ? document.querySelectorAll('[property="og:image"]')[0].content : 'https://st.wgplayer.com/nologo.jpg' ))),
	gameName:( typeof wgGameName !== "undefined" ? wgGameName : ( document.querySelectorAll('[property="og:title"]').length > 0  ? document.querySelectorAll('[property="og:title"]')[0].content : (  document.title ? document.title : '' ) )  ),
	playGameText:( typeof wgGamePlayText !== "undefined" ? wgGamePlayText : "Play game" ),
	continueGameText:( typeof wgGameContinueText !== "undefined" ? wgGameContinueText : "Continue game" ),

	extraHtmml: ( typeof wgCustomSplash === "undefined" ? '<style>.WGPSplash:before{background-image: url(##GAME-BACKGROUND##);}</style><div id="splash-pre"><div class="WGPSplash"><div><div class="wg-splash-thumb" style="background-image: url(##GAME-THUNBMAIL##);" style="visibility: visible"></div><div class="wg-splash-button-bolder"><a class="wg-action-button" id="pre-splash-btn">##PLAY##</a></div><div class="wg-splash-title">##GAME-NAME##</div></div></div></div><div id="splash-mid"><div class="WGPSplash"><div><div class="wg-splash-thumb" style="background-image: url(##GAME-THUNBMAIL##);"></div><div class="wg-splash-button-bolder"><span class="wg-action-button" id="mid-splash-btn">##CONTINUE##</span></div><div class="wg-splash-title">##GAME-NAME##</div></div></div></div>' : ''),

	/*
	poster:{
		pre:"",
		mid:"",
		cont:""
	},
	*/

	/*
	playButton:{
		pre:( typeof wgGamePlayText !== "undefined" ? wgGamePlayText : "Play game" ),
		mid:( typeof wgGameContinueText !== "undefined" ? wgGameContinueText : "Continue game" ),
		cont:( typeof wgGameStartingText !== "undefined" ? wgGameStartingText : "Game is starting" )
	},
	*/


	splash:{
		pre:{
			splash:( typeof wgCustomSplash !== "undefined" && typeof wgCustomSplash.preSplash !== "undefined" ? wgCustomSplash.preSplash : "splash-pre"),
			trigger:( typeof wgCustomSplash !== "undefined" && typeof wgCustomSplash.preSplashButton !== "undefined" ? wgCustomSplash.preSplashButton : "pre-splash-btn"),
		},
		mid:{
			splash:( typeof wgCustomSplash !== "undefined" && typeof wgCustomSplash.midSplash !== "undefined" ? wgCustomSplash.midSplash : "splash-mid"),
			trigger:( typeof wgCustomSplash !== "undefined" && typeof wgCustomSplash.midSplashButton !== "undefined" ? wgCustomSplash.midSplashButton : "mid-splash-btn"),
		}
	},


	adxh5:{
		position:window['H5POSITION'] || "before", //begin, before, after, end
		pointer:window['H5POINTER'] || 'WGAFGPRE',
		tag:"/1002212/WGH5/Snokido.com"
	},


	/*
	adxh5:{
		tag:"/1002212/WGH5/Snokido.com"
	},
	*/	 
	
	interstitial:{
		tag:'/1002212/snokido.com-WGD-Interstitial'
	},
	
	/*adTagURL:['http://googleads.g.doubleclick.net/pagead/ads?ad_type=image_flash&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.youtube.com&max_ad_duration=40000&adtest=on'],*/
	adTagURL_old_2:[
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/Snokido.com-PreC&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/Snokido.com-Pre2C&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
	],
	adTagURL:[
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR1/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR4/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR5/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR3/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR6/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',	
		'//pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/1002212/WGAFGPRE/snokido.com-2&description_url=snokido.com&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&npa=0',
		'//pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/1002212/WGAFGPRE2/snokido.com-2&description_url=snokido.com&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&npa=0',
		'//pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/1002212/WGAFGPRE3/snokido.com&description_url=snokido.com&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&npa=0'		
	],

	adTagURL_21_10:[
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR1/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR4/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR5/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR3/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR6/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',		
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/Snokido.com-PreC&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/Snokido.com-Pre2C&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/1002212/WGAFGPRE3/snokido.com&description_url=snokido.com&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1'
	],
	
	adTagURL_latest:[
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR1/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR4/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR5/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR3/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/ADX-AFG-SQPR6/snokido.com&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',		
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/WGAFGPRE/Snokido.com-2&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?iu=/1002212/WGAFGPRE2/Snokido.com-2&description_url=snokido.com&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=1x1&unviewed_position_start=1',
		'//pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/1002212/WGAFGPRE3/snokido.com&description_url=snokido.com&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1'
	],
	
	/*
	midrollAdTagURL:[
		'//pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/1002212/WGAFGMID/snokido.com&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&hl=' + ( navigator.language || navigator.userLanguage) + '&url='+ encodeURIComponent( window.location.href ) +'&description_url='+ encodeURIComponent( window.location.href ) + '&corelator='+Math.floor(Math.random()*10000000),
		'//pubads.g.doubleclick.net/gampad/ads?sz=1x1&iu=/1002212/snokido.com-AFG-Midroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&hl=' + ( navigator.language || navigator.userLanguage) + '&url='+ encodeURIComponent( window.location.href ) +'&description_url='+ encodeURIComponent( window.location.href ) + '&corelator='+Math.floor(Math.random()*10000000),
	],
	*/

 }; var customValues = this.getCustom(); for( var item in customValues ){defaultValues[item] = customValues[item];} return defaultValues;},set config( v ){for( var item in v ){this.custom[item] = v[item];}},getCustom: function(){return this.custom;},custom:{}};

function removeAdHTML5FLASH() {
	console.debug( "After preroll callback." );
}

function adEventCallback( ev, type ){
	console.debug( "Ad event" + ( type ? '[' + type + ']' : '' ) + ": ", ev );
}
function midrollCallback(){
	console.debug( "After midroll callback." );
}

function getMediaPath( mediaUrl ){
	if( mediaUrl.indexOf( '://' ) > -1 ){
		return mediaUrl;
	}else{
		return window.location.protocol + "//" + window.location.host + mediaUrl;
	}
}

if( typeof wgplayer !== "undefined" && typeof wgplayer.afg !== "undefined" ){
	(function(preroll, wgplayer){ preroll.config = wgplayer.afg; })(preroll, wgplayer);
}
