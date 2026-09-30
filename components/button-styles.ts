/**
 * Buttons (links styled as buttons). Built only from tokens, so inside a
 * `.theme-invert` surface they invert along with it — the primary button on
 * a dark card becomes light, never dark-on-dark.
 *
 * Focus rings are inset so the solid button's notch clip-path can't cut them off.
 */
const base =
  "items-center justify-center px-4 py-2.5 font-mono text-label uppercase transition-colors duration-base focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset";

/** Solid: ink fill, paper text, notch-cut corner. */
export const btnClass = `${base} notch-sm bg-ink text-paper hover:bg-ink/85 focus-visible:ring-paper`;

/**
 * Ghost: transparent with a strong border; fills faintly on hover. Square
 * (2px) corner, not a notch: a clip-path leaves no border along the cut, which
 * reads as a rendering glitch on a thin-bordered button.
 */
export const btnGhostClass = `${base} rounded border border-line-strong text-ink hover:border-ink hover:bg-ink/5 focus-visible:ring-ink`;
