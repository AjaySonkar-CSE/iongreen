"use client";

import { useState } from "react";
import Link from "next/link";
import { BSLNavbar } from "@/components/bsl-navbar";
import Image from "next/image";
import { DetailModal } from "@/components/detail-modal";
import { ScrollAnimate } from "@/components/scroll-animate";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/hero";
import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

// Lab equipment images from public folder
const labEquipmentImages = [
  "/bal1.jpeg",
  "/bal2.jpeg",
  "/bal3.jpeg",
  "/bal4.jpeg",
  "/bal5.jpeg",
  "/bal6.jpeg"
];

interface BatteryProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  category: string;
  capacity: string;
  voltage: string;
  chemistry: string;
  application: string;
  price?: string;
}

// Static battery products data based on BSL Battery website
const batteryProducts: BatteryProduct[] = [
  {
    id: 1,
    name: "100Ah Lifepo4 48V Battery Pack 5kWh Solar Battery for Home B-LFP48-100E",
    slug: "b-lfp48-100e",
    description: "The 100Ah Lifepo4 48V Battery pack is an expandable battery pack with a built-in BMS system, which can be combined into a rack storage system or used individually in a home solar system. Integrated with an inverter, the 48V 100Ah can become part of your smart home's energy storage system.",
    image_url: "/battery1.jpg",
    category: "Residential ESS",
    capacity: "5.12 kWh",
    voltage: "51.2V",
    chemistry: "LFP",
    application: "Home Energy Storage"
  },
  {
    id: 2,
    name: "50kW / 100kWh LiFePO4 C&I HV Outdoor Solar Battery ESS-GRID C108",
    slug: "ess-grid-c108",
    description: "Rated power: 50 kW, Rated capacity: 100 kWh, Battery chemistry: Lithium iron phosphate (LiFePO4), System voltage: 748.8V High voltage (HV), Application scenario: Commercial and industrial (C&I), Installation environment: Outdoor, Protection level: IP55.",
    image_url: "/battery2.jpg",
    category: "C&I ESS",
    capacity: "100 kWh",
    voltage: "748.8V",
    chemistry: "LiFePO4",
    application: "Commercial & Industrial"
  },
  {
    id: 3,
    name: "51.2 V 100Ah 5.12 kWh LiFePO4 Power Wall Home Battery Li-PRO 5120",
    slug: "li-pro-5120",
    description: "With the BSLBATT 51.2V 100Ah 5.12kWh home battery, you can maximize the utilization of your photovoltaic system. The LiFePO4 Power wall stores excess solar power during the day and uses it during peak hours, or grid outages.",
    image_url: "/battery3.jpg",
    category: "Residential ESS",
    capacity: "5.12 kWh",
    voltage: "51.2V",
    chemistry: "LFP",
    application: "Home Energy Storage"
  },
  {
    id: 4,
    name: "51.2V 200Ah LiFePO4 10kWh Wall Mounted Household Solar Battery Li-PRO 10240",
    slug: "li-pro-10240",
    description: "Thinking of optimizing your power source with a residential energy storage system? The BSLBATT 10kWh household solar battery can be easily plugged into your solar system to help you with energy management, power backup, cost reduction and carbon emissions.",
    image_url: "/battery4.jpg",
    category: "Residential ESS",
    capacity: "10 kWh",
    voltage: "51.2V",
    chemistry: "LFP",
    application: "Home Energy Storage"
  },
  {
    id: 5,
    name: "15kW / 35kWh Hybrid Solar System Integrated Energy Storage Cabinet PowerNest LV35",
    slug: "powerNest-lv35",
    description: "The PowerNest LV35 is designed with durability and versatility at its core, boasting an IP55 rating for superior water and dust resistance. Its robust construction makes it ideal for outdoor installations in challenging environments.",
    image_url: "/battery5.jpg",
    category: "Residential ESS",
    capacity: "35 kWh",
    voltage: "AIO Cabinet",
    chemistry: "LiFePO4",
    application: "Integrated Solar System"
  },
  {
    id: 6,
    name: "5kW / 15kWh LiFePO4 Home ESS Battery and Inverter PowerNest LV15",
    slug: "powerNest-lv15",
    description: "BSLBATT's 5kW / 15 kWh Home ESS is a versatile home energy solution that is easy to install and has a large number of features including utility input, photovoltaic input, generator input, 15kWh whole-house standby power and multiple time-of-use modes.",
    image_url: "/battery6.jpg",
    category: "Residential ESS",
    capacity: "15 kWh",
    voltage: "AIO Cabinet",
    chemistry: "LFP",
    application: "Home Energy Storage"
  },
  {
    id: 7,
    name: "Ultra-thin 5kWh 51.2V Solar Power Wall Battery PowerLine-5",
    slug: "powerLine-5",
    description: "Designed and manufactured by BSLBATT, the PowerLine Series utilizes environmentally friendly and non-polluting Lithium Iron Phosphate (Li-FePO4) for long cycle life and depth of discharge. The Power Wall Battery features an ultra-thin design - only 90mm thick.",
    image_url: "/battery7.jpg",
    category: "Residential ESS",
    capacity: "5 kWh",
    voltage: "51.2V",
    chemistry: "LFP",
    application: "Wall Mounted Battery"
  },
  {
    id: 8,
    name: "150kWh 563V 280Ah HV Commercial Battery Storage for Solar ESS-GRID S280",
    slug: "ess-grid-s280",
    description: "This solar battery storage system features a 143kWh/157kWh/172kWh/186kWh/200kWh/215kWh/229kWh battery capacity and is specifically engineered to deliver reliable, long-lasting power to industrial and commercial operations.",
    image_url: "/battery8.jpg",
    category: "C&I ESS",
    capacity: "143kWh - 229kWh",
    voltage: "563V",
    chemistry: "LiFePO4",
    application: "Commercial & Industrial"
  },
  {
    id: 9,
    name: "ESS-GRID S314 200 kWh High Voltage Battery System",
    slug: "ess-grid-s314",
    description: "At the heart of the ESS-GRID S314 Series lies a sophisticated master-slave mechanism multi-tier Battery Management System (BMS). This intelligent system continuously monitors, optimizes, and passively balances the battery modules.",
    image_url: "/battery9.jpg",
    category: "C&I ESS",
    capacity: "160kWh - 257kWh",
    voltage: "512V - 819.2V",
    chemistry: "LiFePO4",
    application: "High Voltage Commercial"
  },
  {
    id: 10,
    name: "100kWh 512V 205Ah HV Commercial Solar Battery Storage ESS-GRID S205",
    slug: "ess-grid-s205",
    description: "BSLBATT ESS-GRID Station series offers a cutting-edge commercial and industrial energy storage system designed to meet the needs of high-power applications with advanced software algorithms that optimize battery usage.",
    image_url: "/battery10.jpg",
    category: "C&I ESS",
    capacity: "105kWh - 167kWh",
    voltage: "512V",
    chemistry: "LiFePO4",
    application: "Commercial & Industrial"
  },
  {
    id: 11,
    name: "6.5kWh lithium solar battery for Residential B-LFP48-130PW",
    slug: "b-lfp48-130pw",
    description: "Residential Solar Installers: Maximize self-consumption and energy independence for your solar clients. Electrical Contractors: Offer reliable backup power solutions for homes and small businesses.",
    image_url: "/battery11.jpg",
    category: "Residential ESS",
    capacity: "6.5 kWh",
    voltage: "51.2V",
    chemistry: "LFP",
    application: "Residential Backup"
  },
  {
    id: 12,
    name: "16.07kWh 51.2V 314Ah LiFePo4 Battery | Residential ESS B-LFP48-300PW",
    slug: "b-lfp48-300pw",
    description: "Step into a new era of home energy with BSL Battery's revolutionary 51.2V 314Ah 16 kWh system. Engineered for superior performance, our industry-leading 314 Ah capacity delivers significantly longer runtime and greater energy storage.",
    image_url: "/battery12.jpg",
    category: "Residential ESS",
    capacity: "16.07 kWh",
    voltage: "51.2V",
    chemistry: "LFP",
    application: "High Capacity Residential"
  }
];

interface BatteryProductsClientProps {
  error?: string | null;
}

interface LabEquipmentClientProps {
  equipmentItems: Array<{
    id: number;
    name: string;
    slug: string;
    description: string;
    image_url: string;
  }>;
  error: string | null;
}

// Lab equipment data with the new images
const labEquipmentItems = [
  {
    id: 1,
    name: "Advanced Microscope System",
    slug: "advanced-microscope",
    description: "High-precision microscope with digital imaging capabilities for detailed analysis.",
    image_url: "/bal1.jpeg",
    category: "Microscopy",
    features: ["1000x magnification", "Digital imaging", "LED illumination"],
    application: "Research and Analysis"
  },
  {
    id: 2,
    name: "Centrifuge Machine",
    slug: "centrifuge-machine",
    description: "High-speed centrifuge for separating substances of different densities.",
    image_url: "/bal2.jpeg",
    category: "Centrifugation",
    features: ["Max 15,000 RPM", "Digital display", "Timer function"],
    application: "Sample Preparation"
  },
  {
    id: 3,
    name: "Spectrophotometer",
    slug: "spectrophotometer",
    description: "Accurate measurement of light intensity for various wavelengths.",
    image_url: "/bal3.jpeg",
    category: "Spectroscopy",
    features: ["UV-Vis range", "High accuracy", "User-friendly interface"],
    application: "Chemical Analysis"
  },
  {
    id: 4,
    name: "Autoclave Sterilizer",
    slug: "autoclave-sterilizer",
    description: "High-pressure steam sterilizer for laboratory equipment and supplies.",
    image_url: "/bal4.jpeg",
    category: "Sterilization",
    features: ["Fully automatic", "Steam sterilization", "Large capacity"],
    application: "Equipment Sterilization"
  },
  {
    id: 5,
    name: "PCR Thermal Cycler",
    slug: "pcr-thermal-cycler",
    description: "Precise temperature control for DNA amplification and analysis.",
    image_url: "/bal5.jpeg",
    category: "Molecular Biology",
    features: ["Fast cycling", "Precise temperature control", "Touchscreen interface"],
    application: "DNA Amplification"
  },
  {
    id: 6,
    name: "Laboratory Incubator",
    slug: "laboratory-incubator",
    description: "Temperature-controlled environment for cell culture and microbiological work.",
    image_url: "/bal6.jpeg",
    category: "Cell Culture",
    features: ["CO2 control", "Temperature range: 0-80°C", "Hepa filtration"],
    application: "Cell Culture"
  },
  {
    id: 7,
    name: "Electrophoresis System",
    slug: "electrophoresis-system",
    description: "For separating DNA, RNA, or protein molecules based on their size and charge.",
    image_url: "/bal1.jpeg",
    category: "Molecular Biology",
    features: ["DNA separation", "Protein analysis", "Adjustable voltage"],
    application: "Genetics Research"
  },
  {
    id: 8,
    name: "Microplate Reader",
    slug: "microplate-reader",
    description: "High-throughput detection for various biological and chemical assays.",
    image_url: "/bal2.jpeg",
    category: "Analysis",
    features: ["High throughput", "Multiple detection modes", "Data analysis software"],
    application: "Drug Discovery"
  },
  {
    id: 9,
    name: "Laminar Flow Hood",
    slug: "laminar-flow-hood",
    description: "Sterile work environment for sensitive procedures and sample preparation.",
    image_url: "/bal3.jpeg",
    category: "Safety",
    features: ["HEPA filtration", "UV sterilization", "Airflow control"],
    application: "Sterile Handling"
  }
];

export function LabEquipmentClient({ equipmentItems = [], error }: LabEquipmentClientProps) {
  // If there's an error, show it
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  // Use the passed equipmentItems or fallback to static lab equipment data if empty
  const displayItems = equipmentItems && equipmentItems.length > 0 ? equipmentItems : labEquipmentItems;

  return (
    <div className="min-h-screen bg-transparent">
      <Hero page="lab-equipment">
        <div className="text-center">
          <ScrollAnimate animation="fadeInUpElegant" delay={200}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Lab Equipment
              <span className="text-green-400 block">& Batteries</span>
            </h1>
          </ScrollAnimate>

          <ScrollAnimate animation="fadeInUpElegant" delay={400}>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              As a direct manufacturer of high quality LiFePO4 solar batteries, we are proud to offer energy storage
              batteries with efficient, safe, and long-lasting performance from our in-house factory.
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="scaleInBounce" delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-500 text-white px-10 py-5 text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-green-500/30"
              >
                <Link href="#products">
                  View Products
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-5 text-lg font-bold rounded-full transition-all backdrop-blur-md"
              >
                <Link href="/contact">
                  Request Quote
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </Hero>

      <AnimatedContentWrapper>
        <div className="bg-white py-8 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <ScrollAnimate animation="fadeInUpElegant" delay={100}>
                <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6">
                  Excellence in Precision: Our Laboratory Infrastructure
                </h2>
              </ScrollAnimate>
              <ScrollAnimate animation="fadeInUpElegant" delay={200}>
                <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                  At ION Green, we believe that innovation starts with rigorous testing and precision analysis.
                  Our state-of-the-art laboratory is equipped with the latest diagnostic tools and high-precision
                  instruments to ensure that every battery component meets our exacting standards of safety,
                  efficiency, and longevity.
                </p>
              </ScrollAnimate>
            </div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-16">
              <ScrollAnimate animation="slideInLeftSmooth" delay={300}>
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Advanced R&D Capabilities</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Our R&D team continuously works on the next generation of energy storage solutions.
                    By utilizing advanced microscopy and chemical analysis, we are able to optimize cell
                    chemistry and thermal performance, pushing the boundaries of what's possible in
                    sustainable energy.
                  </p>
                </div>
              </ScrollAnimate>
              <ScrollAnimate animation="slideInRightSmooth" delay={400}>
                <div className="bg-slate-50 p-6 md:p-8 rounded-2xl border border-slate-100">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Rigorous Quality Assurance</h3>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    Quality is not just a stage in our process; it is the foundation of our manufacturing.
                    Every instrument in our lab plays a crucial role in verifying the structural integrity
                    and performance stability of our LiFePO4 systems before they leave the factory floor.
                  </p>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </div>

        {displayItems.length === 0 ? (
          <div className="container mx-auto px-4 py-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">No Lab Equipment Found</h2>
              <p className="text-gray-600">Please check back later or contact us for more information.</p>
            </div>
          </div>
        ) : (
          <div className="container mx-auto p-3 md:p-4 bg-gray-50 pb-12 md:pb-20">
            <div className="text-center py-8 md:py-12">
              <ScrollAnimate animation="smoothReveal" delay={100}>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Inventory Catalogue</h2>
                <div className="w-20 h-1 bg-green-600 mx-auto rounded-full"></div>
              </ScrollAnimate>
            </div>
            <div id="products" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayItems.map((item, index) => (
                  <ScrollAnimate
                    key={item.id}
                    animation={index % 2 === 0 ? "slideInLeftSmooth" : "slideInRightSmooth"}
                    delay={200 + (index * 100)}
                  >
                    <Link
                      href={`/lab-equipment/${item.slug}`}
                      className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-64 md:h-96"
                    >
                      {/* Full-size image background */}
                      <div className="absolute inset-0">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Content overlay - appears on hover */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 md:p-4">
                          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">
                            {item.name}
                          </h2>
                          <p className="text-gray-700 text-xs md:text-sm mb-2 md:mb-3 line-clamp-2 md:line-clamp-3">
                            {item.description}
                          </p>
                          <div className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors duration-300">
                            <span>View Details</span>
                            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollAnimate>
                ))}
              </div>
            </div>
          </div>
        )}
      </AnimatedContentWrapper>
    </div>
  );
}

export function BatteryProductsClient({ error }: BatteryProductsClientProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({
    title: "",
    image: "",
    description: "",
    detailedContent: ""
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Residential ESS",
    "C&I ESS",
    "RV ESS",
    "Portable Battery",
    "UPS"
  ];

  const filteredProducts = selectedCategory === "All"
    ? batteryProducts
    : batteryProducts.filter(product => product.category === selectedCategory);

  const openModal = (item: BatteryProduct) => {
    setSelectedItem({
      title: item.name,
      image: item.image_url,
      description: item.description,
      detailedContent: item.description // Using description as detailed content for now
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <BSLNavbar />

      <Hero page="lab-equipment">
        <div className="text-center">
          <ScrollAnimate animation="fadeInUpElegant" delay={200}>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              Lab Equipment
              <span className="text-green-400 block">& Batteries</span>
            </h1>
          </ScrollAnimate>

          <ScrollAnimate animation="fadeInUpElegant" delay={400}>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              As a direct manufacturer of high quality LiFePO4 solar batteries, we are proud to offer energy storage
              batteries with efficient, safe, and long-lasting performance from our in-house factory.
            </p>
          </ScrollAnimate>

          <ScrollAnimate animation="scaleInBounce" delay={600}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-500 text-white px-10 py-5 text-lg font-bold rounded-full transition-all shadow-lg hover:shadow-green-500/30"
              >
                <Link href="#products">
                  View Products
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white hover:text-slate-900 px-10 py-5 text-lg font-bold rounded-full transition-all backdrop-blur-md"
              >
                <Link href="/contact">
                  Request Quote
                </Link>
              </Button>
            </div>
          </ScrollAnimate>
        </div>
      </Hero>

      <AnimatedContentWrapper>
        {/* Our Lab Title Section */}
        <section className="py-12 bg-white text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Lab Equipment</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4">High-precision instruments for advanced research and testing</p>
              <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="products" className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 border rounded-lg transition-colors font-medium ${selectedCategory === category
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300 text-gray-700 hover:text-blue-600"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-500">
              View as: Grid List
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="aspect-[4/3] relative bg-gray-100">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={100}
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>

                    <div className="text-sm text-blue-600 font-medium mb-2">
                      {item.category} • {item.application}
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Capacity:</span> {item.capacity}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Voltage:</span> {item.voltage}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Chemistry:</span> {item.chemistry}
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="font-medium">Application:</span> {item.application}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => openModal(item)}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
                      >
                        Learn more
                      </button>
                      <Link
                        href={`/lab-equipment/${item.slug}`}
                        className="flex-1 bg-white text-blue-600 border border-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium text-center"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-12 space-x-2">
              <button className="px-3 py-2 text-gray-500 hover:text-blue-600">&lt;</button>
              <button className="px-3 py-2 bg-blue-600 text-white rounded">1</button>
              <button className="px-3 py-2 text-gray-700 hover:text-blue-600">2</button>
              <button className="px-3 py-2 text-gray-700 hover:text-blue-600">3</button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-3 py-2 text-gray-700 hover:text-blue-600">4</button>
              <button className="px-3 py-2 text-gray-500 hover:text-blue-600">&gt;</button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">10-year Product Warranty</h3>
                <p className="text-gray-600 text-sm">
                  Backed by the world's top battery suppliers, BSLBATT has the information to offer a 10-year warranty on our energy storage battery products.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Strict Quality Control</h3>
                <p className="text-gray-600 text-sm">
                  Each cell needs to go through incoming inspection and split capacity test to ensure the finished LiFePO4 solar battery has better consistency and longer life.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery Capability</h3>
                <p className="text-gray-600 text-sm">
                  We have more than 20,000 square meters production base, annual production capacity is more than 3GWh, all lithium solar battery can be delivered in 25-30 days.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Outstanding Technical Performance</h3>
                <p className="text-gray-600 text-sm">
                  Our engineers are fully experienced in lithium solar battery field, with excellent battery module design and leading BMS to ensure the battery outperforms peers in terms of performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inverter Compatibility Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Listed by Well-known Inverters</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our battery brands have been added to the whitelist of compatible inverters of several world-renowned inverters, which means that BSLBATT's products or services have been rigorously tested and scrutinized by inverter brands to work seamlessly with their equipment.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
              {[
                { name: "Afore", logo: "Afore" },
                { name: "Goodwe", logo: "Goodwe" },
                { name: "Luxpower", logo: "Luxpower" },
                { name: "SAJ", logo: "SAJ" },
                { name: "Solis", logo: "Solis" },
                { name: "Sunsynk", logo: "Sunsynk" },
                { name: "TBB", logo: "TBB" },
                { name: "Victron Energy", logo: "Victron Energy" },
                { name: "STUDER INVERTER", logo: "STUDER INVERTER" },
                { name: "Phocos", logo: "Phocos" }
              ].map((inverter) => (
                <div key={inverter.name} className="flex items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{inverter.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* eBcloud App Section */}
        <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">eBcloud APP</h2>
              <h3 className="text-xl text-gray-600 mb-6">Energy at your fingertips.</h3>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Explore it now!!
              </p>
            </div>

            <div className="flex justify-center space-x-6">
              <button className="flex items-center space-x-3 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                <span>iOS</span>
              </button>
              <button className="flex items-center space-x-3 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993zm-11.046 0c-.5511 0-.9993-.4482-.9993-.9993s.4482-.9993.9993-.9993.9993.4482.9993.9993-.4482.9993-.9993.9993zm11.4045-6.7077c-.4798-.5488-1.0419-1.1109-1.59-1.59l-.7066.7066c.5488.4798 1.1109 1.0419 1.59 1.59l.7066-.7066zM20.798 12.031c-1.1109-1.1109-2.5827-1.7209-4.143-1.7209-.5511 0-1.1023.1109-1.5634.3318l-.3318 1.5634h1.5634c1.0419 0 2.0827.4798 2.8027 1.1998.72.72 1.1998 1.7608 1.1998 2.8027 0 .72-.27 1.41-.72 1.95l.3318.3318c.72-.72 1.1998-1.6809 1.1998-2.7318 0-1.41-.55-2.7318-1.339-3.8771zM3.202 12.031c-1.1109 1.1109-1.7209 2.5827-1.7209 4.143 0 .5511.1109 1.1023.3318 1.5634l1.5634-.3318c0-1.0419.4798-2.0827 1.1998-2.8027.72-.72 1.7608-1.1998 2.8027-1.1998.72 0 1.41.27 1.95.72l.3318-.3318c-.72-.72-1.6809-1.1998-2.7318-1.1998-1.41 0-2.7318.55-3.8771 1.339z" />
                </svg>
                <span>Android</span>
              </button>
            </div>
          </div>
        </section>

        {/* Partner Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-800 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Join Us As A Partner</h3>
                <p className="text-gray-300 mb-6">Become part of our growing network of partners and distributors worldwide.</p>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Partner With Us
                </button>
              </div>
              <div className="bg-gray-800 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Buy Systems Directly</h3>
                <p className="text-gray-300 mb-6">Purchase our high-quality battery systems directly from the manufacturer.</p>
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>

            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: Why does BSLBATT use LiFePO4 technology in solar batteries?
                </h3>
                <p className="text-gray-600">
                  We prioritize safety, durability, and performance. LiFePO4 (Lithium Iron Phosphate) is recognized as one of the safest and most durable battery chemicals, offering stable performance under demanding solar conditions. BSLBATT's LiFePO4 batteries are designed to provide extended cycle life, faster charge times, and enhanced safety—essential qualities for high-performance solar storage.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: What advantages do BSLBATT's LiFePO4 batteries offer over other brands?
                </h3>
                <p className="text-gray-600">
                  As a dedicated lithium battery manufacturer, BSLBATT integrates advanced technology with a focus on quality at every stage of production. Our LiFePO4 batteries are crafted for optimal energy density, longer operational life, and rigorous safety features. This means our clients get a battery solution that's built for sustainability and reliability from the inside out.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: Can BSLBATT's LiFePO4 batteries support both off-grid and on-grid applications?
                </h3>
                <p className="text-gray-600">
                  Yes, BSLBATT's batteries are designed for versatility. Our LiFePO4 storage systems can be seamlessly integrated with off-grid and on-grid setups, providing energy security, maximizing solar efficiency, and supporting energy independence regardless of your system type.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: What makes BSLBATT's Energy Storage Batteries unique for solar systems?
                </h3>
                <p className="text-gray-600">
                  Energy storage batteries allow solar systems to store excess energy generated during peak sunlight hours, ensuring reliable power availability even during nighttime or cloudy days. They play a critical role in maximizing solar energy use and improving overall energy independence.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: What is the warranty period for BSLBATT batteries?
                </h3>
                <p className="text-gray-600">
                  Backed by the world's top battery suppliers, BSLBATT offers a comprehensive 10-year warranty on our energy storage battery products, ensuring long-term reliability and peace of mind for our customers.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Q: How does BSLBATT ensure quality control in battery production?
                </h3>
                <p className="text-gray-600">
                  Each cell undergoes rigorous incoming inspection and split capacity testing to ensure the finished LiFePO4 solar battery has better consistency and longer life. Our strict quality control processes guarantee optimal performance and reliability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">BSL Energy Storage Solutions</h3>
                <p className="text-gray-400 text-sm">
                  Leading manufacturer of LiFePO4 solar batteries for energy storage systems.
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/" className="hover:text-white">Home</Link></li>
                  <li><Link href="/products" className="hover:text-white">Products</Link></li>
                  <li><Link href="/solutions" className="hover:text-white">Solutions</Link></li>
                  <li><Link href="/news" className="hover:text-white">News</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
                  <li><Link href="/faqs" className="hover:text-white">FAQs</Link></li>
                  <li><Link href="/support" className="hover:text-white">Technical Support</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-4">Connect</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2024 BSLBATT All Rights Reserved.</p>
            </div>
          </div>
        </footer>

        {/* Detail Modal */}
        <DetailModal
          isOpen={isModalOpen}
          onClose={closeModal}
          title={selectedItem.title}
          image={selectedItem.image}
          description={selectedItem.description}
          detailedContent={selectedItem.detailedContent}
        />
      </AnimatedContentWrapper>
    </div>
  );
}