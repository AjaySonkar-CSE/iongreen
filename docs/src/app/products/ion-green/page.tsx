import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/db-service";

export default async function IonGreenPage() {
  const product = await dbService.getProductBySlug("ion-green");
  const heroImage = product?.image_url || "/1/ion1.png";
  const brochureUrl = product?.brochure_url || product?.image_url || "/1/ion1.png";
  const specs: Array<{ label: string; value: string }> = [
    { label: "Technical Data", value: "1.2MWh Containerized Energy Storage System" },
    { label: "Battery type", value: "3.2V, 314Ah – Lithium iron phosphate (LFP)" },
    { label: "Max. connection number", value: "LFP3.2V/314Ah" },
    { label: "Total energy", value: "1200kWh" },
    { label: "Rated power (0.5P)", value: "600kW" },
    { label: "Voltage range (Battery)", value: "628V–806V" },
    { label: "System", value: "BESS with PCS, EMS, BMS" },
    { label: "Dimension (W*D*H)", value: "6058×2438×2591mm" },
    { label: "Weight", value: "≤30T" },
  ];
  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-72 w-full">
        <Image
          src={heroImage}
          alt="ION Green"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{product?.name || "ION Green"}</h1>
            <p className="text-lg">Energy Storage Solutions</p>
          </div>
        </div>
      </div>

      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-700 mb-4">ION Green Energy Solutions</h2>
            <p className="text-gray-700 mb-3">
              {product?.description || "ION Green advanced battery energy storage systems provide safe, efficient, and sustainable power for residential, commercial, and industrial applications. Systems are designed for high reliability, long cycle life, and intelligent energy management."}
            </p>
            <p className="text-gray-700 mb-3">
              Global presence in 100+ countries with dedicated 24/7 technical support, performance optimization, and lifecycle services. From consultation to commissioning and maintenance, our experts partner with you at every step.
            </p>
            <p className="text-gray-700">
              Choose ION Green for scalable, eco‑friendly solutions that reduce costs, enhance resilience, and accelerate sustainability goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">ION Green Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">High Efficiency</h3>
              <p className="text-slate-700">Optimized charge/discharge for maximum round‑trip efficiency and lower energy costs.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Safe Chemistry</h3>
              <p className="text-slate-700">LiFePO₄ based systems with advanced BMS, thermal protection, and certifications.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Scalable & Modular</h3>
              <p className="text-slate-700">Modular architecture enables smooth expansion from kWh to multi‑MWh deployments.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Solar Integration</h3>
              <p className="text-slate-700">Seamlessly integrates with solar PV systems for maximum renewable energy utilization and grid independence.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Smart Energy Management</h3>
              <p className="text-slate-700">Advanced EMS optimizes energy flow between solar generation, battery storage, and grid for peak performance.</p>
            </div>
            <div className="rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Long Cycle Life</h3>
              <p className="text-slate-700">Designed for 6000+ cycles with 80% DOD, ensuring long-term reliability and reduced lifecycle costs.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col gap-8 items-center">
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow">
              <Image
                src={brochureUrl}
                alt="ION Green System"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Use Cases</h3>
              <ul className="space-y-2 text-slate-700">
                <li>Residential backup and self‑consumption</li>
                <li>Commercial peak shaving and bill optimization</li>
                <li>Industrial reliability and microgrid integration</li>
                <li>Utility‑scale renewable integration and grid services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Solar Integration Solutions</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              ION Green energy storage systems are perfectly designed to work with solar photovoltaic systems, creating complete renewable energy solutions that maximize efficiency and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Solar PV Integration</h3>
              <p className="text-slate-600">Seamlessly connects with solar panels to store excess energy generated during peak sunlight hours for use during evening or cloudy periods.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Hybrid Inverter Compatibility</h3>
              <p className="text-slate-600">Works perfectly with hybrid inverters to create all-in-one solar-plus-storage systems that optimize energy flow and grid interaction.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Net Metering Optimization</h3>
              <p className="text-slate-600">Maximizes net metering benefits by storing excess solar energy instead of exporting it, reducing electricity bills and increasing ROI.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Off-Grid Independence</h3>
              <p className="text-slate-600">Enables complete energy independence by combining solar generation with battery storage for reliable power during grid outages.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Smart Energy Management</h3>
              <p className="text-slate-600">Advanced algorithms predict solar generation patterns and optimize battery charging/discharging for maximum system efficiency.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-slate-200">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Performance Analytics</h3>
              <p className="text-slate-600">Comprehensive monitoring and analytics provide insights into solar energy utilization, battery performance, and system optimization.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
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
