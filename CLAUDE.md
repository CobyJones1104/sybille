# Projektregeln – Professionelle Webseiten (Deutschland)

## Stack
- **Bestehendes Projekt:** den vorhandenen Stack beibehalten (z. B. Astro + Netlify) und die Skills sinngemäß darauf anwenden. Nicht auf Next.js umbauen, außer ich verlange es ausdrücklich.
- **Neues Projekt (Standard):** Next.js (App Router) + React + TypeScript, Tailwind CSS, Motion (`motion/react`), Deployment auf Vercel, Netlify oder EU-Hosting.
- Schriften lokal einbinden: in Next.js über `next/font`, in Astro über lokale Font-Dateien bzw. Fontsource.
Sprache der Webseite: Deutsch (`lang="de"`). Kommunikation mit mir: Deutsch.

## Welcher Skill wofür
| Aufgabe | Skills |
|---|---|
| Aufbau & Code | react-patterns, frontend-patterns, nextjs-turbopack, coding-standards, error-handling |
| Backend, Datenbank, APIs | backend-patterns, api-design, postgres-patterns, prisma-patterns |
| Stil, Farben, Schriften, Seitenaufbau finden | ui-ux-pro-max (zu Projektbeginn Designsystem generieren) |
| Design & Feinschliff | impeccable, emil-design-eng, apple-design, design-system |
| UI-Bibliothek wählen, Varianten vergleichen, Toasts | pick-ui-library, prototype, ask-sonner (nur auf ausdrücklichen Aufruf) |
| Animationen | motion-foundations (immer zuerst), motion-patterns, motion-advanced, animate, find-animation-opportunities, review-animations, improve-animations, animation-vocabulary |
| Shop / interner Shop / Zahlung | website-shop |
| E-Mail-Versand | mailtrap-email-integration |
| Leadgenerierung & Formulare | website-leads |
| Google-Bewertungen | google-bewertungen |
| Pagespeed | react-performance, benchmark, website-launch-qa |
| Responsivität & Tests | website-launch-qa, e2e-testing, browser-qa |
| Sicherheit & SSL | security-review, deployment-patterns, website-launch-qa |
| DSGVO & Rechtliches | website-dsgvo |
| SEO & KI-Sichtbarkeit | seo, seo-ai-visibility |
| Barrierefreiheit | frontend-a11y |
| Vor Go-live | website-launch-qa, production-audit |

## Arbeitsweise
1. Ziel, Zielgruppe und Hauptaktion (Anruf, Anfrage, Kauf) der Seite klären, dann mit `ui-ux-pro-max` ein Designsystem (Stil, Farben, Schriften, Seitenmuster) erzeugen.
2. Struktur und Inhalte bauen, mobil zuerst.
3. Funktionen ergänzen (Formulare, Shop, Bewertungen) – immer DSGVO-konform nach `website-dsgvo`.
4. Animationen ergänzen, Performance im Blick behalten.
5. Vor jedem Go-live `website-launch-qa` vollständig durchlaufen und Ampel-Bericht ausgeben.

## Harte Regeln
- Google Fonts immer lokal einbinden (Next.js: `next/font`, Astro: lokale Dateien/Fontsource), nie über das Google-CDN (gilt auch für Vorschläge aus ui-ux-pro-max).
- Keine Drittanbieter-Requests (Fonts, Maps, Videos, Tracking) vor Einwilligung.
- Keine Secrets im Client, `.env` nie committen.
- Nur `transform`/`opacity` animieren, `prefers-reduced-motion` respektieren.
- Lighthouse Mobil-Ziel: 95+.
- Kurze, klare Commits auf Deutsch.
