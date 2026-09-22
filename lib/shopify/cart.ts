import { shopifyFetch } from "@/lib/shopify/client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  GET_CART_QUERY,
} from "@/lib/shopify/queries";
import type { ShopifyCart, ShopifyCartLine } from "@/lib/shopify/types";

export interface CartLineInput {
  merchandiseId: string;
  quantity: number;
}

interface RawCartLineEdge {
  node: ShopifyCartLine;
}

interface RawCart extends Omit<ShopifyCart, "lines"> {
  lines: { edges: RawCartLineEdge[] };
}

interface CartMutationPayload {
  cart: RawCart | null;
  userErrors: { message: string }[];
}

function normalizeCart(raw: RawCart): ShopifyCart {
  return { ...raw, lines: raw.lines.edges.map((edge) => edge.node) };
}

function assertNoUserErrors(payload: CartMutationPayload) {
  if (payload.userErrors.length > 0) {
    throw new Error(`Warenkorb-Fehler: ${payload.userErrors.map((e) => e.message).join("; ")}`);
  }
  if (!payload.cart) {
    throw new Error("Shopify hat keinen Warenkorb zurückgegeben.");
  }
}

export async function createCart(lines: CartLineInput[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: CartMutationPayload }>({
    query: CART_CREATE_MUTATION,
    variables: { lines },
    cache: "no-store",
  });
  assertNoUserErrors(data.cartCreate);
  return normalizeCart(data.cartCreate.cart as RawCart);
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  const data = await shopifyFetch<{ cart: RawCart | null }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: "no-store",
  });
  return data.cart ? normalizeCart(data.cart) : null;
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: CartMutationPayload }>({
    query: CART_LINES_ADD_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  assertNoUserErrors(data.cartLinesAdd);
  return normalizeCart(data.cartLinesAdd.cart as RawCart);
}

export async function updateCartLines(
  cartId: string,
  lines: { id: string; quantity: number }[]
): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: CartMutationPayload }>({
    query: CART_LINES_UPDATE_MUTATION,
    variables: { cartId, lines },
    cache: "no-store",
  });
  assertNoUserErrors(data.cartLinesUpdate);
  return normalizeCart(data.cartLinesUpdate.cart as RawCart);
}

export async function removeCartLines(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: CartMutationPayload }>({
    query: CART_LINES_REMOVE_MUTATION,
    variables: { cartId, lineIds },
    cache: "no-store",
  });
  assertNoUserErrors(data.cartLinesRemove);
  return normalizeCart(data.cartLinesRemove.cart as RawCart);
}
