import { dbService } from "@/lib/db-service";
import Image from "next/image";
import Link from "next/link";
import { ScrollAnimate } from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";
import { PageHeroSlider } from "@/components/page-hero-slider";

// Enable ISR (Incremental Static Regeneration) with a revalidation period
export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function SolutionsPage() {
  const solutions = await dbService.getSolutions();

  // Hero slider slides for solutions page
  const heroSlides = [
    {
      id: 1,
      title: "Comprehensive Energy Solutions",
      description: "Discover our complete range of energy storage and renewable integration solutions, from residential systems to utility-scale installations. Engineered for maximum efficiency, safety, and sustainability.",
      ctaLabel: "Explore Solutions",
      ctaHref: "#solution-categories",
      image: "/Img/image1.png"
    },
    {
      id: 2,
      title: "Industry-Specific Solutions",
      description: "Tailored energy solutions for Telecom, Data Centers, Commercial & Industrial, and Battery Backup applications. Customized to meet your specific requirements.",
      ctaLabel: "View Solutions",
      ctaHref: "#solution-categories",
      image: "/Img/image2.png"
    },
    // {
    //   id: 3,
    //   title: "Utility Scale & Microgrids",
    //   description: "Large-scale energy storage for utilities and independent microgrid systems. Enabling renewable integration and grid stability with advanced BESS technology.",
    //   ctaLabel: "Get Consultation",
    //   ctaHref: "/contact",
    //   image: "/Img/image3.png"
    // }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Slider */}
      <PageHeroSlider
        slides={heroSlides}
        height="h-[80vh]"
        showNavigation={true}
        showIndicators={true}
        autoPlay={true}
        autoPlayInterval={5000}
      />

      {/* Solutions Categories Section */}
      <section id="solution-categories" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimate animation="fadeInUpElegant">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Solution Categories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tailored energy solutions for every application, from residential to utility-scale deployments
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => {
              // Use images from Img folder - prioritize database image, then fallback to Img folder images
              const imgFolderImages = [
                "/Img/image1.png",
                "/Img/image2.png",
                "/Img/image3.png",
                "/Img/image4.png",
                "/Img/image5.png",
                "/Img/image6.png",
                "/Img/image7.png",
                "/Img/image8.png",
                "/Img/image9.png",
                "/Img/image11.png",
                "/Img/image12.png",
                "/Img/image13.png",
                "/Img/image14.png"
              ];
              // Use database image if available, otherwise fallback to Img folder images
              const imageUrl = solution.image_url || imgFolderImages[index % imgFolderImages.length];

              return (
                <ScrollAnimate
                  key={solution.id}
                  animation={index % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"}
                  delay={200 + (index * 100)}
                >
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden block transform hover:-translate-y-2"
                  >
                    <div className="relative h-48">
                      <Image
                        src={imageUrl}
                        alt={solution.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {solution.summary}
                      </p>
                      <div className="flex items-center text-green-600 font-medium group-hover:text-green-700">
                        <span>Learn More</span>
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimate>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose ION Green Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimate animation="fadeInUpElegant">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Choose ION Green Solutions?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Leading the energy transition with innovative, reliable, and sustainable solutions
              </p>
            </div>
          </ScrollAnimate>

          <div className="grid md:grid-cols-3 gap-8">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Proven Technology</h3>
                <p className="text-gray-600">
                  Industry-leading LiFePO₄ battery technology with 8000+ cycle life and multi-level safety systems
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="fadeInUpElegant" delay={400}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Maximum Efficiency</h3>
                <p className="text-gray-600">
                  95%+ round-trip efficiency with advanced power electronics and intelligent energy management
                </p>
              </div>
            </ScrollAnimate>

            <ScrollAnimate animation="fadeInUpElegant" delay={600}>
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Global Support</h3>
                <p className="text-gray-600">
                  Worldwide deployment experience with comprehensive technical support and maintenance services
                </p>
              </div>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <ScrollAnimate animation="fadeInUpElegant">
            <h2 className="text-4xl font-bold mb-4">
              Ready to Transform Your Energy Future?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Contact our experts to discuss your specific energy storage requirements and find the perfect solution for your needs.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
            >
              <Link href="/contact">
                Get Started Today
              </Link>
            </Button>
          </ScrollAnimate>
        </div>
      </section>
    </div>
  );
}