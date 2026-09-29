import { SignalDot } from "../SignalDot";
import { HeroDemo } from "./HeroDemo";
import { StatsStrip } from "./StatsStrip";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mx-auto max-w-content px-gutter pb-section-sm pt-16 sm:pt-20">
      <p className="flex items-center gap-2.5 font-mono text-label uppercase">
        <SignalDot />
        AI automation &amp; agent systems
      </p>
      <h1 id="hero-title" className="mt-6 max-w-5xl font-display text-display-xl">
        We build the AI that runs the parts of your business you don&apos;t have time for.
      </h1>
      <p className="mt-6 max-w-prose text-body-lg text-ink/75">
        Xeebots designs and ships production AI agents, chat systems, and automation pipelines for teams who want the
        work done, not another dashboard to babysit.
      </p>

      <div className="mt-12 sm:mt-16">
        <HeroDemo />
      </div>

      <div className="mt-6 lg:mt-8">
        <StatsStrip />
      </div>
    </section>
  );
}
