import { Truck, Store, MessageCircleHeart, Award } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";

const items = [
  {
    icon: Truck,
    title: "Versand in ganz Deutschland",
    text: "Zuverlässig verpackt, schnell unterwegs.",
  },
  {
    icon: Store,
    title: "Kostenlose Abholung im Laden",
    text: "Online bestellen, in der Spargasse abholen.",
  },
  {
    icon: MessageCircleHeart,
    title: "Persönliche Beratung",
    text: "Vor Ort und gerne auch online.",
  },
  {
    icon: Award,
    title: "Fachgeschäft mit Erfahrung",
    text: "Qualität, die man in der Hand spürt.",
  },
];

export function TrustBar() {
  return (
    <section className="border-y border-[var(--color-border)] bg-[var(--color-background-alt)]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="text-center">
            <item.icon
              className="mx-auto mb-3 h-7 w-7 text-[var(--color-primary)]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <p className="text-sm font-semibold">{item.title}</p>
            <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
