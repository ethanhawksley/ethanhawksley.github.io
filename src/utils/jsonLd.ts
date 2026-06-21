import { allProfileUrls } from './profiles';

export const websiteJsonLd = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  alternateName: ['hawksley.dev', 'Hawksley'],
  description:
    'The personal site and technical blog of Ethan Hawksley, a UK-based CS student with a focus on systems programming, low-level computing, and cybersecurity.',
  inLanguage: 'en-GB',
  publisher: { '@id': 'https://hawksley.dev/#person' },
  image: {
    '@type': 'ImageObject',
    '@id': 'https://hawksley.dev/#website-image',
    url: 'https://hawksley.dev/ethan-hawksley-monogram-square.png',
    caption: 'Ethan Hawksley Monogram',
  },
} as const;

export const personJsonLd = {
  '@type': 'Person',
  '@id': 'https://hawksley.dev/#person',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
  alternateName: 'ethanhawksley',
  givenName: 'Ethan',
  familyName: 'Hawksley',
  description:
    'UK-based CS student focused on systems programming and cybersecurity.',
  disambiguatingDescription:
    'CS student & systems/cybersecurity enthusiast, UK',
  jobTitle: 'Computer Science Student',
  knowsLanguage: 'en-GB',
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
      addressLocality: 'Warwick',
      addressRegion: 'Warwickshire',
      addressCountry: 'GB',
    },
  },
  affiliation: {
    '@type': 'HighSchool',
    url: 'https://www.alcestergs.co.uk/',
    name: 'Alcester Grammar School',
    sameAs: [
      'https://www.wikidata.org/wiki/Q4713005',
      'https://en.wikipedia.org/wiki/Alcester_Grammar_School',
    ],
  },
  alumniOf: [
    {
      '@type': 'HighSchool',
      url: 'https://www.brookeweston.org/',
      name: 'Brooke Weston Academy',
      sameAs: [
        'https://www.wikidata.org/wiki/Q4974495',
        'https://en.wikipedia.org/wiki/Brooke_Weston_Academy',
      ],
    },
  ],
  image: {
    '@type': 'ImageObject',
    '@id': 'https://hawksley.dev/#person-image',
    url: 'https://hawksley.dev/ethan-hawksley.png',
    caption: 'Ethan Hawksley',
    width: 1200,
    height: 1200,
  },
  sameAs: allProfileUrls,
} as const;

export const websiteRef = {
  '@type': 'WebSite',
  '@id': 'https://hawksley.dev/#website',
  url: 'https://hawksley.dev/',
  name: 'Ethan Hawksley',
} as const;
