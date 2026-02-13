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
import { AnimatedSection } from "@/components/ui/animated-section";

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
      {/* Pre-footer CTA Section */}
      <div className="relative h-[450px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-10000 hover:scale-110"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-950 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <AnimatedSection animation="fadeInUp" delay={0.2}>
                <span className="inline-block px-4 py-1.5 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-semibold mb-6 tracking-wide">
                  JOIN THE REVOLUTION
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Powering a Sustainable Future</h2>
                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
                  Partner with ION Green to deliver advanced energy storage solutions that drive global carbon neutrality.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full transition-all duration-300 shadow-xl shadow-green-500/20 hover:scale-105 active:scale-95 group no-underline"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Section */}
      <footer className="bg-slate-950 text-white pt-24 pb-12 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Brand Column */}
            <div className="lg:col-span-4 space-y-8">
              <AnimatedSection animation="fadeInUp" delay={0.1}>
                <Link href="/" className="inline-block transform transition-all duration-300 hover:scale-105 mb-6">
                  <Image
                    src="/logo_6.png"
                    alt="ION Green Logo"
                    width={210}
                    height={85}
                    className="brightness-0 invert h-12 w-auto object-contain"
                  />
                </Link>
                <p className="text-white/60 leading-relaxed text-sm max-w-sm mb-8">
                  A leading global integrator of intelligent energy storage solutions. We provide safe,
                  efficient, and reliable ESS for residential, commercial, and industrial applications worldwide.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: Linkedin, href: "#", color: "hover:bg-blue-600" },
                    { icon: Youtube, href: "#", color: "hover:bg-red-600" },
                    { icon: Facebook, href: "#", color: "hover:bg-blue-700" },
                    { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                  ].map((social, i) => (
                    <Link
                      key={i}
                      href={social.href}
                      className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 transition-all duration-300 ${social.color} hover:border-transparent hover:-translate-y-1`}
                    >
                      <social.icon className="w-5 h-5" />
                    </Link>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Links Columns */}
            {quickLinks.map((group, idx) => (
              <div key={group.title} className="lg:col-span-2 space-y-6">
                <AnimatedSection animation="fadeInUp" delay={0.2 + idx * 0.1}>
                  <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">{group.title}</h4>
                  <ul className="space-y-3">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="text-white/50 hover:text-green-400 text-sm transition-colors flex items-center group/link no-underline"
                        >
                          <ChevronRight className="w-3 h-3 opacity-0 group-hover/link:opacity-100 -ml-4 group-hover/link:ml-0 transition-all mr-2" />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              </div>
            ))}

            {/* Contact Column */}
            <div className="lg:col-span-4 space-y-6">
              <AnimatedSection animation="fadeInUp" delay={0.5}>
                <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Connect With Us</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  Stay updated with our latest energy storage insights and product developments.
                </p>
                <div className="space-y-4 mb-8">
                  {content.contact.channels.map((channel, i) => {
                    const Icon = channel.label === "Email" ? Mail : channel.label === "WhatsApp" ? MessageCircle : Phone;
                    return (
                      <div key={i} className="flex items-start gap-4 text-sm text-white/50 group hover:text-white transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                          <Icon className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <span className="block font-semibold text-white/80">{channel.label}</span>
                          <Link href={channel.href ?? "#"} className="hover:text-green-400 transition-colors no-underline tracking-wide">{channel.value}</Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <form className="relative group overflow-hidden rounded-xl" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    placeholder="Subscribe to Newsletter"
                    className="w-full bg-white/5 border border-white/10 px-5 py-4 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all group-hover:bg-white/10"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-2 bottom-2 bg-green-500 hover:bg-green-600 text-white px-4 rounded-lg transition-all duration-300 font-semibold text-xs uppercase"
                  >
                    Join
                  </button>
                </form>
              </AnimatedSection>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/40 text-xs text-center md:text-left transition-opacity hover:opacity-100">
              © {currentYear} ION-GREEN ENERGY PVT LTD. All rights reserved.
              <span className="mx-2 opacity-20">|</span>
              Innovative Storage Solutions Worldwide.
            </p>
            <div className="flex gap-8 text-xs text-white/30 hover:text-white/60 transition-colors">
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
