import '../../PIXI/bin/pixi-4.5.1.js';
import '../../PIXI/bin/pixi-spine';

import {Queue, SyncQueue, createLoader} from '../../PIXI/src/media/loaders';
import ExternalAPI from '../../PIXI/src/external/wild_tangent';

import I18 from '../../PIXI/src/I18';
import BitmapText from '../../PIXI/src/display/BitmapText';
import JSONLoader from '../../PIXI/src/media/loaders/JSONLoader';
import {createFbButton} from './FB';

import Game from './Game';

import PACKAGE from '../package.json';
import CONFIG from './config/config.json';
import ASSETS from './config/assets.json';

// import '../../PIXI/bin/web-console.js';


//----------------------------------------------------------------------------------------------------------------------
export default function (API = ExternalAPI, apiConfig = {}) {

    let external = new API(apiConfig);

    external.init(function (external) {

        BitmapText.LINES_DELIMITER = "\\n";

        let APP = new Game(PACKAGE.name, CONFIG, external);
        APP.once('ready', applicationReady);
        APP.init(document.body);


        function applicationReady() {

            let back = document.getElementsByClassName('p2m-layer-screens')[0];
            back.style.backgroundImage = 'url(assets/images/back-fill.png)';
            back.style.backgroundRepeat = "repeat-x";
            APP.layout.on("fitlayout", fitBack);
            fitBack();


            //нужно для вынесения переменных в отдельный конфиг
            let configLoader = new JSONLoader('assets/CONFIG.json');
            configLoader.once("complete", () => APP.configClient = configLoader.data);

            //I18.supportedLanguages = ["en", "ru"];
            I18.supportedLanguages = ["en"];
            I18.init();

            let loader = new SyncQueue();

            let loaderUI = new APP.external.LoaderUI(APP.layout, loader);
            loaderUI.once('complete', preloadComplete);

            // loaderUI.skipPlayButton = false;

            //для iPadMini лочим все звуки для всех браузеров
            if (navigator.userAgent.match(/iPad/i) && window.screen.availWidth == 1024 && window.screen.availHeight == 748) {
                APP.iPadMini = true;
            } else {
                APP.iPadMini = false;
            }

            loader.add(configLoader);
            if (!APP.iPadMini) loader.add(APP.audio.createLoaderQueue(ASSETS.sounds));
            loader.add(
                APP.library.createLoaderQueue(ASSETS.images),
                //APP.audio.createLoaderQueue(ASSETS.sounds),
                I18.createLoaderQueue(),
                APP.spineLibrary.createLoaderQueue(['slingshot/fire'])
            );

            loader.load();
        }

        function fitBack() {
            let h = window.innerHeight;
            let back = document.getElementsByClassName('p2m-layer-screens')[0];
            back.style.backgroundSize = "100% " + h + "px";
            createFbButton();

        }


        function preloadComplete(e) {
            APP.settings.load(() => APP.run());
        }

    });

}
