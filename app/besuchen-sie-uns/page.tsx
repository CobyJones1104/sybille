import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Besuchen Sie uns – Sybille's Nähparadies" };

export default function BesuchenSieUnsPage() {
  return <ComingSoon title="Besuchen Sie uns" />;
}
