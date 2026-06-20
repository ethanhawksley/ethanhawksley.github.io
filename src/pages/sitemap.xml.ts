import type { APIContext } from 'astro';
import { getSortedPosts } from '../utils/content-helpers';
import { externalPages } from '../utils/site-urls';

interface SitemapPage {
  url: string;
  priority: number;
  changefreq: string;
  lastmod?: string;
}

export async function GET(context: APIContext) {
  const siteUrl = context.site!.toString();
  const allPosts = await getSortedPosts();

  const blogLastModified = allPosts[0].data.pubDate.toISOString().split('T')[0];

  const staticPages: SitemapPage[] = [
    {
      url: '',
      priority: 1.0,
      changefreq: 'monthly',
      lastmod: blogLastModified,
    },
    {
      url: 'blog/',
      priority: 0.9,
      changefreq: 'monthly',
      lastmod: blogLastModified,
    },
    { url: 'elsewhere/', priority: 0.8, changefreq: 'monthly' },
  ];

  const postPages: SitemapPage[] = allPosts.map((post) => {
    const lastMod = post.data.modDate || post.data.pubDate;
    return {
      url: `blog/${post.id}/`,
      priority: 0.7,
      changefreq: 'monthly',
      lastmod: lastMod.toISOString().split('T')[0],
    };
  });

  const externalSitemapPages: SitemapPage[] = externalPages.map((url) => ({
    url,
    priority: 0.7,
    changefreq: 'monthly',
  }));

  const allPages = [...staticPages, ...postPages, ...externalSitemapPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPages
    .map((page) => {
      const loc = page.url.startsWith('http')
        ? page.url
        : new URL(page.url, siteUrl).toString();
      const lastmodTag = page.lastmod
        ? `\n    <lastmod>${page.lastmod}</lastmod>`
        : '';

      return `<url>
    <loc>${loc}</loc>${lastmodTag}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`;
    })
    .join('\n  ')}
</urlset>`;

  return new Response(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
