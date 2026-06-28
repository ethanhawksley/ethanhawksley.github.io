import type { APIContext } from 'astro';
import { getSortedPosts, getPostHtml } from '../utils/content-helpers';

export async function GET(context: APIContext) {
  const allPosts = await getSortedPosts();
  const siteUrl = context.site!.toString();

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: "Ethan Hawksley's Blog",
    description:
      'Technical blog of Ethan Hawksley, a UK-based CS student. Articles on systems programming, low-level computing, cybersecurity, and computer science.',
    home_page_url: siteUrl,
    feed_url: `${siteUrl}feed.json`,
    authors: [{ name: 'Ethan Hawksley', url: siteUrl }],
    language: 'en-GB',
    favicon: 'https://hawksley.dev/icon-48x48.png',
    icon: 'https://hawksley.dev/icon-512x512.png',
    items: await Promise.all(
      allPosts.map(async (post) => ({
        id: `${siteUrl}blog/${post.id}/`,
        url: `${siteUrl}blog/${post.id}/`,
        title: post.data.title,
        summary: post.data.description,
        content_text: post.data.description,
        content_html: await getPostHtml(post, siteUrl),
        date_published: post.data.pubDate.toISOString(),
        tags: post.data.tags,
      })),
    ),
  };

  return new Response(JSON.stringify(feed), {
    headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
  });
}
