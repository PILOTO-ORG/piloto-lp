import { proxy } from '../_openai-proxy';

export const config = { runtime: 'edge' };

export default (req: Request) => proxy(req, 'v1/chat/completions');
