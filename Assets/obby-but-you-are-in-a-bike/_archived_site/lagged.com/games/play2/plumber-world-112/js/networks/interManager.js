;(function(){
var prerollIsLaunched = false;
var timeMinBetweenPub = 0;
window.countGameBeforePub = parseInt("0") || 0 ;
autoSet("countGameBeforePub",parseInt(autoGet("countGameBeforePub",0)));
var intervalTimer = setInterval(function(){timer++;},1000);
var removeAds = false;
window.timer = timeMinBetweenPub;
window.saveAdNb=0;

window.allNetworks_inter = [];
eventToFire.registerEvent("adNetwork_Inter",function(network){
	allNetworks_inter.push(network);
	network.callback.close = interClosed;
	network.callback.load = interLoaded;
});

eventToFire.registerEvent("deviceready", function() {
	setStorage("nbTimeLaunched",getStorage("nbTimeLaunched",true)+1);
	if(getStorage("dateMsFirstLaunch",true) == 0){
		setStorage("dateMsFirstLaunch",Date.now());
	}
	preparePreroll();
});

////////////////////////////////
function interClosed(){
	cordovaSetPauseConstruct(false);
	if(typeof(setAutoShareEnabled) != 'undefined') setAutoShareEnabled(true);
	hideLoadingScreen();
}

function interLoaded(){}
////////////////////

function isReady(){
	var ret = false;
	if(allNetworks_inter.length > 0 && typeof(navigator.connection) != "undefined" && navigator.connection.type != "none"){
		for(var i in allNetworks_inter){
			if(typeof(allNetworks_inter[i].isReady) == "function" && allNetworks_inter[i].isReady()){
				ret = true;
				break;
			}
		}
	}
	return ret;
}

function isInterReady(){
	var ret=false;
	if(removeAds) return ret;
	for(var i in allNetworks_inter){
		if(typeof(allNetworks_inter[i].isInterReady) == "function"){
			if(allNetworks_inter[i].isInterReady()){
				ret = true;
				break;
			}
		}
	}
	return ret;
}

function launchInter(){
	if(removeAds) return false;
	
	var availablesNetworks = [];
	for(var i in allNetworks_inter){
		if(typeof(allNetworks_inter[i].isInterReady) == "function"){
			if(allNetworks_inter[i].isInterReady()){
				availablesNetworks.push(allNetworks_inter[i]);
			}
		}
	}

	if(availablesNetworks.length != 0){
		cordovaSetPauseConstruct(true);
		if(typeof(setAutoShareEnabled) != 'undefined') setAutoShareEnabled(false);
		showLoadingScreen();
		window.timer = 0;

		var choosenNetwork = availablesNetworks[getRandomInt(0, availablesNetworks.length - 1)];
		console.log("inter","Choose", choosenNetwork.name,choosenNetwork, "from", availablesNetworks);
		if(!choosenNetwork.launchInter()){
			interClosed();
			return false;
		}
		return true;
	}
	return false;
}

/*
*	c2LayoutChange(state,name)     : called on construct when layout change
*
*	string state : "in" when enter on the layout, "out" when left the layout
*	string name : name of the layout
*/
var PREROLL_ACTIVE = !!parseInt("1");
var PREROLL_WAIT_USER_ACTION = !!parseInt("1");
 
var lastLayout = "Loading";
eventToFire.registerEvent("c2LayoutChange",
	function (args){
		var state = args.state;
		var name = args.name;
		var obj = args.obj;

		switch(name) {
			case "Splash":
				if(state == "in" && !prerollIsLaunched && PREROLL_ACTIVE && !PREROLL_WAIT_USER_ACTION) {
					prerollIsLaunched = true;
					launchInter();
				}
				if(state == "out"){prerollIsLaunched = true;}//to late for launch preroll
			break;
			case "GameOver":
				if(state == "in"){
					setTimeout(checkLaunchInter,100);
				}
			break;
		}
		lastLayout = name;
	}
);

function preparePreroll() {
	if(!PREROLL_ACTIVE || !PREROLL_WAIT_USER_ACTION){return;}
	$(window).click((e)=>{
		if(!prerollIsLaunched && launchInter()){
			prerollIsLaunched = true;
		}
	})
}

function checkLaunchInter(){
	if(window.saveAdNb>0){ //do not display an ad
		window.saveAdNb=0;
	}else{
		if(timer > timeMinBetweenPub && parseInt(autoGet("countGameBeforePub")) >= window.countGameBeforePub){
			launchInter();
		}
	}
	autoSet("countGameBeforePub",parseInt(autoGet("countGameBeforePub",0))+1);
}

eventToFire.registerEvent("remove_all_ads",function(state){
	removeAds = state;
});

//---------------------------UTILS-------------------------------------------------------------

function cordovaSetPauseConstruct(bool){
	if(typeof(cr_setSuspended) != "undefined") {
		cr_setSuspended(bool);
	}	
}

function getRandomInt(min, max) { //include include
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

window.getTimeLaunched = function(){
	var nb = getStorage("nbTimeLaunched",true);
	return nb;
}

window.getInstalledSince = function(){
	//return day
	var tOld = getStorage("dateMsFirstLaunch",true);
	var tNow = Date.now();
	var nb = Math.floor((tNow-tOld)/1000/60/60/24); //ms/seconds/minutes/hours/day
	return nb;
}

window.getStorage = function(id,retInt){
	return ((!retInt)?getLocalStorageItem(id):(parseInt(getLocalStorageItem(id)) || 0));
}

window.setStorage = function(id,nb){
	setLocalStorageItem(id, nb);
}


//---------------------------GAME SPECIFIC-----------------------------------------
window._weddingDressUp_onNextStep = function(){
	if(timer > timeMinBetweenPub){
		launchInter();
	}
}

window._becomeAFashionDesigner_onNextStep = function(){
	if(timer > timeMinBetweenPub){
		launchInter();
	}
}

}());