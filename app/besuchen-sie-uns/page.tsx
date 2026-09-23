import type { Metadata } from "next";
import { Clock, PackageCheck, ParkingSquare } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";
import { MapEmbed } from "@/components/besuchen/map-embed";
import { businessInfo, openingHours } from "@/lib/business-info";

export const metadata: Metadata = {
  title: "Besuchen Sie uns – Sybille's Nähparadies, Spargasse Bad Kissingen",
  description:
    "Sybille's Nähparadies finden Sie in der Fußgängerzone von Bad Kissingen, Spargasse 5. Öffnungszeiten, Anfahrt und kostenlose Abholung (Click & Collect).",
};

export default function BesuchenSieUnsPage() {
  return (
    <>
      <PageHero
        label="Anfahrt"
        segments={[{ text: "Besuchen Sie uns" }, { text: "in der Fußgängerzone.", className: "font-accent" }]}
        lead={`${businessInfo.street}, ${businessInfo.postalCode} ${businessInfo.city}`}
      />

      <section className="mx-auto max-w-5xl px-6 py-12">
        <Reveal>
          <MapEmbed />
        </Reveal>
      </section>

      <section className="bg-[var(--color-background-alt)]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 sm:py-20 md:grid-cols-2">
          <Reveal>
            <SectionLabel className="mb-4 flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Öffnungszeiten
            </SectionLabel>
            <dl className="space-y-1.5 text-sm">
              {openingHours.map((entry) => (
                <div key={entry.day} className="flex justify-between border-b border-[var(--color-border)] py-1.5 last:border-0">
                  <dt>{entry.day}</dt>
                  <dd className="font-medium">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <SectionLabel className="mb-4 flex items-center gap-2">
              <ParkingSquare className="h-3.5 w-3.5" aria-hidden="true" />
              Anfahrt &amp; Parken
            </SectionLabel>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Die Spargasse liegt in der Fußgängerzone von Bad Kissingen.
              [Platzhalter: Hinweis zu nahegelegenen Parkmöglichkeiten wird noch ergänzt.]
            </p>
          </Reveal>
        </div>
      </section>

      <section className="px-3 pb-12 sm:px-4 md:px-6">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[var(--color-foreground)] px-6 py-16 text-center text-[var(--color-background-alt)] sm:py-20 md:rounded-[2rem]">
          <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
          <div className="relative mx-auto max-w-xl">
          <PackageCheck className="mx-auto mb-5 h-7 w-7 text-[var(--color-primary)]" strokeWidth={1.5} aria-hidden="true" />
          <h2 className="text-2xl leading-[0.95] sm:text-3xl">
            <WordsPullUpMultiStyle
              segments={[{ text: "Online bestellen," }, { text: "im Laden abholen.", className: "font-accent" }]}
            />
          </h2>
          <Reveal delay={0.15}>
          <p className="mt-5 leading-relaxed text-[var(--color-background-alt)]/70">
            Mit Click &amp; Collect sparen Sie sich den Versand: Bestellen Sie online und holen
            Sie Ihre Ware kostenlos direkt bei uns in der Spargasse ab.
          </p>
          <p className="mt-3 text-sm italic text-[var(--color-background-alt)]/50">
            Bereitstellungszeit wird nach Klärung mit Sybille ergänzt (siehe offene Fragen in
            docs/konzept.md).
          </p>
          </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
