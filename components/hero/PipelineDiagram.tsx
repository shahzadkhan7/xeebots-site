"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { X } from "lucide-react";
import { flowDash, notchSize } from "@/design-tokens";
import { SignalDot } from "../SignalDot";
import { Fade, FadeInline, FadeSvg } from "./Fade";
import { nodeAt, type NodeKey, type Scenario } from "./scenarios";

type Box = { x: number; y: number; w: number; h: number };

interface Layout {
  width: number;
  height: number;
  direction: "horizontal" | "vertical";
  triggers: Box[];
  core: Box;
  destinations: Box[];
}

const NODE = { w: 136, h: 48 };

/** ≥ sm: left → right. */
const wide: Layout = {
  width: 520,
  height: 264,
  direction: "horizontal",
  triggers: [8, 108, 208].map((y) => ({ x: 2, y, ...NODE })),
  core: { x: 192, y: 72, w: 136, h: 120 },
  destinations: [8, 108, 208].map((y) => ({ x: 382, y, ...NODE })),
};

/** < sm: top → bottom, so labels stay legible on a phone. */
const tall: Layout = {
  width: 424,
  height: 360,
  direction: "vertical",
  triggers: [2, 144, 286].map((x) => ({ x, y: 2, ...NODE })),
  core: { x: 144, y: 120, w: 136, h: 120 },
  destinations: [2, 144, 286].map((x) => ({ x, y: 310, ...NODE })),
};

const NOTCH = { node: parseFloat(notchSize.sm), core: parseFloat(notchSize.lg) };
const FOCUS_GAP = 4;
const PAD = FOCUS_GAP + 2;
export const PAYLOAD_PANEL_ID = "pipeline-payload";

const notchPath = ({ x, y, w, h }: Box, n: number) => `M${x} ${y}H${x + w - n}L${x + w} ${y + n}V${y + h}H${x}Z`;
const grow = ({ x, y, w, h }: Box, by: number): Box => ({ x: x - by, y: y - by, w: w + by * 2, h: h + by * 2 });

/** Curve between two boxes; `spread` fans the lines out along the core's edge. */
function connector(from: Box, to: Box, dir: Layout["direction"], spread: { on: "from" | "to"; i: number }) {
  const at = (side: "from" | "to") => (spread.on === side ? (spread.i + 1) / 4 : 0.5);
  if (dir === "horizontal") {
    const [x1, y1] = [from.x + from.w, from.y + from.h * at("from")];
    const [x2, y2] = [to.x, to.y + to.h * at("to")];
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1}C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`;
  }
  const [x1, y1] = [from.x + from.w * at("from"), from.y + from.h];
  const [x2, y2] = [to.x + to.w * at("to"), to.y];
  const my = (y1 + y2) / 2;
  return `M${x1} ${y1}C${x1} ${my} ${x2} ${my} ${x2} ${y2}`;
}

interface NodeProps {
  nodeKey: NodeKey;
  box: Box;
  notch: number;
  label: string;
  selected: boolean;
  onSelect: (key: NodeKey) => void;
  children: ReactNode;
}

function DiagramNode({ nodeKey, box, notch, label, selected, onSelect, children }: NodeProps) {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(nodeKey);
    }
  };
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={`${label}: ${selected ? "hide" : "show"} payload`}
      aria-expanded={selected}
      aria-controls={selected ? PAYLOAD_PANEL_ID : undefined}
      data-node-key={nodeKey}
      onClick={() => onSelect(nodeKey)}
      onKeyDown={onKeyDown}
      className="group cursor-pointer outline-none"
    >
      <path
        d={notchPath(grow(box, FOCUS_GAP), notch + 2)}
        strokeDasharray="3 3"
        className="fill-none stroke-ink opacity-0 group-focus-visible:opacity-100"
      />
      <path
        d={notchPath(box, notch)}
        strokeWidth={selected ? 1.5 : 1}
        className={`fill-card transition-colors duration-base ${selected ? "stroke-ink" : "stroke-line-strong group-hover:stroke-ink"}`}
      />
      {children}
    </g>
  );
}

function Diagram({
  layout,
  scenario,
  selected,
  onSelect,
  className,
}: {
  layout: Layout;
  scenario: Scenario;
  selected: NodeKey | null;
  onSelect: (key: NodeKey) => void;
  className: string;
}) {
  const { core, direction } = layout;

  const edgeNodes = (group: "trigger" | "destination") =>
    (group === "trigger" ? layout.triggers : layout.destinations).map((box, i) => {
      const key = `${group}-${i}` as NodeKey;
      const { label } = nodeAt(scenario, key);
      const cx = box.x + box.w / 2;
      return (
        <DiagramNode
          key={key}
          nodeKey={key}
          box={box}
          notch={NOTCH.node}
          label={label}
          selected={selected === key}
          onSelect={onSelect}
        >
          <text x={cx} y={box.y + 19} textAnchor="middle" className="fill-muted font-mono text-label-sm uppercase">
            {group}
          </text>
          <FadeSvg swapKey={label}>
            <text x={cx} y={box.y + 37} textAnchor="middle" className="fill-ink font-sans text-body-sm font-semibold">
              {label}
            </text>
          </FadeSvg>
        </DiagramNode>
      );
    });

  const coreCx = core.x + core.w / 2;
  const { tasks } = scenario.core;

  return (
    <svg
      viewBox={`${-PAD} ${-PAD} ${layout.width + PAD * 2} ${layout.height + PAD * 2}`}
      className={`h-auto w-full ${className}`}
      role="group"
      aria-label="Pipeline: three triggers feed the Xeebots agent, which sends to three destinations"
    >
      {/* inbound: triggers → core */}
      {layout.triggers.map((box, i) => (
        <path
          key={`in-${i}`}
          d={connector(box, core, direction, { on: "to", i })}
          className={`fill-none transition-colors duration-base ${selected === `trigger-${i}` ? "stroke-ink" : "stroke-line-strong"}`}
        />
      ))}
      {/* outbound: core → destinations, live */}
      {layout.destinations.map((box, i) => (
        <path
          key={`out-${i}`}
          d={connector(core, box, direction, { on: "from", i })}
          strokeWidth={1.5}
          strokeDasharray={`${flowDash.dash} ${flowDash.gap}`}
          className="fill-none stroke-signal animate-flow-dash"
        />
      ))}

      {edgeNodes("trigger")}

      <DiagramNode
        nodeKey="core"
        box={core}
        notch={NOTCH.core}
        label="Xeebots Agent"
        selected={selected === "core"}
        onSelect={onSelect}
      >
        <text x={coreCx} y={core.y + 30} textAnchor="middle" className="fill-ink font-mono text-label font-semibold">
          XEEBOTS AGENT
        </text>
        <line x1={core.x + 14} x2={core.x + core.w - 14} y1={core.y + 44} y2={core.y + 44} className="stroke-line" />
        <FadeSvg swapKey={tasks.join()}>
          {tasks.map((task, i) => (
            <text
              key={task}
              x={coreCx}
              y={core.y + 66 + i * 18}
              textAnchor="middle"
              className="fill-muted font-mono text-label-sm"
            >
              {task}
            </text>
          ))}
        </FadeSvg>
      </DiagramNode>

      {edgeNodes("destination")}
    </svg>
  );
}

export function PipelineDiagram({
  scenario,
  selected,
  onSelect,
  onClose,
}: {
  scenario: Scenario;
  selected: NodeKey | null;
  onSelect: (key: NodeKey) => void;
  onClose: () => void;
}) {
  const open = selected ? nodeAt(scenario, selected) : null;

  return (
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape" && selected) onClose();
      }}
    >
      <figure className="notch border border-line bg-card">
        <div className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
          <span className="font-mono text-label uppercase">Pipeline</span>
          <span className="font-mono text-label-sm uppercase text-muted">Select a node to inspect</span>
        </div>
        <div className="p-card-sm sm:p-card">
          <Diagram layout={wide} scenario={scenario} selected={selected} onSelect={onSelect} className="hidden sm:block" />
          <Diagram layout={tall} scenario={scenario} selected={selected} onSelect={onSelect} className="block sm:hidden" />
        </div>
        <figcaption className="flex items-center gap-2.5 border-t border-line px-4 py-3 font-mono text-label-sm uppercase text-muted">
          <SignalDot />
          <FadeInline swapKey={scenario.caption}>{scenario.caption}</FadeInline>
        </figcaption>
      </figure>

      {open && selected && (
        <div
          id={PAYLOAD_PANEL_ID}
          role="region"
          aria-label={`Payload for ${open.label}`}
          className="notch-sm mt-3 border border-line bg-card"
        >
          <div className="flex items-center justify-between gap-4 border-b border-line py-1.5 pl-4 pr-1.5">
            <p className="font-mono text-label uppercase">
              <span className="text-muted">{open.role} · </span>
              <FadeInline swapKey={open.label}>{open.label}</FadeInline>
            </p>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close payload"
              className="inline-flex size-8 items-center justify-center rounded text-muted transition-colors duration-base hover:text-ink"
            >
              <X aria-hidden className="size-4" />
            </button>
          </div>
          <Fade swapKey={`${scenario.id}:${selected}`}>
            <pre className="whitespace-pre-wrap break-words p-4 font-mono text-log">
              <code>{JSON.stringify(open.payload, null, 2)}</code>
            </pre>
          </Fade>
        </div>
      )}
    </div>
  );
}
