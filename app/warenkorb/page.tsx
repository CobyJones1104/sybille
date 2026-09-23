"use client";

import { Minus, Plus, X, ShoppingBag, ArrowRight, Info } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { useCart } from "@/components/cart/cart-context";
import { shopifyQuantityToMeters } from "@/lib/shopify/meterware";
import {
  meterwareIstVomWiderrufAusgeschlossen,
  MeterwareWiderrufHinweis,
} from "@/lib/widerruf";
import type { ShopifyCartLine } from "@/lib/shopify/types";

function formatMoney(amount: string, currency: string) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(Number.parseFloat(amount));
}

/**
 * Shopify zählt Meterware in ganzen Schritten (z. B. 3 × 0,5 m). Für die
 * Kundin ist aber nur die Meterzahl verständlich, deshalb wird hier
 * zurückgerechnet. Ohne Schrittweiten-Metafeld bleibt es bei Stückzahlen.
 */
function describeQuantity(line: ShopifyCartLine): { value: string; isMeterware: boolean } {
  const rawStep = line.merchandise.product.stepMeters?.value;
  const step = rawStep ? Number.parseFloat(rawStep) : NaN;

  if (!Number.isFinite(step) || step <= 0) {
    return { value: String(line.quantity), isMeterware: false };
  }

  const meters = shopifyQuantityToMeters(line.quantity, step);
  return {
    value: `${meters.toFixed(meters % 1 === 0 ? 0 : 1).replace(".", ",")} m`,
    isMeterware: true,
  };
}

export default function WarenkorbPage() {
  const { cart, isConfigured, isLoading, updateItem, removeItem } = useCart();

  if (!isConfigured) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <ShoppingBag className="mx-auto mb-4 h-8 w-8 text-[var(--color-muted-foreground)]" aria-hidden="true" />
        <h1 className="text-2xl font-bold sm:text-3xl">Warenkorb</h1>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Der Bestellprozess ist noch nicht angebunden – der Shop läuft aktuell im Vorschau-Modus
          (siehe <code className="rounded bg-[var(--color-muted)] px-1.5 py-0.5">docs/shopify-setup.md</code>).
        </p>
        <div className="mt-8">
          <ArrowLink href="/shop">Zurück zum Shop</ArrowLink>
        </div>
      </section>
    );
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <ShoppingBag className="mx-auto mb-4 h-8 w-8 text-[var(--color-muted-foreground)]" aria-hidden="true" />
        <h1 className="text-2xl font-bold sm:text-3xl">Ihr Warenkorb ist leer</h1>
        <div className="mt-8">
          <ArrowLink href="/shop">Weiter stöbern</ArrowLink>
        </div>
      </section>
    );
  }

  const enthaeltMeterware = cart.lines.some((line) => {
    const step = Number.parseFloat(line.merchandise.product.stepMeters?.value ?? "");
    return Number.isFinite(step) && step > 0;
  });
  const zeigeWiderrufHinweis = enthaeltMeterware && meterwareIstVomWiderrufAusgeschlossen();

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <div className="mb-12 text-center">
        <Reveal>
          <SectionLabel>Ihre Auswahl</SectionLabel>
        </Reveal>
        <h1 className="mt-4 text-3xl leading-[0.95] sm:text-4xl">
          <WordsPullUpMultiStyle segments={[{ text: "Waren" }, { text: "korb.", className: "font-accent" }]} />
        </h1>
      </div>

      {zeigeWiderrufHinweis && (
        <Reveal className="mb-5 flex items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-4 text-sm text-[var(--color-muted-foreground)]">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
          <p>{MeterwareWiderrufHinweis.lang}</p>
        </Reveal>
      )}

      <Reveal className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] md:rounded-[1.75rem]">
        {cart.lines.map((line) => {
          const quantity = describeQuantity(line);
          return (
          <div key={line.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1">
              <p className="font-medium">{line.merchandise.product.title}</p>
              {quantity.isMeterware ? (
                <p className="text-sm text-[var(--color-muted-foreground)]">Zuschnitt nach Maß</p>
              ) : (
                line.merchandise.title !== "Default Title" && (
                  <p className="text-sm text-[var(--color-muted-foreground)]">{line.merchandise.title}</p>
                )
              )}
            </div>

            <div className="inline-flex items-center rounded-full border border-[var(--color-border)]" role="group" aria-label="Menge">
              <button
                type="button"
                aria-label="Menge verringern"
                disabled={isLoading || line.quantity <= 1}
                onClick={() => updateItem(line.id, line.quantity - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--color-muted)] disabled:opacity-40"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="min-w-14 text-center text-sm tabular-nums">{quantity.value}</span>
              <button
                type="button"
                aria-label="Menge erhöhen"
                disabled={isLoading}
                onClick={() => updateItem(line.id, line.quantity + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-[var(--color-muted)] disabled:opacity-40"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <p className="w-20 text-right font-medium">
              {formatMoney(line.cost.totalAmount.amount, line.cost.totalAmount.currencyCode)}
            </p>

            <button
              type="button"
              aria-label="Entfernen"
              disabled={isLoading}
              onClick={() => removeItem(line.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-muted)] hover:text-[var(--color-destructive)] disabled:opacity-40"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
          );
        })}
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
        <p className="text-lg font-bold">Zwischensumme</p>
        <p className="text-lg font-bold">
          {formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-6 text-center">
        {/* Externer Shopify-Checkout, daher bewusst ein normaler Link */}
        <a
          href={cart.checkoutUrl}
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] py-1.5 pl-6 pr-1.5 text-base font-medium text-[var(--color-on-primary)] transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2"
        >
          Zur Kasse
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-foreground)] transition-transform duration-200 group-hover:scale-110">
            <ArrowRight className="h-4 w-4 text-[var(--color-background-alt)]" aria-hidden="true" />
          </span>
        </a>
        <p className="mt-3 text-xs text-[var(--color-muted-foreground)]">
          Die Kasse läuft über den sicheren Shopify-Checkout mit den in Shopify hinterlegten
          Zahlarten.
        </p>
      </Reveal>
    </section>
  );
}
