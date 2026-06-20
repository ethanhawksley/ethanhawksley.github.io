export const externalPages = [
  'https://hawksley.dev/cyms-interpreter/',
  'https://hawksley.dev/mineduo/',
  'https://hawksley.dev/turing-machine/',
  'https://hawksley.dev/nintendrust/',
];

export const endpointUrls = [
  'https://hawksley.dev/sitemap.xml',
  'https://hawksley.dev/sitemap.txt',
  'https://hawksley.dev/rss.xml',
  'https://hawksley.dev/feed.json',
  'https://hawksley.dev/llms.txt',
  'https://hawksley.dev/llms-full.txt',
  'https://hawksley.dev/elsewhere.txt',
  'https://hawksley.dev/.well-known/security.txt',
  'https://hawksley.dev/.well-known/webfinger',
];

export async function getInternalPages() {
  const { getSortedPosts } = await import('./content-helpers');
  const allPosts = await getSortedPosts();

  const internalPaths = [
    '',
    'blog/',
    'elsewhere/',
    ...allPosts.map((post) => `blog/${post.id}/`),
  ];

  return internalPaths.map((path) =>
    new URL(path, 'https://hawksley.dev').toString(),
  );
}

export async function getInternalUrls() {
  const internalPages = await getInternalPages();
  return [...endpointUrls, ...internalPages];
}

export async function getAllPages() {
  const internalPages = await getInternalPages();
  return [...internalPages, ...externalPages];
}
