const btn = document.querySelector('.twitch-btn'),
      loginStatus = document.querySelector('.login-status'),
      warning = document.querySelector('.login-warning'),
      warningTwo = document.querySelector('.login-warning-two'),
      unlinkBtn = document.querySelector('.unlink-btn'),
      notficationConfirmClass = 'notification-confirm',
      entitlementMsg = document.getElementById('entitlement-msg'),
      linkedParams = 'code',
      windowFeat = '_self',
      actionWrapper = document.getElementById('action-wrapper-btn-group'),
      entitlementsBox = document.getElementById('entitlements'),
      countDownTimer = document.getElementById('countdown-container'),
      countdownStatus = document.getElementById('countdown-status'),
	  twitchStream = document.getElementById('twitch-streams'),
	  dropsTitle = document.getElementById('current-drops-title'),
	  servicesServer = 'wss://' + 'shellshock.io' + '/services/',
	  eventStartDate = '2024-04-15T22:00:00.000Z',
	  eventEndDate = '2024-05-01T22:00:00.000Z',
	//   btnWatch = document.querySelector('.play-button'),
      windowLocation = document.location.origin;
let isLoggedIn = null,
    twitchAuthState = null,
    noAccount = null,
    isLinking = null,
    isLinked = null,
    twitchDisplayName = null,
    linkdata = {},
    firebaseId = null,
    isAnonymous = false,
    verifyEmail = false,
    twitchClient = null,
    noTwitchAccount = null,
    linkingError = null,
    slash = '/',
    ws,
	twitchData,
    entitlements = [];

if (windowLocation.endsWith('/')) {
    slash = '';
}

const makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
};

const linkTwitchAccount = () => {
    ws.send(JSON.stringify({
        cmd: 'twitchLinkPlayerAccount',
        data: linkdata,
    }));
};

const sendTwitchLinkData = (data) => {
    ws.send(JSON.stringify({
        cmd: 'twitchLinkPlayerAccount',
        data,
    }));
};

const getEntitlements = () => {
    ws.send(JSON.stringify({
        cmd: 'getTwitchEntitlements'
    }));
};

const twitchRequest = () => window.open(`https://id.twitch.tv/oauth2/authorize?client_id=${twitchClient}&redirect_uri=${document.location.origin}${slash}twitch&response_type=code&scope=user:read:email&force_verify=true&state=${twitchAuthState}`, windowFeat);

const firebaseLoginInit = () => {
    if (firebase) {
        login((user) => {
        user.getIdToken(true).then((fBIdToken) => authorize(fBIdToken));
    }, loginFail);
    } else {
        console.log('no firebase');
    }
};

const browserTabRefresh = () => {
    if (isLinked) return;
    document.addEventListener('visibilitychange', function() {
        if (!document.hidden){
            location.reload();
            firebaseLoginInit();
        }
     });
};

const addAnimationChange = (el, elClass, callback) => {
    el.classList.add(elClass);
    setTimeout(() => {
        el.classList.remove(elClass);
        if (callback) callback();
    }, 3000);
};

const thirdPartyText = () => {
    const textLogin = 'You\'re logged in!';

    if (noAccount) {
        addAnimationChange(loginStatus, notficationConfirmClass);
        loginStatus.innerHTML = `You are not logged in.`;
        btn.innerHTML = 'Not logged in';
    }

    if (isLoggedIn) {
        if (isLinked) {
            addAnimationChange(loginStatus, notficationConfirmClass);
            loginStatus.innerHTML = `<i class="fas fa-check-circle text-twitch-yellow"></i> Account linked as "${twitchDisplayName}"`;
            unlinkBtn.classList.remove('hideme');
            //justify-self-end
            btn.classList.remove('justify-self-center');
            btn.classList.add('justify-self-end');
            actionWrapper.classList.remove('grid-column-1-eq');
            actionWrapper.classList.add('grid-column-2-eq');
        } else {
            loginStatus.innerHTML = textLogin;
        }
        if (isLinking) {
            btn.innerHTML = 'Setting up link';
            btn.classList.add('is-linking');
        } else {
            actionWrapper.classList.remove('grid-column-1-eq');
            actionWrapper.classList.add('grid-column-2-eq');
            btn.classList.remove('justify-self-center');
            btn.classList.add('justify-self-end');
            if (isLinked) {
                btn.innerHTML = '<i class="fab fa-twitch fa-2x"></i> Go to Shell Shockers';
            } else {
                btn.innerHTML = '<i class="fab fa-twitch fa-2x"></i> Link Twitch account';
                actionWrapper.classList.remove('grid-column-2-eq');
                actionWrapper.classList.add('grid-column-1-eq');
                btn.classList.remove('justify-self-end');
                btn.classList.add('justify-self-center');

            }
        }
        if (isAnonymous) {
            warning.classList.remove('invisible');
            warning.classList.add('slide-in');
            addAnimationChange(warning, notficationConfirmClass);
            warning.innerHTML = `<i class="fas fa-exclamation-circle"></i> FYI your account type in anonymous and is not linked to <i>provider</i> or <i>email address.</i>`;
        }

        if (!isLinked) {
            unlinkBtn.classList.add('hideme');
            if (noTwitchAccount) {
                addAnimationChange(loginStatus, notficationConfirmClass);
                loginStatus.innerHTML = textLogin;
            } else {
                addAnimationChange(loginStatus, notficationConfirmClass);
                loginStatus.innerHTML = `"${twitchDisplayName}" is no longer linked in our database.`;
            }
        }
        
    } else {
        browserTabRefresh();
        if (!linkingError) {

            loginStatus.innerHTML = 'Sorry, you\'ll need to sign in.';
        }
        btn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Sign in';
    }
    loginStatus.classList.remove('invisible');
};

const twitchButtonListen = () => {
    btn.addEventListener('click', (e) => {
        if (isLoggedIn) {
            console.log('Link accounts');
            if (isLinking) {
                e.preventDefault();
            } else if (isLinked) {
                window.open(document.location.origin, windowFeat);
            } else {
                twitchAuthState = makeid(12);
                localStorage.setItem('twitchAuthState', twitchAuthState);
                twitchRequest();
            }

        } else {
            window.open(window.location.origin + '?signInPrompt=true&closeAfterSign=true', '_blank');
        }
    });
    unlinkBtn.addEventListener('click', () => {
        if (isLinked) {
            ws.send(JSON.stringify({
                cmd: 'twitchUnlinkPlayerAccount',
                firebaseId: firebaseId,
            }));
        }
    });
};

const buildEntitlements = () => {
    if (entitlements.length === 0) return;
    // "id": "fb78259e-fb81-4d1b-8333-34a06ffc24c0",
    // "benefit_id": "74c52265-e214-48a6-91b9-23b6014e8041",
    // "timestamp": "2019-01-28T04:17:53.325Z",
    // "user_id": "25009227",
    // "game_id": "33214",
    // "fulfillment_status": "CLAIMED",
    // "updated_at": "2019-01-28T04:17:53.325Z"
    entitlements.forEach(drop => {

    });
    
};

const runUiChecks = () => {
    thirdPartyText();
    twitchButtonListen();
};

const getJson = (str) => {
    if (!str) return false;
    let data;
    try {
        JSON.parse(str);
        data = JSON.parse(str);
    } catch (e) {
        return false;
    }
    return data;
};

const entitlementImg = (item, el) => {
	let newEl = document.createElement('div');
	let newImg = document.createElement('img');
	let newBtn = document.createElement('h6');
	let imgLinkWrapper = document.createElement('a');
	newEl.className = 'entitlement';
	newBtn.className = 'entitlement-title fullwidth';
	newImg.className = 'entitlement-img roundme_lg';
	if (item.active) newEl.classList.add('active');
	newImg.src = item.imagePath;
	newBtn.innerHTML = item.name;
	// newBtn.href = item.link;
	// newBtn.target = '_blank';
	imgLinkWrapper.href = item.link;
	imgLinkWrapper.target = '_blank';
	imgLinkWrapper.appendChild(newImg);
	newEl.appendChild(imgLinkWrapper);
	newEl.appendChild(newBtn);
	el.appendChild(newEl);
	entitlementsBox.appendChild(el);
};

// for each add image wrapped in url, button with url and append to entitlements
const setupEntitlements = (data) => {
    if (data !== null) {
		const weekOne = [];
		const weekTwo = [];
		const past = [];

        // entitlementMsg.innerHTML = 'Watch a Shell Streamer for <u>3 hours</u> to get their drop!';

		document.getElementById('entitlements-loading').style.display = 'none';

		if (data.current.weekOne !== null && data.current.weekOne.length > 0) {
			const el = document.createElement('div');
				el.className = 'display-grid grid-column-2-eq roundme_md';
			const header = document.createElement('h2');
				header.textContent = 'Week 1';
				header.className = 'grid-span-2-start-1';
			el.appendChild(header);
			weekOne.push(...data.current.weekOne);
			weekOne.forEach(item => entitlementImg(item, el));
			entitlementsBox.classList.add( 'display-grid', 'grid-column-1-eq', 'grid-gap-1');
		}

		if (data.current.weekTwo !== null && data.current.weekTwo.length > 0) {
			const el = document.createElement('div');
				el.className = 'display-grid grid-column-2-eq roundme_md';
			const header = document.createElement('h2');
				header.textContent = 'Week 2';
				header.className = 'grid-span-2-start-1';
			el.appendChild(header);
			weekTwo.push(...data.current.weekTwo);
			weekTwo.forEach(item => entitlementImg(item, el));
			entitlementsBox.classList.remove( 'grid-column-1-eq');
			entitlementsBox.classList.add( 'grid-column-2-eq');
		}

		if (data.past !== null && data.past.length > 0) {
			const el = document.createElement('div');
			const header = document.createElement('h2');
				header.textContent = 'Past items';
			el.appendChild(header);
			past.push(...data.past);
			past.forEach(item => entitlementImg(item, el));
			entitlementsBox.classList.remove( 'grid-column-2-eq');
			entitlementsBox.classList.add( 'grid-column-3-eq');
		}
    }
};

async function getEntitlementData() {
	const response = await fetch('./drop-data.json?' + Date.now());
	const rewards = await response.json();
	return rewards;
}

async function twitchStreamers() {
	const response = await fetch('../data/twitchStreams.json?' + Date.now());
	const streamers = await response.json();
	return streamers;
}

window.onload = function () {
	// fetchTwitchStreams();
	twitchStreamers().then(data => streamersSetup(data)).catch(err => console.log('Streamers error: ', err));
    firebaseLoginInit();
    getEntitlementData().then(data => setupEntitlements(data)).catch(err => console.log('Entitlements error: ', err));
};

// Firebase login
function login (success, fail) {
    var config = {
        apiKey: "AIzaSyDP4SIjKaw6A4c-zvfYxICpbEjn1rRnN50",
        authDomain: "shellshockio-181719.firebaseapp.com",
        databaseURL: "https://shellshockio-181719.firebaseio.com",
        projectId: "shellshockio-181719",
        storageBucket: "shellshockio-181719.appspot.com",
        messagingSenderId: "68327206324"
    };
    
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
     } else {
        firebase.app(); // if already initialized, use that one
     }

    // firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // console.log('Login auth provider: ' + user.providerData[0].providerId);
            // We're logged into Firebase. If this is an email/password login,
            // and user has yet to verify email address, do so here
            if (!user.emailVerified) emailVerified = false;
            
            if (user.isAnonymous) isAnonymous = true;

            success(user);
        } else {
            // We're logged out
            fail();
        }
    });
}

function loginFail () {
    console.log('login failed');
    runUiChecks();
}

function authorize () {
    firebase.auth().currentUser.getIdToken(true).then(function (fBIdToken) {
        // console.log('Using services server: ' + servicesServer);

        try {
            ws = new WebSocket(servicesServer);
        } catch (e) {
            console.log('WebSocket error: ', e);
        }

        ws.onopen = function (e) {
            console.log('authorizing');

            ws.send(JSON.stringify({
                cmd: 'thirdPartyAuth',
                token: fBIdToken
            }));

            // getEntitlements();

            setInterval(() => {
                ws.send(JSON.stringify({ ping: 1 }));
            }, 15000);
        };

        ws.onmessage = function (e) {
            let data = '';

            data = JSON.parse(e.data);

            if (data.hasOwnProperty('length')) {
                data = data[0];
            }

            switch (data.cmd) {
                case 'twitchAuthCheck':
                    if (data.hasOwnProperty('authorized') && data.authorized === true) {

                        console.log('authorized');
                        twitchClient = data.twitch;
                        isLinked = data.isLinked;
                        twitchDisplayName = data.displayName;
                        noAccount = false;

                        if (!twitchDisplayName) {
                            noTwitchAccount = true;
                        }
                        loggedIn(data);
                    } else {
                        console.log('not authorized!');
                        noAccount = true;
                        runUiChecks();
                    }
                    break;

                case 'linkTwichAccount':
                    if (data.hasOwnProperty('dbError') || data.hasOwnProperty('jsonError')) {
                        linkingError = true;
                        let errorDesc = data.hasOwnProperty('dbError') ? JSON.stringify(data.dbError) : data.jsonError;
                        loginStatus.innerHTML = `There was an error with linking account. Please contact our support. Or reload and try again.<br /><br /> Error: <i>${errorDesc}</i>`;
                    } else {
                        isLinked = true;
                        isLinking = false;
                        loginStatus.innerHTML = `Your Twitch account, ${data.twitchDisplayName} is linked!`;
                    }
                    localStorage.removeItem('twitchAuthState');
                    addAnimationChange(loginStatus, notficationConfirmClass, runUiChecks);
                    break;

                case 'twitchAccountUnlinked':
                    if (data.status === 'SUCCESS') {
                        isLinked = false;
                        runUiChecks();
                    }
                    break;

                case 'showEntitlements':
                    if (data.hasOwnProperty('drops')) {
                        entitlements = data.drops.data;
                        runUiChecks();
                    }
                    break;
            
                default:
                    break;
            }

            if (data.error) {
                alert(JSON.stringify(data));
            }
            
        };

        ws.onclose = function (e) {
            switch(e.code) {
            case 4100:
                loginStatus.innerHTML = 'Something went wrong, reload!';
                break;
            default:
                loginStatus.innerHTML = 'The connection is lost. Reload.';
                break;
            }
        };

        ws.onerror = function (e) {
            console.log('error: ' + JSON.stringify(e, ['message', 'arguments', 'type', 'name']));
        };
    });
}

function loggedIn (data) {
    var user = firebase.auth().currentUser;
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());

    isLoggedIn = true;
    firebaseId = data.firebaseId;

    if (parsedUrl.query.hasOwnProperty('code') && parsedUrl.query.hasOwnProperty('state')) {

        const state  = localStorage.getItem('twitchAuthState');

        if (parsedUrl.query.state === state) {
            isLinking = true;
            const {code} = parsedUrl.query;
            linkdata = {
                code,
                state,
                firebase_id: firebaseId
            };

            linkTwitchAccount();
        }
    }
    runUiChecks();
}

function initAcc(elem, option){
    //addEventListener on mouse click
    document.addEventListener('click', function (e) {
        //check is the right element clicked

        let elmParent;

        if (e.target.matches(elem +' .a-btn')) {
            elmParent = e.target.parentElement;
        } else if (e.target.matches(elem +' .plus-sign')) {
            elmParent = e.target.parentElement.parentElement;
        }


        if (!e.target.matches(elem +' .a-btn') && !e.target.matches(elem +' .plus-sign')) {
        
            return;

        } else {

            //check if element contains active class
            if (!elmParent.classList.contains('active')) {
            
                if (option === true) {
                     //if option true remove active class from all other accordions 
                    var elementList = document.querySelectorAll(elem + ' .a-container');
                    Array.prototype.forEach.call(elementList, function (e) {
                        e.classList.remove('active');
                    });
                }    
                //add active class on cliked accordion     
                elmParent.classList.add('active');
            } else {
                //remove active class on cliked accordion     
                elmParent.classList.remove('active');
            }
        }
    });
}
  
// push out ad
aiptag.cmd.display.push(function() { aipDisplayTag.display('shellshock-io-twitch_970x250'); });
//activate accordion function
initAcc('.accordion', true);

function streamersSetup(data) {
	// let parsedData = getJson(data);
	const loader = document.getElementById('streamer-loading');
	loader.style.display = 'none';

	if (data) {
		data.sort(function (a, b) {
			return b.viewers - a.viewers;
		});

		let streamsArray = data.map(stream => {
			return {
				name: stream.name,
				viewers: stream.viewers,
				link: 'https://twitch.tv/' + stream.name,
				image: '../data/img/twitchAvatars/' + stream.avatar
			}
		})

		if (streamsArray.length > 0) {
			streamsArray.forEach(el => {
				const wrap = document.createElement('div');
					wrap.className = 'stream_item roundme_sm clickme';
				const img = document.createElement('img');
					img.className = 'stream_img roundme_sm';
					img.src = el.image;
				const link = document.createElement('a');
					link.className = 'display-grid grid-column-auto-1';
					link.href = el.link;
					link.target = '_blank';
				const textWrap = document.createElement('span');
				const name = document.createElement('p');
					name.className = 'stream_name';
					name.textContent = el.name;
				const viewers = document.createElement('p');
					viewers.className = 'stream_viewers';
					viewers.textContent = `${el.viewers} Viewers`;

				textWrap.appendChild(name);
				textWrap.appendChild(viewers);
				link.appendChild(img);
				link.appendChild(textWrap);
				wrap.appendChild(link);
				twitchStream.appendChild(wrap);
				
			});
		} else {
			const heading = document.getElementById('stream-heading');
				heading.textContent = 'No live streams';
			const noStreamers = document.createElement('p');
				noStreamers.textContent = 'Stream Shell Shockers on Twitch now! Drops enabled for all streamers!';
			twitchStream.appendChild(noStreamers);

		}
	} else {
		const whoopsError = document.createElement('p');
		whoopsError.textContent = 'Whoops. Error. Trying refreshing if you care';
		twitchStream.appendChild(whoopsError);
	}
}

const parseTime = (time) => String(time).length < 2 ? `0${time}` : time;

function isEventOver() {
	var now = new Date(); // Current date and time
	var targetDate = new Date(Date.UTC(2025, 2, 5, 20, 0, 0)); // March 5, 2025 at 12:00 PM PST (UTC-8) converted to UTC
	// year, month, day, hour, minute, second
  
	if (now > targetDate) {
	  console.log("The current date is past March 5, 2025, at 3:00 PM PST.");
	  return true;
	} else {
	  console.log("It is not yet past March 5, 2025, at 3:00 PM PST.");
	  return false;
	}
}

document.addEventListener('DOMContentLoaded', function () {

	const daysSpan = document.querySelector('.days'),
		  hoursSpan = document.querySelector('.hours'),
		  minutesSpan = document.querySelector('.minutes'),
		  secondsSpan = document.querySelector('.seconds');

    function updateCountdown() {
        var now = new Date();
        // Target date and time in PST. Note: Month is 0-indexed (0 = January, 11 = December)
        var targetDate = new Date(Date.UTC(2025, 1, 19, 20, 0, 0)); // February 19, 2025 at 12:00 PM PST (UTC-7) converted to UTC
		//year, month, day, hour, minute, second

        // Calculate the difference in milliseconds
        var difference = targetDate - now;

        // Time calculations for days, hours, minutes, and seconds
        var days = Math.floor(difference / (1000 * 60 * 60 * 24));
        var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Display the result
        daysSpan.innerHTML = days;
        hoursSpan.innerHTML = parseTime(hours) + ' : ';
        minutesSpan.innerHTML = parseTime(minutes) + ' : ';
        secondsSpan.innerHTML = parseTime(seconds);

        // If the countdown is over, display a message
        if (difference < 0) {
            clearInterval(interval);
			if (isEventOver()) {
				countdownStatus.textContent = 'Drops are over!';
				dropsTitle.textContent = 'Past Drops';
			} else {
				countdownStatus.textContent = 'Drops are live!';
				dropsTitle.textContent = 'Available Drops';
			}
			countDownTimer.classList.add('hideme');
        }
    }

    // Update the countdown every 1 second
    var interval = setInterval(updateCountdown, 1000);
});
