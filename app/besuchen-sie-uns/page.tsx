import type { Metadata } from "next";
import { MapPin, Clock, PackageCheck, ParkingSquare } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
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
      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--color-primary)]">
            Anfahrt
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Besuchen Sie uns in der Bad Kissinger Fußgängerzone
          </h1>
          <p className="mt-4 flex items-center justify-center gap-2 text-[var(--color-muted-foreground)]">
            <MapPin className="h-5 w-5 shrink-0" aria-hidden="true" />
            {businessInfo.street}, {businessInfo.postalCode} {businessInfo.city}
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <Reveal>
          <MapEmbed />
        </Reveal>
      </section>

      <section className="bg-[var(--color-background-alt)]">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-6 py-16 sm:py-20 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Öffnungszeiten
            </p>
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
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <ParkingSquare className="h-4 w-4" aria-hidden="true" />
              Anfahrt &amp; Parken
            </p>
            <p className="text-sm text-[var(--color-muted-foreground)]">
              Die Spargasse liegt in der Fußgängerzone von Bad Kissingen.
              [Platzhalter: Hinweis zu nahegelegenen Parkmöglichkeiten wird noch ergänzt.]
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <PackageCheck className="mx-auto mb-4 h-8 w-8 text-[var(--color-primary)]" strokeWidth={1.75} aria-hidden="true" />
          <h2 className="text-xl font-semibold">Online bestellen, im Laden abholen</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-muted-foreground)]">
            Mit Click &amp; Collect sparen Sie sich den Versand: Bestellen Sie online und holen
            Sie Ihre Ware kostenlos direkt bei uns in der Spargasse ab.
          </p>
          <p className="mt-2 text-sm italic text-[var(--color-muted-foreground)]">
            Bereitstellungszeit wird nach Klärung mit Sybille ergänzt (siehe offene Fragen in
            docs/konzept.md).
          </p>
        </Reveal>
      </section>
    </>
  );
}
