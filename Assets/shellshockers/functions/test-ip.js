export async function onRequest({ request }) {
    const ip = request.headers.get('CF-Connecting-IP');
    const country = request.headers.get('CF-IPCountry');
    
    return new Response(JSON.stringify({
        'CF-Connecting-IP': ip,
        'CF-IPCountry': country,
        'X-Forwarded-For': request.headers.get('X-Forwarded-For'),
        'X-Real-IP': request.headers.get('X-Real-IP'),
    }, null, 2), {
        headers: { 'Content-Type': 'application/json' }
    });
}