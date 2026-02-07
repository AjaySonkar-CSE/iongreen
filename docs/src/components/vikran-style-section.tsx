"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const solutions = [
  {
    title: "Utility-Scale Solar",
    description: "End-to-end EPC solutions for large-scale solar power plants up to 300MWp.",
    icon: "⚡"
  },
  {
    title: "Rooftop Solar",
    description: "Customized rooftop solar solutions for commercial and industrial applications.",
    icon: "🏢"
  },
  {
    title: "Floating Solar",
    description: "Innovative floating solar power plants for optimal land utilization.",
    icon: "🌊"
  },
  {
    title: "Hybrid Solutions",
    description: "Integrated solar + storage solutions for reliable renewable energy.",
    icon: "🔋"
  }
];

export function VikranStyleSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <section ref={ref} className="relative py-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -right-20 top-1/3 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated heading */}
        <motion.div 
          className="text-center mb-16"
          style={{ opacity, y: y1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Comprehensive <span className="text-blue-600">Solar Power</span> Solutions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Delivering end-to-end solar power solutions with cutting-edge technology and sustainable practices
          </p>
        </motion.div>

        {/* Animated cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          style={{ opacity, y: y2, scale }}
        >
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className="text-4xl mb-4">{solution.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{solution.title}</h3>
              <p className="text-slate-600">{solution.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats section */}
        <motion.div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-blue-600 mb-2">300+</div>
            <div className="text-slate-600">MWp Installed</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-slate-600">Efficiency</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-yellow-600 mb-2">24/7</div>
            <div className="text-slate-600">Support</div>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-lg">
            <div className="text-4xl font-bold text-purple-600 mb-2">10+</div>
            <div className="text-slate-600">Years Experience</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
