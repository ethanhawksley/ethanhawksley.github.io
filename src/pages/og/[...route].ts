import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { getSortedPosts } from '../../utils/content-helpers';

const VERSION = 'v1';

const bgBuffer = readFileSync('./src/assets/og-background.png');
const fontBold = readFileSync('./src/assets/IBMPlexSans-Bold.ttf');
const fontRegular = readFileSync('./src/assets/IBMPlexSans-Regular.ttf');

const bgBase64 = `data:image/png;base64,${bgBuffer.toString('base64')}`;

const baseAssetsHash = createHash('sha256')
  .update(bgBuffer)
  .update(fontBold)
  .update(fontRegular)
  .update(VERSION)
  .digest('hex');

const CACHE_DIR = path.join(process.cwd(), 'node_modules/.astro/og-cache');

export async function getStaticPaths() {
  const posts = await getSortedPosts();

  const blogPaths = posts.map((post) => ({
    params: { route: `blog/${post.id}.png` },
    props: {
      page: {
        title: post.data.title,
        description: post.data.description,
      },
    },
  }));

  const staticPaths = [
    {
      params: { route: 'home.png' },
      props: {
        page: {
          title: 'Ethan Hawksley',
          description:
            'CS student in the UK focusing on systems programming and cybersecurity.',
        },
      },
    },
    {
      params: { route: 'blog.png' },
      props: {
        page: {
          title: 'Blog',
          description:
            'Writing about systems programming, cybersecurity, and computer science.',
        },
      },
    },
    {
      params: { route: 'elsewhere.png' },
      props: {
        page: {
          title: 'Elsewhere',
          description:
            'Online profiles and platforms where you can find me around the web.',
        },
      },
    },
  ];

  return [...staticPaths, ...blogPaths];
}

export async function GET({
  props,
}: {
  props: { page: { title: string; description?: string } };
}) {
  const { title, description = '' } = props.page;

  const hash = createHash('sha256')
    .update(baseAssetsHash)
    .update(title)
    .update(description)
    .digest('hex');
  const cacheFilePath = path.join(CACHE_DIR, `${hash}.png`);

  try {
    await mkdir(CACHE_DIR, { recursive: true });
    if (existsSync(cacheFilePath)) {
      const cachedPng = await readFile(cacheFilePath);
      return new Response(new Uint8Array(cachedPng), {
        headers: { 'Content-Type': 'image/png' },
      });
    }
  } catch (error) {
    console.warn('cache read error:', error);
  }

  const backgroundNode = {
    type: 'img',
    props: {
      src: bgBase64,
      style: {
        position: 'absolute',
        inset: 0,
        width: '1200px',
        height: '630px',
      },
    },
  };

  const titleNode = {
    type: 'div',
    props: {
      style: {
        fontSize: 50,
        fontWeight: 700,
        color: '#ffffff',
        lineHeight: 1.3,
        fontFamily: 'IBM Plex Sans',
      },
      children: title,
    },
  };

  const descriptionNode = description
    ? {
        type: 'div',
        props: {
          style: {
            fontSize: 30,
            color: '#a1a1aa',
            marginTop: 24,
            lineHeight: 1.5,
            fontFamily: 'IBM Plex Sans',
          },
          children: description,
        },
      }
    : null;

  const contentNode = {
    type: 'div',
    props: {
      style: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '60%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        boxSizing: 'border-box',
      },

      children: [titleNode, descriptionNode].filter(Boolean),
    },
  };

  const rootContainerNode = {
    type: 'div',
    props: {
      style: {
        width: '1200px',
        height: '630px',
        display: 'flex',
        position: 'relative',
      },
      children: [backgroundNode, contentNode],
    },
  };

  const svg = await satori(rootContainerNode, {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'IBM Plex Sans', data: fontBold, weight: 700, style: 'normal' },
      {
        name: 'IBM Plex Sans',
        data: fontRegular,
        weight: 400,
        style: 'normal',
      },
    ],
  });

  const png = new Resvg(svg).render().asPng();

  try {
    await writeFile(cacheFilePath, png);
  } catch (error) {
    console.warn('cache write error:', error);
  }

  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png' },
  });
}
