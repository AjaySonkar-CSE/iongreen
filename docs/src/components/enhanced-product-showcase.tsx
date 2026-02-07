"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

// Data images for product cards
const dataImages = [
  "/data1.jpg.jpg",
  "/data2.jpg.jpg",
  "/data3.jpg.jpg",
  "/data4.jpg.jpg",
  "/data5.jpg.jpg",
];

export function EnhancedProductShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const allProducts = [
    {
      id: 1,
      name: "B-LFP48-100E",
      category: "Low Voltage",
      image: "/images/battery-product-1.jpg",
      description: "High-performance 48V lithium battery system",
      specs: "5kWh • 100Ah • 48V",
      price: "Starting at $1,299",
      features: ["Long cycle life", "Smart BMS", "Wall-mountable"]
    },
    {
      id: 2,
      name: "Li-PRO 5120",
      category: "Low Voltage",
      image: "/images/battery-product-2.jpg",
      description: "Professional grade energy storage solution",
      specs: "5.12kWh • 100Ah • 51.2V",
      price: "Starting at $1,499",
      features: ["Expandable", "LCD Display", "WiFi Monitoring"]
    },
    {
      id: 3,
      name: "Lithium Home Battery",
      category: "Low Voltage",
      image: "/images/battery-product-3.jpg",
      description: "Perfect for residential energy storage",
      specs: "10kWh • 200Ah • 48V",
      price: "Starting at $2,299",
      features: ["Home integration", "Backup power", "ION Green ready"]
    },
    {
      id: 4,
      name: "B-LFP48-300PW",
      category: "Low Voltage",
      image: "/images/battery-product-4.jpg",
      description: "Powerful 48V battery with advanced features",
      specs: "15kWh • 300Ah • 48V",
      price: "Starting at $3,499",
      features: ["High capacity", "Parallel connection", "App control"]
    },
    {
      id: 5,
      name: "PowerLine-5",
      category: "Low Voltage",
      image: "/images/battery-product-5.jpg",
      description: "Reliable power for critical applications",
      specs: "5kWh • 100Ah • 48V",
      price: "Starting at $1,199",
      features: ["Industrial grade", "Wide temperature", "Maintenance free"]
    },
    {
      id: 6,
      name: "MatchBox HVS",
      category: "High Voltage",
      image: "/images/battery-product-6.jpg",
      description: "High voltage stackable battery system",
      specs: "10kWh • 100Ah • 400V",
      price: "Starting at $2,999",
      features: ["Stackable design", "High voltage", "Commercial grade"]
    },
    {
      id: 7,
      name: "ESS-GRID HV PACK",
      category: "High Voltage",
      image: "/images/battery-product-7.jpg",
      description: "Grid-tied high voltage energy storage",
      specs: "50kWh • 125Ah • 400V",
      price: "Starting at $8,999",
      features: ["Grid compatible", "High efficiency", "Scalable"]
    },
    {
      id: 8,
      name: "ESS-BATT 215C",
      category: "High Voltage",
      image: "/images/battery-product-8.jpg",
      description: "Commercial battery with advanced cooling",
      specs: "215kWh • 280Ah • 768V",
      price: "Starting at $24,999",
      features: ["Liquid cooling", "High power", "Container ready"]
    },
    {
      id: 9,
      name: "ESS-GRID C215",
      category: "High Voltage",
      image: "/images/battery-product-9.jpg",
      description: "Containerized energy storage system",
      specs: "215kWh • 280Ah • 768V",
      price: "Starting at $26,999",
      features: ["Turnkey solution", "Outdoor rated", "Fast deployment"]
    },
    {
      id: 10,
      name: "PowerMax-100",
      category: "High Voltage",
      image: "/images/battery-product-10.jpg",
      description: "Maximum power density battery system",
      specs: "100kWh • 139Ah • 720V",
      price: "Starting at $14,999",
      features: ["High power output", "Modular design", "Remote monitoring"]
    }
  ];

  const totalPages = Math.ceil(allProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = allProducts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top of product section
    const element = document.getElementById('product-showcase');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  return (
    <section id="product-showcase" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Sungrow Power style typography */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 font-montserrat leading-tight">
            Get Efficient Lithium Ion Green
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto font-roboto leading-relaxed font-normal">
            Global ESS Battery Supplier - Discover our comprehensive range of high-performance energy storage solutions
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
          {currentProducts.map((product, index) => (
            <ScrollReveal
              key={product.id}
              direction="up"
              duration={0.6}
              delay={0.1 * index}
            >
              <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
                {/* Product Image */}
                <div className="relative h-32 w-full">
                  <Image
                    src={dataImages[index % dataImages.length]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Product
                  </div>
                </div>

                {/* Product Content - Corporate typography style */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 font-montserrat leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow font-roboto leading-relaxed">
                    {product.description}
                  </p>
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors text-left mt-auto font-roboto">
                    Learn More →
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          {/* Results Info */}
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, allProducts.length)} of {allProducts.length} products
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* View All Products CTA - Corporate button style */}
        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-lg md:text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 font-montserrat"
          >
            View All Products
            <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
