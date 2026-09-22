import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "AGB – Sybille's Nähparadies" };

export default function AgbPage() {
  return <ComingSoon title="AGB" />;
}
