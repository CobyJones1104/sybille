/**
 * Nimmt alle Seiten der statischen Vorschau als Bild auf – einmal in
 * Desktop-Breite, einmal in Handy-Breite, jeweils die ganze Seitenlänge.
 *
 *   node scripts/build-vorschau.js
 *   npx serve vorschau -l 4900        (oder: cd vorschau && python3 -m http.server 4900)
 *   node scripts/vorschau-bilder.js vorschau-bilder
 *
 * Vor jeder Aufnahme wird die Seite einmal durchgescrollt, damit die
 * Einblende-Animationen ausgelöst sind und nichts unsichtbar bleibt.
 * Die Bilder speisen die Galerie in vorschau-galerie/index.html.
 */
const { chromium } = require("playwright");
const B = "http://localhost:4900";
const seiten = [
  ["/", "01-startseite"], ["/shop/", "02-shop"], ["/ueber-uns/", "03-ueber-uns"],
  ["/besuchen-sie-uns/", "04-besuchen-sie-uns"], ["/kontakt/", "05-kontakt"],
  ["/warenkorb/", "06-warenkorb"], ["/versand-und-zahlung/", "07-versand-und-zahlung"],
  ["/impressum/", "08-impressum"], ["/datenschutz/", "09-datenschutz"],
  ["/agb/", "10-agb"], ["/widerruf/", "11-widerruf"],
];
(async () => {
  const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
  const ziel = process.argv[2];
  for (const [breite, hoehe, kuerzel] of [[1440, 1000, "desktop"], [390, 844, "handy"]]) {
    const ctx = await b.newContext({ viewport: { width: breite, height: hoehe }, deviceScaleFactor: 1 });
    for (const [pfad, name] of seiten) {
      const p = await ctx.newPage();
      await p.goto(B + pfad, { waitUntil: "domcontentloaded" });
      await p.waitForTimeout(1200);
      // Einmal durchscrollen, damit alle Einblende-Animationen ausgelöst sind
      await p.evaluate(async () => {
        const schritt = window.innerHeight / 2;
        for (let y = 0; y < document.body.scrollHeight; y += schritt) {
          window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 140));
        }
        window.scrollTo(0, 0);
      });
      await p.waitForTimeout(1800);
      await p.screenshot({ path: `${ziel}/${name}-${kuerzel}.jpg`, fullPage: true, type: "jpeg", quality: 78 });
      await p.close();
      console.log(`${name}-${kuerzel}`);
    }
    await ctx.close();
  }
  await b.close();
})();
