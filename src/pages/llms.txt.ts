import { getCollection } from 'astro:content';

export async function GET() {
  const posts = (await getCollection('posts')).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  const projects = (await getCollection('projects')).sort(
    (a, b) => a.data.priority - b.data.priority,
  );

  const content = `# Ethan Hawksley

> Personal site and technical blog of Ethan Hawksley, a UK-based CS student focusing on systems programming, low-level computing, and cybersecurity.
> Website: https://hawksley.dev

## Projects
${projects.map((p) => `- [${p.data.name}](${p.data.liveUrl || p.data.sourceUrl}): ${p.data.description} (${p.data.stack.join(', ')})`).join('\n')}

## Blog Posts
${posts.map((p) => `- [${p.data.title}](https://hawksley.dev/blog/${p.id}/): ${p.data.description} (${p.data.pubDate.toISOString().split('T')[0]})`).join('\n')}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
