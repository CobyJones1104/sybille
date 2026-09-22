"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Unit } from "@/lib/sample-products";

interface QuantityStepperProps {
  min: number;
  step: number;
  unit: Unit;
}

const unitSuffix: Record<Unit, string> = {
  Meter: "m",
  Stück: "×",
  Set: "×",
};

export function QuantityStepper({ min, step, unit }: QuantityStepperProps) {
  const [value, setValue] = useState(min);

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
        onClick={() => setValue((v) => Math.max(min, Math.round((v - step) * 100) / 100))}
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
        onClick={() => setValue((v) => Math.round((v + step) * 100) / 100)}
        className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)]"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
