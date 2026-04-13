let adWidth, adHeight, variables;
let fontsLoaded = false, allImagesLoaded = false;

function init() {
	main.classList.add(checkPlatform(0), checkPlatform(1));
	adWidth = myFT.manifestProperties.width;
	adHeight = myFT.manifestProperties.height;
	variables = myFT.instantAds;
}

function $(t){return (t.substr(0,1)=="#")?document.querySelector(t):document.querySelectorAll(t);}

function setXY(element, xyPos) {
	const xyList = xyPos.trim().split(",");
	if (!xyList[1]) {
	    xyList[1] = "";
	}
	let x = xyList[0].trim();
	let y = xyList[1].trim();

	if (x.charAt(0) == "+") {
	    setValue("margin-left", x.substring(1));
	} else {
	    setValue("left", x);
	}

	if (y.charAt(0) == "+") {
	    setValue("margin-top", y.substring(1));
	} else {
	    setValue("top", y);
	}

	function setValue(valueType, value) {
	if (!value || parseInt(value) == 0) {
	  return;
	}
	element.style.setProperty(valueType, value + "px");
	}
}

function checkPlatform(item) {
	var a = new Array(2);

	if (navigator.platform.toLowerCase().indexOf("mac") > -1) {
		a[0] = "macOS";
	} else if (navigator.platform.toLowerCase().indexOf("win") > -1) {
		a[0] = "windows";
	} else {
		if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
			a[0] = "iOS";
		} else if (navigator.userAgent.match(/Opera Mini/i)) {
			a[0] = "opera";
		} else if (navigator.userAgent.match(/Android/i)) {
			a[0] = "android";
		}
	}

	if (item == 0) {
		return a[0];
	}

	var MSIE = window.navigator.userAgent.indexOf("MSIE ");
	var Edge = window.navigator.userAgent.indexOf("Edge/");

	if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
		a[1] = "chrome";
	} else if (navigator.userAgent.toLowerCase().indexOf("firefox") > -1) {
		a[1] = "firefox";
	} else if (navigator.vendor && navigator.vendor.toLowerCase().indexOf("apple") > -1) {
		a[1] = "safari";
	} 

	if (item == 1) {
		return a[1];
	} else {
		return a;
	}
}

function checkLocal() {
	return document.URL.includes("127.0.0.1") || document.URL.includes("localhost")
}

function trace(str) {
	if (checkLocal() || document.URL.includes("https://creativepreview.flashtalking.net")) {
		console.log(str);
	}
}

function setAdditionalCss(element, list , startIndex) {
    for(let i = startIndex; i < list.length; i++) {
        const propertyValue = list[i].split(":");
	    element.style.setProperty(propertyValue[0], propertyValue[1]);
    }
}

