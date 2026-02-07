import { notFound } from 'next/navigation';
import { dbService } from '@/lib/db-service';
import Image from 'next/image';

interface FeaturesPageProps {
  params: {
    solution: string;
  };
}

export default async function FeaturesPage(props: FeaturesPageProps) {
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
      features: [
        "Containerized battery energy storage systems up to 5.015MWh",
        "Advanced safety with multi-level protection systems",
        "SCADA & EMS ready for remote operations and monitoring",
        "Outdoor-rated containers designed for harsh environments",
        "High-safety LFP chemistry with 8000+ cycle life"
      ],
      applications: [],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Our utility-scale energy storage solutions are designed to optimize energy efficiency, enable renewable integration, and provide essential grid services through our turnkey BESS containers. These systems are engineered for maximum reliability and performance in demanding utility environments.",
      pageTitle: "Grid-Scale Energy Storage Technology",
      pageSubtitle: "Advanced BESS solutions for utility operators"
    },
    "commercial-industrial": {
      features: [
        "Modular cabinet and containerized systems from 100kWh to 5.015MWh",
        "Peak shaving and load shifting capabilities",
        "UL9540, UL1973, CE compliant for safety assurance",
        "Smart EMS integration for intelligent energy management",
        "Expandable capacity modules for future growth"
      ],
      applications: [],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Our commercial & industrial energy storage solutions help reduce peak demand charges, stabilize power supply, and ensure business continuity for manufacturing and logistics sites. These systems are specifically designed to meet the demanding requirements of commercial and industrial environments.",
      pageTitle: "Industrial Energy Management Systems",
      pageSubtitle: "Cost-effective solutions for business energy optimization"
    },
    "residential-all-in-one": {
      features: [
        "Wall-mounted and stackable ESS options from 5kWh to 35kWh",
        "Seamless solar integration with hybrid inverters",
        "Backup power ready for emergency situations",
        "Expandable capacity modules for growing energy needs",
        "App-based monitoring for real-time system status"
      ],
      applications: [],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Our residential all-in-one energy storage systems provide smart home battery solutions with wall-mounted and stackable options to pair with rooftop solar or EV charging. These systems offer the perfect balance of performance, reliability, and ease of use for homeowners.",
      pageTitle: "Home Energy Storage Solutions",
      pageSubtitle: "Smart battery systems for residential energy independence"
    },
    "microgrids": {
      features: [
        "Islandable operation for critical facility independence",
        "Integration with multiple renewable energy sources",
        "Advanced control systems for optimal energy management",
        "Scalable architecture for community-wide deployment",
        "Cyber-secure communication protocols"
      ],
      applications: [],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Our microgrid solutions provide independent energy systems that can operate connected to or disconnected from the main grid, offering resilience and energy independence. These systems are ideal for remote locations, critical facilities, and communities seeking energy security.",
      pageTitle: "Autonomous Microgrid Technology",
      pageSubtitle: "Independent power systems for resilient communities"
    },
    "renewable-integration": {
      features: [
        "Smart inverters for renewable source optimization",
        "Battery storage for energy smoothing and shifting",
        "Predictive analytics for renewable energy forecasting",
        "Grid-tied and off-grid configuration options",
        "Advanced power electronics for maximum efficiency"
      ],
      applications: [],
      advantages: [],
      relatedProjects: [],
      detailedDescription: "Our renewable integration solutions seamlessly combine solar, wind, and other renewable energy sources with battery storage for maximum efficiency and reliability. These systems optimize the performance of renewable installations while providing grid support services.",
      pageTitle: "Renewable Energy Integration Systems",
      pageSubtitle: "Maximizing clean energy utilization with smart storage"
    }
  };

  // Get detailed content for this solution
  const details = solutionDetails[solution] || {
    features: [],
    applications: [],
    advantages: [],
    relatedProjects: [],
    detailedDescription: "",
    pageTitle: "Solution Features",
    pageSubtitle: "Advanced technology powering our solutions"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/1/ion1.png"
          alt={`${solutionData.title} Features`}
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
              <h3 className="text-2xl font-semibold mb-6">Core Technology Features</h3>
              <ul className="space-y-4">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative h-80 bg-gray-100 rounded-xl overflow-hidden">
              <Image
                src="/1/ion1.png"
                alt="Advanced Energy Storage Technology"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
          
          <div className="mt-16 bg-green-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Technical Specifications</h3>
            <p className="text-gray-700 mb-4">
              Our {solutionData.title} systems incorporate cutting-edge technology to deliver unmatched performance and reliability. 
              Each component is carefully engineered to work seamlessly within the integrated system architecture.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2">Efficiency</h4>
                <p className="text-gray-600">95%+ round-trip efficiency for maximum energy utilization</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2">Durability</h4>
                <p className="text-gray-600">8000+ cycles at 80% depth of discharge</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-semibold text-green-700 mb-2">Safety</h4>
                <p className="text-gray-600">Multi-level protection systems with real-time monitoring</p>
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