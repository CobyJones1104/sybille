export function ComingSoon({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="text-3xl font-semibold">{title}</h1>
      <p className="mt-4 text-[var(--color-muted-foreground)]">
        Diese Seite ist Teil der nächsten Ausbaustufe und wird in Kürze mit Inhalten gefüllt.
      </p>
    </section>
  );
}
