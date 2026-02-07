"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FlipCard } from "./ui/flip-card";

const stats = [
  {
    icon: (
      <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
      </div>
    ),
    value: "1000+",
    label: "Projects Completed",
    description: "Successful projects delivered to our clients"
  },
  {
    icon: (
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      </div>
    ),
    value: "500+",
    label: "Happy Clients",
    description: "Satisfied customers worldwide"
  },
  {
    icon: (
      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 12.08V12a10 10 0 1 0-11.93 9.93"></path>
          <path d="M22 4L12 14.01l-3-3"></path>
        </svg>
      </div>
    ),
    value: "99.9%",
    label: "Success Rate",
    description: "Project success and client satisfaction"
  },
  {
    icon: (
      <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      </div>
    ),
    value: "24/7",
    label: "Support",
    description: "Round the clock customer service"
  },
  {
    icon: (
      <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      </div>
    ),
    value: "15+",
    label: "Years Experience",
    description: "Industry expertise and knowledge"
  },
  {
    icon: (
      <div className="w-16 h-16 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-600 dark:text-pink-400">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    ),
    value: "50+",
    label: "Countries",
    description: "Global presence and reach"
  }
];

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  // Front of the card
  const frontContent = (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      <div className="mb-4">
        {stat.icon}
      </div>
      <h3 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        {stat.value}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 font-medium">{stat.label}</p>
    </div>
  );

  // Back of the card
  const backContent = (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 rounded-xl shadow-lg text-white text-center">
      <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
      <p className="text-lg font-medium mb-3">{stat.label}</p>
      <p className="text-sm opacity-90">{stat.description}</p>
    </div>
  );

  return (
    <div 
      ref={ref}
      className="w-full h-64 md:h-72"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <FlipCard
        front={frontContent}
        back={backContent}
        flipOnHover
        flipOnScroll
        delay={index * 100}
        className="w-full h-full"
      />
    </div>
  );
};

export const StatsGrid = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Achievements
          </h2>
          <div className="w-20 h-1 bg-red-600 mx-auto"></div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
              }
            }
          }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    type: 'spring',
                    stiffness: 100,
                    damping: 15
                  }
                }
              }}
            >
              <StatCard stat={stat} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
