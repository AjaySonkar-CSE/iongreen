'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

const batteryProducts = [
  {
    id: 1,
    title: 'LI-PRO 5120',
    description: 'High-performance lithium battery with advanced BMS',
    voltage: '48V',
    capacity: '100Ah',
    energy: '5.12kWh',
    cycles: '6000+',
    image: '/data1.jpg.jpg',
    features: [
      'Long cycle life',
      'High energy density',
      'Wide temperature range',
      'Modular design'
    ]
  },
  {
    id: 2,
    title: 'LI-PRO 10240',
    description: 'High-capacity energy storage solution',
    voltage: '48V',
    capacity: '200Ah',
    energy: '10.24kWh',
    cycles: '6000+',
    image: '/data2.jpg.jpg',
    features: [
      'Expandable capacity',
      'Smart monitoring',
      'High discharge rate',
      'IP65 protection'
    ]
  },
  {
    id: 3,
    title: 'LI-PRO 20480',
    description: 'Commercial-grade energy storage',
    voltage: '51.2V',
    capacity: '400Ah',
    energy: '20.48kWh',
    cycles: '6000+',
    image: '/data3.jpg.jpg',
    features: [
      'Scalable architecture',
      'Advanced thermal management',
      'Grid-tie ready',
      '10-year warranty'
    ]
  }
];

export function BatteryShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === batteryProducts.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isHovered) return;

    const timer = setTimeout(() => {
      goToNext();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex, isHovered, goToNext]);

  const currentProduct = batteryProducts[currentIndex];

  return (
    <section className="relative py-16 bg-gray-900 overflow-hidden">
      {/* Diagonal pattern background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(255,255,255,0.02)_25%,_transparent_25%),_linear-gradient(-45deg,_rgba(255,255,255,0.02)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgba(255,255,255,0.02)_75%),_linear-gradient(-45deg,_transparent_75%,_rgba(255,255,255,0.02)_75%)] bg-[size:20px_20px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Top side - Content */}
          <div className="w-full text-white mb-10">
            <div className="max-w-lg mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Get Efficient Lithium <span className="text-red-600">Solar Batteries</span>
              </h2>
              <p className="text-gray-300 text-lg mb-8">
                {currentProduct.description}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-red-500 text-2xl font-bold mb-1">01</div>
                  <h3 className="text-white font-semibold mb-2">Low Voltage</h3>
                  <p className="text-gray-400 text-sm">Residential & Commercial</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <div className="text-red-500 text-2xl font-bold mb-1">02</div>
                  <h3 className="text-white font-semibold mb-2">High Voltage</h3>
                  <p className="text-gray-400 text-sm">Industrial & Utility Scale</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-md font-medium transition-colors">
                  Request a Quote
                </button>
                <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-md font-medium transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>

          {/* Bottom side - Product Image */}
          <div className="w-full relative">
            <div className="relative h-[280px] w-full">
              <Image
                src={currentProduct.image}
                alt={currentProduct.title}
                fill
                className="object-contain transition-opacity duration-500"
                priority
              />
            </div>
            
            {/* Product details */}
            <div className="bg-gray-800 p-6 rounded-lg mt-6">
              <h3 className="text-2xl font-bold text-white mb-4">{currentProduct.title}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Voltage</p>
                  <p className="text-white font-medium">{currentProduct.voltage}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Capacity</p>
                  <p className="text-white font-medium">{currentProduct.capacity}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Energy</p>
                  <p className="text-white font-medium">{currentProduct.energy}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Cycles</p>
                  <p className="text-white font-medium">{currentProduct.cycles}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-12 space-x-2">
          {batteryProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-red-600 w-8' : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
