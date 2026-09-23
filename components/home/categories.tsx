import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { shopCategories } from "@/lib/shop-categories";

export function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <Reveal>
          <SectionLabel>Sortiment</SectionLabel>
        </Reveal>
        <h2 className="mx-auto mt-5 max-w-2xl text-2xl leading-[0.95] sm:text-3xl md:text-4xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Alles für Ihr" },
              { text: "nächstes Projekt", className: "font-accent" },
              { text: "– an einem Ort." },
            ]}
          />
        </h2>
      </div>

      <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
        {shopCategories.map((category, i) => (
          <Reveal key={category.name} delay={i * 0.06}>
            <Link
              href="/shop"
              className="group flex flex-col items-center gap-3 text-center focus-visible:outline-none"
            >
              <span className="relative block h-20 w-20 overflow-hidden rounded-full ring-2 ring-[var(--color-border)] transition-all duration-200 group-hover:-translate-y-1 group-hover:ring-[var(--color-primary)] group-focus-visible:ring-[var(--color-ring)] sm:h-24 sm:w-24">
                <Image src={category.image} alt="" fill sizes="96px" className="object-cover" />
              </span>
              <span className="text-xs font-medium sm:text-sm">{category.name}</span>
            </Link>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2} className="mt-12 text-center">
        <ArrowLink href="/shop">Ganzes Sortiment ansehen</ArrowLink>
      </Reveal>
    </section>
  );
}
