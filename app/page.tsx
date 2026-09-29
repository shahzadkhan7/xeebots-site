import { Fragment, type ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/Nav";
import { navLinks } from "@/components/nav-links";
import { Services } from "@/components/services/Services";

const built: Record<string, ReactNode> = {
  "#services": <Services />,
};

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        {/* Sections in nav order; stubs keep the anchors working until each is built. */}
        {navLinks.map((link) =>
          built[link.href] ? (
            <Fragment key={link.href}>{built[link.href]}</Fragment>
          ) : (
            <section key={link.href} id={link.href.slice(1)} className="border-t border-line">
              <div className="mx-auto max-w-content px-gutter py-section-sm">
                <p className="font-mono text-label uppercase text-muted">{link.label} — coming next</p>
              </div>
            </section>
          ),
        )}
      </main>
      <Footer />
    </>
  );
}
