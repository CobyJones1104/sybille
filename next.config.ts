import type { NextConfig } from "next";

// Für die statische Vorschau (siehe scripts/build-vorschau.js) wird die Seite
// ohne Server exportiert. Im normalen Betrieb bleibt alles wie gehabt.
const istVorschau = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Verhindert, dass Next.js eigene Hinweise in unsere CLAUDE.md schreibt –
  // die Projektregeln dort werden ausschließlich manuell gepflegt.
  agentRules: false,
  ...(istVorschau
    ? {
        output: "export" as const,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
