import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('posts');

  return rss({
    title: "Ethan Hawksley's Blog",
    description:
      'Technical blog of Ethan Hawksley, a UK-based CS student and developer. Explore articles on Rust, JavaScript, and computer science concepts.',
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
    customData: `<language>en-gb</language>`,
  });
}
