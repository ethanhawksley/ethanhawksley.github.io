import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getSortedPosts, getPostHtml } from '../utils/content-helpers';

export async function GET(context: APIContext) {
  const allPosts = await getSortedPosts();
  const siteUrl = context.site!.toString();

  return rss({
    title: "Ethan Hawksley's Blog",
    description:
      'Technical blog of Ethan Hawksley, a UK-based CS student. Articles on systems programming, low-level computing, cybersecurity, and computer science.',
    site: context.site!,
    xmlns: {
      atom: 'http://www.w3.org/2005/Atom',
    },
    items: await Promise.all(
      allPosts.map(async (post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
        categories: post.data.tags,
        content: await getPostHtml(post, siteUrl),
      })),
    ),
    customData: [
      `<language>en-GB</language>`,
      `<copyright>Content licensed under CC BY 4.0</copyright>`,
      `<atom:link href="${context.site}rss.xml" rel="self" type="application/rss+xml" />`,
    ].join(''),
  });
}
