// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://hawksley.dev',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      customPages: [
        'https://hawksley.dev/cyms-interpreter/',
        'https://hawksley.dev/turing-machine/',
        'https://hawksley.dev/mineduo/',
        'https://hawksley.dev/tetris/',
      ],
    }),
  ],
});
