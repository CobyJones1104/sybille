import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";
import type { DisplayProduct } from "@/lib/product-display";

/** Runde Produktbilder mit Rangnummer, Aufbau nach der Layout-Vorlage. */
export function PopularRow({ products }: { products: DisplayProduct[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10">
        <Reveal>
          <SectionLabel>Frisch eingetroffen</SectionLabel>
        </Reveal>
        <h2 className="mt-4 text-xl leading-[0.95] sm:text-2xl md:text-3xl">
          <WordsPullUpMultiStyle
            className="justify-start text-left"
            segments={[{ text: "Neu" }, { text: "im Sortiment.", className: "font-accent" }]}
          />
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-5 sm:grid-cols-6">
        {products.slice(0, 6).map((product, i) => (
          <Reveal key={product.id} delay={i * 0.05} className="text-center">
            <span className="relative mx-auto block h-20 w-20 sm:h-24 sm:w-24">
              <span className="relative block h-full w-full overflow-hidden rounded-full ring-2 ring-[var(--color-border)]">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt ?? product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                )}
              </span>
              <span className="absolute -left-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-semibold text-[var(--color-on-primary)]">
                {i + 1}
              </span>
            </span>
            <p className="mt-2 line-clamp-2 text-xs font-medium sm:text-sm">{product.name}</p>
            <p className="text-xs text-[var(--color-muted-foreground)]">
              {product.price.toFixed(2).replace(".", ",")} €
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
