'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Slide = {
  id: number;
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image: string;
};

interface PageHeroSliderProps {
  slides: Slide[];
  height?: string;
  showNavigation?: boolean;
  showIndicators?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  fixed?: boolean;
}

export function PageHeroSlider({
  slides,
  height = "h-[80vh]",
  showNavigation = true,
  showIndicators = true,
  autoPlay = true,
  autoPlayInterval = 5000,
  fixed = false
}: PageHeroSliderProps) {
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

  // Auto-scroll effect with pause on hover
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, autoPlay, autoPlayInterval]);

  if (slides.length === 0) return null;

  return (
    <div
      className={`w-full ${height} overflow-hidden ${fixed ? 'fixed inset-0 z-0 h-screen' : 'relative'}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Items */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex
              ? 'opacity-100 z-10'
              : 'opacity-0 pointer-events-none z-0'
              }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-green-900/30 to-slate-800/40"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-20 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-32 right-16 w-56 h-56 bg-green-300/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>



            {/* Content Overlay */}
            <div className="absolute bottom-15 left-1/2 transform -translate-x-1/2 z-10 text-center px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold text-white mb-4 drop-shadow-2xl animate-fadeInUp">
                  {slide.title}
                </h1>
                {slide.description && (
                  <p className="text-lg md:text-xl text-gray-200 mb-6 drop-shadow-lg leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                    {slide.description}
                  </p>
                )}
                {slide.ctaLabel && slide.ctaHref && (
                  <div className="animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                    <Button
                      asChild
                      size="lg"
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-base font-semibold shadow-xl"
                    >
                      <Link href={slide.ctaHref}>
                        {slide.ctaLabel}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {showNavigation && slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                ? 'w-8 bg-green-500'
                : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

