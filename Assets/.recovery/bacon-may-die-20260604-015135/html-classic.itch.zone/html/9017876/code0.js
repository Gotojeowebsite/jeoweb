gdjs.MenuCode = {};
gdjs.MenuCode.GDTitleObjects1= [];
gdjs.MenuCode.GDTitleObjects2= [];
gdjs.MenuCode.GDTitleObjects3= [];
gdjs.MenuCode.GDTitleObjects4= [];
gdjs.MenuCode.GDPlaneObjects1= [];
gdjs.MenuCode.GDPlaneObjects2= [];
gdjs.MenuCode.GDPlaneObjects3= [];
gdjs.MenuCode.GDPlaneObjects4= [];
gdjs.MenuCode.GDBlackRectangleObjects1= [];
gdjs.MenuCode.GDBlackRectangleObjects2= [];
gdjs.MenuCode.GDBlackRectangleObjects3= [];
gdjs.MenuCode.GDBlackRectangleObjects4= [];
gdjs.MenuCode.GDGroundObjects1= [];
gdjs.MenuCode.GDGroundObjects2= [];
gdjs.MenuCode.GDGroundObjects3= [];
gdjs.MenuCode.GDGroundObjects4= [];
gdjs.MenuCode.GDBackgroundObjects1= [];
gdjs.MenuCode.GDBackgroundObjects2= [];
gdjs.MenuCode.GDBackgroundObjects3= [];
gdjs.MenuCode.GDBackgroundObjects4= [];
gdjs.MenuCode.GDAuthorLinkObjects1= [];
gdjs.MenuCode.GDAuthorLinkObjects2= [];
gdjs.MenuCode.GDAuthorLinkObjects3= [];
gdjs.MenuCode.GDAuthorLinkObjects4= [];
gdjs.MenuCode.GDStartObjects1= [];
gdjs.MenuCode.GDStartObjects2= [];
gdjs.MenuCode.GDStartObjects3= [];
gdjs.MenuCode.GDStartObjects4= [];
gdjs.MenuCode.GDNewTextObjects1= [];
gdjs.MenuCode.GDNewTextObjects2= [];
gdjs.MenuCode.GDNewTextObjects3= [];
gdjs.MenuCode.GDNewTextObjects4= [];


gdjs.MenuCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("BlackRectangle"), gdjs.MenuCode.GDBlackRectangleObjects2);
{gdjs.evtTools.camera.showLayer(runtimeScene, "Transition");
}{for(var i = 0, len = gdjs.MenuCode.GDBlackRectangleObjects2.length ;i < len;++i) {
    gdjs.MenuCode.GDBlackRectangleObjects2[i].setOpacity(0);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Start"), gdjs.MenuCode.GDStartObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.MenuCode.GDStartObjects2.length;i<l;++i) {
    if ( gdjs.MenuCode.GDStartObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.MenuCode.GDStartObjects2[k] = gdjs.MenuCode.GDStartObjects2[i];
        ++k;
    }
}
gdjs.MenuCode.GDStartObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("BlackRectangle"), gdjs.MenuCode.GDBlackRectangleObjects2);
{gdjs.evtTools.sound.playSoundOnChannel(runtimeScene, "assets\\sfx_swooshing.wav", 1, false, 80, 0.9);
}{for(var i = 0, len = gdjs.MenuCode.GDBlackRectangleObjects2.length ;i < len;++i) {
    gdjs.MenuCode.GDBlackRectangleObjects2[i].getBehavior("Tween").addObjectOpacityTween("FadeOut", 255, "easeInQuad", 1000, false);
}
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("BlackRectangle"), gdjs.MenuCode.GDBlackRectangleObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.MenuCode.GDBlackRectangleObjects1.length;i<l;++i) {
    if ( gdjs.MenuCode.GDBlackRectangleObjects1[i].getBehavior("Tween").hasFinished("FadeOut") ) {
        isConditionTrue_0 = true;
        gdjs.MenuCode.GDBlackRectangleObjects1[k] = gdjs.MenuCode.GDBlackRectangleObjects1[i];
        ++k;
    }
}
gdjs.MenuCode.GDBlackRectangleObjects1.length = k;
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}}

}


};gdjs.MenuCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Ground"), gdjs.MenuCode.GDGroundObjects1);
{for(var i = 0, len = gdjs.MenuCode.GDGroundObjects1.length ;i < len;++i) {
    gdjs.MenuCode.GDGroundObjects1[i].setXOffset(gdjs.MenuCode.GDGroundObjects1[i].getXOffset() + (100 * gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene)));
}
}}

}


};gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDAuthorLinkObjects2Objects = Hashtable.newFrom({"AuthorLink": gdjs.MenuCode.GDAuthorLinkObjects2});
gdjs.MenuCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10382692);
}
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.MenuCode.GDAuthorLinkObjects2, gdjs.MenuCode.GDAuthorLinkObjects3);

{for(var i = 0, len = gdjs.MenuCode.GDAuthorLinkObjects3.length ;i < len;++i) {
    gdjs.MenuCode.GDAuthorLinkObjects3[i].setOutline("0;0;255", 3);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if (isConditionTrue_0) {
{gdjs.evtTools.window.openURL("https://www.youtube.com/channel/UCsZ4Ue8c94YLJDbGRafCI5Q", runtimeScene);
}}

}


};gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDAuthorLinkObjects1Objects = Hashtable.newFrom({"AuthorLink": gdjs.MenuCode.GDAuthorLinkObjects1});
gdjs.MenuCode.eventsList3 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("AuthorLink"), gdjs.MenuCode.GDAuthorLinkObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDAuthorLinkObjects2Objects, runtimeScene, true, false);
if (isConditionTrue_0) {

{ //Subevents
gdjs.MenuCode.eventsList2(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("AuthorLink"), gdjs.MenuCode.GDAuthorLinkObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.MenuCode.mapOfGDgdjs_9546MenuCode_9546GDAuthorLinkObjects1Objects, runtimeScene, true, true);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10383948);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.MenuCode.GDAuthorLinkObjects1 */
{for(var i = 0, len = gdjs.MenuCode.GDAuthorLinkObjects1.length ;i < len;++i) {
    gdjs.MenuCode.GDAuthorLinkObjects1[i].setOutline("0;0;255", 0);
}
}}

}


};gdjs.MenuCode.eventsList4 = function(runtimeScene) {

{


gdjs.MenuCode.eventsList0(runtimeScene);
}


{


gdjs.MenuCode.eventsList1(runtimeScene);
}


{


gdjs.MenuCode.eventsList3(runtimeScene);
}


};

gdjs.MenuCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.MenuCode.GDTitleObjects1.length = 0;
gdjs.MenuCode.GDTitleObjects2.length = 0;
gdjs.MenuCode.GDTitleObjects3.length = 0;
gdjs.MenuCode.GDTitleObjects4.length = 0;
gdjs.MenuCode.GDPlaneObjects1.length = 0;
gdjs.MenuCode.GDPlaneObjects2.length = 0;
gdjs.MenuCode.GDPlaneObjects3.length = 0;
gdjs.MenuCode.GDPlaneObjects4.length = 0;
gdjs.MenuCode.GDBlackRectangleObjects1.length = 0;
gdjs.MenuCode.GDBlackRectangleObjects2.length = 0;
gdjs.MenuCode.GDBlackRectangleObjects3.length = 0;
gdjs.MenuCode.GDBlackRectangleObjects4.length = 0;
gdjs.MenuCode.GDGroundObjects1.length = 0;
gdjs.MenuCode.GDGroundObjects2.length = 0;
gdjs.MenuCode.GDGroundObjects3.length = 0;
gdjs.MenuCode.GDGroundObjects4.length = 0;
gdjs.MenuCode.GDBackgroundObjects1.length = 0;
gdjs.MenuCode.GDBackgroundObjects2.length = 0;
gdjs.MenuCode.GDBackgroundObjects3.length = 0;
gdjs.MenuCode.GDBackgroundObjects4.length = 0;
gdjs.MenuCode.GDAuthorLinkObjects1.length = 0;
gdjs.MenuCode.GDAuthorLinkObjects2.length = 0;
gdjs.MenuCode.GDAuthorLinkObjects3.length = 0;
gdjs.MenuCode.GDAuthorLinkObjects4.length = 0;
gdjs.MenuCode.GDStartObjects1.length = 0;
gdjs.MenuCode.GDStartObjects2.length = 0;
gdjs.MenuCode.GDStartObjects3.length = 0;
gdjs.MenuCode.GDStartObjects4.length = 0;
gdjs.MenuCode.GDNewTextObjects1.length = 0;
gdjs.MenuCode.GDNewTextObjects2.length = 0;
gdjs.MenuCode.GDNewTextObjects3.length = 0;
gdjs.MenuCode.GDNewTextObjects4.length = 0;

gdjs.MenuCode.eventsList4(runtimeScene);

return;

}

gdjs['MenuCode'] = gdjs.MenuCode;
