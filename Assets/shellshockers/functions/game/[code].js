// functions/game/[code].js
import { handleProxyRequest } from '../_shared/wsProxy.js';

export async function onRequest(context) {
  // Reuse the same proxy logic you already use for /game/
  return handleProxyRequest(context, 'Game');
}