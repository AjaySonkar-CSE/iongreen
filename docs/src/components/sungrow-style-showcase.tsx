"use client";

import Image from "next/image";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";
import Link from "next/link";

const showcaseItems = [
  {
    image: "/solor solution.jpeg",
    title: "Solar Solution Technologies",
    description: "Ion Green Energy delivers next-generation Battery Energy Storage Systems (BESS) and intelligent power solutions for grid-scale, commercial, and industrial applications. Our technology enables renewable integration, peak shaving, backup power, and energy optimization with high efficiency and safety.",
    features: ["High Energy Density", "Advanced Safety", "Long Cycle Life", "Smart BMS"],
    href: "/case"
  },
  {
    image: "/jjjj1.jpeg",
    title: "Battery Energy Storage System",
    description: "Comprehensive clean energy solutions for residential, commercial, and industrial applications",
    features: ["Solar Integration", "Grid Stability", "Energy Management", "Scalable Systems"],
    href: "/case"
  },
  {
    image: "/bal1.jpeg",
    title: "Innovation & Research",
    description: "Continuous investment in R&D to deliver next-generation energy storage technologies",
    features: ["Research Labs", "Innovation Center", "Quality Testing", "Global Standards"],
    href: "/case"
  },
  {
    image: "/drones.jpeg",
    title: "Drones",
    description: "State-of-the-art production facilities ensuring highest quality and reliability standards",
    features: ["Automated Production", "Quality Control", "Environmental Standards", "Global Supply"],
    href: "/case"
  },
  {
    image: "/banner.zip - HYDROGEN FUEL CELL (1).png",
    title: "Future-Ready Technology",
    description: "Preparing for tomorrow's energy needs with forward-thinking design and technology",
    features: ["AI Integration", "IoT Connectivity", "Predictive Analytics", "Remote Monitoring"],
    href: "/case"
  }
];

export function SungrowStyleShowcase() {
  return (
    <section className="py-24 bg-gradient-to-br from-white via-green-50/20 to-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(circle at 30% 20%, rgba(34,197,94,0.1) 1px, transparent 1px),
            radial-gradient(circle at 70% 80%, rgba(34,197,94,0.08) 1px, transparent 1px),
            radial-gradient(circle at 90% 40%, rgba(22,163,74,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '150px 150px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal direction="down" duration={1.2}>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full mb-8 border border-green-200">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-800 text-sm font-medium uppercase tracking-wider font-montserrat">
                Technology Showcase
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 font-montserrat leading-tight">
              Powering the <span className="text-green-600">Future</span> of Energy
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-roboto">
              Explore our comprehensive portfolio of innovative energy solutions designed to meet the evolving needs of a sustainable world
            </p>
          </div>
        </ScrollReveal>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {showcaseItems.map((item, index) => (
            <ScrollReveal
              key={index}
              direction={index % 2 === 0 ? "right" : "left"}
              duration={1.0}
              delay={0.2 * index}
            >
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-96"
              >
                {/* Full-size image background */}
                <div className="absolute inset-0 flex items-center justify-center py-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`${index === 1 ? 'object-contain p-2' : index === 3 ? 'object-cover translate-y-4' : 'object-cover'} group-hover:scale-110 transition-transform duration-500`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 invisible opacity-0 group-hover:visible group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-montserrat">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                      <span>View Case Study</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <ScrollReveal direction="up" duration={1.2} delay={0.8}>
          <div className="text-center bg-gradient-to-r from-green-600 via-green-700 to-green-800 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `
                  radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                  radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 font-montserrat">
                Ready to Transform Your Energy Future?
              </h3>
              <p className="text-xl text-green-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join the global movement towards sustainable energy with ION Green's advanced battery technology and comprehensive solutions
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  href="/products"
                  className="group inline-flex items-center px-10 py-5 bg-white text-green-700 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 text-xl hover:scale-105 transform hover:-translate-y-1"
                >
                  Start Your Journey
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>

                <Link
                  href="/products"
                  className="group inline-flex items-center px-10 py-5 bg-green-500/20 backdrop-blur-md text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-green-500/30 transition-all duration-500 text-xl hover:scale-105 transform hover:-translate-y-1"
                >
                  Explore Solutions
                  <svg className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </Link>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">1000+</div>
                  <div className="text-green-200 text-sm uppercase tracking-wider">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">50+</div>
                  <div className="text-green-200 text-sm uppercase tracking-wider">Countries Served</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">99.9%</div>
                  <div className="text-green-200 text-sm uppercase tracking-wider">Uptime Reliability</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-green-200 text-sm uppercase tracking-wider">Technical Support</div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
