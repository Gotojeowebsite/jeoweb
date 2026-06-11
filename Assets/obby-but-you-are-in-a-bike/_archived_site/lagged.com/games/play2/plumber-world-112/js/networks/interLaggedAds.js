;(function(){
	var delayOnFail_timer = [10,30,60,300,600];
	var delayOnFail_actualTimer = 0;
	var delayOnFail_timerInter;
	
	var isAdAvailable = false;
	var network = {};
	network.name = "laggedAds";
	network.callback = {
		load:undefined,
		close:undefined
	};
	
	eventToFire.registerEvent("deviceready",
		function(){
			eventToFire.fireEvent("adNetwork_Inter", network);
		}, false
	);
	
	eventToFire.registerEvent("prepareAds",function(){
		isAdAvailable = false;
	});
	
	network.isReady = function(eventName){
		return (parseInt("1") || 0);
	}
	
	network.isInterReady = function(){
		return isAdAvailable;
	}
	
	network.launchInter = function(){
		if(!this.isReady()){return false;}
		if(!this.isInterReady()){return false;}
		isAdAvailable = false;
		laggedAds.interstitial.show();
		return true;
		
	}
	
	function closedInter(){
		if(typeof(network.callback.close) != 'undefined') network.callback.close();
		delayOnFail_actualTimer = 0;
		clearInterval(delayOnFail_timerInter);
		laggedAds.interstitial.load();
	}
	
	function loadFail(){
		if(typeof(network.callback.close) != 'undefined') network.callback.close();
		delayOnFail_timerInter = setTimeout(
			function(){
				laggedAds.interstitial.load();
			},
			delayOnFail_timer[delayOnFail_actualTimer]*1000
		);
		delayOnFail_actualTimer = Math.min(delayOnFail_actualTimer+1, delayOnFail_timer.length-1);
	}

	//-----------------------------------------------------------------
	
	eventToFire.registerEvent("lagged.interstitial.load", (e) => {
		isAdAvailable = true;
		if(typeof(network.callback.load) != 'undefined') network.callback.load();
	});
	
	eventToFire.registerEvent("lagged.interstitial.loadfail", (e) => {
		loadFail();
	});
	
	eventToFire.registerEvent("lagged.interstitial.show", (e) => {
	});
	
	eventToFire.registerEvent("lagged.interstitial.dismiss", (e) => {
		closedInter();
	});
		
}());
		