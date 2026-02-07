import { notFound } from 'next/navigation';
import { dbService } from '@/lib/db-service';
import Image from 'next/image';

interface ApplicationsPageProps {
  params: {
    solution: string;
  };
}

export default async function ApplicationsPage(props: ApplicationsPageProps) {
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
      applications: [
        "Utility-scale renewable energy projects",
        "Grid stabilization and frequency regulation",
        "Peak shaving for distribution networks",
        "Renewable energy integration",
        "Microgrid implementations"
      ],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Utility-scale energy storage systems play a crucial role in modernizing the electrical grid. These large-capacity battery systems help utilities manage supply and demand fluctuations, integrate renewable energy sources, and maintain stable power delivery to consumers.",
      pageTitle: "Grid-Scale Deployment Scenarios",
      pageSubtitle: "Transforming power infrastructure with large-scale storage"
    },
    "commercial-industrial": {
      features: [],
      applications: [
        "Industrial parks and manufacturing facilities",
        "Hospitals and healthcare centers",
        "Data centers and IT facilities",
        "Municipal infrastructure",
        "Commercial office buildings"
      ],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Commercial and industrial energy storage solutions provide businesses with greater control over their energy consumption and costs. These systems enable peak demand management, backup power during outages, and integration with on-site renewable generation.",
      pageTitle: "Business Energy Applications",
      pageSubtitle: "Empowering enterprises with intelligent energy solutions"
    },
    "residential-all-in-one": {
      features: [],
      applications: [
        "Single-family residential homes",
        "Small businesses and retail shops",
        "Apartment complexes and condos",
        "Remote off-grid locations",
        "Backup power for critical loads"
      ],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Residential energy storage systems bring power independence to homeowners and small businesses. These compact, easy-to-install solutions store excess solar energy for use during peak hours or outages, reducing electricity bills and providing peace of mind.",
      pageTitle: "Home and Small Business Use Cases",
      pageSubtitle: "Bringing energy independence to everyday consumers"
    },
    "microgrids": {
      features: [],
      applications: [
        "Remote villages and communities",
        "Military bases and defense installations",
        "Campus and institutional microgrids",
        "Industrial facility energy independence",
        "Disaster-resilient community systems"
      ],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Microgrid applications enable communities and facilities to operate independently from the main electrical grid. These localized energy systems enhance resilience, reduce transmission losses, and support sustainable development in remote or vulnerable areas.",
      pageTitle: "Community Energy Independence",
      pageSubtitle: "Localized power systems for resilient communities"
    },
    "renewable-integration": {
      features: [],
      applications: [
        "Solar farm integration with battery storage",
        "Wind energy smoothing and grid support",
        "Hybrid renewable systems combining multiple sources",
        "Agricultural irrigation powered by renewables",
        "EV charging infrastructure with renewable sources"
      ],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Renewable energy integration applications maximize the value of clean power generation. Storage systems smooth out intermittent renewable output, shift energy to periods of high demand, and provide essential grid services that support widespread adoption of solar and wind power.",
      pageTitle: "Clean Energy Integration Solutions",
      pageSubtitle: "Accelerating the transition to sustainable energy"
    }
  };

  // Get detailed content for this solution
  const details = solutionDetails[solution] || {
    features: [],
    applications: [],
    advantages: [],
    relatedProjects: [],
    detailedDescription: "",
    pageTitle: "Solution Applications",
    pageSubtitle: "Real-world implementations of our technology"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/1/ion2.png"
          alt={`${solutionData.title} Applications`}
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
              <h3 className="text-2xl font-semibold mb-6">Primary Application Areas</h3>
              <ul className="space-y-4">
                {details.applications.map((application, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{application}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-80 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src="/1/ion2.png"
                alt="Energy Storage Applications"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          
          <div className="mt-16 bg-blue-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Implementation Benefits</h3>
            <p className="text-gray-700 mb-4">
              Deploying {solutionData.title} systems in these applications delivers measurable value across multiple dimensions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Cost Savings</h4>
                  <p className="mt-2 text-gray-600">Reduce energy expenses through peak demand management and time-of-use optimization.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Reliability</h4>
                  <p className="mt-2 text-gray-600">Ensure uninterrupted power supply during grid outages or emergencies.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Performance</h4>
                  <p className="mt-2 text-gray-600">Enhance power quality and system stability with responsive energy storage.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="flex items-center justify-center h-10 w-10 rounded-md bg-blue-500 text-white">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-medium text-gray-900">Sustainability</h4>
                  <p className="mt-2 text-gray-600">Support environmental goals by maximizing renewable energy utilization.</p>
                </div>
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