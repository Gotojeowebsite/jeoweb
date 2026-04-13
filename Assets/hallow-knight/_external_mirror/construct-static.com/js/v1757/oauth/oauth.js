function onGoogleSignIn(googleUser) {

    var credential = googleUser.credential;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", secureRootDomain + "/handlers/oauth/google.json");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function () {

        // Something went wrong
        const json = JSON.parse(xhr.responseText);

        if (!json.success) {
            showErrorMessage(json.errorMessage);
            doGoogleDisconnect();
            return;
        }
        onSuccessRedirect();
    };
    if (oAuthMode === "ACCOUNT") {
        xhr.send("idtoken=" + credential + "&mode=" + oAuthMode + "&action=CONNECT");
    } else {
        xhr.send("idtoken=" + credential + "&mode=" + oAuthMode);
    }
}
var onGoogleFailure = function (error) {

    var errorCode = error.error;
    if (errorCode === "popup_closed_by_user" || errorCode === "access_denied") {

    } else {
        showErrorMessage(error.error);
        google.accounts.id.disableAutoSelect();
    }
};
function doGoogleSignOut() {
    google.accounts.id.disableAutoSelect();
}
function doGoogleDisconnect() {
    google.accounts.id.cancel();
}

var facebookDisconnectButtons = document.querySelectorAll(".btnFacebookDisconnect");
for (var i = 0; i < facebookDisconnectButtons.length; i++) {
    var btn = facebookDisconnectButtons[i];
    btn.addEventListener("click",
        function (e) {
            e.preventDefault();

            if (!confirm("Are you sure you wish to disconnect your Facebook login?")) {
                return;
            }

            const redirect = this.getAttribute("data-redirect");

            const xhr = new XMLHttpRequest();
            xhr.open("POST", secureRootDomain + "/handlers/oauth/facebook.json");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {

                const json = JSON.parse(xhr.responseText);
                if (json.hasOwnProperty("success") && json.success === false) {
                    showErrorMessage(json.errorMessage);
                    return;
                }
                window.location.replace(secureRootDomain + "/" + currentLanguageURLPart + redirect);
            };
            xhr.send("action=DISCONNECT&mode=" + oAuthMode);
        }
    );
}

var googleDisconnectButtons = document.querySelectorAll(".btnGoogleDisconnect");
for (var i = 0; i < googleDisconnectButtons.length; i++) {
    var btn = googleDisconnectButtons[i];
    btn.addEventListener("click",
        function(e) {
            e.preventDefault();

            if (!confirm("Are you sure you wish to disconnect your Google login?")) {
                return;
            }

            const redirect = this.getAttribute("data-redirect");

            const xhr = new XMLHttpRequest();
            xhr.open("POST", secureRootDomain + "/handlers/oauth/google.json");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                
                const json = JSON.parse(xhr.responseText);
                if (json.hasOwnProperty("success") && json.success === false) {
                    showErrorMessage(json.errorMessage);
                    return;
                }
                doGoogleDisconnect();
                window.location.replace(secureRootDomain + "/" + currentLanguageURLPart + redirect);

            };
            xhr.send("action=DISCONNECT&mode=" + oAuthMode);

        });
}

var googleLoginButton = document.getElementById("GoogleOAuthLoginButton");
if (googleLoginButton) {
    googleLoginButton.addEventListener("click",
        function(e) {
            e.preventDefault();
            
        });
}

function showErrorMessage(message) {

    const errorWrapper = document.getElementById("AuthErrorWrapper");
    errorWrapper.replaceChildren();
    const errorBox = document.createElement("div");
    errorBox.classList.add("notification");
    errorBox.classList.add("error");
    errorBox.innerHTML = message;
    errorWrapper.appendChild(errorBox);
}

var facebookLoginButton = document.getElementById("FacebookOAuthLoginButton");
if (facebookLoginButton) {
    facebookLoginButton.addEventListener("click",
        function (e) {
            e.preventDefault();

            var action = this.getAttribute("data-action");

            FB.login(function (response) {

                console.log(response);

                const accessToken = response.authResponse.accessToken;
                const userID = response.authResponse.userID;

                var xhr = new XMLHttpRequest();
                xhr.open("POST", secureRootDomain + "/handlers/oauth/facebook.json");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = function () {
                    
                    // Something went wrong
                    const json = JSON.parse(xhr.responseText);

                    if (json.hasOwnProperty("success") && json.success === false) {
                        showErrorMessage(json.errorMessage);
                        doGoogleDisconnect();
                        return;
                    }
                    onSuccessRedirect();
                };
                if (action !== null) {
                    xhr.send("accessToken=" + accessToken + "&userID=" + userID + "&mode=" + oAuthMode + "&action=" + action);
                } else {
                    xhr.send("accessToken=" + accessToken + "&userID=" + userID + "&mode=" + oAuthMode);
                }
            }, {
                scope: 'email',
                return_scopes: true });
        });
}

function onSuccessRedirect() {
    if (typeof oAuthRefresh !== 'undefined' && oAuthRefresh === true) {
        window.location = window.location.pathname;
    }
    else {
        let redirectURL = secureRootDomain;
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('return')) {

            let returnPart = urlParams.get('return');
            if (returnPart) {
                returnPart = returnPart.trim();
                if (!returnPart.startsWith("/")) {
                    returnPart = "/" + returnPart;
                }
                redirectURL += returnPart;
            }
        }

        console.log(redirectURL);

        window.location.replace(redirectURL);
    }
}