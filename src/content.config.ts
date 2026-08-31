import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/index.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    metaDescription: z.string(),
    pubDate: z.coerce.date(),
    modDate: z.coerce.date().optional(),
    tags: z.array(z.string()),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    type: z.enum(['Web', 'CLI', 'Book']),
    stack: z.array(z.string()),
    applicationCategory: z.string().optional(),
    url: z.url(),
    id: z.url(),
    links: z
      .array(
        z.object({
          name: z.string(),
          url: z.url(),
        }),
      )
      .optional(),
    priority: z.number(),
  }),
});

const theSecondMaintainer = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/the-second-maintainer',
  }),
  schema: z.object({
    title: z.string(),
    index: z.number(),
  }),
});

export const collections = { posts, projects, theSecondMaintainer };
