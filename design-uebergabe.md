# Sybille's Nähparadies – Design-Übergabe

Stand: 23. September 2026 · Branch `claude/great-franklin-pnoucf` · Repo `CobyJones1104/sybille`

---

## Wie du diese Datei benutzt

Lade sie in ein Claude-Gespräch hoch und schreib dazu, was du ändern willst. Die
Datei enthält alles, was für Design-Entscheidungen nötig ist: Farben, Schriften,
Layout-Muster, den Aufbau aller elf Seiten und die Regeln, die nicht gebrochen
werden dürfen.

**Wichtig für jedes Design, das daraus entsteht:** Die Seite ist bereits gebaut
(Next.js + Tailwind CSS v4 + `motion/react`). Neue Entwürfe sollten sich an den
unten stehenden Tokens bedienen, statt neue Farben oder Schriften einzuführen –
sonst muss die bestehende Seite umgebaut werden statt ergänzt.

---

## 1. Das Geschäft

| | |
|---|---|
| Name | Sybille's Nähparadies |
| Slogan | „Ob Stoffe, Wolle, Nadel oder Faden – alles in Sybille's Laden" |
| Adresse | Spargasse 5, 97688 Bad Kissingen (Fußgängerzone) |
| Telefon | 0160 97955075 *(noch zu bestätigen)* |
| E-Mail | *fehlt noch* |
| Sortiment | Stoffe, Wolle, Kurzwaren, Nähzubehör |
| Öffnungszeiten | Mo–Do 09:00–17:00 · Fr 09:00–16:00 · Sa + So geschlossen |
| Steuer | umsatzsteuerpflichtig – Preise inkl. MwSt., zzgl. Versand, Grundpreise bei Meterware |

**Ziele der Seite, in dieser Reihenfolge:**

1. Online-Shop mit Versand innerhalb Deutschlands **und** kostenloser Abholung im Laden (Click & Collect)
2. Lokal gefunden werden in Bad Kissingen – bei Google und in KI-Antworten
3. Mehr Laufkundschaft in den Laden bringen

**Zielgruppe:** Menschen, die nähen, stricken und häkeln – von der Anfängerin bis
zur Schneiderin. Regional aus Bad Kissingen und Umgebung, beim Online-Shop
deutschlandweit. Der Ton ist persönlich und fachlich, nie belehrend.

**Hauptaktion:** Im Shop bestellen oder in den Laden kommen. Beides ist
gleichwertig – die Seite spielt Online und Laden nicht gegeneinander aus.

---

## 2. Stilrichtung

**„Nature Distilled", angepasst.** Gedämpfte Erdtöne, organische Materialien,
handwerkliche Wärme, feine Texturen. Das trifft die Stoff- und Wolle-Welt, ohne
kitschig zu werden.

Die Seite soll wirken: **warm, handwerklich, hochwertig, persönlich.**

Sie soll *nicht* wirken: verspielt, kitschig, oder wie kalte Großstadt-Tech-Optik.

### Anti-Patterns – bitte vermeiden

- Verspielte Handschrift-Schriften als Fließtext (z. B. Amatic SC). Wirkt bei
  „hochwertig" zu kitschig.
- Reines Schwarz auf reinem Weiß, ohne Wärme.
- Harte, kantige Schatten oder grelle Farbverläufe.
- Emoji als Icons. Nur SVG-Icons (aktuell: Lucide).
- Text unter 14 px, Kontrast unter 4,5:1.
- Erfundene Kundenstimmen, erfundene Rabattaktionen, erfundene Countdown-Timer.
  Es gibt noch keine echten Bewertungen – also stehen dort auch keine.

---

## 3. Farben

Alle Werte liegen als CSS-Variablen in `app/globals.css` und sind über Tailwind
als `var(--color-…)` verfügbar.

| Rolle | Hex | Variable | Verwendung |
|---|---|---|---|
| Primary | `#A85C1A` | `--color-primary` | Haupt-Buttons, Links, aktive Zustände |
| Primary Hover | `#8F4A14` | `--color-primary-hover` | Button-Hover, dunkler |
| On Primary | `#FFFFFF` | `--color-on-primary` | Text auf Primary-Flächen |
| Secondary | `#6B7B3C` | `--color-secondary` | kleine Akzente, Badges („Neu", „Reste") |
| Background | `#FBF7F0` | `--color-background` | Seiten-Hintergrund |
| Background Alt | `#F1E7D8` | `--color-background-alt` | wechselnde Abschnitte, Text auf Dunkel |
| Foreground | `#362A22` | `--color-foreground` | Fließtext, Überschriften, dunkle Karten |
| Card | `#FFFFFF` | `--color-card` | Produktkarten, Inhaltskarten |
| Muted | `#EFE4D3` | `--color-muted` | dezente Flächen |
| Muted Foreground | `#6B5D4F` | `--color-muted-foreground` | Sekundärtext, Meta-Angaben |
| Border | `#E4D5BE` | `--color-border` | Umrandungen |
| Destructive | `#B3261E` | `--color-destructive` | Fehler, „ausverkauft" |
| Ring | `#A85C1A` | `--color-ring` | Fokusring bei Tastaturnavigation |

**Geprüfte Kontraste:** `#362A22` auf `#FBF7F0` = 13,0:1 · `#FFFFFF` auf
`#A85C1A` = 5,0:1 · `#6B5D4F` auf `#FBF7F0` = 5,95:1. Alle über dem
WCAG-AA-Grenzwert von 4,5:1.

> Der Primary-Ton war ursprünglich `#B5651D`. Weiß darauf ergab nur 4,34:1 und
> fiel damit durch die Kontrastprüfung. Deshalb jetzt `#A85C1A`. Wer die Farbe
> ändert, muss den Kontrast gegen Weiß neu prüfen.

**Dark Mode:** bewusst nicht umgesetzt. Für ein regionales Fachgeschäft kein
Muss; die Zeit steckt lieber in die Qualität des hellen Modus.

---

## 4. Typografie

Zwei Schriften, beide über `next/font/google` lokal gebündelt – **nie** über das
Google-CDN (Datenschutz, siehe Abschnitt 10).

- **Almarai** (300/400/700/800) – global, für Fließtext *und* Überschriften.
  Variable `--font-body`.
- **Instrument Serif**, nur kursiv (400) – ausschließlich als Akzent für
  hervorgehobene Wortgruppen in großen Überschriften. Utility-Klasse
  `.font-accent`. Variable `--font-accent`.

Deutsche Sonderzeichen (ä, ö, ü, ß, €) sind in beiden Schriften im Browser
geprüft und werden korrekt dargestellt.

**Skalierung**

| Ebene | Größe |
|---|---|
| Hero-Wortmarke | 11,5–12,5 vw, `leading-[0.85]`, `tracking-[-0.05em]` |
| H1 Unterseiten | clamp ca. 32–56 px |
| H2 | 28–60 px |
| Fließtext | 14–18 px, Zeilenhöhe 1,5 |
| Labels (Versalien) | 11–12 px, Laufweite ca. `0.14em` |

**Das Akzent-Muster:** Große Überschriften mischen beide Schriften innerhalb
einer Zeile. Beispiel von der Shop-Seite:

> **Alles für** *Ihr nächstes* **Projekt.**

Dabei steht der kursive Teil in Instrument Serif, der Rest in Almarai. Umgesetzt
über die Komponente `WordsPullUpMultiStyle` mit Segmenten, von denen eines
`className="font-accent"` trägt.

> Kleiner Fallstrick: Bei `leading-[0.85]` wird die Unterlänge des „p" beschnitten.
> Die Hero-Überschrift hat deshalb `pb-[0.09em]`.

---

## 5. Formsprache

- **Radien:** Karten 16 px (`rounded-2xl`), große Flächen bis 32 px
  (`rounded-[2rem]`), Buttons vollrund (Pill, `rounded-full`), Bilder 12 px.
- **Schatten:** weich und dezent, `0 8px 24px rgba(54, 42, 34, 0.08)`. Keine
  harten Drop-Shadows.
- **Icons:** nur SVG, aktuell Lucide. Strichstärke 1,5–2.
- **Textur:** feines Rauschen als Overlay über dunklen Flächen. Liegt als Inline-SVG
  in `app/globals.css` (`.noise-overlay`, `.bg-noise`) – kein externer Request.
- **Touch-Ziele:** mindestens 44 × 44 px.

---

## 6. Bewegung

Die ganze Seite ist animiert, aber zurückhaltend. Grundregel aus den
Projektregeln: **nur `transform` und `opacity` animieren**, und
`prefers-reduced-motion` wird respektiert (dann steht sofort der Endzustand da,
ohne Animation).

**Tokens** (`lib/motion-tokens.ts`):

```ts
duration: { instant: 0.08, fast: 0.18, normal: 0.35, slow: 0.6, crawl: 1.0 }  // Sekunden
easing:   { smooth: [0.22, 1, 0.36, 1], sharp: [0.4, 0, 0.2, 1], bounce: [0.34, 1.56, 0.64, 1] }
distance: { xs: 4, sm: 8, md: 16, lg: 24, xl: 48 }                            // Pixel
scale:    { subtle: 0.98, press: 0.95, pop: 1.04 }

springs:  { snappy:  { stiffness: 300, damping: 30 },
            gentle:  { stiffness: 120, damping: 14 },
            bouncy:  { stiffness: 400, damping: 10 },
            release: { stiffness: 200, damping: 20 } }
```

In CSS zusätzlich: `--motion-fast: 150ms`, `--motion-base: 250ms`,
`--motion-slow: 400ms`, `--ease-out: cubic-bezier(0.16, 1, 0.3, 1)`.

**Die vier Bewegungen, die die Seite prägen:**

1. **Scroll-Reveal** – Elemente starten bei `opacity: 0, y: 16px` und fahren beim
   Eintritt in den Viewport auf `opacity: 1, y: 0`. Feder `gentle`, gestaffelt
   ca. 60 ms zwischen Geschwistern. Wirkt wie sanftes Einwehen – passend zum
   Stoff-Thema. Komponente: `Reveal`.
2. **Wörter von unten** – Überschriften bauen sich Wort für Wort auf, Versatz
   24 px, Dauer 0,6 s, Staffelung 80 ms, Kurve `[0.16, 1, 0.3, 1]`.
   Komponenten: `WordsPullUp`, `WordsPullUpMultiStyle`.
3. **Zeichen-Aufklaren beim Scrollen** – ein Fließtext, dessen Buchstaben
   nacheinander von 20 % auf 100 % Deckkraft gehen, gesteuert vom Scrollfortschritt.
   Die Zeichen sind wortweise gruppiert, damit der Zeilenumbruch nicht mitten im
   Wort passiert. Komponente: `ScrollRevealText`.
4. **Wehende Stoffbahnen im Header** – ein langsamer, endloser SVG-Loop, unabhängig
   vom Scrollen, rein über `transform`. Komponente: `FabricLoop`.

**Hover:** Buttons heben sich 2 px an, der Pfeilkreis skaliert auf 1,1, der
Abstand zwischen Text und Kreis wächst. Dauer 200–250 ms.

> Technischer Hinweis für alle, die Code anfassen: Die Motion-Komponenten werden
> erst nach der Hydration eingehängt (`useMounted` über `useSyncExternalStore`).
> Ohne das gibt es Hydrations-Fehler, weil `useReducedMotion()` auf dem Server
> `null` liefert.

---

## 7. Layout-Muster

Der Aufbau folgt einer Vorlage, die wir intern „Prisma" nennen – auf das eigene
Design übertragen, nichts daraus kopiert.

**Navigation.** Eine dunkle Pille, die mittig von der Oberkante herabhängt
(`rounded-b-2xl`, Hintergrund `--color-foreground`). Sie liegt absolut über dem
Inhalt. `main` bekommt dafür `pt-16 md:pt-[4.5rem]`; vollflächige Heros heben das
mit `-mt-16` wieder auf. Rechts das Warenkorb-Symbol mit Zähler.

**Hero (Startseite).** Volle Bildschirmhöhe mit Innenabstand (`p-3 md:p-6`), darin
eine abgerundete Vollbild-Fläche. Inhalt unten ausgerichtet in einem
12-Spalten-Raster:

- links, 8 Spalten: die riesige Wortmarke „Nähparadies" mit hochgestelltem Sternchen
- rechts, 4 Spalten: zwei Sätze Kurztext plus Handlungsaufruf

Darüber Sybilles Foto, warm getont (Sepia + reduzierte Sättigung + Primary-Farbe
mit 25 % im Farbmodus überblendet), weich in den Hintergrund maskiert. Auf dem
Handy nimmt das Foto die oberen 62 % ein und blendet nach unten aus; ab Tablet
sitzt es als rechte Bildhälfte. Dazu die Rauschtextur und ein Verlauf nach unten,
damit Text und Button immer auf ruhigem Grund liegen.

**Seiten-Hero (Unterseiten).** Dieselbe Idee, aber als kompakte dunkle Karte:
kleines Label in Versalien, mehrstilige Überschrift, ein Satz Einleitung.
Komponente: `PageHero`.

**Dunkle Karte auf hellem Grund.** Das wiederkehrende Abschnittsmuster: eine
abgerundete Fläche in `--color-foreground` mit Rauschtextur, darin Label,
Überschrift mit kursivem Akzent und Inhalt. Wird für Empfehlungen, den
Laden-Teaser und den Footer benutzt.

**Handlungsaufruf.** Pille mit Text links und dunklem Kreis mit Pfeil rechts.
Beim Überfahren wächst der Abstand, der Kreis skaliert leicht.
Komponente: `ArrowLink`.

**Raster.** Inhalt zentriert bei `max-w-6xl` (Shop, Startseite) bzw. `max-w-2xl`
bis `max-w-3xl` (Rechtstexte, Warenkorb). Seitliches Polster immer `px-6`.

---

## 8. Die Seiten

Elf Seiten, alle gebaut und geprüft.

### Startseite `/`
Hero (Foto + Stoffbahnen) → Vorstellung von Sybille (dunkle Karte mit
Zeichen-Aufklaren) → Vertrauensleiste mit vier Punkten → Kategorien →
Laden-Teaser mit Öffnungszeiten → Footer.

### Shop `/shop`
Shop-Hero → Vertrauensleiste (Versand, Verpackung, Abholung) → Suchfeld →
sechs runde Abteilungsbilder zum Filtern → Produktraster → Empfehlungsreihe auf
dunklem Grund → „Neu im Sortiment" als runde Bilder mit Rangnummer.

Suche und Filter funktionieren. Die Artikel sind zehn erfundene Beispiele,
solange kein Shopify-Store verbunden ist.

### Über uns `/ueber-uns`
Seiten-Hero → „Meine Geschichte" (Platzhalter, braucht Sybilles Worte) →
was das Geschäft ausmacht → Verweis auf den Besuch.

### Besuchen Sie uns `/besuchen-sie-uns`
Seiten-Hero → Adresse und Anfahrt → Öffnungszeiten-Tabelle → Karte.

Die Karte lädt **erst nach Klick**. Vorher steht dort ein Hinweis, dass dabei
eine Verbindung zu OpenStreetMap aufgebaut wird. Das ist keine Design-Marotte,
sondern Pflicht: ohne Einwilligung keine Drittanbieter-Verbindung.

### Kontakt `/kontakt`
Seiten-Hero → Formular (Name, E-Mail, Betreff, Nachricht) links, Kontaktdaten und
Öffnungszeiten rechts.

Das Formular hat ein unsichtbares Honeypot-Feld gegen Spam und einen Hinweis auf
die Datenschutzerklärung. Der E-Mail-Versand ist noch nicht angeschlossen.

### Warenkorb `/warenkorb`
Positionen mit Mengensteuerung, Zwischensumme, Button zur Kasse.

Besonderheit Meterware: Shopify kann nur ganze Stückzahlen. Ein Artikel wird
deshalb in Schritten von 0,5 m verkauft, und der Warenkorb rechnet zurück – die
Kundin sieht „1,5 m / Zuschnitt nach Maß", nicht „3 Stück".

### Versand & Zahlung `/versand-und-zahlung`
Versandstufen, Zahlarten, Abholung.

Zahlarten: PayPal, Klarna, SEPA-Lastschrift, Vorkasse, Barzahlung bei Abholung.
**Keine Kreditkarten** – und damit auch kein Apple Pay oder Google Pay.

### Impressum, Datenschutz, AGB, Widerruf
Alle vier zeigen nur die **Struktur** mit den nötigen Abschnitten und
Platzhaltern in eckigen Klammern. Die verbindlichen Texte kommen von einem
Rechtstexte-Anbieter und werden unverändert übernommen. Oben auf jeder Seite
steht ein deutlicher Hinweis darauf.

Auf der Widerrufsseite steht zusätzlich ein Warnkasten zur offenen Rechtsfrage
bei Meterware (siehe Abschnitt 11).

---

## 9. Shop-Struktur

**Sechs Abteilungen**, jede mit einem runden Bild:

Stoffe · Wolle & Garne · Kurzwaren · Reißverschlüsse · Nähzubehör · Schnittmuster

**Produktkarte:** Bild (4:3) → Kategorie in Versalien und Primary-Farbe → Name →
zwei Zeilen Beschreibung → Preis mit Einheit („/ Meter", „/ Stück", „/ Set") →
Mengensteuerung → Button „In den Warenkorb".

**Meterware.** Stoffe werden nach Maß zugeschnitten. Die Mengensteuerung zählt
in Schritten von 0,5 m, Mindestmenge 0,5 m. Technisch liegt in Shopify ein
Metafeld `custom.step_meters` am Produkt, und der Preis gilt pro Schritt – bei
9,90 €/m also 4,95 € pro halbem Meter. Wer das ändert, muss beide Seiten
anfassen: Preis **und** Metafeld.

---

## 10. Harte Regeln

Diese stehen in der `CLAUDE.md` des Projekts und gelten für jede Änderung:

1. **Schriften immer lokal einbinden** (`next/font`), nie über das Google-CDN.
2. **Keine Drittanbieter-Requests vor Einwilligung** – Schriften, Karten, Videos,
   Tracking. Deshalb lädt die Karte erst nach Klick.
3. **Keine Geheimnisse im Browser**, `.env` wird nie committet. Der
   Shopify-Zugriff läuft ausschließlich serverseitig.
4. **Nur `transform`/`opacity` animieren**, `prefers-reduced-motion` respektieren.
5. **Lighthouse mobil: 95+.**
6. **Sprache der Seite: Deutsch** (`lang="de"`).
7. **Niemals Bilder aus anderen Shops oder Webseiten verwenden.**
8. Bestehender Stack bleibt: Next.js App Router, kein Umbau auf etwas anderes.

---

## 11. Offene Punkte

**Braucht Sybille:**

- Vollständiger Name der Inhaberin (fürs Impressum)
- E-Mail-Adresse
- Rechtsform und ggf. USt-IdNr.
- Ein paar Sätze zur Geschichte des Ladens (für „Über uns")
- Bestätigung der Telefonnummer
- Parkmöglichkeiten in der Nähe (für „Besuchen Sie uns")
- Echte Fotos: Laden von außen und innen, Regale, Produkte

**Braucht eine Entscheidung:**

- **Shopify-Store anlegen.** Kostenpflichtig, braucht Bankdaten. Die komplette
  Anleitung liegt in `docs/shopify-setup.md`, die Produktimport-Datei in
  `docs/shopify-produktimport.csv`.
- **Widerrufsrecht bei Meterware.** Ob zugeschnittene Meterware als
  kundenspezifische Anfertigung gilt und damit vom Widerrufsrecht ausgenommen
  werden darf, ist eine offene Rechtsfrage. Die Entscheidungsvorlage für die
  Rechtsberatung liegt in `docs/widerruf-meterware.md`. Beide Varianten sind im
  Code vorbereitet; umgestellt wird mit einer Zeile in `lib/widerruf.ts`.
  Aktuell steht die vorsichtigere Variante: das Widerrufsrecht gilt.
- **Rechtstexte** von einem Anbieter beziehen (Impressum, Datenschutz, AGB,
  Widerruf).
- **Versandpreise** final festlegen – die aktuellen sind ein Vorschlag.

**Noch zu bauen:**

- E-Mail-Versand für das Kontaktformular (`app/api/kontakt/route.ts` schreibt
  bisher nur ins Log)
- Produktdetailseiten (aktuell führt der Shop direkt in den Warenkorb)
- Echte Fotos statt der selbst erstellten SVG-Grafiken

---

## 12. Technischer Stand

**Stack:** Next.js 16.3.5 (App Router, Turbopack) · React 19.2.8 · TypeScript ·
Tailwind CSS v4 (Tokens in `app/globals.css` über `@theme inline`, keine
`tailwind.config.js`) · `motion/react` · Lucide Icons.

**Wichtige Dateien:**

| Datei | Inhalt |
|---|---|
| `app/globals.css` | Farb- und Motion-Tokens |
| `app/fonts.ts` | die beiden Schriften |
| `lib/motion-tokens.ts` | Dauern, Kurven, Federn |
| `lib/business-info.ts` | Adresse, Telefon, Öffnungszeiten – eine Quelle für alles |
| `lib/shop-categories.ts` | die sechs Abteilungen |
| `lib/widerruf.ts` | Schalter für die Widerrufs-Variante |
| `design-system/sybilles-naehparadies/MASTER.md` | das Designsystem im Original |
| `docs/konzept.md` | Sitemap, Textentwürfe, offene Fragen |

**Eigene Grafiken:** 19 SVGs für Kategorien und Produkte, erzeugt von
`scripts/generate-shop-images.js`. Sie sind Platzhalter, bis es echte Fotos gibt –
aber bewusst gestaltete Platzhalter, keine grauen Kästen.

**Geprüft:** alle elf Seiten in 1440 px und 390 px, Navigation, Shop-Filter,
Warenkorb. Keine unsichtbaren Inhalte, keine Konsolenfehler, Kontraste über
WCAG AA. Der Warenkorb wurde gegen einen selbstgebauten Shopify-Simulator
komplett durchgespielt.

---

## Vor jeder Auslieferung prüfen

- [ ] Kontrast 4,5:1 bei Text auf Hintergrund
- [ ] Touch-Ziele mindestens 44 × 44 px
- [ ] Fokuszustände sichtbar
- [ ] `prefers-reduced-motion` respektiert
- [ ] Responsiv bei 375 / 768 / 1024 / 1440 px
- [ ] Keine Emoji als Icons
- [ ] Keine Drittanbieter-Verbindung ohne Einwilligung
