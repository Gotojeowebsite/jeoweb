import { handleProxyRequest } from './_shared/wsProxy';

export async function onRequest(context) {
  return handleProxyRequest(context, 'Game');
}