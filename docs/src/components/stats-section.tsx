'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollReveal } from "./enhanced-scroll-reveal";
import { Award, Users, Battery, Factory } from 'lucide-react';
import { StaggeredText } from './ui/text-animations';

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
    initial={{ opacity: 0, scale: 0.9, y: 30 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    className="relative group h-full"
  >
    <div className="absolute -inset-2 bg-gradient-to-br from-green-500/20 to-emerald-500/0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700"></div>
    <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-700 hover:-translate-y-2 border border-white/60 overflow-hidden flex flex-col justify-between">
      {/* Decorative inner circle */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-1000 ease-out"></div>

      <div className="relative z-10">
        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mb-6 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
          <Icon size={28} strokeWidth={2} />
        </div>

        <div className="text-4xl md:text-5xl font-black text-gray-900 mb-2 font-montserrat tracking-tight">
          <AnimatedCounter value={value} suffix={suffix} />
        </div>

        <div className="text-xs md:text-sm text-gray-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
          {label}
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="w-12 h-1 bg-green-500/30 rounded-full mt-6 group-hover:w-full group-hover:bg-green-500 transition-all duration-700"></div>
    </div>
  </motion.div>
);

export function StatsSection() {
  return (
    <section className="pt-32 pb-24 bg-gradient-to-b from-white to-green-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob will-change-transform backface-hidden"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 will-change-transform backface-hidden"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-6 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="flex flex-col items-center">
            <span className="text-green-600 font-bold tracking-[0.3em] uppercase text-xs mb-4">
              Growth & Excellence
            </span>
            <StaggeredText
              text="Our Impact in Numbers"
              type="mask"
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight font-montserrat"
            />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 120 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
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
