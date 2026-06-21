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

## AVIF Minification

The site's home page includes an inline base64 2.5 KB AVIF photo of `src/assets/ethan-hawksley.png`. To generate it, install the following packages and run the corresponding one-liner.


```sh
sudo dnf install ImageMagick libavif-tools

magick src/assets/ethan-hawksley.png -filter LanczosSharp -resize 120x120 /tmp/r.png; low=0; high=63; best=63; while (( low <= high )); do mid=$(( (low + high) / 2 )); avifenc --min $mid --max $mid --speed 0 --yuv 420 /tmp/r.png /tmp/t.avif 2>/dev/null; size=$(stat -c%s /tmp/t.avif); if (( size <= 2560 )); then best=$mid; high=$(( mid - 1 )); else low=$(( mid + 1 )); fi; done; avifenc --min $best --max $best --speed 0 --yuv 420 /tmp/r.png src/assets/ethan-hawksley-120.avif && echo "Done: quantizer=$best, $(stat -c%s output.avif) bytes"
```

## License

Code is licensed under MIT.

Blog posts and written content are licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

Code snippets embedded within blog posts are licensed under MIT.

Personal branding, logos, and photographs are All Rights Reserved (see the NOTICE file). Please remove these if you fork the repository.
