"use strict";

(function() {

    var gameLoaded = false;
    var activePopup;
    var popBG;
    var sharePop;
    var loginPop;
    var instructionsPop;
    var loggedInBar;
    var loggedOutBar;
    var officialHost;
    var mainWebsiteLoggedInUserID;
    var embedErrorNotice = false;
    var aUnit;
    var aLink;

    /*
     Check embedding location
     Show advert
     Controls for the bottom game bar
     */
    window.GameEmbed = {

        init: function () {

            // Get url params
            const urlParams = new URLSearchParams(window.location.search);
            try {
                mainWebsiteLoggedInUserID = parseInt(urlParams.get("uid"));
            }
            catch (err) {
                mainWebsiteLoggedInUserID = 0;
            }
            try {
                officialHost = urlParams.get("o") === "1";
            }
            catch (err) {
                officialHost = false;
            }
            // Show no embedding notice
            if (!gameAllowEmbedding && !officialHost) {
                embedErrorNotice = true;
                document.getElementById("NoEmbeddingNotice").style.display = "flex";
            }

            GameEmbed.initMessageListener();
            GameEmbed.checkInFrame();
            loggedInBar = document.getElementById("LoggedInBar");
            loggedOutBar = document.getElementById("LoggedOutBar");
            GameEmbed.getPops();
            GameEmbed.initialiseControls();
            GameEmbed.initUserAuth();
            GameEmbed.initPopups();
            GameEmbed.checkForLogin();
            GameEmbed.initGame();
        },
        
        checkInFrame: function () {

            // Not in frame!  Always should be served via frame
            var inFrame = GameEmbed.isInFrame();
            if (!inFrame) {
                window.location.href = constructGameURL;
                return;
            }
        },
        isInFrame: function () {
            try {
                return window.self !== window.top;
            } catch (e) {
                return true;
            }
        },

        checkForLogin: function () {

            // Not logged in
            if (!loggedIn) {
                loggedOutBar.style.display = "block";
                GameEmbed.initTopBar();
                return;
            }

            // Logged in
            GameEmbed.setLoggedInAsUser(
                loggedInUsername,
                loggedInAvatarURL,
                loggedInAsUserID
            );
            
            GameEmbed.initTopBar();
        },

        setCookie: function(name, value, days) {
            var expires = "";
            if (days) {
                const date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + (value || "") + expires + "; path=/; domain=." + rootDomain + "; secure";
        },

        getCookie: function(name) {
            const nameEQ = name + "=";
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        eraseCookie: function (name) {
            document.cookie = name + "=; path=/; domain=." + rootDomain + "; expires=" + new Date(0).toUTCString();
        },

        initMessageListener: function() {

            window.addEventListener('message', function (e) {

                const message = e.data;
                if (message === "InitRequest") {
                    document.getElementById("EmbededGameFrame").contentWindow.postMessage("AuthStep2", "*");
                    return;
                }

                // Auth
                const json = e.data;
                const method = json.method;

                if (method === "login") {

                    const token = json.token;
                    const userID = json.userID;
                    const remember = json.remember;
                    const username = json.username;
                    const avatarURL = json.avatarURL;

                    GameEmbed.setLoggedInAsUser(username, avatarURL, userID);
                    GameEmbed.closePopups();
                    
                    /* Cookie */
                    let days = 1;
                    if (remember) days = 180;
                    GameEmbed.setCookie(tokenCookieName, token, days);
                    GameEmbed.setCookie(userIDCookieName, userID, days);

                    GameEmbed.sendGAEvent("Game" + constructGameID, "UserLogin", "Version" + constructGameVersion);
                }
                else console.warn("Unhandled method: " + method);

            });

        },

        logout: function() {
            loggedInBar.style.display = "none";
            loggedOutBar.style.display = "block";
            document.getElementById("LoggedInUsername").innerText = "";
            document.getElementById("LoggedInAvatar").removeAttribute("src");

            // Wipe session
            const token = GameEmbed.getCookie(tokenCookieName);
            const userID = GameEmbed.getCookie(userIDCookieName);
            if (token && userID) {
                const xhr = new XMLHttpRequest();
                xhr.open("POST", "/logout.ashx");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send("token=" + encodeURIComponent(token) + "&userID=" + encodeURIComponent(userID));
            }
            GameEmbed.eraseCookie(tokenCookieName);
            GameEmbed.eraseCookie(userIDCookieName);

            // Load logout iframe (logs out of oauth etc)
            {
                let logoutIframe = document.getElementById("ArcadeLogoutFrame");
                if (logoutIframe) {
                    logoutIframe.remove();
                }
                logoutIframe = document.createElement("iframe");
                logoutIframe.setAttribute("src", logoutFrameURL);
                logoutIframe.style.width = "1px";
                logoutIframe.style.height = "1px";
                logoutIframe.style.position = "absolute";
                logoutIframe.style.left = "-10000px";
                logoutIframe.style.top = "-10000px";
                logoutIframe.id = "ArcadeLogoutFrame";
                document.body.appendChild(logoutIframe);
            }

            loggedIn = false;
            loggedInAsUserID = 0;
            loggedInUsername = "";
            loggedInAvatarURL = "";
            GameEmbed.sendGAEvent("Game" + constructGameID, "UserLogout", "Version" + constructGameVersion);
        },

        setLoggedInAsUser: function(username, avatarURL, userID) {

            loggedInBar.style.display = "flex";
            loggedOutBar.style.display = "none";
            document.getElementById("LoggedInUsername").innerText = username;
            document.getElementById("LoggedInAvatar").setAttribute("src", avatarURL);

            loggedIn = true;
            loggedInAsUserID = userID;
            loggedInUsername = username;
            loggedInAvatarURL = avatarURL;

        },

        getPops: function() {

            sharePop = document.getElementById("SharePop");
            instructionsPop = document.getElementById("InstructionsPop");
            loginPop = document.getElementById("LoginPop");
        },

        initUserAuth: function() {

            // Show login popup
            const loginLink = document.getElementById("LoginLink");
            if (loginLink) {
                loginLink.addEventListener("click", function (event) {
                    event.preventDefault();
                    GameEmbed.showLoginPopup();
                });
            }

            // Logout link
            const logoutLink = document.getElementById("LogoutLink");
            if (logoutLink) {
                logoutLink.addEventListener("click", function (event) {
                    event.preventDefault();
                    GameEmbed.logout();
                });
            }
        },

        initPopups: function() {

            // Block popbg close
            const popups = document.querySelectorAll("#PopBG > div");
            for (let i = 0; i < popups.length; i++) {
                popups[i].addEventListener("click",
                    function (e) {
                        e.stopPropagation();
                    }
                );
            }
            const closePopLinks = document.querySelectorAll(".closePopLink");
            for (let i = 0; i < closePopLinks.length; i++) {
                closePopLinks[i].addEventListener("click",
                    function (e) {
                        e.preventDefault();
                        GameEmbed.closePopups();
                    }
                );
            }

            // Pop BG
            activePopup = "";
            popBG = document.getElementById("PopBG");
            popBG.addEventListener("click",
                function (e) {
                    e.preventDefault();
                    GameEmbed.closePopups();
                }
            );
            
            // Auto sel
            const inputs = document.querySelectorAll(".autoSel");
            for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                input.addEventListener("click",
                    function () {
                        this.setSelectionRange(0, this.value.length);
                    }
                );
            }

        },
        closePopups: function () {

            GameEmbed.sendGAEvent("Game" + constructGameID, "ClosePopup" + activePopup, "Version" + constructGameVersion);
            if (activePopup === "Share") {
                GameEmbed.closeSharePopup();
            }
            else if (activePopup === "Instructions") {
                GameEmbed.closeInstructionsPopup();
            }
            else if (activePopup === "Login") {
                GameEmbed.closeLoginPopup();
            }
            activePopup = "";

            // Close main bg
            popBG.style.display = "none";
            
            // Refocus
            const gameDoc = document.getElementById("EmbededGameFrame");
            gameDoc.focus();

        },
        closeSharePopup: function () {
            sharePop.style.display = "none";
        },
        closeInstructionsPopup: function () {
            instructionsPop.style.display = "none";
        },
        closeLoginPopup: function () {
            loginPop.style.display = "none";

            // Close
            const iFrame = loginPop.querySelector("iframe");
            iFrame.setAttribute("src", "");
        },
        showLoginPopup: function () {
            popBG.style.display = "flex";
            loginPop.style.display = "flex";
            activePopup = "Login";
            GameEmbed.sendGAEvent("Game" + constructGameID, "OpenPopup" + activePopup, "Version" + constructGameVersion);

            // Reload
            const iFrame = loginPop.querySelector("iframe");
            iFrame.setAttribute("src", iFrame.getAttribute("data-src"));
        },
        showSharePopup: function () {
            popBG.style.display = "flex";
            sharePop.style.display = "flex";
            activePopup = "Share";
            GameEmbed.sendGAEvent("Game" + constructGameID, "OpenPopup" + activePopup, "Version" + constructGameVersion);
        },
        showInstructionsPopup: function() {
            popBG.style.display = "flex";
            instructionsPop.style.display = "flex";
            activePopup = "Instructions";
            GameEmbed.sendGAEvent("Game" + constructGameID, "OpenPopup" + activePopup, "Version" + constructGameVersion);
        },

        initialiseControls: function () {

            // C3 link
            const c3Link = document.getElementById("C3Link");
            c3Link.addEventListener("mousedown", function (e) {
                GameEmbed.sendGAEvent("Game" + constructGameID, "ControlC3LogoClick", "Version" + constructGameVersion);
            });

            // Showcase link
            const showcaseLink = document.getElementById("ShowcaseLink");
            if (showcaseLink !== undefined && showcaseLink !== null) {
                showcaseLink.querySelector("a").addEventListener("click",
                    function(e) {
                        GameEmbed.sendGAEvent("Game" + constructGameID,
                            "ControlShowcaseLogoClick",
                            "Version" + constructGameVersion);
                    });
            }

            // Instructions
            const instructionsLink = document.getElementById("CtrlInstructions");
            if (instructionsLink !== undefined && instructionsLink !== null) {
                instructionsLink.addEventListener("click", function(e) {
                    e.preventDefault();
                    GameEmbed.showInstructionsPopup();
                });
            }

            // Share
            const shareLink = document.getElementById("CtrlShare");
            if (shareLink !== undefined && shareLink !== null) {

                const shareCopyButton = document.getElementById("CopyShareLink");
                shareCopyButton.addEventListener("click",
                    function (e) {
                        e.preventDefault();
                        document.getElementById("ShareURL").select();
                        document.execCommand('copy');
                    }
                );

                var shareURL = sharePop.getAttribute("data-share-url");
                var shareName = sharePop.getAttribute("data-share-name");
                var shareImage = sharePop.getAttribute("data-share-image");
                var shareDescription = sharePop.getAttribute("data-share-description");

                // Twitter link
                {
                    const shareLink = document.getElementById("ShareTwitterLink");
                    shareLink.setAttribute("href", shareLink.getAttribute("href").replace("{0}", shareURL).replace("{1}", shareName));
                    shareLink.addEventListener("mousedown", function (event) {
                        GameEmbed.sendGAEvent("Game" + constructGameID, "ShareTwitterClick", "Version" + constructGameVersion);
                    });
                }
                // FB
                {
                    const shareLink = document.getElementById("ShareFBLink");
                    shareLink.setAttribute("href", shareLink.getAttribute("href").replace("{0}", shareURL));
                    shareLink.addEventListener("mousedown", function (event) {
                        GameEmbed.sendGAEvent("Game" + constructGameID, "ShareFBClick", "Version" + constructGameVersion);
                    });
                }
                // Reddit
                {
                    const shareLink = document.getElementById("ShareRedditLink");
                    shareLink.setAttribute("href", shareLink.getAttribute("href").replace("{0}", shareURL).replace("{1}", shareName));
                    shareLink.addEventListener("mousedown", function (event) {
                        GameEmbed.sendGAEvent("Game" + constructGameID, "ShareRedditClick", "Version" + constructGameVersion);
                    });
                }
                // Linkin
                {
                    const shareLink = document.getElementById("LinkedInShareLink");
                    shareLink.setAttribute("href", shareLink.getAttribute("href").replace("{0}", shareURL).replace("{1}", shareName));
                    shareLink.addEventListener("mousedown", function (event) {
                        GameEmbed.sendGAEvent("Game" + constructGameID, "ShareLinkedInClick", "Version" + constructGameVersion);
                    });
                }
                // Pinterest
                {
                    const shareLink = document.getElementById("PinterestShareLink");
                    shareLink.setAttribute("href", shareLink.getAttribute("href").replace("{0}", shareURL).replace("{1}", shareDescription).replace("{2}", shareImage));
                    shareLink.addEventListener("mousedown", function (event) {
                        GameEmbed.sendGAEvent("Game" + constructGameID, "SharePintrestClick", "Version" + constructGameVersion);
                    });
                }
                // VK
                {
                    const shareLink = document.getElementById("ShareVKLink");
                    shareLink.setAttribute("href", shareLink.getAttribute("href").replace("{0}", shareURL).replace("{1}", shareName).replace("{2}", shareDescription).replace("{3}", shareImage));
                    shareLink.addEventListener("mousedown", function (event) {
                        GameEmbed.sendGAEvent("Game" + constructGameID, "ShareVKClick", "Version" + constructGameVersion);
                    });
                }

                // Embed
                {
                    const shareLink = document.getElementById("EmbedLink");
                    if (shareLink !== undefined && shareLink !== null) {
                        shareLink.addEventListener("mousedown", function (event) {
                            GameEmbed.sendGAEvent("Game" + constructGameID, "ShareEmbedClick", "Version" + constructGameVersion);
                        });
                    }
                }

                shareLink.addEventListener("click", function (e)
                    {
                        e.preventDefault();
                        GameEmbed.showSharePopup();
                    }
                );
            }

            // Full screen
            const fullScreenLink = document.getElementById("CtrlFullScreen");
            fullScreenLink.addEventListener("click", function (e) {
                e.preventDefault();
                if (!gameLoaded) return;

                const gameDoc = document.getElementById("EmbededGameFrame");
                if (gameDoc.requestFullscreen) {
                    gameDoc.requestFullscreen();
                } else if (gameDoc.msRequestFullscreen) {
                    gameDoc.msRequestFullscreen();
                } else if (gameDoc.mozRequestFullScreen) {
                    gameDoc.mozRequestFullScreen();
                } else if (gameDoc.webkitRequestFullscreen) {
                    gameDoc.webkitRequestFullscreen();
                }

                if (document.fullscreenEnabled === undefined && document.webkitFullscreenEnabled === undefined) {
                    GameEmbed.sendGAEvent("Game" + constructGameID,
                        "ControlFullScreenClickFailure",
                        "Version" + constructGameVersion);
                    alert("Your browser does not support full screen.");
                } else {
                    GameEmbed.sendGAEvent("Game" + constructGameID,
                        "ControlFullScreenClick",
                        "Version" + constructGameVersion);
                }

                gameDoc.focus();
            });

            // Full screen change
            {
                document.addEventListener('webkitfullscreenchange', GameEmbed.fullScreenStatusChange, false);
                document.addEventListener('mozfullscreenchange', GameEmbed.fullScreenStatusChange, false);
                document.addEventListener('fullscreenchange', GameEmbed.fullScreenStatusChange, false);
                document.addEventListener('MSFullscreenChange', GameEmbed.fullScreenStatusChange, false);
            }

        },

        // When full screen mode changes
        fullScreenStatusChange: function() {
            var fullScreenValue = 0;
            var fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
            if (fullscreenElement !== null) {
                fullScreenValue = 1;
            }
            GameEmbed.sendGAEvent("Game" + constructGameID, "FullScreenModeChange", "Version" + constructGameVersion, fullScreenValue);
        },

        initTopBar: function () {

            const forceTopBar = window.location.hash === "#forcetopbar";

            // Forced top bar
            if (forceTopBar === true) {
                GameEmbed.showTopBar();
                return;
            }

            // Not on main domain
            let referrer = document.referrer;
            if (!referrer) {
                GameEmbed.showTopBar();
                return;
            }

            // Remove qstring
            const qString = referrer.indexOf("?");
            if (qString !== -1) {
                referrer = referrer.substr(0, qString);
            }

            // Not on official website
            if (referrer !== constructGameURL) {
                GameEmbed.showTopBar();
                return;
            }
            
            // Main website and game frame different login states
            if (mainWebsiteLoggedInUserID !== loggedInAsUserID) {
                GameEmbed.showTopBar();
                return;
            }

            GameEmbed.hideTopBar();
        },

        showTopBar: function () {
            document.getElementById("TopBar").style.display = "flex";
            const iFrame = document.getElementById("EmbededGameFrame");
            if (iFrame) {
                iFrame.setAttribute("style", "height: calc(100% - 34px - 20px)");
            }
        },
        hideTopBar: function () {
            document.getElementById("TopBar").style.display = "none";
            const iFrame = document.getElementById("EmbededGameFrame");
            if (iFrame) {
                iFrame.setAttribute("style", "height: calc(100% - 34px)");
            }
        },

        initGame: function() {

            aUnit = document.getElementById("APop");
            aLink = document.getElementById("ALink");

            const referer = document.referrer;
            var fromOfficialSite = false;
            if (referer && referer.startsWith(c3RootDomain)) {
                fromOfficialSite = true;
            }
            if (!loggedIn && !fromOfficialSite) {
                GameEmbed.showPGC();

            } else {
                aUnit.remove();
                GameEmbed.showGame();
            }

        },

        showPGC: function () {

            aUnit.style.display = "flex";
            aLink.setAttribute("style", "background-image:url('" + aBG + "');");

            aLink.addEventListener("click",
                function () {
                    GameEmbed.sendGAEvent("Game" + constructGameID, "PreGameContentClick", "Version" + constructGameVersion);
                    GameEmbed.hidePGC();
                    GameEmbed.showGame();
                }
            );

            const fullScreenButton = document.getElementById("CtrlFullScreen").parentNode;
            fullScreenButton.style.display = "none";
            GameEmbed.sendGAEvent("Game" + constructGameID, "ShowPreGameContent", "Version" + constructGameVersion);

            window.addEventListener("resize", GameEmbed.onResize);
            GameEmbed.onResize();

            const countDown = document.getElementById("ACount");
            let seconds = parseInt(countDown.innerHTML);
            const originalSeconds = seconds;
            const aCountdown = setInterval(function () {
                seconds--;
                countDown.innerHTML = seconds;

                if (seconds === 0) {
                    clearInterval(aCountdown);
                    GameEmbed.sendGAEvent("Game" + constructGameID, "PreGameContentTimedOut", "Version" + constructGameVersion, originalSeconds);
                    GameEmbed.hidePGC();
                    GameEmbed.showGame();
                }

            }, 1000);

        },
        onResize: function() {

            // Minus values represent padding
            const outerWidth = aUnit.offsetWidth - 30;
            const outerHeight = aUnit.offsetHeight - 60;
            if (outerWidth > 400 && outerHeight > 400) {
                aLink.style.width = 400 + "px";
                aLink.style.height = 400 + "px";
            }
            else if (outerWidth < outerHeight) {
                aLink.style.height = outerWidth + "px";
                aLink.style.width = outerWidth + "px";
            }
            else if (outerWidth > outerHeight) {
                aLink.style.height = outerHeight + "px";
                aLink.style.width = outerHeight + "px";
            }
        },

        hidePGC: function() {

            aUnit.remove();
            const fullScreenButton = document.getElementById("CtrlFullScreen").parentNode;
            fullScreenButton.style.display = "list-item";
            window.removeEventListener("resize", GameEmbed.onResize);
        },
        
        showGame: function() {
            const frame = document.getElementById("EmbededGameFrame");
            if (!embedErrorNotice) {
                const frameSrc = frame.getAttribute("data-src");
                frame.setAttribute("src", frameSrc);
                gameLoaded = true;
                GameEmbed.sendGAEvent("Game" + constructGameID, "GameLoadStart", "Version" + constructGameVersion);
            } else {
                frame.remove();
            }
        },

        // Send a GA event to all accounts
        sendGAEvent: function (eventCategory, eventAction, eventLabel, eventValue, transport) {
            const eventObject = JSON.parse(JSON.stringify(
                {
                    eventCategory: eventCategory,
                    eventAction: eventAction,
                    eventLabel: eventLabel,
                    eventValue: eventValue,
                    transport: transport
                },
                GameEmbed.gaClean,
                "\t"
            ));
            for (let i = 0; i < gaAccountNames.length; i++) {
                const accountName = gaAccountNames[i];
                ga(accountName + '.send', 'event', eventObject);
            }
        },
        gaClean: function (key, value) {
            if (value === null) {
                return undefined;
            }
            return value;
        },

    };

    GameEmbed.init();

})();