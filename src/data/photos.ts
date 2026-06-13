import type { ImageMetadata } from "astro";

/**
 * The gallery is data-driven. To add a photo:
 *   1. Drop the file into `src/assets/photos/`
 *   2. Add an entry below (the `file` is the filename, no path)
 * Astro compresses/optimizes every referenced image at build time.
 */

export type PhotoSpan = 4 | 6 | 12;
export type PhotoShape = "land" | "port" | "feature" | "square";
export type SeriesId = "assembly" | "portraits" | "square" | "stillness";

export interface Photo {
  /** Filename inside src/assets/photos */
  file: string;
  title: string;
  location: string;
  /** Which section of the gallery this photograph belongs to */
  series: SeriesId;
  /** Grid columns to span (out of 12) */
  span: PhotoSpan;
  /** Aspect-ratio treatment */
  shape: PhotoShape;
  /** Available as a print (only photographs with no identifiable likeness) */
  print?: boolean;
}

export interface Series {
  id: SeriesId;
  /** Display index, museum-wing style (01, 02, …) */
  index: string;
  title: string;
  /** One-line curatorial note */
  note: string;
}

/** The bodies of work, in display order. */
export const series: Series[] = [
  { id: "assembly", index: "01", title: "Assembly", note: "Public life in the capital — the parade, the barricade, the crowd at full volume." },
  { id: "portraits", index: "02", title: "Portraits", note: "People met at arm's length — a gesture, a held gaze, a face turned to the light." },
  { id: "square", index: "03", title: "The Square", note: "Belief and dissent in the open air — the flag, the sign, the word on the Mall." },
  { id: "stillness", index: "04", title: "Stillness", note: "The city between events — stone, solitude, and the long quiet." },
];

// Order within each section is the on-page order. Titles and classifications
// were derived from the photographs themselves (vision pass + adversarial
// verification) — locations are kept general where the frame doesn't prove a
// specific place. Photographs with any identifiable likeness are not offered
// as prints.
export const photos: Photo[] = [
  // ── 01 · Assembly ────────────────────────────────────────────
  { file: "phones-at-dusk.jpg", title: "Phones at Dusk",    location: "Washington, D.C. — 2025",series: "assembly",     span: 12, shape: "feature"   },
  { file: "good-boy.jpg",       title: "Good Boy",          location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"     , print: true },
  { file: "bubbles.jpg",        title: "Bubbles",           location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"      },
  { file: "at-the-barricade.jpg",title: "At the Barricade",  location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"      },
  { file: "spectators.jpg",     title: "Spectators",        location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"      },
  { file: "painted.jpg",        title: "Painted",           location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"      },
  { file: "close-press.jpg",    title: "Close Press",       location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"     , print: true },
  { file: "aerialist.jpg",      title: "Aerialist",         location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"      },
  { file: "after-dark.jpg",     title: "After Dark",        location: "Washington, D.C. — 2025",series: "assembly",     span: 6,  shape: "land"      },
  { file: "the-rail.jpg",       title: "The Rail",          location: "Washington, D.C. — 2025",series: "assembly",     span: 4,  shape: "port"      },
  { file: "reach.jpg",          title: "Reach",             location: "Washington, D.C. — 2025",series: "assembly",     span: 4,  shape: "port"      },
  { file: "the-mic.jpg",        title: "The Mic",           location: "Washington, D.C. — 2025",series: "assembly",     span: 4,  shape: "port"      },
  { file: "in-costume.jpg",     title: "In Costume",        location: "Washington, D.C. — 2025",series: "assembly",     span: 4,  shape: "port"      },

  // ── 02 · Portraits ───────────────────────────────────────────
  { file: "repose.jpg",         title: "Repose",            location: "Washington, D.C. — 2025",series: "portraits",    span: 12, shape: "feature"   },
  { file: "in-navy.jpg",        title: "In Navy",           location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "steady-gaze.jpg",    title: "Steady Gaze",       location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "looking-up.jpg",     title: "Looking Up",        location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "the-chair.jpg",      title: "The Chair",         location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "the-lean.jpg",       title: "The Lean",          location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "warm-light.jpg",     title: "Warm Light",        location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "adorned.jpg",        title: "Adorned",           location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "sunlight.jpg",       title: "Sunlight",          location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },
  { file: "the-matriarch.jpg",  title: "The Matriarch",     location: "Washington, D.C. — 2025",series: "portraits",    span: 4,  shape: "port"      },

  // ── 03 · The Square ──────────────────────────────────────────
  { file: "veteran.jpg",        title: "Veteran",           location: "Washington, D.C. — 2025",series: "square",       span: 12, shape: "feature"   },
  { file: "the-word.jpg",       title: "The Word",          location: "Washington, D.C. — 2025",series: "square",       span: 6,  shape: "land"      },
  { file: "flags.jpg",          title: "Flags",             location: "Washington, D.C. — 2025",series: "square",       span: 4,  shape: "port"      },
  { file: "her-choice.jpg",     title: "Her Choice",        location: "Washington, D.C. — 2025",series: "square",       span: 4,  shape: "port"      },
  { file: "red-cap.jpg",        title: "Red Cap",           location: "Washington, D.C. — 2025",series: "square",       span: 4,  shape: "port"      },

  // ── 04 · Stillness ───────────────────────────────────────────
  { file: "red-steps.jpg",      title: "Red Steps",         location: "Washington, D.C. — 2025",series: "stillness",    span: 12, shape: "feature"  , print: true },
  { file: "two-profiles.jpg",   title: "Two Profiles",      location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "square"   , print: true },
  { file: "at-the-wall.jpg",    title: "At the Wall",       location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "the-wall.jpg",       title: "The Wall",          location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "the-bench.jpg",      title: "The Bench",         location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "red-stair.jpg",      title: "Red Stair",         location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "the-suit.jpg",       title: "The Suit",          location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "watched.jpg",        title: "Watched",           location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "solitude.jpg",       title: "Solitude",          location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "sky.jpg",            title: "Sky",               location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"     , print: true },
  { file: "rest.jpg",           title: "Rest",              location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "on-the-grass.jpg",   title: "On the Grass",      location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "past-the-fence.jpg", title: "Past the Fence",    location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "the-crossing.jpg",   title: "The Crossing",      location: "Washington, D.C. — 2025",series: "stillness",    span: 6,  shape: "land"      },
  { file: "child-and-cat.jpg",  title: "Child and Cat",     location: "Washington, D.C. — 2025",series: "stillness",    span: 4,  shape: "port"      },
];

/** Photos for one section, in display order. */
export function photosBySeries(id: SeriesId): Photo[] {
  return photos.filter((p) => p.series === id);
}

/** Photos available as prints (no identifiable likeness). */
export function printPhotos(): Photo[] {
  return photos.filter((p) => p.print);
}

/**
 * Eagerly import every image in src/assets/photos so each `Photo.file`
 * resolves to optimizable Astro `ImageMetadata`.
 */
const imageModules = import.meta.glob<{ default: ImageMetadata }>(
  "../assets/photos/*.{jpg,jpeg,png,webp,avif}",
  { eager: true },
);

const imageMap: Record<string, ImageMetadata> = {};
for (const [path, mod] of Object.entries(imageModules)) {
  const name = path.split("/").pop()!;
  imageMap[name] = mod.default;
}

export function getPhotoImage(file: string): ImageMetadata {
  const img = imageMap[file];
  if (!img) {
    throw new Error(
      `Photo "${file}" listed in photos.ts but not found in src/assets/photos/`,
    );
  }
  return img;
}
