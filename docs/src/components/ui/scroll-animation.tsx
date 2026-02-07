'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollAnimationProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  amount?: number | 'some' | 'all';
  once?: boolean;
}

export function ScrollAnimation({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  amount = 0.2,
  once = false,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once,
    amount,
    margin: '0px 0px -50px 0px' // Adjust this to trigger the animation earlier/later
  });
  const controls = useAnimation();

  const directionMap = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        x: 0,
        transition: {
          duration: 0.6,
          delay: delay,
          ease: [0.25, 0.1, 0.25, 1],
        },
      });
    } else if (!once) {
      controls.start({
        opacity: 0,
        ...directionMap[direction],
      });
    }
  }, [isInView, controls, delay, direction, once]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={controls}
      className={className}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
}
