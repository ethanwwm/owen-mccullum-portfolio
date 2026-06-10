import { useCallback, useEffect, useRef, useState } from "react";

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
 * Full-screen viewer that presents each photograph as a framed print:
 * a white mat (deeper at the bottom for a museum placard caption) on a dark
 * gallery-wall backdrop. Keyboard + swipe navigation, scroll lock.
 *
 * Opens from a window `lightbox:open` CustomEvent ({ index }) dispatched by
 * the gallery plate buttons, so the grid stays server-rendered by Astro.
 */
export default function Lightbox({ images }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const [vp, setVp] = useState({ w: 1280, h: 800 });
  // `entered` gates the entrance animation: on a fresh open we wait for the
  // image to finish loading before revealing, so it transitions in rather than
  // snapping. Left/right navigation keeps `entered` true → instant swap.
  const [entered, setEntered] = useState(false);
  const open = index !== null;
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    setEntered(false);
  }, []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [images.length],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [images.length],
  );

  // Open requests from the gallery plates. A fresh open resets `entered` so we
  // wait for the image before animating in.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const d = (e as CustomEvent<{ index: number }>).detail;
      if (d && Number.isInteger(d.index)) {
        setEntered(false);
        setIndex(d.index);
      }
    };
    window.addEventListener("lightbox:open", onOpen as EventListener);
    return () => window.removeEventListener("lightbox:open", onOpen as EventListener);
  }, []);

  // If the freshly-shown image is already cached, reveal immediately.
  useEffect(() => {
    if (index !== null && imgRef.current?.complete) setEntered(true);
  }, [index]);

  // Track viewport so the mat can be sized to fit the photo.
  useEffect(() => {
    const measure = () =>
      setVp({
        w: document.documentElement.clientWidth || window.innerWidth,
        h: document.documentElement.clientHeight || window.innerHeight,
      });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
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

  // Size the photo to fit the viewport, then frame it with an even white mat.
  const isPhone = vp.w < 700;
  const frame = isPhone ? 12 : 18; // top/left/right border
  const capH = isPhone ? 78 : 96; // reserved height for the caption block
  const maxCardW = Math.min(vp.w * 0.94, 1180);
  const availW = maxCardW - frame * 2;
  const availH = vp.h * 0.9 - frame - capH;
  const scale = Math.min(availW / img.width, availH / img.height, 1);
  const dispW = Math.max(1, Math.round(img.width * scale));
  const dispH = Math.max(1, Math.round(img.height * scale));

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
        ‹
      </button>

      <figure
        class={`lb-card${entered ? " entered" : ""}`}
        style={{ width: `${dispW + frame * 2}px`, padding: `${frame}px ${frame}px 0` }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          const t = e.touches[0];
          touchStart.current = { x: t.clientX, y: t.clientY };
        }}
        onTouchEnd={(e) => {
          const s = touchStart.current;
          touchStart.current = null;
          if (!s) return;
          const t = e.changedTouches[0];
          const dx = t.clientX - s.x;
          const dy = t.clientY - s.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) next();
            else prev();
          }
        }}
      >
        <img
          class="lb-img"
          key={img.src}
          ref={imgRef}
          src={img.src}
          alt={img.title}
          width={img.width}
          height={img.height}
          style={{ width: `${dispW}px`, height: `${dispH}px` }}
          onLoad={() => setEntered(true)}
          onError={() => setEntered(true)}
        />
        <figcaption class="lb-cap">
          <span class="lb-title">{img.title}</span>
          <span class="lb-meta">{img.location} · Archival pigment print</span>
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
        ›
      </button>
    </div>
  );
}
