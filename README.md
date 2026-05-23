# hawksley.dev

I'm Ethan Hawksley, a CS student with a focus on systems and cybersecurity.

This repository hosts the source code for my personal portfolio & technical blog.

**[Ethan Hawksley's portfolio & blog](https://hawksley.dev)**

---

## Features

- Perfect 100/100 Google PageSpeed score
- Mobile-first responsive design
- Progressive enhancement using the latest CSS features
- Optional JavaScript improvement
- Light & Dark mode

## Tech Stack

| Tool       | Purpose                                                               |
| ---------- | --------------------------------------------------------------------- |
| Astro      | Has excellent performance and SEO with a no-JS-by-default approach    |
| TypeScript | Catches subtle type errors before compiling and running the code      |
| Zod        | Ensures all posts have appropriate metadata                           |
| MDX        | Enables rich markup where required, whilst still supporting markdown  |
| pnpm       | Fast package manager that reduces node_modules bloat through symlinks |

## Running Locally

Requires [pnpm](https://pnpm.io/).

```shell
git clone https://github.com/ethan-hawksley/ethan-hawksley.github.io
cd ethan-hawksley.github.io
pnpm i
pnpm run dev
```

Then open `http://localhost:4321` in your browser.

## Font Subsetting

The site uses a subsetted version of the IBM Plex Sans and Mono fonts for increased performance. These are both available for download on Google Fonts.

To subset:

```
uv tool install pyftsubset

pyftsubset IBMPlexSans.ttf \
--output-file="IBMSans-Subset.woff2" \
--flavor="woff2" \
--unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2190-2193,U+21A9,U+2212,U+2215,U+FEFF,U+FFFD" \
--layout-features="*" \
--no-hinting \
--desubroutinize
```

Do the same but with IBM Plex Mono as well to have both fully subsetted fonts.

## License

Code is licensed under MIT.

Blog posts and written content are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Code snippets embedded within blog posts are licensed under MIT.

Personal branding, logos, and photographs are All Rights Reserved (see the NOTICE file). Please remove these if you fork the repository.
