import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
  schema: () =>
    z.object({
      name: z.string(),
      description: z.string(),
      type: z.enum(['Web', 'CLI', 'Tool']),
      stack: z.array(z.string()),
      sourceUrl: z.url(),
      liveUrl: z.url().optional(),
      priority: z.number(),
    }),
});

export const collections = { posts, projects };
