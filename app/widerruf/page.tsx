import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { LegalNotice } from "@/components/legal/legal-notice";
import { LegalSection, Placeholder } from "@/components/legal/legal-section";

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
          <strong>Wichtige offene Frage für die rechtliche Prüfung:</strong> Zugeschnittene
          Meterware (Stoffe nach Kundenwunsch in individueller Länge zugeschnitten) könnte
          unter die Ausnahme für Sonderanfertigungen fallen, für die das gesetzliche
          Widerrufsrecht eingeschränkt oder ausgeschlossen sein kann (vergleichbar
          §&nbsp;312g Abs.&nbsp;2 BGB zu individuell angefertigten Waren). Das muss vor
          Fertigstellung der Widerrufsbelehrung rechtlich geprüft werden – hier keine eigene
          Einschätzung, sondern nur ein Hinweis, das nicht zu übersehen.
        </p>
      </Reveal>

      <Reveal className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-6">
        <LegalSection title="Widerrufsrecht">
          <p>
            <Placeholder>14-tägiges Widerrufsrecht – Formulierung und ggf. Ausnahmen für Meterware folgen aus der rechtlichen Prüfung</Placeholder>
          </p>
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
