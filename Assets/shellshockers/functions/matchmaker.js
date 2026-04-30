import { handleProxyRequest } from "./_shared/wsProxy.js";
export async function onRequest(context) {
  return handleProxyRequest(context, "Proxy");
}