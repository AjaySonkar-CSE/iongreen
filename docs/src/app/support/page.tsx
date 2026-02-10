import { SupportResources } from "@/components/support-resources";
import { ContactChannels } from "@/components/contact-channels";
import { ScrollAnimate } from "@/components/scroll-animate";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/hero";

export default function SupportPage() {
  return (
    <>
      <Hero page="support">
        <div className="text-center">
          <ScrollAnimate animation="fadeInUpElegant" delay={200}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              ION-GREEN
              <span className="text-green-400 block mt-2">Support Center</span>
            </h1>
          </ScrollAnimate>

          <ScrollAnimate animation="fadeInUpElegant" delay={400}>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for energy storage solutions. Access product manuals, technical specifications,
              and 24/7 expert support for all ION-GREEN systems.
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="scaleInBounce" delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-500 text-white px-10 py-5 text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-green-500/30"
              >
                <Link href="#support-resources">
                  View Resources
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-5 text-lg font-bold rounded-full transition-all backdrop-blur-md"
              >
                <Link href="/contact">
                  Contact Support
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </Hero>

      {/* ION Green Supported Title Section */}
      <ScrollAnimate animation="fadeInUpElegant" delay={400}>
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" delay={500}>
              <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
                ION Green Supported
              </h2>
            </ScrollAnimate>
          </div>
        </section>
      </ScrollAnimate>

      {/* Vertical Layout - Text First, Image Below */}
      <ScrollAnimate animation="slideInRightSmooth" delay={600}>
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-col gap-8">
              {/* ION Green Related Text */}
              <div className="w-full">
                <ScrollAnimate animation="fadeInUpElegant" delay={700}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">ION Green Technology</h3>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={800}>
                  <p className="text-slate-600 mb-4">
                    ION Green is a leading innovator in energy storage solutions, providing advanced battery energy storage systems that are safe, efficient, and environmentally friendly.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={900}>
                  <p className="text-slate-600 mb-4">
                    Our cutting-edge technology ensures reliable performance and longevity for residential, commercial, and industrial applications. With a global presence in over 100 countries, we continue to drive innovation in sustainable energy solutions.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={1000}>
                  <p className="text-slate-600 mb-4">
                    Our dedicated support team is available 24/7 to assist with any technical inquiries, product maintenance, or system optimization needs. Trust ION Green for comprehensive support throughout your energy storage journey.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={1100}>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Key Benefits:</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>High-efficiency lithium-ion technology</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>Intelligent energy management systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>Scalable modular designs for various applications</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>Comprehensive warranty and support packages</span>
                      </li>
                    </ul>
                  </div>
                </ScrollAnimate>
              </div>

              {/* Image Below Text */}
              <div className="w-full flex items-center justify-center">
                <ScrollAnimate animation="scaleInBounce" delay={1200}>
                  <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/1/ion8.png"
                      alt="ION Green Technology"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </ScrollAnimate>
              </div>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      <ScrollAnimate animation="fadeInUpElegant" delay={1300}>
        <div id="support-resources">
          <SupportResources />
        </div>
      </ScrollAnimate>

      <ScrollAnimate animation="slideInLeftSmooth" delay={1400}>
        <section className="bg-slate-50 py-16">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" delay={1500}>
              <h2 className="mb-8 text-3xl font-bold text-slate-900 md:text-4xl">
                ION-GREEN Support Services
              </h2>
            </ScrollAnimate>
            <div className="grid gap-8 md:grid-cols-2">
              <ScrollAnimate animation="scaleInBounce" delay={1600}>
                <div className="rounded-2xl bg-white p-8 shadow-md">
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">Technical Support</h3>
                  <p className="text-slate-600">
                    Our team of certified technicians is available 24/7 to assist with any technical queries or issues you may encounter with your ION-GREEN energy storage systems.
                  </p>
                  <ul className="mt-4 space-y-2 text-slate-600">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-600">✓</span>
                      <span>Remote diagnostics and troubleshooting</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-600">✓</span>
                      <span>System performance optimization</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-600">✓</span>
                      <span>Firmware and software updates</span>
                    </li>
                  </ul>
                </div>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={1700}>
                <div className="rounded-2xl bg-white p-8 shadow-md">
                  <h3 className="mb-4 text-xl font-semibold text-slate-900">Product Documentation</h3>
                  <p className="text-slate-600">
                    Access comprehensive documentation for all ION-GREEN products, including installation guides, user manuals, and technical specifications.
                  </p>
                  <div className="mt-6">
                    <h4 className="mb-2 font-medium text-slate-900">Featured Resources:</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <a href="#" className="text-blue-600 hover:underline">ION-GREEN Product Catalog 2025</a>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <a href="#" className="text-blue-600 hover:underline">Installation & Commissioning Guide</a>
                      </li>
                      <li className="flex items-center">
                        <span className="mr-2">•</span>
                        <a href="#" className="text-blue-600 hover:underline">Safety & Maintenance Manual</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </section>
      </ScrollAnimate>

      <ScrollAnimate animation="slideInRightSmooth" delay={1800}>
        <ContactChannels />
      </ScrollAnimate>
    </>
  );
}