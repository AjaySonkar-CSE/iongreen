"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface EnhancedScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right";
  effect?: "fade" | "slide" | "zoom" | "scale";
  className?: string;
  once?: boolean;
  threshold?: number;
}

export function ScrollReveal({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  direction = "up",
  effect = "slide",
  className = "",
  once = true,
  threshold = 0.1
}: EnhancedScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: once, 
    margin: "-100px",
    amount: threshold
  });
  
  const getVariants = () => {
    switch (effect) {
      case "fade":
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.8 },
          visible: { opacity: 1, scale: 1 }
        };
      case "scale":
        return {
          hidden: { scale: 0.9 },
          visible: { scale: 1 }
        };
      case "slide":
      default:
        return {
          hidden: {
            opacity: 0,
            y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
            x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
          },
          visible: {
            opacity: 1,
            y: 0,
            x: 0,
          }
        };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Parallax Element Component
interface ParallaxElementProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  axis?: "y" | "x" | "both";
}

export function ParallaxElement({ 
  children, 
  speed = 10, 
  className = "",
  axis = "y"
}: ParallaxElementProps) {
  return (
    <motion.div
      className={className}
      style={{ y: axis === "y" || axis === "both" ? speed : 0, x: axis === "x" || axis === "both" ? speed : 0 }}
      initial={{ y: 0 }}
      whileInView={{ y: axis === "y" || axis === "both" ? -speed : 0, x: axis === "x" || axis === "both" ? -speed : 0 }}
      viewport={{ once: true }}
      transition={{ type: "tween", ease: "linear", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}

// Scroll Snap Section Component
interface ScrollSnapSectionProps {
  children: React.ReactNode;
  className?: string;
  snapAlign?: "start" | "center" | "end";
}

export function ScrollSnapSection({ 
  children, 
  className = "",
  snapAlign = "start"
}: ScrollSnapSectionProps) {
  return (
    <div 
      className={`snap-${snapAlign} ${className}`}
      style={{ scrollSnapAlign: snapAlign }}
    >
      {children}
    </div>
  );
}