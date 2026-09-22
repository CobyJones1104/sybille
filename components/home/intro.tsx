import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

/**
 * Kurzvorstellung von Sybille direkt unter dem Header.
 * Text aus docs/konzept.md (Abschnitt b) – Platzhalter, die noch mit
 * echten Angaben (Zeitraum, Geschichte) ergänzt werden, siehe offene Fragen.
 */
export function Intro() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
      <Reveal>
        <div className="mx-auto mb-6 h-20 w-20 overflow-hidden rounded-full ring-4 ring-[var(--color-background-alt)]">
          <Image
            src="/images/team/sybille-portraet.webp"
            alt="Sybille, Inhaberin von Sybille's Nähparadies"
            width={80}
            height={80}
            className="h-full w-full object-cover"
            style={{ objectPosition: "52% 32%" }}
          />
        </div>
        <h2 className="text-2xl font-semibold sm:text-3xl">Willkommen bei mir im Laden</h2>
        <p className="mt-5 text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
          Bei mir finden Sie nicht einfach Stoffe von der Rolle, sondern jemanden, der mit
          Ihnen zusammen den richtigen Stoff, das passende Garn oder den letzten Handgriff
          für Ihr Projekt sucht. Mit einer Leidenschaft fürs Nähen, die ich gerne weitergebe
          – ob Sie Anfängerin sind oder schon lange an der Nähmaschine sitzen.
        </p>
        <p className="mt-3 text-sm text-[var(--color-muted-foreground)] italic">
          Platzhaltertext – wird mit echten Angaben zu Sybille und der Geschichte des Ladens ergänzt.
        </p>
      </Reveal>
    </section>
  );
}
