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

  const textArray = type === "word" ? text.split(" ") : text.split("");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        ease: [0.215, 0.61, 0.355, 1], // expoOut
      },
    },
    hidden: {
      opacity: 0,
      y: 40,
    },
  };

  const maskChild: Variants = {
    visible: {
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      y: "110%",
    },
  };

  return (
    <motion.span
      ref={ref}
      style={{ display: "inline-block", overflow: type === "mask" ? "hidden" : "visible" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {textArray.map((item, index) => (
        <span key={index} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
          <motion.span
            variants={type === "mask" ? maskChild : child}
            style={{ display: "inline-block" }}
          >
            {item === " " ? "\u00A0" : item}
          </motion.span>
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
