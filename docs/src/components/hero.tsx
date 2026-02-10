"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getSiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";
import { ScrollAnimate } from "@/components/scroll-animate";

const heroContent = getSiteContent().hero;

// Background images for each section
const sectionBackgrounds: Record<string, string> = {
  'products': '/pro2.jpg',
  'solutions': '/data2.jpg.jpg',
  'about': '/factory1.jpeg',
  'case': '/case1.jpg',
  'lab-equipment': '/lab2.jpg',
  'support': '/ss1.jpg',
  'news': '/data3.jpg.jpg',
  'hydrogen-pules': '/hydrogen_pules.png',
  'energy-storage-system': '/energy_storage_system.jpg',
  'hybrid-solar-system': '/hybrid_solar_system.jpg',
  'solar-solution': '/solar_solution.jpg',
  'ev-vehicles': '/ev_vehicles.png',
  'drone': '/drone.jpg',
  'residential-energy-storage': '/pro1.jpg',
  'large-scale-energy-storage': '/data2.jpg.jpg',
  'rack-mounted-batteries': '/images/ai-solar-battery-installation.svg',
  'mobile-ev-charging-storage': '/data1.jpg.jpg'
};

// Automatic Headings for Top-Level Pages
const pageHeadings: Record<string, { title: string; description: string }> = {
  'products': {
    title: 'Energy Storage Products',
    description: 'Explore our comprehensive range of advanced lithium battery solutions for every application.'
  },
  'solutions': {
    title: 'Integrated Energy Solutions',
    description: 'Customized energy storage systems designed for utility, commercial, and residential sectors.'
  },
  'about': {
    title: 'About ION Green',
    description: 'Pioneering the future of sustainable energy with innovative battery technology and global expertise.'
  },
  'case': {
    title: 'Case Studies & Projects',
    description: 'Discover how ION Green deployments are transforming energy landscapes worldwide.'
  },
  'lab-equipment': {
    title: 'Lab & Research Equipment',
    description: 'State-of-the-art testing and research facilities for battery technology development.'
  },
  'support': {
    title: 'Sales & Support',
    description: 'Global assistance and technical expertise to help you optimize your energy storage systems.'
  },
  'news': {
    title: 'Latest News & Insights',
    description: 'Stay updated with ION Green innovations, climate summits, and industry breakthroughs.'
  }
};

// Product categories with section IDs for smooth scrolling
const productCategories = [
  {
    name: "Energy Storage System",
    icon: "🏠",
    href: "/products/energy-storage-system",
    sectionId: "energy-storage-system",
    image: "/energy_storage_system.jpg"
  },
  {
    name: "Solar Solution",
    icon: "🔋",
    href: "/products/solar-solution",
    sectionId: "solar-solution",
    image: "/solar_solution.jpg"
  },
  {
    name: "Hybrid Solar System",
    icon: "🏢",
    href: "/products/hybrid-solar-system",
    sectionId: "hybrid-solar-system",
    image: "/hybrid_solar_system.jpg"
  },
  {
    name: "Hydrogen pulses",
    icon: "🏭",
    href: "/products/hydrogen-pules",
    sectionId: "hydrogen-pules",
    image: "/hydrogen_pules.png"
  },
  {
    name: "EV Vehicles",
    icon: "🚗",
    href: "/products/ev-vehicles",
    sectionId: "ev-vehicles",
    image: "/ev_vehicles.png"
  },
  {
    name: "Drone",
    icon: "🚁",
    href: "/products/drone",
    sectionId: "drone",
    image: "/drone.jpg"
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
  title?: string;
  description?: string;
  children?: React.ReactNode;
  slides?: DynamicHeroSlide[]; // Add slides prop for dynamic content
}

// Type guard to check if slide is dynamic
function isDynamicSlide(slide: HeroSlide): slide is DynamicHeroSlide {
  return 'id' in slide && 'image_url' in slide;
}

import { HeroCarousel } from './hero-carousel';

export function Hero({
  page = 'home',
  title,
  description,
  children,
  className,
  slides: externalSlides,
  ...props
}: HeroProps) {
  // Show carousel on home page with hardcoded herogreen images, show images for other pages
  const isHomePage = page === 'home';

  // Resolve title and description
  const displayTitle = title || pageHeadings[page]?.title;
  const displayDescription = description || pageHeadings[page]?.description;

  // Hardcoded hero slides with the two specified images from public folder
  const hardcodedSlides = [
    {
      id: 1,
      title: 'Advanced Energy Storage Solutions',
      description: 'Discover cutting-edge battery technology designed for maximum efficiency and reliability.',
      cta_label: 'Learn More',
      cta_href: '/products',
      image_url: '/sss.jpeg',
    },
    {
      id: 2,
      title: 'Renewable Energy Integration',
      description: 'Seamlessly integrate solar and wind power with intelligent energy storage systems.',
      cta_label: 'Explore Solutions',
      cta_href: '/solutions',
      image_url: '/hero3.jpeg',
    },
    {
      id: 3,
      title: 'Utility & Commercial ESS',
      description: 'Containerized energy storage systems engineered for industrial and utility applications.',
      cta_label: 'View Products',
      cta_href: '/products/energy-storage-system',
      image_url: '/hero2.jpeg',
    },
    {
      id: 4,
      title: 'Solar Solution',
      description: 'Solar Solution',
      cta_label: 'View Products',
      cta_href: '/products/solar-solution',
      image_url: '/hero1.jpeg',
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
        // Dynamic Background for Other Pages
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            {/* Background for specific pages */}
            {(sectionBackgrounds[page] || sectionBackgrounds[page.toLowerCase()]) && (
              <div className="absolute inset-0">
                <Image
                  src={sectionBackgrounds[page] || sectionBackgrounds[page.toLowerCase()]}
                  alt={page}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Standardized Premium Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"></div>

                {/* HUD Graphic Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                  backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(34,197,94,0.15) 1px, transparent 1px),
                    radial-gradient(circle at 80% 70%, rgba(34,197,94,0.1) 1px, transparent 1px)
                  `,
                  backgroundSize: '100px 100px'
                }}></div>
              </div>
            )}

            {/* Product Category matching backgrounds (Fallback) */}
            {productCategories.map((category) => (
              page === category.sectionId && (
                <div
                  key={category.sectionId}
                  className="absolute inset-0"
                >
                  <Image
                    src={sectionBackgrounds[category.sectionId] || category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
                </div>
              )
            ))}
          </div>

          {/* Floating Neon Elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-64 h-64 bg-green-500/5 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-96 h-96 bg-green-400/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>

          {/* Hero Content Area */}
          <div className="relative z-10 mx-auto max-w-7xl px-4 flex flex-col items-center justify-center text-center min-h-screen pt-20">
            {(displayTitle || displayDescription) && (
              <div className="mb-12 max-w-4xl">
                {displayTitle && (
                  <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter drop-shadow-2xl">
                      {displayTitle}
                    </h1>
                  </ScrollAnimate>
                )}
                {displayDescription && (
                  <ScrollAnimate animation="fadeInUpElegant" delay={300}>
                    <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                      {displayDescription}
                    </p>
                  </ScrollAnimate>
                )}
                <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                  <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mt-8" />
                </ScrollAnimate>
              </div>
            )}

            <div className="w-full">
              {children}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}