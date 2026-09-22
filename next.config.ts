import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Verhindert, dass Next.js eigene Hinweise in unsere CLAUDE.md schreibt –
  // die Projektregeln dort werden ausschließlich manuell gepflegt.
  agentRules: false,
};

export default nextConfig;
