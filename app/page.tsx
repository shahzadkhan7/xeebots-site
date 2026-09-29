import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/Nav";
import { navLinks } from "@/components/nav-links";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        {/* Anchor targets for the nav until the real sections are built. */}
        {navLinks.map((link) => (
          <section key={link.href} id={link.href.slice(1)} className="border-t border-line">
            <div className="mx-auto max-w-content px-gutter py-section-sm">
              <p className="font-mono text-label uppercase text-muted">{link.label} — coming next</p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
