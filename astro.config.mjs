// @ts-check
import { defineConfig } from 'astro/config';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

import compress from 'astro-compress';

import { externalPages } from './src/utils/site-urls';

export default defineConfig({
  site: 'https://hawksley.dev',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  trailingSlash: 'always',
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'always',
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
      transformers: [
        {
          name: 'add-copy-button',
          pre(node) {
            node.properties.tabindex = '0';
            node.properties['aria-label'] = 'Code snippet';
            node.children.push({
              type: 'element',
              tagName: 'button',
              properties: {
                className: ['copy-button'],
                type: 'button',
                'aria-label': 'Copy code',
              },
              children: [
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    className: ['copy-icon'],
                    width: '18',
                    height: '18',
                    'aria-hidden': 'true',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'use',
                      properties: { href: '#icon-copy' },
                      children: [],
                    },
                  ],
                },
                {
                  type: 'element',
                  tagName: 'svg',
                  properties: {
                    className: ['check-icon'],
                    width: '18',
                    height: '18',
                    'aria-hidden': 'true',
                  },
                  children: [
                    {
                      type: 'element',
                      tagName: 'use',
                      properties: { href: '#icon-check' },
                      children: [],
                    },
                  ],
                },
              ],
            });
          },
        },
      ],
    },
  },
  integrations: [
    sitemap({
      customPages: externalPages,
      changefreq: ChangeFreqEnum.MONTHLY,
      priority: 0.7,
      serialize: (item) => {
        if (item.url === 'https://hawksley.dev/') {
          return { ...item, priority: 1.0, changefreq: ChangeFreqEnum.MONTHLY };
        }
        if (item.url === 'https://hawksley.dev/blog/') {
          return { ...item, priority: 0.9, changefreq: ChangeFreqEnum.MONTHLY };
        }
        if (item.url === 'https://hawksley.dev/elsewhere/') {
          return { ...item, priority: 0.8, changefreq: ChangeFreqEnum.MONTHLY };
        }
        if (item.url.includes('/blog/')) {
          return { ...item, priority: 0.7, changefreq: ChangeFreqEnum.MONTHLY };
        }
        return item;
      },
    }),
    mdx(),
    compress({
      Image: false,
    }),
  ],
});
