import type { Metadata } from "next";
import Link from "next/link";
import { Info, MessageCircleHeart } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ShopHero } from "@/components/shop/shop-hero";
import { ShopTrustBar } from "@/components/shop/shop-trust-bar";
import { ShopBrowser } from "@/components/shop/shop-browser";
import { FeaturedRow } from "@/components/shop/featured-row";
import { PopularRow } from "@/components/shop/popular-row";
import { PromoDuo } from "@/components/shop/promo-duo";
import { sampleProducts } from "@/lib/sample-products";
import { sampleProductToDisplay, shopifyProductToDisplay, type DisplayProduct } from "@/lib/product-display";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { getProducts } from "@/lib/shopify/products";

export const metadata: Metadata = {
  title: "Shop – Stoffe, Wolle & Kurzwaren | Sybille's Nähparadies",
  description:
    "Stoffe als Meterware, Wolle, Kurzwaren, Reißverschlüsse und Nähzubehör online bestellen – mit Versand in ganz Deutschland oder kostenloser Abholung in Bad Kissingen.",
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
    <>
      <ShopHero products={products} />
      <ShopTrustBar />

      {isDemo && (
        <div className="mx-auto max-w-6xl px-6 pt-10">
          <Reveal className="flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-4 text-sm text-[var(--color-muted-foreground)]">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
            <p>
              Vorschau mit Beispielartikeln und gezeichneten Stoffmustern. Sobald der
              Shopify-Store verbunden ist, erscheinen hier automatisch die echten Produkte,
              Fotos, Preise und Bestände.
            </p>
          </Reveal>
        </div>
      )}

      <FeaturedRow products={products} />
      <ShopBrowser products={products} />
      <PopularRow products={products} />
      <PromoDuo />

      <section className="border-t border-[var(--color-border)] bg-[var(--color-background-alt)]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-14 text-center">
          <MessageCircleHeart className="h-7 w-7 text-[var(--color-primary)]" strokeWidth={1.75} aria-hidden="true" />
          <h2 className="text-xl font-semibold">Etwas nicht gefunden?</h2>
          <p className="max-w-md text-sm text-[var(--color-muted-foreground)]">
            Im Laden liegt deutlich mehr als online – schreiben Sie uns einfach, wonach Sie
            suchen, wir schauen für Sie nach.
          </p>
          <Link href="/kontakt">
            <Button>Nachricht schreiben</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
