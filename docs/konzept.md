# Konzept: Sybille's Nähparadies – Webseite & Online-Shop

Status: **Konzept-Phase.** Kein Design, kein Seiten-Code – dient als gemeinsame Grundlage vor der Freigabe.

---

## a) Sitemap & Shop-Kategoriebaum

### Hauptseiten
```
Startseite (/)
├── Shop (/shop)
├── Über uns / Der Laden (/ueber-uns)
├── Besuchen Sie uns (/besuchen-sie-uns)
├── Kontakt (/kontakt)
└── Footer-Pflichtseiten
    ├── Impressum (/impressum)
    ├── Datenschutz (/datenschutz)
    ├── AGB (/agb)
    ├── Widerruf (/widerruf) – inkl. Muster-Widerrufsformular
    └── Versand & Zahlung (/versand-und-zahlung)
```

### Shop-Kategoriebaum
```
Shop (/shop)
├── Stoffe (/shop/stoffe)
│   ├── Baumwollstoffe
│   ├── Jersey & Sweat
│   ├── Wolle & Walkstoffe (Meterware, nicht zu verwechseln mit Kategorie „Wolle & Garne“)
│   ├── Dekostoffe & Vorhangstoffe
│   ├── Filz
│   └── Reste & Sonderposten (Verweis auf „Angebote/Reste“)
├── Wolle & Garne (/shop/wolle-garne)
│   ├── Handstrickgarne
│   ├── Sockenwolle
│   ├── Babywolle
│   └── Häkelgarne
├── Kurzwaren (/shop/kurzwaren)
│   ├── Knöpfe
│   ├── Bänder & Borten
│   ├── Gummibänder & Kordeln
│   └── Nähnadeln & Stecknadeln
├── Reißverschlüsse (/shop/reissverschluesse)
│   ├── Meterware
│   └── Fertig-Reißverschlüsse (nach Länge)
├── Nähzubehör (/shop/naehzubehoer)
│   ├── Scheren
│   ├── Maßbänder & Markierwerkzeug
│   ├── Bügel-/Vlieseline
│   └── Nähmaschinenzubehör
├── Schnittmuster (/shop/schnittmuster)
├── Angebote & Reste (/shop/angebote-reste)
└── Neuheiten (/shop/neuheiten)
```

Jede Kategorie- und Produktseite folgt dem in `docs/layout/analyse.md` beschriebenen Aufbau (Kategorie-Icons → Produktkarten-Raster → Filter nach Farbe/Material/Preis, sobald Datenmenge das rechtfertigt).

---

## b) Seitenaufbau & Textentwürfe

Ton: warm, persönlich, regional verwurzelt – wie ein Gespräch über die Ladentheke. Kurze Sätze, keine Marketing-Floskeln. Lokale Keywords natürlich eingebaut (Bad Kissingen, Fußgängerzone, Spargasse, Fachgeschäft), gemäß Skill `seo`: ein klares Thema pro Abschnitt, kein Keyword-Stuffing.

### Startseite
Aufbau angelehnt an `docs/layout/analyse.md` (Bild 2 + 3): Header (siehe `docs/header-konzept/konzept.md`) → Kurzvorstellung Sybille → Vertrauensleiste → Kategorien → Bestseller/Neuheiten → Laden-Teaser mit Öffnungszeiten → Kundenstimmen (sobald vorhanden) → Newsletter/Footer.

**H1 (Headline):**
> Ob Stoffe, Wolle, Nadel oder Faden – alles in Sybille's Laden

**Sub-Headline:**
> Ihr Fachgeschäft für Stoffe, Wolle, Kurzwaren und Nähzubehör mitten in der Fußgängerzone von Bad Kissingen.

**Kurzvorstellung Sybille (Text unter dem Header):**
> Bei mir finden Sie nicht einfach Stoffe von der Rolle, sondern jemanden, der mit Ihnen zusammen den richtigen Stoff, das passende Garn oder den letzten Handgriff für Ihr Projekt sucht. Seit [Jahr/Zeitraum – bitte ergänzen] führe ich mein Nähparadies in der Spargasse in Bad Kissingen, mit einer Leidenschaft fürs Nähen, die ich gerne weitergebe – ob Sie Anfängerin sind oder schon lange an der Nähmaschine sitzen.
> *(Platzhalter – wird mit echten Details zu Sybille, Zeitraum und Geschichte des Ladens ergänzt.)*

**Vertrauensleiste (4 Punkte, passend zu Bild 3, aber shop-spezifisch):**
1. Versand in ganz Deutschland
2. Kostenlose Abholung im Laden (Click & Collect)
3. Persönliche Beratung – auch online
4. Fachgeschäft mit [X] Jahren Erfahrung *(Platzhalter)*

**Laden-Teaser-Abschnitt (mit Öffnungszeiten, siehe c):**
> Schauen Sie vorbei – mitten in der Fußgängerzone von Bad Kissingen, nur wenige Schritte vom Kurgarten entfernt.

### Über uns / Der Laden
- H1: „Der Laden – Sybille's Nähparadies“
- Abschnitt 1: Geschichte des Ladens (Gründung, Entwicklung) – *Platzhalter, Angaben fehlen noch*
- Abschnitt 2: Sybille persönlich – Leidenschaft, Beratungsphilosophie, evtl. Ausbildung/Erfahrung
- Abschnitt 3: Was den Laden besonders macht (große Auswahl an Meterware, persönliche Beratung, regionale Verwurzelung in Bad Kissingen)
- Abschnitt 4: Bild-Galerie vom Laden (sobald Fotos vorliegen)

### Besuchen Sie uns
- H1: „Besuchen Sie uns in der Bad Kissinger Fußgängerzone“
- Adresse groß und gut lesbar: Spargasse 5, 97688 Bad Kissingen
- Eingebettete Karte (erst nach Cookie-Consent lädt, siehe `website-dsgvo` → Zwei-Klick-Lösung) bzw. statisches Kartenbild mit Link zu Google Maps
- Öffnungszeiten-Tabelle (siehe c)
- Wegbeschreibung/Parkhinweis – *Platzhalter, Angaben zu nahegelegenen Parkmöglichkeiten fehlen noch*
- Hinweis auf Click & Collect: „Online bestellen, im Laden abholen – kostenlos und meist am selben Tag.“ *(Zeitangabe als Platzhalter, bis Abholzeiten bestätigt sind)*

### Kontakt
- H1: „Kontakt“
- Adresse, Telefon (0160 97955075 – *noch zu bestätigen*), E-Mail (*Platzhalter, fehlt noch*)
- Kontaktformular (datensparsam: Name, E-Mail, Nachricht, Betreff-Auswahl z. B. „Frage zum Produkt“/„Abholung“/„Allgemein“), DSGVO-Hinweistext darunter, keine vorangekreuzte Checkbox (nach Skill `website-dsgvo`)
- Öffnungszeiten erneut sichtbar

---

## c) Öffnungszeiten – Platzierung

Öffnungszeiten erscheinen konsistent an vier Stellen, aus derselben zentralen Datenquelle gepflegt (später ein einziger Konfigurationswert im Code, nicht mehrfach getippt):

1. **Startseite** – im Laden-Teaser-Abschnitt
2. **Kontakt-Seite** – neben den Kontaktdaten
3. **Besuchen-Sie-uns-Seite** – als vollständige Tabelle
4. **Footer** – auf jeder Seite kompakt sichtbar

**Öffnungszeiten-Tabelle:**

| Tag | Uhrzeit |
|---|---|
| Montag | 09:00–17:00 Uhr |
| Dienstag | 09:00–17:00 Uhr |
| Mittwoch | 09:00–17:00 Uhr |
| Donnerstag | 09:00–17:00 Uhr |
| Freitag | 09:00–16:00 Uhr |
| Samstag | geschlossen |
| Sonntag | geschlossen |

**LocalBusiness-Schema (JSON-LD, Platzhalter für später einzubindende Werte):**

```json
{
  "@context": "https://schema.org",
  "@type": "Store",
  "name": "Sybille's Nähparadies",
  "description": "Fachgeschäft für Stoffe, Wolle, Kurzwaren und Nähzubehör in Bad Kissingen.",
  "slogan": "Ob Stoffe, Wolle, Nadel oder Faden – alles in Sybille's Laden",
  "image": "https://[DOMAIN]/images/laden/ladenfront.webp",
  "telephone": "+49 160 97955075",
  "email": "[E-MAIL – Platzhalter]",
  "priceRange": "€€",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Spargasse 5",
    "postalCode": "97688",
    "addressLocality": "Bad Kissingen",
    "addressCountry": "DE"
  },
  "openingHoursSpecification": [
    { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday"], "opens": "09:00", "closes": "17:00" },
    { "@type": "OpeningHoursSpecification", "dayOfWeek": "Friday", "opens": "09:00", "closes": "16:00" }
  ],
  "url": "https://[DOMAIN]"
}
```

Hinweis: `geo`-Koordinaten und finale Domain werden erst in der Umsetzungsphase ergänzt.

---

## d) Bildplan

| Bereich | Bildbedarf | Quelle |
|---|---|---|
| Header Startseite | Foto Sybille + Stoff-Overlay | `docs/header-konzept/` (siehe dortiges Konzept) |
| Vertrauensleiste | 4 kleine Icons (kein Foto nötig) | Icon-Set aus `ui-ux-pro-max` in der Design-Phase |
| Kategorie-Kacheln Startseite/Shop | je 1 Bild pro Hauptkategorie (Stoffe, Wolle & Garne, Kurzwaren, Reißverschlüsse, Nähzubehör, Schnittmuster) | `public/images/{stoffe,wolle,kurzwaren,zubehoer}/` – **noch zu liefern** |
| Produktseiten | 1–3 Fotos je Produkt | Produktfotos – **noch zu liefern** |
| Über uns / Der Laden | Laden-Innenansicht, Sybille bei der Arbeit/Beratung | `public/images/laden/` – **noch zu liefern** |
| Besuchen Sie uns | Ladenfront/Schaufenster in der Spargasse | `public/images/laden/` – **noch zu liefern** |
| Deko-/Stimmungsbilder (Startseite, Über uns) | Nähzimmer-Atmosphäre, Deko-Elemente | `public/images/deko/` – **noch zu liefern** |

Solange keine eigenen Fotos vorliegen, bleiben diese Flächen als Platzhalter markiert (siehe `docs/bildquellen.md` zur aktuellen Einschränkung bei der Beschaffung lizenzfreier Ersatzbilder).

---

## e) Versand – Vorschlag (Platzhalterwerte, bitte prüfen/anpassen)

| Versandart | Preis | Bedingung |
|---|---|---|
| Standardversand (Päckchen/Paket) | 4,95 € | bis 20 € Bestellwert |
| Standardversand | 2,95 € | ab 20 € Bestellwert |
| Versandkostenfrei | 0,00 € | ab 60 € Bestellwert *(Platzhalter – Grenze bitte final festlegen)* |
| Abholung im Laden (Click & Collect) | kostenlos | Bereitstellung i. d. R. innerhalb 1 Werktag *(Platzhalter)* |

Besonderheit Meterware: Versandkosten ggf. gewichtsabhängig staffeln (schwere Stoffballen), das wird in der Umsetzungsphase mit echten Paketgewichten geprüft.

---

## f) Offene Fragen an die Inhaberin

**Kontakt & Rechtliches**
1. Vollständiger Name der Inhaberin für Impressum?
2. Geschäftliche E-Mail-Adresse?
3. Ist die Telefonnummer 0160 97955075 final bestätigt?
4. Rechtsform des Geschäfts (Einzelunternehmen, e. K. …) und USt-IdNr./Steuernummer fürs Impressum?
5. Sollen Rechtstexte (AGB, Widerruf, Datenschutz) über einen Rechtstexte-Anbieter (z. B. IT-Recht Kanzlei, e-recht24) bezogen werden? *(Empfehlung: ja – siehe Skill `website-dsgvo`, keine Rechtsberatung durch uns)*
5a. **Wichtig, rechtlich zu prüfen:** Gilt für zugeschnittene Meterware eine Ausnahme vom gesetzlichen Widerrufsrecht als Sonderanfertigung? Entscheidungsvorlage mit allen Fragen an die Rechtsberatung liegt fertig in `docs/widerruf-meterware.md`. Beide Varianten sind im Shop vorbereitet (`lib/widerruf.ts`), eingestellt ist bis zur Klärung die vorsichtigere (Widerruf gilt).

**Laden & Geschichte**
6. Seit wann gibt es den Laden, kurze Geschichte für „Über uns“?
7. Wie viele Jahre Erfahrung/Ausbildung hat Sybille im Bereich Nähen/Textil?
8. Parkmöglichkeiten in der Nähe der Spargasse für die Wegbeschreibung?

**Logo & Bildmaterial**
9. Bestätigung: vorerst Schriftzug „Sybille's Nähparadies“ statt Logo – oder folgt noch ein Logo?
10. Ist Sybille mit der Veröffentlichung ihres Fotos im Header einverstanden (Persönlichkeitsrecht)?
11. Wann können Fotos vom Laden, von Stoffen/Wolle/Kurzwaren/Zubehör/Deko hochgeladen werden?

**Shop & Logistik**
12. Endgültige Versandkostenfrei-Grenze und Versandpreise (siehe Vorschlag oben)?
13. Bereitstellungszeit für Click & Collect (sofort/gleicher Tag/1 Werktag)?
14. Gibt es bereits eine Kasse/Warenwirtschaft (z. B. für Lagerbestand), die später angebunden werden soll, oder wird der Bestand direkt im neuen Shop-System gepflegt?
15. Ungefähre Anzahl unterschiedlicher Artikel (für Aufwandsabschätzung der Produktpflege)?
15a. Der Shopify-Code ist fertig (siehe `docs/shopify-setup.md`) – wer legt den kostenpflichtigen Shopify-Store an (Sybille selbst oder mit Unterstützung)?

**Sonstiges**
16. Social-Media-Kanäle (Instagram/Facebook) vorhanden, die verlinkt/eingebunden werden sollen?
17. Soll ein Google-Unternehmensprofil-Widget/Bewertungslink eingebunden werden (Skill `google-bewertungen`)?
