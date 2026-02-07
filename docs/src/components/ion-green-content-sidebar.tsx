import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/enhanced-scroll-reveal";

export function IonGreenContentSidebar() {
  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" duration={0.8}>
          <div className="grid grid-cols-1 gap-12">
            {/* Top - Content */}
            <ScrollReveal direction="up" duration={0.8} delay={0.1}>
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-green-100 transform transition-all duration-300 hover:shadow-2xl">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-green-700 mb-4">
                    ION Green Energy Solutions
                  </h2>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    ION Green delivers cutting-edge battery energy storage systems designed for the modern energy landscape. 
                    Our solutions combine high-efficiency lithium-ion technology with intelligent energy management to optimize 
                    performance and reduce costs across residential, commercial, and industrial applications.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    With a focus on sustainability and innovation, ION Green systems offer scalable modular designs that 
                    grow with your energy needs while providing reliable backup power and grid stability. Our advanced 
                    battery management technology ensures maximum lifespan and safety for all installations.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    From small residential setups to large utility-scale deployments, ION Green provides comprehensive 
                    energy storage solutions that integrate seamlessly with solar, wind, and grid power sources to 
                    maximize efficiency and minimize environmental impact.
                  </p>
                </div>
                
                <div className="mt-8">
                  <Link 
                    href="/products" 
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:-translate-y-1 btn-hover hover-scale"
                  >
                    Explore Our Products
                    <svg className="ml-2 -mr-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            
            {/* Bottom - Image */}
            <ScrollReveal direction="up" duration={0.8} delay={0.2}>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/1/ion3.png"
                  alt="ION Green Energy Solutions"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105 fade-in"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}