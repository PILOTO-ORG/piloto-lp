// Endpoints da OpenAI vistos pelo navegador. Apontam para os proxies em /api,
// que injetam a chave no servidor — nenhuma credencial chega ao bundle.
//
// São rotas explícitas, uma por arquivo em api/openai/. A primeira tentativa foi
// um catch-all `[...path].ts` espelhando o caminho da OpenAI, e a Vercel não
// publicou a função: /api/openai/v1/chat/completions voltava o 404 dela, não o
// do handler. Rota explícita depende de menos convenção.
export const CHAT_COMPLETIONS_URL = '/api/openai/chat';
export const TRANSCRIPTIONS_URL = '/api/openai/transcribe';
