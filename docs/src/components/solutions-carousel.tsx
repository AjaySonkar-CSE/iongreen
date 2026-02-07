'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './solutions-carousel.module.css';

type SolutionCard = {
  id: number;
  title: string;
  description: string;
  image: string;
  country?: string;
};

const solutions: SolutionCard[][] = [
  [
    {
      id: 1,
      title: 'Residential Energy Storage',
      description: 'Efficient and reliable energy storage for homes',
      image: '/1/ion1.png',
      country: 'Malawi'
    },
    {
      id: 2,
      title: 'Commercial Solutions',
      description: 'Power your business with sustainable energy',
      image: '/1/ion2.png',
      country: 'Czech Republic'
    },
    {
      id: 3,
      title: 'Industrial Storage',
      description: 'Heavy-duty energy solutions for industries',
      image: '/1/Screenshot 2025-12-08 114353.png',
      country: 'Philippines'
    }
  ],
  [
    {
      id: 4,
      title: 'Utility Scale',
      description: 'Large-scale energy storage solutions',
      image: '/2/green.png',
      country: 'Germany'
    },
    {
      id: 5,
      title: 'Renewable Integration',
      description: 'Seamlessly integrate renewable energy sources',
      image: '/3/green1.png',
      country: 'USA'
    },
    {
      id: 6,
      title: 'Grid Services',
      description: 'Advanced solutions for grid stability',
      image: '/3/green2.png',
      country: 'Japan'
    }
  ]
];

export function SolutionsCarousel() {
  const [isClient, setIsClient] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  // Ensure this only runs on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % solutions.length);
    setExpandedCard(null);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + solutions.length) % solutions.length);
    setExpandedCard(null);
  };

  const goToPage = (index: number) => {
    setCurrentPage(index);
    setExpandedCard(null);
  };

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  if (!isClient) {
    // Return a simplified version for server-side rendering
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Solutions
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Innovative energy storage solutions for every need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {solutions[0]?.map((solution) => (
              <div key={solution.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="relative h-64 bg-gray-100">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    width={400}
                    height={256}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Our Solutions
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Innovative energy storage solutions for every need
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {solutions[currentPage]?.map((solution) => (
              <div 
                key={solution.id} 
                className={`${styles.card} ${expandedCard === solution.id ? styles.cardExpanded : ''}`}
                onClick={() => toggleCard(solution.id)}
              >
                <div className={styles.imageContainer}>
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    width={400}
                    height={256}
                    className={styles.image}
                    priority
                  />
                  <div className={`${styles.overlay} ${expandedCard === solution.id ? styles.overlayHidden : ''}`}>
                    <div className={styles.overlayContent}>
                      <h3 className={styles.title}>{solution.title}</h3>
                      <div className={styles.learnMore}>
                        <span>Learn more</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {solution.country && (
                    <div className={styles.countryBadge}>
                      {solution.country}
                    </div>
                  )}
                </div>
                <div className={`${styles.cardContent} ${expandedCard === solution.id ? styles.cardContentExpanded : ''}`}>
                  <h3 className={styles.contentTitle}>{solution.title}</h3>
                  <p className={styles.contentDescription}>{solution.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {solutions.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-3 h-3 rounded-full ${currentPage === index ? 'bg-red-600' : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
