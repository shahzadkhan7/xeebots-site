import { notchCardClass } from "../card-styles";
import { Reveal } from "../Reveal";
import { SignalDot } from "../SignalDot";

interface CaseStudy {
  slug: string;
  tag: string;
  title: string;
  description: string;
  tech: string[];
  note: string;
  /** Running in production right now — shows the live signal dot on the note. */
  live?: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    slug: "comms-hub",
    tag: "AI Automation",
    title: "Unified comms hub for a property management business",
    description:
      "Property managers juggle calls, texts, emails, and messages across half a dozen disconnected tools — a recipe for missed follow-ups and lost context. We built an integration layer that solves this: an AI voice/SMS agent handles inbound and outbound communication, email and Facebook Messenger route through the same pipeline, and everything lands in one structured database — covering prospects, tenants, and vendors, each with full communication history. Property records include addresses, utility details, and FAQs so the agent can answer routine tenant questions without escalation. Lease data stays synced automatically, and internal alerts post to the team's workspace in real time.",
    tech: ["Retell.ai", "AirTable", "Gmail API", "Facebook Messenger", "Buildium", "Google Voice", "Slack"],
    note: "Private client system — described here at the architecture level.",
  },
  {
    slug: "support-agent",
    tag: "Chatbot · RAG",
    title: "Knowledge-grounded support agent",
    description:
      "A retrieval-based AI assistant that actually reads a company's own documentation instead of following a scripted decision tree — deployed live on our own portfolio site. It streams responses, stays strictly scoped to what it actually knows, and hands off gracefully instead of guessing when a question falls outside that scope.",
    tech: ["Gemini", "Vector search", "Next.js", "Streaming responses"],
    note: "Live and running — you can try the real thing on our portfolio site.",
    live: true,
  },
];

export function CaseStudies() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line">
      <div className="mx-auto max-w-content px-gutter py-section">
        <p className="font-mono text-label uppercase text-muted">Case studies</p>
        <h2 id="work-title" className="mt-4 font-display text-display-lg">
          Recent builds
        </h2>
        <p className="mt-4 max-w-prose text-body-lg text-ink/75">
          Two in detail. More on request — most of our work runs under client NDAs.
        </p>

        <ul className="mt-12 grid gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          {caseStudies.map((study, i) => (
            <li key={study.slug} id={`work-${study.slug}`} className="flex">
              <Reveal index={i} className="flex flex-1">
                <CaseCard study={study} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CaseCard({ study }: { study: CaseStudy }) {
  return (
    <article className={`${notchCardClass} w-full`}>
      <p className="font-mono text-label uppercase text-muted">{study.tag}</p>
      <h3 className="mt-3 font-display text-display-md">{study.title}</h3>
      <p className="mt-4 text-body-sm text-ink/75">{study.description}</p>

      <ul aria-label="Tech stack" className="mb-6 mt-6 flex flex-wrap gap-2">
        {study.tech.map((t) => (
          <li key={t} className="rounded border border-line bg-paper px-2 py-1 font-mono text-label-sm text-ink/75">
            {t}
          </li>
        ))}
      </ul>

      {/* mt-auto pins the note to the bottom so both cards' notes line up */}
      <p className="mt-auto flex items-center gap-2 border-t border-line pt-4 text-body-sm text-ink/60">
        {study.live && <SignalDot />}
        {study.note}
      </p>
    </article>
  );
}
