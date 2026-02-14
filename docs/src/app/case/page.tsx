import Image from "next/image";
import { Hero } from "@/components/hero";
import { ScrollAnimate } from "@/components/scroll-animate";
import { dbService } from '@/lib/db-service';
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  id: number;
  title: string;
  region: string;
  summary: string;
  impact: string[];
  image_url: string;
  image?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

export default async function CasePage() {
  let caseStudies: CaseStudy[] = [];
  let isLoading = false;

  // Default case studies
  const defaultCaseStudies: CaseStudy[] = [
    {
      id: 1,
      title: "Commercial Energy Storage System",
      region: "North America",
      summary: "Deployed a 2MWh energy storage system for a commercial complex, reducing peak demand charges by 40%.",
      impact: [
        "40% reduction in peak demand charges",
        "30% increase in renewable energy usage",
        "Seamless backup during grid outages"
      ],
      image_url: "/case1.jpg",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 2,
      title: "Industrial Microgrid Project",
      region: "Europe",
      summary: "Implemented a 5MWh microgrid solution for an industrial facility, ensuring 24/7 power availability.",
      impact: [
        "99.9% power reliability",
        "50% reduction in carbon footprint",
        "ROI achieved in 3.5 years"
      ],
      image_url: "/case2.jpg",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: 3,
      title: "Residential Community Storage",
      region: "Asia",
      summary: "Deployed community energy storage for a residential complex, enabling energy sharing and cost savings.",
      impact: [
        "25% reduction in energy costs",
        "Improved grid stability",
        "Enhanced renewable energy integration"
      ],
      image_url: "/case3.jpg",
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  try {
    const fetchedCaseStudies = await dbService.getCaseStudies();
    if (fetchedCaseStudies && fetchedCaseStudies.length > 0) {
      caseStudies = fetchedCaseStudies.map((item: any) => ({
        ...item,
        image: item.image_url || "/case1.jpg",
        is_active: item.is_active !== undefined ? item.is_active : true
      }));
    } else {
      caseStudies = defaultCaseStudies;
    }
  } catch (_) {
    caseStudies = defaultCaseStudies;
  }

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <Hero page="case">
        <div className="text-center">
          <ScrollAnimate animation="fadeInUpElegant" delay={200}>
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Case & Project Highlights
            </h1>
          </ScrollAnimate>
          <ScrollAnimate animation="fadeInUpElegant" delay={300}>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
              Discover how ION Green deployments stabilize energy costs, integrate renewables, and deliver resilient backup power.
            </p>
          </ScrollAnimate>
        </div>
      </Hero>

      <AnimatedContentWrapper>


        {/* ION Green Case Title Section */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" delay={400}>
              <h2 className="text-3xl font-bold text-center text-green-700 mb-4">
                ION Green Case Studies
              </h2>
            </ScrollAnimate>
          </div>
        </section>

        {/* Vertical Layout - Content First, Image Below */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="flex flex-col gap-8">
              {/* ION Green Related Content */}
              <div className="w-full">
                <ScrollAnimate animation="fadeInUpElegant" delay={500}>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">ION Green Success Stories</h3>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={600}>
                  <p className="text-slate-600 mb-4">
                    ION Green has successfully deployed energy storage solutions across diverse industries and geographies, demonstrating the versatility and reliability of our technology.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={700}>
                  <p className="text-slate-600 mb-4">
                    Our case studies showcase real-world applications where ION Green systems have delivered measurable benefits in terms of cost savings, energy independence, and environmental impact.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={800}>
                  <p className="text-slate-600 mb-4">
                    From residential communities to large industrial complexes, our projects highlight the transformative potential of advanced battery energy storage systems in creating a sustainable energy future.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={900}>
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-slate-900 mb-3">Project Highlights:</h4>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>Over 500 successful deployments globally</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>Average ROI achieved in under 4 years</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>Carbon footprint reduction of up to 60%</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2 text-green-600">✓</span>
                        <span>99.9% system reliability and uptime</span>
                      </li>
                    </ul>
                  </div>
                </ScrollAnimate>
              </div>

              {/* Image Below Content */}
              <div className="w-full flex items-center justify-center">
                <ScrollAnimate animation="scaleInBounce" delay={1000}>
                  <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src="/3/title2.png"
                      alt="ION Green Case Study"
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

        <section id="case-studies" className="bg-white py-20">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              {caseStudies.map((study, index) => (
                <ScrollAnimate
                  key={study.id || study.title}
                  animation="scaleInBounce"
                  delay={200 + (index * 100)}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-96"
                >
                  {/* Full-size image background */}
                  <div className="absolute inset-0">
                    <Image
                      src={study.image_url || `/case${study.id}.jpg`}
                      alt={study.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority
                    />
                  </div>

                  {/* Region badge */}
                  <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-2.5 py-1 rounded-full z-10">
                    {study.region}
                  </span>

                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Content overlay - appears on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                        {study.title}
                      </h3>
                      <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                        {study.summary}
                      </p>

                      {study.impact && study.impact.length > 0 && (
                        <div className="mb-3">
                          <div className="text-sm font-medium text-green-600 mb-1">Key Impacts:</div>
                          <ul className="space-y-1">
                            {study.impact.slice(0, 2).map((bullet, bulletIndex) => (
                              <li key={`${study.id}-impact-${bulletIndex}`} className="text-xs text-gray-600 flex items-start gap-1">
                                <span className="text-green-500 mt-1">•</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                        <span>View Case Study</span>
                        <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Project Highlights Section */}
        <section className="py-16 bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" delay={200}>
              <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
                Project Highlights
              </h2>
            </ScrollAnimate>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: '🌍',
                  title: 'Global Deployments',
                  description: 'Over 500 successful deployments globally',
                  image: '/global-deployments.jpg'
                },
                {
                  icon: '💰',
                  title: 'Fast ROI',
                  description: 'Average ROI achieved in under 4 years',
                  image: '/fast-roi.jpg'
                },
                {
                  icon: '🌱',
                  title: 'Carbon Reduction',
                  description: 'Carbon footprint reduction of up to 60%',
                  image: '/carbon-reduction.jpg'
                },
                {
                  icon: '⚡',
                  title: 'System Reliability',
                  description: '99.9% system reliability and uptime',
                  image: '/reliability.jpg'
                }
              ].map((highlight, index) => (
                <ScrollAnimate
                  key={highlight.title}
                  animation="scaleInBounce"
                  delay={300 + (index * 100)}
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 p-6 h-64 flex flex-col items-center justify-center text-center">
                    <div className="text-4xl mb-4">{highlight.icon}</div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {highlight.title}
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {highlight.description}
                    </p>
                  </div>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>
      </AnimatedContentWrapper>
    </div>
  );
}
