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
    <section className="px-3 pb-12 sm:px-4 md:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[var(--color-border)] sm:grid-cols-4 md:rounded-[2rem]">
        {items.map((item, i) => (
          <Reveal
            key={item.title}
            delay={i * 0.06}
            className="bg-[var(--color-background-alt)] px-5 py-8 text-center sm:px-6"
          >
            <item.icon
              className="mx-auto mb-3 h-6 w-6 text-[var(--color-primary)]"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <p className="text-sm font-bold leading-snug">{item.title}</p>
            <p className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
