import { MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { businessInfo, openingHours } from "@/lib/business-info";

export function VisitTeaser() {
  return (
    <section className="bg-[var(--color-foreground)] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 sm:py-20 md:grid-cols-2 md:items-center">
        <Reveal>
          <h2 className="text-2xl font-semibold sm:text-3xl">
            Schauen Sie vorbei – mitten in der Fußgängerzone
          </h2>
          <p className="mt-4 flex items-start gap-2 text-[var(--color-background-alt)]">
            <MapPin className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <span>
              {businessInfo.street}, {businessInfo.postalCode} {businessInfo.city}
            </span>
          </p>
          <div className="mt-6">
            <Button variant="secondary" className="border-white/40 text-white">
              Anfahrt &amp; Öffnungszeiten
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-2xl bg-white/5 p-6">
          <p className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-background-alt)]">
            <Clock className="h-4 w-4" aria-hidden="true" />
            Öffnungszeiten
          </p>
          <dl className="space-y-1.5 text-sm">
            {openingHours.map((entry) => (
              <div key={entry.day} className="flex justify-between border-b border-white/10 py-1.5 last:border-0">
                <dt className="text-[var(--color-background-alt)]">{entry.day}</dt>
                <dd>{entry.hours}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
