'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from "./enhanced-scroll-reveal";
import { Award, Users, Battery, Factory } from 'lucide-react';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
}

const AnimatedCounter = ({ value, suffix = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000; // 2 seconds
    const start = 0;
    const end = value;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentCount = Math.floor(progress * end);
      
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };
    
    animate();
  }, [isInView, value]);

  return (
    <span ref={ref} className="inline-block">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

interface StatCardProps {
  value: number;
  label: string;
  icon: React.ComponentType<{ size: number; strokeWidth: number; className?: string }>;
  delay: number;
  suffix?: string;
}

const StatCard = ({ value, label, icon: Icon, delay, suffix = '' }: StatCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative group"
  >
    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
    <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border border-white/80 overflow-hidden">
      <div className="absolute top-4 right-4 text-green-100 group-hover:text-green-500 transition-colors duration-500">
        <Icon size={48} strokeWidth={1.5} className="opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
      </div>
      <div className="relative z-10">
        <div className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3 font-montserrat">
          <AnimatedCounter value={value} suffix={suffix} />
        </div>
        <div className="text-sm md:text-base text-gray-600 font-semibold uppercase tracking-wider">
          {label}
        </div>
      </div>
    </div>
  </motion.div>
);

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="mx-auto max-w-[1600px] px-4 md:px-6 lg:px-10 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Impact in Numbers</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard 
            value={26} 
            label="Years Experience" 
            icon={Award} 
            delay={0.1}
            suffix="+"
          />
          
          <StatCard 
            value={6000} 
            label="Global Employees" 
            icon={Users} 
            delay={0.2}
            suffix="+"
          />
          
          <StatCard 
            value={2} 
            label="Annual Production" 
            icon={Battery} 
            delay={0.3}
            suffix="GWh"
          />
          
          <StatCard 
            value={5} 
            label="Production Bases" 
            icon={Factory} 
            delay={0.4}
          />
        </div>
      </div>
    </section>
  );
}
