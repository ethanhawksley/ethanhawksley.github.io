import { getContentUrls } from '../utils/site-urls';

export async function GET() {
  const contentUrls = await getContentUrls();

  return new Response(contentUrls.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
