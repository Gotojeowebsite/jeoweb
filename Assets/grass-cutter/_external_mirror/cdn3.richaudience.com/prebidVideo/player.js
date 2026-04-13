raParams = function (params, raVast, hbExist) {
    const raDomain = encodeURIComponent(window.location.host.includes('www.') ? window.location.host.split('www.')[1] : window.location.host);
    let pixelImagenUrl = "https://t4.richmediastudio.com/?type=4&stid=0&sgn=0&v=%%CACHEBUSTER%%&idAgc=&cmp=8609&lnt=15643&crt=56487&cre=1&sbcre=0&e=1&ref=" + raDomain + "&refDomain=" + raDomain + "&rnd=%%CACHEBUSTER%%";
    pixelImagenUrl = pixelImagenUrl.replace(/%%CACHEBUSTER%%/g, Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000));

    const raiImagen = window.document.createElement('img');
    raiImagen.src = pixelImagenUrl;
    raiImagen.id = "raiPixel";
    raiImagen.style.width = '1px';
    raiImagen.style.height = '1px';
    window.document.body.appendChild(raiImagen);

    var raScript = document.createElement('script');
    raScript.setAttribute('type', 'text/javascript');
    raScript.src = 'https://cdn3.richaudience.com/ibn/ibn4.js';
    var raParent = document.querySelector(`[id="${params.adUnit}"]`)
    if (raParent == null){
        raParent = document.querySelector(`[id*="${params.adUnit}"]`)
    }
    if (raParent == null && (window.top.location.hostname.includes('cmjornal.pt') || window.top.location.hostname.includes('record.pt'))) {
        raParent = document.querySelector(`div[id="BTFInContent"]`)
    }

    if (typeof yieldlove_site_settings != "undefined") {
        yieldlove_site_settings.placement.find(item => item.id == params.adUnit).codes.find(x => {
            if (document.querySelector("[id*='" + x + "']") != null) {
                raParent = document.querySelector("[id*='" + x + "']");
                return true;
            } else {
                x.split('/').forEach(y => {
                    if (y !== "") {
                        if (document.getElementById(y) != null) {
                            raParent = document.getElementById(y)
                            return true;
                        }

                    }
                })
            }
        })
    }
    var iframe = document.createElement('iframe');
    iframe.id = 'ra-frame-player';
    iframe.style.width = raParent.clientWidth+"px";
    if (raParent.clientWidth < 35) raParent.style.width = "100%", iframe.style.width = "100%";
    iframe.style.height = (raParent.clientWidth/4)*3+"px";
    if (raParent.clientHeight < 35) raParent.style.height = "100%";
    iframe.style.maxWidth= "100vw";
    iframe.style.maxHeight= "calc((100vw / 4)* 3)";
    iframe.style.border = 'none';
    iframe.style.padding= '5px 0';
    iframe.style.boxSizing= 'content-box';
    raParent.appendChild(iframe);
    Array.from(raParent.children).forEach((raChild => {
        raParent !== document.body && raParent !== raChild && raChild.id != 'ra-frame-player' && (raChild.style.display = "none")
    }))
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    iframeDoc.open();
    iframeDoc.write(`<head>
        <script type="text/javascript">
            function sendReports(reports) {
              for (let report of reports) {
                try {
                  let reportData = JSON.stringify(report);
                  navigator.sendBeacon('https://s.richmediastudio.com/form_track/RAI_PrebidPlayer_202407.php?insId=`+encodeURIComponent(params.adUnit)+`&event=1&visitId=610031&r='+Math.floor(Math.random()*999999)+'&creaId=100&siteId=`+raDomain+`&subCreaId=0', reportData);
                } catch (error) {
                  // console.error('Failed to send report', error);
                }
              }
            }
            
            // Create the observer with the callback
            const observer = new ReportingObserver(
              (reports, observer) => {
                sendReports(reports);
              },
              { buffered: true }
            );
            
            // Start watching for interventions
            observer.observe();
            
            window.addEventListener('pagehide', (event) => {
              // Pull all pending reports from the queue
              let reports = observer.takeRecords();
              sendReports(reports);
            });
      </script>
      </head>
      <body style="overflow:hidden;margin:0px;">
      <div>
      <script src="https://cdn3.richaudience.com/ibn/ibn4.js" type="text/javascript"></script>
      <script type="text/javascript">
          const config = {
              // DEBUG: true,
              it: self.crypto.randomUUID(),
              adTags: [
                  {VAST: ` + JSON.stringify(raVast) + `},
              ],
              options: {
                  skip: false,
                  slotRatio: "6:5",
                  defaultAdRatio: "6:5"
              },
          };
               
          let raInterval = setInterval(function () {
              if (typeof getVPAIDAd == "function") {
                  clearInterval(raInterval)
                  const creative = getVPAIDAd();
                  const onAdLoaded = () => {
                      creative.startAd();
                  }
                  const onAdError = () => {
                      navigator.sendBeacon('https://s.richmediastudio.com/form_track/RAI_PrebidPlayer_202407.php?insId=`+encodeURIComponent(params.adUnit)+`&event=1&visitId=610031&r='+Math.floor(Math.random()*999999)+'&creaId=100&siteId=`+raDomain+`&subCreaId=0&val=onAdError');
                  }
                  
                  creative.subscribe(onAdLoaded, 'AdLoaded');
                  creative.initAd({config});
              }
          }, 60)
      </script>
      </div>
      </body>
      `);
    iframeDoc.close();

}