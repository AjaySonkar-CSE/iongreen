'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StaggeredText } from "@/components/ui/text-animations";
import { useState, useEffect } from "react";

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
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-scroll main carousel
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  // Auto-scroll product categories on mobile
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCategoryIndex((prev) => (prev + 1) % categories.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [categories.length]);

  // Get visible categories for mobile (show 2 at a time)
  const getVisibleCategories = () => {
    const visible = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentCategoryIndex + i) % categories.length;
      visible.push(categories[index]);
    }
    return visible;
  };

  return (
    <div
      className="relative w-full bg-black overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Background with full screen height */}
      <div className="relative w-full h-screen">
        {/* Background Video */}
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.video
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/Cinematic_Clean_Energy_Hero_Video.mp4" type="video/mp4" />
            </motion.video>
          </AnimatePresence>

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/30 to-black/10"></div>

          {/* Animated accent elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-32 right-16 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
        </div>

        {/* Carousel Content Container - Using Flex to prevent overlaps */}
        <div className="relative w-full h-full flex flex-col z-20">
          {/* 1. Header Spacer */}
          <div className="h-20 md:h-24 lg:h-28 flex-shrink-0" />

          {/* 2. Main Content Area (Title + Desc + CTA) */}
          <div className="flex-1 flex flex-col justify-center px-4 md:px-8 lg:px-12 max-w-[1600px] mx-auto w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-4xl"
              >
                <div className="mb-2 md:mb-4 overflow-hidden">
                  <StaggeredText
                    text={slides[currentIndex]?.title}
                    className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] uppercase tracking-tighter drop-shadow-2xl"
                    stagger={0.03}
                    duration={0.5}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <p className="text-xs md:text-base lg:text-lg text-white/90 font-light max-w-2xl mb-4 md:mb-8 leading-relaxed drop-shadow-lg">
                    {slides[currentIndex]?.description}
                  </p>

                  <Link href={slides[currentIndex]?.cta_href || "#"}>
                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 md:py-3 px-6 md:px-10 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl text-xs md:text-sm uppercase tracking-widest">
                      {slides[currentIndex]?.cta_label}
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 3. Bottom Controls Area (Indicators + Category Cards) */}
          <div className="w-full flex-shrink-0 px-4 md:px-8 lg:px-12 pb-36 md:pb-8 lg:pb-10 max-w-[1600px] mx-auto">
            {/* Slide Indicators - Hidden on mobile */}
            <div className="hidden md:flex gap-1.5 mb-4 md:ml-1 justify-center md:justify-start">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-1 transition-all duration-300 ${index === currentIndex ? "w-8 md:w-16 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "w-1.5 md:w-2 bg-white/20 hover:bg-white/40"
                    } rounded-full`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Product Category Cards - Ultra Compact on small laptop heights */}
            {categories.length > 0 && (
              <>
                {/* Mobile: 2 Cards */}
                <div className="md:hidden mb-2">
                  <div className="flex justify-center gap-2">
                    {getVisibleCategories().map((category, idx) => (
                      <Link
                        key={`${category.name}-${idx}`}
                        href={category.href}
                        className="group relative h-20 w-[46%] rounded-lg overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm shadow-xl"
                      >
                        <div className="absolute inset-0">
                          <Image src={category.image} alt={category.name} fill className="object-cover opacity-50" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                        <div className="absolute inset-0 p-2 flex flex-col justify-end">
                          <span className="text-[10px] font-bold uppercase text-white truncate drop-shadow-md">{category.name}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Desktop: Grid of 6 Cards */}
                <motion.div
                  className="hidden md:grid grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3 justify-start"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delayChildren: 0.5 }
                    }
                  }}
                >
                  {categories.map((category) => (
                    <motion.div
                      key={category.name}
                      variants={{
                        hidden: { opacity: 0, y: 30, scale: 0.9 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                            duration: 0.8,
                            ease: [0.215, 0.61, 0.355, 1]
                          }
                        }
                      }}
                    >
                      <Link
                        href={category.href}
                        className="group relative h-24 lg:h-32 xl:h-44 rounded-2xl overflow-hidden cursor-pointer border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-green-500/50 hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(34,197,94,0.25)] block"
                      >
                        <div className="absolute inset-0">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end z-10">
                          <div className="transform translate-y-2 lg:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/20 backdrop-blur-md rounded-xl flex items-center justify-center text-green-400 border border-green-500/30 mb-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-sm lg:text-lg">{category.icon}</span>
                            </div>
                            <h4 className="text-[10px] lg:text-[13px] font-black uppercase tracking-[0.15em] text-white leading-tight mb-2">
                              {category.name}
                            </h4>
                            <div className="h-0.5 w-8 bg-green-500/60 opacity-0 group-hover:opacity-100 transition-opacity transform origin-left scale-x-0 group-hover:scale-x-100 duration-500" />
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-700" />
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </>
            )}
          </div>
        </div>

        {/* Navigation Arrows - Hidden on mobile */}
        <div className="absolute top-[45%] left-0 right-0 z-40 hidden md:flex items-center justify-between px-2 md:px-6 pointer-events-none">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-green-600 backdrop-blur-md transition-all border border-white/10"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="pointer-events-auto h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:bg-green-600 backdrop-blur-md transition-all border border-white/10"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
