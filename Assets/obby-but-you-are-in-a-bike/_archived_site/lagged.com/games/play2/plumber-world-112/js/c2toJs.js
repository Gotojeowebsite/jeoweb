var lastLayout = "Loading";
function c2LayoutChange(state,name,obj){
	if(typeof(c2LayoutChangeForward) != "undefined"){ c2LayoutChangeForward(state,name,obj);}
	eventToFire.fireEvent("c2LayoutChange",{state:state,name:name,obj:obj});
}

function gameOver(allScore,victory,object){
	eventToFire.fireEvent("gameOverResult",allScore,victory,object);
};

function shopAction_buyItem(item){
	//console.log("buy",item,typeMoney)
	eventToFire.fireEvent("shopAction_buyItem",item);
};

function shopAction_upgradeItem(item){
	//console.log("upgrade",item,typeMoney)
	eventToFire.fireEvent("shopAction_upgradeItem",item);
};

function shopAction_unlockItem(item){
	//console.log("unlockItem",item)
	eventToFire.fireEvent("shopAction_unlockItem",item);
};

function shopAction_useConsumable(item){
	//console.log("useConsumable",item)
	eventToFire.fireEvent("shopAction_useConsumable",item);
};