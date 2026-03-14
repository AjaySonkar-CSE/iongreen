import { notFound } from 'next/navigation';
import { getSiteContent, type ProductCategory } from '@/lib/content';
import { dbService } from '@/lib/db-service'; // Add this import
import Image from 'next/image';
import Link from 'next/link';
import { ScrollAnimate } from '@/components/scroll-animate';
import { DownloadDatasheetButton } from '@/components/download-datasheet-button';

function parseJsonField(field: any, defaultValue: any[]) {
  if (!field) return defaultValue;
  if (typeof field === 'string') {
    try {
      return JSON.parse(field);
    } catch (e) {
      console.error('Error parsing JSON field:', e);
      return defaultValue;
    }
  }
  return field;
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  is_featured: boolean;
  features?: any;
  specifications?: any;
  applications?: any;
  benefits?: any;
}

interface ProductPageProps {
  params: {
    category: string;
  };
}

const ionImages = ['/1/ion1.png', '/1/ion2.png', '/1/ion3.png', '/1/ion4.png', '/1/ion5.png', '/1/ion6.png'];
function pickDeterministicImage(key: string) {
  let sum = 0;
  for (let i = 0; i < key.length; i++) {
    sum = (sum * 31 + key.charCodeAt(i)) >>> 0;
  }
  return ionImages[sum % ionImages.length];
}

// Product category background images for hero sections
const productHeroBackgrounds: Record<string, string> = {
  "energy-storage-system": "/pro2.jpg",
  "hybrid-solar-system": "/data2.jpg.jpg",
  "hydrogen-pules": "/Hydrogen_Pules_1.png",
  "solar-solution": "/images/ai-solar-battery-installation.svg",
  "ion-green-energy-storage": "/1/ion1.png",
  "hybrid-energy-storage": "/hybrid_solar_system.jpg",
  "mobile-ev-charging-storage": "/data5.jpp.jpg",
  "flipkart-amazon": "/images/productgreen.jpeg"
};

// Key Features and Use Cases for each product
const productKeyFeatures: Record<string, {
  title: string;
  features: { title: string; description: string }[];
  useCases: string[];
}> = {
  "energy-storage-system": {
    title: "Energy Storage System",
    features: [
      {
        title: "Modular & Scalable Design",
        description: "Flexible cabinet and containerized systems that scale from 100kWh to 5.015MWh for businesses of all sizes."
      },
      {
        title: "Advanced Thermal Management",
        description: "Air-cooled and liquid-cooled options ensure optimal performance in various environmental conditions."
      },
      {
        title: "Peak Shaving & Load Shifting",
        description: "Intelligent energy management reduces peak demand charges and optimizes energy costs through strategic load shifting."
      },
      {
        title: "High Safety Standards",
        description: "UL9540, UL1973, and CE compliant systems with multi-level safety protection and advanced BMS."
      },
      {
        title: "Grid Integration",
        description: "Seamless integration with existing electrical infrastructure for reliable backup power and grid services."
      },
      {
        title: "Long Cycle Life",
        description: "≥6000 cycles @ 80% DOD ensuring long-term reliability and reduced lifecycle costs for commercial applications."
      }
    ],
    useCases: [
      "Industrial parks and manufacturing facilities requiring reliable backup power",
      "Hospitals and healthcare centers needing uninterrupted power supply",
      "Data centers and IT facilities with critical power requirements",
      "Municipal infrastructure for peak demand management",
      "Commercial office buildings optimizing energy costs"
    ]
  },
  "hybrid-solar-system": {
    title: "Hybrid Solar System",
    features: [
      {
        title: "Utility-Scale Capacity",
        description: "Containerized systems from 1.2MWh to 5.015MWh designed for utility-scale renewable energy projects."
      },
      {
        title: "Outdoor-Rated Containers",
        description: "IP54 protection rating ensures reliable operation in harsh outdoor environments and extreme weather conditions."
      },
      {
        title: "High-Safety LFP Chemistry",
        description: "LiFePO₄ battery technology with ≥7000 cycles @ 90% DOD for maximum safety and longevity."
      },
      {
        title: "Smart EMS Integration",
        description: "Advanced Energy Management System optimizes renewable energy integration and grid services."
      },
      {
        title: "Grid Services",
        description: "Provides valuable grid stabilization, frequency regulation, and peak shaving services to utilities."
      },
      {
        title: "Renewable Integration",
        description: "Seamlessly integrates with solar and wind farms for maximum renewable energy utilization."
      }
    ],
    useCases: [
      "Utility-scale renewable energy projects requiring large-scale storage",
      "Grid stabilization and frequency regulation for power networks",
      "Peak shaving for distribution networks and substations",
      "Renewable energy integration for solar and wind farms",
      "Microgrid implementations for remote communities and islands"
    ]
  },
  "hydrogen-pules": {
    title: "Hydrogen Pules",
    features: [
      {
        title: "Residential & Small Business",
        description: "Compact systems from 5kWh to 35kWh perfect for homes and small businesses with flexible capacity options."
      },
      {
        title: "Flexible Installation",
        description: "Wall-mounted or stackable design adapts to any space, making it ideal for residential and commercial settings."
      },
      {
        title: "Hybrid Inverter Compatibility",
        description: "Works seamlessly with hybrid inverters for complete solar-plus-storage solutions with intelligent energy management."
      },
      {
        title: "High Efficiency",
        description: "≥95% round-trip efficiency ensures maximum energy utilization and reduced electricity bills."
      },
      {
        title: "Long Lifespan",
        description: "≥8000 cycles @ 90% DOD with 10+ year lifespan ensures reliable backup power for years to come."
      },
      {
        title: "Smart Energy Management",
        description: "Intelligent system optimizes self-consumption, backup power, and grid interaction for maximum savings."
      }
    ],
    useCases: [
      "Single-family residential homes seeking energy independence and backup power",
      "Small businesses and retail shops optimizing energy costs",
      "Apartment complexes and condos requiring compact storage solutions",
      "Remote off-grid locations needing reliable power supply",
      "Backup power for critical loads during grid outages"
    ]
  },
  "solar-solution": {
    title: "Solar Solution",
    features: [
      {
        title: "High-Voltage ESS Racks",
        description: "Advanced battery racks from 16kWh to 104kWh designed for data centers and telecom facilities."
      },
      {
        title: "Hot-Swappable Modules",
        description: "1P8S & 1P13S configurations enable maintenance and expansion without system downtime."
      },
      {
        title: "Smart Thermal Management",
        description: "Advanced cooling systems ensure optimal performance in data center environments."
      },
      {
        title: "High Power Density",
        description: "Compact footprint with high power density ideal for space-constrained installations."
      },
      {
        title: "Advanced BMS",
        description: "Sophisticated Battery Management System ensures safety, reliability, and optimal performance."
      },
      {
        title: "Scalable Architecture",
        description: "Modular design scales to meet growing demands from distributed commercial to critical infrastructure."
      }
    ],
    useCases: [
      "Data centers and server rooms requiring reliable backup power",
      "Telecommunications facilities needing uninterrupted service",
      "Distributed commercial deployments with space constraints",
      "Critical infrastructure backup for essential services",
      "Edge computing installations requiring high reliability"
    ]
  }
};

// Export additional content for each product category
const productDetails: Record<string, {
  specifications: { label: string; value: string }[];
  applications: string[];
  benefits: string[];
  specImage: string;
}> = {
  "energy-storage-system": {
    specifications: [
      { label: "Capacity Range", value: "100kWh – 5.015MWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
      { label: "Efficiency", value: "≥90%" },
      { label: "Operating Temperature", value: "-10°C to 50°C" },
      { label: "Communication", value: "RS485, Ethernet, 4G" }
    ],
    applications: [
      "Industrial parks and manufacturing facilities",
      "Hospitals and healthcare centers",
      "Data centers and IT facilities",
      "Municipal infrastructure",
      "Commercial office buildings"
    ],
    benefits: [
      "Significant reduction in peak demand charges",
      "Enhanced energy cost savings through load shifting",
      "Improved power quality and grid stability",
      "Reliable backup power during outages",
      "Seamless integration with existing electrical infrastructure"
    ],
    specImage: "/1/ion1.png"
  },
  "hybrid-solar-system": {
    specifications: [
      { label: "Capacity Range", value: "1.2MWh – 5.015MWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥7000 cycles @ 90% DOD" },
      { label: "Efficiency", value: "≥92%" },
      { label: "Operating Temperature", value: "-20°C to 50°C" },
      { label: "Container Rating", value: "IP54 outdoor protection" }
    ],
    applications: [
      "Utility-scale renewable energy projects",
      "Grid stabilization and frequency regulation",
      "Peak shaving for distribution networks",
      "Renewable energy integration",
      "Microgrid implementations"
    ],
    benefits: [
      "Enables higher penetration of renewable energy",
      "Provides valuable grid services to utilities",
      "Reduces transmission and distribution losses",
      "Supports grid resilience and reliability",
      "Generates revenue through ancillary services"
    ],
    specImage: "/1/ion2.png"
  },
  "hydrogen-pules": {
    specifications: [
      { label: "Capacity Range", value: "5kWh – 35kWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥8000 cycles @ 90% DOD" },
      { label: "Efficiency", value: "≥95%" },
      { label: "Operating Temperature", value: "-10°C to 50°C" },
      { label: "Installation", value: "Wall-mounted or stackable" }
    ],
    applications: [
      "Single-family residential homes",
      "Small businesses and retail shops",
      "Apartment complexes and condos",
      "Remote off-grid locations",
      "Backup power for critical loads"
    ],
    benefits: [
      "Reduced electricity bills through self-consumption",
      "Energy independence and grid independence",
      "Quiet and clean backup power solution",
      "Increased home value and marketability",
      "Simple installation with minimal maintenance"
    ],
    specImage: "/1/ion3.png"
  },
  "solar-solution": {
    specifications: [
      { label: "Capacity Range", value: "16kWh – 104kWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
      { label: "Efficiency", value: "≥93%" },
      { label: "Operating Temperature", value: "0°C to 45°C" },
      { label: "Configurations", value: "1P8S & 1P13S options" }
    ],
    applications: [
      "Data centers and server rooms",
      "Telecommunications facilities",
      "Distributed commercial deployments",
      "Critical infrastructure backup",
      "Edge computing installations"
    ],
    benefits: [
      "Hot-swappable modules for continuous operation",
      "High power density in compact footprint",
      "Advanced battery management system",
      "Scalable to meet growing demands",
      "Reduced total cost of ownership"
    ],
    specImage: "/1/ion4.png"
  },
  "hybrid-energy-storage": {
    specifications: [
      { label: "Capacity Range", value: "215kWh – 261kWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥7000 cycles @ 90% DOD" },
      { label: "Efficiency", value: "≥91%" },
      { label: "Operating Temperature", value: "-10°C to 50°C" },
      { label: "Integration", value: "Built-in PCS and EMS" }
    ],
    applications: [
      "Industrial parks and manufacturing",
      "Cold chain logistics facilities",
      "Commercial and institutional buildings",
      "Renewable energy integration projects",
      "Peak demand management"
    ],
    benefits: [
      "Integrated power conversion and management",
      "Factory-tested and pre-commissioned systems",
      "Rapid deployment with minimal site work",
      "Optimized performance through unified control",
      "Simplified maintenance and support"
    ],
    specImage: "/1/ion5.png"
  },
  "mobile-ev-charging-storage": {
    specifications: [
      { label: "Capacity Range", value: "241kWh – 3.34MWh" },
      { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
      { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
      { label: "Efficiency", value: "≥90%" },
      { label: "Operating Temperature", value: "-20°C to 50°C" },
      { label: "Mobility", value: "Trailer-mounted or containerized" }
    ],
    applications: [
      "Electric vehicle fleet charging",
      "Construction site power solutions",
      "Emergency and disaster response",
      "Remote area electrification",
      "Temporary event power"
    ],
    benefits: [
      "Rapid deployment to any location",
      "Integrated EV charging infrastructure",
      "Smart scheduling and dispatch capabilities",
      "Multi-site energy sharing and optimization",
      "Revenue generation through vehicle-to-grid services"
    ],
    specImage: "/1/ion6.png"
  },
  "flipkart-amazon": {
    specifications: [
      { label: "Platform", value: "Flipkart & Amazon" },
      { label: "Product Range", value: "Solar Products" },
      { label: "Shipping", value: "Pan India" },
      { label: "Warranty", value: "1-3 Years" }
    ],
    applications: [
      "Residential solar installations",
      "Small commercial setups",
      "Off-grid applications",
      "Portable power solutions",
      "Emergency backup systems"
    ],
    benefits: [
      "Easy online purchasing",
      "Fast delivery across India",
      "Genuine products with warranty",
      "Customer support and service",
      "Competitive pricing"
    ],
    specImage: "/1/ion8.png"
  }
};

// export default async function ProductCategoryPage({ params }: ProductPageProps) { 
import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

export default async function ProductCategoryPage(props: ProductPageProps) {
  const params = await props.params;

  try {
    if (!params?.category) {
      console.error('No category parameter provided');
      notFound();
    }

    const slug = params.category;

    // 1. Try to fetch from database first by slug
    let dbProduct = await dbService.getProductBySlug(slug);

    // 2. Get site content for fallback
    const content = getSiteContent();
    const staticProduct = content.products?.find((p: ProductCategory) => {
      const productSlug = p.title.toLowerCase()
        .replace(/[^a-z0-9\s]+/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');
      return productSlug === slug;
    });

    if (!dbProduct && !staticProduct) {
      console.warn(`Product not found for slug: ${slug}`);
      notFound();
    }

    // Merge or fallback logic
    const category = slug;
    const product = {
      title: dbProduct?.name || staticProduct?.title || '',
      description: dbProduct?.description || staticProduct?.description || '',
      range: staticProduct?.range || 'Advanced Solution',
      features: staticProduct?.features || [],
      image: dbProduct?.image_url || staticProduct?.image || ''
    };

    // Get detailed content for this product
    const productKey = category;
    let details: {
      specifications: any[];
      applications: any[];
      benefits: any[];
      specImage: string;
      specImages?: string[];
    } = productDetails[productKey] || {
      specifications: [],
      applications: [],
      benefits: [],
      specImage: pickDeterministicImage(productKey)
    };

    let keyFeatures = productKeyFeatures[productKey];

    let dbGallery: any[] = [];

    // If we have a database product, populate details from it
    if (dbProduct) {
      const dbFeatures = parseJsonField(dbProduct.features, []);
      const dbSpecifications = parseJsonField(dbProduct.specifications, []);
      const dbApplications = parseJsonField(dbProduct.applications, []);
      const dbBenefits = parseJsonField(dbProduct.benefits, []);
      dbGallery = parseJsonField(dbProduct.gallery, []);

      if (dbFeatures && dbFeatures.length > 0) {
        const firstItem = dbFeatures[0];
        let normalizedFeatures = [];

        if (typeof firstItem === 'string') {
          normalizedFeatures = dbFeatures.map((f: string) => ({ title: f, description: '' }));
        } else {
          normalizedFeatures = dbFeatures.map((f: any) => ({
            title: f.title || f.label || '',
            description: f.description || f.value || '',
            icon: f.icon || null
          }));
        }

        product.features = normalizedFeatures; // Update product features

        keyFeatures = {
          title: dbProduct.name,
          features: normalizedFeatures,
          useCases: keyFeatures?.useCases || []
        };
      }

      if (dbSpecifications) {
        if (Array.isArray(dbSpecifications)) {
          if (dbSpecifications.length > 0 && typeof dbSpecifications[0] === 'string') {
            details.specifications = dbSpecifications.map((s: string) => {
              const parts = s.split(':');
              return { label: parts[0]?.trim() || 'Spec', value: parts[1]?.trim() || '' };
            });
          } else {
            details.specifications = dbSpecifications;
          }
        } else if (typeof dbSpecifications === 'object' && dbSpecifications !== null) {
          if (dbSpecifications.items && Array.isArray(dbSpecifications.items)) {
            details.specifications = dbSpecifications.items;
            if (dbSpecifications.images && Array.isArray(dbSpecifications.images)) {
              details.specImages = dbSpecifications.images;
            }
          }
        }
      }

      if (dbApplications && dbApplications.length > 0) {
        details.applications = dbApplications;
      }

      if (dbBenefits && dbBenefits.length > 0) {
        details.benefits = dbBenefits;
      }
    }

    // Still fetch dbProducts for the "Available Products" section if it's a category match
    // or just fetch featured products as related products
    let relatedProducts: Product[] = [];
    try {
      // If dbProduct exists, fetch products in the same category
      if (dbProduct?.category) {
        relatedProducts = await dbService.getProducts(dbProduct.category);
        // Exclude the current product from related products
        relatedProducts = relatedProducts.filter(p => p.id !== dbProduct?.id);
      }
    } catch (err) {
      console.error("Failed to fetch related products:", err);
    }

    // For backward compatibility with the template which uses dbProducts
    const dbProducts = relatedProducts;


    let specData: { title?: string; description?: string; image_url?: string } | null = null;
    let appData: { title?: string; description?: string; icon_url?: string } | null = null;
    try {
      const targetId = dbProduct ? dbProduct.id : (dbProducts.length > 0 ? dbProducts[0].id : null);
      if (targetId) {
        const spec = await dbService.getProductSpecification(targetId);
        const app = await dbService.getProductApplication(targetId);
        specData = spec ? { title: spec.title, description: spec.description || undefined, image_url: spec.image_url || undefined } : null;
        appData = app ? { title: app.title, description: app.description || undefined, icon_url: app.icon_url || undefined } : null;

        if (specData?.image_url) {
          details.specImage = specData.image_url;
        }
      }
    } catch (e) {
      console.error('Failed to fetch spec/application:', e);
    }

    return (
      <div className="min-h-screen bg-transparent">
        {/* Hero Section with Background Image - Fixed like home page */}
        <section className="fixed inset-0 h-screen w-full overflow-hidden z-0">
          <img
            src={category === 'hydrogen-pules' ? '/Hydrogen_Pules_1.png' : (productHeroBackgrounds[category] || (dbProducts.length > 0 && dbProducts[0].image_url ? dbProducts[0].image_url : "/image1.png"))}
            alt={product.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: '100%', height: '100%' }}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{product.title}</h1>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={300}>
                <p className="text-lg md:text-xl font-medium text-white/90 uppercase tracking-wider">{product.range}</p>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        <AnimatedContentWrapper>


          {/* ION Green Content Section - Added per requirements */}
          <ScrollAnimate animation="fadeInUpElegant" delay={400}>
            <section className="py-8 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <ScrollAnimate animation="smoothReveal" delay={500}>
                    <h2 className="text-2xl font-bold text-green-700 mb-4">ION Green {product.title}</h2>
                  </ScrollAnimate>
                  <ScrollAnimate animation="fadeInUpElegant" delay={600}>
                    <p className="text-gray-600 mb-3 whitespace-pre-line">
                      {product.description}
                    </p>
                  </ScrollAnimate>
                </div>
              </div>
            </section>
          </ScrollAnimate>



          {/* Use Cases Section */}
          {keyFeatures && (keyFeatures.useCases?.length > 0) && (
            <ScrollAnimate animation="fadeInUpElegant" delay={1700}>
              <section className="py-12 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                  <div className="flex flex-col gap-8">
                    <div className="relative w-full rounded-xl overflow-hidden shadow bg-white">
                      <img
                        src={(product as any).image || details.specImage || pickDeterministicImage(productKey)}
                        alt={`${product.title} System`}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="w-full">
                      <ScrollAnimate animation="smoothReveal" delay={1800}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Use Cases</h3>
                      </ScrollAnimate>
                      <ul className="space-y-3 text-slate-700">
                        {keyFeatures.useCases.map((useCase: any, index: number) => (
                          <ScrollAnimate
                            key={index}
                            animation="fadeInUpElegant"
                            delay={1900 + (index * 100)}
                          >
                            <li className="flex items-start">
                              <span className="mr-3 mt-1 text-green-600 flex-shrink-0">✓</span>
                              <span>{useCase}</span>
                            </li>
                          </ScrollAnimate>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </ScrollAnimate>
          )}





          {/* Product Overview Section */}
          <section className="py-16 bg-slate-50">
            <div className="mx-auto max-w-6xl px-4 md:px-6">
              <div className="flex flex-col gap-8">
                {/* Top - ION Green Related Image */}
                <div className="w-full flex items-center justify-center">
                  <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-white">
                    <img
                      src={(product as any).image || details.specImage || pickDeterministicImage(productKey)}
                      alt={product.title}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                {/* Bottom - Product Content */}
                <div className="w-full">
                  {/* Bottom - Product Content 
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Product Overview</h3>
                  <p className="text-slate-600 mb-6 whitespace-pre-line">
                    {product.description}
                  </p>
                  */}



                  {/* Download Datasheet Button */}
                  <div className="mt-6">
                    <DownloadDatasheetButton
                      imageUrl={(product as any).image || details.specImage || pickDeterministicImage(productKey)}
                      productTitle={product.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ION Green Key Features Section - Moved below Overview */}
          {keyFeatures && (
            <ScrollAnimate animation="fadeInUpElegant" delay={1200}>
              <section className="py-16 bg-slate-50">
                <div className="max-w-6xl mx-auto px-4 md:px-6">
                  <ScrollAnimate animation="smoothReveal" delay={1250}>
                    <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">ION Green Key Features</h2>
                  </ScrollAnimate>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {keyFeatures.features.map((feature: any, index: number) => (
                      <ScrollAnimate
                        key={index}
                        animation="scaleInBounce"
                        delay={1300 + (index * 100)}
                      >
                        <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm flex flex-col h-full">
                          {feature.icon && (
                            <div className="w-full h-48 bg-slate-50 mb-4 rounded-lg overflow-hidden flex items-center justify-center p-4">
                              <img src={feature.icon} alt={feature.title} className="max-w-full max-h-full object-contain" />
                            </div>
                          )}
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                          <p className="text-slate-700 whitespace-pre-line">{feature.description}</p>
                        </div>
                      </ScrollAnimate>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollAnimate>
          )}

          {/* Technical Specifications Section */}
          <ScrollAnimate animation="slideInRightSmooth" delay={1300}>
            <section className="py-16 bg-white">
              <div className="mx-auto max-w-6xl px-4 md:px-6">
                <ScrollAnimate animation="smoothReveal" delay={1400}>
                  <h3 className="text-3xl font-bold text-center text-slate-900 mb-4">{specData?.title || 'Technical Specifications'}</h3>
                </ScrollAnimate>
                {specData?.description && (
                  <ScrollAnimate animation="fadeInUpElegant" delay={1450}>
                    <p className="text-center text-lg text-slate-600 mb-8 max-w-3xl mx-auto">{specData.description}</p>
                  </ScrollAnimate>
                )}
                {details.specImages && details.specImages.length > 0 ? (
                  <div className="flex flex-col gap-6 mb-8">
                    {details.specImages.map((imgUrl, idx) => (
                      <ScrollAnimate key={idx} animation="scaleInBounce" delay={1500 + idx * 100}>
                        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">
                          <img
                            src={imgUrl}
                            alt={`${product.title} Technical Specifications ${idx + 1}`}
                            className="w-full h-auto"
                          />
                        </div>
                      </ScrollAnimate>
                    ))}
                  </div>
                ) : specData?.image_url || (details.specImage && details.specImage !== pickDeterministicImage(productKey)) ? (
                  <ScrollAnimate animation="scaleInBounce" delay={1500}>
                    <div className="relative mx-auto mb-8 w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">
                      <img
                        src={specData?.image_url || details.specImage}
                        alt={`${product.title} Technical Specifications`}
                        className="w-full h-auto"
                      />
                    </div>
                  </ScrollAnimate>
                ) : null}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {details.specifications.map((spec, index) => (
                    <ScrollAnimate
                      key={index}
                      animation="fadeInUpElegant"
                      delay={1550 + (index * 50)}
                      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {spec.icon && (
                        <div className="w-full h-64 bg-slate-50 relative border-b border-slate-100 flex items-center justify-center shrink-0 p-6">
                          <img src={spec.icon} alt={spec.label} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      )}
                      <div className={`p-6 flex-1 flex flex-col items-center text-center justify-center ${spec.icon ? 'bg-slate-50 border-t border-slate-100 shadow-inner' : ''}`}>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">{spec.label}</h4>
                        <p className="text-green-600 font-bold text-xl break-words w-full whitespace-pre-line">{spec.value}</p>
                      </div>
                    </ScrollAnimate>
                  ))}
                </div>
              </div>
            </section>
          </ScrollAnimate>

          {/* Applications Section */}
          <ScrollAnimate animation="fadeInUpElegant" delay={1600}>
            <section className="py-16 bg-slate-50">
              <div className="mx-auto max-w-6xl px-4 md:px-6">
                <ScrollAnimate animation="smoothReveal" delay={1700}>
                  <h3 className="text-3xl font-bold text-center text-slate-900 mb-4">Applications</h3>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={1750}>
                  <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
                    Designed for diverse environments and use cases across residential, commercial, and industrial sectors
                  </p>
                </ScrollAnimate>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {details.applications.map((application: any, index: number) => {
                    const isObject = typeof application === 'object' && application !== null;
                    const text = isObject ? application.text : application;
                    const iconUrl = isObject ? application.icon : null;
                    return (
                      <ScrollAnimate
                        key={index}
                        animation="scaleInBounce"
                        delay={1800 + (index * 100)}
                        className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        {iconUrl ? (
                          <div className="w-full h-64 bg-slate-50 relative overflow-hidden border-b border-slate-100 flex items-center justify-center shrink-0 p-4">
                            <img src={iconUrl} alt="Application icon" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        ) : null}

                        <div className={`flex-1 flex flex-col justify-center ${iconUrl ? 'p-6 items-center text-center' : 'p-6'}`}>
                          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">{text}</p>
                        </div>
                      </ScrollAnimate>
                    )
                  })}
                  {appData?.title && (
                    <ScrollAnimate
                      animation="scaleInBounce"
                      delay={1800 + (details.applications.length * 100)}
                      className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {appData.icon_url ? (
                        <div className="w-full h-64 bg-slate-50 relative overflow-hidden border-b border-slate-100 flex items-center justify-center shrink-0 p-4">
                          <img src={appData.icon_url} alt="Application icon" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                        </div>
                      ) : null}

                      <div className={`flex-1 flex flex-col justify-center ${appData.icon_url ? 'p-6 items-center text-center' : 'p-6'}`}>
                        {appData.title && <h4 className="text-xl font-bold text-slate-900 mb-2">{appData.title}</h4>}
                        {appData.description && <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-line">{appData.description}</p>}
                      </div>
                    </ScrollAnimate>
                  )}
                </div>
              </div>
            </section>
          </ScrollAnimate>

          {/* Benefits Section */}
          <ScrollAnimate animation="slideInLeftSmooth" delay={1900}>
            <section className="py-16 bg-white">
              <div className="mx-auto max-w-6xl px-4 md:px-6">
                <ScrollAnimate animation="smoothReveal" delay={2000}>
                  <h3 className="text-3xl font-bold text-center text-slate-900 mb-4">Key Benefits</h3>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={2050}>
                  <p className="text-center text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
                    Maximize value and performance with ION Green energy storage solutions
                  </p>
                </ScrollAnimate>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {details.benefits.map((benefit: any, index: number) => {
                    const isObject = typeof benefit === 'object' && benefit !== null;
                    const text = isObject ? benefit.text : benefit;
                    const iconUrl = isObject ? benefit.icon : null;
                    return (
                      <ScrollAnimate
                        key={index}
                        animation="fadeInUpElegant"
                        delay={2100 + (index * 100)}
                        className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                      >
                        {iconUrl ? (
                          <div className="w-full h-64 bg-slate-50 relative border-b border-slate-100 flex items-center justify-center shrink-0 p-4">
                            <img src={iconUrl} alt="Benefit icon" className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" />
                          </div>
                        ) : null}
                        <div className={`p-8 flex-1 flex flex-col justify-center ${iconUrl ? 'items-center text-center' : ''}`}>
                          <p className="text-slate-800 font-medium text-xl leading-relaxed whitespace-pre-line">{text}</p>
                        </div>
                      </ScrollAnimate>
                    )
                  })}
                </div>
              </div>
            </section>
          </ScrollAnimate>

          {/* Product Gallery Section */}
          {dbProduct && dbGallery && dbGallery.length > 0 && (
            <ScrollAnimate animation="fadeInUpElegant" delay={2100}>
              <section className="py-20 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <span className="text-green-600 font-bold tracking-widest uppercase text-sm mb-3 block">Gallery</span>
                    <h2 className="text-4xl font-bold text-slate-900">Product Showcase</h2>
                    <div className="w-20 h-1 bg-green-500 mx-auto mt-4 rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dbGallery.map((item: any, index: number) => (
                      <ScrollAnimate
                        key={index}
                        animation="scaleInBounce"
                        delay={2200 + (index * 100)}
                      >
                        <div className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100">
                          <div className="relative overflow-hidden">
                            <img
                              src={item.image_url}
                              alt={item.title || `${product.title} gallery image ${index + 1}`}
                              className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Hover content */}
                            <div className="absolute inset-x-0 bottom-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <h4 className="text-white font-bold text-lg mb-1">{item.title}</h4>
                              <p className="text-white/80 text-sm line-clamp-2">{item.description}</p>
                            </div>
                          </div>

                          {/* Static content (visible when not hovered) */}
                          <div className="p-5 border-t border-slate-50 group-hover:opacity-0 transition-opacity duration-300">
                            <h4 className="text-slate-900 font-semibold truncate">{item.title || `Feature ${index + 1}`}</h4>
                            <p className="text-slate-500 text-xs mt-1 truncate">{item.description || 'View details'}</p>
                          </div>
                        </div>
                      </ScrollAnimate>
                    ))}
                  </div>
                </div>
              </section>
            </ScrollAnimate>
          )}

          {/* Call to Action Section */}
          <ScrollAnimate animation="scaleInBounce" delay={2200}>
            <section className="py-16 bg-gradient-to-r from-green-600 to-green-800">
              <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
                <ScrollAnimate animation="fadeInUpElegant" delay={2300}>
                  <h3 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Energy Strategy?</h3>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={2350}>
                  <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
                    Contact our energy storage experts to discuss how ION Green solutions can optimize your energy costs and enhance reliability.
                  </p>
                </ScrollAnimate>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <ScrollAnimate animation="slideInLeftSmooth" delay={2400}>
                    <a
                      href="/contact"
                      className="px-8 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      Request a Consultation
                    </a>
                  </ScrollAnimate>
                  <ScrollAnimate animation="slideInRightSmooth" delay={2450}>
                    <a
                      href="tel:9202636627"
                      className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
                    >
                      Call Now
                    </a>
                  </ScrollAnimate>
                </div>
              </div>
            </section>
          </ScrollAnimate>
        </AnimatedContentWrapper>
      </div>
    );
  } catch (error) {
    console.error('Error in ProductCategoryPage:', error);
    notFound();
  }
}

// Generate static params for all product categories
export async function generateStaticParams() {
  const content = getSiteContent();
  return content.products.map((product) => ({
    category: product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  }));
}
