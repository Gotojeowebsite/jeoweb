;(function(){

window.allNetworks = [];

eventToFire.registerEvent("adNetwork",function(network){
	allNetworks.push(network);
});


window.isIVAvailable = function(C2Callback){
	var isAvailable = "0";
	if(window.allNetworks.length > 0 && typeof(navigator.connection) != "undefined" && navigator.connection.type != "none"){
		for(var i in allNetworks){
			if(allNetworks[i].isReady()){
				isAvailable = "1";
				break;
			}
		}
	}
	if(typeof(C2Callback) == "string" && typeof(c2_callFunction) != 'undefined'){
		c2_callFunction(C2Callback, [isAvailable]);
	}
	return isAvailable;
}

window.isPMAvailable = function(C2Callback){
	return isIVAvailable(C2Callback);
}

window.getTJBalance = function(T_ID, C2cbSuccess, C2cbFail, force){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].getTJBalance) == "function"){
			allNetworks[i].getTJBalance.apply(allNetworks[i],arguments);
		}
	}
}

window.spendTJCoins = function(T_ID, amount, C2cbSuccess, C2cbFail, force){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].spendTJCoins) == "function"){
			allNetworks[i].spendTJCoins.apply(allNetworks[i],arguments);
		}
	}
	return true;
}

window.earnTJCoins = function(T_ID, amount, C2cbSuccess, C2cbFail){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].earnTJCoins) == "function"){
			allNetworks[i].earnTJCoins.apply(allNetworks[i],arguments);
		}
	}
	return true;
}

window.showOfferWall = function(successCallback, failureCallback, moneyID){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].showOfferWall) == "function"){
			allNetworks[i].showOfferWallOld.apply(allNetworks[i],arguments);
		}
	}
	return true;
}

window.showTJOfferWall = function(C2successCallback, C2failureCallback, moneyID){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].showOfferWall) == "function"){
			allNetworks[i].showOfferWall.apply(allNetworks[i],arguments);
		}
	}
	return true;
}

window.launchTJEventOrOfferWall = function (successCallback, failureCallback){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].launchEventOrOfferWall) == "function"){
			allNetworks[i].launchEventOrOfferWall.apply(allNetworks[i],arguments);
		}
	}
}

window.prepareTJEvent = function(eventName, forceParam, C2cbOnReadyStateTrue, C2cbOnReadyStateFalse, repeat, retry){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].prepareTJEvent) == "function"){
			allNetworks[i].prepareTJEvent.apply(allNetworks[i],arguments);
		}
	}
	return true;
}

window.isTJEventReady = function(eventName, cbC2Yes, cbC2No){
	var _ret=false;
	cbC2Yes = cbC2Yes || "";
	cbC2No = cbC2No || "";
	for(var i in allNetworks){
		if(typeof(allNetworks[i].isEventReady) == "function"){
			if(allNetworks[i].isEventReady(eventName)){
				_ret = true;
				break;
			}
		}
	}

	if(typeof(c2_callFunction) != 'undefined'){
		if(_ret && cbC2Yes !="") c2_callFunction(cbC2Yes, [eventName, "1"]);
		else if(cbC2No !="") c2_callFunction(cbC2No, [eventName, "0"]);
	}
	return ((_ret === true) ? "1": "0");
}

window.launchTJEvent = function(eventName, C2cbOnFail, C2cbOnVideoDidAppear, C2cbOnVideoDidDisappear, forceReload, fallBackOnOfferWall){
	var availablesNetworks = [];

	for(var i in allNetworks){
		if(typeof(allNetworks[i].isEventReady) == "function"){
			if(allNetworks[i].isEventReady(eventName)){
				availablesNetworks.push(allNetworks[i]);
			}
		}
	}

		//GAME SPECIFIC
	if(eventName == "want_to_reborn"){
		if(userChoosesToReborn == "offerToReborn") userChoosesToReborn = "YES";
		eventToFire.fireEvent("userChoosesToReborn","YES");
		saveAdNb++;
	}
	//END OF GAME SPECIFIC


	if(availablesNetworks.length == 0){
		if(typeof(C2cbOnFail) != 'undefined' && typeof(c2_callFunction) == 'function'){
			c2_callFunction(C2cbOnFail, [eventName, "0", ((fallBackOnOfferWall === false) ? "0": "1")]);
			eventToFire.fireEvent("rewarded_analytic",eventName,false,'No-Network-Available');
		}
	}else{
		var choosenNetwork = availablesNetworks[getRandomInt(0, availablesNetworks.length - 1)];
		console.log("Choose", choosenNetwork.name,choosenNetwork, "from", availablesNetworks);

		choosenNetwork.launchEvent.apply(choosenNetwork,arguments);
	}
}

window.quickGetTapPoints = function(){
	for(var i in allNetworks){
		if(typeof(allNetworks[i].quickGetTapPoints) == "function"){
			allNetworks[i].quickGetTapPoints();
		}
	}
}

window.getCurrencyBalance = function(){
	if(typeof(c2_callFunction) == 'undefined') {return;}
	var dif = 0;
	for(var i in allNetworks){
		if(typeof(allNetworks[i].getCurrencyBalance) == "function"){
			c2_callFunction("PMonCoinsBalanceUpdate", allNetworks[i].getCurrencyBalance());
		}
	}
}

window.promptTJEvent = function(){return "0"}


function getRandomInt(min, max) { //inc inc
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
//----------------------------------------------------------------------------------------






//Game specific
var userChoosesToReborn = "NA";
function want_to_die(){
	if(userChoosesToReborn == "offerToReborn")	userChoosesToReborn = "NO";
}

function offerToReborn(success){//	0/1
	//if(userChoosesToReborn != "NA") return;
	if(success == 1) userChoosesToReborn = "offerToReborn";
		else	userChoosesToReborn = "NoVideo";
}


function endless_survivalTime(timeB4Death){}

}());