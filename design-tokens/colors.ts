/**
 * Color tokens — the only place raw color values live.
 *
 * Components never reference these hex values directly. They use the Tailwind
 * classes (`bg-paper`, `text-ink`, `border-line`, …), which resolve to the CSS
 * variables below, so light/dark switching happens in CSS with no re-render.
 *
 * `signal` is reserved for live/active states only (pulse dot, active connector
 * line, matched result). It is never a decorative brand color.
 */

export const palette = {
  light: {
    paper: "#F5F4F0",
    ink: "#0A0A0B",
    line: "#DFDDD5",
    "line-strong": "#C9C7BD",
    muted: "#87857C",
    card: "#FBFAF7",
    signal: "#0EA99A",
    "signal-ink": "#063F3A",
  },
  dark: {
    paper: "#0A0A0B",
    ink: "#F5F4F0",
    line: "#242420",
    "line-strong": "#37362F",
    muted: "#8B8A80",
    card: "#121211",
    signal: "#2FE0CC",
    "signal-ink": "#04211D",
  },
} as const;

export type ColorToken = keyof typeof palette.light;
export type ThemeName = keyof typeof palette;

export const colorTokens = Object.keys(palette.light) as ColorToken[];

/** CSS custom property name for a token, e.g. `line-strong` → `--xb-line-strong`. */
export const colorVar = (token: ColorToken) => `--xb-${token}` as const;

/**
 * Derived colors — built from the palette, never new hex values.
 *
 * `signal-text`: signal legible as small text. Raw light-mode signal on paper
 * is ~2.8:1; mixing toward ink gives ~6:1 in light and stays bright in dark
 * (where ink is the light color). Same usage rule as signal: live/key terms only.
 */
const derivedColors = {
  "signal-text": `color-mix(in oklab, var(${colorVar("signal")}) 60%, var(${colorVar("ink")}))`,
};

/** Tailwind color map: every token points at its CSS variable. */
export const themeColors = {
  ...(Object.fromEntries(colorTokens.map((token) => [token, `var(${colorVar(token)})`])) as Record<ColorToken, string>),
  ...derivedColors,
};

/** `{ "--xb-paper": "#F5F4F0", … }` for one theme — used to emit the variables. */
export const cssVariables = (theme: ThemeName) =>
  Object.fromEntries(
    colorTokens.map((token) => [colorVar(token), palette[theme][token]]),
  ) as Record<ReturnType<typeof colorVar>, string>;
