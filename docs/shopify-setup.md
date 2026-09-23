# Shopify-Anbindung einrichten

Der Code ist fertig (`lib/shopify/`, `app/api/cart/`, `app/shop/`, `app/warenkorb/`) und schaltet
automatisch von der Demo-Vorschau auf echte Produkte/Bestellungen um, sobald die beiden
Umgebungsvariablen unten gesetzt sind. Diese Schritte kann Sybille größtenteils selbst im
Shopify-Adminbereich erledigen – dafür wurde headless Shopify (siehe
`docs/shop-architektur-vergleich.md`) empfohlen.

## 1. Shopify-Store anlegen
1. Auf [shopify.com](https://www.shopify.com) einen Store anlegen, Basic-Plan reicht für den Start.
2. Produkte, Kategorien, Preise, Lagerbestand künftig ganz normal im Shopify-Adminbereich pflegen
   (Produkte → Hinzufügen) – dafür ist keine Entwicklerin nötig, das war das wichtigste Kriterium
   aus `docs/shop-architektur-vergleich.md`.

## 2. Storefront-API-Zugang erstellen
1. Shopify-Adminbereich → **Einstellungen → Apps und Vertriebskanäle → Apps entwickeln**.
2. **App entwickeln** → Namen vergeben (z. B. „Website Storefront“).
3. Unter **Storefront-API-Konfiguration** mindestens folgende Berechtigungen aktivieren:
   - Produktlisten lesen (`unauthenticated_read_product_listings`)
   - Produktbestand lesen (`unauthenticated_read_product_inventory`)
   - Warenkörbe lesen/schreiben (`unauthenticated_read_carts` / `unauthenticated_write_carts`)
4. App installieren, danach unter **API-Anmeldedaten** den **Storefront-API-Zugriffstoken**
   kopieren (nicht den Admin-API-Token – der ist geheim und wird hier nicht gebraucht).

## 3. Umgebungsvariablen setzen
```bash
cp .env.example .env.local
```
In `.env.local` eintragen:
```
SHOPIFY_STORE_DOMAIN=dein-shop.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=<der kopierte Token>
```
Beim späteren Deployment (Vercel/Netlify) dieselben zwei Variablen dort in den
Projekteinstellungen hinterlegen. `.env*`-Dateien werden nie committet (siehe `.gitignore`).

Danach `npm run dev` neu starten – `/shop` zeigt dann automatisch die echten Produkte statt der
Demo-Beispiele, der „In den Warenkorb“-Button wird aktiv.

## 4. Meterware korrekt anlegen (wichtig!)
Shopifys Warenkorb akzeptiert nur **ganze Zahlen** als Menge – „1,5 Meter“ geht dort technisch
nicht direkt. Lösung ohne Zusatz-App:

1. Unter **Einstellungen → Benutzerdefinierte Daten → Produkte → Definition hinzufügen** ein
   Metafeld anlegen: Namespace `custom`, Key `step_meters`, Typ „Dezimalzahl“.
2. Bei jedem Meterware-Produkt den Wert setzen, z. B. `0.5` für 0,5-Meter-Schritte.
3. Den **Variantenpreis** als Preis *pro Schritt* eintragen (bei 0,5-m-Schritten also den
   Preis für einen halben Meter, nicht für den ganzen Meter).
   > ⚠️ **Hier bitte genau hinschauen:** Wird versehentlich der Meterpreis eingetragen,
   > zahlen Kundinnen bei 0,5-m-Schritten den doppelten Preis. Die vorbereitete
   > Importdatei (Abschnitt 4a) rechnet das bereits korrekt um.
4. Der Code rechnet automatisch um: Kundin wählt „1,5 m“ im Mengenwähler →
   `lib/shopify/meterware.ts` rechnet das in „3 Einheiten à 0,5 m“ für Shopify um.

Produkte **ohne** dieses Metafeld werden automatisch als normale Stückware behandelt.

## 4a. Produkte per Datei importieren (spart das Eintippen)
Statt jedes Produkt einzeln anzulegen, lässt sich `docs/shopify-produktimport.csv`
direkt hochladen: Shopify-Adminbereich → **Produkte → Importieren → Datei auswählen**.

Die Datei wird erzeugt aus `docs/produkte-vorlage.csv`:
```bash
node scripts/generate-shopify-import.js
```
Sobald Sybille die Vorlage mit den echten Artikeln füllt, einfach neu erzeugen und importieren.

Was die Datei schon richtig macht:
- Meterware-Preise sind auf den Schritt heruntergerechnet (9,90 €/m → 4,95 € pro 0,5 m)
- Schrittweite steht im Metafeld `custom.step_meters`
- Beschreibung, Material, Breite und Pflegehinweis stehen im Produkttext
- Alle Produkte stehen auf **Entwurf** (`draft`), gehen also nicht versehentlich sofort live

Falls Shopify die Metafeld-Spalte beim Import nicht annimmt (die Schreibweise der
Spaltenüberschrift ändert sich gelegentlich): Produkte trotzdem importieren und die
Schrittweite anschließend je Meterware-Produkt von Hand im Metafeld setzen.

## 5. Zahlarten einrichten (Vorgabe: keine Kreditkarte, kein Apple/Google Pay)
Unter **Einstellungen → Zahlungen**:
- **PayPal** aktivieren (offizieller Shopify-Kanal).
- **Klarna** aktivieren (offizieller Shopify-Kanal für Deutschland).
- **SEPA-Lastschrift**: passenden Zahlungsanbieter aus dem Shopify-App-Store wählen (z. B. einen
  Anbieter mit SEPA-Unterstützung für Deutschland) – bei Einrichtung aktuelle Angebote vergleichen.
- **Vorkasse/Überweisung** und **Barzahlung bei Abholung**: als „Manuelle Zahlungsmethode“ anlegen.
- **Kreditkarte/Shopify Payments sowie Apple Pay/Google Pay bewusst nicht aktivieren** – wenn
  Shopify Payments deaktiviert bleibt, tauchen diese Optionen im Checkout gar nicht erst auf.

## 6. Versand & Click & Collect
Unter **Einstellungen → Versand und Zustellung**:
- Versandstaffel nach dem Vorschlag in `docs/konzept.md` (Abschnitt e) anlegen.
- **Lokale Abholung** aktivieren und auf 0 € setzen → das bildet „Click & Collect“ ab.

## 6a. Was bereits getestet ist – und was nicht
Die Anbindung wurde gegen einen **Simulator** der Storefront-API geprüft
(`scripts/mock-shopify.js`), weil für einen echten Test ein kostenpflichtiger Store
nötig wäre. So lässt sich der Weg jederzeit ohne Shopify-Konto nachspielen:

```bash
node scripts/mock-shopify.js          # Terminal 1
# .env.local:
#   SHOPIFY_STORE_DOMAIN=http://localhost:4000
#   SHOPIFY_STOREFRONT_ACCESS_TOKEN=test-token
npm run dev                           # Terminal 2
```

Nachgewiesen funktioniert damit:
- Produkte werden geladen und ersetzen automatisch die Demo-Vorschau
- „In den Warenkorb" legt einen Warenkorb an, das Symbol oben zeigt die Anzahl
- Meterware rechnet korrekt: 1,5 m → 3 Einheiten à 0,5 m → 14,85 € bei 4,95 € je Schritt
- Menge ändern und Position entfernen aktualisieren die Zwischensumme
- Der Button „Zur Kasse" führt auf die Checkout-Adresse des Warenkorbs

**Noch offen und nur mit echtem Store prüfbar:** der eigentliche Bezahlvorgang,
die Zahlarten, Versandberechnung und die Bestellbestätigung per E-Mail. Vor dem
Go-live unbedingt eine Testbestellung über Shopifys Test-Zahlungsart durchführen.

## 7. Nach der Einrichtung
- `npm run build` laufen lassen, um sicherzustellen, dass die Seite mit echten Daten fehlerfrei baut.
- Eine Testbestellung im Shopify-Test-/Bogus-Gateway durchführen, bevor es live geht.
- `website-launch-qa` vor dem eigentlichen Go-live komplett durchlaufen.
