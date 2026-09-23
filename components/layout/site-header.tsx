"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { springs } from "@/lib/motion-tokens";
import { useCart } from "@/components/cart/cart-context";

const navLinks = [
  { href: "/shop", label: "Shop" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/besuchen-sie-uns", label: "Besuchen Sie uns" },
  { href: "/kontakt", label: "Kontakt" },
];

const linkColor = "rgba(241, 231, 216, 0.82)";

/**
 * Navigation als dunkle Pille, die mittig von der Oberkante herabhängt
 * (Aufbau nach der Layout-Vorlage, Farben aus unserem Designsystem).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;

  return (
    <header className="pointer-events-none absolute left-0 right-0 top-0 z-50 flex justify-center">
      <div className="pointer-events-auto w-full max-w-5xl rounded-b-2xl bg-[var(--color-foreground)] px-4 py-2.5 md:rounded-b-3xl md:px-8 md:py-3">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="shrink-0 text-sm font-bold tracking-tight text-[var(--color-background-alt)] sm:text-base"
          >
            Sybille&apos;s Nähparadies
          </Link>

          <nav className="hidden items-center gap-6 md:flex lg:gap-10" aria-label="Hauptnavigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ color: linkColor }}
                className="text-xs transition-colors hover:!text-[var(--color-background-alt)] md:text-sm"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1">
            <Link
              href="/warenkorb"
              aria-label={`Warenkorb${itemCount > 0 ? `, ${itemCount} Artikel` : ""}`}
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-background-alt)] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background-alt)]"
            >
              <ShoppingBag className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              {itemCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--color-primary)] px-1 text-[10px] font-semibold text-[var(--color-on-primary)]">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-background-alt)] transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-background-alt)] md:hidden"
            >
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.nav
              aria-label="Mobile Navigation"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={springs.snappy}
              className="md:hidden"
            >
              <ul className="flex flex-col gap-3 border-t border-white/10 pb-1 pt-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      style={{ color: linkColor }}
                      className="block text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
