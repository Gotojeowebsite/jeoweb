var creativeSize = `${template.width}x${template.height}`; // Set the width and height of the ad.
var devDynamicContent = {}; // Variable for studio invocation code.
function exitCall() {
  Enabler.exitOverride("MainClick", defaultValues.landingPage + Adlib.utmParser(defaultValues.customVariable2));
}
var videoCuePoint = [
  //"cuePoint:funcName" ex. "1:firstAninmation" please do not included the parenthesis after the function name.
]
let vName = "";
function initDynamic() {
  if (checkEnvironment() === 'tools') {
    for (var i=0;i<Object.keys(defaultValues).length;i++) {
      Object.keys(defaultValues)[i];
    }
  } else {
    // paste studio invocation code here, and delete the devDynamicContent declaration as it is already declared outside this function.
    
    Enabler.setProfileId(10945381);

    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1 = [{}];
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0]._id = 0;
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].id = "00a5ebfd-9943-4466-bc21-dcb6048c4f21";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].Reporting_Label = "dd9cfc8e-a36c-4d9f-b44b-978680fe8f0f-f376f4ae-8f85-4dfe-8240-e12ed0b641c8-082042e6-724b-4265-8fb1-e733c18e72e9-fejMV8U96Y-a95ec318-0027-4221-8210-28d392c8ea4d-5263cab38f6aee72deca204c383aadfe6934def99daa635c7149bc8ab4d7c516";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].Variant_name = "The Last of Us S2";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].Active = true;
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].isDefault = false;
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].legal = "";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].ctaText = "<span style=\"font-size: 11px;\">SIGN UP NOW<\/span>";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].trigger = "Full Image";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].ctaColor1 = "#00F0FF";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame2Image = {};
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame2Image.Url = "https://app.smartly.io/warren/images/467f129a-db49-4097-9c6f-7c853ebdb452/blob?C126528_ENG_LOU_SNG_EVG_BRQ225_ANB_728X90_DCO_S2.jpg";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].landingPage = {};
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].landingPage.Url = "https://www.max.com/";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].CreativeName = "The Last of Us S2_728x90";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].URL_Parameter = "";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].customVariable = "1";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame1Headline = "<span style=\"font-size: 19px;\">NOW STREAMING<\/span>";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].customVariable2 = "?utm_source=dv360&amp;utm_medium=paid-display&amp;utm_id=cm|dynamicCampaignIdUTM|dynamicSiteIdUTM|dynamicPlacementIdUTM|dynamicCreativeIdUTM";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].customVariable4 = "C126528_ENG_LOU_SNG_EVG_BRQ225_ANB_728X90_DCO_S2";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame1Background = {};
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame1Background.Url = "https://adlib-platform-prod.s3.eu-central-1.amazonaws.com/v3/partners/642317b45ca417ebab2b829e/assets/singleFiles/649f146dbfbb6b52a124b933/original/introBg.png";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame2Background = {};
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame2Background.Url = "https://dyle7zu5kwqf5.cloudfront.net/f9b160bc-f5b2-4c75-9786-4f4617e459c1/bg.png";
    devDynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].frame1Subheadline = "<span style=\"font-size: 12px;\">PLANS START AT $9<sup>99<\/sup>\/MONTH<\/span>";
    Enabler.setDevDynamicContent(devDynamicContent);
    Adlib.assignInvocationCode(); // DO NOT DELETE THIS CODE, This will automatically assign invocation code to defaultValues
    vNAme = dynamicContent.REBRAND__US__MAX__HIGH_PRIO_Sheet1[0].Variant_name;
  }
}
function populate() {
  //Adlib.preloadDelay = 100;
  //Adlib.fpsSettings(60); // uncomment this if you want to change the FPS used in the creative          
  Adlib.populateElements(); // DO NOT DELETE THIS. automatically assign the defaultValues to the elements within the ad.
  /*****************************************
  If you need to manually assign a defaultValue to a style of an element, add it below.
  *****************************************/
};