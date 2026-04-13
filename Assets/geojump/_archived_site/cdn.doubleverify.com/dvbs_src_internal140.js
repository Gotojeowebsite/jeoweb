
function dv_rolloutManager(handlersDefsArray, baseHandler) {
    this.handle = function () {
        var errorsArr = [];

        var handler = chooseEvaluationHandler(handlersDefsArray);
        if (handler) {
            var errorObj = handleSpecificHandler(handler);
            if (errorObj === null) {
                return errorsArr;
            }
            else {
                var debugInfo = handler.onFailure();
                if (debugInfo) {
                    for (var key in debugInfo) {
                        if (debugInfo.hasOwnProperty(key)) {
                            if (debugInfo[key] !== undefined || debugInfo[key] !== null) {
                                errorObj[key] = encodeURIComponent(debugInfo[key]);
                            }
                        }
                    }
                }
                errorsArr.push(errorObj);
            }
        }

        var errorObjHandler = handleSpecificHandler(baseHandler);
        if (errorObjHandler) {
            errorObjHandler['dvp_isLostImp'] = 1;
            errorsArr.push(errorObjHandler);
        }
        return errorsArr;
    };

    function handleSpecificHandler(handler) {
        var request;
        var errorObj = null;

        try {
            request = handler.createRequest();
            if (request && !request.isSev1) {
                var url = request.url || request;
                if (url) {
                    if (!handler.sendRequest(url)) {
                        errorObj = createAndGetError('sendRequest failed.',
                            url,
                            handler.getVersion(),
                            handler.getVersionParamName(),
                            handler.dv_script);
                    }
                } else {
                    errorObj = createAndGetError('createRequest failed.',
                        url,
                        handler.getVersion(),
                        handler.getVersionParamName(),
                        handler.dv_script,
                        handler.dvScripts,
                        handler.dvStep,
                        handler.dvOther
                    );
                }
            }
        }
        catch (e) {
            errorObj = createAndGetError(e.name + ': ' + e.message, request ? (request.url || request) : null, handler.getVersion(), handler.getVersionParamName(), (handler ? handler.dv_script : null));
        }

        return errorObj;
    }

    function createAndGetError(error, url, ver, versionParamName, dv_script, dvScripts, dvStep, dvOther) {
        var errorObj = {};
        errorObj[versionParamName] = ver;
        errorObj['dvp_jsErrMsg'] = encodeURIComponent(error);
        if (dv_script && dv_script.parentElement && dv_script.parentElement.tagName && dv_script.parentElement.tagName == 'HEAD') {
            errorObj['dvp_isOnHead'] = '1';
        }
        if (url) {
            errorObj['dvp_jsErrUrl'] = url;
        }
        if (dvScripts) {
            var dvScriptsResult = '';
            for (var id in dvScripts) {
                if (dvScripts[id] && dvScripts[id].src) {
                    dvScriptsResult += encodeURIComponent(dvScripts[id].src) + ":" + dvScripts[id].isContain + ",";
                }
            }
            
            
            
        }
        return errorObj;
    }

    function chooseEvaluationHandler(handlersArray) {
        var config = window._dv_win.dv_config;
        var index = 0;
        var isEvaluationVersionChosen = false;
        if (config.handlerVersionSpecific) {
            for (var i = 0; i < handlersArray.length; i++) {
                if (handlersArray[i].handler.getVersion() == config.handlerVersionSpecific) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }
        else if (config.handlerVersionByTimeIntervalMinutes) {
            var date = config.handlerVersionByTimeInputDate || new Date();
            var hour = date.getUTCHours();
            var minutes = date.getUTCMinutes();
            index = Math.floor(((hour * 60) + minutes) / config.handlerVersionByTimeIntervalMinutes) % (handlersArray.length + 1);
            if (index != handlersArray.length) { 
                isEvaluationVersionChosen = true;
            }
        }
        else {
            var rand = config.handlerVersionRandom || (Math.random() * 100);
            for (var i = 0; i < handlersArray.length; i++) {
                if (rand >= handlersArray[i].minRate && rand < handlersArray[i].maxRate) {
                    isEvaluationVersionChosen = true;
                    index = i;
                    break;
                }
            }
        }

        if (isEvaluationVersionChosen == true && handlersArray[index].handler.isApplicable()) {
            return handlersArray[index].handler;
        }
        else {
            return null;
        }
    }
}

function getCurrentTime() {
    "use strict";
    if (Date.now) {
        return Date.now();
    }
    return (new Date()).getTime();
}

function doesBrowserSupportHTML5Push() {
    "use strict";
    return typeof window.parent.postMessage === 'function' && window.JSON;
}

function dv_GetParam(url, name, checkFromStart) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = (checkFromStart ? "(?:\\?|&|^)" : "[\\?&]") + name + "=([^&#]*)";
    var regex = new RegExp(regexS, 'i');
    var results = regex.exec(url);
    if (results == null)
        return null;
    else
        return results[1];
}

function dv_Contains(array, obj) {
    var i = array.length;
    while (i--) {
        if (array[i] === obj) {
            return true;
        }
    }
    return false;
}

function dv_GetDynamicParams(url, prefix) {
    try {
        prefix = (prefix != undefined && prefix != null) ? prefix : 'dvp';
        var regex = new RegExp("[\\?&](" + prefix + "_[^&]*=[^&#]*)", "gi");
        var dvParams = regex.exec(url);

        var results = [];
        while (dvParams != null) {
            results.push(dvParams[1]);
            dvParams = regex.exec(url);
        }
        return results;
    }
    catch (e) {
        return [];
    }
}

function dv_createIframe() {
    var iframe;
    if (document.createElement && (iframe = document.createElement('iframe'))) {
        iframe.name = iframe.id = 'iframe_' + Math.floor((Math.random() + "") * 1000000000000);
        iframe.width = 0;
        iframe.height = 0;
        iframe.style.display = 'none';
        iframe.src = 'about:blank';
    }

    return iframe;
}

function dv_GetRnd() {
    return ((new Date()).getTime() + "" + Math.floor(Math.random() * 1000000)).substr(0, 16);
}

function dv_SendErrorImp(serverUrl, errorsArr) {

    for (var j = 0; j < errorsArr.length; j++) {
        var errorObj = errorsArr[j];
        var errorImp =   dv_CreateAndGetErrorImp(serverUrl, errorObj);
        dv_sendImgImp(errorImp);
    }
}

function dv_CreateAndGetErrorImp(serverUrl, errorObj) {
    var errorQueryString = '';
    for (var key in errorObj) {
        if (errorObj.hasOwnProperty(key)) {
            if (key.indexOf('dvp_jsErrUrl') == -1) {
                errorQueryString += '&' + key + '=' + errorObj[key];
            }
            else {
                var params = ['ctx', 'cmp', 'plc', 'sid'];
                for (var i = 0; i < params.length; i++) {
                    var pvalue = dv_GetParam(errorObj[key], params[i]);
                    if (pvalue) {
                        errorQueryString += '&dvp_js' + params[i] + '=' + pvalue;
                    }
                }
            }
        }
    }

    var sslFlag = '&ssl=1';
    var errorImp = 'https://' + serverUrl + sslFlag + errorQueryString;

    return errorImp;
}

function dv_getDVUniqueKey(elm) {
    return elm && elm.getAttribute('data-uk');
}

function dv_getDVErrorGlobalScope(elm) {
    var uniqueKey = dv_getDVUniqueKey(elm);
    return uniqueKey && window._dv_win && window._dv_win[uniqueKey] && window._dv_win[uniqueKey].globalScopeVerifyErrorHandler || {};
}

function dv_onLoad(evt) {
    var elm = evt && evt.target || {};
    var globalScope = dv_getDVErrorGlobalScope(elm);
    if (globalScope) {
        var scriptSRC = dv_getScriptSRC(elm);
        if (!globalScope.isJSONPCalled) {
            setTimeout(function onTimeout(){
                globalScope.onTimeout(scriptSRC);
            }, globalScope.msTillJSONPCalled);
        }
    }
}

function dv_onResponse(evt) {
    var elm = evt && evt.target || {};
    var globalScope = dv_getDVErrorGlobalScope(elm);
    if (globalScope) {
        var scriptSRC = dv_getScriptSRC(elm);
        if (!globalScope.isJSONPCalled) {
            globalScope.onResponse(scriptSRC);
        }
    }
}

function dv_getScriptSRC(elm) {
    return elm && elm.src || '';
}
var IQPAParams = [
    "auprice", "ppid", "audeal", "auevent", "auadv", "aucmp", "aucrtv", "auorder", "ausite", "auplc", "auxch", "audvc", "aulitem",
    "auadid", "pltfrm", "aufilter1", "aufilter2", "autt", "auip", "aubndl", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9",
    "c10", "c11", "c12", "c13", "c14", "c15"
];

function dv_AppendIQPAParams(src) {
    var qs = [];
    var paramVal;
    IQPAParams.forEach(function forEachParam(paramName){
        paramVal = dv_GetParam(src, paramName);
        if (paramVal !== '' && paramVal !== null) {
            qs.push([paramName, paramVal].join('='));
        }
    });
    return qs.length && '&' + qs.join('&') || '';
}

function dv_onError(evt) {
    var elm = evt && evt.target || {};
    var globalScope = dv_getDVErrorGlobalScope(elm);
    if (globalScope) {
        globalScope.onError(dv_getScriptSRC(elm));
    }
}

function dv_getDVBSErrAddress(config) {
    return config && config.bsErrAddress || 'rtb0.doubleverify.com';
}

function dv_sendImgImp(url) {
    (new Image()).src = url;
}

function dv_sendScriptRequest(url, onLoad, onError, uniqueKey) {
    var emptyFunction = function(){};
    onLoad = onLoad || emptyFunction;
    onError = onError || emptyFunction;
    document.write('<scr' + 'ipt data-uk="' + uniqueKey + '" onerror="(' + onError + ')({target:this});" onload="(' + onLoad + ')({target:this});" type="text/javascript" src="' + url + '"></scr' + 'ipt>');
}

function dv_getPropSafe(obj, propName) {
    try {
        if (obj)
            return obj[propName];
    } catch (e) {
    }
}

function dvBsType() {
    var that = this;
    var eventsForDispatch = {};

    this.getEventsForDispatch = function getEventsForDispatch () {
        return eventsForDispatch;
    };

    var messageEventListener = function (event) {
        try {
            var timeCalled = getCurrentTime();
            var data = window.JSON.parse(event.data);
            if (!data.action) {
                data = window.JSON.parse(data);
            }
            if (data.timeStampCollection) {
                data.timeStampCollection.push({messageEventListenerCalled: timeCalled});
            }
            var myUID;
            var visitJSHasBeenCalledForThisTag = false;
            if ($dvbs.tags) {
                for (var uid in $dvbs.tags) {
                    if ($dvbs.tags.hasOwnProperty(uid) && $dvbs.tags[uid] && $dvbs.tags[uid].t2tIframeId === data.iFrameId) {
                        myUID = uid;
                        visitJSHasBeenCalledForThisTag = true;
                        break;
                    }
                }
            }

        } catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.tpsErrAddress + '/visit.jpg?flvr=0&ctx=818052&cmp=1619415&dvtagver=6.1.src&jsver=0&dvp_ist2tListener=1', {cemsg: encodeURIComponent(e)});
            } catch (ex) {
            }
        }
    };

    if (window.addEventListener)
        addEventListener("message", messageEventListener, false);
    else if (window.attachEvent)
        window.attachEvent("onmessage", messageEventListener);

    this.pubSub = new function () {

        var subscribers = [];

        this.subscribe = function (eventName, uid, actionName, func) {
            if (!subscribers[eventName + uid])
                subscribers[eventName + uid] = [];
            subscribers[eventName + uid].push({Func: func, ActionName: actionName});
        };

        this.publish = function (eventName, uid) {
            var actionsResults = [];
            if (eventName && uid && subscribers[eventName + uid] instanceof Array)
                for (var i = 0; i < subscribers[eventName + uid].length; i++) {
                    var funcObject = subscribers[eventName + uid][i];
                    if (funcObject && funcObject.Func && typeof funcObject.Func == "function" && funcObject.ActionName) {
                        var isSucceeded = runSafely(function () {
                            return funcObject.Func(uid);
                        });
                        actionsResults.push(encodeURIComponent(funcObject.ActionName) + '=' + (isSucceeded ? '1' : '0'));
                    }
                }
            return actionsResults.join('&');
        };
    };

    this.domUtilities = new function () {

        this.addImage = function (url, parentElement, trackingPixelCompleteCallbackName) {
            url = appendCacheBuster(url);
            if (typeof(navigator.sendBeacon) === 'function') {
                var isSuccessfullyQueuedDataForTransfer = navigator.sendBeacon(url);
                if (isSuccessfullyQueuedDataForTransfer && typeof(window[trackingPixelCompleteCallbackName]) === 'function') {
                    window[trackingPixelCompleteCallbackName]();
                }
                return;
            }

            var image = new Image();
            if (typeof(window[trackingPixelCompleteCallbackName]) === 'function') {
                image.addEventListener('load', window[trackingPixelCompleteCallbackName]);
            }
            image.src = url;
        };

        this.addScriptResource = function (url, parentElement, onLoad, onError, uniqueKey) {
            var emptyFunction = function(){};
            onLoad = onLoad || emptyFunction;
            onError = onError || emptyFunction;
            uniqueKey = uniqueKey || '';
            if (parentElement) {
                var scriptElem = parentElement.ownerDocument.createElement("script");
                scriptElem.onerror = onError;
                scriptElem.onload = onLoad;
                if (scriptElem && typeof(scriptElem.setAttribute) === 'function') {
                    scriptElem.setAttribute('data-uk', uniqueKey);
                }
                scriptElem.type = 'text/javascript';
                scriptElem.src = appendCacheBuster(url);
                parentElement.insertBefore(scriptElem, parentElement.firstChild);
            }
            else {
                addScriptResourceFallBack(url, onLoad, onError, uniqueKey);
            }
        };

        function addScriptResourceFallBack(url, onLoad, onError, uniqueKey) {
            var emptyFunction = function(){};
            onLoad = onLoad || emptyFunction;
            onError = onError || emptyFunction;
            uniqueKey = uniqueKey || '';
            var scriptElem = document.createElement('script');
            scriptElem.onerror = onError;
            scriptElem.onload = onLoad;
            if (scriptElem && typeof(scriptElem.setAttribute) === 'function') {
                scriptElem.setAttribute('data-uk', uniqueKey);
            }
            scriptElem.type = "text/javascript";
            scriptElem.src = appendCacheBuster(url);
            var firstScript = document.getElementsByTagName('script')[0];
            firstScript.parentNode.insertBefore(scriptElem, firstScript);
        }

        this.addScriptCode = function (srcCode, parentElement) {
            var scriptElem = parentElement.ownerDocument.createElement("script");
            scriptElem.type = 'text/javascript';
            scriptElem.innerHTML = srcCode;
            parentElement.insertBefore(scriptElem, parentElement.firstChild);
        };

        this.addHtml = function (srcHtml, parentElement) {
            var divElem = parentElement.ownerDocument.createElement("div");
            divElem.style = "display: inline";
            divElem.innerHTML = srcHtml;
            parentElement.insertBefore(divElem, parentElement.firstChild);
        };
    };

    this.resolveMacros = function (str, tag) {
        var viewabilityData = tag.getViewabilityData();
        var viewabilityBuckets = viewabilityData && viewabilityData.buckets ? viewabilityData.buckets : {};
        var upperCaseObj = objectsToUpperCase(tag, viewabilityData, viewabilityBuckets);
        var newStr = str.replace('[DV_PROTOCOL]', upperCaseObj.DV_PROTOCOL);
        newStr = newStr.replace('[PROTOCOL]', upperCaseObj.PROTOCOL);
        newStr = newStr.replace(/\[(.*?)\]/g, function (match, p1) {
            var value = upperCaseObj[p1];
            if (value === undefined || value === null)
                value = '[' + p1 + ']';
            return encodeURIComponent(value);
        });
        return newStr;
    };

    this.settings = new function () {
    };

    this.tagsType = function () {
    };

    this.tagsPrototype = function () {
        this.add = function (tagKey, obj) {
            if (!that.tags[tagKey])
                that.tags[tagKey] = new that.tag();
            for (var key in obj)
                that.tags[tagKey][key] = obj[key];
        };
    };

    this.tagsType.prototype = new this.tagsPrototype();
    this.tagsType.prototype.constructor = this.tags;
    this.tags = new this.tagsType();

    this.tag = function () {
    };
    this.tagPrototype = function () {
        this.set = function (obj) {
            for (var key in obj)
                this[key] = obj[key];
        };

        this.getViewabilityData = function () {
        };
    };

    this.tag.prototype = new this.tagPrototype();
    this.tag.prototype.constructor = this.tag;

    this.getTagObjectByService = function (serviceName) {

        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] === 'object'
                && this.tags[impressionId].services
                && this.tags[impressionId].services[serviceName]
                && !this.tags[impressionId].services[serviceName].isProcessed) {
                this.tags[impressionId].services[serviceName].isProcessed = true;
                return this.tags[impressionId];
            }
        }


        return null;
    };

    this.addService = function (impressionId, serviceName, paramsObject) {

        if (!impressionId || !serviceName)
            return;

        if (!this.tags[impressionId])
            return;
        else {
            if (!this.tags[impressionId].services)
                this.tags[impressionId].services = {};

            this.tags[impressionId].services[serviceName] = {
                params: paramsObject,
                isProcessed: false
            };
        }
    };

    this.Enums = {
        BrowserId: {Others: 0, IE: 1, Firefox: 2, Chrome: 3, Opera: 4, Safari: 5},
        TrafficScenario: {OnPage: 1, SameDomain: 2, CrossDomain: 128}
    };

    this.CommonData = {};

    var runSafely = function (action) {
        try {
            var ret = action();
            return ret !== undefined ? ret : true;
        } catch (e) {
            return false;
        }
    };

    var objectsToUpperCase = function () {
        var upperCaseObj = {};
        for (var i = 0; i < arguments.length; i++) {
            var obj = arguments[i];
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    upperCaseObj[key.toUpperCase()] = obj[key];
                }
            }
        }
        return upperCaseObj;
    };

    var appendCacheBuster = function (url) {
        if (url !== undefined && url !== null && url.match("^http") == "http") {
            if (url.indexOf('?') !== -1) {
                if (url.slice(-1) == '&')
                    url += 'cbust=' + dv_GetRnd();
                else
                    url += '&cbust=' + dv_GetRnd();
            }
            else
                url += '?cbust=' + dv_GetRnd();
        }
        return url;
    };

    
    var messagesClass = function () {
        var waitingMessages = [];

        this.registerMsg = function(dvFrame, data) {
            if (!waitingMessages[dvFrame.$frmId]) {
                waitingMessages[dvFrame.$frmId] = [];
            }

            waitingMessages[dvFrame.$frmId].push(data);

            if (dvFrame.$uid) {
                sendWaitingEventsForFrame(dvFrame, dvFrame.$uid);
            }
        };

        this.startSendingEvents = function(dvFrame, impID) {
            sendWaitingEventsForFrame(dvFrame, impID);
            
        };

        function sendWaitingEventsForFrame(dvFrame, impID) {
            if (waitingMessages[dvFrame.$frmId]) {
                var eventObject = {};
                for (var i = 0; i < waitingMessages[dvFrame.$frmId].length; i++) {
                    var obj = waitingMessages[dvFrame.$frmId].pop();
                    for (var key in obj) {
                        if (typeof obj[key] !== 'function' && obj.hasOwnProperty(key)) {
                            eventObject[key] = obj[key];
                        }
                    }
                }
                that.registerEventCall(impID, eventObject);
            }
        }

        function startMessageManager() {
            for (var frm in waitingMessages) {
                if (frm && frm.$uid) {
                    sendWaitingEventsForFrame(frm, frm.$uid);
                }
            }
            setTimeout(startMessageManager, 10);
        }
    };
    this.messages = new messagesClass();

    this.dispatchRegisteredEventsFromAllTags = function () {
        for (var impressionId in this.tags) {
            if (typeof this.tags[impressionId] !== 'function' && typeof this.tags[impressionId] !== 'undefined')
                dispatchEventCalls(impressionId, this);
        }
    };

    var dispatchEventCalls = function (impressionId, dvObj) {
        var tag = dvObj.tags[impressionId];
        var eventObj = eventsForDispatch[impressionId];
        if (typeof eventObj !== 'undefined' && eventObj != null) {
            var url = 'https://' + tag.ServerPublicDns + "/bsevent.gif?flvr=0&impid=" + impressionId + '&' + createQueryStringParams(eventObj);
            dvObj.domUtilities.addImage(url, tag.tagElement.parentElement);
            eventsForDispatch[impressionId] = null;
        }
    };

    this.registerEventCall = function (impressionId, eventObject, timeoutMs) {
        addEventCallForDispatch(impressionId, eventObject);

        if (typeof timeoutMs === 'undefined' || timeoutMs == 0 || isNaN(timeoutMs))
            dispatchEventCallsNow(this, impressionId, eventObject);
        else {
            if (timeoutMs > 2000)
                timeoutMs = 2000;

            var dvObj = this;
            setTimeout(function () {
                dispatchEventCalls(impressionId, dvObj);
            }, timeoutMs);
        }
    };

    this.createEventCallUrl = function(impId, eventObject) {
        var tag = this.tags && this.tags[impId];
        if (tag && typeof eventObject !== 'undefined' && eventObject !== null) {
            return ['https://', tag.ServerPublicDns, '/bsevent.gif?flvr=0&impid=', impId, '&', createQueryStringParams(eventObject)].join('');
        }
    }

    var dispatchEventCallsNow = function (dvObj, impressionId, eventObject) {
        addEventCallForDispatch(impressionId, eventObject);
        dispatchEventCalls(impressionId, dvObj);
    };

    var addEventCallForDispatch = function (impressionId, eventObject) {
        for (var key in eventObject) {
            if (typeof eventObject[key] !== 'function' && eventObject.hasOwnProperty(key)) {
                if (!eventsForDispatch[impressionId])
                    eventsForDispatch[impressionId] = {};
                eventsForDispatch[impressionId][key] = eventObject[key];
            }
        }
    };

    if (window.addEventListener) {
        window.addEventListener('unload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.addEventListener('beforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else if (window.attachEvent) {
        window.attachEvent('onunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
        window.attachEvent('onbeforeunload', function () {
            that.dispatchRegisteredEventsFromAllTags();
        }, false);
    }
    else {
        window.document.body.onunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
        window.document.body.onbeforeunload = function () {
            that.dispatchRegisteredEventsFromAllTags();
        };
    }

    var createQueryStringParams = function (values) {
        var params = '';
        for (var key in values) {
            if (typeof values[key] !== 'function') {
                var value = encodeURIComponent(values[key]);
                if (params === '')
                    params += key + '=' + value;
                else
                    params += '&' + key + '=' + value;
            }
        }

        return params;
    };
}


var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(h,u,t){h!=Array.prototype&&h!=Object.prototype&&(h[u]=t.value)};$jscomp.getGlobal=function(h){return"undefined"!=typeof window&&window===h?h:"undefined"!=typeof global&&null!=global?global:h};$jscomp.global=$jscomp.getGlobal(this);$jscomp.SYMBOL_PREFIX="jscomp_symbol_";
$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var h=0;return function(u){return $jscomp.SYMBOL_PREFIX+(u||"")+h++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var h=$jscomp.global.Symbol.iterator;h||(h=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[h]&&$jscomp.defineProperty(Array.prototype,h,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};$jscomp.arrayIterator=function(h){var u=0;return $jscomp.iteratorPrototype(function(){return u<h.length?{done:!1,value:h[u++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(h){$jscomp.initSymbolIterator();h={next:h};h[$jscomp.global.Symbol.iterator]=function(){return this};return h};$jscomp.iteratorFromArray=function(h,u){$jscomp.initSymbolIterator();h instanceof String&&(h+="");var t=0,v={next:function(){if(t<h.length){var D=t++;return{value:u(D,h[D]),done:!1}}v.next=function(){return{done:!0,value:void 0}};return v.next()}};v[Symbol.iterator]=function(){return v};return v};
$jscomp.polyfill=function(h,u,t,v){if(u){t=$jscomp.global;h=h.split(".");for(v=0;v<h.length-1;v++){var D=h[v];D in t||(t[D]={});t=t[D]}h=h[h.length-1];v=t[h];u=u(v);u!=v&&null!=u&&$jscomp.defineProperty(t,h,{configurable:!0,writable:!0,value:u})}};$jscomp.polyfill("Array.prototype.keys",function(h){return h?h:function(){return $jscomp.iteratorFromArray(this,function(h){return h})}},"es6","es3");
function dv_baseHandler(){function h(a){var b=window._dv_win,d=0;try{for(;10>d;){if(b[a]&&"object"===typeof b[a])return!0;if(b==b.parent)break;d++;b=b.parent}}catch(e){}return!1}function u(a){var b=0,d;for(d in a)a.hasOwnProperty(d)&&++b;return b}function t(a,b){a:{var d={};try{if(a&&a.performance&&a.performance.getEntries){var e=a.performance.getEntries();for(a=0;a<e.length;a++){var c=e[a],p=c.name.match(/.*\/(.+?)\./);if(p&&p[1]){var f=p[1].replace(/\d+$/,""),g=b[f];if(g){for(var w=0;w<g.stats.length;w++){var m=
g.stats[w];d[g.prefix+m.prefix]=Math.round(c[m.name])}delete b[f];if(!u(b))break}}}}var k=d;break a}catch(z){}k=void 0}if(k&&u(k))return k}function v(a,b){function d(a){var c=m,b;for(b in a)a.hasOwnProperty(b)&&(c+=["&"+b,"="+a[b]].join(""));return c}function e(){return Date.now?Date.now():(new Date).getTime()}function c(c){if(!u){u=!0;var b={};b[r.MONITORING_INIT]=1;b[r.DVM_INJECT_FLOW]=c;c=d(b);$dvbs.domUtilities.addImage(c,document.body);try{c="https://cdn.doubleverify.com/dvtp_src.js#tagtype=video";
b="ctx cmp plc sid adsrv adid crt advid prr dup turl iframe ad vssd apifw vstvr tvcp ppid auip pltfrm gdpr gdpr_consent adu invs litm ord sadv scrt vidreg seltag splc spos sup unit dvtagver msrapi vfwctx auprice audeal auevent auadv aucmp aucrtv auorder ausite auplc auxch audvc aulitem auadid autt c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 aufilter1 aufilter2 ppid cawf zjsver".split(" ");for(var p=0;p<b.length;p++){var f=b[p],k=g(a,f);void 0!==k&&(c+=["&",f,"=",encodeURIComponent(k)].join(""))}c+=
"&gmnpo="+("1"==a.gmnpo?"1":"0");c+="&dvp_dvtpts="+e();c+="&bsimpid="+w;void 0!==a.dvp_aubndl&&(c+="&aubndl="+encodeURIComponent(a.dvp_aubndl));for(var n in a)a.hasOwnProperty(n)&&n.match(/^(dvp|dvpx|tde)_/i)&&a[n]&&(c+=["&",n.toLocaleLowerCase(),"=",encodeURIComponent(a[n])].join(""));$dvbs.domUtilities.addScriptResource(c,document.body)}catch(P){f=d({cerrt:x.INJECT_SCRIPT_ERROR,cemsg:P}),$dvbs.domUtilities.addImage(f,document.body)}}}function p(a){var c={};c[a]=e();a=d(c);$dvbs.domUtilities.addImage(a,
document.body)}function f(a,c){-1<y.indexOf(a)?p(c):l.subscribe(function(){p(c)},a)}function g(a,c){c=c.toLowerCase();for(var b in a)if(b.toLowerCase()===c)return a[b];return null}var w=a.impressionId,m=window._dv_win.dv_config.bsEventJSURL?window._dv_win.dv_config.bsEventJSURL:"https://"+a.ServerPublicDns+"/bsevent.gif";m+="?flvr=0&impid="+encodeURIComponent(w);var k={};k[r.VPAID_FLOW_INIT]=1;var h=d(k),A="responseReceived_"+w,n=a.DVP_DCB||a.DVP_DECISION_CALLBACK,q=g(a,"adid"),F=function(a){var c=
a;switch(a){case 5:c=1;break;case 6:c=2}return c}(b.ResultID),u=!1;$dvbs.domUtilities.addImage(h,document.body);if("function"===typeof window[n]){var v=!1;setTimeout(function(){var c={};c[r.WAS_CALLBACK_CALLED]=v;c=d(c);$dvbs.domUtilities.addImage(c,document.body)},1E3);window[A]=function(a,b,p,f,k,g,n){v=!0;try{if(n){var m={};m[r.CB_STATE]=n;var l=d(m);$dvbs.domUtilities.addImage(l,document.body)}else{m={};m[r.PARTNER_CB_CALLED]=e();l=d(m);$dvbs.domUtilities.addImage(l,document.body);m={};m[r.C_START_TIMESTAMP]=
p;m[r.C_END_TIMESTAMP]=f;m[r.D_RECEIVED_TIMESTAMP]=k;m[r.WAS_AD_PLAYED]=a;p=m;f="";for(var q in p)p.hasOwnProperty(q)&&(f+=["&"+q,"="+p[q]].join(""));var w=f;q=F;if(!b)switch(q=2,F){case 1:var h=21;break;case 2:h=20;break;case 3:h=22;break;case 4:h=23}q={bres:q};q[r.BLOCKING_DECISION_USED]=b?"1":"0";h&&(q.breason=h);l=d(q)+w;$dvbs.domUtilities.addImage(l,document.body,g);a&&!K()&&c("adplayed")}}catch(Q){a=d({cerrt:x.INNOVID_CALLBACK_INIT_EXCEPTION,cemsg:Q}),$dvbs.domUtilities.addImage(a,document.body)}};
try{k={};k[r.VPAID_CB_CALLED]=e();var t=d(k);$dvbs.domUtilities.addImage(t,document.body);window[n](F,A)}catch(G){b=d({cerrt:x.INNOVID_CALLBACK_EX_ERR,cemsg:G}),$dvbs.domUtilities.addImage(b,document.body)}}else b=d({cerrt:x.INNOVID_CALLBACK_MISSING}),$dvbs.domUtilities.addImage(b,document.body);try{var l=window[q]();if(l.getPreviousEvents&&"function"===typeof l.getPreviousEvents){k={};k[r.SUBSCRIBED_TO_ADSTART]=e();t=d(k);$dvbs.domUtilities.addImage(t,document.body);var y=l.getPreviousEvents(),E=
0;-1<y.indexOf("AdStarted")?(E=1,c("ad_started_triggered")):l.subscribe(function(){return c("ad_started_subscribe")},"AdStarted");k={};k[r.AD_STARTED]=E;k[r.PREVIOUS_EVENTS]=y;t=d(k);$dvbs.domUtilities.addImage(t,document.body);f("AdError",r.AD_ERROR);f("AdStopped",r.AD_STOPPED);f("AdVideoStart",r.AD_VIDEO_START);f("AdImpression",r.AD_IMPRESSION)}else E=d({cerrt:x.INNOVID_CALLBACK_NOT_A_FUNCTION,cemsg:"vpaidWrapper.getPreviousEvents not a function"}),$dvbs.domUtilities.addImage(E,document.body)}catch(G){k=
{cerrt:x.INNOVID_CALLBACK_EXCEPTION,cemsg:G},k[r.AD_ID]=q,k[r.AD_ID_TYPE]=typeof window[q],E=d(k),$dvbs.domUtilities.addImage(E,document.body)}}function D(a,b){try{$dvbs.registerEventCall(a,{dvp_te_exec:R.RTN}),Object.keys(b).length&&b.forEach(function(b){b.actions&&b.actions.length?b.actions.forEach(function(d){$dvbs.pubSub.subscribe(b.eventName,a,"RTN_"+b.eventName,function(){d.url&&d.actionType&&("image"===d.actionType?navigator.sendBeacon(d.url):"javascript"===d.actionType&&$dvbs.domUtilities.addScriptResource(d.url,
document.body))})}):$dvbs.registerEventCall(a,{dvp_rtnError:1,dvp_errMsg:"Malformed or empty RTN object"})})}catch(d){$dvbs.registerEventCall(a,{dvp_rtnError:1,dvp_errMsg:encodeURIComponent(d.message)})}}function S(a){function b(){try{var c=a&&a.script?a.script.src:null;if(!c)return null;var b=dv_GetParam(c,"unit");if(!b)return null;var d=b.toLowerCase().split("x"),e=d[0],w=d[1];if(!e||!w)return null;var m=parseInt(e,10),k=parseInt(w,10);return isNaN(m)||isNaN(k)?null:{width:m,height:k}}catch(z){return null}}
var d,e=window._dv_win.document.visibilityState;window[a.tagObjectCallbackName]=function(c){var b=window._dv_win.$dvbs;b&&(d=c.ImpressionID,b.tags.add(c.ImpressionID,a),b.tags[c.ImpressionID].set({tagElement:a.script,impressionId:c.ImpressionID,dv_protocol:a.protocol,protocol:"https:",uid:a.uid,serverPublicDns:c.ServerPublicDns,ServerPublicDns:c.ServerPublicDns}),a.script&&a.script.dvFrmWin&&(a.script.dvFrmWin.$uid=c.ImpressionID,b.messages&&b.messages.startSendingEvents&&b.messages.startSendingEvents(a.script.dvFrmWin,
c.ImpressionID)),function(){function a(){"prerender"===e&&"prerender"!==b&&"unloaded"!==b&&(e=b,window._dv_win.$dvbs.registerEventCall(c.ImpressionID,{prndr:0}),window._dv_win.document.removeEventListener(d,a))}var b=window._dv_win.document.visibilityState;if("prerender"===e)if("prerender"!==window._dv_win.document.visibilityState&&"unloaded"!==b)window._dv_win.$dvbs.registerEventCall(c.ImpressionID,{prndr:0});else{var d;"undefined"!==typeof window._dv_win.document.hidden?d="visibilitychange":"undefined"!==
typeof window._dv_win.document.mozHidden?d="mozvisibilitychange":"undefined"!==typeof window._dv_win.document.msHidden?d="msvisibilitychange":"undefined"!==typeof window._dv_win.document.webkitHidden&&(d="webkitvisibilitychange");window._dv_win.document.addEventListener(d,a,!1)}}());if("1"!=a.foie)try{var f=t(window,{verify:{prefix:"vf",stats:[{name:"duration",prefix:"dur"}]}});f&&window._dv_win.$dvbs.registerEventCall(c.ImpressionID,f)}catch(g){}};window[a.callbackName]=function(c){B.setIsJSONPCalled(!0);
var e=window._dv_win.$dvbs&&"object"==typeof window._dv_win.$dvbs.tags[d]?window._dv_win.$dvbs.tags[d]:a;var f=window._dv_win.dv_config.bs_renderingMethod||function(a){document.write(a)};"2"!=e.tagformat||void 0===e.DVP_DCB&&void 0===e.DVP_DECISION_CALLBACK||v(e,c);var g=document.readyState,h=0,m="",k=b(),z=k?k.width:null;k=k?k.height:null;switch(c.ResultID){case 1:e.tagPassback?f(e.tagPassback):c.Passback?f(decodeURIComponent(c.Passback)):z&&k&&f(decodeURIComponent("%3Cdiv%20style%3D%22display%3A%20flex%3B%20align-items%3A%20center%3B%20justify-content%3A%20center%3B%20width%3A%20"+
z+"px%3B%20height%3A%20"+k+"px%3B%20outline-offset%3A%20-1px%3B%20background%3A%20url('data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAYAAAGWvHq%2BAAAABmJLR0QA%2FwD%2FAP%2BgvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH5AQBECEbFuFN7gAAAB1pVFh0Q29tbWVudAAAAAAAQ3JlYXRlZCB3aXRoIEdJTVBkLmUHAAAFBklEQVRo3uUby3arOEzxAbxIyKLt%2F%2F9gIQtIF4aFZ5ERVxhJyIbcnjmjTZLast4vQ%2BG762OMMX53fQzTFIfxGenfKvgXvj4%2FoOsfy3eECgBgmmcYhnFZ6PoHeO%2F%2FbBiGEQAAxufPghlC%2BLOBYqa%2FHezAJcYYOUz87QAA7vd2g4lMAsrLfQJ%2BQeUM43PZsMJEwN8L58gMfgIAAMVKv6syX4bxGVF9qTiuvV2Byouf7e0Kl%2B%2Buj6kJU8aktV07aFClTkThfm9hGMbNGu53dCNd%2FPr8gBCm5TsnAivz%2BPwBqkHvPaDiVvpAW6Nh0FBhmpagSdfQV0Q7oVySPrz3LyO3t%2BvCKrJIHTtdG58%2FvLycZk%2Bzr1uFkgFWuYHKZHHNEMIr4lMb0pO5v7e3qyyj983KATYydv1jswFZneZ5wzaKVaEMVnNgjsw2B8pcbMdLmKbY1PVG5dTl0rVpnsGlSDReOcfo%2Bgc0df3SagrTPC8m4aDrH1ClaR4AgHKRmgN%2FL9HBbeI4wdKVitXUtYpLGXPSgpUg1lBaPzWCWW6wJ4lkB9aFUL1pQkXOvW9WBDltULNM8wwhTEtIcQn88t31kdpEU7FmOwsemqiiqtPsQvufXMCmCulUSKy9XaG9XYGrLhbv1iSlWU0NGdyQqlPKBHQfh0vxVkQ1abSQybX3oQ7nUPWUpEQ1oaokLVAnSfG4cy8xxpjrEFyVtuCJNt3rETDgu%2F6xiT9zRqKSci0DxzHdZ5E0zXabjGTtwSxr9FyqjazSJkmTi%2Bckb01BS5HaGnems%2BZWzdb62qQTfQdwDDl2Wj0RuKnYpX1sDrJljcvHTqow4%2FNn5SBNXYuzPD0Y8agDsRlpr3NIg1vyYGnSS%2BPUURVIcRhC2A0ZyYPxTKqNyuo8IYRlpMSGLYRJDRdOYyEEqEpDIIfY5qYhhLBrL0s%2BLS7imqq995tijYVdCxlx0EMnaW9XlvD93m4aZ0s4cZ3gqspYOjppRKcMcXipGZyU7Ju63iXIhVOKx53trCWqtMpwZzor8n%2BqynBnnlJlNGa5M51VSmlksBSDlOHlKk%2FzUq0KcVVEYgidytz3coS19lPrFh1y2fUP1Xu1HKsRxHWakao9hLNglZHeESaal3vvocKx3zKP7BXnLJtaxgNkjKY1Wp1y7inYUVG7Akg79vSeKefKwHJ1kEtTikBxJrYkmpIBr1TgPdgbrZ1WkPbuz84UEiNZG1ZLhdydE0sqeqlytGG2pEt4%2B0Ccc9H8zs4kS1Br0542F0fqR0lesOCwyehoIioZq86gqcWq6XbZwrTGqMSAhmOhKWVpjp74PObIsLt3R3g0g1oETs8R32woFbLEHUuEs9CiZa6SslZJmpcuf%2F4GcNc0tDf9lYcxvwGVrI3mkDVeY0NjbumOui9XCtkYlZJIbjt3pF8tzQ0czZTvTXnJSdlHSstRXAlPUpQ4vRy1TK4nnNEwaDTd2ZNE6fQSQiieevBiprjXLamjpco5Mv1YSuH%2Fpry4o%2BMPN70cgZI4tYyG7h3J4evzI1tJ%2BIynBLTHMdnlpXQKsTQCkoAaPakZEctL%2BpbK0Y7FMkloCnrXHMsKileMpS0ZR3zvveez2kDJG6szRiSuJqaulfbOaQJ5KfcYH5wnLK82v2uMCmHaPDz%2BDVj%2BfSNNBGdZmIu9v6EIKWbVZHTmVYrl9clSRVsS0urOKDdlW1J%2B6SubFoH3SiF13X8A3uobUgsAG3MAAAAASUVORK5CYII%3D')%20repeat%3B%20outline%3A%20solid%201px%20%23969696%3B%22%3E%3C%2Fdiv%3E"));
break;case 2:case 3:if(e.tagAdtag){f(e.tagAdtag);try{var A=e.tagAdtag.trim().substring(0,10),n=document.querySelector('script[src*="verify.js"][src*="plc='+e.plc+'"]').nextElementSibling.outerHTML.trim().substring(0,10);h=A==n?"1":"0"}catch(q){h=-1,m=q.message}}else h=-2;e={};e[r.READYSTATE_AT_VERIFY_RESPONSE]=g;e[r.ADTAG_CONTENT_ADDED_TO_DOM]=h;m&&(e.cemsg=m);window._dv_win.$dvbs.registerEventCall(d,e);break;case 4:z&&k&&f(decodeURIComponent("%3Cstyle%3E%0A.dvbs_container%20%7B%0A%09border%3A%201px%20solid%20%233b599e%3B%0A%09overflow%3A%20hidden%3B%0A%09filter%3A%20progid%3ADXImageTransform.Microsoft.gradient(startColorstr%3D%27%23315d8c%27%2C%20endColorstr%3D%27%2384aace%27)%3B%0A%7D%0A%3C%2Fstyle%3E%0A%3Cdiv%20class%3D%22dvbs_container%22%20style%3D%22width%3A%20"+
z+"px%3B%20height%3A%20"+k+"px%3B%22%3E%09%0A%3C%2Fdiv%3E"))}c.ServerContext&&c.ServerContext.rtn&&c.ServerContext.rtn.events&&D(d,c.ServerContext.rtn.events)}}function T(a){var b=null,d=null,e=function(a){var c=dv_GetParam(a,"cmp");a=dv_GetParam(a,"ctx");return"919838"==a&&"7951767"==c||"919839"==a&&"7939985"==c||"971108"==a&&"7900229"==c||"971108"==a&&"7951940"==c?"</scr'+'ipt>":/<\/scr\+ipt>/g}(a.src);"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,
"")});var c=function(a){!(a=a.previousSibling)||"#text"!=a.nodeName||null!=a.nodeValue&&void 0!=a.nodeValue&&0!=a.nodeValue.trim().length||(a=a.previousSibling);if(a&&"SCRIPT"==a.tagName&&a.getAttribute("type")&&("text/adtag"==a.getAttribute("type").toLowerCase()||"text/passback"==a.getAttribute("type").toLowerCase())&&""!=a.innerHTML.trim()){if("text/adtag"==a.getAttribute("type").toLowerCase())return b=a.innerHTML.replace(e,"\x3c/script>"),{isBadImp:!1,hasPassback:!1,tagAdTag:b,tagPassback:d};if(null!=
d)return{isBadImp:!0,hasPassback:!1,tagAdTag:b,tagPassback:d};d=a.innerHTML.replace(e,"\x3c/script>");a=c(a);a.hasPassback=!0;return a}return{isBadImp:!0,hasPassback:!1,tagAdTag:b,tagPassback:d}};return c(a)}function K(){try{if("object"==typeof window.$ovv||"object"==typeof window.parent.$ovv)return 1}catch(a){}return 0}function L(a,b,d,e,c,p,f,g,w,m,k,z){b.dvregion=0;var A=dv_GetParam(l,"useragent");l=window._dv_win.$dvbs.CommonData;if(void 0!=l.BrowserId&&void 0!=l.BrowserVersion&&void 0!=l.BrowserIdFromUserAgent)var n=
{ID:l.BrowserId,version:l.BrowserVersion,ID_UA:l.BrowserIdFromUserAgent};else n=U(A?decodeURIComponent(A):navigator.userAgent),l.BrowserId=n.ID,l.BrowserVersion=n.version,l.BrowserIdFromUserAgent=n.ID_UA;var q="";void 0!=b.aUrl&&(q="&aUrl="+b.aUrl);var u="";try{e.depth=V(e);var t=W(e,d,n);if(t&&t.duration){var v="&dvp_strhd="+t.duration;v+="&dvpx_strhd="+t.duration}t&&t.url||(t=X(e));t&&t.url&&(q="&aUrl="+encodeURIComponent(t.url),u="&aUrlD="+t.depth);var x=e.depth+c;p&&e.depth--}catch(E){v=u=q=x=
e.depth=""}c=K();p=function(){function a(c){b++;var d=c.parent==c;return c.mraid||d?c.mraid:20>=b&&a(c.parent)}var c=window._dv_win||window,b=0;try{return a(c)}catch(ia){}}();var l=b.script.src;c="&ctx="+(dv_GetParam(l,"ctx")||"")+"&cmp="+(dv_GetParam(l,"cmp")||"")+"&plc="+(dv_GetParam(l,"plc")||"")+"&sid="+(dv_GetParam(l,"sid")||"")+"&advid="+(dv_GetParam(l,"advid")||"")+"&adsrv="+(dv_GetParam(l,"adsrv")||"")+"&unit="+(dv_GetParam(l,"unit")||"")+"&isdvvid="+(dv_GetParam(l,"isdvvid")||"")+"&uid="+
b.uid+"&tagtype="+(dv_GetParam(l,"tagtype")||"")+"&adID="+(dv_GetParam(l,"adID")||"")+"&app="+(dv_GetParam(l,"app")||"")+"&sup="+(dv_GetParam(l,"sup")||"")+"&isovv="+c+"&gmnpo="+(dv_GetParam(l,"gmnpo")||"")+"&crt="+(dv_GetParam(l,"crt")||"");c+="&"+r.READYSTATE_AT_VERIFY_REQUEST+"="+document.readyState+"&dvp_intrst=1&dvp_ttp="+(dv_GetParam(l,"dvp_ttp")||"");"1"==dv_GetParam(l,"foie")&&(c+="&foie=1");p&&(c+="&ismraid=1");(p=dv_GetParam(l,"xff"))&&(c+="&xff="+p);(p=dv_GetParam(l,"vssd"))&&(c+="&vssd="+
p);(p=dv_GetParam(l,"apifw"))&&(c+="&apifw="+p);(p=dv_GetParam(l,"vstvr"))&&(c+="&vstvr="+p);(p=dv_GetParam(l,"tvcp"))&&(c+="&tvcp="+p);k&&(c+="&urlsrc=sf");z&&(c+="&sfe=1");navigator&&navigator.maxTouchPoints&&5==navigator.maxTouchPoints&&(c+="&touch=1");navigator&&navigator.platform&&(c+="&nav_pltfrm="+navigator.platform);v&&(c+=v);A&&(c+="&useragent="+A);n&&(c+="&brid="+n.ID+"&brver="+n.version+"&bridua="+n.ID_UA);c+="&dup="+dv_GetParam(l,"dup");try{c+=dv_AppendIQPAParams(l)}catch(E){}(k=dv_GetParam(l,
"turl"))&&(c+="&turl="+k);(k=dv_GetParam(l,"tagformat"))&&(c+="&tagformat="+k);"video"===dv_GetParam(l,"tagtype")&&(c+="&DVP_BYPASS219=1");c+=Y();m=m?"&dvf=0":"";k=h("maple")?"&dvf=1":"";f=(window._dv_win.dv_config.verifyJSURL||"https://"+(window._dv_win.dv_config.bsAddress||"rtb"+b.dvregion+".doubleverify.com")+"/verify.js")+"?flvr=0&jsCallback="+b.callbackName+"&jsTagObjCallback="+b.tagObjectCallbackName+"&num=6"+c+"&srcurlD="+e.depth+"&ssl="+b.ssl+m+k+"&refD="+x+b.tagIntegrityFlag+b.tagHasPassbackFlag+
"&htmlmsging="+(f?"1":"0")+"&tstype="+M(window._dv_win);(x=dv_GetDynamicParams(l,"dvp").join("&"))&&(f+="&"+x);(x=dv_GetDynamicParams(l,"dvpx").join("&"))&&(f+="&"+x);if(!1===g||w)f=f+("&dvp_isBodyExistOnLoad="+(g?"1":"0"))+("&dvp_isOnHead="+(w?"1":"0"));d="srcurl="+encodeURIComponent(d);(g=Z())&&(d+="&ancChain="+encodeURIComponent(g));(e=aa(e))&&(d+="&canurl"+encodeURIComponent(e));e=4E3;/MSIE (\d+\.\d+);/.test(navigator.userAgent)&&7>=new Number(RegExp.$1)&&(e=2E3);if(g=dv_GetParam(l,"referrer"))g=
"&referrer="+g,f.length+g.length<=e&&(f+=g);(g=dv_GetParam(l,"prr"))&&(f+="&prr="+g);(g=dv_GetParam(l,"iframe"))&&(f+="&iframe="+g);(g=dv_GetParam(l,"gdpr"))&&(f+="&gdpr="+g);(g=dv_GetParam(l,"gdpr_consent"))&&(f+="&gdpr_consent="+g);q.length+u.length+f.length<=e&&(f+=u,d+=q);(q=ba())&&(f+="&m1="+q);(q=ca())&&0<q.f&&(f+="&bsig="+q.f,f+="&usig="+q.s);q=da();0<q&&(f+="&hdsig="+q);navigator&&navigator.hardwareConcurrency&&(f+="&noc="+navigator.hardwareConcurrency);f+=ea();q=fa();f+="&vavbkt="+q.vdcd;
f+="&lvvn="+q.vdcv;""!=q.err&&(f+="&dvp_idcerr="+encodeURIComponent(q.err));"prerender"===window._dv_win.document.visibilityState&&(f+="&prndr=1");(l=dv_GetParam(l,"wrapperurl"))&&1E3>=l.length&&f.length+l.length<=e&&(f+="&wrapperurl="+l);f+="&"+a.getVersionParamName()+"="+a.getVersion();a="&eparams="+encodeURIComponent(H(d));f=f.length+a.length<=e?f+a:f+"&dvf=3";window.performance&&window.performance.mark&&window.performance.measure&&window.performance.getEntriesByName&&(window.performance.mark("dv_create_req_end"),
window.performance.measure("dv_creqte_req","dv_create_req_start","dv_create_req_end"),(a=window.performance.getEntriesByName("dv_creqte_req"))&&0<a.length&&(f+="&dvp_exetime="+a[0].duration.toFixed(2)));for(var y in b)b.hasOwnProperty(y)&&void 0!==b[y]&&-1<["number","string"].indexOf(typeof b[y])&&-1===["protocol","callbackName","dvregion"].indexOf(y.toLowerCase())&&!y.match(/^tag[A-Z]/)&&!(new RegExp("(\\?|&)"+y+"=","gi")).test(f)&&(f+=["&",y,"=",encodeURIComponent(b[y])].join(""));return{isSev1:!1,
url:f}}function Y(){var a="";try{var b=window._dv_win.parent;a+="&chro="+(void 0===b.chrome?"0":"1");a+="&hist="+(b.history?b.history.length:"");a+="&winh="+b.innerHeight;a+="&winw="+b.innerWidth;a+="&wouh="+b.outerHeight;a+="&wouw="+b.outerWidth;b.screen&&(a+="&scah="+b.screen.availHeight,a+="&scaw="+b.screen.availWidth)}catch(d){}return a}function fa(){var a=[],b=function(a){e(a,null!=a.AZSD,9);e(a,a.location.hostname!=a.encodeURIComponent(a.location.hostname),10);e(a,null!=a.cascadeWindowInfo,
11);e(a,null!=a._rvz,32);e(a,null!=a.FO_DOMAIN,34);e(a,null!=a.va_subid,36);e(a,a._GPL&&a._GPL.baseCDN,40);e(a,d(a,"__twb__")&&d(a,"__twb_cb_"),43);e(a,null!=a.landingUrl&&null!=a.seList&&null!=a.parkingPPCTitleElements&&null!=a.allocation,45);e(a,d(a,"_rvz",function(a){return null!=a.publisher_subid}),46);e(a,null!=a.cacildsFunc&&null!=a.n_storesFromFs,47);e(a,a._pcg&&a._pcg.GN_UniqueId,54);e(a,d(a,"__ad_rns_")&&d(a,"_$_"),64);e(a,null!=a.APP_LABEL_NAME_FULL_UC,71);e(a,null!=a._priam_adblock,81);
e(a,a.supp_ads_host&&a.supp_ads_host_overridden,82);e(a,a.uti_xdmsg_manager&&a.uti_xdmsg_manager.cb,87);e(a,a.LogBundleData&&a.addIframe,91);e(a,a.xAdsXMLHelperId||a.xYKAffSubIdTag,95);e(a,a.__pmetag&&a.__pmetag.uid,98);e(a,a.CustomWLAdServer&&/(n\d{1,4}adserv)|(1ads|cccpmo|epommarket|epmads|adshost1)/.test(a.supp_ads_host_overridden),100)},d=function(a,b,d){for(var c in a)if(-1<c.indexOf(b)&&(!d||d(a[c])))return!0;return!1},e=function(b,d,e){d&&-1==a.indexOf(e)&&a.push((b==window.top?-1:1)*e)};try{return function(){for(var a=
window,d=0;10>d&&(b(a),a!=window.top);d++)try{a.parent.document&&(a=a.parent)}catch(f){break}}(),{vdcv:28,vdcd:a.join(","),err:void 0}}catch(c){return{vdcv:28,vdcd:"-999",err:c.message||"unknown"}}}function V(a){for(var b=0;10>b&&a!=window._dv_win.top;)b++,a=a.parent;return b}function M(a){if(a==window._dv_win.top)return $dvbs.Enums.TrafficScenario.OnPage;try{for(var b=0;window._dv_win.top!=a&&10>=b;){var d=a.parent;if(!d.document)break;a=d;b++}}catch(e){}return a==window._dv_win.top?$dvbs.Enums.TrafficScenario.SameDomain:
$dvbs.Enums.TrafficScenario.CrossDomain}function W(a,b,d){try{if(d.ID==$dvbs.Enums.BrowserId.IE||M(a)!=$dvbs.Enums.TrafficScenario.CrossDomain)return null;a.performance&&a.performance.mark&&a.performance.mark("dv_str_html_start");if(b){var e=b.toString().match(/^(?:https?:\/\/)?[\w\-\.]+\/[a-zA-Z0-9]/gi);if(e&&0<e.length)return null}var c=a.document;if(c&&c.referrer){var p=c.referrer.replace(/\//g,"\\/").replace(/\./g,"\\."),f=new RegExp('(?:w{0,4}=")?'+p+"[^&\"; %,'\\$\\\\\\|]+","gi");b=/banner|adprefs|safeframe|sandbox|sf\.html/gi;
d=/^\w{0,4}="/gi;var g=N(c,"script","src",f,b,d);if(!g){var h=c.referrer;e="";var m=c.getElementsByTagName("script");if(m)for(p=0;!e&&p<m.length;){var k=m[p].innerHTML;if(k&&-1!=k.indexOf(h)){var z=k.match(f);e=O(z,b,d)}p++}(g=e)||(g=N(c,"a","href",f,b,d))}var A=g;a:{if(a.performance&&a.performance.mark&&a.performance.measure&&a.performance.getEntriesByName){a.performance.mark("dv_str_html_end");a.performance.measure("dv_str_html","dv_str_html_start","dv_str_html_end");var n=a.performance.getEntriesByName("dv_str_html");
if(n&&0<n.length){var q=n[0].duration.toFixed(2);break a}}q=null}return{url:A,depth:-1,duration:q}}}catch(F){}return null}function O(a,b,d){var e="";if(a&&0<a.length)for(var c=0;c<a.length;c++){var p=a[c];p.length>e.length&&null==p.match(b)&&0!=p.indexOf('src="')&&0!=p.indexOf('turl="')&&(e=p.replace(d,""))}return e}function N(a,b,d,e,c,p){a=a.querySelectorAll(b+"["+d+'*="'+a.referrer+'"]');var f="";if(a)for(b=0;!f&&b<a.length;)f=a[b][d].match(e),f=O(f,c,p),b++;return f}function X(a){try{if(1>=a.depth)return{url:"",
depth:""};var b=[];b.push({win:window._dv_win.top,depth:0});for(var d,e=1,c=0;0<e&&100>c;){try{if(c++,d=b.shift(),e--,0<d.win.location.toString().length&&d.win!=a)return 0==d.win.document.referrer.length||0==d.depth?{url:d.win.location,depth:d.depth}:{url:d.win.document.referrer,depth:d.depth-1}}catch(g){}var p=d.win.frames.length;for(var f=0;f<p;f++)b.push({win:d.win.frames[f],depth:d.depth+1}),e++}return{url:"",depth:""}}catch(g){return{url:"",depth:""}}}function Z(){var a=window._dv_win[H("=@42E:@?")][H("2?46DE@C~C:8:?D")];
if(a&&0<a.length){var b=[];b[0]=window._dv_win.location.protocol+"//"+window._dv_win.location.hostname;for(var d=0;d<a.length;d++)b[d+1]=a[d];return b.reverse().join(",")}return null}function aa(a){return(a=a.document.querySelector("link[rel=canonical]"))?a.href:null}function H(a){new String;var b=new String,d;for(d=0;d<a.length;d++){var e=a.charAt(d);var c="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".indexOf(e);0<=c&&(e="!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~".charAt((c+
47)%94));b+=e}return b}function I(){return Math.floor(1E12*(Math.random()+""))}function U(a){for(var b=[{id:4,brRegex:"OPR|Opera",verRegex:"(OPR/|Version/)"},{id:1,brRegex:"MSIE|Trident/7.*rv:11|rv:11.*Trident/7|Edge/|Edg/",verRegex:"(MSIE |rv:| Edge/|Edg/)"},{id:2,brRegex:"Firefox",verRegex:"Firefox/"},{id:0,brRegex:"Mozilla.*Android.*AppleWebKit(?!.*Chrome.*)|Linux.*Android.*AppleWebKit.* Version/.*Chrome",verRegex:null},{id:0,brRegex:"AOL/.*AOLBuild/|AOLBuild/.*AOL/|Puffin|Maxthon|Valve|Silk|PLAYSTATION|PlayStation|Nintendo|wOSBrowser",
verRegex:null},{id:3,brRegex:"Chrome",verRegex:"Chrome/"},{id:5,brRegex:"Safari|(OS |OS X )[0-9].*AppleWebKit",verRegex:"Version/"}],d=0,e="",c=0;c<b.length;c++)if(null!=a.match(new RegExp(b[c].brRegex))){d=b[c].id;if(null==b[c].verRegex)break;a=a.match(new RegExp(b[c].verRegex+"[0-9]*"));null!=a&&(e=a[0].match(new RegExp(b[c].verRegex)),e=a[0].replace(e[0],""));break}b=ha();4==d&&(b=d);return{ID:b,version:b===d?e:"",ID_UA:d}}function ha(){function a(){var a=!1;try{var b=String.fromCharCode(26*Math.random()+
97),d=Math.random().toString(36).slice(-7);b+=d;var e=document.createElement("iframe");e.srcdoc=b;var h="ontouchstart"in window;a=!!e.contentWindow&&!h}catch(m){}return a}function b(){try{if(null!=window.domAutomation||null!=window.domAutomationController||null!=window._WEBDRIVER_ELEM_CACHE||null!=window.webdriver)return!0;a:{try{var a=/^(\$)?(wdc|cdc)_[a-zA-Z0-9]{16,}_(Array|Object|Promise|Proxy|Symbol|JSON)$/,b;for(b in window)if(b.match(a)){var d=!0;break a}}catch(g){}d=!1}if(d)return!0;if(document.documentElement.hasAttribute)return document.documentElement.hasAttribute("webdriver")||
document.documentElement.hasAttribute("fxdriver")||document.documentElement.hasAttribute("__webdriver_unwrapped")||document.documentElement.hasAttribute("__webdriver_script_fn")||document.documentElement.hasAttribute("__webdriver_evaluate")||document.documentElement.hasAttribute("__fxdriver_evaluate")||document.documentElement.hasAttribute("__fxdriver_unwrapped")||document.documentElement.hasAttribute("__fxdriver_script_fn")}catch(g){}return!1}try{if(a())return 96;if(window.navigator&&window.navigator.webdriver)return 97;
if(b())return 98;if(null!=window._phantom||null!=window.callPhantom||null!=window.__nightmare)return 99;if(void 0!=window.opera&&void 0!=window.history.navigationMode||void 0!=window.opr&&void 0!=window.opr.addons&&"function"==typeof window.opr.addons.installExtension)return 4;if(void 0!=document.uniqueID&&"string"==typeof document.uniqueID&&(void 0!=document.documentMode&&0<=document.documentMode||void 0!=document.all&&"object"==typeof document.all||void 0!=window.ActiveXObject&&"function"==typeof window.ActiveXObject)||
window.document&&window.document.updateSettings&&"function"==typeof window.document.updateSettings||Object.values&&navigator&&Object.values(navigator.plugins).some(function(a){return-1!=a.name.indexOf("Edge PDF")}))return 1;if(void 0!=window.chrome&&"function"==typeof window.chrome.csi&&"function"==typeof window.chrome.loadTimes&&void 0!=document.webkitHidden&&(1==document.webkitHidden||0==document.webkitHidden))return 3;if(void 0!=window.mozInnerScreenY&&"number"==typeof window.mozInnerScreenY&&
void 0!=window.mozPaintCount&&0<=window.mozPaintCount&&void 0!=window.InstallTrigger&&void 0!=window.InstallTrigger.install)return 2;var d=!1;try{var e=document.createElement("p");e.innerText=".";e.style="text-shadow: rgb(99, 116, 171) 20px -12px 2px";d=void 0!=e.style.textShadow}catch(c){}return(0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")||window.webkitAudioPannerNode&&window.webkitConvertPointFromNodeToPage)&&d&&void 0!=window.innerWidth&&void 0!=window.innerHeight?
5:0}catch(c){return 0}}function ba(){try{var a=0,b=function(b,c){c&&32>b&&(a=(a|1<<b)>>>0)},d=function(a,b){return function(){return a.apply(b,arguments)}},e="svg"===document.documentElement.nodeName.toLowerCase(),c=function(){return"function"!==typeof document.createElement?document.createElement(arguments[0]):e?document.createElementNS.call(document,"http://www.w3.org/2000/svg",arguments[0]):document.createElement.apply(document,arguments)},h=["Moz","O","ms","Webkit"],f=["moz","o","ms","webkit"],
g={style:c("modernizr").style},w=function(a,b){function d(a){return a.replace(/([a-z])-([a-z])/g,function(a,b,c){return b+c.toUpperCase()}).replace(/^-/,"")}function e(){k&&(delete g.style,delete g.modElem)}var f;for(f=["modernizr","tspan","samp"];!g.style&&f.length;){var k=!0;g.modElem=c(f.shift());g.style=g.modElem.style}var h=a.length;for(f=0;f<h;f++){var m=a[f];~(""+m).indexOf("-")&&(m=d(m));if(void 0!==g.style[m])return e(),"pfx"==b?m:!0}e();return!1},m=function(a,b,c){var e=a.charAt(0).toUpperCase()+
a.slice(1),k=(a+" "+h.join(e+" ")+e).split(" ");if("string"===typeof b||"undefined"===typeof b)return w(k,b);k=(a+" "+f.join(e+" ")+e).split(" ");for(var g in k)if(k[g]in b){if(!1===c)return k[g];a=b[k[g]];return"function"===typeof a?d(a,c||b):a}return!1};b(0,!0);b(1,m("requestFileSystem",window));b(2,window.CSS?"function"==typeof window.CSS.escape:!1);b(3,m("shapeOutside","content-box",!0));return a}catch(k){return 0}}function J(){var a=window,b=0;try{for(;a.parent&&a!=a.parent&&a.parent.document&&
!(a=a.parent,10<b++););}catch(d){}return a}function ca(){try{var a=J(),b=0,d=0,e=function(a,c,e){e&&(b+=Math.pow(2,a),d+=Math.pow(2,c))},c=a.document;e(14,0,a.playerInstance&&c.querySelector('script[src*="ads-player.com"]'));e(14,1,(a.CustomWLAdServer||a.DbcbdConfig)&&function(){var a=c.querySelector('p[class="footerCopyright"]');return a&&a.textContent.match(/ MangaLife 2016/)}());e(15,2,a.zpz&&a.zpz.createPlayer);e(15,3,a.vdApp&&a.vdApp.createPlayer);e(15,4,c.querySelector('body>div[class="z-z-z"]'));
e(16,5,a.xy_checksum&&a.place_player&&(a.logjwonready&&a.logContentPauseRequested||a.jwplayer));e(17,6,function(){var b=c.querySelector('body>object[id="player"]');return a==a.top&&""==c.title?b&&b.data&&1<b.data.indexOf("jwplayer")&&"visibility: visible;"==b.getAttribute("style"):!1}());e(17,7,c.querySelector('script[src*="sitewebvideo.com"]'));e(17,8,a.InitPage&&a.cef&&a.InitAd);e(17,9,function(){var b=c.querySelector("body>#player");return a==a.top&&""==c.title?null!=b&&null!=(null!=b.querySelector('div[id*="opti-ad"]')||
b.querySelector('iframe[src="about:blank"]')):!1}());e(17,10,function(){var b=c.querySelector('body>div[id="kt_player"]');return a==a.top&&""==c.title&&a.InitAdPlayer?null!=b&&null!=b.querySelector('div[class="flash-blocker"]'):!1}());e(17,11,null!=a.clickplayer&&null!=a.checkRdy2);e(19,12,a.instance&&a.inject&&c.querySelector('path[id="cp-search-0"]'));e(20,13,function(){try{if(a.top==a&&0<a.document.getElementsByClassName("asu").length)for(var b=a.document.styleSheets,c=0;c<b.length;c++)for(var d=
a.document.styleSheets[c].cssRules,e=0;e<d.length;e++)if("div.kk"==d[e].selectorText||"div.asu"==d[e].selectorText)return!0}catch(q){}}());a:{try{var h=null!=c.querySelector('div[id="kt_player"][hiegth]');break a}catch(k){}h=void 0}e(21,14,h);a:{try{var f=a.top==a&&null!=a.document.querySelector('div[id="asu"][class="kk"]');break a}catch(k){}f=void 0}e(22,15,f);a:{try{var g=c.querySelector('object[data*="/VPAIDFlash.swf"]')&&c.querySelector('object[id*="vpaid_video_flash_tester_el"]')&&c.querySelector('div[id*="desktopSubModal"]');
break a}catch(k){}g=void 0}e(25,16,g);var w=navigator.userAgent;if(w&&-1<w.indexOf("Android")&&-1<w.indexOf(" wv)")&&a==window.top){var m=c.querySelector('img[src*="dealsneartome.com"]')||(a.__cads__?!0:!1)||0<c.querySelectorAll('img[src*="/tracker?tag="]').length;e(28,17,m||!1)}return{f:b,s:d}}catch(k){return null}}function da(){try{var a=J(),b=0,d=a.document;a==window.top&&""==d.title&&!d.querySelector("meta[charset]")&&d.querySelector('div[style*="background-image: url("]')&&(d.querySelector('script[src*="j.pubcdn.net"]')||
d.querySelector('span[class="ad-close"]'))&&(b+=Math.pow(2,6));return b}catch(e){return null}}function ea(){try{var a="&fcifrms="+window.top.length;window.history&&(a+="&brh="+window.history.length);var b=J(),d=b.document;if(b==window.top){a+="&fwc="+((b.FB?1:0)+(b.twttr?2:0)+(b.outbrain?4:0)+(b._taboola?8:0));try{d.cookie&&(a+="&fcl="+d.cookie.length)}catch(e){}b.performance&&b.performance.timing&&0<b.performance.timing.domainLookupStart&&0<b.performance.timing.domainLookupEnd&&(a+="&flt="+(b.performance.timing.domainLookupEnd-
b.performance.timing.domainLookupStart));d.querySelectorAll&&(a+="&fec="+d.querySelectorAll("*").length)}return a}catch(e){return""}}var C=this,r={VPAID_FLOW_INIT:"ee_dp_vfinit",VPAID_CB_CALLED:"ee_dp_vcbc",PARTNER_CB_CALLED:"ee_dp_pcbc",SUBSCRIBED_TO_ADSTART:"ee_dp_subadstrt",MONITORING_INIT:"ee_dp_moninit",AD_STARTED:"ee_dp_adstrt",CB_STATE:"ee_dp_cbst",WAS_CALLBACK_CALLED:"ee_dp_wcb",C_START_TIMESTAMP:"ee_dp_cst",C_END_TIMESTAMP:"ee_dp_cet",D_RECEIVED_TIMESTAMP:"ee_dp_drt",WAS_AD_PLAYED:"ee_dp_wap",
AD_ID:"ee_dp_adid",AD_ID_TYPE:"ee_dp_adidt",AD_ERROR:"ee_dp_ader",AD_STOPPED:"ee_dp_adstp",AD_VIDEO_START:"ee_dp_avse",AD_IMPRESSION:"ee_dp_aie",BLOCKING_DECISION_USED:"ee_dp_bdu",PREVIOUS_EVENTS:"ee_dp_prvevnts",DVM_INJECT_FLOW:"ee_dp_dvm_inj",READYSTATE_AT_VERIFY_REQUEST:"ee_dp_rdystreq",READYSTATE_AT_VERIFY_RESPONSE:"ee_dp_rdystres",ADTAG_CONTENT_ADDED_TO_DOM:"ee_dp_atcatd",CLIENT_AD_SIZE:"ee_dp_bcss",SERVER_AD_SIZE:"ee_dp_bssds"},x={VERIFY_LOAD_JSONP_CALLBACK_FAILED:1,VERIFY_FAILED_TO_LOAD:2,
INNOVID_CALLBACK_INIT_EXCEPTION:4,INNOVID_CALLBACK_EXCEPTION:8,INNOVID_CALLBACK_NOT_A_FUNCTION:16,INNOVID_CALLBACK_EX_ERR:32,INNOVID_CALLBACK_MISSING:64,INJECT_SCRIPT_ERROR:128,INIT_SCRIPT_ERROR:256,AD_RENDERED_UPON_VERIFY_FAILURE:512,SEND_VERIFY_REQUEST_FAILURE:1024,VIDEO_BLOCKING_CALLBACK_ERROR:4096,BLOCKING_MAIN_ERROR:8192},B=function(){function a(a,b,d){var f=[];d&&h.forEach(function(a){var b=dv_GetParam(d,a);""!==b&&null!==b&&f.push(["dvp_"+a,b].join("="))});var g=window&&window._dv_win||{};
g=g.dv_config=g.dv_config||{};g=dv_getDVBSErrAddress(g);var k=[c,e].join("=");a=["cerrt",a].join("=");b=["cemsg",b].join("=");g+=["/verify.js?flvr=0&ctx=818052&cmp=1619415&dvp_isLostImp=1&ssl=1",k,a,b,f.join("&")].join("&");(new Image(1,1)).src="https://"+g}function b(b,c){var d=window._dv_win.dv_config.bs_renderingMethod||function(a){document.write(a)};c="AdRenderedUponVerifyFailure__"+(c||"");if(C&&C.tagParamsObj&&C.tagParamsObj.tagAdtag)try{d(C.tagParamsObj.tagAdtag)}catch(z){c+="__RenderingMethodFailed"}else C?
C.tagParamsObj?C.tagParamsObj.tagAdtag||(c+="__HandlerTagParamsObjTagAdtag__Undefined"):c+="__HandlerTagParamsObj__Undefined":c+="__Handler__Undefined";a(x.AD_RENDERED_UPON_VERIFY_FAILURE,c,b)}var d=!1,e,c,h=["ctx","cmp","plc","sid"],f=[C.constructor&&C.constructor.name||"UKDV","__",I()].join(""),g={onResponse:function(c){d||(a(x.VERIFY_LOAD_JSONP_CALLBACK_FAILED,"VerifyCallbackFailed",c),b(c,"VCF"))},onError:function(c){a(x.VERIFY_FAILED_TO_LOAD,"VerifyFailedToLoad",c);b(c,"VFTL")}};g.reportError=
a;g.isJSONPCalled=d;window._dv_win[f]={globalScopeVerifyErrorHandler:g};return{setVersionData:function(a,b){c=a;e=b},setIsJSONPCalled:function(a){d=a},getIsJSONPCalled:function(){return d},onLoad:dv_onResponse,onError:dv_onError,uniqueKey:f}}();this.createRequest=function(){window.performance&&window.performance.mark&&window.performance.mark("dv_create_req_start");var a=!1,b=window._dv_win,d=0,e=!1,c;try{for(c=0;10>=c;c++)if(null!=b.parent&&b.parent!=b)if(0<b.parent.location.toString().length)b=b.parent,
d++,a=!0;else{a=!1;break}else{0==c&&(a=!0);break}}catch(q){a=!1}a:{try{var h=b.$sf;break a}catch(q){}h=void 0}var f=(c=b.location&&b.location.ancestorOrigins)&&c[c.length-1];if(0==b.document.referrer.length)a=b.location;else if(a)a=b.location;else{a=b.document.referrer;a:{try{var g=b.$sf&&b.$sf.ext&&b.$sf.ext.hostURL&&b.$sf.ext.hostURL();break a}catch(q){}g=void 0}if(g&&(!c||0==g.indexOf(f))){a=g;var t=!0}e=!0}if(!window._dv_win.dvbsScriptsInternal||!window._dv_win.dvbsProcessed||0==window._dv_win.dvbsScriptsInternal.length)return{isSev1:!1,
url:null};c=window._dv_win.dv_config&&window._dv_win.dv_config.isUT?window._dv_win.dvbsScriptsInternal[window._dv_win.dvbsScriptsInternal.length-1]:window._dv_win.dvbsScriptsInternal.pop();g=c.script;this.dv_script_obj=c;this.dv_script=g;window._dv_win.dvbsProcessed.push(c);window._dv_win._dvScripts.push(g);f=g.src;this.dvOther=0;this.dvStep=1;var m=window._dv_win.dv_config?window._dv_win.dv_config.dv_GetRnd?window._dv_win.dv_config.dv_GetRnd():I():I();c=window.parent.postMessage&&window.JSON;var k=
{};try{for(var u=/[\?&]([^&]*)=([^&#]*)/gi,r=u.exec(f);null!=r;)"eparams"!==r[1]&&(k[r[1]]=r[2]),r=u.exec(f);var n=k}catch(q){n=k}this.tagParamsObj=n;n.perf=this.perf;n.uid=m;n.script=this.dv_script;n.callbackName="__verify_callback_"+n.uid;n.tagObjectCallbackName="__tagObject_callback_"+n.uid;n.tagAdtag=null;n.tagPassback=null;n.tagIntegrityFlag="";n.tagHasPassbackFlag="";0==(null!=n.tagformat&&"2"==n.tagformat)&&(r=T(n.script),n.tagAdtag=r.tagAdTag,n.tagPassback=r.tagPassback,r.isBadImp?n.tagIntegrityFlag=
"&isbadimp=1":r.hasPassback&&(n.tagHasPassbackFlag="&tagpb=1"));r=(/iPhone|iPad|iPod|\(Apple TV|iOS|Coremedia|CFNetwork\/.*Darwin/i.test(navigator.userAgent)||navigator.vendor&&"apple, inc."===navigator.vendor.toLowerCase())&&!window.MSStream;n.protocol="https:";n.ssl="1";f=n;(m=window._dv_win.dvRecoveryObj)?("2"!=f.tagformat&&(m=m[f.ctx]?m[f.ctx].RecoveryTagID:m._fallback_?m._fallback_.RecoveryTagID:1,1===m&&f.tagAdtag?document.write(f.tagAdtag):2===m&&f.tagPassback&&document.write(f.tagPassback)),
f=!0):f=!1;if(f)return{isSev1:!0};this.dvStep=2;S(n);g=g&&g.parentElement&&g.parentElement.tagName&&"HEAD"===g.parentElement.tagName;this.dvStep=3;return L(this,n,a,b,d,e,c,!0,g,r,t,h)};this.sendRequest=function(a){var b=dv_GetParam(a,"tagformat");if(B)try{B.setVersionData(this.getVersionParamName(),this.getVersion()),b&&"2"==b?$dvbs.domUtilities.addScriptResource(a,document.body,B.onLoad,B.onError,B.uniqueKey):dv_sendScriptRequest(a,B.onLoad,B.onError,B.uniqueKey)}catch(d){b&&"2"==b?$dvbs.domUtilities.addScriptResource(a,
document.body):dv_sendScriptRequest(a)}else b&&"2"==b?$dvbs.domUtilities.addScriptResource(a,document.body):dv_sendScriptRequest(a);return!0};this.isApplicable=function(){return!0};this.onFailure=function(){};var R={RTN:1};window.debugScript&&(window.CreateUrl=L);this.getVersionParamName=function(){return"ver"};this.getVersion=function(){return"186"}};


function dvbs_src_main(dvbs_baseHandlerIns, dvbs_handlersDefs) {

    this.bs_baseHandlerIns = dvbs_baseHandlerIns;
    this.bs_handlersDefs = dvbs_handlersDefs;

    this.exec = function () {
        try {
            window._dv_win = (window._dv_win || window);
            window._dv_win.$dvbs = (window._dv_win.$dvbs || new dvBsType());

            window._dv_win.dv_config = window._dv_win.dv_config || {};
            window._dv_win.dv_config.bsErrAddress = window._dv_win.dv_config.bsAddress || 'rtb0.doubleverify.com';

            var errorsArr = (new dv_rolloutManager(this.bs_handlersDefs, this.bs_baseHandlerIns)).handle();
            if (errorsArr && errorsArr.length > 0)
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verify.js?flvr=0&ctx=818052&cmp=1619415&num=6', errorsArr);
        }
        catch (e) {
            try {
                dv_SendErrorImp(window._dv_win.dv_config.bsErrAddress + '/verify.js?flvr=0&ctx=818052&cmp=1619415&num=6&dvp_isLostImp=1', {cemsg: encodeURIComponent(e)});
            } catch (e) {
            }
        }
    };
};


try {
    window._dv_win = window._dv_win || window;
    var dv_baseHandlerIns = new dv_baseHandler();
	

    var dv_handlersDefs = [];
    (new dvbs_src_main(dv_baseHandlerIns, dv_handlersDefs)).exec();
} catch (e) { }