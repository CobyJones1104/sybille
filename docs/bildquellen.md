# Bildquellen

## Status: Produktfotos fehlen noch
Im Hauptverzeichnis wurden **keine Fotos vom Laden, von Stoffen, Wolle, Kurzwaren, Zubehör oder Deko hochgeladen** (kein Bild, kein ZIP im Projekt-Root gefunden). Die Zielordner sind bereits angelegt und einsatzbereit:

```
public/images/laden/
public/images/stoffe/
public/images/wolle/
public/images/kurzwaren/
public/images/zubehoer/
public/images/deko/
```

Sobald echte Fotos hochgeladen werden, werden sie hier automatisch:
1. sortiert (ggf. ZIP entpackt, ZIP danach gelöscht),
2. in beschreibende, kleingeschriebene Dateinamen umbenannt,
3. als WebP (max. 2000 px Breite, Qualität ca. 80) erzeugt,
4. hier mit Motiv, Quelle und Alt-Text-Vorschlag dokumentiert.

**Hinweis zur Bildbeschaffung:** In dieser Arbeitsumgebung ist der Zugriff auf externe Bild-Dienste (getestet: Pexels-CDN) durch die Netzwerk-Richtlinie blockiert (`403 policy denial`). Lizenzfreie Unsplash-/Pexels-Bilder für fehlende Motive können daher aktuell nicht automatisch heruntergeladen werden. Empfehlung: entweder eigene Fotos aus dem Laden hochladen (am authentischsten und für lokale Sichtbarkeit am wertvollsten) oder in einer Sitzung mit Internetzugriff gezielt lizenzfreie Bilder auswählen lassen. Siehe offene Frage in `docs/konzept.md`.

## Referenzmaterial (nicht für die Webseite, nur Konzeptgrundlage)

| Datei | Verwendungszweck | Quelle | Hinweis |
|---|---|---|---|
| `docs/layout/01-stil-doppelbelichtung-portraet.jpg` | Stil-Referenz für Header-Bildsprache (nicht als Seitenbild) | Vom Nutzer als Referenzbild hochgeladen (Midjourney-Tutorial-Beispiel eines Drittanbieters) | Nur Stilprinzip (Person + Naturmotiv verschmelzen) wird übernommen, nicht das Bild selbst |
| `docs/layout/02-startseite-hero-naturprodukt.jpg` | Layout-Referenz Startseite/Buttons | Vom Nutzer als Referenzbild hochgeladen | Nur Struktur/Button-Stil, keine Bild-/Textübernahme |
| `docs/layout/03-shop-startseite-ecommerce.jpg` | Layout-Referenz Shop-Startseite | Vom Nutzer als Referenzbild hochgeladen | Nur Struktur, keine Bild-/Textübernahme |
| `docs/header-konzept/sybille-foto-referenz.jpg` | Echtes Foto der Inhaberin für den späteren Header | Vom Nutzer hochgeladen | Rechte-Klärung siehe offene Frage in `docs/konzept.md`; Verwendung erst in der Design-Phase, siehe `docs/header-konzept/konzept.md` |

## Alt-Text-Grundsätze (für spätere Produktfotos)
- Immer Motiv + relevantes Merkmal + ggf. Farbe/Material nennen, keine Keyword-Häufung.
- Beispiel-Muster: „Baumwollstoff [Farbe] mit [Muster]-Druck, Meterware bei Sybille's Nähparadies Bad Kissingen“
- Ladenfotos: „Sybille's Nähparadies – Fachgeschäft für Stoffe und Wolle in der Spargasse Bad Kissingen“
