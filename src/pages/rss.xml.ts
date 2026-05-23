import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getSortedPosts } from '../lib/content-helpers';

export async function GET(context: APIContext) {
  const allPosts = await getSortedPosts();

  return rss({
    title: "Ethan Hawksley's Blog",
    description:
      'Technical blog of Ethan Hawksley, a UK-based CS student. Articles on systems programming, low-level computing, cybersecurity, and computer science.',
    site: context.site!,
    items: allPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      categories: post.data.tags,
    })),
    customData: `<language>en-GB</language><copyright>Content licensed under CC BY 4.0</copyright>`,
  });
}
