# Design System: Sybille's Nähparadies

Kuratiert aus `ui-ux-pro-max` (Style: Nature Distilled + Typografie-Vergleich Classic Elegant / Indie-Craft), abgestimmt auf: warm, handwerklich, hochwertig, persönlich – **nicht** verspielt/kitschig, **nicht** kalte Großstadt-Tech-Optik. Referenz: `docs/layout/analyse.md`.

## Stilrichtung
**Nature Distilled** (angepasst): muted earthy Töne, organische Materialien, handmade warmth, subtile Texturen – trifft die Stoff-/Wolle-Welt sehr genau, ohne kitschig zu wirken. Keine Emoji-Icons, SVG-Icons (Lucide/Heroicons).

## Farbpalette (Light Mode, Standard)

| Rolle | Hex | CSS-Variable | Verwendung |
|---|---|---|---|
| Primary (Marke/CTA) | `#A85C1A` (warmer Terrakotta-Ton) | `--color-primary` | Haupt-Buttons, Links, aktive Zustände |
| Primary Hover | `#8F4A14` | `--color-primary-hover` | Button-Hover (dunkler) |
| On Primary | `#FFFFFF` | `--color-on-primary` | Text auf Primary-Buttons |
| Secondary (Akzent) | `#6B7B3C` (Olivgrün, Garn/Wolle-Anklang) | `--color-secondary` | Sekundär-Badges, kleine Akzente (z. B. „Neu“, „Reste“) |
| Background | `#FBF7F0` (Soft Cream) | `--color-background` | Seiten-Hintergrund |
| Background Alt | `#F1E7D8` (Sand Beige, heller) | `--color-background-alt` | Wechselnde Sektionshintergründe |
| Foreground (Text) | `#362A22` (warmes Dunkelbraun statt Schwarz) | `--color-foreground` | Fließtext, Überschriften |
| Card | `#FFFFFF` | `--color-card` | Produktkarten, Content-Karten |
| Muted | `#EFE4D3` | `--color-muted` | dezente Flächen, Trennbereiche |
| Muted Foreground | `#6B5D4F` | `--color-muted-foreground` | Sekundärtext (z. B. Preise, Meta) |
| Border | `#E4D5BE` | `--color-border` | Karten-/Feldumrandung |
| Destructive | `#B3261E` | `--color-destructive` | Fehler, „ausverkauft“ |
| Ring/Focus | `#A85C1A` | `--color-ring` | sichtbarer Fokusring (Tastaturnavigation) |

Dark Mode ist für ein regionales Fachgeschäft kein Muss – wird vorerst nicht umgesetzt (Aufwand spart, Fokus auf Light-Mode-Qualität).

Kontrastprüfung (rechnerisch verifiziert): `#362A22` auf `#FBF7F0` = 13.0:1, `#FFFFFF` auf `#A85C1A` = 5.0:1, `#6B5D4F` auf `#FBF7F0` = 5.95:1 – alle über dem WCAG-AA-Grenzwert 4.5:1. Vor Launch trotzdem mit `website-launch-qa` final verifizieren (echte Bildschirm-Rendering-Prüfung).

## Typografie

- **Überschriften:** Playfair Display (elegant, warm, hohe Lesbarkeit auch bei großen Schriftgrößen, wirkt hochwertig ohne kalt zu sein)
- **Fließtext/UI:** Inter (sehr gut lesbar, neutral, harmoniert mit Playfair)
- Beide Schriften werden über `next/font/google` lokal eingebunden (kein Google-CDN, siehe CLAUDE.md-Hartregel).
- Skalierung: H1 40–56px / H2 28–32px / H3 22–24px / Body 16–18px / Meta-Text 14px, Zeilenhöhe Body 1,5.

```ts
// app/fonts.ts (Next.js next/font/google – lokal gebündelt, kein CDN-Request)
import { Playfair_Display, Inter } from "next/font/google";

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});
```

## Formsprache
- Radius: großzügig, aber nicht verspielt – Karten `radius-lg` (16px), Buttons `radius-full` (Pill-Form, siehe Bild 2), Bilder `radius-md` (12px).
- Schatten: weich, dezent (`0 8px 24px rgba(54,42,34,0.08)`), keine harten Drop-Shadows.
- Icons: nur SVG (Lucide), keine Emojis.

## Button-Stil (Wunsch: wie Bild 2)
- Pill-Form (`border-radius: 999px`), Primary-Button gefüllt in `--color-primary`, Text `--color-on-primary`.
- **Hover-Animation:** leichtes Anheben (`translateY(-2px)`), Hintergrund zu `--color-primary-hover`, Schatten vergrößert sich weich, Dauer 200–250ms, `ease-out`. Umsetzung mit `motion/react` (`whileHover`), siehe `motion-foundations`/`motion-patterns`.
- Sekundär-Button: outline (1.5px `--color-border`), Hover: Hintergrund `--color-muted`.
- Mindestgröße 44×44px (Touch-Ziel), sichtbarer Fokusring bei Tastaturnavigation.

## Bewegung/Motion (Leitplanken)
- Nur `transform`/`opacity` animieren (CLAUDE.md-Hartregel), `prefers-reduced-motion` wird respektiert (sofortiger Endzustand statt Animation).
- Scroll-Reveal: Elemente starten `opacity:0, y:16px (translateY)`, animieren beim Eintritt in den Viewport zu `opacity:1, y:0`, Dauer 300–450ms, gestaffelt ca. 60ms zwischen Geschwister-Elementen (Karten-Raster wirkt wie ein sanftes „Einwehen“ – passend zum Stoff-Thema).
- Header-Hintergrund (wehende Stoffbahnen): eigener, langsamer Loop (mehrere Sekunden), unabhängig vom Scroll, sanftes Auf-und-Ab/Wogen per `transform`.
- Timing-Tokens: `--motion-fast: 150ms`, `--motion-base: 250ms`, `--motion-slow: 400ms`, `--ease-out: cubic-bezier(0.16,1,0.3,1)`.

## Seitenmuster (aus `docs/layout/analyse.md` übernommen, nicht neu erfunden)
Startseite: Header (Foto + Stoff-Overlay) → Vorstellung Sybille → Vertrauensleiste (4 Punkte) → Kategorien → Bestseller/Neuheiten → Laden-Teaser mit Öffnungszeiten → Kundenstimmen → Newsletter → Footer.
Shop-/Kategorieseite: Header + Suchleiste → Kategorie-Navigation → Filter (später) → Produktkarten-Raster.
Produktseite: Bildergalerie → Titel/Preis/Einheit → Mengenwahl (inkl. Meterware-Schrittweite) → Beschreibung/Material/Pflege → verwandte Produkte.

## Anti-Patterns (vermeiden)
- Verspielte Handschrift-Schriften als Fließtext (z. B. Amatic SC) – wirkt bei „hochwertig“ zu kitschig, daher bewusst nicht gewählt.
- Reines Schwarz/Weiß ohne Wärme.
- Harte, kantige Schatten oder grelle Farbverläufe.
- Text unter 14px, Kontrast unter 4.5:1.

## Vor Auslieferung prüfen
- [ ] Kontrast 4.5:1 (Text/Hintergrund)
- [ ] Touch-Ziele ≥ 44×44px
- [ ] Fokuszustände sichtbar
- [ ] `prefers-reduced-motion` respektiert
- [ ] Responsive: 375px / 768px / 1024px / 1440px
- [ ] Keine Emoji-Icons
