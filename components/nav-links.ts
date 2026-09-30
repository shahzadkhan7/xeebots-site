import {
  Blocks,
  Briefcase,
  Layers,
  LibraryBig,
  Mail,
  Radio,
  Route,
  Send,
  Tag,
  UserRound,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { serviceAnchor, services } from "./services/services-data";

/** Page sections, in nav order. Stubs render for any not built yet. */
export const sections = [
  { id: "work", label: "Case Studies" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

export interface LinkItem {
  kind?: "link";
  label: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Destination doesn't exist yet — link is a "#" stub. */
  soon?: boolean;
}

/** Selectable value with a copy-to-clipboard button (not a link). */
export interface CopyItem {
  kind: "copy";
  label: string;
  value: string;
  icon: LucideIcon;
}

export type MenuItem = LinkItem | CopyItem;

export interface MenuColumn {
  title?: string;
  items: MenuItem[];
  /** Trailing "view all"-style link under the items. */
  footer?: { label: string; href: string };
}

export interface NavMenu {
  /** Used for element ids: `${id}-menu` */
  id: string;
  label: string;
  columns: MenuColumn[];
  /** Adds the "Recent build" card as a final column. */
  featured?: boolean;
}

export const featuredBuild = {
  label: "Recent build",
  title: "Unified comms hub for a property management business",
  flow: "Voice, SMS, email and Messenger → one AI agent → synced database",
  href: "#work",
};

export const navMenus: NavMenu[] = [
  {
    id: "work",
    label: "Case Studies",
    columns: [
      {
        items: [
          { label: "Unified comms hub", description: "Property management client, in production", href: "#work", icon: Radio },
          { label: "Knowledge-grounded support agent", description: "RAG chatbot, in production", href: "#work", icon: LibraryBig },
        ],
        footer: { label: "View all case studies", href: "#work" },
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    featured: true,
    columns: [
      {
        title: "Services",
        items: services.map((s) => ({
          label: s.title,
          description: s.summary,
          href: `#${serviceAnchor(s)}`,
          icon: s.icon,
        })),
      },
      {
        title: "Company",
        items: [
          { label: "About", description: "Who's behind Xeebots", href: "#", icon: UserRound, soon: true },
          { label: "Case Studies", description: "Real builds, in production", href: "#work", icon: Briefcase },
          { label: "Process", description: "How an engagement runs", href: "#process", icon: Route },
          { label: "Pricing", description: "Plans and custom scope", href: "#pricing", icon: Tag },
        ],
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing",
    columns: [
      {
        items: [
          { label: "Starter — $1,200", description: "One automation or chatbot, single workflow", href: "#pricing", icon: Zap },
          { label: "Growth — $4,500", description: "Multi-channel AI agent system", href: "#pricing", icon: Layers },
          { label: "Custom — Let's scope it", description: "Full system architecture, retainer available", href: "#pricing", icon: Blocks },
        ],
      },
    ],
  },
  {
    id: "contact",
    label: "Contact",
    columns: [
      {
        items: [
          { label: "Start a project", description: "Tell us what you need built", href: "#contact", icon: Send },
          { kind: "copy", label: "Email us directly", value: "agency@xeebots.com", icon: Mail },
          { label: "View pricing", description: "Plans and custom scope", href: "#pricing", icon: Tag },
        ],
      },
    ],
  },
];
