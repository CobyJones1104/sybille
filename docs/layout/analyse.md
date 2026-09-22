# Layout-Analyse der Vorlagen

Diese Analyse dient **nur zur Orientierung für Aufbau, Reihenfolge und Anordnung** der künftigen Seite. Es werden **keine Texte, Logos, Markennamen oder Bilder** aus den Vorlagen übernommen – nur Struktur- und Stilprinzipien.

## 01 – Stil-Referenz: Doppelbelichtungs-Portrait (`01-stil-doppelbelichtung-portraet.jpg`)
Herkunft: Midjourney-Tutorial-Beispiel (Werbebild eines Prompt-Anbieters „TG -> @eshich_aicreation“), dient **ausschließlich als Stilreferenz für den Header**, nicht als Seiten-Layout.

- Bildaufbau: Person im Profil, halbtransparent mit Landschafts-/Naturmotiv (Berge, Wolken) verschmolzen, die von der Kopf-/Schulterpartie nach oben „ausfranst“.
- Farbpalette: kühle Blau- und Grautöne, hoher Kontrast, ruhiger dunkler Hintergrund.
- Wirkung: poetisch, ruhig, hochwertig – passt zur Formulierung „ich liebe, was ich tue“.
- **Übertragbares Prinzip (nicht das Bild selbst):** Personenfoto + ein zum Handwerk passendes Element (hier: wehende Stoffbahnen statt Wolken) gehen ineinander über. Umsetzung später mit dem echten Sybille-Foto per CSS/Bildmontage (kein Gesichts-Umbau), siehe `docs/header-konzept/konzept.md`.

## 02 – Startseite Hero + Content-Kacheln (`02-startseite-hero-naturprodukt.jpg`)
- **Reihenfolge oben → unten:**
  1. Vollbild-Hero mit großer Headline (2 Zeilen), kurzem Fließtext, einem einzelnen Call-to-Action-Button (Pill-Form, abgerundet, warme Akzentfarbe auf dunklem Grund)
  2. Vier-Spalten-Leisten-Modul mit Icon + kurzer Überschrift + Kurztext (USP-Leiste)
  3. Karten-Raster (3 Spalten, 2 Reihen) mit Icon/Bild, Titel, Kurztext – für Kategorien/Themenblöcke
- **Button-Stil (für den Wunsch „Buttons wie Bild 2“):** Pill-Form (voll abgerundet), dezenter Farbverlauf, ruhiger Schatten – wirkt hochwertig statt verspielt. Hover-Verhalten selbst nicht sichtbar im Standbild, wird in `docs/header-konzept/konzept.md` als Animationsidee festgehalten (leichtes Anheben + Farbaufhellung + Schattenvergrößerung).
- **Prinzip:** Ein klares Thema pro Abschnitt, viel Weißraum/Luft, Icons statt Fotos für abstrakte Aussagen, echte Fotos für emotionale Aussagen.

## 03 – Shop-Startseite E-Commerce (`03-shop-startseite-ecommerce.jpg`)
- **Kopfbereich:** Logo links, Suchleiste mittig (prominent, breit), Account/Wunschliste/Warenkorb-Icons rechts, zweite Zeile mit Kategorie-Navigation + „Angebote“ hervorgehoben.
- **Reihenfolge oben → unten:**
  1. Hero-Slider/-Banner: Headline + Unterzeile + CTA links, Lifestyle-Foto rechts, umgeben von 4–5 ausklappbaren „Produkt-Preisschildern“ (Bild + Name + Preis + Bewertung)
  2. Vertrauens-Leiste (Versand, sichere Zahlung, Rückgabe, Support) – vier Icons nebeneinander
  3. „Shop nach Kategorie“ – Kreis-Icons mit Beschriftung, horizontal
  4. „Empfohlen für dich“ – horizontale Produktkarten-Reihe (Bild, Name, Preis, Bewertung, Herz-Icon)
  5. „Trending“ – runde Produktbilder mit Rang-Nummer
  6. Zwei-Spalten-Promo-Block (zeitlich befristetes Angebot + kuratierte Kollektion)
  7. Kundenstimmen (3 Karten mit Sternebewertung)
  8. Newsletter-Leiste
  9. Footer mit vier Spalten (Marke/Social, Shop-Links, Service-Links, Unternehmen/Rechtliches) + Zahlungssymbole

**Übertragbares Prinzip für Sybille's Nähparadies:** dieselbe Grundstruktur (Vertrauensleiste, Kategorie-Icons, Produkt-Reihen, Kundenstimmen, Newsletter, vierspaltiger Footer), aber mit warmer, regionaler Bildsprache statt Großstadt-Lifestyle-Fotografie, und ergänzt um Click & Collect als eigenen Vertrauens-Punkt (statt nur Versand).

## Navigationsprinzip (aus 02 + 03 kombiniert)
- Hauptnavigation: Kategorien direkt sichtbar (nicht hinter Burger-Menü versteckt), zusätzlich Suchfeld.
- Sekundär sichtbar: Warenkorb, ggf. Konto.
- Footer trägt die komplette Struktur- und Rechtsnavigation, damit die Hauptnavigation schlank bleibt.

Diese drei Prinzipien (Hero → USP-Leiste → Kategorien → Produkte/Themen → Vertrauen/Bewertungen → Kontakt/Footer) bilden die Grundlage für die Sitemap in `docs/konzept.md`.
