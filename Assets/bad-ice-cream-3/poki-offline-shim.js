(function (w) {
  if (w.PokiSDK) {
    return;
  }

  function invokeCallback(options, rewardedResult) {
    if (!options) return;
    if (typeof options === 'function') {
      options(rewardedResult);
      return;
    }
    if (typeof options.callback === 'function') {
      options.callback(rewardedResult);
    }
    if (typeof options.onSuccess === 'function') {
      options.onSuccess(rewardedResult);
    }
    if (typeof options.adFinished === 'function') {
      options.adFinished(rewardedResult);
    }
  }

  w.PokiSDK = {
    _isOfflineShim: true,
    adBlocked: true,
    init: function () { return Promise.resolve(); },
    setDebug: function () {},
    setDebugTouchOverlayController: function () {},
    gameLoadingStart: function () {},
    gameLoadingProgress: function () {},
    gameLoadingFinished: function () {},
    gameplayStart: function () {},
    gameplayStop: function () {},
    roundStart: function () {},
    roundEnd: function () {},
    happyTime: function () {},
    customEvent: function () {},
    logError: function () {},
    commercialBreak: function (options) {
      invokeCallback(options, false);
      return Promise.resolve();
    },
    rewardedBreak: function (options) {
      var rewarded = false;
      invokeCallback(options, rewarded);
      return Promise.resolve(rewarded);
    }
  };
})(window);