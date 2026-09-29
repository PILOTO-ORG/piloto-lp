// Lógica comum dos proxies da OpenAI. Arquivo com `_` na frente não vira rota.
//
// A chave vive só aqui, no servidor — o navegador nunca a recebe. O corpo da
// requisição é encaminhado intacto, o que serve tanto para JSON (chat) quanto
// para multipart/form-data (transcrição, que carrega o boundary no Content-Type).

// O maior payload legítimo é um áudio de alguns segundos.
const MAX_BODY_BYTES = 10 * 1024 * 1024;

const fail = (message: string, status: number) =>
  new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export async function proxy(req: Request, upstreamPath: string): Promise<Response> {
  if (req.method !== 'POST') return fail('Método não permitido', 405);

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return fail('OPENAI_API_KEY não configurada no servidor', 500);

  // Aceita apenas chamadas do próprio site. Não é proteção forte — quem copiar
  // o header passa —, mas corta o uso casual do proxy por terceiros.
  const origin = req.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(req.url).host) {
    return fail('Origem não permitida', 403);
  }

  const body = await req.arrayBuffer();
  if (body.byteLength > MAX_BODY_BYTES) return fail('Payload grande demais', 413);

  const headers = new Headers({ Authorization: `Bearer ${apiKey}` });
  const contentType = req.headers.get('content-type');
  if (contentType) headers.set('Content-Type', contentType);

  const upstream = await fetch(`https://api.openai.com/${upstreamPath}`, {
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
