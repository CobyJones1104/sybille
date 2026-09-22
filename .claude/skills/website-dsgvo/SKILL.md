---
name: website-dsgvo
description: DSGVO/TDDDG-konforme Webseiten in Deutschland - Impressum, Datenschutzerklärung, Cookie-Consent, datenschutzfreundliche Einbindung von Fonts, Karten, Videos, Analytics und Formularen. Use when building any German website, adding tracking, cookies, embeds, forms, newsletter, or when the user mentions DSGVO, GDPR, Datenschutz, Impressum or Cookie-Banner.
---

# DSGVO-konforme Webseite (Deutschland)

Hinweis an den Nutzer bei Rechtstexten: Das ist technische Umsetzung, keine Rechtsberatung. Rechtstexte über Generatoren/Anbieter (e-recht24, IT-Recht Kanzlei, Datenschutz-Generator) erstellen lassen.

## Pflichtseiten
- **Impressum** nach § 5 DDG (früher TMG): Name, Anschrift, Kontakt (E-Mail + schnelle zweite Kontaktmöglichkeit), ggf. USt-IdNr., Registerangaben. Von jeder Seite mit max. 2 Klicks erreichbar, Footer-Link „Impressum“.
- **Datenschutzerklärung**: muss jeden tatsächlich eingesetzten Dienst nennen (Hosting, Formulare, E-Mail-Versand, Zahlungsanbieter, Karten, Analytics). Bei Code-Änderungen prüfen, ob sie angepasst werden muss, und den Nutzer darauf hinweisen.

## Grundregel: Nichts lädt vor der Einwilligung
Nach § 25 TDDDG und DSGVO dürfen nicht notwendige Cookies, Tracking und Drittinhalte erst nach aktiver Einwilligung laden.

- **Schriften selbst hosten**: `next/font` (lädt lokal aus), niemals Google-Fonts-CDN.
- **Google Maps, YouTube, Instagram**: Zwei-Klick-Lösung (Platzhalter mit Vorschaubild und Button „Karte laden“) oder statisches Kartenbild mit Link. YouTube nur über `youtube-nocookie.com` und erst nach Klick.
- **Analytics**: bevorzugt cookieloses, EU-gehostetes Tool (z. B. Plausible, Matomo selbst gehostet). Google Analytics/Meta Pixel nur nach Consent.
- **Captcha**: kein Google reCAPTCHA ohne Consent. Stattdessen Honeypot + Zeitprüfung + Rate Limit oder Friendly Captcha.
- **CDNs/Skripte von Drittanbietern** vermeiden, Assets selbst ausliefern.

## Cookie-Banner (nur wenn nötig)
- Wenn nur technisch notwendige Cookies: kein Banner nötig. Ziel: so bauen, dass kein Banner gebraucht wird.
- Wenn nötig: „Alle ablehnen“ gleichwertig zu „Alle akzeptieren“ (gleiche Ebene, gleiche Optik), keine vorausgewählten Häkchen, Einwilligung jederzeit widerrufbar (Link im Footer „Cookie-Einstellungen“), Consent dokumentieren.
- Skripte erst nach Consent dynamisch nachladen.

## Formulare
- Datensparsam: nur nötige Pflichtfelder.
- Hinweis unter dem Formular mit Link zur Datenschutzerklärung. Keine vorangekreuzte Checkbox.
- Übertragung nur über HTTPS, Daten serverseitig verarbeiten, nicht unnötig speichern, Löschfristen definieren.
- Newsletter: **Double-Opt-in** Pflicht, Protokoll von Zeitpunkt und IP der Bestätigung, Abmeldelink in jeder Mail.

## Hosting & Dienstleister
- EU-Hosting bevorzugen oder Anbieter mit EU-Region; Auftragsverarbeitungsvertrag (AVV) mit Hoster, E-Mail-Dienst, Formular-Dienst abschließen lassen.
- Server-Logs: IP kürzen oder Aufbewahrung begrenzen (z. B. 7–14 Tage).
- Liste aller eingesetzten Dienste für die Datenschutzerklärung am Projektende an den Nutzer ausgeben.

## Abschluss-Check
Im Browser mit DevTools (Netzwerk-Tab) prüfen: Vor Consent keine Requests an Google, Meta, YouTube, fonts.googleapis.com oder andere Dritte. Das Ergebnis dem Nutzer berichten.
