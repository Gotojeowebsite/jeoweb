(function (w) {
  if (w.PokiSDK) {
    return;
  }

  function callDone(options, rewardedResult) {
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
  }

  w.PokiSDK = {
    _isOfflineStub: true,
    adBlocked: true,
    init: function () { return Promise.resolve(); },
    setDebug: function () {},
    gameLoadingStart: function () {},
    gameLoadingProgress: function () {},
    gameLoadingFinished: function () {},
    gameplayStart: function () {},
    gameplayStop: function () {},
    commercialBreak: function (options) {
      callDone(options, false);
      return Promise.resolve();
    },
    rewardedBreak: function (options) {
      callDone(options, false);
      return Promise.resolve(false);
    }
  };
})(window);