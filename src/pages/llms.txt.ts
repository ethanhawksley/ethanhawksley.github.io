import { getSortedPosts, getSortedProjects } from '../utils/content-helpers';

export async function GET() {
  const allPosts = await getSortedPosts();

  const allProjects = await getSortedProjects();

  const content = `# Ethan Hawksley

> Personal site and technical blog of Ethan Hawksley, a UK-based CS student focusing on systems programming, low-level computing, and cybersecurity.
> Website: https://hawksley.dev
> License (Code): MIT
> License (Content): CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/)
> License (Assets/Branding): All Rights Reserved

## Projects
${allProjects
  .map(
    (p) => `### ${p.data.name}
${p.data.liveUrl ? `${p.data.liveUrl} ` : ''}${p.data.sourceUrl ?? ''}
${p.data.stack.join(', ')}
${p.data.description}

`,
  )
  .join('')}## Blog Posts
${allPosts
  .map(
    (p) => `### ${p.data.title}
https://hawksley.dev/blog/${p.id}/
${p.data.description}
Published ${p.data.pubDate.toISOString().split('T')[0]}${p.data.modDate ? `, Modified ${p.data.modDate.toISOString().split('T')[0]}` : ''}
`,
  )
  .join('\n')}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
