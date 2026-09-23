import { Truck, Store, Scissors, MessageCircleHeart } from "lucide-react";

const items = [
  { icon: Truck, title: "Versand in ganz Deutschland", text: "Sorgfältig verpackt" },
  { icon: Store, title: "Kostenlose Abholung", text: "Click & Collect in der Spargasse" },
  { icon: Scissors, title: "Zuschnitt in 0,5-m-Schritten", text: "Genau Ihre Menge" },
  { icon: MessageCircleHeart, title: "Persönliche Beratung", text: "Im Laden und per Nachricht" },
];

/** Vertrauensleiste direkt unter dem Shop-Hero, Aufbau nach der Layout-Vorlage. */
export function ShopTrustBar() {
  return (
    <div className="border-b border-[var(--color-border)] bg-[var(--color-background-alt)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <item.icon
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-semibold leading-snug">{item.title}</p>
              <p className="text-xs text-[var(--color-muted-foreground)]">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
