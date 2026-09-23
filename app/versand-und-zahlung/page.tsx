import type { Metadata } from "next";
import { Truck, Store, Wallet } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Versand & Zahlung – Sybille's Nähparadies",
  description: "Versandkosten, Click & Collect und akzeptierte Zahlarten bei Sybille's Nähparadies.",
};

const shippingTiers = [
  { label: "Standardversand", value: "4,95 €", note: "bis 20 € Bestellwert" },
  { label: "Standardversand", value: "2,95 €", note: "ab 20 € Bestellwert" },
  { label: "Versandkostenfrei", value: "0,00 €", note: "ab 60 € Bestellwert" },
  { label: "Abholung im Laden (Click & Collect)", value: "kostenlos", note: "i. d. R. innerhalb 1 Werktag" },
];

const paymentMethods = ["PayPal", "Klarna (Rechnung/Raten)", "SEPA-Lastschrift", "Vorkasse/Überweisung", "Barzahlung bei Abholung"];

export default function VersandUndZahlungPage() {
  return (
    <>
      <PageHero
        label="Bestellung"
        segments={[{ text: "Versand" }, { text: "& Zahlung.", className: "font-accent" }]}
        lead="Vorläufiger Vorschlag – wird vor Go-live final mit Sybille abgestimmt (siehe docs/konzept.md, Abschnitt e)."
      />

      <section className="mx-auto max-w-3xl px-6 py-16">

      <Reveal className="mb-12">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold sm:text-2xl">
          <Truck className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
          Versand
        </h2>
        <div className="divide-y divide-[var(--color-border)] rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] md:rounded-[1.75rem]">
          {shippingTiers.map((tier) => (
            <div key={tier.label + tier.note} className="flex items-center justify-between gap-4 px-5 py-4">
              <div>
                <p className="font-medium">{tier.label}</p>
                <p className="text-sm text-[var(--color-muted-foreground)]">{tier.note}</p>
              </div>
              <p className="font-semibold">{tier.value}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.1} className="mb-12">
        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold sm:text-2xl">
          <Store className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
          Click &amp; Collect
        </h2>
        <p className="leading-relaxed text-[var(--color-muted-foreground)]">
          Bestellen Sie online und holen Sie Ihre Ware kostenlos direkt in der Spargasse in
          Bad Kissingen ab – ganz ohne Versandkosten.
        </p>
      </Reveal>

      <Reveal delay={0.2}>
        <h2 className="mb-5 flex items-center gap-2 text-xl font-bold sm:text-2xl">
          <Wallet className="h-5 w-5 text-[var(--color-primary)]" aria-hidden="true" />
          Zahlarten
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {paymentMethods.map((method) => (
            <li
              key={method}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm"
            >
              {method}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
          Aus Kundenwunsch bieten wir bewusst keine Kreditkarten- oder Apple-/Google-Pay-Zahlung an.
        </p>
      </Reveal>
      </section>
    </>
  );
}
