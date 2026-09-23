import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { shopCategories } from "@/lib/shop-categories";

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal className="mb-10 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">Shop nach Kategorie</h2>
        <p className="mt-2 text-[var(--color-muted-foreground)]">
          Alles, was Sie für Ihr nächstes Nähprojekt brauchen.
        </p>
      </Reveal>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {shopCategories.map((category, i) => (
          <Reveal key={category.name} delay={i * 0.06}>
            <Link
              href="/shop"
              className="group flex flex-col items-center gap-3 text-center focus-visible:outline-none"
            >
              <span className="relative block h-20 w-20 overflow-hidden rounded-full ring-2 ring-[var(--color-border)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:ring-[var(--color-primary)] group-focus-visible:ring-[var(--color-ring)] sm:h-24 sm:w-24">
                <Image src={category.image} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="text-xs font-medium sm:text-sm">{category.name}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
