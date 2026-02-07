"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";
import { EnhancedProductShowcase } from "@/components/enhanced-product-showcase";

export function IonGreenHighlights() {
  const stats = [
    { number: "90,000+", label: "Satisfied Customers" },
    { number: "3GWh+", label: "Production Capacity/year" },
    { number: "24/7", label: "Technical Support" },
    { number: "20+", label: "Years Experience" },
    { number: "12-1000V", label: "Flexible Solutions" },
    { number: "50,000+", label: "Systems Installed" },
  ];

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-blue-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59,130,246,0.05) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(59,130,246,0.05) 2px, transparent 2px)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <ScrollReveal direction="down" duration={0.8} delay={0.1}>
            <div className="inline-flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full mb-6 border border-blue-200">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-800 text-sm font-medium uppercase tracking-wider">
                Revolutionizing Energy Storage
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" duration={0.8} delay={0.2}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Powering a Sustainable Future with
              <span className="text-blue-600"> ION Green</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" duration={0.8} delay={0.3}>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              As a leading manufacturer and supplier of lithium batteries, ION Green has consistently been at the forefront of the transition to renewable energy. Over the past years, we've delivered high-performance, cost-effective ION Green lithium battery solutions for residential and commercial applications.
            </p>
          </ScrollReveal>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <ScrollReveal
              key={stat.label}
              direction="up"
              duration={0.6}
              delay={0.1 * index}
            >
              <div className="text-center group">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                  {stat.label === "Satisfied Customers" && (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  )}
                  {stat.label === "Production Capacity/year" && (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )}
                  {stat.label === "Technical Support" && (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 12a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                  )}
                  {stat.label === "Years Experience" && (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  {stat.label === "Flexible Solutions" && (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  {stat.label === "Systems Installed" && (
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                {/* Number */}
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                  {stat.number}
                </div>
                {/* Label */}
                <div className="text-sm text-gray-600 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Enhanced Product Showcase */}
        <EnhancedProductShowcase />

        {/* CTA Section */}
        <ScrollReveal direction="up" duration={0.8} delay={0.7}>
          <div className="text-center">
            <div className="inline-flex flex-wrap gap-4">
              <Link
                href="/products"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Explore Products
              </Link>
              <Link
                href="/contact"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Get Free Quote
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-100/40 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-green-200/30 rounded-full blur-xl"></div>
      </div>
    </section>
  );
}
