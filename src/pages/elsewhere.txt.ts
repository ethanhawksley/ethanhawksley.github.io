import { allProfileUrls } from '../utils/profiles.ts';

export async function GET() {
  return new Response(allProfileUrls.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
