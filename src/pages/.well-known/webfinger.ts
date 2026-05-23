import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  const webfinger = {
    subject: 'acct:ethan@hawksley.dev',
    aliases: [
      'https://mastodon.social/@ethanhawksley',
      'https://mastodon.social/ap/users/116039738772915554',
    ],
    links: [
      {
        rel: 'http://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: 'https://mastodon.social/@ethanhawksley',
      },
      {
        rel: 'self',
        type: 'application/activity+json',
        href: 'https://mastodon.social/ap/users/116039738772915554',
      },
      {
        rel: 'http://ostatus.org/schema/1.0/subscribe',
        template: 'https://mastodon.social/authorize_interaction?uri={uri}',
      },
      {
        rel: 'https://w3id.org/fep/3b86/Create',
        template: 'https://mastodon.social/share?text={content}',
      },
      {
        rel: 'https://w3id.org/fep/3b86/Object',
        template: 'https://mastodon.social/authorize_interaction?uri={object}',
      },
      {
        rel: 'http://webfinger.net/rel/avatar',
        type: 'image/png',
        href: 'https://files.mastodon.social/accounts/avatars/116/039/738/772/915/554/original/f0d086089db68048.png',
      },
    ],
  };

  return new Response(JSON.stringify(webfinger), {
    headers: {
      'Content-Type': 'application/jrd+json',
    },
  });
};
