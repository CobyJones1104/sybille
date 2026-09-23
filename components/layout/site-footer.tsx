import Link from "next/link";
import { businessInfo, openingHours } from "@/lib/business-info";
import { SectionLabel } from "@/components/ui/section-label";

const shopLinks = [
  { href: "/shop", label: "Stoffe" },
  { href: "/shop", label: "Wolle & Garne" },
  { href: "/shop", label: "Kurzwaren" },
  { href: "/shop", label: "Angebote & Reste" },
];

const serviceLinks = [
  { href: "/kontakt", label: "Kontakt" },
  { href: "/besuchen-sie-uns", label: "Besuchen Sie uns" },
  { href: "/versand-und-zahlung", label: "Versand & Zahlung" },
];

const legalLinks = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
];

export function SiteFooter() {
  return (
    <footer className="px-3 pb-3 sm:px-4 sm:pb-4 md:px-6 md:pb-6">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-foreground)] text-[var(--color-background-alt)] md:rounded-[2rem]">
        <div aria-hidden="true" className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />

        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-14 sm:grid-cols-4 md:px-10 md:py-16">
          <div className="col-span-2 sm:col-span-1">
            <p className="text-lg font-bold tracking-tight">{businessInfo.name}</p>
            <p className="mt-3 text-sm text-[var(--color-background-alt)]/60">{businessInfo.slogan}</p>
            <p className="mt-5 text-sm text-[var(--color-background-alt)]/60">
              {businessInfo.street}
              <br />
              {businessInfo.postalCode} {businessInfo.city}
            </p>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />
          <FooterColumn title="Service" links={serviceLinks} />

          <div>
            <SectionLabel className="mb-4">Öffnungszeiten</SectionLabel>
            <ul className="space-y-1.5 text-sm text-[var(--color-background-alt)]/60">
              {openingHours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span>{entry.day}</span>
                  <span className="text-[var(--color-background-alt)]/85">{entry.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[var(--color-background-alt)]/50 sm:flex-row md:px-10">
            <p>
              &copy; {new Date().getFullYear()} {businessInfo.name}
            </p>
            <ul className="flex flex-wrap items-center justify-center gap-5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-[var(--color-background-alt)]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <SectionLabel className="mb-4">{title}</SectionLabel>
      <ul className="space-y-2.5 text-sm text-[var(--color-background-alt)]/60">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="transition-colors hover:text-[var(--color-background-alt)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
