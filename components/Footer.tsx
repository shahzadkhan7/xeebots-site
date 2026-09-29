import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-content flex-col gap-3 px-gutter py-8 sm:flex-row sm:items-center sm:justify-between">
        <a href="#top" className="flex items-center gap-2">
          <Logo size="footer" />
          <span className="font-display text-body font-semibold">Xeebots</span>
        </a>
        <p className="font-mono text-label-sm uppercase text-muted">
          © {new Date().getFullYear()} Xeebots · AI automation &amp; agent systems
        </p>
      </div>
    </footer>
  );
}
