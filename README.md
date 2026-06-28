# hawksley.dev

I'm Ethan Hawksley, a CS student with a focus on systems and cybersecurity.

This repository hosts the source code for my personal portfolio and technical blog.

**[Ethan Hawksley's portfolio & blog](https://hawksley.dev)**

## Features

- JS-free by default, progressively enhanced
- 100/100 Google PageSpeed score
- Light/dark mode, zero FOUC
- JSON-LD structured data on every page
- Automatic OG image generation
- Full-content RSS and JSON feeds

## Tech Stack

| Tool          | Purpose                                                                     |
| ------------- | --------------------------------------------------------------------------- |
| Astro         | Has excellent performance and SEO with a no-JS-by-default approach          |
| pnpm          | Fast package manager that reduces node_modules bloat through symlinks       |
| Zod           | Ensures all posts and projects have appropriate metadata before publication |
| AstroCompress | Minifies the built assets                                                   |
| Marked        | Converts Markdown to HTML for the RSS and JSON feeds                        |
| Satori        | Renders custom OG images as SVGs                                            |
| resvg-js      | Converts OG image SVGs to PNGs                                              |
| Sharp         | Finally converts OG image PNGs to compressed JPEGs                          |

## Running Locally

Requires [Node.js 22+](https://nodejs.org) and [pnpm](https://pnpm.io).

```shell
git clone https://github.com/ethan-hawksley/ethan-hawksley.github.io
cd ethan-hawksley.github.io
pnpm install
pnpm run dev
```

Then open `http://localhost:4321` in your browser.

## Font Subsetting

The site uses a subsetted version of the IBM Plex Sans and Mono fonts for increased performance. These are both available for download on Google Fonts.

To subset:

- Install fonttools
  - `sudo dnf install fonttools`
  - `sudo apt install fonttools`
- Download ibm-plex-sans.ttf and ibm-plex-mono.ttf from Google Fonts
- Place both in the project root
- Run `bash scripts/subset-fonts.sh`
- Generated fonts will be placed in `public/fonts`

## AVIF Minification

The site's home page includes an inline base64 2.5 KB AVIF photo of `src/assets/ethan-hawksley.png`.

To generate it:

- Install ImageMagick and libavif-tools
  - `sudo dnf install ImageMagick libavif-tools`
  - `sudo apt install imagemagick libavif-bin`
- Run `bash scripts/gen-avif.sh`
- Generated AVIF will be placed in `src/assets`

## License

Code is licensed under MIT.

Blog posts and written content are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Code snippets embedded within blog posts are licensed under MIT.

Personal branding, logos, and photographs are All Rights Reserved (see the NOTICE file). Please remove these if you fork the repository.
