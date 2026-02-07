"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

// Manufacturing bases data
const manufacturingBases = [
  { 
    name: "Advanced Assembly & Testing Infrastructure", 
    description: "Dedicated production lines equipped with modern assembly tools and comprehensive testing systems to ensure consistent performance, safety, and reliability of all delivered solutions.", 
    image: "/ss1.jpg" 
  },
  { 
    name: "Automated Module Integration", 
    description: "Automation-supported module assembly processes enabling high precision, repeatability, and scalable production while maintaining stringent quality benchmarks.", 
    image: "/ss2.jpg" 
  },
  { 
    name: "Robust Quality Management & Control", 
    description: "Multi-stage inspection, validation, and traceability processes implemented across manufacturing and integration stages to ensure product consistency and long-term operational reliability.", 
    image: "/ss3.jpg" 
  },
  { 
    name: "Alignment with Global Standards", 
    description: "Manufacturing processes and system designs developed in alignment with applicable international standards and certification pathways, including UL, IEC, and relevant regional requirements, subject to project scope.", 
    image: "/ss4.jpg" 
  },
  { name: "Tibet Base", description: "Strategic location facility", image: "/ss5.jpg" }
];

export function SolarEastCompanyProfile() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50/30">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Company Profile Header */}
        <div className="text-center mb-16">
          <ScrollReveal direction="down" duration={0.8} delay={0.1}>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-montserrat leading-tight">
              Company Profile
            </h2>
          </ScrollReveal>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          <ScrollReveal direction="up" duration={0.8} delay={0.1}>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 font-montserrat">26</div>
              <div className="text-sm md:text-base text-gray-600 font-roboto uppercase tracking-wider">Years Experience</div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" duration={0.8} delay={0.2}>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 font-montserrat">6000+</div>
              <div className="text-sm md:text-base text-gray-600 font-roboto uppercase tracking-wider">Employees</div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" duration={0.8} delay={0.3}>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 font-montserrat">2GWh</div>
              <div className="text-sm md:text-base text-gray-600 font-roboto uppercase tracking-wider">Annual Production</div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" duration={0.8} delay={0.4}>
            <div className="text-center bg-white rounded-2xl p-6 shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 font-montserrat">5</div>
              <div className="text-sm md:text-base text-gray-600 font-roboto uppercase tracking-wider">Production Bases</div>
            </div>
          </ScrollReveal>
        </div>

        {/* Manufacturing Strength Section */}
        <div className="mb-20">
          <ScrollReveal direction="down" duration={0.8} delay={0.1}>
            <h3 className="text-2xl md:text-4xl font-bold text-gray-900 mb-12 text-center font-montserrat">
              Manufacturing Strength
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {manufacturingBases.map((base, index) => (
              <ScrollReveal
                key={base.name}
                direction="up"
                duration={0.8}
                delay={0.1 * index}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-center">
                    <div className="w-16 h-16 rounded-xl overflow-hidden mr-4 flex-shrink-0">
                      <Image
                        src={base.image}
                        alt={base.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 font-montserrat">{base.name}</h4>
                      <p className="text-sm text-gray-600 font-roboto">{base.description}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <Link
          href="/solutions"
          className="inline-flex items-center px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 font-montserrat hover:scale-105"
        >
          Learn More
          <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
