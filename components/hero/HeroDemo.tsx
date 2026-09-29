"use client";

import { useCallback, useState } from "react";
import { AgentConsole } from "./AgentConsole";
import { PipelineDiagram } from "./PipelineDiagram";
import { scenarios, type NodeKey } from "./scenarios";

/**
 * Owns the active scenario so the console and the diagram can't drift apart:
 * advancing the console re-renders the diagram from the same state.
 */
export function HeroDemo() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<NodeKey | null>(null);
  const scenario = scenarios[index];

  const next = useCallback(() => setIndex((i) => (i + 1) % scenarios.length), []);
  const toggleNode = useCallback((key: NodeKey) => setSelected((cur) => (cur === key ? null : key)), []);

  const closePanel = useCallback(() => {
    const key = selected;
    setSelected(null);
    if (!key) return;
    // Hand focus back to the node that opened the panel (whichever layout is visible).
    const nodes = document.querySelectorAll<SVGGElement>(`[data-node-key="${key}"]`);
    Array.from(nodes)
      .find((el) => el.getClientRects().length > 0)
      ?.focus();
  }, [selected]);

  return (
    <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-8">
      <AgentConsole scenario={scenario} index={index} total={scenarios.length} onNext={next} />
      <PipelineDiagram scenario={scenario} selected={selected} onSelect={toggleNode} onClose={closePanel} />
    </div>
  );
}
