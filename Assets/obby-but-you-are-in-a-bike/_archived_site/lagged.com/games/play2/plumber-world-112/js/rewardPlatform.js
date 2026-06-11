;(function(){

eventToFire.registerEvent("reward_grant",function(productId,quantity,productStringified){
	var product = JSON.parse(productStringified);
	var currencyType = ""; //"premium.gold" or "normal.gold"

	var currencyToGive = []
	try{
		if(productId.startsWith("coinspack")){
			currencyToGive.push({currencyType:"normal.gold",quantity:(productId.split("_")[1])})
		}else if(productId.startsWith("diamondspack")){
			currencyToGive.push({currencyType:"premium.gold",quantity:(productId.split("_")[1])})
		}else if(productId.startsWith("gemspack")){
			return;//gem not handle for the moment
		}else if(productId.startsWith("coinsdiamspack")){
			currencyToGive.push({currencyType:"normal.gold",quantity:(productId.split("_")[1])})
			currencyToGive.push({currencyType:"premium.gold",quantity:(productId.split("_")[2])})
		}else if(productId.startsWith("coinsgemspack")){
			return;//gem not handle for the moment
		}else if(productId.startsWith("diamsgemspack")){
			return;//gem not handle for the moment
		}else{
			return;//not handle by platform
		}
	}catch(e){
		return;
	}

	for (var i = 0; i < currencyToGive.length; i++) {
		if(typeof(currencyToGive[i].quantity) == "undefined"){continue;}
		var cReturn = c2_callFunction("onMoneyReceived",[currencyToGive[i].currencyType,currencyToGive[i].quantity]);
		if(cReturn == 0 || cReturn == "0"){
			if(!onMoneyReceived_platform(currencyToGive[i].currencyType,currencyToGive[i].quantity)){
				return;//something as fail on give
			}
		}
		eventToFire.fireEvent("reward_consume",productStringified);
	};
});

window.onMoneyReceived_platform = function(currencyType,quantity){
	var gameName = "";
	try{
		if(c2_callFunction("getGameInfo") != 0){
			gameName = JSON.parse(c2_callFunction("getGameInfo")).gameName;
		}else if(typeof(_gamename) != "undefined" && _gamename != "unnamedgame"){
			gameName = _gamename;
		}else{
			return false;
		}
		var stash = autoGet(gameName+"Stash","");
		if(stash != ""){
			stash = JSON.parse(stash);
			var currencyArray = currencyType.split(".");
			stash["stash"]["money"][currencyArray[0]][currencyArray[1]] = parseFloat(quantity) + parseFloat(stash["stash"]["money"][currencyArray[0]][currencyArray[1]]);
		}else{
			return false;//no stash found
		}

	}catch(e){
		console.log("onMoneyReceived_platform: FAIL",e);
		return false; // if something fail
	}

	autoSet(gameName+"Stash",JSON.stringify(stash));
	c2_callFunction("loadSavedStashOrDefaultAfterLoadShopManager");
	c2_callFunction("updateShopGUI");

	return true;
}

})();
