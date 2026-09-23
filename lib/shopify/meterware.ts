/**
 * Shopifys Warenkorb-Menge akzeptiert nur ganze Zahlen. Für Meterware wird
 * daher eine Schrittweite (z. B. 0,5 m) als eine "Einheit" in Shopify
 * hinterlegt (Preis pro Schritt, Metafeld custom.step_meters = 0.5) und im
 * Frontend als Meterzahl dargestellt. Details: docs/shopify-setup.md.
 */

export function metersToShopifyQuantity(meters: number, stepMeters: number): number {
  return Math.max(1, Math.round(meters / stepMeters));
}

export function shopifyQuantityToMeters(quantity: number, stepMeters: number): number {
  return Math.round(quantity * stepMeters * 100) / 100;
}
