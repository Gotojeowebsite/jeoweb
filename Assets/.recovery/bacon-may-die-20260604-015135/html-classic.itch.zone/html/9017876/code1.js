gdjs.GameCode = {};
gdjs.GameCode.GDTappyPlaneObjects1= [];
gdjs.GameCode.GDTappyPlaneObjects2= [];
gdjs.GameCode.GDTappyPlaneObjects3= [];
gdjs.GameCode.GDTappyPlaneObjects4= [];
gdjs.GameCode.GDTappyPlaneObjects5= [];
gdjs.GameCode.GDTopPillarObjects1= [];
gdjs.GameCode.GDTopPillarObjects2= [];
gdjs.GameCode.GDTopPillarObjects3= [];
gdjs.GameCode.GDTopPillarObjects4= [];
gdjs.GameCode.GDTopPillarObjects5= [];
gdjs.GameCode.GDBottomPillarObjects1= [];
gdjs.GameCode.GDBottomPillarObjects2= [];
gdjs.GameCode.GDBottomPillarObjects3= [];
gdjs.GameCode.GDBottomPillarObjects4= [];
gdjs.GameCode.GDBottomPillarObjects5= [];
gdjs.GameCode.GDFinalScoreObjects1= [];
gdjs.GameCode.GDFinalScoreObjects2= [];
gdjs.GameCode.GDFinalScoreObjects3= [];
gdjs.GameCode.GDFinalScoreObjects4= [];
gdjs.GameCode.GDFinalScoreObjects5= [];
gdjs.GameCode.GDCurrentScoreObjects1= [];
gdjs.GameCode.GDCurrentScoreObjects2= [];
gdjs.GameCode.GDCurrentScoreObjects3= [];
gdjs.GameCode.GDCurrentScoreObjects4= [];
gdjs.GameCode.GDCurrentScoreObjects5= [];
gdjs.GameCode.GDHighScoreObjects1= [];
gdjs.GameCode.GDHighScoreObjects2= [];
gdjs.GameCode.GDHighScoreObjects3= [];
gdjs.GameCode.GDHighScoreObjects4= [];
gdjs.GameCode.GDHighScoreObjects5= [];
gdjs.GameCode.GDHighScoreChangedObjects1= [];
gdjs.GameCode.GDHighScoreChangedObjects2= [];
gdjs.GameCode.GDHighScoreChangedObjects3= [];
gdjs.GameCode.GDHighScoreChangedObjects4= [];
gdjs.GameCode.GDHighScoreChangedObjects5= [];
gdjs.GameCode.GDRestartButtonObjects1= [];
gdjs.GameCode.GDRestartButtonObjects2= [];
gdjs.GameCode.GDRestartButtonObjects3= [];
gdjs.GameCode.GDRestartButtonObjects4= [];
gdjs.GameCode.GDRestartButtonObjects5= [];
gdjs.GameCode.GDSubmitScoreButtonObjects1= [];
gdjs.GameCode.GDSubmitScoreButtonObjects2= [];
gdjs.GameCode.GDSubmitScoreButtonObjects3= [];
gdjs.GameCode.GDSubmitScoreButtonObjects4= [];
gdjs.GameCode.GDSubmitScoreButtonObjects5= [];
gdjs.GameCode.GDFlashObjects1= [];
gdjs.GameCode.GDFlashObjects2= [];
gdjs.GameCode.GDFlashObjects3= [];
gdjs.GameCode.GDFlashObjects4= [];
gdjs.GameCode.GDFlashObjects5= [];
gdjs.GameCode.GDGameOverLabelObjects1= [];
gdjs.GameCode.GDGameOverLabelObjects2= [];
gdjs.GameCode.GDGameOverLabelObjects3= [];
gdjs.GameCode.GDGameOverLabelObjects4= [];
gdjs.GameCode.GDGameOverLabelObjects5= [];
gdjs.GameCode.GDInstructionsObjects1= [];
gdjs.GameCode.GDInstructionsObjects2= [];
gdjs.GameCode.GDInstructionsObjects3= [];
gdjs.GameCode.GDInstructionsObjects4= [];
gdjs.GameCode.GDInstructionsObjects5= [];
gdjs.GameCode.GDBackgroundObjects1= [];
gdjs.GameCode.GDBackgroundObjects2= [];
gdjs.GameCode.GDBackgroundObjects3= [];
gdjs.GameCode.GDBackgroundObjects4= [];
gdjs.GameCode.GDBackgroundObjects5= [];
gdjs.GameCode.GDGroundObjects1= [];
gdjs.GameCode.GDGroundObjects2= [];
gdjs.GameCode.GDGroundObjects3= [];
gdjs.GameCode.GDGroundObjects4= [];
gdjs.GameCode.GDGroundObjects5= [];
gdjs.GameCode.GDCeilingObjects1= [];
gdjs.GameCode.GDCeilingObjects2= [];
gdjs.GameCode.GDCeilingObjects3= [];
gdjs.GameCode.GDCeilingObjects4= [];
gdjs.GameCode.GDCeilingObjects5= [];
gdjs.GameCode.GDBlackRectObjects1= [];
gdjs.GameCode.GDBlackRectObjects2= [];
gdjs.GameCode.GDBlackRectObjects3= [];
gdjs.GameCode.GDBlackRectObjects4= [];
gdjs.GameCode.GDBlackRectObjects5= [];
gdjs.GameCode.GDGameOverBackgroundObjects1= [];
gdjs.GameCode.GDGameOverBackgroundObjects2= [];
gdjs.GameCode.GDGameOverBackgroundObjects3= [];
gdjs.GameCode.GDGameOverBackgroundObjects4= [];
gdjs.GameCode.GDGameOverBackgroundObjects5= [];
gdjs.GameCode.GDPlayerNameInputObjects1= [];
gdjs.GameCode.GDPlayerNameInputObjects2= [];
gdjs.GameCode.GDPlayerNameInputObjects3= [];
gdjs.GameCode.GDPlayerNameInputObjects4= [];
gdjs.GameCode.GDPlayerNameInputObjects5= [];


gdjs.GameCode.eventsList0 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("BlackRect"), gdjs.GameCode.GDBlackRectObjects1);
gdjs.copyArray(runtimeScene.getObjects("CurrentScore"), gdjs.GameCode.GDCurrentScoreObjects1);
gdjs.copyArray(runtimeScene.getObjects("HighScoreChanged"), gdjs.GameCode.GDHighScoreChangedObjects1);
gdjs.copyArray(runtimeScene.getObjects("TappyPlane"), gdjs.GameCode.GDTappyPlaneObjects1);
{runtimeScene.getScene().getVariables().get("State").setString("NotStarted");
}{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects1[i].activateBehavior("PlatformerObject", false);
}
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreChangedObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreChangedObjects1[i].hide();
}
}{gdjs.evtTools.camera.showLayer(runtimeScene, "Transition");
}{gdjs.evtTools.camera.hideLayer(runtimeScene, "Gameover");
}{gdjs.evtTools.runtimeScene.createObjectsFromExternalLayout(runtimeScene, "Gameover", 0, 0, 0);
}{gdjs.evtTools.runtimeScene.createObjectsFromExternalLayout(runtimeScene, "SubmitScore", 0, 0, 0);
}{for(var i = 0, len = gdjs.GameCode.GDCurrentScoreObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDCurrentScoreObjects1[i].setOutline("0;0;0", 2);
}
}{for(var i = 0, len = gdjs.GameCode.GDBlackRectObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDBlackRectObjects1[i].getBehavior("Tween").addObjectOpacityTween("FadeIn", 0, "linear", 250, true);
}
}{gdjs.evtTools.sound.playSound(runtimeScene, "sunflower-street-drumloop-85bpm-163900.mp3", true, 100, 1);
}}

}


};gdjs.GameCode.eventsList1 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "Space");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Instructions"), gdjs.GameCode.GDInstructionsObjects1);
gdjs.copyArray(runtimeScene.getObjects("TappyPlane"), gdjs.GameCode.GDTappyPlaneObjects1);
{runtimeScene.getScene().getVariables().get("State").setString("GamePlaying");
}{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects1[i].activateBehavior("EllipseMovement", false);
}
}{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects1[i].activateBehavior("PlatformerObject", true);
}
}{for(var i = 0, len = gdjs.GameCode.GDInstructionsObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDInstructionsObjects1[i].hide();
}
}}

}


};gdjs.GameCode.eventsList2 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("State")) == "NotStarted";
if (isConditionTrue_0) {

{ //Subevents
gdjs.GameCode.eventsList1(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList3 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Ceiling"), gdjs.GameCode.GDCeilingObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ground"), gdjs.GameCode.GDGroundObjects1);
{for(var i = 0, len = gdjs.GameCode.GDGroundObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDGroundObjects1[i].setXOffset(gdjs.GameCode.GDGroundObjects1[i].getXOffset() + (100 * gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene)));
}
}{for(var i = 0, len = gdjs.GameCode.GDCeilingObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDCeilingObjects1[i].setXOffset(gdjs.GameCode.GDCeilingObjects1[i].getXOffset() - (100 * gdjs.evtTools.runtimeScene.getElapsedTimeInSeconds(runtimeScene)));
}
}}

}


};gdjs.GameCode.eventsList4 = function(runtimeScene) {

{


gdjs.GameCode.eventsList3(runtimeScene);
}


};gdjs.GameCode.eventsList5 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("State")) == "NotStarted";
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("State")) == "GamePlaying";
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.GameCode.eventsList4(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList6 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("TappyPlane"), gdjs.GameCode.GDTappyPlaneObjects3);
{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects3[i].rotateTowardAngle(gdjs.randomFloatInRange(-(90), 90), 50, runtimeScene);
}
}}

}


{



}


{

gdjs.copyArray(runtimeScene.getObjects("TappyPlane"), gdjs.GameCode.GDTappyPlaneObjects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDTappyPlaneObjects3.length;i<l;++i) {
    if ( gdjs.GameCode.GDTappyPlaneObjects3[i].getBehavior("PlatformerObject").isFalling() ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDTappyPlaneObjects3[k] = gdjs.GameCode.GDTappyPlaneObjects3[i];
        ++k;
    }
}
gdjs.GameCode.GDTappyPlaneObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDTappyPlaneObjects3 */
{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects3[i].rotateTowardAngle(90, 150, runtimeScene);
}
}}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{let isConditionTrue_1 = false;
isConditionTrue_0 = false;
{
isConditionTrue_1 = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
isConditionTrue_1 = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "Space");
if(isConditionTrue_1) {
    isConditionTrue_0 = true;
}
}
{
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("TappyPlane"), gdjs.GameCode.GDTappyPlaneObjects2);
{gdjs.evtTools.sound.playSound(runtimeScene, "assets\\sfx_wing.wav", false, 70, gdjs.randomFloatInRange(1.1, 1.3));
}{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects2[i].getBehavior("PlatformerObject").simulateJumpKey();
}
}{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects2[i].getBehavior("PlatformerObject").setCanJump();
}
}{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects2[i].setAngle(320);
}
}}

}


};gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDTopPillarObjects3Objects = Hashtable.newFrom({"TopPillar": gdjs.GameCode.GDTopPillarObjects3});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDBottomPillarObjects3Objects = Hashtable.newFrom({"BottomPillar": gdjs.GameCode.GDBottomPillarObjects3});
gdjs.GameCode.eventsList7 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "pipe_spawn") > 2.5;
if (isConditionTrue_0) {
gdjs.GameCode.GDBottomPillarObjects3.length = 0;

gdjs.GameCode.GDTopPillarObjects3.length = 0;

{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "pipe_spawn");
}{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDTopPillarObjects3Objects, 450, gdjs.randomInRange(30, 110), "");
}{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDBottomPillarObjects3Objects, 450, (( gdjs.GameCode.GDTopPillarObjects3.length === 0 ) ? 0 :gdjs.GameCode.GDTopPillarObjects3[0].getPointY("")) + 350, "");
}{for(var i = 0, len = gdjs.GameCode.GDBottomPillarObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDBottomPillarObjects3[i].setZOrder(1);
}
for(var i = 0, len = gdjs.GameCode.GDTopPillarObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDTopPillarObjects3[i].setZOrder(1);
}
}{for(var i = 0, len = gdjs.GameCode.GDBottomPillarObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDBottomPillarObjects3[i].setAnimation(gdjs.random(1));
}
}{for(var i = 0, len = gdjs.GameCode.GDTopPillarObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDTopPillarObjects3[i].setAnimation(gdjs.random(1));
}
}}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("BottomPillar"), gdjs.GameCode.GDBottomPillarObjects2);
gdjs.copyArray(runtimeScene.getObjects("TopPillar"), gdjs.GameCode.GDTopPillarObjects2);
{for(var i = 0, len = gdjs.GameCode.GDBottomPillarObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDBottomPillarObjects2[i].addForce(-(100), 0, 0);
}
for(var i = 0, len = gdjs.GameCode.GDTopPillarObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDTopPillarObjects2[i].addForce(-(100), 0, 0);
}
}}

}


};gdjs.GameCode.asyncCallback10428612 = function (runtimeScene, asyncObjectsList) {
gdjs.copyArray(asyncObjectsList.getObjects("CurrentScore"), gdjs.GameCode.GDCurrentScoreObjects3);

{for(var i = 0, len = gdjs.GameCode.GDCurrentScoreObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDCurrentScoreObjects3[i].setOutline("0;0;0", 2);
}
}}
gdjs.GameCode.eventsList8 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
for (const obj of gdjs.GameCode.GDCurrentScoreObjects2) asyncObjectsList.addObject("CurrentScore", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.5), (runtimeScene) => (gdjs.GameCode.asyncCallback10428612(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameCode.eventsList9 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
{
/* Reuse gdjs.GameCode.GDCurrentScoreObjects2 */
{for(var i = 0, len = gdjs.GameCode.GDCurrentScoreObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDCurrentScoreObjects2[i].setOutline("0;0;0", 7);
}
}
{ //Subevents
gdjs.GameCode.eventsList8(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList10 = function(runtimeScene) {

{



}


{

gdjs.copyArray(runtimeScene.getObjects("BottomPillar"), gdjs.GameCode.GDBottomPillarObjects2);
gdjs.copyArray(runtimeScene.getObjects("TappyPlane"), gdjs.GameCode.GDTappyPlaneObjects2);
gdjs.copyArray(runtimeScene.getObjects("TopPillar"), gdjs.GameCode.GDTopPillarObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDBottomPillarObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDBottomPillarObjects2[i].getX() < (( gdjs.GameCode.GDTappyPlaneObjects2.length === 0 ) ? 0 :gdjs.GameCode.GDTappyPlaneObjects2[0].getPointX("Centre")) ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDBottomPillarObjects2[k] = gdjs.GameCode.GDBottomPillarObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDBottomPillarObjects2.length = k;
for (var i = 0, k = 0, l = gdjs.GameCode.GDTopPillarObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDTopPillarObjects2[i].getX() < (( gdjs.GameCode.GDTappyPlaneObjects2.length === 0 ) ? 0 :gdjs.GameCode.GDTappyPlaneObjects2[0].getPointX("Centre")) ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDTopPillarObjects2[k] = gdjs.GameCode.GDTopPillarObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDTopPillarObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDBottomPillarObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDBottomPillarObjects2[i].getX() > (( gdjs.GameCode.GDTappyPlaneObjects2.length === 0 ) ? 0 :gdjs.GameCode.GDTappyPlaneObjects2[0].getPointX("Centre")) - 60 ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDBottomPillarObjects2[k] = gdjs.GameCode.GDBottomPillarObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDBottomPillarObjects2.length = k;
for (var i = 0, k = 0, l = gdjs.GameCode.GDTopPillarObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDTopPillarObjects2[i].getX() > (( gdjs.GameCode.GDTappyPlaneObjects2.length === 0 ) ? 0 :gdjs.GameCode.GDTappyPlaneObjects2[0].getPointX("Centre")) - 60 ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDTopPillarObjects2[k] = gdjs.GameCode.GDTopPillarObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDTopPillarObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10426772);
}
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("CurrentScore"), gdjs.GameCode.GDCurrentScoreObjects2);
{runtimeScene.getScene().getVariables().getFromIndex(0).add(1);
}{for(var i = 0, len = gdjs.GameCode.GDCurrentScoreObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDCurrentScoreObjects2[i].setString(gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(0)));
}
}{gdjs.evtTools.sound.playSound(runtimeScene, "assets\\sfx_point.wav", false, 100, 1);
}
{ //Subevents
gdjs.GameCode.eventsList9(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDTappyPlaneObjects1Objects = Hashtable.newFrom({"TappyPlane": gdjs.GameCode.GDTappyPlaneObjects1});
gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDTopPillarObjects1ObjectsGDgdjs_9546GameCode_9546GDBottomPillarObjects1ObjectsGDgdjs_9546GameCode_9546GDCeilingObjects1ObjectsGDgdjs_9546GameCode_9546GDGroundObjects1Objects = Hashtable.newFrom({"TopPillar": gdjs.GameCode.GDTopPillarObjects1, "BottomPillar": gdjs.GameCode.GDBottomPillarObjects1, "Ceiling": gdjs.GameCode.GDCeilingObjects1, "Ground": gdjs.GameCode.GDGroundObjects1});
gdjs.GameCode.eventsList11 = function(runtimeScene) {

{



}


{

gdjs.copyArray(runtimeScene.getObjects("BottomPillar"), gdjs.GameCode.GDBottomPillarObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ceiling"), gdjs.GameCode.GDCeilingObjects1);
gdjs.copyArray(runtimeScene.getObjects("Ground"), gdjs.GameCode.GDGroundObjects1);
gdjs.copyArray(runtimeScene.getObjects("TappyPlane"), gdjs.GameCode.GDTappyPlaneObjects1);
gdjs.copyArray(runtimeScene.getObjects("TopPillar"), gdjs.GameCode.GDTopPillarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDTappyPlaneObjects1Objects, gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDTopPillarObjects1ObjectsGDgdjs_9546GameCode_9546GDBottomPillarObjects1ObjectsGDgdjs_9546GameCode_9546GDCeilingObjects1ObjectsGDgdjs_9546GameCode_9546GDGroundObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.GameCode.GDTappyPlaneObjects1 */
{runtimeScene.getScene().getVariables().get("State").setString("Gameover");
}{gdjs.evtTools.sound.playSound(runtimeScene, "assets\\sfx_hit.wav", false, 100, 0.8);
}{for(var i = 0, len = gdjs.GameCode.GDTappyPlaneObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDTappyPlaneObjects1[i].activateBehavior("PlatformerObject", false);
}
}}

}


};gdjs.GameCode.eventsList12 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10418900);
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "pipe_spawn");
}}

}


{


gdjs.GameCode.eventsList6(runtimeScene);
}


{


gdjs.GameCode.eventsList7(runtimeScene);
}


{


gdjs.GameCode.eventsList10(runtimeScene);
}


{


gdjs.GameCode.eventsList11(runtimeScene);
}


};gdjs.GameCode.eventsList13 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("State")) == "GamePlaying";
if (isConditionTrue_0) {

{ //Subevents
gdjs.GameCode.eventsList12(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDFlashObjects2Objects = Hashtable.newFrom({"Flash": gdjs.GameCode.GDFlashObjects2});
gdjs.GameCode.eventsList14 = function(runtimeScene, asyncObjectsList) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.storage.elementExistsInJSONFile("save", "high_score");
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.GameCode.GDHighScoreObjects3, gdjs.GameCode.GDHighScoreObjects4);

{gdjs.evtTools.storage.readNumberFromJSONFile("save", "high_score", runtimeScene, runtimeScene.getScene().getVariables().get("PreviousBestScore"));
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreObjects4[i].setString("Best: " + gdjs.evtTools.common.toString(gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("PreviousBestScore"))));
}
}}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)) > gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().get("PreviousBestScore"));
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.GameCode.GDHighScoreChangedObjects3, gdjs.GameCode.GDHighScoreChangedObjects4);

{gdjs.evtTools.storage.writeNumberInJSONFile("save", "high_score", gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)));
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreChangedObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreChangedObjects4[i].hide(false);
}
}}

}


{


let isConditionTrue_0 = false;
{
{gdjs.playerAuthentication.displayAuthenticationBanner(runtimeScene);
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.playerAuthentication.isAuthenticated();
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("PlayerNameInput"), gdjs.GameCode.GDPlayerNameInputObjects4);
{for(var i = 0, len = gdjs.GameCode.GDPlayerNameInputObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerNameInputObjects4[i].setText(gdjs.playerAuthentication.getUsername());
}
}{for(var i = 0, len = gdjs.GameCode.GDPlayerNameInputObjects4.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerNameInputObjects4[i].setDisabled(true);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.playerAuthentication.isAuthenticated());
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("PlayerName")) != "0";
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("PlayerNameInput"), gdjs.GameCode.GDPlayerNameInputObjects3);
{for(var i = 0, len = gdjs.GameCode.GDPlayerNameInputObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerNameInputObjects3[i].setText(gdjs.evtTools.variable.getVariableString(runtimeScene.getGame().getVariables().get("PlayerName")));
}
}}

}


};gdjs.GameCode.asyncCallback10431740 = function (runtimeScene, asyncObjectsList) {
gdjs.copyArray(runtimeScene.getObjects("CurrentScore"), gdjs.GameCode.GDCurrentScoreObjects3);
gdjs.copyArray(runtimeScene.getObjects("FinalScore"), gdjs.GameCode.GDFinalScoreObjects3);
gdjs.copyArray(asyncObjectsList.getObjects("Flash"), gdjs.GameCode.GDFlashObjects3);

gdjs.copyArray(runtimeScene.getObjects("HighScore"), gdjs.GameCode.GDHighScoreObjects3);
gdjs.copyArray(runtimeScene.getObjects("HighScoreChanged"), gdjs.GameCode.GDHighScoreChangedObjects3);
{for(var i = 0, len = gdjs.GameCode.GDFlashObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDFlashObjects3[i].deleteFromScene(runtimeScene);
}
}{gdjs.evtTools.camera.showLayer(runtimeScene, "Gameover");
}{for(var i = 0, len = gdjs.GameCode.GDCurrentScoreObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDCurrentScoreObjects3[i].hide();
}
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreChangedObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreChangedObjects3[i].hide();
}
}{for(var i = 0, len = gdjs.GameCode.GDFinalScoreObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDFinalScoreObjects3[i].setString("Score: " + gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().getFromIndex(0)));
}
}{for(var i = 0, len = gdjs.GameCode.GDFinalScoreObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDFinalScoreObjects3[i].setOutline("0;0;0", 2);
}
}{for(var i = 0, len = gdjs.GameCode.GDHighScoreObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDHighScoreObjects3[i].setOutline("0;0;0", 2);
}
}
{ //Subevents
gdjs.GameCode.eventsList14(runtimeScene, asyncObjectsList);} //End of subevents
}
gdjs.GameCode.eventsList15 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
for (const obj of gdjs.GameCode.GDFlashObjects2) asyncObjectsList.addObject("Flash", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.1), (runtimeScene) => (gdjs.GameCode.asyncCallback10431740(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.GameCode.eventsList16 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.playerAuthentication.isAuthenticated();
if (isConditionTrue_0) {
{gdjs.evtTools.leaderboards.saveConnectedPlayerScore(runtimeScene, "9b3cc0f9-9587-44e5-94bd-f5048d6312fb", gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)));
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = !(gdjs.playerAuthentication.isAuthenticated());
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("PlayerNameInput"), gdjs.GameCode.GDPlayerNameInputObjects3);
{gdjs.evtTools.leaderboards.savePlayerScore(runtimeScene, "9b3cc0f9-9587-44e5-94bd-f5048d6312fb", gdjs.evtTools.variable.getVariableNumber(runtimeScene.getScene().getVariables().getFromIndex(0)), (( gdjs.GameCode.GDPlayerNameInputObjects3.length === 0 ) ? "" :gdjs.GameCode.GDPlayerNameInputObjects3[0].getText()));
}{runtimeScene.getGame().getVariables().get("PlayerName").setString((( gdjs.GameCode.GDPlayerNameInputObjects3.length === 0 ) ? "" :gdjs.GameCode.GDPlayerNameInputObjects3[0].getText()));
}}

}


{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.leaderboards.displayLeaderboard(runtimeScene, "9b3cc0f9-9587-44e5-94bd-f5048d6312fb", true);
}}

}


};gdjs.GameCode.eventsList17 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(10431076);
}
if (isConditionTrue_0) {
gdjs.GameCode.GDFlashObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.GameCode.mapOfGDgdjs_9546GameCode_9546GDFlashObjects2Objects, 0, 0, "GUI");
}{for(var i = 0, len = gdjs.GameCode.GDFlashObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDFlashObjects2[i].getBehavior("Flash").Flash(0.1, (typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined));
}
}
{ //Subevents
gdjs.GameCode.eventsList15(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.playerAuthentication.hasLoggedIn();
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("PlayerNameInput"), gdjs.GameCode.GDPlayerNameInputObjects2);
{for(var i = 0, len = gdjs.GameCode.GDPlayerNameInputObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerNameInputObjects2[i].setText(gdjs.playerAuthentication.getUsername());
}
}{for(var i = 0, len = gdjs.GameCode.GDPlayerNameInputObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDPlayerNameInputObjects2[i].setDisabled(true);
}
}{gdjs.playerAuthentication.displayAuthenticationBanner(runtimeScene);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("RestartButton"), gdjs.GameCode.GDRestartButtonObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDRestartButtonObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDRestartButtonObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDRestartButtonObjects2[k] = gdjs.GameCode.GDRestartButtonObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDRestartButtonObjects2.length = k;
if (isConditionTrue_0) {
{gdjs.playerAuthentication.removeAuthenticationBanner(runtimeScene);
}{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("SubmitScoreButton"), gdjs.GameCode.GDSubmitScoreButtonObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.GameCode.GDSubmitScoreButtonObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDSubmitScoreButtonObjects2[i].IsClicked((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : undefined)) ) {
        isConditionTrue_0 = true;
        gdjs.GameCode.GDSubmitScoreButtonObjects2[k] = gdjs.GameCode.GDSubmitScoreButtonObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDSubmitScoreButtonObjects2.length = k;
if (isConditionTrue_0) {
{gdjs.playerAuthentication.removeAuthenticationBanner(runtimeScene);
}
{ //Subevents
gdjs.GameCode.eventsList16(runtimeScene);} //End of subevents
}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.leaderboards.hasPlayerJustClosedLeaderboardView();
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.leaderboards.hasBeenSaved("9b3cc0f9-9587-44e5-94bd-f5048d6312fb");
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", true);
}}

}


};gdjs.GameCode.eventsList18 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.variable.getVariableString(runtimeScene.getScene().getVariables().get("State")) == "Gameover";
if (isConditionTrue_0) {

{ //Subevents
gdjs.GameCode.eventsList17(runtimeScene);} //End of subevents
}

}


};gdjs.GameCode.eventsList19 = function(runtimeScene) {

{


gdjs.GameCode.eventsList0(runtimeScene);
}


{


gdjs.GameCode.eventsList2(runtimeScene);
}


{


gdjs.GameCode.eventsList5(runtimeScene);
}


{


gdjs.GameCode.eventsList13(runtimeScene);
}


{


gdjs.GameCode.eventsList18(runtimeScene);
}


};

gdjs.GameCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.GameCode.GDTappyPlaneObjects1.length = 0;
gdjs.GameCode.GDTappyPlaneObjects2.length = 0;
gdjs.GameCode.GDTappyPlaneObjects3.length = 0;
gdjs.GameCode.GDTappyPlaneObjects4.length = 0;
gdjs.GameCode.GDTappyPlaneObjects5.length = 0;
gdjs.GameCode.GDTopPillarObjects1.length = 0;
gdjs.GameCode.GDTopPillarObjects2.length = 0;
gdjs.GameCode.GDTopPillarObjects3.length = 0;
gdjs.GameCode.GDTopPillarObjects4.length = 0;
gdjs.GameCode.GDTopPillarObjects5.length = 0;
gdjs.GameCode.GDBottomPillarObjects1.length = 0;
gdjs.GameCode.GDBottomPillarObjects2.length = 0;
gdjs.GameCode.GDBottomPillarObjects3.length = 0;
gdjs.GameCode.GDBottomPillarObjects4.length = 0;
gdjs.GameCode.GDBottomPillarObjects5.length = 0;
gdjs.GameCode.GDFinalScoreObjects1.length = 0;
gdjs.GameCode.GDFinalScoreObjects2.length = 0;
gdjs.GameCode.GDFinalScoreObjects3.length = 0;
gdjs.GameCode.GDFinalScoreObjects4.length = 0;
gdjs.GameCode.GDFinalScoreObjects5.length = 0;
gdjs.GameCode.GDCurrentScoreObjects1.length = 0;
gdjs.GameCode.GDCurrentScoreObjects2.length = 0;
gdjs.GameCode.GDCurrentScoreObjects3.length = 0;
gdjs.GameCode.GDCurrentScoreObjects4.length = 0;
gdjs.GameCode.GDCurrentScoreObjects5.length = 0;
gdjs.GameCode.GDHighScoreObjects1.length = 0;
gdjs.GameCode.GDHighScoreObjects2.length = 0;
gdjs.GameCode.GDHighScoreObjects3.length = 0;
gdjs.GameCode.GDHighScoreObjects4.length = 0;
gdjs.GameCode.GDHighScoreObjects5.length = 0;
gdjs.GameCode.GDHighScoreChangedObjects1.length = 0;
gdjs.GameCode.GDHighScoreChangedObjects2.length = 0;
gdjs.GameCode.GDHighScoreChangedObjects3.length = 0;
gdjs.GameCode.GDHighScoreChangedObjects4.length = 0;
gdjs.GameCode.GDHighScoreChangedObjects5.length = 0;
gdjs.GameCode.GDRestartButtonObjects1.length = 0;
gdjs.GameCode.GDRestartButtonObjects2.length = 0;
gdjs.GameCode.GDRestartButtonObjects3.length = 0;
gdjs.GameCode.GDRestartButtonObjects4.length = 0;
gdjs.GameCode.GDRestartButtonObjects5.length = 0;
gdjs.GameCode.GDSubmitScoreButtonObjects1.length = 0;
gdjs.GameCode.GDSubmitScoreButtonObjects2.length = 0;
gdjs.GameCode.GDSubmitScoreButtonObjects3.length = 0;
gdjs.GameCode.GDSubmitScoreButtonObjects4.length = 0;
gdjs.GameCode.GDSubmitScoreButtonObjects5.length = 0;
gdjs.GameCode.GDFlashObjects1.length = 0;
gdjs.GameCode.GDFlashObjects2.length = 0;
gdjs.GameCode.GDFlashObjects3.length = 0;
gdjs.GameCode.GDFlashObjects4.length = 0;
gdjs.GameCode.GDFlashObjects5.length = 0;
gdjs.GameCode.GDGameOverLabelObjects1.length = 0;
gdjs.GameCode.GDGameOverLabelObjects2.length = 0;
gdjs.GameCode.GDGameOverLabelObjects3.length = 0;
gdjs.GameCode.GDGameOverLabelObjects4.length = 0;
gdjs.GameCode.GDGameOverLabelObjects5.length = 0;
gdjs.GameCode.GDInstructionsObjects1.length = 0;
gdjs.GameCode.GDInstructionsObjects2.length = 0;
gdjs.GameCode.GDInstructionsObjects3.length = 0;
gdjs.GameCode.GDInstructionsObjects4.length = 0;
gdjs.GameCode.GDInstructionsObjects5.length = 0;
gdjs.GameCode.GDBackgroundObjects1.length = 0;
gdjs.GameCode.GDBackgroundObjects2.length = 0;
gdjs.GameCode.GDBackgroundObjects3.length = 0;
gdjs.GameCode.GDBackgroundObjects4.length = 0;
gdjs.GameCode.GDBackgroundObjects5.length = 0;
gdjs.GameCode.GDGroundObjects1.length = 0;
gdjs.GameCode.GDGroundObjects2.length = 0;
gdjs.GameCode.GDGroundObjects3.length = 0;
gdjs.GameCode.GDGroundObjects4.length = 0;
gdjs.GameCode.GDGroundObjects5.length = 0;
gdjs.GameCode.GDCeilingObjects1.length = 0;
gdjs.GameCode.GDCeilingObjects2.length = 0;
gdjs.GameCode.GDCeilingObjects3.length = 0;
gdjs.GameCode.GDCeilingObjects4.length = 0;
gdjs.GameCode.GDCeilingObjects5.length = 0;
gdjs.GameCode.GDBlackRectObjects1.length = 0;
gdjs.GameCode.GDBlackRectObjects2.length = 0;
gdjs.GameCode.GDBlackRectObjects3.length = 0;
gdjs.GameCode.GDBlackRectObjects4.length = 0;
gdjs.GameCode.GDBlackRectObjects5.length = 0;
gdjs.GameCode.GDGameOverBackgroundObjects1.length = 0;
gdjs.GameCode.GDGameOverBackgroundObjects2.length = 0;
gdjs.GameCode.GDGameOverBackgroundObjects3.length = 0;
gdjs.GameCode.GDGameOverBackgroundObjects4.length = 0;
gdjs.GameCode.GDGameOverBackgroundObjects5.length = 0;
gdjs.GameCode.GDPlayerNameInputObjects1.length = 0;
gdjs.GameCode.GDPlayerNameInputObjects2.length = 0;
gdjs.GameCode.GDPlayerNameInputObjects3.length = 0;
gdjs.GameCode.GDPlayerNameInputObjects4.length = 0;
gdjs.GameCode.GDPlayerNameInputObjects5.length = 0;

gdjs.GameCode.eventsList19(runtimeScene);

return;

}

gdjs['GameCode'] = gdjs.GameCode;
