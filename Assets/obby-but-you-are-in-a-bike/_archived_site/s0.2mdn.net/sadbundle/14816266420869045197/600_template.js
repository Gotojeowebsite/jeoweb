if (!Enabler.isInitialized()) {
  Enabler.addEventListener(
    studio.events.StudioEvent.INIT,
    enablerInitialized);
} else {
   enablerInitialized();
}
function enablerInitialized() {
  // Enabler initialized.
  // In App ads are rendered offscreen so animation should wait for
  // the visible event. These are simulated with delays in the local
  // environment.
  if (!Enabler.isVisible()) {
    Enabler.addEventListener(
      studio.events.StudioEvent.VISIBLE,
      startAd);
  } else {
     startAd();
  }
}


var container = document.getElementById("container");
container.style.display = 'none';
var communityCount;
var communityTemplate = document.querySelector('.comunHolder');
var communityElement = communityTemplate;
var communityImageTemplate = document.querySelector('.comunImg');
var communityImage = communityImageTemplate;


function buildCommunities(data) {

  document.querySelector(".comunTxt span").innerHTML = dynamicContent.centex_dma_marketwide_Main[0].CTAName + ' ' + ">";
  document.querySelector('.priceK').innerHTML = '$' + dynamicContent.centex_dma_marketwide_Main[0].RegionPriceLow  + ' to ' + '$' + dynamicContent.centex_dma_marketwide_Main[0].RegionPriceHigh;
  communityImage.style.backgroundImage = "url('" + dynamicContent.centex_dma_marketwide_Main[0].RegionImage.Url + "')";

}

//setting up var to use in js//
function startAd(){
  container.style.display = '';
  communityCount =  1;

  bg1 = document.getElementById('bg1');
  txt1 = document.getElementById('txt1');
  ctaBtn = document.getElementById('ctaBtn');

  buildCommunities(devDynamicContent.centex_dma_marketwide_Main[0]);
  // Set small class for long community names
  setTimeout(function () {
    var spans = document.querySelectorAll(".comunTxt > span");

    Array.prototype.forEach.call(spans, function (el, i) {
      if (el.offsetHeight > 70) {
        el.parentNode.parentNode.className += ' small';
        el.parentNode.className += ' small';
      }
    });
  }, 500);

  comunHolder = Array.prototype.slice.call(document.querySelectorAll('.comunHolder'), 0);
  comunImg = Array.prototype.slice.call(document.querySelectorAll('.comunImg'), 0);
  comunLocal = Array.prototype.slice.call(document.querySelectorAll('.comunLocal'), 0);
  comunPrice = Array.prototype.slice.call(document.querySelectorAll('.comunPrice'), 0);

  bdr = document.getElementById('bdr');

  //add listenters for clickthroughs
  container.addEventListener('click', clickIt );
  setUp();


//start inital animation//
  runAnimation();
}

//upfront animation//
function runAnimation(){

 TweenLite.to(bg1, 1, {delay:2.5, x:-300, ease:Linear.easeNone});
 TweenLite.to(txt1, 1, {x:-300, delay:2.5, ease:Linear.easeNone});
 TweenLite.to(logo, 1, {delay:2.5, x:-300,ease:Linear.easeNone});
TweenLite.to(img1, 1, {delay:2.5, x:-300,ease:Linear.easeNone});
}

function setUp(){

  TweenLite.to(comunImg.slice(1), 0, {y:130});
  TweenLite.to(comunLocal.slice(1), 0, {alpha:0});
  TweenLite.to(comunPrice.slice(1), 0, {alpha:0});

}

//clickTags
function clickIt(e){

  Enabler.exitOverride("bgExit", dynamicContent.centex_dma_marketwide_Main[0].RegionURL.Url);
}