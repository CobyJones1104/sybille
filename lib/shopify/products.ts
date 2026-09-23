import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS_QUERY, GET_PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify/queries";
import type { ShopifyProduct, ShopifyVariant } from "@/lib/shopify/types";

interface RawVariantEdge {
  node: ShopifyVariant;
}

interface RawProductNode extends Omit<ShopifyProduct, "variants" | "stepMeters"> {
  variants: { edges: RawVariantEdge[] };
  stepMeters: { value: string } | null;
}

function normalizeProduct(node: RawProductNode): ShopifyProduct {
  const parsedStep = node.stepMeters ? Number.parseFloat(node.stepMeters.value) : NaN;
  return {
    ...node,
    stepMeters: Number.isFinite(parsedStep) ? parsedStep : null,
    variants: node.variants.edges.map((edge) => edge.node),
  };
}

export async function getProducts(first = 24): Promise<ShopifyProduct[]> {
  const data = await shopifyFetch<{ products: { edges: { node: RawProductNode }[] } }>({
    query: GET_PRODUCTS_QUERY,
    variables: { first },
    cache: "no-store", // Bestand/Preise sollen bei jedem Aufruf aktuell sein
  });

  return data.products.edges.map((edge) => normalizeProduct(edge.node));
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{ product: RawProductNode | null }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    cache: "no-store",
  });

  return data.product ? normalizeProduct(data.product) : null;
}
