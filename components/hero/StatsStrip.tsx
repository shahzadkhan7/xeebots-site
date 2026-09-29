const stats = [
  { value: "89%", label: "Upwork job success score" },
  { value: "5.0", label: "Rating on completed projects" },
  { value: "4", label: "Systems in active production" },
  { value: "<48h", label: "Typical scope-to-build turnaround" },
];

export function StatsStrip() {
  return (
    <dl className="grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2 bg-paper p-card-sm sm:p-card">
          <dt className="order-2 font-mono text-label-sm uppercase text-muted">{stat.label}</dt>
          <dd className="order-1 font-display text-display-lg">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}
