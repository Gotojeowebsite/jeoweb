"use strict";(function(){try{var record=function(name,detail){aps.get(accountId).queue.push(new CustomEvent(name,{detail}))};const accountId="fc983fef-a09b-46c9-b3c8-44d705e51b5d";window._aps=window._aps||new Map;const aps=window._aps;aps.has(accountId)||aps.set(accountId,{queue:[],store:new Map}),record("_config/requestViewerCountry/define",{"code":"US"});record("analytics/sampling/set",{"rates":{"error":0.001,"status":0.0001}});record("idVendors/enabled/set",{"bidParameterKeys":["liveintent","merkle","intimateMerger","pair","amx","33across","fTrack","captify","publink","anonymised","quantcast","idPlus","unifiedid","ddb_key_638","fabrick","uid","criteo","yahoo","liveRamp","id5","pubcommon","audigent","lightPublisherAudiences","lotame"]});record("idVendors/integration/execute",{"restrictions":{"block":{"dtbHostnames":[]}},"accountId":"fc983fef-a09b-46c9-b3c8-44d705e51b5d","sourceId":"600","countryCode":"US","vendorId":"id5","propertyId":"1743","allowedRegions":undefined,"blockedRegions":["BR"],"vendorLoadedSampleRate":5,"script":function anonymous(
) {
undefined?undefined.includes("US")&&(function anonymous(
) {
var id5PropertyId = '1743';
if (id5PropertyId && id5PropertyId.charAt(0) !== '%') {
    var id5Script = document.createElement('script');
    id5Script.src = '//cdn.id5-sync.com/api/1.0/id5-api.js';
    id5Script['onload'] = function(e) { 
        ID5.init({ partnerId: Number(id5PropertyId) , provider: 'aps' })
    };
    document.head.appendChild(id5Script);
}
})():(!["BR"]||["BR"]&&!["BR"].includes("US"))&&(function anonymous(
) {
var id5PropertyId = '1743';
if (id5PropertyId && id5PropertyId.charAt(0) !== '%') {
    var id5Script = document.createElement('script');
    id5Script.src = '//cdn.id5-sync.com/api/1.0/id5-api.js';
    id5Script['onload'] = function(e) { 
        ID5.init({ partnerId: Number(id5PropertyId) , provider: 'aps' })
    };
    document.head.appendChild(id5Script);
}
})()
}});record("idVendors/integration/execute",{"restrictions":{"block":{"dtbHostnames":[]}},"accountId":"fc983fef-a09b-46c9-b3c8-44d705e51b5d","sourceId":"600","countryCode":"US","vendorId":"pubcommon","propertyId":undefined,"allowedRegions":undefined,"blockedRegions":["BR"],"vendorLoadedSampleRate":5,"script":function anonymous(
) {
undefined?undefined.includes("US")&&(function anonymous(
) {
if (!window.PublisherCommonId) {
    var pubcommonScript = document.createElement('script');
    pubcommonScript.src = '//secure.cdn.fastclick.net/js/pubcid/latest/pubcid.min.js';
    document.head.appendChild(pubcommonScript);
}
})():(!["BR"]||["BR"]&&!["BR"].includes("US"))&&(function anonymous(
) {
if (!window.PublisherCommonId) {
    var pubcommonScript = document.createElement('script');
    pubcommonScript.src = '//secure.cdn.fastclick.net/js/pubcid/latest/pubcid.min.js';
    document.head.appendChild(pubcommonScript);
}
})()
}});record("_config/config/didLoad",undefined)}catch(e){console.error(e)}})();
