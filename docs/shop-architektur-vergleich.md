# Shop-Architektur: Vergleich & Empfehlung

Bewertungsgrundlage: Skill `website-shop`. Wichtigstes Kriterium laut Auftrag: **Sybille (keine Entwicklerin) muss Produkte, Meterware, Bestand und Bestellungen selbst pflegen können.** Zahlarten: PayPal, Klarna (Rechnung/Raten), SEPA-Lastschrift, Vorkasse/Überweisung, Barzahlung bei Abholung – **keine Kreditkarten, kein Apple/Google Pay.**

## Optionen im Vergleich

| Kriterium | (a) Shopify headless + Next.js | (b) Next.js + Stripe Eigenbau | (c) Klassischer Shopify-Shop |
|---|---|---|---|
| Selbstpflege Produkte/Bestand/Bestellungen | ✅ Bewährtes, deutsches Shopify-Admin, ohne Entwickler nutzbar | ❌ Es gibt kein Admin „von der Stange“ – müsste komplett mitgebaut werden (Produktpflege, Bestand, Bestellübersicht) und dauerhaft gewartet werden | ✅ Gleiches Admin wie (a) |
| Meterware (Preis/Meter, Mindestmenge, 0,5-m-Schritte) | ✅ Über Varianten + etablierte Meterware-Apps abbildbar | ⚠️ Muss komplett selbst programmiert werden (Mengenlogik, Rundung, Preisberechnung) | ✅ Gleich wie (a) |
| Individuelles Design/Animation (Bild 2 & 3, Scroll-Animationen) | ✅ Volle Freiheit, da eigenes Next.js-Frontend | ✅ Volle Freiheit | ⚠️ Eingeschränkt auf Theme-Editor (Liquid), aufwendige Animationen schwerer sauber umsetzbar |
| Zahlarten ohne Karte/Apple/Google Pay | ✅ Über Shopify-Zahlungs-Apps (PayPal, Klarna, SEPA-Lastschrift) + manuelle Zahlungsart für Vorkasse/Abholung einzeln aktivierbar, Kartenzahlung einfach deaktivieren | ⚠️ Technisch machbar (Stripe erlaubt Auswahl der Payment-Method-Types), aber Klarna/SEPA/Vorkasse-Logik inkl. Rechnungsstellung muss komplett selbst gebaut/betreut werden | ✅ Wie (a) |
| Click & Collect (kostenlose Abholung) | ✅ Native Versandart „Abholung“ in Shopify, im Checkout wählbar | ⚠️ Muss selbst gebaut werden | ✅ Wie (a) |
| Aufwand/Kosten zum Start | Mittel–hoch (zwei Systeme verzahnen) | Hoch, danach dauerhaft hohe Wartungslast | Niedrig–mittel |
| Laufende Kosten | Shopify-Gebühr (Ladenpreis) + Hosting Next.js-Frontend | Nur Hosting, aber Entwicklerzeit für jede Änderung/jeden Bugfix nötig | Nur Shopify-Gebühr |
| Risiko bei Ausfall/Fehler | Gering (Shopify-Kern stabil, Frontend austauschbar) | Hoch (Einzelanfertigung, kein Hersteller-Support) | Gering |

## Empfehlung

**Primär: (a) Shopify headless + Next.js.**
Begründung: Sybille bekommt das bewährte, deutschsprachige Shopify-Admin für Produkte, Meterware, Lagerbestand und Bestellungen – genau das vom Auftrag geforderte Muss-Kriterium. Gleichzeitig lässt sich die Optik zu 100 % frei nach den Layout-Vorlagen (Bild 2 „Startseite/Buttons“, Bild 3 „Shop-Aufbau“) und mit den gewünschten Scroll-/Hover-Animationen (`motion-foundations`/`motion-patterns`) umsetzen, was mit einem klassischen Shopify-Theme nur eingeschränkt möglich wäre. Alle gewünschten Zahlarten (PayPal, Klarna, SEPA-Lastschrift, Vorkasse, Barzahlung bei Abholung) sind über offizielle Shopify-Zahlungskanäle bzw. die manuelle Zahlungsart abbildbar; Kreditkarte/Apple Pay/Google Pay werden einfach nicht aktiviert.

**Budget-/Zeit-Alternative: (c) Klassischer Shopify-Shop.**
Wenn ein schneller, günstigerer Start wichtiger ist als das exakte Design aus den Vorlagen: gleiche Admin-Vorteile, aber Umsetzung über Shopify-Theme statt eigenem Next.js-Frontend – die aufwendigen Animationen und das exakte Layout aus Bild 2/3 sind dann nur teilweise erreichbar.

**Nicht empfohlen: (b) Next.js + Stripe Eigenbau.**
Scheitert am wichtigsten Kriterium: Es gäbe kein fertiges Verwaltungswerkzeug für Produkte/Meterware/Bestand/Bestellungen – Sybille wäre dauerhaft auf einen Entwickler angewiesen, auch für einfache Änderungen (z. B. neuer Stoff, Preisänderung, Bestandskorrektur).

## Umsetzbarkeit der Zahlarten (Detailprüfung)
- **PayPal:** offizieller Shopify-Zahlungskanal, Standard in Deutschland. ✅
- **Klarna (Rechnung/Raten):** offizieller Shopify-Zahlungskanal für Deutschland verfügbar. ✅
- **SEPA-Lastschrift:** über Zahlungs-Apps im Shopify App Store abbildbar. ✅ (konkrete App erst in der Umsetzungsphase auswählen)
- **Vorkasse/Überweisung:** manuelle Zahlungsart in Shopify (Bestellung wird nach Zahlungseingang manuell freigegeben). ✅
- **Barzahlung bei Abholung:** manuelle Zahlungsart, kombiniert mit Versandart „Abholung im Laden“. ✅
- **Kreditkarte/Apple Pay/Google Pay:** werden schlicht nicht als Zahlungsmethode aktiviert. ✅ technisch problemlos ausschließbar

## Nächster Schritt (erst nach Freigabe)
Konkrete Shopify-Plan-Wahl, Storefront-API-Setup und Next.js-Frontend-Architektur werden erst in der Design-/Code-Phase festgelegt.
