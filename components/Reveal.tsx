"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { duration, reveal } from "@/design-tokens";

const DURATION_S = parseFloat(duration.reveal) / 1000;

/**
 * Fades + lifts children 16px into place the first time ~20% of them is in
 * view. One-shot (`once`): never re-hides on scroll back.
 *
 * Reduced motion: no transition at all, and the `motion-reduce:` overrides pin
 * children at rest from the very first paint. (`useReducedMotion()` is null
 * during server render, so it can't safely change `initial` without a
 * hydration mismatch — CSS covers first paint, the hook covers the transition.)
 * Without JS, a <noscript> rule in the root layout shows everything.
 */
export function Reveal({
  children,
  index = 0,
  className = "",
}: {
  children: ReactNode;
  /** Position in a group; each step adds a small stagger delay. */
  index?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      data-reveal
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? { duration: 0 } : { duration: DURATION_S, ease: "easeOut", delay: (index * reveal.staggerMs) / 1000 }}
      className={`motion-reduce:transform-none! motion-reduce:opacity-100! ${className}`}
    >
      {children}
    </motion.div>
  );
}
