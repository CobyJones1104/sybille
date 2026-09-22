"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { ShopifyCart } from "@/lib/shopify/types";

const CART_ID_STORAGE_KEY = "sybille-cart-id";

interface CartContextValue {
  cart: ShopifyCart | null;
  isLoading: boolean;
  isConfigured: boolean;
  error: string | null;
  addItem: (merchandiseId: string, quantity: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

async function parseResponse(response: Response) {
  const body = await response.json().catch(() => null);
  if (response.status === 503) return { notConfigured: true as const };
  if (!response.ok || !body?.ok) {
    throw new Error(body?.error ?? `Anfrage fehlgeschlagen (${response.status})`);
  }
  return { notConfigured: false as const, cart: body.cart as ShopifyCart };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Beim Laden: vorhandene Warenkorb-ID aus localStorage übernehmen (per-Gerät, kein Tracking).
  useEffect(() => {
    let cartId: string | null = null;
    try {
      cartId = localStorage.getItem(CART_ID_STORAGE_KEY);
    } catch {
      // localStorage evtl. gesperrt (privates Fenster) – dann startet der Warenkorb einfach leer.
    }
    if (!cartId) return;

    // Stille Hintergrund-Hydration des zuvor gespeicherten Warenkorbs – kein
    // Ladezustand nötig, das Warenkorb-Icon füllt sich einfach, sobald fertig.
    fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`)
      .then(parseResponse)
      .then((result) => {
        if (result.notConfigured) {
          setIsConfigured(false);
        } else {
          setCart(result.cart);
        }
      })
      .catch(() => {
        // Warenkorb evtl. abgelaufen – lokal zurücksetzen, kein harter Fehler für die Nutzerin.
        try {
          localStorage.removeItem(CART_ID_STORAGE_KEY);
        } catch {
          // ignorieren
        }
      });
  }, []);

  const persistCart = useCallback((next: ShopifyCart) => {
    setCart(next);
    try {
      localStorage.setItem(CART_ID_STORAGE_KEY, next.id);
    } catch {
      // ignorieren
    }
  }, []);

  const addItem = useCallback(
    async (merchandiseId: string, quantity: number) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/cart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart?.id, merchandiseId, quantity }),
        });
        const result = await parseResponse(response);
        if (result.notConfigured) {
          setIsConfigured(false);
        } else {
          persistCart(result.cart);
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, persistCart]
  );

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/cart", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart.id, lineId, quantity }),
        });
        const result = await parseResponse(response);
        if (!result.notConfigured) persistCart(result.cart);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, persistCart]
  );

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return;
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId: cart.id, lineId }),
        });
        const result = await parseResponse(response);
        if (!result.notConfigured) persistCart(result.cart);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [cart, persistCart]
  );

  return (
    <CartContext.Provider value={{ cart, isLoading, isConfigured, error, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart muss innerhalb von <CartProvider> verwendet werden.");
  return ctx;
}
