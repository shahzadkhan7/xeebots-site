import { Fragment, type ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/hero/Hero";
import { Nav } from "@/components/Nav";
import { sections } from "@/components/nav-links";
import { Process } from "@/components/process/Process";
import { Services } from "@/components/services/Services";
import { CaseStudies } from "@/components/work/CaseStudies";

const built: Record<string, ReactNode> = {
  work: <CaseStudies />,
  services: <Services />,
  process: <Process />,
};

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        {/* Sections in nav order; stubs keep the anchors working until each is built. */}
        {sections.map((section) =>
          built[section.id] ? (
            <Fragment key={section.id}>{built[section.id]}</Fragment>
          ) : (
            <section key={section.id} id={section.id} className="border-t border-line">
              <div className="mx-auto max-w-content px-gutter py-section-sm">
                <p className="font-mono text-label uppercase text-muted">{section.label} — coming next</p>
              </div>
            </section>
          ),
        )}
      </main>
      <Footer />
    </>
  );
}
