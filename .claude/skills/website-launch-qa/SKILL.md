---
name: website-launch-qa
description: Qualitäts-Check vor Go-live und nach größeren Änderungen - Pagespeed/Core Web Vitals, Responsivität auf Smartphone/Tablet/Desktop, Sicherheit (HTTPS/SSL, Security-Header), DSGVO, SEO und Barrierefreiheit. Use before launching a website, when the user asks about Pagespeed, Ladezeit, Lighthouse, responsive design, mobile Darstellung, SSL, Sicherheit or a final website check.
---

# Website Launch-QA

Am Ende immer einen kurzen Bericht mit Ampel (grün/gelb/rot) pro Bereich an den Nutzer ausgeben.

## 1. Pagespeed (Ziel: Lighthouse Mobil 95+)
Zielwerte: LCP < 2,5 s, INP < 200 ms, CLS < 0,1.
- Statisch rendern, wo möglich (SSG/ISR); Client Components nur wo Interaktion nötig ist.
- Bilder: `next/image`, AVIF/WebP, feste Größen gegen Layout-Shift, Hero-Bild mit `priority`, alles andere lazy.
- Schriften: `next/font`, maximal 2 Familien, `display: swap`.
- JavaScript klein halten: schwere Bibliotheken (3D, Slider) dynamisch laden, ungenutzte Pakete entfernen, Bundle prüfen.
- Animationen nur mit `transform`/`opacity`, keine Scroll-Listener ohne Throttling, `prefers-reduced-motion` beachten (Skills `motion-foundations`, `react-performance`).
- Drittskripte vermeiden oder mit `next/script` `lazyOnload`.
- Messung: `npx lighthouse <url> --preset=desktop` bzw. mobil ausführen, falls möglich; sonst den Nutzer bitten, pagespeed.web.dev zu nutzen und das Ergebnis zu schicken.

## 2. Responsivität
Testbreiten: 360, 390, 768, 1024, 1280, 1440, 1920 px, Hoch- und Querformat.
- Kein horizontales Scrollen, keine abgeschnittenen Texte, Umbrüche bei langen deutschen Wörtern (`hyphens: auto`, `lang="de"`).
- Touch-Ziele mind. 44 × 44 px, Navigation auf Mobil bedienbar, Formulare mit passenden `inputmode`/`autocomplete`.
- Fluid Typography mit `clamp()`, Layouts mit Grid/Flex, keine festen Pixelbreiten.
- Wenn möglich mit Playwright Screenshots in allen Breiten erstellen (Skills `e2e-testing`, `browser-qa`).

## 3. Sicherheit
- HTTPS erzwingen, SSL-Zertifikat über Hosting (Vercel, Netlify und Co. automatisch per Let's Encrypt), Weiterleitung http → https und www-Variante einheitlich.
- Security-Header in `next.config`: `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `frame-ancestors` über CSP.
- Keine Secrets im Client-Bundle, `.env` nicht committen, Abhängigkeiten mit `npm audit` prüfen.
- Formulare/APIs: Validierung, Rate Limit, keine detaillierten Fehlermeldungen nach außen (Skill `security-review`).
- Prüfung: securityheaders.com und ssllabs.com empfehlen.

## 4. DSGVO, SEO, Barrierefreiheit
- Skill `website-dsgvo`: Netzwerk-Tab ohne Dritt-Requests vor Consent, Impressum/Datenschutz verlinkt.
- Skill `seo`: Title/Description pro Seite, eine H1, `sitemap.xml`, `robots.txt`, Open-Graph-Bilder, `LocalBusiness`-Schema, saubere URLs, 404-Seite.
- Skill `frontend-a11y`: Kontraste, Alt-Texte, Tastaturbedienung, Fokus sichtbar.

## 5. Go-live-Checkliste
Domain + SSL aktiv, Weiterleitungen korrekt, Formulare live getestet (Mail kommt an), Favicon/OG-Bild, Google Search Console + Sitemap eingereicht, Google Business Profile verlinkt, Backup/Deploy-Rollback bekannt.
