import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import type { DisplayProduct } from "@/lib/product-display";

/** Empfehlungs-Reihe auf dunklem Grund, Aufbau nach der Layout-Vorlage. */
export function FeaturedRow({ products }: { products: DisplayProduct[] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <Reveal className="rounded-3xl bg-[var(--color-foreground)] p-6 sm:p-8">
        <h2 className="mb-6 text-lg font-semibold text-white sm:text-xl">Beliebt bei unseren Kundinnen</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {products.slice(0, 5).map((product, i) => (
            <Reveal key={product.id} delay={i * 0.05} className="overflow-hidden rounded-2xl bg-white">
              <div className="relative aspect-square">
                {product.imageUrl && (
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt ?? product.name}
                    fill
                    sizes="(min-width: 1024px) 200px, 45vw"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-medium text-[var(--color-foreground)]">{product.name}</p>
                <p className="mt-1 text-sm font-semibold text-[var(--color-primary)]">
                  {product.price.toFixed(2).replace(".", ",")} €
                  <span className="ml-1 text-xs font-normal text-[var(--color-muted-foreground)]">
                    {product.unit === "Meter" ? "/ m" : product.unit === "Set" ? "/ Set" : "/ Stück"}
                  </span>
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
