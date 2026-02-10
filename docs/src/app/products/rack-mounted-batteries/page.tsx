import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/db-service";

export default async function RackMountedBatteriesPage() {
  const product = await dbService.getProductBySlug("rack-mounted-batteries");
  const heroImage = product?.image_url || "/solar_solution.jpg";
  const brochureUrl = product?.brochure_url || product?.image_url || "/images/ai-solar-battery-installation.jpg";
  const specs = [
    { label: "Capacity Range", value: "16kWh – 104kWh" },
    { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
    { label: "Cycle Life", value: "≥6000 cycles @ 80% DOD" },
    { label: "Efficiency", value: "≥93%" },
    { label: "Operating Temperature", value: "0°C to 45°C" },
    { label: "Configurations", value: "1P8S & 1P13S options" }
  ];

  const productCards = [
    {
      id: "data-center-rack",
      title: "Data Center Racks",
      description: "High-density battery racks for data center applications",
      image: "/images/ai-solar-battery-installation.jpg",
      capacity: "16kWh - 104kWh"
    },
    {
      id: "telecom-rack",
      title: "Telecom Battery Racks",
      description: "Reliable backup power for telecommunications infrastructure",
      image: "/data1.jpg.jpg",
      capacity: "32kWh - 64kWh"
    },
    {
      id: "enterprise-rack",
      title: "Enterprise Solutions",
      description: "Scalable rack systems for enterprise data centers",
      image: "/data2.jpg.jpg",
      capacity: "48kWh - 104kWh"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-72 w-full">
        <Image
          src={heroImage}
          alt="Rack Mounted Batteries"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Solar Solution</h1>
            <p className="text-lg">16kWh – 104kWh for data centers and telecom</p>
          </div>
        </div>
      </div>

      {/* Product Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Available Systems</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              High-voltage battery racks designed for critical infrastructure applications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productCards.map((card, index) => (
              <Link
                key={card.id}
                href={`/products/${card.id}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 block h-96"
              >
                {/* Full-size image background */}
                <div className="absolute inset-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Content overlay - appears on hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
                    <div className="text-sm font-semibold text-green-600 uppercase tracking-wide mb-2">
                      {card.capacity}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {card.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                      {card.description}
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
            ))}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-4">Rack Mounted Battery Solutions</h2>
            <p className="text-gray-700 mb-3">
              {product?.description || "High-voltage ESS racks and battery modules for data halls, telecom, and distributed commercial deployments. Featuring hot-swappable modules and smart thermal management."}
            </p>
            <p className="text-gray-700 mb-3">
              Our rack-mounted systems are designed for high-density applications where space efficiency and reliability are critical. Perfect for data centers, telecommunications facilities, and enterprise environments.
            </p>
            <p className="text-gray-700">
              Available in multiple configurations with advanced battery management systems and hot-swappable capabilities for continuous operation.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Hot-Swappable</h3>
              <p className="text-slate-700">Replace modules without system downtime</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">High Density</h3>
              <p className="text-slate-700">Maximum energy storage in minimal rack space</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart BMS</h3>
              <p className="text-slate-700">Advanced battery management for optimal performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div className="relative w-full h-96 rounded-xl overflow-hidden border border-slate-200 bg-white">
              <Image
                src={brochureUrl}
                alt="Technical datasheet"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <dl className="divide-y divide-slate-200">
                {specs.map((s, i) => (
                  <div key={i} className="py-3 grid grid-cols-3 gap-4">
                    <dt className="text-slate-600 font-medium">{s.label}</dt>
                    <dd className="col-span-2 text-slate-900">{s.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex gap-3">
                <a
                  href={brochureUrl}
                  download
                  className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm font-medium"
                >
                  Download Datasheet
                </a>
                <Link
                  href="/contact"
                  className="px-4 py-2 bg-white text-green-600 border border-green-600 rounded-md hover:bg-green-50 transition-colors text-sm font-medium"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}