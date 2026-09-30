import { btnClass } from "../button-styles";
import { Reveal } from "../Reveal";

/**
 * Closing band. Same `theme-invert` surface as the Growth pricing card, so it
 * reads dark in light mode and light in dark mode, and its solid button
 * inverts with it. The contact form will extend this section next.
 */
export function FinalCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line">
      <div className="mx-auto max-w-content px-gutter py-section">
        <Reveal>
          <div className="notch theme-invert flex flex-col gap-8 bg-card p-card sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:p-14">
            <div>
              <h2 id="contact-title" className="font-display text-display-xl">
                Tell the agent what&apos;s slow.
              </h2>
              <p className="mt-4 max-w-prose text-body-lg text-ink/75">
                Scroll back up and ask it — or reach out directly below.
              </p>
            </div>
            <a href="#services" className={`${btnClass} inline-flex shrink-0 self-start lg:self-auto`}>
              See what we build
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
