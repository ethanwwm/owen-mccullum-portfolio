import type { ImageMetadata } from "astro";

/**
 * The gallery is data-driven. To add a photo:
 *   1. Drop the file into `src/assets/photos/`
 *   2. Add an entry below (the `file` is the filename, no path)
 * Astro compresses/optimizes every referenced image at build time.
 */

export type PhotoSpan = 4 | 6 | 12;
export type PhotoShape = "land" | "port" | "feature";
export type SeriesId = "portraits" | "streets";

export interface Photo {
  /** Filename inside src/assets/photos */
  file: string;
  title: string;
  location: string;
  /** Which series this print belongs to */
  series: SeriesId;
  /** Grid columns to span (out of 12) */
  span: PhotoSpan;
  /** Aspect-ratio treatment */
  shape: PhotoShape;
  /** Available as a print (only photos with no identifiable likeness) */
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

/** The two bodies of work, in display order. */
export const series: Series[] = [
  {
    id: "portraits",
    index: "01",
    title: "Portraits",
    note: "The people of the capital — vendors, believers, marchers, and passers-through, met at arm's length.",
  },
  {
    id: "streets",
    index: "02",
    title: "Streets",
    note: "Public life in Washington — rallies, parades, and the ordinary texture of the city.",
  },
];

// Order within each series is the on-page order. Spans are balanced so each
// series grid fills cleanly.
// Captions were swept against the actual images (vision + adversarial
// verification). Notable corrections: "worldpride.jpg" is a Veterans-Against-
// Trump protest at the Supreme Court (no Pride content); the dog and the parade
// float had their "Good boy"/"Float" titles swapped; several others retitled to
// match what's actually shown.
export const photos: Photo[] = [
  // ── 01 · Portraits ────────────────────────────────────────────────
  { file: "face-paint.jpg", title: "Face paint", location: "Washington, D.C. — 2025", series: "portraits", span: 12, shape: "feature" },
  { file: "flag-vendor.jpg", title: "Flag vendor", location: "Washington, D.C. — 2025", series: "portraits", span: 4, shape: "port" },
  { file: "corner-sermon.jpg", title: "Street preachers", location: "Washington, D.C. — 2025", series: "portraits", span: 4, shape: "port" },
  { file: "the-other-camera.jpg", title: "The other camera", location: "Washington, D.C. — 2025", series: "portraits", span: 4, shape: "port" },
  { file: "the-interview.jpg", title: "The interview", location: "Washington, D.C. — 2025", series: "portraits", span: 6, shape: "land" },
  // the dog (was mislabeled "Float") — no identifiable likeness, print-eligible
  { file: "float.jpg", title: "Good boy", location: "WorldPride — 2025", series: "portraits", span: 6, shape: "land", print: true },

  // ── 02 · Streets ──────────────────────────────────────────────────
  { file: "on-the-rail.jpg", title: "On the rail", location: "WorldPride — 2025", series: "streets", span: 12, shape: "feature" },
  { file: "on-15th-street.jpg", title: "On 15th Street", location: "Washington, D.C. — 2025", series: "streets", span: 6, shape: "land" },
  { file: "cold-snap.jpg", title: "Cold snap", location: "Washington, D.C. — 2025", series: "streets", span: 6, shape: "land" },
  { file: "among-the-signs.jpg", title: "Cowboy hat", location: "Washington, D.C. — 2025", series: "streets", span: 4, shape: "port" },
  { file: "jesus-saves.jpg", title: "Jesus Saves", location: "Washington, D.C. — 2025", series: "streets", span: 4, shape: "port" },
  { file: "at-the-court.jpg", title: "My body, my choice", location: "Washington, D.C. — 2025", series: "streets", span: 4, shape: "port" },
  { file: "parked.jpg", title: "Parked", location: "Washington, D.C. — 2025", series: "streets", span: 12, shape: "feature" },
  { file: "worldpride.jpg", title: "Veterans against Trump", location: "Washington, D.C. — 2025", series: "streets", span: 6, shape: "land" },
  // the parade float (was mislabeled "Good boy")
  { file: "good-boy.jpg", title: "Float", location: "WorldPride — 2025", series: "streets", span: 6, shape: "land" },
  { file: "after-hours.jpg", title: "After hours", location: "Washington, D.C. — 2025", series: "streets", span: 6, shape: "land" },
  { file: "front-row.jpg", title: "Front row", location: "WorldPride — 2025", series: "streets", span: 6, shape: "land" },
  { file: "afterparty.jpg", title: "Spectators", location: "WorldPride — 2025", series: "streets", span: 12, shape: "feature" },
];

/** Photos for one series, in display order. */
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
