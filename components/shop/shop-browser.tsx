"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { ProductCard } from "@/components/shop/product-card";
import { Reveal } from "@/components/motion/reveal";
import { shopCategories } from "@/lib/shop-categories";
import type { DisplayProduct } from "@/lib/product-display";

export function ShopBrowser({ products }: { products: DisplayProduct[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = activeCategory ? product.category.includes(activeCategory) : true;
      const matchesQuery = q
        ? `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(q)
        : true;
      return matchesCategory && matchesQuery;
    });
  }, [products, query, activeCategory]);

  return (
    <>
      <section id="sortiment" className="mx-auto max-w-6xl px-6 pt-16 sm:pt-20">
        <Reveal className="mb-10 text-center">
          <h2 className="text-2xl font-semibold sm:text-3xl">Nach Abteilung stöbern</h2>
          <p className="mt-2 text-[var(--color-muted-foreground)]">
            Wählen Sie eine Abteilung oder suchen Sie direkt nach einem Artikel.
          </p>
        </Reveal>

        <Reveal className="mx-auto mb-12 flex max-w-xl items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] px-5 py-2 focus-within:ring-2 focus-within:ring-[var(--color-ring)]">
          <Search className="h-4 w-4 shrink-0 text-[var(--color-muted-foreground)]" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Stoff, Wolle, Knopf …"
            aria-label="Sortiment durchsuchen"
            className="min-h-9 w-full bg-transparent text-base text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Suche zurücksetzen"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </Reveal>

        <div className="mb-14 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {shopCategories.map((category, i) => {
            const isActive = activeCategory === category.match;
            return (
              <Reveal key={category.name} delay={i * 0.05}>
                <button
                  type="button"
                  onClick={() => setActiveCategory(isActive ? null : category.match)}
                  aria-pressed={isActive}
                  className="group flex w-full cursor-pointer flex-col items-center gap-2 focus-visible:outline-none"
                >
                  <span
                    className={`relative block h-20 w-20 overflow-hidden rounded-full ring-2 transition-all duration-200 group-hover:-translate-y-0.5 sm:h-24 sm:w-24 ${
                      isActive
                        ? "ring-[var(--color-primary)]"
                        : "ring-[var(--color-border)] group-hover:ring-[var(--color-primary)]/50"
                    }`}
                  >
                    <Image
                      src={category.image}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </span>
                  <span
                    className={`text-center text-xs font-medium sm:text-sm ${
                      isActive ? "text-[var(--color-primary)]" : "text-[var(--color-foreground)]"
                    }`}
                  >
                    {category.name}
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-semibold">
            {activeCategory ? shopCategories.find((c) => c.match === activeCategory)?.name : "Ganzes Sortiment"}
          </h2>
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {filtered.length} {filtered.length === 1 ? "Artikel" : "Artikel"}
          </p>
        </div>

        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[var(--color-border)] px-6 py-16 text-center text-[var(--color-muted-foreground)]">
            Dazu haben wir online nichts gefunden – fragen Sie gerne im Laden oder per
            Nachricht nach, oft ist es trotzdem vorrätig.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} delay={(i % 3) * 0.06} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
