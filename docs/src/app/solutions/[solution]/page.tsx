import { notFound } from 'next/navigation';
import { dbService } from '@/lib/db-service';
import Image from 'next/image';
import Link from 'next/link';

interface SolutionPageProps {
  params: {
    solution: string;
  };
}

// Extended solution data with additional details
const solutionDetails: Record<string, {
  features: string[];
  applications: string[];
  advantages: string[];
  relatedProjects: string[];
  detailedDescription: string;
  cardTitles: {
    features: string;
    applications: string;
    advantages: string;
    projects: string;
  };
  cardDescriptions: {
    features: string;
    applications: string;
    advantages: string;
    projects: string;
  };
}> = {
  "utility-scale-energy-storage": {
    features: [
      "Containerized battery energy storage systems up to 5.015MWh",
      "Advanced safety with multi-level protection systems",
      "SCADA & EMS ready for remote operations and monitoring",
      "Outdoor-rated containers designed for harsh environments",
      "High-safety LFP chemistry with 8000+ cycle life"
    ],
    applications: [
      "Utility-scale renewable energy projects",
      "Grid stabilization and frequency regulation",
      "Peak shaving for distribution networks",
      "Renewable energy integration",
      "Microgrid implementations"
    ],
    advantages: [
      "Enables higher penetration of renewable energy",
      "Provides valuable grid services to utilities",
      "Reduces transmission and distribution losses",
      "Supports grid resilience and reliability",
      "Generates revenue through ancillary services"
    ],
    relatedProjects: [
      "100MW Grid-Scale BESS Installation in Rajasthan",
      "50MWh Renewable Integration Project in Tamil Nadu",
      "25MW Frequency Regulation System for State Grid"
    ],
    detailedDescription: "Our utility-scale energy storage solutions are designed to optimize energy efficiency, enable renewable integration, and provide essential grid services through our turnkey BESS containers. These systems are engineered for maximum reliability and performance in demanding utility environments.",
    cardTitles: {
      features: "Grid-Scale Technology",
      applications: "Utility Deployment Scenarios",
      advantages: "Grid Transformation Benefits",
      projects: "Large-Scale Success Stories"
    },
    cardDescriptions: {
      features: "Advanced BESS solutions engineered for utility operators",
      applications: "Transforming power infrastructure with large-scale storage",
      advantages: "Revolutionizing power system operations and economics",
      projects: "Proven performance in demanding grid-scale applications"
    }
  },
  "commercial-industrial": {
    features: [
      "Modular cabinet and containerized systems from 100kWh to 5.015MWh",
      "Peak shaving and load shifting capabilities",
      "UL9540, UL1973, CE compliant for safety assurance",
      "Smart EMS integration for intelligent energy management",
      "Expandable capacity modules for future growth"
    ],
    applications: [
      "Industrial parks and manufacturing facilities",
      "Hospitals and healthcare centers",
      "Data centers and IT facilities",
      "Municipal infrastructure",
      "Commercial office buildings"
    ],
    advantages: [
      "Significant reduction in peak demand charges",
      "Enhanced energy cost savings through load shifting",
      "Improved power quality and grid stability",
      "Reliable backup power during outages",
      "Seamless integration with existing electrical infrastructure"
    ],
    relatedProjects: [
      "20MWh Manufacturing Plant BESS in Maharashtra",
      "5MWh Hospital Backup System in Delhi",
      "15MWh Data Center UPS Replacement in Bangalore"
    ],
    detailedDescription: "Our commercial & industrial energy storage solutions help reduce peak demand charges, stabilize power supply, and ensure business continuity for manufacturing and logistics sites. These systems are specifically designed to meet the demanding requirements of commercial and industrial environments.",
    cardTitles: {
      features: "Industrial Energy Systems",
      applications: "Business Applications",
      advantages: "Enterprise Value Creation",
      projects: "Commercial Success Stories"
    },
    cardDescriptions: {
      features: "Cost-effective solutions for business energy optimization",
      applications: "Empowering enterprises with intelligent energy solutions",
      advantages: "Driving operational efficiency and cost reduction",
      projects: "Transforming business operations through smart energy storage"
    }
  },
  "residential-all-in-one": {
    features: [
      "Wall-mounted and stackable ESS options from 5kWh to 35kWh",
      "Seamless solar integration with hybrid inverters",
      "Backup power ready for emergency situations",
      "Expandable capacity modules for growing energy needs",
      "App-based monitoring for real-time system status"
    ],
    applications: [
      "Single-family residential homes",
      "Small businesses and retail shops",
      "Apartment complexes and condos",
      "Remote off-grid locations",
      "Backup power for critical loads"
    ],
    advantages: [
      "Reduced electricity bills through self-consumption",
      "Energy independence and grid independence",
      "Quiet and clean backup power solution",
      "Increased home value and marketability",
      "Simple installation with minimal maintenance"
    ],
    relatedProjects: [
      "500+ Home Solar+Storage Installations Across India",
      "Apartment Complex Microgrid in Pune",
      "Off-Grid Resort System in Goa"
    ],
    detailedDescription: "Our residential all-in-one energy storage systems provide smart home battery solutions with wall-mounted and stackable options to pair with rooftop solar or EV charging. These systems offer the perfect balance of performance, reliability, and ease of use for homeowners.",
    cardTitles: {
      features: "Home Energy Solutions",
      applications: "Residential Use Cases",
      advantages: "Homeowner Empowerment",
      projects: "Residential Success Stories"
    },
    cardDescriptions: {
      features: "Smart battery systems for residential energy independence",
      applications: "Bringing energy independence to everyday consumers",
      advantages: "Putting energy control in the hands of consumers",
      projects: "Bringing smart energy storage to homes across India"
    }
  },
  "microgrids": {
    features: [
      "Islandable operation for critical facility independence",
      "Integration with multiple renewable energy sources",
      "Advanced control systems for optimal energy management",
      "Scalable architecture for community-wide deployment",
      "Cyber-secure communication protocols"
    ],
    applications: [
      "Remote villages and communities",
      "Military bases and defense installations",
      "Campus and institutional microgrids",
      "Industrial facility energy independence",
      "Disaster-resilient community systems"
    ],
    advantages: [
      "Complete energy independence from the main grid",
      "Enhanced resilience during natural disasters",
      "Reduced reliance on diesel generators",
      "Lower long-term energy costs",
      "Improved environmental sustainability"
    ],
    relatedProjects: [
      "Remote Village Electrification in Himachal Pradesh",
      "Military Base Microgrid in Ladakh",
      "University Campus System in Chennai"
    ],
    detailedDescription: "Our microgrid solutions provide independent energy systems that can operate connected to or disconnected from the main grid, offering resilience and energy independence. These systems are ideal for remote locations, critical facilities, and communities seeking energy security.",
    cardTitles: {
      features: "Autonomous Microgrid Tech",
      applications: "Community Applications",
      advantages: "Energy Resilience & Independence",
      projects: "Community Resilience Projects"
    },
    cardDescriptions: {
      features: "Independent power systems for resilient communities",
      applications: "Localized power systems for resilient communities",
      advantages: "Building stronger, more self-reliant communities",
      projects: "Building stronger, more self-reliant communities"
    }
  },
  "renewable-integration": {
    features: [
      "Smart inverters for renewable source optimization",
      "Battery storage for energy smoothing and shifting",
      "Predictive analytics for renewable energy forecasting",
      "Grid-tied and off-grid configuration options",
      "Advanced power electronics for maximum efficiency"
    ],
    applications: [
      "Solar farm integration with battery storage",
      "Wind energy smoothing and grid support",
      "Hybrid renewable systems combining multiple sources",
      "Agricultural irrigation powered by renewables",
      "EV charging infrastructure with renewable sources"
    ],
    advantages: [
      "Maximized renewable energy utilization",
      "Smoothed power output to reduce grid stress",
      "Improved renewable energy economics",
      "Enhanced grid stability and reliability",
      "Reduced carbon footprint and emissions"
    ],
    relatedProjects: [
      "100MW Solar+BESS Project in Gujarat",
      "50MW Wind Smoothing System in Karnataka",
      "Hybrid Solar-Wind Farm in Rajasthan"
    ],
    detailedDescription: "Our renewable integration solutions seamlessly combine solar, wind, and other renewable energy sources with battery storage for maximum efficiency and reliability. These systems optimize the performance of renewable installations while providing grid support services.",
    cardTitles: {
      features: "Renewable Integration Systems",
      applications: "Clean Energy Applications",
      advantages: "Clean Energy Maximization",
      projects: "Renewable Integration Success"
    },
    cardDescriptions: {
      features: "Maximizing clean energy utilization with smart storage",
      applications: "Accelerating the transition to sustainable energy",
      advantages: "Unlocking the full potential of renewable resources",
      projects: "Accelerating the transition to renewable energy"
    }
  }
};

export default async function SolutionPage(props: SolutionPageProps) {
  const params = props.params;

  const { solution } = params;

  // Fetch solution data from database
  const solutionData = await dbService.getSolutionBySlug(solution);

  if (!solutionData) {
    notFound();
  }

  // Get detailed content for this solution
  const solutionKey = solution;
  const details = solutionDetails[solutionKey] || {
    features: [],
    applications: [],
    advantages: [],
    relatedProjects: [],
    detailedDescription: "",
    cardTitles: {
      features: "Solution Features",
      applications: "Solution Applications",
      advantages: "Solution Advantages",
      projects: "Related Projects"
    },
    cardDescriptions: {
      features: "Advanced technology powering our solutions",
      applications: "Real-world implementations of our technology",
      advantages: "Key benefits delivered by our technology",
      projects: "Successful implementations showcasing our solutions"
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Video Background */}
      <div className="relative h-screen w-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/herovideo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {solutionData.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
            {solutionData.summary}
          </p>
          <h3 className="text-2xl font-semibold mb-4 text-white mt-8">Key Benefits</h3>
          <ul className="space-y-3 mb-8 max-w-3xl mx-auto">
            {solutionData.description.split('\n').filter(bullet => bullet.trim() !== '').map((bullet, index) => (
              <li key={index} className="flex items-start text-white">
                <svg className="h-6 w-6 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-200">{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <a
              href="tel:+919202836627"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-200"
            >
              Contact Us for More Information
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="relative h-96 bg-gray-100 rounded-xl overflow-hidden">
          <Image
            src={solutionData.image_url || "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"}
            alt={solutionData.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-lg font-medium">
              {solutionData.title} - Sustainable Energy Solution
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}