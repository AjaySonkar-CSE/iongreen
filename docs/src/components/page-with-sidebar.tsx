import React from 'react';
import { Hero } from './hero';
import Image from 'next/image';

interface PageWithSidebarProps {
  title: string;
  description?: string;
  imageUrl: string;
  imageAlt: string;
  children: React.ReactNode;
  sidebarContent: React.ReactNode;
  page?: string;
}

export function PageWithSidebar({
  title,
  description,
  imageUrl,
  imageAlt,
  children,
  sidebarContent,
  page = 'default',
}: PageWithSidebarProps) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero page={page}>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        {description && (
          <p className="text-xl text-white/90 max-w-3xl mx-auto">{description}</p>
        )}
      </Hero>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-1/3 lg:w-1/4">
            <div className="sticky top-24">
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative w-full h-48 md:h-56 lg:h-64">
                  <Image
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority
                  />
                </div>
                <div className="p-4">
                  {sidebarContent}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="w-full md:w-2/3 lg:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
