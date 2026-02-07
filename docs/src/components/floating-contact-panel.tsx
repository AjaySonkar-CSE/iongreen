"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function FloatingContactPanel() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // Updated phone number
  const phoneNumber = "9202636627";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const phoneUrl = `tel:${phoneNumber}`;
  const smsUrl = `sms:${phoneNumber}`;

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main floating button */}
      <button
        onClick={togglePanel}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        aria-label="Contact options"
      >
        {isOpen ? (
          // Close icon (X)
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Chat icon
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Expanded panel with contact options */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 flex flex-col items-end space-y-2">
          {/* WhatsApp */}
          <Link
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg transition-all hover:bg-gray-100"
          >
            <span className="mr-2">WhatsApp</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
          </Link>

          {/* Call */}
          <Link
            href={phoneUrl}
            className="flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg transition-all hover:bg-gray-100"
          >
            <span className="mr-2">Call</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
              </svg>
            </div>
          </Link>

          {/* Message */}
          <Link
            href={smsUrl}
            className="flex items-center rounded-full bg-white px-4 py-2 text-sm font-medium text-gray-800 shadow-lg transition-all hover:bg-gray-100"
          >
            <span className="mr-2">Message</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
