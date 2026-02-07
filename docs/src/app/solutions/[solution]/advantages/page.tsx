import { notFound } from 'next/navigation';
import { dbService } from '@/lib/db-service';
import Image from 'next/image';

interface AdvantagesPageProps {
  params: {
    solution: string;
  };
}

export default async function AdvantagesPage(props: AdvantagesPageProps) {
  const params = await props.params;

  const { solution } = params;

  // Fetch solution data from database
  const solutionData = await dbService.getSolutionBySlug(solution);

  if (!solutionData) {
    notFound();
  }

  // Extended solution data with additional details
  const solutionDetails: Record<string, {
    features: string[];
    applications: string[];
    advantages: string[];
    relatedProjects: string[];
    detailedDescription: string;
    pageTitle: string;
    pageSubtitle: string;
  }> = {
    "utility-scale-energy-storage": {
      features: [],
      applications: [],
      advantages: [
        "Enables higher penetration of renewable energy",
        "Provides valuable grid services to utilities",
        "Reduces transmission and distribution losses",
        "Supports grid resilience and reliability",
        "Generates revenue through ancillary services"
      ],
      relatedProjects: [],
      detailedDescription: "Utility-scale energy storage systems deliver transformative benefits to power grids and energy markets. These large-capacity installations enable system operators to integrate higher levels of renewable energy while maintaining grid stability and reliability.",
      pageTitle: "Grid Transformation Benefits",
      pageSubtitle: "Revolutionizing power system operations and economics"
    },
    "commercial-industrial": {
      features: [],
      applications: [],
      advantages: [
        "Significant reduction in peak demand charges",
        "Enhanced energy cost savings through load shifting",
        "Improved power quality and grid stability",
        "Reliable backup power during outages",
        "Seamless integration with existing electrical infrastructure"
      ],
      relatedProjects: [],
      detailedDescription: "Commercial and industrial energy storage solutions provide businesses with powerful tools to optimize their energy consumption and reduce operational costs. These systems deliver immediate financial benefits while enhancing operational resilience.",
      pageTitle: "Business Value Creation",
      pageSubtitle: "Driving operational efficiency and cost reduction"
    },
    "residential-all-in-one": {
      features: [],
      applications: [],
      advantages: [
        "Reduced electricity bills through self-consumption",
        "Energy independence and grid independence",
        "Quiet and clean backup power solution",
        "Increased home value and marketability",
        "Simple installation with minimal maintenance"
      ],
      relatedProjects: [],
      detailedDescription: "Residential energy storage systems empower homeowners with greater control over their energy usage and costs. These systems provide immediate benefits through reduced utility bills while contributing to long-term property value appreciation.",
      pageTitle: "Homeowner Empowerment",
      pageSubtitle: "Putting energy control in the hands of consumers"
    },
    "microgrids": {
      features: [],
      applications: [],
      advantages: [
        "Complete energy independence from the main grid",
        "Enhanced resilience during natural disasters",
        "Reduced reliance on diesel generators",
        "Lower long-term energy costs",
        "Improved environmental sustainability"
      ],
      relatedProjects: [],
      detailedDescription: "Microgrid solutions provide communities and facilities with unprecedented energy independence and resilience. These systems protect against grid outages while supporting sustainable development goals.",
      pageTitle: "Energy Resilience & Independence",
      pageSubtitle: "Building stronger, more self-reliant communities"
    },
    "renewable-integration": {
      features: [],
      applications: [],
      advantages: [
        "Maximized renewable energy utilization",
        "Smoothed power output to reduce grid stress",
        "Improved renewable energy economics",
        "Enhanced grid stability and reliability",
        "Reduced carbon footprint and emissions"
      ],
      relatedProjects: [],
      detailedDescription: "Renewable energy integration solutions unlock the full potential of clean energy sources. These systems maximize the value of solar and wind installations while supporting the transition to a sustainable energy future.",
      pageTitle: "Clean Energy Maximization",
      pageSubtitle: "Unlocking the full potential of renewable resources"
    }
  };

  // Get detailed content for this solution
  const details = solutionDetails[solution] || {
    features: [],
    applications: [],
    advantages: [],
    relatedProjects: [],
    detailedDescription: "",
    pageTitle: "Solution Advantages",
    pageSubtitle: "Key benefits delivered by our technology"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/1/ion3.png"
          alt={`${solutionData.title} Advantages`}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{solutionData.title}</h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              {details.pageTitle}
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="prose max-w-none">
          <h2 className="text-3xl font-bold mb-6">{details.pageTitle}</h2>
          <p className="text-lg text-gray-600 mb-2">{details.pageSubtitle}</p>
          
          <p className="text-lg text-gray-700 mb-8">{details.detailedDescription}</p>
          
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Key Value Propositions</h3>
              <ul className="space-y-4">
                {details.advantages.map((advantage, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{advantage}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-80 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src="/1/ion3.png"
                alt="Energy Storage Benefits"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          
          <div className="mt-16 bg-yellow-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Quantified Impact</h3>
            <p className="text-gray-700 mb-4">
              Our {solutionData.title} solutions deliver measurable results that translate into tangible business value.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-yellow-600">30%</div>
                <p className="text-gray-600 mt-2">Reduction in energy costs</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-yellow-600">99.9%</div>
                <p className="text-gray-600 mt-2">System availability</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-yellow-600">25+</div>
                <p className="text-gray-600 mt-2">Years of operation</p>
              </div>
            </div>
          </div>
          
          <div className="mt-16">
            <a
              href={`/solutions/${solution}`}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to {solutionData.title}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}