import { Truck, Store, Scissors, MessageCircleHeart } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const items = [
  { icon: Truck, title: "Versand in ganz Deutschland", text: "Sorgfältig verpackt" },
  { icon: Store, title: "Kostenlose Abholung", text: "Click & Collect in der Spargasse" },
  { icon: Scissors, title: "Zuschnitt in 0,5-m-Schritten", text: "Genau Ihre Menge" },
  { icon: MessageCircleHeart, title: "Persönliche Beratung", text: "Im Laden und per Nachricht" },
];

export function ShopTrustBar() {
  return (
    <section className="px-3 pb-10 sm:px-4 md:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--color-border)] sm:grid-cols-4 md:rounded-[2rem]">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.06}
            className="flex items-start gap-3 bg-[var(--color-background-alt)] px-5 py-7"
          >
            <item.icon
              className="mt-0.5 h-5 w-5 shrink-0 text-[var(--color-primary)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <div>
              <p className="text-sm font-bold leading-snug">{item.title}</p>
              <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{item.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
