"use client";

import { Battery, LineChart, Headset, Building, Settings, Zap } from 'lucide-react';

export function MetricsSection() {
  const metrics = [
    {
      icon: <Battery className="w-8 h-8 text-white" />,
      value: "90,000+",
      description: ""
    },
    {
      icon: <LineChart className="w-8 h-8 text-white" />,
      value: "3GWh+",
      description: "Production Capacity/year"
    },
    {
      icon: <Headset className="w-8 h-8 text-white" />,
      value: "24/7",
      description: "Customer Service"
    },
    {
      icon: <Building className="w-8 h-8 text-white" />,
      value: "20 years+",
      description: "Export Experience"
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      value: "12 - 1000V",
      description: "Flexible lithium Solutions"
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      value: "50000+",
      description: "Served Families"
    }
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 md:p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center mb-3">
                {metric.icon}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {metric.value}
              </h3>
              {metric.description && (
                <p className="text-sm md:text-base text-gray-600">
                  {metric.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
