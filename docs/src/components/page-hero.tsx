"use client";

import Image from "next/image";
import { usePathname } from 'next/navigation';

type PageHeroProps = {
  title: string;
  description: string;
};

const getBackgroundImage = (path: string) => {
  if (path.startsWith('/about')) {
    return '/1/ion2.png';
  } else if (path.startsWith('/products')) {
    return '/1/ion3.png';
  } else if (path.startsWith('/solutions')) {
    return '/1/ion4.png';
  } else if (path.startsWith('/case-studies') || path.startsWith('/case')) {
    return '/1/ion5.png';
  } else if (path.startsWith('/news')) {
    return '/2/green.png';
  } else if (path.startsWith('/contact')) {
    return '/3/green1.png';
  } else if (path.startsWith('/support')) {
    return '/3/green2.png';
  } else if (path.startsWith('/lab-equipment')) {
    return '/3/green3.png';
  }
  // Default background for other pages
  return '/1/ion1.png';
};

export function PageHero({ title, description }: PageHeroProps) {
  const pathname = usePathname();
  const backgroundImage = getBackgroundImage(pathname);

  return (
    <section className="relative h-96 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt={title}
          fill
          className="object-cover fade-in"
          priority
        />
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-b from-black/60 to-black/30"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-4xl px-4 text-center text-white md:px-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-green-300">ION Green</p>
          <h1 className="mt-4 text-4xl font-semibold md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-white/90">{description}</p>
        </div>
      </div>
    </section>
  );
}

