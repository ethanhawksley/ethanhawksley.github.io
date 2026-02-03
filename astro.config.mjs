// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://hawksley.dev',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'ayu-light',
        dark: 'ayu-dark',
      },
    },
  },
  integrations: [
    sitemap({
      customPages: [
        'https://hawksley.dev/cyms-interpreter/',
        'https://hawksley.dev/turing-machine/',
        'https://hawksley.dev/mineduo/',
        'https://hawksley.dev/tetris/',
      ],
    }),
    mdx(),
  ],
});
