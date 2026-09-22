import type { Metadata } from "next";
import { ComingSoon } from "@/components/layout/coming-soon";

export const metadata: Metadata = { title: "Impressum – Sybille's Nähparadies" };

export default function ImpressumPage() {
  return <ComingSoon title="Impressum" />;
}
