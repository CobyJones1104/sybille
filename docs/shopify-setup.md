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
4. Der Code rechnet automatisch um: Kundin wählt „1,5 m“ im Mengenwähler →
   `lib/shopify/meterware.ts` rechnet das in „3 Einheiten à 0,5 m“ für Shopify um.

Produkte **ohne** dieses Metafeld werden automatisch als normale Stückware behandelt.

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

## 7. Nach der Einrichtung
- `npm run build` laufen lassen, um sicherzustellen, dass die Seite mit echten Daten fehlerfrei baut.
- Eine Testbestellung im Shopify-Test-/Bogus-Gateway durchführen, bevor es live geht.
- `website-launch-qa` vor dem eigentlichen Go-live komplett durchlaufen.
