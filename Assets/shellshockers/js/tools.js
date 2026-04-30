String.prototype.format = String.prototype.f = function() {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

// HTMLCanvasElement.prototype.getContext = function(origFn) {
// 	return function(type, attribs) {
// 	  attribs = attribs || {};
// 	  attribs.preserveDrawingBuffer = true;
// 	  return origFn.call(this, type, attribs);
// 	};
//   }(HTMLCanvasElement.prototype.getContext);

function getKeyByValue (obj, value) {
	// if (!obj && !value) {
	// 	return;
	// }
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop)) {
			if (obj[prop] === value) {
				return prop;
			}
		}
	}
}

function objToStr (obj) {
	var str = JSON.stringify(obj, null, 4).replace(/\\|"/g, '');
	//str = str.replace(/\\|"/g, '');
	return str;
}

function detectChromebook() {
	return /\bCrOS\b/.test(navigator.userAgent);
}

function removeChildNodes (name) {
	var myNode = document.getElementById(name);
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
}

function logCallStack() {
	var stack = new Error().stack;
	console.log(stack);
}

function getRequest (url, callback) {
	if (url.startsWith('./')) url = url.slice(2);
	url = dynamicContentPrefix + url;

	var req = new XMLHttpRequest();
	if (!req) {
		return false;
	}

	if (typeof callback != 'function') callback = function () {};
	
	req.onreadystatechange = function(){
		if(req.readyState == 4) {
			return req.status === 200 ? 
				callback(null, req.responseText) : callback(req.status, null);
		}
	}
	req.open("GET", url, true);
	req.send(null);
	return req;
}

function hasValue (a) {
	return (a !== undefined && a !== null && a !== 0);
}

Array.prototype.shallowClone = function() {
	return this.slice(0);
}

function deepClone (o) {
	return JSON.parse(JSON.stringify(o));
}

function isString (value) {
	return typeof value === 'string' || value instanceof String;
}

const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
};

function isHttps() {
	//return true // TODOJOSH
    return (document.location.protocol == 'https:');
}

function elOverlap(el1, el2) {
	const domRect1 = el1.getBoundingClientRect();
	const domRect2 = el2.getBoundingClientRect();
  
	return !(
	  domRect1.top > domRect2.bottom ||
	  domRect1.right < domRect2.left ||
	  domRect1.bottom < domRect2.top ||
	  domRect1.left > domRect2.right
	);
  }

  function loadJS(FILE_URL, async = true, callback, errorCallback) {
	let scriptEle = document.createElement("script");
  
	scriptEle.setAttribute("src", FILE_URL);
	scriptEle.setAttribute("type", "text/javascript");
	scriptEle.setAttribute("async", async);
  
	document.body.appendChild(scriptEle);
  
	// success event 
	scriptEle.addEventListener("load", () => {
		if (callback) callback();
	  console.log("File loaded")
	});
	 // error event
	scriptEle.addEventListener("error", (ev) => {
		if (errorCallback) errorCallback();
	  console.log("Error on loading file", ev);
	});
  }

  function debounce(fn, wait){
	let timer;
	return function(...args){
		if(timer) {
			clearTimeout(timer); // clear any pre-existing timer
		}
		const context = this; // get the current context
		timer = setTimeout(()=>{
			fn.apply(context, args); // call the function if time expires
		}, wait);
   }
}


function formatLargeNumbers(num) {
	if (num >= 1_000_000_000) {
	  return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
	} else if (num >= 1_000_000) {
	  return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
	} else if (num >= 1_000) {
	  return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
	} else {
	  return num.toString();
	}
  }