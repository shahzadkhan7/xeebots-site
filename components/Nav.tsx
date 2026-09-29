"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks } from "./nav-links";
import { ThemeToggle } from "./theme/ThemeToggle";

const ctaClass =
  "notch-sm items-center justify-center bg-ink px-4 py-2.5 font-mono text-label uppercase text-paper transition-colors duration-base hover:bg-ink/85 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-paper";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-nav max-w-content items-center gap-6 px-gutter">
        <a href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo size="nav" preload />
          <span className="font-display text-display-sm">Xeebots</span>
        </a>

        <ul className="ml-auto hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-body-sm text-ink/70 transition-colors duration-base hover:text-ink">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <ThemeToggle />
          <a href="#contact" className={`${ctaClass} hidden md:inline-flex`}>
            Start a project
          </a>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded border border-line md:hidden"
          >
            {open ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </nav>

      {open && (
        // Overlay (absolute), so closing it on link click doesn't shift the
        // page mid-scroll and throw off the anchor position.
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b border-line bg-paper md:hidden">
          <ul className="flex flex-col px-gutter py-2">
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line last:border-b-0">
                <a href={link.href} onClick={() => setOpen(false)} className="block py-3.5 text-body">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="px-gutter pb-5">
            <a href="#contact" onClick={() => setOpen(false)} className={`${ctaClass} flex w-full`}>
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
