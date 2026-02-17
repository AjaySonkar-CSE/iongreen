"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Sparkles } from "lucide-react";

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
    }, 150);
  };

  const isMega = item.items && item.items.length > 4;
  const hasImages = item.items?.some(sub => sub.image);

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
            "px-4 py-2 text-sm font-bold transition-all duration-300 relative no-underline flex items-center gap-1",
            (isActive || isOpen)
              ? "text-green-600"
              : isScrolled
                ? "text-slate-800 hover:text-green-600"
                : "text-white hover:text-green-400"
          )}
        >
          {item.label}
          <ChevronDown
            className={cn(
              "w-4 h-4 transition-transform duration-300",
              isOpen ? "rotate-180" : ""
            )}
          />
          <span className={cn(
            "absolute bottom-0 left-4 right-4 h-0.5 bg-green-500 transform scale-x-0 transition-transform duration-300 origin-center rounded-full",
            (isActive || isOpen) ? 'scale-x-100' : 'group-hover:scale-x-100'
          )}></span>
        </Link>
      </div>

      <AnimatePresence>
        {isOpen && item.items && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "absolute top-full z-[1100] mt-1 p-1",
              isMega ? "-left-48 w-[850px]" : "left-0 w-80"
            )}
          >
            <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] ring-1 ring-black/5 border border-green-50/50 overflow-hidden flex flex-col max-h-[80vh] pointer-events-auto">
              <div className="flex flex-1 overflow-hidden min-h-0">
                {/* Main Content Area */}
                <div className={cn(
                  "p-6 flex flex-col min-h-0 relative",
                  isMega ? "flex-1" : "w-80"
                )}>
                  {item.description && (
                    <div className="flex items-center gap-2 mb-6 px-2 flex-shrink-0">
                      <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black text-green-600 uppercase tracking-[0.2em]">
                          {item.label}
                        </h4>
                        <p className="text-xs text-slate-500 font-medium">{item.description}</p>
                      </div>
                    </div>
                  )}

                  <div className={cn(
                    "grid gap-2 pr-3 overflow-y-auto custom-scrollbar scroll-smooth overscroll-contain touch-pan-y relative z-10 pointer-events-auto",
                    isMega ? "grid-cols-2 max-h-[450px]" : "grid-cols-1 max-h-[350px]"
                  )}
                    onWheel={(e) => e.stopPropagation()}
                  >
                    {item.items.map((subItem, index) => (
                      <motion.div
                        key={subItem.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <Link
                          href={subItem.href}
                          className="group/item flex items-center gap-4 p-3 rounded-xl hover:bg-green-50/60 transition-all duration-300 no-underline border border-transparent hover:border-green-100/50"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.image && (
                            <div className="relative w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden border border-slate-100 shadow-sm group-hover/item:shadow-md transition-all">
                              <Image
                                src={subItem.image}
                                alt={subItem.label}
                                fill
                                className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                sizes="56px"
                              />
                            </div>
                          )}
                          {!subItem.image && hasImages && (
                            <div className="w-14 h-14 flex-shrink-0 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100">
                              <ArrowRight className="w-5 h-5 text-slate-300 group-hover/item:text-green-500 group-hover/item:translate-x-1 transition-all" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-slate-800 group-hover/item:text-green-600 transition-colors text-sm mb-0.5 flex items-center justify-between gap-2 overflow-hidden">
                              <span className="truncate flex-1">{subItem.label}</span>
                              <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-green-500 flex-shrink-0" />
                            </div>
                            {subItem.description && (
                              <p className="text-[11px] text-slate-500 line-clamp-2 leading-tight group-hover/item:text-slate-600">
                                {subItem.description}
                              </p>
                            )}
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Featured / Sidebar Area for Mega Menu */}
                {isMega && (
                  <div className="w-72 bg-slate-50/50 border-l border-slate-100 p-6 flex flex-col justify-between">
                    <div>
                      <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                        Featured Technology
                      </h5>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-lg border border-white">
                        <Image
                          src={item.label === "Products" ? "/pro2.jpg" : "/data1.jpg.jpg"}
                          alt="Featured"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                          <p className="text-white text-[10px] font-bold">Leading Innovation in BESS</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                        Discover how our latest {item.label.toLowerCase()} are shaping the future of sustainable energy storage worldwide.
                      </p>
                    </div>

                    <Link
                      href={item.href}
                      className="group/btn flex items-center justify-between p-3 rounded-lg bg-green-600 text-white text-xs font-bold no-underline hover:bg-green-700 transition-all shadow-md hover:shadow-green-200"
                    >
                      <span>Explore All {item.label}</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Bottom Strip */}
              <div className="bg-slate-50/80 px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  ION Green Energy • Smart Solutions
                </span>
                <div className="flex gap-4">
                  <Link href="/contact" className="text-[10px] font-bold text-green-600 hover:text-green-700 no-underline flex items-center gap-1">
                    Request Support <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
