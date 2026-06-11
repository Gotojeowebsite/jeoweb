eventToFire.registerEvent('deviceready', function() {
	//check
	var activateInterstitial = parseInt("1") || 0;
	var activateRewardedVideo = parseInt("0") || 0;
	var activateBanner = parseInt("0") || 0;

	eventToFire.registerEvent("prepareAds",function(){
		// inter
		if(activateInterstitial){
			laggedAds.interstitial.init().load();
		}
		// rewarded
		if(activateRewardedVideo){
			laggedAds.rewardvideo.init().load();
		}
		if(activateBanner){
			// not exist
			// laggedAds.banner.init({}).load();
		}
	});
}, false);
