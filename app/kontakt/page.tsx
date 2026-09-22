import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/kontakt/contact-form";
import { businessInfo, openingHours } from "@/lib/business-info";

export const metadata: Metadata = {
  title: "Kontakt – Sybille's Nähparadies Bad Kissingen",
  description: "Kontaktieren Sie Sybille's Nähparadies in Bad Kissingen telefonisch, per E-Mail oder über das Kontaktformular.",
};

export default function KontaktPage() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <Reveal className="mb-12 text-center">
        <h1 className="text-3xl font-semibold sm:text-4xl">Kontakt</h1>
        <p className="mt-3 text-[var(--color-muted-foreground)]">
          Wir freuen uns über Ihre Nachricht – oder besuchen Sie uns direkt im Laden.
        </p>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="space-y-6">
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Adresse
            </p>
            <p className="mt-1">
              {businessInfo.name}
              <br />
              {businessInfo.street}
              <br />
              {businessInfo.postalCode} {businessInfo.city}
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <Phone className="h-4 w-4" aria-hidden="true" />
              Telefon
            </p>
            <p className="mt-1">
              <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`} className="hover:text-[var(--color-primary)]">
                {businessInfo.phone}
              </a>{" "}
              <span className="text-xs text-[var(--color-muted-foreground)]">(noch zu bestätigen)</span>
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <Mail className="h-4 w-4" aria-hidden="true" />
              E-Mail
            </p>
            <p className="mt-1 text-sm italic text-[var(--color-muted-foreground)]">
              Folgt, sobald die Adresse feststeht (siehe offene Fragen in docs/konzept.md).
            </p>
          </div>

          <div>
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              <Clock className="h-4 w-4" aria-hidden="true" />
              Öffnungszeiten
            </p>
            <dl className="mt-1 space-y-1 text-sm">
              {openingHours.map((entry) => (
                <div key={entry.day} className="flex justify-between gap-4">
                  <dt>{entry.day}</dt>
                  <dd>{entry.hours}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
