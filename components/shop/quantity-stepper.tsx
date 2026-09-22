"use client";

import { Minus, Plus } from "lucide-react";
import type { DisplayProduct } from "@/lib/product-display";

interface QuantityStepperProps {
  value: number;
  min: number;
  step: number;
  unit: DisplayProduct["unit"];
  onChange: (next: number) => void;
}

const unitSuffix: Record<DisplayProduct["unit"], string> = {
  Meter: "m",
  Stück: "×",
  Set: "×",
};

export function QuantityStepper({ value, min, step, unit, onChange }: QuantityStepperProps) {
  const decimals = step < 1 ? 1 : 0;
  const format = (n: number) => n.toFixed(decimals).replace(".", ",");

  return (
    <div
      className="inline-flex items-center rounded-full border border-[var(--color-border)]"
      role="group"
      aria-label="Menge"
    >
      <button
        type="button"
        aria-label="Menge verringern"
        onClick={() => onChange(Math.max(min, Math.round((value - step) * 100) / 100))}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="min-w-14 text-center text-sm font-medium tabular-nums">
        {format(value)} {unitSuffix[unit]}
      </span>
      <button
        type="button"
        aria-label="Menge erhöhen"
        onClick={() => onChange(Math.round((value + step) * 100) / 100)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
