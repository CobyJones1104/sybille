export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[var(--color-border)] py-6 last:border-0">
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <div className="space-y-1.5 text-sm leading-relaxed text-[var(--color-muted-foreground)]">{children}</div>
    </section>
  );
}

/** Markiert einen einzelnen fehlenden/offenen Wert innerhalb eines Abschnitts. */
export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-[var(--color-muted)] px-1.5 py-0.5 text-[var(--color-foreground)]">
      [{children}]
    </span>
  );
}
