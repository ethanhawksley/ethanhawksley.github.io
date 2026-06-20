// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import compress from 'astro-compress';

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
                'aria-live': 'polite',
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
    mdx(),
    compress({
      Image: false,
    }),
  ],
});
