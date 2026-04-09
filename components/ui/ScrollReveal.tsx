"use client";

import { type ReactNode, useEffect, useRef, useState, useCallback } from "react";
import { EASING } from "@/lib/animations";

interface ScrollRevealProps {
  children: ReactNode;
  /** Reveal animation type */
  animation?: "fade-up" | "fade-in" | "fade-right";
  /** Delay in ms before the animation starts */
  delay?: number;
  className?: string;
}

const INITIAL_STYLES: Record<
  NonNullable<ScrollRevealProps["animation"]>,
  { opacity: number; transform: string; filter: string }
> = {
  "fade-up": { opacity: 0, transform: "translateY(2.5rem)", filter: "blur(4px)" },
  "fade-in": { opacity: 0, transform: "none", filter: "blur(4px)" },
  "fade-right": { opacity: 0, transform: "translateX(-2.5rem)", filter: "blur(4px)" },
};

const REVEALED_STYLES: Record<
  NonNullable<ScrollRevealProps["animation"]>,
  { opacity: number; transform: string; filter: string }
> = {
  "fade-up": { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
  "fade-in": { opacity: 1, transform: "none", filter: "blur(0)" },
  "fade-right": { opacity: 1, transform: "translateX(0)", filter: "blur(0)" },
};

/* ── Shared IntersectionObserver singleton ──
   Instead of creating one observer per ScrollReveal instance,
   we share a single observer across all instances. This is a
   significant performance win when there are many ScrollReveal
   elements on the page (reduces observer overhead). */
type ObserverCallback = (entry: IntersectionObserverEntry) => void;
const observerCallbacks = new Map<Element, ObserverCallback>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const cb = observerCallbacks.get(entry.target);
          if (cb) cb(entry);
        }
      },
      { threshold: 0.1 }
    );
  }
  return sharedObserver;
}

function observeElement(el: Element, callback: ObserverCallback) {
  observerCallbacks.set(el, callback);
  getSharedObserver().observe(el);
}

function unobserveElement(el: Element) {
  observerCallbacks.delete(el);
  getSharedObserver().unobserve(el);
  // Clean up observer if no more elements
  if (observerCallbacks.size === 0 && sharedObserver) {
    sharedObserver.disconnect();
    sharedObserver = null;
  }
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [transitionDone, setTransitionDone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If user prefers reduced motion, reveal immediately
    if (prefersReducedMotion) {
      setRevealed(true);
      setTransitionDone(true);
      return;
    }

    observeElement(el, (entry) => {
      if (entry.isIntersecting) {
        setRevealed(true);
        unobserveElement(el);
      }
    });

    return () => {
      if (el) unobserveElement(el);
    };
  }, [prefersReducedMotion]);

  // Remove willChange after transition completes to free compositor memory
  const handleTransitionEnd = useCallback(() => {
    setTransitionDone(true);
  }, []);

  const initial = INITIAL_STYLES[animation];
  const target = REVEALED_STYLES[animation];
  const current = revealed ? target : initial;

  // Skip animation entirely for reduced motion
  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: current.opacity,
        transform: current.transform,
        filter: current.filter,
        transition: `opacity 0.9s ${EASING.expo} ${delay}ms, transform 0.9s ${EASING.expo} ${delay}ms, filter 0.9s ${EASING.expo} ${delay}ms`,
        willChange: transitionDone ? "auto" : "opacity, transform, filter",
      }}
      onTransitionEnd={handleTransitionEnd}
    >
      {children}
    </div>
  );
}

export default ScrollReveal;
