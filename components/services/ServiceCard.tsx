import { notchCardClass } from "../card-styles";

const pad = (n: number) => String(n).padStart(2, "0");

/** Static for now. Pass `href` later and it renders as a link with the same look. */
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
  const className = `${notchCardClass} gap-3`;

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
