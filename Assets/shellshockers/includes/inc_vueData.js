var vueData = {
    ready: false,
    accountSettled: false,
    missingFeatures: [],
	showChangelogHistoryBtn: true,
	itemSearchVal: '',
	changelog: {
		version: '',
		current: [],
		history: [],
		showHistoryBtn: true
	},
	signInAttempts: 0,
	chatInitiatesLogin: false,
	onClickSignIn: false,
	checkProducts: 0,

    firebaseId: null,
    id: null,
	cgCreatedAccount: false,
	cgUser: false,
    photoUrl: null,
    maskedEmail: null,
    isEmailVerified: false,
    isAnonymous: true,
    showPrivacyOptions: isFromEU,
    isOfAge: false,
    showTargetedAds: false,
    delayTheCracking: false,
    displayAdFunction: Function,
    titleScreenDisplayAd: Function,
    displayAdObject: false,
    hideAds: false,

	feedbackSelected: null,

    isPoki: false,
    isPokiGameLoad: false,
    pokiRewardReady: false,
    isPokiNewRewardTimer: false,
    videoRewardTimers: {
        initial: 300000,
        primary: 420000
    },

    pokiRewNum: 1,

	eggOrg: {
		active: false,
		leaderboard: {
			0: 0,
			1: 0
		},
	},

	faction: {
		showPopup: false,
		factions: {
			0: 'Masters',
			1: 'Assasins'
		},
		items: {
			0: 1584,
			1: 1585,
		},
		playerFaction: null,
		switchTimer : null,
	},

	tipComp: {
		loading: {
			ref: 'LoadingMsgs',
			time: null,
		},
		tips : {
			ref: 'tipMsg',
			refAlt: 'tipMsgAlt',
			time: 10000,
		}
	},


    displayAd: {
        adUnit: {
            home: 'shellshockers_titlescreen',
            nugget: 'shellshockers_chicken_nugget_banner',
            house: 'ShellShockers_LoadingScreen_HouseAds',
			spinner: 'shellshockers_respawn_banner',
			respawn: RESPAWNADUNIT,
			respawnTwo: RESPAWN2ADUNIT,
			respawnThree: RESPAWN3ADUNIT,
			header: 'shellshock-io_728x90_HP',
        },
		header: 0
    },

    cGrespawnBannerTimeout: null,
    cGrespawnBannerErrors: 0,

    classIdx: 0,
    playerName: '',
    eggs: 0,
    kills: 0,
    deaths: 0,
    kdr: 0,
    streak: 0,
	accountCreated: null,
	kdrLifetime: 0,
	statsCurrent: {},
	statsLifetime: {},
	challengesClaimedUnique: 0,
	challengesClaimed : {
		total: 0,
		unique: 0
	},
	eggsSpent: 0,
	eggsSpentMonthly: 0,
	eggsEarnedBalance: 0,
    isUpgraded: false,
    upgradeName: '',
    isSubscriber: false,
	regionList: [], // Populated by Matchmaker API
    currentRegionId: null,
	currentRegionLocKey: '',
    currentGameType: 0,
    volume: 0,
   	getMusicVolume: 0.5,
	selectedWeaponDisabled: false,

    currentLanguageCode: 'en',

	feedbackType: {
		comment: {id: 0, locKey: 'fb_type_commquest'},
		request: {id: 1, locKey: 'fb_type_request'},
		bug: {id: 2, locKey: 'fb_type_bug'},
		purchase: {id: 3, locKey: 'fb_type_purchase'},
		account: {id: 4, locKey: 'fb_type_account'},
		abuse: {id: 5, locKey: 'fb_type_abuse'},
		other: {id: 6, locKey: 'fb_type_other'},
		delete: {id: 7, locKey: 'fb_type_delete'}
	},

	icon: {
		inventory : 'ico-nav-equipment',
		shop: 'ico-nav-shop',
		invite: 'fas fa-user-friends',
		home: 'ico-nav-home',
		user: 'ico-nav-profile',
		settings: 'fas fa-cog',
		fullscreen: 'fas fa-expand-alt',
		egg: 'fas fa-egg',
		dollar: 'fas fa-dollar-sign'
	},

	showScreen: 0,
	previousScreen: 0,
	screens: {
		home: 0,
		equip: 1,
		game: 2,
		profile: 3,
		photoBooth: 4,
	},

	currentEquipMode: null,

	equipMode: {
		inventory: 0,
		gear: 1,
		featured: 2,
		skins: 3,
		shop: 4,
	},

    ui: {
		noob: {
		},
        overlayType: {
            none: 0,
            dark: 1,
            light: 2,
        },
        overlayClass: {
            inGame: 'overlay_game'
        },
        team: {
            blue: 1,
            red: 2
        },
        houseAds: {
            small: null,
            big: null,
			homeScreen: []
        },
        showCornerButtons: true,
		hideUi: false,
		showHomeEquipUi: true,

		events: {
			twitch: false,
		},
		crazyGames: false,

		photoBooth: {
			type: 1,
			vignette: false,
		},
		homeToGameProgressBar: {
			progressValue: 0,
			totalAssets: 4, // Adjust this based on the actual number of assets
			loadedAssets: 0,
			nonAccountTotal: 8,
			accountTotal: 4
		},

		tutorialPopup: {
			show: false,
			keys: [
				{ locKey: 'keybindings_grenade', cls: 'tutorial-grenade' },
				{ locKey: 'keybindings_melee', cls: 'tutorial-melee' },
				{ locKey: 'keybindings_reload', cls: 'tutorial-reload' },
				{ locKey: 'keybindings_fire', cls: 'tutorial-shoot' },
				{ locKey: 'keybindings_aim', cls: 'tutorial-aim' },
				{ locKey: 'keybindings_jump', cls: 'tutorial-jump' },
				{ locKey: 'keybindings_swapweapon', cls: 'tutorial-swap-weapons' },
				{ locKey: 'tutorial_move_up', cls: 'tutorial-move-up' },
				{ locKey: 'tutorial_move_down', cls: 'tutorial-move-down' },
				{ locKey: 'tutorial_move_left', cls: 'tutorial-move-left' },
				{ locKey: 'tutorial_move_right', cls: 'tutorial-move-right' },
				{ locKey: 'tutorial_q', cls: 'tutorial-q tutorial-special-keys tutorial-key-top text-uppercase text_blue5' },
				{ locKey: 'tutorial_w', cls: 'tutorial-w tutorial-special-keys tutorial-key-top text-uppercase text_blue5' },
				{ locKey: 'tutorial_e', cls: 'tutorial-e tutorial-special-keys tutorial-key-top text-uppercase text_blue5' },
				{ locKey: 'tutorial_r', cls: 'tutorial-r tutorial-special-keys tutorial-key-top text-uppercase text_blue5' },
				{ locKey: 'tutorial_a', cls: 'tutorial-a tutorial-special-keys tutorial-key-bottom text-uppercase text_blue5' },
				{ locKey: 'tutorial_s', cls: 'tutorial-s tutorial-special-keys tutorial-key-bottom text-uppercase text_blue5' },
				{ locKey: 'tutorial_d', cls: 'tutorial-d tutorial-special-keys tutorial-key-bottom text-uppercase text_blue5' },
				{ locKey: 'tutorial_f', cls: 'tutorial-f tutorial-special-keys tutorial-key-bottom text-uppercase text_blue5' },
				{ locKey: 'tutorial_spacebar', cls: 'tutorial-spacebar tutorial-special-keys text-uppercase text_blue5'},
				{ locKey: 'tutorial_move_shift', cls: 'tutorial-shift tutorial-special-keys text-uppercase text_blue5' },
			],
			imgKeys: '',
			imgMouse: '',
		},

		lazyImages: {
			homeEgg1: 'img/eggPose05.webp',
			homeEgg2: 'img/eggPose01.webp',
			vipEmblem: 'img/vip-club/vip-club-popup-emblem.webp',
			vipPayment: 'img/store/UI_paymentOptions.webp',
			vipPopupBg: 'img/vip-club/vip-club-popup-background.webp',
			chwPopup: 'img/chicken-nugget/ssAd_chicknWinner800x600-min.webp',
			rickRoll: 'img/rickroll.gif',
			adBlockPopup: 'img/shellshockers-unite-lg.webp',
			vipImportant: 'img/vip-club/very-important-poultry.webp',
			eggPackSm: 'img/egg_pack_small.webp',
			goldenEgg: 'img/svg/ico_goldenEgg.svg',
			eggOrgGiveStuff: 'img/egg-org/eggOrg_timeTravel_splash800x600-min.webp',
			welcomePack: 'img/eggstra-value-pack.webp',
			welcomePackPopup: 'img/welcome-pass-popup.webp',
			kotcArrow: '/img/kotc/kotc-arrow.svg',
			chwChest: '/chicken-nugget/chw-loot-btn.webp'
		},

		notification: null,
		bonus: {
			showing: false,
			amount: 1000
		},

		mainMenu: [
			{
				locKey: 'account_title_home',
				icon: 'ico-nav-home',
				screen: 0,
				mode: [],
				hideOn: [2],
			},
			{
				locKey: 'account_title_profile',
				icon: 'ico-nav-profile',
				screen: 3,
				mode: [],
				hideOn: [],
			},
			{
				locKey: 'p_pause_equipment',
				icon: 'ico-nav-equipment',
				screen: 1,
				mode: [0],
				hideOn: [],
			},
			{
				locKey: 'eq_shop',
				icon: 'ico-nav-shop',
				screen: 1,
				mode: [3, 4, 2],
				hideOn: [],
			},
			// {
			// 	locKey: 'screen_photo_booth_menu',
			// 	icon: 'ico-nav-shop',
			// 	screen: 4,
			// 	mode: [],
			// 	hideOn: [],
			// },
		],
		profile: {
			statTab: 0,
			statTabClicked: false
		},
		playerListOverflow: false,
		typeSelectors: [
			{
				img: ItemIcons.Primary,
				type: ItemType.Primary
			},
			{
				img: ItemIcons.Secondary,
				type: ItemType.Secondary
			},
			{
				img: ItemIcons.Stamp,
				type: ItemType.Stamp
			},
			{
				img: ItemIcons.Hat,
				type: ItemType.Hat
			},
			{
				img: ItemIcons.Grenade,
				type: ItemType.Grenade
			},
			{
				img: ItemIcons.Melee,
				type: ItemType.Melee
			}
		],

		socialMedia: {
			footer: [
				{name: 'Facebook', reward: 'Facebook', url: 'https://www.facebook.com/bluewizarddigital', imgPath: 'footer-social-media-bubble-facebook.webp', icon: 'fa-facebook', id: 1227, owned: false},
				{name: 'Twitter', reward: 'Twitter', url: 'https://twitter.com/bluewizardgames', imgPath: 'footer-social-media-bubble-twitter.webp', icon: 'fa-twitter', id: 1234, owned: false},
				{name: 'Instagram', reward: 'Instagram', url: 'https://www.instagram.com/bluewizardgames/', imgPath: 'footer-social-media-bubble-instagram.webp', icon: 'fa-instagram', id: 1219, owned: false},
				{name: 'TikTok', reward: 'tiktok', url: 'https://www.tiktok.com/@bluewizarddigital', imgPath: 'footer-social-media-bubble-tiktok.webp', icon: 'fa-tiktok', id: 1208, owned: false},
				{name: 'Discord', reward: 'discord', url: 'https://discord.gg/bluewizard', imgPath: 'footer-social-media-bubble-discord.webp', icon: 'fa-discord', id: 1200, owned: false},
				{name: 'Steam', reward: 'Steam', url: 'https://store.steampowered.com/publisher/bluewizard', imgPath: 'footer-social-media-bubble-steam.webp', icon: 'fa-steam-symbol', id: 1223, owned: false},
				{name: 'Twitch', reward: 'Twitch', url: 'https://www.twitch.tv/bluewizarddigital', imgPath: 'footer-social-media-bubble-twitch.webp', icon: 'fa-twitch', id: 1268, owned: false},
				{name: 'newYolker', reward: '', url: 'https://bluewizard.com/subscribe-to-the-new-yolker', imgPath: '', icon: 'fa-envelope-open-text', id: null, owned: null},
			],
			selected: ''
		},
		isEvent: {
			active: false,
			houseAdImg: '',
			homeBtnImg: '',
			popupImg: '',
			popupBtnLoc: '',

		},
		premiumFeaturedTag: '',
		game : {
			stats: {
				loading: false
			},
			spectate: false,
			spectatingPlayerName: null
		}
    },

	twitchLinked: 0,
	twitchName: '',
    languages: [
            { name: 'English', code: 'en' },
            { name: 'French', code: 'fr' },
            { name: 'German', code: 'de' },
            { name: 'Russian', code: 'ru' },
            { name: 'Spanish', code: 'es' },
            { name: 'Portuguese', code: 'pt' },
            { name: 'Korean', code: 'ko' },
            { name: 'Chinese', code: 'zh' },
            { name: 'Dutch', code: 'nl' }
        ],

	locLanguage: {},
    playTypes: {
        joinPublic: 0,
        createPrivate: 1,
        joinPrivate: 2
    },

    gameTypes: [
		{ locKey: 'gametype_ffa', value: 0, order: 2 },
        { locKey: 'gametype_teams', value: 1, order: 1 },
        { locKey: 'gametype_ctf', value: 2, order: 0 },
        { locKey: 'gametype_king', value: 3, order: 3 },
    ],
    // This makes me mad, but until Vue is put in the clojure with GameType,
    // where it should have been to begin with, HERE IT IS >:(
	gameTypeKeys: [
        'FFA',
        'Teams',
        'Spatula',
        'King'
    ],

	reportReasons: [
		{ locKey: 'report_reason_cheating', value: 1 },
		{ locKey: 'report_reason_harassment', value: 2 },
		{ locKey: 'report_reason_offensive', value: 4 },
		{ locKey: 'report_reason_other', value: 8 }
	],

	banDurations: [
		{ label: '5 Minutes', value: 0 },
		{ label: '15 Minutes', value: 1 },
		{ label: '1 hour', value: 2 }
	],

    twitchStreams: [],
    youtubeStreams: [],
    newsfeedItems: [],
	maps: [],
    settingsUi: {
		settings: [],
        adjusters: {
            misc: [
                { id: 'volume', locKey: 'p_settings_mastervol', min: 0, max: 1, step: 0.01, value: 1, multiplier: 100 }
            ],
            mouse: [
                { id: 'mouseSpeed', locKey: 'p_settings_mousespeed', min: 1, max: 100, step: 1, value: 30 }
            ],
            gamepad: [
                { id: 'sensitivity', locKey: 'p_settings_sensitivity', min: 1, max: 100, step: 1, value: 30 },
                { id: 'deadzone', locKey: 'p_settings_deadzone', min: 0, max: 1, step: 0.01, value: 0.3, precision: 2 }
            ],
            // music: [
            //     { id: 'musicVolume', locKey: 'p_settings_music_volume', min: 0, max: 1, step: 0.01, value: 0.5,  multiplier: 100 }
            // ],
        },
        togglers: {
            misc: [
                { id: 'holdToAim', locKey: 'p_settings_holdtoaim', value: true },
                { id: 'enableChat', locKey: 'p_settings_enablechat', value: true },
                { id: 'safeNames', locKey: 'p_settings_safenames', value: false },
                { id: 'autoDetail', locKey: 'p_settings_autodetail', value: true },
                { id: 'shadowsEnabled', locKey: 'p_settings_shadows', value: true },
                { id: 'highRes', locKey: 'p_settings_highres', value: false },
                // { id: 'musicStatus', locKey: 'p_settings_music', value: true }
            ],
			misc2: [
                { id: 'hideBadge', locKey: 'p_settings_badge_hide', value: false },
                { id: 'closeWindowAlert', locKey: 'p_settings_close_alert', value: false },
				{ id: 'shakeEnabled', locKey: 'p_settings_shake', value: true },
				{ id: 'centerDot', locKey: 'p_settings_center_dot', value: true },
				{ id: 'hitMarkers', locKey: 'p_settings_hit_markers', value: true },
			],
            mouse: [
                { id: 'mouseInvert', locKey: 'p_settings_invertmouse', value: false },
				{ id: 'fastPollMouse', locKey: 'p_settings_fastpollmouse', value: false },
            ],
            gamepad: [
                { id: 'controllerInvert', locKey: 'p_settings_invertcontroller', value: false },
            ]
        },
        controls: {
            keyboard: {
                // The ids map to the field names in settings.controls[category]
                game: [
                    { id: 'up', side: 'left', locKey: 'keybindings_forward', value: 'W' },
                    { id: 'down', side: 'left', locKey: 'keybindings_backward', value: 'S' },
                    { id: 'left', side: 'left', locKey: 'keybindings_left', value: 'A' },
                    { id: 'right', side: 'left', locKey: 'keybindings_right', value: 'D' },
                    { id: 'jump', side: 'left', locKey: 'keybindings_jump', value: 'SPACE' },
					{ id: 'melee', side: 'left', locKey: 'keybindings_melee', value: 'F' },
					{ id: 'inspect', side: 'left', locKey: 'keybindings_inspect', value: 'G' },
					{ id: 'despawn', side: 'left', locKey: 'keybindings_despawn', value: 'P' },
                    { id: 'fire', side: 'right', locKey: 'keybindings_fire', value: 'MOUSE 0' },
                    { id: 'scope', side: 'right', locKey: 'keybindings_aim', value: 'SHIFT' },
                    { id: 'reload', side: 'right', locKey: 'keybindings_reload', value: 'R' },
                    { id: 'swap_weapon', side: 'right', locKey: 'keybindings_swapweapon', value: 'E' },
                    { id: 'grenade', side: 'right', locKey: 'keybindings_grenade', value: 'Q' },
                ],
                spectate: [
					{ id: 'ascend', locKey: 'keybindings_spectate_ascend', value: 'SPACE' },
					{ id: 'descend', locKey: 'keybindings_spectate_descend', value: 'SHIFT' },
					{ id: 'toggle_freecam', locKey: 'keybindings_spectate_freecam', value: 'V' },
                    { id: 'slow', locKey: 'keybindings_spectate_slow', value: 'MOUSE 0'},
                ]
            },
            gamepad: {
                // The ids map to the field names in settings.gamepad[category]
                game: [
                    { id: 'jump', locKey: 'keybindings_jump', value: '0' },
                    { id: 'fire', locKey: 'keybindings_fire', value: '1' },
                    { id: 'scope', locKey: 'keybindings_aim', value: '2' },
                    { id: 'reload', locKey: 'keybindings_reload', value: '3' },
                    { id: 'swap_weapon', locKey: 'keybindings_swapweapon', value: '4' },
                    { id: 'grenade', locKey: 'keybindings_grenade', value: '5' },
					{ id: 'melee', locKey: 'keybindings_melee', value: '6' },
					{ id: 'inspect', locKey: 'keybindings_inspect', value: '7' }
                ],
                spectate: [
                    { id: 'ascend', locKey: 'keybindings_spectate_ascend', value: '1' },
                    { id: 'descend', locKey: 'keybindings_spectate_descend', value: '2' }
                ]
            }
        }
    },

    songChanged: false,

    music: {
        isMusic: false,
        musicJson: 'data/sponsors.json',
        musicSrc: '',
        theAudio: '',
        playing: false,
        sponsors: {},
        sponsor: '',
        currIndex: 0,
        currentTime: 0,
        duration: 0,
        timer: null,
        progress: 0,
        volume: 10,
        hideClass: 'music-widget--fade-out',
        serverTracks: {
            id: '',
            title: '',
            artist: '',
            album: '',
            albumArt: '',
            url: '',
            trackUrltest: 'https://shellshock.io',
            sponsor: '',
            sponsorUrl: '',
        }
    },

    home: {        
        joinPrivateGamePopup: {
            code: '',
            showInvalidCodeMsg: false,
            validate: function () {
                if (this.code.length == 0) {
                    console.log('failed validation');
                    this.showInvalidCodeMsg =true;
                    BAWK.play('ui_reset');
                    return false;
                }
                console.log('passed validation');
                return true;
            },
            reset: function () {
                this.code = '';
                this.showInvalidCodeMsg = false;
            }
        },
		gaugeData: {
			default: {
				min: 164,
				max: 196,
				default: 180,
			},
			min: 185,
			max: 195,
			loadvalue: 190,
			setValue: 180,
			active: false,
		},
		vipEndedType: 0,
		welcomeBundleInfoRequested: false,
    },

	hvsm: {
		hero: {
			name: 'Heroes',
			items: [],
			img: 'img/gauge-bar/shell_E&E_good_popup.webp',
		},
		monster: {
			name: 'Monsters',
			items: [],
			img: 'img/gauge-bar/shell_E&E_evil_popup.webp',
		},
	},

    equip: {
        get showingItems () {
            return this._showingItems;
        },
        set showingItems (items) {
            this._showingItems = items;
			for (let i = 0; i < this.lazyRenderTimeouts.length; ++i) {
				clearTimeout(this.lazyRenderTimeouts[i]);
			}
        },
        lazyRenderTimeouts: [],
        equippedPrimary: null,
        equippedSecondary: null,
        equippedHat: null,
        equippedStamp: null,
        equippedGrenade: null,
        posingHat: null,
        posingStamp: null,
        posingWeapon: null,
        posingGrenade: null,
        posingMelee: null,
        posingStampPositionX: 0,
        posingStampPositionY: 0,
        showingWeaponType: ItemType.Primary,
        selectedItemType: ItemType.Primary,
		itemSearchTerm:  '',
		itemSearchNone: false,
		itemSearchVal: '',
        selectedItem: null,
        _showingItems: [],
        buyingItem: null,
        colorIdx: 0,
        extraColorsLocked: true,
        categoryLocKey: null,
        showSpecialItems: false,
        specialItemsTag: null,
		showUnVaultedItems: [],
		bundlePopupItems: [],
		chwRewardBuyItem: false,
		displayAdHeaderRefresh: true,
		bundle: {
			owned: false,
			items: [],
		},

        redeemCodePopup: {
            code: '',
            showInvalidCodeMsg: false,
            validate: function () {
                if (this.code.length == 0) {
                    console.log('failed validation');
                    this.showInvalidCodeMsg = true;
                    BAWK.play('ui_reset');
                    return false;
                }
                console.log('passed validation');
                return true;
            },
            reset: function () {
                this.code = '';
                this.showInvalidCodeMsg = false;
            }
        },

        physicalUnlockPopup: {
            item: null
        }
    },

    game: {
		eggOrg: {
			stats: {
				0: 0,
				1: 0
			}
		},
		on: false,
		isPaused: true,
        shareLinkPopup: {
            url: '',
            code: ''
        },
        gameType: 0,
        team: 1,
        respawnTime: 0,
        tipIdx: 0,
        isGameOwner: false,
		openPopupId: '',
        pauseScreen: {
            id: 'pausePopup',
            adContainerId: 'pauseAdPlacement',
            classChanged: false,
            wasGameInventoryOpen: false,
			mainContainer: '',
			canvas: '',
			showMenu: true,
        },
		disableRespawn: false,
		mapName: '',
		serverName: '',
		killDeathMsg: {
			showing: false,
			msgs: [],
			msg: '',
			style: '',
			timer: null,
		},
		challengeMsg: {
			showing: false,
			msgs: [],
			icon: '',
			title: '',
			timer: null,
		},
		ctsMsg: {
			showing: false,
			teams: ['', 'blue', 'red'],
			team: 0,
			msg: '',
			timer: null,
		},
		streakMsg: {
			showing: false,
			msg: '',
			count: 0,
			timer: null,
		},
		bestStreak: {
			count: 0,
			timer: null,
		},
		ingameNotification: {
			item: {type: 0, msg: '', streak : 0, style: ''},
			showing: false,
			timer: null,
			multiTimer: null,
		},
		inGameNotification: {
			type: 0,
			timer: null,
		},
		shellStreakTimers: [
			{
				msg: 'ks_double_eggs',
				msgId: 'double-eggs',
			},
			{
				msg: 'ks_miniegg',
				msgId: 'shrink',
			},
			{
				msg: 'ks_dmg',
				msgId: 'egg-breaker',
			},
			{
				msg: 'ks_restock',
				msgId: 'restock',
			}
		],
		showWelcomeBundleCta: false,
    },

    isEvent: false,
    doubleEggWeekendSoon: false,
    doubleEggWeekend: false,
    announcementMessage: null,

    playerActionsPopup: {
        playerId: 0,
        uniqueId: 0,
        isGameOwner: false,
        playerName: '',
        muted: false,
        muteFunc: null,
        bootFunc: null,
		reportFunc: null,
        social: false,
        vipMember: false
    },

	banPlayerPopup: {
		reason: ''
	},

	reportPlayerPopup: {
		checked: [false, false, false, false]
	},

    giveStuffPopup: {
        titleLoc: '',
        eggs: 0,
        items: [],
        type: ''
    },

    openUrlPopup: {
        url: '',
        titleLocKey: '',
        contentLocKey: '',
        confirmLocKey: 'ok',
        cancelLocKey: 'no_thanks'
    },

	bannedPopup: {
		expire: ''
	},

    genericMessagePopup: {
        titleLocKey: 'uh_oh',
        contentLocKey: 'purchase_disabled',
        confirmLocKey: 'ok'
    },

    unsupportedPlatformPopup: {
        titleLocKey: 'unsupported_platform',
        contentLocKey: ''
    },

    windowDimensions: {
        width: 0,
        height: 0,
    },

	bannerAds: {
        bannerElId: '',
    },

    googleAnalytics: {
        isUser: null,
        cat: {
            purchases: 'Purchases',
            purchaseComplete: 'Purchase Complete',
            itemShop: 'Item Shop',
            inventory: 'Inventory',
            playerStats: 'player stats',
            play: 'play game',
            redeem: 'Redeem'
        },
        action : {
            eggShackClick: 'Egg Shack Click',
            eggShackProductClick: 'Egg Shack Product Click',
            purchaseComplete: 'Purchase Complete',
            goldenChickenProductClick: 'Golden Chicken Product Click',
            goldenChickenNuggetClick: 'Golden Chicken Nugget Click',
            shopClick: 'Shop Opened ',
            shopItemClick: 'Shop Item Selected',
            shopItemPopupClick: 'Shop Item Popup Click',
            shopItemPopupBuy: 'Item purchased',
            shopItemNeedMoreEggsPopup: 'Need More Eggs Popup',
            inventorySelected: 'Inventory Item ',
            eggCount: 'Egg Count',
            inventoryTabClick: 'Inventory Opened',
            playGameClick: 'Play Game Click',
            redeemed: 'Redeemed',
            redeemClick: 'Redeem open',
            languageSwitch: 'Language setting change',
            langBeforeUpdate: 'Language before auto detect',
            privateGame: 'Private Game',
            shareGamePopup: 'Share game Popup',
            shareGameCopy: 'Shared game code',
            createGame: 'Created game',
            joinGame: 'Joined game',
            playerLimit: 'Player limit',
            timesPlayed: 'Times played',
            anonymousPopupOpenAuto: 'Anon warning auto opened',
            anonymousPopupOpen: 'Anon warning opened',
            anonymousPopupSignupClick: 'Anon warning Sign in clicked',
            anonymousPopupAgreeClick: 'Anon warning Understood clicked',
            denyAnonUserPopup: 'Deny anon user popup',
            denyAnonUserPopupSignin: 'sign in click',
            faqPopupClick: 'FAQ popup open',
            switchTeams: 'Switched Teams',
            error: 'error',
            signIn: 'Sign in'
        },
        label : {
            signInClick: 'sign in click',
            understood: 'Understood click',
            getMoreEggs: 'Get More Eggs Click',
            waitForGameReadyTimeout: 'waitForGameReady timeout',
            signInAuthFailed: 'authorization failed',
            signInTiming: 'Sign in delay',
            signInCompleted: 'Completed',
            signInOut: 'Signed out',
            signInFailed: '',
            homeToGameLoading: 'Home to game loading',
            loading: 'Loading'
        }
    },

    urlParams: null,
    urlParamSet: null,
    adTagUrl: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/21743024831/ShellShock_Video&description_url=__page-url__&env=vp&impl=s&correlator=&tfcd=0&npa=0&gdfp_req=1&output=vast&sz=640x480&unviewed_position_start=1',

    eggStoreItems: [],
    subStoreItems: [],
    premiumShopItems: [],

    eggStoreReferral:  '',
    eggStoreHasSale:  false,
    eggStorePopupSku:  'egg_pack_small',

    showNugget:  true,
    // isMiniGameComplete:  false,
	miniEggGameAmount:  0,
    showGoldenChicken:  false,
    nugStart:  null,
    nugCounter:  null,
    isBuyNugget:  false,
    adBlockerCountDown:  10,
    controllerType:  'generic',
    controllerId:  '',
    controllerButtonIcons: {
        xbox: [
            'A',
            'B',
            'X',
            'Y',
            'LB',
            'RB',
            'LT',
            'RT',
            'Select',
            'Start',
            '<img class="ss_buttonbind_icon" src="img/controller/button_stickleft.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_stickright.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadup.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpaddown.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadleft.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadright.svg">'
        ],
        ps: [
            '<img class="ss_buttonbind_icon" src="img/controller/button_cross.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_circle.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_square.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_triangle.svg">',
            'LB',
            'RB',
            'LT',
            'RT',
            'Select',
            'Start',
            '<img class="ss_buttonbind_icon" src="img/controller/button_stickleft.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_stickright.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadup.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpaddown.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadleft.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadright.svg">'
        ],
        switchpro: [
            'B',
            'A',
            'Y',
            'X',
            'LB',
            'RB',
            'LT',
            'RT',
            '-',
            '+',
            '<img class="ss_buttonbind_icon" src="img/controller/button_stickleft.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_stickright.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadup.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpaddown.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadleft.svg">',
            '<img class="ss_buttonbind_icon" src="img/controller/button_dpadright.svg">'
        ],
        generic: [
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15'
        ]
    },
    pwaDeferEvent: '',
    blackFridayBanner: false,
	isSale: false,
   	smallHouseAd: {},
    bannerHouseAd: false,
    showAdBlockerVideoAd: false,
    hasMobileReward: false,

    killName: null,
    killedName: null,
    killedByMessage: null,
    killedMessage: null,

	chw: {
		reward: {
			eggs: null,
			itemIds: [],
			ownedItems: null,
		},
		winnerCounter: 0,
		resets: 0,
		winnerDailyLimitReached: false,
		isError: false,
		miniGameComplete: true,
		hasPlayClicked: false,
		onClick: false,
		activeTimer: 6000,
		homeTimer: null,
		homeEl: null,
		signInClicked: false,
		adBlockDetect: false,
		nuggetReset: 0,

		hours: 0,
		minutes: 0,
		seconds: 0,
		progress: 0,
		limitReached: false,
		ready: false,

		imgs: {
			// loot: 'img/chicken-nugget/chickLoop_sleep.svg',
			// speak: 'img/chicken-nugget/chickLoop_speak.svg',
			// limit: 'img/chicken-nugget/chickLoop_daily_limit.svg',
			// sleep: 'img/chicken-nugget/chickLoop_sleep.svg',
			// idle: 'img/chicken-nugget/chickLoop_idle.svg',

			idle: 'img/chicken-nugget/alt/cyborg/chickLoop_idle.svg',
			speak: 'img/chicken-nugget/alt/cyborg/chickLoop_speak.svg',
			limit: 'img/chicken-nugget/alt/cyborg/chickLoop_sleep.svg',
			sleep: 'img/chicken-nugget/alt/cyborg/chickLoop_sleep.svg',
			loot: 'img/chicken-nugget/alt/cyborg/chickLoop_sleep.svg',
		}
	},

	isChicknWinnerError: false,
	chwMiniGameComplete: true,
	hasChwPlayClicked: false,
	chwActiveTimer: 6000,
	chwHomeTimer: null,
	chwHomeEl: null,
	chwSignInClicked: false,

	chwRewardIds: [],

	contentCreator: false,
	playClicked: false,

	store: {
		premiumItemId: null,
		itemIdsToHide: [],
	},

	dev: {
		store: {
			sku: null,
			sub: false,
		}
	},

	player: {
		challenges: [],
		challengeDailyData: 0,
		challengeTimer: {
			played: 0,
			alive: 0,
		}
	},

	gameOptionsPopup: {
		resetClicked: false,
		usingDefaults: true,
		changesMade: false,
		options: {},
        togglers: [
			{ id: 'locked', name: 'Locked', locKey: 'game_locked', value: 0 },
			{ id: 'noTeamChange', name: 'Disable Manual Team Change', locKey: 'game_options_manual', value: 0 },
			{ id: 'noTeamShuffle', name: 'Disable Automatic Team Change', locKey: 'game_options_auto', value: 0 }
		],
		adjusters: [
			{ id: 'gravity', locKey: 'game_options_gravity', min: 0.25, max: 1, step: 0.25, value: 1, precision: 2 },
			{ id: 'damage', locKey: 'game_options_damage', min: 0, max: 2, step: 0.25, value: 1, precision: 2 },
			{ id: 'healthRegen', locKey: 'game_options_healthRegen', min: 0, max: 4, step: 0.25, value: 1, precision: 2 }
		]
	},
	
	abTestInventory: {
		closed: false,
		started: false,
		enabled: false,
		reward: {
			item: null,
			eggs: 0,
		},
		clickables: [
			{id: 'shop-menu-item', locKey: 'ab_test_shop', scroll: false, setting: false},
			{id: 'equip-tab-skins', locKey: 'ab_test_skins', scroll: false, setting: false},
			{id: 'type-selector-grenade', locKey: 'ab_test_grenades', scroll: false, setting: false},
			{id: 'item-tag-wero', locKey: 'ab_test_wero', scroll: true, setting: false},
			{id: 'btn_buy_item', locKey: 'ab_test_buy', scroll: false, setting: false},
			{id: '', locKey: '', scroll: false, setting: false},
			// {id: 'screens-menu-btn-return', locKey: 'ab_test_back_to_game', scroll: false, setting: 'grenade'},
		],
		currentIdx: 0,
	},
	crazyGamesUser: {
		hasAccount: false,
		hasLinked: false,
		username: '',
		profilePictureUrl: '',
		userLoggedIn: false,
		isAnonymous: true,
	},
	reAuthPassword: {
		showPasswordModal: false,
		firebasePasswordReauthEmail: '',
		firebasePasswordReauthPassword: '',
		_pwResolve: null,
		_pwReject: null,
	},
}