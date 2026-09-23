import { NextRequest, NextResponse } from "next/server";
import { isShopifyConfigured } from "@/lib/shopify/client";
import { createCart, getCart, addCartLines, updateCartLines, removeCartLines } from "@/lib/shopify/cart";

function notConfigured() {
  return NextResponse.json(
    { ok: false, error: "shopify_not_configured" },
    { status: 503 }
  );
}

export async function GET(request: NextRequest) {
  if (!isShopifyConfigured()) return notConfigured();

  const cartId = request.nextUrl.searchParams.get("cartId");
  if (!cartId) return NextResponse.json({ ok: false, error: "missing_cart_id" }, { status: 400 });

  try {
    const cart = await getCart(cartId);
    if (!cart) return NextResponse.json({ ok: false, error: "cart_not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, cart });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 502 });
  }
}

export async function POST(request: NextRequest) {
  if (!isShopifyConfigured()) return notConfigured();

  const body = await request.json().catch(() => null);
  const cartId = typeof body?.cartId === "string" ? body.cartId : undefined;
  const merchandiseId = body?.merchandiseId;
  const quantity = body?.quantity;

  if (typeof merchandiseId !== "string" || typeof quantity !== "number" || quantity < 1) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  try {
    const cart = cartId
      ? await addCartLines(cartId, [{ merchandiseId, quantity }])
      : await createCart([{ merchandiseId, quantity }]);
    return NextResponse.json({ ok: true, cart });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 502 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isShopifyConfigured()) return notConfigured();

  const body = await request.json().catch(() => null);
  const { cartId, lineId, quantity } = body ?? {};

  if (typeof cartId !== "string" || typeof lineId !== "string" || typeof quantity !== "number" || quantity < 1) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  try {
    const cart = await updateCartLines(cartId, [{ id: lineId, quantity }]);
    return NextResponse.json({ ok: true, cart });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 502 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isShopifyConfigured()) return notConfigured();

  const body = await request.json().catch(() => null);
  const { cartId, lineId } = body ?? {};

  if (typeof cartId !== "string" || typeof lineId !== "string") {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 400 });
  }

  try {
    const cart = await removeCartLines(cartId, [lineId]);
    return NextResponse.json({ ok: true, cart });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 502 });
  }
}
