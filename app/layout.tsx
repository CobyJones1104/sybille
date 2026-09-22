import type { Metadata } from "next";
import { playfair, inter } from "@/app/fonts";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { businessInfo, openingHours } from "@/lib/business-info";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sybille's Nähparadies – Stoffe, Wolle & Kurzwaren in Bad Kissingen",
  description:
    "Fachgeschäft für Stoffe, Wolle, Kurzwaren und Nähzubehör in der Spargasse, Bad Kissingen. Online bestellen mit Versand oder kostenloser Abholung im Laden.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: businessInfo.name,
  description:
    "Fachgeschäft für Stoffe, Wolle, Kurzwaren und Nähzubehör in Bad Kissingen.",
  slogan: businessInfo.slogan,
  telephone: businessInfo.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: businessInfo.street,
    postalCode: businessInfo.postalCode,
    addressLocality: businessInfo.city,
    addressCountry: businessInfo.country,
  },
  openingHoursSpecification: openingHours
    .filter((entry) => entry.opens && entry.closes)
    .map((entry) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: entry.schemaDay,
      opens: entry.opens,
      closes: entry.closes,
    })),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
