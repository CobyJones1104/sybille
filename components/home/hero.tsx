"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { FabricLoop } from "@/components/motion/fabric-loop";
import { WordsPullUp } from "@/components/motion/words-pull-up";
import { useMounted } from "@/hooks/use-mounted";

const SYBILLE_PORTRAIT_SRC = "/images/team/sybille-portraet.webp";
const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Hero im Aufbau der Layout-Vorlage: vollflächiger, eingerückter Bildbereich mit
 * abgerundeten Ecken, Inhalt unten ausgerichtet, große Wort-für-Wort-Überschrift.
 * Hintergrund sind unsere eigenen wehenden Stoffbahnen plus Sybilles Foto
 * (kein fremdes Video), Entscheidung siehe docs/header-konzept/konzept.md.
 */
export function Hero() {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: animate ? 20 : 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="-mt-16 h-screen p-3 sm:p-4 md:-mt-[4.5rem] md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--color-foreground)] md:rounded-[2rem]">
        <FabricLoop className="absolute inset-0 h-full w-full" />

        {/* Sybilles Foto, warm getont und weich in den Hintergrund übergeblendet.
            Mobil vollflächig im oberen Bereich, ab Tablet als rechte Bildhälfte. */}
        <div className="absolute inset-x-0 top-0 h-[62%] md:inset-y-0 md:left-auto md:right-0 md:h-full md:w-[52%]">
          <div
            className="relative h-full w-full [mask-image:linear-gradient(to_top,transparent_4%,black_55%)] md:[mask-image:linear-gradient(to_left,black_42%,transparent_92%)]"
          >
            <Image
              src={SYBILLE_PORTRAIT_SRC}
              alt="Sybille, Inhaberin von Sybille's Nähparadies in Bad Kissingen"
              fill
              priority
              sizes="(min-width: 768px) 52vw, 100vw"
              className="object-cover object-[55%_28%]"
              style={{ filter: "sepia(0.45) saturate(0.8) contrast(1.05) brightness(0.9)" }}
            />
            <div aria-hidden="true" className="absolute inset-0 bg-[var(--color-primary)] opacity-25 mix-blend-color" />
          </div>
        </div>

        <div aria-hidden="true" className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-foreground)]/40 via-transparent to-[var(--color-foreground)]/80"
        />

        <div className="absolute bottom-0 left-0 right-0 px-5 pb-6 sm:px-7 sm:pb-8 md:px-10 md:pb-10">
          <div className="grid grid-cols-1 items-end gap-6 md:grid-cols-12 md:gap-8">
            {/* pb-[0.09em] verhindert, dass die Unterlänge des "p" bei leading-[0.85] abgeschnitten wird */}
            <h1 className="order-2 col-span-1 pb-[0.09em] text-[12.5vw] font-medium leading-[0.85] tracking-[-0.05em] text-[var(--color-background-alt)] md:order-1 md:col-span-8 md:text-[11.5vw]">
              <WordsPullUp text="Nähparadies" showAsterisk />
            </h1>

            <div className="order-1 col-span-1 md:order-2 md:col-span-4 md:pb-3">
              <motion.p
                {...fadeUp(0.5)}
                className="max-w-sm text-xs leading-[1.35] text-[var(--color-background-alt)]/75 sm:text-sm md:text-base"
              >
                Stoffe, Wolle, Kurzwaren und Nähzubehör – mitten in der Fußgängerzone von Bad
                Kissingen. Online bestellen oder bei einem Besuch im Laden in Ruhe aussuchen.
              </motion.p>

              <motion.div {...fadeUp(0.7)} className="mt-5">
                <Link
                  href="/shop"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-background-alt)] py-1.5 pl-5 pr-1.5 text-sm font-medium text-[var(--color-foreground)] transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background-alt)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-foreground)] sm:text-base"
                >
                  Zum Shop
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-foreground)] transition-transform duration-200 group-hover:scale-110 sm:h-10 sm:w-10">
                    <ArrowRight className="h-4 w-4 text-[var(--color-background-alt)]" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
