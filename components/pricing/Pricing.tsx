import { btnClass, btnGhostClass } from "../button-styles";
import { notchCardClass } from "../card-styles";
import { Reveal } from "../Reveal";

interface Plan {
  slug: string;
  name: string;
  price: string;
  unit?: string;
  features: string[];
  cta: string;
  /** Recommended tier: rendered on the inverted palette, with the solid button. */
  emphasized?: boolean;
}

const plans: Plan[] = [
  {
    slug: "starter",
    name: "Starter",
    price: "$1,200",
    unit: "/ build",
    features: ["One automation or chatbot, single workflow", "Up to 2 tool integrations", "2 weeks delivery"],
    cta: "Get started",
  },
  {
    slug: "growth",
    name: "Growth",
    price: "$4,500",
    unit: "/ project",
    features: [
      "Multi-channel AI agent or automation system",
      "Up to 5 integrations, structured data layer",
      "30-day support window included",
    ],
    cta: "Get started",
    emphasized: true,
  },
  {
    slug: "custom",
    name: "Custom",
    price: "Let's scope it",
    features: ["Full system architecture, multi-agent", "Ongoing retainer available", "Dedicated monitoring & iteration"],
    cta: "Let's talk",
  },
];

export function Pricing() {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="border-t border-line">
      <Reveal className="mx-auto max-w-content px-gutter py-section">
        <h2 id="pricing-title" className="font-display text-display-lg">
          Pricing
        </h2>
        <p className="mt-4 max-w-prose text-body-lg text-ink/75">Fixed scope where possible. Retainer for anything ongoing.</p>

        <ul className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.slug} id={`pricing-${plan.slug}`}>
              <PlanCard plan={plan} />
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <article
      aria-labelledby={`plan-${plan.slug}`}
      className={`${notchCardClass} gap-6 ${plan.emphasized ? "theme-invert" : ""}`}
    >
      <div>
        <h3 id={`plan-${plan.slug}`} className="font-mono text-label uppercase text-ink/60">
          {plan.name}
        </h3>
        <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
          <span className="font-display text-display-lg">{plan.price}</span>
          {plan.unit && <span className="text-body-sm text-ink/60">{plan.unit}</span>}
        </p>
      </div>

      <ul className="flex flex-col gap-3 border-t border-line pt-6">
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-body-sm">
            {/* signal-text, not raw signal: raw light-mode signal is ~2.8:1 on light cards */}
            <span aria-hidden className="font-mono text-signal-text">
              —
            </span>
            <span className={plan.emphasized ? "" : "text-ink/75"}>{feature}</span>
          </li>
        ))}
      </ul>

      <a href="#contact" className={`${plan.emphasized ? btnClass : btnGhostClass} mt-auto flex w-full`}>
        {plan.cta}
      </a>
    </article>
  );
}
