/**
 * Motion tokens.
 *
 * Both loops are fully disabled under `prefers-reduced-motion: reduce`
 * (see `reducedMotion` below, applied in tailwind.config.ts), not slowed down.
 */

export const easing = {
  out: "cubic-bezier(0.16, 1, 0.3, 1)",
  "in-out": "cubic-bezier(0.65, 0, 0.35, 1)",
};

export const duration = {
  fast: "150ms",
  base: "250ms",
  /** Scroll-triggered reveal (Reveal.tsx) — `duration-reveal` */
  reveal: "350ms",
  slow: "500ms",
};

/** Reveal: distance travelled (16px, `translate-y-4`) and per-item stagger. */
export const reveal = {
  staggerMs: 60,
};

/** Dash length + gap for flowing lines. Use `stroke-dasharray="6 6"`. */
export const flowDash = {
  dash: 6,
  gap: 6,
};

export const keyframes = {
  /** Expanding ring that fades out — put on a ring behind a static dot. */
  "signal-pulse": {
    "0%": { transform: "scale(1)", opacity: "0.6" },
    "100%": { transform: "scale(2.6)", opacity: "0" },
  },
  /** Moves an SVG dashed stroke one full dash cycle — "data flowing". */
  "flow-dash": {
    from: { strokeDashoffset: `${flowDash.dash + flowDash.gap}` },
    to: { strokeDashoffset: "0" },
  },
};

/** Tailwind `animation` — `animate-signal-pulse`, `animate-flow-dash`. */
export const animation = {
  "signal-pulse": "signal-pulse 2.2s cubic-bezier(0, 0, 0.2, 1) infinite",
  "flow-dash": "flow-dash 1.6s linear infinite",
};

/**
 * Reduced motion: stop both loops. The pulse ring is hidden entirely (it only
 * exists as motion), leaving the static dot. The flow line stays as a still
 * dashed line. Anchor links jump instead of smooth-scrolling.
 *
 * `!important` is deliberate: these rules are emitted in Tailwind's base
 * layer, and the `animate-*` utilities (utilities layer) would otherwise win.
 */
export const reducedMotion = {
  "@media (prefers-reduced-motion: reduce)": {
    html: { scrollBehavior: "auto" },
    ".animate-signal-pulse": { animation: "none !important", opacity: "0 !important" },
    ".animate-flow-dash": { animation: "none !important" },
  },
};
