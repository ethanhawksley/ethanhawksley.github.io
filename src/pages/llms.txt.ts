import { getSortedPosts, getSortedProjects } from '../lib/content-helpers.ts';

export async function GET() {
  const allPosts = await getSortedPosts();

  const allProjects = await getSortedProjects();

  const content = `# Ethan Hawksley

> Personal site and technical blog of Ethan Hawksley, a UK-based CS student focusing on systems programming, low-level computing, and cybersecurity.
> Website: https://hawksley.dev

## Projects
${allProjects.map((p) => `- [${p.data.name}](${p.data.liveUrl || p.data.sourceUrl}): ${p.data.description} (${p.data.stack.join(', ')})`).join('\n')}

## Blog Posts
${allPosts.map((p) => `- [${p.data.title}](https://hawksley.dev/blog/${p.id}/): ${p.data.description} (${p.data.pubDate.toISOString().split('T')[0]})`).join('\n')}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
