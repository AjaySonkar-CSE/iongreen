import { useState, useEffect, useRef } from 'react';

export function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState<number>(0);
  const [hasAnimated, setHasAnimated] = useState<boolean>(!startOnView);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!startOnView) {
      // If not using intersection observer, start animation immediately
      animateCounter(0, end, duration);
      return;
    }

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Trigger when 50% of the element is visible
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounter(0, end, duration);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    if (counterRef.current) {
      observerRef.current.observe(counterRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [end, duration, startOnView, hasAnimated]);

  const animateCounter = (start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Ease-out function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progress) * (end - start) + start);
      
      setCount(currentCount);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  return { count, counterRef };
}
