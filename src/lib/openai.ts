// Endpoints da OpenAI vistos pelo navegador. Apontam para o proxy em /api/openai,
// que injeta a chave no servidor — nenhuma credencial chega ao bundle.
export const CHAT_COMPLETIONS_URL = '/api/openai/v1/chat/completions';
export const TRANSCRIPTIONS_URL = '/api/openai/v1/audio/transcriptions';
