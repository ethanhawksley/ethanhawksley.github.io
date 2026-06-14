import { getSortedPosts, getSortedProjects } from '../utils/content-helpers';
import { profiles } from '../utils/profiles';

export async function GET() {
  const allPosts = await getSortedPosts();
  const allProjects = await getSortedProjects();

  const content = `# Ethan Hawksley

> Personal site and technical blog of Ethan Hawksley, a UK-based CS student focusing on systems programming, low-level computing, and cybersecurity.
> Website: https://hawksley.dev
> License (Code): MIT
> License (Content): [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
> License (Assets/Branding): All Rights Reserved

## Projects
${allProjects
  .map(
    (project) => `
### ${project.data.name}

${project.data.liveUrl ? `${project.data.liveUrl} ` : ''}${project.data.sourceUrl ?? ''}

**Stack:** ${project.data.stack.join(', ')}

${project.data.description}
`,
  )
  .join('')}
## Blog Posts
${allPosts
  .map(
    (post) => `
### ${post.data.title}

https://hawksley.dev/blog/${post.id}/

${post.data.description}

*Published ${post.data.pubDate.toISOString().split('T')[0]}${post.data.modDate ? `, Modified ${post.data.modDate.toISOString().split('T')[0]}` : ''}*

${post.body?.replaceAll(/^#/gm, '###') ?? ''}
`,
  )
  .join('\n')}
## Profiles
${profiles
  .map(
    (section) => `
### ${section.title}

${section.links.map((link) => `- [${link.name}](${link.url})`).join('\n')}`,
  )
  .join('\n')}
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
