// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

// Astro is the "hybrid": static + fast by default, with React islands for
// interactive features (lightbox, filters, contact form) added incrementally.
// Output stays static for now — Vercel auto-detects and deploys the build.
// When a feature needs a server (forms, on-demand rendering), add
// `@astrojs/vercel` and switch `output` to "server".
export default defineConfig({
  site: "https://owenmccullumphoto.com",
  integrations: [react()],
  image: {
    // Generate modern, well-compressed formats from the source JPEGs.
    responsiveStyles: true,
  },
});
