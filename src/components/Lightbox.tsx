import { useCallback, useEffect, useState } from "react";

export interface LightboxImage {
  src: string;
  title: string;
  location: string;
  width: number;
  height: number;
}

interface Props {
  images: LightboxImage[];
}

/**
 * Full-screen viewer that treats each photograph as an art piece:
 * dark "gallery wall" backdrop, museum placard caption, keyboard
 * navigation, and a calm fade/scale transition.
 *
 * Opens in response to a window `lightbox:open` CustomEvent carrying
 * `{ index }` — dispatched by the gallery plate buttons. This keeps the
 * grid server-rendered by Astro while React owns only the overlay.
 */
export default function Lightbox({ images }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  // Listen for open requests from the gallery plates.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<{ index: number }>).detail;
      if (detail && Number.isInteger(detail.index)) setIndex(detail.index);
    };
    window.addEventListener("lightbox:open", onOpen as EventListener);
    return () => window.removeEventListener("lightbox:open", onOpen as EventListener);
  }, []);

  // Keyboard controls + body scroll lock while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, prev, next]);

  if (!open) return null;
  const img = images[index!];

  return (
    <div
      class="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${img.title}, ${img.location}`}
      onClick={close}
    >
      <button class="lb-close" aria-label="Close" onClick={close}>
        ✕
      </button>

      <button
        class="lb-nav lb-prev"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
      >
        ←
      </button>

      <figure class="lb-stage" onClick={(e) => e.stopPropagation()}>
        <img
          class="lb-img"
          src={img.src}
          alt={img.title}
          width={img.width}
          height={img.height}
          // re-trigger the entrance transition on each navigation
          key={img.src}
        />
        <figcaption class="lb-cap">
          <span class="lb-title">{img.title}</span>
          <span class="lb-meta">
            {img.location} · Archival pigment print
          </span>
          <span class="lb-count">
            {index! + 1} / {images.length}
          </span>
        </figcaption>
      </figure>

      <button
        class="lb-nav lb-next"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
      >
        →
      </button>
    </div>
  );
}
