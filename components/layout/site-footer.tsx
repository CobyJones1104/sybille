import Link from "next/link";
import { businessInfo, openingHours } from "@/lib/business-info";

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
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-background-alt)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 py-14 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-lg font-bold tracking-tight">
            {businessInfo.name}
          </p>
          <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">{businessInfo.slogan}</p>
          <p className="mt-4 text-sm text-[var(--color-muted-foreground)]">
            {businessInfo.street}
            <br />
            {businessInfo.postalCode} {businessInfo.city}
          </p>
        </div>

        <FooterColumn title="Shop" links={shopLinks} />
        <FooterColumn title="Service" links={serviceLinks} />

        <div>
          <p className="mb-3 text-sm font-semibold">Öffnungszeiten</p>
          <ul className="space-y-1 text-sm text-[var(--color-muted-foreground)]">
            {openingHours.map((entry) => (
              <li key={entry.day} className="flex justify-between gap-4">
                <span>{entry.day}</span>
                <span>{entry.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-border)]">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-[var(--color-muted-foreground)] sm:flex-row">
          <p>&copy; {new Date().getFullYear()} {businessInfo.name}</p>
          <ul className="flex flex-wrap items-center justify-center gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-[var(--color-primary)]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="mb-3 text-sm font-semibold">{title}</p>
      <ul className="space-y-2 text-sm text-[var(--color-muted-foreground)]">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-[var(--color-primary)]">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
