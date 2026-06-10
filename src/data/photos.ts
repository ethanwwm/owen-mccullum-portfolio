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
export const photos: Photo[] = [
  // ── 01 · Portraits ────────────────────────────────────────────────
  { file: "face-paint.jpg", title: "Face paint", location: "Washington, D.C. — 2025", series: "portraits", span: 12, shape: "feature" },
  { file: "flag-vendor.jpg", title: "Flag vendor", location: "D.C. — 2025", series: "portraits", span: 4, shape: "port" },
  { file: "corner-sermon.jpg", title: "Corner sermon", location: "D.C. — 2025", series: "portraits", span: 4, shape: "port" },
  { file: "the-other-camera.jpg", title: "The other camera", location: "D.C. — 2025", series: "portraits", span: 4, shape: "port" },
  { file: "the-interview.jpg", title: "The interview", location: "D.C. — 2025", series: "portraits", span: 6, shape: "land" },
  { file: "good-boy.jpg", title: "Good boy", location: "WorldPride — 2025", series: "portraits", span: 6, shape: "land" },

  // ── 02 · Streets ──────────────────────────────────────────────────
  { file: "on-the-rail.jpg", title: "On the rail", location: "WorldPride, D.C. — 2025", series: "streets", span: 12, shape: "feature" },
  { file: "on-15th-street.jpg", title: "On 15th Street", location: "D.C. — 2025", series: "streets", span: 6, shape: "land" },
  { file: "cold-snap.jpg", title: "Cold snap", location: "D.C. — 2025", series: "streets", span: 6, shape: "land" },
  { file: "among-the-signs.jpg", title: "Among the signs", location: "D.C. — 2025", series: "streets", span: 4, shape: "port" },
  { file: "jesus-saves.jpg", title: "Jesus Saves", location: "D.C. — 2025", series: "streets", span: 4, shape: "port" },
  { file: "at-the-court.jpg", title: "At the Court", location: "Washington, D.C. — 2025", series: "streets", span: 4, shape: "port" },
  { file: "parked.jpg", title: "Parked", location: "Washington, D.C. — 2025", series: "streets", span: 12, shape: "feature" },
  { file: "worldpride.jpg", title: "WorldPride", location: "D.C. — 2025", series: "streets", span: 6, shape: "land" },
  { file: "float.jpg", title: "Float", location: "WorldPride — 2025", series: "streets", span: 6, shape: "land" },
  { file: "after-hours.jpg", title: "After hours", location: "D.C. — 2025", series: "streets", span: 6, shape: "land" },
  { file: "front-row.jpg", title: "Front row", location: "WorldPride — 2025", series: "streets", span: 6, shape: "land" },
  { file: "afterparty.jpg", title: "Afterparty", location: "D.C. — 2025", series: "streets", span: 12, shape: "feature" },
];

/** Photos for one series, in display order. */
export function photosBySeries(id: SeriesId): Photo[] {
  return photos.filter((p) => p.series === id);
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
