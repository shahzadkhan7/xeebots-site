/**
 * Typography tokens.
 *
 * The fonts themselves are loaded with next/font in `app/fonts.ts` (next/font
 * only runs inside the Next compiler, and this file is also read by
 * tailwind.config.ts). The two are linked by the CSS variable names below.
 *
 * - display: Bricolage Grotesque — headlines, nav brand, hero
 * - body:    Manrope — paragraphs, UI text
 * - mono:    JetBrains Mono — labels, eyebrows, system/log text (core identity)
 */

export const fontVariables = {
  display: "--font-bricolage",
  body: "--font-manrope",
  mono: "--font-jetbrains",
} as const;

const fallbacks = {
  display: ["ui-sans-serif", "system-ui", "sans-serif"],
  body: ["ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
};

/** Tailwind `fontFamily` — `font-display`, `font-sans` (body), `font-mono`. */
export const fontFamily = {
  display: [`var(${fontVariables.display})`, ...fallbacks.display],
  sans: [`var(${fontVariables.body})`, ...fallbacks.body],
  mono: [`var(${fontVariables.mono})`, ...fallbacks.mono],
};

type FontSize = [
  size: string,
  opts: { lineHeight: string; letterSpacing?: string; fontWeight?: string },
];

/**
 * Tailwind `fontSize` — replaces the default scale. Display sizes are fluid.
 * Usage: `font-display text-display-xl`, `text-body`, `font-mono text-label`.
 */
export const fontSize: Record<string, FontSize> = {
  // Display — Bricolage Grotesque
  "display-2xl": ["clamp(3rem, 2rem + 5vw, 6.5rem)", { lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "600" }],
  "display-xl": ["clamp(2.5rem, 1.75rem + 3.5vw, 4.75rem)", { lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "600" }],
  "display-lg": ["clamp(2rem, 1.5rem + 2vw, 3.25rem)", { lineHeight: "1.05", letterSpacing: "-0.025em", fontWeight: "600" }],
  "display-md": ["clamp(1.5rem, 1.25rem + 1vw, 2.125rem)", { lineHeight: "1.15", letterSpacing: "-0.02em", fontWeight: "600" }],
  "display-sm": ["1.25rem", { lineHeight: "1.25", letterSpacing: "-0.015em", fontWeight: "600" }],

  // Body — Manrope
  "body-lg": ["1.125rem", { lineHeight: "1.65" }],
  body: ["1rem", { lineHeight: "1.6" }],
  "body-sm": ["0.875rem", { lineHeight: "1.55" }],

  // Mono — JetBrains Mono (labels, eyebrows, log lines)
  label: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em", fontWeight: "500" }],
  "label-sm": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.1em", fontWeight: "500" }],
  log: ["0.8125rem", { lineHeight: "1.6" }],
};
