/**
 * Corner tokens.
 *
 * The visual language is angular: corners are sharp (2px max) or notch-cut
 * with a clip-path. The radius scale deliberately has no `rounded-lg`/`xl`
 * steps, so soft corners can't creep in. `full` exists only for dots.
 */

export const borderRadius = {
  none: "0",
  DEFAULT: "2px",
  sm: "2px",
  full: "9999px",
};

/** Notch cut size — `notch` / `notch-2` use `lg`, the `-sm` variants use `sm`. */
export const notchSize = {
  lg: "18px",
  sm: "11px",
};

const cut = (n: string) => ({
  /** one corner: top-right */
  one: `polygon(0 0, calc(100% - ${n}) 0, 100% ${n}, 100% 100%, 0 100%)`,
  /** two corners: top-right + bottom-left */
  two: `polygon(0 0, calc(100% - ${n}) 0, 100% ${n}, 100% 100%, ${n} 100%, 0 calc(100% - ${n}))`,
});

/** Clip-path utilities registered in tailwind.config.ts. */
export const notchClipPaths = {
  ".notch": cut(notchSize.lg).one,
  ".notch-2": cut(notchSize.lg).two,
  ".notch-sm": cut(notchSize.sm).one,
  ".notch-2-sm": cut(notchSize.sm).two,
};
