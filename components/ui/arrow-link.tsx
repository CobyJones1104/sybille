import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark";

/**
 * Handlungsaufruf als Pille mit Kreis und Pfeil (Stilmerkmal der Layout-Vorlage):
 * beim Überfahren wächst der Abstand und der Kreis skaliert leicht.
 * `tone="light"` = helle Pille für dunkle Flächen, `tone="dark"` = umgekehrt.
 */
export function ArrowLink({
  href,
  children,
  tone = "dark",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const isLight = tone === "light";

  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-medium transition-all hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:text-base",
        isLight
          ? "bg-[var(--color-background-alt)] text-[var(--color-foreground)] focus-visible:ring-[var(--color-background-alt)] focus-visible:ring-offset-[var(--color-foreground)]"
          : "bg-[var(--color-primary)] text-[var(--color-on-primary)] focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-[var(--color-background)]",
        className
      )}
    >
      {children}
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-foreground)] transition-transform duration-200 group-hover:scale-110 sm:h-10 sm:w-10">
        <ArrowRight className="h-4 w-4 text-[var(--color-background-alt)]" aria-hidden="true" />
      </span>
    </Link>
  );
}
