"use client";

import { useState } from "react";
import { Map as MapIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/lib/business-info";

/**
 * Zwei-Klick-Lösung für die Karte (website-dsgvo): Es wird erst nach
 * aktivem Klick ein externer Kartendienst geladen (hier OpenStreetMap,
 * ohne API-Key und ohne Tracking-Cookies) – vorher kein Drittanbieter-Request.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const query = encodeURIComponent(`${businessInfo.street}, ${businessInfo.postalCode} ${businessInfo.city}`);

  if (loaded) {
    return (
      <iframe
        title="Karte: Sybille's Nähparadies in Bad Kissingen"
        className="h-80 w-full rounded-2xl border border-[var(--color-border)]"
        src={`https://www.openstreetmap.org/export/embed.html?search=${query}&layer=mapnik`}
        loading="lazy"
      />
    );
  }

  return (
    <div className="flex h-80 w-full flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-muted)] text-center">
      <MapIcon className="h-8 w-8 text-[var(--color-muted-foreground)]" strokeWidth={1.5} aria-hidden="true" />
      <p className="max-w-xs text-sm text-[var(--color-muted-foreground)]">
        Beim Laden der Karte wird eine Verbindung zu OpenStreetMap hergestellt.
      </p>
      <Button variant="secondary" onClick={() => setLoaded(true)}>
        Karte laden
      </Button>
    </div>
  );
}
