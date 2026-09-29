"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const SWAP_SECONDS = 0.15;

function useSwap() {
  const reduce = useReducedMotion();
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: reduce ? 0 : SWAP_SECONDS },
  };
}

/**
 * Brief fade-out/fade-in whenever `swapKey` changes; an instant swap under
 * prefers-reduced-motion. Nothing animates on first render.
 */
export function Fade({ swapKey, children, className }: { swapKey: string; children: ReactNode; className?: string }) {
  const swap = useSwap();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={swapKey} className={className} {...swap}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Same as Fade, inline (for text inside a sentence or label). */
export function FadeInline({ swapKey, children }: { swapKey: string; children: ReactNode }) {
  const swap = useSwap();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={swapKey} {...swap}>
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

/** Same as Fade, for SVG content. */
export function FadeSvg({ swapKey, children }: { swapKey: string; children: ReactNode }) {
  const swap = useSwap();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.g key={swapKey} {...swap}>
        {children}
      </motion.g>
    </AnimatePresence>
  );
}
