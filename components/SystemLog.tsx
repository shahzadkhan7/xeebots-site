import { SignalDot } from "./SignalDot";

export interface LogLine {
  /** HH:MM:SS */
  time: string;
  /** Verb before the event, e.g. "trigger", "sync" */
  action: string;
  /** The system/event name — the highlighted key term, e.g. "retell.call.completed" */
  event: string;
  /** What happened, after the arrow */
  result: string;
}

/**
 * Terminal-style log strip. Reusable: pass any lines; `live` adds the pulse
 * indicator in the header (only when the log represents a running system).
 */
export function SystemLog({
  lines,
  title = "System log",
  live = true,
  className = "",
}: {
  lines: LogLine[];
  title?: string;
  live?: boolean;
  className?: string;
}) {
  return (
    <section aria-label={title} className={`notch-sm border border-line bg-card font-mono ${className}`}>
      <header className="flex items-center justify-between gap-4 border-b border-line px-4 py-3">
        <span className="text-label uppercase">{title}</span>
        {live && (
          <span className="flex items-center gap-2 text-label-sm uppercase text-muted">
            <SignalDot />
            Live
          </span>
        )}
      </header>
      <ol className="flex flex-col gap-2 p-4 text-log sm:gap-1.5 sm:px-5">
        {lines.map((line) => (
          <li key={`${line.time}-${line.event}`} className="grid grid-cols-[auto_1fr] gap-x-3 sm:gap-x-4">
            <time dateTime={line.time} className="text-muted">
              {line.time}
            </time>
            <p className="min-w-0 break-words">
              <span className="text-ink/60">{line.action}</span>{" "}
              <span className="font-semibold text-signal-text">{line.event}</span>{" "}
              <span className="text-muted">→</span> {line.result}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
