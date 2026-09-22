import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LegalNotice } from "@/components/legal/legal-notice";
import { LegalSection, Placeholder } from "@/components/legal/legal-section";
import { businessInfo } from "@/lib/business-info";

export const metadata: Metadata = { title: "Impressum – Sybille's Nähparadies" };

export default function ImpressumPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <Reveal className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Impressum</h1>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">Angaben gemäß § 5 DDG</p>
      </Reveal>

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
  );
}
