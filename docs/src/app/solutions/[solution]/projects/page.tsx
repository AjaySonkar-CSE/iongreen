import { notFound } from 'next/navigation';
import { dbService } from '@/lib/db-service';
import Image from 'next/image';

interface ProjectsPageProps {
  params: {
    solution: string;
  };
}

export default async function ProjectsPage(props: ProjectsPageProps) {
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
    relatedProjects: {name: string; description: string; image: string}[];
    detailedDescription: string;
    pageTitle: string;
    pageSubtitle: string;
  }> = {
    "utility-scale-energy-storage": {
      features: [],
      applications: [],
      advantages: [],
      relatedProjects: [
        {
          name: "100MW Grid-Scale BESS Installation in Rajasthan",
          description: "A 100MW/400MWh battery energy storage system providing grid stabilization services and renewable energy integration for the Rajasthan State Electricity Board.",
          image: "/1/project1.jpg"
        },
        {
          name: "50MWh Renewable Integration Project in Tamil Nadu",
          description: "A 50MWh system paired with a 75MW solar farm to smooth output variability and provide time-shifting capabilities for peak demand periods.",
          image: "/1/project2.jpg"
        },
        {
          name: "25MW Frequency Regulation System for State Grid",
          description: "A fast-response 25MW/10MWh system providing primary frequency response services to enhance grid reliability and stability.",
          image: "/1/project3.jpg"
        }
      ],
      detailedDescription: "Our utility-scale energy storage projects demonstrate the transformative impact of large-capacity battery systems on modern power grids. These installations support renewable energy integration while providing essential grid services that enhance reliability and efficiency.",
      pageTitle: "Large-Scale Deployment Success Stories",
      pageSubtitle: "Proven performance in demanding grid-scale applications"
    },
    "commercial-industrial": {
      features: [],
      applications: [],
      advantages: [],
      relatedProjects: [
        {
          name: "20MWh Manufacturing Plant BESS in Maharashtra",
          description: "A 20MWh system installed at a major automotive manufacturing facility to reduce peak demand charges and provide backup power during outages.",
          image: "/1/project4.jpg"
        },
        {
          name: "5MWh Hospital Backup System in Delhi",
          description: "A mission-critical 5MWh/20MWh system ensuring uninterrupted power supply for life-support equipment and essential services at a major hospital complex.",
          image: "/1/project5.jpg"
        },
        {
          name: "15MWh Data Center UPS Replacement in Bangalore",
          description: "A 15MWh system replacing traditional diesel generators with clean, quiet battery backup for a hyperscale data center facility.",
          image: "/1/project6.jpg"
        }
      ],
      detailedDescription: "Commercial and industrial energy storage projects showcase the immediate value businesses can realize through intelligent energy management. These installations deliver significant cost savings while enhancing operational resilience.",
      pageTitle: "Enterprise Energy Solutions",
      pageSubtitle: "Transforming business operations through smart energy storage"
    },
    "residential-all-in-one": {
      features: [],
      applications: [],
      advantages: [],
      relatedProjects: [
        {
          name: "500+ Home Solar+Storage Installations Across India",
          description: "A large-scale residential deployment program installing compact energy storage systems in over 500 homes across multiple states, reducing grid dependence and electricity bills.",
          image: "/1/project7.jpg"
        },
        {
          name: "Apartment Complex Microgrid in Pune",
          description: "A community-scale 200kWh system serving 40 residential units with shared solar generation and storage, demonstrating the potential for collective energy independence.",
          image: "/1/project8.jpg"
        },
        {
          name: "Off-Grid Resort System in Goa",
          description: "A 150kWh standalone system providing reliable, clean power for a luxury resort located on a remote beach, eliminating the need for noisy diesel generators.",
          image: "/1/project9.jpg"
        }
      ],
      detailedDescription: "Residential energy storage projects highlight the accessibility and immediate benefits of home energy independence. These installations empower homeowners with greater control over their energy usage while contributing to environmental sustainability.",
      pageTitle: "Residential Energy Independence",
      pageSubtitle: "Bringing smart energy storage to homes across India"
    },
    "microgrids": {
      features: [],
      applications: [],
      advantages: [],
      relatedProjects: [
        {
          name: "Remote Village Electrification in Himachal Pradesh",
          description: "A 500kWh microgrid system bringing reliable electricity to a remote mountain village, supporting local economic development and improved quality of life.",
          image: "/1/project10.jpg"
        },
        {
          name: "Military Base Microgrid in Ladakh",
          description: "A hardened 2MWh microgrid system providing energy security for a strategic military installation in an extreme climate environment.",
          image: "/1/project11.jpg"
        },
        {
          name: "University Campus System in Chennai",
          description: "A 5MWh campus-wide microgrid integrating solar generation, battery storage, and electric vehicle charging infrastructure to support sustainability goals.",
          image: "/1/project12.jpg"
        }
      ],
      detailedDescription: "Microgrid projects demonstrate the power of localized energy systems to enhance resilience and independence. These installations protect communities and facilities from grid outages while supporting sustainable development.",
      pageTitle: "Community Resilience Projects",
      pageSubtitle: "Building stronger, more self-reliant communities"
    },
    "renewable-integration": {
      features: [],
      applications: [],
      advantages: [],
      relatedProjects: [
        {
          name: "100MW Solar+BESS Project in Gujarat",
          description: "A 100MW/400MWh system paired with utility-scale solar to maximize renewable energy utilization and provide essential grid services.",
          image: "/1/project13.jpg"
        },
        {
          name: "50MW Wind Smoothing System in Karnataka",
          description: "A 50MW/200MWh system stabilizing variable wind output and providing frequency regulation services for the Karnataka power grid.",
          image: "/1/project14.jpg"
        },
        {
          name: "Hybrid Solar-Wind Farm in Rajasthan",
          description: "A 75MW/300MWh system integrating both solar and wind generation with storage to provide consistent, dispatchable renewable power.",
          image: "/1/project15.jpg"
        }
      ],
      detailedDescription: "Renewable integration projects showcase how energy storage maximizes the value of clean energy sources. These installations support the transition to a sustainable energy future while maintaining grid reliability.",
      pageTitle: "Clean Energy Integration Success",
      pageSubtitle: "Accelerating the transition to renewable energy"
    }
  };

  // Get detailed content for this solution
  const details = solutionDetails[solution] || {
    features: [],
    applications: [],
    advantages: [],
    relatedProjects: [],
    detailedDescription: "",
    pageTitle: "Solution Projects",
    pageSubtitle: "Real-world implementations showcasing our technology"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <Image
          src="/1/ion4.png"
          alt={`${solutionData.title} Projects`}
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
          
          <h3 className="text-2xl font-semibold mb-6 mt-12">Featured Project Implementations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {details.relatedProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <div className="h-48 relative">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h4>
                  <p className="text-gray-600">{project.description}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center text-green-600 font-medium">
                      View Case Study
                      <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 bg-purple-50 p-8 rounded-xl">
            <h3 className="text-2xl font-semibold mb-4">Project Success Metrics</h3>
            <p className="text-gray-700 mb-4">
              Our {solutionData.title} projects consistently deliver exceptional results across key performance indicators.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600">500+</div>
                <p className="text-gray-600 mt-2">Projects Deployed</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600">99.9%</div>
                <p className="text-gray-600 mt-2">Uptime Reliability</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600">30%</div>
                <p className="text-gray-600 mt-2">Avg. Cost Savings</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                <div className="text-3xl font-bold text-purple-600">25</div>
                <p className="text-gray-600 mt-2">Countries Served</p>
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