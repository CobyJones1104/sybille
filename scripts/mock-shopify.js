/**
 * Simulator der Shopify Storefront API für lokale Tests.
 *
 * Damit lässt sich die komplette Anbindung (Produkte laden, Warenkorb anlegen,
 * Menge ändern, entfernen, Kasse-Link) durchspielen, ohne einen echten – und
 * kostenpflichtigen – Shopify-Store zu brauchen.
 *
 *   node scripts/mock-shopify.js            # startet auf Port 4000
 *
 * Dann in .env.local eintragen:
 *   SHOPIFY_STORE_DOMAIN=http://localhost:4000
 *   SHOPIFY_STOREFRONT_ACCESS_TOKEN=test-token
 *
 * Achtung: Das ist ausdrücklich KEIN Ersatz für einen Test mit dem echten
 * Store. Es prüft nur, ob unser Code die erwarteten Antwortformen korrekt
 * verarbeitet.
 */
const http = require("http");

const PORT = Number(process.env.MOCK_PORT || 4000);
const CURRENCY = "EUR";

const money = (amount) => ({ amount: amount.toFixed(2), currencyCode: CURRENCY });

// Zwei Meterware-Artikel (mit Schrittweiten-Metafeld) und zwei Stückartikel
const products = [
  {
    id: "gid://shopify/Product/1",
    handle: "baumwollstoff-blumenwiese-blau",
    title: "Baumwollstoff Blumenwiese blau",
    descriptionHtml: "<p>Leichter Baumwollstoff mit zartem Blumenmuster.</p>",
    productType: "Stoffe",
    tags: ["Baumwolle"],
    featuredImage: null,
    priceRange: { minVariantPrice: money(4.95) },
    stepMeters: { value: "0.5" },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/11",
            title: "0,5 m",
            availableForSale: true,
            quantityAvailable: 50,
            price: money(4.95),
            selectedOptions: [{ name: "Zuschnitt", value: "0,5 m" }],
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/2",
    handle: "walkstoff-tannengruen",
    title: "Walkstoff Tannengrün",
    descriptionHtml: "<p>Warmer Walkstoff aus reiner Schurwolle.</p>",
    productType: "Stoffe",
    tags: [],
    featuredImage: null,
    priceRange: { minVariantPrice: money(12.45) },
    stepMeters: { value: "0.5" },
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/21",
            title: "0,5 m",
            availableForSale: true,
            quantityAvailable: 20,
            price: money(12.45),
            selectedOptions: [{ name: "Zuschnitt", value: "0,5 m" }],
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/3",
    handle: "sockenwolle-bunt-melange",
    title: "Sockenwolle Bunt Melange",
    descriptionHtml: "<p>4-fädige Sockenwolle mit Farbverlauf.</p>",
    productType: "Wolle & Garne",
    tags: [],
    featuredImage: null,
    priceRange: { minVariantPrice: money(5.9) },
    stepMeters: null,
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/31",
            title: "Default Title",
            availableForSale: true,
            quantityAvailable: 40,
            price: money(5.9),
            selectedOptions: [],
          },
        },
      ],
    },
  },
  {
    id: "gid://shopify/Product/4",
    handle: "schneiderschere-profi-25cm",
    title: "Schneiderschere Profi 25 cm",
    descriptionHtml: "<p>Scharfe Schneiderschere aus rostfreiem Stahl.</p>",
    productType: "Nähzubehör",
    tags: [],
    featuredImage: null,
    priceRange: { minVariantPrice: money(18.9) },
    stepMeters: null,
    variants: {
      edges: [
        {
          node: {
            id: "gid://shopify/ProductVariant/41",
            title: "Default Title",
            availableForSale: true,
            quantityAvailable: 12,
            price: money(18.9),
            selectedOptions: [],
          },
        },
      ],
    },
  },
];

const variantById = new Map();
for (const product of products) {
  for (const edge of product.variants.edges) {
    variantById.set(edge.node.id, { variant: edge.node, product });
  }
}

/** @type {Map<string, {id: string, lines: Array<{id: string, merchandiseId: string, quantity: number}>}>} */
const carts = new Map();
let cartCounter = 0;
let lineCounter = 0;

function serializeCart(cart) {
  const lines = cart.lines.map((line) => {
    const entry = variantById.get(line.merchandiseId);
    const unitPrice = Number.parseFloat(entry.variant.price.amount);
    return {
      node: {
        id: line.id,
        quantity: line.quantity,
        merchandise: {
          id: entry.variant.id,
          title: entry.variant.title,
          price: entry.variant.price,
          product: {
            title: entry.product.title,
            handle: entry.product.handle,
            stepMeters: entry.product.stepMeters,
          },
        },
        cost: { totalAmount: money(unitPrice * line.quantity) },
      },
    };
  });

  const subtotal = cart.lines.reduce((sum, line) => {
    const entry = variantById.get(line.merchandiseId);
    return sum + Number.parseFloat(entry.variant.price.amount) * line.quantity;
  }, 0);

  return {
    id: cart.id,
    checkoutUrl: `http://localhost:${PORT}/checkout/${encodeURIComponent(cart.id)}`,
    totalQuantity: cart.lines.reduce((sum, line) => sum + line.quantity, 0),
    cost: { totalAmount: money(subtotal), subtotalAmount: money(subtotal) },
    lines: { edges: lines },
  };
}

function handleOperation(query, variables) {
  if (query.includes("query GetProducts")) {
    const first = variables.first ?? 24;
    return { products: { edges: products.slice(0, first).map((node) => ({ node })) } };
  }

  if (query.includes("query GetProductByHandle")) {
    const product = products.find((p) => p.handle === variables.handle) ?? null;
    return { product };
  }

  if (query.includes("mutation CartCreate")) {
    const cart = { id: `gid://shopify/Cart/${++cartCounter}`, lines: [] };
    for (const line of variables.lines ?? []) {
      if (!variantById.has(line.merchandiseId)) {
        return { cartCreate: { cart: null, userErrors: [{ message: "Variante unbekannt" }] } };
      }
      cart.lines.push({ id: `gid://shopify/CartLine/${++lineCounter}`, ...line });
    }
    carts.set(cart.id, cart);
    return { cartCreate: { cart: serializeCart(cart), userErrors: [] } };
  }

  if (query.includes("query GetCart")) {
    const cart = carts.get(variables.cartId);
    return { cart: cart ? serializeCart(cart) : null };
  }

  if (query.includes("mutation CartLinesAdd")) {
    const cart = carts.get(variables.cartId);
    if (!cart) return { cartLinesAdd: { cart: null, userErrors: [{ message: "Warenkorb unbekannt" }] } };
    for (const line of variables.lines ?? []) {
      const existing = cart.lines.find((l) => l.merchandiseId === line.merchandiseId);
      if (existing) existing.quantity += line.quantity;
      else cart.lines.push({ id: `gid://shopify/CartLine/${++lineCounter}`, ...line });
    }
    return { cartLinesAdd: { cart: serializeCart(cart), userErrors: [] } };
  }

  if (query.includes("mutation CartLinesUpdate")) {
    const cart = carts.get(variables.cartId);
    if (!cart) return { cartLinesUpdate: { cart: null, userErrors: [{ message: "Warenkorb unbekannt" }] } };
    for (const update of variables.lines ?? []) {
      const line = cart.lines.find((l) => l.id === update.id);
      if (line) line.quantity = update.quantity;
    }
    return { cartLinesUpdate: { cart: serializeCart(cart), userErrors: [] } };
  }

  if (query.includes("mutation CartLinesRemove")) {
    const cart = carts.get(variables.cartId);
    if (!cart) return { cartLinesRemove: { cart: null, userErrors: [{ message: "Warenkorb unbekannt" }] } };
    cart.lines = cart.lines.filter((line) => !(variables.lineIds ?? []).includes(line.id));
    return { cartLinesRemove: { cart: serializeCart(cart), userErrors: [] } };
  }

  return null;
}

const server = http.createServer((req, res) => {
  if (req.method !== "POST") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Shopify-Simulator laeuft. GraphQL unter POST /api/<version>/graphql.json");
    return;
  }

  // Der echte Endpunkt verlangt diesen Header – hier genauso geprüft,
  // damit ein fehlender Token auch im Test auffällt.
  if (!req.headers["x-shopify-storefront-access-token"]) {
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ errors: [{ message: "Kein Storefront-Token gesendet" }] }));
    return;
  }

  let body = "";
  req.on("data", (chunk) => (body += chunk));
  req.on("end", () => {
    let parsed;
    try {
      parsed = JSON.parse(body);
    } catch {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ errors: [{ message: "Ungültiges JSON" }] }));
      return;
    }

    const data = handleOperation(parsed.query ?? "", parsed.variables ?? {});
    res.writeHead(200, { "Content-Type": "application/json" });
    if (!data) {
      res.end(JSON.stringify({ errors: [{ message: "Unbekannte Operation" }] }));
      return;
    }
    res.end(JSON.stringify({ data }));
  });
});

server.listen(PORT, () => {
  console.log(`Shopify-Simulator laeuft auf http://localhost:${PORT}`);
});
