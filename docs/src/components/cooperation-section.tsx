'use client';

import Image from 'next/image';
import { ScrollAnimate } from './scroll-animate';

const brandLogos = [
  { src: '/images/ion-green-energy-storage.svg', alt: 'ION Green BESS Systems' },
  { src: '/images/ion-green-lithium-battery.svg', alt: 'ION Green LiFePO₄ Technology' },
  { src: '/images/ion-green-residential.svg', alt: 'ION Green Residential ESS' },
  { src: '/images/ion-green-solar-solution.svg', alt: 'ION Green Solar Integration' },
  { src: '/images/ai-commercial-industrial.svg', alt: 'ION Green Commercial Solutions' },
  { src: '/images/ai-utility-scale-energy-storage.svg', alt: 'ION Green Utility Scale Storage' },
  { src: '/images/ai-renewable-integration.svg', alt: 'ION Green Renewable Integration' },
  { src: '/images/ai-sustainable-energy-tech.svg', alt: 'ION Green Sustainable Technology' },
  { src: '/images/ai-microgrids.svg', alt: 'ION Green Microgrid Solutions' },
  { src: '/images/ai-residential-all-in-one.svg', alt: 'ION Green All-in-One Systems' },
  { src: '/images/ai-lithium-battery-production.svg', alt: 'ION Green Battery Manufacturing' },
  { src: '/images/ai-green-energy-solutions.svg', alt: 'ION Green Energy Solutions' },
];

export function CooperationSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#020802] via-black to-[#020802] relative overflow-hidden">
      {/* Background HUD Graphics */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimate animation="fadeInUpElegant" delay={100}>
          <div className="text-center mb-16">
            <p className="text-green-500 uppercase tracking-[0.4em] font-bold text-xs mb-4">
              Global Ecosystem
            </p>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
              ION GREEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">PARTNERSHIPS</span>
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full mb-8" />
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Building strategic global alliances to deliver cutting-edge lithium battery solutions for a sustainable energy future.
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate animation="fadeIn" delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {brandLogos.map((logo, index) => (
              <div
                key={index}
                className="group relative h-48 rounded-xl overflow-hidden cursor-pointer border border-white/5 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-green-500/40 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(34,197,94,0.1)] flex flex-col items-center justify-center p-6"
              >
                {/* Card Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Logo container */}
                <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Brand name */}
                <div className="relative z-10 text-center transform translate-y-2 opacity-80 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white font-bold text-[10px] uppercase tracking-[0.2em] block truncate max-w-[120px]">
                    {logo.alt.split(' ').slice(2).join(' ') || logo.alt}
                  </span>
                </div>

                {/* Bottom Neon Line */}
                <div className="absolute bottom-0 left-0 h-1 bg-green-500 w-0 group-hover:w-full transition-all duration-500 fill-mode-forwards" />
              </div>
            ))}
          </div>
        </ScrollAnimate>

        <ScrollAnimate animation="fadeInUpElegant" delay={800}>
          <div className="text-center mt-20">
            <div className="relative inline-block group">
              <div className="absolute inset-0 bg-green-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              <a
                href="/contact"
                className="relative inline-flex items-center px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.3)] uppercase tracking-widest text-sm"
              >
                Join ION Green Partnership
                <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

