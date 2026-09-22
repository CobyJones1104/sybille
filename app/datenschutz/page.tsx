import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LegalNotice } from "@/components/legal/legal-notice";
import { LegalSection, Placeholder } from "@/components/legal/legal-section";

export const metadata: Metadata = { title: "Datenschutz – Sybille's Nähparadies" };

export default function DatenschutzPage() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
      <Reveal className="mb-8 text-center">
        <h1 className="text-3xl font-semibold">Datenschutzerklärung</h1>
      </Reveal>

      <Reveal>
        <LegalNotice />
      </Reveal>

      <Reveal className="mb-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-6">
        <LegalSection title="Verantwortlicher">
          <p>
            <Placeholder>Name, Anschrift und Kontakt wie im Impressum, sobald bestätigt</Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Betroffenenrechte">
          <p>
            <Placeholder>
              Rechte nach DSGVO (Auskunft, Berichtigung, Löschung, Widerspruch usw.) – Formulierung
              durch Rechtstexte-Generator
            </Placeholder>
          </p>
        </LegalSection>
      </Reveal>

      <Reveal delay={0.1} className="mb-4 text-center">
        <h2 className="text-lg font-semibold">Technische Bestandsaufnahme (Stand: aktueller Code)</h2>
        <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
          Diese Liste beschreibt, was die Webseite tatsächlich tut – als Grundlage für den
          Rechtstexte-Generator. Sie wird bei jeder Änderung an eingesetzten Diensten aktualisiert.
        </p>
      </Reveal>

      <Reveal delay={0.15} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-6">
        <LegalSection title="Hosting">
          <p>
            <Placeholder>Hosting-Anbieter steht noch nicht fest (Vorgabe: Vercel, Netlify oder EU-Hosting)</Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Schriftarten">
          <p>
            Playfair Display und Inter werden über <code>next/font</code> zur Build-Zeit lokal
            eingebunden. Es findet <strong>kein</strong> Request an das Google-Fonts-CDN statt.
          </p>
        </LegalSection>

        <LegalSection title="Cookies">
          <p>Aktuell setzt die Webseite keine Cookies (kein Tracking, keine Analytics, kein Login).</p>
        </LegalSection>

        <LegalSection title="Kontaktformular (/kontakt)">
          <p>Erhobene Daten: Name, E-Mail-Adresse, Betreff-Auswahl, Nachrichtentext.</p>
          <p>
            Verarbeitung: Wird aktuell nur serverseitig geloggt, <strong>noch nicht</strong> per
            E-Mail versendet. Sobald ein E-Mail-Versand (z. B. über Mailtrap) angebunden ist, muss
            dieser Abschnitt ergänzt werden.
          </p>
        </LegalSection>

        <LegalSection title="Kartendarstellung (/besuchen-sie-uns)">
          <p>
            Die Karte wird per Zwei-Klick-Lösung eingebunden: Erst nach aktivem Klick auf „Karte
            laden&quot; wird eine Verbindung zu OpenStreetMap (openstreetmap.org) aufgebaut und die
            IP-Adresse an OpenStreetMap übertragen.
          </p>
        </LegalSection>

        <LegalSection title="Zahlungsanbieter">
          <p>
            <Placeholder>
              Noch nicht integriert – folgt mit der Shop-Anbindung (siehe
              docs/shop-architektur-vergleich.md)
            </Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Analytics / Tracking">
          <p>Aktuell nicht eingesetzt.</p>
        </LegalSection>
      </Reveal>
    </section>
  );
}
