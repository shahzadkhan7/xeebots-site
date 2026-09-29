"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight, CornerDownLeft } from "lucide-react";
import { SignalDot } from "../SignalDot";
import { Fade } from "./Fade";
import type { Scenario } from "./scenarios";

const pad = (n: number) => String(n).padStart(2, "0");

export function AgentConsole({
  scenario,
  index,
  total,
  onNext,
}: {
  scenario: Scenario;
  index: number;
  total: number;
  onNext: () => void;
}) {
  const [draft, setDraft] = useState("");
  const inputId = useId();

  // No real model behind this yet: any submission advances to the next
  // scripted scenario, exactly like "try another example".
  const submit = (e: FormEvent) => {
    e.preventDefault();
    setDraft("");
    onNext();
  };

  return (
    <section aria-label="Agent console" className="notch flex flex-col border border-line bg-card">
      <header className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <span className="flex items-center gap-2.5 font-mono text-label uppercase">
          <SignalDot />
          Ask the agent
        </span>
        <span className="font-mono text-label-sm text-muted" aria-label={`Example ${index + 1} of ${total}`}>
          {pad(index + 1)} / {pad(total)}
        </span>
      </header>

      <div aria-live="polite" className="flex flex-1 flex-col gap-5 p-card-sm sm:p-card">
        <div className="grid grid-cols-[2.5rem_1fr] gap-3">
          <span className="pt-0.5 font-mono text-label uppercase text-muted">You</span>
          <Fade swapKey={scenario.id}>
            <p className="text-body-lg">&ldquo;{scenario.query}&rdquo;</p>
          </Fade>
        </div>

        <div className="grid grid-cols-[2.5rem_1fr] gap-3">
          <span className="pt-0.5 font-mono text-label uppercase">XB</span>
          <Fade swapKey={scenario.id} className="flex flex-col gap-4">
            <p className="text-body text-ink/75">{scenario.response}</p>
            <div className="notch-sm border border-line-strong bg-paper p-card-sm">
              <p className="font-mono text-label-sm uppercase text-muted">Matched build</p>
              <p className="mt-1.5 font-display text-display-sm">{scenario.build.name}</p>
              <p className="mt-2 text-body-sm text-ink/75">{scenario.build.description}</p>
            </div>
          </Fade>
        </div>
      </div>

      <div className="border-t border-line p-card-sm sm:px-card">
        <form onSubmit={submit} className="flex items-center gap-2 border border-line bg-paper pl-3 focus-within:border-ink">
          <label htmlFor={inputId} className="sr-only">
            Describe what&apos;s eating your team&apos;s time
          </label>
          <input
            id={inputId}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Describe what's eating your team's time…"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent py-3 text-body-sm placeholder:text-muted focus:outline-none"
          />
          <button
            type="submit"
            aria-label="Send"
            className="inline-flex size-11 shrink-0 items-center justify-center text-muted transition-colors duration-base hover:text-ink"
          >
            <CornerDownLeft aria-hidden className="size-4" />
          </button>
        </form>
        <button
          type="button"
          onClick={onNext}
          className="group mt-3 inline-flex items-center gap-1.5 font-mono text-label uppercase text-ink/75 transition-colors duration-base hover:text-ink"
        >
          Try another example
          <ArrowRight aria-hidden className="size-3.5 transition-transform duration-base group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}
