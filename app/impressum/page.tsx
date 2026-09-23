import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { LegalNotice } from "@/components/legal/legal-notice";
import { LegalSection, Placeholder } from "@/components/legal/legal-section";
import { businessInfo } from "@/lib/business-info";

export const metadata: Metadata = { title: "Impressum – Sybille's Nähparadies" };

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        label="Rechtliches"
        segments={[{ text: "Impressum" }]}
        lead="Angaben gemäß § 5 DDG"
      />

      <section className="mx-auto max-w-2xl px-6 pb-20 pt-4">

      <Reveal>
        <LegalNotice />
      </Reveal>

      <Reveal className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-6">
        <LegalSection title="Diensteanbieter">
          <p>
            <Placeholder>Vollständiger Name der Inhaberin</Placeholder>
          </p>
          <p>{businessInfo.name}</p>
          <p>
            {businessInfo.street}
            <br />
            {businessInfo.postalCode} {businessInfo.city}
          </p>
        </LegalSection>

        <LegalSection title="Kontakt">
          <p>Telefon: {businessInfo.phone} (noch zu bestätigen)</p>
          <p>
            E-Mail: <Placeholder>geschäftliche E-Mail-Adresse fehlt noch</Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Umsatzsteuer">
          <p>
            Umsatzsteuer-Identifikationsnummer oder Kleinunternehmerstatus (§ 19 UStG):{" "}
            <Placeholder>von Sybille zu bestätigen</Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Rechtsform / Register">
          <p>
            Rechtsform (z. B. Einzelunternehmen, e. K.) und ggf. Registergericht/-nummer:{" "}
            <Placeholder>von Sybille zu bestätigen</Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Redaktionell verantwortlich">
          <p>
            <Placeholder>Name, Anschrift wie oben</Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Streitschlichtung">
          <p>
            <Placeholder>
              Aktuelle Hinweispflichten zur Streitschlichtung ändern sich – wird vom
              Rechtstexte-Generator korrekt ergänzt
            </Placeholder>
          </p>
        </LegalSection>
      </Reveal>
    </section>
    </>
  );
}
