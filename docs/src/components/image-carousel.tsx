'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { FlipCard } from './ui/flip-card';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CarouselImage = {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
};

interface ImageCarouselProps {
  images?: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
  showNavigation?: boolean;
  showDots?: boolean;
  flipOnHover?: boolean;
  flipOnScroll?: boolean;
}

const defaultImages: CarouselImage[] = [
  {
    id: 1,
    src: '/images/hero/hero1.jpg',
    alt: 'Energy Storage Solution 1',
    title: 'Advanced Battery Technology',
    description: 'Cutting-edge lithium storage solutions'
  },
  {
    id: 2,
    src: '/images/hero/hero2.jpg',
    alt: 'Energy Storage Solution 2',
    title: 'Industrial Energy Systems',
    description: 'Large-scale commercial storage solutions'
  },
  {
    id: 3,
    src: '/images/hero/hero3.jpg',
    alt: 'Energy Storage Solution 3',
    title: 'Residential Energy Storage',
    description: 'Home battery systems for sustainable living'
  },
  {
    id: 4,
    src: '/images/hero/hero4.jpg',
    alt: 'Energy Storage Solution 4',
    title: 'Renewable Integration',
    description: 'Smart grid solutions for solar and wind'
  },
  {
    id: 5,
    src: '/images/hero/hero5.jpg',
    alt: 'Energy Storage Solution 5',
    title: 'Global Energy Solutions',
    description: 'Trusted by customers worldwide'
  }
];

export function ImageCarousel({
  images = defaultImages,
  autoPlay = true,
  interval = 5000,
  showNavigation = true,
  showDots = true,
  flipOnHover = true,
  flipOnScroll = true
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isHovered) return;

    const timer = setTimeout(() => {
      goToNext();
    }, interval);

    return () => clearTimeout(timer);
  }, [autoPlay, currentIndex, isHovered, interval, goToNext]);

  // Front content for flip card
  const frontContent = (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl">
      <Image
        src={images[currentIndex].src}
        alt={images[currentIndex].alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-4 left-4 text-white">
        <h3 className="text-xl font-bold">{images[currentIndex].title}</h3>
        <p className="text-sm opacity-90">{images[currentIndex].description}</p>
      </div>
    </div>
  );

  // Back content for flip card
  const backContent = (
    <div className="w-full h-64 md:h-80 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl flex flex-col items-center justify-center p-6 text-center">
      <div className="text-4xl mb-4">🔋</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{images[currentIndex].title}</h3>
      <p className="text-gray-600">{images[currentIndex].description}</p>
    </div>
  );

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Energy Solutions
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of energy storage solutions trusted by customers worldwide
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => isHovered && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <FlipCard
            front={frontContent}
            back={backContent}
            flipOnHover={flipOnHover}
            flipOnScroll={flipOnScroll}
            delay={0}
            className="h-full"
          />

          {showNavigation && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 text-gray-800" />
              </button>
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 text-gray-800" />
              </button>
            </>
          )}

          {showDots && (
            <div className="flex justify-center mt-6 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-600 w-6' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}