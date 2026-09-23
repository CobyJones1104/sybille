"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMounted } from "@/hooks/use-mounted";

interface Ribbon {
  d: string;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  originX: string;
}

// Handgezeichnete, wellenförmige Stoffbahnen (kein Foto, reine Formsprache in Markenfarben).
const ribbons: Ribbon[] = [
  {
    d: "M -100 180 C 120 80, 260 260, 480 140 C 640 60, 760 200, 900 120 L 900 620 L -100 620 Z",
    color: "var(--color-primary)",
    opacity: 0.35,
    duration: 9,
    delay: 0,
    originX: "20%",
  },
  {
    d: "M -100 260 C 100 340, 300 160, 520 260 C 700 340, 820 200, 900 260 L 900 620 L -100 620 Z",
    color: "var(--color-secondary)",
    opacity: 0.22,
    duration: 11,
    delay: 0.6,
    originX: "60%",
  },
  {
    d: "M -100 60 C 140 160, 320 20, 540 100 C 700 160, 780 40, 900 90 L 900 0 L -100 0 Z",
    color: "var(--color-background-alt)",
    opacity: 0.5,
    duration: 13,
    delay: 1.1,
    originX: "40%",
  },
];

/**
 * Endlos-Loop wehender Stoffbahnen im Header-Hintergrund.
 * Nur transform (rotate/translateX/scaleY) wird animiert, nichts am Layout.
 * Bei prefers-reduced-motion: statisches Bild, keine Bewegung.
 */
export function FabricLoop({ className }: { className?: string }) {
  const mounted = useMounted();
  const reduce = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {ribbons.map((ribbon, i) => {
        const animated = mounted && !reduce;
        return (
          <motion.path
            key={i}
            d={ribbon.d}
            fill={ribbon.color}
            fillOpacity={ribbon.opacity}
            style={{ transformOrigin: `${ribbon.originX} 50%` }}
            initial={{ rotate: 0, x: 0 }}
            animate={
              animated
                ? {
                    rotate: [0, 1.4, -1, 0],
                    x: [0, 14, -10, 0],
                    scaleY: [1, 1.03, 0.98, 1],
                  }
                : { rotate: 0, x: 0, scaleY: 1 }
            }
            transition={
              animated
                ? {
                    duration: ribbon.duration,
                    delay: ribbon.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                : undefined
            }
          />
        );
      })}
    </svg>
  );
}
