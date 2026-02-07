"use client";

import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";
import { useEffect, useState } from "react";

interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  features: string[];
  is_active: boolean;
}

export function SolarEastProductShowcase() {
  const [productCategories, setProductCategories] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch("/api/products?all=true");
      const data = await res.json();
      if (data.success) {
        // Group products by category and get unique categories
        const uniqueCategories = data.data.reduce((acc: ProductCategory[], product: any) => {
          const existingCategory = acc.find(cat => cat.category === product.category);
          if (!existingCategory && product.is_active) {
            acc.push({
              id: product.id,
              name: product.category,
              slug: product.category.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              description: product.description || `Explore our ${product.category} solutions`,
              image_url: product.image_url || "/pro1.jpg",
              category: product.category,
              features: Array.isArray(product.features) ? product.features.slice(0, 2) : [],
              is_active: product.is_active
            });
          }
          return acc;
        }, []);
        setProductCategories(uniqueCategories.slice(0, 6)); // Limit to 6 categories
      } else {
        setError("Failed to load products");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Product Portfolio
            </h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-600">Loading products...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Product Portfolio
            </h2>
          </div>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Product Portfolio
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
            Discover our comprehensive range of energy storage and renewable energy solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {productCategories.map((category, index) => (
            <ScrollReveal
              key={category.id}
              direction={index % 2 === 0 ? "right" : "left"}
              duration={1.0}
              delay={0.2 * index}
            >
            <Link
              href={`/products/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-96"
            >
              {/* Full-size image background */}
              <div className="absolute inset-0">
                <Image
                  src={category.image_url}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content overlay - appears on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3">
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {category.features.map((feature, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                    <span>Learn More</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
            </ScrollReveal>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 text-lg md:text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
