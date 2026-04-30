/* 
* Prebid Custom Configuration
* Author: Ascendeum
* Last updated: 4 June 2020
* SS Dev updated Dec 27 2020
*/
// 'use strict';

// Detect Window Width
var detectWidth = function() {
    return window.screen.width || window.innerWidth || window.document.documentElement.clientWidth || Math.min(window.innerWidth, window.document.documentElement.clientWidth) || window.innerWidth || window.document.documentElement.clientWidth || window.document.getElementsByTagName('body')[0].clientWidth;
}
// Detect Device Category
var detectDevice = function() {
    var width = detectWidth();
    if(width >= 992) return 'Desktop';
    else if(width >= 768) return 'Tablet';
    else return 'Mobile';
}

var deviceWidth = detectWidth();
var deviceName = detectDevice();
var PREBID_TIMEOUT = 1000;
var FAILSAFE_TIMEOUT = 2000;
if(deviceWidth <= 768) PREBID_TIMEOUT = 1500;
var dfpNetwork = 21743024831;
var displayAdLoadCount = 1;
var titleScreenAdCount = 1;
var displayAdLoadCount = 1;
var adsStart = new Date().getTime();
var url = new URL(window.location.href);
var debugVal = (url.searchParams.get("pbjs_debug")=='true') ? true : false;
var respawn_iteration_count = 0;

const cHost = document.location.host,
      proxies = ['eggisthenewblack.com', 'hardshell.life', 'violentegg.club'],
      isAd = proxies.includes(cHost);

/* DFP Config */
var googletag = googletag || {};
googletag.cmd = googletag.cmd || [];
googletag.cmd.push(function() { 
    googletag.pubads().disableInitialLoad();
});
var pbjs = pbjs || {};
pbjs.que = pbjs.que || [];


/* A9 Init */  
apstag.init({
    pubID: 'f1e42d2d-cc72-4aa3-bafc-56a1ea7df08a',
    adServer: 'googletag'
});

/* A9 Vars */
var a9Slots = [];
var a9BidsBack = false;


//Floortest KeyVal Targetting
var floortest_no = true;
var bid_caching = "false";
window.floortest_no = floortest_no;
var floor_test = getFloorTestTargeting();

//enable bid_caching on 20% and floor_test false
if(floor_test=="false"){
    var randomNum = Math.random();
    if (randomNum > 0.8){
        bid_caching = "true";
    }
}

function getFloorTestTargeting(){
    var floor_test = "false";
    var randomNum = Math.random();
    if (randomNum > 0.8){
        //Call on click
        var subRandomNum = Math.random();
        if (subRandomNum > .75){
            floor_test = "4";
        } else if(subRandomNum > .50){
            floor_test = "3";
        } else if(subRandomNum > .25){
            floor_test = "2";
        } else {
            floor_test = "1";
        }
        window.floortest_no = false;
    }
    return floor_test;
}

function setKeyValueTargeting(adUnitSlot, key, value){
    var adSlot = googletag.pubads();
    if(adUnitSlot){
      adSlot = adUnitSlot;
    }
    if(debugVal) console.log('set key '+key+': '+ value);
    adSlot.setTargeting(key, value);
}

const adRenderedEvent = () => {
    return googletag.pubads().addEventListener('slotRenderEnded', (event) => {
        vueApp.disaplyAdEventObject(event);
    });
};

//All Respawn banner
const respawnAdSizes = [[970, 250], [970, 90], [728, 90], [300, 250], [300, 100]];
const adUnits = [{
    adunit: "Respawn_Banner",
    code: "div-gpt-ad-ShellShock_Respawn_Banner",
    mediaTypes: {
        banner: { sizes: respawnAdSizes }
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 16466913 }
    },{
        bidder: "sovrn",
        params: { tagid: "620451" }
    },{
        bidder: "sovrn",
        params: { tagid: "620452" }
    },{
        bidder: "sovrn",
        params: { tagid: "620453" }
    },{
        bidder: "sovrn",
        params: { tagid: "620454" }
	},{
        bidder: "openx",
        params: { unit: "540846146", delDomain: "shellshock-d.openx.net" }
	},
	{
        bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[0] }
    }, {
        bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[1] }
    }, {
        bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[2] }
    }, {
        bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[3] }
    }, {
        bidder: "ix", params: { siteId: "431112", size: respawnAdSizes[4] }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618946-2"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618946-15"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618946-19"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618946-55"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618946-57"
        }
    }, {
        bidder: "triplelift", 
        params: {
            inventoryCode: "Shellshockers_RespawnBanner_HDX"
        }
    }]
}];

// Title AdUnits
const titleAdSizes = [[200, 200], [250, 250], [300, 250]];
const titleAdUnits = [{
    adunit: "ShellShockers_TitleScreen",
    code: "div-gpt-ad-ShellShockers_TitleScreen",
    mediaTypes: {
        banner: { sizes: titleAdSizes }
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 18025487 }
    }, {
		bidder: "openx",
		params: { unit: "540932260", delDomain: "shellshock-d.openx.net" }
	}, {
        bidder: "ix", params: { siteId: "441403", size: titleAdSizes[0] }
    }, {
        bidder: "ix", params: { siteId: "441403", size: titleAdSizes[1] }
    }, {
        bidder: "ix", params: { siteId: "441403", size: titleAdSizes[2] }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618950-13"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618950-14"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618950-15"
        }
    }, {
        bidder: "triplelift", 
        params: {
            inventoryCode: "ShellShockers_TitleScreen_HDX"
        }
    }]
}];


// ChickenNugget AdUnits
const nuggetAdsizes = [[970, 250], [970, 90], [728, 90], [320, 50], [300, 250], [300, 100]];
const chickenNuggetAdUnits = [{
    adunit: "ShellShockers_Chicken_Nugget_Banner",
    code: "div-gpt-ad-ShellShockers_Chicken_Nugget_Banner",
    mediaTypes: {
        banner: { sizes: nuggetAdsizes }
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 18025494 }
    }, {
		bidder: "openx",
		params: { unit: "540932263", delDomain: "shellshock-d.openx.net" }
	}, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdsizes[0] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdsizes[1] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdsizes[2] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdsizes[3] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdsizes[4] }
    }, {
        bidder: "ix", params: { siteId: "431109", size: nuggetAdsizes[5] }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618958-2"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618958-15"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618958-15"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618958-19"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618958-43"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618958-55"
        }
    }, {
        bidder: "rubicon", 
        params: { 
            accountId: "21066", 
            siteId: "316260",
            zoneId: "1618958-57"
        }
    }, {
        bidder: "triplelift", 
        params: {
            inventoryCode: "ShellShockers_ChickenNuggetBanner_HDX"
        }
    }]
}];

// Loading AdUnits
const loadingAdsizes = [[970, 250], [970, 90], [728, 90], [300, 250], [300, 100]];
const loadingAdUnits = [{
    adunit: "ShellShock_LoadingScreen",
    code: "div-gpt-ad-ShellShock_LoadingScreen",
    mediaTypes: {
        banner: { sizes: loadingAdsizes }
    },
    bids: [{
        bidder: "appnexus",
        params: { placementId: 17514968 }
    },{
        bidder: "sovrn",
        params: { tagid: "655160" }
    },{
        bidder: "sovrn",
        params: { tagid: "655161" }
    },{
        bidder: "sovrn",
        params: { tagid: "655162" }
    },{
        bidder: "sovrn",
        params: { tagid: "655163" }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdsizes[0] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdsizes[1] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdsizes[2] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdsizes[3] }
    }, {
        bidder: "ix", params: { siteId: "431113", size: loadingAdsizes[4] }
    }]
}];

// Start HB
function loadAscAdDisplay() {

    if(displayAdLoadCount > 1){
        refreshAd(adUnits); //refresh ad 

    } else {
        initiateHeaderBidding(adUnits);

    }

    displayAdLoadCount ++;
}

// Start title screen header bidding
function loadTitleAdDisplay() {
    if(titleScreenAdCount > 1){
        refreshAd(titleAdUnits); //refresh ad 

    } else {
        initiateHeaderBidding(titleAdUnits);

    }

    titleScreenAdCount ++;
}

// Loading screen display ad
function displayLoadingScreenAd() {
    if(loadingScreenAdCount > 1){
        refreshAd(loadingAdUnits); //refresh ad 

    } else {
        initiateHeaderBidding(loadingAdUnits);

    }

    loadingScreenAdCount ++;
}

// Start the nugget ad. No need for the nugget to refresh
function loadNuggetDisplayAd() {
    initiateHeaderBidding(chickenNuggetAdUnits);
}

/* Refresh Ad */
function refreshAdBid(refreshAdUnitCodes, allAdUnits) {
    pbjs.que.push(function() {
        /* A9 Request Bids */
        var callA9Slots = [];
        var a9SlotLen = a9Slots.length - 1;
        var allAdUnitsLen = allAdUnits.length - 1;
        var refreshSlots = [];

        for (var j = 0; j <= allAdUnitsLen; j++) {
            for (var i = a9SlotLen; i >= 0; i--) {
                if(a9Slots[i].slotID == allAdUnits[j]['code']) callA9Slots.push(a9Slots[i]);
            }
        }

        if(callA9Slots && (callA9Slots.length > 0)){
            apstag.fetchBids({
                slots: callA9Slots,
                timeout: PREBID_TIMEOUT
            }, function(bids) {
                /* A9 Set Bids */
                apstag.setDisplayBids();
                if(debugVal) console.log('BDS back, refresh', bids);
            }); 
        }
        
        //enable bid caching if floor_test value is false
        if(floor_test=="false" && bid_caching == "true"){
            pbjs.setConfig({ useBidCache: true });
        }

        pbjs.requestBids({
            timeout: PREBID_TIMEOUT,
            adUnitCodes: refreshAdUnitCodes,
            bidsBackHandler: function() {
                if(apstag) apstag.setDisplayBids();
                pbjs.setTargetingForGPTAsync(refreshAdUnitCodes);

                for (var j = 0; j <= allAdUnitsLen; j++) {
                    // allAdUnits[j]['refreshcount'] = allAdUnits[j]['refreshcount']+1;
                    // allAdUnits[j]['slot'].setTargeting('refreshIteration', (allAdUnits[j]['refreshcount']).toString() ); //Set Slot Tartgeting
                    
                    //Set key value targeting for Respawn_Banner adunit
                    if(allAdUnits[j]['adunit'] === "Respawn_Banner"){
                        respawn_iteration_count= respawn_iteration_count+1;
                        setKeyValueTargeting(allAdUnits[j]['slot'], 'respawn_iteration', respawn_iteration_count);//Set key value Tartgeting
                        // allAdUnits[j]['slot'].setTargeting('respawn_iteration', respawn_iteration_count); //Set Slot Tartgeting
                    }
                    refreshSlots.push(allAdUnits[j]['slot']);

                    //set key value targeting
                    setKeyValueTargeting(allAdUnits[j]['slot'], 'floortest', floor_test);
                    setKeyValueTargeting(allAdUnits[j]['slot'], 'bid_caching', bid_caching);
                }
                
                if(debugVal) { console.log('Refreshing Ad Unit Codes - '+JSON.stringify(refreshAdUnitCodes)); }
                googletag.pubads().refresh(refreshSlots);
            }
        });
    });
}

//Refresh Ad
function refreshAd(adunits){
    var refreshAdunitsCodes = [];
    var refreshAdunits = [];
    var len = adunits.length;
    for (var i = 0; i < len; i++) {
        if(elementInViewport(adunits[i]['code'])){
            refreshAdunitsCodes.push(adunits[i]['code']);
            refreshAdunits.push(adunits[i]);
        }
    }
    if(refreshAdunitsCodes.length > 0){
        refreshAdBid(refreshAdunitsCodes, refreshAdunits);
    }
}

function initiateHeaderBidding(adunits) {

    if (isAd) {
        // Stop ads on certain hosts
        return;
    }

    googletag.cmd.push(function() {
        var adSlots = [];

        //Prebid Ad Units
        if(adunits){
            for (var i = 0, len = adunits.length; i < len; i++) {
                adunits[i]['slot'] = googletag.defineSlot('/'+dfpNetwork+'/'+adunits[i].adunit, adunits[i].mediaTypes.banner.sizes, adunits[i].code).addService(googletag.pubads());
                googletag.display( adunits[i].code );
                adSlots.push(adunits[i]['slot']);
            }
        }

        // get newly generated IDs - or you can store them in array above of course
        var adSlotCodes = adSlots
            .map( function( slot ) { return slot.getSlotElementId() || ''; } )
            .filter( function( id ) { return id; } );


        pbjs.que.push(function() { 
            pbjs.setConfig({
                debug: debugVal,
                priceGranularity: "high",
                bidderSequence: "random"
            });

            //enable bid caching if floor_test value is false
            if(floor_test=="false" && bid_caching == "true"){
                pbjs.setConfig({ useBidCache: true });
            }
            
            pbjs.addAdUnits(adunits);
            pbjs.requestBids({
                adUnitCodes: adSlotCodes,
                bidsBackHandler: function(bidResponses) {
                    pbjs.setTargetingForGPTAsync( adSlotCodes );
                    googletag.pubads().refresh( adSlots );
                },
                timeout: PREBID_TIMEOUT
            });
        });

        /* A9 Slots */
        if(adunits){
            if(apstag){
                for (var i = 0, len = adunits.length; i < len; i++) {
                    a9Slots.push({
                        slotID: adunits[i].code, 
                        slotName: dfpNetwork+'/'+adunits[i].adunit, 
                        sizes: adunits[i].mediaTypes.banner.sizes
                    });
                }
            }
        }

        /* A9 Request Bids */
        apstag.fetchBids({
            slots: a9Slots,
            timeout: PREBID_TIMEOUT
        }, function(bids) {
            /* A9 Set Bids */
            apstag.setDisplayBids();
            if(debugVal) console.log('BDS back',(new Date()).getTime()-adsStart,bids);
            a9BidsBack = true;
        });


        // Define non prebid adunits to DFP
        googletag.cmd.push(function() {
            //Set respawn_iteration for respawn_banner adunit
            const index = adunits.findIndex(o => o.adunit === 'Respawn_Banner');
            if(index >= 0){
                adSlots[index].setTargeting('respawn_iteration', respawn_iteration_count.toString()); //Set Slot Tartgeting
            }
            
            //Set key value targeting
            setKeyValueTargeting(false, 'floortest', floor_test);
            setKeyValueTargeting(false, 'bid_caching', bid_caching);
        
            // Init DFP
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });
    });
}

// //Check Element Visibility
function elementInViewport(elId) {
    if(debugVal) { console.log('check if element in view: '+elId) }
    var el = document.getElementById(elId);
    if(el){
        const elBounding = el.getBoundingClientRect();
        return (
            elBounding.top >= 0 &&
            elBounding.left >= 0 &&
            elBounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            elBounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}