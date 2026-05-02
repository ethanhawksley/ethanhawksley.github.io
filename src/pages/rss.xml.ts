import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');

  return rss({
    title: "Ethan Hawksley's Blog",
    description:
      'Technical blog of Ethan Hawksley, a UK-based CS student. Articles on systems programming, low-level computing, cybersecurity, and computer science.',
    site: context.site!,
    items: posts
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
        categories: post.data.tags,
      })),
    customData: `<language>en-GB</language>`,
  });
}
