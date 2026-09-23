import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";
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
    <>
      <PageHero label="Rechtliches" segments={[{ text: "Allgemeine" }, { text: "Geschäftsbedingungen", className: "font-accent" }]} />

      <section className="mx-auto max-w-2xl px-6 pb-20 pt-4">

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
    </>
  );
}
