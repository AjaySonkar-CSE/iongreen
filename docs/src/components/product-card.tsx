"use client";

import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';

interface ProductCardProps {
  id: number;
  name: string;
  slug: string;
  category: string;
  description?: string;
  imageUrl?: string;
  isFeatured?: boolean;
}

export function ProductCard({
  id,
  name,
  slug,
  category,
  description,
  imageUrl = "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=85",
  isFeatured = false,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Animation variants
  const cardVariants = {
    initial: {
      y: 50,
      opacity: 0,
      scale: 0.98
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -5,
      boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
      transition: {
        duration: 0.3,
      }
    },
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.5,
      },
    },
  };

  const contentVariants = {
    initial: { y: 0 },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative bg-white rounded-lg overflow-hidden h-full flex flex-col border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
    >
      {isFeatured && (
        <div className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full z-10">
          Featured
        </div>
      )}

      <motion.div
        className="relative h-40 md:h-48 w-full bg-gray-50 flex items-center justify-center p-3 md:p-4"
        variants={imageVariants}
      >
        <div className="relative w-full h-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-contain p-2 md:p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={90}
          />
        </div>
      </motion.div>

      <motion.div
        className="p-4 md:p-5 flex-1 flex flex-col border-t border-gray-100"
        variants={contentVariants}
      >
        <div className="text-[10px] md:text-sm font-medium text-blue-600 mb-1 uppercase tracking-wider">
          {category}
        </div>

        <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2 leading-snug">
          <Link
            href={`/products/${slug}`}
            className="hover:text-blue-600 transition-colors duration-200"
          >
            <span aria-hidden="true" className="absolute inset-0" />
            {name}
          </Link>
        </h3>

        {description && (
          <p className="text-gray-500 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        <div className="mt-auto pt-2 md:pt-3">
          <div className="flex flex-col space-y-1.5 md:space-y-2">
            <Link
              href={`/products/${slug}`}
              className="w-full px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-medium rounded transition-colors duration-200 text-center flex items-center justify-center gap-2"
            >
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-3.5 md:w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <a
              href="tel:9202636627"
              className="text-center text-blue-600 hover:text-blue-800 text-[10px] md:text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-1.5 underline underline-offset-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              Contact Sales
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
