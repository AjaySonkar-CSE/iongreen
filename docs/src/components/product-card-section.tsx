"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { DetailModal } from "@/components/detail-modal";

interface CardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  detailedContent: string;
  type: 'product' | 'solution';
}

interface ProductCardSectionProps {
  initialCards?: CardProps[];
}

export function ProductCardSection({ initialCards = [] }: ProductCardSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Omit<CardProps, 'id' | 'type'>>({
    title: "",
    image: "",
    description: "",
    detailedContent: ""
  });

  const openModal = (item: CardProps) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Animation variants for the container
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  // Animation variants for each item
  const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Animation for the section title
  const titleAnimation: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] // Custom cubic-bezier curve matching easeOutExpo
      }
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleAnimation}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose ION Green?</h2>
          <div className="w-20 h-1 bg-green-500 mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Discover the advantages of our innovative energy storage solutions
          </p>
        </motion.div>
        
        {initialCards.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {initialCards.map((card, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="group overflow-hidden border border-slate-200 rounded-xl hover:shadow-xl transition-all duration-300 bg-white hover:-translate-y-1"
              whileHover={{ 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
              }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4} // Only load first 4 images with priority
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  {card.type === 'product' ? 'Product' : 'Solution'}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                  {card.description}
                </p>
                <button
                  onClick={() => openModal(card)}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors text-left mt-auto"
                >
                  Learn More →
                </button>
              </div>
            </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Products Coming Soon</h3>
            <p className="text-slate-600">We're working on bringing you the latest energy storage solutions.</p>
          </div>
        )}
      </div>

      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedItem.title}
        image={selectedItem.image}
        description={selectedItem.description}
        detailedContent={selectedItem.detailedContent}
      />
    </section>
  );
}
