"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { springs } from "@/lib/motion-tokens";
import { Button } from "@/components/ui/button";
import { FabricLoop } from "@/components/motion/fabric-loop";
import { useMounted } from "@/hooks/use-mounted";

const SYBILLE_PORTRAIT_SRC = "/images/team/sybille-portraet.webp";

/**
 * Header/Hero im Stil der Referenz docs/layout/01-stil-doppelbelichtung-portraet.jpg:
 * Sybilles Foto + wehende Stoffbahnen statt einer KI-Doppelbelichtung des Gesichts
 * (Entscheidung siehe docs/header-konzept/konzept.md).
 */
export function Hero() {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: mounted && !reduce ? 16 : 0 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.gentle, delay },
  });

  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-foreground)]">
      <FabricLoop className="pointer-events-none absolute inset-0 h-full w-full" />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-20 sm:py-28 md:grid-cols-2 md:gap-16 md:py-32">
        <motion.div {...enter(0)} className="order-2 text-center md:order-1 md:text-left">
          <p className="mb-3 text-sm font-medium tracking-wide text-[var(--color-background-alt)] uppercase">
            Fachgeschäft in Bad Kissingen
          </p>
          <h1 className="text-4xl font-semibold text-white sm:text-5xl">
            Ob Stoffe, Wolle, Nadel oder Faden – alles in Sybille&apos;s Laden
          </h1>
          <p className="mt-5 max-w-md text-base text-[var(--color-background-alt)] sm:text-lg mx-auto md:mx-0">
            Ihr Fachgeschäft für Stoffe, Wolle, Kurzwaren und Nähzubehör mitten in der
            Fußgängerzone von Bad Kissingen – online bestellen oder im Laden abholen.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <Button variant="primary">Jetzt im Shop stöbern</Button>
            <Button variant="secondary" className="border-white/40 text-white">
              Laden besuchen
            </Button>
          </div>
        </motion.div>

        <motion.div
          {...enter(0.15)}
          className="relative order-1 mx-auto aspect-square w-full max-w-sm md:order-2"
        >
          {/*
            Weiche Maske nach allen Seiten + warme Farbtonung, damit das Foto in
            den Header übergeht statt als Rechteck aufzuliegen (docs/header-konzept/konzept.md).
          */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[2rem]"
            style={{
              maskImage:
                "radial-gradient(ellipse 75% 75% at 55% 45%, black 45%, transparent 85%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 75% 75% at 55% 45%, black 45%, transparent 85%)",
            }}
          >
            <Image
              src={SYBILLE_PORTRAIT_SRC}
              alt="Sybille, Inhaberin von Sybille's Nähparadies, in ihrem Fachgeschäft in Bad Kissingen"
              fill
              priority
              sizes="(min-width: 768px) 384px, 320px"
              className="object-cover"
              style={{ filter: "sepia(0.45) saturate(0.8) contrast(1.05) brightness(0.95)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[var(--color-primary)] opacity-25 mix-blend-color"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
