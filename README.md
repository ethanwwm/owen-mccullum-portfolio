# Owen McCullum — Photography Portfolio

Documentary & street photography portfolio for Owen McCullum (Washington, D.C.).

Built with [Astro](https://astro.build) + a React integration. Astro ships zero
JavaScript by default (fast, photo-first), while React "islands" can be added
for interactive features (lightbox, filters, contact form) as the site grows.

## Stack

- **Astro 5** — static site generation, component model, build-time image optimization
- **React 19** — available as islands for interactive features (not yet used)
- **sharp** — image compression to responsive WebP at build time
- Deployed to **Vercel** (auto-detected; static output)

## Develop

```bash
npm install      # once
npm run dev      # local dev server at http://localhost:4321
npm run build    # production build into dist/
npm run preview  # preview the production build locally
```

## Project structure

```
src/
  assets/
    hero.jpg, portrait.jpg     # standalone images
    photos/                    # gallery images (optimized at build time)
  components/                  # Header, Hero, Gallery, About, Footer
  data/photos.ts              # gallery data (titles, locations, layout)
  layouts/BaseLayout.astro    # <head>, fonts, global styles
  pages/index.astro           # the page
  styles/global.css           # all styling
```

## Adding a photo

1. Drop the image file into `src/assets/photos/`.
2. Add an entry to the `photos` array in [`src/data/photos.ts`](src/data/photos.ts):
   ```ts
   { file: "new-photo.jpg", title: "Title", location: "D.C. — 2025", span: 6, shape: "land" }
   ```
   - `span`: `4`, `6`, or `12` columns (out of 12)
   - `shape`: `"land"` (3:2), `"port"` (3:4), or `"feature"` (16:7)

Astro generates compressed, responsive WebP variants automatically — images
live in the repo and deploy with the site; nothing to manage separately.

## Deploy

Push to GitHub and import the repo in Vercel. Vercel auto-detects Astro and
deploys on every push. No configuration needed for the current static setup.

When a feature needs a server (e.g. a contact form), install `@astrojs/vercel`
and set `output: "server"` in `astro.config.mjs`.

---

The original single-file build is kept locally in `_reference/` (gitignored).
