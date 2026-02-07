"use client";

import Image from "next/image";
import Link from "next/link";

export function SolarEnergySection() {
  return (
    <section className="py-20 bg-gradient-to-r from-emerald-50 to-green-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12">
          {/* Top side - Content */}
          <div className="w-full">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
                SUSTAINABLE ENERGY
              </span>
              <h2 className="mt-4 text-4xl font-bold text-gray-900">
                Solar Energy Solutions
                <span className="block text-2xl mt-2 font-normal text-gray-600">Harness the Power of the Sun</span>
              </h2>
            </div>
            
            <div className="prose prose-lg text-gray-700 mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                Ion Green provides cutting-edge solar energy solutions that help you reduce your carbon footprint while saving on energy costs. Our systems are designed for maximum efficiency and reliability.
              </p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-lg text-gray-700">High-efficiency solar panels with industry-leading performance</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-lg text-gray-700">Custom solutions for residential, commercial, and industrial applications</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="h-4 w-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="ml-3 text-lg text-gray-700">Smart energy management for optimal performance</span>
                </li>
              </ul>
              
              <div className="mt-10">
                <Link 
                  href="/solutions" 
                  className="inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Explore Solar Solutions
                  <svg className="ml-3 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Bottom side - Image */}
          <div className="w-full">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/3/green6.png"
                alt="Ion Green Solar Energy Solutions"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900">Clean Energy for a Brighter Future</h3>
                  <p className="mt-1 text-gray-600">Advanced solar solutions tailored to your needs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}