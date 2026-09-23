import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

/**
 * Zwei-Spalten-Promoblock nach der Layout-Vorlage.
 * Bewusst ohne erfundenen Countdown/Rabatt – beworben wird nur, was es wirklich gibt.
 */
export function PromoDuo() {
  return (
    <section className="mx-auto grid max-w-6xl grid-cols-1 gap-5 px-6 py-10 md:grid-cols-2">
      <Reveal className="relative overflow-hidden rounded-3xl bg-[var(--color-background-alt)] p-8">
        <div className="relative z-10 max-w-[60%]">
          <h3 className="text-xl font-semibold">Reste &amp; Sonderposten</h3>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
            Kleinere Stoffstücke zum günstigeren Meterpreis – ideal für Taschen, Kissen und
            Probestücke.
          </p>
          <Link href="/kontakt" className="mt-5 inline-block">
            <Button variant="secondary">Nach Resten fragen</Button>
          </Link>
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

      <Reveal delay={0.08} className="relative overflow-hidden rounded-3xl bg-[var(--color-foreground)] p-8 text-white">
        <div className="relative z-10 max-w-[60%]">
          <h3 className="text-xl font-semibold">Zuschnitt nach Maß</h3>
          <p className="mt-2 text-sm text-[var(--color-background-alt)]">
            Meterware schneiden wir in 0,5-m-Schritten genau so zu, wie Sie sie brauchen.
          </p>
          <Link href="/besuchen-sie-uns" className="mt-5 inline-block">
            <Button variant="secondary" className="border-white/40 text-white">
              Im Laden beraten lassen
            </Button>
          </Link>
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
