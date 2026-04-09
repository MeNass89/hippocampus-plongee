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
