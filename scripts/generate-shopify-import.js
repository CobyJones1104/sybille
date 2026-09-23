/**
 * Erzeugt aus docs/produkte-vorlage.csv eine Importdatei im Shopify-Format
 * (docs/shopify-produktimport.csv), damit Produkte nicht einzeln von Hand
 * angelegt werden müssen.
 *
 *   node scripts/generate-shopify-import.js
 *
 * WICHTIG bei Meterware: Shopify kann nur ganze Mengen. Deshalb ist eine
 * "Einheit" im Shop ein Schritt (z. B. 0,5 m) und der Variantenpreis wird
 * entsprechend heruntergerechnet (9,90 €/m -> 4,95 € pro 0,5-m-Schritt).
 * Die Schrittweite steht im Metafeld custom.step_meters.
 */
const fs = require("fs");
const path = require("path");

const SOURCE = path.join(__dirname, "..", "docs", "produkte-vorlage.csv");
const TARGET = path.join(__dirname, "..", "docs", "shopify-produktimport.csv");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else inQuotes = false;
      } else field += char;
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field);
      if (row.some((value) => value.trim() !== "")) rows.push(row);
      row = [];
      field = "";
    } else if (char !== "\r") {
      field += char;
    }
  }
  row.push(field);
  if (row.some((value) => value.trim() !== "")) rows.push(row);
  return rows;
}

const escape = (value) => (/[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value);

const COLUMNS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Alt Text",
  "Status",
  "Metafield: custom.step_meters [number_decimal]",
];

const [header, ...rows] = parseCsv(fs.readFileSync(SOURCE, "utf8"));
const index = Object.fromEntries(header.map((name, i) => [name.trim(), i]));

const slug = (value) =>
  value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const lines = [COLUMNS.join(",")];

for (const row of rows) {
  const name = row[index.name];
  const unit = row[index.einheit];
  const pricePerUnit = Number.parseFloat(row[index.preis]);
  const step = Number.parseFloat(row[index.schrittweite_meterware]);
  const isMeterware = unit === "Meter" && Number.isFinite(step) && step > 0 && step !== 1;

  // Preis pro Schritt statt pro Meter, sonst würde die Kundin doppelt zahlen
  const variantPrice = isMeterware ? pricePerUnit * step : pricePerUnit;
  const optionValue = isMeterware ? `${String(step).replace(".", ",")} m` : "Standard";
  const stock = row[index.bestand];

  const description = [
    row[index.beschreibung],
    row[index.material] && `Material: ${row[index.material]}`,
    row[index.breite] && row[index.breite] !== "–" && `Breite/Maß: ${row[index.breite]}`,
    row[index.pflegehinweise] && row[index.pflegehinweise] !== "–" && `Pflege: ${row[index.pflegehinweise]}`,
  ]
    .filter(Boolean)
    .map((text) => `<p>${text}</p>`)
    .join("");

  lines.push(
    [
      slug(name),
      name,
      description,
      "Sybille's Nähparadies",
      (row[index.kategorie] || "").split(">")[0].trim(),
      "",
      "TRUE",
      isMeterware ? "Zuschnitt" : "Ausführung",
      optionValue,
      "",
      "shopify",
      stock,
      "deny",
      "manual",
      variantPrice.toFixed(2),
      "TRUE",
      "TRUE",
      "",
      `${name} – Sybille's Nähparadies Bad Kissingen`,
      "draft",
      isMeterware ? String(step) : "",
    ]
      .map((value) => escape(String(value ?? "")))
      .join(",")
  );
}

fs.writeFileSync(TARGET, lines.join("\n") + "\n");
console.log(`geschrieben: ${TARGET} (${rows.length} Produkte)`);
