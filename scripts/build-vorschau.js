/**
 * Baut eine statische Vorschau der kompletten Seite (Ordner `vorschau/`).
 *
 * Die Vorschau braucht keinen Server: alle Seiten liegen als fertige
 * HTML-Dateien vor und lassen sich auf jeden Webspace legen.
 *
 *   node scripts/build-vorschau.js
 *
 * Wichtig: Der Export muss an der Wurzel einer Domain liegen
 * (https://beispiel.de/ – nicht https://beispiel.de/vorschau/). Next.js lädt
 * seine JavaScript-Bausteine intern über absolute Pfade wie /_next/…; in einem
 * Unterordner schlägt das fehl. Die Seiten werden dann zwar angezeigt, aber
 * nichts wird interaktiv und alle eingeblendeten Inhalte bleiben unsichtbar.
 * Für einen Unterordner müsste `basePath` in next.config.ts gesetzt werden.
 *
 * Die API-Routen werden für den Build kurz beiseitegelegt – ein statischer
 * Export kann keine Server-Routen enthalten. Das Original bleibt unberührt.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const wurzel = path.join(__dirname, "..");
const apiOrdner = path.join(wurzel, "app", "api");
const apiParkplatz = path.join(wurzel, ".api-waehrend-export");
const ausgabe = path.join(wurzel, "out");
const ziel = path.join(wurzel, "vorschau");

function baue() {
  // Der Dev-Server legt unter .next/dev Typdateien an, die auf die gerade
  // beiseitegelegten API-Routen zeigen. Ohne dieses Aufräumen scheitert der
  // Typcheck des Exports daran.
  fs.rmSync(path.join(wurzel, ".next"), { recursive: true, force: true });
  execFileSync("npx", ["next", "build"], {
    cwd: wurzel,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1", NEXT_PUBLIC_STATIC_PREVIEW: "1" },
  });
}

/** Alle Dateien unterhalb von `ordner`, als Pfade relativ zu `ordner`. */
function dateien(ordner, basis = ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap((eintrag) => {
    const voll = path.join(ordner, eintrag.name);
    return eintrag.isDirectory() ? dateien(voll, basis) : [path.relative(basis, voll)];
  });
}

fs.rmSync(ausgabe, { recursive: true, force: true });
fs.renameSync(apiOrdner, apiParkplatz);
try {
  baue();
} finally {
  if (fs.existsSync(apiParkplatz)) fs.renameSync(apiParkplatz, apiOrdner);
}

fs.rmSync(ziel, { recursive: true, force: true });
fs.renameSync(ausgabe, ziel);

const alle = dateien(ziel);
console.log(`\nVorschau gebaut: ${ziel}`);
console.log(`${alle.length} Dateien, ${alle.filter((d) => d.endsWith(".html")).length} HTML-Seiten.`);
console.log("Muss an der Wurzel einer Domain ausgeliefert werden, nicht in einem Unterordner.");
