"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─── Config ─── */
const FRAME_COUNT = 106;
const EXPO_EASE = "cubic-bezier(0.32, 0.72, 0, 1)";

function getFrameSrc(index: number): string {
  return `/assets/video/frames/frame_${String(index).padStart(3, "0")}.jpg`;
}

/* ─── Panel definitions ─── */
interface PanelDef {
  range: [number, number];
  label: string;
  heading: string;
  body?: string;
  cta?: { text: string; href: string };
  scrollHint?: boolean;
}

const PANELS: PanelDef[] = [
  {
    range: [0, 0.28],
    label: "",
    heading: "HIPPOCAMPUS",
    scrollHint: true,
  },
  {
    range: [0.32, 0.63],
    label: "Depuis 2010",
    heading: "L'Art de la Plongée",
    body: "Là où la surface s'efface, un autre monde commence. Silence, apesanteur, émerveillement — chaque immersion est une rencontre avec l'invisible.",
  },
  {
    range: [0.67, 1.0],
    label: "Rejoignez-nous",
    heading: "Plus de 15 ans d'aventure",
    body: "Formation, exploration et convivialité dans l'Aisne et au-delà. Du baptême aux expéditions en mer, nous partageons la passion des profondeurs.",
  },
];

/* ─── Panel opacity calculator (scroll-driven, no CSS transitions) ─── */
function getPanelStyle(
  p: number,
  start: number,
  end: number
): React.CSSProperties {
  const fadeIn = 0.04;
  const fadeOut = 0.04;

  let opacity = 0;
  if (p >= start && p <= end) {
    if (p < start + fadeIn) {
      opacity = (p - start) / fadeIn;
    } else if (p <= end - fadeOut) {
      opacity = 1;
    } else {
      opacity = (end - p) / fadeOut;
    }
  }

  const translateY = opacity < 1 ? (1 - opacity) * 24 : 0;
  const blur = opacity < 1 ? (1 - opacity) * 4 : 0;

  return {
    opacity,
    transform: `translateY(${translateY}px)`,
    filter: `blur(${blur}px)`,
    pointerEvents: opacity > 0.1 ? "auto" : "none",
    transition: "none",
  };
}

/* ─── Panel component ─── */
/* Text-shadow glow for floating hero title (no glass card) */
const HERO_TEXT_SHADOW = [
  "0 0 20px rgba(4, 14, 26, 0.9)",
  "0 0 40px rgba(4, 14, 26, 0.8)",
  "0 0 80px rgba(4, 14, 26, 0.6)",
  "0 2px 4px rgba(0, 0, 0, 0.5)",
].join(", ");

function TextPanel({
  panel,
  progress,
}: {
  panel: PanelDef;
  progress: number;
}) {
  const style = getPanelStyle(progress, panel.range[0], panel.range[1]);
  const isHeroTitle = panel.scrollHint; // first panel = floating title only

  if (isHeroTitle) {
    return (
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 md:px-10"
        style={style}
      >
        <div className="text-center relative">
          {/* Large seahorse watermark behind the title */}
          <img
            src="/assets/photos/logo-cyan.webp"
            alt=""
            width={420}
            height={420}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] md:h-[360px] lg:h-[420px] w-auto opacity-[0.15] pointer-events-none select-none"
            aria-hidden="true"
          />
          {/* Floating heading with text-shadow glow */}
          <h1
            className="relative font-headline text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-on-surface md:text-7xl lg:text-8xl"
            style={{ textShadow: HERO_TEXT_SHADOW }}
          >
            {panel.heading}
          </h1>

          {/* Scroll hint */}
          <div
            className="mt-10 flex flex-col items-center gap-2"
            style={{
              opacity: progress < 0.12 ? 1 : 0,
              transition: `opacity 400ms ${EXPO_EASE}`,
            }}
          >
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em] text-outline"
              style={{ textShadow: "0 0 10px rgba(4,14,26,0.8)" }}
            >
              Scrollez pour plonger
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="animate-bounce text-primary"
            >
              <path
                d="M4 8l6 6 6-6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 md:px-10"
      style={style}
    >
      <div
        className="glass-panel pointer-events-auto max-w-[620px] rounded-[1.5rem] md:rounded-[2rem] px-6 py-8 md:px-12 md:py-14 text-center"
        style={{
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Label pill */}
        {panel.label && (
          <span
            className="inline-block rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary"
            style={{
              background: "rgba(56, 217, 220, 0.15)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            {panel.label}
          </span>
        )}

        {/* Heading */}
        <h2 className="mt-5 font-headline text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-on-surface md:text-6xl lg:text-7xl">
          {panel.heading}
        </h2>

        {/* Body text */}
        {panel.body && (
          <p className="mt-5 text-base font-light leading-relaxed text-secondary md:text-lg max-w-[50ch] mx-auto">
            {panel.body}
          </p>
        )}

        {/* CTA button */}
        {panel.cta && (
          <a
            href={panel.cta.href}
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-[15px] font-semibold tracking-wide text-on-primary transition-transform duration-500 active:scale-[0.98]"
            style={{ transitionTimingFunction: EXPO_EASE }}
          >
            {panel.cta.text}
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full bg-on-primary/10 transition-transform duration-700"
              style={{ transitionTimingFunction: EXPO_EASE }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                className="transition-transform duration-700 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105"
                style={{ transitionTimingFunction: EXPO_EASE }}
              >
                <path
                  d="M1 7h12M8 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── Main Hero ─── */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  /* Detect reduced motion preference */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* Draw a single frame on canvas (object-cover style) */
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[frameIndex];
    if (!canvas || !ctx || !img || !img.complete || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Only resize canvas buffer when dimensions change
    const targetW = Math.round(rect.width * dpr);
    const targetH = Math.round(rect.height * dpr);
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }

    // Reset transform then scale for DPR
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Draw image covering the canvas (object-cover behavior)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const canvasRatio = rect.width / rect.height;
    let drawWidth: number,
      drawHeight: number,
      drawX: number,
      drawY: number;

    if (imgRatio > canvasRatio) {
      drawHeight = rect.height;
      drawWidth = drawHeight * imgRatio;
      drawX = (rect.width - drawWidth) / 2;
      drawY = 0;
    } else {
      drawWidth = rect.width;
      drawHeight = drawWidth / imgRatio;
      drawX = 0;
      drawY = (rect.height - drawHeight) / 2;
    }

    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }, []);

  /* Progressive frame loading: load first batch eagerly, rest lazily */
  useEffect(() => {
    if (prefersReducedMotion) return;

    const EAGER_COUNT = 10; // Load first 10 frames ASAP for initial display
    const images: HTMLImageElement[] = new Array(FRAME_COUNT);
    let eagerLoaded = 0;
    let totalLoaded = 0;

    // Load a single frame and track progress
    const loadFrame = (index: number, onLoad?: () => void) => {
      const img = new Image();
      img.src = getFrameSrc(index + 1); // frames are 1-indexed
      img.onload = () => {
        images[index] = img;
        totalLoaded++;
        if (totalLoaded === FRAME_COUNT) {
          imagesRef.current = images;
        }
        onLoad?.();
      };
      // Store immediately so the ref has the slot even before load
      if (!images[index]) images[index] = img;
    };

    // Phase 1: Load first EAGER_COUNT frames
    for (let i = 0; i < Math.min(EAGER_COUNT, FRAME_COUNT); i++) {
      loadFrame(i, () => {
        eagerLoaded++;
        if (eagerLoaded === Math.min(EAGER_COUNT, FRAME_COUNT)) {
          // Mark as loaded once initial frames are ready
          imagesRef.current = images;
          setImagesLoaded(true);

          // Phase 2: Load remaining frames in the background
          for (let j = EAGER_COUNT; j < FRAME_COUNT; j++) {
            loadFrame(j);
          }
        }
      });
    }
  }, [prefersReducedMotion]);

  /* Draw first frame once all images loaded */
  useEffect(() => {
    if (imagesLoaded) {
      drawFrame(0);
    }
  }, [imagesLoaded, drawFrame]);

  /* Scroll handler — drives canvas frame rendering */
  useEffect(() => {
    if (!imagesLoaded || prefersReducedMotion) return;

    let ticking = false;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const p = Math.max(0, Math.min(1, -rect.top / scrollable));
      setProgress(p);

      const frameIndex = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.round(p * (FRAME_COUNT - 1)))
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrame(frameIndex); // Already inside rAF from onScroll, no need to double-wrap
      }
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [imagesLoaded, prefersReducedMotion, drawFrame]);

  /* Handle resize — redraw current frame at new dimensions */
  useEffect(() => {
    if (!imagesLoaded) return;
    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, drawFrame]);

  /* ─── Reduced motion fallback: static poster + text ─── */
  if (prefersReducedMotion) {
    return (
      <section className="relative min-h-dvh flex items-center overflow-hidden -mt-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/video/hero-poster.webp')",
            backgroundColor: "#020f1c",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at center, transparent 30%, #040E1A 75%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 deep-fade" />

        {/* Static content */}
        <div className="relative z-10 flex min-h-dvh w-full items-center justify-center px-4 md:px-10">
          <div className="text-center">
            <h1
              className="font-headline text-5xl font-bold leading-[1.05] tracking-[-0.03em] text-on-surface md:text-7xl lg:text-8xl"
              style={{ textShadow: HERO_TEXT_SHADOW }}
            >
              HIPPOCAMPUS
            </h1>
            <p
              className="mt-5 text-base font-light leading-relaxed text-secondary md:text-lg max-w-[50ch] mx-auto"
              style={{ textShadow: "0 0 10px rgba(4,14,26,0.8)" }}
            >
              Depuis plus de 15 ans, nous formons et accompagnons les plongeurs
              dans la découverte des profondeurs. Sécurité, convivialité et
              amour de la mer, ici dans l&apos;Aisne.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ─── Full scroll-driven hero ─── */
  return (
    <section
      ref={sectionRef}
      className="relative -mt-24"
      style={{ height: "350vh" }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Poster fallback while frames load */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/video/hero-poster.webp')",
            backgroundColor: "#020f1c",
            opacity: imagesLoaded ? 0 : 1,
            transition: "opacity 600ms ease-out",
          }}
        />

        {/* Canvas for frame sequence */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ willChange: "transform" }}
        />

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at center, transparent 30%, #040E1A 75%)",
          }}
        />

        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, #040E1A, transparent)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background: "linear-gradient(to top, #040E1A, transparent)",
          }}
        />

        {/* Subtle cyan glow at bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 90%, rgba(56,217,220,0.04) 0%, transparent 50%)",
          }}
        />

        {/* Text overlay panels */}
        {PANELS.map((panel, i) => (
          <TextPanel key={i} panel={panel} progress={progress} />
        ))}
      </div>
    </section>
  );
}

export default Hero;
