import type { Metadata } from "next";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";

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
      <PageHero
        label="Der Laden"
        segments={[{ text: "Sybille's" }, { text: "Nähparadies", className: "font-accent" }]}
        lead="Ein Fachgeschäft mitten in Bad Kissingen – für alle, die gern mit den Händen arbeiten."
      />

      <section className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:gap-14">
        {/* Gleiche warme Tonung wie im Hero, damit das Foto zur Palette passt */}
        <Reveal className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-[2rem]">
          <Image
            src="/images/team/sybille-portraet.webp"
            alt="Sybille, Inhaberin von Sybille's Nähparadies"
            fill
            sizes="(min-width: 768px) 384px, 320px"
            className="object-cover object-[55%_28%]"
            style={{ filter: "sepia(0.45) saturate(0.8) contrast(1.05) brightness(0.95)" }}
          />
          <div aria-hidden="true" className="absolute inset-0 bg-[var(--color-primary)] opacity-25 mix-blend-color" />
        </Reveal>

        <Reveal delay={0.1}>
          <SectionLabel>Hintergrund</SectionLabel>
          <h2 className="mt-4 text-2xl font-bold sm:text-3xl">Meine Geschichte</h2>
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
            <SectionLabel>Wer dahintersteckt</SectionLabel>
            <h2 className="mx-auto mt-4 max-w-2xl text-2xl leading-[0.95] sm:text-3xl md:text-4xl">
              <WordsPullUpMultiStyle
                segments={[{ text: "Sybille" }, { text: "persönlich.", className: "font-accent" }]}
              />
            </h2>
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
          <SectionLabel>Besonderheiten</SectionLabel>
        </Reveal>
        <h2 className="mx-auto mt-4 max-w-2xl text-2xl leading-[0.95] sm:text-3xl md:text-4xl">
          <WordsPullUpMultiStyle
            segments={[{ text: "Was den Laden" }, { text: "besonders macht.", className: "font-accent" }]}
          />
        </h2>
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
            <Reveal key={item.title} delay={i * 0.08} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 md:rounded-[1.75rem]">
              <p className="font-bold">{item.title}</p>
              <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{item.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-background-alt)]">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
          <Reveal className="mb-8 text-center">
            <SectionLabel className="mb-4">Galerie</SectionLabel>
            <h2 className="text-2xl font-bold sm:text-3xl">Einblicke in den Laden</h2>
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
