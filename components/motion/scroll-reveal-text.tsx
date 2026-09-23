"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

/**
 * Fließtext, dessen Zeichen beim Scrollen nacheinander von blass auf voll
 * sichtbar wechseln. Die Zeichen sind wortweise gruppiert, damit der Umbruch
 * zwischen Wörtern passiert und nicht mitten im Wort.
 * Bei prefers-reduced-motion steht der Text sofort voll da.
 */
export function ScrollRevealText({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const mounted = useMounted();
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  const totalCharacters = text.length;
  const animate = mounted && !reduce;

  // Wörter mit dem globalen Startindex ihres ersten Zeichens (+1 für das Leerzeichen).
  const words = text.split(" ").reduce<{ word: string; offset: number }[]>((acc, word) => {
    const previous = acc[acc.length - 1];
    const offset = previous ? previous.offset + previous.word.length + 1 : 0;
    acc.push({ word, offset });
    return acc;
  }, []);

  return (
    <p ref={containerRef} className={cn("flex flex-wrap gap-x-[0.25em]", className)}>
      {words.map(({ word, offset }, wordIndex) => (
        <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
          {Array.from(word).map((char, i) => (
            <Character
              key={i}
              char={char}
              progress={scrollYProgress}
              start={(offset + i) / totalCharacters}
              animate={animate}
            />
          ))}
        </span>
      ))}
    </p>
  );
}

function Character({
  char,
  progress,
  start,
  animate,
}: {
  char: string;
  progress: MotionValue<number>;
  start: number;
  animate: boolean;
}) {
  const opacity = useTransform(progress, [start - 0.1, start + 0.05], [0.2, 1]);

  return (
    <motion.span style={animate ? { opacity } : undefined} className="inline-block">
      {char}
    </motion.span>
  );
}
