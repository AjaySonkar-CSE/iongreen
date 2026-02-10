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
      "fixed top-0 left-0 right-0 z-[1000] transition-all duration-500",
      isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100/50 py-1"
        : "bg-transparent border-transparent py-2"
    )}>
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 md:px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2 transition-all duration-300 hover:scale-105 group">
          <Image
            src={isScrolled ? "/logo_final3.png" : "/logo_final_dark.png"}
            alt="Logo"
            width={300}
            height={100}
            className={cn(
              "object-contain object-left transition-all duration-500",
              isScrolled ? "h-12 md:h-14" : "h-12 md:h-14"
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

interface MobileMenuProps {
  navItems: NavItem[];
}

function MobileMenu({ navItems }: MobileMenuProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300"
        aria-expanded={open}
      >
        <span className="flex items-center">
          {open ? 'Close' : 'Menu'}
          <svg
            className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="absolute inset-x-0 top-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xl px-4 py-6">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <div key={item.href} className="w-full">
                {item.items ? (
                  <div className="space-y-1">
                    <div className="px-4 py-3 text-sm font-semibold text-slate-900 border-l-3 border-green-500 bg-green-50/50 rounded-r-lg">
                      {item.label}
                    </div>
                    <div className="ml-4 space-y-1 border-l border-slate-200 pl-4">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className={cn(
                            "block w-full rounded-lg px-4 py-3 text-sm transition-all duration-300 hover:bg-slate-50 hover:translate-x-1 no-underline",
                            pathname === subItem.href ? "text-green-600 bg-green-50 font-semibold" : "text-slate-700 hover:text-green-600"
                          )}
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center justify-between">
                            <span>{subItem.label}</span>
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block w-full rounded-lg px-4 py-3 text-sm font-semibold transition-all duration-300 hover:bg-slate-50 hover:translate-x-1 no-underline",
                      pathname === item.href ? "text-green-600 bg-green-50" : "text-slate-700 hover:text-green-600"
                    )}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="mt-6 pt-4 border-t border-slate-200">
              <Link
                href="/contact"
                className="block w-full rounded-lg bg-gradient-to-r from-green-600 to-green-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 hover:scale-105 no-underline"
                onClick={() => setOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

