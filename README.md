# Sybille's Nähparadies

Webseite & Online-Shop für das Fachgeschäft für Stoffe, Wolle, Kurzwaren und Nähzubehör in Bad Kissingen.

## Stack
Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · `motion/react`

## Entwicklung

Voraussetzung: Node.js 20.9 oder neuer (getestet mit Node 22).

```bash
git clone https://github.com/CobyJones1104/sybille.git
cd sybille
git checkout claude/great-franklin-pnoucf
npm install
npm run dev      # http://localhost:3000
```

Weitere Befehle:

```bash
npm run lint
npm run build
```

Ohne Shopify-Zugangsdaten läuft der Shop im Vorschau-Modus mit Beispielartikeln.
Der Warenkorb ist dann bewusst deaktiviert. Die Anbindung an den echten Store ist
in `docs/shopify-setup.md` Schritt für Schritt beschrieben.

## Projektdokumente
- `docs/konzept.md` – Sitemap, Textentwürfe, offene Fragen
- `docs/shop-architektur-vergleich.md` – Empfehlung zur Shop-Anbindung
- `docs/layout/` – Layout-Referenzanalyse
- `docs/header-konzept/` – Header-Designentscheidung
- `design-system/sybilles-naehparadies/MASTER.md` – Designsystem (Farben, Typografie, Motion)
- `docs/bildquellen.md` – Bildnachweise
