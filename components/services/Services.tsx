import { SystemLog, type LogLine } from "../SystemLog";
import { ServiceCard } from "./ServiceCard";

const services = [
  {
    title: "AI Automation",
    description: "Multi-tool pipelines that move work between the apps you already run, without a human in the middle.",
  },
  {
    title: "AI Chatbots",
    description: "Retrieval-grounded agents that actually know your business, on your site or inside your existing channels.",
  },
  {
    title: "AI Agents",
    description:
      "Voice and text agents that qualify, book, and follow up — with a real handoff to your team when it matters.",
  },
  {
    title: "Systems Integration",
    description: "The unglamorous layer that makes the above reliable: data structure, sync, and monitoring.",
  },
];

const log: LogLine[] = [
  { time: "14:02:11", action: "trigger", event: "retell.call.completed", result: "agent qualified lead, score 0.91" },
  { time: "14:02:12", action: "sync", event: "airtable.tenants", result: "record created, linked to unit #14B" },
  { time: "14:02:13", action: "route", event: "buildium.lease", result: "term dates pulled, synced to CRM field" },
  { time: "14:02:14", action: "notify", event: "slack.#ops", result: "internal alert posted, no human action needed" },
];

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="border-t border-line">
      <div className="mx-auto max-w-content px-gutter py-section">
        <p className="font-mono text-label uppercase text-muted">Services</p>
        <h2 id="services-title" className="mt-4 font-display text-display-lg">
          What we build
        </h2>
        <p className="mt-4 max-w-prose text-body-lg text-ink/75">
          Four categories. Every engagement starts from one of these, then gets shaped around the actual workflow.
        </p>

        {/*
          Negative margin + per-cell padding (instead of grid gap) lets each
          cell's rail segment run edge to edge, so segments join into one line
          per row while the cards themselves stay aligned to the content edge.
          The outer clip trims the rail's overhang at the content edge.
        */}
        <div className="mt-12 overflow-x-clip sm:mt-16">
          <ul className="-mx-2 grid gap-y-6 sm:grid-cols-2 lg:-mx-3 lg:grid-cols-4">
            {services.map((service, i) => (
              <li key={service.title} className="flex flex-col">
                <Rail />
                <div className="flex-1 px-2 lg:px-3">
                  <ServiceCard number={i + 1} {...service} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <SystemLog lines={log} className="mt-6 lg:mt-8" />
      </div>
    </section>
  );
}

/** Pipeline-style connector: shared line, ring node over the card's center, tick down into the card. */
function Rail() {
  return (
    <div aria-hidden className="relative flex h-10 flex-col items-center">
      <span className="absolute inset-x-0 top-1.5 h-px bg-line-strong" />
      <span className="relative size-3 rounded-full border-2 border-signal bg-paper" />
      <span className="w-px flex-1 bg-line-strong" />
    </div>
  );
}
