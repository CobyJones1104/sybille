---
name: google-bewertungen
description: Google-Bewertungen auf der Webseite anzeigen und neue Bewertungen sammeln - Google Places API, Bewertungs-Widget, Bewertungslink/QR-Code, rechtssichere Bewertungsanfragen. Use when the user wants Google reviews, Google rating, Sterne, Rezensionen, Google Business Profile or review collection on a website.
---

# Google-Bewertungen einbinden & sammeln

## Anzeigen auf der Webseite
**Empfohlen: serverseitig über die Google Places API (New)**
- Place Details serverseitig abrufen (Route Handler/Server Component) mit Feldern `rating`, `userRatingCount`, `reviews`, `googleMapsUri`. API-Key nur serverseitig in Umgebungsvariablen, per API-Restriction auf Places API beschränken.
- Die API liefert nur eine kleine Auswahl an Bewertungen (maximal 5). Für mehr Bewertungen braucht es die Business Profile API (nur für Profilinhaber) oder einen Widget-Dienst.
- Ergebnis mit Revalidierung cachen (z. B. `revalidate: 86400`), um Kosten und Ladezeit zu sparen. Nutzungsbedingungen der Google Maps Platform zu Caching und Attribution beachten und im Code kommentieren.
- Pflicht: Google-Attribution anzeigen und Autorennamen/Profilfotos wie geliefert darstellen, Bewertungen nicht verändern.
- Vorteil DSGVO: Beim serverseitigen Abruf lädt der Browser des Besuchers nichts von Google. Profilbilder der Rezensenten entweder weglassen oder über den eigenen Server ausliefern, sonst Consent nötig (Skill `website-dsgvo`).
- Anzeige: Durchschnitt + Anzahl + Sterne oben, darunter Karten/Slider mit Bewertungen, Link „Alle Bewertungen auf Google“.

**Alternative ohne Entwicklung:** Widget-Anbieter. Dann auf Consent und Ladezeit achten.

## Strukturierte Daten
- `LocalBusiness`-Schema mit Adresse, Öffnungszeiten, Telefon: ja.
- **Kein** selbst ausgegebenes `AggregateRating`/`Review`-Markup für das eigene Unternehmen erwarten lassen: Google zeigt selbst gehostete Bewertungen von LocalBusiness/Organization nicht als Sterne-Rich-Result an. Den Nutzer darauf hinweisen, statt Sterne in den Suchergebnissen zu versprechen.

## Neue Bewertungen sammeln
- Direktlink: `https://search.google.com/local/writereview?placeid=PLACE_ID` (Place ID über den Place ID Finder von Google ermitteln).
- Daraus QR-Code erzeugen (für Theke, Rechnung, Visitenkarte) und Button „Bewerten Sie uns auf Google“ auf Danke-Seiten und in E-Mail-Signaturen.
- Automatisierte Bitte nach Auftrag/Kauf per E-Mail (Skill `mailtrap-email-integration` oder vorhandener E-Mail-Dienst), aber nur bei bestehender Kundenbeziehung und mit Abmeldemöglichkeit.

## Verboten (Google-Richtlinien & UWG)
- Keine Gegenleistung für Bewertungen (Rabatt, Gewinnspiel).
- Kein „Review Gating“: nicht erst Zufriedenheit abfragen und nur Zufriedene zu Google schicken.
- Keine gekauften oder selbst geschriebenen Bewertungen.
Wenn der Nutzer so etwas möchte, freundlich auf das Risiko (Abmahnung, Löschung, Sperrung des Profils) hinweisen und die legale Variante anbieten.
