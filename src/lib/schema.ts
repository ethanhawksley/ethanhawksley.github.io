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
  image: 'https://hawksley.dev/logo_round.png',
  sameAs: [
    'https://github.com/ethan-hawksley',
    'https://www.linkedin.com/in/ethan-hawksley',
    'https://x.com/Ethan_Hawksley',
    'https://mastodon.social/@ethanhawksley',
  ],
  knowsAbout: ['Rust', 'JavaScript', 'Linux', 'Web Development'],
  homeLocation: {
    '@type': 'Place',
    name: 'United Kingdom',
  },
} as const;
