/**
 * Notch-cut content card (Services, Case Studies). Static by default; the
 * focus styles apply if it's rendered as a link. The focus ring is inset
 * because the notch clip-path would cut off an outside outline.
 */
export const notchCardClass =
  "notch-sm flex h-full flex-col border border-line bg-card p-card transition duration-base ease-out " +
  "hover:-translate-y-0.5 hover:border-line-strong " +
  "focus-visible:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink " +
  "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0";
