export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyMoney;
  selectedOptions: { name: string; value: string }[];
}

export interface ShopifyProduct {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  productType: string;
  tags: string[];
  featuredImage: ShopifyImage | null;
  priceRange: { minVariantPrice: ShopifyMoney };
  /**
   * Schrittweite für Meterware in Metern (z. B. 0.5), gepflegt als Shopify-
   * Metafeld custom.step_meters. `null` = Verkauf in ganzen Stück/Sets, da
   * Shopifys Warenkorb-Menge nur ganze Zahlen erlaubt (siehe
   * docs/shopify-setup.md, Abschnitt Meterware).
   */
  stepMeters: number | null;
  variants: ShopifyVariant[];
}

export interface ShopifyCartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string };
    price: ShopifyMoney;
  };
  cost: { totalAmount: ShopifyMoney };
}

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: ShopifyMoney;
    subtotalAmount: ShopifyMoney;
  };
  lines: ShopifyCartLine[];
}
