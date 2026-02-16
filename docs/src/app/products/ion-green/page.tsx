import Image from "next/image";
import Link from "next/link";
import { dbService } from "@/lib/db-service";
import { ScrollAnimate } from "@/components/scroll-animate";
import { AnimatedContentWrapper } from "@/components/client/animated-content-wrapper";

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
    <div className="min-h-screen bg-transparent">
      {/* Hero Section - Fixed like home page */}
      <section className="fixed inset-0 h-screen w-full overflow-hidden z-0">
        <Image
          src={heroImage}
          alt="ION Green"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 drop-shadow-2xl">{product?.name || "ION Green"}</h1>
            </ScrollAnimate>
            <ScrollAnimate animation="fadeInUpElegant" delay={400}>
              <p className="text-lg md:text-2xl font-medium text-white/90 uppercase tracking-[0.3em] drop-shadow-lg">Energy Storage Solutions</p>
            </ScrollAnimate>
          </div>
        </div>
      </section>

      <AnimatedContentWrapper>
        {/* Content Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <ScrollAnimate animation="smoothReveal" delay={200}>
                <h2 className="text-3xl md:text-5xl font-bold text-green-700 mb-8 tracking-tight">ION Green Energy Solutions</h2>
              </ScrollAnimate>
              <div className="space-y-6">
                <ScrollAnimate animation="fadeInUpElegant" delay={400}>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                    {product?.description || "ION Green advanced battery energy storage systems provide safe, efficient, and sustainable power for residential, commercial, and industrial applications. Systems are designed for high reliability, long cycle life, and intelligent energy management."}
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={600}>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                    Global presence in 100+ countries with dedicated 24/7 technical support, performance optimization, and lifecycle services. From consultation to commissioning and maintenance, our experts partner with you at every step.
                  </p>
                </ScrollAnimate>
                <ScrollAnimate animation="fadeInUpElegant" delay={800}>
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed font-medium text-green-600">
                    Choose ION Green for scalable, eco‑friendly solutions that reduce costs, enhance resilience, and accelerate sustainability goals.
                  </p>
                </ScrollAnimate>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-slate-900 tracking-tight">ION Green Key Features</h2>
            </ScrollAnimate>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "High Efficiency", desc: "Optimized charge/discharge for maximum round‑trip efficiency and lower energy costs." },
                { title: "Safe Chemistry", desc: "LiFePO₄ based systems with advanced BMS, thermal protection, and certifications." },
                { title: "Scalable & Modular", desc: "Modular architecture enables smooth expansion from kWh to multi‑MWh deployments." },
                { title: "Solar Integration", desc: "Seamlessly integrates with solar PV systems for maximum renewable energy utilization and grid independence." },
                { title: "Smart Energy Management", desc: "Advanced EMS optimizes energy flow between solar generation, battery storage, and grid for peak performance." },
                { title: "Long Cycle Life", desc: "Designed for 6000+ cycles with 80% DOD, ensuring long-term reliability and reduced lifecycle costs." }
              ].map((feature, idx) => (
                <ScrollAnimate
                  key={idx}
                  animation="scaleInBounce"
                  delay={100 * idx}
                  className="rounded-2xl bg-white p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500"
                >
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{feature.desc}</p>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <ScrollAnimate animation="slideInLeftSmooth">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src={brochureUrl}
                    alt="ION Green System"
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                </div>
              </ScrollAnimate>
              <div className="space-y-8">
                <ScrollAnimate animation="fadeInUpElegant">
                  <h3 className="text-4xl font-bold text-slate-900 tracking-tight">Enterprise Use Cases</h3>
                </ScrollAnimate>
                <div className="space-y-4">
                  {[
                    "Residential backup and self‑consumption",
                    "Commercial peak shaving and bill optimization",
                    "Industrial reliability and microgrid integration",
                    "Utility‑scale renewable integration and grid services"
                  ].map((item, idx) => (
                    <ScrollAnimate key={idx} animation="fadeInUpElegant" delay={100 * idx}>
                      <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100 group transition-all hover:bg-green-50">
                        <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <span className="text-lg font-semibold text-slate-800">{item}</span>
                      </div>
                    </ScrollAnimate>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Cards Grid */}
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Solar PV Integration", icon: "☀️", color: "yellow", desc: "Seamlessly connects with solar panels to store excess energy generated during peak sunlight hours." },
                { title: "Hybrid Inverter Compatibility", icon: "⚡", color: "blue", desc: "Works perfectly with hybrid inverters to create all-in-one solar-plus-storage systems." },
                { title: "Net Metering Optimization", icon: "📊", color: "green", desc: "Maximizes net metering benefits by storing excess solar energy instead of exporting it." },
                { title: "Off-Grid Independence", icon: "🏠", color: "purple", desc: "Enables complete energy independence by combining solar generation with battery storage." },
                { title: "Smart Energy Management", icon: "🧠", color: "orange", desc: "Advanced algorithms predict solar generation patterns and optimize battery charging." },
                { title: "Performance Analytics", icon: "📈", color: "red", desc: "Comprehensive monitoring and analytics provide insights into solar energy utilization." }
              ].map((card, idx) => (
                <ScrollAnimate
                  key={idx}
                  animation="scaleInBounce"
                  delay={100 * idx}
                  className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100 group hover:border-green-100 transition-all duration-500"
                >
                  <div className={`w-16 h-16 bg-${card.color}-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500`}>
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{card.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{card.desc}</p>
                </ScrollAnimate>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Data Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <ScrollAnimate animation="smoothReveal" className="mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Technical Specifications</h2>
            </ScrollAnimate>
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <ScrollAnimate animation="slideInLeftSmooth">
                <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 group">
                  <Image
                    src={brochureUrl}
                    alt="Technical datasheet"
                    fill
                    className="object-contain p-12 group-hover:scale-110 transition-transform duration-700"
                    sizes="50vw"
                  />
                </div>
              </ScrollAnimate>
              <ScrollAnimate animation="slideInRightSmooth" className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 shadow-inner">
                <dl className="divide-y divide-slate-200">
                  {specs.map((s, i) => (
                    <div key={i} className="py-5 grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 transition-colors hover:bg-white/50 px-2 rounded-lg">
                      <dt className="text-slate-500 font-bold uppercase tracking-wider text-xs">{s.label}</dt>
                      <dd className="md:col-span-2 text-slate-900 font-semibold text-lg">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href={brochureUrl}
                    download
                    className="flex-1 px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all transform hover:scale-105 font-bold text-center shadow-lg shadow-green-200"
                  >
                    Download Datasheet
                  </a>
                  <Link
                    href="/contact"
                    className="flex-1 px-8 py-4 bg-white text-green-700 border-2 border-green-600 rounded-2xl hover:bg-green-50 transition-all transform hover:scale-105 font-bold text-center"
                  >
                    Contact Sales
                  </Link>
                </div>
              </ScrollAnimate>
            </div>
          </div>
        </section>

        {/* Custom CTA Section */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-green-600/10 blur-[120px] rounded-full translate-x-1/2"></div>
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <ScrollAnimate animation="fadeInUpElegant">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Ready to Power Your Innovation?</h2>
            </ScrollAnimate>
            <ScrollAnimate animation="fadeInUpElegant" delay={200}>
              <p className="text-xl text-slate-400 mb-12 leading-relaxed">
                Join 100+ countries already utilizing ION Green's advanced BESS solutions. Our engineers are ready to design your perfect energy future.
              </p>
            </ScrollAnimate>
            <ScrollAnimate animation="scaleInBounce" delay={400}>
              <Link
                href="/contact"
                className="inline-block px-12 py-5 bg-green-500 text-white rounded-full hover:bg-green-400 transition-all transform hover:scale-110 font-bold text-xl shadow-2xl shadow-green-500/20"
              >
                Start Your Journey
              </Link>
            </ScrollAnimate>
          </div>
        </section>
      </AnimatedContentWrapper>
    </div>
  );
}
