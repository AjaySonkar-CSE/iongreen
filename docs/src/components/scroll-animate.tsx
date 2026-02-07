'use client';

import { forwardRef } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface ScrollAnimateProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'bounceIn' | 'zoomIn' | 'slideInBounce' | 'slideInSmooth' | 'fadeInUpElegant' | 'scaleInBounce' | 'slideInLeftSmooth' | 'slideInRightSmooth' | 'smoothReveal' | 'cascadeDown';
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export const ScrollAnimate = forwardRef<HTMLDivElement, ScrollAnimateProps>(({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  once = false,
  ...props
}, forwardedRef) => {
  const [animationRef, isVisible] = useScrollAnimation({ threshold, once });
  const animationClass = `animate-${animation}`;
  const delayClass = `delay-${Math.min(Math.floor(delay / 100) * 100, 500)}`;

  const handleRef = (node: HTMLDivElement | null) => {
    // Forward the ref
    if (forwardedRef) {
      if (typeof forwardedRef === 'function') {
        forwardedRef(node);
      } else if (forwardedRef) {
        (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    }
    // Set the animation ref
    if (animationRef && 'current' in animationRef) {
      animationRef.current = node;
    }
  };

  return (
    <div
      ref={handleRef}
      className={`${className} scroll-trigger ${isVisible ? `visible ${animationClass} ${delayClass}` : ''}`}
      style={{
        transform: animation.includes('slideIn') 
          ? animation === 'slideInLeft' 
            ? 'translateX(-20px)' 
            : animation === 'slideInRight' 
            ? 'translateX(20px)' 
            : 'translateY(20px)'
          : 'none',
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
      }}
      {...props}
    >
      {children}
    </div>
  );
});

ScrollAnimate.displayName = 'ScrollAnimate';
