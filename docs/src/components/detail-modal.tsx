"use client";

import { useEffect } from 'react';
import Image from 'next/image';

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  description: string;
  detailedContent: string;
}

export function DetailModal({ isOpen, onClose, title, image, description, detailedContent }: DetailModalProps) {
  // Close modal on Escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-3xl flex flex-col max-h-[90vh]">

          {/* Scrollable Area */}
          <div className="overflow-y-auto w-full">

            {/* Edge-to-edge Hero Image */}
            <div className="relative w-full aspect-video bg-gray-50 flex items-center justify-center">
              {/* Close Button over Image */}
              <button
                type="button"
                className="absolute right-4 top-4 z-10 rounded-full bg-white/70 p-2 text-gray-900 hover:bg-white shadow-md focus:outline-none backdrop-blur-md transition-all"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {image && (
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1024px"
                />
              )}
            </div>

            <div className="px-6 py-8 sm:px-12 sm:py-10">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
                {title}
              </h3>

              {/* Only show description/summary if it's different from detailed content */}
              {description && detailedContent && !detailedContent.startsWith(description) && (
                <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed border-l-4 border-green-500 pl-5 py-1">
                  {description}
                </p>
              )}

              <div className="prose prose-lg prose-green max-w-none text-gray-800">
                {/* Render as HTML if it contains tags, otherwise normal text */}
                {detailedContent?.includes('<') && detailedContent?.includes('>') ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: detailedContent }}
                  />
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed text-lg">
                    {detailedContent}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Fixed Footer */}
          <div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-100 shrink-0">
            <button
              type="button"
              className="inline-flex justify-center rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-green-700 transition-all sm:w-auto"
              onClick={onClose}
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}