// UPDATE PARAMS BELOW FOR MONTH or CD/OSA PRODUCTS INFO
let getRateFeed = function (event) {
  let currentRate = null;
  function hideRate() {
    return (
      $("#mask-rate").css("display", "none")
    )
  };
  $.ajax({
    // osa
    // url: "https://api.marcus.com/savings/api/v1/rates/productCode/3000",
    // cd
    url: "https://api.marcus.com/savings/api/v1/rates/productCode/3100",
    // npcd
    // url: "https://api.marcus.com/savings/api/v1/rates/productCode/3600",
    
    // The name of the callback parameter, as specified by the YQL service
    jsonpCallback: 'callback',
    jsonp: false,
    // Tell jQuery we're expecting JSONP
    dataType: "jsonp",
    // Work with the response
    success: function (result) {
      console.log("this is getRateFeed results: " + result);
      var allRates = result.productRates;
      $.each(allRates, function (index, value) {
        /*
        osa
        */
        // if (value.orgId == "GECB") {
        // thisTitle = "Online Savings Account";

        /*
        cd  
        */
        if (value.orgId == "GECB" && value.termLength == "9") {
          thisTitle = "9-month";
          /*
          npcd
          */
          // if (value.instrumentCode == "NPCD" && value.termLength == "13") {
          //   thisTitle = "13-month";

          currentRate = value.apy;
          $("#rate-span").text(currentRate);
          console.log("this is currentRate!!  :  " + currentRate);
        };
      })
      // Hides rate block if no rate found
      if (!currentRate) {
        hideRate();
        console.error("Missing currentRate");
      };

    },
    error: function (XMLHttpRequest, textStatus, errorThrown) {
      if (XMLHttpRequest.status == 0) {
        alert('Check your network');
        console.error("0 error");
      } else if (XMLHttpRequest.status == 404) {
        alert('404 Requested URL not found.');
        console.error("404 error");
      } else if (XMLHttpRequest.status == 500) {
        alert('Internal Server Error');
        console.error("500 error");
      } else {
        alert('Error: ' + XMLHttpRequest.responseText)
        console.error("Unknown Error: " + XMLHttpRequest.status);
        console.error("Check for missing API URL");
      }
      hideRate();
    }
  });
};

window.onload = function () {
  getRateFeed();
};

// DEFAULTS (APPLIES TO ALL BLOCK UNLESS SPECIFIED)
gsap.defaults({
  duration: 0.8,
  ease: "power2.out",
});

// ANIMATION TIMELINE STARTS 
var tl = gsap.timeline({
  delay: 0.2
});
var hover = document.getElementById("banner");

tl
// FRAME 1


  .to(["#txt1-a"], {
    top: 0,
    opacity: 1,
    stagger: 0.1
  })


  .to(["#txt1-b-1","#txt1-b-2", "#txt1-b-3" ], {
    top: 0,
    opacity: 1,
    ease: "back.out(1.7)",
    stagger: 0.2
  })

  .to(["#txt1-b-4", "#txt1-c"], {
    top: 0,
    opacity: 1,
    stagger: 0.0
  }, "+=0.1")




  .to(".txt1", {
    opacity: 0,
  }, "+=1.8")

// FRAME 2
  .to(".txt2", {
    top: 0,
    opacity: 1,
    stagger: 0.1
  })


  .to(".txt2", {
    opacity: 0,
  }, "+=1.8")

// FRAME 3
.to(["#txt3-a", "#txt3-b","#txt3-c", "#txt3-d"], {
  top: 0,
  opacity: 1,
  stagger: 0.1
})




  .to("#rate", {
    duration: 0.6,
    y: -80,
    opacity: 1,
  }, "-=0.6")
  
  .to("#txt3-e", {
    top: 0,
    opacity: 1,
  }, "-=0.6")

  
.to("#cta", {
  duration: 0.6,
  opacity: 1,
  scale: 1,
  ease: "back.out(1.7)",
},);


document.addEventListener("DOMContentLoaded", function() {
  // preloader
  document.getElementById("preloader").style.display = "none";
  document.getElementById("banner").style.display = "block";
});
