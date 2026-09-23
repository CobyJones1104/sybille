import type { SampleProduct } from "@/lib/sample-products";
import type { ShopifyProduct } from "@/lib/shopify/types";

export interface DisplayProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  currency: string;
  unit: "Meter" | "Stück" | "Set";
  minQuantity: number;
  stepQuantity: number;
  description: string;
  imageUrl: string | null;
  imageAlt: string | null;
  /** Shopify-Varianten-ID zum Bestellen. `null` = Demo-Produkt ohne echten Warenkorb. */
  variantId: string | null;
}

export function sampleProductToDisplay(product: SampleProduct): DisplayProduct {
  return {
    id: product.id,
    name: product.name,
    category: product.category,
    price: product.price,
    currency: "EUR",
    unit: product.unit,
    minQuantity: product.minQuantity,
    stepQuantity: product.stepQuantity,
    description: product.description,
    imageUrl: product.image,
    imageAlt: `${product.name} – ${product.category} bei Sybille's Nähparadies`,
    variantId: null,
  };
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function shopifyProductToDisplay(product: ShopifyProduct): DisplayProduct | null {
  const variant = product.variants.find((v) => v.availableForSale) ?? product.variants[0];
  if (!variant) return null;

  const isMeterware = product.stepMeters !== null;

  return {
    id: product.id,
    name: product.title,
    category: product.productType || "Sortiment",
    price: Number.parseFloat(variant.price.amount),
    currency: variant.price.currencyCode,
    unit: isMeterware ? "Meter" : "Stück",
    minQuantity: isMeterware ? (product.stepMeters as number) : 1,
    stepQuantity: isMeterware ? (product.stepMeters as number) : 1,
    description: stripHtml(product.descriptionHtml),
    imageUrl: product.featuredImage?.url ?? null,
    imageAlt: product.featuredImage?.altText ?? product.title,
    variantId: variant.id,
  };
}
