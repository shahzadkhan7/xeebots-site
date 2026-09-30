import { Logo } from "./Logo";
import { Reveal } from "./Reveal";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Reveal className="mx-auto flex max-w-content flex-col items-center gap-4 px-gutter py-12 text-center sm:flex-row sm:justify-between sm:py-16 sm:text-left">
        <a href="#top" className="flex items-center gap-2">
          <Logo size="footer" />
          <span className="font-display text-body font-semibold">Xeebots</span>
        </a>
        {/* Log-timestamp style (mono, muted). ink/60 rather than `muted`, which is only 3.4:1 in light mode.
            Mobile: two deliberate lines, no separator (a wrapped line left a dangling "·").
            sm+: one line with the separator. */}
        <p className="flex flex-col gap-1 font-mono text-log text-ink/60 sm:flex-row sm:gap-0">
          <span className="whitespace-nowrap">agency@xeebots.com</span>
          <span aria-hidden className="hidden whitespace-pre sm:inline">
            {" · "}
          </span>
          <span className="whitespace-nowrap">built by Shahzad Khan</span>
        </p>
      </Reveal>
    </footer>
  );
}
