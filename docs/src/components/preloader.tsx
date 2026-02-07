'use client';

import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the preloader after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      document.body.style.overflow = 'auto';
    }, 2000);

    // Initially hide scrollbar
    document.body.style.overflow = 'hidden';

    return () => {
      clearTimeout(timer);
      // Ensure scrollbar is restored when component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Only render if still loading
  if (!isLoading) {
    return null;
  }

  return (
    <div className="preloader">
      <div className="loader"></div>
    </div>
  );
};

export default Preloader;
