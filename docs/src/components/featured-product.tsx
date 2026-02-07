"use client";

import { motion } from 'framer-motion';
import Image from "next/image";
import Link from "next/link";

interface FeaturedProductProps {
  id?: number;
  name?: string;
  slug?: string;
  category?: string;
  description?: string;
  imageUrl?: string;
}

export function FeaturedProduct(props: FeaturedProductProps = {}) {
  const {
    id = 1,
    name = "Premium Lithium Battery System",
    slug = "premium-lithium-battery-system",
    category = "Energy Storage",
    description = "High-performance lithium battery system designed for residential and commercial energy storage applications.",
    imageUrl = "/images/ai-ion-green-battery-installation.jpg",
  } = props;
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
        >
      <div className="relative h-64">
        <Image
          src={imageUrl}
          alt={name || "Featured Product"}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-green-600 font-medium mb-2">{category}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        {description && (
          <p className="text-gray-600 text-sm mb-4">{description}</p>
        )}
        <Link
          href={`/products/${slug}`}
          className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
        >
          Learn More
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
        </motion.div>
      </div>
    </section>
  );
}
