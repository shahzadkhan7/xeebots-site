"use client";

import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { spacing } from "@/design-tokens";
import { Logo } from "./Logo";
import { MobileNavSection, NavDropdown } from "./NavDropdown";
import { navMenus } from "./nav-links";
import { ThemeToggle } from "./theme/ThemeToggle";

const ctaClass =
  "notch-sm items-center justify-center bg-ink px-4 py-2.5 font-mono text-label uppercase text-paper transition-colors duration-base hover:bg-ink/85 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-paper";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  /** Desktop: at most one dropdown open. */
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  /** Mobile: at most one section expanded. */
  const [expanded, setExpanded] = useState<string | null>(null);

  const setMenuOpen = useCallback((id: string, open: boolean) => {
    setOpenMenu((cur) => (open ? id : cur === id ? null : cur));
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setExpanded(null);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileOpen(false);
      setExpanded(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex h-nav max-w-content items-center gap-6 px-gutter">
        <a href="#top" className="flex items-center gap-2.5" onClick={closeMobile}>
          <Logo size="nav" preload />
          <span className="font-display text-display-sm">Xeebots</span>
        </a>

        <ul className="ml-auto hidden items-center gap-7 self-stretch md:flex">
          {navMenus.map((menu) => (
            <NavDropdown key={menu.id} menu={menu} open={openMenu === menu.id} onOpenChange={setMenuOpen} />
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <ThemeToggle />
          <a href="#contact" className={`${ctaClass} hidden md:inline-flex`}>
            Start a project
          </a>
          <button
            type="button"
            onClick={() => (mobileOpen ? closeMobile() : setMobileOpen(true))}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex size-9 items-center justify-center rounded border border-line md:hidden"
          >
            {mobileOpen ? <X aria-hidden className="size-4" /> : <Menu aria-hidden className="size-4" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        // Overlay (absolute), so closing it on link click doesn't shift the
        // page mid-scroll and throw off the anchor position. Scrolls on its
        // own if an expanded section makes it taller than the screen.
        <div
          id="mobile-menu"
          style={{ maxHeight: `calc(100dvh - ${spacing.nav})` }}
          className="absolute inset-x-0 top-full overflow-y-auto overscroll-contain border-b border-line bg-paper md:hidden"
        >
          <ul className="flex flex-col px-gutter py-2">
            {navMenus.map((menu) => (
              <MobileNavSection
                key={menu.id}
                menu={menu}
                expanded={expanded === menu.id}
                onToggle={() => setExpanded((cur) => (cur === menu.id ? null : menu.id))}
                onNavigate={closeMobile}
              />
            ))}
          </ul>
          <div className="px-gutter pb-5">
            <a href="#contact" onClick={closeMobile} className={`${ctaClass} flex w-full`}>
              Start a project
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
