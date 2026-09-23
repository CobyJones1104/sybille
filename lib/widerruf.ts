/**
 * Widerrufsrecht bei zugeschnittener Meterware.
 *
 * Ob der Zuschnitt nach Kundenwunsch als kundenspezifische Anfertigung gilt und
 * damit vom gesetzlichen Widerrufsrecht ausgenommen sein kann, ist eine offene
 * Rechtsfrage. Sie muss von einer Rechtsberatung beantwortet werden – die
 * Entscheidungsvorlage dazu liegt in docs/widerruf-meterware.md.
 *
 * Bis zur Klärung steht hier bewusst die vorsichtigere Variante: Das
 * Widerrufsrecht gilt. Ein zu Unrecht gewährter Widerruf kostet Geld, ein zu
 * Unrecht ausgeschlossener ist ein rechtliches Risiko.
 *
 * Nach der Klärung nur diesen einen Wert ändern.
 */
export type MeterwareWiderrufVariante = "gilt" | "ausgeschlossen";

// Die Schreibweise mit `as` ist Absicht: Ohne sie verengt TypeScript den Wert auf
// das Literal "gilt" und hält jeden Vergleich mit der anderen Variante für einen
// Fehler. Beim Umstellen also nur den Wert links vom `as` ändern.
export const meterwareWiderruf = "gilt" as MeterwareWiderrufVariante;

export const meterwareIstVomWiderrufAusgeschlossen = (): boolean =>
  meterwareWiderruf === "ausgeschlossen";

/** Kurzhinweis auf Produktkarte und im Warenkorb – nur nötig, wenn ausgeschlossen. */
export const MeterwareWiderrufHinweis = {
  kurz: "Zuschnitt nach Maß – vom Widerruf ausgenommen",
  lang: "Stoffe, die wir auf Ihre Wunschlänge zuschneiden, fertigen wir eigens für Sie an. Ein Widerruf ist für diese Artikel ausgeschlossen.",
} as const;
