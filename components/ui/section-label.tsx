import { cn } from "@/lib/utils";

/** Kleines Versal-Label über einer Überschrift (Stilmerkmal der Layout-Vorlage). */
export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[10px] uppercase tracking-[0.2em] text-[var(--color-primary)] sm:text-xs",
        className
      )}
    >
      {children}
    </p>
  );
}
