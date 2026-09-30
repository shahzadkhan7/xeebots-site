import { Reveal } from "../Reveal";

const steps = [
  { title: "Scope the workflow", description: "We map exactly what's slow, not what sounds impressive." },
  { title: "Build the core loop", description: "One working path end-to-end before anything is polished." },
  { title: "Wire it to your tools", description: "CRM, inbox, calendar, whatever you already run." },
  { title: "Hand off & monitor", description: "You get logs, not a black box." },
];

const pad = (n: number) => String(n).padStart(2, "0");

export function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="border-t border-line">
      <Reveal className="mx-auto max-w-content px-gutter py-section">
        <p className="font-mono text-label uppercase text-muted">Process</p>
        <h2 id="process-title" className="mt-4 font-display text-display-lg">
          How an engagement runs
        </h2>
        <p className="mt-4 max-w-prose text-body-lg text-ink/75">
          Four stages, roughly a week apart. No 40-page discovery deck before you see anything move.
        </p>

        {/* Same bordered grid as the stats strip: the 1px gap over bg-line draws the dividers at every column count. */}
        <ol className="mt-12 grid gap-px border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-3 bg-paper p-card">
              <span className="font-mono text-label text-muted">{pad(i + 1)}</span>
              <h3 className="font-display text-display-sm">{step.title}</h3>
              <p className="text-body-sm text-ink/75">{step.description}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
