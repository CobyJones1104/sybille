"use client";

import { motion, useReducedMotion } from "motion/react";
import { motionTokens } from "@/lib/motion-tokens";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const STAGGER = 0.08;

interface WordsPullUpProps {
  text: string;
  className?: string;
  /** Hochgestelltes Sternchen hinter dem letzten Wort (rein dekorativ). */
  showAsterisk?: boolean;
}

/** Überschrift, deren Wörter nacheinander von unten einschweben. */
export function WordsPullUp({ text, className, showAsterisk = false }: WordsPullUpProps) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;
  const words = text.split(" ");

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: animate ? motionTokens.distance.lg : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: motionTokens.duration.slow, delay: i * STAGGER, ease: EASE }}
          className="relative inline-block whitespace-nowrap"
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span aria-hidden="true" className="absolute -right-[0.3em] top-[0.05em] text-[0.31em]">
              *
            </span>
          )}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </span>
  );
}

export interface PullUpSegment {
  text: string;
  className?: string;
}

/**
 * Wie WordsPullUp, aber mit mehreren Textabschnitten in unterschiedlichem Stil
 * (z. B. ein kursiver Akzent-Abschnitt in Instrument Serif).
 */
export function WordsPullUpMultiStyle({
  segments,
  className,
}: {
  segments: PullUpSegment[];
  className?: string;
}) {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  const animate = mounted && !reduce;

  const words = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({ word, className: segment.className }))
  );

  return (
    <span className={cn("inline-flex flex-wrap justify-center gap-x-[0.25em]", className)}>
      {words.map((entry, i) => (
        <motion.span
          key={`${entry.word}-${i}`}
          initial={{ opacity: 0, y: animate ? motionTokens.distance.lg : 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: motionTokens.duration.slow, delay: i * STAGGER, ease: EASE }}
          className={cn("inline-block", entry.className)}
        >
          {entry.word}
        </motion.span>
      ))}
    </span>
  );
}
