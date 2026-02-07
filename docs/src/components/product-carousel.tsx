'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const products = [
  {
    id: 1,
    name: 'B-LFP48-300PW',
    category: 'Low Voltage',
    image: '/2/green.png',
    description: 'High-performance lithium battery for residential and commercial use.',
    href: '/products/b-lfp48-300pw'
  },
  {
    id: 2,
    name: 'B-LFP51-400PW',
    category: 'High Voltage',
    image: '/3/green1.png',
    description: 'Advanced energy storage solution for industrial applications.',
    href: '/products/b-lfp51-400pw'
  },
  {
    id: 3,
    name: 'B-LFP52-500PW',
    category: 'Low Voltage',
    image: '/3/green2.png',
    description: 'Compact and efficient power solution for modern homes.',
    href: '/products/b-lfp52-500pw'
  },
  {
    id: 4,
    name: 'B-LFP53-600PW',
    category: 'High Voltage',
    image: '/3/green3.png',
    description: 'Heavy-duty battery system for large-scale energy storage.',
    href: '/products/b-lfp53-600pw'
  },
  {
    id: 5,
    name: 'B-LFP54-700PW',
    category: 'Commercial',
    image: '/3/green1.png',
    description: 'Commercial-grade battery system for businesses.',
    href: '/products/b-lfp54-700pw'
  },
  {
    id: 6,
    name: 'B-LFP55-800PW',
    category: 'Industrial',
    image: '/3/green2.png',
    description: 'Industrial power solutions for heavy machinery.',
    href: '/products/b-lfp55-800pw'
  }
];

// Number of products to show per page
const PRODUCTS_PER_PAGE = 4;

export function ProductCarousel() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [isHovered, totalPages]);

  const nextPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  // Get current products to display
  const currentProducts = products.slice(
    currentPage * PRODUCTS_PER_PAGE,
    (currentPage + 1) * PRODUCTS_PER_PAGE
  );

  return (
    <section className="py-16 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Our Products
          </h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-3xl mx-auto">
            High-performance lithium battery systems for residential, commercial, and industrial applications
          </p>
        </div>

        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {currentProducts.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <Link href={product.href} className="block flex-grow">
                  <div className="relative pt-[100%] bg-gray-100">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </div>
                </Link>
                <div className="p-4 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 text-xs font-medium text-white bg-green-600 rounded-sm mb-2">
                        {product.category}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-2">
                    <Link 
                      href={product.href}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded transition-colors duration-300 text-sm font-medium flex items-center justify-center"
                    >
                      Read More
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <a 
                      href="tel:+1234567890" 
                      className="flex-1 bg-white border border-green-600 text-green-600 hover:bg-green-50 text-center py-2 px-4 rounded transition-colors duration-300 text-sm font-medium flex items-center justify-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation Arrows - Only show if more than one page */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 text-gray-700 w-10 h-10 rounded-full items-center justify-center shadow-md z-10 transition-all duration-300"
                aria-label="Previous page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextPage}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 text-gray-700 w-10 h-10 rounded-full items-center justify-center shadow-md z-10 transition-all duration-300"
                aria-label="Next page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPage === index ? 'bg-green-600 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href="/products" 
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-sm shadow-md text-white bg-green-600 hover:bg-green-700 focus:outline-none transition-all duration-300 hover:shadow-lg"
          >
            View All Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
