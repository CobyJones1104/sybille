import { ImageOff } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { QuantityStepper } from "@/components/shop/quantity-stepper";
import type { SampleProduct } from "@/lib/sample-products";

const unitLabel: Record<SampleProduct["unit"], string> = {
  Meter: "/ Meter",
  Stück: "/ Stück",
  Set: "/ Set",
};

export function ProductCard({ product, delay = 0 }: { product: SampleProduct; delay?: number }) {
  return (
    <Reveal delay={delay} className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]">
      <div className="flex aspect-[4/3] items-center justify-center bg-[var(--color-muted)] text-[var(--color-muted-foreground)]">
        <ImageOff className="h-8 w-8" strokeWidth={1.5} aria-hidden="true" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-primary)]">
          {product.category}
        </p>
        <h3 className="font-semibold leading-snug">{product.name}</h3>
        <p className="line-clamp-2 text-sm text-[var(--color-muted-foreground)]">{product.description}</p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <p className="font-semibold">
            {product.price.toFixed(2).replace(".", ",")} €{" "}
            <span className="text-xs font-normal text-[var(--color-muted-foreground)]">{unitLabel[product.unit]}</span>
          </p>
        </div>
        <QuantityStepper min={product.minQuantity} step={product.stepQuantity} unit={product.unit} />
        <button
          type="button"
          disabled
          title="Bestellsystem folgt in der nächsten Ausbaustufe"
          className="mt-1 w-full cursor-not-allowed rounded-full border border-[var(--color-border)] px-4 py-2 text-sm font-medium text-[var(--color-muted-foreground)]"
        >
          In den Warenkorb (folgt)
        </button>
      </div>
    </Reveal>
  );
}
