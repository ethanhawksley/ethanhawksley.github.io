import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    sourceUrl: z.string(),
    liveUrl: z.string().optional(),
    priority: z.number(),
  }),
});

export const collections = { projects };
