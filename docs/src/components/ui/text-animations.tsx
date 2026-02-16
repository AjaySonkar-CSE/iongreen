"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

interface StaggeredTextProps {
  text: string;
  className?: string;
  once?: boolean;
  type?: "word" | "char" | "mask";
  delay?: number;
  duration?: number;
  stagger?: number;
}

export function StaggeredText({
  text,
  className = "",
  once = true,
  type = "char",
  delay = 0,
  duration = 0.5,
  stagger = 0.05,
}: StaggeredTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.5 });

  const words = text.split(" ");
  let globalCharIndex = 0;

  const childVariants: Variants = {
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay + (i * stagger),
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  const maskChildVariants: Variants = {
    visible: (i: number) => ({
      y: 0,
      transition: {
        duration: 0.8,
        delay: delay + (i * stagger),
        ease: [0.16, 1, 0.3, 1],
      },
    }),
    hidden: {
      y: "110%",
    },
  };

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block" }}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block whitespace-nowrap"
          style={{ verticalAlign: "bottom" }}
        >
          {word.split("").map((char, charIndex) => {
            const i = globalCharIndex++;
            return (
              <span
                key={charIndex}
                style={{
                  display: "inline-block",
                  overflow: type === "mask" ? "hidden" : "visible",
                  verticalAlign: "bottom"
                }}
              >
                <motion.span
                  custom={i}
                  variants={type === "mask" ? maskChildVariants : childVariants}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              </span>
            );
          })}
          {/* Add a space character after the word, unless it's the last word */}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.span>
  );
}

interface TypewriterEffectProps {
  text: string;
  className?: string;
  speed?: number;
}

export function TypewriterEffect({ text, className = "", speed = 0.05 }: TypewriterEffectProps) {
  const displayText = text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: speed,
      },
    },
  };

  const child: Variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {displayText.map((char, index) => (
        <motion.span key={index} variants={child}>
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
