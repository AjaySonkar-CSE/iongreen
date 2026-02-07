'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
  flipOnHover?: boolean;
  flipOnScroll?: boolean;
  delay?: number;
}

export const FlipCard = ({
  front,
  back,
  className = '',
  flipOnHover = true,
  flipOnScroll = false,
  delay = 0
}: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (flipOnScroll && isInView) {
      const timer = setTimeout(() => {
        setIsFlipped(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, flipOnScroll, delay]);

  const handleFlip = () => {
    if (flipOnHover) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  const variants: Variants = {
    initial: {
      scale: 0.9,
      opacity: 0,
      y: 20,
    },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    }),
    flip: {
      rotateY: 180,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
    unflip: {
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={`flip-card ${className}`}
      variants={variants}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      custom={delay / 100}
      onAnimationComplete={() => setIsAnimating(false)}
    >
      <motion.div
        className="flip-card-inner w-full h-full relative"
        style={{
          transformStyle: 'preserve-3d',
          perspective: '1000px',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
        onMouseEnter={flipOnHover ? handleFlip : undefined}
        onMouseLeave={flipOnHover ? handleFlip : undefined}
        variants={{
          initial: { rotateY: 0 },
          animate: {
            rotateY: isFlipped ? 180 : 0,
            transition: {
              duration: 0.6,
              ease: [0.4, 0, 0.2, 1],
            },
          },
        }}
      >
        <div
          className="flip-card-front w-full h-full absolute backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>
        <div 
          className="flip-card-back w-full h-full absolute backface-hidden"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {back}
        </div>
      </motion.div>
    </motion.div>
  );
}
