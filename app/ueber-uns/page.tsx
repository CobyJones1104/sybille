import type { Metadata } from "next";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Über uns / Der Laden – Sybille's Nähparadies Bad Kissingen",
  description:
    "Lernen Sie Sybille und ihr Fachgeschäft für Stoffe, Wolle, Kurzwaren und Nähzubehör in der Spargasse in Bad Kissingen kennen.",
};

// Galerie-Platzhalter, solange keine echten Ladenfotos vorliegen (siehe docs/bildquellen.md).
const galleryPlaceholders = ["Ladenansicht", "Stoffregal", "Beratungstisch", "Schaufenster"];

export default function UeberUnsPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-[var(--color-primary)]">
            Der Laden
          </p>
          <h1 className="text-3xl font-semibold sm:text-4xl">Sybille&apos;s Nähparadies</h1>
        </Reveal>
      </section>

      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 pb-16 md:grid-cols-2 md:gap-14">
        <Reveal className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem]">
          <Image
            src="/images/team/sybille-portraet.webp"
            alt="Sybille, Inhaberin von Sybille's Nähparadies"
            fill
            sizes="(min-width: 768px) 384px, 320px"
            className="object-cover"
          />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="text-xl font-semibold">Meine Geschichte</h2>
          <p className="mt-3 leading-relaxed text-[var(--color-muted-foreground)]">
            Seit [Jahr/Zeitraum – wird noch ergänzt] führe ich mein Nähparadies in der
            Spargasse in Bad Kissingen. Was als [Platzhalter – z. B. Familienbetrieb /
            Neustart nach der Ausbildung] begann, ist heute ein Fachgeschäft, in dem sich
            Stammkundinnen und Neugierige gleichermaßen wohlfühlen.
          </p>
          <p className="mt-3 text-sm italic text-[var(--color-muted-foreground)]">
            Platzhaltertext – wird mit den echten Angaben von Sybille ergänzt (siehe offene
            Fragen in docs/konzept.md).
          </p>
        </Reveal>
      </section>

      <section className="bg-[var(--color-background-alt)]">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
          <Reveal>
            <h2 className="text-xl font-semibold">Sybille persönlich</h2>
            <p className="mt-3 leading-relaxed text-[var(--color-muted-foreground)]">
              Mit einer Leidenschaft fürs Nähen, die ich gerne weitergebe, berate ich Sie
              persönlich – ob beim ersten eigenen Kleidungsstück oder beim passenden Garn für
              ein Projekt, das schon lange in der Schublade liegt. [Platzhalter: Ausbildung /
              Erfahrung / besondere Spezialgebiete von Sybille.]
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <Reveal>
          <h2 className="text-xl font-semibold">Was den Laden besonders macht</h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          {[
            {
              title: "Große Auswahl an Meterware",
              text: "Von Baumwolle bis Walkstoff – passend zugeschnitten in der Menge, die Sie brauchen.",
            },
            {
              title: "Persönliche Beratung",
              text: "Wir nehmen uns Zeit für Ihr Projekt, vor Ort und auf Wunsch auch online.",
            },
            {
              title: "Regional verwurzelt",
              text: "Mitten in der Fußgängerzone von Bad Kissingen – ein Ort zum Stöbern und Fragen stellen.",
            },
          ].map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6">
              <p className="font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-background-alt)]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal className="mb-8 text-center">
            <h2 className="text-xl font-semibold">Einblicke in den Laden</h2>
            <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
              Echte Fotos folgen, sobald sie zur Verfügung stehen.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {galleryPlaceholders.map((label, i) => (
              <Reveal
                key={label}
                delay={i * 0.06}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-card)] text-center"
              >
                <ImageOff className="h-6 w-6 text-[var(--color-muted-foreground)]" strokeWidth={1.5} aria-hidden="true" />
                <span className="px-2 text-xs text-[var(--color-muted-foreground)]">{label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
