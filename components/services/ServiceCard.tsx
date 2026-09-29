const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Static for now. Pass `href` later and it renders as a link with the same
 * look; the focus ring is inset because the notch clip-path would cut off an
 * outside outline.
 */
export function ServiceCard({
  number,
  title,
  description,
  href,
}: {
  number: number;
  title: string;
  description: string;
  href?: string;
}) {
  const className =
    "notch-sm flex h-full flex-col gap-3 border border-line bg-card p-card transition duration-base ease-out " +
    "hover:-translate-y-0.5 hover:border-line-strong " +
    "focus-visible:-translate-y-0.5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ink " +
    "motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:focus-visible:translate-y-0";

  const content = (
    <>
      <span className="font-mono text-label text-muted">{pad(number)}</span>
      <h3 className="font-display text-display-sm">{title}</h3>
      <p className="text-body-sm text-ink/75">{description}</p>
    </>
  );

  return href ? (
    <a href={href} className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
