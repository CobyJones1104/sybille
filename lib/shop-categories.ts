// Kategorien des Shops inkl. Bildern (eigene SVG-Grafiken, siehe scripts/generate-shop-images.js).
// `match` bestimmt, welche Produkte beim Filtern zur Kategorie gehören.

export interface ShopCategory {
  name: string;
  image: string;
  match: string;
}

export const shopCategories: ShopCategory[] = [
  { name: "Stoffe", image: "/images/shop/kategorie-stoffe.svg", match: "Stoffe" },
  { name: "Wolle & Garne", image: "/images/shop/kategorie-wolle-garne.svg", match: "Wolle" },
  { name: "Kurzwaren", image: "/images/shop/kategorie-kurzwaren.svg", match: "Kurzwaren" },
  { name: "Reißverschlüsse", image: "/images/shop/kategorie-reissverschluesse.svg", match: "Reißverschl" },
  { name: "Nähzubehör", image: "/images/shop/kategorie-naehzubehoer.svg", match: "Nähzubehör" },
  { name: "Schnittmuster", image: "/images/shop/kategorie-schnittmuster.svg", match: "Schnittmuster" },
];
