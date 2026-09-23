# Header-Konzept (Design-Notiz für die spätere Umsetzung)

> Status: **Notiz für die Design-Phase.** Wird gemäß Absprache erst nach Freigabe des Konzepts (Schritte 1–5) umgesetzt – hier nur festgehalten, damit nichts verloren geht.

## Wunsch des Nutzers
Header im Stil von `docs/layout/01-stil-doppelbelichtung-portraet.jpg`: Sybille im Profil, dahinter wehen Stoffbahnen wie im Wind. Direkt darunter eine kurze Vorstellung von Sybille (Person, Leidenschaft fürs Nähen/Handwerk).

## Entschiedener Umsetzungsweg: Foto + CSS-Stoff-Overlay
Kein KI-generierter Doppelbelichtungs-Umbau des Gesichts (dafür fehlt ein geeignetes Bildgenerierungs-Tool in dieser Umgebung, und ein reales Gesicht sollte ohnehin nicht künstlich verändert werden). Stattdessen:

1. **Foto von Sybille** (`docs/header-konzept/sybille-foto-referenz.jpg`) sauber freistellen/zuschneiden (Profil- oder Dreiviertel-Ansicht, ruhiger Bildausschnitt), farblich in die Website-Palette einpassen (voraussichtlich warme Erd-/Naturtöne passend zu Stoffen/Wolle, siehe künftiges Designsystem aus `ui-ux-pro-max`).
2. **Wehende Stoffbahnen** als separate Grafikebene(n) hinter/um die Person – entweder als Foto-Ausschnitte echter Stoffe (sobald Produktfotos vorliegen) mit weichem Verlauf/Maskierung ins Hintergrundbild übergehend, oder als gestaltete Illustration/SVG-Formen in Stoff-Optik.
3. **CSS/Motion-Umsetzung:** die Stoffbahnen als eigene Layer mit `transform`-Animation (sanftes Wogen/Wehen per `motion/react`, Loop, `prefers-reduced-motion` respektiert – siehe Skill `motion-foundations`), das Personenfoto bleibt ruhig/scharf, nur der Hintergrund „lebt“.
4. Direkt unter dem Header: kurzer Vorstellungstext zu Sybille (Textentwurf siehe `docs/konzept.md`, Abschnitt „Startseite“).

## Weitere Design-Wünsche aus dieser Anfrage (für die Design-Phase vorgemerkt)
- **Buttons:** Stil wie `docs/layout/02-startseite-hero-naturprodukt.jpg` (Pill-Form) + Hover-Animation (Anheben, Farbwechsel/Aufhellung, weicherer Schatten). Umsetzung mit `motion-patterns`/`motion-foundations`.
- **Shop-Aufbau:** an `docs/layout/03-shop-startseite-ecommerce.jpg` orientieren (siehe `docs/layout/analyse.md` und Sitemap in `docs/konzept.md`).
- **Gesamte Seite animiert:** Scroll-Reveal beim Einscrollen, gestaffelter Aufbau von Karten/Abschnitten, Seitenübergänge – Umsetzung nach `motion-foundations` → `motion-patterns` → `animate`, danach Prüfung mit `review-animations`/`improve-animations`. Nur `transform`/`opacity` animieren, `prefers-reduced-motion` respektieren (siehe CLAUDE.md „Harte Regeln“).

## Offene Punkte
- Einverständnis von Sybille zur Veröffentlichung des Fotos auf der Webseite (Persönlichkeitsrecht) – siehe offene Frage in `docs/konzept.md`.
- Endgültiger Bildausschnitt/Qualität des Fotos für großformatigen Header-Einsatz prüfen, sobald es an die Umsetzung geht.
