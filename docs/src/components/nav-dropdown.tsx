"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  description?: string;
  image?: string;
  items?: NavItem[];
}

interface NavDropdownProps {
  item: NavItem;
  isActive: boolean;
  isScrolled: boolean;
}

export function NavDropdown({ item, isActive, isScrolled }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  return (
    <div
      className="relative group"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center">
        <Link
          href={item.href}
          className={cn(
            "px-3 py-2.5 text-sm font-semibold transition-all duration-300 relative no-underline",
            (isActive || isOpen)
              ? "text-green-600"
              : isScrolled
                ? "text-slate-700 hover:text-green-600"
                : "text-white hover:text-green-400"
          )}
        >
          {item.label}
          <span className={cn(
            "absolute bottom-1 left-4 right-4 h-0.5 bg-green-600 transform scale-x-0 transition-transform duration-300 origin-center rounded-full",
            (isActive || isOpen) ? 'scale-x-100' : 'group-hover:scale-x-100'
          )}></span>
        </Link>
        {item.items && (
          <div className="flex items-center ml-1">
            <svg
              className={cn(
                "h-4 w-4 transform transition-all duration-300 rounded-full p-0.5",
                isOpen
                  ? 'rotate-180 text-green-600'
                  : isScrolled
                    ? 'text-slate-500 group-hover:text-green-600'
                    : 'text-white/80 group-hover:text-white'
              )}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        )}
      </div>

      {item.items && (
        <div
          className={cn(
            "absolute left-0 mt-3 w-80 max-h-[60vh] overflow-y-auto rounded-xl shadow-2xl bg-white/95 backdrop-blur-md ring-1 ring-black/5 py-3 z-50 transition-all duration-300 origin-top-left border border-gray-200/50 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent",
            isOpen
              ? 'opacity-100 scale-100 visible translate-y-0'
              : 'opacity-0 scale-95 invisible -translate-y-2'
          )}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="px-5 py-2 border-b border-gray-100/80 mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {item.description}
            </p>
          </div>
          {item.items.map((subItem, index) => (
            <Link
              key={subItem.href}
              href={subItem.href}
              className="group block px-5 py-4 text-sm text-slate-700 hover:bg-green-50/80 hover:text-green-700 transition-all duration-300 border-l-3 border-transparent hover:border-green-500 hover:translate-x-1 no-underline"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => setIsOpen(false)}
            >
              <div className="flex items-center gap-3">
                {subItem.image && (
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                      src={subItem.image}
                      alt={subItem.label}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold mb-1">{subItem.label}</div>
                      {subItem.description && (
                        <p className="text-xs text-slate-500 group-hover:text-slate-600 transition-colors leading-relaxed">{subItem.description}</p>
                      )}
                    </div>
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-green-500 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
