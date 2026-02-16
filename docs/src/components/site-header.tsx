"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavDropdown } from "./nav-dropdown";
import { getSiteContent } from "@/lib/content";

import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  items?: NavItem[];
}

const { navItems } = getSiteContent();

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 overflow-visible",
      isScrolled
        ? "bg-white shadow-xl border-b border-gray-100"
        : "bg-transparent border-transparent"
    )}>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 md:px-6 lg:px-10 h-14 md:h-16">
        <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105 group">
          <Image
            src="/logo_10.png"
            alt="Logo"
            width={210}
            height={85}
            className={cn(
              "object-contain object-left transition-all duration-500",
              isScrolled ? "h-14 md:h-16 overflow-visible scale-100" : "h-16 md:h-20 overflow-visible scale-100"
            )}
            priority
          />
        </Link>

        <nav className="hidden items-center space-x-2 lg:flex ml-auto mr-2">
          {navItems.map((item) =>
            item.items ? (
              <NavDropdown
                key={item.href}
                item={item}
                isScrolled={isScrolled}
                isActive={
                  pathname === item.href ||
                  (item.items?.some((subItem) => pathname === subItem.href) ?? false)
                }
              />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-3 py-2.5 text-sm font-semibold transition-all duration-300 no-underline",
                  pathname === item.href
                    ? "text-green-600"
                    : isScrolled
                      ? "text-slate-700 hover:text-green-600"
                      : "text-white hover:text-green-400"
                )}
              >
                {item.label}
                <span className={cn(
                  "absolute bottom-1 left-4 right-4 h-0.5 bg-green-600 transform scale-x-0 transition-transform duration-300 origin-center rounded-full",
                  pathname === item.href ? 'scale-x-100' : 'group-hover:scale-x-100'
                )}></span>
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center lg:flex">
          <Link
            href="/contact"
            className="rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-all duration-300 hover:scale-105 no-underline"
          >
            Contact Us
          </Link>
        </div>

        <MobileMenu navItems={navItems} />
      </div>
    </header>
  );
}

import { ChevronRight, ChevronDown, Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface MobileMenuProps {
  navItems: NavItem[];
}

function MobileMenu({ navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setExpandedItem(null);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="relative z-[10005] flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-slate-700 hover:bg-white/20 transition-all duration-300 focus:outline-none shadow-md"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[10000] bg-slate-950/60 backdrop-blur-md"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[10001] w-[85%] max-w-sm bg-white shadow-[0_0_50px_rgba(0,0,0,0.3)] flex flex-col pt-24"
            >
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <nav className="flex flex-col gap-2">
                  {navItems.map((item, idx) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      {item.items ? (
                        <div className="space-y-1">
                          <button
                            onClick={() => toggleExpand(item.label)}
                            className={cn(
                              "flex w-full items-center justify-between px-4 py-4 text-base font-bold rounded-xl transition-all duration-300 no-underline",
                              expandedItem === item.label ? "text-green-600 bg-green-50/50" : "text-slate-900 hover:bg-slate-50"
                            )}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                "h-5 w-5 transform transition-transform duration-300",
                                expandedItem === item.label ? 'rotate-180 text-green-600' : 'text-slate-400'
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {expandedItem === item.label && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-1 space-y-1 border-l-2 border-green-100 pl-4 py-2">
                                  {item.items.map((subItem) => (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className={cn(
                                        "block w-full rounded-lg px-4 py-3 text-sm transition-all duration-300 hover:bg-green-50 hover:translate-x-1 no-underline",
                                        pathname === subItem.href ? "text-green-600 bg-green-50 font-bold" : "text-slate-600 hover:text-green-600"
                                      )}
                                      onClick={() => setOpen(false)}
                                    >
                                      <div className="flex items-center justify-between">
                                        <span>{subItem.label}</span>
                                        <ChevronRight className="w-4 h-4 text-slate-300" />
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "block w-full rounded-xl px-4 py-4 text-base font-bold transition-all duration-300 hover:bg-slate-50 no-underline border border-transparent",
                            pathname === item.href ? "text-green-600 bg-green-50 border-green-100" : "text-slate-900 hover:text-green-600"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="p-6 border-t border-slate-100 bg-slate-50/50 mt-auto">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full rounded-xl bg-green-600 px-4 py-4 text-center text-sm font-bold text-white shadow-lg shadow-green-200 hover:bg-green-700 transition-all active:scale-[0.98] no-underline"
                  onClick={() => setOpen(false)}
                >
                  Contact Us
                  <ChevronRight className="w-4 h-4" />
                </Link>
                <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
                  ION Green • Sustainable Energy
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

