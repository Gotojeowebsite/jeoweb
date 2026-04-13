"use strict";

(function () {
	var scripts = document.getElementsByTagName("script");
	var scriptUrl = scripts[scripts.length - 1].src;
	var root = scriptUrl.split("master-loader.js")[0];
	var loaders = {
		unity: "unity.js",
		"unity-beta": "unity-beta.js",
		"unity-2020": "unity-2020.js"
	};

	if (window.location.href.indexOf("pokiForceLocalLoader") >= 0) {
		loaders.unity = "/unity/dist/unity.js";
		loaders["unity-beta"] = "/unity-beta/dist/unity-beta.js";
		loaders["unity-2020"] = "/unity-2020/dist/unity-2020.js";
		root = "/loaders";
	}

	if (!window.config) {
		throw Error("window.config not found");
	}

	var loader = loaders[window.config.loader];
	if (!loader) {
		throw Error('Loader "' + window.config.loader + '" not found');
	}

	if (!window.config.unityWebglLoaderUrl) {
		var versionSplit = window.config.unityVersion ? window.config.unityVersion.split(".") : [];
		var year = versionSplit[0];
		var minor = versionSplit[1];
		switch (year) {
			case "2019":
				window.config.unityWebglLoaderUrl = minor === "1"
					? "UnityLoader.2019.1.js"
					: "_external_mirror/game-cdn.poki.com/loaders/v2/unity/static/UnityLoader.2019.2.js";
				break;
			default:
				window.config.unityWebglLoaderUrl = "UnityLoader.js";
		}
	}

	function joinRoot(path) {
		if (path.charAt(0) === "/") {
			return path;
		}
		return (root.slice(-1) === "/" ? root : (root + "/")) + path;
	}

	function loadScript(src, onDone) {
		var s = document.createElement("script");
		s.src = src;
		s.onload = function () {
			if (onDone) onDone();
		};
		s.onerror = function () {
			if (onDone) onDone();
		};
		document.body.appendChild(s);
	}

	function loadUnityLoader() {
		loadScript(joinRoot(loader));
	}

	loadScript(joinRoot("poki-offline-stub.js"), function () {
		var useRealPokiSDK = window.location.search.indexOf("useRealPokiSDK=1") >= 0;
		if (useRealPokiSDK) {
			loadScript(joinRoot("poki.js"), loadUnityLoader);
			return;
		}
		loadUnityLoader();
	});
})();