// Proxy da OpenAI. A chave vive só aqui, no servidor — o navegador nunca a recebe.
// Encaminha o corpo da requisição intacto, o que serve tanto para JSON (chat)
// quanto para multipart/form-data (transcrição de áudio, que carrega o boundary
// no próprio Content-Type).

export const config = { runtime: 'edge' };

const ALLOWED_ROUTES = new Set([
  'v1/chat/completions',
  'v1/audio/transcriptions',
]);

// O maior payload legítimo é um áudio de alguns segundos.
const MAX_BODY_BYTES = 10 * 1024 * 1024;

const fail = (message: string, status: number) =>
  new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') return fail('Método não permitido', 405);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fail('OPENAI_API_KEY não configurada no servidor', 500);

  const url = new URL(req.url);

  // Aceita apenas chamadas do próprio site. Não é proteção forte — quem copiar
  // o header passa —, mas corta o uso casual do proxy por terceiros.
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== url.host) {
    return fail('Origem não permitida', 403);
  }

  const route = url.pathname.replace(/^\/api\/openai\//, '');
  if (!ALLOWED_ROUTES.has(route)) return fail(`Rota não permitida: ${route}`, 404);

  const body = await req.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) return fail('Payload grande demais', 413);

  const headers = new Headers({ Authorization: `Bearer ${apiKey}` });
  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);

  const upstream = await fetch(`https://api.openai.com/${route}`, {
    method: 'POST',
    headers,
    body,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('content-type') ?? 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
