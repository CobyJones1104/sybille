import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { ScrollRevealText } from "@/components/motion/scroll-reveal-text";
import { Reveal } from "@/components/motion/reveal";

const BODY_TEXT =
  "Bei mir finden Sie nicht einfach Stoffe von der Rolle, sondern jemanden, der mit Ihnen zusammen den richtigen Stoff, das passende Garn oder den letzten Handgriff für Ihr Projekt sucht – ob Sie gerade anfangen oder schon lange an der Nähmaschine sitzen.";

/**
 * Zweite Sparte im Aufbau der Layout-Vorlage: dunkle Karte, kleines Label,
 * mehrstilige Überschrift mit kursivem Serif-Akzent, danach ein Fließtext,
 * dessen Zeichen beim Scrollen nach und nach aufklaren.
 */
export function Intro() {
  return (
    <section className="bg-[var(--color-background)] px-3 py-12 sm:px-4 sm:py-16 md:px-6">
      <Reveal className="mx-auto max-w-6xl rounded-2xl bg-[#2c231c] px-6 py-16 text-center sm:py-20 md:rounded-[2rem] md:py-24">
        <p className="mb-6 text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] sm:text-xs">
          Stoffe &amp; Wolle
        </p>

        <h2 className="mx-auto max-w-3xl text-3xl leading-[0.95] text-[var(--color-background-alt)] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl">
          <WordsPullUpMultiStyle
            segments={[
              { text: "Ich bin Sybille," },
              { text: "mein Laden liegt mitten in Bad Kissingen.", className: "font-accent" },
              { text: "Stoffe, Wolle, Kurzwaren – und Beratung, die weiterhilft." },
            ]}
          />
        </h2>

        <ScrollRevealText
          text={BODY_TEXT}
          className="mx-auto mt-10 max-w-2xl justify-center text-xs leading-relaxed text-[var(--color-background-alt)] sm:text-sm md:text-base"
        />

        <p className="mt-6 text-xs italic text-[var(--color-background-alt)]/50">
          Platzhaltertext – wird mit echten Angaben zu Sybille und der Geschichte des Ladens ergänzt.
        </p>
      </Reveal>
    </section>
  );
}
