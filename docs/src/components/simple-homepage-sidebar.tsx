"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

const innovationCards = [
  {
    image: "/pro1.jpg",
    title: "Advanced Battery Technology",
    description: "Cutting-edge lithium-ion battery systems with superior energy density and safety features for residential and commercial applications.",
    features: ["High Energy Density", "Advanced Safety", "Long Cycle Life", "Smart BMS"],
    icon: "⚡"
  },
  {
    image: "/pro2.jpg",
    title: "Sustainable Energy Solutions",
    description: "Comprehensive clean energy solutions for residential, commercial, and industrial applications with seamless grid integration.",
    features: ["Solar Integration", "Grid Stability", "Energy Management", "Scalable Systems"],
    icon: "🌱"
  },
  {
    image: "/lab1.jpg",
    title: "Innovation & Research",
    description: "Continuous investment in R&D to deliver next-generation energy storage technologies and breakthrough innovations.",
    features: ["Research Labs", "Innovation Center", "Quality Testing", "Global Standards"],
    icon: "🔬"
  },
  {
    image: "/lab2.jpg",
    title: "Global Manufacturing",
    description: "State-of-the-art production facilities ensuring highest quality and reliability standards across all product lines.",
    features: ["Automated Production", "Quality Control", "Environmental Standards", "Global Supply"],
    icon: "🏭"
  }
];

export function SimpleHomepageSidebar() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-green-50/30 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <ScrollReveal direction="down" duration={1.0}>
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 font-montserrat leading-tight">
              Innovation in <span className="text-green-600">Motion</span>
            </h2>
            <h3 className="text-2xl lg:text-3xl font-semibold text-green-700 mb-6 font-montserrat">
              Experience ION Green Technology
            </h3>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-roboto">
              Discover how our advanced lithium battery solutions bring sustainable energy to life through innovative technology and seamless integration. Our cutting-edge energy storage systems are designed to power the future of clean energy.
            </p>
          </div>
        </ScrollReveal>

        {/* Innovation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {innovationCards.map((card, index) => (
            <ScrollReveal
              key={index}
              direction={index % 2 === 0 ? "right" : "left"}
              duration={0.8}
              delay={0.2 * index}
            >
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl border border-gray-100 hover:border-green-200 transition-all duration-700 hover:scale-105 overflow-hidden group">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Icon overlay */}
                  <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-2xl">{card.icon}</span>
                  </div>

                  {/* Title overlay on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <h4 className="text-white text-xl font-bold mb-2">{card.title}</h4>
                    <p className="text-white/90 text-sm">{card.description}</p>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 font-montserrat group-hover:text-green-600 transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {card.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {card.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <Link
                      href="/products"
                      className="inline-flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors duration-300"
                    >
                      Learn More
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Section Header */}
        <ScrollReveal direction="down" duration={0.8} delay={0.4}>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 px-6 py-2 rounded-full mb-4 border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-green-800 text-sm font-medium uppercase tracking-wider">
                Our Commitment
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-montserrat">
              Building a <span className="text-green-600">Sustainable Future</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Pioneering clean energy solutions that power progress while protecting our planet
            </p>
          </div>
        </ScrollReveal>

        {/* Our Commitment Section */}
        <ScrollReveal direction="up" duration={1.0} delay={0.8}>
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1">
              {/* Top Row - Image */}
              <div className="relative h-80 lg:h-auto">
                <Image
                  src="/image2.png"
                  alt="Our Commitment to Sustainability"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/70 via-green-800/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-3xl md:text-4xl font-bold mb-3">Our Commitment to a Greener Future</h3>
                  <p className="text-green-100">Pioneering sustainable energy solutions for tomorrow's world</p>
                </div>
              </div>

              {/* Bottom Row - Content */}
              <div className="p-8 md:p-12">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900">Why Choose ION Green?</h4>
                </div>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-lg font-semibold text-gray-900">Cutting-Edge Technology</h5>
                      <p className="mt-1 text-gray-600">Advanced lithium battery systems with industry-leading energy density and safety features.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-lg font-semibold text-gray-900">Sustainable Solutions</h5>
                      <p className="mt-1 text-gray-600">Eco-friendly energy storage solutions that reduce carbon footprint and promote renewable energy adoption.</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-3">
                      <h5 className="text-lg font-semibold text-gray-900">Global Support</h5>
                      <p className="mt-1 text-gray-600">Dedicated technical support and service network across multiple countries.</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/about"
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300 flex-1 text-center"
                  >
                    Learn About Us
                  </Link>
                  <Link
                    href="/contact"
                    className="px-6 py-3 border-2 border-green-600 text-green-700 hover:bg-green-50 font-semibold rounded-lg transition-all duration-300 flex-1 text-center"
                  >
                    Contact Our Team
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}