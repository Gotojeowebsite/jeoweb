(() => {
  // src/shared/enums.mjs
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
    noClustersAvailable: 0,
    locked: 0
  };
  var i = 4e3;
  Object.keys(CloseCode).forEach((k) => {
    CloseCode[k] = i++;
  });
  var CommCode = {
    swapWeapon_: 100,
    joinGame_: 101,
    refreshGameState_: 102,
    spawnItem_: 103,
    observeGame_: 104,
    ping_: 105,
    bootPlayer_: 106,
    banPlayer_: 107,
    loginRequired_: 108,
    gameLocked_: 109,
    reportPlayer_: 110,
    banned_: 111,
    createPrivateGame_: 112,
    switchTeam_: 113,
    changeCharacter_: 114,
    pause_: 115,
    gameOptions_: 116,
    gameAction_: 117,
    requestGameOptions_: 118,
    gameJoined_: 119,
    socketReady_: 120,
    addPlayer_: 121,
    removePlayer_: 122,
    fire_: 123,
    melee_: 124,
    throwGrenade_: 125,
    info_: 126,
    eventModifier_: 127,
    hitThem_: 128,
    hitMe_: 129,
    collectItem_: 130,
    chlgPlayerRerollInGame_: 131,
    playerInGameReward_: 132,
    playerRewards_: 133,
    chat_: 134,
    syncThem_: 135,
    syncAmmo_: 136,
    die_: 137,
    beginShellStreak_: 138,
    endShellStreak_: 139,
    startReload_: 140,
    announcement_: 141,
    updateBalance_: 142,
    reload_: 143,
    respawn_: 144,
    respawnDenied_: 145,
    pong_: 146,
    clientReady_: 147,
    requestRespawn_: 148,
    joinPublicGame_: 149,
    joinPrivateGame_: 150,
    switchTeamFail_: 151,
    expireUpgrade_: 152,
    metaGameState_: 153,
    syncMe_: 154,
    explode_: 155,
    keepAlive_: 156,
    musicInfo_: 157,
    hitMeHardBoiled_: 158,
    playerInfo_: 159,
    challengeCompleted_: 160,
    eggOrgGameStats_: 161
  };
  var i = 0;
  Object.keys(CommCode).forEach((k) => {
    CommCode[k] = i++;
  });
  var CommCodeToKey = Object.keys(CommCode).reduce((acc, key) => {
    acc[CommCode[key]] = key;
    return acc;
  }, {});
  var GameTypes = [
    { shortName: "FFA", longName: "Free For All", value: 0 },
    { shortName: "Teams", longName: "Teams", value: 1 },
    { shortName: "Spatula", longName: "Captula the Spatula", value: 2 },
    { shortName: "King", longName: "King of the Coop", value: 3 }
  ];
  var SyncRate = 10;
  var FramesBetweenSyncs = Math.ceil(30 / SyncRate);
  var FeedbackType = {
    comment: 0,
    // For the heaping of praise upon us, probably. Definitely. Yeah.
    feature: 1,
    // Feature requests
    bug: 2,
    // Well, you know... bugs.
    purchase: 3,
    // Issues with item and golden egg purchases
    account: 4,
    // Account and privacy issues
    abuse: 5,
    // For people to bitch about other people "hacking"
    other: 6,
    // Who knows... Probably porn.
    deleteAccount: 7
    // for account delete requests
  };
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
  var reportReasons = [
    "cheating",
    "harrassment",
    "offensive",
    "other"
  ];
  var AdminRole = {
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
    Twitch: 16384
  };

  // temp/admin.js
  var Challenges = [{ "id": 1, "loc_ref": "chlg_kill_streak_five", "type": 0, "subType": 0, "period": 0, "goal": 1, "reward": 100, "conditional": 0, "value": "5", "valueTwo": null, "tier": 2 }, { "id": 2, "loc_ref": "chlg_kill_streak_ten", "type": 0, "subType": 0, "period": 0, "goal": 1, "reward": 200, "conditional": 0, "value": "10", "valueTwo": null, "tier": 2 }, { "id": 3, "loc_ref": "chlg_kill_streak_fifteen", "type": 0, "subType": 0, "period": 0, "goal": 1, "reward": 500, "conditional": 0, "value": "15", "valueTwo": null, "tier": 3 }, { "id": 4, "loc_ref": "chlg_kill_streak_twenty", "type": 0, "subType": 0, "period": 0, "goal": 1, "reward": 1e3, "conditional": 0, "value": "20", "valueTwo": null, "tier": 3 }, { "id": 5, "loc_ref": "chlg_kill_streak_fifty", "type": 0, "subType": 0, "period": 0, "goal": 1, "reward": 5e3, "conditional": 0, "value": "50", "valueTwo": null, "tier": 3 }, { "id": 6, "loc_ref": "chlg_kill_kills_ten", "type": 0, "subType": 10, "period": 0, "goal": 10, "reward": 100, "conditional": null, "value": null, "valueTwo": null, "tier": 0 }, { "id": 7, "loc_ref": "chlg_kill_kills_twenty", "type": 0, "subType": 10, "period": 0, "goal": 20, "reward": 200, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 8, "loc_ref": "chlg_kill_kills_fifty", "type": 0, "subType": 10, "period": 0, "goal": 50, "reward": 500, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 9, "loc_ref": "chlg_kill_kills_hundred", "type": 0, "subType": 10, "period": 0, "goal": 100, "reward": 1e3, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 10, "loc_ref": "chlg_kill_kills_two_fifty", "type": 0, "subType": 10, "period": 0, "goal": 250, "reward": 2500, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 11, "loc_ref": "chlg_kill_timePlayed_two", "type": 0, "subType": 6, "period": 0, "goal": 1, "reward": 100, "conditional": null, "value": "2", "valueTwo": "60", "tier": 0 }, { "id": 12, "loc_ref": "chlg_kill_timePlayed_four", "type": 0, "subType": 6, "period": 0, "goal": 1, "reward": 500, "conditional": null, "value": "4", "valueTwo": "60", "tier": 2 }, { "id": 13, "loc_ref": "chlg_kill_timePlayed_seven", "type": 0, "subType": 6, "period": 0, "goal": 1, "reward": 1e3, "conditional": null, "value": "7", "valueTwo": "60", "tier": 3 }, { "id": 14, "loc_ref": "chlg_kill_timePlayed_ten", "type": 0, "subType": 6, "period": 0, "goal": 1, "reward": 2500, "conditional": null, "value": "10", "valueTwo": "60", "tier": 3 }, { "id": 15, "loc_ref": "chlg_kill_con_kill_one_shot", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 100, "conditional": 11, "value": "1", "valueTwo": "1", "tier": 1 }, { "id": 16, "loc_ref": "chlg_kill_con_kill_hp_ten", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 500, "conditional": 12, "value": "1", "valueTwo": "10", "tier": 1 }, { "id": 17, "loc_ref": "chlg_kill_con_kill_five_streak", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 1e3, "conditional": 0, "value": "0", "valueTwo": "5", "tier": 2 }, { "id": 18, "loc_ref": "chlg_kill_con_kill_ten_streak", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 2500, "conditional": 0, "value": "0", "valueTwo": "10", "tier": 3 }, { "id": 19, "loc_ref": "chlg_kill_con_kill_scoped", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 200, "conditional": 13, "value": null, "valueTwo": null, "tier": 2 }, { "id": 20, "loc_ref": "chlg_kill_con_two_kills_one_shot", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 200, "conditional": 16, "value": "2", "valueTwo": null, "tier": 2 }, { "id": 21, "loc_ref": "chlg_kill_con_reloading", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 100, "conditional": 17, "value": null, "valueTwo": null, "tier": 1 }, { "id": 22, "loc_ref": "chlg_kill_con_kill_scoped_melee", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 200, "conditional": 13, "value": null, "valueTwo": "9", "tier": 2 }, { "id": 23, "loc_ref": "chlg_kill_con_kill_two_grenade", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 200, "conditional": 16, "value": "2", "valueTwo": "8", "tier": 2 }, { "id": 24, "loc_ref": "chlg_kill_con_kill_three_grenade", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 1e3, "conditional": 16, "value": "3", "valueTwo": "8", "tier": 3 }, { "id": 25, "loc_ref": "chlg_kill_con_kill_two_rpegg", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 200, "conditional": 16, "value": "2", "valueTwo": "4", "tier": 2 }, { "id": 26, "loc_ref": "chlg_kill_con_kill_three_rpegg", "type": 0, "subType": 8, "period": 0, "goal": 1, "reward": 1e3, "conditional": 16, "value": "3", "valueTwo": "4", "tier": 3 }, { "id": 27, "loc_ref": "chlg_kill_weaponType_Cluck9mm_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 200, "conditional": null, "value": null, "valueTwo": "3", "tier": 1 }, { "id": 28, "loc_ref": "chlg_kill_weaponType_Cluck9mm_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 500, "conditional": null, "value": null, "valueTwo": "3", "tier": 1 }, { "id": 29, "loc_ref": "chlg_kill_weaponType_Cluck9mm_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "3", "tier": 2 }, { "id": 30, "loc_ref": "chlg_kill_weaponType_Cluck9mm_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 2500, "conditional": null, "value": null, "valueTwo": "3", "tier": 3 }, { "id": 31, "loc_ref": "chlg_kill_weaponType_Scrambler_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 100, "conditional": null, "value": null, "valueTwo": "1", "tier": 1 }, { "id": 32, "loc_ref": "chlg_kill_weaponType_Scrambler_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 200, "conditional": null, "value": null, "valueTwo": "1", "tier": 1 }, { "id": 33, "loc_ref": "chlg_kill_weaponType_Scrambler_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 500, "conditional": null, "value": null, "valueTwo": "1", "tier": 2 }, { "id": 34, "loc_ref": "chlg_kill_weaponType_Scrambler_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "1", "tier": 3 }, { "id": 35, "loc_ref": "chlg_kill_weaponType_Rpegg_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 100, "conditional": null, "value": null, "valueTwo": "4", "tier": 2 }, { "id": 36, "loc_ref": "chlg_kill_weaponType_Rpegg_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 200, "conditional": null, "value": null, "valueTwo": "4", "tier": 2 }, { "id": 37, "loc_ref": "chlg_kill_weaponType_Rpegg_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 500, "conditional": null, "value": null, "valueTwo": "4", "tier": 2 }, { "id": 38, "loc_ref": "chlg_kill_weaponType_Rpegg_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "4", "tier": 3 }, { "id": 39, "loc_ref": "chlg_kill_weaponType_Whipper_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 100, "conditional": null, "value": null, "valueTwo": "5", "tier": 1 }, { "id": 40, "loc_ref": "chlg_kill_weaponType_Whipper_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 200, "conditional": null, "value": null, "valueTwo": "5", "tier": 1 }, { "id": 41, "loc_ref": "chlg_kill_weaponType_Whipper_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 500, "conditional": null, "value": null, "valueTwo": "5", "tier": 2 }, { "id": 42, "loc_ref": "chlg_kill_weaponType_Whipper_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "5", "tier": 3 }, { "id": 43, "loc_ref": "chlg_kill_weaponType_Eggk47_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 100, "conditional": null, "value": null, "valueTwo": "0", "tier": 0 }, { "id": 44, "loc_ref": "chlg_kill_weaponType_Eggk47_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 200, "conditional": null, "value": null, "valueTwo": "0", "tier": 1 }, { "id": 45, "loc_ref": "chlg_kill_weaponType_Eggk47_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 500, "conditional": null, "value": null, "valueTwo": "0", "tier": 2 }, { "id": 46, "loc_ref": "chlg_kill_weaponType_Eggk47_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "0", "tier": 3 }, { "id": 47, "loc_ref": "chlg_kill_weaponType_FreeRanger_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 100, "conditional": null, "value": null, "valueTwo": "2", "tier": 1 }, { "id": 48, "loc_ref": "chlg_kill_weaponType_FreeRanger_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 200, "conditional": null, "value": null, "valueTwo": "2", "tier": 1 }, { "id": 49, "loc_ref": "chlg_kill_weaponType_FreeRanger_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 500, "conditional": null, "value": null, "valueTwo": "2", "tier": 2 }, { "id": 50, "loc_ref": "chlg_kill_weaponType_FreeRanger_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "2", "tier": 3 }, { "id": 51, "loc_ref": "chlg_kill_weaponType_Crackshot_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 100, "conditional": null, "value": null, "valueTwo": "6", "tier": 1 }, { "id": 52, "loc_ref": "chlg_kill_weaponType_Crackshot_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 200, "conditional": null, "value": null, "valueTwo": "6", "tier": 1 }, { "id": 53, "loc_ref": "chlg_kill_weaponType_Crackshot_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 500, "conditional": null, "value": null, "valueTwo": "6", "tier": 2 }, { "id": 54, "loc_ref": "chlg_kill_weaponType_Crackshot_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "6", "tier": 3 }, { "id": 55, "loc_ref": "chlg_kill_weaponType_TriHard_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 100, "conditional": null, "value": null, "valueTwo": "7", "tier": 1 }, { "id": 56, "loc_ref": "chlg_kill_weaponType_TriHard_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 200, "conditional": null, "value": null, "valueTwo": "7", "tier": 1 }, { "id": 57, "loc_ref": "chlg_kill_weaponType_TriHard_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 500, "conditional": null, "value": null, "valueTwo": "7", "tier": 2 }, { "id": 58, "loc_ref": "chlg_kill_weaponType_TriHard_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "7", "tier": 3 }, { "id": 59, "loc_ref": "chlg_kill_weaponType_Melee_five", "type": 0, "subType": 1, "period": 0, "goal": 5, "reward": 200, "conditional": null, "value": null, "valueTwo": "9", "tier": 2 }, { "id": 60, "loc_ref": "chlg_kill_weaponType_Melee_ten", "type": 0, "subType": 1, "period": 0, "goal": 10, "reward": 500, "conditional": null, "value": null, "valueTwo": "9", "tier": 2 }, { "id": 61, "loc_ref": "chlg_kill_weaponType_Melee_twenty", "type": 0, "subType": 1, "period": 0, "goal": 20, "reward": 1e3, "conditional": null, "value": null, "valueTwo": "9", "tier": 3 }, { "id": 62, "loc_ref": "chlg_kill_weaponType_Melee_fifty", "type": 0, "subType": 1, "period": 0, "goal": 50, "reward": 2500, "conditional": null, "value": null, "valueTwo": "9", "tier": 3 }, { "id": 63, "loc_ref": "chlg_damage_five_hundred", "type": 1, "subType": null, "period": 0, "goal": 500, "reward": 100, "conditional": null, "value": null, "valueTwo": null, "tier": 0 }, { "id": 64, "loc_ref": "chlg_damage_one_thousand", "type": 1, "subType": null, "period": 0, "goal": 1e3, "reward": 100, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 65, "loc_ref": "chlg_damage_twenty_five_hundred", "type": 1, "subType": null, "period": 0, "goal": 2500, "reward": 200, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 66, "loc_ref": "chlg_damage_five_thousand", "type": 1, "subType": null, "period": 0, "goal": 5e3, "reward": 500, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 67, "loc_ref": "chlg_damage_ten_thousand", "type": 1, "subType": null, "period": 0, "goal": 1e4, "reward": 1e3, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 68, "loc_ref": "chlg_damage_twenty_five_thousand", "type": 1, "subType": null, "period": 0, "goal": 25e3, "reward": 2500, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 69, "loc_ref": "chlg_deaths_ten", "type": 2, "subType": null, "period": 0, "goal": 10, "reward": 100, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 70, "loc_ref": "chlg_deaths_twenty", "type": 2, "subType": null, "period": 0, "goal": 20, "reward": 200, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 71, "loc_ref": "chlg_deaths_fifty", "type": 2, "subType": null, "period": 0, "goal": 50, "reward": 500, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 72, "loc_ref": "chlg_movement_distance_five_hunderd", "type": 3, "subType": 3, "period": 0, "goal": 500, "reward": 100, "conditional": null, "value": null, "valueTwo": null, "tier": 0 }, { "id": 73, "loc_ref": "chlg_movement_distance_one_thousand", "type": 3, "subType": 3, "period": 0, "goal": 1e3, "reward": 500, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 74, "loc_ref": "chlg_movement_distance_five_thousand", "type": 3, "subType": 3, "period": 0, "goal": 5e3, "reward": 2500, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 75, "loc_ref": "chlg_movement_jump_one_hundred", "type": 3, "subType": 4, "period": 0, "goal": 100, "reward": 100, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 76, "loc_ref": "chlg_movement_jump_five_hundred", "type": 3, "subType": 4, "period": 0, "goal": 500, "reward": 500, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 77, "loc_ref": "chlg_kill_jump_one", "type": 0, "subType": 4, "period": 0, "goal": 1, "reward": 200, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 78, "loc_ref": "chlg_kill_jump_five", "type": 0, "subType": 4, "period": 0, "goal": 5, "reward": 1e3, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 79, "loc_ref": "chlg_kill_jump_victim_jump", "type": 0, "subType": 4, "period": 0, "goal": 1, "reward": 2500, "conditional": 4, "value": null, "valueTwo": null, "tier": 3 }, { "id": 80, "loc_ref": "chlg_movement_collect_ammo_ten", "type": 4, "subType": 18, "period": 0, "goal": 10, "reward": 100, "conditional": 16, "value": "0", "valueTwo": null, "tier": 1 }, { "id": 81, "loc_ref": "chlg_movement_collect_ammo_twenty_five", "type": 4, "subType": 18, "period": 0, "goal": 25, "reward": 500, "conditional": 16, "value": "0", "valueTwo": null, "tier": 2 }, { "id": 82, "loc_ref": "chlg_movement_collect_ammo_fifty", "type": 4, "subType": 18, "period": 0, "goal": 50, "reward": 1e3, "conditional": 16, "value": "0", "valueTwo": null, "tier": 3 }, { "id": 83, "loc_ref": "chlg_movement_collect_grenade_ten", "type": 4, "subType": 18, "period": 0, "goal": 10, "reward": 100, "conditional": 17, "value": "1", "valueTwo": null, "tier": 1 }, { "id": 84, "loc_ref": "chlg_movement_collect_grenade_twenty_five", "type": 4, "subType": 18, "period": 0, "goal": 25, "reward": 500, "conditional": 17, "value": "1", "valueTwo": null, "tier": 2 }, { "id": 85, "loc_ref": "chlg_movement_collect_grenade_fifty", "type": 4, "subType": 18, "period": 0, "goal": 50, "reward": 1e3, "conditional": 17, "value": "1", "valueTwo": null, "tier": 3 }, { "id": 86, "loc_ref": "chlg_timed_timeAlive_thirty", "type": 5, "subType": 7, "period": 0, "goal": 1, "reward": 100, "conditional": 7, "value": "30", "valueTwo": null, "tier": 1 }, { "id": 87, "loc_ref": "chlg_timed_timeAlive_sixty", "type": 5, "subType": 7, "period": 0, "goal": 1, "reward": 200, "conditional": 7, "value": "60", "valueTwo": null, "tier": 2 }, { "id": 88, "loc_ref": "chlg_timed_timeAlive_three_hundred", "type": 5, "subType": 7, "period": 0, "goal": 1, "reward": 2500, "conditional": 7, "value": "300", "valueTwo": null, "tier": 3 }, { "id": 90, "loc_ref": "chlg_timed_timePlayed_three_hundred", "type": 5, "subType": 6, "period": 0, "goal": 300, "reward": 200, "conditional": 6, "value": "300", "valueTwo": null, "tier": 0 }, { "id": 91, "loc_ref": "chlg_timed_timePlayed_nine_hundred", "type": 5, "subType": 6, "period": 0, "goal": 900, "reward": 500, "conditional": 6, "value": "900", "valueTwo": null, "tier": 1 }, { "id": 92, "loc_ref": "chlg_timed_timePlayed_eighteen_hundred", "type": 5, "subType": 6, "period": 0, "goal": 1800, "reward": 1e3, "conditional": 6, "value": "1800", "valueTwo": null, "tier": 2 }, { "id": 93, "loc_ref": "chlg_timed_timePlayed_thirty_six_hundred", "type": 5, "subType": 6, "period": 0, "goal": 3600, "reward": 2500, "conditional": 6, "value": "3600", "valueTwo": null, "tier": 3 }, { "id": 94, "loc_ref": "chlg_kotc_capturing_timeAlive_twenty", "type": 6, "subType": 20, "period": 0, "goal": 1, "reward": 100, "conditional": 7, "value": "10", "valueTwo": null, "tier": 1 }, { "id": 95, "loc_ref": "chlg_kotc_capture", "type": 6, "subType": 21, "period": 0, "goal": 1, "reward": 100, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 96, "loc_ref": "chlg_kotc_win_one", "type": 6, "subType": 23, "period": 0, "goal": 1, "reward": 200, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 97, "loc_ref": "chlg_kotc_win_three", "type": 6, "subType": 23, "period": 0, "goal": 3, "reward": 500, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 98, "loc_ref": "chlg_kotc_win_five", "type": 6, "subType": 23, "period": 0, "goal": 5, "reward": 1e3, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 99, "loc_ref": "chlg_kotc_win_ten", "type": 6, "subType": 23, "period": 0, "goal": 10, "reward": 2500, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 100, "loc_ref": "chlg_kotc_coop_kill", "type": 6, "subType": 20, "period": 0, "goal": 1, "reward": 200, "conditional": 10, "value": null, "valueTwo": null, "tier": 1 }, { "id": 101, "loc_ref": "chlg_kotc_coop_kill_victim_capturing", "type": 6, "subType": 20, "period": 0, "goal": 1, "reward": 200, "conditional": 10, "value": "18", "valueTwo": null, "tier": 1 }, { "id": 102, "loc_ref": "chlg_cts_pick_up", "type": 7, "subType": 21, "period": 0, "goal": 1, "reward": 200, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 103, "loc_ref": "chlg_cts_capture_timeAlive_thirty", "type": 7, "subType": 21, "period": 0, "goal": 1, "reward": 500, "conditional": 7, "value": "30", "valueTwo": null, "tier": 2 }, { "id": 104, "loc_ref": "chlg_cts_win_ten", "type": 7, "subType": 23, "period": 0, "goal": 20, "reward": 1e3, "conditional": null, "value": null, "valueTwo": null, "tier": 1 }, { "id": 105, "loc_ref": "chlg_cts_win_twenty_five", "type": 7, "subType": 23, "period": 0, "goal": 50, "reward": 4e3, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 106, "loc_ref": "chlg_cts_win_fifty", "type": 7, "subType": 23, "period": 0, "goal": 100, "reward": 1e4, "conditional": null, "value": null, "valueTwo": null, "tier": 3 }, { "id": 107, "loc_ref": "chlg_cts_kills_victim_spatula", "type": 7, "subType": 10, "period": 0, "goal": 1, "reward": 200, "conditional": null, "value": null, "valueTwo": null, "tier": 2 }, { "id": 108, "loc_ref": "chlg_cts_kills_killstreak_five", "type": 7, "subType": 10, "period": 0, "goal": 1, "reward": 500, "conditional": 0, "value": "5", "valueTwo": null, "tier": 3 }];
  Date.prototype.toDatetimeLocal = function toDatetimeLocal() {
    var date = this, ten = function(i2) {
      return (i2 < 10 ? "0" : "") + i2;
    }, YYYY = date.getFullYear(), MM = ten(date.getMonth() + 1), DD = ten(date.getDate()), HH = ten(date.getHours()), II = ten(date.getMinutes()), SS = ten(date.getSeconds());
    return YYYY + "-" + MM + "-" + DD + "T" + HH + ":" + II + ":" + SS;
  };
  function twoDigits(d) {
    if (0 <= d && d < 10) return "0" + d.toString();
    if (-10 < d && d < 0) return "-0" + (-1 * d).toString();
    return d.toString();
  }
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
  var newsItems = [];
  var shellYouTube = [];
  var announcementMessage = "";
  var refundReasons = [];
  var adminKey;
  var skus = [
    ["egg_pack_small", "Pile of eggs"],
    ["item_hat_galeggsy", "Galeggsy Wings"],
    ["egg_pack_medium", "Basket of eggs"],
    ["egg_pack_large", "Big Box of eggs"],
    ["egg_pack_giant", "Cluckton of eggs"],
    //['item_gun_m24_techno', 'Untz Gun'],
    ["item_hat_yolk_arms", "Yolk Arms"],
    ["item_hat_cape", "Cape Hat"],
    ["item_hat_dragon", "Dragon Hat"],
    ["item_hat_space_gladi", "Space Gladiator"],
    ["item_hat_zombie_mask", "Zombie Hat"],
    ["item_gun_9mm_space", "Space Cluck9mm"],
    ["item_hat_oni", "Oni Hat"],
    ["item_gun_csg1_space", "Space CSG1"],
    ["item_gun_9mm_techno", "Cluck 9mm Techno"],
    ["item_gun_smg_techno", "SMG Techno (Tuh gun)"],
    ["item_hat_demon_wings", "Demon wings"],
    ["gun_gauge_techno", "Badoosh Gun"],
    ["item_hat_fallen_wing", "Fallen Wings"],
    ["item_gun_csg1_techno", "CSG1 Catz"],
    ["item_hat_chrome_wing", "Chrome Wings"],
    ["gun_eggk47_techno", "Eggk Poggers"],
    ["item_hat_steamWings", "Steampunk Wings"],
    ["item_gun_rpeggTechno", "RPEGG Techno"],
    ["item_gun_retro_9mm", "Retro Cluck9mm"],
    ["hat_premium_PixelAngel", "Pixel Angel Wings"],
    ["item_gun_aug_retro", "Retro TriHard"],
    ["item_hat_robot_wings", "Robot Pixel Wings"]
  ];
  var SOCIALMEDIA = [
    "Facebook",
    "Instagram",
    "TikTok",
    "Discord",
    "YouTube",
    "Twitter",
    "Twitch"
  ];
  var newsColums = [
    "",
    "active",
    "label",
    "link",
    "linksToTaggedItems",
    "linksToItemId",
    "linksToPass",
    "linksToPhotoBooth",
    "linksToVipStore",
    "linksToEggStoreItem",
    "image"
  ];
  var adNewsColumns = [
    "",
    "active",
    "weighted",
    "hideOnCG",
    "label",
    "link",
    "linkToShop",
    "linksToTaggedItems",
    "linksToItemId",
    "linksToPass",
    "linksToPhotoBooth",
    "linksToVipStore",
    "linkToChw",
    "linkToBlackFriday",
    "linkToEggOrg",
    "linkToTwitch",
    "linksToCreateGame",
    "image"
  ];
  initSettings();
  var settings = localStorage.getItem("feedbackAdminSettings");
  if (settings) {
    settings = JSON.parse(settings);
    inboxListOpts = settings.inboxListOpts;
  }
  function initSettings() {
    inboxListOpts = {
      match: {
        status: {
          open: true,
          active: true
        },
        feedback_type: {},
        admin_id: null
      },
      order: { status: "asc" },
      limit: { start: 0, count: 25 }
    };
  }
  window.onunload = function() {
    inboxListOpts.limit.start = 0;
    localStorage.setItem("feedbackAdminSettings", JSON.stringify({ inboxListOpts }));
  };
  window.onload = function() {
    showSpinner();
    if (firebase) login((user) => {
      user.getIdToken(true).then((idToken) => authorize(idToken));
    }, loginFail);
    var keys = {};
    window.onkeydown = function(e) {
      if (keys[e.code]) return;
      keys[e.code] = true;
      if (currentTab && currentTab.onKeyPress) {
        currentTab.onKeyPress(e.code);
      }
    };
    window.onkeyup = function(e) {
      keys[e.code] = false;
    };
    window.onmousemove = function(e) {
      mouse.x = e.x;
      mouse.y = e.y;
    };
  };
  function login(success, fail) {
    var config = {
      apiKey: "AIzaSyDP4SIjKaw6A4c-zvfYxICpbEjn1rRnN50",
      authDomain: "shellshockio-181719.firebaseapp.com",
      databaseURL: "https://shellshockio-181719.firebaseio.com",
      projectId: "shellshockio-181719",
      storageBucket: "shellshockio-181719.appspot.com",
      messagingSenderId: "68327206324"
    };
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log("Login auth provider: " + user.providerData[0].providerId);
        if (!user.emailVerified && user.providerData[0].providerId == "password") {
          console.log("email not yet verified");
          return;
        }
        console.log("calling loggedIn from firebase.auth().onAuthStateChanged callback");
        success(user);
      } else {
        fail();
      }
    });
  }
  function loginFail() {
    console.log(window.error);
    alert("HI!");
  }
  function authorize() {
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      console.log("Using services server: wss://" + window.location.hostname + "/services/");
      try {
        ws = new WebSocket("wss://" + window.location.hostname + "/services/");
      } catch (e) {
        ws = new WebSocket("ws://" + window.location.hostname + "/services/");
        console.log(e);
      }
      ws.onopen = function(e) {
        console.log("authorizing");
        ws.send(JSON.stringify({
          cmd: "authAdmin",
          token: idToken
        }));
        setInterval(() => {
          ws.send(JSON.stringify({ cmd: "ping" }));
        }, 15e3);
      };
      ws.onmessage = function(e) {
        var data = JSON.parse(e.data);
        if (!data.pong) console.log(data);
        if (data.authorized !== void 0) {
          if (data.authorized == true) {
            console.log("authorized");
            adminKey = data.key;
            loggedIn(data);
          } else {
            console.log("not authorized!");
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
      ws.onclose = function(e) {
        switch (e.code) {
          case 4100:
            document.body.innerHTML = "Hey! You're not an admin!";
            break;
          default:
            document.body.innerHTML = "Connection lost for SOME REASON";
            break;
        }
      };
      ws.onerror = function(e) {
        console.log("error: " + JSON.stringify(e, ["message", "arguments", "type", "name"]));
      };
    });
  }
  function loggedIn(data) {
    var user = firebase.auth().currentUser;
    profile.id = data.id;
    profile.playerId = data.player_id;
    profile.name = data.name || user.displayName || "An admin has no name";
    profile.email = data.email || user.email || "An admin has no email";
    profile.roles = data.roles || 0;
    docEl = document.getElementById("doc");
    headerEl = document.getElementById("header");
    headerEl.style.display = "block";
    var responses = 0;
    requestAction("getAdmins", {}, (data2) => {
      for (var i2 in data2.rows) {
        var row = data2.rows[i2];
        admins[row.player_id] = data2.rows[i2];
      }
      response();
      if (profile.roles & AdminRole.Announce) openAnnouncementTab();
      if (profile.roles & AdminRole.Ads) openAdsTab();
      if (profile.roles & AdminRole.Media) openMediaTab();
      if (profile.roles & AdminRole.Settings) openSettingsTab();
      if (profile.roles & AdminRole.Players) openPlayersTab();
      if (profile.roles & AdminRole.Refunds) openRefunds();
      if (profile.roles & AdminRole.Badguys) openBadguysTab();
      if (profile.roles & AdminRole.BanAdmin) openBansTab();
      if (profile.roles & AdminRole.ManageAdmins) openAdminsTab();
      if (profile.roles & AdminRole.Twitch) openTwitchTab();
    });
    requestAction("getItems", {}, (data2) => {
      for (var i2 in data2.rows) {
        var row = data2.rows[i2];
        items[row.id] = data2.rows[i2];
      }
      response();
    });
    requestAction("getProducts", {}, (data2) => {
      for (var i2 in data2.rows) {
        var row = data2.rows[i2];
        products[row.id] = data2.rows[i2];
      }
      response();
    });
    requestAction("getRefundResponses", {}, (data2) => {
      data2.rows.forEach((el) => refundReasons.push(el));
      response();
    });
    function response() {
      responses++;
      console.log("responses: " + responses);
      if (responses >= 4) {
        if (profile.roles & AdminRole.Feedback) openInbox();
        handleQueryString();
      }
    }
    if (user.photoURL) {
      var url = user.photoURL;
      var pd = user.providerData[0];
      if (pd.providerId == "facebook.com") {
        url = "https://graph.facebook.com/" + pd.uid + "/picture";
      }
      document.getElementById("profilePic").src = url;
      document.getElementById("profilePic").style.display = "block";
    }
    document.getElementById("profileName").innerText = profile.name;
  }
  function handleQueryString() {
    if (window.location.search.length > 0) {
      var opts = window.location.search.slice(1).split("&");
      for (var o in opts) {
        var opt = opts[o].split("=");
        var key = opt[0];
        var val = opt[1];
        if (key !== void 0 && val !== void 0) {
          switch (key) {
            case "ticket":
              if (profile.roles & AdminRole.Players) {
                openTicket(parseInt(val, 10));
              }
              break;
            case "playerId":
              if (profile.roles & AdminRole.Players) {
                openPlayerDataFromPlayerId(val);
              }
              break;
          }
        }
      }
    }
  }
  function requestAction(action, data, callback) {
    showSpinner();
    data.cmd = "admin";
    actionId = ++actionId % 1e4;
    data.action = action;
    data.actionId = actionId;
    console.log("Sending to Services:", data);
    ws.send(JSON.stringify(data));
    if (callback) {
      pendingActionCallbacks[actionId] = callback;
    }
  }
  function openDialog(header2) {
    var el = document.getElementById("dialog");
    el.style.display = "block";
    var d = document.getElementById("dialogContent");
    addHeader(d, header2);
    return d;
  }
  function closeDialog() {
    var el = document.getElementById("dialog");
    el.style.display = "none";
    var d = document.getElementById("dialogContent");
    while (d.firstChild) {
      d.removeChild(d.firstChild);
    }
  }
  function createTable(rows, columnFilter, rowFunc, cellFunc, colFunc, id) {
    var table = document.createElement("table");
    if (id) table.id = id;
    var keys;
    if (columnFilter) {
      keys = [];
      for (var i2 in columnFilter) {
        keys.push(columnFilter[i2]);
      }
    } else {
      var keysObj = {};
      for (var i2 in rows) {
        Object.keys(rows[i2]).forEach((k) => {
          keysObj[k] = true;
        });
      }
      keys = Object.keys(keysObj);
    }
    var thead = document.createElement("thead");
    table.appendChild(thead);
    var tr = document.createElement("tr");
    thead.appendChild(tr);
    keys.forEach((k) => {
      var th = document.createElement("th");
      tr.appendChild(th);
      th.innerText = k;
      th.label = k;
      if (colFunc) colFunc(th);
    });
    for (var row in rows) {
      parseRow(rows[row]);
      var tr = document.createElement("tr");
      tr.rowIdx = row;
      table.appendChild(tr);
      if (rowFunc) rowFunc(rows[row], tr, row);
      keys.forEach((k) => {
        var td = document.createElement("td");
        td.key = k;
        td.rowIdx = row;
        tr.appendChild(td);
        td.innerText = rows[row][k];
        if (cellFunc) cellFunc(k, td, rows[row]);
      });
    }
    return table;
  }
  function popupList(items2, callback) {
    var container = document.createElement("div");
    container.className = "popupListContainer";
    var x = event.x;
    var y = event.y;
    container.onmouseleave = () => {
      document.body.removeChild(container);
    };
    for (var i2 in items2) {
      var row = addRow(container, "selectRow");
      row.innerText = items2[i2];
      row.onclick = /* @__PURE__ */ function(idx) {
        return () => {
          document.body.removeChild(container);
          callback(idx);
        };
      }(i2);
    }
    document.body.appendChild(container);
    var rect = container.getBoundingClientRect();
    if (x < 32) x = 32;
    if (x + rect.width - 32 > window.innerWidth) x = window.innerWidth - rect.width + 32;
    if (y < 24) y = 24;
    if (y + rect.height - 24 > window.innerHeight) y = window.innerHeight - rect.height + 24;
    container.style.left = x - 32 + "px";
    container.style.top = y - 24 + "px";
    return container;
  }
  function localTime(date) {
    var tz = new Date(date);
    var ms = Date.parse(date);
    ms -= tz.getTimezoneOffset() * 60 * 1e3;
    var adjDate = new Date(ms);
    return adjDate.toLocaleString("en-US");
  }
  function fitToContent(input) {
    var context = document.getElementById("textWidthTester").getContext("2d");
    context.font = '1em "Open Sans", sans-serif';
    var width = Math.max(context.measureText(input.value).width, 20);
    input.style.width = width + "px";
  }
  function getRequest(url, callback) {
    var req = new XMLHttpRequest();
    if (!req) {
      return false;
    }
    if (typeof callback != "function") callback = function() {
    };
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        return req.status === 200 ? callback(null, req.responseText) : callback(req.status, null);
      }
    };
    req.open("GET", url, true);
    req.send(null);
    return req;
  }
  function openFileHelper(callback, extensions) {
    var e = document.getElementById("openHelper");
    e.value = "";
    e.accept = extensions || "";
    e.onchange = (event2) => {
      var file = event2.target.files[0];
      callback(file);
    };
    e.click();
  }
  function openBinaryUploader(callback, extensions) {
    closeDialog();
    openFileHelper((file) => {
      var reader = new FileReader();
      reader.onload = function() {
        callback({
          ext: file.name.match(/\.[0-9a-z]+$/i)[0],
          data: reader.result
        });
      };
      reader.readAsDataURL(file);
    }, extensions);
  }
  var bc = new BroadcastChannel("ShellShockersAdmin");
  bc.onmessage = (e) => {
    let msg = e.data;
    switch (msg.cmd) {
      case "getPlayer":
        openPlayerDataFromPlayerId(msg.id, msg.ip);
        break;
    }
  };
  var adminData;
  var RoleDescription = {
    ManageAdmins: "<b><i>Add/Remove admins and change their permissions</i></b>",
    Boot: "Boot players from within private games",
    GameBan: "Ban players from within public and private games",
    Feedback: "Access Feedback on the Admin page",
    Announce: "Manage Announcements on the Admin page",
    Ads: "Manage Ads on the Admin page",
    Players: "Access the Players tab and manage player data on the Admin page",
    Refunds: "Manage Refunds on the Admin page",
    Settings: "Manage Settings on the Admin page",
    Media: "Manage Media on the Admin page",
    Badguys: "Access the Badguys tab on the Admin page",
    Items: "Access Item and Product data",
    Bots: "Launch Bots from within games",
    BanAdmin: "Add/lift IP and Player bans"
  };
  function openAdminsTab() {
    addTab("Admins", false, renderAdmins);
  }
  function renderAdmins(page) {
    fetchAdmins((data) => {
      finishRenderAdmins(page, data);
    });
  }
  function fetchAdmins(callback) {
    requestAction("getAdmins", {}, (data) => {
      hideSpinner();
      adminData = {};
      data.rows.forEach((row) => {
        adminData[row.player_id] = row;
        adminData[row.player_id].updated = false;
      });
      callback(data.rows);
    });
  }
  function finishRenderAdmins(page, data) {
    addButton(page, "New Admin", "green", () => {
      let submission = {
        player_id: 0,
        name: "",
        email: "",
        roles: 0
      };
      let checkboxes = {};
      let d = openDialog("New Admin");
      let row = addRow(d);
      var col = addCol(row);
      var idIn = addInput(addRow(col), "player id");
      var nameIn = addInput(addRow(col), "name");
      var emailIn = addInput(addRow(col), "email");
      idIn.size = 80;
      nameIn.size = 80;
      emailIn.size = 80;
      idIn.oninput = () => {
        submission.player_id = parseInt(idIn.value, 10);
        fitToContent(idIn);
      };
      nameIn.oninput = () => {
        submission.name = nameIn.value;
        fitToContent(nameIn);
      };
      emailIn.oninput = () => {
        submission.email = emailIn.value;
        fitToContent(emailIn);
      };
      addCol(row, "colBreakLg");
      col = addCol(row);
      Object.keys(AdminRole).forEach((key) => {
        let line = addRow(col);
        var c = addCol(line);
        c.style.width = "200px";
        let checkbox = addCheckbox(c, key);
        checkboxes[key] = checkbox;
        c = addCol(line);
        c.innerHTML = RoleDescription[key];
      });
      lineBreak(d);
      let buttons = addRow(d);
      addButton(buttons, "Save", "green", () => {
        Object.keys(checkboxes).forEach((key) => {
          if (checkboxes[key].checked) {
            submission.roles |= AdminRole[key];
          }
        });
        requestAction("addAdmin", submission, () => {
          hideSpinner();
          markDirty("Admins", true);
        });
        closeDialog();
      });
      addButton(buttons, "Cancel", "red", () => {
        closeDialog();
      });
    });
    var list = addRow(page);
    var table = createTable(data, ["", "player_id", "name", "email", "roles"], null, cellFunc, null);
    list.appendChild(table);
    function cellFunc(key, td, row) {
      switch (key) {
        case "":
          if (!row.player_id) break;
          var btn = document.createElement("div");
          btn.className = "roundButton removeButton";
          btn.onclick = () => {
            let d = openDialog("Delete Admin");
            addSmallHeader(d).innerText = row.name;
            lineBreak(d);
            addRow(d).innerText = "Are you sure you want to delete this admin?";
            lineBreak(d);
            var buttons = addRow(d);
            addButton(buttons, "Yes", "red", () => {
              requestAction("deleteAdmin", { player_id: row.player_id }, () => {
                hideSpinner();
                markDirty("Admins", true);
              });
              closeDialog();
            });
            addButton(buttons, "No", "green", closeDialog);
          };
          td.innerText = "";
          td.appendChild(btn);
          break;
        case "roles":
          let num = td.innerText;
          if (num === "") {
            num = "0x0000";
          } else {
            num = "0x" + parseInt(num).toString(16).toUpperCase();
            td.innerText = num;
            td.style.cursor = "pointer";
          }
          td.onclick = () => {
            let d = openDialog("Roles for " + row.name);
            Object.keys(AdminRole).forEach((key2) => {
              let line = addRow(d);
              var col = addCol(line);
              col.style.width = "200px";
              let checkbox = addCheckbox(col, key2, () => {
                if (checkbox.checked) {
                  row.roles |= AdminRole[key2];
                } else {
                  row.roles &= ~AdminRole[key2];
                }
                adminData[row.player_id].roles = row.roles;
                adminData[row.player_id].updated = true;
              });
              col = addCol(line);
              col.innerHTML = RoleDescription[key2];
              checkbox.checked = (row.roles & AdminRole[key2]) !== 0;
            });
            lineBreak(d);
            var buttons = addRow(d);
            addButton(buttons, "Apply", "red", () => {
              Object.keys(adminData).forEach((key2) => {
                let d2 = adminData[key2];
                if (d2.updated) {
                  let submission = {
                    player_id: d2.player_id,
                    name: d2.name,
                    email: d2.email,
                    roles: d2.roles
                  };
                  requestAction("updateAdminProfile", submission, () => {
                    hideSpinner();
                    markDirty("Admins", true);
                  });
                }
              });
              closeDialog();
            });
            addButton(buttons, "Cancel", "green", closeDialog);
          };
          break;
        case "player_id":
        case "name":
        case "email":
          td.innerHTML = "";
          var input = document.createElement("input");
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
  }
  var houseAds;
  function openAdsTab() {
    addTab("Ads", false, renderAds);
  }
  function renderAds(page) {
    fetchAds(() => {
      finishRenderAds(page);
    });
  }
  function fetchAds(callback) {
    getRequest("data/housePromo.json?" + Date.now(), (err, res) => {
      if (err) {
        houseAds = { big: [], small: [], bigBanner: [], shellLogo: [], houseAdPercentChance: 100, specialItemsTag: "", featuredSocialMedia: "", premFeatured: "", smHouseAds: [] };
      } else {
        houseAds = JSON.parse(res);
        if (houseAds.specialItemsTag === void 0) {
          houseAds.specialItemsTag = "";
        }
        if (houseAds.featuredSocialMedia === void 0) {
          houseAds.featuredSocialMedia = "";
        }
        if (houseAds.premFeatured === void 0) {
          houseAds.premFeatured = "";
        }
        if (houseAds.shellLogo === void 0) {
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
  function finishRenderAds(page) {
    const specialTagStuff = addRow(page, "admin-special-tag-stuff display-flex gap");
    var buttons = addRow(page, "admin-ads--save-buttons");
    var saveButton = addButton(buttons, "Save Changes", "green", save);
    var discardButton = addButton(buttons, "Discard", "red", () => {
      markDirty("Ads", true);
    });
    saveButton.disabled = true;
    discardButton.disabled = true;
    var specialItemsTag = addRow(page, "admin-ads--special-tags");
    var itemTag = addInput(specialItemsTag, "Special Items Tag", houseAds.specialItemsTag, null, (newVal) => {
      houseAds.specialItemsTag = newVal;
      change();
      markDirty("Ads", false);
    });
    var socialMediaIcon = addRow(page, "admin-social-media");
    const socialOptions = [
      ["Facebook", "Facebook"],
      ["Twitter", "Twitter"],
      ["Instagram", "Instagram"],
      ["tiktok", "TikTok"],
      ["discord", "Discord"],
      ["Steam", "Steam"],
      ["Twitch", "Twitch"]
    ];
    addSmallHeader(socialMediaIcon, "Select featured social media", "left");
    var socialIconSelect = addSelect("idisid", socialOptions, houseAds.featuredSocialMedia, (newVal) => {
      houseAds.featuredSocialMedia = newVal;
      change();
      markDirty("Ads", false);
    }, "Social media select");
    socialMediaIcon.appendChild(socialIconSelect);
    const PremFeatured = addRow(page, "admin-social-media");
    const premFeatOption = [
      ["premFeatOne", "premFeatOne"],
      ["premFeatTwo", "premFeatTwo"]
    ];
    addSmallHeader(PremFeatured, "Select Premium featured tags", "left");
    const premFeatSelect = addSelect("idisidisid", premFeatOption, houseAds.premFeatured, (newVal) => {
      houseAds.premFeatured = newVal;
      change();
      markDirty("Ads", false);
    }, "Premium featured tags");
    PremFeatured.appendChild(premFeatSelect);
    specialTagStuff.appendChild(specialItemsTag);
    specialTagStuff.appendChild(socialMediaIcon);
    specialTagStuff.appendChild(PremFeatured);
    if (!adNewsColumns.includes("linksToKotc")) {
      adNewsColumns.splice(9, 0, "linksToKotc");
    }
    function sortActiveAds(a, b2) {
      if (!a.active && b2.active) return 1;
      if (a.active && !b2.active) return -1;
    }
    houseAds.small.sort((a, b2) => sortActiveAds(a, b2));
    houseAds.big.sort((a, b2) => sortActiveAds(a, b2));
    houseAds.bigBanner.sort((a, b2) => sortActiveAds(a, b2));
    const adDiv = addDiv(page, "admin-ads-accordion", "accordion");
    const shellLogo = addRow(page, "admin-shell-logo");
    const shellLogoHeader = addSmallHeader(shellLogo, "Shell Logo(s)", "accordion-header");
    const shellLogoWrap = addDiv(shellLogo, "shell-logo-table", "hideme accordion-wrap");
    var shellLogoTable = createTable(houseAds.shellLogo, ["", "active", "label", "image"], null, cellFuncLogo, null);
    shellLogoWrap.appendChild(shellLogoTable);
    shellLogo.appendChild(shellLogoWrap);
    adDiv.appendChild(shellLogo);
    var list = addRow(page);
    var bigHeader = addSmallHeader(list, "800x600 popup on front page +", "accordion-header");
    var bigTableWrap = addDiv(list, "big-table", "hideme accordion-wrap");
    var bigTable = createTable(houseAds.big, adNewsColumns, null, cellFuncLarge, null);
    bigTableWrap.appendChild(bigTable);
    list.appendChild(bigTableWrap);
    adDiv.appendChild(list);
    var list = addRow(page);
    var bigTableWrap = addDiv(list, "sm-table", "hideme accordion-wrap");
    var smHeader = addSmallHeader(list, "House ads 300x250 +", "accordion-header");
    var smallTable = createTable(houseAds.small, adNewsColumns, null, cellFuncSmall, null);
    bigTableWrap.appendChild(smallTable);
    list.appendChild(bigTableWrap);
    adDiv.appendChild(list);
    var list = addRow(page);
    var bigTableWrap = addDiv(list, "banner-table", "hideme accordion-wrap");
    var bannerHeader = addSmallHeader(list, "728x90 or 970x250 banner for ad blockers +", "accordion-header");
    var largeBannerTable = createTable(houseAds.bigBanner, adNewsColumns, null, cellFuncBigBanner, null);
    bigTableWrap.appendChild(largeBannerTable);
    list.appendChild(bigTableWrap);
    adDiv.appendChild(list);
    function toggleTable(el, table) {
      const element = el.target ? el.target : el;
      let text;
      if (el.type === "click") {
        text = el.target.innerText;
      } else {
        text = el.innerText;
      }
      text.indexOf("+") > -1 ? element.innerText = text.replace("+", "-") : element.innerText = text.replace("-", "+");
      document.getElementById(table).classList.toggle("hideme");
    }
    bigHeader.onclick = (e) => toggleTable(e, "big-table");
    smHeader.onclick = (e) => toggleTable(e, "sm-table");
    bannerHeader.onclick = (e) => toggleTable(e, "banner-table");
    shellLogoHeader.onclick = (e) => toggleTable(e, "shell-logo-table");
    function cellFuncLogo(key, td) {
      cellFunc(key, td, houseAds.shellLogo);
    }
    function cellFuncLarge(key, td) {
      cellFunc(key, td, houseAds.big);
    }
    function cellFuncBigBanner(key, td) {
      cellFunc(key, td, houseAds.bigBanner);
    }
    function cellFuncSmall(key, td) {
      cellFunc(key, td, houseAds.small);
    }
    function cellFunc(key, td, category) {
      td.category = category;
      if (td.innerText === "undefined") td.innerText = "";
      if (key == "") {
        if (td.rowIdx < category.length - 1) {
          var btn = document.createElement("div");
          btn.className = "roundButton removeButton";
          btn.onclick = () => {
            delete category[td.rowIdx];
            td.parentElement.remove();
            change();
          };
          td.innerText = "";
          td.appendChild(btn);
        }
      } else if (key == "active" || key == "weighted") {
        td.innerText = "";
        td.style = "text-align: center";
        var check = addCheckbox(td);
        check.checked = category[td.rowIdx][key];
        check.onchange = () => {
          category[td.rowIdx][key] = check.checked;
          change();
        };
      } else if (key == "hideOnCG") {
        td.innerText = "";
        td.style = "text-align: center";
        var check = addCheckbox(td);
        check.checked = category[td.rowIdx].hideOnCG;
        check.onchange = () => {
          category[td.rowIdx].hideOnCG = check.checked;
          change();
        };
      } else if (key == "linksToEggStoreItem") {
        let sel = addSelect("products", skus, category[td.rowIdx][td.key]);
        sel.onchange = () => {
          category[td.rowIdx][td.key] = sel.options[sel.selectedIndex].value;
          change();
          changedLink(td);
        };
        td.innerText = "";
        td.appendChild(sel);
      } else if (key == "image") {
        var id = td.category[td.rowIdx].id;
        if (!id) {
          var img = document.createElement("img");
          img.src = "WHEE";
          img.className = "adThumbnail";
          img.onclick = () => {
            openImageUploader(img);
          };
          td.appendChild(img);
        } else {
          var img = document.createElement("img");
          img.src = "data/img/art/" + id + td.category[td.rowIdx].imageExt;
          img.className = "adThumbnail";
          img.onclick = () => {
            expandThumbnail(td.parentElement.children[2].firstChild.value, img);
          };
          td.appendChild(img);
        }
      } else {
        var crazyGame;
        const links = [];
        var input = document.createElement("input");
        var inputLabel;
        var cgLabel;
        if (key === "linkToShop") {
          input.type = "number";
          input.min = 2;
          input.max = 4;
        }
        if (key === "link") {
          td.className = "link";
          inputLabel = document.createElement("label");
          inputLabel.innerText = "Link: ";
          cgLabel = document.createElement("label");
          cgLabel.innerText = "CG: ";
          crazyGame = document.createElement("input");
          if (!Array.isArray(category[td.rowIdx][td.key])) {
            links.push(td.innerText);
            category[td.rowIdx][td.key] = links;
            input.value = td.innerText;
          } else {
            input.value = category[td.rowIdx][td.key][0];
            if (category[td.rowIdx][td.key].length > 0) {
              crazyGame.value = category[td.rowIdx][td.key][1] ? category[td.rowIdx][td.key][1] : "";
            }
          }
        } else {
          input.value = td.innerText;
        }
        if (key != "label") {
          if (key === "link") {
            input.oninput = () => {
              category[td.rowIdx][td.key][0] = input.value;
              changedLink(td);
              fitToContent(input);
            };
            input.className = key;
            crazyGame.oninput = () => {
              category[td.rowIdx][td.key][1] = crazyGame.value ? crazyGame.value : "";
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
        if (key === "linkToShop") {
          inputLabel = document.createElement("label");
          inputLabel.innerText = "2 = shop, 3 = featured, 4 = skins ";
        }
        td.innerText = "";
        if (crazyGame) {
          td.appendChild(inputLabel);
        }
        fitToContent(input);
        td.appendChild(input);
        if (key === "linkToShop") {
          td.appendChild(inputLabel);
        }
        if (crazyGame) {
          td.appendChild(cgLabel);
          fitToContent(input);
          td.appendChild(crazyGame);
        }
      }
    }
    function expandThumbnail(name, imgEl) {
      var d = openDialog(name);
      var row = addRow(d);
      addImage(row, imgEl.src);
      var buttons2 = addRow(d);
      addButton(buttons2, "Update", "green", () => {
        openImageUploader(imgEl);
      });
      addButton(buttons2, "Close", "red", () => {
        closeDialog();
      });
    }
    function openImageUploader(imgEl) {
      closeDialog();
      openBinaryUploader((res) => {
        var td = imgEl.parentElement;
        td.category[td.rowIdx].image = res.data;
        td.category[td.rowIdx].imageExt = res.ext;
        imgEl.src = res.data;
        change();
      }, ".png,.gif,.jpg,.jpeg,.svg");
    }
    function change() {
      saveButton.disabled = false;
      discardButton.disabled = false;
    }
    function changedLink(td) {
      var tr = td.parentElement;
      for (var i2 = 5; i2 < 18; i2++) {
        var cell = tr.children[i2];
        if (cell != td) {
          var el = cell.firstChild;
          if (cell.key === "link") {
            for (const child of cell.children) {
              if (child.tagName === "INPUT") {
                child.value = "";
              }
            }
            cell.category[cell.rowIdx][cell.key] = [];
          } else {
            if (el) {
              el.value = "";
              delete cell.category[cell.rowIdx][cell.key];
            }
          }
        }
      }
      saveButton.disabled = false;
      discardButton.disabled = false;
    }
    function save() {
      showSpinner();
      const openAcc = Array.from(document.querySelectorAll(".accordion-wrap"));
      requestAction("uploadAds", { ads: houseAds }, () => {
        hideSpinner();
        markDirty("Ads", true);
        setTimeout(() => {
          openAcc.forEach((el) => {
            if (!el.classList.contains("hideme")) {
              toggleTable(el.parentElement.firstChild, el.id);
            }
          });
        }, 200);
      });
    }
  }
  function openAnnouncementTab() {
    addTab("Announcement", false, renderAnnouncement);
  }
  function renderAnnouncement(page) {
    let ws2 = new WebSocket(`wss://${location.host}/matchmaker/`);
    ws2.onopen = () => {
      ws2.send('{ "command": "regionList" }');
    };
    ws2.onmessage = (e) => {
      let data = JSON.parse(e.data);
      switch (data.command) {
        case "regionList":
          hideSpinner();
          finishRenderAnnouncement(page, data.regionList);
          break;
        case "notice":
          announcementMessage = data.notices.announcement;
          break;
      }
    };
  }
  function finishRenderAnnouncement(page, regionList) {
    var el = addCol(page, "center");
    addHeader(el, "Announcement");
    lineBreak(el).innerText = "current message";
    var oldMessage = addCol(el, "textBox");
    oldMessage.style.maxWidth = "20em";
    oldMessage.innerText = announcementMessage !== "" ? announcementMessage : "(none)";
    lineBreak(el);
    lineBreak(el).innerText = "new message";
    var newMessage = addInputBox(el, "", null, null);
    newMessage.placeholder = "Leave blank to remove current message";
    lineBreak(el);
    var sendButton = addButton(el, "Send", "green");
    sendButton.onclick = () => {
      showSpinner();
      requestAction("setAnnouncement", { message: newMessage.value }, () => {
        hideSpinner();
        oldMessage.innerText = newMessage.value !== "" ? newMessage.value : "(none)";
      });
    };
  }
  var badguys = [];
  var histogram = [];
  function openBadguysTab() {
    addTab("Badguys", false, renderBadguys);
  }
  function renderBadguys(page) {
    let responses = 0;
    function response() {
      if (++responses === 2) {
        finishRenderBadguys(page);
      }
    }
    requestAction("badguys", {}, (data) => {
      hideSpinner();
      badguys = data.requestTracker;
      response();
    });
    requestAction("getIpHistogram", {}, (data) => {
      hideSpinner();
      histogram = Object.keys(data.histogram).map((ip) => {
        return { ip, num: data.histogram[ip] };
      }).sort((a, b2) => {
        return b2.num - a.num;
      });
      response();
    });
  }
  function finishRenderBadguys(page) {
    var el = addCol(page, "center");
    addHeader(el, "Badguy Tracker");
    var requestRow = addRow(page);
    var button = addButton(requestRow, "Refresh", "green");
    button.onclick = () => {
      page.innerHTML = "";
      renderBadguys(page);
    };
    var requestHeader = document.createElement("h3");
    requestHeader.innerText = "Services Requests by Request Type";
    requestRow.appendChild(requestHeader);
    var requestCaption = document.createElement("div");
    requestCaption.innerText = "From IPs active in past 30 seconds with 10 or more requests per minute";
    requestRow.appendChild(requestCaption);
    var list = addRow(page);
    var columns = Object.keys(badguys);
    var table = document.createElement("table");
    list.appendChild(table);
    var header2 = document.createElement("tr");
    table.appendChild(header2);
    for (var column of columns) {
      var th = document.createElement("th");
      th.innerText = column;
      header2.appendChild(th);
    }
    var contentRow = document.createElement("tr");
    table.appendChild(contentRow);
    for (var column of columns) {
      let cellFunc2 = function(key, td2) {
        if (key === "ip") {
          td2.style.cursor = "pointer";
          td2.onclick = () => {
            navigator.clipboard.writeText(td2.innerText);
          };
        }
      };
      let data = badguys[column];
      let td = document.createElement("td");
      td.style.verticalAlign = "top";
      let innerTable = createTable(data, ["ip", "count", "perMinute"], null, cellFunc2, null);
      td.appendChild(innerTable);
      contentRow.appendChild(td);
    }
    lineBreak(page);
    var row = addRow(page);
    var header2 = document.createElement("h3");
    header2.innerText = "IP Histogram";
    row.appendChild(header2);
    var caption = document.createElement("div");
    caption.innerText = "IPs currently connected to game clusters";
    row.appendChild(caption);
    var table = createTable(histogram, ["ip", "num"], null, cellFunc, null);
    row.appendChild(table);
    function cellFunc(key, td) {
    }
  }
  var ipBans = [];
  var playerBans = [];
  var playerReports = [];
  function openBansTab() {
    addTab("Bans", false, renderBans);
  }
  function renderBans(page) {
    let responses = 0;
    function response() {
      if (++responses === 3) {
        finishRenderBans(page);
      }
    }
    requestAction("getIpBans", {}, (data) => {
      hideSpinner();
      ipBans = data.rows;
      response();
    });
    requestAction("getAllPlayerBans", {}, (data) => {
      hideSpinner();
      playerBans = data.rows;
      response();
    });
    requestAction("getPlayerReports", {}, (data) => {
      hideSpinner();
      playerReports = data.rows;
      response();
    });
  }
  function finishRenderBans(page) {
    var el = addCol(page, "center");
    addHeader(el, "Ban Management");
    var buttonRow = addRow(page);
    var button = addButton(buttonRow, "Refresh", "green");
    button.onclick = () => {
      page.innerHTML = "";
      renderBans(page);
    };
    lineBreak(page);
    var ipHeader = document.createElement("h3");
    ipHeader.innerText = "IP Bans";
    page.appendChild(ipHeader);
    let banButton = addButton(page, "Add IP Ban", "red", () => {
      openBanIpDialog();
    });
    var list = addRow(page);
    function formatIpBans(column, td, row) {
      if (column === "date" || column === "expire" || column === "lifted") {
        if (td.innerHTML !== "") {
          td.innerHTML = localTime(td.innerHTML);
        } else {
          if (row.expired) {
            td.innerHTML = "Expired";
          } else {
            td.innerHTML = "";
            var btn = document.createElement("div");
            btn.className = "smallButton green";
            btn.innerText = "Lift Ban";
            btn.onclick = () => {
              liftIpBan(row.ip);
            };
            td.appendChild(btn);
          }
        }
      } else if (column === "admin_id") {
        td.innerHTML = admins[parseInt(td.innerHTML, 10)].name;
      }
    }
    var table = createTable(ipBans, ["admin_id", "ip", "date", "expire", "lifted", "reason"], null, formatIpBans, null);
    list.appendChild(table);
    function openBanIpDialog() {
      var d = openDialog("Ban IP");
      var row = addRow(d);
      var rowTwo = addRow(d);
      var rowThree = addRow(d);
      var banInputCount = 0;
      function gotBanInput() {
        if (++banInputCount === 3) {
          banButton2.disabled = false;
        }
      }
      var ipEl = addInput(row, "IP", "", null, () => gotBanInput());
      ipEl.style.width = "500px";
      var reasonEl = addInput(rowTwo, "Reason", "", null, () => gotBanInput());
      reasonEl.style.width = "500px";
      let list2 = [
        ["15 MINUTE", "15 minutes"],
        ["30 MINUTE", "30 minutes"],
        ["1 HOUR", "1 hour"],
        ["1 DAY", "1 day"],
        ["1 WEEK", "1 week"],
        ["1 MONTH", "1 month"],
        ["1 YEAR", "1 year"]
      ];
      var durationEl = addSelect("", list2, "", () => gotBanInput(), "Duration");
      rowThree.appendChild(durationEl);
      lineBreak(d);
      var buttons = addRow(d);
      let banButton2 = addButton(buttons, "Drop Ban Hammer", "red", () => {
        let ip = ipEl.value;
        let reason = reasonEl.value;
        let duration = durationEl.value;
        banIp(ip, duration, reason);
        closeDialog();
      });
      addButton(buttons, "Show Mercy", "green", closeDialog);
    }
    function banIp(ip, duration, reason) {
      requestAction("banIp", { ip, duration, reason }, (data) => {
        hideSpinner();
        markDirty(page.id, true);
      });
    }
    function liftIpBan(ip) {
      showSpinner();
      requestAction("liftIpBan", { ip }, (data) => {
        hideSpinner();
        markDirty(page.id, true);
      });
    }
    lineBreak(page);
    var playerHeader = document.createElement("h3");
    playerHeader.innerText = "Player Bans";
    page.appendChild(playerHeader);
    var list = addRow(page);
    function formatPlayerBans(column, td, row) {
      if (column === "date" || column === "expire" || column === "lifted") {
        if (td.innerHTML !== "") {
          td.innerHTML = localTime(td.innerHTML);
        } else if (row.expired) {
          td.innerHTML = "Expired";
        }
      } else if (column === "admin_id") {
        td.innerHTML = admins[parseInt(td.innerHTML, 10)].name;
      } else if (column === "player_id") {
        makePlayerIdLink(td);
      }
    }
    var table = createTable(playerBans, ["admin_id", "player_id", "date", "expire", "lifted", "reason"], null, formatPlayerBans, null);
    list.appendChild(table);
    lineBreak(page);
    var reportHeader = document.createElement("h3");
    reportHeader.innerText = "Player Reports";
    page.appendChild(reportHeader);
    var list = addRow(page);
    function formatPlayerReports(column, td, row) {
      if (column === "date_reported") {
        td.innerHTML = localTime(td.innerHTML);
      } else if (column === "reasons") {
        let reasons = [];
        let reasonMask = parseInt(td.innerText, 10);
        for (let i2 = 0; i2 < reportReasons.length; i2++) {
          if (reasonMask & 1 << i2) {
            reasons.push(reportReasons[i2]);
          }
        }
        td.innerHTML = reasons.join(", ");
      } else if (column === "player_id" || column === "reporter_id") {
        makePlayerIdLink(td);
      }
    }
    var table = createTable(playerReports, ["player_id", "reporter_id", "date_reported", "reasons"], null, formatPlayerReports, null);
    list.appendChild(table);
    function makePlayerIdLink(td) {
      td.className = "fieldValue link";
      td.onclick = /* @__PURE__ */ function(playerId) {
        return () => openPlayerDataFromPlayerId(playerId);
      }(parseInt(td.innerText, 10));
    }
  }
  var statusEnum = {
    open: 0,
    active: 1,
    closed: 2
  };
  var statusNames = ["open", "active", "closed"];
  function openInbox() {
    var tab = addTab("Feedback", false, renderInbox);
    tab.onKeyPress = (key) => {
      switch (key) {
        case "Backspace":
          var row = tab.attachedPage.highlightedRow;
          var rect = row.getBoundingClientRect();
          if (mouse.x >= rect.left && mouse.x < rect.right && mouse.y >= rect.top && mouse.y < rect.bottom) {
            requestAction(
              "setStatus",
              { status: statusEnum.closed, ticket_id: row.ticketId },
              () => {
                markDirty("Feedback", true);
              }
            );
          }
          break;
      }
    };
  }
  function renderInbox(page) {
    var opts = { match: {}, order: [] };
    opts.match.status = [];
    Object.keys(inboxListOpts.match.status).forEach((k) => {
      opts.match.status.push(statusEnum[k]);
    });
    opts.match.feedback_type = [];
    Object.keys(inboxListOpts.match.feedback_type).forEach((k) => {
      opts.match.feedback_type.push(FeedbackType[k]);
    });
    if (inboxListOpts.match.admin_id) {
      opts.match.admin_id = [inboxListOpts.match.admin_id];
    }
    Object.keys(inboxListOpts.order).forEach((k) => {
      opts.order.push(k + " " + inboxListOpts.order[k]);
    });
    opts.limit = inboxListOpts.limit;
    if (!inboxListOpts.order["date_created"]) {
      opts.order.push("date_created desc");
    }
    var filter = addRow(page, "fillWidth");
    var buttons = addCol(filter);
    addButton(buttons, "\u21BB Refresh", "green", /* @__PURE__ */ function() {
      return () => {
        markDirty("Feedback", true);
      };
    }());
    addButton(buttons, "Filters", "orange", openFilterDialog);
    addButton(buttons, '<div class="magGlass">\u26B2</div> Find Ticket', "blue", openFindDialog);
    addRule(page);
    var list = addRow(page);
    addRule(page);
    var pageCount = 0;
    var pageSel = addRow(page);
    addButton(pageSel, "\u25C0\u25C0", "blue", () => flipPage(-1e6));
    addButton(pageSel, "\u25C0", "blue", () => flipPage(-1));
    var pageNum = addButton(pageSel, "&nbsp;");
    pageNum.disabled = true;
    addButton(pageSel, "\u25B6", "blue", () => flipPage(1));
    addButton(pageSel, "\u25B6\u25B6", "blue", () => flipPage(1e6));
    function flipPage(ofs) {
      inboxListOpts.limit.start = Math.max(0, Math.min(inboxListOpts.limit.start + ofs * inboxListOpts.limit.count, (pageCount - 1) * inboxListOpts.limit.count));
      markDirty("Feedback", true);
    }
    var counts = [25, 50, 100];
    var count = addButton(pageSel, "show " + inboxListOpts.limit.count + " per page", "orange", () => {
      popupList(counts, (idx) => {
        inboxListOpts.limit.count = counts[idx];
        markDirty("Feedback", true);
      });
    });
    var rowsFoundEl = addCol(pageSel, "fieldName");
    rowsFoundEl.style += "padding: 0px; margin-top: 10px; margin-left: 16px";
    requestAction("readInbox", opts, (data) => {
      if (!data || data.rows.length == 0) {
        list.innerText = "No data";
        return;
      }
      pageCount = Math.ceil(data.count / inboxListOpts.limit.count);
      pageNum.innerText = Math.floor(inboxListOpts.limit.start / inboxListOpts.limit.count + 1) + " of " + pageCount;
      rowsFoundEl.innerText = data.count + " records found";
      list.appendChild(createTable(data.rows, [
        "ticket_id",
        "status",
        "email",
        "comments",
        "date_created",
        "feedback_type"
      ], rowFunc, cellFunc, colFunc));
      function rowFunc(row, tr) {
        tr.className = "selectRow";
        tr.ticketId = row.ticket_id;
        tr.onclick = /* @__PURE__ */ function(id) {
          return () => openTicket(id);
        }(row.ticket_id);
        tr.onmouseenter = /* @__PURE__ */ function() {
          return () => {
            page.highlightedRow = tr;
          };
        }();
      }
      function cellFunc(key, td) {
        if (key == "comments" && td.innerText.length > 64) {
          td.innerText = td.innerText.substr(0, 64) + "...";
        }
        if (key == "status") {
          td.className += " " + td.innerText;
        }
      }
      function colFunc(th) {
        Object.keys(inboxListOpts.order).forEach((k) => {
          if (k == th.label) {
            var arrow = document.createElement("span");
            arrow.style.color = "slategray";
            if (inboxListOpts.order[k] == "asc") {
              arrow.innerHTML = "&nbsp;\u25B4";
            } else {
              arrow.innerHTML = "&nbsp;\u25BE";
            }
            th.appendChild(arrow);
          }
        });
        th.onclick = /* @__PURE__ */ function() {
          return () => sortInbox(th.label);
        }();
      }
    });
  }
  function sortInbox(colName) {
    if (inboxListOpts.order[colName]) {
      if (inboxListOpts.order[colName] == "desc") {
        inboxListOpts.order = {};
        inboxListOpts.order[colName] = "asc";
      } else {
        delete inboxListOpts.order[colName];
      }
    } else {
      inboxListOpts.order = {};
      inboxListOpts.order[colName] = "desc";
    }
    markDirty("Feedback", true);
  }
  function openPlayersTab() {
    addTab("Players", false, renderPlayers);
  }
  function renderPlayers(page) {
    var el = addCol(page, "center");
    addHeader(el, "Player Management");
    var row = addRow(el);
    var emailIn = addInput(row, "email", null, () => {
      openPlayerDataFromEmail(emailIn.value);
      emailIn.value = "";
    });
    emailIn.size = 40;
    var row = addRow(el);
    var firebaseIn = addInput(row, "firebase id", null, () => {
      openPlayerDataFromFirebaseId(firebaseIn.value);
      firebaseIn.value = "";
    });
    firebaseIn.size = 40;
    var row = addRow(el);
    var idIn = addInput(row, "player id", null, () => {
      openPlayerDataFromPlayerId(idIn.value);
      idIn.value = "";
    });
    idIn.size = 40;
    var row = addRow(el);
    var ipIn = addInput(row, "IP address", null, () => {
      openPlayerDataFromIP(ipIn.value);
      ipIn.value = "";
    });
    ipIn.size = 40;
    var button = addButton(el, "Search", "green");
    button.onclick = () => {
      if (emailIn.value) {
        openPlayerDataFromEmail(emailIn.value);
        emailIn.value = "";
      } else if (firebaseIn.value) {
        openPlayerDataFromFirebaseId(firebaseIn.value);
        firebaseIn.value = "";
      } else if (idIn.value) {
        openPlayerDataFromPlayerId(idIn.value);
        idIn.value = "";
      } else if (ipIn.value) {
        openPlayerDataFromIP(ipIn.value);
        ipIn.value = "";
      }
    };
  }
  function openFindDialog() {
    var d = openDialog("Find Ticket");
    var row = addRow(d);
    var ticketIn = addInput(row, "Ticket ID", null, (value) => {
      closeDialog();
      openTicket(Number.parseInt(value, 10));
    });
    ticketIn.size = 30;
    ticketIn.focus();
    var buttons = addRow(d);
    addButton(buttons, "Find", "green", () => {
      closeDialog();
      openTicket(Number.parseInt(ticketIn.value, 10));
    });
    addButton(buttons, "Cancel", "red", closeDialog);
  }
  function openFilterDialog() {
    var d = openDialog("Filters");
    var row = addRow(d);
    var assignCheck = addCheckbox(row, "Assigned to me");
    assignCheck.checked = inboxListOpts.match.admin_id ? true : false;
    lineBreak(d);
    var row = addRow(d);
    var col = addCol(row, "section");
    addSmallHeader(col, "status");
    statusChecks = {};
    for (var i2 in statusNames) {
      var name = statusNames[i2];
      statusChecks[name] = addCheckbox(addRow(col), name);
      statusChecks[name].checked = inboxListOpts.match.status[name];
    }
    ;
    colBreak(row);
    var col = addCol(row, "section");
    addSmallHeader(col, "feedback_type");
    typeChecks = {};
    Object.keys(FeedbackType).forEach((k) => {
      typeChecks[k] = addCheckbox(addRow(col), k);
      typeChecks[k].checked = inboxListOpts.match.feedback_type[k];
    });
    lineBreak(row);
    var row = addRow(d);
    addButton(row, "Apply", "green", apply);
    addButton(row, "Cancel", "red", closeDialog);
    function apply() {
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
      markDirty("Feedback", true);
    }
  }
  function addRule(dom) {
    var el = document.createElement("hr");
    dom.appendChild(el);
    return el;
  }
  function lineBreak(dom) {
    var el = document.createElement("div");
    el.innerHTML = "&nbsp;";
    dom.appendChild(el);
    return el;
  }
  function colBreak(dom) {
    var el = document.createElement("div");
    el.className = "colBreak";
    dom.appendChild(el);
    return el;
  }
  function addInput(dom, title, value, onEnter, onKeyUp, isType) {
    var div = document.createElement("div");
    div.className = "inputContainer";
    var input = document.createElement("input");
    if (isType) input.type = isType;
    input.onkeydown = (e) => {
      if (e.code == "ENTER") {
        input.blur();
        if (onEnter) onEnter(input.value);
      }
    };
    input.onkeyup = (e) => {
      if (onKeyUp) onKeyUp(input.value);
    };
    input.value = value || "";
    div.appendChild(input);
    if (title) {
      var titleEl = document.createElement("div");
      titleEl.innerText = title;
      titleEl.className = "inputTitle";
      div.appendChild(titleEl);
    }
    dom.appendChild(div);
    return input;
  }
  function addCol(dom, className) {
    var el = document.createElement("div");
    el.className = "col " + className;
    dom.appendChild(el);
    return el;
  }
  function addRow(dom, className) {
    className = className || "";
    var el = document.createElement("div");
    el.className = "row " + className;
    dom.appendChild(el);
    return el;
  }
  function addHeader(dom, text, className) {
    var el = document.createElement("h2");
    el.innerText = text;
    el.className = className ? className : "center";
    dom.appendChild(el);
    return el;
  }
  function addSmallHeader(dom, text, styled) {
    let isClass = !styled ? "center" : styled;
    var el = document.createElement("h3");
    el.innerText = text;
    el.className = isClass;
    dom.appendChild(el);
    return el;
  }
  function addButton(dom, label, color, onclick) {
    var el = document.createElement("button");
    if (color) el.className = color;
    el.innerHTML = label;
    if (onclick) el.onclick = onclick;
    if (dom) dom.appendChild(el);
    return el;
  }
  function addCheckbox(dom, name, onChanged) {
    name = name || "";
    var container = document.createElement("div");
    container.style.display = "inline-block";
    var check = document.createElement("input");
    check.type = "checkbox";
    container.appendChild(check);
    if (name) {
      var label = document.createElement("label");
      label.style.display = "inline-block";
      label.innerText = name;
      container.appendChild(label);
    }
    if (dom) dom.appendChild(container);
    if (onChanged) {
      check.onclick = /* @__PURE__ */ function(name2, el) {
        return () => onChanged(name2, el.checked);
      }(name, check);
    }
    return check;
  }
  function addImage(dom, src) {
    var img = document.createElement("img");
    img.src = src;
    if (dom) dom.appendChild(img);
    return img;
  }
  function addFields(dom, data, keys, func) {
    var nameCol = addCol(dom);
    var valCol = addCol(dom);
    dom.className += " fieldBlock";
    for (var i2 in keys) {
      var el = addRow(nameCol);
      var keyEl = addCol(el, "fieldName");
      var el = addRow(valCol);
      var valEl = addCol(el, "fieldValue");
      var key = keys[i2];
      var val = data[keys[i2]];
      if (val == null) {
        valEl.className = "fieldValue small";
        val = "N/A";
      }
      if (key == "date_modified" || key == "date_created" || key == "login") {
        val = localTime(val);
      }
      keyEl.innerText = key;
      valEl.innerText = val;
      if (func) func(keyEl, valEl);
    }
  }
  function addField(dom, label, value) {
    var el = addRow(dom);
    addCol(el, "fieldName").innerText = label + ": ";
    addCol(el, "fieldValue").innerText = value;
    return el;
  }
  function getFieldName(el) {
    return el.children[0];
  }
  function getFieldValue(el) {
    return el.children[1];
  }
  function addSelect(id, options, selected, onchangeFc, label, multiple) {
    const wrap = document.createElement("div"), select = document.createElement("select"), opDefault = document.createElement("option"), elLabel = document.createElement("label");
    select.id = id;
    select.name = id;
    if (multiple) select.multiple = true;
    opDefault.textContent = "Select option";
    opDefault.disabled = true;
    opDefault.selected = selected ? false : true;
    opDefault.value = null;
    select.appendChild(opDefault);
    if (label) {
      elLabel.innerText = label;
      elLabel.htmlFor = id;
      elLabel.className = "inputTitle";
    }
    options.forEach((option) => {
      let child = document.createElement("option");
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
  function addInputBox(dom, title, value, onKeyUp) {
    var div = document.createElement("div");
    div.className = "inputContainer";
    var input = document.createElement("textarea");
    input.cols = 40;
    input.rows = 3;
    input.onkeyup = (e) => {
      if (onKeyUp) onKeyUp(input.value);
    };
    input.value = value || "";
    div.appendChild(input);
    var titleEl = document.createElement("div");
    titleEl.innerText = title;
    titleEl.className = "inputTitle";
    div.appendChild(titleEl);
    dom.appendChild(div);
    return input;
  }
  function addDiv(dom, id, divClass) {
    var div = document.createElement("div");
    div.id = id;
    div.className = divClass || "add-div";
    dom.appendChild(div);
    return div;
  }
  function copyToClipboard(str) {
    var e = document.getElementById("clipboard");
    e.value = str;
    e.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.log("Unable to copy to clipboard");
    }
  }
  var fetchJson = (jsonData, jsonDoc, callback) => {
    var newData = [];
    jsonData.splice(0, jsonData.length);
    getRequest(jsonDoc + Date.now(), (err, res) => {
      if (err === 404) {
        console.log("Accept it and move on.");
      } else {
        try {
          const parsedJson = JSON.parse(res);
          if (parsedJson.length > 0) {
            parsedJson.forEach((item) => newData.push(item));
          }
        } catch (e) {
          console.log("Fetch json request error: ", e);
        }
      }
      newData.push({});
      if (callback !== null) callback();
    });
    return newData;
  };
  function openMediaTab() {
    addTab("Media", false, renderMedia);
  }
  function renderMedia(page) {
    newsItems = fetchJson(newsItems, "data/shellNews.json?", () => finishRenderMedia(page));
    setTimeout(() => {
      shellYouTube = fetchJson(shellYouTube, "data/shellYouTube.json?", () => finishRenderYTube(page));
    }, 50);
  }
  var newsIsDraggable = true;
  function finishRenderMedia(page) {
    const list = addRow(page, "media-dashboard-container");
    const newsColumns = [...newsColums];
    newsColumns[newsColumns.indexOf("label")] = "content";
    newsColumns.splice(8, 0, "linksToChangeLog");
    newsColumns.splice(0, 0, "");
    newsColumns.push("hideOnCrazyGames");
    if (!newsColumns.includes("linksToKotc")) {
      newsColumns.splice(11, 0, "linksToKotc");
    }
    const buttons = addRow(page, "btn-group-news");
    const saveButton = addButton(buttons, "Save Changes", "green", save), discardButton = addButton(buttons, "Discard", "red", () => {
      markDirty("Media", true);
      newsIsDraggable = true;
    });
    saveButton.disabled = true;
    discardButton.disabled = true;
    const newsTable = createTable(newsItems, newsColumns, rowFunc, cellFuncLarge, null);
    addHeader(list, "Shell News");
    list.appendChild(newsTable);
    let draggedRow = null, draggedData = null, dragOver = null;
    const newsBackup = newsItems.length - 1;
    function rowFunc(row, tr) {
      function idGenerate(length) {
        let result = "";
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for (let i2 = 0; i2 < length; i2++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
      }
      if ("content" in row) {
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
      tr.ondragstart = function(e) {
        e.currentTarget.style.backgroundColor = "gray";
        e.currentTarget.style.visiblity = "hidden";
        draggedData = row;
        draggedRow = this;
      };
      tr.ondragenter = function(e) {
        e.preventDefault();
        e.currentTarget.style.visiblity = "hidden";
        dragOver = this;
        if (draggedRow == this) {
          return false;
        }
      };
      tr.ondragover = function(e) {
        e.preventDefault();
        e.currentTarget.style.backgroundColor = "lightgray";
      };
      tr.ondragleave = function(e) {
        e.currentTarget.style.backgroundColor = "initial";
      };
      tr.ondragend = function(e) {
        const moveElement = (array, initialIndex, finalIndex) => {
          if (initialIndex === -1 || finalIndex === -1) {
            return false;
          }
          array.pop();
          array.splice(finalIndex, 0, array.splice(initialIndex, 1)[0]);
          array.push({});
          return array;
        };
        this.classList.remove("is-dragging");
        e.currentTarget.style.backgroundColor = "none";
        const getDragOverId = dragOver.id, getDraggedId = draggedRow.id, dragItemIdx = newsItems.findIndex((i2) => i2.elId === getDraggedId), dragOverItemIdx = newsItems.findIndex((i2) => i2.elId === getDragOverId);
        const newArray = moveElement(newsItems, dragItemIdx, dragOverItemIdx);
        if (!newArray) {
          console.log("Drag failed");
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
      };
    }
    function cellFuncLarge(key, td) {
      cellFunc(key, td, newsItems);
    }
    function cellFunc(key, td, category) {
      td.category = category;
      if (td.innerText === "undefined")
        td.innerText = "";
      if (key == "") {
        if (td.rowIdx < category.length - 1) {
          if (td.previousSibling) {
            td.innerHTML = "&#9776;";
            td.className = "draggable";
            td.draggable = false;
          } else {
            var btn = document.createElement("div");
            btn.className = "roundButton removeButton";
            btn.onclick = () => {
              delete category[td.rowIdx];
              td.parentElement.remove();
              change();
            };
            td.innerText = "";
            td.appendChild(btn);
          }
        }
      } else if (key == "active") {
        td.innerText = "";
        td.style = "text-align: center";
        var check = addCheckbox(td);
        check.checked = category[td.rowIdx].active;
        check.onchange = () => {
          category[td.rowIdx].active = check.checked;
          change();
        };
      } else if (key == "linksToEggStoreItem") {
        let sel = addSelect("products", skus, category[td.rowIdx][td.key]);
        sel.onchange = () => {
          category[td.rowIdx][td.key] = sel.options[sel.selectedIndex].value;
          change();
          changedLink(td, key);
        };
        td.innerText = "";
        td.appendChild(sel);
      } else if (key == "image") {
        var id = td.category[td.rowIdx].id;
        if (!id) {
          var img = document.createElement("img");
          img.src = "WHEE";
          img.className = "adThumbnail";
          img.onclick = () => {
            openImageUploader(img);
          };
          td.appendChild(img);
        } else {
          var img = document.createElement("img");
          img.src = "data/img/newsItems/" + id + td.category[td.rowIdx].imageExt;
          img.className = "adThumbnail";
          img.onclick = () => {
            expandThumbnail(td.parentElement.children[2].firstChild.value, img);
          };
          td.appendChild(img);
        }
      } else {
        var input = document.createElement("input");
        input.value = td.innerText;
        if (key != "content") {
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
        td.innerText = "";
        td.appendChild(input);
      }
    }
    function expandThumbnail(name, imgEl) {
      var d = openDialog(name);
      var row = addRow(d);
      addImage(row, imgEl.src);
      var buttons2 = addRow(d);
      addButton(buttons2, "Update", "green", () => {
        openImageUploader(imgEl);
      });
      addButton(buttons2, "Close", "red", () => {
        closeDialog();
      });
    }
    function openImageUploader(imgEl) {
      closeDialog();
      openBinaryUploader((res) => {
        var td = imgEl.parentElement;
        td.category[td.rowIdx].image = res.data;
        td.category[td.rowIdx].imageExt = res.ext;
        imgEl.src = res.data;
        change();
      }, ".png,.gif,.jpg,.jpeg");
    }
    function change() {
      newsIsDraggable = false;
      saveButton.disabled = false;
      discardButton.disabled = false;
    }
    function changedLink(td, key) {
      if (key !== "hideOnCrazyGames") {
        var tr = td.parentElement;
        for (var i2 = 4; i2 < 13; i2++) {
          var cell = tr.children[i2];
          if (cell != td) {
            var el = cell.firstChild;
            if (el) {
              el.value = "";
              delete cell.category[cell.rowIdx][cell.key];
            }
          }
        }
      }
      saveButton.disabled = false;
      discardButton.disabled = false;
    }
    function save() {
      showSpinner();
      newsIsDraggable = true;
      requestAction("shellNews", { news: newsItems }, () => {
        hideSpinner();
        markDirty("Media", true);
      });
    }
  }
  var yTubeIsDraggable = true;
  function finishRenderYTube(page) {
    const yContent = addRow(page, "youtube-dashboard-container"), buttons = addRow(page, "btn-group-news"), youTubeColumns = ["", "active", "title", "author", "desc", "link", "image"], saveButton = addButton(buttons, "Save Changes", "green", save), discardButton = addButton(buttons, "Discard", "red", () => {
      markDirty("Media", true);
      yTubeIsDraggable = true;
    });
    let yTubeTable = createTable(shellYouTube, youTubeColumns, rowFunc, cellFuncLarge, null);
    function addVideoError() {
      var d = openDialog("No video content. Wrong id?");
      var buttons2 = addRow(d);
      addButton(buttons2, "Close", "red", () => {
        closeDialog();
      });
    }
    function addVideo() {
      var d = openDialog("Add Video Id");
      var row = addRow(d);
      var input = document.createElement("input");
      input.placeholder = "video id eg. SvPlRd7xjAs";
      d.appendChild(input);
      var buttons2 = addRow(d);
      addButton(buttons2, "Add", "green", () => {
        getVideoContent(input.value);
        closeDialog();
      });
      addButton(buttons2, "Close", "red", () => {
        closeDialog();
      });
    }
    function getVideoContent(id) {
      const youTube = "youtube.com/watch?v=", youTubeOembed = "https://www.youtube.com/oembed?url=http://", prep = { active: true, link: "https://www." + youTube + id, desc: "", imageExt: "" };
      fetch(youTubeOembed + youTube + id + "&format=json").then((res) => {
        showSpinner();
        if (!res.ok) return addVideoError();
        return res.json();
      }).then((data) => {
        if (data === void 0) {
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
    let addVideoBtn = addButton(buttons, "+ Add video", "green", addVideo);
    saveButton.disabled = true;
    discardButton.disabled = true;
    addHeader(yContent, "YouTube");
    yContent.appendChild(addVideoBtn);
    yContent.appendChild(yTubeTable);
    const yTubeBackup = shellYouTube.length - 1;
    let draggedRow = null, dragOver = null;
    function rowFunc(row, tr) {
      if ("title" in row) {
        tr.draggable = true;
      } else {
        tr.draggable = false;
      }
      if (!yTubeIsDraggable) {
        tr.draggable = false;
        return;
      }
      tr.ondragenter = function(e) {
        dragOver = this;
        if (draggedRow == this) return false;
        this.classList.add("dragOver");
      };
      tr.ondragleave = function(e) {
        this.classList.remove("dragOver");
      };
      tr.ondragstart = function(e) {
        if (!yTubeIsDraggable) {
          alert("Save changes or discard before dragging, please.");
          return;
        }
        ;
        this.classList.add("dragging");
        draggedRow = this;
      };
      tr.ondragend = function(e) {
        this.classList.remove("dragging");
        if (!yTubeIsDraggable) {
          return;
        }
        ;
        if (draggedRow != dragOver) {
          yTubeTable.insertBefore(draggedRow, dragOver);
        }
        let tempItems = [];
        for (let r = 1; r < yTubeTable.rows.length - 1; r++) {
          let row2 = yTubeTable.rows[r];
          tempItems.push(shellYouTube[row2.rowIdx]);
          row2.rowIdx = r;
        }
        const removeNull = tempItems.filter((el) => el != null);
        if (removeNull.length === yTubeBackup) {
          shellYouTube.splice(0, shellYouTube.length);
          if (tempItems.length > 0) {
            tempItems.forEach((item) => shellYouTube.push(item));
          }
          save();
        } else {
          saveButton.disabled = true;
          discardButton.disabled = true;
          markDirty("Media", true);
          alert("Doh, drag & drop goofed. Resetting. SORRY!");
          return;
        }
      };
    }
    function cellFuncLarge(key, td) {
      cellFunc(key, td, shellYouTube);
    }
    function cellFunc(key, td, category) {
      td.category = category;
      if (td.innerText === "undefined")
        td.innerText = "";
      if (key == "") {
        if (td.rowIdx < category.length - 1) {
          if (td.previousSibling) {
            td.innerHTML = "&#9776;";
            td.className = "draggable";
            td.draggable = false;
          } else {
            var actions = document.createElement("div");
            var btn = document.createElement("div");
            var move = document.createElement("div");
            actions.className = "display-flex flex-align-center";
            move.innerHTML = "&#9776;";
            move.className = "draggable margin-right-1";
            move.draggable = false;
            btn.className = "roundButton removeButton";
            btn.onclick = () => {
              delete category[td.rowIdx];
              td.parentElement.remove();
              change();
            };
            td.innerText = "";
            actions.appendChild(move);
            actions.appendChild(btn);
            td.appendChild(actions);
          }
        }
      } else if (key == "active") {
        td.innerText = "";
        td.style = "text-align: center";
        var check = addCheckbox(td);
        check.checked = category[td.rowIdx].active;
        check.onchange = () => {
          category[td.rowIdx].active = check.checked;
          change();
        };
      } else if (key == "image") {
        const id = td.category[td.rowIdx].imageId;
        if (!id && !td.category[td.rowIdx].externalImg) {
          var img = document.createElement("img");
          img.src = "WHEE";
          img.className = "adThumbnail";
          img.onclick = () => {
            openImageUploader(img);
          };
          td.appendChild(img);
        } else {
          var img = document.createElement("img");
          if (td.category[td.rowIdx].imageExt) {
            img.src = "data/img/youtube/" + id + td.category[td.rowIdx].imageExt;
          } else {
            img.src = td.category[td.rowIdx].externalImg;
          }
          img.className = "adThumbnail";
          img.onclick = () => {
            expandThumbnail(td.parentElement.children[2].firstChild.value, img);
          };
          td.appendChild(img);
        }
      } else {
        var input = document.createElement("input");
        input.value = td.innerText;
        if (key != "content") {
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
        td.innerText = "";
        td.appendChild(input);
      }
    }
    function expandThumbnail(name, imgEl) {
      var d = openDialog(name);
      var row = addRow(d);
      addImage(row, imgEl.src);
      var buttons2 = addRow(d);
      addButton(buttons2, "Update", "green", () => {
        openImageUploader(imgEl);
      });
      addButton(buttons2, "Close", "red", () => {
        closeDialog();
      });
    }
    function openImageUploader(imgEl) {
      closeDialog();
      openBinaryUploader((res) => {
        var td = imgEl.parentElement;
        td.category[td.rowIdx].image = res.data;
        td.category[td.rowIdx].imageExt = res.ext;
        imgEl.src = res.data;
        change();
      }, ".png,.gif,.jpg,.jpeg");
    }
    function change() {
      newsIsDraggable = false;
      saveButton.disabled = false;
      discardButton.disabled = false;
    }
    function save() {
      showSpinner();
      newsIsDraggable = true;
      requestAction("shellYoutube", { videos: shellYouTube }, (data) => {
        hideSpinner();
        markDirty("Media", true);
      });
    }
  }
  var vipAvailable = [];
  var activeSub = {
    accounts: []
  };
  function openPlayerDataFromTicket(ticketId, firebaseId) {
    if (openTabByName("PLR-" + ticketId, true)) return;
    addTab("PLR-" + ticketId, true, (page) => {
      page.ticketId = ticketId;
      page.firebaseId = firebaseId;
      renderPlayerData(page);
    });
  }
  function openPlayerDataFromFirebaseId(firebaseId, ip) {
    if (openTabByName("PLR-" + firebaseId, true)) return;
    addTab("PLR-" + firebaseId, true, (page) => {
      page.firebaseId = firebaseId;
      page.ip = ip;
      renderPlayerData(page);
    });
  }
  function openPlayerDataFromEmail(email) {
    if (openTabByName("PLR-" + email, true)) return;
    addTab("PLR-" + email, true, (page) => {
      page.email = email;
      renderPlayerData(page);
    });
  }
  function openPlayerDataFromPlayerId(id) {
    if (openTabByName("PLR-" + id, true)) return;
    addTab("PLR-" + id, true, (page) => {
      page.playerId = id;
      renderPlayerData(page);
    });
  }
  function openPlayerDataFromIP(ip) {
    if (openTabByName("PLR-" + ip, true)) return;
    addTab("PLR-" + ip, true, (page) => {
      page.ip = ip;
      renderPlayerData(page);
    });
  }
  function renderPlayerData(page) {
    var ticketId = page.ticketId;
    const firebaseId = page.firebaseId;
    const ip = page.ip;
    let currentFirebaseId = page.firebaseId ? page.firebaseId : null;
    var email = page.email;
    var playerId = page.playerId;
    var impersonateFunc = function(impersonateId) {
      var baseUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
      window.open(baseUrl + "?adminImpersonate=" + impersonateId);
    };
    var criteria;
    if (firebaseId) {
      criteria = { firebase_id: firebaseId };
    } else if (email) {
      criteria = { email };
    } else if (playerId) {
      criteria = { id: playerId };
    } else if (ip) {
      criteria = { ip };
    }
    requestAction("getPlayer", criteria, (data) => {
      if (!data.result) {
        page.innerText = "Player not found";
        return;
      }
      data = data.result;
      currentFirebaseId = data.firebase_id;
      playerId = data.id;
      parseRow("data");
      var col = addCol(page);
      addButton(col, "Impersonate", "green", () => {
        return impersonateFunc(data.firebase_id);
      });
      addButton(col, "Transfer Account", "orange", () => {
        openTransferPlayerDialog(data.id, data.firebase_id);
      });
      addButton(col, "Delete Account", "red", () => {
        openDeletePlayerDialog(data);
      });
      if (page.ip) {
        addCol(page, "colBreak").innerText = "IP: " + page.ip;
      }
      lineBreak(page);
      var profileRow = addRow(page);
      lineBreak(page);
      addRow(page, "fieldName").innerText = "Bans";
      var banButtonRow = addRow(page);
      let banButton = addButton(banButtonRow, "Ban Player", "red", () => {
        openBanPlayerDialog(playerId);
      });
      let liftBanButton = addButton(banButtonRow, "Lift Ban", "green", () => {
        liftPlayerBan(playerId);
      });
      banButton.style.display = "none";
      liftBanButton.style.display = "none";
      var banRow = addRow(page);
      lineBreak(page);
      addRow(page, "fieldName").innerText = "Content Creator";
      const CREATOR = addRow(page);
      let newData = [], origData;
      addButton(CREATOR, "Add", "orange", () => {
        openAddCreatorDialog();
      });
      const saveButton = addButton(CREATOR, "Save Changes", "green", saveCreator), discardButton = addButton(CREATOR, "Discard", "red", () => {
      });
      saveButton.disabled = true;
      discardButton.disabled = true;
      lineBreak(page);
      addRow(page, "fieldName").innerText = "Upgrades";
      var upgrade = addRow(page);
      lineBreak(page);
      addRow(page, "fieldName").innerText = "Refunds";
      var refundArea = addRow(page);
      lineBreak(page);
      addRow(page, "fieldName").innerText = "Challenges";
      addSmallHeader(page, "If no challenges are selected, the player will receive new ones.");
      var chlgsRow = addRow(page);
      lineBreak(page);
      addRow(page, "fieldName").innerText = "transactions";
      var transRow = addRow(page);
      lineBreak(page);
      lineBreak(page);
      addRow(page, "fieldName").innerText = "items";
      var itemRow = addRow(page);
      var links = {
        current_balance: true,
        kills: true,
        deaths: true,
        streak: true
      };
      var col = addCol(profileRow);
      addFields(col, data, [
        "id",
        "firebase_id",
        "providers",
        "email",
        "login",
        "date_created",
        "date_modified"
      ]);
      var col = addCol(profileRow);
      addFields(col, data, [
        "ip",
        "current_balance",
        "primary_item_id",
        "secondary_item_id",
        "hat_item_id",
        "stamp_item_id"
      ], (keyEl, valEl) => {
        if (links[keyEl.innerText]) {
          valEl.className = "fieldValue link";
          valEl.onclick = /* @__PURE__ */ function(firebaseId2, key, valEl2) {
            return () => openModifyPlayerDialog(firebaseId2, key, valEl2);
          }(data.firebase_id, keyEl.innerText, valEl);
        }
      });
      var col = addCol(profileRow);
      addFields(col, data, [
        "class",
        "color",
        "kills",
        "deaths",
        "streak"
      ], (keyEl, valEl) => {
        if (links[keyEl.innerText]) {
          valEl.className = "fieldValue link";
          valEl.onclick = /* @__PURE__ */ function(firebaseId2, key, valEl2) {
            return () => openModifyPlayerDialog(firebaseId2, key, valEl2);
          }(data.firebase_id, keyEl.innerText, valEl);
        }
      });
      function formatBans(column, td) {
        if (column === "date" || column === "expire" || column === "lifted") {
          if (td.innerHTML !== "") {
            td.innerHTML = localTime(td.innerHTML);
          } else {
            td.innerHTML = "N/A";
          }
        } else if (column === "admin_id") {
          td.innerHTML = admins[parseInt(td.innerHTML, 10)].name;
        }
      }
      requestAction("getPlayerBans", { player_id: data.id }, (data2) => {
        if (data2.rows && data2.rows[0] && data2.rows[0].lifted === null) {
          let expired = data2.rows[0].expired;
          if (expired) {
            banButton.style.display = "block";
            liftBanButton.style.display = "none";
          } else {
            banButton.style.display = "none";
            liftBanButton.style.display = "block";
          }
        } else {
          banButton.style.display = "block";
          liftBanButton.style.display = "none";
        }
        banRow.appendChild(createTable(data2.rows, [
          "admin_id",
          "date",
          "expire",
          "lifted",
          "reason"
        ], "", formatBans));
      });
      function transactionUrl(column, td) {
        if (column === "xsolla_id") {
          const content = td.innerHTML;
          const a = document.createElement("a");
          a.href = "https://publisher.xsolla.com/56738/support/transactions/details/" + content;
          a.target = "_blank";
          a.innerHTML = content;
          td.innerHTML = "";
          td.appendChild(a);
        }
      }
      requestAction("getPlayerChallenges", { player_id: data.id }, (data2) => {
        const chlgIds = [false, false, false];
        chlgsRow.appendChild(createTable(
          data2.challenges,
          [
            "challengeId",
            "claimed",
            "goal",
            "period",
            "progress",
            "reset"
          ],
          (a) => {
            const p = Math.floor(a.progress / a.goal * 100);
            a.progress = ` ${p > 100 ? 100 : p}% (${a.progress}/${a.goal})`;
            a.period = convertSeconds(a.period);
            a.claimed = a.claimed ? "Yes" : "No";
            a.reset = a.reset ? "Yes" : "No";
          },
          (column, td) => {
            if (column === "challengeId") {
              const challenge = Challenges.find((el) => el.id === parseInt(td.innerHTML, 10));
              td.innerHTML = `(${challenge.id}) ${challenge.loc_ref}`;
            }
          },
          (d) => {
            if (d.innerHTML === "challengeId") {
              d.innerHTML = "name";
            }
            if (d.innerHTML === "period") {
              d.innerHTML = "time Remaining";
            }
          }
        ));
        const button = addButton(chlgsRow, "New Daily Challenges", "orange", () => {
          requestAction("playerChallengesGetNew", { playerId, chlgIds }, () => {
            closeTab(currentTab);
            openPlayerDataFromPlayerId(playerId);
          });
        });
        chlgsRow.appendChild(button);
        function chlgInput(val, el) {
          const challenge = Challenges.find((el2) => el2.id === parseInt(val, 10));
          const chlg = { id: false, loc_ref: "Challenge not found" };
          if (challenge !== void 0) {
            chlg.id = parseInt(val, 10);
            chlg.loc_ref = challenge.loc_ref;
          }
          el.innerHTML = chlg.loc_ref;
          return chlg.id;
        }
        const inputOne = addInput(chlgsRow, "1", "", "", (val) => {
          const chlg = chlgInput(val, oneEl);
          chlgIds[0] = chlg;
        }, "number");
        const oneEl = document.createElement("p");
        oneEl.innerHTML = "Challenge not found ";
        const parentOne = inputOne.parentElement;
        parentOne.appendChild(oneEl);
        const inputTwo = addInput(chlgsRow, "2", "", "", (val) => {
          const chlg = chlgInput(val, twoEl);
          chlgIds[1] = chlg;
        }, "number");
        const twoEl = document.createElement("p");
        twoEl.innerHTML = "Challenge not found ";
        const parentTwo = inputTwo.parentElement;
        parentTwo.appendChild(twoEl);
        const inputThree = addInput(chlgsRow, "3", "", "", (val) => {
          const chlg = chlgInput(val, threeEl);
          chlgIds[2] = chlg;
        }, "number");
        const threeEl = document.createElement("p");
        threeEl.innerHTML = "Challenge not found ";
        const parentThree = inputThree.parentElement;
        parentThree.appendChild(threeEl);
      });
      requestAction("getPlayerTransactions", { player_id: data.id }, (data2) => {
        transRow.appendChild(createTable(data2.rows, [
          "id",
          "item_id",
          "product_id",
          "amount",
          "refund",
          "xsolla_id",
          "date_created",
          "date_modified"
        ], "", transactionUrl));
      });
      requestAction("getPlayerUpgrades", { player_id: data.id }, (rData) => {
        const expiresTxt = "Expires on:";
        let editClicked = false;
        let trySameVip = false;
        let activeExpiry = null;
        activeSub.accounts.push({ id: data.firebase_id });
        const idx = activeSub.accounts.findIndex((el) => el.id === data.firebase_id);
        if (rData.rows && rData.rows.length && rData.rows.length > 0) {
          if (rData.rows[0].expiry) {
            activeExpiry = rData.rows[0].expiry.replace("T", " ").replace(".000Z", "");
            activeSub.accounts[idx].skuId = null;
          }
          if (rData.rows[0].isActive) {
            activeSub.accounts[idx].skuId = rData.rows[0].id;
          }
        }
        const upgradeEl = document.createElement("div");
        const vipSelect = document.createElement("select");
        requestAction("getAvaiableVip", {}, (rData2) => {
          vipAvailable = [...rData2.rows];
          if (vipAvailable.length > 0) {
            vipAvailable.forEach((el, key) => {
              vipSelect[key] = new Option(el.name, el.id, false, el.id === activeSub.accounts[idx].skuId);
            });
            upgradeEl.appendChild(vipSelect);
          }
        });
        const isExpired = activeSub.accounts[idx].skuId ? expiresTxt : "NOT ACTIVE since: ";
        upgrade.textContent = `${isExpired} ${activeExpiry ? activeExpiry : "Never!"}`;
        const msg = document.createElement("span");
        upgradeEl.appendChild(msg);
        const editBtn = document.createElement("button");
        editBtn.textContent = activeSub.accounts[idx].skuId ? "Change" : "Add";
        editBtn.className = activeSub.accounts[idx].skuId ? "orange" : "green";
        const revokeBtn = document.createElement("button");
        revokeBtn.textContent = "Revoke";
        revokeBtn.className = "red";
        if (activeSub.accounts[idx].skuId) {
          upgradeEl.appendChild(revokeBtn);
        }
        upgradeEl.appendChild(editBtn);
        upgrade.appendChild(upgradeEl);
        editBtn.onclick = (e) => {
          if (editClicked) {
            e.preventDefault();
            return;
          }
          editClicked = true;
          const date = /* @__PURE__ */ new Date();
          const trySubId = Number(vipSelect.value);
          if (trySubId == activeSub.accounts[idx].skuId && !trySameVip) {
            msg.textContent = "Did you mean to select the same vip plan? If so, try again.";
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
              upgrade.textContent = "Something went wrong. Try again...?";
              break;
          }
          const getExpiry = date.toISOString();
          const expiry = getExpiry.slice(0, getExpiry.indexOf("."));
          requestAction("updatePlayerVip", { firebase_id: data.firebase_id, expiry, sku: vipAvailable.filter((el) => el.id == trySubId)[0].sku }, (nData) => {
            activeSub.accounts[idx].skuId = null;
            setTimeout(() => {
              closeTab(currentTab);
              openPlayerDataFromFirebaseId(data.firebase_id);
              hideSpinner();
            }, 1e3);
          });
        };
        revokeBtn.onclick = () => {
          showSpinner();
          revokeBtn.textContent = "REVOKING...";
          const date = /* @__PURE__ */ new Date();
          const getExpiry = date.toISOString();
          const expiry = getExpiry.slice(0, getExpiry.indexOf("."));
          requestAction("updatePlayerVipRevoke", { firebase_id: data.firebase_id, current_vip_id: activeSub.accounts[idx].skuId, expiry }, (cData) => {
            activeSub.accounts[idx].skuId = null;
            showSpinner();
            setTimeout(() => {
              closeTab(currentTab);
              openPlayerDataFromFirebaseId(data.firebase_id);
              hideSpinner();
            }, 2e3);
          });
        };
      });
      lineBreak(page);
      addRow(page, "fieldName").innerText = "Refunds";
      const refundsEl = addCol(profileRow);
      const refundReviewed = (column, td) => {
        if (column === "reviewed") {
          const val = td.innerHTML == 1 ? true : false;
          const x = document.createElement("input");
          td.textContent = "";
          x.setAttribute("type", "checkbox");
          x.checked = val;
          td.appendChild(x);
          td.onclick = (e) => {
            requestAction("updateRefund", { firebaseId: currentFirebaseId, id: td.parentElement.id, val: x.checked ? 1 : 0 });
            markDirty("Refunds", true, true);
          };
        }
      };
      requestAction("getRefunds", { firebaseId: currentFirebaseId, reviewed: false }, (rData) => {
        refundsEl.appendChild(createTable(rData.rows, [
          "id",
          "sku",
          "transaction_id",
          "reason",
          "date_created",
          "reviewed"
        ], (keyEl, valEl) => {
          keyEl.reason = refundReasons.find((el) => el.code == keyEl.reason).type;
          valEl.id = keyEl.id;
        }, refundReviewed));
      });
      refundArea.appendChild(refundsEl);
      requestAction("getPlayerItems", { player_id: data.id }, (data2) => {
        const itemsToDelete = [];
        const confirmItemToDelete = (item) => {
          let d = openDialog("Delete Player Item?"), row = addRow(d), itemText = `<p>PlayerId: ${playerId}: </p>`;
          itemsToDelete.forEach((el) => {
            itemText += `<p>Item ID: ${el.id}, Name: ${el.name}</p>`;
          });
          addCol(row).innerHTML = itemText;
          var buttons = addRow(d);
          addButton(buttons, "Delete", "green", () => {
            requestAction("deletePlayerItem", { itemIds: itemsToDelete, playerId }, (data3) => {
              closeDialog();
              closeTab(currentTab);
              openPlayerDataFromPlayerId(playerId);
              setTimeout(() => {
                var d2 = openDialog("Player item deleted");
                addRow(d2);
                var buttons2 = addRow(d2);
                addButton(buttons2, "Close", "green", () => {
                  closeDialog();
                });
              }, 500);
            });
          });
          addButton(buttons, "Close", "red", () => {
            closeDialog();
          });
        };
        const prepRmBtnAndItemData = (key, td) => {
          if (key === "action") {
            const btn = document.createElement("button");
            const itemId = td.parentElement.children[1].innerHTML;
            var matches = itemId.match(/\[(.*?)\]/);
            let key2 = null;
            let item = null;
            if (matches) {
              key2 = matches[1];
            }
            if (key2) {
              item = items[key2];
            }
            const deleteItemCheckbox = document.createElement("input");
            btn.disabled = true;
            deleteItemCheckbox.setAttribute("type", "checkbox");
            deleteItemCheckbox.className = "deleteItemCheckbox";
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
            td.textContent = "";
            btn.innerHTML = "Delete selected";
            btn.className = "red";
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
        itemRow.appendChild(createTable(data2.rows, ["id", "item_id", "date_created", "date_modified", "action"], null, prepRmBtnAndItemData));
      });
      requestAction("getPlayerSocial", { player_id: data.id }, (data2) => {
        let parsedData = [];
        let filtered = [];
        if ("rows" in data2) {
          parsedData = data2.rows[0].social;
          filtered = parsedData.filter((e) => e !== null);
        }
        newData = filtered;
        setTable(newData);
      });
      function setTable(data2) {
        CREATOR.appendChild(createTable(data2, ["Remove", "id", "url", "active"], null, cellFuncLarge, null, "creator-table"));
      }
      function cellFuncLarge(key, td) {
        cellFunc(key, td, newData);
      }
      function cellFunc(key, td, category) {
        td.category = category;
        if (td.innerText === "undefined")
          td.innerText = "";
        if (key == "Remove") {
          var btn = document.createElement("div");
          btn.className = "roundButton removeButton";
          btn.onclick = () => {
            delete category[td.rowIdx];
            td.parentElement.remove();
            change();
          };
          td.innerText = "";
          td.appendChild(btn);
        } else if (key === "id") {
          td.innerText = SOCIALMEDIA[category[td.rowIdx].id];
        } else if (key == "active") {
          td.innerText = "";
          td.style = "text-align: center";
          var check = addCheckbox(td);
          check.checked = category[td.rowIdx].active;
          check.onchange = () => {
            category[td.rowIdx].active = check.checked;
            checkChange(category[td.rowIdx], category);
          };
        } else {
          var input = document.createElement("input");
          input.value = td.innerText;
          if (key != "content") {
            input.oninput = () => {
              category[td.rowIdx][td.key] = input.value;
            };
            input.className = key;
          } else {
            input.oninput = () => {
              category[td.rowIdx][td.key] = input.value;
              change();
            };
            input.className = key;
          }
          td.innerText = "";
          td.appendChild(input);
        }
      }
      function change() {
        saveButton.disabled = false;
        discardButton.disabled = false;
      }
      function checkChange(changed, cat) {
        const items2 = cat.length - 1;
        cat.forEach((item, idx) => {
          if (item.id !== changed.id) {
            item.active = false;
          }
          if (idx === items2) {
            let table = document.getElementById("creator-table");
            table.remove();
            newData = cat;
            change();
            setTable(newData);
          }
        });
      }
      function saveCreator() {
        showSpinner();
        const date = /* @__PURE__ */ new Date();
        requestAction("updateContentCreator", { id: data.id, data: newData }, () => {
          const idx = activeSub.accounts.findIndex((el) => el.id = data.firebase_id);
          showSpinner();
          if (newData.length > 0 && newData.filter((e) => e.active).length > 0) {
            date.setFullYear(date.getFullYear() + 1);
            let getExpiry = date.toISOString();
            let expiry = getExpiry.slice(0, getExpiry.indexOf("."));
            requestAction("updatePlayerVip", { firebase_id: data.firebase_id, expiry, sku: vipAvailable.filter((el) => el.name == "12 month membership")[0].sku }, (nData) => {
              setTimeout(() => {
                closeTab(currentTab);
                openPlayerDataFromFirebaseId(data.firebase_id);
                hideSpinner();
              }, 1e3);
            });
          } else {
            if (activeSub.accounts[idx].skuId) {
              showSpinner();
              let getExpiry = date.toISOString();
              let expiry = getExpiry.slice(0, getExpiry.indexOf("."));
              requestAction("updatePlayerVipRevoke", { firebase_id: data.firebase_id, current_vip_id: activeSub.accounts[idx].skuId, expiry }, (cData) => {
                activeSub.accounts[idx].skuId = null;
                showSpinner();
                setTimeout(() => {
                  closeTab(currentTab);
                  openPlayerDataFromFirebaseId(data.firebase_id);
                  hideSpinner();
                }, 2e3);
              });
            } else {
              hideSpinner();
            }
          }
        });
      }
      function openAddCreatorDialog() {
        var d = openDialog("Add new creator content");
        var row = addRow(d);
        row.style.color = "slategray";
        lineBreak(d);
        var row = addRow(d, "social-add-wrap");
        const SOCIALS = document.createElement("select"), SELECTWRAP = document.createElement("div"), SELECTLABEL = document.createElement("label"), LABELFOR = "social-media", SOCIALLENGTH = SOCIALMEDIA.length - 1;
        SOCIALS.name = LABELFOR;
        SELECTWRAP.className = "social-media-wrap";
        SELECTLABEL.textContent = "Social Media";
        SELECTLABEL.htmlFor = LABELFOR;
        const socialSet = (id) => {
          return newData.find((item) => {
            if (item.id === id) {
              return true;
            }
            return false;
          });
        };
        SOCIALMEDIA.forEach((item, idx) => {
          const OPTION = document.createElement("option");
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
        const URLINPUT = addInput(row, "Url", "", "", "", "url"), ACTIVECHECK = addCheckbox(row, "Active", () => {
        });
        lineBreak(d);
        const buttons = addRow(d);
        addButton(buttons, "ADD", "green", () => {
          if (ACTIVECHECK.checked) {
            newData.forEach((i2) => i2.active = false);
          }
          newData.push({ id: Number(SOCIALS.value), url: URLINPUT.value, active: ACTIVECHECK.checked });
          let table = document.getElementById("creator-table");
          table.remove();
          change();
          setTable(newData);
          closeDialog();
        });
        addButton(buttons, "Cancel", "orange", closeDialog);
      }
      function openBanPlayerDialog(playerId2) {
        var d = openDialog("Ban Player");
        var row = addRow(d);
        var rowTwo = addRow(d);
        var banInputCount = 0;
        function gotBanInput() {
          if (++banInputCount === 2) {
            banButton2.disabled = false;
          }
        }
        var reasonEl = addInput(row, "Reason", "", null, () => gotBanInput());
        reasonEl.style.width = "500px";
        let list = [
          ["15 MINUTE", "15 minutes"],
          ["30 MINUTE", "30 minutes"],
          ["1 HOUR", "1 hour"],
          ["1 DAY", "1 day"],
          ["1 WEEK", "1 week"],
          ["1 MONTH", "1 month"],
          ["1 YEAR", "1 year"]
        ];
        var durationEl = addSelect("", list, "", () => gotBanInput(), "Duration");
        rowTwo.appendChild(durationEl);
        lineBreak(d);
        var buttons = addRow(d);
        let banButton2 = addButton(buttons, "Drop Ban Hammer", "red", () => {
          let reason = reasonEl.value;
          let duration = durationEl.value;
          banPlayer(playerId2, duration, reason);
          closeDialog();
        });
        banButton2.disabled = true;
        addButton(buttons, "Show Mercy", "green", closeDialog);
      }
      function banPlayer(bannedId, duration, reason) {
        showSpinner();
        requestAction("banPlayer", { bannedId, duration, reason }, (data2) => {
          hideSpinner();
          markDirty(page.id, true);
        });
      }
      function liftPlayerBan(bannedId) {
        showSpinner();
        requestAction("liftPlayerBan", { bannedId }, (data2) => {
          hideSpinner();
          markDirty(page.id, true);
        });
      }
    });
  }
  function openModifyPlayerDialog(firebaseId, key, valEl) {
    var d = openDialog("Modify Player");
    var row = addRow(d);
    row.style.color = "slategray";
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
    addButton(buttons, "Update", "red", () => {
      modifyPlayerData(firebaseId, key, valEl, input.value);
      closeDialog();
    });
    addButton(buttons, "Cancel", "orange", closeDialog);
  }
  function modifyPlayerData(firebaseId, key, valEl, val) {
    requestAction("modifyPlayer", { firebaseId, key, val }, (data) => {
      if (data.error) {
        var d = openDialog("Error");
        var row = addRow(d);
        row.style.color = "slategray";
        row.innerText = data.error;
        lineBreak(d);
        row = addRow(d);
        addButton(row, "OK", "green", () => closeDialog());
        return;
      }
      valEl.innerText = val;
    });
  }
  function openDeletePlayerDialog(data) {
    var d = openDialog("Delete Player");
    var row = addRow(d);
    var rowTwo = addRow(d);
    var rowThree = addRow(d);
    row.style.color = "slategray";
    rowTwo.style.color = "red";
    row.innerText = "Are you ABSOLUTELY sure you want to delete this user from the database? This operation cannot be un-done. If this was prompted by user request, make sure you've made a reasonable effort to verify that the request originated from the owner of this account.\n\n";
    rowTwo.innerHTML = `<strong>CONFIRM INFO!</strong> Firebase: ${data.firebase_id}. Email: ${data.email}. Id: ${data.id}. <br /><br />`;
    rowThree.innerText = "Do you still wish to proceed?";
    lineBreak(d);
    var buttons = addRow(d);
    addButton(buttons, "Delete", "red", () => {
      deletePlayer(data.id, data.firebase_id);
      closeDialog();
    });
    addButton(buttons, "Cancel", "green", closeDialog);
  }
  function openTransferPlayerDialog(id, firebaseId) {
    var d = openDialog("Transfer Player Data");
    var row = addRow(d);
    row.style.color = "slategray";
    row.innerText = "Transfer this player's data to another account by entering\none of the new account's identifying fields below:";
    lineBreak(d);
    var row = addRow(d);
    var emailIn = addInput(row, "email", null, () => {
      transferPlayerData(id, firebaseId, { email: emailIn.value });
      emailIn.value = "";
      closeDialog();
    });
    emailIn.size = 60;
    var row = addRow(d);
    var firebaseIn = addInput(row, "firebase id", null, () => {
      transferPlayerData(id, firebaseId, { firebase_id: firebaseIn.value });
      firebaseIn.value = "";
      closeDialog();
    });
    firebaseIn.size = 60;
    var buttons = addRow(d);
    addButton(buttons, "Transfer", "red", () => {
      if (emailIn.value) {
        transferPlayerData(id, firebaseId, { email: emailIn.value });
        emailIn.value = "";
      } else if (firebaseIn.value) {
        transferPlayerData(id, firebaseId, { firebase_id: firebaseIn.value });
        firebaseIn.value = "";
      }
      closeDialog();
    });
    addButton(buttons, "Cancel", "green", closeDialog);
  }
  function transferPlayerData(id, firebaseId, searchCriteria) {
    requestAction("transferPlayerData", { id, firebaseId, searchCriteria }, (data) => {
      if (data.error) {
        var d = openDialog("Error");
        var row = addRow(d);
        row.style.color = "slategray";
        row.innerText = data.error;
        lineBreak(d);
        row = addRow(d);
        addButton(row, "OK", "green", () => closeDialog());
        return;
      }
      closeTab(currentTab);
      if (searchCriteria.email) {
        openPlayerDataFromEmail(searchCriteria.email);
      } else if (searchCriteria.firebaseId) {
        openPlayerDataFromFirebaseId(searchCriteria.firebaseId);
      }
    });
  }
  function deletePlayer(id, firebaseId) {
    requestAction("deletePlayer", { id, firebaseId }, (data) => {
      hideSpinner();
      if (data.error) {
        var d = openDialog("Error");
        var row = addRow(d);
        row.style.color = "slategray";
        row.innerText = data.error;
      } else {
        var d = openDialog("Player Deleted");
        var row = addRow(d);
        row.style.color = "slategray";
        row.innerText = "Player successfully deleted.";
      }
      lineBreak(d);
      row = addRow(d);
      addButton(row, "OK", "green", () => {
        closeTab(currentTab);
        closeDialog();
      });
    });
  }
  var refundTab;
  var refundList;
  var smackers;
  var refundPage = 1;
  var refundsPerPage = 10;
  var maxPageCount = 1;
  var pageDisplay;
  var tabNotify = document.createElement("span");
  tabNotify.className = "notify";
  function openRefunds() {
    refundTab = addTab("Refunds", false, renderRefunds);
  }
  function prepRefundTab() {
    showSpinner();
    setTimeout(() => {
      loadRefunds(smackers, true);
      setTimeout(() => {
        loadRefunds(refundList, false);
      }, 1e3);
    }, 1e3);
  }
  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
  }
  function loadRefunds(el, loadAll) {
    requestAction("getRefunds", { firebaseId: false, reviewed: loadAll }, (data) => {
      hideSpinner();
      function createRefundTable() {
        el.appendChild(createTable(refunds, [
          "id",
          "firebase_id",
          "sku",
          "transaction_id",
          "reason",
          "reviewed",
          "date_created"
        ], rowFunc, colFunc));
      }
      el.innerHTML = "";
      let refunds = [], refundRows = [];
      if (!data || data.rows === void 0 || data.rows.length == 0) {
        el.innerText = "HOORAY! No refunds!";
        tabNotify.innerHTML = "";
        tabNotify.style.display = "none";
        return;
      }
      function compare(a, b2) {
        if (a.firebase_id < b2.firebase_id) {
          return -1;
        }
        if (a.firebase_id > b2.firebase_id) {
          return 1;
        }
        return 0;
      }
      data.rows.sort(compare);
      refundRows = [...data.rows];
      let prevBtn, nextBtn;
      if (!loadAll) {
        tabNotify.style.display = "inline-block";
        tabNotify.innerHTML = data.rows.length;
        refundTab.appendChild(tabNotify);
        refunds.push(...data.rows);
      } else {
        const btns = addRow(el);
        prevBtn = addButton(btns, "\u25C0 previous", "green", pagPrev);
        nextBtn = addButton(btns, "next \u25B6", "green", pagNext);
        pageDisplay = addCol(btns);
        maxPageCount = Math.ceil(data.rows.length / refundsPerPage);
        prevBtn.disabled = true;
        if (!maxPageCount || maxPageCount === 1) {
          nextBtn.disabled = true;
        }
        pageDisplay.textContent = `Page: 1 of ${maxPageCount}`;
        refunds.push(...paginate(data.rows, refundsPerPage, refundPage));
      }
      function pagNext() {
        prevBtn.disabled = false;
        if (refundPage === maxPageCount) {
          prevBtn.disabled = false;
          nextBtn.disabled = true;
          return;
        } else {
          const table = el.getElementsByTagName("table")[0].remove();
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
          const table = el.getElementsByTagName("table")[0].remove();
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
      function rowFunc(row, tr) {
        tr.id = row.id;
        if (!isNaN(row.reason)) {
          row.reason = refundReasons.find((el2) => el2.code == row.reason).type;
        }
        tr.onclick = (e) => {
          openPlayerDataFromFirebaseId(row.firebase_id);
        };
      }
      function colFunc(column, td) {
        if (column === "reviewed") {
          const val = td.innerHTML == 1 ? true : false;
          const x = document.createElement("input");
          td.textContent = "";
          x.setAttribute("type", "checkbox");
          x.checked = val;
          x.disabled = true;
          td.appendChild(x);
        }
      }
    });
  }
  function renderRefunds(page) {
    addRule(page);
    refundList = addRow(page);
    addRule(page);
    smackers = addRow(page);
    prepRefundTab();
  }
  var subscriptionSection = (page) => {
    addSmallHeader(page, "Product Subscription", "h3");
    const sub = addDiv(page);
    const updateSubText = (data) => {
      sub.innerText = `Subscription id: ${data.subscription}`;
    };
    addButton(page, "Update", "orange", () => {
      requestAction("updateProductSubscription", {}, updateSubText);
    });
    requestAction("checkProductSubscription", {}, updateSubText);
  };
  var showSsSettings = (page) => {
    subscriptionSection(page);
  };
  function openSettingsTab() {
    addTab("Settings", false, showSsSettings);
  }
  function openTicket(id) {
    if (openTabByName("TCK-" + id)) return;
    addTab("TCK-" + id, true, (page) => {
      page.ticketId = id;
      renderTicket(page);
    });
  }
  function renderTicket(page) {
    requestAction("getTicket", { ticket_id: page.ticketId }, (data) => {
      if (!data.rows) {
        page.innerText = "No ticket found for this ID";
        return;
      }
      data = data.rows[0];
      parseRow(data);
      var col = addCol(page);
      var admin = admins[data.admin_id];
      var assign = addField(col, "", "");
      var assignName = getFieldName(assign);
      var assignVal = getFieldValue(assign);
      if (admin) {
        assignName.innerText = "assigned to: ";
        assignVal.innerText = admin.name;
      } else {
        assignName.innerText = "unassigned";
        assignVal.innerText = "GIMME!";
        assignVal.className = "col fieldValue link";
        assignVal.onclick = function() {
          requestAction("assign", {
            ticket_id: page.ticketId,
            admin_id: profile.id
          }, () => {
            assignName.innerText = "assigned to:";
            assignVal.innerText = profile.name;
            assignVal.onclick = null;
            assignVal.className = "col fieldValue";
          });
        };
      }
      var col = addCol(page);
      addButton(col, "Copy URL", "green", () => {
        copyToClipboard(window.location.href + "?ticket=" + page.ticketId);
      });
      var impersonateFunc = function(impersonateId) {
        var baseUrl = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : "");
        window.open(baseUrl + "?adminImpersonate=" + impersonateId);
      };
      addButton(col, "Impersonate", "green", () => {
        return impersonateFunc(data.firebase_id);
      });
      lineBreak(page);
      var row = addRow(page);
      var col = addCol(row);
      addFields(col, data, [
        "ticket_id",
        "feedback_type",
        "status",
        "date_created"
      ], (keyEl, valEl) => {
        if (keyEl.innerText == "status") {
          valEl.className = "fieldValue link";
          valEl.onclick = () => popupList(statusNames, (idx) => {
            requestAction(
              "setStatus",
              { status: idx, ticket_id: data.ticket_id },
              () => {
                valEl.innerText = statusNames[idx];
                markDirty("Feedback");
              }
            );
          });
        }
      });
      col = addCol(row);
      addFields(col, data, [
        "username",
        "times_played",
        "xsolla_token",
        "firebase_id",
        "email"
      ], (keyEl, valEl) => {
        if (keyEl.innerText == "firebase_id") {
          valEl.className = "fieldValue link";
          valEl.onclick = /* @__PURE__ */ function(ticketId, firebaseId) {
            return () => openPlayerDataFromTicket(ticketId, firebaseId);
          }(data.ticket_id, data.firebase_id);
        }
      });
      col = addCol(row);
      addFields(col, data, [
        "from_eu",
        "of_age",
        "targeted_ads"
      ]);
      lineBreak(page);
      row = addRow(page, "fieldName").innerText = "comments";
      row = addRow(page, "textBox").innerText = data.comments;
      row = addRow(page);
      var reply = addButton(row, "Reply", "blue");
      var note = addCol(row);
      note.style.color = "slategray";
      note.style.margin = "10px";
      note.innerText = 'Replying will set status to "active"';
      reply.onclick = () => {
        var str = "mailto:" + data.email + "?from=" + profile.email + "&subject=" + encodeURIComponent("Re: Shell Shockers [#" + data.ticket_id + "]") + "&body=" + encodeURIComponent("\n\n\n------------------------\nOriginal message\n------------------------\n" + data.comments);
        window.location.href = str;
        requestAction("setStatus", {
          status: statusEnum.active,
          ticket_id: data.ticket_id
        }, () => {
        });
      };
      lineBreak(page);
      row = addRow(page);
      col = addCol(row);
      addFields(col, data, [
        "game_version",
        "browser_name",
        "browser_version",
        "os_name",
        "os_version",
        "engine_name",
        "engine_version",
        "server",
        "url",
        "referrer"
      ]);
      col = addCol(row);
      addFields(col, data, [
        "ping",
        "highest_ping",
        "fps",
        "screen_size",
        "inner_size",
        "color_depth",
        "pixel_depth",
        "gl_vendor",
        "gl_version",
        "renderer",
        "max_texture_size"
      ]);
      lineBreak(page);
      col = addCol(row);
      addFields(col, data, [
        "game_type",
        "game_code",
        "current_balance",
        "local_kills",
        "local_deaths",
        "local_streak",
        "selected_class",
        "selected_color",
        "hat",
        "stamp",
        "weapons"
      ], (keyEl, valEl) => {
        if (keyEl.innerText == "game_code" && data.game_code) {
          valEl.innerHTML = '<a href="https://shellshock.io/#' + data.game_code + '" target="_window">' + data.game_code + "</a>";
        }
      });
      addRow(page, "fieldName").innerText = "log";
      addRow(page, "textBox").innerText = decodeURIComponent(data.log);
      lineBreak(page);
      addRow(page, "fieldName").innerText = "debug";
      addRow(page, "textBox").innerHTML = "<pre>" + JSON.stringify(data.debug, null, "	") + "</pre>";
    });
  }
  var twitchBlacklist = null;
  function openTwitchTab() {
    addTab("Twitch", false, renderTwitch);
  }
  function renderTwitch(page) {
    let responses = 0;
    function response() {
      if (++responses === 1) {
        finishRenderTwitch(page);
      }
    }
    requestAction("getTwitchBlacklist", {}, (data) => {
      hideSpinner();
      twitchBlacklist = JSON.parse(data.twitchBlacklist);
      response();
    });
  }
  function finishRenderTwitch(page) {
    var el = addCol(page, "center");
    addHeader(el, "Twitch");
    var buttonRow = addRow(page);
    var button = addButton(buttonRow, "Submit Changes", "green");
    button.disabled = true;
    button.onclick = () => {
      twitchBlacklist = {};
      list.value.split("\n").forEach((l) => {
        if (l.trim().length > 0) twitchBlacklist[l] = true;
      });
      requestAction("updateTwitchBlacklist", { twitchBlacklist }, (data) => {
        page.innerHTML = "";
        requestAction("getTwitchBlacklist", {}, (data2) => {
          hideSpinner();
          twitchBlacklist = JSON.parse(data2.twitchBlacklist);
          finishRenderTwitch(page);
        });
      });
    };
    lineBreak(page);
    var r = addRow(page);
    var list = addInputBox(r, "", null, null);
    list.rows = 20;
    list.spellcheck = false;
    list.value = Object.keys(twitchBlacklist).sort((a, b2) => a.toLowerCase().localeCompare(b2.toLowerCase())).join("\n");
    list.oninput = () => {
      button.disabled = false;
    };
  }
  function parseRow(row) {
    if (row.status !== void 0) {
      row.status = statusNames[row.status];
    }
    if (row.feedback_type !== void 0) {
      row.feedback_type = ["comment", "feature", "bug", "purchase", "account", "abuse", "other", "deleteAccount"][row.feedback_type];
    }
    var bools = ["from_eu", "of_age", "targeted_ads", "hold_to_aim", "enable_chat", "auto_detail", "shadows_enabled", "high_res"];
    for (var b2 in bools) {
      if (row[bools[b2]] !== void 0) {
        row[bools[b2]] = ["no", "yes"][row[bools[b2]]];
      }
    }
    if (row.selected_class !== void 0) {
      row.selected_class = ["soldier", "scrambler", "free ranger"][row.selected_class];
    }
    if (row.class !== void 0) {
      row.class = ["soldier", "scrambler", "free ranger"][row.class];
    }
    if (row.date_created !== void 0) {
      row.date_created = localTime(row.date_created);
    }
    if (row.date_modified !== void 0) {
      row.date_modified = localTime(row.date_modified);
    }
    if (row.login !== void 0) {
      row.login = localTime(row.login);
    }
    if (row.hasOwnProperty("game_type") && row.game_type != null) {
      row.game_type = GameTypes[row.game_type].shortName;
    }
    if (row.hasOwnProperty("item_id") && row.item_id != null) {
      row.item_id = `[${row.item_id}] - ` + (items[row.item_id] ? `${items[row.item_id].name}` : "Item ID CHANGED");
    }
    if (row.hasOwnProperty("primary_item_id") && row.primary_item_id != null) {
      row.primary_item_id = items[row.primary_item_id].name;
    }
    if (row.hasOwnProperty("secondary_item_id") && row.secondary_item_id != null) {
      row.secondary_item_id = items[row.secondary_item_id].name;
    }
    if (row.hasOwnProperty("hat_item_id") && row.hat_item_id != null) {
      row.hat_item_id = items[row.hat_item_id].name;
    }
    if (row.hasOwnProperty("stamp_item_id") && row.stamp_item_id != null) {
      row.stamp_item_id = items[row.stamp_item_id].name;
    }
    if (row.hasOwnProperty("grenade_item_id") && row.grenade_item_id != null) {
      row.grenade_item_id = items[row.grenade_item_id].name;
    }
    if (row.hasOwnProperty("product_id") && row.product_id != null) {
      row.product_id = products[row.product_id].name;
    }
  }
  function showSpinner() {
    document.getElementById("spinner").style.display = "block";
  }
  function hideSpinner() {
    document.getElementById("spinner").style.display = "none";
  }
  function findTab(name) {
    var arr = Array.from(headerEl.children);
    for (var i2 = 0; i2 < arr.length; i2++) {
      var e = arr[i2];
      if (e.innerText && e.innerText == name || e.innerText && e.innerText.includes(name)) {
        return e;
      }
    }
    return null;
  }
  function addTab(name, canClose, callback) {
    tabAway();
    var page = addRow(doc, "page");
    page.id = name;
    var tab = document.createElement("div");
    tab.className = "tab tabActive";
    tab.innerText = name;
    tab.attachedPage = page;
    tab.onclick = () => tabClicked(tab);
    tab.onmouseenter = function() {
      if (currentTab != this) {
        this.className = "tab tabHover";
      }
    };
    tab.onmouseleave = function() {
      if (currentTab == this) {
        this.className = "tab tabActive";
      } else {
        this.className = "tab";
      }
    };
    header.appendChild(tab);
    currentTab = tab;
    if (canClose) {
      var x = document.createElement("div");
      x.className = "closer";
      x.onclick = () => {
        closeTab(tab);
        event.stopPropagation();
      };
      tab.appendChild(x);
    } else {
      tab.style.paddingRight = "1em";
    }
    page.focus();
    tab.renderFunc = callback;
    callback(page);
    return tab;
  }
  function closeTab(e) {
    if (e == currentTab) {
      tabClicked(e.previousSibling);
    }
    e.attachedPage.parentNode.removeChild(e.attachedPage);
    header.removeChild(e);
  }
  function tabAway(e) {
    if (currentTab) {
      lastTab = currentTab;
      currentTab.scrollRestore = document.scrollingElement.scrollTop;
      currentTab.attachedPage.style.display = "none";
      currentTab.className = "tab";
    }
  }
  function openTabByName(name, canClose) {
    var tab = findTab(name);
    if (tab) {
      openTab(tab);
      return true;
    }
    return false;
  }
  function openTab(tab) {
    if (currentTab == tab) return;
    tabAway();
    tab.className = "tab tabActive";
    tab.attachedPage.style.display = "block";
    currentTab = tab;
    if (tab.scrollRestore) {
      document.scrollingElement.scrollTop = tab.scrollRestore;
    }
  }
  function tabClicked(tab, keepClosed) {
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
  function markDirty(name, refreshNow, keepClosed) {
    var tab = findTab(name);
    if (tab) {
      tab.attachedPage.isDirty = true;
      if (refreshNow) tabClicked(tab, keepClosed);
    }
  }
  var convertSeconds = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const remainingSeconds = seconds % 60;
    const hourString = hours > 0 ? `${hours}h` : "";
    const minuteString = minutes > 0 ? `${minutes}m` : "";
    const secondString = remainingSeconds > 0 ? `${remainingSeconds}s` : "";
    if (hours > 0) {
      return `${hourString} : ${minuteString || "0m"} ${secondString && `: ${secondString}`}`;
    } else if (!hours && minutes > 0) {
      return `${minuteString} ${secondString && `:${secondString}`}`;
    }
    return secondString;
  };
})();
