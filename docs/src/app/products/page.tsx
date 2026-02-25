import { getSiteContent } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { ScrollAnimate } from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";
import { dbService } from "@/lib/db-service";
import { PageHeroSlider } from "@/components/page-hero-slider";

import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

// Enable ISR (Incremental Static Regeneration) with a revalidation period
export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function ProductsPage() {
  const siteContent = getSiteContent();
  const featuredProducts = await dbService.getProducts(undefined, 2, true);

  // Fetch hero slides from DB
  const dbSlides = await dbService.getHeroSlidesByPage("products");

  // Default fallback slides
  const fallbackSlides = [
    {
      id: 1,
      title: "Residential & Commercial ESS",
      description: "Smart energy storage solutions for homes and businesses. Reduce electricity costs, ensure backup power, and integrate seamlessly with solar systems.",
      ctaLabel: "View Products",
      ctaHref: "/products/residential-energy-storage",
      image: "/Img/image1.png"
    },
    {
      id: 2,
      title: "Industrial & Utility Scale Systems",
      description: "Large-scale energy storage solutions for industrial facilities and utility applications. Containerized BESS systems up to 5MWh capacity.",
      ctaLabel: "Learn More",
      ctaHref: "/products/commercial-industrial-ess",
      image: "/Img/image2.png"
    }
  ];

  // Use DB slides if available, otherwise fallback
  const heroSlides = dbSlides.length > 0
    ? dbSlides.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description || "",
      ctaLabel: s.cta_label || "",
      ctaHref: s.cta_href || "",
      image: s.image_url
    }))
    : fallbackSlides;

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Slider - Fixed like home page */}
      <PageHeroSlider
        slides={heroSlides}
        height="h-screen"
        showNavigation={true}
        showIndicators={true}
        autoPlay={true}
        autoPlayInterval={5000}
        fixed={true}
      />

      <AnimatedContentWrapper>


        {/* Stats Section */}
        <section className="relative bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 text-white">
          <div className="border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="flex flex-wrap justify-center gap-12 lg:gap-24">
                {siteContent.hero.stats.map((stat, index) => (
                  <ScrollAnimate
                    key={stat.label}
                    animation="scaleInBounce"
                    delay={800 + (index * 100)}
                  >
                    <div className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold text-green-400 mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-300 uppercase tracking-wide">
                        {stat.label}
                      </div>
                      {stat.helper && (
                        <div className="text-xs text-gray-400 mt-1">
                          {stat.helper}
                        </div>
                      )}
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories Section */}
        <section id="product-categories" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Products
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Comprehensive range of energy storage solutions, inverters, heat pumps, and EV charging infrastructure
                  for residential, commercial, and industrial applications.
                </p>
              </div>
            </ScrollAnimate>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteContent.products.slice(0, 6).map((product, index) => (
                <ScrollAnimate
                  key={product.title}
                  animation={index % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"}
                  delay={400 + (index * 100)}
                >
                  <Link
                    href={`/products/${product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-96"
                  >
                    {/* Full-size image background */}
                    <div className="absolute inset-0">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority
                      />
                    </div>

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Content overlay - appears on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
                          {product.range}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                          {product.title}
                        </h3>
                        <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                          {product.description}
                        </p>

                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.features.slice(0, 2).map((feature, featureIndex) => (
                            <span
                              key={featureIndex}
                              className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                          <span>Learn More</span>
                          <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Showcase */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <div className="text-center mb-16 px-4">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                  Featured Solutions
                </h2>
                <div className="w-24 h-1.5 bg-green-500 mx-auto mb-8 rounded-full"></div>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Our flagship products represent the pinnacle of energy storage technology,
                  delivering unparalleled performance, safety, and reliability for global energy independent.
                </p>
              </div>
            </ScrollAnimate>

            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (
                <div key={product.id} className={`grid lg:grid-cols-2 gap-16 items-center ${index < featuredProducts.length - 1 ? 'mb-24' : ''}`}>
                  <ScrollAnimate animation="slideInLeftSmooth" delay={300 + (index * 100)}>
                    <div className={`space-y-6 ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-bold tracking-wider uppercase">
                        {product.category || "Premium Solution"}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                        {product.description}
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">Efficiency</div>
                            <div className="text-sm text-gray-500">Optimized Performance</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">Smart UI</div>
                            <div className="text-sm text-gray-500">Real-time Monitoring</div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 h-14 px-10 rounded-xl text-lg font-bold text-white shadow-lg shadow-green-600/20">
                          <Link href={`/products/${product.category}`}>
                            Explore Product
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollAnimate>

                  <ScrollAnimate animation="slideInRightSmooth" delay={400 + (index * 100)}>
                    <div className={`relative group ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="absolute -inset-4 bg-green-500/5 rounded-[2.5rem] blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
                      <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                        <Image
                          src={product.image_url || "/pro2.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </ScrollAnimate>
                </div>
              ))
            ) : (
              <>
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                  <ScrollAnimate animation="slideInLeftSmooth" delay={300}>
                    <div className="space-y-6">
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-bold tracking-wider uppercase">
                        Utility Scale
                      </div>
                      <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Energy Storage System
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Modular cabinet and containerized systems for industrial parks, hospitals,
                        data centers, and municipal infrastructure. Featuring air-cooled & liquid-cooled
                        options with peak shaving and load shifting capabilities.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">100kWh+</div>
                            <div className="text-sm text-gray-500">Starting Capacity</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">Advanced BMS</div>
                            <div className="text-sm text-gray-500">Intelligent Control</div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 h-14 px-10 rounded-xl text-lg font-bold text-white shadow-lg shadow-green-600/20">
                          <Link href="/products/energy-storage-system">
                            Explore Solution
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollAnimate>

                  <ScrollAnimate animation="slideInRightSmooth" delay={400}>
                    <div className="relative group">
                      <div className="absolute -inset-4 bg-green-500/5 rounded-[2.5rem] blur-2xl group-hover:bg-green-500/10 transition-colors"></div>
                      <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                        <Image
                          src="/pro2.jpg"
                          alt="Energy Storage System"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </ScrollAnimate>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <ScrollAnimate animation="slideInLeftSmooth" delay={500}>
                    <div className="relative group lg:order-2">
                      <div className="absolute -inset-4 bg-blue-500/5 rounded-[2.5rem] blur-2xl group-hover:bg-blue-500/10 transition-colors"></div>
                      <div className="relative h-[400px] md:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                        <Image
                          src="/pro1.jpg"
                          alt="Hydrogen Pules"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    </div>
                  </ScrollAnimate>

                  <ScrollAnimate animation="slideInRightSmooth" delay={600}>
                    <div className="space-y-6 lg:order-1">
                      <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold tracking-wider uppercase">
                        Residential All-in-One
                      </div>
                      <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                        Hydrogen Pules Series
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        Wall-mounted, stack-mounted, and all-in-one ESS for homes and small businesses
                        with hybrid inverter options. Featuring seamless solar integration and backup power capabilities.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">Home Ready</div>
                            <div className="text-sm text-gray-500">Plug & Play</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-4">
                          <div className="mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          </div>
                          <div>
                            <div className="font-bold text-gray-900">High Density</div>
                            <div className="text-sm text-gray-500">LFP Technology</div>
                          </div>
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 h-14 px-10 rounded-xl text-lg font-bold text-white shadow-lg shadow-blue-600/20">
                          <Link href="/products/hydrogen-pules">
                            View Product Line
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </ScrollAnimate>
                </div>
              </>
            )
            }
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold mb-6">
                  Technical Excellence
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Built with industry-leading technology and rigorous safety standards
                  to ensure optimal performance and longevity.
                </p>
              </div>
            </ScrollAnimate>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ScrollAnimate animation="scaleInBounce" delay={300}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">UL9540 Certified</h3>
                  <p className="text-gray-300 text-sm">
                    Meets the highest safety standards for energy storage systems
                  </p>
                </div>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={400}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">High Efficiency</h3>
                  <p className="text-gray-300 text-sm">
                    Up to 98% round-trip efficiency with advanced BMS technology
                  </p>
                </div>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={500}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Solar Integration</h3>
                  <p className="text-gray-300 text-sm">
                    Seamless compatibility with solar PV systems and inverters
                  </p>
                </div>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={600}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Smart Monitoring</h3>
                  <p className="text-gray-300 text-sm">
                    Real-time monitoring and control via mobile app and web portal
                  </p>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Certifications & Compliance
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our products meet the highest international standards and certifications,
                  ensuring safety, reliability, and compliance worldwide.
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="slideInSmooth" delay={300}>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {siteContent.certifications.map((cert, index) => (
                  <div
                    key={cert.label}
                    className="bg-gray-50 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-sm font-semibold text-gray-900">
                      {cert.label}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollAnimate>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <h2 className="text-4xl font-bold mb-6">
                Ready to Power Your Future?
              </h2>
              <p className="text-xl mb-8 text-green-100">
                Contact our experts to discuss your energy storage requirements and get a customized solution.
              </p>
            </ScrollAnimate>

            <ScrollAnimate animation="scaleInBounce" delay={400}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/contact">
                    Request a Quote
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/support">
                    Technical Support
                  </Link>
                </Button>
              </div>
            </ScrollAnimate>
          </div>
        </section>
      </AnimatedContentWrapper>
    </div>
  );
}
