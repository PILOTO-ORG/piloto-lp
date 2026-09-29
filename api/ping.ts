// Diagnóstico temporário: existe para responder se a Vercel está construindo o
// diretório api/ deste projeto. Se /api/ping responde e /api/openai/chat não,
// o problema é a rota; se nenhum dos dois responde, o api/ não está sendo
// detectado. REMOVER assim que o proxy estiver confirmado no ar.

export const config = { runtime: 'edge' };

export default () =>
  new Response(JSON.stringify({ ok: true, temChave: !!process.env.OPENAI_API_KEY }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
