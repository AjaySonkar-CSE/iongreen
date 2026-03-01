"use client";

import Image from "next/image";
import { SectionHeading } from "./section-heading";
import { useState } from "react";
import { DetailModal } from "./detail-modal";
import { getSiteContent } from "@/lib/content";

interface NewsItem {
  title: string;
  date: string | Date;
  summary: string;
  content?: string;
  image: string;
}

// Images from home page News & Events section
const newsImages = [
  "/new1.jpg",
  "/new2.jpg",
  "/new3.jpg",
  "/new4.jpg",
  "/new5.jpg"
];

function NewsFeedClient({ initialNews }: { initialNews: NewsItem[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    image: "",
    description: "",
    detailedContent: ""
  });

  const openModal = (item: NewsItem) => {
    const imageUrl = item.image || newsImages[0]; // default to first image
    setSelectedItem({
      title: item.title,
      image: imageUrl,
      description: item.summary,
      detailedContent: item.content || item.summary // fallback to summary if no content
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // If no news items, don't render anything
  if (!initialNews || initialNews.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {initialNews.map((item: NewsItem, index: number) => {
          // Use item image, fallback to ION GREEN images in sequence
          const imageUrl = item.image || newsImages[index % newsImages.length];
          const publishLabel = item.date;

          return (
            <article
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 cursor-pointer bg-white h-full"
              onClick={() => openModal(item)}
            >
              {/* Image Container - Adjusted to fit image beautifully */}
              <div className="relative w-full aspect-[4/3] md:aspect-[3/2] xl:aspect-[4/3] bg-gray-50 flex items-center justify-center p-4">
                <Image
                  src={imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Text Content - Positioned below the image natively */}
              <div className="p-6 flex flex-col flex-grow bg-white border-t border-gray-50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full uppercase tracking-wider">
                    News
                  </span>
                  <span className="text-sm text-gray-500 font-medium whitespace-nowrap">
                    {publishLabel instanceof Date ? publishLabel.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : publishLabel}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {item.summary}
                </p>

                <div className="flex items-center text-green-600 font-bold group-hover:text-green-700 transition-colors duration-300 mt-auto">
                  <span>Read Article</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={selectedItem.title}
        image={selectedItem.image}
        description={selectedItem.description}
        detailedContent={selectedItem.detailedContent}
      />
    </>
  );
}

// Server component wrapper
export function NewsFeed({ news: initialNews }: { news?: NewsItem[] }) {
  // Use provided news or get from content
  const news = initialNews || getSiteContent()?.news || [];

  return (
    <section className="bg-gradient-to-b from-white to-green-50 py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="News"
          title="Latest Updates"
          description="Company news, exhibitions, and BESS deployment highlights."
        />

        <NewsFeedClient initialNews={news || []} />
      </div>
    </section>
  );
}