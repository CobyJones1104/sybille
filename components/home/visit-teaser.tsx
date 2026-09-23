import { MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { businessInfo, openingHours } from "@/lib/business-info";

export function VisitTeaser() {
  return (
    <section className="px-3 pb-12 sm:px-4 md:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-2xl bg-[var(--color-foreground)] px-6 py-16 text-[var(--color-background-alt)] sm:py-20 md:rounded-[2rem] md:px-12">
        <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />

        <div className="relative grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
          <div>
            <Reveal>
              <SectionLabel>Der Laden</SectionLabel>
            </Reveal>
            <h2 className="mt-5 text-2xl leading-[0.95] sm:text-3xl md:text-4xl">
              <WordsPullUpMultiStyle
                className="justify-start text-left"
                segments={[
                  { text: "Schauen Sie vorbei –" },
                  { text: "mitten in der Fußgängerzone.", className: "font-accent" },
                ]}
              />
            </h2>
            <Reveal delay={0.15}>
              <p className="mt-5 flex items-start gap-2 text-sm text-[var(--color-background-alt)]/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  {businessInfo.street}, {businessInfo.postalCode} {businessInfo.city}
                </span>
              </p>
              <div className="mt-8">
                <ArrowLink href="/besuchen-sie-uns" tone="light">
                  Anfahrt &amp; Öffnungszeiten
                </ArrowLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="rounded-2xl bg-white/5 p-6 sm:p-8">
            <p className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[var(--color-background-alt)]/60 sm:text-xs">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Öffnungszeiten
            </p>
            <dl className="space-y-0 text-sm">
              {openingHours.map((entry) => (
                <div
                  key={entry.day}
                  className="flex justify-between border-b border-white/10 py-2 last:border-0"
                >
                  <dt className="text-[var(--color-background-alt)]/65">{entry.day}</dt>
                  <dd className="font-medium">{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
