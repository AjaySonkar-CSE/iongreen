"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

// Ion Green images for scroll animations
const ionGreenImages = [
  "/1/ion1.png",
  "/1/ion2.png",
  "/1/ion3.png",
  "/1/ion4.png",
  "/1/ion5.png",
  "/1/ion6.png",
  "/3/green1.png",
  "/3/green2.png",
  "/3/green3.png",
  "/3/green4.png",
  "/3/green5.png",
  "/3/green6.png",
  "/images/ion-green-energy-storage.svg",
  "/images/ion-green-lithium-battery.svg",
  "/images/ion-green-residential.svg",
  "/images/ion-green-solar-solution.svg"
];

interface ScrollAnimationItem {
  id: number;
  title: string;
  description: string;
  image: string;
  position: 'left' | 'right';
  animationType: 'slideInLeft' | 'slideInRight' | 'fadeInUp' | 'scaleIn';
}

const scrollItems: ScrollAnimationItem[] = [
  {
    id: 1,
    title: "Advanced Lithium Technology",
    description: "Cutting-edge lithium battery solutions designed for maximum efficiency and reliability in renewable energy systems.",
    image: "/images/ai-lithium-battery-production.svg",
    position: 'left',
    animationType: 'slideInLeft'
  },
  {
    id: 2,
    title: "Sustainable Energy Storage",
    description: "ION Green batteries provide clean, sustainable power storage solutions for residential and commercial applications.",
    image: "/hybrid solor system.jpeg",
    position: 'right',
    animationType: 'slideInRight'
  },
  {
    id: 3,
    title: "Smart BMS Integration",
    description: "Intelligent Battery Management System ensures optimal performance, safety, and longevity of your energy storage.",
    image: "/1/ion2.png",
    position: 'left',
    animationType: 'fadeInUp'
  },
  {
    id: 4,
    title: "Scalable Solutions",
    description: "From residential to utility-scale, our flexible battery systems grow with your energy needs.",
    image: "/1/ion3.png",
    position: 'right',
    animationType: 'scaleIn'
  },
  {
    id: 5,
    title: "Solar Integration",
    description: "Seamlessly integrate with solar panels for complete renewable energy independence.",
    image: "/3/green2.png",
    position: 'left',
    animationType: 'slideInLeft'
  },
  {
    id: 6,
    title: "Residential Excellence",
    description: "Perfect for home energy storage with advanced monitoring and remote management capabilities.",
    image: "/3/green3.png",
    position: 'right',
    animationType: 'slideInRight'
  }
];

export function HeroScrollAnimations() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [imageOverrides, setImageOverrides] = useState<Record<number, string>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const itemId = parseInt(entry.target.getAttribute('data-item-id') || '0');
          if (entry.isIntersecting) {
            setVisibleItems(prev => new Set([...prev, itemId]));
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const items = containerRef.current?.querySelectorAll('[data-item-id]');
    items?.forEach(item => observer.observe(item));

    return () => {
      items?.forEach(item => observer.unobserve(item));
    };
  }, []);

  return (
    <section ref={containerRef} className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-green-50/50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(59,130,246,0.1) 2px, transparent 2px),
            radial-gradient(circle at 75% 75%, rgba(34,197,94,0.1) 2px, transparent 2px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-gentle-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-green-200/20 rounded-full blur-2xl animate-gentle-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-300/10 rounded-full blur-lg animate-gentle-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-green-300/15 rounded-full blur-xl animate-enhanced-glow"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">

        {/* Innovation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {scrollItems.map((item, index) => (
            <ScrollReveal key={item.id} direction="up" duration={0.8} delay={0.2 * (index + 1)}>
              <div className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 block h-80">
                {/* Full-size image background */}
                <div className="absolute inset-0">
                  <Image
                    src={imageOverrides[item.id] ?? item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onError={() => {
                      setImageOverrides((prev) => {
                        if (prev[item.id]) return prev;
                        return { ...prev, [item.id]: ionGreenImages[index % ionGreenImages.length] };
                      });
                    }}
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        High Efficiency
                      </span>
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        Long Lifespan
                      </span>
                      <span className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs font-medium rounded-full">
                        Smart Monitoring
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-20">
          <ScrollReveal direction="up" duration={0.8} delay={0.5}>
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/solutions"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl inline-block"
              >
                Explore ION Green Solutions
              </Link>
              <Link
                href="/products"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 transition-all duration-300 hover:scale-105 hover:shadow-lg inline-block"
              >
                View Technical Specs
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
