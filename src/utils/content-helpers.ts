import { getCollection } from 'astro:content';

export async function getSortedPosts() {
  const posts = await getCollection('posts');
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export async function getSortedProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.priority - b.data.priority);
}
