import { getCollection, type CollectionEntry } from 'astro:content';
import { marked } from 'marked';

export async function getSortedPosts() {
  const posts = await getCollection('posts');
  return posts.toSorted(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getSortedProjects() {
  const projects = await getCollection('projects');
  return projects.toSorted((a, b) => a.data.priority - b.data.priority);
}

export async function getPostHtml(
  post: CollectionEntry<'posts'>,
  siteUrl: string,
) {
  if (!post.body) return '';

  let parsed = marked.parse(post.body);
  if (parsed instanceof Promise) {
    parsed = await parsed;
  }
  let html = parsed as string;

  html = html.replace(/(src|href)="([^"]+)"/g, (match, attr, url) => {
    if (/^(https?:|mailto:|#)/.test(url)) {
      return match;
    }
    if (url.startsWith('./')) {
      return `${attr}="${siteUrl}blog/${post.id}/${url.slice(2)}"`;
    }
    if (url.startsWith('/')) {
      return `${attr}="${siteUrl.slice(0, -1)}${url}"`;
    }
    return `${attr}="${siteUrl}blog/${post.id}/${url}"`;
  });

  return html;
}
