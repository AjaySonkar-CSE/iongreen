'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

type Slide = {
  id: number;
  title: string;
  description: string;
  cta_label: string;
  cta_href: string;
  image_url: string;
};

type ProductCategory = {
  name: string;
  icon: string;
  href: string;
  sectionId: string;
  image: string;
};

export type { Slide };
export function HeroCarousel({ slides, categories = [] }: { slides: Slide[]; categories?: ProductCategory[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll effect with pause on hover - every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  return (
    <div 
      className="relative w-full bg-white"
    >
      {/* Carousel Background with increased height for products below */}
      <div className="relative w-full h-[700px]">
        {/* Carousel Items */}
        <div className="relative w-full h-full">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`carousel-item absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentIndex 
                  ? 'opacity-100 z-10' 
                  : 'opacity-0 pointer-events-none z-0'
              }`}
            >
              <Image
                src={slide.image_url}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows - Hidden */}

        {/* Indicators - Hidden */}

        {/* Text Overlay - Centered Vertically */}
        <div className="absolute inset-0 z-15 flex flex-col items-center justify-center pointer-events-none">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              {slides[currentIndex]?.title}
            </h2>
            <p className="text-lg md:text-2xl drop-shadow-lg max-w-2xl mx-auto">
              {slides[currentIndex]?.description}
            </p>
          </div>
        </div>

        {/* Product Categories - Overlapped at bottom of carousel */}
        {categories.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 z-30 translate-y-1/3">
            <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
                {categories.map((category, index) => (
                  <ScrollReveal key={category.name} direction="up" duration={1.2} delay={0.2 * (index + 1)}>
                    <Link
                      href={category.href}
                      className="group relative overflow-hidden rounded-2xl shadow-2xl hover:shadow-green-500/20 transition-all duration-500 border border-white/30 hover:border-green-400/50 hover:scale-105 block transform hover:-translate-y-1 h-40 md:h-48"
                    >
                      {/* Image container with proper sizing */}
                      <div className={`absolute inset-0 ${index === 2 ? 'p-4' : 'p-3'}`}>
                        <div className="relative w-full h-full">
                          {category.image ? (
                            <Image
                              src={category.image}
                              alt={category.name}
                              fill
                              className={`object-contain object-center group-hover:scale-110 transition-transform duration-500 ${index === 2 ? 'opacity-90' : ''}`}
                              sizes="(max-width: 768px) 200px, 240px"
                              priority
                              style={{
                                objectFit: 'contain',
                                objectPosition: 'center',
                                ...(index === 2 && { maxWidth: '85%', maxHeight: '85%', margin: 'auto' })
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                              <span className="text-4xl">{category.icon}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Text overlay - appears on hover */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 font-montserrat text-center drop-shadow-lg">
                          {category.name}
                        </h3>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-full mb-2 md:mb-3"></div>
                        <span className="text-green-300 text-xs md:text-sm font-medium uppercase tracking-wider">Explore Now</span>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom spacing for overlapped boxes */}
      {categories.length > 0 && (
        <div className="h-32 md:h-40"></div>
      )}
    </div>
  );
}
