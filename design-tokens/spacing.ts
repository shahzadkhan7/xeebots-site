/**
 * Spacing tokens.
 *
 * Tailwind's default 4px step scale (`p-4`, `gap-6`, …) stays as the base
 * scale; it is itself a token system. These semantic values sit on top of it
 * for layout decisions that should stay consistent site-wide.
 */

export const spacing = {
  /** Horizontal page padding — `px-gutter` */
  gutter: "clamp(1rem, 0.5rem + 2.5vw, 2.5rem)",
  /** Vertical rhythm between major sections — `py-section` */
  section: "clamp(5rem, 3.5rem + 6vw, 10rem)",
  "section-sm": "clamp(3rem, 2rem + 4vw, 6rem)",
  /** Default padding inside cards/panels — `p-card` */
  card: "1.5rem",
  "card-sm": "1rem",
  /** Sticky nav height — `h-nav`; also the anchor scroll offset */
  nav: "4rem",
};

/** Content widths — `max-w-content`, `max-w-prose` */
export const maxWidth = {
  content: "80rem",
  prose: "40rem",
};
