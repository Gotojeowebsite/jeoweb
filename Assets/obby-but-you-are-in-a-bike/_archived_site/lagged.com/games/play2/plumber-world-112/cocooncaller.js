//v5.1 (Kindle friendly)
var _gameConfig="nothingToLoad";
var _pub_loaded = false;
var _MG_loaded = false;
var _gamename = "unnamedgame";	//Code name of the game
var _clientID = -1;
var _platform = "";



function getConfigDatas(){
	return _gameConfig;
}

function loadConfig(){
	var client = new XMLHttpRequest();
	client.onreadystatechange = function(data)	{
	
												if(client.readyState == 4 
												&& client.status == 200){
													//alert(client.responseText);
													_gameConfig = client.responseText;
													//alert(responseText);
												}
											}
	client.open("GET", "//games.playtouch.net/games-config/loadGameConfig.php?gamename="+_gamename+"&clientID="+_clientID+"&platform="+_platform, true);
	client.send();
	//alert('send');
}



 if(navigator.userAgent.toLowerCase().indexOf("android") != -1){
	_platform = "Android";
}else if(navigator.userAgent.toLowerCase().indexOf("ipad") != -1){
	_platform = "iPad";
}else if(navigator.userAgent.toLowerCase().indexOf("iphone") != -1){
	_platform = "iPhone";
}else if(navigator.userAgent.toLowerCase().indexOf("ipod") != -1){
	_platform = "iOS";
}else if(navigator.userAgent.toLowerCase().indexOf("silk") != -1 || navigator.userAgent.toLowerCase().indexOf("kindle") != -1 || navigator.userAgent.toLowerCase().indexOf("kfjw") != -1 || navigator.userAgent.toLowerCase().indexOf("kftt") != -1 || navigator.userAgent.toLowerCase().indexOf("kfot") != -1){
	_platform = "Kindle";
}else{
	_platform = "unknow";
}

function setGameName(gname, clientID, forcePlatform){
	forcePlatform = forcePlatform || false;
	if(forcePlatform && forcePlatform != ""){
		_platform = forcePlatform;
	}
	_gamename = gname;
	_clientID = clientID;
	loadConfig();
	//alert(_platform);
}

function showWV(){

	if(!_pub_loaded){
		loadWV();
	}
	if (typeof (CocoonJS) !== 'undefined'){
		CocoonJS.App.showTheWebView(0, 0, window.innerWidth, window.innerHeight);
	}

}

function showMG(){
	//alert("ok");
	window.location = "//games.playtouch.net/ad/moregame/nococoon.php?device="+_platform+"&gamename="+_gamename;
	//window.open("//ks388498.kimsufi.com/ad/applift/nococoon.php?device="+ _platform);
	//CocoonJS.App.forwardAsync("showmoregames();");
	//CocoonJS.App.forwardAsync("CocoonJS.App.disableTouchInCocoonJS();");
	//CocoonJS.App.showTheWebView(0, 0, window.innerWidth, window.innerHeight);
}

function hideMG(){
	if (typeof (CocoonJS) !== 'undefined'){
		//CocoonJS.App.forwardAsync("CocoonJS.App.enableTouchInCocoonJS();");
		//window.ext.IDTK_APP.makeCall("enableTouchLayer", "CocoonJSView");
	}
}

function loadWV(){
	if (typeof (CocoonJS) !== 'undefined'){
		CocoonJS.App.loadInTheWebView("//games.playtouch.net/ad/moregame/cocoon-test.php?device="+_platform+"&gamename="+_gamename+"&iscocoon=true");
		//CocoonJS.App.loadInTheWebView("webview.html");
		CocoonJS.App.onLoadInTheWebViewSucceed.addEventListener(function(pageURL) {
			_pub_loaded = true;
			_MG_loaded = false;
			showWV();
		});
	}else{
		//showMG();
	}
}


function windowOpen(url){
	//WORKING
	CocoonJS.App.forward("ext.IDTK_APP.makeCall('openURL' , " + url + " );");
	
	
	//CocoonJS.App.showTheWebView();
	//CocoonJS.App.forward("CocoonJS.App.show(0, 0, " + window.innerWidth/2 + "," + window.innerHeight + ");");
}

//uncomment to load webview
function startOnline(){
	loadWV();
	//alert(_platform);
}
function startOffline(){
	//alert("offline");
	if(_platform != "Android" && _platform != "Kindle"){
		//alert("forced IOS");
		startOnline();
	}
	CocoonJS.App.hideTheWebView();
}

function sendAnalytics(gamename, clientID, type, todo, value){
	//alert('a');
	var ajaxAnalytics = new XMLHttpRequest();
	//alert('b');
	ajaxAnalytics.onreadystatechange = function(data)	{
												if(data.readyState == 4 
												&& data.status == 200){
													//alert(data.responseText);
													//_gameConfig = data.responseText;
													//alert(responseText);
												}
											}
	//alert("//games.playtouch.net/games-config/gameAnalytics.php?gamename="+_gamename+"&clientID="+clientID+"&type="+type+"&value="+value+"&todo="+todo);
	ajaxAnalytics.open("GET", "//games.playtouch.net/games-config/gameAnalytics.php?gamename="+gamename+"&clientID="+clientID+"&type="+type+"&value="+value+"&todo="+todo+"&platform="+_platform, true);
	ajaxAnalytics.send();
}
//sendAnalytics("forestJump", 22, "nbLvlPlayed", "add", 1);