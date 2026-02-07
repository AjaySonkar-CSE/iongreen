import Image from "next/image";
import { getSiteContent } from "@/lib/content";
import { SectionHeading } from "./section-heading";

const solutions = getSiteContent().solutions;

// AI-generated Ion Green themed images for solutions cards
const solutionImages = [
  "/images/ai-utility-scale-energy-storage.svg",
  "/images/ai-commercial-industrial.svg",
  "/images/ai-residential-all-in-one.svg",
  "/images/ai-microgrids.svg",
  "/images/ai-renewable-integration.svg",
];

export function SolutionsGrid() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Dark grey background with subtle diagonal pattern */}
      <div className="absolute inset-0 bg-gray-900">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,_rgba(255,255,255,0.02)_25%,_transparent_25%),_linear-gradient(-45deg,_rgba(255,255,255,0.02)_25%,_transparent_25%),_linear-gradient(45deg,_transparent_75%,_rgba(255,255,255,0.02)_75%),_linear-gradient(-45deg,_transparent_75%,_rgba(255,255,255,0.02)_75%)] bg-[size:20px_20px]"></div>
      </div>
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="ION Green Solutions"
          title="Advanced Lithium Battery Solutions for Every Scale"
          description="ION Green delivers cutting-edge lithium battery technology with comprehensive energy storage solutions for utility, commercial, and residential applications."
          tone="light"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {solutions.map((solution, index) => {
            // Use local images in sequence
            let imageUrl = solutionImages[index % solutionImages.length];
            
            return (
              <article
                key={solution.title}
                className="group flex flex-col overflow-hidden rounded-3xl border border-green-100 bg-white shadow-lg hover-card-lift hover-scale-shadow"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={solution.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">
                    {solution.summary}
                  </p>
                  <ul className="space-y-2">
                    {solution.bullets.slice(0, 2).map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-2 h-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <a 
                      href={`/solutions/${solution.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} 
                      className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                    >
                      Learn more
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}