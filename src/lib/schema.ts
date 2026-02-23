export const websiteSchema = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  alternateName: ['hawksley.dev', 'Hawksley'],
  description:
    'Portfolio and technical blog of Ethan Hawksley, a UK-based CS student and developer building tools with Rust and JavaScript.',
  publisher: { '@id': 'https://hawksley.dev/#person' },
  inLanguage: 'en-GB',
} as const;

export const personSchema = {
  '@type': 'Person',
  '@id': 'https://hawksley.dev/#person',
  name: 'Ethan Hawksley',
  alternateName: 'Hawksley',
  url: 'https://hawksley.dev/',
  jobTitle: 'Software Developer',
  description:
    'UK-based CS Student and Software Developer specializing in Rust and JavaScript.',
  disambiguatingDescription:
    'Computer Science student and Rust/JavaScript software developer from the United Kingdom',
  image: {
    '@type': 'ImageObject',
    '@id': 'https://hawksley.dev/#avatar',
    url: 'https://hawksley.dev/avatar-1200x1200.png',
    caption: 'Ethan Hawksley',
    width: 1200,
    height: 1200,
  },
  email: 'ethan@hawksley.dev',
  gender: 'Male',
  nationality: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  knowsLanguage: ['English'],
  sameAs: [
    'https://github.com/ethan-hawksley',
    'https://www.linkedin.com/in/ethan-hawksley',
    'https://x.com/Ethan_Hawksley',
    'https://mastodon.social/@ethanhawksley',
    'https://bsky.app/profile/ethanhawksley.bsky.social',
  ],
  knowsAbout: [
    {
      '@type': 'Thing',
      name: 'Rust (programming language)',
      sameAs: 'https://en.wikipedia.org/wiki/Rust_(programming_language)',
    },
    {
      '@type': 'Thing',
      name: 'JavaScript',
      sameAs: 'https://en.wikipedia.org/wiki/JavaScript',
    },
    {
      '@type': 'Thing',
      name: 'Linux',
      sameAs: 'https://en.wikipedia.org/wiki/Linux',
    },
    {
      '@type': 'Thing',
      name: 'Web Development',
      sameAs: 'https://en.wikipedia.org/wiki/Web_development',
    },
  ],
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'Alcester Grammar School',
    sameAs: [
      'https://www.alcestergs.co.uk/',
      'https://en.wikipedia.org/wiki/Alcester_Grammar_School',
    ],
  },
  homeLocation: {
    '@type': 'Place',
    name: 'United Kingdom',
  },
} as const;
