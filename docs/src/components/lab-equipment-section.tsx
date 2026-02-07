"use client";

import { SectionHeading } from "@/components/section-heading";
import Image from "next/image";

export function LabEquipmentSection() {
  const equipmentItems = [
    {
      title: "Solar Panel Testing Equipment",
      description: "Advanced equipment for testing efficiency, durability, and performance of solar panels under various conditions.",
      image: "/lab1.jpg",
    },
    {
      title: "Battery Storage Analysis System",
      description: "Comprehensive systems for analyzing battery performance, capacity, and lifecycle for energy storage solutions.",
      image: "/lab2.jpg",
    },
    {
      title: "Photovoltaic Cell Inspection Tools",
      description: "Precision instruments for inspecting photovoltaic cells for defects, efficiency mapping, and quality control.",
      image: "/lab3.jpg",
    },
    {
      title: "Environmental Testing Chambers",
      description: "Climate-controlled chambers for testing solar equipment performance under extreme temperature and humidity conditions.",
      image: "/lab4.jpg",
    },
    {
      title: "Solar Irradiance Measurement Devices",
      description: "Accurate instruments for measuring solar irradiance and spectral distribution for optimal system design.",
      image: "/lab5.jpg",
    },
    {
      title: "Grid Integration Test Systems",
      description: "Specialized equipment for testing grid-tie inverters and ensuring compliance with electrical standards.",
      image: "/lab6.jpg",
    },
    {
      title: "Advanced Energy Monitoring",
      description: "State-of-the-art systems for real-time monitoring and analysis of energy production and consumption.",
      image: "/lab7.jpg",
    },
    {
      title: "Quality Control Instruments",
      description: "High-precision tools for ensuring the highest quality standards in solar panel manufacturing.",
      image: "/lab8.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Lab Equipment"
          title="State-of-the-Art Laboratory Equipment"
          description="ION Green utilizes cutting-edge testing equipment to ensure the highest quality and performance standards for our energy storage products."
        />
        
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {equipmentItems.map((item, index) => (
            <div key={index} className="overflow-hidden rounded-2xl border border-green-100 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
              <div className="h-56 w-full relative overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-6">
                  <a 
                    href="#" 
                    className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                  >
                    Learn more
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}