'use client';

import { useEffect, useState } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';

export function ParallaxWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ParallaxProvider>
      {children}
    </ParallaxProvider>
  );
}
