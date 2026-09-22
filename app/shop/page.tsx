import type { Metadata } from "next";
import { Info } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/shop/product-card";
import { sampleProducts } from "@/lib/sample-products";
import { sampleProductToDisplay, shopifyProductToDisplay, type DisplayProduct } from "@/lib/product-display";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { getProducts } from "@/lib/shopify/products";

export const metadata: Metadata = {
  title: "Shop – Sybille's Nähparadies",
  description: "Stoffe, Wolle, Kurzwaren, Reißverschlüsse und Nähzubehör von Sybille's Nähparadies.",
};

async function loadProducts(): Promise<{ products: DisplayProduct[]; isDemo: boolean }> {
  if (isShopifyConfigured()) {
    try {
      const shopifyProducts = await getProducts();
      const mapped = shopifyProducts
        .map(shopifyProductToDisplay)
        .filter((p): p is DisplayProduct => p !== null);
      if (mapped.length > 0) return { products: mapped, isDemo: false };
    } catch {
      // Fällt unten auf die Demo-Daten zurück, statt die Seite abstürzen zu lassen.
    }
  }
  return { products: sampleProducts.map(sampleProductToDisplay), isDemo: true };
}

export default async function ShopPage() {
  const { products, isDemo } = await loadProducts();

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <Reveal className="mb-4 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Shop</h1>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          {isDemo
            ? "Ein erster Blick auf Aufbau und Bedienung – mit zehn Beispielprodukten."
            : "Stoffe, Wolle, Kurzwaren und mehr – direkt bestellbar."}
        </p>
      </Reveal>

      {isDemo && (
        <Reveal className="mx-auto mb-12 flex max-w-xl items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-4 text-sm text-[var(--color-muted-foreground)]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
          <p>
            Dies ist eine Vorschau mit fiktiven Beispielprodukten (siehe
            <code className="mx-1 rounded bg-[var(--color-muted)] px-1.5 py-0.5">docs/produkte-vorlage.csv</code>
            ). Sobald der Shopify-Store verbunden ist (siehe
            <code className="mx-1 rounded bg-[var(--color-muted)] px-1.5 py-0.5">docs/shopify-setup.md</code>
            ), erscheinen hier automatisch die echten Produkte, Preise und Bestände.
          </p>
        </Reveal>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} delay={(i % 3) * 0.06} />
        ))}
      </div>
    </section>
  );
}
