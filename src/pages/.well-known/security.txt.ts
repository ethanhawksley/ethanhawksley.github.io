import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);

  const content = `Contact: mailto:ethan@hawksley.dev
Encryption: https://hawksley.dev/.well-known/openpgpkey/hu/beu6nmegfmmtch6ix6qnxgp1y6zun4rf
Expires: ${expires.toISOString()}
Preferred-Languages: en
Canonical: https://hawksley.dev/.well-known/security.txt
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
