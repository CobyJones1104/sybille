---
name: website-shop
description: Online-Shop, Shopanbindung und interner Shop (Mitarbeiter-/B2B-Shop) für Next.js-Webseiten im deutschen Markt. Use when adding a shop, checkout, payments, Stripe, Shopify, product catalog, cart, or a login-protected internal shop to a website.
---

# Shop & Shopanbindung (Next.js, Deutschland)

## 1. Zuerst die richtige Architektur wählen
Frage kurz nach, falls unklar: Anzahl Produkte, Varianten, Lager, wer pflegt die Produkte?

| Situation | Lösung |
|---|---|
| Wenige Produkte (bis ca. 30), Gutscheine, Termine, Dienstleistungen | **Stripe Checkout** + Produkte in Stripe oder als JSON/CMS |
| Kunde hat bereits Shopify oder braucht Lager, Versand, viele Varianten | **Shopify Storefront API** (headless) oder Shopify Buy Button |
| Interner Shop (Mitarbeiter, Händler, B2B-Preise) | Next.js + Auth (z. B. Auth.js/Clerk) + Datenbank (Postgres/Prisma) + Stripe oder Rechnungskauf |
| Kunde nutzt WooCommerce | WooCommerce REST API headless anbinden |

Nie selbst Kartendaten verarbeiten. Zahlung immer über den gehosteten Checkout des Anbieters.

## 2. Stripe-Checkout-Muster
- Checkout-Session nur serverseitig erstellen (Route Handler oder Server Action), Preise nie vom Client übernehmen, sondern über `price_id` oder serverseitige Preisliste.
- Bestellung erst über den **Webhook** `checkout.session.completed` als bezahlt markieren, nicht über die Success-Page.
- Webhook-Signatur mit `stripe.webhooks.constructEvent` prüfen, Raw Body verwenden.
- Idempotenz: Event-ID speichern, doppelte Events ignorieren.
- Zahlarten für Deutschland aktivieren: Karte, PayPal, Klarna, SEPA, Apple/Google Pay.
- Geheimnisse nur in Umgebungsvariablen (`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`), niemals mit `NEXT_PUBLIC_`.

## 3. Pflichtangaben im deutschen Online-Handel (B2C)
- Bestellbutton eindeutig beschriften: **„zahlungspflichtig bestellen“** (oder gleichwertig).
- Vor dem Button: wesentliche Eigenschaften, Gesamtpreis, Versandkosten, Lieferzeit, Zahlungsarten.
- Preise als Endpreise. Bei Kleinunternehmern (§ 19 UStG) Hinweis „Gemäß § 19 UStG wird keine Umsatzsteuer berechnet“, sonst „inkl. MwSt.“.
- Grundpreis bei Waren nach Gewicht/Volumen (Preisangabenverordnung).
- Seiten verlinken und im Footer erreichbar: AGB, Widerrufsbelehrung inkl. Muster-Widerrufsformular, Versand & Zahlung, Impressum, Datenschutz.
- Bestellbestätigung per E-Mail mit Vertragsinhalt und Widerrufsbelehrung.
- Texte für AGB/Widerruf nicht selbst erfinden: auf Rechtstexte-Anbieter (z. B. IT-Recht Kanzlei, Händlerbund, e-recht24) verweisen. Das ist keine Rechtsberatung.
- Ab 28.06.2025 gilt für B2C-Shops das Barrierefreiheitsstärkungsgesetz (Ausnahme Kleinstunternehmen bei Dienstleistungen). Skill `frontend-a11y` anwenden.

## 4. Interner Shop
- Alle Shop-Routen per Middleware schützen, Rollen (Mitarbeiter, Händler, Admin) serverseitig prüfen.
- Kundenspezifische Preise nur serverseitig berechnen.
- Optional Rechnungskauf statt Zahlung: Bestellung speichern, E-Mail an Verwaltung, Status im Admin-Bereich.
- `noindex` für den gesamten internen Bereich.

## 5. UX & Performance
- Warenkorb clientseitig (z. B. Zustand mit Persistenz), Preise beim Checkout serverseitig neu berechnen.
- Produktbilder mit `next/image`, statische Produktseiten (ISR) für Pagespeed.
- Structured Data `Product` + `Offer` für SEO (siehe Skill `seo`).
- Nach Umsetzung: Skill `security-review` und `website-launch-qa` anwenden, Checkout mit Stripe-Testkarten per `e2e-testing` prüfen.
