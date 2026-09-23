"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { WordsPullUpMultiStyle } from "@/components/motion/words-pull-up";
import { SectionLabel } from "@/components/ui/section-label";
import { ArrowLink } from "@/components/ui/arrow-link";
import { useMounted } from "@/hooks/use-mounted";
import type { DisplayProduct } from "@/lib/product-display";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Schwebende Preiskarten über dem Stoffbild, Anordnung wie in der Layout-Vorlage. */
const cardPositions = [
  "left-[2%] top-[8%]",
  "right-[4%] top-[20%]",
  "left-[8%] bottom-[10%]",
  "right-[10%] bottom-[6%]",
];

export function ShopHero({ products }: { products: DisplayProduct[] }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;
  const highlights = products.slice(0, 4);

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: animate ? 20 : 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  });

  return (
    <section className="-mt-16 p-3 sm:p-4 md:-mt-[4.5rem] md:p-6">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-foreground)] px-6 pb-12 pt-28 text-[var(--color-background-alt)] md:rounded-[2rem] md:px-12 md:pb-16 md:pt-36">
        <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <motion.div {...fadeUp(0)}>
              <SectionLabel>Online bestellen</SectionLabel>
            </motion.div>

            <h1 className="mt-5 text-4xl leading-[0.92] sm:text-5xl md:text-6xl">
              <WordsPullUpMultiStyle
                className="justify-start text-left"
                segments={[{ text: "Alles für Ihr" }, { text: "nächstes Projekt.", className: "font-accent" }]}
              />
            </h1>

            <motion.p {...fadeUp(0.5)} className="mt-6 max-w-md text-sm text-[var(--color-background-alt)]/70 sm:text-base">
              Stoffe nach Maß zugeschnitten, Wolle, Kurzwaren und Nähzubehör – versandfertig
              oder kostenlos im Laden in Bad Kissingen abzuholen.
            </motion.p>

            <motion.div {...fadeUp(0.7)} className="mt-8 flex flex-wrap gap-3">
              <ArrowLink href="#sortiment" tone="light">
                Sortiment ansehen
              </ArrowLink>
            </motion.div>
          </div>

          <div className="relative aspect-[4/3] w-full">
            <motion.div
              initial={{ opacity: 0, scale: animate ? 0.96 : 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="absolute inset-[6%] overflow-hidden rounded-[1.5rem]"
            >
              <Image
                src="/images/shop/kategorie-stoffe.svg"
                alt="Baumwollstoff mit Blumenmuster"
                fill
                priority
                sizes="(min-width: 768px) 560px, 90vw"
                className="object-cover"
              />
            </motion.div>

            {highlights.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: animate ? 12 : 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.09, ease: EASE }}
                className={`absolute ${cardPositions[i]} flex w-36 items-center gap-2 rounded-xl bg-[var(--color-background)]/95 p-2 shadow-lg backdrop-blur sm:w-44`}
              >
                <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg sm:h-12 sm:w-12">
                  {product.imageUrl && (
                    <Image src={product.imageUrl} alt="" fill sizes="48px" className="object-cover" />
                  )}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[11px] font-medium text-[var(--color-foreground)]">
                    {product.name}
                  </span>
                  <span className="block text-xs font-bold text-[var(--color-primary)]">
                    {product.price.toFixed(2).replace(".", ",")} €
                    <span className="font-normal text-[var(--color-muted-foreground)]">
                      {product.unit === "Meter" ? " / m" : ""}
                    </span>
                  </span>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
