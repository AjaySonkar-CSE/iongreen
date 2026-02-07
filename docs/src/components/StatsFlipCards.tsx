'use client';

import React from 'react';
import { FlipCard } from './ui/flip-card';
import { motion } from 'framer-motion';
import { FaBatteryFull, FaChartLine, FaHeadset, FaIndustry, FaCog, FaHome } from 'react-icons/fa';
import { ScrollAnimation } from './ui/scroll-animation';

const stats = [
  {
    id: 1,
    value: '90,000+',
    title: 'Batteries Produced',
    icon: <FaBatteryFull className="text-4xl mb-2" />,
    backContent: 'High-quality batteries for various applications'
  },
  {
    id: 2,
    value: '3GWh+',
    title: 'Production Capacity/Year',
    icon: <FaChartLine className="text-4xl mb-2" />,
    backContent: 'Meeting global energy storage demands'
  },
  {
    id: 3,
    value: '24/7',
    title: 'Customer Service',
    icon: <FaHeadset className="text-4xl mb-2" />,
    backContent: 'Round-the-clock support for all your needs'
  },
  {
    id: 4,
    value: '20 years+',
    title: 'Export Experience',
    icon: <FaIndustry className="text-4xl mb-2" />,
    backContent: 'Serving customers worldwide with excellence'
  },
  {
    id: 5,
    value: '12 - 1000V',
    title: 'Flexible Solutions',
    icon: <FaCog className="text-4xl mb-2" />,
    backContent: 'Customizable solutions for diverse requirements'
  },
  {
    id: 6,
    value: '50,000+',
    title: 'Served Families',
    icon: <FaHome className="text-4xl mb-2" />,
    backContent: 'Powering homes with reliable energy solutions'
  }
];

export function StatsFlipCards() {
  return (
    <div className="py-32 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className={stat.id <= 3 ? "mb-32" : ""}
            >
              <ScrollAnimation 
                delay={stat.id * 0.1}
                direction="up"
                amount={0.2}
              >
              <FlipCard
                flipOnHover={true}
                flipOnScroll={true}
                delay={stat.id * 100}
                front={
                  <div className="p-6 h-full flex flex-col items-center justify-center text-center h-48">
                    <div className="text-red-600 mb-4">
                      {React.cloneElement(stat.icon, { className: 'text-5xl' })}
                    </div>
                    <h3 className="text-3xl font-bold mb-2 text-gray-800">{stat.value}</h3>
                    <p className="text-lg font-medium text-gray-600">{stat.title}</p>
                  </div>
                }
                back={
                  <div className="bg-white p-6 h-full flex flex-col items-center justify-center text-center">
                    <div className="text-red-600 mb-4">
                      {React.cloneElement(stat.icon, { className: 'text-5xl' })}
                    </div>
                    <p className="text-lg font-medium text-gray-800 mb-2">{stat.title}</p>
                    <p className="text-sm text-gray-600">{stat.backContent}</p>
                  </div>
                }
                className="h-full"
              />
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
