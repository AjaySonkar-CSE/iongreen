"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

interface LabEquipmentItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
}

const LabEquipmentShowcase: React.FC = () => {
  // Static lab equipment data with the new images
  const staticEquipmentItems: LabEquipmentItem[] = [
    {
      id: 1,
      name: "Advanced Microscope System",
      slug: "advanced-microscope",
      description: "High-precision microscope with digital imaging capabilities for detailed analysis.",
      image_url: "/bal1.jpeg"
    },
    {
      id: 2,
      name: "Centrifuge Machine",
      slug: "centrifuge-machine",
      description: "High-speed centrifuge for separating substances of different densities.",
      image_url: "/bal2.jpeg"
    },
    {
      id: 3,
      name: "Spectrophotometer",
      slug: "spectrophotometer",
      description: "Accurate measurement of light intensity for various wavelengths.",
      image_url: "/bal3.jpeg"
    },
    {
      id: 4,
      name: "Autoclave Sterilizer",
      slug: "autoclave-sterilizer",
      description: "High-pressure steam sterilizer for laboratory equipment and supplies.",
      image_url: "/bal4.jpeg"
    },
    {
      id: 5,
      name: "PCR Thermal Cycler",
      slug: "pcr-thermal-cycler",
      description: "Precise temperature control for DNA amplification and analysis.",
      image_url: "/bal5.jpeg"
    },
    {
      id: 6,
      name: "Laboratory Incubator",
      slug: "laboratory-incubator",
      description: "Temperature-controlled environment for cell culture and microbiological work.",
      image_url: "/bal6.jpeg"
    },
    {
      id: 7,
      name: "Electrophoresis System",
      slug: "electrophoresis-system",
      description: "For separating DNA, RNA, or protein molecules based on their size and charge.",
      image_url: "/bal1.jpeg" // Reusing image or can be replaced with a new one
    },
    {
      id: 8,
      name: "Microplate Reader",
      slug: "microplate-reader",
      description: "High-throughput detection for various biological and chemical assays.",
      image_url: "/bal2.jpeg" // Reusing image or can be replaced with a new one
    },
    {
      id: 9,
      name: "Laminar Flow Hood",
      slug: "laminar-flow-hood",
      description: "Sterile work environment for sensitive procedures and sample preparation.",
      image_url: "/bal3.jpeg" // Reusing image or can be replaced with a new one
    }
  ];

  const [equipmentItems, setEquipmentItems] = useState<LabEquipmentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLabEquipment();
  }, []);

  async function fetchLabEquipment() {
    setLoading(true);
    try {
      const res = await fetch("/api/lab-equipment");
      const data = await res.json();
      if (data.success) {
        setEquipmentItems(data.data.slice(0, 9)); // Limit to 9 items
      } else {
        setError("Failed to load lab equipment");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Failed to load lab equipment");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Lab Equipment
            </h2>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse text-gray-600">Loading lab equipment...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Lab Equipment
            </h2>
          </div>
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Lab Equipment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            High-quality laboratory equipment for all your research and testing needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipmentItems.map((item, index) => (
            <ScrollReveal
              key={item.id}
              direction={index % 2 === 0 ? "right" : "left"}
              duration={1.0}
              delay={0.2 * index}
            >
            <div 
              className="group relative overflow-hidden rounded-2xl shadow-lg h-96 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    <Link href={`/lab-equipment/${item.slug}`} className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300 cursor-pointer">
                      <span>Learn More</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/lab-equipment"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
          >
            Contact Us for More Equipment
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LabEquipmentShowcase;
