export const profileSections = [
  {
    title: 'Development',
    links: [
      {
        name: 'GitHub',
        url: 'https://github.com/ethan-hawksley',
      },
      {
        name: 'Codeberg',
        url: 'https://codeberg.org/ethanhawksley',
      },
      {
        name: 'GitLab',
        url: 'https://gitlab.com/ethanhawksley',
      },
      {
        name: 'Stack Overflow',
        url: 'https://stackoverflow.com/users/27157731/ethan-hawksley',
      },
      {
        name: 'LeetCode',
        url: 'https://leetcode.com/u/ethan-hawksley/',
      },
      {
        name: 'crates.io',
        url: 'https://crates.io/users/ethan-hawksley',
      },
      {
        name: 'itch.io',
        url: 'https://ethanhawksley.itch.io',
      },
      {
        name: 'Gravatar',
        url: 'https://gravatar.com/ethanhawksley',
      },
    ],
  },
  {
    title: 'Socials',
    links: [
      {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/ethanhawksley/',
      },
      {
        name: 'Bluesky',
        url: 'https://bsky.app/profile/hawksley.dev',
      },
      {
        name: 'Mastodon',
        url: 'https://mastodon.social/@ethanhawksley',
      },
      {
        name: 'X (Twitter)',
        url: 'https://x.com/Ethan_Hawksley',
      },
      {
        name: 'YouTube',
        url: 'https://www.youtube.com/@Ethan-Hawksley',
      },
      {
        name: 'Reddit',
        url: 'https://www.reddit.com/user/ethanhawksley/',
      },
      {
        name: 'Instagram',
        url: 'https://www.instagram.com/ethan.hawksley/',
      },
    ],
  },
  {
    title: 'Security',
    links: [
      {
        name: 'TryHackMe',
        url: 'https://tryhackme.com/p/ethanhawksley',
      },
      {
        name: 'Hack The Box',
        url: 'https://app.hackthebox.com/public/users/3608157',
      },
      {
        name: 'HackerOne',
        url: 'https://hackerone.com/ethanhawksley',
      },
    ],
  },
  {
    title: 'Writing',
    links: [
      {
        name: 'ORCID',
        url: 'https://orcid.org/0009-0005-6663-0640',
      },
      {
        name: 'DEV Community',
        url: 'https://dev.to/ethanhawksley',
      },
      {
        name: 'Hashnode',
        url: 'https://hashnode.com/@ethanhawksley',
      },
      {
        name: 'Medium',
        url: 'https://medium.com/@ethan-hawksley',
      },
      {
        name: 'Lobsters',
        url: 'https://lobste.rs/~ethanhawksley',
      },
      {
        name: 'Hacker News',
        url: 'https://news.ycombinator.com/user?id=ethanhawksley',
      },
    ],
  },
];

export const allProfileLinks = profileSections.flatMap(
  (section) => section.links,
);

export const allProfileUrls = allProfileLinks.map((link) => link.url);
