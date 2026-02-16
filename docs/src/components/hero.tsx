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
import { motion } from "framer-motion";

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

  // Hardcoded hero slides
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

  const carouselSlides = hardcodedSlides.map(slide => ({
    id: slide.id,
    title: slide.title,
    description: slide.description,
    cta_label: slide.cta_label,
    cta_href: slide.cta_href,
    image_url: slide.image_url,
  }));

  return (
    <section
      className={cn(
        "fixed inset-0 w-full h-screen overflow-hidden z-0",
        className
      )}
      {...props}
    >
      <div className="w-full h-full">
        {isHomePage ? (
          <HeroCarousel slides={carouselSlides} categories={productCategories} />
        ) : (
          <div className="absolute inset-0">
            {(sectionBackgrounds[page] || sectionBackgrounds[page.toLowerCase()]) && (
              <div className="absolute inset-0">
                <Image
                  src={sectionBackgrounds[page] || sectionBackgrounds[page.toLowerCase()]}
                  alt={page}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
              </div>
            )}

            {/* Standard Hero Content for Other Pages */}
            <div className="relative z-10 mx-auto max-w-7xl px-4 flex flex-col items-center justify-center text-center h-full pt-20">
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <h1 className="text-xl md:text-5xl font-black text-white mb-2 md:mb-4 uppercase tracking-tighter drop-shadow-2xl">
                  {displayTitle}
                </h1>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={300}>
                <p className="text-sm md:text-xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-lg">
                  {displayDescription}
                </p>
              </ScrollAnimate>
            </div>
          </div>
        )}
      </div>

      {isHomePage && (
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce hidden md:block">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
          </div>
        </div>
      )}
    </section>
  );
}