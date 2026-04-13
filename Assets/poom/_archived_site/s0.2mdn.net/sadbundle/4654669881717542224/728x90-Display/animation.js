// call Adlib.screenshotterEnd() on the last animation code.
// do not delete initAnimation function since this is the first function that will be called after initialization of defaultValues.
// if ever there is a video for this ad, you can use myVideo as the variable to play the video.
// sample tween codes:
// tween.to("#disclaimerWrapper", {opacity:0.99,duration: 1,ease: "power2.out"},"-=1");
// tween.set("#frame1HeadlineWrapper",{opacity:1})
let tween;
let strVar = [];
let headlineSplitText;
removeClass = () => {
     strVar.forEach(val => {
          defaultValues[val] = Adlib.remove_pclass(defaultValues[val]);
     })     
}
function e(obj){
     return document.querySelector(obj);
}
function initAnimation() {
     strVar = ["trigger","ctaColor1","frame1Headline","frame1Subheadline","legal","customVariable","ctaText"];
     //removeClass();
     if (defaultValues.trigger == "Full Image") {
          e("#keyartContent").style.width = creativeSize.split('x')[0]+"px";
          e("#keyartContent").style.height = creativeSize.split('x')[1]+"px";
          e("#bgContent").style.display = "none";
          e("#mainFluidContainer").style.display = "none";
          e("#legalContainer").style.display = "none";
          e("#introContrainer").style.display = "none";
     }
     if (Adlib.isEmpty(defaultValues.frame1Subheadline)) {
          e("#subheadlineContainer").style.display = "none";
          e("#whiteSpaceContainer2").style.display = "none";
     }
     if (Adlib.isEmpty(defaultValues.legal)) {
          e("#legalContainer").style.display = "none";
     }
     let headlineHeight = Adlib.getStyle("headlineContent","height")
     if (headlineHeight < 16) {
          // e("#copiesContainer").style.top = "1px";
          e("#headlineContent").style.top = "-1.5px";
          e("#subheadlineContent").style.top = "2px";
          e("#ctaContainer").style.top = "-1px";
          e("#logoCTAContainer").style.top = "-1px";
     }
     // place all fluid elements before text resize and css attrib.
     e("#ctaContainer").style.backgroundColor = defaultValues.ctaColor1;
     e("#legalContainer").style.opacity = defaultValues.customVariable;
     Adlib.textResize(); // This is optional if your build doesn't use text resize you can delete this
     Adlib.templateCSS(this); // DO NOT DELETE THIS
     startAnimation();
     
}


function callTrackingPixel() {
     var campaignID = Enabler.getParameter("buy");
     var placementID = Enabler.getDartPageId();
     var creativeID = Enabler.getDartCreativeId();
     var siteID = Enabler.getDartSiteId();
     var trackingPixel = "https://pix.pub/t.png?l=DiSC-MAX-CM&u="+campaignID+"_"+placementID+"_"+creativeID+"_"+siteID+"&u1="+vName+"&t="+new Date().getTime()
     var pixel = document.createElement("img");
     pixel.setAttribute("src",trackingPixel);
     pixel.setAttribute("height","1");
     pixel.setAttribute("width","1");
     e("#tracking").appendChild(pixel);
     console.log(pixel);
}

function startAnimation() {  
     callTrackingPixel();
     tween = gsap.timeline();
     if (defaultValues.trigger == "Animated") {
          tween.set("#logoContainer,#ctaContainer,#subheadlineContainer",{opacity:0,y:10}) 
          tween.set("#legalContainer",{opacity:0})
          tween.set("#innerFrame",{opacity:0})
          tween.set("#bgContent",{x:0}) 
          tween.to("#xContent",{scale:2.7,x:80,delay:1,duration:0.8,ease: "power4.inOut",onStart:function(){takeScreenshot()}});  
          tween.to("#xContent",{opacity:0,duration:0.5,ease: "power4.inOut"},"-=0.6");  
          tween.to("#aContent",{scale:18,x:-189,delay:0.02,duration:1,ease: "power4.inOut",onStart:function() {
               gsap.to("#innerFrame",{opacity:1,duration:0.5,delay:-0.2})
          }},"-=0.6");  
          tween.to("#mContent",{scale:1.3,x:-100,duration:1,ease: "power4.inOut"},"-=1.2");  
          tween.to("#mContent",{opacity:0,duration:0.5,ease: "power4.inOut"},"-=1");  

          tween.to("#innerFrame",{css:{"clip-path":"circle(60% at 23.76% 45%)"},duration:1, ease: "power4.inOut",onStart:function() {
               setTimeout(function(){
                    console.log("pause")
                    tween.killTweensOf("#innerFrame");
                    tween.killTweensOf("#aContent");
                    tween.to("#aContent",{scale:6.3,x:-97,duration:1,ease: "power4.inOut"},"-=2.0");
                    tween.to("#innerFrame",{css:{"clip-path":"circle(21% at 37.5% 51%)"},duration:0.2, ease: "power4.inOut",onStart:function() {
                         setTimeout(function() {
                         //      console.log("pause2")
                         //      tween.killTweensOf("#innerFrame");
                         //      tween.killTweensOf("#aContent");
                         tween.to("#aContent",{scale:50,x:-750,duration:1,ease: "power4.inOut"},"-=1.0");
                         tween.to("#innerFrame",{css:{"clip-path":"circle(200% at -35% 50%)"},duration:1, ease: "power4.inOut"},"-=1.8");
                         },20)
                         
                    }},"-=1.8");
               },300)
               
          }},"-=1"); 
          tween.to("#bgContent",{x:35, duration:0.5,ease: "power2.Out"},"-=0.6");


          headlineSplitText = new SplitText("#headlineContent", { type: "lines" }),
          lines = headlineSplitText.lines;
          tween.set("#headlineContent", { perspective: 400 });
          tween.to("#logoContainer",{opacity:1,y:0,duration:0.5},"-=0.7");
          tween.to("#ctaContainer",{opacity:1,y:0,duration:0.5},"-=0.7");
          tween.to("#subheadlineContainer",{opacity:1,y:0,duration:0.6},"-=0.6");
          tween.from(lines,{duration:0.5,opacity:0,y:10,stagger:0.1,onComplete:animationEnd},"-=0.20");
          tween.to("#legalContainer",{opacity:parseFloat(defaultValues.customVariable),y:0,duration:0.6},"-=1.0");
     } else {
          tween.set("#innerFrame",{css:{"clip-path":"circle(232.2% at 50.75% 50%)"}});
          tween.set("#bgContent",{x:35}) 
          setTimeout(animationEnd,1000);
     }
     setTimeout(showMainContent,500);
}
function showMainContent(stat) {
     e("#mainContent").style.opacity = 1;
}
function animationEnd() {
     // call this function on the very end of the last animation.     
     takeScreenshot();
     setTimeout(function() {adlibEnd();},1000);
}