/**
 * Animation utilities — CSS animations + Intersection Observer only.
 * Zero external dependencies.
 */

// Easing functions
export const EASING = {
  /** Expo out — fast start, gentle deceleration. Master easing, used everywhere. */
  expo: "cubic-bezier(0.32, 0.72, 0, 1)",
  /** Ease out quart — fast start, gentle stop */
  easeOutQuart: "cubic-bezier(0.165, 0.84, 0.44, 1)",
  /** Ease in out cubic — symmetric smoothness */
  easeInOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
} as const;

// Transition durations (ms)
export const DURATION = {
  fast: 150,
  normal: 300,
  slow: 600,
  reveal: 900,
} as const;

// ScrollReveal animation configs
export interface RevealConfig {
  /** CSS class applied once element is in view */
  animationClass: string;
  /** IntersectionObserver threshold (0-1) */
  threshold: number;
  /** Root margin for triggering earlier/later */
  rootMargin: string;
  /** Stagger delay between sibling elements (ms) */
  staggerDelay?: number;
}

export const REVEAL_CONFIGS = {
  fadeUp: {
    animationClass: "animate-fade-up",
    threshold: 0.1,
    rootMargin: "0px 0px -60px 0px",
  } satisfies RevealConfig,

  fadeIn: {
    animationClass: "animate-fade-in",
    threshold: 0.1,
    rootMargin: "0px",
  } satisfies RevealConfig,

  stagger: {
    animationClass: "animate-fade-up",
    threshold: 0.1,
    rootMargin: "0px 0px -40px 0px",
    staggerDelay: 120,
  } satisfies RevealConfig,
} as const;

/**
 * Initialize scroll-reveal on all elements with `data-reveal` attribute.
 * Call once from a client component's useEffect.
 *
 * Usage:
 *   <div data-reveal>...</div>
 *   <div data-reveal data-reveal-delay="200">...</div>
 */
export function initScrollReveal(): () => void {
  if (typeof window === "undefined") return () => {};

  const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const delay = el.dataset.revealDelay;
          if (delay) {
            el.style.animationDelay = `${delay}ms`;
          }
          el.classList.add("revealed");
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: REVEAL_CONFIGS.fadeUp.threshold,
      rootMargin: REVEAL_CONFIGS.fadeUp.rootMargin,
    }
  );

  elements.forEach((el) => observer.observe(el));

  // Cleanup function
  return () => observer.disconnect();
}
