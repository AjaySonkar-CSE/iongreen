'use client';

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { StaggeredText } from "@/components/ui/text-animations";
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

  // Auto-scroll effect with pause on hover - every 5 seconds (slightly slower for text to read)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

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
              <source
                // src={currentIndex % 2 === 0
                //   ? "/Cinematic_Clean_Energy_Hero_Video.mp4"
                //   : "/Cinematic_Renewable_Energy_Ecosystem_Video.mp4"
                // }
                src=
                "/Cinematic_Clean_Energy_Hero_Video.mp4"


                type="video/mp4"
              />
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

        {/* Carousel Items - Split Layout */}
        <div className="relative w-full h-full">
          <AnimatePresence>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="max-w-[1600px] mx-auto h-full px-4 md:px-6 lg:px-10 flex items-center justify-start text-left">
                <div className="w-full max-w-4xl z-20">
                  {/* Text Content - Left Aligned */}
                  <div className="text-white">
                    <div key={`title-${currentIndex}`} className="mb-6 overflow-hidden">
                      <StaggeredText
                        text={slides[currentIndex]?.title}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl leading-tight"
                        stagger={0.04}
                        duration={0.6}
                      />
                    </div>

                    <motion.div
                      key={`desc-${currentIndex}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    >
                      <p className="text-lg md:text-2xl drop-shadow-xl font-light tracking-wide mb-10 text-gray-100 max-w-2xl">
                        {slides[currentIndex]?.description}
                      </p>

                      <Link href={slides[currentIndex]?.cta_href || "#"}>
                        <button className="pointer-events-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-green-500/50 shadow-lg text-lg">
                          {slides[currentIndex]?.cta_label}
                        </button>
                      </Link>

                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-4 md:px-8 pointer-events-none">
          <button
            type="button"
            aria-label="Previous slide"
            onClick={prevSlide}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={nextSlide}
            className="pointer-events-auto inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Product Categories - Positioned at bottom of carousel */}
        {categories.length > 0 && (
          <div className="absolute bottom-10 left-0 right-0 z-30">
            <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10">
              {/* Slide Indicators - Linked to Hero Carousel */}
              <div className="flex gap-2 mb-8 ml-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1 rounded-full transition-all duration-300 ${index === currentIndex ? "w-12 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]" : "w-3 bg-white/20 hover:bg-white/40"
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 justify-start"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.5
                    }
                  }
                }}
              >
                {categories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    variants={{
                      hidden: { opacity: 0, y: 30 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.8,
                          ease: [0.21, 0.45, 0.32, 0.9]
                        }
                      }
                    }}
                  >
                    <Link
                      href={category.href}
                      className="group relative h-48 rounded-xl overflow-hidden cursor-pointer border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 hover:border-green-500/50 hover:-translate-y-4 hover:shadow-[0_15px_30px_rgba(34,197,94,0.2)] block"
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-cover opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                        />
                      </div>

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                      {/* Card Content */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-end z-10">
                        <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          {/* Icon Box */}
                          <div className="w-8 h-8 bg-green-500/20 backdrop-blur-md rounded-md flex items-center justify-center text-green-400 border border-green-500/30 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-base">{category.icon}</span>
                          </div>
                          <h4 className="text-[12px] font-black uppercase tracking-widest text-white leading-tight mb-1">
                            {category.name}
                          </h4>
                          <p className="text-[10px] text-green-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                            Explore More
                          </p>
                        </div>
                      </div>

                      {/* Bottom Neon Line */}
                      <div className="absolute bottom-0 left-0 h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-500" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
