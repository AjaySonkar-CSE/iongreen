'use client';

import { ScrollAnimate } from "@/components/scroll-animate";
import { cn } from "@/lib/utils";
import React from 'react';

type AnimationType = 'fadeIn' | 'slideInUp' | 'slideInLeft' | 'slideInRight' | 'scaleIn' | 'bounceIn' | 'zoomIn' | 'fadeInUpElegant' | 'slideInBounce' | 'slideInSmooth' | 'scaleInBounce' | 'slideInLeftSmooth' | 'slideInRightSmooth';

interface AnimatedSectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof React.JSX.IntrinsicElements;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
  once?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedSection = React.forwardRef<HTMLElement, AnimatedSectionProps>(({
  as: Tag = 'section',
  animation = 'fadeIn',
  delay = 0,
  threshold = 0.1,
  once = true,
  children,
  className,
  ...props
}, ref) => {
  // Filter out the 'as' prop since ScrollAnimate doesn't accept it
  const { as: _, ...restProps } = props as any;
  
  return (
    <ScrollAnimate
      animation={animation}
      delay={delay}
      threshold={threshold}
      once={once}
      className={cn('w-full', className)}
      {...restProps}
    >
      {React.createElement(Tag as string, { ref, className: cn('w-full', className) }, children)}
    </ScrollAnimate>
  );
});

AnimatedSection.displayName = 'AnimatedSection';

type AnimatedHeadingProps = Omit<AnimatedSectionProps, 'animation' | 'delay' | 'threshold' | 'once' | 'as'> & {
  as?: keyof React.JSX.IntrinsicElements;
};

export const AnimatedHeading = React.forwardRef<HTMLElement, AnimatedHeadingProps>(({
  as: Tag = 'h2',
  children,
  className,
  ...props
}, ref) => {
  return (
    <AnimatedSection
      as={Tag}
      animation="fadeIn"
      delay={100}
      className={cn(
        'text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8',
        'bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </AnimatedSection>
  );
});

AnimatedHeading.displayName = 'AnimatedHeading';

type AnimatedParagraphProps = Omit<AnimatedSectionProps, 'as' | 'animation' | 'delay' | 'threshold' | 'once'>;

export const AnimatedParagraph = React.forwardRef<HTMLParagraphElement, AnimatedParagraphProps>(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <AnimatedSection
      as="p"
      animation="fadeIn"
      delay={200}
      className={cn('text-lg text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto', className)}
      ref={ref}
      {...props}
    >
      {children}
    </AnimatedSection>
  );
});

AnimatedParagraph.displayName = 'AnimatedParagraph';
