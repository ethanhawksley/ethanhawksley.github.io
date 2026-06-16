export const externalPages = [
  'https://hawksley.dev/cyms-interpreter/',
  'https://hawksley.dev/mineduo/',
  'https://hawksley.dev/turing-machine/',
  'https://hawksley.dev/nintendrust/',
];

export async function getAllPages() {
  const { getSortedPosts } = await import('./content-helpers');
  const allPosts = await getSortedPosts();

  const internalPaths = [
    '',
    'blog/',
    'elsewhere/',
    ...allPosts.map((post) => `blog/${post.id}/`),
  ];

  const internalPages = internalPaths.map((path) =>
    new URL(path, 'https://hawksley.dev').toString(),
  );

  return [...internalPages, ...externalPages];
}
