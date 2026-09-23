import { ShieldAlert } from "lucide-react";

/**
 * Hinweisbanner für alle Rechtstexte-Seiten: macht deutlich, dass hier nur die
 * Struktur/benötigten Angaben stehen, nicht der fertige Rechtstext.
 * Kein selbst formulierter Rechtstext – Grundsatz aus Skill website-dsgvo.
 */
export function LegalNotice() {
  return (
    <div className="mx-auto mb-12 flex max-w-2xl items-start gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background-alt)] p-4 text-sm text-[var(--color-muted-foreground)]">
      <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]" aria-hidden="true" />
      <p>
        Diese Seite zeigt nur die <strong>Struktur und benötigten Angaben</strong> – kein
        fertiger Rechtstext. Der verbindliche Text wird über einen Rechtstexte-Generator
        (z. B. e-recht24, IT-Recht Kanzlei oder Datenschutz-Generator) erstellt, sobald die
        offenen Angaben von Sybille vorliegen. Das ist technische Umsetzung, keine
        Rechtsberatung.
      </p>
    </div>
  );
}
