"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSiteContent } from "@/lib/content";

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

import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/text-animations";

export function SiteFooter() {
  const pathname = usePathname();
  return (
    <div className="relative z-10 bg-white">
      <div className="relative h-96 w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')",
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <div className="overflow-hidden mb-4">
                <AnimatedSection animation="fadeInUp" delay={0.2}>
                  <h2 className="text-4xl md:text-5xl font-bold">Powering a Sustainable Future</h2>
                </AnimatedSection>
              </div>
              <AnimatedSection animation="fadeInUp" delay={0.4}>
                <p className="text-xl md:text-2xl max-w-3xl mx-auto">Join us in the clean energy revolution with our advanced energy storage solutions</p>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <AnimatedSection animation="fadeInUp" delay={0.1}>
              <div>
                <p className="text-lg font-semibold">ION-GREEN ENERGY PVT LTD</p>
                <p className="mt-4 text-sm text-white/70">
                  One-stop integrated Ion Green solution provider. Manufacturing bases across China,
                  delivering safe, intelligent, and efficient ESS worldwide.
                </p>
                <div className="mt-4 space-y-2 text-sm text-white/70">
                  {content.contact.channels.map((channel) => (
                    <p key={channel.label}>
                      <span className="font-semibold text-white">{channel.label}:</span>{" "}
                      <Link href={channel.href ?? "#"} className="hover:text-green-300">
                        {channel.value}
                      </Link>
                    </p>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {quickLinks.map((group, idx) => (
              <AnimatedSection key={group.title} animation="fadeInUp" delay={0.2 + (idx * 0.1)}>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">{group.title}</p>
                  <ul className="mt-4 space-y-3 text-sm text-white/70">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="hover:text-green-300 transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
            <AnimatedSection animation="fadeInUp" delay={0.5}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-green-400">Follow Us</p>
                <div className="mt-4 flex gap-3 text-sm text-white/70">
                  <Link href="https://www.linkedin.com" className="rounded-full border border-white/20 px-4 py-2 hover:text-green-300 transition-colors">
                    LinkedIn
                  </Link>
                  <Link href="https://www.youtube.com" className="rounded-full border border-white/20 px-4 py-2 hover:text-green-300 transition-colors">
                    YouTube
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
            © {new Date().getFullYear()} ION-GREEN ENERGY PVT LTD All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

