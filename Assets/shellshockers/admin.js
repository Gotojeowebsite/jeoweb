var CloseCode = {
	gameNotFound: 0,
	gameFull: 0,
	badName: 0,
	mainMenu: 0,
	gameIdleExceeded: 0,
	corruptedLoginData0: 0,
	corruptedLoginData1: 0,
	corruptedLoginData2: 0,
	corruptedLoginData3: 0,
	corruptedLoginData4: 0,
	corruptedLoginData5: 0,
	gameMaxPlayersExceeded: 0,
	gameDestroyUser: 0,
	joinGameOutOfOrder: 0,
	gameShuttingDown: 0,
	readyBeforeReady: 0,
	booted: 0,
	gameErrorOnUserSocket: 0,
	uuidNotFound: 0,
	sessionNotFound: 0,
	clusterFullCpu: 0,
	clusterFullMem: 0,
	noClustersAvailable: 0
};

var i = 4000;
Object.keys(CloseCode).forEach(k => {
	CloseCode[k] = i++;
});

var CommCode = {
	gameJoined: 0,
	socketReady: 0,
	addPlayer: 0,
	removePlayer: 0,
	chat: 0,
	syncThem: 0,
	syncAmmo: 0,
	die: 0,
	hitThem: 0,
	hitMe: 0,
	collectItem: 0,
	spawnItem: 0,
	respawn: 0,
	swapWeapon: 0,
	joinGame: 0,
	observeGame: 0,
	ping: 0,
	pong: 0,
	clientReady: 0,
	requestRespawn: 0,
	joinPublicGame: 0,
	joinPrivateGame: 0,
	createPrivateGame: 0,
	switchTeam: 0,
	changeCharacter: 0,
	pause: 0,
	announcement: 0,
	updateBalance: 0,
	reload: 0,
	refreshGameState: 0,
	switchTeamFail: 0,
	expireUpgrade: 0,
	bootPlayer: 0,
	banPlayer: 0,
	loginRequired: 0,
	gameLocked: 0,
	reportPlayer: 0,
	banned: 0,
	metaGameState: 0,
	syncMe: 0,
	explode: 0,
	keepAlive: 0,
	musicInfo: 0,
	hitMeHardBoiled: 0,
	beginShellStreak: 0,
	endShellStreak: 0,
	startReload: 0,
	fire: 0,
	melee: 0,
	throwGrenade: 0,
	info: 0,
	eventModifier: 0,
	playerInfo: 0
};

var i = 0;
Object.keys(CommCode).forEach(k => {
	CommCode[k] = i++;
});

var MAP = {
	blank: 0,
	ground: 1,
	block: 2,
	column: 3,
	halfBlock: 4,
	ramp: 5,
	ladder: 6,
	tank: 7,
	lowWall: 8,
	todo3: 9,
	barrier: 10
};

var Team = {
	blue: 1,
	red: 2
};

var GameType = {
	ffa: 0,
	teams: 1,
	ctf: 2,
	king: 3
};

var GameTypes = [
	{ shortName: 'FFA', longName: 'Free For All' },
	{ shortName: 'Teams', longName: 'Teams' },
	{ shortName: 'Spatula', longName: 'Captula the Spatula' },
	{ shortName: 'King', longName: 'King of the Coop' }
];

var DmgType = [
	{ name: 'Eggk47' },
	{ name: 'Scrambler' },
	{ name: 'FreeRanger' },
	{ name: 'Cluck9mm' },
	{ name: 'Rpegg' },
	{ name: 'Whipper' },
	{ name: 'Crackshot' },
	{ name: 'TriHard' },
	{ name: 'Grenade' },
	{ name: 'Melee' }
];

var SyncRate = 10; // Positional server/client sync rate in FPS - TODO: Should be time-based?
var FramesBetweenSyncs = Math.ceil(30 / SyncRate);

var Reward = {
	perKill: 10,
	video: 100,
	perKillModTwo: 20,
	discord: 'rew_1200',
	tiktok: 'rew_1208',
	Instagram: 'rew_1219',
	Steam: 'rew_1223',
	Facebook: 'rew_1227',
	Twitter: 'rew_1234',
	Twitch: 'rew_twitch_social',
};

var FeedbackType = {
	comment: 0,			// For the heaping of praise upon us, probably. Definitely. Yeah.
	feature: 1,			// Feature requests
	bug: 2,				// Well, you know... bugs.
	purchase: 3,		// Issues with item and golden egg purchases
	account: 4,			// Account and privacy issues
	abuse: 5, 			// For people to bitch about other people "hacking"
	other: 6,			// Who knows... Probably porn.
	deleteAccount: 7,	// for account delete requests
};

var Tween = {
	linear: 0,
	slowIn: 1,
	slowOut: 2
};

var ShellStreak = {
	HardBoiled: 1,
	EggBreaker: 2
};

const CHICKWINNER = {
	dailyLimit: 3,
	cooldown: 240,
	dailyCooldown: 86400
};

var Slot = {
    Primary: 0,
    Secondary: 1
};

// Type matches contents of the item_type table (could be generated from a db query but ... meh)
var ItemType = {
    Hat: 1,
    Stamp: 2,
    Primary: 3,
    Secondary: 4,
    Grenade: 6,
	Melee: 7
}

var CharClass = {
    Soldier: 0,
    Scrambler: 1,
    Ranger: 2,
    Eggsploder: 3,
    Whipper: 4,
    Crackshot: 5,
    TriHard: 6
};

CharClass.length = Object.keys(CharClass).length;

const reportReasons = [
	'cheating',
	'harrassment',
	'offensive',
	'other'
];

const punishActions = {
	Boot: 0,
	Ban: 1
};

const StatsArr = [
	'kills',
	'deaths',
	'streak',
	'killsCluck9mm',
	'killsGrenade',
	'killsRpegg',
	'killsEggk47',
	'killsScrambler',
	'killsFreeRanger',
	'killsWhipper',
	'killsCrackshot',
	'killsTriHard',
	'killsMelee',
	'killsPrivate',
	'killsPublic',
	'killsKing',
	'killsSpatula',
	'killsTeams',
	'killsFFA',
	'deathsCluck9mm',
	'deathsGrenade',
	'deathsRpegg',
	'deathsEggk47',
	'deathsScrambler',
	'deathsFreeRanger',
	'deathsWhipper',
	'deathsCrackshot',
	'deathsTriHard',
	'deathsMelee',
	'deathsPrivate',
	'deathsPublic',
	'deathsKing',
	'deathsSpatula',
	'deathsTeams',
	'deathsFFA',
	'kotcCaptured',
	'kotcWins',
];

const AdminRole = {
	ManageAdmins: 1,
	Boot: 2,
	GameBan: 4,
	Feedback: 8,
	Announce: 16,
	Ads: 32,
	Players: 64,
	Refunds: 128,
	Settings: 256,
	Media: 512,
	Badguys: 1024,
	Items: 2048,
	Bots: 4096,
	BanAdmin: 8192,
};
Date.prototype.toDatetimeLocal =
  function toDatetimeLocal() {
    var
      date = this,
      ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
};

/**
 * You first need to create a formatting function to pad numbers to two digits…
 **/
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

/**
 * …and then create the method to output the date string as desired.
 * Some people hate using prototypes this way, but if you are going
 * to apply this to more than one Date object, having it as a prototype
 * makes sense.
 **/
Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getUTCHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

var ws;
var docEl;
var headerEl;
var pendingActionCallbacks = {};
var currentTab;
var profile = {};
var admins = {};
var items = {};
var products = {};
var actionId = 0;
var inboxListOpts = {};
var mouse = { x: 0, y: 0 };
var scheduleEvents = [];
var musicServerRunning;
let newsItems = [];
let shellYouTube = [];
var announcementMessage = '';
var refundReasons = [];
var adminKey;

const skus = [
    ['egg_pack_small', 'Pile of eggs'],
    ['item_hat_galeggsy', 'Galeggsy Wings'],
    ['egg_pack_medium', 'Basket of eggs'],
    ['egg_pack_large', 'Big Box of eggs'],
    ['egg_pack_giant', 'Cluckton of eggs'],
    //['item_gun_m24_techno', 'Untz Gun'],
    ['item_hat_yolk_arms', 'Yolk Arms'],
    ['item_hat_cape', 'Cape Hat'],
    ['item_hat_dragon', 'Dragon Hat'],
    ['item_hat_space_gladi', 'Space Gladiator'],
    ['item_hat_zombie_mask', 'Zombie Hat'],
    ['item_gun_9mm_space', 'Space Cluck9mm'],
    ['item_hat_oni', 'Oni Hat'],
    ['item_gun_csg1_space', 'Space CSG1'],
    ['item_gun_9mm_techno', 'Cluck 9mm Techno'],
    ['item_gun_smg_techno', 'SMG Techno (Tuh gun)'],
    ['item_hat_demon_wings', 'Demon wings'],
    ['gun_gauge_techno', 'Badoosh Gun'],
	['item_hat_fallen_wing', 'Fallen Wings'],
	['item_gun_csg1_techno', 'CSG1 Catz'],
	['item_hat_chrome_wing', 'Chrome Wings'],
	['gun_eggk47_techno', 'Eggk Poggers'],
	['item_hat_steamWings', 'Steampunk Wings'],
	['item_gun_rpeggTechno', 'RPEGG Techno'],
	['item_gun_retro_9mm', 'Retro Cluck9mm'],
	['hat_premium_PixelAngel', 'Pixel Angel Wings'],
	['item_gun_aug_retro', 'Retro TriHard'],
	['item_hat_robot_wings', 'Robot Pixel Wings']
];

const SOCIALMEDIA = [
	'Facebook',
	'Instagram',
	'TikTok',
	'Discord',
	'YouTube',
	'Twitter',
	'Twitch'
];

const newsColums = [
	'',
	'active',
	'label',
	'link',
	'linksToTaggedItems',
	'linksToItemId',
	'linksToNugget',
	'linksToPhotoBooth',
	'linksToVipStore',
	'linksToEggStoreItem',
	'image'
];

const adNewsColumns = [
	'',
	'active',
	'weighted',
	'hideOnCG',
	'label',
	'link',
	'linkToShop',
	'linksToTaggedItems',
	'linksToItemId',
	'linksToNugget',
	'linksToPhotoBooth',
	'linksToVipStore',
	'linkToChw',
	'linkToBlackFriday',
	'linkToEggOrg',
	'linkToTwitch',
	'linkToMobile',
	'image'
];


initSettings();
var settings = localStorage.getItem('feedbackAdminSettings');

if (settings) {
	settings = JSON.parse(settings);
	inboxListOpts = settings.inboxListOpts;
}

function initSettings () {
	inboxListOpts = {
		match: {
			status: {
				open: true,
				active: true
			},
			feedback_type: {},
			admin_id: null
		}, 
		order: { status: 'asc' },
		limit: { start: 0, count: 25 },
	}
};

window.onunload = function () {
	inboxListOpts.limit.start = 0;
	localStorage.setItem('feedbackAdminSettings', JSON.stringify({ inboxListOpts }));
}

window.onload = function () {
	showSpinner();
	if (firebase) login((user) => {
		user.getIdToken(true).then((idToken) => authorize(idToken));
	}, loginFail);

	var keys = {};

	window.onkeydown = function (e) {
		if (keys[e.code]) return;
		keys[e.code] = true;

		if (currentTab && currentTab.onKeyPress) {
			currentTab.onKeyPress(e.code);
		}
	};

	window.onkeyup = function (e) {
		keys[e.code] = false;
	};

	window.onmousemove = function (e) {
		mouse.x = e.x;
		mouse.y = e.y;
	}
}

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

	firebase.initializeApp(config);

	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			console.log('Login auth provider: ' + user.providerData[0].providerId);
			// We're logged into Firebase. If this is an email/password login,
			// and user has yet to verify email address, do so here
			if (!user.emailVerified && user.providerData[0].providerId == 'password') {
				console.log('email not yet verified');
				return;
			}

			console.log('calling loggedIn from firebase.auth().onAuthStateChanged callback');
			success(user);
		} else {
			// We're logged out
			fail();
		}
	});
}

function loginFail () {
	console.log(window.error);
	alert('HI!');
}

function authorize () {
	firebase.auth().currentUser.getIdToken(true).then(function (idToken) {
		console.log('Using services server: wss://' + window.location.hostname + '/services/');

		try {
			ws = new WebSocket('wss://' + window.location.hostname + '/services/');
		} catch (e) {
			console.log(e);
		}

		ws.onopen = function (e) {
			console.log('authorizing');
			ws.send(JSON.stringify({
				cmd: 'authAdmin',
				token: idToken
			}));

			setInterval(() => {
				ws.send(JSON.stringify({ cmd: 'ping' }));
			}, 15000);
		};

		ws.onmessage = function (e) {
			var data = JSON.parse(e.data);

			if (!data.pong) console.log(data);

			if (data.authorized !== undefined) {
				if (data.authorized == true) {
					console.log('authorized');
					adminKey = data.key;
					loggedIn(data);
				} else {
					console.log('not authorized!');
				}
			} else if (data.error) {
				alert(JSON.stringify(data));
			} else if (data.rows) {
				hideSpinner();
				if (pendingActionCallbacks[data.actionId]) {
					pendingActionCallbacks[data.actionId](data);
					delete pendingActionCallbacks[data.actionId];
				}
			} else {
				if (!data.pong) hideSpinner();
				if (pendingActionCallbacks[data.actionId]) {
					pendingActionCallbacks[data.actionId](data);
					delete pendingActionCallbacks[data.actionId];
				}
			}
		};

		ws.onclose = function (e) {
			switch(e.code) {
			case 4100:
				document.body.innerHTML = 'Hey! You\'re not an admin!';
				break;
			default:
				document.body.innerHTML = 'Connection lost for SOME REASON';
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

	profile.id = data.id;
	profile.playerId = data.player_id;
	profile.name = data.name || user.displayName || 'An admin has no name';
	profile.email = data.email || user.email || 'An admin has no email';
	profile.roles = data.roles || 0;

	docEl = document.getElementById('doc');
	headerEl = document.getElementById('header');

	headerEl.style.display = 'block';

	var responses = 0;

	requestAction('getAdmins', {}, (data) => {
		for (var i in data.rows) {
			var row = data.rows[i];
			admins[row.player_id] = data.rows[i];
		}
		response();

		if (profile.roles & AdminRole.Announce) openAnnouncementTab();
		if (profile.roles & AdminRole.Ads) openAdsTab();
		if (profile.roles & AdminRole.Media) openMediaTab();
		//openSponsorsTab();
		//openMusicTab();
		// Uncomment to show settings tab
		if (profile.roles & AdminRole.Settings) openSettingsTab();
		if (profile.roles & AdminRole.Players) openPlayersTab();
		if (profile.roles & AdminRole.Refunds) openRefunds();
		if (profile.roles & AdminRole.Badguys) openBadguysTab();
		if (profile.roles & AdminRole.BanAdmin) openBansTab();
		if (profile.roles & AdminRole.ManageAdmins) openAdminsTab();
	});

	requestAction('getItems', {}, (data) => {
		for (var i in data.rows) {
			var row = data.rows[i];
			items[row.id] = data.rows[i];
		}
		response();
	});

	requestAction('getProducts', {}, (data) => {
		for (var i in data.rows) {
			var row = data.rows[i];
			products[row.id] = data.rows[i];
		}
		response();
	});

	requestAction('getRefundResponses', {}, (data) => {
		data.rows.forEach(el => refundReasons.push(el));
		response();
	});


	// requestAction('getScheduledEvents', {}, (data) => {
	// 	for (var i in data.rows) {
	// 		var row = data.rows[i];
	// 		scheduleEvents[row.id] = data.rows[i];
	// 	}

	// 	console.log('schdeudle', scheduleEvents);
	// 	response();
	// });

	function response () {
		responses++;
		console.log('responses: ' + responses);
		if (responses >= 4) {
			if (profile.roles & AdminRole.Feedback) openInbox();
			handleQueryString();
		}
	}

	// User profile link and image
	if (user.photoURL) {
		var url = user.photoURL;
		var pd = user.providerData[0];
		if (pd.providerId == 'facebook.com') { // Facebook sucks
			url = 'https://graph.facebook.com/' + pd.uid + '/picture';
		}
		document.getElementById('profilePic').src = url;
		document.getElementById('profilePic').style.display = 'block';
	}

	document.getElementById('profileName').innerText = profile.name;
}

function handleQueryString () {
	if (window.location.search.length > 0) {
		var opts = window.location.search.slice(1).split('&');

		for (var o in opts) {
			var opt = opts[o].split('=');
			var key = opt[0];
			var val = opt[1];

			if (key !== undefined && val !== undefined) {
				switch (key) {
				case 'ticket':
					if (profile.roles & AdminRole.Players) {
						openTicket(parseInt(val, 10));
					}
					break;
				case 'playerId':
					if (profile.roles & AdminRole.Players) {
						openPlayerDataFromPlayerId(val);
					}
					break;
				}
			}
		}
	}
}

function requestAction (action, data, callback) {
	showSpinner();
	data.cmd = 'admin';

	actionId = ++actionId % 10000;
	data.action = action;
	data.actionId = actionId;
	console.log('Sending to Services:', data);
	ws.send(JSON.stringify(data));
	if (callback) {
		pendingActionCallbacks[actionId] = callback;
	}
}

function openDialog (header) {
	var el = document.getElementById('dialog');
	el.style.display = 'block';
	var d = document.getElementById('dialogContent');
	addHeader(d, header);
	return d;
}

function closeDialog () {
	var el = document.getElementById('dialog');
	el.style.display = 'none';

	var d = document.getElementById('dialogContent');
	while (d.firstChild) {
	    d.removeChild(d.firstChild);
	}
}

function createTable (rows, columnFilter, rowFunc, cellFunc, colFunc, id) {
	var table = document.createElement('table');
	if (id) table.id = id;

	var keys;

	if (columnFilter) {
		keys = [];
		for (var i in columnFilter) {
			keys.push(columnFilter[i]);
		}
	} else {
		var keysObj = {};
		for (var i in rows) {
			Object.keys(rows[i]).forEach((k) => {
				keysObj[k] = true;
			});
		}

		keys = Object.keys(keysObj);
	}

	var thead = document.createElement('thead');
	table.appendChild(thead);
	var tr = document.createElement('tr');
	thead.appendChild(tr);

	keys.forEach((k) => {
		var th = document.createElement('th');
		tr.appendChild(th);
		th.innerText = k;
		th.label = k;

		if (colFunc) colFunc(th);
	});

	for (var row in rows) {
		parseRow(rows[row]);
		var tr = document.createElement('tr');
		tr.rowIdx = row;
		table.appendChild(tr);

		if (rowFunc) rowFunc(rows[row], tr, row);

		keys.forEach((k) => {
			var td = document.createElement('td');
			td.key = k;
			td.rowIdx = row;
			tr.appendChild(td);
			td.innerText = rows[row][k];

			if (cellFunc) cellFunc(k, td, rows[row]);
		});
	}

	return table;
}

function popupList (items, callback) {
	var container = document.createElement('div');
	container.className = 'popupListContainer';
	var x = event.x;
	var y = event.y;

	container.onmouseleave = () => {
		document.body.removeChild(container);
	};

	for (var i in items) {
		var row = addRow(container, 'selectRow');
		row.innerText = items[i];
		row.onclick = function (idx) {
			return () => {
				document.body.removeChild(container);
				callback(idx);
			};
		}(i);
	}

	document.body.appendChild(container);

	var rect = container.getBoundingClientRect();
	if (x < 32) x = 32;
	if (x + rect.width - 32 > window.innerWidth) x = window.innerWidth - rect.width + 32;
	if (y < 24) y = 24;
	if (y + rect.height - 24 > window.innerHeight) y = window.innerHeight - rect.height + 24;

	container.style.left = (x - 32) + 'px';
	container.style.top = (y - 24) + 'px';

	return container;
}

function localTime (date) {
	var tz = new Date(date);
	var ms = Date.parse(date);
	ms -= tz.getTimezoneOffset() * 60 * 1000;
	var adjDate = new Date(ms);
	/*if (adjDate.getDay() == new Date(Date.now()).getDay()) {
		return adjDate.toLocaleString('en-US');
	}*/
	return adjDate.toLocaleString('en-US');
}

function fitToContent (input) {
	var context = document.getElementById('textWidthTester').getContext('2d');
	context.font = '1em "Open Sans", sans-serif';
	var width = Math.max(context.measureText(input.value).width, 20);
	input.style.width = width + 'px';
}

function getRequest (url, callback) {
	var req = new XMLHttpRequest();
	if (!req) {
		return false;
	}

	if (typeof callback != 'function') callback = function () {};
	
	req.onreadystatechange = function () {
		if(req.readyState == 4) {
			return req.status === 200 ? 
				callback(null, req.responseText) : callback(req.status, null);
		}
	}
	req.open("GET", url, true);
	req.send(null);
	return req;
}

function openFileHelper (callback, extensions) {
	var e = document.getElementById('openHelper');
	e.value = '';
	e.accept = extensions || '';
	e.onchange = (event) => { 
		var file = event.target.files[0];
		callback(file);
	};
	e.click();
}

// Select and prepare binary file for upload
function openBinaryUploader (callback, extensions) {
	closeDialog();

	openFileHelper(file => {
		var reader  = new FileReader();

		reader.onload = function () {
			callback({
				ext: file.name.match(/\.[0-9a-z]+$/i)[0],
				data: reader.result
			});
		}

		reader.readAsDataURL(file);
	}, extensions);
}

var bc = new BroadcastChannel('ShellShockersAdmin');
bc.onmessage = e => {
	let msg = e.data

	switch (msg.cmd) {
		case 'getPlayer':
			openPlayerDataFromPlayerId(msg.id, msg.ip)
			break
	}
}
var adminData;

const RoleDescription = {
	ManageAdmins: '<b><i>Add/Remove admins and change their permissions</i></b>',
	Boot: 'Boot players from within private games',
	GameBan: 'Ban players from within public and private games',
	Feedback: 'Access Feedback on the Admin page',
	Announce: 'Manage Announcements on the Admin page',
	Ads: 'Manage Ads on the Admin page',
	Players: 'Access the Players tab and manage player data on the Admin page',
	Refunds: 'Manage Refunds on the Admin page',
	Settings: 'Manage Settings on the Admin page',
	Media: 'Manage Media on the Admin page',
	Badguys: 'Access the Badguys tab on the Admin page',
	Items: 'Access Item and Product data',
	Bots: 'Launch Bots from within games',
	BanAdmin: 'Add/lift IP and Player bans'
}

function openAdminsTab () {
	addTab('Admins', false, renderAdmins);
}

function renderAdmins (page) {
	fetchAdmins(data => {
		finishRenderAdmins(page, data);
	});
}

function fetchAdmins (callback) {
	requestAction('getAdmins', {}, data => {
		hideSpinner();
		adminData = {};
		data.rows.forEach(row => {
			adminData[row.player_id] = row;
			adminData[row.player_id].updated = false;
		});

		callback(data.rows);
	});
}

function finishRenderAdmins (page, data) {
	addButton(page, 'New Admin', 'green', () => {
		let submission = {
			player_id: 0,
			name: '',
			email: '',
			roles: 0
		};

		let checkboxes = {};

		let d = openDialog('New Admin');

		let row = addRow(d);

		// Personal info
		var col = addCol(row);

		var idIn = addInput(addRow(col), 'player id');
		var nameIn = addInput(addRow(col), 'name');
		var emailIn = addInput(addRow(col), 'email');

		idIn.size = 80;
		nameIn.size = 80;
		emailIn.size = 80;

		idIn.oninput = () => {
			submission.player_id = parseInt(idIn.value, 10);
			fitToContent(idIn);
		}

		nameIn.oninput = () => {
			submission.name = nameIn.value;
			fitToContent(nameIn);
		}

		emailIn.oninput = () => {
			submission.email = emailIn.value;
			fitToContent(emailIn);
		}

		addCol(row, 'colBreakLg');

		// Permissions
		col = addCol(row);

		Object.keys(AdminRole).forEach(key => {
			let line = addRow(col);
			var c = addCol(line);
			c.style.width = '200px';

			let checkbox = addCheckbox(c, key);
			checkboxes[key] = checkbox;

			c = addCol(line);
			c.innerHTML = RoleDescription[key];
		});

		lineBreak(d);

		let buttons = addRow(d);

		addButton(buttons, 'Save', 'green', () => {
			Object.keys(checkboxes).forEach(key => {
				if (checkboxes[key].checked) {
					submission.roles |= AdminRole[key];
				}
			});

			requestAction('addAdmin', submission, () => {
				hideSpinner();
				markDirty('Admins', true);
			});

			closeDialog();
		})

		addButton(buttons, 'Cancel', 'red', () => {
			closeDialog();
		})

	})

	var list = addRow(page);

	var table = createTable(data, ['', 'player_id', 'name', 'email', 'roles'], null, cellFunc, null);
	list.appendChild(table);

	function cellFunc (key, td, row) {
		switch (key) {
			case '':
				if (!row.player_id) break;

				var btn = document.createElement('div');
				btn.className = 'roundButton removeButton';

				btn.onclick = () => {
					let d = openDialog('Delete Admin');
					addSmallHeader(d).innerText = row.name;
					lineBreak(d);
					addRow(d).innerText = 'Are you sure you want to delete this admin?';
					lineBreak(d);
					var buttons = addRow(d);

					addButton(buttons, 'Yes', 'red', () => {
						requestAction('deleteAdmin', { player_id: row.player_id }, () => {
							hideSpinner();
							markDirty('Admins', true);
						});

						closeDialog();
					});

					addButton(buttons, 'No', 'green', closeDialog);
				};

				td.innerText = '';
				td.appendChild(btn);
				break;
			
			case 'roles':
				let num = td.innerText

				if (num === '') {
					num = '0x0000'
				}
				else {
					num = '0x' + parseInt(num).toString(16).toUpperCase();
					td.innerText = num;
					td.style.cursor = 'pointer';
				}

				td.onclick = () => {
					let d = openDialog('Roles for ' + row.name);

					Object.keys(AdminRole).forEach(key => {
						let line = addRow(d);

						var col = addCol(line);
						col.style.width = '200px';

						let checkbox = addCheckbox(col, key, () => {
							if (checkbox.checked) {
								row.roles |= AdminRole[key];
							}
							else {
								row.roles &= ~AdminRole[key];
							}
							adminData[row.player_id].roles = row.roles;
							adminData[row.player_id].updated = true;
						});

						col = addCol(line);
						col.innerHTML = RoleDescription[key];

						checkbox.checked = (row.roles & AdminRole[key]) !== 0;
					});

					lineBreak(d);
					var buttons = addRow(d);

					addButton(buttons, 'Apply', 'red', () => {
						Object.keys(adminData).forEach(key => {
							let d = adminData[key];

							if (d.updated) {
								let submission = {
									player_id: d.player_id,
									name: d.name,
									email: d.email,
									roles: d.roles
								};

								requestAction('updateAdminProfile', submission, () => {
									hideSpinner();
									markDirty('Admins', true);
								});
							}
						});

						closeDialog();
					});

					addButton(buttons, 'Cancel', 'green', closeDialog);
				}
				break;

			case 'player_id':
			case 'name':
			case 'email':
				td.innerHTML = '';

				var input = document.createElement('input');
				input.value = row[key];
				fitToContent(input);
	
				input.oninput = () => {
					adminData[row.player_id][key] = input.value;
					fitToContent(input);
				};

				input.onchange = () => {
					adminData[row.player_id].updated = true;
				};

				td.appendChild(input);
				break;

			default:
				break;
		}
	}	
}var houseAds;
let hasLinks = false;

function openAdsTab () {
	addTab('Ads', false, renderAds);
}

function renderAds (page) {
	fetchAds(() => {
		finishRenderAds(page);
	});
}

function fetchAds (callback) {
	getRequest('data/housePromo.json?' + Date.now(), (err, res) => {
		if (err) {
			houseAds = { big: [], small: [], bigBanner: [], shellLogo: [], houseAdPercentChance: 100, specialItemsTag: '', featuredSocialMedia: '', premFeatured: '', smHouseAds: [] };
		} else {
			houseAds = JSON.parse(res);
			if (houseAds.specialItemsTag === undefined) {
				houseAds.specialItemsTag = '';
			}

			if (houseAds.featuredSocialMedia === undefined) {
				houseAds.featuredSocialMedia = '';
			}

			if (houseAds.premFeatured === undefined) {
				houseAds.premFeatured = '';
			}

			if (houseAds.shellLogo === undefined) {
				houseAds.shellLogo = [];

			}
		}

		houseAds.big.push({});
		houseAds.small.push({});
		houseAds.bigBanner.push({});
		houseAds.smHouseAds = houseAds.smHouseAds || [];
		houseAds.shellLogo.push({});
		callback();
	});
}

function finishRenderAds (page) {
	/*** Begin layout ***/

	const specialTagStuff = addRow(page, 'admin-special-tag-stuff display-flex gap');

	var buttons = addRow(page, 'admin-ads--save-buttons');
	var saveButton = addButton(buttons, 'Save Changes', 'green', save);
	var discardButton = addButton(buttons, 'Discard', 'red', () => {
		markDirty('Ads', true);
	});

	saveButton.disabled = true;
	discardButton.disabled = true;

	var specialItemsTag = addRow(page, 'admin-ads--special-tags');
	var itemTag = addInput(specialItemsTag, 'Special Items Tag', houseAds.specialItemsTag, null, (newVal) => { 
		houseAds.specialItemsTag = newVal; 
		change();
		markDirty('Ads', false);
	});

	var socialMediaIcon = addRow(page, 'admin-social-media');
	const socialOptions = [
		['Facebook', 'Facebook'],
		['Twitter', 'Twitter'],
		['Instagram', 'Instagram'],
		['tiktok', 'TikTok'],
		['discord', 'Discord'],
		['Steam', 'Steam'],
		['Twitch', 'Twitch'],
	];

	addSmallHeader(socialMediaIcon, 'Select featured social media', 'left');
	var socialIconSelect = addSelect('idisid', socialOptions, houseAds.featuredSocialMedia, (newVal) => {
		houseAds.featuredSocialMedia = newVal; 
		change();
		markDirty('Ads', false);
	}, 'Social media select');
	socialMediaIcon.appendChild(socialIconSelect);
	const PremFeatured = addRow(page, 'admin-social-media');
	const premFeatOption = [
		['premFeatOne', 'premFeatOne'],
		['premFeatTwo', 'premFeatTwo'],

	];
	addSmallHeader(PremFeatured, 'Select Premium featured tags', 'left');
	const premFeatSelect = addSelect('idisidisid', premFeatOption, houseAds.premFeatured, (newVal) => {
		houseAds.premFeatured = newVal; 
		change();
		markDirty('Ads', false);
	}, 'Premium featured tags');

	PremFeatured.appendChild(premFeatSelect);

	// smHouseAds

	specialTagStuff.appendChild(specialItemsTag)
	specialTagStuff.appendChild(socialMediaIcon)
	specialTagStuff.appendChild(PremFeatured)

	if (!adNewsColumns.includes('linksToKotc')) {
		adNewsColumns.splice(9, 0, "linksToKotc");
	}

	function sortActiveAds(a, b) {
		if (!a.active && b.active) return 1;
		if (a.active && !b.active) return -1;
	}
	houseAds.small.sort((a, b) => sortActiveAds(a, b));
	houseAds.big.sort((a, b) => sortActiveAds(a, b));
	houseAds.bigBanner.sort((a, b) => sortActiveAds(a, b));

	const adDiv = addDiv(page, 'admin-ads-accordion', 'accordion');

	const shellLogo = addRow(page, 'admin-shell-logo');
	const shellLogoHeader = addSmallHeader(shellLogo, 'Shell Logo(s)', 'accordion-header');
	const shellLogoWrap = addDiv(shellLogo, 'shell-logo-table', 'hideme accordion-wrap');
	var shellLogoTable = createTable(houseAds.shellLogo, ['', 'active', 'label', 'image'], null, cellFuncLogo, null);
	shellLogoWrap.appendChild(shellLogoTable);
	shellLogo.appendChild(shellLogoWrap);

	adDiv.appendChild(shellLogo);

	var list = addRow(page);
	var bigHeader = addSmallHeader(list, '800x600 popup on front page +', 'accordion-header');
	var bigTableWrap = addDiv(list, 'big-table', 'hideme accordion-wrap');
	var bigTable = createTable(houseAds.big, adNewsColumns, null, cellFuncLarge, null);
	bigTableWrap.appendChild(bigTable);
	list.appendChild(bigTableWrap);

	adDiv.appendChild(list);

	var list = addRow(page);
	var bigTableWrap = addDiv(list, 'sm-table', 'hideme accordion-wrap');
	var smHeader = addSmallHeader(list, 'House ads 300x250 +', 'accordion-header');
	var smallTable = createTable(houseAds.small, adNewsColumns, null, cellFuncSmall, null);
	bigTableWrap.appendChild(smallTable);
	list.appendChild(bigTableWrap);

	adDiv.appendChild(list);

	var list = addRow(page);
	var bigTableWrap = addDiv(list, 'banner-table', 'hideme accordion-wrap');
	var bannerHeader = addSmallHeader(list, '728x90 or 970x250 banner for ad blockers +', 'accordion-header');
	var largeBannerTable = createTable(houseAds.bigBanner, adNewsColumns, null, cellFuncBigBanner, null);
	bigTableWrap.appendChild(largeBannerTable);
	list.appendChild(bigTableWrap);

	adDiv.appendChild(list);


	function toggleTable (el, table) {
		const element = el.target ? el.target : el;
		let text;
		if (el.type === 'click') {
			text = el.target.innerText;
		} else {
			text = el.innerText;
		}

		text.indexOf('+') > -1 ? element.innerText = text.replace('+', '-') : element.innerText = text.replace('-', '+');
		document.getElementById(table).classList.toggle('hideme');
	}

	bigHeader.onclick = (e) => toggleTable(e, 'big-table');
	smHeader.onclick = (e) => toggleTable(e, 'sm-table');
	bannerHeader.onclick = (e) => toggleTable(e, 'banner-table');
	shellLogoHeader.onclick = (e) => toggleTable(e, 'shell-logo-table');

	function cellFuncLogo (key, td) {
		cellFunc(key, td, houseAds.shellLogo);
	}

	function cellFuncLarge (key, td) {
		cellFunc(key, td, houseAds.big);
	}

	function cellFuncBigBanner (key, td) {
		cellFunc(key, td, houseAds.bigBanner);
	}
	
	function cellFuncSmall (key, td) {
		cellFunc(key, td, houseAds.small);
	}
	
	/*** End layout ***/
	function cellFunc (key, td, category) {
		td.category = category;
		if (td.innerText === 'undefined') td.innerText = '';
		if (key == '') { // Delete button
			if (td.rowIdx < category.length - 1) {
				var btn = document.createElement('div');
				btn.className = 'roundButton removeButton';
				btn.onclick = () => {
					delete category[td.rowIdx];
					td.parentElement.remove();
					change();
				};
				td.innerText = '';
				td.appendChild(btn);
			}
		} else if (key == 'active' || key == 'weighted') { // Active checkbox
			td.innerText = '';
			td.style = 'text-align: center';
			var check = addCheckbox(td);

			check.checked = category[td.rowIdx][key];
			check.onchange = () => {
				category[td.rowIdx][key] = check.checked;
				change();
			};
		} else if (key == 'hideOnCG') { // Link to
			td.innerText = '';
			td.style = 'text-align: center';
			var check = addCheckbox(td);
			check.checked = category[td.rowIdx].hideOnCG;
			check.onchange = () => {
				category[td.rowIdx].hideOnCG = check.checked;
				change();
			};
		} else if (key == 'linksToEggStoreItem') {
			let sel = addSelect('products', skus, category[td.rowIdx][td.key]);
			
			sel.onchange = () => {
				category[td.rowIdx][td.key] = sel.options[sel.selectedIndex].value;
				change();
				changedLink(td);
			};

			td.innerText = '';
			td.appendChild(sel);
			
		} else if (key == 'image') { // Thumbnails
			var id = td.category[td.rowIdx].id;
			if (!id) {
				/*var btn = document.createElement('div');
				btn.className = 'roundButton addButton';
				btn.onclick = () => {
					openImageUploader();
				};
				td.appendChild(btn);*/

				var img = document.createElement('img');
				img.src = 'WHEE';
				img.className = 'adThumbnail';
				img.onclick = () => {
					openImageUploader(img);
				};

				td.appendChild(img);
			} else {
				var img = document.createElement('img');
				img.src = 'data/img/art/' + id + td.category[td.rowIdx].imageExt;
				img.className = 'adThumbnail';
				img.onclick = () => {
					expandThumbnail(td.parentElement.children[2].firstChild.value, img);
				};

				td.appendChild(img);
			}
		} else {
			var crazyGame;
			const links = [];
			var input = document.createElement('input');
			var inputLabel;
			var cgLabel;

			if (key === 'linkToShop') {
				input.type = 'number';
				input.min = 2;
				input.max = 4;
			}

			if (key === 'link') {
				td.className = 'link';

				inputLabel = document.createElement('label');
				inputLabel.innerText = 'Link: ';

				cgLabel = document.createElement('label');
				cgLabel.innerText = 'CG: ';

				crazyGame = document.createElement('input');

				if (!Array.isArray(category[td.rowIdx][td.key])) {
					// links.push(category[td.rowIdx][td.key]);
					links.push(td.innerText);
					category[td.rowIdx][td.key] = links;
					input.value = td.innerText;
				} else {
					input.value = category[td.rowIdx][td.key][0];
					if (category[td.rowIdx][td.key].length > 0) {
						crazyGame.value = category[td.rowIdx][td.key][1] ? category[td.rowIdx][td.key][1] : '';
					}
				}
			} else {
				input.value = td.innerText;
			}

			if (key != 'label') {
				if (key === 'link') {
					input.oninput = () => {
						category[td.rowIdx][td.key][0] = input.value;
						changedLink(td);
						fitToContent(input);
	
					};
					input.className = key;

					crazyGame.oninput = () => {
						category[td.rowIdx][td.key][1] = crazyGame.value ? crazyGame.value : '';
						changedLink(td);
						fitToContent(input);
					};
					crazyGame.className = key;

				} else {					
					input.oninput = () => {
						category[td.rowIdx][td.key] = input.value;
						changedLink(td);
						fitToContent(input);
	
					};
					input.className = key;
				}

			} else {
				input.oninput = () => {
					category[td.rowIdx][td.key] = input.value;
					change();
					fitToContent(input);
				};
				input.className = key;
			}

			if (key === 'linkToShop') {
				inputLabel = document.createElement('label');
				inputLabel.innerText = '2 = shop, 3 = featured, 4 = skins ';
			}

			td.innerText = '';
			if (crazyGame) {
				td.appendChild(inputLabel);
			}

			fitToContent(input);
			td.appendChild(input);

			if ( key === 'linkToShop') {
				td.appendChild(inputLabel);
			}

			if (crazyGame) {
				td.appendChild(cgLabel);
				fitToContent(input);
				td.appendChild(crazyGame);
			}
		}
	}

	function expandThumbnail (name, imgEl) {
		var d = openDialog(name);
		var row = addRow(d);
		addImage(row, imgEl.src);

		var buttons = addRow(d);
		addButton(buttons, 'Update', 'green', () => {
			openImageUploader(imgEl);
		});
		addButton(buttons, 'Close', 'red', () => {
			closeDialog();
		});
	}

	// Load and display selected image on page
	function openImageUploader (imgEl) {
		closeDialog();

		openBinaryUploader(res => {
			var td = imgEl.parentElement;
			td.category[td.rowIdx].image = res.data;
			td.category[td.rowIdx].imageExt = res.ext;
			imgEl.src = res.data;

			change();
		}, '.png,.gif,.jpg,.jpeg,.svg');
	}

	function change () {
		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function changedLink (td) {
		// Wipe out other links in this row; we want only one at a time!;
		var tr = td.parentElement;
		for (var i = 5; i < 18; i++) {
			var cell = tr.children[i];
			if (cell != td) {
				var el = cell.firstChild;
				if (cell.key === 'link') {
					for (const child of cell.children) {
						if (child.tagName === 'INPUT') {
							child.value = '';
						}
					}
					cell.category[cell.rowIdx][cell.key] = [];
				} else {
					if (el) {
						el.value = '';
						delete cell.category[cell.rowIdx][cell.key];
					}
				}
			}
		}

		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function save () {
		showSpinner();

		const openAcc = Array.from(document.querySelectorAll('.accordion-wrap'));

 		requestAction('uploadAds', { ads: houseAds }, () => {
 			hideSpinner();
 			markDirty('Ads', true);
			setTimeout(() => {
				openAcc.forEach(el => {
					if (!el.classList.contains('hideme')) {
						toggleTable(el.parentElement.firstChild, el.id);
					}
				});
			}, 200);
 		});
	}
}
function openAnnouncementTab () {
	addTab('Announcement', false, renderAnnouncement);
}

function renderAnnouncement (page) {
	let ws = new WebSocket(`wss://${location.host}/matchmaker/`);

	ws.onopen = () => {
		ws.send('{ "command": "regionList" }');
	}

	ws.onmessage = e => {
		let data = JSON.parse(e.data);

		switch (data.command) {
			case 'regionList':
				hideSpinner();
				finishRenderAnnouncement(page, data.regionList);
				break;

			case 'notice':
				announcementMessage = data.notices.announcement;
				break;

		}
	}
}

function finishRenderAnnouncement (page, regionList) {
	var el = addCol(page, 'center');
	addHeader(el, 'Announcement');

    lineBreak(el).innerText = 'current message';
    var oldMessage = addCol(el, 'textBox')
    oldMessage.style.maxWidth = '20em';
    oldMessage.innerText = announcementMessage !== '' ? announcementMessage : '(none)';

    lineBreak(el);
    lineBreak(el).innerText = 'new message';

    var newMessage = addInputBox(el, '', null, null);
    newMessage.placeholder = 'Leave blank to remove current message';
    
    lineBreak(el);

	/*
    var container = addRow(el, 'section');
    var row = addRow(container);

	addButton(row, 'Live', 'blue', () => {
        for (var i = 0; i < servers.length; i++) {
            servers[i].checkbox.checked = i < 7;
        }
    });

    addButton(row, 'All', 'blue', () => {
        for (var s of servers) s.checkbox.checked = true;
    });

    addButton(row, 'None', 'blue', () => {
        for (var s of servers) s.checkbox.checked = false;
    });

	for (var r of regionList) {
        var row = addRow(container);
        var cb = addCheckbox(row, r.id, null);
        r.checkbox = cb;
    }
	*/

	var sendButton = addButton(el, 'Send', 'green');

	sendButton.onclick = () => {
		showSpinner();

 		requestAction('setAnnouncement', { message: newMessage.value }, () => {
            hideSpinner();
            oldMessage.innerText = newMessage.value !== '' ? newMessage.value : '(none)';
 		});

    }

}var badguys = [];
var histogram = [];

function openBadguysTab () {
	addTab('Badguys', false, renderBadguys);
}

function renderBadguys (page) {
	let responses = 0;

	function response () {
		if (++responses === 2) {
			finishRenderBadguys(page);
		}
	}

	requestAction('badguys', {}, data => {
		hideSpinner();
		badguys = data.requestTracker;
		response();
	});

	requestAction('getIpHistogram', {}, data => {
		hideSpinner();
		histogram = Object.keys(data.histogram)
			.map(ip => { return { ip: ip, num: data.histogram[ip] }})
			.sort((a, b) => { return b.num - a.num });
		response();
	});
}

function finishRenderBadguys (page) {
	var el = addCol(page, 'center');
	addHeader(el, 'Badguy Tracker');

	// Services requests

	var requestRow = addRow(page);

	var button = addButton(requestRow, 'Refresh', 'green');
	button.onclick = () => {
		page.innerHTML = '';
		renderBadguys(page);
	}

	var requestHeader = document.createElement('h3');
	requestHeader.innerText = 'Services Requests by Request Type';
	requestRow.appendChild(requestHeader);

	var requestCaption = document.createElement('div');
	requestCaption.innerText = 'From IPs active in past 30 seconds with 10 or more requests per minute';
	requestRow.appendChild(requestCaption);

	var list = addRow(page);

	var columns = Object.keys(badguys);
	var table = document.createElement('table');

	list.appendChild(table);
	var header = document.createElement('tr');
	table.appendChild(header);

	for (var column of columns) {
		var th = document.createElement('th');
		th.innerText = column;
		header.appendChild(th);
	}

	var contentRow = document.createElement('tr');
	table.appendChild(contentRow);

	for (var column of columns) {
		let data = badguys[column]//.sort((a, b) => { return a.perMinute - b.perMinute })

		let td = document.createElement('td');
		td.style.verticalAlign = 'top'
		let innerTable = createTable(data, ['ip', 'count', 'perMinute'], null, cellFunc, null);
		td.appendChild(innerTable);
		contentRow.appendChild(td);

		function cellFunc (key, td) {
			if (key === 'ip') {
				td.style.cursor = 'pointer';
				td.onclick = () => {
					openLogWindow(td.innerText);
				}
			}
		}
	}

	// IP histogram

	lineBreak(page);

	var row = addRow(page);

	var header = document.createElement('h3');
	header.innerText = 'IP Histogram';
	row.appendChild(header);

	var caption = document.createElement('div');
	caption.innerText = 'IPs currently connected to game clusters';
	row.appendChild(caption);

	var table = createTable(histogram, ['ip', 'num'], null, cellFunc, null);
	row.appendChild(table);

	function cellFunc (key, td) {
	}
}

function openLogWindow (ip) {
	var logWindow = window.open()
	logWindow.document.write('<style>body { background: #333; font-family: monospace; color: #ddd; }</style>')

	let ws = new WebSocket('wss://' + window.location.hostname + '/services-log/')
	ws.onopen = () => {
		ws.send(JSON.stringify({ id: profile.id, adminKey, ip }))
	}
	ws.onmessage = e => {
		logWindow.document.write(`<p>${e.data}</p>`)
	}
}
var ipBans = [];
var playerBans = [];
var playerReports = [];

function openBansTab () {
	addTab('Bans', false, renderBans);
}

function renderBans (page) {
	let responses = 0;

	function response () {
		if (++responses === 3) {
			finishRenderBans(page);
		}
	}

	requestAction('getIpBans', {}, data => {
		hideSpinner();
		ipBans = data.rows;
		response();
	});

	requestAction('getAllPlayerBans', {}, data => {
		hideSpinner();
		playerBans = data.rows;
		response();
	});

	requestAction('getPlayerReports', {}, data => {
		hideSpinner();
		playerReports = data.rows;
		response();
	});
}

function finishRenderBans (page) {
	var el = addCol(page, 'center');
	addHeader(el, 'Ban Management');

	var buttonRow = addRow(page);

	var button = addButton(buttonRow, 'Refresh', 'green');
	button.onclick = () => {
		page.innerHTML = '';
		renderBans(page);
	}

	lineBreak(page);

	// IP bans

	var ipHeader = document.createElement('h3');
	ipHeader.innerText = 'IP Bans';
	page.appendChild(ipHeader);

	let banButton = addButton(page, 'Add IP Ban', 'red', () => {
		openBanIpDialog();
	});

	var list = addRow(page);

	function formatIpBans (column, td, row) {
		if (column === 'date' || column === 'expire' || column === 'lifted') {
			if (td.innerHTML !== '') {
				td.innerHTML = localTime(td.innerHTML)
			}
			else {
				if (row.expired) {
					td.innerHTML = 'Expired';
				}
				else {
					td.innerHTML = '';
					var btn = document.createElement('div');
					btn.className = 'smallButton green';
					btn.innerText = 'Lift Ban';
					btn.onclick = () => {
						liftIpBan(row.ip);
					};
					td.appendChild(btn);
				}
			}
		}
		else if (column === 'admin_id') {
			td.innerHTML = admins[parseInt(td.innerHTML, 10)].name
		}
	}

	var table = createTable(ipBans, ['admin_id', 'ip', 'date', 'expire', 'lifted', 'reason'], null, formatIpBans, null);
	list.appendChild(table);

	function openBanIpDialog () {
		var d = openDialog('Ban IP');
	
		var row = addRow(d);
		var rowTwo = addRow(d);
		var rowThree = addRow(d);
	
		var banInputCount = 0;
	
		function gotBanInput () {
			if (++banInputCount === 3) {
				banButton.disabled = false;
			}
		}
	
		var ipEl = addInput(row, 'IP', '', null, () => gotBanInput());
		ipEl.style.width = '500px';
		var reasonEl = addInput(rowTwo, 'Reason', '', null, () => gotBanInput());
		reasonEl.style.width = '500px';
	
		let list = [
			['15 MINUTE', '15 minutes'],
			['30 MINUTE', '30 minutes'],
			['1 HOUR', '1 hour'],
			['1 DAY', '1 day'],
			['1 WEEK', '1 week'],
			['1 MONTH', '1 month'],
			['1 YEAR', '1 year'],
		];
	
		var durationEl = addSelect('', list, '', () => gotBanInput(), 'Duration');
		rowThree.appendChild(durationEl);
	
		lineBreak(d);
	
		var buttons = addRow(d);
		let banButton = addButton(buttons, 'Drop Ban Hammer', 'red', () => {
			let ip = ipEl.value;
			let reason = reasonEl.value;
			let duration = durationEl.value;
	
			banIp(ip, duration, reason);
			closeDialog();
		});
	

		addButton(buttons, 'Show Mercy', 'green', closeDialog);
	}

	function banIp (ip, duration, reason) {
		requestAction('banIp', { ip, duration, reason }, data => {
			hideSpinner();
			markDirty(page.id, true);
		});
	}

	function liftIpBan (ip) {
		showSpinner();
		requestAction('liftIpBan', { ip }, (data) => {
			hideSpinner();
			markDirty(page.id, true);
		})
	}

	// Player bans

	lineBreak(page);

	var playerHeader = document.createElement('h3');
	playerHeader.innerText = 'Player Bans';
	page.appendChild(playerHeader);

	var list = addRow(page);

	function formatPlayerBans (column, td, row) {
		if (column === 'date' || column === 'expire' || column === 'lifted') {
			if (td.innerHTML !== '') {
				td.innerHTML = localTime(td.innerHTML)
			}
			else if (row.expired) {
				td.innerHTML = 'Expired';
			}
		}
		else if (column === 'admin_id') {
			td.innerHTML = admins[parseInt(td.innerHTML, 10)].name
		}
		else if (column === 'player_id') {
			makePlayerIdLink(td);
		}
	}

	var table = createTable(playerBans, ['admin_id', 'player_id', 'date', 'expire', 'lifted', 'reason'], null, formatPlayerBans, null);
	list.appendChild(table);

	// Player reports

	lineBreak(page);

	var reportHeader = document.createElement('h3');
	reportHeader.innerText = 'Player Reports';
	page.appendChild(reportHeader);

	var list = addRow(page);

	function formatPlayerReports (column, td, row) {
		if (column === 'date_reported') {
			td.innerHTML = localTime(td.innerHTML)
		}
		else if (column === 'reasons') {
			let reasons = [];
			let reasonMask = parseInt(td.innerText, 10);

			for (let i = 0; i < reportReasons.length; i++) {
				if (reasonMask & (1 << i)) {
					reasons.push(reportReasons[i]);
				}
			}

			td.innerHTML = reasons.join(', ');
		}
		else if (column	=== 'player_id' || column === 'reporter_id') {
			makePlayerIdLink(td);
		}
	}

	var table = createTable(playerReports, ['player_id', 'reporter_id', 'date_reported', 'reasons'], null, formatPlayerReports, null);
	list.appendChild(table);

	function makePlayerIdLink (td) {
		td.className = 'fieldValue link';
		td.onclick = function (playerId) {
			return () => openPlayerDataFromPlayerId(playerId);
		}(parseInt(td.innerText, 10));
	}
}var statusEnum = {
	open: 0,
	active: 1,
	closed: 2
};

var statusNames = ['open', 'active', 'closed'];

function openInbox () {
	var tab = addTab('Feedback', false, renderInbox);

	tab.onKeyPress = (key) => {
		switch (key) {
			case 'Backspace':
				var row = tab.attachedPage.highlightedRow;
				var rect = row.getBoundingClientRect();
				if (
					mouse.x >= rect.left &&
					mouse.x < rect.right &&
					mouse.y >= rect.top &&
					mouse.y < rect.bottom
				){
					requestAction('setStatus',
						{ status: statusEnum.closed, ticket_id: row.ticketId },
						() => {
							markDirty('Feedback', true);
						}
					);
				}
				break;
		}
	};
}

function renderInbox (page) {
	var opts = { match: {}, order: [] };

	// Construct SQL query filters from inbox list options

	// Matches - status
	opts.match.status = [];
	Object.keys(inboxListOpts.match.status).forEach((k) => {
		opts.match.status.push(statusEnum[k]);
	});

	// Matches - feedback
	opts.match.feedback_type = [];
	Object.keys(inboxListOpts.match.feedback_type).forEach((k) => {
		opts.match.feedback_type.push(FeedbackType[k]);
	});

	// Matches - assignment
	if (inboxListOpts.match.admin_id) {
		opts.match.admin_id = [inboxListOpts.match.admin_id];
	}

	// Order
	Object.keys(inboxListOpts.order).forEach((k) => {
		opts.order.push(k + ' ' + inboxListOpts.order[k]);
	});

	opts.limit = inboxListOpts.limit;

	// Always sort by date, even if it isn't expressly selected
	if (!inboxListOpts.order['date_created']) {
		opts.order.push('date_created desc');
	}

	var filter = addRow(page, 'fillWidth');

	var buttons = addCol(filter);

	addButton(buttons, '↻ Refresh', 'green', function () {
		return () => {
			markDirty('Feedback', true);
		}
	}());

	addButton(buttons, 'Filters', 'orange', openFilterDialog);
	addButton(buttons, '<div class="magGlass">⚲</div> Find Ticket', 'blue', openFindDialog);

	addRule(page);

	var list = addRow(page);

	addRule(page);

	var pageCount = 0;
	var pageSel = addRow(page);

	addButton(pageSel, '◀◀', 'blue', () => flipPage(-1000000));
	addButton(pageSel, '◀', 'blue', () => flipPage(-1));

	var pageNum = addButton(pageSel, '&nbsp;');
	pageNum.disabled = true;

	addButton(pageSel, '▶', 'blue', () => flipPage(1));
	addButton(pageSel, '▶▶', 'blue', () => flipPage(1000000));

	function flipPage (ofs) {
		inboxListOpts.limit.start = Math.max(0, Math.min(inboxListOpts.limit.start + ofs * inboxListOpts.limit.count, (pageCount - 1) * inboxListOpts.limit.count));
		markDirty('Feedback', true);
	}

	var counts = [25, 50, 100];
	var count = addButton(pageSel, 'show ' + inboxListOpts.limit.count + ' per page', 'orange', () => {
		popupList(counts, (idx) => {
			inboxListOpts.limit.count = counts[idx];
			markDirty('Feedback', true);
		});
	});

	var rowsFoundEl = addCol(pageSel, 'fieldName');
	rowsFoundEl.style += 'padding: 0px; margin-top: 10px; margin-left: 16px';

	requestAction('readInbox', opts, (data) => {
		if (!data || data.rows.length == 0) {
			list.innerText = 'No data';
			return;
		}

		pageCount = Math.ceil(data.count / inboxListOpts.limit.count);
		pageNum.innerText = Math.floor(inboxListOpts.limit.start / inboxListOpts.limit.count + 1) +
			' of ' + pageCount;

		rowsFoundEl.innerText = data.count + ' records found';

		list.appendChild(createTable(data.rows, [
			'ticket_id',
			'status',
			'email',
			'comments',
			'date_created',
			'feedback_type'
		], rowFunc, cellFunc, colFunc));

		function rowFunc (row, tr) {
			tr.className = 'selectRow';
			tr.ticketId = row.ticket_id;

			tr.onclick = function (id) {
				return () => openTicket(id);
			}(row.ticket_id);

			tr.onmouseenter = function () {
				return () => {
					page.highlightedRow = tr;
				};
			}();
		}

		function cellFunc (key, td) {
			if (key == 'comments' && td.innerText.length > 64) {
				td.innerText = td.innerText.substr(0, 64) + '...';
			}

			if (key == 'status') {
				td.className += ' ' + td.innerText;
			}
		}

		function colFunc (th) {
			Object.keys(inboxListOpts.order).forEach((k) => {
				if (k == th.label) {
					var arrow = document.createElement('span');
					arrow.style.color = 'slategray';

					if (inboxListOpts.order[k] == 'asc') {
						arrow.innerHTML = '&nbsp;▴';
					} else {
						arrow.innerHTML = '&nbsp;▾';
					}

					th.appendChild(arrow);						
				}
			});

			th.onclick = function () {
				return () => sortInbox(th.label);
			}();
		}
	});
}

function sortInbox (colName) {
	if (inboxListOpts.order[colName]) {
		if (inboxListOpts.order[colName] == 'desc') {
			inboxListOpts.order = {}
			inboxListOpts.order[colName] = 'asc';
		} else {
			delete inboxListOpts.order[colName];
		}
	} else {
		inboxListOpts.order = {};
		inboxListOpts.order[colName] = 'desc';
	}

	markDirty('Feedback', true);
}function openPlayersTab () {
	addTab('Players', false, renderPlayers);
}

function renderPlayers (page) {
	var el = addCol(page, 'center');
	addHeader(el, 'Player Management');

	var row = addRow(el);
	var emailIn = addInput(row, 'email', null, () => {
		openPlayerDataFromEmail(emailIn.value);
		emailIn.value = '';
	});
	emailIn.size = 40;

	var row = addRow(el);
	var firebaseIn = addInput(row, 'firebase id', null, () => {
		openPlayerDataFromFirebaseId(firebaseIn.value);
		firebaseIn.value = '';
	});
	firebaseIn.size = 40;

	var row = addRow(el);
	var idIn = addInput(row, 'player id', null, () => {
		openPlayerDataFromPlayerId(idIn.value);
		idIn.value = '';
	});
	idIn.size = 40;

	var row = addRow(el);
	var ipIn = addInput(row, 'IP address', null, () => {
		openPlayerDataFromIP(ipIn.value);
		ipIn.value = '';
	});
	ipIn.size = 40;

	var button = addButton(el, 'Search', 'green');

	button.onclick = () => {
		if (emailIn.value) {
			openPlayerDataFromEmail(emailIn.value);
			emailIn.value = '';
		} else if (firebaseIn.value) {
			openPlayerDataFromFirebaseId(firebaseIn.value);
			firebaseIn.value = '';
		} else if (idIn.value) {
			openPlayerDataFromPlayerId(idIn.value);
			idIn.value = '';
		} else if (ipIn.value) {
			openPlayerDataFromIP(ipIn.value);
			ipIn.value = '';
		}
	}
}

function openFindDialog () {
	var d = openDialog('Find Ticket');

	var row = addRow(d);
	var ticketIn = addInput(row, 'Ticket ID', null, (value) => {
		closeDialog();
		openTicket(Number.parseInt(value, 10));
	});

	ticketIn.size = 30;
	ticketIn.focus();

	var buttons = addRow(d);
	addButton(buttons, 'Find', 'green', () => {
		closeDialog();
		openTicket(Number.parseInt(ticketIn.value, 10));
	});
	addButton(buttons, 'Cancel', 'red', closeDialog);

}

function openFilterDialog () {
	var d = openDialog('Filters');

	// Assigned to me
	var row = addRow(d);
	var assignCheck = addCheckbox(row, 'Assigned to me');
	assignCheck.checked = inboxListOpts.match.admin_id ? true : false;
	lineBreak(d);

	var row = addRow(d);

	// Status
	var col = addCol(row, 'section');
	addSmallHeader(col, 'status');
	statusChecks = {};

	for (var i in statusNames) {
		var name = statusNames[i];
		statusChecks[name] = addCheckbox(addRow(col), name);
		statusChecks[name].checked = inboxListOpts.match.status[name];
	};

	//addCol(d).innerHTML = '&nbsp;&nbsp;';
	colBreak(row);

	// Feedback
	var col = addCol(row, 'section');
	addSmallHeader(col, 'feedback_type');
	typeChecks = {};

	Object.keys(FeedbackType).forEach((k) => {
		typeChecks[k] = addCheckbox(addRow(col), k);
		typeChecks[k].checked = inboxListOpts.match.feedback_type[k];
	});

	lineBreak(row);

	var row = addRow(d);
	addButton(row, 'Apply', 'green', apply);
	addButton(row, 'Cancel', 'red', closeDialog);

	function apply () {
		inboxListOpts.match.status = {};
		inboxListOpts.match.feedback_type = {};

		Object.keys(statusChecks).forEach((k) => {
			if (statusChecks[k].checked) {
				inboxListOpts.match.status[k] = true;
			}
		});

		Object.keys(typeChecks).forEach((k) => {
			if (typeChecks[k].checked) {
				inboxListOpts.match.feedback_type[k] = true;
			}
		});

		inboxListOpts.match.admin_id = assignCheck.checked ? profile.id : null;

		closeDialog();
		markDirty('Feedback', true);
	}
}
// HTML element constructors

/**
 * Add a horizontal rule <hr>
 * @param {element} dom - Parent DOM element
 * @returns {HTMLElement} - The DOM element
 */

function addRule (dom) {
	var el = document.createElement('hr');
    dom.appendChild(el);
    return el;
}

/**
 * Add a line break <br>
 * @param {element} dom - Parent DOM element
 * @returns {HTMLElement} - The DOM element
 */

function lineBreak (dom) {
	var el = document.createElement('div');
	el.innerHTML = '&nbsp;';
    dom.appendChild(el);
    return el;
}

/**
 * Add a column break
 * @param {element} dom - Parent DOM element
 * @returns {HTMLElement} - The DOM element
 */

function colBreak (dom) {
	var el = document.createElement('div');
	el.className = 'colBreak';
    dom.appendChild(el);
    return el;
}

/**
 * Adds a DOM input element
 * @param {element} dom - Parent DOM element
 * @param {string} title - Caption to display under this element
 * @param {string} value - Default value
 * @param {function} onEnter - Function to call when ENTER pressed
 * @param {function} onKeyUp - Function to call when key is released
 * @returns {HTMLElement} - The DOM element
 */

function addInput (dom, title, value, onEnter, onKeyUp, isType) {
	var div = document.createElement('div');
	div.className = 'inputContainer';
	var input = document.createElement('input');
	if (isType) input.type = isType;
	input.onkeydown = (e) => {
		if (e.code == 'ENTER') {
			input.blur();
			if (onEnter) onEnter(input.value);
		}
	};
	input.onkeyup = (e) => {
	    if (onKeyUp) onKeyUp(input.value);
	};
	input.value = value || '';
	div.appendChild(input);

	if (title) {
		var titleEl = document.createElement('div');
		titleEl.innerText = title;
		titleEl.className = 'inputTitle';
		div.appendChild(titleEl);
	}

	dom.appendChild(div);
	return input;
}

/**
 * Adds a column DIV
 * @param {element} dom - Parent DOM element
 * @param {string} className - Class name to add to the column
 * @returns {HTMLElement} - The DOM element
 */

function addCol (dom, className) {
	var el = document.createElement('div');
	el.className = 'col ' + className;
	dom.appendChild(el);
	return el;
}

/**
 * Adds a row DIV
 * @param {element} dom - Parent DOM element
 * @param {string} className - Class name to add to the row
 * @returns {HTMLElement} - The DOM element
 */

function addRow (dom, className) {
	className = className || '';
	var el = document.createElement('div');
	el.className = 'row ' + className;
	dom.appendChild(el);
	return el;
}

/**
 * Adds a large header
 * @param {element} dom - Parent DOM element
 * @param {string} text - Text to display in the header
 * @param {string} class - El class name
 * @returns {HTMLElement} - The DOM element
 */

function addHeader (dom, text, className) {
	var el = document.createElement('h2');
	el.innerText = text;
	el.className = className ? className : 'center';
	dom.appendChild(el);
	return el;
}

/**
 * Adds a small header
 * @param {element} dom - Parent DOM element
 * @param {string} text - Text to display in the header
 * @returns {HTMLElement} - The DOM element
 */

function addSmallHeader (dom, text, styled) {
	let isClass = !styled ? 'center' : styled;
	var el = document.createElement('h3');
	el.innerText = text;
	el.className = isClass;
	dom.appendChild(el);
	return el;
}

/**
 * Adds a button
 * @param {element} dom - Parent DOM element
 * @param {string} label - Text to display on the button
 * @param {string} color - Class name to add to the button
 * @param {function} onclick - Function to call when button is clicked
 * @returns {HTMLElement} - The DOM element
 */

function addButton (dom, label, color, onclick) {
	var el = document.createElement('button');
	if (color) el.className = color;
	el.innerHTML = label;
	if (onclick) el.onclick = onclick;
	if (dom) dom.appendChild(el);
	return el;
}

/**
 * Adds a checkbox
 * @param {element} dom - Parent DOM element
 * @param {string} name - Text to display next to the checkbox
 * @param {function} onChanged - Function to call when checkbox state changes
 * @returns {HTMLElement} - The DOM element
 */

function addCheckbox (dom, name, onChanged) {
	name = name || '';
    var container = document.createElement('div');
    container.style.display = 'inline-block';

    var check = document.createElement('input');
	check.type = 'checkbox';
    container.appendChild(check);

    if (name) {
        var label = document.createElement('label');
        label.style.display = 'inline-block';
        label.innerText = name;
        container.appendChild(label);
    }

    if (dom) dom.appendChild(container);

	if (onChanged) {
		check.onclick = function (name, el) {
			return () => onChanged(name, el.checked);
		}(name, check);
	}

	return check;
}

function addImage (dom, src) {
	var img = document.createElement('img');
	img.src = src;
    if (dom) dom.appendChild(img);
    return img;
}

/**
 * Adds a list of key/value pairs
 * @param {element} dom - Parent DOM element
 * @param {object} data - Object containing key/value pairs of data to display
 * @param {array} keys - Array of keys in {data} to display
 * @param {function} func - Function to call when a field is added
 * @returns {HTMLElement} - The DOM element
 */

function addFields (dom, data, keys, func) {
	var nameCol = addCol(dom);
	var valCol = addCol(dom);
	dom.className += ' fieldBlock';

	for (var i in keys) {
		var el = addRow(nameCol);
		var keyEl = addCol(el, 'fieldName');
		var el = addRow(valCol);
		var valEl = addCol(el, 'fieldValue');

		var key = keys[i];
		var val = data[keys[i]];

		if (val == null) {
			valEl.className = 'fieldValue small';
			val = 'N/A';
		}

		if (key == 'date_modified' || key == 'date_created' || key == 'login') {
			val = localTime(val);
		}

		keyEl.innerText = key;
		valEl.innerText = val;

		if (func) func(keyEl, valEl);
	}
}

/**
 * Adds a key/value pair
 * @param {element} dom - Parent DOM element
 * @param {string} label - Text to display next to the value
 * @param {string} value - Value to display
 */

function addField (dom, label, value) {
	var el = addRow(dom);
	addCol(el, 'fieldName').innerText = label + ': ';
	addCol(el, 'fieldValue').innerText = value;
	return el;
}

function getFieldName (el) {
	return el.children[0];
}

function getFieldValue (el) {
	return el.children[1];
}

function createEmailLink (email) {
	'<a style="display: inline-block" href="mailto:' + email + '">' + email + '</a>';
}

/**
 * Adds a drop-down list
 * @param {string} id - DOM ID of the resulting element
 * @param {array} options - Array of [value, label] pairs to display in the list
 * @param {string} selected - Value of the option to select by default
 * @param {function} onchangeFc - Function to call when the selection changes
 * @param {string} label - Text to display below the list
 */

function addSelect(id, options, selected, onchangeFc, label, multiple) {
	const wrap =  document.createElement('div'),
		  select = document.createElement('select'),
		  opDefault = document.createElement('option'),
		  elLabel = document.createElement('label');

	select.id = id;
	select.name = id;

	if (multiple) select.multiple = true;

	opDefault.textContent = 'Select option';
	opDefault.disabled = true;
	opDefault.selected = selected ? false : true;
	opDefault.value = null;
	select.appendChild(opDefault);

	if (label) {
		elLabel.innerText = label;
		elLabel.htmlFor = id;
		elLabel.className = 'inputTitle';
	}

	options.forEach(option => {
		let child = document.createElement('option');
		child.value = option[0];
		if (selected === option[0]) child.selected = true;
		child.innerText = option[1] ? option[1] : option[0];
		select.appendChild(child);
	});

	select.onchange = (e) => {
		wrap.value = select.value;
		if (onchangeFc) onchangeFc(select.value);
	};

	wrap.appendChild(select);

	if (label) {
		wrap.appendChild(elLabel);
	}

	return wrap;
}

/**
 * Add an input box
 * @param {element} dom - Parent DOM element
 * @param {string} title - Caption to display with the input box
 * @param {string} value - Default value
 * @param {function} onKeyUp - Function to call when a key is released
 */

function addInputBox (dom, title, value, onKeyUp) {
	var div = document.createElement('div');
	div.className = 'inputContainer';
	var input = document.createElement('textarea');
	input.cols = 40;
	input.rows = 3;
	input.onkeyup = (e) => {
	    if (onKeyUp) onKeyUp(input.value);
	};
	input.value = value || '';
	div.appendChild(input);
	var titleEl = document.createElement('div');
	titleEl.innerText = title;
	titleEl.className = 'inputTitle';
	div.appendChild(titleEl);
	dom.appendChild(div);
	return input;
}

/**
 * Add a DIV
 * @param {element} dom - Parent DOM element
 * @param {string} id - DOM ID of the resulting element
 * @param {string} divClass - Class name to add to the element
 */

function addDiv(dom, id, divClass) {
	var div = document.createElement('div');
	div.id = id;
	div.className = divClass || 'add-div';
	dom.appendChild(div);
	return div;
}

function copyToClipboard (str) {
	var e = document.getElementById('clipboard');
	e.value = str;
	e.select();

	try {
		document.execCommand('copy');
	} catch (err) {
		console.log('Unable to copy to clipboard');
	}
}

function selectCheckbox (dom, elements, data, buttonName, onChangeFc) {

	if (data.length > 0) {
		data.forEach(item => {
			elements[item.ad].selected = true;
			elements[item.ad].weighted = item.weighted;
		});
	}
	const wrap = document.createElement('div');
	const selectCheckboxes = document.createElement('div');
	const button = document.createElement('button');

	wrap.className = 'select-checkbox-wrap';
	selectCheckboxes.className = 'select-checkbox-items hideme';
	button.className = 'select-checkbox-button blue';
	button.innerText = buttonName;

	wrap.appendChild(button);

	Object.keys(elements).forEach(key => {
		const wrapper = document.createElement('div');
		const select = document.createElement('div');
		const input = document.createElement('input');
		const label = document.createElement('label');

		wrapper.className = 'select-checkbox-item-wrap';
		wrapper.id = elements[key].val;

		label.innerText = 'Weighted?';
		input.type = 'checkbox';
		input.value = elements[key].val;
		input.disabled = true;
		if (elements[key].weighted) {
			input.checked = true;
		}

		select.className = 'select-checkbox-name';
		select.innerText = elements[key].name;

		if (elements[key].selected) {
			wrapper.classList.add('selected');
			input.disabled = false;
		}

		select.onclick = () => {
			if (wrapper.classList.contains('selected')) {
				wrapper.classList.remove('selected');
				elements[key].selected = false;
				input.disabled = true;
				input.checked = false;
			} else {
				wrapper.classList.add('selected');
				elements[key].selected = true;
				input.disabled = false;

			}
			if (onChangeFc) {
				onChangeFc(elements);
			}
		};

		input.addEventListener('change', (e) => {
			if (input.checked) {
				elements[key].weighted = true;
			} else {
				elements[key].weighted = false;
			}
			if (onChangeFc) {
				onChangeFc(elements);
			}
		});

		label.appendChild(input);
		wrapper.appendChild(select);
		wrapper.appendChild(label);
		selectCheckboxes.appendChild(wrapper);
	});

	wrap.appendChild(selectCheckboxes);

	button.onclick = () => {
		if (selectCheckboxes.classList.contains('hideme')) {
			selectCheckboxes.classList.remove('hideme');
		} else {
			selectCheckboxes.classList.add('hideme');
		}
	};

	if (dom) dom.appendChild(wrap);
}
var music;

function openMusicTab () {
	addTab('Music', false, renderMusic);
}

function renderMusic (page) {
	fetchMusic(() => {
		finishRenderMusic(page);
	});
}

function fetchMusic (callback) {
	getRequest('data/music.json?' + Date.now(), (err, res) => {
		if (err || !res) {
			music = { songs: [] };
		} else {
			music = JSON.parse(res);
		}

		music.songs.push({});

		done();
	});

	requestAction('queryMusicServer', {}, data => {
		musicServerRunning = data.running;
		done();
	});

	var actions = 2;
	function done () {
		if (--actions == 0) callback();
	}
}

function finishRenderMusic (page) {
	/*** Begin layout ***/

	var buttons = addRow(page);
	var saveButton = addButton(buttons, 'Save Changes', 'green', save);
	var discardButton = addButton(buttons, 'Discard', 'red', () => {
		markDirty('Music', true);
	});

	var el = document.createElement('span');
	el.style = 'margin-left: 80px';
	buttons.appendChild(el);

	if (musicServerRunning) {
		addButton(buttons, 'Stop Server', 'orange', () => {
			controlMusicServer({ stopServer: true });
		});
	}
	else {
		addButton(buttons, 'Start Server', 'blue', () => {
			controlMusicServer({ startServer: true });
		});
	}

	addButton(buttons, 'Show Log', 'green', () => {
		controlMusicServer({ log: true });
	});

	saveButton.disabled = true;
	discardButton.disabled = true;

	var list = addRow(page);

	var columns = [
		'',
		'',
		'inPlaylist',
		'title',
		'artist',
		'album',
		'albumArt',
		'audio',
		'url',
		'sponsor'
	];

	var songTable = createTable(music.songs, columns, rowFunc, cellFunc, null);
	list.appendChild(songTable);

	/*** End layout ***/

	var draggedRow = null;
	var dragOver = null;

	function rowFunc (row, tr) {
		tr.draggable = true;

		tr.ondragenter = function (e) {
			dragOver = this;
			if (draggedRow == this) return false;
			this.classList.add('dragOver');
		}

		tr.ondragleave = function (e) {
			this.classList.remove('dragOver');
		}

		tr.ondragstart = function (e) {
			this.classList.add('dragging');
			draggedRow = this;
		}
		
		tr.ondragend = function (e) {
			draggedRow.classList.remove('dragging');

			if (draggedRow != dragOver) {
				songTable.insertBefore(draggedRow, dragOver);
			}

			var songs = [];

			for (var r = 1; r < songTable.rows.length - 1; r++) {
				var row = songTable.rows[r]
				songs.push(music.songs[row.rowIdx]);
				row.rowIdx = r;
			}

			music.songs = songs;

			change();
		}
	}

	function cellFunc (key, td) {
		if (td.innerText === 'undefined') td.innerText = '';

		if (key == '') {
			if (td.rowIdx < music.songs.length - 1) {
				if (td.previousSibling) {
					td.innerHTML = '☰';
					td.draggable = false;
				}
				else {
					// Delete button
					var btn = document.createElement('div');
					btn.className = 'roundButton removeButton';
					btn.onclick = () => {
						delete music.songs[td.rowIdx];
						td.parentElement.remove();
						change();
					};
					td.innerText = '';
					td.appendChild(btn);
				}
			}
		}
		else if (key == 'inPlaylist') { // In playlist checkbox
			td.innerText = '';
			td.style = 'text-align: center';
			var check = addCheckbox(td);
			check.checked = music.songs[td.rowIdx].inPlaylist;
			check.onchange = () => {
				music.songs[td.rowIdx].inPlaylist = check.checked;
				change();
			};
		}
		else if (key == 'albumArt') { // Album art
			var id = music.songs[td.rowIdx].id;

			if (!id) {
				var img = document.createElement('img');
				img.src = 'WHEE';
				img.className = 'albumArtThumbnail';
				img.onclick = () => {
					openAlbumArtUploader(img);
				};

				td.appendChild(img);
			} else {
				var song = music.songs[td.rowIdx];
				var img = document.createElement('img');
				img.src = dynamicContentPrefix + 'data/img/albumArt/' + id + song.albumExt + '?' + song.query;
				img.className = 'albumArtThumbnail';
				img.onclick = () => {
					expandThumbnail(td.parentElement.children[2].firstChild.value, img);
				};

				td.appendChild(img);
			}
		}
		else if (key == 'audio') { // Audio (mp3, ogg, etc.)
			var song = music.songs[td.rowIdx];
			var id = song.id;

			var el = document.createElement('span');
			el.innerText = '📁';
			el.className = 'audioUploadButton';
			el.onclick = () => {
				openAudioUploader(td);
			};

			td.appendChild(el);

			var el = document.createElement('span');
			el.innerText = '▶️';

			if (id && song.audioExt) {
				el.className = 'playButton active';
			}
			else {
				el.className = 'playButton inactive';
			}

			el.onclick = () => {
				var audio = el.parentElement.audio;

				if (audio.paused) {
					audio.play();
					el.innerText = '⏸';
				}
				else {
					audio.pause();
					el.innerText = '▶️';
				}
			};

			td.appendChild(el);

			if (id && song.audioExt) {
				td.audio = new Audio();
				var url = window.location.origin + window.location.pathname.replace(/[^/]*$/, '');
				td.audio.src = url + 'musicAdmin/' + id + song.audioExt + '?' + song.query;
			}
		}
		else if (key == 'sponsor' && sponsors) {
			td.innerText = '';

			var select = document.createElement('select');

			var option = document.createElement('option');
			option.value = undefined;
			option.innerText = '(none)';
			select.appendChild(option);

			for (var sponsor of sponsors) {
				if (sponsor.id) {
					var option = document.createElement('option');
					option.value = sponsor.id;
					option.innerText = sponsor.name;
					select.appendChild(option);
				}
			}

			select.value = music.songs[td.rowIdx].sponsor;

			select.onchange = e => {
				music.songs[td.rowIdx].sponsor = e.target.value;
				change();
			}

			td.appendChild(select);
		}
		else {
			var input = document.createElement('input');
			input.value = td.innerText;

			input.oninput = () => {
				music.songs[td.rowIdx][td.key] = input.value;
				change();
				fitToContent(input);
			};

			input.className = key;

			fitToContent(input);
			td.innerText = '';
			td.appendChild(input);
		}
	}

	function expandThumbnail (name, imgEl) {
		var d = openDialog(name);
		var row = addRow(d);
		addImage(row, imgEl.src);

		var buttons = addRow(d);
		addButton(buttons, 'Update', 'green', () => {
			openAlbumArtUploader(imgEl);
		});
		addButton(buttons, 'Close', 'red', () => {
			closeDialog();
		});
	}

	function openAlbumArtUploader (imgEl) {
		closeDialog();

		openBinaryUploader(res => {
			var td = imgEl.parentElement;

			music.songs[td.rowIdx].albumArt = res.data;
			music.songs[td.rowIdx].albumExt = res.ext;

			imgEl.src = res.data;

			change();
		}, '.png,.gif,.jpg,.jpeg');
	}

	function openAudioUploader (td) {
		closeDialog();

		openBinaryUploader(res => {
			music.songs[td.rowIdx].audio = res.data;
			music.songs[td.rowIdx].audioExt = res.ext;

			td.children[1].classList.replace('inactive', 'active');

			td.audio = new Audio(res.data);

			change();
		}, '.ogg');
	}


	function change () {
		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function changedLink (td) {
		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function save () {
		showSpinner();

 		requestAction('uploadMusic', { music: music }, () => {
 			hideSpinner();
 			markDirty('Music', true);
 		});
	}
}

function controlMusicServer (opts) {
	requestAction('queryMusicServer', opts, data => {
		if (data.log) {
			var d = openDialog('Streaming Server Log');
			var row = addRow(d);

			row.innerText = data.log;

			lineBreak(d);
			var buttons = addRow(d);

			addButton(buttons, 'Close', 'red', () => {
				closeDialog();
			});

			return;
		}

		musicServerRunning = data.running;
		markDirty('Music', true);
	});
}
const fetchJson = (jsonData, jsonDoc, callback) => {

	var newData = [];

	jsonData.splice(0, jsonData.length);

	getRequest(jsonDoc + Date.now(), (err, res) => {
		if (err === 404) {
			console.log('Accept it and move on.');
		} else {
			try	{
				const parsedJson = JSON.parse(res);
				if (parsedJson.length > 0) {
					parsedJson.forEach(item => newData.push(item));
				}
			} catch(e) {
				console.log('Fetch json request error: ', e);
			}
		}

		newData.push({});
		if (callback !== null) callback();
	});

	return newData;

};

function openMediaTab () {
	addTab('Media', false, renderMedia);
}

function renderMedia (page) {
	newsItems = fetchJson(newsItems, 'data/shellNews.json?', () => finishRenderMedia(page));
	setTimeout(() => {
		shellYouTube = fetchJson(shellYouTube, 'data/shellYouTube.json?', () => finishRenderYTube(page));
	}, 50);
}

let newsIsDraggable = true;

function finishRenderMedia (page) {
	/*** Begin layout ***/
	const list = addRow(page, 'media-dashboard-container');

	// news list start
	const newsColumns = [... newsColums];
	newsColumns[newsColumns.indexOf('label')] = 'content';
	newsColumns.splice(8,0,'linksToChangeLog');
	newsColumns.splice(0,0,'');
	newsColumns.push('hideOnCrazyGames');
	// newsColumns.splice(11, 0, "hideOnCrazyGames");
	// news list end

	if (!newsColumns.includes('linksToKotc')) {
		newsColumns.splice(11, 0, "linksToKotc");
	}

	const buttons = addRow(page, 'btn-group-news');
	const saveButton = addButton(buttons, 'Save Changes', 'green', save),
		  discardButton = addButton(buttons, 'Discard', 'red', () => {
		markDirty('Media', true);
		newsIsDraggable = true;
	});

	saveButton.disabled = true;
	discardButton.disabled = true;

	const newsTable = createTable(newsItems, newsColumns, rowFunc, cellFuncLarge, null);

	addHeader(list, 'Shell News');
	list.appendChild(newsTable);


	// YouTube list end

	let draggedRow = null,
		draggedData = null,
		dragOver = null;

	// Sometimes a drag & drop actually drops a row so make back and be sure that drop doesn't happen.
	const newsBackup = newsItems.length -1;
	
	function rowFunc (row, tr) {

		function idGenerate(length) {
			let result           = '';
			let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
			let charactersLength = characters.length;
			for ( let i = 0; i < length; i++ ) {
			   result += characters.charAt(Math.floor(Math.random() * charactersLength));
			}
			return result;
		}

		if ('content' in row) {
			tr.draggable = true;
			const rando = idGenerate(6);

			row.elId = rando;
			tr.id = rando;
		} else {
			tr.draggable = false;
		}

		if (!newsIsDraggable) {
			tr.draggable = false;
			return;
		}

		tr.ondragstart = function (e) {

			// e.dataTransfer.setData('text/plain', e.target.id);
			e.currentTarget.style.backgroundColor = 'gray';
			e.currentTarget.style.visiblity = 'hidden';

			draggedData = row;
			draggedRow = this;
		};

		tr.ondragenter = function (e) {
			e.preventDefault();
			e.currentTarget.style.visiblity = 'hidden';

			dragOver = this;

			if (draggedRow == this) {
				return false;
			}
		};

		tr.ondragover = function(e) {
			e.preventDefault();
			e.currentTarget.style.backgroundColor = 'lightgray';
		};

		tr.ondragleave = function (e) {
			e.currentTarget.style.backgroundColor = 'initial';
		};

		tr.ondragend = function (e) {

			const moveElement = (array,initialIndex,finalIndex) => {

				if (initialIndex === -1 || finalIndex === -1) {
					return false;
				}

				array.pop();
				array.splice(finalIndex,0,array.splice(initialIndex,1)[0]);
				array.push({});
				return array;
			};

			this.classList.remove('is-dragging');

			e.currentTarget.style.backgroundColor = 'none';


			const getDragOverId = dragOver.id,
				  getDraggedId = draggedRow.id,
				  dragItemIdx = newsItems.findIndex(i => i.elId === getDraggedId),
				  dragOverItemIdx = newsItems.findIndex(i => i.elId === getDragOverId);

			const newArray = moveElement(newsItems, dragItemIdx, dragOverItemIdx);

			if (!newArray) {
				console.log('Drag failed');
				save();
				return;
			}

			if (draggedRow !== dragOver) {
				newsTable.insertBefore(draggedRow, dragOver);
			}

			newsItems = newArray;

			save();

		};

		tr.ondrop = function(e) {
			// save();
		};
	}

	function cellFuncLarge (key, td) {
		cellFunc(key, td, newsItems);
	}

	/*** End layout ***/

	function cellFunc (key, td, category) {
		td.category = category;
		if (td.innerText === 'undefined')
			td.innerText = '';
		if (key == '') { // Delete button
			if (td.rowIdx < category.length - 1) {
				if (td.previousSibling) {
					td.innerHTML = '&#9776;';
					td.className = 'draggable';
					td.draggable = false;
				} else {
					var btn = document.createElement('div');
					btn.className = 'roundButton removeButton';
					btn.onclick = () => {
						delete category[td.rowIdx];
						td.parentElement.remove();
						change();
					};
					td.innerText = '';
					td.appendChild(btn);
				}
			}
		} else if (key == 'active') { // Active checkbox
			td.innerText = '';
			td.style = 'text-align: center';
			var check = addCheckbox(td);
			check.checked = category[td.rowIdx].active;
			check.onchange = () => {
				category[td.rowIdx].active = check.checked;
				change();
			};
		} else if (key == 'linksToEggStoreItem') {
			let sel = addSelect('products', skus, category[td.rowIdx][td.key]);
			
			sel.onchange = () => {
				category[td.rowIdx][td.key] = sel.options[sel.selectedIndex].value;
				change();
				changedLink(td, key);
			};

			td.innerText = '';
			td.appendChild(sel);
			
		} else if (key == 'image') { // Thumbnails
			var id = td.category[td.rowIdx].id;
			if (!id) {
				/*var btn = document.createElement('div');
				btn.className = 'roundButton addButton';
				btn.onclick = () => {
					openImageUploader();
				};
				td.appendChild(btn);*/

				var img = document.createElement('img');
				img.src = 'WHEE';
				img.className = 'adThumbnail';
				img.onclick = () => {
					openImageUploader(img);
				};

				td.appendChild(img);
			} else {
				var img = document.createElement('img');
				img.src = 'data/img/newsItems/' + id + td.category[td.rowIdx].imageExt;
				img.className = 'adThumbnail';
				img.onclick = () => {
					expandThumbnail(td.parentElement.children[2].firstChild.value, img);
				};

				td.appendChild(img);
			}
		} else {
			var input = document.createElement('input');
			input.value = td.innerText;
			if (key != 'content') {
				input.oninput = () => {
					category[td.rowIdx][td.key] = input.value;
					changedLink(td, key);
					fitToContent(input);

				};
				input.className = key;
			} else {
				input.oninput = () => {
					category[td.rowIdx][td.key] = input.value;
					change();
					fitToContent(input);
				};
				input.className = key;
			}

			fitToContent(input);
			td.innerText = '';
			td.appendChild(input);
		}
	}

	function expandThumbnail (name, imgEl) {
		var d = openDialog(name);
		var row = addRow(d);
		addImage(row, imgEl.src);

		var buttons = addRow(d);
		addButton(buttons, 'Update', 'green', () => {
			openImageUploader(imgEl);
		});
		addButton(buttons, 'Close', 'red', () => {
			closeDialog();
		});
	}

	// Load and display selected image on page
	function openImageUploader (imgEl) {
		closeDialog();

		openBinaryUploader(res => {
			var td = imgEl.parentElement;
			td.category[td.rowIdx].image = res.data;
			td.category[td.rowIdx].imageExt = res.ext;
			imgEl.src = res.data;

			change();
		}, '.png,.gif,.jpg,.jpeg');
	}

	function change () {
		newsIsDraggable = false;
		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function changedLink (td, key) {
		if (key !== 'hideOnCrazyGames') {
			// Wipe out other links in this row; we want only one at a time!;
			var tr = td.parentElement;
			for (var i = 4; i < 13; i++) {
				var cell = tr.children[i];
				if (cell != td) {
					var el = cell.firstChild;
					if (el) {
						el.value = '';
						delete cell.category[cell.rowIdx][cell.key];
					}
				}
			}
		}

		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function save () {
		showSpinner();
		newsIsDraggable = true;
 		requestAction('shellNews', { news: newsItems }, () => {
 			hideSpinner();
 			markDirty('Media', true);
 		});
	}

}

let yTubeIsDraggable = true;

function finishRenderYTube(page) {

	// https://www.youtube.com/oembed?url=http%3A//youtube.com/watch?v=SvPlRd7xjAs&format=json

	const yContent = addRow(page, 'youtube-dashboard-container'),
		  buttons = addRow(page, 'btn-group-news'),
		  youTubeColumns = ['', 'active', 'title', 'author', 'desc', 'link', 'image'],
		  saveButton = addButton(buttons, 'Save Changes', 'green', save),
		  discardButton = addButton(buttons, 'Discard', 'red', () => {
			  markDirty('Media', true);
			  yTubeIsDraggable = true;
		  });

	let	 yTubeTable = createTable(shellYouTube, youTubeColumns, rowFunc, cellFuncLarge, null);
	
	function addVideoError() {
		var d = openDialog('No video content. Wrong id?');
		var buttons = addRow(d);

		addButton(buttons, 'Close', 'red', () => {
			closeDialog();
		});
	}

	function addVideo() {
		var d = openDialog('Add Video Id');
		var row = addRow(d);
		// addImage(row, imgEl.src);
		var input = document.createElement('input');
		input.placeholder = 'video id eg. SvPlRd7xjAs';
		// input.value = td.innerText;

		// if (key != 'content') {
		// 	input.oninput = () => {
		// 		category[td.rowIdx][td.key] = input.value;
		// 		changedLink(td);
		// 		fitToContent(input);

		// 	};

		// 	input.className = key;
		// }
		d.appendChild(input);
		var buttons = addRow(d);

		addButton(buttons, 'Add', 'green', () => {
			getVideoContent(input.value);
			closeDialog();
		});
		addButton(buttons, 'Close', 'red', () => {
			closeDialog();
		});
	}

	function getVideoContent(id) {
		// ex. id = SvPlRd7xjAs
		const youTube = 'youtube.com/watch?v=',
			  youTubeOembed = 'https://www.youtube.com/oembed?url=http://',
			  prep = {active: true, link: 'https://www.' + youTube + id, desc: '', imageExt: ''};

		fetch(youTubeOembed + youTube + id + '&format=json', {
			// mode: 'no-cors',
			headers: {'Content-Type': 'application/json'},
			method: 'GET',
			headers: {
				Accept: 'application/json',
				},
			},
			
		)
		.then(res => {
			showSpinner();
			if (!res.ok) return addVideoError();
			return res.json();
		})
		.then(data => {
			if (data === undefined) {
				hideSpinner();
				return;
			}
			setTimeout(() => {
				change();
				prep.id = id;
				prep.author = data.author_name;
				prep.title = data.title;
				prep.externalImg = data.thumbnail_url;

				shellYouTube.unshift(prep);

				yTubeTable.parentElement.removeChild(yTubeTable);
				yTubeTable = createTable(shellYouTube, youTubeColumns, rowFunc, cellFuncLarge, null);
				hideSpinner();
				yContent.appendChild(yTubeTable);
			}, 250);

		});
	}

	let addVideoBtn = addButton(buttons, '+ Add video', 'green', addVideo);
	
	saveButton.disabled = true;
	discardButton.disabled = true;
	
	addHeader(yContent, 'YouTube');
	yContent.appendChild(addVideoBtn);
	yContent.appendChild(yTubeTable);

	// Backup json. Mainly because drag and drop can lose content
	const yTubeBackup = shellYouTube.length -1;

	let draggedRow = null,
		dragOver = null;

	function rowFunc (row, tr) {
		if ('title' in row) {
			tr.draggable = true;
		} else {
			tr.draggable = false;
		}
		if (!yTubeIsDraggable) {
			tr.draggable = false;
			return;
		}

		tr.ondragenter = function (e) {
			dragOver = this;
			if (draggedRow == this) return false;
			this.classList.add('dragOver');
		}

		tr.ondragleave = function (e) {
			this.classList.remove('dragOver');
		}

		tr.ondragstart = function (e) {
			if (!yTubeIsDraggable) {
				alert('Save changes or discard before dragging, please.');
				return
			};
			this.classList.add('dragging');
			draggedRow = this;
		}

		tr.ondragend = function (e) {
			this.classList.remove('dragging');
			if (!yTubeIsDraggable) {
				return
			};
			if (draggedRow != dragOver) {
				yTubeTable.insertBefore(draggedRow, dragOver);
			}

			let tempItems = [];

			for (let r = 1; r < yTubeTable.rows.length - 1; r++) {
				let row = yTubeTable.rows[r];
				tempItems.push(shellYouTube[row.rowIdx]);
				row.rowIdx = r;
			}

			const removeNull = tempItems.filter(el => el != null);

			if (removeNull.length === yTubeBackup) {
				// reset news array to update for new order
				shellYouTube.splice(0, shellYouTube.length);
				// Push new objects to update the news array
				if (tempItems.length > 0) {
					tempItems.forEach(item => shellYouTube.push(item));
				}
				// Since drag and drop is annoying auto save to avoid uneeded resets
				save();
			} else {
				saveButton.disabled = true;
				discardButton.disabled = true;
				markDirty('Media', true);
				alert('Doh, drag & drop goofed. Resetting. SORRY!');
				return;
			}

		};
	}

	function cellFuncLarge (key, td) {
		cellFunc(key, td, shellYouTube);
	}
	// key = the object key
	// td = content
	// category = object
	function cellFunc (key, td, category) {
		td.category = category;
		if (td.innerText === 'undefined')
			td.innerText = '';
		if (key == '') { // Delete button
			if (td.rowIdx < category.length - 1) {
				if (td.previousSibling) {
					td.innerHTML = '&#9776;';
					td.className = 'draggable';
					td.draggable = false;
				} else {
					var actions = document.createElement('div');
					var btn = document.createElement('div');
					var move = document.createElement('div');
						actions.className = "display-flex flex-align-center";

						move.innerHTML = '&#9776;';
						move.className = 'draggable margin-right-1';
						move.draggable = false;

					btn.className = 'roundButton removeButton';
					btn.onclick = () => {
						delete category[td.rowIdx];
						td.parentElement.remove();
						change();
					};

					td.innerText = '';
					actions.appendChild(move);
					actions.appendChild(btn);
					td.appendChild(actions);
				}
			}
		} else if (key == 'active') { // Active checkbox
			td.innerText = '';
			td.style = 'text-align: center';
			var check = addCheckbox(td);
			check.checked = category[td.rowIdx].active;
			check.onchange = () => {
				category[td.rowIdx].active = check.checked;
				change();
			};
		} else if (key == 'image') { // Thumbnails
			const id = td.category[td.rowIdx].imageId;
			if (!id && !td.category[td.rowIdx].externalImg) {
				var img = document.createElement('img');
				img.src = 'WHEE';
				img.className = 'adThumbnail';
				img.onclick = () => {
					openImageUploader(img);
				};

				td.appendChild(img);
			} else {
				var img = document.createElement('img');
				if (td.category[td.rowIdx].imageExt) {
					img.src = 'data/img/youtube/' + id + td.category[td.rowIdx].imageExt;
				} else {
					img.src = td.category[td.rowIdx].externalImg;
				}
				img.className = 'adThumbnail';
				img.onclick = () => {
					expandThumbnail(td.parentElement.children[2].firstChild.value, img);
				};

				td.appendChild(img);
			}
		} else {
			var input = document.createElement('input');
			input.value = td.innerText;
			if (key != 'content') {
				input.oninput = () => {
					category[td.rowIdx][td.key] = input.value;
					fitToContent(input);
					change();

				};
				input.className = key;
			} else {
				input.oninput = () => {
					category[td.rowIdx][td.key] = input.value;
					change();
					fitToContent(input);
				};
				input.className = key;
			}

			fitToContent(input);
			td.innerText = '';
			td.appendChild(input);
		}
	}

	function expandThumbnail (name, imgEl) {
		var d = openDialog(name);
		var row = addRow(d);
		addImage(row, imgEl.src);

		var buttons = addRow(d);
		addButton(buttons, 'Update', 'green', () => {
			openImageUploader(imgEl);
		});
		addButton(buttons, 'Close', 'red', () => {
			closeDialog();
		});
	}

	// Load and display selected image on page
	function openImageUploader (imgEl) {
		closeDialog();

		openBinaryUploader(res => {
			var td = imgEl.parentElement;
			td.category[td.rowIdx].image = res.data;
			td.category[td.rowIdx].imageExt = res.ext;
			imgEl.src = res.data;

			change();
		}, '.png,.gif,.jpg,.jpeg');
	}

	function change () {
		newsIsDraggable = false;
		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function save () {
		showSpinner();
		newsIsDraggable = true;
 		requestAction('shellYoutube', { videos: shellYouTube }, (data) => {
 			hideSpinner();
 			markDirty('Media', true);
 		});
	}

}var vipAvailable = [];
var activeSub = {
	accounts: []
};

function openPlayerDataFromTicket (ticketId, firebaseId) {
	if (openTabByName('PLR-' + ticketId, true)) return;

	addTab('PLR-' + ticketId, true, (page) => {
		page.ticketId = ticketId;
		page.firebaseId = firebaseId;
		renderPlayerData(page);
	});
}

function openPlayerDataFromFirebaseId (firebaseId, ip) {
	if (openTabByName('PLR-' + firebaseId, true)) return;

	addTab('PLR-' + firebaseId, true, (page) => {
		page.firebaseId = firebaseId;
		page.ip = ip;
		renderPlayerData(page);
	});
}

function openPlayerDataFromEmail (email) {
	if (openTabByName('PLR-' + email, true)) return;

	addTab('PLR-' + email, true, (page) => {
		page.email = email;
		renderPlayerData(page);
	});
}

function openPlayerDataFromPlayerId (id) {
	if (openTabByName('PLR-' + id, true)) return;

	addTab('PLR-' + id, true, (page) => {
		page.playerId = id;
		renderPlayerData(page);
	});
}

function openPlayerDataFromIP (ip) {
	if (openTabByName('PLR-' + ip, true)) return;

	addTab('PLR-' + ip, true, (page) => {
		page.ip = ip;
		renderPlayerData(page);
	});
}

function renderPlayerData (page) {
	var ticketId = page.ticketId;
	const firebaseId = page.firebaseId;
	const ip = page.ip;
	let currentFirebaseId = page.firebaseId ? page.firebaseId : null;
	var email = page.email;
	var playerId = page.playerId;

	var impersonateFunc = function(impersonateId) { 
		var baseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
		window.open(baseUrl + '?adminImpersonate='  + impersonateId);
	};

	var criteria;

	if (firebaseId) {
		criteria = { firebase_id: firebaseId };
	} else if (email) {
		criteria = { email: email };
	} else if (playerId) {
		criteria = { id: playerId };
	} else if (ip) {
		criteria = { ip: ip };
	}

	requestAction('getPlayer', criteria, data => {
		if (!data.result) {
			page.innerText = 'Player not found';
			return;
		}

		data = data.result;

		currentFirebaseId = data.firebase_id;
		playerId = data.id;

		parseRow('data');

		var col = addCol(page);
		addButton(col, 'Impersonate', 'green', () => { return impersonateFunc(data.firebase_id); });

		addButton(col, 'Transfer Account', 'orange', () => {
			openTransferPlayerDialog(data.id, data.firebase_id);
		});

		addButton(col, 'Delete Account', 'red', () => {
			openDeletePlayerDialog(data);
		});

		if (page.ip) {
			addCol(page, 'colBreak').innerText = 'IP: ' + page.ip;
		}

		lineBreak(page);

		var profileRow = addRow(page);

		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'Bans';

		var banButtonRow = addRow(page)

		let banButton = addButton(banButtonRow, 'Ban Player', 'red', () => {
			openBanPlayerDialog(playerId);
		});

		let liftBanButton = addButton(banButtonRow, 'Lift Ban', 'green', () => {
			liftPlayerBan(playerId);
		});

		banButton.style.display = 'none';
		liftBanButton.style.display = 'none';

		var banRow = addRow(page);

		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'Content Creator';
		const CREATOR = addRow(page);

		let newData = [],
			origData;

		addButton(CREATOR, 'Add', 'orange', () => {
			openAddCreatorDialog();
		});

		const saveButton = addButton(CREATOR, 'Save Changes', 'green', saveCreator),
			  discardButton = addButton(CREATOR, 'Discard', 'red', () => {
			// markDirty('Media', true);
		});

		saveButton.disabled = true;
		discardButton.disabled = true;

		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'Upgrades';
		var upgrade = addRow(page);

		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'Refunds';
		var refundArea = addRow(page);

		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'transactions';
		var transRow = addRow(page);

		lineBreak(page);
		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'items';
		var itemRow = addRow(page);

		var links = {
			current_balance: true,
			kills: true,
			deaths: true,
			streak: true
		};

		var col = addCol(profileRow);
		addFields(col, data, [
			'id',
			'firebase_id',
			'providers',
			'email',
			'login',
			'date_created',
			'date_modified'
		]);

		var col = addCol(profileRow);
		addFields(col, data, [
			'ip',
			'current_balance',
			'primary_item_id',
			'secondary_item_id',
			'hat_item_id',
			'stamp_item_id'
		], (keyEl, valEl) => {
			if (links[keyEl.innerText]) {
				valEl.className = 'fieldValue link';
				valEl.onclick = function (firebaseId, key, valEl) {
					return () => openModifyPlayerDialog(firebaseId, key, valEl);
				}(data.firebase_id, keyEl.innerText, valEl);
			}
		});

		var col = addCol(profileRow);
		addFields(col, data, [
			'class',
			'color',
			'kills',
			'deaths',
			'streak'
		], (keyEl, valEl) => {
			if (links[keyEl.innerText]) {
				valEl.className = 'fieldValue link';
				valEl.onclick = function (firebaseId, key, valEl) {
					return () => openModifyPlayerDialog(firebaseId, key, valEl);
				}(data.firebase_id, keyEl.innerText, valEl);
			}
		});

		function formatBans (column, td) {
			if (column === 'date' || column === 'expire' || column === 'lifted') {
				if (td.innerHTML !== '') {
					td.innerHTML = localTime(td.innerHTML)
				}
				else {
					td.innerHTML = 'N/A'
				}
			}
			else if (column === 'admin_id') {
				td.innerHTML = admins[parseInt(td.innerHTML, 10)].name
			}
		}

		requestAction('getPlayerBans', { player_id: data.id }, (data) => {
			if (data.rows && data.rows[0] && data.rows[0].lifted === null) {
				let expired = data.rows[0].expired

				if (expired) { // Ban has expired
					banButton.style.display = 'block';
					liftBanButton.style.display = 'none';
				}
				else { // Ban is still active
					banButton.style.display = 'none';
					liftBanButton.style.display = 'block';
				}
			}
			else {
				banButton.style.display = 'block';
				liftBanButton.style.display = 'none';
			}

			banRow.appendChild(createTable(data.rows, [
				'admin_id',
				'date',
				'expire',
				'lifted',
				'reason'
			], '', formatBans));
		});

		function transactionUrl(column, td) {
			if (column === 'xsolla_id') {
				const content = td.innerHTML;
				const a = document.createElement('a');
				a.href = 'https://publisher.xsolla.com/56738/support/transactions/details/' + content;
				a.target = '_blank';
				a.innerHTML = content;
				td.innerHTML = '';
				td.appendChild(a);
			}
		}

		requestAction('getPlayerTransactions', { player_id: data.id }, (data) => {
			transRow.appendChild(createTable(data.rows, [
				'id',
				'item_id',
				'product_id',
				'amount',
				'refund',
				'xsolla_id',
				'date_created',
				'date_modified'
			], '', transactionUrl));
		});

		requestAction('getPlayerUpgrades', { player_id: data.id }, (rData) => {
			const expiresTxt = 'Expires on:';
			let editClicked = false;
			let trySameVip = false;
			let activeExpiry = null;

			activeSub.accounts.push({id: data.firebase_id});
			const idx = activeSub.accounts.findIndex(el => el.id === data.firebase_id);

			if (rData.rows && rData.rows.length && rData.rows.length > 0) {
				if (rData.rows[0].expiry) {
					activeExpiry = rData.rows[0].expiry.replace('T', ' ').replace('.000Z', '');
					activeSub.accounts[idx].skuId = null;
				}

				if (rData.rows[0].isActive) {
					activeSub.accounts[idx].skuId = rData.rows[0].id;
				}
			}

			const upgradeEl = document.createElement('div');
			const vipSelect = document.createElement('select');

			requestAction('getAvaiableVip', {}, (rData) => {
				vipAvailable = [...rData.rows];

				if (vipAvailable.length > 0) {
					vipAvailable.forEach((el, key) => {
						vipSelect[key] = new Option(el.name, el.id, false, el.id === activeSub.accounts[idx].skuId);
					});
					upgradeEl.appendChild(vipSelect);
				}
			});

			const isExpired = activeSub.accounts[idx].skuId ? expiresTxt : 'NOT ACTIVE since: ';

			upgrade.textContent = `${isExpired} ${activeExpiry ? activeExpiry : 'Never!'}`;

			const msg = document.createElement('span');
			upgradeEl.appendChild(msg);

			const editBtn = document.createElement('button');
			editBtn.textContent = activeSub.accounts[idx].skuId ? 'Change' : 'Add';
			editBtn.className = activeSub.accounts[idx].skuId ? 'orange': 'green';

			const revokeBtn = document.createElement('button');
			revokeBtn.textContent = 'Revoke';
			revokeBtn.className = 'red';


			if (activeSub.accounts[idx].skuId) {
				upgradeEl.appendChild(revokeBtn);
			}

			upgradeEl.appendChild(editBtn);
			upgrade.appendChild(upgradeEl);

			// functionality
			editBtn.onclick = (e) => {
				if (editClicked) {
					e.preventDefault();
					return;
				}

				editClicked = true;

				const date = new Date();

				// Make it a number
				const trySubId = Number(vipSelect.value);

				if (trySubId == activeSub.accounts[idx].skuId && !trySameVip) {
					msg.textContent = 'Did you mean to select the same vip plan? If so, try again.';
					trySameVip = true;
					editClicked = false;
					return;
				}

				showSpinner();

				switch (trySubId) {
					case 25:
					case 10:
						date.setMonth(date.getMonth() + 1);
						break;
					case 26:
					case 11:
						date.setMonth(date.getMonth() + 3);
						break;
					case 27:
					case 12:
						date.setFullYear(date.getFullYear() + 1);
						break;

					default:
						hideSpinner();
						editClicked = false;
						upgrade.textContent = 'Something went wrong. Try again...?';
						break;
				}

				const getExpiry =  date.toISOString();
				const expiry = getExpiry.slice(0, getExpiry.indexOf('.'));

				requestAction('updatePlayerVip', {firebase_id: data.firebase_id, expiry: expiry, sku: vipAvailable.filter(el => el.id == trySubId)[0].sku}, (nData) => {
					activeSub.accounts[idx].skuId = null;
					setTimeout(() => {
						closeTab(currentTab);
						openPlayerDataFromFirebaseId(data.firebase_id);
						hideSpinner();
					}, 1000);
				});
			};

			revokeBtn.onclick = () => {
				showSpinner();
				revokeBtn.textContent = 'REVOKING...';

				const date = new Date();
				const getExpiry =  date.toISOString();
				const expiry = getExpiry.slice(0, getExpiry.indexOf('.'));

				requestAction('updatePlayerVipRevoke', {firebase_id: data.firebase_id, current_vip_id: activeSub.accounts[idx].skuId, expiry: expiry}, (cData) => {
					activeSub.accounts[idx].skuId = null;
					showSpinner();
					setTimeout(() => {
						closeTab(currentTab);
						openPlayerDataFromFirebaseId(data.firebase_id);
						hideSpinner();
					}, 2000);
				});
			};
		});

		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'Refunds';
		const refundsEl = addCol(profileRow);

		const refundReviewed = (column, td) => {
			if (column === 'reviewed') {
				const val = td.innerHTML == 1 ? true : false;
				const x = document.createElement("input");
				td.textContent = '';
				x.setAttribute("type", "checkbox");
				x.checked = val;
				td.appendChild(x);
				td.onclick = (e) => {
					requestAction('updateRefund', { firebaseId:currentFirebaseId, id: td.parentElement.id, val:  x.checked ? 1 : 0});
					// prepRefundTab();
					markDirty('Refunds', true, true);
				};
			}
		};

		requestAction('getRefunds', { firebaseId:currentFirebaseId, reviewed: false }, (rData) => {

			refundsEl.appendChild(createTable(rData.rows, [
				'id',
				'sku',
				'transaction_id',
				'reason',
				'date_created',
				'reviewed'
			], (keyEl, valEl) => {
				keyEl.reason = refundReasons.find(el => el.code == keyEl.reason).type;
				valEl.id = keyEl.id;
			}, refundReviewed));
		});

		refundArea.appendChild(refundsEl);

		requestAction('getPlayerItems', { player_id: data.id }, (data) => {

			const itemsToDelete = [];

			// confirm delete, item and player id
			const confirmItemToDelete = (item) => {

				let d = openDialog('Delete Player Item?'),
					row = addRow(d),
					itemText = `<p>PlayerId: ${playerId}: </p>`;

				itemsToDelete.forEach(el => {
					itemText += `<p>Item ID: ${el.id}, Name: ${el.name}</p>`
				});

				addCol(row).innerHTML = itemText;

				var buttons = addRow(d);

				addButton(buttons, 'Delete', 'green', () => {
					// Send request to delete item
					requestAction('deletePlayerItem', { itemIds: itemsToDelete, playerId }, (data) => {
						closeDialog();
						closeTab(currentTab);
						openPlayerDataFromPlayerId(playerId);
						// show dialog to confirm item deleted, slight delay to allow for tab to open
						setTimeout(() => {
							var d = openDialog('Player item deleted');
							addRow(d);
							var buttons = addRow(d);
							addButton(buttons, 'Close', 'green', () => {
								closeDialog();
							});
						}, 500);
					});
				});
				// close dialog
				addButton(buttons, 'Close', 'red', () => {
					closeDialog();
				});
			}

			// get player item data and setup click event for delete button
			const prepRmBtnAndItemData = (key, td) => {
				if (key === 'action') {
					const btn = document.createElement('button');
					const itemId = td.parentElement.children[1].innerHTML;
					var matches = itemId.match(/\[(.*?)\]/);
					let key = null;
					let item = null;

					if (matches) {
						key = matches[1];
					}

					if (key) {
						item = items[key];
					}

					const deleteItemCheckbox = document.createElement('input');

					btn.disabled = true;
					deleteItemCheckbox.setAttribute('type', 'checkbox');
					deleteItemCheckbox.className = 'deleteItemCheckbox';

					deleteItemCheckbox.onclick = (e) => {
						if (e.target.checked) {
							if (item) {
								itemsToDelete.push(item);
								btn.disabled = false;
							}

						} else {
							itemsToDelete.splice(itemsToDelete.indexOf(item), 1);
							btn.disabled = true;
						}
					};
					td.textContent = '';
					btn.innerHTML = 'Delete selected';
					btn.className = 'red';
					btn.onclick = (e) => {
						if (itemsToDelete.length > 0) {
							confirmItemToDelete(item);
						} else {
							e.preventDefault();
						}
					};


					td.appendChild(btn);
					td.appendChild(deleteItemCheckbox);
				}
			};

			itemRow.appendChild(createTable(data.rows, ['id','item_id','date_created','date_modified','action'], null, prepRmBtnAndItemData));
		});

		requestAction('getPlayerSocial', { player_id: data.id }, (data) => {
			let parsedData = [];
			let filtered = [];
			if ('rows' in data) {
				parsedData = data.rows[0].social;
				filtered = parsedData.filter(e => e !== null);
			}
			newData = filtered;
			setTable(newData);
		});

		function setTable (data) {
			CREATOR.appendChild(createTable(data, ['Remove', 'id','url','active'], null, cellFuncLarge, null, 'creator-table'));
		}

		function cellFuncLarge (key, td) {
			cellFunc(key, td, newData);
		}
	
		function cellFunc (key, td, category) {
			td.category = category;
			if (td.innerText === 'undefined')
				td.innerText = '';
			if (key == 'Remove') { // Delete button
				var btn = document.createElement('div');
				btn.className = 'roundButton removeButton';
				btn.onclick = () => {
					delete category[td.rowIdx];
					td.parentElement.remove();
					change();
				};
				td.innerText = '';
				td.appendChild(btn);
			} else if (key === 'id') {
				td.innerText = SOCIALMEDIA[category[td.rowIdx].id];
			} else if (key == 'active') { // Active checkbox
				td.innerText = '';
				td.style = 'text-align: center';
				var check = addCheckbox(td);
				check.checked = category[td.rowIdx].active;
				check.onchange = () => {
					category[td.rowIdx].active = check.checked;
					checkChange(category[td.rowIdx], category);
				};
			} else {
				var input = document.createElement('input');
				input.value = td.innerText;
				if (key != 'content') {
					input.oninput = () => {
						category[td.rowIdx][td.key] = input.value;

					};
					input.className = key;
				} else {
					input.oninput = () => {
						category[td.rowIdx][td.key] = input.value;
						change();
						// fitToContent(input);
					};
					input.className = key;
				}

				td.innerText = '';
				td.appendChild(input);
			}
		}

		function change() {
			saveButton.disabled = false;
			discardButton.disabled = false;
		}

		function checkChange (changed, cat) {
			const items = cat.length - 1;

			cat.forEach((item, idx) => {
				// Check for previously active
				if (item.id !== changed.id) {
					item.active = false;
				}

				// on last item delete and recreate
				if (idx === items) {
					let table = document.getElementById('creator-table');
					table.remove();
					newData = cat;
					change();
					setTable(newData);
				}
			});
		}
	
		function saveCreator() {
			showSpinner();
			const date = new Date();
			 requestAction('updateContentCreator', { id: data.id, data: newData }, () => {
				const idx = activeSub.accounts.findIndex(el => el.id = data.firebase_id);
				showSpinner();
				 if (newData.length > 0 && newData.filter(e => e.active).length > 0) {

					date.setFullYear(date.getFullYear() + 1);
					let getExpiry =  date.toISOString();
					let expiry = getExpiry.slice(0, getExpiry.indexOf('.'));

					requestAction('updatePlayerVip', {firebase_id: data.firebase_id, expiry: expiry, sku: vipAvailable.filter(el => el.name == '12 month membership')[0].sku}, (nData) => {
						setTimeout(() => {
							closeTab(currentTab);
							openPlayerDataFromFirebaseId(data.firebase_id);
							hideSpinner();
						}, 1000);
					});
				  } else {
					if (activeSub.accounts[idx].skuId) {
						showSpinner();
						let getExpiry =  date.toISOString();
						let expiry = getExpiry.slice(0, getExpiry.indexOf('.'));

						requestAction('updatePlayerVipRevoke', {firebase_id: data.firebase_id, current_vip_id: activeSub.accounts[idx].skuId, expiry: expiry}, (cData) => {
							activeSub.accounts[idx].skuId = null;

							showSpinner();
							setTimeout(() => {
								closeTab(currentTab);
								openPlayerDataFromFirebaseId(data.firebase_id);
								hideSpinner();
							}, 2000);
						});
					} else {
						hideSpinner();
					}
				  }
			 });
		}

		function openAddCreatorDialog () {
			var d = openDialog('Add new creator content');
		
			var row = addRow(d);
			row.style.color = 'slategray';
			// row.innerText = 'Enter a new value for "' + key + '"';
		
			lineBreak(d);
		
			var row = addRow(d, 'social-add-wrap');
		
			const SOCIALS = document.createElement('select'),
				  SELECTWRAP = document.createElement('div'),
				  SELECTLABEL = document.createElement('label'),
				  LABELFOR = 'social-media',
				  SOCIALLENGTH = SOCIALMEDIA.length - 1;
			SOCIALS.name = LABELFOR;
			SELECTWRAP.className = 'social-media-wrap';
			SELECTLABEL.textContent = 'Social Media';
			SELECTLABEL.htmlFor = LABELFOR;

			const socialSet = (id) => {
				return newData.find( item => {
					if (item.id === id) {
						return true;
					}
					return false;
				});
			};
			
			SOCIALMEDIA.forEach( (item, idx) => {
				const OPTION = document.createElement('option');
				OPTION.value = idx;
				OPTION.text = item;
				if (socialSet(idx)) {
					OPTION.disabled = true;
				}
				SOCIALS.appendChild(OPTION);
				if (idx === SOCIALLENGTH) {
					SELECTWRAP.appendChild(SOCIALS);
					SELECTWRAP.appendChild(SELECTLABEL);
					row.appendChild(SELECTWRAP);
				}
			});
		
			const URLINPUT = addInput(row, 'Url', '', '', '', 'url'),
				  ACTIVECHECK = addCheckbox(row, 'Active', () => {
				  });
		
			lineBreak(d);
		
			const buttons = addRow(d);
			addButton(buttons, 'ADD', 'green', () => {

				// if new item is active then deactivate all others.
				if (ACTIVECHECK.checked) {
					newData.forEach(i => i.active = false);
				}

				//push the new data
				newData.push({id: Number(SOCIALS.value), url: URLINPUT.value, active: ACTIVECHECK.checked});

				// Delete the old table
				let table = document.getElementById('creator-table');
				table.remove();
				// Show a change has occured
				change();
				// Setup new table
				setTable(newData);

				closeDialog();
			});
		
			addButton(buttons, 'Cancel', 'orange', closeDialog);
		}

		function openBanPlayerDialog (playerId) {
			var d = openDialog('Ban Player');
		
			var row = addRow(d);
			var rowTwo = addRow(d);
		
			var banInputCount = 0;
		
			function gotBanInput () {
				if (++banInputCount === 2) {
					banButton.disabled = false;
				}
			}
		
			var reasonEl = addInput(row, 'Reason', '', null, () => gotBanInput());
			reasonEl.style.width = '500px';
		
			let list = [
				['15 MINUTE', '15 minutes'],
				['30 MINUTE', '30 minutes'],
				['1 HOUR', '1 hour'],
				['1 DAY', '1 day'],
				['1 WEEK', '1 week'],
				['1 MONTH', '1 month'],
				['1 YEAR', '1 year'],
			];
		
			var durationEl = addSelect('', list, '', () => gotBanInput(), 'Duration');
			rowTwo.appendChild(durationEl);
		
			lineBreak(d);
		
			var buttons = addRow(d);
			let banButton = addButton(buttons, 'Drop Ban Hammer', 'red', () => {
				let reason = reasonEl.value;
				let duration = durationEl.value;
		
				banPlayer(playerId, duration, reason);
				closeDialog();
			});
		
			banButton.disabled = true;
		
			addButton(buttons, 'Show Mercy', 'green', closeDialog);
		}
		
		function banPlayer (bannedId, duration, reason) {
			showSpinner();
			requestAction('banPlayer', { bannedId, duration, reason }, (data) => {
				hideSpinner();
				markDirty(page.id, true);
			})
		}
		
		function liftPlayerBan (bannedId) {
			showSpinner();
			requestAction('liftPlayerBan', { bannedId }, (data) => {
				hideSpinner();
				markDirty(page.id, true);
			})
		}
	});
}

function openModifyPlayerDialog (firebaseId, key, valEl) {
	var d = openDialog('Modify Player');

	var row = addRow(d);
	row.style.color = 'slategray';
	row.innerText = 'Enter a new value for "' + key + '"';

	lineBreak(d);

	var row = addRow(d);
	var input = addInput(row, key, valEl.innerText, () => {
		modifyPlayerData(firebaseId, key, valEl, input.value);
		closeDialog();
	});
	input.size = 40;

	lineBreak(d);

	var buttons = addRow(d);
	addButton(buttons, 'Update', 'red', () => {
		modifyPlayerData(firebaseId, key, valEl, input.value);
		closeDialog();
	});

	addButton(buttons, 'Cancel', 'orange', closeDialog);
}

function modifyPlayerData (firebaseId, key, valEl, val) {
	requestAction('modifyPlayer', { firebaseId, key, val }, data => {
		if (data.error) {
			var d = openDialog('Error');
			var row = addRow(d);
			row.style.color = 'slategray';
			row.innerText = data.error;
			lineBreak(d);
			row = addRow(d);
			addButton(row, 'OK', 'green', () => closeDialog());
			return;
		}

		valEl.innerText = val;
	});
}

function openDeletePlayerDialog (data) {
	var d = openDialog('Delete Player');

	var row = addRow(d);
	var rowTwo = addRow(d);
	var rowThree = addRow(d);

	row.style.color = 'slategray';
	rowTwo.style.color = 'red';

	row.innerText = 'Are you ABSOLUTELY sure you want to delete this user from the database? This operation cannot be un-done. If this was prompted by user request, make sure you\'ve made a reasonable effort to verify that the request originated from the owner of this account.\n\n';
	rowTwo.innerHTML = `<strong>CONFIRM INFO!</strong> Firebase: ${data.firebase_id}. Email: ${data.email}. Id: ${data.id}. <br /><br />`;
	rowThree.innerText = 'Do you still wish to proceed?';

	lineBreak(d);

	var buttons = addRow(d);
	addButton(buttons, 'Delete', 'red', () => {
		deletePlayer(data.id, data.firebase_id);
		closeDialog();
	});
	addButton(buttons, 'Cancel', 'green', closeDialog);
}

function openTransferPlayerDialog (id, firebaseId) {
	var d = openDialog('Transfer Player Data');

	var row = addRow(d);
	row.style.color = 'slategray';
	row.innerText = 'Transfer this player\'s data to another account by entering\none of the new account\'s identifying fields below:';

	lineBreak(d);

	var row = addRow(d);
	var emailIn = addInput(row, 'email', null, () => {
		transferPlayerData(id, firebaseId, { email: emailIn.value })
		emailIn.value = '';
		closeDialog();
	});
	emailIn.size = 60;

	var row = addRow(d);
	var firebaseIn = addInput(row, 'firebase id', null, () => {
		transferPlayerData(id, firebaseId, { firebase_id: firebaseIn.value })
		firebaseIn.value = '';
		closeDialog();
	});
	firebaseIn.size = 60;

	var buttons = addRow(d);
	addButton(buttons, 'Transfer', 'red', () => {
		if (emailIn.value) {
			transferPlayerData(id, firebaseId, { email: emailIn.value })
			emailIn.value = '';
		} else if (firebaseIn.value) {
			transferPlayerData(id, firebaseId, { firebase_id: firebaseIn.value })
			firebaseIn.value = '';
		}

		closeDialog();
	});
	addButton(buttons, 'Cancel', 'green', closeDialog);
}

function transferPlayerData (id, firebaseId, searchCriteria) {
	requestAction('transferPlayerData', { id, firebaseId, searchCriteria }, data => {
		if (data.error) {
			var d = openDialog('Error');
			var row = addRow(d);
			row.style.color = 'slategray';
			row.innerText = data.error;
			lineBreak(d);
			row = addRow(d);
			addButton(row, 'OK', 'green', () => closeDialog());
			return;
		}

		closeTab(currentTab);

		if (searchCriteria.email) {
			openPlayerDataFromEmail(searchCriteria.email);
		}
		else if (searchCriteria.firebaseId) {
			openPlayerDataFromFirebaseId(searchCriteria.firebaseId);
		}

	});
}

function deletePlayer (id, firebaseId) {
	requestAction('deletePlayer', { id, firebaseId }, (data) => {
		hideSpinner();

		if (data.error) {
			var d = openDialog('Error');
			var row = addRow(d);
			row.style.color = 'slategray';
			row.innerText = data.error;
		} else {
			var d = openDialog('Player Deleted');
			var row = addRow(d);
			row.style.color = 'slategray';
			row.innerText = 'Player successfully deleted.';
		}

		lineBreak(d);
		row = addRow(d);
		addButton(row, 'OK', 'green', () => {
			closeTab(currentTab);
			closeDialog();
		});
	});
}
let refundTab,
	refundList,
	pastRefunds,
	smackers,
	refundPage = 1,
	refundsPerPage = 10,
	maxPageCount = 1,
	pageDisplay;

const tabNotify = document.createElement('span');
tabNotify.className = 'notify';


function openRefunds () {
	refundTab = addTab('Refunds', false, renderRefunds);
}


function prepRefundTab () {
	showSpinner();
	setTimeout(() => {
		loadRefunds(smackers, true);
		setTimeout(() => {
			loadRefunds(refundList, false);
		}, 1000);
	}, 1000);

};

function paginate(array, page_size, page_number) {
	// human-readable page numbers usually start with 1, so we reduce 1 in the first argument
	return array.slice((page_number - 1) * page_size, page_number * page_size);
  }

function loadRefunds(el, loadAll) {
	requestAction('getRefunds', {firebaseId: false, reviewed: loadAll}, (data) => {
		hideSpinner();

		function createRefundTable() {
			el.appendChild(createTable(refunds, [
				'id',
				'firebase_id',
				'sku',
				'transaction_id',
				'reason',
				'reviewed',
				'date_created'
			], rowFunc, colFunc));
		}

		el.innerHTML = '';
		let refunds = [],
			refundRows = [];

		if (!data || data.rows === undefined || data.rows.length == 0) {
			el.innerText = 'HOORAY! No refunds!';
			tabNotify.innerHTML = '';
			tabNotify.style.display = 'none';
			return;
		}
		
		function compare( a, b ) {
			if ( a.firebase_id < b.firebase_id ){
				return -1;
			}
			if ( a.firebase_id > b.firebase_id ){
				return 1;
			}
			return 0;
		}
		
		  data.rows.sort(compare);

		  refundRows = [...data.rows];

		  let prevBtn,
			  nextBtn;

		if (!loadAll) {
			tabNotify.style.display = 'inline-block';
			tabNotify.innerHTML = data.rows.length;
			refundTab.appendChild(tabNotify);
			refunds.push(...data.rows);

		} else {
			const btns = addRow(el);
			prevBtn = addButton(btns, '◀ previous', 'green', pagPrev);
			nextBtn = addButton(btns, 'next ▶', 'green', pagNext);
			pageDisplay = addCol(btns);

			
			maxPageCount = Math.ceil(data.rows.length / refundsPerPage);
			prevBtn.disabled = true;
			
			if (!maxPageCount || maxPageCount === 1) {
				nextBtn.disabled = true;
			}
			pageDisplay.textContent = `Page: 1 of ${maxPageCount}`;

			refunds.push(...paginate(data.rows, refundsPerPage, refundPage));
		}

		function pagNext () {
			prevBtn.disabled = false;
			if (refundPage === maxPageCount) {
				prevBtn.disabled = false;
				nextBtn.disabled = true;
				return;
			} else {
				const table = el.getElementsByTagName('table')[0].remove();
				refundPage += 1;
				if (refundPage === maxPageCount) {
					nextBtn.disabled = true;
				}
				pageDisplay.textContent = `Page: ${refundPage} of ${maxPageCount}`;
				refunds = [];
				refunds.push(...paginate(refundRows, refundsPerPage, refundPage));
				createRefundTable();
			}
		}

		function pagPrev() {
			nextBtn.disabled = false;
			if (refundPage === 1) {
				prevBtn.disabled = false;
				nextBtn.disabled = true;
				return;
			} else {
				const table = el.getElementsByTagName('table')[0].remove();
				refundPage -= 1;
				if (refundPage === 1) {
					prevBtn.disabled = true;
				}
				pageDisplay.textContent = `Page: ${refundPage} of ${maxPageCount}`;
				refunds = [];
				refunds.push(...paginate(refundRows, refundsPerPage, refundPage));

				createRefundTable();
			}
		}

		createRefundTable();

		function rowFunc (row, tr) {

			tr.id = row.id;
			if (!isNaN(row.reason)) {
				row.reason = refundReasons.find(el => el.code == row.reason).type;
			}

			tr.onclick = (e) => {
				openPlayerDataFromFirebaseId(row.firebase_id);
			};
		}

		function colFunc (column, td) {

			if (column === 'reviewed') {
				const val = td.innerHTML == 1 ? true : false;
				const x = document.createElement("input");
				td.textContent = '';
				x.setAttribute("type", "checkbox");
				x.checked = val;
				x.disabled = true;			
				td.appendChild(x);
			}
		}
	});
}

function renderRefunds (page) {
	addRule(page);
	refundList = addRow(page);
	addRule(page);
	smackers = addRow(page);
	prepRefundTab();

}
class ScheduledEvent {
	constructor(parent, eventType, eventData) {
		this.parent = parent ? parent : '';
		this.eventType = eventType;
		this.eventName = '';
		this.modifier = '',
		this.theEventForm = '';
		this.startDate = '';
		this.endDate = '';
		this.eventId = this.eventId ? this.eventId : this.idGenerate(5);
		this.itemId = '';
		this.scheduleEvent = 'schedule-event';
		this.isSaved = false;
		this.submitButton = 'Add';
		this._eventData = {
			start_date: '',
			end_date: '',
			modifier: 2,
			name: '',
			id: '',
			item_id: '',
			type: '',
		};
	}
	get eventData() {
		return this._eventData;
	}
	set eventData(data) {
		this._eventData = data;
		this.eventType = this._eventData.type;
		this.eventName = this._eventData.name;
		this.modifier = this._eventData.modifier;
		this.startDate = this.sqlDateTime(this._eventData.start_date);
		this.endDate = this.sqlDateTime(this._eventData.end_date);
		this.eventId = this._eventData.id;
		this.itemId = this._eventData.item_id;
		this.submitButton = 'Update';
		this.isSaved = true;
		this.eventForm();
	}
	newLabel(id, name) {
		let label = document.createElement('label');
		label.htmlFor = id;
		label.innerText = name;
		return label;
	}
	newInput(id, name, type, value, listeners) {
		let input = document.createElement('input');
		input.type = type ? type : 'datetime-local';
		input.value = value ? value : '';
		input.name = name ? this.spaceRepLower(name) : '';
		input.className = name ? this.spaceRepLower(name) : '';
		input.id = `input-${id}`;
		if (listeners && Array.isArray(listeners) ) {
			listeners.forEach( (listener) => {
				let action = listener[0],
					fucRef = listener[1],
					outer = this;
				// input.addEventListener(listener[0], listener[1])(e);
				input.addEventListener(action, function(e) {
					outer[fucRef](e);
					e.preventDefault();
				});
			});
		}
		return input;
	}
	theLegend(parent) {
		let legend = document.createElement('legend'),
			eventName = this.eventTypeName(this.eventType);
		legend.className = this.spaceRepLower(eventName);
		legend.innerText = eventName;
		return parent.appendChild(legend);
		
	}
	newInputContainer(parent, name, type, value, listeners) {
		this.errorMissing();
		let div = document.createElement('div'),
			label = this.newLabel(this.eventId, name),
			input = this.newInput(this.eventId, name, type, value, listeners);
		div.id = `event-id-${this.eventId}`;
		div.className = `input-container input-type-${this.spaceRepLower(type)}`;
		if (type !== 'submit') div.appendChild(label);
		div.appendChild(input);
		return parent.appendChild(div);

	}
	errorMissing() {
		if (!this.parent) {
			console.log('Parent missing');
			return;
		}
	}

	eventForm() {
		let id = this.eventId ? this.eventId : this.idGenerate(3);
		let formID = `event-form-id-${id}`;
		this.theEventForm = document.createElement('form');
		this.theEventForm.className = this.isSaved ? 'saved' : 'new-event';
		this.theEventForm.id = formID;
		this.theLegend(this.theEventForm);
		this.newInputContainer(this.theEventForm, 'eventname', 'text', this.eventName);
		this.newInputContainer(this.theEventForm, 'Modifier', 'number', this.modifier);
		this.newInputContainer(this.theEventForm, 'Start date', 'datetime-local', this.startDate);
		this.newInputContainer(this.theEventForm, 'End date', 'datetime-local', this.endDate);
		this.newInputContainer(this.theEventForm, 'event-id', 'hidden', id);
		this.newInputContainer(this.theEventForm, 'Submit', 'submit', this.submitButton, [['click', 'eventSubmit']]);
		this.newInputContainer(this.theEventForm, 'Delete', 'submit', 'Delete', [['click', 'eventDelete']]);
		return this.parent.appendChild(this.theEventForm);
	}
	eventSubmit(e) {
		e.preventDefault();
		let parentForm = e.target.form,
			values = parentForm.elements,
			startDate = values.startdate.value,
			endDate = values.enddate.value;
			startDate = this.sqlDate(startDate);
			endDate = this.sqlDate(endDate);

		if (!this.validateName(values.eventname.value)) {
			return;
		}
		if (!this.validateDates(startDate, endDate)) {
			return;
		}
		let data = {
			eventId: this.eventId,
			eventType: this.eventType,
			eventName: this.sanitizeString(values.eventname.value),
			modifier: 'modifier' in values ? values.modifier.valueAsNumber : 0,
			item_id: 'itemid' in values ? values.itemid.value : 0,
			price: 'price' in values ? values.price.value : 0,
			// startDate: startDate * 0.001,
			// endDate: endDate * 0.001,
			startDate,
			endDate
		};

		this.saveEvent(data, parentForm);
	}
	saveEvent(data, parent) {

		if(!data) {
			return;
		}
		let outer = this;

		requestAction('scheduledEvent', data, () => {
			hideSpinner();
			markDirty('Settings', true);
			outer.showEventSaved(parent);
		});

	}
	showEventSaved(parent) {
		return parent.className = 'saved';
	}
	eventDelete(e) {
		let outer = this,
			id = this.eventId,
			idString = id.toString();

		if (!idString.includes('dummy')) {
			let sendData = {eventId: Number(this.eventId)};

			requestAction('scheduledEventDelete', sendData, () => {
				hideSpinner();
				markDirty('Settings', true);
				setTimeout(() => {
					this.hideEvent();
				}, 500);
			});
		} else {
			showSpinner();
			setTimeout(() => {
				this.parent.removeChild(this.theEventForm);
				hideSpinner();
			}, 300);
		}

	}
	hideEvent() {
		let el = document.getElementById(`event-form-id-${this.eventId}`);
		el.style.className = 'fadeout';
		setTimeout(() => {
			el.style.display = 'none';
		}, 300);
	}
	validateDates(start, end) {
		let todayDate = Date.now();
		// console.log('today', todayDate, 'start', start, 'end', end);
		if (!start || !end) {
			alert('FEED ME DATES');
			return;
		}
		if (start < todayDate ) {
			alert('Doh! This is not Back to the Future. You just saved a start date that is in the past!.');
		}
		if (start > end) {
			alert('Well, no. The start date cannot be after the end date.');
			return;
		}
		return true;
	}
	validateName(name) {
		if (!name) {
			alert('So, the event needs a name. K?');
			return false;
		}
		if (name.length < 3) {
			alert('Well, that\'s not very descriptive');
		}
		return true;
	}
	eventTypeName(event) {
		let eventName;
		switch (event) {
			case 1 :
				eventName = 'Egg Modifier';
				break;
			case 2 : 
			eventName = 'Item Sale';
			break;
		}
		return eventName;
	}
	sqlDate(date) {
		// save
		return date.replace('T', ' ');
	}
	sqlDateTime(date) {
		return date.replace(' ', 'T');
	}
	idGenerate(length) {
		let result           = '';
		let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let charactersLength = characters.length;
		for ( let i = 0; i < length; i++ ) {
		   result += characters.charAt(Math.floor(Math.random() * charactersLength));
		}
		return 'dummy' + result;
	}
	spaceRepLower(str) {
		return str.replace(/\s+/g, '').toLowerCase();
	}
	sanitizeString(string) {
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			"/": '&#x2F;',
		};
		const reg = /[&<>"'/]/ig;
		return string.replace(reg, (match)=>(map[match]));
	  }
}

class EventItemSale extends ScheduledEvent {
	constructor(parent, eventType, eventName, eventData) {
		super(parent, eventType, eventName, eventData);
	}
	eventForm(){
		let id = this.eventId ? this.eventId : this.idGenerate(3);
		let formID = `event-form-id-${id}`;
		this.theEventForm = document.createElement('form');
		this.theEventForm.className = this.isSaved ? 'saved' : 'new-event';
		this.theEventForm.id = formID;
		this.eventId = formID;
		this.theLegend(this.theEventForm);
		this.newInputContainer(this.theEventForm, 'Event Name', 'text', this.eventName);
		this.newInputContainer(this.theEventForm, 'Item Id', 'text', this.itemId);
		this.newInputContainer(this.theEventForm, 'Sale Price', 'number', this.price);
		this.newInputContainer(this.theEventForm, 'startdate', 'datetime-local', this.startDate);
		this.newInputContainer(this.theEventForm, 'enddate', 'datetime-local', this.endDate);
		this.newInputContainer(this.theEventForm, 'event-id', 'hidden', id);
		this.newInputContainer(this.theEventForm, 'Submit', 'submit', 'Submit', [['click', 'eventSubmit']]);
		this.newInputContainer(this.theEventForm, 'Delete', 'submit', 'Delete', [['click', 'eventDelete']]);
		return this.parent.appendChild(this.theEventForm);
	}
}

class AddNewEvent {
	constructor(parent) {
		this.parent = parent;
		this.types = [['Egg Modifier', '1'], ['Item sale', '2']];
		this.select = '';
		this.selectId = 'select-event-type';
		this.btn = '';
		this.btnText = 'Add event';
		this.classGreen = 'green';
	}
	theSelect() {
		this.select = document.createElement('select');
		this.select.id = this.selectId;
		this.types.forEach((type) => {
			let option = document.createElement('option');
			option.value = type[1];
			option.innerHTML = type[0];
			this.select.appendChild(option);
		})
		return this.select;
	}
	theButton() {
		let outer = this;
		this.btn = document.createElement('button');
		this.btn.innerText = this.btnText;
		this.btn.className = this.classGreen;
		this.btn.addEventListener('click', function(e) {
			outer.getTheTypeAndCreate(e);
		});
		return this.btn;
	}
	theWholeThing() {
		let div = document.createElement('div'),
			select = this.theSelect(),
			btn = this.theButton();
		div.className = 'add-event-container';
		div.appendChild(select);
		div.appendChild(btn);
		return this.parent.appendChild(div);
	}
	getEventType(event, parent, selectedEvent, selectedName) {
		let eventName;
		switch (event) {
			case 1 :
				eventName = new ScheduledEvent(parent, selectedEvent);
				break;
			case 2 : 
			eventName = new EventItemSale(parent, selectedEvent);
			break;
		}
		return eventName;
	}
	getTheTypeAndCreate(e) {
		showSpinner();
		setTimeout(() => {
			hideSpinner();
		}, 500);
		let selectedEvent = Number(this.select.value),
			selectedName = this.select.text,
			newEvent = this.getEventType(selectedEvent, this.parent, selectedEvent);
		newEvent.eventForm();

	}
}

class EventListing {
	constructor(parent) {
		this.parent = parent;
		this.events = '';
	}
	getListings() {
		let scheduleEvents = [];
		requestAction('getScheduledEvents', {}, (data) => {
			for (var i in data.rows) {
				var row = data.rows[i];
				scheduleEvents[row.id] = data.rows[i];
			}
			this.events = scheduleEvents;
			this.listing();
		});
	}
	getEventType(eventType, parent) {
		let eventName;
		switch (eventType) {
			case 1 :
				eventName = new ScheduledEvent(parent);
				break;
			case 2 : 
				eventName = new EventItemSale(parent);
			break;
		}
		return eventName;
	}
	listing() {
		let listCon = document.createElement('div');

		listCon.className = 'scheduled-listings';
		for (let i = 0; i < this.events.length; i++) {
			if (this.events[i]) {
				let event = this.getEventType(this.events[i].type, listCon);
				event.eventData = this.events[i];
			}
		}
		this.parent.appendChild(listCon);
	}
}
// function formatAMPM(dates) {
// 	const date = new Date(dates.getUTCFullYear(), dates.getUTCMonth(), dates.getUTCDate(), dates.getUTCHours(), dates.getUTCMinutes(), dates.getUTCSeconds());
// 	var hours = date.getHours();
// 	var minutes = date.getMinutes();
// 	var seconds = date.getSeconds();
// 	var ampm = hours >= 12 ? 'pm' : 'am';
// 	hours = hours % 12;
// 	hours = hours ? hours : 12; // the hour '0' should be '12'
// 	minutes = minutes < 10 ? '0'+minutes : minutes;
// 	var strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
// 	return strTime;
//   }

// const liveDate = (div) => {
// 	const date = new Date(),
// 		  nD = date.toUTCString(),
// 		  tzd = date.getTimezoneOffset(),
// 		  c = document.getElementById(div);
// 	c.innerHTML = `<small>Set the date and time according to UTC.</small><br />UTC Time: ${nD} (${formatAMPM(new Date())}).<br /><small>Local timezone diff: <i>${tzd/60}</i> hours.</small>`;
// 	setTimeout(() => {
// 		liveDate(div);
// 	}, 1000);

// };

// const vipDialog = (data) => {
// 	var d = openDialog('Vip stuff');
// 	var row = addRow(d);

// 	if ('results' in data) {
// 		if (data.results === 'SUCCESS') {
// 			row.innerText = `Vip give reward was a ${data.results}!`;
// 		} else {
// 			row.innerText = `Vip give reward was an absolute ${data.results}! RUN FOR DEM HILLS!`;
// 		}
// 	} else {
// 		row.innerText = `Whoops...`;
// 	}

// 	lineBreak(d);
// 	var buttons = addRow(d);

// 	addButton(buttons, 'X', 'red close-button', () => {
// 		closeDialog();
// 	});
// };

// const thirdPartyServiceDialog = (data) => {
// 	var d = openDialog('Third party service update');
// 	var row = addRow(d);

// 	if ('results' in data) {
// 		if (data.results === 'SUCCESS') {
// 			row.innerText = `Vip give reward was a ${data.results}!`;
// 		} else {
// 			row.innerText = `Vip give reward was an absolute ${data.results}! RUN FOR DEM HILLS!`;
// 		}
// 	} else {
// 		row.innerText = `${data.actionName.replace(/([A-Z])/g, ' $1').trim()} completed`;
// 	}

// 	lineBreak(d);
// 	var buttons = addRow(d);

// 	addButton(buttons, 'X', 'red close-button', () => {
// 		closeDialog();
// 	});
// };

// const sendNukeCache = () => {
// 	requestAction('nukeSsNewsCache', {}, thirdPartyServiceDialog);
// 	showSpinner();
// 	setTimeout(() => hideSpinner(), 500);
// };

// const updateTwitchBlackList = () => {
// 	requestAction('updateTwitchBlackList', {}, thirdPartyServiceDialog);
// 	showSpinner();
// 	setTimeout(() => hideSpinner(), 500);
// };

// const updateSubscriptionList = () => {
// 	requestAction('updateSubscriptions', {}, thirdPartyServiceDialog);
// 	showSpinner();
// 	setTimeout(() => hideSpinner(), 500);
// };

// const giveVipRewards = () => {
// 	requestAction('giveVipRewards', {}, vipDialog);
// 	showSpinner();
// 	setTimeout(() => hideSpinner(), 500);
// };

// const addVipToPlayerSubscription = () => {
// 	requestAction('addVipToPlayerSubscription', {}, vipDialog);
// 	showSpinner();
// 	setTimeout(() => hideSpinner(), 500);
// };


const showSsSettings = (page) => {

	
	const showItemsGiven = () => {
		itemList.classList.toggle('hideme');
	};

	var el = addCol(page, 'center');
	addHeader(el, 'Game Settings');
	addRule(page);
	addSmallHeader(page, 'Chickn Winner', 'h3');

	function getChwWinnerStats() {
		requestAction('getChwStats', {}, updateTxt);
	}

	setTimeout(() => {
		getChwWinnerStats();
	}, 1000);

	addButton(page, 'Update', 'orange', getChwWinnerStats);
	addButton(page, 'Hide/show items', 'orange', showItemsGiven);

	const wrap = addDiv(page);
	const eggs = addDiv(wrap);
	const statItems = addDiv(wrap);
	const itemsToEggs = addDiv(wrap);
	const ratio = addDiv(wrap);
	const total = addDiv(wrap);
	const itemsGiven = addDiv(wrap);
	const itemList = document.createElement('ul');
	const itemHeader = document.createElement('h3');
	const tiers = addDiv(wrap);
	const tierList = document.createElement('ul');
	const tierHeader = document.createElement('h3');
	
	itemList.classList.add('hideme');
	itemHeader.innerText = 'Items given';
	tierHeader.innerHTML = 'Tiers given';

	function calculateRatio(num1, num2){
		for(num=num2; num>1; num--) {
			if((num1 % num) == 0 && (num2 % num) == 0) {
				num1=num1/num;
				num2=num2/num;
			}
		}
		return num1+":"+num2;
	}

	// if eggs minus itemToEggs = total of items vs eggs if the item were rewarded

	function updateTxt(stats) {
		itemsGiven.appendChild(itemHeader);

		itemsGiven.appendChild(itemList);
		tiers.appendChild(tierHeader);
		tiers.appendChild(tierList);
		eggs.innerHTML = `Egg draw(s): ${stats.data.eggs}`;
		statItems.innerHTML = `Item draw(s): ${stats.data.item}`;
		itemsToEggs.innerHTML = `Items owned draw(s): ${stats.data.itemToEggs} (actual items draw(s): ${stats.data.item + stats.data.itemToEggs})`;
		ratio.innerHTML = `Ratio (items to eggs): ${calculateRatio(stats.data.itemToEggs + stats.data.item, stats.data.eggs - stats.data.itemToEggs)}`;
		total.innerHTML = `Total: ${stats.data.eggs + stats.data.item}`;
		itemList.innerHTML = '';

		Object.entries(stats.data.items).forEach(key => {
			let item = document.createElement('li');
			let subList = document.createElement('ul');
			let subData = document.createElement('li');
			let subSubData = document.createElement('li');
			let itemId = parseInt(key);
			item.innerHTML = `<i>${items[itemId] ? items[itemId].name : itemId}</i>`;
			subData.innerHTML = `Count: ${stats.data.items[itemId].count}`;
			subSubData.innerHTML = `Tier: ${stats.data.items[itemId].tier}`;
			itemList.appendChild(item);
			item.appendChild(subList);
			subList.appendChild(subData);
			subList.appendChild(subSubData);
		});

		tierList.innerHTML = '';

		Object.entries(stats.data.tier).forEach(key => {
			let item = document.createElement('li');
			item.innerHTML = `<i>Tier ${parseInt(key)}</i>: count: ${stats.data.tier[parseInt(key)]}`;
			tierList.appendChild(item);
		});
	}

	// addSmallHeader(page, 'Third Party Services', 'h3');
	// // addButton(page, 'Nuke news cache', 'green', sendNukeCache);
	// addSmallHeader(page, 'Subscriptions', 'h3');
	// addButton(page, 'Update Subscribers', 'green', updateSubscriptionList);
	// addButton(page, 'Give Vip Reward', 'green', giveVipRewards);
	// addButton(page, 'Add player to subs', 'green', addVipToPlayerSubscription);
	// addRule(page);
	// Gauge meter desc
	// addSmallHeader(page, 'Gauge meter variables', 'h3');
	// let p = document.createElement('p');
	// p.innerHTML = '<ul><li>Min and max are the values the gauge will bounce around inbetween. <li><i>Min value: 165. Max value:  195.</i></li></li><li>Load value is the current value of the gauge.</li><li>Stop value is the final or set value but stop gauge will need to be checked to stop the gauge from moving</li></ul>';
	// page.appendChild(p);
	// End gauge meter desc
	//<input type="range" min="1" max="100" value="50" class="slider" id="myRange">

	
	// requestAction('getGaugeMeterData', {}, (data) => {
	// 	// data.rows.forEach(el => refundReasons.push(el));
	// 	setupGaugeMeterUi(data.data);
	// 	response();
	// });

	// const setupGaugeMeterUi = (gaugeData) => {
	// 	let loadDiv = document.createElement('div');
	// 	let minDiv = document.createElement('div');
	// 	let maxDiv = document.createElement('div');
	// 	let setDiv = document.createElement('div');
	// 	let setCheckDiv = document.createElement('div');

	
	// 	let minInput = document.createElement('input');
	// 	let maxInput = document.createElement('input');
	// 	let loadValue = document.createElement('input');
	// 	let setCheck = document.createElement('input');
	// 	let setValue = document.createElement('input');
	
	
	// 	let minLabel = document.createElement('label');
	// 	let maxLabel = document.createElement('label');
	// 	let loadLabel = document.createElement('label');
	// 	let setCheckLabel = document.createElement('label');
	// 	let setLabel = document.createElement('label');

	// 	// min: 164,
	// 	// max: 196,
	// 	// default: 180,
	
	// 	loadValue.type = 'number';
	// 	loadValue.min = 164;
	// 	loadValue.max = 196;
	// 	loadValue.value = gaugeData.loadvalue;
	
	// 	setValue.type = 'number';
	// 	setValue.min = 164;
	// 	setValue.max = 196;
	// 	setValue.value = gaugeData.setValue;
	
	// 	minInput.type = 'number';
	// 	minInput.min = 164;
	// 	minInput.max = 196;
	// 	minInput.value = gaugeData.min;
	
	// 	setCheck.type = 'checkbox';
	// 	setCheck.checked = gaugeData.active;
	
	// 	maxInput.type = 'number';
	// 	maxInput.min = 164;
	// 	maxInput.max = 196;
	// 	maxInput.value = gaugeData.max;
	
	// 	minLabel.innerText = `Min: `;
	// 	maxLabel.innerText = `Max: `;
	// 	loadLabel.innerText = `On load :`;
	// 	setCheckLabel.innerText = `Stop gauge: `;
	// 	setLabel.innerText = `Stop value: `;
	
	
	// 	minInput.onchange = () => {
	// 	};
	
	// 	maxInput.onchange = () => {
	// 	};
	
	// 	minDiv.appendChild(minLabel);
	// 	minDiv.appendChild(minInput);
	
	// 	maxDiv.appendChild(maxLabel);
	// 	maxDiv.appendChild(maxInput);


	
	// 	loadDiv.appendChild(loadLabel);
	// 	loadDiv.appendChild(loadValue);
	
	// 	setCheckDiv.appendChild(setCheckLabel);
	// 	setCheckDiv.appendChild(setCheck);
	
	// 	setDiv.appendChild(setLabel);
	// 	setDiv.appendChild(setValue);
	
	// 	page.appendChild(minDiv);
	// 	page.appendChild(maxDiv);
	// 	page.appendChild(loadDiv);
	// 	page.appendChild(setCheckDiv);
	// 	page.appendChild(setDiv);
	
	// 	const saveGaugeMeterVariables = () => {
	// 		const min = minInput.value,
	// 			max = maxInput.value,
	// 			loadvalue = loadValue.value,
	// 			active = setCheck.checked,
	// 			set = setValue.value;
	
	// 			requestAction('saveGaugeMeterVariables', {meter: {min, max, loadvalue, active, set}}, (data) => {
	// 				console.log(data);
	// 			});
	// 	};
	
	// 	addButton(page, 'Save bar values', 'green', saveGaugeMeterVariables);
	// 	addRule(page);
	// };

	// addHeader(page, 'Scheduled events');
	// addSmallHeader(page, 'Add a new scheduled event', 'h2');
	// const utcTimer = addDiv(page, 'utc-time', 'utc-time text-center');
	// let eventDoubleEgger = document.createElement('div'),
	// 	addEvent = new AddNewEvent(eventDoubleEgger),
	// 	eventListing = new EventListing(eventDoubleEgger);
	
	// addEvent.theWholeThing();
	// eventDoubleEgger.className = 'sheduled-events-listing';
	// eventListing.getListings();
	// page.appendChild(eventDoubleEgger);
	// liveDate(utcTimer.id);
	
};

function openSettingsTab () {
	addTab('Settings', false, showSsSettings);
}
var sponsors;
var sponsorIds = {};

function openSponsorsTab () {
	addTab('Sponsors', false, renderSponsors);
}

function renderSponsors (page) {
	fetchSponsors(() => {
		finishRenderSponsors(page);
	});
}

function fetchSponsors (callback) {
	getRequest('data/sponsors.json?' + Date.now(), (err, res) => {
		if (err) {
			sponsors = [];
		} else {
			sponsors = JSON.parse(res);
		}

		sponsors.push({});
		callback();
	});
}

function finishRenderSponsors (page) {
	/*** Begin layout ***/

	var buttons = addRow(page);
	var saveButton = addButton(buttons, 'Save Changes', 'green', save);
	var discardButton = addButton(buttons, 'Discard', 'red', () => {
		markDirty('Sponsors', true);
	});

	saveButton.disabled = true;
	discardButton.disabled = true;

	var list = addRow(page);

	var columns = [
		'',
		'name',
		'link',
		'image'
	];

	var table = createTable(sponsors, columns, null, cellFunc, null);
	list.appendChild(table);

	/*** End layout ***/

	sponsorIds = {};

	for (var sponsor of sponsors) {
		sponsorIds[sponsor.id] = sponsor;
	}

	markDirty('Music', false);

	function cellFunc (key, td) {
		if (td.innerText === 'undefined') td.innerText = '';
		if (key == '') { // Delete button
			if (td.rowIdx < sponsors.length - 1) {
				var btn = document.createElement('div');
				btn.className = 'roundButton removeButton';
				btn.onclick = () => {
					delete sponsors[td.rowIdx];
					td.parentElement.remove();
					change();
				};
				td.innerText = '';
				td.appendChild(btn);
			}
		} else if (key == 'image') { // Thumbnails
			var id = sponsors[td.rowIdx].id;
			if (!id) {
				var img = document.createElement('img');
				img.src = 'WHEE';
				img.className = 'adThumbnail';
				img.onclick = () => {
					openImageUploader(img);
				};

				td.appendChild(img);
			} else {
				var img = document.createElement('img');
				img.src = 'data/img/sponsor/' + id + sponsors[td.rowIdx].imageExt;
				img.className = 'adThumbnail';
				img.onclick = () => {
					expandThumbnail(td.parentElement.children[2].firstChild.value, img);
				};

				td.appendChild(img);
			}
		} else {
			var input = document.createElement('input');
			input.value = td.innerText;

			input.oninput = () => {
				sponsors[td.rowIdx][key] = input.value;
				change();
				fitToContent(input);
			};
			input.className = key;

			fitToContent(input);
			td.innerText = '';
			td.appendChild(input);
		}
	}

	function expandThumbnail (name, imgEl) {
		var d = openDialog(name);
		var row = addRow(d);
		addImage(row, imgEl.src);

		var buttons = addRow(d);
		addButton(buttons, 'Update', 'green', () => {
			openImageUploader(imgEl);
		});
		addButton(buttons, 'Close', 'red', () => {
			closeDialog();
		});
	}

	// Load and display selected image on page
	function openImageUploader (imgEl) {
		closeDialog();

		openBinaryUploader(res => {
			var td = imgEl.parentElement;
			sponsors[td.rowIdx].image = res.data;
			sponsors[td.rowIdx].imageExt = res.ext;
			imgEl.src = res.data;

			change();
		}, '.png,.gif,.jpg,.jpeg');
	}

	function change () {
		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function changedLink (td) {
		saveButton.disabled = false;
		discardButton.disabled = false;
	}

	function save () {
		showSpinner();

 		requestAction('uploadSponsors', { sponsors: sponsors }, () => {
 			hideSpinner();
 			markDirty('Sponsors', true);
 		});
	}
}
// Show ticket
// If a tab exists for it already, just switch to it
// otherwise, create a new page and download it

function openTicket (id) {
	if (openTabByName('TCK-' + id)) return;

	addTab('TCK-' + id, true, (page) => {
		page.ticketId = id;
		renderTicket(page);
	});
}

function renderTicket (page) {
	requestAction('getTicket', { ticket_id: page.ticketId }, (data) => {
		if (!data.rows) {
			page.innerText = 'No ticket found for this ID';
			return;
		}

		data = data.rows[0];
		parseRow(data);

		var col = addCol(page);
		var admin = admins[data.admin_id];

		var assign = addField(col, '', '');
		var assignName = getFieldName(assign);
		var assignVal = getFieldValue(assign);
		//var email = addCol(page, 'fieldValue');

		if (admin) {
			assignName.innerText = 'assigned to: ';
			assignVal.innerText = admin.name;
			//email.innerHTML = createEmailLink(admin.email);
		} else {
			assignName.innerText = 'unassigned';
			assignVal.innerText = 'GIMME!'
			assignVal.className = 'col fieldValue link';

			assignVal.onclick = function () {
				requestAction('assign', {
					ticket_id: page.ticketId,
					admin_id: profile.id
				}, () => {
					assignName.innerText = 'assigned to:'
					assignVal.innerText = profile.name;
					assignVal.onclick = null;
					assignVal.className = 'col fieldValue';
					//email.innerHTML = createEmailLink(profile.email);
				});
			};
		}

		var col = addCol(page);
		addButton(col, 'Copy URL', 'green', () => {
			copyToClipboard(window.location.href + '?ticket=' + page.ticketId);
		});

		var impersonateFunc = function(impersonateId) { 
			var baseUrl = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
			window.open(baseUrl + '?adminImpersonate='  + impersonateId);
		};

		addButton(col, 'Impersonate', 'green', () => { return impersonateFunc(data.firebase_id); });

		lineBreak(page);

		var row = addRow(page);
		var col = addCol(row);
		addFields(col, data, [
			'ticket_id',
			'feedback_type',
			'status',
			'date_created'
		], (keyEl, valEl) => {
			if (keyEl.innerText == 'status') {
				valEl.className = 'fieldValue link';
				valEl.onclick = () => popupList(statusNames, (idx) => {
					requestAction('setStatus',
						{ status: idx, ticket_id: data.ticket_id },
						() => {
							valEl.innerText = statusNames[idx];
							markDirty('Feedback');
						}
					);
				});
			}
		});

		col = addCol(row);
		addFields(col, data, [
			'username',
			'times_played',
			'xsolla_token',
			'firebase_id',
			'email'
		], (keyEl, valEl) => {
			if (keyEl.innerText == 'firebase_id') {
				valEl.className = 'fieldValue link';
				valEl.onclick = function (ticketId, firebaseId) {
					return () => openPlayerDataFromTicket(ticketId, firebaseId);
				}(data.ticket_id, data.firebase_id);
			}
		});

		col = addCol(row);
		addFields(col, data, [
			'from_eu',
			'of_age',
			'targeted_ads'
		]);

		lineBreak(page);
		row = addRow(page, 'fieldName').innerText = 'comments';
		row = addRow(page, 'textBox').innerText = data.comments;

		row = addRow(page);
		var reply = addButton(row, 'Reply', 'blue');
		var note = addCol(row);
		note.style.color = 'slategray';
		note.style.margin = '10px';
		note.innerText = 'Replying will set status to "active"';

		reply.onclick = () => {
			var str = 'mailto:' + data.email +
				'?from=' + profile.email +
				'&subject=' + encodeURIComponent('Re: Shell Shockers [#' + data.ticket_id + ']') +
				'&body=' + encodeURIComponent('\n\n\n------------------------\nOriginal message\n------------------------\n' + data.comments);

			window.location.href = str;

			requestAction('setStatus', {
				status: statusEnum.active,
				ticket_id: data.ticket_id
			}, () => {

			});
		}

		lineBreak(page);

		row = addRow(page);
		col = addCol(row);
		addFields(col, data, [
			'game_version',
			'browser_name',
			'browser_version',
			'os_name',
			'os_version',
			'engine_name',
			'engine_version',
			'server',
			'url',
			'referrer'
		]);

		col = addCol(row);
		addFields(col, data, [
			'ping',
			'highest_ping',
			'fps',
			'screen_size',
			'inner_size',
			'color_depth',
			'pixel_depth',
			'gl_vendor',
			'gl_version',
			'renderer',
			'max_texture_size'
		]);

		lineBreak(page);

		col = addCol(row);
		addFields(col, data, [
			'game_type',
			'game_code',
			'current_balance',
			'local_kills',
			'local_deaths',
			'local_streak',
			'selected_class',
			'selected_color',
			'hat',
			'stamp',
			'weapons'
		], (keyEl, valEl) => {
			if (keyEl.innerText == 'game_code' && data.game_code) {
				/*valEl.className = 'fieldValue link';
				valEl.onclick = function (ticketId, firebaseId) {
					return () => openPlayerData(ticketId, firebaseId);
				}(data.ticket_id, data.firebase_id);*/
				valEl.innerHTML = '<a href="https://shellshock.io/#' + data.game_code + '" target="_window">' + data.game_code + '</a>'
			}
		});

		addRow(page, 'fieldName').innerText = 'log';
		addRow(page, 'textBox').innerText = decodeURIComponent(data.log);

		lineBreak(page);
		addRow(page, 'fieldName').innerText = 'debug';
		addRow(page, 'textBox').innerHTML = '<pre>' + JSON.stringify(data.debug, null, '\t') + '</pre>';
	});
}
// Parse and beautify JSON
function json (obj) {
	var jsonStr = JSON.stringify(obj);
	var blocks = jsonStr.split(/({|}|,)/g);
	var str = '';

	for (b in blocks) {
		var block = blocks[b];

		switch (block) {
		case '{':
			str += '{<ul>';
			break;
		case '}':
			str += '</ul>}<br>';
			break;
		case ',':
			break;
		default:
			str += block + '<br>';
			break;
		}
	}
	return str;
}

// Beautifies row data to make it more readable
function parseRow (row) {
	if (row.status !== undefined) {
		row.status = statusNames[row.status];
	}

	if (row.feedback_type !== undefined) {
		row.feedback_type = ['comment', 'feature', 'bug', 'purchase', 'account', 'abuse', 'other', 'deleteAccount'][row.feedback_type];
	}

	var bools = ['from_eu', 'of_age', 'targeted_ads', 'hold_to_aim', 'enable_chat', 'auto_detail', 'shadows_enabled', 'high_res'];
	for (var b in bools) {
		if (row[bools[b]] !== undefined) {
			row[bools[b]] = ['no', 'yes'][row[bools[b]]];
		}
	}

	if (row.selected_class !== undefined) {
		row.selected_class = ['soldier', 'scrambler', 'free ranger'][row.selected_class];
	}

	if (row.class !== undefined) {
		row.class = ['soldier', 'scrambler', 'free ranger'][row.class];
	}

	if (row.date_created !== undefined) {
		row.date_created = localTime(row.date_created);
	}

	if (row.date_modified !== undefined) {
		row.date_modified = localTime(row.date_modified);
	}

	if (row.login !== undefined) {
		row.login = localTime(row.login);
	}

	if (row.hasOwnProperty('game_type') && row.game_type != null) {
		row.game_type = GameTypes[row.game_type].shortName;
	}

	if (row.hasOwnProperty('item_id') && row.item_id != null) {
		row.item_id = `[${row.item_id}] - ` + (items[row.item_id] ? `${items[row.item_id].name}` : 'Item ID CHANGED');
	}

	if (row.hasOwnProperty('primary_item_id') && row.primary_item_id != null) {
		row.primary_item_id = items[row.primary_item_id].name;
	}

	if (row.hasOwnProperty('secondary_item_id') && row.secondary_item_id != null) {
		row.secondary_item_id = items[row.secondary_item_id].name;
	}

	if (row.hasOwnProperty('hat_item_id') && row.hat_item_id != null) {
		row.hat_item_id = items[row.hat_item_id].name;
	}

	if (row.hasOwnProperty('stamp_item_id') && row.stamp_item_id != null) {
		row.stamp_item_id = items[row.stamp_item_id].name;
	}

	if (row.hasOwnProperty('grenade_item_id') && row.grenade_item_id != null) {
		row.grenade_item_id = items[row.grenade_item_id].name;
	}

	if (row.hasOwnProperty('product_id') && row.product_id != null) {
		row.product_id = products[row.product_id].name;
	}
}

function showSpinner () {
	document.getElementById('spinner').style.display = 'block';
}

function hideSpinner () {
	document.getElementById('spinner').style.display = 'none';
}

function findTab (name) {
	var arr = Array.from(headerEl.children);
	for (var i = 0; i < arr.length; i++) {
		var e = arr[i];
		if ((e.innerText && e.innerText == name) || (e.innerText && e.innerText.includes(name))) {
			return e;
		}
	}

	return null;
}

function addTab (name, canClose, callback) {
	tabAway();

	var page = addRow(doc, 'page');
	page.id = name;

	var tab = document.createElement('div');
	tab.className = 'tab tabActive';
	tab.innerText = name;
	tab.attachedPage = page;
	tab.onclick = () => tabClicked(tab);
	tab.onmouseenter = function () {
		if (currentTab != this) {
			this.className = 'tab tabHover';
		}
	};
	tab.onmouseleave = function () {
		if (currentTab == this) {
			this.className = 'tab tabActive';
		} else {
			this.className = 'tab';
		}
	
	};
	header.appendChild(tab);
	currentTab = tab;

	if (canClose) {
		var x = document.createElement('div');
		x.className = 'closer';
		x.onclick = () => { closeTab(tab); event.stopPropagation() };
		tab.appendChild(x);
	} else {
		tab.style.paddingRight = '1em';
	}

	page.focus();
	tab.renderFunc = callback;
	callback(page);
	return tab;
}

function closeTab (e) {
	if (e == currentTab) {
		tabClicked(e.previousSibling);
	}

	e.attachedPage.parentNode.removeChild(e.attachedPage);
	header.removeChild(e);
}

function tabAway (e) {
	if (currentTab) {
		lastTab = currentTab;
		currentTab.scrollRestore = document.scrollingElement.scrollTop;
		currentTab.attachedPage.style.display = 'none';
		currentTab.className = 'tab';
	}
}

function openTabByName (name, canClose) {
	var tab = findTab(name);
	if (tab) {
		openTab(tab);
		return true;
	}
	return false;
}

function openTab (tab) {
	if (currentTab == tab) return;
	tabAway();

	tab.className = 'tab tabActive';
	tab.attachedPage.style.display = 'block';
	currentTab = tab;

	if (tab.scrollRestore) {
		document.scrollingElement.scrollTop = tab.scrollRestore;
	}
}

function tabClicked (tab, keepClosed) {
	if (tab.attachedPage.isDirty) {
		while (tab.attachedPage.firstChild) {
	    	tab.attachedPage.removeChild(tab.attachedPage.firstChild);
		}
		tab.renderFunc(tab.attachedPage);
		tab.attachedPage.focus();
		tab.attachedPage.isDirty = false;
	}
	if (!keepClosed) {
		openTab(tab);
	}
}

function markDirty (name, refreshNow, keepClosed) {
	var tab = findTab(name);
	if (tab) {
		tab.attachedPage.isDirty = true;
		if (refreshNow) tabClicked(tab, keepClosed);
	}
}
// Generic pool class for storing and retrieving pre-instantiated objects

'use strict';

/**
 * @constructor
 */

function Pool (constructorFn, size) {
	this.size = 0;
	this.originalSize = size;
	this.constructorFn = constructorFn;
	this.objects = [];
	this.idx = 0;
	this.numActive = 0;

	// Fill the pool
	this.expand(size);
}

Pool.prototype.expand = function (num) {
	for(var i = 0; i < num; i++) {
		var obj = this.constructorFn();
		obj.id = i + this.size;
		obj.active = false;
		this.objects.push(obj);
	}
	this.size += num;
};

Pool.prototype.retrieve = function (id) {
	if(id != undefined) {
		while (id >= this.size) {
			this.expand(this.originalSize);
		}
		this.numActive++;
		this.objects[id].active = true;
		return this.objects[id];
	}

	var i = this.idx;

	do {
		i = (i + 1) % this.size;
		var obj = this.objects[i];

		if(!obj.active) {
			this.idx = i;
			this.numActive++;
			obj.active = true;
			return obj;
		}
	} while(i != this.idx);

	this.expand(this.originalSize);
	console.log('Expanding pool for: ' + this.objects[0].constructor.name + ' to: ' + this.size);
	return this.retrieve();
};

Pool.prototype.recycle = function (obj) {
	obj.active = false;
	this.numActive--;
};

Pool.prototype.forEachActive = function (fn) {
	for(var i = 0; i < this.size; i++) {
		var obj = this.objects[i];

		if(obj.active === true) {
			fn(obj, i);
		}
	}
};'use strict';

var CommOut = {
	buffer: null,
	bufferPool: new Pool(function () { return new OutBuffer(16384); }, 2),

	getBuffer: function () {
		var b = this.bufferPool.retrieve();
		b.idx = 0;
		return b;
	}
};

function OutBuffer (size) {
	this.idx = 0;
	this.arrayBuffer = new ArrayBuffer(size);
	this.buffer = new Uint8Array(this.arrayBuffer, 0, size);
}

OutBuffer.prototype.send = function (ws) {
	var b = new Uint8Array(this.arrayBuffer, 0, this.idx);
	var that = this;
	ws.send(b);
	CommOut.bufferPool.recycle(this);
};

OutBuffer.prototype.packInt8 = function (val) {
	this.buffer[this.idx] = val & 255;
	this.idx++;
};

OutBuffer.prototype.packInt16 = function (val) {
	this.buffer[this.idx] = val & 255;
	this.buffer[this.idx + 1] = (val >> 8) & 255;
	this.idx += 2;
};

OutBuffer.prototype.packInt24 = function (val) {
	this.buffer[this.idx] = val & 255;
	this.buffer[this.idx + 1] = (val >> 8) & 255;
	this.buffer[this.idx + 2] = (val >> 16) & 255;
	this.idx += 3;
};

OutBuffer.prototype.packInt32 = function (val) {
	this.buffer[this.idx] = val & 255;
	this.buffer[this.idx + 1] = (val >> 8) & 255;
	this.buffer[this.idx + 2] = (val >> 16) & 255;
	this.buffer[this.idx + 3] = (val >> 24) & 255;
	this.idx += 4;
};

OutBuffer.prototype.packRadU = function (val) {
	this.packInt24(val * 2097152);
};

OutBuffer.prototype.packRad = function (val) {
	this.packInt16((val + Math.PI) * 8192);
};

OutBuffer.prototype.packFloat = function (val) {
	this.packInt16(val * 256);
};

OutBuffer.prototype.packDouble = function (val) {
	this.packInt32(val * 1048576);
};

OutBuffer.prototype.packString = function (str) {
	if (typeof str !== 'string') str = ''
	this.packInt8(str.length);
	for(var i = 0; i < str.length; i++) {
		this.packInt16(str.charCodeAt(i));
	}
};

OutBuffer.prototype.packLongString = function (str) {
	if (typeof str !== 'string') str = ''
	this.packInt16(str.length);
	for(var i = 0; i < str.length; i++) {
		this.packInt16(str.charCodeAt(i));
	}
};

var CommIn = {
	buffer: null,
	idx: 0,

	init: function (buf) {
		this.buffer = new Uint8Array(buf);
		this.idx = 0;
	},

	isMoreDataAvailable: function () {
		return Math.max(0, this.buffer.length - this.idx);
	},

	peekInt8U: function () {
		return this.buffer[this.idx];
	},

	unPackInt8U: function () {
		var i = this.idx;
		this.idx++;
		return this.buffer[i];
	},

	unPackInt8: function () {
		var v = this.unPackInt8U();
		return (v + 128) % 256 - 128;
	},

	unPackInt16U: function () {
		var i = this.idx;
		this.idx += 2;
		return this.buffer[i] + (this.buffer[i + 1] * 256);
	},

	unPackInt24U: function () {
		var i = this.idx;
		this.idx += 3;
		return this.buffer[i] +
			(this.buffer[i + 1] * 256) +
			(this.buffer[i + 2] * 65536);
	},

	unPackInt32U: function () {
		var i = this.idx;
		this.idx += 4;
		return this.buffer[i] +
			(this.buffer[i + 1] * 256) +
			(this.buffer[i + 2] * 65536) +
			(this.buffer[i + 3] * 16777216);
	},

	unPackInt16: function () {
		var v = this.unPackInt16U();
		return (v + 32768) % 65536 - 32768;
	},

	unPackInt32: function () {
		var v = this.unPackInt32U();
		return (v + 2147483648) % 4294967296 - 2147483648;
	},

	// Unsigned radians (0 to 6.2831)
	unPackRadU: function () {
		return this.unPackInt24U() / 2097152;
	},

	// Signed radians (-3.1416 to 3.1416)
	unPackRad: function () {
		var v = this.unPackInt16U() / 8192;
		return v - Math.PI;
	},

	// Float value packing (-327.68 to 327.67)
	unPackFloat: function () {
		return this.unPackInt16() / 256;
	},

	unPackDouble: function () {
		return this.unPackInt32() / 1048576;
	},

	unPackString: function (maxLen) {
		maxLen = maxLen || 255;
		var len = Math.min(this.unPackInt8U(), maxLen);
		return this.unPackStringHelper(len);
	},

	unPackLongString: function (maxLen) {
		maxLen = maxLen || 16383;
		var len = Math.min(this.unPackInt16U(), maxLen);
		return this.unPackStringHelper(len);
	},

	unPackStringHelper: function (len) {
		let remainder = this.isMoreDataAvailable();
		if (remainder < len) return 0;

		var str = new String();

		for(var i = 0; i < len; i++) {
			var c = this.unPackInt16U();
			if (c > 0) str += String.fromCodePoint(c);
		}

		return str;
	}
};