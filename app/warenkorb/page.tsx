"use client";

import Link from "next/link";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/cart-context";

function formatMoney(amount: string, currency: string) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency }).format(Number.parseFloat(amount));
}

export default function WarenkorbPage() {
  const { cart, isConfigured, isLoading, updateItem, removeItem } = useCart();

  if (!isConfigured) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <ShoppingBag className="mx-auto mb-4 h-8 w-8 text-[var(--color-muted-foreground)]" aria-hidden="true" />
        <h1 className="text-2xl font-semibold">Warenkorb</h1>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Der Bestellprozess ist noch nicht angebunden – der Shop läuft aktuell im Vorschau-Modus
          (siehe <code className="rounded bg-[var(--color-muted)] px-1.5 py-0.5">docs/shopify-setup.md</code>).
        </p>
        <Link href="/shop" className="mt-6 inline-block">
          <Button variant="secondary">Zurück zum Shop</Button>
        </Link>
      </section>
    );
  }

  if (!cart || cart.lines.length === 0) {
    return (
      <section className="mx-auto max-w-lg px-6 py-24 text-center">
        <ShoppingBag className="mx-auto mb-4 h-8 w-8 text-[var(--color-muted-foreground)]" aria-hidden="true" />
        <h1 className="text-2xl font-semibold">Ihr Warenkorb ist leer</h1>
        <Link href="/shop" className="mt-6 inline-block">
          <Button>Weiter stöbern</Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <Reveal className="mb-10 text-center">
        <h1 className="text-3xl font-semibold">Warenkorb</h1>
      </Reveal>

      <Reveal className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
        {cart.lines.map((line) => (
          <div key={line.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex-1">
              <p className="font-medium">{line.merchandise.product.title}</p>
              {line.merchandise.title !== "Default Title" && (
                <p className="text-sm text-[var(--color-muted-foreground)]">{line.merchandise.title}</p>
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
              <span className="min-w-8 text-center text-sm tabular-nums">{line.quantity}</span>
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
        ))}
      </Reveal>

      <Reveal delay={0.1} className="mt-8 flex items-center justify-between border-t border-[var(--color-border)] pt-6">
        <p className="text-lg font-semibold">Zwischensumme</p>
        <p className="text-lg font-semibold">
          {formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)}
        </p>
      </Reveal>

      <Reveal delay={0.15} className="mt-6 text-center">
        <a href={cart.checkoutUrl}>
          <Button className="w-full sm:w-auto">Zur Kasse</Button>
        </a>
        <p className="mt-3 text-xs text-[var(--color-muted-foreground)]">
          Die Kasse läuft über den sicheren Shopify-Checkout mit den in Shopify hinterlegten
          Zahlarten.
        </p>
      </Reveal>
    </section>
  );
}
