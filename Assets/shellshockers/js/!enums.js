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
