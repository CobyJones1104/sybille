import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/layout/page-hero";
import { SectionLabel } from "@/components/ui/section-label";
import { ContactForm } from "@/components/kontakt/contact-form";
import { businessInfo, openingHours } from "@/lib/business-info";

export const metadata: Metadata = {
  title: "Kontakt – Sybille's Nähparadies Bad Kissingen",
  description: "Kontaktieren Sie Sybille's Nähparadies in Bad Kissingen telefonisch, per E-Mail oder über das Kontaktformular.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        label="Schreiben Sie uns"
        segments={[{ text: "Wir freuen uns über" }, { text: "Ihre Nachricht.", className: "font-accent" }]}
        lead="Fragen zu einem Stoff, zur Abholung oder ein Projekt, bei dem Sie nicht weiterkommen? Melden Sie sich gern."
      />

      <section className="mx-auto max-w-5xl px-6 py-16">

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <Reveal>
          <ContactForm />
        </Reveal>

        <Reveal delay={0.1} className="space-y-7">
          <div>
            <SectionLabel className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              Adresse
            </SectionLabel>
            <p className="mt-1">
              {businessInfo.name}
              <br />
              {businessInfo.street}
              <br />
              {businessInfo.postalCode} {businessInfo.city}
            </p>
          </div>

          <div>
            <SectionLabel className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              Telefon
            </SectionLabel>
            <p className="mt-1">
              <a href={`tel:${businessInfo.phone.replace(/\s/g, "")}`} className="hover:text-[var(--color-primary)]">
                {businessInfo.phone}
              </a>{" "}
              <span className="text-xs text-[var(--color-muted-foreground)]">(noch zu bestätigen)</span>
            </p>
          </div>

          <div>
            <SectionLabel className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" aria-hidden="true" />
              E-Mail
            </SectionLabel>
            <p className="mt-1 text-sm italic text-[var(--color-muted-foreground)]">
              Folgt, sobald die Adresse feststeht (siehe offene Fragen in docs/konzept.md).
            </p>
          </div>

          <div>
            <SectionLabel className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Öffnungszeiten
            </SectionLabel>
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
    </>
  );
}
