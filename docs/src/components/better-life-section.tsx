"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function BetterLifeSection() {
  const [hover, setHover] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  
  // New solar energy image
  const images = [
    "/1/ion4.png"
  ];

  useEffect(() => {
    if (hover) {
      const interval = setInterval(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [hover]);

  return (
    <section className="bg-gradient-to-r from-green-50 to-emerald-50 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          {/* Top side - Text content */}
          <div className="w-full">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                BETTER LIFE
              </span>
              <h2 className="mt-4 text-4xl font-bold text-gray-900">
                Commercial Ion Green System
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Transform your energy consumption with our advanced commercial solar solutions designed for maximum efficiency and sustainability.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">Eco-Friendly and Sustainable</h3>
                  <p className="mt-2 text-gray-600">Reduce your carbon footprint while enjoying significant energy cost savings with our environmentally responsible solutions.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">Economical and Efficient</h3>
                  <p className="mt-2 text-gray-600">Maximize your ROI with our cost-effective energy solutions that deliver exceptional performance and long-term value.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900">Intelligent Management</h3>
                  <p className="mt-2 text-gray-600">Smart monitoring and control systems for optimal performance and real-time energy management.</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <Link 
                href="/solutions" 
                className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More About Section
                <svg className="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
          
          {/* Bottom side - Image with hover effect */}
          <div className="w-full h-96 lg:h-[500px] relative overflow-hidden rounded-2xl shadow-2xl">
            <div 
              className={`relative w-full h-full transition-transform duration-1000 ease-in-out transform ${hover ? 'scale-105' : 'scale-100'}`}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Image
                src={images[imageIndex]}
                alt="Ion Green Energy Storage Solutions"
                fill
                className="object-cover transition-opacity duration-1000"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900">ION Green Energy Solutions</h3>
                  <p className="mt-1 text-gray-600">Commercial-grade systems for maximum efficiency</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}