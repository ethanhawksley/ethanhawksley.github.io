import { allProfileUrls } from './profiles';

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  alternateName: ['hawksley.dev', 'Hawksley'],
  description:
    'The personal site and technical blog of Ethan Hawksley, a UK-based CS student with a focus on systems programming, low-level computing, and cybersecurity.',
  publisher: { '@id': 'https://hawksley.dev/#person' },
  image: {
    '@type': 'ImageObject',
    '@id': 'https://hawksley.dev/#website-image',
    url: 'https://hawksley.dev/logo-square.png',
    caption: 'Ethan Hawksley Logo',
  },
  inLanguage: 'en-GB',
} as const;

export const personJsonLd = {
  '@type': 'Person',
  '@id': 'https://hawksley.dev/#person',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  givenName: 'Ethan',
  familyName: 'Hawksley',
  description:
    'UK-based CS student focused on systems programming and cybersecurity.',
  disambiguatingDescription:
    'CS student & systems/cybersecurity enthusiast, UK',
  image: {
    '@type': 'ImageObject',
    '@id': 'https://hawksley.dev/#person-image',
    url: 'https://hawksley.dev/avatar-1200x1200.png',
    caption: 'Ethan Hawksley',
    width: 1200,
    height: 1200,
  },
  knowsLanguage: 'en-GB',
  jobTitle: 'Computer Science Student',
  knowsAbout: [
    'Systems Programming',
    'Cybersecurity',
    'Low-Level Computing',
    'Computer Science',
  ],
  nationality: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  homeLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
    },
  },
  affiliation: {
    '@type': 'HighSchool',
    name: 'Alcester Grammar School',
    url: 'https://www.alcestergs.co.uk/',
    sameAs: [
      'https://www.wikidata.org/wiki/Q4713005',
      'https://en.wikipedia.org/wiki/Alcester_Grammar_School',
    ],
  },
  alumniOf: [
    {
      '@type': 'HighSchool',
      name: 'Brooke Weston Academy',
      url: 'https://www.brookeweston.org/',
      sameAs: [
        'https://www.wikidata.org/wiki/Q4974495',
        'https://en.wikipedia.org/wiki/Brooke_Weston_Academy',
      ],
    },
  ],
  sameAs: allProfileUrls,
} as const;

export const websiteRef = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
} as const;
