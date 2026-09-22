// Fiktive Beispielprodukte, transkribiert aus docs/produkte-vorlage.csv.
// Dient nur als Vorschau für den Shop-Aufbau – kein echter Bestand, keine echten Bestellungen.

export type Unit = "Meter" | "Stück" | "Set";

export interface SampleProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  unit: Unit;
  minQuantity: number;
  stepQuantity: number;
  stock: number;
  description: string;
  material: string;
  width: string;
  care: string;
}

export const sampleProducts: SampleProduct[] = [
  {
    id: "baumwollstoff-blumenwiese-blau",
    name: "Baumwollstoff Blumenwiese blau",
    category: "Stoffe",
    price: 9.9,
    unit: "Meter",
    minQuantity: 0.5,
    stepQuantity: 0.5,
    stock: 25,
    description: "Leichter Baumwollstoff mit zartem Blumenmuster auf blauem Grund, ideal für Kleider und Blusen.",
    material: "100% Baumwolle",
    width: "140 cm",
    care: "waschbar bis 40°C",
  },
  {
    id: "jersey-uni-anthrazit",
    name: "Jersey Uni anthrazit",
    category: "Stoffe",
    price: 12.5,
    unit: "Meter",
    minQuantity: 0.5,
    stepQuantity: 0.5,
    stock: 18,
    description: "Dehnbarer Jersey in dezentem Anthrazit, perfekt für T-Shirts und Loungewear.",
    material: "95% Baumwolle, 5% Elasthan",
    width: "155 cm",
    care: "waschbar bis 30°C",
  },
  {
    id: "walkstoff-tannengruen",
    name: "Walkstoff Tannengrün",
    category: "Stoffe",
    price: 24.9,
    unit: "Meter",
    minQuantity: 0.5,
    stepQuantity: 0.5,
    stock: 10,
    description: "Warmer Walkstoff aus reiner Schurwolle, ideal für Jacken und Mäntel.",
    material: "100% Schurwolle",
    width: "150 cm",
    care: "nur Trockenreinigung",
  },
  {
    id: "dekostoff-streifen-natur",
    name: "Dekostoff Streifen natur",
    category: "Stoffe",
    price: 14.9,
    unit: "Meter",
    minQuantity: 1,
    stepQuantity: 0.5,
    stock: 15,
    description: "Robuster Dekostoff mit dezentem Streifenmuster in Naturtönen, für Kissen und Vorhänge.",
    material: "55% Baumwolle, 45% Polyester",
    width: "280 cm",
    care: "waschbar bis 30°C",
  },
  {
    id: "sockenwolle-bunt-melange",
    name: "Sockenwolle Bunt Melange",
    category: "Wolle & Garne",
    price: 5.9,
    unit: "Stück",
    minQuantity: 1,
    stepQuantity: 1,
    stock: 40,
    description: "4-fädige Sockenwolle mit Farbverlauf, ergibt ca. 2 Paar Socken pro Knäuel (100 g).",
    material: "75% Schurwolle, 25% Polyamid",
    width: "–",
    care: "handwäschebar",
  },
  {
    id: "babywolle-weiss-weich",
    name: "Babywolle Weiß weich",
    category: "Wolle & Garne",
    price: 4.5,
    unit: "Stück",
    minQuantity: 1,
    stepQuantity: 1,
    stock: 30,
    description: "Kuschelweiches Babygarn für Mützchen, Decken und Erstlingsjäckchen.",
    material: "100% Merinowolle (mulesing-frei)",
    width: "–",
    care: "waschbar bis 30°C Feinwäsche",
  },
  {
    id: "perlmuttknoepfe-15mm-set",
    name: "Perlmuttknöpfe 15 mm, 6er-Set",
    category: "Kurzwaren",
    price: 3.2,
    unit: "Set",
    minQuantity: 1,
    stepQuantity: 1,
    stock: 60,
    description: "Klassische Perlmuttknöpfe mit 4 Löchern, 6 Stück pro Set, ideal für Blusen und Hemden.",
    material: "Perlmutt",
    width: "15 mm Durchmesser",
    care: "–",
  },
  {
    id: "baumwollband-karo-rot",
    name: "Baumwollband Karo rot, 3 m",
    category: "Kurzwaren",
    price: 2.9,
    unit: "Stück",
    minQuantity: 1,
    stepQuantity: 1,
    stock: 45,
    description: "Dekoratives Baumwollband mit Karomuster, 3 Meter Rolle, ideal zum Verzieren und Verpacken.",
    material: "100% Baumwolle",
    width: "2,5 cm",
    care: "waschbar bis 40°C",
  },
  {
    id: "reissverschluss-teilbar-60cm-schwarz",
    name: "Reißverschluss teilbar 60 cm schwarz",
    category: "Reißverschlüsse",
    price: 4.2,
    unit: "Stück",
    minQuantity: 1,
    stepQuantity: 1,
    stock: 35,
    description: "Robuster teilbarer Reißverschluss für Jacken, 60 cm Länge, schwarz.",
    material: "Kunststoff-Spirale",
    width: "60 cm Länge",
    care: "–",
  },
  {
    id: "schneiderschere-profi-25cm",
    name: "Schneiderschere Profi 25 cm",
    category: "Nähzubehör",
    price: 18.9,
    unit: "Stück",
    minQuantity: 1,
    stepQuantity: 1,
    stock: 12,
    description: "Scharfe Schneiderschere aus rostfreiem Stahl für präzise Stoffschnitte.",
    material: "rostfreier Stahl",
    width: "25 cm Länge",
    care: "trocken lagern",
  },
];
