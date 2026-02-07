import { dbService } from "@/lib/db-service";
import Image from "next/image";
import Link from "next/link";
import { ScrollAnimate } from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";

// Enable ISR (Incremental Static Regeneration) with a revalidation period
export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function SolutionsPage() {
  const solutions = await dbService.getSolutions();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Professional Solutions Showcase */}
      <section className="relative bg-gradient-to-br from-slate-900 via-green-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6">
                  Comprehensive Energy
                  <span className="text-green-400 block">Solutions</span>
                </h1>
              </ScrollAnimate>

              <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Discover our complete range of energy storage and renewable integration solutions,
                  from residential systems to utility-scale installations. Engineered for maximum
                  efficiency, safety, and sustainability.
                </p>
              </ScrollAnimate>

              <ScrollAnimate animation="scaleInBounce" delay={600}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold"
                  >
                    <Link href="#solution-categories">
                      Explore Solutions
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg"
                  >
                    <Link href="/contact">
                      Get Consultation
                    </Link>
                  </Button>
                </div>
              </ScrollAnimate>
            </div>

            <div className="relative">
              <ScrollAnimate animation="slideInRightSmooth" delay={300}>
                <div className="relative h-96 w-full">
                  <Image
                    src="/1/ion1.png"
                    alt="ION Green Energy Solutions"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>
      </section>

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
               // Local images for solutions (fallback) matching the homepage component
               const fallbackSolutionImages = [
                 "/solution1.png",
                 "/solution2.png",
                 "/solution3.png",
                 "/solution4.png",
                 "/solution5.png",
                 "/solution6.png"
               ];
               // Use database image if available, otherwise fallback to local images using index to cycle through
               const imageUrl = solution.image_url || fallbackSolutionImages[index % fallbackSolutionImages.length];

              return (
              <ScrollAnimate
                key={solution.id}
                animation="scaleInBounce"
                delay={index * 100}
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
            )})}
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