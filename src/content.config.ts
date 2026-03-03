import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      modDate: z.coerce.date().optional(),
      tags: z.array(z.string()),
      coverImage: image().optional(),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image(),
      description: z.string(),
      sourceUrl: z.string(),
      liveUrl: z.string().optional(),
      priority: z.number(),
    }),
});

export const collections = { posts, projects };
