"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Check, Info } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import { useCart } from "@/components/cart/cart-context";
import { metersToShopifyQuantity } from "@/lib/shopify/meterware";
import {
  meterwareIstVomWiderrufAusgeschlossen,
  MeterwareWiderrufHinweis,
} from "@/lib/widerruf";
import type { DisplayProduct } from "@/lib/product-display";

const unitLabel: Record<DisplayProduct["unit"], string> = {
  Meter: "/ Meter",
  Stück: "/ Stück",
  Set: "/ Set",
};

export function ProductCard({ product, delay = 0 }: { product: DisplayProduct; delay?: number }) {
  const [quantity, setQuantity] = useState(product.minQuantity);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem, isLoading, isConfigured } = useCart();

  const canOrder = Boolean(product.variantId) && isConfigured;
  // Bei ausgeschlossenem Widerruf muss der Hinweis vor dem Kauf sichtbar sein.
  const zeigeWiderrufHinweis =
    product.unit === "Meter" && meterwareIstVomWiderrufAusgeschlossen();

  async function handleAddToCart() {
    if (!product.variantId) return;
    const shopifyQuantity =
      product.unit === "Meter" ? metersToShopifyQuantity(quantity, product.stepQuantity) : Math.round(quantity);
    await addItem(product.variantId, shopifyQuantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <Reveal delay={delay} className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="relative flex aspect-[4/3] items-center justify-center bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.imageAlt ?? product.name}
            fill
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <ImageOff className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-primary)]">
          {product.category}
        </p>
        <h3 className="font-semibold leading-snug">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-[var(--color-muted-foreground)]">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-semibold">
            {product.price.toFixed(2).replace(".", ",")} €{" "}
            <span className="text-xs font-normal text-[var(--color-muted-foreground)]">{unitLabel[product.unit]}</span>
          </p>
        </div>
        {zeigeWiderrufHinweis && (
          <p className="flex items-start gap-1.5 text-xs text-[var(--color-muted-foreground)]">
            <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {MeterwareWiderrufHinweis.kurz}
          </p>
        )}
        <QuantityStepper
          value={quantity}
          min={product.minQuantity}
          step={product.stepQuantity}
          unit={product.unit}
          onChange={setQuantity}
        />
        <button
          type="button"
          disabled={!canOrder || isLoading}
          onClick={handleAddToCart}
          title={canOrder ? undefined : "Bestellsystem folgt, sobald der Shopify-Store verbunden ist"}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-foreground)] transition-colors enabled:hover:bg-[var(--color-muted)] disabled:cursor-not-allowed disabled:text-[var(--color-muted-foreground)]"
        >
          {justAdded ? (
            <>
              <Check className="h-4 w-4" aria-hidden="true" /> Hinzugefügt
            </>
          ) : canOrder ? (
            "In den Warenkorb"
          ) : (
            "In den Warenkorb (folgt)"
          )}
        </button>
      </div>
    </Reveal>
  );
}
