/**
 * Passt die statische Vorschau für Hoster an, die keine Pfade mit führendem
 * Unterstrich ausliefern (z. B. der Artifact-Dienst von claude.ai).
 *
 *   node scripts/build-vorschau.js && node scripts/vorschau-artifact.js
 *
 * Next.js legt alles unter `_next/` ab. Der Ordner wird umbenannt und alle
 * Verweise darauf – in HTML, JavaScript und CSS – werden nachgezogen.
 * Die `__next.*.txt`-Dateien dienen nur dem Vorausladen beim Klick auf einen
 * Link; ohne sie lädt der Browser die Zielseite ganz normal neu.
 */
const fs = require("fs");
const path = require("path");

const ziel = path.join(__dirname, "..", "vorschau");
const ALT = "_next";
const NEU = "next-dateien";

function dateien(ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap((e) => {
    const voll = path.join(ordner, e.name);
    return e.isDirectory() ? dateien(voll) : [voll];
  });
}

if (!fs.existsSync(ziel)) {
  console.error("Kein vorschau/-Ordner – zuerst scripts/build-vorschau.js ausführen.");
  process.exit(1);
}

// Vorausladen-Dateien und die 404-Varianten entfernen: beide beginnen mit "_"
// bzw. hängen daran, und für eine Vorschau braucht es sie nicht.
let entfernt = 0;
for (const datei of dateien(ziel)) {
  if (path.basename(datei).startsWith("__next.") || path.basename(datei) === "index.txt") {
    fs.rmSync(datei);
    entfernt += 1;
  }
}
fs.rmSync(path.join(ziel, "_not-found"), { recursive: true, force: true });

fs.renameSync(path.join(ziel, ALT), path.join(ziel, NEU));

const textEndungen = [".html", ".js", ".css", ".txt", ".json"];
let angepasst = 0;
for (const datei of dateien(ziel)) {
  if (!textEndungen.includes(path.extname(datei))) continue;
  const vorher = fs.readFileSync(datei, "utf8");
  const nachher = vorher.split(`/${ALT}/`).join(`/${NEU}/`);
  if (vorher !== nachher) {
    fs.writeFileSync(datei, nachher);
    angepasst += 1;
  }
}

// Einzelne Bibliotheken enthalten das Ersatzzeichen U+FFFD wörtlich in einem
// String. Manche Hoster lehnen Dateien damit ab; die JavaScript-Schreibweise
// \uFFFD steht für genau dasselbe Zeichen.
let ersetzt = 0;
for (const datei of dateien(ziel)) {
  if (path.extname(datei) !== ".js") continue;
  const vorher = fs.readFileSync(datei, "utf8");
  if (!vorher.includes("\uFFFD")) continue;
  fs.writeFileSync(datei, vorher.split("\uFFFD").join("\\uFFFD"));
  ersetzt += 1;
}

// Leere Ordner aufräumen, die durch das Löschen entstanden sein können
for (const eintrag of fs.readdirSync(ziel, { withFileTypes: true })) {
  const voll = path.join(ziel, eintrag.name);
  if (eintrag.isDirectory() && fs.readdirSync(voll).length === 0) fs.rmdirSync(voll);
}

console.log(`${entfernt} Vorauslade-Dateien entfernt, ${ALT}/ → ${NEU}/ umbenannt,`);
console.log(`${angepasst} Dateien mit angepassten Verweisen, ${ersetzt} mit ersetztem U+FFFD.`);
console.log(`${dateien(ziel).length} Dateien insgesamt.`);
