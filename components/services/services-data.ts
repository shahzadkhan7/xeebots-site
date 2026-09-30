import { Bot, Database, MessagesSquare, Workflow, type LucideIcon } from "lucide-react";

export interface Service {
  /** Anchor id of the card — `#service-<slug>` */
  slug: string;
  title: string;
  /** Card copy (Services section) */
  description: string;
  /** One-liner (nav mega-menu) */
  summary: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    slug: "ai-automation",
    title: "AI Automation",
    description: "Multi-tool pipelines that move work between the apps you already run, without a human in the middle.",
    summary: "Pipelines that move work between your tools",
    icon: Workflow,
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    description: "Retrieval-grounded agents that actually know your business, on your site or inside your existing channels.",
    summary: "Agents that actually know your business",
    icon: MessagesSquare,
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    description:
      "Voice and text agents that qualify, book, and follow up — with a real handoff to your team when it matters.",
    summary: "Voice/text agents that qualify and book",
    icon: Bot,
  },
  {
    slug: "systems-integration",
    title: "Systems Integration",
    description: "The unglamorous layer that makes the above reliable: data structure, sync, and monitoring.",
    summary: "The data layer that makes it reliable",
    icon: Database,
  },
];

export const serviceAnchor = (s: Service) => `service-${s.slug}`;
