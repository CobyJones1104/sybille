// Headless-Anbindung an die Shopify Storefront API (GraphQL).
// Aktiv erst, wenn SHOPIFY_STORE_DOMAIN und SHOPIFY_STOREFRONT_ACCESS_TOKEN
// gesetzt sind (siehe .env.example und docs/shopify-setup.md). Ohne diese
// Werte bleibt der Shop im Vorschau-/Demo-Modus mit lib/sample-products.ts.

const API_VERSION = "2025-01";

interface ShopifyConfig {
  domain: string;
  token: string;
}

function getConfig(): ShopifyConfig | null {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !token) return null;
  return { domain, token };
}

export function isShopifyConfigured(): boolean {
  return getConfig() !== null;
}

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, unknown>;
  cache?: RequestCache;
}

interface GraphQLError {
  message: string;
}

export async function shopifyFetch<T>({ query, variables, cache = "force-cache" }: ShopifyFetchOptions): Promise<T> {
  const config = getConfig();
  if (!config) {
    throw new Error(
      "Shopify ist nicht konfiguriert: SHOPIFY_STORE_DOMAIN und SHOPIFY_STOREFRONT_ACCESS_TOKEN fehlen. Siehe docs/shopify-setup.md."
    );
  }

  const response = await fetch(`https://${config.domain}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.token,
    },
    body: JSON.stringify({ query, variables }),
    cache,
  });

  if (!response.ok) {
    throw new Error(`Shopify Storefront API antwortete mit Status ${response.status}`);
  }

  const json = (await response.json()) as { data?: T; errors?: GraphQLError[] };

  if (json.errors?.length) {
    throw new Error(`Shopify GraphQL Fehler: ${json.errors.map((e) => e.message).join("; ")}`);
  }

  if (!json.data) {
    throw new Error("Shopify Storefront API lieferte keine Daten zurück.");
  }

  return json.data;
}
