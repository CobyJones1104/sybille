---
name: website-leads
description: Leadgenerierung über die Webseite - konversionsstarke Seitenstruktur, Kontakt- und Anfrageformulare, Terminbuchung, Lead-Magneten, Newsletter mit Double-Opt-in und Weiterleitung von Leads per E-Mail, Webhook (Make/Zapier) oder CRM. Use when building contact forms, CTAs, landing pages meant to generate inquiries, lead capture, newsletter signup, booking, or lead routing.
---

# Leadgenerierung über die Webseite

## Seitenstruktur, die Anfragen bringt
1. Hero: klares Nutzenversprechen in einem Satz + ein Haupt-CTA („Kostenloses Angebot anfordern“) + Vertrauenssignal (Google-Sterne, Kundenlogos).
2. Probleme/Nutzen der Zielgruppe, dann Leistungen.
3. Social Proof: Bewertungen (Skill `google-bewertungen`), Referenzen, Zahlen.
4. Ablauf in 3 Schritten, FAQ gegen Einwände.
5. Abschluss-CTA + Formular. Auf Mobil: sticky CTA-Leiste mit Anruf-Button (`tel:`).
- Ein Hauptziel pro Seite, CTA-Texte konkret und handlungsorientiert.

## Formulare (Next.js)
- Server Action oder Route Handler, Validierung mit Zod auf Server **und** Client.
- Wenige Felder (Name, E-Mail oder Telefon, Nachricht), optionale Felder klar kennzeichnen. Mehrstufige Formulare für Angebotsanfragen (Schritt 1 einfache Auswahl) steigern die Abschlussquote.
- Spam-Schutz ohne Tracking: Honeypot-Feld, Mindest-Ausfüllzeit, Rate Limit pro IP.
- Nach Absenden: eigene Danke-Seite (`/danke`) mit nächstem Schritt und ggf. Bewertungs- oder Terminlink; Bestätigungsmail an den Interessenten.
- Fehlerzustände verständlich auf Deutsch, Formular barrierefrei (Skill `frontend-a11y`).
- Datenschutzhinweis unter dem Formular (Skill `website-dsgvo`).

## Weiterleitung der Leads
- E-Mail an den Betreiber über transaktionalen E-Mail-Dienst (Skill `mailtrap-email-integration` oder vergleichbar, EU-Region bevorzugt).
- Zusätzlich optional Webhook an Make/Zapier/n8n oder direkt ins CRM (z. B. Airtable, HubSpot). Webhook-URL und Keys nur in Umgebungsvariablen.
- Fehler beim Versand abfangen und protokollieren, damit kein Lead verloren geht (Lead zusätzlich in Datenbank speichern, wenn vorhanden).

## Weitere Lead-Werkzeuge
- Terminbuchung: Einbettung eines Buchungstools erst nach Klick/Consent oder Link auf die Buchungsseite.
- Lead-Magnet (Checkliste, Preisrechner): Download erst nach Double-Opt-in, wenn E-Mail-Marketing folgt.
- Click-to-Call und E-Mail-Links gut sichtbar; WhatsApp-Button nur als Link (`wa.me`), kein eingebettetes Widget ohne Consent.

## Messen
- Conversion-Events (Formular gesendet, Anruf-Klick) mit datenschutzfreundlichem Analytics erfassen; ohne Consent nur cookieless.
