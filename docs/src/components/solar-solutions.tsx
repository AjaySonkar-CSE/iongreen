"use client";

import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";
import { useEffect, useState } from "react";

interface Solution {
  id: number;
  title: string;
  slug: string;
  summary: string;
  description: string;
  image_url: string;
  category: string;
  is_active: boolean;
}

const SolarSolutions: React.FC = () => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSolutions();
  }, []);

  async function fetchSolutions() {
    try {
      const res = await fetch("/api/solutions");
      const data = await res.json();
      if (data.success) {
        setSolutions(data.data.slice(0, 6)); // Limit to 6 solutions
      } else {
        setError("Failed to load solutions");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load solutions");
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
              Our Solutions
            </h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-600">Loading solutions...</div>
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
              Our Solutions
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
            Our Solutions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <ScrollReveal
              key={solution.id}
              direction={index % 2 === 0 ? "right" : "left"}
              duration={1.0}
              delay={0.2 * index}
            >
              <Link
                href={`/solutions/${solution.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-64"
              >
                {/* Full-size image background */}
                <div className="absolute inset-0">
                  <Image
                    src={solution.image_url}
                    alt={solution.title}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content overlay - appears on hover at top */}
                <div className="absolute inset-0 flex flex-col justify-start p-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 mt-2">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {solution.title}
                    </h3>

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
      </div>
    </section>
  );
};

export default SolarSolutions;