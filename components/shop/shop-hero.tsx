"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { springs } from "@/lib/motion-tokens";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import type { DisplayProduct } from "@/lib/product-display";

/** Schwebende Preiskarten über dem Hero-Bild, Anordnung wie in der Layout-Vorlage. */
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

  return (
    <section className="relative overflow-hidden bg-[var(--color-foreground)] text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-[0.9fr_1.1fr] md:py-20">
        <motion.div
          initial={{ opacity: 0, y: animate ? 16 : 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.gentle}
        >
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Alles für Ihr
            <br />
            <span className="text-[var(--color-background-alt)]">nächstes Projekt.</span>
          </h1>
          <p className="mt-5 max-w-md text-[var(--color-background-alt)]">
            Stoffe nach Maß zugeschnitten, Wolle, Kurzwaren und Nähzubehör – versandfertig
            oder kostenlos im Laden in Bad Kissingen abzuholen.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="#sortiment">
              <Button variant="primary" className="w-full sm:w-auto">
                Sortiment ansehen <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>
            <Link href="/besuchen-sie-uns">
              <Button variant="secondary" className="w-full border-white/40 text-white sm:w-auto">
                Abholung im Laden
              </Button>
            </Link>
          </div>
        </motion.div>

        <div className="relative aspect-[4/3] w-full">
          <motion.div
            initial={{ opacity: 0, scale: animate ? 0.96 : 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={springs.gentle}
            className="absolute inset-[6%] overflow-hidden rounded-[2rem]"
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
              transition={{ ...springs.gentle, delay: 0.15 + i * 0.09 }}
              className={`absolute ${cardPositions[i]} flex w-36 items-center gap-2 rounded-xl bg-white/95 p-2 shadow-lg backdrop-blur sm:w-44`}
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
                <span className="block text-xs font-semibold text-[var(--color-primary)]">
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
    </section>
  );
}
