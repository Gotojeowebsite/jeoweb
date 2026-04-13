/*
Version 1.55

You may self-host this script if you wish to limit the amount of external scripts running on your site. The only external requests made are within the sandboxed iframe.

Any questions or concerns? Feel free to contact us at https://minnit.chat/support

Happy chatting!
*/
(function () {
    function renderIframes() {
        if ((typeof (document.getElementsByTagName("minnit-chat")) !== 'undefined' && document.getElementsByTagName("minnit-chat") !== null && typeof (document.getElementsByTagName("minnit-chat")[0]) !== 'undefined' && document.getElementsByTagName("minnit-chat")[0] !== null) || (typeof (document.getElementsByClassName("minnit-chat-sembed")) !== 'undefined' && document.getElementsByClassName("minnit-chat-sembed") !== null && typeof (document.getElementsByClassName("minnit-chat-sembed")[0]) !== 'undefined' && document.getElementsByClassName("minnit-chat-sembed")[0] !== null)) {
            //an existing tag is present, draw chat here!
            const chatElements = document.querySelectorAll('minnit-chat, .minnit-chat-sembed');
            if (chatElements.length > 0) {
                chatElements.forEach((MinnitChatTag) => {
                    if (typeof (MinnitChatTag.innerHTML) === 'undefined' || !MinnitChatTag.innerHTML || MinnitChatTag.innerHTML.indexOf('iframe') == -1) {
                        var thisTagChatName = MinnitChatTag.getAttribute('data-chatname');
                        var thisStyleTag = MinnitChatTag.getAttribute('data-style');
                        var thisVersion = MinnitChatTag.getAttribute('data-version');
                        var thisIframeID = MinnitChatTag.getAttribute('data-iframeid');
                        if (!thisVersion) {
                            thisVersion = 1;
                        }
                        if (thisTagChatName.indexOf('/') == -1) {
                            //user is not providing full URL  -- automatically craft the default minnit.chat setup (for legacy users)
                            thisTagChatName = 'https://minnit.chat/' + thisTagChatName
                        }
                        thisTagChatName = thisTagChatName.split(' ').join('').split('<').join('').split('"').join('').split("'").join('')
                        var urlparams = ''
                        if (thisTagChatName.indexOf('?') > -1) {
                            urlparams = thisTagChatName.split('?')[1]
                            thisTagChatName = thisTagChatName.split('?')[0]
                        }
                        var fixedwidthheight = "";
                        if (thisStyleTag == null) {
                            thisStyleTag = 'width:90%;height:500;';
                        } else if (parseFloat(thisVersion) >= 1.52) {
                            var fixedwidthheightArray = getFixedHeightAndWidth(thisStyleTag);
                            if (fixedwidthheightArray.length === 2) {
                                fixedwidthheight = 'width="' + fixedwidthheightArray[0] + '" height="' + fixedwidthheightArray[1] + '"';
                            }
                        }
                        var iframeIDTag = "";
                        if (thisIframeID) {
                            iframeIDTag = ' id="' + thisIframeID + '" ';
                        }
                        var newEmbedKey = Math.floor(Math.random() * 10000000) + 1;
                        MinnitChatTag.innerHTML = '<iframe ' + iframeIDTag + ' src="' + thisTagChatName + '?embed&' + urlparams + '&nec=' + newEmbedKey + '" data-nec="' + newEmbedKey + '" ' + fixedwidthheight + ' style="border:none;' + thisStyleTag + '" class="minnit-chat-iframe" allowTransparency="true" scrolling="no"></iframe>';
                        if (MinnitChatTag.tagName.toLowerCase() !== "minnit-chat") {
                            if (MinnitChatTag.getAttribute('data-preserve-style')) {
                                MinnitChatTag.style = 'display: inline;';
                            } else {
                                MinnitChatTag.style = 'all: unset; display: inline; width: auto; height: auto; background: transparent; color: inherit; font: inherit; text-align: inherit; margin: 0; padding: 0; border: none; box-shadow: none; outline: none; line-height: inherit; letter-spacing: normal; word-spacing: normal; vertical-align: baseline; overflow: visible; white-space: inherit; position: static; clip: auto; z-index: auto; visibility: inherit; opacity: 1; mix-blend-mode: normal; pointer-events: auto; user-select: text;';
                            }
                        }
                    }
                });
            }
        }
    }
    function createMinnitCookie(name, value, hours) {
        var expires;
        if (hours) {
            var date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        } else expires = "";
        document.cookie = name + "=" + value + expires + "; path=/; SameSite=None; Secure";
    }
    function getMinnitCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
    function localStorageSupported() {
        try {
            if (typeof (localStorage) == 'object') {
                localStorage.getItem("test");
                return true;
            }
        } catch (e) {
            return false;
        }
        return false;
    }
    function createMinnitLocalStorage(name, value, orgid) {
        name = "minnit" + orgid + "_" + name;
        if (localStorageSupported()) {
            localStorage.setItem(name, value);
        } else {
            createMinnitCookie(name, value); //fallback for older browsers
        }
    }
    function deleteMinnitLocalStorage(name, orgid) {
        name = "minnit" + orgid + "_" + name;
        if (localStorageSupported()) {
            localStorage.removeItem(name);
        } else {
            createMinnitCookie(name, "", -1);
        }
    }
    function getMinnitLocalStorage(name, orgid) {
        name = "minnit" + orgid + "_" + name;
        if (localStorageSupported()) {
            return localStorage.getItem(name);
        } else {
            return getMinnitCookie(name); //fallback for older browsers
        }
    }
    function getFixedHeightAndWidth(tStyleTag) {
        tStyleTag = tStyleTag.replace(/-width/g, '').replace(/-height/g, '');
        var values = [];
        var widthSplit = tStyleTag.split("width:");
        if (widthSplit && widthSplit.length >= 2) {
            widthSplit = widthSplit[1].split(";");
            //should either be just numbers, or numbers + px
            if (widthSplit[0]) {
                thisWidth = widthSplit[0].replace(/ /g, '');
                if (!isNaN(thisWidth) || thisWidth.slice(-2) == "px") {
                    values.push(thisWidth.replace(/[^0-9]/g, ''));
                }
            }
        }
        var heightSplit = tStyleTag.split("height:");
        if (heightSplit && heightSplit.length >= 2) {
            heightSplit = heightSplit[1].split(";");
            //should either be just numbers, or numbers + px
            if (heightSplit[0]) {
                thisHeight = heightSplit[0].replace(/ /g, '');
                if (!isNaN(thisHeight) || thisHeight.slice(-2) == "px") {
                    values.push(thisHeight.replace(/[^0-9]/g, ''));
                }
            }
        }
        return values;
    }
    window.addEventListener("message", function (event) {
        if (typeof (event) !== 'undefined' && event !== null && typeof (event.data) === 'string' && event.data !== null && event.data.indexOf('"minnitnec"') > -1) {
            //find the relevant iframe this is from
            try {
                var eventObj = JSON.parse(event.data);
                if (!(eventObj.hasOwnProperty('orgid') && eventObj.orgid)) {
                    return //missing orgid
                }
                document.querySelectorAll('iframe').forEach((thisEmbed) => {
                    if (typeof (thisEmbed.dataset) !== 'undefined' && thisEmbed.dataset.hasOwnProperty('nec') && thisEmbed.dataset.nec == eventObj.minnitnec) {
                        //first, check if this device still has items that aren't unique to the Organization -- theoretically, owners may have more than one Organization embedded on their website. because of this, we will store the Organization ID in the item's name, starting Monday, August 15, 2022. old items will go through the following one-time conversion to the new system.
                        if (getMinnitLocalStorage("rauthv", "") != null || getMinnitLocalStorage("gauthv", "") != null) {
                            //convert those over...
                            createMinnitLocalStorage("rauthv", getMinnitLocalStorage("rauthv", ""), eventObj.orgid);
                            deleteMinnitLocalStorage("rauthv", "");
                            createMinnitLocalStorage("gauthv", getMinnitLocalStorage("gauthv", ""), eventObj.orgid);
                            deleteMinnitLocalStorage("gauthv", "");
                            createMinnitLocalStorage("gsto", getMinnitLocalStorage("gsto", ""), eventObj.orgid);
                            deleteMinnitLocalStorage("gsto", "");
                            createMinnitLocalStorage("sto", getMinnitLocalStorage("sto", ""), eventObj.orgid);
                            deleteMinnitLocalStorage("sto", "");
                            createMinnitLocalStorage("nickname", getMinnitLocalStorage("nickname", ""), eventObj.orgid);
                            deleteMinnitLocalStorage("nickname", "");
                            createMinnitLocalStorage("guestid", getMinnitLocalStorage("guestid", ""), eventObj.orgid);
                            deleteMinnitLocalStorage("guestid", "");
                        }
                        //now, check what this request was for...
                        switch (eventObj.request) {
                            case "getsigninvars":
                                var postMessageData = {
                                    'minnitnec': eventObj.minnitnec,
                                    'signinvars': true,
                                    'v': 1.2
                                }
                                try {
                                    if (eventObj.hasOwnProperty('planid') && eventObj.planid) {
                                        var poweredByMinnitLinks = document.getElementsByClassName('powered-by-minnit');
                                        Array.prototype.forEach.call(poweredByMinnitLinks, function (toRemove) {
                                            toRemove.remove();
                                        });
                                    }
                                } catch (e) {
                                    //ignore
                                }
                                if (getMinnitLocalStorage("rauthv", eventObj.orgid) != null && getMinnitLocalStorage("rauthv", eventObj.orgid).length > 6) {
                                    postMessageData.rauthv = getMinnitLocalStorage('rauthv', eventObj.orgid);
                                    postMessageData.sto = getMinnitLocalStorage('sto', eventObj.orgid);
                                } else {
                                    postMessageData.gauthv = getMinnitLocalStorage('gauthv', eventObj.orgid);
                                    postMessageData.gsto = getMinnitLocalStorage('gsto', eventObj.orgid);
                                    if (getMinnitLocalStorage('nickname', eventObj.orgid) !== null) {
                                        postMessageData.nickname = getMinnitLocalStorage('nickname', eventObj.orgid);
                                    }
                                }
                                postMessageData.guestid = getMinnitLocalStorage('guestid', eventObj.orgid);
                                thisEmbed.contentWindow.postMessage(JSON.stringify(postMessageData), '*');
                                break;
                            case "setcookie":
                                createMinnitLocalStorage(eventObj.cookiename, eventObj.cookievalue, eventObj.orgid);
                                break;
                            case "getcookie":
                                thisEmbed.contentWindow.postMessage('{"minnitnec": ' + eventObj.minnitnec + ', "cookiename": "' + eventObj.cookiename + '", "cookievalue": "' + getMinnitLocalStorage(eventObj.cookiename) + '"}', '*');
                                break;
                            case "setguest":
                                createMinnitLocalStorage("gsto", eventObj.gsto, eventObj.orgid);
                                createMinnitLocalStorage("gauthv", eventObj.gauthv, eventObj.orgid);
                                if (eventObj.hasOwnProperty('guestid')) {
                                    createMinnitLocalStorage("guestid", eventObj.guestid, eventObj.orgid);
                                }
                                break;
                            case "logout":
                                deleteMinnitLocalStorage("gsto", eventObj.orgid);
                                deleteMinnitLocalStorage("sto", eventObj.orgid);
                                deleteMinnitLocalStorage("gauthv", eventObj.orgid);
                                deleteMinnitLocalStorage("rauthv", eventObj.orgid);
                                deleteMinnitLocalStorage("guestid", eventObj.orgid);
                                deleteMinnitLocalStorage("nickname", eventObj.orgid);
                                break;
                        }
                    }
                });
            } catch (err) {
                //something went amiss
            }
        }
    });
    renderIframes();
    setInterval(renderIframes, 500);
}())
