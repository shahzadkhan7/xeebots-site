import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";

// next/font requires literal options, so the variable names are repeated here.
// They must match `fontVariables` in design-tokens/typography.ts.

export const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

export const body = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const fontClassNames = [display.variable, body.variable, mono.variable].join(" ");
