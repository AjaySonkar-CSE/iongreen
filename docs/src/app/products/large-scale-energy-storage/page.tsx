import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/db-service";

export default async function LargeScaleEnergyStoragePage() {
  const product = await dbService.getProductBySlug("large-scale-energy-storage");
  const heroImage = product?.image_url || "/hybrid_solar_system.jpg";
  const brochureUrl = product?.brochure_url || product?.image_url || "/data2.jpg.jpg";
  const specs = [
    { label: "Capacity Range", value: "1.2MWh – 5.015MWh" },
    { label: "Chemistry", value: "LiFePO₄ (Lithium Iron Phosphate)" },
    { label: "Cycle Life", value: "≥7000 cycles @ 90% DOD" },
    { label: "Efficiency", value: "≥92%" },
    { label: "Operating Temperature", value: "-20°C to 50°C" },
    { label: "Container Rating", value: "IP54 outdoor protection" }
  ];

  const productCards = [
    {
      id: "utility-scale-container",
      title: "Utility Scale Containers",
      description: "Large-scale containerized systems for grid applications",
      image: "/data2.jpg.jpg",
      capacity: "1.2MWh - 5MWh"
    },
    {
      id: "microgrid-storage",
      title: "Microgrid Storage",
      description: "Complete microgrid solutions with integrated controls",
      image: "/data1.jpg.jpg",
      capacity: "2MWh - 5MWh"
    },
    {
      id: "renewable-integration",
      title: "Renewable Integration",
      description: "Solar and wind farm energy storage solutions",
      image: "/hybrid_solar_system.jpg",
      capacity: "1.5MWh - 5MWh"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-72 w-full">
        <Image
          src={heroImage}
          alt="Large Scale Energy Storage"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Hybrid Solar System</h1>
            <p className="text-lg">1.2MWh – 5.015MWh for utility applications</p>
          </div>
        </div>
      </div>

      {/* Product Cards Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Available Systems</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Utility-scale energy storage solutions for grid stabilization and renewable integration
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
            <h2 className="text-3xl font-bold text-green-700 mb-4">Large Scale Energy Storage Solutions</h2>
            <p className="text-gray-700 mb-3">
              {product?.description || "Containerized battery energy storage systems for utility-scale microgrids, renewable integration, and grid services. Featuring outdoor-rated containers with high-safety LFP chemistry and smart EMS integration."}
            </p>
            <p className="text-gray-700 mb-3">
              Our large-scale systems are designed for utility applications, providing reliable energy storage for grid stabilization, peak shaving, and renewable energy integration.
            </p>
            <p className="text-gray-700">
              Built to withstand harsh environmental conditions with IP54 protection and advanced thermal management systems.
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
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Outdoor Rated</h3>
              <p className="text-slate-700">IP54 protection for harsh environmental conditions</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Grid Services</h3>
              <p className="text-slate-700">Support for frequency regulation and ancillary services</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Renewable Integration</h3>
              <p className="text-slate-700">Optimized for solar and wind energy storage applications</p>
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