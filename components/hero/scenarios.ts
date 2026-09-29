export type Payload = Record<string, unknown>;

export interface PipelineNode {
  label: string;
  payload: Payload;
}

type Three<T> = [T, T, T];

export interface Scenario {
  id: string;
  query: string;
  response: string;
  build: { name: string; description: string };
  caption: string;
  triggers: Three<PipelineNode>;
  core: { tasks: string[]; payload: Payload };
  destinations: Three<PipelineNode>;
}

/**
 * Nodes are addressed by position (trigger-0 … destination-2), not by label,
 * so an open payload panel stays on the same slot when the scenario changes.
 */
export type NodeKey = `trigger-${0 | 1 | 2}` | "core" | `destination-${0 | 1 | 2}`;

export function nodeAt(scenario: Scenario, key: NodeKey): { label: string; role: string; payload: Payload } {
  if (key === "core") return { label: "Xeebots Agent", role: "core", payload: scenario.core.payload };
  const [group, i] = key.split("-") as ["trigger" | "destination", string];
  const node = (group === "trigger" ? scenario.triggers : scenario.destinations)[Number(i)];
  return { label: node.label, role: group, payload: node.payload };
}

export const scenarios: Scenario[] = [
  {
    id: "intake",
    query: "We lose leads because nobody replies to Instagram DMs fast enough.",
    response: "That's a response-time problem, not a staffing problem. Here's the closest thing we've already built:",
    build: {
      name: "Multi-channel intake → AI agent → CRM",
      description:
        "Voice, SMS, email and Messenger routed into one AI agent that qualifies, answers, and logs every conversation automatically — built for a property management business handling 100+ contacts a week.",
    },
    caption: "live architecture — property management client, in production",
    triggers: [
      {
        label: "Voice/SMS",
        payload: { channel: "sms", from: "+1 555 018 2291", intent: "schedule_viewing" },
      },
      {
        label: "Email",
        payload: {
          channel: "email",
          from: "j.alvarez@mailbox.com",
          subject: "Is the 2BR on Elm St still available?",
          intent: "availability_inquiry",
        },
      },
      {
        label: "Messenger",
        payload: { channel: "messenger", psid: "6120094471", message: "Do you allow pets?", intent: "policy_question" },
      },
    ],
    core: {
      tasks: ["routes", "qualifies", "logs"],
      payload: { agent: "xeebots-agent-v2", action: "qualify_lead", score: 0.91, routed_to: "airtable.prospects" },
    },
    destinations: [
      {
        label: "AirTable",
        payload: { table: "Prospects", record_id: "rec_84a2", status: "created" },
      },
      {
        label: "Buildium",
        payload: { entity: "rental_application", unit: "Elm-2B", applicant_id: "app_30917", status: "invited" },
      },
      {
        label: "Slack",
        payload: { channel: "#leasing", text: "New qualified lead — viewing requested for Elm-2B", score: 0.91 },
      },
    ],
  },
  {
    id: "support",
    query: "Our support inbox gets the same 20 questions every day.",
    response:
      "That's exactly what a retrieval-grounded chatbot is for — not a script, an agent that actually reads your docs. Closest match:",
    build: {
      name: "Knowledge-grounded support agent",
      description:
        "A RAG chatbot trained on a company's own documentation, deployed to answer real customer questions in production — streams responses, hands off to a human when it's genuinely stuck.",
    },
    caption: "live architecture — RAG support agent, in production",
    triggers: [
      {
        label: "Web widget",
        payload: { channel: "web_widget", session_id: "ses_7f3c", query: "How do I rotate my API key?" },
      },
      {
        label: "Help center",
        payload: {
          channel: "help_center",
          article_views: ["api-keys", "auth-errors"],
          query: "key stopped working after rotation",
        },
      },
      {
        label: "Email",
        payload: {
          channel: "email",
          from: "ops@northwind.io",
          subject: "Do failed webhooks retry?",
          intent: "technical_question",
        },
      },
    ],
    core: {
      tasks: ["retrieves", "answers", "escalates"],
      payload: {
        agent: "xeebots-agent-v2",
        action: "answer",
        matched_doc: "docs/api-keys#rotation",
        confidence: 0.87,
        escalate: false,
      },
    },
    destinations: [
      {
        label: "Knowledge base",
        payload: { index: "product-docs", top_k: 4, matched_doc: "docs/api-keys#rotation", similarity: 0.87 },
      },
      {
        label: "CRM",
        payload: { object: "ticket", ticket_id: "TCK-22817", status: "resolved_by_agent", tags: ["api-keys"] },
      },
      {
        label: "Human queue",
        payload: {
          queue: "tier-2",
          escalate: true,
          reason: "confidence_below_threshold",
          confidence: 0.42,
          handoff_summary: "Webhooks failing after key rotation; customer already tried the docs steps.",
        },
      },
    ],
  },
  {
    id: "voice",
    query: "I want to know a lead is qualified before I ever get on a call.",
    response: "That's a pre-call filter, built once and run forever. Closest match:",
    build: {
      name: "Voice agent + lead scoring",
      description:
        "An AI voice agent that answers, asks the right five questions, scores the lead, and only routes the ones worth your time — everything else gets logged and followed up automatically.",
    },
    caption: "live architecture — inbound voice qualification, in production",
    triggers: [
      {
        label: "Inbound call",
        payload: { channel: "voice", from: "+1 555 014 7730", duration_s: 214, answered_by: "agent" },
      },
      {
        label: "Web form",
        payload: {
          form: "book-a-call",
          fields: { company_size: "11-50", budget: "$5k-10k", timeline: "this quarter" },
        },
      },
      {
        label: "Ad click",
        payload: { source: "google_ads", campaign: "ai-automation-search", landing: "/voice-agents", gclid: "Cj0KCQjw…" },
      },
    ],
    core: {
      tasks: ["scores", "routes", "books"],
      payload: {
        agent: "xeebots-agent-v2",
        action: "score_lead",
        questions_answered: 5,
        budget: "$5k-10k",
        score: 0.84,
        decision: "book_call",
      },
    },
    destinations: [
      {
        label: "Calendar",
        payload: { event: "discovery_call", slot: "2026-10-01T15:30:00Z", duration_min: 30, status: "booked" },
      },
      {
        label: "CRM",
        payload: { object: "lead", lead_id: "ld_55120", stage: "qualified", score: 0.84, source: "inbound_call" },
      },
      {
        label: "Slack",
        payload: { channel: "#sales", text: "Qualified lead booked Thu 15:30 UTC — budget $5k-10k, timeline this quarter" },
      },
    ],
  },
];
