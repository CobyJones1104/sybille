import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LegalNotice } from "@/components/legal/legal-notice";
import { LegalSection, Placeholder } from "@/components/legal/legal-section";

export const metadata: Metadata = { title: "AGB – Sybille's Nähparadies" };

const sections = [
  "Geltungsbereich",
  "Vertragspartner",
  "Vertragsschluss",
  "Preise und Versandkosten",
  "Zahlungsbedingungen",
  "Lieferung, Verfügbarkeit, Click & Collect",
  "Eigentumsvorbehalt",
  "Gewährleistung",
  "Streitbeilegung",
];

export default function AgbPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <Reveal className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Allgemeine Geschäftsbedingungen</h1>
      </Reveal>

      <Reveal>
        <LegalNotice />
      </Reveal>

      <Reveal className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-6">
        {sections.map((title) => (
          <LegalSection key={title} title={title}>
            <p>
              <Placeholder>Klauseltext folgt aus dem Rechtstexte-Generator</Placeholder>
            </p>
          </LegalSection>
        ))}
      </Reveal>
    </section>
  );
}
