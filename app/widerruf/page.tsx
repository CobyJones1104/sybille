import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { LegalNotice } from "@/components/legal/legal-notice";
import { LegalSection, Placeholder } from "@/components/legal/legal-section";
import {
  meterwareIstVomWiderrufAusgeschlossen,
  MeterwareWiderrufHinweis,
} from "@/lib/widerruf";

export const metadata: Metadata = { title: "Widerruf – Sybille's Nähparadies" };

export default function WiderrufPage() {
  return (
    <>
      <PageHero label="Rechtliches" segments={[{ text: "Widerrufs" }, { text: "belehrung", className: "font-accent" }]} />

      <section className="mx-auto max-w-2xl px-6 pb-20 pt-4">

      <Reveal>
        <LegalNotice />
      </Reveal>

      <Reveal className="mx-auto mb-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-[var(--color-destructive)]/30 bg-[var(--color-destructive)]/5 p-4 text-sm">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-destructive)]" aria-hidden="true" />
        <p>
          <strong>Offene Rechtsfrage, vor dem Go-live zu klären:</strong> Ob zugeschnittene
          Meterware als kundenspezifische Anfertigung gilt und damit vom Widerrufsrecht
          ausgenommen sein kann, ist nicht eindeutig. Die Entscheidungsvorlage für die
          Rechtsberatung liegt in{" "}
          <code className="rounded bg-[var(--color-muted)] px-1.5 py-0.5">docs/widerruf-meterware.md</code>.
          Beide Varianten sind im Shop vorbereitet; bis zur Klärung ist die vorsichtigere
          eingestellt – das Widerrufsrecht gilt auch für Zuschnitte.
        </p>
      </Reveal>

      <Reveal className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-6">
        <LegalSection title="Widerrufsrecht">
          <p>
            <Placeholder>
              14-tägiges Widerrufsrecht – verbindliche Formulierung aus dem
              Rechtstexte-Generator
            </Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Zugeschnittene Meterware">
          {meterwareIstVomWiderrufAusgeschlossen() ? (
            <>
              <p>{MeterwareWiderrufHinweis.lang}</p>
              <p>
                <Placeholder>
                  Verbindliche Formulierung des Ausschlusses aus dem Rechtstexte-Generator
                </Placeholder>
              </p>
            </>
          ) : (
            <>
              <p>
                Das Widerrufsrecht gilt derzeit auch für Stoffe, die wir auf Ihre
                Wunschlänge zuschneiden.
              </p>
              <p>
                <Placeholder>
                  Einstellung bis zur rechtlichen Klärung – Formulierung und ein möglicher
                  Wertersatz für die Wertminderung durch den Zuschnitt folgen aus der Prüfung
                </Placeholder>
              </p>
            </>
          )}
        </LegalSection>

        <LegalSection title="Folgen des Widerrufs">
          <p>
            <Placeholder>Rückerstattungsmodalitäten, Rücksendekosten</Placeholder>
          </p>
        </LegalSection>

        <LegalSection title="Muster-Widerrufsformular">
          <p>
            <Placeholder>
              gesetzlich vorgeschriebenes Formular (Anlage 2 zu Art. 246a § 1 Abs. 2 EGBGB) – wird
              unverändert aus dem Rechtstexte-Generator übernommen
            </Placeholder>
          </p>
        </LegalSection>
      </Reveal>
    </section>
    </>
  );
}
