"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getSiteContent } from "@/lib/content";
import {
  Mail,
  Phone,
  Linkedin,
  Youtube,
  Twitter,
  Facebook,
  ArrowRight,
  ChevronRight,
  MessageCircle
} from "lucide-react";

const content = getSiteContent();

const productLinks = content.navItems.find((item) => item.label === "Products")?.items
  ?.filter(item => !["Mobile & EV Charging Storage", "Flipkart & Amazon Products"].includes(item.label))
  .map((item) => ({
    label: item.label,
    href: item.href,
  })) || [];

const solutionLinks = content.navItems.find((item) => item.label === "Solutions")?.items?.map((item) => ({
  label: item.label,
  href: item.href,
})) || [];

const quickLinks = [
  {
    title: "Products",
    links: productLinks,
  },
  {
    title: "Solutions",
    links: solutionLinks,
  },
  {
    title: "Support",
    links: [
      { label: "Service", href: "/support" },
      { label: "Download", href: "/support" },
      { label: "FAQ", href: "/support" },
      { label: "Video", href: "/support" },
    ],
  },
];

export function SiteFooter() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  return (
    <div className="relative z-10 bg-white">
      {/* Pre-footer CTA Section - Keep unchanged */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold mb-6 tracking-wide">
                JOIN THE REVOLUTION
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Powering a Sustainable Future</h2>
              <p className="text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-8">
                Partner with ION Green to deliver advanced energy storage solutions that drive global carbon neutrality.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-green-500/20 hover:scale-105 active:scale-95 group no-underline"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section - Professional compact layout */}
      <footer className="bg-slate-950 text-white py-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">

            {/* Brand Column */}
            <div className="lg:col-span-3">
              <Link href="/" className="inline-block mb-4">
                <Image
                  src="/logo_6.png"
                  alt="ION Green Logo"
                  width={180}
                  height={70}
                  className="brightness-0 invert h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                A leading global integrator of intelligent energy storage solutions.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Linkedin, href: "#", color: "hover:bg-blue-600" },
                  { icon: Youtube, href: "#", color: "hover:bg-red-600" },
                  { icon: Facebook, href: "#", color: "hover:bg-blue-700" },
                  { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.href}
                    className={`w-9 h-9 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-300 ${social.color} hover:border-transparent hover:-translate-y-1`}
                  >
                    <social.icon className="w-4 h-4" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            {quickLinks.map((group, idx) => (
              <div key={group.title} className="lg:col-span-2">
                <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">{group.title}</h4>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-white/50 hover:text-green-400 text-sm transition-colors flex items-center no-underline"
                      >
                        <ChevronRight className="w-3 h-3 mr-1" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column */}
            <div className="lg:col-span-3">
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Connect With Us</h4>
              <div className="space-y-3 mb-4">
                {content.contact.channels.map((channel, i) => {
                  const Icon = channel.label === "Email" ? Mail : channel.label === "WhatsApp" ? MessageCircle : Phone;
                  return (
                    <div key={i} className="flex items-center gap-3 text-sm text-white/50 group hover:text-white transition-colors">
                      <Icon className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <Link href={channel.href ?? "#"} className="hover:text-green-400 transition-colors no-underline">{channel.value}</Link>
                    </div>
                  );
                })}
              </div>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 bg-white/5 border border-white/10 px-3 py-2 text-sm focus:outline-none focus:border-green-500 transition-all"
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 font-semibold text-xs uppercase"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-xs text-center md:text-left">
              © {currentYear} ION-GREEN ENERGY PVT LTD. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/30 hover:text-white/60 transition-colors">
              <Link href="/privacy" className="hover:text-green-400 no-underline">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-green-400 no-underline">Terms of Service</Link>
              <Link href="/cookies" className="hover:text-green-400 no-underline">Cookie Settings</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
