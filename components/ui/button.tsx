"use client";

import { forwardRef } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-mounted";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-[0_8px_24px_rgba(54,42,34,0.16)]",
  secondary:
    "bg-transparent text-[var(--color-foreground)] border border-[var(--color-border)]",
  ghost: "bg-[var(--color-muted)] text-[var(--color-foreground)]",
};

/**
 * Pill-Button im Stil der Layout-Referenz (docs/layout/02-...jpg):
 * voll abgerundet, Hover hebt den Button sanft an und hellt die Fläche auf.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    // Gesture-Props (whileHover/whileTap) erst nach dem Mount aktivieren:
    // useReducedMotion() liefert serverseitig/beim ersten Client-Render `null`,
    // motion/react verdrahtet Gesten serverseitig anders als clientseitig –
    // ohne dieses Gate entsteht ein Hydration-Mismatch (siehe motion-foundations).
    const mounted = useMounted();
    const reduce = useReducedMotion();
    const enableMotion = mounted && !reduce;

    return (
      <motion.button
        ref={ref}
        className={cn(
          "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring)] focus-visible:ring-offset-2",
          variantClasses[variant],
          className
        )}
        whileHover={
          !enableMotion
            ? undefined
            : variant === "primary"
              ? {
                  y: -2,
                  backgroundColor: "var(--color-primary-hover)",
                  boxShadow: "0 14px 32px rgba(54,42,34,0.24)",
                }
              : { y: -2, backgroundColor: "var(--color-muted)" }
        }
        whileTap={enableMotion ? { scale: motionTokens.scale.press } : undefined}
        transition={springs.snappy}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
