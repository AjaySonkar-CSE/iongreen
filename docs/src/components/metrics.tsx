"use client";

import React, { useState } from 'react';
import { Battery, LineChart, Headset, Building, Settings, Users, ArrowRight, ArrowLeft } from 'lucide-react';
import { ScrollAnimate } from '@/components/scroll-animate';

export function MetricsSection() {
  const metrics = [
    { 
      icon: <Battery className="w-8 h-8 text-white" />,
      number: '90,000+',
      label: 'Batteries Produced',
      description: 'High-quality lithium batteries powering homes and businesses worldwide.'
    },
    { 
      icon: <LineChart className="w-8 h-8 text-white" />,
      number: '3GWh+',
      label: 'Production Capacity/year',
      description: 'Massive production capacity to meet global energy demands.'
    },
    { 
      icon: <Headset className="w-8 h-8 text-white" />,
      number: '24/7',
      label: 'Customer Service',
      description: 'Round-the-clock support for all your energy needs.'
    },
    { 
      icon: <Building className="w-8 h-8 text-white" />,
      number: '20 years+',
      label: 'Export Experience',
      description: 'Two decades of excellence in global energy solutions.'
    },
    { 
      icon: <Settings className="w-8 h-8 text-white" />,
      number: '12 - 1000V',
      label: 'Flexible lithium Solutions',
      description: 'Versatile voltage options for diverse applications.'
    },
    { 
      icon: <Users className="w-8 h-8 text-white" />,
      number: '50000+',
      label: 'Served Families',
      description: 'Trusted by thousands of families for reliable energy.'
    },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollAnimate 
          animation="fadeIn" 
          className="text-center mb-16"
          delay={100}
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <div className="w-24 h-1 bg-red-600 mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Delivering innovative energy solutions with proven results across the globe
          </p>
        </ScrollAnimate>

        <div className="space-y-70">
          {/* First row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {metrics.slice(0, 3).map((metric, index) => (
              <div key={`top-${index}`} className="h-full">
                <ScrollAnimate 
                  animation="slideInUp" 
                  delay={100 + (index * 100)}
                  className="h-full"
                  threshold={0.2}
                >
                  <div className="flip-card h-full">
                    <div className="flip-card-inner">
                      {/* Front of the card */}
                      <div className="flip-card-front bg-white rounded-xl p-6 flex flex-col items-center justify-center">
                        <div className="bg-red-600 rounded-lg w-20 h-20 flex items-center justify-center mb-4">
                          {React.cloneElement(metric.icon, { className: "w-10 h-10 text-white" })}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">
                          {metric.number}
                        </h3>
                        {metric.label && (
                          <p className="text-gray-600 text-base">{metric.label}</p>
                        )}
                        <div className="mt-4 text-red-600 text-sm font-medium flex items-center">
                          Learn more <ArrowRight className="ml-1 w-4 h-4" />
                        </div>
                      </div>
                      
                      {/* Back of the card */}
                      <div className="flip-card-back rounded-xl p-6 flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold text-white mb-3 font-playfair">
                          {metric.number}
                        </h3>
                        <p className="text-white/90 text-center mb-4">{metric.description}</p>
                        <div className="text-white/80 text-sm font-medium flex items-center mt-2">
                          <ArrowLeft className="mr-1 w-4 h-4" /> Back
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimate>
              </div>
            ))}
          </div>
          
          {/* Second row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {metrics.slice(3, 6).map((metric, index) => (
              <div key={`bottom-${index}`} className="h-full">
                <ScrollAnimate 
                  animation="slideInUp" 
                  delay={300 + (index * 100)}
                  className="h-full"
                  threshold={0.2}
                >
                  <div className="flip-card h-full">
                    <div className="flip-card-inner">
                      {/* Front of the card */}
                      <div className="flip-card-front bg-white rounded-xl p-6 flex flex-col items-center justify-center">
                        <div className="bg-red-600 rounded-lg w-20 h-20 flex items-center justify-center mb-4">
                          {React.cloneElement(metric.icon, { className: "w-10 h-10 text-white" })}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2 font-playfair">
                          {metric.number}
                        </h3>
                        <p className="text-gray-600 text-base">{metric.label}</p>
                        <div className="mt-4 text-red-600 text-sm font-medium flex items-center">
                          Learn more <ArrowRight className="ml-1 w-4 h-4" />
                        </div>
                      </div>
                      
                      {/* Back of the card */}
                      <div className="flip-card-back rounded-xl p-6 flex flex-col items-center justify-center">
                        <h3 className="text-2xl font-bold text-white mb-3 font-playfair">
                          {metric.number}
                        </h3>
                        <p className="text-white/90 text-center mb-4">{metric.description}</p>
                        <div className="text-white/80 text-sm font-medium flex items-center mt-2">
                          <ArrowLeft className="mr-1 w-4 h-4" /> Back
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollAnimate>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default MetricsSection;
