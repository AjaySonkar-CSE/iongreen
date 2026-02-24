import { notFound } from 'next/navigation';
import { dbService } from '@/lib/db-service';
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimate } from '@/components/scroll-animate';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SolutionPageProps {
  params: Promise<{
    solution: string;
  }>;
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
  },
  "telecom-industry": {
    features: [
      "High reliability with 99.9% uptime guarantee",
      "Long cycle life (8000+ cycles) for extended service",
      "Wide operating temperature range (-20°C to 60°C)",
      "Modular design for easy expansion",
      "Remote monitoring and management capabilities",
      "UL9540 and CE certified for safety compliance"
    ],
    applications: [
      "Base station backup power",
      "Data center UPS systems",
      "Network equipment protection",
      "Emergency communication systems",
      "Remote site power supply"
    ],
    advantages: [
      "Ensures continuous network availability",
      "Reduces operational costs through peak shaving",
      "Supports renewable energy integration",
      "Low maintenance requirements",
      "Scalable architecture for growing networks"
    ],
    relatedProjects: [
      "500+ Base Station Backup Systems Across India",
      "Telecom Tower Microgrid in Rajasthan",
      "Emergency Communication Network in Maharashtra"
    ],
    detailedDescription: "Our advanced battery energy storage systems (BESS) are specifically designed for telecommunications infrastructure, providing reliable backup power to ensure uninterrupted network operations. These solutions are critical for maintaining connectivity during power outages and grid instability.",
    cardTitles: {
      features: "Telecom Technology",
      applications: "Network Applications",
      advantages: "Telecom Benefits",
      projects: "Telecom Success Stories"
    },
    cardDescriptions: {
      features: "Reliable backup power solutions for telecommunications",
      applications: "Ensuring uninterrupted connectivity worldwide",
      advantages: "Maximizing network uptime and reliability",
      projects: "Powering communication networks across India"
    }
  },
  "data-centre-solutions": {
    features: [
      "Containerized systems from 500kWh to 5MWh",
      "N+1 redundancy for maximum reliability",
      "Advanced cooling systems for optimal performance",
      "Real-time monitoring and predictive maintenance",
      "Integration with existing UPS systems",
      "Fast response time (<100ms) for seamless transition"
    ],
    applications: [
      "Data center UPS backup",
      "Peak shaving and load shifting",
      "Grid stabilization services",
      "Renewable energy integration",
      "Emergency power systems",
      "Power quality improvement"
    ],
    advantages: [
      "Guaranteed uptime for critical operations",
      "Significant reduction in electricity costs",
      "Enhanced power quality and reliability",
      "Support for green energy initiatives",
      "Scalable solutions for growing data centers",
      "Comprehensive monitoring and control"
    ],
    relatedProjects: [
      "10MWh Data Center BESS in Bangalore",
      "5MWh Cloud Infrastructure Backup in Mumbai",
      "15MWh Enterprise Data Center in Delhi"
    ],
    detailedDescription: "Our containerized and modular energy storage systems are engineered for data center applications, providing critical backup power and intelligent load management. These solutions ensure zero downtime and optimal power efficiency for mission-critical operations.",
    cardTitles: {
      features: "Data Center Technology",
      applications: "Mission-Critical Applications",
      advantages: "Data Center Benefits",
      projects: "Data Center Success Stories"
    },
    cardDescriptions: {
      features: "Mission-critical energy storage for data centers",
      applications: "Ensuring zero downtime for critical operations",
      advantages: "Maximizing reliability and cost efficiency",
      projects: "Powering India's digital infrastructure"
    }
  },
  "battery-backup": {
    features: [
      "Residential systems from 5kWh to 35kWh",
      "Commercial systems up to 500kWh",
      "Seamless automatic transfer switching",
      "Solar integration ready",
      "Long-lasting LiFePO4 battery technology",
      "User-friendly monitoring apps"
    ],
    applications: [
      "Residential backup power",
      "Small business continuity",
      "Home office power supply",
      "Medical equipment backup",
      "Security system power",
      "Emergency lighting systems"
    ],
    advantages: [
      "Peace of mind during power outages",
      "Energy independence",
      "Solar energy storage capability",
      "Low maintenance requirements",
      "Long service life (10+ years)",
      "Quiet and clean operation"
    ],
    relatedProjects: [
      "1000+ Residential Backup Installations",
      "Small Business Continuity Systems in Pune",
      "Medical Facility Backup in Mumbai"
    ],
    detailedDescription: "Our comprehensive battery backup systems provide reliable power continuity for residential, commercial, and critical applications. Whether for home use, small businesses, or essential services, our solutions ensure you stay powered during grid outages.",
    cardTitles: {
      features: "Backup Power Technology",
      applications: "Backup Applications",
      advantages: "Backup Benefits",
      projects: "Backup Success Stories"
    },
    cardDescriptions: {
      features: "Reliable battery backup for all applications",
      applications: "Ensuring power continuity when you need it most",
      advantages: "Providing peace of mind and energy security",
      projects: "Protecting homes and businesses across India"
    }
  }
};

import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

export default async function SolutionPage(props: SolutionPageProps) {
  const params = await props.params;

  const { solution } = params;

  // Fetch solution data from database
  let solutionData;
  try {
    solutionData = await dbService.getSolutionBySlug(solution);
  } catch (error) {
    console.error('Error fetching solution:', error);
    notFound();
  }

  if (!solutionData) {
    console.warn(`Solution not found: ${solution}`);
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

  // Use image from Img folder if available, otherwise use database image
  const imgFolderImages = [
    "/Img/image1.png", "/Img/image2.png", "/Img/image3.png", "/Img/image4.png",
    "/Img/image5.png", "/Img/image6.png", "/Img/image7.png", "/Img/image8.png",
    "/Img/image9.png", "/Img/image11.png", "/Img/image12.png", "/Img/image13.png", "/Img/image14.png"
  ];
  const imageIndex = solutionKey.length % imgFolderImages.length;
  const heroImage = solutionData.image_url || imgFolderImages[imageIndex];

  // Parse description into structured sections for highlighted display
  const parseDescription = (desc: string) => {
    // Sanitize: strip garbled Unicode chars (MySQL encoding corruption) and original special chars
    const sanitize = (text: string) => text
      .replace(/[\u2714\u2713\u2717\u2022\u25C6\u25B6\u25BA\u2605\u2606]/g, '') // Unicode special chars
      .replace(/Ô£ö|Ô£ô|Ô£ë|Ô£ù|ÔÇô|â\x9C\x94|â\x9C\x93|â\x80¢|â\x97\x86/g, '') // Garbled encodings
      .replace(/[✔✓✗★☆]/g, '') // Any remaining special chars
      .trim();

    const lines = desc.split('\n').map(l => sanitize(l)).filter(Boolean);
    const sections: { heading: string; items: { text: string; type: 'bullet' | 'text' }[] }[] = [];
    let current: { heading: string; items: { text: string; type: 'bullet' | 'text' }[] } | null = null;

    for (const line of lines) {
      const isBullet = /^[•\-*◆▶►]/.test(line) || /^\d+[\.)]/.test(line);
      const isHeading = !isBullet && line.endsWith(':') && line.length < 80;

      if (isHeading) {
        if (current) sections.push(current);
        current = { heading: line.replace(/:$/, '').trim(), items: [] };
      } else if (isBullet) {
        if (!current) current = { heading: 'Details', items: [] };
        current.items.push({
          text: line.replace(/^[•\-*◆▶►]\s*/, '').replace(/^\d+[\.)]\s*/, '').trim(),
          type: 'bullet'
        });
      } else {
        // Plain text paragraph - add as a text type item
        if (!current) current = { heading: 'About', items: [] };
        current.items.push({ text: line, type: 'text' });
      }
    }
    if (current && current.items.length > 0) sections.push(current);
    return sections;

  };

  const descriptionSections = parseDescription(solutionData.description || '');

  // Section heading colors for variety
  const sectionColors = [
    { bg: 'bg-green-50', border: 'border-green-500', icon: 'bg-green-500', bullet: 'text-green-500', text: 'text-gray-700', head: 'text-green-800', badge: 'bg-green-500' },
    { bg: 'bg-blue-50', border: 'border-blue-500', icon: 'bg-blue-500', bullet: 'text-blue-500', text: 'text-gray-700', head: 'text-blue-800', badge: 'bg-blue-500' },
    { bg: 'bg-amber-50', border: 'border-amber-500', icon: 'bg-amber-500', bullet: 'text-amber-500', text: 'text-gray-700', head: 'text-amber-800', badge: 'bg-amber-500' },
    { bg: 'bg-purple-50', border: 'border-purple-500', icon: 'bg-purple-500', bullet: 'text-purple-500', text: 'text-gray-700', head: 'text-purple-800', badge: 'bg-purple-500' },
    { bg: 'bg-rose-50', border: 'border-rose-500', icon: 'bg-rose-500', bullet: 'text-rose-500', text: 'text-gray-700', head: 'text-rose-800', badge: 'bg-rose-500' },
    { bg: 'bg-teal-50', border: 'border-teal-500', icon: 'bg-teal-500', bullet: 'text-teal-500', text: 'text-gray-700', head: 'text-teal-800', badge: 'bg-teal-500' },
    { bg: 'bg-indigo-50', border: 'border-indigo-500', icon: 'bg-indigo-500', bullet: 'text-indigo-500', text: 'text-gray-700', head: 'text-indigo-800', badge: 'bg-indigo-500' },
    { bg: 'bg-orange-50', border: 'border-orange-500', icon: 'bg-orange-500', bullet: 'text-orange-500', text: 'text-gray-700', head: 'text-orange-800', badge: 'bg-orange-500' },
  ];


  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section with Image Background - Fixed like home page */}
      <section className="fixed inset-0 h-screen w-full overflow-hidden z-0">
        <div className="absolute inset-0">
          <Image
            src={heroImage}
            alt={solutionData.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-green-900/70 to-slate-800/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-green-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-56 h-56 bg-green-300/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <ScrollAnimate animation="fadeInUpElegant" delay={200}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              {solutionData.title}
            </h1>
          </ScrollAnimate>

          <ScrollAnimate animation="fadeInUpElegant" delay={400}>
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto mb-8 drop-shadow-lg leading-relaxed">
              {solutionData.summary}
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="scaleInBounce" delay={600}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-xl"
              >
                <Link href="/contact">
                  Get Consultation
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold"
              >
                <Link href="#features">
                  Learn More
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </section>

      <AnimatedContentWrapper>


        {/* Overview Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <div className="text-center mb-12">
                <span className="text-green-600 font-bold tracking-widest uppercase text-sm">Overview</span>
                <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">Solution Overview</h2>
                {/* Show only the summary — short & clean */}
                <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
                  {solutionData.summary}
                </p>
              </div>
            </ScrollAnimate>

            {/* Hero Image */}
            <ScrollAnimate animation="slideInRightSmooth" delay={300}>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-[16/9]">
                <Image
                  src={heroImage}
                  alt={solutionData.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </ScrollAnimate>
          </div>
        </section>

        {/* Highlights Section — Description Data + Gallery Images Combined */}
        {(descriptionSections.length > 0 || (solutionData.gallery && solutionData.gallery.length > 0)) && (
          <section id="highlights" className="py-24 bg-slate-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <div className="text-center mb-20">
                  <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-4 block">Key Details</span>
                  <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Solution Highlights</h2>
                  <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full"></div>
                </div>
              </ScrollAnimate>

              <div className="space-y-24">
                {/* Description sections as highlights */}
                {descriptionSections.map((section, index) => {
                  const color = sectionColors[index % sectionColors.length];
                  // Find matching gallery image if available
                  const galleryItem = solutionData.gallery && solutionData.gallery[index];
                  const hasImage = galleryItem && galleryItem.image_url;

                  return (
                    <div key={`desc-${index}`} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>

                      {/* Image side */}
                      {hasImage ? (
                        <div className="w-full lg:w-1/2">
                          <ScrollAnimate animation={index % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"} delay={300}>
                            <div className="group relative">
                              <div className={`absolute -inset-4 ${color.bg} rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700 ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}></div>
                              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50 bg-white aspect-[4/3]">
                                <Image
                                  src={galleryItem.image_url}
                                  alt={section.heading}
                                  fill
                                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                  sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                              </div>
                            </div>
                          </ScrollAnimate>
                        </div>
                      ) : (
                        <div className="w-full lg:w-1/2">
                          <ScrollAnimate animation={index % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"} delay={300}>
                            <div className={`${color.bg} rounded-2xl p-12 flex items-center justify-center min-h-[280px] border-2 ${color.border}`}>
                              <span className="text-[8rem] font-black opacity-20 select-none text-slate-300">
                                0{index + 1}
                              </span>
                            </div>
                          </ScrollAnimate>
                        </div>
                      )}

                      {/* Text side */}
                      <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                          <div className="relative">
                            {/* Background number */}
                            <span className="absolute -top-12 -left-6 text-[7rem] font-black text-slate-100 select-none z-0 hidden lg:block">
                              0{index + 1}
                            </span>

                            <div className={`relative z-10 pl-5 border-l-4 ${color.border}`}>
                              <h3 className={`text-2xl md:text-3xl font-bold ${color.head} mb-6 flex items-center gap-3`}>
                                <span className={`inline-flex w-10 h-10 rounded-xl ${color.badge} text-white items-center justify-center text-lg font-bold flex-shrink-0 shadow-md`}>
                                  {index + 1}
                                </span>
                                {section.heading}
                              </h3>

                              <div className="space-y-3">
                                {section.items.map((item, ii) => (
                                  item.type === 'bullet' ? (
                                    <div key={ii} className="flex items-start gap-3">
                                      <div className={`w-5 h-5 rounded-full ${color.bg} ${color.border} border flex items-center justify-center flex-shrink-0 mt-0.5`}>
                                        <svg className={`w-3 h-3 ${color.bullet}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                      </div>
                                      <span className="text-slate-700 leading-relaxed">{item.text}</span>
                                    </div>
                                  ) : (
                                    <p key={ii} className="text-slate-600 leading-relaxed">{item.text}</p>
                                  )
                                ))}
                              </div>

                              {/* Gallery image description if available */}
                              {hasImage && galleryItem.description && (
                                <p className="mt-6 text-sm text-slate-500 italic border-t border-slate-200 pt-4">
                                  {galleryItem.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </ScrollAnimate>
                      </div>
                    </div>
                  );
                })}

                {/* Extra gallery images that don't have matching description sections */}
                {solutionData.gallery && solutionData.gallery.slice(descriptionSections.length).map((item: any, idx: number) => {
                  const index = descriptionSections.length + idx;
                  return (
                    <div key={`gallery-${idx}`} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-16 items-center`}>
                      <div className="w-full lg:w-1/2">
                        <ScrollAnimate animation={index % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"} delay={300}>
                          <div className="group relative">
                            <div className={`absolute -inset-4 bg-green-500/10 rounded-3xl blur-2xl group-hover:bg-green-500/20 transition-all duration-700`}></div>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/50 bg-white aspect-[4/3]">
                              <Image
                                src={item.image_url}
                                alt={item.description || `Highlight ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                              />
                            </div>
                          </div>
                        </ScrollAnimate>
                      </div>
                      <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                          <div className="relative">
                            <span className="absolute -top-12 -left-6 text-[7rem] font-black text-slate-100 select-none z-0 hidden lg:block">
                              0{index + 1}
                            </span>
                            <div className="relative z-10 pl-5 border-l-4 border-green-500">
                              <h3 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="inline-flex w-10 h-10 rounded-xl bg-green-500 text-white items-center justify-center text-lg font-bold flex-shrink-0 shadow-md">
                                  {index + 1}
                                </span>
                                {item.title || `Highlight ${index + 1}`}
                              </h3>
                              <p className="text-slate-600 leading-relaxed text-lg">{item.description}</p>
                            </div>
                          </div>
                        </ScrollAnimate>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {details.features.length > 0 && (
          <section id="features" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{details.cardTitles.features}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{details.cardDescriptions.features}</p>
                </div>
              </ScrollAnimate>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {details.features.map((feature, index) => (
                  <ScrollAnimate
                    key={index}
                    animation="scaleInBounce"
                    delay={300 + (index * 100)}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:-translate-y-2">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="text-gray-700 font-medium leading-relaxed">{feature}</p>
                      </div>
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Applications Section */}
        {details.applications.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{details.cardTitles.applications}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{details.cardDescriptions.applications}</p>
                </div>
              </ScrollAnimate>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {details.applications.map((application, index) => (
                  <ScrollAnimate
                    key={index}
                    animation="slideInSmooth"
                    delay={300 + (index * 100)}
                  >
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-white p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-green-100">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{application}</h3>
                      </div>
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Advantages Section */}
        {details.advantages.length > 0 && (
          <section className="py-20 bg-gradient-to-br from-green-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{details.cardTitles.advantages}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{details.cardDescriptions.advantages}</p>
                </div>
              </ScrollAnimate>

              <div className="grid md:grid-cols-2 gap-8">
                {details.advantages.map((advantage, index) => (
                  <ScrollAnimate
                    key={index}
                    animation="slideInLeftSmooth"
                    delay={300 + (index * 100)}
                  >
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-green-500">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                          <span className="text-white font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-lg leading-relaxed">{advantage}</p>
                      </div>
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </section>
        )}


        {/* Related Projects Section */}
        {details.relatedProjects.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">{details.cardTitles.projects}</h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">{details.cardDescriptions.projects}</p>
                </div>
              </ScrollAnimate>

              <div className="grid md:grid-cols-3 gap-8">
                {details.relatedProjects.map((project, index) => (
                  <ScrollAnimate
                    key={index}
                    animation="scaleInBounce"
                    delay={300 + (index * 100)}
                  >
                    <div className="bg-gradient-to-br from-slate-900 to-green-900 text-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold">{project}</h3>
                      </div>
                    </div>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-green-100 mb-8">
                Contact our experts to discuss your specific requirements and get a customized solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                >
                  <Link href="/contact">
                    Request Quote
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold"
                >
                  <Link href="tel:+919202836627">
                    Call Now
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