"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

const hero = getSiteContent().hero;

// Background images for each section
const sectionBackgrounds = {
  'hydrogen-pules': 'https://images.unsplash.com/photo-1518780664697-55eada23840d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'energy-storage-system': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'hybrid-solar-system': 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'solar-solution': 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'ev-vehicles': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  'drone': 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
};

// Product categories with section IDs for smooth scrolling
const productCategories = [
  {
    name: "Energy Storage System",
    icon: "🏠",
    href: "/products/energy-storage-system",
    sectionId: "energy-storage-system",
    image: "/Enery storage System.jpeg"
  },
  {
    name: "Solar Solution",
    icon: "🔋",
    href: "/products/solar-solution",
    sectionId: "solar-solution",
    image: "/solor solution.jpeg"
  },
  {
    name: "Hybrid Solar System",
    icon: "🏢",
    href: "/products/hybrid-solar-system",
    sectionId: "hybrid-solar-system",
    image: "/hybrid solor system.jpeg"
  },
  {
    name: "Hydrogen pules",
    icon: "🏭",
    href: "/products/hydrogen-pules",
    sectionId: "hydrogen-pules",
    image: "/banner.zip - LITHOTRIPSY (1).png"
  },
  {
    name: "EV Vehicles",
    icon: "🚗",
    href: "/products/ev-vehicles",
    sectionId: "ev-vehicles",
    image: "/banner.zip - STACK MOUNT BATTERY (1).png"
  },
  {
    name: "Drone",
    icon: "🚁",
    href: "/products/drone",
    sectionId: "drone",
    image: "/drone.jpg.jpg"
  }
];

interface StaticHeroSlide {
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
}

interface DynamicHeroSlide {
  id: number;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  image_url: string;
  position: number;
}

type HeroSlide = StaticHeroSlide | DynamicHeroSlide;

interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  page?: string;
  children?: React.ReactNode;
  slides?: DynamicHeroSlide[]; // Add slides prop for dynamic content
}

// Type guard to check if slide is dynamic
function isDynamicSlide(slide: HeroSlide): slide is DynamicHeroSlide {
  return 'id' in slide && 'image_url' in slide;
}

import { HeroCarousel } from './hero-carousel';

export function Hero({ page = 'home', children, className, slides: externalSlides, ...props }: HeroProps) {
  // Show carousel on home page with hardcoded herogreen images, show images for other pages
  const isHomePage = page === 'home';
  const [currentImage, setCurrentImage] = useState(0);
  
  // Hardcoded hero slides with the two specified images from public folder
  const hardcodedSlides = [
    {
      id: 1,
      title: 'Advanced Energy Storage Solutions',
      description: 'Discover cutting-edge battery technology designed for maximum efficiency and reliability.',
      cta_label: 'Learn More',
      cta_href: '/products',
      image_url: '/jjj.jpeg',
    },
    {
      id: 2,
      title: 'Renewable Energy Integration',
      description: 'Seamlessly integrate solar and wind power with intelligent energy storage systems.',
      cta_label: 'Explore Solutions',
      cta_href: '/solutions',
      image_url: '/jjjj1.jpeg',
    },
  ];

  // Format hardcoded slides for HeroCarousel component
  const carouselSlides = hardcodedSlides.map(slide => ({
    id: slide.id,
    title: slide.title,
    description: slide.description,
    cta_label: slide.cta_label,
    cta_href: slide.cta_href,
    image_url: slide.image_url,
  }));

  return (
    <section className={cn("relative", className)} {...props}>
      {isHomePage ? (
        // Use HeroCarousel for Home Page with database slides and product categories
        carouselSlides.length > 0 ? (
          <HeroCarousel slides={carouselSlides} categories={productCategories} />
        ) : (
          // Fallback to image background if no database slides
          <div className="relative min-h-screen">
            <Image
              src="/herogreen.jpeg"
              alt="Hero slide"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
        )
      ) : (
        // Dynamic Background for Product Pages
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            {productCategories.map((category) => (
              <div
                key={category.sectionId}
                className={`absolute inset-0 transition-opacity duration-1000 ${page === category.sectionId ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
              >
                <Image
                  src={sectionBackgrounds[category.sectionId as keyof typeof sectionBackgrounds]}
                  alt={category.name}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>

                {/* Overlay Pattern - Sungrow Style */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-transparent to-green-800/10"></div>
                <div className="absolute inset-0" style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(34,197,94,0.15) 1px, transparent 1px),
                    radial-gradient(circle at 80% 70%, rgba(34,197,94,0.1) 1px, transparent 1px),
                    radial-gradient(circle at 60% 20%, rgba(22,163,74,0.12) 1px, transparent 1px)
                  `,
                  backgroundSize: '120px 120px'
                }}></div>
              </div>
            ))}
          </div>

          {/* Floating Elements - Enhanced */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl animate-gentle-float"></div>
            <div className="absolute bottom-32 right-16 w-56 h-56 bg-green-300/8 rounded-full blur-3xl animate-gentle-float" style={{ animationDelay: '3s' }}></div>
            <div className="absolute top-1/3 left-1/4 w-32 h-32 bg-green-500/6 rounded-full blur-xl animate-enhanced-glow" style={{ animationDelay: '6s' }}></div>
            <div className="absolute top-2/3 right-1/3 w-24 h-24 bg-green-400/12 rounded-full blur-lg animate-gentle-float" style={{ animationDelay: '9s' }}></div>
          </div>

          {/* Content for product pages */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 pt-[35rem] pb-20 md:px-6 lg:px-8">
            {/* Hero Header - Content removed as requested */}
          </div>
        </div>
      )}
    </section>
  );
}