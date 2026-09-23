import { WordsPullUpMultiStyle, type PullUpSegment } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";
import { Reveal } from "@/components/motion/reveal";

/**
 * Einstieg jeder Unterseite: dunkle, abgerundete Karte mit Versal-Label und
 * wortweise einschwebender Überschrift – gleiche Handschrift wie die Startseite.
 * Das -mt-16 hebt den Platzhalter für die überlagernde Navigations-Pille auf,
 * pt-… schafft ihn innerhalb der Karte wieder.
 */
export function PageHero({
  label,
  segments,
  lead,
  children,
}: {
  label: string;
  segments: PullUpSegment[];
  lead?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="-mt-16 p-3 sm:p-4 md:-mt-[4.5rem] md:p-6">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-foreground)] px-6 pb-14 pt-28 text-center md:rounded-[2rem] md:px-10 md:pb-20 md:pt-36">
        <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />

        <div className="relative mx-auto max-w-3xl">
          <Reveal>
            <SectionLabel>{label}</SectionLabel>
          </Reveal>

          <h1 className="mt-5 text-3xl leading-[0.95] text-[var(--color-background-alt)] sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl">
            <WordsPullUpMultiStyle segments={segments} />
          </h1>

          {lead && (
            <Reveal delay={0.15}>
              <p className="mx-auto mt-6 max-w-xl text-sm text-[var(--color-background-alt)]/70 sm:text-base">
                {lead}
              </p>
            </Reveal>
          )}

          {children && <Reveal delay={0.2}>{children}</Reveal>}
        </div>
      </div>
    </section>
  );
}
