import init from './main.js';
import ExternalAPI from '../../PIXI/src/external/wild_tangent';
import apiConfig from './config/external/default.json';



//----------------------------------------------------------------------------------------------------------------------
function environmentReady() {
    window.removeEventListener('load', environmentReady);
    init(ExternalAPI, apiConfig);
}

//----------------------------------------------------------------------------------------------------------------------
window.addEventListener('load', environmentReady);