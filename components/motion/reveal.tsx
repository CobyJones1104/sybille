"use client";

import { motion } from "motion/react";
import { motionTokens, springs } from "@/lib/motion-tokens";
import { useSafeMotion } from "@/hooks/use-reduced-motion";
import { useMounted } from "@/hooks/use-mounted";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
}

/**
 * Scroll-Reveal-Wrapper: Kinder erscheinen beim Eintritt in den Viewport.
 * Für gestaffelte Gruppen: delay in Schritten von ~0.06s vergeben.
 */
export function Reveal({ children, delay = 0, className, distance = motionTokens.distance.md }: RevealProps) {
  const mounted = useMounted();
  const safeMotion = useSafeMotion(distance);

  if (!mounted) {
    // SSR-sicher: initial-Zustand entspricht dem Server-Output (unsichtbar via CSS statt Layout-Shift)
    return (
      <div className={className} style={{ opacity: 0 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={safeMotion.initial}
      whileInView={safeMotion.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springs.gentle, delay }}
    >
      {children}
    </motion.div>
  );
}
