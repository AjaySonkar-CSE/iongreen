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
    <section className="py-16 bg-red-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(255,255,255,0.1)_25%,_transparent_25%),_linear-gradient(-45deg,_rgba(255,255,255,0.1)_25%,_transparent_25%)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <ScrollAnimate animation="fadeIn" delay={100}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              ION Green Partnerships
            </h2>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Building global partnerships to deliver ION Green lithium battery solutions for a sustainable energy future
            </p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate animation="fadeIn" delay={200}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">ION Green Ecosystem</h3>
            <p className="text-red-100">Partnering with global leaders to deliver ION Green energy solutions worldwide</p>
          </div>
        </ScrollAnimate>

        <ScrollAnimate animation="scaleIn" delay={300}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-items-center">
            {brandLogos.map((logo, index) => (
              <ScrollAnimate key={index} animation="fadeIn" delay={400 + (index * 50)}>
                <div className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105 border border-white/20 hover:border-white/40 hover:shadow-2xl relative overflow-hidden h-48 flex flex-col items-center justify-center">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Logo container */}
                  <div className="relative z-10 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center mb-4">
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      fill
                      className="object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  {/* Brand name */}
                  <div className="relative z-10 text-center">
                    <h4 className="text-white font-semibold text-sm md:text-base mb-1 group-hover:text-yellow-200 transition-colors">
                      {logo.alt}
                    </h4>
                    <div className="w-8 h-0.5 bg-yellow-400 mx-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"></div>
                </div>
              </ScrollAnimate>
            ))}
          </div>
        </ScrollAnimate>

        <ScrollAnimate animation="fadeIn" delay={800}>
          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-red-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Join ION Green Partnership
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </ScrollAnimate>
      </div>
    </section>
  );
}

