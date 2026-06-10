import type { ImageMetadata } from "astro";

/**
 * The gallery is data-driven. To add a photo:
 *   1. Drop the file into `src/assets/photos/`
 *   2. Add an entry below (the `file` is the filename, no path)
 * Astro compresses/optimizes every referenced image at build time.
 */

export type PhotoSpan = 4 | 6 | 12;
export type PhotoShape = "land" | "port" | "feature";

export interface Photo {
  /** Filename inside src/assets/photos */
  file: string;
  title: string;
  location: string;
  /** Grid columns to span (out of 12) */
  span: PhotoSpan;
  /** Aspect-ratio treatment */
  shape: PhotoShape;
}

export const photos: Photo[] = [
  { file: "face-paint.jpg", title: "Face paint", location: "Washington, D.C. — 2025", span: 12, shape: "feature" },
  { file: "on-15th-street.jpg", title: "On 15th Street", location: "D.C. — 2025", span: 6, shape: "land" },
  { file: "the-interview.jpg", title: "The interview", location: "D.C. — 2025", span: 6, shape: "land" },
  { file: "jesus-saves.jpg", title: "Jesus Saves", location: "D.C. — 2025", span: 4, shape: "port" },
  { file: "among-the-signs.jpg", title: "Among the signs", location: "D.C. — 2025", span: 4, shape: "port" },
  { file: "flag-vendor.jpg", title: "Flag vendor", location: "D.C. — 2025", span: 4, shape: "port" },
  { file: "corner-sermon.jpg", title: "Corner sermon", location: "D.C. — 2025", span: 6, shape: "land" },
  { file: "cold-snap.jpg", title: "Cold snap", location: "D.C. — 2025", span: 6, shape: "land" },
  { file: "parked.jpg", title: "Parked", location: "Washington, D.C. — 2025", span: 12, shape: "feature" },
  { file: "the-other-camera.jpg", title: "The other camera", location: "D.C. — 2025", span: 6, shape: "land" },
  { file: "after-hours.jpg", title: "After hours", location: "D.C. — 2025", span: 6, shape: "land" },
  { file: "at-the-court.jpg", title: "At the Court", location: "Washington, D.C. — 2025", span: 6, shape: "land" },
  { file: "worldpride.jpg", title: "WorldPride", location: "D.C. — 2025", span: 6, shape: "land" },
  { file: "on-the-rail.jpg", title: "On the rail", location: "WorldPride, D.C. — 2025", span: 12, shape: "feature" },
  { file: "float.jpg", title: "Float", location: "WorldPride — 2025", span: 6, shape: "land" },
  { file: "front-row.jpg", title: "Front row", location: "WorldPride — 2025", span: 6, shape: "land" },
  { file: "good-boy.jpg", title: "Good boy", location: "WorldPride — 2025", span: 6, shape: "land" },
  { file: "afterparty.jpg", title: "Afterparty", location: "D.C. — 2025", span: 6, shape: "land" },
];

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
