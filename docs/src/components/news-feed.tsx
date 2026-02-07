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
      detailedContent: item.summary // or empty
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
          // Use ION GREEN images in sequence
          const imageUrl = newsImages[index % newsImages.length];
          const publishLabel = item.date;

          return (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 block h-96 cursor-pointer"
              onClick={() => openModal(item)}
            >
              {/* Full-size image background */}
              <div className="absolute inset-0">
                <Image
                  src={imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Content overlay - appears on hover */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      News
                    </span>
                    <span className="text-xs text-gray-500">
                      {publishLabel instanceof Date ? publishLabel.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      }) : publishLabel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                    {item.summary}
                  </p>

                  <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                    <span>Read More</span>
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
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