var template = {
  version: "1.0.0",
  width: 728,
  height: 90,
  elements: {
    trigger: {
      name: "trigger",
      reportingDimension: "trigger",
      text: { value:"Animated" },
      enum: [
        { label: "Static", value: "Static" },
        { label: "Animated", value: "Animated" },
        { label: "Full Image", value: "Full Image" }
      ]
    },
    frame2Image: {
      name: "frame2Image",
      reportingDimension: "frame2Image",
      image: { src: "keyart.png" }
    },
    frame1Background: {
      name: "frame1Background",
      reportingDimension: "frame1Background",
      image: { src: "introBg.png" }
    },
    frame2Background: {
      name: "frame2Background",
      reportingDimension: "frame2Background",
      image: { src: "bg.png" }
    },
    frame1Headline: {
      name: "frame1Headline",
      reportingDimension: "frame1Headline",
      text: { value: "LOREM IPSUM DOLOR AMET AL<br>CONSECTETUR UN ADIPISCING" },
      style: { content: "normal" }
    },
    frame1Subheadline: {
      name: "frame1Subheadline",
      reportingDimension: "frame1Subheadline",
      text: { value: "IPSUM LOREM OU $9<sup>99</sup>/MONTH" },
      style: { content: "normal" }
    },
    legal: {
      name: "legal",
      reportingDimension: "legal",
      text: { value: "Lorem ipsum dolor sit amet al consectetur era un adipiscing ignacio despacio dub" },
      style: { content: "normal" }
    },
    ctaText: {
      name: "ctaText",
      reportingDimension: "ctaText",
      text: { value: "SIGN UP NOW" },
      style: { content: "normal" }
    },
    ctaColor1: {
      name: "ctaColor1",
      text: { value: "#00F0FF" }
    },
    customVariable: {
      name: "customVariable",
      reportingDimension: "customVariable",
      text: { value: "1.0" }
    },
    customVariable2: {
      name: "customVariable2",
      reportingDimension: "customVariable2",
      text: { value: "?UTM_HERE" }
    },
    customVariable3: {
      name: "customVariable3",
      reportingDimension: "customVariable3",
      text: { value: "Reporting Purposes" }
    },
    customVariable4: {
      name: "customVariable4",
      reportingDimension: "customVariable4",
      text: { value: "Reporting Purposes" }
    },
    landingPage: {
      name: "landingPage",
      reportingDimension: "landingPage",
      url: { value: "https://www.hbomax.com/" }
    }
  }
};

var runtime = new TemplateRuntime(template).start();