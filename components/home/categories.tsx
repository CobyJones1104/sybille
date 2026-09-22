import Link from "next/link";
import { Shirt, CircleDot, Tag, Link2, Ruler, BookOpen } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

// Icons sind Platzhalter (Lucide) – finale Iconauswahl folgt in der Feinschliff-Phase.
const categories = [
  { icon: Shirt, name: "Stoffe", href: "/shop" },
  { icon: CircleDot, name: "Wolle & Garne", href: "/shop" },
  { icon: Tag, name: "Kurzwaren", href: "/shop" },
  { icon: Link2, name: "Reißverschlüsse", href: "/shop" },
  { icon: Ruler, name: "Nähzubehör", href: "/shop" },
  { icon: BookOpen, name: "Schnittmuster", href: "/shop" },
];

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal className="mb-10 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">Shop nach Kategorie</h2>
        <p className="mt-2 text-[var(--color-muted-foreground)]">
          Alles, was Sie für Ihr nächstes Nähprojekt brauchen.
        </p>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        {categories.map((cat, i) => (
          <Reveal key={cat.name} delay={i * 0.06}>
            <Link
              href={cat.href}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-6 text-center transition-colors duration-200 hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-background-alt)] transition-transform duration-200 group-hover:-translate-y-0.5">
                <cat.icon className="h-6 w-6 text-[var(--color-primary)]" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="text-sm font-medium">{cat.name}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
