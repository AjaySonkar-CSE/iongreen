'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { getSiteContent } from '@/lib/content';
import Image from 'next/image';

// Helper function for smooth scrolling to element
const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export function BSLNavbar() {
  const { navItems } = getSiteContent();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsHovered(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsHovered(label);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setIsHovered(null);
    }, 200);
  };

  const handleDropdownMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleDropdownMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
      setIsHovered(null);
    }, 200);
  };

  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-200/50 overflow-visible">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Global">
        <div className="flex justify-between h-14">
          <div className="flex items-center">
            <Link href="/" className="block h-20 w-auto transition-all duration-300 hover:scale-105">
              <Image
                src="/logo_7.png"
                alt="ION Green Logo"
                width={210}
                height={85}
                className="h-24 w-auto object-contain object-left overflow-visible scale-110"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-0.5 md:ml-auto" ref={dropdownRef}>
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <div
                  className="flex items-center px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-50"
                  onMouseEnter={() => item.items && handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`text-sm font-medium transition-all duration-300 ${isHovered === item.label ? 'text-green-600 scale-105' : 'text-gray-700 hover:text-green-600'
                      }`}
                    onClick={(e) => {
                      if (item.href.startsWith('#')) {
                        e.preventDefault();
                        scrollToElement(item.href.substring(1));
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.items && (
                    <svg
                      className={`ml-1 h-4 w-4 transform transition-all duration-300 ${isHovered === item.label ? 'rotate-180 text-green-600' : 'text-gray-500 group-hover:text-gray-700'
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </div>

                {item.items && (
                  <div
                    className={`absolute left-0 mt-2 w-72 rounded-xl shadow-xl bg-white/95 backdrop-blur-sm ring-1 ring-black/5 py-3 z-10 transition-all duration-300 border border-gray-100/50 ${activeDropdown === item.label
                      ? 'opacity-100 translate-y-0 visible scale-100'
                      : 'opacity-0 -translate-y-3 invisible scale-95'
                      }`}
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <div className="px-4 py-2 border-b border-gray-100/50 mb-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {item.description}
                      </p>
                    </div>
                    {item.items.map((subItem, index) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className="block px-4 py-3 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 hover:translate-x-1 group/subitem"
                        style={{ animationDelay: `${index * 50}ms` }}
                        onClick={(e) => {
                          setActiveDropdown(null);
                          setIsHovered(null);
                          if (subItem.href.startsWith('#')) {
                            e.preventDefault();
                            scrollToElement(subItem.href.substring(1));
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{subItem.label}</span>
                          <svg className="w-4 h-4 text-gray-400 group-hover/subitem:text-green-500 group-hover/subitem:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                        {subItem.description && (
                          <p className="text-xs text-gray-500 mt-1 group-hover/subitem:text-gray-600 transition-colors">
                            {subItem.description}
                          </p>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}