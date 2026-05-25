export const websiteSchema = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  alternateName: ['hawksley.dev', 'Hawksley'],
  description:
    'The personal site and technical blog of Ethan Hawksley, a UK-based CS student with a focus on systems programming, low-level computing, and cybersecurity.',
  publisher: { '@id': 'https://hawksley.dev/#person' },
  inLanguage: 'en-GB',
} as const;

export const personSchema = {
  '@type': 'Person',
  '@id': 'https://hawksley.dev/#person',
  name: 'Ethan Hawksley',
  givenName: 'Ethan',
  familyName: 'Hawksley',
  url: 'https://hawksley.dev/',
  jobTitle: 'CS Student',
  description:
    'UK-based CS student focused on systems programming and cybersecurity.',
  disambiguatingDescription:
    'CS student & systems/cybersecurity enthusiast, UK',
  image: {
    '@type': 'ImageObject',
    '@id': 'https://hawksley.dev/#author-image',
    url: 'https://hawksley.dev/avatar-1200x1200.png',
    caption: 'Ethan Hawksley',
    width: 1200,
    height: 1200,
  },
  gender: 'https://schema.org/Male',
  nationality: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  knowsLanguage: 'en-GB',
  knowsAbout: [
    'Systems Programming',
    'Cybersecurity',
    'Low-Level Computing',
    'Computer Science',
  ],
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  },
  sameAs: [
    'https://orcid.org/0009-0005-6663-0640',
    'https://github.com/ethan-hawksley',
    'https://www.linkedin.com/in/ethan-hawksley',
    'https://x.com/Ethan_Hawksley',
    'https://bsky.app/profile/hawksley.dev',
    'https://mastodon.social/@ethanhawksley',
    'https://ethanhawksley.itch.io',
  ],
} as const;

export const personRef = {
  '@type': 'Person',
  '@id': 'https://hawksley.dev/#person',
  name: 'Ethan Hawksley',
  url: 'https://hawksley.dev/',
  image: {
    '@type': 'ImageObject',
    '@id': 'https://hawksley.dev/#author-image',
    url: 'https://hawksley.dev/avatar-1200x1200.png',
  },
  sameAs: [
    'https://orcid.org/0009-0005-6663-0640',
    'https://github.com/ethan-hawksley',
    'https://www.linkedin.com/in/ethan-hawksley',
    'https://x.com/Ethan_Hawksley',
    'https://mastodon.social/@ethanhawksley',
    'https://bsky.app/profile/hawksley.dev',
  ],
} as const;

export const websiteRef = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  name: 'Ethan Hawksley',
  url: 'https://hawksley.dev/',
} as const;
