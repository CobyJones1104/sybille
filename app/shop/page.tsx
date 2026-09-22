import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { sampleProducts } from "@/lib/sample-products";

export const metadata: Metadata = {
  title: "Shop – Sybille's Nähparadies",
  description: "Stoffe, Wolle, Kurzwaren, Reißverschlüsse und Nähzubehör von Sybille's Nähparadies.",
};

export default function ShopPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal className="mb-4 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Shop</h1>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Ein erster Blick auf Aufbau und Bedienung – mit zehn Beispielprodukten.
        </p>
      </Reveal>

      <Reveal className="mx-auto mb-12 flex max-w-xl items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-4 text-sm text-[var(--color-muted-foreground)]">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
        <p>
          Dies ist eine Vorschau mit fiktiven Beispielprodukten (siehe
          <code className="mx-1 rounded bg-[var(--color-muted)] px-1.5 py-0.5">docs/produkte-vorlage.csv</code>
          ). Bestand, Preise und Bestellfunktion sind noch nicht an ein echtes System angebunden
          – das folgt mit der Shop-Anbindung (siehe docs/shop-architektur-vergleich.md).
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProducts.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={(i % 3) * 0.06} />
        ))}
      </div>
    </section>
  );
}
