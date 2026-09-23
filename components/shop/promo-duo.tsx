import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowLink } from "@/components/ui/arrow-link";

/**
 * Zwei-Spalten-Promoblock nach der Layout-Vorlage.
 * Bewusst ohne erfundenen Countdown/Rabatt – beworben wird nur, was es wirklich gibt.
 */
export function PromoDuo() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-6 py-10 md:grid-cols-2">
      <Reveal className="relative overflow-hidden rounded-2xl bg-[var(--color-background-alt)] p-8 md:rounded-[2rem]">
        <div className="relative z-10 max-w-[62%]">
          <SectionLabel>Günstiger</SectionLabel>
          <h3 className="mt-3 text-xl font-bold sm:text-2xl">Reste &amp; Sonderposten</h3>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Kleinere Stoffstücke zum günstigeren Meterpreis – ideal für Taschen, Kissen und
            Probestücke.
          </p>
          <div className="mt-6">
            <ArrowLink href="/kontakt">Nach Resten fragen</ArrowLink>
          </div>
        </div>
        <span className="absolute -right-6 bottom-0 h-40 w-40 overflow-hidden rounded-2xl opacity-90 sm:h-48 sm:w-48">
          <Image
            src="/images/shop/dekostoff-streifen-natur.svg"
            alt=""
            fill
            sizes="192px"
            className="object-cover"
          />
        </span>
      </Reveal>

      <Reveal delay={0.08} className="relative overflow-hidden rounded-2xl bg-[var(--color-foreground)] p-8 text-[var(--color-background-alt)] md:rounded-[2rem]">
        <div className="relative z-10 max-w-[62%]">
          <SectionLabel>Service</SectionLabel>
          <h3 className="mt-3 text-xl font-bold sm:text-2xl">Zuschnitt nach Maß</h3>
          <p className="mt-2 text-sm text-[var(--color-background-alt)]">
            Meterware schneiden wir in 0,5-m-Schritten genau so zu, wie Sie sie brauchen.
          </p>
          <div className="mt-6">
            <ArrowLink href="/besuchen-sie-uns" tone="light">
              Im Laden beraten lassen
            </ArrowLink>
          </div>
        </div>
        <span className="absolute -right-2 bottom-2 h-36 w-36 sm:h-44 sm:w-44">
          <Image
            src="/images/shop/schere-freigestellt.svg"
            alt=""
            fill
            sizes="176px"
            className="object-contain"
          />
        </span>
      </Reveal>
    </section>
  );
}
