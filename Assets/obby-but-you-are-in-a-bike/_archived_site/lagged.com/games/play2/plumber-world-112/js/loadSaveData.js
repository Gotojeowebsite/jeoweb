//localStorage delegation
try{
	localStorage.getItem("ls");
	window.proxyStorageEngines={localStorage:localStorage,sessionStorage:sessionStorage};
}catch(_e){
	console.log("Saves are written on session only");
	function customStorage(){
		var e={};
		return Object.defineProperty(e,"setItem",{get:function(){return function(t,n){if(void 0===n)throw new TypeError("Failed to execute 'setItem' on 'Storage': 2 arguments required, but only 1 present.");e[String(t)]=String(n)}}}),
			Object.defineProperty(e,"getItem",{get:function(){return function(t){return e.hasOwnProperty(String(t))?e[String(t)]:null}}}),
			Object.defineProperty(e,"removeItem",{get:function(){return function(t){e.hasOwnProperty(String(t))&&delete e[String(t)]}}}),
			Object.defineProperty(e,"clear",{get:function(){return function(){for(var t in e)delete e[String(t)]}}}),
			Object.defineProperty(e,"length",{get:function(){return Object.keys(e).length}}),
			Object.defineProperty(e,"key",{value:function(t){var n=Object.keys(e)[String(t)];return n||null}}),
			e
	}
	window.proxyStorageEngines={localStorage:customStorage(),sessionStorage:customStorage()};
};
//----------------------------------------------------------------

window.setCookie = function (cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
	return true;
};

window.getCookie = function(cname, defaultVal) {
	if(typeof(defaultVal) == "undefined") defaultVal = "";
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return defaultVal;
};

window.getLocalStorageItem = function (item, defaultVal){
	if(typeof(defaultVal) == "undefined") defaultVal = "";
	if(typeof(window.proxyStorageEngines.localStorage) == "undefined") return defaultVal;
	var tmpVal = window.proxyStorageEngines.localStorage.getItem(item);
	if(tmpVal == null) return defaultVal;
	return tmpVal;
};

window.setLocalStorageItem = function (item, val){
	if(typeof(val) == "undefined") val = "";
	if(typeof(window.proxyStorageEngines.localStorage) == "undefined") return false;
	window.proxyStorageEngines.localStorage.setItem(item, val);
	return true;
};

window.getSaveSRC = function(){
	var toRet = "cookie";
	if(typeof(window.proxyStorageEngines.localStorage) != "undefined"){
		window.proxyStorageEngines.localStorage.setItem('testWriteCordova', 'test');
		if(window.proxyStorageEngines.localStorage.getItem('testWriteCordova') == 'test') toRet = "local";
	}
	return toRet;
};

window.autoGet = function (item, devaultVal){
	var saveSRC = getSaveSRC();
	switch(saveSRC){
		case "cookie":
			return getCookie(item, devaultVal);
		break;
		case "local":
			return getLocalStorageItem(item, devaultVal);
		break;
		default:
			return devaultVal;
		break;
	}
};

window.autoSet = function (item, val, duration){
	if(typeof(duration) != "number") duration = 365;
	duration = parseInt(duration);
	var saveSRC = getSaveSRC();
	switch(saveSRC){
		case "cookie":
			return setCookie(item, val, duration);
		break;
		case "local":
			return setLocalStorageItem(item, val);
		break;
		default:
			return false;
		break;
	}
};
