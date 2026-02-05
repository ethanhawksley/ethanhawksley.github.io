// @ts-check
import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://hawksley.dev',
  trailingSlash: 'always',
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
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
      changefreq: ChangeFreqEnum.WEEKLY,
      lastmod: new Date(),
      priority: 0.7,
      serialize: (item) => {
        if (item.url === 'https://hawksley.dev/') {
          return { ...item, priority: 1.0, changefreq: ChangeFreqEnum.WEEKLY };
        }
        if (item.url === 'https://hawksley.dev/blog/') {
          return { ...item, priority: 0.9, changefreq: ChangeFreqEnum.DAILY };
        }
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.8, changefreq: ChangeFreqEnum.MONTHLY };
        }
        return item;
      },
    }),
    mdx(),
  ],
});
