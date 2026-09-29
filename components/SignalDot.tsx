/** Live-state indicator: a static signal dot with an expanding pulse ring. */
export function SignalDot() {
  return (
    <span aria-hidden className="relative inline-flex size-2 shrink-0">
      <span className="absolute inset-0 rounded-full bg-signal animate-signal-pulse" />
      <span className="relative size-2 rounded-full bg-signal" />
    </span>
  );
}
