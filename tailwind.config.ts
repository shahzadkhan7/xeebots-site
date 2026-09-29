/**
 * Tailwind v4 reads this file through `@config` in app/globals.css.
 * Every value comes from /design-tokens — edit tokens there, not here.
 *
 * Scales that are *replaced* (not extended) so off-system values can't be used:
 * colors, fontFamily, fontSize, borderRadius.
 */
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import {
  animation,
  borderRadius,
  cssVariables,
  duration,
  easing,
  fontFamily,
  fontSize,
  keyframes,
  maxWidth,
  notchClipPaths,
  reducedMotion,
  spacing,
  themeColors,
} from "./design-tokens";

const lightVars = { ...cssVariables("light"), colorScheme: "light" };
const darkVars = { ...cssVariables("dark"), colorScheme: "dark" };

const config: Config = {
  // `dark:` follows the same rule as the color variables: data-theme wins,
  // otherwise the OS preference.
  darkMode: [
    "variant",
    [
      "&:where([data-theme=dark], [data-theme=dark] *)",
      "@media (prefers-color-scheme: dark) { &:not(:where([data-theme=light], [data-theme=light] *)) }",
    ],
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      inherit: "inherit",
      ...themeColors,
    },
    fontFamily,
    fontSize,
    borderRadius,
    extend: {
      spacing,
      maxWidth,
      keyframes,
      animation,
      transitionTimingFunction: easing,
      transitionDuration: duration,
    },
  },
  plugins: [
    plugin(({ addBase, addUtilities }) => {
      addBase({
        // Light is the default; dark via OS preference unless overridden,
        // or forced with data-theme="dark".
        ":root": lightVars,
        "@media (prefers-color-scheme: dark)": {
          ":root:not([data-theme=light])": darkVars,
        },
        ":root[data-theme=dark]": darkVars,

        // Anchor links: smooth scroll, landing below the sticky nav.
        // (reduced-motion reset lives in `reducedMotion`)
        html: { scrollBehavior: "smooth", scrollPaddingTop: spacing.nav },

        body: {
          backgroundColor: themeColors.paper,
          color: themeColors.ink,
          fontFamily: fontFamily.sans.join(", "),
        },

        // Default focus ring. Notched (clip-path) elements override it with an
        // inset ring, since clip-path would cut an outside outline off.
        ":focus-visible": { outline: `2px solid ${themeColors.ink}`, outlineOffset: "2px" },

        ...reducedMotion,
      });

      addUtilities(
        Object.fromEntries(
          Object.entries(notchClipPaths).map(([cls, clipPath]) => [
            cls,
            { clipPath },
          ]),
        ),
      );
    }),
  ],
};

export default config;
