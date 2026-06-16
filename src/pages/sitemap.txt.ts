import { getAllPages } from '../utils/site-urls.ts';

export async function GET() {
  const allPages = await getAllPages();

  return new Response(allPages.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
